/* ================= World 2: Jellybean Jungle ================= */
/* A candy-coloured jungle on a river. The world of launch pods, crumbling ruins and one long climb. Pits hold river
   water, so a fall can be swum out of, but Snappers leap there. */
const W2_BEANS=['#ff4fa0','#ff9a2e','#ffe14d','#3fd0e6','#a35ce0'];
const W2_GREENS=['#1f9a52','#25a85a','#1a8c4a'];
const W2_STONE=['#93a08c','#66735f','#b4c0a6','#3fae55'];
/* a jungle tree: a buttressed trunk, a canopy in tiers, vines hanging from it and now and then a jellybean or two */
function dJungleTree(R){ const b=[], tk='#8f5b34', td='#6f4326', n=17+((R()*11)|0), g=pick(R,W2_GREENS), gl=shade(g,1.22), gd=shade(g,0.82), w=19+R()*8;
  b.push([-1.6,0,-1.6,3.2,n+2,3.2,tk],[-2.8,0,-1,1.4,3.4,2,td],[1.4,0,-1,1.4,2.6,2,td],[-0.7,0,1.4,1.4,2,1.2,td],[-1.7,n*0.5,-1.7,3.4,1,3.4,td],[0.2,n*0.3,1.6,1,1.6,0.2,td]);
  b.push([-w/2,n,-7,w,5,14,gd],[-w/2-3,n+4,-8,w+6,6,16,g],[-w/2+1,n+10,-7,w-2,5,14,g],[-w/2+5,n+15,-5,w-10,4,10,gl]);
  b.push([-w/2+1,n+6,8,4,2.4,0.4,gl],[w/2-6,n+5,8,3,2,0.4,gl],[-2,n+12,7,5,2,0.4,gl],[-w/2+2,n+1.5,7,3,1.6,0.4,g]);
  const nv=2+((R()*3)|0); for(let i=0;i<nv;i++){ const vx=-w/2+1+R()*(w-2), len=4+R()*8; b.push([vx,n-len,6+R(),0.7,len,0.7,'#177a3c']); if(R()<0.6) b.push([vx-0.5,n-len-0.2,6.2,1.7,1.2,1.1,gl]); }
  const nf=(R()*4)|0; for(let i=0;i<nf;i++){ const fx=-w/2+2+R()*(w-4), c=pick(R,W2_BEANS); b.push([fx,n-2.6,5.5+R()*1.5,1.6,2.6,1.6,c],[fx+0.2,n-1.2,7.3,0.5,0.8,0.2,WHITE]); }
  return b; }
function dJungleFern(c){ const d=shade(c,0.82), b=[[-0.5,0,-0.5,1,5.5,1,c],[-0.5,5.5,-0.5,1,1,1,shade(c,1.2)],[-0.6,0,-1.8,1.2,3.6,1,d],[-0.6,0,1,1.2,2.8,1,d]];
  for(const s of [-1,1]) for(let k=0;k<4;k++) b.push([s>0?0.5+k*1.3:-k*1.3-2.1,1.4+k*1.3-(k===3?1.7:0),-0.5,1.6,1.3,1,k%2?c:d]);
  return b; }
function dJungleLeaf(c){ const l=shade(c,1.2), d=shade(c,0.8); return [[-0.4,0,-0.4,0.8,7,0.8,d],[-5,6,-0.6,5,5,1,c],[-6,7.5,-0.6,1,2.4,1,c],[-3,8,0.4,0.6,2.6,0.2,l],[0.4,4.4,-0.3,4.6,4.4,1,c],[5,5.6,-0.3,1,2.2,1,c],[2.4,6,0.7,0.6,2.2,0.2,l],[-0.3,0,0.8,0.7,4,0.7,d],[-2.6,3.4,0.8,3,2.6,0.9,l]]; }
function dJungleBush(R){ const g=pick(R,W2_GREENS), l=shade(g,1.2), b=[[-4,0,-3,8,4,6,g],[-2.6,4,-2.2,5.2,2,4.4,l],[-5.4,0,-1.6,1.6,2.4,3.4,shade(g,0.85)],[3.8,0,-1.8,1.8,2.8,3.4,shade(g,0.85)]];
  for(const q of [[-3.6,2.2],[-0.8,4.6],[1.8,2.6],[3,0.8],[-1.6,0.8]]) if(R()<0.75){ const c=pick(R,W2_BEANS); b.push([q[0],q[1],3,1.8,1.3,0.9,c],[q[0]+0.2,q[1]+0.8,3.9,0.6,0.3,0.12,WHITE]); }
  return b; }
