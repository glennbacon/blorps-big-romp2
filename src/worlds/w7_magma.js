/* ================= World 7: Magma Mountain ================= */
/* A volcano. Dark basalt and obsidian lit from below; every pit holds lava, and lava is the end at a touch. New here:
   the Emberling, which leaps out of the lava in a column and can be neither stomped nor burned. The world's gadgets
   are flame jets, ember chains, cracked ledges that fall, crumbling bridges, belts of cooling rock and launch pods. */
const W7_ROCK='#2e2638', W7_DARK='#231c2d', W7_LAVA='#ff6a14', W7_HOT='#ffc23e';
const w7Lamps=[], w7Vents=[];
const w7Lamp=(x,y,z,power,col,reach)=>w7Lamps.push({x,y,z,col:col||0xff7a2a,power:power||1.2,reach:reach||7.5});

/* ---------- props (units: 1/8 tile) ---------- */
function w7Spike(R){ const c='#2b2542',l='#4d4780',h='#8078c8', b=[], n=2+((R()*3)|0);
  for(let i=0;i<n;i++){ const x=(i-(n-1)/2)*2.6+(R()-0.5), z=(R()-0.5)*2, t=5+R()*9, w=2.2+R()*1.2;
    b.push([x-w/2,0,z-w/2,w,t*0.6,w,c],[x-w/2+0.4,t*0.6,z-w/2+0.4,w-0.8,t*0.3,w-0.8,l],[x-0.4,t*0.9,z-0.4,0.8,t*0.16,0.8,h],[x-w/2+0.3,t*0.15,z+w/2,0.5,t*0.35,0.12,h]); }
  return b; }
/* a cracked boulder: dark rock, with seams of light set into its face */
function w7Boulder(R){ const c='#3a3248',d='#2a2438',l='#544a68', s=5+R()*3, g=pick(R,['#ff8a1f','#ff6a14']);
  return {near:[[-s/2,0,-s/2,s,s*0.7,s,c],[-s/2+0.6,s*0.7,-s/2+0.6,s-1.2,s*0.2,s-1.2,l],[-s/2-0.8,0,-s/2+1,1,s*0.35,s-2,d],[s/2-0.2,0,-s/2+1.4,1,s*0.3,s-2.4,d]],
    glow:[[-s*0.22,s*0.08,s/2,0.45,s*0.5,0.14,g],[-s*0.22,s*0.4,s/2,s*0.46,0.45,0.14,g],[s*0.2,s*0.4,s/2,0.45,s*0.22,0.14,W7_HOT],[-s*0.4,s*0.2,s/2,s*0.2,0.4,0.14,W7_HOT]]}; }
/* a charred tree with a few leaves still burning */
function w7Tree(R){ const c='#2a2030',d='#1c1622', h=12+R()*8, near=[[-1,0,-1,2,h,2,c],[-1.5,0,-1.5,3,2,3,d],[-0.6,h,-0.6,1.2,2,1.2,c]], glow=[[-0.8,h+2,-0.8,1.6,1.4,1.6,'#ffb02e']];
  for(let k=0, n=3+((R()*3)|0);k<n;k++){ const y=h*(0.4+R()*0.5), s=k%2?1:-1, len=3+R()*4, up=2+R()*2.5;
    near.push([s>0?1:-1-len,y,-0.5,len,1,1,c],[s>0?len:-1-len,y+1,-0.5,1,up,1,c]);
    if(R()<0.75) glow.push([s>0?len-0.3:-1.3-len,y+1+up,-0.8,1.6,1.5,1.6,pick(R,['#ff8a1f',W7_HOT,'#ff5a14'])]); }
  return {near,glow}; }
function w7Mound(){ const c='#4a4258',d='#2a2438'; return {near:[[-3,0,-3,6,1.2,6,c],[-2.2,1.2,-2.2,4.4,1,4.4,shade(c,1.12)],[-1.4,2.2,-1.4,2.8,0.5,2.8,d]],glow:[[-0.9,2.7,-0.9,1.8,0.1,1.8,'#ff7a1f']]}; }
function w7FireFlower(){ return {near:[[-0.4,0,-0.4,0.8,4,0.8,'#5a6a3a'],[0.4,1.4,-0.4,1.5,0.7,0.8,'#6f8046'],[-1.9,2.2,-0.4,1.5,0.7,0.8,'#6f8046']],
  glow:[[-1.5,4,-0.7,3,2.2,1.4,'#ff8a1f'],[-0.8,6.2,-0.6,1.6,1.3,1.2,W7_HOT],[-0.5,4.6,0.7,1,1,0.25,'#fff3a0']]}; }
function w7Fern(R){ const g='#4f8a5a',l='#7fb86a',t='#ffb347', b=[];
  for(const q of [[-1,0],[1,0],[-0.6,0.8],[0.6,-0.8],[0,0]]){ const h=3+R()*3; b.push([q[0]*1.2-0.4,0,q[1]*1.2-0.4,0.8,h,0.8,g],[q[0]*2.4-0.4,h,q[1]*2.4-0.4,0.8,1.6,0.8,l],[q[0]*3.5-0.4,h+0.9,q[1]*3.5-0.4,0.8,0.8,0.8,t]); }
  return b; }
function w7Ribs(){ const c='#e8e0d0',d='#bfb49e', b=[[-7,0,-0.6,14,1,1.2,c]]; for(let i=0;i<4;i++){ const x=-6+i*3.6; b.push([x,1,-0.5,1,5-i*0.7,1,c],[x,6-i*0.7,-0.5,2.6,1,1,d]); } return b; }
function w7Skull(){ const c='#e8e0d0',d='#bfb49e'; return [[-2,0,-2,4,3.4,4,c],[-1.5,3.4,-1.6,3,0.8,3.2,c],[-1.3,1.4,2,0.9,1.2,0.15,INK],[0.4,1.4,2,0.9,1.2,0.15,INK],[-0.8,0,2,1.6,0.6,0.15,d],[-3,2.6,-0.5,1,1.6,1,d],[2,2.6,-0.5,1,1.6,1,d]]; }
function w7Cart(){ const c='#7a5a48',l='#a07a5c',k='#2c2630',r='#8a8aa3';
  return {near:[[-9,0,-3,18,0.3,0.5,r],[-9,0,2.5,18,0.3,0.5,r],[-7,0,-3.6,1,0.2,7.2,'#5a3c24'],[-1,0,-3.6,1,0.2,7.2,'#5a3c24'],[5,0,-3.6,1,0.2,7.2,'#5a3c24'],
      [-5,1.6,-3,10,4,6,c],[-5.4,5.2,-3.4,10.8,0.8,6.8,l],[-4.2,0.3,-3.4,2,2,0.8,k],[2.2,0.3,-3.4,2,2,0.8,k],[-4.2,0.3,2.6,2,2,0.8,k],[2.2,0.3,2.6,2,2,0.8,k],[-5,3,3,10,0.6,0.15,shade(c,0.7)]],
    glow:[[-3.6,6,-2,3,1.3,3,'#ffb02e'],[0.4,6,-1.4,2.6,1,2.8,'#ff7a1f'],[-1,6,0.6,1.6,1.6,1.6,W7_HOT]]}; }
