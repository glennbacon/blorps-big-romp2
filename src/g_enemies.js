/* ================= monsters ================= */
/* Every kind of monster is one entry here. What the rest of the game needs to know about a kind is in its flags:
     stomp      landing on it squishes it (or calls stomped(), for the ones that turn into something)
     flip       a ground pound's shock bowls it over even though it cannot be stomped
     fly        it ignores the ground, other walkers and pounds
     heavy      nothing bowls it over: not a bump from below, not a shell, not a star
     fireproof  fire spit does nothing
     bouncy     landing on it is safe and bounces Blorp, but does not hurt it
   and in its functions: init(e,d) sets it up from the level's description d, mesh(e) builds its model, tick(e,dt) is
   one step of the rules, anim(e,m,dt,time) is looks only, box(e) gives [bottom,height] of where it can be touched
   right now, or null for nowhere. */
const ETYPES={};
function defEnemy(name,K){ K.name=name; ETYPES[name]=K; }
const G1=(key,f,mat)=>{ const g=new T.Group(); g.add(vmesh(key,f,mat)); return g; };
function spawnEnemy(d){
  const K=ETYPES[d.type], e={type:d.type,K,x:d.x,y:d.y,vx:0,vy:0,w:K.w||0.8,h:K.h||0.8,active:false,dead:false,gone:false,flip:false,deadT:0,onGround:false,shell:false,kick:0,chain:0,t:Math.random()*6};
  if(K.init) K.init(e,d);
  e.mesh=K.mesh(e); e.mesh.position.set(e.x,e.y,0); world.add(e.mesh); enemies.push(e); return e;
}
const hitBox=e=>e.K.box?e.K.box(e):[e.y,e.h];
const onScreen=(e,m)=>Math.abs(e.x-camX)<viewHalfW+(m||0);
function killEnemy(e,how,dir){
  if(e.dead) return; e.dead=true;
  if(how==='squish'&&!e.K.fly){ e.flip=false; e.deadT=0.45; e.mesh.scale.set(1.25,0.28,1.25); sfx.stomp(player.combo); }
  else { e.flip=true; if(how==='squish'){ e.vy=1; e.vx=0; sfx.stomp(player.combo); } else { e.vy=9; e.vx=(dir||1)*3; sfx.kick(); } if(e.K.unroot) e.K.unroot(e); }
  burst(e.x,e.y+e.h*0.5,WHITE,5,3,0.1,0.35);
}
/* ordinary walking: gravity, walls turn it round, belts carry it; true if it met a wall */
function walk(e,dt){
  e.vy-=55*dt; if(e.vy<-MAX_FALL) e.vy=-MAX_FALL;
  let hit=false; if(e.vx&&moveX(e,e.vx*dt)){ e.vx=-e.vx; hit=true; }
  const r=moveY(e,e.vy*dt); if(r===1){ e.vy=0; e.onGround=true; const b=beltAt(e); if(b) moveX(e,b*dt); } else { if(r===2) e.vy=0; e.onGround=false; }
  return hit;
}
/* no ground ahead of a walker that minds its step */
function ledgeAhead(e){ const ax=Math.floor(e.x+sgn(e.vx)*(e.w/2+0.15)), ay=Math.floor(e.y-0.5); return e.onGround&&!solidAt(ax,ay)&&!semiAt(ax,ay); }
/* something sliding along the ground knocks over whatever it meets */
function sweep(e){
  for(const o of enemies){ if(o===e||!o.active||o.dead||o.gone) continue; const b=hitBox(o); if(!b) continue;
    if(Math.abs(o.x-e.x)<(o.w+e.w)/2&&b[0]<e.y+e.h&&b[0]+b[1]>e.y){
      if(o.K.boss){ damageBoss(o,3); killEnemy(e,'flip',-sgn(e.vx)); return true; }
      if(o.K.heavy) continue;
      killEnemy(o,'flip',sgn(e.vx)); addScore([500,800,1000,2000,4000,8000][Math.min(e.chain,5)],o.x,b[0]+b[1]); e.chain++; } }
  return false;
}
function explode(x,y){
  sfx.explode(); shake(0.4); flash(0.22); ring(x,y-0.3,'#ffd23e',3.6,0.4); burst(x,y,'#ff7a1f',14,8,0.2,0.6,true); burst(x,y,'#ffe14d',10,6,0.16,0.5,true); burst(x,y,'#3a2a55',8,5,0.2,0.7);
  for(const o of enemies){ if(!o.active||o.dead||o.gone) continue; const b=hitBox(o); if(!b) continue;
    if(Math.abs(o.x-x)<2.2+o.w/2&&b[0]<y+2.2&&b[0]+b[1]>y-2.2){ if(o.K.boss) damageBoss(o,3); else if(!o.K.heavy){ killEnemy(o,'flip',sgn(o.x-x)); addScore(500,o.x,b[0]+b[1]); } } }
  for(let ty=Math.floor(y-1.6);ty<=Math.floor(y+1.6);ty++) for(let tx=Math.floor(x-1.6);tx<=Math.floor(x+1.6);tx++) if(tileAt(tx,ty)===BRICK&&!L.contents.get(ty*W+tx)) breakBrick(tx,ty);
  const p=player; if(Math.abs(p.x-x)<1.9&&p.y<y+1.9&&p.y+p.h>y-1.9) hurtPlayer();
}

/* ---------- the first game's monsters ---------- */
defEnemy('blob',{stomp:true, init(e){ e.vx=-1.9; }, mesh:()=>G1('blob',mBlob), tick(e,dt){ walk(e,dt); },
  anim(e,m,dt,time){ m.rotation.y=(e.vx>0?1:-1)*0.8; m.rotation.z=Math.sin(time*11+e.x)*0.1; }});
