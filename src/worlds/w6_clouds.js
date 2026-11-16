/* ================= World 6: Cloud Nine ================= */
/* PLACEHOLDER: stands in for the real world until it is written, so the map and the checks have all forty levels. */
THEMES.clouds=Object.assign({},THEMES.shores,{music:'clouds'});
function w6stub(last){ return ()=>{ const B=LevelBuilder(120,'clouds'); B.ground(0,119).shard(8,3).shard(10,3).shard(12,3); if(last) B.fill(100,2,119,13,GROUND).boss(80,60,95,12,'zappa'); else B.goal(100); return B.L; }; }
defWorld({name:'Cloud Nine',theme:'clouds',levels:[w6stub(),w6stub(),w6stub(),w6stub(),w6stub(true)]});