function w7Lantern(){ const w='#6b4526',k='#3a3040'; return {near:[[-0.5,0,-0.5,1,12,1,w],[-1.2,0,-1.2,2.4,0.8,2.4,shade(w,0.75)],[-0.5,11,-0.5,4.2,1,1,w],[2.9,9.2,-0.2,0.4,1.8,0.4,k],[2.2,8.8,-0.9,1.8,0.5,1.8,k],[2.2,6,-0.9,1.8,0.4,1.8,k]],
  glow:[[2.4,6.4,-0.7,1.4,2.4,1.4,'#ffd23e']]}; }
function w7Puddle(){ return {near:[[-4.8,0,-3.2,9.6,0.4,0.9,'#3a3248'],[-4.8,0,2.3,9.6,0.4,0.9,'#3a3248'],[-4.8,0,-2.3,0.9,0.4,4.6,'#3a3248'],[3.9,0,-2.3,0.9,0.4,4.6,'#3a3248']],
  glow:[[-3.9,0,-2.3,7.8,0.22,4.6,W7_LAVA],[-2.4,0.22,-1.3,3.6,0.06,2,W7_HOT]]}; }
const w7Put2=(S,m,x,y,z)=>{ put(S.near,m.near,x,y,z); put(S.glow,m.glow,x,y,z); };

/* ---------- pieces of the far view (units: tiles) ---------- */
/* a jagged ridge: a row of rock columns across the level at one depth */
function w7Ridge(list,R,x0,x1,z,base,lo,hi,col){
  let h=lo+R()*(hi-lo), x=x0;
  while(x<x1){ const w=1.6+R()*3.2; h=clamp(h+(R()-0.5)*(hi-lo)*0.7,lo,hi); const hh=R()<0.16?h+(hi-lo)*0.45:h, c=shade(col,0.9+R()*0.22);
    list.push([x,base-40,z-2,w+0.1,40+hh,4,c]);
    if(R()<0.6) list.push([x+w*0.25,base+hh,z-1.5,w*0.5,0.5+R()*1.4,3,shade(c,1.12)]);
    x+=w; } }
/* a jagged peak standing alone on the plain: a cluster of columns, the tallest in the middle */
function w7Peak(S,R,cx,z,base,top,w,col,fall){
  const n=3+((R()*4)|0);
  for(let i=0;i<n;i++){ const u=n>1?i/(n-1)*2-1:0, cw=w/n*(1.1+R()*0.5), h=(top-base)*(1-Math.abs(u)*0.75)*(0.75+R()*0.35), x=cx+u*w/2-cw/2, c=shade(col,0.88+R()*0.26);
    S.far.push([x,base-30,z-2-R(),cw,30+h,4,c],[x+cw*0.2,base+h,z-1.6,cw*0.5,0.4+R()*1.2,3,shade(c,1.14)]);
    if(fall&&i===(n>>1)) S.glowFar.push([x+cw*0.3,base,z+2.06,0.8,h*0.85,0.08,W7_LAVA],[x+cw*0.3+0.2,base,z+2.1,0.25,h*0.85,0.05,W7_HOT],[x+cw*0.3-1.2,base+0.05,z+2.1,3.2,0.25,1,'#ff8a1f']); }
}
/* the great cone: stepped slabs, a glowing crater, rivers of lava down its face, and smoke that climbs and swells */
function w7Cone(S,R,cx,z,base,top,hw,rivers,smoke){
  const far=S.far, gf=S.glowFar, n=Math.round((top-base)/1.1), step=(top-base)/n, prof=k=>5+hw*Math.pow(1-k/n,1.7);
  for(let k=0;k<n;k++){ const w=prof(k), y=base+step*k, c=mixc('#35263f','#5a2e3c',k/n);
    far.push([cx-w,y-(k?0:40),z-4,w*2,step+(k?0:40),8,k%2?c:shade(c,1.1)]); }
  const tw=prof(n-1);
  far.push([cx-tw-0.4,top-0.2,z-4.2,1.6,1.3,8.4,'#4a2c3c'],[cx+tw-1.2,top-0.2,z-4.2,1.6,0.9,8.4,'#4a2c3c']);
  gf.push([cx-tw+1.2,top-0.3,z-3,tw*2-2.4,0.6,6,'#ffa02e'],[cx-tw+2.2,top+0.3,z-2,tw*2-4.4,0.5,4,'#ffe14d']);
  S.soft.push([cx-tw,top+0.7,z-2.5,tw*2,1.6,3,'#d8581c'],[cx-tw+0.6,top+2.3,z-2.5,tw*2-0.6,1.6,3,'#93381f']);
  for(let i=0;i<rivers;i++){ const s=i%2?1:-1; let f=(0.08+R()*0.55)*s, px=null; const stop=Math.max(0,n-4-((R()*(n-3))|0));
    for(let k=n-1;k>=stop;k--){ const x=cx+prof(k)*f, y=base+step*k;
      gf.push([x-0.45,y,z+4.03,0.9,step,0.1,k%2?'#ff7a1f':'#ffa02e']);
      if(px!==null) gf.push([Math.min(x,px)-0.45,y+step-0.2,z+4.03,Math.abs(x-px)+0.9,0.4,0.14,'#ffb02e']);
      px=x; f+=(R()-0.5)*0.1; } }
  for(let i=0;i<9;i++){ const m=new T.Mesh(tmpGeo(voxGeo(cloudBoxes(R,i%2?smoke:shade(smoke,1.3)),1)),MAT.soft), ph=i/9; world.add(m);
    critters.push({tick(dt,time){ const u=(time*0.03+ph)%1, s=1.5+u*4.5; m.position.set(cx-2.6*s+u*u*24,top+0.6+u*26,z-1-u*3); m.scale.set(s,s,1); }}); }
}
/* a fall of lava down a cliff just behind the shelf */
function w7Fall(S,R,x,base,h){
  S.far.push([x-3.4,base-8,-10,6.8,8+h,3.4,W7_DARK],[x-4.6,base-8,-9.4,2.2,8+h*0.7,3,shade(W7_DARK,1.2)],[x+2.6,base-8,-9.2,2.4,8+h*0.55,2.8,shade(W7_DARK,1.15)],[x-2.2,base+h,-9.6,1.6,0.8,2.6,W7_DARK]);
  S.glowFar.push([x-0.9,base-0.4,-6.58,1.8,h+0.5,0.12,W7_LAVA],[x-0.5,base-0.4,-6.5,0.5,h+0.5,0.06,W7_HOT],[x+0.3,base+h*0.3,-6.5,0.3,h*0.5,0.06,'#ffe14d'],[x-1.6,base-0.45,-6.6,3.2,0.5,0.5,W7_HOT]);
  w7Lamp(x,base+2.5,-4.6,1.5,0xff6a1f,9);
}

