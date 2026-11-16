/* ================= World 1: Sprinkle Shores ================= */
/* A beach with the sea behind it. The world that teaches the new moves: kicking off walls, the ground pound,
   swimming and pipes. Pits hold water here, so a fall can be swum out of. */
function dPalm(R){ const t='#c9975a',t2='#b07f48',g='#3fbf6a',g2='#62d98a', b=[]; let x=0;
  const n=6+((R()*3)|0), lean=(R()-0.5)*1.2;
  for(let i=0;i<n;i++){ b.push([x-1,i*3,-1,2,3,2,i%2?t:t2]); x+=lean*(i>1?0.6:0.2); }
  const top=n*3;
  for(const q of [[1,0],[-1,0],[0,1],[0,-1],[0.7,0.7],[-0.7,-0.7],[0.7,-0.7],[-0.7,0.7]]) for(let k=0;k<4;k++)
    b.push([x-1.2+q[0]*(1.5+k*2.5),top-0.4-k*k*0.5,-1.2+q[1]*(1.5+k*2.5),2.6,1,2.6,k%2?g:g2]);
  b.push([x-1.6,top,-1.6,3.2,1.4,3.2,g],[x-0.2,top-1.7,1,1.5,1.5,1.5,'#8a5a2b'],[x-1.7,top-1.5,-0.3,1.5,1.5,1.5,'#7a4a20']);
  return b; }
function dParasol(c){ return [[-0.4,0,-0.4,0.8,11,0.8,'#fff2c2'],[-6,10,-6,12,1,12,c],[-4.5,11,-4.5,9,1,9,WHITE],[-3,12,-3,6,1,6,c],[-1.2,13,-1.2,2.4,0.8,2.4,WHITE],
  [-5,0,2,4,0.5,7,shade(c,1.1)],[-5,0.5,2,4,0.3,1.4,WHITE],[-5,0.5,5,4,0.3,1.4,WHITE]]; }
function dSandcastle(){ const s='#f0cf85',d='#d9b060'; return [[-4,0,-3,8,3,6,s],[-5,0,-4,2.4,5,2.4,s],[2.6,0,-4,2.4,5,2.4,s],[-5,0,1.6,2.4,5,2.4,s],[2.6,0,1.6,2.4,5,2.4,s],
  [-5,5,-4,0.8,0.8,0.8,d],[-3.4,5,-4,0.8,0.8,0.8,d],[2.6,5,-4,0.8,0.8,0.8,d],[4.2,5,-4,0.8,0.8,0.8,d],[-1.5,3,-1.5,3,3,3,s],[-0.2,6,-0.2,0.4,3.4,0.4,'#a5642f'],[0.2,7.8,-0.2,2.2,1.4,0.3,'#ff4f7b'],[-1,0,3,2,2,0.15,d]]; }
function dBall(){ return [[-2,0,-2,4,4,4,WHITE],[-2.05,0,-0.7,4.1,4,1.4,'#ff4f7b'],[-0.7,0,-2.05,1.4,4,4.1,'#2fd6c3'],[-0.7,3.6,-0.7,1.4,0.5,1.4,'#ffe14d']]; }
function dStarfish(c){ return [[-2.2,0,-0.6,4.4,0.6,1.2,c],[-0.6,0,-2.2,1.2,0.6,4.4,c],[-0.9,0.3,-0.9,1.8,0.6,1.8,shade(c,1.15)]]; }
function dShell(c){ return [[-1.2,0,-1,2.4,1.2,2,c],[-0.8,1.2,-0.7,1.6,0.6,1.4,shade(c,1.12)],[-1.2,0.2,1,0.5,0.8,0.1,WHITE],[0.7,0.2,1,0.5,0.8,0.1,WHITE]]; }
function dCabin(c){ const w=WHITE, b=[[-6,0,-5,12,11,10,w],[-7,11,-6,14,1.4,12,c],[-5.5,12.4,-4.5,11,1.4,9,c],[-4,13.8,-3,8,1.4,6,c],[-2,0,5,4,7,0.3,shade(c,0.8)],[0.8,3.4,5.3,0.6,0.6,0.15,'#ffe14d']];
  for(let x=-6;x<6;x+=4) b.push([x,0,5,2,11,0.12,c]); return b; }
