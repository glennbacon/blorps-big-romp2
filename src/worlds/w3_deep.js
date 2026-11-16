/* ================= World 3: Fizzy Deep ================= */
/* Under the sea. Nearly all of every level is flooded, so Blorp swims: monsters cannot be stomped and must be swum
   around, currents push him about, and air is only found on a pier, a beach and in a few caves. The "sky" is the water
   itself, bright at the top and dark below, and the far view is the sea bed: reefs, kelp, wrecks and ruins in the haze. */
const W3_CORAL=['#ff7fb0','#ff9a4d','#a678ff','#b6f24a','#ff6b6b','#ffd166'];
const W3_ROCK=['#566b90','#637aa2','#4a5e82'];
const W3_KELP=['#3fae5a','#2f9c78','#5fbf4a'];

/* ---------- props on the sea bed (units: 1/8 tile) ---------- */
function dDeepBranch(c,R){ const l=shade(c,1.25), h=5+R()*5, b=[[-0.8,0,-0.8,1.6,h,1.6,c],[-0.6,h,-0.6,1.2,1.2,1.2,l]], n=2+((R()*3)|0);
  for(let i=0;i<n;i++){ const s=i%2?1:-1, y=1.5+R()*(h-3.5), r=1.5+R()*2.2, ah=2+R()*3.5, z=(R()-0.5)*1.6, ux=s>0?r-0.2:-r-0.8;
    b.push([s>0?0.8:-0.8-r,y,z-0.5,r,1,1,c],[ux,y,z-0.5,1,ah,1,c],[ux,y+ah,z-0.5,1,0.9,1,l]); }
  return b; }
function dDeepBrain(c){ const d=shade(c,0.8), l=shade(c,1.15); return [[-3,0,-2.5,6,2.4,5,c],[-2.2,2.4,-1.8,4.4,1.2,3.6,c],[-1.2,3.6,-1,2.4,0.6,2,l],[-3,0.8,2.5,6,0.4,0.12,d],[-2.2,2.8,1.8,4.4,0.3,0.12,d],[-1.5,1.6,2.5,0.4,0.8,0.12,d],[1,0,2.5,0.4,0.8,0.12,d]]; }
function dDeepTubes(c,R){ const b=[], d=shade(c,0.5), l=shade(c,1.2);
  for(const q of [[-2.2,0],[0,-0.6],[1.9,0.4],[-0.6,1.4]]){ const h=3+R()*5; b.push([q[0]-0.9,0,q[1]-0.9,1.8,h,1.8,c],[q[0]-1.1,h,q[1]-1.1,2.2,0.7,2.2,l],[q[0]-0.6,h+0.7,q[1]-0.6,1.2,0.05,1.2,d]); }
  return b; }
function dDeepAnemone(c){ const l=shade(c,1.3), b=[[-1.6,0,-1.6,3.2,1.6,3.2,shade(c,0.75)]];
  for(const q of [[-1.5,-1],[0,-1.4],[1.4,-0.8],[-1.2,0.9],[0.3,1.2],[1.5,0.6],[0,0]]) b.push([q[0]-0.35,1.6,q[1]-0.35,0.7,2.6,0.7,c],[q[0]-0.45,4.2,q[1]-0.45,0.9,0.9,0.9,l]);
  return b; }
/* kelp: n joints, each with a leaf, k times life size for the far view */
function dDeepKelp(R,n,c,k){ k=k||1; const g=c||'#3fae5a', l=shade(g,1.25), d=shade(g,0.8), b=[]; let x=0;
  for(let i=0;i<n;i++){ const s=i%2?1:-1, y=i*4*k; b.push([x-0.5*k,y,-0.5*k,k,4*k,k,i%2?g:d],[s>0?x+0.5*k:x-3.3*k,y+1.2*k,-0.3*k,2.8*k,1.4*k,0.6*k,l],[s>0?x+2.6*k:x-4.4*k,y+2*k,-0.3*k,1.8*k,k,0.6*k,g]); x+=(R()-0.5)*0.8*k; }
  b.push([x-0.9*k,n*4*k,-0.5*k,1.8*k,1.6*k,k,l]); return b; }
function dDeepGrass(c){ const d=shade(c,0.8); return [[-1.8,0,0,0.7,3.2,0.7,d],[-0.6,0,0.3,0.7,5,0.7,c],[0.6,0,-0.2,0.7,3.8,0.7,d],[1.7,0,0.2,0.7,2.4,0.7,c]]; }
function dDeepClam(c){ const l=shade(c,1.2), d=shade(c,0.75); return [[-3,0,-2,6,1.4,4,c],[-2.4,1.4,-1.6,4.8,0.5,3.4,'#ffe9f2'],[-3,1.6,-2.4,6,3.2,1,c],[-2.4,4.8,-2.4,4.8,0.8,1,l],[-2.6,1.8,-1.4,0.5,2.6,0.12,d],[-0.9,1.8,-1.4,0.5,3,0.12,d],[0.8,1.8,-1.4,0.5,3,0.12,d],[2.2,1.8,-1.4,0.5,2.6,0.12,d]]; }
function dDeepStar(c){ return [[-2.2,0,-0.6,4.4,0.6,1.2,c],[-0.6,0,-2.2,1.2,0.6,4.4,c],[-0.9,0.3,-0.9,1.8,0.6,1.8,shade(c,1.15)]]; }
function dDeepShell(c){ return [[-1.2,0,-1,2.4,1.2,2,c],[-0.8,1.2,-0.7,1.6,0.6,1.4,shade(c,1.12)],[-0.3,1.8,-0.3,0.6,0.4,0.6,WHITE]]; }
function dDeepUrchin(){ const c='#3a2a6b',s='#8f7ad9'; return [[-1.4,0.4,-1.4,2.8,2.2,2.8,c],[-2.6,1.2,-0.25,1.2,0.5,0.5,s],[1.4,1.2,-0.25,1.2,0.5,0.5,s],[-0.25,1.2,-2.6,0.5,0.5,1.2,s],[-0.25,1.2,1.4,0.5,0.5,1.2,s],[-0.25,2.6,-0.25,0.5,1.3,0.5,s],[-1.5,2.4,-1.5,0.5,0.9,0.5,s],[1,2.4,1,0.5,0.9,0.5,s]]; }
function dDeepAmphora(){ const c='#c9824f',l='#e0a070',d='#9a5f38'; return [[-1.2,0,-1.2,2.4,1,2.4,c],[-1.8,1,-1.8,3.6,3,3.6,c],[-1.2,4,-1.2,2.4,1,2.4,c],[-0.7,5,-0.7,1.4,1.4,1.4,c],[-1.1,6.4,-1.1,2.2,0.5,2.2,l],[-2.4,3.6,-0.3,0.6,2.4,0.6,d],[1.8,3.6,-0.3,0.6,2.4,0.6,d],[-1.8,2.2,1.8,3.6,0.4,0.1,d]]; }
function dDeepAnchor(){ const c='#55637f',l='#7486a6'; return [[-0.5,0.6,-0.5,1,8,1,c],[-2.2,7,-0.5,4.4,1,1,l],[-1,8.6,-0.5,2,0.6,1,c],[-1,10,-0.5,2,0.6,1,c],[-1,9.2,-0.5,0.6,0.8,1,c],[0.4,9.2,-0.5,0.6,0.8,1,c],[-3.6,0,-0.5,7.2,1,1,c],[-3.6,1,-0.5,1,1.8,1,l],[2.6,1,-0.5,1,1.8,1,l]]; }
function dDeepBarrel(){ return [[-2,0,-2,4,5,4,'#8a5a3c'],[-2.15,1,-2.15,4.3,0.6,4.3,'#5a6a80'],[-2.15,3.4,-2.15,4.3,0.6,4.3,'#5a6a80'],[-1.4,5,-1.4,2.8,0.2,2.8,'#6e4526']]; }
function dDeepChimney(){ const a='#3a2f45',b='#4a3d58'; return [[-3,0,-3,6,3,6,a],[-2.2,3,-2.2,4.4,3.5,4.4,b],[-1.5,6.5,-1.5,3,3,3,a],[-3.4,0,-1,1.2,1.4,2,b],[2.4,0,0,1.4,1.8,2,b]]; }
function dDeepSpire(c){ return [[-1.6,0,-1.6,3.2,3,3.2,c],[-1.1,3,-1.1,2.2,3,2.2,shade(c,1.1)],[-0.6,6,-0.6,1.2,2.4,1.2,c]]; }
function dDeepPalm(R){ const t='#c9975a',t2='#b07f48',g='#3fbf6a',g2='#62d98a',b=[]; let x=0; const n=5+((R()*3)|0), lean=(R()-0.5)*1.2;
  for(let i=0;i<n;i++){ b.push([x-1,i*3,-1,2,3,2,i%2?t:t2]); x+=lean*(i>1?0.6:0.2); }
  const top=n*3; for(const q of [[1,0],[-1,0],[0,1],[0,-1],[0.7,0.7],[-0.7,-0.7],[0.7,-0.7],[-0.7,0.7]]) for(let k=0;k<4;k++) b.push([x-1.2+q[0]*(1.5+k*2.5),top-0.4-k*k*0.5,-1.2+q[1]*(1.5+k*2.5),2.6,1,2.6,k%2?g:g2]);
  b.push([x-1.6,top,-1.6,3.2,1.4,3.2,g],[x-0.2,top-1.7,1,1.5,1.5,1.5,'#8a5a2b']); return b; }

