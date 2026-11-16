/* ================= World 4: Spooky Hollow ================= */
/* A haunted wood at night, playful-spooky. The moon is gone, so the light comes from what glows: lanterns on crooked
   posts, pumpkins, candles on gravestones, mushrooms, will-o'-wisps and the green bog in the pits (deadly). The world of
   Shyde the ghost, who creeps up while Blorp's back is turned, of Fizzle the walking bomb, and of the red and blue switch. */
function dHollowTree(R){ const t='#4a4070',t2='#5a4f86',b=[],leaf=['#d9742a','#b8502a','#e0a83a']; let x=0,y=0; const n=5+((R()*3)|0);
  for(let i=0;i<n;i++){ const w=3.4-i*0.32; b.push([x-w/2,y,-w/2,w,3.3,w,i%2?t:t2]); x+=(i%2?1:-1)*(0.5+R()*0.9); y+=3; }
  for(const s of [-1,1,R()<0.5?-1:1]){ let bx=x*0.6,by=y*(0.5+R()*0.32); const len=3+((R()*3)|0);
    for(let k=0;k<len;k++){ b.push([s>0?bx:bx-2.4,by,-0.7,2.4,1.3,1.4,k%2?t:t2]); bx+=s*2.2; by+=0.9+R()*1.3; }
    b.push([bx-0.6,by,-0.5,1.2,2.8,1,t2]);
    if(R()<0.85) b.push([bx-0.3+s*-1.8,by-2.2,-0.2,0.8,1.7,0.4,pick(R,leaf)]);
    if(R()<0.5) b.push([bx-0.2,by-1.9,0,0.8,1.5,0.4,pick(R,leaf)]); }
  b.push([x-0.7,y,-0.7,1.4,3,1.4,t],[x-2.8,y+1.8,-0.5,2.4,1,1,t2],[x+0.6,y+2.4,-0.5,2.6,1,1,t],[x-3.2,y+2.8,-0.4,0.9,2.4,0.8,t2],[x+2.6,y+3.4,-0.4,0.9,2.6,0.8,t],[x-0.4,y+3,-0.4,0.8,2.2,0.8,t2]);
  return b; }
function dHollowLantern(){ const p='#5a4f86',q='#4a4070',i='#2a2548'; return [[-0.7,0,-0.7,1.4,5,1.4,q],[-0.3,5,-0.6,1.2,4.6,1.2,p],[-0.9,9.6,-0.6,1.2,3.6,1.2,q],[-0.9,12.4,-0.5,4.8,0.9,1,p],[-1.4,0,-1.2,2.8,0.8,2.4,i],
  [2.5,11.5,-0.2,0.4,0.9,0.4,i],[1.5,10.8,-1.2,2.4,0.7,2.4,i],[1.9,11.5,-0.8,1.6,0.5,1.6,i],[1.6,7.7,-1.1,0.3,3.1,0.3,i],[3.6,7.7,-1.1,0.3,3.1,0.3,i],[1.6,7.7,0.8,0.3,3.1,0.3,i],[3.6,7.7,0.8,0.3,3.1,0.3,i],[1.5,7.1,-1.2,2.4,0.6,2.4,i]]; }
function dHollowLanternLit(){ return [[1.9,7.7,-0.8,1.6,3.1,1.6,'#ffc85a'],[2.3,8.3,-0.4,0.8,1.6,1.3,'#fff0b0']]; }
function dHollowPumpkin(s){ const c='#f0831f',d='#c45c12'; return [[-2.4*s,0,-2*s,4.8*s,3.4*s,4*s,c],[-3*s,0.5*s,-1.6*s,6*s,2.4*s,3.2*s,c],[-1.3*s,3.4*s,-1.6*s,0.5*s,0.14,3.2*s,d],[0.8*s,3.4*s,-1.6*s,0.5*s,0.14,3.2*s,d],
  [-0.4*s,3.4*s,-0.4*s,0.8*s,1.1*s,0.8*s,'#5f8a3a'],[0.2*s,4.2*s,-0.4*s,0.9*s,0.5*s,0.8*s,'#5f8a3a']]; }
function dHollowPumpkinFace(s){ const g='#ffe14d'; return [[-1.7*s,1.9*s,2*s,1.1*s,0.9*s,0.14,g],[0.6*s,1.9*s,2*s,1.1*s,0.9*s,0.14,g],[-1.6*s,0.7*s,2*s,3.2*s,0.6*s,0.14,g],[-0.9*s,1.3*s,2*s,0.5*s,0.35*s,0.14,g],[0.5*s,0.35*s,2*s,0.5*s,0.35*s,0.14,g]]; }
function dHollowGrave(k){ const c='#8388b0',d='#5d6189',l='#a4a9cc';
  if(k===0) return [[-2.2,0,-0.8,4.4,5,1.6,c],[-1.6,5,-0.8,3.2,1,1.6,c],[-2.2,4.6,-0.8,4.4,0.4,1.7,l],[-1.2,2.8,0.8,2.4,0.4,0.12,d],[-0.8,1.8,0.8,1.6,0.4,0.12,d],[-2.6,0,-1.1,5.2,0.8,2.2,d]];
  if(k===1) return [[-0.7,0,-0.6,1.4,8.2,1.2,c],[-2.4,4.8,-0.6,4.8,1.4,1.2,c],[-0.7,8.2,-0.6,1.4,0.3,1.2,l],[-1.5,0,-1,3,0.8,2,d]];
  if(k===2) return [[-1.8,0,-0.8,3.6,3.4,1.6,c],[-1.8,3.4,-0.8,2.2,1.2,1.6,c],[-0.4,3.4,-0.8,0.8,0.5,1.6,c],[-2.2,0,-1.1,4.4,0.7,2.2,d],[0.1,1.4,0.8,1.2,0.3,0.12,d],[2.4,0,0.2,1.4,0.9,1.2,c]];
  return [[-1.6,0,-0.8,3.2,6.4,1.6,c],[-1,6.4,-0.8,2,0.9,1.6,c],[-0.3,7.3,-0.5,0.6,1.1,1,c],[-0.9,3.6,0.8,1.8,1.8,0.12,d],[-0.25,4.1,0.9,0.5,0.8,0.1,l],[-2,0,-1.1,4,0.8,2.2,d]]; }
