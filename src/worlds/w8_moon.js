/* ================= World 8: Lunar Palace ================= */
/* What is left of the moon, in space. Queen Grizzle smashed it and built her palace on the biggest piece. Gravity is
   weak here (0.7), so Blorp jumps higher and floats further, and the pits open onto nothing at all. Five looks: the
   bright moonscape under the light of Blorp's home planet, the crystal caves, the outer wall under the aurora, the
   palace halls and the throne room. */
const W8_CR=['#5ff0ff','#ff7ad9','#ffd24d'];

/* ---------- props (1/8 tile) ---------- */
function w8Spire(c,h){ const d=shade(c,0.6), m=shade(c,0.82); return [[-1.2,0,-1.2,2.4,h,2.4,m],[1.1,0,-0.5,1.6,h*0.55,1.6,d],[-2.6,0,0.1,1.5,h*0.38,1.5,d],[-1.7,0,-1.7,3.4,0.6,3.4,'#8a83a8']]; }
function w8SpireGlow(c,h){ const l=mixc(c,WHITE,0.45); return [[-0.8,h,-0.8,1.6,h*0.22,1.6,c],[-0.35,h*1.22,-0.35,0.7,h*0.12,0.7,l],[-0.5,h*0.12,1.2,1,h*0.76,0.12,l],[1.4,h*0.55,-0.2,1,h*0.13,1,c],[-2.3,h*0.38,0.4,0.9,h*0.1,0.9,c]]; }
function w8Gem(c,h){ const l=mixc(c,WHITE,0.5), d=shade(c,0.55), m=shade(c,0.8); return [[-1.2,0,-1.2,2.4,h*0.5,2.4,d],[-1.2,h*0.5,-1.2,2.4,h*0.5,2.4,m],[-0.7,h,-0.7,1.4,h*0.25,1.4,c],[-0.3,h*1.25,-0.3,0.6,h*0.1,0.6,l],[1,0,-0.5,1.5,h*0.5,1.5,d],[1.3,h*0.5,-0.2,0.9,h*0.12,0.9,c],[-2.4,0,0.1,1.4,h*0.35,1.4,m]]; }
function w8Flag(c){ return [[-0.25,0,-0.25,0.5,8,0.5,'#f4f2ff'],[-0.7,0,-0.7,1.4,0.5,1.4,'#8a83a8'],[0.25,5.2,-0.1,3.6,2.6,0.2,c],[0.25,6.1,0,3.6,0.7,0.25,WHITE],[-0.4,8,-0.4,0.8,0.6,0.8,'#ffd24d']]; }
function w8Steps(){ const d='#a9a4c6'; return [[-3,0,-0.6,1,0.1,1.6,d],[-1.2,0,0.7,1,0.1,1.6,d],[0.8,0,-0.5,1,0.1,1.6,d],[2.6,0,0.8,1,0.1,1.6,d]]; }
function w8Crater(r){ return [[-r,0,-r,2*r,0.35,2*r,'#efedfb'],[-r+0.8,0.35,-r+0.8,2*r-1.6,0.05,2*r-1.6,'#9892b8'],[-r+1.5,0.4,-r+1.2,r*0.9,0.04,r*0.7,'#847da6']]; }
function w8Antenna(){ const m='#b9b4d2',d='#77719a'; return [[-0.4,0,-0.4,0.8,15,0.8,m],[-1.6,0,-1.6,3.2,0.8,3.2,d],[-2.6,10,-0.3,5.2,0.5,0.6,m],[-1.8,12.4,-0.3,3.6,0.5,0.6,m],[-2.6,10.5,-0.3,0.5,1.4,0.6,d],[2.1,10.5,-0.3,0.5,1.4,0.6,d]]; }
function w8Stem(){ const s='#6a8fd0'; return [[-0.3,0,-0.3,0.6,4,0.6,s],[0.3,1.4,-0.3,1.5,0.5,0.8,s],[-1.7,2.2,-0.3,1.4,0.5,0.8,s]]; }
function w8Bell(c){ return [[-1.3,4,-1.3,2.6,1.6,2.6,c],[-0.7,5.6,-0.7,1.4,0.9,1.4,mixc(c,WHITE,0.5)],[-1.7,4,-0.4,0.4,0.8,0.8,c],[1.3,4,-0.4,0.4,0.8,0.8,c]]; }
function w8Column(h,broken){ const a='#e6e2f5',b='#c9c3e2', q=[[-2.4,0,-2.4,4.8,1,4.8,b],[-2,1,-2,4,0.8,4,a]];
  for(let y=1.8,i=0;y<h;y+=3,i++) q.push([-1.5,y,-1.5,3,Math.min(3,h-y),3,i%2?a:b]);
  if(broken) q.push([-1.5,h,-1.5,1.6,1.2,2,a],[0.1,h,-0.3,1.4,0.5,1.4,b]); else q.push([-2,h,-2,4,0.8,4,a],[-2.6,h+0.8,-2.6,5.2,1,5.2,b]);
  return q; }
function w8Banner(c){ const g='#ffd24d'; return [[-0.3,0,-0.3,0.6,17,0.6,'#77719a'],[-1,0,-1,2,0.6,2,'#5a5378'],[-0.3,16.2,-0.3,5,0.5,0.6,g],[0.6,7,0,3.8,9.2,0.25,c],[0.6,6,0,1.2,1,0.25,c],[3.2,6,0,1.2,1,0.25,c],
  [1.3,11.4,0.25,2.4,0.9,0.12,g],[1.3,12.3,0.25,0.6,0.9,0.12,g],[2.2,12.3,0.25,0.6,1.3,0.12,g],[3.1,12.3,0.25,0.6,0.9,0.12,g]]; }
/* the Queen in marble, on a plinth: her brother's shape, her crown left gold */
function w8Statue(){ const a='#dcd8ee',b='#b9b3d6', q=[[-4,0,-3.5,8,2.4,7,b],[-3.4,2.4,-3,6.8,0.8,6,a]];
  for(const o of mBoss()) q.push([o[0]*0.9,o[1]*0.9+3.2,o[2]*0.75,o[3]*0.9,o[4]*0.9,o[5]*0.75,o[6]==='#ffc928'?'#ffd24d':(o[6]===WHITE||o[6]===INK)?'#8f88b0':o[6]==='#7d3fd1'?a:b]);
  return q; }
