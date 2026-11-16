/* ================= World 5: Tick-Tock Works ================= */
/* PLACEHOLDER: stands in for the real world until it is written, so the map and the checks have all forty levels. */
THEMES.works=Object.assign({},THEMES.shores,{music:'works'});
function w5stub(last){ return ()=>{ const B=LevelBuilder(120,'works'); B.ground(0,119).shard(8,3).shard(10,3).shard(12,3); if(last) B.goal(100); else B.goal(100); return B.L; }; }
defWorld({name:'Tick-Tock Works',theme:'works',levels:[w5stub(),w5stub(),w5stub(),w5stub(),w5stub(true)]});