/* ---------- the far view (units: tiles) ---------- */
/* a clump of reef: a rock with a handful of corals on it. In the dark looks the tips of the corals glow. */
function deepReef(S,cx,y,z,s,R,glowTips){ const far=S.far, tip=glowTips?S.glowFar:far, rk=pick(R,W3_ROCK);
  far.push([cx-s*1.6,y-0.5,z-s,s*3.2,0.5+s*0.45,s*2,rk],[cx-s*0.9,y,z-s*0.7,s*2,s*0.8,s*1.4,shade(rk,1.1)]);
  const n=3+((R()*4)|0);
  for(let i=0;i<n;i++){ const c=pick(R,W3_CORAL), l=shade(c,1.22), px=cx+(R()-0.5)*s*2.6, pz=z+(R()-0.5)*s*1.2, by=y+(Math.abs(px-cx)<s*0.9?s*0.8:s*0.45)-0.05, k=R(), t=0.22*s+0.1;
    if(k<0.4){ const h=s*(0.8+R()*1.4); far.push([px-t/2,by,pz-t/2,t,h,t,c]); tip.push([px-t/2,by+h,pz-t/2,t,t,t,l]);
      for(const d of [-1,1]){ const r=s*(0.3+R()*0.4), ay=by+h*(0.25+R()*0.4), ah=h*(0.4+R()*0.5), ux=d>0?px+r-t:px-r; far.push([d>0?px:px-r,ay,pz-t/2,r,t,t,c],[ux,ay,pz-t/2,t,ah,t,c]); tip.push([ux,ay+ah,pz-t/2,t,t,t,l]); } }
    else if(k<0.6){ const h=s*(0.5+R()*0.8), w=s*(0.9+R()*0.8); far.push([px-t/2,by,pz-t/2,t,h,t,shade(c,0.8)],[px-w/2,by+h,pz-w/2,w,t*0.8,w,c]); tip.push([px-w*0.3,by+h+t*0.8,pz-w*0.3,w*0.6,t*0.4,w*0.6,l]); }
    else if(k<0.8){ const r=s*(0.4+R()*0.4); far.push([px-r,by,pz-r,2*r,r*0.9,2*r,c],[px-r*0.7,by+r*0.9,pz-r*0.7,r*1.4,r*0.45,r*1.4,l]); }
    else { const w=s*(0.8+R()*0.7), h=s*(0.8+R()*0.9); far.push([px-t/3,by,pz-t/3,t*0.66,h*0.35,t*0.66,shade(c,0.7)],[px-w/2,by+h*0.35,pz-0.06,w,h*0.65,0.12,c]); tip.push([px-w*0.35,by+h,pz-0.06,w*0.7,h*0.14,0.12,l]); } } }
/* a row of old columns on a plinth, some of them broken */
function deepRuins(S,cx,y,z,R){ const c='#cfd8e6', d='#a9b6cc', far=S.far, hs=[6.5,6.5,3.2,6.5,1.6];
  far.push([cx-7,y-0.3,z-2,14,0.8,4,d],[cx-6.4,y+0.5,z-1.7,12.8,0.4,3.4,c]);
  for(let i=0;i<5;i++){ const x=cx-5.4+i*2.7, h=hs[i];
    far.push([x-0.55,y+0.9,z-0.55,1.1,h,1.1,c],[x-0.7,y+0.9,z-0.7,1.4,0.35,1.4,d],[x-0.56,y+1.3,z+0.56,0.14,h-0.5,0.03,d],[x+0.3,y+1.3,z+0.56,0.14,h-0.5,0.03,d]);
    if(h>6) far.push([x-0.75,y+0.9+h,z-0.75,1.5,0.4,1.5,d]); else far.push([x-0.4,y+0.9+h,z-0.4,0.7,0.3,0.8,d]); }
  far.push([cx-6.3,y+7.8,z-0.8,4.5,0.7,1.6,c],[cx+3.4,y+0.9,z+1.3,1.7,1,1,c],[cx-0.2,y+0.9,z+1.6,1,0.9,1.6,d],[cx-5,y+0.9,z+1.5,0.8,1.6,0.8,'#3fae5a'],[cx+1.6,y+4.1,z-0.3,0.5,0.7,0.5,'#ff7fb0']); }
function deepGiantShell(S,cx,y,z,s,R){ const c=pick(R,['#ffc9a8','#ffb3d0','#e8d9ff']), d=shade(c,0.8), l=shade(c,1.12);
  S.far.push([cx-2*s,y,z-1.2*s,4*s,2.6*s,2.4*s,c],[cx-1.4*s,y+2.6*s,z-s,2.8*s,s,2*s,l],[cx+1.6*s,y,z-0.9*s,1.6*s,1.5*s,1.8*s,c],[cx+2.8*s,y,z-0.6*s,s,0.8*s,1.2*s,l],[cx-0.6*s,y+3.6*s,z-0.6*s,1.2*s,0.6*s,1.2*s,c],
    [cx-2*s,y+0.8*s,z+1.2*s,4*s,0.2*s,0.05,d],[cx-2*s,y+1.7*s,z+1.2*s,4*s,0.2*s,0.05,d],[cx+2.2*s,y+0.15*s,z+0.9*s,0.9*s,0.7*s,0.05,'#5a2a4a']); }
