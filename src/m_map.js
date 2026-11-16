/* ================= the world map: the island, the route and the rules of walking ================= */
finishWorlds();
/* Nothing in this file draws. The island is a grid of voxel columns, MAP_W cells west to east and MAP_D north to south,
   with north at z = 0, so "up" on the map is north. Heights are whole steps of MAP_STEP world units. n_mapview.js
   turns the grid into a picture; tools/check-map.js checks it, and can print it as text. */
const MAP_W=48, MAP_D=30, MAP_STEP=0.5;
const MK_SEA=0, MK_LAND=1, MK_LAVA=2, MK_GOO=3, MK_POND=4;
const MAP_HOP=0.14, MAP_HOP_FAST=0.085, MAP_TILE=0.09; /* seconds per tile: walking, running, and a new path appearing */
const MAP_DIR={N:[0,-1],E:[1,0],S:[0,1],W:[-1,0]};

/* a fixed scatter from 0 to 1 for each cell, so coasts are ragged and the ground is flecked the same way every time */
function mapJit(x,z){ let t=Math.imul(x*374761393+z*668265263,1274126177); t^=t>>>13; t=Math.imul(t,1274126177); return ((t^(t>>>16))>>>0)/4294967296; }
function MapBuilder(){
  const N=MAP_W*MAP_D;
  /* h: land height in steps, 0 for none. base: where a floating column stops, 0 for one that reaches the seabed.
     world: 0 to 5, or -1 for open sea. kind: one of MK_. deck: height of a bridge or stair over a gap, 0 for none.
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
    /* turn land into a pool of lava, goo or water; it keeps its world and its height, which is the pool's rim */
    pool(cx,cz,rx,rz,kind,rag){ each(cx,cz,rx,rz,rag||0,k=>{ if(I.kind[k]===MK_LAND) I.kind[k]=kind; }); return B; },
    /* make land float: its columns stop at `base` instead of reaching the seabed */
    lift(cx,cz,rx,rz,base){ each(cx,cz,rx,rz,0,k=>{ if(I.kind[k]===MK_LAND) I.base[k]=base; }); return B; },
    /* Smooth what the ragged edges leave behind: a pool that would spill into the sea gets a bank, land that hangs
       on by one side goes, and a notch of sea closed in on three sides is filled. */
    tidy(){
      const NB=[[1,0],[-1,0],[0,1],[0,-1]], solid=(x,z)=>NB.filter(d=>I.kind[(z+d[1])*MAP_W+x+d[0]]!==MK_SEA);
      const inner=fn=>{ let any=false; for(let z=1;z<MAP_D-1;z++) for(let x=1;x<MAP_W-1;x++) if(fn(x,z,z*MAP_W+x)) any=true; return any; };
      inner((x,z,k)=>{ if(I.kind[k]===MK_SEA||I.kind[k]===MK_LAND) return;
        for(let dz=-1;dz<=1;dz++) for(let dx=-1;dx<=1;dx++){ const n=(z+dz)*MAP_W+x+dx; if(I.kind[n]===MK_SEA){ I.kind[n]=MK_LAND; I.h[n]=I.h[k]; I.world[n]=I.world[k]; } } });
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
function buildIsle(){
  const B=MapBuilder();
  /* 1 Gumdrop Meadow, south-west: low green hills behind a sandy shore */
  B.blob(9.5,22.5,8.6,6,0,2).raise(8.5,19.8,3.6,3,0.7).raise(13,25.5,2.8,2,0.7).raise(3.5,21,2.6,2,0.7);
  /* 2 Glowshroom Grotto, south, middle: a hollow in purple rock, its wall low toward the camera and tall behind */
  B.blob(23.5,22,6.3,5.9,1,3,0.2).raise(23.5,16.6,4.6,4,0.6).raise(18,18.5,2.4,2).raise(29,18.6,2.4,2)
   .flat(23.5,22.3,4.4,3.7,1,0.2).pool(23.2,22,1.3,0.9,MK_GOO).pool(26.4,23.4,0.8,0.7,MK_GOO);
  /* 3 Castle Crumble, south-east: a low rim, a moat of lava, and the rock the castle stands on */
  B.blob(39.5,21.9,7.2,6.1,2,2,0.2).pool(39.5,21.9,6.4,5.3,MK_LAVA).blob(39.5,21.9,4.6,3.9,2,3,0.1).raise(40.5,20.2,2.8,3,0.8);
  /* 5 Dumpling Dunes, north, middle: rolling sand and an oasis. Laid before the mountain, which stands on its edge. */
  B.blob(23,8,8.8,5.6,4,2).raise(26,5.5,2.6,2,0.7).raise(18.5,10.5,2.4,2,0.7).raise(21.5,3.6,2,1).raise(15.6,7.6,2,1)
   .pool(21.6,9.9,1.5,1,MK_POND);
  /* 4 Snowcone Summit, north-east: the tallest ground on the map */
  B.blob(39,7.5,7.2,6.2,3,2).raise(39,7.5,6.6,10,0.9);
  /* 6 Comet Citadel, north-west: an island floating high over the sea */
  B.blob(5.5,6.5,4.6,4.2,5,11,0.2).raise(5.8,5.6,2.2,2).lift(5.5,6.5,6,6,7);
  const made=B.tidy().route(3,25,[
    'EEENN','NNN','EENEES','SSEEE','EEENEE',                       /* the meadow, then up onto the grotto's rim */
    'EEESS','SEE','EENNN','NEEE','EEEEEEEE',                        /* down into the hollow, out, and over to the castle rock */
    'SSSSE','ESEENE','ENNN','NWNW','WWNNNNNNN',                    /* round the rock to the castle, then north over lava and sea */
    'EEENNE','NNENNWN','WWNWW','SSS','WWWWWWWSWWW',                 /* up the mountain to its summit, and down the west face */
    'WSSWW','WNNNWW','NNWWW','SSWWSW','WWWWSSWWNNNW',              /* across the dunes, then the stair of light */
    'WSSW','WWWN','WNNN','NEEESS'                                  /* round the citadel to the tower */
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