function w8Brazier(){ const m='#77719a',d='#4a4470'; return [[-0.5,0,-0.5,1,6,1,m],[-1.6,0,-1.6,3.2,0.8,3.2,d],[-2.4,6,-2.4,4.8,1.2,4.8,d],[-2.8,7.2,-2.8,5.6,0.6,5.6,'#ffd24d']]; }
function w8Flame(c){ const l=mixc(c,WHITE,0.55); return [[-1.8,7.8,-1.8,3.6,1.6,3.6,c],[-1.2,9.4,-1.2,2.4,1.6,2.4,c],[-0.6,11,-0.6,1.2,1.4,1.2,l],[-0.8,8.2,-0.8,1.6,1.6,1.9,l]]; }
function w8Stalag(h){ const a='#5a5380',b='#6f6898'; return [[-1.6,0,-1.6,3.2,h*0.4,3.2,a],[-1.1,h*0.4,-1.1,2.2,h*0.35,2.2,b],[-0.6,h*0.75,-0.6,1.2,h*0.25,1.2,a]]; }
function w8Urn(c){ const g='#ffd24d'; return [[-1.2,0,-1.2,2.4,0.6,2.4,g],[-1.8,0.6,-1.8,3.6,3.4,3.6,c],[-1.2,4,-1.2,2.4,1.2,2.4,c],[-1.6,5.2,-1.6,3.2,0.6,3.2,g]]; }
function w8Candles(){ const g='#ffd24d',w='#f4ead0'; return [[-0.4,0,-0.4,0.8,9,0.8,g],[-1.4,0,-1.4,2.8,0.7,2.8,'#c99a2e'],[-2.6,9,-0.4,5.2,0.6,0.8,g],[-2.6,9.6,-0.4,0.8,1.6,0.8,w],[1.8,9.6,-0.4,0.8,1.6,0.8,w],[-0.4,9.6,-0.4,0.8,2.2,0.8,w]]; }
function w8CandleGlow(){ const f='#ffd98a'; return [[-2.5,11.2,-0.3,0.6,0.9,0.6,f],[1.9,11.2,-0.3,0.6,0.9,0.6,f],[-0.3,11.8,-0.3,0.6,0.9,0.6,f]]; }

/* ---------- a monster of this world ---------- */
/* Moon Boing: a Boing with an aerial on its head. With so little to hold it down it leaps five tiles and takes its time
   about landing, so there is room to walk underneath. */
function mW8Boing(){ const swap={'#7bd85f':'#8fd0ff','#3f9a2e':'#3f7fd0','#e9ffc2':'#eaf6ff'}, b=mBoing().map(q=>{ const r=q.slice(); r[6]=swap[q[6]]||q[6]; return r; });
  b.push([-3.7,6.7,-0.4,7.4,0.5,2.9,'#d5dcea'],[-0.3,6.9,0.8,0.6,2.2,0.6,'#d5dcea'],[-0.7,9.1,0.4,1.4,1.4,1.4,'#ff7ad9']); return b; }
defEnemy('w8boing',{stomp:true,solo:true, init(e){ e.wait=1; }, mesh:()=>G1('w8boing',mW8Boing),
  tick(e,dt){ const p=player;
    if(e.onGround){ e.vx=0; e.wait-=dt; if(e.wait<=0){ e.vy=13.5; e.vx=(p.x<e.x?-1:1)*2.2; e.wait=1.1+Math.random()*0.6; e.onGround=false; } }
    e.vy-=19*dt; if(e.vy<-9) e.vy=-9;
    if(e.vx&&moveX(e,e.vx*dt)) e.vx=0;
    const r=moveY(e,e.vy*dt); if(r===1){ e.vy=0; e.onGround=true; } else { if(r===2) e.vy=0; e.onGround=false; } },
  anim(e,m){ const s=e.onGround?1-Math.max(0,0.45-e.wait)*0.6:1+clamp(e.vy,-6,8)*0.02, q=1/Math.sqrt(s); m.scale.set(q,s,q); m.rotation.y=(player.x>e.x?1:-1)*0.7; }});

