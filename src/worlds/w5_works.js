/* ================= World 5: Tick-Tock Works ================= */
/* A clockwork toy factory. Indoors a wall of panels stands close behind the lane, hung with turning cogs, pipes,
   lamps and furnace windows; a level marked `roof` is out on the rooftops instead, with the city behind. This is the
   world of belts, cannons, crushers and flame. */
/* a cogwheel, drawn in tiles around its own middle so it can be turned: slabs that make a disc, and eight teeth */
function w5Cog(r,col){ const b=[], d=shade(col,0.7), s=0.5;
  for(let y=-r;y<r-0.01;y+=s){ const hw=Math.sqrt(Math.max(0,r*r-(y+s/2)*(y+s/2))); b.push([-hw,y,0,2*hw,s,0.5,col]); }
  for(let k=0;k<8;k++){ const a=k*Math.PI/4, cx=Math.cos(a)*(r+0.18), cy=Math.sin(a)*(r+0.18); b.push([cx-0.45,cy-0.45,0.05,0.9,0.9,0.4,col]); }
  const h=r*0.42; for(let y=-h;y<h-0.01;y+=s){ const hw=Math.sqrt(Math.max(0,h*h-(y+s/2)*(y+s/2))); b.push([-hw,y,0.5,2*hw,s,0.14,d]); }
  b.push([-0.35,-0.35,0.64,0.7,0.7,0.14,'#fff0c0']); for(const q of [[1,0],[-1,0],[0,1],[0,-1]]) b.push([q[0]*r*0.72-0.22,q[1]*r*0.72-0.22,0.5,0.44,0.44,0.12,d]);
  return b; }
function w5Turning(boxes,x,y,z,speed,mat){ const m=new T.Mesh(tmpGeo(voxGeo(boxes,1)),mat||MAT.vox); m.position.set(x,y,z); world.add(m); critters.push({tick(dt){ m.rotation.z+=speed*dt; }}); return m; }
/* props, in eighths of a tile */
function dW5Crate(c){ return [[-3,0,-3,6,6,6,c],[-3,0,3,6,0.8,0.15,shade(c,0.7)],[-3,5.2,3,6,0.8,0.15,shade(c,0.7)],[-3,0,3,0.8,6,0.15,shade(c,0.7)],[2.2,0,3,0.8,6,0.15,shade(c,0.7)],[-3,6,-3,6,0.3,6,shade(c,1.2)]]; }
function dW5Barrel(c){ return [[-2.2,0,-2.2,4.4,6,4.4,c],[-2.5,1,-2.5,5,0.7,5,'#5e4a30'],[-2.5,4.3,-2.5,5,0.7,5,'#5e4a30'],[-1.6,6,-1.6,3.2,0.3,3.2,shade(c,1.2)]]; }
function dW5Robot(c){ return [[-2,2,-1.6,4,4,3.2,c],[-1.6,6,-1.4,3.2,2.6,2.8,shade(c,1.15)],[-1.1,6.9,1.4,0.8,0.9,0.15,WHITE],[0.3,6.9,1.4,0.8,0.9,0.15,WHITE],[-0.9,7.1,1.5,0.4,0.5,0.1,INK],[0.5,7.1,1.5,0.4,0.5,0.1,INK],
  [-1.6,0,-1,1.2,2,2,'#5f7080'],[0.4,0,-1,1.2,2,2,'#5f7080'],[-3,3,-0.6,1,2.6,1.2,'#5f7080'],[2,3,-0.6,1,2.6,1.2,'#5f7080'],[-0.2,8.6,-0.2,0.4,1.4,0.4,'#5f7080'],[-0.9,3.4,1.6,1.8,1.2,0.12,'#fff0c0'],[2,5,-2.4,0.8,0.8,1,'#e0a84a']]; }