THEMES.magma={ music:'magma', w7:0,
  sky:['#2a1440','#d0482a','#ffc85a'], skyMid:0.8, glowCol:0xff8a3a, sunGlow:0.9,
  fog:0x8a3238, fogNear:14, fogFar:180,
  hemiSky:0xb8a8d8, hemiGround:0xff7a3a, hemiI:0.64, sunI:0.5, sunCol:0xffc890, sunDir:[-0.5,0.6,0.55],
  top:'#857f8e', topS:['#96909e','#76707f','#a39da9','#6a6474'], dirt:W7_ROCK, dirtS:['#3a3046','#241d2e','#43364f'], cap:'#6f6977', capL:'#a29caa', capD:'#ff7a1f',
  brick:['#b5523a','#6e2a22','#e08660'], hard:['#5c5878','#8f8ab8','#35314d'], pipe:['#6f8fd8','#b8ccff','#4560a8','#1c2548'],
  semi:'plank', plat:['#cfc8d8','#d0603a'], dust:'#cfc6d0', back:-6, fringe:['#5d5766','#8a8492','#c8582a'],
  liquid:{kind:'lava',a:'#ff5a14',b:'#ffe14d',op:1,mask:0.3,flow:0.35},
  disc:['#ff5a2a','#ffb347','#7a1408'], discY:9.5, bloom:1, hi:0.1, vig:0.5, cloudTint:'#5a2c3c', smoke:'#3a2838', embers:70,
  looks:[null,
    /* the lava lake under a red sky */
    {w7:1, sky:['#3a0f1f','#d83a1c','#ffa03a'], skyMid:0.82, fog:0x8a2a1c, glowCol:0xff6a2a, hemiSky:0xc8a0b8, hemiGround:0xff6a2a, sunCol:0xffb080,
      liquid:{kind:'lava',a:'#d9400c',b:'#ffa530',op:1,mask:0.62,flow:0.3,far:150}, disc:['#ff3a1a','#ff8a3a','#6a0c06'], discY:8, cloudTint:'#6a2428', embers:110},
    /* inside the mountain */
    {w7:2, sky:['#1a0a1c','#c8401c','#ffb04a'], fog:0x1a0f1c, fogNear:10, fogFar:70, hemiSky:0x7a6aa8, hemiGround:0xff6a2a, hemiI:0.52, sunI:0.36, sunCol:0xffb070, sunDir:[-0.2,0.5,0.84],
      disc:null, bloom:1.1, vig:0.62, cloudTint:'#3a1c28', embers:60},
    /* the eruption */
    {w7:3, sky:['#8a2410','#ff7a1a','#ffe070'], fog:0xd8581c, glowCol:0xffc04a, hemiSky:0xffc8a0, hemiGround:0xff5a1a, hemiI:0.68, sunI:0.55, sunCol:0xffa050,
      disc:null, cloudTint:'#5a2420', smoke:'#4a2a2c', embers:230},
    /* the crater rim at night */
    {w7:4, sky:['#07061a','#2a1240','#b83a2a'], skyMid:0.78, fog:0x3a1428, glowCol:0xff5a2a, stars:0.9, hemiSky:0x8a88d8, hemiGround:0xff6a2a, hemiI:0.64, sunI:0.46, sunCol:0xc8b8ff,
      disc:null, cloudTint:'#2a1c38', smoke:'#2c2238', embers:95}],
  /* the far view: the cone and its smoke, ridges at three depths, a plain of dark rock crossed by rivers of lava (or a
     lake of it), and embers rising everywhere. Inside the mountain: a wall of rock, veined with light. */
  scenery(S,R){
    const W=S.W, far=S.far, gf=S.glowFar, look=S.TH.w7, L0=S.L, t=L0.tiles, cave=look===2, gy=cave?(L0.roof||S.H)-2:0, cone=L0.cone===undefined?0.6:L0.cone;
    w7Lamps.length=0; w7Vents.length=0;
    if(cave){
      /* the back wall, its strata and bulges, veins of lava and a few cold crystals */
      const roof=gy+2, wc='#261d30';
      far.push([-30,-10,-12,W+60,roof+10,5.6,wc]);
      for(let y=0.4;y<roof-1.5;y+=1.3+R()*2.2){ let x=-20; while(x<W+20){ const w=5+R()*13; if(R()<0.62) far.push([x,y,-6.7,w,0.5+R()*1.1,0.5,shade(wc,1.12+R()*0.3)]); x+=w+R()*5; } }
      for(let i=0;i<W*roof/26;i++){ const x=R()*W, y=R()*(roof-3), s=1+R()*2.4; far.push([x,y,-7,s*1.3,s,0.9,shade(wc,0.8+R()*0.5)]); }
      for(let i=0;i<W*roof/90;i++){ let x=R()*W, y=1+R()*(roof-4); const c=R()<0.5?'#ff6a14':'#ff8a1f';
        for(let k=0;k<5+R()*5;k++){ const len=0.6+R()*1.8; if(k%2){ gf.push([x,y,-6.38,0.16,len,0.05,c]); y+=len; } else { const d=R()<0.5?-1:1; gf.push([d>0?x:x-len,y,-6.38,len+0.16,0.16,0.05,c]); x+=d*len; } if(y>roof-1) break; } }
      for(let i=0;i<W*roof/120;i++){ const x=R()*W, y=R()*(roof-3), c=pick(R,['#6a58d8','#4a78d0','#8a5ad0']);
        gf.push([x,y,-6.4,0.3,0.9+R()*0.6,0.2,c],[x+0.35,y,-6.4,0.25,0.5+R()*0.4,0.2,shade(c,0.8)],[x-0.3,y,-6.4,0.22,0.4,0.2,shade(c,0.8)]); }
      /* pit props under every roof: posts and beams, lanterns on chains, teeth of stone */
      for(let x=2;x<W-2;x++) for(let y=2;y<roof-2;y++){ const k=y*W+x; if(t[k]!==GROUND||t[k-W]===GROUND) continue;
        if(t[k-W]===AIR&&R()<0.3){ const len=0.4+R()*1.5; far.push([x+R()*0.5,y-len,-1.7-R()*4,0.5,len,0.5,shade(wc,1.3)],[x+0.1+R()*0.4,y-len*0.5,-2-R()*3.6,0.4,len*0.5,0.4,shade(wc,1.6)]); }
        let f=y-1; while(f>y-9&&f>0&&t[f*W+x]===AIR) f--; const hgt=y-1-f;
        if(t[f*W+x]!==GROUND||hgt<4||hgt>7) continue;
        if(x%8===3){ far.push([x+0.3,f+1,-5.7,0.4,hgt,0.4,'#6b4526'],[x-0.4,y-0.5,-5.7,1.8,0.5,0.45,'#7d5530']); }
        if(x%11===6){ far.push([x+0.45,y-1.3,-3.05,0.1,1.3,0.1,'#3a3040'],[x+0.25,y-1.45,-3.25,0.5,0.15,0.5,'#3a3040']); gf.push([x+0.3,y-1.95,-3.2,0.4,0.5,0.4,'#ffd23e']); w7Lamp(x+0.5,y-1.8,-2.2,1.25,0xffb04a,8.5); } }
      for(const x of (L0.falls||[])){ gf.push([x-0.8,1.2,-6.36,1.6,roof-1,0.1,W7_LAVA],[x-0.4,1.2,-6.3,0.45,roof-1,0.06,W7_HOT],[x-1.6,1.2,-6.4,3.2,0.5,0.4,W7_HOT]);
        for(let y=5;y<roof;y+=9) w7Lamp(x,y,-4.4,1.3,0xff6a1f,9); }
    }
    /* the land (or the lake) behind the shelf */
    if(look!==1) far.push([-90,gy-12,-190,W+180,13.4,cave?178:184,'#35283f']);
    if(!cave&&look!==1) for(let x=1;x<W-1;x++){ if(t[x]!==AIR||t[W+x]!==AIR) continue; let x1=x; while(x1<W-2&&t[x1+1]===AIR&&t[W+x1+1]===AIR) x1++;
      let px=(x+x1+1)/2, pw=Math.min(x1-x+1,4), z=-6;
      for(let k=0;k<5;k++){ const len=4+k*2.5; (k?S.soft:gf).push([px-pw/2,1.41,z-len,pw,0.05,len+0.3,k?'#e8540f':'#ff6a14']); z-=len; px+=(R()-0.5)*2.2; pw=Math.max(0.6,pw*0.55); }
      w7Lamp((x+x1+1)/2,2.3,-1.8,1.1,0xff6a1f,8); x=x1; }
    /* lone peaks on the plain, nearer ones darker, some bleeding lava; a low ridge along the horizon; rivers from the cone */
    for(let x=-80;x<W+80;x+=13+R()*18){ const z=-20-R()*78, k=(-z-20)/78; w7Peak(S,R,x,z,gy,gy+2+R()*2.6+k*3.6,6+R()*7+k*9,mixc('#2f2238','#5c3a54',k),R()<0.4); }
    w7Ridge(far,R,-230,W+230,-138,gy,2,6.5,'#5a3a50');
    if(look!==1) for(let i=0;i<W/50;i++){ let px=W*cone+(R()-0.5)*80, pw=0.7; for(let k=0;k<8;k++){ const nx=px+(R()-0.5)*7+(i*50-px)*0.12;
      S.soft.push([px-pw/2,gy+1.43,-92+k*9,pw,0.05,9.2,'#e8540f'],[Math.min(px,nx)-pw/2,gy+1.43,-92+k*9+8.6,Math.abs(nx-px)+pw,0.05,pw,'#e8540f']); px=nx; pw*=1.1; } }
    /* spires and split boulders close behind the shelf */
    for(let x=-12;x<W+12;x+=4+R()*7){ const z=-8-R()*6, h=1+R()*3, w=0.9+R()*1.3, c=pick(R,['#2b2542','#332a48','#262038']);
      far.push([x,gy-1,z,w,h+1,w,c],[x+w*0.2,gy+h,z+0.15,w*0.6,h*0.3,w*0.6,shade(c,1.3)],[x-w*0.7,gy-1,z+0.3,w*0.8,1+h*0.45,w*0.8,shade(c,0.9)]);
      if(R()<0.3){ gf.push([x+w*0.3,gy+h*0.2,z+w+0.02,0.14,h*0.5,0.05,'#ff8a1f'],[x+w*0.3,gy+h*0.5,z+w+0.02,w*0.5,0.14,0.05,W7_HOT]); } }
    for(const x of (cave?[]:(L0.falls||[]))) w7Fall(S,R,x,1.3,8+R()*2);
    /* the mountain itself */
    const cy=gy+(look===0?10:look===3?12.5:11.5);
    w7Cone(S,R,W*cone,-96,gy-1,cy,look===0?40:48,look===3?9:look===4?7:5,S.TH.smoke);
    /* in the eruption the crater throws rocks */
    if(look===3) for(let i=0;i<7;i++){ const m=new T.Mesh(geo('w7bomb',()=>[[-0.6,-0.6,-0.6,1.2,1.2,1.2,'#ffa02e'],[-0.35,-0.35,0.6,0.7,0.7,0.2,'#fff3a0']],1),MAT.glow), ph=R()*6, vx=(R()-0.5)*16, vy=10+R()*8, T0=3+R()*2.6, cx=W*cone;
      world.add(m); critters.push({tick(dt,time){ const u=(time+ph)%T0; m.position.set(cx+vx*u,cy+vy*u-5*u*u,-93); m.rotation.z=time*3; }}); }
    /* what is left of the moon hangs over the rim at night */
    if(look===4){ const c='#c4cbf0',d='#99a1d0', m=new T.Mesh(tmpGeo(voxGeo([[-3,-1.5,0,3.4,3,1,c],[-2.5,-2.5,0,3.2,5,1,c],[-1.5,-3,0,2.4,6,1,c],[0.9,-2.6,0,1,2.2,1,c],[0.4,0.6,0,0.9,1.6,1,c],
        [-1.8,0.4,1,1.2,1.2,0.1,d],[-0.6,-1.8,1,0.9,0.9,0.1,d],[-2.3,-1.2,1,0.6,0.6,0.1,d],
        [2.6,1.4,0,1.3,1.3,1,c],[3.2,-1.6,0,1.6,1.4,1,c],[4.6,0.2,0,0.9,0.9,1,d],[5.6,2,0,0.6,0.6,1,c],[5.4,-2.6,0,0.7,0.7,1,d],[6.8,-0.6,0,0.5,0.5,1,c]],1)),new T.MeshBasicMaterial({vertexColors:true,fog:false}));
      m.material.userData.tmp=true; world.add(m); critters.push({tick(dt,time){ m.position.set(camX-viewHalfW*1.7,camY*0.5+9.4,-74); m.rotation.z=Math.sin(time*0.3)*0.04; }}); }
    /* cinder birds cross the sky */
    for(let i=0;i<Math.ceil(W/60);i++){ const k='#2a1c2c', g=new T.Group(), wl=new T.Mesh(geo('w7wingL',()=>[[-4,0,-0.8,4,0.5,1.6,k],[-5.2,0,-0.5,1.2,0.4,1,'#ff7a1f']]),MAT.soft), wr=new T.Mesh(geo('w7wingR',()=>[[0,0,-0.8,4,0.5,1.6,k],[4,0,-0.5,1.2,0.4,1,'#ff7a1f']]),MAT.soft);
      g.add(new T.Mesh(geo('w7bird',()=>[[-0.8,-0.5,-2,1.6,1.1,4,k],[-0.4,-0.1,2,0.8,0.5,0.9,'#ffb02e']]),MAT.soft),wl,wr);
      const z=-9-R()*14, y0=gy+9+R()*4, v=1.4+R()*1.4, ph=R()*9; g.position.set(R()*W,y0,z); g.rotation.y=Math.PI/2; world.add(g);
      critters.push({tick(dt,time){ g.position.x+=v*dt; if(g.position.x>W+30) g.position.x=-30; g.position.y=y0+Math.sin(time*0.7+ph)*0.8; const f=Math.sin(time*7+ph)*0.6; wl.rotation.z=-f; wr.rotation.z=f; }}); }
    for(let x=-50;x<W+50;x+=11+R()*13) S.addCloud(x,gy+9.5+R()*8,-30-R()*38,R,S.TH.cloudTint);
    if(S.TH.disc) skyDisc(S.TH.disc,null,S.TH.discY);
    S.addMotes(0xffa040,Math.round(S.TH.embers*W/220*Math.max(1,S.H/22)),0.1,-0.85,true);
    /* the nearest lamps get the lights that are left over, dimmed as they near the edge of the picture, so none pops */
    critters.push({tick(dt,time){
      let a=null,b=null,da=1e9,db=1e9;
      for(const l of w7Lamps){ const dx=l.x-camX, dy=(l.y-camY)*1.5, d=dx*dx+dy*dy; if(d<da){ b=a; db=da; a=l; da=d; } else if(d<db){ b=l; db=d; } }
      for(const q of [[a,da],[b,db]]) if(q[0]){ const k=clamp(1.35-Math.sqrt(q[1])/(viewHalfW+2),0,1); if(k>0) glowAt(q[0].x,q[0].y,q[0].z,q[0].col,q[0].power*k*(0.92+Math.sin(time*9+q[0].x)*0.08),q[0].reach); }
      for(const v of w7Vents) if(Math.abs(v[0]-camX)<viewHalfW+2&&Math.abs(v[1]-camY)<9&&Math.random()<dt*2.4) spawnPart(v[0]+(Math.random()-0.5)*0.2,v[1],v[2],'#d8d0dc',(Math.random()-0.5)*0.3,0.9+Math.random()*0.6,0,1.3,0.13+Math.random()*0.08,-0.6);
    }});
  },
  /* on the rock: charred trees, obsidian, split boulders, vents and bones at the back; cinders along the lip.
     Inside the mountain: lantern posts, mine carts, crystals. */
  decor(S,D,R){
    const r=R(), y=D.ty*8, cave=S.TH.w7===2&&D.ty<(S.L.roof||99)-1;
    /* where the flag stands on high ground, the hut's plot is kept bare */
    if(S.L.goal&&S.L.goal.y>2&&D.x>=S.L.goal.x+3&&D.x<=S.L.goal.x+10) return;
    if(cave){
      if(r<0.045&&D.free(3)&&D.open){ const x=D.jx(), z=D.zb(2.4,4.6); w7Put2(S,w7Lantern(),x,y,z); w7Lamp(x/8+0.4,D.ty+0.95,z/8+0.6,1.3,0xffb04a,8.5); }
      else if(r<0.085&&D.free(2)&&D.open) w7Put2(S,w7Cart(),D.jx(),y,D.zb(3,4.6));
      else if(r<0.17) put(S.near,dRock(pick(R,['#4a4258','#3a3248','#5a5068'])),D.jx(),y,D.zb(1.2,5.2));
      else if(r<0.23) put(S.glow,dCrystal(pick(R,['#6a58d8','#4a78d0','#8a5ad0'])),D.jx(),y,D.zb(2,5.2));
      else if(r<0.28) put(S.near,dBones(),D.jx(),y,D.zb(1.2,5));
      else if(r<0.34&&D.free(2)) put(S.near,w7Spike(R),D.jx(),y,D.zb(3,5.2));
      else if(r<0.42) put(S.flora,w7Fern(R),D.jx(),y,D.zb(1.3,5.2),1.5);
    } else {
      if(r<0.06&&D.free(5)&&D.open){ const x=D.jx(), z=D.zb(2.6,5); w7Put2(S,w7Tree(R),x,y,z); if(R()<0.5) w7Lamp(x/8,D.ty+1.6,z/8+0.8,1,0xff8a3a,7); }
      else if(r<0.13&&D.free(3)&&D.open) put(S.near,w7Spike(R),D.jx(),y,D.zb(2.2,5.2));
      else if(r<0.2&&D.free(2)){ const x=D.jx(), z=D.zb(2,4.8); w7Put2(S,w7Boulder(R),x,y,z); w7Lamp(x/8,D.ty+0.5,z/8+1,1.15); }
      else if(r<0.235){ const x=D.jx(), z=D.zb(1.6,5); w7Put2(S,w7Mound(),x,y,z); w7Vents.push([x/8,D.ty+0.45,z/8]); }
      else if(r<0.295){ const x=D.jx(), z=D.zb(1.2,5.2); w7Put2(S,w7FireFlower(),x,y,z); w7Lamp(x/8,D.ty+0.9,z/8+0.5,0.9,0xffa040,6); }
      else if(r<0.41) put(S.flora,w7Fern(R),D.jx(),y,D.zb(1.2,5.4),1.5);
      else if(r<0.44) put(S.near,R()<0.5?w7Ribs():w7Skull(),D.jx(),y,D.zb(1.6,5));
      else if(r<0.47) put(S.near,dBones(),D.jx(),y,D.zb(1.2,5.2));
      else if(r<0.55) put(S.near,dRock(pick(R,['#4a4258','#3a3248','#5a5068'])),D.jx(),y,D.zb(1.2,5.4));
      else if(r<0.575&&D.free(1)){ const x=D.jx(), z=D.zb(2.4,4.6); w7Put2(S,w7Puddle(),x,y,z); w7Lamp(x/8,D.ty+0.7,z/8,1.1,0xff6a1f,6.5); }
    }
    const f=R();
    if(f<0.1) put(S.glow,[[-0.6,0,-0.6,1.2,0.7,1.2,pick(R,['#ff8a1f','#ff6a14',W7_HOT])]],D.jx(),y,D.zf());
    else if(f<0.22) put(S.near,[[-1,0,-0.8,2,1,1.6,'#4a4258'],[-0.4,1,-0.4,1,0.5,1,'#5a5068']],D.jx(),y,D.zf());
    if(R()<0.14) put(S.near,dRock('#3a3248'),D.jx(),y,D.zb(1.1,5.6));
  }
};