function dHollowFence(){ const i='#33305c',b=[[-4,3.7,-0.2,8,0.5,0.4,i],[-4,1,-0.2,8,0.4,0.4,i]]; for(let x=-3.5;x<4;x+=2) b.push([x,0,-0.25,0.5,5.3,0.5,i],[x-0.15,5.3,-0.4,0.8,0.7,0.8,'#45427a']); return b; }
function dHollowWeb(){ const p='#4a4070',w='#d5d9f5'; return [[-0.6,0,-0.6,1.2,9.6,1.2,p],[-0.6,9,-0.5,6.4,0.9,1,p],[5.2,7.6,-0.4,0.7,1.6,0.8,p],
  [0.6,8.7,0,5,0.25,0.12,w],[0.6,7.2,0,3.9,0.25,0.12,w],[0.6,5.7,0,2.8,0.25,0.12,w],[0.6,4.2,0,1.7,0.25,0.12,w],[1.7,4.2,0,0.25,4.8,0.12,w],[2.9,5.7,0,0.25,3.3,0.12,w],[4.1,7.2,0,0.25,1.8,0.12,w],[2.1,6.3,0.1,0.9,0.9,0.5,'#1c1233'],[2,6.2,0.6,0.3,0.3,0.1,'#ff4f7b']]; }
function dHollowWell(){ const c='#7a7fa3',d='#55597c',w='#5a4f86',b=[[-3.2,0,-3.2,6.4,3,6.4,c],[-3.5,3,-3.5,7,0.7,7,d],[-2.4,3.7,-2.4,4.8,0.1,4.8,'#151233'],[-3.3,3.7,-0.5,0.9,6,1,w],[2.4,3.7,-0.5,0.9,6,1,w],[-4.2,9.7,-2.4,8.4,0.8,4.8,'#3d3566'],[-3.2,10.5,-1.6,6.4,0.8,3.2,'#3d3566'],[-2.6,8.3,-0.2,5.2,0.5,0.5,w],[-0.2,5.6,-0.1,0.3,2.7,0.3,'#c9c4f0'],[-0.8,4.4,-0.7,1.5,1.3,1.4,'#8a5a3c']];
  for(const q of [[-3.2,1],[0.6,1.6],[-1.4,0.3],[1.9,0.2]]) b.push([q[0],q[1],3.2,1.3,0.7,0.12,d]); return b; }
function dHollowScarecrow(){ const w='#6a5a3c',s='#8a4a6a',h='#e0b25a'; return [[-0.5,0,-0.5,1,12,1,w],[-5,8.4,-0.4,10,0.9,0.8,w],[-2.2,5.4,-0.9,4.4,4,1.8,s],[-5.2,7.6,-0.6,1.6,2,1.2,s],[3.6,7.6,-0.6,1.6,2,1.2,s],[-5.4,6.6,-0.3,0.5,1.2,0.5,h],[4.9,6.4,-0.3,0.5,1.4,0.5,h],
  [-1.7,9.6,-1.5,3.4,3.2,3,h],[-2.6,12.6,-2.2,5.2,0.5,4.4,'#33305c'],[-1.5,13.1,-1.4,3,2,2.8,'#33305c'],[-0.6,10.2,1.5,1.2,0.3,0.12,'#1c1233'],[-2,4.6,-0.7,1,1,1.4,h],[1,4.4,-0.7,1,1.2,1.4,h]]; }
function dHollowGlowShroom(c,s){ return [[-1.9*s,2*s,-1.9*s,3.8*s,1.2*s,3.8*s,c],[-1.1*s,3.2*s,-1.1*s,2.2*s,0.8*s,2.2*s,shade(c,1.2)]]; }
function dHollowFlame(){ return [[-0.4,2.5,-0.4,0.8,1.2,0.8,'#ffc85a'],[-0.2,3.5,-0.2,0.4,0.7,0.4,'#fff0b0']]; }
function w4Scale(m,k){ return m.map(b=>[b[0]*k,b[1]*k,b[2]*k,b[3]*k,b[4]*k,b[5]*k,b[6]]); }
/* a bare tree seen far off, in tiles */
function w4Twig(list,x,y,z,s,col){
  list.push([x-0.2*s,y,z,0.4*s,2.3*s,0.4,col],[x+0.05*s,y+2.1*s,z,0.28*s,1.6*s,0.4,col],[x-1.1*s,y+1.5*s,z,1*s,0.2*s,0.4,col],[x-1.2*s,y+1.6*s,z,0.2*s,1*s,0.4,col],
    [x+0.2*s,y+2.2*s,z,1.3*s,0.2*s,0.4,col],[x+1.3*s,y+2.3*s,z,0.2*s,0.9*s,0.4,col],[x-0.6*s,y+3.1*s,z,0.8*s,0.18*s,0.4,col],[x-0.65*s,y+3.2*s,z,0.18*s,0.7*s,0.4,col],[x+0.3*s,y+3.5*s,z,0.6*s,0.16*s,0.4,col]); }
