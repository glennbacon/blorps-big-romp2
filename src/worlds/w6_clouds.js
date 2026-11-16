/* ================= World 6: Cloud Nine ================= */
/* Islands in the sky. There is nothing underneath: the pits are open air, and a fall is the end. This is the world of
   candyfloss, which gives a second jump and a glide; of rising winds that carry Blorp up; and of Zappy the storm cloud.
   Every level can be finished without candyfloss: gliding only makes it easier, and opens the secrets. */
function dW6Pinwheel(c){ return [[-0.3,0,-0.3,0.6,7,0.6,'#f4ead0'],[-2.4,6.4,0,2.4,0.9,0.3,c],[0,7,0,2.4,0.9,0.3,WHITE],[-0.45,7,0,0.9,2.4,0.3,c],[-0.45,4.6,0,0.9,2.4,0.3,WHITE],[-0.5,6.4,0.3,1,1,0.3,'#ffd23e']]; }
function dW6Grass(){ const g='#7fe06a',d='#55c94f'; return [[-1.8,0,0,0.7,3.4,0.7,d],[-0.6,0,0.3,0.7,5,0.7,g],[0.6,0,-0.2,0.7,4,0.7,d],[1.7,0,0.2,0.6,2.6,0.6,g]]; }
function dW6Bush(c){ const g='#55c94f',l='#8ff07f'; return [[-3,0,-2,6,3,4,g],[-2,3,-1.4,4,1.4,2.8,l],[-2.2,1.4,2,1,1,0.4,c],[0.8,2,2,1,1,0.4,c],[-0.4,0.6,2,1,1,0.4,c],[2.2,2.6,-0.4,0.9,0.9,0.9,c]]; }
function dW6Shrine(){ const s='#e6f0ff',d='#a9c0e6'; return [[-3,0,-2.5,6,1,5,d],[-2.4,1,-2,0.9,5,0.9,s],[1.5,1,-2,0.9,5,0.9,s],[-2.4,1,1.1,0.9,5,0.9,s],[1.5,1,1.1,0.9,5,0.9,s],[-3.2,6,-2.7,6.4,1,5.4,'#ff8fc7'],[-2.2,7,-1.8,4.4,0.9,3.6,'#ff8fc7'],[-0.6,1,-0.6,1.2,1.6,1.2,'#ffd23e']]; }
function dW6Mill(c){ const w='#fff6e6', b=[[-2.5,0,-2.5,5,9,5,w],[-2,9,-2,4,3,4,w],[-3,12,-3,6,1.2,6,c],[-2,13.2,-2,4,1.2,4,c],[-0.8,3,2.5,1.6,3,0.2,'#8a5a3c'],[-0.5,9.5,2,1,1,1.4,'#8a5a3c']];
  for(const q of [[1,0],[-1,0],[0,1],[0,-1]]) b.push([q[0]*4-(q[0]?2.5:0.5),10+q[1]*4-(q[1]?2.5:0.5),3.4,q[0]?5:1,q[1]?5:1,0.3,'#ffe9c2']); return b; }
function dW6Vane(){ return [[-0.3,0,-0.3,0.6,9,0.6,'#a9c0e6'],[-3,7.6,-0.2,6,0.5,0.4,'#e6f0ff'],[2,7,-0.2,1.6,1.7,0.4,'#ff4f7b'],[-0.7,9,-0.7,1.4,1.4,1.4,'#ffd23e']]; }
function dW6Puff(){ return [[-3,0,-2,6,1.6,4,WHITE],[-1.8,1.6,-1.4,3.6,1.2,2.8,WHITE],[-1.2,0.5,2,0.6,0.7,0.12,INK],[0.6,0.5,2,0.6,0.7,0.12,INK]]; }
/* a floating island far off, a bank of cloud, and a rainbow: all in tiles */
function w6Isle(far,x,y,z,w,R){ const g=pick(R,['#7fe06a','#6fd65e','#8fe87a']), c=pick(R,['#f0e2c4','#e6d6b4']);
  far.push([x-w/2,y,z-w*0.3,w,0.8,w*0.6,g],[x-w*0.42,y-1.6,z-w*0.25,w*0.84,1.6,w*0.5,c],[x-w*0.3,y-3.4,z-w*0.2,w*0.6,1.8,w*0.4,shade(c,0.9)],[x-w*0.15,y-5,z-w*0.12,w*0.3,1.6,w*0.24,shade(c,0.8)]);
  if(R()<0.6) far.push([x-0.3,y+0.8,z,0.6,2.4,0.6,'#a5642f'],[x-1.6,y+3,z-1.2,3.2,2,2.4,pick(R,['#ff8fc7','#ffd23e','#5fe0d0'])]);
  return [x+w*0.3,y]; }
