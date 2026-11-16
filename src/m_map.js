/* ================= the world map: the island, the route and the rules of walking ================= */
finishWorlds();
/* Nothing in this file draws. The island is a grid of voxel columns, MAP_W cells west to east and MAP_D north to south,
   with north at z = 0, so "up" on the map is north. Heights are whole steps of MAP_STEP world units. n_mapview.js
   turns the grid into a picture; tools/check-map.js checks it, and can print it as text. */
const MAP_W=64, MAP_D=44, MAP_STEP=0.5;
const MK_SEA=0, MK_LAND=1, MK_LAVA=2, MK_GOO=3, MK_POND=4;
const MAP_HOP=0.14, MAP_HOP_FAST=0.085, MAP_TILE=0.09; /* seconds per tile: walking, running, and a new path appearing */
const MAP_DIR={N:[0,-1],E:[1,0],S:[0,1],W:[-1,0]};

/* a fixed scatter from 0 to 1 for each cell, so coasts are ragged and the ground is flecked the same way every time */
function mapJit(x,z){ let t=Math.imul(x*374761393+z*668265263,1274126177); t^=t>>>13; t=Math.imul(t,1274126177); return ((t^(t>>>16))>>>0)/4294967296; }
function MapBuilder(){
  const N=MAP_W*MAP_D;
  /* h: land height in steps, 0 for none. base: where a floating column stops, 0 for one that reaches the seabed.
     world: 0 to 7, or -1 for open sea. kind: one of MK_. deck: height of a bridge or stair over a gap, 0 for none.
     route: the cell's place along the route, or -1. */
  const I={h:new Uint8Array(N),base:new Uint8Array(N),world:new Int8Array(N).fill(-1),kind:new Uint8Array(N),deck:new Uint8Array(N),route:new Int16Array(N).fill(-1)};
  /* every cell inside an ellipse, with how far out it is: 0 at the middle, 1 at the edge */
  function each(cx,cz,rx,rz,rag,fn){
    for(let z=Math.max(1,Math.floor(cz-rz-1));z<=Math.min(MAP_D-2,Math.ceil(cz+rz+1));z++) for(let x=Math.max(1,Math.floor(cx-rx-1));x<=Math.min(MAP_W-2,Math.ceil(cx+rx+1));x++){
      const dx=(x+0.5-cx)/rx, dz=(z+0.5-cz)/rz, d=Math.sqrt(dx*dx+dz*dz);
      if(d<=1+(mapJit(x,z)-0.5)*rag) fn(z*MAP_W+x,Math.min(d,1));
    }
  }
  const B={
    I,
    /* an ellipse of land belonging to one world */
    blob(cx,cz,rx,rz,world,h,rag){ each(cx,cz,rx,rz,rag===undefined?0.3:rag,k=>{ I.kind[k]=MK_LAND; I.world[k]=world; I.h[k]=h; I.base[k]=0; }); return B; },
    /* a stepped hill on land that is already there; pow below 1 makes a dome, above 1 a spire */
    raise(cx,cz,r,dh,pow){ each(cx,cz,r,r,0,(k,d)=>{ if(I.kind[k]===MK_LAND) I.h[k]+=Math.round(dh*Math.pow(1-d,pow||1)); }); return B; },
    /* level an area of land */
    flat(cx,cz,rx,rz,h,rag){ each(cx,cz,rx,rz,rag||0,k=>{ if(I.kind[k]===MK_LAND) I.h[k]=h; }); return B; },
    /* level a rectangle of land, corner to corner: a terrace, a courtyard, the foot of a building */
    plate(x0,z0,x1,z1,h){ for(let z=z0;z<=z1;z++) for(let x=x0;x<=x1;x++){ const k=z*MAP_W+x; if(I.kind[k]===MK_LAND) I.h[k]=h; } return B; },
    /* turn land into a pool of lava, goo or water; it keeps its world and its height, which is the pool's rim */
    pool(cx,cz,rx,rz,kind,rag){ each(cx,cz,rx,rz,rag||0,k=>{ if(I.kind[k]===MK_LAND) I.kind[k]=kind; }); return B; },
    /* take land away again: a crack, a channel, a bay */
    cut(cx,cz,rx,rz,rag){ each(cx,cz,rx,rz,rag||0,k=>{ I.kind[k]=MK_SEA; I.h[k]=0; I.base[k]=0; I.world[k]=-1; }); return B; },
    /* make land float: its columns stop at `base` instead of reaching the seabed */
    lift(cx,cz,rx,rz,base){ each(cx,cz,rx,rz,0,k=>{ if(I.kind[k]===MK_LAND) I.base[k]=base; }); return B; },
    /* Smooth what the ragged edges leave behind: a pool that would spill into the sea gets a bank, land that hangs
       on by one side goes, and a notch of sea closed in on three sides is filled. */
    tidy(){
      const NB=[[1,0],[-1,0],[0,1],[0,-1]], solid=(x,z)=>NB.filter(d=>I.kind[(z+d[1])*MAP_W+x+d[0]]!==MK_SEA);
      const inner=fn=>{ let any=false; for(let z=1;z<MAP_D-1;z++) for(let x=1;x<MAP_W-1;x++) if(fn(x,z,z*MAP_W+x)) any=true; return any; };
      inner((x,z,k)=>{ if(I.kind[k]===MK_SEA||I.kind[k]===MK_LAND) return;
        for(let dz=-1;dz<=1;dz++) for(let dx=-1;dx<=1;dx++){ const n=(z+dz)*MAP_W+x+dx; if(I.kind[n]===MK_SEA){ I.kind[n]=MK_LAND; I.h[n]=I.h[k]; I.world[n]=I.world[k]; I.base[n]=I.base[k]; } } });
      while(inner((x,z,k)=>{ if(I.kind[k]===MK_SEA||solid(x,z).length>=2) return false; I.kind[k]=MK_SEA; I.h[k]=0; I.base[k]=0; I.world[k]=-1; return true; }));
      while(inner((x,z,k)=>{ const s=solid(x,z); if(I.kind[k]!==MK_SEA||s.length<3) return false;
        const n=(z+s[0][1])*MAP_W+x+s[0][0]; I.kind[k]=MK_LAND; I.h[k]=I.h[n]; I.base[k]=I.base[n]; I.world[k]=I.world[n]; return true; }));
      return B;
    },
    /* The route: where it starts, then one string of compass letters for each stretch between two markers. */
    route(x,z,moves){
      const cells=[{x,z}], at=[0];
      for(const s of moves){ for(const c of s){ const d=MAP_DIR[c]; x+=d[0]; z+=d[1]; cells.push({x,z}); } at.push(cells.length-1); }
      const prof=routeProfile(cells.map(c=>{ const k=c.z*MAP_W+c.x; return I.kind[k]===MK_LAND?I.h[k]:-1; }));
      cells.forEach((c,i)=>{ const k=c.z*MAP_W+c.x; c.h=prof[i]; I.route[k]=i; if(I.kind[k]===MK_LAND) I.h[k]=c.h; else I.deck[k]=c.h; });
      return {nodes:at.map(i=>cells[i]),segs:moves.map((_,i)=>cells.slice(at[i],at[i+1]+1))};
    }
  };
  return B;
}
/* The height of each cell along the route, given the land under it (-1 where there is none). A gap of sea, lava or
   thin air is bridged in a straight line between its banks. Then the route is made walkable: neighbours may differ
   by one step at most. Only ever cutting into the land would flatten every summit, and only ever filling would bury
   every hollow, so the result is halfway between the highest profile that cuts and the lowest that fills. */