/* a wreck lying at a tilt, with a broken mast and lit portholes */
function deepShip(x,y,z,s,tilt,R){ const w='#6e4a3a',w2='#8a6248',dk='#3a2630',b=[],g=[];
  b.push([-9,0,-2.4,18,3,4.8,w],[-7.5,-0.8,-1.6,15,0.8,3.2,dk],[8.5,0.6,-2,2.4,3.2,4,w],[10.6,2,-1.4,1.8,2.6,2.8,w2],[12,3.6,-0.4,2.4,0.5,0.8,w2],
    [-10.5,1.5,-2.4,5,4,4.8,w],[-10.8,5.5,-2.6,5.6,0.5,5.2,w2],[-5.5,3,-2.4,14,0.5,0.4,w2],[-5.5,3,2,14,0.5,0.4,w2],
    [2.6,0.3,2.4,2.4,1.5,0.08,dk],[3.6,1.8,2.4,1,0.5,0.08,dk],
    [-1,3,-0.3,0.7,6,0.7,w2],[-0.8,8.6,-0.3,3.6,0.6,0.6,w2],[-1.6,6.6,-0.4,2.2,0.35,0.5,w2],
    [5,3,-0.3,0.6,9.5,0.6,w2],[2.6,9,-0.25,5.4,0.4,0.4,w2],[4.3,11,-0.9,2,0.5,1.8,w],[2.9,6.2,-0.15,2,2.8,0.12,'#d9cdb8'],[5.9,7.2,-0.15,1.6,1.8,0.12,'#c9bda8'],
    [-8,5.5,-0.3,0.5,5,0.5,w2],[-9.4,9.4,-0.25,3.2,0.35,0.35,w2]);
  for(const yy of [0.7,1.5,2.3]) b.push([-9,yy,2.4,18,0.14,0.06,w2]);
  for(const yy of [2.6,3.6,4.6]) b.push([-10.5,yy,2.4,5,0.14,0.06,w2]);
  for(let i=0;i<9;i++) b.push([-9+R()*18,3,-2.2+R()*4,0.5+R(),0.3+R()*0.9,0.5,pick(R,['#3fae5a','#ff7fb0','#b6f24a','#a678ff'])]);
  for(const px of [-9.6,-7.6,-4.5,-2,0.5,6.2]){ const py=px<-6?3.3:1.3; b.push([px-0.15,py-0.15,2.4,1.1,1.1,0.06,'#c9a04a']); g.push([px,py,2.42,0.8,0.8,0.1,'#ffd98a']); }
  const grp=new T.Group(); grp.add(new T.Mesh(tmpGeo(voxGeo(b,1)),MAT.vox),new T.Mesh(tmpGeo(voxGeo(g,1)),MAT.glow));
  grp.position.set(x,y,z); grp.scale.setScalar(s); grp.rotation.z=tilt; grp.rotation.y=(R()-0.5)*0.5; world.add(grp); }
/* shafts of light slanting down from the surface: one see-through mesh, turned to lean the way the sun shines */
function deepShafts(W,H,R,col,n,op){ const b=[], th=0.38, c=Math.cos(th), s=Math.sin(th);
  for(let i=0;i<n;i++){ const xt=-50+R()*(W+70), yt=H+12, z=-9-R()*62, w=1+R()*2.6, len=H+30+R()*12, lx=xt*c+yt*s, ly=-xt*s+yt*c;
    for(let k=0;k<3;k++) b.push([lx-w/2,ly-len*(k+1)/3,z,w,len/3,0.2,k===0?'#ffffff':k===1?'#b4b4b4':'#6a6a6a']); }
  const mat=new T.MeshBasicMaterial({vertexColors:true,color:col,transparent:true,opacity:op,blending:T.AdditiveBlending,depthWrite:false,fog:false}); mat.userData.tmp=true;
  const m=new T.Mesh(tmpGeo(voxGeo(b,1)),mat); m.rotation.z=th; m.renderOrder=1; m.frustumCulled=false; world.add(m);
  critters.push({tick(dt,time){ mat.opacity=op*(0.82+0.18*Math.sin(time*0.7)); }}); }
/* little fish that cross in a school */
function deepSchool(W,x,y,z,n,col,v,R,glow){ const g=new T.Group(), fs=[];
  for(let i=0;i<n;i++){ const m=new T.Mesh(geo('w3fish'+col,()=>[[-0.3,-0.13,-0.07,0.52,0.26,0.14,col],[-0.52,-0.2,-0.04,0.24,0.4,0.08,shade(col,0.8)],[-0.05,0.13,-0.03,0.2,0.1,0.06,shade(col,0.8)],[0.08,0,0.07,0.07,0.07,0.02,INK],[0.08,0,-0.09,0.07,0.07,0.02,INK]],1),glow?MAT.glow:MAT.vox);
    m.position.set((R()-0.5)*(1+n*0.45),(R()-0.5)*1.8,(R()-0.5)*1.6); g.add(m); fs.push(m); }
  g.position.set(x,y,z); if(v<0) g.rotation.y=Math.PI; world.add(g); const ph=R()*9;
  critters.push({tick(dt,time){ g.position.x+=v*dt; if(g.position.x>W+30) g.position.x=-30; else if(g.position.x<-30) g.position.x=W+30; g.position.y=y+Math.sin(time*0.6+ph)*0.6; for(let i=0;i<fs.length;i++) fs[i].rotation.y=Math.sin(time*9+i*1.3)*0.3; }}); }
function deepWhale(W,y,z,R){ const c='#2c4a86',l='#9fb6d9';
  const m=new T.Mesh(tmpGeo(voxGeo([[-7,-1.6,-1.6,11,3.4,3.2,c],[4,-1.2,-1.4,3.5,2.8,2.8,c],[7.5,-0.6,-1,2,1.8,2,c],[-7,-1.8,-1.4,9,0.5,2.8,l],[-9.5,-0.6,-1,2.6,1.6,2,c],[-11.5,0,-0.6,2.2,1,1.2,c],[-13.6,-0.2,-2.6,2.2,0.7,5.2,c],[0,-2.6,1.4,2.4,1,1.6,c],[0,-2.6,-3,2.4,1,1.6,c],[6.6,0.4,1.4,0.5,0.5,0.1,INK]],1)),MAT.vox);
  m.position.set(R()*W,y,z); world.add(m);
  critters.push({tick(dt,time){ m.position.x+=0.7*dt; if(m.position.x>W+60) m.position.x=-60; m.position.y=y+Math.sin(time*0.35)*1.2; m.rotation.z=Math.sin(time*0.35+1.2)*0.06; }}); }