/* 7-1: the foothills at dusk. One new danger at a time, each first met where a slip is cheap: an Emberling in a narrow
   pit, flame jets on flat ground, a cracked ledge over solid rock. Then the same again over lava. */
function w7l1(){
  const B=LevelBuilder(252,'magma');
  B.room(0,219).room(224,251,0,15,true).set('cone',0.78);
  B.ground(0,29).ground(33,61).ground(66,104).ground(110,121).ground(125,127).ground(131,150).ground(162,223);
  B.sign(5,'Lava burns at a touch. Mind the pits!');
  B.coins(8,3,3).row(13,5,'B?MB').enemy('spikit',21);
  B.sign(25,'Emberlings leap out of the lava. They cannot be stomped: wait for one to sink, then jump.');
  B.enemy('ember',31,2,{rise:4,gap:1.8}).arc(29,4,5);
  B.row(37,5,'?B?').enemy('fizzle',41);
  B.sign(45,'A flame jet flickers before it fires. Cross while it rests.');
  B.jet(48,2,3,3).coins(50,3,2).jet(53,2,3,3).jet(56,2,3,3,1.5);
  B.enemy('ember',63.5,2,{rise:4,gap:1.6}).arc(61,4,6);
  /* the practice ledge: it drops onto solid rock, with a shard underneath */
  B.stairs(70,3).ground(73,76,5).ground(82,86,5).fall(78,5,3).sign(74,'A cracked ledge drops a moment after you land. Keep moving!',5);
  B.shard(79,2).coins(78,6,3);
  B.row(91,5,'B?B?B').row(93,9,'I').enemy('boing',96).enemy('spikit',100);
  B.checkpoint(103);
  B.fall(106,2,3).coins(106,3,3);
  B.jet(113,2,3,2.6).jet(116,2,4,2.6,1.3).enemy('batty',119,6,{rx:2.5});
  B.enemy('ember',123,2,{rise:5,gap:1.5}).enemy('ember',129,2,{rise:5,gap:1.5,phase:0.8}).coins(125,3,3);
  B.row(133,5,'?M?');
  /* a chimney to kick up, over a flame jet, and a shard at the top */
  B.fill(138,4,138,12,HARD).fill(142,4,142,12,HARD).jet(140,2,4,3.2).shard(140,11).coinCol(140,6,3);
  B.enemy('spikit',147);
  B.fall(153,2,3).fall(158,2,3).coins(153,3,3).coins(158,3,3).enemy('ember',156.5,2,{rise:4,gap:2.2});
  /* the pipe goes down to a lava cellar; the next one is the way back */
  B.warp(166,2,'in').warp(172,3,'out',true);
  B.row(177,5,'?M?').enemy('rammy',183);
  B.stairs(188,6).fill(194,2,194,7,HARD).goal(200);
  B.fill(220,0,223,15,GROUND).fill(224,2,224,15,HARD).fill(251,2,251,15,HARD).ground(224,233).ground(237,251);
  B.warp(226,2,'in',true).coinBox(229,3,232,4).shard(235,5).arc(233,4,5).row(240,5,'?L?').coins(240,3,3).warp(247,2,'out');
  return B.L;
}
/* 7-2: the lava lake. Almost no ground: ledges that slide, rise and wheel, cracked ledges that drop, and rocks barely
   wide enough to stand on, with an Emberling leaping in each gap between, every one keeping its own steady time. */
