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
    if(D.wet){ if(r<0.3) put(S.near,dShell(pick(R,['#ffc2d6','#fff2c2','#c9b8ff'])),D.jx(),y,D.zb(1.2,5)); else if(r<0.5) put(S.near,dStarfish(pick(R,['#ff8fa8','#ffb347'])),D.jx(),y,D.zb(1.2,5)); return; }
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
  B.room(0,227).room(232,261,0,15,true);
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

/* 1-2: the piers. Plank walkways over open sea with Snappers leaping between them, and a deep lagoon whose far half
   can only be reached by diving under a wall. */
function w1l2(){
  const B=LevelBuilder(250,'shores');
  B.room(0,221).room(224,249,0,15,true);
  B.ground(0,22).ground(60,75).ground(79,126).ground(150,223);
  B.coins(6,3,3).row(10,5,'?M?').enemy('snippy',15).enemy('blob',19);
  B.row(23,1,'==========').row(37,1,'==========').row(50,1,'==========');
  B.sign(21,'Fell in? Swim back up: the sea will not hurt you. The fish might.');
  B.enemy('snapper',34.5,2,{rise:4}).enemy('snapper',47.5,2,{rise:4.5,phase:0.8});
  B.coins(26,3,4).arc(32,3,6).row(40,5,'B?B').row(40,8,'===').shard(41,9).enemy('shellby',43).coins(52,3,5).enemy('snippy',55);
  B.row(63,5,'?B?').enemy('blob',66).pipe(70,2,true).arc(75,4,5);
  /* the deep lagoon */
  B.stairs(79,4).ground(83,118,7).clear(87,2,114,6).clear(115,2,117,3).water(87,2,117,6).stairs(119,4,-1);
  B.sign(84,'Hold {down} to dive. There is a way under the wall.',7);
  B.fill(100,4,101,9,HARD).coins(89,3,5).coins(96,2,9).coins(104,5,5).coinCol(110,2,3);
  B.enemy('jelly',93,3.4,{ry:1.2}).enemy('jelly',106,3,{ry:0.8,sp:1.4}).enemy('jelly',112,4.6,{ry:0.9,sp:0.8}).shard(117,2);
  B.checkpoint(124);
  B.row(128,1,'====').plat(133,2,3,'x',5,1.2).row(142,1,'======').coins(134,4,6).enemy('snapper',148,2,{rise:3.5});
  B.row(153,5,'B?B').enemy('snippy',156);
  B.warp(160,2,'in').enemy('shellby',166).fill(170,2,171,3,HARD);
  B.row(175,5,'BMB').row(176,9,'?').enemy('blob',178).enemy('blob',180).warp(184,3,'out',true);
  B.row(188,4,'==').row(191,6,'==').coins(188,5,2).coins(191,7,2).enemy('batty',190,9,{rx:2});
  B.stairs(196,6).fill(202,2,202,7,HARD);
  B.goal(208);
  /* a walled garden at the far end of the pipe: two pillars to kick up between */
  B.fill(222,2,223,15,GROUND).ground(224,249).fill(224,2,224,15,HARD).fill(249,2,249,15,HARD);
  B.warp(226,2,'in',true).warp(245,2,'out').fill(234,5,234,12,HARD).fill(238,5,238,12,HARD).coinCol(236,4,6).shard(236,11);
  B.coins(229,3,3).coins(240,3,3).row(230,5,'?I?').row(240,5,'???');
  return B.L;
}

