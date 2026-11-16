/* ================= World 7: Magma Mountain ================= */
/* A volcano. Dark rock lit from below: the pits hold lava, which is the end of Blorp at a touch, and Emberlings leap
   out of it. Flame jets, ember chains, ledges that fall and bridges that crumble do the rest. A look marked `cave` is
   inside the mountain, with a wall of rock behind the lane. */
function dW7Spike(c){ return [[-1.2,0,-1.2,2.4,5,2.4,c],[-0.7,5,-0.7,1.4,3,1.4,shade(c,1.2)],[-0.3,8,-0.3,0.6,1.6,0.6,shade(c,1.5)],[1,0,-0.6,1.6,2.8,1.6,c],[-2.4,0,0,1.4,2,1.4,shade(c,0.85)]]; }
function dW7Boulder(){ const c='#4a4458'; return [[-3,0,-2.5,6,3.4,5,c],[-2,3.4,-1.8,4,1.4,3.6,shade(c,1.15)]]; }
function dW7Seam(){ return [[-1.6,0.6,2.5,0.5,2.2,0.12,'#ff8a3a'],[-1.1,1.8,2.5,1.6,0.5,0.12,'#ffb347'],[0.5,0.4,2.5,0.5,1.9,0.12,'#ff8a3a']]; }
function dW7Tree(R){ const t='#3a2f3a',b=[]; let x=0; const n=4+((R()*3)|0);
  for(let i=0;i<n;i++){ b.push([x-0.8,i*3,-0.8,1.6,3,1.6,t]); x+=(R()-0.5)*1.2; }
  b.push([x-0.5,n*3,-0.5,3.6,0.9,0.9,t],[x-3.4,n*3-1.5,-0.5,3,0.9,0.9,t],[x+2.6,n*3+0.9,-0.5,0.8,2.2,0.8,t],[x-3.4,n*3-0.6,-0.5,0.8,2,0.8,t]); return {b,x,top:n*3}; }
function dW7Flower(){ return [[-0.4,0,-0.4,0.8,3.4,0.8,'#5a4a3a'],[-1.6,3.4,-0.5,3.2,2.6,1,'#ff5a1f'],[-0.8,4.2,0.5,1.6,1.2,0.3,'#ffd23e']]; }
function dW7Fern(){ const g='#7a5a8a',d='#5a4070'; return [[-1.8,0,0,0.8,3,0.8,d],[-0.6,0,0.3,0.8,4.6,0.8,g],[0.7,0,-0.2,0.8,3.6,0.8,d],[1.8,0,0.2,0.7,2.2,0.7,g]]; }
function dW7Vent(){ return [[-2.4,0,-2.4,4.8,1.4,4.8,'#3a3344'],[-1.6,1.4,-1.6,3.2,0.8,3.2,'#2a2432']]; }
function dW7Lantern(){ return [[-0.4,0,-0.4,0.8,7,0.8,'#6a5a4a'],[-0.4,7,-0.4,2.4,0.7,0.8,'#6a5a4a'],[1.2,4.6,-0.8,1.6,2.4,1.6,'#3a3344']]; }
function dW7Cart(){ const c='#7a6a5a'; return [[-3.5,1.4,-2.2,7,3.4,4.4,c],[-3,2,-1.8,6,2.8,3.6,'#3a3344'],[-3,0,-2.5,1.6,1.6,0.6,'#2a2432'],[1.4,0,-2.5,1.6,1.6,0.6,'#2a2432'],[-3,0,1.9,1.6,1.6,0.6,'#2a2432'],[1.4,0,1.9,1.6,1.6,0.6,'#2a2432'],[-2,4.8,-1,1.6,1,1.6,'#ffb347'],[0.4,4.8,0,1.4,0.8,1.4,'#ffd23e']]; }
/* a jagged ridge, in tiles: a row of teeth of uneven height */
function w7Ridge(far,x0,x1,z,base,hmin,hmax,R,col){ for(let x=x0;x<x1;){ const w=2.5+R()*4.5, h=hmin+R()*(hmax-hmin); far.push([x,base-30,z,w,30+h,4,shade(col,0.85+R()*0.3)]); if(R()<0.4) far.push([x+w*0.25,base+h,z+0.5,w*0.4,0.8+R()*1.6,3,col]); x+=w*0.85; } }