/* ---------- the far view ---------- */
/* a shard of moon adrift: a dusty top, rock tapering away beneath, and now and then crystal growing out of it */
function w8Chunk(S,cx,cy,z,w,R,vein){
  const d=Math.max(2.4,w*0.42), t=0.4+w*0.025; let ww=w*(0.72+R()*0.2), y=cy, off=(R()-0.5)*w*0.1;
  S.far.push([cx-w/2,cy,z-d/2,w,t,d,'#d2cee8'],[cx-w*0.36,cy+t,z-d*0.3,w*0.3,0.1,d*0.4,'#b4aed2']);
  for(let k=0,n=3+((R()*3)|0);k<n;k++){ const hh=(0.5+R()*0.7)*(0.5+w*0.1); S.far.push([cx-ww/2+off,y-hh,z-d*0.44,ww,hh,d*0.88,k%2?'#8780aa':'#756e98']); y-=hh; off+=(R()-0.5)*ww*0.24; ww*=0.48+R()*0.3; }
  if(vein){ const c=pick(R,W8_CR), l=mixc(c,WHITE,0.4);
    for(let k=0,n=2+((R()*2)|0);k<n;k++){ const vx=cx-w*0.34+R()*w*0.6, h=(0.8+R()*1.4)*(0.5+w*0.07), s=0.25+w*0.02; S.glowFar.push([vx,cy+t,z-s/2,s,h,s,c],[vx+s*0.2,cy+t+h,z-s*0.3,s*0.6,h*0.3,s*0.6,l]); }
    S.glowFar.push([cx-w*0.22,cy-0.3,z+d*0.44+0.03,w*0.3,0.12,0.05,c],[cx-w*0.02,cy-0.42,z+d*0.44+0.03,0.12,0.24,0.05,c]); }
}
/* the palace: a curtain wall, a domed keep, six towers, and every window lit */
function w8Palace(S,cx,by,z,s){
  const m='#d2cbee',m2='#b0a8d6',rf='#7d3fd1',rf2='#a468f0',g='#ffd24d',win='#ffe09a',cy='#7df9ff';
  const b=(x,y,w,h,c,zo)=>S.far.push([cx+(x-w/2)*s,by+y*s,z+(zo||0)*s,w*s,h*s,3*s,c]);
  const gl=(x,y,w,h,c,zo)=>S.glowFar.push([cx+(x-w/2)*s,by+y*s,z+((zo||0)+3)*s+0.06,w*s,h*s,0.1,c]);
  b(0,0,36,5,m2,0); for(let i=-17;i<=17;i+=2) b(i,5,1,0.9,m,0);
  b(0,0,5,4.4,'#3a2a6a',0.2); gl(0,0,3.2,3.4,win,0.2);
  b(0,5,15,8,m,-0.6); b(0,13,11,4.5,m2,-0.6); b(0,17.5,10,1.3,rf,-0.6); b(0,18.8,8,1.3,rf2,-0.6); b(0,20.1,5.4,1.3,rf,-0.6); b(0,21.4,2.6,1.2,rf2,-0.6); b(0,22.6,0.7,3.6,g,-0.6);
  S.glowFar.push([cx-0.7*s,by+26.2*s,z+0.4*s,1.4*s,1.4*s,1.4*s,cy]);
  for(const q of [[-10,17,4],[10,17,4],[-16,11,3.4],[16,11,3.4],[-5.6,21,2.6],[5.6,21,2.6]]){ const x=q[0],h=q[1],w=q[2];
    b(x,0,w,h,m,0.5); b(x,h,w+1,0.8,m2,0.5); b(x,h+0.8,w+0.6,1.5,rf,0.5); b(x,h+2.3,w-0.8,1.5,rf2,0.5); b(x,h+3.8,Math.max(0.8,w-2.2),1.6,rf,0.5); b(x,h+5.4,0.4,1.6,g,0.5);
    S.glowFar.push([cx+(x-0.35)*s,by+(h+7)*s,z+1.6*s,0.7*s,0.7*s,0.7*s,cy]);
    for(let y=h-2.6;y>5.5;y-=4) gl(x,y,0.9,1.6,win,0.5); }
  for(const x of [-5,-2.5,0,2.5,5]) gl(x,8.4,1,2.2,win,-0.6);
  for(const x of [-3,0,3]) gl(x,14.4,0.9,1.6,cy,-0.6);
  b(-13,5.9,1.3,3.4,'#e0409a',0.1); b(13,5.9,1.3,3.4,'#e0409a',0.1);
}
function w8Shooter(R){
  const m=new T.Mesh(tmpGeo(voxGeo([[0,0,0,0.5,0.5,0.3,WHITE],[0.5,0.1,0,1.6,0.3,0.2,'#cfe9ff'],[2.1,0.17,0,2.4,0.16,0.1,'#8fb8ff']],1)),MAT.glow); m.rotation.z=0.45; m.visible=false; world.add(m);
  let t=1+R()*5, life=0; const z=-38-R()*22;
  critters.push({tick(dt){ if(life>0){ life-=dt; m.position.x-=26*dt; m.position.y-=12.5*dt; if(life<=0) m.visible=false; }
    else { t-=dt; if(t<=0){ t=2.5+Math.random()*5; life=1.2; m.visible=true; m.position.set(camX-12+Math.random()*52,camY+9+Math.random()*13,z); } } }});
}
function w8Tumbler(R,W,H){
  const s=0.5+R()*0.9, bx=[[-1.4*s,-0.7*s,-1*s,2.8*s,1.4*s,2*s,'#9a94ba'],[-0.9*s,0.7*s,-0.7*s,1.6*s,0.6*s,1.4*s,'#d2cee8'],[-0.6*s,-1.3*s,-0.6*s,1.5*s,0.6*s,1.2*s,'#7d7699'],[1.4*s,-0.3*s,-0.5*s,0.6*s,0.8*s,1*s,'#857ea6']];
  const m=new T.Mesh(tmpGeo(voxGeo(bx,1)),MAT.vox), y0=3+R()*(H-6), z=-9-R()*16, v=(R()<0.5?-1:1)*(0.15+R()*0.3), w=(R()-0.5)*0.5, ph=R()*9; m.position.set(R()*W,y0,z); world.add(m);
  critters.push({tick(dt,time){ m.position.x+=v*dt; if(m.position.x>W+30) m.position.x=-30; else if(m.position.x<-30) m.position.x=W+30; m.position.y=y0+Math.sin(time*0.3+ph)*0.6; m.rotation.z+=w*dt; m.rotation.x+=w*0.6*dt; }});
}
function w8Outdoors(S,R){
  const W=S.W,H=S.H,LV=S.L,gf=S.glowFar,tall=H>26;
  /* Blorp's home, blue and green, with its air glowing round the rim */
  { const sc=2.3, y0=tall?12:11.5; skyDisc(TH.disc,null,y0,sc);
    const g='#46d08a',g2='#34b876',w='#eaf8ff', ex=[[-3.4,-4.4,-0.4,6.8,8.8,0.3,'#8fd8ff'],[-4.4,-3.4,-0.4,8.8,6.8,0.3,'#8fd8ff'],
      [-3,2,1,2.2,1.4,0.12,g],[-3.6,1,1,1,1.2,0.12,g2],[0.2,3,1,2,0.8,0.12,g],[2.7,-0.9,1,1.2,2.2,0.12,g],[2.2,0.6,1,0.6,1,0.12,g2],[-3.6,-2.8,1,1.6,1.2,0.12,g],[-0.8,-3.9,1,2.6,0.7,0.12,g2],
      [-1.4,2.5,1.1,2.4,0.3,0.1,w],[1.4,-2.6,1.1,1.8,0.3,0.1,w],[-3.2,-0.6,1.1,1.2,0.3,0.1,w]];
    const pm=new T.MeshBasicMaterial({vertexColors:true,fog:false,opacity:0.72}); pm.userData.tmp=true; sunMesh.add(new T.Mesh(tmpGeo(voxGeo(ex,sc)),pm));
    if(tall) critters.push({tick(){ if(sunMesh) sunMesh.position.y=y0+(camY-camBaseY)*0.9; }}); }
  /* shards of moon at three depths; in a tall level they go all the way up */
  for(let yb=0;yb<H;yb+=18){
    for(let x=-70;x<W+70;x+=20+R()*22) w8Chunk(S,x,yb-10+R()*24,-50-R()*28,12+R()*16,R,R()<0.4);
    for(let x=-40;x<W+40;x+=14+R()*14) w8Chunk(S,x,yb-4+R()*18,-22-R()*14,4+R()*6,R,R()<0.3);
    for(let x=-20;x<W+20;x+=10+R()*11) w8Chunk(S,x,yb-4+R()*(tall?18:6.5),-8.6-R()*5,1.8+R()*3,R,R()<0.25); }
  /* the palace on the biggest piece: far off at first, nearer level by level */
  { const P=LV.w8pal||[W*0.68,5,-78,1]; w8Chunk(S,P[0],P[1]-0.4-1.2*P[3],P[2]+1.5*P[3],46*P[3],R,true); w8Palace(S,P[0],P[1],P[2],P[3]); }
  /* ribbons of stardust */
  for(let k=0;k<2;k++){ const z=-42-k*16, y0=(k?3:10)+(tall?H*0.4:0), ph=R()*6;
    for(let x=-60;x<W+60;x+=0.9){ const y=y0+Math.sin(x*0.045+ph)*3.2+Math.sin(x*0.13+ph)*0.8; S.soft.push([x,y,z,0.8,0.14+R()*0.22,0.3,pick(R,['#7f98f0','#a47cf0','#5fd0e0'])]); if(R()<0.16) gf.push([x+R(),y-0.7+R()*1.6,z+0.2,0.22,0.22,0.1,WHITE]); } }
  for(let i=0;i<3;i++) w8Shooter(R);
  for(let i=0;i<Math.ceil(W*H/900)+2;i++) w8Tumbler(R,W,H);
  S.addMotes(0xcfe0ff,50,0.07,0,true);
}
/* the crystal caves: a wall of rock with gaps onto the stars, a roof with stalactites, and crystals the size of trees */
function w8Cave(S,R){
  const W=S.W,H=S.H,far=S.far,gf=S.glowFar,zw=-6.2, rock=['#3f3866','#463f70','#39325c','#4d457a'];
  for(let x=-16;x<W+16;){ const w=2.5+R()*4, zz=zw-2.6-R()*0.9;
    if(R()<0.1&&x>14&&x<W-30){ const y0=4.5+R()*2, y1=y0+3.5+R()*3; far.push([x,-8,zz,w,y0+8,2.6,pick(R,rock)],[x,y1,zz,w,H+10-y1,2.6,pick(R,rock)]); }
    else far.push([x,-8,zz,w,H+18,2.6,pick(R,rock)]);
    if(R()<0.5) far.push([x-0.3,3+R()*(H-4),zw-0.25,w*0.8,0.4+R()*0.4,0.5,'#5a5288']);
    if(R()<0.3){ const c=pick(R,W8_CR), y=3+R()*(H-6); gf.push([x,y,zw+0.03,w*0.7,0.1,0.05,c],[x+w*0.7,y-0.5,zw+0.03,0.1,0.6,0.05,c]); }
    x+=w; }
  far.push([-16,H-0.3,zw,W+32,5,8,'#2f2950']);
  for(let x=-10;x<W+10;x+=1.5+R()*3.5){ const l=1+R()*3, z=-1.8-R()*4.2, w=0.5+R()*0.6; far.push([x,H-0.3-l*0.6,z,w,l*0.6,w,'#463f70'],[x+w*0.25,H-0.3-l,z+w*0.25,w*0.5,l*0.4,w*0.5,'#5a5288']); }
  for(let x=5+R()*8;x<W;x+=11+R()*10){ const c=pick(R,W8_CR), l=mixc(c,WHITE,0.45), up=R()<0.72, n=3+((R()*3)|0);
    for(let k=0;k<n;k++){ const w=0.7+R()*1.1, h=up?3.5+R()*6.5:1.5+R()*3, px=x+(k-n/2)*1.15+R()*0.5, lean=(R()-0.5)*0.6, z=zw-0.7+R()*0.5, y=up?-1+R()*2.5:H-0.3-h;
      for(let j=0;j<3;j++){ const jj=up?j:2-j, ww=w*(1-jj*0.27); gf.push([px+lean*j-ww/2,y+h*j/3,z-ww/2,ww,h/3+0.02,ww,jj===2?c:jj===1?shade(c,0.7):shade(c,0.45)]); }
      if(up) gf.push([px+lean*2-w*0.12,y+h,z-w*0.12,w*0.24,h*0.08,w*0.24,l]); }
    lamps.push({x,y:up?5:H-4,z:-4,col:c,power:1.25,reach:12}); }
  S.addMotes(0x9ff0ff,60,0.07,0,true);
}
/* the palace indoors: a wall with pilasters, and between them by turns a window of coloured glass, a banner with the
   Queen's crown, and a lamp. The throne room is the same hall in crimson and gold, with the throne behind the arena. */