function w6Bank(list,x0,x1,y,z,d,R,c){ for(let x=x0;x<x1;){ const w=5+R()*7, h=1.2+R()*1.6; list.push([x,y-6,z-d,w,6+h,d,c]); if(R()<0.6) list.push([x+w*0.2,y+h,z-d*0.8,w*0.5,0.7+R()*0.8,d*0.6,c]); x+=w*0.82; } }
function w6Rainbow(list,cx,cy,z,r){ const cols=['#ff5a5f','#ffa23e','#ffe14d','#6fe06a','#4db8ff','#9b6de5'];
  cols.forEach((c,k)=>{ const rr=r-k*0.9; for(let i=0;i<=26;i++){ const a=Math.PI*i/26; list.push([cx+Math.cos(a)*rr-0.9,cy+Math.sin(a)*rr-0.45,z,1.8,0.9,0.4,c]); } }); }

THEMES.clouds={ music:'clouds',
  sky:['#2f86f0','#8fd0ff','#fff3e0'], skyMid:0.48, glowCol:0xfff3c0, sunGlow:0.9,
  fog:0x9fd0fa, fogNear:22, fogFar:170,
  hemiSky:0xffffff, hemiGround:0xc9d9f0, hemiI:0.66, sunI:0.62, sunCol:0xfff6e0, sunDir:[-0.42,0.78,0.5],
  top:'#7fe06a', topS:['#8ff07f','#6fd65e','#9af58a','#74dc64'], dirt:'#f0e2c4', dirtS:['#e6d6b4','#f7ecd4','#dccaa4'], cap:'#7fe06a', capL:'#b4f59a', capD:'#4aa84a',
  brick:['#ff9ec4','#d05a8a','#ffd0e4'], hard:['#e6f0ff','#ffffff','#a9c0e6'], pipe:['#ffc928','#fff0a8','#c98a00','#6b4a00'],
  semi:'cloud', plat:['#ffd166','#d98f24'], dust:'#ffffff', back:-4, fringe:['#7fe06a','#55c94f','#b4f59a'],
  liquid:{kind:'void'}, disc:['#ffe14d','#fff3a0','#e08a12'], cloud:'#ffffff', bank:'#f4faff', bloom:0.85, hi:0.1,
  looks:[null,
    {sky:['#5a9cf5','#c2e4ff','#ffe9f4'],fog:0xb8d8ff,bank:'#fff4fb',deep:'#7fb0f0',rainbows:3},
    {sky:['#f08a5c','#ffc890','#fff0c2'],fog:0xffe0bc,sunCol:0xffc890,hemiSky:0xffe6d0,glowCol:0xffa060,sunDir:[-0.66,0.45,0.5],disc:['#ff9a3d','#ffd27a','#b3520f'],cloud:'#ffd9c0',bank:'#ffe2c8',deep:'#e08a6a'},
    {sky:['#2a3350','#55607f','#8a94aa'],fog:0x6a7490,fogFar:110,hemiSky:0xc9d4f0,hemiGround:0x6a7490,hemiI:0.6,sunI:0.5,sunCol:0xd0dcff,sunGlow:0.2,cloud:'#7a84a2',bank:'#8a94b0',deep:'#3a4460',storm:true},
    {sky:['#241a4a','#5a3a7a','#c96a6a'],fog:0x6a4a80,fogFar:120,hemiSky:0xe0c8ff,hemiGround:0x6a4a80,hemiI:0.58,sunI:0.56,sunCol:0xffc0a0,glowCol:0xff7a5a,sunDir:[-0.6,0.5,0.5],disc:['#ff7a4d','#ffb37a','#a8320f'],cloud:'#8a6aa0',bank:'#9a7ab0',deep:'#3a2a5a',storm:true,stars:0.4}],
  scenery(S,R){
    const W=S.W, H=S.H, far=S.far, soft=S.soft, bank=TH.bank;
    /* the sea of cloud: one bank in front of the lane's feet, one close behind, and others out to the horizon */
    const deep=TH.deep||'#5fa8ea';
    w6Bank(far,-30,W+30,-0.1,2.6,0.9,R,bank); w6Bank(far,-30,W+30,0.3,-4.3,2.5,R,mixc(bank,deep,0.1));
    [[-9,0.7],[-16,1],[-26,1.3],[-40,1.6],[-60,2]].forEach((q,k)=>w6Bank(far,-60,W+60,q[1],q[0],5,R,mixc(bank,deep,0.16+k*0.08)));
    far.push([-80,-9,-90,W+160,9.6,86,mixc(bank,deep,0.4)]);
    /* far islands, each with a waterfall that spills into nothing; towers of cumulus; rainbows */
    for(let x=-30;x<W+30;x+=22+R()*26){ const z=-18-R()*34, y=4+R()*9, e=w6Isle(far,x,y,z,6+R()*8,R); if(R()<0.5) S.glowFar.push([e[0],y-7,z+1.5,0.7,7.4,0.3,'#bfeaff']); }
    for(let x=-50;x<W+50;x+=30+R()*30){ const z=-64-R()*16; let w=16+R()*12, y=2; for(let k=0;k<5;k++){ far.push([x-w/2,y,z,w,3.4,6,TH.cloud]); y+=3.4; w*=0.74; } }
    for(let i=0;i<(TH.rainbows||1);i++) w6Rainbow(soft,W*(i+0.5)/(TH.rainbows||1)+(R()-0.5)*20,1,-58,20+R()*8);
    for(let x=-50;x<W+50;x+=8+R()*9) S.addCloud(x,5+R()*(H-4),-10-R()*46,R,TH.cloud==='#ffffff'?undefined:TH.cloud);
    for(let x=10;x<W;x+=40+R()*30) S.addCloud(x,3+R()*3,-5.6,R,TH.cloud==='#ffffff'?undefined:TH.cloud,0.6);
    if(!TH.storm||TH.stars) skyDisc(TH.disc,null,14.5);
    /* balloons that drift and bob, and birds */
    for(let i=0;i<Math.ceil(W/50);i++){ const c=pick(R,['#ff4f7b','#ffd23e','#2fd6c3','#b58cff']), c2=pick(R,[WHITE,'#fff0a8']);
      const m=new T.Mesh(tmpGeo(voxGeo([[-1.5,2,-1.5,3,3,3,c],[-1.2,5,-1.2,2.4,0.8,2.4,c],[-1.2,1.2,-1.2,2.4,0.8,2.4,c],[-1.55,3,-0.5,3.1,1,1,c2],[-0.5,3,-1.55,1,1,3.1,c2],[-0.5,-0.4,-0.5,1,0.8,1,'#b07f48'],[-0.45,0.4,-0.05,0.1,0.9,0.1,INK],[0.35,0.4,-0.05,0.1,0.9,0.1,INK]],1)),MAT.vox);
      const z=-12-R()*26, y0=7+R()*8, v=(R()<0.5?-1:1)*(0.25+R()*0.4), ph=R()*9; m.position.set(R()*W,y0,z); world.add(m);
      critters.push({tick(dt,time){ m.position.x+=v*dt; if(m.position.x>W+40) m.position.x=-40; else if(m.position.x<-40) m.position.x=W+40; m.position.y=y0+Math.sin(time*0.6+ph)*0.7; m.rotation.z=Math.sin(time*0.8+ph)*0.05; }}); }
    for(let i=0;i<Math.ceil(W/36);i++){ const g=new T.Group(), wl=new T.Mesh(geo('w6bL',()=>[[-4,0,-0.8,4,0.5,1.6,'#3a4a6a']]),MAT.soft), wr=new T.Mesh(geo('w6bR',()=>[[0,0,-0.8,4,0.5,1.6,'#3a4a6a']]),MAT.soft);
      g.add(new T.Mesh(geo('w6b',()=>[[-0.8,-0.5,-1.8,1.6,1.1,3.6,'#3a4a6a'],[-0.4,-0.2,1.8,0.8,0.5,0.8,'#ffb347']]),MAT.soft),wl,wr);
      const z=-8-R()*14, y0=8+R()*(H-9), v=2+R()*1.6, ph=R()*9; g.position.set(R()*W,y0,z); g.rotation.y=Math.PI/2; world.add(g);
      critters.push({tick(dt,time){ g.position.x+=v*dt; if(g.position.x>W+30) g.position.x=-30; g.position.y=y0+Math.sin(time*0.7+ph)*0.8; const f=Math.sin(time*8+ph)*0.6; wl.rotation.z=-f; wr.rotation.z=f; }}); }
    S.addMotes(0xffffff,TH.storm?90:40,TH.storm?0.1:0.08,TH.storm?1.4:0);
  },
  decor(S,D,R){
    const r=R(), y=D.ty*8;
    if(r<0.05&&D.free(3)&&D.open) put(S.flora,dW6Mill(pick(R,['#ff4f7b','#5fd0ff','#ffd23e'])),D.jx(),y,D.zb(2.2,3.2),0.12);
    else if(r<0.1&&D.free(2)&&D.open) put(S.flora,dW6Vane(),D.jx(),y,D.zb(1.5,3.4),0.3);
    else if(r<0.14) put(S.near,dW6Shrine(),D.jx(),y,D.zb(2,3.2));
    else if(r<0.24) put(S.flora,dW6Pinwheel(pick(R,['#ff4f7b','#5fd0ff','#ffd23e','#b58cff'])),D.jx(),y,D.zb(1.3,3.6),2.4);
    else if(r<0.34) put(S.near,dW6Bush(pick(R,['#ff8fc7','#b58cff','#ffd23e'])),D.jx(),y,D.zb(1.4,3.5));
    else if(r<0.52) put(S.flora,dW6Grass(),D.jx(),y,D.zb(1.2,3.7),2.6);
    else if(r<0.6) put(S.near,dFlower(pick(R,['#ff8fc7','#ffffff','#ffe14d'])),D.jx(),y,D.zb(1.2,3.6));
    else if(r<0.65) put(S.near,dW6Puff(),D.jx(),y,D.zb(1.5,3.5));
    const f=R(); if(f<0.14) put(S.near,dFlower(pick(R,['#ff8fc7','#ffffff'])),D.jx(),y,D.zf()); else if(f<0.2) put(S.near,dRock('#e6f0ff'),D.jx(),y,D.zf());
  }
};