function routeProfile(p){
  const n=p.length;
  for(let i=1;i<n;i++) if(p[i]<0){ let j=i; while(p[j]<0) j++; for(let k=i;k<j;k++) p[k]=p[i-1]+(p[j]-p[i-1])*(k-i+1)/(j-i+1); i=j; }
  const lo=p.slice(), hi=p.slice();
  for(let i=1;i<n;i++){ lo[i]=Math.min(lo[i],lo[i-1]+1); hi[i]=Math.max(hi[i],hi[i-1]-1); }
  for(let i=n-2;i>=0;i--){ lo[i]=Math.min(lo[i],lo[i+1]+1); hi[i]=Math.max(hi[i],hi[i+1]-1); }
  return p.map((_,i)=>Math.max(1,Math.floor((lo[i]+hi[i])/2+0.5)));
}

/* ---------- Blorp's world ---------- */
/* Eight regions, laid out so the journey reads at a glance. Along the south, west to east: the beach, the jungle and
   the reef. Across the middle, the hollow and then the works. From the works a stair climbs to the clouds, which run
   west along the north of the map. They come down on the volcano in the west, and from its crater a stair of light
   climbs to the broken moon, the highest and furthest ground there is.
   The camera looks north and down, so ground hides what is just north of it: tall ground stands at the back of its
   region, and nothing but sky stands north of the floating ones. */
