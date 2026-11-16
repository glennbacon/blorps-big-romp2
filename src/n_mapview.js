/* ================= the world map: drawing it ================= */
/* Everything here is looks: f_map.js decides the island, the route and what is open. The island is built the first
   time it is shown and then kept. A level and the map never show together (see mapMode in h_flow.js). */
const MAP_SEA_Y=0.2, MAP_TILE_H=0.07, MAP_PITCH=50*Math.PI/180, MAP_BLORP=1.15;
const mapRoot=new T.Group(); mapRoot.visible=false; scene.add(mapRoot);
/* the ground of each world: two cap colours laid as a chequer, and two for the earth below */
const MAP_LOOK=[
  {cap:['#62d456','#55c94f'],body:['#b9773f','#a5642f']},
  {cap:['#6c60b8','#5f53aa'],body:['#4a3f8f','#41377f']},
  {cap:['#9a98b3','#8d8ba6'],body:['#6f6d8a','#62607c']},
  {cap:['#f4fbff','#e6f2ff'],body:['#6fa0dc','#5f8fce']},
  {cap:['#f2c868','#e9bb58'],body:['#d18f45','#bd7c36']},
  {cap:['#6f7fb8','#6272ab'],body:['#434f85','#3a4578']}];
const MAP_POOL=[]; MAP_POOL[MK_LAVA]=['#ff6a1f','#ff8a2a']; MAP_POOL[MK_GOO]=['#9be82e','#aef04a']; MAP_POOL[MK_POND]=['#3fb4ff','#5cc2ff'];
let mapBuilt=false, mapSeaTex=null, mapTiles=null, mapMarks=[], mapClouds=[], mapCamX=0, mapCamY=0, mapCamZ=0, mapNoteT=0, mapIdleT=0, mapFaceY=0, mapZoom=1;

/* add a model (in 1/8 units, as the level props are) to a list of boxes in world units, at a size */
function mapPut(list,model,x,y,z,k){ k=(k||1)*S8; for(const b of model) list.push([x+b[0]*k,y+b[1]*k,z+b[2]*k,b[3]*k,b[4]*k,b[5]*k,b[6]]); }