/* 6-1: cloud hopping. Islands, cloud ledges and springs, and the first candyfloss, over a long gap where gliding is
   simply a joy (and stepping stones for those who would rather walk). */
function w6l1(){
  const B=LevelBuilder(254,'clouds');
  B.room(0,223).room(228,253,0,15,true);
  B.ground(0,26).ground(32,50).ground(58,74).ground(104,130).ground(138,160).ground(170,227);
  B.sign(5,'Mind the edge: there is nothing down there but sky.').coins(8,3,3).row(12,5,'?M?').enemy('blob',17).enemy('boing',22).arc(26,4,7);
  B.row(36,5,'B?B').enemy('batty',41,7,{rx:2.5}).spring(46).row(49,8,'====').coins(49,9,4).shard(51,12).row(53,2,'===').coins(54,4,1);
  B.enemy('blob',62).sign(64,'Candyfloss! Jump again in the air, and hold {jump} to glide.').row(67,5,'BFB');
  /* the long gap: stepping stones below, and coins strung along the glide above */
  B.row(77,3,'===').row(83,5,'===').row(89,3,'===').row(95,5,'===').row(100,3,'===');
  for(let i=0;i<13;i++) B.coins(77+i*2,10-Math.round(i*0.35),1);
  B.checkpoint(108);
  B.row(112,5,'?F?').enemy('prickle',118).enemy('boing',124).sign(127,'This ledge drops soon after Blorp lands.').fall(132,2,4);
  B.sign(140,'Zappy drops bolts. He can be stomped, by anyone who gets above him.').enemy('zappy',148,7,{rx:5}).spring(152).row(155,5,'B?B').enemy('batty',158,9,{rx:2});
  /* a shard high over the gap, for a second jump */
  B.row(163,2,'====').shard(165,10,'fluff').coins(163,4,4);
  B.row(175,5,'?F?').enemy('blob',179).warp(183,2,'in').enemy('boing',189).warp(194,3,'out',true);
  B.stairs(198,6).fill(204,2,204,7,HARD);
  B.goal(210);
  /* a cloud garden: springs, and a shard at the top of the tallest bounce */
  B.fill(224,2,227,15,GROUND).ground(228,253).fill(228,2,228,15,HARD).fill(253,2,253,15,HARD);
  B.warp(230,2,'in',true).warp(249,2,'out').spring(237).spring(243).row(239,9,'===').shard(240,13).coinCol(237,4,5).coinCol(243,4,5).coins(239,10,3);
  return B.L;
}