function w7l2(){
  const B=LevelBuilder(262,'magma');
  B.room(0,229).room(234,261,0,15,true).set('cone',0.5);
  B.ground(0,19).sign(4,'The lake is wide and the rocks are few. A ledge with a calm face will carry you; a cracked one will not.').coins(6,3,3).row(10,5,'?M?');
  B.plat(21,2,3,'x',4,1.2).coins(23,4,3).ground(29,33).coins(30,3,3);
  B.plat(36,2,3,'y',3,1.2).coinCol(37,6,2).ground(42,46,5).coins(43,6,3);
  /* three cracked steps down, and a shard over the middle one */
  B.fall(49,5,3).fall(54,4,3).fall(59,3,3).shard(55,8).ground(64,68).row(66,5,'?');
  /* the Emberlings' wave: watch one, then go as it sinks */
  B.ground(72,74).ground(78,80).ground(84,85).ground(89,90).ground(94,103);
  [70,76,82,87,92].forEach((x,i)=>B.enemy('ember',x,2,{rise:4,gap:1.8,phase:i*0.45}));
  B.coins(73,3,1).coins(79,3,1).coins(84,3,2).coins(89,3,2);
  B.checkpoint(96).row(99,5,'?F?');
  /* two ledges that come together over an Emberling */
  B.plat(105,2,3,'x',2,1.1).plat(113,2,3,'x',2,1.1,Math.PI).enemy('ember',111,2,{rise:4,gap:1.8}).ground(119,123).enemy('batty',121,7,{rx:2,ry:0.8});
  /* a ledge that wheels, with a shard above the top of its turn */
  B.plat(126,5,3,'c',2.5,1.1).shard(127,11).fall(133,5,3).ground(138,145,4);
  B.row(139,7,'?M').warp(143,2,'in',false,4);
  B.fall(148,2,3).enemy('ember',152,2,{rise:4,gap:2}).ground(154,155).enemy('ember',157,2,{rise:4,gap:2,phase:1}).fall(159,2,3).ground(164,173);
  B.row(165,5,'?M?').warp(170,2,'out',true);
  /* two ledges that rise and sink by turns, and an Emberling after each */
  B.plat(176,2,3,'y',3,1).enemy('ember',179.5,2,{rise:5,gap:1.8}).plat(182,2,3,'y',3,1,Math.PI).enemy('ember',185.5,2,{rise:5,gap:1.8,phase:0.9}).ground(188,233);
  B.row(192,5,'B?B').enemy('rammy',197).stairs(200,6).fill(206,2,206,7,HARD).goal(212);
  /* a cellar under the lake */
  B.fill(230,0,233,15,GROUND).fill(234,2,234,15,HARD).fill(261,2,261,15,HARD).ground(234,242).ground(252,261);
  B.warp(236,2,'in',true).row(239,5,'?L?').plat(244,2,3,'x',4,1.1).shard(247,6).coins(244,4,7).coins(253,3,3).warp(257,2,'out');
  return B.L;
}
/* 7-3: inside the mountain. A tunnel under Clonks and through ember chains, then the great shaft: ledges, a spring and a
   chimney to kick up while flame jets fire from the ledges, and at the top a pod that shoots Blorp out of the vent. */