/* one fat jellybean hanging from a bent stalk */
function dJungleBeanStalk(c){ const g='#2a9c50'; return [[-0.5,0,-0.5,1,9,1,g],[-0.5,9,-0.5,3.4,1,1,g],[2.2,7.6,-0.5,0.7,1.4,1,g],[1,2.6,-1.4,3,5,2.8,c],[1.4,1.9,-1,2.2,0.7,2,c],[1.4,7.6,-1,2.2,0.5,2,c],[1.4,5.6,1.4,0.7,1.4,0.15,WHITE],[-2.2,3,-0.3,1.8,1,0.7,g],[-2.6,5.5,-0.3,2.2,1,0.7,shade(g,1.2)]]; }
function dJungleShroom(c){ const s='#fff0d6', l=shade(c,1.15); return [[-0.8,0,-0.8,1.6,3.4,1.6,s],[-3,3.4,-3,6,1.6,6,c],[-2.2,5,-2.2,4.4,1.2,4.4,c],[-1.2,6.2,-1.2,2.4,0.6,2.4,l],[-2.2,3.9,3,1.2,0.9,0.12,WHITE],[0.8,4.1,3,1,0.8,0.12,WHITE],[-0.6,5.4,2.2,0.9,0.6,0.12,WHITE],[2.6,0,0.4,1,1.8,1,s],[1.8,1.8,-0.4,2.6,1.2,2.6,c],[2.5,3,0.3,1.2,0.5,1.2,l]]; }
/* mossy stone: a totem of stacked faces, a big idol's head, and a broken column with one of its drums beside it */
function dJungleTotem(R){ const s=W2_STONE[0], d=W2_STONE[1], l=W2_STONE[2], m=W2_STONE[3], b=[[-3,0,-2.4,6,1,4.8,d]], n=2+((R()*2)|0); let y=1;
  for(let k=0;k<n;k++){ const h=4.6; b.push([-2.6,y,-2,5.2,h,4,k%2?l:s],[-2.9,y+h-1.3,-2.2,5.8,0.9,4.4,d],
      ...eye(-2,y+1.9,2,1.6,1.4,0.8,0.8,0.5,0.2),...eye(0.4,y+1.9,2,1.6,1.4,0.8,0.8,0.3,0.2),[-1.4,y+0.5,2,2.8,0.8,0.2,INK],[-1,y+0.5,2.2,0.6,0.5,0.1,WHITE],[0.4,y+0.5,2.2,0.6,0.5,0.1,WHITE]);
    if(k===n-1) b.push([-4.6,y+1.2,-0.8,2,1.6,1.6,l],[2.6,y+1.2,-0.8,2,1.6,1.6,l]);
    y+=h; }
  b.push([-2.8,y,-2.2,5.6,0.7,4.4,m],[-1.5,y+0.7,-1.2,2.4,0.6,2,shade(m,1.15)],[-2.8,y-2,2,1,2,0.3,m],[1.6,3,2,1.2,1.4,0.3,m]);
  return b; }
function dJungleIdol(){ const s=W2_STONE[0], d=W2_STONE[1], l=W2_STONE[2], m=W2_STONE[3]; return [[-4,0,-3,8,9,6,s],[-4.4,0,-3.4,8.8,1.2,6.8,d],[-3.4,9,-2.6,6.8,1.2,5.2,l],[-4.3,6,-3.2,8.6,1,6.5,d],
  [-3,4,3,2.2,1.6,0.3,INK],[0.8,4,3,2.2,1.6,0.3,INK],[-0.7,2.6,3,1.4,2.6,0.8,l],[-2,1.3,3,4,0.8,0.3,INK],[-1.5,1.3,3.3,0.8,0.5,0.1,WHITE],[0.7,1.3,3.3,0.8,0.5,0.1,WHITE],
  [-5,3,-1,1,3,2,l],[4,3,-1,1,3,2,l],[-4.2,10.2,-2.8,5,0.6,5,m],[-4.2,7,3,1.4,3.2,0.3,m],[2,10.2,-1,1.6,0.5,2,shade(m,1.15)]]; }
function dJungleColumn(R){ const s='#a3ad98', d='#727d6a', l='#c2ccb4', h=6+((R()*9)|0), b=[[-2.4,0,-2.4,4.8,1.4,4.8,d],[-1.6,1.4,-1.6,3.2,h,3.2,s],[-1.6,1.4,1.6,0.6,h,0.12,l],[0.9,1.4,1.6,0.5,h,0.12,d],[-1.9,1.4+h*0.5,-1.9,3.8,0.8,3.8,d]];
  if(h>10) b.push([-2.2,1.4+h,-2.2,4.4,1.2,4.4,l],[-2.6,2.6+h,-2.6,5.2,0.8,5.2,s]); else b.push([-1.6,1.4+h,-1.6,1.6,1,3.2,s],[0.2,1.4+h,-1.6,1,0.5,2,l]);
  b.push([3.4,0,-0.5,3,2.6,2.8,s],[3.4,0,2.3,3,2.6,0.12,d],[-1.6,h*0.3,1.7,1.6,1.4,0.3,W2_STONE[3]]);
  return b; }