function mapViewBuild(){
  mapBuilt=true;
  const I=ISLE, R=rng(2026), land=[], glow=[], dark=[], keep=new Set();
  const inMap=(x,z)=>x>=0&&z>=0&&x<MAP_W&&z<MAP_D, at=(x,z)=>z*MAP_W+x;
  const kindAt=(x,z)=>inMap(x,z)?I.kind[at(x,z)]:MK_SEA;
  const around=(x,z,r,fn)=>{ for(let dz=-r;dz<=r;dz++) for(let dx=-r;dx<=r;dx++) if((dx||dz)&&fn(x+dx,z+dz)) return true; return false; };
  /* stairs of light lead to floating ground; every other gap is crossed by planks */
  const beam=new Set(); MAPSEGS.forEach((seg,i)=>{ const n=MAPNODES[i+1]; if(I.base[at(n.x,n.z)]) for(const c of seg) beam.add(at(c.x,c.z)); });

  /* ---- the ground, the pools, the bridges and the shallows ---- */
  for(let z=0;z<MAP_D;z++) for(let x=0;x<MAP_W;x++){
    const k=at(x,z), kd=I.kind[k], odd=(x+z)&1, j=mapJit(x+7,z+3);
    if(kd===MK_SEA){
      /* a pale shelf where the sea meets ground that stands in it */
      if(around(x,z,1,(a,b)=>kindAt(a,b)!==MK_SEA&&!I.base[at(a,b)])) glow.push([x,MAP_SEA_Y-0.3,z,1,0.325,1,odd?'#7fd6ff':'#72ccfb']);
    } else {
      const w=I.world[k], look=MAP_LOOK[w], top=I.h[k]*MAP_STEP, y0=I.base[k]?I.base[k]*MAP_STEP:-0.2;
      /* higher ground is a little brighter, which is most of what makes a hill read as a hill from above */
      const f=0.93+j*0.07+clamp((I.h[k]-2)*0.024,-0.05,0.13);
      let cap=look.cap[odd], body=look.body[odd];
      if(w===0&&I.h[k]<=2&&around(x,z,1,(a,b)=>kindAt(a,b)===MK_SEA)){ cap=odd?'#ffe9a8':'#f7dc8f'; body='#e3c070'; keep.add(k); } /* the meadow's sandy shore */
      else if(w===1&&I.h[k]<=1) cap=odd?'#35c9a8':'#2cb898';                                                                           /* moss on the grotto's floor */
      else if(w===3) cap=I.h[k]>=8?(odd?'#ffffff':'#f0f7ff'):I.h[k]>=5?(odd?'#e2eefc':'#d3e4f8'):(odd?'#b9d3f2':'#abc8ec');           /* bare blue rock below the snow line */
      if(kd===MK_LAND) land.push([x,y0,z,1,top-0.14-y0,1,shade(body,f)],[x,top-0.14,z,1,0.14,1,shade(cap,f)]);
      else { const c=MAP_POOL[kd]; land.push([x,y0,z,1,top-0.3-y0,1,body]); glow.push([x,top-0.3,z,1,0.1,1,c[odd]]);
        if(j<0.35) glow.push([x+0.15+j,top-0.2,z+0.2+j,0.2,0.04,0.2,shade(c[1],1.25)]); }
      if(I.base[k]){ /* floating ground tapers underneath, and throws a shadow on the sea */
        let deep=0; while(deep<3&&!around(x,z,deep+1,(a,b)=>!inMap(a,b)||!I.base[at(a,b)])) deep++;
        if(deep) land.push([x+0.04,y0-deep*0.6,z+0.04,0.92,deep*0.6,0.92,shade('#2c3566',1-deep*0.1)]);
        if(deep===3&&j<0.5) glow.push([x+0.35,y0-2.3,z+0.35,0.3,0.5,0.3,'#3ff0ff']);
        dark.push([x,0,z,1,0.02,1,INK]); }
    }
    if(I.deck[k]){ const y=I.deck[k]*MAP_STEP;
      if(beam.has(k)) glow.push([x+0.08,y-0.12,z+0.08,0.84,0.12,0.84,'#3ff0ff'],[x+0.22,y,z+0.22,0.56,0.02,0.56,'#bffcff']);
      else { for(let i=0;i<3;i++) land.push([x+0.03,y-0.1,z+0.03+i*0.32,0.94,0.1,0.3,i%2?'#a87646':'#b98a5a']);
        const foot=kd===MK_SEA?MAP_SEA_Y-0.25:I.h[k]*MAP_STEP-0.3;
        for(const px of [0.05,0.83]) land.push([x+px,foot,z+0.44,0.12,y-0.1-foot,0.12,'#7d5630']); }
    }
  }

  /* ---- landmarks, placed by hand ---- */
  const hAt=(x,z)=>I.h[at(Math.floor(x),Math.floor(z))]*MAP_STEP;
  const hold=(x0,z0,x1,z1)=>{ for(let z=z0;z<=z1;z++) for(let x=x0;x<=x1;x++) keep.add(at(x,z)); };
  mapPut(land,mHut(),1.4,hAt(2,23),23.5,0.34); hold(1,22,2,24);                                   /* Blorp's hut, by the first marker */
  for(const q of [[21.5,17.5,2.6,'#39f0d0'],[24.4,16.6,3.2,'#ff7ad9'],[26.6,17.6,2.3,'#ffe14d'],[19.6,25.4,1.6,'#ff7ad9']]){
    mapPut(land,dShroom(q[3]),q[0],hAt(q[0],q[1]),q[1],q[2]); const k=q[2]*S8, y=hAt(q[0],q[1]);
    glow.push([q[0]-1.2*k,y+3.2*k,q[1]+1.95*k,0.9*k,0.7*k,0.1*k,WHITE],[q[0]+0.5*k,y+2.4*k,q[1]+1.95*k,0.8*k,0.6*k,0.1*k,WHITE],[q[0]-0.5*k,y+4*k,q[1]-0.4*k,0.9*k,0.1*k,0.9*k,WHITE]); hold(Math.floor(q[0]),Math.floor(q[1]),Math.floor(q[0]),Math.floor(q[1])); } /* the grotto's great mushrooms */
  for(const q of [[26.5,5.6,2.6,5],[19.5,11.2,1.9,4],[22.4,3.4,1.5,4]]){ pyramid(land,q[0],hAt(q[0],q[1]),q[1],q[2],q[3],'#e2ad5c');
    hold(Math.floor(q[0]-q[2]/2),Math.floor(q[1]-q[2]/2),Math.floor(q[0]+q[2]/2),Math.floor(q[1]+q[2]/2)); }                               /* the dunes' pyramids */

  /* ---- small props, scattered ---- */
  const onRoute=(x,z)=>inMap(x,z)&&I.route[at(x,z)]>=0;
  /* a tall prop hides whatever is just north of it, so none may stand south of the path */
  const hides=(x,z)=>{ for(let d=1;d<=3;d++) for(let dx=-1;dx<=1;dx++) if(onRoute(x+dx,z-d)) return true; return false; };
  for(let z=1;z<MAP_D-1;z++) for(let x=1;x<MAP_W-1;x++){
    const k=at(x,z); if(I.kind[k]!==MK_LAND||onRoute(x,z)||keep.has(k)||MAPNODES.some(n=>Math.abs(n.x-x)<=1&&Math.abs(n.z-z)<=1)) continue;
    const w=I.world[k], y=I.h[k]*MAP_STEP, r=R(), px=x+0.3+R()*0.4, pz=z+0.3+R()*0.4, tall=!hides(x,z);
    if(w===0){
      if(r<0.09&&tall) mapPut(land,dTree(pick(R,CANDY)),px,y,pz,0.5);
      else if(r<0.18) mapPut(land,dGumdrop(pick(R,CANDY)),px,y,pz,0.8);
      else if(r<0.42) mapPut(land,dFlower(pick(R,['#ff8fc7','#ffffff','#ffe14d','#b58cff'])),px,y,pz,0.7);
      else if(r<0.6) mapPut(land,dTuft('#4cc04a'),px,y,pz,0.8);
    } else if(w===1){
      if(r<0.1&&tall) mapPut(glow,dCrystal(pick(R,['#6ff0ff','#ff7ad9','#b6ff6a'])),px,y,pz,0.9);
      else if(r<0.3){ mapPut(land,dShroom(pick(R,['#39f0d0','#ff7ad9','#ffe14d'])),px,y,pz,0.9); glow.push([px-0.05,y+0.45,pz-0.05,0.1,0.02,0.1,WHITE]); }
      else if(r<0.44) mapPut(land,dRock('#7a6fc8'),px,y,pz,0.9);
    } else if(w===2){
      if(r<0.1){ mapPut(land,dCandle(),px,y,pz,0.9); glow.push([px-0.05,y+0.27,pz-0.05,0.1,0.14,0.1,'#ffd23e']); }
      else if(r<0.22) mapPut(land,dBones(),px,y,pz,0.8);
      else if(r<0.4) mapPut(land,dRock('#62607c'),px,y,pz,0.9);
    } else if(w===3){
      if(r<0.13&&tall) mapPut(land,dPine(),px,y,pz,0.5);
      else if(r<0.17&&tall) mapPut(land,dSnowman(),px,y,pz,0.75);
      else if(r<0.36) mapPut(land,dRock(pick(R,['#ffffff','#d7eaff'])),px,y,pz,0.9);
      else if(r<0.44) mapPut(land,dCrystal('#9fdcff'),px,y,pz,0.6);
    } else if(w===4){
      if(r<0.1&&tall) mapPut(land,dCactus(pick(R,['#3fbf6a','#59c98a'])),px,y,pz,0.6);
      else if(r<0.15) mapPut(land,dBones(),px,y,pz,0.8);
      else if(r<0.3) mapPut(land,dRock(pick(R,['#d9a45e','#c98f4a'])),px,y,pz,0.9);
      else if(r<0.46) mapPut(land,dTuft('#c9b24a'),px,y,pz,0.8);
    } else {
      if(r<0.09&&tall){ mapPut(land,dLamp(),px,y,pz,0.7); glow.push([px-0.1,y+0.84,pz-0.1,0.2,0.2,0.2,pick(R,['#3ff0ff','#ff7ad9','#ffe14d'])]); }
      else if(r<0.19) mapPut(land,dCrate(pick(R,['#8fa0e6','#b04fd6','#ffb02e'])),px,y,pz,0.6);
      else if(r<0.25&&tall) mapPut(land,dDish(),px,y,pz,0.8);
      else if(r<0.38) mapPut(glow,dCrystal(pick(R,['#b58cff','#3ff0ff'])),px,y,pz,0.6);
    }
  }
  mapRoot.add(new T.Mesh(voxGeo(land,1),MAT.vox),new T.Mesh(voxGeo(glow,1),MAT.glow));
  const sh=new T.Mesh(voxGeo(dark,1),new T.MeshBasicMaterial({color:0x0b2f66,transparent:true,opacity:0.3,depthWrite:false})); sh.position.y=MAP_SEA_Y+0.04; mapRoot.add(sh);

  /* ---- the sea ---- */
  mapSeaTex=mkTex(g=>{ PX(g,'#2f9bf0',0,0,16,16); const S=rng(5); for(let i=0;i<9;i++) PX(g,'#4fb0fa',(S()*13)|0,(S()*16)|0,3,1); for(let i=0;i<8;i++) PX(g,'#2a8fe6',(S()*14)|0,(S()*16)|0,2,1); });
  mapSeaTex.repeat.set(100,100);
  const sea=new T.Mesh(new T.PlaneGeometry(400,400),new T.MeshBasicMaterial({map:mapSeaTex})); sea.rotation.x=-Math.PI/2; sea.position.set(MAP_W/2,MAP_SEA_Y,MAP_D/2); mapRoot.add(sea);

  /* ---- a few clouds, low over open water where they cover nothing ---- */
  for(const q of [[12.5,2.4,13.6,0.34],[30,2.8,14.6,0.3],[45.5,2.6,14.2,0.26],[14,3,0.8,0.3],[29.5,3,0.4,0.34]]){
    const b=[]; cloud(b,-2.5,0,-1,R); const m=new T.Mesh(voxGeo(b,q[3]),MAT.glow); m.position.set(q[0],q[1],q[2]); m.userData.x=q[0]; mapRoot.add(m); mapClouds.push(m); }

  /* ---- the markers: each has a locked, an open and a cleared look, and the boss levels a castle or tower behind ---- */
  MAPNODES.forEach((n,i)=>{
    const g=new T.Group(), m={g,lock:vmesh('mapLock',mMapLock),open:vmesh('mapOpen',mMapOpen),clear:vmesh('mapClear',mMapClear)};
    g.position.set(n.x+0.5,n.h*MAP_STEP,n.z+0.5); g.add(m.lock,m.open,m.clear);
    if(LEVELS[i]&&LEVELS[i]().boss){ const last=i===LEVELS.length-1;
      g.add(vmesh(last?'mapTower':'mapCastle',last?mMapTower:mMapCastle),vmesh(last?'mapTowerGlow':'mapCastleGlow',last?mMapTowerGlow:mMapCastleGlow,MAT.glow)); }
    mapRoot.add(g); mapMarks.push(m);
  });

  /* ---- the path: one pale tile, edged in brown so it shows on snow and sand alike, on every cell between two markers ---- */
  let n=0; for(const seg of MAPSEGS) n+=seg.length-2;
  mapTiles=new T.InstancedMesh(geo('mapTile',mMapTile),MAT.vox,n); mapTiles.frustumCulled=false; mapRoot.add(mapTiles);
}