function dW5Blocks(){ return [[-3,0,-2,3,3,3,'#ff4f7b'],[0.2,0,-2,3,3,3,'#2fd6c3'],[-1.4,3,-2,3,3,3,'#ffd23e'],[-2.2,0.8,1,1.4,1.4,0.12,WHITE],[1,0.8,1,1.4,1.4,0.12,WHITE],[-0.6,3.8,1,1.4,1.4,0.12,WHITE]]; }
function dW5Duck(){ return [[-2,0,-1.6,4,2.4,3.2,'#ffd23e'],[0.2,2.4,-1.2,2,2,2.4,'#ffd23e'],[2.2,2.8,-0.6,1,0.7,1.2,'#ff8f3c'],[1.2,3.4,1.2,0.5,0.6,0.12,INK],[-2.8,1,-1,1,1.4,2,'#ffe680'],[-1.5,0,-2,3,0.4,4,'#ff4f7b']]; }
function dW5Gear(c){ return [[-2.5,0,-2.5,5,0.8,5,c],[-3.2,0,-0.6,6.4,0.8,1.2,c],[-0.6,0,-3.2,1.2,0.8,6.4,c],[-1,0.8,-1,2,0.3,2,shade(c,0.7)]]; }
function dW5Panel(){ return [[-2.4,0,-1,4.8,6.5,2,'#5f7080'],[-2.4,6.5,-1,4.8,0.4,2,'#9fb0c0'],[-1.8,3.4,1,3.6,2.4,0.15,'#2c3545'],[-1.9,0.8,1,0.8,1.6,0.3,'#d5e0ea'],[0,0.8,1,0.8,1.6,0.3,'#d5e0ea']]; }
function dW5Valve(){ return [[-0.6,0,-0.6,1.2,5,1.2,'#d9773f'],[-1,5,-1,2,0.6,2,'#b85a2a'],[-2,5.6,-0.4,4,0.6,0.8,'#ff4f7b'],[-0.4,5.6,-2,0.8,0.6,4,'#ff4f7b']]; }
function dW5Chimney(){ return [[-2,0,-2,4,10,4,'#a8563a'],[-2.6,10,-2.6,5.2,1.4,5.2,'#7d3a24'],[-2.6,3,-2.6,5.2,0.8,5.2,'#7d3a24']]; }
function dW5Vane(){ return [[-0.3,0,-0.3,0.6,9,0.6,'#5f7080'],[-3,7,-0.2,6,0.5,0.4,'#d5e0ea'],[2,6.4,-0.2,1.6,1.7,0.4,'#ff4f7b'],[-0.8,9,-0.8,1.6,1.6,1.6,'#ffd23e']]; }