THEMES.magma={ music:'magma',
  sky:['#1a0a24','#7a1f2c','#ff8a3a'], skyMid:0.42, glowCol:0xff7a2a, sunGlow:0.5, stars:0.3,
  fog:0x5a1f2a, fogNear:12, fogFar:110,
  hemiSky:0xffd9c0, hemiGround:0xa0503a, hemiI:0.62, sunI:0.58, sunCol:0xffc8a0, sunDir:[-0.4,0.7,0.6],
  top:'#5e586c', topS:['#6e687e','#4e485c','#666074'], dirt:'#3a3346', dirtS:['#322c3e','#443d52','#2c2636'], cap:'#ff8a3a', capL:'#ffc070', capD:'#2a2432',
  brick:['#b85a3a','#6a2f20','#e09a7a'], hard:['#57506e','#8a82a8','#2e2840'], pipe:['#d9d3c8','#fff8ec','#9a9488','#4a4640'],
  semi:'plank', plat:['#d9a878','#8a6a4a'], dust:'#b0a4a0', back:-5,
  liquid:{kind:'lava',a:'#ff5a1f',b:'#ffd23e',op:1,mask:0.3,flow:0.35,far:100},
  rock:'#2c2438', bloom:1.1, hi:0.06, vig:0.5,
  looks:[null,
    {sky:['#2a0a1c','#a8242c','#ffb347'],fog:0x7a2a2a,sunCol:0xffb890,hemiSky:0xffd0b0},
    {cave:true,sky:['#0c0810','#1a1018','#2a1820'],stars:0,fog:0x1a1018,fogNear:10,fogFar:70,hemiSky:0xffc8a0,hemiGround:0x803a2a,hemiI:0.52,sunI:0.5,sunCol:0xffb080,sunDir:[-0.3,0.62,0.72],back:-2.5,liquid:{kind:'lava',a:'#ff5a1f',b:'#ffd23e',op:1,mask:0.3,flow:0.35}},
    {sky:['#5a1420','#e0502a','#ffd27a'],fog:0xc0502a,fogFar:95,sunCol:0xffd0a0,hemiSky:0xffe0c0,hemiI:0.66,stars:0,erupt:true,bloom:1.2},
    {sky:['#06040f','#1c0c2a','#8a2a2c'],skyMid:0.3,fog:0x2a1024,stars:1,sunCol:0xd0b0ff,hemiSky:0xc8b8ff,hemiGround:0x8a3a3a,hemiI:0.58,sunI:0.5,rock:'#1c1630'}],
  scenery(S,R){
    const W=S.W, H=S.H, far=S.far, gf=S.glowFar, rock=TH.rock;
    if(TH.cave){
      /* inside the mountain: a wall of rock with glowing cracks, stalactites, and lanterns */
      const wz=-3.5;
      for(let gy=-4;gy<H+4;gy+=3) for(let gx=-16;gx<W+16;gx+=3) far.push([gx,gy,wz-0.8+R()*0.5,3,3,1.2,shade('#3a3040',0.7+R()*0.5)]);
      for(let i=0;i<W*H/70;i++){ const x=R()*W, y=1+R()*(H-2), v=R()<0.5; gf.push([x,y,wz+0.42,v?0.14:1+R()*2,v?1+R()*2.2:0.14,0.06,pick(R,['#ff7a2a','#ffb347','#ff5a1f'])]); }
      for(let x=4+R()*6;x<W;x+=12+R()*8){ const y=2.6+R()*(Math.min(H,12)-6); far.push([x,y,wz+0.4,0.4,0.4,1,'#6a5a4a']); gf.push([x-0.2,y-0.9,wz+1.1,0.8,0.9,0.6,'#ffc85a']); lamps.push({x,y:y-0.5,z:-1.6,col:0xffa040,power:1,reach:9}); }
      S.addMotes(0xff9a3d,Math.round(W*H/50),0.1,-0.6,true);
      return;
    }
    /* the cone, far off: a glowing crater, lava running down it, and smoke */
    { const cx=W*0.55, z=-78; let w=120, y=-2; for(let k=0;k<9;k++){ far.push([cx-w/2,y,z-8,w,4.4,16,shade(rock,0.9+k*0.04)]); y+=4.4; w*=0.8; }
      gf.push([cx-w*0.5,y,z-7,w,0.9,14,'#ff8a3a'],[cx-w*0.3,y+0.9,z-6,w*0.6,0.6,12,'#ffd23e']);
      for(const q of [[-0.18,26],[0.12,34],[0.3,20]]) gf.push([cx+q[0]*w*2.2,y-q[1],z+8.2,1.6,q[1],0.3,'#ff6a1f'],[cx+q[0]*w*2.2+0.5,y-q[1],z+8.4,0.5,q[1],0.2,'#ffd23e']);
      for(let k=0;k<7;k++) S.addCloud(cx-14+R()*28,y+3+k*2.6,z+R()*8,R,TH.erupt?'#7a3a3a':'#3a2a3a',0.12+R()*0.2); lamps.push({x:cx,y:y,z:-40,col:0xff7a2a,power:0.5,reach:60}); }
    w7Ridge(far,-60,W+60,-52,2,6,16,R,shade(rock,1.25)); w7Ridge(far,-50,W+50,-30,1.4,3,11,R,shade(rock,1.1)); w7Ridge(far,-40,W+40,-12,1,1.5,6,R,rock);
    /* lava falls down the nearer ridges, each with a glow at its foot */
    for(let x=10+R()*20;x<W;x+=34+R()*30){ const h=5+R()*5, z=-10; gf.push([x,1.3,z+0.2,1.4,h,0.3,'#ff6a1f'],[x+0.4,1.3,z+0.4,0.5,h,0.2,'#ffd23e'],[x-0.8,1.3,z+0.1,3,0.5,0.6,'#ffb347']); lamps.push({x:x+0.7,y:3,z:-4,col:0xff6a1f,power:0.9,reach:12}); }
    for(let x=-30;x<W+30;x+=16+R()*18) S.addCloud(x,10+R()*8,-26-R()*30,R,TH.erupt?'#8a4a3a':'#3a2a3a');
    S.addMotes(0xff9a3d,TH.erupt?Math.round(W*0.9):Math.round(W*0.4),TH.erupt?0.13:0.1,TH.erupt?-1.1:-0.5,true);
    if(TH.erupt){ /* rocks thrown up out of the crater, far away */
      for(let i=0;i<6;i++){ const m=new T.Mesh(geo('w7bomb',()=>[[-0.6,-0.6,-0.6,1.2,1.2,1.2,'#ffb347']],1),MAT.glow), ph=R()*5, dx=(R()-0.5)*50, cx=W*0.55; world.add(m);
        critters.push({tick(dt,time){ const u=((time*0.35+ph)%1); m.position.set(cx+dx*u,34+Math.sin(u*Math.PI)*22,-60); m.rotation.z=time*3; }}); } }
  },
  decor(S,D,R){
    const r=R(), y=D.ty*8, cave=TH.cave;
    if(r<0.09&&D.free(3)&&D.open) put(S.near,dW7Spike(pick(R,['#3a3052','#4a3f6a','#2e2644'])),D.jx(),y,D.zb(1.4,cave?2.1:4.4));
    else if(r<0.17){ const jx=D.jx(), z=D.zb(1.4,cave?2:4.2); put(S.near,dW7Boulder(),jx,y,z); put(S.glow,dW7Seam(),jx,y,z); if(R()<0.3) lamps.push({x:jx/8,y:D.ty+0.4,z:z/8+0.6,col:0xff7a2a,power:0.6,reach:5}); }
    else if(r<0.22&&D.free(4)&&D.open&&!cave){ const t=dW7Tree(R), jx=D.jx(), z=D.zb(2.4,4.4); put(S.flora,t.b,jx,y,z,0.3); S.glow.push([jx+t.x+2.2,y+t.top+2.4,z-0.4,1.2,1.2,1.2,'#ff8a3a'],[jx+t.x-3.6,y+t.top+1,z-0.4,1,1,1,'#ffb347']); }
    else if(r<0.29) put(S.flora,dW7Fern(),D.jx(),y,D.zb(1.2,cave?2.1:4.5),2);
    else if(r<0.34){ const jx=D.jx(), z=D.zb(1.3,cave?2.1:4); put(S.flora,dW7Flower(),jx,y,z,1.6); S.glow.push([jx-0.5,y+4.4,z+0.6,1,0.8,0.3,'#ffd23e']); }
    else if(r<0.38) put(S.near,dBones(),D.jx(),y,D.zb(1.2,cave?2.1:4.5));
    else if(r<0.42) put(S.near,dW7Vent(),D.jx(),y,D.zb(1.6,cave?2.1:4));
    else if(cave&&r<0.47&&D.free(2)&&D.open){ const jx=D.jx(), z=D.zb(1.5,2.1); put(S.near,dW7Lantern(),jx,y,z); S.glow.push([jx+1.5,y+5,z-0.5,1,1.6,1,'#ffc85a']); lamps.push({x:jx/8+0.2,y:D.ty+0.7,z:z/8,col:0xffa040,power:0.9,reach:7}); }
    else if(cave&&r<0.51) put(S.near,dW7Cart(),D.jx(),y,D.zb(1.5,2.1));
    const f=R(); if(f<0.1) put(S.near,dRock('#4a4458'),D.jx(),y,D.zf()); else if(f<0.15) S.glow.push([D.jx(),y,(1.1+R()*0.3)*8,1.2,0.3,0.8,'#ff8a3a']);
  }
};