function w7l3(){
  const SY=32, B=LevelBuilder(112,'magma',44); /* SY: how high the mountainside lies, where the shaft comes out */
  B.room(0,111,0,SY-4).room(0,111,SY-2,43).set('roof',SY).set('falls',[78]).set('cone',0.25);
  B.fill(0,0,111,SY-1,GROUND).clear(1,2,71,7).clear(72,2,83,SY-1);
  /* the tunnel */
  B.sign(6,'A Clonk waits in the roof and drops when you walk beneath. Tempt it down, then pass while it climbs.');
  B.row(10,5,'?M?').enemy('clonk',17.5,6).coins(20,3,3);
  B.clear(24,0,26,1).enemy('ember',25,2,{rise:3,gap:1.7}).arc(23,4,5);
  /* an ember chain; its block is the step up into a chimney, and the shard is at the top of that */
  B.firebar(33,4,5,1.7).clear(32,8,34,12).shard(33,11).coinCol(33,8,2);
  B.enemy('spikit',38).enemy('clonk',42.5,6);
  B.row(48,5,'B?B').clear(49,8,51,9).shard(50,9);
  B.firebar(56,4,5,-1.9).clear(61,0,63,1).enemy('ember',62,2,{rise:3,gap:1.7}).enemy('clonk',67,6);
  B.checkpoint(69);
  /* the shaft: ledges and a jet to time */
  B.row(75,5,'M').row(80,4,'===').row(76,6,'==').fill(72,7,74,7,GROUND).jet(74,8,4,3).row(76,9,'==').row(79,10,'HHH').spring(81,11);
  B.coins(80,6,2).coins(76,8,2).enemy('batty',77,13.5,{rx:2.5,ry:0.8});
  /* a floor to rest on, then a chimney with a jet at its foot */
  B.fill(72,16,79,17,GROUND).coinCol(81,14,4).fill(75,20,78,24,HARD).jet(73,18,5,3.4).coinCol(73,21,3);
  /* the top: the pod on the right fires out of the vent; the plank on the left has a secret over it */
  B.row(79,27,'====').pod(82,30,10,20).row(72,27,'==').row(73,30,'i').coins(72,29,2);
  B.shard(64,33).coins(66,33,3);
  B.arc(84,34,6).goal(93,SY);
  return B.L;
}
/* 7-4: the eruption. A level to run through: long bridges that crumble underfoot, Bonks charging on rocks with no room
   to dodge, belts of cooling rock that carry Blorp on or drag him back, and pods that fire him across the lava falls. */