/* a string of bubbles rising from a spot */
function deepBubbles(x,y0,z,top,R){ const ms=[], n=5, span=Math.max(2,top-y0), sp=1.5+R()*0.9, ph=R()*9;
  for(let k=0;k<n;k++){ const m=new T.Mesh(geo('w3bub',()=>[[-0.09,-0.09,-0.09,0.18,0.18,0.18,'#dffaff']],1),MAT.soft); world.add(m); ms.push(m); }
  critters.push({tick(dt,time){ for(let k=0;k<n;k++){ const u=(time*sp+ph+k*span/n)%span, m=ms[k]; m.position.set(x+Math.sin(time*2+k*1.7+ph)*0.22,y0+u,z); m.scale.setScalar(0.6+u/span*0.9); } }}); }
function deepGlowJelly(x,y,z,col,R){ const m=new T.Mesh(geo('w3gj'+col,()=>[[-0.5,0,-0.5,1,0.6,1,col],[-0.35,0.6,-0.35,0.7,0.3,0.7,col],[-0.4,-0.9,-0.1,0.12,0.9,0.12,col],[0,-1.2,0.1,0.12,1.2,0.12,col],[0.3,-0.8,-0.2,0.12,0.8,0.12,col]],1),MAT.glow);
  m.position.set(x,y,z); world.add(m); const ph=R()*9, sp=0.5+R()*0.5;
  critters.push({tick(dt,time){ m.position.y=y+Math.sin(time*sp+ph)*1.5; const k=1+Math.sin(time*sp*2+ph)*0.15; m.scale.set(1/k,k,1/k); }}); }
/* a wall right behind the walkway, for the places that are indoors: the planks of a hull, or the rock of a cave */
function deepWall(S,x0,x1,y0,y1,kind,R){ const z=(TH.back||-2.5)-0.04, far=S.far;
  if(kind==='hull'){ const w='#5e3f34', w2='#76523f';
    far.push([x0,y0,z-1,x1-x0,y1-y0,1,w]);
    for(let y=y0+0.9;y<y1;y+=1) far.push([x0,y,z,x1-x0,0.09,0.05,w2]);
    for(let x=x0+2;x<x1-3;x+=6+R()*3){ far.push([x,y0,z,0.5,y1-y0,0.3,w2]);
      for(let py=y0+3.2;py<y1-1.5;py+=5.5){ far.push([x+2.2,py-0.2,z,1.4,1.4,0.12,'#c9a04a']); S.glowFar.push([x+2.45,py+0.05,z+0.1,0.9,0.9,0.08,'#ffd98a']); lamps.push({x:x+2.9,y:py+0.5,z:z+1.6,col:0xffc070,power:1,reach:9}); } } }
  else { const r0=kind==='warm'?'#3d2c46':'#3a4a6e', r1=kind==='warm'?'#4d3a58':'#48598a', gl=kind==='warm'?['#ff8a2e','#ffc24a','#ff5f6d']:['#7df9ff','#b58cff','#7dffb0','#ff8fe0'];
    far.push([x0,y0,z-2,x1-x0,y1-y0,2,r0]);
    for(let i=0;i<(x1-x0)*(y1-y0)/14;i++){ const w=2+R()*6, x=x0+R()*(x1-x0-w), y=y0+R()*(y1-y0-1.5); far.push([x,y,z,w,0.5+R()*1.4,0.25+R()*0.6,R()<0.5?r1:shade(r0,0.85)]); }
    for(let x=x0+2;x<x1-2;x+=3+R()*5){ const h=0.8+R()*2.6; far.push([x,y1-h,z,0.9,h,0.9,r1],[x+0.25,y1-h-0.7,z+0.2,0.4,0.7,0.5,r1]); }
    for(let x=x0+3;x<x1-3;x+=5+R()*7){ const y=y0+1+R()*(y1-y0-3), c=pick(R,gl); S.glowFar.push([x,y,z,0.35,0.9+R()*0.9,0.3,c],[x+0.45,y,z,0.3,0.5+R()*0.5,0.3,c],[x-0.35,y+0.1,z,0.25,0.4,0.3,c]); lamps.push({x:x+0.2,y:y+0.8,z:z+1.6,col:c,power:0.9,reach:9}); } } }
/* a whole level indoors: a cave with a back wall some way off, pillars, and smoking vents on its floor */
function deepCave(S,R,back){ const W=S.W,H=S.H,far=S.far, zw=back-11, r0='#3d2c46', r1='#4d3a58', r2='#2e2238';
  far.push([-60,-30,zw-3,W+120,H+60,3,r2],[-60,-30,zw,W+120,31.6,back-0.02-zw,r0],[-60,H-0.5,zw,W+120,12,back-0.02-zw,r2]);
  for(let i=0;i<W/2;i++){ const x=-40+R()*(W+80), y=R()*(H+2), w=3+R()*9; far.push([x,y,zw,w,0.6+R()*1.6,0.3+R()*0.8,pick(R,[r0,r1,'#584363'])]); }
  for(let x=-30;x<W+30;x+=7+R()*10){ const y=3+R()*(H-4); let cx=x; for(let k=0;k<5;k++){ S.glowFar.push([cx,y-k*0.7,zw+1.2,0.25,0.8,0.1,k%2?'#ff7a1f':'#ffb02e']); cx+=(R()-0.5)*0.8; } }
  for(let x=-30;x<W+30;x+=11+R()*13){ const z=back-2-R()*7; S.glowFar.push([x,1.56,z,2+R()*3,0.1,1+R()*1.5,'#ff8a2e']); }
  for(let x=-30;x<W+30;x+=6+R()*9){ const z=back-1.5-R()*8, k=R(), h=1.5+R()*4;
    if(k<0.35){ const w=1.2+R()*1.6; far.push([x,1.6,z,w,H,w,r1],[x-0.5,1.6,z-0.5,w+1,1.2,w+1,r0],[x-0.5,H-2.5,z-0.5,w+1,2,w+1,r0]); }
    else if(k<0.7) far.push([x,1.6,z,1.4,h*0.5,1.4,r1],[x+0.3,1.6+h*0.5,z+0.3,0.8,h*0.5,0.8,r1]);
    else far.push([x,H-0.5-h*0.5,z,1.4,h*0.5,1.4,r1],[x+0.3,H-0.5-h,z+0.3,0.8,h*0.5,0.8,r1]); }
  for(let x=-10;x<W+10;x+=13+R()*12){ const z=back-2-R()*6, h=2+R()*3; far.push([x,1.6,z,2,h*0.6,2,r2],[x+0.3,1.6+h*0.6,z+0.3,1.4,h*0.4,1.4,r0]);
    S.glowFar.push([x+0.5,1.6+h,z+0.5,1,0.25,1,'#ff8a2e'],[x+0.75,1.85+h,z+0.75,0.5,0.2,0.5,'#ffe08a']); deepBubbles(x+1,1.9+h,z+1,H-1,R); } }