function w8Hall(S,R,throne){
  const W=S.W,H=S.H,far=S.far,gf=S.glowFar,zw=-6.2,g='#ffd24d';
  const wall=throne?'#6a1430':'#a79fc9', wall2=throne?'#551028':'#958dbb', trim=throne?g:'#e9e5f8', pil=throne?'#e0b23a':'#ddd8f0', pil2=throne?'#b98a22':'#c2bbdf', cloth=throne?'#c2183a':'#6a3fc0', beam=throne?'#551028':'#6a5f96';
  far.push([-16,-8,zw-2,W+32,H+18,2,wall],[-16,-8,zw,W+32,12.6,0.2,wall2],[-16,4.6,zw,W+32,0.35,0.3,trim],[-16,H-2.6,zw,W+32,0.5,0.4,trim],[-16,H-0.2,zw,W+32,4,8,throne?'#3a0a1c':'#4a416e']);
  for(let x=-12,i=0;x<W+12;x+=8,i++){
    far.push([x-0.7,-8,zw,1.4,H+8,0.8,pil],[x-1,4.6,zw,2,0.6,1,pil2],[x-1,H-3.4,zw,2,0.8,1,pil2],[x-0.6,H-1.2,zw,1.2,1,7.6,beam]);
    const cx=x+4, k=i%4;
    if(k===0||k===2){
      far.push([cx-1.5,5.6,zw,3,7.2,0.25,throne?'#3a0a1c':'#5a5088']);
      for(let j=0;j<3;j++) for(let q=0;q<2;q++) gf.push([cx-1.2+q*1.25,6+j*2,zw+0.26,1.1,1.8,0.06,pick(R,throne?['#ff5f7a','#ffb347','#ffd24d','#ff8fb0']:['#7df9ff','#b58cff','#5f8cff','#ff9be0'])]);
      gf.push([cx-0.8,12,zw+0.26,1.6,0.5,0.06,throne?'#ffd24d':'#b58cff']);
      lamps.push({x:cx,y:8,z:-4,col:throne?'#ff8f6a':'#9fb8ff',power:0.9,reach:10});
    } else if(k===1){
      far.push([cx-1.6,11.4,zw,3.2,0.3,0.5,trim],[cx-1.3,5.4,zw+0.1,2.6,6,0.2,cloth],[cx-1.3,4.6,zw+0.1,0.8,0.8,0.2,cloth],[cx+0.5,4.6,zw+0.1,0.8,0.8,0.2,cloth],
        [cx-0.8,8,zw+0.3,1.6,0.6,0.08,g],[cx-0.8,8.6,zw+0.3,0.4,0.6,0.08,g],[cx-0.2,8.6,zw+0.3,0.4,0.9,0.08,g],[cx+0.4,8.6,zw+0.3,0.4,0.6,0.08,g]);
    } else {
      far.push([cx-0.3,6.4,zw,0.6,0.3,0.9,g],[cx-0.5,6.7,zw+0.5,1,0.3,0.6,g]); gf.push([cx-0.3,7,zw+0.6,0.6,0.9,0.4,'#ffcf8a'],[cx-0.15,7.9,zw+0.7,0.3,0.4,0.2,'#fff3c9']);
      lamps.push({x:cx,y:7.4,z:-4.5,col:'#ffb86b',power:1.2,reach:11});
      /* and a lantern on a chain */
      far.push([cx-0.06,12.4,-3.4,0.12,H-12.4,0.12,g]); gf.push([cx-0.35,11.6,-3.75,0.7,0.8,0.7,'#ffcf8a']);
    }
  }
  if(throne&&S.L.boss){ const bx=(S.L.boss.x0+S.L.boss.x1)/2, cr='#c2183a', gd='#e0b23a', cy='#7df9ff';
    far.push([bx-5,2,-6,10,0.5,3.4,gd],[bx-4,2.5,-6,8,0.5,2.9,cr],[bx-3,3,-6,6,0.5,2.4,gd],[bx-1.6,3.5,-5.8,3.2,1.4,2,cr],[bx-1.9,3.5,-6,3.8,6.6,0.6,gd],[bx-1.4,4.9,-5.4,2.8,4.8,0.1,cr],
      [bx-2.2,3.5,-5.8,0.6,2.4,2,gd],[bx+1.6,3.5,-5.8,0.6,2.4,2,gd],[bx-1.9,10.1,-6,0.7,0.9,0.6,gd],[bx-0.35,10.1,-6,0.7,1.5,0.6,gd],[bx+1.2,10.1,-6,0.7,0.9,0.6,gd]);
    gf.push([bx-0.3,8.6,-5.28,0.6,0.6,0.1,cy],[bx-0.2,11.6,-5.9,0.4,0.4,0.4,cy]);
    for(const d of [-8.5,8.5]){ put(S.near,w8Statue(),(bx+d)*8,16,-38); put(S.near,w8Brazier(),(bx+d*0.5)*8,16,-36); put(S.glow,w8Flame('#5fb8ff'),(bx+d*0.5)*8,16,-36); lamps.push({x:bx+d*0.5,y:3.4,z:-4,col:'#5fb8ff',power:1.3,reach:10}); }
  }
  S.addMotes(throne?0xffd9a0:0xfff0d0,34,0.06,0,true);
}

