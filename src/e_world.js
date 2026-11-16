/* ================= the level as a place: terrain, water, scenery, effects, camera ================= */
/* level-scoped state */
let L=null,W=0,H=16,tiles=null,M=null,TH=null,GRAV=1,swOn=true,room=null;
const blockMesh=new Map(), multi=new Map(), crumbles=new Map();
let coinMesh=null,coinIdx=new Map(),coinPos=[];
let sunMesh=null,flagMesh=null,cpFlag=null,motes=null,blinkOn=false,clouds=[],critters=[],lamps=[];
let enemies=[],items=[],shots=[],bombs=[],plats=[],springs=[],firebars=[],bumps=[],shards=[],pods=[],jets=[],cannons=[],signs=[],winds=[];
let V=12.5,viewHalfW=11,camDist=23.3,camBaseY=6.25,camX=8,camY=6.25,camLead=0,focusY=2,shakeT=0,shakeA=0;

const tileAt=(x,y)=>(x<0||x>=W||y<0||y>=H)?AIR:tiles[y*W+x];
/* red blocks are solid while the switch is on, blue ones while it is off */
const solidId=id=>id===RED?swOn:id===BLUE?!swOn:SOLID[id]===1;
const solidAt=(x,y)=>{ if(x<0||x>=W) return true; if(y<0||y>=H) return false; return solidId(tiles[y*W+x]); };
const semiAt=(x,y)=>tileAt(x,y)===SEMI;
function waterAt(x,y){ for(const w of L.waters) if(x>=w.x0&&x<w.x1&&y>=w.y0&&y<w.y1) return w; return null; }
const tmpGeo=g=>{ g.userData.tmp=true; return g; };
function disposeWorld(){
  world.traverse(o=>{
    if(o.geometry&&o.geometry.userData.tmp) o.geometry.dispose();
    const m=o.material; if(m&&!Array.isArray(m)&&m.userData.tmp){ if(m.map) m.map.dispose(); m.dispose(); }
  });
  scene.remove(world); world=new T.Group(); scene.add(world);
}
/* add a merged voxel mesh to the level; `lit` ones take and throw shadows */
function addVox(boxes,scale,mat,lit,sway){
  if(!boxes.length) return null;
  const m=new T.Mesh(tmpGeo(voxGeo(boxes,scale,sway)),mat||MAT.vox); if(lit){ m.castShadow=true; m.receiveShadow=true; } world.add(m); return m;
}

/* ---------- materials ---------- */
const LM=t=>new T.MeshLambertMaterial({map:t,vertexColors:true});
const iceMat=LM(texIce());
const matCache={};
function themeMats(name){
  if(matCache[name]) return matCache[name];
  const c=THEMES[name];
  return matCache[name]={ gTop:LM(texTop(c)), gSide:LM(texSide(c)), gDirt:LM(texDirt(c)), gUnder:LM(texUnder(c)), hard:LM(texHard(c.hard)),
    sTop:LM(texSemi(c.semi,0)), sSide:LM(texSemi(c.semi,1)), sFace:LM(texSemi(c.semi,2)), sUnder:new T.MeshLambertMaterial({color:SEMI_UNDER[c.semi]}), brick:new T.MeshLambertMaterial({map:texBrick(c.brick)}), ice:iceMat,
    cvTop:cvTopMat, cvL:cvLMat, cvR:cvRMat };
}
const BM=t=>new T.MeshLambertMaterial({map:t});
const texEyeOpen=texEye(true), texEyeShut=texEye(false);
const eyeMat=BM(texEyeOpen), eyeTopMat=BM(texEyeTop()), usedMat=BM(texUsed(true)), usedTopMat=BM(texUsed(false));
const eyeArr=[eyeMat,eyeMat,eyeTopMat,eyeTopMat,eyeMat,eyeMat], usedArr=[usedMat,usedMat,usedTopMat,usedTopMat,usedMat,usedMat];
const crumbleMat=BM(texCrumble()), switchMats=[BM(texSwitch(false)),BM(texSwitch(true))];
const togSolid=[BM(texToggle(false,true)),BM(texToggle(true,true))];
const togGhost=[0,1].map(i=>new T.MeshBasicMaterial({map:texToggle(!!i,false),transparent:true,alphaTest:0.5,side:T.DoubleSide}));
const cvTex=[texConveyor(0),texConveyor(1),texConveyor(2)], cvTopMat=LM(cvTex[0]), cvRMat=LM(cvTex[1]), cvLMat=LM(cvTex[2]);
const blockGeo=new T.BoxGeometry(1,1,1), partGeo=new T.BoxGeometry(1,1,1);
const emberMat=[new T.MeshBasicMaterial({color:0xff7a1f,opacity:0}),new T.MeshBasicMaterial({color:0xffd23e,opacity:0})];
const fireMat=new T.MeshBasicMaterial({color:0xffa52e,opacity:0});

/* ---------- terrain mesher ---------- */
/* Ground and ice run from the front lip back to the theme's `back`; blocks and ledges are one tile deep either side of
   the lane Blorp walks in. Every corner of every face also gets a shade: earth darkens with depth below its surface,
   and a floor darkens where a wall rises from it. That shading is baked into the mesh and costs nothing to draw. */