function dJungleLantern(){ const g='#2a9c50'; return [[-0.4,0,-0.4,0.8,6.5,0.8,g],[-0.4,6.5,-0.4,2.4,0.8,0.8,g],[1.6,5.2,-0.4,0.6,1.4,0.8,g],[-2,2,-0.3,1.8,0.9,0.7,g],[0.3,3.6,-0.3,1.8,0.9,0.7,shade(g,1.2)]]; }
/* far scenery, in tiles: a hill whose shoulders bulge with treetops; a cliff with a waterfall; a clump of trees on an islet */
function w2Hill(list,cx,top,z,w,col,R){ const l=shade(col,1.1), d=shade(col,0.9), steps=4+((R()*3)|0); let ww=w*0.3, y=top;
  for(let k=0;k<steps;k++){ const hh=1.4+R()*1.2; list.push([cx-ww/2,y-hh,z-2.5,ww,hh,5,k%2?col:l]);
    for(const s of [-1,1]) if(R()<0.8){ const bw=2+R()*3; list.push([cx+s*ww/2-bw/2,y-hh*0.5,z-2,bw,1+R()*1.4,4.2,R()<0.5?l:d]); }
    if(k===0) list.push([cx-ww*0.2+R()*ww*0.2,y,z-1.5,ww*0.35,0.8+R(),3,l]);
    y-=hh; ww+=w*0.7/steps; }
  list.push([cx-ww/2,y-36,z-2.5,ww,36,5,col]); }
function w2Falls(S,R,x,z,h,wy){ const s='#7f9684', sl='#96ad98', sd='#667c6c', g='#3fae62', far=S.far, gw=S.glowFar;
  far.push([x-13,0,z-4,26,h*0.8,8,s],[x-9,0,z-5,18,h,9,sl],[x-16,0,z-3,8,h*0.55,6,sd],[x+9,0,z-3,9,h*0.62,6,sd]);
  far.push([x-9.5,h,z-5.5,19,0.9,10,g],[x-13.5,h*0.8,z-4.5,5,0.8,9,g],[x+9,h*0.8,z-4.5,4.5,0.7,9,g],[x-16.5,h*0.55,z-3.5,4,0.7,7,shade(g,0.9)],[x+13,h*0.62,z-3.5,5.5,0.7,7,shade(g,0.9)]);
  for(let k=0;k<5;k++){ const tx=x-8+R()*16; if(Math.abs(tx-x)<3.5) continue; far.push([tx-1.5,h+0.9,z-3,3+R()*2,1.5+R()*1.5,4,pick(R,['#2c9a5a','#37ab66'])]); }
  gw.push([x-2.2,wy,z+4.05,4.4,h+0.9-wy,0.3,'#dff8ff'],[x-2.2,h+0.6,z-1,4.4,0.35,5.3,'#dff8ff']);
  for(let k=0;k<4;k++) gw.push([x-1.9+k*1.05+R()*0.3,wy,z+4.3,0.35,h+0.6-wy,0.12,'#a8e6f5']);
  for(let k=0;k<7;k++) gw.push([x-4+R()*7,wy,z+4.2+R()*2.5,1.2+R()*1.6,0.5+R()*0.9,1,WHITE]);
  S.soft.push([x-5,wy+0.4,z+5,10,2.2,2,'#f2fffb'],[x-3.5,wy+2.2,z+5.5,7,1.4,1.5,'#f2fffb']);
  for(let k=0;k<6;k++){ const m=new T.Mesh(geo('w2fleck',()=>[[-0.3,0,0,0.6,1.6,0.1,WHITE]],1),MAT.glow), ph=R(), v=5+R()*3; m.position.set(x-1.7+R()*3.4,h,z+4.5); world.add(m);
    critters.push({tick(dt,time){ const u=(time*v/(h-wy)+ph)%1; m.position.y=h-u*(h-wy); }}); }
}
function w2Clump(far,x,z,R,wy){ far.push([x-3,0,z-2,6,wy+0.4,4,'#4fbf5a'],[x-2,wy+0.4,z-1.4,2.2,0.5,2.4,'#62d84e']);
  if(R()<0.22){ const h=3+R()*4; far.push([x-0.6,wy,z-0.6,1.2,h,1.2,'#a3ad98'],[x-0.8,wy+h,z-0.8,1.6,0.4,1.6,'#c2ccb4'],[x+1.4,wy,z-0.5,1.1,h*0.5,1.1,'#93a08c'],[x-0.6,wy+h*0.6,z+0.6,0.7,0.6,0.08,'#3fae55']); return; }
  const n=1+((R()*3)|0); for(let i=0;i<n;i++){ const tx=x-2+R()*4, h=3.5+R()*5, g=pick(R,W2_GREENS), cw=4+R()*2.5;
    far.push([tx-0.35,wy,z-0.35,0.7,h,0.7,'#7a4d2c'],[tx-cw/2,wy+h,z-1.8,cw,1.9,3.6,g],[tx-cw/2+0.7,wy+h+1.9,z-1.3,cw-1.4,1.4,2.6,shade(g,1.15)],[tx-cw/2-0.5,wy+h+0.5,z-1.2,0.6,1,2.4,shade(g,0.85)]); } }
/* a parrot or a butterfly: a body and two wings that flap */
function w2Flyer(key,body,wl,wr,scale){ const g=new T.Group(), l=new T.Mesh(geo(key+'L',()=>wl),MAT.soft), r=new T.Mesh(geo(key+'R',()=>wr),MAT.soft); g.add(new T.Mesh(geo(key,()=>body),MAT.soft),l,r); g.scale.setScalar(scale||1); g.userData={l,r}; world.add(g); return g; }