/* a crooked house with lit windows: k is its size, d and r the colours of wall and roof */
function w4House(S,cx,by,z,k,d,r,R){
  const far=S.far,g=S.glowFar,win=pick(R,['#ffd76a','#ffc85a','#ffb04a']);
  far.push([cx-2*k,by,z-1.5,4*k,3.4*k,3,d],[cx-2.5*k,by+3.4*k,z-1.8,5*k,0.7*k,3.6,r],[cx-1.8*k,by+4.1*k,z-1.5,3.8*k,0.7*k,3,r],[cx-1*k,by+4.8*k,z-1.2,2.4*k,0.6*k,2.4,r],[cx+0.9*k,by+3.6*k,z-0.6,0.7*k,2.4*k,1.2,d],[cx-0.5*k,by,z+1.5,1*k,1.7*k,0.1,r]);
  if(R()<0.8) g.push([cx-1.5*k,by+1.5*k,z+1.52,0.8*k,1*k,0.1,win]); g.push([cx+0.7*k,by+1.6*k,z+1.52,0.8*k,1*k,0.1,win]); if(R()<0.5) g.push([cx-0.3*k,by+3.6*k,z+1.85,0.6*k,0.6*k,0.1,win]); }
/* the haunted manor: a long house with a tower, a wing and a crooked chimney */
function w4Manor(S,cx,by,z,k,d,r,R,lit){
  const far=S.far,g=S.glowFar,win='#ffd76a';
  far.push([cx-7*k,by,z-3,14*k,7*k,6,d],[cx-8*k,by+7*k,z-3.5,16*k,1*k,7,r],[cx-6.6*k,by+8*k,z-3,13.2*k,1*k,6,r],[cx-5.2*k,by+9*k,z-2.5,10.4*k,1*k,5,r],[cx-3.4*k,by+10*k,z-2,6.8*k,0.8*k,4,r],
    [cx+4*k,by,z-3.4,4.6*k,12*k,6.8,d],[cx+3.5*k,by+12*k,z-3.7,5.6*k,0.8*k,7.4,r],[cx+4.2*k,by+12.8*k,z-3,4.2*k,1.4*k,6,r],[cx+5*k,by+14.2*k,z-2.4,2.6*k,1.5*k,4.8,r],[cx+5.8*k,by+15.7*k,z-2,1*k,1.8*k,4,r],
    [cx-5.6*k,by+8*k,z-1,1.3*k,4.2*k,2,d],[cx-5.8*k,by+12.2*k,z-1.2,1.7*k,0.5*k,2.4,r],
    [cx-10.5*k,by,z-2.5,3.5*k,4.6*k,5,d],[cx-11*k,by+4.6*k,z-3,4.5*k,0.8*k,6,r],[cx-10.2*k,by+5.4*k,z-2.5,2.9*k,0.7*k,5,r],[cx-1.2*k,by,z+3,2.2*k,2.8*k,0.2,r],[cx-1.6*k,by+2.8*k,z+3,3*k,0.4*k,0.3,r]);
  for(const q of [[-5.8,1.4],[-3.6,1.4],[1.8,1.4],[-5.8,4.3],[-3.6,4.3],[-0.6,4.3],[1.8,4.3]]) if(R()<lit) g.push([cx+q[0]*k,by+q[1]*k,z+3.02,1.1*k,1.7*k,0.1,win]);
  g.push([cx+5.7*k,by+9.2*k,z+3.42,1.3*k,2.1*k,0.1,'#ff9a3d'],[cx+5.7*k,by+4.4*k,z+3.42,1.3*k,1.9*k,0.1,win],[cx-9.4*k,by+2*k,z+2.52,1.2*k,1.6*k,0.1,win]); }