defEnemy('spikit',{h:0.75,flip:true, init(e){ e.vx=-1.6; }, mesh:()=>G1('spikit',mSpikit), tick(e,dt){ walk(e,dt); },
  anim(e,m,dt,time){ m.rotation.y=(e.vx>0?1:-1)*0.8; m.rotation.z=Math.sin(time*14+e.x)*0.06; }});
function toShell(e){ e.shell=true; e.vx=0; e.h=0.62; e.shellT=0; e.kick=0.25; e.chain=0; const u=e.mesh.userData; u.slug.visible=false; u.shell.position.set(0,0,0); }
function fromShell(e){ e.shell=false; e.vx=player.x<e.x?-1.7:1.7; e.h=0.9; const u=e.mesh.userData; u.slug.visible=true; u.shell.position.set(0,1.4*S8,-0.9*S8); e.mesh.rotation.set(0,0,0); }
defEnemy('shellby',{h:0.9,stomp:true, init(e){ e.vx=-1.7; e.shellT=0; },
  mesh(){ const g=new T.Group(), u=g.userData; u.slug=vmesh('slug',mSlug); u.shell=vmesh('shell',mShell); u.shell.position.set(0,1.4*S8,-0.9*S8); g.add(u.slug,u.shell); return g; },
  stomped(e){ toShell(e); },
  tick(e,dt){ const hit=walk(e,dt);
    if(e.shell){ if(e.vx){ e.shellT=0; if(hit&&onScreen(e,1)) sfx.bump(); sweep(e); } else { e.shellT+=dt; if(e.shellT>7) fromShell(e); } } },
  anim(e,m,dt,time){
    if(e.shell){ if(e.vx) m.rotation.y+=dt*18*sgn(e.vx); m.rotation.z=e.shellT>5?Math.sin(time*40)*0.1:0; }
    else { m.rotation.y=(e.vx>0?1:-1)*1.1; m.rotation.z=0; m.position.y+=Math.abs(Math.sin(time*6+e.x))*0.03; } }});
defEnemy('batty',{h:0.7,stomp:true,fly:true, init(e,d){ e.ox=d.x; e.oy=d.y; e.rx=d.rx||3; e.ry=d.ry||1; e.sp=d.sp||1.3; },
  mesh(){ const g=new T.Group(), u=g.userData; u.body=vmesh('batty',mBatty); u.wl=vmesh('wingL',()=>mWing(-1)); u.wr=vmesh('wingR',()=>mWing(1)); u.wl.position.set(-2.5*S8,3.2*S8,0); u.wr.position.set(2.5*S8,3.2*S8,0); g.add(u.body,u.wl,u.wr); return g; },
  tick(e){ e.x=e.ox+Math.sin(e.t*e.sp)*e.rx; e.y=e.oy+Math.sin(e.t*e.sp*2)*e.ry; },
  anim(e,m,dt,time){ const u=m.userData; u.wl.rotation.z=Math.sin(time*16+e.ox)*0.7; u.wr.rotation.z=-u.wl.rotation.z; m.rotation.y=Math.cos(e.t*e.sp)*0.5; }});
defEnemy('boing',{stomp:true,solo:true, init(e){ e.wait=0.8; }, mesh:()=>G1('boing',mBoing),
  tick(e,dt){ const p=player;
    if(e.onGround){ e.vx=0; e.wait-=dt; if(e.wait<=0){ e.vy=13; e.vx=(p.x<e.x?-1:1)*2.6; e.wait=1+Math.random()*0.7; e.onGround=false; } }
    const vx=e.vx; walk(e,dt); if(!e.onGround&&e.vx===-vx&&vx) e.vx=0; },
  anim(e,m){ const s=e.onGround?1-Math.max(0,0.45-e.wait)*0.6:1+clamp(e.vy,-6,8)*0.02, q=1/Math.sqrt(s); m.scale.set(q,s,q); m.rotation.y=(player.x>e.x?1:-1)*0.7; }});
defEnemy('chomper',{h:1.3,fly:true,heavy:false, init(e,d){ e.top=d.y; e.ext=0; e.ph=Math.random(); e.cy=0; }, mesh:()=>G1('chomper',mChomper),
  box:e=>e.ext<0.3?null:[e.top,e.ext*1.4], unroot(e){ e.y=e.top; },
  tick(e,dt){ const p=player; e.ph+=dt; e.y=e.top;
    if(e.cy===0){ if(e.ph>1.6&&Math.abs(p.x-e.x)>1.7){ e.cy=1; e.ph=0; } }
    else if(e.cy===1){ e.ext=Math.min(1,e.ph/0.6); if(e.ph>=0.6){ e.cy=2; e.ph=0; } }
    else if(e.cy===2){ if(e.ph>1.5){ e.cy=3; e.ph=0; } }
    else { e.ext=Math.max(0,1-e.ph/0.6); if(e.ph>=0.6){ e.cy=0; e.ph=0; } } },
  anim(e,m,dt,time){ m.position.set(e.x,e.top-1.55+e.ext*1.5,0); m.rotation.y=Math.sin(time*2+e.x)*0.35; m.scale.y=1+Math.sin(time*10)*0.05*e.ext; }});