/* 1-3: the stacks. Rock too tall to jump: the way on is up, kicking from wall to wall, and down the other side. */
function w1l3(){
  const B=LevelBuilder(236,'shores');
  B.ground(0,40).ground(45,96).ground(101,150).ground(155,235);
  B.coins(6,3,3).enemy('blob',12).row(15,5,'B?B').enemy('snippy',20);
  B.sign(23,'Too high to jump? Kick up between two walls.');
  B.fill(26,4,26,12,HARD).ground(30,40,9).coinCol(28,3,7);
  B.row(33,12,'?M?').enemy('snippy',36,9).arc(41,6,5);
  B.spring(50).row(53,9,'=====').coins(53,10,5).shard(55,13).enemy('batty',60,6);
  B.row(64,5,'B?B').enemy('shellby',67).pipe(72,3,true);
  /* a rock with a rock pool on top */
  B.stairs(76,3).ground(79,96,6).clear(83,3,91,5).water(83,3,91,5).coins(84,3,7).enemy('jelly',87,3.6,{ry:0.7}).row(86,9,'?L?');
  B.arc(96,7,6);
  B.checkpoint(104);
  B.row(108,5,'?B?').enemy('blob',110).enemy('blob',112);
  /* the big stack: a long chimney, with a shard for those who kick on past the top */
  B.fill(117,4,117,13,HARD).ground(121,134,10).coinCol(119,3,8).shard(119,13);
  B.enemy('snippy',125,10).enemy('shellby',130,10).row(127,13,'B?B');
  B.fill(138,2,139,7,HARD).fill(143,2,144,4,HARD).coins(138,8,2).coins(143,5,2);
  B.arc(150,4,6).enemy('snapper',152,2,{rise:4});
  B.row(159,5,'BMB').enemy('blob',162).pipe(166,2).enemy('snippy',171);
  /* a brick-roofed box hides the third shard: pound down through the roof once big, or look round the back */
  B.sign(172,'Bricks break under a pound, once Blorp is big. Small? Look round the back.');
  B.fill(175,2,175,3,HARD).fill(176,2,176,5,HARD).fill(180,4,180,5,HARD).row(177,5,'BBB').row(177,4,'BBB').shard(178,2);
  B.row(185,5,'?B?').enemy('shellby',188).enemy('batty',192,7,{rx:2});
  B.stairs(204,6).fill(210,2,210,7,HARD);
  B.goal(216);
  return B.L;
}

/* 1-4: the tide caves. A cliff with the sea inside it: Puffers that swell when Blorp swims near, a gate that only a
   switch opens, and the first candyfloss. */
function w1l4(){
  const B=LevelBuilder(276,'shores');
  B.room(0,235).room(240,275,0,15,true);
  B.ground(0,34).ground(38,60).ground(64,150).ground(156,239);
  B.coins(5,3,3).row(10,5,'?B?').enemy('blob',14).enemy('shellby',18);
  B.pipe(23,2,true).enemy('snippy',29).arc(34,4,5);
  B.row(42,5,'BFB').sign(40,'Candyfloss! Jump again in the air, and hold {jump} to glide.').enemy('blob',47);
  B.row(52,4,'==').row(56,6,'==').coins(52,5,2).coins(56,7,2).shard(66,10);
  /* the flooded cliff: in at one end, through three chambers under a roof, and out into the open at the other */
  B.stairs(64,4).ground(68,112,7).fill(75,8,106,11,GROUND).clear(72,2,108,6).water(72,2,108,6).stairs(113,4,-1);
  B.sign(69,'Puffers swell up when Blorp is near. Give them room.',7);
  B.fill(84,5,85,6,HARD).fill(84,2,85,2,HARD).fill(96,4,97,6,HARD);
  B.enemy('puffer',79,4,{rx:2.2}).enemy('puffer',90,3,{rx:2.2,sp:1}).enemy('jelly',101,3.4,{ry:1.2});
  B.coins(74,3,4).coins(87,5,4).coins(98,2,5);
  /* a switch hanging in the water, to swim up into, opens the red gate to the last chamber and the second shard */
  B.row(93,4,'X').coinCol(93,2,2).fill(104,2,104,7,RED).shard(106,3).coinCol(107,3,3);
  B.checkpoint(118);
  B.row(122,5,'?B?').enemy('snippy',125).enemy('blob',129).enemy('blob',131);
  B.pipe(135,3,true).row(140,5,'BMB').row(141,9,'?');
  B.row(146,3,'==').row(151,1,'===').enemy('snapper',154.5,2,{rise:4.5});
  B.warp(160,2,'in').enemy('shellby',165).enemy('snippy',169).warp(176,3,'out',true);
  B.row(181,5,'B?B?B').enemy('blob',183).enemy('batty',187,8,{rx:3}).pipe(191,2);
  B.spring(196).row(198,9,'====').coins(198,10,4);
  B.stairs(206,6).fill(212,2,212,7,HARD);
  B.goal(218);
  /* a flooded cave at the end of the pipe: a Puffer on guard, a Jelly, and the third shard in the far top corner */
  B.fill(236,2,239,15,GROUND).ground(240,275).fill(240,2,240,15,HARD).fill(275,2,275,15,HARD).fill(240,11,275,15,GROUND).water(241,2,274,10);
  B.warp(242,2,'in',true).warp(270,2,'out').coinBox(247,3,252,5).coinBox(258,6,263,8);
  B.enemy('puffer',256,5,{rx:3,sp:0.9}).enemy('jelly',266,4,{ry:1.6}).row(264,8,'HHH').shard(273,9).fill(269,7,271,7,HARD);
  return B.L;
}

