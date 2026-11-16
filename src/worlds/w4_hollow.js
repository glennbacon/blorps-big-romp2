/* ================= World 4: Spooky Hollow ================= */
/* PLACEHOLDER: stands in for the real world until it is written, so the map and the checks have all forty levels. */
THEMES.hollow=Object.assign({},THEMES.shores,{music:'hollow'});
function w4stub(last){ return ()=>{ const B=LevelBuilder(120,'hollow'); B.ground(0,119).shard(8,3).shard(10,3).shard(12,3); if(last) B.fill(100,2,119,13,GROUND).boss(80,60,95,9,'boohoo'); else B.goal(100); return B.L; }; }
defWorld({name:'Spooky Hollow',theme:'hollow',levels:[w4stub(),w4stub(),w4stub(),w4stub(),w4stub(true)]});