THEMES.works={ music:'works',
  sky:['#161c2c','#222d44','#33425e'], skyMid:0.5, glowCol:0xffc070, sunGlow:0,
  fog:0x222d44, fogNear:10, fogFar:70,
  hemiSky:0xfff0dc, hemiGround:0x8f7a66, hemiI:0.6, sunI:0.62, sunCol:0xffe8c8, sunDir:[-0.3,0.62,0.72],
  top:'#e6b85a', topS:['#f0c870','#d9a94a','#ecc066'], dirt:'#b07f38', dirtS:['#a07030','#c08f48'], cap:'#f7d88a', capL:'#fff0c0', capD:'#7a5522', stone:true,
  brick:['#d9673f','#9c3f20','#ffa27a'], hard:['#9fb0c0','#d5e0ea','#5f7080'], pipe:['#ff6f91','#ffc2d0','#c93d62','#7a1f3d'],
  semi:'beam', plat:['#3ff0c0','#1a9f83'], dust:'#fff0d0', back:-2.5,
  liquid:{kind:'brass',a:'#ff8a1f',b:'#ffe14d',op:1,mask:0.35,flow:0.5},
  wall:'#34465e', trim:'#e0a84a', bloom:1, hi:0.1,
  looks:[null,
    /* the rooftops at sunset */
    {sky:['#4a3a8c','#e0709a','#ffc070'],fog:0xe8a898,fogNear:14,fogFar:120,sunCol:0xffb88a,hemiSky:0xffe0d0,hemiI:0.6,sunGlow:0.9,glowCol:0xff9060,sunDir:[-0.66,0.42,0.5],
      top:'#c96f52',topS:['#d98062','#b85f44','#d17658'],dirt:'#8a4a36',dirtS:['#7d402e','#99573f'],cap:'#f0a080',capL:'#ffc8a8',capD:'#5e2e20',liquid:{kind:'void'},disc:['#ff9a3d','#ffd27a','#b3520f']},
    /* the packing floor, lit teal */
    {wall:'#2a4a52',trim:'#7ee0c8',hemiSky:0xdcfff4,sunCol:0xe8fff4,fog:0x1f3a40},
    /* the clock room */
    {wall:'#3c3460',trim:'#ffd23e',hemiSky:0xf0e6ff,sunCol:0xfff0d0,fog:0x2a2448,hemiI:0.62,sky:['#0c0a24','#241c52','#4a3a8c'],stars:0.9,fogFar:110},
    /* the boiler rooms */
    {wall:'#45292c',trim:'#ff8a4a',hemiSky:0xffd9c0,hemiGround:0x8a4a3a,sunCol:0xffc8a0,hemiI:0.54,sunI:0.56,fog:0x2c1a1c,bloom:1.15}],
  scenery(S,R){
    const W=S.W, H=S.H, L=S.L, far=S.far, gf=S.glowFar;
    if(L.roof){
      /* out on the roofs: chimneys and clock towers against the sunset, and smoke that drifts */
      for(let x=-50;x<W+50;x+=7+R()*9){ const z=-18-R()*30, w=4+R()*6, h=3+R()*11, c=shade('#5a3f6e',0.7+R()*0.5);
        far.push([x,-6,z,w,h+6,5,c],[x-0.3,h,z-0.3,w+0.6,0.6,5.6,shade(c,0.8)]);
        if(R()<0.45) far.push([x+w*0.2,h+0.6,z+1,1.2,2+R()*3,1.2,shade(c,0.75)]);
        for(let wy=h-2;wy>-3;wy-=2.3) for(let wx=x+0.7;wx<x+w-1;wx+=1.9) if(R()<0.55) gf.push([wx,wy,z+5,0.8,1.1,0.12,pick(R,['#ffd27a','#ffe9a8','#ff9a5a'])]); }
      for(let x=30;x<W;x+=70+R()*40){ const z=-30, c='#6a4a80'; far.push([x,-6,z,6,24,6,c],[x-0.5,18,z-0.5,7,1,7,'#4a3260'],[x+1,19,z+1,4,3,4,c],[x+2.5,22,z+2.5,1,3,1,'#e0a84a']);
        gf.push([x+1.2,12,z+6,3.6,3.6,0.15,'#fff0c0']); far.push([x+2.85,13.8,z+6.2,0.3,1.5,0.1,INK],[x+2.85,13.6,z+6.2,1.2,0.3,0.1,INK]); }
      for(let x=-40;x<W+40;x+=12+R()*12) S.addCloud(x,9+R()*7,-36-R()*30,R,'#ffb89a');
      for(let x=-20;x<W+20;x+=18+R()*20) S.addCloud(x,5+R()*5,-12-R()*5,R,'#8a6a8f',0.5+R()*0.4);
      skyDisc(TH.disc,null,7); S.addMotes(0xffd9a8,40,0.08);
      return;
    }
    const wz=-3.5, wall=TH.wall, trim=TH.trim, cop='#d9773f', wallTop=L.wallTop||H+6;
    if(L.wallTop){ /* above the tower's roof: night, the city's lit windows, and a clock face on the next tower along */
      for(let x=-40;x<W+40;x+=6+R()*8){ const z=-16-R()*26, w=4+R()*6, h=wallTop-8+R()*14, c=shade('#3a3460',0.7+R()*0.5); far.push([x,-6,z,w,h+6,5,c]);
        for(let wy=h-2;wy>wallTop-8;wy-=2.3) for(let wx=x+0.7;wx<x+w-1;wx+=1.9) if(R()<0.5) gf.push([wx,wy,z+5,0.8,1.1,0.12,pick(R,['#ffd27a','#ffe9a8','#9fd4ff'])]); }
      for(let x=-30;x<W+30;x+=14+R()*12) S.addCloud(x,wallTop+5+R()*7,-30-R()*20,R,'#6a6aa8');
    }
    for(let gy=-4;gy<wallTop;gy+=4) for(let gx=-16;gx<W+16;gx+=4) far.push([gx+0.07,gy+0.07,wz-0.7+R()*0.25,3.86,3.86,1,shade(wall,0.84+R()*0.26)]);
    far.push([-16,1.6,wz+0.3,W+32,0.9,0.35,shade(wall,0.6)],[-16,2.5,wz+0.3,W+32,0.18,0.4,trim]);
    /* runs of pipe along the wall, with a flange every few tiles, and down-pipes with dials */
    for(let py=8.4;py<wallTop-2;py+=9){ far.push([-16,py,wz+0.4,W+32,0.5,0.5,cop],[-16,py+1.1,wz+0.4,W+32,0.3,0.3,shade(cop,0.8)]); for(let x=-14;x<W+14;x+=6) far.push([x,py-0.15,wz+0.32,0.4,0.8,0.66,trim]); }
    for(let x=6+R()*8;x<W;x+=13+R()*9){ const y0=2.5, y1=8.4; far.push([x,y0,wz+0.4,0.5,y1-y0,0.5,cop],[x-0.15,y0+1.2,wz+0.3,0.8,0.4,0.7,trim]);
      gf.push([x-0.35,y0+2.6,wz+0.9,1.2,1.2,0.12,'#fff0c0']); far.push([x+0.15,y0+3.1,wz+1.02,0.12,0.55,0.05,'#ff4f7b'],[x-0.45,y0+2.5,wz+0.85,1.4,1.4,0.1,trim]); }
    /* furnace windows that glow, lamps that light the floor, and cogs that turn */
    for(let x=10+R()*6;x<W;x+=17+R()*8){ const y=4+R()*2; far.push([x-0.3,y-0.3,wz+0.3,3.6,3.6,0.4,shade(wall,0.55)],[x+1.35,y,wz+0.75,0.3,3,0.1,shade(wall,0.5)],[x,y+1.35,wz+0.75,3,0.3,0.1,shade(wall,0.5)]);
      gf.push([x,y,wz+0.66,3,3,0.08,pick(R,['#ffb347','#ff9a3d','#ffd27a'])]); lamps.push({x:x+1.5,y:y+1.5,z:-1.6,col:0xffa040,power:0.9,reach:9}); }
    for(let y0=0;y0<wallTop-10;y0+=16) for(let x=4+R()*10;x<W;x+=19+R()*10){ const r=1.8+R()*1.9, cy=y0+6.5+R()*5, c=pick(R,[trim,'#e0a84a','#d9773f','#c9d3e6']), sp=(R()<0.5?-1:1)*(0.35+R()*0.5);
      w5Turning(w5Cog(r,c),x,cy,wz+0.75,sp);
      if(R()<0.6){ const r2=0.9+R()*0.7; w5Turning(w5Cog(r2,shade(c,0.85)),x+r+r2+0.25,cy+(R()-0.5)*1.5,wz+0.75,-sp*r/r2); } }
    if(!L.wallTop) for(let x=5+R()*6;x<W;x+=11+R()*5){ const top=Math.min(H,13), len=1.5+R()*2; far.push([x,top-len,-1.6,0.12,len,0.12,'#2c3545'],[x-0.35,top-len-0.3,-1.95,0.8,0.3,0.8,trim]); gf.push([x-0.22,top-len-0.75,-1.82,0.56,0.5,0.56,'#fff0c0']); lamps.push({x,y:top-len-1,z:-1.2,col:0xffe2a8,power:0.7,reach:8}); }
    /* toy blocks riding a chute across the hall */
    if(!L.wallTop){ const n=Math.ceil(W/9), cols=['#ff4f7b','#2fd6c3','#ffd23e','#b58cff','#7ee0a8'], y=Math.min(H-4,11.4);
      far.push([-16,y-0.3,wz+0.9,W+32,0.25,0.9,shade(wall,0.5)]);
      for(let i=0;i<n;i++){ const m=new T.Mesh(geo('w5toy'+(i%5),()=>[[-0.4,0,-0.4,0.8,0.8,0.8,cols[i%5]],[-0.2,0.2,0.4,0.4,0.4,0.06,WHITE]],1),MAT.vox); m.position.set(i*9+R()*3,y,wz+1.35); world.add(m);
        critters.push({tick(dt,time){ m.position.x+=1.4*dt; if(m.position.x>W+12) m.position.x=-12; m.position.y=y+Math.abs(Math.sin(time*5+i))*0.06; }}); } }
    S.addMotes(0xfff0d0,Math.round(W/4),0.1,-0.5);
  },
  decor(S,D,R){
    const r=R(), y=D.ty*8, roof=S.L.roof;
    if(roof){
      if(r<0.07&&D.free(3)&&D.open) put(S.near,dW5Chimney(),D.jx(),y,D.zb(1.5,2.1));
      else if(r<0.12&&D.free(3)&&D.open) put(S.flora,dW5Vane(),D.jx(),y,D.zb(1.4,2.1),0.25);
      else if(r<0.2) put(S.near,dW5Crate(pick(R,['#8fa0e6','#d99a5b'])),D.jx(),y,D.zb(1.4,2));
      else if(r<0.26) put(S.near,dW5Barrel('#b85a2a'),D.jx(),y,D.zb(1.4,2));
      return;
    }
    if(r<0.07) put(S.near,dW5Crate(pick(R,['#d99a5b','#c98848','#8fa0e6'])),D.jx(),y,D.zb(1.4,2));
    else if(r<0.12) put(S.near,dW5Barrel(pick(R,['#b85a2a','#3f8f9c'])),D.jx(),y,D.zb(1.4,2));
    else if(r<0.17) put(S.near,dW5Robot(pick(R,['#ff8fc7','#5fd0ff','#ffd23e','#7ee0a8'])),D.jx(),y,D.zb(1.4,2.1));
    else if(r<0.22) put(S.near,dW5Blocks(),D.jx(),y,D.zb(1.4,2));
    else if(r<0.26) put(S.near,dW5Duck(),D.jx(),y,D.zb(1.3,2.1));
    else if(r<0.3&&D.free(2)){ put(S.near,dW5Panel(),D.jx(),y,D.zb(1.6,2.1)); const jx=D.jx(); S.glow.push([jx-1.4,y+3.9,-11.6,0.8,0.8,0.2,pick(R,['#7dffb0','#ff4f7b','#ffe14d'])],[jx+0.4,y+3.9,-11.6,0.8,0.8,0.2,pick(R,['#7dffb0','#3ff0ff'])]); }
    else if(r<0.34) put(S.near,dW5Valve(),D.jx(),y,D.zb(1.5,2.1));
    else if(r<0.4) put(S.near,dW5Gear(pick(R,['#e0a84a','#c9d3e6','#d9773f'])),D.jx(),y,D.zb(1.2,2.1));
    const f=R(); if(f<0.08) put(S.near,dW5Gear('#c9d3e6'),D.jx(),y,D.zf()); else if(f<0.13) put(S.near,[[-1,0,-1,2,1.4,2,'#ff4f7b'],[-0.6,1.4,-0.6,1.2,0.6,1.2,'#ffd23e']],D.jx(),y,D.zf());
  }
};

