/* ================= renderer, lights, sky and post-processing ================= */
const $=id=>document.getElementById(id);
const stage=$('stage'), canvas=$('c');
const reduceMotion=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
let renderer;
try{ renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'}); }
catch(e){ $('nogl').hidden=false; return; }
renderer.setClearColor(0x1c1233,1);
renderer.shadowMap.enabled=true; renderer.shadowMap.type=T.PCFSoftShadowMap;
renderer.info.autoReset=false; /* counted per frame, over every pass: see renderFrame */
const scene=new T.Scene();
const camera=new T.PerspectiveCamera(30,1,1,220);
const hemi=new T.HemisphereLight(0xffffff,0x888888,0.6); scene.add(hemi);
/* The sun casts the game's shadows. Its shadow box rides along with the camera (see placeSun), so only what is on
   screen, and a little around it, is ever drawn into the shadow map. */
const sun=new T.DirectionalLight(0xffffff,0.6); sun.castShadow=true; scene.add(sun,sun.target);
const SHADOW_W=46, SHADOW_H=34;
{ const c=sun.shadow.camera; c.left=-SHADOW_W/2; c.right=SHADOW_W/2; c.top=SHADOW_H/2; c.bottom=-SHADOW_H/2; c.near=1; c.far=110; sun.shadow.bias=-0.0009; sun.shadow.normalBias=0.035; sun.shadow.mapSize.set(2048,2048); }
const sunDir=new T.Vector3(-0.42,0.78,0.52).normalize(), _sr=new T.Vector3(), _su=new T.Vector3(), _sp=new T.Vector3(), UP=new T.Vector3(0,1,0);
/* Aim the sun at a point. The point is first rounded to whole texels of the shadow map, measured along the map's own
   axes: without that, every shadow edge would crawl as the camera moves. */
function placeSun(x,y,z){
  _sr.crossVectors(UP,sunDir).normalize(); _su.crossVectors(sunDir,_sr);
  _sp.set(x,y,z); const tex=SHADOW_W/sun.shadow.mapSize.x, a=Math.round(_sp.dot(_sr)/tex)*tex, b=Math.round(_sp.dot(_su)/tex)*tex, c=_sp.dot(sunDir);
  sun.target.position.set(0,0,0).addScaledVector(_sr,a).addScaledVector(_su,b).addScaledVector(sunDir,c);
  sun.position.copy(sun.target.position).addScaledVector(sunDir,55);
}
/* Three small lights that follow whatever is glowing nearby: fire spit, lamps, a star-powered Blorp. Their number never
   changes, so no shader is ever rebuilt for them; a light nobody asked for this frame is simply turned down to nothing. */
const glowLights=[0,1,2].map(()=>{ const l=new T.PointLight(0xffffff,0,7.5,1.4); scene.add(l); return l; });
let glowN=0;
function glowAt(x,y,z,col,power,reach){ if(glowN>=glowLights.length) return; const l=glowLights[glowN++]; l.position.set(x,y,z); l.color.set(col); l.intensity=power; l.distance=reach||7.5; }
function glowEnd(){ for(let i=glowN;i<glowLights.length;i++) glowLights[i].intensity=0; glowN=0; }

let world=new T.Group(); scene.add(world);
const fx=new T.Group(); scene.add(fx);

/* ---------- the sky ---------- */
/* One full-screen sheet behind everything: a three-colour gradient, a soft glow around where the sun or moon hangs,
   and square stars that twinkle. It is drawn in screen space, and slides a little with the camera. */
const skyU={cTop:{value:new T.Color(0x3fb2ff)},cMid:{value:new T.Color(0x96e0ff)},cBot:{value:new T.Color(0xffeebd)},uMid:{value:0.5},
  sunCol:{value:new T.Color(0xfff3c0)},sunPos:{value:new T.Vector2(0.78,0.74)},sunGlow:{value:1},uStars:{value:0},uTime,uScroll:{value:new T.Vector2()},uAspect:{value:1.78},
  cBand:{value:new T.Color(0x000000)},uBand:{value:0}};
const skyMesh=new T.Mesh(new T.PlaneGeometry(2,2),new T.ShaderMaterial({uniforms:skyU,depthTest:false,depthWrite:false,fog:false,
  vertexShader:'varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.999,1.0); }',
  fragmentShader:`uniform vec3 cTop,cMid,cBot,sunCol,cBand; uniform float uMid,sunGlow,uStars,uTime,uAspect,uBand; uniform vec2 sunPos,uScroll; varying vec2 vUv;
    float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
    void main(){
      float y=clamp(vUv.y+uScroll.y,0.0,1.0);
      vec3 c=y<uMid?mix(cBot,cMid,y/uMid):mix(cMid,cTop,(y-uMid)/(1.0-uMid));
      vec2 d=(vUv-sunPos)*vec2(uAspect,1.0); float r=length(d);
      c+=sunCol*sunGlow*(0.26*exp(-r*r*30.0)+0.10*exp(-r*4.5));
      if(uBand>0.0){ float w=sin(vUv.x*5.0+uTime*0.12+sin(vUv.x*11.0-uTime*0.2)*0.6)*0.06; float b=exp(-pow((y-0.62-w)*7.0,2.0)); c+=cBand*b*uBand*(0.75+0.25*sin(vUv.x*40.0+uTime)); }
      if(uStars>0.0){ vec2 g=(vUv+uScroll*vec2(1.0,0.4))*vec2(uAspect,1.0)*46.0; vec2 id=floor(g), f=fract(g)-0.5; float h=hash(id);
        float sz=0.10+0.14*fract(h*17.0); float s=step(0.93,h)*step(max(abs(f.x),abs(f.y)),sz);
        c+=uStars*s*(0.55+0.45*sin(uTime*(1.0+h*4.0)+h*60.0))*smoothstep(0.15,0.6,y); }
      gl_FragColor=vec4(c,1.0);
    }`}));
skyMesh.frustumCulled=false; skyMesh.renderOrder=-1000; scene.add(skyMesh);

/* ---------- quality ---------- */
/* 0 plain (no shadows, no glow), 1 medium, 2 full. On `auto` the game starts at the top and steps down for good
   whenever it cannot keep up; a choice made on the pause screen switches auto off. */
const QUALITY=[{post:false,shadow:0,dpr:1.5,bloomN:0},{post:true,shadow:1024,dpr:1.5,bloomN:4},{post:true,shadow:2048,dpr:2,bloomN:5}];
const Q={level:2,auto:true,slow:0,frames:0};
function setQuality(n,byHand){
  Q.level=clamp(n,0,2); if(byHand) Q.auto=false; Q.slow=0; Q.frames=0;
  const q=QUALITY[Q.level];
  sun.castShadow=q.shadow>0;
  if(q.shadow&&sun.shadow.mapSize.x!==q.shadow){ sun.shadow.mapSize.set(q.shadow,q.shadow); if(sun.shadow.map){ sun.shadow.map.dispose(); sun.shadow.map=null; } }
  renderer.shadowMap.type=Q.level>1?T.PCFSoftShadowMap:T.PCFShadowMap;
  if(typeof layout==='function') layout();
}
/* Called once a frame while a level is being played, with how long the frame took. */
function watchSpeed(dt){
  if(!Q.auto||Q.level===0) return;
  Q.frames++; if(Q.frames<90) return; /* let a new level settle: its first frames compile shaders */
  if(dt>1/42) Q.slow+=dt*2; else Q.slow=Math.max(0,Q.slow-dt);
  if(Q.slow>3){ setQuality(Q.level-1); Q.auto=true; }
}

/* ---------- post-processing ---------- */
/* The scene is drawn into a texture. Wherever a surface wrote an alpha below one it is treated as a light (see the
   note on materials in a_art.js): those pixels are copied into a chain of ever smaller textures and added back on
   the way up, which is all a bloom is. The last pass adds the glow to the picture, grades it and darkens the corners. */
const POST={rt:null,down:[],up:[],tilt:[],w:0,h:0,bloom:0.95,hi:0.22,sat:1.06,con:1.03,vig:0.42,tilt_:0,tiltY:0.5,flash:0,tint:new T.Color(1,1,1)};
const fsCam=new T.OrthographicCamera(-1,1,1,-1,0,1), fsScene=new T.Scene(), fsQuad=new T.Mesh(new T.PlaneGeometry(2,2),null);
fsQuad.frustumCulled=false; fsScene.add(fsQuad);
const FS_V='varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.0,1.0); }';
const fsMat=(uniforms,frag,extra)=>new T.ShaderMaterial(Object.assign({uniforms,vertexShader:FS_V,fragmentShader:frag,depthTest:false,depthWrite:false,fog:false},extra||{}));
const TAP4='(S(vec2(-1.0,-1.0))+S(vec2(1.0,-1.0))+S(vec2(-1.0,1.0))+S(vec2(1.0,1.0)))*0.25';
const brightMat=fsMat({t:{value:null},px:{value:new T.Vector2()},uHi:{value:0.2}},
  'uniform sampler2D t; uniform vec2 px; uniform float uHi; varying vec2 vUv; vec3 S(vec2 o){ vec4 c=texture2D(t,vUv+o*px); float l=dot(c.rgb,vec3(0.3,0.59,0.11)); return c.rgb*((1.0-c.a)+uHi*smoothstep(0.86,1.0,l)); } void main(){ gl_FragColor=vec4('+TAP4+',1.0); }');
const downMat=fsMat({t:{value:null},px:{value:new T.Vector2()}},
  'uniform sampler2D t; uniform vec2 px; varying vec2 vUv; vec3 S(vec2 o){ return texture2D(t,vUv+o*px).rgb; } void main(){ gl_FragColor=vec4('+TAP4+',1.0); }');
const upMat=fsMat({t:{value:null},b:{value:null},px:{value:new T.Vector2()}},
  'uniform sampler2D t,b; uniform vec2 px; varying vec2 vUv; vec3 S(vec2 o){ return texture2D(t,vUv+o*px).rgb; } void main(){ gl_FragColor=vec4(texture2D(b,vUv).rgb+'+TAP4+',1.0); }');
const compMat=fsMat({t:{value:null},tb:{value:null},tt:{value:null},uBloom:{value:1},uSat:{value:1},uCon:{value:1},uVig:{value:0.4},uTilt:{value:0},uTiltY:{value:0.5},uFlash:{value:0},uTint:{value:POST.tint}},
  `uniform sampler2D t,tb,tt; uniform float uBloom,uSat,uCon,uVig,uTilt,uTiltY,uFlash; uniform vec3 uTint; varying vec2 vUv;
   void main(){
     vec3 c=texture2D(t,vUv).rgb;
     if(uTilt>0.0) c=mix(c,texture2D(tt,vUv).rgb,uTilt*smoothstep(0.16,0.5,abs(vUv.y-uTiltY)));
     c+=texture2D(tb,vUv).rgb*uBloom;
     float l=dot(c,vec3(0.299,0.587,0.114)); c=mix(vec3(l),c,uSat); c=(c-0.5)*uCon+0.5; c*=uTint;
     vec2 q=vUv-0.5; c*=1.0-uVig*dot(q,q)*1.5; c+=uFlash;
     gl_FragColor=vec4(c,1.0);
   }`);
/* the wipe between screens: a round hole in a sheet of ink, closing on a point, and a plain fade */
const wipe={iris:2,x:0.5,y:0.5,fade:0};
const wipeMat=fsMat({uIris:{value:2},uC:{value:new T.Vector2(0.5,0.5)},uAspect:{value:1.78},uFade:{value:0}},
  'uniform float uIris,uAspect,uFade; uniform vec2 uC; varying vec2 vUv; void main(){ float r=length((vUv-uC)*vec2(uAspect,1.0)); float a=max(uFade,step(uIris,r)); float rim=step(uIris-0.012,r)*(1.0-step(uIris,r)); gl_FragColor=vec4(mix(vec3(0.11,0.07,0.2),vec3(0.18,0.84,0.76),rim),max(a,rim)); }',
  {transparent:true});
function fsPass(mat,target){ fsQuad.material=mat; renderer.setRenderTarget(target); renderer.render(fsScene,fsCam); }
function mkRT(w,h,depth,ms){
  const o={minFilter:T.LinearFilter,magFilter:T.LinearFilter,format:T.RGBAFormat,depthBuffer:depth,stencilBuffer:false};
  if(ms&&renderer.capabilities.isWebGL2&&T.WebGLMultisampleRenderTarget){ const r=new T.WebGLMultisampleRenderTarget(w,h,o); r.samples=4; return r; }
  return new T.WebGLRenderTarget(w,h,o);
}
function sizePost(w,h){
  if(POST.w===w&&POST.h===h&&POST.n===QUALITY[Q.level].bloomN) return;
  for(const r of [POST.rt,...POST.down,...POST.up,...POST.tilt]) if(r) r.dispose();
  POST.w=w; POST.h=h; POST.n=QUALITY[Q.level].bloomN; POST.rt=null; POST.down=[]; POST.up=[]; POST.tilt=[];
  if(!POST.n) return;
  POST.rt=mkRT(w,h,true,true);
  for(let i=0;i<POST.n;i++){ const k=2<<i, rw=Math.max(2,Math.round(w/k)), rh=Math.max(2,Math.round(h/k)); POST.down.push(mkRT(rw,rh,false)); if(i<POST.n-1) POST.up.push(mkRT(rw,rh,false)); }
  POST.tilt=[mkRT(Math.max(2,w>>1),Math.max(2,h>>1),false),mkRT(Math.max(2,w>>2),Math.max(2,h>>2),false)];
}
function renderFrame(){
  renderer.info.reset();
  const post=QUALITY[Q.level].post&&POST.rt;
  if(!post){ renderer.setRenderTarget(null); renderer.render(scene,camera); }
  else {
    renderer.setRenderTarget(POST.rt); renderer.render(scene,camera);
    const D=POST.down, U=POST.up, n=D.length;
    brightMat.uniforms.t.value=POST.rt.texture; brightMat.uniforms.px.value.set(1/POST.w,1/POST.h); brightMat.uniforms.uHi.value=POST.hi; fsPass(brightMat,D[0]);
    for(let i=1;i<n;i++){ downMat.uniforms.t.value=D[i-1].texture; downMat.uniforms.px.value.set(1/D[i-1].width,1/D[i-1].height); fsPass(downMat,D[i]); }
    let low=D[n-1];
    for(let i=n-2;i>=0;i--){ upMat.uniforms.t.value=low.texture; upMat.uniforms.b.value=D[i].texture; upMat.uniforms.px.value.set(0.5/low.width,0.5/low.height); fsPass(upMat,U[i]); low=U[i]; }
    const cu=compMat.uniforms;
    if(POST.tilt_>0){
      downMat.uniforms.t.value=POST.rt.texture; downMat.uniforms.px.value.set(1/POST.w,1/POST.h); fsPass(downMat,POST.tilt[0]);
      downMat.uniforms.t.value=POST.tilt[0].texture; downMat.uniforms.px.value.set(1/POST.tilt[0].width,1/POST.tilt[0].height); fsPass(downMat,POST.tilt[1]);
      cu.tt.value=POST.tilt[1].texture;
    }
    cu.t.value=POST.rt.texture; cu.tb.value=low.texture; cu.uBloom.value=POST.bloom/Math.sqrt(n); cu.uSat.value=POST.sat; cu.uCon.value=POST.con; cu.uVig.value=POST.vig;
    cu.uTilt.value=POST.tilt_; cu.uTiltY.value=POST.tiltY; cu.uFlash.value=POST.flash;
    fsPass(compMat,null);
  }
  if(wipe.iris<1.5||wipe.fade>0){
    const u=wipeMat.uniforms; u.uIris.value=wipe.iris; u.uC.value.set(wipe.x,wipe.y); u.uFade.value=wipe.fade; u.uAspect.value=camera.aspect;
    renderer.autoClear=false; fsPass(wipeMat,null); renderer.autoClear=true;
  }
  renderer.setRenderTarget(null);
}
/* where a point in the world lands on the screen, 0 to 1 each way: the wipe closes on Blorp with this */
const _pv=new T.Vector3();
function screenOf(x,y,z){ _pv.set(x,y,z).project(camera); return [clamp(_pv.x*0.5+0.5,0,1),clamp(_pv.y*0.5+0.5,0,1)]; }
