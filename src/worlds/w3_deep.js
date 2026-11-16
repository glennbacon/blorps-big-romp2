/* ================= World 3: Fizzy Deep ================= */
/* PLACEHOLDER: stands in for the real world until it is written, so the map and the checks have all forty levels. */
THEMES.deep=Object.assign({},THEMES.shores,{music:'deep'});
function w3stub(last){ return ()=>{ const B=LevelBuilder(120,'deep'); B.ground(0,119).shard(8,3).shard(10,3).shard(12,3); if(last) B.goal(100); else B.goal(100); return B.L; }; }
defWorld({name:'Fizzy Deep',theme:'deep',levels:[w3stub(),w3stub(),w3stub(),w3stub(),w3stub(true)]});