/* 5-1: the belts. Conveyors that help, conveyors that fight back, and the first crusher over one. */
function w5l1(){
  const B=LevelBuilder(262,'works');
  B.room(0,231).room(236,261,0,15,true);
  B.ground(0,44).ground(49,96).ground(101,150).ground(156,235).fill(0,13,235,15,GROUND);
  B.sign(6,'A belt carries whatever stands on it. Walk with it, or run against it.');
  B.conveyor(11,20,1,1).coins(12,3,8).conveyor(24,33,1,-1).row(27,5,'?M?').enemy('spikit',38);
  B.arc(44,4,6);
  /* belts in the air */
  B.conveyor(52,59,4,1).conveyor(63,70,6,-1).coins(53,5,6).coins(64,7,6).shard(71,10).enemy('shellby',56).enemy('blob',66);
  B.conveyor(76,86,1,1).sign(74,'Clonk drops when Blorp passes under. Let him fall, then go.').enemy('clonk',82,7).coins(88,3,4);
  B.row(91,5,'B?B').arc(96,4,6);
  B.conveyor(103,112,1,-1).enemy('spikit',116).enemy('fizzle',121);
  B.checkpoint(125);
  /* a shard over a crusher: his head is safe to bounce on */
  B.conveyor(129,139,1,1).enemy('clonk',134,7).shard(134,12).conveyor(141,150,1,1).coins(143,3,6).arc(150,4,7);
  B.row(160,5,'?B?').enemy('rammy',164).warp(170,2,'in').conveyor(175,184,4,-1).conveyor(175,184,1,1).coins(176,5,8).enemy('clonk',180,9).warp(190,3,'out',true);
  B.row(196,5,'BMB').enemy('fizzle',199).enemy('spikit',203);
  B.stairs(206,6).fill(212,2,212,7,HARD).clear(205,13,231,15);
  B.goal(218);
  /* the stock room: belts that run a ring of coins round and round, and a shard at the top of them */
  B.fill(232,2,235,12,GROUND).ground(236,261).fill(236,2,236,15,HARD).fill(261,2,261,15,HARD).fill(236,13,261,15,GROUND);
  B.warp(238,2,'in',true).warp(257,2,'out').conveyor(242,253,4,1).conveyor(244,251,7,-1).coins(242,5,12).coins(244,8,8).row(247,10,'===').shard(248,11).row(246,2,'<<<<');
  return B.L;
}