THEMES.moon={ music:'moon', grav:0.7,
  sky:['#06041a','#17124a','#2b3d94'], skyMid:0.52, stars:1, band:'#1f8f7c', glowCol:0x4fb0ff, sunGlow:0.8,
  fog:0x1a1848, fogNear:24, fogFar:170,
  hemiSky:0xe6ecff, hemiGround:0x7a70a8, hemiI:0.6, sunI:0.72, sunCol:0xd6ecff, sunDir:[0.45,0.74,0.5],
  top:'#d9d6ee', topS:['#e9e7f7','#c9c5e2','#dedbf0','#bdb8da'], dirt:'#7d7699', dirtS:['#6e6789','#8c85a8','#615a7c'], cap:'#d9d6ee', capL:'#f4f2ff', capD:'#5a5378',
  brick:['#9a7fe6','#5a3fb0','#c9b8ff'], hard:['#b8b4d6','#e9e6f9','#77719a'], pipe:['#f2b632','#ffe9a0','#b9801a','#4a3008'],
  semi:'beam', plat:['#ff8fd6','#c0489a'], dust:'#e9e7f7', back:-6,
  liquid:{kind:'void',a:'#06041a',b:'#17124a',op:1},
  disc:['#2f86e0',null,'#1a56b0'], discX:0.72, bloom:0.9, hi:0.08, vig:0.5,
  looks:[null,
    /* the crystal caves */
    {kind:'cave',sky:['#04030f','#0e0b2c','#1c1a52'],band:0,stars:0.8,fog:0x0d0b26,fogNear:12,fogFar:80,hemiSky:0x9fb0ff,hemiGround:0x3a2f6a,hemiI:0.4,sunI:0.34,sunCol:0x9fd8ff,sunDir:[-0.2,0.5,0.84],bloom:0.95,hi:0.05,
      top:'#8f89b8',topS:['#9d97c4','#817baa','#a49ecb','#7770a0'],dirt:'#4d4577',dirtS:['#453d6c','#574f83','#3c3560'],cap:'#8f89b8',capL:'#b0aad6',capD:'#2f2950',
      brick:['#5fc8e0','#2a7a98','#aef0ff'],hard:['#6f6898','#9892c0','#463f70']},
    /* the outer wall, at night, under the aurora */
    {kind:'wall',sky:['#030210','#0b0f3e','#17307a'],skyMid:0.56,band:'#3fe0a8',fog:0x0f1440,fogNear:22,fogFar:150,hemiSky:0xbfd6ff,hemiGround:0x5a5a9a,hemiI:0.52,sunI:0.58,sunCol:0xb8f0e0,glowCol:0x3fd0c0,sunGlow:0.7,
      top:'#c2c6e6',dirt:'#666a96'},
    /* the palace halls */
    {kind:'hall',sky:['#0a0620','#1c1450','#34307a'],band:0,stars:0.9,fog:0x2a1f4a,fogNear:14,fogFar:90,hemiSky:0xffe9cf,hemiGround:0x6a5a8a,hemiI:0.56,sunI:0.5,sunCol:0xffdcb0,sunDir:[-0.25,0.6,0.76],bloom:0.9,hi:0.06,
      stone:true,top:'#e6e2f5',topS:['#f2effb','#d8d3ec','#ebe7f8','#cfc9e6'],dirt:'#b3acd2',dirtS:['#a59ec6','#c2bbdf','#9a92bd'],cap:'#e6e2f5',capL:'#ffffff',capD:'#8a82ad',
      brick:['#8a5fd6','#55309a','#b99cf0'],hard:['#d9d5ec','#f6f4ff','#9a92bd']},
    /* the throne room */
    {kind:'throne',sky:['#14040c','#3a0a1e','#6a1430'],band:0,stars:0.5,fog:0x2a0814,fogNear:14,fogFar:90,hemiSky:0xffd9b8,hemiGround:0x7a3a4a,hemiI:0.54,sunI:0.52,sunCol:0xffd0a0,sunDir:[-0.25,0.6,0.76],bloom:0.95,hi:0.06,
      stone:true,top:'#5a2a4a',topS:['#663258','#4f2340','#6e3a60','#47203a'],dirt:'#3d1a30',dirtS:['#351528','#48203a','#2c1022'],cap:'#ffd24d',capL:'#fff0a8',capD:'#2a0a1c',
      brick:['#c2183a','#7a0c22','#f06080'],hard:['#e0b23a','#ffe9a0','#9a7418']}],
  scenery(S,R){ const k=TH.kind; if(k==='cave') w8Cave(S,R); else if(k==='hall'||k==='throne') w8Hall(S,R,k==='throne'); else w8Outdoors(S,R); },
  /* on the dust: crystal spires, rocks, flags, footprints, aerials and moon-flowers; in the caves crystals and
     stalagmites; in the palace a carpet down the middle, with urns, candles, braziers, banners and statues beside it */
  decor(S,D,R){
    const r=R(), y=D.ty*8, k=TH.kind||'out', tall=D.free(3)&&D.open, st=S.L.stage||0;
    if(k==='hall'||k==='throne'){ const th=k==='throne', g='#ffd24d';
      S.near.push([D.x*8,y,-5.5,8,0.14,11,th?(D.x&1?'#c2183a':'#ad1232'):(D.x&1?'#6a3fc0':'#5f36b0')],[D.x*8,y,-6.4,8,0.2,0.9,g],[D.x*8,y,5.5,8,0.2,0.9,g]);
      if(r<0.05&&tall){ const x=D.jx(), z=D.zb(2.2,5); put(S.near,w8Candles(),x,y,z); put(S.glow,w8CandleGlow(),x,y,z); lamps.push({x:x/8,y:D.ty+1.5,z:z/8+0.5,col:'#ffb86b',power:1.1,reach:9}); }
      else if(r<0.1) put(S.near,w8Urn(pick(R,th?['#c2183a','#7a0c22']:['#6a3fc0','#3f7fd0','#e0409a'])),D.jx(),y,D.zb(2,5.2));
      else if(r<0.13&&tall&&D.free(4)) put(S.near,w8Statue(),D.jx(),y,D.zb(3.2,5));
      else if(r<(th?0.2:0.165)&&tall){ const x=D.jx(), z=D.zb(2.2,5); put(S.near,w8Brazier(),x,y,z); put(S.glow,w8Flame('#5fb8ff'),x,y,z); lamps.push({x:x/8,y:D.ty+1.3,z:z/8+0.5,col:'#5fb8ff',power:1.2,reach:9}); }
      else if(r<(th?0.25:0.21)&&tall&&D.free(4)) put(S.flora,w8Banner(th?'#c2183a':'#6a3fc0'),D.jx(),y,D.zb(2.4,5),0.25);
      else if(r<0.25&&D.free(2)) put(S.near,w8Column(3+R()*5,true),D.jx(),y,D.zb(3,5.2));
      return; }
    if(k==='cave'){
      if(r<0.09&&tall){ const c=pick(R,W8_CR), h=5+R()*9, x=D.jx(), z=D.zb(1.7,5.2); put(S.glow,w8Gem(c,h),x,y,z); lamps.push({x:x/8,y:D.ty+h/10,z:z/8+0.6,col:c,power:1.15,reach:9}); }
      else if(r<0.2&&D.free(2)&&D.open) put(S.near,w8Stalag(4+R()*9),D.jx(),y,D.zb(1.5,5.4));
      else if(r<0.3) put(S.near,dRock(pick(R,['#5a5380','#6f6898','#4d457a'])),D.jx(),y,D.zb(1.2,5.4));
      else if(r<0.4){ const x=D.jx(), z=D.zb(1.2,5.2); put(S.flora,w8Stem(),x,y,z,0.5); put(S.glow,w8Bell(pick(R,W8_CR)),x,y,z); }
      const f=R(); if(f<0.14) put(S.glow,[[-0.6,0,-0.6,1.2,2+R()*2,1.2,pick(R,W8_CR)]],D.jx(),y,D.zf()); else if(f<0.24) put(S.near,dRock('#5a5380'),D.jx(),y,D.zf());
      return; }
    if(r<0.05&&tall){ const c=pick(R,W8_CR), h=6+R()*8, x=D.jx(), z=D.zb(1.7,5.2); put(S.near,w8Spire(c,h),x,y,z); put(S.glow,w8SpireGlow(c,h),x,y,z); if(R()<0.6) lamps.push({x:x/8,y:D.ty+h/11,z:z/8+0.7,col:c,power:1.1,reach:8}); }
    else if(r<0.11) put(S.near,dRock(pick(R,['#b9b4d2','#a49ec2','#cfcbe6'])),D.jx(),y,D.zb(1.2,5.4));
    else if(r<0.135&&tall) put(S.near,w8Flag(pick(R,['#2fd6c3','#ff7ad9','#ffd24d'])),D.jx(),y,D.zb(1.6,4.8));
    else if(r<0.155&&tall){ const x=D.jx(), z=D.zb(2.4,5.2); put(S.near,w8Antenna(),x,y,z); put(S.glow,[[-0.5,15,-0.5,1,1,1,'#ff4f7b']],x,y,z); }
    else if(r<0.17&&tall) put(S.near,dDish(),D.jx(),y,D.zb(2.2,5));
    else if(r<0.27){ const x=D.jx(), z=D.zb(1.2,5.2); put(S.flora,w8Stem(),x,y,z,0.5); put(S.glow,w8Bell(pick(R,['#5ff0ff','#ff7ad9'])),x,y,z); }
    else if(r<0.33) put(S.near,w8Crater(2.2+R()*2.6),D.jx(),y,D.zb(1.8,5));
    else if(r<0.33+st*0.012&&tall&&D.free(4)) put(S.near,w8Column(6+R()*10,R()<0.7),D.jx(),y,D.zb(2.6,5));
    else if(r<0.34+st*0.02&&tall&&D.free(4)){ if(R()<0.5) put(S.flora,w8Banner('#6a3fc0'),D.jx(),y,D.zb(2.4,5),0.25); else { const x=D.jx(), z=D.zb(2.2,5); put(S.near,w8Brazier(),x,y,z); put(S.glow,w8Flame('#5fb8ff'),x,y,z); lamps.push({x:x/8,y:D.ty+1.3,z:z/8+0.5,col:'#5fb8ff',power:1.2,reach:9}); } }
    else if(r<0.35+st*0.026&&tall&&D.free(4)) put(S.near,w8Statue(),D.jx(),y,D.zb(3.2,5));
    const f=R();
    if(f<0.1) put(S.near,dRock(pick(R,['#b9b4d2','#a49ec2'])),D.jx(),y,D.zf());
    else if(f<0.16) put(S.glow,[[-0.6,0,-0.6,1.2,1.6+R()*1.6,1.2,pick(R,W8_CR)]],D.jx(),y,D.zf());
    if(R()<0.12) put(S.near,w8Steps(),D.jx(),y,D.zb(-0.5,4.5));
    if(R()<0.1) put(S.near,w8Crater(1.2+R()*1.2),D.jx(),y,D.zb(-0.5,0.9));
  }
};