function w7l4(){
  const B=LevelBuilder(290,'magma');
  B.room(0,257).room(262,289,0,15,true).set('cone',0.45).set('falls',[116.5,204.5]);
  B.ground(0,17).ground(18,21,3).ground(34,39,3).ground(40,52).ground(56,63).ground(67,73).ground(104,112).ground(121,150).ground(151,154,3).ground(173,176,3).ground(177,188).ground(192,196).ground(213,261);
  B.sign(4,'The mountain is waking! Crumbling rock will not wait for you: run.').coins(6,3,3).row(9,5,'?M?');
  /* the first bridge, with a shard over the middle of it */
  B.row(22,2,'KKKKKKKKKKKK').coins(23,4,4).coins(30,4,3).shard(28,7);
  /* Bonks on narrow ground; the pipe between the first two goes down to a cellar */
  B.warp(42,2,'in').enemy('rammy',47).warp(50,2,'out',true).enemy('ember',54,2,{rise:4,gap:1.6});
  B.enemy('rammy',61).enemy('ember',65,2,{rise:4,gap:1.8,phase:0.5}).enemy('rammy',71).enemy('ember',75.5,2,{rise:4,gap:1.6}).arc(73,4,6);
  /* belts of cooling rock: the first carries Blorp on, the second drags him back from two flame jets */
  B.conveyor(78,87,1,1).coins(80,3,6).conveyor(91,100,1,-1).jet(94,2,3,2.6,1.3).jet(97,2,3,2.6).coins(99,3,2);
  B.sign(105,'A launch pod! Hop in, and it does the rest.').pod(110,3,35,22).arc(113,8,8);
  B.checkpoint(133).row(136,5,'?M?');
  /* steps that crumble one after another, up to a shard */
  B.row(140,4,'KK').row(143,6,'KK').row(146,8,'KK').shard(149,11);
  /* the long bridge: a gap with an Emberling in it, and a Batty over the far half */
  B.row(155,2,'KKKKKKK').enemy('ember',163,2,{rise:4,gap:1.8}).row(165,2,'KKKKKKKK').coins(156,4,5).coins(166,4,6).enemy('batty',169,7,{rx:2.5,ry:0.7});
  B.enemy('fizzle',180).enemy('rammy',185);
  /* one pod fires Blorp into the next */
  B.pod(194,3,45,20).pod(203.9,4.5,45,20).coins(199,6,3).arc(207,7,7);
  B.row(222,5,'?B?').stairs(228,6).fill(234,2,234,7,HARD).goal(240);
  /* a cellar with one cracked ledge over the lava */
  B.fill(258,0,261,15,GROUND).fill(262,2,262,15,HARD).fill(289,2,289,15,HARD).ground(262,272).ground(279,289);
  B.warp(264,2,'in',true).row(267,5,'?L?').fall(274,2,3).shard(275,6).coins(273,4,5).coinBox(280,3,283,4).warp(285,2,'out');
  return B.L;
}
/* 7-5: the crater rim, by night. Everything the mountain has, in tighter turns: Emberlings between cracked ledges, a
   ride under two ember chains, a crumbling bridge with flame jets in it, and a wheel over the worst of the lava. Past
   the checkpoint: a Bonk's rock, the switch, a wall to kick over, and one last crossing. */