THEMES.hollow={ music:'hollow',
  sky:['#060822','#131a54','#39489c'], skyMid:0.42, stars:0.95, sunGlow:0,
  fog:0x2a3880, fogNear:14, fogFar:130,
  hemiSky:0xa9b6ff, hemiGround:0x4a3a78, hemiI:0.62, sunI:0.4, sunCol:0xb4c4ff, sunDir:[-0.38,0.8,0.5],
  top:'#36606a', topS:['#3f6e76','#2f5660','#467a7e','#335c66'], dirt:'#4b3472', dirtS:['#573f84','#3e2a60','#634a92'], cap:'#36606a', capL:'#5a9a94', capD:'#2a1c46',
  brick:['#8a62b4','#4a2f72','#b894dc'], hard:['#7078a4','#a2a9d2','#434a74'], pipe:['#56c46a','#c2f7a8','#2f8a48','#0f3018'],
  semi:'plank', plat:['#c79af0','#7448b0'], dust:'#c9c4f0', back:-6, fringe:['#467a7e','#36606a','#5a9a94'],
  liquid:{kind:'goo',a:'#27b84f',b:'#d6ff8a',op:1,mask:0.4,flow:0.5},
  bloom:1.05, hi:0.26, vig:0.5, sat:1.1,
  w4:{hill:'#222a70',hill2:'#181c52',ink:'#0c0c28',moor:'#11122e',mist:'#4f5cb4',cloud:'#262a66',mote:0xcfffb0,wisp:'#a8ffe6'},
  looks:[null,
    /* 4-2: a green-tinged, misty night */
    {sky:['#04161c','#0e3840','#3f8a7a'],fog:0x2f6a64,fogNear:9,fogFar:95,hemiSky:0xa8f0d8,hemiGround:0x3a5a66,sunCol:0xb8ffdc,stars:0.6,
      w4:{hill:'#12393e',hill2:'#0d2a30',ink:'#07191e',moor:'#0b2428',mist:'#4f9a90',cloud:'#1c4a50',mote:0xd8ff9a,wisp:'#c8ff9a'}},
    /* 4-3: a purple night with an aurora */
    {sky:['#0f0628','#2a1260','#6a3aa6'],fog:0x4a2c84,hemiSky:0xd0b0ff,hemiGround:0x4a2f70,sunCol:0xd8c0ff,band:'#2fd6a0',stars:1,
      w4:{hill:'#2a1660',hill2:'#1e0f48',ink:'#120830',moor:'#170a38',mist:'#7458b8',cloud:'#34207a',mote:0xffd0ff,wisp:'#ffc0f0'}},
    /* 4-4: inside the manor, by candlelight */
    {sky:['#070618','#141034','#2a2058'],fog:0x1c1430,fogNear:18,fogFar:120,hemiSky:0xffd2a0,hemiGround:0x6a4a3a,hemiI:0.7,sunI:0.4,sunCol:0xffc890,sunDir:[-0.3,0.85,0.55],stars:0.7,hi:0.2,
      w4:{hill:'#1b1d52',hill2:'#14153e',ink:'#0c0c28',moor:'#11122e',mist:'#4f5cb4',cloud:'#262a66',mote:0xffe0a0,wisp:'#ffd76a'}},
    /* 4-5: a storm-violet night for the Count */
    {sky:['#12082c','#3a1c6e','#8450b4'],fog:0x4c3288,fogNear:12,fogFar:110,hemiSky:0xc8a8ff,hemiGround:0x4a2a6a,sunCol:0xe0c8ff,sunDir:[-0.5,0.7,0.5],stars:0.3,
      w4:{hill:'#2c1764',hill2:'#200f4c',ink:'#130830',moor:'#190b3a',mist:'#7a58c0',cloud:'#3c2484',mote:0xe0d0ff,wisp:'#d8b8ff'}}],
  /* the far view: hills with bare trees and the manor on the highest, crooked houses with lit windows, graves and
     fences close behind the lane, banks of mist, bats, will-o'-wisps, and no moon */
  scenery(S,R){
    const W=S.W, far=S.far, C=TH.w4, inn=S.L.w4in, back=TH.back||-2.5;
    const inside=x=>inn&&x>inn[0]+6&&x<inn[1]-6;
    far.push([-70,-4,-96,W+140,5.4,96+back-0.15,C.moor]);
    /* far hills, the manor standing on one of them */
    const mx=S.L.w4manor===undefined?W*0.5+R()*24:S.L.w4manor;
    for(let x=-60;x<W+60;x+=20+R()*22){ const z=-50-R()*30, w=16+R()*18, top=4+R()*5;
      hill(far,x,top,z,w,C.hill,R,false);
      for(let k=0;k<3;k++) if(R()<0.6) w4Twig(far,x+(R()-0.5)*w*0.3,top-0.2,z,1+R()*0.8,C.hill2); }
    if(!S.L.w4garden){ hill(far,mx,9.5,-58,34,C.hill2,R,false); w4Manor(S,mx-1,9.3,-57,0.9,C.ink,shade(C.ink,0.75),R,0.7); w4Twig(far,mx-13,7.6,-56,1.6,C.ink); w4Twig(far,mx+12,7.8,-56,1.3,C.ink); }
    /* nearer hills with crooked houses, crosses and trees */
    for(let x=-40;x<W+40;x+=15+R()*16){ const z=-22-R()*14, w=12+R()*12, top=2.6+R()*2.6; if(inside(x)) continue;
      hill(far,x,top,z,w,C.hill2,R,false);
      const q=R();
      if(q<0.4) w4House(S,x+(R()-0.5)*2,top-0.15,z,0.8+R()*0.5,C.ink,shade(C.ink,0.7),R);
      else if(q<0.75){ w4Twig(far,x-1,top-0.2,z,1.5+R(),C.ink); if(R()<0.6) w4Twig(far,x+2.2,top-1.2,z+1,1.1+R()*0.6,C.ink); }
      else for(let k=0;k<4;k++){ const gx=x-2.4+k*1.5+R()*0.5, gy=top-0.3-Math.abs(k-1.5)*0.5; far.push([gx,gy,z+1,0.22,1.2,0.3,C.ink],[gx-0.3,gy+0.7,z+1,0.82,0.2,0.3,C.ink]); } }
    /* close behind the shelf: big bare trees, stones and a run of fence, all in silhouette */
    for(let x=-20;x<W+20;x+=6+R()*9){ if(inside(x)) continue; const z=-8.5-R()*5, q=R();
      if(q<0.5) w4Twig(far,x,1.3,z,2.2+R()*1.8,C.ink);
      else if(q<0.75) for(let k=0;k<3;k++){ const gx=x+k*1.7+R()*0.6; if(R()<0.5) far.push([gx,1.3,z,0.9,1.3+R()*0.5,0.4,C.ink],[gx+0.15,2.6,z,0.6,0.35,0.4,C.ink]); else far.push([gx+0.3,1.3,z,0.3,2,0.4,C.ink],[gx-0.1,2.5,z,1.1,0.28,0.4,C.ink]); }
      else { for(let k=0;k<7;k++) far.push([x+k*0.8,1.3,z,0.14,1.7,0.14,C.ink]); far.push([x,2.5,z,5,0.14,0.14,C.ink],[x,1.7,z,5,0.12,0.14,C.ink]); } }
    /* mist lying low, drifting, and a few dark clouds */
    for(let x=-50;x<W+50;x+=7+R()*9){ const w=8+R()*12, c=C.mist, m=new T.Mesh(tmpGeo(voxGeo([[0,0,0,w,0.3,2,c],[w*0.15,0.3,0.2,w*0.5,0.22,1.6,c],[w*0.3,-0.22,0.1,w*0.6,0.22,1.8,shade(c,0.85)],[w*0.55,0.3,0.3,w*0.25,0.16,1.4,shade(c,0.92)]],1)),MAT.soft);
      m.position.set(x,1.5+R()*1.2,-10-R()*38); world.add(m); clouds.push({m,v:0.12+R()*0.3}); }
    for(let x=-50;x<W+50;x+=16+R()*18) S.addCloud(x,9+R()*8,-34-R()*36,R,C.cloud,0.15+R()*0.2);
    /* bats that cross the sky */
    const batG=()=>[[-1,-0.8,-1.4,2,1.8,2.8,C.ink],[-0.8,1,-0.2,0.5,0.7,0.5,C.ink],[0.3,1,-0.2,0.5,0.7,0.5,C.ink]];
    for(let i=0;i<Math.ceil(W/30);i++){ const g=new T.Group(), k=C.ink, wl=new T.Mesh(geo('w4batL'+k,()=>[[-4.6,0,-1.2,4.6,0.5,2.4,C.ink],[-6,0,-0.5,1.4,0.4,1.4,C.ink]]),MAT.soft), wr=new T.Mesh(geo('w4batR'+k,()=>[[0,0,-1.2,4.6,0.5,2.4,C.ink],[4.6,0,-0.5,1.4,0.4,1.4,C.ink]]),MAT.soft);
      g.add(new T.Mesh(geo('w4bat'+k,batG),MAT.soft),wl,wr);
      const z=-7-R()*12, y0=8.5+R()*4.5, v=(R()<0.5?-1:1)*(2+R()*1.6), ph=R()*9; g.position.set(R()*W,y0,z); g.rotation.y=v>0?Math.PI/2:-Math.PI/2; world.add(g);
      critters.push({tick(dt,time){ g.position.x+=v*dt; if(g.position.x>W+30) g.position.x=-30; else if(g.position.x<-30) g.position.x=W+30; g.position.y=y0+Math.sin(time*1.1+ph)*1.1+Math.sin(time*3.7+ph)*0.25; const f=Math.sin(time*13+ph)*0.75; wl.rotation.z=-f; wr.rotation.z=f; }}); }
    /* will-o'-wisps drifting behind the lane */
    for(let i=0;i<Math.ceil(W/24);i++){ const m=new T.Mesh(geo('w4wisp'+C.wisp,()=>[[-1,-1,-1,2,2,2,C.wisp],[-0.5,1,-0.5,1,0.9,1,shade(C.wisp,1.2)],[-0.4,-1.6,-0.4,0.8,0.6,0.8,C.wisp]]),MAT.glow);
      const x0=R()*W, y0=3.6+R()*4, z=-1.7-R()*3.6, ph=R()*9, sp=0.25+R()*0.35; world.add(m);
      critters.push({tick(dt,time){ m.position.set(x0+Math.sin(time*sp+ph)*3.5,y0+Math.sin(time*sp*2.3+ph)*0.9,z); m.rotation.y=time*1.5; }}); }
    S.addMotes(C.mote,Math.round(W*0.35),0.085,0,true);
    /* The engine gives one lamp at a time a light, and the light jumps as the camera passes from one to the next. This
       shares out every light still free among the lamps on screen, each faded by how far it is from the middle. */
    critters.push({tick(dt,time){ if(!lamps.length) return; let a=null,b=null,c=null,da=99,db=99,dc=99;
      for(const l of lamps){ const d=Math.abs(l.x-camX); if(d<da){ c=b; dc=db; b=a; db=da; a=l; da=d; } else if(d<db){ c=b; dc=db; b=l; db=d; } else if(d<dc){ c=l; dc=d; } }
      for(const q of [[a,da],[b,db],[c,dc]]){ if(glowN>=glowLights.length) break; const l=q[0]; if(!l) continue; const k=clamp((15-q[1])/5,0,1)*(0.93+0.07*Math.sin(time*11+l.x*3)); glowAt(l.x,l.y,l.z,l.col,(l.power||1)*k,l.reach||8); }
      while(glowN<glowLights.length) glowAt(0,-60,0,0,0,1); }});
  },
  /* beside the lane: lanterns at a steady pace, bare trees, graves with candles, pumpkins, mushrooms that glow, fences */
  decor(S,D,R){
    const r=R(), y=D.ty*8, st=S.L.stage, x=D.x, yard=st===2?1:0;
    const lampAt=(lx,ly,lz,col,power,reach)=>lamps.push({x:lx,y:ly,z:lz,col,power,reach});
    /* a lantern every so often, wherever there is room */
    if(x%([11,15,13,12,10][st]||11)===5&&D.free(3)&&D.open){ const lx=x*8+4, lz=-(2.2+R()*1.2)*8; put(S.near,w4Scale(dHollowLantern(),1.4),lx,y,lz); put(S.glow,w4Scale(dHollowLanternLit(),1.4),lx,y,lz); lampAt(x+0.85,D.ty+2.7,0.7,0xffb45a,2.3,9.5); return; }
    /* a stretch of iron fence along the back of the shelf */
    if(Math.sin(x*0.29+st)+Math.sin(x*0.083+st*2)>(yard?0.2:0.95)&&D.free(1)) put(S.near,dHollowFence(),x*8+4,y,-5.5*8);
    if(r<0.07&&D.free(6)&&D.open) put(S.flora,w4Scale(dHollowTree(R),1.25),D.jx(),y,D.zb(2.8,5),0.4);
    else if(r<0.07+0.06+yard*0.16&&D.free(2)){ const gx=D.jx(), gz=D.zb(1.7,4.8), k=(R()*4)|0; put(S.near,dHollowGrave(k),gx,y,gz);
      if(R()<0.4){ put(S.near,dCandle(),gx+3.2,y,gz+1.5); put(S.glow,dHollowFlame(),gx+3.2,y,gz+1.5); if(R()<0.5) lampAt(gx/8+0.4,D.ty+1.6,0.4,0xffb45a,1.1,6); } }
    else if(r<0.19+yard*0.16&&D.free(1)){ const s=0.75+R()*0.5, px=D.jx(), pz=D.zb(1.5,4.6); put(S.near,dHollowPumpkin(s),px,y,pz); put(S.glow,dHollowPumpkinFace(s),px,y,pz); if(R()<0.6) lampAt(px/8,D.ty+1.7,0.5,0xff9430,1.4,6.5); }
    else if(r<0.27+yard*0.14){ const c=pick(R,['#5ff2d0','#8affb0','#c79aff']), mx=D.jx(), mz=D.zb(1.3,5); for(let k=0;k<1+((R()*3)|0);k++){ const s=0.5+R()*0.6, ox=mx+(R()-0.5)*5, oz=mz+(R()-0.5)*4; put(S.near,[[-0.5*s,0,-0.5*s,1*s,2*s,1*s,'#d9d4f5']],ox,y,oz); put(S.glow,dHollowGlowShroom(c,s),ox,y,oz); } }
    else if(r<0.29+yard*0.14&&D.free(2)&&D.open) put(S.near,dHollowWeb(),D.jx(),y,D.zb(2,4.6));
    else if(r<0.298+yard*0.14&&D.free(3)&&D.open) put(S.near,dHollowWell(),x*8+4,y,D.zb(2.6,4.2));
    else if(r<0.312+yard*0.14&&D.free(3)&&D.open) put(S.flora,dHollowScarecrow(),D.jx(),y,D.zb(2.4,4.6),0.25);
    else if(r<0.42+yard*0.1) put(S.flora,dTuft('#4f908a'),D.jx(),y,D.zb(1.2,5.4),1.4);
    else if(r<0.48+yard*0.1) put(S.near,dRock(pick(R,['#6a6f9a','#585c86'])),D.jx(),y,D.zb(1.2,5.2));
    else if(r<0.51+yard*0.1) put(S.near,dBones(),D.jx(),y,D.zb(1.2,4));
    const f=R();
    if(f<0.07){ const c=pick(R,['#5ff2d0','#c79aff']), fx_=D.jx(), fz=D.zf(); put(S.near,[[-0.3,0,-0.3,0.6,1.1,0.6,'#d9d4f5']],fx_,y,fz); put(S.glow,dHollowGlowShroom(c,0.42),fx_,y,fz); }
    else if(f<0.17) put(S.near,dRock(pick(R,['#6a6f9a','#585c86'])).map(b=>[b[0]*0.5,b[1]*0.5,b[2]*0.5,b[3]*0.5,b[4]*0.5,b[5]*0.5,b[6]]),D.jx(),y,D.zf());
    else if(f<0.2) put(S.near,dBones().map(b=>[b[0]*0.6,b[1]*0.6,b[2]*0.6,b[3]*0.6,b[4]*0.6,b[5]*0.6,b[6]]),D.jx(),y,D.zf());
  }
};