defEnemy('prickle',{h:1.3,flip:false, init(e){ e.throwT=1+Math.random()*1.5; e.aim=false; }, mesh:()=>G1('prickle',mPrickle),
  /* stays put and lobs a seed at Blorp every few seconds */
  tick(e,dt){ const p=player; walk(e,dt); e.aim=Math.abs(p.x-e.x)<10&&!p.dead&&!p.goal;
    e.throwT-=dt; if(e.throwT<=0){ if(e.aim){ e.throwT=2.6; throwAt(e.x,e.y+e.h+0.2,clamp(p.x-e.x,-7,7),9.5,mSeed,'seed'); if(onScreen(e,1)) sfx.spit(); } else e.throwT=0.5; } },
  anim(e,m){ const k=e.aim&&e.throwT<0.4?1+(0.4-e.throwT)*0.6:1; m.scale.set(k,1/k,k); m.rotation.y=(player.x>e.x?1:-1)*0.6; }});
defEnemy('icicle',{w:0.6,h:1,fly:true,fireproof:false, init(e){ e.st=0; e.shakeT=0; }, mesh:()=>G1('icicle',mIcicle),
  /* hangs until Blorp walks underneath, wobbles, then drops and shatters */
  tick(e,dt){ const p=player;
    if(e.st===0){ if(Math.abs(p.x-e.x)<1.8&&p.y<e.y&&!p.dead){ e.st=1; e.shakeT=0.3; } }
    else if(e.st===1){ e.shakeT-=dt; if(e.shakeT<=0) e.st=2; }
    else { e.vy-=40*dt; if(e.vy<-MAX_FALL) e.vy=-MAX_FALL; const py=e.y; e.y+=e.vy*dt; const tx=Math.floor(e.x), ty=Math.floor(e.y);
      if(solidAt(tx,ty)||(semiAt(tx,ty)&&py>=ty+0.999)){ e.gone=true; burst(e.x,ty+1.1,'#dcf6ff',8,4,0.12,0.4); if(onScreen(e)) sfx.shatter(); } } },
  anim(e,m,dt,time){ m.rotation.z=e.st===1?Math.sin(time*50)*0.14:0; }});

/* ---------- new in the sequel ---------- */
/* Snippy the crab: quick, turns back at a ledge, and stops now and then to snap its claws */
defEnemy('snippy',{h:0.7,stomp:true, init(e){ e.vx=-3; e.rest=0; e.go=1.5+Math.random()*2; },
  mesh(){ const g=new T.Group(), u=g.userData; u.cl=vmesh('clawL',()=>mClaw(-1)); u.cr=vmesh('clawR',()=>mClaw(1)); u.cl.position.set(-3.4*S8,2.4*S8,0.6*S8); u.cr.position.set(3.4*S8,2.4*S8,0.6*S8); g.add(vmesh('snippy',mSnippy),u.cl,u.cr); return g; },
  tick(e,dt){
    if(e.rest>0){ e.rest-=dt; const v=e.vx; e.vx=0; walk(e,dt); e.vx=v; if(e.rest<=0) e.go=1.5+Math.random()*2.5; return; }
    if(ledgeAhead(e)) e.vx=-e.vx;
    walk(e,dt); e.go-=dt; if(e.go<=0&&e.onGround) e.rest=0.7; },
  anim(e,m,dt,time){ const u=m.userData, snap=e.rest>0?Math.abs(Math.sin(time*18))*0.9:0.15+Math.sin(time*9+e.x)*0.15; u.cl.rotation.z=snap; u.cr.rotation.z=-snap; m.position.y+=e.rest>0?0:Math.abs(Math.sin(time*16+e.x))*0.04; m.rotation.y=Math.sin(time*2+e.x)*0.12; }});
/* Wobbly the jellyfish: drifts up and down in the water; it stings from every side */
const jellyMat=new T.MeshLambertMaterial({vertexColors:true,transparent:true,opacity:0.86,emissive:0x662255});
defEnemy('jelly',{h:0.9,fly:true, init(e,d){ e.ox=d.x; e.oy=d.y; e.ry=d.ry===undefined?1.6:d.ry; e.rx=d.rx||0; e.sp=d.sp||1; }, mesh:()=>G1('jelly',mJelly,jellyMat),
  tick(e){ const u=e.t*e.sp; e.y=e.oy+Math.sin(u)*e.ry; e.x=e.ox+Math.sin(u*0.5)*e.rx; },
  anim(e,m,dt,time){ const k=1+Math.sin(e.t*e.sp*2)*0.12; m.scale.set(1/k,k,1/k); m.rotation.y=Math.sin(time+e.ox)*0.3; }});
/* Puffer: swims to and fro, and blows itself up to twice the size when Blorp comes near */
defEnemy('puffer',{h:0.8,fly:true, init(e,d){ e.ox=d.x; e.oy=d.y; e.rx=d.rx||3; e.sp=d.sp||0.8; e.puff=0; }, mesh:()=>G1('puffer',mPuffer),
  tick(e,dt){ const p=player, px=e.x; e.x=e.ox+Math.sin(e.t*e.sp)*e.rx; e.y=e.oy+Math.sin(e.t*2.1)*0.15; e.dir=e.x>=px?1:-1;
    const near=Math.abs(p.x-e.x)<3.4&&Math.abs(p.y-e.y)<3.2; e.puff=clamp(e.puff+(near?dt*3.5:-dt*1.2),0,1); const s=0.8+e.puff*0.75; e.w=s; e.h=s; },
  box:e=>[e.y-(e.h-0.8)/2,e.h],
  anim(e,m,dt,time){ const s=1+e.puff*0.9+Math.sin(time*5)*0.02; m.scale.setScalar(s); m.position.y=e.y-(s-1)*0.4; m.rotation.y=e.dir*1.1; }});
/* Snapper: a fish that leaps out of the water in an arc, again and again from the same spot. It can be stomped in the air.
   Its cousin the Emberling does the same out of lava, and cannot. */
