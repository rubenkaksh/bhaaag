const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/EffectComposer-C4oaodzR.js","assets/CopyShader-CHGAmNbz.js","assets/Pass-DDGCmUPp.js","assets/RenderPass-BGi_wlRh.js","assets/UnrealBloomPass-9L5-sJxD.js","assets/OutputPass-DSzDmX_D.js","assets/format-C6S0JKcS.js","assets/schemas-OFkPvHgW.js","assets/archetypes-C1iG5Nh7.js","assets/shipped-dLO1Kjfo.js","assets/compile-6YCjSfaQ.js","assets/houseKit-D5aDjI8N.js","assets/gen-85oqFsso.js","assets/dress-DQx2yJJO.js","assets/homeDress-BBfej1fA.js","assets/homeAssets-D5yltgiL.js","assets/graphAssets-Dhs-fEd2.js","assets/builderPage-CuYjp465.js"])))=>i.map(i=>d[i]);
import{a as e,d as t,l as n,n as r,o as i,s as a}from"./schemas-OFkPvHgW.js";var o=Object.defineProperty,s=(e,t)=>{let n={};for(var r in e)o(n,r,{get:e[r],enumerable:!0});return t||o(n,Symbol.toStringTag,{value:`Module`}),n};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),t({jitless:!0});var c=`{
  "version": 1,
  "spawn": [0, 0, 0],
  "spawnYaw": 3.14159,
  "killPlaneY": -95,
  "solids": [
    {
      "min": [-120, -120, -260],
      "max": [120, -119, 60]
    },
    {
      "min": [-4, -0.6, -3.5],
      "max": [4, 0, 3.5]
    },
    {
      "min": [-4, -9.274, -3.5],
      "max": [4, -0.6, 3.5]
    },
    {
      "min": [-4, -5.748, -10.5],
      "max": [4, -5.148, -3.5]
    },
    {
      "min": [-4, -11.822, -10.5],
      "max": [4, -5.748, -3.5]
    },
    {
      "min": [-4, -10.427, -30.5],
      "max": [4, -9.827, -23.5]
    },
    {
      "min": [-4, -19.101, -30.5],
      "max": [4, -10.427, -23.5]
    },
    {
      "min": [-4, -15.575, -37.5],
      "max": [4, -14.975, -30.5]
    },
    {
      "min": [-4, -21.649, -37.5],
      "max": [4, -15.575, -30.5]
    },
    {
      "min": [-4, -20.254, -57.5],
      "max": [4, -19.654, -50.5]
    },
    {
      "min": [-4, -28.928, -57.5],
      "max": [4, -20.254, -50.5]
    },
    {
      "min": [-4, -25.402, -64.5],
      "max": [4, -24.802, -57.5]
    },
    {
      "min": [-4, -31.476, -64.5],
      "max": [4, -25.402, -57.5]
    },
    {
      "min": [-4, -30.082, -84.5],
      "max": [4, -29.482, -77.5]
    },
    {
      "min": [-4, -38.755, -84.5],
      "max": [4, -30.082, -77.5]
    },
    {
      "min": [-4, -35.229, -91.5],
      "max": [4, -34.629, -84.5]
    },
    {
      "min": [-4, -41.303, -91.5],
      "max": [4, -35.229, -84.5]
    },
    {
      "min": [-15.5, -19.101, -30.5],
      "max": [-8.5, -10.427, -23.5]
    },
    {
      "min": [8.5, -38.755, -84.5],
      "max": [15.5, -30.082, -77.5]
    },
    {
      "min": [4, -3.3, -2.5],
      "max": [5.8, -3, 2.5]
    },
    {
      "min": [-5.8, -8.448, -9.5],
      "max": [-4, -8.148, -4.5]
    },
    {
      "min": [4, -13.127, -29.5],
      "max": [5.8, -12.827, -24.5]
    },
    {
      "min": [-5.8, -18.275, -36.5],
      "max": [-4, -17.975, -31.5]
    },
    {
      "min": [4, -22.954, -56.5],
      "max": [5.8, -22.654, -51.5]
    },
    {
      "min": [-5.8, -28.102, -63.5],
      "max": [-4, -27.802, -58.5]
    },
    {
      "min": [4, -32.782, -83.5],
      "max": [5.8, -32.482, -78.5]
    },
    {
      "min": [-5.8, -37.929, -90.5],
      "max": [-4, -37.629, -85.5]
    },
    {
      "min": [-4, 0, -3.5],
      "max": [-3.75, 0.4, 3.5]
    },
    {
      "min": [3.75, 0, -3.5],
      "max": [4, 0.4, 3.5]
    },
    {
      "min": [-3.7, 0, -1.6],
      "max": [-2.1, 0.8, 0]
    },
    {
      "min": [-4, -5.148, -10.5],
      "max": [-3.75, -4.748, -3.5]
    },
    {
      "min": [3.75, -5.148, -10.5],
      "max": [4, -4.748, -3.5]
    },
    {
      "min": [2.1, -5.148, -8.6],
      "max": [3.7, -4.348, -7]
    },
    {
      "min": [-4, -9.827, -30.5],
      "max": [-3.75, -9.427, -23.5]
    },
    {
      "min": [3.75, -9.827, -30.5],
      "max": [4, -9.427, -23.5]
    },
    {
      "min": [-3.7, -9.827, -28.6],
      "max": [-2.1, -9.027, -27]
    },
    {
      "min": [-4, -14.975, -37.5],
      "max": [-3.75, -14.575, -30.5]
    },
    {
      "min": [3.75, -14.975, -37.5],
      "max": [4, -14.575, -30.5]
    },
    {
      "min": [2.1, -14.975, -35.6],
      "max": [3.7, -14.175, -34]
    },
    {
      "min": [-4, -19.654, -57.5],
      "max": [-3.75, -19.254, -50.5]
    },
    {
      "min": [3.75, -19.654, -57.5],
      "max": [4, -19.254, -50.5]
    },
    {
      "min": [-3.7, -19.654, -55.6],
      "max": [-2.1, -18.854, -54]
    },
    {
      "min": [-4, -24.802, -64.5],
      "max": [-3.75, -24.402, -57.5]
    },
    {
      "min": [3.75, -24.802, -64.5],
      "max": [4, -24.402, -57.5]
    },
    {
      "min": [2.1, -24.802, -62.6],
      "max": [3.7, -24.002, -61]
    },
    {
      "min": [-4, -29.482, -84.5],
      "max": [-3.75, -29.082, -77.5]
    },
    {
      "min": [3.75, -29.482, -84.5],
      "max": [4, -29.082, -77.5]
    },
    {
      "min": [-3.7, -29.482, -82.6],
      "max": [-2.1, -28.682, -81]
    },
    {
      "min": [-4, -34.629, -91.5],
      "max": [-3.75, -34.229, -84.5]
    },
    {
      "min": [3.75, -34.629, -91.5],
      "max": [4, -34.229, -84.5]
    },
    {
      "min": [2.1, -34.629, -89.6],
      "max": [3.7, -33.829, -88]
    },
    {
      "min": [-36, -120, -106],
      "max": [-34, 40, 28]
    },
    {
      "min": [34, -120, -106],
      "max": [36, 40, 28]
    },
    {
      "min": [-34, -120, 26],
      "max": [34, 40, 28]
    },
    {
      "min": [-34, -120, -106],
      "max": [34, 40, -104]
    }
  ],
  "ramps": [
    {
      "min": [-34, -45.853, -104],
      "max": [34, -45.853, 26],
      "slopeAxis": 2,
      "rise": 47.316
    }
  ],
  "roofs": [
    {
      "min": [-15.5, -10.427, -30.5],
      "max": [-8.5, -8.427, -23.5],
      "ridge": 1
    }
  ],
  "anchors": [
    {
      "pos": [0, -8.227, -26]
    },
    {
      "pos": [0, -18.054, -53]
    },
    {
      "pos": [0, -27.882, -80]
    },
    {
      "pos": [-12, -8.227, -26]
    },
    {
      "pos": [12, -27.882, -80]
    }
  ],
  "goal": {
    "min": [-6, -39.303, -100.5],
    "max": [6, -36.629, -92]
  },
  "pads": [
    {
      "min": [-3, 0, -2.5],
      "max": [3, 0, 2.5]
    },
    {
      "min": [-3, -5.148, -9.5],
      "max": [3, -5.148, -4.5]
    },
    {
      "min": [-3, -9.827, -29.5],
      "max": [3, -9.827, -24.5]
    },
    {
      "min": [-3, -14.975, -36.5],
      "max": [3, -14.975, -31.5]
    },
    {
      "min": [-3, -19.654, -56.5],
      "max": [3, -19.654, -51.5]
    },
    {
      "min": [-3, -24.802, -63.5],
      "max": [3, -24.802, -58.5]
    },
    {
      "min": [-3, -29.482, -83.5],
      "max": [3, -29.482, -78.5]
    },
    {
      "min": [-3, -34.629, -90.5],
      "max": [3, -34.629, -85.5]
    }
  ],
  "route": [0, 1, 2],
  "style": [
    0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5
  ]
}
`,l={physics:{g:9.81,airDrag:.05,killPlaneBelowMin:5},rope:{gravityFactor:1,drag:.05,terminal:20,launchSpeed:3,minLen:4,maxLen:35,minSlopeDeg:10,maxSlopeDeg:55,trolleyStop:.6,handToFeet:2,hookSpeed:320,brakeDecel:10,legHazardKill:0},aim:{magnetDegDesktop:4,magnetDegTouch:6,routeAssistDeg:16,routeAssistLateDeg:10,routeAssistEarlyHops:2,snapRadius:1.2,previewHz:15,previewMaxSec:8,previewReleaseSamples:12,tapRadiusNdc:.18,hintSec:4},release:{inputBufferMs:100,coyoteMs:120,jumpUp:5,jumpFwd:2,carry:1,hookCooldownSec:.15,hookIntentSec:.5,perfectLo:.7,perfectHi:1,perfectBoost:2,perfectUp:2},landing:{vyClean:7,vyRoll:13,skidDecel:7,vhStumble:16,pad:.5,carryCap:12,carryDecay:0,rollSec:.35,chainWindowMs:400,edgeGrabH:.6,edgeGrabBelowMin:.2,edgeGrabBelowMax:1.4,edgeGrabVyMax:9},wall:{vCling:7.5},roof:{slipDeg:15,mu:.2,control:.3,uphillRun:.4},hero:{walk:3.5,run:6,radius:.35,stepUp:.4,jump:4.5,height:1.8,accel:40,friction:30,runAccel:8,airSteer:14,airSteerCap:6,sprintSpeed:11,sprintStreakM:6,sprintAccel:3.5,sprintCadence:.2,sprintFov:6,diveMinFall:6},camera:{dist:4.5,distSlide:6.5,fov:60,fovMax:75,shoulder:.6,pitchMin:-60,pitchMax:50,height:1.6,probeRadius:.25,smooth:.25,armRelease:.05,downhillBias:8,fovSpeed:20,frontPitchDeg:-12,zipYawDeg:45,zipYawMinDiagDeg:20,zipYawEase:.06,sideYawDeg:40,sideYawSpeed:2.5,sideYawEase:.07,sideYawEaseBack:.035,pathLookahead:30,pathTurnDeg:60,overviewHeight:30,overviewPitchDeg:65,overviewEase:.08,overviewMaxExtent:120,overviewNodes:15,overviewMargin:1.3,tiltDeg:20},validator:{minReleaseWindowTicks:12,minAimBand:.4,aimSamples:6,releaseStride:3},assist:{slowmoScale:.35,slowmoSec:.4},fixedHz:60,chase:{startGap:36,v0:4.4,accel:.045,vMax:13.5,gapMax:45,rubberK:.4,catchGap:2.5,fogGap:22,slots:6,scoreHop:25,scoreClean:10,scorePerfect:10,gapBase:11,gapSpanLo:2,gapSpanHi:6,decoyBase:.2,decoyGain:.3,oneHouseBase:.2,oneHouseGain:.15,frontPov:0},line:{zoneTol:.6},tramp:{vUp:9,jumpBonus:1.5,airSteer:12,airSteerCap:6},cushion:{lockSec:.5},climb:{reachMin:.6,reachMax:2.2,holdSec:.35,vyMax:8,mantleFwd:.3},vault:{minSpeed:2.5,maxH:1.1,maxDepth:.7,sec:.28,keep:.9,coneDeg:45,clearH:.1},slide:{minSpeed:7,sec:.6,height:1,decel:4,minKeep:2},parkour:{airStepUp:.5,grabProbe:.3,autoMantleSec:.25,stickDot:.7},hazard:{killImpact:10,groundWalkSpeed:2,climbHoldSec:.4,climbSpeed:2.5,climbMaxH:14}},u={physics:{g:9.81,airDrag:.05,killPlaneBelowMin:5},rope:{gravityFactor:1,drag:.05,terminal:20,launchSpeed:3,minLen:4,maxLen:35,minSlopeDeg:10,maxSlopeDeg:55,trolleyStop:.6,handToFeet:2,hookSpeed:320,brakeDecel:10,legHazardKill:0},aim:{magnetDegDesktop:4,magnetDegTouch:6,routeAssistDeg:16,routeAssistLateDeg:10,routeAssistEarlyHops:2,snapRadius:1.2,previewHz:15,previewMaxSec:8,previewReleaseSamples:12,tapRadiusNdc:.18,hintSec:4},release:{inputBufferMs:100,coyoteMs:120,jumpUp:5,jumpFwd:2,carry:1,hookCooldownSec:.15,hookIntentSec:.5,perfectLo:.7,perfectHi:1,perfectBoost:2,perfectUp:2},landing:{vyClean:7,vyRoll:13,skidDecel:7,vhStumble:16,pad:.5,carryCap:12,carryDecay:0,rollSec:.35,chainWindowMs:400,edgeGrabH:.6,edgeGrabBelowMin:.2,edgeGrabBelowMax:1.4,edgeGrabVyMax:9},wall:{vCling:7.5},roof:{slipDeg:15,mu:.2,control:.3,uphillRun:.4},hero:{walk:3.5,run:6,radius:.35,stepUp:.4,jump:4.5,height:1.8,accel:40,friction:30,runAccel:8,airSteer:14,airSteerCap:6,sprintSpeed:11,sprintStreakM:6,sprintAccel:3.5,sprintCadence:.2,sprintFov:6,diveMinFall:6},camera:{dist:4.5,distSlide:6.5,fov:60,fovMax:75,shoulder:.6,pitchMin:-60,pitchMax:50,height:1.6,probeRadius:.25,smooth:.25,armRelease:.05,downhillBias:8,fovSpeed:20,frontPitchDeg:-12,zipYawDeg:45,zipYawMinDiagDeg:20,zipYawEase:.06,sideYawDeg:40,sideYawSpeed:2.5,sideYawEase:.07,sideYawEaseBack:.035,pathLookahead:30,pathTurnDeg:60,overviewHeight:30,overviewPitchDeg:65,overviewEase:.08,overviewMaxExtent:120,overviewNodes:15,overviewMargin:1.3,tiltDeg:20},validator:{minReleaseWindowTicks:12,minAimBand:.4,aimSamples:6,releaseStride:3},assist:{slowmoScale:.35,slowmoSec:.4},fixedHz:60,chase:{startGap:36,v0:4.4,accel:.045,vMax:13.5,gapMax:45,rubberK:.4,catchGap:2.5,fogGap:22,slots:6,scoreHop:25,scoreClean:10,scorePerfect:10,gapBase:11,gapSpanLo:2,gapSpanHi:6,decoyBase:.2,decoyGain:.3,oneHouseBase:.2,oneHouseGain:.15,frontPov:0},line:{zoneTol:.6},tramp:{vUp:9,jumpBonus:1.5,airSteer:12,airSteerCap:6},cushion:{lockSec:.5},climb:{reachMin:.6,reachMax:2.2,holdSec:.35,vyMax:8,mantleFwd:.3},vault:{minSpeed:2.5,maxH:1.1,maxDepth:.7,sec:.28,keep:.9,coneDeg:45,clearH:.1},slide:{minSpeed:7,sec:.6,height:1,decel:4,minKeep:2},parkour:{airStepUp:.5,grabProbe:.3,autoMantleSec:.25,stickDot:.7},hazard:{killImpact:10,groundWalkSpeed:2,climbHoldSec:.4,climbSpeed:2.5,climbMaxH:14}},d=[`fixedHz`],f=e=>typeof e==`object`&&!!e&&!Array.isArray(e);function p(e,t,n=()=>void 0){let r=structuredClone(e);return t==null?r:f(t)?(m(r,t,``,!0,n),r):(n(`tuning overrides must be a JSON object; using defaults`),r)}function m(e,t,n,r,i){for(let a of Object.keys(t)){let o=n===``?a:`${n}.${a}`;if(r&&d.includes(a)){i(`tuning key ${o} is locked; ignored`);continue}if(!Object.prototype.hasOwnProperty.call(e,a)){i(`unknown tuning key ${o}; ignored`);continue}let s=e[a],c=t[a];f(s)?f(c)?m(s,c,o,!1,i):i(`tuning key ${o} must be an object; ignored`):typeof s==`number`?typeof c==`number`&&Number.isFinite(c)?e[a]=c:i(`tuning key ${o} must be a finite number; ignored`):i(`tuning key ${o} has an unsupported type; ignored`)}}var h=null,g={classic:{},chase:{hero:{sprintSpeed:6,runAccel:40},landing:{carryDecay:40}},strategy:{},village:{},home:{},"g:valley-1":{},"g:home-street":{},"g:hay-run":{}};function _(e,t=()=>void 0){h===null&&(h=p(y(),e,t))}function v(){return structuredClone(h??y())}function y(){let e=l,t={...u};for(let n of Object.keys(t)){let r=t[n];typeof r==`object`&&r&&(t[n]={...r,...e[n]})}let n=l.fixedHz,r=t;return typeof n==`number`&&(r.fixedHz=n),r}function b(e,t){let n=t===void 0?v():p(v(),t),r=g[e]??{};for(let e of Object.keys(r))n[e]={...n[e],...r[e]};return n}var x=class{min;max;constructor(e,t){this.min=e,this.max=t}},S=class{hit;t;nx;ny;nz;constructor(){this.hit=!1,this.t=0,this.nx=0,this.ny=0,this.nz=0}};function C(e,t,n,r){return t>=e.min.x&&t<=e.max.x&&n>=e.min.y&&n<=e.max.y&&r>=e.min.z&&r<=e.max.z}function w(e,t,n){return e<t?t:e>n?n:e}function T(e,t,n,r){let i=t-w(t,e.min.x,e.max.x),a=n-w(n,e.min.z,e.max.z);return i*i+a*a<=r*r}function E(e){e.hit=!1,e.t=1,e.nx=0,e.ny=0,e.nz=0}function D(e,t,n,r,i,a,o,s,c,l,u,d,f,p){let m=-1/0,h=1/0,g=-1,_=0;for(let v=0;v<3;v++){let y=e,b=r,x=o,S=l;if(v===1?(y=t,b=i,x=s,S=u):v===2&&(y=n,b=a,x=c,S=d),Math.abs(b)<1e-9){if(f?y<=x||y>=S:y<x||y>S){E(p);return}}else{let e=(x-y)/b,t=(S-y)/b,n=-1;if(e>t){let r=e;e=t,t=r,n=1}e>m&&(m=e,g=v,_=n),t<h&&(h=t)}}(f?m>=h||h<=0:m>h||h<0)||m>1||g<0?E(p):(p.hit=!0,p.t=m<=0?0:m,p.nx=g===0?_:0,p.ny=g===1?_:0,p.nz=g===2?_:0)}function O(e,t,n,r){C(n,e.x,e.y,e.z)?(r.hit=!0,r.t=0,r.nx=0,r.ny=0,r.nz=0):D(e.x,e.y,e.z,t.x-e.x,t.y-e.y,t.z-e.z,n.min.x,n.min.y,n.min.z,n.max.x,n.max.y,n.max.z,!1,r)}function k(e,t,n,r,i,a){let o=i.min.x-n,s=i.max.x+n,c=i.min.y-t,l=i.max.y,u=i.min.z-n,d=i.max.z+n,f=e.x,p=e.y,m=e.z;if(f>o&&f<s&&p>c&&p<l&&m>u&&m<d){let e=f-o,t=-1,n=0,r=0,i=s-f;i<e&&(e=i,t=1),i=p-c,i<e&&(e=i,t=0,n=-1),i=l-p,i<e&&(e=i,t=0,n=1),i=m-u,i<e&&(e=i,t=0,n=0,r=-1),i=d-m,i<e&&(t=0,n=0,r=1),a.hit=!0,a.t=0,a.nx=t,a.ny=n,a.nz=r}else D(f,p,m,r.x,r.y,r.z,o,c,u,s,l,d,!0,a)}var A=class{x;y;z;constructor(e,t,n){this.x=e,this.y=t,this.z=n}};function j(e,t,n,r){e.x=t,e.y=n,e.z=r}var M=Math.PI/180,N=180/Math.PI,P=1e-4,F=.05,ee=class{state=0;anchorId=-1;ax=0;ay=0;az=0;ox=0;oy=0;oz=0;dirX=0;dirY=0;dirZ=0;slopeSin=0;len=0;s=0;v=0;flyT=0;handToFeet=0};function te(){return new ee}function ne(e){e.state=0,e.anchorId=-1,e.ax=0,e.ay=0,e.az=0,e.ox=0,e.oy=0,e.oz=0,e.dirX=0,e.dirY=0,e.dirZ=0,e.slopeSin=0,e.len=0,e.s=0,e.v=0,e.flyT=0,e.handToFeet=0}function re(e,t){e.state=t.state,e.anchorId=t.anchorId,e.ax=t.ax,e.ay=t.ay,e.az=t.az,e.ox=t.ox,e.oy=t.oy,e.oz=t.oz,e.dirX=t.dirX,e.dirY=t.dirY,e.dirZ=t.dirZ,e.slopeSin=t.slopeSin,e.len=t.len,e.s=t.s,e.v=t.v,e.flyT=t.flyT,e.handToFeet=t.handToFeet}function ie(e,t,n,r){let i=e.ax-t,a=e.ay-n,o=e.az-r,s=Math.sqrt(i*i+a*a+o*o);if(s<=P)return;let c=1/s;e.ox=t,e.oy=n,e.oz=r,e.dirX=i*c,e.dirY=a*c,e.dirZ=o*c,e.slopeSin=-e.dirY,e.len=s,e.s=0}var ae=class{anchorId=-1;dist=0;angleDeg=0},oe=new A(0,0,0),se=new A(0,0,0),ce=new S,le=[],ue=[],de=new ae;function fe(e,t,n,r,i,a,o,s,c,l,u){let d=F<s*.25?F:s*.25;if(s-d*2<=0)return!1;j(oe,t+c*d,n+l*d,r+u*d),j(se,i-c*d,a-l*d,o-u*d);let f=e.solids;for(let e=0;e<f.length;e++)if(O(oe,se,f[e],ce),ce.hit)return!0;return!1}function pe(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m=null){p.anchorId=-1,p.dist=0,p.angleDeg=0;let h=Math.sqrt(c*c+l*l+u*u);if(h<=P)return;let g=1/h,_=c*g,v=l*g,y=u*g,b=t.rope,x=Math.sin(b.minSlopeDeg*M),S=Math.sin(b.maxSlopeDeg*M),C=Math.cos(f*M),w=e.anchors,T=-1,E=C,D=0,O=m===null?w.length:m.length;for(let t=0;t<O;t++){let c=m===null?w[t]:w[m[t]];if(c===void 0)continue;let l=c.px-a,u=c.py-o,f=c.pz-s,p=Math.sqrt(l*l+u*u+f*f);if(p<=P)continue;let h=1/p,g=(l*_+u*v+f*y)*h;if(!(g>E))continue;let C=c.px-n,O=c.py-r,k=c.pz-i,A=Math.sqrt(C*C+O*O+k*k);if(A<b.minLen||A>d)continue;let j=-O/A;j<x||j>S||fe(e,n,r,i,c.px,c.py,c.pz,A,C/A,O/A,k/A)||(E=g,T=c.id,D=A)}T!==-1&&(p.anchorId=T,p.dist=D,p.angleDeg=Math.acos(E>1?1:E)*N)}function me(e,t,n,r,i,a,o,s,c,l,u,d,f,p){let m=t.aim,h=e.route;le.length=0,ue.length=0;for(let e=0;e<h.length;e++)e<m.routeAssistEarlyHops?le.push(h[e]):ue.push(h[e]);let g=!1;m.routeAssistDeg>f&&(pe(e,t,n,r,i,a,o,s,c,l,u,d,m.routeAssistDeg,p,le),g=p.anchorId!==-1),m.routeAssistLateDeg>f&&(pe(e,t,n,r,i,a,o,s,c,l,u,d,m.routeAssistLateDeg,de,ue),de.anchorId!==-1&&((!g||de.angleDeg<p.angleDeg)&&(p.anchorId=de.anchorId,p.dist=de.dist,p.angleDeg=de.angleDeg),g=!0)),g||pe(e,t,n,r,i,a,o,s,c,l,u,d,f,p)}function he(e,t,n,r,i){let a=t.line.zoneTol;for(let t=0;t<e.lines.length;t++){let o=e.lines[t].zone;if(!(n<o.min.x||n>o.max.x||i<o.min.z||i>o.max.z)&&!(r<o.min.y-a||r>o.max.y+a))return t}return-1}function ge(e,t,n,r,i,a,o,s,c,l,u,d,f){if(e.lineOnly===1)return he(e,t,n,r-t.rope.handToFeet,i)>=0?0:8;let p=Math.sqrt(c*c+l*l+u*u);if(p<=P)return 1;let m=1/p,h=c*m,g=l*m,_=u*m,v=t.rope,y=Math.sin(v.minSlopeDeg*M),b=Math.sin(v.maxSlopeDeg*M),x=Math.cos(f*M),S=t.aim.routeAssistDeg>f?Math.cos(t.aim.routeAssistDeg*M):x,C=t.aim.routeAssistLateDeg>f?Math.cos(t.aim.routeAssistLateDeg*M):x,w=t.aim.routeAssistEarlyHops,T=e.route,E=e.anchors,D=null,O=0;for(let e=0;e<E.length;e++){let t=E[e];if(t===void 0)continue;let n=-1;for(let e=0;e<T.length;e++)if(T[e]===t.id){n=e;break}let r=x;n>=0&&(r=n<w?S:C);let i=t.px-a,c=t.py-o,l=t.pz-s,u=Math.sqrt(i*i+c*c+l*l);if(u<=P)continue;let d=1/u,f=(i*h+c*g+l*_)*d;f>r&&(D===null||f>O)&&(D=t,O=f)}if(D===null)return 1;let k=D.px-n,A=D.py-r,j=D.pz-i,N=Math.sqrt(k*k+A*A+j*j);if(N<v.minLen)return 2;if(N>d)return 3;let F=-A/N;return F<=0?4:F<y?5:F>b?6:fe(e,n,r,i,D.px,D.py,D.pz,N,k/N,A/N,j/N)?7:0}function _e(e,t,n,r,i,a,o,s){if(ne(e),t<0||t>=a.anchors.length)return!1;let c=a.anchors[t],l=c.px-n,u=c.py-r,d=c.pz-i,f=Math.sqrt(l*l+u*u+d*d);if(f<=P)return!1;let p=1/f;e.anchorId=c.id,e.ax=c.px,e.ay=c.py,e.az=c.pz,e.ox=n,e.oy=r,e.oz=i,e.dirX=l*p,e.dirY=u*p,e.dirZ=d*p,e.slopeSin=-e.dirY,e.len=f,e.handToFeet=o.rope.handToFeet;let m=o.rope.launchSpeed>s?o.rope.launchSpeed:s;return m>o.rope.terminal&&(m=o.rope.terminal),m<0&&(m=0),e.v=m,e.flyT=f/o.rope.hookSpeed,e.state=1,!0}function ve(e,t,n,r,i){if(e.state===1)return e.flyT-=t,e.flyT<=0&&(e.flyT=0,e.state=2),e.state;if(e.state!==2)return e.state;let a=r.rope,o=r.physics.g*a.gravityFactor*e.slopeSin-a.drag*e.v;i&&(o-=a.brakeDecel);let s=e.v+o*t;s>a.terminal&&(s=a.terminal),s<0&&(s=0),e.v=s,e.s+=s*t;let c=e.len-a.trolleyStop;return e.s>=c&&(e.s=c,e.state=3),e.state}function ye(e,t){e.state===0?j(t,0,0,0):(t.x=e.ox+e.dirX*e.s,t.y=e.oy+e.dirY*e.s-e.handToFeet,t.z=e.oz+e.dirZ*e.s)}function be(e,t){let n=e.state===2||e.state===3,r=n?e.dirX*e.v:0,i=n?e.dirY*e.v:0,a=n?e.dirZ*e.v:0;ne(e),t.x=r,t.y=i,t.z=a}var xe=2048,Se=4096,I=1024,Ce=class{px=0;py=0;pz=0;vx=0;vy=0;vz=0;yaw=0;camYaw=0;camPitch=0;grounded=0;dead=0;mode=1;hook=te();rollT=0;landLockT=0;chainT=0;sprintM=0;deadCause=0;eventBits=0;hookCd=0;hookIntentT=0;runOut=0;launchY=0;perfect=0;hasLedge=0;hangLedgeY=0;hangNx=0;hangNz=0;hangWall=0;climbT=0;bounceAir=0;vaultT=0;vaultX0=0;vaultY0=0;vaultZ0=0;vaultX1=0;vaultY1=0;vaultZ1=0;vaultOnto=0;vaultVx=0;vaultVz=0;slideT=0;hill=0;hillClimb=0;hillClimbT=0};function we(){return new Ce}function Te(e,t){e.px=t.px,e.py=t.py,e.pz=t.pz,e.vx=t.vx,e.vy=t.vy,e.vz=t.vz,e.yaw=t.yaw,e.camYaw=t.camYaw,e.camPitch=t.camPitch,e.grounded=t.grounded,e.dead=t.dead,e.mode=t.mode,re(e.hook,t.hook),e.rollT=t.rollT,e.landLockT=t.landLockT,e.chainT=t.chainT,e.sprintM=t.sprintM,e.deadCause=t.deadCause,e.eventBits=t.eventBits,e.hookCd=t.hookCd,e.hookIntentT=t.hookIntentT,e.runOut=t.runOut,e.launchY=t.launchY,e.perfect=t.perfect,e.hasLedge=t.hasLedge,e.hangLedgeY=t.hangLedgeY,e.hangNx=t.hangNx,e.hangNz=t.hangNz,e.hangWall=t.hangWall,e.climbT=t.climbT,e.bounceAir=t.bounceAir,e.vaultT=t.vaultT,e.vaultX0=t.vaultX0,e.vaultY0=t.vaultY0,e.vaultZ0=t.vaultZ0,e.vaultX1=t.vaultX1,e.vaultY1=t.vaultY1,e.vaultZ1=t.vaultZ1,e.vaultOnto=t.vaultOnto,e.vaultVx=t.vaultVx,e.vaultVz=t.vaultVz,e.slideT=t.slideT,e.hill=t.hill,e.hillClimb=t.hillClimb,e.hillClimbT=t.hillClimbT}var L=32767,Ee=4096,R=class{moveX=0;moveY=0;lookYaw=0;lookPitch=0;aimYaw=0;aimPitch=0;hasAim=0;buttons=0;pressed=0;taps=0};function z(){return new R}function De(e){e.moveX=0,e.moveY=0,e.lookYaw=0,e.lookPitch=0,e.aimYaw=0,e.aimPitch=0,e.hasAim=0,e.buttons=0,e.pressed=0,e.taps=0}function Oe(e){let t=e;return t>1&&(t=1),t<-1&&(t=-1),Math.round(t*L)}function ke(e){return e/L}function Ae(e){return Math.round(e*Ee/(Math.PI*2))}function je(e){return e*Math.PI*2/Ee}function Me(e,t){return(e.buttons&t)!==0}function Ne(e,t){return(e.pressed&t)!==0}var Pe=Math.PI/180,Fe=.4,Ie=.05,Le=.3,B=class{onto=0;x1=0;y1=0;z1=0};function Re(e,t,n,r,i){return e*n+t*r>=Math.cos(i*Pe)}function ze(e,t,n,r,i,a,o){let s=o.hero.radius,c=t.max.y,l=n!==0,u=l?t.max.x-t.min.x:t.max.z-t.min.z,d=l?-n:-r,f=l?n>0?t.max.x:t.min.x:r>0?t.max.z:t.min.z,p=l?n>0?t.min.x:t.max.x:r>0?t.min.z:t.max.z;e.onto=u<=o.vault.maxDepth?0:1;let m;e.onto===1?(m=f+d*(s+Le),e.y1=c):(m=p+d*(s+Ie),e.y1=c+o.vault.clearH),e.x1=l?m:i,e.z1=l?a:m}function Be(e){let t=e<0?0:e>1?1:e;return t*t*(3-2*t)}function Ve(e,t,n){let r=n/t.vault.sec,i=r<0?0:r>1?1:r;e.px=e.vaultX0+(e.vaultX1-e.vaultX0)*i,e.pz=e.vaultZ0+(e.vaultZ1-e.vaultZ0)*i,e.py=e.vaultY0+(e.vaultY1-e.vaultY0)*Be(r/Fe)}function He(e,t,n,r){let i=e-t*r;if(i>=e)return e;let a=e<n?e:n;return i<a?a:i}var Ue=1e-4,We=Math.PI/180,Ge=.98,Ke=.1,qe=-1e30,Je=new A(0,0,0),Ye=new A(0,0,0),V=new S,Xe=new ae,Ze=new A(0,0,0),Qe=new A(0,0,0),$e=new B,et=0,tt=0,nt=0,rt=.9,it=2*Ue,at=.1,ot=.05,st=.5,ct=.05,lt=.5,ut=.002,dt=.08,ft=-1,pt=-1,mt=0,ht=0,gt=0,_t=1,vt=0;function yt(e,t,n,r,i,a,o,s){Je.x=t,Je.y=n,Je.z=r,Ye.x=o===0?s:0,Ye.y=o===1?s:0,Ye.z=o===2?s:0;let c=1,l=!1,u=0,d=0,f=0;ft=-1;for(let t=0;t<e.solids.length;t++)if(k(Je,i,a,Ye,e.solids[t],V),V.hit){if(V.t===0){let e=V.nx===0&&V.ny===0&&V.nz===0,t=V.nx*Ye.x+V.ny*Ye.y+V.nz*Ye.z>=0;if(e||t)continue}V.t<c&&(c=V.t,l=!0,u=V.nx,d=V.ny,f=V.nz,ft=t)}if(V.hit=l,V.nx=u,V.ny=d,V.nz=f,!l)return s;let p=c*Math.abs(s)-Ue;return p<=0?0:s<0?-p:p}function bt(e,t,n,r,i,a,o,s,c){Je.x=t,Je.y=n,Je.z=r,Ye.x=o,Ye.y=s,Ye.z=c;let l=1,u=!1,d=0,f=0,p=0;ft=-1;for(let t=0;t<e.solids.length;t++)if(k(Je,i,a,Ye,e.solids[t],V),V.hit){if(V.t===0){let e=V.nx===0&&V.ny===0&&V.nz===0,t=V.nx*o+V.ny*s+V.nz*c>=0;if(e||t)continue}V.t<l&&(l=V.t,u=!0,d=V.nx,f=V.ny,p=V.nz,ft=t)}if(V.hit=u,V.nx=d,V.ny=f,V.nz=p,!u)return 1;let m=Math.sqrt(o*o+s*s+c*c),h=l*m-Ue;return h<=0?0:h/m}function xt(e,t,n,r){let i=e.ramps[t],a=i.aabb;if(n<a.min.x||n>a.max.x||r<a.min.z||r>a.max.z)return qe;let o;return o=i.slopeAxis===0?(n-a.min.x)/(a.max.x-a.min.x):i.slopeAxis===1?(a.max.x-n)/(a.max.x-a.min.x):i.slopeAxis===2?(r-a.min.z)/(a.max.z-a.min.z):(a.max.z-r)/(a.max.z-a.min.z),a.min.y+i.rise*o}function St(e,t){let n=e.ramps[t],r=n.aabb;mt=0,ht=0;let i;n.slopeAxis===0?(mt=1,i=r.max.x-r.min.x):n.slopeAxis===1?(mt=-1,i=r.max.x-r.min.x):n.slopeAxis===2?(ht=1,i=r.max.z-r.min.z):(ht=-1,i=r.max.z-r.min.z),gt=i>0?n.rise/i:0,_t=1/Math.sqrt(1+gt*gt),vt=gt*_t}function Ct(e,t,n){wt(e,t.px,t.pz,n.hero.radius,t.py+it);let r=pt;return r<0||e.ramps[r].slip!==1||(St(e,r),gt<=Math.tan(n.roof.slipDeg*We))?-1:r}function wt(e,t,n,r,i){let a=qe;pt=-1;for(let o=0;o<e.solids.length;o++){let s=e.solids[o];if(!T(s,t,n,r))continue;let c=s.max.y;c<=i&&c>a&&(a=c)}for(let o=0;o<e.ramps.length;o++){let s=e.ramps[o].aabb;if(!T(s,t,n,r))continue;let c=xt(e,o,w(t,s.min.x,s.max.x),w(n,s.min.z,s.max.z));c<=qe||c>i||(c>a||c===a&&e.ramps[o].slip===1)&&(a=c,pt=o)}return a}function Tt(e,t,n,r){let i=qe;for(let a=0;a<e.ramps.length;a++){let o=e.ramps[a].aabb;if(!T(o,t,n,r))continue;let s=xt(e,a,w(t,o.min.x,o.max.x),w(n,o.min.z,o.max.z));s>qe&&s>i&&(i=s)}return i}function Et(e,t){e.dead=1,e.mode=2,e.deadCause=t,e.eventBits|=32,e.vx=0,e.vy=0,e.vz=0,e.grounded=0,e.perfect=0,e.hasLedge=0,e.slideT=0,ne(e.hook)}function Dt(e,t,n,r,i){for(let a=0;a<e.length;a++){let o=e[a];if(!T(o,t,n,r))continue;let s=o.max.y-i;if(s>-.05&&s<ct)return a}return-1}function Ot(e,t,n,r){for(let i=0;i<e.hazards.length;i++){let a=e.hazards[i];if(!(t<a.min.x||t>a.max.x||r<a.min.z||r>a.max.z)&&!(n<a.min.y||n>a.max.y))return i}return-1}function kt(e,t,n,r){let i=qe;for(let a=0;a<e.hazards.length;a++){let o=e.hazards[a];t<o.min.x||t>o.max.x||n<o.min.z||n>o.max.z||o.max.y<=r&&o.max.y>i&&(i=o.max.y)}return i}function At(e,t,n,r){for(let i=0;i<e.hazards.length;i++){let a=e.hazards[i];if(!(t<a.min.x||t>a.max.x||n<a.min.z||n>a.max.z)&&a.max.y>r&&a.min.y<r)return!0}return!1}function jt(e,t,n,r){let i=n.hazard;if(i.killImpact<=0||e.mode===3||e.mode===5){Et(e,4);return}if(e.mode===4)return;let a=t.hazards[r].max.y;if(e.hill===1&&e.grounded===1){e.py=a;return}if(-e.vy>i.killImpact){Et(e,4);return}e.py=a,e.vy=0;let o=Math.sqrt(e.vx*e.vx+e.vz*e.vz);if(o>i.groundWalkSpeed){let t=i.groundWalkSpeed/o;e.vx*=t,e.vz*=t}e.grounded=1,e.mode=0,e.hill=1,e.runOut=0,e.chainT=0,e.slideT=0,e.rollT=0,e.perfect=0,e.bounceAir=0,e.sprintM=0,e.eventBits|=4,(e.hook.state===2||e.hook.state===3)&&ne(e.hook)}function Mt(e,t,n){let r=Math.sqrt(e.vx*e.vx+e.vz*e.vz),i=t.landing.carryCap;if(r>i){let t=i/r;e.vx*=t,e.vz*=t}e.vy=t.tramp.vUp+(n?t.tramp.jumpBonus:0),e.bounceAir=1,e.grounded=0,e.mode=1,e.runOut=0,e.perfect=0,e.chainT=0,e.eventBits|=128,(e.hook.state===2||e.hook.state===3)&&ne(e.hook)}function Nt(e,t){e.vx=0,e.vy=0,e.vz=0,e.grounded=1,e.mode=0,e.runOut=0,e.perfect=0,e.chainT=0,e.landLockT=t.cushion.lockSec,e.eventBits|=260,(e.hook.state===2||e.hook.state===3)&&ne(e.hook)}function Pt(e,t,n,r){if(t.tramps.length>0&&Dt(t.tramps,e.px,e.pz,n.hero.radius,e.py)>=0){Mt(e,n,r);return}if(t.cushions.length>0&&Dt(t.cushions,e.px,e.pz,n.hero.radius,e.py)>=0){Nt(e,n);return}let i=0,a=1,o=0;pt>=0&&(St(t,pt),i=-mt*vt,a=_t,o=-ht*vt);let s=e.vx*i+e.vy*a+e.vz*o,c=-s;if(c>n.landing.vyRoll){Et(e,3);return}c>n.landing.vyClean&&(e.rollT=n.landing.rollSec,e.eventBits|=8),s<0&&(e.vx-=s*i,e.vz-=s*o);let l=Math.sqrt(e.vx*e.vx+e.vz*e.vz),u=n.landing.carryCap+(e.perfect===1?n.release.perfectBoost:0);if(e.perfect=0,l>u){let t=u/l;e.vx*=t,e.vz*=t}e.vy=0,e.grounded=1,e.mode=0,e.hill=0,e.runOut=0,e.chainT=n.landing.chainWindowMs/1e3,e.eventBits|=4;let d=l>u?u:l;t.parkour===1&&pt<0&&c<=n.landing.vyClean&&d>=n.slide.minSpeed&&nt>=lt&&Re(et,tt,e.vx/d,e.vz/d,n.vault.coneDeg)&&(e.slideT=n.slide.sec,e.eventBits|=Se),(e.hook.state===2||e.hook.state===3)&&ne(e.hook)}function Ft(e,t,n){e.hook.state===2||e.hook.state===3?be(e.hook,Ze):(Ze.x=0,Ze.y=0,Ze.z=0),e.vx=Ze.x,e.vy=Ze.y,e.vz=Ze.z,n&&(e.vx+=Math.sin(e.yaw)*t.release.jumpFwd,e.vz+=Math.cos(e.yaw)*t.release.jumpFwd,e.vy+=t.release.jumpUp),e.grounded=0,e.runOut=0,e.mode=1,e.hasLedge=0,e.climbT=0,e.hillClimb=0,e.hookCd=t.release.hookCooldownSec,e.eventBits|=2}function It(e,t,n,r){if(Ne(t,2)&&(e.hookIntentT=r.release.hookIntentSec),e.hookIntentT<=0||e.hookCd>0||e.hook.state!==0)return;let i=e.py+r.rope.handToFeet;if(n.lineOnly===1){if(e.grounded!==1)return;let t=he(n,r,e.px,e.py,e.pz);if(t<0)return;Xe.anchorId=n.lines[t].anchorId}else{let a=e.camYaw,o=e.camPitch;t.hasAim===1&&(a=je(t.aimYaw),o=je(t.aimPitch));let s=Math.cos(o),c=e.py+r.hero.height*rt,l=Me(t,64)?r.aim.magnetDegTouch:r.aim.magnetDegDesktop;if(me(n,r,e.px,i,e.pz,e.px,c,e.pz,Math.sin(a)*s,Math.sin(o),Math.cos(a)*s,r.rope.maxLen,l,Xe),Xe.anchorId===-1)return}e.hookIntentT=0;let a=0;if(e.grounded===1||e.chainT>0){let t=n.anchors[Xe.anchorId],r=t.px-e.px,o=t.py-i,s=t.pz-e.pz,c=Math.sqrt(r*r+o*o+s*s);c>0&&(a=(e.vx*r+e.vy*o+e.vz*s)/c)}_e(e.hook,Xe.anchorId,e.px,i,e.pz,n,r,a)&&(e.eventBits|=1,e.perfect=0)}function Lt(e,t,n,r,i){let a=e.hook;if(Ne(t,4)){Ft(e,r,!1);return}let o=ve(a,i,n,r,Me(t,8));ye(a,Qe);let s=r.hero.radius;e.vx=a.dirX*a.v,e.vy=a.dirY*a.v,e.vz=a.dirZ*a.v,a.v>.1&&(e.yaw=Math.atan2(a.dirX,a.dirZ));let c=Qe.y,l=e.runOut===1;if(l){let t=wt(n,Qe.x,Qe.z,s,e.launchY+r.hero.stepUp);t>qe&&t>=e.launchY-ot?c<t&&(c=t):e.runOut=0}let u=l?r.hero.stepUp:0,d=e.py,f=Qe.x-e.px,p=c-e.py,m=Qe.z-e.pz,h=bt(n,e.px,e.py+u,e.pz,r.hero.height-u,s,f,p,m),g=V.hit,_=!1;if(g&&p<0&&V.ny>.5&&Math.abs(e.py-e.launchY)<ot?(h=bt(n,e.px,e.py+u,e.pz,r.hero.height-u,s,f,0,m),g=V.hit,e.px+=f*h,e.pz+=m*h,_=!0):(e.px+=f*h,e.py+=p*h,e.pz+=m*h),e.runOut===0&&!_){let i=wt(n,e.px,e.pz,s,d+r.hero.stepUp);if(i>qe&&i>=e.py-it){e.py=i,Pt(e,n,r,Me(t,1));return}}if(g)zt(e,n,r);else if(o===3){let t=r.rope.trolleyStop+at,i=bt(n,e.px,e.py,e.pz,r.hero.height,s,a.dirX*t,a.dirY*t,a.dirZ*t);if(V.hit){e.px+=a.dirX*t*i,e.py+=a.dirY*t*i,e.pz+=a.dirZ*t*i,zt(e,n,r);return}Ft(e,r,!1),n.lineOnly===1&&(e.vx=0,e.vz=0)}}function Rt(e,t,n,r,i,a){if(e.hasLedge=0,r<0||V.ny!==0)return!1;let o=t.solids[r],s=n.hero.radius,c=V.nx,l=V.nz,u=c===0?l>0?o.max.z:o.min.z:c>0?o.max.x:o.min.x,d=s+n.climb.mantleFwd,f=c===0?e.px:u-c*d,p=l===0?e.pz:u-l*d,m=o.max.y,h=wt(t,f,p,s,m+st);h>m+ct&&(m=h);let g=m-e.py;return g<i||g>a||wt(t,f,p,s,m+n.hero.height)>m+ct?!1:(e.hasLedge=1,e.hangLedgeY=m,e.hangNx=c,e.hangNz=l,e.hangWall=u,e.climbT=0,!0)}function zt(e,t,n){let r=e.hook;r.v*Math.max(0,-(r.dirX*V.nx+r.dirY*V.ny+r.dirZ*V.nz))>n.wall.vCling?Et(e,2):(e.mode=4,e.vx=0,e.vy=0,e.vz=0,e.eventBits|=16,t.climb===1&&Rt(e,t,n,ft,n.climb.reachMin,n.climb.reachMax),ne(r))}function Bt(e,t,n,r){return e.vy>n.climb.vyMax||e.vy<-n.climb.vyMax||!Rt(e,t,n,r,n.climb.reachMin,n.climb.reachMax)?!1:(e.mode=4,e.vx=0,e.vy=0,e.vz=0,e.runOut=0,e.eventBits|=512,!0)}function Vt(e,t,n,r,i){if(e.vx=0,e.vy=0,e.vz=0,Ne(t,1)){Ft(e,r,!0);return}if(Ne(t,4)){Ft(e,r,!1);return}if(e.hasLedge!==1)return;if(e.hillClimb===1){let t=e.hangLedgeY-.5*(r.climb.reachMin+r.climb.reachMax);if(e.py<t){let n=e.py+r.hazard.climbSpeed*i;e.py=n<t?n:t;return}Ht(e,r);return}let a=n.parkour===1&&nt>=lt&&-(et*e.hangNx+tt*e.hangNz)>=r.parkour.stickDot;!Me(t,128)&&!a?e.climbT=0:(e.climbT+=i,e.climbT<(a?r.parkour.autoMantleSec:r.climb.holdSec)||Ht(e,r))}function Ht(e,t){let n=t.hero.radius+t.climb.mantleFwd;e.hangNx!==0&&(e.px=e.hangWall-e.hangNx*n),e.hangNz!==0&&(e.pz=e.hangWall-e.hangNz*n),e.py=e.hangLedgeY,e.yaw=Math.atan2(-e.hangNx,-e.hangNz),e.grounded=1,e.mode=0,e.hasLedge=0,e.climbT=0,e.chainT=0,e.hill=0,e.hillClimb=0,e.eventBits|=I}function Ut(e,t,n,r,i,a){return V.nx=i,V.ny=0,V.nz=a,Rt(e,t,n,r,n.hero.stepUp,n.hazard.climbMaxH)?(e.mode=4,e.grounded=0,e.vx=0,e.vy=0,e.vz=0,e.runOut=0,e.hillClimb=1,e.hillClimbT=0,e.yaw=Math.atan2(-i,-a),!0):!1}function Wt(e,t,n){e.vaultT+=n,e.vx=e.vaultVx,e.vz=e.vaultVz,e.vy=0,e.vaultT<t.vault.sec?Ve(e,t,e.vaultT):(Ve(e,t,t.vault.sec),e.vaultT=0,e.vaultOnto===1?(e.grounded=1,e.mode=0,e.chainT=t.landing.chainWindowMs/1e3):(e.grounded=0,e.mode=1))}function Gt(e,t,n,r,i,a,o){let s=1/t.fixedHz,c=t.hero.radius,l=n,u=r,d=i,f=0;for(let n=0;n<2*t.fixedHz;n++){let n=u;if(u+=f*s-.5*t.physics.g*s*s,f-=t.physics.g*s,l+=a*s,d+=o*s,e.hazards.length>0&&Ot(e,l,u,d)>=0||u<e.killPlaneY)return!1;let r=wt(e,l,d,c,n+t.hero.stepUp);if(r>qe&&r>=u-it){if(Dt(e.tramps,l,d,c,r)>=0||Dt(e.cushions,l,d,c,r)>=0)return!0;let n=-f;return pt>=0&&(St(e,pt),n=-(a*-mt*vt+f*_t+o*-ht*vt)),n<=t.landing.vyRoll}}return!1}function Kt(e,t,n,r,i,a,o,s){if(r<0)return!1;let c=t.solids[r],l=c.max.y-e.py;if(l<=n.hero.stepUp||l>n.vault.maxH||!Re(et,tt,-i,-a,n.vault.coneDeg))return!1;ze($e,c,i,a,e.px,e.pz,n);let u=n.hero.radius,d=$e.x1,f=$e.y1,p=$e.z1;return wt(t,d,p,u,f+n.hero.height)>f+ct||(bt(t,d,f+.02,p,n.hero.height-.02,u,-i*.001,0,-a*.001),V.hit)||$e.onto===0&&!Gt(t,n,d,f,p,o*n.vault.keep,s*n.vault.keep)?!1:(e.vaultX0=e.px,e.vaultY0=e.py,e.vaultZ0=e.pz,e.vaultX1=d,e.vaultY1=f,e.vaultZ1=p,e.vaultOnto=$e.onto,e.vaultVx=o*n.vault.keep,e.vaultVz=s*n.vault.keep,e.vaultT=0,e.vx=e.vaultVx,e.vz=e.vaultVz,e.vy=0,e.yaw=Math.atan2(-i,-a),e.mode=5,e.grounded=0,e.runOut=0,e.eventBits|=xe,!0)}function qt(e,t,n){let r=n.hero.radius,i=t.py+n.hero.height;for(let a=0;a<e.solids.length;a++){let o=e.solids[a];if(!(o.min.y>=i||o.max.y<=t.py+n.hero.stepUp)&&T(o,t.px,t.pz,r))return!0}return!1}function Jt(e,t,n,r,i){let a=i.hero.radius,o=n+i.hero.height;for(let s=0;s<e.solids.length;s++){let c=e.solids[s];if(!(c.min.y>=o||c.max.y<=n+i.hero.stepUp)&&T(c,t,r,a))return!1}return!0}function Yt(e,t,n,r){if(e.eventBits=0,e.dead===1)return;let i=1/r.fixedHz;e.chainT>0&&(e.chainT=e.chainT>i?e.chainT-i:0),e.rollT>0&&(e.rollT=e.rollT>i?e.rollT-i:0),e.hookCd>0&&(e.hookCd=e.hookCd>i?e.hookCd-i:0),e.hookIntentT>0&&(e.hookIntentT=e.hookIntentT>i?e.hookIntentT-i:0),e.landLockT>0&&(e.landLockT=e.landLockT>i?e.landLockT-i:0),e.camYaw+=je(t.lookYaw),e.camPitch+=je(t.lookPitch);let a=r.camera.pitchMin*We,o=r.camera.pitchMax*We;e.camPitch<a&&(e.camPitch=a),e.camPitch>o&&(e.camPitch=o);{let n=ke(t.moveX),r=ke(t.moveY),i=Math.sqrt(n*n+r*r);if(nt=e.landLockT>0?0:i>1?1:i,et=0,tt=0,i>0){n/=i,r/=i;let t=Math.sin(e.camYaw),a=Math.cos(e.camYaw);et=r*t+n*a,tt=r*a-n*t}}if(e.mode!==3&&e.mode!==5&&(It(e,t,n,r),e.hook.state===1&&ve(e.hook,i,n,r,!1)===2&&(ie(e.hook,e.px,e.py+r.rope.handToFeet,e.pz),e.runOut=+(e.grounded===1),e.launchY=e.py,e.grounded=0,e.mode=3,e.bounceAir=0)),e.mode===3?Lt(e,t,n,r,i):e.mode===4?Vt(e,t,n,r,i):e.mode===5?Wt(e,r,i):Zt(e,t,n,r,i),e.slideT>0&&e.grounded!==1&&(e.slideT=0),(e.grounded!==1||e.mode!==0)&&(e.sprintM=0),e.dead===0&&e.py<n.killPlaneY&&Et(e,1),(e.mode!==3||r.rope.legHazardKill===1)&&e.dead===0&&n.hazards.length>0){let t=Ot(n,e.px,e.py,e.pz);t>=0&&jt(e,n,r,t)}e.mode===3&&(e.hill=0)}function Xt(e,t,n,r,i,a){if(i>0){let i=n,o=r,s=i*mt+o*ht;if(s>0){let e=s*(1-t.roof.uphillRun);i-=mt*e,o-=ht*e}let c=i-e.vx,l=o-e.vz,u=Math.sqrt(c*c+l*l),d=t.hero.accel*t.roof.control*a;u<=d?(e.vx=i,e.vz=o):(e.vx+=c/u*d,e.vz+=l/u*d)}let o=t.physics.g,s=o*vt*_t;e.vx-=mt*s*a,e.vz-=ht*s*a;let c=Math.sqrt(e.vx*e.vx+e.vz*e.vz),l=t.roof.mu*o*_t*a;if(c<=l)e.vx=0,e.vz=0;else{let t=(c-l)/c;e.vx*=t,e.vz*=t}}function Zt(e,t,n,r,i){let a=e.landLockT>0,o=a?0:ke(t.moveX),s=a?0:ke(t.moveY),c=Math.sqrt(o*o+s*s);c>1&&(o/=c,s/=c);let l=Math.sin(e.camYaw),u=Math.cos(e.camYaw),d=(s*l+o*u)*r.hero.run,f=(s*u-o*l)*r.hero.run,p=e.hill===1&&e.grounded===1;if(p){let t=r.hazard.groundWalkSpeed;t<r.hero.run&&(d*=t/r.hero.run,f*=t/r.hero.run);let n=Math.sqrt(e.vx*e.vx+e.vz*e.vz);n>t&&(e.vx*=t/n,e.vz*=t/n)}let m=n.parkour===1;e.grounded===1&&(!a&&Ne(t,1)&&!(e.slideT>0&&qt(n,e,r))?(e.vy=r.hero.jump,e.grounded=0,e.slideT=0):e.vy=0);let h=e.grounded===1?Ct(n,e,r):-1;if(e.grounded===1&&e.slideT>0&&(c<.1||e.vx*d+e.vz*f<0)&&!qt(n,e,r)&&(e.slideT=0),h>=0)e.slideT=0,e.sprintM=0,Xt(e,r,d,f,c,i);else if(e.grounded===1&&e.slideT>0){e.sprintM=0;let t=Math.sqrt(e.vx*e.vx+e.vz*e.vz);if(t>0){let n=He(t,r.slide.decel,r.slide.minKeep,i)/t;e.vx*=n,e.vz*=n}if(t<.1&&c>0&&qt(n,e,r)){let t=r.slide.minKeep/r.hero.run;e.vx=d*t,e.vz=f*t}e.slideT-=i,e.slideT<=0&&(e.slideT=qt(n,e,r)?i:0)}else if(e.grounded===1){let t=r.hero.sprintSpeed>r.hero.run&&!p,n=Math.sqrt(e.vx*e.vx+e.vz*e.vz);t&&c>0&&n>=Ge*r.hero.run?e.sprintM+=n*i:e.sprintM=0;let a=t&&e.sprintM>=r.hero.sprintStreakM;if(c>0){if(a){let e=r.hero.sprintSpeed/r.hero.run;d*=e,f*=e}let t=d*d+f*f,o=e.vx*d+e.vz*f,s=e.chainT>0&&e.vx*e.vx+e.vz*e.vz>t&&o>0,c=d,l=f;if(o>0&&n*n>t){let e=Math.max(Math.sqrt(t),n-r.landing.carryDecay*i)/Math.sqrt(t);c=d*e,l=f*e}let u=c-e.vx,p=l-e.vz,m=Math.sqrt(u*u+p*p),h=a&&o>0&&n<r.hero.sprintSpeed,g=o>=0&&n*n<t,_=(s?r.landing.skidDecel:h?r.hero.sprintAccel:g?Math.min(r.hero.runAccel,r.hero.accel):r.hero.accel)*i;m<=_?(e.vx=c,e.vz=l):(e.vx+=u/m*_,e.vz+=p/m*_)}else{let t=Math.sqrt(e.vx*e.vx+e.vz*e.vz),n=(e.chainT>0?r.landing.skidDecel:r.hero.friction)*i;if(t<=n)e.vx=0,e.vz=0;else{let r=(t-n)/t;e.vx*=r,e.vz*=r}}}else{e.sprintM=0;let t=1-r.physics.airDrag*i;if(e.vx*=t,e.vz*=t,c>0&&!a){let t=e.bounceAir===1,n,a;if(t)n=d/r.hero.run*r.tramp.airSteerCap,a=f/r.hero.run*r.tramp.airSteerCap;else{let t=Math.sqrt(e.vx*e.vx+e.vz*e.vz),i=Math.max(r.hero.airSteerCap*c,t);n=d/(r.hero.run*c)*i,a=f/(r.hero.run*c)*i}let o=n-e.vx,s=a-e.vz,l=Math.sqrt(o*o+s*s),u=(t?r.tramp.airSteer:r.hero.airSteer)*i;l<=u?(e.vx=n,e.vz=a):(e.vx+=o/l*u,e.vz+=s/l*u)}}let g=e.py,_=r.hero.height;e.grounded===1&&(g=e.py+r.hero.stepUp,_=(e.slideT>0?r.slide.height:r.hero.height)-r.hero.stepUp);let v=r.hero.radius,y=e.px,b=e.vx,x=e.vz,S=m&&e.grounded===1&&e.slideT<=0&&nt>=lt&&b*b+x*x>=r.vault.minSpeed*r.vault.minSpeed,C=yt(n,e.px,g,e.pz,_,v,0,e.vx*i),w=V.hit,T=V.nx,E=V.ny,D=ft;if(m&&w&&e.grounded===0&&e.vy<=0&&E===0&&D>=0){let t=n.solids[D].max.y-e.py;t>0&&t<=r.parkour.airStepUp&&Jt(n,e.px,n.solids[D].max.y+ut,e.pz,r)&&(e.py=n.solids[D].max.y+ut,C=yt(n,e.px,e.py,e.pz,r.hero.height,v,0,e.vx*i),w=V.hit,T=V.nx,E=V.ny,D=ft)}if(w&&(e.vx=0,e.sprintM=0),e.px+=C,Tt(n,e.px,e.pz,v)>e.py+r.hero.stepUp||p&&At(n,e.px,e.pz,e.py+r.hero.stepUp))e.px=y,e.vx=0;else if(S&&w&&E===0&&Kt(e,n,r,D,T>0?1:-1,0,b,x))return;let O=e.pz,k=yt(n,e.px,e.grounded===1?g:e.py,e.pz,_,v,2,e.vz*i),A=V.hit,j=V.nz,M=V.ny,N=ft;if(m&&A&&e.grounded===0&&e.vy<=0&&M===0&&N>=0){let t=n.solids[N].max.y-e.py;t>0&&t<=r.parkour.airStepUp&&Jt(n,e.px,n.solids[N].max.y+ut,e.pz,r)&&(e.py=n.solids[N].max.y+ut,k=yt(n,e.px,e.py,e.pz,r.hero.height,v,2,e.vz*i),A=V.hit,j=V.nz,M=V.ny,N=ft)}if(A&&(e.vz=0,e.sprintM=0),e.pz+=k,Tt(n,e.px,e.pz,v)>e.py+r.hero.stepUp||p&&At(n,e.px,e.pz,e.py+r.hero.stepUp))e.pz=O,e.vz=0;else if(S&&A&&M===0&&Kt(e,n,r,N,0,j>0?1:-1,b,x))return;if(p&&nt>=lt){let t=-1,a=0,o=0;if(w&&E===0&&D>=0?(t=D,a=T>0?1:-1):A&&M===0&&N>=0&&(t=N,o=j>0?1:-1),t>=0&&-(et*a+tt*o)>=r.parkour.stickDot){if(e.hillClimbT+=i,e.hillClimbT>=r.hazard.climbHoldSec&&Ut(e,n,r,t,a,o))return}else e.hillClimbT=0}else e.hillClimbT=0;if(n.climb===1&&e.grounded===0){let t=d,i=f;c===0&&(t=Math.sin(e.yaw),i=Math.cos(e.yaw));let a=Math.sqrt(t*t+i*i);if(a>1e-6){let o=(m?r.parkour.grabProbe:dt)/a;if(bt(n,e.px,e.py,e.pz,r.hero.height,v,t*o,0,i*o),V.hit&&Bt(e,n,r,ft))return}}if(e.vx*e.vx+e.vz*e.vz>Ke*Ke&&(e.yaw=Math.atan2(e.vx,e.vz)),e.grounded===1){let t=wt(n,e.px,e.pz,v,e.py+r.hero.stepUp);if(e.hill===1){let i=kt(n,e.px,e.pz,e.py+r.hero.stepUp);i>t?t=i:t>qe&&(e.hill=0)}t>qe&&t>=e.py-r.hero.stepUp?(e.py=t,e.vy=0):(e.grounded=0,h>=0&&(e.vy=(e.vx*mt+e.vz*ht)*gt))}if(e.grounded===0){let a=e.py,o=e.vy*i-.5*r.physics.g*i*i,s;if(o>0?(s=yt(n,e.px,e.py,e.pz,r.hero.height,v,1,o),V.hit?e.vy=0:e.vy-=r.physics.g*i):(e.vy-=r.physics.g*i,s=yt(n,e.px,e.py,e.pz,r.hero.height,v,1,o)),e.py=a+s,o<=0){let i=wt(n,e.px,e.pz,v,a+r.hero.stepUp);i>qe&&i>=e.py-it&&(e.py=i,Pt(e,n,r,Me(t,1)))}}e.grounded===1&&(e.bounceAir=0),e.dead===0&&(e.mode=e.grounded===1?0:1)}var Qt=class{outcome=0;x=0;y=0;z=0;releaseTick=-1;releaseFrac=-1},$t=0,en=1,tn=2,nn=3,rn=4,an=.001,on=new Ce,sn=new Ce,cn=new R,ln=new R,un=new R;ln.hasAim=0,un.pressed=4,un.buttons=4;var dn=0,fn=0,pn=0,mn=-1,hn=-1,gn=-1;function _n(e,t){return t.goal.max.y>t.goal.min.y&&C(t.goal,e.px,e.py,e.pz)}function vn(e,t){dn=e.px,fn=e.py,pn=e.pz,hn=t}function yn(e,t,n){if(Te(sn,on),mn=-1,hn=-1,gn=-1,Yt(sn,cn,e,t),sn.hook.state===0||sn.hook.anchorId!==bn)return $t;let r=Math.ceil(t.aim.previewMaxSec*t.fixedHz),i=!1,a=0;for(;;){if(sn.eventBits&16&&(i=!0),sn.mode===3&&mn<0&&(mn=a),sn.mode===3&&sn.runOut===0&&gn<0&&(gn=a),mn>=0&&hn<0&&sn.mode!==3&&vn(sn,a),sn.dead===1)return hn<0&&vn(sn,a),en;if(_n(sn,e))return hn<0&&vn(sn,a),tn;if(hn>=0){if(sn.mode===4)return i?rn:nn;if(sn.grounded===1&&sn.mode===0&&sn.vx*sn.vx+sn.vz*sn.vz<an*an)return tn}if(a>=r)return hn<0&&vn(sn,a),en;a++,Yt(sn,a===n&&sn.mode===3?un:ln,e,t)}}var bn=-1;function xn(e,t,n,r,i){i.outcome=0,i.x=0,i.y=0,i.z=0,i.releaseTick=-1,i.releaseFrac=-1;let a=n.anchors[t];if(a===void 0||e.dead===1)return;Te(on,e),bn=t;let o=a.px-on.px,s=a.py-(on.py+r.hero.height*rt),c=a.pz-on.pz;cn.hasAim=1,cn.aimYaw=Ae(Math.atan2(o,c)),cn.aimPitch=Ae(Math.atan2(s,Math.sqrt(o*o+c*c))),cn.pressed=2,cn.buttons=2;let l=yn(n,r,0);if(l===$t)return;if(i.x=dn,i.y=fn,i.z=pn,l===tn||l===nn){i.outcome=1;return}if(l===rn){i.outcome=2;return}let u=gn>mn?gn:mn,d=hn-u,f=hn-mn,p=mn,m=r.aim.previewReleaseSamples;if(i.outcome=3,u<0||d<=0)return;let h=-1;for(let e=1;e<=m;e++){let t=u+Math.round(e*d/(m+1));if(t<=0||t===h)continue;h=t;let a=yn(n,r,t);if(a===tn||a===nn||a===rn){i.outcome=2,i.releaseTick=t,i.releaseFrac=(t-p)/f;return}}}var Sn=class{aabb;slopeAxis;rise;slip;roofId;constructor(e,t,n,r,i){this.aabb=e,this.slopeAxis=t,this.rise=n,this.slip=r,this.roofId=i}},Cn=class{aabb;ridgeAxis;rampA;rampB;constructor(e,t,n,r){this.aabb=e,this.ridgeAxis=t,this.rampA=n,this.rampB=r}},wn=class{id;px;py;pz;constructor(e,t,n,r){this.id=e,this.px=t,this.py=n,this.pz=r}},Tn=class{zone;anchorId;constructor(e,t){this.zone=e,this.anchorId=t}},En=class{solids;ramps;roofs;anchors;spawn;spawnYaw;killPlaneY;goal;pads;route;style;lineOnly;climb;parkour;lines;tramps;cushions;hazards;constructor(){this.solids=[],this.ramps=[],this.roofs=[],this.anchors=[],this.spawn=new A(0,0,0),this.spawnYaw=0,this.killPlaneY=0,this.goal=new x(new A(0,0,0),new A(0,0,0)),this.pads=[],this.route=[],this.style=[],this.lineOnly=0,this.climb=0,this.parkour=0,this.lines=[],this.tramps=[],this.cushions=[],this.hazards=[]}};function Dn(e,t,n){return e.lines.push(new Tn(t,n)),e.lines.length-1}function On(e,t){return e.solids.push(t),e.solids.length-1}function kn(e,t,n,r){return e.ramps.push(new Sn(t,n,r,0,-1)),e.ramps.length-1}function An(e,t,n){let r=e.roofs.length,i=t.max.y-t.min.y,a=t.min,o=t.max,s,c,l,u;if(n===1){let e=(a.x+o.x)*.5;s=new x(new A(a.x,a.y,a.z),new A(e,o.y,o.z)),c=new x(new A(e,a.y,a.z),new A(o.x,o.y,o.z)),l=0,u=1}else{let e=(a.z+o.z)*.5;s=new x(new A(a.x,a.y,a.z),new A(o.x,o.y,e)),c=new x(new A(a.x,a.y,e),new A(o.x,o.y,o.z)),l=2,u=3}e.ramps.push(new Sn(s,l,i,1,r));let d=e.ramps.length-1;e.ramps.push(new Sn(c,u,i,1,r));let f=e.ramps.length-1;return e.roofs.push(new Cn(t,n,d,f)),r}function jn(e,t,n,r){let i=e.anchors.length;return e.anchors.push(new wn(i,t,n,r)),i}var Mn=n([i(),i(),i()]);function Nn(e){return e.min[0]<=e.max[0]&&e.min[1]<=e.max[1]&&e.min[2]<=e.max[2]}var Pn=a({min:Mn,max:Mn}).refine(Nn,{message:`min must be <= max on every axis`}),Fn=i().int().min(0).max(1),In=a({min:Mn,max:Mn,slopeAxis:i().int().min(0).max(3),rise:i(),slip:Fn.optional()}).refine(Nn,{message:`min must be <= max on every axis`}).refine(e=>e.rise>0,{message:`rise must be > 0`}),Ln=a({min:Mn,max:Mn,ridge:i().int().min(0).max(1)}).refine(Nn,{message:`min must be <= max on every axis`}).refine(e=>e.max[1]>e.min[1],{message:`ridge must be above the eave`}).refine(e=>e.max[0]>e.min[0]&&e.max[2]>e.min[2],{message:`footprint must have area`}),Rn=a({pos:Mn}),zn=a({zone:Pn,anchor:i().int().min(0)}),Bn=a({version:e(1),spawn:Mn,spawnYaw:i(),killPlaneY:i(),solids:r(Pn),ramps:r(In),roofs:r(Ln).optional(),anchors:r(Rn),goal:Pn.optional(),pads:r(Pn).optional(),route:r(i().int()).optional(),style:r(i().int()).optional(),lineOnly:Fn.optional(),climb:Fn.optional(),parkour:Fn.optional(),lines:r(zn).optional(),tramps:r(Pn).optional(),cushions:r(Pn).optional(),hazards:r(Pn).optional()}).refine(e=>e.lines===void 0||e.lines.every(t=>t.anchor<e.anchors.length),{message:`lines: anchor id out of range`});function Vn(e){let t=[];for(let n of e.issues){let e=`(root)`;n.path.length>0&&(e=n.path.join(`.`)),t.push(e+`: `+n.message)}return`invalid test world: `+t.join(`; `)}function Hn(e){return new A(e[0],e[1],e[2])}function Un(e){let t;try{t=JSON.parse(e)}catch(e){let t=e instanceof Error?e.message:String(e);throw Error(`invalid JSON: `+t,{cause:e})}return Wn(t)}function Wn(e){let t=Bn.safeParse(e);if(!t.success)throw Error(Vn(t.error));let n=t.data,r=new En;r.spawn=Hn(n.spawn),r.spawnYaw=n.spawnYaw,r.killPlaneY=n.killPlaneY;for(let e=0;e<n.solids.length;e++){let t=n.solids[e];On(r,new x(Hn(t.min),Hn(t.max)))}for(let e=0;e<n.ramps.length;e++){let t=n.ramps[e],i=kn(r,new x(Hn(t.min),Hn(t.max)),t.slopeAxis,t.rise);t.slip!==void 0&&(r.ramps[i].slip=t.slip)}if(n.roofs!==void 0)for(let e=0;e<n.roofs.length;e++){let t=n.roofs[e];An(r,new x(Hn(t.min),Hn(t.max)),t.ridge)}for(let e=0;e<n.anchors.length;e++){let t=n.anchors[e];jn(r,t.pos[0],t.pos[1],t.pos[2])}if(n.goal!==void 0&&(r.goal=new x(Hn(n.goal.min),Hn(n.goal.max))),n.pads!==void 0)for(let e=0;e<n.pads.length;e++){let t=n.pads[e];r.pads.push(new x(Hn(t.min),Hn(t.max)))}if(n.route!==void 0)for(let e=0;e<n.route.length;e++)r.route.push(n.route[e]);if(n.style!==void 0)for(let e=0;e<n.style.length;e++)r.style.push(n.style[e]);if(n.lineOnly!==void 0&&(r.lineOnly=n.lineOnly),n.climb!==void 0&&(r.climb=n.climb),n.parkour!==void 0&&(r.parkour=n.parkour),n.lines!==void 0)for(let e=0;e<n.lines.length;e++){let t=n.lines[e];Dn(r,new x(Hn(t.zone.min),Hn(t.zone.max)),t.anchor)}return Gn(r.tramps,n.tramps),Gn(r.cushions,n.cushions),Gn(r.hazards,n.hazards),r}function Gn(e,t){if(t!==void 0)for(let n=0;n<t.length;n++)e.push(new x(Hn(t[n].min),Hn(t[n].max)))}var Kn={Space:1,ShiftLeft:4,ShiftRight:4,ControlLeft:4,ControlRight:4,KeyE:2,KeyQ:4,KeyR:8,KeyF:128},qn={KeyD:1,ArrowRight:1,KeyA:-1,ArrowLeft:-1},Jn={KeyW:1,ArrowUp:1,KeyS:-1,ArrowDown:-1};function Yn(e){if(!(e instanceof HTMLElement))return!1;let t=e.tagName;return t===`INPUT`||t===`TEXTAREA`||t===`SELECT`||e.isContentEditable}var Xn=class{target;heldKeys=new Set;mouseHeld=0;pressedPending=0;constructor(e){this.target=e,e.addEventListener(`pointerdown`,this.onPointerDown),e.addEventListener(`pointerup`,this.onPointerUp),e.addEventListener(`pointercancel`,this.onPointerUp),e.addEventListener(`contextmenu`,this.onContextMenu),window.addEventListener(`pointerup`,this.onPointerUp),window.addEventListener(`pointercancel`,this.onPointerUp),window.addEventListener(`keydown`,this.onKeyDown),window.addEventListener(`keyup`,this.onKeyUp),window.addEventListener(`blur`,this.onBlur)}sample(e){De(e);let t=0,n=0,r=0;for(let e of this.heldKeys){let i=qn[e];i!==void 0&&(t+=i);let a=Jn[e];a!==void 0&&(n+=a);let o=Kn[e];o!==void 0&&(r|=o)}e.moveX=Oe(t),e.moveY=Oe(n),e.buttons=r|this.mouseBits(),e.pressed=this.pressedPending,this.pressedPending=0}dispose(){this.target.removeEventListener(`pointerdown`,this.onPointerDown),this.target.removeEventListener(`pointerup`,this.onPointerUp),this.target.removeEventListener(`pointercancel`,this.onPointerUp),this.target.removeEventListener(`contextmenu`,this.onContextMenu),window.removeEventListener(`pointerup`,this.onPointerUp),window.removeEventListener(`pointercancel`,this.onPointerUp),window.removeEventListener(`keydown`,this.onKeyDown),window.removeEventListener(`keyup`,this.onKeyUp),window.removeEventListener(`blur`,this.onBlur)}mouseBits(){let e=0,t=!!(this.mouseHeld&1),n=!!(this.mouseHeld&4);return t&&(e|=2),n&&(e|=40),e}onPointerDown=e=>{let t=this.mouseBits();this.mouseHeld|=1<<e.button;try{this.target.setPointerCapture(e.pointerId)}catch{}this.pressedPending|=this.mouseBits()&~t};onPointerUp=e=>{this.mouseHeld&=~(1<<e.button)};onContextMenu=e=>{e.preventDefault()};onKeyDown=e=>{if(Yn(e.target))return;let t=e.code,n=t===`ControlLeft`||t===`ControlRight`;if(e.ctrlKey&&!n||e.metaKey||e.altKey)return;let r=Kn[t],i=qn[t],a=Jn[t];(r!==void 0||i!==void 0||a!==void 0)&&(e.preventDefault(),e.repeat||this.heldKeys.has(t)||(this.heldKeys.add(t),r!==void 0&&(this.pressedPending|=r)))};onKeyUp=e=>{this.heldKeys.delete(e.code)};onBlur=()=>{this.heldKeys.clear(),this.mouseHeld=0}},Zn=[`auto`,`landscape`,`portrait`],Qn=`bhaaag.orientation`,$n={auto:`Auto`,landscape:`Landscape`,portrait:`Portrait`};function er(e){return e===`landscape`||e===`portrait`?e:`auto`}function tr(e,t){return e>=t?`landscape`:`portrait`}function nr(e,t,n,r){return e===`auto`||r?!1:tr(t,n)!==e}function rr(e,t,n){return n?{w:t,h:e}:{w:e,h:t}}function ir(e,t,n,r,i){return r?(i.x=t,i.y=n-e):(i.x=e,i.y=t),i}function ar(e,t){return{width:`${t}px`,height:`${e}px`,transform:`translateX(${e}px) rotate(90deg)`}}function or(e){return e.replace(/orientation\s*:\s*(portrait|landscape)/g,(e,t)=>t===`portrait`?`orientation: landscape`:`orientation: portrait`)}function sr(e){return Zn[(Zn.indexOf(e)+1)%Zn.length]}function cr(e=ur()){try{return er(e?.getItem(Qn))}catch{return`auto`}}function lr(e,t=ur()){try{t?.setItem(Qn,e)}catch{}}function ur(){try{return typeof localStorage>`u`?null:localStorage}catch{return null}}var dr=!1;function fr(){return dr}function pr(){return rr(window.innerWidth,window.innerHeight,dr)}var mr={x:0,y:0};function hr(e,t){return ir(e,t,window.innerWidth,dr,mr)}var gr=new WeakMap;function _r(e,t){for(let n of Array.from(e))n instanceof CSSMediaRule&&(t(n),_r(n.cssRules,t))}function vr(e){for(let t of Array.from(document.styleSheets)){let n;try{n=t.cssRules}catch{continue}_r(n,t=>{let n=gr.get(t)??t.media.mediaText;/orientation/.test(n)&&(gr.set(t,n),t.media.mediaText=e?or(n):n)})}}function yr(e=document.body){let t=window.matchMedia(`(pointer: coarse)`).matches,n=t?cr():`auto`,r=!1,i=[],a=()=>{let i=window.innerWidth,a=window.innerHeight,o=t&&nr(n,i,a,r);if(o){let t=ar(i,a);e.style.position=`fixed`,e.style.left=`0`,e.style.top=`0`,e.style.transformOrigin=`0 0`,e.style.width=t.width,e.style.height=t.height,e.style.transform=t.transform}if(o!==dr){if(dr=o,!o)for(let t of[`position`,`left`,`top`,`transformOrigin`,`width`,`height`,`transform`])e.style[t]=``;vr(o),document.documentElement.classList.toggle(`orient-rotated`,o),window.dispatchEvent(new Event(`resize`))}},o=async e=>{let t=screen.orientation;try{if(e===`auto`){t.unlock?.(),r=!1;return}if(typeof t.lock!=`function`)return;document.fullscreenElement===null&&await document.documentElement.requestFullscreen(),await t.lock(e),r=!0}catch{r=!1}a()};window.addEventListener(`resize`,a),window.addEventListener(`orientationchange`,a),document.addEventListener(`fullscreenchange`,()=>{document.fullscreenElement===null&&r&&(r=!1,a())}),a();let s=e=>{if(t){n=e,lr(e),r=!1,a(),o(e);for(let t of i)t(e)}};return{pref:()=>n,setPref:s,cycle:()=>(s(sr(n)),n),onChange:e=>{i.push(e)},supported:t}}var br=class{down=!1;downT=0;count=0;lastUpT=0;press(e){this.down=!0,this.downT=e}release(e){if(!this.down)return-1;this.down=!1;let t=e-this.downT;return t<=250?(this.count<3&&this.count++,this.lastUpT=e):this.count=0,t}cancel(){this.down=!1,this.count=0}holding(e,t){return this.down&&e-this.downT>=t}isDown(){return this.down}poll(e){if(this.down||this.count===0)return 0;if(this.count>=3||e-this.lastUpT>=220){let e=this.count;return this.count=0,e}return 0}},xr=64,Sr=250,Cr=10,wr=80,Tr=300,Er=1,Dr=2,Or=4,kr=class{stickActive=!1;stickOriginX=0;stickOriginY=0;stickX=0;stickY=0;actionMode=`jump`;tapPending=!1;tapNdcX=0;tapNdcY=0;stickId=-1;lookId=-1;jumpId=-1;roles=new Map;lookStartX=0;lookStartY=0;lookStartTime=0;lookMaxDevPx=0;pressedPending=0;tapper=new br;pressMode=`jump`;root;stickZone;lookZone;btnJump;stickBase=null;stickKnob=null;constructor(e){if(this.root=e,this.stickZone=e.querySelector(`#stick-zone`),this.lookZone=e.querySelector(`#look-zone`),this.btnJump=e.querySelector(`#btn-jump`),this.stickZone!==null){this.stickBase=document.createElement(`div`),this.stickBase.id=`stick-base`,this.stickKnob=document.createElement(`div`),this.stickKnob.id=`stick-knob`;for(let e of[`up`,`right`,`down`,`left`]){let t=document.createElement(`i`);t.className=`chev `+e,t.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 14l4-4 4 4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,this.stickBase.appendChild(t)}this.stickZone.appendChild(this.stickBase),this.stickZone.appendChild(this.stickKnob),this.stickZone.addEventListener(`pointerdown`,this.onStickDown),this.stickZone.addEventListener(`pointermove`,this.onStickMove),this.stickZone.addEventListener(`pointerup`,this.onStickUp),this.stickZone.addEventListener(`pointercancel`,this.onStickCancel)}this.lookZone!==null&&(this.lookZone.addEventListener(`pointerdown`,this.onLookDown),this.lookZone.addEventListener(`pointermove`,this.onLookMove),this.lookZone.addEventListener(`pointerup`,this.onLookUp),this.lookZone.addEventListener(`pointercancel`,this.onLookCancel)),this.btnJump!==null&&(this.btnJump.addEventListener(`pointerdown`,this.onJumpDown),this.btnJump.addEventListener(`pointerup`,this.onJumpUp),this.btnJump.addEventListener(`pointercancel`,this.onJumpCancel)),window.addEventListener(`blur`,this.onBlur),e.addEventListener(`contextmenu`,this.onContextMenu)}sample(e){De(e),e.moveX=Oe(this.stickX),e.moveY=Oe(this.stickY);let t=performance.now(),n=0;this.jumpId!==-1&&(this.pressMode===`jump`?n|=65:this.pressMode===`hook`?n|=66:this.pressMode===`brake`&&this.tapper.holding(t,180)?n|=8:this.pressMode===`climb`&&this.tapper.holding(t,350)&&(n|=128));let r=this.tapper.poll(t);e.taps=r,r===2&&this.actionMode===`jump`?(this.pressedPending|=66,n|=66):r===3&&(this.pressedPending|=4),e.buttons=n,e.pressed=this.pressedPending,this.pressedPending=0}reset(){for(let e of this.roles.keys())this.releaseCapture(e);this.roles.clear(),this.stickId=-1,this.lookId=-1,this.jumpId=-1,this.releaseStick(),this.pressedPending=0,this.tapper.cancel(),this.tapPending=!1,this.lookMaxDevPx=0,this.render()}render(){if(this.stickBase===null||this.stickKnob===null)return;if(!this.stickActive){this.stickBase.classList.add(`ghost`),this.stickKnob.classList.add(`ghost`),this.stickBase.style.display=`block`,this.stickKnob.style.display=`block`,this.stickBase.style.left=``,this.stickBase.style.top=``,this.stickKnob.style.left=``,this.stickKnob.style.top=``;return}this.stickBase.classList.remove(`ghost`),this.stickKnob.classList.remove(`ghost`);let e=this.stickOriginX,t=this.stickOriginY;this.stickBase.style.display=`block`,this.stickBase.style.left=e+`px`,this.stickBase.style.top=t+`px`,this.stickKnob.style.display=`block`,this.stickKnob.style.left=e+this.stickX*xr+`px`,this.stickKnob.style.top=t-this.stickY*xr+`px`}dispose(){this.stickZone!==null&&(this.stickZone.removeEventListener(`pointerdown`,this.onStickDown),this.stickZone.removeEventListener(`pointermove`,this.onStickMove),this.stickZone.removeEventListener(`pointerup`,this.onStickUp),this.stickZone.removeEventListener(`pointercancel`,this.onStickCancel)),this.lookZone!==null&&(this.lookZone.removeEventListener(`pointerdown`,this.onLookDown),this.lookZone.removeEventListener(`pointermove`,this.onLookMove),this.lookZone.removeEventListener(`pointerup`,this.onLookUp),this.lookZone.removeEventListener(`pointercancel`,this.onLookCancel)),this.btnJump!==null&&(this.btnJump.removeEventListener(`pointerdown`,this.onJumpDown),this.btnJump.removeEventListener(`pointerup`,this.onJumpUp),this.btnJump.removeEventListener(`pointercancel`,this.onJumpCancel)),window.removeEventListener(`blur`,this.onBlur),this.root.removeEventListener(`contextmenu`,this.onContextMenu),this.stickBase?.remove(),this.stickKnob?.remove(),this.roles.clear(),this.releaseStick(),this.lookId=-1,this.jumpId=-1}capture(e,t){try{e.setPointerCapture(t.pointerId)}catch{}}releaseCapture(e){for(let t of[this.stickZone,this.lookZone,this.btnJump])try{t!==null&&t.hasPointerCapture(e)&&t.releasePointerCapture(e)}catch{}}releaseStick(){this.stickActive=!1,this.stickX=0,this.stickY=0}onStickDown=e=>{if(this.stickId!==-1||this.stickZone===null)return;e.preventDefault(),this.stickId=e.pointerId,this.roles.set(e.pointerId,Er),this.capture(this.stickZone,e),this.stickActive=!0;let t=hr(e.clientX,e.clientY);this.stickOriginX=t.x,this.stickOriginY=t.y,this.stickX=0,this.stickY=0};onStickMove=e=>{if(e.pointerId!==this.stickId)return;let t=hr(e.clientX,e.clientY),n=t.x-this.stickOriginX,r=t.y-this.stickOriginY,i=n/xr,a=-r/xr,o=Math.sqrt(i*i+a*a);o>1&&(i/=o,a/=o),this.stickX=i,this.stickY=a};onStickUp=e=>{e.pointerId===this.stickId&&(this.roles.delete(e.pointerId),this.stickId=-1,this.releaseStick())};onStickCancel=e=>{e.pointerId===this.stickId&&(this.roles.delete(e.pointerId),this.stickId=-1,this.releaseStick())};onLookDown=e=>{if(this.lookId!==-1||this.lookZone===null)return;e.preventDefault(),this.lookId=e.pointerId,this.roles.set(e.pointerId,Dr),this.capture(this.lookZone,e);let t=hr(e.clientX,e.clientY);this.lookStartX=t.x,this.lookStartY=t.y,this.lookStartTime=e.timeStamp,this.lookMaxDevPx=0};onLookMove=e=>{if(e.pointerId!==this.lookId)return;let t=hr(e.clientX,e.clientY),n=t.x-this.lookStartX,r=t.y-this.lookStartY,i=Math.sqrt(n*n+r*r);i>this.lookMaxDevPx&&(this.lookMaxDevPx=i)};onLookUp=e=>{if(e.pointerId!==this.lookId)return;this.roles.delete(e.pointerId),this.lookId=-1;let t=e.timeStamp-this.lookStartTime,n=hr(e.clientX,e.clientY),r=n.y-this.lookStartY,i=Math.max(this.lookMaxDevPx,Math.abs(r));if(r>wr&&t<=Tr)this.pressedPending|=4;else if(t<Sr&&i<Cr&&this.lookZone!==null){let e=this.lookZone,t=fr()?{left:e.offsetLeft,top:e.offsetTop,width:e.offsetWidth,height:e.offsetHeight}:e.getBoundingClientRect(),r=t.width>0?t.width:1,i=t.height>0?t.height:1;this.tapNdcX=(n.x-t.left)/r*2-1,this.tapNdcY=1-(n.y-t.top)/i*2,this.tapPending=!0}};onLookCancel=e=>{e.pointerId===this.lookId&&(this.roles.delete(e.pointerId),this.lookId=-1)};onJumpDown=e=>{this.jumpId===-1&&this.btnJump!==null&&(e.preventDefault(),this.jumpId=e.pointerId,this.roles.set(e.pointerId,Or),this.capture(this.btnJump,e),this.pressMode=this.actionMode,this.tapper.press(e.timeStamp),this.pressMode===`jump`?this.pressedPending|=1:this.pressMode===`hook`&&(this.pressedPending|=66))};onJumpUp=e=>{if(e.pointerId!==this.jumpId)return;this.roles.delete(e.pointerId),this.jumpId=-1;let t=this.tapper.release(e.timeStamp);this.pressMode===`climb`&&t>=0&&t<350&&(this.pressedPending|=1)};onJumpCancel=e=>{e.pointerId===this.jumpId&&(this.roles.delete(e.pointerId),this.jumpId=-1,this.tapper.cancel())};onContextMenu=e=>{e.preventDefault()};onBlur=()=>{this.reset()}},Ar=.8,jr=.25,Mr=.02,Nr=1e-4,Pr=.09,Fr=900,Ir=300,Lr=.25,Rr=.02,zr=.12,Br=.12,Vr=180,Hr=90,Ur=1200,Wr=.35,Gr=.03,Kr=.2,qr=.12,Jr=.14,Yr=.2,Xr=.5,Zr=110,Qr=45,$r=.35,ei=220,ti=50,ni=800,ri=.4;function ii(e,t){let n=Math.max(1,Math.floor(e.sampleRate*t)),r=e.createBuffer(1,n,e.sampleRate),i=r.getChannelData(0);for(let e=0;e<i.length;e++)i[e]=Math.random()*2-1;return r}function ai(e,t,n,r){e.gain.setValueAtTime(t,n),e.gain.exponentialRampToValueAtTime(Nr,n+r)}function oi(e,t,n,r,i,a,o,s,c){let l=e.createOscillator();l.type=n,l.frequency.setValueAtTime(r,a),l.frequency.exponentialRampToValueAtTime(i,a+o);let u=l;if(c!==null){let t=e.createBiquadFilter();t.type=`lowpass`,t.frequency.value=c,l.connect(t),u=t}let d=e.createGain();ai(d,s,a,o),u.connect(d),d.connect(t),l.start(a),l.stop(a+o+Mr)}function si(e,t,n,r,i,a){let o=e.createBufferSource();o.buffer=n;let s=e.createGain();ai(s,a,r,i),o.connect(s),s.connect(t),o.start(r),o.stop(r+i+Mr)}var ci=class{ctx=null;master=null;noise=null;unlock(){if(this.ctx!==null)this.ctx.resume().catch(()=>void 0);else try{let e=window.AudioContext;if(typeof e!=`function`)return;let t=new e,n=t.createGain();n.gain.value=Ar,n.connect(t.destination);let r=ii(t,jr);this.ctx=t,this.master=n,this.noise=r,t.resume().catch(()=>void 0)}catch{this.ctx=null,this.master=null,this.noise=null}}fire(){let e=this.noise;this.run((t,n,r)=>{oi(t,n,`sine`,Fr,Ir,r,Pr,Lr,null),e!==null&&si(t,n,e,r,Rr,zr)})}attach(){let e=this.noise;this.run((t,n,r)=>{oi(t,n,`square`,Vr,Hr,r,Br,Wr,Ur),e!==null&&si(t,n,e,r,Gr,Kr)})}land(e){let t=Math.min(1,Math.max(0,Number.isFinite(e)?e:0)),n=qr+Jr*t,r=Yr+Xr*t;this.run((e,t,i)=>{oi(e,t,`sine`,Zr,Qr,i,n,r,null)})}die(){this.run((e,t,n)=>{oi(e,t,`sawtooth`,ei,ti,n,$r,ri,ni)})}wind(e){let t=this.noise,n=Math.min(1,Math.max(0,Number.isFinite(e)?e:0));t===null||n<=.02||this.run((e,r,i)=>{si(e,r,t,i,.2,.05+.25*n)})}roar(){this.run((e,t,n)=>{oi(e,t,`sawtooth`,120,38,n,.9,.45,500),oi(e,t,`square`,70,30,n,1.1,.25,300)})}dispose(){let e=this.ctx;if(this.ctx=null,this.master=null,this.noise=null,e!==null)try{e.close().catch(()=>void 0)}catch{}}run(e){let t=this.ctx,n=this.master;if(t!==null&&n!==null&&t.state!==`closed`)try{e(t,n,t.currentTime)}catch{}}},li=Math.PI/180,ui=2,di=class{pos=new A(0,0,0);lookAt=new A(0,0,0);focus=new A(0,0,0);arm=0;yaw=0;pitch=0;fov=0;initialized=0},fi=new S,pi=new A(0,0,0),mi=new A(0,0,0);function hi(e,t,n){return e<t?t:e>n?n:e}function gi(e,t,n,r,i,a,o,s,c=0){let l=s===void 0?fi:s,u=hi(i/o.fovSpeed,0,1),d=r-o.downhillBias*li*u;d=hi(d,o.pitchMin*li,o.pitchMax*li);let f=o.fov+(o.fovMax-o.fov)*u+c;if(e.initialized===0)e.initialized=1,e.focus.x=t.x,e.focus.y=t.y,e.focus.z=t.z,e.fov=f,e.arm=o.dist;else{let n=o.smooth;e.focus.x+=(t.x-e.focus.x)*n,e.focus.y+=(t.y-e.focus.y)*n,e.focus.z+=(t.z-e.focus.z)*n,e.fov+=(f-e.fov)*n}e.yaw=n,e.pitch=d;let p=Math.sin(e.yaw),m=Math.cos(e.yaw),h=Math.sin(e.pitch),g=Math.cos(e.pitch),_=e.focus.x,v=e.focus.y+o.height,y=e.focus.z,b=_-p*g*o.dist+m*o.shoulder,x=v-h*o.dist,S=y+m*g*o.dist+p*o.shoulder,C=b-_,w=x-v,T=S-y,E=Math.sqrt(C*C+w*w+T*T),D=E;if(E>0){pi.x=_,pi.y=v-o.probeRadius,pi.z=y,mi.x=C,mi.y=w,mi.z=T;let e=1;for(let t=0;t<a.length;t++)k(pi,ui*o.probeRadius,o.probeRadius,mi,a[t],l),l.hit&&(l.t===0&&l.nx*C+l.ny*w+l.nz*T>=0||l.t<e&&(e=l.t));D=E*e}D<e.arm?e.arm=D:e.arm+=(D-e.arm)*o.armRelease,e.arm>E&&(e.arm=E);let O=E>0?e.arm/E:0;e.pos.x=_+C*O,e.pos.y=v+w*O,e.pos.z=y+T*O,e.lookAt.x=_,e.lookAt.y=v,e.lookAt.z=y}var _i=Math.PI/180;function vi(e,t,n,r){return!e||n<0||Math.atan2(Math.abs(t),n)<r.zipYawMinDiagDeg*_i?0:(t>0?1:-1)*r.zipYawDeg*_i}function yi(e,t,n){let r=e+(t-e)*n.zipYawEase;return Math.abs(t-r)<1e-4?t:r}function bi(e,t){if(!(t.sideYawSpeed>0))return 0;let n=e/t.sideYawSpeed;return n>1&&(n=1),n<-1&&(n=-1),n*t.sideYawDeg*_i}function xi(e,t,n){let r=Math.abs(t)<Math.abs(e)?n.sideYawEaseBack:n.sideYawEase,i=e+(t-e)*r;return Math.abs(t-i)<1e-4?t:i}function Si(e,t){return t>=.5?-e:Math.PI-e}function Ci(e,t,n,r,i,a,o){let s=n*Math.cos(t)+r*Math.sin(t),c=n*Math.sin(t)-r*Math.cos(t);return e.zip=yi(e.zip,vi(i&&!a,s,c,o),o),e.side=xi(e.side,i||a?0:bi(s,o),o),e}var wi=Math.PI/180;function Ti(){return{px:0,py:0,pz:0,lx:0,ly:0,lz:0}}function Ei(e,t,n,r,i){let a=Math.sin(t),o=-Math.cos(t),s=[];i.length=0;for(let t=0;t<n.length;t++){let c=n[t],l=c.x-e.x,u=c.z-e.z;if(l*a+u*o<-4)continue;let d=l*l+u*u,f=i.length;if(f===r&&d>=s[f-1])continue;f<r&&f++;let p=f-1;for(;p>0&&s[p-1]>d;)s[p]=s[p-1],i[p]=i[p-1],p--;s[p]=d,i[p]=c}return i.length}function Di(e,t,n,r,i,a,o){let s=Math.sin(n),c=-Math.cos(n),l=Math.cos(n),u=Math.sin(n),d=0,f=0,p=0,m=0,h=e.y,g=e.y,_=r.overviewMaxExtent;for(let n=0;n<t.length;n++){let r=t[n].x-e.x,i=t[n].z-e.z,a=Math.sqrt(r*r+i*i),o=a>_&&a>0?_/a:1;r*=o,i*=o;let v=r*s+i*c,y=r*l+i*u;v<d&&(d=v),v>f&&(f=v),y<p&&(p=y),y>m&&(m=y);let b=e.y+(t[n].y-e.y)*o;b<h&&(h=b),b>g&&(g=b)}let v=(d+f)/2,y=(p+m)/2,b=e.x+s*v+l*y,x=e.z+c*v+u*y,S=(h+g)/2,C=(f-d)/2*r.overviewMargin,w=(m-p)/2*r.overviewMargin,T=Math.min(Math.max(r.overviewPitchDeg,20),89)*wi,E=Math.tan(Math.max(i,5)*wi/2),D=w/(E*Math.max(a,.2)),O=(C*Math.sin(T)+(g-h)/2*Math.cos(T))/E,k=Math.max(D,O,r.overviewHeight/Math.sin(T)),A=k*Math.cos(T);return o.px=b-s*A,o.py=S+k*Math.sin(T),o.pz=x-c*A,o.lx=b,o.ly=S,o.lz=x,o}function Oi(e,t,n){let r=+!!t,i=e+(r-e)*n.overviewEase;return Math.abs(r-i)<.001?r:i}function ki(e){let t=e<0?0:e>1?1:e;return t*t*(3-2*t)}function Ai(e,t,n){e.px+=(t.px-e.px)*n,e.py+=(t.py-e.py)*n,e.pz+=(t.pz-e.pz)*n,e.lx+=(t.lx-e.lx)*n,e.ly+=(t.ly-e.ly)*n,e.lz+=(t.lz-e.lz)*n}function ji(e){return e===0||e===3}var Mi=`attached`,Ni=1e3,Pi=1001,Fi=1002,Ii=1003,Li=1004,Ri=1005,zi=1006,Bi=1007,Vi=1008,Hi=1009,Ui=1010,Wi=1011,Gi=1012,Ki=1013,qi=1014,Ji=1015,Yi=1016,Xi=1017,Zi=1018,Qi=1020,$i=35902,ea=35899,ta=1021,na=1022,ra=1023,ia=1026,aa=1027,oa=1028,sa=1029,ca=1030,la=1031,ua=1033,da=33776,fa=33777,pa=33778,ma=33779,ha=35840,ga=35841,_a=35842,va=35843,ya=36196,ba=37492,xa=37496,Sa=37488,Ca=37489,wa=37490,Ta=37491,Ea=37808,Da=37809,Oa=37810,ka=37811,Aa=37812,ja=37813,Ma=37814,Na=37815,Pa=37816,Fa=37817,Ia=37818,La=37819,Ra=37820,za=37821,Ba=36492,Va=36494,Ha=36495,Ua=36283,Wa=36284,Ga=36285,Ka=36286,qa=2300,Ja=2301,Ya=2302,Xa=2303,Za=2400,Qa=2401,$a=2402,eo=3200,to=`srgb`,no=`srgb-linear`,ro=`linear`,io=`srgb`,ao=7680,oo=35044,so=35048,co=2e3;function lo(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function uo(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function fo(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function po(){let e=fo(`canvas`);return e.style.display=`block`,e}var mo={};function ho(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function go(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function H(...e){e=go(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function U(...e){e=go(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function _o(...e){let t=e.join(` `);t in mo||(mo[t]=!0,H(...e))}function vo(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var yo={0:0,2:6,4:4,3:5,1:1,6:2,7:7,5:3},bo=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},xo=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),So=Math.PI/180,Co=180/Math.PI;function wo(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(xo[e&255]+xo[e>>8&255]+xo[e>>16&255]+xo[e>>24&255]+`-`+xo[t&255]+xo[t>>8&255]+`-`+xo[t>>16&15|64]+xo[t>>24&255]+`-`+xo[n&63|128]+xo[n>>8&255]+`-`+xo[n>>16&255]+xo[n>>24&255]+xo[r&255]+xo[r>>8&255]+xo[r>>16&255]+xo[r>>24&255]).toLowerCase()}function To(e,t,n){return Math.max(t,Math.min(n,e))}function Eo(e,t){return(e%t+t)%t}function Do(e,t,n){return(1-n)*e+n*t}function Oo(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function ko(e){switch(e.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Ao(e,t){if(t.constructor===Float32Array)return e;let n=ko(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.max(e/n,-1)}function jo(e,t){if(t.constructor===Float32Array)return e;let n=ko(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.round(e*n)}var W=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=To(this.x,e.x,t.x),this.y=To(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=To(this.x,e,t),this.y=To(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(To(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(To(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Mo=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:H(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(To(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},G=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Po.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Po.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=To(this.x,e.x,t.x),this.y=To(this.y,e.y,t.y),this.z=To(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=To(this.x,e,t),this.y=To(this.y,e,t),this.z=To(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(To(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return No.copy(this).projectOnVector(e),this.sub(No)}reflect(e){return this.sub(No.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(To(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},No=new G,Po=new Mo,K=class{static{this.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return _o(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Fo.makeScale(e,t)),this}rotate(e){return _o(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Fo.makeRotation(-e)),this}translate(e,t){return _o(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Fo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Fo=new K,Io=new K().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Lo=new K().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ro(){let e={enabled:!0,workingColorSpace:no,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=Bo(e.r),e.g=Bo(e.g),e.b=Bo(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Vo(e.r),e.g=Vo(e.g),e.b=Vo(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?ro:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[n].fromXYZ).multiply(this.spaces[t].toXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[no]:{primaries:t,whitePoint:r,transfer:ro,toXYZ:Io,fromXYZ:Lo,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:to},outputColorSpaceConfig:{drawingBufferColorSpace:to}},[to]:{primaries:t,whitePoint:r,transfer:io,toXYZ:Io,fromXYZ:Lo,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:to}}}),e}var zo=Ro();function Bo(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Vo(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Ho,Uo=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ho===void 0&&(Ho=fo(`canvas`)),Ho.width=e.width,Ho.height=e.height;let t=Ho.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Ho}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=fo(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Bo(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Bo(t[e]/255)*255):t[e]=Bo(t[e]);return{data:t,width:e.width,height:e.height}}return H(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Wo=0,Go=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Wo++}),this.uuid=wo(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width||0,t.height||0,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Ko(r[t].image)):e.push(Ko(r[t]))}else e=Ko(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Ko(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Uo.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(H(`Texture: Unable to serialize Texture.`),{})}var qo=0,Jo=new G,Yo=class e extends bo{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=Pi,i=Pi,a=zi,o=Vi,s=ra,c=Hi,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qo++}),this.uuid=wo(),this.name=``,this.source=new Go(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new W(0,0),this.repeat=new W(1,1),this.center=new W(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new K,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Jo).x}get height(){return this.source.getSize(Jo).y}get depth(){return this.source.getSize(Jo).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){H(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?H(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ni:e.x-=Math.floor(e.x);break;case Pi:e.x=e.x<0?0:1;break;case Fi:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Ni:e.y-=Math.floor(e.y);break;case Pi:e.y=e.y<0?0:1;break;case Fi:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Yo.DEFAULT_IMAGE=null,Yo.DEFAULT_MAPPING=300,Yo.DEFAULT_ANISOTROPY=1;var Xo=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=To(this.x,e.x,t.x),this.y=To(this.y,e.y,t.y),this.z=To(this.z,e.z,t.z),this.w=To(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=To(this.x,e,t),this.y=To(this.y,e,t),this.z=To(this.z,e,t),this.w=To(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(To(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Zo=class extends bo{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zi,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Xo(0,0,e,t),this.scissorTest=!1,this.viewport=new Xo(0,0,e,t),this.textures=[];let r=n.count;for(let i=0;i<r;i++)this.textures[i]=new Yo({width:e,height:t,depth:n.depth}),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:zi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Go(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Qo=class extends Zo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},$o=class extends Yo{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ii,this.minFilter=Ii,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},es=class extends Yo{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ii,this.minFilter=Ii,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},q=class e{static{this.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/ts.setFromMatrixColumn(e,0).length(),i=1/ts.setFromMatrixColumn(e,1).length(),a=1/ts.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(rs,e,is)}lookAt(e,t,n){let r=this.elements;return ss.subVectors(e,t),ss.lengthSq()===0&&(ss.z=1),ss.normalize(),as.crossVectors(n,ss),as.lengthSq()===0&&(Math.abs(n.z)===1?ss.x+=1e-4:ss.z+=1e-4,ss.normalize(),as.crossVectors(n,ss)),as.normalize(),os.crossVectors(ss,as),r[0]=as.x,r[4]=os.x,r[8]=ss.x,r[1]=as.y,r[5]=os.y,r[9]=ss.y,r[2]=as.z,r[6]=os.z,r[10]=ss.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],F=r[11],ee=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*F,i[12]=a*w+o*O+s*M+c*ee,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*F,i[13]=l*w+u*O+d*M+f*ee,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*F,i[14]=p*w+m*O+h*M+g*ee,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*F,i[15]=_*w+v*O+y*M+b*ee,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=ts.set(r[0],r[1],r[2]).length(),o=ts.set(r[4],r[5],r[6]).length(),s=ts.set(r[8],r[9],r[10]).length();i<0&&(a=-a),ns.copy(this);let c=1/a,l=1/o,u=1/s;return ns.elements[0]*=c,ns.elements[1]*=c,ns.elements[2]*=c,ns.elements[4]*=l,ns.elements[5]*=l,ns.elements[6]*=l,ns.elements[8]*=u,ns.elements[9]*=u,ns.elements[10]*=u,t.setFromRotationMatrix(ns),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=co,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=co,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ts=new G,ns=new q,rs=new G(0,0,0),is=new G(1,1,1),as=new G,os=new G,ss=new G,cs=new q,ls=new Mo,us=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(To(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-To(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(To(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-To(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(To(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-To(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:H(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return cs.makeRotationFromQuaternion(e),this.setFromRotationMatrix(cs,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ls.setFromEuler(this),this.setFromQuaternion(ls,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};us.DEFAULT_ORDER=`XYZ`;var ds=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},fs=0,ps=new G,ms=new Mo,hs=new q,gs=new G,_s=new G,vs=new G,ys=new Mo,bs=new G(1,0,0),xs=new G(0,1,0),Ss=new G(0,0,1),Cs={type:`added`},ws={type:`removed`},Ts={type:`childadded`,child:null},Es={type:`childremoved`,child:null},Ds=class e extends bo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fs++}),this.uuid=wo(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new G,n=new us,r=new Mo,i=new G(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new q},normalMatrix:{value:new K}}),this.matrix=new q,this.matrixWorld=new q,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ds,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ms.setFromAxisAngle(e,t),this.quaternion.multiply(ms),this}rotateOnWorldAxis(e,t){return ms.setFromAxisAngle(e,t),this.quaternion.premultiply(ms),this}rotateX(e){return this.rotateOnAxis(bs,e)}rotateY(e){return this.rotateOnAxis(xs,e)}rotateZ(e){return this.rotateOnAxis(Ss,e)}translateOnAxis(e,t){return ps.copy(e).applyQuaternion(this.quaternion),this.position.add(ps.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(bs,e)}translateY(e){return this.translateOnAxis(xs,e)}translateZ(e){return this.translateOnAxis(Ss,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hs.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?gs.copy(e):gs.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),_s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hs.lookAt(_s,gs,this.up):hs.lookAt(gs,_s,this.up),this.quaternion.setFromRotationMatrix(hs),r&&(hs.extractRotation(r.matrixWorld),ms.setFromRotationMatrix(hs),this.quaternion.premultiply(ms.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(U(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Cs),Ts.child=e,this.dispatchEvent(Ts),Ts.child=null):U(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ws),Es.child=e,this.dispatchEvent(Es),Es.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hs.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hs.multiply(e.parent.matrixWorld)),e.applyMatrix4(hs),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Cs),Ts.child=e,this.dispatchEvent(Ts),Ts.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,e,vs),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,ys,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Ds.DEFAULT_UP=new G(0,1,0),Ds.DEFAULT_MATRIX_AUTO_UPDATE=!0,Ds.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Os=class extends Ds{constructor(){super(),this.isGroup=!0,this.type=`Group`}},ks={type:`move`},As=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Os,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Os,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Os,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.quaternion,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.quaternion,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ks)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Os;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},js={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ms={h:0,s:0,l:0},Ns={h:0,s:0,l:0};function Ps(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var J=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=to){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,zo.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=zo.workingColorSpace){return this.r=e,this.g=t,this.b=n,zo.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=zo.workingColorSpace){if(e=Eo(e,1),t=To(t,0,1),n=To(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Ps(i,r,e+1/3),this.g=Ps(i,r,e),this.b=Ps(i,r,e-1/3)}return zo.colorSpaceToWorking(this,r),this}setStyle(e,t=to){function n(t){t!==void 0&&parseFloat(t)<1&&H(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseFloat(i[1]))/100,Math.min(100,parseFloat(i[2]))/100,Math.min(100,parseFloat(i[3]))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:H(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);H(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=to){let n=js[e.toLowerCase()];return n===void 0?H(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Bo(e.r),this.g=Bo(e.g),this.b=Bo(e.b),this}copyLinearToSRGB(e){return this.r=Vo(e.r),this.g=Vo(e.g),this.b=Vo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=to){return zo.workingToColorSpace(Fs.copy(this),e),Math.round(To(Fs.r*255,0,255))*65536+Math.round(To(Fs.g*255,0,255))*256+Math.round(To(Fs.b*255,0,255))}getHexString(e=to){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=zo.workingColorSpace){zo.workingToColorSpace(Fs.copy(this),t);let n=Fs.r,r=Fs.g,i=Fs.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=zo.workingColorSpace){return zo.workingToColorSpace(Fs.copy(this),t),e.r=Fs.r,e.g=Fs.g,e.b=Fs.b,e}getStyle(e=to){zo.workingToColorSpace(Fs.copy(this),e);let t=Fs.r,n=Fs.g,r=Fs.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Ms),this.setHSL(Ms.h+e,Ms.s+t,Ms.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ms),e.getHSL(Ns);let n=Do(Ms.h,Ns.h,t),r=Do(Ms.s,Ns.s,t),i=Do(Ms.l,Ns.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Fs=new J;J.NAMES=js;var Is=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new J(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ls=class extends Ds{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new us,this.environmentIntensity=1,this.environmentRotation=new us,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background===null?null:e.background.clone(),this.environment=e.environment===null?null:e.environment.clone(),this.fog=e.fog===null?null:e.fog.clone(),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial===null?null:e.overrideMaterial.clone(),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Rs=new G,zs=new G,Bs=new G,Vs=new G,Hs=new G,Us=new G,Ws=new G,Gs=new G,Ks=new G,qs=new G,Js=new Xo,Ys=new Xo,Xs=new Xo,Zs=class e{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Rs.subVectors(e,t),r.cross(Rs);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Rs.subVectors(r,t),zs.subVectors(n,t),Bs.subVectors(e,t);let a=Rs.dot(Rs),o=Rs.dot(zs),s=Rs.dot(Bs),c=zs.dot(zs),l=zs.dot(Bs),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Vs)!==null&&Vs.x>=0&&Vs.y>=0&&Vs.x+Vs.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Vs)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Vs.x),s.addScaledVector(a,Vs.y),s.addScaledVector(o,Vs.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Js.setScalar(0),Ys.setScalar(0),Xs.setScalar(0),Js.fromBufferAttribute(e,t),Ys.fromBufferAttribute(e,n),Xs.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Js,i.x),a.addScaledVector(Ys,i.y),a.addScaledVector(Xs,i.z),a}static isFrontFacing(e,t,n,r){return Rs.subVectors(n,t),zs.subVectors(e,t),Rs.cross(zs).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rs.subVectors(this.c,this.b),zs.subVectors(this.a,this.b),Rs.cross(zs).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Hs.subVectors(r,n),Us.subVectors(i,n),Gs.subVectors(e,n);let s=Hs.dot(Gs),c=Us.dot(Gs);if(s<=0&&c<=0)return t.copy(n);Ks.subVectors(e,r);let l=Hs.dot(Ks),u=Us.dot(Ks);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0&&s-l>0)return a=s/(s-l),t.copy(n).addScaledVector(Hs,a);qs.subVectors(e,i);let f=Hs.dot(qs),p=Us.dot(qs);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Us,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Ws.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Ws,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Hs,a).addScaledVector(Us,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Qs=class{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ec.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ec.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ec.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,ec):ec.fromBufferAttribute(r,t),ec.applyMatrix4(e.matrixWorld),this.expandByPoint(ec);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),tc.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),tc.copy(e.boundingBox)),tc.applyMatrix4(e.matrixWorld),this.union(tc)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ec),ec.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(cc),lc.subVectors(this.max,cc),nc.subVectors(e.a,cc),rc.subVectors(e.b,cc),ic.subVectors(e.c,cc),ac.subVectors(rc,nc),oc.subVectors(ic,rc),sc.subVectors(nc,ic);let t=[0,-ac.z,ac.y,0,-oc.z,oc.y,0,-sc.z,sc.y,ac.z,0,-ac.x,oc.z,0,-oc.x,sc.z,0,-sc.x,-ac.y,ac.x,0,-oc.y,oc.x,0,-sc.y,sc.x,0];return!fc(t,nc,rc,ic,lc)||(t=[1,0,0,0,1,0,0,0,1],!fc(t,nc,rc,ic,lc))?!1:(uc.crossVectors(ac,oc),t=[uc.x,uc.y,uc.z],fc(t,nc,rc,ic,lc))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ec).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ec).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||($s[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$s[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$s[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$s[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$s[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$s[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$s[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$s[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($s)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},$s=[new G,new G,new G,new G,new G,new G,new G,new G],ec=new G,tc=new Qs,nc=new G,rc=new G,ic=new G,ac=new G,oc=new G,sc=new G,cc=new G,lc=new G,uc=new G,dc=new G;function fc(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){dc.fromArray(e,a);let o=i.x*Math.abs(dc.x)+i.y*Math.abs(dc.y)+i.z*Math.abs(dc.z),s=t.dot(dc),c=n.dot(dc),l=r.dot(dc);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var pc=new G,mc=new W,hc=0,gc=class extends bo{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hc++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=oo,this.updateRanges=[],this.gpuType=Ji,this.version=0,this._normalizationScale=e===void 0?void 0:ko(e)}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)mc.fromBufferAttribute(this,t),mc.applyMatrix3(e),this.setXY(t,mc.x,mc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)pc.fromBufferAttribute(this,t),pc.applyMatrix3(e),this.setXYZ(t,pc.x,pc.y,pc.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)pc.fromBufferAttribute(this,t),pc.applyMatrix4(e),this.setXYZ(t,pc.x,pc.y,pc.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)pc.fromBufferAttribute(this,t),pc.applyNormalMatrix(e),this.setXYZ(t,pc.x,pc.y,pc.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)pc.fromBufferAttribute(this,t),pc.transformDirection(e),this.setXYZ(t,pc.x,pc.y,pc.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}_denormalize(e){let t=this._normalizationScale;return t===void 0?Ao(e,this.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?jo(e,this.array):Math.round(e*t)}},_c=class extends gc{constructor(e,t,n){super(new Uint16Array(e),t,n)}},vc=class extends gc{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Y=class extends gc{constructor(e,t,n){super(new Float32Array(e),t,n)}},yc=new Qs,bc=new G,xc=new G,Sc=class{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?yc.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;bc.subVectors(e,this.center);let t=bc.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(bc,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(bc.copy(e.center).add(xc)),this.expandByPoint(bc.copy(e.center).sub(xc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Cc=0,wc=new q,Tc=new Ds,Ec=new G,Dc=new Qs,Oc=new Qs,kc=new G,Ac=class e extends bo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cc++}),this.uuid=wo(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(lo(e)?vc:_c)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new K().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return wc.makeRotationFromQuaternion(e),this.applyMatrix4(wc),this}rotateX(e){return wc.makeRotationX(e),this.applyMatrix4(wc),this}rotateY(e){return wc.makeRotationY(e),this.applyMatrix4(wc),this}rotateZ(e){return wc.makeRotationZ(e),this.applyMatrix4(wc),this}translate(e,t,n){return wc.makeTranslation(e,t,n),this.applyMatrix4(wc),this}scale(e,t,n){return wc.makeScale(e,t,n),this.applyMatrix4(wc),this}lookAt(e){return Tc.lookAt(e),Tc.updateMatrix(),this.applyMatrix4(Tc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ec).negate(),this.translate(Ec.x,Ec.y,Ec.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Y(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&H(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qs);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)U(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Dc.setFromBufferAttribute(n),this.morphTargetsRelative?(kc.addVectors(this.boundingBox.min,Dc.min),this.boundingBox.expandByPoint(kc),kc.addVectors(this.boundingBox.max,Dc.max),this.boundingBox.expandByPoint(kc)):(this.boundingBox.expandByPoint(Dc.min),this.boundingBox.expandByPoint(Dc.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&U(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Sc);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)U(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new G,1/0);else if(e){let n=this.boundingSphere.center;if(Dc.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Oc.setFromBufferAttribute(n),this.morphTargetsRelative?(kc.addVectors(Dc.min,Oc.min),Dc.expandByPoint(kc),kc.addVectors(Dc.max,Oc.max),Dc.expandByPoint(kc)):(Dc.expandByPoint(Oc.min),Dc.expandByPoint(Oc.max))}Dc.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)kc.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(kc));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)kc.fromBufferAttribute(a,t),o&&(Ec.fromBufferAttribute(e,t),kc.add(Ec)),r=Math.max(r,n.distanceToSquared(kc))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&U(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){U(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new gc(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[],c=new Uint8Array(n.count);for(let e=0;e<n.count;e++)o[e]=new G,s[e]=new G;let l=new G,u=new G,d=new G,f=new W,p=new W,m=new W,h=new G,g=new G;function _(e,t,r){c[e]=c[t]=c[r]=1,l.fromBufferAttribute(n,e),u.fromBufferAttribute(n,t),d.fromBufferAttribute(n,r),f.fromBufferAttribute(i,e),p.fromBufferAttribute(i,t),m.fromBufferAttribute(i,r),u.sub(l),d.sub(l),p.sub(f),m.sub(f);let a=1/(p.x*m.y-m.x*p.y);isFinite(a)&&(h.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(a),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(a),o[e].add(h),o[t].add(h),o[r].add(h),s[e].add(g),s[t].add(g),s[r].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let t=0,n=v.length;t<n;++t){let n=v[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)_(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let y=new G,b=new G,x=new G,S=new G;function C(e){x.fromBufferAttribute(r,e),S.copy(x);let t=o[e];y.copy(t),y.sub(x.multiplyScalar(x.dot(t))).normalize(),b.crossVectors(S,t);let n=b.dot(s[e])<0?-1:1;a.setXYZW(e,y.x,y.y,y.z,n)}for(let e=0,t=n.count;e<t;++e)c[e]&&C(e);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new gc(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new G,i=new G,a=new G,o=new G,s=new G,c=new G,l=new G,u=new G;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)kc.fromBufferAttribute(e,t),kc.normalize(),e.setXYZ(t,kc.x,kc.y,kc.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new gc(a,r,i)}if(this.index===null)return H(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},jc=new G,Mc=new G,Nc=new K,Pc=class{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=jc.subVectors(n,t).cross(Mc.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(jc),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Nc.getNormalMatrix(e),r=this.coplanarPoint(jc).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Fc=0,Ic=class extends bo{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Fc++}),this.uuid=wo(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new J(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ao,this.stencilZFail=ao,this.stencilZPass=ao,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){H(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?H(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new J().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Pc().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new W().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new W().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Lc=new G,Rc=new G,zc=new G,Bc=new G,Vc=class{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Lc)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Lc.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Lc.copy(this.origin).addScaledVector(this.direction,t),Lc.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Rc.copy(e).add(t).multiplyScalar(.5),zc.copy(t).sub(e).normalize(),Bc.copy(this.origin).sub(Rc);let i=e.distanceTo(t)*.5,a=-this.direction.dot(zc),o=Bc.dot(this.direction),s=-Bc.dot(zc),c=Bc.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Rc).addScaledVector(zc,d),f}intersectSphere(e,t){if(e.radius<0)return null;Lc.subVectors(e.center,this.origin);let n=Lc.dot(this.direction),r=Lc.dot(Lc)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Lc)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let P=S/w,F=C/w,ee=1/w,te=T-P*D,ne=E-F*D,re=O-P*A,ie=k-F*A,ae=j-P*N,oe=M-F*N,se=ae*ie-oe*re,ce=te*oe-ne*ae,le=re*ne-ie*te;if(r){if(se<0||ce<0||le<0)return null}else if((se<0||ce<0||le<0)&&(se>0||ce>0||le>0))return null;let ue=se+ce+le;if(ue===0)return null;let de=ee*(se*D+ce*A+le*N);return(ue>0?de<0:de>0)?null:this.at(de/ue,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Hc=class extends Ic{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new J(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new us,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Uc=new q,Wc=new Vc,Gc=new Sc,Kc=new G,qc=new G,Jc=new G,Yc=new G,Xc=new G,Zc=new G,Qc=new G,$c=new G,X=class extends Ds{constructor(e=new Ac,t=new Hc){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Zc.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Xc.fromBufferAttribute(s,e),a?Zc.addScaledVector(Xc,r):Zc.addScaledVector(Xc.sub(t),r))}t.add(Zc)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Gc.copy(n.boundingSphere),Gc.applyMatrix4(i),Wc.copy(e.ray).recast(e.near),Gc.containsPoint(Wc.origin)===!1&&(Wc.intersectSphere(Gc,Kc)===null||Wc.origin.distanceToSquared(Kc)>(e.far-e.near)**2)||(Uc.copy(i).invert(),Wc.copy(e.ray).applyMatrix4(Uc),(n.boundingBox===null||Wc.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Wc)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=tl(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=tl(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=tl(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=tl(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function el(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;$c.copy(s),$c.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo($c);return l<n.near||l>n.far?null:{distance:l,point:$c.clone(),object:e}}function tl(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,qc),e.getVertexPosition(c,Jc),e.getVertexPosition(l,Yc);let u=el(e,t,n,r,qc,Jc,Yc,Qc);if(u){let e=new G;Zs.getBarycoord(Qc,qc,Jc,Yc,e),i&&(u.uv=Zs.getInterpolatedAttribute(i,s,c,l,e,new W)),a&&(u.uv1=Zs.getInterpolatedAttribute(a,s,c,l,e,new W)),o&&(u.normal=Zs.getInterpolatedAttribute(o,s,c,l,e,new G),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new G,materialIndex:0};Zs.getNormal(qc,Jc,Yc,t.normal),u.face=t,u.barycoord=e}return u}var nl=new Xo,rl=new Xo,il=new Xo,al=new Xo,ol=new q,sl=new G,cl=new Sc,ll=new q,ul=new Vc,dl=class extends X{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type=`SkinnedMesh`,this.bindMode=Mi,this.bindMatrix=new q,this.bindMatrixInverse=new q,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Qs),this.boundingBox.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,sl),this.boundingBox.expandByPoint(sl)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Sc),this.boundingSphere.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,sl),this.boundingSphere.expandByPoint(sl)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this.boundingBox=e.boundingBox===null?null:e.boundingBox.clone(),this.boundingSphere=e.boundingSphere===null?null:e.boundingSphere.clone(),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),cl.copy(this.boundingSphere),cl.applyMatrix4(r),e.ray.intersectsSphere(cl)!==!1&&(ll.copy(r).invert(),ul.copy(e.ray).applyMatrix4(ll),(this.boundingBox===null||ul.intersectsBox(this.boundingBox)!==!1)&&this._computeIntersections(e,t,ul)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Xo,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r===1/0?e.set(1,0,0,0):e.multiplyScalar(r),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===`attached`?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===`detached`?this.bindMatrixInverse.copy(this.bindMatrix).invert():H(`SkinnedMesh: Unrecognized bindMode: `+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;rl.fromBufferAttribute(r.attributes.skinIndex,e),il.fromBufferAttribute(r.attributes.skinWeight,e),t.isVector4?(nl.copy(t),t.set(0,0,0,0)):(nl.set(t.x,t.y,t.z,1),t.set(0,0,0)),nl.applyMatrix4(this.bindMatrix);for(let e=0;e<4;e++){let r=il.getComponent(e);if(r!==0){let i=rl.getComponent(e);ol.multiplyMatrices(n.bones[i].matrixWorld,n.boneInverses[i]),t.addScaledVector(al.copy(nl).applyMatrix4(ol),r)}}return t.isVector4&&(t.w=nl.w),t.applyMatrix4(this.bindMatrixInverse)}},fl=class extends Ds{constructor(){super(),this.isBone=!0,this.type=`Bone`}},pl=class extends Yo{constructor(e=null,t=1,n=1,r,i,a,o,s,c=Ii,l=Ii,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ml=new q,hl=new q,gl=class e{constructor(e=[],t=[]){this.uuid=wo(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.previousBoneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){H(`Skeleton: Number of inverse bone matrices does not match amount of bones.`),this.boneInverses=[];for(let e=0,t=this.bones.length;e<t;e++)this.boneInverses.push(new q)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let t=new q;this.bones[e]&&t.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(t)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&t.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&(t.parent&&t.parent.isBone?(t.matrix.copy(t.parent.matrixWorld).invert(),t.matrix.multiply(t.matrixWorld)):t.matrix.copy(t.matrixWorld),t.matrix.decompose(t.position,t.quaternion,t.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let r=0,i=e.length;r<i;r++){let i=e[r]?e[r].matrixWorld:hl;ml.multiplyMatrices(i,t[r]),ml.toArray(n,r*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new e(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new pl(t,e,e,ra,Ji);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null),this.previousBoneTexture!==null&&(this.previousBoneTexture.dispose(),this.previousBoneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let r=e.bones[n],i=t[r];i===void 0&&(H(`Skeleton: No bone found with UUID:`,r),i=new fl),this.bones.push(i),this.boneInverses.push(new q().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:`Skeleton`,generator:`Skeleton.toJSON`},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,i=t.length;r<i;r++){let i=t[r];e.bones.push(i.uuid);let a=n[r];e.boneInverses.push(a.toArray())}return e}},_l=class extends gc{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},vl=new q,yl=new q,bl=[],xl=new Qs,Sl=new q,Cl=new X,wl=new Sc,Tl=class extends X{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new _l(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Sl)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Qs),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,vl),xl.copy(e.boundingBox).applyMatrix4(vl),this.boundingBox.union(xl)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Sc),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,vl),wl.copy(e.boundingSphere).applyMatrix4(vl),this.boundingSphere.union(wl)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture===null?null:e.morphTexture.clone(),this.instanceColor=e.instanceColor===null?null:e.instanceColor.clone(),this.count=e.count,this.boundingBox=e.boundingBox===null?null:e.boundingBox.clone(),this.boundingSphere=e.boundingSphere===null?null:e.boundingSphere.clone(),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Cl.geometry=this.geometry,Cl.material=this.material,Cl.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wl.copy(this.boundingSphere),wl.applyMatrix4(n),e.ray.intersectsSphere(wl)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,vl),yl.multiplyMatrices(n,vl),Cl.matrixWorld=yl,Cl.raycast(e,bl);for(let e=0,n=bl.length;e<n;e++){let n=bl[e];n.instanceId=i,n.object=this,t.push(n)}bl.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new _l(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new pl(new Float32Array(r*this.count),r,this.count,oa,Ji));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},El=new Sc,Dl=new W(.5,.5),Ol=new G,kl=class{constructor(e=new Pc,t=new Pc,n=new Pc,r=new Pc,i=new Pc,a=new Pc){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=co,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),El.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),El.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(El)}intersectsSprite(e){return El.center.set(0,0,0),El.radius=.7071067811865476+Dl.distanceTo(e.center),El.applyMatrix4(e.matrixWorld),this.intersectsSphere(El)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Ol.x=r.normal.x>0?e.max.x:e.min.x,Ol.y=r.normal.y>0?e.max.y:e.min.y,Ol.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ol)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Al=new q,jl=class e{constructor(){this.coordinateSystem=co,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let e=0;e<t.length;e++){let r=t[e];Al.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[e]===void 0&&(n[e]=new kl),n[e].setFromProjectionMatrix(Al,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new kl),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new e().copy(this)}},Ml=class extends Ic{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new J(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Nl=new G,Pl=new G,Fl=new q,Il=new Vc,Ll=new Sc,Rl=new G,zl=new G,Bl=class extends Ds{constructor(e=new Ac,t=new Ml){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)Nl.fromBufferAttribute(t,e-1),Pl.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=Nl.distanceTo(Pl);e.setAttribute(`lineDistance`,new Y(n,1))}else H(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ll.copy(n.boundingSphere),Ll.applyMatrix4(r),Ll.radius+=i,e.ray.intersectsSphere(Ll)===!1)return;Fl.copy(r).invert(),Il.copy(e.ray).applyMatrix4(Fl);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=Vl(this,e,Il,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=Vl(this,e,Il,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=Vl(this,e,Il,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=Vl(this,e,Il,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Vl(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(Nl.fromBufferAttribute(s,i),Pl.fromBufferAttribute(s,a),n.distanceSqToSegment(Nl,Pl,Rl,zl)>r)return;Rl.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(Rl);if(!(c<t.near||c>t.far))return{distance:c,point:zl.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var Hl=new G,Ul=new G,Wl=class extends Bl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)Hl.fromBufferAttribute(t,e),Ul.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+Hl.distanceTo(Ul);e.setAttribute(`lineDistance`,new Y(n,1))}else H(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},Gl=class extends Ic{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new J(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Kl=new q,ql=new Vc,Jl=new Sc,Yl=new G,Xl=class extends Ds{constructor(e=new Ac,t=new Gl){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Jl.copy(n.boundingSphere),Jl.applyMatrix4(r),Jl.radius+=i,e.ray.intersectsSphere(Jl)===!1)return;Kl.copy(r).invert(),ql.copy(e.ray).applyMatrix4(Kl);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Yl.fromBufferAttribute(l,n),Zl(Yl,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Yl.fromBufferAttribute(l,a),Zl(Yl,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Zl(e,t,n,r,i,a,o){let s=ql.distanceSqToPoint(e);if(s<n){let n=new G;ql.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Ql=class extends Yo{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},$l=class extends Yo{constructor(e,t,n=qi,r,i,a,o=Ii,s=Ii,c,l=ia,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Go(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},eu=class extends $l{constructor(e,t=qi,n=301,r,i,a=Ii,o=Ii,s,c=ia){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},tu=class extends Yo{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},nu=class e extends Ac{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Y(c,3)),this.setAttribute(`normal`,new Y(l,3)),this.setAttribute(`uv`,new Y(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new G;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},ru=class e extends Ac{constructor(e=1,t=1,n=4,r=8,i=1){super(),this.type=`CapsuleGeometry`,this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:i},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),i=Math.max(1,Math.floor(i));let a=[],o=[],s=[],c=[],l=t/2,u=Math.PI/2*e,d=t,f=2*u+d,p=n*2+i,m=r+1,h=new G,g=new G;for(let _=0;_<=p;_++){let v=0,y=0,b=0,x=0;if(_<=n){let t=_/n,r=t*Math.PI/2;y=-l-e*Math.cos(r),b=e*Math.sin(r),x=-e*Math.cos(r),v=t*u}else if(_<=n+i){let r=(_-n)/i;y=-l+r*t,b=e,x=0,v=u+r*d}else{let t=(_-n-i)/n,r=t*Math.PI/2;y=l+e*Math.sin(r),b=e*Math.cos(r),x=e*Math.sin(r),v=u+d+t*u}let S=Math.max(0,Math.min(1,v/f)),C=0;_===0?C=.5/r:_===p&&(C=-.5/r);for(let e=0;e<=r;e++){let t=e/r,n=t*Math.PI*2,i=Math.sin(n),a=Math.cos(n);g.x=-b*a,g.y=y,g.z=b*i,o.push(g.x,g.y,g.z),h.set(-b*a,x,b*i),h.normalize(),s.push(h.x,h.y,h.z),c.push(t+C,S)}if(_>0){let e=(_-1)*m;for(let t=0;t<r;t++){let n=e+t,r=e+t+1,i=_*m+t,o=_*m+t+1;a.push(n,r,i),a.push(r,o,i)}}}this.setIndex(a),this.setAttribute(`position`,new Y(o,3)),this.setAttribute(`normal`,new Y(s,3)),this.setAttribute(`uv`,new Y(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},iu=class e extends Ac{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new G,l=new W;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new Y(a,3)),this.setAttribute(`normal`,new Y(o,3)),this.setAttribute(`uv`,new Y(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},au=class e extends Ac{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new Y(u,3)),this.setAttribute(`normal`,new Y(d,3)),this.setAttribute(`uv`,new Y(f,2));function _(){let a=new G,_=new G,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new W,m=new G,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ou=class e extends au{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},su=class e extends Ac{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new Y(i,3)),this.setAttribute(`normal`,new Y(i.slice(),3)),this.setAttribute(`uv`,new Y(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new G,r=new G,i=new G;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new G;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new G;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new G,t=new G,n=new G,r=new G,o=new W,s=new W,c=new W;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},cu=class e extends su{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},lu=class e extends Ac{constructor(e=[new W(0,-.5),new W(.5,0),new W(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=To(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new G,d=new W,f=new G,p=new G,m=new G,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:m.normalize(),s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new Y(a,3)),this.setAttribute(`uv`,new Y(o,2)),this.setAttribute(`normal`,new Y(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},uu=class e extends Ac{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Y(p,3)),this.setAttribute(`normal`,new Y(m,3)),this.setAttribute(`uv`,new Y(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},du=class e extends Ac{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new G,p=new W;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new Y(s,3)),this.setAttribute(`normal`,new Y(c,3)),this.setAttribute(`uv`,new Y(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},fu=class e extends Ac{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new G,d=new G,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new Y(p,3)),this.setAttribute(`normal`,new Y(m,3)),this.setAttribute(`uv`,new Y(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function pu(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(hu(i))i.isRenderTargetTexture?(H(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(hu(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function mu(e){let t={};for(let n=0;n<e.length;n++){let r=pu(e[n]);for(let e in r)t[e]=r[e]}return t}function hu(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function gu(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function _u(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:zo.workingColorSpace}var vu={clone:pu,merge:mu},yu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,xu=class extends Ic{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yu,this.fragmentShader=bu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=pu(e.uniforms),this.uniformsGroups=gu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new J().setHex(r.value);break;case`v2`:this.uniforms[n].value=new W().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new G().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Xo().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new K().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new q().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Su=class extends xu{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Cu=class extends Ic{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new J(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new J(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new W(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new us,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},wu=class extends Ic{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new J(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new J(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new W(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new us,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Tu=class extends Ic{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=eo,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Eu=class extends Ic{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Du(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Ou(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var ku=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Au=class extends ku{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Za,endingEnd:Za}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Qa:i=e,o=2*t-n;break;case $a:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Qa:a=e,s=2*n-t;break;case $a:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},ju=class extends ku{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Mu=class extends ku{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Nu=class extends ku{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Iu(n,t,g,y,r);i[p]=Pu(x,o,_,b,m)}return i}};function Pu(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Fu(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Iu(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Pu(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Fu(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var Lu=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Du(t,this.TimeBufferType),this.values=Du(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Du(e.times,Array),values:Du(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Ou(e.settings)&&(n.settings={inTangents:Du(e.settings.inTangents,Array),outTangents:Du(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Mu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ju(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Au(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Nu(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case qa:t=this.InterpolantFactoryMethodDiscrete;break;case Ja:t=this.InterpolantFactoryMethodLinear;break;case Ya:t=this.InterpolantFactoryMethodSmooth;break;case Xa:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return H(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return qa;case this.InterpolantFactoryMethodLinear:return Ja;case this.InterpolantFactoryMethodSmooth:return Ya;case this.InterpolantFactoryMethodBezier:return Xa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e;Ou(this.settings)&&(Ru(this.settings.inTangents,e),Ru(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Ou(this.settings)&&(zu(this.settings.inTangents,e),zu(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(U(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(U(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){U(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){U(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&uo(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){U(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Ya,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Ou(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Ru(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]+=t}function zu(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Lu.prototype.ValueTypeName=``,Lu.prototype.TimeBufferType=Float32Array,Lu.prototype.ValueBufferType=Float32Array,Lu.prototype.DefaultInterpolation=Ja;var Bu=class extends Lu{constructor(e,t,n){super(e,t,n)}};Bu.prototype.ValueTypeName=`bool`,Bu.prototype.ValueBufferType=Array,Bu.prototype.DefaultInterpolation=qa,Bu.prototype.InterpolantFactoryMethodLinear=void 0,Bu.prototype.InterpolantFactoryMethodSmooth=void 0;var Vu=class extends Lu{constructor(e,t,n,r){super(e,t,n,r)}};Vu.prototype.ValueTypeName=`color`;var Hu=class extends Lu{constructor(e,t,n,r){super(e,t,n,r)}};Hu.prototype.ValueTypeName=`number`;var Uu=class extends ku{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Mo.slerpFlat(i,0,a,c-o,a,c,s);return i}},Wu=class extends Lu{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Uu(this.times,this.values,this.getValueSize(),e)}};Wu.prototype.ValueTypeName=`quaternion`,Wu.prototype.InterpolantFactoryMethodSmooth=void 0;var Gu=class extends Lu{constructor(e,t,n){super(e,t,n)}};Gu.prototype.ValueTypeName=`string`,Gu.prototype.ValueBufferType=Array,Gu.prototype.DefaultInterpolation=qa,Gu.prototype.InterpolantFactoryMethodLinear=void 0,Gu.prototype.InterpolantFactoryMethodSmooth=void 0;var Ku=class extends Lu{constructor(e,t,n,r){super(e,t,n,r)}};Ku.prototype.ValueTypeName=`vector`;var qu={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(Ju(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!Ju(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function Ju(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var Yu=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},Xu=class{constructor(e){this.manager=e===void 0?Yu:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},this.priority=`auto`,this.cache=`default`,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};Xu.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var Zu=new WeakMap,Qu=class extends Xu{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=qu.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=Zu.get(a);e===void 0&&(e=[],Zu.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=fo(`img`);function s(){l(),t&&t(this);let n=Zu.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}Zu.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),qu.remove(`image:${e}`);let n=Zu.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}Zu.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),qu.add(`image:${e}`,o),i.manager.itemStart(e),o.fetchPriority=this.priority,o.src=e,o}},$u=class extends Xu{constructor(e){super(e)}load(e,t,n,r){let i=new Yo,a=new Qu(this.manager);return a.setPriority(this.priority),a.setCache(this.cache),a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},ed=class extends Ds{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new J(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},td=class extends ed{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Ds.DEFAULT_UP),this.updateMatrix(),this.groundColor=new J(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},nd=new q,rd=new G,id=new G,ad=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new W(512,512),this.mapType=Hi,this.map=null,this.mapPass=null,this.matrix=new q,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new kl,this._frameExtents=new W(1,1),this._viewportCount=1,this._viewports=[new Xo(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;rd.setFromMatrixPosition(e.matrixWorld),t.position.copy(rd),id.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(id),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){nd.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(nd,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(nd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},od=new G,sd=new Mo,cd=new G,ld=class extends Ds{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new q,this.projectionMatrix=new q,this.projectionMatrixInverse=new q,this.coordinateSystem=co,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(od,sd,cd),cd.x===1&&cd.y===1&&cd.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(od,sd,cd.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(od,sd,cd),cd.x===1&&cd.y===1&&cd.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(od,sd,cd.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ud=new G,dd=new W,fd=new W,pd=class extends ld{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Co*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(So*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Co*2*Math.atan(Math.tan(So*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ud.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ud.x,ud.y).multiplyScalar(-e/ud.z),ud.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ud.x,ud.y).multiplyScalar(-e/ud.z)}getViewSize(e,t){return this.getViewBounds(e,dd,fd),t.subVectors(fd,dd)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(So*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},md=class extends ld{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},hd=class extends ad{constructor(){super(new md(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},gd=class extends ed{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Ds.DEFAULT_UP),this.updateMatrix(),this.target=new Ds,this.shadow=new hd}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},_d=-90,vd=1,yd=class extends Ds{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new pd(_d,vd,e,t);r.layers=this.layers,this.add(r);let i=new pd(_d,vd,e,t);i.layers=this.layers,this.add(i);let a=new pd(_d,vd,e,t);a.layers=this.layers,this.add(a);let o=new pd(_d,vd,e,t);o.layers=this.layers,this.add(o);let s=new pd(_d,vd,e,t);s.layers=this.layers,this.add(s);let c=new pd(_d,vd,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},bd=class extends pd{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},xd=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Sd.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Sd(){this._document.hidden===!1&&this.reset()}var Cd=`\\[\\]\\.:\\/`,wd=RegExp(`[\\[\\]\\.:\\/]`,`g`),Td=`[^\\[\\]\\.:\\/]`,Ed=`[^`+Cd.replace(`\\.`,``)+`]`,Dd=`((?:WC+[\\/:])*)`.replace(`WC`,Td),Od=`(WCOD+)?`.replace(`WCOD`,Ed),kd=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Td),Ad=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Td),jd=RegExp(`^`+Dd+Od+kd+Ad+`$`),Md=[`material`,`materials`,`bones`,`map`],Nd=class{constructor(e,t,n){let r=n||Pd.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Pd=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(wd,``)}static parseTrackName(e){let t=jd.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Md.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){H(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){U(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){U(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){U(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){U(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){U(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){U(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){U(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;U(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Pd.Composite=Nd,Pd.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Pd.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Pd.prototype.GetterByBindingType=[Pd.prototype._getValue_direct,Pd.prototype._getValue_array,Pd.prototype._getValue_arrayElement,Pd.prototype._getValue_toArray],Pd.prototype.SetterByBindingTypeAndVersioning=[[Pd.prototype._setValue_direct,Pd.prototype._setValue_direct_setNeedsUpdate,Pd.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Pd.prototype._setValue_array,Pd.prototype._setValue_array_setNeedsUpdate,Pd.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Pd.prototype._setValue_arrayElement,Pd.prototype._setValue_arrayElement_setNeedsUpdate,Pd.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Pd.prototype._setValue_fromArray,Pd.prototype._setValue_fromArray_setNeedsUpdate,Pd.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],class{static{this.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}};function Fd(e,t,n,r){let i=Id(r);switch(n){case ta:return e*t;case oa:return e*t/i.components*i.byteLength;case sa:return e*t/i.components*i.byteLength;case ca:return e*t*2/i.components*i.byteLength;case la:return e*t*2/i.components*i.byteLength;case na:return e*t*3/i.components*i.byteLength;case ra:return e*t*4/i.components*i.byteLength;case ua:return e*t*4/i.components*i.byteLength;case da:case fa:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case pa:case ma:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ga:case va:return Math.max(e,16)*Math.max(t,8)/4;case ha:case _a:return Math.max(e,8)*Math.max(t,8)/2;case ya:case ba:case Sa:case Ca:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case xa:case wa:case Ta:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ea:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Da:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Oa:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case ka:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Aa:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case ja:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Ma:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Na:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Pa:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Fa:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Ia:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case La:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Ra:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case za:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Ba:case Va:case Ha:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ua:case Wa:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Ga:case Ka:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Id(e){switch(e){case Hi:case Ui:return{byteLength:1,components:1};case Gi:case Wi:case Yi:return{byteLength:2,components:1};case Xi:case Zi:return{byteLength:2,components:4};case qi:case Ki:case Ji:return{byteLength:4,components:1};case $i:case ea:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`187`}})),typeof window<`u`&&(window.__THREE__?H(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`187`);function Ld(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Rd(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Z={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Q={common:{diffuse:{value:new J(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new K},alphaMap:{value:null},alphaMapTransform:{value:new K},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new K}},envmap:{envMap:{value:null},envMapRotation:{value:new K},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new K}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new K}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new K},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new K},normalScale:{value:new W(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new K},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new K}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new K}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new K}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new J(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new J(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new K},alphaTest:{value:0},uvTransform:{value:new K}},sprite:{diffuse:{value:new J(16777215)},opacity:{value:1},center:{value:new W(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new K},alphaMap:{value:null},alphaMapTransform:{value:new K},alphaTest:{value:0}}},zd={basic:{uniforms:mu([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.fog]),vertexShader:Z.meshbasic_vert,fragmentShader:Z.meshbasic_frag},lambert:{uniforms:mu([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new J(0)},envMapIntensity:{value:1}}]),vertexShader:Z.meshlambert_vert,fragmentShader:Z.meshlambert_frag},phong:{uniforms:mu([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new J(0)},specular:{value:new J(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Z.meshphong_vert,fragmentShader:Z.meshphong_frag},standard:{uniforms:mu([Q.common,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.roughnessmap,Q.metalnessmap,Q.fog,Q.lights,{emissive:{value:new J(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Z.meshphysical_vert,fragmentShader:Z.meshphysical_frag},toon:{uniforms:mu([Q.common,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.gradientmap,Q.fog,Q.lights,{emissive:{value:new J(0)}}]),vertexShader:Z.meshtoon_vert,fragmentShader:Z.meshtoon_frag},matcap:{uniforms:mu([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,{matcap:{value:null}}]),vertexShader:Z.meshmatcap_vert,fragmentShader:Z.meshmatcap_frag},points:{uniforms:mu([Q.points,Q.fog]),vertexShader:Z.points_vert,fragmentShader:Z.points_frag},dashed:{uniforms:mu([Q.common,Q.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Z.linedashed_vert,fragmentShader:Z.linedashed_frag},depth:{uniforms:mu([Q.common,Q.displacementmap]),vertexShader:Z.depth_vert,fragmentShader:Z.depth_frag},normal:{uniforms:mu([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,{opacity:{value:1}}]),vertexShader:Z.meshnormal_vert,fragmentShader:Z.meshnormal_frag},sprite:{uniforms:mu([Q.sprite,Q.fog]),vertexShader:Z.sprite_vert,fragmentShader:Z.sprite_frag},background:{uniforms:{uvTransform:{value:new K},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Z.background_vert,fragmentShader:Z.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new K}},vertexShader:Z.backgroundCube_vert,fragmentShader:Z.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Z.cube_vert,fragmentShader:Z.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Z.equirect_vert,fragmentShader:Z.equirect_frag},distance:{uniforms:mu([Q.common,Q.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Z.distance_vert,fragmentShader:Z.distance_frag},shadow:{uniforms:mu([Q.lights,Q.fog,{color:{value:new J(0)},opacity:{value:1}}]),vertexShader:Z.shadow_vert,fragmentShader:Z.shadow_frag}};zd.physical={uniforms:mu([zd.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new K},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new K},clearcoatNormalScale:{value:new W(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new K},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new K},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new K},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new K},sheen:{value:0},sheenColor:{value:new J(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new K},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new K},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new K},transmissionSamplerSize:{value:new W},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new K},attenuationDistance:{value:0},attenuationColor:{value:new J(0)},specularColor:{value:new J(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new K},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new K},anisotropyVector:{value:new W},anisotropyMap:{value:null},anisotropyMapTransform:{value:new K}}]),vertexShader:Z.meshphysical_vert,fragmentShader:Z.meshphysical_frag};var Bd={r:0,b:0,g:0},Vd=new q,Hd=new K;Hd.set(-1,0,0,0,1,0,0,0,1);function Ud(e,t,n,r,i,a){let o=new J(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&i.isCubeTexture?(l===void 0&&(l=new X(new nu(1,1,1),new xu({name:`BackgroundCubeMaterial`,uniforms:pu(zd.backgroundCube.uniforms),vertexShader:zd.backgroundCube.vertexShader,fragmentShader:zd.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Vd.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Hd),l.material.toneMapped=zo.getTransfer(i.colorSpace)!==io,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new X(new uu(2,2),new xu({name:`BackgroundMaterial`,uniforms:pu(zd.background.uniforms),vertexShader:zd.background.vertexShader,fragmentShader:zd.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=zo.getTransfer(i.colorSpace)!==io,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Bd,_u(e)),n.buffers.color.setClear(Bd.r,Bd.g,Bd.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Wd(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Gd(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Kd(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(H(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),f=n.logarithmicDepthBuffer===!0&&d===!1;n.reversedDepthBuffer===!0&&d===!1&&H(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&d===!0&&H(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function qd(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Pc,s=new K,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Jd=class extends Qo{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ql(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new nu(5,5,5),i=new xu({name:`CubemapFromEquirect`,uniforms:pu(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new X(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=zi),new yd(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},Yd=256,Xd=3,Zd=20,Qd=256,$d=16,ef=3,tf=new G,nf=new J,rf=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new yd(1,10,null),this._boxMesh=new X(new nu(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=tf}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(nf));let h=new yd(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=df(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Yd,Oo(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?Yd:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=af(e,!1,!1),n=Math.log2(e)-Xd;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=af(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=df()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=uf()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=sf(),this._integrationMaterial=cf());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/$d);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-ef)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(Qd*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=lf());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function af(e,t,n){return new Jd(e,{minFilter:Vi,generateMipmaps:t,type:Yi,colorSpace:no,depthBuffer:n})}function of(e,t,n){return new xu({name:e,uniforms:t,vertexShader:Z.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function sf(){return of(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Qd}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function cf(){return of(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:$d}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function lf(){return of(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Zd}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function uf(){return of(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function df(){return of(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function ff(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Jd(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new rf(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new rf(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function pf(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&_o(`WebGLRenderer: `+e+` extension not supported.`),t}}}function mf(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?vc:_c)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function hf(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function gf(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:U(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function _f(e,t,n){let r=new WeakMap,i=new Xo;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new $o(h,p,m,u);g.type=Ji,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new W(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function vf(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var yf={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function bf(e,t,n,r,i,a){let o=new Qo(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=null,u=new Ac;u.setAttribute(`position`,new Y([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute(`uv`,new Y([0,2,0,0,2,0],2));let d=new Su({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new X(u,d),p=new md(-1,1,1,-1,0,1),m=null,h=null,g=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new Qo(t,n,{type:Yi,depthBuffer:!1,stencilBuffer:!1}),c=new Qo(t,n,{type:Yi,depthBuffer:!1,stencilBuffer:!1}));let r=i===!0&&y.some(e=>e.needsDepthTexture===!0);r!==(o.depthTexture!==null)&&(r===!0&&l===null&&(l=new $l(t,n),a===!0&&(l.format=aa,l.type=Qi)),o.dispose(),o.depthTexture=r?l:null,o.resolveDepthBuffer=r,o.storeMultisampledDepthBuffer=r);for(let e=0;e<y.length;e++){let i=y[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(l)}},this.begin=function(e,t){if(g||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,g=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(m!==e.outputColorSpace||h!==e.toneMapping){m=e.outputColorSpace,h=e.toneMapping,d.defines={},zo.getTransfer(m)===`srgb`&&(d.defines.SRGB_TRANSFER=``);let t=yf[h];t&&(d.defines[t]=``),d.needsUpdate=!0}d.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(f,p),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}var xf=new Yo,Sf=new $l(1,1),Cf=new eu(1),wf=new $o,Tf=new es,Ef=new Ql,Df=[],Of=[],kf=new Float32Array(16),Af=new Float32Array(9),jf=new Float32Array(4);function Mf(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Df[i];if(a===void 0&&(a=new Float32Array(i),Df[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Nf(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Pf(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Ff(e,t){let n=Of[t];n===void 0&&(n=new Int32Array(t),Of[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function If(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Lf(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Nf(n,t))return;e.uniform2fv(this.addr,t),Pf(n,t)}}function Rf(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Nf(n,t))return;e.uniform3fv(this.addr,t),Pf(n,t)}}function zf(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Nf(n,t))return;e.uniform4fv(this.addr,t),Pf(n,t)}}function Bf(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Nf(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Pf(n,t)}else{if(Nf(n,r))return;jf.set(r),e.uniformMatrix2fv(this.addr,!1,jf),Pf(n,r)}}function Vf(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Nf(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Pf(n,t)}else{if(Nf(n,r))return;Af.set(r),e.uniformMatrix3fv(this.addr,!1,Af),Pf(n,r)}}function Hf(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Nf(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Pf(n,t)}else{if(Nf(n,r))return;kf.set(r),e.uniformMatrix4fv(this.addr,!1,kf),Pf(n,r)}}function Uf(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Wf(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Nf(n,t))return;e.uniform2iv(this.addr,t),Pf(n,t)}}function Gf(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Nf(n,t))return;e.uniform3iv(this.addr,t),Pf(n,t)}}function Kf(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Nf(n,t))return;e.uniform4iv(this.addr,t),Pf(n,t)}}function qf(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Jf(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Nf(n,t))return;e.uniform2uiv(this.addr,t),Pf(n,t)}}function Yf(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Nf(n,t))return;e.uniform3uiv(this.addr,t),Pf(n,t)}}function Xf(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Nf(n,t))return;e.uniform4uiv(this.addr,t),Pf(n,t)}}function Zf(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function Qf(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?Zf(Sf):xf,n.setTexture2D(t||a,i)}function $f(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Tf,i)}function ep(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?Zf(Cf):Ef,n.setTextureCube(t||a,i)}function tp(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||wf,i)}function np(e){switch(e){case 5126:return If;case 35664:return Lf;case 35665:return Rf;case 35666:return zf;case 35674:return Bf;case 35675:return Vf;case 35676:return Hf;case 5124:case 35670:return Uf;case 35667:case 35671:return Wf;case 35668:case 35672:return Gf;case 35669:case 35673:return Kf;case 5125:return qf;case 36294:return Jf;case 36295:return Yf;case 36296:return Xf;case 35678:case 36198:case 36298:case 36306:case 35682:return Qf;case 35679:case 36299:case 36307:return $f;case 35680:case 36300:case 36308:case 36293:return ep;case 36289:case 36303:case 36311:case 36292:return tp}}function rp(e,t){e.uniform1fv(this.addr,t)}function ip(e,t){let n=Mf(t,this.size,2);e.uniform2fv(this.addr,n)}function ap(e,t){let n=Mf(t,this.size,3);e.uniform3fv(this.addr,n)}function op(e,t){let n=Mf(t,this.size,4);e.uniform4fv(this.addr,n)}function sp(e,t){let n=Mf(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function cp(e,t){let n=Mf(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function lp(e,t){let n=Mf(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function up(e,t){e.uniform1iv(this.addr,t)}function dp(e,t){e.uniform2iv(this.addr,t)}function fp(e,t){e.uniform3iv(this.addr,t)}function pp(e,t){e.uniform4iv(this.addr,t)}function mp(e,t){e.uniform1uiv(this.addr,t)}function hp(e,t){e.uniform2uiv(this.addr,t)}function gp(e,t){e.uniform3uiv(this.addr,t)}function _p(e,t){e.uniform4uiv(this.addr,t)}function vp(e,t,n){let r=this.cache,i=t.length,a=Ff(n,i);Nf(r,a)||(e.uniform1iv(this.addr,a),Pf(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Zf(Sf):xf;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function yp(e,t,n){let r=this.cache,i=t.length,a=Ff(n,i);Nf(r,a)||(e.uniform1iv(this.addr,a),Pf(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Tf,a[e])}function bp(e,t,n){let r=this.cache,i=t.length,a=Ff(n,i);Nf(r,a)||(e.uniform1iv(this.addr,a),Pf(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?Zf(Cf):Ef;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function xp(e,t,n){let r=this.cache,i=t.length,a=Ff(n,i);Nf(r,a)||(e.uniform1iv(this.addr,a),Pf(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||wf,a[e])}function Sp(e){switch(e){case 5126:return rp;case 35664:return ip;case 35665:return ap;case 35666:return op;case 35674:return sp;case 35675:return cp;case 35676:return lp;case 5124:case 35670:return up;case 35667:case 35671:return dp;case 35668:case 35672:return fp;case 35669:case 35673:return pp;case 5125:return mp;case 36294:return hp;case 36295:return gp;case 36296:return _p;case 35678:case 36198:case 36298:case 36306:case 35682:return vp;case 35679:case 36299:case 36307:return yp;case 35680:case 36300:case 36308:case 36293:return bp;case 36289:case 36303:case 36311:case 36292:return xp}}var Cp=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=np(t.type)}},wp=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Sp(t.type)}},Tp=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Ep=/(\w+)(\])?(\[|\.)?/g;function Dp(e,t){e.seq.push(t),e.map[t.id]=t}function Op(e,t,n){let r=e.name,i=r.length;for(Ep.lastIndex=0;;){let a=Ep.exec(r),o=Ep.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Dp(n,l===void 0?new Cp(s,e,t):new wp(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Tp(s),Dp(n,e)),n=e}}}var kp=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Op(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Ap(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var jp=37297,Mp=0;function Np(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Pp=new K;function Fp(e){zo._getMatrix(Pp,zo.workingColorSpace,e);let t=`mat3( ${Pp.elements.map(e=>e.toFixed(4))} )`;switch(zo.getTransfer(e)){case ro:return[t,`LinearTransferOETF`];case io:return[t,`sRGBTransferOETF`];default:return H(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Ip(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Np(e.getShaderSource(t),r)}return i}function Lp(e,t){let n=Fp(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var Rp={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function zp(e,t){let n=Rp[t];return n===void 0?(H(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Bp=new G;function Vp(){return zo.getLuminanceCoefficients(Bp),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Bp.x.toFixed(4)}, ${Bp.y.toFixed(4)}, ${Bp.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Hp(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Gp).join(`
`)}function Up(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Wp(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Gp(e){return e!==``}function Kp(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function qp(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Jp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yp(e){return e.replace(Jp,Xp)}function Xp(e,t){let n=Z[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return Yp(n)}var Zp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qp(e){return e.replace(Zp,$p)}function $p(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function em(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var tm={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function nm(e){return tm[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var rm={302:`ENVMAP_MODE_REFRACTION`};function im(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:rm[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var am={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function om(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:am[e.combine]||`ENVMAP_BLENDING_NONE`}function sm(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=nm(n),l=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,u=im(n),d=om(n),f=Hp(n),p=Up(a),m=i.createProgram(),h,g,_=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(h=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(Gp).join(`
`),h.length>0&&(h+=`
`),g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(Gp).join(`
`),g.length>0&&(g+=`
`)):(h=[em(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Gp).join(`
`),g=[em(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Z.tonemapping_pars_fragment,n.toneMapping===0?``:zp(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Z.colorspace_pars_fragment,Lp(`linearToOutputTexel`,n.outputColorSpace),Vp(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Gp).join(`
`)),o=Yp(o),o=Kp(o,n),o=qp(o,n),s=Yp(s),s=Kp(s,n),s=qp(s,n),o=Qp(o),s=Qp(s),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,h=[f,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+h,g=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+g);let v=_+h+o,y=_+g+s,b=Ap(i,i.VERTEX_SHADER,v),x=Ap(i,i.FRAGMENT_SHADER,y);i.attachShader(m,b),i.attachShader(m,x),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,`position`):i.bindAttribLocation(m,0,n.index0AttributeName),i.linkProgram(m);function S(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(m)||``,r=i.getShaderInfoLog(b)||``,a=i.getShaderInfoLog(x)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,m,b,x);else{let e=Ip(i,b,`vertex`),n=Ip(i,x,`fragment`);U(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):H(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:h},fragmentShader:{log:c,prefix:g}})}i.deleteShader(b),i.deleteShader(x),C=new kp(i,m),w=Wp(i,m)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(m,jp)),T},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Mp++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=x,this}var cm=0,lm=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new um(e),t.set(e,n)),n}},um=class{constructor(e){this.id=cm++,this.code=e,this.usedTimes=0}};function dm(e){return e===1030||e===37490||e===36285}function fm(e,t,n,r,i,a){let o=new ds,s=new lm,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function p(e){return c.add(e),e===0?`uv`:`uv${e}`}function m(i,o,l,u,m,h){let g=u.fog,_=m.geometry,v=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,b=t.get(i.envMap||v,y),x=f[i.type],S=r.precision;i.precision!==null&&(S=r.getMaxPrecision(i.precision),S!==i.precision&&H(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,S,`instead.`));let C=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,w=C===void 0?0:C.length,T=0;_.morphAttributes.position!==void 0&&(T=1),_.morphAttributes.normal!==void 0&&(T=2),_.morphAttributes.color!==void 0&&(T=3);let E,D,O,k;if(x){let e=zd[x];E=e.vertexShader,D=e.fragmentShader}else{E=i.vertexShader,D=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),O=e.id,k=t.id}let A=e.getRenderTarget(),j=e.state.buffers.depth.getReversed(),M=m.isInstancedMesh===!0,N=m.isBatchedMesh===!0,P=!!i.map,F=!!i.matcap,ee=!!b,te=ee&&b.isPMREMTexture===!0,ne=!!i.aoMap,re=!!i.lightMap,ie=!!i.bumpMap&&i.wireframe===!1,ae=!!i.normalMap,oe=!!i.displacementMap,se=!!i.emissiveMap,ce=!!i.metalnessMap,le=!!i.roughnessMap,ue=i.anisotropy>0,de=i.clearcoat>0,fe=i.diffuseRoughness>0,pe=i.dispersion>0,me=i.retroreflectivity>0,he=i.iridescence>0,ge=i.sheen>0,_e=i.transmission>0,ve=ue&&!!i.anisotropyMap,ye=de&&!!i.clearcoatMap,be=de&&!!i.clearcoatNormalMap,xe=de&&!!i.clearcoatRoughnessMap,Se=fe&&!!i.diffuseRoughnessMap,I=he&&!!i.iridescenceMap,Ce=he&&!!i.iridescenceThicknessMap,we=ge&&!!i.sheenColorMap,Te=ge&&!!i.sheenRoughnessMap,L=!!i.specularMap,Ee=!!i.specularColorMap,R=!!i.specularIntensityMap,z=_e&&!!i.transmissionMap,De=_e&&!!i.thicknessMap,Oe=!!i.gradientMap,ke=!!i.alphaMap,Ae=i.alphaTest>0,je=!!i.alphaHash,Me=!!i.extensions,Ne=0;i.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Ne=e.toneMapping);let Pe=te?b.isCompressedCubeTexture?b.image[0].mipmaps:b.mipmaps:null,Fe={shaderID:x,shaderType:i.type,shaderName:i.name,vertexShader:E,fragmentShader:D,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:S,batching:N,batchingColor:N&&m._colorsTexture!==null,instancing:M,instancingColor:M&&m.instanceColor!==null,instancingMorph:M&&m.morphTexture!==null,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:zo.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:P,matcap:F,envMap:ee,envMapMode:ee&&b.mapping,envMapPMREM:te,envMapMaxLod:te?Pe.length-1:null,envMapSize:te?Pe[0].width:null,aoMap:ne,lightMap:re,bumpMap:ie,normalMap:ae,displacementMap:oe,emissiveMap:se,normalMapObjectSpace:ae&&i.normalMapType===1,normalMapTangentSpace:ae&&i.normalMapType===0,packedNormalMap:ae&&i.normalMapType===0&&dm(i.normalMap.format),metalnessMap:ce,roughnessMap:le,anisotropy:ue,anisotropyMap:ve,clearcoat:de,clearcoatMap:ye,clearcoatNormalMap:be,clearcoatRoughnessMap:xe,diffuseRoughness:fe,diffuseRoughnessMap:Se,dispersion:pe,retroreflection:me,iridescence:he,iridescenceMap:I,iridescenceThicknessMap:Ce,sheen:ge,sheenColorMap:we,sheenRoughnessMap:Te,specularMap:L,specularColorMap:Ee,specularIntensityMap:R,transmission:_e,transmissionMap:z,thicknessMap:De,gradientMap:Oe,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:ke,alphaTest:Ae,alphaHash:je,combine:i.combine,mapUv:P&&p(i.map.channel),aoMapUv:ne&&p(i.aoMap.channel),lightMapUv:re&&p(i.lightMap.channel),bumpMapUv:ie&&p(i.bumpMap.channel),normalMapUv:ae&&p(i.normalMap.channel),displacementMapUv:oe&&p(i.displacementMap.channel),emissiveMapUv:se&&p(i.emissiveMap.channel),metalnessMapUv:ce&&p(i.metalnessMap.channel),roughnessMapUv:le&&p(i.roughnessMap.channel),anisotropyMapUv:ve&&p(i.anisotropyMap.channel),clearcoatMapUv:ye&&p(i.clearcoatMap.channel),clearcoatNormalMapUv:be&&p(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&p(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:Se&&p(i.diffuseRoughnessMap.channel),iridescenceMapUv:I&&p(i.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&p(i.iridescenceThicknessMap.channel),sheenColorMapUv:we&&p(i.sheenColorMap.channel),sheenRoughnessMapUv:Te&&p(i.sheenRoughnessMap.channel),specularMapUv:L&&p(i.specularMap.channel),specularColorMapUv:Ee&&p(i.specularColorMap.channel),specularIntensityMapUv:R&&p(i.specularIntensityMap.channel),transmissionMapUv:z&&p(i.transmissionMap.channel),thicknessMapUv:De&&p(i.thicknessMap.channel),alphaMapUv:ke&&p(i.alphaMap.channel),vertexTangents:!!_.attributes.tangent&&(ae||ue),vertexNormals:!!_.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!_.attributes.color&&_.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!_.attributes.uv&&(P||ke),fog:!!g,useFog:i.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||_.attributes.normal===void 0&&ae===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:j,skinning:m.isSkinnedMesh===!0,hasPositionAttribute:_.attributes.position!==void 0,morphTargets:_.morphAttributes.position!==void 0,morphNormals:_.morphAttributes.normal!==void 0,morphColors:_.morphAttributes.color!==void 0,morphTargetsCount:w,morphTextureStride:T,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:h.filter(e=>e.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ne,decodeVideoTexture:P&&i.map.isVideoTexture===!0&&zo.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:se&&i.emissiveMap.isVideoTexture===!0&&zo.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Me&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Me&&i.extensions.multiDraw===!0||N)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Fe.vertexUv1s=c.has(1),Fe.vertexUv2s=c.has(2),Fe.vertexUv3s=c.has(3),c.clear(),Fe}function h(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(g(n,t),_(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function g(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function _(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.diffuseRoughness&&o.enable(25),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function v(e){let t=f[e.type],n;if(t){let e=zd[t];n=vu.clone(e.uniforms)}else n=e.uniforms;return n}function y(t,n){let r=u.get(n);return r===void 0?(r=new sm(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function b(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function x(e){s.remove(e)}function S(){s.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:v,acquireProgram:y,releaseProgram:b,releaseShaderCache:x,programs:l,dispose:S}}function pm(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function mm(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function hm(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function gm(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||mm),r.length>1&&r.sort(t||hm),i.length>1&&i.sort(t||hm)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function _m(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new gm,e.set(t,[i])):n>=r.length?(i=new gm,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function vm(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new G,color:new J};break;case`SpotLight`:n={position:new G,direction:new G,color:new J,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new G,color:new J,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new G,skyColor:new J,groundColor:new J};break;case`RectAreaLight`:n={color:new J,position:new G,halfWidth:new G,halfHeight:new G}}return e[t.id]=n,n}}}function ym(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var bm=0;function xm(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Sm(e){let t=new vm,n=ym(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new G);let i=new G,a=new q,o=new q;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(xm);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Q.LTC_FLOAT_1,r.rectAreaLTC2=Q.LTC_FLOAT_2):(r.rectAreaLTC1=Q.LTC_HALF_1,r.rectAreaLTC2=Q.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=bm++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Cm(e){let t=new Sm(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function wm(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Cm(e),t.set(n,[a])):r>=i.length?(a=new Cm(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Tm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Em=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Dm=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],Om=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],km=new q,Am=new G,jm=new G;function Mm(e,t,n){let r=new kl,i=new W,a=new W,o=new Xo,s=new Tu,c=new Eu,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new xu({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new W},radius:{value:4}},vertexShader:Tm,fragmentShader:Em}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Ac;m.setAttribute(`position`,new gc(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new X(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(H(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){H(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){H(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Qo(i.x,i.y,{format:ca,type:Yi,minFilter:zi,magFilter:zi,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new $l(i.x,i.y,Ji),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=ia,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Ii,d.map.depthTexture.magFilter=Ii}else l.isPointLight?(d.map=new Jd(i.x),d.map.depthTexture=new eu(i.x,qi)):(d.map=new Qo(i.x,i.y),d.map.depthTexture=new $l(i.x,i.y,qi)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=ia,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=zi,d.map.depthTexture.magFilter=zi):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Ii,d.map.depthTexture.magFilter=Ii);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);let _=d.camera.layers.mask&4294967294?d.camera.layers:s.layers;for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Am.setFromMatrixPosition(l.matrixWorld),e.position.copy(Am),jm.copy(e.position),jm.add(Dm[t]),e.up.copy(Om[t]),e.lookAt(jm),e.updateMatrixWorld(),n.makeTranslation(-Am.x,-Am.y,-Am.z),km.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(km,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,_,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new Qo(i.x,i.y,{format:ca,type:Yi}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),s=n.material;if(Array.isArray(s)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,c);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(s.visible){let t=y(n,s,o,c);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)b(l[e],i,a,o,s,c)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Nm(e,t){function n(){let t=!1,n=new Xo,r=null,i=new Xo(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?ce(e.DEPTH_TEST):le(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=yo[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?ce(e.STENCIL_TEST):le(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,F=e.getParameter(e.VERSION);F.indexOf(`WebGL`)===-1?F.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=P>=1);let ee=null,te={},ne=e.getParameter(e.SCISSOR_BOX),re=e.getParameter(e.VIEWPORT),ie=new Xo().fromArray(ne),ae=new Xo().fromArray(re);function oe(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let se={};se[e.TEXTURE_2D]=oe(e.TEXTURE_2D,e.TEXTURE_2D,1),se[e.TEXTURE_CUBE_MAP]=oe(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[e.TEXTURE_2D_ARRAY]=oe(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),se[e.TEXTURE_3D]=oe(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ce(e.DEPTH_TEST),o.setFunc(3),_e(!1),ve(1),ce(e.CULL_FACE),he(0);function ce(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function le(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ue(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function de(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function fe(t){return h!==t&&(e.useProgram(t),h=t,!0)}let pe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};pe[103]=e.MIN,pe[104]=e.MAX;let me={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function he(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(le(e.BLEND),g=!1);else if(g===!1&&(ce(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:U(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:U(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:U(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:U(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(pe[n],pe[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(me[r],me[i],me[o],me[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function ge(t,n){t.side===2?le(e.CULL_FACE):ce(e.CULL_FACE);let r=t.side===1;n&&(r=!r),_e(r),t.blending===1&&t.transparent===!1?he(0):he(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),be(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?ce(e.SAMPLE_ALPHA_TO_COVERAGE):le(e.SAMPLE_ALPHA_TO_COVERAGE)}function _e(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ve(t){t===0?le(e.CULL_FACE):(ce(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function ye(t){t!==k&&(N&&e.lineWidth(t),k=t)}function be(t,n,r){t?(ce(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):le(e.POLYGON_OFFSET_FILL)}function xe(t){t?ce(e.SCISSOR_TEST):le(e.SCISSOR_TEST)}function Se(t){t===void 0&&(t=e.TEXTURE0+M-1),ee!==t&&(e.activeTexture(t),ee=t)}function I(t,n,r){r===void 0&&(r=ee===null?e.TEXTURE0+M-1:ee);let i=te[r];i===void 0&&(i={type:void 0,texture:void 0},te[r]=i),(i.type!==t||i.texture!==n)&&(ee!==r&&(e.activeTexture(r),ee=r),e.bindTexture(t,n||se[t]),i.type=t,i.texture=n)}function Ce(){let t=te[ee];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function we(){try{e.compressedTexImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Te(){try{e.compressedTexImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function L(){try{e.texSubImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ee(){try{e.texSubImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function R(){try{e.compressedTexSubImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function z(){try{e.compressedTexSubImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function De(){try{e.texStorage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Oe(){try{e.texStorage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function ke(){try{e.texImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ae(){try{e.texImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function je(t){return d[t]===void 0?e.getParameter(t):d[t]}function Me(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Ne(t){ie.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ie.copy(t))}function Pe(t){ae.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ae.copy(t))}function Fe(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function Ie(t,n,r){let i=l.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function Le(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},ee=null,te={},f={},c={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ie.set(0,0,e.canvas.width,e.canvas.height),ae.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:ce,disable:le,bindFramebuffer:ue,drawBuffers:de,useProgram:fe,setBlending:he,setMaterial:ge,setFlipSided:_e,setCullFace:ve,setLineWidth:ye,setPolygonOffset:be,setScissorTest:xe,activeTexture:Se,bindTexture:I,unbindTexture:Ce,compressedTexImage2D:we,compressedTexImage3D:Te,texImage2D:ke,texImage3D:Ae,pixelStorei:Me,getParameter:je,updateUBOMapping:Fe,uniformBlockBinding:Ie,texStorage2D:De,texStorage3D:Oe,texSubImage2D:L,texSubImage3D:Ee,compressedTexSubImage2D:R,compressedTexSubImage3D:z,scissor:Ne,viewport:Pe,reset:Le}}function Pm(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new W,u=new WeakMap,d=new Set,f,p=new WeakMap,m=new Set,h=new FinalizationRegistry(e=>m.delete(e)),g=!1;try{g=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function _(e,t){return g?new OffscreenCanvas(e,t):fo(`canvas`)}function v(e,t,n){let r=1,i=De(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=_(n,a));let o=t?_(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),H(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&H(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function y(e){return e.generateMipmaps}function b(t){e.generateMipmap(t)}function x(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function S(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];H(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||H(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?ro:zo.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function C(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,H(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function w(e,t){return y(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function T(e){let t=new WeakRef(e);r.get(e).__ref=t,m.add(t),h.register(e,t,t)}function E(e){let t=r.get(e).__ref;t!==void 0&&(m.delete(t),h.unregister(t))}function D(e){k(e.target)}function O(e){A(e.target)}function k(e){e.removeEventListener(`dispose`,D),E(e),M(e),e.isVideoTexture&&u.delete(e),e.isHTMLTexture&&d.delete(e)}function A(e){e.removeEventListener(`dispose`,O),E(e),P(e)}function j(){for(let e of m){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?A(t):k(t))}m.clear(),d.clear()}function M(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&N(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function N(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function P(t){let n=r.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let i=t.depthTexture;if(i&&i.renderTarget===t&&k(i),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,n=a.length;t<n;t++){let n=r.get(a[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(a[t])}r.remove(t)}let F=0;function ee(){F=0}function te(){return F}function ne(e){F=e}function re(){let e=F;return e>=i.maxTextures&&H(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),F+=1,e}function ie(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ae(t,i){let a=r.get(t);if(t.isVideoTexture&&R(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)H(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)H(`WebGLRenderer: Texture marked for update but image is incomplete`);else{ge(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function oe(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?ge(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function se(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?ge(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ce(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?_e(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let le={[Ni]:e.REPEAT,[Pi]:e.CLAMP_TO_EDGE,[Fi]:e.MIRRORED_REPEAT},ue={[Ii]:e.NEAREST,[Li]:e.NEAREST_MIPMAP_NEAREST,[Ri]:e.NEAREST_MIPMAP_LINEAR,[zi]:e.LINEAR,[Bi]:e.LINEAR_MIPMAP_NEAREST,[Vi]:e.LINEAR_MIPMAP_LINEAR},de={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function fe(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&H(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,le[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,le[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,le[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ue[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ue[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,de[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function pe(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,D),T(n));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=ie(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&N(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function me(e,t,n){return Math.floor(Math.floor(e/n)/t)}function he(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=me(n.start,r.width,4),c=me(t.start,r.width,4);n.start<=i+1&&a===c&&me(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function ge(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=pe(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=zo.getPrimaries(zo.workingColorSpace),r=o.colorSpace===``?null:zo.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=v(o.image,!1,i.maxTextureSize);t=z(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=S(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);fe(c,o);let h,g=o.mipmaps,_=o.isVideoTexture!==!0,x=f.__version===void 0||l===!0,T=u.dataReady,E=w(o,t);if(o.isDepthTexture)m=C(o.format===aa,o.type),x&&(_?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(g.length>0){_&&x&&n.texStorage2D(e.TEXTURE_2D,E,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else _?(x&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&he(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){_&&x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,g[0].width,g[0].height,t.depth);for(let i=0,a=g.length;i<a;i++)if(h=g[i],o.format!==1023){if(r!==null){if(_){if(T){if(o.layerUpdates.size>0){let t=Fd(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else _?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{_&&x&&n.texStorage2D(e.TEXTURE_2D,E,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],o.format===1023?_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):_?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(_){if(x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=Fd(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)_?(x&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(x){if(_)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(g.length>0){if(_&&x){let t=De(g[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=g.length;t<i;t++)h=g[t],_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(_){if(x){let r=De(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);y(o)&&o.mipmapsAutoUpdate===!0&&b(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function _e(t,o,s){if(o.image.length!==6)return;let c=pe(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=zo.getPrimaries(zo.workingColorSpace),r=o.colorSpace===``?null:zo.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=v(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=z(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),_=a.convert(o.type),x=S(o.internalFormat,g,_,o.normalized,o.colorSpace),T=o.isVideoTexture!==!0,E=u.__version===void 0||c===!0,D=l.dataReady,O=w(o,h);fe(e.TEXTURE_CUBE_MAP,o);let k;if(o.isDepthTexture){if(x=C(o.format===aa,o.type),E){if(T)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,x,h.width,h.height);else for(let t=0;t<6;t++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,h.width,h.height,0,g,_,null)}}else if(f){T&&E&&n.texStorage2D(e.TEXTURE_CUBE_MAP,O,x,h.width,h.height);for(let t=0;t<6;t++){k=m[t].mipmaps;for(let r=0;r<k.length;r++){let i=k[r];o.format===1023?T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,g,_,i.data):g===null?H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):T?D&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,i.data)}}}else{if(k=o.mipmaps,T&&E){k.length>0&&O++;let t=De(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,O,x,t.width,t.height)}for(let t=0;t<6;t++)if(p){T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,m[t].width,m[t].height,0,g,_,m[t].data);for(let r=0;r<k.length;r++){let i=k[r].image[t].image;T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,i.width,i.height,0,g,_,i.data)}}else{T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,g,_,m[t]);for(let r=0;r<k.length;r++){let i=k[r];T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,g,_,i.image[t])}}}y(o)&&o.mipmapsAutoUpdate===!0&&b(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ve(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=S(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Ee(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,L(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function ye(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=C(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Ee(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,L(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,L(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=S(o.internalFormat,c,l,o.normalized,o.colorSpace);Ee(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,L(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,L(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function be(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let c=r.get(i.depthTexture);c.__renderTarget=i;let l=o?i.depthTexture.image[0]:i.depthTexture.image;c.__webglTexture&&l.width===i.width&&l.height===i.height||(l.width=i.width,l.height=i.height,i.depthTexture.needsUpdate=!0),o?ce(i.depthTexture,0):ae(i.depthTexture,0);let u=c.__webglTexture,d=L(i),f=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Ee(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Ee(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function xe(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)be(i.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?be(i.__webglFramebuffer[0],t,0):be(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),ye(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),ye(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Se(t,n,i){let a=r.get(t);n!==void 0&&ve(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&xe(t)}function I(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,O),T(t);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Ee(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=S(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=L(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),ye(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),fe(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)ve(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else ve(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);y(i)?b(e.TEXTURE_CUBE_MAP):i.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),fe(c,a),ve(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),y(a)&&b(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),fe(r,i),i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)ve(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else ve(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);y(i)?b(r):i.mipmaps.length>0&&e.texParameteri(r,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}t.depthBuffer&&xe(t)}function Ce(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(y(a)&&a.mipmapsAutoUpdate===!0){let t=x(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),b(t),n.unbindTexture()}}}let we=[];function Te(t){if(t.samples>0){if(Ee(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(we.length=0,we.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&we.push(l),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,we))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function L(e){return Math.min(i.maxSamples,e.samples)}function Ee(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function R(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function z(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(zo.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&H(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):U(`WebGLTextures: Unsupported texture color space:`,n)),t}function De(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=re,this.resetTextureUnits=ee,this.getTextureUnits=te,this.setTextureUnits=ne,this.setTexture2D=ae,this.setTexture2DArray=oe,this.setTexture3D=se,this.setTextureCube=ce,this.rebindTextures=Se,this.setupRenderTarget=I,this.updateRenderTargetMipmap=Ce,this.updateMultisampleRenderTarget=Te,this.setupDepthRenderbuffer=xe,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=Ee,this.dispose=j}function Fm(e,t){function n(n,r=``){let i,a=zo.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Im=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Lm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Rm=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new tu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new xu({vertexShader:Im,fragmentShader:Lm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new X(new uu(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},zm=class extends bo{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Rm,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new W,C=null,w=null,T=new pd;T.viewport=new Xo;let E=new pd;E.viewport=new Xo;let D=[T,E],O=new bd,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new As,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new As,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new As,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function M(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,M),r.removeEventListener(`inputsourceschange`,N);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,ne.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&H(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&H(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,M),r.addEventListener(`inputsourceschange`,N),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?aa:ia,a=_.stencil?Qi:qi);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Qo(d.textureWidth,d.textureHeight,{format:ra,type:Hi,depthTexture:new $l(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Qo(f.framebufferWidth,f.framebufferHeight,{format:ra,type:Hi,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),ne.setContext(r),ne.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function N(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}function P(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;P(O,i);for(let e=0;e<a.length;e++)P(a[e],i);O.projectionMatrix.copy(T.projectionMatrix),O.projectionMatrixInverse.copy(T.projectionMatrixInverse),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),F(e,O,i)};function F(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Co*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let ee=null;function te(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new pd,o.layers.enable(n),o.viewport=new Xo,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new tu,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ee&&ee(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let ne=new Ld;ne.setAnimationLoop(te),this.setAnimationLoop=function(e){ee=e},this.dispose=function(){}}},Bm=new q,Vm=new K;Vm.set(-1,0,0,0,1,0,0,0,1);function Hm(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,_u(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Bm.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Vm),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Um(e,t,n,r){let i={},a={};function o(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function s(e,n){let o=i[e.id];o===void 0&&(m(e),o=c(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let u=t.render.frame;a[e.id]!==u&&(l(e),a[e.id]=u)}function c(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function l(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)u(t[n],e,n,a);else u(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(t,n,r,i){if(f(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=h(i,!0);d(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else d(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function d(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function f(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)p(i[n],e,n)===!0&&(t=!0);return t}return p(i,r,a)}function p(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=h(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?H(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):H(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function g(t){let n=t.target;n.removeEventListener(`dispose`,g),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);i={},a={}}return{bind:o,update:s,dispose:_}}var Wm=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Gm=null;function Km(){return Gm===null&&(Gm=new pl(Wm,16,16,ca,Yi),Gm.name=`DFG_LUT`,Gm.minFilter=zi,Gm.magFilter=zi,Gm.wrapS=Pi,Gm.wrapT=Pi,Gm.generateMipmaps=!1,Gm.needsUpdate=!0),Gm}var qm=class{constructor(e={}){let{canvas:t=po(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Hi}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([ua,la,sa]),g=new Set([Hi,qi,Gi,Qi,Xi,Zi]),_=new Uint32Array(4),v=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=to;let j=0,M=0,N=null,P=-1,F=null,ee=new Xo,te=new Xo,ne=null,re=new J(0),ie=0,ae=t.width,oe=t.height,se=1,ce=null,le=null,ue=new Xo(0,0,ae,oe),de=new Xo(0,0,ae,oe),fe=!1,pe=new kl,me=new jl,he=!1,ge=!1,_e=new q,ve=new G,ye=new Xo,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},xe=!1;function Se(){return N===null?se:1}let I=n;function Ce(e,n){return t.getContext(e,n)}let we,Te,L,Ee,R,z,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,B,Re,ze,Be,Ve,He;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,Ge,!1),t.addEventListener(`webglcontextrestored`,Ke,!1),t.addEventListener(`webglcontextcreationerror`,qe,!1),I===null){let t=`webgl2`;if(I=Ce(t,e),I===null)throw Ce(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}Ue()}catch(e){throw t.removeEventListener(`webglcontextlost`,Ge,!1),t.removeEventListener(`webglcontextrestored`,Ke,!1),t.removeEventListener(`webglcontextcreationerror`,qe,!1),U(`WebGLRenderer: `+e.message),e}function Ue(){we=new pf(I),we.init(),Be=new Fm(I,we),Te=new Kd(I,we,e,Be),L=new Nm(I,we),Te.reversedDepthBuffer&&d&&L.buffers.depth.setReversed(!0),O=I.createFramebuffer(),k=I.createFramebuffer(),A=I.createFramebuffer(),Ee=new gf(I),R=new pm,z=new Pm(I,we,L,R,Te,Be,Ee),De=new ff(T),Oe=new Rd(I),Ve=new Wd(I,Oe),ke=new mf(I,Oe,Ee,Ve),Ae=new vf(I,ke,Oe,Ve,Ee),B=new _f(I,Te,z),Fe=new qd(R),je=new fm(T,De,we,Te,Ve,Fe),Me=new Hm(T,R),Ne=new _m,Pe=new wm(we),Le=new Ud(T,De,L,Ae,p,s),Ie=new Mm(T,Ae,Te),He=new Um(I,Ee,Te,L),Re=new Gd(I,we,Ee),ze=new hf(I,we,Ee),Ee.programs=je.programs,T.capabilities=Te,T.extensions=we,T.properties=R,T.renderLists=Ne,T.shadowMap=Ie,T.state=L,T.info=Ee}m!==1009&&(w=new bf(m,t.width,t.height,o,r,i));let We=new zm(T,I);this.xr=We,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let e=we.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=we.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return se},this.setPixelRatio=function(e){e!==void 0&&(se=e,this.setSize(ae,oe,!1))},this.getSize=function(e){return e.set(ae,oe)},this.setSize=function(e,n,r=!0){We.isPresenting?H(`WebGLRenderer: Can't change size while VR device is presenting.`):(ae=e,oe=n,t.width=Math.floor(e*se),t.height=Math.floor(n*se),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(ae*se,oe*se).floor()},this.setDrawingBufferSize=function(e,n,r){ae=e,oe=n,se=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)U(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){H(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(ee)},this.getViewport=function(e){return e.copy(ue)},this.setViewport=function(e,t,n,r){e.isVector4?ue.set(e.x,e.y,e.z,e.w):ue.set(e,t,n,r),L.viewport(ee.copy(ue).multiplyScalar(Se()).round())},this.getScissor=function(e){return e.copy(de)},this.setScissor=function(e,t,n,r){e.isVector4?de.set(e.x,e.y,e.z,e.w):de.set(e,t,n,r),L.scissor(te.copy(de).multiplyScalar(Se()).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(e){L.setScissorTest(fe=e)},this.setOpaqueSort=function(e){ce=e},this.setTransparentSort=function(e){le=e},this.getClearColor=function(e){return e.copy(Le.getClearColor())},this.setClearColor=function(){Le.setClearColor(...arguments)},this.getClearAlpha=function(){return Le.getClearAlpha()},this.setClearAlpha=function(){Le.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(N!==null){let t=N.texture.format;e=h.has(t)}if(e){let e=N.texture.type,t=g.has(e),n=Le.getClearColor(),r=Le.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,I.clearBufferuiv(I.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,I.clearBufferiv(I.COLOR,0,v))}else r|=I.COLOR_BUFFER_BIT}t&&(r|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&I.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Ge,!1),t.removeEventListener(`webglcontextrestored`,Ke,!1),t.removeEventListener(`webglcontextcreationerror`,qe,!1),Le.dispose(),Ne.dispose(),Pe.dispose(),z.dispose(),R.dispose(),De.dispose(),Ae.dispose(),ke.dispose(),Ve.dispose(),He.dispose(),je.dispose(),We.dispose(),We.removeEventListener(`sessionstart`,$e),We.removeEventListener(`sessionend`,et),tt.stop()};function Ge(e){e.preventDefault(),ho(`WebGLRenderer: Context Lost.`),E=!0}function Ke(){ho(`WebGLRenderer: Context Restored.`),E=!1;let e=Ee.autoReset,t=Ie.enabled,n=Ie.autoUpdate,r=Ie.needsUpdate,i=Ie.type;Ue(),Ee.autoReset=e,Ie.enabled=t,Ie.autoUpdate=n,Ie.needsUpdate=r,Ie.type=i}function qe(e){U(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Je(e){let t=e.target;t.removeEventListener(`dispose`,Je),Ye(t)}function Ye(e){V(e),R.remove(e)}function V(e){let t=R.get(e).programs;t!==void 0&&(t.forEach(function(e){je.releaseProgram(e)}),e.isShaderMaterial&&je.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=be);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=ft(e,t,n,r,i);L.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=ke.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ve.setup(i,r,s,n,c);let h,g=Re;if(c!==null&&(h=Oe.get(c),g=ze,g.setIndex(h)),i.isMesh)r.wireframe===!0?(L.setLineWidth(r.wireframeLinewidth*Se()),g.setMode(I.LINES)):g.setMode(I.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),L.setLineWidth(e*Se()),i.isLineSegments?g.setMode(I.LINES):i.isLineLoop?g.setMode(I.LINE_LOOP):g.setMode(I.LINE_STRIP)}else i.isPoints?g.setMode(I.POINTS):i.isSprite&&g.setMode(I.TRIANGLES);if(i.isBatchedMesh){if(we.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Oe.get(c).bytesPerElement:1,o=R.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(I,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function Xe(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),he===!0&&Fe.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,ct(e,t,r),e.side=0,e.needsUpdate=!0,ct(e,t,r),e.side=2):ct(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=Pe.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),ge=this.localClippingEnabled,he=Fe.init(this.clippingPlanes,ge),he===!0&&Fe.setGlobalState(this.clippingPlanes,t),D!==null&&Ie.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];Xe(o,n,t,e),r.add(o)}else Xe(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=R.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}we.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let Ze=null;function Qe(e){Ze&&Ze(e)}function $e(){tt.stop()}function et(){tt.start()}let tt=new Ld;tt.setAnimationLoop(Qe),typeof self<`u`&&tt.setContext(self),this.setAnimationLoop=function(e){Ze=e,We.setAnimationLoop(e),e===null?tt.stop():tt.start()},We.addEventListener(`sessionstart`,$e),We.addEventListener(`sessionend`,et),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){U(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=We.enabled===!0&&We.isPresenting===!0,r=w!==null&&(N===null||n)&&w.begin(T,N);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),We.enabled===!0&&We.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(We.cameraAutoUpdate===!0&&We.updateCamera(t),t=We.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,N),x=Pe.get(e,C.length),x.init(t),x.state.textureUnits=z.getTextureUnits(),C.push(x),_e.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?me.setFromArrayCamera(t):pe.setFromProjectionMatrix(_e,co,t.reversedDepth),ge=this.localClippingEnabled,he=Fe.init(this.clippingPlanes,ge),b=Ne.get(e,S.length),b.init(),S.push(b),this.info.render.frame++,We.enabled===!0&&We.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&nt(e,t,-1/0,T.sortObjects)}nt(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(ce,le),xe=We.enabled===!1||We.isPresenting===!1||We.hasDepthSensing()===!1,xe&&Le.addToRenderList(b,e),this.info.autoReset===!0&&this.info.reset(),he===!0&&Fe.beginShadows();let i=x.state.shadowsArray;if(Ie.render(i,e,t),he===!0&&Fe.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];it(n,r,e,a)}xe&&Le.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];rt(b,e,n,n.viewport)}}else r.length>0&&it(n,r,e,t),xe&&Le.render(e),rt(b,e,t)}N!==null&&M===0&&(z.updateMultisampleRenderTarget(N),z.updateRenderTargetMipmap(N)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Ve.resetDefaultState(),P=-1,F=null,C.pop(),C.length>0?(x=C[C.length-1],z.setTextureUnits(x.state.textureUnits),he===!0&&Fe.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function nt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?me:pe;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&ye.setFromMatrixPosition(e.matrixWorld).applyMatrix4(_e);let i=Ae.update(e),a=e.material;a.visible&&b.push(e,i,a,n,ye.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?me:pe;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=Ae.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),ye.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),ye.copy(e.boundingSphere.center)),ye.applyMatrix4(e.matrixWorld).applyMatrix4(_e)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,ye.z,s,t)}}else a.visible&&b.push(e,i,a,n,ye.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)nt(i[e],t,n,r)}function rt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),he===!0&&Fe.setGlobalState(T.clippingPlanes,n),r&&L.viewport(ee.copy(r)),i.length>0&&at(i,t,n),a.length>0&&at(a,t,n),o.length>0&&at(o,t,n),L.buffers.depth.setTest(!0),L.buffers.depth.setMask(!0),L.buffers.color.setMask(!0),L.setPolygonOffset(!1)}function it(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=we.has(`EXT_color_buffer_half_float`)||we.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Qo(1,1,{generateMipmaps:!0,type:e?Yi:Hi,minFilter:Vi,samples:Math.max(4,Te.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:zo.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||ee;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(re),ie=T.getClearAlpha(),ie<1&&T.setClearColor(16777215,.5),T.clear(),xe&&Le.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),he===!0&&Fe.setGlobalState(T.clippingPlanes,r),at(e,n,r),z.updateMultisampleRenderTarget(a),z.updateRenderTargetMipmap(a),we.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,ot(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(z.updateMultisampleRenderTarget(a),z.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(re,ie),d!==void 0&&(r.viewport=d),T.toneMapping=u}function at(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&ot(o,t,n,s,l,c)}}function ot(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function st(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function ct(e,t,n){t.isScene!==!0&&(t=be);let r=R.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=je.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=je.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=De.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Je),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return dt(e,s),d}else s.uniforms=je.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=je.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Fe.uniform),dt(e,s),r.needsLights=mt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=st(x.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function lt(e,t,n,r,i){let a=R.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=ct(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function ut(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=kp.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function dt(e,t){let n=R.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function ft(e,t,n,r,i){t.isScene!==!0&&(t=be),z.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=N===null?T.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:zo.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=De.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=R.get(r),b=x.state.lights;if(he===!0&&(ge===!0||e!==F)){let t=e===F&&r.id===P;Fe.setState(r,e,t)}let S=!1,C=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==b.state.version||i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?S=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Fe.numPlanes||v.numIntersection!==Fe.numIntersection)?S=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.morphTargetsCount===_&&v.numLightProbeGrids===st(x.state.lightProbeGridArray)?(v.outputColorSpace!==s||v.toneMapping!==h)&&(C=!0):S=!0:S=!0:(S=!0,v.__version=r.version);let w=v.currentProgram;(S===!0||C===!0)&&(w=C===!0?lt(r,t,i,s,h):ct(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,w,v));let E=!1,O=!1,k=!1,A=w.getUniforms(),j=v.uniforms;if(L.useProgram(w.program)&&(E=!0,O=!0,k=!0),r.id!==P&&(P=r.id,O=!0),E||F!==e){L.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),A.setValue(I,`projectionMatrix`,e.projectionMatrix),A.setValue(I,`viewMatrix`,e.matrixWorldInverse);let t=A.map.cameraPosition;t!==void 0&&t.setValue(I,ve.setFromMatrixPosition(e.matrixWorld)),Te.logarithmicDepthBuffer&&A.setValue(I,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&A.setValue(I,`isOrthographic`,e.isOrthographicCamera===!0),F!==e&&(F=e,O=!0,k=!0)}if(v.needsLights&&(b.state.sunShadowMap.length>0&&A.setValue(I,`sunShadowMap`,b.state.sunShadowMap,z),b.state.directionalShadowMap.length>0&&A.setValue(I,`directionalShadowMap`,b.state.directionalShadowMap,z),b.state.spotShadowMap.length>0&&A.setValue(I,`spotShadowMap`,b.state.spotShadowMap,z),b.state.pointShadowMap.length>0&&A.setValue(I,`pointShadowMap`,b.state.pointShadowMap,z)),i.isSkinnedMesh){A.setOptional(I,i,`bindMatrix`),A.setOptional(I,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),A.setValue(I,`boneTexture`,e.boneTexture,z))}i.isBatchedMesh&&(A.setOptional(I,i,`batchingTexture`),A.setValue(I,`batchingTexture`,i._matricesTexture,z),A.setOptional(I,i,`batchingIdTexture`),A.setValue(I,`batchingIdTexture`,i._indirectTexture,z),A.setOptional(I,i,`batchingColorTexture`),i._colorsTexture!==null&&A.setValue(I,`batchingColorTexture`,i._colorsTexture,z));let M=n.morphAttributes;if((M.position!==void 0||M.normal!==void 0||M.color!==void 0)&&B.update(i,n,w),(O||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,A.setValue(I,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(j.envMapIntensity.value=t.environmentIntensity),j.dfgLUT!==void 0&&(j.dfgLUT.value=Km()),O){if(A.setValue(I,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&pt(j,k),a&&r.fog===!0&&Me.refreshFogUniforms(j,a),Me.refreshMaterialUniforms(j,r,se,oe,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.numLightProbeGrids>0){let e=y,t=0;for(let n of x.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;j.probesSH.value=e.textures,j.probesMin.value=e.min,j.probesMax.value=e.max,j.probesResolution.value=e.resolution}kp.upload(I,ut(v),j,z)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(kp.upload(I,ut(v),j,z),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&A.setValue(I,`center`,i.center),A.setValue(I,`modelViewMatrix`,i.modelViewMatrix),A.setValue(I,`normalMatrix`,i.normalMatrix),A.setValue(I,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];He.update(n,w),He.bind(n,w)}}return w}function pt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function mt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(e,t,n){let r=R.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),R.get(e.texture).__webglTexture=t,R.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=R.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){N=e,j=t,M=n;let r=null,i=!1,a=!1;if(e){let o=R.get(e);if(o.__useDefaultFramebuffer!==void 0){L.bindFramebuffer(I.FRAMEBUFFER,o.__webglFramebuffer),ee.copy(e.viewport),te.copy(e.scissor),ne=e.scissorTest,L.viewport(ee),L.scissor(te),L.setScissorTest(ne),P=-1;return}if(o.__webglFramebuffer===void 0)z.setupRenderTarget(e);else if(o.__hasExternalTextures)z.rebindTextures(e,R.get(e.texture).__webglTexture,R.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&R.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);z.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=R.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&z.useMultisampledRTT(e)===!1?R.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,ee.copy(e.viewport),te.copy(e.scissor),ne=e.scissorTest}else ee.copy(ue).multiplyScalar(se).floor(),te.copy(de).multiplyScalar(se).floor(),ne=fe;if(n!==0&&(r=O),L.bindFramebuffer(I.FRAMEBUFFER,r)&&L.drawBuffers(e,r),L.viewport(ee),L.scissor(te),L.setScissorTest(ne),i){let r=R.get(e.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=R.get(e.textures[t]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=R.get(e.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,t.__webglTexture,n)}P=-1};function ht(e){let t=R.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Te.textureFormatReadable(e.format),t.__typeReadable=Te.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=R.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){L.bindFramebuffer(I.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+s);let u=ht(o);if(u.__formatReadable===!1){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&I.readPixels(t,n,r,i,Be.convert(c),Be.convert(l),a)}finally{let e=N===null?null:R.get(N).__webglFramebuffer;L.bindFramebuffer(I.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=R.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){L.bindFramebuffer(I.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+s);let d=ht(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,f),I.bufferData(I.PIXEL_PACK_BUFFER,a.byteLength,I.STREAM_READ),I.readPixels(t,n,r,i,Be.convert(l),Be.convert(u),0),I.bindBuffer(I.PIXEL_PACK_BUFFER,null);let p=N===null?null:R.get(N).__webglFramebuffer;L.bindFramebuffer(I.FRAMEBUFFER,p);let m=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await vo(I,m,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,f),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,a),I.bindBuffer(I.PIXEL_PACK_BUFFER,null),I.deleteBuffer(f),I.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;z.setTexture2D(e,0),I.copyTexSubImage2D(I.TEXTURE_2D,n,0,0,o,s,i,a),L.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Be.convert(t.format),_=Be.convert(t.type),v;t.isData3DTexture?(z.setTexture3D(t,0),v=I.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(z.setTexture2DArray(t,0),v=I.TEXTURE_2D_ARRAY):(z.setTexture2D(t,0),v=I.TEXTURE_2D),L.activeTexture(I.TEXTURE0),L.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,t.flipY),L.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),L.pixelStorei(I.UNPACK_ALIGNMENT,t.unpackAlignment);let y=L.getParameter(I.UNPACK_ROW_LENGTH),b=L.getParameter(I.UNPACK_IMAGE_HEIGHT),x=L.getParameter(I.UNPACK_SKIP_PIXELS),S=L.getParameter(I.UNPACK_SKIP_ROWS),C=L.getParameter(I.UNPACK_SKIP_IMAGES);L.pixelStorei(I.UNPACK_ROW_LENGTH,h.width),L.pixelStorei(I.UNPACK_IMAGE_HEIGHT,h.height),L.pixelStorei(I.UNPACK_SKIP_PIXELS,l),L.pixelStorei(I.UNPACK_SKIP_ROWS,u),L.pixelStorei(I.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=R.get(e),r=R.get(t),h=R.get(n.__renderTarget),g=R.get(r.__renderTarget);L.bindFramebuffer(I.READ_FRAMEBUFFER,h.__webglFramebuffer),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,R.get(e).__webglTexture,i,d+n),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,R.get(t).__webglTexture,a,m+n)),I.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,I.DEPTH_BUFFER_BIT,I.NEAREST);L.bindFramebuffer(I.READ_FRAMEBUFFER,null),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||R.has(e)){let n=R.get(e),r=R.get(t);L.bindFramebuffer(I.READ_FRAMEBUFFER,k),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,n.__webglTexture,i),T?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,r.__webglTexture,a),i===0?T?I.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):I.copyTexSubImage2D(v,a,f,p,l,u,o,s):I.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,I.COLOR_BUFFER_BIT,I.NEAREST);L.bindFramebuffer(I.READ_FRAMEBUFFER,null),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?I.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?I.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):I.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):I.texSubImage2D(I.TEXTURE_2D,a,f,p,o,s,g,_,h);L.pixelStorei(I.UNPACK_ROW_LENGTH,y),L.pixelStorei(I.UNPACK_IMAGE_HEIGHT,b),L.pixelStorei(I.UNPACK_SKIP_PIXELS,x),L.pixelStorei(I.UNPACK_SKIP_ROWS,S),L.pixelStorei(I.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&I.generateMipmap(v),L.unbindTexture()},this.initRenderTarget=function(e){R.get(e).__webglFramebuffer===void 0&&z.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?z.setTextureCube(e,0):e.isData3DTexture?z.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?z.setTexture2DArray(e,0):z.setTexture2D(e,0),L.unbindTexture()},this.resetState=function(){j=0,M=0,N=null,L.reset(),Ve.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return co}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=zo._getDrawingBufferColorSpace(e),t.unpackColorSpace=zo._getUnpackColorSpace()}},Jm=new G;function Ym(e,t,n,r,i,a,o,s,c,l){let u=-1,d=a;for(let a=0;a<t.length;a++){let f=t[a],p=f.px-o,m=f.py-s,h=f.pz-c;if(p*p+m*m+h*h>l*l||(Jm.set(f.px,f.py,f.pz).project(e),Jm.z>1||Jm.z<-1))continue;let g=(Jm.x-n)*i,_=Jm.y-r,v=Math.sqrt(g*g+_*_);v<d&&(d=v,u=a)}return u}var Xm=1024,Zm=2048;function Qm(e){let t=(e-2)/9;return t<0?0:t>1?1:t}function $m(){return{state:0,speed:0,vy:0,brake:!1,rolling:!1,ropeDirX:0,ropeDirY:1,ropeDirZ:0,dt:0,events:0,ropeLen:vh,impact:0,deadCause:0,win:0,hookFlying:0,sliding:!1,sprint:0,dive:!1}}var eh=.965,th=.08,nh=.2,rh=.5,ih=.29,ah=.28,oh=[.12,.1,.08,.08,.07,.04,.2,.15,.06],sh=.5,ch=.3,lh=.4,uh=.1,dh=1/120,fh=4.5,ph=.3,mh=.035,hh=.012,gh=.45,_h=1.2,vh=20,yh=.6,bh=1.6,xh=.7,Sh=.08,Ch=.15,wh=Math.PI*2,Th=.08,Eh=.75,Dh=10,Oh=.9,kh=.14,Ah=.12,jh=.6,Mh=.35,Nh=.12,Ph=9.81,Fh=14,Ih=.35,Lh=.05,Rh=.1,zh=.28,Bh=1,Vh=2048,Hh=2,Uh=4,Wh=16,Gh=32,Kh=64,qh=256,Jh=.75,Yh=.3,Xh=.04,Zh=.08,Qh=.05,$h=.1,eg=.12,tg=.18,ng=.9,rg=.85;function ig(e){let t=new Float64Array(25);for(let n=0;n<e.length;n++)t[e[n][0]]=e[n][1];return t}var ag=ig([[4,.04],[6,-.04],[8,.12],[11,.12],[7,.08],[10,-.04],[9,.3],[12,.22],[14,.06],[17,.06],[13,.08],[15,.14],[18,.06]]),og=ig([[0,-.04],[4,.2],[6,-.15],[7,-.5],[10,1],[8,.5],[11,.35],[9,.5],[12,.7],[13,1.1],[15,1.3],[16,-.25],[18,.7]]),sg=ig([[0,-.06],[4,.08],[6,.25],[7,.35],[10,.2],[8,1.15],[11,1.05],[9,.45],[12,.35],[13,.7],[15,1],[16,.2],[18,.55],[14,.1],[17,.1]]),cg=ig([[0,-.075],[2,-.1],[4,-.04],[6,-.12],[7,2.95],[10,2.95],[9,.15],[12,.15],[13,.4],[14,.06],[15,1.15],[16,.3],[17,.06],[18,1]]),lg=ig([[1,.05],[2,-.25],[4,-.3],[5,.2],[6,.2],[7,3],[8,.1],[9,.15],[10,-.45],[11,.95],[12,.5],[13,1.15],[15,1.25],[16,.85],[18,1.5]]),ug=ig([[0,-.45],[4,.9],[6,.6],[7,.9],[10,.9],[8,.1],[11,.1],[9,1.6],[12,1.6],[13,2],[16,2],[15,2.2],[18,2.2]]),dg=ig([[0,-.8],[1,-.1],[2,-1.45],[3,.22],[4,.15],[5,.3],[6,.45],[7,.35],[8,1.35],[9,.35],[10,-.2],[11,.55],[12,1],[13,.65],[14,.2],[15,1.25],[16,-.05],[17,.12],[18,.15]]),fg=ig([[4,-.12],[6,-.25],[7,2.6],[10,2.6],[8,.5],[11,.5],[9,.25],[12,.25],[14,.12],[17,.12],[15,.05],[18,.05]]),pg=ig([[0,-.075],[2,.15],[4,-.05],[6,-.3],[7,2.95],[10,2.95],[9,.2],[12,.2],[13,.75],[16,.6],[15,.95],[18,.8]]),mg=ig([[0,-.55],[2,1.2],[3,.35],[4,.35],[5,-.25],[6,-.3],[7,1.6],[8,.4],[9,1.9],[10,.9],[11,.9],[12,1.2],[13,1.5],[15,2.1],[16,.6],[18,.9]]),hg=new Float64Array([0,0,.05,-.07,.12,.02,.24,0]),gg=new Float64Array([0,0,.05,.6,.12,-.15,.24,0]),_g=new Float64Array([0,0,.05,.45,.12,-.1,.24,0]),vg=new Float64Array([0,0,.05,-.5,.12,1.1,.24,0]),yg=new Float64Array([0,0,.05,.15,.12,-.05,.24,0]),bg=new Float64Array([0,0,.05,.1,.12,-.08,.24,0]),xg=.24,Sg=new Float64Array([0,0,.25,.14,.6,-.03,1,0]),Cg=new Float64Array([0,0,.3,-.22,1,0]),wg=new Float64Array([0,0,.3,.9,1,0]),Tg=new Float64Array([0,0,.3,.7,1,0]),Eg=new Float64Array([0,0,.3,.35,1,0]),Dg=new Float64Array([0,0,.3,.3,1,0]),Og=new Float64Array([0,0,.05,-.06,.15,0]),kg=new Float64Array([0,0,.05,-.15,.2,0]),Ag=new Float64Array([0,0,.06,-.05,.25,0]),jg=.25,Mg=new Float64Array([0,1.6,.35,0]),Ng=new Float64Array([0,0,.12,.5,.35,0]),Pg=new Float64Array([0,-.25,.3,0]),Fg=new Float64Array([0,-.2,.3,0]),Ig=.35,Lg=new Float64Array([0,0,.05,.06,.18,0]),Rg=new Float64Array([0,0,.05,.2,.25,0]),zg=.25,Bg=new Float64Array([0,0,.06,-.6,.3,0]),Vg=new Float64Array([0,0,.08,.8,.4,0]),Hg=.4,Ug=new Float64Array([0,0,.06,.18,.2,0]),Wg=new Float64Array([0,0,.08,-.25,.3,0]),Gg=.3,Kg=1.2,qg=new Float64Array([0,0,.1,.08,.25,-.06,.4,0]),Jg=new Float64Array([0,0,.25,.05,.4,0]),Yg=.4;function Xg(e,t){let n=e.length;if(t<e[0]||t>e[n-2])return 0;for(let r=2;r<n;r+=2)if(t<=e[r]){let n=e[r-2],i=e[r]-n,a=i>0?(t-n)/i:1,o=a*a*(3-2*a);return e[r-1]+(e[r+1]-e[r-1])*o}return e[n-1]}var Zg=class{weights=new Float64Array(9);channels=new Float64Array(25);rows=new Float64Array(225);active=0;phase=0;time=0;rollT=0;prevState=-1;prevSpeed=0;accel=0;swing=0;swingVel=0;scarf=.3;prevYaw=0;yawRate=0;initialized=0;reach=0;hemP=0;hemPV=0;hemR=0;hemRV=0;tJump=-1;tLand=-1;tAttach=-1;tRelease=-1;tCling=-1;tDie=-1;tWin=-1;tMantle=-1;vaultW=0;slideW=0;diveW=0;landA=0;landRoll=0;attachS=1;dieCause=0};function Qg(e){return e>0?Math.min(2.4,e/(1.6+.3*e)):0}function $g(e,t){if(t.state===2)return 6;if(t.win===1)return 7;if(t.state===3)return t.brake?4:3;if(t.state===4)return 8;if(t.state===5)return 2;if(t.rolling)return 5;if(t.state===1)return 2;let n=e.active===1;return t.speed>sh||n&&t.speed>ch?1:0}function e_(e,t,n){return e<t?t:e>n?n:e}function t_(e,t,n){let r=t*25;for(let t=0;t<25;t++)e.rows[r+t]=n[t];return r}var n_=1.6;function r_(e,t){let n=e.rows,r=o_(1);for(let e=0;e<25;e++)n[r+e]=0;let i=e_(t/6,.3,n_),a=e.phase*wh,o=Math.sin(a),s=Math.cos(a),c=.12+.22*i;n[r+0]=-.05*i+.04*i*Math.cos(2*a),n[r+4]=c,n[r+5]=.18*i*o,n[r+6]=-.6*c,n[r+13]=.2+.85*i*o,n[r+16]=.2-.85*i*o,n[r+15]=.25+1.15*i*(.5+.5*s),n[r+18]=.25+1.15*i*(.5-.5*s),n[r+7]=-.9*i*o,n[r+10]=.9*i*o,n[r+8]=.15,n[r+11]=.15,n[r+9]=1.2+.25*i,n[r+12]=1.2+.25*i}function i_(e,t){let n=e.rows,r=e.time,i=Math.sin(wh*zh*r);n[t+4]-=.025*i,n[t+6]+=.015*i,n[t+8]+=.02*i,n[t+11]+=.02*i,n[t+0]+=.004*i,n[t+3]+=.02*Math.sin(wh*.11*r)}function a_(e){let t=t_(e,7,fg),n=Math.sin(wh*1.2*e.time);e.rows[t+7]+=.2*n,e.rows[t+10]-=.2*n}function o_(e){return e*25}function s_(e,t){let n=e.rows,r=o_(2),i=.5+.5*e_(t/5,-1,1);for(let e=0;e<25;e++)n[r+e]=sg[e]+(og[e]-sg[e])*i;let a=.17*(1-i)*Math.sin(e.time*1.5*wh);n[r+13]+=a,n[r+16]-=a}function c_(e,t,n,r,i){let a=t_(e,t,n),o=r.ropeDirX,s=r.ropeDirY,c=r.ropeDirZ;s>.2||(o=0,s=1,c=0);let l=Math.cos(i),u=Math.sin(i),d=o*l-c*u,f=o*u+c*l,p=e_(Math.atan2(f,s),-.7,xh),m=e_(Math.atan2(-d,s),-.7,xh);e.rows[a+19]=p+e.swing,e.rows[a+20]=m}function l_(e,t){let n=e[t+2],r=n+e[t+4],i=eh+e[t+0]+th*Math.cos(n)+rh*Math.cos(r),a=e[t+1]+th*Math.sin(n)+rh*Math.sin(r),o=2-i,s=-a,c=Math.cos(r),l=Math.sin(r),u=o*c+s*l,d=-o*l+s*c,f=Math.sqrt(u*u+d*d),p=Math.atan2(d,-u),m=0,h=Math.PI,g=0;for(let e=0;e<2;e++){let e=Math.cos(m),t=ih*e,n=ah*e,r=e_(f,Math.abs(t-n)+.001,t+n-1e-4),i=Math.acos(e_((t*t+n*n-r*r)/(2*t*n),-1,1)),a=Math.acos(e_((t*t+r*r-n*n)/(2*t*r),-1,1));g=Math.PI-i,h=p-a;let o=ih+ah*Math.cos(g);m=Math.asin(e_(-.13/o,-1,1))}e[t+7]=h,e[t+10]=h,e[t+8]=m,e[t+11]=m,e[t+9]=g,e[t+12]=g}function u_(e,t,n,r){c_(e,3,cg,t,n);let i=e.rows,a=o_(3),o=e_(r/Dh,0,1),s=e.time,c=Math.sin(wh*Eh*s);i[a+19]+=Th*(.3+.7*o)*c,i[a+4]+=.03*o*Math.sin(wh*Eh*s-.8);let l=Math.atan(r*e.yawRate/Ph)*jh;i[a+20]-=e_(l,-.35,Mh);let u=e_(Ah*e.swingVel,-.25,.25),d=kh*(.35+.65*o),f=wh*Oh*s;i[a+13]+=u+d*Math.sin(f),i[a+16]+=u+d*Math.sin(f+1.1),i[a+15]+=.6*d*Math.sin(f-.7),i[a+18]+=.6*d*Math.sin(f+.4),i[a+15]+=.12*o*Math.sin(wh*Oh*s+Math.PI/2),i[a+18]+=.12*o*Math.sin(wh*Oh*s-Math.PI/2),l_(i,a)}function d_(e){let t=t_(e,5,ug),n=wh*Math.min(1,e.rollT/lh);n>Math.PI&&(n-=wh),e.rows[t+2]=n}function f_(e,t,n,r){for(let n=0;n<9;n++)e.weights[n]=+(n===t);e.phase=0,e.rollT=0,e.prevSpeed=n,e.prevYaw=r,e.yawRate=0,e.accel=0,e.swing=0,e.swingVel=0,e.reach=0,e.hemP=0,e.hemPV=0,e.hemR=0,e.hemRV=0,e.tJump=-1,e.tLand=-1,e.tAttach=-1,e.tRelease=-1,e.tCling=-1,e.tDie=-1,e.tWin=-1,e.tMantle=-1,e.vaultW=0,e.slideW=0,e.diveW=0,e.initialized=1}function p_(e,t,n){let r=t.state===3?e_(mh*e.accel+hh*t.speed,-.45,gh):0,i=Math.ceil(n/dh);i>12&&(i=12);let a=i>0?n/i:0,o=fh*fh,s=2*ph*fh;for(let t=0;t<i;t++)e.swingVel+=(o*(r-e.swing)-s*e.swingVel)*a,e.swing+=e.swingVel*a}function m_(e,t){let n=t.events|0;if(n!==0){if((n&Hh)!==0&&(e.tJump=0),(n&Bh)!==0){let r=(t.impact-2)/9;e.landA=r<0?0:r>1?1:r,e.diveW>.3&&e.landA<rg&&(e.landA=rg),(n&Vh)!==0&&e.landA<ng&&(e.landA=ng),e.landRoll=t.rolling&&(n&Vh)===0?1:0,e.tLand=0}(n&Wh)!==0&&(e.attachS=e_(t.speed/10,.3,1),e.tAttach=0),(n&Uh)!==0&&(e.tRelease=0),(n&Gh)!==0&&(e.tCling=0),(n&qh)!==0&&(e.tMantle=0),(n&Kh)!==0&&(e.dieCause=t.deadCause,e.tDie=0)}}function h_(e,t){let n=e.channels;if(e.tJump>=0){let r=e.tJump;n[0]+=Xg(hg,r);let i=Xg(gg,r);n[15]+=i,n[18]+=i;let a=Xg(_g,r);n[13]+=a,n[16]+=a;let o=Xg(vg,r);n[7]+=o,n[10]+=o,n[4]+=Xg(yg,r),n[24]+=Xg(bg,r),e.tJump=r+t>xg?-1:r+t}if(e.tLand>=0){let r=e.landA,i=.12+.18*r,a=e.tLand/i;if(e.landRoll===1)n[24]+=.5*r*Xg(Sg,a);else{n[24]+=r*Xg(Sg,a),n[0]+=r*Xg(Cg,a);let e=r*Xg(wg,a);n[15]+=e,n[18]+=e;let t=r*Xg(Tg,a);n[13]+=t,n[16]+=t,n[4]+=r*Xg(Eg,a);let i=r*Xg(Dg,a);n[8]+=i,n[11]+=i}e.tLand=e.tLand+t>i?-1:e.tLand+t}if(e.tAttach>=0){let r=e.tAttach,i=e.attachS;n[24]+=i*Xg(Og,r);let a=Xg(kg,r);n[9]+=a,n[12]+=a,n[0]+=i*Xg(Ag,r),e.tAttach=r+t>jg?-1:r+t}if(e.tRelease>=0){let r=e.tRelease,i=Xg(Mg,r);n[7]+=i,n[10]+=i;let a=Xg(Ng,r);n[13]+=a,n[16]+=a,n[4]+=Xg(Pg,r),n[6]+=Xg(Fg,r),e.tRelease=r+t>Ig?-1:r+t}if(e.tCling>=0){let r=e.tCling;n[24]+=Xg(Lg,r),n[4]+=Xg(Rg,r),e.tCling=r+t>zg?-1:r+t}if(e.tDie>=0){let r=e.tDie,i=Kg;if(e.dieCause===2){n[6]+=Xg(Bg,r);let e=Xg(Vg,r);n[8]+=e,n[11]+=e,i=Hg}else if(e.dieCause===3)n[24]+=Xg(Ug,r),n[0]+=Xg(Wg,r),i=Gg;else if(r<=Kg){let e=Math.exp(-r/.6),t=.4*e*Math.sin(wh*3*r),i=.3*e*Math.sin(wh*2.5*r);n[8]+=t,n[11]-=t,n[13]+=i,n[16]-=i}e.tDie=r+t>i?-1:r+t}if(e.tWin>=0){let r=e.tWin;n[24]+=Xg(qg,r),n[0]+=Xg(Jg,r),e.tWin=r+t>Yg?-1:r+t}}function g_(e,t,n,r,i){let a=e.active,o=0,s=0;a===3||a===4?o=-.5*e.swing:a!==6&&(o=-e_(.012*r+.02*Math.max(0,-t.vy),0,.3)-.2*e_(e.accel/10,-1,1)+.05*i*Math.sin(2*wh*e.phase+Math.PI/2),s=.06*i*Math.sin(wh*e.phase+Math.PI/2)-.15*e_(e.yawRate/3,-1,1));let c=Math.ceil(n/dh);c>12&&(c=12);let l=c>0?n/c:0,u=2*Ih*Fh;for(let t=0;t<c;t++)e.hemPV+=(196*(o-e.hemP)-u*e.hemPV)*l,e.hemP+=e.hemPV*l,e.hemRV+=(196*(s-e.hemR)-u*e.hemRV)*l,e.hemR+=e.hemRV*l;e.channels[22]=e_(e.hemP,-.35,.2),e.channels[23]=e_(e.hemR,-.18,.18)}function __(e,t,n,r){e[t]+=(n-e[t])*r}function v_(e,t,n){let r=e.channels;if(n>0){let r=+(t.state===5);e.vaultW+=(r-e.vaultW)*(1-Math.exp(-n/(r===1?Xh:Zh)));let i=t.sliding&&t.state===0?1:0;e.slideW+=(i-e.slideW)*(1-Math.exp(-n/(i===1?Qh:$h)))}let i=t.dive&&t.state===1?1:0;n>0&&(e.diveW+=(i-e.diveW)*(1-Math.exp(-n/(i===1?eg:tg))));let a=e.diveW;a>.001&&(__(r,2,1.35,a),__(r,0,-.05,a),__(r,4,-.12,a),__(r,6,-.35,a),__(r,7,2.9,a),__(r,10,2.9,a),__(r,8,.18,a),__(r,11,.18,a),__(r,9,.05,a),__(r,12,.05,a),__(r,13,-.1,a),__(r,16,-.15,a),__(r,15,.12,a),__(r,18,.2,a),__(r,14,.04,a),__(r,17,.04,a));let o=e.vaultW;o>.001&&(__(r,2,.3,o),__(r,4,.45,o),__(r,0,-.12,o),__(r,13,1.4,o),__(r,15,1.5,o),__(r,16,-.45,o),__(r,18,1,o),__(r,7,1.2,o),__(r,10,-.6,o),__(r,9,.3,o));let s=e.slideW;if(s>.001&&(__(r,2,-.85,s),__(r,0,-.55,s),__(r,4,-.2,s),__(r,13,1.4,s),__(r,16,1.2,s),__(r,15,.3,s),__(r,18,.5,s),__(r,7,-.7,s),__(r,10,-.7,s),__(r,9,.2,s),__(r,12,.2,s)),e.tMantle>=0){let t=e.tMantle/Jh,i=1-t*t*(3-2*t);r[0]-=Yh*i,r[4]+=.5*i,r[7]+=1*i,r[10]+=1*i,r[13]+=.9*i,r[16]+=.6*i,r[15]+=.8*i,r[18]+=.5*i,e.tMantle=e.tMantle+n>Jh?-1:e.tMantle+n}}function y_(e,t,n){let r=t.dt>0?Math.min(t.dt,uh):0,i=t.speed>0?t.speed:0,a=$g(e,t);(e.initialized===0||e.prevState===2&&t.state!==2)&&f_(e,a,i,n);let o=e.active;if(e.prevState=t.state,e.active=a,a===7&&o!==7&&(e.tWin=0),e.time+=r,e.phase+=Qg(i)*(1+t.sprint)*r,e.phase-=Math.floor(e.phase),e.rollT=t.rolling?e.rollT+r:0,r>0){let t=(i-e.prevSpeed)/r;e.accel+=(t-e.accel)*(1-Math.exp(-r/Sh));let a=(n-e.prevYaw)%wh;a>Math.PI&&(a-=wh),a<-Math.PI&&(a+=wh),e.yawRate+=(a/r-e.yawRate)*(1-Math.exp(-r/Nh))}if(e.prevYaw=n,e.prevSpeed=i,p_(e,t,r),m_(e,t),(t.events&Wh)!==0){let n=e_(t.ropeLen/vh,yh,bh);e.swingVel+=_h*n*e.attachS}let s=1-Math.exp(-r/oh[a]),c=0;for(let t=0;t<9;t++){let n=+(t===a);e.weights[t]+=(n-e.weights[t])*s,c+=e.weights[t]}i_(e,t_(e,0,ag)),r_(e,i),s_(e,t.vy),u_(e,t,n,i),c_(e,4,lg,t,n),d_(e),t_(e,6,t.deadCause===3?mg:dg),a_(e),i_(e,t_(e,8,pg));let l=c>0?1/c:0;for(let t=0;t<25;t++){let n=0;for(let r=0;r<9;r++)n+=e.weights[r]*e.rows[r*25+t];e.channels[t]=n*l}if(h_(e,r),v_(e,t,r),r>0){let n=+(t.hookFlying===1),i=n===1?Lh:Rh;e.reach+=(n-e.reach)*(1-Math.exp(-r/i))}let u=e.reach;if(u>0){let n=e.channels,r=t.ropeDirY<-1?-1:t.ropeDirY>1?1:t.ropeDirY,i=e_(Math.PI/2+Math.asin(r),.6,3);n[10]+=(i-n[10])*u,n[12]+=(.1-n[12])*u,n[5]-=.15*u}let d=e.active===1?e_(i/6,.3,1):0;g_(e,t,r,i,d);let f=t.state===2,p=f?.05:e_(.2+.12*i+.06*Math.abs(t.vy),.15,1.35);e.scarf+=(p-e.scarf)*(1-Math.exp(-r/Ch));let m=f?0:.08*Math.min(1,i/8)*Math.sin(e.time*17);f||(i<.5&&(m+=.05*Math.sin(wh*.35*e.time)),m+=.1*d*Math.sin(2*wh*e.phase+2.2)),e.channels[21]=e.scarf+m;let h=e.channels[24];e.channels[24]=h<-.12?-.12:h>.18?.18:h}var b_=.75;function x_(e,t,n){let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)}var S_=class{t=-1;dx=0;dy=0;dz=0;ox=0;oy=0;oz=0;start(e,t,n){Math.hypot(e,t,n)>4||Math.hypot(e,t,n)<.05?this.t=-1:(this.t=0,this.dx=e,this.dy=t,this.dz=n)}cancel(){this.t=-1,this.ox=0,this.oy=0,this.oz=0}get active(){return this.t>=0}step(e){if(this.t<0){this.ox=0,this.oy=0,this.oz=0;return}let t=this.t/b_,n=1-x_(0,.65,t),r=1-x_(.35,1,t);this.ox=this.dx*r,this.oz=this.dz*r,this.oy=this.dy*n,this.t+=e,this.t>=.75&&(this.t=-1)}};function C_(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Ac;c.morphTargetsRelative=s;let l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0,p=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let t in d.morphAttributes){if(!i.has(t))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;if(d.morphAttributes[t].length!==e[0].morphAttributes[t].length)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have the same number of morph targets for the "`+t+`" morph attribute.`),null;o[t]===void 0&&(o[t]=[]),o[t].push(d.morphAttributes[t]),p++}if(p!==i.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of morph attributes.`),null;if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=w_(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=w_(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function w_(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new gc(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}function T_(e,t=1e-4){t=Math.max(t,2**-52);let n={},r=e.getIndex(),i=e.getAttribute(`position`),a=r?r.count:i.count,o=0,s=Object.keys(e.attributes),c=[],l=new Map,u=[],d=[`getX`,`getY`,`getZ`,`getW`],f=t*.5,p=10**Math.log10(1/t),m=f*p;for(let t=0;t<a;t++){let i=r?r.getX(t):t,a=``;for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.getAttribute(n),o=r.itemSize;for(let e=0;e<o;e++)a+=`${Math.trunc(r[d[e]](i)*p+m)},`}a in n?u.push(n[a]):(c.push(i),n[a]=o,u.push(o),o++)}let h=e.clone();for(let t in e.attributes)h.setAttribute(t,E_(e.attributes[t],c,l));for(let t in e.morphAttributes)h.morphAttributes[t]=e.morphAttributes[t].map(e=>E_(e,c,l));return h.setIndex(u),h}function E_(e,t,n=new Map){let r=e.isInterleavedBufferAttribute,i=r?e.data:e,a=r?i.stride:e.itemSize,o=r?n.get(i):void 0;if(o===void 0){let s=new i.array.constructor(t.length*a);for(let e=0;e<t.length;e++)for(let n=0;n<a;n++)s[e*a+n]=i.array[t[e]*a+n];o=r?new i.constructor(s,a,i.meshPerAttribute):new e.constructor(s,e.itemSize,e.normalized,e.meshPerAttribute),o.setUsage(i.usage),r&&n.set(i,o)}let s=r?new e.constructor(o,e.itemSize,e.offset,e.normalized):o;return s.name=e.name,r||(s.gpuType=e.gpuType),s}var D_={tunic:`#36444c`,trousers:`#2a2f3b`,crimson:`#dc2b34`,skin:`#a5674a`,hair:`#1f1a17`,leather:`#4a3426`},O_=.1,k_=.7,A_=.6,j_=new Mo,M_=new us,N_=new G(1,1,1);function P_(e,t,n,r,i=0,a=0,o=0){let s=e.clone();return j_.setFromEuler(M_.set(i,a,o)),s.applyMatrix4(new q().compose(new G(t,n,r),j_,N_)),s}function F_(e){let t=C_(e);for(let t of e)t.dispose();return t}function I_(e,t,n){let r=e.attributes.position;for(let e=0;e<n;e++){let i=e%(n-1),a=t+e,o=i%3==0?1.06:1;r.setXYZ(a,r.getX(a)*o,r.getY(a)+(i%2==0?-.025:.01),r.getZ(a)*o)}r.needsUpdate=!0,e.computeVertexNormals()}function L_(e,t){let n=new lu(e,t),r=e.length,i=n.attributes.position;for(let e=0;e<=t;e++){let n=e*r+(r-1),a=e%t,o=a%3==0?1.06:1;i.setXYZ(n,i.getX(n)*o,i.getY(n)+(a%2==0?-.025:.01),i.getZ(n)*o)}return i.needsUpdate=!0,n.computeVertexNormals(),n}function R_(e,t,n){let r=e.getAttribute(`position`),i=1/0,a=-1/0;for(let e=0;e<r.count;e++){let t=r.getY(e);t<i&&(i=t),t>a&&(a=t)}for(let e=0;e<r.count;e++){let o=n+(t-n)*((r.getY(e)-i)/(a-i));r.setX(e,r.getX(e)*o),r.setZ(e,r.getZ(e)*o)}r.needsUpdate=!0,e.deleteAttribute(`uv`),e.deleteAttribute(`normal`);let o=T_(e,1e-5);return o.computeVertexNormals(),o}function z_(e,t,n,r){let i=new au(e,t,n,r,1,!0);return I_(i,r+1,r+1),i}function B_(e){return F_([P_(new au(.05,.058,.06,7,1,!0),0,.05,0),P_(new nu(.075,.085,.045),0,-.005,0),P_(new nu(.08,.04,.05),0,-.055,.03,.5),P_(new nu(.025,.05,.025),.045*e,-.02,.025)])}var V_=null;function H_(){if(V_===null){let e=(e,t=.18,n=0)=>new Cu({color:e,roughness:.85,metalness:0,emissive:e,emissiveIntensity:t,side:n});V_={tunic:e(D_.tunic,.1,2),trousers:e(D_.trousers),crimson:e(D_.crimson,.35),skin:e(D_.skin,.12),hair:e(D_.hair),leather:e(D_.leather)}}return V_}function U_(e,t,n,r,i,a){let o=new X(t,n);return o.position.set(r,i,a),e.add(o),o}function W_(e,t,n,r){let i=new Os;return i.position.set(t,n,r),e.add(i),i}var G_=class{root;pose=new Zg;yaw=0;swing;body;yoke;pelvis;spine;head;scarfTail;scarfTip;sashTail;shoulderL;elbowL;handL;shoulderR;elbowR;handR;hipL;kneeL;hipR;kneeR;constructor(){let e=H_(),t=new nu(.27,.17,.19),n=new au(.195,.19,.085,10),r=new nu(.09,.3,.022),i=L_([new W(.16,.06),new W(.19,-.04),new W(.215,-.16)],10),a=new lu([new W(0,-.06),new W(.17,-.05),new W(.168,.1),new W(.172,.3),new W(.158,.44),new W(.095,.53),new W(0,.55)],10),o=new nu(.045,.52,.02),s=F_([P_(o,0,.23,.15,.06,0,.55),P_(o,0,.23,-.15,-.06,0,.55)]),c=new au(.1,.13,.1,8),l=F_([P_(new nu(.11,.44,.025),0,-.21,0,0,.5,0),P_(new nu(.08,.3,.02),.05,-.14,-.01,0,-.6,-.25)]),u=new nu(.06,.16,.2),d=new fu(.14,8,6),f=new fu(.153,8,4,0,Math.PI*2,0,Math.PI*.6),p=R_(new ru(.07,.17,1,6),1.15,.82),m=new au(.065,.1,.22,8,1,!0),h=B_(-1),g=B_(1),_=R_(new ru(.085,.31,1,6),1.2,.8),v=z_(.115,.135,.26,8),y=R_(new ru(.07,.3,1,6),1.12,.72),b=new ru(.06,.13,1,6);this.root=new Os,this.root.name=`heroRig`,this.swing=W_(this.root,0,2,0),this.body=W_(this.swing,0,-2,0),this.pelvis=W_(this.body,0,eh,0),U_(this.pelvis,t,e.trousers,0,-.01,0),U_(this.pelvis,n,e.crimson,0,.07,0).scale.set(1,1,.82),this.yoke=W_(this.pelvis,0,0,0),U_(this.yoke,i,e.tunic,0,0,0).scale.set(1,1,.85),U_(this.pelvis,u,e.leather,.25,-.05,-.03),this.sashTail=W_(this.pelvis,.15,.06,-.12),U_(this.sashTail,r,e.crimson,0,-.14,0).rotation.z=.12,this.spine=W_(this.pelvis,0,th,0),U_(this.spine,a,e.tunic,0,0,0).scale.set(1.1,1,.82),U_(this.spine,s,e.leather,0,0,0),U_(this.spine,c,e.crimson,0,.55,0).scale.set(1,1,.85),this.scarfTail=W_(this.spine,0,.56,-.12),U_(this.scarfTail,l,e.crimson,0,0,0),this.scarfTip=W_(this.scarfTail,0,-.42,0),U_(this.scarfTip,new nu(.09,.2,.018),e.crimson,0,-.1,0),this.head=W_(this.spine,0,.6,0),U_(this.head,d,e.skin,0,.14,.008).scale.set(.95,1.03,.96),U_(this.head,f,e.hair,0,.156,-.012).rotation.x=-.6,U_(this.head,new fu(.06,6,4),e.hair,0,.3,-.03),U_(this.head,new nu(.2,.04,.05),e.hair,0,.215,.115).rotation.x=.35,this.shoulderL=W_(this.spine,nh,rh,0),this.shoulderR=W_(this.spine,-nh,rh,0),this.elbowL=W_(this.shoulderL,0,-ih,0),this.elbowR=W_(this.shoulderR,0,-ih,0),this.handL=W_(this.elbowL,0,-ah,0),this.handR=W_(this.elbowR,0,-ah,0);for(let t=0;t<2;t++){let n=t===0?this.shoulderL:this.shoulderR,r=t===0?this.elbowL:this.elbowR,i=t===0?this.handL:this.handR;U_(n,p,e.tunic,0,-.16,0),U_(r,m,e.tunic,0,-.13,0),U_(i,t===0?h:g,e.leather,0,0,0)}this.hipL=W_(this.pelvis,O_,-.05,0),this.hipR=W_(this.pelvis,-.1,-.05,0),this.kneeL=W_(this.hipL,0,-.43,0),this.kneeR=W_(this.hipR,0,-.43,0);for(let t=0;t<2;t++){let n=t===0?this.hipL:this.hipR,r=t===0?this.kneeL:this.kneeR;U_(n,_,e.trousers,0,-.235,0),U_(n,v,e.tunic,0,-.13,0),U_(r,y,e.trousers,0,-.2,0);let i=U_(r,b,e.leather,0,-.44,.04);i.rotation.x=Math.PI/2,i.scale.set(1,1,.75)}K_(this.root)}};function K_(e){e.updateMatrixWorld(!0);let t=[];e.traverse(n=>{n!==e&&n instanceof Os&&t.push(n)});let n=new Map;e.traverse(e=>{if(!(e instanceof X))return;let r=e.material,i=n.get(r);i===void 0&&(i={geos:[],meshes:[]},n.set(r,i));let a=e.geometry.clone();a.deleteAttribute(`uv`),a.applyMatrix4(e.matrixWorld);let o=a.getAttribute(`position`).count,s=t.indexOf(e.parent),c=new Uint16Array(o*4),l=new Float32Array(o*4);for(let e=0;e<o;e++)c[e*4]=s,l[e*4]=1;a.setAttribute(`skinIndex`,new _c(c,4)),a.setAttribute(`skinWeight`,new Y(l,4)),i.geos.push(a),i.meshes.push(e)});let r=new gl(t);for(let[t,i]of n){for(let e of i.meshes)e.parent?.remove(e),e.geometry.dispose();let n=new dl(F_(i.geos),t);n.name=`heroSkin`,n.frustumCulled=!1;let a=t.color.getHexString();n.userData.cast=a!==D_.skin.slice(1)&&a!==D_.hair.slice(1),e.add(n),n.bind(r,new q)}}function q_(e,t){e.swing.rotation.set(t[19],0,t[20]),e.pelvis.position.set(0,eh+t[0],t[1]),e.pelvis.rotation.set(t[2],0,t[3]),e.spine.rotation.set(t[4],t[5],0),e.head.rotation.x=t[6],e.scarfTail.rotation.x=t[21],e.scarfTip.rotation.x=t[21]*k_,e.sashTail.rotation.x=t[21]*A_,e.shoulderL.rotation.set(-t[7],0,t[8]),e.shoulderR.rotation.set(-t[10],0,-t[11]),e.elbowL.rotation.x=-t[9],e.elbowR.rotation.x=-t[12],e.hipL.rotation.set(-t[13],0,t[14]),e.hipR.rotation.set(-t[16],0,-t[17]),e.kneeL.rotation.x=t[15],e.kneeR.rotation.x=t[18];let n=t[24],r=n<-.12?-.12:n>.18?.18:n;e.body.scale.set(1+.5*r,1-r,1+.5*r),e.yoke.rotation.set(t[22],0,t[23])}function J_(e,t){y_(e.pose,t,e.yaw),q_(e,e.pose.channels)}var Y_=Math.PI*2,X_=.1,Z_=class{group;rig;input;lastMs=-1;mantle=new S_;drawnX=0;drawnY=0;drawnZ=0;mantleOx=0;mantleOy=0;mantleOz=0;hasDrawn=!1;constructor(){this.group=new Os,this.rig=new G_,this.group.add(this.rig.root),this.input=$m()}update(e,t,n,r){let i=e.px+(t.px-e.px)*n,a=e.py+(t.py-e.py)*n,o=e.pz+(t.pz-e.pz)*n,s=r===void 0?this.clockDt():r;t.dead===1?this.mantle.cancel():this.hasDrawn&&this.input.events&256&&this.mantle.start(this.drawnX-i,this.drawnY-a,this.drawnZ-o),this.mantle.step(s),this.drawnX=i+this.mantle.ox,this.drawnY=a+this.mantle.oy,this.drawnZ=o+this.mantle.oz,this.mantleOx=this.mantle.ox,this.mantleOy=this.mantle.oy,this.mantleOz=this.mantle.oz,this.hasDrawn=!0,this.group.position.set(this.drawnX,this.drawnY,this.drawnZ);let c=(t.yaw-e.yaw)%Y_;c>Math.PI&&(c-=Y_),c<-Math.PI&&(c+=Y_);let l=e.yaw+c*n;this.group.rotation.y=l;let u=this.input;u.state=t.dead===1?2:t.mode,u.speed=Math.sqrt(t.vx*t.vx+t.vz*t.vz),u.vy=t.vy,u.deadCause=t.deadCause,u.dt=s,this.rig.yaw=l,J_(this.rig,u)}clockDt(){let e=performance.now(),t=this.lastMs<0?0:(e-this.lastMs)/1e3;return this.lastMs=e,t<0?0:t>X_?X_:t}},Q_=.012,$_=.18;function ev(e,t,n,r,i,a,o,s,c,l){let u=r-e,d=i-t,f=a-n,p=u*u+d*d+f*f,m=p>1e-9?((o-e)*u+(s-t)*d+(c-n)*f)/p:1;m=m<0?0:m>1?1:m;let h=Math.sqrt(p)*Q_;return l[0]=e+u*m,l[1]=t+d*m-4*h*m*(1-m),l[2]=n+f*m,m}var tv=class{ox=0;oy=0;oz=0;w=0;tx=0;ty=0;tz=0;step(e,t,n,r,i){e&&(this.tx=t,this.ty=n,this.tz=r);let a=i/$_;this.w=e?Math.min(1,this.w+a):Math.max(0,this.w-a);let o=this.w*this.w*(3-2*this.w);this.ox=this.tx*o,this.oy=this.ty*o,this.oz=this.tz*o}reset(){this.w=0,this.ox=0,this.oy=0,this.oz=0}},nv=7230002,rv=11569232,iv=16762938,av=7029798,ov=4860956,sv=9063224,cv=.9,lv=.18,uv=.72,dv=40,fv=8,pv=.06,mv=.8,hv={x:0,y:0,z:0,anchorId:-1,set:!1,live:!1},gv=new J,_v=new J,vv=new J;gv.setHex(nv),_v.setHex(rv),vv.setHex(iv);function yv(e,t,n,r){return r.copy((e+t)%3==0?gv:_v).lerp(vv,n)}function bv(e,t,n=null){let r=e.getAttribute(`position`),i=new Float32Array(r.count*3),a=new J().setHex(t);for(let e=0;e<r.count;e++){let t=1;if(n!==null){let i=(r.getY(e)-n)/cv;i-Math.floor(i)<lv&&(t=uv)}i[e*3]=a.r*t,i[e*3+1]=a.g*t,i[e*3+2]=a.b*t}e.setAttribute(`color`,new gc(i,3))}function xv(e,t,n,r,i,a,o,s=1,c=null){let l=Sv(new nu(r-e,i-t,a-n,1,s,1));return l.translate((e+r)/2,(t+i)/2,(n+a)/2),bv(l,o,c),l}function Sv(e){return e.deleteAttribute(`uv`),e}function Cv(e,t,n,r,i,a){let o=new Float32Array(1107),s=new Float32Array(1107),c=new Float32Array(1107),l=Math.hypot(r-e,i-t,a-n)*Q_,u=[],d=[],f=[];for(let o=0;o<=dv;o++){let s=o/dv;u.push(e+(r-e)*s),d.push(t+(i-t)*s-4*l*s*(1-s)),f.push(n+(a-n)*s)}let p=new J;for(let e=0;e<=dv;e++){let t=Math.max(0,e-1),n=Math.min(dv,e+1),r=u[n]-u[t],i=d[n]-d[t],a=f[n]-f[t],l=Math.hypot(r,i,a)||1;r/=l,i/=l,a/=l;let m=-a,h=r,g=Math.hypot(m,0,h);g<1e-6?(m=1,h=0):(m/=g,h/=g);let _=i*h-a*0,v=a*m-r*h,y=r*0-i*m,b=e/dv,x=b>mv?(b-mv)/.19999999999999996:0;for(let t=0;t<=fv;t++){let n=t/fv*Math.PI*2,r=Math.cos(n),i=Math.sin(n),a=r*m+i*_,l=r*0+i*v,g=r*h+i*y,b=(e*9+t)*3;o[b]=u[e]+a*pv,o[b+1]=d[e]+l*pv,o[b+2]=f[e]+g*pv,s[b]=a,s[b+1]=l,s[b+2]=g,yv(e,t,x,p),c[b]=p.r,c[b+1]=p.g,c[b+2]=p.b}}let m=[];for(let e=0;e<dv;e++)for(let t=0;t<fv;t++){let n=e*9+t,r=(e+1)*9+t;m.push(n,n+1,r+1,n,r+1,r)}let h=new Ac;return h.setAttribute(`position`,new gc(o,3)),h.setAttribute(`normal`,new gc(s,3)),h.setAttribute(`color`,new gc(c,3)),h.setIndex(m),h}function wv(e){let t=new Os;hv.set=!1,hv.live=!1,hv.anchorId=-1;let n=e.spawn,r=-1;for(let t=0;t<e.solids.length;t++){let i=e.solids[t];if(e.style[t]===2&&n.x>=i.min.x-1e-6&&n.x<=i.max.x+1e-6&&n.z>=i.min.z-1e-6&&n.z<=i.max.z+1e-6&&n.y>=i.min.y-1e-6&&n.y<=i.max.y+3){r=t;break}}if(r<0||e.route.length===0)return t;let i=e.solids[r],a=e.anchors[e.route[0]];if(!a)return t;let o=i.max.y,s=i.min.x-2.6,c=i.max.z-1.2,l=o-6,u=o+2.4,d=[],f=.17;d.push(xv(s-f,l,c-f,s+f,u,c+f,av,6,l));for(let e of[.4,1.2,1.9])d.push(xv(s-.2,o+e-.04,c-.2,s+.2,o+e+.04,c+.2,ov));d.push(xv(s-.23,u,c-.23,s+.23,u+.16,c+.23,ov));let p=Sv(new ou(.34,.32,4));p.rotateY(Math.PI/4),p.translate(s,u+.16+.16,c),bv(p,ov),d.push(p);for(let e of[2,2.15,2.3]){let t=Sv(new au(.25,.25,.08,8,1,!0));t.translate(s,o+e,c),bv(t,nv),d.push(t)}for(let e of[o-3.6,o-5.6])d.push(xv(s+f,e-.09,c-.11,i.min.x,e+.09,c+.11,ov));d.push(xv(s-.3,l-.4,c-.3,i.min.x,l,c+.3,sv));let m=s+.2,h=o+2.2;hv.x=m,hv.y=h,hv.z=c,hv.anchorId=e.route[0],hv.set=!0;let g=C_(d,!1);for(let e of d)e.dispose();let _=g.getIndex()?.count??0,v=Cv(m,h,c,a.px,a.py,a.pz),y=C_([g,v],!1);g.dispose(),v.dispose();let b=new X(y,new wu({vertexColors:!0}));return b.name=`ropePost`,b.frustumCulled=!1,b.userData.postIndexCount=_,b.onBeforeRender=()=>{y.setDrawRange(0,hv.live?_:1/0)},t.add(b),t}function Tv(e,t){let n=[];for(let r=0;r<e.lines.length;r++){let i=e.lines[r],a=e.anchors[i.anchorId];if(a===void 0)continue;let o=i.zone;n.push(Cv((o.min.x+o.max.x)/2,o.max.y+t,(o.min.z+o.max.z)/2,a.px,a.py,a.pz))}if(n.length===0)return null;let r=C_(n,!1);for(let e of n)e.dispose();let i=new X(r,new wu({vertexColors:!0}));return i.name=`lineRopes`,i.frustumCulled=!1,i}var Ev=Math.PI*2,Dv=.05,Ov=1.4,kv=4,Av=.035,jv=.02,Mv=.35,Nv=.27;function Pv(e){let t=e.geometry.getAttribute(`position`);if(t===void 0||t.itemSize!==3)return null;let n=t,r=n.array;return n.setUsage(so),{attr:n,arr:r,base:new Float32Array(r),n:n.count}}function Fv(e,t){let n=1/0,r=-1/0;for(let i=0;i<t;i++){let t=e[i*3+1];t<n&&(n=t),t>r&&(r=t)}return{yMin:n,yMax:r}}function Iv(e){let t=Pv(e);if(t===null)return;let{attr:n,arr:r,base:i,n:a}=t,{yMin:o}=Fv(i,a);e.onBeforeRender=()=>{let e=performance.now()/1e3,t=Ev*Ov*e;for(let e=0;e<a;e++){let n=e*3;i[n+1]>o||(r[n+2]=i[n+2]+Dv*Math.sin(t+kv*i[n]))}n.needsUpdate=!0}}function Lv(e){let t=Pv(e);if(t===null)return;let{attr:n,arr:r,base:i,n:a}=t,{yMin:o,yMax:s}=Fv(i,a),c=Math.max(1e-6,s-o);e.onBeforeRender=()=>{let e=performance.now()/1e3,t=Av*Math.sin(Ev*Mv*e),s=jv*Math.sin(Ev*Nv*e+1);for(let e=0;e<a;e++){let n=e*3,a=(i[n+1]-o)/c;r[n]=i[n]+t*a,r[n+2]=i[n+2]+s*a}n.needsUpdate=!0}}function Rv(e){e.traverse(e=>{let t=e;t.isMesh===!0&&(t.name===`decor_flag`?Iv(t):t.name===`decor_canopy`&&Lv(t))})}var zv=5,Bv=2.4,Vv=.5,Hv=Math.PI*2;function Uv(){let e=new Float32Array(60),t=[];for(let e=0;e<zv;e++){let n=e*4;t.push(n,n+2,n+3,n+1,n+3,n+2)}let n=new Ac,r=new gc(e,3);r.setUsage(so),n.setAttribute(`position`,r),n.setIndex(t);let i=new X(n,new Hc({color:`#2b1d1a`,side:2,fog:!1}));return i.name=`decor_birds`,i.frustumCulled=!1,i.onBeforeRender=(t,n,a)=>{let o=performance.now()/1e3;for(let t=0;t<zv;t++){let n=.12*o+Hv*t/zv,r=18+3*t,i=Math.cos(n),a=Math.sin(n),s=3*Math.sin(.7*o+t),c=Math.sin(.25*o+t)>-.3?.45*Math.sin(Hv*2.2*o+t):.15,l=i*r,u=a*r,d=Bv/2,f=Vv/2,p=t*12;e[p]=l+i*d,e[p+1]=s+c,e[p+2]=u+a*d,e[p+3]=l-i*d,e[p+4]=s+c,e[p+5]=u-a*d,e[p+6]=l-a*f,e[p+7]=s,e[p+8]=u+i*f,e[p+9]=l+a*f,e[p+10]=s,e[p+11]=u-i*f}r.needsUpdate=!0,i.position.set(a.position.x+60,a.position.y+22,a.position.z-115),i.updateMatrixWorld()},i}var Wv=Math.tan(20*Math.PI/180),Gv=-360,Kv=-150,qv=5,Jv=-260,Yv=210,Xv=100,Zv=Gv,Qv=Kv,$v=Jv;function ey(e,t=30){let n=e===null?Gv:e-t-Yv;Zv=Math.min(Gv,n),Zv===-360?(Qv=Kv,$v=Jv):(Qv=Zv+Yv,$v=Zv+Xv)}function ty(){return Zv}function ny(){return Qv}var ry=34,iy=52;function ay(e,t,n){let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)}var oy=null;function sy(e){oy=e}var cy=null;function ly(e){cy=e}function uy(e,t){let n=e.length;if(t>=e[0][0])return e[0][1]+(t-e[0][0])*(e[1][1]-e[0][1])/(e[1][0]-e[0][0]);for(let r=1;r<n;r++)if(t>=e[r][0]){let n=(t-e[r-1][0])/(e[r][0]-e[r-1][0]);return e[r-1][1]+n*(e[r][1]-e[r-1][1])}return e[n-1][1]}function dy(e){return oy===null?Wv*e+-8:uy(oy,e)}function fy(e,t){return .55*Math.sin(e*.045+1.7)*Math.cos(t*.038+.4)+.3*Math.sin(e*.11+t*.07+2.1)+.15*Math.sin(e*.27-t*.21)}var py=18,my=55,hy=24,gy=14,_y=3.5,vy=28;function yy(e,t){if(cy===null)return 0;let n=cy(e,t),r=py*(1-Math.exp(-n.d/my));return n.h+r-vy*ay(150,280,n.d)+1.6*fy(e,t)*ay(0,60,n.d)}function by(e){let t=e/_y,n=Math.floor(t);return _y*(n+ay(.2,.8,t-n))}function xy(e,t){if(cy!==null){let n=cy(e,t),r=ay(0,18,n.d);if(r<=0)return n.h;let i=yy(e,t),a=28*ay(20,44,e),o=(yy(e-28+a,t)+yy(e-gy+a,t)+i+yy(e+gy+a,t)+yy(e+28+a,t)+yy(e,t-gy)+yy(e,t+gy))/7,s=i+ay(4,30,n.d)*(o-i);s=Math.min(s,Math.max(n.h,dy(t))+hy);let c=s-n.h;return c>0&&(s=n.h+c+(1-ay(80,120,n.d))*(by(c)-c)),n.h+r*(s-n.h)}let n=dy(t);if(t<Qv){let e=Qv-t;if(n=dy(Qv)-qv*(1-Math.exp(-e/40)),t<$v){let e=$v-t;n+=6e-4*e*e}}else if(t>40){let e=t-40;n+=9e-4*e*e}let r=Math.abs(e),i=ay(ry,iy,r);if(i<=0)return n;let a=r-ry,o=.0014*a*a+.05*a;return n+i*(o+3.2*fy(e,t)*ay(ry,94,r))}var Sy=`#6b8a3e`,Cy=`#8f8a4c`,wy=`#857a50`,Ty=`#46703a`,Ey=`#3d5634`,Dy=`#2e452d`,Oy=`#7f8a5e`,ky=`#c4a45a`,Ay=new J(Sy),jy=new J(Cy),My=new J(wy),Ny=new J(Ty),Py=new J(Ey),Fy=new J(Dy),Iy=new J(Oy),Ly=new J(ky);function Ry(e,t,n,r,i,a,o){let s=new Set(o);for(let e=r;e<=i+1e-6;e+=n)s.add(Math.round(e*100)/100);let c=n;for(let e=i;e<t;)c*=a,e+=c,s.add(Math.min(t,Math.round(e*100)/100));c=n;for(let t=r;t>e;)c*=a,t-=c,s.add(Math.max(e,Math.round(t*100)/100));return s.add(e),s.add(t),Array.from(s).sort((e,t)=>e-t)}function zy(e,t){return(Math.imul((e+1)*7919,(t+3)*104729+17)>>>0)/4294967296}function By(e,t,n,r,i){let a=Math.abs(e),o=n-dy(t),s=n+1e3,c=Math.floor(s/3.5),l=zy(Math.floor(e/20)+500,Math.floor(t/20)+500+c);r.copy(Ay),c%2==1?r.lerp(Ly,.65+.3*l):l>.6&&r.lerp(Ly,.3*(l-.6)*2.5),s%3.5>3&&r.lerp(jy,.6),a<14&&r.lerp(My,.18*i);let u=Math.min(1,Math.max(0,(a-36)/40));r.lerp(Ny,u*(.5+.5*i));let d=Math.max(Math.min(1,Math.max(0,(o-18)/50)),Math.min(1,Math.max(0,(a-50)/60)));r.lerp(Py,d);let f=Math.max(Math.min(1,Math.max(0,(o-55)/70)),Math.min(1,Math.max(0,(a-110)/90)));r.lerp(Fy,f);let p=Math.min(1,Math.max(0,(Math.hypot(e,t)-160)/160));return r.lerp(Iy,.55*p),r.multiplyScalar(.92+.14*i)}function Vy(){let e=Ry(-320,320,3,-42,42,1.12,[-34,34,0]),t=ty(),n=Ry(t,200,3,-156,46,1.12,[40,ny(),-104,26]);if(t<-360){for(let e=-156;e>ny()-12;e-=12)n.push(e);n.push(ny()),n=Array.from(new Set(n.map(e=>Math.round(e*100)/100))).sort((e,t)=>e-t)}let r=e.length,i=n.length,a=[],o=[],s=[],c=[],l=new J;for(let t=0;t<i;t++){let c=n[i-1-t];for(let n=0;n<r;n++){let r=e[n],i=xy(r,c);a.push(r,i,c),s.push(r/7,c/7),By(r,c,i,l,zy(t,n)),o.push(l.r,l.g,l.b)}}for(let e=0;e+1<i;e++)for(let t=0;t+1<r;t++){let n=e*r+t,i=n+1,a=n+r,o=a+1;c.push(n,i,a,i,o,a)}let u=new Ac;u.setAttribute(`position`,new Y(a,3)),u.setAttribute(`color`,new Y(o,3)),u.setAttribute(`uv`,new Y(s,2)),u.setIndex(c),u.computeVertexNormals();let d=new X(u,new wu({vertexColors:!0}));return d.name=`decor_ground`,d.userData.tierMaps={low:{map:`terrace`},rich:{map:`terrace_hi`,normal:`terrace_hi`}},d}var Hy=`/bhaaag/assets/textures/`,Uy=new Map;function Wy(e,t=`jpg`){if(typeof document>`u`)return null;let n=Uy.get(e);return n||(n=new $u().load(Hy+e+`.`+t),n.wrapS=Ni,n.wrapT=Ni,n.colorSpace=to,n.anisotropy=4,Uy.set(e,n)),n}function Gy(e){if(typeof document>`u`)return null;let t=e+`_n`,n=Uy.get(t);return n||(n=new $u().load(Hy+t+`.jpg`),n.wrapS=Ni,n.wrapT=Ni,n.colorSpace=no,n.anisotropy=4,Uy.set(t,n)),n}var Ky=[`body`,`cornice`,`window`,`roof`,`rail`,`deck`,`tank`,`parapet`,`canopy`,`trunk`,`flag`,`shutter`,`pot`,`wallBrick`,`wallPlaster`,`bracket`,`planter`,`conifer`,`trim`,`stair`,`crate`,`guard`,`homeTank`,`homeTin`],qy={body:150,cornice:50,window:250,roof:40,rail:170,deck:28,tank:50,parapet:60,canopy:640,trunk:640,flag:260,shutter:60,pot:110,wallBrick:30,wallPlaster:20,bracket:155,planter:20,conifer:700,trim:700,stair:160,crate:60,guard:40,homeTank:50,homeTin:60},Jy=[`canopy`,`trunk`,`conifer`],Yy=10;function Xy(e){let t=Math.max(1,e/Yy),n={};for(let e=0;e<Ky.length;e++){let r=Ky[e];n[r]=Jy.includes(r)?qy[r]:Math.ceil(qy[r]*t)}return n}var Zy=.74*Math.SQRT2,Qy=2.18,$y=2.4,eb=.9,tb=1.05;function nb(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function rb(e,t){let n=e.getAttribute(`position`),r=[];for(let e=0;e<n.count;e++){let i=t(n.getY(e));r.push(i[0],i[1],i[2])}e.setAttribute(`color`,new Y(r,3))}function ib(e,t){rb(e,()=>[t,t,t])}function ab(e,t){let n=new J(t);rb(e,()=>[n.r,n.g,n.b])}function ob(e,t,n){let r=Math.max(1e-6,n-t);rb(e,e=>{let n=.6+.4*Math.min(1,Math.max(0,(e-t)/r))**.75;return[n,n,n]})}function sb(e,t,n,r,i,a,o=[]){let s=new nu(e,t,n);if(s.translate(r,i,a),s.deleteAttribute(`uv`),o.length>0){let e=s.index,t=[];for(let n=0;n<6;n++)if(!(o.indexOf(n)>=0))for(let r=0;r<6;r++)t.push(e.getX(n*6+r));s.setIndex(t)}return s}function cb(e){let t=C_(e,!1);for(let t=0;t<e.length;t++)e[t].dispose();return t}function lb(){let e=new nu(1,1,1);return e.translate(0,.5,0),e.deleteAttribute(`uv`),ob(e,0,1),e}function ub(e){let t=new nu(1,1,1);return t.translate(0,.5,0),ob(t,0,1),hb(t,e,e),t}var db=[52/256,1-12/256],fb=2;function pb(){let e=new nu(1,1,1);e.translate(0,.5,0),ob(e,0,1);let t=e.getAttribute(`uv`);for(let e=0;e<t.count;e++){let n=Math.floor(e/4);n===2||n===3?t.setXY(e,db[0],db[1]):t.setXY(e,t.getX(e)*fb,t.getY(e))}return e}function mb(){let e=new nu(1,1,1);return e.translate(0,.5,0),ob(e,0,1),hb(e,3,2),e}function hb(e,t,n){let r=e.getAttribute(`uv`);for(let e=0;e<r.count;e++)r.setXY(e,r.getX(e)*t,r.getY(e)*n)}function gb(e){return e.deleteAttribute(`uv`),ib(e,1),e}function _b(){let e=[],t=(t,n)=>{n===null?ob(t,0,tb):ib(t,n),e.push(t)};t(sb($y,.06,.06,0,.87,0),null),t(sb($y,.06,.06,0,.25,0),null);for(let e=0;e<6;e++)t(sb(.05,eb,.05,-1+e*.4,eb/2,0,[2,3]),null);return t(sb(.12,tb,.12,-1.14,tb/2,0),null),t(sb(.12,tb,.12,1.14,tb/2,0),null),t(sb($y,.18,.03,0,.71,0),.7),cb(e)}function vb(){let e=sb(1,1,1,0,.5,0,[5]);ob(e,0,1);let t=new uu(.76,.8);t.translate(0,.5,.75),t.deleteAttribute(`uv`),ib(t,.4);let n=sb(1.2,.08,1.6,0,-.04,.3,[5]);ib(n,.72);let r=sb(1.3,.1,1.5,0,1.06,.25,[5]);ib(r,.85);let i=sb(1,.08,1.3,0,1.15,.2,[5]);ib(i,1);let a=[e,t,n,r,i];for(let e=0;e<2;e++){let t=new uu(.05,.8);t.translate(-.13+e*.26,.5,.76),t.deleteAttribute(`uv`),ib(t,.15),a.push(t);let n=new uu(.76,.05);n.translate(0,.37+e*.26,.76),n.deleteAttribute(`uv`),ib(n,.15),a.push(n)}return cb(a)}function yb(){let e=[0,.04,.1,.28,.49],t=[.5,.78,1,.88,1],n=new lu([new W(.56,0),new W(.74,.04),new W(.58,.1),new W(.34,.28),new W(0,.49)],4,Math.PI/4);return hb(n,12,2),rb(n,n=>{let r=0;for(let t=1;t<e.length;t++)Math.abs(e[t]-n)<Math.abs(e[r]-n)&&(r=t);let i=t[r];return[i,i,i]}),n}function bb(){let e=[];for(let t=-1;t<=1;t+=2)for(let n=-1;n<=1;n+=2){let r=sb(.08,1,.08,t*.42,.5,n*.42,[2,3]);ib(r,.55),e.push(r)}for(let t=-1;t<=1;t+=2){let n=new nu(.04,1.1,.04);n.rotateZ(.7),n.translate(0,.5,t*.42),n.deleteAttribute(`uv`),ib(n,.5),e.push(n)}let t=sb(.04,1.9,.04,.5,.95,.2,[2,3]),n=sb(.04,1.9,.04,.5,.95,-.2,[2,3]);ib(t,.5),ib(n,.5),e.push(t,n);for(let t=0;t<5;t++){let n=sb(.04,.04,.4,.5,.25+t*.35,0,[2,3]);ib(n,.5),e.push(n)}let r=sb(1,.08,1,0,1.04,0);ib(r,.55),e.push(r);let i=new au(.5,.5,1.1,8);return i.translate(0,1.08+.55,0),e.push(gb(i)),cb(e)}function xb(){let e=new cu(1,1),t=e.getAttribute(`position`);for(let e=0;e<t.count;e++){let n=t.getX(e),r=t.getY(e),i=t.getZ(e),a=1+(nb((Math.imul(Math.round(n*1e3),73856093)^Math.imul(Math.round(r*1e3),19349663)^Math.imul(Math.round(i*1e3),83492791))>>>0)()*2-1)*.06;t.setXYZ(e,n*a,r*a,i*a)}return gb(e)}function Sb(){let e=sb(.45,1.3,.04,-.705,.65,.02,[5]),t=sb(.45,1.3,.04,.705,.65,.02,[5]);return ib(e,.8),ib(t,.8),cb([e,t])}function Cb(){let e=new au(.16,.12,.28,6,1,!0);e.translate(0,.14,0),e.deleteAttribute(`uv`);let t=e.toNonIndexed();e.dispose(),ab(t,`#9a4a2e`);let n=new cu(.24,0);return n.translate(0,.42,0),n.deleteAttribute(`uv`),ab(n,`#5d7a3a`),cb([t,n])}function wb(){let e=sb(.1,.5,.1,0,.25,.05),t=sb(.1,.07,.5,0,.465,.25),n=new nu(.07,.07,.5);return n.rotateX(-.75),n.translate(0,.25,.22),n.deleteAttribute(`uv`),ib(e,.9),ib(t,1),ib(n,.8),cb([e,t,n])}function Tb(){let e=sb(1.2,.35,.4,0,.175,0);ib(e,.55);let t=[e.toNonIndexed()];e.dispose();for(let e=0;e<2;e++){let n=new cu(.3,0);n.translate(-.3+e*.6,.5,0),n.deleteAttribute(`uv`),ab(n,e===0?`#5d7a3a`:`#6f8a3f`),t.push(n)}return cb(t)}function Eb(){let e=[];for(let t=0;t<2;t++){let n=new ou(t===0?1:.64,t===0?.62:.55,6,1,!0);n.translate(0,t===0?.31:.725,0),n.deleteAttribute(`uv`);let r=n.toNonIndexed();n.dispose(),ob(r,0,1),e.push(r)}return cb(e)}function Db(){let e=sb(1,1,1,0,.5,0);return rb(e,e=>{let t=.7+.3*e;return[t,t,t]}),e}function Ob(){let e=sb(.94,.94,.94,0,.5,0);ob(e,0,1);let t=[e];for(let e=-1;e<=1;e+=2)for(let n=-1;n<=1;n+=2){let r=sb(.08,1,.08,e*.46,.5,n*.46);ib(r,.6),t.push(r)}return cb(t)}function kb(){let e=new au(.15,.2,1,5,1,!0);e.translate(0,.5,0);let t=new uu(.35,.25);return{body:lb(),cornice:lb(),window:vb(),roof:yb(),rail:_b(),guard:_b(),deck:lb(),tank:bb(),parapet:lb(),canopy:xb(),trunk:gb(e),flag:gb(t),shutter:Sb(),pot:Cb(),wallBrick:ub(2),wallPlaster:ub(1.5),bracket:wb(),planter:Tb(),conifer:Eb(),trim:lb(),stair:Db(),crate:Ob(),homeTank:bb(),homeTin:ub(1)}}function Ab(e){return e.index?e.index.count/3:e.getAttribute(`position`).count/3}var jb=new q,Mb=new Mo,Nb=new Mo,Pb=new G(1,0,0),Fb=new G,Ib=new G,Lb=new G(0,1,0),Rb=class{meshes;used;dropped;cap;constructor(e=0,t=!1){this.cap=Xy(e);let n=kb();t&&(n.tank.dispose(),n.tank=ub(1),n.roof.dispose(),n.roof=mb(),n.wallPlaster.dispose(),n.wallPlaster=pb());let r=new wu({color:`#ffffff`,vertexColors:!0,flatShading:!0}),i=new wu({color:`#ffffff`,vertexColors:!0,flatShading:!0,side:2}),a=e=>new wu({color:`#ffffff`,vertexColors:!0,flatShading:!0,map:Wy(e),normalMap:Gy(e)}),o=a(`wall_brick`),s=a(`wall_plaster`),c=a(`roof_tile`),l={},u={},d={};for(let e=0;e<Ky.length;e++){let a=Ky[e],f=new Tl(n[a],a===`flag`||a===`pot`||a===`shutter`?i:a===`wallBrick`?o:t&&a===`wallPlaster`?s.clone():a===`wallPlaster`?s:t&&(a===`homeTin`||a===`tank`||a===`roof`)?r.clone():a===`roof`?c:r,this.cap[a]);f.name=`decor_`+(t&&a===`tank`?`homeStraw`:t&&a===`roof`?`homeRoof`:a),f.count=0,f.frustumCulled=!1,f.userData.cast=a===`wallBrick`||a===`wallPlaster`||a===`roof`,t&&(a===`homeTin`&&(f.userData.tierMaps={rich:{map:`tin`,normal:`tin`},boost:2.4,highBoost:1.3,normalStrength:.35}),a===`tank`&&(f.userData.tierMaps={rich:{map:`straw`,normal:`straw`},boost:2.2}),a===`roof`&&(f.userData.tierMaps={rich:{map:`roof_home`,normal:`roof_home`},boost:2.2,highBoost:1.3,normalStrength:.35}),a===`wallPlaster`&&(f.userData.tierMaps={low:{map:`wall_plaster`},rich:{map:`facade`,normal:`facade`}})),l[a]=f,u[a]=0,d[a]=0}this.meshes=l,this.used=u,this.dropped=d}add(e,t,n,r,i,a,o,s,c,l=0){let u=this.used[e];if(u>=this.cap[e])return this.dropped[e]++,!1;Fb.set(t,n,r),Mb.setFromAxisAngle(Lb,s),l!==0&&Mb.multiply(Nb.setFromAxisAngle(Pb,l)),Ib.set(i,a,o),jb.compose(Fb,Mb,Ib);let d=this.meshes[e];return d.setMatrixAt(u,jb),d.setColorAt(u,c),this.used[e]=u+1,!0}triangles(){let e=0;for(let t=0;t<Ky.length;t++){let n=Ky[t];e+=this.used[n]*Ab(this.meshes[n].geometry)}return e}finish(){let e=new Os;for(let t=0;t<Ky.length;t++){let n=Ky[t],r=this.meshes[n];r.count=this.used[n],r.instanceMatrix.needsUpdate=!0,r.instanceColor&&(r.instanceColor.needsUpdate=!0),r.count>0&&e.add(r)}return e}},zb=2.8,Bb=.5,Vb=[`#9c5640`,`#8c4a38`,`#a8634a`],Hb=[`#4a2c1c`,`#5a3622`],Ub=`#a99a88`,Wb=[`#26282c`,`#2e6b47`],Gb=[`#4a2c1c`,`#5a3622`,`#7c3e2e`,`#2e6b47`],Kb=`#8e8574`,qb=[`#d9c6aa`,`#cfb99a`,`#e0cfb4`,`#e6d9c0`,`#d8b98e`,`#c9a27a`,`#e3c9b0`,`#b9c4a0`,`#d4a89a`,`#c8c0a8`],Jb=[`#46683a`,`#587a3a`,`#3f5e34`,`#6a8a3e`],Yb=[`#2f4a2f`,`#35553a`,`#2a4430`,`#3b5a36`],Xb=`#4a3424`,Zb=.118,Qb=[`#6b8fb5`,`#8fae8a`,`#a98fb8`,`#7aa3a0`],$b=[`#2f62b8`,`#f2efe4`,`#c8322f`,`#2f8a4f`,`#d0a12e`],ex=`#3a2a20`;function tx(e,t,n){return xy(t,n)}function nx(e){let t=e.spawn.z;for(let n=0;n<e.solids.length;n++)(n<e.style.length?e.style[n]:1)===2&&e.solids[n].max.z>t&&(t=e.solids[n].max.z);return{zMin:e.goal.min.z-8,zMax:t+8}}function rx(e,t){let n=Bb;for(let r=0;r<e.solids.length;r++){let i=e.solids[r];if(!(t.max[0]<=i.min.x-n||t.min[0]>=i.max.x+n)&&!(t.max[2]<=i.min.z-n||t.min[2]>=i.max.z+n)&&!(t.min[1]>=i.max.y-.001)&&!(t.max[1]<=i.min.y-n||t.min[1]>=i.max.y+n))return!0}for(let r=0;r<e.roofs.length;r++){let i=e.roofs[r].aabb;if(!(t.max[0]<=i.min.x-n||t.min[0]>=i.max.x+n)&&!(t.max[2]<=i.min.z-n||t.min[2]>=i.max.z+n)&&!(t.max[1]<=i.min.y-n||t.min[1]>=i.max.y+n))return!0}return!1}function ix(e,t){let n=nx(e);if(t.max[2]<=n.zMin||t.min[2]>=n.zMax||t.min[0]>=4.5||t.max[0]<=-4.5)return!1;if(t.kind!==`tree`)return!0;let r=(t.min[0]+t.max[0])/2,i=(t.min[2]+t.max[2])/2;return t.max[1]>tx(e,r,i)+6+1e-6}var ax=class{world;rng;kit;boxes=[];strings=[];tmp=new J;fx=nb(31249);onHouse=!1;constructor(e,t,n=0){this.world=e,this.rng=t,this.kit=new Rb(n)}room(e,t){return this.kit.used[e]+t<=.9*this.kit.cap[e]}U(e,t){return e+(t-e)*this.rng()}pick(e){return e[Math.min(e.length-1,Math.floor(this.rng()*e.length))]}col(e){return this.tmp.set(e).multiplyScalar(1+this.U(-.05,.05))}colRaw(e){return this.tmp.set(e)}rec(e,t,n){let r={kind:e,min:[t[0],t[1],t[2]],max:[n[0],n[1],n[2]]};this.onHouse&&(r.house=!0),this.boxes.push(r)}box(e,t,n,r,i,a,o,s,c){let l=this.kit.add(e,(n+a)/2,r,(i+s)/2,a-n,o-r,s-i,0,c);return l&&this.rec(t,[n,r,i],[a,o,s]),l}roof(e,t,n,r,i,a,o,s){this.kit.add(`roof`,t,n,r,i/Zy,o/.49,a/Zy,0,s)&&this.rec(e,[t-i/2,n,r-a/2],[t+i/2,n+o,r+a/2])}tank(e,t,n,r,i,a){this.kit.add(`tank`,e,t,n,2*r,i/2.18,2*r,0,a)&&this.rec(`tank`,[e-r,t,n-r],[e+r,t+i,n+r])}conifer(e,t,n,r,i,a,o){this.kit.add(`conifer`,t,n,r,i,a,i,0,o)&&this.rec(e,[t-i,n,r-i],[t+i,n+a,r+i])}canopy(e,t,n,r,i,a){this.kit.add(`canopy`,t,n,r,i,i,i,0,a)&&this.rec(e,[t-i,n-i,r-i],[t+i,n+i,r+i])}trunk(e,t,n,r,i,a){this.kit.add(`trunk`,t,n,r,1,i,1,0,a)&&this.rec(e,[t-.2,n,r-.2],[t+.2,n+i,r+.2])}rail(e,t,n,r,i,a){if(!this.kit.add(`rail`,e,t,n,r/2.4,1,1,i?Math.PI/2:0,a))return;let o=i?.04:r/2,s=i?r/2:.04;this.rec(`rail`,[e-o,t,n-s],[e+o,t+tb,n+s])}flag(e,t,n,r,i=Math.PI/2){if(!this.kit.add(`flag`,e,t,n,1,1,1,i,r))return;let a=Math.abs(Math.cos(i))*.175+Math.abs(Math.sin(i))*.02,o=Math.abs(Math.sin(i))*.175+Math.abs(Math.cos(i))*.02;this.rec(`flag`,[e-a,t-.125,n-o],[e+a,t+.125,n+o])}planter(e,t,n){this.kit.add(`planter`,e,t,n,1,1,1,Math.PI/2,this.tmp.setScalar(this.U(.9,1)))&&this.rec(`pot`,[e-.3,t,n-.65],[e+.3,t+.85,n+.65])}pot(e,t,n){this.kit.add(`pot`,e,t,n,1,1,1,0,this.tmp.setScalar(this.U(.88,1)))&&this.rec(`pot`,[e-.24,t,n-.24],[e+.24,t+.66,n+.24])}facing(e,t,n,r,i,a,o,s,c,l){let u=e===`window`,d=u?.5*c:0,f=e===`bracket`,p=u?.6*o:f?.06:.93,m=u?1.6*c:f?.5:.04,h=u?i-.08*s:i,g=u?i+s:f?i+.5:i+1.3,_=0,v=r,y=a;n===`x-`?(_=-Math.PI/2,v=r-d):n===`x+`?(_=Math.PI/2,v=r+d):n===`z+`?y=a+d:(_=Math.PI,y=a-d),this.kit.add(e,v,i,y,o,s,c,_,l)&&(n===`x-`?this.rec(t,[r-m,h,a-p],[r,g,a+p]):n===`x+`?this.rec(t,[r,h,a-p],[r+m,g,a+p]):n===`z+`?this.rec(t,[r-p,h,a],[r+p,g,a+m]):this.rec(t,[r-p,h,a-m],[r+p,g,a]))}allowed(e,t,n){let r={kind:e,min:[t[0],t[1],t[2]],max:[n[0],n[1],n[2]]};return!ix(this.world,r)&&!rx(this.world,r)}};function ox(e,t){let n=(t.max.x-t.min.x)*(t.max.z-t.min.z);for(let r=0;r<e.solids.length;r++){if((r<e.style.length?e.style[r]:1)!==1)continue;let i=e.solids[r];if(Math.abs(i.max.y-t.min.y)>.1)continue;let a=Math.min(t.max.x,i.max.x)-Math.max(t.min.x,i.min.x),o=Math.min(t.max.z,i.max.z)-Math.max(t.min.z,i.min.z);if(a>0&&o>0&&a*o>=.5*n)return i}return null}function sx(e){let t=[];for(let n=1;n<e.solids.length;n++){let r=n<e.style.length?e.style[n]:1,i=e.solids[n];if(r===2&&i.max.x-i.min.x>=6){let n=ox(e,i);if(n===null)continue;t.push({x0:i.min.x,x1:i.max.x,z0:i.min.z,z1:i.max.z,yBase:n.min.y,yE:i.min.y,top:i.max.y,decoy:!1})}else r===3&&i.max.y-i.min.y>5&&t.push({x0:i.min.x,x1:i.max.x,z0:i.min.z,z1:i.max.z,yBase:i.min.y,yE:i.max.y,top:i.max.y,decoy:!0})}return t.sort((e,t)=>t.z1-e.z1),t}var cx=xy,lx=!1;function ux(e,t,n){let r=cx(t,n);for(let i=0;i<e.length;i++){let a=e[i];t>a.x0&&t<a.x1&&n>a.z0&&n<a.z1&&a.top>r&&(r=a.top)}return r}function dx(e,t,n,r){let i=Math.sqrt((n[0]-t[0])**2+(n[2]-t[2])**2),a=(r?.05:.08)*i,o=r?Qb:$b,s=Math.atan2(-(n[2]-t[2]),n[0]-t[0]),c=t[0],l=t[1],u=t[2];for(let r=1;r<=12;r++){let i=r/12,o=t[0]+(n[0]-t[0])*i,s=t[1]+(n[1]-t[1])*i-a*4*i*(1-i),d=t[2]+(n[2]-t[2])*i;e.strings.push(c,l,u,o,s,d),c=o,l=s,u=d}let d=e.world;for(let r=0;r<12;r++){let i=(r+.5)/12,c=t[0]+(n[0]-t[0])*i,l=t[1]+(n[1]-t[1])*i-a*4*i*(1-i)-.2,u=t[2]+(n[2]-t[2])*i,f=!1;for(let e=0;e<d.anchors.length;e++){let t=d.anchors[e],n=t.px-c,r=t.py-l,i=t.pz-u;n*n+r*r+i*i<9&&(f=!0)}f||e.flag(c,l,u,e.colRaw(o[r%o.length]),s+r%2*Math.PI)}}var fx=1.5;function px(e,t){let n=e.world;e.onHouse=!0;let r=[`x-`,`x+`,`z+`,`z-`],i={"x-":[-1,0],"x+":[1,0],"z+":[0,1],"z-":[0,-1]};for(let a=0;a<t.length;a++){let o=t[a],{x0:s,x1:c,z0:l,z1:u,yBase:d,yE:f}=o,p=(s+c)/2,m=(l+u)/2,h=t.some(e=>e!==o&&Math.abs(e.z1-l)<.05&&e.x0<c&&e.x1>s),g=h?l:l-.05;if(!o.decoy){let t=Math.min(1.5,f-d-4);e.box(`wallBrick`,`base`,s-.08,d,h?l:l-.08,c+.08,d+t,u+.08,e.col(Vb[a%3])),e.box(`wallPlaster`,`plaster`,s-.05,d+t,g,c+.05,f-.35,u+.05,e.col(qb[(a*3+1)%qb.length])),e.box(`cornice`,`cornice`,s-.12,d+t-.05,h?l:l-.12,c+.12,d+t+.2,u+.12,e.colRaw(Hb[1])),e.box(`cornice`,`cornice`,s-.25,f-.35,h?l:l-.25,c+.25,f,u+.25,e.colRaw(Hb[0]))}for(let n=0;n<4;n++){let a=r[n],[m,h]=i[a],g=a===`z+`||a===`z-`,_=g?c-s:u-l,v=Math.floor(_/2.8),y=e=>[a===`x-`?s:a===`x+`?c:s+e,a===`z+`?u:a===`z-`?l:l+e];for(let n=0;n<3;n++){let r=d+n*zb+1;if(!(r+1.3>f-.45))for(let n=0;n<v;n++){let[i,s]=y(_*(n+.5)/v),c=-1/0;for(let e=-1;e<=1;e++){let n=i+m*.35+(g?e*.5:0),r=s+h*.35+(g?0:e*.5);c=Math.max(c,ux(t,n,r))}if(!(r<c+.3)){if(e.facing(`window`,`window`,a,i,r,s,.9,1.3,Zb,e.colRaw(e.pick(Hb))),!o.decoy&&e.room(`trim`,2)){let t=g?.62:.1,n=g?.1:.62,a=e.colRaw(Hb[1]),o=m*.14,c=h*.14;e.box(`trim`,`trim`,i-t+o,r+1.3,s-n+c,i+t+o,r+1.46,s+n+c,a),e.box(`trim`,`trim`,i-t+o,r-.16,s-n+c,i+t+o,r-.04,s+n+c,a)}!o.decoy&&e.fx()<.35&&e.facing(`shutter`,`shutter`,a,i,r,s,1,1,1,e.colRaw(e.pick(Gb)))}}}if(a===`z-`&&ux(t,p,l-.35)<=d+.2){if(e.box(`body`,`door`,p-.55,d,l-.1,p+.55,d+2.1,l,e.colRaw(Hb[0])),e.box(`body`,`step`,p-.9,d,l-.45,p+.9,d+.16,l-.1,e.colRaw(Kb)),!o.decoy&&e.room(`trim`,3)){let t=e.colRaw(Hb[1]);e.box(`trim`,`trim`,p-.7,d,l-.2,p-.55,d+2.3,l,t),e.box(`trim`,`trim`,p+.55,d,l-.2,p+.7,d+2.3,l,t),e.box(`trim`,`trim`,p-.7,d+2.1,l-.2,p+.7,d+2.3,l,t)}!o.decoy&&e.room(`pot`,2)&&(e.pot(p-1.5,lx?d:cx(p-1.5,l-.5),l-.5),e.pot(p+1.5,lx?d:cx(p+1.5,l-.5),l-.5))}if(!o.decoy){let n=Math.max(2,Math.floor(_/2.6));if(e.room(`bracket`,n))for(let r=0;r<n;r++){let[o,s]=y(_*(r+.5)/n);ux(t,o+i[a][0]*.3,s+i[a][1]*.3)>f-1||e.facing(`bracket`,`bracket`,a,o,f-.55,s,1,1,1,e.colRaw(Hb[1]))}}}if(o.decoy)continue;for(let t=1;t<n.solids.length;t++){if((t<n.style.length?n.style[t]:1)!==1)continue;let r=n.solids[t];if(r.max.y-r.min.y>.5||r.max.y>o.top-1||r.max.y<f-6||r.min.z<l-.001||r.max.z>u+.001)continue;let i=Math.abs(r.min.x-c)<.001?1:Math.abs(r.max.x-s)<.001?-1:0;if(i===0)continue;let a=r.max.y,d=i>0?r.max.x-.08:r.min.x+.08,p=r.max.z-r.min.z,h=Math.ceil(p/$y);if(e.room(`rail`,h+2)){for(let t=0;t<h;t++)e.rail(d,a,r.min.z+p/h*(t+.5),p/h,!0,e.colRaw(Hb[0]));e.rail((r.min.x+r.max.x)/2,a,r.min.z+.05,r.max.x-r.min.x,!1,e.colRaw(Hb[0])),e.rail((r.min.x+r.max.x)/2,a,r.max.z-.05,r.max.x-r.min.x,!1,e.colRaw(Hb[0]))}e.pot((r.min.x+r.max.x)/2,a,m-1.2),e.pot((r.min.x+r.max.x)/2,a,m+1.2);for(let t=0;t<3;t++)e.facing(`bracket`,`bracket`,i>0?`x+`:`x-`,i>0?c:s,a-.8,r.min.z+p*(t+.5)/3,1,1,1,e.colRaw(Hb[1]))}let _=o.top;e.box(`parapet`,`parapet`,s,_,u-.2,c,_+.2,u,e.colRaw(Ub));let v=s+1.1,y=m-.8,b=_;if(e.room(`rail`,40))for(let t=0;t<n.solids.length;t++){let r=n.solids[t];if((t<n.style.length?n.style[t]:1)===4&&!(Math.abs(r.min.y-_)>.001)&&!(r.min.x<s-.001||r.max.x>c+.001||r.min.z<l-.001||r.max.z>u+.001)){if(r.max.y-r.min.y>.5)v=(r.min.x+r.max.x)/2,y=(r.min.z+r.max.z)/2,b=r.max.y;else if(r.max.z-r.min.z>r.max.x-r.min.x){let t=(r.min.x+r.max.x)/2,n=Math.max(1,Math.ceil((r.max.z-r.min.z)/$y));for(let i=0;i<n;i++)e.rail(t,_+.4,r.min.z+(r.max.z-r.min.z)*(i+.5)/n,(r.max.z-r.min.z)/n,!0,e.colRaw(Hb[0]))}}}let x=(e,t,r)=>{let i=[...n.tramps,...n.cushions];for(let e=0;e<n.lines.length;e++)i.push(n.lines[e].zone);for(let n of i)if(e>n.min.x-r&&e<n.max.x+r&&t>n.min.z-r&&t<n.max.z+r)return!1;return!0};x(v,y,.7)&&e.tank(v,b,y,.5,Qy*.8,e.colRaw(e.pick(Wb))),x(v,m+1.6,.7)&&e.room(`planter`,1)&&e.planter(v,_,m+1.6),x(v,u-.8,.4)&&e.pot(v,_,u-.8)}e.onHouse=!1}function mx(e,t){let n=t.filter(e=>!e.decoy);e.onHouse=!0;let r=new Map,i=(t,n,i,a)=>{let o=`${a}:${n}:${i.toFixed(2)}`,s=r.get(o);if(s!==void 0)return s;let c=n*((t.x1-t.x0)/2-.15)+(t.x0+t.x1)/2;e.trunk(`mast`,c,t.top+.4,i,fx,e.colRaw(Hb[0]));let l=[c,t.top+.4+fx,i];return r.set(o,l),l};for(let t=0;t+1<n.length;t++){let r=n[t],a=n[t+1],o=Math.abs(a.z1-r.z0)<.05,s=t%2==0?1:-1;if(!e.room(`flag`,12))break;dx(e,i(r,s,(r.z0+r.z1)/2,`h`+t),i(a,s,(a.z0+a.z1)/2,`h`+(t+1)),!1),o||dx(e,i(r,-s,(r.z0+r.z1)/2,`h`+t),i(a,-s,(a.z0+a.z1)/2,`h`+(t+1)),!1)}for(let t=1;t<n.length;t+=2){let r=n[t];if(!e.room(`flag`,12))break;let a=t%4==1?-1:1;dx(e,i(r,a,r.z0+1,`l`+t),i(r,a,r.z1-1,`l`+t),!0)}e.onHouse=!1}function hx(e,t,n,r){for(let i=0;i<e.length;i++){let a=e[i];if(t>a.x0-r&&t<a.x1+r&&n>a.z0-r&&n<a.z1+r)return!0}return!1}function gx(e,t,n,r,i,a,o){let s=xy(t,n),c=2+.4*r,l=s+c+r*.6;return!e.room(`canopy`,1)||!e.room(`trunk`,1)||!e.allowed(i,[t-r,s,n-r],[t+r,l+r,n+r])?!1:(e.trunk(i,t,s-.3,n,c+.3,e.colRaw(Xb)),e.canopy(i,t,l,n,r,e.col(Jb[o]).multiplyScalar(a)),!0)}function _x(e,t,n,r,i,a,o){let s=xy(t,n),c=r*3.4;return!e.room(`conifer`,1)||!e.allowed(i,[t-r,s,n-r],[t+r,s+c,n+r])?!1:(e.conifer(i,t,s-.4,n,r,c,e.col(Yb[o]).multiplyScalar(a)),!0)}function vx(e,t,n){let r=nb(n^32485);for(let n=-1;n<=1;n+=2)for(let i=24;i>-104;i-=11)for(let a=7;a<31;a+=11){let o=n*(a+(r()-.5)*6),s=i+(r()-.5)*7,c=1.3+.9*r(),l=Math.floor(r()*Jb.length),u=.95+.1*r(),d=r();if(!(d<.35)&&!hx(t,o,s,3.5+c)&&!(Math.abs(o)>31.5-c)){if(d<.55)_x(e,o,s,c*.9,`tree`,u,l);else if(d<.9)gx(e,o,s,c,`tree`,u,l);else{let t=.6+.4*r(),n=xy(o,s);e.allowed(`tree`,[o-t,n,s-t],[o+t,n+t*1.6,s+t])&&e.room(`canopy`,1)&&e.canopy(`tree`,o,n+t*.7,s,t,e.col(Jb[l]))}}}}function yx(e,t){let n=nb(t^22441);for(let t=-1;t<=1;t+=2)for(let r=80;r>-300;r-=17){let i=40+26*n(),a=6+8*n();if(n()<.35)continue;if(!e.room(`body`,1))return;let o=t>0?i:-i-a,s=o+a,c=1/0,l=-1/0;for(let e=0;e<=4;e++){let t=xy(o+a*e/4,r);c=Math.min(c,t),l=Math.max(l,t)}e.allowed(`terrace`,[o,c-.3,r-.3],[s,l+.9,r+.3])&&e.box(`body`,`terrace`,o,c-.3,r-.3,s,l+.8,r+.3,e.col(Kb))}}function bx(e,t,n){let r=nb(n^986711),i=[];for(let e=-1;e<=1;e+=2)for(let t=194;t>Gv+6;t-=9)for(let n=37;n<314;){let a=n<110?8:n<190?13:20,o=e*(n+(r()-.5)*a*.8),s=t+(r()-.5)*7,c=r(),l=r(),u=r(),d=r();n+=a;let f=Math.abs(o),p=.82-.5*Math.min(1,(f-37)/280);if(s<-140&&f<90&&l<.55||l>p)continue;let m=xy(o,s)-dy(s),h=f>110?1.45:1,g=f>60?d<.65:m>50||m>22&&d<(m-22)/28;i.push({x:o,z:s,r:(g?1.7+.8*c:2.3+1.1*c)*h,con:g,tint:.94+.12*u,pick:Math.floor(d*4)%4})}for(let e=0;e<60;e++){let n=(e%2==0?1:-1)*(8+26*r()),a=r()<.5?30+80*r():-112-120*r();hx(t,n,a,4)||i.push({x:n,z:a,r:1.6+1.2*r(),con:r()<.4,tint:.95+.1*r(),pick:Math.floor(r()*4)})}for(let e=i.length-1;e>0;e--){let t=Math.floor(r()*(e+1)),n=i[e];i[e]=i[t],i[t]=n}let a={canopy:e.kit.used.canopy,trunk:e.kit.used.trunk,conifer:e.kit.used.conifer};for(let t=0;t<i.length;t++){let n=i[t];n.con?_x(e,n.x,n.z,n.r,`tree`,n.tint,n.pick):gx(e,n.x,n.z,n.r,`tree`,n.tint,n.pick)}return[a.canopy,a.trunk,a.conifer]}function xx(e,t=1729,n={}){let r=n.scenery!==!1,i=n.houseDress!==!1,a=sx(e),o=new ax(e,nb(t),a.length),s=new Os;s.name=`decor`;let c,l=n.floorY;lx=l!==void 0&&!r,cx=r?xy:l===void 0?(e,t)=>dy(t):()=>l;try{i&&(px(o,a),mx(o,a)),r?(vx(o,a,t),yx(o,t),c=bx(o,a,t)):c=[o.kit.used.canopy,o.kit.used.trunk,o.kit.used.conifer]}finally{cx=xy}s.add(o.kit.finish());let u=r?Vy():null;if(u!==null&&s.add(u),o.strings.length>0){let e=new Ac;e.setAttribute(`position`,new Y(o.strings,3));let t=new Wl(e,new Ml({color:new J(ex)}));t.name=`decor_strings`,t.frustumCulled=!1,s.add(t)}r&&s.add(Uv());let d=Object.values(o.kit.meshes).filter(e=>e.count>0).length,f=u!==null&&u.geometry.index!==null?u.geometry.index.count/3:0,p={triangles:o.kit.triangles()+f+10,instancedMeshes:d,drawCalls:d+1+ +(o.strings.length>0)+1,dropped:Ky.reduce((e,t)=>e+o.kit.dropped[t],0)},m={canopy:o.kit.used.canopy,trunk:o.kit.used.trunk,conifer:o.kit.used.conifer},h=[`canopy`,`trunk`,`conifer`];return s.userData.setForestDensity=e=>{for(let t=0;t<h.length;t++){let n=h[t];o.kit.meshes[n].count=c[t]+Math.floor((m[n]-c[t])*Math.min(1,Math.max(0,e)))}},s.userData.boxes=o.boxes,s.userData.stats=p,Rv(s),s}var Sx=`#a8664c`,Cx=1,wx=2,Tx=.12,Ex=.7;function Dx(e,t,n){let r=[];for(let i=0;i<e.solids.length;i++){let a=e.solids[i];a.max.x-a.min.x<6||a.max.y-a.min.y<4||n<=a.min.z-.7||t>=a.max.z+.7||(n>a.min.z&&t<a.max.z?r.push([a.min.x-Ex,a.min.x],[a.max.x,a.max.x+Ex]):r.push([a.min.x-Ex,a.max.x+Ex]))}r.sort((e,t)=>e[0]-t[0]);let i=[];for(let e of r){let t=i[i.length-1];t!==void 0&&e[0]<=t[1]?t[1]=Math.max(t[1],e[1]):i.push([e[0],e[1]])}return i}function Ox(e,t){let n=[];for(let[r,i]of e)for(let[e,a]of t){let t=Math.max(r,e),o=Math.min(i,a);o-t>.05&&n.push([t,o])}return n}function kx(e,t){let n=[];for(let r=0;r<e.hazards.length;r++){let i=e.hazards[r],a=Math.max(i.min.x,-34),o=Math.min(i.max.x,34);if(!(o<=a))for(let r=i.min.z;r<i.max.z-1e-6;r+=Cx)Ax(e,t,n,a,o,r,Math.min(r+Cx,i.max.z))}return n}function Ax(e,t,n,r,i,a,o){{let s=[[r,i]];for(let e=0;e<t.length;e++){let n=t[e];if(n.z1<=a||n.z0>=o)continue;let r=[];for(let e=0;e<s.length;e++){let[t,i]=s[e];n.x1<=t||n.x0>=i?r.push([t,i]):(n.x0>t&&r.push([t,n.x0]),n.x1<i&&r.push([n.x1,i]))}s=r}s=Ox(s,Dx(e,a,o));for(let e=0;e<s.length;e++)n.push([s[e][0],a,s[e][1],o])}}function jx(e,t){let n=kx(e,t);if(n.length===0)return null;let r=[],i=[];for(let e=0;e<n.length;e++){let[t,a,o,s]=n[e],c=Math.max(1,Math.ceil((o-t)/wx)),l=r.length/3;for(let e=0;e<=c;e++){let n=t+(o-t)*e/c;r.push(n,xy(n,a)+Tx,a,n,xy(n,s)+Tx,s)}for(let e=0;e<c;e++){let t=l+2*e;i.push(t,t+3,t+2,t,t+1,t+3)}}let a=new Ac;a.setAttribute(`position`,new Y(r,3)),a.setIndex(i),a.computeVertexNormals();let o=new X(a,new wu({color:new J(Sx),flatShading:!0,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));return o.name=`gully`,o.userData.cast=!1,o}var Mx=.75,Nx=.12,Px=.16;function Fx(e,t,n,r,i,a,o=Mx,s=Nx){let c=Math.abs(a)>=Math.abs(i),l=s/2,u=r+Px/2,d=r-Px/2,f=o+l,p=[];for(let r of[-1,1]){let i=c?e+r*f:e,a=c?t:t+r*f;p.push([i-l,n,a-l,i+l,u,a+l])}let m=f+l;return p.push(c?[e-m,d,t-l,e+m,u,t+l]:[e-l,d,t-m,e+l,u,t+m]),p}var Ix=`#f1e9d2`,Lx=`#fbf6e6`,Rx=`#d8c9a0`,zx=`#ffc83a`,Bx=`#5a3622`,Vx=`#3a2c24`,Hx=1.4,Ux=.06,Wx=.1,Gx=.13,Kx=.02,qx=.14,Jx=.17,Yx=.15,Xx=.05,Zx=.13,Qx=.42,$x=.05,eS=class{pos=[];nor=[];col=[];idx=[];vert(e,t,n,r,i,a,o){let s=this.pos.length/3;return this.pos.push(e,t,n),this.nor.push(r,i,a),this.col.push(o.r,o.g,o.b),s}box(e,t){let n=new J(t),[r,i,a,o,s,c]=e,l=[[[0,1,0],[r,s,a,r,s,c,o,s,c,o,s,a]],[[0,-1,0],[r,i,a,o,i,a,o,i,c,r,i,c]],[[0,0,1],[r,i,c,o,i,c,o,s,c,r,s,c]],[[0,0,-1],[o,i,a,r,i,a,r,s,a,o,s,a]],[[1,0,0],[o,i,c,o,i,a,o,s,a,o,s,c]],[[-1,0,0],[r,i,a,r,i,c,r,s,c,r,s,a]]];for(let[e,t]of l){let r=this.vert(t[0],t[1],t[2],e[0],e[1],e[2],n),i=this.vert(t[3],t[4],t[5],e[0],e[1],e[2],n),a=this.vert(t[6],t[7],t[8],e[0],e[1],e[2],n),o=this.vert(t[9],t[10],t[11],e[0],e[1],e[2],n);this.idx.push(r,i,a,r,a,o)}}dome(e,t,n,r,i,a,o,s){let c=new J(o),l=new J(s),u=this.pos.length/3;for(let o=0;o<=4;o++){let s=o/4*(Math.PI/2),u=Math.cos(s),d=Math.sin(s),f=l.clone().lerp(c,Math.min(1,o/3));for(let s=0;s<(o===4?1:13);s++){let o=s/12*Math.PI*2,c=Math.cos(o)*u,l=Math.sin(o)*u;this.vert(e+c*r,t+d*i,n+l*a,c/r,d/i,l/a,f)}}let d=e=>u+e*13;for(let e=0;e<4;e++)for(let t=0;t<12;t++){let n=d(e)+t,r=n+1;if(e===3)this.idx.push(n,d(4),r);else{let i=d(e+1)+t,a=i+1;this.idx.push(n,i,r,r,i,a)}}}ring(e,t,n,r,i,a,o=28){let s=new J(a),c=this.pos.length/3;for(let a=0;a<=o;a++){let c=a/o*Math.PI*2,l=Math.cos(c),u=Math.sin(c);this.vert(e+l*r,t,n+u*r,0,1,0,s),this.vert(e+l*i,t,n+u*i,0,1,0,s)}for(let e=0;e<o;e++){let t=c+e*2;this.idx.push(t,t+3,t+1,t,t+2,t+3)}}get empty(){return this.idx.length===0}mesh(e){let t=new Ac;t.setAttribute(`position`,new Y(this.pos,3)),t.setAttribute(`normal`,new Y(this.nor,3)),t.setAttribute(`color`,new Y(this.col,3)),t.setIndex(this.idx);let n=new X(t,new wu({vertexColors:!0,emissive:new J(`#4a4538`)}));return n.name=e,n.userData.cast=!1,n}};function tS(e,t,n,r,i,a){let o=i-t,s=a-r;e.box([t,n-.02,r,i,n+Wx-Ux,a],Rx);let c=Math.max(1,Math.round(o/Hx)),l=Math.max(1,Math.round(s/Hx)),u=o/c,d=s/l;for(let i=0;i<l;i++)for(let a=0;a<c;a++){let o=(a+i)%2==0;e.dome(t+(a+.5)*u,n-Ux,r+(i+.5)*d,u*.62,.36,d*.62,o?Lx:Ix,Rx)}let f=n+Kx,p=f+.06;e.box([t,f,r,i,p,r+Gx],zx),e.box([t,f,a-Gx,i,p,a],zx),e.box([t,f,r+Gx,t+Gx,p,a-Gx],zx),e.box([i-Gx,f,r+Gx,i,p,a-Gx],zx)}function nS(e,t,n,r,i,a,o,s){let c=n-Yx,l=o+Yx,u=a-Yx,d=s+Yx,f=i+Xx,p=i+Jx,m=Zx,h=[[c,u],[l-m,u],[c,d-m],[l-m,d-m]];for(let[t,n]of h)e.box([t,r,n,t+m,p,n+m],Vx);e.box([c,p-.06,u,l,p,u+qx],zx),e.box([c,p-.06,d-qx,l,p,d],zx),e.box([c,p-.06,u+qx,c+qx,p,d-qx],zx),e.box([l-qx,p-.06,u+qx,l,p,d-qx],zx),e.box([c,i,u,l,p-.06,u+qx],Bx),e.box([c,i,d-qx,l,p-.06,d],Bx),e.box([c,i,u+qx,c+qx,p-.06,d-qx],Bx),e.box([l-qx,i,u+qx,l,p-.06,d-qx],Bx);let g=n+Yx*.3,_=o-Yx*.3,v=Math.max(2,Math.floor((_-g)/Qx));for(let t=0;t<=v;t++){let n=g+(_-g)*t/v;e.box([n-$x/2,i,u+qx,n+$x/2,f,u+qx+.1],Vx),e.box([n-$x/2,i,d-qx-.1,n+$x/2,f,d-qx],Vx)}let y=c+qx,b=l-qx,x=u+qx,S=d-qx;t.box([y,i,x,b,f,S],Ix);let C=(n+o)/2,w=(a+s)/2,T=Math.min(b-y,S-x)/2;t.ring(C,f+.012,w,T*.74,T*.88,zx),t.ring(C,f+.012,w,T*.36,T*.5,zx)}function rS(e){let t=[],n=new eS,r=new eS;for(let t=0;t<e.tramps.length;t++){let i=e.tramps[t];nS(n,r,i.min.x,i.min.y,i.max.y,i.min.z,i.max.x,i.max.z)}n.empty||(t.push(n.mesh(`trampRims`)),t.push(r.mesh(`trampTops`)));for(let n=0;n<e.cushions.length;n++){let r=e.cushions[n],i=new eS;tS(i,r.min.x,r.max.y,r.min.z,r.max.x,r.max.z);let a=i.mesh(`cushion`);a.userData.padSlab={index:n,cx:(r.min.x+r.max.x)/2,cz:(r.min.z+r.max.z)/2,base:r.max.y},t.push(a)}return t}var iS=`#ffc83a`,aS=`#4a2c1c`,oS=5,sS=2,cS=.12,lS=3,uS=.03;function dS(e,t,n){let[r,i,a,o,s,c]=n,l=e.length/3;e.push(r,i,a,o,i,a,o,s,a,r,s,a),e.push(r,i,c,o,i,c,o,s,c,r,s,c);let u=[[0,3,2,1],[4,5,6,7],[0,4,7,3],[1,2,6,5],[0,1,5,4],[3,7,6,2]];for(let e=0;e<u.length;e++){let n=u[e];t.push(l+n[0],l+n[1],l+n[2],l+n[0],l+n[2],l+n[3])}}function fS(e,t,n,r=0){let i=[],a=[];for(let t=0;t<e.length;t++)dS(i,a,e[t]);let o=new Ac;o.setAttribute(`position`,new Y(i,3)),o.setIndex(a),o.computeVertexNormals();let s=new wu({color:new J(t),flatShading:!0});r>0&&(s.emissive=new J(t).multiplyScalar(r));let c=new X(o,s);return c.name=n,c.userData.cast=!1,c}function pS(e){let t=1/0;for(let n=0;n<e.solids.length;n++)(n<e.style.length?e.style[n]:1)===oS||e.solids[n].max.y<=e.killPlaneY||(t=Math.min(t,e.solids[n].min.z));return Number.isFinite(t)?t:0}function mS(e,t=!1){let n=[],r=[],i=[];for(let n=0;n<e.lines.length;n++){let a=e.lines[n],o=a.zone,s=e.anchors[a.anchorId];r.push([o.min.x,o.min.y,o.min.z,o.max.x,o.max.y+uS,o.max.z]);let c=(o.min.x+o.max.x)/2,l=(o.min.z+o.max.z)/2,u=o.max.y+sS,d=s===void 0?0:s.px-c,f=s===void 0?1:s.pz-l,p=Math.abs(f)>=Math.abs(d)?(o.max.x-o.min.x)/2:(o.max.z-o.min.z)/2;i.push(...Fx(c,l,o.max.y,u,d,f,Math.max(Mx,p),cS)),s===void 0||t||i.push(...Fx(s.px,s.pz,s.py-lS,s.py,d,f,Mx,cS))}r.length>0&&n.push(fS(r,iS,`lineZones`,.35)),i.length>0&&n.push(fS(i,aS,`linePosts`));let a=Tv(e,sS);return a!==null&&n.push(a),t||n.push(...rS(e)),n}var hS=1.6;function gS(){return{solids:[],style:[],ramps:[],anchors:[],tramps:[],cushions:[],poleAnchorIds:{}}}var $={half:4,plinth:.4,storey:2.8,bodyBelow:2,parapetThick:.25,parapetLow:.45,parapetTall:1.2,balconyW:3,balconyD:1.2,balconyFullW:7.6,postW:.25,gableRise:2.3,balconyThick:.2,balconyTop:3.2,railH:.9,railThick:.1,railGap:1,stairW:1,stairRun:4.57,stairRise:3.2,stairHighBalcony:1.5,stairHighRoof:.5,stairTreads:16,awningW:3.6,awningD:1.5,awningHigh:2.7,awningLow:2.2,windowW:1,windowH:1.3,windowSill:.9,windowAt:1.8,poleHeight:2.6,poleIn:2.5,crate:.9,boxPileSize:1.6,boxPileTop:.8,haySize:2.4,hayTop:.9,trampSize:1.8,trampTop:.5,shedSize:1.5,shedTop:2.2,slab:.02},_S=[[1,0],[-1,0],[0,1],[0,-1]],vS=[[0,1],[0,-1],[-1,0],[1,0]];function yS(e){return _S[e]}var bS=[3,2,0,1];function xS(e){return e^1}function SS(e){return Math.round(e*1e6)/1e6}function CS(e,t,n,r){return[SS(e.cx+_S[t][0]*r+vS[t][0]*n),SS(e.cz+_S[t][1]*r+vS[t][1]*n)]}function wS(e,t,n,r,i,a){let o=CS(e,t,n,i),s=CS(e,t,r,a);return{x0:Math.min(o[0],s[0]),x1:Math.max(o[0],s[0]),z0:Math.min(o[1],s[1]),z1:Math.max(o[1],s[1])}}function TS(e){return SS(e.groundY+$.plinth+$.storey*e.storeys)}function ES(e){let t=t=>{throw Error(`house `+e.id+`: `+t)};e.storeys!==1&&e.storeys!==2&&t(`storeys must be 1 or 2`);let n=(n,r)=>{e.party[n]&&t(r+` on party face `+n)};e.balcony!==-1&&(e.storeys!==2&&t(`balcony needs 2 storeys`),n(e.balcony,`balcony`)),e.balconyFull===!0&&(e.balcony===-1&&t(`balconyFull needs a balcony`),e.stairs!==null&&t(`balconyFull and stairs on one house`)),e.roof===`gable`&&((e.pole||e.takeoff.length>0||e.tall.length>0||e.runout!==void 0)&&t(`a gable roof has no pole, takeoff, tall parapet or runout`),e.stairs!==null&&e.stairs.to===`roof`&&t(`no roof stairs on a gable roof`)),e.stairs!==null&&(n(e.stairs.face,`stairs`),e.stairs.to===`balcony`?e.balcony!==e.stairs.face&&t(`stairs to balcony must share the balcony face`):e.storeys!==1&&t(`stairs to roof need a 1-storey house`));for(let r=0;r<e.awnings.length;r++){let i=e.awnings[r];n(i,`awning`),i===e.balcony&&t(`awning under the balcony`),e.stairs!==null&&i===e.stairs.face&&t(`awning on the stairs face`)}for(let r=0;r<e.takeoff.length;r++)n(e.takeoff[r],`takeoff`),e.tall.indexOf(e.takeoff[r])>=0&&t(`face `+e.takeoff[r]+` is takeoff and tall`);for(let t=0;t<e.tall.length;t++)n(e.tall[t],`tall parapet`);let r=e.runout;if(r!==void 0)for(let e=0;e<r.length;e++)n(r[e].face,`runout`)}function DS(e,t){return e.tall.indexOf(t)>=0?$.parapetTall:$.parapetLow}function OS(e,t){let n=[];for(let r=0;r<e.length;r++){let[i,a]=e[r];t[1]<=i||t[0]>=a?n.push([i,a]):(t[0]>i&&n.push([i,t[0]]),t[1]<a&&n.push([t[1],a]))}return n}function kS(e,t){if(e.party[t]||e.roof===`gable`)return[];let n=$.half,r=-n,i=n;if(t>=2){let n=+(t===2),a=t===2?0:1;e.party[n]||(i-=$.parapetThick),e.party[a]||(r+=$.parapetThick)}let a=[[r,i]];e.balcony===t&&(a=OS(a,[-1.7,1.7])),e.stairs!==null&&e.stairs.face===t&&e.stairs.to===`roof`&&(a=OS(a,[$.stairHighRoof-1.2,$.stairHighRoof+1.2]));let o=e.runout;if(o!==void 0){for(let e=0;e<o.length;e++)if(o[e].face===t){let t=(o[e].w??1.6)/2;a=OS(a,[o[e].s-t,o[e].s+t])}}let s=[];for(let e=0;e<a.length;e++)a[e][1]-a[e][0]>=.05&&s.push(a[e]);return s}function AS(e){return e.balconyFull===!0?$.balconyFullW:$.balconyW}function jS(e){if(e.balcony===-1||e.balconyFull!==!0)return[];let t=$.half+$.balconyD,n=$.postW;return[-(AS(e)/2-n/2-.05),0,AS(e)/2-n/2-.05].map(e=>({s0:e-n/2,s1:e+n/2,d0:t-n-.05,d1:t-.05}))}function MS(e){if(e.balcony===-1)return[];let t=AS(e)/2,n=$.half+$.balconyD,r=$.railThick,i=[{s0:-t,s1:t,d0:n-r,d1:n}];i.push({s0:-t,s1:-t+r,d0:$.half,d1:n-r});let a=e.stairs!==null&&e.stairs.to===`balcony`&&e.stairs.face===e.balcony?$.half+$.railGap:$.half;return n-r-a>=.05&&i.push({s0:t-r,s1:t,d0:a,d1:n-r}),i}function NS(e){return e.stairs!==null&&e.stairs.to===`balcony`?$.stairHighBalcony:$.stairHighRoof}function PS(e){return bS[e]}function FS(e){let t=_S[e.poleFace??2],n=$.half-$.poleIn;return[SS(e.cx+t[0]*n),SS(TS(e)+$.poleHeight),SS(e.cz+t[1]*n)]}function IS(e,t,n,r){return n===0?e.awnings.indexOf(t)>=0||e.stairs!==null&&e.stairs.face===t&&r>0:!1}function LS(e){let t=[];for(let n=0;n<4;n++)if(!e.party[n])for(let r=0;r<e.storeys;r++)for(let i=0;i<2;i++){let a=i===0?-$.windowAt:$.windowAt;if(IS(e,n,r,a))continue;let o=CS(e,n,a,$.half);t.push({face:n,storey:r,s:a,x:o[0],z:o[1],y:SS(e.groundY+$.plinth+r*$.storey+$.windowSill),w:$.windowW,h:$.windowH})}return t}function RS(e){let t=[];for(let n=0;n<e.awnings.length;n++){let r=e.awnings[n],i=CS(e,r,0,$.half);t.push({face:r,s:0,x:i[0],z:i[1],y:SS(e.groundY+.5),w:2.6,h:1.8})}return t}function zS(e){if(e.balcony===-1)return null;let t=CS(e,e.balcony,0,$.half);return{face:e.balcony,s:0,x:t[0],z:t[1],y:SS(e.groundY+$.balconyTop),w:1,h:2}}var BS=.118,VS=5,HS=[`#d8c7a6`,`#cfb892`,`#e0cfae`,`#c9a98a`,`#d9b99a`,`#bfb59f`],US=`#9c5640`,WS=`#b3a58f`,GS=[`#4a2c1c`,`#5a3622`],KS=[`#4a2c1c`,`#7c3e2e`,`#2e6b47`],qS=`#c0603a`,JS=`#a99a88`,YS=[`#b8432f`,`#2f62b8`,`#d0a12e`,`#2e6b47`],XS=`#e6d9a8`,ZS=`#e2c872`,QS=`#3a2c24`,$S=`#4a3424`,eC=`#8c949a`,tC=`#8b6a58`,nC=`#b8975a`,rC=[`#26282c`,`#2e6b47`],iC=`#d0a12e`,aC=$b.filter(e=>e!==iC),oC=.6,sC=8,cC=2.3,lC=.5,uC=`#c2a04e`,dC=`#6e2f26`,fC=`#6b7a3a`,pC=`#4e7d35`,mC=.5,hC=.4,gC=.8,_C=1.2,vC=.8,yC=.5,bC=3.2,xC=e=>new J(e),SC=class{kit;boxes=[];home;constructor(e,t=!1){this.home=t,this.kit=new Rb(e,t)}box(e,t,n,r,i,a,o,s,c,l){if(!this.kit.add(e,(n+a)/2,r,(i+s)/2,a-n,o-r,s-i,0,c))return;let u={kind:t,min:[n,r,i],max:[a,o,s]};l!==void 0&&(u.house=l),this.boxes.push(u)}rect(e,t,n,r,i,a,o){this.box(e,t,n.x0,r,n.z0,n.x1,i,n.z1,a,o)}};function CC(e){let t=yS(e);return Math.atan2(t[0],t[1])}function wC(e,t,n,r,i,a,o,s,c,l,u){let d=yS(r),f=t===`window`?.5*BS:0,p=t===`window`?BS:1,m=t===`window`?s:1,h=t===`window`?c:1,g=i+d[0]*f,_=o+d[1]*f;if(!e.kit.add(t,g,a,_,m,h,p,CC(r),l))return;let v=t===`window`?1.6*BS:.04,y=t===`window`?.6*s:.93,b=yS(r),x=Math.abs(b[0]),S=x===1?Math.min(i,i+d[0]*v):i-y,C=x===1?Math.max(i,i+d[0]*v):i+y,w=x===1?o-y:Math.min(o,o+d[1]*v),T=x===1?o+y:Math.max(o,o+d[1]*v);e.boxes.push({kind:n,min:[S,a,w],max:[C,a+(t===`window`?c:1.3),T],house:u})}function TC(e,t,n,r,i){wC(e,`window`,t,n.face,n.x,n.y,n.z,n.w,n.h,r,i)}function EC(e,t,n,r,i,a){let o=nb(t.id*7919+n>>>0),s=t.groundY,c=TS(t),l=$.half,u=xC(HS[Math.min(HS.length-1,Math.floor(o()*HS.length))]),d=xC(GS[Math.floor(o()*GS.length)]);if(e.box(`wallBrick`,`plinth`,t.cx-l-.05,s-(t.below??1),t.cz-l-.05,t.cx+l+.05,s+$.plinth,t.cz+l+.05,xC(US),t.id),i&&t.storeys===2){let n=s+$.plinth,r=s+$.balconyTop-.2,i=e.kit.add(`wallPlaster`,t.cx,n,t.cz,2*l,r-n,2*l,0,u),a=e.kit.add(`wallPlaster`,t.cx,r,t.cz,2*l,c-r,2*l,0,u);i&&a&&e.boxes.push({kind:`body`,min:[t.cx-l,n,t.cz-l],max:[t.cx+l,c,t.cz+l],house:t.id})}else e.box(`wallPlaster`,`body`,t.cx-l,s+$.plinth,t.cz-l,t.cx+l,c,t.cz+l,u,t.id);let f=l+.15;if(t.storeys===2){let n=s+$.balconyTop-.2;e.box(`cornice`,`cornice`,t.cx-f,n,t.cz-f,t.cx+f,n+.15,t.cz+f,xC(WS),t.id)}e.box(`cornice`,`cornice`,t.cx-f,c-.3,t.cz-f,t.cx+f,c-.12,t.cz+f,xC(WS),t.id);for(let n=0;n<4;n++){if(a&&(t.guard===void 0||t.guard.indexOf(n)<0))continue;let r=kS(t,n),i=DS(t,n),o=xC(i>1?qS:JS);for(let a=0;a<r.length;a++){let s=wS(t,n,r[a][0],r[a][1],l-$.parapetThick,l);e.rect(`parapet`,i>1?`parapetTall`:`parapet`,s,c,c+i,o,t.id)}}let p=LS(t),m=0;for(let n=0;n<p.length;n++){let i=p[n];wC(e,`window`,`window`,i.face,i.x,i.y,i.z,i.w,i.h,d,t.id),r.n++,m<VS&&r.n%2==0&&(m++,wC(e,`shutter`,`shutter`,i.face,i.x,i.y,i.z,1,1,xC(KS[Math.floor(o()*KS.length)]),t.id))}let h=RS(t);for(let n=0;n<h.length;n++)TC(e,`shop`,h[n],xC(`#2a1f18`),t.id);let g=zS(t);if(g!==null&&TC(e,`door`,g,d,t.id),t.balcony!==-1){let n=t.balcony,r=AS(t)/2,i=s+$.balconyTop;e.rect(`deck`,`balcony`,wS(t,n,-r,r,l,l+$.balconyD),i-$.balconyThick,i,xC(WS),t.id);let a=MS(t);for(let r=0;r<a.length;r++){let o=a[r],s=wS(t,n,o.s0,o.s1,o.d0,o.d1),c=s.z1-s.z0>s.x1-s.x0,l=c?s.z1-s.z0:s.x1-s.x0;if(l<.5)continue;let u=(s.x0+s.x1)/2,f=(s.z0+s.z1)/2;e.kit.add(`guard`,u,i,f,l/2.4,1,1,c?Math.PI/2:0,d)&&e.boxes.push({kind:`rail`,min:[s.x0,i,s.z0],max:[s.x1,i+$.railH,s.z1],house:t.id})}}if(t.balcony!==-1){let n=jS(t);for(let r=0;r<n.length;r++){let i=n[r],a=wS(t,t.balcony,i.s0,i.s1,i.d0,i.d1);e.rect(`body`,`post`,a,s,s+$.balconyTop-$.balconyThick,d,t.id)}}if(t.eave===!0&&t.roof!==`gable`&&kC(e,t),t.roof===`gable`&&AC(e,t,u,i),t.ladder!==void 0&&jC(e,t,t.ladder),t.stairs!==null){let n=NS(t),r=$.stairTreads,i=$.stairRun/r;for(let a=0;a<r;a++){let o=n+$.stairRun-(a+1)*i,c=wS(t,t.stairs.face,o,o+i,l,l+$.stairW),u=(a+.5)*$.stairRise/r;e.rect(`stair`,`stair`,c,s,s+u,xC(a%2==0?WS:`#a89b86`),t.id)}}for(let n=0;n<t.awnings.length;n++){let r=t.awnings[n],a=yS(r),o=Math.hypot($.awningD,$.awningHigh-$.awningLow),c=Math.atan2($.awningHigh-$.awningLow,$.awningD),u=l+$.awningD/2,d=s+($.awningHigh+$.awningLow)/2-.04;if(e.kit.add(i?`homeTin`:`cornice`,t.cx+a[0]*u,d,t.cz+a[1]*u,$.awningW,.08,o,CC(r),xC(i?eC:YS[(t.id+n)%YS.length]),c)){let n=wS(t,r,-$.awningW/2,$.awningW/2,l,l+$.awningD);e.boxes.push({kind:`awning`,min:[n.x0,s+$.awningLow,n.z0],max:[n.x1,s+$.awningHigh,n.z1],house:t.id})}}if(i&&(a||(NC(e,t,n),PC(e,t,n)),FC(e,t,n)),t.pole){let n=FS(t),r=yS(t.poleFace??2),i=xC($S);for(let a of Fx(n[0],n[2],c,n[1],r[0],r[1],Mx,.16))e.box(`trim`,`pole`,a[0],a[1],a[2],a[3],a[4],a[5],i,t.id)}}var DC=.5,OC=.3;function kC(e,t){let n=$.half,r=TS(t),i=Math.hypot(DC,DC);for(let a=0;a<4;a++){if(t.party[a])continue;let o=a,s=yS(o),c=n+DC/2;if(e.kit.add(e.home?`roof`:`cornice`,t.cx+s[0]*c,r-.12-DC/2-.04,t.cz+s[1]*c,2*n+2*DC,.08,i,CC(o),xC(tC),Math.PI/4)){let i=wS(t,o,-n-DC,n+DC,n,n+DC);e.boxes.push({kind:`eave`,min:[i.x0,r-.12-DC,i.z0],max:[i.x1,r-.12,i.z1],house:t.id})}}}function AC(e,t,n,r){let i=$.half,a=TS(t),o=$.gableRise,s=Math.hypot(i,o)+OC,c=Math.atan2(o,i);for(let n of[2,3]){let l=yS(n),u=i/2+OC/2;if(e.kit.add(r?`homeTin`:`cornice`,t.cx+l[0]*u,a+o*(i-u)/i-.04,t.cz+l[1]*u,2*i+.6,.08,s,CC(n),xC(eC),c)){let r=wS(t,n,-i-.3,i+.3,0,i+OC);e.boxes.push({kind:`gable`,min:[r.x0,a,r.z0],max:[r.x1,a+o,r.z1],house:t.id})}}for(let r=0;r<3;r++){let s=i*(1-(r+1)/3);e.box(`body`,`gableEnd`,t.cx-i,a+o*r/3,t.cz-s,t.cx+i,a+o*(r+1)/3,t.cz+s,n,t.id)}}function jC(e,t,n){let r=$.half,i=t.groundY,a=TS(t)-.2,o=xC(GS[1]);for(let s of[-.28,.28]){let c=wS(t,n,s-.03,s+.03,r+.02,r+.1);e.rect(`body`,`ladderRail`,c,i,a,o,t.id)}for(let s=i+.4;s<a;s+=.4){let i=wS(t,n,-.25,.25,r+.04,r+.08);e.rect(`body`,`ladderRung`,i,s,s+.04,o,t.id)}}function MC(e){let t=$.half,n=[];for(let r=0;r<4;r++){let i=r,a=e.runout!==void 0&&e.runout.some(e=>e.face===i);(e.party[r]||e.takeoff.indexOf(i)>=0||a)&&n.push(wS(e,i,-t,t,t-bC,t))}if(e.runout!==void 0&&e.runout.length>0&&n.push({x0:e.cx-1.75,x1:e.cx+1.75,z0:e.cz-3.75,z1:e.cz-.25}),e.pole){let t=FS(e);n.push({x0:t[0]-1.5,x1:t[0]+1.5,z0:t[2]-1.5,z1:t[2]+1.5})}return n}function NC(e,t,n){if(t.storeys!==2||t.roof===`gable`)return;let r=nb(t.id*104729+n*31+7>>>0),i=r(),a=Math.floor(r()*4),o=xC(rC[Math.floor(r()*rC.length)]),s=Math.floor(r()*4)*(Math.PI/2);if(i>=yC)return;let c=MC(t),l=$.half-$.parapetThick-vC-.1,u=TS(t);for(let n=0;n<4;n++){let r=(a+n)%4,i=t.cx+(r%2==0?-l:l),d=t.cz+(r<2?-l:l),f={x0:i-vC,x1:i+vC,z0:d-vC,z1:d+vC};if(c.every(e=>f.x1<=e.x0||f.x0>=e.x1||f.z1<=e.z0||f.z0>=e.z1)){e.kit.add(`homeTank`,i,u,d,_C,_C,_C,s,o)&&e.boxes.push({kind:`tank`,min:[f.x0,u,f.z0],max:[f.x1,u+Qy*_C,f.z1],house:t.id});return}}}function PC(e,t,n){if(t.roof===`gable`)return;let r=nb(t.id*15485863+n*17+3>>>0),i=r(),a=Math.floor(r()*4);if(i>=oC)return;let o=$.half,s=TS(t),c=s+cC,l=o-lC;for(let n=0;n<4;n++){let r=(a+n)%4,i=t.runout!==void 0&&t.runout.some(e=>e.face===r);if(t.party[r]||t.takeoff.indexOf(r)>=0||i||t.stairs!==null&&t.stairs.face===r)continue;let o=CS(t,r,-l,l),u=CS(t,r,l,l);if(t.pole){let e=FS(t),n=Math.max(Math.min(e[0],Math.max(o[0],u[0])),Math.min(o[0],u[0]))-e[0],r=Math.max(Math.min(e[2],Math.max(o[1],u[1])),Math.min(o[1],u[1]))-e[2];if(Math.hypot(n,r,c-e[1])<3)continue}let d=Math.abs(u[1]-o[1])>Math.abs(u[0]-o[0]),f=2*l,p=xC($S);for(let n of[o,u])e.box(`trim`,`flagPost`,n[0]-.05,s,n[1]-.05,n[0]+.05,c,n[1]+.05,p,t.id);let m=(o[0]+u[0])/2,h=(o[1]+u[1])/2;e.kit.add(`trim`,m,c-.03,h,f,.03,.03,d?Math.PI/2:0,p);for(let t=0;t<sC;t++){let n=(t+.5)/sC-.5,i=m+(u[0]-o[0])*n,a=h+(u[1]-o[1])*n,s=xC(aC[t%aC.length]);e.kit.add(`flag`,i,c-.25,a,1.3,1.3,1.3,CC(r)+t%2*Math.PI,s)}e.boxes.push({kind:`flagLine`,min:[Math.min(o[0],u[0])-.05,c-.5,Math.min(o[1],u[1])-.05],max:[Math.max(o[0],u[0])+.05,c,Math.max(o[1],u[1])+.05],house:t.id});return}}function FC(e,t,n){let r=nb(t.id*49979687+n*13+11>>>0),i=$.half,a=TS(t),o=[];for(let e=0;e<4;e++){let n=e;t.party[e]||t.balcony===n||t.awnings.indexOf(n)>=0||(t.stairs===null||t.stairs.face!==n)&&o.push(n)}for(let n=0;n<o.length;n++){if(r()>=mC)continue;let s=[.9,1.1,.8];for(let r=0;r<3;r++){let c=(r-1)*.45,l=wS(t,o[n],c-.11,c+.11,i,i+.12),u=xC(r===1?dC:uC);e.rect(`trim`,`cropHang`,l,a-.32-s[r],a-.32,u,t.id)}}if(o.length>0&&r()<hC){let n=o[Math.floor(r()*o.length)],a=CS(t,n,(r()<.5?-1:1)*3.3,i+gC),s=t.groundY;e.box(`trim`,`bananaStem`,a[0]-.07,s,a[1]-.07,a[0]+.07,s+1.7,a[1]+.07,xC(fC),t.id),e.kit.add(`canopy`,a[0],s+1.9,a[1],.7,.3,.7,0,xC(pC)),e.kit.add(`canopy`,a[0],s+1.6,a[1],.55,.22,.55,.8,xC(pC)),e.boxes.push({kind:`banana`,min:[a[0]-.7,s,a[1]-.7],max:[a[0]+.7,s+2.2,a[1]+.7],house:t.id})}}function IC(e,t,n){let r=t.groundY,i=e=>({x0:t.x-e/2,x1:t.x+e/2,z0:t.z-e/2,z1:t.z+e/2});switch(t.kind){case`crate`:{let n=i($.crate);e.kit.add(`crate`,t.x,r,t.z,$.crate,$.crate,$.crate,t.yaw,xC(XS))&&e.boxes.push({kind:`crate`,min:[n.x0,r,n.z0],max:[n.x1,r+$.crate,n.z1]});return}case`boxPile`:{let n=$.boxPileSize,a=$.boxPileTop;for(let i=0;i<2;i++){let o=t.z+(i===0?-n/4:n/4);if(!e.kit.add(`crate`,t.x,r,o,n,a,n/2,t.yaw,xC(i===0?XS:`#d3bf8a`)))return}let o=i(n);e.boxes.push({kind:`boxPile`,min:[o.x0,r,o.z0],max:[o.x1,r+a,o.z1]});return}case`hay`:{let a=i($.haySize);e.kit.add(`crate`,t.x,r,t.z,$.haySize,$.hayTop,$.haySize,t.yaw,xC(ZS))&&(e.boxes.push({kind:`hay`,min:[a.x0,r,a.z0],max:[a.x1,r+$.hayTop,a.z1]}),n&&LC(e,t));return}case`shed`:{let a=i($.shedSize),o=.06;if(!e.kit.add(`crate`,t.x,r,t.z,$.shedSize,$.shedTop-o,$.shedSize,t.yaw,xC(US)))return;if(e.kit.add(`crate`,t.x,r+$.shedTop-o,t.z,$.shedSize,o,$.shedSize,t.yaw,xC(XS)),n){let n=$.shedSize+.2;e.kit.add(`roof`,t.x,r+$.shedTop-o-.2,t.z,n,.2,n,t.yaw,xC(tC))}e.boxes.push({kind:`shed`,min:[a.x0,r,a.z0],max:[a.x1,r+$.shedTop,a.z1]});return}case`tramp`:{let n=i($.trampSize),a=$.trampTop;if(!e.kit.add(`crate`,t.x,r,t.z,$.trampSize,a-.04,$.trampSize,t.yaw,xC(QS)))return;e.kit.add(`crate`,t.x,r+a-.04,t.z,$.trampSize-.3,.04,$.trampSize-.3,t.yaw,xC(XS)),e.boxes.push({kind:`tramp`,min:[n.x0,r,n.z0],max:[n.x1,r+a,n.z1]});return}}}function LC(e,t){let n=t.groundY,r=n+$.hayTop,i=$.haySize+.08,a=e.kit.add(`homeTin`,t.x,r-.06,t.z,$.haySize-.9,.08,$.haySize,t.yaw,xC(eC)),o=[.22,.52];for(let r=0;r<o.length;r++)a=e.kit.add(`tank`,t.x,n+o[r],t.z,i,.12,i,t.yaw,xC(nC))&&a;if(a){let n=r+.02;for(let[r,i]of[[.72,.1],[.5,.1],[.28,.08]]){let o=$.haySize*r;a=e.kit.add(`trim`,t.x,n,t.z,o,i,o,t.yaw,xC(nC))&&a,n+=i}e.boxes.push({kind:`hayDome`,min:[t.x-$.haySize*.36,r+.02,t.z-$.haySize*.36],max:[t.x+$.haySize*.36,n,t.z+$.haySize*.36]})}a&&e.boxes.push({kind:`hayCover`,min:[t.x-i/2,n,t.z-i/2],max:[t.x+i/2,r+.02,t.z+i/2]})}function RC(e,t,n=1,r={}){let i=r.look===`home`,a=new SC(e.length,i),o={n:0},s=0,c=0,l=0;for(let t=0;t<e.length;t++)EC(a,e[t],n,o,i,r.deckClear===!0),s+=LS(e[t]).length,c+=e[t].awnings.length,e[t].balcony!==-1&&l++;for(let e=0;e<t.length;e++)IC(a,t[e],i);let u={},d=0;for(let e of Object.keys(a.kit.used))u[e]=a.kit.used[e],d+=a.kit.dropped[e];let f=a.kit.finish();f.name=`houseV2`;let p={houses:e.length,windows:s,shops:c,doors:l,refused:d,used:u};return f.userData.stats=p,f.userData.boxes=a.boxes,f}var zC=[`#8e7a66`,`#d9c6aa`,`#b9a68c`,`#c4472a`,`#a99a88`],BC=3,VC=5,HC=[`stone_warm`,``,`terracotta_a`,``,``],UC=`#9c5640`,WC=`#4a2c1c`,GC=`#f1e9d2`,KC=`#efe2b4`,qC=`#ffc83a`,JC=`#b5523a`,YC=.5,XC=.72,ZC=.92,QC=16,$C=new Float64Array(64),ew=new Float64Array(64);for(let e=0;e<QC;e++){let t=e/QC*Math.PI*2,n=(e+1)/QC*Math.PI*2,r=[t,t,n,n],i=[XC,ZC,ZC,XC];for(let t=0;t<4;t++)$C[e*4+t]=Math.cos(r[t])*i[t],ew[e*4+t]=Math.sin(r[t])*i[t]}var tw=`#6b4a30`,nw=.03,rw=4;function iw(e,t,n,r){let i=[r.min.x,r.min.y,r.min.z],a=[r.max.x,r.max.y,r.max.z];for(let r=0;r<3;r++){let o=r===0?2:0,s=r===1?2:1;for(let c=0;c<2;c++){let l=c===0?i[r]:a[r],u=e.length/3;for(let t=0;t<4;t++){let c=[0,0,0];c[r]=l,c[o]=t===0||t===3?i[o]:a[o],c[s]=t<2?i[s]:a[s],e.push(c[0],c[1],c[2]),n.push(c[o]/rw,c[s]/rw)}+(r===2?c===0:c===1)==0?t.push(u,u+1,u+2,u,u+2,u+3):t.push(u,u+2,u+1,u,u+3,u+2)}}}function aw(e,t,n=0,r=``){let i=[],a=[],o=[];for(let t=0;t<e.length;t++)iw(i,a,o,e[t]);let s=new Ac;s.setAttribute(`position`,new Y(i,3)),s.setAttribute(`uv`,new Y(o,2)),s.setIndex(a),s.computeVertexNormals();let c=r?Wy(r):null,l=new J(t);c&&l.lerp(new J(`#ffffff`),.55);let u=new wu({color:l,flatShading:!0,map:c,normalMap:c?Gy(r):null});n>0&&(u.emissive=new J(t).multiplyScalar(n));let d=new X(s,u);return d.userData.cast=!0,d}function ow(e,t,n,r,i){let a=i===1,o=a?r.min.z:r.min.x,s=a?r.max.z:r.max.x,c=a?r.min.x:r.min.z,l=a?r.max.x:r.max.z,u=(c+l)/2,d=r.min.y,f=r.max.y,p=Math.hypot(u-c,f-d),m=(t,r,i,o,s)=>{a?e.push(r,i,t):e.push(t,i,r),n.push(o/rw,s/rw)};for(let n=0;n<2;n++){let r=n===0?c:l,i=e.length/3;m(o,r,d,o,0),m(s,r,d,s,0),m(s,u,f,s,p),m(o,u,f,o,p),n===0===a?t.push(i,i+1,i+2,i,i+2,i+3):t.push(i,i+2,i+1,i,i+3,i+2)}for(let n=0;n<2;n++){let r=n===0?o:s,i=e.length/3;m(r,c,d,c,d),m(r,l,d,l,d),m(r,u,f,u,f),n===0===a?t.push(i,i+2,i+1):t.push(i,i+1,i+2)}}function sw(e){let t=[],n=[],r=[];for(let i=0;i<e.roofs.length;i++)ow(t,n,r,e.roofs[i].aabb,e.roofs[i].ridgeAxis);let i=new Ac;i.setAttribute(`position`,new Y(t,3)),i.setAttribute(`uv`,new Y(r,2)),i.setIndex(n),i.computeVertexNormals();let a=Wy(`roof_tile`),o=new J(JC);a&&o.lerp(new J(`#ffffff`),.55);let s=new X(i,new wu({color:o,flatShading:!0,map:a,normalMap:Gy(`roof_tile`)}));return s.name=`pitchedRoofs`,s.userData.cast=!0,s}var cw=(e,t,n,r,i,a)=>new x(new A(e,t,n),new A(r,i,a));function lw(e){let t=[],n=[],r=.1,i=[],a=e.goal;if(a.max.y>a.min.y){let i=Math.min(tx(e,a.min.x,a.min.z+1),tx(e,a.max.x,a.min.z+1),tx(e,(a.min.x+a.max.x)/2,a.min.z+1));i<a.min.y&&(t.push(cw(a.min.x,i-.3,a.min.z,a.max.x,a.min.y,a.max.z-1)),n.push(cw(a.min.x-r,a.min.y-.4,a.min.z-r,a.max.x+r,a.min.y-.1,a.max.z-1+r)))}return t.length>0&&i.push(aw(t,UC,0,`brick_a`)),n.length>0&&i.push(aw(n,WC)),i}function uw(e,t={}){let n=t.scenery!==!1&&t.floorY===void 0,r=e.lineOnly===1;sy(t.graph===void 0?null:t.graph.profile),ly(t.graph?.field??null),n&&ey(r?pS(e):null);let i=new Os;i.name=`level`,i.userData.route=e.route.slice();for(let n=0;n<zC.length;n++){let r=[];for(let i=0;i<e.solids.length;i++){let a=i<e.style.length?e.style[i]:1;(t.graph===void 0||a!==1&&a!==4||t.graph.keep?.(i)===!0)&&(t.graph?.kitSkip!==void 0&&t.graph.kitSkip(i)||a===n&&a!==VC&&e.solids[i].max.y>e.killPlaneY&&r.push(e.solids[i]))}r.length>0&&i.add(aw(r,zC[n],n===BC?.2:0,HC[n]))}if(e.pads.length>0){let t=(e,t,n)=>new x(new A(e.min.x+t,e.max.y,e.min.z+t),new A(e.max.x-t,e.max.y+n,e.max.z-t)),n=aw(e.pads.map(e=>t(e,0,nw)),tw),r=aw(e.pads.map(e=>t(e,.18,.04)),GC);n.name=`padEdge`;for(let e of[n,r])e.userData.cast=!1,i.add(e)}e.goal.max.y>e.goal.min.y&&i.add(aw([e.goal],KC)),e.roofs.length>0&&i.add(sw(e));let a=lw(e);for(let e=0;e<a.length;e++)i.add(a[e]);if(i.add(xx(e,void 0,{scenery:n,houseDress:t.houseDress,floorY:t.floorY})),t.graph!==void 0){i.add(RC(t.graph.houses,t.graph.props,t.graph.seed,{look:t.graph.look,deckClear:t.graph.kitSkip!==void 0}));let n=jx(e,t.graph.patches??[]);n!==null&&i.add(n)}if(r){let n=mS(e,t.graph!==void 0&&t.graph.kitSkip===void 0);for(let e=0;e<n.length;e++)i.add(n[e])}n?i.add(wv(e)):t.floorY!==void 0&&(hv.set=!1,hv.live=!1,hv.anchorId=-1);let o=new fu(YC,12,8);for(let t=0;t<(r?0:e.anchors.length);t++){let n=e.anchors[t],r=new X(o,new Hc({color:new J(qC),fog:!1}));r.position.set(n.px,n.py,n.pz),r.name=`anchor`+t,r.userData.anchorId=t,i.add(r)}return e.anchors.length>0&&!r&&i.add(dw(e)),i}function dw(e){let t=e.anchors.length,n=new Float32Array(t*64*3),r=[];for(let e=0;e<t*QC;e++){let t=e*4;r.push(t,t+1,t+2,t,t+2,t+3)}let i=new Ac,a=new Y(n,3);a.setUsage(so),i.setAttribute(`position`,a),i.setIndex(r);let o=new X(i,new Hc({color:new J(qC),fog:!1,side:2}));o.name=`anchorRings`,o.frustumCulled=!1,o.userData.target=-1;let s=new G,c=new G;return o.onBeforeRender=(r,i,l)=>{let u=l.matrixWorld.elements;s.set(u[0],u[1],u[2]),c.set(u[4],u[5],u[6]);let d=o.userData.target;for(let r=0;r<t;r++){let t=e.anchors[r],i=r===d?1.25:1,a=r*64*3;for(let e=0;e<QC;e++)for(let r=0;r<4;r++){let o=$C[e*4+r]*i,l=ew[e*4+r]*i;n[a++]=t.px+s.x*o+c.x*l,n[a++]=t.py+s.y*o+c.y*l,n[a++]=t.pz+s.z*o+c.z*l}}a.needsUpdate=!0},o}function fw(e,t,n,r=-1){let i=e.userData.route,a=i&&n>=0&&n<i.length?i[n]:-1,o=r>=0;o&&(a=r);for(let n=0;n<e.children.length;n++){let r=e.children[n];if(r.name===`anchorRings`&&(r.userData.target=a),r.userData.anchorId===void 0)continue;let i=r.userData.anchorId===a?1+(o?.9:.35)*Math.sin(t*6):1;r.scale.setScalar(i)}}var pw=`modulepreload`,mw=function(e){return`/bhaaag/`+e},hw={},gw=function(e){return e.pathname.endsWith(`.css`)},_w=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},vw=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=mw(t,n);let r=s(t),i=gw(r);return _w(hw,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:pw,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};async function yw(e,t,n,r){if(r.bloom===null)return null;let[{EffectComposer:i},{RenderPass:a},{UnrealBloomPass:o},{OutputPass:s}]=await Promise.all([vw(()=>import(`./EffectComposer-C4oaodzR.js`),__vite__mapDeps([0,1,2])),vw(()=>import(`./RenderPass-BGi_wlRh.js`),__vite__mapDeps([3,2])),vw(()=>import(`./UnrealBloomPass-9L5-sJxD.js`),__vite__mapDeps([4,2,1])),vw(()=>import(`./OutputPass-DSzDmX_D.js`),__vite__mapDeps([5,2]))]),c=e.getSize(new W),l=e.getPixelRatio(),u=new i(e,new Qo(c.x*l,c.y*l,{type:Yi,samples:r.composerSamples}));return u.addPass(new a(t,n)),u.addPass(new o(new W(c.x,c.y),r.bloom.strength,r.bloom.radius,r.bloom.threshold)),u.addPass(new s),u}var bw=.7;function xw(e,t,n,r){let i=xy(t,r);for(let a=0;a<e.solids.length;a++){let o=e.solids[a],s=o.max.y;s>n+.3||s<=i||t<o.min.x||t>o.max.x||r<o.min.z||r>o.max.z||(i=s)}return i}function Sw(){let e=new iu(bw,16);e.rotateX(-Math.PI/2);let t=new X(e,new Hc({color:`#1b1410`,transparent:!0,opacity:.38,depthWrite:!1,fog:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));return t.name=`heroBlob`,t.frustumCulled=!1,t.visible=!1,t}function Cw(e,t,n,r,i){let a=xw(t,n,r,i),o=r-a;if(o>7||o<-1){e.visible=!1;return}e.visible=!0,e.position.set(n,a+.05,i);let s=1-.55*Math.min(1,Math.max(0,o)/7);e.scale.setScalar(s),e.material.opacity=.38*s}function ww(e,t,n,r,i){let a=e;a.map=t,n!==null&&a.normalScale?.setScalar(i),(e instanceof wu||e instanceof Cu)&&(a.normalMap=n),e instanceof Hc||a.color.setScalar(r),e.needsUpdate=!0}function Tw(e,t){let n=e.userData.tierMaps;if(n===void 0)return!1;let r=t!==`low`,i=r?n.rich:n.low,a=i?.map===void 0?null:Wy(i.map,i.ext),o=t===`high`&&i?.normal!==void 0?Gy(i.normal):null,s=r?(n.boost??1)*(t===`high`?n.highBoost??1:1):1;n.hideOnLow===!0&&(e.visible=r);let c=e.userData;c.normalMap=o;let l=[];Array.isArray(e.material)?l.push(...e.material):l.push(e.material),c.lambert!==void 0&&l.push(c.lambert),c.standard!==void 0&&l.push(c.standard);for(let e of new Set(l))ww(e,a,o,s,n.normalStrength??1);return!0}var Ew=`#eaa978`,Dw=500,Ow=7,kw=Math.PI/180,Aw=new G(0,0,1),jw=8*kw,Mw=32*kw,Nw=new G(Math.sin(Mw)*Math.cos(jw),Math.sin(jw),-Math.cos(Mw)*Math.cos(jw)),Pw={x:Math.sin(Mw),z:-Math.cos(Mw)},Fw=470,Iw=440,Lw=7,Rw=new J(`#e6a77a`),zw=new J(`#ffd890`),Bw=[[0,new J(Ew)],[.12,new J(`#f0b47a`)],[.264,new J(`#afa1b4`)],[.45,new J(`#e2a46e`)],[.7,new J(`#b7765a`)]];function Vw(e,t){if(e<0)return t.copy(Rw);let n=Bw[0][0],r=Bw[0][1];for(let i=1;i<Bw.length;i++){let[a,o]=Bw[i];if(e<=a)return t.copy(r).lerp(o,(e-n)/(a-n));n=a,r=o}return t.copy(r)}function Hw(e,t){let n=Math.max(0,e.dot(Nw));return t.lerp(zw,.5*n*n*n*n)}function Uw(){let e=new fu(Dw,32,16),t=e.attributes.position,n=[],r=new G,i=new J;for(let e=0;e<t.count;e++)r.fromBufferAttribute(t,e).normalize(),Vw(r.y,i),Hw(r,i),n.push(i.r,i.g,i.b);e.setAttribute(`color`,new Y(n,3));let a=new X(e,new Hc({vertexColors:!0,side:1,depthWrite:!1,fog:!1}));return a.name=`skyDome`,a.renderOrder=-2,a}function Ww(){let e=new Os,t=new iu(170,32),n=new J(`#ffc070`),r=[];for(let e=0;e<t.attributes.position.count;e++)r.push(n.r,n.g,n.b,e===0?.65:0);t.setAttribute(`color`,new Y(r,4));let i=new X(t,new Hc({vertexColors:!0,transparent:!0,blending:2,depthWrite:!1,fog:!1}));i.name=`sunGlow`;let a=new X(new iu(9,24),new Hc({color:`#fff1c4`,depthWrite:!1,fog:!1}));a.name=`sunCore`,a.renderOrder=-1;let o=Nw.clone().negate();for(let t of[i,a])t.position.copy(Nw).multiplyScalar(Fw),t.quaternion.setFromUnitVectors(Aw,o),e.add(t);return e}function Gw(){let e=[],t=[],n=[],r=new J(`#ffcf8a`),i=[-.5,-.25,0,.3,.55];for(let a=0;a<i.length;a++){let o=i[a],s=260+a%2*40,c=14+a%3*4,l=e.length/3;e.push(-c*.3,0,0,c*.3,0,0,-c,s,0,c,s,0),t.push(r.r,r.g,r.b,0,r.r,r.g,r.b,0,r.r,r.g,r.b,0,r.r,r.g,r.b,0);let u=e.length/3;e.push(0,0,0,0,s*.55,0),t.push(r.r,r.g,r.b,.16,r.r,r.g,r.b,.07),n.push(l,l+1,u,l,u,l+2,l+1,l+3,u+1,l+2,l+3,u+1,u,u+1,l,u,u+1,l+1);let d=Math.cos(o),f=Math.sin(o);for(let t=l;t<e.length/3;t++){let n=e[t*3],r=e[t*3+1];e[t*3]=n*d-r*f,e[t*3+1]=n*f+r*d}}let a=new Ac;a.setAttribute(`position`,new Y(e,3)),a.setAttribute(`color`,new Y(t,4)),a.setIndex(n);let o=new X(a,new Hc({vertexColors:!0,transparent:!0,depthWrite:!1,fog:!1,side:2}));return o.name=`godRays`,o.position.copy(Nw).multiplyScalar(466),o.quaternion.setFromUnitVectors(Aw,Nw.clone().negate()),o.renderOrder=1,o}function Kw(e,t={azLo:-40,azHi:60,count:Lw,elLo:4,elHi:14,wLo:60,wHi:140,opacity:.85,name:`clouds`}){let n=[],r=new J(`#f7b98a`),i=new J(`#ffd9a0`),a=new G,o=new Mo,s=(e,t,n)=>e+(t-e)*n;for(let c=0;c<t.count;c++){let c=s(t.azLo,t.azHi,e())*kw,l=s(t.elLo,t.elHi,e())*kw,u=s(t.wLo,t.wHi,e()),d=s(8,14,e());a.set(Math.sin(c)*Math.cos(l),Math.sin(l),-Math.cos(c)*Math.cos(l));let f=new iu(1,16);f.deleteAttribute(`normal`),f.deleteAttribute(`uv`),f.scale(u,d,1);let p=[],m=f.attributes.position;for(let e=0;e<m.count;e++){let t=m.getY(e)>0?r:i;p.push(t.r,t.g,t.b)}f.setAttribute(`color`,new Y(p,3)),o.setFromUnitVectors(Aw,a.clone().negate()),f.applyQuaternion(o),f.translate(a.x*Iw,a.y*Iw,a.z*Iw),n.push(f)}let c=C_(n,!1);for(let e of n)e.dispose();if(c===null)throw Error(`cloud merge failed: attribute mismatch`);let l=new X(c,new Hc({vertexColors:!0,transparent:!0,opacity:t.opacity,side:2,depthWrite:!1,fog:!1}));return l.name=t.name,l}function qw(){let e=new au(240,240,42,48,2,!0),t=e.attributes.position,n=new J(`#ffb070`),r=[];for(let e=0;e<t.count;e++){let i=t.getX(e),a=t.getZ(e),o=Math.hypot(i,a)||1,s=Math.max(0,i/o*Pw.x+a/o*Pw.z),c=Math.abs(t.getY(e))<10?.35:0;r.push(n.r,n.g,n.b,c*(.4+.6*s*s))}e.setAttribute(`color`,new Y(r,4));let i=new X(e,new Hc({vertexColors:!0,transparent:!0,blending:2,depthWrite:!1,depthTest:!0,fog:!1,side:1}));return i.name=`horizonHaze`,i.position.y=9,i}function Jw(){let e=new Os;return e.add(Uw()),e.add(Ww()),e.add(qw()),e.add(Gw()),e.add(Kw(nb(Ow))),e.add(Kw(nb(14),{azLo:-60,azHi:80,count:9,elLo:16,elHi:34,wLo:90,wHi:200,opacity:.55,name:`cloudsHigh`})),e}var Yw=90,Xw=45;function Zw(e,t){let n=Math.sin(t/Yw*Math.PI*2)*3*Math.PI/180,r=e.userData.lo??=e.getObjectByName(`clouds`)??null;r!==null&&(r.rotation.y=n);let i=e.userData.hi??=e.getObjectByName(`cloudsHigh`)??null;i!==null&&(i.rotation.y=-.7*n);let a=e.userData.haze??=e.getObjectByName(`horizonHaze`)??null;a!==null&&(a.material.opacity=1+.25*Math.sin(t/Xw*Math.PI*2))}var Qw=[36,14,36];function $w(){let e=new Ac;e.setAttribute(`position`,new Y(new Float32Array(270),3));let t=new Xl(e,new Gl({color:`#d8c9b4`,size:.09,transparent:!0,opacity:.4,depthWrite:!1,blending:2,fog:!1}));return t.name=`dust`,t.frustumCulled=!1,t}var eT=new Float32Array(270);for(let e=0;e<90;e++)for(let t=0;t<3;t++){let n=Math.sin(e*[12.9898,78.233,39.425][t])*[43758.5453,12345.6789,24681.357][t];eT[e*3+t]=n-Math.floor(n)}var tT=(e,t)=>e-t*Math.floor(e/t);function nT(e,t,n,r,i){let a=e.geometry.getAttribute(`position`);for(let e=0;e<90;e++){let o=eT[e*3],s=eT[e*3+1],c=eT[e*3+2],l=tT(o*Qw[0]+i*.25*(.5+s),Qw[0])-Qw[0]/2,u=tT(s*Qw[1]-i*.12*(.5+c),Qw[1])-Qw[1]/2,d=tT(c*Qw[2]+i*.18*(.5+o),Qw[2])-Qw[2]/2;a.setXYZ(e,t+l,n+u,r+d)}a.needsUpdate=!0}var rT=[`low`,`medium`,`high`],iT=`zt.graphicsTier`,aT=`zt-graphics-tier`,oT={low:{label:`Low`,desc:`Flat sunset colours, blob shadow. Fastest.`},medium:{label:`Medium`,desc:`Soft lane shadows, filmic colour. Phone default.`},high:{label:`High`,desc:`Sharper shadows, extra detail. Sun glow on PCs.`}};function sT(e){return e===`low`||e===`medium`||e===`high`?e:null}function cT(e){return e.cores>0&&e.cores<=4||e.memoryGb>0&&e.memoryGb<=4?`low`:`medium`}function lT(){let e={coarsePointer:!1,userAgent:``,cores:0,memoryGb:0};try{if(typeof navigator<`u`){e.userAgent=navigator.userAgent??``,e.cores=navigator.hardwareConcurrency??0;let t=navigator.deviceMemory;e.memoryGb=typeof t==`number`?t:0}typeof window<`u`&&typeof window.matchMedia==`function`&&(e.coarsePointer=window.matchMedia(`(pointer: coarse)`).matches)}catch{}return e}function uT(){try{return typeof localStorage>`u`?null:localStorage}catch{return null}}function dT(){try{return typeof location>`u`?null:sT(new URLSearchParams(location.search).get(`gfx`))}catch{return null}}function fT(e=uT(),t=lT(),n=dT()){if(n!==null)return n;if(e!==null)try{let t=sT(e.getItem(iT));if(t!==null)return t}catch{}return cT(t)}function pT(e=uT(),t=dT()){if(t!==null)return!1;if(e===null)return!0;try{return sT(e.getItem(iT))===null}catch{return!0}}function mT(e,t=uT()){if(t!==null)try{t.setItem(iT,e)}catch{}typeof window<`u`&&typeof CustomEvent==`function`&&window.dispatchEvent(new CustomEvent(aT,{detail:e}))}var hT={low:[1,1.5],medium:[1.25,2],high:[1.5,2]},gT=[`decor_rail`,`decor_canopy`,`decor_bracket`,`decor_pot`,`decor_planter`,`decor_shutter`,`decor_flag`,`decor_trim`,`decor_strings`,`decor_birds`,`decor_homeTank`,`decor_homeStraw`,`decor_homeRoof`],_T=`#eaa978`;function vT(e,t){let n=hT[e][+!t],r={normalMaps:e===`high`,atmosphere:e!==`low`&&!t,forestDensity:e===`low`?.2:e===`medium`?.7:1,casterReach:12,hideDecor:e===`low`?gT:[],governorMs:20};return e===`low`?{tier:e,maxPixelRatio:n,toneMapping:`aces`,exposure:1.1,sun:{color:`#ffb469`,intensity:3,dir:[70,38,-15]},hemi:{sky:`#ffc99c`,ground:`#5b4656`,intensity:1},fog:{color:_T,near:80,far:650},shadow:null,bloom:null,composerSamples:0,...r}:{tier:e,maxPixelRatio:n,toneMapping:`aces`,exposure:1.2,sun:{color:`#ffa65c`,intensity:4.2,dir:[70,25,-15]},hemi:{sky:`#ffc99c`,ground:`#5e4a5c`,intensity:.85},fog:{color:_T,near:75,far:620},shadow:{mapSize:e===`high`?2048:1024,halfExtent:e===`high`?t?40:48:t?24:30,distance:80,far:180,bias:-.001,normalBias:.08,radius:e===`high`?2:3},bloom:e===`high`&&!t?{strength:.22,radius:.35,threshold:.85}:null,composerSamples:e===`high`&&!t?4:0,...r}}var yT=typeof window<`u`&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;function bT(){return typeof window<`u`&&window.matchMedia(`(pointer: coarse)`).matches}var xT=10;function ST(e){let t=e.material,n=Array.isArray(t)?t[0]:t;return n!==void 0&&!(n instanceof Hc)&&!n.transparent}function CT(e){let t=new qm({canvas:e,antialias:!0});t.info.autoReset=!1;let n=bT(),r=vT(fT(),n),i=new Ls;i.fog=new Is(r.fog.color,r.fog.near,r.fog.far);let a=Jw();i.add(a);let o=$w();i.add(o);let s=new Os;s.name=`backdropRoot`;let c=0;function l(e){let t=++c;vw(()=>import(`./backdrop-ksxoOYXs.js`).then(t=>t.loadBackdrop(e)),[]).then(e=>{if(p||t!==c)e.traverse(e=>{let t=e;t.geometry?.dispose();let n=t.material;n?.map?.dispose(),n?.dispose()});else{for(let e of[...s.children])s.remove(e),e.traverse(e=>{let t=e;t.geometry&&t.geometry.dispose();let n=t.material;n&&(n.map?.dispose(),n.dispose())});s.add(e);for(let e of[`clouds`,`cloudsHigh`]){let t=a.getObjectByName(e);t&&(t.visible=!1)}}}).catch(()=>{})}l(r.tier),i.add(s);let u=new gd(r.sun.color,r.sun.intensity);i.add(u),i.add(u.target);let d=new td(r.hemi.sky,r.hemi.ground,r.hemi.intensity);i.add(d);let f=new pd(60,1,.3,3e3),p=!1,m=null,h=null,g=Sw();i.add(g);let _=null,v=0,y=new G,b=null,x=!0,S=!1,C=1,w=0,T=1,E=new G,D=new G,O=new G,k=new G,A=new G,j=new G,M=new G(0,1,0),N=new W;function P(){if(b!==null){for(let e of b.passes)e.dispose();b.dispose(),b=null}}let F=0;function ee(){P();let e=++F;r.bloom!==null&&yw(t,i,f,r).then(t=>{if(t!==null){if(p||e!==F){for(let e of t.passes)e.dispose();t.dispose()}else b=t,me()}})}function te(){t.setPixelRatio(Math.min(window.devicePixelRatio,r.maxPixelRatio)),t.toneMapping=r.toneMapping===`aces`?4:0,t.toneMappingExposure=r.exposure,t.shadowMap.enabled=r.shadow!==null,t.shadowMap.type=1,u.color.set(r.sun.color),u.intensity=r.sun.intensity,u.position.set(r.sun.dir[0],r.sun.dir[1],r.sun.dir[2]),u.target.position.set(0,0,0),E.copy(u.position).normalize(),d.color.set(r.hemi.sky),d.groundColor.set(r.hemi.ground),d.intensity=r.hemi.intensity,i.fog instanceof Is&&(i.fog.color.set(r.fog.color),i.fog.near=r.fog.near,i.fog.far=r.fog.far);let e=r.shadow;if(u.castShadow=e!==null,e!==null){u.shadow.mapSize.x!==e.mapSize&&u.shadow.map!==null&&(u.shadow.map.dispose(),u.shadow.map=null),u.shadow.mapSize.set(e.mapSize,e.mapSize);let t=u.shadow.camera;t.left=-e.halfExtent,t.right=e.halfExtent,t.top=e.halfExtent,t.bottom=-e.halfExtent,t.near=1,t.far=e.far,t.updateProjectionMatrix(),u.shadow.bias=e.bias,u.shadow.normalBias=e.normalBias,u.shadow.radius=e.radius}let n=r.atmosphere;for(let e of[`cloudsHigh`,`godRays`]){let t=a.getObjectByName(e);t!==void 0&&(t.visible=n&&!(e===`cloudsHigh`&&s.children.length>0))}o.visible=n,oe(),ie(),x=!0,S=!0,me(),ee()}function ne(e,t){if(e.name!==`decor_wallBrick`&&e.name!==`decor_wallPlaster`&&e.name!==`decor_roof`)return;let n=e.userData;n.lambert===void 0&&e.material instanceof wu&&(n.lambert=e.material);let i=n.lambert;i!==void 0&&(n.normalMap===void 0&&(n.normalMap=i.normalMap),i.normalMap=r.normalMaps?n.normalMap:null,i.needsUpdate=!0,t?(n.standard===void 0&&(n.standard=new Cu({color:i.color,vertexColors:i.vertexColors,flatShading:i.flatShading,map:i.map,normalMap:i.normalMap,roughness:.92,metalness:0})),e.material=n.standard):e.material=i)}function re(e,t){if(e!==a&&e!==s){if(e instanceof X){e.name.startsWith(`decor_`)&&(e.visible=!r.hideDecor.includes(e.name));let i=t&&ST(e);if(e.receiveShadow=i,e.castShadow=i&&e.userData.cast===!0,S){Tw(e,r.tier),ne(e,r.normalMaps&&!n);let t=e.material;if(Array.isArray(t))for(let e of t)e.needsUpdate=!0;else t.needsUpdate=!0}}for(let n of e.children)re(n,t)}}function ie(){if(m===null)return;let e=r.forestDensity;m.traverse(t=>{let n=t.userData.setForestDensity;n!==void 0&&n(e)})}let ae=new Map;function oe(){for(let e of[`clouds`,`cloudsHigh`]){let t=a.getObjectByName(e);t!==void 0&&t.traverse(e=>{let t=e.material;if(t!==void 0)for(let e of Array.isArray(t)?t:[t]){let t=ae.get(e);t===void 0&&(t=e.opacity,ae.set(e,t)),e.opacity=t*C}})}}function se(e){C=Math.min(1,Math.max(0,e)),oe()}function ce(e){T=Math.min(1,Math.max(0,e))}function le(e){w=e,me()}function ue(){x=!0,S=!0}function de(){let e=t.info,n=0;return r.shadow!==null&&i.traverse(e=>{e.isMesh===!0&&e.castShadow&&e.visible&&n++}),t.getSize(N),{calls:e.render.calls,triangles:e.render.triangles,shadowCasters:n,pixelRatio:t.getPixelRatio(),width:N.x,height:N.y,textures:e.memory.textures,geometries:e.memory.geometries,programs:e.programs?.length??0}}function fe(e){e!==r.tier&&(r=vT(e,n),te(),l(e))}let pe=e=>{let t=sT(e.detail);t!==null&&fe(t)};window.addEventListener(aT,pe);function me(){let{w:e,h:n}=pr();t.setSize(e,n,!1),b?.setPixelRatio(t.getPixelRatio()),b?.setSize(e,n),f.aspect=e/n,w===0?f.clearViewOffset():f.setViewOffset(e,n,0,w*n,e,n),f.updateProjectionMatrix()}function he(e){h=e}function ge(e,t={}){return m!==null&&i.remove(m),h=e,m=uw(e,t),i.add(m),ie(),x=!0,S=!0,m}function _e(e,t,n){f.getWorldDirection(O),D.copy(f.position).addScaledVector(O,xT),j.copy(E).negate(),k.crossVectors(j,M).normalize(),A.crossVectors(k,j);let r=2*e/t,i=Math.round(D.dot(k)/r)*r,a=Math.round(D.dot(A)/r)*r,o=D.dot(j);D.set(0,0,0).addScaledVector(k,i).addScaledVector(A,a).addScaledVector(j,o),u.target.position.copy(D),u.position.copy(D).addScaledVector(E,n)}let ve=(pT()||n&&r.tier===`medium`)&&r.tier!==`low`,ye=0,be=0,xe=0;function Se(){let e=performance.now(),t=ye===0?0:e-ye;ye=e,t===0||t>250||(be++,be<=30||(xe+=t,be<150||(ve=!1,xe/(be-30)>r.governorMs&&window.dispatchEvent(new CustomEvent(aT,{detail:`low`})))))}function I(){ve&&Se(),a.position.copy(f.position),Zw(a,yT?0:performance.now()/1e3),o.visible&&nT(o,f.position.x,f.position.y,f.position.z,performance.now()/1e3),x&&(re(i,r.shadow!==null),x=!1,S=!1);let e=r.shadow;if(e!==null&&_e(e.halfExtent,e.mapSize,e.distance),h!==null&&(_===null&&v++%30==0&&(_=i.getObjectByName(`heroRig`)??null),_!==null&&(_.getWorldPosition(y),Cw(g,h,y.x,y.y,y.z))),t.info.reset(),b!==null){let e=b.passes[1];e!==void 0&&r.bloom!==null&&(e.strength=r.bloom.strength*T),b.render()}else t.render(i,f)}function Ce(){p=!0,F++,i.traverse(e=>{let t=e.userData;t.lambert?.dispose(),t.standard?.dispose()}),window.removeEventListener(aT,pe),P(),u.shadow.map?.dispose(),t.dispose()}return te(),typeof location<`u`&&new URLSearchParams(location.search).has(`debug`)&&(window.__ztScene=i),{scene:i,camera:f,renderer:t,backdropRoot:s,getTier:()=>r.tier,setTier:fe,resize:me,buildWorld:ge,setBlobWorld:he,render:I,dispose:Ce,setCloudCover:se,setLensShift:le,setBloomScale:ce,refreshFlags:ue,frameStats:de}}var wT=.5,TT=class{el;frames=0;elapsed=0;fps=0;last=performance.now();constructor(e=document.body){this.el=document.createElement(`div`),this.el.style.cssText=`position:fixed;top:4px;left:4px;z-index:50;pointer-events:none;font:11px/1.3 monospace;color:#fff;background:rgba(0,0,0,0.45);padding:4px 6px;border-radius:4px;white-space:pre;`,e.appendChild(this.el)}update(e,t,n){let r=performance.now();this.elapsed+=(r-this.last)/1e3,this.last=r,this.frames++,this.elapsed>=wT&&(this.fps=this.frames/this.elapsed,this.frames=0,this.elapsed=0);let i=Math.sqrt(e.vx*e.vx+e.vz*e.vz);this.el.textContent=`fps `+this.fps.toFixed(0)+`
calls `+t+`  tris `+n+`
pos `+e.px.toFixed(1)+` `+e.py.toFixed(1)+` `+e.pz.toFixed(1)+`
speed `+i.toFixed(1)+`  grounded `+e.grounded}};function ET(e,t){return!(t>0)||e<0?0:e>t?t:e}function DT(e,t){return`HOP `+ET(e,t)+`/`+Math.max(0,t)}function OT(e,t,n){let r=t-n;if(!(r>0))return 0;let i=(t-e)/r;return i<0?0:i>1?1:i}function kT(e,t,n,r=``){let i=document.createElement(t);return i.id=n,i.className=(`hud `+r).trim(),e.appendChild(i),i}function AT(e){let t=Math.max(0,Math.floor(e*100+1e-6)/100);if(t<60)return t.toFixed(2);let n=Math.floor(t/60),r=t-n*60;return n+`:`+(r<10?`0`:``)+r.toFixed(2)}var jT=class{timer;timerText_;objective;pause;hint;reticle;reason;toastEl;win;winTime;winBest;winExtra;action;hintBtn;mapBtn;actionDim=!1;timerText=``;actionText=``;reticleState=-1;reasonText=``;wp;wpLabel;wpArrow;wpShown=!1;wpEdge=!1;wpFlip=!1;wpX=-1e6;wpY=-1e6;wpAngle=1e6;wpText=``;hop;hopText=``;alt;altFill;altPct=-1;constructor(e,t,n,r={}){if(this.objective=kT(e,`div`,`hud-objective`),this.objective.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5 22.5 12 12 22.5 1.5 12Z" fill="#ffc83a" stroke="#2a1a0e" stroke-width="1.5"/><path d="M12 6.5 17.5 12 12 17.5 6.5 12Z" fill="none" stroke="#2a1a0e" stroke-width="1.5"/></svg><span>Reach the Target</span>`,this.hop=kT(e,`div`,`hud-hop`),r.hopChip===!1&&(this.hop.style.display=`none`),this.alt=kT(e,`div`,`hud-alt`),this.alt.innerHTML=`<i class="alt-fill"></i><i class="alt-dot"></i>`,this.altFill=this.alt.querySelector(`.alt-fill`),this.timer=kT(e,`div`,`hud-timer`,t?`debug`:``),this.timer.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="13.5" r="8"/><path d="M12 13.5V9.5M10 2.5h4M12 2.5v3M18.5 6.5 20 5"/></g></svg><span></span>`,this.timerText_=this.timer.querySelector(`span`),this.pause=kT(e,`button`,`hud-pause`),this.pause.type=`button`,this.pause.setAttribute(`aria-label`,`Pause`),this.pause.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></g></svg>`,this.pause.addEventListener(`click`,()=>{window.dispatchEvent(new CustomEvent(`zt-menu`))}),this.hintBtn=kT(e,`button`,`hud-hintbtn`),this.hintBtn.type=`button`,this.hintBtn.setAttribute(`aria-label`,`Hint: show a zipline to take (H)`),this.hintBtn.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/></g></svg><span>HINT</span>`,r.onHint===null||r.onHint===void 0)this.hintBtn.style.display=`none`;else{let e=r.onHint;this.hintBtn.addEventListener(`click`,()=>e())}if(this.mapBtn=kT(e,`button`,`hud-mapbtn`),this.mapBtn.type=`button`,this.mapBtn.setAttribute(`aria-label`,`Hold for bird's eye overview (L or M)`),this.mapBtn.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/></g></svg><span>MAP</span>`,r.onOverview===null||r.onOverview===void 0)this.mapBtn.style.display=`none`;else{let e=r.onOverview,t=this.mapBtn;t.style.touchAction=`none`,t.addEventListener(`pointerdown`,n=>{n.preventDefault();try{t.setPointerCapture(n.pointerId)}catch{}e(!0)});let n=()=>e(!1);t.addEventListener(`pointerup`,n),t.addEventListener(`pointercancel`,n),t.addEventListener(`lostpointercapture`,n),t.addEventListener(`contextmenu`,e=>e.preventDefault())}this.wp=kT(e,`div`,`hud-waypoint`,`off`),this.wp.innerHTML=`<i class="wp-stem"></i><span class="wp-arrow"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 14l4-4 4 4" fill="none" stroke="#ffc83a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span><svg class="wp-dia" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5 22.5 12 12 22.5 1.5 12Z" fill="#ffc83a" stroke="#2a1a0e" stroke-width="1.5"/><path d="M12 6.5 17.5 12 12 17.5 6.5 12Z" fill="none" stroke="#2a1a0e" stroke-width="1.5"/></svg><span class="wp-label"></span>`,this.wpLabel=this.wp.querySelector(`.wp-label`),this.wpArrow=this.wp.querySelector(`.wp-arrow`),this.hint=kT(e,`div`,`hud-hint`),this.hint.textContent=r.hint??`Aim at a glowing anchor and hook`,this.reticle=kT(e,`div`,`hud-reticle`),this.reason=kT(e,`div`,`hud-reason`,`off`),this.toastEl=kT(e,`div`,`hud-toast`,`off`),this.win=kT(e,`div`,`hud-win`,`off`);let i=document.createElement(`h1`);i.textContent=`You made it!`,this.winTime=document.createElement(`p`),this.winBest=document.createElement(`p`),this.winExtra=document.createElement(`div`),this.winExtra.className=`win-extra`;let a=document.createElement(`button`);a.type=`button`,a.textContent=`PLAY AGAIN`,a.addEventListener(`click`,n),this.win.append(i,this.winTime,this.winBest,this.winExtra,a),this.action=e.querySelector(`#btn-jump`),this.setTime(0)}setTime(e){let t=AT(e);t!==this.timerText&&(this.timerText=t,this.timerText_.textContent=t)}setHop(e,t){let n=DT(e,t);n!==this.hopText&&(this.hopText=n,this.hop.textContent=n)}setAltitude(e){let t=Math.round(e*200)/2;t!==this.altPct&&(this.altPct=t,this.alt.style.setProperty(`--alt`,t+`%`))}objectiveIn(){let e=this.objective.classList.contains(`in-a`);this.objective.classList.toggle(`in-a`,!e),this.objective.classList.toggle(`in-b`,e)}pulseTimer(){let e=this.timerText_.classList.contains(`pulse-a`);this.timerText_.classList.toggle(`pulse-a`,!e),this.timerText_.classList.toggle(`pulse-b`,e)}fadeHint(){this.hint.classList.add(`gone`)}showHint(){this.hint.classList.remove(`gone`)}hideReticle(){this.reticle.classList.add(`gone`)}setReticle(e){e!==this.reticleState&&(this.reticleState=e,this.reticle.classList.toggle(`off`,e===0),this.reticle.classList.toggle(`lock`,e===2))}setAimReason(e){e!==this.reasonText&&(this.reasonText=e,this.reason.textContent=e,this.reason.classList.toggle(`off`,e===``))}setWaypoint(e,t,n,r,i,a,o){e!==this.wpShown&&(this.wpShown=e,this.wp.classList.toggle(`off`,!e),!e)||e&&(r!==this.wpEdge&&(this.wpEdge=r,this.wp.classList.toggle(`edge`,r)),o!==this.wpFlip&&(this.wpFlip=o,this.wp.classList.toggle(`flip`,o)),a!==this.wpText&&(this.wpText=a,this.wpLabel.textContent=a),(Math.abs(t-this.wpX)>=.5||Math.abs(n-this.wpY)>=.5)&&(this.wpX=t,this.wpY=n,this.wp.style.transform=`translate3d(`+t.toFixed(1)+`px,`+n.toFixed(1)+`px,0)`),r&&Math.abs(i-this.wpAngle)>=.01&&(this.wpAngle=i,this.wpArrow.style.transform=`rotate(`+(i+Math.PI/2).toFixed(3)+`rad)`))}toast(e){this.toastEl.textContent=e,this.toastEl.classList.remove(`off`)}hideToast(){this.toastEl.classList.add(`off`)}showWin(e,t){this.winTime.textContent=`Time `+AT(e),this.winBest.textContent=`Best `+AT(t),this.win.classList.remove(`off`)}hideWin(){this.win.classList.add(`off`),this.winExtra.replaceChildren()}setActionLabel(e){if(this.action===null||e===this.actionText)return;this.actionText=e,this.action.dataset.mode=e.toLowerCase();let t=this.action.querySelector(`.lbl`);t!==null&&(t.textContent=e),this.action.setAttribute(`aria-label`,e.charAt(0)+e.slice(1).toLowerCase())}setActionDim(e){this.action!==null&&e!==this.actionDim&&(this.actionDim=e,this.action.classList.toggle(`dim`,e))}setHintActive(e){this.hintBtn.classList.toggle(`on`,e)}setOverviewActive(e){this.mapBtn.classList.toggle(`on`,e),this.mapBtn.setAttribute(`aria-pressed`,e?`true`:`false`),this.reticle.classList.toggle(`overview`,e)}setOverviewEnabled(e){this.mapBtn.disabled=!e,this.mapBtn.classList.toggle(`dim`,!e)}destroy(){this.hintBtn.remove(),this.mapBtn.remove(),this.objective.remove(),this.hop.remove(),this.alt.remove(),this.pause.remove(),this.timer.remove(),this.hint.remove(),this.reticle.remove(),this.reason.remove(),this.wp.remove(),this.toastEl.remove(),this.win.remove()}},MT=new ae;function NT(e,t,n,r,i,a,o){let s=e.anchors[a];if(s===void 0)return!1;let c=r+t.hero.height*rt,l=s.px-n,u=s.py-c,d=s.pz-i,f=Math.sqrt(l*l+u*u+d*d);return f<1e-6?!1:(me(e,t,n,r+t.rope.handToFeet,i,n,c,i,l/f,u/f,d/f,t.rope.maxLen,o,MT),MT.anchorId===a)}function PT(e,t,n,r,i,a,o){if(e.lineOnly===1)return-1;let s=e.route[a];if(s!==void 0&&NT(e,t,n,r,i,s,o))return s;let c=-1,l=1/0;for(let a=0;a<e.anchors.length;a++){let s=e.anchors[a],u=(s.px-n)*(s.px-n)+(s.py-r)*(s.py-r)+(s.pz-i)*(s.pz-i);u>=l||NT(e,t,n,r,i,a,o)&&(c=a,l=u)}return c}function FT(e){switch(e){case 2:return`Too close`;case 3:return`Out of range`;case 4:return`Can't zip uphill`;case 5:return`Too flat`;case 6:return`Too steep`;case 7:return`Line blocked`;case 8:return`Stand on a line pad`;default:return``}}var IT=15985366,LT=12863274,RT=.1,zT=.55,BT=.85,VT=.06,HT=.001;function UT(e){return e===1?IT:e===2?iv:LT}var WT=class{group=new Os;lineGeo=new nu(1,1,1);ringGeo=new du(zT,BT,24);lineMat=new Hc({color:IT,transparent:!0,opacity:.85,fog:!1});ringMat=new Hc({color:IT,transparent:!0,opacity:.9,fog:!1});line=new X(this.lineGeo,this.lineMat);ring=new X(this.ringGeo,this.ringMat);aim=new G;lastOutcome=-1;constructor(){this.ring.rotation.x=-Math.PI/2,this.group.add(this.line,this.ring),this.group.visible=!1}update(e,t,n,r,i,a,o,s,c,l){let u=i-t,d=a-n,f=o-r,p=Math.sqrt(u*u+d*d+f*f);if(e===0||p<HT)this.group.visible=!1;else{if(this.group.visible=!0,e!==this.lastOutcome){this.lastOutcome=e;let t=UT(e);this.lineMat.color.setHex(t),this.ringMat.color.setHex(t)}this.line.position.set(t+u/2,n+d/2,r+f/2),this.line.scale.set(RT,RT,p),this.aim.set(i,a,o),this.line.lookAt(this.aim),this.ring.position.set(s,c+VT,l)}}hide(){this.group.visible=!1}dispose(){this.lineGeo.dispose(),this.ringGeo.dispose(),this.lineMat.dispose(),this.ringMat.dispose()}},GT=40,KT=16765786,qT=class{group=new Os;beamGeo=new au(.2,.45,GT,8,1,!0);ringGeo=new du(.5,.75,24);beamMat=new Hc({color:16777215,vertexColors:!0,transparent:!0,blending:2,depthWrite:!1,fog:!1,side:2});ringMat=new Hc({color:KT,transparent:!0,opacity:.8,blending:2,depthWrite:!1,fog:!1,side:2});ring;constructor(){this.beamGeo.translate(0,GT/2,0);let e=this.beamGeo.getAttribute(`position`),t=new Float32Array(e.count*4);for(let n=0;n<e.count;n++){let r=.7*(1-e.getY(n)/GT);t[n*4]=1*r,t[n*4+1]=.8274509803921568*r,t[n*4+2]=.35294117647058826*r,t[n*4+3]=r}this.beamGeo.setAttribute(`color`,new Y(t,4));let n=new X(this.beamGeo,this.beamMat);n.frustumCulled=!1,this.ringGeo.rotateX(-Math.PI/2),this.ring=new X(this.ringGeo,this.ringMat),this.ring.position.y=.05,this.group.add(n,this.ring),this.group.visible=!1}update(e,t,n,r,i,a){this.group.visible=e,e&&(this.group.position.set(t,n,r),this.ring.position.y=i-n+.05,this.ring.scale.setScalar(1+.25*Math.sin(6*a)))}dispose(){this.beamGeo.dispose(),this.ringGeo.dispose(),this.beamMat.dispose(),this.ringMat.dispose()}};function JT(){return{x:0,y:0,edge:!1,angle:0}}function YT(e,t,n,r,i,a,o,s,c,l,u=0){let d=r>-a,f,p;if(d)f=o/2-t*o,p=s/2+n*o;else{let e=-r,a=t/e/(o/s*i),c=n/e/i;f=(a*.5+.5)*o,p=(.5-c*.5)*s+u}let m=!d&&f>=l&&f<=o-l&&p>=c&&p<=s-l;if(e.edge=!m,m)return e.x=f,e.y=p,e.angle=0,e;let h=f-o/2,g=p-s/2;h===0&&g===0&&(g=1);let _=Math.abs(h),v=Math.abs(g),y=_>0?(o/2-l)/_:1/0,b=v>0?(s/2-l)/v:1/0,x=Math.min(y,b);return e.x=o/2+h*x,e.y=Math.max(c,s/2+g*x),e.angle=Math.atan2(g,h),e}function XT(e){return Math.round(e)+` m`}function ZT(e,t,n,r){let i=n,a=!1;for(let o=0;o<e.length;o++){let s=e[o];s.max.y>n||t<s.min.x||t>s.max.x||r<s.min.z||r>s.max.z||(!a||s.max.y>i)&&(i=s.max.y,a=!0)}return i}function QT(e,t,n){if(!n)return Math.max(10,t*.028)+Math.max(32,t*.054)+8;let r=Math.max(10,e*.03),i=Math.min(48,Math.max(34,e*.1)),a=Math.min(30,Math.max(24,e*.07));return r+i+4+a+8}var $T=Math.tan(20*Math.PI/180),eE=2.6,tE=.6,nE=3.5;2*nE;var rE=1.8,iE=1.6,aE=.4,oE=.25,sE=.8,cE=nE,lE=.2;function uE(e){return $T*e+-8}var dE=class{n=2;gap=13;cx=0;decoy=0;pitched=0;drift=0};function fE(e,t,n){let r=(e^Math.imul(t+1,2654435761)^Math.imul(n+1,2246822507))>>>0;r=r+1831565813>>>0;let i=Math.imul(r^r>>>15,1|r);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296}function pE(e,t){let n=0;for(let r=5;r<=t;r++){let t=(Math.floor(fE(e,r,3)*7)-3)*2;n+=t,n>8&&(n=8),n<-8&&(n=-8)}return n}function mE(e,t){let n=t.chase.v0,r=t.chase.vMax;if(!(r>n))return 0;let i=(e-n)/(r-n);return i<0?0:i>1?1:i}function hE(e,t,n,r=0,i=u.chase){if(t<4){n.n=2,n.gap=13,n.cx=0,n.decoy=t===1?-1:+(t===3),n.pitched=+(t===1),n.drift=0;return}let a=fE(e,t,1);n.n=a<i.oneHouseBase+i.oneHouseGain*r?1:a<.7?2:3,n.gap=i.gapBase+fE(e,t,2)*(i.gapSpanLo+(i.gapSpanHi-i.gapSpanLo)*r),n.cx=pE(e,t);let o=pE(e,t+1);n.drift=o>n.cx?1:o<n.cx?-1:0,n.decoy=0,fE(e,t,4)<i.decoyBase+i.decoyGain*r&&(n.decoy=fE(e,t,5)<.5?-1:1),n.pitched=+(n.decoy!==0&&fE(e,t,6)<.5)}function gE(e,t){return e-7*t.n-t.gap}var _E=class{solid=new Float64Array(126);solidUsed=new Uint8Array(21);style=new Uint8Array(21);pad=new Float64Array(18);padUsed=new Uint8Array(3);anchor=new Float64Array(6);anchorUsed=new Uint8Array(2);roof=new Float64Array(6);roofUsed=0;top=new Float64Array(3);centreZ=new Float64Array(3)};function vE(e,t,n,r,i,a,o,s){let c=t*6;e[c]=n,e[c+1]=r,e[c+2]=i,e[c+3]=a,e[c+4]=o,e[c+5]=s}function yE(e,t,n,r){r.solidUsed.fill(0),r.padUsed.fill(0),r.anchorUsed.fill(0),r.roofUsed=0;let i=0,a=0;for(let n=0;n<e.n;n++){let o=t-nE-7*n,s=uE(o)+8-(n===0?0:eE),c=e.cx-4,l=e.cx+4,u=o-nE,d=o+nE;r.top[n]=s,r.centreZ[n]=o,n===0&&(i=s,a=o);let f=n*6;vE(r.solid,f,c,s-tE,u,l,s,d),r.style[f]=2,vE(r.solid,f+1,c,uE(u),u,l,s-tE,d),r.style[f+1]=1;let p=n%2==0?1:-1,m=e.cx+p*4,h=Math.min(m,m+p*rE),g=Math.max(m,m+p*rE);vE(r.solid,f+2,h,s-3-.3,u+1,g,s-3,d-1),r.style[f+2]=1,vE(r.solid,f+3,c,s,u,c+oE,s+aE,d),r.style[f+3]=4,vE(r.solid,f+4,l-oE,s,u,l,s+aE,d),r.style[f+4]=4;let _=(e.drift===0?n%2==0:e.drift>0)?c+1.1:l-1.1;vE(r.solid,f+5,_-.8,s,o-1.6,_+.8,s+sE,o),r.style[f+5]=4;for(let e=0;e<6;e++)r.solidUsed[f+e]=1;vE(r.pad,n,c+1,s,u+1,l-1,s,d-1),r.padUsed[n]=1}if(n&&(r.anchor[0]=e.cx,r.anchor[1]=i+iE,r.anchor[2]=a+1,r.anchorUsed[0]=1),e.decoy!==0){let t=e.cx+e.decoy*12,n=a-nE,o=a+nE;vE(r.solid,18,t-3.5,uE(n),n,t+3.5,i-.6,o),r.style[18]=3,r.solidUsed[18]=1,e.pitched!==0&&(vE(r.roof,0,t-3.5,i-.6,n,t+3.5,i-.6+2,o),r.roofUsed=1),r.anchor[3]=t,r.anchor[4]=i+iE,r.anchor[5]=a+1,r.anchorUsed[1]=1}let o=t+lE,s=gE(t,e)-lE,c=uE(s)-20,l=uE(o)+60;vE(r.solid,19,-36,c,s,-34,l,o),vE(r.solid,20,34,c,s,36,l,o),r.style[19]=5,r.style[20]=5,r.solidUsed[19]=1,r.solidUsed[20]=1}var bE=-1e4,xE=-6e4,SE=class{world;seed=0;slots=6;slotRow;slotZTop;spec;version;epoch=0;oldest=0;newest=0;scratch=new _E;difficulty=0;forceDifficulty=-1;cfg=null;constructor(e,t){this.world=e,this.slots=t,this.slotRow=new Int32Array(t).fill(-1),this.slotZTop=new Float64Array(t),this.spec=[];for(let e=0;e<t;e++)this.spec.push(new dE);this.version=new Int32Array(t)}};function CE(e,t){return t%e.slots}function wE(e){return 3+e*21}function TE(e){return e*3}function EE(e){return e*2}function DE(e){return e*2}function OE(e){return 1+e*2}function kE(e,t,n,r,i,a,o){e.min.x=t,e.min.y=n,e.min.z=r,e.max.x=i,e.max.y=a,e.max.z=o}function AE(e){kE(e,0,bE,0,0,bE,0)}function jE(e,t,n,r,i,a){return new x(new A(e,t,n),new A(r,i,a))}function ME(e,t,n){let r=CE(e,t),i=e.world,a=e.spec[r];e.cfg===null?hE(e.seed,t,a,e.difficulty):hE(e.seed,t,a,e.difficulty,e.cfg);let o=e.scratch;yE(a,n,t>0,o),e.slotRow[r]=t,e.slotZTop[r]=n;let s=wE(r);for(let e=0;e<21;e++){let t=i.solids[s+e];if(o.solidUsed[e]===1){let n=e*6;kE(t,o.solid[n],o.solid[n+1],o.solid[n+2],o.solid[n+3],o.solid[n+4],o.solid[n+5])}else AE(t);i.style[s+e]=o.style[e]}let c=TE(r);for(let e=0;e<3;e++){let t=i.pads[c+e];if(o.padUsed[e]===1){let n=e*6;kE(t,o.pad[n],o.pad[n+1],o.pad[n+2],o.pad[n+3],o.pad[n+4],o.pad[n+5])}else AE(t)}let l=EE(r);for(let e=0;e<2;e++){let t=i.anchors[l+e];o.anchorUsed[e]===1?(t.px=o.anchor[e*3],t.py=o.anchor[e*3+1],t.pz=o.anchor[e*3+2]):(t.px=0,t.py=bE,t.pz=0)}let u=OE(r),d=i.roofs[r],f=i.ramps[u],p=i.ramps[u+1];if(o.roofUsed===1){let e=o.roof[0],t=o.roof[1],n=o.roof[2],r=o.roof[3],i=o.roof[4],a=o.roof[5],s=(e+r)*.5;kE(d.aabb,e,t,n,r,i,a),kE(f.aabb,e,t,n,s,i,a),kE(p.aabb,s,t,n,r,i,a),f.rise=i-t,p.rise=i-t}else AE(d.aabb),AE(f.aabb),AE(p.aabb),f.rise=0,p.rise=0;e.version[r]++,e.epoch++}function NE(e,t){let n=e.world.route;n.length=0;let r=t+1;r<1&&(r=1);for(let t=r;t<=e.newest;t++)t<e.oldest||n.push(DE(CE(e,t)))}function PE(e){let t=CE(e,e.newest),n=gE(e.slotZTop[t],e.spec[t]);e.oldest++,e.newest++,ME(e,e.newest,n)}function FE(e,t){let n=Math.max(5,Math.floor(t.chase.slots)),r=new En,i=new SE(r,n);i.seed=e|0,i.cfg=t.chase,i.difficulty=mE(t.chase.v0,t),r.spawn=new A(0,0,0),r.spawnYaw=3.14159,r.killPlaneY=-1e9;let a=uE(xE);kn(r,jE(-34,a,xE,34,a,26),2,uE(26)-a);let o=uE(0)-40;On(r,jE(-34,o,26,34,80,28)),On(r,jE(-36,o,cE,-34,80,28)),On(r,jE(34,o,cE,36,80,28));for(let e=0;e<3;e++)r.style.push(5);for(let e=0;e<n;e++){for(let e=0;e<21;e++)On(r,jE(0,bE,0,0,bE,0)),r.style.push(1);for(let e=0;e<3;e++)r.pads.push(jE(0,bE,0,0,bE,0));for(let e=0;e<2;e++)jn(r,0,bE,0);An(r,jE(0,bE,0,0,bE,0),1)}let s=cE;for(let e=0;e<n;e++)ME(i,e,s),s=gE(s,i.spec[CE(i,e)]);return i.oldest=0,i.newest=n-1,NE(i,0),i}function IE(e,t){let n=t-(e.oldest<1?1:e.oldest)+1;return n<0?0:n}function LE(e,t){let n=CE(e,e.oldest),r=e.slotZTop[n]-cE,i=$T*r,a=e.world;t.solids.length=0,t.ramps.length=0,t.roofs.length=0,t.anchors.length=0,t.pads.length=0,t.route.length=0,t.style.length=0,t.killPlaneY=-1e9;for(let n=e.oldest;n<=e.newest;n++){let o=CE(e,n),s=wE(o);for(let e=0;e<21;e++){let n=a.solids[s+e],o=a.style[s+e];n.min.y<=-9999||o===5||(t.solids.push(jE(n.min.x,n.min.y-i,n.min.z-r,n.max.x,n.max.y-i,n.max.z-r)),t.style.push(o))}let c=TE(o);for(let e=0;e<3;e++){let n=a.pads[c+e];n.min.y<=-9999||t.pads.push(jE(n.min.x,n.min.y-i,n.min.z-r,n.max.x,n.max.y-i,n.max.z-r))}let l=a.roofs[o];if(l.aabb.min.y>-9999){let e=l.aabb;An(t,jE(e.min.x,e.min.y-i,e.min.z-r,e.max.x,e.max.y-i,e.max.z-r),1)}let u=EE(o);for(let e=0;e<2;e++){let n=a.anchors[u+e];if(n.py<=-9999)continue;let o=jn(t,n.px,n.py-i,n.pz-r);e===0&&t.route.push(o)}}return r}var RE=class{z=0;gap=0;t=0;v=0;caught=0};function zE(e,t){let n=new RE;return n.z=e+t.chase.startGap,n.gap=t.chase.startGap,n.v=t.chase.v0,n}function BE(e,t,n){let r=n.chase,i=Math.min(r.vMax,r.v0+r.accel*e);return t>r.gapMax?i+r.rubberK*(t-r.gapMax):i}function VE(e,t,n){let r=1/n.fixedHz;e.t+=r,e.v=BE(e.t,e.gap,n),e.z-=e.v*r,e.gap=e.z-t,e.caught=+(e.gap<=n.chase.catchGap)}function HE(e){let t=e<0?0:e>1?1:e;return t*t*(3-2*t)}function UE(e,t){let n=t.chase.catchGap,r=t.chase.fogGap;return HE((r-e)/(r-n))}var WE=.25,GE=80,KE=class{rw;dragon;spawnZ=0;heroRow=0;lastHopRow=0;hops=0;cleans=0;perfects=0;maxProgress=0;prevVy=0;ticks=0;constructor(e,t){this.rw=e,this.dragon=t}};function qE(e,t,n){let r=new KE(FE(e,n),zE(t,n));return r.spawnZ=t,r}function JE(e,t){let n=t.chase;return Math.floor(e.maxProgress)+n.scoreHop*e.hops+n.scoreClean*e.cleans+n.scorePerfect*e.perfects}function YE(e,t,n,r,i){for(let a=e.oldest;a<=e.newest;a++){let o=TE(CE(e,a));for(let e=0;e<3;e++){let a=t.pads[o+e];if(!(a.max.y<-9999)&&n>=a.min.x&&n<=a.max.x&&i>=a.min.z&&i<=a.max.z&&Math.abs(r-a.max.y)<=WE)return!0}}return!1}function XE(e,t){let n=e.oldest;for(let r=e.oldest;r<=e.newest&&!(e.slotZTop[CE(e,r)]<t-.5);r++)n=r;return n}function ZE(e,t){e.dead=1,e.mode=2,e.deadCause=t,e.eventBits|=32,e.vx=0,e.vy=0,e.vz=0,e.grounded=0,e.perfect=0,ne(e.hook)}function QE(e,t,n,r){let i=e.rw;e.ticks++;let a=t.eventBits;t.dead===0&&t.py<uE(t.pz)-GE&&ZE(t,1);let o=XE(i,t.pz);for(i.difficulty=i.forceDifficulty>=0?i.forceDifficulty:mE(e.dragon.v,r);o>=i.oldest+2;)PE(i),o=XE(i,t.pz);if(e.heroRow=o,NE(i,o),a&1){let n=t.hook.anchorId;if(n>=0&&n%2==0){let t=n/2|0,r=i.slotRow[t];r>e.lastHopRow&&(e.hops++,e.lastHopRow=r)}}a&4&&t.dead===0&&-e.prevVy<r.landing.vyClean&&YE(i,n,t.px,t.py,t.pz)&&e.cleans++,a&64&&e.perfects++;let s=e.spawnZ-t.pz;s>e.maxProgress&&(e.maxProgress=s),e.prevVy=t.vy,VE(e.dragon,t.pz,r),e.dragon.caught===1&&t.dead===0&&ZE(t,7)}function $E(e){e.traverse(e=>{e.isInstancedMesh===!0&&e.dispose();let t=e;if(t.isMesh!==!0)return;t.geometry.dispose();let n=t.material;for(let e of Array.isArray(n)?n:[n])e.dispose()})}var eD=class{onRebuilt;root=new Os;level=null;lastEpoch=-1;mini=new En;lastRebuildMs=0;rebuilds=0;constructor(e){this.onRebuilt=e,this.root.name=`chase_rows`}sync(e){if(e.epoch===this.lastEpoch)return!1;this.lastEpoch=e.epoch;let t=performance.now();this.level!==null&&(this.root.remove(this.level),$E(this.level));let n=LE(e,this.mini),r=uw(this.mini,{scenery:!1});return this.level=r,this.root.add(r),this.root.position.set(0,$T*n,n),this.root.updateMatrixWorld(!0),this.onRebuilt(),this.lastRebuildMs=performance.now()-t,this.rebuilds++,!0}invalidate(){this.lastEpoch=-1}update(e,t){this.level!==null&&fw(this.level,e,t)}dispose(){this.level!==null&&(this.root.remove(this.level),$E(this.level),this.level=null)}},tD=306/915,nD=.29,rD=.96,iD=.92,aD=.36,oD=.8,sD=.78,cD=-.24,lD=.36;function uD(e,t){return e*tD*t/nD}function dD(e){let t=Math.min(1,Math.max(0,e));return t*t*(3-2*t)}function fD(e,t,n){let r=Math.max(.2,e),i=Math.min(rD,uD(iD,r)),a=r<1?.06:0,o=0,s=0,c;r>=1.2?(c=Math.min(sD,uD(lD,r)),o=cD):(c=Math.min(aD,uD(oD,r)),s=.47-c/2);let l=dD(t);return n.cx=o*l,n.cy=a+(s-a)*l,n.h=i+(c-i)*l,n}function pD(e){let t=Math.min(1,Math.max(0,e))-1;return 1+2.4*t*t*t+1.4*t*t}function mD(e){return 1.2-.74*dD(e)}var hD=1.3,gD=20,_D=48,vD=hD*gD*nD,yD=hD*gD*tD,bD=7,xD=14,SD=2,CD=9,wD=57,TD=.4,ED=.62,DD=3.2,OD=3,kD=.8,AD=2.2,jD=1.1,MD=Math.PI*2/30,ND=1.7,PD=256,FD=.6,ID=999,LD=.9,RD=.45,zD={low:{rings:30,radial:10,clouds:34,spines:12,mane:16,seg:10},medium:{rings:44,radial:14,clouds:64,spines:18,mane:24,seg:14},high:{rings:60,radial:18,clouds:96,spines:24,mane:32,seg:18}},BD=new J(`#d89b34`),VD=new J(`#9c5f1a`),HD=new J(`#d4623a`),UD=new J(`#e58354`),WD=new J(`#a93a24`),GD=new J(`#ecd2a0`),KD=new J(`#f2dcaa`),qD=new J(`#f1e3bd`),JD=new J(`#3e0c08`),YD=new J(`#a3302a`),XD=new J(`#f0a43a`),ZD=new J(`#ff6a14`),QD=new J(`#2a0800`),$D=new J(`#f6efe2`),eO=new J(`#e4a85a`),tO=new G(0,1,0),nO=new Mo().setFromAxisAngle(tO,Math.PI);function rO(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function iO(e){return e<0?0:e>1?1:e}function aO(e){let t=iO(e);return t*t*(3-2*t)}function oO(e,t){let n=hD*gD*Math.max(.05,.85-.55*Math.max(0,e));return t.w=n,t.h=n*.62,t}var sO=new q,cO=new Mo,lO=new G,uO=new G;function dO(e,t,n,r,i,a,o,s,c,l=0){let u=new fu(1,t,Math.max(6,Math.round(t*.7)));cO.setFromAxisAngle(lO.set(0,0,1),l),sO.compose(lO.set(r,i,a),cO,uO.set(o,s,c)),u.applyMatrix4(sO),e.push({geo:u,color:n})}function fO(e,t,n,r,i,a,o){let s=new G().subVectors(i,r),c=s.length(),l=new au(o,a,c,Math.max(5,Math.round(t*.5)),1);l.translate(0,c/2,0),cO.setFromUnitVectors(tO,s.normalize()),sO.compose(r,cO,uO.set(1,1,1)),l.applyMatrix4(sO),e.push({geo:l,color:n})}function pO(e,t,n,r,i,a,o){let s=new ou(o,a,Math.max(5,Math.round(t*.5)));s.translate(0,a/2,0),cO.setFromUnitVectors(tO,lO.copy(i).normalize()),sO.compose(r,cO,uO.set(1,1,1)),s.applyMatrix4(sO),e.push({geo:s,color:n})}function mO(e){let t=[],n=0;for(let r of e){let e=r.geo.index===null?r.geo:r.geo.toNonIndexed();t.push(e),n+=e.getAttribute(`position`).count}let r=new Float32Array(n*3),i=new Float32Array(n*3),a=new Float32Array(n*3),o=0;for(let n=0;n<t.length;n++){let s=t[n].getAttribute(`position`),c=t[n].getAttribute(`normal`),l=e[n].color;for(let e=0;e<s.count;e++)r[o*3]=s.getX(e),r[o*3+1]=s.getY(e),r[o*3+2]=s.getZ(e),i[o*3]=c.getX(e),i[o*3+1]=c.getY(e),i[o*3+2]=c.getZ(e),a[o*3]=l.r,a[o*3+1]=l.g,a[o*3+2]=l.b,o++;t[n]!==e[n].geo&&t[n].dispose(),e[n].geo.dispose()}let s=new Ac;return s.setAttribute(`position`,new gc(r,3)),s.setAttribute(`normal`,new gc(i,3)),s.setAttribute(`color`,new gc(a,3)),s.computeBoundingSphere(),s}function hO(e,t,n){return new G(e,t,n)}function gO(e){let t=[];for(let n=0;n<2;n++){let r=n===0?-1:1,i=hO(r*1.5,2.2,1),a=hO(r*2.1,3.6,1.9),o=hO(r*2.3,4.7,3.3);dO(t,e,WD,i.x,i.y-.1,i.z,.85,.7,.85),fO(t,e,GD,i,a,.62,.45),fO(t,e,GD,a,o,.45,.1),dO(t,e,GD,a.x,a.y,a.z,.45,.45,.45)}dO(t,e,HD,0,.7,.8,2.7,2.3,2.6),dO(t,e,UD,0,2,.2,.9,.5,1.4);for(let n=0;n<2;n++){let r=n===0?-1:1;dO(t,e,UD,r*1.95,-.3,-.4,1.25,1.15,1.6),dO(t,e,WD,r*1.35,1.85,-1.3,1.45,.62,1.15,r*.28),pO(t,e,WD,hO(r*2.8,.1,.9),hO(r*1,.1,.9),1.5,.55)}dO(t,e,JD,0,-1,-2.2,1.15,.8,2.3),dO(t,e,HD,0,0,-2.9,1.75,1,2.5),dO(t,e,UD,0,.35,-5,1.45,.85,1);let n=hO(0,-1,-.1);for(let r=0;r<2;r++){let i=r===0?-1:1;dO(t,e,JD,i*.62,.5,-5.85,.3,.22,.14),pO(t,e,qD,hO(i*1.05,-.7,-4.4),n,1,.27)}return mO(t)}function _O(e){let t=[];dO(t,e,HD,0,-.5,-2.9,1.4,.55,2.4),dO(t,e,UD,0,-.65,-5,.9,.45,.6),dO(t,e,YD,0,-.05,-2.8,.7,.18,1.7);let n=hO(0,1,-.1);for(let r=0;r<2;r++)pO(t,e,qD,hO((r===0?-1:1)*.8,-.1,-4.6),n,.6,.16);return mO(t)}function vO(e){let t=[];for(let n=0;n<2;n++){let r=n===0?-1:1;dO(t,e,ZD,r*1.7,1,-1.85,.68,.64,.55),dO(t,e,QD,r*1.82,1,-2.3,.26,.28,.12)}return mO(t)}var yO=class{group=new Os;tier;built=null;catching=!1;bodyMat=new wu({vertexColors:!0,emissive:`#3a2408`});cloudMat=new wu({color:`#ffffff`,emissive:`#4a3a26`});flameMat=new wu({color:XD,emissive:`#a8480a`});headMat=new wu({vertexColors:!0,emissive:`#3a2410`,fog:!1});maneMat=new wu({color:`#d4553a`,emissive:`#8a2c14`,fog:!1});eyeMat=new Hc({vertexColors:!0,fog:!1,toneMapped:!1});headMats=[this.headMat,this.maneMat,this.eyeMat];bodyMats=[this.bodyMat,this.cloudMat,this.flameMat];cloudGeo=new cu(1,1);coneGeo=new ou(1,1,5).translate(0,.5,0);head=new Os;jawPivot=new Os;trX=new Float32Array(PD);trY=new Float32Array(PD);trZ=new Float32Array(PD);trCount=0;trNewest=0;ringS=new Float32Array;ringU=new Float32Array;ringRx=new Float32Array;ringRy=new Float32Array;ds=1;cx=new Float32Array;cy=new Float32Array;cz=new Float32Array;tx=new Float32Array;ty=new Float32Array;tz=new Float32Array;sx=new Float32Array;sy=new Float32Array;sz=new Float32Array;ux=new Float32Array;uy=new Float32Array;uz=new Float32Array;cosA=new Float32Array;sinA=new Float32Array;cloudData=new Float32Array;spineData=new Float32Array;tuftData=new Float32Array;maneData=new Float32Array;catchPoseScratch={cx:0,cy:0,h:0};m4=new q;q=new Mo;qCam=new Mo;p=new G;s=new G;fC=new G;fT=new G;fS=new G;fU=new G;ax=new G;ay=new G;az=new G;pTop=new G;pBot=new G;target=new G;env={w:0,h:0};constructor(e){this.tier=e,this.group.name=`chase_dragon`,this.head.name=`dragon_head`,this.jawPivot.position.set(0,-.6,.6),this.head.add(this.jawPivot),this.group.add(this.head),this.build(),this.update(0,0,0,0,30,0,!1)}setTier(e){e!==this.tier&&(this.tier=e,this.build())}get ringCount(){return this.ringS.length}spinePoint(e,t){return t.set(this.cx[e],this.cy[e],this.cz[e])}clearBuilt(){this.endCatch();let e=this.built;e!==null&&(this.group.remove(e.body,e.clouds,e.flames),this.head.remove(e.skull,e.eyes,e.mane),this.jawPivot.remove(e.jaw),e.body.geometry.dispose(),e.skull.geometry.dispose(),e.jaw.geometry.dispose(),e.eyes.geometry.dispose(),e.clouds.dispose(),e.flames.dispose(),e.mane.dispose(),this.built=null)}build(){this.clearBuilt();let e=zD[this.tier],t=rO(883296),n=e.rings,r=e.radial;this.ringS=new Float32Array(n),this.ringU=new Float32Array(n),this.ringRx=new Float32Array(n),this.ringRy=new Float32Array(n),this.ds=wD/(n-1),this.cx=new Float32Array(n),this.cy=new Float32Array(n),this.cz=new Float32Array(n),this.tx=new Float32Array(n),this.ty=new Float32Array(n),this.tz=new Float32Array(n),this.sx=new Float32Array(n),this.sy=new Float32Array(n),this.sz=new Float32Array(n),this.ux=new Float32Array(n),this.uy=new Float32Array(n),this.uz=new Float32Array(n);for(let e=0;e<n;e++){let t=e*this.ds,n=t/_D;oO(n,this.env);let r=.62+.38*aO(t/10),i=t<=_D?1:Math.max(0,1-(t-_D)/CD)**.7,a=1+.05*Math.cos(t/DD*Math.PI*2);this.ringS[e]=SD+t,this.ringU[e]=n,this.ringRx[e]=.5*TD*this.env.w*r*i*a,this.ringRy[e]=.5*ED*this.env.h*r*i*a}this.cosA=new Float32Array(r),this.sinA=new Float32Array(r);for(let e=0;e<r;e++)this.cosA[e]=Math.cos(e/r*Math.PI*2),this.sinA[e]=Math.sin(e/r*Math.PI*2);let i=new Float32Array(n*r*3),a=new Float32Array(n*r*3),o=new Float32Array(n*r*3),s=[],c=new J;for(let e=0;e<n;e++){let t=Math.floor(e*this.ds/DD)%2==0?1:.9;for(let i=0;i<r;i++){let a=this.sinA[i];a<-.4?c.copy(KD).multiplyScalar(t):c.copy(BD).lerp(VD,iO((a+.4)/1.4));let l=(e*r+i)*3;if(o[l]=c.r,o[l+1]=c.g,o[l+2]=c.b,e<n-1){let t=e*r+i,n=e*r+(i+1)%r,a=(e+1)*r+i,o=(e+1)*r+(i+1)%r;s.push(t,n,a,n,o,a)}}}let l=new Ac;l.setAttribute(`position`,new gc(i,3)),l.setAttribute(`normal`,new gc(a,3)),l.setAttribute(`color`,new gc(o,3)),l.setIndex(s);let u=new X(l,this.bodyMat);u.name=`dragon_body`,u.frustumCulled=!1;let d=e.clouds;this.cloudData=new Float32Array(d*5);let f=new Tl(this.cloudGeo,this.cloudMat,d);f.name=`dragon_clouds`;for(let e=0;e<d;e++){let n=Math.min(1,Math.max(.02,(e+.5+(t()-.5)*.8)/d));oO(n,this.env);let r=Math.min(this.env.w,this.env.h)*(.2+t()*.12),i=t(),a=t()<.5?-1:1,o;o=i<.62?(a>0?0:Math.PI)+(t()-.5)*.9:i<.9?-Math.PI/2+(t()-.5)*1.6:(a>0?.55:Math.PI-.55)+(t()-.5)*.4;let s=e*5;this.cloudData[s]=SD+n*_D,this.cloudData[s+1]=Math.cos(o)*(this.env.w/2-r),this.cloudData[s+2]=Math.sin(o)*(this.env.h/2-r),this.cloudData[s+3]=r,this.cloudData[s+4]=t()*Math.PI*2,c.copy(eO).lerp($D,iO(.5+Math.sin(o)*.7)),c.multiplyScalar(.95+t()*.08),f.setColorAt(e,c)}f.frustumCulled=!1;let p=e.spines;this.spineData=new Float32Array(p*3);for(let e=0;e<p;e++){let t=(e+.7)/(p+.4);oO(t,this.env);let n=6+t*44,r=this.ringRyAt(n),i=Math.max(.6,(this.env.h/2-r)*1.1);this.spineData[e*3]=n,this.spineData[e*3+1]=i,this.spineData[e*3+2]=i*.3}this.tuftData=new Float32Array(28);for(let e=0;e<7;e++){let t=(e-3)/3*1.1;this.tuftData[e*4]=Math.sin(t)*.9,this.tuftData[e*4+1]=.25*Math.cos(t*2),this.tuftData[e*4+2]=5.5-Math.abs(t)*1.6,this.tuftData[e*4+3]=.85-Math.abs(t)*.2}let m=new Tl(this.coneGeo,this.flameMat,p+7);m.name=`dragon_flames`,m.frustumCulled=!1;let h=new X(gO(e.seg),this.headMat);h.name=`dragon_skull`;let g=new X(_O(e.seg),this.headMat);g.name=`dragon_jaw`;let _=new X(vO(e.seg),this.eyeMat);_.name=`dragon_eyes`;let v=e.mane;this.maneData=new Float32Array(v*10);let y=new G;for(let e=0;e<v;e++){let n=-Math.PI/2+Math.PI/6+(e+.5)/v*(Math.PI*2-Math.PI/3),r=e%2,i=2.2+r*.25;y.set(Math.cos(n),Math.sin(n)*.9+.2,.9+r*.4).normalize(),this.q.setFromUnitVectors(tO,y);let a=e*10;this.maneData[a]=Math.cos(n)*i,this.maneData[a+1]=.7+Math.sin(n)*i*.9,this.maneData[a+2]=1.4+r,this.maneData[a+3]=this.q.x,this.maneData[a+4]=this.q.y,this.maneData[a+5]=this.q.z,this.maneData[a+6]=this.q.w,this.maneData[a+7]=1.5+t()*.9-(Math.sin(n)<-.5?.5:0),this.maneData[a+8]=.75+t()*.25,this.maneData[a+9]=t()*Math.PI*2}let b=new Tl(this.coneGeo,this.maneMat,v);b.name=`dragon_mane`,b.frustumCulled=!1,this.group.add(u,f,m),this.head.add(h,_,b),this.jawPivot.add(g),this.built={spec:e,body:u,bodyPos:i,bodyNor:a,clouds:f,flames:m,skull:h,jaw:g,eyes:_,mane:b},this.trCount=0}ringRyAt(e){let t=Math.min(this.ringS.length-1,Math.max(0,(e-SD)/this.ds)),n=Math.min(this.ringS.length-2,Math.floor(t)),r=t-n;return this.ringRy[n]+(this.ringRy[n+1]-this.ringRy[n])*r}update(e,t,n,r,i,a,o){let s=this.built;if(s===null)return;let c=iO((22-i)/19.5),l=o?Math.min(e,a-xD):e,u=uE(o?a:l),d=r*.4+Math.sin(t*kD)*OD+Math.sin(t*.37+1)*.8,f=u+bD-c*3+Math.sin(t*.9)*1.2-n*7,p=f-uE(l);this.feedTrail(d,p,l),this.solveSpine(d,p,l,t),this.writeBody(s,t),this.writeClouds(s,t),this.writeFlames(s,t),this.poseHead(s,d,f,l,t,c,n)}resetTrail(e,t,n){let r=Math.min(PD,Math.ceil(67/FD)+2);for(let i=0;i<r;i++)this.trX[i]=e,this.trY[i]=t,this.trZ[i]=n+(r-i)*FD;this.trNewest=r-1,this.trCount=r}feedTrail(e,t,n){if(this.trCount===0){this.resetTrail(e,t,n);return}let r=this.trNewest,i=e-this.trX[r],a=t-this.trY[r],o=n-this.trZ[r];if(i*i+a*a+o*o>1600)this.resetTrail(e,t,n);else{for(;this.trCount>1&&this.trZ[this.trNewest]<=n+.01;)this.trNewest=(this.trNewest-1+PD)%PD,this.trCount--;this.trZ[this.trNewest]<=n+.01?this.resetTrail(e,t,n):(r=this.trNewest,i=e-this.trX[r],a=t-this.trY[r],o=n-this.trZ[r],i*i+a*a+o*o>=FD*FD&&(this.trNewest=(this.trNewest+1)%PD,this.trX[this.trNewest]=e,this.trY[this.trNewest]=t,this.trZ[this.trNewest]=n,this.trCount=Math.min(PD,this.trCount+1)))}}solveSpine(e,t,n,r){let i=this.ringS.length,a=e,o=t,s=n,c=0,l=0,u=a,d=o,f=s+1e3;this.trCount>0&&(u=this.trX[this.trNewest],d=this.trY[this.trNewest],f=this.trZ[this.trNewest]);let p=Math.hypot(u-a,d-o,f-s);for(let e=0;e<i;e++){let t=this.ringS[e];for(;c+p<t&&l<this.trCount;){if(c+=p,a=u,o=d,s=f,l++,l<this.trCount){let e=(this.trNewest-l+PD)%PD;u=this.trX[e],d=this.trY[e],f=this.trZ[e]}else u=a,d=o,f=s+1e3;p=Math.hypot(u-a,d-o,f-s)}let n=p>1e-6?iO((t-c)/p):0,r=s+(f-s)*n;this.cx[e]=a+(u-a)*n,this.cy[e]=o+(d-o)*n+uE(r),this.cz[e]=r}this.frames();for(let e=0;e<i;e++){let t=this.ringU[e],n=this.ringS[e],i=aO(t/.3),a=MD*n-ND*r,o=AD*i*(.6+.4*Math.min(1,t))*Math.sin(a),s=jD*i*Math.sin(a*.8+1.3);this.cx[e]+=this.sx[e]*o+this.ux[e]*s,this.cy[e]+=this.sy[e]*o+this.uy[e]*s+2*Math.sin(Math.min(1,t)*Math.PI*.5),this.cz[e]+=this.sz[e]*o+this.uz[e]*s,oO(t,this.env);let c=uE(this.cz[e])+this.env.h*.45;this.cy[e]<c&&(this.cy[e]=c)}this.frames()}frames(){let e=this.ringS.length;for(let t=0;t<e;t++){let n=t>0?t-1:0,r=t<e-1?t+1:e-1;this.az.set(this.cx[r]-this.cx[n],this.cy[r]-this.cy[n],this.cz[r]-this.cz[n]),this.az.lengthSq()<1e-9&&this.az.set(0,0,1),this.az.normalize(),this.ax.crossVectors(tO,this.az),this.ax.lengthSq()<1e-9&&this.ax.set(1,0,0),this.ax.normalize(),this.ay.crossVectors(this.az,this.ax),this.tx[t]=this.az.x,this.ty[t]=this.az.y,this.tz[t]=this.az.z,this.sx[t]=this.ax.x,this.sy[t]=this.ax.y,this.sz[t]=this.ax.z,this.ux[t]=this.ay.x,this.uy[t]=this.ay.y,this.uz[t]=this.ay.z}}frameAt(e){let t=this.ringS.length,n=Math.min(t-1,Math.max(0,(e-SD)/this.ds)),r=Math.min(t-2,Math.floor(n)),i=r+1,a=n-r;this.fC.set(this.cx[r]+(this.cx[i]-this.cx[r])*a,this.cy[r]+(this.cy[i]-this.cy[r])*a,this.cz[r]+(this.cz[i]-this.cz[r])*a),this.fT.set(this.tx[r]+(this.tx[i]-this.tx[r])*a,this.ty[r]+(this.ty[i]-this.ty[r])*a,this.tz[r]+(this.tz[i]-this.tz[r])*a).normalize(),this.fS.set(this.sx[r]+(this.sx[i]-this.sx[r])*a,this.sy[r]+(this.sy[i]-this.sy[r])*a,this.sz[r]+(this.sz[i]-this.sz[r])*a).normalize(),this.fU.set(this.ux[r]+(this.ux[i]-this.ux[r])*a,this.uy[r]+(this.uy[i]-this.uy[r])*a,this.uz[r]+(this.uz[i]-this.uz[r])*a).normalize()}writeBody(e,t){let n=this.ringS.length,r=this.cosA.length,i=e.bodyPos,a=e.bodyNor,o=1+.02*Math.sin(t*1.6);for(let e=0;e<n;e++){let t=this.ringRx[e]*o,n=this.ringRy[e]*o,s=Math.max(.05,t),c=Math.max(.05,n);for(let o=0;o<r;o++){let l=this.cosA[o],u=this.sinA[o],d=(e*r+o)*3;i[d]=this.cx[e]+this.sx[e]*t*l+this.ux[e]*n*u,i[d+1]=this.cy[e]+this.sy[e]*t*l+this.uy[e]*n*u,i[d+2]=this.cz[e]+this.sz[e]*t*l+this.uz[e]*n*u;let f=l/s,p=u/c,m=this.sx[e]*f+this.ux[e]*p,h=this.sy[e]*f+this.uy[e]*p,g=this.sz[e]*f+this.uz[e]*p,_=Math.hypot(m,h,g)||1;m/=_,h/=_,g/=_,a[d]=m,a[d+1]=h,a[d+2]=g}}let s=e.body.geometry;s.getAttribute(`position`).needsUpdate=!0,s.getAttribute(`normal`).needsUpdate=!0}writeClouds(e,t){let n=this.cloudData,r=n.length/5;for(let i=0;i<r;i++){let r=i*5,a=n[r+4];this.frameAt(n[r]);let o=n[r+1]*(1+.04*Math.sin(t*1.3+a)),s=n[r+2]+.25*Math.sin(t*.9+a*1.7);this.p.copy(this.fC).addScaledVector(this.fS,o).addScaledVector(this.fU,s),this.s.setScalar(n[r+3]*(1+.05*Math.sin(t*1.2+a))),this.m4.compose(this.p,this.q.identity(),this.s),e.clouds.setMatrixAt(i,this.m4)}e.clouds.instanceMatrix.needsUpdate=!0}writeFlames(e,t){let n=this.spineData,r=n.length/3;for(let i=0;i<r;i++){let r=n[i*3];this.frameAt(r);let a=this.ringRyAt(r);this.p.copy(this.fC).addScaledVector(this.fU,a*.8),this.ax.copy(this.fU).addScaledVector(this.fT,.55).normalize(),this.q.setFromUnitVectors(tO,this.ax);let o=1+.08*Math.sin(t*6+i*1.9);this.s.set(n[i*3+2],n[i*3+1]*o,n[i*3+2]),this.m4.compose(this.p,this.q,this.s),e.flames.setMatrixAt(i,this.m4)}let i=this.tuftData,a=i.length/4;this.frameAt(56.5);for(let n=0;n<a;n++){this.ax.copy(this.fT).addScaledVector(this.fS,i[n*4]).addScaledVector(this.fU,i[n*4+1]).normalize(),this.q.setFromUnitVectors(tO,this.ax);let a=1+.1*Math.sin(t*5+n*2.3);this.s.set(i[n*4+3],i[n*4+2]*a,i[n*4+3]),this.m4.compose(this.fC,this.q,this.s),e.flames.setMatrixAt(r+n,this.m4)}e.flames.instanceMatrix.needsUpdate=!0}poseHead(e,t,n,r,i,a,o){let s=this.head;s.position.set(t,n,r);let c=Math.min(2,this.ringS.length-1);this.az.set(t-this.cx[c],n-this.cy[c],r-this.cz[c]),this.az.lengthSq()<1e-6&&this.az.set(0,0,-1),this.az.normalize(),this.az.y=Math.max(-.6,this.az.y-.22-.3*o),this.az.normalize().negate(),this.ax.crossVectors(tO,this.az).normalize(),this.ay.crossVectors(this.az,this.ax),this.m4.makeBasis(this.ax,this.ay,this.az),s.quaternion.setFromRotationMatrix(this.m4),s.scale.setScalar(1+a*.6+o*.25),this.jawPivot.rotation.x=-(.3+.08*Math.sin(i*1.7)+.25*o);let l=this.maneData,u=l.length/10;for(let t=0;t<u;t++){let n=t*10;this.p.set(l[n],l[n+1],l[n+2]),this.q.set(l[n+3],l[n+4],l[n+5],l[n+6]);let r=l[n+8];this.s.set(r,l[n+7]*(1+.1*Math.sin(i*5+l[n+9])),r),this.m4.compose(this.p,this.q,this.s),e.mane.setMatrixAt(t,this.m4)}e.mane.instanceMatrix.needsUpdate=!0}setHeadOrder(e,t){e.skull.renderOrder=t,e.jaw.renderOrder=t,e.eyes.renderOrder=t,e.mane.renderOrder=t}beginCatch(){this.catching=!0;for(let e of this.headMats)e.transparent=!0,e.needsUpdate=!0;for(let e of this.bodyMats)e.transparent=!0,e.needsUpdate=!0;this.built!==null&&this.setHeadOrder(this.built,ID)}endCatch(){if(!this.catching)return;this.catching=!1;for(let e of this.headMats)e.transparent=!1,e.needsUpdate=!0;for(let e of this.bodyMats)e.transparent=!1,e.opacity=1,e.needsUpdate=!0;let e=this.built;e!==null&&(this.setHeadOrder(e,0),e.body.visible=!0,e.clouds.visible=!0,e.flames.visible=!0)}get inCatch(){return this.catching}setCatch(e,t,n,r){let i=this.built;if(i===null)return;if(t<=0){this.endCatch();return}this.catching||this.beginCatch(),e.updateMatrixWorld();let a=fD(e.aspect,n,this.catchPoseScratch),o=a.cy;n>0&&(o+=Math.sin(r*1.6)*.01),this.ndcOnPlane(e,2*a.cx,2*o,this.target),this.ndcOnPlane(e,2*a.cx,2*o+a.h,this.pTop),this.ndcOnPlane(e,2*a.cx,2*o-a.h,this.pBot);let s=this.pTop.distanceTo(this.pBot);this.ndcOnPlane(e,0,1,this.pTop),this.ndcOnPlane(e,0,-1,this.pBot);let c=this.pTop.distanceTo(this.pBot),l=nD*s/tD,u=Math.min(l/vD,LD*c/yD),d=pD(t),f=Math.min(1,d),p=this.head;p.position.lerp(this.target,d),e.getWorldQuaternion(this.qCam).multiply(nO),p.quaternion.slerp(this.qCam,f);let m=p.scale.x,h=m+(u-m)*d;p.scale.set(h,h,h*(1-RD*f));let g=iO(1-t/.4);for(let e of this.bodyMats)e.opacity=g;let _=g>.01;i.body.visible=_,i.clouds.visible=_,i.flames.visible=_}ndcOnPlane(e,t,n,r){r.set(t,n,.5).applyMatrix4(e.projectionMatrixInverse),r.multiplyScalar(9/-r.z).applyMatrix4(e.matrixWorld)}headScreen(e,t){this.pTop.copy(this.head.position).project(e),t.x=.5+this.pTop.x/2,t.y=.5-this.pTop.y/2}dispose(){this.clearBuilt();for(let e of this.headMats)e.dispose();for(let e of this.bodyMats)e.dispose();this.cloudGeo.dispose(),this.coneGeo.dispose()}},bO=150,xO=6,SO=`#678a3c`,CO=`#7c8c42`,wO=`#857a50`,TO=`#43763a`,EO=`#3f5a33`,DO=`#3a5c35`;function OO(e,t){return(Math.imul((e+1)*7919,(t+3)*104729+17)>>>0)/4294967296}function kO(e,t){let n=Math.abs(e);if(n<=34)return 0;let r=n-34,i=.6+.4*Math.sin(t*2*Math.PI/108+(e>0?.7:2.1));return r*.22*i+r*r*.004}function AO(e,t,n,r,i){let a=Math.abs(e),o=n-uE(t),s=(Math.floor(t/9)%3+3)%3;r.set(SO),s===1&&r.lerp(new J(CO),.7),a<14&&r.lerp(new J(wO),.18*i);let c=Math.min(1,Math.max(0,(a-36)/40));r.lerp(new J(TO),c*(.5+.5*i));let l=Math.min(1,Math.max(0,(o-18)/50));r.lerp(new J(EO),l);let u=Math.min(1,Math.max(0,(o-55)/70));r.lerp(new J(DO),u),r.multiplyScalar(.92+.14*i)}function jO(){let e=[];for(let t=-150;t<=150.000001;t+=t<-60||t>60?15:6)e.push(t);e.indexOf(-34)<0&&e.push(-34,34),e.sort((e,t)=>e-t);let t=[];for(let e=bO;e>=-300.000001;e-=xO)t.push(e);let n=e.length,r=t.length,i=[],a=[],o=[],s=new J;for(let o=0;o<r;o++)for(let r=0;r<n;r++){let n=e[r],c=t[o],l=Math.round(108/xO),u=OO((o%l+l)%l,r),d=uE(c)+kO(n,c);i.push(n,d,c),AO(n,c,d,s,u),a.push(s.r,s.g,s.b)}for(let e=0;e+1<r;e++)for(let t=0;t+1<n;t++){let r=e*n+t,i=r+1,a=r+n,s=a+1;o.push(r,i,a,i,s,a)}let c=new Ac;c.setAttribute(`position`,new Y(i,3)),c.setAttribute(`color`,new Y(a,3)),c.setIndex(o),c.computeVertexNormals();let l=new X(c,new wu({vertexColors:!0}));return l.name=`decor_ground`,l}function MO(e){let t=new ou(1.6,6,6);t.translate(0,3,0);let n=new Tl(t,new wu({color:`#ffffff`}),e*6),r=new q,i=new Mo,a=new G,o=new G,s=new J,c=0;for(let t=0;t<6;t++)for(let l=0;l<e;l++){let e=(l%2==0?-1:1)*(38+OO(l,11)*90),u=bO-t*108-OO(l,29)*108,d=.8+OO(l,41)*1.1;a.set(e,uE(u)+kO(e,u)-.3,u),o.set(d,d*(.9+OO(l,53)*.5),d),r.compose(a,i,o),n.setMatrixAt(c,r),s.set(OO(l,61)<.5?DO:EO).multiplyScalar(.85+OO(l,67)*.3),n.setColorAt(c,s),c++}return n.count=c,n.instanceMatrix.needsUpdate=!0,n.instanceColor!==null&&(n.instanceColor.needsUpdate=!0),n.frustumCulled=!1,n.name=`chase_trees`,n}var NO=class{group=new Os;strip;trees;k=0;constructor(e){this.group.name=`chase_endlessGround`,this.strip=jO(),this.trees=MO(e),this.group.add(this.strip,this.trees),this.snap(0,!0)}snap(e,t=!1){let n=Math.round(e/108);if(n===this.k&&!t)return;this.k=n;let r=n*108;this.group.position.set(0,$T*r,r)}dispose(){this.strip.geometry.dispose(),this.strip.material.dispose(),this.trees.geometry.dispose(),this.trees.material.dispose(),this.trees.dispose()}};function PO(e,t=.55){if(!(e<t))return 0;let n=(t-Math.max(0,e))/t;return Math.min(1,n*n*.4+n*.6)}function FO(e,t,n,r=``){let i=document.createElement(t);return i.id=n,i.className=(`chase `+r).trim(),e.appendChild(i),i}var IO=class{cloud;vignette;iris;score;scoreText;distText;gap;over;overBody;boardHost;scoreV=-1;distV=-1;gapPct=-1;danger=!1;cloudV=-1;vigV=-1;catching=!1;irisX=-1;irisY=-1;irisR=-1;irisO=-1;constructor(e,t){document.body.classList.add(`mode-chase`),this.cloud=FO(e,`div`,`chase-cloud`),this.vignette=FO(e,`div`,`chase-danger`),this.iris=FO(e,`div`,`chase-iris`),this.score=FO(e,`div`,`chase-score`),this.score.innerHTML=`<span class="score">0</span><span class="dist">0 m</span>`,this.scoreText=this.score.querySelector(`.score`),this.distText=this.score.querySelector(`.dist`),this.gap=FO(e,`div`,`chase-gap`),this.gap.innerHTML=`<i class="fill"></i><span class="lbl">DRAGON</span>`,this.over=FO(e,`div`,`chase-over`,`off`),this.over.innerHTML=`<h1>Swallowed by the cloud</h1><div class="big">0</div><p class="detail"></p><p class="best"></p><div class="chase-board win-extra"></div><div class="row"><button type="button" class="retry">RETRY</button><button type="button" class="alt menu">MENU</button></div>`,this.overBody=this.over,this.boardHost=this.over.querySelector(`.chase-board`),this.over.querySelector(`.retry`).addEventListener(`click`,t),this.over.querySelector(`.menu`).addEventListener(`click`,()=>{window.dispatchEvent(new CustomEvent(`zt-menu`))})}setScore(e,t){let n=Math.floor(e);n!==this.scoreV&&(this.scoreV=n,this.scoreText.textContent=String(n));let r=Math.floor(t);r!==this.distV&&(this.distV=r,this.distText.textContent=r+` m`)}setGap(e){let t=Math.min(1,Math.max(0,e)),n=Math.round(t*100);n!==this.gapPct&&(this.gapPct=n,this.gap.style.setProperty(`--gap`,String(n/100)));let r=Math.round(PO(t)*50)/50;r!==this.vigV&&(this.vigV=r,this.vignette.style.opacity=String(r),this.vignette.classList.toggle(`pulse`,r>.6));let i=t<.3;i!==this.danger&&(this.danger=i,this.gap.classList.toggle(`danger`,i))}setCloud(e){if(this.catching)return;let t=Math.round(Math.min(1,Math.max(0,e))*100)/100;t!==this.cloudV&&(this.cloudV=t,this.cloud.style.opacity=String(t*.6))}setCatch(e,t,n,r){if(e<=0){if(!this.catching)return;this.catching=!1,document.body.classList.remove(`chase-catching`),this.iris.style.opacity=`0`,this.irisO=-1,this.cloudV=-1;return}this.catching||(this.catching=!0,document.body.classList.add(`chase-catching`),this.cloud.style.opacity=`0`);let i=this.iris.style,a=Math.round(n*1e3)/10,o=Math.round(r*1e3)/10,s=Math.round(mD(e)*1e3)/10,c=Math.round((1-Math.min(1,Math.max(0,t)))*100)/100;a!==this.irisX&&(this.irisX=a,i.setProperty(`--iris-x`,a+`%`)),o!==this.irisY&&(this.irisY=o,i.setProperty(`--iris-y`,o+`%`)),s!==this.irisR&&(this.irisR=s,i.setProperty(`--iris-r`,s+`vmin`)),c!==this.irisO&&(this.irisO=c,i.opacity=String(c))}showOver(e,t,n,r,i,a){this.overBody.querySelector(`h1`).textContent=a,this.overBody.querySelector(`.big`).textContent=String(Math.floor(e)),this.overBody.querySelector(`.detail`).textContent=Math.floor(t)+` m, `+n+` hops`,this.overBody.querySelector(`.best`).textContent=i?`New best!`:`Best `+Math.floor(r),this.over.classList.remove(`off`),document.body.classList.add(`chase-card`)}hideOver(){this.boardHost.replaceChildren(),this.over.classList.add(`off`),document.body.classList.remove(`chase-card`)}get overVisible(){return!this.over.classList.contains(`off`)}destroy(){document.body.classList.remove(`mode-chase`,`chase-card`,`chase-catching`),this.cloud.remove(),this.vignette.remove(),this.iris.remove(),this.score.remove(),this.gap.remove(),this.over.remove()}},LO=24,RO=6,zO=.04,BO=12,VO=.045,HO=8,UO=.7,WO=.8,GO=`#3a2a22`,KO=`#ffc83a`,qO=.9,JO=20,YO=.04,XO=.012,ZO=.12,QO=.35,$O=6,ek=11,tk=5e-4,nk=Math.PI*2,rk=.065,ik=`#3a2a22`,ak=[],ok=[];for(let e=0;e<=RO;e++){let t=e/RO*Math.PI*2;ak.push(Math.cos(t)),ok.push(Math.sin(t))}var sk=new J;function ck(e){for(let t=0;t<38;t++){let n=t>LO,r=n?t-LO-1:t,i=n?0:r/LO,a=i>WO?(i-WO)/.19999999999999996:0;for(let n=0;n<=RO;n++){yv(r,n,a,sk);let i=(t*7+n)*3;e[i]=sk.r,e[i+1]=sk.g,e[i+2]=sk.b}}}var lk=class{fixedLine;group=new Os;line;tube;handle;halo;wheel;sagCur=YO;vibAmp=0;vibT=0;center;trailCenter;eye=new G;tubePos;tubeNrm;linePos;tubePosAttr;tubeNrmAttr;constructor(e=!1){this.fixedLine=e,this.center=new Float32Array(75),this.trailCenter=new Float32Array(39);let t=new Ac;this.linePos=new gc(this.center,3),t.setAttribute(`position`,this.linePos),this.line=new Bl(t,new Ml({color:GO})),this.line.frustumCulled=!1,this.tubePos=new Float32Array(798),this.tubeNrm=new Float32Array(798);let n=new Float32Array(798);ck(n);let r=new Uint16Array(1296),i=0;for(let e=0;e<36;e++){let t=e<LO?e:e+1;for(let e=0;e<RO;e++){let n=t*7+e,a=(t+1)*7+e,o=a+1,s=n+1;r[i++]=n,r[i++]=s,r[i++]=o,r[i++]=n,r[i++]=o,r[i++]=a}}let a=new Ac;this.tubePosAttr=new gc(this.tubePos,3),this.tubeNrmAttr=new gc(this.tubeNrm,3),a.setAttribute(`position`,this.tubePosAttr),a.setAttribute(`normal`,this.tubeNrmAttr),a.setAttribute(`color`,new gc(n,3)),a.setIndex(new gc(r,1)),this.tube=new X(a,new wu({vertexColors:!0})),this.tube.frustumCulled=!1,this.tube.onBeforeRender=(e,t,n)=>{this.eye.copy(n.position)},this.handle=new X(new nu(.28,.1,.1),new Hc({color:KO})),this.wheel=new X(new au(rk,rk,.035,6).rotateZ(Math.PI/2),new wu({color:ik,flatShading:!0})),this.wheel.position.set(0,.08,0),this.handle.add(this.wheel);let o=new iu(qO,JO),s=o.getAttribute(`position`),c=new Float32Array(s.count*4);for(let e=0;e<s.count;e++){let t=e*4;c[t]=1,c[t+1]=1,c[t+2]=1;let n=s.getX(e),r=s.getY(e);c[t+3]=n*n+r*r<1e-6?.9:0}o.setAttribute(`color`,new gc(c,4)),this.halo=new X(o,new Hc({color:iv,vertexColors:!0,transparent:!0,blending:2,depthWrite:!1,fog:!1})),this.halo.frustumCulled=!1,this.halo.onBeforeRender=(e,t,n)=>{this.halo.quaternion.copy(n.quaternion),this.halo.updateMatrixWorld(!0)},this.group.add(this.line,this.tube,this.handle,this.halo),this.group.visible=!1}pulse(e){e>this.vibAmp&&(this.vibAmp=e),this.vibT=0}update(e,t,n,r,i,a){if(e.state===0){this.group.visible=!1,this.sagCur=YO,this.vibAmp=0,hv.live=!1;return}if(this.fixedLine){if(this.group.visible=e.state===2,this.tube.visible=!1,this.line.visible=!1,this.halo.visible=!1,hv.live=!1,e.state!==2)return;this.handle.position.set(t,n+.05,r),this.handle.lookAt(e.ax,e.ay,e.az),this.wheel.rotation.x=-e.s/rk;return}this.group.visible=!0;let o=e.state===2;hv.live=o&&hv.set&&e.anchorId===hv.anchorId;let s=e.ax,c=e.ay,l=e.az,u=XO;if(e.state===1){let a=e.len/i,o=a>0?Math.min(1,Math.max(0,1-e.flyT/a)):1;s=t+(e.ax-t)*o,c=n+(e.ay-n)*o,l=r+(e.az-r)*o,u=YO}this.sagCur+=(u-this.sagCur)*(1-Math.exp(-a/ZO));let d=this.sagCur,f=s-t,p=c-n,m=l-r,h=Math.sqrt(f*f+p*p+m*m)*d;for(let e=0;e<=LO;e++){let i=e/LO,a=-4*h*i*(1-i);this.center[e*3]=t+f*i,this.center[e*3+1]=n+p*i+a,this.center[e*3+2]=r+m*i}if(o&&this.vibAmp>0){this.vibT+=a;let e=this.vibAmp*Math.exp(-this.vibT/QO);if(e<tk)this.vibAmp=0;else for(let t=1;t<LO;t++){let n=t/LO;this.center[t*3+1]+=e*(Math.sin(nk*$O*this.vibT)*Math.sin(Math.PI*n)+.4*Math.sin(nk*ek*this.vibT)*Math.sin(nk*n))}}else o||(this.vibAmp=0);let g=0;if(o){g=VO;let i=e.ox-e.dirX*HO,a=e.oy-e.dirY*HO,o=e.oz-e.dirZ*HO;hv.live&&(hv.x-e.ox)*e.dirX+(hv.y-e.oy)*e.dirY+(hv.z-e.oz)*e.dirZ<-1&&(i=hv.x,a=hv.y,o=hv.z);let s=i-t,c=a-n,l=o-r,u=Math.sqrt(s*s+c*c+l*l)*XO;for(let e=0;e<=BO;e++){let i=e/BO;this.trailCenter[e*3]=t+s*i,this.trailCenter[e*3+1]=n+c*i-4*u*i*(1-i),this.trailCenter[e*3+2]=r+l*i}}else for(let e=0;e<=BO;e++)this.trailCenter[e*3]=t,this.trailCenter[e*3+1]=n,this.trailCenter[e*3+2]=r;(this.eye.x!==0||this.eye.y!==0||this.eye.z!==0)&&(this.pushFromEye(this.center,LO),o&&this.pushFromEye(this.trailCenter,BO)),this.linePos.needsUpdate=!0,this.writeRings(this.center,LO,0,zO),this.writeRings(this.trailCenter,BO,25,g),this.tubePosAttr.needsUpdate=!0,this.tubeNrmAttr.needsUpdate=!0,this.halo.position.set(s,c,l),this.handle.position.set(t,n+.05,r),this.handle.lookAt(s,c,l),this.wheel.rotation.x=-e.s/rk}pushFromEye(e,t){let n=this.eye.x,r=this.eye.y,i=this.eye.z;for(let a=0;a<=t;a++){let t=e[a*3]-n,o=e[a*3+1]-r,s=e[a*3+2]-i,c=Math.sqrt(t*t+o*o+s*s);if(c>=UO)continue;if(c<1e-6){e[a*3]=n+UO;continue}let l=UO/c;e[a*3]=n+t*l,e[a*3+1]=r+o*l,e[a*3+2]=i+s*l}}writeRings(e,t,n,r){for(let i=0;i<=t;i++){let a=i>0?i-1:0,o=i<t?i+1:t,s=e[o*3]-e[a*3],c=e[o*3+1]-e[a*3+1],l=e[o*3+2]-e[a*3+2],u=Math.sqrt(s*s+c*c+l*l);u<1e-6&&(s=0,c=-1,l=0,u=1),s/=u,c/=u,l/=u;let d=+(Math.abs(c)>.95),f=1-d,p=-l*f,m=l*d,h=s*f-c*d,g=Math.sqrt(p*p+m*m+h*h);g<1e-6&&(p=1,m=0,h=0,g=1),p/=g,m/=g,h/=g;let _=c*h-l*m,v=l*p-s*h,y=s*m-c*p,b=e[i*3],x=e[i*3+1],S=e[i*3+2],C=(n+i)*7;for(let e=0;e<=RO;e++){let t=ak[e],n=ok[e],i=t*p+n*_,a=t*m+n*v,o=t*h+n*y,s=(C+e)*3;this.tubePos[s]=b+i*r,this.tubePos[s+1]=x+a*r,this.tubePos[s+2]=S+o*r,this.tubeNrm[s]=i,this.tubeNrm[s+1]=a,this.tubeNrm[s+2]=o}}}dispose(){this.line.geometry.dispose(),this.tube.geometry.dispose(),this.handle.geometry.dispose(),this.wheel.geometry.dispose(),this.wheel.material.dispose(),this.halo.geometry.dispose()}},uk=.1,dk=.35,fk=.2,pk=.11,mk=.002,hk=3,gk=5,_k=-2,vk=-4,yk=8,bk=4,xk=12,Sk=.1,Ck=.15,wk=.035,Tk=.15,Ek=23,Dk=31,Ok=1.3,kk=Math.PI*2;function Ak(e,t,n){return e<t?t:e>n?n:e}var jk=class{offX=0;offY=0;fovAdd=0;kick=0;accS=0;prevSpeed=0;speedReady=0;amp=0;shakeT=0;update(e,t,n,r,i){let a=e<0?0:e>uk?uk:e;if(a===0)return;t&16&&(this.kick+=hk),t&4&&(this.kick+=gk),t&1&&(this.kick+=_k*Qm(n)),this.kick=Ak(this.kick,vk,yk),t&1&&Qm(n)>=Ck&&this.triggerShake(Sk*Qm(n)),t&16&&this.triggerShake(wk),t&64&&(i===2||i===3)&&this.triggerShake(Tk),this.speedReady===0?(this.speedReady=1,this.prevSpeed=r,this.accS=0):(this.accS+=((r-this.prevSpeed)/a-this.accS)*(1-Math.exp(-a/fk)),this.prevSpeed=r);let o=Ak(.5*this.accS,0,bk);this.fovAdd=Ak(this.kick+o,vk,xk),this.kick*=Math.exp(-a/dk),this.shakeT+=a,this.amp*=Math.exp(-a/pk),this.offY=this.amp*Math.sin(kk*Ek*this.shakeT),this.offX=.5*this.amp*Math.sin(kk*Dk*this.shakeT+Ok),this.amp<mk&&(this.amp=0,this.offX=0,this.offY=0,this.shakeT=0)}reset(){this.offX=0,this.offY=0,this.fovAdd=0,this.kick=0,this.accS=0,this.prevSpeed=0,this.speedReady=0,this.amp=0,this.shakeT=0}triggerShake(e){e>this.amp&&(this.amp=e),this.shakeT=0}},Mk=.4,Nk=2.2,Pk=.55,Fk=.03,Ik=new du(.25,.42,12,1);Ik.rotateX(-Math.PI/2);var Lk=class{mesh;material;age=Mk;amount=0;baseY=0;constructor(){this.material=new Hc({color:`#c9a27e`,transparent:!0,depthWrite:!1,opacity:0}),this.mesh=new X(Ik,this.material),this.mesh.visible=!1,this.mesh.frustumCulled=!1}trigger(e,t,n,r){this.age=0,this.amount=r<0?0:r>1?1:r,this.baseY=t,this.mesh.position.set(e,t+Fk,n),this.mesh.scale.setScalar(1),this.material.opacity=Pk*(.5+.5*this.amount),this.mesh.visible=!0}update(e){if(!this.mesh.visible)return;let t=e<0?0:e;this.age+=t;let n=this.age/Mk;if(n>=1){this.hide();return}let r=1-n;this.mesh.scale.setScalar(1+Nk*(1-r*r*r)),this.material.opacity=Pk*(.5+.5*this.amount)*r*r,this.mesh.position.y=this.baseY+Fk}hide(){this.age=Mk,this.mesh.visible=!1,this.material.opacity=0,this.mesh.scale.setScalar(1)}},Rk=1;function zk(e,t,n,r,i){let a=-1,o=-1/0;for(let s=0;s<e.length;s++){let c=e[s];t<c.min.x-i||t>c.max.x+i||n<c.min.z-i||n>c.max.z+i||c.max.y>r||c.max.y<=o||(o=c.max.y,a=r-c.max.y)}return a}function Bk(e,t,n,r,i){return t?e?!0:r>=0&&r>=i&&n<=Rk:!1}var Vk=.09,Hk=.22;function Uk(e,t){if(e<=0||e>=.55)return 1;let n=.65*t;if(e<Vk){let t=e/Vk;return 1-n*(1-(1-t)*(1-t))}let r=(e-Vk)/.4600000000000001;return 1-n*(Math.exp(-3.2*r)*Math.cos(r*Math.PI*2.5))}function Wk(e){return 1+(1-e)*Hk}function Gk(e,t,n,r,i){for(let a=0;a<e.length;a++){let o=e[a];if(!(t<o.min.x||t>o.max.x||n<o.min.z||n>o.max.z)&&Math.abs(r-o.max.y)<=i)return a}return-1}var Kk=class{pads=[];active=0;constructor(e){e!==null&&e.traverse(e=>{let t=e.userData.padSlab;t!==void 0&&(this.pads[t.index]={obj:e,cx:t.cx,cz:t.cz,base:t.base,t:-1,amp:0})})}trigger(e,t){let n=this.pads[e];n!==void 0&&(n.t<0&&this.active++,n.t=0,n.amp=t,this.apply(n))}update(e){if(this.active!==0)for(let t=0;t<this.pads.length;t++){let n=this.pads[t];n===void 0||n.t<0||(n.t+=e,n.t>=.55?(n.t=-1,this.active--,n.obj.scale.set(1,1,1),n.obj.position.set(0,0,0)):this.apply(n))}}apply(e){let t=Uk(e.t,e.amp),n=Wk(t);e.obj.scale.set(n,t,n),e.obj.position.set(e.cx*(1-n),e.base*(1-t),e.cz*(1-n))}},qk=class{acc=0;stepDt;maxSteps;constructor(e,t=5){if(!(e>0))throw RangeError(`stepDt must be > 0`);if(!(t>=1))throw RangeError(`maxSteps must be >= 1`);this.stepDt=e,this.maxSteps=t}get fixedStep(){return this.stepDt}feed(e){let t=Number.isFinite(e)&&e>0?e:0;this.acc+=t;let n=0;for(;this.acc>=this.stepDt&&n<this.maxSteps;)this.acc-=this.stepDt,n++;return this.acc>=this.stepDt&&(this.acc%=this.stepDt),n}get alpha(){return this.acc/this.stepDt}reset(){this.acc=0}},Jk=class{accumulator;fixedHz;onStep;onRender;rafId=null;last=0;running=!1;paused=!1;constructor(e){if(!(e.fixedHz>0))throw RangeError(`fixedHz must be > 0`);this.fixedHz=e.fixedHz,this.onStep=e.onStep,this.onRender=e.onRender,this.accumulator=new qk(1/e.fixedHz,e.maxSteps)}start(){this.running||(this.running=!0,this.last=performance.now(),document.addEventListener(`visibilitychange`,this.handleVisibility),this.rafId=requestAnimationFrame(this.tick))}stop(){this.running&&(this.running=!1,this.paused=!1,this.cancelFrame(),document.removeEventListener(`visibilitychange`,this.handleVisibility))}pause(){this.running&&!this.paused&&(this.paused=!0,this.cancelFrame(),this.accumulator.reset())}resume(){this.running&&this.paused&&(this.paused=!1,this.last=performance.now(),this.rafId=requestAnimationFrame(this.tick))}cancelFrame(){this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null)}tick=e=>{if(!this.running||this.paused)return;let t=(e-this.last)/1e3;this.last=e;let n=this.accumulator.feed(t);for(let e=0;e<n;e++)this.onStep();this.onRender(this.accumulator.alpha,Number.isFinite(t)&&t>0?t:0),this.rafId=requestAnimationFrame(this.tick)};handleVisibility=()=>{document.hidden?(this.cancelFrame(),this.accumulator.reset()):this.running&&!this.paused&&(this.cancelFrame(),this.last=performance.now(),this.rafId=requestAnimationFrame(this.tick))}},Yk=-.14,Xk=4,Zk=Math.PI/180;function Qk(e,t,n){return e+(t-e)*n}function $k(e){let t=Math.min(1,Math.max(0,(1-e)/.4));return t*t*(3-2*t)}function eA(e,t){if(e.aspect>=1)return{camera:t,lensShiftY:0,pitchLiftRad:Xk*Zk};let n=$k(e.aspect),r=Math.max(.2,e.aspect),i=Math.min(88,Math.max(60,2*Math.atan(Math.tan(26*Zk)/r)/Zk)),a=Qk(t.fov,Math.max(t.fov,i),n),o=Math.min(98,a+10);return{camera:{...t,fov:a,fovMax:Qk(t.fovMax,o,n),dist:Qk(t.dist,5.6,n),distSlide:Qk(t.distSlide,8,n),height:Qk(t.height,2.2,n),shoulder:Qk(t.shoulder,0,n),downhillBias:Qk(t.downhillBias,12,n)},lensShiftY:Yk*n,pitchLiftRad:Xk*Zk*(1-n)}}var tA=[{id:`valley-1`,label:`Valley Run`},{id:`home-street`,label:`Home Street`,look:`home`,pathCamera:!0},{id:`hay-run`,label:`Hay Run`,look:`home`,pathCamera:!0,tiltAssist:!0}];function nA(e){return tA.find(t=>t.id===e)}[...tA.map(e=>`g:${e.id}`)];function rA(e){return e.startsWith(`g:`)}function iA(e){return e.slice(2)}var aA=`Aim at a glowing anchor and hook`,oA=`Run, vault, grab: find the way down`,sA={classic:{hint:aA,hopChip:!0},chase:{hint:aA,hopChip:!0},strategy:{hint:`Stand on a gold pad and press Hook`,hopChip:!1},village:{hint:aA,hopChip:!0},home:{hint:`Stand on a gold pad and press Hook`,hopChip:!1}},cA={classic:`bhagdori.best.l1`,chase:`bhagdori.best.chase`,strategy:`bhagdori.best.strategy`,village:`bhagdori.best.village`,home:`bhagdori.best.nagarkot-home`};for(let e of tA)sA[`g:${e.id}`]={hint:oA,hopChip:!1},cA[`g:${e.id}`]=`bhagdori.best.g.${e.id}`;function lA(){try{return typeof localStorage>`u`?void 0:localStorage}catch{return}}function uA(e,t=lA()){try{let n=t?.getItem(cA[e]);if(n==null)return 0;let r=Number(n);return Number.isFinite(r)&&r>0?r:0}catch{return 0}}function dA(e,t,n=lA()){try{n?.setItem(cA[e],String(t))}catch{}}function fA(e){let t=Math.max(0,e),n=Math.floor(t/60),r=t-n*60;return n+`:`+(r<10?`0`:``)+r.toFixed(1)}function pA(e,t){return e===`chase`?t>0?`Best score `+Math.floor(t):`No best score yet`:t>0?`Best time `+fA(t):`No best time yet`}var mA=s({LIBRARY_KEY:()=>hA,LIBRARY_PREFIX:()=>`l:`,readLibrary:()=>vA,readLibraryLevel:()=>wA,readLibrarySource:()=>TA,removeFromLibrary:()=>SA,saveToLibrary:()=>bA,setLibraryVisible:()=>xA,visibleLibrary:()=>CA}),hA=`bhaaag.builder.library`;function gA(){try{return typeof localStorage>`u`?void 0:localStorage}catch{return}}function _A(e){if(typeof e!=`object`||!e)return!1;let t=e;return typeof t.id==`string`&&typeof t.name==`string`&&typeof t.visible==`boolean`&&typeof t.updated==`number`&&typeof t.source==`object`&&t.source!==null&&typeof t.compiled==`object`&&t.compiled!==null}function vA(e=gA()){try{let t=e?.getItem(`bhaaag.builder.library`)??null;if(t===null)return[];let n=JSON.parse(t);return Array.isArray(n)?n.filter(_A):[]}catch{return[]}}function yA(e,t){try{return t!==void 0&&(t.setItem(hA,JSON.stringify(e)),!0)}catch{return!1}}function bA(e,t,n=gA(),r=Date.now()){let i=vA(n),a=i.findIndex(t=>t.id===e.id),o={id:e.id,name:e.name,visible:a>=0&&i[a].visible,updated:r,source:e,compiled:t};return a>=0?i[a]=o:i.push(o),yA(i,n)}function xA(e,t,n=gA()){let r=vA(n),i=r.find(t=>t.id===e);return i!==void 0&&(i.visible=t,yA(r,n))}function SA(e,t=gA()){return yA(vA(t).filter(t=>t.id!==e),t)}function CA(e=gA()){return vA(e).filter(e=>e.visible).map(({id:e,name:t,visible:n})=>({id:e,name:t,visible:n}))}function wA(e,t=gA()){if(!e.startsWith(`l:`))return null;let n=vA(t).find(t=>t.id===e.slice(2));if(n===void 0||!n.visible)return null;try{return Wn(n.compiled),n.compiled}catch{return null}}function TA(e,t=gA()){if(!e.startsWith(`l:`))return null;let n=vA(t).find(t=>t.id===e.slice(2));return n===void 0||!n.visible?null:n.source}var EA=Object.assign({}),DA=null;function OA(){if(DA===null){DA=[];for(let e of Object.values(EA))try{let t=JSON.parse(e);if(typeof t!=`object`||!t)continue;let{id:n,name:r}=t;typeof n==`string`&&typeof r==`string`&&DA.push({id:n,name:r})}catch{}}return DA}var kA=[`classic`,`chase`],AA=`builder`,jA=`nagarkot-home`,MA={id:jA,label:`Nagarkot Home`,key:`home`},NA=[{id:`l1`,label:`Descent`,key:`classic`},...tA.map(e=>({id:e.id,label:e.label,key:`g:${e.id}`})),{id:`nagarkot`,label:`Nagarkot Run`,key:`strategy`},{id:`village`,label:`Cloud Village`,key:`village`}];function PA(e=!1,t=!1,n=CA()){let r=n.map(e=>({id:`l:`+e.id,label:e.name,key:`strategy`,builder:`library`}));if(!t)return[MA,...r];let i=[MA,...NA];for(let e of OA())i.push({id:`b:`+e.id,label:e.name,key:`strategy`,builder:`shipped`});return e&&i.push({id:AA,label:`My level`,key:`strategy`,builder:`local`}),[...i,...r]}function FA(e,t=PA(!0)){return e.mode===`chase`?`chase`:(t.find(t=>t.id===e.level)??t[0]).key}function IA(e){return e===null?null:e===`strategy`?`nagarkot`:e===`village`?`village`:e.startsWith(`g:`)?e.slice(2):null}var LA=`zt.level`,RA=`zt.mode2`;function zA(){try{return typeof localStorage>`u`?void 0:localStorage}catch{return}}function BA(e,t,n=zA(),r=kA){let i=e=>{try{return n?.getItem(e)??null}catch{return null}},a=e=>e!==null&&t.some(t=>t.id===e),o=e.get(`mode`),s=IA(o),c=i(RA),l=o!==null&&r.includes(o)?o:s===null&&c!==null&&r.includes(c)?c:`classic`,u=e.get(`level`)??s??i(`zt.level`);return{mode:l,level:a(u)?u:jA}}function VA(e,t=zA()){try{t?.setItem(RA,e.mode),t?.setItem(LA,e.level)}catch{}}var HA={onFinish:(e,t)=>t===0||e<t?{best:e,record:!0}:{best:t,record:!1}},UA={onFinish:(e,t)=>e>t?{best:e,record:!0}:{best:t,record:!1}},WA=e=>cA[e],GA=[{id:`classic`,label:`Classic`,enabled:!0,levels:PA,bestKey:WA,playKey:FA,rules:HA},{id:`chase`,label:`Dragon Chase`,enabled:!0,levels:()=>[],bestKey:WA,playKey:FA,rules:UA}],KA=GA.map(e=>e.id);function qA(e=GA){return e.filter(e=>e.enabled)}var JA=e=>GA.find(t=>t.id===e)??GA[0],YA=e=>JA(e).rules,XA=(e,t=PA(!0))=>JA(e.mode).playKey(e,t),ZA=e=>JA(e).bestKey(e);function QA(e,t){try{let n=t?.getItem(ZA(e)),r=n==null?0:Number(n);return Number.isFinite(r)&&r>0?r:0}catch{return 0}}function $A(e,t,n){try{n?.setItem(ZA(e),String(t))}catch{}}var ej=.15,tj=239;function nj(e){let t=ej*L;return Math.abs(e.moveX)>t||Math.abs(e.moveY)>t||((e.buttons|e.pressed)&tj)!==0}var rj=class{hz;ticks=0;firstInputTick=-1;constructor(e=60){this.hz=e}reset(){this.ticks=0,this.firstInputTick=-1}tick(e){this.firstInputTick<0&&nj(e)&&(this.firstInputTick=this.ticks),this.ticks++}get started(){return this.firstInputTick>=0}get offsetTicks(){return this.firstInputTick<0?this.ticks:this.firstInputTick}get runTicks(){return this.firstInputTick<0?0:this.ticks-this.firstInputTick}get seconds(){return this.runTicks/this.hz}};function ij(e,t,n,r,i){let a=t.seconds;if(t.runTicks<=0)return{seconds:a,best:n,record:!1};let o=YA(e).onFinish(a,n);return o.record&&$A(e,o.best,i),r.submit(e,Math.round(t.runTicks*1e3/60),t.offsetTicks),{seconds:a,best:o.best,record:o.record}}var aj=20,oj=e=>`bhagdori.lb.`+e;function sj(){try{return typeof localStorage>`u`?void 0:localStorage}catch{return}}function cj(e){let t=e;return typeof t==`object`&&!!t&&Number.isFinite(t.ms)&&t.ms>0&&Number.isFinite(t.offsetTicks)&&Number.isFinite(t.at)}function lj(e=sj(),t=Date.now){let n=t=>{try{let n=e?.getItem(oj(t)),r=n?JSON.parse(n):[];return Array.isArray(r)?r.filter(cj):[]}catch{return[]}};return{submit(r,i,a){if(!(i>0))return;let o=n(r);o.push({ms:Math.round(i),offsetTicks:Math.round(a),at:t()}),o.sort((e,t)=>e.ms-t.ms);try{e?.setItem(oj(r),JSON.stringify(o.slice(0,aj)))}catch{}},top(e,t){return n(e).sort((e,t)=>e.ms-t.ms).slice(0,t)}}}var uj=Math.PI/180,dj=Math.PI*2,fj={turnRate:60*uj,snapAngle:135*uj,commitOn:2.5,commitOff:1.5,forkMax:75*uj,nodeReach:14,lookahead:0};function pj(e){let t=e%dj;return t>Math.PI?t-=dj:t<-Math.PI&&(t+=dj),t}function mj(e,t,n,r){return Math.atan2(n-e,r-t)}function hj(e){let t=0,n=0;for(let r of e)t+=Math.sin(r),n+=Math.cos(r);return Math.atan2(t,n)}function gj(e,t){let n=new Map([[e.start,0]]),r=[e.start];for(;r.length>0;){let t=r.shift();for(let i of e.edges){let e=i.a===t?i.b:i.kind===`touch`&&i.b===t?i.a:-1;e>=0&&!n.has(e)&&(n.set(e,n.get(t)+1),r.push(e))}}let i=[];for(let r of e.nodes){let a=t.find(e=>e.id===r.id);if(a===void 0)continue;let o=[],s=-1,c=n.get(r.id)??0;for(let t of e.edges)t.a===r.id?o.push(t.b):t.kind===`touch`&&t.b===r.id&&(n.get(t.a)??0)>c&&o.push(t.a),t.b===r.id&&s<0&&(n.get(t.a)??0)<c?s=t.a:t.kind===`touch`&&t.a===r.id&&s<0&&(n.get(t.b)??0)<c&&(s=t.b);i.push({id:r.id,x:a.cx,z:a.cz,y:a.deck,heading:r.heading===void 0?void 0:r.heading*uj,exits:o,from:s})}return{nodes:i,start:e.start}}function _j(e,t){return e.nodes.find(e=>e.id===t)}function vj(e,t){let n=[];for(let r of t.exits){let i=_j(e,r);i!==void 0&&n.push(mj(t.x,t.z,i.x,i.z))}return n}function yj(e,t){let n=t.from>=0?_j(e,t.from):void 0;if(n!==void 0)return mj(n.x,n.z,t.x,t.z);let r=vj(e,t);return r.length>0?r[0]:0}function bj(e,t,n=fj){if(t.heading!==void 0)return t.heading;let r=yj(e,t),i=vj(e,t);for(let e of i)if(Math.abs(pj(e-r))>n.forkMax)return hj(i);return r}function xj(e){return e.nodes.filter(e=>e.exits.length>1)}function Sj(e,t,n){let r=e.hx??0,i=e.hz??0;return[Math.min(Math.max(t,e.x-r),e.x+r),Math.min(Math.max(n,e.z-i),e.z+i)]}function Cj(e,t,n){let[r,i]=Sj(e,t,n);return Math.sqrt((r-t)*(r-t)+(i-n)*(i-n))}var wj=1.5,Tj=.5;function Ej(e,t,n,r=fj,i=-1){if(!(r.lookahead>0))return null;let a,o=r.nodeReach;for(let r of e.nodes){let e=Cj(r,t,n);e<o&&(o=e,a=r)}if(o>Tj&&i>=0){let o=_j(e,i);o!==void 0&&Cj(o,t,n)<=r.nodeReach&&(a=o)}if(a===void 0)return null;let s=t,c=n,l=r.lookahead,u=a;for(let t=0;t<16&&u.exits.length!==0;t++){let t=u.exits[0];if(u.exits.length>1){let n=vj(e,u),i=u.heading!==void 0||n.length===0?bj(e,u,r):hj(n),a=1/0;for(let n of u.exits){let r=_j(e,n);if(r===void 0)continue;let o=Math.abs(pj(mj(u.x,u.z,r.x,r.z)-i));o<a&&(a=o,t=n)}}let n=_j(e,t);if(n===void 0)break;let[i,a]=Sj(n,s,c),o=Math.sqrt((i-s)*(i-s)+(a-c)*(a-c));if(o<l){s=i,c=a,l-=o,u=n;continue}let d=(i-s)/o,f=(a-c)/o;s+=d*l,c+=f*l;break}let d=s-t,f=c-n;return d*d+f*f<wj*wj?null:Math.atan2(d,f)}var Dj=class{pg;cfg;heading=0;target=0;node=-1;fork=-1;committed=-1;paused=!1;constructor(e,t=fj){this.pg=e,this.cfg=t}setLead(e,t){this.cfg={...this.cfg,lookahead:e,turnRate:t*uj}}lead(e,t){if(this.committed>=0)return;let n=Ej(this.pg,e,t,this.cfg,this.node);n!==null&&(this.target=n)}reset(e,t,n){this.heading=n,this.target=n,this.node=-1,this.fork=-1,this.committed=-1,this.paused=!1,this.landed(e,t),this.heading=this.target}nearest(e,t){let n,r=this.cfg.nodeReach*this.cfg.nodeReach;for(let i of this.pg.nodes){let a=(i.x-e)*(i.x-e)+(i.z-t)*(i.z-t);a<r&&(r=a,n=i)}return n}landed(e,t){this.paused=!1;let n=this.nearest(e,t);if(n===void 0)return;this.node=n.id,this.committed=-1,this.fork=-1;let r=vj(this.pg,n);r.length>1?(this.fork=n.id,this.target=bj(this.pg,n,this.cfg)):r.length===1?this.target=n.heading===void 0?r[0]:n.heading:n.heading!==void 0&&(this.target=n.heading),this.lead(e,t)}nextTarget(){let e=this.node>=0?_j(this.pg,this.node):void 0;if(e===void 0)return null;let t=this.committed;if(t<0&&e.exits.length===1&&(t=e.exits[0]),t<0){let n=1/0;for(let r of e.exits){let i=_j(this.pg,r);if(i===void 0)continue;let a=Math.abs(pj(mj(e.x,e.z,i.x,i.z)-this.heading));a<n&&(n=a,t=r)}}let n=t>=0?_j(this.pg,t):void 0;return n===void 0||n.y===void 0?null:{x:n.x,z:n.z,y:n.y}}update(e,t,n,r=!1){if(r&&(this.paused=!0),this.paused)return this.heading;let i=this.fork>=0?_j(this.pg,this.fork):void 0;if(i!==void 0){let e=t-i.x,r=n-i.z,a=Math.sqrt(e*e+r*r);if(this.committed<0&&a>=this.cfg.commitOn){let t=Math.atan2(e,r),n=1/0;for(let e of i.exits){let r=_j(this.pg,e);if(r===void 0)continue;let a=Math.abs(pj(mj(i.x,i.z,r.x,r.z)-t));a<n&&(n=a,this.committed=e,this.target=mj(i.x,i.z,r.x,r.z))}}else this.committed>=0&&a<this.cfg.commitOff&&(this.committed=-1,this.target=bj(this.pg,i,this.cfg))}this.lead(t,n);let a=pj(this.target-this.heading);if(Math.abs(a)>this.cfg.snapAngle)this.heading=this.target;else if(Math.abs(a)<1e-4)this.heading=this.target;else{let t=this.cfg.turnRate*Math.min(1,Math.max(.15,Math.abs(a)/(5*uj))),n=Math.min(Math.abs(a),t*e);this.heading=pj(this.heading+Math.sign(a)*n)}return this.heading}},Oj=Math.PI/180,kj={pitch:-75*Oj,standSpeed:1.5,standSec:.4,bearingMax:60*Oj,dropMin:1.5,distMax:25,easeIn:.5,easeOut:.3,rigPitchMinDeg:-78,reticleHide:10*Oj},Aj=class{still=0;k=0};function jj(e){e.still=0,e.k=0}function Mj(e,t,n,r,i=kj){let a=Math.sqrt(t.vx*t.vx+t.vz*t.vz),o=t.grounded&&!t.attached&&a<i.standSpeed;e.still=o?e.still+r:0;let s=!1;if(o&&e.still>=i.standSec&&!t.look&&n!==null){let e=n.x-t.px,r=n.z-t.pz;s=Math.sqrt(e*e+r*r)<=i.distMax&&t.py-n.y>=i.dropMin&&Math.abs(pj(mj(t.px,t.pz,n.x,n.z)-t.camYaw))<i.bearingMax}return e.k=s?Math.min(1,e.k+r/i.easeIn):Math.max(0,e.k-r/i.easeOut),e.k*Math.max(0,t.basePitch-i.pitch)}function Nj(e,t,n){let r=e/(t>0?t:1);return{w:e,h:t,aspect:r,orientation:r>=1?`landscape`:`portrait`,coarse:n}}function Pj(){let e=pr();return Nj(e.w,e.h,window.matchMedia(`(pointer: coarse)`).matches)}function Fj(e){let t=Pj(),n=0,r=0,i=()=>{n=0;let r=Pj(),i=r.orientation!==t.orientation;t=r,e(r,i)},a=()=>{n===0&&(n=requestAnimationFrame(i))},o=()=>{a(),window.clearTimeout(r),r=window.setTimeout(a,250)};return window.addEventListener(`resize`,a),window.addEventListener(`orientationchange`,o),window.visualViewport?.addEventListener(`resize`,a),()=>{window.removeEventListener(`resize`,a),window.removeEventListener(`orientationchange`,o),window.visualViewport?.removeEventListener(`resize`,a),n!==0&&cancelAnimationFrame(n),window.clearTimeout(r)}}var Ij=.3,Lj=.8,Rj=3.5,zj=3.2,Bj=1.1,Vj=new J(`#cdd0da`),Hj=.9,Uj={1:`Missed the roofs`,2:`Too low: hit the wall too fast. Hold BRAKE to slow down`,3:`Too hard a landing`,4:`Hit a hazard`,7:`The dragon caught you`};function Wj(e){let t=e<0?0:e>1?1:e;return t*t*(3-2*t)}var Gj=Math.PI/180;function Kj(e){return Math.PI-e}function qj(e,t){e.pos.x=t.pos.x,e.pos.y=t.pos.y,e.pos.z=t.pos.z,e.lookAt.x=t.lookAt.x,e.lookAt.y=t.lookAt.y,e.lookAt.z=t.lookAt.z,e.focus.x=t.focus.x,e.focus.y=t.focus.y,e.focus.z=t.focus.z,e.arm=t.arm,e.yaw=t.yaw,e.pitch=t.pitch,e.fov=t.fov,e.initialized=t.initialized}function Jj(e){if(e===void 0)throw Error(`strategy level not loaded`);return e}function Yj(e,t,n=`classic`,r,i,a,o=lj(),s){let l=b(n),u=l.camera,d=0,f=new URLSearchParams(location.search),p=Number(f.get(`tilt`)),m=f.has(`tilt`)&&Number.isFinite(p)?p:l.camera.tiltDeg,h=Math.min(Math.max(m,0),45)*Gj,g=n===`chase`,_=n===`strategy`||s!==void 0,v=n===`village`,y=rA(n);if(y&&a===void 0)throw Error(`graph assets not loaded`);let x=y&&a!==void 0?a.placeGraph(a.loadGraph(iA(n))):null,S=y&&a!==void 0&&x!==null&&nA(iA(n))?.pathCamera===!0?a.buildPathGraph(a.loadGraph(iA(n)),x.houses.map(e=>({id:e.id,cx:e.cx,cz:e.cz,deck:TS(e)}))):null,w=S!==null&&a!==void 0?new a.PathCam(S):s?.pathCam??null;w!==null&&w.setLead(l.camera.pathLookahead,l.camera.pathTurnDeg);let T=w!==null&&nA(iA(n))?.tiltAssist===!0&&f.get(`assist`)!==`0`,E=new Aj,D=0;if(v&&r===void 0)throw Error(`village assets not loaded`);let O=f.get(`seed`),k=O!==null&&Number.isFinite(Number(O)),j=k?Number(O)|0:Math.random()*2147483647|0,M=Number(f.get(`dragonGap`));g&&f.has(`dragonGap`)&&Number.isFinite(M)&&M>0&&(l.chase.startGap=M);let N=g?qE(j,0,l):null,P=N===null?x===null?s===void 0?_?Wn(Jj(i)):Un(r!==void 0&&v?r.villageText:c):Wn(s.level):Wn(x.level):N.rw.world,F=CT(e),ee=N===null?F.buildWorld(P,{houseDress:x===null&&s===void 0,graph:s===void 0?x===null?void 0:{houses:x.houses,props:x.props,profile:x.profile,seed:x.seed,look:nA(iA(n))?.look,patches:x.patches,field:x.field}:s.graph,floorY:r!==void 0&&v?r.VILLAGE_CLOUD_TOP_Y:void 0}):null;ee!==null&&S!==null&&x!==null&&a!==void 0&&ee.add(a.buildForkMarkers(S,x.edges)),N!==null&&F.setBlobWorld(P);let te=g?new eD(()=>F.refreshFlags()):null,ne=e=>e===`low`?8:e===`medium`?16:26,re=F.getTier(),ie=g?new NO(ne(re)):null,oe=g?new yO(re):null;if(r!==void 0&&v){F.scene.add(r.buildCloudSea(re));let e=r.buildCloudBanks(P.solids,P.style);e!==null&&F.scene.add(e)}te!==null&&F.scene.add(te.root),ie!==null&&F.scene.add(ie.group),oe!==null&&F.scene.add(oe.group);let se=null;F.scene.traverse(e=>{se===null&&e instanceof gd&&(se=e)});let ce={near:0,far:0,color:``},le=0,ue=``,de=0,fe=!1,pe=0,_e=!1,ve=0,ye={x:.5,y:.5},be=new Z_;F.scene.add(be.group);let xe=new qT;F.scene.add(xe.group);let Se=JT(),I=new G,Ce=new lk(P.lineOnly===1),L=new tv,Ee=[0,0,0];F.scene.add(Ce.group);let R=new WT;F.scene.add(R.group);let De=new jk,Oe=new Lk,ke=new Kk(ee);F.scene.add(Oe.mesh);let je=new ci,Me=0,Ne=0,Pe=new URLSearchParams(location.search).has(`debug`),Fe=Pe&&new URLSearchParams(location.search).has(`catchHold`),Ie=Pe?new TT:null,Le=we(),B=we(),Re=z(),ze=window.matchMedia(`(pointer: coarse)`).matches,Be=ze?new kr(t):new Xn(e),Ve=new di,He=new di,Ue=new A(0,0,0),We=1/l.fixedHz,Ge=new ae,Ke=new Qt,qe=1/l.aim.previewHz,Je=-1,Ye=-1,V=0,Xe=`pan`,Ze=0,Qe=!1,$e=0,et=new rj(l.fixedHz),tt=0,nt=!1,rt=!1,it=Pj(),at=0,ot=!1,st=0,ct=!1,lt=!0,ut=Ti(),dt=Ti(),ft=[],pt=[],mt={zip:0,side:0},ht=-1,gt=0,_t=-1,vt=0,yt=0,bt=-1,xt=0,St=0,Ct=(()=>{try{return typeof localStorage>`u`?void 0:localStorage}catch{return}})(),wt=QA(n,Ct);function Tt(){Te(B,we()),B.px=P.spawn.x,B.py=P.spawn.y,B.pz=P.spawn.z,B.yaw=P.spawnYaw,B.camYaw=P.spawnYaw,B.camPitch=l.camera.frontPitchDeg*Gj,w!==null&&(w.reset(B.px,B.pz,B.camYaw),B.camYaw=w.heading),mt.zip=0,mt.side=0,jj(E),D=0,ot=!1,st=0,ct=!1,kt.setOverviewActive(!1),ht=-1,gt=0,_t=-1,kt.setHintActive(!1),B.grounded=1,B.mode=1,Te(Le,B)}let Et=0;function Dt(){if(Ue.x=B.px,Ue.y=B.py,Ue.z=B.pz,B.eventBits&1024){let e=be.drawnX-B.px,t=be.drawnY-B.py,n=be.drawnZ-B.pz;Math.hypot(e,t,n)<=4&&(Ue.x+=e,Ue.y+=t,Ue.z+=n)}else Ue.x+=be.mantleOx,Ue.y+=be.mantleOy,Ue.z+=be.mantleOz;let e=Math.sqrt(B.vx*B.vx+B.vz*B.vz);Et=B.grounded===1?Math.min(1,Math.max(0,(e-l.hero.run)/(l.hero.sprintSpeed-l.hero.run||1))):0;let t=g&&l.chase.frontPov>=.5,n=g?Si(B.camYaw,l.chase.frontPov):Kj(B.camYaw);Ci(mt,n,B.vx,B.vz,B.mode===3,B.dead!==0,u);let r=u,i=0;T&&w!==null&&(i=D=Mj(E,{px:B.px,py:B.py,pz:B.pz,vx:B.vx,vz:B.vz,grounded:B.mode===0,attached:B.mode===3,camYaw:B.camYaw,basePitch:B.camPitch-h,look:w.paused},w.nextTarget(),We,kj),r={...u,pitchMin:kj.rigPitchMinDeg}),gi(Ve,Ue,n+mt.zip+mt.side,B.camPitch-h+(t?.14:0)+d-i,e,P.solids,r,void 0,Et*l.hero.sprintFov),st>0&&Ot(n)}function Ot(e){let t=0,n=(e,n,r)=>{t===ft.length&&ft.push({x:0,y:0,z:0});let i=ft[t++];i.x=e,i.y=n,i.z=r},r=N===null?tt:0;for(let e=r;e<P.route.length;e++){let t=P.anchors[P.route[e]];t!==void 0&&n(t.px,t.py,t.pz)}for(let e=0;e<P.pads.length;e++){let t=P.pads[e];n((t.min.x+t.max.x)/2,t.max.y,(t.min.z+t.max.z)/2)}Jt&&n(Gt,Kt,qt),ft.length=t,Ei(Ue,e,ft,u.overviewNodes,pt),ut.px=Ve.pos.x,ut.py=Ve.pos.y,ut.pz=Ve.pos.z,ut.lx=Ve.lookAt.x,ut.ly=Ve.lookAt.y,ut.lz=Ve.lookAt.z,Di(Ue,pt,e,u,Ve.fov,F.camera.aspect,dt),Ai(ut,dt,ki(st)),Ve.pos.x=ut.px,Ve.pos.y=ut.py,Ve.pos.z=ut.pz,Ve.lookAt.x=ut.lx,Ve.lookAt.y=ut.ly,Ve.lookAt.z=ut.lz}let kt=new jT(t,Pe,()=>Nt(),{hint:sA[n].hint,hopChip:sA[n].hopChip,onHint:_||y?null:Mt,onOverview:jt});v&&h>0&&kt.hideReticle();let At=g?new IO(t,()=>Nt()):null;function jt(e){ot=e&&(Xe!==`dead`||N===null)}function Mt(){if(Xe!==`play`||P.lineOnly===1)return;let e=PT(P,l,B.px,B.py,B.pz,tt,ze?l.aim.magnetDegTouch:l.aim.magnetDegDesktop);e===-1?kt.toast(`No zipline in reach`):(ht=e,gt=l.aim.hintSec,_t=e,kt.setHintActive(!0))}function Nt(){N!==null&&(k||(j=Math.random()*2147483647|0),N=qE(j,0,l),P=N.rw.world,F.setBlobWorld(P),te?.invalidate(),ie?.snap(0,!0),fe=!1,_e=!1,de=0,At?.hideOver()),Tt(),Xe=`play`,$e=0,et.reset(),tt=0,nt=!1,Me=0,Ne=0,Je=-1,Ye=-1,kt.setAimReason(``),De.reset(),kt.hideToast(),kt.hideWin(),kt.objectiveIn(),Be instanceof kr&&Be.reset(),Ve.initialized=0,Dt(),qj(He,Ve)}function Pt(){let e=Pe?performance.now():0;Ft(),Pe&&(St+=performance.now()-e)}function Ft(){Te(Le,B),Be.sample(Re),Re.moveX=-Re.moveX;let e=ji(B.mode);e!==lt&&(lt=e,kt.setOverviewEnabled(e));let t=ot&&e;if(st=Oi(st,t,u),t!==ct&&(ct=t,kt.setOverviewActive(t)),Xe===`pan`)Ze+=We,(Qe||Ze>=(N===null?Rj:zj))&&(Xe=`play`,nt=!1,kt.objectiveIn());else if(Xe===`dead`){if($e+=We,N!==null){if(!_e&&!Fe&&$e>=(B.deadCause===7?Bj:.4)&&It(),_e&&Re.pressed&16){Nt();return}}else{let e=nt||!!(Re.pressed&16);if($e>=Lj||$e>=Ij&&e){Nt();return}}}else if(Xe===`play`){if(Be instanceof kr){let e=`jump`;B.mode===3?e=`brake`:B.mode===4&&B.hasLedge===1?e=`climb`:P.lineOnly===1&&B.grounded===1&&he(P,l,B.px,B.py,B.pz)>=0&&(e=`hook`),Be.actionMode=e,kt.setActionDim(B.mode===3),kt.setActionLabel(e.toUpperCase())}ht!==-1&&(gt-=We,(gt<=0||B.mode===3)&&(ht=-1,kt.setHintActive(!1))),zt(),w!==null&&(B.camYaw=w.update(We,B.px,B.pz,Re.lookYaw!==0||Re.lookPitch!==0)),Bt(),bt!==-1&&B.mode!==3&&(Re.hasAim=1,Re.aimYaw=Ae(vt),Re.aimPitch=Ae(yt)),Yt(B,Re,P,l),(B.eventBits&1||B.mode===3)&&(_t=-1),N!==null&&QE(N,B,P,l),et.tick(Re);let e=B.eventBits;if(e&4&&(w!==null&&w.landed(B.px,B.pz),Me|=1,-Le.vy>Ne&&(Ne=-Le.vy)),e&2&&(Me|=4),e&1&&(Me|=8),e&64&&(Me|=128,kt.pulseTimer()),e&16&&(Me|=32),e&1024&&(Me|=256),e&2048&&(Me|=512),e&4096&&(Me|=Xm),e&256&&(Me|=Zm),e&32&&(Me|=64),Le.mode!==3&&B.mode===3&&(Me|=16),Le.grounded===1&&B.grounded===0&&B.mode===1&&B.vy>2&&!(e&2)&&(Me|=2),B.eventBits&1&&kt.fadeHint(),N!==null)tt=IE(N.rw,N.heroRow);else if(B.mode===3){let e=P.route.indexOf(B.hook.anchorId);e>=0&&e+1>tt&&(tt=e+1,kt.pulseTimer())}if(B.eventBits&32)Xe=`dead`,$e=0,nt=!1,N===null&&kt.toast(Uj[B.deadCause]??`You fell`);else if(N===null&&B.dead===0&&P.goal.max.y>P.goal.min.y&&C(P.goal,B.px,B.py,B.pz)){Xe=`won`;let e=ij(n,et,wt,o,Ct);if(wt=e.best,kt.showWin(e.seconds,wt),n===`classic`){let e=et.runTicks;vw(()=>import(`./boardPanel-CliMBslD.js`).then(t=>t.mountBoard(kt.winExtra,e)),[])}kt.pulseTimer()}Vt(),Ht()}else Je=-1;qj(He,Ve),Dt()}function It(){if(N===null||At===null)return;_e=!0,ve=$e;let e=JE(N,l),t=YA(`chase`).onFinish(e,wt),n=t.record;n&&(wt=t.best,dA(`chase`,e)),At.showOver(e,N.maxProgress,N.hops,wt,n,Uj[B.deadCause]??`You fell`);let r=At.boardHost;vw(()=>import(`./boardPanel-CliMBslD.js`).then(t=>t.mountBoard(r,e,`chase`)),[])}function Lt(e){let t=F.scene.fog;if(!(t instanceof Is))return;let n=F.getTier();n!==ue&&(ue=n,ce.near=t.near,ce.far=t.far,ce.color=`#`+t.color.getHexString(),le=se===null?0:se.intensity),t.near=ce.near*(1-.92*e),t.far=ce.far*(1-.85*e)+40*e,t.color.set(ce.color).lerp(Vj,e),se!==null&&(se.intensity=le*(1-.55*e)),At?.setCloud(e)}function Rt(){return P.lineOnly===1}function zt(){if(!(Be instanceof kr)||!Be.tapPending||(Be.tapPending=!1,st>.05||Rt())||B.mode===3)return;let e=Ym(F.camera,P.anchors,Be.tapNdcX,Be.tapNdcY,F.camera.aspect,l.aim.tapRadiusNdc,B.px,B.py,B.pz,l.rope.maxLen*1.5);_t=e<0?-1:e}function Bt(){if(Rt()){bt=-1,vt=B.camYaw,yt=B.camPitch;return}let e=_t;if(e===-1){let t=P.route[tt];e=t===void 0?-1:t}if(bt=e,vt=B.camYaw,yt=B.camPitch,e===-1)return;let t=P.anchors[e];if(t===void 0){bt=-1;return}let n=t.px-B.px,r=t.py-(B.py+l.hero.height*Hj),i=t.pz-B.pz;vt=Math.atan2(n,i),yt=Math.atan2(r,Math.sqrt(n*n+i*i))}function Vt(){if(Je=-1,Xe!==`play`||D>kj.reticleHide||Rt()||B.mode===3||B.hook.state!==0){kt.setReticle(0),kt.setAimReason(``);return}Bt();let e=Math.cos(yt);me(P,l,B.px,B.py+l.rope.handToFeet,B.pz,B.px,B.py+l.hero.height*Hj,B.pz,Math.sin(vt)*e,Math.sin(yt),Math.cos(vt)*e,l.rope.maxLen,ze?l.aim.magnetDegTouch:l.aim.magnetDegDesktop,Ge),Ge.anchorId===-1?kt.setAimReason(FT(ge(P,l,B.px,B.py+l.rope.handToFeet,B.pz,B.px,B.py+l.hero.height*Hj,B.pz,Math.sin(vt)*e,Math.sin(yt),Math.cos(vt)*e,l.rope.maxLen,ze?l.aim.magnetDegTouch:l.aim.magnetDegDesktop))):kt.setAimReason(``),kt.setReticle(Ge.anchorId===-1?1:2),Je=Ge.anchorId}function Ht(){Je===-1||B.hookCd>0||B.dead===1?Ye=-1:(V+=We,(Je!==Ye||V>=qe)&&(V=0,Ye=Je,xn(B,Ye,P,l,Ke)))}let Ut=new A(46,18,-44),Wt=new A(0,24,l.chase.startGap+34),Gt=(P.goal.min.x+P.goal.max.x)/2,Kt=(P.goal.min.y+P.goal.max.y)/2,qt=(P.goal.min.z+P.goal.max.z)/2,Jt=P.goal.max.y>P.goal.min.y,Xt=Jt?(P.spawn.x+Gt)/2:P.spawn.x,Zt=Jt?(P.spawn.y+Kt)/2:P.spawn.y,$t=Jt?(P.spawn.z+qt)/2:P.spawn.z-20,en=Jt?Math.hypot(Gt-P.spawn.x,qt-P.spawn.z):40,tn=new A(Xt,Math.max(P.spawn.y,Jt?Kt:P.spawn.y)+Math.min(260,Math.max(60,en*.8)),$t+Math.min(120,en*.35)),nn=new A(Xt,Zt,$t);function rn(e,t,n){let r=Gt,i=Kt,a=qt,o=Jt,s=N===null?tt:0;if(ht!==-1){let e=P.anchors[ht];e!==void 0&&(r=e.px,i=e.py,a=e.pz,o=!0)}else if(s<P.route.length){let e=P.anchors[P.route[s]];e!==void 0&&(r=e.px,i=e.py,a=e.pz,o=!0)}let c=r-e,l=i-t,u=a-n,d=Math.sqrt(c*c+l*l+u*u),f=o&&Xe===`play`&&d>=3;if(xe.update(f,r,i,a,ZT(P.solids,r,i,a),performance.now()/1e3),!f){kt.setWaypoint(!1,0,0,!1,0,``,!1);return}let p=F.camera;p.updateMatrixWorld(),I.set(r,i+2.2,a).applyMatrix4(p.matrixWorldInverse);let{w:m,h}=pr(),g=QT(m,h,it.orientation===`portrait`);YT(Se,I.x,I.y,I.z,Math.tan(p.fov*Math.PI/360),p.near,m,h,g,28,at),kt.setWaypoint(!0,Se.x,Se.y,Se.edge,Se.angle,XT(d),Se.x>m/2)}function an(e,t){let n=N;if(n===null||te===null||ie===null||oe===null)return;F.getTier()!==re&&(re=F.getTier(),oe.setTier(re),F.scene.remove(ie.group),ie.dispose(),ie=new NO(ne(re)),F.scene.add(ie.group),te.invalidate()),te.sync(n.rw),te.update(e,IE(n.rw,n.heroRow)),ie.snap(be.group.position.z);let r=n.dragon;oe.update(r.z,e,+(Xe===`dead`&&B.deadCause===7),B.px,r.gap,F.camera.position.z,!1);let i=Xe===`pan`?0:UE(r.gap,l);de=i,Lt(de);let a=be.group.position.z;F.backdropRoot.position.set(0,$T*a,a),!fe&&r.gap<l.chase.fogGap&&Xe===`play`&&(fe=!0,je.roar()),pe-=t,pe<=0&&Xe===`play`&&(pe=.35,je.wind(i));let o=JE(n,l);At?.setScore(o,n.maxProgress),At?.setGap((r.gap-l.chase.catchGap)/(l.chase.startGap-l.chase.catchGap))}function on(e){if(P.lineOnly!==1)return;let t=be.group.position,n=B.hook,r=!1,i=0,a=0,o=0;if(B.dead===0&&n.state===2)for(let e=0;e<P.lines.length;e++){let s=P.lines[e];if(s.anchorId!==n.anchorId)continue;let c=s.zone,u=t.y+l.rope.handToFeet;ev((c.min.x+c.max.x)/2,c.max.y+l.rope.handToFeet,(c.min.z+c.max.z)/2,n.ax,n.ay,n.az,t.x,u,t.z,Ee),r=!0,i=Ee[0]-t.x,a=Ee[1]-u,o=Ee[2]-t.z;break}B.dead===0?L.step(r,i,a,o,e):L.reset(),t.x+=L.ox,t.y+=L.oy,t.z+=L.oz}function sn(e,t){let n=Pe?performance.now():0,r=be.input;r.brake=B.mode===3&&!!(Re.buttons&8),r.rolling=B.rollT>0,r.sliding=B.slideT>0,r.sprint=Et*l.hero.sprintCadence,r.dive=Bk(r.dive,B.mode===1&&B.dead===0,B.vy,zk(P.cushions,B.px,B.pz,B.py,l.hero.radius),l.hero.diveMinFall),r.events=Me,r.ropeLen=B.hook.len,r.impact=Ne,r.win=+(Xe===`won`),r.hookFlying=+(B.hook.state===1),be.update(Le,B,e,t),on(t);let i=be.group.position,a=i.x,o=i.y+l.rope.handToFeet,s=i.z,c=B.hook;if(c.state!==0){let e=c.ax-a,t=c.ay-o,n=c.az-s,i=Math.sqrt(e*e+t*t+n*n);i>1e-4&&(r.ropeDirX=e/i,r.ropeDirY=t/i,r.ropeDirZ=n/i)}else r.ropeDirX=0,r.ropeDirY=1,r.ropeDirZ=0;if(Me&1&&(Ne>=3||B.rollT>0)&&Oe.trigger(i.x,i.y,i.z,Qm(Ne)),Me&2048){let e=Gk(P.cushions,B.px,B.pz,B.py,.1);ke.trigger(e,Math.max(.55,Qm(Ne))),Oe.trigger(i.x,i.y,i.z,.4)}ke.update(t),Me&2&&Oe.trigger(i.x,i.y,i.z,.2),Me&8&&je.fire(),Me&16&&je.attach(),Me&1&&je.land(Qm(Ne)),Me&64&&je.die(),Me&64&&B.deadCause===3&&Oe.trigger(i.x,i.y,i.z,1),Oe.update(t),Me&16&&Ce.pulse(.12*Math.min(1,Math.max(.4,B.hook.v/10))),r.brake&&!rt&&Ce.pulse(.05),rt=r.brake,Ce.update(c,a,o,s,l.rope.hookSpeed,t),De.update(t,Me,Ne,Math.sqrt(B.vx*B.vx+B.vz*B.vz),B.deadCause);let u=Ye!==-1&&Xe===`play`?P.anchors[Ye]:void 0;u!==void 0&&Ke.outcome!==0?R.update(Ke.outcome,a,o,s,u.px,u.py,u.pz,Ke.x,Ke.y,Ke.z):R.hide();let d=performance.now()/1e3;N!==null&&te!==null&&ie!==null&&oe!==null?an(d,t):ee!==null&&(fw(ee,d,tt,ht),kt.setTime(et.seconds),kt.setHop(tt,P.route.length),kt.setAltitude(OT(B.py,P.spawn.y,Jt?Kt:P.spawn.y))),Xe===`pan`&&(kt.setReticle(0),kt.setAimReason(``));let f=He.pos.x+(Ve.pos.x-He.pos.x)*e,p=He.pos.y+(Ve.pos.y-He.pos.y)*e,m=He.pos.z+(Ve.pos.z-He.pos.z)*e,h=He.lookAt.x+(Ve.lookAt.x-He.lookAt.x)*e,g=He.lookAt.y+(Ve.lookAt.y-He.lookAt.y)*e,_=He.lookAt.z+(Ve.lookAt.z-He.lookAt.z)*e,v=He.fov+(Ve.fov-He.fov)*e;if(Xe===`pan`){let t=Wj((Ze+e*We)/(N===null?Rj:zj)),n=N===null?tn:Ut,r=N===null?nn:Wt;f=n.x+(f-n.x)*t,p=n.y+(p-n.y)*t,m=n.z+(m-n.z)*t,h=r.x+(h-r.x)*t,g=r.y+(g-r.y)*t,_=r.z+(_-r.z)*t}else if(N!==null&&Xe===`dead`&&B.deadCause===7){let t=Wj(($e+e*We)/Bj),n=N.dragon.z;f+=(B.px+7-f)*t,p+=(B.py+5-p)*t,m+=(B.pz-11-m)*t,h+=(0-h)*t,g+=(uE(n)+14-g)*t,_+=(n+6-_)*t}let y=v;if(Xe!==`pan`&&(f+=De.offX,p+=De.offY,g+=.5*De.offY,y+=De.fovAdd),F.camera.position.set(f,p,m),F.camera.lookAt(h,g,_),Math.abs(F.camera.fov-y)>.001&&y>0&&(F.camera.fov=y,F.camera.updateProjectionMatrix()),rn(a,o-l.rope.handToFeet,s),Be instanceof kr&&Be.render(),Pe&&(xt+=(St+(performance.now()-n)-xt)*.1,St=0),oe!==null){if(Xe===`dead`&&B.deadCause===7){let t=$e+e*We,n=Math.min(1,Math.max(0,t/Bj)),r=_e?Math.min(1,Math.max(0,(t-ve)/.35)):0;oe.setCatch(F.camera,n,r,d),F.setBloomScale(n>0?0:1),oe.headScreen(F.camera,ye),At?.setCatch(n,r,ye.x,ye.y)}else oe.setCatch(F.camera,0,0,d),F.setBloomScale(1),At?.setCatch(0,0,.5,.5)}if(F.render(),Pe){let e=N!==null&&te!==null?{rows:te.rebuilds,rebuildMs:te.lastRebuildMs,dragonGap:N.dragon.gap,heroRow:N.heroRow,newest:N.rw.newest,score:JE(N,l),cloud:de}:{};window.__ztStats={...F.frameStats(),jsMs:xt,...e}}let b=F.renderer.info.render;Ie?.update(B,b.calls,b.triangles),Me=0,Ne=0}let cn=()=>{je.unlock(),nt=!0,Xe===`pan`&&(Qe=!0)},ln=e=>{e.code!==`KeyH`||e.repeat||_||y||Mt(),e.code!==`KeyL`&&e.code!==`KeyM`||e.repeat||jt(!0)},un=e=>{(e.code===`KeyL`||e.code===`KeyM`)&&jt(!1)},dn=()=>jt(!1);window.addEventListener(`keydown`,ln),window.addEventListener(`keyup`,un),window.addEventListener(`blur`,dn),window.addEventListener(`keydown`,cn,!0),window.addEventListener(`pointerdown`,cn,!0);let fn=()=>{je.unlock()};window.addEventListener(`pointerup`,fn,!0),Tt(),Dt(),qj(He,Ve);let pn=new Jk({fixedHz:l.fixedHz,onStep:Pt,onRender:sn});pn.start();let mn=(e,t)=>{it=e,F.resize();let n=eA(e,l.camera);u=n.camera,d=n.pitchLiftRad,F.setLensShift(n.lensShiftY),at=-n.lensShiftY*e.h,document.documentElement.style.setProperty(`--lens-shift`,String(n.lensShiftY)),t&&Be instanceof kr&&Be.reset()};mn(it,!1);let hn=Fj(mn);return{mode:n,pause(){pn.pause(),Be instanceof kr&&Be.reset()},resume(){pn.resume()},restart:Nt,destroy(){pn.stop(),hn(),window.removeEventListener(`keydown`,ln),window.removeEventListener(`keyup`,un),window.removeEventListener(`blur`,dn),window.removeEventListener(`keydown`,cn,!0),window.removeEventListener(`pointerdown`,cn,!0),window.removeEventListener(`pointerup`,fn,!0),Be.dispose(),kt.destroy(),At?.destroy(),te!==null&&(F.scene.remove(te.root),te.dispose()),ie!==null&&(F.scene.remove(ie.group),ie.dispose()),oe!==null&&(F.scene.remove(oe.group),oe.dispose(),F.setBloomScale(1)),Ce.dispose(),R.dispose(),je.dispose(),xe.dispose(),F.scene.remove(xe.group),F.scene.remove(be.group),F.scene.remove(Ce.group),F.scene.remove(R.group),F.scene.remove(Oe.mesh),F.dispose()}}}var Xj=s({PLAY_KEY:()=>Zj,PLAY_SRC_KEY:()=>Qj,hasLocalBuilderLevel:()=>tM,readLocalBuilderLevel:()=>eM,readLocalBuilderSource:()=>nM,savePlayLevel:()=>$j}),Zj=`bhaaag.builder.play`,Qj=`bhaaag.builder.play.src`;function $j(e,t){try{try{localStorage.removeItem(Qj)}catch{}return localStorage.setItem(Zj,JSON.stringify(e)),t!==void 0&&localStorage.setItem(Qj,t),!0}catch{return!1}}function eM(){try{let e=localStorage.getItem(Zj);if(e===null)return null;let t=JSON.parse(e);return typeof t!=`object`||!t?null:(Wn(t),t)}catch{return null}}function tM(){return eM()!==null}function nM(){try{return localStorage.getItem(Qj)}catch{return null}}var rM=`<svg id="lobby-art" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
<defs>
<linearGradient id="lb-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b2a5c"/><stop offset="0.38" stop-color="#a8443f"/><stop offset="0.7" stop-color="#ee9a4a"/><stop offset="1" stop-color="#ffe3a8"/></linearGradient>
<radialGradient id="lb-sun" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff6e4"/><stop offset="0.4" stop-color="#ffd35a"/><stop offset="1" stop-color="#ffd35a" stop-opacity="0"/></radialGradient>
</defs>
<rect width="160" height="90" fill="url(#lb-sky)"/>
<circle cx="116" cy="50" r="26" fill="url(#lb-sun)"/>
<circle cx="116" cy="50" r="6" fill="#fff6e4"/>
<path d="M0 58 L18 44 L34 54 L56 38 L80 52 L104 42 L130 54 L148 44 L160 52 L160 90 L0 90Z" fill="#7a3f5c"/>
<path d="M0 66 L22 54 L46 64 L72 50 L100 62 L128 52 L160 64 L160 90 L0 90Z" fill="#5b2b53"/>
<path d="M0 90 L0 70 Q30 64 60 70 T120 66 T160 72 L160 90Z" fill="#3a1d44"/>
<g id="lb-roofs">
<g transform="translate(10 62)"><rect x="1" y="6" width="22" height="22" fill="#6e2c3a"/><path d="M-3 6 L26 6 L21 0 L2 0Z" fill="#c4553a"/><path d="M1 0 L24 0 L19 -5 L5 -5Z" fill="#a8443f"/><path d="M5 -5 L19 -5 L12 -11Z" fill="#c4553a"/><rect x="11" y="-14" width="2" height="4" fill="#ffd35a"/></g>
<g transform="translate(40 68)"><rect x="1" y="5" width="18" height="22" fill="#7a3340"/><path d="M-3 5 L23 5 L18 0 L2 0Z" fill="#d1633f"/><path d="M2 0 L18 0 L10 -6Z" fill="#a8443f"/><rect x="9" y="-9" width="2" height="3" fill="#ffd35a"/></g>
<g transform="translate(66 72)"><rect x="0" y="4" width="26" height="20" fill="#6e2c3a"/><path d="M-4 4 L30 4 L24 -1 L2 -1Z" fill="#c4553a"/><path d="M3 -1 L23 -1 L18 -6 L8 -6Z" fill="#a8443f"/><path d="M8 -6 L18 -6 L13 -11Z" fill="#d1633f"/><rect x="12" y="-14" width="2" height="4" fill="#ffd35a"/></g>
<g transform="translate(104 70)"><rect x="1" y="6" width="22" height="22" fill="#7a3340"/><path d="M-3 6 L27 6 L21 0 L3 0Z" fill="#d1633f"/><path d="M4 0 L20 0 L12 -7Z" fill="#a8443f"/><rect x="11" y="-10" width="2" height="4" fill="#ffd35a"/></g>
<g transform="translate(134 66)"><rect x="1" y="6" width="20" height="26" fill="#6e2c3a"/><path d="M-3 6 L25 6 L20 0 L2 0Z" fill="#c4553a"/><path d="M3 0 L19 0 L13 -6 L9 -6Z" fill="#a8443f"/><path d="M8 -6 L14 -6 L11 -11Z" fill="#d1633f"/><rect x="10" y="-14" width="2" height="4" fill="#ffd35a"/></g>
</g>
<path d="M0 82 Q40 76 80 82 T160 80 L160 90 L0 90Z" fill="#2a1430"/>
<path d="M-2 16 L162 52" stroke="#ffd35a" stroke-width="0.7" fill="none"/>
<path d="M-2 16 L162 52" stroke="#fff6e4" stroke-width="0.2" fill="none" opacity="0.7"/>
<g transform="translate(34 23.6) rotate(12.4) scale(1.55)">
<rect x="-3" y="-1.2" width="6" height="2.4" rx="1" fill="#ffd35a"/>
<path d="M-1.5 0 L-3 7 M1.5 0 L3 7" stroke="#2a2e35" stroke-width="0.8" stroke-linecap="round"/>
<ellipse cx="0" cy="12" rx="3.4" ry="5.2" fill="#3a3f48"/>
<circle cx="0" cy="5.6" r="2.4" fill="#3a3f48"/>
<path d="M-2.8 8.2 Q0 9.6 2.8 8.2 L2.8 9.6 Q0 11 -2.8 9.6Z" fill="#5fb5ad"/>
<path d="M2.6 8.8 Q9 8 12 11 Q8 11 3 10.4Z" fill="#5fb5ad"/>
<path d="M-1.6 16 L-4 22 M1.6 16 L4.5 21" stroke="#2a2e35" stroke-width="1.5" stroke-linecap="round"/>
<path d="M-3 10 L-1.8 3 M3 10 L1.8 3" stroke="#3a3f48" stroke-width="1.2" stroke-linecap="round"/>
</g>
</svg>`;function iM(e,t){let n=document.createElement(`div`);n.id=`lobby`,n.innerHTML=rM+`<div class="head"><h1>Bhaaag</h1><p class="tag">Slide the Kathmandu rooftops at sunset</p></div><div class="mid"><div id="lobby-mode" role="radiogroup" aria-label="Game mode">`+qA().map(e=>`<button type="button" role="radio" data-mode="${e.id}">${e.label}</button>`).join(``)+`</div><div id="lobby-level" role="radiogroup" aria-label="Classic level"></div><button id="lobby-play" type="button">PLAY</button><p id="lobby-best"></p><div id="lobby-gfx" role="radiogroup" aria-label="Graphics quality"><span class="lbl">Graphics</span>`+rT.map(e=>`<button type="button" role="radio" data-tier="${e}" title="${oT[e].desc}">${oT[e].label}</button>`).join(``)+`</div><p id="lobby-gfx-desc"></p><div id="lobby-orient" role="radiogroup" aria-label="Screen orientation"><span class="lbl">Screen</span>`+Zn.map(e=>`<button type="button" role="radio" data-orient="${e}">${$n[e]}</button>`).join(``)+`</div></div><div class="how"><div class="desk"><b>Move</b> <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></div><div class="desk"><b>Hook</b> <kbd>E</kbd> or click</div><div class="desk"><b>Brake</b> hold <kbd>R</kbd></div><div class="desk"><b>Climb</b> hold <kbd>F</kbd> at a ledge</div><div class="desk"><b>Jump</b> <kbd>Space</kbd></div><div class="desk"><b>Menu</b> <kbd>Esc</kbd></div><div class="touch-only"><b>Move</b> left thumb</div><div class="touch-only"><b>Aim</b> tap an anchor</div><div class="touch-only"><b>JUMP</b> big button, double tap = Hook</div><div class="touch-only"><b>BRAKE / CLIMB</b> hold the button</div><div class="hint">Portrait or landscape, both work</div></div>`,e.appendChild(n);let r=n.querySelector(`#lobby-play`),i=n.querySelector(`#lobby-best`);if(r===null||i===null)throw Error(`lobby markup`);let a=r,o=i,s=n.querySelector(`#lobby-gfx-desc`),c=n.querySelectorAll(`#lobby-gfx button`);function l(e){for(let t of c)t.setAttribute(`aria-checked`,String(t.dataset.tier===e));s!==null&&(s.textContent=oT[e].desc)}for(let e of c)e.addEventListener(`click`,()=>{let t=rT.find(t=>t===e.dataset.tier);t!==void 0&&(mT(t),l(t))});l(fT());let u=n.querySelector(`#lobby-orient`),d=n.querySelectorAll(`#lobby-orient button`),f=t.orientation;if(u!==null){if(f===void 0||!f.supported)u.style.display=`none`;else{let e=()=>{for(let e of d)e.setAttribute(`aria-checked`,String(e.dataset.orient===f.pref()))};for(let e of d)e.addEventListener(`click`,()=>{let t=Zn.find(t=>t===e.dataset.orient);t!==void 0&&f.setPref(t)});f.onChange(e),e()}}let p=n.querySelectorAll(`#lobby-mode button`),m=n.querySelector(`#lobby-level`);if(m===null)throw Error(`lobby markup`);let h=m,g=PA(tM()),_=BA(new URLSearchParams(location.search),g,void 0,KA);function v(){g=PA(tM()),h.innerHTML=g.map(e=>`<button type="button" role="radio" data-level="${e.id}">${e.label}</button>`).join(``);for(let e of h.querySelectorAll(`button`))e.addEventListener(`click`,()=>{_={mode:`classic`,level:e.dataset.level??_.level},VA(_),y()})}function y(){for(let e of p)e.setAttribute(`aria-checked`,String(e.dataset.mode===_.mode));h.style.display=_.mode===`classic`?``:`none`;for(let e of h.querySelectorAll(`button`))e.setAttribute(`aria-checked`,String(e.dataset.level===_.level));o.textContent=t.getBestLabel(_)}for(let e of p)e.addEventListener(`click`,()=>{_={mode:e.dataset.mode??_.mode,level:_.level},VA(_),y()});v();let b=document.createElement(`button`);b.id=`menu-btn`,b.type=`button`,b.className=`off`,b.textContent=`MENU`,b.setAttribute(`aria-label`,`Back to lobby`),e.appendChild(b);let x=!0,S=!1;function C(){x=!0,v(),y(),a.textContent=S?`RESUME`:`PLAY`,n.classList.remove(`off`),b.classList.add(`off`),a.focus({preventScroll:!0})}function w(){x=!1,S=!0,n.classList.add(`off`),b.classList.remove(`off`)}return a.addEventListener(`click`,()=>{t.onPlay(_)}),b.addEventListener(`click`,()=>{t.onMenu()}),window.addEventListener(`keydown`,e=>{e.key===`Escape`&&!x&&t.onMenu()}),y(),C(),{show:C,hide:w,visible:()=>x}}function aM(e,t){let n=(new URLSearchParams(e).get(`tuning`)??t??``).trim();return n===``?null:n}async function oM(e,t={}){let n=t.timeoutMs??3e3,r=t.fetchFn??fetch,i=new AbortController,a,o=new Promise(e=>{a=setTimeout(()=>{i.abort(),e(void 0)},n)}),s=(async()=>{let t=await r(e,{signal:i.signal,cache:`no-store`});return t.ok?await t.json():void 0})().catch(()=>void 0);try{return await Promise.race([s,o])}finally{clearTimeout(a)}}var sM=()=>PA(!0,!0),cM=document.getElementById(`game`);if(!(cM instanceof HTMLCanvasElement))throw Error(`canvas#game not found`);var lM=cM;function uM(){if(window.matchMedia(`(pointer: coarse)`).matches)try{document.documentElement.requestFullscreen?.().catch(()=>void 0)}catch{}}var dM=null,fM=!1,pM=yr(document.body),mM=iM(document.body,{orientation:pM,getBestLabel:e=>{let t=XA(e,sM());return pA(t,uA(t))},onPlay:e=>bM(e),onMenu:()=>{dM?.pause(),mM.show()}}),hM=``,gM=e=>console.warn(`[tuning] ${e}`),_M=!1,vM=null;(async()=>{let e=aM(location.search,void 0);_(e===null?await vw(()=>import(`./online-D7Y74PNC.js`).then(e=>e.remoteOverrides(gM)),[]):await oM(e),gM)})().catch(()=>_(void 0)).finally(()=>{_M=!0;let e=vM;vM=null,e!==null&&bM(e)});async function yM(e){let t=sM().find(t=>t.id===e.level);if(e.mode!==`classic`)return;if(t?.builder===void 0){let{STRATEGY_SEED:e,generateStrategyLevel:t}=await vw(async()=>{let{STRATEGY_SEED:e,generateStrategyLevel:t}=await import(`./gen-85oqFsso.js`).then(e=>e.c);return{STRATEGY_SEED:e,generateStrategyLevel:t}},[]),n=Number(new URLSearchParams(location.search).get(`seed`));return{level:t(new URLSearchParams(location.search).has(`seed`)&&Number.isFinite(n)?n|0:e)}}let n,r;if(t.builder===`local`){let e=await vw(()=>Promise.resolve().then(()=>Xj),void 0);n=e.readLocalBuilderLevel();let t=e.readLocalBuilderSource();if(r=null,t!==null)try{r=(await vw(async()=>{let{parseBuilderLevel:e}=await import(`./format-C6S0JKcS.js`);return{parseBuilderLevel:e}},__vite__mapDeps([6,7,8]))).parseBuilderLevel(t)}catch{r=null}}else if(t.builder===`library`){let e=await vw(()=>Promise.resolve().then(()=>mA),void 0);if(n=e.readLibraryLevel(t.id),r=e.readLibrarySource(t.id),r!==null)try{let e=await vw(()=>import(`./format-C6S0JKcS.js`),__vite__mapDeps([6,7,8]));r=e.parseBuilderLevel(e.serializeBuilderLevel(r))}catch{r=null}}else{let e=await vw(()=>import(`./shipped-dLO1Kjfo.js`),__vite__mapDeps([9,10,8,11,12,6,7]));n=e.compileShipped(t.id.slice(2)),r=e.shippedSource(t.id.slice(2))}if(n!==null){if(r===null)return{level:n};try{let{builderHome:e}=await vw(async()=>{let{builderHome:e}=await import(`./dress-DQx2yJJO.js`);return{builderHome:e}},__vite__mapDeps([13,6,7,8,10,11,12,14]));return{home:e(r,n)}}catch{return{level:n}}}}function bM(e){if(!_M){vM=e;return}mM.hide(),uM(),pM.pref()!==`auto`&&pM.setPref(pM.pref());let t=XA(e,sM()),n=e.mode===`chase`?`chase`:e.level;dM!==null&&hM!==n&&(dM.destroy(),dM=null),dM===null?t===`village`||t===`home`||t===`strategy`||rA(t)||sM().find(t=>t.id===e.level)?.builder!==void 0?fM||(fM=!0,(async()=>{if(t===`village`){let{village:e}=await vw(async()=>{let{village:e}=await import(`./villageAssets-iePJVzso.js`);return{village:e}},[]);return Yj(lM,document.body,t,e)}if(t===`home`){let{loadHome:e}=await vw(async()=>{let{loadHome:e}=await import(`./homeAssets-D5yltgiL.js`);return{loadHome:e}},__vite__mapDeps([15,12,14]));return Yj(lM,document.body,t,void 0,void 0,void 0,void 0,e())}if(rA(t)){let{graphAssets:e}=await vw(async()=>{let{graphAssets:e}=await import(`./graphAssets-Dhs-fEd2.js`);return{graphAssets:e}},__vite__mapDeps([16,7,8,11]));return Yj(lM,document.body,t,void 0,void 0,e)}let n=await yM(e);return Yj(lM,document.body,t,void 0,n?.level,void 0,void 0,n?.home)})().then(e=>{dM===null?(dM=e,hM=n):e.destroy()}).catch(()=>{mM.show()}).finally(()=>{fM=!1})):(dM=Yj(lM,document.body,t),hM=n):dM.resume()}window.addEventListener(`zt-menu`,()=>{dM?.pause(),mM.show()});var xM=new URLSearchParams(location.search);xM.has(`builder`)?(mM.hide(),vw(()=>import(`./builderPage-CuYjp465.js`).then(e=>e.mountBuilder(document.body)),__vite__mapDeps([17,10,8,11,12,6,7]))):(xM.get(`level`)===`builder`||xM.get(`level`)?.startsWith(`b:`)===!0||xM.get(`level`)?.startsWith(`l:`)===!0)&&bM({mode:`classic`,level:xM.get(`level`)??`builder`});export{xd as $,zo as A,Hc as B,FS as C,ES as D,NS as E,Os as F,Mo as G,Fi as H,Yi as I,to as J,Su as K,Tl as L,au as M,so as N,Ac as O,Y as P,$u as Q,q as R,kS as S,PS as T,md as U,wu as V,uu as W,xu as X,io as Y,fu as Z,AS as _,vA as a,u as at,gS as b,xA as c,vw as d,vu as et,$ as f,MS as g,jS as h,xj as i,b as it,ou as j,J as k,tA as l,xS as m,Dj as n,G as nt,SA as o,s as ot,hS as p,Ni as q,gj as r,Qo as rt,bA as s,$j as t,W as tt,AT as u,TS as v,SS as w,DS as x,wS as y,X as z};