/* coins along the arc of a long, floaty jump: n of them from x, rising p tiles in the middle */
function w8Arc(B,x,y,n,p){ for(let i=0;i<n;i++){ const u=n>1?(i/(n-1))*2-1:0; B.coins(x+i,y+Math.round((1-u*u)*p),1); } return B; }

/* 8-1: moonwalk. An open stroll to get used to weak gravity: long floaty jumps over craters and chasms, blocks hung
   high, coins strung along big arcs, and a spring that throws Blorp clean off the top of the screen. */
function w8l1(){
  const B=LevelBuilder(226,'moon',24);
  B.ground(0,30).ground(36,54).ground(61,70).ground(79,112);
  B.sign(5,'Gravity is weak up here. Blorp jumps higher and floats further: hold {jump} and enjoy the view.');
  B.coins(9,3,3).row(14,6,'?M?').enemy('blob',21);
  B.clear(24,1,28,1).coins(25,2,3);
  w8Arc(B,30,4,7,3);
  B.row(40,6,'B?B').row(41,10,'?').enemy('w8boing',48);
  w8Arc(B,54,4,8,4);
  B.clear(64,1,67,1).coins(64,2,4).row(65,6,'I').enemy('spikit',69);
  /* a wide chasm with a stepping stone in the middle */
  B.fill(74,2,75,3,GROUND).coins(74,5,2);
  /* three shards of moon, each higher than the last, and the first moon shard on the top one */
  B.fill(83,3,87,4,GROUND).fill(91,6,95,7,GROUND).fill(99,9,102,10,GROUND).shard(100,12);
  B.coins(84,6,3).coins(92,9,3).coinCol(89,6,3).coinCol(97,9,3);
  B.enemy('shellby',90).enemy('spikit',97).row(104,6,'?F?');
  B.checkpoint(109);
  /* nothing underneath from here: chunk to chunk, and a ledge that slides */
  B.ground(117,121,3).fill(128,3,131,4,GROUND).plat(134,5,3,'x',7,1).ground(147,162);
  w8Arc(B,121,5,8,3); B.enemy('batty',125,8,{rx:2.5}).coins(129,6,2);
  /* two columns to kick up between, with the second shard at the top */
  B.fill(152,5,152,15,HARD).fill(156,5,156,15,HARD).coinCol(154,6,4).coinCol(154,11,3).shard(154,15);
  B.enemy('blob',149).enemy('w8boing',159);
  w8Arc(B,162,4,9,4);
  B.ground(170,225);
  /* a spring, enormous here, to two ledges above the top of the screen and the third shard */
  B.spring(174).coinCol(174,5,6).row(176,11,'====').coins(176,12,4).row(181,15,'===').shard(182,17);
  B.row(184,6,'B?B').enemy('blob',183).enemy('shellby',188).enemy('blob',192);
  B.stairs(196,4).fill(200,2,200,5,HARD);
  B.goal(207);
  return B.L;
}
/* 8-2: the crystal caves. Bridges of crystal that crumble over nothing at all, ghosts that follow across them, and a
   switch that opens a wall and builds a bridge to a shard. */