function buildTerrain(){
  const bk={}, back=TH.back||-2.5;
  const DEPTH={}; DEPTH[GROUND]=DEPTH[ICE]=[1.5,back]; DEPTH[HARD]=DEPTH[SEMI]=DEPTH[CONV_L]=DEPTH[CONV_R]=[1,-1];
  const bucket=n=>bk[n]||(bk[n]={p:[],n:[],u:[],c:[],i:[],k:0});
  function quad(name,a,b,c,d,nx,ny,nz,uw,vh,v0,s){ const q=bucket(name); v0=v0||0;
    q.p.push(a[0],a[1],a[2],b[0],b[1],b[2],c[0],c[1],c[2],d[0],d[1],d[2]);
    for(let k=0;k<4;k++){ q.n.push(nx,ny,nz); const f=s?s[k]:1; q.c.push(f,f,f); }
    q.u.push(0,v0,uw,v0,uw,v0+vh,0,v0+vh); q.i.push(q.k,q.k+1,q.k+2,q.k,q.k+2,q.k+3); q.k+=4; }
  /* outside the level the ground simply continues, so the edges of the world are never seen */
  const vis=(x,y)=>{ if(y>=H) return AIR; const cx=clamp(x,0,W-1);
    if(y<0) return tiles[cx]===GROUND?GROUND:AIR;
    const id=tiles[y*W+cx]; return (x<0||x>=W)?(id===GROUND?GROUND:AIR):id; };
  const full=(x,y)=>{ const id=vis(x,y); return id===GROUND||id===ICE; };
  const covers=(x,y,zf,zb)=>{ const d=DEPTH[vis(x,y)]; return !!d&&vis(x,y)!==SEMI&&d[0]>=zf&&d[1]<=zb; };
  const wallish=(x,y)=>{ const id=vis(x,y); return id!==AIR&&id!==SEMI&&id!==COIN&&id!==SPIKE&&id!==HIDDEN&&id!==RED&&id!==BLUE; };
  /* how far a tile's top is below open air, 0 to 5 */
  const under=(x,y)=>{ let n=0; while(n<5&&full(x,y+1+n)) n++; return n; };
  const dim=n=>1-0.075*Math.min(n,5);
  for(let y=-5;y<H;y++) for(let x=-14;x<W+14;x++){
    const id=vis(x,y), d=DEPTH[id]; if(!d) continue;
    const zf=d[0], zb=d[1], dz=zf-zb;
    if(id===SEMI){
      const y0=y+0.5, y1=y+1;
      quad('sTop',[x,y1,zf],[x+1,y1,zf],[x+1,y1,zb],[x,y1,zb],0,1,0,1,dz);
      quad(((x%3)+3)%3===1?'sFace':'sSide',[x,y0,zf],[x+1,y0,zf],[x+1,y1,zf],[x,y1,zf],0,0,1,1,0.5,0.5);
      if(vis(x+1,y)!==SEMI) quad('sSide',[x+1,y0,zf],[x+1,y0,zb],[x+1,y1,zb],[x+1,y1,zf],1,0,0,dz,0.5,0.5);
      if(vis(x-1,y)!==SEMI) quad('sSide',[x,y0,zb],[x,y0,zf],[x,y1,zf],[x,y1,zb],-1,0,0,dz,0.5,0.5);
      quad('sUnder',[x,y0,zb],[x+1,y0,zb],[x+1,y0,zf],[x,y0,zf],0,-1,0,1,dz);
      continue;
    }
    let top='hard',side='hard',under_='hard', n0=0;
    if(id===ICE) top=side=under_='ice';
    else if(id===CONV_L||id===CONV_R){ top='cvTop'; side=id===CONV_L?'cvL':'cvR'; }
    else if(id===GROUND){
      const expTop=y<H-1&&vis(x,y+1)!==GROUND, expBot=y>0&&vis(x,y-1)!==GROUND;
      top='gTop'; under_='gDirt'; side=expTop?'gSide':(expBot?'gUnder':'gDirt'); n0=under(x,y);
    }
    const sT=dim(n0), sB=dim(n0+1), wl=wallish(x-1,y+1)?0.7:1, wr=wallish(x+1,y+1)?0.7:1;
    if(!covers(x,y+1,zf,zb)&&y<H-1) quad(top,[x,y+1,zf],[x+1,y+1,zf],[x+1,y+1,zb],[x,y+1,zb],0,1,0,1,dz,0,[wl,wr,wr,wl]);
    quad(side,[x,y,zf],[x+1,y,zf],[x+1,y+1,zf],[x,y+1,zf],0,0,1,1,1,0,[sB,sB,sT,sT]);
    if(!covers(x+1,y,zf,zb)){ const f=wallish(x+1,y-1)?0.72:1; quad(side,[x+1,y,zf],[x+1,y,zb],[x+1,y+1,zb],[x+1,y+1,zf],1,0,0,dz,1,0,[sB*f,sB*f,sT,sT]); }
    if(!covers(x-1,y,zf,zb)){ const f=wallish(x-1,y-1)?0.72:1; quad(side,[x,y,zb],[x,y,zf],[x,y+1,zf],[x,y+1,zb],-1,0,0,dz,1,0,[sB*f,sB*f,sT,sT]); }
    if(y>0&&!covers(x,y-1,zf,zb)) quad(under_,[x,y,zb],[x+1,y,zb],[x+1,y,zf],[x,y,zf],0,-1,0,1,dz,0,[0.62,0.62,0.62,0.62]);
    /* the back of the shelf, where the far scenery can see it */
    if(zb<-2.6&&id===GROUND&&vis(x,y+1)!==GROUND) quad('gSide',[x+1,y,zb],[x,y,zb],[x,y+1,zb],[x+1,y+1,zb],0,0,-1,1,1,0,[0.7,0.7,0.8,0.8]);
  }
  for(const k in bk){ const q=bk[k], g=tmpGeo(new T.BufferGeometry());
    g.setAttribute('position',new T.Float32BufferAttribute(q.p,3)); g.setAttribute('normal',new T.Float32BufferAttribute(q.n,3)); g.setAttribute('uv',new T.Float32BufferAttribute(q.u,2));
    g.setAttribute('color',new T.Float32BufferAttribute(q.c,3)); g.setIndex(q.i);
    const m=new T.Mesh(g,M[k]); m.castShadow=true; m.receiveShadow=true; world.add(m); }
}
function addBlock(x,y,id){
  let m;
  if(id===CANNON){ m=vmesh('cannon',mCannon); m.position.set(x+0.5,y,0); m.receiveShadow=true; world.add(m); blockMesh.set(y*W+x,m); return m; }
  const tog=id===RED||id===BLUE, solid=tog&&solidId(id);
  m=new T.Mesh(blockGeo,id===BRICK?M.brick:id===QBLOCK?eyeArr:id===CRUMBLE?crumbleMat:id===SWITCH?switchMats[swOn?0:1]:tog?(solid?togSolid:togGhost)[id===BLUE?1:0]:usedArr);
  m.position.set(x+0.5,y+0.5,0); m.castShadow=!tog||solid; m.receiveShadow=true; world.add(m); blockMesh.set(y*W+x,m); return m;
}
function buildBlocks(){ for(let y=0;y<H;y++) for(let x=0;x<W;x++){ const id=tiles[y*W+x]; if(id===BRICK||id===QBLOCK||id===USED||id===CRUMBLE||id===SWITCH||id===RED||id===BLUE||id===CANNON) addBlock(x,y,id); } }
/* the switch was hit: every red and blue block changes over, and the switches change colour */
function restyleToggles(){
  for(const [k,m] of blockMesh){ const id=tiles[k];
    if(id===SWITCH) m.material=switchMats[swOn?0:1];
    else if(id===RED||id===BLUE){ const s=solidId(id); m.material=(s?togSolid:togGhost)[id===BLUE?1:0]; m.castShadow=s; } }
}
function buildPipes(){
  const c=TH.pipe, b=[];
  for(const p of L.pipes){ const x=p.x,y=p.y,h=p.h;
    b.push([x+0.1,y,-0.9,1.8,h-0.55,1.8,c[0]],[x-0.06,y+h-0.55,-1.06,2.12,0.55,2.12,c[0]],
      [x+0.3,y,0.9,0.25,h-0.55,0.03,c[1]],[x+0.14,y+h-0.55,1.06,0.3,0.55,0.03,c[1]],[x+1.35,y,0.9,0.4,h-0.55,0.03,c[2]],[x+1.5,y+h-0.55,1.06,0.4,0.55,0.03,c[2]],
      [x+0.25,y+h,-0.75,1.5,0.02,1.5,c[3]]); }
  /* a pipe that can be gone down wears a band of arrows */
  for(const w of L.warps) if(w.enter) for(let i=0;i<3;i++) b.push([w.x-0.72+i*0.52,w.y-0.42,1.07,0.4,0.1,0.03,'#fff2c2'],[w.x-0.62+i*0.52,w.y-0.5,1.07,0.2,0.1,0.03,'#fff2c2']);
  addVox(b,1,MAT.vox,true);
}
function buildSpikes(){ const b=[], m=mSpikeTile(); for(let y=0;y<H;y++) for(let x=0;x<W;x++) if(tiles[y*W+x]===SPIKE) put(b,m,x*8,y*8,0); addVox(b,S8,MAT.vox,true); }
function buildCoins(){
  coinPos=[]; coinIdx=new Map(); coinMesh=null;
  for(let y=0;y<H;y++) for(let x=0;x<W;x++) if(tiles[y*W+x]===COIN){ coinIdx.set(y*W+x,coinPos.length); coinPos.push({x:x+0.5,y:y+0.5,on:true}); }
  if(!coinPos.length) return;
  coinMesh=new T.InstancedMesh(geo('coin',mCoin,0.1),MAT.coin,coinPos.length); coinMesh.frustumCulled=false; coinMesh.castShadow=true; world.add(coinMesh);
}