/* 1-5: the long beach at dusk. Everything the shore has taught, one thing after another: piers and Snappers, a stack
   to kick up, a lagoon with a gate, a wide crossing, and a last rock before the flag. */
function w1l5(){
  const B=LevelBuilder(304,'shores');
  B.room(0,267).room(272,303,0,15,true);
  B.ground(0,30).ground(34,52).ground(72,110).ground(114,160).ground(186,271);
  B.coins(6,3,3).row(11,5,'?M?').enemy('snippy',15).enemy('blob',19).enemy('blob',21);
  B.pipe(25,3,true).arc(30,4,5);
  B.row(38,5,'B?B').enemy('shellby',41).enemy('snippy',46);
  B.row(53,1,'=====').plat(59,2,3,'x',4,1.3).row(67,1,'=====').enemy('snapper',57.5,2,{rise:4}).enemy('snapper',65.5,2,{rise:4.5,phase:0.7}).coins(54,3,3).coins(68,3,3);
  /* a stack to kick up; the first shard sits on top of the pillar, a running jump from the rock */
  B.fill(78,4,78,12,HARD).ground(82,92,9).coinCol(80,3,7).row(85,12,'?F?').enemy('shellby',88,9).shard(78,13);
  B.row(97,5,'B?B').enemy('blob',99).enemy('blob',101).enemy('snippy',105).arc(110,4,5);
  B.checkpoint(117);
  /* the lagoon: two Puffers, and a shelf with the second shard tucked under it */
  B.stairs(120,4).ground(124,156,7).clear(128,2,152,6).water(128,2,152,6).stairs(157,4,-1);
  B.fill(140,5,140,6,HARD).fill(140,2,140,2,HARD).fill(147,4,151,4,HARD).shard(150,2);
  B.enemy('puffer',133,4,{rx:2.4}).enemy('jelly',143,4.6,{ry:0.9}).enemy('puffer',146,2.2,{rx:1.6,sp:1.1}).coins(130,3,4).coins(141,3,4).coins(148,5,3);
  /* the wide crossing */
  B.row(161,1,'====').plat(166,2,3,'x',6,1.1).row(176,1,'======').enemy('snapper',164.5,2,{rise:4}).enemy('snapper',183.5,2,{rise:4.5,phase:1}).coins(167,4,7).arc(181,3,6);
  B.row(189,5,'?B?').enemy('shellby',192).enemy('snippy',196);
  B.warp(200,2,'in').enemy('blob',206).enemy('blob',208).warp(212,3,'out',true);
  B.row(217,5,'BMB').row(218,9,'L').enemy('batty',221,8,{rx:2.5});
  /* the last rock */
  B.fill(226,4,226,11,HARD).ground(230,236,8).coinCol(228,3,6).row(232,11,'?').enemy('snippy',233,8).fill(237,2,238,5,HARD).fill(239,2,239,3,HARD);
  B.stairs(244,6).fill(250,2,250,7,HARD);
  B.goal(256);
  /* the secret garden: pound the switch, and blue steps lead up to the third shard */
  B.fill(268,2,271,15,GROUND).ground(272,303).fill(272,2,272,15,HARD).fill(303,2,303,15,HARD);
  B.warp(274,2,'in',true).warp(298,2,'out').row(279,2,'X').row(283,4,'U').row(286,6,'U').row(289,8,'UU').shard(290,10).coins(283,5,1).coins(286,7,1).coins(289,9,1);
  B.coinBox(292,3,295,4).row(281,6,'?').sign(277,'Pound the switch from above.');
  return B.L;
}

defWorld({name:'Sprinkle Shores',theme:'shores',levels:[w1l1,w1l2,w1l3,w1l4,w1l5]});