THEMES.jungle={ music:'jungle',
  sky:['#2a9be8','#9ee4dc','#f9f6c2'], skyMid:0.5, glowCol:0xfff3b0, sunGlow:0.8,
  fog:0xd6f0c0, fogNear:14, fogFar:135,
  hemiSky:0xfdfff0, hemiGround:0x9fc47a, hemiI:0.6, sunI:0.68, sunCol:0xfff1c8, sunDir:[-0.5,0.72,0.5],
  top:'#62d84e', topS:['#7be662','#52c843','#6fe058','#49bd3c'], dirt:'#a4552f', dirtS:['#8f4526','#b96a3c','#7d3a1f'], cap:'#62d84e', capL:'#a2f27c', capD:'#2f8f34',
  brick:['#ff9a3d','#c25a12','#ffd08a'], hard:['#9aa890','#c9d6b8','#5f6e5a'], pipe:['#a35ce0','#d9b3ff','#6f35a8','#3a1a5c'],
  semi:'plank', plat:['#ff7ac0','#c2478a'], dust:'#e8f7c0', back:-7, fringe:['#62d84e','#49bd3c','#8cf06a'],
  liquid:{kind:'water',a:'#17897a',b:'#b6f2dc',op:0.82,far:34}, pool:{kind:'water',a:'#1f9a88',b:'#c8f7e4',op:0.6},
  disc:['#ffe14d','#fff3a0','#e08a12'], bloom:0.85, hi:0.1,
  looks:[null,
    /* noon */
    {sky:['#1787e0','#7fd0f0','#e9f9d0'],fog:0xcfeed6,sunCol:0xffffff,sunI:0.74,sunDir:[-0.25,0.9,0.42]},
    /* a golden afternoon */
    {sky:['#f0a23c','#ffd98a','#fff3c0'],fog:0xf4dc9a,sunCol:0xffd890,hemiSky:0xfff0d0,glowCol:0xffc060,sunDir:[-0.6,0.5,0.5],disc:['#ffb03d','#ffe08a','#b3620f'],liquid:{kind:'water',a:'#3fae8c',b:'#fff0b0',op:0.8,far:34}},
    /* a misty green dawn, with fireflies */
    {sky:['#3f8f7a','#9fd6a8','#e6f5c0'],fog:0xb9dfae,fogNear:5,fogFar:80,hemiSky:0xd8f5d8,hemiGround:0x6fa070,hemiI:0.58,sunI:0.5,sunCol:0xf0ffd0,sunDir:[-0.4,0.6,0.6],fireflies:true,sunGlow:0.5,disc:['#f4ffc8','#ffffe6','#9ab36a'],
      liquid:{kind:'water',a:'#2a9a86',b:'#d8ffe0',op:0.8,far:34}},
    /* dusk, with long shadows */
    {sky:['#5a2a6a','#e8603c','#ffc070'],fog:0xe89a6a,sunCol:0xff9a50,hemiSky:0xffc8a8,hemiGround:0x8a6a5a,hemiI:0.5,sunI:0.8,glowCol:0xff6a3a,sunDir:[-0.85,0.28,0.4],stars:0.35,fireflies:true,disc:['#ff6a3d','#ffb37a','#a8320f'],
      liquid:{kind:'water',a:'#3a7a8a',b:'#ffc8a0',op:0.8,far:34}}],
  /* the far view: the river, a far bank of hills fading into mist, a waterfall or two, a stepped temple, islets of trees,
     great trunks close behind the shelf with the canopy overhead, and parrots and butterflies */
  scenery(S,R){
    const W=S.W, H=S.H, far=S.far, tall=H>20, lk=S.TH, wy=S.L.liquidY;
    far.push([-90,0,-140,W+180,wy+0.3,106,'#49a85e']);
    for(let x=-90;x<W+90;x+=7+R()*7) far.push([x,0,-36+R()*2.5,8,wy+0.5,5,'#55b866'],[x+R()*4,wy+0.5,-34.5,2.5+R()*2,0.8+R()*1.2,2,pick(R,W2_GREENS)]);
    for(let x=-80;x<W+80;x+=20+R()*22) w2Hill(far,x,10+R()*10+(tall?R()*H*0.55:0),-64-R()*30,24+R()*24,pick(R,['#3aa868','#33a060','#44b472']),R);
    for(let x=-60;x<W+60;x+=16+R()*18) w2Hill(far,x,5+R()*6+(tall?R()*H*0.3:0),-41-R()*12,14+R()*14,pick(R,['#2c9a5a','#279152','#33a663']),R);
    for(const fx of (tall?[W*0.5+8]:[W*0.2+R()*12,W*0.7+R()*16])) w2Falls(S,R,fx,-54-R()*5,tall?H*0.85:15+R()*4,wy);
    /* the temple: a stepped pyramid with a stair up its face and a shrine on top */
    { const tx=tall?W*0.5-22:W*0.45+R()*20, tz=-47, tw=24, n=6, hh=tw*0.55/n, th=wy+n*hh;
      pyramid(far,tx,wy,tz,tw,n,'#a9b39c');
      for(let k=0;k<n;k++){ const ww=tw*(1-k/n); far.push([tx-1.5,wy+k*hh,tz+ww/2,3,hh,0.5,'#d2dbc4']); if(R()<0.8) far.push([tx-ww/2+R()*(ww-4),wy+(k+1)*hh,tz+ww/2-1.2,2+R()*3,0.3,1.2,'#3fae62']); }
      far.push([tx-2.6,th,tz-2.6,5.2,3,5.2,'#97a28c'],[tx-3.4,th+3,tz-3.4,6.8,0.9,6.8,'#b9c3ab'],[tx-2.2,th+3.9,tz-2.2,4.4,0.8,4.4,'#97a28c']);
      S.glowFar.push([tx-0.8,th,tz+2.6,1.6,2.2,0.15,'#ffd95e']); }
    for(let x=-30;x<W+30;x+=8+R()*11) w2Clump(far,x,-14-R()*15,R,wy);
    for(let x=-10;x<W+10;x+=2.5+R()*5){ const z=-9.5-R()*14; far.push([x,wy+0.03,z,1.3,0.05,1,'#4fc46a']); if(R()<0.4) far.push([x+0.4,wy+0.08,z+0.3,0.36,0.22,0.36,pick(R,['#ff8fc7','#fff3a0'])]); }
    /* great trees close behind the shelf: their crowns are the canopy overhead (or, in a tall level, tier upon tier of it) */
    for(let x=-12;x<W+12;x+=12+R()*11){ const z=-9.4-R()*3.6, top=tall?H+6:18, g=pick(R,W2_GREENS), gl=shade(g,1.18), gd=shade(g,0.84);
      far.push([x-0.75,0,z-0.75,1.5,top,1.5,'#7a4d2c'],[x-1.6,0,z-0.6,0.8,2.4+R()*2,1.2,'#63391f'],[x+0.8,0,z-0.6,0.9,1.8+R()*2,1.2,'#63391f'],[x-1,top*0.3,z-1,2,0.4,2,'#63391f']);
      for(let cy=tall?9+R()*5:12.3+R()*0.8;cy<top;cy+=tall?8+R()*6:99){ const w=9+R()*5, ox=tall?(R()-0.5)*8:(R()-0.5)*2, c8=(x+ox)*8, y8=cy*8, z8=z*8, sw=1.6/cy;
        S.flora.push([c8-w*4,y8,z8-24,w*8,15,48,gd,0,sw],[c8-w*4-10,y8+13,z8-28,w*8+20,20,56,g,0,sw],[c8-w*4+12,y8+31,z8-22,w*8-24,16,44,gl,0,sw]);
        for(let k=0;k<4;k++){ const vx=c8-w*4+6+R()*(w*8-12), len=10+R()*26; S.flora.push([vx,y8-len,z8+20+R()*4,1.1,len,1.1,'#177a3c',0,sw]); if(R()<0.5) S.flora.push([vx-1,y8-len-1.5,z8+20,3,2,2,gl,0,sw]); }
        if(R()<0.5){ const fx=c8-w*3+R()*w*6; S.flora.push([fx,y8-3,z8+22,2.2,3.4,2.2,pick(R,W2_BEANS),0,sw]); } } }
    for(let x=-50;x<W+50;x+=14+R()*14) S.addCloud(x,(tall?8+R()*H:9+R()*8),-50-R()*40,R,lk.cloudTint);
    skyDisc(lk.disc,null,tall?H*0.74:14.5);
    /* parrots cross the sky; butterflies dither about just behind the lane */
    for(let i=0;i<Math.ceil(W/45)+(tall?3:0);i++){ const c=pick(R,[['#ff3b4a','#3a7bff','#ffe14d'],['#3a7bff','#ffe14d','#ff3b4a'],['#3fcf5a','#ff3b4a','#3a7bff']]), k='w2parrot'+c[0];
      const g=w2Flyer(k,[[-1,-0.7,-2.4,2,1.6,4.6,c[0]],[-0.5,-0.3,2.2,1,0.7,1.1,'#fff2c2'],[-0.5,-0.4,-6,1,0.5,3.8,c[1]],[-0.8,0.1,1,1.6,1,0.2,WHITE]],[[-5,0,-1.2,5,0.6,2.6,c[1]],[-6.6,0,-0.8,1.6,0.5,1.6,c[2]]],[[0,0,-1.2,5,0.6,2.6,c[1]],[5,0,-0.8,1.6,0.5,1.6,c[2]]]);
      const z=-8-R()*14, y0=tall?6+R()*(H-10):8.5+R()*3.5, v=(R()<0.5?-1:1)*(1.8+R()*1.6), ph=R()*9; g.position.set(R()*W,y0,z); g.rotation.y=v>0?Math.PI/2:-Math.PI/2;
      critters.push({tick(dt,time){ g.position.x+=v*dt; if(g.position.x>W+30) g.position.x=-30; else if(g.position.x<-30) g.position.x=W+30; g.position.y=y0+Math.sin(time*0.6+ph)*0.9; const f=Math.sin(time*8+ph)*0.7; g.userData.l.rotation.z=-f; g.userData.r.rotation.z=f; }}); }
    for(let i=0;i<Math.ceil(W/16);i++){ const c=pick(R,W2_BEANS), g=w2Flyer('w2fly'+c,[[-0.3,-0.2,-1.4,0.6,0.5,2.8,INK]],[[-3,0,-1.6,3,0.3,3.2,c],[-2.2,0.3,-0.8,1.2,0.1,1.4,WHITE]],[[0,0,-1.6,3,0.3,3.2,c],[1,0.3,-0.8,1.2,0.1,1.4,WHITE]],0.55);
      const x0=R()*W, y0=tall?3+R()*(H-8):3+R()*5, z=-1.6-R()*3.5, ph=R()*9, a=0.3+R()*0.3; g.rotation.y=Math.PI/2;
      critters.push({tick(dt,time){ const t=time*a+ph; g.position.set(x0+Math.sin(t)*4+Math.sin(t*2.7)*0.8,y0+Math.sin(t*1.9)*1.1+Math.sin(time*6+ph)*0.12,z); g.rotation.y=Math.cos(t)>0?Math.PI/2:-Math.PI/2; const f=Math.abs(Math.sin(time*11+ph))*1.25; g.userData.l.rotation.z=-f; g.userData.r.rotation.z=f; }}); }
    if(lk.fireflies) S.addMotes(0xe6ff7a,Math.round(70*H/16),0.13,0,true); else S.addMotes(0xfff6b8,Math.round(46*H/16),0.07);
  },
  /* on the grass: trees, totems, idols and broken columns at the back; ferns, great leaves, bean bushes, mushrooms and
     lantern flowers among them; flowers along the lip */
  decor(S,D,R){
    const r=R(), y=D.ty*8, gl=S.L.goal;
    /* where the flag stands high up, the terraces under the hut keep their props well back from it */
    const deep=gl&&gl.y>2&&D.x>=gl.x+3&&D.x<=gl.x+9, zb=(a,b)=>D.zb(deep?Math.max(a,3.9):a,deep?Math.max(b,6.2):b);
    if(D.wet){ if(r<0.35) put(S.flora,dTuft('#2f9c78'),D.jx(),y,zb(1.2,5),1.5); else if(r<0.5) put(S.near,dRock('#8f9a86'),D.jx(),y,zb(1.2,5)); return; }
    if(r<0.075&&D.free(7)&&D.open) put(S.flora,dJungleTree(R),D.jx(),y,zb(3,5.8),0.3);
    else if(r<0.1&&D.free(3)&&D.open) put(S.near,dJungleTotem(R),D.jx(),y,zb(2.2,5.6));
    else if(r<0.118&&D.free(3)&&D.open){ const x=D.jx(), z=zb(2.4,5.6); put(S.near,dJungleIdol(),x,y,z); put(S.glow,[[-2.7,4.4,3.3,1.5,0.8,0.1,'#7dffe6'],[1.1,4.4,3.3,1.5,0.8,0.1,'#7dffe6']],x,y,z); }
    else if(r<0.15&&D.free(3)&&D.open) put(S.near,dJungleColumn(R),D.jx(),y,zb(2,5.8));
    else if(r<0.23) put(S.flora,dJungleLeaf(pick(R,['#3fc45a','#35b552','#52d06a'])),D.jx(),y,zb(1.5,6.2),1.1);
    else if(r<0.32) put(S.flora,dJungleFern(pick(R,['#2fae58','#3fc45a','#279a4c'])),D.jx(),y,zb(1.3,6.4),1.3);
    else if(r<0.375) put(S.near,dJungleBush(R),D.jx(),y,zb(1.7,6.2));
    else if(r<0.41&&D.free(2)) put(S.flora,dJungleBeanStalk(pick(R,W2_BEANS)),D.jx(),y,zb(1.5,5.8),0.8);
    else if(r<0.455) put(S.near,dJungleShroom(pick(R,W2_BEANS)),D.jx(),y,zb(1.3,6));
    else if(r<0.485){ const x=D.jx(), z=zb(1.4,5.5); put(S.near,dJungleLantern(),x,y,z); put(S.glow,[[0.9,2.4,-1.1,2,2.8,2.2,'#ffd95e'],[1.2,2,-0.8,1.4,0.4,1.6,'#ffb02e']],x,y,z); if(S.TH.fireflies) lamps.push({x:x/8,y:D.ty+0.6,z:z/8+0.4,col:0xffc85a,power:0.9,reach:6}); }
    else if(r<0.53) put(S.near,dRock(pick(R,['#93a08c','#7f8c7a'])),D.jx(),y,zb(1.2,6));
    const f=R();
    if(f<0.14) put(S.flora,dFlower(pick(R,W2_BEANS)),D.jx(),y,D.zf(),1.5);
    else if(f<0.2) put(S.near,dShroom(pick(R,W2_BEANS)),D.jx(),y,D.zf());
    else if(f<0.26) put(S.flora,dTuft('#49bd3c'),D.jx(),y,D.zf(),2);
    if(R()<0.22) put(S.flora,dFlower(pick(R,W2_BEANS)),D.jx(),y,zb(1.1,6.6),1.5);
  }
};