/* 7-1: the foothills. Lava pits with an Emberling in each, flame jets to time on flat ground, and a first ledge that
   falls: every new danger where a mistake is cheap. */
function w7l1(){
  const B=LevelBuilder(248,'magma');
  B.room(0,217).room(222,247,0,15,true);
  B.ground(0,30).ground(34,62).ground(66,98).ground(104,140).ground(143,143).ground(146,221);
  B.coins(6,3,3).row(10,5,'?M?').enemy('spikit',16).sign(24,'Emberlings leap out of the lava. They cannot be stomped. Wait, then jump.');
  B.enemy('ember',32,2,{rise:4,gap:1.6}).row(38,5,'B?B').enemy('boing',42);
  B.sign(47,'Flame jets fire in a rhythm. Count it, then go.').jet(51,2,3,3).jet(56,2,3,3,1.5).enemy('spikit',60).enemy('ember',64,2,{rise:4.5,gap:1.5,phase:0.5});
  B.row(70,5,'?M?').enemy('rammy',76).fill(82,2,83,4,BRICK).jet(88,2,3,2.8).enemy('batty',92,6,{rx:2.5});
  B.sign(95,'This ledge drops soon after Blorp lands.').fall(100,2,3);
  B.checkpoint(108);
  B.row(112,5,'B?B').jet(118,2,3,2.6).jet(122,2,3,2.6,1.3).enemy('spikit',127).row(130,4,'==').row(133,7,'==').shard(134,10).coins(130,5,2);
  B.enemy('ember',141.5,2,{rise:4,gap:1.7}).enemy('ember',144.5,2,{rise:4,gap:1.7,phase:0.85});
  /* two pillars to kick up between, with a jet at the foot of them */
  B.fill(152,4,152,11,HARD).fill(156,4,156,11,HARD).jet(154,2,2,3).coinCol(154,5,4).shard(154,10);
  B.row(162,5,'?M?').enemy('fizzle',166).warp(171,2,'in').enemy('rammy',177).warp(183,3,'out',true).jet(188,2,3,2.6);
  B.stairs(192,6).fill(198,2,198,7,HARD);
  B.goal(204);
  /* a hot cupboard: a pit, an Emberling, and a shard over the middle of it */
  B.fill(218,2,221,15,GROUND).ground(222,232).ground(237,247).fill(222,2,222,15,HARD).fill(247,2,247,15,HARD);
  B.warp(224,2,'in',true).warp(243,2,'out').enemy('ember',234.5,2,{rise:5,gap:1.8}).shard(234,6).coinBox(227,3,230,4).coinBox(238,3,240,4);
  return B.L;
}