THEMES.deep={ music:'deep',
  sky:['#c6f7ff','#39aee8','#1560b8'], skyMid:0.55, glowCol:0xeaffff, sunGlow:0.7,
  fog:0x2f8fd6, fogNear:8, fogFar:105,
  hemiSky:0xeaffff, hemiGround:0x8fb8d8, hemiI:0.66, sunI:0.6, sunCol:0xfff6d8, sunDir:[-0.35,0.85,0.4],
  top:'#f2e2b0', topS:['#fff0c4','#e6d199','#f7e7b8','#dcc68a'], dirt:'#5f7799', dirtS:['#52698a','#6f88ab','#48607f'], cap:'#f2e2b0', capL:'#fff6d6', capD:'#b9a06a',
  brick:['#ff8f8f','#d0506a','#ffc4bd'], hard:['#a8734a','#d19a66','#6e4526'], pipe:['#f5b942','#ffe7a0','#b9791c','#5a3508'],
  semi:'plank', plat:['#ffb38a','#d9774f'], dust:'#fff0c9', back:-6,
  liquid:{kind:'void'}, pool:{kind:'water',a:'#3fb6f0',b:'#e6fcff',op:0.28},
  disc:['#fff6c9','#fff0a0','#f0b84a'], bloom:0.9, hi:0.1,
  looks:[null,
    {sky:['#b4f5c8','#27a08a','#0c5560'],fog:0x1f8f80,hemiSky:0xe0ffe8,hemiGround:0x5fa890,sunCol:0xf0ffd0,pool:{kind:'water',a:'#3fd0a0',b:'#e6fff2',op:0.26}},
    {sky:['#b59cff','#5b3fb8','#24155e'],fog:0x4a38a8,hemiSky:0xe0d0ff,hemiGround:0x6a58b0,hemiI:0.6,sunI:0.5,sunCol:0xffc9e8,bloom:1.05,pool:{kind:'water',a:'#7a6af0',b:'#f0e0ff',op:0.26}},
    {sky:['#33429c','#151d5a','#060924'],fog:0x0e1648,fogNear:6,fogFar:80,hemiSky:0x8fa0ff,hemiGround:0x2a3070,hemiI:0.5,sunI:0.28,sunCol:0x9fb8ff,bloom:1.25,hi:0.25,pool:{kind:'water',a:'#3a4fd0',b:'#bcd0ff',op:0.3}},
    {sky:['#6a2f4a','#3d1a38','#1c0b20'],fog:0x3a1830,fogNear:6,fogFar:70,hemiSky:0xffc9a8,hemiGround:0x8a3a4a,hemiI:0.55,sunI:0.34,sunCol:0xffb080,bloom:1.2,hi:0.22,back:-4,pool:{kind:'water',a:'#c8507a',b:'#ffd9c0',op:0.24}}],
  /* the far view: the sea bed running off into the haze, with reefs, kelp, a wreck, old columns and giant shells on it,
     light slanting down from above, fish crossing and bubbles rising. A level can say where the sea bed stands higher
     (`floor`), where the surface is (`surf`), where there is a wall behind the walkway (`walls`), or that it is a cave. */
  scenery(S,R){
    const W=S.W, H=S.H, Lv=S.L, st=Lv.look===null?Lv.stage:Lv.look, far=S.far, back=TH.back||-2.5, dark=st>=3, surf=Lv.surf, segs=Lv.floor||[];
    const fy=(x,z)=>{ for(const s of segs) if(x>=s[0]&&x<s[1]&&z>=(s[3]===undefined?-999:s[3])) return s[2]; return 1.6; };
    const land=y=>surf!==undefined&&y>surf;
    if(Lv.cave) deepCave(S,R,back);
    else {
      const sand='#e9d9a8', rk='#56698c';
      far.push([-90,-40,-150,W+180,41.3,150+back-0.02,rk],[-90,1.3,-150,W+180,0.3,150+back-0.02,sand]);
      for(const s of segs){ const zf=s[3]===undefined?-150:s[3]; far.push([s[0],s[2]-60,zf,s[1]-s[0],59.7,back-0.02-zf,rk],[s[0],s[2]-0.3,zf,s[1]-s[0],0.3,back-0.02-zf,sand]); }
      for(let i=0;i<W*0.7;i++){ const x=-40+R()*(W+80), z=back-0.6-R()*70; if(fy(x,z)!==1.6) continue; far.push([x,1.6,z,3+R()*8,0.04+R()*0.1,0.4+R()*1.1,R()<0.5?'#f6e8bc':'#d6c38c']); }
      /* big shapes far off: sea mounts, with a reef on top of each */
      for(let x=-50;x<W+50;x+=22+R()*26){ const z=-46-R()*30, y=fy(x,z); if(land(y)) continue; const top=y+5+R()*9; hill(far,x,top,z,12+R()*14,pick(R,W3_ROCK),R,false); deepReef(S,x,top,z+2.3,1.8+R()*1.4,R,dark); }
      /* reefs at every depth */
      for(let x=-30;x<W+30;x+=5+R()*8){ const z=back-1.6-R()*R()*55, y=fy(x,z); if(land(y)) continue; deepReef(S,x,y,z,0.8+R()*1.2-z*0.03,R,dark); }
      /* kelp, thick in the forest */
      for(let x=-30;x<W+30;x+=(st===1?2.2:9)+R()*(st===1?3:9)){ const z=back-1-R()*(st===1?46:34), y=fy(x,z); if(land(y)) continue;
        const k=1.5-z*0.035, room=(surf!==undefined?surf:H+5)-y-1, n=Math.max(3,Math.min(Math.floor(room*8/(4*k)),7+((R()*10)|0)));
        put(S.flora,dDeepKelp(R,n,dark?'#2a7a6a':pick(R,W3_KELP),k),x*8,y*8,z*8,1.6+R()); }
      /* palms on whatever stands above the water */
      for(const s of segs) if(land(s[2])) for(let x=s[0]+3;x<s[1]-3;x+=5+R()*7){ const z=back-1.5-R()*Math.min(40,back-2-(s[3]===undefined?-60:s[3])); if(x>-60&&x<W+60) put(S.flora,dDeepPalm(R),x*8,s[2]*8,z*8,0.5); }
      /* set pieces: a wreck, a row of columns, giant shells */
      if(!land(fy(W*0.3,-30))) deepShip(W*0.3+R()*16,fy(W*0.3,-30)+1.2,-30,1.25,0.13,R);
      if(st===2){ deepShip(W*0.74,2.4,-19,1.5,-0.1,R); deepShip(W*0.08,2.6,-40,1.2,0.2,R); }
      if(st!==3&&!land(fy(W*0.66,-24))) deepRuins(S,W*0.66+R()*14,1.6,-24-R()*6,R);
      for(let x=18+R()*30;x<W;x+=45+R()*40){ const z=back-4-R()*12, y=fy(x,z); if(!land(y)) deepGiantShell(S,x,y,z,0.7+R()*0.7,R); }
      /* the canyon walls of the trench: ledges with crystals on them */
      if(st===3) for(const s of segs) for(let z=back-3;z>-70;z-=3+R()*5){ const w=1.5+R()*3, lf=s[0]>0, x=lf?s[0]-w:s[1], y=3+R()*(s[2]-6), c=pick(R,['#7df9ff','#b58cff','#7dffb0','#ff8fe0']);
        far.push([x,y,z,w,0.7,2.4,'#4a5e82']); S.glowFar.push([x+w*0.3,y+0.7,z+1,0.35,0.7+R()*1.3,0.35,c],[x+w*0.3+0.5,y+0.7,z+1.2,0.3,0.5+R()*0.6,0.3,c]); }
      deepShafts(W,H,R,[0xffffff,0xd8ffd0,0xe6d0ff,0x8fa8ff,0xffffff][st],Math.ceil(W/(dark?16:6)),[0.11,0.1,0.075,0.05,0.05][st]);
      /* a whale, a long way off */
      if(st<3) deepWhale(W,(surf!==undefined?surf:H)-5,-72,R);
    }
    /* walls behind the indoor parts */
    for(const w of Lv.walls||[]) deepWall(S,w[0],w[1],w[2],w[3],w[4],R);
    /* the sunlit shallows have a surface, a sun above it and clouds */
    if(surf!==undefined){
      const sm=new T.Mesh(tmpGeo(new T.PlaneGeometry(W+200,150,1,1)),liquidMat({a:'#43b8ee',b:'#ecfdff',op:0.5},0)); sm.geometry.rotateX(-Math.PI/2); sm.material.side=T.DoubleSide; sm.position.set(W/2,surf,back-75.02); sm.renderOrder=1; world.add(sm);
      skyDisc(TH.disc,null,H-3.5);
      for(let x=-40;x<W+40;x+=12+R()*12) S.addCloud(x,surf+6+R()*6,-36-R()*40,R);
    }
    /* fish in schools, at every distance */
    const cols=dark?['#7df9ff','#b6f24a','#ff8fe0','#ffd166']:['#ffb347','#ff6b9d','#ffe14d','#ffffff','#7ee0ff','#ff8a5c'];
    for(let i=0;i<Math.ceil(W/16);i++){ const z=Math.max(back-(Lv.cave?9:22),-3.4-R()*20), y=3.5+R()*((surf!==undefined?surf:H)-6.5);
      deepSchool(W,R()*W,y,z,4+((R()*5)|0),pick(R,cols),(R()<0.5?-1:1)*(0.8+R()*1.2),R,dark&&R()<0.7); }
    if(st===3) for(let i=0;i<Math.ceil(W/6);i++) deepGlowJelly(-10+R()*(W+20),4+R()*(H-6),back-2-R()*26,pick(R,['#ff8fe0','#7df9ff','#b58cff']),R);
    /* strings of bubbles from the sea bed beside the walkway */
    const tl=Lv.tiles;
    for(let x=4+((R()*6)|0);x<W-2;x+=7+((R()*9)|0)){ let ty=0; while(ty<H&&tl[ty*W+x]===GROUND) ty++; if(!ty||ty>=H-3) continue;
      let top=ty; while(top<H&&tl[top*W+x]!==GROUND) top++; const wv=Lv.waters.find(q=>x>=q.x0&&x<q.x1&&ty>=q.y0&&ty<q.y1); if(!wv) continue;
      deepBubbles(x+0.5,ty+0.2,back+0.5+R()*(-back-2),Math.min(top,wv.y1-0.3),R); }
    S.addMotes(0xdffaff,Math.round(W*H/26),0.1,-1.1,true);
  },
  /* on the sea bed: corals, sponges, anemones, kelp, shells and whatever each level adds; on dry ground a beach or a cave */
  decor(S,D,R){
    const r=R(), y=D.ty*8, Lv=S.L, st=Lv.look===null?Lv.stage:Lv.look, zm=Math.max(1.7,-D.back-0.7), zb=(a,b)=>D.zb(Math.min(a,zm-0.3),Math.min(b,zm)), dark=st>=3;
    const gx=D.x+0.5, lamp=(c,p)=>lamps.push({x:gx,y:D.ty+0.9,z:-1.8,col:c,power:p||0.9,reach:8});
    if(!D.wet){
      if(!D.open) return;
      if(Lv.surf!==undefined){
        if(r<0.12&&D.free(6)&&D.open) put(S.flora,dDeepPalm(R),D.jx(),y,zb(2.6,5),0.55);
        else if(r<0.34) put(S.flora,dDeepGrass('#9bd95a'),D.jx(),y,zb(1.2,5.4),1.6);
        else if(r<0.44) put(S.near,dRock(pick(R,['#e0c9a0','#cdb68c'])),D.jx(),y,zb(1.2,5));
        else if(r<0.54) put(S.near,dDeepShell(pick(R,['#ffc2d6','#fff2c2','#c9b8ff'])),D.jx(),y,zb(1.2,5));
        if(R()<0.16) put(S.near,dDeepStar(pick(R,['#ff8fa8','#ffb347'])),D.jx(),y,D.zf());
      } else if(st===2){
        if(r<0.12&&D.free(2)) put(S.near,dDeepBarrel(),D.jx(),y,zb(1.4,5));
        else if(r<0.22&&D.free(2)) put(S.near,dDeepAmphora(),D.jx(),y,zb(1.4,5));
        else if(r<0.32&&D.free(2)) put(S.near,dCrate(pick(R,['#a8734a','#8a5a3c'])),D.jx(),y,zb(1.4,5));
        else if(r<0.4&&D.free(2)){ const jx=D.jx(), jz=zb(1.4,4); put(S.near,[[-1,0,-1,2,0.6,2,'#55637f'],[-0.3,0.6,-0.3,0.6,2.6,0.6,'#55637f'],[-1.1,5.2,-1.1,2.2,0.5,2.2,'#55637f']],jx,y,jz); put(S.glow,[[-0.8,3.2,-0.8,1.6,2,1.6,'#ffd98a']],jx,y,jz); lamp(0xffc070,1.1); }
      } else {
        const gc=st===4?['#ff8a2e','#ffc24a','#ff5f6d']:['#7df9ff','#b58cff','#7dffb0','#ff8fe0'];
        if(r<0.14&&D.free(2)) put(S.near,dDeepSpire(st===4?'#4d3a58':'#5a6f96'),D.jx(),y,zb(1.4,5));
        else if(r<0.24&&D.free(2)){ const c=pick(R,gc); put(S.glow,dCrystal(c),D.jx(),y,zb(1.4,5)); if(R()<0.6) lamp(c,1); }
        else if(r<0.32){ const c=pick(R,gc); put(S.glow,dShroom(c),D.jx(),y,zb(1.2,5)); }
        else if(r<0.44) put(S.near,dRock(st===4?'#5a4566':'#6f84a8'),D.jx(),y,zb(1.2,5));
      }
      return;
    }
    const c=pick(R,W3_CORAL), kelp=st===1?0.2:0.05;
    let q=0.09;
    if(r<q&&D.free(2)){ const m=dDeepBranch(c,R); put(S.near,m,D.jx(),y,zb(1.5,5.4)); if(dark&&R()<0.5){ const p=m[1], jx=D.jx(), jz=zb(1.5,5); put(S.glow,[[p[0],p[1],p[2],p[3],p[4],p[5],shade(c,1.3)]],jx,y,jz); } }
    else if(r<(q+=0.07)) put(S.near,dDeepBrain(c),D.jx(),y,zb(1.3,5.4));
    else if(r<(q+=0.07)&&D.free(2)) put(S.near,dDeepTubes(c,R),D.jx(),y,zb(1.5,5.4));
    else if(r<(q+=0.07)) put(S.flora,dDeepAnemone(pick(R,['#ff8fc7','#ff9a4d','#b58cff','#7ee0d0'])),D.jx(),y,zb(1.3,5.2),3);
    else if(r<(q+=kelp)&&D.open){ let h=0; while(h<8&&D.free(h+1)) h++; if(h>=3) put(S.flora,dDeepKelp(R,Math.min(h*2-1,5+((R()*9)|0)),dark?'#2a7a6a':pick(R,W3_KELP)),D.jx(),y,zb(1.6,5.4),2.2); }
    else if(r<(q+=0.1)) put(S.flora,dDeepGrass(dark?'#2f8f7a':pick(R,['#4fbf6a','#3fae8a'])),D.jx(),y,zb(1.2,5.4),2.6);
    else if(r<(q+=0.035)){ const jx=D.jx(), jz=zb(1.6,5); put(S.near,dDeepClam(pick(R,['#ffb3d0','#c9b8ff','#ffd9a8'])),jx,y,jz); put(S.glow,[[-0.8,1.9,-0.5,1.6,1.6,1.6,'#ffffff']],jx,y,jz); if(dark) lamp(0xdfe8ff,0.8); }
    else if(r<(q+=0.05)) put(S.near,dRock(pick(R,['#6f84a8','#8094b8'])),D.jx(),y,zb(1.2,5.4));
    else if(r<(q+=0.03)) put(S.near,dDeepUrchin(),D.jx(),y,zb(1.2,5));
    else if(st===2&&r<(q+=0.07)&&D.free(2)) put(S.near,pick(R,[dDeepAmphora,dDeepBarrel,dDeepAnchor])(),D.jx(),y,zb(1.5,5));
    else if(st===3&&r<(q+=0.09)&&D.free(2)){ const g=pick(R,['#7df9ff','#b58cff','#7dffb0','#ff8fe0']); put(S.glow,dCrystal(g),D.jx(),y,zb(1.4,5)); lamp(g,1); }
    else if(st===4&&r<(q+=0.08)&&D.free(2)){ const jx=D.jx(), jz=zb(1.6,3.2); put(S.near,dDeepChimney(),jx,y,jz); put(S.glow,[[-1,9.5,-1,2,0.8,2,'#ff8a2e'],[-0.5,10.3,-0.5,1,0.6,1,'#ffe08a'],[-2.25,3.6,2.25,0.5,2.2,0.1,'#ff6a1f']],jx,y,jz); lamp(0xff7a2e,1.1); }
    const f=R();
    if(f<0.1) put(S.near,dDeepStar(pick(R,['#ff8fa8','#ffb347','#ff6b6b'])),D.jx(),y,D.zf());
    else if(f<0.18) put(S.near,dDeepShell(pick(R,['#ffc2d6','#fff2c2','#c9b8ff'])),D.jx(),y,D.zf());
  }
};