/* 2-1: a walk under the canopy. Springshrooms and Boings, and the first Bonk, who can be coaxed into smashing a wall. */
function w2l1(){
  const B=LevelBuilder(264,'jungle');
  B.room(0,231).room(236,263,0,15,true);
  B.ground(0,60).ground(64,97).ground(102,139).ground(144,235);
  B.coins(8,3,3).row(13,5,'?B?').enemy('blob',18);
  /* the first springshroom, and a ledge in the trees with the first shard */
  B.sign(22,'Jump onto a springshroom and it throws you high.');
  B.spring(26).row(28,8,'=====').coins(28,9,2).coins(31,9,2).shard(30,10);
  B.row(38,5,'?M?').enemy('boing',45).coins(48,3,3).enemy('boing',54);
  B.arc(60,4,5);
  B.pipe(67,2,true).row(72,5,'B?B').enemy('blob',76);
  B.spring(80).row(82,7,'===').coins(82,8,3).row(87,9,'====').coins(87,10,4).row(89,13,'I').enemy('batty',93,7,{rx:2.5});
  B.arc(98,4,5).enemy('snapper',99.5,2,{rise:4});
  B.checkpoint(105);
  /* Bonk's run: a block to stop him at one end, a brick wall at the other, and a springshroom for going over it */
  B.sign(108,'Bonk charges when he sees you. Jump over him, and he may smash that wall for you!');
  B.fill(110,2,110,2,HARD).enemy('rammy',121).spring(124).fill(127,2,128,6,BRICK).coins(127,7,2).coins(131,3,4);
  B.enemy('snapper',141.5,2,{rise:4,phase:0.8});
  /* a pound on a springshroom goes far higher: the only way up to the second shard */
  B.sign(147,'Ground pound a springshroom ({down} in the air) for a mighty bounce.');
  B.spring(151).row(153,11,'===').shard(154,12).coinCol(151,6,4);
  B.row(158,5,'B?MB').enemy('boing',162);
  /* a pipe on a stone lintel, up among the leaves: the way to the hidden grove */
  B.spring(167).fill(170,6,173,7,HARD).warp(171,2,'in',false,8).coins(170,3,4);
  B.warp(179,3,'out',true).enemy('blob',185).row(187,5,'?B?').enemy('rammy',192).enemy('boing',196);
  B.stairs(200,6).fill(206,2,206,7,HARD);
  B.goal(212);
  /* the hidden grove */
  B.fill(232,0,235,15,GROUND).fill(236,2,236,15,HARD).fill(263,2,263,15,HARD).ground(236,263);
  B.warp(238,2,'in',true).spring(243).row(245,8,'===').coins(245,9,3).row(250,10,'===').shard(251,11).coinBox(247,3,254,4).row(256,5,'L').warp(259,2,'out');
  return B.L;
}