/* ---------- water, lava and goo ---------- */
/* One shader draws them all, in the game's chunky pixels: dashes of light that drift along a surface, and a face that
   darkens with depth. Water is see-through, so a swimmer shows; lava and goo are solid and count as lights. */
function liquidMat(c,face){
  const clear=c.op<1, u=T.UniformsUtils.merge([T.UniformsLib.fog,{cA:{value:new T.Color(c.a)},cB:{value:new T.Color(c.b)},uOp:{value:clear?(face?c.op*0.6:c.op):(c.mask===undefined?1:c.mask)},uSurf:{value:0},uFlow:{value:c.flow||1}}]);
  u.uTime=uTime;
  const m=new T.ShaderMaterial({uniforms:u,fog:true,transparent:clear,depthWrite:!clear,defines:{FACE:face?1:0},
    vertexShader:`uniform float uTime; varying vec3 vW;
#include <fog_pars_vertex>
void main(){ vec3 p=position; vec4 w=modelMatrix*vec4(p,1.0);
#if FACE==0
  w.y+=(sin(w.x*1.4+uTime*1.7)+sin(w.x*0.63-uTime*1.2+w.z*0.8))*0.03;
#endif
  vW=w.xyz; vec4 mvPosition=viewMatrix*w; gl_Position=projectionMatrix*mvPosition;
#include <fog_vertex>
}`,
    fragmentShader:`uniform vec3 cA,cB; uniform float uTime,uOp,uSurf,uFlow; varying vec3 vW;
#include <fog_pars_fragment>
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
void main(){ vec3 c; float a=uOp;
#if FACE==0
  float row=floor(vW.z*8.0), x=vW.x*8.0+uTime*(0.5+hash(vec2(row,3.0)))*4.0*uFlow, h=hash(vec2(floor(x/7.0),row));
  float dash=step(0.84,h)*step(fract(x/7.0),0.3+0.4*fract(h*7.0));
  float x2=vW.x*8.0-uTime*2.2*uFlow, h2=hash(vec2(floor(x2/5.0),row+17.0)), dark=step(0.78,h2)*step(fract(x2/5.0),0.5);
  c=mix(cA,cB,dash*0.8); c=mix(c,cA*0.86,dark*(1.0-dash));
#else
  float d=clamp((uSurf-vW.y)/7.0,0.0,1.0), lip=step(uSurf-0.09,vW.y);
  float bx=floor(vW.x*8.0), by=vW.y*8.0-uTime*5.0*(0.6+hash(vec2(bx,1.0))), hb=hash(vec2(bx,floor(by/9.0)));
  float bub=step(0.965,hb)*step(fract(by/9.0),0.12);
  c=mix(cA,cA*0.5,d); c=mix(c,cB,max(lip,bub*0.7)); a=mix(a,1.0,lip*0.5);
#endif
  gl_FragColor=vec4(c,a);
#include <fog_fragment>
}`});
  m.userData.tmp=true; return m;
}
function addLiquid(c,x0,x1,y0,surf,zf,zb){
  const w=x1-x0, top=new T.Mesh(tmpGeo(new T.PlaneGeometry(w,zf-zb,Math.min(400,Math.ceil(w*2)),1)),liquidMat(c,0));
  top.geometry.rotateX(-Math.PI/2); top.position.set((x0+x1)/2,surf,(zf+zb)/2); top.renderOrder=2; world.add(top);
  const fm=liquidMat(c,1); fm.uniforms.uSurf.value=surf;
  const face=new T.Mesh(tmpGeo(new T.PlaneGeometry(w,surf-y0)),fm); face.position.set((x0+x1)/2,(surf+y0)/2,zf); face.renderOrder=3; world.add(face);
}
function buildLiquid(){
  const c=TH.liquid, back=TH.back||-2.5;
  /* what stands in the pits, level-wide; `far` lets a sea run on to the horizon behind the level */
  if(L.liquidY>0&&c.kind!=='void') addLiquid(c,-40,W+40,-6,L.liquidY,1.45,c.far?-(c.far):back+0.02);
  /* pools and flooded caves to swim in */
  for(const w of L.waters) if(!w.base) addLiquid(TH.pool||WATER_LOOK,w.x0,w.x1,w.y0,w.y1-0.14,1.47,back+0.02);
}
const WATER_LOOK={kind:'water',a:'#2f9bf0',b:'#bfeaff',op:0.62};