/* 4-1: lantern lane. A calm first walk that introduces Shyde the ghost, who follows whenever Blorp looks away:
   one in the open, one guarding a shard, then two at a time over a moving ledge and a crumbling bridge. */
function w4l1(){
  const B=LevelBuilder(243,'hollow');
  B.room(0,210).room(215,242,0,15,true);
  B.ground(0,61).ground(65,96).ground(105,150).ground(156,164,3).ground(170,214).ground(147,150,3).ground(170,173,3);
  B.coins(8,3,3).row(13,5,'?M?').enemy('shellby',20).pipe(26,2).enemy('spikit',33).coins(30,3,3);
  /* the first ghost, alone and overhead, with room to try turning round */
  B.sign(40,'Shyde only creeps closer while your back is turned. Look at him and he hides. Nothing can hurt him!');
  B.row(45,5,'I').enemy('ghost',50,5.4).row(54,5,'???').arc(61,3,5);
  B.enemy('batty',71,6,{rx:3});
  /* a shard with a ghost beside it: take it from the side he is not on */
  B.shard(79,5).enemy('ghost',77,5.2).coins(79,3,2);
  B.row(86,5,'B?B').enemy('shellby',92).enemy('ghost',93,8);
  B.plat(98,2,3,'x',4,1.1).coins(99,4,5);
  B.checkpoint(108);
  /* two that follow, and one in the way */
  B.enemy('ghost',117,6.5).row(121,5,'?BMB?').enemy('spikit',128).enemy('ghost',133,6).pipe(137,3).enemy('ghost',143,2).coins(141,6,5);
  /* a crumbling bridge, and crumbling steps up to a shard */
  B.sign(148,'Cracked blocks crumble underfoot. Keep moving!',3);
  B.row(151,2,'KKKKK').row(165,2,'KKKKK');
  B.row(157,5,'KK').row(160,8,'KK').coins(157,6,2).coins(160,9,2).shard(158,11);
  B.warp(175,2,'in').warp(179,3,'out',true);
  B.stairs(183,6).fill(189,2,189,7,HARD);
  B.goal(195);
  /* a cellar full of coins, and the third shard */
  B.fill(211,0,214,15,GROUND).fill(215,2,215,15,HARD).fill(242,2,242,15,HARD).ground(215,242);
  B.warp(217,2,'in',true).coinBox(221,3,227,4).row(223,5,'===').row(228,7,'===').coins(223,6,3).shard(229,9).row(232,5,'?L?').enemy('ghost',226,10).warp(238,2,'out');
  return B.L;
}