/* 7-2: the lava lake. A long crossing with almost no ground: ledges that slide, ledges that fall, little islands of
   rock, and Emberlings leaping between them in a rhythm that can be read. */
function w7l2(){
  const B=LevelBuilder(232,'magma');
  B.ground(0,22).ground(40,43).ground(60,64).ground(92,112).ground(132,135).ground(152,155).ground(184,231);
  B.coins(6,3,3).row(10,5,'?M?').enemy('spikit',16);
  B.plat(24,2,3,'x',4,1.1).enemy('ember',32.5,2,{rise:4,gap:1.8}).plat(34,2,3,'x',3,1.2,1.5).coins(25,4,5).row(41,5,'?');
  B.fall(45,2,3).fall(50,3,3).fall(55,2,3).enemy('ember',48.5,2,{rise:5,gap:1.6,phase:0.4}).enemy('ember',53.5,2,{rise:5,gap:1.6,phase:1.2}).shard(51,8);
  B.plat(66,2,3,'x',5,1).plat(77,3,3,'y',3,1.1).plat(82,2,3,'x',6,1,2).enemy('ember',75,2,{rise:4.5,gap:1.7}).enemy('batty',86,7,{rx:3}).coins(67,4,6).coins(83,4,6);
  B.checkpoint(96);
  B.row(100,5,'?M?').enemy('rammy',104).enemy('spikit',109);
  /* stepping stones, an Emberling between each pair */
  B.ground(116,117).ground(121,122).ground(126,127).enemy('ember',113.5,2,{rise:4,gap:1.6}).enemy('ember',118.5,2,{rise:4,gap:1.6,phase:0.5}).enemy('ember',123.5,2,{rise:4,gap:1.6,phase:1}).enemy('ember',128.5,2,{rise:4,gap:1.6,phase:1.5}).fall(129,2,2);
  B.row(133,5,'F').plat(137,2,3,'x',4,1.1).fall(145,3,3).fall(149,2,2).coins(138,4,5);
  /* a shard out over the lava, on a ledge that falls */
  B.fall(157,4,2).shard(157,6).plat(160,2,3,'x',5,1).enemy('ember',158,2,{rise:3,gap:2}).plat(170,3,3,'y',3,1.2).fall(175,2,3).fall(180,2,3).enemy('ember',173.5,2,{rise:5,gap:1.7}).coins(161,4,6);
  B.row(188,5,'B?B').enemy('boing',192);
  /* a brick-roofed box: pound in from the top once big, or look round the back */
  B.fill(196,2,196,5,HARD).fill(200,4,200,5,HARD).row(197,5,'BBB').row(197,4,'BBB').shard(198,2).fill(195,2,195,3,HARD);
  B.stairs(204,6).fill(210,2,210,7,HARD);
  B.goal(216);
  return B.L;
}