/* ---------- scenery ---------- */
function hill(list,cx,top,z,w,col,R,face,cap){
  const steps=4+((R()*3)|0), light=shade(col,1.07); let ww=w*0.34, y=top;
  for(let k=0;k<steps;k++){ const hh=1+R()*0.7; list.push([cx-ww/2,y-hh,z-2,ww,hh,4,cap&&k<2?cap:(k%2?col:light)]); y-=hh; ww+=w*0.66/steps; }
  list.push([cx-ww/2,y-34,z-2,ww,34,4,col]);
  if(face){ const d=shade(col,0.6); list.push([cx-1.15,top-1.5,z+2,0.45,0.9,0.12,d],[cx+0.7,top-1.5,z+2,0.45,0.9,0.12,d],[cx-0.5,top-2.3,z+2,1,0.25,0.12,d]); }
}
function cloudBoxes(R,tint){ const s=0.8+R()*0.9, w=tint||WHITE, l=tint?shade(tint,0.92):'#f1f9ff', d=tint?shade(tint,0.8):'#d4ecff';
  return [[0,0,0,5*s,1.3*s,2,w],[0.9*s,1.3*s,0,3*s,1.1*s,2,w],[3*s,1.3*s,0.2,1.4*s,0.6*s,1.6,w],[-0.8*s,0.2*s,0.3,1.2*s,0.7*s,1.4,l],[4.6*s,0.2*s,0.3,1.1*s,0.6*s,1.4,l],[0.4*s,-0.25*s,0.1,4.2*s,0.3*s,1.8,d]]; }