function w8l2(){
  const B=LevelBuilder(262,'moon',20);
  B.room(0,231).room(236,261,0,19,true);
  B.ground(0,40).ground(60,96).ground(112,150).ground(166,235).fill(0,15,235,19,GROUND);
  B.coins(6,3,3).row(10,6,'?M?').enemy('ghost',19,7).enemy('clonk',27,9).enemy('spikit',34);
  B.row(41,1,'KKKKKKKKKKKKKKKKKKK').coins(43,3,15).shard(50,7).enemy('ghost',47,9);
  B.row(64,6,'B?X').sign(62,'Hit the switch: the red wall opens.').enemy('w8boing',70);
  B.fill(76,2,77,14,RED).row(81,8,'UUU').shard(82,12).enemy('clonk',87,9).enemy('spikit',92);
  B.row(97,1,'KKKKK').row(105,1,'KKKKKKK').coins(98,3,3).coins(106,3,5).enemy('batty',103,7,{rx:3});
  B.checkpoint(116);
  B.row(120,6,'?F?').enemy('ghost',126,5).warp(131,2,'in').enemy('clonk',137,9).enemy('ghost',141,8).warp(145,3,'out',true);
  B.row(151,1,'KKKK').plat(156,2,3,'x',4,1.1).row(163,1,'KKK').coins(157,4,5);
  B.enemy('fizzle',172).row(176,6,'B?B').enemy('clonk',183,9).enemy('w8boing',190).enemy('spikit',196);
  B.stairs(204,6).fill(210,2,210,7,HARD).clear(200,15,231,19);
  B.goal(216);
  /* a crystal vault: one great spring, and a shard far above it */
  B.fill(232,2,235,14,GROUND).ground(236,261).fill(236,2,236,19,HARD).fill(261,2,261,19,HARD).fill(236,16,261,19,GROUND);
  B.warp(238,2,'in',true).warp(257,2,'out').spring(247).row(250,11,'===').shard(251,13).coinCol(247,5,7).coinBox(252,3,254,4);
  return B.L;
}

/* 8-3: the floating stair. Up to the palace gate, chunk by drifting chunk: a lift, a pod, a rising wind, ledges that
   fall, a cleft to kick up, and a wheel of stone to ride. */
