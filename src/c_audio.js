/* ================= audio: everything is synthesised ================= */
/* Signal path:  sfx -> sg ─────────────────────────────┐
                 music notes -> song bus -> mg -> mf (underwater low-pass) -> dk (duck) -> comp -> master -> out
                 song "wet" bus -> es -> dl (echo, fed back through ef and fb) -> eo -> mg */
const AU={ac:null,muted:false,dead:false,vol:0.4,muf:false,open:18000,master:null,comp:null,sg:null,mg:null,mf:null,dk:null,es:null,dl:null,ef:null,fb:null,eo:null,noise:null};
/* Some old browsers return nothing from resume(), so never chain on it blindly. */
function auWake(ac){ try{ const p=ac.resume(); if(p&&p.catch) p.catch(()=>{}); }catch(e){} }
function auInit(){
  if(AU.ac){ if(AU.ac.state!=='running') auWake(AU.ac); return; }
  if(AU.dead) return;
  try{
    const AC=window.AudioContext||window.webkitAudioContext; if(!AC){ AU.dead=true; return; }
    const ac=new AC(), gn=v=>{ const g=ac.createGain(); g.gain.value=v; return g; };
    const bq=(type,f,q)=>{ const b=ac.createBiquadFilter(); b.type=type; b.frequency.value=f; b.Q.value=q; return b; };
    AU.open=Math.min(18000,ac.sampleRate*0.45);
    AU.master=gn(AU.muted?0:AU.vol); AU.master.connect(ac.destination);
    /* a gentle compressor glues music and effects together and catches the odd pile-up of loud sounds */
    const c=AU.comp=ac.createDynamicsCompressor(); c.threshold.value=-10; c.knee.value=10; c.ratio.value=3; c.attack.value=0.005; c.release.value=0.15; c.connect(AU.master);
    AU.sg=gn(1); AU.sg.connect(c);
    AU.dk=gn(1); AU.dk.connect(c);
    AU.mf=bq('lowpass',AU.muf?700:AU.open,0.5); AU.mf.connect(AU.dk);
    AU.mg=gn(0.5); AU.mg.connect(AU.mf);
    /* the echo: one delay line with a darkened feedback loop. Its time is set per song. */
    AU.es=gn(0.3); AU.dl=ac.createDelay(1); AU.dl.delayTime.value=0.3; AU.ef=bq('lowpass',2600,0.5); AU.fb=gn(0.33); AU.eo=gn(1);
    AU.es.connect(AU.dl); AU.dl.connect(AU.ef); AU.ef.connect(AU.fb); AU.fb.connect(AU.dl); AU.ef.connect(AU.eo); AU.eo.connect(AU.mg);
    const n=ac.createBuffer(1,Math.floor(ac.sampleRate),ac.sampleRate), d=n.getChannelData(0);
    for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1;
    AU.noise=n; AU.ac=ac;
    if(ac.state!=='running') auWake(ac);
  }catch(e){ AU.ac=null; AU.dead=true; }
}
function setMuted(m){ AU.muted=!!m; if(AU.master) AU.master.gain.value=AU.muted?0:AU.vol; }
const auNoteIx={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
function NF(n){ let i=1,s=auNoteIx[n[0]]; if(n[1]==='#'){ s++; i++; } else if(n[1]==='b'){ s--; i++; } return 440*Math.pow(2,(s+(+n.slice(i)-4)*12-9)/12); }
/* one oscillator with a click-free envelope; returns it so a caller can hang a wobble on its pitch */
function voice(type,f0,f1,t,dur,vol,dest){
  const ac=AU.ac; const o=ac.createOscillator(), g=ac.createGain();
  o.type=type; o.frequency.setValueAtTime(f0,t); if(f1&&f1!==f0) o.frequency.exponentialRampToValueAtTime(f1,t+dur);
  g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(vol,t+0.008); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  o.connect(g); g.connect(dest); o.start(t); o.stop(t+dur+0.03);
  return o;
}
function tone(type,f0,f1,dur,vol,delay){ if(!AU.ac||AU.ac.state!=='running') return null; return voice(type,f0,f1,AU.ac.currentTime+(delay||0),dur,vol,AU.sg); }
/* a tone whose pitch shakes `depth` Hz either way, `rate` times a second: giggles, growls and sparks */
function auWob(type,f0,f1,dur,vol,delay,rate,depth){
  const o=tone(type,f0,f1,dur,vol,delay); if(!o) return;
  const ac=AU.ac, t=ac.currentTime+(delay||0), l=ac.createOscillator(), lg=ac.createGain();
  l.frequency.value=rate; lg.gain.value=depth; l.connect(lg); lg.connect(o.frequency); l.start(t); l.stop(t+dur+0.03);
}
/* A burst of the shared noise. A gain node sits at 1 until its first scheduled value: start it at 0, or a burst that begins a sample early clicks at full volume. */
function auBurst(t,dur,vol,dest){
  const ac=AU.ac, s=ac.createBufferSource(), g=ac.createGain(); s.buffer=AU.noise; s.loop=true;
  g.gain.value=0; g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  s.connect(g); g.connect(dest); s.start(t,Math.random()*0.5); s.stop(t+dur+0.02);
}
function hiss(dur,vol,delay,hp){
  const ac=AU.ac; if(!ac||ac.state!=='running') return; const t=ac.currentTime+(delay||0);
  const f=ac.createBiquadFilter(); f.type='highpass'; f.frequency.value=hp||900; f.connect(AU.sg);
  auBurst(t,dur,vol,f);
}
/* noise through a filter that sweeps from f0 to f1: whooshes (bandpass) and rumbles (lowpass). `att` is the share of the time spent swelling in. */
function auWhoosh(type,f0,f1,dur,vol,delay,att){
  const ac=AU.ac; if(!ac||ac.state!=='running') return; const t=ac.currentTime+(delay||0);
  const s=ac.createBufferSource(), f=ac.createBiquadFilter(), g=ac.createGain(); s.buffer=AU.noise; s.loop=true;
  f.type=type; f.Q.value=type==='bandpass'?1.2:0.7; f.frequency.setValueAtTime(f0,t); f.frequency.exponentialRampToValueAtTime(f1,t+dur);
  g.gain.value=0; g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(vol,t+dur*(att||0.08)); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  s.connect(f); f.connect(g); g.connect(AU.sg); s.start(t,Math.random()*0.5); s.stop(t+dur+0.02);
}
/* a run of notes `gap` seconds apart, each `len` long, optionally starting `delay` seconds from now */
function jingle(type,notes,gap,vol,len,delay){ notes.split(' ').forEach((n,i)=>{ if(n!=='.') tone(type,NF(n),0,len||gap*1.4,vol,(delay||0)+i*gap); }); }
/* semitone steps of a major pentatonic scale: coin streaks and stomp combos climb it */
const auPent=[0,2,4,7,9,12,14,16,19];
/* Loudness rule of thumb, so nothing jumps out over a coin: square and saw up to 0.12, triangle and sine up to 0.3, raw hiss up to 0.2, filtered noise up to 0.4. */
const sfx={
  /* --- moving about --- */
  jump(big=false){ tone('square',big?250:330,big?520:680,0.17,0.1); tone('triangle',big?125:165,big?260:340,0.15,0.2); },
  jump2(){ tone('square',520,1040,0.11,0.07); tone('sine',780,1560,0.14,0.14,0.02); auWhoosh('bandpass',1800,4200,0.15,0.3); },
  wallKick(){ tone('square',700,350,0.045,0.1); tone('square',440,900,0.08,0.1,0.04); hiss(0.04,0.12,0,2000); },
  poundStart(){ tone('triangle',1800,480,0.2,0.2); tone('square',1810,485,0.2,0.03); },
  poundLand(){ tone('sine',140,38,0.3,0.26); tone('triangle',92,40,0.22,0.24); auWhoosh('lowpass',1400,180,0.28,0.34); hiss(0.05,0.12,0,1200); },
  glide(){ auWhoosh('bandpass',700,1900,0.4,0.22,0,0.4); },
  puff(){ hiss(0.05,0.05,0,1500); },
  slide(){ tone('triangle',1400,300,0.7,0.17); tone('sine',2800,600,0.7,0.05); },
  spring(){ tone('sine',220,980,0.28,0.28); tone('square',220,980,0.2,0.05); tone('sine',440,1960,0.2,0.08,0.03); },
  launch(){ tone('sine',170,42,0.4,0.3); tone('sawtooth',110,700,0.4,0.05); auWhoosh('bandpass',300,3200,0.55,0.4,0,0.25); },
  pipe(){ [440,330,247].forEach((f,i)=>{ tone('square',f,f*0.62,0.13,0.1,i*0.16); tone('triangle',f/2,f*0.31,0.13,0.22,i*0.16); }); },
  /* --- water --- */
  splash(){ auWhoosh('bandpass',500,2600,0.32,0.4); hiss(0.16,0.09,0.05,3000); tone('sine',300,120,0.14,0.2); },
  swim(){ tone('sine',300,620,0.12,0.2); tone('sine',520,900,0.07,0.1,0.07); },
  bubble(){ tone('sine',900,1700,0.05,0.07); },
  /* --- pick-ups --- */
  coin(streak=0){ const f=784*Math.pow(2,auPent[(((streak|0)%8)+8)%8]/12); tone('square',f,0,0.07,0.1); tone('square',f*1.335,0,0.28,0.12,0.06); tone('sine',f*2.67,0,0.2,0.05,0.06); },
  sprout(){ jingle('square','C5 E5 G5 C6 E6 G6',0.045,0.09,0.08); jingle('triangle','C4 E4 G4 C5 E5 G5',0.045,0.2,0.08); },
  power(){ jingle('square','G4 C5 E5 G5 C6 E6 G6 C7',0.055,0.1,0.1); jingle('square','E4 G4 C5 E5 G5 C6 E6 G6',0.055,0.05,0.1); },
  oneup(){ jingle('square','E5 G5 E6 C6 D6 G6',0.1,0.11,0.14); jingle('triangle','C4 . G4 . B4 D5',0.1,0.24,0.14); },
  check(){ jingle('triangle','C5 G5 C6',0.08,0.25,0.16); jingle('square','. . E6',0.08,0.06,0.2); },
  shard(n=1){
    const k=clamp(n|0,1,3)-1;
    jingle('square',['E6 A6 C#7','E6 A6 C#7 E7','A5 C#6 E6 A6 C#7 E7 . A7'][k],0.06,0.07,0.2+k*0.08);
    jingle('sine',['E7 A7','E7 A7 C#8','. . E7 A7 C#8 E8 . A8'][k],0.06,0.05,0.25,0.03);
    if(k===2) jingle('triangle','A3 . E4 . A4 . . A4',0.06,0.2,0.3);
  },
  /* --- blocks and gadgets --- */
  bump(){ tone('triangle',170,80,0.11,0.3); tone('square',170,80,0.05,0.04); },
  brk(){ hiss(0.2,0.2,0,500); tone('square',220,60,0.16,0.1); tone('triangle',110,50,0.18,0.2,0.02); },
  crumble(){ auWhoosh('lowpass',900,150,0.4,0.36); tone('triangle',140,60,0.3,0.2); [0.06,0.15,0.26].forEach((d,i)=>tone('square',200-i*40,90,0.05,0.06,d)); },
  switchOn(){ tone('square',330,0,0.04,0.1); tone('square',660,0,0.1,0.1,0.05); hiss(0.02,0.1,0,3000); },
  thud(){ tone('triangle',110,45,0.22,0.3); tone('sine',80,40,0.2,0.25); hiss(0.12,0.12,0,200); },
  clonk(){ tone('triangle',130,48,0.25,0.26); tone('sine',72,36,0.3,0.24,0.01); tone('square',300,90,0.05,0.09); hiss(0.1,0.16,0,400); },
  fuse(){ hiss(0.25,0.07,0,5000); auWob('square',2200,1700,0.22,0.025,0,43,300); },
  explode(){ auWhoosh('lowpass',2600,90,0.8,0.34); tone('sine',120,30,0.5,0.26); tone('square',160,40,0.25,0.07); hiss(0.1,0.18,0,800); },
  rocket(){ auWhoosh('bandpass',400,3400,0.45,0.36,0,0.2); tone('sawtooth',160,520,0.4,0.06); tone('square',900,300,0.06,0.07); },
  zap(){ auWob('sawtooth',1600,220,0.22,0.08,0,70,480); tone('square',2400,300,0.08,0.06); hiss(0.2,0.14,0,3500); },
  /* --- friends and foes --- */
  stomp(combo=0){ const m=Math.pow(2,auPent[clamp(combo|0,0,8)]/12); tone('square',420*m,110*m,0.13,0.12); tone('triangle',660*m,0,0.1,0.18,0.04); hiss(0.07,0.15); },
  kick(){ tone('square',520,880,0.07,0.12); hiss(0.03,0.1,0,1800); },
  fire(){ tone('square',880,280,0.11,0.09); hiss(0.08,0.07,0,2500); },
  spit(){ tone('square',300,640,0.09,0.09); },
  shatter(){ hiss(0.14,0.18,0,2500); tone('square',1500,700,0.08,0.06); tone('sine',3100,1900,0.12,0.06,0.03); },
  ghost(){ auWob('sine',700,620,0.16,0.18,0,13,40); auWob('sine',880,790,0.16,0.18,0.17,13,50); auWob('sine',620,470,0.32,0.18,0.34,11,45); },
  hurt(){ jingle('square','E5 C5 A4 E4 C4',0.07,0.12,0.1); tone('triangle',220,70,0.3,0.2); },
  bossHit(){ tone('sawtooth',300,70,0.3,0.12); tone('triangle',150,50,0.3,0.24); hiss(0.15,0.18,0,300); },
  bossRoar(){ auWob('sawtooth',170,62,0.95,0.1,0,28,34); auWob('square',85,42,0.95,0.06,0,19,13); auWhoosh('lowpass',900,220,0.95,0.36,0,0.2); },
  /* a boss falls: eight tumbling thumps, a boom, then sparkles rising out of the smoke */
  bossDown(){
    for(let i=0;i<8;i++){ const m=Math.pow(0.85,i); tone('sawtooth',520*m,250*m,0.16,0.09,i*0.13); hiss(0.08,0.12,i*0.13+0.02,500); }
    auWhoosh('lowpass',1800,100,0.9,0.4,1.05); tone('sine',110,30,0.7,0.3,1.05);
    jingle('square','C5 E5 G5 C6 E6 G6 C7 E7',0.07,0.08,0.22,1.8); jingle('sine','C6 E6 G6 C7 E7 G7 C8 E8',0.07,0.06,0.3,1.83);
  },
  /* --- jingles --- */
  die(){ jingle('square','B4 . F5 . F5 E5 D5 C5 . G4 . E4',0.085,0.11,0.14); jingle('triangle','G3 . D3 . D3 . G2 . . C3 . C2',0.085,0.26,0.16); },
  clear(){ jingle('square','G4 C5 E5 G5 C6 E6 G6 . E6 . G6',0.1,0.1,0.2); jingle('square','E4 G4 C5 E5 G5 C6 E6 . C6 . E6',0.1,0.05,0.2); jingle('triangle','C3 . G3 . C4 . G3 . C4 . C3',0.1,0.24,0.2); },
  over(){ jingle('triangle','C5 . G4 . E4 . A4 B4 A4 Ab4 Bb4 Ab4 G4',0.13,0.25,0.22); jingle('sine','C3 . . . C3 . F3 . . Ab3 . . G3',0.13,0.2,0.4); },
  win(){
    jingle('square','C5 C5 C5 E5 G5 . E5 G5 C6 . C6 E6 G6 . . C7',0.11,0.1,0.24); jingle('square','E4 E4 E4 G4 C5 . C5 E5 G5 . G5 C6 E6 . . G6',0.11,0.05,0.24);
    jingle('triangle','C3 . . C3 G3 . . G3 C4 . . E4 G4 . . C4',0.11,0.24,0.24); hiss(0.3,0.06,1.65,6000);
  },
  /* --- menus and messages --- */
  pause(){ tone('square',660,0,0.07,0.1); tone('square',440,0,0.1,0.1,0.08); },
  uiMove(){ tone('square',660,0,0.04,0.07); },
  uiOk(){ tone('square',660,0,0.06,0.09); tone('square',990,0,0.12,0.09,0.06); },
  hint(){ tone('sine',784,0,0.14,0.2); tone('sine',1047,0,0.24,0.2,0.11); },
  tally(){ tone('square',1568,0,0.03,0.06); },
  iris(){ auWhoosh('bandpass',300,2400,0.45,0.22,0,0.5); },
  /* --- the map: a hop along the path, a way that is shut, a tile of new path (rising as the path grows), a marker opening, a level chosen, a gate swinging wide --- */
  mapHop(){ tone('triangle',560,760,0.06,0.16); },
  mapNo(){ tone('triangle',150,95,0.12,0.3); },
  mapTile(k=0){ tone('square',392*Math.pow(2,((((k|0)%12)+12)%12)/6),0,0.07,0.07); },
  mapOpen(){ jingle('square','C5 E5 G5 C6',0.065,0.1,0.14); },
  mapPlay(){ jingle('square','G4 C5 E5 G5 C6',0.045,0.1,0.09); jingle('triangle','C4 . G4 . C5',0.045,0.2,0.12); },
  gate(){ auWhoosh('lowpass',260,900,1,0.3,0,0.5); jingle('triangle','C3 G3 C4 E4 G4 C5',0.11,0.2,0.4); jingle('square','. . . C5 E5 G5 C6',0.11,0.07,0.4); }
};

/* ================= music: a step sequencer with any number of tracks ================= */
/* A track is a line of tokens, one per step (an eighth or a sixteenth, the song says which). 'E5' plays a note, '.' rests, '-' holds the note before it.
   A drum track uses letters instead, and a token may stack several: k kick, s snare, h closed hat, o open hat, r shaker, p clap, t tick, T tock, c high conga, b low conga. */
function parseTrack(s,dr){
  const tok=s.trim().split(/\s+/), out=[];
  for(let i=0;i<tok.length;i++){
    if(tok[i]==='.'||tok[i]==='-'){ out.push(null); continue; }
    if(dr){ out.push({h:tok[i]}); continue; }
    let d=1; while(tok[i+d]==='-') d++; out.push({f:NF(tok[i]),d});
  }
  return out;
}
/* Harmony is written as chord names and spelled out by musArp, so bass and arpeggios always agree with the chords.
   `chords` holds one name per `per` steps ('C', 'Am', 'G7', 'Fm7', 'CM7', 'Bdim', 'Dsus', 'C6'...). `pat` is a line of chord tones, repeated as needed:
   1 root, 3 third, 5 fifth, 7 seventh (the octave on a plain triad), 8 octave, 9 ninth; add ^ to go up an octave, _ to go down. `lo` is the lowest root allowed. */
const musQual={'':[0,4,7,12],m:[0,3,7,12],7:[0,4,7,10],m7:[0,3,7,10],M7:[0,4,7,11],dim:[0,3,6,9],sus:[0,5,7,12],aug:[0,4,8,12],6:[0,4,7,9],m6:[0,3,7,9]};
const musNames=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'];
function musMidi(n){ return Math.round(69+12*Math.log2(NF(n)/440)); }
function musArp(chords,per,pat,lo){
  const ps=pat.trim().split(/\s+/), base=musMidi(lo), out=[];
  chords.trim().split(/\s+/).forEach((c,ci)=>{
    const m=/^([A-G][#b]?)(.*)$/.exec(c)||['','C',''], q=musQual[m[2]]||musQual[''], r=base+((musMidi(m[1]+'0')-base)%12+12)%12;
    for(let i=0;i<per;i++){
      const p=ps[(ci*per+i)%ps.length];
      if(p==='.'||p==='-'){ out.push(p); continue; }
      const d=+p[0], n=r+(d===8?12:d===9?14:q[d>>1]||0)+12*(p.split('^').length-p.split('_').length);
      out.push(musNames[n%12]+(Math.floor(n/12)-1));
    }
  });
  return out.join(' ');
}
/* song({bpm, spb: steps per beat, bpb: beats per bar, sw: swing 0..0.3, ec: echo time in beats, fb: echo feedback}, [instrument, track], ...)
   An instrument is {w: waveform, v: volume, a: attack seconds, s: level left at the end of a note (leave out for a pluck), g: gate, the share of the step that sounds,
   det: cents for a second, detuned oscillator (the fat pulse feel), h: pitch ratio of an added sine partial, vib: vibrato depth in cents on long notes, e: 1 sends it to the echo, dr: 1 marks a drum track}. */
function song(o,...tracks){
  const tr=tracks.map(([ins,s])=>({ins,seq:parseTrack(s,ins.dr)})), spb=o.spb||2;
  return {key:o.key||'',bpm:o.bpm,spb,bar:spb*(o.bpb||4),sw:o.sw||0,ec:o.ec||0.75,fb:o.fb||0.33,tr,len:Math.max(...tr.map(t=>t.seq.length))};
}
const mus={song:null,step:0,next:0,timer:0,rate:1,paused:false,fresh:false,dry:null,wet:null,hh:null,sn:null};
/* one note of a pitched instrument: up to three oscillators through one envelope */
function musNote(ins,f,t,dur,dest){
  const ac=AU.ac, g=ac.createGain(), e=t+dur, a=Math.min(ins.a||0.006,dur*0.4), end=e+(ins.s?0.08:0.03), os=[];
  const osc=(type,fr,det)=>{ const o=ac.createOscillator(); o.type=type; o.frequency.setValueAtTime(fr,t); if(det) o.detune.setValueAtTime(det,t); o.connect(g); o.start(t); o.stop(end); os.push(o); };
  g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(ins.v,t+a);
  if(ins.s){ g.gain.exponentialRampToValueAtTime(ins.v*ins.s,e); g.gain.exponentialRampToValueAtTime(0.0001,e+0.05); } else g.gain.exponentialRampToValueAtTime(0.0001,e);
  osc(ins.w,f,0); if(ins.det) osc(ins.w,f,ins.det); if(ins.h) osc('sine',f*ins.h,0);
  /* vibrato only on notes long enough to hear it, and it fades in. The wobble oscillator stops with the note, so nothing is left running. */
  if(ins.vib&&dur>0.24){
    const l=ac.createOscillator(), lg=ac.createGain(); l.frequency.value=ins.vr||5.5;
    lg.gain.value=0; lg.gain.setValueAtTime(0,t+0.1); lg.gain.linearRampToValueAtTime(ins.vib,t+0.24);
    l.connect(lg); os.forEach(o=>lg.connect(o.detune)); l.start(t); l.stop(end);
  }
  g.connect(dest);
}
/* the drum kit: a pitched sine thump for the kick, noise bursts through two shared filters for snare and hats, short blips for the rest */
const musKit={
  k(t,v){ voice('sine',150,46,t,0.15,0.5*v,mus.dry); },
  s(t,v){ auBurst(t,0.13,0.3*v,mus.sn); voice('triangle',230,140,t,0.07,0.16*v,mus.dry); },
  h(t,v){ auBurst(t,0.035,0.1*v,mus.hh); },
  o(t,v){ auBurst(t,0.17,0.085*v,mus.hh); },
  r(t,v){ auBurst(t,0.07,0.05*v,mus.hh); },
  p(t,v){ auBurst(t,0.05,0.26*v,mus.sn); },
  t(t,v){ voice('triangle',1700,0,t,0.03,0.2*v,mus.dry); },
  T(t,v){ voice('triangle',1100,0,t,0.045,0.2*v,mus.dry); },
  c(t,v){ voice('sine',420,330,t,0.11,0.3*v,mus.dry); },
  b(t,v){ voice('sine',250,170,t,0.14,0.34*v,mus.dry); }
};
/* Every song gets its own buses. Fading the old ones out silences any notes still queued from the song before. */
function musDrop(){
  const ac=AU.ac;
  if(ac) [mus.dry,mus.wet].forEach(b=>{ if(b) try{ b.gain.cancelScheduledValues(ac.currentTime); b.gain.setTargetAtTime(0,ac.currentTime,0.02); }catch(e){} });
  mus.dry=mus.wet=mus.hh=mus.sn=null;
}
function musBegin(){
  const ac=AU.ac, t=ac.currentTime, s=mus.song;
  const bq=(type,f,q)=>{ const b=ac.createBiquadFilter(); b.type=type; b.frequency.value=f; b.Q.value=q; b.connect(mus.dry); return b; };
  mus.dry=ac.createGain(); mus.dry.connect(AU.mg); mus.wet=ac.createGain(); mus.wet.connect(mus.dry); mus.wet.connect(AU.es);
  mus.hh=bq('highpass',7500,0.7); mus.sn=bq('bandpass',2200,0.5);
  /* retune the echo to the new tempo while its output is shut, so the jump in delay time is never heard */
  AU.eo.gain.cancelScheduledValues(t); AU.eo.gain.setTargetAtTime(0,t,0.008); AU.eo.gain.setValueAtTime(0,t+0.06); AU.eo.gain.linearRampToValueAtTime(1,t+0.3);
  AU.dl.delayTime.setValueAtTime(Math.min(0.95,60/s.bpm*s.ec),t+0.05); AU.fb.gain.setValueAtTime(s.fb,t+0.05);
  mus.fresh=false; mus.next=t+0.1;
}
/* Called from a timer: queue every step that falls in the next fifth of a second on the audio clock, which never drifts or stutters the way timers do. */
function musicTick(){
  const ac=AU.ac, s=mus.song; if(!ac||!s||ac.state!=='running') return;
  if(mus.fresh) musBegin();
  if(mus.paused){ mus.next=ac.currentTime+0.06; return; }
  if(mus.next<ac.currentTime) mus.next=ac.currentTime+0.03;
  const sd=60/s.bpm/s.spb/mus.rate;
  while(mus.next<ac.currentTime+0.2){
    const i=mus.step%s.len, t=mus.next+(i&1?s.sw*sd:0);
    /* while muted the song keeps its place but builds no notes */
    if(!AU.muted) for(const tr of s.tr){
      const n=tr.seq[i%tr.seq.length], ins=tr.ins; if(!n) continue;
      if(n.h){ for(const c of n.h) if(musKit[c]) musKit[c](t,ins.v||1); }
      else musNote(ins,n.f,t,sd*n.d*(ins.g||0.9),ins.e?mus.wet:mus.dry);
    }
    mus.step++; mus.next+=sd;
  }
}
/* A song asked for before the first tap or key simply waits: the timer runs, and the tune starts from the top once the audio context is alive. */
function musicStart(name){
  musicStop();
  if(!Object.prototype.hasOwnProperty.call(SONGS,name)) return;
  mus.song=SONGS[name]; mus.step=0; mus.rate=1; mus.paused=false; mus.fresh=true; mus.timer=setInterval(musicTick,40); musicTick();
}
function musicStop(){ if(mus.timer) clearInterval(mus.timer); mus.timer=0; mus.song=null; musDrop(); }
function musicPause(p){ mus.paused=!!p; }
function musicRate(r){ mus.rate=r>0?clamp(r,0.25,4):1; }
/* under water: close a low-pass over the music quickly, open it again over about a third of a second */
function musicMuffle(on){
  on=!!on; if(on===AU.muf) return; AU.muf=on;
  const ac=AU.ac; if(ac) AU.mf.frequency.setTargetAtTime(on?700:AU.open,ac.currentTime,on?0.06:0.1);
}
/* drop the music to about a third for `sec` seconds so a jingle can be heard, then let it swell back */
function musicDuck(sec=1){
  const ac=AU.ac; if(!ac) return; const t=ac.currentTime, p=AU.dk.gain, d=sec>0?Math.min(sec,10):1;
  p.cancelScheduledValues(t); p.setTargetAtTime(0.35,t,0.03); p.setTargetAtTime(1,t+d,0.12);
}

/* ================= the songs ================= */
/* Each is built inside its own little function so the phrase names stay private. Leads are written out note by note; bass and arpeggios come from the chord line. */
const SONGS={};
/* title screen: the main theme. Bright C major, a leaping tune over a busy arpeggio; the middle eight lifts to F and climbs home through D7 and G7. */
SONGS.title=(()=>{
  const h='G5 . E5 G5 C6 - G5 .  B5 - A5 G5 D5 - . .  A5 . E5 A5 C6 - B5 A5  G5 - E5 . B4 - . .  A5 . F5 A5 C6 - A5 . ';
  const a=h+'G5 - E5 C5 E5 - G5 .  F5 . D5 F5 A5 - G5 F5  G5 - - . D5 G5 B5 D6 ';
  const a2=h+'B5 - G5 B5 D6 - B5 .  C6 - - . G5 . E5 .  C5 - . . C5 E5 G5 C6 ';
  const b='A5 - - F5 A5 - C6 -  D6 - C6 A5 F5 - . .  G5 - - E5 G5 - C6 -  E6 - D6 C6 G5 - . .  F#5 - - D5 F#5 - A5 -  C6 - B5 A5 F#5 - A5 .  B5 - - . D6 - - .  D5 G5 B5 D6 F6 - D6 B5 ';
  const a3=h+'B5 - G5 B5 D6 - B5 .  C6 - - . E6 - C6 .  D6 - B5 G5 D5 G5 B5 D6 ';
  const ch='C G Am Em F C Dm G  C G Am Em F G C C  F F C C D7 D7 G G7  C G Am Em F G C G';
  const d='k . h . s . h h ', d2='k h h k s h k h ';
  return song({key:'C major',bpm:132},
    [{w:'square',v:0.045,det:9,vib:9,s:0.5,e:1},a+a2+b+a3],
    [{w:'square',v:0.02,g:0.5},musArp(ch,8,'1 5 8 5 3 5 8 5','G3')],
    [{w:'triangle',v:0.24,g:0.8},musArp(ch,8,'1 . . 1 5 . 1 3','E2')],
    [{dr:1,v:1},(d.repeat(7)+'k . h . s s s s ').repeat(2)+d2.repeat(7)+'k . s . s s s s '+d.repeat(7)+'k . h o s . s s ']);
})();
/* the world map: an easy stroll in F major with a lazy swing, slower than any level */
SONGS.map=(()=>{
  const h='C5 . F5 . A5 - G5 F5  A5 - F5 . D5 - . .  D5 . F5 . Bb5 - A5 G5  G5 - E5 . C5 - . . ';
  const a=h+'C5 . F5 . A5 - C6 A5  D6 - A5 . F5 - . A5  Bb5 . A5 . G5 . D5 .  E5 - G5 - C5 - . . ';
  const b='D5 - F5 - Bb5 - - .  A5 . Bb5 . D6 - Bb5 .  C6 - A5 - F5 - - .  E5 . F5 . A5 - F5 .  G5 - Bb5 - D6 - - .  C6 . Bb5 . G5 - Bb5 .  G5 - E5 - C5 - E5 G5  Bb5 - G5 - E5 - C5 . ';
  const a3=h+'C5 . F5 . A5 - C6 A5  D6 - A5 . F5 - D5 .  F5 . D5 . Bb4 - D5 F5  E5 - - . G5 - - . ';
  const ch='F Dm Bb C F Dm Gm C  Bb Bb F F Gm Gm C C7  F Dm Bb C F Dm Bb C';
  return song({key:'F major',bpm:96,sw:0.16},
    [{w:'triangle',v:0.13,vib:8,s:0.6,e:1},a+b+a3],
    [{w:'sine',v:0.06,g:0.6},musArp(ch,8,'. 5 8 5 . 5 3^ 5','F3')],
    [{w:'triangle',v:0.24,g:0.8},musArp(ch,8,'1 . . 5 1 . 5 .','F2')],
    [{dr:1,v:0.6},'k . r . p . r r']);
})();
/* world 1, Sprinkle Shores: a calypso in G major. The lead is a steel pan (a triangle with a sine an octave up), the bass and kick lean on the 3-3-2 beat. */
SONGS.shores=(()=>{
  const h='D6 . B5 D6 . B5 G5 .  B5 - . G5 - . D5 .  E6 . C6 E6 . C6 G5 .  C6 - . G5 - . E5 .  F#5 . A5 D6 . A5 F#5 .  A5 - . C6 - . A5 F#5 ';
  const a=h+'G5 . B5 D6 . G6 D6 .  B5 - - . D5 G5 B5 . ';
  const a2=h+'G5 B5 D6 G6 . D6 B5 .  G5 - - . F5 G5 B5 D6 ';
  const b='E6 - - C6 E6 - G6 .  E6 . C6 . G5 - . .  D6 - - B5 D6 - G6 .  D6 . B5 . G5 - . .  C#6 - - A5 C#6 - E6 .  G6 . E6 . C#6 - A5 .  D6 . F#6 . A6 - F#6 .  D6 - C6 - A5 F#5 A5 C6 ';
  const a3=h+'G5 B5 D6 G6 . D6 B5 .  G5 - - . . D5 G5 B5 ';
  const ch='G G C C D D7 G G  G G C C D D7 G G7  C C G G A7 A7 D D7  G G C C D D7 G G';
  return song({key:'G major',bpm:126},
    [{w:'triangle',v:0.12,h:2,g:0.95,e:1},a+a2+b+a3],
    [{w:'triangle',v:0.07,h:2,g:0.5},musArp(ch,8,'. 3 5 . 3 5 . 3','G3')],
    [{w:'triangle',v:0.25,g:0.85},musArp(ch,8,'1 - . 5 - . 1 .','E2')],
    [{dr:1,v:0.9},'kr r c kr . c b r '.repeat(7)+'kr r c kr c c b b']);
})();
/* world 2, Jellybean Jungle: D major, all bounce. A xylophone lead (a triangle with a sine two octaves up), off-beat stabs, an octave-hopping bass and congas. */
SONGS.jungle=(()=>{
  const h='D5 . F#5 . A5 . F#5 A5  D6 . A5 . F#5 - . .  G5 . B5 . D6 . B5 D6  E6 . D6 . B5 - . . ';
  const a=h+'A5 A5 . F#5 . D5 F#5 A5  D6 - . A5 - . F#5 .  E5 . A5 . C#6 . A5 C#6  E6 . C#6 A5 E5 - . . ';
  const a2=h+'A5 A5 . F#5 . D5 F#5 A5  G5 . E5 . C#5 . E5 G5  F#5 . A5 . D6 - . .  D6 D6 . A5 . F#5 D5 . ';
  const b='B5 - . F#5 B5 - D6 .  C#6 . B5 . F#5 - . .  B5 - . G5 B5 - D6 .  E6 . D6 . B5 - . .  G5 - . E5 G5 - B5 .  A5 . G5 . E5 - G5 .  A5 . C#6 . E6 . C#6 .  G6 . E6 . C#6 A5 G5 E5 ';
  const ch='D D G G D D A A  D D G G D A D D  Bm Bm G G Em Em A A7  D D G G D A D D';
  return song({key:'D major',bpm:144},
    [{w:'triangle',v:0.13,h:4,g:0.6,e:1},a+a2+b+a2],
    [{w:'square',v:0.022,g:0.35},musArp(ch,8,'. 5 . 3^ . 5 . 3^','G3')],
    [{w:'triangle',v:0.25,g:0.6},musArp(ch,8,'1 . 8 1 . 8 5 .','E2')],
    [{dr:1,v:0.9},'kr . c cr s . b r '.repeat(7)+'kr . c c s b b b']);
})();
/* world 3, Fizzy Deep: a slow waltz in E flat major. Long sung notes with vibrato float over seventh-chord arpeggios, and everything swims in echo. */
SONGS.deep=(()=>{
  const a='G5 - - - Bb5 -  Eb6 - - - - .  D6 - - - C6 -  G5 - - - - .  Ab5 - - - C6 -  Eb6 - - - C6 -  D6 - - - Bb5 -  F5 - - - - .  '+
    'G5 - - - Bb5 -  Eb6 - - - G6 -  F6 - - - D6 -  Bb5 - - - - .  C6 - Bb5 - Ab5 -  Bb5 - Ab5 - F5 -  Eb5 - - - - -  - - . . Bb5 - ';
  const b='C6 - - Bb5 Ab5 -  C6 - - - Eb6 -  Bb5 - - Ab5 G5 -  Bb5 - - - Eb6 -  Ab5 - - G5 F5 -  Ab5 - - - C6 -  Bb5 - - - D6 -  F6 - - - - .  '+
    'Eb6 - - D6 C6 -  G5 - - - C6 -  C6 - - Bb5 Ab5 -  Eb5 - - - Ab5 -  F5 - G5 - Ab5 -  C6 - Bb5 - Ab5 -  Bb5 - - - - -  Ab5 - F5 - D5 - ';
  const ch='EbM7 EbM7 Cm7 Cm7 AbM7 AbM7 Bb Bb  EbM7 EbM7 Gm7 Gm7 Ab Bb Eb Eb  AbM7 AbM7 EbM7 EbM7 Fm7 Fm7 Bb Bb  Cm7 Cm7 AbM7 AbM7 Fm7 Fm7 Bb Bb7';
  return song({key:'Eb major',bpm:108,bpb:3,ec:1,fb:0.4},
    [{w:'sine',v:0.07,vib:10,s:0.7,a:0.03,e:1},a+b],
    [{w:'triangle',v:0.04,g:0.8,e:1},musArp(ch,6,'1 5 7 3^ 7 5','Ab3')],
    [{w:'sine',v:0.035,s:0.9,a:0.15,g:1},musArp(ch,6,'5 - - - - -','Ab3')],
    [{w:'triangle',v:0.2,s:0.5,g:0.95},musArp(ch,6,'1 - - - 5 -','Ab2')],
    [{dr:1,v:0.5},'k . r . r .  k . r . r c']);
})();
/* world 4, Spooky Hollow: D minor on tiptoe, with a swing. Short plucked notes that creep past their neighbours, a ghost whistling far above, and a major-key middle so it stays friendly. */
SONGS.hollow=(()=>{
  const h='D5 . F5 . A5 . G#5 A5  D6 . . A5 . F5 . .  G5 . Bb5 . D6 . C#6 D6  G6 . . D6 . Bb5 . . ';
  const a=h+'A5 . A5 G#5 A5 . F5 .  D5 . F5 . A5 - . .  C#5 . E5 . G5 . Bb5 .  A5 - - . E5 . C#5 . ';
  const a2=h+'F6 . D6 . Bb5 . D6 .  E6 . C#6 . A5 . G5 E5  D5 . F5 A5 D6 - . .  . . A4 . D5 . . . ';
  const b='C6 - A5 . F5 . A5 .  C6 . C6 D6 C6 - A5 .  Bb5 - G5 . E5 . G5 .  Bb5 . Bb5 C6 Bb5 - G5 .  A5 - G5 . D5 . G5 .  Bb5 . A5 . G5 - D5 .  E5 . G5 . Bb5 . A5 G5  A5 - - . C#6 - - . ';
  const ch='Dm Dm Gm Gm Dm Dm A7 A7  Dm Dm Gm Gm Bb A7 Dm Dm  F F C7 C7 Gm Gm A7 A7  Dm Dm Gm Gm Bb A7 Dm Dm';
  return song({key:'D minor',bpm:116,sw:0.18},
    [{w:'square',v:0.058,g:0.5,e:1},a+a2+b+a2],
    [{w:'triangle',v:0.11,g:0.35},musArp(ch,8,'. 3 . 5 . 3 . 5','G3')],
    [{w:'sine',v:0.04,vib:18,s:0.9,a:0.12,g:1},musArp(ch,8,'5 - - - - - - -','A4')],
    [{w:'triangle',v:0.25,g:0.5},musArp(ch,8,'1 . 5 . 8 . 5 .','F2')],
    [{dr:1,v:0.7},'k . h h p . h h '.repeat(7)+'k . h h p p h p']);
})();
/* stretch a line written in eighths onto a sixteenth grid: every note, hold and rest lasts two steps */
function musX2(s){ return s.trim().split(/\s+/).map(k=>k==='.'?'. .':k+' -').join(' ')+' '; }
/* world 5, Tick-Tock Works: B minor on a sixteenth grid. Tick and tock mark every eighth, the arpeggio chugs like a piston, and the tune is stiff and wound-up until the middle section sings over the machinery. */
SONGS.works=(()=>{
  const h='B4 . B4 D5 F#5 . F#5 .  B5 . A5 F#5 D5 . F#5 .  G4 . G4 B4 D5 . D5 .  G5 . F#5 D5 B4 . D5 . ';
  const a=h+'E5 . E5 G5 B5 . B5 .  E6 . D6 B5 G5 . B5 .  F#5 . A#5 . C#6 . A#5 .  F#5 F#5 . F#5 A#5 C#6 F#6 . ';
  const a2=h+'E5 . E5 G5 B5 . E6 .  C#6 . A#5 . F#5 . A#5 C#6  B5 - . F#5 D5 . F#5 .  B4 . B4 . B5 . . . ';
  const b='F#5 - - A5 D6 - - .  C#6 - D6 - A5 - - .  E5 - - A5 C#6 - - .  B5 - C#6 - A5 - - .  G5 - - B5 E6 - - .  D6 - E6 - B5 - G5 .  A#5 - - C#6 F#6 - - .  E6 - C#6 - A#5 - F#5 . ';
  const ch='Bm Bm G G Em Em F# F#  Bm Bm G G Em F# Bm Bm  D D A A Em Em F# F#7  Bm Bm G G Em F# Bm Bm';
  return song({key:'B minor',bpm:138,spb:4},
    [{w:'square',v:0.048,det:7,g:0.8,e:1},musX2(a+a2+b+a2)],
    [{w:'square',v:0.022,g:0.45},musArp(ch,16,'1 5 8 5 3 5 8 5','D3')],
    [{w:'triangle',v:0.26,g:0.6},musArp(ch,16,'1 . 1 . 8 . 1 . 1 . 1 . 8 . 5 .','E2')],
    [{dr:1,v:0.9},'kt . h . sT . h . kt . h k sT . h h '.repeat(7)+'kt . h . sT . h . kt . s . s s s s']);
})();
/* world 6, Cloud Nine: A major, wide open. A soaring pulse lead with slow vibrato holds its notes over rising arpeggios and a soft pad. */
SONGS.clouds=(()=>{
  const h='E5 - A5 - C#6 - - B5  B5 - - G#5 E5 - - .  F#5 - A5 - C#6 - - D6  D6 - - A5 F#5 - - . ';
  const k='D6 - - B5 F#5 - B5 -  E6 - - D6 B5 - G#5 -  ';
  const a=h+'E5 - A5 - C#6 - E6 -  E6 - - D6 B5 - G#5 -  A5 - - F#5 D6 - - C#6  B5 - - - . E5 G#5 B5 ';
  const a2=h+k+'A5 - - - - - E5 A5  C#6 - - - A5 - E6 - ';
  const b='F#6 - - - D6 - A5 -  F#6 - E6 - D6 - - .  E6 - - - C#6 - A5 -  E6 - D6 - C#6 - - .  D6 - - - B5 - F#5 -  D6 - C#6 - B5 - - .  B5 - - G#5 B5 - E6 -  D6 - - B5 G#5 - E5 - ';
  const a3=h+k+'A5 - - - - - . .  B5 - G#5 - E5 - . . ';
  const ch='A E F#m D A E D E  A E F#m D Bm E A A  D D A A Bm Bm E E7  A E F#m D Bm E A E';
  return song({key:'A major',bpm:140},
    [{w:'square',v:0.042,det:8,vib:12,s:0.6,a:0.015,e:1},a+a2+b+a3],
    [{w:'triangle',v:0.085,g:0.6,e:1},musArp(ch,8,'1 3 5 8 3^ 8 5 3','A3')],
    [{w:'sine',v:0.05,s:0.9,a:0.12,g:1},musArp(ch,8,'5 - - - - - - -','A3')],
    [{w:'triangle',v:0.24,g:0.85},musArp(ch,8,'1 - . 1 5 - 8 .','E2')],
    [{dr:1,v:0.8},'k . h h s . h o '.repeat(7)+'k . h h s . s s']);
})();
/* world 7, Magma Mountain: C minor and in a hurry. A buzzing saw lead hammers repeated notes, a saw bass pounds in octaves with a triangle underneath for weight. */
SONGS.magma=(()=>{
  const h='C5 C5 . Eb5 . G5 . Eb5  C6 - Bb5 G5 Eb5 - . .  Ab4 Ab4 . C5 . Eb5 . C5  Ab5 - G5 Eb5 C5 - . . ';
  const a=h+'F5 F5 . Ab5 . C6 . Ab5  F6 - Eb6 C6 Ab5 - . .  G5 . B5 . D6 . F6 .  Eb6 D6 B5 G5 D5 G5 B5 D6 ';
  const a2=h+'F5 F5 . Ab5 . C6 . F6  D6 . B5 . G5 . B5 D6  C6 - - G5 Eb5 - G5 .  C5 C5 . C5 . G4 C5 . ';
  const b='G5 - - Bb5 Eb6 - - .  D6 - Eb6 - Bb5 - G5 .  F5 - - Bb5 D6 - - .  C6 - D6 - Bb5 - F5 .  Eb5 - - Ab5 C6 - - .  Bb5 - C6 - Ab5 - Eb5 .  D5 . G5 . B5 . D6 .  F6 - D6 - B5 G5 F5 D5 ';
  const ch='Cm Cm Ab Ab Fm Fm G G  Cm Cm Ab Ab Fm G Cm Cm  Eb Eb Bb Bb Ab Ab G G7  Cm Cm Ab Ab Fm G Cm Cm';
  return song({key:'C minor',bpm:168},
    [{w:'sawtooth',v:0.055,det:10,g:0.8,e:1},a+a2+b+a2],
    [{w:'square',v:0.024,g:0.4},musArp(ch,8,'8 5 3 5 8 5 3 5','G3')],
    [{w:'sawtooth',v:0.07,g:0.6},musArp(ch,8,'1 1 8 1 1 1 8 1','C2')],
    [{w:'triangle',v:0.2,g:0.9},musArp(ch,8,'1 - - . 1 - . .','G2')],
    [{dr:1,v:1},'k h s h k k s h '.repeat(7)+'k k s s k s s s']);
})();
/* world 8, Lunar Palace: E minor, slow and huge. The lead leaps fifths and octaves and hangs there; twinkling ninths, a long echo and a sparse beat leave room for the low gravity. The middle rises to G and D before falling back through B7. */
SONGS.moon=(()=>{
  const h='E5 - - - B5 - - -  G5 - - F#5 E5 - - .  E5 - - - C6 - - -  B5 - - G5 E5 - - . ';
  const a=h+'A5 - - - E6 - - -  C6 - - B5 A5 - - .  B5 - - - F#6 - - -  D#6 - - B5 A5 - F#5 - ';
  const a2=h+'A5 - - - E6 - C6 -  B5 - A5 - F#5 - D#5 -  E5 - - - - - G5 B5  E6 - - - - - . . ';
  const b='D6 - - - B5 - G5 -  D6 - - - - - B5 D6  F#6 - - - D6 - A5 -  F#6 - - - - - E6 D6  E6 - - - B5 - G5 -  E6 - - D6 C6 - B5 -  B5 - - - D#6 - - -  F#6 - - - - - B5 - ';
  const ch='Em Em CM7 CM7 Am Am B7 B7  Em Em CM7 CM7 Am B7 Em Em  G G D D CM7 CM7 B7 B7  Em Em CM7 CM7 Am B7 Em Em';
  return song({key:'E minor',bpm:104,ec:1.5,fb:0.45},
    [{w:'square',v:0.04,det:6,vib:12,s:0.7,a:0.03,e:1},a+a2+b+a2],
    [{w:'sine',v:0.055,g:0.5,e:1},musArp(ch,8,'1 5 8 9 3^ 9 8 5','G3')],
    [{w:'sine',v:0.035,s:0.9,a:0.2,g:1},musArp(ch,8,'5 - - - - - - -','E3')],
    [{w:'triangle',v:0.2,s:0.6,g:0.95},musArp(ch,8,'1 - - - - - 5 -','E2')],
    [{dr:1,v:0.7},'k . h . . . h .  k . h . s . h h']);
})();
/* boss fights: G minor at a gallop. The harmony steps down G minor, F, E flat, D like a closing trap; the middle section swerves to A flat for drama. */
SONGS.boss=(()=>{
  const h='G5 . Bb5 D6 . Bb5 G5 .  D6 - - Bb5 G5 - D5 .  F5 . A5 C6 . A5 F5 .  C6 - - A5 F5 - C5 . ';
  const a=h+'Eb5 . G5 Bb5 . G5 Eb5 .  Bb5 - - G5 Eb5 - G5 Bb5  A5 . F#5 A5 . D6 A5 .  F#5 A5 D6 F#6 . D6 C6 A5 ';
  const a2=h+'Eb5 . G5 Bb5 . Eb6 Bb5 .  D6 . C6 A5 . F#5 A5 C6  Bb5 - - G5 D5 - G5 .  G5 G5 . G5 . D5 G5 . ';
  const b='C6 - - Eb6 G6 - - .  F6 - Eb6 - C6 - G5 .  Bb5 - - D6 G6 - - .  F6 - D6 - Bb5 - G5 .  Ab5 - - C6 Eb6 - - .  D6 - C6 - Ab5 - Eb5 .  D5 F#5 A5 D6 . A5 F#5 .  C6 . A5 . F#5 . D5 . ';
  const ch='Gm Gm F F Eb Eb D D  Gm Gm F F Eb D Gm Gm  Cm Cm Gm Gm Ab Ab D D7  Gm Gm F F Eb D Gm Gm';
  return song({key:'G minor',bpm:164},
    [{w:'square',v:0.05,det:12,vib:8,g:0.85,e:1},a+a2+b+a2],
    [{w:'sawtooth',v:0.026,g:0.4},musArp(ch,8,'1 . 3 1 . 3 5 .','C4')],
    [{w:'sawtooth',v:0.07,g:0.6},musArp(ch,8,'1 . 1 1 1 . 1 1','C2')],
    [{w:'triangle',v:0.22,g:0.7},musArp(ch,8,'1 . . 1 . . 5 .','G2')],
    [{dr:1,v:1},'kh h sh kh h kh sh h '.repeat(7)+'kh kh sh sh kb kb s s']);
})();
/* secret coin rooms: sixteen giddy bars of E major, all running eighths and hand claps, over before you know it and round again */
SONGS.bonus=(()=>{
  const a='E5 G#5 B5 E6 B5 G#5 B5 .  E6 . E6 . D#6 B5 G#5 .  A5 C#6 E6 A6 E6 C#6 E6 .  A6 . A6 . G#6 E6 C#6 .  B5 G#5 E5 G#5 B5 E6 G#6 .  B5 . G#5 . E5 - . .  F#5 B5 D#6 F#6 D#6 B5 D#6 .  F#6 . D#6 . B5 A5 F#5 D#5 ';
  const a2='C#6 . E6 . A5 . C#6 E6  A6 - E6 . C#6 - . .  B5 . E6 . G#5 . B5 E6  G#6 - E6 . B5 - . .  A#5 . C#6 . E6 . C#6 A#5  B5 D#6 F#6 B6 . F#6 D#6 .  E6 . B5 G#5 E5 . G#5 B5  D#6 . B5 . F#5 A5 B5 D#6 ';
  const ch='E E A A E E B B7  A A E E F#7 B E B7';
  return song({key:'E major',bpm:184},
    [{w:'square',v:0.06,g:0.7,e:1},a+a2],
    [{w:'triangle',v:0.12,g:0.4},musArp(ch,8,'. 3 . 5 . 8 . 5','A3')],
    [{w:'triangle',v:0.25,g:0.6},musArp(ch,8,'1 . 8 . 1 . 8 5','E2')],
    [{dr:1,v:0.9},'k h sp h k k sp h '.repeat(7)+'k h sp h sp sp sp sp']);
})();