function leaper(e,dt){
  if(e.wait>0){ e.wait-=dt; e.y=e.base; if(e.wait<=0){ e.vy=Math.sqrt(2*20*e.rise); if(onScreen(e,1)){ spray(e.x,L.liquidY>0&&e.base<L.liquidY?L.liquidY:e.base+1,e.K.glowing?'#ffb02e':'#bfeaff',6,4,e.K.glowing); if(!e.K.glowing) sfx.splash(); } } return; }
  e.vy-=20*dt; e.y+=e.vy*dt; if(e.y<=e.base&&e.vy<0){ e.y=e.base; e.wait=e.gap; }
}
defEnemy('snapper',{h:0.8,stomp:true,fly:true, init(e,d){ e.base=d.y-1.6; e.y=e.base; e.rise=(d.rise||5)+1.6; e.gap=d.gap||1.6; e.wait=(d.phase||0)+0.2+Math.random()*0.3; }, mesh:()=>G1('snapper',mSnapper),
  box:e=>e.wait>0?null:[e.y,e.h], tick:leaper,
  anim(e,m){ m.visible=e.wait<=0; m.rotation.set(0,0,0); m.rotation.x=-clamp(e.vy*0.12,-1.4,1.4)-Math.PI/2*0; m.rotation.z=0; m.rotation.x=-Math.PI/2*clamp(e.vy/9,-1,1); }});
defEnemy('ember',{h:0.8,fly:true,fireproof:true,heavy:true,glowing:true, init(e,d){ e.base=d.y-1.6; e.y=e.base; e.rise=(d.rise||5)+1.6; e.gap=d.gap||1.4; e.wait=(d.phase||0)+0.2+Math.random()*0.3; }, mesh:()=>G1('ember',mEmber,MAT.glow),
  box:e=>e.wait>0?null:[e.y,e.h], tick:leaper,
  anim(e,m,dt,time){ m.visible=e.wait<=0; m.rotation.z=e.vy<0?Math.PI:0; m.rotation.y=time*3; if(m.visible) glowAt(e.x,e.y+0.4,0.6,0xff7a1f,1.1,6); }});
/* Shyde the ghost: creeps up on Blorp while his back is turned, and hides its face when he looks */
const ghostMat=new T.MeshLambertMaterial({vertexColors:true,transparent:true,opacity:0.88,emissive:0x444466});
defEnemy('ghost',{h:0.9,fly:true,heavy:true,fireproof:true, init(e){ e.shy=false; e.sx=1; },
  mesh(){ const g=new T.Group(), u=g.userData; u.hands=vmesh('ghostHands',mGhostHands,ghostMat); u.shy=vmesh('ghostShy',mGhostShy,ghostMat); const body=vmesh('ghost',mGhost,ghostMat); body.castShadow=u.hands.castShadow=u.shy.castShadow=false; g.add(body,u.hands,u.shy); return g; },
  tick(e,dt){ const p=player, dx=p.x-e.x, dy=p.y+p.h*0.4-e.y, d=Math.hypot(dx,dy)||1;
    e.shy=p.face*dx<0&&Math.abs(dx)>0.3; /* Blorp is facing it */
    if(!e.shy&&d<13&&!p.dead){ e.x+=dx/d*2.1*dt; e.y+=dy/d*2.1*dt; e.sx=dx<0?-1:1; if(onScreen(e)&&Math.random()<dt*0.25) sfx.ghost(); } },
  anim(e,m,dt,time){ const u=m.userData; u.hands.visible=!e.shy; u.shy.visible=e.shy; m.position.y=e.y+Math.sin(time*2.4+e.x)*0.1; m.rotation.y=e.sx*0.7; m.rotation.z=e.shy?0:Math.sin(time*5)*0.08; }});
/* Clonk: a slab of stone that waits overhead and drops when Blorp passes under. Its top is safe to bounce on. */
defEnemy('clonk',{w:1.9,h:2,fly:true,heavy:true,fireproof:true,bouncy:true, init(e,d){ e.oy=d.y; e.st=0; e.wait=0; }, mesh:()=>G1('clonk',mClonk),
  tick(e,dt){ const p=player;
    if(e.st===0){ if(Math.abs(p.x-e.x)<2.1&&p.y<e.y&&!p.dead&&e.wait<=0){ e.st=1; e.wait=0.28; } e.wait-=dt; }
    else if(e.st===1){ e.wait-=dt; if(e.wait<=0){ e.st=2; e.vy=0; } }
    else if(e.st===2){ e.vy=Math.max(-22,e.vy-70*dt); e.y+=e.vy*dt; const ty=Math.floor(e.y);
      if(solidAt(Math.floor(e.x-0.5),ty)||solidAt(Math.floor(e.x+0.5),ty)||e.y<0){ e.y=ty+1; e.st=3; e.wait=0.9; if(onScreen(e,2)){ sfx.clonk(); shake(0.3); dust(e.x-0.9,e.y,3,-1); dust(e.x+0.9,e.y,3,1); } } }
    else if(e.st===3){ e.wait-=dt; if(e.wait<=0) e.st=4; }
    else { e.y+=2.6*dt; if(e.y>=e.oy){ e.y=e.oy; e.st=0; e.wait=0.5; } } },
  anim(e,m,dt,time){ m.position.x=e.x+(e.st===1?Math.sin(time*60)*0.05:0); }});
