/* ================= World 7: Magma Mountain ================= */
/* PLACEHOLDER: stands in for the real world until it is written, so the map and the checks have all forty levels. */
THEMES.magma=Object.assign({},THEMES.shores,{music:'magma'});
function w7stub(last){ return ()=>{ const B=LevelBuilder(120,'magma'); B.ground(0,119).shard(8,3).shard(10,3).shard(12,3); if(last) B.goal(100); else B.goal(100); return B.L; }; }
defWorld({name:'Magma Mountain',theme:'magma',levels:[w7stub(),w7stub(),w7stub(),w7stub(),w7stub(true)]});