function dBoard(c){ return [[-1.5,0,-0.5,3,11,1,c],[-1,11,-0.5,2,1.4,1,c],[-0.3,0,0.5,0.6,12,0.12,WHITE]]; }
function dDuneGrass(){ const g='#9bd95a',d='#7cc244'; return [[-1.8,0,0,0.8,3,0.8,d],[-0.5,0,0.3,0.8,4.4,0.8,g],[0.8,0,-0.2,0.8,3.4,0.8,d],[1.9,0,0.2,0.7,2.2,0.7,g]]; }

THEMES.shores={ music:'shores',
  sky:['#1f8fe8','#7fd4ff','#fff3cf'], skyMid:0.5, glowCol:0xfff1b8, sunGlow:0.8,
  fog:0xbfeaff, fogNear:16, fogFar:150,
  hemiSky:0xffffff, hemiGround:0xd9c9a0, hemiI:0.62, sunI:0.66, sunCol:0xfff3d6, sunDir:[-0.45,0.76,0.5],
  top:'#ffe6a0', topS:['#fff0bd','#f7d889','#ffe9ac','#f0cf80'], dirt:'#e6b765', dirtS:['#dba954','#f0c877','#cf9c48'], cap:'#ffe6a0', capL:'#fff5cf', capD:'#c9953f',
  brick:['#ff8a6b','#c9503a','#ffc0a8'], hard:['#f0d9a8','#fff3d6','#b89a62'], pipe:['#2fd6c3','#a5f7ea','#1b9c8f','#0e5c55'],
  semi:'plank', plat:['#ff8fc7','#d05a8a'], dust:'#fff0c9', back:-6, fringe:['#9bd95a','#7cc244','#b4e86e'],
  liquid:{kind:'water',a:'#1fa9e6',b:'#c9f6ff',op:0.8,far:120}, pool:{kind:'water',a:'#2fb9ee',b:'#d9fbff',op:0.6},
  disc:['#ffe14d','#fff3a0','#e08a12'], bloom:0.85, hi:0.12,
  looks:[null,
    {sky:['#3a9cf0','#a6e0ff','#ffe9d0'],fog:0xd3eeff},
    {sky:['#2a7fe0','#7fc8f5','#ffe6b0'],fog:0xc9e6f5,sunCol:0xffe9c0,sunDir:[-0.55,0.62,0.5]},
    {sky:['#f08a5c','#ffc890','#fff0c2'],fog:0xffdcb0,sunCol:0xffc890,hemiSky:0xffe6d0,glowCol:0xffb060,sunDir:[-0.66,0.45,0.5],disc:['#ff9a3d','#ffd27a','#b3520f'],liquid:{kind:'water',a:'#3f8fd0',b:'#ffd9a8',op:0.8,far:120}},
    {sky:['#3b2a8c','#c9609e','#ffb37a'],fog:0xd89ab0,sunCol:0xffb09a,hemiSky:0xffd6f0,hemiI:0.58,glowCol:0xff7a5a,sunDir:[-0.72,0.36,0.5],stars:0.5,disc:['#ff7a4d','#ffb37a','#a8320f'],liquid:{kind:'water',a:'#4a5fc0',b:'#ffb3c9',op:0.8,far:120}}],
  /* the far view: islands standing in the sea, sails on the horizon, gulls, clouds, the sun */
  scenery(S,R){
    const W=S.W, far=S.far;
    for(let x=-60;x<W+60;x+=26+R()*30){ const z=-44-R()*40, w=14+R()*16, top=3+R()*6;
      hill(far,x,top,z,w,pick(R,['#5fcf8a','#52c27e','#6ddb96']),R,false);
      far.push([x-w*0.62,0.4,z-3,w*1.24,1.3,6,'#ffe6a0']);
      if(R()<0.5) for(let k=0;k<3;k++){ const px=x+(R()-0.5)*w*0.3; far.push([px,top,z,0.5,3+k,0.5,'#b07f48'],[px-1.5,top+3+k,z-1.5,3.5,0.6,3.5,'#3fbf6a']); } }
    /* a lighthouse on a rock, once per level */
    { const x=W*0.55+R()*30, z=-58; far.push([x-5,0.5,z-4,10,2.2,8,'#9aa3b8'],[x-3,2.7,z-2.5,6,1.2,5,'#aab3c8']);
      for(let k=0;k<6;k++) far.push([x-1.6+k*0.08,3.9+k*2,z-1.6+k*0.08,3.2-k*0.16,2,3.2-k*0.16,k%2?'#ff4f7b':WHITE]);
      far.push([x-1.9,15.9,z-1.9,3.8,0.5,3.8,'#3a3a4a'],[x-1.4,18.2,z-1.4,2.8,0.9,2.8,'#ff4f7b']); S.glowFar.push([x-1,16.4,z-1,2,1.8,2,'#fff3a0']); }
    for(let x=-50;x<W+50;x+=9+R()*10) S.addCloud(x,7+R()*9,-30-R()*40,R,TH.cloudTint);
    skyDisc(TH.disc,null,14.5);
    /* sails that cross the horizon, and gulls that cross the sky */
    for(let i=0;i<Math.ceil(W/55);i++){ const c=pick(R,['#ff4f7b','#ffe14d','#2fd6c3','#ffffff']), m=new T.Mesh(tmpGeo(voxGeo([[-1.6,0,-0.6,3.2,0.7,1.2,'#fff2c2'],[-1.2,-0.3,-0.4,2.4,0.3,0.8,'#b07f48'],[-0.1,0.7,-0.1,0.2,3.4,0.2,'#8a5a2b'],[0.1,1,-0.05,1.7,2.8,0.1,c],[-1.3,1.2,-0.05,1.2,2,0.1,WHITE]],1)),MAT.vox);
      const z=-26-R()*22, v=(R()<0.5?-1:1)*(0.3+R()*0.5); m.position.set(R()*W,TH.liquid.kind==='water'?L.liquidY:1.3,z); world.add(m);
      critters.push({tick(dt,time){ m.position.x+=v*dt; if(m.position.x>W+40) m.position.x=-40; else if(m.position.x<-40) m.position.x=W+40; m.position.y=L.liquidY+Math.sin(time*1.3+z)*0.06; m.rotation.z=Math.sin(time*1.1+z)*0.05; }}); }
    for(let i=0;i<Math.ceil(W/40);i++){ const g=new T.Group(), wl=new T.Mesh(geo('gullL',()=>[[-5,0,-1,5,0.6,2,WHITE],[-6.4,0,-0.6,1.4,0.5,1.2,'#3a3a4a']]),MAT.soft), wr=new T.Mesh(geo('gullR',()=>[[0,0,-1,5,0.6,2,WHITE],[5,0,-0.6,1.4,0.5,1.2,'#3a3a4a']]),MAT.soft);
      g.add(new T.Mesh(geo('gull',()=>[[-1,-0.6,-2.4,2,1.4,5,WHITE],[-0.5,-0.2,2.6,1,0.6,1,'#ffb347']]),MAT.soft),wl,wr);
      const z=-9-R()*14, y0=9+R()*4, v=1.6+R()*1.4, ph=R()*9; g.position.set(R()*W,y0,z); g.rotation.y=Math.PI/2; world.add(g);
      critters.push({tick(dt,time){ g.position.x+=v*dt; if(g.position.x>W+30) g.position.x=-30; g.position.y=y0+Math.sin(time*0.7+ph)*0.8; const f=Math.sin(time*7+ph)*0.6; wl.rotation.z=-f; wr.rotation.z=f; }}); }
    S.addMotes(0xffffff,40,0.07);
  },
  /* on the sand: palms, parasols and cabins at the back, shells and starfish at the front */
  decor(S,D,R){
    const r=R(), y=D.ty*8;
    if(r<0.1&&D.free(6)&&D.open) put(S.flora,dPalm(R),D.jx(),y,D.zb(2.6,5),0.55);
    else if(r<0.14&&D.free(4)&&D.open) put(S.near,dParasol(pick(R,['#ff4f7b','#2fd6c3','#ffb347','#7b4fe0'])),D.jx(),y,D.zb(2.4,4.6));
    else if(r<0.165&&D.free(4)&&D.open) put(S.near,dCabin(pick(R,['#ff8fc7','#5fd0ff','#ffd23e','#7ee0a8'])),D.jx(),y,D.zb(4,5));
    else if(r<0.2) put(S.near,dSandcastle(),D.jx(),y,D.zb(1.5,4));
    else if(r<0.24) put(S.near,dBall(),D.jx(),y,D.zb(1.3,3.5));
    else if(r<0.27&&D.free(3)&&D.open) put(S.near,dBoard(pick(R,['#ff8fc7','#5fd0ff','#ffd23e'])),D.jx(),y,D.zb(2,4.5));
    else if(r<0.4) put(S.flora,dDuneGrass(),D.jx(),y,D.zb(1.2,5.4),1.6);
    else if(r<0.5) put(S.near,dRock(pick(R,['#e0c9a0','#cdb68c'])),D.jx(),y,D.zb(1.2,5));
    const f=R();
    if(f<0.12) put(S.near,dStarfish(pick(R,['#ff8fa8','#ffb347','#ff6b6b'])),D.jx(),y,D.zf());
    else if(f<0.22) put(S.near,dShell(pick(R,['#ffc2d6','#fff2c2','#c9b8ff'])),D.jx(),y,D.zf());
    if(R()<0.18) put(S.near,dShell(pick(R,['#ffc2d6','#fff2c2'])),D.jx(),y,D.zb(1.1,5.6));
  }
};