/* where a pod at tile (x,y), aimed ang degrees at power P, has thrown Blorp after t seconds if he does not steer */
function w2Arc(x,y,ang,P,t){ const a=ang*Math.PI/180, vx=Math.sin(a)*P; let vy=Math.cos(a)*P, py=y+0.5; for(let s=0;s<t;s+=1/120){ vy=Math.max(-15,vy-(vy>0?28.125:98.4)/120); py+=vy/120; } return [x+0.5+vx*t,py]; }
/* a launch pod, and a trail of coins along its throw between two moments of it */
function w2Pod(B,x,y,ang,P,t0,t1){ B.pod(x,y,ang,P); for(let t=t0;t<=t1+0.001;t+=0.13){ const q=w2Arc(x,y,ang,P,t); B.coins(Math.floor(q[0]),Math.floor(q[1]),1); } return B; }

/* 2-2: pod hopping. Launch pods fire Blorp from islet to islet across the river: one safe pod, then pods that hang in
   mid-air, in chains of two and of three. */
function w2l2(){
  const B=LevelBuilder(306,'jungle');
  B.room(0,275).room(280,305,0,15,true);
  B.ground(0,25).ground(30,46).ground(55,70).ground(79,92,5).ground(108,158).ground(188,203).ground(233,305);
  B.coins(6,3,3).row(11,5,'?M?').enemy('blob',15);
  B.sign(18,'Jump into a launch pod and it fires you the way it points.');
  w2Pod(B,22,3,30,20,0.2,0.9);
  B.pipe(36,2,true).enemy('snippy',41);
  w2Pod(B,44,3,30,22,0.2,1.05); B.enemy('snapper',50.5,2,{rise:3});
  /* a pod overhead throws Blorp up to a ledge in the trees and the first shard */
  B.sign(59,'Pods can hang high up, too. Jump into that one!').row(60,5,'I');
  B.pod(62,5,12,19).row(64,9,'=====').coins(64,10,2).shard(67,11).enemy('boing',67);
  w2Pod(B,69,3,35,22,0.2,0.8); B.enemy('snapper',74.5,2,{rise:3,phase:0.7});
  /* a tall islet, and the first pod that hangs over the river */
  B.row(84,8,'B?B').enemy('snippy',87,5);
  w2Pod(B,91,6,30,20,0.2,0.7); w2Pod(B,100,8,40,20,0.2,1.15);
  /* a low arch of earth in midstream: the second shard is under it, for a diver */
  B.enemy('snapper',96.5,2,{rise:3}).fill(101,1,103,1,GROUND).shard(102,0);
  B.checkpoint(121);
  /* the lagoon, with a sunken pipe at the bottom of it */
  B.stairs(124,3).ground(127,142,5).clear(129,2,140,4).water(129,2,140,4).stairs(143,3,-1);
  B.warp(134,1,'in').coins(134,3,2).coins(130,3,2).coins(138,3,2);
  B.warp(147,2,'out',true).row(150,5,'?F?').enemy('shellby',152);
  /* three pods in a row, twice */
  w2Pod(B,156,3,30,22,0.2,0.75); w2Pod(B,166,7,35,20,0.2,0.8); w2Pod(B,177,7,40,20,0.2,1.1);
  B.enemy('snapper',163.5,2,{rise:3}).enemy('snapper',183.5,2,{rise:3,phase:0.8});
  B.pipe(196,2,true);
  w2Pod(B,201,3,30,22,0.2,0.75); w2Pod(B,211,7,30,20,0.2,0.95); w2Pod(B,222,6,35,22,0.2,1.25);
  B.enemy('snapper',208.5,2,{rise:3}).enemy('snapper',229.5,2,{rise:3,phase:0.8});
  B.stairs(244,6).fill(250,2,250,7,HARD);
  B.goal(256);
  /* the grotto at the far end of the sunken pipe */
  B.fill(276,2,279,15,GROUND).fill(280,2,280,15,HARD).fill(305,2,305,15,HARD);
  B.warp(282,2,'in',true); w2Pod(B,286,3,20,20,0.15,0.6);
  B.row(289,7,'=======').shard(294,9).coins(290,8,3).row(297,5,'L').warp(301,2,'out');
  return B.L;
}