/* a rocket from a cannon block: straight ahead until it meets a wall */
defEnemy('rocket',{h:0.7,stomp:true,fly:true, init(e,d){ e.vx=(d.dir||-1)*5.6; e.life=9; }, mesh:()=>G1('rocket',mRocket),
  tick(e,dt){ e.life-=dt; e.x+=e.vx*dt; if(solidAt(Math.floor(e.x+sgn(e.vx)*0.4),Math.floor(e.y+0.35))||e.life<=0){ e.gone=true; burst(e.x,e.y+0.35,'#ffffff',6,3,0.14,0.4); }
    if(Math.random()<dt*14) spawnPart(e.x-sgn(e.vx)*0.5,e.y+0.35,0,'#ffffff',0,0.3,0,0.4,0.12,-1); },
  anim(e,m,dt,time){ m.rotation.y=e.vx>0?Math.PI/2:-Math.PI/2; m.rotation.z=0; m.position.y=e.y+Math.sin(time*20)*0.02; }});
/* Fizzle: a walking bomb. Stomp it and the fuse is lit; then it can be kicked like a shell, and it goes off. */
defEnemy('fizzle',{h:0.85,stomp:true, init(e){ e.vx=-1.5; e.fuse=0; },
  mesh(){ const g=new T.Group(), u=g.userData; u.spark=new T.Mesh(partGeo,emberMat[1]); u.spark.scale.setScalar(0.16); u.spark.position.set(0,1.18,0); u.spark.visible=false; g.add(vmesh('fizzle',mFizzle),u.spark); return g; },
  stomped(e){ if(!e.shell){ e.shell=true; e.vx=0; e.fuse=3; e.kick=0.25; e.chain=0; sfx.fuse(); } },
  tick(e,dt){ walk(e,dt);
    if(e.shell){ e.fuse-=dt; if(e.vx&&sweep(e)) return; if(e.fuse<=0){ e.gone=true; explode(e.x,e.y+0.4); } } },
  anim(e,m,dt,time){ const u=m.userData; u.spark.visible=e.shell&&((time*16|0)%2===0);
    if(e.shell){ const k=1+Math.sin(time*(e.fuse<1?40:18))*0.06; m.scale.set(k,k,k); if(e.vx) m.rotation.y+=dt*12*sgn(e.vx); glowAt(e.x,e.y+1,0.5,0xffb02e,0.8,4); }
    else { m.rotation.y=(e.vx>0?1:-1)*0.8; m.rotation.z=Math.sin(time*9+e.x)*0.08; } }});
/* Zappy: a grumpy little storm cloud that hangs over Blorp and drops bolts. It can be stomped, if he can get above it. */
defEnemy('zappy',{h:0.75,stomp:true,fly:true, init(e,d){ e.oy=d.y; e.ox=d.x; e.rx=d.rx||6; e.zap=1.5+Math.random(); }, mesh:()=>G1('zappy',mZappy),
  tick(e,dt){ const p=player, tx=clamp(p.x,e.ox-e.rx,e.ox+e.rx); e.x+=clamp(tx-e.x,-1,1)*1.7*dt; e.y=e.oy+Math.sin(e.t*2)*0.2;
    e.zap-=dt; if(e.zap<=0){ e.zap=2.8; if(onScreen(e)){ throwAt(e.x,e.y-0.2,0,-3,mBolt,'bolt',{g:22,r:0.3,glow:true,col:'#ffe14d'}); sfx.zap(); flash(0.07); } } },
  anim(e,m,dt,time){ const k=e.zap<0.5?1+Math.sin(time*50)*0.08:1; m.scale.set(k,k,k); m.rotation.y=Math.sin(time*1.5+e.ox)*0.3; if(e.zap<0.5) glowAt(e.x,e.y,0.8,0xffe14d,1,5); }});
/* Bonk: plods about until it sees Blorp ahead on its level, then paws the ground and charges. It smashes bricks, and
   knocks itself silly on anything harder. */
defEnemy('rammy',{w:0.9,h:0.9,stomp:true, init(e){ e.vx=-1.2; e.st=0; e.stT=0; e.dir=-1; }, mesh:()=>G1('rammy',mRammy),
  tick(e,dt){ const p=player;
    if(e.st===0){ e.dir=e.vx<0?-1:1; if(ledgeAhead(e)) e.vx=-e.vx; walk(e,dt);
      if(e.onGround&&!p.dead&&(p.x-e.x)*e.dir>0.5&&Math.abs(p.x-e.x)<7.5&&Math.abs(p.y-e.y)<1.3){ e.st=1; e.stT=0.45; } }
    else if(e.st===1){ e.stT-=dt; const v=e.vx; e.vx=0; walk(e,dt); e.vx=v; if(e.stT<=0){ e.st=2; e.vx=e.dir*7.6; } }
    else if(e.st===2){ const tx=Math.floor(e.x+e.dir*(e.w/2+0.1)), ty=Math.floor(e.y+0.4);
      if(tileAt(tx,ty)===BRICK&&!L.contents.get(ty*W+tx)){ breakBrick(tx,ty); if(tileAt(tx,ty+1)===BRICK&&!L.contents.get((ty+1)*W+tx)) breakBrick(tx,ty+1); }
      else if(walk(e,dt)||ledgeAhead(e)){ e.st=3; e.stT=1.5; e.vx=0; if(onScreen(e,1)){ sfx.thud(); shake(0.15); } }
      else if(Math.random()<dt*20) dust(e.x-e.dir*0.4,e.y,1,-e.dir); }
    else { e.stT-=dt; walk(e,dt); if(e.stT<=0){ e.st=0; e.vx=-e.dir*1.2; } } },
  anim(e,m,dt,time){ m.rotation.y=e.dir*1.2; m.rotation.z=e.st===3?Math.sin(time*9)*0.2:0; m.rotation.x=e.st===1?0.25:e.st===2?0.12:0; m.position.y+=e.st===0?Math.abs(Math.sin(time*7+e.x))*0.04:0; }});