/* 6-2: updraft alley. Rising winds that lift Blorp from island to island, a gust that carries a jump further, and a
   gentler wind that only a glider can ride. */
function w6l2(){
  const B=LevelBuilder(252,'clouds',26);
  B.room(0,221,0,25).room(226,251,0,15,true);
  B.ground(0,24).ground(54,76).ground(90,120).ground(166,225);
  B.coins(6,3,3).row(10,5,'?M?').enemy('blob',15).sign(18,'A rising wind. Jump in, and let it carry you up.');
  B.wind(26,2,29,13,0,110).coinCol(27,4,7).fill(31,8,48,9,GROUND).row(36,13,'?F?').enemy('blob',42,10).enemy('boing',46,10).shard(33,15);
  B.row(50,6,'==').coins(50,7,2).enemy('prickle',60).row(64,5,'B?B').enemy('batty',69,7,{rx:2.5});
  /* a tailwind over a wide gap, with a stone in the middle for the cautious */
  B.sign(72,'A gust! Jump, and it carries you further.').wind(77,2,89,10,16,0).row(81,2,'====').coins(78,5,10);
  B.checkpoint(94);
  B.row(98,5,'?F?').enemy('zappy',104,8,{rx:5}).sign(107,'A gentle wind lifts only a glider: hold {jump} in it.');
  B.wind(110,2,113,16,0,60).shard(111,16,'fluff').coinCol(111,5,9).enemy('boing',117);
  /* two lifts, one above the other */
  B.wind(122,2,125,13,0,110).fill(127,9,137,10,GROUND).enemy('prickle',132,11).coins(128,12,3);
  B.wind(139,11,142,21,0,110).fill(144,16,160,17,GROUND).row(148,21,'?M?').enemy('zappy',152,22,{rx:5}).warp(156,2,'in',false,18).coins(161,14,3).coins(163,10,2).coins(165,6,2);
  B.enemy('boing',172).warp(176,3,'out',true).enemy('prickle',181).sign(183,'A headwind. Run at it.').wind(185,2,195,9,-13,0).coins(186,3,8);
  B.stairs(198,6).fill(204,2,204,7,HARD);
  B.goal(210);
  /* a wind chimney: a gentle wind, a ring of coins, and the shard at the top for a glider (or a wall kicker) */
  B.fill(222,2,225,15,GROUND).ground(226,251).fill(226,2,226,15,HARD).fill(251,2,251,15,HARD);
  B.warp(228,2,'in',true).warp(247,2,'out').fill(235,5,235,12,HARD).fill(239,5,239,12,HARD).wind(236,2,238,13,0,60).coinCol(237,3,8).shard(237,12).coinBox(241,3,244,4);
  return B.L;
}