function w8l3(){
  const B=LevelBuilder(84,'moon',60);
  B.look(2).ground(0,20).start(4);
  B.coins(7,3,3).row(10,6,'?M?').enemy('spikit',15).plat(21,2,3,'y',5,1).coinCol(22,4,4);
  /* first chunk, and a pod to the second */
  B.fill(26,6,40,7,GROUND).enemy('w8boing',32,8).shard(33,13).pod(42,9,18,19).sign(37,'Hop in the pod.',8);
  B.fill(46,13,60,14,GROUND).enemy('blob',50,15).row(51,19,'?F?').enemy('batty',54,18,{rx:3});
  /* a rising wind off the end of it */
  B.wind(57,15,60,25,0,95).coinCol(58,17,6);
  B.fill(62,21,76,22,GROUND).enemy('spikit',70,23).row(79,24,'H').shard(79,27).coins(66,24,4);
  /* ledges that fall */
  B.fall(57,25,3).fall(52,27,3).coins(58,27,1).coins(53,29,1);
  B.fill(34,29,48,30,GROUND).checkpoint(44,31).row(40,35,'?M?').enemy('zappy',41,38,{rx:5});
  /* the cleft: under the right wall, up between the two, and off over the left one */
  B.fill(37,33,37,45,HARD).fill(33,31,33,38,HARD).coinCol(35,32,7);
  B.fill(14,37,30,38,GROUND).enemy('w8boing',22,39).enemy('spikit',17,39).shard(16,44);
  /* the wheel, and the gate */
  B.plat(31,42,3,'c',3,1).fill(40,45,83,46,GROUND).enemy('batty',46,52,{rx:3});
  B.goal(52,47);
  return B.L;
}

/* 8-4: the palace halls. The longest road in the game: belts, cannons, Clonks, flame and ghosts, a hall at a time, with
   somewhere to catch a breath between them. */
function w8l4(){
  const B=LevelBuilder(318,'moon',20);
  B.room(0,287).room(292,317,0,19,true);
  B.ground(0,60).ground(68,120).ground(128,176).ground(184,291).fill(0,16,291,19,GROUND);
  B.coins(6,3,3).row(10,6,'?M?').enemy('spikit',16);
  /* the hall of belts */
  B.conveyor(20,30,1,1).enemy('clonk',25,9).conveyor(34,44,1,-1).enemy('clonk',39,9).coins(21,3,9).enemy('ghost',48,8).row(52,6,'B?B');
  B.plat(61,2,3,'x',3,1.2).coins(62,4,4);
  /* the hall of cannons */
  B.cannon(74,2,3).cannon(74,3,3,1.5).enemy('fizzle',80).cannon(88,2,2.8).fill(96,2,96,3,HARD).cannon(96,4,3).enemy('w8boing',102).row(106,6,'?F?').shard(107,11);
  B.cannon(114,2,3.2).fall(121,2,3).fall(125,2,2);
  B.checkpoint(132);
  /* the hall of flame */
  B.jet(138,2,4,2.6).jet(142,2,4,2.6,0.9).jet(146,2,4,2.6,1.8).firebar(154,7,6,1.5).enemy('spikit',160).firebar(166,7,6,-1.5).row(159,6,'?M?');
  B.fill(170,4,170,13,HARD).fill(174,4,174,13,HARD).coinCol(172,4,7).shard(172,13);
  B.plat(177,2,3,'x',3,1.1).coins(178,4,4);
  /* the long gallery: ghosts, a switch, and the Queen's guard */
  B.enemy('ghost',192,8).row(196,6,'X').fill(204,2,205,15,RED).enemy('clonk',212,9).enemy('ghost',218,5).warp(224,2,'in').enemy('rammy',232).enemy('clonk',240,9).warp(246,3,'out',true);
  B.conveyor(250,258,1,-1).jet(261,2,4,2.4).enemy('fizzle',264);
  B.stairs(266,6).fill(272,2,272,7,HARD).clear(262,16,287,19);
  B.goal(278);
  /* the treasury */
  B.fill(288,2,291,15,GROUND).ground(292,317).fill(292,2,292,19,HARD).fill(317,2,317,19,HARD).fill(292,16,317,19,GROUND);
  B.warp(294,2,'in',true).warp(313,2,'out').coinBox(299,3,310,5).row(302,9,'=====').shard(304,10).enemy('ghost',308,11).row(300,6,'?L?');
  return B.L;
}

/* 8-5: the throne. Up the red carpet past the last of the guard, and then Queen Grizzle: she walks, hops and lobs bombs;
   hurt, her landings send ripples along the floor; cornered, she charges too, and throws three bombs at a time. */
function w8l5(){
  const B=LevelBuilder(180,'moon',20);
  B.ground(0,179).fill(0,16,179,19,GROUND);
  B.coins(6,3,3).row(10,6,'?M?').enemy('spikit',17).enemy('clonk',24,9).cannon(32,2,3).cannon(32,3,3,1.5).enemy('ghost',40,8);
  B.row(46,6,'===').row(50,9,'===').shard(51,13).coins(46,7,3);
  B.jet(58,2,4,2.6).jet(62,2,4,2.6,1.3).enemy('fizzle',68).fill(74,4,74,13,HARD).fill(78,4,78,13,HARD).coinCol(76,4,7).shard(76,13);
  B.enemy('clonk',86,9).enemy('rammy',92).row(96,2,'X').row(99,6,'U').row(102,9,'UU').shard(103,12);
  B.checkpoint(108);
  B.row(112,6,'?M?').row(116,6,'F').sign(119,'Queen Grizzle. Five stomps. Jump the ripples, mind the bombs, and get out of the way when she charges.');
  B.row(128,6,'====').row(150,6,'====').fill(164,2,179,15,GROUND);
  B.boss(150,124,160,15,'queen');
  return B.L;
}

function w8stub(look){ return ()=>{ const B=LevelBuilder(120,'moon'); B.look(look); B.ground(0,119).shard(8,3).shard(10,3).shard(12,3).row(20,6,'?M?').spring(30).pod(40,3,0,24).fill(50,2,50,14,HARD).fill(54,2,54,14,HARD); if(look===4) B.fill(100,2,119,13,GROUND).boss(80,60,95,15,'queen'); else B.goal(100); return B.L; }; }
defWorld({name:'Lunar Palace',theme:'moon',levels:[w8l1,w8l2,w8l3,w8l4,w8l5]});