function w7l5(){
  const B=LevelBuilder(280,'magma');
  B.room(0,247).room(252,279,0,15,true).set('cone',0.55).set('falls',[93.5,191]);
  B.ground(0,16).ground(25,26).ground(36,44).ground(60,63).ground(64,66,3).ground(81,84,3).ground(105,118,4).ground(122,128).ground(132,137).ground(141,160).ground(168,180).ground(202,251);
  B.sign(4,'The crater rim. Every rock is a rest: stop on each, watch what comes next, then go.').coins(6,3,3).row(9,5,'?M?');
  /* cracked ledges with an Emberling in every gap, and one rock in the middle to stand on */
  B.fall(19,2,3).enemy('ember',23,2,{rise:4,gap:2}).enemy('ember',28,2,{rise:4,gap:2,phase:0.6}).fall(30,2,3).enemy('ember',34,2,{rise:4,gap:2.4,phase:1.2});
  B.row(40,5,'?').row(40,9,'I').coins(38,3,2);
  /* a ride under two ember chains: both stand straight up as the middle of the ledge passes beneath */
  B.plat(46,2,3,'x',10,0.7).firebar(52,4,5,1.4,4.712).firebar(56,4,5,1.4,2.857);
  /* a crumbling bridge with two flame jets in it */
  B.row(67,2,'KKKKHKKKKHKKKK').jet(71,3,3,2.4).jet(76,3,3,2.4).coins(68,4,3).coins(73,4,3).coins(78,4,3);
  /* the worst of it: a cracked ledge, a wheel, and two Emberlings before the next rock */
  B.fall(86,3,3).plat(92,5,3,'c',2.5,1.2).enemy('ember',98,2,{rise:6,gap:2}).fall(100,5,2).enemy('ember',103,2,{rise:6,gap:2,phase:0.7});
  B.checkpoint(108,4).row(111,7,'?M?').warp(115,2,'in',false,4);
  /* a Bonk's rock, then a rock with two flame jets taking turns */
  B.enemy('rammy',126).enemy('ember',130,2,{rise:4,gap:1.8}).jet(134,2,3,2.8).jet(136,2,3,2.8,1.4);
  /* the switch opens the red gate and lays the blue bridge; the shard on the red steps has to be fetched first */
  B.warp(142,2,'out',true).row(147,4,'RR').row(150,6,'RR').shard(153,9).row(156,5,'X').fill(159,2,159,9,RED);
  B.row(161,2,'UUUUUUU').row(164,5,'U').shard(164,9);
  /* a wall to kick over, with a jet at the foot of the chimney */
  B.fill(171,5,171,10,HARD).fill(175,2,176,10,HARD).jet(173,2,4,3.2).coinCol(173,7,3);
  /* the last crossing */
  B.plat(182,2,3,'x',4,1.2).enemy('ember',190,2,{rise:4,gap:2}).fall(192,3,3).enemy('ember',196,2,{rise:4,gap:2,phase:0.8}).fall(198,2,3);
  B.row(206,5,'?M?').enemy('spikit',211).stairs(216,6).fill(222,2,222,7,HARD).goal(228);
  /* a quiet cellar */
  B.fill(248,0,251,15,GROUND).fill(252,2,252,15,HARD).fill(279,2,279,15,HARD).ground(252,279);
  B.warp(254,2,'in',true).coinBox(258,3,261,4).row(263,5,'===').row(266,8,'===').shard(267,10).coins(263,6,3).row(270,5,'?L?').warp(275,2,'out');
  return B.L;
}

defWorld({name:'Magma Mountain',theme:'magma',levels:[w7l1,w7l2,w7l3,w7l4,w7l5]});