/* 3-1: the dive. Off the end of a sunny pier into a wide, shallow reef: learning to swim, past the first Jellies and
   one Puffer, through three walls of rock, and out onto a beach. */
function w3l1(){
  const B=LevelBuilder(200,'deep',22);
  B.set('surf',10.86).set('floor',[[-90,9,12,-36],[152,300,12,-70]]);
  B.ground(0,199).ground(0,8,12).water(0,0,157,10);
  B.start(3,12).sign(6,'Dive in! Under water, tap {jump} to swim up. Let go and you sink.',12);
  B.row(9,11,'===========');
  /* a cave under the shore, behind where anybody looks */
  B.clear(3,2,8,4).shard(4,3).coins(5,2,3);
  for(let i=0;i<6;i++) B.coins(21+i,9-i,1);
  B.row(29,5,'?M?').coins(34,3,6).enemy('jelly',37,6.5,{ry:1.4}).enemy('snippy',44);
  /* the first wall, with a way through at the bottom */
  B.fill(50,2,53,15,GROUND).clear(50,3,53,6).coins(50,4,4);
  B.ground(60,65,4).arc(60,6,6).enemy('jelly',68,6.6,{ry:1.6}).shard(68,2).ground(72,77,5).row(74,8,'?');
  /* a raft: leap out of the water to land on it */
  B.sign(80,'At the top of the water, {jump} leaps right out of it.').row(83,11,'===').coinCol(84,6,4).shard(84,13);
  B.enemy('jelly',90,6,{ry:1.6,sp:1.2});
  B.fill(96,2,99,15,GROUND).clear(96,6,99,9).coins(96,7,4);
  B.checkpoint(104);
  B.sign(108,'A Puffer swells up when you swim close. Give it plenty of room.').row(111,5,'M').coins(114,3,4);
  B.enemy('puffer',121,6,{rx:4}).coins(118,9,7).pipe(131,2,true).row(136,6,'I').coins(136,4,1);
  B.enemy('jelly',140,6.6,{ry:1.5});
  B.fill(144,2,147,15,GROUND).clear(144,3,147,6).coins(144,4,4);
  /* up the slope and out onto the beach */
  B.ground(150,151,4).ground(152,153,6).ground(154,155,8).ground(156,157,10).ground(158,199,12);
  B.coins(150,5,2).coins(152,7,2).coins(154,9,2).enemy('shellby',164,12);
  B.stairs(168,6,1,12).fill(174,12,174,17,HARD);
  B.goal(180,12);
  return B.L;
}
/* the water of an open level has no roof, so a strong downward current along the top keeps Blorp from swimming over everything */
function w3lid(B,x0,x1,y){ for(let x=x0;x<=x1;x+=22) B.wind(x,y,Math.min(x1,x+21),y+9,0,-60); }