/* 4-2: the switchyard. Every switch swaps the red blocks for the blue ones, so a bridge one way is a wall the other:
   first a switch that builds a bridge, then gates, then switches to pound and one to hit in mid-air over the bog. */
function w4l2(){
  const B=LevelBuilder(230,'hollow');
  B.ground(0,29).ground(24,29,3).ground(41,65).ground(41,45,3).ground(77,95).ground(90,95,3).ground(107,149).ground(107,112,3).ground(153,155).ground(170,229);
  B.coins(6,3,3).row(10,5,'?M?').enemy('boing',17);
  /* a switch that simply builds a bridge */
  B.sign(21,'Bump the switch from below. The red blocks vanish and the blue ones turn solid. Bump it again to swap back.');
  B.row(27,6,'X').row(30,2,'UUUUUUUUUUU').coins(31,4,9);
  /* blue steps up, a red bridge across: there is a switch at the bottom and one at the top */
  B.row(47,5,'B?MB').row(53,5,'X').enemy('spikit',51);
  B.row(56,3,'UU').row(59,5,'UU').fill(62,6,65,6,HARD).row(64,10,'X').coins(62,3,3);
  B.row(66,6,'RRRRRRRRRRR').coins(68,8,7).fill(77,2,81,6,HARD);
  /* gates: a red wall, a blue bridge, a blue wall. Steps nobody can see lead up to a shard. */
  B.enemy('shellby',84).row(85,5,'ii').shard(85,9).row(88,5,'X').fill(94,3,95,10,RED);
  B.row(96,2,'UUUUUUUUUUU').coins(98,4,7);
  B.row(114,5,'=====').row(115,6,'R R').row(115,7,'R R').row(115,8,'RRR').shard(116,6);
  B.row(120,5,'X').enemy('boing',122).fill(124,2,125,9,BLUE);
  B.checkpoint(128);
  /* switches on the floor, which only a ground pound flips; the first opens a vault from the top */
  B.sign(131,'A switch underfoot must be pounded: jump, then press {down} in the air.');
  B.fill(133,2,133,4,HARD).fill(137,2,137,3,HARD).row(134,4,'RRR').row(137,4,'X').shard(135,2);
  B.row(141,2,'X').enemy('batty',144,7,{rx:2}).fill(146,2,147,9,RED).row(149,5,'I');
  /* over the bog: blue ledge, a switch to hit in mid-air, red ledge, a switch to pound, blue ledge */
  B.row(151,4,'UUUU').row(155,8,'XX').row(155,4,'RRRRR').coins(152,6,2).coins(157,6,2);
  B.row(162,4,'X').fill(163,8,163,12,HARD).row(164,4,'UUUUU').coins(165,6,3);
  /* two ghosts, and a switch that takes a moment */
  B.enemy('ghost',178,6).row(184,2,'X').enemy('ghost',190,5.5).fill(194,2,195,9,BLUE).coins(182,5,5);
  B.stairs(199,6).fill(205,2,205,7,HARD);
  B.goal(211);
  return B.L;
}