/* 2-3: the long climb. Up a ruin of grassy terraces, each one a place to land if Blorp falls: a shaft to kick up, a
   ledge that rises, a stair of crumbling blocks, and all three together below the flag at the top. */
function w2l3(){
  const B=LevelBuilder(70,'jungle',48);
  B.ground(0,69);
  B.sign(6,'The flag is at the very top. Where two walls face each other, kick from one to the other to climb.');
  B.coins(9,3,3).row(13,5,'?M?').enemy('blob',19).enemy('boing',30).pipe(40,2,true).coins(45,3,3);
  /* first climb: a shaft to kick up, and the first shard on a ledge just past the top of it */
  B.fill(52,4,52,10,HARD).fill(56,2,56,13,HARD).coinCol(54,4,7).fill(57,13,59,13,HARD).shard(58,14).coins(60,3,4).row(64,5,'?');
  /* the first terrace, walked from right to left */
  B.fill(6,9,51,10,GROUND);
  B.enemy('snippy',44,11).enemy('batty',36,13.5,{rx:3}).row(28,14,'?B?').enemy('prickle',21,11).coins(14,12,3);
  /* second climb: a ledge that rises and sinks */
  B.plat(9,12.5,3,'y',5,1.2).coinCol(10,14,3);
  /* the second terrace. A trapdoor of crumbling blocks drops to a stone shelf under it, where the second shard is. */
  B.fill(14,18,69,19,GROUND);
  B.checkpoint(19,20);
  B.row(24,23,'?M?').enemy('shellby',30,20);
  B.clear(35,18,40,18).row(36,19,'KK').fill(35,16,40,16,HARD).shard(39,17).coins(36,20,2);
  B.fill(43,20,43,20,HARD).enemy('rammy',49,20).fill(55,20,55,20,HARD);
  /* third climb: crumbling steps */
  B.sign(59,'Cracked blocks crumble under your feet. Keep moving!',20);
  B.row(64,22,'KK').row(60,24,'KK').row(56,26,'KK').coins(64,23,2).coins(60,25,2).coins(56,27,2);
  /* the third terrace, with a gap that a sliding ledge crosses */
  B.fill(2,27,53,28,GROUND).clear(26,27,33,28).plat(26,29,3,'x',5,1.1).coins(28,31,4);
  B.pipe(44,2,true,29).enemy('batty',38,32.5,{rx:3}).row(18,32,'I').enemy('boing',20,29);
  /* last climb: kick up, cross a crumbling bridge. Higher still, out of sight, the third shard. */
  B.fill(2,29,2,45,HARD).fill(6,31,6,35,HARD).coinCol(4,30,6).row(7,35,'KKKK').fill(11,36,12,36,HARD);
  B.fill(6,39,6,43,HARD).fill(7,43,9,43,HARD).shard(8,44).coinCol(4,38,3);
  /* the top */
  B.fill(13,36,69,37,GROUND).coins(18,39,4);
  B.stairs(32,4,1,38).fill(36,38,36,41,HARD);
  B.goal(42,38);
  return B.L;
}

function w2stub(last){ return ()=>{ const B=LevelBuilder(120,'jungle'); B.ground(0,119).shard(8,3).shard(10,3).shard(12,3); if(last) B.fill(100,2,119,13,GROUND).boss(80,60,95,9,'bongo'); else B.goal(100); return B.L; }; }
defWorld({name:'Jellybean Jungle',theme:'jungle',levels:[w2l1,w2l2,w2l3,w2stub(),w2stub(true)]});