function pyramid(list,cx,base,z,w,n,col){ const hh=w*0.55/n; for(let k=0;k<n;k++){ const ww=w*(1-k/n); list.push([cx-ww/2,base+k*hh,z-ww/2,ww,hh,ww,k%2?col:shade(col,1.08)]); } }
/* a smiling sun or a moon, or with `ring` set, a ringed planet; it hangs far behind the level and follows the camera */
function skyDisc(d,ring,y,scale){
  const c=d[0], ray=d[1], ink=d[2];
  const s=[[-3,-4,0,6,8,1,c],[-4,-3,0,8,6,1,c],[-1.8,0.2,1,0.8,1.5,0.1,ink],[1,0.2,1,0.8,1.5,0.1,ink],[-1.6,-2,1,3.2,0.6,0.1,ink],[-2.2,-1.5,1,0.6,0.6,0.1,ink],[1.6,-1.5,1,0.6,0.6,0.1,ink]];
  if(ring) s.push([-7.5,-0.9,1.2,15,1.1,0.4,ring],[-6,-1.7,1.3,12,0.5,0.3,shade(ring,0.8)],[-3,2.2,1,6,0.7,0.1,shade(c,1.2)],[-3.6,-3.2,1,5,0.6,0.1,shade(c,0.82)]);
  else if(ray) s.push([-0.7,5,0.2,1.4,1.8,0.6,ray],[-0.7,-6.8,0.2,1.4,1.8,0.6,ray],[5,-0.7,0.2,1.8,1.4,0.6,ray],[-6.8,-0.7,0.2,1.8,1.4,0.6,ray],
    [3.8,3.8,0.2,1.3,1.3,0.6,ray],[-5.1,3.8,0.2,1.3,1.3,0.6,ray],[3.8,-5.1,0.2,1.3,1.3,0.6,ray],[-5.1,-5.1,0.2,1.3,1.3,0.6,ray]);
  sunMesh=new T.Mesh(tmpGeo(voxGeo(s,scale||1)),new T.MeshBasicMaterial({vertexColors:true,fog:false,opacity:0.72})); sunMesh.material.userData.tmp=true; sunMesh.position.set(0,y||13,-62); world.add(sunMesh);
}
/* Small things on the ground itself. For each stretch of open ground the theme's decor() is asked what stands there;
   D tells it what room there is. Bendy things go in S.flora, which sways. */