/* 5-2: cannon corridor. Out on the roofs at sunset: cannon blocks at every height, and rockets to dodge, to stomp, and
   to use as stepping stones. */
function w5l2(){
  const B=LevelBuilder(282,'works');
  B.set('roof',true).room(0,251).room(256,281,0,15,true);
  B.ground(0,36).ground(40,70).ground(75,104).ground(112,150).ground(155,196).ground(200,255);
  B.sign(8,'Cannons fire rockets. Jump on one: it makes a fine stepping stone.');
  B.coins(12,3,4).cannon(22,2,3.2).row(27,5,'?M?').cannon(34,2,3.4).cannon(34,3,3.4,1.7).arc(36,5,5);
  B.enemy('batty',46,6).fill(52,2,52,3,HARD).cannon(52,4,3).enemy('shellby',58).enemy('fizzle',63).coins(55,3,4);
  B.cannon(77,2,3.3).arc(70,4,6).row(81,5,'B?B').enemy('spikit',85).cannon(92,2,3).cannon(92,3,3,1.5).enemy('rammy',98);
  /* the wide gap: a ledge ferries across, rockets fly over it, and a shard hangs where only a bounce off one will reach */
  B.plat(105,2,3,'x',4,1.1).cannon(113,3,2.6).fill(113,2,113,2,HARD).shard(108,8).coins(106,4,5);
  B.checkpoint(117);
  B.row(122,5,'?B?').enemy('fizzle',126).row(131,4,'===').row(135,6,'===').shard(137,9).coins(131,5,3);
  B.cannon(142,2,3.6).cannon(142,3,3.6,1.2).cannon(142,4,3.6,2.4).enemy('batty',146,8,{rx:2}).arc(150,4,6);
  B.warp(159,2,'in').cannon(168,2,3).enemy('batty',173,7).row(177,5,'BMB').enemy('shellby',180).fill(185,2,185,3,HARD).cannon(185,4,2.8).warp(189,3,'out',true);
  B.arc(196,4,5).cannon(206,2,3).cannon(206,3,3,1.5).enemy('spikit',211).row(214,5,'?');
  B.stairs(222,6).fill(228,2,228,7,HARD);
  B.goal(234);
  /* a walled roof garden: two chimneys to kick up between */
  B.fill(252,2,255,15,GROUND).ground(256,281).fill(256,2,256,15,HARD).fill(281,2,281,15,HARD);
  B.warp(258,2,'in',true).warp(277,2,'out').fill(266,5,266,12,HARD).fill(270,5,270,12,HARD).coinCol(268,4,6).shard(268,11).coinBox(261,3,263,4).coinBox(272,3,274,4).row(262,6,'?I?');
  return B.L;
}