/* 7-3: inside the mountain. Along a tunnel under Clonks and ember chains, then up a great shaft: a spring, a cleft to
   kick up, a lift, ledges that fall, and out at the top for the flag. */
function w7l3(){
  const B=LevelBuilder(96,'magma',50);
  B.ground(0,28).ground(33,95).fill(0,10,65,35,GROUND).fill(92,2,95,49,GROUND).fill(0,36,3,49,GROUND).start(6);
  B.coins(8,3,3).row(12,5,'?M?').enemy('clonk',19,6).shard(24,7).enemy('ember',30.5,2,{rise:4,gap:1.6});
  B.firebar(40,6,6,1.6).enemy('spikit',46).enemy('clonk',52,6).row(56,5,'B?B').firebar(62,6,6,-1.6);
  /* the shaft */
  B.sign(66,'The way out is up.').spring(70).coinCol(70,5,5).fill(74,9,91,9,HARD).jet(79,10,3,2.6).enemy('spikit',83,10);
  B.fill(87,12,87,20,HARD).coinCol(89,11,8).fill(76,20,86,20,HARD).shard(89,24).fill(88,26,91,26,HARD);
  B.checkpoint(80,21).jet(77,21,3,2.8).row(82,24,'?M?');
  B.plat(69,21,3,'y',6,1).coins(70,28,2).fill(74,27,85,27,HARD).enemy('fizzle',78,28).jet(82,28,3,2.4).spring(85,28).fill(88,33,91,33,HARD).shard(90,34).coinCol(85,30,4);
  B.fall(70,30,3).fall(66,33,3).coins(71,32,1).coins(67,35,1);
  B.enemy('batty',50,40,{rx:3}).row(56,39,'?');
  B.goal(34,36);
  return B.L;
}

/* 7-4: the eruption. A level that rewards running: long bridges that crumble, Bonks charging on narrow ground, pods
   that fire Blorp over the lava, and belts of rock on the move. */
