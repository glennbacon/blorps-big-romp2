/* ================= World 2: Jellybean Jungle ================= */
/* PLACEHOLDER: stands in for the real world until it is written, so the map and the checks have all forty levels. */
THEMES.jungle=Object.assign({},THEMES.shores,{music:'jungle'});
function w2stub(last){ return ()=>{ const B=LevelBuilder(120,'jungle'); B.ground(0,119).shard(8,3).shard(10,3).shard(12,3); if(last) B.fill(100,2,119,13,GROUND).boss(80,60,95,9,'bongo'); else B.goal(100); return B.L; }; }
defWorld({name:'Jellybean Jungle',theme:'jungle',levels:[w2stub(),w2stub(),w2stub(),w2stub(),w2stub(true)]});