/* 5-3: the crusher line. Clonks in a row over a belt, flame jets between them, and ledges that fall away over the
   brass: a level to be taken in rhythm. */
function w5l3(){
  const B=LevelBuilder(276,'works');
  B.room(0,245).room(250,275,0,15,true);
  B.ground(0,30).ground(36,84).ground(90,128).ground(134,170).ground(176,249).fill(0,13,249,15,GROUND);
  B.sign(5,'Flame jets fire in a rhythm. Count it, then go.');
  B.jet(11,2,3,3).jet(16,2,3,3,1.5).row(20,5,'?M?').enemy('spikit',24);
  B.sign(27,'This ledge drops soon after Blorp lands. Do not dawdle.').fall(31,2,4).coins(32,4,3);
  /* three crushers over one belt */
  B.conveyor(40,57,1,1).enemy('clonk',44,7).enemy('clonk',49,7).enemy('clonk',54,7).coins(59,3,3);
  B.jet(63,2,3,2.8).enemy('clonk',67,7).jet(71,2,3,2.8,1.4).row(75,5,'B?B').shard(76,9).row(75,8,'===').enemy('shellby',79);
  B.fall(85,2,4).coins(86,4,2);
  B.conveyor(94,104,1,-1).enemy('clonk',98,7).enemy('clonk',103,7).enemy('fizzle',108);
  B.checkpoint(112);
  B.spring(115).jet(118,2,4,3).jet(121,2,4,3,1).jet(124,2,4,3,2).row(118,7,'=======').coins(118,8,7);
  B.fall(129,2,2).fall(132,2,2);
  /* the long press: a crusher, a jet, a crusher, a jet; and a shard in a nook that only a bounce off a Clonk's head reaches */
  B.enemy('clonk',138,7).jet(142,2,3,2.6).enemy('clonk',146,7).jet(150,2,3,2.6,1.3).enemy('clonk',154,7).row(149,10,'HHH').shard(150,11);
  B.row(160,5,'?M?').enemy('rammy',164).arc(170,4,7);
  B.warp(180,2,'in').conveyor(186,196,1,-1).enemy('clonk',190,7).jet(199,2,3,2.6).enemy('spikit',204).warp(208,3,'out',true);
  B.stairs(216,6).fill(222,2,222,7,HARD).clear(214,13,245,15);
  B.goal(228);
  /* the boiler cupboard: a ring of jets round a shard */
  B.fill(246,2,249,12,GROUND).ground(250,275).fill(250,2,250,15,HARD).fill(275,2,275,15,HARD).fill(250,13,275,15,GROUND);
  B.warp(252,2,'in',true).warp(271,2,'out').jet(259,2,4,2.4).jet(266,2,4,2.4,1.2).row(261,4,'HHHH').shard(262,5).coins(261,5,4).coinBox(256,3,257,5).coinBox(268,3,269,5);
  return B.L;
}