/* 3-2: the kelp forest. Currents: one to ride along a trail of coins, one that pushes the wrong way and must be swum
   around, one that presses down on a bed of spikes, and a fast one through a rocky channel. */
function w3l2(){
  const B=LevelBuilder(258,'deep',20);
  B.room(0,223).room(228,257,0,19,true);
  B.set('walls',[[181.6,224,0,22,'rock'],[228,258,0,22,'rock']]);
  B.ground(0,223).water(0,0,181,23); w3lid(B,0,181,14);
  B.sign(5,'Tap {jump} to swim. Hold {down} to sink faster.');
  B.row(10,5,'?M?').coins(15,3,4).enemy('snippy',20).enemy('jelly',26,7,{ry:1.8});
  B.fill(31,2,34,19,GROUND).clear(31,8,34,11).coins(31,9,4);
  /* the slide: a gentle current and a trail of coins; a pipe hides underneath it */
  B.sign(37,'A current! Stop swimming and let it carry you.');
  B.wind(40,6,62,9,10,0); for(let x=41;x<=61;x+=2) B.coins(x,x%4===1?8:7,1);
  B.enemy('spikit',46).warp(52,2,'in');
  B.fill(66,2,69,19,GROUND).clear(66,6,69,9).coins(66,7,4);
  /* the wrong way: a current along the floor that sweeps back, Jellies above, and a lane between them */
  B.warp(72,2,'out',true).sign(76,'Some currents push the wrong way. Swim around them.');
  B.wind(79,2,93,5,-18,0).shard(91,3).coins(80,7,13);
  B.enemy('jelly',83,10.5,{ry:1.5}).enemy('jelly',89,10.5,{ry:1.5,sp:1.3});
  B.fill(101,2,104,19,GROUND).clear(101,3,104,6).coins(101,4,4);
  B.checkpoint(108);
  /* a current that presses down on spikes */
  B.row(110,5,'M').sign(113,'This one pushes down. Keep swimming!');
  B.spikes(116,126,2).wind(116,3,126,13,0,-14).arc(117,7,10);
  B.enemy('puffer',134,8,{rx:3}).coins(131,3,7);
  /* the rapids: a fast current down a channel, Jellies high and low, and a nook in the roof for the quick */
  B.ground(142,172,5).fill(142,11,172,19,GROUND).wind(143,5,171,10,12,0);
  B.coins(145,6,8).enemy('jelly',152,9,{ry:0.5}).clear(156,11,158,12).shard(157,12).coins(158,9,8).enemy('jelly',163,6,{ry:0.5});
  B.coins(174,7,1).coins(175,5,1).coins(176,4,1);
  B.fill(178,2,181,19,GROUND).clear(178,2,181,4).coins(178,3,4);
  /* up into a cave with air in it: a pool, a rim, and dry ground to the flag */
  B.water(182,0,187,5).fill(182,18,223,19,GROUND).ground(188,189,6).coinCol(185,3,3).coins(188,7,2).row(191,5,'I');
  B.stairs(192,6).fill(198,2,198,7,HARD);
  B.goal(204);
  /* the secret grotto */
  B.fill(224,0,227,19,GROUND).ground(228,257).fill(228,2,228,19,HARD).fill(257,2,257,19,HARD).fill(229,13,256,19,GROUND).water(229,0,256,11);
  B.warp(231,2,'in',true).warp(253,2,'out').coinBox(236,3,248,5).row(240,8,'?L?').shard(241,10);
  return B.L;
}
/* 3-3: the sunken ship. Through the decks of a wreck: hatches of planks, a tall flooded hall where a switch opens the
   red door, Puffers behind the doorways, planks in a pocket of air to cross above one, and a pipe down to the hold. */