/* 4-3: the graveyard shift. Fizzle the walking bomb: brick walls hide coins, a crypt with a shard, a way through the
   tower and a pipe past the bog, and a Fizzle paces in front of each. The way over the top never needs one. */
function w4l3(){
  const B=LevelBuilder(260,'hollow');
  B.room(0,227).room(232,259,0,15,true);
  B.ground(0,103).ground(112,141).ground(150,150).ground(156,231);
  B.coins(6,3,3).sign(9,'Fizzle is a walking bomb. Stomp him to light the fuse, then get clear, or give him a kick. The bang breaks bricks.');
  B.enemy('fizzle',18);
  /* a brick vault of coins on open ground */
  B.row(24,4,'BBBBBB').fill(24,2,24,3,BRICK).fill(29,2,29,3,BRICK).coinBox(25,2,28,3);
  B.row(33,5,'?M?').enemy('fizzle',37).pipe(41,2);
  /* the tower: up the planks and over, or bomb the door and walk through. The pipe on top is only for climbers. */
  B.row(47,4,'==').row(50,7,'==').coins(47,5,2).coins(50,8,2).row(51,2,'H').enemy('fizzle',52);
  B.fill(54,2,59,9,HARD).clear(55,2,59,3).fill(54,2,54,3,BRICK).coins(55,2,4).coins(55,3,4);
  B.warp(56,2,'in',false,10).row(61,6,'==').coins(61,7,2).warp(64,2,'out',true).row(70,5,'I').enemy('shellby',71);
  /* the crypt: a plank roof to walk over, a brick wall to bomb, and a shard inside */
  B.fill(77,2,77,3,BRICK).row(78,2,'BB').enemy('fizzle',78,3).fill(80,2,80,4,BRICK).row(80,5,'=======').fill(86,2,86,4,HARD).shard(83,2).coins(82,7,3);
  B.checkpoint(91);
  B.row(94,5,'B?MB').enemy('ghost',99,7);
  /* a ledge that slides over the bog, and a shard above it */
  B.plat(105,2,3,'x',3,1.2).shard(108,6);
  /* a pipe walled up in a tomb: it comes out past the next bog */
  B.row(115,2,'H').enemy('fizzle',116).fill(118,2,118,4,BRICK).row(118,5,'HHHHHH').fill(123,2,123,4,HARD).warp(120,1,'cut');
  B.enemy('ghost',128,6).enemy('spikit',132).row(133,5,'?B?').enemy('ghost',139,2.2);
  B.plat(143,2,3,'x',3,1).enemy('batty',149,6,{rx:2.5}).plat(151,2,3,'x',2,1.3,1.5).coins(144,4,3).coins(152,4,3);
  /* another vault, with Fizzles and a ghost about */
  B.enemy('fizzle',160).fill(163,2,163,3,BRICK).row(163,4,'BBBBBBB').fill(169,2,169,3,BRICK).coinBox(164,2,168,3).enemy('fizzle',172).enemy('ghost',166,8);
  B.warp(176,2,'cut',true).enemy('boing',184).row(187,5,'?B?').enemy('spikit',192);
  B.stairs(200,6).fill(206,2,206,7,HARD);
  B.goal(212);
  /* under the tower: a cellar of bricks to blow open, and the third shard */
  B.fill(228,0,231,15,GROUND).fill(232,2,232,15,HARD).fill(259,2,259,15,HARD).ground(232,259);
  B.warp(234,2,'in',true).enemy('fizzle',239).fill(242,2,242,3,BRICK).row(242,4,'BBBBBB').fill(247,2,247,3,BRICK).coinBox(243,2,246,3);
  B.row(244,7,'====').coins(244,8,4).row(249,9,'===').shard(250,11).row(251,5,'==').enemy('fizzle',252).warp(255,2,'out');
  return B.L;
}