/* ---------- bosses ---------- */
function bossInit(e,d){ e.w=2.2; e.h=2.4; e.hp=d.hp||9; e.hp0=e.hp; e.inv=0; e.x0=d.x0; e.x1=d.x1; e.t=0; e.st='walk'; e.stT=2; e.n=0; e.vx=0; e.dir=-1; }
const BOSS_NAMES={bongo:'Big Bongo',boohoo:'Count Boohoo',zappa:'Lord Zappa',queen:'Queen Grizzle'};
function bossAppears(){ musicStart('boss'); sfx.bossRoar(); popup(player.x+3,7.5,BOSS_NAMES[L.boss.kind]+'!','#ffc928'); shake(0.2); }
function damageBoss(e,n){
  if(e.inv>0||e.dead) return;
  e.hp-=n; e.inv=n>=3?1.1:0.3; sfx.bossHit(); shake(0.2); G.hitstop=0.07; burst(e.x,e.y+e.h*0.6,'#ffc928',10,5,0.16,0.6,true);
  if(e.K.hurt) e.K.hurt(e);
  if(e.hp<=0){
    e.dead=true; e.flip=true; e.vy=13; e.vx=0; G.bossDead=true; G.winT=0; G.fountain=0; G.bossX=clamp(e.x,e.x0,e.x1); addScore(5000,e.x,e.y+e.h);
    for(const b of bombs) b.gone=true; for(const w of waves) w.life=0; for(const o of enemies) if(o!==e&&o.active&&!o.dead&&!o.K.heavy) killEnemy(o,'flip',1);
    musicStop(); sfx.bossDown(); shake(0.4); flash(0.3);
    for(let i=0;i<4;i++) burst(e.x+(Math.random()-0.5)*2,e.y+1+Math.random()*1.5,pick(Math.random,['#7d3fd1','#ffc928','#ff4f7b','#ffffff']),10,7,0.2,1,true);
  }
}
/* gravity and the arena's walls for a boss that walks; true on the frame it lands hard */
function bossMove(e,dt){
  e.vy-=40*dt*GRAV; if(e.vy<-MAX_FALL) e.vy=-MAX_FALL;
  let wall=moveX(e,e.vx*dt); if(e.x<e.x0){ e.x=e.x0; wall=true; } else if(e.x>e.x1){ e.x=e.x1; wall=true; }
  const wasAir=!e.onGround, fv=e.vy, r=moveY(e,e.vy*dt); let thud=false;
  if(r===1){ if(wasAir&&fv<-8){ thud=true; shake(0.3); sfx.thud(); dust(e.x-1,e.y,3,-1); dust(e.x+1,e.y,3,1); } e.vy=0; e.onGround=true; } else { if(r===2) e.vy=0; e.onGround=false; }
  e.wall=wall; return thud;
}
const bossBlink=(e,m,time)=>{ m.visible=!(e.inv>0&&((time*24|0)%2)); };
const bossMesh=(key,f,scale)=>()=>{ const g=new T.Group(), m=vmesh(key,f); m.scale.setScalar(scale||2.2); g.add(m); return g; };
/* Big Bongo: strolls up, then by turns leaps (the landing sends ripples along the ground) and charges (and stuns
   himself on the wall). */
defEnemy('bongo',{boss:true,heavy:true,init:bossInit,mesh:bossMesh('bongo',mBossBongo),
  tick(e,dt){ const p=player, rage=(e.hp0-e.hp)/e.hp0; e.inv=Math.max(0,e.inv-dt); e.stT-=dt;
    if(e.st==='walk'){ if(e.onGround) e.vx+=((p.x<e.x?-1:1)*(1.5+rage*1.3)-e.vx)*Math.min(1,dt*3);
      if(e.stT<=0&&e.onGround){ if(e.n++%2===0){ e.st='leap'; e.vy=16+rage*2; e.vx=clamp((p.x-e.x)/1.0,-7,7); e.onGround=false; } else { e.st='wind'; e.stT=0.75; e.vx=0; e.dir=p.x<e.x?-1:1; sfx.bossRoar(); } } }
    else if(e.st==='wind'){ if(e.stT<=0){ e.st='charge'; e.vx=e.dir*(8+rage*3); } }
    else if(e.st==='dizzy'){ e.vx=0; if(e.stT<=0){ e.st='walk'; e.stT=1.2; } }
    const thud=bossMove(e,dt);
    if(e.st==='leap'&&e.onGround){ e.st='walk'; e.stT=1.7-rage*0.7; e.vx=0; if(thud) shockwave(e.x,e.y); }
    else if(e.st==='charge'){ if(e.wall){ e.st='dizzy'; e.stT=1.7; e.vx=0; shake(0.35); sfx.thud(); } else if(Math.random()<dt*24) dust(e.x-e.dir,e.y,1,-e.dir); } },
  anim(e,m,dt,time){ m.rotation.y=(e.st==='charge'||e.st==='wind'?e.dir:(player.x>e.x?1:-1))*0.8; m.rotation.z=e.st==='dizzy'?Math.sin(time*7)*0.22:e.onGround?Math.sin(time*8)*0.05:0; m.rotation.x=e.st==='wind'?0.3:0; bossBlink(e,m,time); }});
/* Count Boohoo: fades out and drifts over Blorp, where nothing can touch him; then shows himself, swoops low across the
   room, and sits winded on the floor for a moment. That is when to jump on him. */