/* 6-3: the rainbow bridge. Hardly any ground at all: bridges of cloud brick that crumble, ledges that fall, ledges
   that slide, and Zappys overhead. */
function w6l3(){
  const B=LevelBuilder(232,'clouds');
  B.ground(0,20).ground(96,116).ground(188,231);
  B.coins(6,3,3).row(10,5,'?M?').enemy('blob',15).sign(18,'Cloud bricks crumble underfoot. Do not stop.');
  B.row(21,1,'KKKKKKKKKKKK').coins(22,3,10).fall(34,2,3).fall(39,3,3).row(44,3,'KKKKKK').coins(45,5,4).enemy('zappy',40,9,{rx:6});
  B.plat(51,3,3,'x',5,1.1).row(61,2,'KKKKK').row(66,2,'===').shard(67,7).row(64,5,'?').coins(52,5,5);
  B.fall(70,2,3).fall(75,2,3).row(80,1,'KKKKKKK').plat(88,2,3,'x',4,1.2).enemy('batty',84,6,{rx:3}).coins(81,3,5);
  B.checkpoint(100);
  B.row(104,5,'?F?').enemy('boing',109).enemy('prickle',113);
  B.row(117,1,'KKKKKKKK').enemy('zappy',124,8,{rx:6}).fall(126,2,3).fall(131,3,3).fall(136,4,3).row(141,4,'KKKKKK').coins(142,6,4);
  /* a shard under the bridge: drop to the ledge below, and spring back */
  B.row(146,1,'=====').shard(147,2).spring(150,2).coins(150,5,1);
  B.plat(152,3,3,'y',3,1.2).row(157,5,'KKKKK').plat(163,4,3,'x',5,1).row(172,3,'KKKKK').fall(178,2,3).fall(183,2,3).enemy('zappy',170,10,{rx:7}).coins(158,7,3).coins(173,5,3);
  /* a high shard over the last bridge, for a second jump */
  B.shard(175,11,'fluff');
  B.row(192,5,'B?B').enemy('blob',196).enemy('boing',200);
  B.stairs(204,6).fill(210,2,210,7,HARD);
  B.goal(216);
  return B.L;
}