/* 4-4: the manor. Indoors by candlelight: Clonks over the corridors, ghosts in the long hall, and a cellar of three
   pipes of which only one leads on. */
function w4l4(){
  const B=LevelBuilder(266,'hollow');
  B.room(0,233).room(238,265,0,15,true).set('w4in',[24,196]);
  B.ground(0,237).fill(24,12,196,15,GROUND).fill(24,5,25,11,HARD).fill(195,5,196,11,HARD);
  B.coins(6,3,3).row(11,5,'?M?').enemy('boing',17).sign(21,'The manor. Clonks wait over the corridors: let them drop, then pass.');
  B.enemy('clonk',33,8).row(38,5,'?B?').enemy('clonk',45,8).enemy('ghost',54,6).enemy('spikit',58).coins(48,3,4);
  B.fill(66,5,67,11,HARD).row(72,5,'B?B').row(76,8,'===').shard(77,9).coins(76,9,1).enemy('fizzle',84).enemy('ghost',90,3).enemy('clonk',97,8);
  /* the cellar door: three pipes. The first leads back, the last to a cupboard, the middle one on. */
  B.fill(104,5,105,11,HARD).sign(107,'Three pipes. One of them is the way on.');
  B.warp(111,2,'back').warp(117,2,'on').warp(123,2,'cup').fill(129,2,130,11,HARD).warp(70,2,'back',true).warp(134,2,'on',true).warp(100,2,'cup2',true);
  B.checkpoint(140);
  B.row(144,5,'BMB').enemy('ghost',150,7).enemy('shellby',154).enemy('ghost',160,2.5);
  /* a shard on a shelf that only a bounce off a Clonk's head will reach */
  B.enemy('clonk',167,7).row(170,9,'HHH').shard(171,10).enemy('ghost',178,6).enemy('spikit',183).row(187,5,'?I?');
  B.stairs(204,6).fill(210,2,210,7,HARD);
  B.goal(216);
  /* the cupboard under the stairs: a ghost, a great many coins, and the third shard */
  B.fill(234,2,237,15,GROUND).ground(238,265).fill(238,2,238,15,HARD).fill(265,2,265,15,HARD).fill(238,12,265,15,GROUND);
  B.warp(240,2,'cup',true).warp(261,2,'cup2').coinBox(245,3,256,5).enemy('ghost',258,8).row(249,8,'=====').shard(251,9).row(246,5,'=');
  return B.L;
}

/* 4-5: Count Boohoo. A short run through the manor's garden, then the Count: he fades out and drifts overhead where
   nothing can touch him, shows himself, swoops low across the room, and sits winded on the floor for a moment. */
function w4l5(){
  const B=LevelBuilder(176,'hollow');
  B.ground(0,34).ground(40,70).ground(76,175);
  B.coins(6,3,3).row(10,5,'?M?').enemy('ghost',18,6).enemy('spikit',22).row(27,4,'==').row(30,7,'==').shard(31,10).coins(27,5,2);
  B.plat(35,2,3,'x',2,1.2).enemy('batty',46,6,{rx:2.5}).enemy('fizzle',52).row(56,5,'B?B').enemy('ghost',62,3).arc(70,4,7);
  /* a switch, a blue stair it builds, and a shard at the top of the stair */
  B.row(80,5,'X').row(84,4,'U').row(87,6,'U').row(90,8,'UU').shard(91,10).coins(84,5,1).coins(87,7,1);
  /* two gateposts to kick up between */
  B.fill(96,4,96,11,HARD).fill(100,4,100,11,HARD).coinCol(98,4,5).shard(98,10);
  B.checkpoint(106);
  B.row(110,5,'?M?').sign(113,'Count Boohoo! Nothing can touch him while he is faded. Wait for the swoop, then jump on him while he gets his breath.');
  B.fill(159,2,175,13,GROUND);
  B.boss(144,120,155,9,'boohoo');
  return B.L;
}

function w4stub(last){ return ()=>{ const B=LevelBuilder(120,'hollow'); B.ground(0,119).shard(8,3).shard(10,3).shard(12,3); if(last) B.fill(100,2,119,13,GROUND).boss(80,60,95,9,'boohoo'); else B.goal(100); return B.L; }; }
defWorld({name:'Spooky Hollow',theme:'hollow',levels:[w4l1,w4l2,w4l3,w4l4,w4l5]});