defEnemy('boohoo',{boss:true,heavy:true,fly:true,
  init(e,d){ bossInit(e,d); e.st='fade'; e.stT=2.4; e.y=7; e.alpha=0.3; },
  mesh(){ const g=new T.Group(), mat=new T.MeshLambertMaterial({vertexColors:true,transparent:true,emissive:0x444466}); const m=new T.Mesh(geo('boohoo',mBossBoohoo),mat); m.scale.setScalar(2.4); g.add(m); g.userData.mat=mat; return g; },
  box:e=>e.st==='fade'?null:[e.y,e.h],
  tick(e,dt){ const p=player, rage=(e.hp0-e.hp)/e.hp0; e.inv=Math.max(0,e.inv-dt); e.stT-=dt;
    if(e.st==='fade'){ const tx=clamp(p.x+(e.n%2?4:-4),e.x0,e.x1); e.x+=clamp(tx-e.x,-1,1)*4*dt; e.y+=(7.2-e.y)*Math.min(1,dt*3);
      if(rage>0.3&&Math.random()<dt*(0.5+rage)) throwAt(e.x,e.y,(Math.random()-0.5)*3,0,mEmber,'wisp',{g:5,r:0.35,glow:true,col:'#9fd0ff',scale:0.6});
      if(e.stT<=0){ e.st='aim'; e.stT=0.7; sfx.ghost(); } }
    else if(e.st==='aim'){ if(e.stT<=0){ e.st='swoop'; e.stT=0; e.sx=e.x; e.ex=clamp(p.x+(p.x-e.x>0?1:-1)*5,e.x0,e.x1); e.sy=e.y; } }
    else if(e.st==='swoop'){ const u=Math.min(1,-e.stT/(1.5-rage*0.4)), k=2*u-1; e.x=lerp(e.sx,e.ex,u); e.y=2+(e.sy-2)*k*k*(u<0.5?1:0.25); if(u>=1){ e.st='tired'; e.stT=1.8-rage*0.5; e.n++; } }
    else if(e.st==='tired'){ e.y+=(2-e.y)*Math.min(1,dt*6); if(e.stT<=0){ e.st='fade'; e.stT=2.2-rage; } } },
  hurt(e){ e.st='fade'; e.stT=1.6; },
  anim(e,m,dt,time){ const a=e.st==='fade'?0.28:1; e.alpha+=(a-e.alpha)*Math.min(1,dt*6); m.userData.mat.opacity=e.alpha; m.position.y=e.y+(e.st==='tired'?0:Math.sin(time*3)*0.15);
    m.rotation.y=(player.x>e.x?1:-1)*0.6; m.rotation.z=e.st==='tired'?Math.sin(time*8)*0.15:e.st==='aim'?Math.sin(time*40)*0.05:0; bossBlink(e,m,time); }});
/* Lord Zappa: rides high where Blorp cannot reach, calls down three bolts, then sinks low to gloat. */
defEnemy('zappa',{boss:true,heavy:true,fly:true,
  init(e,d){ bossInit(e,d); e.st='hover'; e.y=8.6; e.w=2.6; e.h=2; },
  mesh:bossMesh('zappa',mBossZappa,2.6),
  tick(e,dt){ const p=player, rage=(e.hp0-e.hp)/e.hp0; e.inv=Math.max(0,e.inv-dt); e.stT-=dt;
    if(e.st==='walk') e.st='hover';
    if(e.st==='hover'){ e.x+=clamp(p.x-e.x,-1,1)*(3+rage*2)*dt; e.x=clamp(e.x,e.x0,e.x1); e.y+=(8.6-e.y)*Math.min(1,dt*3); if(e.stT<=0){ e.st='charge'; e.stT=0.9; e.cols=[p.x,p.x-3,p.x+3].concat(rage>0.5?[p.x-6,p.x+6]:[]); } }
    else if(e.st==='charge'){ for(const c of e.cols) if(Math.random()<dt*30) spawnPart(c+(Math.random()-0.5)*0.5,2.1,0.2,'#ffe14d',0,2+Math.random()*2,0,0.3,0.1,0,true);
      if(e.stT<=0){ for(const c of e.cols) throwAt(c,11,0,-17,mBolt,'bolt',{g:0,r:0.34,glow:true,col:'#ffe14d',scale:1.5}); sfx.zap(); flash(0.3); e.st='dive'; e.stT=3.2-rage; } }
    else if(e.st==='dive'){ const low=e.stT<2.4-rage*0.6; e.y+=((low?2.2:8.6)-e.y)*Math.min(1,dt*(low?2.5:3)); if(low) e.x+=clamp(p.x-e.x,-1,1)*1.6*dt; if(e.stT<=0){ e.st='hover'; e.stT=1.6-rage*0.6; } } },
  hurt(e){ e.st='hover'; e.stT=1.2; },
  anim(e,m,dt,time){ const k=e.st==='charge'?1+Math.sin(time*50)*0.05:1; m.scale.setScalar(k); m.position.y=e.y+Math.sin(time*2.5)*0.12; m.rotation.y=(player.x>e.x?1:-1)*0.4; if(e.st==='charge') glowAt(e.x,e.y,1,0xffe14d,1.6,9); bossBlink(e,m,time); }});
/* Queen Grizzle: three moods. She begins as her brother fought, walking, hopping and lobbing bombs; hurt, her landings
   send ripples; cornered, she charges as well and throws three bombs at a time. */