/* 5-4: the gear tower. Up the inside of the clock tower, floor by floor: a spring, a turning cog, a chimney to kick up,
   a lift, and out onto the roof for the flag. */
function w5l4(){
  const B=LevelBuilder(110,'works',54);
  B.set('wallTop',40).room(0,71,0,53).room(78,109,0,15,true).start(6);
  B.ground(0,71).fill(0,2,3,39,GROUND).fill(68,2,71,39,GROUND);
  B.coins(9,3,4).row(14,5,'?M?').enemy('spikit',22).enemy('shellby',32).enemy('blob',42);
  /* first floor: a spring by the far wall */
  B.fill(4,8,58,9,GROUND).sign(56,'A spring throws Blorp eight tiles up.').spring(64).coinCol(64,5,5);
  B.enemy('fizzle',50,10).enemy('spikit',40,10).row(30,13,'B?B').cannon(13,10,3.2).enemy('shellby',22,10);
  /* second floor: ride the cog up at the near wall */
  B.plat(7,13,3,'c',2.6,1.3).fill(14,16,67,17,GROUND).coins(8,17,3).shard(9,20);
  B.enemy('rammy',26,18).enemy('batty',36,21,{rx:3}).row(42,21,'?F?').warp(49,2,'in',false,18).warp(55,2,'out',true,18).enemy('clonk',60,21.5);
  /* third floor: a chimney by the far wall, with a door half way and a shard for those who kick on past it */
  B.fill(4,24,62,25,GROUND).fill(63,20,63,25,HARD).fill(63,28,63,33,HARD).coinCol(65,19,7).shard(65,31);
  B.checkpoint(58,26).enemy('spikit',50,26).jet(42,26,3,2.8).jet(36,26,3,2.8,1.4).enemy('fizzle',28,26).row(20,29,'BMB').enemy('shellby',14,26);
  /* fourth floor: a lift at the near wall */
  B.plat(5,26,3,'y',6,1.1).fill(12,32,62,33,GROUND).coins(5,34,3);
  B.enemy('clonk',22,36).cannon(40,34,3).enemy('rammy',50,34).row(30,37,'?').spring(60,34).coinCol(60,36,5);
  /* the roof, under the stars */
  B.fill(8,38,56,39,GROUND).enemy('batty',44,43,{rx:3});
  B.goal(22,40);
  /* a clock-winder's cupboard at the end of the pipe on the second floor: a cog to ride up to the shard */
  B.fill(72,0,77,53,GROUND).ground(78,109).fill(78,2,78,15,HARD).fill(109,2,109,15,HARD).fill(78,13,109,15,GROUND);
  B.warp(80,2,'in',true).warp(105,2,'out').plat(92,6,3,'c',2.4,1.6).shard(93,11).coinBox(85,3,88,4).coinBox(98,3,101,4);
  return B.L;
}