/* 6-4: storm front. Zappys in pairs, cannons on the islands, a headwind, a climb up a thunderhead, and a long way down
   the far side (a glide, for those who kept their candyfloss; a stair, for those who did not). */
function w6l4(){
  const B=LevelBuilder(258,'clouds',32);
  B.room(0,227,0,31).room(232,257,0,15,true);
  B.ground(0,30).ground(36,60).ground(66,96).ground(140,231);
  B.coins(6,3,3).row(10,5,'?M?').enemy('zappy',16,8,{rx:5}).enemy('boing',20).cannon(26,2,3.2).arc(30,4,7);
  B.enemy('zappy',42,8,{rx:5}).enemy('zappy',52,10,{rx:5}).row(46,5,'B?B').enemy('prickle',56).arc(60,4,7);
  B.cannon(70,2,3).cannon(70,3,3,1.5).wind(74,2,86,8,-11,0).sign(72,'A headwind, and rockets with it.').cannon(90,2,2.8).row(80,5,'?F?');
  /* the thunderhead: cloud ledges up into the storm */
  B.checkpoint(93);
  B.row(98,4,'===').row(103,7,'===').row(98,10,'===').row(104,13,'====').row(110,16,'===').row(116,19,'=====').coins(98,5,3).coins(103,8,3).coins(98,11,3).coins(105,14,2).coins(110,17,3);
  B.enemy('zappy',108,22,{rx:6}).enemy('batty',112,12,{rx:3}).row(118,23,'?F?').shard(123,24);
  /* down the far side: a stair of cloud, and above it a long glide marked out in coins */
  B.row(124,16,'===').row(129,13,'===').row(134,10,'===').row(138,7,'===').row(140,4,'==');
  for(let i=0;i<10;i++) B.coins(124+i*3,21-i*2,1);
  B.shard(146,22,'fluff').wind(144,2,147,20,0,60);
  B.enemy('boing',150).cannon(156,2,3).enemy('zappy',162,8,{rx:5}).row(166,5,'B?B').warp(172,2,'in').enemy('prickle',178).enemy('zappy',184,9,{rx:5}).warp(190,3,'out',true);
  B.cannon(196,2,3).cannon(196,3,3,1.5).enemy('blob',202);
  B.stairs(206,6).fill(212,2,212,7,HARD);
  B.goal(218);
  /* the eye of the storm: a quiet room, a spring, and a shard */
  B.fill(228,2,231,15,GROUND).ground(232,257).fill(232,2,232,15,HARD).fill(257,2,257,15,HARD);
  B.warp(234,2,'in',true).warp(253,2,'out').spring(244).row(240,8,'===').row(247,8,'===').shard(244,13).coins(240,9,3).coins(247,9,3).coinCol(244,4,6);
  return B.L;
}

/* 6-5: Lord Zappa. A short stormy run, then the thunder king: he rides high out of reach, calls down bolts onto marked
   spots, and then sinks low to gloat. That is when to stomp him. */
function w6l5(){
  const B=LevelBuilder(178,'clouds');
  B.ground(0,28).ground(34,60).ground(66,177);
  B.coins(6,3,3).row(10,5,'?M?').enemy('zappy',17,8,{rx:5}).enemy('boing',22).arc(28,4,7);
  B.row(38,5,'B?B').cannon(44,2,3).enemy('zappy',50,9,{rx:5}).spring(54).row(56,9,'===').shard(57,13).arc(60,4,7);
  /* a blue stair that a switch builds */
  B.row(70,5,'X').row(74,4,'U').row(77,6,'U').row(80,8,'UU').shard(81,10).coins(74,5,1).coins(77,7,1);
  B.fill(86,4,86,11,HARD).fill(90,4,90,11,HARD).coinCol(88,4,5).shard(88,10).enemy('prickle',96);
  B.checkpoint(104);
  B.row(108,5,'?F?').row(112,5,'M').sign(115,'Lord Zappa! Keep off the sparks on the ground, and stomp him when he comes down.');
  B.fill(161,2,177,13,GROUND);
  B.boss(144,122,157,12,'zappa');
  return B.L;
}

defWorld({name:'Cloud Nine',theme:'clouds',levels:[w6l1,w6l2,w6l3,w6l4,w6l5]});