defEnemy('queen',{boss:true,heavy:true,init(e,d){ bossInit(e,d); e.jumpT=2.2; e.throwT=1.6; },mesh:bossMesh('queen',mBossQueen),
  tick(e,dt){ const p=player, rage=(e.hp0-e.hp)/e.hp0, mood=rage<0.34?0:rage<0.67?1:2; e.inv=Math.max(0,e.inv-dt); e.stT-=dt;
    if(e.st==='walk'){
      if(e.onGround){ e.vx+=((p.x<e.x?-1:1)*(1.5+rage*1.7)-e.vx)*Math.min(1,dt*3);
        e.jumpT-=dt; if(e.jumpT<=0){ if(mood===2&&e.n++%3===2){ e.st='wind'; e.stT=0.7; e.vx=0; e.dir=p.x<e.x?-1:1; sfx.bossRoar(); } else { e.vy=13+rage*3; e.onGround=false; } e.jumpT=2.5-rage+Math.random()*0.7; } }
      e.throwT-=dt; if(e.throwT<=0&&Math.abs(p.x-e.x)<15&&!p.dead){ e.throwT=2.9-rage*1.3;
        for(const k of (mood===2?[-3,0,3]:[0])) throwAt(e.x,e.y+e.h,clamp((p.x-e.x)/1.05+k,-9,9),11,mBomb,'bomb',{scale:1.15}); sfx.fire(); } }
    else if(e.st==='wind'){ if(e.stT<=0){ e.st='charge'; e.vx=e.dir*10; } }
    else if(e.st==='dizzy'){ e.vx=0; if(e.stT<=0) e.st='walk'; }
    const thud=bossMove(e,dt);
    if(thud&&mood>0&&e.st==='walk') shockwave(e.x,e.y);
    if(e.st==='charge'&&e.wall){ e.st='dizzy'; e.stT=1.4; shake(0.35); sfx.thud(); } },
  anim(e,m,dt,time){ m.rotation.y=(e.st==='charge'||e.st==='wind'?e.dir:(player.x>e.x?1:-1))*0.75; m.rotation.z=e.st==='dizzy'?Math.sin(time*7)*0.2:e.onGround?Math.sin(time*8)*0.05:0; m.rotation.x=e.st==='wind'?0.3:0; bossBlink(e,m,time); }});

/* ---------- the loops ---------- */
function updateEnemies(dt){
  let anyGone=false;
  for(const e of enemies){
    if(e.gone){ anyGone=true; continue; }
    if(!e.active){ if(Math.abs(e.x-camX)<viewHalfW+2.5&&Math.abs(e.y-camY)<V*0.5+5) e.active=true; else continue; }
    if(e.dead){ if(e.flip){ e.vy-=45*dt; e.x+=e.vx*dt; e.y+=e.vy*dt; if(e.y<room.y0-7) e.gone=true; } else { e.deadT-=dt; if(e.deadT<=0) e.gone=true; } continue; }
    e.t+=dt; e.kick=Math.max(0,e.kick-dt);
    e.K.tick(e,dt);
    if(e.y<-6) e.gone=true;
  }
  /* walkers turn around when they meet */
  const lone=e=>!e.active||e.dead||e.gone||e.K.fly||e.K.boss||e.K.solo||e.shell;
  for(let i=0;i<enemies.length;i++){ const a=enemies[i]; if(lone(a)) continue;
    for(let j=i+1;j<enemies.length;j++){ const b=enemies[j]; if(lone(b)) continue;
      if(Math.abs(a.x-b.x)<(a.w+b.w)/2&&Math.abs(a.y-b.y)<0.6){ const l=a.x<b.x?a:b, r=l===a?b:a; if(l.vx>0) l.vx=-l.vx; if(r.vx<0) r.vx=-r.vx; } } }
  if(anyGone){ for(const e of enemies) if(e.gone) world.remove(e.mesh); enemies=enemies.filter(e=>!e.gone); }
}
function stompBounce(top){ const p=player; p.y=top; p.vy=15; p.jumping=true; p.springHold=false; p.gHold=28.125; p.gFall=98.4; p.onGround=false; p.pound=0; p.airJumps=p.form===3?1:0; }
function playerVsEnemies(){
  const p=player; if(p.dead||p.goal||p.warp||p.pod) return;
  for(const e of enemies){
    if(!e.active||e.dead||e.gone) continue;
    const b=hitBox(e); if(!b) continue; const ey=b[0], eh=b[1], K=e.K;
    if(!(Math.abs(p.x-e.x)<(p.w+e.w)/2-0.06&&p.y<ey+eh&&p.y+p.h>ey)) continue;
    if(p.star>0){ if(K.boss) damageBoss(e,3); else if(!K.heavy||K.glowing){ killEnemy(e,'flip',sgn(e.x-p.x)); comboScore(e.x,ey+eh); } continue; }
    const above=p.vy<0&&p.y>ey+eh*0.4&&!p.swim;
    if(e.shell){
      if(e.vx===0){ if(e.kick<=0){ e.vx=(p.x<e.x?1:-1)*10; e.kick=0.3; e.chain=0; sfx.kick(); addScore(400,e.x,e.y+e.h); if(above){ p.y=ey+eh; p.vy=8; p.pound=0; } } }
      else if(above){ e.vx=0; e.kick=0.3; stompBounce(ey+eh); sfx.stomp(p.combo); comboScore(e.x,ey+eh); }
      else if(e.kick<=0) hurtPlayer();
      continue;
    }
    if(K.boss){
      if(above){ stompBounce(ey+eh); if(e.inv<=0) damageBoss(e,3); }
      else if(e.inv<0.6) hurtPlayer();
      continue;
    }
    if(above&&K.bouncy){ stompBounce(ey+eh); sfx.bump(); continue; }
    if(above&&K.stomp){
      const through=p.pound===2&&!K.stomped;
      if(K.stomped){ K.stomped(e); sfx.stomp(p.combo); } else killEnemy(e,'squish');
      if(!through) stompBounce(ey+eh);
      comboScore(e.x,ey+eh); G.hitstop=0.04;
    } else hurtPlayer();
  }
}