function laneDecor(S){
  const cpX=L.checkpoint?L.checkpoint.x:-99, hutX=L.goal?L.goal.x+HUT_DX+1.5:-99, back=TH.back||-2.5, R=S.R;
  const fringe=TH.fringe;
  for(let x=1;x<W-1;x++) for(let ty=1;ty<H-1;ty++){
    if(tiles[(ty-1)*W+x]!==GROUND||tiles[ty*W+x]===GROUND) continue;
    const free=h=>{ for(let k=0;k<h;k++){ const id=tileAt(x,ty+k); if(id!==AIR&&id!==COIN) return false; } return true; };
    if(!free(1)) continue;
    /* tall props keep clear of the checkpoint, whose flag stands further back than a canopy reaches, and of the hut
       after the flag, which they would poke out of */
    const D={free,x,ty,back,wet:!!waterAt(x+0.5,ty+0.5),open:Math.abs(x+0.5-cpX)>=4&&Math.abs(x+0.5-hutX)>=4.5&&!L.signs.some(s=>Math.abs(s.x-x-0.5)<1.5),
      /* a spot on the shelf behind the lane, between two depths given in tiles, and one on the lip in front of it */
      zb:(a,b)=>-(a+R()*(b-a))*8, zf:()=>(1.05+R()*0.35)*8, jx:()=>x*8+1+R()*6};
    if(TH.decor) TH.decor(S,D,R);
    if(fringe&&!D.wet&&R()<0.8){ const n=1+((R()*3)|0); for(let i=0;i<n;i++){ const fx_=x*8+R()*7, h=1+R()*1.6; S.flora.push([fx_,ty*8,11.2+R()*0.7,0.8,h,0.5,pick(R,fringe),ty*8,2.2]); } }
  }
}
function addMotes(col,n,size,fall,glow){
  const P=[], R=rng(77); for(let i=0;i<n;i++){ const x=R()*W, y=2.5+R()*(H-7.5), z=-4.2+R()*5.4; P.push(x,y,z); if(fall) P.push(x,y+(fall>0?8.5:-8.5),z); }
  const g=tmpGeo(new T.BufferGeometry()); g.setAttribute('position',new T.Float32BufferAttribute(P,3));
  const m=new T.PointsMaterial({color:col,size:size,sizeAttenuation:true,transparent:true,opacity:glow?0.95:0.85,depthWrite:false,blending:glow?T.AdditiveBlending:T.NormalBlending}); m.userData.tmp=true;
  motes=new T.Points(g,m); motes.userData.fall=fall||0; motes.frustumCulled=false; world.add(motes);
}
/* a cloud that drifts; far ones are soft lights, so they bloom a little against the sky */
function addCloud(x,y,z,R,tint,speed){
  const m=new T.Mesh(tmpGeo(voxGeo(cloudBoxes(R,tint),1)),MAT.soft); m.position.set(x,y,z); world.add(m); clouds.push({m,v:speed===undefined?0.25+R()*0.35:speed}); return m;
}
function buildScenery(){
  const R=rng(1000+G.levelIdx*77);
  const S={R,far:[],near:[],flora:[],glow:[],glowFar:[],soft:[],W,H,L,TH,hill,pyramid,skyDisc,addCloud,addMotes,put};
  sunMesh=null; motes=null; clouds=[]; critters=[]; lamps=[];
  if(TH.scenery) TH.scenery(S,R);
  laneDecor(S);
  addVox(S.far,1,MAT.vox,false);
  addVox(S.near,S8,MAT.vox,true);
  addVox(S.flora,S8,MAT.flora,true,true);
  addVox(S.glow,S8,MAT.glow,false);
  addVox(S.glowFar,1,MAT.glow,false);
  addVox(S.soft,1,MAT.soft,false);
}
const HUT_DX=5, HUT_Z=-12; /* the hut after the flag: how many tiles past the pole it starts, and its depth in 1/8 tiles */
function buildGoal(){
  flagMesh=null; if(!L.goal) return;
  const gx=L.goal.x, gy=L.goal.y*8, b=[];
  for(let i=0;i<18;i++) b.push([gx*8+3.4,gy+8+i*4,-0.6,1.2,4,1.2,i%2?WHITE:'#ff4f7b']);
  put(b,mHut(),(gx+HUT_DX)*8,gy,HUT_Z);
  addVox(b,S8,MAT.vox,true);
  addVox([[gx*8+2.4,gy+80,-1.6,3.2,3.2,3.2,'#ffe14d'],[gx*8+3,gy+83.2,-1,2,1,2,'#fff3a0']],S8,MAT.glow,false);
  flagMesh=vmesh('flag',()=>[[-12,0,-0.3,12,8,0.6,'#2fd6c3'],[-8.6,2,0.3,5,4,0.2,WHITE],[-7,3,0.5,2,2,0.15,INK],[-8.6,2,-0.5,5,4,0.2,WHITE]]);
  flagMesh.position.set(gx+0.43,L.goal.y+8.8,0); world.add(flagMesh);
}
const CP_Z=-1.4; /* how far behind the walkway the checkpoint flag stands */
function buildCheckpoint(){
  cpFlag=null; if(!L.checkpoint) return;
  const c=L.checkpoint;
  const post=vmesh('cppost',()=>[[-0.6,0,-0.6,1.2,15,1.2,'#fff2c2'],[-1.2,15,-1.2,2.4,2,2.4,'#ffc928'],[-2,0,-2,4,1,4,'#b9773f']]); post.position.set(c.x,c.y,CP_Z); world.add(post);
  const m=new T.MeshLambertMaterial({vertexColors:true,color:G.cp?0x2fd6c3:0xb9b4c6}); m.userData.tmp=true;
  cpFlag=new T.Mesh(geo('cpflag',()=>[[0.6,9,-0.3,7,5,0.6,WHITE],[2.6,10.4,0.3,3,2.4,0.15,INK],[3.6,11,0.45,1,1,0.1,WHITE]]),m); cpFlag.castShadow=true; cpFlag.position.copy(post.position); world.add(cpFlag);
}
/* the things a level has that only stand there: hint signs, launch pods, vents and fans */
function buildFixtures(){
  for(const s of L.signs){ const m=vmesh('sign',mSign); m.position.set(s.x,s.y,-0.75); world.add(m); signs.push({x:s.x,y:s.y,text:s.text,mesh:m}); }
  for(const d of L.pods){ const m=vmesh('pod',mPod); m.position.set(d.x,d.y,0); m.rotation.z=-d.ang; world.add(m); pods.push({x:d.x,y:d.y,ang:d.ang,power:d.power,t:0,mesh:m}); }
  for(const d of L.jets){ const v=vmesh('vent',mVent); v.position.set(d.x,d.y,0); world.add(v);
    const f=new T.Mesh(partGeo,emberMat[0]); f.position.set(d.x,d.y,0); world.add(f); const f2=new T.Mesh(partGeo,emberMat[1]); world.add(f2);
    jets.push({x:d.x,y:d.y,len:d.len,period:d.period,t:d.phase,on:0,mesh:f,core:f2}); }
  for(const d of L.winds){ winds.push(Object.assign({t:0},d)); if(d.ay>0&&solidAt(Math.floor((d.x0+d.x1)/2),Math.floor(d.y0)-1)){ const m=vmesh('fan',mFan); m.position.set((d.x0+d.x1)/2,d.y0,0); world.add(m); } }
  for(const d of L.cannons) cannons.push({x:d.x,y:d.y,period:d.period,t:d.phase});
}
function buildShards(){
  shards=[];
  L.shards.forEach((d,i)=>{
    const had=shardHad(G.levelIdx,i), m=new T.Mesh(geo('shard',mShard),had?shardGhostMat:MAT.shard); m.position.set(d.x,d.y,0); m.castShadow=!had; world.add(m);
    shards.push({x:d.x,y:d.y,i,had,got:false,mesh:m});
  });
}
const shardGhostMat=new T.MeshBasicMaterial({color:0x9fc4ee,transparent:true,opacity:0.3,depthWrite:false});