function buildIsle(){
  const B=MapBuilder();
  /* 1 Sprinkle Shores, south-west: a low beach with dunes behind */
  B.blob(10,36,8.4,5.6,0,2).raise(5.5,33.6,3,2,0.7).raise(13.5,33.4,2.6,2,0.7).flat(9,39.5,6,1.6,1,0.3);
  /* 2 Jellybean Jungle, south, middle: rolling green, the temple hill at the back */
  B.blob(27.5,35,8.6,6.6,1,3).raise(30.5,31.4,4.2,4,0.7).plate(29,30,31,32,6).raise(22.5,37.5,2.6,2,0.8).raise(33.6,37.6,2.6,2,0.8).pool(24.6,33.2,1.5,1,MK_POND);
  /* 3 Fizzy Deep, south-east: a ring of reef round a lagoon, with an islet in the middle */
  B.blob(47.5,35.5,9,6.2,2,2,0.2).flat(47.5,35.5,7.2,4.6,1,0.2).pool(47.5,35.5,5.7,3.4,MK_POND,0.2).blob(47.5,35.5,1.7,1.3,2,1,0);
  /* 4 Spooky Hollow, middle: a dell with the manor's hill behind it */
  B.blob(37.5,21,7.6,6,3,3).flat(38,22.6,4.4,2.6,2,0.3).raise(41,17.4,3.2,3,0.7).blob(41,17,2.2,1.8,3,5,0).plate(40,16,42,18,5).raise(34,17.6,2.6,2,0.8);
  /* 5 Tick-Tock Works, east: terraces of plate, the clock tower at the back and the top */
  B.blob(55,21,6.8,6,4,2,0.12).blob(55.5,16.5,4,1.9,4,2,0).plate(49,17,61,23,3).plate(52,19,60,21,5).plate(52,15,58,18,7).plate(54,15,56,16,9);
  /* 6 Cloud Nine, north: four clouds in a row, high over the sea; the last and darkest is Lord Zappa's */
  B.blob(56,7,4,3.6,5,14,0.25).blob(47,6.5,3.4,3.2,5,15,0.25).blob(37.5,7.5,3.6,3.2,5,14,0.25).blob(26.5,9.5,4.2,4,5,15,0.2).plate(25,7,27,9,16)
   .lift(41,8,24,6.4,12);
  /* 7 Magma Mountain, west: one great south face, the crater at the top of it, and a shoulder where the clouds come down */
  B.blob(11.5,21.5,9.5,6.5,6,2,0.25).raise(11.5,18.5,8.6,14,0.9).raise(6.5,20.5,2.6,3,0.8).raise(7,17.6,2.2,5,0.5).flat(11.5,17.4,3.1,2.9,16).flat(11.5,17.4,1.7,1.4,15).plate(11,19,11,19,15).pool(11.5,17.4,1.6,1.3,MK_LAVA)
   .blob(19,17,2.6,1.8,6,9,0)
   .pool(11.5,20.5,0.5,1.4,MK_LAVA).pool(12,21.5,3,0.5,MK_LAVA).pool(9.5,24,0.5,2.6,MK_LAVA).pool(14.5,24,0.5,2.6,MK_LAVA);
  /* 8 Lunar Palace, north-west: the moon, cracked into three, highest of all */
  B.blob(11,6.5,9.6,5.4,7,22,0.15).cut(8.5,4,0.6,3.6).cut(9.5,10,0.6,3).cut(14.5,3.5,0.6,3.2).cut(15.5,9.5,0.6,3.4).plate(9,1,14,11,23).plate(15,1,21,11,24).plate(17,5,19,7,25).lift(11,6.5,11,7,20);
  const made=B.tidy().route(4,38,[
    'EEEEENN','NNWWWN','NEEEEE','EESSSEE','EESEEE',                 /* the beach, and into the jungle */
    'NNNEE','EEEESS','SSSSEEEE','NNNNNN','EEEEEEEEES',               /* round the pond, down to the south shore, up to the temple, over to the reef */
    'SSESSSEEE','EEEENNNN','EEEEEENN','NWWNWWWWWWN','NWNNNNNNW',     /* round the reef, over the stones to the islet and on, then north to the hollow */
    'WWNWW','WWSSWWW','WWNNNNNE','EEEEEEEE','EEEEEEEEE',             /* the dell, the west bank, the manor, and the bridge to the works */
    'SSSSEEE','EEEEEENNN','WWWWWWNN','NEENN','NNNNNNNN',             /* up the terraces to the clock tower, then the stair to the clouds */
    'NWWWWWWWWN','WWWSSWWWW','WWSSWW','WWWWWWSWWWW','SSSWWWWWSSSW',   /* west from cloud to cloud, and down onto the volcano's shoulder */
    'SSSSSSWS','SSWWWWWWW','WWWWWWNNNNN','NNNEEEN','NNNWWWNNNNN',     /* down the east flank, along the south, up the west, and the stair of light */
    'WWWNNNN','NEEEEEEEE','ESSSSSS','EEEEEEN'                         /* the three pieces of the moon */
  ]);
  return {ISLE:B.I,MAPNODES:made.nodes,MAPSEGS:made.segs};
}
const {ISLE,MAPNODES,MAPSEGS}=buildIsle();