/* 5-5: the furnace. Belts over the fire, jets, cannons and crushers, each a little closer together than is comfortable,
   and a long last climb. */
function w5l5(){
  const B=LevelBuilder(304,'works');
  B.room(0,273).room(278,303,0,15,true);
  B.ground(0,26).ground(60,84).ground(118,150).ground(180,277).fill(0,13,277,15,GROUND);
  B.coins(6,3,3).row(10,5,'?M?').enemy('spikit',15).jet(20,2,3,2.6).enemy('fizzle',23);
  /* belts over the fire */
  B.conveyor(29,36,2,1).conveyor(40,47,3,-1).conveyor(51,57,2,1).coins(30,4,6).coins(41,5,6).coins(52,4,5).enemy('batty',44,8,{rx:3});
  B.cannon(64,2,3).cannon(64,3,3,1.5).enemy('clonk',70,7).jet(75,2,3,2.4).row(78,5,'B?B').enemy('clonk',81,7);
  /* falling ledges, with rockets across the last of them */
  B.fall(86,2,3).fall(91,3,3).fall(96,4,3).conveyor(101,108,4,1).fall(111,3,3).fall(115,2,2).fill(119,2,119,3,HARD).cannon(119,4,2.8).coins(87,4,2).coins(97,6,2).shard(104,9);
  B.checkpoint(124);
  B.row(128,5,'?F?').enemy('rammy',132).jet(138,2,4,2.4).jet(141,2,4,2.4,0.8).jet(144,2,4,2.4,1.6).enemy('spikit',148);
  /* the fire walk: belts that run the wrong way under crushers, over the brass, with an ember chain between them */
  B.conveyor(153,161,2,-1).enemy('clonk',157,8).firebar(164,7,5,1.8).conveyor(167,176,2,-1).enemy('clonk',171,8).enemy('clonk',175,8);
  B.row(184,5,'BMB').enemy('fizzle',187).warp(192,2,'in').cannon(198,2,2.8).cannon(198,3,2.8,1.4).jet(203,2,3,2.2).enemy('clonk',207,7).jet(211,2,3,2.2,1.1).warp(215,3,'out',true);
  /* the last climb: kick up the flue, with a jet at the foot of it; the second shard sits on top of the flue's wall */
  B.fill(222,4,222,11,HARD).fill(226,2,235,8,GROUND).jet(224,2,3,2.8).coinCol(224,5,5).row(229,12,'?').enemy('spikit',231,9).shard(222,12).clear(218,13,273,15);
  B.fill(236,2,237,6,HARD).fill(238,2,239,4,HARD);
  B.stairs(244,6).fill(250,2,250,7,HARD);
  B.goal(256);
  /* the ash pit: a shard walled up in bricks. A big Blorp can pound in from the top; a small one needs a Fizzle. */
  B.fill(274,2,277,12,GROUND).ground(278,303).fill(278,2,278,15,HARD).fill(303,2,303,15,HARD).fill(278,13,303,15,GROUND);
  B.warp(280,2,'in',true).warp(299,2,'out').fill(290,2,293,5,BRICK).clear(291,2,292,3).shard(291,2).enemy('fizzle',285).enemy('fizzle',287).coinBox(295,3,297,4).sign(282,'Stomp a Fizzle to light him, and leave him by the bricks.');
  return B.L;
}

defWorld({name:'Tick-Tock Works',theme:'works',levels:[w5l1,w5l2,w5l3,w5l4,w5l5]});