/* ---------- pooled effects ---------- */
const PARTS=[], partMats={};
const pmatOf=(col,glow)=>partMats[col+(glow?'g':'')]||(partMats[col+(glow?'g':'')]=glow?new T.MeshBasicMaterial({color:col,opacity:0}):new T.MeshLambertMaterial({color:col}));
function spawnPart(x,y,z,col,vx,vy,vz,life,size,grav,glow){
  let p=null; for(const q of PARTS) if(q.life<=0){ p=q; break; }
  if(!p){ if(PARTS.length>=220) return; p={mesh:new T.Mesh(partGeo,pmatOf(col,glow)),life:0}; fx.add(p.mesh); PARTS.push(p); }
  p.mesh.material=pmatOf(col,glow); p.mesh.visible=true; p.mesh.position.set(x,y,z); p.mesh.scale.setScalar(size);
  p.vx=vx; p.vy=vy; p.vz=vz; p.life=life; p.max=life; p.size=size; p.grav=grav===undefined?30:grav;
}
function burst(x,y,col,n,spd,size,life,glow){
  for(let i=0;i<n;i++){ const a=Math.random()*6.283, s=(spd||5)*(0.4+Math.random()*0.6);
    spawnPart(x,y,(Math.random()-0.5)*0.6,col,Math.cos(a)*s,Math.abs(Math.sin(a))*s+1.5,(Math.random()-0.5)*3,(life||0.5)*(0.6+Math.random()*0.6),(size||0.14)*(0.7+Math.random()*0.6),undefined,glow); }
}
/* a low puff of dust that drifts and settles: landing, skidding, sliding down a wall */
function dust(x,y,n,dir,col){
  for(let i=0;i<n;i++) spawnPart(x+(Math.random()-0.5)*0.4,y+0.08+Math.random()*0.1,0.3+Math.random()*0.5,col||TH.dust||'#ffffff',(dir||0)*(1+Math.random()*1.5)+(Math.random()-0.5)*1.6,0.6+Math.random()*1.4,(Math.random()-0.5)*1.2,0.28+Math.random()*0.22,0.1+Math.random()*0.09,4);
}
/* a spray thrown up and out, for water and for a ground pound */
function spray(x,y,col,n,spd,glow){
  for(let i=0;i<n;i++){ const a=(Math.random()-0.5)*2.2; spawnPart(x+(Math.random()-0.5)*0.5,y,(Math.random()-0.5)*0.8,col,Math.sin(a)*spd*(0.4+Math.random()*0.6),Math.cos(a)*spd*(0.5+Math.random()*0.7),(Math.random()-0.5)*2,0.45+Math.random()*0.35,0.09+Math.random()*0.09,22,glow); }
}
/* a ring that spreads along the ground */
const RINGS=[], ringGeo=new T.RingGeometry(0.82,1,28);
function ring(x,y,col,size,life){
  let r=null; for(const q of RINGS) if(q.t>=q.life){ r=q; break; }
  if(!r){ if(RINGS.length>=8) return; const m=new T.Mesh(ringGeo,new T.MeshBasicMaterial({transparent:true,depthWrite:false,side:T.DoubleSide})); m.rotation.x=-Math.PI/2; fx.add(m); r={mesh:m,t:1,life:1}; RINGS.push(r); }
  r.mesh.material.color.set(col); r.mesh.position.set(x,y+0.06,0.2); r.mesh.visible=true; r.t=0; r.life=life||0.4; r.size=size||2.4;
}
const POPS=[], popTexCache={};
function popTex(txt,col){
  const k=txt+col; if(popTexCache[k]) return popTexCache[k];
  const c=document.createElement('canvas'); c.width=256; c.height=64; const g=c.getContext('2d');
  g.font='700 46px "Jersey 20","Pixelify Sans","Trebuchet MS",sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.lineJoin='round';
  g.lineWidth=10; g.strokeStyle=INK; g.strokeText(txt,128,34); g.fillStyle=col; g.fillText(txt,128,34);
  const t=new T.CanvasTexture(c); return popTexCache[k]=t;
}
function popup(x,y,txt,col){
  let s=null; for(const q of POPS) if(q.life<=0){ s=q; break; }
  if(!s){ if(POPS.length>=14) return; const sp=new T.Sprite(new T.SpriteMaterial({transparent:true,depthTest:false,depthWrite:false})); sp.renderOrder=10; fx.add(sp); s={sp,life:0}; POPS.push(s); }
  s.sp.material.map=popTex(txt,col||WHITE); s.sp.material.needsUpdate=true; s.sp.visible=true; s.sp.position.set(x,y,1.3); s.sp.scale.set(3.4,0.85,1); s.life=0.9;
}
const CPOPS=[];
function coinPop(x,y){
  let c=null; for(const q of CPOPS) if(q.t<0){ c=q; break; }
  if(!c){ if(CPOPS.length>=14) return; c={mesh:new T.Mesh(geo('coin',mCoin,0.1),MAT.coin),t:-1}; fx.add(c.mesh); CPOPS.push(c); }
  c.t=0; c.x=x; c.y=y; c.mesh.visible=true;
}
function shake(a){ shakeT=0.22; shakeA=Math.max(a,shakeT>0?shakeA*0.5:0); }
function flash(a){ POST.flash=Math.max(POST.flash,reduceMotion?a*0.3:a); }