function w7l4(){
  const B=LevelBuilder(278,'magma');
  B.room(0,247).room(252,277,0,15,true);
  B.ground(0,24).ground(46,70).ground(92,118).ground(140,168).ground(190,251);
  B.coins(6,3,3).row(10,5,'?M?').enemy('rammy',17).sign(21,'These bridges crumble. Run!');
  B.row(25,1,'KKKKKKKKKKKKKKKKKKKKK').coins(27,3,17).enemy('ember',35.5,2,{rise:4,gap:1.6}).enemy('batty',40,7,{rx:3});
  B.enemy('rammy',54).fill(60,2,61,4,BRICK).row(64,5,'B?B').sign(66,'Hop in the pod.').pod(72,3,40,21);
  B.row(84,1,'KKKKKKKK').coins(76,8,3).coins(80,7,2).coins(85,3,6);
  B.checkpoint(96);
  B.row(100,5,'?F?').conveyor(104,114,1,1).enemy('spikit',116).jet(109,2,3,2.4);
  B.row(119,1,'KKKKKK').fall(126,2,3).row(130,1,'KKKKKKKKKK').enemy('ember',128,2,{rise:5,gap:1.5}).coins(120,3,4).coins(131,3,8).shard(127,7);
  B.enemy('rammy',148).row(152,5,'BMB').conveyor(156,166,1,-1).enemy('fizzle',162).warp(144,2,'in');
  B.pod(170,3,42,22).row(182,1,'KKKKKKKK').coins(175,9,3).coins(179,8,2).enemy('ember',180.5,2,{rise:4,gap:1.8});
  B.warp(194,3,'out',true).enemy('rammy',202).fill(208,2,209,4,BRICK).enemy('spikit',213);
  /* two pillars to kick up between */
  B.fill(217,4,217,11,HARD).fill(221,4,221,11,HARD).coinCol(219,4,5).shard(219,10);
  B.stairs(222,6).fill(228,2,228,7,HARD).clear(222,2,222,2);
  B.goal(234);
  /* a magma chamber: belts that run toward a pit, and the shard on the far side */
  B.fill(248,2,251,15,GROUND).ground(252,262).ground(267,277).fill(252,2,252,15,HARD).fill(277,2,277,15,HARD);
  B.warp(254,2,'in',true).warp(273,2,'out').conveyor(257,262,1,1).fall(263,2,3).shard(264,6).coinBox(269,3,271,4).enemy('ember',265.5,2,{rise:3,gap:2});
  return B.L;
}

/* 7-5: the crater rim. Everything the mountain has, closer together: Emberlings and falling ledges, jets on crumbling
   stone, ember chains over belts, and a last climb past flame to the rim. */
function w7l5(){
  const B=LevelBuilder(264,'magma');
  B.ground(0,22).ground(44,66).ground(90,120).ground(150,176).ground(200,263);
  B.coins(6,3,3).row(10,5,'?M?').enemy('spikit',15).jet(19,2,3,2.4);
  B.fall(24,2,3).fall(29,3,3).row(33,3,'KKKK').fall(38,2,3).enemy('ember',27.5,2,{rise:5,gap:1.5}).enemy('ember',36.5,2,{rise:5,gap:1.5,phase:0.7}).coins(34,5,2);
  B.enemy('rammy',52).jet(57,2,3,2.2).jet(61,2,3,2.2,1.1).row(48,5,'B?B');
  B.row(67,1,'KKKKKK').plat(74,2,3,'x',4,1.2).row(82,1,'KKKKKKKK').firebar(79,6,5,1.7).enemy('ember',72.5,2,{rise:4,gap:1.6}).coins(68,3,4).coins(83,3,6);
  B.row(94,5,'?F?').conveyor(98,108,1,-1).firebar(103,6,6,1.5).enemy('clonk',113,7).shard(103,11);
  B.checkpoint(117);
  B.plat(122,2,3,'x',4,1.1).fall(131,3,3).fall(136,4,3).plat(141,3,3,'y',3,1.2).fall(146,2,3).enemy('ember',129,2,{rise:5,gap:1.4}).enemy('ember',134.5,2,{rise:6,gap:1.4,phase:0.6}).enemy('ember',145,2,{rise:5,gap:1.4,phase:1}).coins(123,4,4);
  B.row(154,5,'BMB').enemy('fizzle',158).jet(163,2,4,2.2).jet(166,2,4,2.2,0.7).jet(169,2,4,2.2,1.4).enemy('rammy',173);
  B.row(177,1,'KKKKK').fall(183,2,3).row(187,2,'KKKK').row(192,1,'KKKKKKKK').enemy('ember',185.5,2,{rise:4,gap:1.5}).firebar(190,7,5,-1.8).shard(190,3);
  /* the last climb: a cleft to kick up, with a jet at its foot and a shard for those who climb past the top */
  B.enemy('spikit',206).row(210,5,'?M?').fill(217,4,217,13,HARD).fill(221,2,232,9,GROUND).jet(219,2,3,2.6).coinCol(219,5,6).shard(217,14).enemy('clonk',226,13).enemy('spikit',229,10);
  B.fill(233,2,234,7,HARD).fill(235,2,236,4,HARD);
  B.stairs(238,6).fill(244,2,244,7,HARD);
  B.goal(250);
  return B.L;
}

defWorld({name:'Magma Mountain',theme:'magma',levels:[w7l1,w7l2,w7l3,w7l4,w7l5]});