function w3l3(){
  const B=LevelBuilder(228,'deep',20);
  B.room(0,193).room(198,227,0,19,true);
  B.set('walls',[[27.5,52,0,16,'hull'],[78,128,0,16,'hull'],[140,194,0,20,'hull'],[198,228,0,20,'hull']]);
  B.ground(0,193);
  B.water(0,0,51,22).water(52,0,79,11).water(80,0,111,14).water(112,0,141,11).water(142,0,147,5).water(52,16,139,22); w3lid(B,0,25,13);
  B.sign(6,'The wreck of the Salty Muffin. Mind the Puffers behind its doors.');
  B.row(11,5,'?M?').coins(16,3,4).enemy('snippy',19);
  /* the hull: a wall at the bow with a hole in it, a roof, a deck half way up, and walls between the rooms */
  B.fill(26,2,27,15,HARD).clear(26,3,27,6).fill(28,15,139,15,HARD).fill(28,8,139,8,HARD);
  B.fill(50,2,51,14,HARD).fill(78,2,79,14,HARD).fill(110,2,111,14,HARD).fill(140,2,141,19,HARD);
  /* the fo'c'sle: in at the bottom, up through a hatch, and a shard at the far end of the upper deck */
  B.coins(26,4,2).coins(30,3,5).enemy('jelly',37,4.9,{ry:1.5}).row(44,8,'====').coinCol(45,4,3);
  B.shard(29,10).row(33,12,'?B?').coins(38,10,5).clear(50,9,51,11).coins(50,10,2);
  /* the cargo hall: a Puffer inside the door, a switch in the roof above a ledge, and the red door at the bottom */
  B.clear(52,8,77,8).enemy('puffer',58,9.5,{rx:3}).coinCol(53,5,4);
  B.row(60,5,'?B?').enemy('snippy',66).sign(63,'Hit a switch and the red blocks open.');
  B.row(67,11,'=====').row(69,15,'X').coins(67,12,5);
  B.row(78,2,'RR').row(78,3,'RR').row(78,4,'RR').coins(73,3,4);
  /* the hold: crates, a pipe between them, and a hatch up at the far end */
  B.checkpoint(83).row(86,5,'M').fill(88,2,89,3,HARD).warp(92,2,'in').fill(96,2,97,4,HARD).enemy('jelly',100,4.9,{ry:1.5});
  B.row(103,8,'====').coinCol(104,4,3).warp(82,2,'out',true,9).coins(87,10,6).row(96,12,'?');
  B.clear(110,9,111,11).coins(108,10,4);
  /* the galley: planks in the air to walk above a Puffer, then a deep shaft with a second switch for the blue door */
  B.enemy('puffer',118.5,10.2,{rx:2.5}).row(114,12,'============').coins(116,13,8);
  B.clear(128,8,139,8).row(133,14,'X').enemy('jelly',136,7,{ry:2});
  B.fill(126,5,127,7,HARD).row(126,2,'UU').row(126,3,'UU').row(126,4,'UU').sign(130,'Hit a switch again: blue blocks open, red ones close.');
  B.shard(115,3).coins(117,3,6);
  B.clear(140,2,141,4).coins(138,3,4);
  /* the great cabin still has its air: a pool, a sill, and the flag */
  B.ground(148,149,6).coinCol(145,3,3).fill(142,18,193,19,HARD).fill(192,2,193,17,HARD).row(151,5,'I');
  B.stairs(154,6).fill(160,2,160,7,HARD);
  B.goal(166);
  /* the secret hold, full of coins */
  B.fill(194,0,197,19,GROUND).ground(198,227).fill(198,2,198,19,HARD).fill(227,2,227,19,HARD).fill(199,12,226,12,HARD).fill(199,13,226,19,GROUND).water(199,0,226,10);
  B.warp(200,2,'in',true).warp(223,2,'out').fill(206,2,207,3,HARD).fill(217,2,218,3,HARD).coinBox(209,2,215,5).coins(206,4,2).coins(217,4,2).shard(212,8);
  return B.L;
}
function w3stub(n){ return ()=>{ const B=LevelBuilder(110,'deep'); B.ground(0,109).water(0,0,78,18).fill(79,2,82,15,GROUND).clear(79,2,82,4).shard(8,3).shard(10,3).shard(12,3);
  if(n===4) B.set('cave',true); if(n===3) B.set('floor',[[-90,20,9],[60,300,9]]); if(n===2) B.set('walls',[[30,60,0,14,'hull']]);
  B.enemy('jelly',20,5,{ry:1}).row(30,5,'?M?').row(40,4,'===').fill(50,2,50,4,HARD).pipe(56,2).goal(95); return B.L; }; }
defWorld({name:'Fizzy Deep',theme:'deep',levels:[w3l1,w3l2,w3l3,w3stub(3),w3stub(4)]});