/* ---------- the rules of walking ---------- */
/* G.open is the furthest level opened: level i can be played when i <= G.open and has been cleared when i < G.open.
   It runs one past the last level once that is cleared. The stretch of path from marker i to marker i+1 exists once
   level i is cleared. */
const MAPST={at:0,walk:null,reveal:null,x:0,y:0,z:0,face:'S'};
function mapStandH(x,z){ const k=z*MAP_W+x; return ISLE.deck[k]||(ISLE.kind[k]===MK_LAND?ISLE.h[k]:0); }
const mapDirOf=(a,b)=>b.x>a.x?'E':b.x<a.x?'W':b.z>a.z?'S':'N';
/* which way the path leaves a marker: on toward the next one, and back toward the one before */
function mapDirAt(i){ const f=MAPSEGS[i], b=MAPSEGS[i-1]; return {fwd:f?mapDirOf(f[0],f[1]):null,back:b?mapDirOf(b[b.length-1],b[b.length-2]):null}; }
function mapPlace(i){ const n=MAPNODES[i], s=MAPST; s.at=i; s.walk=null; s.x=n.x+0.5; s.y=n.h*MAP_STEP; s.z=n.z+0.5; s.face='S'; }
/* Set off from the marker Blorp stands on. 'go' he is walking; 'locked' the path that way is not open yet; 'none'
   there is no path that way; 'busy' he is already walking, or a path is still appearing. */
function mapGo(dir){
  const s=MAPST; if(s.walk||s.reveal) return 'busy';
  const d=mapDirAt(s.at); if(!dir) return 'none';
  if(dir===d.fwd){ if(s.at>=G.open) return 'locked'; s.walk={seg:s.at,dir:1,k:0,t:0}; return 'go'; }
  if(dir===d.back){ s.walk={seg:s.at-1,dir:-1,k:MAPSEGS[s.at-1].length-1,t:0}; return 'go'; }
  return 'none';
}
/* One frame of the map. `held` is the direction being held, if any. It never sets Blorp off from a standstill, which
   takes a press, but when he reaches a marker and the path carries on that way, he carries on too. It only ever
   carries him further the way he was going: where a path doubles back, the same key would otherwise walk him home. */
function mapTick(dt,held,fast){
  const s=MAPST, r=s.reveal, w=s.walk;
  if(r){ const n=MAPSEGS[r.seg].length; r.t+=dt;
    /* the reveal is over before the game hears of its last tile, so that what it then draws is the opened marker */
    while(r.t>=MAP_TILE&&r.k<n){ r.t-=MAP_TILE; r.k++; if(r.k>=n) s.reveal=null; mapRevealed(r.seg,r.k,r.k>=n); }
    return; }
  if(!w) return;
  const seg=MAPSEGS[w.seg], end=w.dir>0?seg.length-1:0;
  w.t+=dt/(fast?MAP_HOP_FAST:MAP_HOP);
  while(w.t>=1&&w.k!==end){ w.t-=1; w.k+=w.dir; if(w.k!==end) mapStepped(); }
  const a=seg[w.k];
  if(w.k===end){ s.walk=null; s.at=w.dir>0?w.seg+1:w.seg; s.x=a.x+0.5; s.y=a.h*MAP_STEP; s.z=a.z+0.5; mapArrived();
    const d=mapDirAt(s.at); if(held&&held===(w.dir>0?d.fwd:d.back)) mapGo(held); return; }
  const b=seg[w.k+w.dir]; s.face=mapDirOf(a,b);
  s.x=a.x+0.5+(b.x-a.x)*w.t; s.y=(a.h+(b.h-a.h)*w.t)*MAP_STEP; s.z=a.z+0.5+(b.z-a.z)*w.t;
}
/* Show a newly opened stretch appearing, tile by tile. Until it has finished nothing else can happen on the map. */
function mapReveal(seg){ MAPST.reveal={seg,k:0,t:0}; }
/* how many of a stretch's tiles are showing, counting the markers at both ends */
function mapSegShown(seg){ const r=MAPST.reveal; return r&&r.seg===seg?r.k:seg<G.open?MAPSEGS[seg].length:0; }
/* 0 locked, 1 open, 2 cleared; a marker whose path is still appearing stays locked until it has */
function mapMarkState(i){ const r=MAPST.reveal; return r&&i===r.seg+1?0:i<G.open?2:i===G.open?1:0; }
/* one of the three little moons by a marker: 0 not shown, because the marker is still locked; 1 a shard yet to be
   found in that level; 2 a shard found */
function mapMoonState(i,j){ return mapMarkState(i)===0?0:shardHad(i,j)?2:1; }