/* ---------- Blorp ---------- */
const pmat=new T.MeshLambertMaterial({vertexColors:true});
function makeBlorp(form){
  const c=blorpCols(form), big=form>0, g=new T.Group(), part=geo_=>{ const m=new T.Mesh(geo_,pmat); m.castShadow=true; return m; };
  const body=part(voxGeo(big?mBlorpBig(c,form):mBlorpSmall(c)));
  const footG=voxGeo(big?[[-1.3,-1.5,-1.5,2.6,1.5,4.2,c.f]]:[[-1,-1,-1.2,2,1,3.2,c.f]]);
  const armG=voxGeo(big?[[-0.6,-3.4,-0.6,1.2,3.6,1.2,c.d]]:[[-0.5,-2,-0.5,1,2.2,1,c.d]]);
  /* an eyelid, shown for a moment now and then */
  const lid=part(voxGeo(big?[[-2,6.3,3.05,4,3.4,0.7,c.b],[-2,6.3,3.75,4,0.5,0.1,c.d]]:[[-1.5,3.4,2.55,3,2.6,0.6,c.b],[-1.5,3.4,3.15,3,0.4,0.1,c.d]])); lid.visible=false;
  const fxo=big?1.9:1.6, fy=big?1.5:1, ax=big?4.1:3.5, ay=big?7.6:4.2;
  const fL=part(footG), fR=part(footG), aL=part(armG), aR=part(armG);
  fL.position.set(-fxo*S8,fy*S8,0); fR.position.set(fxo*S8,fy*S8,0); aL.position.set(-ax*S8,ay*S8,0.3*S8); aR.position.set(ax*S8,ay*S8,0.3*S8);
  g.add(body,fL,fR,aL,aR); body.add(lid); g.userData={body,fL,fR,aL,aR,lid};
  if(form===3){ const wL=part(voxGeo(mBlorpWing(-1))), wR=part(voxGeo(mBlorpWing(1))); wL.position.set(-2.4*S8,8*S8,-3.2*S8); wR.position.set(2.4*S8,8*S8,-3.2*S8); body.add(wL,wR); g.userData.wL=wL; g.userData.wR=wR; }
  return g;
}
const proot=new T.Group(), forms=[makeBlorp(0),makeBlorp(1),makeBlorp(2),makeBlorp(3)];
forms.forEach(f=>proot.add(f)); scene.add(proot);
const shadow=new T.Mesh(new T.CircleGeometry(0.4,14),new T.MeshBasicMaterial({color:0x1c1233,transparent:true,opacity:0.22,depthWrite:false}));
shadow.rotation.x=-Math.PI/2; scene.add(shadow);

/* ---------- camera ---------- */
function camTargetX(){ const lo=room.x0+viewHalfW-0.3, hi=room.x1-viewHalfW+0.3; return lo<hi?clamp(player.x+camLead,lo,hi):(room.x0+room.x1)/2; }
function updateCamera(dt,snap){
  const p=player;
  if(!p.dead){
    camLead+=((p.face*1.5+clamp(p.vx*0.22,-2,2))-camLead)*Math.min(1,dt*2.2);
    if(p.onGround||p.swim||p.wall||p.y<focusY) focusY=p.y; else if(p.y>focusY+4.5) focusY=p.y-4.5;
  }
  const lo=room.y0+camBaseY, hi=Math.max(lo,room.y1-V/2+1);
  const tx=camTargetX(), ty=clamp(lo+Math.max(0,focusY-room.y0-5)*0.92,lo,hi);
  if(snap){ camX=tx; camY=ty; } else { camX+=(tx-camX)*Math.min(1,dt*6); camY+=(ty-camY)*Math.min(1,dt*3.2); }
  let sx=0,sy=0;
  if(shakeT>0){ shakeT-=dt; if(!reduceMotion){ sx=(Math.random()-0.5)*shakeA; sy=(Math.random()-0.5)*shakeA; } }
  camera.position.set(camX+sx,camY+camDist*Math.sin(0.19)+sy,camDist*Math.cos(0.19));
  camera.lookAt(camX+sx,camY+sy,0);
  placeSun(camX,camY-2,-2);
  if(sunMesh){ sunMesh.position.x=camX+viewHalfW*2.2*(TH.discX===undefined?1:TH.discX); const s=screenOf(sunMesh.position.x,sunMesh.position.y,sunMesh.position.z); skyU.sunPos.value.set(s[0],s[1]); }
  skyU.uScroll.value.set(camX*0.0016,(camY-camBaseY)*0.004);
}
function applyTheme(){
  const s=TH.sky; skyU.cTop.value.set(s[0]); skyU.cMid.value.set(s[1]); skyU.cBot.value.set(s[2]); skyU.uMid.value=TH.skyMid||0.5;
  skyU.sunCol.value.set(TH.glowCol||0xfff3c0); skyU.sunGlow.value=TH.sunGlow===undefined?1:TH.sunGlow; skyU.uStars.value=TH.stars||0; skyU.sunPos.value.set(2,2);
  skyU.uBand.value=TH.band?1:0; if(TH.band) skyU.cBand.value.set(TH.band);
  stage.style.background=s[1];
  scene.fog=new T.Fog(TH.fog,camDist+TH.fogNear,camDist+TH.fogFar);
  hemi.color.set(TH.hemiSky); hemi.groundColor.set(TH.hemiGround); hemi.intensity=TH.hemiI; sun.color.set(TH.sunCol); sun.intensity=TH.sunI;
  const d=TH.sunDir||[-0.42,0.78,0.52]; sunDir.set(d[0],d[1],d[2]).normalize();
  POST.bloom=TH.bloom===undefined?0.95:TH.bloom; POST.hi=TH.hi===undefined?0.2:TH.hi; POST.sat=TH.sat||1.06; POST.con=TH.con||1.03; POST.vig=TH.vig===undefined?0.42:TH.vig; POST.tilt_=0; POST.tint.setRGB(1,1,1);
}
