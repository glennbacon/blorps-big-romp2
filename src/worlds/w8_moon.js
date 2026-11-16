/* ================= World 8: Lunar Palace ================= */
/* PLACEHOLDER: stands in for the real world until it is written, so the map and the checks have all forty levels. */
THEMES.moon=Object.assign({},THEMES.shores,{music:'moon'});
function w8stub(last){ return ()=>{ const B=LevelBuilder(120,'moon'); B.ground(0,119).shard(8,3).shard(10,3).shard(12,3); if(last) B.fill(100,2,119,13,GROUND).boss(80,60,95,15,'queen'); else B.goal(100); return B.L; }; }
defWorld({name:'Lunar Palace',theme:'moon',levels:[w8stub(),w8stub(),w8stub(),w8stub(),w8stub(true)]});