/* 1-1: a first walk on the beach. Running and jumping, a wall to kick off, a lagoon to swim, a switch to pound,
   and a pipe down to a hidden cove. */
function w1l1(){
  const B=LevelBuilder(262,'shores');
  B.room(0,227).room(232,261,0,15);
  B.L.rooms[1].bonus=true;
  B.ground(0,58).ground(62,128).ground(133,172).ground(176,231);
  B.sign(6,'Hold {run} to run. Hold {jump} longer to jump higher.');
  B.coins(10,3,3).row(15,5,'?').enemy('blob',20);
  B.row(23,5,'B?BMB').row(25,9,'?').enemy('blob',29);
  B.pipe(34,2).enemy('snippy',39);
  /* two pillars to kick up between, and the first shard at the top */
  B.sign(43,'In the air, push against a wall and press {jump} to kick off it.');
  B.fill(46,4,46,11,HARD).fill(50,4,50,11,HARD).coinCol(48,4,4).shard(48,10);
  B.arc(57,4,6);
  /* the lagoon: up three steps, a swim, and out the other side */
  B.stairs(64,3).ground(67,96,6).clear(71,2,92,5).water(71,2,92,5).stairs(97,3,-1);
  B.sign(68,'Under water, tap {jump} to swim up. At the top, {jump} leaps out.',6);
  B.coins(74,3,4).coins(84,3,4).coinCol(81,4,2).enemy('jelly',78,3.2,{ry:0.9}).enemy('jelly',88,3.4,{ry:1,sp:1.3});
  B.fill(80,2,80,3,HARD).fill(82,2,82,3,HARD).shard(81,2);
  B.row(79,9,'===').row(85,10,'===').coins(79,10,3).coins(85,11,3);
  B.row(102,5,'?B?').enemy('shellby',105).enemy('blob',109);
  B.checkpoint(113);
  /* a switch that can only be reached from above, and a red cage it opens */
  B.sign(116,'Press {down} in the air for a ground pound. Pound the switch!');
  B.row(120,2,'X').row(123,2,'R R').row(123,3,'R R').row(123,4,'RRR').shard(124,2).row(127,5,'UU').coins(127,6,2);
  B.enemy('snapper',130.5,2,{rise:4});
  B.pipe(137,3,true).row(142,5,'B?B').row(143,9,'L').enemy('snippy',145).enemy('blob',149);
  /* the pipe with arrows goes down to the cove; the one after it is the way back up */
  B.sign(152,'A pipe with arrows goes somewhere. Stand on it and press {down}.');
  B.warp(155,2,'in').warp(165,3,'out',true).enemy('shellby',161);
  B.row(168,4,'==').row(172,6,'===').row(176,4,'==').coins(172,7,3).enemy('batty',173,9,{rx:2.5});
  B.row(181,5,'B?B?B').row(183,9,'F').enemy('blob',184).enemy('blob',186).enemy('snippy',190);
  B.pipe(194,2).enemy('shellby',198);
  B.stairs(202,6).fill(208,2,208,7,HARD);
  B.goal(214);
  /* the hidden cove */
  B.fill(228,0,231,15,GROUND).fill(232,2,232,15,HARD).fill(261,2,261,15,HARD).ground(232,261);
  B.warp(234,2,'in',true).coinBox(238,3,247,5).row(239,8,'?L?').row(244,8,'???').warp(256,2,'out');
  B.row(250,4,'==').row(252,6,'==').coins(250,5,2).coins(252,7,2);
  return B.L;
}

defWorld({name:'Sprinkle Shores',theme:'shores',levels:[w1l1]});