/* Make the path and the markers match what is open, and how much of a new stretch has appeared so far. */
function mapViewSync(){
  if(!mapBuilt) return;
  let i=0;
  MAPSEGS.forEach((seg,s)=>{ const shown=mapSegShown(s);
    for(let k=1;k<seg.length-1;k++,i++){ const c=seg[k];
      _d.position.set(c.x+0.5,c.h*MAP_STEP,c.z+0.5); _d.rotation.set(0,0,0); _d.scale.setScalar(k<shown?1:0.0001); _d.updateMatrix(); mapTiles.setMatrixAt(i,_d.matrix); } });
  mapTiles.instanceMatrix.needsUpdate=true;
  mapMarks.forEach((m,k)=>{ const st=mapMarkState(k); m.lock.visible=st===0; m.open.visible=st===1; m.clear.visible=st===2; });
}
/* a puff where a tile of new path has just appeared, and a bigger one when its marker opens */
function mapViewPop(seg,k,done){
  const c=MAPSEGS[seg][k-1], n=done?16:4;
  for(let i=0;i<n;i++){ const a=Math.random()*6.283, v=done?2.6:1.3;
    spawnPart(c.x+0.5,c.h*MAP_STEP+0.15,c.z+0.5,done?pick(Math.random,['#ffe14d','#ff4f7b','#ffffff']):'#fff2c2',Math.cos(a)*v,2.5+Math.random()*(done?4:1.5),Math.sin(a)*v,0.5+Math.random()*0.3,done?0.13:0.08,14); }
}
function mapViewShow(on){
  if(on&&!mapBuilt) mapViewBuild();
  mapRoot.visible=on; proot.scale.setScalar(on?MAP_BLORP:1); shadow.scale.setScalar(1);
  if(!on) return;
  stage.style.background='#2f9bf0'; skyU.cTop.value.set(0x2f9bf0); skyU.cMid.value.set(0x2f9bf0); skyU.cBot.value.set(0x2f9bf0); skyU.sunGlow.value=0; skyU.uStars.value=0; skyU.uBand.value=0;
  scene.fog=new T.Fog(0x8fd2ff,60,160); sunDir.set(-0.42,0.78,0.52).normalize(); POST.bloom=0.8; POST.hi=0.15; POST.tilt_=0.9; POST.tiltY=0.5; POST.vig=0.5;
  hemi.color.set(0xffffff); hemi.groundColor.set(0xa9c2d8); hemi.intensity=0.72; sun.color.set(0xfff4dc); sun.intensity=0.62;
  proot.visible=true; mapFaceY=0; mapIdleT=0; pmat.emissive.setRGB(0,0,0);
  mapCamera(0,true);
}
/* The camera looks down on Blorp from the south and follows him, stopping short of showing nothing but sea. */
function mapCamera(dt,snap){
  /* vt is how much of the world fits top to bottom at Blorp's distance. A level's view grows on a narrow screen to
     keep its width; here it is capped, or Blorp would be a speck on a phone. mapZoom is for looking the island over
     from the console. */
  const s=MAPST, vt=Math.min(V*0.95,14)*mapZoom, hw=vt*camera.aspect/2, hd=vt/Math.sin(MAP_PITCH)/2, d=vt/2/Math.tan(15*Math.PI/180);
  const lim=(v,lo,hi)=>lo<hi?clamp(v,lo,hi):(lo+hi)/2;
  const tx=lim(s.x,hw-3,MAP_W-hw+3), ty=s.y, tz=lim(s.z,hd-4.5,MAP_D-hd+3), e=snap?1:Math.min(1,dt*4.5);
  mapCamX+=(tx-mapCamX)*e; mapCamY+=(ty-mapCamY)*e; mapCamZ+=(tz-mapCamZ)*e;
  camera.position.set(mapCamX,mapCamY+d*Math.sin(MAP_PITCH),mapCamZ+d*Math.cos(MAP_PITCH)); camera.lookAt(mapCamX,mapCamY,mapCamZ);
  placeSun(mapCamX,mapCamY,mapCamZ);
  if(scene.fog){ scene.fog.near=d+16; scene.fog.far=d+95; }
}
const MAP_TURN={N:Math.PI,E:Math.PI/2,S:0,W:-Math.PI/2};
function mapViewFrame(dt,time){
  const s=MAPST, w=s.walk, g=forms[player.form], u=g.userData, hop=w?Math.sin(Math.PI*clamp(w.t,0,1)):0;
  for(let i=0;i<4;i++) forms[i].visible=i===player.form;
  proot.position.set(s.x,s.y+MAP_TILE_H+hop*0.24,s.z);
  /* walking, he faces the way he is going; standing, he turns to the camera, and after a while he waves */
  let turn=(w?MAP_TURN[s.face]:0)-mapFaceY; turn-=Math.round(turn/6.2832)*6.2832; mapFaceY+=turn*Math.min(1,dt*16);
  proot.rotation.set(0,mapFaceY,0);
  mapIdleT=w?0:mapIdleT+dt;
  const wave=mapIdleT>2.5?2.3+Math.sin(time*9)*0.4:0;
  u.fL.rotation.x=hop*0.75; u.fR.rotation.x=-hop*0.45; u.aL.rotation.x=0; u.aR.rotation.x=0; u.aL.rotation.z=-hop*2; u.aR.rotation.z=hop*2||wave; u.body.position.y=0;
  const st=w?1+hop*0.08:1+Math.sin(time*3)*0.015, inv=1/Math.sqrt(st); g.scale.set(inv,st,inv);
  shadow.visible=true; shadow.position.set(s.x,s.y+MAP_TILE_H+0.02,s.z); shadow.scale.setScalar(MAP_BLORP*(1-hop*0.35));
  mapCamera(dt,false);
  for(const m of mapMarks) if(m.open.visible){ const k=1+Math.sin(time*5)*0.07; m.open.scale.set(k,1,k); m.open.position.y=Math.abs(Math.sin(time*2.5))*0.05; }
  mapClouds.forEach((c,i)=>{ c.position.x=c.userData.x+Math.sin(time*0.17+i*1.7)*0.9; });
  if(mapSeaTex) mapSeaTex.offset.set(time*0.012,Math.sin(time*0.4)*0.006);
  if(mapNoteT>0){ mapNoteT-=dt; if(mapNoteT<=0) mapBanner(); }
}
/* The banner names the marker Blorp stands on. A note, such as why he cannot go on, takes the hint's place for a moment. */
function mapBanner(note){
  const i=MAPST.at;
  $('map-label').textContent=LABELS[i]||''; $('map-name').textContent=LEVELS[i]?WORLDS[LEVEL_WORLD[i]].name:''; paintShards($('map-shards'),i); $('map-done').hidden=mapMarkState(i)!==2;
  $('map-note').textContent=note||''; $('map-banner').classList.toggle('note',!!note); mapNoteT=note?1.8:0;
}
