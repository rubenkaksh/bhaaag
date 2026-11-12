const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/EffectComposer-Dk_Jgxk6.js","assets/CopyShader-CHGAmNbz.js","assets/Pass-BxOG2WQ8.js","assets/RenderPass-rDypBO3L.js","assets/UnrealBloomPass-CIEbXth6.js","assets/OutputPass-BGsbzsnP.js"])))=>i.map(i=>d[i]);
(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={physics:{g:9.81,airDrag:.05,killPlaneBelowMin:5},rope:{gravityFactor:1,drag:.05,terminal:20,launchSpeed:3,minLen:4,maxLen:35,minSlopeDeg:10,maxSlopeDeg:55,trolleyStop:.6,handToFeet:2,hookSpeed:320,brakeDecel:10},aim:{magnetDegDesktop:4,magnetDegTouch:6,routeAssistDeg:16,routeAssistLateDeg:10,routeAssistEarlyHops:2,snapRadius:1.2,previewHz:15,previewMaxSec:8,previewReleaseSamples:12,tapRadiusNdc:.18,hintSec:4},release:{inputBufferMs:100,coyoteMs:120,jumpUp:5,jumpFwd:2,carry:1,hookCooldownSec:.15,hookIntentSec:.5,perfectLo:.7,perfectHi:1,perfectBoost:2,perfectUp:2},landing:{vyClean:7,vyRoll:13,skidDecel:7,vhStumble:16,pad:.5,carryCap:12,rollSec:.35,chainWindowMs:400,edgeGrabH:.6,edgeGrabBelowMin:.2,edgeGrabBelowMax:1.4,edgeGrabVyMax:9},wall:{vCling:7.5},roof:{slipDeg:15,mu:.2,control:.3,uphillRun:.4},hero:{walk:3.5,run:6,radius:.35,stepUp:.4,jump:4.5,height:1.8,accel:40,friction:30,airSteer:14,airSteerCap:6},camera:{dist:4.5,distSlide:6.5,fov:60,fovMax:75,shoulder:.6,pitchMin:-60,pitchMax:50,height:1.6,probeRadius:.25,smooth:.25,armRelease:.05,downhillBias:8,fovSpeed:20,frontPitchDeg:-12,zipYawDeg:45,zipYawMinDiagDeg:20,zipYawEase:.06,sideYawDeg:14,sideYawSpeed:5,sideYawEase:.05},validator:{minReleaseWindowTicks:12,minAimBand:.4,aimSamples:6,releaseStride:3},assist:{slowmoScale:.35,slowmoSec:.4},fixedHz:60,chase:{startGap:36,v0:4.4,accel:.045,vMax:13.5,gapMax:45,rubberK:.4,catchGap:2.5,fogGap:22,slots:6,scoreHop:25,scoreClean:10,scorePerfect:10,gapBase:11,gapSpanLo:2,gapSpanHi:6,decoyBase:.2,decoyGain:.3,oneHouseBase:.2,oneHouseGain:.15,frontPov:0},line:{zoneTol:.6},tramp:{vUp:9,jumpBonus:1.5,airSteer:12,airSteerCap:6},cushion:{lockSec:.5},climb:{reachMin:.6,reachMax:2.2,holdSec:.35,vyMax:8,mantleFwd:.3}},t=`{
  "version": 1,
  "spawn": [
    0,
    0,
    0
  ],
  "spawnYaw": 3.14159,
  "killPlaneY": -95,
  "solids": [
    {
      "min": [
        -120,
        -120,
        -260
      ],
      "max": [
        120,
        -119,
        60
      ]
    },
    {
      "min": [
        -4,
        -0.6,
        -3.5
      ],
      "max": [
        4,
        0,
        3.5
      ]
    },
    {
      "min": [
        -4,
        -9.274,
        -3.5
      ],
      "max": [
        4,
        -0.6,
        3.5
      ]
    },
    {
      "min": [
        -4,
        -5.748,
        -10.5
      ],
      "max": [
        4,
        -5.148,
        -3.5
      ]
    },
    {
      "min": [
        -4,
        -11.822,
        -10.5
      ],
      "max": [
        4,
        -5.748,
        -3.5
      ]
    },
    {
      "min": [
        -4,
        -10.427,
        -30.5
      ],
      "max": [
        4,
        -9.827,
        -23.5
      ]
    },
    {
      "min": [
        -4,
        -19.101,
        -30.5
      ],
      "max": [
        4,
        -10.427,
        -23.5
      ]
    },
    {
      "min": [
        -4,
        -15.575,
        -37.5
      ],
      "max": [
        4,
        -14.975,
        -30.5
      ]
    },
    {
      "min": [
        -4,
        -21.649,
        -37.5
      ],
      "max": [
        4,
        -15.575,
        -30.5
      ]
    },
    {
      "min": [
        -4,
        -20.254,
        -57.5
      ],
      "max": [
        4,
        -19.654,
        -50.5
      ]
    },
    {
      "min": [
        -4,
        -28.928,
        -57.5
      ],
      "max": [
        4,
        -20.254,
        -50.5
      ]
    },
    {
      "min": [
        -4,
        -25.402,
        -64.5
      ],
      "max": [
        4,
        -24.802,
        -57.5
      ]
    },
    {
      "min": [
        -4,
        -31.476,
        -64.5
      ],
      "max": [
        4,
        -25.402,
        -57.5
      ]
    },
    {
      "min": [
        -4,
        -30.082,
        -84.5
      ],
      "max": [
        4,
        -29.482,
        -77.5
      ]
    },
    {
      "min": [
        -4,
        -38.755,
        -84.5
      ],
      "max": [
        4,
        -30.082,
        -77.5
      ]
    },
    {
      "min": [
        -4,
        -35.229,
        -91.5
      ],
      "max": [
        4,
        -34.629,
        -84.5
      ]
    },
    {
      "min": [
        -4,
        -41.303,
        -91.5
      ],
      "max": [
        4,
        -35.229,
        -84.5
      ]
    },
    {
      "min": [
        -15.5,
        -19.101,
        -30.5
      ],
      "max": [
        -8.5,
        -10.427,
        -23.5
      ]
    },
    {
      "min": [
        8.5,
        -38.755,
        -84.5
      ],
      "max": [
        15.5,
        -30.082,
        -77.5
      ]
    },
    {
      "min": [
        4,
        -3.3,
        -2.5
      ],
      "max": [
        5.8,
        -3,
        2.5
      ]
    },
    {
      "min": [
        -5.8,
        -8.448,
        -9.5
      ],
      "max": [
        -4,
        -8.148,
        -4.5
      ]
    },
    {
      "min": [
        4,
        -13.127,
        -29.5
      ],
      "max": [
        5.8,
        -12.827,
        -24.5
      ]
    },
    {
      "min": [
        -5.8,
        -18.275,
        -36.5
      ],
      "max": [
        -4,
        -17.975,
        -31.5
      ]
    },
    {
      "min": [
        4,
        -22.954,
        -56.5
      ],
      "max": [
        5.8,
        -22.654,
        -51.5
      ]
    },
    {
      "min": [
        -5.8,
        -28.102,
        -63.5
      ],
      "max": [
        -4,
        -27.802,
        -58.5
      ]
    },
    {
      "min": [
        4,
        -32.782,
        -83.5
      ],
      "max": [
        5.8,
        -32.482,
        -78.5
      ]
    },
    {
      "min": [
        -5.8,
        -37.929,
        -90.5
      ],
      "max": [
        -4,
        -37.629,
        -85.5
      ]
    },
    {
      "min": [
        -4,
        0,
        -3.5
      ],
      "max": [
        -3.75,
        0.4,
        3.5
      ]
    },
    {
      "min": [
        3.75,
        0,
        -3.5
      ],
      "max": [
        4,
        0.4,
        3.5
      ]
    },
    {
      "min": [
        -3.7,
        0,
        -1.6
      ],
      "max": [
        -2.1,
        0.8,
        0
      ]
    },
    {
      "min": [
        -4,
        -5.148,
        -10.5
      ],
      "max": [
        -3.75,
        -4.748,
        -3.5
      ]
    },
    {
      "min": [
        3.75,
        -5.148,
        -10.5
      ],
      "max": [
        4,
        -4.748,
        -3.5
      ]
    },
    {
      "min": [
        2.1,
        -5.148,
        -8.6
      ],
      "max": [
        3.7,
        -4.348,
        -7
      ]
    },
    {
      "min": [
        -4,
        -9.827,
        -30.5
      ],
      "max": [
        -3.75,
        -9.427,
        -23.5
      ]
    },
    {
      "min": [
        3.75,
        -9.827,
        -30.5
      ],
      "max": [
        4,
        -9.427,
        -23.5
      ]
    },
    {
      "min": [
        -3.7,
        -9.827,
        -28.6
      ],
      "max": [
        -2.1,
        -9.027,
        -27
      ]
    },
    {
      "min": [
        -4,
        -14.975,
        -37.5
      ],
      "max": [
        -3.75,
        -14.575,
        -30.5
      ]
    },
    {
      "min": [
        3.75,
        -14.975,
        -37.5
      ],
      "max": [
        4,
        -14.575,
        -30.5
      ]
    },
    {
      "min": [
        2.1,
        -14.975,
        -35.6
      ],
      "max": [
        3.7,
        -14.175,
        -34
      ]
    },
    {
      "min": [
        -4,
        -19.654,
        -57.5
      ],
      "max": [
        -3.75,
        -19.254,
        -50.5
      ]
    },
    {
      "min": [
        3.75,
        -19.654,
        -57.5
      ],
      "max": [
        4,
        -19.254,
        -50.5
      ]
    },
    {
      "min": [
        -3.7,
        -19.654,
        -55.6
      ],
      "max": [
        -2.1,
        -18.854,
        -54
      ]
    },
    {
      "min": [
        -4,
        -24.802,
        -64.5
      ],
      "max": [
        -3.75,
        -24.402,
        -57.5
      ]
    },
    {
      "min": [
        3.75,
        -24.802,
        -64.5
      ],
      "max": [
        4,
        -24.402,
        -57.5
      ]
    },
    {
      "min": [
        2.1,
        -24.802,
        -62.6
      ],
      "max": [
        3.7,
        -24.002,
        -61
      ]
    },
    {
      "min": [
        -4,
        -29.482,
        -84.5
      ],
      "max": [
        -3.75,
        -29.082,
        -77.5
      ]
    },
    {
      "min": [
        3.75,
        -29.482,
        -84.5
      ],
      "max": [
        4,
        -29.082,
        -77.5
      ]
    },
    {
      "min": [
        -3.7,
        -29.482,
        -82.6
      ],
      "max": [
        -2.1,
        -28.682,
        -81
      ]
    },
    {
      "min": [
        -4,
        -34.629,
        -91.5
      ],
      "max": [
        -3.75,
        -34.229,
        -84.5
      ]
    },
    {
      "min": [
        3.75,
        -34.629,
        -91.5
      ],
      "max": [
        4,
        -34.229,
        -84.5
      ]
    },
    {
      "min": [
        2.1,
        -34.629,
        -89.6
      ],
      "max": [
        3.7,
        -33.829,
        -88
      ]
    },
    {
      "min": [
        -36,
        -120,
        -106
      ],
      "max": [
        -34,
        40,
        28
      ]
    },
    {
      "min": [
        34,
        -120,
        -106
      ],
      "max": [
        36,
        40,
        28
      ]
    },
    {
      "min": [
        -34,
        -120,
        26
      ],
      "max": [
        34,
        40,
        28
      ]
    },
    {
      "min": [
        -34,
        -120,
        -106
      ],
      "max": [
        34,
        40,
        -104
      ]
    }
  ],
  "ramps": [
    {
      "min": [
        -34,
        -45.853,
        -104
      ],
      "max": [
        34,
        -45.853,
        26
      ],
      "slopeAxis": 2,
      "rise": 47.316
    }
  ],
  "roofs": [
    {
      "min": [
        -15.5,
        -10.427,
        -30.5
      ],
      "max": [
        -8.5,
        -8.427,
        -23.5
      ],
      "ridge": 1
    }
  ],
  "anchors": [
    {
      "pos": [
        0,
        -8.227,
        -26
      ]
    },
    {
      "pos": [
        0,
        -18.054,
        -53
      ]
    },
    {
      "pos": [
        0,
        -27.882,
        -80
      ]
    },
    {
      "pos": [
        -12,
        -8.227,
        -26
      ]
    },
    {
      "pos": [
        12,
        -27.882,
        -80
      ]
    }
  ],
  "goal": {
    "min": [
      -6,
      -39.303,
      -100.5
    ],
    "max": [
      6,
      -36.629,
      -92
    ]
  },
  "pads": [
    {
      "min": [
        -3,
        0,
        -2.5
      ],
      "max": [
        3,
        0,
        2.5
      ]
    },
    {
      "min": [
        -3,
        -5.148,
        -9.5
      ],
      "max": [
        3,
        -5.148,
        -4.5
      ]
    },
    {
      "min": [
        -3,
        -9.827,
        -29.5
      ],
      "max": [
        3,
        -9.827,
        -24.5
      ]
    },
    {
      "min": [
        -3,
        -14.975,
        -36.5
      ],
      "max": [
        3,
        -14.975,
        -31.5
      ]
    },
    {
      "min": [
        -3,
        -19.654,
        -56.5
      ],
      "max": [
        3,
        -19.654,
        -51.5
      ]
    },
    {
      "min": [
        -3,
        -24.802,
        -63.5
      ],
      "max": [
        3,
        -24.802,
        -58.5
      ]
    },
    {
      "min": [
        -3,
        -29.482,
        -83.5
      ],
      "max": [
        3,
        -29.482,
        -78.5
      ]
    },
    {
      "min": [
        -3,
        -34.629,
        -90.5
      ],
      "max": [
        3,
        -34.629,
        -85.5
      ]
    }
  ],
  "route": [
    0,
    1,
    2
  ],
  "style": [
    0,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    3,
    3,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5
  ]
}
`,n={physics:{g:9.81,airDrag:.05,killPlaneBelowMin:5},rope:{gravityFactor:1,drag:.05,terminal:20,launchSpeed:3,minLen:4,maxLen:35,minSlopeDeg:10,maxSlopeDeg:55,trolleyStop:.6,handToFeet:2,hookSpeed:320,brakeDecel:10},aim:{magnetDegDesktop:4,magnetDegTouch:6,routeAssistDeg:16,routeAssistLateDeg:10,routeAssistEarlyHops:2,snapRadius:1.2,previewHz:15,previewMaxSec:8,previewReleaseSamples:12,tapRadiusNdc:.18,hintSec:4},release:{inputBufferMs:100,coyoteMs:120,jumpUp:5,jumpFwd:2,carry:1,hookCooldownSec:.15,hookIntentSec:.5,perfectLo:.7,perfectHi:1,perfectBoost:2,perfectUp:2},landing:{vyClean:7,vyRoll:13,skidDecel:7,vhStumble:16,pad:.5,carryCap:12,rollSec:.35,chainWindowMs:400,edgeGrabH:.6,edgeGrabBelowMin:.2,edgeGrabBelowMax:1.4,edgeGrabVyMax:9},wall:{vCling:7.5},roof:{slipDeg:15,mu:.2,control:.3,uphillRun:.4},hero:{walk:3.5,run:6,radius:.35,stepUp:.4,jump:4.5,height:1.8,accel:40,friction:30,airSteer:14,airSteerCap:6},camera:{dist:4.5,distSlide:6.5,fov:60,fovMax:75,shoulder:.6,pitchMin:-60,pitchMax:50,height:1.6,probeRadius:.25,smooth:.25,armRelease:.05,downhillBias:8,fovSpeed:20,frontPitchDeg:-12,zipYawDeg:45,zipYawMinDiagDeg:20,zipYawEase:.06,sideYawDeg:14,sideYawSpeed:5,sideYawEase:.05},validator:{minReleaseWindowTicks:12,minAimBand:.4,aimSamples:6,releaseStride:3},assist:{slowmoScale:.35,slowmoSec:.4},fixedHz:60,chase:{startGap:36,v0:4.4,accel:.045,vMax:13.5,gapMax:45,rubberK:.4,catchGap:2.5,fogGap:22,slots:6,scoreHop:25,scoreClean:10,scorePerfect:10,gapBase:11,gapSpanLo:2,gapSpanHi:6,decoyBase:.2,decoyGain:.3,oneHouseBase:.2,oneHouseGain:.15,frontPov:0},line:{zoneTol:.6},tramp:{vUp:9,jumpBonus:1.5,airSteer:12,airSteerCap:6},cushion:{lockSec:.5},climb:{reachMin:.6,reachMax:2.2,holdSec:.35,vyMax:8,mantleFwd:.3}},r=class{min;max;constructor(e,t){this.min=e,this.max=t}},i=class{hit;t;nx;ny;nz;constructor(){this.hit=!1,this.t=0,this.nx=0,this.ny=0,this.nz=0}};function a(e,t,n,r){return t>=e.min.x&&t<=e.max.x&&n>=e.min.y&&n<=e.max.y&&r>=e.min.z&&r<=e.max.z}function o(e,t,n){return e<t?t:e>n?n:e}function s(e,t,n,r){let i=t-o(t,e.min.x,e.max.x),a=n-o(n,e.min.z,e.max.z);return i*i+a*a<=r*r}function c(e){e.hit=!1,e.t=1,e.nx=0,e.ny=0,e.nz=0}function l(e,t,n,r,i,a,o,s,l,u,d,f,p,m){let h=-1/0,g=1/0,_=-1,v=0;for(let y=0;y<3;y++){let b=e,x=r,S=o,C=u;if(y===1?(b=t,x=i,S=s,C=d):y===2&&(b=n,x=a,S=l,C=f),Math.abs(x)<1e-9){if(p?b<=S||b>=C:b<S||b>C){c(m);return}}else{let e=(S-b)/x,t=(C-b)/x,n=-1;if(e>t){let r=e;e=t,t=r,n=1}e>h&&(h=e,_=y,v=n),t<g&&(g=t)}}(p?h>=g||g<=0:h>g||g<0)||h>1||_<0?c(m):(m.hit=!0,m.t=h<=0?0:h,m.nx=_===0?v:0,m.ny=_===1?v:0,m.nz=_===2?v:0)}function u(e,t,n,r){a(n,e.x,e.y,e.z)?(r.hit=!0,r.t=0,r.nx=0,r.ny=0,r.nz=0):l(e.x,e.y,e.z,t.x-e.x,t.y-e.y,t.z-e.z,n.min.x,n.min.y,n.min.z,n.max.x,n.max.y,n.max.z,!1,r)}function d(e,t,n,r,i,a){let o=i.min.x-n,s=i.max.x+n,c=i.min.y-t,u=i.max.y,d=i.min.z-n,f=i.max.z+n,p=e.x,m=e.y,h=e.z;if(p>o&&p<s&&m>c&&m<u&&h>d&&h<f){let e=p-o,t=-1,n=0,r=0,i=s-p;i<e&&(e=i,t=1),i=m-c,i<e&&(e=i,t=0,n=-1),i=u-m,i<e&&(e=i,t=0,n=1),i=h-d,i<e&&(e=i,t=0,n=0,r=-1),i=f-h,i<e&&(t=0,n=0,r=1),a.hit=!0,a.t=0,a.nx=t,a.ny=n,a.nz=r}else l(p,m,h,r.x,r.y,r.z,o,c,d,s,u,f,!0,a)}var f=class{x;y;z;constructor(e,t,n){this.x=e,this.y=t,this.z=n}};function p(e,t,n,r){e.x=t,e.y=n,e.z=r}var m=Math.PI/180,h=180/Math.PI,g=1e-4,_=.05,v=class{state=0;anchorId=-1;ax=0;ay=0;az=0;ox=0;oy=0;oz=0;dirX=0;dirY=0;dirZ=0;slopeSin=0;len=0;s=0;v=0;flyT=0;handToFeet=0};function y(){return new v}function b(e){e.state=0,e.anchorId=-1,e.ax=0,e.ay=0,e.az=0,e.ox=0,e.oy=0,e.oz=0,e.dirX=0,e.dirY=0,e.dirZ=0,e.slopeSin=0,e.len=0,e.s=0,e.v=0,e.flyT=0,e.handToFeet=0}function x(e,t){e.state=t.state,e.anchorId=t.anchorId,e.ax=t.ax,e.ay=t.ay,e.az=t.az,e.ox=t.ox,e.oy=t.oy,e.oz=t.oz,e.dirX=t.dirX,e.dirY=t.dirY,e.dirZ=t.dirZ,e.slopeSin=t.slopeSin,e.len=t.len,e.s=t.s,e.v=t.v,e.flyT=t.flyT,e.handToFeet=t.handToFeet}function S(e,t,n,r){let i=e.ax-t,a=e.ay-n,o=e.az-r,s=Math.sqrt(i*i+a*a+o*o);if(s<=g)return;let c=1/s;e.ox=t,e.oy=n,e.oz=r,e.dirX=i*c,e.dirY=a*c,e.dirZ=o*c,e.slopeSin=-e.dirY,e.len=s,e.s=0}var C=class{anchorId=-1;dist=0;angleDeg=0},w=new f(0,0,0),T=new f(0,0,0),E=new i,D=[],O=[],k=new C;function A(e,t,n,r,i,a,o,s,c,l,d){let f=_<s*.25?_:s*.25;if(s-f*2<=0)return!1;p(w,t+c*f,n+l*f,r+d*f),p(T,i-c*f,a-l*f,o-d*f);let m=e.solids;for(let e=0;e<m.length;e++)if(u(w,T,m[e],E),E.hit)return!0;return!1}function j(e,t,n,r,i,a,o,s,c,l,u,d,f,p,_=null){p.anchorId=-1,p.dist=0,p.angleDeg=0;let v=Math.sqrt(c*c+l*l+u*u);if(v<=g)return;let y=1/v,b=c*y,x=l*y,S=u*y,C=t.rope,w=Math.sin(C.minSlopeDeg*m),T=Math.sin(C.maxSlopeDeg*m),E=Math.cos(f*m),D=e.anchors,O=-1,k=E,j=0,M=_===null?D.length:_.length;for(let t=0;t<M;t++){let c=_===null?D[t]:D[_[t]];if(c===void 0)continue;let l=c.px-a,u=c.py-o,f=c.pz-s,p=Math.sqrt(l*l+u*u+f*f);if(p<=g)continue;let m=1/p,h=(l*b+u*x+f*S)*m;if(!(h>k))continue;let v=c.px-n,y=c.py-r,E=c.pz-i,M=Math.sqrt(v*v+y*y+E*E);if(M<C.minLen||M>d)continue;let N=-y/M;N<w||N>T||A(e,n,r,i,c.px,c.py,c.pz,M,v/M,y/M,E/M)||(k=h,O=c.id,j=M)}O!==-1&&(p.anchorId=O,p.dist=j,p.angleDeg=Math.acos(k>1?1:k)*h)}function M(e,t,n,r,i,a,o,s,c,l,u,d,f,p){let m=t.aim,h=e.route;D.length=0,O.length=0;for(let e=0;e<h.length;e++)e<m.routeAssistEarlyHops?D.push(h[e]):O.push(h[e]);let g=!1;m.routeAssistDeg>f&&(j(e,t,n,r,i,a,o,s,c,l,u,d,m.routeAssistDeg,p,D),g=p.anchorId!==-1),m.routeAssistLateDeg>f&&(j(e,t,n,r,i,a,o,s,c,l,u,d,m.routeAssistLateDeg,k,O),k.anchorId!==-1&&((!g||k.angleDeg<p.angleDeg)&&(p.anchorId=k.anchorId,p.dist=k.dist,p.angleDeg=k.angleDeg),g=!0)),g||j(e,t,n,r,i,a,o,s,c,l,u,d,f,p)}function N(e,t,n,r,i){let a=t.line.zoneTol;for(let t=0;t<e.lines.length;t++){let o=e.lines[t].zone;if(!(n<o.min.x||n>o.max.x||i<o.min.z||i>o.max.z)&&!(r<o.min.y-a||r>o.max.y+a))return t}return-1}function ee(e,t,n,r,i,a,o,s,c,l,u,d,f){if(e.lineOnly===1)return N(e,t,n,r-t.rope.handToFeet,i)>=0?0:8;let p=Math.sqrt(c*c+l*l+u*u);if(p<=g)return 1;let h=1/p,_=c*h,v=l*h,y=u*h,b=t.rope,x=Math.sin(b.minSlopeDeg*m),S=Math.sin(b.maxSlopeDeg*m),C=Math.cos(f*m),w=t.aim.routeAssistDeg>f?Math.cos(t.aim.routeAssistDeg*m):C,T=t.aim.routeAssistLateDeg>f?Math.cos(t.aim.routeAssistLateDeg*m):C,E=t.aim.routeAssistEarlyHops,D=e.route,O=e.anchors,k=null,j=0;for(let e=0;e<O.length;e++){let t=O[e];if(t===void 0)continue;let n=-1;for(let e=0;e<D.length;e++)if(D[e]===t.id){n=e;break}let r=C;n>=0&&(r=n<E?w:T);let i=t.px-a,c=t.py-o,l=t.pz-s,u=Math.sqrt(i*i+c*c+l*l);if(u<=g)continue;let d=1/u,f=(i*_+c*v+l*y)*d;f>r&&(k===null||f>j)&&(k=t,j=f)}if(k===null)return 1;let M=k.px-n,ee=k.py-r,te=k.pz-i,P=Math.sqrt(M*M+ee*ee+te*te);if(P<b.minLen)return 2;if(P>d)return 3;let ne=-ee/P;return ne<=0?4:ne<x?5:ne>S?6:A(e,n,r,i,k.px,k.py,k.pz,P,M/P,ee/P,te/P)?7:0}function te(e,t,n,r,i,a,o,s){if(b(e),t<0||t>=a.anchors.length)return!1;let c=a.anchors[t],l=c.px-n,u=c.py-r,d=c.pz-i,f=Math.sqrt(l*l+u*u+d*d);if(f<=g)return!1;let p=1/f;e.anchorId=c.id,e.ax=c.px,e.ay=c.py,e.az=c.pz,e.ox=n,e.oy=r,e.oz=i,e.dirX=l*p,e.dirY=u*p,e.dirZ=d*p,e.slopeSin=-e.dirY,e.len=f,e.handToFeet=o.rope.handToFeet;let m=o.rope.launchSpeed>s?o.rope.launchSpeed:s;return m>o.rope.terminal&&(m=o.rope.terminal),m<0&&(m=0),e.v=m,e.flyT=f/o.rope.hookSpeed,e.state=1,!0}function P(e,t,n,r,i){if(e.state===1)return e.flyT-=t,e.flyT<=0&&(e.flyT=0,e.state=2),e.state;if(e.state!==2)return e.state;let a=r.rope,o=r.physics.g*a.gravityFactor*e.slopeSin-a.drag*e.v;i&&(o-=a.brakeDecel);let s=e.v+o*t;s>a.terminal&&(s=a.terminal),s<0&&(s=0),e.v=s,e.s+=s*t;let c=e.len-a.trolleyStop;return e.s>=c&&(e.s=c,e.state=3),e.state}function ne(e,t){e.state===0?p(t,0,0,0):(t.x=e.ox+e.dirX*e.s,t.y=e.oy+e.dirY*e.s-e.handToFeet,t.z=e.oz+e.dirZ*e.s)}function re(e,t){let n=e.state===2||e.state===3,r=n?e.dirX*e.v:0,i=n?e.dirY*e.v:0,a=n?e.dirZ*e.v:0;b(e),t.x=r,t.y=i,t.z=a}var ie=1024,ae=class{px=0;py=0;pz=0;vx=0;vy=0;vz=0;yaw=0;camYaw=0;camPitch=0;grounded=0;dead=0;mode=1;hook=y();rollT=0;landLockT=0;chainT=0;deadCause=0;eventBits=0;hookCd=0;hookIntentT=0;runOut=0;launchY=0;perfect=0;hasLedge=0;hangLedgeY=0;hangNx=0;hangNz=0;hangWall=0;climbT=0;bounceAir=0};function oe(){return new ae}function se(e,t){e.px=t.px,e.py=t.py,e.pz=t.pz,e.vx=t.vx,e.vy=t.vy,e.vz=t.vz,e.yaw=t.yaw,e.camYaw=t.camYaw,e.camPitch=t.camPitch,e.grounded=t.grounded,e.dead=t.dead,e.mode=t.mode,x(e.hook,t.hook),e.rollT=t.rollT,e.landLockT=t.landLockT,e.chainT=t.chainT,e.deadCause=t.deadCause,e.eventBits=t.eventBits,e.hookCd=t.hookCd,e.hookIntentT=t.hookIntentT,e.runOut=t.runOut,e.launchY=t.launchY,e.perfect=t.perfect,e.hasLedge=t.hasLedge,e.hangLedgeY=t.hangLedgeY,e.hangNx=t.hangNx,e.hangNz=t.hangNz,e.hangWall=t.hangWall,e.climbT=t.climbT,e.bounceAir=t.bounceAir}var ce=32767,le=4096,ue=class{moveX=0;moveY=0;lookYaw=0;lookPitch=0;aimYaw=0;aimPitch=0;hasAim=0;buttons=0;pressed=0;taps=0};function de(){return new ue}function fe(e){e.moveX=0,e.moveY=0,e.lookYaw=0,e.lookPitch=0,e.aimYaw=0,e.aimPitch=0,e.hasAim=0,e.buttons=0,e.pressed=0,e.taps=0}function pe(e){let t=e;return t>1&&(t=1),t<-1&&(t=-1),Math.round(t*ce)}function me(e){return e/ce}function he(e){return Math.round(e*le/(Math.PI*2))}function ge(e){return e*Math.PI*2/le}function _e(e,t){return(e.buttons&t)!==0}function ve(e,t){return(e.pressed&t)!==0}var ye=1e-4,be=Math.PI/180,xe=.1,Se=-1e30,Ce=new f(0,0,0),F=new f(0,0,0),I=new i,we=new C,L=new f(0,0,0),R=new f(0,0,0),Te=.9,z=2*ye,B=.1,Ee=.05,De=.05,Oe=.08,ke=-1,Ae=-1,je=0,Me=0,Ne=0,Pe=1,V=0;function Fe(e,t,n,r,i,a,o,s){Ce.x=t,Ce.y=n,Ce.z=r,F.x=o===0?s:0,F.y=o===1?s:0,F.z=o===2?s:0;let c=1,l=!1,u=0,f=0,p=0;ke=-1;for(let t=0;t<e.solids.length;t++)if(d(Ce,i,a,F,e.solids[t],I),I.hit){if(I.t===0){let e=I.nx===0&&I.ny===0&&I.nz===0,t=I.nx*F.x+I.ny*F.y+I.nz*F.z>=0;if(e||t)continue}I.t<c&&(c=I.t,l=!0,u=I.nx,f=I.ny,p=I.nz,ke=t)}if(I.hit=l,I.nx=u,I.ny=f,I.nz=p,!l)return s;let m=c*Math.abs(s)-ye;return m<=0?0:s<0?-m:m}function Ie(e,t,n,r,i,a,o,s,c){Ce.x=t,Ce.y=n,Ce.z=r,F.x=o,F.y=s,F.z=c;let l=1,u=!1,f=0,p=0,m=0;ke=-1;for(let t=0;t<e.solids.length;t++)if(d(Ce,i,a,F,e.solids[t],I),I.hit){if(I.t===0){let e=I.nx===0&&I.ny===0&&I.nz===0,t=I.nx*o+I.ny*s+I.nz*c>=0;if(e||t)continue}I.t<l&&(l=I.t,u=!0,f=I.nx,p=I.ny,m=I.nz,ke=t)}if(I.hit=u,I.nx=f,I.ny=p,I.nz=m,!u)return 1;let h=Math.sqrt(o*o+s*s+c*c),g=l*h-ye;return g<=0?0:g/h}function Le(e,t,n,r){let i=e.ramps[t],a=i.aabb;if(n<a.min.x||n>a.max.x||r<a.min.z||r>a.max.z)return Se;let o;return o=i.slopeAxis===0?(n-a.min.x)/(a.max.x-a.min.x):i.slopeAxis===1?(a.max.x-n)/(a.max.x-a.min.x):i.slopeAxis===2?(r-a.min.z)/(a.max.z-a.min.z):(a.max.z-r)/(a.max.z-a.min.z),a.min.y+i.rise*o}function Re(e,t){let n=e.ramps[t],r=n.aabb;je=0,Me=0;let i;n.slopeAxis===0?(je=1,i=r.max.x-r.min.x):n.slopeAxis===1?(je=-1,i=r.max.x-r.min.x):n.slopeAxis===2?(Me=1,i=r.max.z-r.min.z):(Me=-1,i=r.max.z-r.min.z),Ne=i>0?n.rise/i:0,Pe=1/Math.sqrt(1+Ne*Ne),V=Ne*Pe}function ze(e,t,n){Be(e,t.px,t.pz,n.hero.radius,t.py+z);let r=Ae;return r<0||e.ramps[r].slip!==1||(Re(e,r),Ne<=Math.tan(n.roof.slipDeg*be))?-1:r}function Be(e,t,n,r,i){let a=Se;Ae=-1;for(let o=0;o<e.solids.length;o++){let c=e.solids[o];if(!s(c,t,n,r))continue;let l=c.max.y;l<=i&&l>a&&(a=l)}for(let c=0;c<e.ramps.length;c++){let l=e.ramps[c].aabb;if(!s(l,t,n,r))continue;let u=Le(e,c,o(t,l.min.x,l.max.x),o(n,l.min.z,l.max.z));u<=Se||u>i||(u>a||u===a&&e.ramps[c].slip===1)&&(a=u,Ae=c)}return a}function Ve(e,t,n,r){let i=Se;for(let a=0;a<e.ramps.length;a++){let c=e.ramps[a].aabb;if(!s(c,t,n,r))continue;let l=Le(e,a,o(t,c.min.x,c.max.x),o(n,c.min.z,c.max.z));l>Se&&l>i&&(i=l)}return i}function He(e,t){e.dead=1,e.mode=2,e.deadCause=t,e.eventBits|=32,e.vx=0,e.vy=0,e.vz=0,e.grounded=0,e.perfect=0,e.hasLedge=0,b(e.hook)}function Ue(e,t,n,r,i){for(let a=0;a<e.length;a++){let o=e[a];if(!s(o,t,n,r))continue;let c=o.max.y-i;if(c>-.05&&c<De)return a}return-1}function We(e,t,n,r){for(let i=0;i<e.hazards.length;i++){let a=e.hazards[i];if(!(t<a.min.x||t>a.max.x||r<a.min.z||r>a.max.z)&&!(n<a.min.y||n>a.max.y))return i}return-1}function Ge(e,t,n){let r=Math.sqrt(e.vx*e.vx+e.vz*e.vz),i=t.landing.carryCap;if(r>i){let t=i/r;e.vx*=t,e.vz*=t}e.vy=t.tramp.vUp+(n?t.tramp.jumpBonus:0),e.bounceAir=1,e.grounded=0,e.mode=1,e.runOut=0,e.perfect=0,e.chainT=0,e.eventBits|=128,(e.hook.state===2||e.hook.state===3)&&b(e.hook)}function Ke(e,t){e.vx=0,e.vy=0,e.vz=0,e.grounded=1,e.mode=0,e.runOut=0,e.perfect=0,e.chainT=0,e.landLockT=t.cushion.lockSec,e.eventBits|=260,(e.hook.state===2||e.hook.state===3)&&b(e.hook)}function qe(e,t,n,r){if(t.tramps.length>0&&Ue(t.tramps,e.px,e.pz,n.hero.radius,e.py)>=0){Ge(e,n,r);return}if(t.cushions.length>0&&Ue(t.cushions,e.px,e.pz,n.hero.radius,e.py)>=0){Ke(e,n);return}let i=0,a=1,o=0;Ae>=0&&(Re(t,Ae),i=-je*V,a=Pe,o=-Me*V);let s=e.vx*i+e.vy*a+e.vz*o,c=-s;if(c>n.landing.vyRoll){He(e,3);return}c>n.landing.vyClean&&(e.rollT=n.landing.rollSec,e.eventBits|=8),s<0&&(e.vx-=s*i,e.vz-=s*o);let l=Math.sqrt(e.vx*e.vx+e.vz*e.vz),u=n.landing.carryCap+(e.perfect===1?n.release.perfectBoost:0);if(e.perfect=0,l>u){let t=u/l;e.vx*=t,e.vz*=t}e.vy=0,e.grounded=1,e.mode=0,e.runOut=0,e.chainT=n.landing.chainWindowMs/1e3,e.eventBits|=4,(e.hook.state===2||e.hook.state===3)&&b(e.hook)}function Je(e,t,n){e.hook.state===2||e.hook.state===3?re(e.hook,L):(L.x=0,L.y=0,L.z=0),e.vx=L.x,e.vy=L.y,e.vz=L.z,n&&(e.vx+=Math.sin(e.yaw)*t.release.jumpFwd,e.vz+=Math.cos(e.yaw)*t.release.jumpFwd,e.vy+=t.release.jumpUp),e.grounded=0,e.runOut=0,e.mode=1,e.hasLedge=0,e.climbT=0,e.hookCd=t.release.hookCooldownSec,e.eventBits|=2}function Ye(e,t,n,r){if(ve(t,2)&&(e.hookIntentT=r.release.hookIntentSec),e.hookIntentT<=0||e.hookCd>0||e.hook.state!==0)return;let i=e.py+r.rope.handToFeet;if(n.lineOnly===1){if(e.grounded!==1)return;let t=N(n,r,e.px,e.py,e.pz);if(t<0)return;we.anchorId=n.lines[t].anchorId}else{let a=e.camYaw,o=e.camPitch;t.hasAim===1&&(a=ge(t.aimYaw),o=ge(t.aimPitch));let s=Math.cos(o),c=e.py+r.hero.height*Te,l=_e(t,64)?r.aim.magnetDegTouch:r.aim.magnetDegDesktop;if(M(n,r,e.px,i,e.pz,e.px,c,e.pz,Math.sin(a)*s,Math.sin(o),Math.cos(a)*s,r.rope.maxLen,l,we),we.anchorId===-1)return}e.hookIntentT=0;let a=0;if(e.grounded===1||e.chainT>0){let t=n.anchors[we.anchorId],r=t.px-e.px,o=t.py-i,s=t.pz-e.pz,c=Math.sqrt(r*r+o*o+s*s);c>0&&(a=(e.vx*r+e.vy*o+e.vz*s)/c)}te(e.hook,we.anchorId,e.px,i,e.pz,n,r,a)&&(e.eventBits|=1,e.perfect=0)}function Xe(e,t,n,r,i){let a=e.hook;if(ve(t,4)){Je(e,r,!1);return}let o=P(a,i,n,r,_e(t,8));ne(a,R);let s=r.hero.radius;e.vx=a.dirX*a.v,e.vy=a.dirY*a.v,e.vz=a.dirZ*a.v,a.v>.1&&(e.yaw=Math.atan2(a.dirX,a.dirZ));let c=R.y,l=e.runOut===1;if(l){let t=Be(n,R.x,R.z,s,e.launchY+r.hero.stepUp);t>Se&&t>=e.launchY-Ee?c<t&&(c=t):e.runOut=0}let u=l?r.hero.stepUp:0,d=e.py,f=R.x-e.px,p=c-e.py,m=R.z-e.pz,h=Ie(n,e.px,e.py+u,e.pz,r.hero.height-u,s,f,p,m),g=I.hit,_=!1;if(g&&p<0&&I.ny>.5&&Math.abs(e.py-e.launchY)<Ee?(h=Ie(n,e.px,e.py+u,e.pz,r.hero.height-u,s,f,0,m),g=I.hit,e.px+=f*h,e.pz+=m*h,_=!0):(e.px+=f*h,e.py+=p*h,e.pz+=m*h),e.runOut===0&&!_){let i=Be(n,e.px,e.pz,s,d+r.hero.stepUp);if(i>Se&&i>=e.py-z){e.py=i,qe(e,n,r,_e(t,1));return}}if(g)Qe(e,n,r);else if(o===3){let t=r.rope.trolleyStop+B,i=Ie(n,e.px,e.py,e.pz,r.hero.height,s,a.dirX*t,a.dirY*t,a.dirZ*t);if(I.hit){e.px+=a.dirX*t*i,e.py+=a.dirY*t*i,e.pz+=a.dirZ*t*i,Qe(e,n,r);return}Je(e,r,!1),n.lineOnly===1&&(e.vx=0,e.vz=0)}}function Ze(e,t,n,r){if(e.hasLedge=0,r<0||I.ny!==0)return!1;let i=t.solids[r],a=i.max.y-e.py;if(a<n.climb.reachMin||a>n.climb.reachMax)return!1;let o=n.hero.radius,s=I.nx,c=I.nz,l=s===0?c>0?i.max.z:i.min.z:s>0?i.max.x:i.min.x,u=o+n.climb.mantleFwd;return Be(t,s===0?e.px:l-s*u,c===0?e.pz:l-c*u,o,i.max.y+n.hero.height)>i.max.y+De?!1:(e.hasLedge=1,e.hangLedgeY=i.max.y,e.hangNx=s,e.hangNz=c,e.hangWall=l,e.climbT=0,!0)}function Qe(e,t,n){let r=e.hook;r.v*Math.max(0,-(r.dirX*I.nx+r.dirY*I.ny+r.dirZ*I.nz))>n.wall.vCling?He(e,2):(e.mode=4,e.vx=0,e.vy=0,e.vz=0,e.eventBits|=16,t.climb===1&&Ze(e,t,n,ke),b(r))}function $e(e,t,n,r){return e.vy>n.climb.vyMax||e.vy<-n.climb.vyMax||!Ze(e,t,n,r)?!1:(e.mode=4,e.vx=0,e.vy=0,e.vz=0,e.runOut=0,e.eventBits|=512,!0)}function et(e,t,n,r){if(e.vx=0,e.vy=0,e.vz=0,ve(t,1)){Je(e,n,!0);return}if(ve(t,4)){Je(e,n,!1);return}if(e.hasLedge!==1)return;if(!_e(t,128)){e.climbT=0;return}if(e.climbT+=r,e.climbT<n.climb.holdSec)return;let i=n.hero.radius+n.climb.mantleFwd;e.hangNx!==0&&(e.px=e.hangWall-e.hangNx*i),e.hangNz!==0&&(e.pz=e.hangWall-e.hangNz*i),e.py=e.hangLedgeY,e.yaw=Math.atan2(-e.hangNx,-e.hangNz),e.grounded=1,e.mode=0,e.hasLedge=0,e.climbT=0,e.chainT=0,e.eventBits|=ie}function tt(e,t,n,r){if(e.eventBits=0,e.dead===1)return;let i=1/r.fixedHz;e.chainT>0&&(e.chainT=e.chainT>i?e.chainT-i:0),e.rollT>0&&(e.rollT=e.rollT>i?e.rollT-i:0),e.hookCd>0&&(e.hookCd=e.hookCd>i?e.hookCd-i:0),e.hookIntentT>0&&(e.hookIntentT=e.hookIntentT>i?e.hookIntentT-i:0),e.landLockT>0&&(e.landLockT=e.landLockT>i?e.landLockT-i:0),e.camYaw+=ge(t.lookYaw),e.camPitch+=ge(t.lookPitch);let a=r.camera.pitchMin*be,o=r.camera.pitchMax*be;e.camPitch<a&&(e.camPitch=a),e.camPitch>o&&(e.camPitch=o),e.mode!==3&&(Ye(e,t,n,r),e.hook.state===1&&P(e.hook,i,n,r,!1)===2&&(S(e.hook,e.px,e.py+r.rope.handToFeet,e.pz),e.runOut=+(e.grounded===1),e.launchY=e.py,e.grounded=0,e.mode=3,e.bounceAir=0)),e.mode===3?Xe(e,t,n,r,i):e.mode===4?et(e,t,r,i):rt(e,t,n,r,i),e.dead===0&&e.py<n.killPlaneY&&He(e,1),e.dead===0&&n.hazards.length>0&&We(n,e.px,e.py,e.pz)>=0&&He(e,4)}function nt(e,t,n,r,i,a){if(i>0){let i=n,o=r,s=i*je+o*Me;if(s>0){let e=s*(1-t.roof.uphillRun);i-=je*e,o-=Me*e}let c=i-e.vx,l=o-e.vz,u=Math.sqrt(c*c+l*l),d=t.hero.accel*t.roof.control*a;u<=d?(e.vx=i,e.vz=o):(e.vx+=c/u*d,e.vz+=l/u*d)}let o=t.physics.g,s=o*V*Pe;e.vx-=je*s*a,e.vz-=Me*s*a;let c=Math.sqrt(e.vx*e.vx+e.vz*e.vz),l=t.roof.mu*o*Pe*a;if(c<=l)e.vx=0,e.vz=0;else{let t=(c-l)/c;e.vx*=t,e.vz*=t}}function rt(e,t,n,r,i){let a=e.landLockT>0,o=a?0:me(t.moveX),s=a?0:me(t.moveY),c=Math.sqrt(o*o+s*s);c>1&&(o/=c,s/=c);let l=Math.sin(e.camYaw),u=Math.cos(e.camYaw),d=(s*l+o*u)*r.hero.run,f=(s*u-o*l)*r.hero.run;e.grounded===1&&(!a&&ve(t,1)?(e.vy=r.hero.jump,e.grounded=0):e.vy=0);let p=e.grounded===1?ze(n,e,r):-1;if(p>=0)nt(e,r,d,f,c,i);else if(e.grounded===1){if(c>0){let t=d-e.vx,n=f-e.vz,a=Math.sqrt(t*t+n*n),o=d*d+f*f,s=(e.chainT>0&&e.vx*e.vx+e.vz*e.vz>o&&e.vx*d+e.vz*f>0?r.landing.skidDecel:r.hero.accel)*i;a<=s?(e.vx=d,e.vz=f):(e.vx+=t/a*s,e.vz+=n/a*s)}else{let t=Math.sqrt(e.vx*e.vx+e.vz*e.vz),n=(e.chainT>0?r.landing.skidDecel:r.hero.friction)*i;if(t<=n)e.vx=0,e.vz=0;else{let r=(t-n)/t;e.vx*=r,e.vz*=r}}}else{let t=1-r.physics.airDrag*i;if(e.vx*=t,e.vz*=t,c>0&&!a){let t=e.bounceAir===1,n,a;if(t)n=d/r.hero.run*r.tramp.airSteerCap,a=f/r.hero.run*r.tramp.airSteerCap;else{let t=Math.sqrt(e.vx*e.vx+e.vz*e.vz),i=Math.max(r.hero.airSteerCap*c,t);n=d/(r.hero.run*c)*i,a=f/(r.hero.run*c)*i}let o=n-e.vx,s=a-e.vz,l=Math.sqrt(o*o+s*s),u=(t?r.tramp.airSteer:r.hero.airSteer)*i;l<=u?(e.vx=n,e.vz=a):(e.vx+=o/l*u,e.vz+=s/l*u)}}let m=e.py,h=r.hero.height;e.grounded===1&&(m=e.py+r.hero.stepUp,h=r.hero.height-r.hero.stepUp);let g=r.hero.radius,_=e.px,v=Fe(n,e.px,m,e.pz,h,g,0,e.vx*i);I.hit&&(e.vx=0),e.px+=v,Ve(n,e.px,e.pz,g)>e.py+r.hero.stepUp&&(e.px=_,e.vx=0);let y=e.pz,b=Fe(n,e.px,m,e.pz,h,g,2,e.vz*i);if(I.hit&&(e.vz=0),e.pz+=b,Ve(n,e.px,e.pz,g)>e.py+r.hero.stepUp&&(e.pz=y,e.vz=0),n.climb===1&&e.grounded===0){let t=d,i=f;c===0&&(t=Math.sin(e.yaw),i=Math.cos(e.yaw));let a=Math.sqrt(t*t+i*i);if(a>1e-6){let o=Oe/a;if(Ie(n,e.px,e.py,e.pz,r.hero.height,g,t*o,0,i*o),I.hit&&$e(e,n,r,ke))return}}if(e.vx*e.vx+e.vz*e.vz>xe*xe&&(e.yaw=Math.atan2(e.vx,e.vz)),e.grounded===1){let t=Be(n,e.px,e.pz,g,e.py+r.hero.stepUp);t>Se&&t>=e.py-r.hero.stepUp?(e.py=t,e.vy=0):(e.grounded=0,p>=0&&(e.vy=(e.vx*je+e.vz*Me)*Ne))}if(e.grounded===0){let a=e.py,o=e.vy*i-.5*r.physics.g*i*i,s;if(o>0?(s=Fe(n,e.px,e.py,e.pz,r.hero.height,g,1,o),I.hit?e.vy=0:e.vy-=r.physics.g*i):(e.vy-=r.physics.g*i,s=Fe(n,e.px,e.py,e.pz,r.hero.height,g,1,o)),e.py=a+s,o<=0){let i=Be(n,e.px,e.pz,g,a+r.hero.stepUp);i>Se&&i>=e.py-z&&(e.py=i,qe(e,n,r,_e(t,1)))}}e.grounded===1&&(e.bounceAir=0),e.dead===0&&(e.mode=e.grounded===1?0:1)}var it=class{outcome=0;x=0;y=0;z=0;releaseTick=-1;releaseFrac=-1},at=0,ot=1,st=2,ct=3,lt=4,ut=.001,dt=new ae,ft=new ae,pt=new ue,mt=new ue,ht=new ue;mt.hasAim=0,ht.pressed=4,ht.buttons=4;var gt=0,_t=0,vt=0,yt=-1,bt=-1,xt=-1;function St(e,t){return t.goal.max.y>t.goal.min.y&&a(t.goal,e.px,e.py,e.pz)}function Ct(e,t){gt=e.px,_t=e.py,vt=e.pz,bt=t}function wt(e,t,n){if(se(ft,dt),yt=-1,bt=-1,xt=-1,tt(ft,pt,e,t),ft.hook.state===0||ft.hook.anchorId!==Tt)return at;let r=Math.ceil(t.aim.previewMaxSec*t.fixedHz),i=!1,a=0;for(;;){if(ft.eventBits&16&&(i=!0),ft.mode===3&&yt<0&&(yt=a),ft.mode===3&&ft.runOut===0&&xt<0&&(xt=a),yt>=0&&bt<0&&ft.mode!==3&&Ct(ft,a),ft.dead===1)return bt<0&&Ct(ft,a),ot;if(St(ft,e))return bt<0&&Ct(ft,a),st;if(bt>=0){if(ft.mode===4)return i?lt:ct;if(ft.grounded===1&&ft.mode===0&&ft.vx*ft.vx+ft.vz*ft.vz<ut*ut)return st}if(a>=r)return bt<0&&Ct(ft,a),ot;a++,tt(ft,a===n&&ft.mode===3?ht:mt,e,t)}}var Tt=-1;function Et(e,t,n,r,i){i.outcome=0,i.x=0,i.y=0,i.z=0,i.releaseTick=-1,i.releaseFrac=-1;let a=n.anchors[t];if(a===void 0||e.dead===1)return;se(dt,e),Tt=t;let o=a.px-dt.px,s=a.py-(dt.py+r.hero.height*Te),c=a.pz-dt.pz;pt.hasAim=1,pt.aimYaw=he(Math.atan2(o,c)),pt.aimPitch=he(Math.atan2(s,Math.sqrt(o*o+c*c))),pt.pressed=2,pt.buttons=2;let l=wt(n,r,0);if(l===at)return;if(i.x=gt,i.y=_t,i.z=vt,l===st||l===ct){i.outcome=1;return}if(l===lt){i.outcome=2;return}let u=xt>yt?xt:yt,d=bt-u,f=bt-yt,p=yt,m=r.aim.previewReleaseSamples;if(i.outcome=3,u<0||d<=0)return;let h=-1;for(let e=1;e<=m;e++){let t=u+Math.round(e*d/(m+1));if(t<=0||t===h)continue;h=t;let a=wt(n,r,t);if(a===st||a===ct||a===lt){i.outcome=2,i.releaseTick=t,i.releaseFrac=(t-p)/f;return}}}function Dt(e){let t=Object.values(e).filter(e=>typeof e==`number`);return Object.entries(e).filter(([e,n])=>t.indexOf(+e)===-1).map(([e,t])=>t)}function Ot(e,t=`|`){return e.map(e=>$t(e)).join(t)}function kt(e,t){return typeof t==`bigint`?t.toString():t}var At=class{constructor(e){this._getter=e,this._value=void 0}get value(){let e=this._getter;return e!==void 0&&(this._value=e(),this._getter=void 0),this._value}};function jt(e){return new At(e)}function Mt(e){return e==null}function Nt(e){let t=+!!e.startsWith(`^`),n=e.endsWith(`$`)?e.length-1:e.length;return e.slice(t,n)}function Pt(e,t){let n=e/t,r=Math.round(n),i=4*2**-52*Math.max(Math.abs(n),1);return Math.abs(n-r)<i?0:n-r}function Ft(e,t,n){Object.defineProperty(e,t,{value:n,writable:!0,enumerable:!0,configurable:!0})}function It(e){let t=Object.getOwnPropertyDescriptor(e,`shape`);return t?.get?t.get.raw:t?.value}function Lt(e){return It(e._zod.def)??e._zod.def.shape}function Rt(e,t,n){Object.defineProperty(e,t,{get(){let e=n();return Ft(this,t,e),e},enumerable:!0,configurable:!0})}function zt(e,t,n){t in e?Ft(e,t,n):e[t]=n}function Bt(e,t,n,r){let i=Lt(t);for(let a of n){let n=Object.getOwnPropertyDescriptor(i,a);n.enumerable&&(n.get?Rt(e,a,()=>{let e=t._zod.def.shape[a];return r?r(e,a):e}):zt(e,a,r?r(n.value,a):n.value))}}function Vt(e,t){for(let n of Reflect.ownKeys(t)){let r=Object.getOwnPropertyDescriptor(t,n);r.enumerable&&(r.get?Rt(e,n,()=>t[n]):zt(e,n,r.value))}}function Ht(...e){let t={};for(let n of e){let e=Object.getOwnPropertyDescriptors(n);Object.assign(t,e)}return Object.defineProperties({},t)}function Ut(e){return JSON.stringify(e)}var Wt=`captureStackTrace`in Error?Error.captureStackTrace:(...e)=>{};function Gt(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}var Kt=jt(()=>{if(Wn.jitless||typeof navigator<`u`&&navigator?.userAgent?.includes(`Cloudflare`))return!1;try{return Function(``),!0}catch{return!1}});function qt(e){if(Gt(e)===!1)return!1;let t=e.constructor;if(t===void 0||typeof t!=`function`)return!0;let n=t.prototype;return Gt(n)!==!1&&Object.prototype.hasOwnProperty.call(n,`isPrototypeOf`)!==!1}function Jt(e){return qt(e)?{...e}:Array.isArray(e)?[...e]:e instanceof Map?new Map(e):e instanceof Set?new Set(e):e}var Yt=new Set([`string`,`number`,`symbol`]);function Xt(e){return e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)}function Zt(e,t,n){let r=new e._zod.constr(t??e._zod.def);return(!t||n?.parent)&&(r._zod.parent=e),r}function Qt(e){let t=e;if(!t)return{};if(typeof t==`string`)return{error:()=>t};if(t?.message!==void 0){if(t?.error!==void 0)throw Error("Cannot specify both `message` and `error` params");t.error=t.message}return delete t.message,typeof t.error==`string`?{...t,error:()=>t.error}:t}function $t(e){return typeof e==`bigint`?e.toString()+`n`:typeof e==`string`?`"${e}"`:`${e}`}function en(e){return Object.keys(e).filter(t=>e[t]._zod.optin!==void 0&&e[t]._zod.optout===`optional`)}var tn={safeint:[-(2**53-1),2**53-1],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-34028234663852886e22,34028234663852886e22],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]},nn={int64:[BigInt(`-9223372036854775808`),BigInt(`9223372036854775807`)],uint64:[BigInt(0),BigInt(`18446744073709551615`)]};function rn(e,t){let n=e._zod.def,r=n.checks;if(r&&r.length>0)throw Error(`.pick() cannot be used on object schemas containing refinements`);let i={};return Bt(i,e,an(e,t)),Zt(e,Ht(n,{shape:i,checks:[]}))}function an(e,t){let n=Lt(e),r=[];for(let e of Reflect.ownKeys(t)){if(!Object.getOwnPropertyDescriptor(n,e)?.enumerable)throw Error(`Unrecognized key: "${String(e)}"`);t[e]&&r.push(e)}return r}function on(e,t){let n=e._zod.def,r=n.checks;if(r&&r.length>0)throw Error(`.omit() cannot be used on object schemas containing refinements`);let i=new Set(an(e,t)),a={};return Bt(a,e,Reflect.ownKeys(Lt(e)).filter(e=>!i.has(e))),Zt(e,Ht(n,{shape:a,checks:[]}))}function sn(e,t){if(!qt(t))throw Error(`Invalid input to extend: expected a plain object`);let n=e._zod.def.checks;if(n&&n.length>0){let n=Lt(e);for(let e of Reflect.ownKeys(t))if(Object.getOwnPropertyDescriptor(n,e)!==void 0)throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.")}return Zt(e,Ht(e._zod.def,{shape:cn(e,t)}))}function cn(e,t){let n={};return Bt(n,e,Reflect.ownKeys(Lt(e))),Vt(n,t),n}function ln(e,t){if(!qt(t))throw Error(`Invalid input to safeExtend: expected a plain object`);return Zt(e,Ht(e._zod.def,{shape:cn(e,t)}))}function un(e,t){if(!t?._zod?.def)throw Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");if(e._zod.def.checks?.length)throw Error(`.merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.`);let n={};return Bt(n,e,Reflect.ownKeys(Lt(e))),Bt(n,t,Reflect.ownKeys(Lt(t))),Zt(e,Ht(e._zod.def,{shape:n,get catchall(){return t._zod.def.catchall},checks:t._zod.def.checks??[]}))}function dn(e,t,n,r=`partial`){let i=t._zod.def.checks;if(i&&i.length>0)throw Error(`.${r}() cannot be used on object schemas containing refinements`);let a=n?new Set(an(t,n)):void 0,o={};return Bt(o,t,Reflect.ownKeys(Lt(t)),e&&((t,n)=>a&&!a.has(n)?t:new e({type:`optional`,innerType:t}))),Zt(t,Ht(t._zod.def,{shape:o,checks:[]}))}function fn(e,t,n){let r=n?new Set(an(t,n)):void 0,i={};return Bt(i,t,Reflect.ownKeys(Lt(t)),(t,n)=>r&&!r.has(n)?t:new e({type:`nonoptional`,innerType:t})),Zt(t,Ht(t._zod.def,{shape:i}))}function pn(e,t=0){if(e.aborted===!0)return!0;for(let n=t;n<e.issues.length;n++)if(e.issues[n]?.continue!==!0)return!0;return!1}function mn(e,t=0){if(e.aborted===!0)return!0;for(let n=t;n<e.issues.length;n++)if(e.issues[n]?.continue===!1)return!0;return!1}function hn(e,t){return t.map(t=>{var n;return(n=t).path??(n.path=[]),t.path.unshift(e),t})}function gn(e){return typeof e==`string`?e:e?.message}function _n(e){let t=[];for(let n of e??[]){let e=n._zod.def;if(!/_(length|size)$|_equals$/.test(e.check))break;let r=e.maximum??e.length??e.size;r>=0&&t.push([r,n])}return t}function vn(e,t,n){var r;for(let i=t;i<e.length;i++)(r=e[i]).schema??(r.schema=n)}function yn(e,t,n){var r;let i=e.inst?._zod?.traits;i?.has(`$ZodType`)&&(i.has(`$ZodCheck`)?(r=e).schema??(r.schema=e.inst):e.schema=e.inst);let a=e.schema===e.inst?void 0:e.schema?._zod.def?.error,o=e.message?e.message:gn(e.inst?._zod.def?.error?.(e))??gn(a?.(e))??gn(t?.error?.(e))??gn(n.customError?.(e))??gn(n.localeError?.(e))??`Invalid input`,s={};for(let t of Object.keys(e))t!==`inst`&&t!==`schema`&&t!==`continue`&&t!==`input`&&t!==`__proto__`&&(s[t]=e[t]);return s.path??=[],s.message=o,t?.reportInput&&(s.input=e.input),s}var bn=/[\uD800-\uDBFF]/;function xn(e){let t=e.length;if(!bn.test(e))return t;let n=t;for(let r=0;r<t-1;r++)(e.charCodeAt(r)&64512)==55296&&(e.charCodeAt(r+1)&64512)==56320&&(n--,r++);return n}function Sn(e){return Array.isArray(e)?`array`:typeof e==`string`?`string`:`unknown`}function Cn(e){let t=typeof e;switch(t){case`number`:return Number.isNaN(e)?`nan`:`number`;case`object`:{if(e===null)return`null`;if(Array.isArray(e))return`array`;let t=e;if(t&&Object.getPrototypeOf(t)!==Object.prototype&&`constructor`in t&&t.constructor)return t.constructor.name}}return t}function wn(...e){let[t,n,r]=e;return typeof t==`string`?{message:t,code:`custom`,input:n,inst:r}:{...t}}function Tn(e,t){for(let n in t){let r=Object.getOwnPropertyDescriptor(t,n);r.get?Object.defineProperty(e,n,{...r,enumerable:!1}):kn(e,n,r.value)}}function En(e,t,n,r=!0){return Object.defineProperty(e,t,{configurable:!0,writable:!0,enumerable:r,value:n}),n}function Dn(e,t,n){return En(e,t,n,!1)}function On(e,t){for(let n in e){let r=e[n];Object.defineProperty(t,n,{configurable:!0,enumerable:!0,get(){return En(this,n,r(this))},set(e){En(this,n,e)}})}return t}function kn(e,t,n){Object.defineProperty(e,t,{configurable:!0,get(){return this==null?n:En(this,t,n.bind(this))},set(e){En(this,t,e)}})}function An(e,t){let n=Object.getPrototypeOf(e);return t in n?void 0:n}var jn,Mn=!1,Nn={configurable:!0,get(){Mn=!0}};function Pn(e,t,n){let r=Object.getPrototypeOf(e._zod);t in r&&jn!==e._zod?jn=void 0:(jn=e._zod,Object.defineProperty(r,t,{configurable:!0,get(){Object.defineProperty(this,t,Nn);let e=Mn;Mn=!1;try{let r=n(this);return Mn?delete this[t]:Object.defineProperty(this,t,{configurable:!0,writable:!0,value:r}),Mn||=e,r}catch(n){throw delete this[t],Mn||=e,n}},set(e){Object.defineProperty(this,t,{configurable:!0,writable:!0,value:e})}}))}function Fn(e,t,n,r){let i=An(e,t);i&&Object.defineProperty(i,t,{configurable:!0,get(){let e={configurable:!0,writable:!0,enumerable:r,value:void 0};return Object.defineProperty(this,t,e),e.value=n(this),Object.defineProperty(this,t,e),e.value},set(e){Object.defineProperty(this,t,{configurable:!0,writable:!0,enumerable:r,value:e})}})}var In=`~constantCatch`;function Ln(e){let t=()=>e;return t[In]=!0,t}var Rn,zn={value:void 0,enumerable:!1},Bn=`captureStackTrace`in Error?Error:null;function Vn(e){let t=Bn;if(t){let n=t.stackTraceLimit;if(typeof n==`number`){try{t.stackTraceLimit=0}catch{return Bn=null,new e}try{return new e}finally{t.stackTraceLimit=n}}}return new e}function H(e,t,n,r){let i={};function a(e){this.def=e,this.constr=d,this.traits=new Set}a.prototype=i;let o=n,s=o&&new WeakSet;function c(n,r){if(!n._zod){zn.value=new a(r);try{Object.defineProperty(n,"_zod",zn)}finally{zn.value=void 0}}else if(n._zod.traits.has(e))return;if(n._zod.traits.add(e),t(n,r),s){let e=Object.getPrototypeOf(n),t=n._zod.constr.prototype,r=e;for(;r&&r!==t;)r=Object.getPrototypeOf(r);let i=r??e;s.has(i)||(s.add(i),Tn(i,o))}let i=d.prototype;for(let e in i)Object.prototype.hasOwnProperty.call(i,e)&&(e in n||(n[e]=i[e].bind(n)))}let l=r?.Parent??Object;class u extends l{}Object.defineProperty(u,"name",{value:e});function d(e){let t=r?.Parent?Vn(u):this;c(t,e);let n=t._zod.deferred;if(n){for(let e of n)e();t._zod.deferred=void 0}let i=globalThis.__zod_globalConfig?.postProcessor;return i&&i(t),t}return Object.defineProperty(d,"init",{value:c}),Object.defineProperty(d,Symbol.hasInstance,{value:t=>r?.Parent&&t instanceof r.Parent?!0:t?._zod?.traits?.has(e)}),Object.defineProperty(d,"name",{value:e}),d}var Hn=class extends Error{constructor(){super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`)}},Un=class extends Error{constructor(e){super(`Encountered unidirectional transform during encode: ${e}`),this.name=`ZodEncodeError`}};(Rn=globalThis).__zod_globalConfig??(Rn.__zod_globalConfig={});var Wn=globalThis.__zod_globalConfig;function Gn(e){return e&&Object.assign(Wn,e),Wn}function Kn(){let e=this._zod;return e.message??=JSON.stringify(e.def,kt,2),e.message}function qn(e){this._zod.message=e}var Jn={get:Kn,set:qn,enumerable:!0,configurable:!0},Yn={value:void 0,enumerable:!1},Xn=new WeakSet([Object.prototype,Error.prototype]),Zn=H(`$ZodError`,(e,t)=>{e.name=`$ZodError`,Yn.value=t,Object.defineProperty(e,"issues",Yn),Yn.value=void 0,Object.defineProperty(e,"message",Jn);let n=Object.getPrototypeOf(e);Xn.has(n)||(Xn.add(n),Object.defineProperty(n,"toString",{configurable:!0,enumerable:!1,get(){let e=()=>this.message;return Object.defineProperty(this,"toString",{value:e,configurable:!0,writable:!0}),e},set(e){Object.defineProperty(this,"toString",{value:e,configurable:!0,writable:!0})}}))});function Qn(e,t,n){return Object.prototype.hasOwnProperty.call(e,t)||(t===`__proto__`?Object.defineProperty(e,t,{value:n(),writable:!0,enumerable:!0,configurable:!0}):e[t]=n()),e[t]}function $n(e,t=e=>e.message){let n={},r=[];for(let i of e.issues)i.path.length>0?Qn(n,i.path[0],()=>[]).push(t(i)):r.push(t(i));return{formErrors:r,fieldErrors:n}}function er(e,t=e=>e.message){let n={_errors:[]},r=(e,i=[])=>{for(let a of e.issues)if(a.code===`invalid_union`&&a.errors.length)a.errors.map(e=>r({issues:e},[...i,...a.path]));else if(a.code===`invalid_key`)r({issues:a.issues},[...i,...a.path]);else if(a.code===`invalid_element`)r({issues:a.issues},[...i,...a.path]);else{let e=[...i,...a.path];if(e.length===0)n._errors.push(t(a));else{let r=n,i=0;for(;i<e.length;){let n=e[i],o=i===e.length-1;if(n===`_errors`){o&&r._errors.push(t(a)),i++;continue}Object.prototype.hasOwnProperty.call(r,n)||Object.defineProperty(r,n,{value:{_errors:[]},enumerable:!0,writable:!0,configurable:!0});let s=r[n];o&&s._errors.push(t(a)),r=s,i++}}}};return r(e),n}function tr(e,t){return{callee:t?.callee??e,Err:t?.Err}}var nr=e=>{let t=(n,r,i,a)=>{let o=i?{...i,async:!1}:{async:!1},s=n._zod.run({value:r,issues:[]},o);if(s instanceof Promise)throw new Hn;if(s.issues.length){let n=new((a?.Err)??e)(s.issues.map(e=>yn(e,o,Gn())));throw Wt(n,a?.callee??t),n}return s.value};return t},rr=e=>{let t=async(n,r,i,a)=>{let o=i?{...i,async:!0}:{async:!0},s=n._zod.run({value:r,issues:[]},o);if(s instanceof Promise&&(s=await s),s.issues.length){let n=new((a?.Err)??e)(s.issues.map(e=>yn(e,o,Gn())));throw Wt(n,a?.callee??t),n}return s.value};return t},ir=e=>(t,n,r)=>{let i=r?{...r,async:!1}:{async:!1},a=t._zod.run({value:n,issues:[]},i);if(a instanceof Promise)throw new Hn;return a.issues.length?ar(e,a.issues,i):{success:!0,data:a.value}};function ar(e,t,n){let r;return{success:!1,get error(){return r||(r=new e(t.map(e=>yn(e,n,Gn()))),t=void 0,n=void 0),r},set error(e){r=e,t=void 0,n=void 0}}}var or=e=>async(t,n,r)=>{let i=r?{...r,async:!0}:{async:!0},a=t._zod.run({value:n,issues:[]},i);return a instanceof Promise&&(a=await a),a.issues.length?ar(e,a.issues,i):{success:!0,data:a.value}},sr=Symbol.for(`zod.compile.invalid`),cr=Symbol.for(`zod.compile.fallback`),lr=((e,t,n)=>{let r=e._zod.bag.validator;if(r!==void 0){if(r(t)!==sr)return!0;if(r.definite===!0&&n===void 0)return!1}return ur(e,t,n)});function ur(e,t,n){let r=n?{...n,async:!1,abortEarly:!0}:{async:!1,abortEarly:!0},i=e._zod.bag.fallbackRun,a;if(i?(r[cr]=!0,a=i({value:t,issues:[]},r)):a=e._zod.run({value:t,issues:[]},r),a instanceof Promise)throw new Hn;return a.issues.length===0}var dr=async(e,t,n)=>{let r=n?{...n,async:!0,abortEarly:!0}:{async:!0,abortEarly:!0},i=e._zod.run({value:t,issues:[]},r);return i instanceof Promise&&(i=await i),i.issues.length===0},fr=e=>{let t=nr(e),n=(e,r,i,a)=>{let o=i?{...i,direction:`backward`}:{direction:`backward`};return t(e,r,o,tr(n,a))};return n},pr=e=>{let t=nr(e),n=(e,r,i,a)=>t(e,r,i,tr(n,a));return n},mr=e=>{let t=rr(e),n=async(e,r,i,a)=>{let o=i?{...i,direction:`backward`}:{direction:`backward`};return await t(e,r,o,tr(n,a))};return n},hr=e=>{let t=rr(e),n=async(e,r,i,a)=>await t(e,r,i,tr(n,a));return n},gr=e=>(t,n,r)=>{let i=r?{...r,direction:`backward`}:{direction:`backward`};return ir(e)(t,n,i)},_r=e=>(t,n,r)=>ir(e)(t,n,r),vr=e=>async(t,n,r)=>{let i=r?{...r,direction:`backward`}:{direction:`backward`};return or(e)(t,n,i)},yr=e=>async(t,n,r)=>or(e)(t,n,r),br=/^-?\d+(?:\.\d+)?$/,xr=H(`$ZodCheck`,(e,t)=>{var n;e._zod??={},e._zod.def=t,(n=e._zod).onattach??(n.onattach=[])}),Sr=e=>{let t=e.value;return!Mt(t)&&t.length!==void 0},Cr={number:`number`,bigint:`bigint`,object:`date`},wr=H(`$ZodCheckLessThan`,(e,t)=>{xr.init(e,t);let n=Cr[typeof t.value];e._zod.check=r=>{(t.inclusive?r.value<=t.value:r.value<t.value)||r.issues.push({origin:Cr[typeof r.value]??n,code:`too_big`,maximum:typeof t.value==`object`?t.value.getTime():t.value,input:r.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),Tr=H(`$ZodCheckGreaterThan`,(e,t)=>{xr.init(e,t);let n=Cr[typeof t.value];e._zod.check=r=>{(t.inclusive?r.value>=t.value:r.value>t.value)||r.issues.push({origin:Cr[typeof r.value]??n,code:`too_small`,minimum:typeof t.value==`object`?t.value.getTime():t.value,input:r.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),Er=H(`$ZodCheckMultipleOf`,(e,t)=>{xr.init(e,t),e._zod.check=n=>{if(typeof n.value!=typeof t.value)throw Error(`Cannot mix number and bigint in multiple_of check.`);(typeof n.value==`bigint`?t.value!==BigInt(0)&&n.value%t.value===BigInt(0):Pt(n.value,t.value)===0)||n.issues.push({origin:typeof n.value,code:`not_multiple_of`,divisor:t.value,input:n.value,inst:e,continue:!t.abort})}}),Dr=H(`$ZodCheckNumberFormat`,(e,t)=>{xr.init(e,t),t.format=t.format||`float64`;let n=t.format?.includes(`int`),r=n?`int`:`number`,[i,a]=tn[t.format];e._zod.check=o=>{let s=o.value;if(n){if(!Number.isInteger(s)){o.issues.push({expected:r,format:t.format,code:`invalid_type`,continue:!1,input:s,inst:e});return}if(!Number.isSafeInteger(s)){s>0?o.issues.push({input:s,code:`too_big`,maximum:2**53-1,note:`Integers must be within the safe integer range.`,inst:e,origin:r,inclusive:!0,continue:!t.abort}):o.issues.push({input:s,code:`too_small`,minimum:-(2**53-1),note:`Integers must be within the safe integer range.`,inst:e,origin:r,inclusive:!0,continue:!t.abort});return}}s<i&&o.issues.push({origin:`number`,input:s,code:`too_small`,minimum:i,inclusive:!0,inst:e,continue:!t.abort}),s>a&&o.issues.push({origin:`number`,input:s,code:`too_big`,maximum:a,inclusive:!0,inst:e,continue:!t.abort})}}),Or=H(`$ZodCheckMaxLength`,(e,t)=>{var n;xr.init(e,t),(n=e._zod.def).when??(n.when=Sr),e._zod.check=n=>{let r=n.value,i=r.length;if((typeof r==`string`&&i>t.maximum?xn(r):i)<=t.maximum)return;let a=Sn(r);n.issues.push({origin:a,code:`too_big`,maximum:t.maximum,inclusive:!0,input:r,inst:e,continue:!t.abort})}}),kr=H(`$ZodCheckMinLength`,(e,t)=>{var n;xr.init(e,t),(n=e._zod.def).when??(n.when=Sr),e._zod.check=n=>{let r=n.value,i=r.length;if((typeof r==`string`&&i>=t.minimum&&i<t.minimum*2?xn(r):i)>=t.minimum)return;let a=Sn(r);n.issues.push({origin:a,code:`too_small`,minimum:t.minimum,inclusive:!0,input:r,inst:e,continue:!t.abort})}}),Ar=H(`$ZodCheckLengthEquals`,(e,t)=>{var n;xr.init(e,t),(n=e._zod.def).when??(n.when=Sr),e._zod.check=n=>{let r=n.value,i=r.length,a=typeof r==`string`&&i>=t.length&&i<=t.length*2?xn(r):i;if(a===t.length)return;let o=Sn(r),s=a>t.length;n.issues.push({origin:o,...s?{code:`too_big`,maximum:t.length}:{code:`too_small`,minimum:t.length},inclusive:!0,exact:!0,input:n.value,inst:e,continue:!t.abort})}}),jr=H(`$ZodCheckOverwrite`,(e,t)=>{xr.init(e,t),e._zod.check=e=>{e.value=t.tx(e.value)}}),Mr=class{constructor(e=[],t={}){this.content=[],this.indent=0,this.args=e,this.closed=t}indented(e){this.indent+=1;try{e(this)}finally{--this.indent}}write(e){if(typeof e==`function`){e(this,{execution:`sync`}),e(this,{execution:`async`});return}let t=e.split(`
`).filter(e=>e),n=Math.min(...t.map(e=>e.length-e.trimStart().length)),r=t.map(e=>e.slice(n)).map(e=>` `.repeat(this.indent*2)+e);for(let e of r)this.content.push(e)}compile(){let e=Function,t=this?.content??[``];return new e(...Object.keys(this.closed),`return function (${this.args.join(`, `)}) {\n${t.join(`
`)}\n};`)(...Object.values(this.closed))}},Nr={major:4,minor:6,patch:7},Pr=H(`$ZodType`,(e,t)=>{var n;e??={},e._zod.def=t,e._zod.bag=e._zod.bag||{},e._zod.version=Nr;let r=e._zod.def.checks,i=e._zod.traits.has(`$ZodCheck`)?[e,...r??[]]:r?.length?[...r]:[];for(let t of i)for(let n of t._zod.onattach)n(e);if(i.length===0)(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let t=(t,n,r)=>{if(t.memo)return t;let i=pn(t),a;for(let o of n){if(o._zod.def.when){if(mn(t)||!o._zod.def.when(t))continue}else if(i)continue;let n=t.issues.length,s=o._zod.check(t);if(s instanceof Promise&&r?.async===!1)throw new Hn;if(a||s instanceof Promise)a=(a??Promise.resolve()).then(async()=>{await s,t.issues.length!==n&&(vn(t.issues,n,e),i||=pn(t,n))});else{if(t.issues.length===n)continue;vn(t.issues,n,e),i||=pn(t,n)}}return a?a.then(()=>t):t},n=(n,r,a)=>{if(pn(n))return n.aborted=!0,n;let o=t(r,i,a);if(o instanceof Promise){if(a.async===!1)throw new Hn;return o.then(t=>e._zod.parse(t,a))}return e._zod.parse(o,a)};e._zod.run=(r,a)=>{if(a.skipChecks)return e._zod.parse(r,a);if(a.direction===`backward`){let t=e._zod.parse({value:r.value,issues:[]},{...a,skipChecks:!0});return t instanceof Promise?t.then(e=>n(e,r,a)):n(t,r,a)}let o=e._zod.parse(r,a);if(o instanceof Promise){if(a.async===!1)throw new Hn;return o.then(e=>t(e,i,a))}return t(o,i,a)}}},{get"~standard"(){return Dn(this,`~standard`,Lr(this))},set"~standard"(e){En(this,`~standard`,e)}}),Fr=(e,t)=>e.issues.length?{issues:e.issues.map(e=>yn(e,t,Gn()))}:{value:e.value};async function Ir(e,t){let n={async:!0};return Fr(await e._zod.run({value:t,issues:[]},n),n)}function Lr(e){return{validate:t=>{let n={async:!1};try{let r=e._zod.run({value:t,issues:[]},n);if(!(r instanceof Promise))return Fr(r,n)}catch{}return Ir(e,t)},vendor:`zod`,version:1}}var Rr=H(`$ZodNumber`,(e,t)=>{Pr.init(e,t),e._zod.pattern=br,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=Number(n.value)}catch{}let i=n.value;if(typeof i==`number`&&!Number.isNaN(i)&&Number.isFinite(i))return n;let a=typeof i==`number`?Number.isNaN(i)?`NaN`:Number.isFinite(i)?void 0:String(i):void 0;return n.issues.push({expected:`number`,code:`invalid_type`,input:i,inst:e,...a?{received:a}:{}}),n}}),zr=H(`$ZodNumberFormat`,(e,t)=>{Dr.init(e,t),Rr.init(e,t)}),Br=H(`$ZodUnknown`,(e,t)=>{Pr.init(e,t),e._zod.parse=e=>e}),Vr=H(`$ZodNever`,(e,t)=>{Pr.init(e,t),e._zod.parse=(t,n)=>(t.issues.push({expected:`never`,code:`invalid_type`,input:t.value,inst:e}),t)});function Hr(e,t){let n=_n(e._zod.def.checks);if(!n.length)return;let r=Math.min(...n.map(e=>e[0])),i=e._zod.parse;e._zod.parse=(n,a)=>{let o=t(n.value);if(o>r&&!a?.skipChecks&&a?.direction!==`backward`){for(let[t,r]of _n(e._zod.def.checks))if(o>t&&r._zod.def.when(n)){let t=n.issues.length;return r._zod.check(n),n.issues[t].continue=!1,vn(n.issues,t,e),n}}return i(n,a)}}var Ur=e=>Array.isArray(e)?e.length:-1;function Wr(e,t,n){e.issues.length&&t.issues.push(...hn(n,e.issues)),t.value[n]=e.value}var Gr=H(`$ZodArray`,(e,t)=>{Pr.init(e,t);let n=Wn.memoizer;n?.attach(e),e._zod.parse=(r,i)=>{let a=r.value;if(!Array.isArray(a))return r.issues.push({expected:`array`,code:`invalid_type`,input:a,inst:e}),r;r.value=n?n.alloc(e,r,Array(a.length),i):Array(a.length);let o=[],s=i?.abortEarly;for(let e=0;e<a.length;e++){let n=a[e],c=t.element._zod.run({value:n,issues:[]},i);if(c instanceof Promise)o.push(c.then(t=>Wr(t,r,e)));else if(Wr(c,r,e),s&&c.issues.length!==0&&pn(c))break}return o.length?Promise.all(o).then(()=>r):r},Hr(e,Ur)});function Kr(e,t,n,r,i,a){let o=n in r,s=a===`optional`;if(o||!s||i!==`optional`){if(e.issues.length){if(i!==void 0&&s&&!o)return;t.issues.push(...hn(n,e.issues))}!o&&i===void 0?e.issues.length||t.issues.push({code:`invalid_type`,expected:`nonoptional`,input:void 0,path:[n]}):e.value===void 0?(o||i===`defaulted`&&!s)&&(t.value[n]=void 0):t.value[n]=e.value}}var qr=[];function Jr(e){let t=Object.keys(e.shape),n=Object.getOwnPropertySymbols(e.shape),r=n.length?n:qr,i=r.length?[...t,...r]:t;for(let t of i)if(!e.shape?.[t]?._zod?.traits?.has(`$ZodType`))throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);let a=en(e.shape);return{...e,allKeys:i,symbolKeys:r,keySet:new Set(t),numKeys:t.length,optionalKeys:new Set(a)}}function Yr(e,t,n,r,i,a,o){let s=[],c=i.keySet,l=i.catchall._zod,u=l.def.type,d=l.optin,f=l.optout,p=0;for(let i in t){if(o&&n.issues.length!==p){if(pn(n,p))break;p=n.issues.length}if(c.has(i))continue;if(i===`__proto__`){u===`never`&&s.push(i);continue}if(u===`never`){s.push(i);continue}let a=l.run({value:t[i],issues:[]},r);a instanceof Promise?e.push(a.then(e=>Kr(e,n,i,t,d,f))):Kr(a,n,i,t,d,f)}return s.length&&n.issues.push({code:`unrecognized_keys`,keys:s,input:t,inst:a,continue:!0}),e.length?Promise.all(e).then(()=>n):n}var Xr=H(`$ZodObject`,(e,t)=>{Pr.init(e,t);let n=Object.getOwnPropertyDescriptor(t,`shape`),r=n?.get?n.get.raw:t.shape??{};if(r){let e=()=>{let n={...r};return Object.defineProperty(t,"shape",{value:n}),e.raw=n,n};e.raw=r,Object.defineProperty(t,"shape",{get:e})}let i=jt(()=>Jr(t));Pn(e,`propValues`,e=>{let t=e.def.shape,n={};for(let e in t){let r=t[e]._zod;if(r.values){Object.prototype.hasOwnProperty.call(n,e)||Ft(n,e,new Set);for(let t of r.values)n[e].add(t);r.optin!==void 0&&n[e].add(void 0)}}return n});let a=Gt,o=t.catchall,s,c=Wn.memoizer;c?.attach(e),e._zod.parse=(t,n)=>{s??=i.value;let r=t.value;if(!a(r))return t.issues.push({expected:`object`,code:`invalid_type`,input:r,inst:e}),t;t.value=c?c.alloc(e,t,{},n):{};let l=[],u=s.shape,d=n?.abortEarly,f=t.issues.length;for(let e of s.allKeys){if(d&&t.issues.length!==f){if(pn(t,f))break;f=t.issues.length}if(e===`__proto__`)continue;let i=u[e],a=i._zod.optin,o=i._zod.optout,s=i._zod.run({value:r[e],issues:[]},n);s instanceof Promise?l.push(s.then(n=>Kr(n,t,e,r,a,o))):Kr(s,t,e,r,a,o)}return o?Yr(l,r,t,n,i.value,e,d===!0):l.length?Promise.all(l).then(()=>t):t}}),Zr=H(`$ZodObjectJIT`,(e,t)=>{Xr.init(e,t);let n=e._zod.parse,r=jt(()=>Jr(t)),i=Wn.memoizer,a=t=>{let n=r.value,a=n.symbolKeys,o=new Mr([`payload`,`ctx`],{shape:t,inst:e,memo:i,syms:a}),s=e=>`shape[${e}]._zod.run({ value: input[${e}], issues: [] }, ctx)`,c=(e,t)=>`
          let ${e}_ab = false;
          for (let i = 0; i < ${e}.issues.length; i++) {
            const iss = ${e}.issues[i];
            iss.path = iss.path ? [${t}, ...iss.path] : [${t}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${e}_ab = true;
          }
          if (${e}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;o.write(`const input = payload.value;`);let l=Object.create(null),u=0;for(let e of n.allKeys)l[e]=`key_${u++}`;o.write(i?`const newResult = memo.alloc(inst, payload, {}, ctx);`:`const newResult = {};`);for(let e of n.allKeys){if(e===`__proto__`)continue;let n=l[e],r=typeof e==`symbol`?`syms[${a.indexOf(e)}]`:Ut(e),i=`${r} in input`,u=t[e],d=u?._zod?.optin,f=d!==void 0,p=u?._zod?.optout===`optional`;if(o.write(`const ${n} = ${s(r)};`),f&&p){let e=d===`optional`?`${n}_present`:`${n}.value !== undefined || ${n}_present`;o.write(`
        const ${n}_present = ${i};
        if (!${n}.issues.length || ${n}_present) {
          if (${n}.issues.length) {${c(n,r)}
          }

          if (${e}) {
            newResult[${r}] = ${n}.value;
          }
        }

      `)}else f?(o.write(`
        if (${n}.issues.length) {${c(n,r)}
        }
      `),d===`defaulted`?o.write(`newResult[${r}] = ${n}.value;`):o.write(`
        if (${n}.value !== undefined || ${i}) {
          newResult[${r}] = ${n}.value;
        }
      `)):o.write(`
        const ${n}_present = ${i};
        if (${n}.issues.length) {${c(n,r)}
        }
        if (!${n}_present && !${n}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${r}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${n}_present) {
          newResult[${r}] = ${n}.value;
        }

      `)}return o.write(`payload.value = newResult;`),o.write(`return payload;`),o.compile()},o,s=Gt,c=!Wn.jitless,l=c&&Kt.value,u=t.catchall,d;e._zod.parse=(i,f)=>{d??=r.value;let p=i.value;return s(p)?c&&l&&f?.async===!1&&f.jitless!==!0?(o||=a(t.shape),i=o(i,f),u?Yr([],p,i,f,d,e,f?.abortEarly===!0):i):n(i,f):(i.issues.push({expected:`object`,code:`invalid_type`,input:p,inst:e}),i)}});function Qr(e,t,n,r){for(let n of e)if(n.issues.length===0)return t.value=n.value,t;let i=e.filter(e=>!pn(e));return i.length===1?(t.value=i[0].value,i[0]):(t.issues.push({code:`invalid_union`,input:t.value,inst:n,errors:e.map(e=>e.issues.map(e=>yn(e,r,Gn())))}),t)}var $r=H(`$ZodUnion`,(e,t)=>{Pr.init(e,t),Pn(e,`optin`,e=>e.def.options.some(e=>e._zod.optin===`defaulted`)?`defaulted`:e.def.options.some(e=>e._zod.optin!==void 0)?`optional`:void 0),Pn(e,`optout`,e=>e.def.options.some(e=>e._zod.optout===`optional`)?`optional`:void 0),Pn(e,`values`,e=>{if(e.def.options.every(e=>e._zod.values))return new Set(e.def.options.flatMap(e=>Array.from(e._zod.values)))}),Pn(e,`pattern`,e=>{if(e.def.options.every(e=>e._zod.pattern)){let t=e.def.options.map(e=>e._zod.pattern);return RegExp(`^(${t.map(e=>Nt(e.source)).join(`|`)})$`)}});let n=t.options.length===1?t.options[0]._zod.run:null;e._zod.parse=(r,i)=>{if(n)return n(r,i);let a=!1,o=[];for(let e of t.options){let t=e._zod.run({value:r.value,issues:[]},i);if(t instanceof Promise)o.push(t),a=!0;else{if(t.issues.length===0)return t;o.push(t)}}return a?Promise.all(o).then(t=>Qr(t,r,e,i)):Qr(o,r,e,i)}}),ei=H(`$ZodIntersection`,(e,t)=>{Pr.init(e,t),e._zod.parse=(e,n)=>{let r=e.value,i=t.left._zod.run({value:r,issues:[]},n),a=t.right._zod.run({value:r,issues:[]},n);return i instanceof Promise||a instanceof Promise?Promise.all([i,a]).then(([t,n])=>ni(e,t,n)):ni(e,i,a)}});function ti(e,t){if(e===t||e instanceof Date&&t instanceof Date&&+e==+t)return{valid:!0,data:e};if(qt(e)&&qt(t)){let n=Object.keys(t),r=Object.keys(e).filter(e=>n.indexOf(e)!==-1),i={...e,...t};Object.prototype.hasOwnProperty.call(i,`__proto__`)&&delete i.__proto__;for(let n of r){if(n===`__proto__`)continue;let r=ti(e[n],t[n]);if(!r.valid)return{valid:!1,mergeErrorPath:[n,...r.mergeErrorPath]};i[n]=r.data}return{valid:!0,data:i}}if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return{valid:!1,mergeErrorPath:[]};let n=[];for(let r=0;r<e.length;r++){let i=e[r],a=t[r],o=ti(i,a);if(!o.valid)return{valid:!1,mergeErrorPath:[r,...o.mergeErrorPath]};n.push(o.data)}return{valid:!0,data:n}}return{valid:!1,mergeErrorPath:[]}}function ni(e,t,n){let r=new Map,i,a=new Map,o=(e,t)=>{let n;if(e.code===`unrecognized_keys`&&!e.path?.length)i??=e,n=e.keys;else if(e.code===`invalid_key`&&e.origin===`record`&&e.path?.length===1){let t=String(e.path[0]);a.has(t)||a.set(t,e),n=[t]}else return!1;for(let e of n)r.has(e)||r.set(e,{}),r.get(e)[t]=!0;return!0};for(let n of t.issues)o(n,`l`)||e.issues.push(n);for(let t of n.issues)o(t,`r`)||e.issues.push(t);let s=[...r].filter(([,e])=>e.l&&e.r).map(([e])=>e);if(s.length){let t=i?s.filter(e=>i.keys.includes(e)):[];t.length&&e.issues.push({...i,keys:t});for(let n of s)!t.includes(n)&&a.has(n)&&e.issues.push(a.get(n))}let c=ti(t.value,n.value);if(!c.valid){if(pn(e))return e;throw Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`)}return e.value=c.data,e}var ri=H(`$ZodTuple`,(e,t)=>{Pr.init(e,t);let n=t.items,r=Wn.memoizer;r?.attach(e),e._zod.parse=(i,a)=>{let o=i.value;if(!Array.isArray(o))return i.issues.push({input:o,inst:e,expected:`tuple`,code:`invalid_type`}),i;i.value=r?r.alloc(e,i,[],a):[];let s=[],c=ii(n,`optin`),l=ii(n,`optout`);if(!t.rest){if(o.length<c)return i.issues.push({code:`too_small`,minimum:c,inclusive:!0,input:o,inst:e,origin:`array`}),i;o.length>n.length&&i.issues.push({code:`too_big`,maximum:n.length,inclusive:!0,input:o,inst:e,origin:`array`})}let u=Array(n.length),d=t.rest?a?.abortEarly:void 0,f=!1;for(let e=0;e<n.length;e++){let t=n[e]._zod.run({value:o[e],issues:[]},a);t instanceof Promise?s.push(t.then(t=>{u[e]=t})):(u[e]=t,d&&!f&&t.issues.length&&(f=pn(t)))}if(t.rest&&!f){let e=n.length-1,r=o.slice(n.length),c=i.issues.length;for(let n of r){if(d&&i.issues.length!==c){if(pn(i,c))break;c=i.issues.length}e++;let r=t.rest._zod.run({value:n,issues:[]},a);r instanceof Promise?s.push(r.then(t=>ai(t,i,e))):ai(r,i,e)}}return s.length?Promise.all(s).then(()=>oi(u,i,n,o,l)):oi(u,i,n,o,l)}});function ii(e,t){for(let n=e.length-1;n>=0;n--)if(!(t===`optin`?e[n]._zod.optin!==void 0:e[n]._zod.optout===`optional`))return n+1;return 0}function ai(e,t,n){e.issues.length&&t.issues.push(...hn(n,e.issues)),t.value[n]=e.value}function oi(e,t,n,r,i){for(let a=0;a<n.length;a++){let o=e[a],s=a<r.length;if(!s&&a>=i&&n[a]._zod.optin===`optional`){t.value.length=a;break}if(o.issues.length){if(!s&&a>=i){t.value.length=a;break}t.issues.push(...hn(a,o.issues))}t.value[a]=o.value}for(let e=t.value.length-1;e>=r.length&&n[e]._zod.optout===`optional`&&t.value[e]===void 0;e--)t.value.length=e;return t}var si=H(`$ZodEnum`,(e,t)=>{Pr.init(e,t);let n=Dt(t.entries),r=new Set(n);e._zod.values=r,Pn(e,`pattern`,e=>{let t=Dt(e.def.entries).filter(e=>Yt.has(typeof e));return RegExp(t.length?`^(${t.map(e=>Xt(e.toString())).join(`|`)})$`:`^[^\\s\\S]$`)}),e._zod.parse=(t,i)=>{let a=t.value;return r.has(a)||t.issues.push({code:`invalid_value`,values:n,input:a,inst:e}),t}}),ci=H(`$ZodLiteral`,(e,t)=>{Pr.init(e,t);let n=new Set(t.values);e._zod.values=n,Pn(e,`pattern`,e=>{let t=e.def.values;return RegExp(t.length?`^(${t.map(e=>typeof e==`string`?Xt(e):e?Xt(e.toString()):String(e)).join(`|`)})$`:`^[^\\s\\S]$`)}),e._zod.parse=(r,i)=>{let a=r.value;return n.has(a)||r.issues.push({code:`invalid_value`,values:t.values,input:a,inst:e}),r}}),li=H(`$ZodTransform`,(e,t)=>{Pr.init(e,t),e._zod.optin=`optional`,Wn.memoizer?.guard(e),e._zod.parse=(n,r)=>{if(r.direction===`backward`)throw new Un(e.constructor.name);let i=t.transform(n.value,n);if(r.async)return(i instanceof Promise?i:Promise.resolve(i)).then(e=>(n.value=e,n));if(i instanceof Promise)throw new Hn;return n.value=i,n}});function ui(e,t){return e.value=t.issues.length?void 0:t.value,e}var di=H(`$ZodOptional`,(e,t)=>{Pr.init(e,t),Pn(e,`optin`,e=>e.def.innerType._zod.optin===`defaulted`?`defaulted`:`optional`),e._zod.optout=`optional`,Pn(e,`values`,e=>{let t=e.def.innerType._zod.values;return t?new Set([...t,void 0]):void 0}),Pn(e,`pattern`,e=>{let t=e.def.innerType._zod.pattern;return t?RegExp(`^(${Nt(t.source)})?$`):void 0}),e._zod.parse=(e,n)=>{if(e.value===void 0){if(t.innerType._zod.optin!==`defaulted`)return e;let r=t.innerType._zod.run({value:e.value,issues:[]},n);return r instanceof Promise?r.then(t=>ui(e,t)):ui(e,r)}return t.innerType._zod.run(e,n)}}),fi=H(`$ZodExactOptional`,(e,t)=>{di.init(e,t),Pn(e,`values`,e=>e.def.innerType._zod.values),Pn(e,`pattern`,e=>e.def.innerType._zod.pattern),e._zod.parse=(e,n)=>t.innerType._zod.run(e,n)}),pi=H(`$ZodNullable`,(e,t)=>{Pr.init(e,t),Pn(e,`optin`,e=>e.def.innerType._zod.optin),Pn(e,`optout`,e=>e.def.innerType._zod.optout),Pn(e,`pattern`,e=>{let t=e.def.innerType._zod.pattern;return t?RegExp(`^(${Nt(t.source)}|null)$`):void 0}),Pn(e,`values`,e=>e.def.innerType._zod.values?new Set([...e.def.innerType._zod.values,null]):void 0),e._zod.parse=(e,n)=>e.value===null?e:t.innerType._zod.run(e,n)}),mi=H(`$ZodDefault`,(e,t)=>{Pr.init(e,t),e._zod.optin=`defaulted`,Pn(e,`values`,e=>e.def.innerType._zod.values),e._zod.parse=(e,n)=>{if(n.direction===`backward`)return t.innerType._zod.run(e,n);if(e.value===void 0)return e.value=t.defaultValue,e;let r=t.innerType._zod.run(e,n);return r instanceof Promise?r.then(e=>hi(e,t)):hi(r,t)}});function hi(e,t){return e.value===void 0&&(e.value=t.defaultValue),e}var gi=H(`$ZodPrefault`,(e,t)=>{Pr.init(e,t),e._zod.optin=`defaulted`,Pn(e,`values`,e=>e.def.innerType._zod.values),e._zod.parse=(e,n)=>(n.direction===`backward`||e.value===void 0&&(e.value=t.defaultValue),t.innerType._zod.run(e,n))}),_i=H(`$ZodNonOptional`,(e,t)=>{Pr.init(e,t),Pn(e,`values`,e=>{let t=e.def.innerType._zod.values;return t?new Set([...t].filter(e=>e!==void 0)):void 0}),e._zod.parse=(n,r)=>{let i=t.innerType._zod.run(n,r);return i instanceof Promise?i.then(t=>vi(t,e)):vi(i,e)}});function vi(e,t){return!e.issues.length&&e.value===void 0&&e.issues.push({code:`invalid_type`,expected:`nonoptional`,input:e.value,inst:t}),e}function yi(e,t,n,r){return t.issues.length?(e.value=n.catchValue({...t,value:e.value,error:{issues:t.issues.map(e=>yn(e,r,Gn()))},input:e.value}),e):(e.value=t.value,t.memo&&(e.memo=!0),e)}var bi=H(`$ZodCatch`,(e,t)=>{Pr.init(e,t),Pn(e,`optin`,e=>e.def.innerType._zod.optin===`defaulted`?`defaulted`:`optional`),Pn(e,`optout`,e=>e.def.innerType._zod.optout),Pn(e,`values`,e=>e.def.innerType._zod.values),e._zod.parse=(e,n)=>{if(n.direction===`backward`)return t.innerType._zod.run(e,n);let r=t.innerType._zod.run({value:e.value,issues:[]},n);return r instanceof Promise?r.then(r=>yi(e,r,t,n)):yi(e,r,t,n)}}),xi=H(`$ZodPipe`,(e,t)=>{Pr.init(e,t),Pn(e,`values`,e=>e.def.in._zod.values),Pn(e,`optin`,e=>e.def.in._zod.optin),Pn(e,`optout`,e=>e.def.out._zod.optout),Pn(e,`propValues`,e=>e.def.in._zod.propValues),e._zod.parse=(e,n)=>{if(n.direction===`backward`){let r=t.out._zod.run(e,n);return r instanceof Promise?r.then(e=>Si(e,t.in,n)):Si(r,t.in,n)}let r=t.in._zod.run(e,n);return r instanceof Promise?r.then(e=>Si(e,t.out,n)):Si(r,t.out,n)}});function Si(e,t,n){return e.issues.some(e=>e.code!==`unrecognized_keys`)?(e.aborted=!0,e):t._zod.run({value:e.value,issues:e.issues},n)}var Ci=H(`$ZodReadonly`,(e,t)=>{Pr.init(e,t),Pn(e,`propValues`,e=>e.def.innerType._zod.propValues),Pn(e,`values`,e=>e.def.innerType._zod.values),Pn(e,`optin`,e=>e.def.innerType?._zod?.optin),Pn(e,`optout`,e=>e.def.innerType?._zod?.optout),e._zod.parse=(e,n)=>{if(n.direction===`backward`)return t.innerType._zod.run(e,n);let r=t.innerType._zod.run(e,n);return r instanceof Promise?r.then(wi):wi(r)}});function wi(e){return e.memo||(e.value=Object.freeze(e.value)),e}var Ti=H(`$ZodCustom`,(e,t)=>{xr.init(e,t),Pr.init(e,t),e._zod.parse=(e,t)=>e,e._zod.check=n=>{let r=n.value,i=t.fn(r);if(i instanceof Promise)return i.then(t=>Ei(t,n,r,e));Ei(i,n,r,e)}});function Ei(e,t,n,r){if(!e){let e={code:`custom`,input:n,inst:r,path:[...r._zod.def.path??[]],continue:!r._zod.def.abort};r._zod.def.params&&(e.params=r._zod.def.params),t.issues.push(wn(e))}}var Di=class extends Error{constructor(){super(`Cannot parse a reference cycle that closes through a transform`),this.name=`ZodCyclicError`}},Oi=`~memo`,ki=[];function Ai(e){return typeof e==`object`&&!!e}function ji(e){return e.map(e=>e.path?{...e,path:e.path.slice()}:{...e})}var Mi=new WeakMap,Ni=0,Pi=1,Fi=2;function Ii(e,t,n){let r=Mi.get(e);if(r!==void 0)return r?Fi:Ni;if(t.has(e))return Fi;t.add(e);let i=Ni,a=e=>{if(i!==Fi&&e?._zod){let r=Ii(e,t,n);r>i&&(i=r)}},o=(e,r)=>{let i=Ni;for(let a of Reflect.ownKeys(e)){let o=Object.getOwnPropertyDescriptor(e,a);if(r&&!o.enumerable)continue;let s=o.get?Pi:o.value?._zod?Ii(o.value,t,n):Ni;s>i&&(i=s)}return i},s=e=>{e>i&&(i=e)},c=e._zod.def;switch(c.type){case`object`:{let e=It(c);s(e?o(e,!0):Pi),a(c.catchall);break}case`array`:a(c.element);break;case`tuple`:for(let e of c.items)a(e);a(c.rest);break;case`record`:case`map`:a(c.keyType),a(c.valueType);break;case`set`:a(c.valueType);break;case`union`:for(let e of c.options)a(e);break;case`intersection`:a(c.left),a(c.right);break;case`optional`:case`nullable`:case`default`:case`prefault`:case`catch`:case`readonly`:case`nonoptional`:case`promise`:case`success`:a(c.innerType);break;case`pipe`:a(c.in),a(c.out);break;case`function`:a(c.input),a(c.output);break;case`lazy`:{let r=c._cachedInner??(n?e._zod.innerType:void 0);s(r?Ii(r,t,!1):Pi);break}case`template_literal`:case`string`:case`number`:case`int`:case`boolean`:case`bigint`:case`symbol`:case`undefined`:case`null`:case`void`:case`never`:case`any`:case`unknown`:case`date`:case`nan`:case`enum`:case`literal`:case`file`:case`transform`:case`custom`:break;default:for(let e in c){let t=Object.getOwnPropertyDescriptor(c,e);if(!t||t.get)continue;let n=t.value;if(n&&typeof n==`object`){if(n._zod)a(n);else if(Array.isArray(n))for(let e of n)a(e)}}}return t.delete(e),Li(e,i)}function Li(e,t){return t!==Pi&&Mi.set(e,t===Fi),t}function Ri(e,t){let n=e.buckets.get(t);return n||(n=new WeakMap,e.buckets.set(t,n)),n}var zi,Bi=[],Vi={alloc(e,t,n){let r=zi;if(!r)return n;zi=void 0;let i={value:n,issues:null};return r.set(t.value,i),Bi.push(i),n},guard(e){var t;(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred.push(()=>{let t=e._zod.parse,n=(e,n)=>{if(n.direction!==`backward`&&Ui(n,e.value))throw new Di;return t(e,n)};e._zod.parse=n,e._zod.run===t&&(e._zod.run=n)})},attach(e){var t;let n,r=!1,i,a;(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred.push(()=>{let t=e._zod.parse,o=(s,c)=>{if(n===void 0){let i=Ii(e,new Set,!1);if(i===Ni)return e._zod.parse=t,e._zod.run===o&&(e._zod.run=t),t(s,c);i===Fi||r?n=!0:r=!0}let l=s.value;if(!Ai(l))return t(s,c);let u=c[Oi];u||(u={buckets:new WeakMap,backEdges:void 0},c[Oi]=u);let d;i===c?d=a:(d=Ri(u,e),i=c,a=d);let f=d.get(l);if(f)return s.value=f.value,f.issues?f.issues.length&&s.issues.push(...ji(f.issues)):(s.memo=!0,u.backEdges??(u.backEdges=new WeakSet),u.backEdges.add(f.value)),s;zi=d;let p=Bi.length,m=t(s,c);zi=void 0;let h=Bi.length>p?Bi.pop():void 0;return m instanceof Promise?m.then(e=>(h&&(h.issues=e.issues.length?ji(e.issues):ki),e)):(h&&(h.issues=m.issues.length?ji(m.issues):ki),m)};e._zod.parse=o,e._zod.run===t&&(e._zod.run=o)})}};function Hi(){return Vi}function Ui(e,t){let n=e[Oi]?.backEdges;return n!==void 0&&Ai(t)&&n.has(t)}var Wi=()=>{let e={string:{unit:`characters`,verb:`to have`},file:{unit:`bytes`,verb:`to have`},array:{unit:`items`,verb:`to have`},set:{unit:`items`,verb:`to have`},map:{unit:`entries`,verb:`to have`}};function t(t){return e[t]??null}let n={regex:`input`,email:`email address`,url:`URL`,emoji:`emoji`,uuid:`UUID`,uuidv4:`UUIDv4`,uuidv6:`UUIDv6`,nanoid:`nanoid`,guid:`GUID`,cuid:`cuid`,cuid2:`cuid2`,ulid:`ULID`,xid:`XID`,ksuid:`KSUID`,datetime:`ISO datetime`,date:`ISO date`,time:`ISO time`,duration:`ISO duration`,ipv4:`IPv4 address`,ipv6:`IPv6 address`,mac:`MAC address`,cidrv4:`IPv4 range`,cidrv6:`IPv6 range`,base64:`base64-encoded string`,base64url:`base64url-encoded string`,json_string:`JSON string`,e164:`E.164 number`,currency_code:`currency code`,credit_card:`credit card number`,iban:`IBAN`,jwt:`JWT`,template_literal:`input`},r={nan:`NaN`};function i(e,t){return e===`number`&&typeof t==`number`&&!Number.isFinite(t)?String(t):r[e]??e}return e=>{switch(e.code){case`invalid_type`:return`Invalid input: expected ${i(e.expected)}, received ${i(Cn(e.input),e.input)}`;case`invalid_value`:return e.values.length===1?`Invalid input: expected ${$t(e.values[0])}`:`Invalid option: expected one of ${Ot(e.values,`|`)}`;case`too_big`:{let n=e.exact?`exactly `:e.inclusive?`<=`:`<`,r=t(e.origin);return r?`Too big: expected ${e.origin??`value`} to have ${n}${e.maximum.toString()} ${r.unit??`elements`}`:`Too big: expected ${e.origin??`value`} to be ${n}${e.maximum.toString()}`}case`too_small`:{let n=e.exact?`exactly `:e.inclusive?`>=`:`>`,r=t(e.origin);return r?`Too small: expected ${e.origin} to have ${n}${e.minimum.toString()} ${r.unit}`:`Too small: expected ${e.origin} to be ${n}${e.minimum.toString()}`}case`invalid_format`:{let t=e;return t.format===`starts_with`?`Invalid string: must start with "${t.prefix}"`:t.format===`ends_with`?`Invalid string: must end with "${t.suffix}"`:t.format===`includes`?`Invalid string: must include "${t.includes}"`:t.format===`regex`?`Invalid string: must match pattern ${t.pattern}`:`Invalid ${n[t.format]??e.format}`}case`not_multiple_of`:return`Invalid number: must be a multiple of ${e.divisor}`;case`unrecognized_keys`:return`Unrecognized key${e.keys.length>1?`s`:``}: ${Ot(e.keys,`, `)}`;case`invalid_key`:return`Invalid key in ${e.origin}`;case`invalid_union`:return e.options&&Array.isArray(e.options)&&e.options.length>0?`Invalid discriminator value. Expected ${e.options.map(e=>`'${e}'`).join(` | `)}`:e.inclusive===!1?`Invalid input: more than one option matched`:`Invalid input`;case`invalid_element`:return`Invalid value in ${e.origin}`;default:return`Invalid input`}}};function Gi(){return{localeError:Wi()}}var Ki,qi=class{constructor(){this._map=new WeakMap,this._idmap=new Map}add(e,...t){let n=t[0];return this._map.set(e,n),n&&typeof n==`object`&&`id`in n&&this._idmap.set(n.id,e),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(e){let t=this._map.get(e);return t&&typeof t==`object`&&`id`in t&&this._idmap.delete(t.id),this._map.delete(e),this}get(e){let t=e._zod.parent;if(t){let n={...this.get(t)??{}};delete n.id;let r={...n,...this._map.get(e)};return Object.keys(r).length?r:void 0}return this._map.get(e)}has(e){return this._map.has(e)}};function Ji(){return new qi}(Ki=globalThis).__zod_globalRegistry??(Ki.__zod_globalRegistry=Ji());var Yi=globalThis.__zod_globalRegistry;function Xi(e){return e.checks&&=[...e.checks],e}function Zi(e,t){return new e(Xi({type:`number`,checks:[],...Qt(t)}))}function Qi(e,t){return new e({type:`number`,check:`number_format`,abort:!1,format:`safeint`,...Qt(t)})}function $i(e){return new e({type:`unknown`})}function ea(e,t){return new e({type:`never`,...Qt(t)})}function ta(e,t){return new wr({check:`less_than`,...Qt(t),value:e,inclusive:!1})}function na(e,t){return new wr({check:`less_than`,...Qt(t),value:e,inclusive:!0})}function ra(e,t){return new Tr({check:`greater_than`,...Qt(t),value:e,inclusive:!1})}function ia(e,t){return new Tr({check:`greater_than`,...Qt(t),value:e,inclusive:!0})}function aa(e,t){return new Er({check:`multiple_of`,...Qt(t),value:e})}function oa(e,t){return new Or({check:`max_length`,...Qt(t),maximum:e})}function sa(e,t){return new kr({check:`min_length`,...Qt(t),minimum:e})}function ca(e,t){return new Ar({check:`length_equals`,...Qt(t),length:e})}function la(e){return new jr({check:`overwrite`,tx:e})}function ua(e,t,n){return new e({type:`array`,element:t,...Qt(n)})}function da(e,t,n){return new e({type:`custom`,check:`custom`,fn:t,...Qt(n)})}function fa(e,t){let n=pa(t=>(t.addIssue=e=>{if(typeof e==`string`)t.issues.push(wn(e,t.value,n._zod.def));else{let r=e;r.fatal&&(r.continue=!1),r.code??=`custom`,`input`in r||(r.input=t.value),r.inst??=n,r.continue??=!n._zod.def.abort,t.issues.push(wn(r))}},e(t.value,t)),t);return n}function pa(e,t){let n=new xr({check:`custom`,...Qt(t)});return n._zod.check=e,n}function ma(e,...t){for(let n of t)for(let t of Reflect.ownKeys(n))Object.prototype.propertyIsEnumerable.call(n,t)&&Ft(e,t,n[t]);return e}function ha(e){let t=e?.target??`draft-2020-12`;return t===`draft-4`&&(t=`draft-04`),t===`draft-7`&&(t=`draft-07`),{processors:e.processors??{},metadataRegistry:e?.metadata??Yi,target:t,unrepresentable:e?.unrepresentable??`throw`,override:e?.override??(()=>{}),io:e?.io??`output`,counter:0,seen:new Map,sharedDefsExtractedFor:void 0,sharedEmitDoneFor:void 0,cycles:e?.cycles??`ref`,reused:e?.reused??`inline`,intersections:[],deferred:[],external:e?.external??void 0}}function ga(e,t,n,r,i){let a=typeof t.unrepresentable==`function`?t.unrepresentable({zodSchema:e,path:r.path,message:i}):t.unrepresentable;if(a===`any`)return!1;if(a===void 0||a===`throw`)throw Error(i);return Object.assign(n,a),!0}function _a(e,t,n={path:[],schemaPath:[]}){var r;let i=e._zod.def,a=t.seen.get(e);if(a)return a.count++,n.schemaPath.includes(e)&&(a.cycle=n.path),a.schema;let o={schema:{},count:1,cycle:void 0,path:n.path};t.seen.set(e,o),t.sharedDefsExtractedFor=void 0,t.sharedEmitDoneFor=void 0;let s=e._zod.toJSONSchema?.();if(s)o.schema=s;else{let r={...n,schemaPath:[...n.schemaPath,e],path:n.path};if(e._zod.processJSONSchema)e._zod.processJSONSchema(t,o.schema,r);else{let n=o.schema,a=t.processors[i.type];if(!a)throw Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);a(e,t,n,r)}let a=e._zod.parent;a&&(o.ref||=a,_a(a,t,r),t.seen.get(a).isParent=!0)}let c=t.metadataRegistry.get(e);return c&&ma(o.schema,c),t.io===`input`&&Da(e)&&(delete o.schema.examples,delete o.schema.default),t.io===`input`&&`_prefault`in o.schema&&((r=o.schema).default??(r.default=o.schema._prefault)),delete o.schema._prefault,t.seen.get(e).schema}function va(e){return e.replace(/~/g,`~0`).replace(/\//g,`~1`)}function ya(e,t){let n=e.seen.get(t);if(!n)throw Error(`Unprocessed schema. This is a bug in Zod.`);if(e.external&&e.sharedDefsExtractedFor===e.external)return;let r=new Map;for(let t of e.seen.entries()){let n=e.metadataRegistry.get(t[0])?.id;if(n){let e=r.get(n);if(e&&e!==t[0])throw Error(`Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);r.set(n,t[0])}}let i=t=>{let r=e.target===`draft-2020-12`?`$defs`:`definitions`;if(e.external){let n=e.external.registry.get(t[0])?.id,i=e.external.uri??(e=>e);if(n)return{ref:i(n)};let a=t[1].defId??t[1].schema.id??`schema${e.counter++}`;return t[1].defId=a,{defId:a,ref:`${i(`__shared`)}#/${r}/${va(a)}`}}let i=`#/${r}/`;if(t[1]===n&&!t[1].schema.id)return{ref:`#`};let a=t[1].schema.id??`__schema${e.counter++}`;return{defId:a,ref:i+va(a)}},a=e=>{if(e[1].schema.$ref)return;let t=e[1],{ref:n,defId:r}=i(e);t.def={...t.schema},r&&(t.defId=r);let a=t.schema;for(let e in a)delete a[e];a.$ref=n};if(e.cycles===`throw`)for(let t of e.seen.entries()){let e=t[1];if(e.cycle)throw Error(`Cycle detected: #/${e.cycle?.join(`/`)}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`)}for(let n of e.seen.entries()){let r=n[1];if(t===n[0])a(n);else{if(e.external){let r=e.external.registry.get(n[0])?.id;if(t!==n[0]&&r){a(n);continue}}(e.metadataRegistry.get(n[0])?.id||r.cycle||r.count>1&&e.reused===`ref`)&&a(n)}}e.external&&(e.sharedDefsExtractedFor=e.external)}function ba(e){let t=e.anyOf;if(!Array.isArray(t)||t.length===0||e.type!==void 0)return;let n=[];for(let e of t){if(!e||typeof e!=`object`)return;ba(e);let t=Object.keys(e);if(t.length!==1||t[0]!==`type`)return;let r=e.type;for(let e of Array.isArray(r)?r:[r]){if(typeof e!=`string`)return;n.includes(e)||n.push(e)}}delete e.anyOf,e.type=n.length===1?n[0]:n}var xa=new Set([`type`,`properties`,`required`,`additionalProperties`]),Sa=[`oneOf`,`anyOf`];function Ca(e){let t=e.additionalProperties;return t===void 0||t===!1||typeof t!=`object`||!t?null:Object.keys(t).length?t:null}function wa(e){let t=[];for(let n of e){if(typeof n!=`object`||n.type!==`object`)return null;for(let e in n)if(!xa.has(e))return null;t.push(n)}let n={},r=new Set;for(let e of t){for(let r in e.properties){if(Object.prototype.hasOwnProperty.call(n,r))continue;let e=[];for(let n of t){let t=n.properties?.[r]??Ca(n);t!=null&&(e.some(e=>JSON.stringify(e)===JSON.stringify(t))||e.push(t))}Ft(n,r,e.length===1?e[0]:wa(e)??{allOf:e})}for(let t of e.required??[])r.add(t)}let i={type:`object`,properties:n};if(r.size&&(i.required=[...r]),t.every(e=>e.additionalProperties===!1))i.additionalProperties=!1;else{let e=[];for(let n of t){let t=Ca(n);t&&!e.some(e=>JSON.stringify(e)===JSON.stringify(t))&&e.push(t)}e.length===1?i.additionalProperties=e[0]:e.length>1&&(i.additionalProperties={allOf:e})}return i}function Ta(e){let t=e.allOf;if(!Array.isArray(t)||t.length<2)return;for(let t of xa)if(t in e)return;let n=t.filter(e=>Sa.some(t=>Array.isArray(e[t]))),r=null;if(!n.length)r=wa(t);else{let e=n[0],i=Sa.find(t=>Array.isArray(e[t]));if(Object.keys(e).length!==1)return;let a=t.filter(t=>t!==e),o=e[i].map(e=>wa([...a,e]));if(o.some(e=>!e))return;r={[i]:o}}r&&(delete e.allOf,ma(e,r))}function Ea(e,t){let n=e.seen.get(t);if(!n)throw Error(`Unprocessed schema. This is a bug in Zod.`);let r=t=>{let n=e.seen.get(t);if(n.ref===null)return;let i=n.def??n.schema,a={...i},o=n.ref;if(n.ref=null,o){r(o);let n=e.seen.get(o),s=n.schema;if(s.$ref&&(e.target===`draft-07`||e.target===`draft-04`||e.target===`openapi-3.0`)?(i.allOf=i.allOf??[],i.allOf.push(s)):ma(i,s),ma(i,a),t._zod.parent===o)for(let e in i)e!==`$ref`&&e!==`allOf`&&(e in a||delete i[e]);if(s.$ref&&n.def)for(let e in i)e!==`$ref`&&e!==`allOf`&&e in n.def&&JSON.stringify(i[e])===JSON.stringify(n.def[e])&&delete i[e]}let s=t._zod.parent;if(s&&s!==o){r(s);let t=e.seen.get(s);if(t?.schema.$ref&&(i.$ref=t.schema.$ref,t.def))for(let e in i)e!==`$ref`&&e!==`allOf`&&e in t.def&&JSON.stringify(i[e])===JSON.stringify(t.def[e])&&delete i[e]}e.override({zodSchema:t,jsonSchema:i,path:n.path??[]})};if(!e.external||e.sharedEmitDoneFor!==e.external){for(let t of[...e.seen.entries()].reverse())r(t[0]);if(e.target!==`openapi-3.0`)for(let t of e.seen.entries())ba(t[1].def??t[1].schema);for(let t of e.deferred)t();if(e.intersections.length){let t=new Map;for(let n of e.seen.values())for(let e of[n.schema,n.def]){let n=e?.allOf;if(!Array.isArray(n))continue;let r=t.get(n);r?r.push(e):t.set(n,[e])}for(let n of e.intersections)for(let e of t.get(n)??[])Ta(e)}}let i={};if(e.target===`draft-2020-12`?i.$schema=`https://json-schema.org/draft/2020-12/schema`:e.target===`draft-07`?i.$schema=`http://json-schema.org/draft-07/schema#`:e.target===`draft-04`?i.$schema=`http://json-schema.org/draft-04/schema#`:e.target,e.external?.uri){let n=e.external.registry.get(t)?.id;if(!n)throw Error("Schema is missing an `id` property");i.$id=e.external.uri(n)}ma(i,n.defId?n.schema:n.def??n.schema);let a=e.metadataRegistry.get(t)?.id;a!==void 0&&i.id===a&&delete i.id;let o=e.external?.defs??{};if(!e.external||e.sharedEmitDoneFor!==e.external)for(let t of e.seen.entries()){let e=t[1];e.def&&e.defId&&(e.def.id===e.defId&&delete e.def.id,Ft(o,e.defId,e.def))}e.external&&(e.sharedEmitDoneFor=e.external),e.external||Object.keys(o).length>0&&(e.target===`draft-2020-12`?i.$defs=o:i.definitions=o);try{let n=JSON.parse(JSON.stringify(i));return Object.defineProperty(n,"~standard",{value:{...t[`~standard`],jsonSchema:{input:ka(t,`input`,e.processors),output:ka(t,`output`,e.processors)}},enumerable:!1,writable:!1}),n}catch{throw Error(`Error converting schema to JSON.`)}}function Da(e,t){let n=t??{seen:new Set};if(n.seen.has(e))return!1;n.seen.add(e);let r=e._zod.def;if(r.type===`transform`)return!0;if(r.type===`array`)return Da(r.element,n);if(r.type===`set`)return Da(r.valueType,n);if(r.type===`lazy`)return Da(r.getter(),n);if(r.type===`promise`||r.type===`optional`||r.type===`nonoptional`||r.type===`nullable`||r.type===`readonly`||r.type==="default"||r.type===`prefault`||r.type===`catch`)return Da(r.innerType,n);if(r.type===`intersection`)return Da(r.left,n)||Da(r.right,n);if(r.type===`record`||r.type===`map`)return Da(r.keyType,n)||Da(r.valueType,n);if(r.type===`pipe`)return e._zod.traits.has(`$ZodCodec`)?!0:Da(r.in,n)||Da(r.out,n);if(r.type===`object`){for(let e in r.shape)if(Da(r.shape[e],n))return!0;return!1}if(r.type===`union`){for(let e of r.options)if(Da(e,n))return!0;return!1}if(r.type===`tuple`){for(let e of r.items)if(Da(e,n))return!0;return!!(r.rest&&Da(r.rest,n))}return!1}var Oa=(e,t={})=>n=>{let r=ha({...n,processors:t});return _a(e,r),ya(r,e),Ea(r,e)},ka=(e,t,n={})=>r=>{let{libraryOptions:i,target:a}=r??{},o=ha({...i??{},target:a,io:t,processors:n});return _a(e,o),ya(o,e),Ea(o,e)},Aa=(e,t,n)=>{(e[t]===void 0||n>e[t])&&(e[t]=n)},ja=(e,t,n)=>{(e[t]===void 0||n<e[t])&&(e[t]=n)},Ma=(e,t)=>{Aa(e,`minimum`,t),ja(e,`maximum`,t)},Na=(e,t)=>{e.multipleOf??=[],e.multipleOf.includes(t)||e.multipleOf.push(t)},Pa=(e,t)=>{e.patterns??=new Set,e.patterns.add(t)},Fa=(e,t)=>{e.mime=e.mime?e.mime.filter(e=>t.includes(e)):[...t]},Ia=(e,t)=>{e.format=t,t.includes(`int`)&&(e.isInt=!0)},La=(e,t)=>Aa(e,`minimum`,t.minimum),Ra=(e,t)=>ja(e,`maximum`,t.maximum),za=e=>(t,n)=>{Ia(t,n.format);let[r,i]=e[n.format];Aa(t,`minimum`,r),ja(t,`maximum`,i)},Ba={greater_than:(e,t)=>Aa(e,t.inclusive?`minimum`:`exclusiveMinimum`,t.value),less_than:(e,t)=>ja(e,t.inclusive?`maximum`:`exclusiveMaximum`,t.value),multiple_of:(e,t)=>Na(e,t.value),number_format:za(tn),bigint_format:za(nn),min_length:La,max_length:Ra,length_equals:(e,t)=>Ma(e,t.length),min_size:La,max_size:Ra,size_equals:(e,t)=>Ma(e,t.size),string_format:(e,t)=>{Ia(e,t.format),t.pattern&&Pa(e,t.pattern),(t.format===`base64`||t.format===`base64url`)&&(e.contentEncoding=t.format),(t.local||t.precision===-1)&&(e.laxFormat=!0)},mime_type:(e,t)=>Fa(e,t.mime)};function Va(e){let t={},n=e._zod.def,r=e._zod.traits.has(`$ZodCheck`)?[e,...n.checks??[]]:n.checks??[];for(let e of r)Ba[e._zod.def.check]?.(t,e._zod.def);let i=e._zod.bag;i.minimum!==void 0&&Aa(t,`minimum`,i.minimum),i.exclusiveMinimum!==void 0&&Aa(t,`exclusiveMinimum`,i.exclusiveMinimum),i.maximum!==void 0&&ja(t,`maximum`,i.maximum),i.exclusiveMaximum!==void 0&&ja(t,`exclusiveMaximum`,i.exclusiveMaximum),i.multipleOf!==void 0&&Na(t,i.multipleOf),i.format!==void 0&&(t.format??=i.format,i.format.includes(`int`)&&(t.isInt=!0)),i.mime&&Fa(t,i.mime);for(let e of i.patterns??[])Pa(t,e);return t}var Ha=(e,t,n,r)=>{let i=n,{minimum:a,maximum:o,multipleOf:s,exclusiveMaximum:c,exclusiveMinimum:l,isInt:u}=Va(e);i.type=u?`integer`:`number`;let d=typeof l==`number`&&l>=(a??-1/0),f=typeof c==`number`&&c<=(o??1/0),p=t.target===`draft-04`||t.target===`openapi-3.0`;if(d?p?(i.minimum=l,i.exclusiveMinimum=!0):i.exclusiveMinimum=l:typeof a==`number`&&(i.minimum=a),f?p?(i.maximum=c,i.exclusiveMaximum=!0):i.exclusiveMaximum=c:typeof o==`number`&&(i.maximum=o),s){let n=new Set;for(let a of s)Number.isFinite(a)&&a!==0?n.add(Math.abs(a)):ga(e,t,i,r,`A multipleOf divisor of ${a} cannot be represented in JSON Schema`);let[a,...o]=n;a!==void 0&&(i.multipleOf=a),o.length&&(i.allOf=[...i.allOf??[],...o.map(e=>({multipleOf:e}))])}},Ua=(e,t,n,r)=>{n.not={}},Wa=(e,t,n,r)=>{let i=e._zod.def,a=Dt(i.entries);a.length===0?n.not={}:(a.every(e=>typeof e==`number`)&&(n.type=`number`),a.every(e=>typeof e==`string`)&&(n.type=`string`),n.enum=a)},Ga=(e,t,n,r)=>{let i=e._zod.def;if(i.values.length===0){n.not={};return}let a=[];for(let o of i.values)if(o===void 0){if(ga(e,t,n,r,"Literal `undefined` cannot be represented in JSON Schema"))return}else if(typeof o==`bigint`){if(ga(e,t,n,r,`BigInt literals cannot be represented in JSON Schema`))return;a.push(Number(o))}else a.push(o);if(a.length!==0){if(a.length===1){let e=a[0];n.type=e===null?`null`:typeof e,t.target===`draft-04`||t.target===`openapi-3.0`?n.enum=[e]:n.const=e}else a.every(e=>typeof e==`number`)&&(n.type=`number`),a.every(e=>typeof e==`string`)&&(n.type=`string`),a.every(e=>typeof e==`boolean`)&&(n.type=`boolean`),a.every(e=>e===null)&&(n.type=`null`),n.enum=a}},Ka=(e,t,n,r)=>{ga(e,t,n,r,`Custom types cannot be represented in JSON Schema`)},qa=(e,t,n,r)=>{ga(e,t,n,r,`Transforms cannot be represented in JSON Schema`)},Ja=(e,t,n,r)=>{let i=n,a=e._zod.def,{minimum:o,maximum:s}=Va(e);typeof o==`number`&&(i.minItems=o),typeof s==`number`&&(i.maxItems=s),i.type=`array`,i.items=_a(a.element,t,{...r,path:[...r.path,`items`]})};function Ya(e){let t=e._zod.def;return t.type===`pipe`&&t.in._zod.traits.has(`$ZodTransform`)?Ya(t.out):t.type===`catch`?Ya(t.innerType):e._zod.optin}var Xa=(e,t,n,r)=>{let i=n,a=e._zod.def,o=a.shape;if(Object.getOwnPropertySymbols(o).length&&ga(e,t,i,r,`Symbol keys cannot be represented in JSON Schema`))return;i.type=`object`,i.properties={};for(let e in o)Ft(i.properties,e,_a(o[e],t,{...r,path:[...r.path,`properties`,e]}));let s=[];for(let e of Object.keys(o)){let n=a.shape[e];(t.io===`input`?Ya(n)===void 0:n._zod.optout===void 0)&&s.push(e)}s.length>0&&(i.required=s),a.catchall?._zod.def.type===`never`?i.additionalProperties=!1:a.catchall?a.catchall&&(i.additionalProperties=_a(a.catchall,t,{...r,path:[...r.path,`additionalProperties`]})):t.io===`output`&&(i.additionalProperties=!1)},Za=(e,t,n,r)=>{let i=e._zod.def,a=i.inclusive===!1,o=i.options.map((e,n)=>_a(e,t,{...r,path:[...r.path,a?`oneOf`:`anyOf`,n]}));a?n.oneOf=o:n.anyOf=o},Qa=(e,t,n,r)=>{let i=e._zod.def,a=_a(i.left,t,{...r,path:[...r.path,`allOf`,0]}),o=_a(i.right,t,{...r,path:[...r.path,`allOf`,1]}),s=e=>`allOf`in e&&Object.keys(e).length===1,c=[...s(a)?a.allOf:[a],...s(o)?o.allOf:[o]];n.allOf=c,t.intersections.push(c)},$a=(e,t,n,r)=>{let i=n,a=e._zod.def;i.type=`array`;let o=t.target===`draft-2020-12`?`prefixItems`:`items`,s=t.target===`draft-2020-12`||t.target===`openapi-3.0`?`items`:`additionalItems`,c=a.items.map((e,n)=>_a(e,t,{...r,path:[...r.path,o,n]})),l=a.rest?_a(a.rest,t,{...r,path:[...r.path,s,...t.target===`openapi-3.0`?[a.items.length]:[]]}):null,u=a.items.length;for(;u>0;){let e=a.items[u-1];if(!(t.io===`input`?Ya(e)!==void 0:e._zod.optout===`optional`))break;u--}let d=a.items.length,f=!a.rest;t.target===`draft-2020-12`?(i.prefixItems=c,f?i.items=!1:l&&(i.items=l),u>0&&(i.minItems=u),f&&(i.maxItems=d)):t.target===`openapi-3.0`?(i.items={anyOf:c},l&&i.items.anyOf.push(l),u>0&&(i.minItems=u),f&&(i.maxItems=d)):(i.items=c,f?i.additionalItems=!1:l&&(i.additionalItems=l),u>0&&(i.minItems=u),f&&(i.maxItems=d));let{minimum:p,maximum:m}=Va(e);typeof p==`number`&&(i.minItems=p),typeof m==`number`&&(i.maxItems=m)},eo=(e,t,n,r)=>{let i=e._zod.def,a=_a(i.innerType,t,r),o=t.seen.get(e);t.target===`openapi-3.0`?(o.ref=i.innerType,n.nullable=!0):n.anyOf=[a,{type:`null`}]},to=(e,t,n,r)=>{let i=e._zod.def;_a(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType},no=Symbol();function ro(e,t,n,r,i){let a=!1,o=JSON.stringify(e,(e,t)=>typeof t==`bigint`?(a=!0,null):t);return a?(ga(t,n,r,i,`BigInt defaults cannot be represented in JSON Schema`),no):JSON.parse(o)}var io=(e,t,n,r)=>{let i=e._zod.def;_a(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType;let o=ro(i.defaultValue,e,t,n,r);o!==no&&(n.default=o)},ao=(e,t,n,r)=>{let i=e._zod.def;_a(i.innerType,t,r);let a=t.seen.get(e);if(a.ref=i.innerType,t.io!==`input`)return;let o=ro(i.defaultValue,e,t,n,r);o!==no&&(n._prefault=o)},oo=(e,t,n,r)=>{let i=e._zod.def;_a(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType;let o;try{o=i.catchValue(void 0)}catch{ga(e,t,n,r,`Dynamic catch values are not supported in JSON Schema`);return}n.default=o},so=(e,t,n,r)=>{let i=e._zod.def,a=i.in._zod.traits.has(`$ZodTransform`),o=t.io===`input`?a?i.out:i.in:i.out;_a(o,t,r);let s=t.seen.get(e);s.ref=o},co=(e,t,n,r)=>{let i=e._zod.def;_a(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType,n.readOnly=!0},lo=(e,t,n,r)=>{let i=e._zod.def;_a(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType},uo=new WeakSet([Object.prototype,Error.prototype]);function fo(e,t,n){Object.defineProperty(e,t,{configurable:!0,enumerable:!1,get(){let e=n(this);return Object.defineProperty(this,t,{value:e,configurable:!0,writable:!0}),e},set(e){Object.defineProperty(this,t,{value:e,configurable:!0,writable:!0})}})}var po=H(`ZodError`,(e,t)=>{Zn.init(e,t),e.name=`ZodError`;let n=Object.getPrototypeOf(e);uo.has(n)||(uo.add(n),fo(n,`format`,e=>t=>er(e,t)),fo(n,`flatten`,e=>t=>$n(e,t)),fo(n,`addIssue`,e=>t=>{e.issues.push(t),e.message=JSON.stringify(e.issues,kt,2)}),fo(n,`addIssues`,e=>t=>{e.issues.push(...t),e.message=JSON.stringify(e.issues,kt,2)}),Object.defineProperty(n,"isEmpty",{configurable:!0,enumerable:!1,get(){return this.issues.length===0}}))},void 0,{Parent:Error}),mo=nr(po),ho=rr(po),go=ir(po),_o=or(po),vo=fr(po),yo=pr(po),bo=mr(po),xo=hr(po),So=gr(po),Co=_r(po),wo=vr(po),To=yr(po);function Eo(){Wn.localeError||Gn(Gi())}function Do(){Wn.memoizer||Gn({memoizer:Hi()})}var Oo=H(`ZodType`,(e,t)=>(Eo(),Pr.init(e,t),e.def=t,e.type=t.type,e),{check(...e){let t=this.def;return this.clone(Ht(t,{checks:[...t.checks??[],...e.map(e=>typeof e==`function`?{_zod:{check:e,def:{check:`custom`},onattach:[]}}:e)]}),{parent:!0})},with(...e){return this.check(...e)},clone(e,t){return Zt(this,e,t)},brand(){return this},register(e,t){return e.add(this,t),this},refine(e,t){return this.check(vs(e,t))},superRefine(e,t){return this.check(ys(e,t))},overwrite(e){return this.check(la(e))},optional(){return es(this)},exactOptional(){return ns(this)},nullable(){return is(this)},nullish(){return es(is(this))},nonoptional(e){return us(this,e)},array(){return Ro(this)},or(e){return Ho([this,e])},and(e){return Wo(this,e)},transform(e){return ms(this,Qo(e))},default(e){return os(this,e)},prefault(e){return cs(this,e)},catch(e){return fs(this,e)},pipe(e){return ms(this,e)},readonly(){return gs(this)},describe(e){let t=this.clone();return Yi.add(t,{description:e}),t},meta(...e){if(e.length===0)return Yi.get(this);let t=this.clone();return Yi.add(t,e[0]),t},isOptional(){return this.safeParse(void 0).success},isNullable(){return this.safeParse(null).success},apply(e,...t){return t.length===0?e(this):e(this,...t)},get"~standard"(){return Dn(this,`~standard`,{...Lr(this),jsonSchema:{input:ka(this,`input`),output:ka(this,`output`)}})},set"~standard"(e){En(this,`~standard`,e)},parse:function e(t,n){return mo(this,t,n,{callee:e})},parseAsync:async function e(t,n){return await ho(this,t,n,{callee:e})},safeParse(e,t){return go(this,e,t)},async safeParseAsync(e,t){return _o(this,e,t)},get spa(){return this?.safeParseAsync},set spa(e){En(this,`spa`,e)},validate(e,t){return lr(this,e,t)},validateAsync(e,t){return dr(this,e,t)},encode:function e(t,n){return vo(this,t,n,{callee:e})},decode:function e(t,n){return yo(this,t,n,{callee:e})},encodeAsync:async function e(t,n){return await bo(this,t,n,{callee:e})},decodeAsync:async function e(t,n){return await xo(this,t,n,{callee:e})},safeEncode(e,t){return So(this,e,t)},safeDecode(e,t){return Co(this,e,t)},async safeEncodeAsync(e,t){return wo(this,e,t)},async safeDecodeAsync(e,t){return To(this,e,t)},toJSONSchema(e){return Oa(this,{})(e)},get description(){return Yi.get(this)?.description},get _def(){return this._zod.def}}),ko=H(`ZodNumber`,(e,t)=>{Rr.init(e,t),Oo.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Ha(e,t,n,r),e.isFinite=!0},On({minValue:e=>{let{minimum:t,exclusiveMinimum:n}=Va(e);return Math.max(t??-1/0,n??-1/0)},maxValue:e=>{let{maximum:t,exclusiveMaximum:n}=Va(e);return Math.min(t??1/0,n??1/0)},isInt:e=>{let{isInt:t,multipleOf:n}=Va(e);return!!t||!!n?.some(Number.isSafeInteger)},format:e=>Va(e).format??null},{gt(e,t){return this.check(ra(e,t))},gte(e,t){return this.check(ia(e,t))},min(e,t){return this.check(ia(e,t))},lt(e,t){return this.check(ta(e,t))},lte(e,t){return this.check(na(e,t))},max(e,t){return this.check(na(e,t))},int(e){return this.check(Mo(e))},safe(e){return this.check(Mo(e))},positive(e){return this.check(ra(0,e))},nonnegative(e){return this.check(ia(0,e))},negative(e){return this.check(ta(0,e))},nonpositive(e){return this.check(na(0,e))},multipleOf(e,t){return this.check(aa(e,t))},step(e,t){return this.check(aa(e,t))},finite(){return this}}));function Ao(e){return Zi(ko,e)}var jo=H(`ZodNumberFormat`,(e,t)=>{zr.init(e,t),ko.init(e,t)});function Mo(e){return Qi(jo,e)}var No=H(`ZodUnknown`,(e,t)=>{Br.init(e,t),Oo.init(e,t),e._zod.processJSONSchema=(e,t,n)=>void 0});function Po(){return $i(No)}var Fo=H(`ZodNever`,(e,t)=>{Vr.init(e,t),Oo.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Ua(e,t,n,r)});function Io(e){return ea(Fo,e)}var Lo=H(`ZodArray`,(e,t)=>{Do(),Gr.init(e,t),Oo.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Ja(e,t,n,r),e.element=t.element},{min(e,t){return this.check(sa(e,t))},nonempty(e){return this.check(sa(1,e))},max(e,t){return this.check(oa(e,t))},length(e,t){return this.check(ca(e,t))},unwrap(){return this.element}});function Ro(e,t){return ua(Lo,e,t)}var zo=H(`ZodObject`,(e,t)=>{Do(),Zr.init(e,t),Oo.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Xa(e,t,n,r),Fn(e,`shape`,e=>e._zod.def.shape,!1)},{keyof(){return Jo(Object.keys(this._zod.def.shape))},catchall(e){return this.clone(Ht(this._zod.def,{catchall:e}))},passthrough(){return this.clone(Ht(this._zod.def,{catchall:Po()}))},loose(){return this.clone(Ht(this._zod.def,{catchall:Po()}))},strict(){return this.clone(Ht(this._zod.def,{catchall:Io()}))},strip(){return this.clone(Ht(this._zod.def,{catchall:void 0}))},extend(e){return sn(this,e)},safeExtend(e){return ln(this,e)},merge(e){return un(this,e)},pick(e){return rn(this,e)},omit(e){return on(this,e)},partial(...e){return dn($o,this,e[0])},exactPartial(...e){return dn(ts,this,e[0],`exactPartial`)},required(...e){return fn(ls,this,e[0])}});function Bo(e,t){return new zo({type:`object`,shape:e??{},...Qt(t)})}var Vo=H(`ZodUnion`,(e,t)=>{$r.init(e,t),Oo.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Za(e,t,n,r),e.options=t.options});function Ho(e,t){return new Vo({type:`union`,options:e,...Qt(t)})}var Uo=H(`ZodIntersection`,(e,t)=>{ei.init(e,t),Oo.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Qa(e,t,n,r)});function Wo(e,t){return new Uo({type:`intersection`,left:e,right:t})}var Go=H(`ZodTuple`,(e,t)=>{Do(),ri.init(e,t),Oo.init(e,t),e._zod.processJSONSchema=(t,n,r)=>$a(e,t,n,r)},{rest(e){return this.clone({...this._zod.def,rest:e})},partial(){let e=this._zod.def;if(e.checks?.length)throw Error(`.partial() cannot be used on tuple schemas containing refinements`);return this.clone({...e,items:e.items.map(e=>new $o({type:`optional`,innerType:e}))})}});function Ko(e,t,n){let r=t instanceof Pr;return new Go({type:`tuple`,items:e,rest:r?t:null,...Qt(r?n:t)})}var qo=H(`ZodEnum`,(e,t)=>{si.init(e,t),Oo.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Wa(e,t,n,r),e.enum=t.entries,e.options=[...e._zod.values];let n=new Set(Object.keys(t.entries));e.extract=(e,r)=>{let i={};for(let r of e)if(n.has(r))i[r]=t.entries[r];else throw Error(`Key ${r} not found in enum`);return new qo({...t,checks:[],...Qt(r),entries:i})},e.exclude=(e,r)=>{let i={...t.entries};for(let t of e)if(n.has(t))delete i[t];else throw Error(`Key ${t} not found in enum`);return new qo({...t,checks:[],...Qt(r),entries:i})}});function Jo(e,t){return new qo({type:`enum`,entries:Array.isArray(e)?Object.fromEntries(e.map(e=>[e,e])):e,...Qt(t)})}var Yo=H(`ZodLiteral`,(e,t)=>{ci.init(e,t),Oo.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Ga(e,t,n,r),e.values=new Set(t.values),Object.defineProperty(e,"value",{get(){if(t.values.length>1)throw Error("This schema contains multiple valid literal values. Use `.values` instead.");return t.values[0]}})});function Xo(e,t){return new Yo({type:`literal`,values:Array.isArray(e)?e:[e],...Qt(t)})}var Zo=H(`ZodTransform`,(e,t)=>{Do(),li.init(e,t),Oo.init(e,t),e._zod.processJSONSchema=(t,n,r)=>qa(e,t,n,r),e._zod.parse=(n,r)=>{if(r.direction===`backward`)throw new Un(e.constructor.name);n.addIssue=r=>{if(typeof r==`string`)n.issues.push(wn(r,n.value,t));else{let t=r;t.fatal&&(t.continue=!1),t.code??=`custom`,`input`in t||(t.input=n.value),t.inst??=e,n.issues.push(wn(t))}};let i=t.transform(n.value,n);return i instanceof Promise?i.then(e=>(n.value=e,n)):(n.value=i,n)}});function Qo(e){return new Zo({type:`transform`,transform:e})}var $o=H(`ZodOptional`,(e,t)=>{di.init(e,t),Oo.init(e,t),e._zod.processJSONSchema=(t,n,r)=>lo(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function es(e){return new $o({type:`optional`,innerType:e})}var ts=H(`ZodExactOptional`,(e,t)=>{fi.init(e,t),Oo.init(e,t),e._zod.processJSONSchema=(t,n,r)=>lo(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function ns(e){return new ts({type:`optional`,innerType:e})}var rs=H(`ZodNullable`,(e,t)=>{pi.init(e,t),Oo.init(e,t),e._zod.processJSONSchema=(t,n,r)=>eo(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function is(e){return new rs({type:`nullable`,innerType:e})}var as=H(`ZodDefault`,(e,t)=>{mi.init(e,t),Oo.init(e,t),e._zod.processJSONSchema=(t,n,r)=>io(e,t,n,r),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});function os(e,t){return new as({type:`default`,innerType:e,get defaultValue(){return typeof t==`function`?t():Jt(t)}})}var ss=H(`ZodPrefault`,(e,t)=>{gi.init(e,t),Oo.init(e,t),e._zod.processJSONSchema=(t,n,r)=>ao(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function cs(e,t){return new ss({type:`prefault`,innerType:e,get defaultValue(){return typeof t==`function`?t():Jt(t)}})}var ls=H(`ZodNonOptional`,(e,t)=>{_i.init(e,t),Oo.init(e,t),e._zod.processJSONSchema=(t,n,r)=>to(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function us(e,t){return new ls({type:`nonoptional`,innerType:e,...Qt(t)})}var ds=H(`ZodCatch`,(e,t)=>{bi.init(e,t),Oo.init(e,t),e._zod.processJSONSchema=(t,n,r)=>oo(e,t,n,r),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});function fs(e,t){return new ds({type:`catch`,innerType:e,catchValue:typeof t==`function`?t:Ln(t)})}var ps=H(`ZodPipe`,(e,t)=>{xi.init(e,t),Oo.init(e,t),e._zod.processJSONSchema=(t,n,r)=>so(e,t,n,r),e.in=t.in,e.out=t.out});function ms(e,t){return new ps({type:`pipe`,in:e,out:t})}var hs=H(`ZodReadonly`,(e,t)=>{Ci.init(e,t),Oo.init(e,t),e._zod.processJSONSchema=(t,n,r)=>co(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function gs(e){return new hs({type:`readonly`,innerType:e})}var _s=H(`ZodCustom`,(e,t)=>{Ti.init(e,t),Oo.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Ka(e,t,n,r)});function vs(e,t={}){return da(_s,e,t)}function ys(e,t){return fa(e,t)}var bs=class{aabb;slopeAxis;rise;slip;roofId;constructor(e,t,n,r,i){this.aabb=e,this.slopeAxis=t,this.rise=n,this.slip=r,this.roofId=i}},xs=class{aabb;ridgeAxis;rampA;rampB;constructor(e,t,n,r){this.aabb=e,this.ridgeAxis=t,this.rampA=n,this.rampB=r}},Ss=class{id;px;py;pz;constructor(e,t,n,r){this.id=e,this.px=t,this.py=n,this.pz=r}},Cs=class{zone;anchorId;constructor(e,t){this.zone=e,this.anchorId=t}},ws=class{solids;ramps;roofs;anchors;spawn;spawnYaw;killPlaneY;goal;pads;route;style;lineOnly;climb;lines;tramps;cushions;hazards;constructor(){this.solids=[],this.ramps=[],this.roofs=[],this.anchors=[],this.spawn=new f(0,0,0),this.spawnYaw=0,this.killPlaneY=0,this.goal=new r(new f(0,0,0),new f(0,0,0)),this.pads=[],this.route=[],this.style=[],this.lineOnly=0,this.climb=0,this.lines=[],this.tramps=[],this.cushions=[],this.hazards=[]}};function Ts(e,t,n){return e.lines.push(new Cs(t,n)),e.lines.length-1}function Es(e,t){return e.solids.push(t),e.solids.length-1}function Ds(e,t,n,r){return e.ramps.push(new bs(t,n,r,0,-1)),e.ramps.length-1}function Os(e,t,n){let i=e.roofs.length,a=t.max.y-t.min.y,o=t.min,s=t.max,c,l,u,d;if(n===1){let e=(o.x+s.x)*.5;c=new r(new f(o.x,o.y,o.z),new f(e,s.y,s.z)),l=new r(new f(e,o.y,o.z),new f(s.x,s.y,s.z)),u=0,d=1}else{let e=(o.z+s.z)*.5;c=new r(new f(o.x,o.y,o.z),new f(s.x,s.y,e)),l=new r(new f(o.x,o.y,e),new f(s.x,s.y,s.z)),u=2,d=3}e.ramps.push(new bs(c,u,a,1,i));let p=e.ramps.length-1;e.ramps.push(new bs(l,d,a,1,i));let m=e.ramps.length-1;return e.roofs.push(new xs(t,n,p,m)),i}function ks(e,t,n,r){let i=e.anchors.length;return e.anchors.push(new Ss(i,t,n,r)),i}var As=Ko([Ao(),Ao(),Ao()]);function js(e){return e.min[0]<=e.max[0]&&e.min[1]<=e.max[1]&&e.min[2]<=e.max[2]}var Ms=Bo({min:As,max:As}).refine(js,{message:`min must be <= max on every axis`}),Ns=Bo({min:As,max:As,slopeAxis:Ao().int().min(0).max(3),rise:Ao()}).refine(js,{message:`min must be <= max on every axis`}).refine(e=>e.rise>0,{message:`rise must be > 0`}),Ps=Bo({min:As,max:As,ridge:Ao().int().min(0).max(1)}).refine(js,{message:`min must be <= max on every axis`}).refine(e=>e.max[1]>e.min[1],{message:`ridge must be above the eave`}).refine(e=>e.max[0]>e.min[0]&&e.max[2]>e.min[2],{message:`footprint must have area`}),Fs=Bo({pos:As}),Is=Bo({zone:Ms,anchor:Ao().int().min(0)}),Ls=Ao().int().min(0).max(1),Rs=Bo({version:Xo(1),spawn:As,spawnYaw:Ao(),killPlaneY:Ao(),solids:Ro(Ms),ramps:Ro(Ns),roofs:Ro(Ps).optional(),anchors:Ro(Fs),goal:Ms.optional(),pads:Ro(Ms).optional(),route:Ro(Ao().int()).optional(),style:Ro(Ao().int()).optional(),lineOnly:Ls.optional(),climb:Ls.optional(),lines:Ro(Is).optional(),tramps:Ro(Ms).optional(),cushions:Ro(Ms).optional(),hazards:Ro(Ms).optional()}).refine(e=>e.lines===void 0||e.lines.every(t=>t.anchor<e.anchors.length),{message:`lines: anchor id out of range`});function zs(e){let t=[];for(let n of e.issues){let e=`(root)`;n.path.length>0&&(e=n.path.join(`.`)),t.push(e+`: `+n.message)}return`invalid test world: `+t.join(`; `)}function Bs(e){return new f(e[0],e[1],e[2])}function Vs(e){let t;try{t=JSON.parse(e)}catch(e){let t=e instanceof Error?e.message:String(e);throw Error(`invalid JSON: `+t,{cause:e})}return Hs(t)}function Hs(e){let t=Rs.safeParse(e);if(!t.success)throw Error(zs(t.error));let n=t.data,i=new ws;i.spawn=Bs(n.spawn),i.spawnYaw=n.spawnYaw,i.killPlaneY=n.killPlaneY;for(let e=0;e<n.solids.length;e++){let t=n.solids[e];Es(i,new r(Bs(t.min),Bs(t.max)))}for(let e=0;e<n.ramps.length;e++){let t=n.ramps[e];Ds(i,new r(Bs(t.min),Bs(t.max)),t.slopeAxis,t.rise)}if(n.roofs!==void 0)for(let e=0;e<n.roofs.length;e++){let t=n.roofs[e];Os(i,new r(Bs(t.min),Bs(t.max)),t.ridge)}for(let e=0;e<n.anchors.length;e++){let t=n.anchors[e];ks(i,t.pos[0],t.pos[1],t.pos[2])}if(n.goal!==void 0&&(i.goal=new r(Bs(n.goal.min),Bs(n.goal.max))),n.pads!==void 0)for(let e=0;e<n.pads.length;e++){let t=n.pads[e];i.pads.push(new r(Bs(t.min),Bs(t.max)))}if(n.route!==void 0)for(let e=0;e<n.route.length;e++)i.route.push(n.route[e]);if(n.style!==void 0)for(let e=0;e<n.style.length;e++)i.style.push(n.style[e]);if(n.lineOnly!==void 0&&(i.lineOnly=n.lineOnly),n.climb!==void 0&&(i.climb=n.climb),n.lines!==void 0)for(let e=0;e<n.lines.length;e++){let t=n.lines[e];Ts(i,new r(Bs(t.zone.min),Bs(t.zone.max)),t.anchor)}return Us(i.tramps,n.tramps),Us(i.cushions,n.cushions),Us(i.hazards,n.hazards),i}function Us(e,t){if(t!==void 0)for(let n=0;n<t.length;n++)e.push(new r(Bs(t[n].min),Bs(t[n].max)))}var Ws=[`jump`,`tramp`,`zip`,`climb`,`grab`,`tight`],Gs=1.5,Ks=2.6,qs=2.5,Js=.9,Ys=.3,Xs=.4,Zs=1.2,Qs=.3,$s=.5,ec=.15,tc=1.5,nc=.5,rc=.3,ic=n,ac=ic.physics.g,oc=ic.physics.airDrag,sc=ic.hero.radius;function cc(e,t,n){let r=e*e-2*ac*n;if(r<0)return null;let i=(e+Math.sqrt(r))/ac;return{dist:t*(1-Math.exp(-oc*i))/oc,vLand:Math.sqrt(r)}}function lc(e,t,n,r){return Math.min(t,r)-Math.max(e,n)}function uc(e,t){if(t.z1<=e.z0&&lc(e.x0,e.x1,t.x0,t.x1)>=Zs)return{gap:e.z0-t.z1,downhill:!0,lateral:!1};if(t.z0>=e.z1&&lc(e.x0,e.x1,t.x0,t.x1)>=Zs)return{gap:t.z0-e.z1,downhill:!1,lateral:!1};if(lc(e.z0,e.z1,t.z0,t.z1)>=Zs){if(t.x0>=e.x1)return{gap:t.x0-e.x1,downhill:!1,lateral:!0};if(t.x1<=e.x0)return{gap:e.x0-t.x1,downhill:!1,lateral:!0}}return null}var dc=[[0,ic.hero.walk],[0,ic.hero.run],[ic.hero.jump,ic.hero.run]];function fc(e,t,n){let r=t.y-e.y;if(r>Qs)return!1;let i=n.gap+2*sc+Ys;for(let e=0;e<dc.length;e++){let n=cc(dc[e][0],dc[e][1],r);if(!(n===null||n.dist<i))return t.cushion||n.vLand<=ic.landing.vyRoll-Xs}return!1}function pc(e,t){for(let n=0;n<e.tramps.length;n++){let r=e.tramps[n];if(r-1.5>=t.x0-$s&&r+1.5<=t.x1+$s)return!0}return!1}function mc(e,t,n){if(!n.downhill||!pc(e,t))return!1;let r=t.y-e.y,i=ic.tramp.vUp;if(r>i*i/(2*ac)-Qs)return!1;let a=cc(i,ic.hero.run*Js,r);if(a===null)return!1;let o=n.gap+3/2;return a.dist<o+sc+Ys||t.kind!==1&&a.dist>o+(t.z1-t.z0)-sc?!1:t.cushion||a.vLand<=ic.landing.vyRoll-Xs}function hc(e,t,n){let r=Math.max(0,n)*oc/t;if(r>=1)return null;let i=-Math.log(1-r)/oc;return[e*i-.5*ac*i*i,e-ac*i]}function gc(e,t,n,r){let i=hc(e,t,n);if(i===null)return!1;let a=r-i[0];return a<=0||a>ic.climb.reachMax-ec?!1:i[1]>=-(ic.climb.vyMax-tc)}function _c(e,t,n,r,i){let a=cc(e,t,i);if(a===null||a.dist<n)return!1;let o=hc(e,t,n-sc);return o===null||o[0]<i||r.kind!==1&&a.dist>n+(r.z1-r.z0)-sc?!1:r.cushion||a.vLand<=ic.landing.vyRoll}function vc(e,t,n){let r=t.y-e.y;for(let e=0;e<dc.length;e++)if(_c(dc[e][0],dc[e][1],n.gap,t,r))return!0;return n.downhill&&pc(e,t)?_c(ic.tramp.vUp,ic.hero.run*Js,n.gap+3/2,t,r):!1}function yc(e,t,n){if(t.kind===0&&t.balc>=0&&n.downhill)return!1;let r=t.y-e.y;return gc(ic.hero.jump,ic.hero.run,n.gap-sc,r)?!0:n.downhill&&pc(e,t)?gc(ic.tramp.vUp,ic.hero.run*Js,n.gap+3/2-sc,r):!1}function bc(e){return[e.zipX,e.y,e.z0+3/2]}function xc(e,t){let n=t.x0+2,r=t.x1-2;return[Math.min(r,Math.max(n,e.zipX)),t.y+Ks,t.z1-qs]}function Sc(e,t,n){if(e.zipTo!==t.id||t.z1>e.z0||t.z1-t.z0<2.5+sc)return!1;let r=bc(e),i=xc(e,t),a=i[0]-r[0],o=i[2]-r[2],s=Math.sqrt(a*a+o*o),c=r[1]+ic.rope.handToFeet-i[1];if(c<=0)return!1;let l=Math.atan2(c,s)*180/Math.PI;if(l<ic.rope.minSlopeDeg||l>ic.rope.maxSlopeDeg)return!1;let u=Math.sqrt(s*s+c*c);if(u<ic.rope.minLen||u>ic.rope.maxLen)return!1;let d=Math.ceil(u/nc),f=sc+rc;for(let i=1;i<d;i++){let s=i/d,l=r[0]+a*s,u=r[2]+o*s,p=r[1]-c*s;for(let r=0;r<n.length;r++){let i=n[r];if(i.id!==e.id&&i.id!==t.id&&!(l<i.x0-f||l>i.x1+f||u<i.z0-f||u>i.z1+f)&&p<i.y+rc)return!1}}return!0}function Cc(e,t,n){if(e.id===t.id)return-1;if(e.kind===1&&e.up===t.id)return 3;let r=uc(e,t);if(r!==null&&!(e.kind===1&&r.downhill)){if(fc(e,t,r))return 0;if(mc(e,t,r))return 1;if(yc(e,t,r))return 4}return Sc(e,t,n)?2:r!==null&&!(e.kind===1&&r.downhill)&&vc(e,t,r)?5:-1}function wc(e){let t=[];for(let n=0;n<e.length;n++)for(let r=0;r<e.length;r++){let i=Cc(e[n],e[r],e);i>=0&&t.push({from:e[n].id,to:e[r].id,move:i})}return t}function Tc(e,t){let n=[];for(let t=0;t<e.n;t++)n.push([]);for(let r=0;r<e.edges.length;r++){let i=e.edges[r];t?n[i.to].push(i.from):n[i.from].push(i.to)}return n}function Ec(e,t,n){let r=Array(e).fill(!1),i=[n];r[n]=!0;for(let e=0;e<i.length;e++){let n=t[i[e]];for(let e=0;e<n.length;e++){let t=n[e];r[t]||(r[t]=!0,i.push(t))}}return r}function Dc(e){return e.start<0||e.goal<0||e.start>=e.n||e.goal>=e.n?!1:Ec(e.n,Tc(e,!1),e.start)[e.goal]}function Oc(e,t=8){let n=e.n;if(e.start===e.goal||!Dc(e))return 0;let r=new Int8Array(n*n);for(let t=0;t<e.edges.length;t++){let i=e.edges[t];i.from!==i.to&&(r[i.from*n+i.to]=1)}let i=new Int32Array(n),a=0;for(;a<t;){i.fill(-1),i[e.start]=e.start;let t=[e.start];for(let a=0;a<t.length&&i[e.goal]<0;a++){let e=t[a];for(let a=0;a<n;a++)i[a]<0&&r[e*n+a]>0&&(i[a]=e,t.push(a))}if(i[e.goal]<0)break;for(let t=e.goal;t!==e.start;t=i[t]){let e=i[t];r[e*n+t]--,r[t*n+e]++}a++}return a}function kc(e){let t=Ec(e.n,Tc(e,!1),e.start),n=Ec(e.n,Tc(e,!0),e.goal),r=[];for(let i=0;i<e.n;i++)t[i]&&!n[i]&&r.push(i);return{reach:t,canFinish:n,deadEnds:r,escapePaths:Oc(e),goalReached:t[e.goal]}}var Ac=20261111,jc=Math.tan(20*Math.PI/180);function Mc(e){return jc*e+-8}var Nc=[-24,-12,0,12,24],Pc=4,Fc=4,Ic=7,Lc=11,Rc=15,zc=2,Bc=2,Vc=5,Hc=32,Uc=5,Wc=4,Gc=[Ic,Lc],Kc=2,qc=Rc,Jc=6,Yc=5,Xc=7,Zc=2,Qc=2,$c=.3,el=6,tl=.02,nl=.05,rl=4,il=6,al=.2,ol=60,sl=8,cl=2,ll=80,ul=64,dl=3,fl=0,pl=1,ml=2,hl=3,gl=[Ic,Lc,Rc],_l=[{name:`ridge`,houses:9,perBand:[2,2],gaps:[11,12],heights:[Lc,Rc],roadAfter:!1,mix:[1,1,1,1,3],shift:0,trap:0,deco:[0,0,0,0]},{name:`hillside`,houses:15,perBand:[3,5],gaps:[6,7],heights:gl,roadAfter:!0,mix:[4,1,2,2,2],shift:.2,trap:.7,deco:[.08,.1,.06,.12]},{name:`turnings`,houses:15,perBand:[4,5],gaps:[6,7,11,12],heights:gl,roadAfter:!0,mix:[3,2,2,2,3],shift:.2,trap:.8,deco:[.08,.1,.06,.12]},{name:`lower`,houses:36,perBand:[4,5],gaps:[6,7,11,12],heights:gl,roadAfter:!0,mix:[2,2,3,3,3],shift:.2,trap:.85,deco:[.06,.08,.05,.1]},{name:`town`,houses:25,perBand:[4,5],gaps:[6,7],heights:gl,roadAfter:!1,mix:[4,2,2,1,1],shift:.25,trap:.85,deco:[.06,.08,.05,.1]}],vl=[3,1,2,2,0],yl=[0,0,0,0,1],bl=[1,0,0,1,1],xl=[0,0,1,1,1],Sl=-1;function Cl(e){return-2-e}function wl(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Tl(e,t){return Math.min(t-1,Math.floor(e()*t))}function El(e,t){return t[Tl(e,t.length)]}function Dl(e,t){let n=t.slice();for(let t=n.length-1;t>0;t--){let r=Tl(e,t+1),i=n[t];n[t]=n[r],n[r]=i}return n}function Ol(e,t){let n=t.slice(),r=[];for(;;){let t=0;for(let e=0;e<n.length;e++)t+=n[e];if(t<=0)return r;let i=e()*t,a=-1;for(let e=0;e<n.length&&!(!(n[e]<=0)&&(a=e,i-=n[e],i<0));e++);r.push(a),n[a]=0}}function kl(e,t,n,r){let i=[],a=t;for(;a>0;){let t=n+Tl(e,r-n+1);t>a&&(t=a);let o=a-t;o>0&&o<n&&(t=a<=r?a:Math.max(2,a-n)),i.push(t),a-=t}return i}function Al(e){return Mc(e.zc)+e.h}function jl(e){return Mc(e.zc+Vc)+Uc}function Ml(e){let t=[],n=[],r=[],i=[];for(let i=0;i<e.houses.length;i++){let a=e.houses[i],o=Nc[a.lane];n.push(t.length),r.push(-1),t.push({id:t.length,kind:0,house:i,x0:o-Pc,x1:o+Pc,z0:a.zc-Pc,z1:a.zc+Pc,y:Al(a),cushion:a.cushion,tramps:a.tramp?[o+Qc]:[],zipTo:-1,zipX:o-Zc,up:-1,balc:-1})}for(let i=0;i<e.houses.length;i++){let a=e.houses[i];if(!a.balcony)continue;let o=Nc[a.lane];r[i]=t.length,t[n[i]].balc=t.length,t.push({id:t.length,kind:1,house:i,x0:o-Pc,x1:o+Pc,z0:a.zc+Pc,z1:a.zc+Pc+zc,y:Al(a)-Bc,cushion:!1,tramps:[],zipTo:-1,zipX:o-Zc,up:n[i],balc:-1})}for(let n=0;n<e.roads.length;n++){let r=e.roads[n];i.push(t.length),t.push({id:t.length,kind:2,house:-1,x0:-32,x1:Hc,z0:r.zc-Vc,z1:r.zc+Vc,y:jl(r),cushion:!1,tramps:r.tramps.slice(),zipTo:-1,zipX:0,up:-1,balc:-1})}for(let r=0;r<e.houses.length;r++){let a=e.houses[r].zipTo;a>=0?t[n[r]].zipTo=n[a]:a<=-2&&(t[n[r]].zipTo=i[-2-a])}return{nodes:t,roofOf:n,balcOf:r,roadNode:i}}function Nl(e,t){return e.nodes[t>=0?e.roofOf[t]:e.roadNode[-2-t]]}function Pl(e,t,n){let r=Ml(e),i=Nl(r,t),a=Cc(i,r.nodes[r.roofOf[n]],r.nodes);if(a===0||a===1||a===2)return a;let o=r.balcOf[n];if(o>=0){let e=Cc(i,r.nodes[o],r.nodes);if(e===0||e===1)return e}return-1}function Fl(e,t,n,r,i,a,o){let s=e.houses[r],c=n>=0?e.houses[n]:null,l=n<=-2?e.roads[-2-n]:null,u=s.h,d=s.balcony,f=s.cushion,p=c!==null&&c.tramp,m=c===null?Sl:c.zipTo,h=l===null?0:l.tramps.length,g=()=>{s.h=u,s.balcony=d,s.cushion=f,c!==null&&(c.tramp=p,c.zipTo=m),l!==null&&(l.tramps.length=h)},_=o?[s.h]:Dl(t,i),v=Ol(t,a);for(let t=0;t<v.length;t++){let i=v[t],a=o?[d]:i===pl?[!0]:i===hl?[!1,!0]:[!1];for(let t=0;t<_.length;t++)for(let o=0;o<a.length;o++){g(),s.h=_[t],s.balcony=a[o];let u=Pl(e,n,r);if(i===fl||i===pl){if(u>=0)return!0}else if(!(u>=0)){if(i===ml){if(s.cushion)continue;s.cushion=!0}else if(i===hl){if(c!==null){if(c.tramp)continue;c.tramp=!0}else l!==null&&l.tramps.push(Nc[s.lane]+Qc)}else{if(c===null||c.zipTo!==Sl)continue;c.zipTo=r}if(Pl(e,n,r)>=0)return!0}}}return g(),!1}function Il(e,t,n){let r=e.houses[t],i=Ml(e);return Cc(i.nodes[i.roofOf[t]],i.nodes[i.roadNode[n]],i.nodes)===0||r.zipTo===Sl&&(r.zipTo=Cl(n),i=Ml(e),Cc(i.nodes[i.roofOf[t]],i.nodes[i.roadNode[n]],i.nodes)===2||(r.zipTo=Sl,!1))}function Ll(e,t,n,r,i){let a=e.houses[n],o=e.houses[r],s=t()<.5?[a.h,a.h-Fc]:[a.h-Fc,a.h];for(let t=0;t<s.length;t++){if(i.indexOf(s[t])<0)continue;o.h=s[t];let a=Ml(e);if(Cc(a.nodes[a.roofOf[n]],a.nodes[a.roofOf[r]],a.nodes)===0)return!0}return!1}function Rl(e,t,n,r){let i=[];return t>0&&!e[t-1]&&i.push(t-1),t<Nc.length-1&&!e[t+1]&&i.push(t+1),i.length===0?Sl:i.length===1?i[0]:r!==Sl&&n()<.7?Math.abs(i[0]-r)<=Math.abs(i[1]-r)?i[0]:i[1]:El(n,i)}function zl(e,t,n,r,i){let a=[];for(let t=0;t<n.length;t++)a.push(e.houses[n[t]].role!==0);let o=!0;for(;o;){o=!1;for(let s=0;s<n.length;s++){if(a[s])continue;let c=e.houses[n[s]],l=[];for(let t=0;t<n.length;t++){let r=e.houses[n[t]];a[t]&&Math.abs(r.lane-c.lane)===1&&l.push(r)}if(l.length===0)continue;let u=El(t,l).h;c.h=t()<i&&r.indexOf(u-Fc)>=0?u-Fc:u,a[s]=!0,o=!0}}}function Bl(e,t,n){let r=e.houses[n],i=e.rows[r.row+1];if(i===void 0||r.zipTo!==Sl)return;let a;if(i.kind===1)a=Cl(i.road);else{let n=[];for(let t=0;t<i.houses.length;t++)Math.abs(e.houses[i.houses[t]].lane-r.lane)<=1&&n.push(i.houses[t]);if(n.length===0)return;a=El(t,n)}r.zipTo=a;let o=Ml(e),s=a>=0?o.nodes[o.roofOf[a]]:o.nodes[o.roadNode[-2-a]];Cc(o.nodes[o.roofOf[n]],s,o.nodes)!==2&&(r.zipTo=Sl)}function Vl(e){let t=Ml(e),n={n:t.nodes.length,edges:wc(t.nodes),start:t.roofOf[0],goal:t.roofOf[e.houses.length-1]},r=kc(n),i=[],a=0;for(let n=0;n<e.houses.length;n++){let e=t.roofOf[n];r.reach[e]?r.canFinish[e]||i.push(n):a++}return{nb:t,graph:n,stats:r,deadRoofs:i,unreached:a}}function Hl(e,t,n,r){let i=e.houses[n],a=e.rows[i.row+1];if(a===void 0)return!1;if(a.kind===1)return Il(e,n,a.road);let o=[],s=[];for(let t=0;t<a.houses.length;t++){let n=a.houses[t];if(!r.stats.canFinish[r.nb.roofOf[n]])continue;let c=Math.abs(e.houses[n].lane-i.lane);c===0?o.push(n):c===1&&s.push(n)}let c=o.concat(Dl(t,s));for(let r=0;r<c.length;r++)if(Fl(e,t,n,c[r],[],xl,!0))return!0;return!1}function Ul(e,t,n,r,i,a){return{min:[e,t,n],max:[r,i,a]}}function Wl(e){let t=Ml(e),n=[],r=[],i=[],a=[],o=[],s=[],c=[],l=Pc;for(let c=0;c<e.houses.length;c++){let u=e.houses[c],d=Nc[u.lane],f=Al(u),p=u.zc-l,m=u.zc+l;if(n.push(Ul(d-l,Mc(u.zc)-el,p,d+l,f-$c,m)),r.push(1),n.push(Ul(d-l,f-$c,p,d+l,f,m)),r.push(2),u.balcony){let e=f-Bc;n.push(Ul(d-l,e-$c,m,d+l,e,m+zc)),r.push(2)}let h=d+Qc-Gs,g=d+Qc+Gs;if(u.cushion&&!u.tramp?s.push(Ul(d-l,f,p,d+l,f+tl,m)):u.cushion&&(s.push(Ul(d-l,f,p+3,d+l,f+tl,m)),s.push(Ul(d-l,f,p,h,f+tl,p+3)),g<d+l&&s.push(Ul(g,f,p,d+l,f+tl,p+3))),u.tramp&&o.push(Ul(h,f,p,g,f+tl,p+3)),u.zipTo!==Sl){let e=t.nodes[t.roofOf[c]],n=t.nodes[e.zipTo],r=bc(e);a.push({zone:Ul(r[0]-Gs,f,p,r[0]+Gs,f+nl,p+3),anchor:i.length}),i.push({pos:xc(e,n)})}}for(let t=0;t<e.roads.length;t++){let i=e.roads[t],a=jl(i),s=i.zc-Vc;n.push(Ul(-32,Mc(s)-el,s,Hc,a,i.zc+Vc)),r.push(0);for(let e=0;e<i.tramps.length;e++){let t=i.tramps[e];o.push(Ul(t-Gs,a,s,t+Gs,a+tl,s+3))}}let u=e.houses[0],d=e.houses[e.houses.length-1],f=d.zc-l-sl;for(let e=u.zc+l+sl;e>f;e-=rl){let t=Mc(e)+al;c.push(Ul(-60,t-il,e-rl,ol,t,e))}let p=Nc[d.lane],m=Al(d);return{version:1,spawn:[Nc[u.lane],Al(u)+.01,u.zc],spawnYaw:Math.PI,killPlaneY:Mc(f)-40,solids:n,style:r,ramps:[],anchors:i,goal:Ul(p-l,m,d.zc-l,p+l,m+dl,d.zc+l),route:[],lineOnly:1,climb:1,lines:a,tramps:o,cushions:s,hazards:c}}function Gl(e){let t=wl(e),n={houses:[],roads:[],rows:[]},r=(e,t,r,i,a,o)=>(n.houses.push({lane:e,zc:t,h:r,balcony:!1,cushion:!1,tramp:!1,zipTo:Sl,row:i,seg:a,role:o}),n.houses.length-1);r(Kc,0,qc,0,0,3),n.rows.push({kind:0,z0:-4,z1:Pc,houses:[0],road:-1,seg:0});let i=0,a=0,o=0;for(let e=0;e<_l.length;e++){let s=_l[e],c=e===_l.length-1,l=kl(t,s.houses-+(e===0)-!!c,s.perBand[0],s.perBand[1]);for(let c=0;c<l.length;c++){let u=l[c],d=s.roadAfter&&c===l.length-1?Gc:s.heights,f=n.rows[n.rows.length-1],p=n.rows.length===1,m=f.kind===1?Wc:p?Jc:El(t,s.gaps),h=f.z0-m-Pc,g=[];for(let e=0;e<Nc.length;e++)g.push(!1);let _=i>=0?n.houses[i].lane:Tl(t,Nc.length);g[_]=!0;let v=Sl;a!==Sl&&u>=2?(p?v=_+(t()<.5?-1:1):a>=0?v=n.houses[a].lane:(v=Tl(t,Nc.length-1),v>=_&&v++),g[v]=!0):a!==Sl&&(a=Sl,o++);let y=v===Sl?1:2,b=Sl,x=Sl;for(y<u&&t()<s.shift&&(b=Rl(g,_,t,Sl),b!==Sl&&(g[b]=!0,y++)),v!==Sl&&y<u&&t()<s.shift&&(x=Rl(g,v,t,b===Sl?_:b),x!==Sl&&(g[x]=!0,y++));y<u;){let e=[];for(let t=0;t<Nc.length;t++)!g[t]&&(t>0&&g[t-1]||t<Nc.length-1&&g[t+1])&&e.push(t);if(e.length===0)break;g[El(t,e)]=!0,y++}let S=n.rows.length,C=[],w=[];for(let n=0;n<Nc.length;n++){if(w.push(Sl),!g[n])continue;let i=n===_||n===b?1:n===v||n===x?2:0;w[n]=r(n,h,El(t,d),S,e,i),C.push(w[n])}if(n.rows.push({kind:0,z0:h-Pc,z1:h+Pc,houses:C,road:-1,seg:e}),!Fl(n,t,i,w[_],d,p?vl:s.mix,!1))return null;i=w[_],v!==Sl&&(Fl(n,t,a,w[v],d,p?yl:s.mix,!1)?a=w[v]:(n.houses[w[v]].role=0,x!==Sl&&(n.houses[w[x]].role=0),x=Sl,a=Sl,o++)),b!==Sl&&(Ll(n,t,i,w[b],d)?i=w[b]:n.houses[w[b]].role=0),x!==Sl&&(Ll(n,t,a,w[x],d)?a=w[x]:n.houses[w[x]].role=0),zl(n,t,C,d,s.trap)}if(s.roadAfter){let t=n.rows[n.rows.length-1].z0-Wc-Vc,r=n.roads.length;if(n.roads.push({zc:t,tramps:[],row:n.rows.length}),n.rows.push({kind:1,z0:t-Vc,z1:t+Vc,houses:[],road:r,seg:e}),!Il(n,i,r))return null;a!==Sl&&!Il(n,a,r)&&o++,i=Cl(r),a=Cl(r)}}{let e=n.rows[n.rows.length-1].z0-Xc-Pc,s=r(i>=0?n.houses[i].lane:Kc,e,Yc,n.rows.length,_l.length-1,4);if(n.houses[s].cushion=!0,n.rows.push({kind:0,z0:e-Pc,z1:e+Pc,houses:[s],road:-1,seg:_l.length-1}),!Fl(n,t,i,s,[],bl,!0))return null;a!==Sl&&!Fl(n,t,a,s,[],yl,!0)&&o++}for(let e=0;e<n.houses.length;e++){let r=n.houses[e];if(r.role!==0)continue;let i=_l[r.seg].deco;t()<i[0]&&(r.cushion=!0),t()<i[1]&&(r.balcony=!0),t()<i[2]&&(r.tramp=!0),t()<i[3]&&Bl(n,t,e)}let s=Vl(n),c=0,l=[];for(let e=0;e<ll&&s.deadRoofs.length>20;e++){let e=[];for(let t=0;t<s.deadRoofs.length;t++)l[s.deadRoofs[t]]||e.push(s.deadRoofs[t]);if(e.length===0)break;let r=El(t,e);l[r]=!0,Hl(n,t,r,s)&&(c++,s=Vl(n))}let u=[];for(let e=0;e<Ws.length;e++)u.push(0);for(let e=0;e<s.graph.edges.length;e++)u[s.graph.edges[e].move]++;let d=0,f=0,p=0,m=0;for(let e=0;e<n.houses.length;e++){let t=n.houses[e];t.zipTo!==Sl&&d++,t.tramp&&f++,t.cushion&&p++,t.balcony&&m++}for(let e=0;e<n.roads.length;e++)f+=n.roads[e].tramps.length;let h=n.rows[n.rows.length-1].z0-sl,g={seed:e,houses:n.houses.length,roads:n.roads.length,rows:n.rows.length,nodes:s.graph.n,edges:s.graph.edges.length,moves:u,deadRoofs:s.deadRoofs.length,unreachedRoofs:s.unreached,escapePaths:s.stats.escapePaths,lostB:o,repairs:c,zips:d,tramps:f,cushions:p,balconies:m,zMin:h,length:n.rows[0].z1-h};return{level:Wl(n),layout:n,nodes:s.nb.nodes,graph:s.graph,stats:s.stats,summary:g,seed:e}}function Kl(e){return e.summary.deadRoofs>=8&&e.summary.deadRoofs<=20}function ql(e){return e.stats.goalReached&&e.summary.houses===100&&e.stats.escapePaths>=2&&e.summary.unreachedRoofs<=cl&&Kl(e)}var Jl=null,Yl=-1;function Xl(e=Ac){if(Jl!==null&&Yl===e)return Jl;let t=null,n=null;for(let r=0;r<ul&&n===null;r++){let i=Gl(e+r>>>0);i!==null&&(ql(i)?n=i:t===null&&i.stats.goalReached&&Kl(i)&&(t=i))}if(n===null&&(n=t),n===null)throw Error(`strategy: no valid level within 64 seeds of `+e);return Jl=n,Yl=e,n}function Zl(e=Ac){return Xl(e).level}var Ql={Space:1,ShiftLeft:4,ShiftRight:4,ControlLeft:4,ControlRight:4,KeyE:2,KeyQ:4,KeyR:8,KeyF:128},$l={KeyD:1,ArrowRight:1,KeyA:-1,ArrowLeft:-1},eu={KeyW:1,ArrowUp:1,KeyS:-1,ArrowDown:-1};function tu(e){if(!(e instanceof HTMLElement))return!1;let t=e.tagName;return t===`INPUT`||t===`TEXTAREA`||t===`SELECT`||e.isContentEditable}var nu=class{target;heldKeys=new Set;mouseHeld=0;pressedPending=0;constructor(e){this.target=e,e.addEventListener(`pointerdown`,this.onPointerDown),e.addEventListener(`pointerup`,this.onPointerUp),e.addEventListener(`pointercancel`,this.onPointerUp),e.addEventListener(`contextmenu`,this.onContextMenu),window.addEventListener(`pointerup`,this.onPointerUp),window.addEventListener(`pointercancel`,this.onPointerUp),window.addEventListener(`keydown`,this.onKeyDown),window.addEventListener(`keyup`,this.onKeyUp),window.addEventListener(`blur`,this.onBlur)}sample(e){fe(e);let t=0,n=0,r=0;for(let e of this.heldKeys){let i=$l[e];i!==void 0&&(t+=i);let a=eu[e];a!==void 0&&(n+=a);let o=Ql[e];o!==void 0&&(r|=o)}e.moveX=pe(t),e.moveY=pe(n),e.buttons=r|this.mouseBits(),e.pressed=this.pressedPending,this.pressedPending=0}dispose(){this.target.removeEventListener(`pointerdown`,this.onPointerDown),this.target.removeEventListener(`pointerup`,this.onPointerUp),this.target.removeEventListener(`pointercancel`,this.onPointerUp),this.target.removeEventListener(`contextmenu`,this.onContextMenu),window.removeEventListener(`pointerup`,this.onPointerUp),window.removeEventListener(`pointercancel`,this.onPointerUp),window.removeEventListener(`keydown`,this.onKeyDown),window.removeEventListener(`keyup`,this.onKeyUp),window.removeEventListener(`blur`,this.onBlur)}mouseBits(){let e=0,t=!!(this.mouseHeld&1),n=!!(this.mouseHeld&4);return t&&(e|=2),n&&(e|=40),e}onPointerDown=e=>{let t=this.mouseBits();this.mouseHeld|=1<<e.button;try{this.target.setPointerCapture(e.pointerId)}catch{}this.pressedPending|=this.mouseBits()&~t};onPointerUp=e=>{this.mouseHeld&=~(1<<e.button)};onContextMenu=e=>{e.preventDefault()};onKeyDown=e=>{if(tu(e.target))return;let t=e.code,n=t===`ControlLeft`||t===`ControlRight`;if(e.ctrlKey&&!n||e.metaKey||e.altKey)return;let r=Ql[t],i=$l[t],a=eu[t];(r!==void 0||i!==void 0||a!==void 0)&&(e.preventDefault(),e.repeat||this.heldKeys.has(t)||(this.heldKeys.add(t),r!==void 0&&(this.pressedPending|=r)))};onKeyUp=e=>{this.heldKeys.delete(e.code)};onBlur=()=>{this.heldKeys.clear(),this.mouseHeld=0}},ru=class{down=!1;downT=0;count=0;lastUpT=0;press(e){this.down=!0,this.downT=e}release(e){if(!this.down)return-1;this.down=!1;let t=e-this.downT;return t<=250?(this.count<3&&this.count++,this.lastUpT=e):this.count=0,t}cancel(){this.down=!1,this.count=0}holding(e,t){return this.down&&e-this.downT>=t}isDown(){return this.down}poll(e){if(this.down||this.count===0)return 0;if(this.count>=3||e-this.lastUpT>=220){let e=this.count;return this.count=0,e}return 0}},iu=64,au=250,ou=10,su=80,cu=300,lu=1,uu=2,du=4,fu=class{stickActive=!1;stickOriginX=0;stickOriginY=0;stickX=0;stickY=0;actionMode=`jump`;tapPending=!1;tapNdcX=0;tapNdcY=0;stickId=-1;lookId=-1;jumpId=-1;roles=new Map;lookStartX=0;lookStartY=0;lookStartTime=0;lookMaxDevPx=0;pressedPending=0;tapper=new ru;pressMode=`jump`;root;stickZone;lookZone;btnJump;stickBase=null;stickKnob=null;constructor(e){if(this.root=e,this.stickZone=e.querySelector(`#stick-zone`),this.lookZone=e.querySelector(`#look-zone`),this.btnJump=e.querySelector(`#btn-jump`),this.stickZone!==null){this.stickBase=document.createElement(`div`),this.stickBase.id=`stick-base`,this.stickKnob=document.createElement(`div`),this.stickKnob.id=`stick-knob`;for(let e of[`up`,`right`,`down`,`left`]){let t=document.createElement(`i`);t.className=`chev `+e,t.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 14l4-4 4 4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,this.stickBase.appendChild(t)}this.stickZone.appendChild(this.stickBase),this.stickZone.appendChild(this.stickKnob),this.stickZone.addEventListener(`pointerdown`,this.onStickDown),this.stickZone.addEventListener(`pointermove`,this.onStickMove),this.stickZone.addEventListener(`pointerup`,this.onStickUp),this.stickZone.addEventListener(`pointercancel`,this.onStickCancel)}this.lookZone!==null&&(this.lookZone.addEventListener(`pointerdown`,this.onLookDown),this.lookZone.addEventListener(`pointermove`,this.onLookMove),this.lookZone.addEventListener(`pointerup`,this.onLookUp),this.lookZone.addEventListener(`pointercancel`,this.onLookCancel)),this.btnJump!==null&&(this.btnJump.addEventListener(`pointerdown`,this.onJumpDown),this.btnJump.addEventListener(`pointerup`,this.onJumpUp),this.btnJump.addEventListener(`pointercancel`,this.onJumpCancel)),window.addEventListener(`blur`,this.onBlur),e.addEventListener(`contextmenu`,this.onContextMenu)}sample(e){fe(e),e.moveX=pe(this.stickX),e.moveY=pe(this.stickY);let t=performance.now(),n=0;this.jumpId!==-1&&(this.pressMode===`jump`?n|=65:this.pressMode===`hook`?n|=66:this.pressMode===`brake`&&this.tapper.holding(t,180)?n|=8:this.pressMode===`climb`&&this.tapper.holding(t,350)&&(n|=128));let r=this.tapper.poll(t);e.taps=r,r===2&&this.actionMode===`jump`?(this.pressedPending|=66,n|=66):r===3&&(this.pressedPending|=4),e.buttons=n,e.pressed=this.pressedPending,this.pressedPending=0}reset(){for(let e of this.roles.keys())this.releaseCapture(e);this.roles.clear(),this.stickId=-1,this.lookId=-1,this.jumpId=-1,this.releaseStick(),this.pressedPending=0,this.tapper.cancel(),this.tapPending=!1,this.lookMaxDevPx=0,this.render()}render(){if(this.stickBase===null||this.stickKnob===null)return;if(!this.stickActive){this.stickBase.classList.add(`ghost`),this.stickKnob.classList.add(`ghost`),this.stickBase.style.display=`block`,this.stickKnob.style.display=`block`,this.stickBase.style.left=``,this.stickBase.style.top=``,this.stickKnob.style.left=``,this.stickKnob.style.top=``;return}this.stickBase.classList.remove(`ghost`),this.stickKnob.classList.remove(`ghost`);let e=this.stickOriginX,t=this.stickOriginY;this.stickBase.style.display=`block`,this.stickBase.style.left=e+`px`,this.stickBase.style.top=t+`px`,this.stickKnob.style.display=`block`,this.stickKnob.style.left=e+this.stickX*iu+`px`,this.stickKnob.style.top=t-this.stickY*iu+`px`}dispose(){this.stickZone!==null&&(this.stickZone.removeEventListener(`pointerdown`,this.onStickDown),this.stickZone.removeEventListener(`pointermove`,this.onStickMove),this.stickZone.removeEventListener(`pointerup`,this.onStickUp),this.stickZone.removeEventListener(`pointercancel`,this.onStickCancel)),this.lookZone!==null&&(this.lookZone.removeEventListener(`pointerdown`,this.onLookDown),this.lookZone.removeEventListener(`pointermove`,this.onLookMove),this.lookZone.removeEventListener(`pointerup`,this.onLookUp),this.lookZone.removeEventListener(`pointercancel`,this.onLookCancel)),this.btnJump!==null&&(this.btnJump.removeEventListener(`pointerdown`,this.onJumpDown),this.btnJump.removeEventListener(`pointerup`,this.onJumpUp),this.btnJump.removeEventListener(`pointercancel`,this.onJumpCancel)),window.removeEventListener(`blur`,this.onBlur),this.root.removeEventListener(`contextmenu`,this.onContextMenu),this.stickBase?.remove(),this.stickKnob?.remove(),this.roles.clear(),this.releaseStick(),this.lookId=-1,this.jumpId=-1}capture(e,t){try{e.setPointerCapture(t.pointerId)}catch{}}releaseCapture(e){for(let t of[this.stickZone,this.lookZone,this.btnJump])try{t!==null&&t.hasPointerCapture(e)&&t.releasePointerCapture(e)}catch{}}releaseStick(){this.stickActive=!1,this.stickX=0,this.stickY=0}onStickDown=e=>{this.stickId===-1&&this.stickZone!==null&&(e.preventDefault(),this.stickId=e.pointerId,this.roles.set(e.pointerId,lu),this.capture(this.stickZone,e),this.stickActive=!0,this.stickOriginX=e.clientX,this.stickOriginY=e.clientY,this.stickX=0,this.stickY=0)};onStickMove=e=>{if(e.pointerId!==this.stickId)return;let t=e.clientX-this.stickOriginX,n=e.clientY-this.stickOriginY,r=t/iu,i=-n/iu,a=Math.sqrt(r*r+i*i);a>1&&(r/=a,i/=a),this.stickX=r,this.stickY=i};onStickUp=e=>{e.pointerId===this.stickId&&(this.roles.delete(e.pointerId),this.stickId=-1,this.releaseStick())};onStickCancel=e=>{e.pointerId===this.stickId&&(this.roles.delete(e.pointerId),this.stickId=-1,this.releaseStick())};onLookDown=e=>{this.lookId===-1&&this.lookZone!==null&&(e.preventDefault(),this.lookId=e.pointerId,this.roles.set(e.pointerId,uu),this.capture(this.lookZone,e),this.lookStartX=e.clientX,this.lookStartY=e.clientY,this.lookStartTime=e.timeStamp,this.lookMaxDevPx=0)};onLookMove=e=>{if(e.pointerId!==this.lookId)return;let t=e.clientX-this.lookStartX,n=e.clientY-this.lookStartY,r=Math.sqrt(t*t+n*n);r>this.lookMaxDevPx&&(this.lookMaxDevPx=r)};onLookUp=e=>{if(e.pointerId!==this.lookId)return;this.roles.delete(e.pointerId),this.lookId=-1;let t=e.timeStamp-this.lookStartTime,n=e.clientY-this.lookStartY,r=Math.max(this.lookMaxDevPx,Math.abs(n));if(n>su&&t<=cu)this.pressedPending|=4;else if(t<au&&r<ou&&this.lookZone!==null){let t=this.lookZone.getBoundingClientRect(),n=t.width>0?t.width:1,r=t.height>0?t.height:1;this.tapNdcX=(e.clientX-t.left)/n*2-1,this.tapNdcY=1-(e.clientY-t.top)/r*2,this.tapPending=!0}};onLookCancel=e=>{e.pointerId===this.lookId&&(this.roles.delete(e.pointerId),this.lookId=-1)};onJumpDown=e=>{this.jumpId===-1&&this.btnJump!==null&&(e.preventDefault(),this.jumpId=e.pointerId,this.roles.set(e.pointerId,du),this.capture(this.btnJump,e),this.pressMode=this.actionMode,this.tapper.press(e.timeStamp),this.pressMode===`jump`?this.pressedPending|=1:this.pressMode===`hook`&&(this.pressedPending|=66))};onJumpUp=e=>{if(e.pointerId!==this.jumpId)return;this.roles.delete(e.pointerId),this.jumpId=-1;let t=this.tapper.release(e.timeStamp);this.pressMode===`climb`&&t>=0&&t<350&&(this.pressedPending|=1)};onJumpCancel=e=>{e.pointerId===this.jumpId&&(this.roles.delete(e.pointerId),this.jumpId=-1,this.tapper.cancel())};onContextMenu=e=>{e.preventDefault()};onBlur=()=>{this.reset()}},pu=.8,mu=.25,hu=.02,gu=1e-4,_u=.09,vu=900,yu=300,bu=.25,xu=.02,Su=.12,Cu=.12,wu=180,Tu=90,Eu=1200,Du=.35,Ou=.03,ku=.2,Au=.12,ju=.14,Mu=.2,Nu=.5,Pu=110,Fu=45,Iu=.35,Lu=220,Ru=50,zu=800,Bu=.4;function Vu(e,t){let n=Math.max(1,Math.floor(e.sampleRate*t)),r=e.createBuffer(1,n,e.sampleRate),i=r.getChannelData(0);for(let e=0;e<i.length;e++)i[e]=Math.random()*2-1;return r}function Hu(e,t,n,r){e.gain.setValueAtTime(t,n),e.gain.exponentialRampToValueAtTime(gu,n+r)}function Uu(e,t,n,r,i,a,o,s,c){let l=e.createOscillator();l.type=n,l.frequency.setValueAtTime(r,a),l.frequency.exponentialRampToValueAtTime(i,a+o);let u=l;if(c!==null){let t=e.createBiquadFilter();t.type=`lowpass`,t.frequency.value=c,l.connect(t),u=t}let d=e.createGain();Hu(d,s,a,o),u.connect(d),d.connect(t),l.start(a),l.stop(a+o+hu)}function Wu(e,t,n,r,i,a){let o=e.createBufferSource();o.buffer=n;let s=e.createGain();Hu(s,a,r,i),o.connect(s),s.connect(t),o.start(r),o.stop(r+i+hu)}var Gu=class{ctx=null;master=null;noise=null;unlock(){if(this.ctx!==null)this.ctx.resume().catch(()=>void 0);else try{let e=window.AudioContext;if(typeof e!=`function`)return;let t=new e,n=t.createGain();n.gain.value=pu,n.connect(t.destination);let r=Vu(t,mu);this.ctx=t,this.master=n,this.noise=r,t.resume().catch(()=>void 0)}catch{this.ctx=null,this.master=null,this.noise=null}}fire(){let e=this.noise;this.run((t,n,r)=>{Uu(t,n,`sine`,vu,yu,r,_u,bu,null),e!==null&&Wu(t,n,e,r,xu,Su)})}attach(){let e=this.noise;this.run((t,n,r)=>{Uu(t,n,`square`,wu,Tu,r,Cu,Du,Eu),e!==null&&Wu(t,n,e,r,Ou,ku)})}land(e){let t=Math.min(1,Math.max(0,Number.isFinite(e)?e:0)),n=Au+ju*t,r=Mu+Nu*t;this.run((e,t,i)=>{Uu(e,t,`sine`,Pu,Fu,i,n,r,null)})}die(){this.run((e,t,n)=>{Uu(e,t,`sawtooth`,Lu,Ru,n,Iu,Bu,zu)})}wind(e){let t=this.noise,n=Math.min(1,Math.max(0,Number.isFinite(e)?e:0));t===null||n<=.02||this.run((e,r,i)=>{Wu(e,r,t,i,.2,.05+.25*n)})}roar(){this.run((e,t,n)=>{Uu(e,t,`sawtooth`,120,38,n,.9,.45,500),Uu(e,t,`square`,70,30,n,1.1,.25,300)})}dispose(){let e=this.ctx;if(this.ctx=null,this.master=null,this.noise=null,e!==null)try{e.close().catch(()=>void 0)}catch{}}run(e){let t=this.ctx,n=this.master;if(t!==null&&n!==null&&t.state!==`closed`)try{e(t,n,t.currentTime)}catch{}}},Ku=Math.PI/180,qu=2,Ju=class{pos=new f(0,0,0);lookAt=new f(0,0,0);focus=new f(0,0,0);arm=0;yaw=0;pitch=0;fov=0;initialized=0},Yu=new i,Xu=new f(0,0,0),Zu=new f(0,0,0);function Qu(e,t,n){return e<t?t:e>n?n:e}function $u(e,t,n,r,i,a,o,s){let c=s===void 0?Yu:s,l=Qu(i/o.fovSpeed,0,1),u=r-o.downhillBias*Ku*l;u=Qu(u,o.pitchMin*Ku,o.pitchMax*Ku);let f=o.fov+(o.fovMax-o.fov)*l;if(e.initialized===0)e.initialized=1,e.focus.x=t.x,e.focus.y=t.y,e.focus.z=t.z,e.fov=f,e.arm=o.dist;else{let n=o.smooth;e.focus.x+=(t.x-e.focus.x)*n,e.focus.y+=(t.y-e.focus.y)*n,e.focus.z+=(t.z-e.focus.z)*n,e.fov+=(f-e.fov)*n}e.yaw=n,e.pitch=u;let p=Math.sin(e.yaw),m=Math.cos(e.yaw),h=Math.sin(e.pitch),g=Math.cos(e.pitch),_=e.focus.x,v=e.focus.y+o.height,y=e.focus.z,b=_-p*g*o.dist+m*o.shoulder,x=v-h*o.dist,S=y+m*g*o.dist+p*o.shoulder,C=b-_,w=x-v,T=S-y,E=Math.sqrt(C*C+w*w+T*T),D=E;if(E>0){Xu.x=_,Xu.y=v-o.probeRadius,Xu.z=y,Zu.x=C,Zu.y=w,Zu.z=T;let e=1;for(let t=0;t<a.length;t++)d(Xu,qu*o.probeRadius,o.probeRadius,Zu,a[t],c),c.hit&&(c.t===0&&c.nx*C+c.ny*w+c.nz*T>=0||c.t<e&&(e=c.t));D=E*e}D<e.arm?e.arm=D:e.arm+=(D-e.arm)*o.armRelease,e.arm>E&&(e.arm=E);let O=E>0?e.arm/E:0;e.pos.x=_+C*O,e.pos.y=v+w*O,e.pos.z=y+T*O,e.lookAt.x=_,e.lookAt.y=v,e.lookAt.z=y}var ed=Math.PI/180;function td(e,t,n,r){return!e||n<0||Math.atan2(Math.abs(t),n)<r.zipYawMinDiagDeg*ed?0:(t>0?1:-1)*r.zipYawDeg*ed}function nd(e,t,n){let r=e+(t-e)*n.zipYawEase;return Math.abs(t-r)<1e-4?t:r}function rd(e,t){if(!(t.sideYawSpeed>0))return 0;let n=e/t.sideYawSpeed;return n>1&&(n=1),n<-1&&(n=-1),n*t.sideYawDeg*ed}function id(e,t,n){let r=e+(t-e)*n.sideYawEase;return Math.abs(t-r)<1e-4?t:r}function ad(e,t){return t>=.5?-e:Math.PI-e}var od=`attached`,sd=1e3,cd=1001,ld=1002,ud=1003,dd=1004,fd=1005,pd=1006,md=1007,hd=1008,gd=1009,_d=1010,vd=1011,yd=1012,bd=1013,xd=1014,Sd=1015,Cd=1016,wd=1017,Td=1018,Ed=1020,Dd=35902,Od=35899,kd=1021,Ad=1022,jd=1023,Md=1026,Nd=1027,Pd=1028,Fd=1029,Id=1030,Ld=1031,Rd=1033,zd=33776,Bd=33777,Vd=33778,Hd=33779,Ud=35840,Wd=35841,Gd=35842,Kd=35843,qd=36196,Jd=37492,Yd=37496,Xd=37488,Zd=37489,Qd=37490,$d=37491,ef=37808,tf=37809,nf=37810,rf=37811,af=37812,of=37813,sf=37814,cf=37815,lf=37816,uf=37817,df=37818,ff=37819,pf=37820,mf=37821,hf=36492,gf=36494,_f=36495,vf=36283,yf=36284,bf=36285,xf=36286,Sf=2300,Cf=2301,wf=2302,Tf=2303,Ef=2400,Df=2401,Of=2402,kf=3200,Af=`srgb`,jf=`srgb-linear`,Mf=`linear`,Nf=`srgb`,Pf=7680,Ff=35044,If=35048,Lf=2e3;function Rf(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function zf(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Bf(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Vf(){let e=Bf(`canvas`);return e.style.display=`block`,e}var Hf={};function Uf(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Wf(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function U(...e){e=Wf(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function W(...e){e=Wf(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Gf(...e){let t=e.join(` `);t in Hf||(Hf[t]=!0,U(...e))}function Kf(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var qf={0:0,2:6,4:4,3:5,1:1,6:2,7:7,5:3},Jf=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Yf=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Xf=Math.PI/180,Zf=180/Math.PI;function Qf(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Yf[e&255]+Yf[e>>8&255]+Yf[e>>16&255]+Yf[e>>24&255]+`-`+Yf[t&255]+Yf[t>>8&255]+`-`+Yf[t>>16&15|64]+Yf[t>>24&255]+`-`+Yf[n&63|128]+Yf[n>>8&255]+`-`+Yf[n>>16&255]+Yf[n>>24&255]+Yf[r&255]+Yf[r>>8&255]+Yf[r>>16&255]+Yf[r>>24&255]).toLowerCase()}function $f(e,t,n){return Math.max(t,Math.min(n,e))}function ep(e,t){return(e%t+t)%t}function tp(e,t,n){return(1-n)*e+n*t}function np(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function rp(e){switch(e.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function ip(e,t){if(t.constructor===Float32Array)return e;let n=rp(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.max(e/n,-1)}function ap(e,t){if(t.constructor===Float32Array)return e;let n=rp(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.round(e*n)}var G=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=$f(this.x,e.x,t.x),this.y=$f(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=$f(this.x,e,t),this.y=$f(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($f(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos($f(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},op=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:U(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($f(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},K=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(cp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(cp.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=$f(this.x,e.x,t.x),this.y=$f(this.y,e.y,t.y),this.z=$f(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=$f(this.x,e,t),this.y=$f(this.y,e,t),this.z=$f(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($f(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return sp.copy(this).projectOnVector(e),this.sub(sp)}reflect(e){return this.sub(sp.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos($f(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},sp=new K,cp=new op,q=class{static{this.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Gf(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(lp.makeScale(e,t)),this}rotate(e){return Gf(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(lp.makeRotation(-e)),this}translate(e,t){return Gf(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(lp.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},lp=new q,up=new q().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),dp=new q().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function fp(){let e={enabled:!0,workingColorSpace:jf,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=mp(e.r),e.g=mp(e.g),e.b=mp(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=hp(e.r),e.g=hp(e.g),e.b=hp(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Mf:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[n].fromXYZ).multiply(this.spaces[t].toXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[jf]:{primaries:t,whitePoint:r,transfer:Mf,toXYZ:up,fromXYZ:dp,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Af},outputColorSpaceConfig:{drawingBufferColorSpace:Af}},[Af]:{primaries:t,whitePoint:r,transfer:Nf,toXYZ:up,fromXYZ:dp,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Af}}}),e}var pp=fp();function mp(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function hp(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var gp,_p=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{gp===void 0&&(gp=Bf(`canvas`)),gp.width=e.width,gp.height=e.height;let t=gp.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=gp}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Bf(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=mp(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(mp(t[e]/255)*255):t[e]=mp(t[e]);return{data:t,width:e.width,height:e.height}}return U(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},vp=0,yp=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:vp++}),this.uuid=Qf(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width||0,t.height||0,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(bp(r[t].image)):e.push(bp(r[t]))}else e=bp(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function bp(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?_p.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(U(`Texture: Unable to serialize Texture.`),{})}var xp=0,Sp=new K,Cp=class e extends Jf{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=cd,i=cd,a=pd,o=hd,s=jd,c=gd,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xp++}),this.uuid=Qf(),this.name=``,this.source=new yp(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new G(0,0),this.repeat=new G(1,1),this.center=new G(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new q,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Sp).x}get height(){return this.source.getSize(Sp).y}get depth(){return this.source.getSize(Sp).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){U(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?U(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case sd:e.x-=Math.floor(e.x);break;case cd:e.x=e.x<0?0:1;break;case ld:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case sd:e.y-=Math.floor(e.y);break;case cd:e.y=e.y<0?0:1;break;case ld:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Cp.DEFAULT_IMAGE=null,Cp.DEFAULT_MAPPING=300,Cp.DEFAULT_ANISOTROPY=1;var wp=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=$f(this.x,e.x,t.x),this.y=$f(this.y,e.y,t.y),this.z=$f(this.z,e.z,t.z),this.w=$f(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=$f(this.x,e,t),this.y=$f(this.y,e,t),this.z=$f(this.z,e,t),this.w=$f(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar($f(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Tp=class extends Jf{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:pd,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new wp(0,0,e,t),this.scissorTest=!1,this.viewport=new wp(0,0,e,t),this.textures=[];let r=n.count;for(let i=0;i<r;i++)this.textures[i]=new Cp({width:e,height:t,depth:n.depth}),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:pd,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new yp(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Ep=class extends Tp{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Dp=class extends Cp{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=ud,this.minFilter=ud,this.wrapR=cd,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Op=class extends Cp{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=ud,this.minFilter=ud,this.wrapR=cd,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},J=class e{static{this.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/kp.setFromMatrixColumn(e,0).length(),i=1/kp.setFromMatrixColumn(e,1).length(),a=1/kp.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(jp,e,Mp)}lookAt(e,t,n){let r=this.elements;return Fp.subVectors(e,t),Fp.lengthSq()===0&&(Fp.z=1),Fp.normalize(),Np.crossVectors(n,Fp),Np.lengthSq()===0&&(Math.abs(n.z)===1?Fp.x+=1e-4:Fp.z+=1e-4,Fp.normalize(),Np.crossVectors(n,Fp)),Np.normalize(),Pp.crossVectors(Fp,Np),r[0]=Np.x,r[4]=Pp.x,r[8]=Fp.x,r[1]=Np.y,r[5]=Pp.y,r[9]=Fp.y,r[2]=Np.z,r[6]=Pp.z,r[10]=Fp.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],ee=r[7],te=r[11],P=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*ee,i[8]=a*C+o*D+s*j+c*te,i[12]=a*w+o*O+s*M+c*P,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*ee,i[9]=l*C+u*D+d*j+f*te,i[13]=l*w+u*O+d*M+f*P,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*ee,i[10]=p*C+m*D+h*j+g*te,i[14]=p*w+m*O+h*M+g*P,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*ee,i[11]=_*C+v*D+y*j+b*te,i[15]=_*w+v*O+y*M+b*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=kp.set(r[0],r[1],r[2]).length(),o=kp.set(r[4],r[5],r[6]).length(),s=kp.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Ap.copy(this);let c=1/a,l=1/o,u=1/s;return Ap.elements[0]*=c,Ap.elements[1]*=c,Ap.elements[2]*=c,Ap.elements[4]*=l,Ap.elements[5]*=l,Ap.elements[6]*=l,Ap.elements[8]*=u,Ap.elements[9]*=u,Ap.elements[10]*=u,t.setFromRotationMatrix(Ap),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Lf,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Lf,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},kp=new K,Ap=new J,jp=new K(0,0,0),Mp=new K(1,1,1),Np=new K,Pp=new K,Fp=new K,Ip=new J,Lp=new op,Rp=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin($f(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-$f(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin($f(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-$f(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin($f(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-$f(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:U(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ip.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ip,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Lp.setFromEuler(this),this.setFromQuaternion(Lp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Rp.DEFAULT_ORDER=`XYZ`;var zp=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},Bp=0,Vp=new K,Hp=new op,Up=new J,Wp=new K,Gp=new K,Kp=new K,qp=new op,Jp=new K(1,0,0),Yp=new K(0,1,0),Xp=new K(0,0,1),Zp={type:`added`},Qp={type:`removed`},$p={type:`childadded`,child:null},em={type:`childremoved`,child:null},tm=class e extends Jf{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Bp++}),this.uuid=Qf(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new K,n=new Rp,r=new op,i=new K(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new J},normalMatrix:{value:new q}}),this.matrix=new J,this.matrixWorld=new J,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Hp.setFromAxisAngle(e,t),this.quaternion.multiply(Hp),this}rotateOnWorldAxis(e,t){return Hp.setFromAxisAngle(e,t),this.quaternion.premultiply(Hp),this}rotateX(e){return this.rotateOnAxis(Jp,e)}rotateY(e){return this.rotateOnAxis(Yp,e)}rotateZ(e){return this.rotateOnAxis(Xp,e)}translateOnAxis(e,t){return Vp.copy(e).applyQuaternion(this.quaternion),this.position.add(Vp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Jp,e)}translateY(e){return this.translateOnAxis(Yp,e)}translateZ(e){return this.translateOnAxis(Xp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Up.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Wp.copy(e):Wp.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Gp.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Up.lookAt(Gp,Wp,this.up):Up.lookAt(Wp,Gp,this.up),this.quaternion.setFromRotationMatrix(Up),r&&(Up.extractRotation(r.matrixWorld),Hp.setFromRotationMatrix(Up),this.quaternion.premultiply(Hp.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(W(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Zp),$p.child=e,this.dispatchEvent($p),$p.child=null):W(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qp),em.child=e,this.dispatchEvent(em),em.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Up.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Up.multiply(e.parent.matrixWorld)),e.applyMatrix4(Up),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Zp),$p.child=e,this.dispatchEvent($p),$p.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gp,e,Kp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gp,qp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};tm.DEFAULT_UP=new K(0,1,0),tm.DEFAULT_MATRIX_AUTO_UPDATE=!0,tm.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var nm=class extends tm{constructor(){super(),this.isGroup=!0,this.type=`Group`}},rm={type:`move`},im=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new nm,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new nm,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new nm,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.quaternion,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.quaternion,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(rm)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new nm;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},am={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},om={h:0,s:0,l:0},sm={h:0,s:0,l:0};function cm(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Y=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Af){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,pp.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=pp.workingColorSpace){return this.r=e,this.g=t,this.b=n,pp.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=pp.workingColorSpace){if(e=ep(e,1),t=$f(t,0,1),n=$f(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=cm(i,r,e+1/3),this.g=cm(i,r,e),this.b=cm(i,r,e-1/3)}return pp.colorSpaceToWorking(this,r),this}setStyle(e,t=Af){function n(t){t!==void 0&&parseFloat(t)<1&&U(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseFloat(i[1]))/100,Math.min(100,parseFloat(i[2]))/100,Math.min(100,parseFloat(i[3]))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:U(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);U(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Af){let n=am[e.toLowerCase()];return n===void 0?U(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=mp(e.r),this.g=mp(e.g),this.b=mp(e.b),this}copyLinearToSRGB(e){return this.r=hp(e.r),this.g=hp(e.g),this.b=hp(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Af){return pp.workingToColorSpace(lm.copy(this),e),Math.round($f(lm.r*255,0,255))*65536+Math.round($f(lm.g*255,0,255))*256+Math.round($f(lm.b*255,0,255))}getHexString(e=Af){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=pp.workingColorSpace){pp.workingToColorSpace(lm.copy(this),t);let n=lm.r,r=lm.g,i=lm.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=pp.workingColorSpace){return pp.workingToColorSpace(lm.copy(this),t),e.r=lm.r,e.g=lm.g,e.b=lm.b,e}getStyle(e=Af){pp.workingToColorSpace(lm.copy(this),e);let t=lm.r,n=lm.g,r=lm.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(om),this.setHSL(om.h+e,om.s+t,om.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(om),e.getHSL(sm);let n=tp(om.h,sm.h,t),r=tp(om.s,sm.s,t),i=tp(om.l,sm.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},lm=new Y;Y.NAMES=am;var um=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new Y(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},dm=class extends tm{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Rp,this.environmentIntensity=1,this.environmentRotation=new Rp,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background===null?null:e.background.clone(),this.environment=e.environment===null?null:e.environment.clone(),this.fog=e.fog===null?null:e.fog.clone(),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial===null?null:e.overrideMaterial.clone(),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},fm=new K,pm=new K,mm=new K,hm=new K,gm=new K,_m=new K,vm=new K,ym=new K,bm=new K,xm=new K,Sm=new wp,Cm=new wp,wm=new wp,Tm=class e{constructor(e=new K,t=new K,n=new K){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),fm.subVectors(e,t),r.cross(fm);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){fm.subVectors(r,t),pm.subVectors(n,t),mm.subVectors(e,t);let a=fm.dot(fm),o=fm.dot(pm),s=fm.dot(mm),c=pm.dot(pm),l=pm.dot(mm),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,hm)!==null&&hm.x>=0&&hm.y>=0&&hm.x+hm.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,hm)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,hm.x),s.addScaledVector(a,hm.y),s.addScaledVector(o,hm.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Sm.setScalar(0),Cm.setScalar(0),wm.setScalar(0),Sm.fromBufferAttribute(e,t),Cm.fromBufferAttribute(e,n),wm.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Sm,i.x),a.addScaledVector(Cm,i.y),a.addScaledVector(wm,i.z),a}static isFrontFacing(e,t,n,r){return fm.subVectors(n,t),pm.subVectors(e,t),fm.cross(pm).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return fm.subVectors(this.c,this.b),pm.subVectors(this.a,this.b),fm.cross(pm).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;gm.subVectors(r,n),_m.subVectors(i,n),ym.subVectors(e,n);let s=gm.dot(ym),c=_m.dot(ym);if(s<=0&&c<=0)return t.copy(n);bm.subVectors(e,r);let l=gm.dot(bm),u=_m.dot(bm);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0&&s-l>0)return a=s/(s-l),t.copy(n).addScaledVector(gm,a);xm.subVectors(e,i);let f=gm.dot(xm),p=_m.dot(xm);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(_m,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return vm.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(vm,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(gm,a).addScaledVector(_m,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Em=class{constructor(e=new K(1/0,1/0,1/0),t=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Om.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Om.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Om.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Om):Om.fromBufferAttribute(r,t),Om.applyMatrix4(e.matrixWorld),this.expandByPoint(Om);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),km.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),km.copy(e.boundingBox)),km.applyMatrix4(e.matrixWorld),this.union(km)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Om),Om.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Im),Lm.subVectors(this.max,Im),Am.subVectors(e.a,Im),jm.subVectors(e.b,Im),Mm.subVectors(e.c,Im),Nm.subVectors(jm,Am),Pm.subVectors(Mm,jm),Fm.subVectors(Am,Mm);let t=[0,-Nm.z,Nm.y,0,-Pm.z,Pm.y,0,-Fm.z,Fm.y,Nm.z,0,-Nm.x,Pm.z,0,-Pm.x,Fm.z,0,-Fm.x,-Nm.y,Nm.x,0,-Pm.y,Pm.x,0,-Fm.y,Fm.x,0];return!Bm(t,Am,jm,Mm,Lm)||(t=[1,0,0,0,1,0,0,0,1],!Bm(t,Am,jm,Mm,Lm))?!1:(Rm.crossVectors(Nm,Pm),t=[Rm.x,Rm.y,Rm.z],Bm(t,Am,jm,Mm,Lm))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Om).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Om).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Dm[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Dm[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Dm[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Dm[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Dm[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Dm[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Dm[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Dm[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Dm)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Dm=[new K,new K,new K,new K,new K,new K,new K,new K],Om=new K,km=new Em,Am=new K,jm=new K,Mm=new K,Nm=new K,Pm=new K,Fm=new K,Im=new K,Lm=new K,Rm=new K,zm=new K;function Bm(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){zm.fromArray(e,a);let o=i.x*Math.abs(zm.x)+i.y*Math.abs(zm.y)+i.z*Math.abs(zm.z),s=t.dot(zm),c=n.dot(zm),l=r.dot(zm);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Vm=new K,Hm=new G,Um=0,Wm=class extends Jf{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Um++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Ff,this.updateRanges=[],this.gpuType=Sd,this.version=0,this._normalizationScale=e===void 0?void 0:rp(e)}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Hm.fromBufferAttribute(this,t),Hm.applyMatrix3(e),this.setXY(t,Hm.x,Hm.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Vm.fromBufferAttribute(this,t),Vm.applyMatrix3(e),this.setXYZ(t,Vm.x,Vm.y,Vm.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Vm.fromBufferAttribute(this,t),Vm.applyMatrix4(e),this.setXYZ(t,Vm.x,Vm.y,Vm.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Vm.fromBufferAttribute(this,t),Vm.applyNormalMatrix(e),this.setXYZ(t,Vm.x,Vm.y,Vm.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Vm.fromBufferAttribute(this,t),Vm.transformDirection(e),this.setXYZ(t,Vm.x,Vm.y,Vm.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}_denormalize(e){let t=this._normalizationScale;return t===void 0?ip(e,this.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?ap(e,this.array):Math.round(e*t)}},Gm=class extends Wm{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Km=class extends Wm{constructor(e,t,n){super(new Uint32Array(e),t,n)}},X=class extends Wm{constructor(e,t,n){super(new Float32Array(e),t,n)}},qm=new Em,Jm=new K,Ym=new K,Xm=class{constructor(e=new K,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?qm.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Jm.subVectors(e,this.center);let t=Jm.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Jm,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ym.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Jm.copy(e.center).add(Ym)),this.expandByPoint(Jm.copy(e.center).sub(Ym))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Zm=0,Qm=new J,$m=new tm,eh=new K,th=new Em,nh=new Em,rh=new K,ih=class e extends Jf{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zm++}),this.uuid=Qf(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Rf(e)?Km:Gm)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new q().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Qm.makeRotationFromQuaternion(e),this.applyMatrix4(Qm),this}rotateX(e){return Qm.makeRotationX(e),this.applyMatrix4(Qm),this}rotateY(e){return Qm.makeRotationY(e),this.applyMatrix4(Qm),this}rotateZ(e){return Qm.makeRotationZ(e),this.applyMatrix4(Qm),this}translate(e,t,n){return Qm.makeTranslation(e,t,n),this.applyMatrix4(Qm),this}scale(e,t,n){return Qm.makeScale(e,t,n),this.applyMatrix4(Qm),this}lookAt(e){return $m.lookAt(e),$m.updateMatrix(),this.applyMatrix4($m.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(eh).negate(),this.translate(eh.x,eh.y,eh.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new X(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&U(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Em);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)W(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];th.setFromBufferAttribute(n),this.morphTargetsRelative?(rh.addVectors(this.boundingBox.min,th.min),this.boundingBox.expandByPoint(rh),rh.addVectors(this.boundingBox.max,th.max),this.boundingBox.expandByPoint(rh)):(this.boundingBox.expandByPoint(th.min),this.boundingBox.expandByPoint(th.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&W(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Xm);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)W(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new K,1/0);else if(e){let n=this.boundingSphere.center;if(th.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];nh.setFromBufferAttribute(n),this.morphTargetsRelative?(rh.addVectors(th.min,nh.min),th.expandByPoint(rh),rh.addVectors(th.max,nh.max),th.expandByPoint(rh)):(th.expandByPoint(nh.min),th.expandByPoint(nh.max))}th.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)rh.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(rh));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)rh.fromBufferAttribute(a,t),o&&(eh.fromBufferAttribute(e,t),rh.add(eh)),r=Math.max(r,n.distanceToSquared(rh))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&W(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){W(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new Wm(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[],c=new Uint8Array(n.count);for(let e=0;e<n.count;e++)o[e]=new K,s[e]=new K;let l=new K,u=new K,d=new K,f=new G,p=new G,m=new G,h=new K,g=new K;function _(e,t,r){c[e]=c[t]=c[r]=1,l.fromBufferAttribute(n,e),u.fromBufferAttribute(n,t),d.fromBufferAttribute(n,r),f.fromBufferAttribute(i,e),p.fromBufferAttribute(i,t),m.fromBufferAttribute(i,r),u.sub(l),d.sub(l),p.sub(f),m.sub(f);let a=1/(p.x*m.y-m.x*p.y);isFinite(a)&&(h.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(a),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(a),o[e].add(h),o[t].add(h),o[r].add(h),s[e].add(g),s[t].add(g),s[r].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let t=0,n=v.length;t<n;++t){let n=v[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)_(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let y=new K,b=new K,x=new K,S=new K;function C(e){x.fromBufferAttribute(r,e),S.copy(x);let t=o[e];y.copy(t),y.sub(x.multiplyScalar(x.dot(t))).normalize(),b.crossVectors(S,t);let n=b.dot(s[e])<0?-1:1;a.setXYZW(e,y.x,y.y,y.z,n)}for(let e=0,t=n.count;e<t;++e)c[e]&&C(e);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new Wm(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new K,i=new K,a=new K,o=new K,s=new K,c=new K,l=new K,u=new K;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)rh.fromBufferAttribute(e,t),rh.normalize(),e.setXYZ(t,rh.x,rh.y,rh.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Wm(a,r,i)}if(this.index===null)return U(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},ah=new K,oh=new K,sh=new q,ch=class{constructor(e=new K(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=ah.subVectors(n,t).cross(oh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(ah),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||sh.getNormalMatrix(e),r=this.coplanarPoint(ah).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},lh=0,uh=class extends Jf{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:lh++}),this.uuid=Qf(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Y(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pf,this.stencilZFail=Pf,this.stencilZPass=Pf,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){U(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?U(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Y().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new ch().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new G().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new G().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},dh=new K,fh=new K,ph=new K,mh=new K,hh=class{constructor(e=new K,t=new K(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,dh)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=dh.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(dh.copy(this.origin).addScaledVector(this.direction,t),dh.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){fh.copy(e).add(t).multiplyScalar(.5),ph.copy(t).sub(e).normalize(),mh.copy(this.origin).sub(fh);let i=e.distanceTo(t)*.5,a=-this.direction.dot(ph),o=mh.dot(this.direction),s=-mh.dot(ph),c=mh.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(fh).addScaledVector(ph,d),f}intersectSphere(e,t){if(e.radius<0)return null;dh.subVectors(e.center,this.origin);let n=dh.dot(this.direction),r=dh.dot(dh)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,dh)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let ee=S/w,te=C/w,P=1/w,ne=T-ee*D,re=E-te*D,ie=O-ee*A,ae=k-te*A,oe=j-ee*N,se=M-te*N,ce=oe*ae-se*ie,le=ne*se-re*oe,ue=ie*re-ae*ne;if(r){if(ce<0||le<0||ue<0)return null}else if((ce<0||le<0||ue<0)&&(ce>0||le>0||ue>0))return null;let de=ce+le+ue;if(de===0)return null;let fe=P*(ce*D+le*A+ue*N);return(de>0?fe<0:fe>0)?null:this.at(fe/de,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},gh=class extends uh{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new Y(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rp,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},_h=new J,vh=new hh,yh=new Xm,bh=new K,xh=new K,Sh=new K,Ch=new K,wh=new K,Th=new K,Eh=new K,Dh=new K,Z=class extends tm{constructor(e=new ih,t=new gh){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Th.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(wh.fromBufferAttribute(s,e),a?Th.addScaledVector(wh,r):Th.addScaledVector(wh.sub(t),r))}t.add(Th)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),yh.copy(n.boundingSphere),yh.applyMatrix4(i),vh.copy(e.ray).recast(e.near),yh.containsPoint(vh.origin)===!1&&(vh.intersectSphere(yh,bh)===null||vh.origin.distanceToSquared(bh)>(e.far-e.near)**2)||(_h.copy(i).invert(),vh.copy(e.ray).applyMatrix4(_h),(n.boundingBox===null||vh.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,vh)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=kh(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=kh(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=kh(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=kh(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Oh(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Dh.copy(s),Dh.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Dh);return l<n.near||l>n.far?null:{distance:l,point:Dh.clone(),object:e}}function kh(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,xh),e.getVertexPosition(c,Sh),e.getVertexPosition(l,Ch);let u=Oh(e,t,n,r,xh,Sh,Ch,Eh);if(u){let e=new K;Tm.getBarycoord(Eh,xh,Sh,Ch,e),i&&(u.uv=Tm.getInterpolatedAttribute(i,s,c,l,e,new G)),a&&(u.uv1=Tm.getInterpolatedAttribute(a,s,c,l,e,new G)),o&&(u.normal=Tm.getInterpolatedAttribute(o,s,c,l,e,new K),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new K,materialIndex:0};Tm.getNormal(xh,Sh,Ch,t.normal),u.face=t,u.barycoord=e}return u}var Ah=new wp,jh=new wp,Mh=new wp,Nh=new wp,Ph=new J,Fh=new K,Ih=new Xm,Lh=new J,Rh=new hh,zh=class extends Z{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type=`SkinnedMesh`,this.bindMode=od,this.bindMatrix=new J,this.bindMatrixInverse=new J,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Em),this.boundingBox.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,Fh),this.boundingBox.expandByPoint(Fh)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Xm),this.boundingSphere.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,Fh),this.boundingSphere.expandByPoint(Fh)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this.boundingBox=e.boundingBox===null?null:e.boundingBox.clone(),this.boundingSphere=e.boundingSphere===null?null:e.boundingSphere.clone(),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ih.copy(this.boundingSphere),Ih.applyMatrix4(r),e.ray.intersectsSphere(Ih)!==!1&&(Lh.copy(r).invert(),Rh.copy(e.ray).applyMatrix4(Lh),(this.boundingBox===null||Rh.intersectsBox(this.boundingBox)!==!1)&&this._computeIntersections(e,t,Rh)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new wp,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r===1/0?e.set(1,0,0,0):e.multiplyScalar(r),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===`attached`?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===`detached`?this.bindMatrixInverse.copy(this.bindMatrix).invert():U(`SkinnedMesh: Unrecognized bindMode: `+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;jh.fromBufferAttribute(r.attributes.skinIndex,e),Mh.fromBufferAttribute(r.attributes.skinWeight,e),t.isVector4?(Ah.copy(t),t.set(0,0,0,0)):(Ah.set(t.x,t.y,t.z,1),t.set(0,0,0)),Ah.applyMatrix4(this.bindMatrix);for(let e=0;e<4;e++){let r=Mh.getComponent(e);if(r!==0){let i=jh.getComponent(e);Ph.multiplyMatrices(n.bones[i].matrixWorld,n.boneInverses[i]),t.addScaledVector(Nh.copy(Ah).applyMatrix4(Ph),r)}}return t.isVector4&&(t.w=Ah.w),t.applyMatrix4(this.bindMatrixInverse)}},Bh=class extends tm{constructor(){super(),this.isBone=!0,this.type=`Bone`}},Vh=class extends Cp{constructor(e=null,t=1,n=1,r,i,a,o,s,c=ud,l=ud,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Hh=new J,Uh=new J,Wh=class e{constructor(e=[],t=[]){this.uuid=Qf(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.previousBoneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){U(`Skeleton: Number of inverse bone matrices does not match amount of bones.`),this.boneInverses=[];for(let e=0,t=this.bones.length;e<t;e++)this.boneInverses.push(new J)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let t=new J;this.bones[e]&&t.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(t)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&t.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&(t.parent&&t.parent.isBone?(t.matrix.copy(t.parent.matrixWorld).invert(),t.matrix.multiply(t.matrixWorld)):t.matrix.copy(t.matrixWorld),t.matrix.decompose(t.position,t.quaternion,t.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let r=0,i=e.length;r<i;r++){let i=e[r]?e[r].matrixWorld:Uh;Hh.multiplyMatrices(i,t[r]),Hh.toArray(n,r*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new e(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Vh(t,e,e,jd,Sd);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null),this.previousBoneTexture!==null&&(this.previousBoneTexture.dispose(),this.previousBoneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let r=e.bones[n],i=t[r];i===void 0&&(U(`Skeleton: No bone found with UUID:`,r),i=new Bh),this.bones.push(i),this.boneInverses.push(new J().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:`Skeleton`,generator:`Skeleton.toJSON`},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,i=t.length;r<i;r++){let i=t[r];e.bones.push(i.uuid);let a=n[r];e.boneInverses.push(a.toArray())}return e}},Gh=class extends Wm{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Kh=new J,qh=new J,Jh=[],Yh=new Em,Xh=new J,Zh=new Z,Qh=new Xm,$h=class extends Z{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Gh(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Xh)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Em),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Kh),Yh.copy(e.boundingBox).applyMatrix4(Kh),this.boundingBox.union(Yh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Xm),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Kh),Qh.copy(e.boundingSphere).applyMatrix4(Kh),this.boundingSphere.union(Qh)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture===null?null:e.morphTexture.clone(),this.instanceColor=e.instanceColor===null?null:e.instanceColor.clone(),this.count=e.count,this.boundingBox=e.boundingBox===null?null:e.boundingBox.clone(),this.boundingSphere=e.boundingSphere===null?null:e.boundingSphere.clone(),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Zh.geometry=this.geometry,Zh.material=this.material,Zh.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qh.copy(this.boundingSphere),Qh.applyMatrix4(n),e.ray.intersectsSphere(Qh)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Kh),qh.multiplyMatrices(n,Kh),Zh.matrixWorld=qh,Zh.raycast(e,Jh);for(let e=0,n=Jh.length;e<n;e++){let n=Jh[e];n.instanceId=i,n.object=this,t.push(n)}Jh.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Gh(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Vh(new Float32Array(r*this.count),r,this.count,Pd,Sd));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},eg=new Xm,tg=new G(.5,.5),ng=new K,rg=class{constructor(e=new ch,t=new ch,n=new ch,r=new ch,i=new ch,a=new ch){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Lf,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),eg.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),eg.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(eg)}intersectsSprite(e){return eg.center.set(0,0,0),eg.radius=.7071067811865476+tg.distanceTo(e.center),eg.applyMatrix4(e.matrixWorld),this.intersectsSphere(eg)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(ng.x=r.normal.x>0?e.max.x:e.min.x,ng.y=r.normal.y>0?e.max.y:e.min.y,ng.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ng)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},ig=new J,ag=class e{constructor(){this.coordinateSystem=Lf,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let e=0;e<t.length;e++){let r=t[e];ig.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[e]===void 0&&(n[e]=new rg),n[e].setFromProjectionMatrix(ig,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new rg),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new e().copy(this)}},og=class extends uh{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new Y(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},sg=new K,cg=new K,lg=new J,ug=new hh,dg=new Xm,fg=new K,pg=new K,mg=class extends tm{constructor(e=new ih,t=new og){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)sg.fromBufferAttribute(t,e-1),cg.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=sg.distanceTo(cg);e.setAttribute(`lineDistance`,new X(n,1))}else U(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),dg.copy(n.boundingSphere),dg.applyMatrix4(r),dg.radius+=i,e.ray.intersectsSphere(dg)===!1)return;lg.copy(r).invert(),ug.copy(e.ray).applyMatrix4(lg);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=hg(this,e,ug,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=hg(this,e,ug,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=hg(this,e,ug,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=hg(this,e,ug,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function hg(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(sg.fromBufferAttribute(s,i),cg.fromBufferAttribute(s,a),n.distanceSqToSegment(sg,cg,fg,pg)>r)return;fg.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(fg);if(!(c<t.near||c>t.far))return{distance:c,point:pg.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var gg=new K,_g=new K,vg=class extends mg{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)gg.fromBufferAttribute(t,e),_g.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+gg.distanceTo(_g);e.setAttribute(`lineDistance`,new X(n,1))}else U(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},yg=class extends uh{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new Y(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},bg=new J,xg=new hh,Sg=new Xm,Cg=new K,wg=class extends tm{constructor(e=new ih,t=new yg){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Sg.copy(n.boundingSphere),Sg.applyMatrix4(r),Sg.radius+=i,e.ray.intersectsSphere(Sg)===!1)return;bg.copy(r).invert(),xg.copy(e.ray).applyMatrix4(bg);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Cg.fromBufferAttribute(l,n),Tg(Cg,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Cg.fromBufferAttribute(l,a),Tg(Cg,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Tg(e,t,n,r,i,a,o){let s=xg.distanceSqToPoint(e);if(s<n){let n=new K;xg.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Eg=class extends Cp{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Dg=class extends Cp{constructor(e,t,n=xd,r,i,a,o=ud,s=ud,c,l=Md,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new yp(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Og=class extends Dg{constructor(e,t=xd,n=301,r,i,a=ud,o=ud,s,c=Md){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},kg=class extends Cp{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ag=class e extends ih{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new X(c,3)),this.setAttribute(`normal`,new X(l,3)),this.setAttribute(`uv`,new X(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new K;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},jg=class e extends ih{constructor(e=1,t=1,n=4,r=8,i=1){super(),this.type=`CapsuleGeometry`,this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:i},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),i=Math.max(1,Math.floor(i));let a=[],o=[],s=[],c=[],l=t/2,u=Math.PI/2*e,d=t,f=2*u+d,p=n*2+i,m=r+1,h=new K,g=new K;for(let _=0;_<=p;_++){let v=0,y=0,b=0,x=0;if(_<=n){let t=_/n,r=t*Math.PI/2;y=-l-e*Math.cos(r),b=e*Math.sin(r),x=-e*Math.cos(r),v=t*u}else if(_<=n+i){let r=(_-n)/i;y=-l+r*t,b=e,x=0,v=u+r*d}else{let t=(_-n-i)/n,r=t*Math.PI/2;y=l+e*Math.sin(r),b=e*Math.cos(r),x=e*Math.sin(r),v=u+d+t*u}let S=Math.max(0,Math.min(1,v/f)),C=0;_===0?C=.5/r:_===p&&(C=-.5/r);for(let e=0;e<=r;e++){let t=e/r,n=t*Math.PI*2,i=Math.sin(n),a=Math.cos(n);g.x=-b*a,g.y=y,g.z=b*i,o.push(g.x,g.y,g.z),h.set(-b*a,x,b*i),h.normalize(),s.push(h.x,h.y,h.z),c.push(t+C,S)}if(_>0){let e=(_-1)*m;for(let t=0;t<r;t++){let n=e+t,r=e+t+1,i=_*m+t,o=_*m+t+1;a.push(n,r,i),a.push(r,o,i)}}}this.setIndex(a),this.setAttribute(`position`,new X(o,3)),this.setAttribute(`normal`,new X(s,3)),this.setAttribute(`uv`,new X(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},Mg=class e extends ih{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new K,l=new G;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new X(a,3)),this.setAttribute(`normal`,new X(o,3)),this.setAttribute(`uv`,new X(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Ng=class e extends ih{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new X(u,3)),this.setAttribute(`normal`,new X(d,3)),this.setAttribute(`uv`,new X(f,2));function _(){let a=new K,_=new K,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new G,m=new K,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Pg=class e extends Ng{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Fg=class e extends ih{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new X(i,3)),this.setAttribute(`normal`,new X(i.slice(),3)),this.setAttribute(`uv`,new X(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new K,r=new K,i=new K;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new K;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new K;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new K,t=new K,n=new K,r=new K,o=new G,s=new G,c=new G;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Ig=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){U(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new G:new K);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new K,r=[],i=[],a=[],o=new K,s=new J;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new K)}i[0]=new K,a[0]=new K;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos($f(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos($f(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},Lg=class extends Ig{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new G){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Rg=class extends Lg{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function zg(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var Bg=new K,Vg=new K,Hg=new zg,Ug=new zg,Wg=new zg,Gg=class extends Ig{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new K){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(Vg.subVectors(r[0],r[1]).add(r[0]),c=Vg);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(Bg.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=Bg),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Hg.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Ug.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Wg.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(Hg.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Ug.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Wg.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(Hg.calc(s),Ug.calc(s),Wg.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new K().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Kg(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function qg(e,t){let n=1-e;return n*n*t}function Jg(e,t){return 2*(1-e)*e*t}function Yg(e,t){return e*e*t}function Xg(e,t,n,r){return qg(e,t)+Jg(e,n)+Yg(e,r)}function Zg(e,t){let n=1-e;return n*n*n*t}function Qg(e,t){let n=1-e;return 3*n*n*e*t}function $g(e,t){return 3*(1-e)*e*e*t}function e_(e,t){return e*e*e*t}function t_(e,t,n,r,i){return Zg(e,t)+Qg(e,n)+$g(e,r)+e_(e,i)}var n_=class extends Ig{constructor(e=new G,t=new G,n=new G,r=new G){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new G){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(t_(e,r.x,i.x,a.x,o.x),t_(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},r_=class extends Ig{constructor(e=new K,t=new K,n=new K,r=new K){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new K){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(t_(e,r.x,i.x,a.x,o.x),t_(e,r.y,i.y,a.y,o.y),t_(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},i_=class extends Ig{constructor(e=new G,t=new G){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new G){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new G){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},a_=class extends Ig{constructor(e=new K,t=new K){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new K){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new K){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},o_=class extends Ig{constructor(e=new G,t=new G,n=new G){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new G){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Xg(e,r.x,i.x,a.x),Xg(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},s_=class extends Ig{constructor(e=new K,t=new K,n=new K){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new K){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Xg(e,r.x,i.x,a.x),Xg(e,r.y,i.y,a.y),Xg(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},c_=Object.freeze({__proto__:null,ArcCurve:Rg,CatmullRomCurve3:Gg,CubicBezierCurve:n_,CubicBezierCurve3:r_,EllipseCurve:Lg,LineCurve:i_,LineCurve3:a_,QuadraticBezierCurve:o_,QuadraticBezierCurve3:s_,SplineCurve:class extends Ig{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new G){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Kg(o,s.x,c.x,l.x,u.x),Kg(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new G().fromArray(n))}return this}}}),l_=class e extends Fg{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},u_=class e extends ih{constructor(e=[new G(0,-.5),new G(.5,0),new G(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=$f(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new K,d=new G,f=new K,p=new K,m=new K,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:m.normalize(),s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new X(a,3)),this.setAttribute(`uv`,new X(o,2)),this.setAttribute(`normal`,new X(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},d_=class e extends ih{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new X(p,3)),this.setAttribute(`normal`,new X(m,3)),this.setAttribute(`uv`,new X(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},f_=class e extends ih{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new K,p=new G;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new X(s,3)),this.setAttribute(`normal`,new X(c,3)),this.setAttribute(`uv`,new X(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},p_=class e extends ih{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new K,d=new K,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new X(p,3)),this.setAttribute(`normal`,new X(m,3)),this.setAttribute(`uv`,new X(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},m_=class e extends ih{constructor(e=new s_(new K(-1,-1,0),new K(-1,1,0),new K(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new K,s=new K,c=new G,l=new K,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new X(u,3)),this.setAttribute(`normal`,new X(d,3)),this.setAttribute(`uv`,new X(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new c_[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function h_(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(__(i))i.isRenderTargetTexture?(U(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(__(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function g_(e){let t={};for(let n=0;n<e.length;n++){let r=h_(e[n]);for(let e in r)t[e]=r[e]}return t}function __(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function v_(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function y_(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:pp.workingColorSpace}var b_={clone:h_,merge:g_},x_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,S_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,C_=class extends uh{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=x_,this.fragmentShader=S_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=h_(e.uniforms),this.uniformsGroups=v_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new Y().setHex(r.value);break;case`v2`:this.uniforms[n].value=new G().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new K().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new wp().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new q().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new J().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},w_=class extends C_{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},T_=class extends uh{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new Y(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new G(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rp,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},E_=class extends uh{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new Y(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new G(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rp,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},D_=class extends uh{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=kf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},O_=class extends uh{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function k_(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function A_(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var j_=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},M_=class extends j_{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ef,endingEnd:Ef}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Df:i=e,o=2*t-n;break;case Of:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Df:a=e,s=2*n-t;break;case Of:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},N_=class extends j_{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},P_=class extends j_{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},F_=class extends j_{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=R_(n,t,g,y,r);i[p]=I_(x,o,_,b,m)}return i}};function I_(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function L_(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function R_(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=I_(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=L_(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var z_=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=k_(t,this.TimeBufferType),this.values=k_(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:k_(e.times,Array),values:k_(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),A_(e.settings)&&(n.settings={inTangents:k_(e.settings.inTangents,Array),outTangents:k_(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new P_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new N_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new M_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new F_(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Sf:t=this.InterpolantFactoryMethodDiscrete;break;case Cf:t=this.InterpolantFactoryMethodLinear;break;case wf:t=this.InterpolantFactoryMethodSmooth;break;case Tf:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return U(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Sf;case this.InterpolantFactoryMethodLinear:return Cf;case this.InterpolantFactoryMethodSmooth:return wf;case this.InterpolantFactoryMethodBezier:return Tf}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e;A_(this.settings)&&(B_(this.settings.inTangents,e),B_(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;A_(this.settings)&&(V_(this.settings.inTangents,e),V_(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(W(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(W(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){W(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){W(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&zf(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){W(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===wf,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,A_(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function B_(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]+=t}function V_(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}z_.prototype.ValueTypeName=``,z_.prototype.TimeBufferType=Float32Array,z_.prototype.ValueBufferType=Float32Array,z_.prototype.DefaultInterpolation=Cf;var H_=class extends z_{constructor(e,t,n){super(e,t,n)}};H_.prototype.ValueTypeName=`bool`,H_.prototype.ValueBufferType=Array,H_.prototype.DefaultInterpolation=Sf,H_.prototype.InterpolantFactoryMethodLinear=void 0,H_.prototype.InterpolantFactoryMethodSmooth=void 0;var U_=class extends z_{constructor(e,t,n,r){super(e,t,n,r)}};U_.prototype.ValueTypeName=`color`;var W_=class extends z_{constructor(e,t,n,r){super(e,t,n,r)}};W_.prototype.ValueTypeName=`number`;var G_=class extends j_{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)op.slerpFlat(i,0,a,c-o,a,c,s);return i}},K_=class extends z_{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new G_(this.times,this.values,this.getValueSize(),e)}};K_.prototype.ValueTypeName=`quaternion`,K_.prototype.InterpolantFactoryMethodSmooth=void 0;var q_=class extends z_{constructor(e,t,n){super(e,t,n)}};q_.prototype.ValueTypeName=`string`,q_.prototype.ValueBufferType=Array,q_.prototype.DefaultInterpolation=Sf,q_.prototype.InterpolantFactoryMethodLinear=void 0,q_.prototype.InterpolantFactoryMethodSmooth=void 0;var J_=class extends z_{constructor(e,t,n,r){super(e,t,n,r)}};J_.prototype.ValueTypeName=`vector`;var Y_={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(X_(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!X_(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function X_(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var Z_=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},Q_=class{constructor(e){this.manager=e===void 0?Z_:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},this.priority=`auto`,this.cache=`default`,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};Q_.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var $_=new WeakMap,ev=class extends Q_{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=Y_.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=$_.get(a);e===void 0&&(e=[],$_.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=Bf(`img`);function s(){l(),t&&t(this);let n=$_.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}$_.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),Y_.remove(`image:${e}`);let n=$_.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}$_.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Y_.add(`image:${e}`,o),i.manager.itemStart(e),o.fetchPriority=this.priority,o.src=e,o}},tv=class extends Q_{constructor(e){super(e)}load(e,t,n,r){let i=new Cp,a=new ev(this.manager);return a.setPriority(this.priority),a.setCache(this.cache),a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},nv=class extends tm{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new Y(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},rv=class extends nv{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(tm.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Y(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},iv=new J,av=new K,ov=new K,sv=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new G(512,512),this.mapType=gd,this.map=null,this.mapPass=null,this.matrix=new J,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new rg,this._frameExtents=new G(1,1),this._viewportCount=1,this._viewports=[new wp(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;av.setFromMatrixPosition(e.matrixWorld),t.position.copy(av),ov.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ov),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){iv.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(iv,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(iv)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},cv=new K,lv=new op,uv=new K,dv=class extends tm{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new J,this.projectionMatrix=new J,this.projectionMatrixInverse=new J,this.coordinateSystem=Lf,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(cv,lv,uv),uv.x===1&&uv.y===1&&uv.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(cv,lv,uv.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(cv,lv,uv),uv.x===1&&uv.y===1&&uv.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(cv,lv,uv.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},fv=new K,pv=new G,mv=new G,hv=class extends dv{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Zf*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Xf*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Zf*2*Math.atan(Math.tan(Xf*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){fv.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(fv.x,fv.y).multiplyScalar(-e/fv.z),fv.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(fv.x,fv.y).multiplyScalar(-e/fv.z)}getViewSize(e,t){return this.getViewBounds(e,pv,mv),t.subVectors(mv,pv)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Xf*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},gv=class extends dv{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},_v=class extends sv{constructor(){super(new gv(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},vv=class extends nv{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(tm.DEFAULT_UP),this.updateMatrix(),this.target=new tm,this.shadow=new _v}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},yv=-90,bv=1,xv=class extends tm{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new hv(yv,bv,e,t);r.layers=this.layers,this.add(r);let i=new hv(yv,bv,e,t);i.layers=this.layers,this.add(i);let a=new hv(yv,bv,e,t);a.layers=this.layers,this.add(a);let o=new hv(yv,bv,e,t);o.layers=this.layers,this.add(o);let s=new hv(yv,bv,e,t);s.layers=this.layers,this.add(s);let c=new hv(yv,bv,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Sv=class extends hv{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},Cv=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=wv.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function wv(){this._document.hidden===!1&&this.reset()}var Tv=`\\[\\]\\.:\\/`,Ev=RegExp(`[\\[\\]\\.:\\/]`,`g`),Dv=`[^\\[\\]\\.:\\/]`,Ov=`[^`+Tv.replace(`\\.`,``)+`]`,kv=`((?:WC+[\\/:])*)`.replace(`WC`,Dv),Av=`(WCOD+)?`.replace(`WCOD`,Ov),jv=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Dv),Mv=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Dv),Nv=RegExp(`^`+kv+Av+jv+Mv+`$`),Pv=[`material`,`materials`,`bones`,`map`],Fv=class{constructor(e,t,n){let r=n||Iv.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Iv=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Ev,``)}static parseTrackName(e){let t=Nv.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Pv.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){U(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){W(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){W(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){W(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){W(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){W(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){W(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){W(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;W(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){W(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){W(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Iv.Composite=Fv,Iv.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Iv.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Iv.prototype.GetterByBindingType=[Iv.prototype._getValue_direct,Iv.prototype._getValue_array,Iv.prototype._getValue_arrayElement,Iv.prototype._getValue_toArray],Iv.prototype.SetterByBindingTypeAndVersioning=[[Iv.prototype._setValue_direct,Iv.prototype._setValue_direct_setNeedsUpdate,Iv.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Iv.prototype._setValue_array,Iv.prototype._setValue_array_setNeedsUpdate,Iv.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Iv.prototype._setValue_arrayElement,Iv.prototype._setValue_arrayElement_setNeedsUpdate,Iv.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Iv.prototype._setValue_fromArray,Iv.prototype._setValue_fromArray_setNeedsUpdate,Iv.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],class{static{this.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}};function Lv(e,t,n,r){let i=Rv(r);switch(n){case kd:return e*t;case Pd:return e*t/i.components*i.byteLength;case Fd:return e*t/i.components*i.byteLength;case Id:return e*t*2/i.components*i.byteLength;case Ld:return e*t*2/i.components*i.byteLength;case Ad:return e*t*3/i.components*i.byteLength;case jd:return e*t*4/i.components*i.byteLength;case Rd:return e*t*4/i.components*i.byteLength;case zd:case Bd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Vd:case Hd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Wd:case Kd:return Math.max(e,16)*Math.max(t,8)/4;case Ud:case Gd:return Math.max(e,8)*Math.max(t,8)/2;case qd:case Jd:case Xd:case Zd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Yd:case Qd:case $d:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ef:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case tf:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case nf:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case rf:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case af:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case of:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case sf:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case cf:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case lf:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case uf:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case df:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case ff:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case pf:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case mf:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case hf:case gf:case _f:return Math.ceil(e/4)*Math.ceil(t/4)*16;case vf:case yf:return Math.ceil(e/4)*Math.ceil(t/4)*8;case bf:case xf:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Rv(e){switch(e){case gd:case _d:return{byteLength:1,components:1};case yd:case vd:case Cd:return{byteLength:2,components:1};case wd:case Td:return{byteLength:2,components:4};case xd:case bd:case Sd:return{byteLength:4,components:1};case Dd:case Od:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`187`}})),typeof window<`u`&&(window.__THREE__?U(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`187`);function zv(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Bv(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Q={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},$={common:{diffuse:{value:new Y(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new q},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new q}},envmap:{envMap:{value:null},envMapRotation:{value:new q},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new q}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new q}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new q},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new q},normalScale:{value:new G(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new q},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new q}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new q}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new q}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Y(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Y(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0},uvTransform:{value:new q}},sprite:{diffuse:{value:new Y(16777215)},opacity:{value:1},center:{value:new G(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new q},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0}}},Vv={basic:{uniforms:g_([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.fog]),vertexShader:Q.meshbasic_vert,fragmentShader:Q.meshbasic_frag},lambert:{uniforms:g_([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new Y(0)},envMapIntensity:{value:1}}]),vertexShader:Q.meshlambert_vert,fragmentShader:Q.meshlambert_frag},phong:{uniforms:g_([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new Y(0)},specular:{value:new Y(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Q.meshphong_vert,fragmentShader:Q.meshphong_frag},standard:{uniforms:g_([$.common,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.roughnessmap,$.metalnessmap,$.fog,$.lights,{emissive:{value:new Y(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Q.meshphysical_vert,fragmentShader:Q.meshphysical_frag},toon:{uniforms:g_([$.common,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.gradientmap,$.fog,$.lights,{emissive:{value:new Y(0)}}]),vertexShader:Q.meshtoon_vert,fragmentShader:Q.meshtoon_frag},matcap:{uniforms:g_([$.common,$.bumpmap,$.normalmap,$.displacementmap,$.fog,{matcap:{value:null}}]),vertexShader:Q.meshmatcap_vert,fragmentShader:Q.meshmatcap_frag},points:{uniforms:g_([$.points,$.fog]),vertexShader:Q.points_vert,fragmentShader:Q.points_frag},dashed:{uniforms:g_([$.common,$.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Q.linedashed_vert,fragmentShader:Q.linedashed_frag},depth:{uniforms:g_([$.common,$.displacementmap]),vertexShader:Q.depth_vert,fragmentShader:Q.depth_frag},normal:{uniforms:g_([$.common,$.bumpmap,$.normalmap,$.displacementmap,{opacity:{value:1}}]),vertexShader:Q.meshnormal_vert,fragmentShader:Q.meshnormal_frag},sprite:{uniforms:g_([$.sprite,$.fog]),vertexShader:Q.sprite_vert,fragmentShader:Q.sprite_frag},background:{uniforms:{uvTransform:{value:new q},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Q.background_vert,fragmentShader:Q.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new q}},vertexShader:Q.backgroundCube_vert,fragmentShader:Q.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Q.cube_vert,fragmentShader:Q.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Q.equirect_vert,fragmentShader:Q.equirect_frag},distance:{uniforms:g_([$.common,$.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Q.distance_vert,fragmentShader:Q.distance_frag},shadow:{uniforms:g_([$.lights,$.fog,{color:{value:new Y(0)},opacity:{value:1}}]),vertexShader:Q.shadow_vert,fragmentShader:Q.shadow_frag}};Vv.physical={uniforms:g_([Vv.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new q},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new q},clearcoatNormalScale:{value:new G(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new q},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new q},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new q},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new q},sheen:{value:0},sheenColor:{value:new Y(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new q},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new q},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new q},transmissionSamplerSize:{value:new G},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new q},attenuationDistance:{value:0},attenuationColor:{value:new Y(0)},specularColor:{value:new Y(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new q},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new q},anisotropyVector:{value:new G},anisotropyMap:{value:null},anisotropyMapTransform:{value:new q}}]),vertexShader:Q.meshphysical_vert,fragmentShader:Q.meshphysical_frag};var Hv={r:0,b:0,g:0},Uv=new J,Wv=new q;Wv.set(-1,0,0,0,1,0,0,0,1);function Gv(e,t,n,r,i,a){let o=new Y(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&i.isCubeTexture?(l===void 0&&(l=new Z(new Ag(1,1,1),new C_({name:`BackgroundCubeMaterial`,uniforms:h_(Vv.backgroundCube.uniforms),vertexShader:Vv.backgroundCube.vertexShader,fragmentShader:Vv.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Uv.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Wv),l.material.toneMapped=pp.getTransfer(i.colorSpace)!==Nf,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Z(new d_(2,2),new C_({name:`BackgroundMaterial`,uniforms:h_(Vv.background.uniforms),vertexShader:Vv.background.vertexShader,fragmentShader:Vv.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=pp.getTransfer(i.colorSpace)!==Nf,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Hv,y_(e)),n.buffers.color.setClear(Hv.r,Hv.g,Hv.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Kv(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function qv(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Jv(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(U(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),f=n.logarithmicDepthBuffer===!0&&d===!1;n.reversedDepthBuffer===!0&&d===!1&&U(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&d===!0&&U(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Yv(e){let t=this,n=null,r=0,i=!1,a=!1,o=new ch,s=new q,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Xv=class extends Ep{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Eg(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Ag(5,5,5),i=new C_({name:`CubemapFromEquirect`,uniforms:h_(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Z(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=pd),new xv(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},Zv=256,Qv=3,$v=20,ey=256,ty=16,ny=3,ry=new K,iy=new Y,ay=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new xv(1,10,null),this._boxMesh=new Z(new Ag(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=ry}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(iy));let h=new xv(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fy(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=dy(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Zv,np(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?Zv:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=oy(e,!1,!1),n=Math.log2(e)-Qv;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=oy(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=fy()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=dy()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=cy(),this._integrationMaterial=ly());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/ty);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-ny)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(ey*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=uy());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function oy(e,t,n){return new Xv(e,{minFilter:hd,generateMipmaps:t,type:Cd,colorSpace:jf,depthBuffer:n})}function sy(e,t,n){return new C_({name:e,uniforms:t,vertexShader:Q.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function cy(){return sy(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${ey}u

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
	`)}function ly(){return sy(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:ty}},`

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
	`)}function uy(){return sy(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${$v}
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
	`)}function dy(){return sy(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

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
	`)}function fy(){return sy(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function py(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Xv(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new ay(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new ay(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function my(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Gf(`WebGLRenderer: `+e+` extension not supported.`),t}}}function hy(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?Km:Gm)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function gy(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function _y(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:W(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function vy(e,t,n){let r=new WeakMap,i=new wp;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Dp(h,p,m,u);g.type=Sd,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new G(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function yy(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var by={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function xy(e,t,n,r,i,a){let o=new Ep(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=null,u=new ih;u.setAttribute(`position`,new X([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute(`uv`,new X([0,2,0,0,2,0],2));let d=new w_({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new Z(u,d),p=new gv(-1,1,1,-1,0,1),m=null,h=null,g=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new Ep(t,n,{type:Cd,depthBuffer:!1,stencilBuffer:!1}),c=new Ep(t,n,{type:Cd,depthBuffer:!1,stencilBuffer:!1}));let r=i===!0&&y.some(e=>e.needsDepthTexture===!0);r!==(o.depthTexture!==null)&&(r===!0&&l===null&&(l=new Dg(t,n),a===!0&&(l.format=Nd,l.type=Ed)),o.dispose(),o.depthTexture=r?l:null,o.resolveDepthBuffer=r,o.storeMultisampledDepthBuffer=r);for(let e=0;e<y.length;e++){let i=y[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(l)}},this.begin=function(e,t){if(g||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,g=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(m!==e.outputColorSpace||h!==e.toneMapping){m=e.outputColorSpace,h=e.toneMapping,d.defines={},pp.getTransfer(m)===`srgb`&&(d.defines.SRGB_TRANSFER=``);let t=by[h];t&&(d.defines[t]=``),d.needsUpdate=!0}d.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(f,p),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}var Sy=new Cp,Cy=new Dg(1,1),wy=new Og(1),Ty=new Dp,Ey=new Op,Dy=new Eg,Oy=[],ky=[],Ay=new Float32Array(16),jy=new Float32Array(9),My=new Float32Array(4);function Ny(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Oy[i];if(a===void 0&&(a=new Float32Array(i),Oy[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Py(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Fy(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Iy(e,t){let n=ky[t];n===void 0&&(n=new Int32Array(t),ky[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Ly(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Ry(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Py(n,t))return;e.uniform2fv(this.addr,t),Fy(n,t)}}function zy(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Py(n,t))return;e.uniform3fv(this.addr,t),Fy(n,t)}}function By(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Py(n,t))return;e.uniform4fv(this.addr,t),Fy(n,t)}}function Vy(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Py(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Fy(n,t)}else{if(Py(n,r))return;My.set(r),e.uniformMatrix2fv(this.addr,!1,My),Fy(n,r)}}function Hy(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Py(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Fy(n,t)}else{if(Py(n,r))return;jy.set(r),e.uniformMatrix3fv(this.addr,!1,jy),Fy(n,r)}}function Uy(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Py(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Fy(n,t)}else{if(Py(n,r))return;Ay.set(r),e.uniformMatrix4fv(this.addr,!1,Ay),Fy(n,r)}}function Wy(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Gy(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Py(n,t))return;e.uniform2iv(this.addr,t),Fy(n,t)}}function Ky(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Py(n,t))return;e.uniform3iv(this.addr,t),Fy(n,t)}}function qy(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Py(n,t))return;e.uniform4iv(this.addr,t),Fy(n,t)}}function Jy(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Yy(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Py(n,t))return;e.uniform2uiv(this.addr,t),Fy(n,t)}}function Xy(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Py(n,t))return;e.uniform3uiv(this.addr,t),Fy(n,t)}}function Zy(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Py(n,t))return;e.uniform4uiv(this.addr,t),Fy(n,t)}}function Qy(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function $y(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?Qy(Cy):Sy,n.setTexture2D(t||a,i)}function eb(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Ey,i)}function tb(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?Qy(wy):Dy,n.setTextureCube(t||a,i)}function nb(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Ty,i)}function rb(e){switch(e){case 5126:return Ly;case 35664:return Ry;case 35665:return zy;case 35666:return By;case 35674:return Vy;case 35675:return Hy;case 35676:return Uy;case 5124:case 35670:return Wy;case 35667:case 35671:return Gy;case 35668:case 35672:return Ky;case 35669:case 35673:return qy;case 5125:return Jy;case 36294:return Yy;case 36295:return Xy;case 36296:return Zy;case 35678:case 36198:case 36298:case 36306:case 35682:return $y;case 35679:case 36299:case 36307:return eb;case 35680:case 36300:case 36308:case 36293:return tb;case 36289:case 36303:case 36311:case 36292:return nb}}function ib(e,t){e.uniform1fv(this.addr,t)}function ab(e,t){let n=Ny(t,this.size,2);e.uniform2fv(this.addr,n)}function ob(e,t){let n=Ny(t,this.size,3);e.uniform3fv(this.addr,n)}function sb(e,t){let n=Ny(t,this.size,4);e.uniform4fv(this.addr,n)}function cb(e,t){let n=Ny(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function lb(e,t){let n=Ny(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function ub(e,t){let n=Ny(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function db(e,t){e.uniform1iv(this.addr,t)}function fb(e,t){e.uniform2iv(this.addr,t)}function pb(e,t){e.uniform3iv(this.addr,t)}function mb(e,t){e.uniform4iv(this.addr,t)}function hb(e,t){e.uniform1uiv(this.addr,t)}function gb(e,t){e.uniform2uiv(this.addr,t)}function _b(e,t){e.uniform3uiv(this.addr,t)}function vb(e,t){e.uniform4uiv(this.addr,t)}function yb(e,t,n){let r=this.cache,i=t.length,a=Iy(n,i);Py(r,a)||(e.uniform1iv(this.addr,a),Fy(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Qy(Cy):Sy;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function bb(e,t,n){let r=this.cache,i=t.length,a=Iy(n,i);Py(r,a)||(e.uniform1iv(this.addr,a),Fy(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Ey,a[e])}function xb(e,t,n){let r=this.cache,i=t.length,a=Iy(n,i);Py(r,a)||(e.uniform1iv(this.addr,a),Fy(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?Qy(wy):Dy;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function Sb(e,t,n){let r=this.cache,i=t.length,a=Iy(n,i);Py(r,a)||(e.uniform1iv(this.addr,a),Fy(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Ty,a[e])}function Cb(e){switch(e){case 5126:return ib;case 35664:return ab;case 35665:return ob;case 35666:return sb;case 35674:return cb;case 35675:return lb;case 35676:return ub;case 5124:case 35670:return db;case 35667:case 35671:return fb;case 35668:case 35672:return pb;case 35669:case 35673:return mb;case 5125:return hb;case 36294:return gb;case 36295:return _b;case 36296:return vb;case 35678:case 36198:case 36298:case 36306:case 35682:return yb;case 35679:case 36299:case 36307:return bb;case 35680:case 36300:case 36308:case 36293:return xb;case 36289:case 36303:case 36311:case 36292:return Sb}}var wb=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=rb(t.type)}},Tb=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Cb(t.type)}},Eb=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Db=/(\w+)(\])?(\[|\.)?/g;function Ob(e,t){e.seq.push(t),e.map[t.id]=t}function kb(e,t,n){let r=e.name,i=r.length;for(Db.lastIndex=0;;){let a=Db.exec(r),o=Db.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Ob(n,l===void 0?new wb(s,e,t):new Tb(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Eb(s),Ob(n,e)),n=e}}}var Ab=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);kb(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function jb(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Mb=37297,Nb=0;function Pb(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Fb=new q;function Ib(e){pp._getMatrix(Fb,pp.workingColorSpace,e);let t=`mat3( ${Fb.elements.map(e=>e.toFixed(4))} )`;switch(pp.getTransfer(e)){case Mf:return[t,`LinearTransferOETF`];case Nf:return[t,`sRGBTransferOETF`];default:return U(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Lb(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Pb(e.getShaderSource(t),r)}return i}function Rb(e,t){let n=Ib(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var zb={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Bb(e,t){let n=zb[t];return n===void 0?(U(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Vb=new K;function Hb(){return pp.getLuminanceCoefficients(Vb),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Vb.x.toFixed(4)}, ${Vb.y.toFixed(4)}, ${Vb.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Ub(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Kb).join(`
`)}function Wb(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Gb(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Kb(e){return e!==``}function qb(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Jb(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Yb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xb(e){return e.replace(Yb,Zb)}function Zb(e,t){let n=Q[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return Xb(n)}var Qb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $b(e){return e.replace(Qb,ex)}function ex(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function tx(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}var nx={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function rx(e){return nx[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var ix={302:`ENVMAP_MODE_REFRACTION`};function ax(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:ix[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var ox={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function sx(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:ox[e.combine]||`ENVMAP_BLENDING_NONE`}function cx(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=rx(n),l=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,u=ax(n),d=sx(n),f=Ub(n),p=Wb(a),m=i.createProgram(),h,g,_=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(h=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(Kb).join(`
`),h.length>0&&(h+=`
`),g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(Kb).join(`
`),g.length>0&&(g+=`
`)):(h=[tx(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Kb).join(`
`),g=[tx(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Q.tonemapping_pars_fragment,n.toneMapping===0?``:Bb(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Q.colorspace_pars_fragment,Rb(`linearToOutputTexel`,n.outputColorSpace),Hb(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Kb).join(`
`)),o=Xb(o),o=qb(o,n),o=Jb(o,n),s=Xb(s),s=qb(s,n),s=Jb(s,n),o=$b(o),s=$b(s),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,h=[f,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+h,g=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+g);let v=_+h+o,y=_+g+s,b=jb(i,i.VERTEX_SHADER,v),x=jb(i,i.FRAGMENT_SHADER,y);i.attachShader(m,b),i.attachShader(m,x),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,`position`):i.bindAttribLocation(m,0,n.index0AttributeName),i.linkProgram(m);function S(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(m)||``,r=i.getShaderInfoLog(b)||``,a=i.getShaderInfoLog(x)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,m,b,x);else{let e=Lb(i,b,`vertex`),n=Lb(i,x,`fragment`);W(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):U(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:h},fragmentShader:{log:c,prefix:g}})}i.deleteShader(b),i.deleteShader(x),C=new Ab(i,m),w=Gb(i,m)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(m,Mb)),T},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Nb++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=x,this}var lx=0,ux=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new dx(e),t.set(e,n)),n}},dx=class{constructor(e){this.id=lx++,this.code=e,this.usedTimes=0}};function fx(e){return e===1030||e===37490||e===36285}function px(e,t,n,r,i,a){let o=new zp,s=new ux,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function p(e){return c.add(e),e===0?`uv`:`uv${e}`}function m(i,o,l,u,m,h){let g=u.fog,_=m.geometry,v=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,b=t.get(i.envMap||v,y),x=f[i.type],S=r.precision;i.precision!==null&&(S=r.getMaxPrecision(i.precision),S!==i.precision&&U(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,S,`instead.`));let C=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,w=C===void 0?0:C.length,T=0;_.morphAttributes.position!==void 0&&(T=1),_.morphAttributes.normal!==void 0&&(T=2),_.morphAttributes.color!==void 0&&(T=3);let E,D,O,k;if(x){let e=Vv[x];E=e.vertexShader,D=e.fragmentShader}else{E=i.vertexShader,D=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),O=e.id,k=t.id}let A=e.getRenderTarget(),j=e.state.buffers.depth.getReversed(),M=m.isInstancedMesh===!0,N=m.isBatchedMesh===!0,ee=!!i.map,te=!!i.matcap,P=!!b,ne=P&&b.isPMREMTexture===!0,re=!!i.aoMap,ie=!!i.lightMap,ae=!!i.bumpMap&&i.wireframe===!1,oe=!!i.normalMap,se=!!i.displacementMap,ce=!!i.emissiveMap,le=!!i.metalnessMap,ue=!!i.roughnessMap,de=i.anisotropy>0,fe=i.clearcoat>0,pe=i.diffuseRoughness>0,me=i.dispersion>0,he=i.retroreflectivity>0,ge=i.iridescence>0,_e=i.sheen>0,ve=i.transmission>0,ye=de&&!!i.anisotropyMap,be=fe&&!!i.clearcoatMap,xe=fe&&!!i.clearcoatNormalMap,Se=fe&&!!i.clearcoatRoughnessMap,Ce=pe&&!!i.diffuseRoughnessMap,F=ge&&!!i.iridescenceMap,I=ge&&!!i.iridescenceThicknessMap,we=_e&&!!i.sheenColorMap,L=_e&&!!i.sheenRoughnessMap,R=!!i.specularMap,Te=!!i.specularColorMap,z=!!i.specularIntensityMap,B=ve&&!!i.transmissionMap,Ee=ve&&!!i.thicknessMap,De=!!i.gradientMap,Oe=!!i.alphaMap,ke=i.alphaTest>0,Ae=!!i.alphaHash,je=!!i.extensions,Me=0;i.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Me=e.toneMapping);let Ne=ne?b.isCompressedCubeTexture?b.image[0].mipmaps:b.mipmaps:null,Pe={shaderID:x,shaderType:i.type,shaderName:i.name,vertexShader:E,fragmentShader:D,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:S,batching:N,batchingColor:N&&m._colorsTexture!==null,instancing:M,instancingColor:M&&m.instanceColor!==null,instancingMorph:M&&m.morphTexture!==null,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:pp.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ee,matcap:te,envMap:P,envMapMode:P&&b.mapping,envMapPMREM:ne,envMapMaxLod:ne?Ne.length-1:null,envMapSize:ne?Ne[0].width:null,aoMap:re,lightMap:ie,bumpMap:ae,normalMap:oe,displacementMap:se,emissiveMap:ce,normalMapObjectSpace:oe&&i.normalMapType===1,normalMapTangentSpace:oe&&i.normalMapType===0,packedNormalMap:oe&&i.normalMapType===0&&fx(i.normalMap.format),metalnessMap:le,roughnessMap:ue,anisotropy:de,anisotropyMap:ye,clearcoat:fe,clearcoatMap:be,clearcoatNormalMap:xe,clearcoatRoughnessMap:Se,diffuseRoughness:pe,diffuseRoughnessMap:Ce,dispersion:me,retroreflection:he,iridescence:ge,iridescenceMap:F,iridescenceThicknessMap:I,sheen:_e,sheenColorMap:we,sheenRoughnessMap:L,specularMap:R,specularColorMap:Te,specularIntensityMap:z,transmission:ve,transmissionMap:B,thicknessMap:Ee,gradientMap:De,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Oe,alphaTest:ke,alphaHash:Ae,combine:i.combine,mapUv:ee&&p(i.map.channel),aoMapUv:re&&p(i.aoMap.channel),lightMapUv:ie&&p(i.lightMap.channel),bumpMapUv:ae&&p(i.bumpMap.channel),normalMapUv:oe&&p(i.normalMap.channel),displacementMapUv:se&&p(i.displacementMap.channel),emissiveMapUv:ce&&p(i.emissiveMap.channel),metalnessMapUv:le&&p(i.metalnessMap.channel),roughnessMapUv:ue&&p(i.roughnessMap.channel),anisotropyMapUv:ye&&p(i.anisotropyMap.channel),clearcoatMapUv:be&&p(i.clearcoatMap.channel),clearcoatNormalMapUv:xe&&p(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&p(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:Ce&&p(i.diffuseRoughnessMap.channel),iridescenceMapUv:F&&p(i.iridescenceMap.channel),iridescenceThicknessMapUv:I&&p(i.iridescenceThicknessMap.channel),sheenColorMapUv:we&&p(i.sheenColorMap.channel),sheenRoughnessMapUv:L&&p(i.sheenRoughnessMap.channel),specularMapUv:R&&p(i.specularMap.channel),specularColorMapUv:Te&&p(i.specularColorMap.channel),specularIntensityMapUv:z&&p(i.specularIntensityMap.channel),transmissionMapUv:B&&p(i.transmissionMap.channel),thicknessMapUv:Ee&&p(i.thicknessMap.channel),alphaMapUv:Oe&&p(i.alphaMap.channel),vertexTangents:!!_.attributes.tangent&&(oe||de),vertexNormals:!!_.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!_.attributes.color&&_.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!_.attributes.uv&&(ee||Oe),fog:!!g,useFog:i.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||_.attributes.normal===void 0&&oe===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:j,skinning:m.isSkinnedMesh===!0,hasPositionAttribute:_.attributes.position!==void 0,morphTargets:_.morphAttributes.position!==void 0,morphNormals:_.morphAttributes.normal!==void 0,morphColors:_.morphAttributes.color!==void 0,morphTargetsCount:w,morphTextureStride:T,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:h.filter(e=>e.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Me,decodeVideoTexture:ee&&i.map.isVideoTexture===!0&&pp.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ce&&i.emissiveMap.isVideoTexture===!0&&pp.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:je&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(je&&i.extensions.multiDraw===!0||N)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function h(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(g(n,t),_(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function g(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function _(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.diffuseRoughness&&o.enable(25),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function v(e){let t=f[e.type],n;if(t){let e=Vv[t];n=b_.clone(e.uniforms)}else n=e.uniforms;return n}function y(t,n){let r=u.get(n);return r===void 0?(r=new cx(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function b(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function x(e){s.remove(e)}function S(){s.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:v,acquireProgram:y,releaseProgram:b,releaseShaderCache:x,programs:l,dispose:S}}function mx(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function hx(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function gx(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function _x(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||hx),r.length>1&&r.sort(t||gx),i.length>1&&i.sort(t||gx)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function vx(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new _x,e.set(t,[i])):n>=r.length?(i=new _x,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function yx(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new K,color:new Y};break;case`SpotLight`:n={position:new K,direction:new K,color:new Y,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new K,color:new Y,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new K,skyColor:new Y,groundColor:new Y};break;case`RectAreaLight`:n={color:new Y,position:new K,halfWidth:new K,halfHeight:new K}}return e[t.id]=n,n}}}function bx(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var xx=0;function Sx(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Cx(e){let t=new yx,n=bx(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new K);let i=new K,a=new J,o=new J;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Sx);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=$.LTC_FLOAT_1,r.rectAreaLTC2=$.LTC_FLOAT_2):(r.rectAreaLTC1=$.LTC_HALF_1,r.rectAreaLTC2=$.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=xx++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function wx(e){let t=new Cx(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function Tx(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new wx(e),t.set(n,[a])):r>=i.length?(a=new wx(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Ex=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Dx=`uniform sampler2D shadow_pass;
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
}`,Ox=[new K(1,0,0),new K(-1,0,0),new K(0,1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1)],kx=[new K(0,-1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1),new K(0,-1,0),new K(0,-1,0)],Ax=new J,jx=new K,Mx=new K;function Nx(e,t,n){let r=new rg,i=new G,a=new G,o=new wp,s=new D_,c=new O_,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new C_({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new G},radius:{value:4}},vertexShader:Ex,fragmentShader:Dx}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new ih;m.setAttribute(`position`,new Wm(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new Z(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(U(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){U(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){U(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Ep(i.x,i.y,{format:Id,type:Cd,minFilter:pd,magFilter:pd,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Dg(i.x,i.y,Sd),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=Md,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=ud,d.map.depthTexture.magFilter=ud}else l.isPointLight?(d.map=new Xv(i.x),d.map.depthTexture=new Og(i.x,xd)):(d.map=new Ep(i.x,i.y),d.map.depthTexture=new Dg(i.x,i.y,xd)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=Md,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=pd,d.map.depthTexture.magFilter=pd):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=ud,d.map.depthTexture.magFilter=ud);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);let _=d.camera.layers.mask&4294967294?d.camera.layers:s.layers;for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),jx.setFromMatrixPosition(l.matrixWorld),e.position.copy(jx),Mx.copy(e.position),Mx.add(Ox[t]),e.up.copy(kx[t]),e.lookAt(Mx),e.updateMatrixWorld(),n.makeTranslation(-jx.x,-jx.y,-jx.z),Ax.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Ax,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,_,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new Ep(i.x,i.y,{format:Id,type:Cd}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),s=n.material;if(Array.isArray(s)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,c);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(s.visible){let t=y(n,s,o,c);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)b(l[e],i,a,o,s,c)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Px(e,t){function n(){let t=!1,n=new wp,r=null,i=new wp(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?le(e.DEPTH_TEST):ue(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=qf[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?le(e.STENCIL_TEST):ue(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Y(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,ee=0,te=e.getParameter(e.VERSION);te.indexOf(`WebGL`)===-1?te.indexOf(`OpenGL ES`)!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),N=ee>=2):(ee=parseFloat(/^WebGL (\d)/.exec(te)[1]),N=ee>=1);let P=null,ne={},re=e.getParameter(e.SCISSOR_BOX),ie=e.getParameter(e.VIEWPORT),ae=new wp().fromArray(re),oe=new wp().fromArray(ie);function se(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ce={};ce[e.TEXTURE_2D]=se(e.TEXTURE_2D,e.TEXTURE_2D,1),ce[e.TEXTURE_CUBE_MAP]=se(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[e.TEXTURE_2D_ARRAY]=se(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ce[e.TEXTURE_3D]=se(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),le(e.DEPTH_TEST),o.setFunc(3),ve(!1),ye(1),le(e.CULL_FACE),ge(0);function le(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ue(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function de(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function fe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function pe(t){return h!==t&&(e.useProgram(t),h=t,!0)}let me={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};me[103]=e.MIN,me[104]=e.MAX;let he={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ge(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(ue(e.BLEND),g=!1);else if(g===!1&&(le(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:W(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:W(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:W(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:W(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(me[n],me[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(he[r],he[i],he[o],he[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function _e(t,n){t.side===2?ue(e.CULL_FACE):le(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ve(r),t.blending===1&&t.transparent===!1?ge(0):ge(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),xe(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?le(e.SAMPLE_ALPHA_TO_COVERAGE):ue(e.SAMPLE_ALPHA_TO_COVERAGE)}function ve(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ye(t){t===0?ue(e.CULL_FACE):(le(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function be(t){t!==k&&(N&&e.lineWidth(t),k=t)}function xe(t,n,r){t?(le(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):ue(e.POLYGON_OFFSET_FILL)}function Se(t){t?le(e.SCISSOR_TEST):ue(e.SCISSOR_TEST)}function Ce(t){t===void 0&&(t=e.TEXTURE0+M-1),P!==t&&(e.activeTexture(t),P=t)}function F(t,n,r){r===void 0&&(r=P===null?e.TEXTURE0+M-1:P);let i=ne[r];i===void 0&&(i={type:void 0,texture:void 0},ne[r]=i),(i.type!==t||i.texture!==n)&&(P!==r&&(e.activeTexture(r),P=r),e.bindTexture(t,n||ce[t]),i.type=t,i.texture=n)}function I(){let t=ne[P];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function we(){try{e.compressedTexImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function L(){try{e.compressedTexImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function R(){try{e.texSubImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Te(){try{e.texSubImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function z(){try{e.compressedTexSubImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function B(){try{e.compressedTexSubImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Ee(){try{e.texStorage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function De(){try{e.texStorage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Oe(){try{e.texImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function ke(){try{e.texImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Ae(t){return d[t]===void 0?e.getParameter(t):d[t]}function je(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Me(t){ae.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ae.copy(t))}function Ne(t){oe.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),oe.copy(t))}function Pe(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function V(t,n,r){let i=l.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function Fe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},P=null,ne={},f={},c={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Y(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ae.set(0,0,e.canvas.width,e.canvas.height),oe.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:le,disable:ue,bindFramebuffer:de,drawBuffers:fe,useProgram:pe,setBlending:ge,setMaterial:_e,setFlipSided:ve,setCullFace:ye,setLineWidth:be,setPolygonOffset:xe,setScissorTest:Se,activeTexture:Ce,bindTexture:F,unbindTexture:I,compressedTexImage2D:we,compressedTexImage3D:L,texImage2D:Oe,texImage3D:ke,pixelStorei:je,getParameter:Ae,updateUBOMapping:Pe,uniformBlockBinding:V,texStorage2D:Ee,texStorage3D:De,texSubImage2D:R,texSubImage3D:Te,compressedTexSubImage2D:z,compressedTexSubImage3D:B,scissor:Me,viewport:Ne,reset:Fe}}function Fx(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new G,u=new WeakMap,d=new Set,f,p=new WeakMap,m=new Set,h=new FinalizationRegistry(e=>m.delete(e)),g=!1;try{g=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function _(e,t){return g?new OffscreenCanvas(e,t):Bf(`canvas`)}function v(e,t,n){let r=1,i=Ee(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=_(n,a));let o=t?_(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),U(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&U(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function y(e){return e.generateMipmaps}function b(t){e.generateMipmap(t)}function x(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function S(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];U(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||U(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Mf:pp.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function C(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,U(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function w(e,t){return y(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function T(e){let t=new WeakRef(e);r.get(e).__ref=t,m.add(t),h.register(e,t,t)}function E(e){let t=r.get(e).__ref;t!==void 0&&(m.delete(t),h.unregister(t))}function D(e){k(e.target)}function O(e){A(e.target)}function k(e){e.removeEventListener(`dispose`,D),E(e),M(e),e.isVideoTexture&&u.delete(e),e.isHTMLTexture&&d.delete(e)}function A(e){e.removeEventListener(`dispose`,O),E(e),ee(e)}function j(){for(let e of m){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?A(t):k(t))}m.clear(),d.clear()}function M(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&N(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function N(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function ee(t){let n=r.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let i=t.depthTexture;if(i&&i.renderTarget===t&&k(i),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,n=a.length;t<n;t++){let n=r.get(a[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(a[t])}r.remove(t)}let te=0;function P(){te=0}function ne(){return te}function re(e){te=e}function ie(){let e=te;return e>=i.maxTextures&&U(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),te+=1,e}function ae(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function oe(t,i){let a=r.get(t);if(t.isVideoTexture&&z(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)U(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)U(`WebGLRenderer: Texture marked for update but image is incomplete`);else{_e(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function se(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?_e(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function ce(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?_e(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function le(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?ve(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ue={[sd]:e.REPEAT,[cd]:e.CLAMP_TO_EDGE,[ld]:e.MIRRORED_REPEAT},de={[ud]:e.NEAREST,[dd]:e.NEAREST_MIPMAP_NEAREST,[fd]:e.NEAREST_MIPMAP_LINEAR,[pd]:e.LINEAR,[md]:e.LINEAR_MIPMAP_NEAREST,[hd]:e.LINEAR_MIPMAP_LINEAR},fe={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function pe(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&U(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ue[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ue[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ue[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,de[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,de[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,fe[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function me(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,D),T(n));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=ae(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&N(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function he(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ge(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=he(n.start,r.width,4),c=he(t.start,r.width,4);n.start<=i+1&&a===c&&he(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function _e(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=me(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=pp.getPrimaries(pp.workingColorSpace),r=o.colorSpace===``?null:pp.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=v(o.image,!1,i.maxTextureSize);t=B(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=S(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);pe(c,o);let h,g=o.mipmaps,_=o.isVideoTexture!==!0,x=f.__version===void 0||l===!0,T=u.dataReady,E=w(o,t);if(o.isDepthTexture)m=C(o.format===Nd,o.type),x&&(_?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(g.length>0){_&&x&&n.texStorage2D(e.TEXTURE_2D,E,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else _?(x&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&ge(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){_&&x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,g[0].width,g[0].height,t.depth);for(let i=0,a=g.length;i<a;i++)if(h=g[i],o.format!==1023){if(r!==null){if(_){if(T){if(o.layerUpdates.size>0){let t=Lv(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else U(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else _?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{_&&x&&n.texStorage2D(e.TEXTURE_2D,E,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],o.format===1023?_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?U(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):_?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(_){if(x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=Lv(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)_?(x&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(x){if(_)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(g.length>0){if(_&&x){let t=Ee(g[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=g.length;t<i;t++)h=g[t],_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(_){if(x){let r=Ee(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);y(o)&&o.mipmapsAutoUpdate===!0&&b(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ve(t,o,s){if(o.image.length!==6)return;let c=me(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=pp.getPrimaries(pp.workingColorSpace),r=o.colorSpace===``?null:pp.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=v(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=B(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),_=a.convert(o.type),x=S(o.internalFormat,g,_,o.normalized,o.colorSpace),T=o.isVideoTexture!==!0,E=u.__version===void 0||c===!0,D=l.dataReady,O=w(o,h);pe(e.TEXTURE_CUBE_MAP,o);let k;if(o.isDepthTexture){if(x=C(o.format===Nd,o.type),E){if(T)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,x,h.width,h.height);else for(let t=0;t<6;t++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,h.width,h.height,0,g,_,null)}}else if(f){T&&E&&n.texStorage2D(e.TEXTURE_CUBE_MAP,O,x,h.width,h.height);for(let t=0;t<6;t++){k=m[t].mipmaps;for(let r=0;r<k.length;r++){let i=k[r];o.format===1023?T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,g,_,i.data):g===null?U(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):T?D&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,i.data)}}}else{if(k=o.mipmaps,T&&E){k.length>0&&O++;let t=Ee(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,O,x,t.width,t.height)}for(let t=0;t<6;t++)if(p){T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,m[t].width,m[t].height,0,g,_,m[t].data);for(let r=0;r<k.length;r++){let i=k[r].image[t].image;T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,i.width,i.height,0,g,_,i.data)}}else{T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,g,_,m[t]);for(let r=0;r<k.length;r++){let i=k[r];T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,g,_,i.image[t])}}}y(o)&&o.mipmapsAutoUpdate===!0&&b(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ye(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=S(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Te(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,R(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function be(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=C(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Te(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,R(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,R(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=S(o.internalFormat,c,l,o.normalized,o.colorSpace);Te(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,R(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,R(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function xe(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let c=r.get(i.depthTexture);c.__renderTarget=i;let l=o?i.depthTexture.image[0]:i.depthTexture.image;c.__webglTexture&&l.width===i.width&&l.height===i.height||(l.width=i.width,l.height=i.height,i.depthTexture.needsUpdate=!0),o?le(i.depthTexture,0):oe(i.depthTexture,0);let u=c.__webglTexture,d=R(i),f=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Te(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Te(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Se(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)xe(i.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?xe(i.__webglFramebuffer[0],t,0):xe(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),be(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),be(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ce(t,n,i){let a=r.get(t);n!==void 0&&ye(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&Se(t)}function F(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,O),T(t);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Te(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=S(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=R(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),be(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),pe(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)ye(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else ye(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);y(i)?b(e.TEXTURE_CUBE_MAP):i.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),pe(c,a),ye(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),y(a)&&b(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),pe(r,i),i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)ye(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else ye(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);y(i)?b(r):i.mipmaps.length>0&&e.texParameteri(r,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}t.depthBuffer&&Se(t)}function I(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(y(a)&&a.mipmapsAutoUpdate===!0){let t=x(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),b(t),n.unbindTexture()}}}let we=[];function L(t){if(t.samples>0){if(Te(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(we.length=0,we.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&we.push(l),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,we))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function R(e){return Math.min(i.maxSamples,e.samples)}function Te(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function z(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function B(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(pp.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&U(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):W(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ee(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=ie,this.resetTextureUnits=P,this.getTextureUnits=ne,this.setTextureUnits=re,this.setTexture2D=oe,this.setTexture2DArray=se,this.setTexture3D=ce,this.setTextureCube=le,this.rebindTextures=Ce,this.setupRenderTarget=F,this.updateRenderTargetMipmap=I,this.updateMultisampleRenderTarget=L,this.setupDepthRenderbuffer=Se,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=Te,this.dispose=j}function Ix(e,t){function n(n,r=``){let i,a=pp.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Lx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Rx=`
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

}`,zx=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new kg(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new C_({vertexShader:Lx,fragmentShader:Rx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Z(new d_(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Bx=class extends Jf{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new zx,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new G,C=null,w=null,T=new hv;T.viewport=new wp;let E=new hv;E.viewport=new wp;let D=[T,E],O=new Sv,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new im,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new im,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new im,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function M(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,M),r.removeEventListener(`inputsourceschange`,N);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,re.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&U(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&U(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,M),r.addEventListener(`inputsourceschange`,N),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?Nd:Md,a=_.stencil?Ed:xd);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Ep(d.textureWidth,d.textureHeight,{format:jd,type:gd,depthTexture:new Dg(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Ep(f.framebufferWidth,f.framebufferHeight,{format:jd,type:gd,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),re.setContext(r),re.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function N(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}function ee(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;ee(O,i);for(let e=0;e<a.length;e++)ee(a[e],i);O.projectionMatrix.copy(T.projectionMatrix),O.projectionMatrixInverse.copy(T.projectionMatrixInverse),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),te(e,O,i)};function te(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Zf*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let P=null;function ne(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new hv,o.layers.enable(n),o.viewport=new wp,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new kg,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}P&&P(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let re=new zv;re.setAnimationLoop(ne),this.setAnimationLoop=function(e){P=e},this.dispose=function(){}}},Vx=new J,Hx=new q;Hx.set(-1,0,0,0,1,0,0,0,1);function Ux(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,y_(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Vx.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Hx),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Wx(e,t,n,r){let i={},a={};function o(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function s(e,n){let o=i[e.id];o===void 0&&(m(e),o=c(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let u=t.render.frame;a[e.id]!==u&&(l(e),a[e.id]=u)}function c(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function l(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)u(t[n],e,n,a);else u(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(t,n,r,i){if(f(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=h(i,!0);d(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else d(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function d(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function f(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)p(i[n],e,n)===!0&&(t=!0);return t}return p(i,r,a)}function p(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=h(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?U(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):U(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function g(t){let n=t.target;n.removeEventListener(`dispose`,g),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);i={},a={}}return{bind:o,update:s,dispose:_}}var Gx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Kx=null;function qx(){return Kx===null&&(Kx=new Vh(Gx,16,16,Id,Cd),Kx.name=`DFG_LUT`,Kx.minFilter=pd,Kx.magFilter=pd,Kx.wrapS=cd,Kx.wrapT=cd,Kx.generateMipmaps=!1,Kx.needsUpdate=!0),Kx}var Jx=class{constructor(e={}){let{canvas:t=Vf(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=gd}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([Rd,Ld,Fd]),g=new Set([gd,xd,yd,Ed,wd,Td]),_=new Uint32Array(4),v=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=Af;let j=0,M=0,N=null,ee=-1,te=null,P=new wp,ne=new wp,re=null,ie=new Y(0),ae=0,oe=t.width,se=t.height,ce=1,le=null,ue=null,de=new wp(0,0,oe,se),fe=new wp(0,0,oe,se),pe=!1,me=new rg,he=new ag,ge=!1,_e=!1,ve=new J,ye=new K,be=new wp,xe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Se=!1;function Ce(){return N===null?ce:1}let F=n;function I(e,n){return t.getContext(e,n)}let we,L,R,Te,z,B,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,V,Fe,Ie,Le,Re,ze,Be,Ve;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,We,!1),t.addEventListener(`webglcontextrestored`,Ge,!1),t.addEventListener(`webglcontextcreationerror`,Ke,!1),F===null){let t=`webgl2`;if(F=I(t,e),F===null)throw I(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}He()}catch(e){throw t.removeEventListener(`webglcontextlost`,We,!1),t.removeEventListener(`webglcontextrestored`,Ge,!1),t.removeEventListener(`webglcontextcreationerror`,Ke,!1),W(`WebGLRenderer: `+e.message),e}function He(){we=new my(F),we.init(),ze=new Ix(F,we),L=new Jv(F,we,e,ze),R=new Px(F,we),L.reversedDepthBuffer&&d&&R.buffers.depth.setReversed(!0),O=F.createFramebuffer(),k=F.createFramebuffer(),A=F.createFramebuffer(),Te=new _y(F),z=new mx,B=new Fx(F,we,R,z,L,ze,Te),Ee=new py(T),De=new Bv(F),Be=new Kv(F,De),Oe=new hy(F,De,Te,Be),ke=new yy(F,Oe,De,Be,Te),Ie=new vy(F,L,B),Pe=new Yv(z),Ae=new px(T,Ee,we,L,Be,Pe),je=new Ux(T,z),Me=new vx,Ne=new Tx(we),Fe=new Gv(T,Ee,R,ke,p,s),V=new Nx(T,ke,L),Ve=new Wx(F,Te,L,R),Le=new qv(F,we,Te),Re=new gy(F,we,Te),Te.programs=Ae.programs,T.capabilities=L,T.extensions=we,T.properties=z,T.renderLists=Me,T.shadowMap=V,T.state=R,T.info=Te}m!==1009&&(w=new xy(m,t.width,t.height,o,r,i));let Ue=new Bx(T,F);this.xr=Ue,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let e=we.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=we.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ce},this.setPixelRatio=function(e){e!==void 0&&(ce=e,this.setSize(oe,se,!1))},this.getSize=function(e){return e.set(oe,se)},this.setSize=function(e,n,r=!0){Ue.isPresenting?U(`WebGLRenderer: Can't change size while VR device is presenting.`):(oe=e,se=n,t.width=Math.floor(e*ce),t.height=Math.floor(n*ce),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(oe*ce,se*ce).floor()},this.setDrawingBufferSize=function(e,n,r){oe=e,se=n,ce=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)W(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){U(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(P)},this.getViewport=function(e){return e.copy(de)},this.setViewport=function(e,t,n,r){e.isVector4?de.set(e.x,e.y,e.z,e.w):de.set(e,t,n,r),R.viewport(P.copy(de).multiplyScalar(Ce()).round())},this.getScissor=function(e){return e.copy(fe)},this.setScissor=function(e,t,n,r){e.isVector4?fe.set(e.x,e.y,e.z,e.w):fe.set(e,t,n,r),R.scissor(ne.copy(fe).multiplyScalar(Ce()).round())},this.getScissorTest=function(){return pe},this.setScissorTest=function(e){R.setScissorTest(pe=e)},this.setOpaqueSort=function(e){le=e},this.setTransparentSort=function(e){ue=e},this.getClearColor=function(e){return e.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(N!==null){let t=N.texture.format;e=h.has(t)}if(e){let e=N.texture.type,t=g.has(e),n=Fe.getClearColor(),r=Fe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,F.clearBufferuiv(F.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,F.clearBufferiv(F.COLOR,0,v))}else r|=F.COLOR_BUFFER_BIT}t&&(r|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&F.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,We,!1),t.removeEventListener(`webglcontextrestored`,Ge,!1),t.removeEventListener(`webglcontextcreationerror`,Ke,!1),Fe.dispose(),Me.dispose(),Ne.dispose(),B.dispose(),z.dispose(),Ee.dispose(),ke.dispose(),Oe.dispose(),Be.dispose(),Ve.dispose(),Ae.dispose(),Ue.dispose(),Ue.removeEventListener(`sessionstart`,$e),Ue.removeEventListener(`sessionend`,et),tt.stop()};function We(e){e.preventDefault(),Uf(`WebGLRenderer: Context Lost.`),E=!0}function Ge(){Uf(`WebGLRenderer: Context Restored.`),E=!1;let e=Te.autoReset,t=V.enabled,n=V.autoUpdate,r=V.needsUpdate,i=V.type;He(),Te.autoReset=e,V.enabled=t,V.autoUpdate=n,V.needsUpdate=r,V.type=i}function Ke(e){W(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function qe(e){let t=e.target;t.removeEventListener(`dispose`,qe),Je(t)}function Je(e){Ye(e),z.remove(e)}function Ye(e){let t=z.get(e).programs;t!==void 0&&(t.forEach(function(e){Ae.releaseProgram(e)}),e.isShaderMaterial&&Ae.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=xe);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=ft(e,t,n,r,i);R.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Oe.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Be.setup(i,r,s,n,c);let h,g=Le;if(c!==null&&(h=De.get(c),g=Re,g.setIndex(h)),i.isMesh)r.wireframe===!0?(R.setLineWidth(r.wireframeLinewidth*Ce()),g.setMode(F.LINES)):g.setMode(F.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),R.setLineWidth(e*Ce()),i.isLineSegments?g.setMode(F.LINES):i.isLineLoop?g.setMode(F.LINE_LOOP):g.setMode(F.LINE_STRIP)}else i.isPoints?g.setMode(F.POINTS):i.isSprite&&g.setMode(F.TRIANGLES);if(i.isBatchedMesh){if(we.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?De.get(c).bytesPerElement:1,o=z.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(F,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function Xe(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),ge===!0&&Pe.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,ct(e,t,r),e.side=0,e.needsUpdate=!0,ct(e,t,r),e.side=2):ct(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=Ne.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),_e=this.localClippingEnabled,ge=Pe.init(this.clippingPlanes,_e),ge===!0&&Pe.setGlobalState(this.clippingPlanes,t),D!==null&&V.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];Xe(o,n,t,e),r.add(o)}else Xe(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=z.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}we.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let Ze=null;function Qe(e){Ze&&Ze(e)}function $e(){tt.stop()}function et(){tt.start()}let tt=new zv;tt.setAnimationLoop(Qe),typeof self<`u`&&tt.setContext(self),this.setAnimationLoop=function(e){Ze=e,Ue.setAnimationLoop(e),e===null?tt.stop():tt.start()},Ue.addEventListener(`sessionstart`,$e),Ue.addEventListener(`sessionend`,et),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){W(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Ue.enabled===!0&&Ue.isPresenting===!0,r=w!==null&&(N===null||n)&&w.begin(T,N);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Ue.enabled===!0&&Ue.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ue.cameraAutoUpdate===!0&&Ue.updateCamera(t),t=Ue.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,N),x=Ne.get(e,C.length),x.init(t),x.state.textureUnits=B.getTextureUnits(),C.push(x),ve.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?he.setFromArrayCamera(t):me.setFromProjectionMatrix(ve,Lf,t.reversedDepth),_e=this.localClippingEnabled,ge=Pe.init(this.clippingPlanes,_e),b=Me.get(e,S.length),b.init(),S.push(b),this.info.render.frame++,Ue.enabled===!0&&Ue.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&nt(e,t,-1/0,T.sortObjects)}nt(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(le,ue),Se=Ue.enabled===!1||Ue.isPresenting===!1||Ue.hasDepthSensing()===!1,Se&&Fe.addToRenderList(b,e),this.info.autoReset===!0&&this.info.reset(),ge===!0&&Pe.beginShadows();let i=x.state.shadowsArray;if(V.render(i,e,t),ge===!0&&Pe.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];it(n,r,e,a)}Se&&Fe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];rt(b,e,n,n.viewport)}}else r.length>0&&it(n,r,e,t),Se&&Fe.render(e),rt(b,e,t)}N!==null&&M===0&&(B.updateMultisampleRenderTarget(N),B.updateRenderTargetMipmap(N)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Be.resetDefaultState(),ee=-1,te=null,C.pop(),C.length>0?(x=C[C.length-1],B.setTextureUnits(x.state.textureUnits),ge===!0&&Pe.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function nt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?he:me;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&be.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ve);let i=ke.update(e),a=e.material;a.visible&&b.push(e,i,a,n,be.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?he:me;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=ke.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),be.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),be.copy(e.boundingSphere.center)),be.applyMatrix4(e.matrixWorld).applyMatrix4(ve)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,be.z,s,t)}}else a.visible&&b.push(e,i,a,n,be.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)nt(i[e],t,n,r)}function rt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),ge===!0&&Pe.setGlobalState(T.clippingPlanes,n),r&&R.viewport(P.copy(r)),i.length>0&&at(i,t,n),a.length>0&&at(a,t,n),o.length>0&&at(o,t,n),R.buffers.depth.setTest(!0),R.buffers.depth.setMask(!0),R.buffers.color.setMask(!0),R.setPolygonOffset(!1)}function it(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=we.has(`EXT_color_buffer_half_float`)||we.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Ep(1,1,{generateMipmaps:!0,type:e?Cd:gd,minFilter:hd,samples:Math.max(4,L.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:pp.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||P;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(ie),ae=T.getClearAlpha(),ae<1&&T.setClearColor(16777215,.5),T.clear(),Se&&Fe.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),ge===!0&&Pe.setGlobalState(T.clippingPlanes,r),at(e,n,r),B.updateMultisampleRenderTarget(a),B.updateRenderTargetMipmap(a),we.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,ot(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(B.updateMultisampleRenderTarget(a),B.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(ie,ae),d!==void 0&&(r.viewport=d),T.toneMapping=u}function at(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&ot(o,t,n,s,l,c)}}function ot(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function st(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function ct(e,t,n){t.isScene!==!0&&(t=xe);let r=z.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Ae.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Ae.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Ee.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,qe),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return dt(e,s),d}else s.uniforms=Ae.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Ae.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Pe.uniform),dt(e,s),r.needsLights=mt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=st(x.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function lt(e,t,n,r,i){let a=z.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=ct(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function ut(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Ab.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function dt(e,t){let n=z.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function ft(e,t,n,r,i){t.isScene!==!0&&(t=xe),B.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=N===null?T.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:pp.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Ee.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=z.get(r),b=x.state.lights;if(ge===!0&&(_e===!0||e!==te)){let t=e===te&&r.id===ee;Pe.setState(r,e,t)}let S=!1,C=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==b.state.version||i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?S=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Pe.numPlanes||v.numIntersection!==Pe.numIntersection)?S=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.morphTargetsCount===_&&v.numLightProbeGrids===st(x.state.lightProbeGridArray)?(v.outputColorSpace!==s||v.toneMapping!==h)&&(C=!0):S=!0:S=!0:(S=!0,v.__version=r.version);let w=v.currentProgram;(S===!0||C===!0)&&(w=C===!0?lt(r,t,i,s,h):ct(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,w,v));let E=!1,O=!1,k=!1,A=w.getUniforms(),j=v.uniforms;if(R.useProgram(w.program)&&(E=!0,O=!0,k=!0),r.id!==ee&&(ee=r.id,O=!0),E||te!==e){R.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),A.setValue(F,`projectionMatrix`,e.projectionMatrix),A.setValue(F,`viewMatrix`,e.matrixWorldInverse);let t=A.map.cameraPosition;t!==void 0&&t.setValue(F,ye.setFromMatrixPosition(e.matrixWorld)),L.logarithmicDepthBuffer&&A.setValue(F,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&A.setValue(F,`isOrthographic`,e.isOrthographicCamera===!0),te!==e&&(te=e,O=!0,k=!0)}if(v.needsLights&&(b.state.sunShadowMap.length>0&&A.setValue(F,`sunShadowMap`,b.state.sunShadowMap,B),b.state.directionalShadowMap.length>0&&A.setValue(F,`directionalShadowMap`,b.state.directionalShadowMap,B),b.state.spotShadowMap.length>0&&A.setValue(F,`spotShadowMap`,b.state.spotShadowMap,B),b.state.pointShadowMap.length>0&&A.setValue(F,`pointShadowMap`,b.state.pointShadowMap,B)),i.isSkinnedMesh){A.setOptional(F,i,`bindMatrix`),A.setOptional(F,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),A.setValue(F,`boneTexture`,e.boneTexture,B))}i.isBatchedMesh&&(A.setOptional(F,i,`batchingTexture`),A.setValue(F,`batchingTexture`,i._matricesTexture,B),A.setOptional(F,i,`batchingIdTexture`),A.setValue(F,`batchingIdTexture`,i._indirectTexture,B),A.setOptional(F,i,`batchingColorTexture`),i._colorsTexture!==null&&A.setValue(F,`batchingColorTexture`,i._colorsTexture,B));let M=n.morphAttributes;if((M.position!==void 0||M.normal!==void 0||M.color!==void 0)&&Ie.update(i,n,w),(O||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,A.setValue(F,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(j.envMapIntensity.value=t.environmentIntensity),j.dfgLUT!==void 0&&(j.dfgLUT.value=qx()),O){if(A.setValue(F,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&pt(j,k),a&&r.fog===!0&&je.refreshFogUniforms(j,a),je.refreshMaterialUniforms(j,r,ce,se,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.numLightProbeGrids>0){let e=y,t=0;for(let n of x.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;j.probesSH.value=e.textures,j.probesMin.value=e.min,j.probesMax.value=e.max,j.probesResolution.value=e.resolution}Ab.upload(F,ut(v),j,B)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Ab.upload(F,ut(v),j,B),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&A.setValue(F,`center`,i.center),A.setValue(F,`modelViewMatrix`,i.modelViewMatrix),A.setValue(F,`normalMatrix`,i.normalMatrix),A.setValue(F,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Ve.update(n,w),Ve.bind(n,w)}}return w}function pt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function mt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(e,t,n){let r=z.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),z.get(e.texture).__webglTexture=t,z.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=z.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){N=e,j=t,M=n;let r=null,i=!1,a=!1;if(e){let o=z.get(e);if(o.__useDefaultFramebuffer!==void 0){R.bindFramebuffer(F.FRAMEBUFFER,o.__webglFramebuffer),P.copy(e.viewport),ne.copy(e.scissor),re=e.scissorTest,R.viewport(P),R.scissor(ne),R.setScissorTest(re),ee=-1;return}if(o.__webglFramebuffer===void 0)B.setupRenderTarget(e);else if(o.__hasExternalTextures)B.rebindTextures(e,z.get(e.texture).__webglTexture,z.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&z.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);B.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=z.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&B.useMultisampledRTT(e)===!1?z.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,P.copy(e.viewport),ne.copy(e.scissor),re=e.scissorTest}else P.copy(de).multiplyScalar(ce).floor(),ne.copy(fe).multiplyScalar(ce).floor(),re=pe;if(n!==0&&(r=O),R.bindFramebuffer(F.FRAMEBUFFER,r)&&R.drawBuffers(e,r),R.viewport(P),R.scissor(ne),R.setScissorTest(re),i){let r=z.get(e.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=z.get(e.textures[t]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=z.get(e.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,t.__webglTexture,n)}ee=-1};function ht(e){let t=z.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=L.textureFormatReadable(e.format),t.__typeReadable=L.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){W(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=z.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){R.bindFramebuffer(F.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+s);let u=ht(o);if(u.__formatReadable===!1){W(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){W(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&F.readPixels(t,n,r,i,ze.convert(c),ze.convert(l),a)}finally{let e=N===null?null:z.get(N).__webglFramebuffer;R.bindFramebuffer(F.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=z.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){R.bindFramebuffer(F.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+s);let d=ht(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,f),F.bufferData(F.PIXEL_PACK_BUFFER,a.byteLength,F.STREAM_READ),F.readPixels(t,n,r,i,ze.convert(l),ze.convert(u),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let p=N===null?null:z.get(N).__webglFramebuffer;R.bindFramebuffer(F.FRAMEBUFFER,p);let m=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Kf(F,m,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,f),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,a),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(f),F.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;B.setTexture2D(e,0),F.copyTexSubImage2D(F.TEXTURE_2D,n,0,0,o,s,i,a),R.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=ze.convert(t.format),_=ze.convert(t.type),v;t.isData3DTexture?(B.setTexture3D(t,0),v=F.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(B.setTexture2DArray(t,0),v=F.TEXTURE_2D_ARRAY):(B.setTexture2D(t,0),v=F.TEXTURE_2D),R.activeTexture(F.TEXTURE0),R.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,t.flipY),R.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),R.pixelStorei(F.UNPACK_ALIGNMENT,t.unpackAlignment);let y=R.getParameter(F.UNPACK_ROW_LENGTH),b=R.getParameter(F.UNPACK_IMAGE_HEIGHT),x=R.getParameter(F.UNPACK_SKIP_PIXELS),S=R.getParameter(F.UNPACK_SKIP_ROWS),C=R.getParameter(F.UNPACK_SKIP_IMAGES);R.pixelStorei(F.UNPACK_ROW_LENGTH,h.width),R.pixelStorei(F.UNPACK_IMAGE_HEIGHT,h.height),R.pixelStorei(F.UNPACK_SKIP_PIXELS,l),R.pixelStorei(F.UNPACK_SKIP_ROWS,u),R.pixelStorei(F.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=z.get(e),r=z.get(t),h=z.get(n.__renderTarget),g=z.get(r.__renderTarget);R.bindFramebuffer(F.READ_FRAMEBUFFER,h.__webglFramebuffer),R.bindFramebuffer(F.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,z.get(e).__webglTexture,i,d+n),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,z.get(t).__webglTexture,a,m+n)),F.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,F.DEPTH_BUFFER_BIT,F.NEAREST);R.bindFramebuffer(F.READ_FRAMEBUFFER,null),R.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||z.has(e)){let n=z.get(e),r=z.get(t);R.bindFramebuffer(F.READ_FRAMEBUFFER,k),R.bindFramebuffer(F.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,n.__webglTexture,i),T?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,r.__webglTexture,a),i===0?T?F.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):F.copyTexSubImage2D(v,a,f,p,l,u,o,s):F.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,F.COLOR_BUFFER_BIT,F.NEAREST);R.bindFramebuffer(F.READ_FRAMEBUFFER,null),R.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?F.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?F.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):F.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):F.texSubImage2D(F.TEXTURE_2D,a,f,p,o,s,g,_,h);R.pixelStorei(F.UNPACK_ROW_LENGTH,y),R.pixelStorei(F.UNPACK_IMAGE_HEIGHT,b),R.pixelStorei(F.UNPACK_SKIP_PIXELS,x),R.pixelStorei(F.UNPACK_SKIP_ROWS,S),R.pixelStorei(F.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&F.generateMipmap(v),R.unbindTexture()},this.initRenderTarget=function(e){z.get(e).__webglFramebuffer===void 0&&B.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?B.setTextureCube(e,0):e.isData3DTexture?B.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?B.setTexture2DArray(e,0):B.setTexture2D(e,0),R.unbindTexture()},this.resetState=function(){j=0,M=0,N=null,R.reset(),Be.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Lf}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=pp._getDrawingBufferColorSpace(e),t.unpackColorSpace=pp._getUnpackColorSpace()}},Yx=new K;function Xx(e,t,n,r,i,a,o,s,c,l){let u=-1,d=a;for(let a=0;a<t.length;a++){let f=t[a],p=f.px-o,m=f.py-s,h=f.pz-c;if(p*p+m*m+h*h>l*l||(Yx.set(f.px,f.py,f.pz).project(e),Yx.z>1||Yx.z<-1))continue;let g=(Yx.x-n)*i,_=Yx.y-r,v=Math.sqrt(g*g+_*_);v<d&&(d=v,u=a)}return u}function Zx(){return{state:0,speed:0,vy:0,brake:!1,rolling:!1,ropeDirX:0,ropeDirY:1,ropeDirZ:0,dt:0,events:0,ropeLen:gS,impact:0,deadCause:0,win:0,hookFlying:0}}var Qx=.965,$x=.08,eS=.2,tS=.5,nS=.29,rS=.28,iS=[.12,.1,.08,.08,.07,.04,.2,.15,.06],aS=.5,oS=.3,sS=.4,cS=.1,lS=1/120,uS=4.5,dS=.3,fS=.035,pS=.012,mS=.45,hS=1.2,gS=20,_S=.6,vS=1.6,yS=.7,bS=.08,xS=.15,SS=Math.PI*2,CS=.08,wS=.75,TS=10,ES=.9,DS=.14,OS=.12,kS=.6,AS=.35,jS=.12,MS=9.81,NS=14,PS=.35,FS=.05,IS=.1,LS=.28,RS=1,zS=2,BS=4,VS=16,HS=32,US=64;function WS(e){let t=new Float64Array(25);for(let n=0;n<e.length;n++)t[e[n][0]]=e[n][1];return t}var GS=WS([[4,.04],[6,-.04],[8,.12],[11,.12],[7,.08],[10,-.04],[9,.3],[12,.22],[14,.06],[17,.06],[13,.08],[15,.14],[18,.06]]),KS=WS([[0,-.04],[4,.2],[6,-.15],[7,-.5],[10,1],[8,.5],[11,.35],[9,.5],[12,.7],[13,1.1],[15,1.3],[16,-.25],[18,.7]]),qS=WS([[0,-.06],[4,.08],[6,.25],[7,.35],[10,.2],[8,1.15],[11,1.05],[9,.45],[12,.35],[13,.7],[15,1],[16,.2],[18,.55],[14,.1],[17,.1]]),JS=WS([[0,-.075],[2,-.1],[4,-.04],[6,-.12],[7,2.95],[10,2.95],[9,.15],[12,.15],[13,.4],[14,.06],[15,1.15],[16,.3],[17,.06],[18,1]]),YS=WS([[1,.05],[2,-.25],[4,-.3],[5,.2],[6,.2],[7,3],[8,.1],[9,.15],[10,-.45],[11,.95],[12,.5],[13,1.15],[15,1.25],[16,.85],[18,1.5]]),XS=WS([[0,-.45],[4,.9],[6,.6],[7,.9],[10,.9],[8,.1],[11,.1],[9,1.6],[12,1.6],[13,2],[16,2],[15,2.2],[18,2.2]]),ZS=WS([[0,-.8],[1,-.1],[2,-1.45],[3,.22],[4,.15],[5,.3],[6,.45],[7,.35],[8,1.35],[9,.35],[10,-.2],[11,.55],[12,1],[13,.65],[14,.2],[15,1.25],[16,-.05],[17,.12],[18,.15]]),QS=WS([[4,-.12],[6,-.25],[7,2.6],[10,2.6],[8,.5],[11,.5],[9,.25],[12,.25],[14,.12],[17,.12],[15,.05],[18,.05]]),$S=WS([[0,-.075],[2,.15],[4,-.05],[6,-.3],[7,2.95],[10,2.95],[9,.2],[12,.2],[13,.75],[16,.6],[15,.95],[18,.8]]),eC=WS([[0,-.55],[2,1.2],[3,.35],[4,.35],[5,-.25],[6,-.3],[7,1.6],[8,.4],[9,1.9],[10,.9],[11,.9],[12,1.2],[13,1.5],[15,2.1],[16,.6],[18,.9]]),tC=new Float64Array([0,0,.05,-.07,.12,.02,.24,0]),nC=new Float64Array([0,0,.05,.6,.12,-.15,.24,0]),rC=new Float64Array([0,0,.05,.45,.12,-.1,.24,0]),iC=new Float64Array([0,0,.05,-.5,.12,1.1,.24,0]),aC=new Float64Array([0,0,.05,.15,.12,-.05,.24,0]),oC=new Float64Array([0,0,.05,.1,.12,-.08,.24,0]),sC=.24,cC=new Float64Array([0,0,.25,.14,.6,-.03,1,0]),lC=new Float64Array([0,0,.3,-.22,1,0]),uC=new Float64Array([0,0,.3,.9,1,0]),dC=new Float64Array([0,0,.3,.7,1,0]),fC=new Float64Array([0,0,.3,.35,1,0]),pC=new Float64Array([0,0,.3,.3,1,0]),mC=new Float64Array([0,0,.05,-.06,.15,0]),hC=new Float64Array([0,0,.05,-.15,.2,0]),gC=new Float64Array([0,0,.06,-.05,.25,0]),_C=.25,vC=new Float64Array([0,1.6,.35,0]),yC=new Float64Array([0,0,.12,.5,.35,0]),bC=new Float64Array([0,-.25,.3,0]),xC=new Float64Array([0,-.2,.3,0]),SC=.35,CC=new Float64Array([0,0,.05,.06,.18,0]),wC=new Float64Array([0,0,.05,.2,.25,0]),TC=.25,EC=new Float64Array([0,0,.06,-.6,.3,0]),DC=new Float64Array([0,0,.08,.8,.4,0]),OC=.4,kC=new Float64Array([0,0,.06,.18,.2,0]),AC=new Float64Array([0,0,.08,-.25,.3,0]),jC=.3,MC=1.2,NC=new Float64Array([0,0,.1,.08,.25,-.06,.4,0]),PC=new Float64Array([0,0,.25,.05,.4,0]),FC=.4;function IC(e,t){let n=e.length;if(t<e[0]||t>e[n-2])return 0;for(let r=2;r<n;r+=2)if(t<=e[r]){let n=e[r-2],i=e[r]-n,a=i>0?(t-n)/i:1,o=a*a*(3-2*a);return e[r-1]+(e[r+1]-e[r-1])*o}return e[n-1]}var LC=class{weights=new Float64Array(9);channels=new Float64Array(25);rows=new Float64Array(225);active=0;phase=0;time=0;rollT=0;prevState=-1;prevSpeed=0;accel=0;swing=0;swingVel=0;scarf=.3;prevYaw=0;yawRate=0;initialized=0;reach=0;hemP=0;hemPV=0;hemR=0;hemRV=0;tJump=-1;tLand=-1;tAttach=-1;tRelease=-1;tCling=-1;tDie=-1;tWin=-1;landA=0;landRoll=0;attachS=1;dieCause=0};function RC(e){return e>0?Math.min(2.4,e/(1.6+.3*e)):0}function zC(e,t){if(t.state===2)return 6;if(t.win===1)return 7;if(t.state===3)return t.brake?4:3;if(t.state===4)return 8;if(t.rolling)return 5;if(t.state===1)return 2;let n=e.active===1;return t.speed>aS||n&&t.speed>oS?1:0}function BC(e,t,n){return e<t?t:e>n?n:e}function VC(e,t,n){let r=t*25;for(let t=0;t<25;t++)e.rows[r+t]=n[t];return r}function HC(e,t){let n=e.rows,r=GC(1);for(let e=0;e<25;e++)n[r+e]=0;let i=BC(t/6,.3,1),a=e.phase*SS,o=Math.sin(a),s=Math.cos(a),c=.12+.22*i;n[r+0]=-.05*i+.04*i*Math.cos(2*a),n[r+4]=c,n[r+5]=.18*i*o,n[r+6]=-.6*c,n[r+13]=.2+.85*i*o,n[r+16]=.2-.85*i*o,n[r+15]=.25+1.15*i*(.5+.5*s),n[r+18]=.25+1.15*i*(.5-.5*s),n[r+7]=-.9*i*o,n[r+10]=.9*i*o,n[r+8]=.15,n[r+11]=.15,n[r+9]=1.2+.25*i,n[r+12]=1.2+.25*i}function UC(e,t){let n=e.rows,r=e.time,i=Math.sin(SS*LS*r);n[t+4]-=.025*i,n[t+6]+=.015*i,n[t+8]+=.02*i,n[t+11]+=.02*i,n[t+0]+=.004*i,n[t+3]+=.02*Math.sin(SS*.11*r)}function WC(e){let t=VC(e,7,QS),n=Math.sin(SS*1.2*e.time);e.rows[t+7]+=.2*n,e.rows[t+10]-=.2*n}function GC(e){return e*25}function KC(e,t){let n=e.rows,r=GC(2),i=.5+.5*BC(t/5,-1,1);for(let e=0;e<25;e++)n[r+e]=qS[e]+(KS[e]-qS[e])*i;let a=.17*(1-i)*Math.sin(e.time*1.5*SS);n[r+13]+=a,n[r+16]-=a}function qC(e,t,n,r,i){let a=VC(e,t,n),o=r.ropeDirX,s=r.ropeDirY,c=r.ropeDirZ;s>.2||(o=0,s=1,c=0);let l=Math.cos(i),u=Math.sin(i),d=o*l-c*u,f=o*u+c*l,p=BC(Math.atan2(f,s),-.7,yS),m=BC(Math.atan2(-d,s),-.7,yS);e.rows[a+19]=p+e.swing,e.rows[a+20]=m}function JC(e,t){let n=e[t+2],r=n+e[t+4],i=Qx+e[t+0]+$x*Math.cos(n)+tS*Math.cos(r),a=e[t+1]+$x*Math.sin(n)+tS*Math.sin(r),o=2-i,s=-a,c=Math.cos(r),l=Math.sin(r),u=o*c+s*l,d=-o*l+s*c,f=Math.sqrt(u*u+d*d),p=Math.atan2(d,-u),m=0,h=Math.PI,g=0;for(let e=0;e<2;e++){let e=Math.cos(m),t=nS*e,n=rS*e,r=BC(f,Math.abs(t-n)+.001,t+n-1e-4),i=Math.acos(BC((t*t+n*n-r*r)/(2*t*n),-1,1)),a=Math.acos(BC((t*t+r*r-n*n)/(2*t*r),-1,1));g=Math.PI-i,h=p-a;let o=nS+rS*Math.cos(g);m=Math.asin(BC(-.13/o,-1,1))}e[t+7]=h,e[t+10]=h,e[t+8]=m,e[t+11]=m,e[t+9]=g,e[t+12]=g}function YC(e,t,n,r){qC(e,3,JS,t,n);let i=e.rows,a=GC(3),o=BC(r/TS,0,1),s=e.time,c=Math.sin(SS*wS*s);i[a+19]+=CS*(.3+.7*o)*c,i[a+4]+=.03*o*Math.sin(SS*wS*s-.8);let l=Math.atan(r*e.yawRate/MS)*kS;i[a+20]-=BC(l,-.35,AS);let u=BC(OS*e.swingVel,-.25,.25),d=DS*(.35+.65*o),f=SS*ES*s;i[a+13]+=u+d*Math.sin(f),i[a+16]+=u+d*Math.sin(f+1.1),i[a+15]+=.6*d*Math.sin(f-.7),i[a+18]+=.6*d*Math.sin(f+.4),i[a+15]+=.12*o*Math.sin(SS*ES*s+Math.PI/2),i[a+18]+=.12*o*Math.sin(SS*ES*s-Math.PI/2),JC(i,a)}function XC(e){let t=VC(e,5,XS),n=SS*Math.min(1,e.rollT/sS);n>Math.PI&&(n-=SS),e.rows[t+2]=n}function ZC(e,t,n,r){for(let n=0;n<9;n++)e.weights[n]=+(n===t);e.phase=0,e.rollT=0,e.prevSpeed=n,e.prevYaw=r,e.yawRate=0,e.accel=0,e.swing=0,e.swingVel=0,e.reach=0,e.hemP=0,e.hemPV=0,e.hemR=0,e.hemRV=0,e.tJump=-1,e.tLand=-1,e.tAttach=-1,e.tRelease=-1,e.tCling=-1,e.tDie=-1,e.tWin=-1,e.initialized=1}function QC(e,t,n){let r=t.state===3?BC(fS*e.accel+pS*t.speed,-.45,mS):0,i=Math.ceil(n/lS);i>12&&(i=12);let a=i>0?n/i:0,o=uS*uS,s=2*dS*uS;for(let t=0;t<i;t++)e.swingVel+=(o*(r-e.swing)-s*e.swingVel)*a,e.swing+=e.swingVel*a}function $C(e,t){let n=t.events|0;if(n!==0){if((n&zS)!==0&&(e.tJump=0),(n&RS)!==0){let n=(t.impact-2)/9;e.landA=n<0?0:n>1?1:n,e.landRoll=+!!t.rolling,e.tLand=0}(n&VS)!==0&&(e.attachS=BC(t.speed/10,.3,1),e.tAttach=0),(n&BS)!==0&&(e.tRelease=0),(n&HS)!==0&&(e.tCling=0),(n&US)!==0&&(e.dieCause=t.deadCause,e.tDie=0)}}function ew(e,t){let n=e.channels;if(e.tJump>=0){let r=e.tJump;n[0]+=IC(tC,r);let i=IC(nC,r);n[15]+=i,n[18]+=i;let a=IC(rC,r);n[13]+=a,n[16]+=a;let o=IC(iC,r);n[7]+=o,n[10]+=o,n[4]+=IC(aC,r),n[24]+=IC(oC,r),e.tJump=r+t>sC?-1:r+t}if(e.tLand>=0){let r=e.landA,i=.12+.18*r,a=e.tLand/i;if(e.landRoll===1)n[24]+=.5*r*IC(cC,a);else{n[24]+=r*IC(cC,a),n[0]+=r*IC(lC,a);let e=r*IC(uC,a);n[15]+=e,n[18]+=e;let t=r*IC(dC,a);n[13]+=t,n[16]+=t,n[4]+=r*IC(fC,a);let i=r*IC(pC,a);n[8]+=i,n[11]+=i}e.tLand=e.tLand+t>i?-1:e.tLand+t}if(e.tAttach>=0){let r=e.tAttach,i=e.attachS;n[24]+=i*IC(mC,r);let a=IC(hC,r);n[9]+=a,n[12]+=a,n[0]+=i*IC(gC,r),e.tAttach=r+t>_C?-1:r+t}if(e.tRelease>=0){let r=e.tRelease,i=IC(vC,r);n[7]+=i,n[10]+=i;let a=IC(yC,r);n[13]+=a,n[16]+=a,n[4]+=IC(bC,r),n[6]+=IC(xC,r),e.tRelease=r+t>SC?-1:r+t}if(e.tCling>=0){let r=e.tCling;n[24]+=IC(CC,r),n[4]+=IC(wC,r),e.tCling=r+t>TC?-1:r+t}if(e.tDie>=0){let r=e.tDie,i=MC;if(e.dieCause===2){n[6]+=IC(EC,r);let e=IC(DC,r);n[8]+=e,n[11]+=e,i=OC}else if(e.dieCause===3)n[24]+=IC(kC,r),n[0]+=IC(AC,r),i=jC;else if(r<=MC){let e=Math.exp(-r/.6),t=.4*e*Math.sin(SS*3*r),i=.3*e*Math.sin(SS*2.5*r);n[8]+=t,n[11]-=t,n[13]+=i,n[16]-=i}e.tDie=r+t>i?-1:r+t}if(e.tWin>=0){let r=e.tWin;n[24]+=IC(NC,r),n[0]+=IC(PC,r),e.tWin=r+t>FC?-1:r+t}}function tw(e,t,n,r,i){let a=e.active,o=0,s=0;a===3||a===4?o=-.5*e.swing:a!==6&&(o=-BC(.012*r+.02*Math.max(0,-t.vy),0,.3)-.2*BC(e.accel/10,-1,1)+.05*i*Math.sin(2*SS*e.phase+Math.PI/2),s=.06*i*Math.sin(SS*e.phase+Math.PI/2)-.15*BC(e.yawRate/3,-1,1));let c=Math.ceil(n/lS);c>12&&(c=12);let l=c>0?n/c:0,u=2*PS*NS;for(let t=0;t<c;t++)e.hemPV+=(196*(o-e.hemP)-u*e.hemPV)*l,e.hemP+=e.hemPV*l,e.hemRV+=(196*(s-e.hemR)-u*e.hemRV)*l,e.hemR+=e.hemRV*l;e.channels[22]=BC(e.hemP,-.35,.2),e.channels[23]=BC(e.hemR,-.18,.18)}function nw(e,t,n){let r=t.dt>0?Math.min(t.dt,cS):0,i=t.speed>0?t.speed:0,a=zC(e,t);(e.initialized===0||e.prevState===2&&t.state!==2)&&ZC(e,a,i,n);let o=e.active;if(e.prevState=t.state,e.active=a,a===7&&o!==7&&(e.tWin=0),e.time+=r,e.phase+=RC(i)*r,e.phase-=Math.floor(e.phase),e.rollT=t.rolling?e.rollT+r:0,r>0){let t=(i-e.prevSpeed)/r;e.accel+=(t-e.accel)*(1-Math.exp(-r/bS));let a=(n-e.prevYaw)%SS;a>Math.PI&&(a-=SS),a<-Math.PI&&(a+=SS),e.yawRate+=(a/r-e.yawRate)*(1-Math.exp(-r/jS))}if(e.prevYaw=n,e.prevSpeed=i,QC(e,t,r),$C(e,t),(t.events&VS)!==0){let n=BC(t.ropeLen/gS,_S,vS);e.swingVel+=hS*n*e.attachS}let s=1-Math.exp(-r/iS[a]),c=0;for(let t=0;t<9;t++){let n=+(t===a);e.weights[t]+=(n-e.weights[t])*s,c+=e.weights[t]}UC(e,VC(e,0,GS)),HC(e,i),KC(e,t.vy),YC(e,t,n,i),qC(e,4,YS,t,n),XC(e),VC(e,6,t.deadCause===3?eC:ZS),WC(e),UC(e,VC(e,8,$S));let l=c>0?1/c:0;for(let t=0;t<25;t++){let n=0;for(let r=0;r<9;r++)n+=e.weights[r]*e.rows[r*25+t];e.channels[t]=n*l}if(ew(e,r),r>0){let n=+(t.hookFlying===1),i=n===1?FS:IS;e.reach+=(n-e.reach)*(1-Math.exp(-r/i))}let u=e.reach;if(u>0){let n=e.channels,r=t.ropeDirY<-1?-1:t.ropeDirY>1?1:t.ropeDirY,i=BC(Math.PI/2+Math.asin(r),.6,3);n[10]+=(i-n[10])*u,n[12]+=(.1-n[12])*u,n[5]-=.15*u}let d=e.active===1?BC(i/6,.3,1):0;tw(e,t,r,i,d);let f=t.state===2,p=f?.05:BC(.2+.12*i+.06*Math.abs(t.vy),.15,1.35);e.scarf+=(p-e.scarf)*(1-Math.exp(-r/xS));let m=f?0:.08*Math.min(1,i/8)*Math.sin(e.time*17);f||(i<.5&&(m+=.05*Math.sin(SS*.35*e.time)),m+=.1*d*Math.sin(2*SS*e.phase+2.2)),e.channels[21]=e.scarf+m;let h=e.channels[24];e.channels[24]=h<-.12?-.12:h>.18?.18:h}function rw(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new ih;c.morphTargetsRelative=s;let l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0,p=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let t in d.morphAttributes){if(!i.has(t))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;if(d.morphAttributes[t].length!==e[0].morphAttributes[t].length)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have the same number of morph targets for the "`+t+`" morph attribute.`),null;o[t]===void 0&&(o[t]=[]),o[t].push(d.morphAttributes[t]),p++}if(p!==i.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of morph attributes.`),null;if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=iw(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=iw(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function iw(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new Wm(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}function aw(e,t=1e-4){t=Math.max(t,2**-52);let n={},r=e.getIndex(),i=e.getAttribute(`position`),a=r?r.count:i.count,o=0,s=Object.keys(e.attributes),c=[],l=new Map,u=[],d=[`getX`,`getY`,`getZ`,`getW`],f=t*.5,p=10**Math.log10(1/t),m=f*p;for(let t=0;t<a;t++){let i=r?r.getX(t):t,a=``;for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.getAttribute(n),o=r.itemSize;for(let e=0;e<o;e++)a+=`${Math.trunc(r[d[e]](i)*p+m)},`}a in n?u.push(n[a]):(c.push(i),n[a]=o,u.push(o),o++)}let h=e.clone();for(let t in e.attributes)h.setAttribute(t,ow(e.attributes[t],c,l));for(let t in e.morphAttributes)h.morphAttributes[t]=e.morphAttributes[t].map(e=>ow(e,c,l));return h.setIndex(u),h}function ow(e,t,n=new Map){let r=e.isInterleavedBufferAttribute,i=r?e.data:e,a=r?i.stride:e.itemSize,o=r?n.get(i):void 0;if(o===void 0){let s=new i.array.constructor(t.length*a);for(let e=0;e<t.length;e++)for(let n=0;n<a;n++)s[e*a+n]=i.array[t[e]*a+n];o=r?new i.constructor(s,a,i.meshPerAttribute):new e.constructor(s,e.itemSize,e.normalized,e.meshPerAttribute),o.setUsage(i.usage),r&&n.set(i,o)}let s=r?new e.constructor(o,e.itemSize,e.offset,e.normalized):o;return s.name=e.name,r||(s.gpuType=e.gpuType),s}var sw={tunic:`#36444c`,trousers:`#2a2f3b`,crimson:`#dc2b34`,skin:`#a5674a`,hair:`#1f1a17`,leather:`#4a3426`},cw=.1,lw=.7,uw=.6,dw=new op,fw=new Rp,pw=new K(1,1,1);function mw(e,t,n,r,i=0,a=0,o=0){let s=e.clone();return dw.setFromEuler(fw.set(i,a,o)),s.applyMatrix4(new J().compose(new K(t,n,r),dw,pw)),s}function hw(e){let t=rw(e);for(let t of e)t.dispose();return t}function gw(e,t,n){let r=e.attributes.position;for(let e=0;e<n;e++){let i=e%(n-1),a=t+e,o=i%3==0?1.06:1;r.setXYZ(a,r.getX(a)*o,r.getY(a)+(i%2==0?-.025:.01),r.getZ(a)*o)}r.needsUpdate=!0,e.computeVertexNormals()}function _w(e,t){let n=new u_(e,t),r=e.length,i=n.attributes.position;for(let e=0;e<=t;e++){let n=e*r+(r-1),a=e%t,o=a%3==0?1.06:1;i.setXYZ(n,i.getX(n)*o,i.getY(n)+(a%2==0?-.025:.01),i.getZ(n)*o)}return i.needsUpdate=!0,n.computeVertexNormals(),n}function vw(e,t,n){let r=e.getAttribute(`position`),i=1/0,a=-1/0;for(let e=0;e<r.count;e++){let t=r.getY(e);t<i&&(i=t),t>a&&(a=t)}for(let e=0;e<r.count;e++){let o=n+(t-n)*((r.getY(e)-i)/(a-i));r.setX(e,r.getX(e)*o),r.setZ(e,r.getZ(e)*o)}r.needsUpdate=!0,e.deleteAttribute(`uv`),e.deleteAttribute(`normal`);let o=aw(e,1e-5);return o.computeVertexNormals(),o}function yw(e,t,n,r){let i=new Ng(e,t,n,r,1,!0);return gw(i,r+1,r+1),i}function bw(e){return hw([mw(new Ng(.05,.058,.06,7,1,!0),0,.05,0),mw(new Ag(.075,.085,.045),0,-.005,0),mw(new Ag(.08,.04,.05),0,-.055,.03,.5),mw(new Ag(.025,.05,.025),.045*e,-.02,.025)])}var xw=null;function Sw(){if(xw===null){let e=(e,t=.18,n=0)=>new T_({color:e,roughness:.85,metalness:0,emissive:e,emissiveIntensity:t,side:n});xw={tunic:e(sw.tunic,.1,2),trousers:e(sw.trousers),crimson:e(sw.crimson,.35),skin:e(sw.skin,.12),hair:e(sw.hair),leather:e(sw.leather)}}return xw}function Cw(e,t,n,r,i,a){let o=new Z(t,n);return o.position.set(r,i,a),e.add(o),o}function ww(e,t,n,r){let i=new nm;return i.position.set(t,n,r),e.add(i),i}var Tw=class{root;pose=new LC;yaw=0;swing;body;yoke;pelvis;spine;head;scarfTail;scarfTip;sashTail;shoulderL;elbowL;handL;shoulderR;elbowR;handR;hipL;kneeL;hipR;kneeR;constructor(){let e=Sw(),t=new Ag(.27,.17,.19),n=new Ng(.195,.19,.085,10),r=new Ag(.09,.3,.022),i=_w([new G(.16,.06),new G(.19,-.04),new G(.215,-.16)],10),a=new u_([new G(0,-.06),new G(.17,-.05),new G(.168,.1),new G(.172,.3),new G(.158,.44),new G(.095,.53),new G(0,.55)],10),o=new Ag(.045,.52,.02),s=hw([mw(o,0,.23,.15,.06,0,.55),mw(o,0,.23,-.15,-.06,0,.55)]),c=new Ng(.1,.13,.1,8),l=hw([mw(new Ag(.11,.44,.025),0,-.21,0,0,.5,0),mw(new Ag(.08,.3,.02),.05,-.14,-.01,0,-.6,-.25)]),u=new Ag(.06,.16,.2),d=new p_(.14,8,6),f=new p_(.153,8,4,0,Math.PI*2,0,Math.PI*.6),p=vw(new jg(.07,.17,1,6),1.15,.82),m=new Ng(.065,.1,.22,8,1,!0),h=bw(-1),g=bw(1),_=vw(new jg(.085,.31,1,6),1.2,.8),v=yw(.115,.135,.26,8),y=vw(new jg(.07,.3,1,6),1.12,.72),b=new jg(.06,.13,1,6);this.root=new nm,this.root.name=`heroRig`,this.swing=ww(this.root,0,2,0),this.body=ww(this.swing,0,-2,0),this.pelvis=ww(this.body,0,Qx,0),Cw(this.pelvis,t,e.trousers,0,-.01,0),Cw(this.pelvis,n,e.crimson,0,.07,0).scale.set(1,1,.82),this.yoke=ww(this.pelvis,0,0,0),Cw(this.yoke,i,e.tunic,0,0,0).scale.set(1,1,.85),Cw(this.pelvis,u,e.leather,.25,-.05,-.03),this.sashTail=ww(this.pelvis,.15,.06,-.12),Cw(this.sashTail,r,e.crimson,0,-.14,0).rotation.z=.12,this.spine=ww(this.pelvis,0,$x,0),Cw(this.spine,a,e.tunic,0,0,0).scale.set(1.1,1,.82),Cw(this.spine,s,e.leather,0,0,0),Cw(this.spine,c,e.crimson,0,.55,0).scale.set(1,1,.85),this.scarfTail=ww(this.spine,0,.56,-.12),Cw(this.scarfTail,l,e.crimson,0,0,0),this.scarfTip=ww(this.scarfTail,0,-.42,0),Cw(this.scarfTip,new Ag(.09,.2,.018),e.crimson,0,-.1,0),this.head=ww(this.spine,0,.6,0),Cw(this.head,d,e.skin,0,.14,.008).scale.set(.95,1.03,.96),Cw(this.head,f,e.hair,0,.156,-.012).rotation.x=-.6,Cw(this.head,new p_(.06,6,4),e.hair,0,.3,-.03),Cw(this.head,new Ag(.2,.04,.05),e.hair,0,.215,.115).rotation.x=.35,this.shoulderL=ww(this.spine,eS,tS,0),this.shoulderR=ww(this.spine,-eS,tS,0),this.elbowL=ww(this.shoulderL,0,-nS,0),this.elbowR=ww(this.shoulderR,0,-nS,0),this.handL=ww(this.elbowL,0,-rS,0),this.handR=ww(this.elbowR,0,-rS,0);for(let t=0;t<2;t++){let n=t===0?this.shoulderL:this.shoulderR,r=t===0?this.elbowL:this.elbowR,i=t===0?this.handL:this.handR;Cw(n,p,e.tunic,0,-.16,0),Cw(r,m,e.tunic,0,-.13,0),Cw(i,t===0?h:g,e.leather,0,0,0)}this.hipL=ww(this.pelvis,cw,-.05,0),this.hipR=ww(this.pelvis,-.1,-.05,0),this.kneeL=ww(this.hipL,0,-.43,0),this.kneeR=ww(this.hipR,0,-.43,0);for(let t=0;t<2;t++){let n=t===0?this.hipL:this.hipR,r=t===0?this.kneeL:this.kneeR;Cw(n,_,e.trousers,0,-.235,0),Cw(n,v,e.tunic,0,-.13,0),Cw(r,y,e.trousers,0,-.2,0);let i=Cw(r,b,e.leather,0,-.44,.04);i.rotation.x=Math.PI/2,i.scale.set(1,1,.75)}Ew(this.root)}};function Ew(e){e.updateMatrixWorld(!0);let t=[];e.traverse(n=>{n!==e&&n instanceof nm&&t.push(n)});let n=new Map;e.traverse(e=>{if(!(e instanceof Z))return;let r=e.material,i=n.get(r);i===void 0&&(i={geos:[],meshes:[]},n.set(r,i));let a=e.geometry.clone();a.deleteAttribute(`uv`),a.applyMatrix4(e.matrixWorld);let o=a.getAttribute(`position`).count,s=t.indexOf(e.parent),c=new Uint16Array(o*4),l=new Float32Array(o*4);for(let e=0;e<o;e++)c[e*4]=s,l[e*4]=1;a.setAttribute(`skinIndex`,new Gm(c,4)),a.setAttribute(`skinWeight`,new X(l,4)),i.geos.push(a),i.meshes.push(e)});let r=new Wh(t);for(let[t,i]of n){for(let e of i.meshes)e.parent?.remove(e),e.geometry.dispose();let n=new zh(hw(i.geos),t);n.name=`heroSkin`,n.frustumCulled=!1;let a=t.color.getHexString();n.userData.cast=a!==sw.skin.slice(1)&&a!==sw.hair.slice(1),e.add(n),n.bind(r,new J)}}function Dw(e,t){e.swing.rotation.set(t[19],0,t[20]),e.pelvis.position.set(0,Qx+t[0],t[1]),e.pelvis.rotation.set(t[2],0,t[3]),e.spine.rotation.set(t[4],t[5],0),e.head.rotation.x=t[6],e.scarfTail.rotation.x=t[21],e.scarfTip.rotation.x=t[21]*lw,e.sashTail.rotation.x=t[21]*uw,e.shoulderL.rotation.set(-t[7],0,t[8]),e.shoulderR.rotation.set(-t[10],0,-t[11]),e.elbowL.rotation.x=-t[9],e.elbowR.rotation.x=-t[12],e.hipL.rotation.set(-t[13],0,t[14]),e.hipR.rotation.set(-t[16],0,-t[17]),e.kneeL.rotation.x=t[15],e.kneeR.rotation.x=t[18];let n=t[24],r=n<-.12?-.12:n>.18?.18:n;e.body.scale.set(1+.5*r,1-r,1+.5*r),e.yoke.rotation.set(t[22],0,t[23])}function Ow(e,t){nw(e.pose,t,e.yaw),Dw(e,e.pose.channels)}var kw=Math.PI*2,Aw=.1,jw=class{group;rig;input;lastMs=-1;constructor(){this.group=new nm,this.rig=new Tw,this.group.add(this.rig.root),this.input=Zx()}update(e,t,n,r){this.group.position.set(e.px+(t.px-e.px)*n,e.py+(t.py-e.py)*n,e.pz+(t.pz-e.pz)*n);let i=(t.yaw-e.yaw)%kw;i>Math.PI&&(i-=kw),i<-Math.PI&&(i+=kw);let a=e.yaw+i*n;this.group.rotation.y=a;let o=this.input;o.state=t.dead===1?2:t.mode,o.speed=Math.sqrt(t.vx*t.vx+t.vz*t.vz),o.vy=t.vy,o.deadCause=t.deadCause,o.dt=r===void 0?this.clockDt():r,this.rig.yaw=a,Ow(this.rig,o)}clockDt(){let e=performance.now(),t=this.lastMs<0?0:(e-this.lastMs)/1e3;return this.lastMs=e,t<0?0:t>Aw?Aw:t}},Mw=7230002,Nw=11569232,Pw=16762938,Fw=7029798,Iw=4860956,Lw=9063224,Rw=.9,zw=.18,Bw=.72,Vw=40,Hw=8,Uw=.06,Ww=.012,Gw=.8,Kw={x:0,y:0,z:0,anchorId:-1,set:!1,live:!1},qw=new Y,Jw=new Y,Yw=new Y;qw.setHex(Mw),Jw.setHex(Nw),Yw.setHex(Pw);function Xw(e,t,n,r){return r.copy((e+t)%3==0?qw:Jw).lerp(Yw,n)}function Zw(e,t,n=null){let r=e.getAttribute(`position`),i=new Float32Array(r.count*3),a=new Y().setHex(t);for(let e=0;e<r.count;e++){let t=1;if(n!==null){let i=(r.getY(e)-n)/Rw;i-Math.floor(i)<zw&&(t=Bw)}i[e*3]=a.r*t,i[e*3+1]=a.g*t,i[e*3+2]=a.b*t}e.setAttribute(`color`,new Wm(i,3))}function Qw(e,t,n,r,i,a,o,s=1,c=null){let l=$w(new Ag(r-e,i-t,a-n,1,s,1));return l.translate((e+r)/2,(t+i)/2,(n+a)/2),Zw(l,o,c),l}function $w(e){return e.deleteAttribute(`uv`),e}function eT(e,t,n,r,i,a){let o=new Float32Array(1107),s=new Float32Array(1107),c=new Float32Array(1107),l=Math.hypot(r-e,i-t,a-n)*Ww,u=[],d=[],f=[];for(let o=0;o<=Vw;o++){let s=o/Vw;u.push(e+(r-e)*s),d.push(t+(i-t)*s-4*l*s*(1-s)),f.push(n+(a-n)*s)}let p=new Y;for(let e=0;e<=Vw;e++){let t=Math.max(0,e-1),n=Math.min(Vw,e+1),r=u[n]-u[t],i=d[n]-d[t],a=f[n]-f[t],l=Math.hypot(r,i,a)||1;r/=l,i/=l,a/=l;let m=-a,h=r,g=Math.hypot(m,0,h);g<1e-6?(m=1,h=0):(m/=g,h/=g);let _=i*h-a*0,v=a*m-r*h,y=r*0-i*m,b=e/Vw,x=b>Gw?(b-Gw)/.19999999999999996:0;for(let t=0;t<=Hw;t++){let n=t/Hw*Math.PI*2,r=Math.cos(n),i=Math.sin(n),a=r*m+i*_,l=r*0+i*v,g=r*h+i*y,b=(e*9+t)*3;o[b]=u[e]+a*Uw,o[b+1]=d[e]+l*Uw,o[b+2]=f[e]+g*Uw,s[b]=a,s[b+1]=l,s[b+2]=g,Xw(e,t,x,p),c[b]=p.r,c[b+1]=p.g,c[b+2]=p.b}}let m=[];for(let e=0;e<Vw;e++)for(let t=0;t<Hw;t++){let n=e*9+t,r=(e+1)*9+t;m.push(n,n+1,r+1,n,r+1,r)}let h=new ih;return h.setAttribute(`position`,new Wm(o,3)),h.setAttribute(`normal`,new Wm(s,3)),h.setAttribute(`color`,new Wm(c,3)),h.setIndex(m),h}function tT(e){let t=new nm;Kw.set=!1,Kw.live=!1,Kw.anchorId=-1;let n=e.spawn,r=-1;for(let t=0;t<e.solids.length;t++){let i=e.solids[t];if(e.style[t]===2&&n.x>=i.min.x-1e-6&&n.x<=i.max.x+1e-6&&n.z>=i.min.z-1e-6&&n.z<=i.max.z+1e-6&&n.y>=i.min.y-1e-6&&n.y<=i.max.y+3){r=t;break}}if(r<0||e.route.length===0)return t;let i=e.solids[r],a=e.anchors[e.route[0]];if(!a)return t;let o=i.max.y,s=i.min.x-2.6,c=i.max.z-1.2,l=o-6,u=o+2.4,d=[],f=.17;d.push(Qw(s-f,l,c-f,s+f,u,c+f,Fw,6,l));for(let e of[.4,1.2,1.9])d.push(Qw(s-.2,o+e-.04,c-.2,s+.2,o+e+.04,c+.2,Iw));d.push(Qw(s-.23,u,c-.23,s+.23,u+.16,c+.23,Iw));let p=$w(new Pg(.34,.32,4));p.rotateY(Math.PI/4),p.translate(s,u+.16+.16,c),Zw(p,Iw),d.push(p);for(let e of[2,2.15,2.3]){let t=$w(new Ng(.25,.25,.08,8,1,!0));t.translate(s,o+e,c),Zw(t,Mw),d.push(t)}for(let e of[o-3.6,o-5.6])d.push(Qw(s+f,e-.09,c-.11,i.min.x,e+.09,c+.11,Iw));d.push(Qw(s-.3,l-.4,c-.3,i.min.x,l,c+.3,Lw));let m=s+.2,h=o+2.2;Kw.x=m,Kw.y=h,Kw.z=c,Kw.anchorId=e.route[0],Kw.set=!0;let g=rw(d,!1);for(let e of d)e.dispose();let _=g.getIndex()?.count??0,v=eT(m,h,c,a.px,a.py,a.pz),y=rw([g,v],!1);g.dispose(),v.dispose();let b=new Z(y,new E_({vertexColors:!0}));return b.name=`ropePost`,b.frustumCulled=!1,b.userData.postIndexCount=_,b.onBeforeRender=()=>{y.setDrawRange(0,Kw.live?_:1/0)},t.add(b),t}var nT=Math.PI*2,rT=.05,iT=1.4,aT=4,oT=.035,sT=.02,cT=.35,lT=.27;function uT(e){let t=e.geometry.getAttribute(`position`);if(t===void 0||t.itemSize!==3)return null;let n=t,r=n.array;return n.setUsage(If),{attr:n,arr:r,base:new Float32Array(r),n:n.count}}function dT(e,t){let n=1/0,r=-1/0;for(let i=0;i<t;i++){let t=e[i*3+1];t<n&&(n=t),t>r&&(r=t)}return{yMin:n,yMax:r}}function fT(e){let t=uT(e);if(t===null)return;let{attr:n,arr:r,base:i,n:a}=t,{yMin:o}=dT(i,a);e.onBeforeRender=()=>{let e=performance.now()/1e3,t=nT*iT*e;for(let e=0;e<a;e++){let n=e*3;i[n+1]>o||(r[n+2]=i[n+2]+rT*Math.sin(t+aT*i[n]))}n.needsUpdate=!0}}function pT(e){let t=uT(e);if(t===null)return;let{attr:n,arr:r,base:i,n:a}=t,{yMin:o,yMax:s}=dT(i,a),c=Math.max(1e-6,s-o);e.onBeforeRender=()=>{let e=performance.now()/1e3,t=oT*Math.sin(nT*cT*e),s=sT*Math.sin(nT*lT*e+1);for(let e=0;e<a;e++){let n=e*3,a=(i[n+1]-o)/c;r[n]=i[n]+t*a,r[n+2]=i[n+2]+s*a}n.needsUpdate=!0}}function mT(e){e.traverse(e=>{let t=e;t.isMesh===!0&&(t.name===`decor_flag`?fT(t):t.name===`decor_canopy`&&pT(t))})}var hT=5,gT=2.4,_T=.5,vT=Math.PI*2;function yT(){let e=new Float32Array(60),t=[];for(let e=0;e<hT;e++){let n=e*4;t.push(n,n+2,n+3,n+1,n+3,n+2)}let n=new ih,r=new Wm(e,3);r.setUsage(If),n.setAttribute(`position`,r),n.setIndex(t);let i=new Z(n,new gh({color:`#2b1d1a`,side:2,fog:!1}));return i.name=`decor_birds`,i.frustumCulled=!1,i.onBeforeRender=(t,n,a)=>{let o=performance.now()/1e3;for(let t=0;t<hT;t++){let n=.12*o+vT*t/hT,r=18+3*t,i=Math.cos(n),a=Math.sin(n),s=3*Math.sin(.7*o+t),c=Math.sin(.25*o+t)>-.3?.45*Math.sin(vT*2.2*o+t):.15,l=i*r,u=a*r,d=gT/2,f=_T/2,p=t*12;e[p]=l+i*d,e[p+1]=s+c,e[p+2]=u+a*d,e[p+3]=l-i*d,e[p+4]=s+c,e[p+5]=u-a*d,e[p+6]=l-a*f,e[p+7]=s,e[p+8]=u+i*f,e[p+9]=l+a*f,e[p+10]=s,e[p+11]=u-i*f}r.needsUpdate=!0,i.position.set(a.position.x+60,a.position.y+22,a.position.z-115),i.updateMatrixWorld()},i}var bT=Math.tan(20*Math.PI/180),xT=-360,ST=-150,CT=5,wT=-260,TT=210,ET=100,DT=xT,OT=ST,kT=wT;function AT(e,t=30){let n=e===null?xT:e-t-TT;DT=Math.min(xT,n),DT===-360?(OT=ST,kT=wT):(OT=DT+TT,kT=DT+ET)}function jT(){return DT}function MT(){return OT}var NT=34,PT=52;function FT(e,t,n){let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)}function IT(e){return bT*e+-8}function LT(e,t){return .55*Math.sin(e*.045+1.7)*Math.cos(t*.038+.4)+.3*Math.sin(e*.11+t*.07+2.1)+.15*Math.sin(e*.27-t*.21)}function RT(e,t){let n=IT(t);if(t<OT){let e=OT-t;if(n=IT(OT)-CT*(1-Math.exp(-e/40)),t<kT){let e=kT-t;n+=6e-4*e*e}}else if(t>40){let e=t-40;n+=9e-4*e*e}let r=Math.abs(e),i=FT(NT,PT,r);if(i<=0)return n;let a=r-NT,o=.0014*a*a+.05*a;return n+i*(o+3.2*LT(e,t)*FT(NT,94,r))}var zT=`#678a3c`,BT=`#7c8c42`,VT=`#857a50`,HT=`#43763a`,UT=`#3f5a33`,WT=`#2f4a2f`,GT=`#6f6a5c`;function KT(e,t,n,r,i,a,o){let s=new Set(o);for(let e=r;e<=i+1e-6;e+=n)s.add(Math.round(e*100)/100);let c=n;for(let e=i;e<t;)c*=a,e+=c,s.add(Math.min(t,Math.round(e*100)/100));c=n;for(let t=r;t>e;)c*=a,t-=c,s.add(Math.max(e,Math.round(t*100)/100));return s.add(e),s.add(t),Array.from(s).sort((e,t)=>e-t)}function qT(e,t){return(Math.imul((e+1)*7919,(t+3)*104729+17)>>>0)/4294967296}function JT(e,t,n,r,i){let a=Math.abs(e),o=n-IT(t),s=Math.floor((t+400)/9)%3;r.set(zT),s===1&&r.lerp(new Y(BT),.7),a<14&&r.lerp(new Y(VT),.18*i);let c=Math.min(1,Math.max(0,(a-36)/40));r.lerp(new Y(HT),c*(.5+.5*i));let l=Math.min(1,Math.max(0,(o-18)/50));r.lerp(new Y(UT),l);let u=Math.min(1,Math.max(0,(o-55)/70));r.lerp(new Y(WT),u);let d=Math.min(1,Math.max(0,(o-110)/60));return r.lerp(new Y(GT),d*.6),r.multiplyScalar(.92+.14*i)}function YT(){let e=KT(-320,320,3,-42,42,1.22,[-34,34,0]),t=jT(),n=KT(t,200,3,-156,46,1.22,[40,MT(),-104,26]);if(t<-360){for(let e=-156;e>MT()-12;e-=12)n.push(e);n.push(MT()),n=Array.from(new Set(n.map(e=>Math.round(e*100)/100))).sort((e,t)=>e-t)}let r=e.length,i=n.length,a=[],o=[],s=[],c=new Y;for(let t=0;t<i;t++){let s=n[i-1-t];for(let n=0;n<r;n++){let r=e[n],i=RT(r,s);a.push(r,i,s),JT(r,s,i,c,qT(t,n)),o.push(c.r,c.g,c.b)}}for(let e=0;e+1<i;e++)for(let t=0;t+1<r;t++){let n=e*r+t,i=n+1,a=n+r,o=a+1;s.push(n,i,a,i,o,a)}let l=new ih;l.setAttribute(`position`,new X(a,3)),l.setAttribute(`color`,new X(o,3)),l.setIndex(s),l.computeVertexNormals();let u=new Z(l,new E_({vertexColors:!0}));return u.name=`decor_ground`,u}var XT=`/bhaaag/assets/textures/`,ZT=new Map;function QT(e){if(typeof document>`u`)return null;let t=ZT.get(e);return t||(t=new tv().load(XT+e+`.jpg`),t.wrapS=sd,t.wrapT=sd,t.colorSpace=Af,t.anisotropy=4,ZT.set(e,t)),t}function $T(e){if(typeof document>`u`)return null;let t=e+`_n`,n=ZT.get(t);return n||(n=new tv().load(XT+t+`.jpg`),n.wrapS=sd,n.wrapT=sd,n.colorSpace=jf,n.anisotropy=4,ZT.set(t,n)),n}var eE=[`body`,`cornice`,`window`,`roof`,`rail`,`deck`,`tank`,`parapet`,`canopy`,`trunk`,`flag`,`shutter`,`pot`,`wallBrick`,`wallPlaster`,`bracket`,`planter`,`conifer`,`trim`],tE={body:150,cornice:50,window:250,roof:20,rail:170,deck:28,tank:50,parapet:60,canopy:640,trunk:640,flag:260,shutter:60,pot:110,wallBrick:30,wallPlaster:20,bracket:155,planter:20,conifer:700,trim:700},nE=.74*Math.SQRT2,rE=2.18,iE=2.4,aE=.9,oE=1.05;function sE(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function cE(e,t){let n=e.getAttribute(`position`),r=[];for(let e=0;e<n.count;e++){let i=t(n.getY(e));r.push(i[0],i[1],i[2])}e.setAttribute(`color`,new X(r,3))}function lE(e,t){cE(e,()=>[t,t,t])}function uE(e,t){let n=new Y(t);cE(e,()=>[n.r,n.g,n.b])}function dE(e,t,n){let r=Math.max(1e-6,n-t);cE(e,e=>{let n=.6+.4*Math.min(1,Math.max(0,(e-t)/r))**.75;return[n,n,n]})}function fE(e,t,n,r,i,a,o=[]){let s=new Ag(e,t,n);if(s.translate(r,i,a),s.deleteAttribute(`uv`),o.length>0){let e=s.index,t=[];for(let n=0;n<6;n++)if(!(o.indexOf(n)>=0))for(let r=0;r<6;r++)t.push(e.getX(n*6+r));s.setIndex(t)}return s}function pE(e){let t=rw(e,!1);for(let t=0;t<e.length;t++)e[t].dispose();return t}function mE(){let e=new Ag(1,1,1);return e.translate(0,.5,0),e.deleteAttribute(`uv`),dE(e,0,1),e}function hE(e){let t=new Ag(1,1,1);return t.translate(0,.5,0),dE(t,0,1),gE(t,e,e),t}function gE(e,t,n){let r=e.getAttribute(`uv`);for(let e=0;e<r.count;e++)r.setXY(e,r.getX(e)*t,r.getY(e)*n)}function _E(e){return e.deleteAttribute(`uv`),lE(e,1),e}function vE(){let e=[],t=(t,n)=>{n===null?dE(t,0,oE):lE(t,n),e.push(t)};t(fE(iE,.06,.06,0,.87,0),null),t(fE(iE,.06,.06,0,.25,0),null);for(let e=0;e<6;e++)t(fE(.05,aE,.05,-1+e*.4,aE/2,0,[2,3]),null);return t(fE(.12,oE,.12,-1.14,oE/2,0),null),t(fE(.12,oE,.12,1.14,oE/2,0),null),t(fE(iE,.18,.03,0,.71,0),.7),pE(e)}function yE(){let e=fE(1,1,1,0,.5,0,[5]);dE(e,0,1);let t=new d_(.76,.8);t.translate(0,.5,.75),t.deleteAttribute(`uv`),lE(t,.4);let n=fE(1.2,.08,1.6,0,-.04,.3,[5]);lE(n,.72);let r=fE(1.3,.1,1.5,0,1.06,.25,[5]);lE(r,.85);let i=fE(1,.08,1.3,0,1.15,.2,[5]);lE(i,1);let a=[e,t,n,r,i];for(let e=0;e<2;e++){let t=new d_(.05,.8);t.translate(-.13+e*.26,.5,.76),t.deleteAttribute(`uv`),lE(t,.15),a.push(t);let n=new d_(.76,.05);n.translate(0,.37+e*.26,.76),n.deleteAttribute(`uv`),lE(n,.15),a.push(n)}return pE(a)}function bE(){let e=[0,.04,.1,.28,.49],t=[.5,.78,1,.88,1],n=new u_([new G(.56,0),new G(.74,.04),new G(.58,.1),new G(.34,.28),new G(0,.49)],4,Math.PI/4);return gE(n,12,2),cE(n,n=>{let r=0;for(let t=1;t<e.length;t++)Math.abs(e[t]-n)<Math.abs(e[r]-n)&&(r=t);let i=t[r];return[i,i,i]}),n}function xE(){let e=[];for(let t=-1;t<=1;t+=2)for(let n=-1;n<=1;n+=2){let r=fE(.08,1,.08,t*.42,.5,n*.42,[2,3]);lE(r,.55),e.push(r)}for(let t=-1;t<=1;t+=2){let n=new Ag(.04,1.1,.04);n.rotateZ(.7),n.translate(0,.5,t*.42),n.deleteAttribute(`uv`),lE(n,.5),e.push(n)}let t=fE(.04,1.9,.04,.5,.95,.2,[2,3]),n=fE(.04,1.9,.04,.5,.95,-.2,[2,3]);lE(t,.5),lE(n,.5),e.push(t,n);for(let t=0;t<5;t++){let n=fE(.04,.04,.4,.5,.25+t*.35,0,[2,3]);lE(n,.5),e.push(n)}let r=fE(1,.08,1,0,1.04,0);lE(r,.55),e.push(r);let i=new Ng(.5,.5,1.1,8);return i.translate(0,1.08+.55,0),e.push(_E(i)),pE(e)}function SE(){let e=new l_(1,1),t=e.getAttribute(`position`);for(let e=0;e<t.count;e++){let n=t.getX(e),r=t.getY(e),i=t.getZ(e),a=1+(sE((Math.imul(Math.round(n*1e3),73856093)^Math.imul(Math.round(r*1e3),19349663)^Math.imul(Math.round(i*1e3),83492791))>>>0)()*2-1)*.06;t.setXYZ(e,n*a,r*a,i*a)}return _E(e)}function CE(){let e=fE(.45,1.3,.04,-.705,.65,.02,[5]),t=fE(.45,1.3,.04,.705,.65,.02,[5]);return lE(e,.8),lE(t,.8),pE([e,t])}function wE(){let e=new Ng(.16,.12,.28,6,1,!0);e.translate(0,.14,0),e.deleteAttribute(`uv`);let t=e.toNonIndexed();e.dispose(),uE(t,`#9a4a2e`);let n=new l_(.24,0);return n.translate(0,.42,0),n.deleteAttribute(`uv`),uE(n,`#5d7a3a`),pE([t,n])}function TE(){let e=fE(.1,.5,.1,0,.25,.05),t=fE(.1,.07,.5,0,.465,.25),n=new Ag(.07,.07,.5);return n.rotateX(-.75),n.translate(0,.25,.22),n.deleteAttribute(`uv`),lE(e,.9),lE(t,1),lE(n,.8),pE([e,t,n])}function EE(){let e=fE(1.2,.35,.4,0,.175,0);lE(e,.55);let t=[e.toNonIndexed()];e.dispose();for(let e=0;e<2;e++){let n=new l_(.3,0);n.translate(-.3+e*.6,.5,0),n.deleteAttribute(`uv`),uE(n,e===0?`#5d7a3a`:`#6f8a3f`),t.push(n)}return pE(t)}function DE(){let e=[];for(let t=0;t<2;t++){let n=new Pg(t===0?1:.64,t===0?.62:.55,6,1,!0);n.translate(0,t===0?.31:.725,0),n.deleteAttribute(`uv`);let r=n.toNonIndexed();n.dispose(),dE(r,0,1),e.push(r)}return pE(e)}function OE(){let e=new Ng(.15,.2,1,5,1,!0);e.translate(0,.5,0);let t=new d_(.35,.25);return{body:mE(),cornice:mE(),window:yE(),roof:bE(),rail:vE(),deck:mE(),tank:xE(),parapet:mE(),canopy:SE(),trunk:_E(e),flag:_E(t),shutter:CE(),pot:wE(),wallBrick:hE(2),wallPlaster:hE(1.5),bracket:TE(),planter:EE(),conifer:DE(),trim:mE()}}function kE(e){return e.index?e.index.count/3:e.getAttribute(`position`).count/3}var AE=new J,jE=new op,ME=new K,NE=new K,PE=new K(0,1,0),FE=class{meshes;used;dropped;constructor(){let e=OE(),t=new E_({color:`#ffffff`,vertexColors:!0,flatShading:!0}),n=new E_({color:`#ffffff`,vertexColors:!0,flatShading:!0,side:2}),r=e=>new E_({color:`#ffffff`,vertexColors:!0,flatShading:!0,map:QT(e),normalMap:$T(e)}),i=r(`wall_brick`),a=r(`wall_plaster`),o=r(`roof_tile`),s={},c={},l={};for(let r=0;r<eE.length;r++){let u=eE[r],d=new $h(e[u],u===`flag`||u===`pot`||u===`shutter`?n:u===`wallBrick`?i:u===`wallPlaster`?a:u===`roof`?o:t,tE[u]);d.name=`decor_`+u,d.count=0,d.frustumCulled=!1,d.userData.cast=u===`wallBrick`||u===`wallPlaster`||u===`roof`,s[u]=d,c[u]=0,l[u]=0}this.meshes=s,this.used=c,this.dropped=l}add(e,t,n,r,i,a,o,s,c){let l=this.used[e];if(l>=tE[e])return this.dropped[e]++,!1;ME.set(t,n,r),jE.setFromAxisAngle(PE,s),NE.set(i,a,o),AE.compose(ME,jE,NE);let u=this.meshes[e];return u.setMatrixAt(l,AE),u.setColorAt(l,c),this.used[e]=l+1,!0}triangles(){let e=0;for(let t=0;t<eE.length;t++){let n=eE[t];e+=this.used[n]*kE(this.meshes[n].geometry)}return e}finish(){let e=new nm;for(let t=0;t<eE.length;t++){let n=eE[t],r=this.meshes[n];r.count=this.used[n],r.instanceMatrix.needsUpdate=!0,r.instanceColor&&(r.instanceColor.needsUpdate=!0),r.count>0&&e.add(r)}return e}},IE=2.8,LE=.5,RE=[`#9c5640`,`#8c4a38`,`#a8634a`],zE=[`#4a2c1c`,`#5a3622`],BE=`#a99a88`,VE=[`#26282c`,`#2e6b47`],HE=[`#4a2c1c`,`#5a3622`,`#7c3e2e`,`#2e6b47`],UE=`#8e8574`,WE=[`#d9c6aa`,`#cfb99a`,`#e0cfb4`,`#e6d9c0`,`#d8b98e`,`#c9a27a`,`#e3c9b0`,`#b9c4a0`,`#d4a89a`,`#c8c0a8`],GE=[`#46683a`,`#587a3a`,`#3f5e34`,`#6a8a3e`],KE=[`#2f4a2f`,`#35553a`,`#2a4430`,`#3b5a36`],qE=`#4a3424`,JE=.118,YE=[`#6b8fb5`,`#8fae8a`,`#a98fb8`,`#7aa3a0`],XE=[`#2f62b8`,`#f2efe4`,`#c8322f`,`#2f8a4f`,`#d0a12e`],ZE=`#3a2a20`;function QE(e,t,n){return RT(t,n)}function $E(e){let t=e.spawn.z;for(let n=0;n<e.solids.length;n++)(n<e.style.length?e.style[n]:1)===2&&e.solids[n].max.z>t&&(t=e.solids[n].max.z);return{zMin:e.goal.min.z-8,zMax:t+8}}function eD(e,t){let n=LE;for(let r=0;r<e.solids.length;r++){let i=e.solids[r];if(!(t.max[0]<=i.min.x-n||t.min[0]>=i.max.x+n)&&!(t.max[2]<=i.min.z-n||t.min[2]>=i.max.z+n)&&!(t.min[1]>=i.max.y-.001)&&!(t.max[1]<=i.min.y-n||t.min[1]>=i.max.y+n))return!0}for(let r=0;r<e.roofs.length;r++){let i=e.roofs[r].aabb;if(!(t.max[0]<=i.min.x-n||t.min[0]>=i.max.x+n)&&!(t.max[2]<=i.min.z-n||t.min[2]>=i.max.z+n)&&!(t.max[1]<=i.min.y-n||t.min[1]>=i.max.y+n))return!0}return!1}function tD(e,t){let n=$E(e);if(t.max[2]<=n.zMin||t.min[2]>=n.zMax||t.min[0]>=4.5||t.max[0]<=-4.5)return!1;if(t.kind!==`tree`)return!0;let r=(t.min[0]+t.max[0])/2,i=(t.min[2]+t.max[2])/2;return t.max[1]>QE(e,r,i)+6+1e-6}var nD=class{world;rng;kit=new FE;boxes=[];strings=[];tmp=new Y;fx=sE(31249);onHouse=!1;constructor(e,t){this.world=e,this.rng=t}room(e,t){return this.kit.used[e]+t<=.9*tE[e]}U(e,t){return e+(t-e)*this.rng()}pick(e){return e[Math.min(e.length-1,Math.floor(this.rng()*e.length))]}col(e){return this.tmp.set(e).multiplyScalar(1+this.U(-.05,.05))}colRaw(e){return this.tmp.set(e)}rec(e,t,n){let r={kind:e,min:[t[0],t[1],t[2]],max:[n[0],n[1],n[2]]};this.onHouse&&(r.house=!0),this.boxes.push(r)}box(e,t,n,r,i,a,o,s,c){let l=this.kit.add(e,(n+a)/2,r,(i+s)/2,a-n,o-r,s-i,0,c);return l&&this.rec(t,[n,r,i],[a,o,s]),l}roof(e,t,n,r,i,a,o,s){this.kit.add(`roof`,t,n,r,i/nE,o/.49,a/nE,0,s)&&this.rec(e,[t-i/2,n,r-a/2],[t+i/2,n+o,r+a/2])}tank(e,t,n,r,i,a){this.kit.add(`tank`,e,t,n,2*r,i/2.18,2*r,0,a)&&this.rec(`tank`,[e-r,t,n-r],[e+r,t+i,n+r])}conifer(e,t,n,r,i,a,o){this.kit.add(`conifer`,t,n,r,i,a,i,0,o)&&this.rec(e,[t-i,n,r-i],[t+i,n+a,r+i])}canopy(e,t,n,r,i,a){this.kit.add(`canopy`,t,n,r,i,i,i,0,a)&&this.rec(e,[t-i,n-i,r-i],[t+i,n+i,r+i])}trunk(e,t,n,r,i,a){this.kit.add(`trunk`,t,n,r,1,i,1,0,a)&&this.rec(e,[t-.2,n,r-.2],[t+.2,n+i,r+.2])}rail(e,t,n,r,i,a){if(!this.kit.add(`rail`,e,t,n,r/2.4,1,1,i?Math.PI/2:0,a))return;let o=i?.04:r/2,s=i?r/2:.04;this.rec(`rail`,[e-o,t,n-s],[e+o,t+oE,n+s])}flag(e,t,n,r,i=Math.PI/2){if(!this.kit.add(`flag`,e,t,n,1,1,1,i,r))return;let a=Math.abs(Math.cos(i))*.175+Math.abs(Math.sin(i))*.02,o=Math.abs(Math.sin(i))*.175+Math.abs(Math.cos(i))*.02;this.rec(`flag`,[e-a,t-.125,n-o],[e+a,t+.125,n+o])}planter(e,t,n){this.kit.add(`planter`,e,t,n,1,1,1,Math.PI/2,this.tmp.setScalar(this.U(.9,1)))&&this.rec(`pot`,[e-.3,t,n-.65],[e+.3,t+.85,n+.65])}pot(e,t,n){this.kit.add(`pot`,e,t,n,1,1,1,0,this.tmp.setScalar(this.U(.88,1)))&&this.rec(`pot`,[e-.24,t,n-.24],[e+.24,t+.66,n+.24])}facing(e,t,n,r,i,a,o,s,c,l){let u=e===`window`,d=u?.5*c:0,f=e===`bracket`,p=u?.6*o:f?.06:.93,m=u?1.6*c:f?.5:.04,h=u?i-.08*s:i,g=u?i+s:f?i+.5:i+1.3,_=0,v=r,y=a;n===`x-`?(_=-Math.PI/2,v=r-d):n===`x+`?(_=Math.PI/2,v=r+d):n===`z+`?y=a+d:(_=Math.PI,y=a-d),this.kit.add(e,v,i,y,o,s,c,_,l)&&(n===`x-`?this.rec(t,[r-m,h,a-p],[r,g,a+p]):n===`x+`?this.rec(t,[r,h,a-p],[r+m,g,a+p]):n===`z+`?this.rec(t,[r-p,h,a],[r+p,g,a+m]):this.rec(t,[r-p,h,a-m],[r+p,g,a]))}allowed(e,t,n){let r={kind:e,min:[t[0],t[1],t[2]],max:[n[0],n[1],n[2]]};return!tD(this.world,r)&&!eD(this.world,r)}};function rD(e,t){let n=(t.max.x-t.min.x)*(t.max.z-t.min.z);for(let r=0;r<e.solids.length;r++){if((r<e.style.length?e.style[r]:1)!==1)continue;let i=e.solids[r];if(Math.abs(i.max.y-t.min.y)>.1)continue;let a=Math.min(t.max.x,i.max.x)-Math.max(t.min.x,i.min.x),o=Math.min(t.max.z,i.max.z)-Math.max(t.min.z,i.min.z);if(a>0&&o>0&&a*o>=.5*n)return i}return null}function iD(e){let t=[];for(let n=1;n<e.solids.length;n++){let r=n<e.style.length?e.style[n]:1,i=e.solids[n];if(r===2&&i.max.x-i.min.x>=6){let n=rD(e,i);if(n===null)continue;t.push({x0:i.min.x,x1:i.max.x,z0:i.min.z,z1:i.max.z,yBase:n.min.y,yE:i.min.y,top:i.max.y,decoy:!1})}else r===3&&i.max.y-i.min.y>5&&t.push({x0:i.min.x,x1:i.max.x,z0:i.min.z,z1:i.max.z,yBase:i.min.y,yE:i.max.y,top:i.max.y,decoy:!0})}return t.sort((e,t)=>t.z1-e.z1),t}var aD=RT,oD=!1;function sD(e,t,n){let r=aD(t,n);for(let i=0;i<e.length;i++){let a=e[i];t>a.x0&&t<a.x1&&n>a.z0&&n<a.z1&&a.top>r&&(r=a.top)}return r}function cD(e,t,n,r){let i=Math.sqrt((n[0]-t[0])**2+(n[2]-t[2])**2),a=(r?.05:.08)*i,o=r?YE:XE,s=Math.atan2(-(n[2]-t[2]),n[0]-t[0]),c=t[0],l=t[1],u=t[2];for(let r=1;r<=12;r++){let i=r/12,o=t[0]+(n[0]-t[0])*i,s=t[1]+(n[1]-t[1])*i-a*4*i*(1-i),d=t[2]+(n[2]-t[2])*i;e.strings.push(c,l,u,o,s,d),c=o,l=s,u=d}let d=e.world;for(let r=0;r<12;r++){let i=(r+.5)/12,c=t[0]+(n[0]-t[0])*i,l=t[1]+(n[1]-t[1])*i-a*4*i*(1-i)-.2,u=t[2]+(n[2]-t[2])*i,f=!1;for(let e=0;e<d.anchors.length;e++){let t=d.anchors[e],n=t.px-c,r=t.py-l,i=t.pz-u;n*n+r*r+i*i<9&&(f=!0)}f||e.flag(c,l,u,e.colRaw(o[r%o.length]),s+r%2*Math.PI)}}var lD=1.5;function uD(e,t){let n=e.world;e.onHouse=!0;let r=[`x-`,`x+`,`z+`,`z-`],i={"x-":[-1,0],"x+":[1,0],"z+":[0,1],"z-":[0,-1]};for(let a=0;a<t.length;a++){let o=t[a],{x0:s,x1:c,z0:l,z1:u,yBase:d,yE:f}=o,p=(s+c)/2,m=(l+u)/2,h=t.some(e=>e!==o&&Math.abs(e.z1-l)<.05&&e.x0<c&&e.x1>s),g=h?l:l-.05;if(!o.decoy){let t=Math.min(1.5,f-d-4);e.box(`wallBrick`,`base`,s-.08,d,h?l:l-.08,c+.08,d+t,u+.08,e.col(RE[a%3])),e.box(`wallPlaster`,`plaster`,s-.05,d+t,g,c+.05,f-.35,u+.05,e.col(WE[(a*3+1)%WE.length])),e.box(`cornice`,`cornice`,s-.12,d+t-.05,h?l:l-.12,c+.12,d+t+.2,u+.12,e.colRaw(zE[1])),e.box(`cornice`,`cornice`,s-.25,f-.35,h?l:l-.25,c+.25,f,u+.25,e.colRaw(zE[0]))}for(let n=0;n<4;n++){let a=r[n],[m,h]=i[a],g=a===`z+`||a===`z-`,_=g?c-s:u-l,v=Math.floor(_/2.8),y=e=>[a===`x-`?s:a===`x+`?c:s+e,a===`z+`?u:a===`z-`?l:l+e];for(let n=0;n<3;n++){let r=d+n*IE+1;if(!(r+1.3>f-.45))for(let n=0;n<v;n++){let[i,s]=y(_*(n+.5)/v),c=-1/0;for(let e=-1;e<=1;e++){let n=i+m*.35+(g?e*.5:0),r=s+h*.35+(g?0:e*.5);c=Math.max(c,sD(t,n,r))}if(!(r<c+.3)){if(e.facing(`window`,`window`,a,i,r,s,.9,1.3,JE,e.colRaw(e.pick(zE))),!o.decoy&&e.room(`trim`,2)){let t=g?.62:.1,n=g?.1:.62,a=e.colRaw(zE[1]),o=m*.14,c=h*.14;e.box(`trim`,`trim`,i-t+o,r+1.3,s-n+c,i+t+o,r+1.46,s+n+c,a),e.box(`trim`,`trim`,i-t+o,r-.16,s-n+c,i+t+o,r-.04,s+n+c,a)}!o.decoy&&e.fx()<.35&&e.facing(`shutter`,`shutter`,a,i,r,s,1,1,1,e.colRaw(e.pick(HE)))}}}if(a===`z-`&&sD(t,p,l-.35)<=d+.2){if(e.box(`body`,`door`,p-.55,d,l-.1,p+.55,d+2.1,l,e.colRaw(zE[0])),e.box(`body`,`step`,p-.9,d,l-.45,p+.9,d+.16,l-.1,e.colRaw(UE)),!o.decoy&&e.room(`trim`,3)){let t=e.colRaw(zE[1]);e.box(`trim`,`trim`,p-.7,d,l-.2,p-.55,d+2.3,l,t),e.box(`trim`,`trim`,p+.55,d,l-.2,p+.7,d+2.3,l,t),e.box(`trim`,`trim`,p-.7,d+2.1,l-.2,p+.7,d+2.3,l,t)}!o.decoy&&e.room(`pot`,2)&&(e.pot(p-1.5,oD?d:aD(p-1.5,l-.5),l-.5),e.pot(p+1.5,oD?d:aD(p+1.5,l-.5),l-.5))}if(!o.decoy){let n=Math.max(2,Math.floor(_/2.6));if(e.room(`bracket`,n))for(let r=0;r<n;r++){let[o,s]=y(_*(r+.5)/n);sD(t,o+i[a][0]*.3,s+i[a][1]*.3)>f-1||e.facing(`bracket`,`bracket`,a,o,f-.55,s,1,1,1,e.colRaw(zE[1]))}}}if(o.decoy)continue;for(let t=1;t<n.solids.length;t++){if((t<n.style.length?n.style[t]:1)!==1)continue;let r=n.solids[t];if(r.max.y-r.min.y>.5||r.max.y>o.top-1||r.max.y<f-6||r.min.z<l-.001||r.max.z>u+.001)continue;let i=Math.abs(r.min.x-c)<.001?1:Math.abs(r.max.x-s)<.001?-1:0;if(i===0)continue;let a=r.max.y,d=i>0?r.max.x-.08:r.min.x+.08,p=r.max.z-r.min.z,h=Math.ceil(p/iE);if(e.room(`rail`,h+2)){for(let t=0;t<h;t++)e.rail(d,a,r.min.z+p/h*(t+.5),p/h,!0,e.colRaw(zE[0]));e.rail((r.min.x+r.max.x)/2,a,r.min.z+.05,r.max.x-r.min.x,!1,e.colRaw(zE[0])),e.rail((r.min.x+r.max.x)/2,a,r.max.z-.05,r.max.x-r.min.x,!1,e.colRaw(zE[0]))}e.pot((r.min.x+r.max.x)/2,a,m-1.2),e.pot((r.min.x+r.max.x)/2,a,m+1.2);for(let t=0;t<3;t++)e.facing(`bracket`,`bracket`,i>0?`x+`:`x-`,i>0?c:s,a-.8,r.min.z+p*(t+.5)/3,1,1,1,e.colRaw(zE[1]))}let _=o.top;e.box(`parapet`,`parapet`,s,_,u-.2,c,_+.2,u,e.colRaw(BE));let v=s+1.1,y=m-.8,b=_;if(e.room(`rail`,40))for(let t=0;t<n.solids.length;t++){let r=n.solids[t];if((t<n.style.length?n.style[t]:1)===4&&!(Math.abs(r.min.y-_)>.001)&&!(r.min.x<s-.001||r.max.x>c+.001||r.min.z<l-.001||r.max.z>u+.001)){if(r.max.y-r.min.y>.5)v=(r.min.x+r.max.x)/2,y=(r.min.z+r.max.z)/2,b=r.max.y;else if(r.max.z-r.min.z>r.max.x-r.min.x){let t=(r.min.x+r.max.x)/2,n=Math.max(1,Math.ceil((r.max.z-r.min.z)/iE));for(let i=0;i<n;i++)e.rail(t,_+.4,r.min.z+(r.max.z-r.min.z)*(i+.5)/n,(r.max.z-r.min.z)/n,!0,e.colRaw(zE[0]))}}}let x=(e,t,r)=>{let i=[...n.tramps,...n.cushions];for(let e=0;e<n.lines.length;e++)i.push(n.lines[e].zone);for(let n of i)if(e>n.min.x-r&&e<n.max.x+r&&t>n.min.z-r&&t<n.max.z+r)return!1;return!0};x(v,y,.7)&&e.tank(v,b,y,.5,rE*.8,e.colRaw(e.pick(VE))),x(v,m+1.6,.7)&&e.room(`planter`,1)&&e.planter(v,_,m+1.6),x(v,u-.8,.4)&&e.pot(v,_,u-.8)}e.onHouse=!1}function dD(e,t){let n=t.filter(e=>!e.decoy);e.onHouse=!0;let r=new Map,i=(t,n,i,a)=>{let o=`${a}:${n}:${i.toFixed(2)}`,s=r.get(o);if(s!==void 0)return s;let c=n*((t.x1-t.x0)/2-.15)+(t.x0+t.x1)/2;e.trunk(`mast`,c,t.top+.4,i,lD,e.colRaw(zE[0]));let l=[c,t.top+.4+lD,i];return r.set(o,l),l};for(let t=0;t+1<n.length;t++){let r=n[t],a=n[t+1],o=Math.abs(a.z1-r.z0)<.05,s=t%2==0?1:-1;if(!e.room(`flag`,12))break;cD(e,i(r,s,(r.z0+r.z1)/2,`h`+t),i(a,s,(a.z0+a.z1)/2,`h`+(t+1)),!1),o||cD(e,i(r,-s,(r.z0+r.z1)/2,`h`+t),i(a,-s,(a.z0+a.z1)/2,`h`+(t+1)),!1)}for(let t=1;t<n.length;t+=2){let r=n[t];if(!e.room(`flag`,12))break;let a=t%4==1?-1:1;cD(e,i(r,a,r.z0+1,`l`+t),i(r,a,r.z1-1,`l`+t),!0)}e.onHouse=!1}function fD(e,t,n,r){for(let i=0;i<e.length;i++){let a=e[i];if(t>a.x0-r&&t<a.x1+r&&n>a.z0-r&&n<a.z1+r)return!0}return!1}function pD(e,t,n,r,i,a,o){let s=RT(t,n),c=2+.4*r,l=s+c+r*.6;return!e.room(`canopy`,1)||!e.room(`trunk`,1)||!e.allowed(i,[t-r,s,n-r],[t+r,l+r,n+r])?!1:(e.trunk(i,t,s-.3,n,c+.3,e.colRaw(qE)),e.canopy(i,t,l,n,r,e.col(GE[o]).multiplyScalar(a)),!0)}function mD(e,t,n,r,i,a,o){let s=RT(t,n),c=r*3.4;return!e.room(`conifer`,1)||!e.allowed(i,[t-r,s,n-r],[t+r,s+c,n+r])?!1:(e.conifer(i,t,s-.4,n,r,c,e.col(KE[o]).multiplyScalar(a)),!0)}function hD(e,t,n){let r=sE(n^32485);for(let n=-1;n<=1;n+=2)for(let i=24;i>-104;i-=11)for(let a=7;a<31;a+=11){let o=n*(a+(r()-.5)*6),s=i+(r()-.5)*7,c=1.3+.9*r(),l=Math.floor(r()*GE.length),u=.95+.1*r(),d=r();if(!(d<.35)&&!fD(t,o,s,3.5+c)&&!(Math.abs(o)>31.5-c)){if(d<.55)mD(e,o,s,c*.9,`tree`,u,l);else if(d<.9)pD(e,o,s,c,`tree`,u,l);else{let t=.6+.4*r(),n=RT(o,s);e.allowed(`tree`,[o-t,n,s-t],[o+t,n+t*1.6,s+t])&&e.room(`canopy`,1)&&e.canopy(`tree`,o,n+t*.7,s,t,e.col(GE[l]))}}}}function gD(e,t){let n=sE(t^22441);for(let t=-1;t<=1;t+=2)for(let r=80;r>-300;r-=17){let i=40+26*n(),a=6+8*n();if(n()<.35)continue;if(!e.room(`body`,1))return;let o=t>0?i:-i-a,s=o+a,c=1/0,l=-1/0;for(let e=0;e<=4;e++){let t=RT(o+a*e/4,r);c=Math.min(c,t),l=Math.max(l,t)}e.allowed(`terrace`,[o,c-.3,r-.3],[s,l+.9,r+.3])&&e.box(`body`,`terrace`,o,c-.3,r-.3,s,l+.8,r+.3,e.col(UE))}}function _D(e,t,n){let r=sE(n^986711),i=[];for(let e=-1;e<=1;e+=2)for(let t=194;t>xT+6;t-=9)for(let n=37;n<314;){let a=n<110?9:n<190?13:20,o=e*(n+(r()-.5)*a*.8),s=t+(r()-.5)*7,c=r(),l=r(),u=r(),d=r();n+=a;let f=Math.abs(o),p=.78-.5*Math.min(1,(f-37)/280);if(s<-140&&f<90&&l<.55||l>p)continue;let m=RT(o,s)-IT(s),h=f>110?1.45:1,g=m>50||m>22&&d<(m-22)/28;i.push({x:o,z:s,r:(g?1.7+.8*c:2.3+1.1*c)*h,con:g,tint:.94+.12*u,pick:Math.floor(d*4)%4})}for(let e=0;e<60;e++){let n=(e%2==0?1:-1)*(8+26*r()),a=r()<.5?30+80*r():-112-120*r();fD(t,n,a,4)||i.push({x:n,z:a,r:1.6+1.2*r(),con:r()<.4,tint:.95+.1*r(),pick:Math.floor(r()*4)})}for(let e=i.length-1;e>0;e--){let t=Math.floor(r()*(e+1)),n=i[e];i[e]=i[t],i[t]=n}let a={canopy:e.kit.used.canopy,trunk:e.kit.used.trunk,conifer:e.kit.used.conifer};for(let t=0;t<i.length;t++){let n=i[t];n.con?mD(e,n.x,n.z,n.r,`tree`,n.tint,n.pick):pD(e,n.x,n.z,n.r,`tree`,n.tint,n.pick)}return[a.canopy,a.trunk,a.conifer]}function vD(e,t=1729,n={}){let r=n.scenery!==!1,i=n.houseDress!==!1,a=new nD(e,sE(t)),o=new nm;o.name=`decor`;let s=iD(e),c,l=n.floorY;oD=l!==void 0&&!r,aD=r?RT:l===void 0?(e,t)=>IT(t):()=>l;try{i&&(uD(a,s),dD(a,s)),r?(hD(a,s,t),gD(a,t),c=_D(a,s,t)):c=[a.kit.used.canopy,a.kit.used.trunk,a.kit.used.conifer]}finally{aD=RT}o.add(a.kit.finish());let u=r?YT():null;if(u!==null&&o.add(u),a.strings.length>0){let e=new ih;e.setAttribute(`position`,new X(a.strings,3));let t=new vg(e,new og({color:new Y(ZE)}));t.name=`decor_strings`,t.frustumCulled=!1,o.add(t)}r&&o.add(yT());let d=Object.values(a.kit.meshes).filter(e=>e.count>0).length,f=u!==null&&u.geometry.index!==null?u.geometry.index.count/3:0,p={triangles:a.kit.triangles()+f+10,instancedMeshes:d,drawCalls:d+1+ +(a.strings.length>0)+1,dropped:eE.reduce((e,t)=>e+a.kit.dropped[t],0)},m={canopy:a.kit.used.canopy,trunk:a.kit.used.trunk,conifer:a.kit.used.conifer},h=[`canopy`,`trunk`,`conifer`];return o.userData.setForestDensity=e=>{for(let t=0;t<h.length;t++){let n=h[t];a.kit.meshes[n].count=c[t]+Math.floor((m[n]-c[t])*Math.min(1,Math.max(0,e)))}},o.userData.boxes=a.boxes,o.userData.stats=p,mT(o),o}var yD=`#ffc83a`,bD=`#fff1c1`,xD=`#4a2c1c`,SD=`#f1e9d2`,CD=`#6b4a30`,wD=5,TD=2,ED=.12,DD=3,OD=.03,kD=.15,AD=.05,jD=.04,MD=.3;function ND(e,t,n){let[r,i,a,o,s,c]=n,l=e.length/3;e.push(r,i,a,o,i,a,o,s,a,r,s,a),e.push(r,i,c,o,i,c,o,s,c,r,s,c);let u=[[0,3,2,1],[4,5,6,7],[0,4,7,3],[1,2,6,5],[0,1,5,4],[3,7,6,2]];for(let e=0;e<u.length;e++){let n=u[e];t.push(l+n[0],l+n[1],l+n[2],l+n[0],l+n[2],l+n[3])}}function PD(e,t,n,r=0){let i=[],a=[];for(let t=0;t<e.length;t++)ND(i,a,e[t]);let o=new ih;o.setAttribute(`position`,new X(i,3)),o.setIndex(a),o.computeVertexNormals();let s=new E_({color:new Y(t),flatShading:!0});r>0&&(s.emissive=new Y(t).multiplyScalar(r));let c=new Z(o,s);return c.name=n,c.userData.cast=!1,c}function FD(e){let t=1/0;for(let n=0;n<e.solids.length;n++)(n<e.style.length?e.style[n]:1)===wD||e.solids[n].max.y<=e.killPlaneY||(t=Math.min(t,e.solids[n].min.z));return Number.isFinite(t)?t:0}function ID(e){let t=[],n=[],r=[],i=[],a=ED/2;for(let t=0;t<e.lines.length;t++){let o=e.lines[t],s=o.zone,c=e.anchors[o.anchorId];n.push([s.min.x,s.min.y,s.min.z,s.max.x,s.max.y+OD,s.max.z]);let l=(s.min.x+s.max.x)/2,u=(s.min.z+s.max.z)/2,d=s.max.y+TD;r.push([l-a,s.max.y,u-a,l+a,d,u+a]),c!==void 0&&(r.push([c.px-a,c.py-DD,c.pz-a,c.px+a,c.py+.1,c.pz+a]),i.push(l,d,u,c.px,c.py,c.pz))}if(n.length>0&&t.push(PD(n,yD,`lineZones`,.35)),r.length>0&&t.push(PD(r,xD,`linePosts`)),i.length>0){let e=new ih;e.setAttribute(`position`,new X(i,3));let n=new vg(e,new og({color:new Y(bD)}));n.name=`lineRopes`,n.frustumCulled=!1,t.push(n)}let o=[],s=[];for(let t=0;t<e.tramps.length;t++){let n=e.tramps[t],r=n.max.y+AD;o.push([n.min.x-kD,n.min.y,n.min.z-kD,n.max.x+kD,r,n.max.z+kD]),s.push([n.min.x,r,n.min.z,n.max.x,r+jD,n.max.z])}o.length>0&&(t.push(PD(o,CD,`trampRims`)),t.push(PD(s,SD,`trampTops`)));let c=[];for(let t=0;t<e.cushions.length;t++){let n=e.cushions[t];c.push([n.min.x,n.min.y,n.min.z,n.max.x,n.max.y+MD,n.max.z])}return c.length>0&&t.push(PD(c,SD,`cushions`)),t}var LD=[`#8e7a66`,`#d9c6aa`,`#b9a68c`,`#c4472a`,`#a99a88`],RD=3,zD=5,BD=[`stone_warm`,``,`terracotta_a`,``,``],VD=`#9c5640`,HD=`#4a2c1c`,UD=`#f1e9d2`,WD=`#efe2b4`,GD=`#ffc83a`,KD=`#b5523a`,qD=.5,JD=.72,YD=.92,XD=16,ZD=new Float64Array(64),QD=new Float64Array(64);for(let e=0;e<XD;e++){let t=e/XD*Math.PI*2,n=(e+1)/XD*Math.PI*2,r=[t,t,n,n],i=[JD,YD,YD,JD];for(let t=0;t<4;t++)ZD[e*4+t]=Math.cos(r[t])*i[t],QD[e*4+t]=Math.sin(r[t])*i[t]}var $D=`#6b4a30`,eO=.03,tO=4;function nO(e,t,n,r){let i=[r.min.x,r.min.y,r.min.z],a=[r.max.x,r.max.y,r.max.z];for(let r=0;r<3;r++){let o=r===0?2:0,s=r===1?2:1;for(let c=0;c<2;c++){let l=c===0?i[r]:a[r],u=e.length/3;for(let t=0;t<4;t++){let c=[0,0,0];c[r]=l,c[o]=t===0||t===3?i[o]:a[o],c[s]=t<2?i[s]:a[s],e.push(c[0],c[1],c[2]),n.push(c[o]/tO,c[s]/tO)}+(r===2?c===0:c===1)==0?t.push(u,u+1,u+2,u,u+2,u+3):t.push(u,u+2,u+1,u,u+3,u+2)}}}function rO(e,t,n=0,r=``){let i=[],a=[],o=[];for(let t=0;t<e.length;t++)nO(i,a,o,e[t]);let s=new ih;s.setAttribute(`position`,new X(i,3)),s.setAttribute(`uv`,new X(o,2)),s.setIndex(a),s.computeVertexNormals();let c=r?QT(r):null,l=new Y(t);c&&l.lerp(new Y(`#ffffff`),.55);let u=new E_({color:l,flatShading:!0,map:c,normalMap:c?$T(r):null});n>0&&(u.emissive=new Y(t).multiplyScalar(n));let d=new Z(s,u);return d.userData.cast=!0,d}function iO(e,t,n,r,i){let a=i===1,o=a?r.min.z:r.min.x,s=a?r.max.z:r.max.x,c=a?r.min.x:r.min.z,l=a?r.max.x:r.max.z,u=(c+l)/2,d=r.min.y,f=r.max.y,p=Math.hypot(u-c,f-d),m=(t,r,i,o,s)=>{a?e.push(r,i,t):e.push(t,i,r),n.push(o/tO,s/tO)};for(let n=0;n<2;n++){let r=n===0?c:l,i=e.length/3;m(o,r,d,o,0),m(s,r,d,s,0),m(s,u,f,s,p),m(o,u,f,o,p),n===0===a?t.push(i,i+1,i+2,i,i+2,i+3):t.push(i,i+2,i+1,i,i+3,i+2)}for(let n=0;n<2;n++){let r=n===0?o:s,i=e.length/3;m(r,c,d,c,d),m(r,l,d,l,d),m(r,u,f,u,f),n===0===a?t.push(i,i+2,i+1):t.push(i,i+1,i+2)}}function aO(e){let t=[],n=[],r=[];for(let i=0;i<e.roofs.length;i++)iO(t,n,r,e.roofs[i].aabb,e.roofs[i].ridgeAxis);let i=new ih;i.setAttribute(`position`,new X(t,3)),i.setAttribute(`uv`,new X(r,2)),i.setIndex(n),i.computeVertexNormals();let a=QT(`roof_tile`),o=new Y(KD);a&&o.lerp(new Y(`#ffffff`),.55);let s=new Z(i,new E_({color:o,flatShading:!0,map:a,normalMap:$T(`roof_tile`)}));return s.name=`pitchedRoofs`,s.userData.cast=!0,s}var oO=(e,t,n,i,a,o)=>new r(new f(e,t,n),new f(i,a,o));function sO(e){let t=[],n=[],r=.1,i=[],a=e.goal;if(a.max.y>a.min.y){let i=Math.min(QE(e,a.min.x,a.min.z+1),QE(e,a.max.x,a.min.z+1),QE(e,(a.min.x+a.max.x)/2,a.min.z+1));i<a.min.y&&(t.push(oO(a.min.x,i-.3,a.min.z,a.max.x,a.min.y,a.max.z-1)),n.push(oO(a.min.x-r,a.min.y-.4,a.min.z-r,a.max.x+r,a.min.y-.1,a.max.z-1+r)))}return t.length>0&&i.push(rO(t,VD,0,`brick_a`)),n.length>0&&i.push(rO(n,HD)),i}function cO(e,t={}){let n=t.scenery!==!1&&t.floorY===void 0,i=e.lineOnly===1;n&&AT(i?FD(e):null);let a=new nm;a.name=`level`,a.userData.route=e.route.slice();for(let t=0;t<LD.length;t++){let n=[];for(let r=0;r<e.solids.length;r++){let i=r<e.style.length?e.style[r]:1;i===t&&i!==zD&&e.solids[r].max.y>e.killPlaneY&&n.push(e.solids[r])}n.length>0&&a.add(rO(n,LD[t],t===RD?.2:0,BD[t]))}if(e.pads.length>0){let t=(e,t,n)=>new r(new f(e.min.x+t,e.max.y,e.min.z+t),new f(e.max.x-t,e.max.y+n,e.max.z-t)),n=rO(e.pads.map(e=>t(e,0,eO)),$D),i=rO(e.pads.map(e=>t(e,.18,.04)),UD);n.name=`padEdge`;for(let e of[n,i])e.userData.cast=!1,a.add(e)}e.goal.max.y>e.goal.min.y&&a.add(rO([e.goal],WD)),e.roofs.length>0&&a.add(aO(e));let o=sO(e);for(let e=0;e<o.length;e++)a.add(o[e]);if(a.add(vD(e,void 0,{scenery:n,houseDress:t.houseDress,floorY:t.floorY})),i){let t=ID(e);for(let e=0;e<t.length;e++)a.add(t[e])}n?a.add(tT(e)):t.floorY!==void 0&&(Kw.set=!1,Kw.live=!1,Kw.anchorId=-1);let s=new p_(qD,12,8);for(let t=0;t<(i?0:e.anchors.length);t++){let n=e.anchors[t],r=new Z(s,new gh({color:new Y(GD),fog:!1}));r.position.set(n.px,n.py,n.pz),r.name=`anchor`+t,r.userData.anchorId=t,a.add(r)}return e.anchors.length>0&&!i&&a.add(lO(e)),a}function lO(e){let t=e.anchors.length,n=new Float32Array(t*64*3),r=[];for(let e=0;e<t*XD;e++){let t=e*4;r.push(t,t+1,t+2,t,t+2,t+3)}let i=new ih,a=new X(n,3);a.setUsage(If),i.setAttribute(`position`,a),i.setIndex(r);let o=new Z(i,new gh({color:new Y(GD),fog:!1,side:2}));o.name=`anchorRings`,o.frustumCulled=!1,o.userData.target=-1;let s=new K,c=new K;return o.onBeforeRender=(r,i,l)=>{let u=l.matrixWorld.elements;s.set(u[0],u[1],u[2]),c.set(u[4],u[5],u[6]);let d=o.userData.target;for(let r=0;r<t;r++){let t=e.anchors[r],i=r===d?1.25:1,a=r*64*3;for(let e=0;e<XD;e++)for(let r=0;r<4;r++){let o=ZD[e*4+r]*i,l=QD[e*4+r]*i;n[a++]=t.px+s.x*o+c.x*l,n[a++]=t.py+s.y*o+c.y*l,n[a++]=t.pz+s.z*o+c.z*l}}a.needsUpdate=!0},o}function uO(e,t,n,r=-1){let i=e.userData.route,a=i&&n>=0&&n<i.length?i[n]:-1,o=r>=0;o&&(a=r);for(let n=0;n<e.children.length;n++){let r=e.children[n];if(r.name===`anchorRings`&&(r.userData.target=a),r.userData.anchorId===void 0)continue;let i=r.userData.anchorId===a?1+(o?.9:.35)*Math.sin(t*6):1;r.scale.setScalar(i)}}var dO=`modulepreload`,fO=function(e){return`/bhaaag/`+e},pO={},mO=function(e){return e.pathname.endsWith(`.css`)},hO=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},gO=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=fO(t,n);let r=s(t),i=mO(r);return hO(pO,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:dO,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};async function _O(e,t,n,r){if(r.bloom===null)return null;let[{EffectComposer:i},{RenderPass:a},{UnrealBloomPass:o},{OutputPass:s}]=await Promise.all([gO(()=>import(`./EffectComposer-Dk_Jgxk6.js`),__vite__mapDeps([0,1,2])),gO(()=>import(`./RenderPass-rDypBO3L.js`),__vite__mapDeps([3,2])),gO(()=>import(`./UnrealBloomPass-CIEbXth6.js`),__vite__mapDeps([4,2,1])),gO(()=>import(`./OutputPass-BGsbzsnP.js`),__vite__mapDeps([5,2]))]),c=e.getSize(new G),l=e.getPixelRatio(),u=new i(e,new Ep(c.x*l,c.y*l,{type:Cd,samples:r.composerSamples}));return u.addPass(new a(t,n)),u.addPass(new o(new G(c.x,c.y),r.bloom.strength,r.bloom.radius,r.bloom.threshold)),u.addPass(new s),u}var vO=.7;function yO(e,t,n,r){let i=RT(t,r);for(let a=0;a<e.solids.length;a++){let o=e.solids[a],s=o.max.y;s>n+.3||s<=i||t<o.min.x||t>o.max.x||r<o.min.z||r>o.max.z||(i=s)}return i}function bO(){let e=new Mg(vO,16);e.rotateX(-Math.PI/2);let t=new Z(e,new gh({color:`#1b1410`,transparent:!0,opacity:.38,depthWrite:!1,fog:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));return t.name=`heroBlob`,t.frustumCulled=!1,t.visible=!1,t}function xO(e,t,n,r,i){let a=yO(t,n,r,i),o=r-a;if(o>7||o<-1){e.visible=!1;return}e.visible=!0,e.position.set(n,a+.05,i);let s=1-.55*Math.min(1,Math.max(0,o)/7);e.scale.setScalar(s),e.material.opacity=.38*s}var SO=`#eaa978`,CO=500,wO=7,TO=Math.PI/180,EO=new K(0,0,1),DO=8*TO,OO=32*TO,kO=new K(Math.sin(OO)*Math.cos(DO),Math.sin(DO),-Math.cos(OO)*Math.cos(DO)),AO={x:Math.sin(OO),z:-Math.cos(OO)},jO=470,MO=440,NO=7,PO=new Y(`#e6a77a`),FO=new Y(`#ffd890`),IO=[[0,new Y(SO)],[.1,new Y(`#f2a050`)],[.3,new Y(`#d77a45`)],[.6,new Y(`#9c5a4c`)]];function LO(e,t){if(e<0)return t.copy(PO);let n=IO[0][0],r=IO[0][1];for(let i=1;i<IO.length;i++){let[a,o]=IO[i];if(e<=a)return t.copy(r).lerp(o,(e-n)/(a-n));n=a,r=o}return t.copy(r)}function RO(e,t){let n=Math.max(0,e.dot(kO));return t.lerp(FO,.5*n*n*n*n)}function zO(){let e=new p_(CO,32,16),t=e.attributes.position,n=[],r=new K,i=new Y;for(let e=0;e<t.count;e++)r.fromBufferAttribute(t,e).normalize(),LO(r.y,i),RO(r,i),n.push(i.r,i.g,i.b);e.setAttribute(`color`,new X(n,3));let a=new Z(e,new gh({vertexColors:!0,side:1,depthWrite:!1,fog:!1}));return a.name=`skyDome`,a.renderOrder=-2,a}function BO(){let e=new nm,t=new Mg(170,32),n=new Y(`#ffc070`),r=[];for(let e=0;e<t.attributes.position.count;e++)r.push(n.r,n.g,n.b,e===0?.65:0);t.setAttribute(`color`,new X(r,4));let i=new Z(t,new gh({vertexColors:!0,transparent:!0,blending:2,depthWrite:!1,fog:!1}));i.name=`sunGlow`;let a=new Z(new Mg(9,24),new gh({color:`#fff1c4`,depthWrite:!1,fog:!1}));a.name=`sunCore`,a.renderOrder=-1;let o=kO.clone().negate();for(let t of[i,a])t.position.copy(kO).multiplyScalar(jO),t.quaternion.setFromUnitVectors(EO,o),e.add(t);return e}function VO(){let e=[],t=[],n=[],r=new Y(`#ffcf8a`),i=[-.5,-.25,0,.3,.55];for(let a=0;a<i.length;a++){let o=i[a],s=260+a%2*40,c=14+a%3*4,l=e.length/3;e.push(-c*.3,0,0,c*.3,0,0,-c,s,0,c,s,0),t.push(r.r,r.g,r.b,0,r.r,r.g,r.b,0,r.r,r.g,r.b,0,r.r,r.g,r.b,0);let u=e.length/3;e.push(0,0,0,0,s*.55,0),t.push(r.r,r.g,r.b,.16,r.r,r.g,r.b,.07),n.push(l,l+1,u,l,u,l+2,l+1,l+3,u+1,l+2,l+3,u+1,u,u+1,l,u,u+1,l+1);let d=Math.cos(o),f=Math.sin(o);for(let t=l;t<e.length/3;t++){let n=e[t*3],r=e[t*3+1];e[t*3]=n*d-r*f,e[t*3+1]=n*f+r*d}}let a=new ih;a.setAttribute(`position`,new X(e,3)),a.setAttribute(`color`,new X(t,4)),a.setIndex(n);let o=new Z(a,new gh({vertexColors:!0,transparent:!0,depthWrite:!1,fog:!1,side:2}));return o.name=`godRays`,o.position.copy(kO).multiplyScalar(466),o.quaternion.setFromUnitVectors(EO,kO.clone().negate()),o.renderOrder=1,o}function HO(e,t={azLo:-40,azHi:60,count:NO,elLo:4,elHi:14,wLo:60,wHi:140,opacity:.85,name:`clouds`}){let n=[],r=new Y(`#f7b98a`),i=new Y(`#ffd9a0`),a=new K,o=new op,s=(e,t,n)=>e+(t-e)*n;for(let c=0;c<t.count;c++){let c=s(t.azLo,t.azHi,e())*TO,l=s(t.elLo,t.elHi,e())*TO,u=s(t.wLo,t.wHi,e()),d=s(8,14,e());a.set(Math.sin(c)*Math.cos(l),Math.sin(l),-Math.cos(c)*Math.cos(l));let f=new Mg(1,16);f.deleteAttribute(`normal`),f.deleteAttribute(`uv`),f.scale(u,d,1);let p=[],m=f.attributes.position;for(let e=0;e<m.count;e++){let t=m.getY(e)>0?r:i;p.push(t.r,t.g,t.b)}f.setAttribute(`color`,new X(p,3)),o.setFromUnitVectors(EO,a.clone().negate()),f.applyQuaternion(o),f.translate(a.x*MO,a.y*MO,a.z*MO),n.push(f)}let c=rw(n,!1);for(let e of n)e.dispose();if(c===null)throw Error(`cloud merge failed: attribute mismatch`);let l=new Z(c,new gh({vertexColors:!0,transparent:!0,opacity:t.opacity,side:2,depthWrite:!1,fog:!1}));return l.name=t.name,l}function UO(){let e=new Ng(240,240,42,48,2,!0),t=e.attributes.position,n=new Y(`#ffb070`),r=[];for(let e=0;e<t.count;e++){let i=t.getX(e),a=t.getZ(e),o=Math.hypot(i,a)||1,s=Math.max(0,i/o*AO.x+a/o*AO.z),c=Math.abs(t.getY(e))<10?.35:0;r.push(n.r,n.g,n.b,c*(.4+.6*s*s))}e.setAttribute(`color`,new X(r,4));let i=new Z(e,new gh({vertexColors:!0,transparent:!0,blending:2,depthWrite:!1,depthTest:!0,fog:!1,side:1}));return i.name=`horizonHaze`,i.position.y=9,i}function WO(){let e=new nm;return e.add(zO()),e.add(BO()),e.add(UO()),e.add(VO()),e.add(HO(sE(wO))),e.add(HO(sE(14),{azLo:-60,azHi:80,count:9,elLo:16,elHi:34,wLo:90,wHi:200,opacity:.55,name:`cloudsHigh`})),e}var GO=[36,14,36];function KO(){let e=new ih;e.setAttribute(`position`,new X(new Float32Array(270),3));let t=new wg(e,new yg({color:`#d8c9b4`,size:.09,transparent:!0,opacity:.4,depthWrite:!1,blending:2,fog:!1}));return t.name=`dust`,t.frustumCulled=!1,t}var qO=new Float32Array(270);for(let e=0;e<90;e++)for(let t=0;t<3;t++){let n=Math.sin(e*[12.9898,78.233,39.425][t])*[43758.5453,12345.6789,24681.357][t];qO[e*3+t]=n-Math.floor(n)}var JO=(e,t)=>e-t*Math.floor(e/t);function YO(e,t,n,r,i){let a=e.geometry.getAttribute(`position`);for(let e=0;e<90;e++){let o=qO[e*3],s=qO[e*3+1],c=qO[e*3+2],l=JO(o*GO[0]+i*.25*(.5+s),GO[0])-GO[0]/2,u=JO(s*GO[1]-i*.12*(.5+c),GO[1])-GO[1]/2,d=JO(c*GO[2]+i*.18*(.5+o),GO[2])-GO[2]/2;a.setXYZ(e,t+l,n+u,r+d)}a.needsUpdate=!0}var XO=[`low`,`medium`,`high`],ZO=`zt.graphicsTier`,QO=`zt-graphics-tier`,$O={low:{label:`Low`,desc:`Flat sunset colours, blob shadow. Fastest.`},medium:{label:`Medium`,desc:`Soft lane shadows, filmic colour. Phone default.`},high:{label:`High`,desc:`Sharper shadows, extra detail. Sun glow on PCs.`}};function ek(e){return e===`low`||e===`medium`||e===`high`?e:null}function tk(e){return e.cores>0&&e.cores<=4||e.memoryGb>0&&e.memoryGb<=4?`low`:`medium`}function nk(){let e={coarsePointer:!1,userAgent:``,cores:0,memoryGb:0};try{if(typeof navigator<`u`){e.userAgent=navigator.userAgent??``,e.cores=navigator.hardwareConcurrency??0;let t=navigator.deviceMemory;e.memoryGb=typeof t==`number`?t:0}typeof window<`u`&&typeof window.matchMedia==`function`&&(e.coarsePointer=window.matchMedia(`(pointer: coarse)`).matches)}catch{}return e}function rk(){try{return typeof localStorage>`u`?null:localStorage}catch{return null}}function ik(){try{return typeof location>`u`?null:ek(new URLSearchParams(location.search).get(`gfx`))}catch{return null}}function ak(e=rk(),t=nk(),n=ik()){if(n!==null)return n;if(e!==null)try{let t=ek(e.getItem(ZO));if(t!==null)return t}catch{}return tk(t)}function ok(e=rk(),t=ik()){if(t!==null)return!1;if(e===null)return!0;try{return ek(e.getItem(ZO))===null}catch{return!0}}function sk(e,t=rk()){if(t!==null)try{t.setItem(ZO,e)}catch{}typeof window<`u`&&typeof CustomEvent==`function`&&window.dispatchEvent(new CustomEvent(QO,{detail:e}))}var ck={low:[1,1.5],medium:[1.25,2],high:[1.5,2]},lk=[`decor_rail`,`decor_canopy`,`decor_bracket`,`decor_pot`,`decor_planter`,`decor_shutter`,`decor_flag`,`decor_trim`,`decor_strings`,`decor_birds`],uk=`#eaa978`;function dk(e,t){let n=ck[e][+!t],r={normalMaps:e===`high`,atmosphere:e!==`low`&&!t,forestDensity:e===`low`?.2:e===`medium`?.7:1,casterReach:12,hideDecor:e===`low`?lk:[],governorMs:20};return e===`low`?{tier:e,maxPixelRatio:n,toneMapping:`aces`,exposure:1.1,sun:{color:`#ffb469`,intensity:3,dir:[70,38,-15]},hemi:{sky:`#ffc99c`,ground:`#5b4656`,intensity:1},fog:{color:uk,near:70,far:480},shadow:null,bloom:null,composerSamples:0,...r}:{tier:e,maxPixelRatio:n,toneMapping:`aces`,exposure:1.2,sun:{color:`#ffa65c`,intensity:4.2,dir:[70,25,-15]},hemi:{sky:`#ffc99c`,ground:`#5e4a5c`,intensity:.85},fog:{color:uk,near:65,far:480},shadow:{mapSize:e===`high`?2048:1024,halfExtent:e===`high`?t?40:48:t?24:30,distance:80,far:180,bias:-4e-4,normalBias:.04,radius:e===`high`?2:3},bloom:e===`high`&&!t?{strength:.22,radius:.35,threshold:.85}:null,composerSamples:e===`high`&&!t?4:0,...r}}function fk(){return typeof window<`u`&&window.matchMedia(`(pointer: coarse)`).matches}var pk=10;function mk(e){let t=e.material,n=Array.isArray(t)?t[0]:t;return n!==void 0&&!(n instanceof gh)&&!n.transparent}function hk(e){let t=new Jx({canvas:e,antialias:!0});t.info.autoReset=!1;let n=fk(),r=dk(ak(),n),i=new dm;i.fog=new um(r.fog.color,r.fog.near,r.fog.far);let a=WO();i.add(a);let o=KO();i.add(o);let s=new nm;s.name=`backdropRoot`;let c=r.tier;gO(()=>import(`./backdrop-DQ7bO07n.js`).then(e=>{f||s.add(e.buildBackdrop(c))}),[]),i.add(s);let l=new vv(r.sun.color,r.sun.intensity);i.add(l),i.add(l.target);let u=new rv(r.hemi.sky,r.hemi.ground,r.hemi.intensity);i.add(u);let d=new hv(60,1,.1,3e3),f=!1,p=null,m=null,h=bO();i.add(h);let g=null,_=0,v=new K,y=null,b=!0,x=!1,S=1,C=0,w=1,T=new K,E=new K,D=new K,O=new K,k=new K,A=new K,j=new K(0,1,0),M=new G;function N(){if(y!==null){for(let e of y.passes)e.dispose();y.dispose(),y=null}}let ee=0;function te(){N();let e=++ee;r.bloom!==null&&_O(t,i,d,r).then(t=>{if(t!==null){if(f||e!==ee){for(let e of t.passes)e.dispose();t.dispose()}else y=t,me()}})}function P(){t.setPixelRatio(Math.min(window.devicePixelRatio,r.maxPixelRatio)),t.toneMapping=r.toneMapping===`aces`?4:0,t.toneMappingExposure=r.exposure,t.shadowMap.enabled=r.shadow!==null,t.shadowMap.type=1,l.color.set(r.sun.color),l.intensity=r.sun.intensity,l.position.set(r.sun.dir[0],r.sun.dir[1],r.sun.dir[2]),l.target.position.set(0,0,0),T.copy(l.position).normalize(),u.color.set(r.hemi.sky),u.groundColor.set(r.hemi.ground),u.intensity=r.hemi.intensity,i.fog instanceof um&&(i.fog.color.set(r.fog.color),i.fog.near=r.fog.near,i.fog.far=r.fog.far);let e=r.shadow;if(l.castShadow=e!==null,e!==null){l.shadow.mapSize.x!==e.mapSize&&l.shadow.map!==null&&(l.shadow.map.dispose(),l.shadow.map=null),l.shadow.mapSize.set(e.mapSize,e.mapSize);let t=l.shadow.camera;t.left=-e.halfExtent,t.right=e.halfExtent,t.top=e.halfExtent,t.bottom=-e.halfExtent,t.near=1,t.far=e.far,t.updateProjectionMatrix(),l.shadow.bias=e.bias,l.shadow.normalBias=e.normalBias,l.shadow.radius=e.radius}let n=r.atmosphere;for(let e of[`cloudsHigh`,`godRays`]){let t=a.getObjectByName(e);t!==void 0&&(t.visible=n)}o.visible=n,oe(),ie(),b=!0,x=!0,me(),te()}function ne(e,t){if(e.name!==`decor_wallBrick`&&e.name!==`decor_wallPlaster`&&e.name!==`decor_roof`)return;let n=e.userData;n.lambert===void 0&&e.material instanceof E_&&(n.lambert=e.material);let i=n.lambert;i!==void 0&&(n.normalMap===void 0&&(n.normalMap=i.normalMap),i.normalMap=r.normalMaps?n.normalMap:null,i.needsUpdate=!0,t?(n.standard===void 0&&(n.standard=new T_({color:i.color,vertexColors:i.vertexColors,flatShading:i.flatShading,map:i.map,normalMap:i.normalMap,roughness:.92,metalness:0})),e.material=n.standard):e.material=i)}function re(e,t){if(e!==a&&e!==s){if(e instanceof Z){e.name.startsWith(`decor_`)&&(e.visible=!r.hideDecor.includes(e.name));let i=t&&mk(e);if(e.receiveShadow=i,e.castShadow=i&&e.userData.cast===!0,x){ne(e,r.normalMaps&&!n);let t=e.material;if(Array.isArray(t))for(let e of t)e.needsUpdate=!0;else t.needsUpdate=!0}}for(let n of e.children)re(n,t)}}function ie(){if(p===null)return;let e=r.forestDensity;p.traverse(t=>{let n=t.userData.setForestDensity;n!==void 0&&n(e)})}let ae=new Map;function oe(){for(let e of[`clouds`,`cloudsHigh`]){let t=a.getObjectByName(e);t!==void 0&&t.traverse(e=>{let t=e.material;if(t!==void 0)for(let e of Array.isArray(t)?t:[t]){let t=ae.get(e);t===void 0&&(t=e.opacity,ae.set(e,t)),e.opacity=t*S}})}}function se(e){S=Math.min(1,Math.max(0,e)),oe()}function ce(e){w=Math.min(1,Math.max(0,e))}function le(e){C=e,me()}function ue(){b=!0,x=!0}function de(){let e=t.info,n=0;return r.shadow!==null&&i.traverse(e=>{e.isMesh===!0&&e.castShadow&&e.visible&&n++}),t.getSize(M),{calls:e.render.calls,triangles:e.render.triangles,shadowCasters:n,pixelRatio:t.getPixelRatio(),width:M.x,height:M.y,textures:e.memory.textures,geometries:e.memory.geometries,programs:e.programs?.length??0}}function fe(e){e!==r.tier&&(r=dk(e,n),P())}let pe=e=>{let t=ek(e.detail);t!==null&&fe(t)};window.addEventListener(QO,pe);function me(){let e=window.innerWidth,n=window.innerHeight;t.setSize(e,n,!1),y?.setPixelRatio(t.getPixelRatio()),y?.setSize(e,n),d.aspect=e/n,C===0?d.clearViewOffset():d.setViewOffset(e,n,0,C*n,e,n),d.updateProjectionMatrix()}function he(e){m=e}function ge(e,t={}){return p!==null&&i.remove(p),m=e,p=cO(e,t),i.add(p),ie(),b=!0,x=!0,p}function _e(e,t,n){d.getWorldDirection(D),E.copy(d.position).addScaledVector(D,pk),A.copy(T).negate(),O.crossVectors(A,j).normalize(),k.crossVectors(O,A);let r=2*e/t,i=Math.round(E.dot(O)/r)*r,a=Math.round(E.dot(k)/r)*r,o=E.dot(A);E.set(0,0,0).addScaledVector(O,i).addScaledVector(k,a).addScaledVector(A,o),l.target.position.copy(E),l.position.copy(E).addScaledVector(T,n)}let ve=(ok()||n&&r.tier===`medium`)&&r.tier!==`low`,ye=0,be=0,xe=0;function Se(){let e=performance.now(),t=ye===0?0:e-ye;ye=e,t===0||t>250||(be++,be<=30||(xe+=t,be<150||(ve=!1,xe/(be-30)>r.governorMs&&window.dispatchEvent(new CustomEvent(QO,{detail:`low`})))))}function Ce(){ve&&Se(),a.position.copy(d.position),o.visible&&YO(o,d.position.x,d.position.y,d.position.z,performance.now()/1e3),b&&(re(i,r.shadow!==null),b=!1,x=!1);let e=r.shadow;if(e!==null&&_e(e.halfExtent,e.mapSize,e.distance),m!==null&&(g===null&&_++%30==0&&(g=i.getObjectByName(`heroRig`)??null),g!==null&&(g.getWorldPosition(v),xO(h,m,v.x,v.y,v.z))),t.info.reset(),y!==null){let e=y.passes[1];e!==void 0&&r.bloom!==null&&(e.strength=r.bloom.strength*w),y.render()}else t.render(i,d)}function F(){f=!0,ee++,i.traverse(e=>{let t=e.userData;t.lambert?.dispose(),t.standard?.dispose()}),window.removeEventListener(QO,pe),N(),l.shadow.map?.dispose(),t.dispose()}return P(),typeof location<`u`&&new URLSearchParams(location.search).has(`debug`)&&(window.__ztScene=i),{scene:i,camera:d,renderer:t,backdropRoot:s,getTier:()=>r.tier,setTier:fe,resize:me,buildWorld:ge,setBlobWorld:he,render:Ce,dispose:F,setCloudCover:se,setLensShift:le,setBloomScale:ce,refreshFlags:ue,frameStats:de}}var gk=.5,_k=class{el;frames=0;elapsed=0;fps=0;last=performance.now();constructor(e=document.body){this.el=document.createElement(`div`),this.el.style.cssText=`position:fixed;top:4px;left:4px;z-index:50;pointer-events:none;font:11px/1.3 monospace;color:#fff;background:rgba(0,0,0,0.45);padding:4px 6px;border-radius:4px;white-space:pre;`,e.appendChild(this.el)}update(e,t,n){let r=performance.now();this.elapsed+=(r-this.last)/1e3,this.last=r,this.frames++,this.elapsed>=gk&&(this.fps=this.frames/this.elapsed,this.frames=0,this.elapsed=0);let i=Math.sqrt(e.vx*e.vx+e.vz*e.vz);this.el.textContent=`fps `+this.fps.toFixed(0)+`
calls `+t+`  tris `+n+`
pos `+e.px.toFixed(1)+` `+e.py.toFixed(1)+` `+e.pz.toFixed(1)+`
speed `+i.toFixed(1)+`  grounded `+e.grounded}};function vk(e,t){return!(t>0)||e<0?0:e>t?t:e}function yk(e,t){return`HOP `+vk(e,t)+`/`+Math.max(0,t)}function bk(e,t,n){let r=t-n;if(!(r>0))return 0;let i=(t-e)/r;return i<0?0:i>1?1:i}function xk(e,t,n,r=``){let i=document.createElement(t);return i.id=n,i.className=(`hud `+r).trim(),e.appendChild(i),i}function Sk(e){let t=Math.max(0,e),n=Math.floor(t/60),r=t-n*60;return n+`:`+(r<10?`0`:``)+r.toFixed(1)}var Ck=class{timer;timerText_;objective;pause;hint;reticle;reason;toastEl;win;winTime;winBest;action;hintBtn;actionDim=!1;timerText=``;actionText=``;reticleState=-1;reasonText=``;wp;wpLabel;wpArrow;wpShown=!1;wpEdge=!1;wpFlip=!1;wpX=-1e6;wpY=-1e6;wpAngle=1e6;wpText=``;hop;hopText=``;alt;altFill;altPct=-1;constructor(e,t,n,r={}){if(this.objective=xk(e,`div`,`hud-objective`),this.objective.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5 22.5 12 12 22.5 1.5 12Z" fill="#ffc83a" stroke="#2a1a0e" stroke-width="1.5"/><path d="M12 6.5 17.5 12 12 17.5 6.5 12Z" fill="none" stroke="#2a1a0e" stroke-width="1.5"/></svg><span>Reach the Target</span>`,this.hop=xk(e,`div`,`hud-hop`),r.hopChip===!1&&(this.hop.style.display=`none`),this.alt=xk(e,`div`,`hud-alt`),this.alt.innerHTML=`<i class="alt-fill"></i><i class="alt-dot"></i>`,this.altFill=this.alt.querySelector(`.alt-fill`),this.timer=xk(e,`div`,`hud-timer`,t?`debug`:``),this.timer.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="13.5" r="8"/><path d="M12 13.5V9.5M10 2.5h4M12 2.5v3M18.5 6.5 20 5"/></g></svg><span></span>`,this.timerText_=this.timer.querySelector(`span`),this.pause=xk(e,`button`,`hud-pause`),this.pause.type=`button`,this.pause.setAttribute(`aria-label`,`Pause`),this.pause.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></g></svg>`,this.pause.addEventListener(`click`,()=>{window.dispatchEvent(new CustomEvent(`zt-menu`))}),this.hintBtn=xk(e,`button`,`hud-hintbtn`),this.hintBtn.type=`button`,this.hintBtn.setAttribute(`aria-label`,`Hint: show a zipline to take (H)`),this.hintBtn.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/></g></svg><span>HINT</span>`,r.onHint===null||r.onHint===void 0)this.hintBtn.style.display=`none`;else{let e=r.onHint;this.hintBtn.addEventListener(`click`,()=>e())}this.wp=xk(e,`div`,`hud-waypoint`,`off`),this.wp.innerHTML=`<i class="wp-stem"></i><span class="wp-arrow"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 14l4-4 4 4" fill="none" stroke="#ffc83a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span><svg class="wp-dia" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5 22.5 12 12 22.5 1.5 12Z" fill="#ffc83a" stroke="#2a1a0e" stroke-width="1.5"/><path d="M12 6.5 17.5 12 12 17.5 6.5 12Z" fill="none" stroke="#2a1a0e" stroke-width="1.5"/></svg><span class="wp-label"></span>`,this.wpLabel=this.wp.querySelector(`.wp-label`),this.wpArrow=this.wp.querySelector(`.wp-arrow`),this.hint=xk(e,`div`,`hud-hint`),this.hint.textContent=r.hint??`Aim at a glowing anchor and hook`,this.reticle=xk(e,`div`,`hud-reticle`),this.reason=xk(e,`div`,`hud-reason`,`off`),this.toastEl=xk(e,`div`,`hud-toast`,`off`),this.win=xk(e,`div`,`hud-win`,`off`);let i=document.createElement(`h1`);i.textContent=`You made it!`,this.winTime=document.createElement(`p`),this.winBest=document.createElement(`p`);let a=document.createElement(`button`);a.type=`button`,a.textContent=`PLAY AGAIN`,a.addEventListener(`click`,n),this.win.append(i,this.winTime,this.winBest,a),this.action=e.querySelector(`#btn-jump`),this.setTime(0)}setTime(e){let t=Sk(e);t!==this.timerText&&(this.timerText=t,this.timerText_.textContent=t)}setHop(e,t){let n=yk(e,t);n!==this.hopText&&(this.hopText=n,this.hop.textContent=n)}setAltitude(e){let t=Math.round(e*200)/2;t!==this.altPct&&(this.altPct=t,this.alt.style.setProperty(`--alt`,t+`%`))}objectiveIn(){let e=this.objective.classList.contains(`in-a`);this.objective.classList.toggle(`in-a`,!e),this.objective.classList.toggle(`in-b`,e)}pulseTimer(){let e=this.timerText_.classList.contains(`pulse-a`);this.timerText_.classList.toggle(`pulse-a`,!e),this.timerText_.classList.toggle(`pulse-b`,e)}fadeHint(){this.hint.classList.add(`gone`)}showHint(){this.hint.classList.remove(`gone`)}setReticle(e){e!==this.reticleState&&(this.reticleState=e,this.reticle.classList.toggle(`off`,e===0),this.reticle.classList.toggle(`lock`,e===2))}setAimReason(e){e!==this.reasonText&&(this.reasonText=e,this.reason.textContent=e,this.reason.classList.toggle(`off`,e===``))}setWaypoint(e,t,n,r,i,a,o){e!==this.wpShown&&(this.wpShown=e,this.wp.classList.toggle(`off`,!e),!e)||e&&(r!==this.wpEdge&&(this.wpEdge=r,this.wp.classList.toggle(`edge`,r)),o!==this.wpFlip&&(this.wpFlip=o,this.wp.classList.toggle(`flip`,o)),a!==this.wpText&&(this.wpText=a,this.wpLabel.textContent=a),(Math.abs(t-this.wpX)>=.5||Math.abs(n-this.wpY)>=.5)&&(this.wpX=t,this.wpY=n,this.wp.style.transform=`translate3d(`+t.toFixed(1)+`px,`+n.toFixed(1)+`px,0)`),r&&Math.abs(i-this.wpAngle)>=.01&&(this.wpAngle=i,this.wpArrow.style.transform=`rotate(`+(i+Math.PI/2).toFixed(3)+`rad)`))}toast(e){this.toastEl.textContent=e,this.toastEl.classList.remove(`off`)}hideToast(){this.toastEl.classList.add(`off`)}showWin(e,t){this.winTime.textContent=`Time `+Sk(e),this.winBest.textContent=`Best `+Sk(t),this.win.classList.remove(`off`)}hideWin(){this.win.classList.add(`off`)}setActionLabel(e){if(this.action===null||e===this.actionText)return;this.actionText=e,this.action.dataset.mode=e.toLowerCase();let t=this.action.querySelector(`.lbl`);t!==null&&(t.textContent=e),this.action.setAttribute(`aria-label`,e.charAt(0)+e.slice(1).toLowerCase())}setActionDim(e){this.action!==null&&e!==this.actionDim&&(this.actionDim=e,this.action.classList.toggle(`dim`,e))}setHintActive(e){this.hintBtn.classList.toggle(`on`,e)}destroy(){this.hintBtn.remove(),this.objective.remove(),this.hop.remove(),this.alt.remove(),this.pause.remove(),this.timer.remove(),this.hint.remove(),this.reticle.remove(),this.reason.remove(),this.wp.remove(),this.toastEl.remove(),this.win.remove()}},wk=new C;function Tk(e,t,n,r,i,a,o){let s=e.anchors[a];if(s===void 0)return!1;let c=r+t.hero.height*Te,l=s.px-n,u=s.py-c,d=s.pz-i,f=Math.sqrt(l*l+u*u+d*d);return f<1e-6?!1:(M(e,t,n,r+t.rope.handToFeet,i,n,c,i,l/f,u/f,d/f,t.rope.maxLen,o,wk),wk.anchorId===a)}function Ek(e,t,n,r,i,a,o){if(e.lineOnly===1)return-1;let s=e.route[a];if(s!==void 0&&Tk(e,t,n,r,i,s,o))return s;let c=-1,l=1/0;for(let a=0;a<e.anchors.length;a++){let s=e.anchors[a],u=(s.px-n)*(s.px-n)+(s.py-r)*(s.py-r)+(s.pz-i)*(s.pz-i);u>=l||Tk(e,t,n,r,i,a,o)&&(c=a,l=u)}return c}function Dk(e){switch(e){case 2:return`Too close`;case 3:return`Out of range`;case 4:return`Can't zip uphill`;case 5:return`Too flat`;case 6:return`Too steep`;case 7:return`Line blocked`;case 8:return`Stand on a line pad`;default:return``}}var Ok=15985366,kk=12863274,Ak=.1,jk=.55,Mk=.85,Nk=.06,Pk=.001;function Fk(e){return e===1?Ok:e===2?Pw:kk}var Ik=class{group=new nm;lineGeo=new Ag(1,1,1);ringGeo=new f_(jk,Mk,24);lineMat=new gh({color:Ok,transparent:!0,opacity:.85,fog:!1});ringMat=new gh({color:Ok,transparent:!0,opacity:.9,fog:!1});line=new Z(this.lineGeo,this.lineMat);ring=new Z(this.ringGeo,this.ringMat);aim=new K;lastOutcome=-1;constructor(){this.ring.rotation.x=-Math.PI/2,this.group.add(this.line,this.ring),this.group.visible=!1}update(e,t,n,r,i,a,o,s,c,l){let u=i-t,d=a-n,f=o-r,p=Math.sqrt(u*u+d*d+f*f);if(e===0||p<Pk)this.group.visible=!1;else{if(this.group.visible=!0,e!==this.lastOutcome){this.lastOutcome=e;let t=Fk(e);this.lineMat.color.setHex(t),this.ringMat.color.setHex(t)}this.line.position.set(t+u/2,n+d/2,r+f/2),this.line.scale.set(Ak,Ak,p),this.aim.set(i,a,o),this.line.lookAt(this.aim),this.ring.position.set(s,c+Nk,l)}}hide(){this.group.visible=!1}dispose(){this.lineGeo.dispose(),this.ringGeo.dispose(),this.lineMat.dispose(),this.ringMat.dispose()}},Lk=40,Rk=16765786,zk=class{group=new nm;beamGeo=new Ng(.2,.45,Lk,8,1,!0);ringGeo=new f_(.5,.75,24);beamMat=new gh({color:16777215,vertexColors:!0,transparent:!0,blending:2,depthWrite:!1,fog:!1,side:2});ringMat=new gh({color:Rk,transparent:!0,opacity:.8,blending:2,depthWrite:!1,fog:!1,side:2});ring;constructor(){this.beamGeo.translate(0,Lk/2,0);let e=this.beamGeo.getAttribute(`position`),t=new Float32Array(e.count*4);for(let n=0;n<e.count;n++){let r=.7*(1-e.getY(n)/Lk);t[n*4]=1*r,t[n*4+1]=.8274509803921568*r,t[n*4+2]=.35294117647058826*r,t[n*4+3]=r}this.beamGeo.setAttribute(`color`,new X(t,4));let n=new Z(this.beamGeo,this.beamMat);n.frustumCulled=!1,this.ringGeo.rotateX(-Math.PI/2),this.ring=new Z(this.ringGeo,this.ringMat),this.ring.position.y=.05,this.group.add(n,this.ring),this.group.visible=!1}update(e,t,n,r,i,a){this.group.visible=e,e&&(this.group.position.set(t,n,r),this.ring.position.y=i-n+.05,this.ring.scale.setScalar(1+.25*Math.sin(6*a)))}dispose(){this.beamGeo.dispose(),this.ringGeo.dispose(),this.beamMat.dispose(),this.ringMat.dispose()}};function Bk(){return{x:0,y:0,edge:!1,angle:0}}function Vk(e,t,n,r,i,a,o,s,c,l,u=0){let d=r>-a,f,p;if(d)f=o/2-t*o,p=s/2+n*o;else{let e=-r,a=t/e/(o/s*i),c=n/e/i;f=(a*.5+.5)*o,p=(.5-c*.5)*s+u}let m=!d&&f>=l&&f<=o-l&&p>=c&&p<=s-l;if(e.edge=!m,m)return e.x=f,e.y=p,e.angle=0,e;let h=f-o/2,g=p-s/2;h===0&&g===0&&(g=1);let _=Math.abs(h),v=Math.abs(g),y=_>0?(o/2-l)/_:1/0,b=v>0?(s/2-l)/v:1/0,x=Math.min(y,b);return e.x=o/2+h*x,e.y=Math.max(c,s/2+g*x),e.angle=Math.atan2(g,h),e}function Hk(e){return Math.round(e)+` m`}function Uk(e,t,n,r){let i=n,a=!1;for(let o=0;o<e.length;o++){let s=e[o];s.max.y>n||t<s.min.x||t>s.max.x||r<s.min.z||r>s.max.z||(!a||s.max.y>i)&&(i=s.max.y,a=!0)}return i}function Wk(e,t,n){if(!n)return Math.max(10,t*.028)+Math.max(32,t*.054)+8;let r=Math.max(10,e*.03),i=Math.min(48,Math.max(34,e*.1)),a=Math.min(30,Math.max(24,e*.07));return r+i+4+a+8}var Gk=Math.tan(20*Math.PI/180),Kk=2.6,qk=.6,Jk=3.5;2*Jk;var Yk=1.8,Xk=1.6,Zk=.4,Qk=.25,$k=.8,eA=Jk,tA=.2;function nA(e){return Gk*e+-8}var rA=class{n=2;gap=13;cx=0;decoy=0;pitched=0;drift=0};function iA(e,t,n){let r=(e^Math.imul(t+1,2654435761)^Math.imul(n+1,2246822507))>>>0;r=r+1831565813>>>0;let i=Math.imul(r^r>>>15,1|r);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296}function aA(e,t){let n=0;for(let r=5;r<=t;r++){let t=(Math.floor(iA(e,r,3)*7)-3)*2;n+=t,n>8&&(n=8),n<-8&&(n=-8)}return n}function oA(e,t){let n=t.chase.v0,r=t.chase.vMax;if(!(r>n))return 0;let i=(e-n)/(r-n);return i<0?0:i>1?1:i}function sA(e,t,r,i=0,a=n.chase){if(t<4){r.n=2,r.gap=13,r.cx=0,r.decoy=t===1?-1:+(t===3),r.pitched=+(t===1),r.drift=0;return}let o=iA(e,t,1);r.n=o<a.oneHouseBase+a.oneHouseGain*i?1:o<.7?2:3,r.gap=a.gapBase+iA(e,t,2)*(a.gapSpanLo+(a.gapSpanHi-a.gapSpanLo)*i),r.cx=aA(e,t);let s=aA(e,t+1);r.drift=s>r.cx?1:s<r.cx?-1:0,r.decoy=0,iA(e,t,4)<a.decoyBase+a.decoyGain*i&&(r.decoy=iA(e,t,5)<.5?-1:1),r.pitched=+(r.decoy!==0&&iA(e,t,6)<.5)}function cA(e,t){return e-7*t.n-t.gap}var lA=class{solid=new Float64Array(126);solidUsed=new Uint8Array(21);style=new Uint8Array(21);pad=new Float64Array(18);padUsed=new Uint8Array(3);anchor=new Float64Array(6);anchorUsed=new Uint8Array(2);roof=new Float64Array(6);roofUsed=0;top=new Float64Array(3);centreZ=new Float64Array(3)};function uA(e,t,n,r,i,a,o,s){let c=t*6;e[c]=n,e[c+1]=r,e[c+2]=i,e[c+3]=a,e[c+4]=o,e[c+5]=s}function dA(e,t,n,r){r.solidUsed.fill(0),r.padUsed.fill(0),r.anchorUsed.fill(0),r.roofUsed=0;let i=0,a=0;for(let n=0;n<e.n;n++){let o=t-Jk-7*n,s=nA(o)+8-(n===0?0:Kk),c=e.cx-4,l=e.cx+4,u=o-Jk,d=o+Jk;r.top[n]=s,r.centreZ[n]=o,n===0&&(i=s,a=o);let f=n*6;uA(r.solid,f,c,s-qk,u,l,s,d),r.style[f]=2,uA(r.solid,f+1,c,nA(u),u,l,s-qk,d),r.style[f+1]=1;let p=n%2==0?1:-1,m=e.cx+p*4,h=Math.min(m,m+p*Yk),g=Math.max(m,m+p*Yk);uA(r.solid,f+2,h,s-3-.3,u+1,g,s-3,d-1),r.style[f+2]=1,uA(r.solid,f+3,c,s,u,c+Qk,s+Zk,d),r.style[f+3]=4,uA(r.solid,f+4,l-Qk,s,u,l,s+Zk,d),r.style[f+4]=4;let _=(e.drift===0?n%2==0:e.drift>0)?c+1.1:l-1.1;uA(r.solid,f+5,_-.8,s,o-1.6,_+.8,s+$k,o),r.style[f+5]=4;for(let e=0;e<6;e++)r.solidUsed[f+e]=1;uA(r.pad,n,c+1,s,u+1,l-1,s,d-1),r.padUsed[n]=1}if(n&&(r.anchor[0]=e.cx,r.anchor[1]=i+Xk,r.anchor[2]=a+1,r.anchorUsed[0]=1),e.decoy!==0){let t=e.cx+e.decoy*12,n=a-Jk,o=a+Jk;uA(r.solid,18,t-3.5,nA(n),n,t+3.5,i-.6,o),r.style[18]=3,r.solidUsed[18]=1,e.pitched!==0&&(uA(r.roof,0,t-3.5,i-.6,n,t+3.5,i-.6+2,o),r.roofUsed=1),r.anchor[3]=t,r.anchor[4]=i+Xk,r.anchor[5]=a+1,r.anchorUsed[1]=1}let o=t+tA,s=cA(t,e)-tA,c=nA(s)-20,l=nA(o)+60;uA(r.solid,19,-36,c,s,-34,l,o),uA(r.solid,20,34,c,s,36,l,o),r.style[19]=5,r.style[20]=5,r.solidUsed[19]=1,r.solidUsed[20]=1}var fA=-1e4,pA=-6e4,mA=class{world;seed=0;slots=6;slotRow;slotZTop;spec;version;epoch=0;oldest=0;newest=0;scratch=new lA;difficulty=0;forceDifficulty=-1;cfg=null;constructor(e,t){this.world=e,this.slots=t,this.slotRow=new Int32Array(t).fill(-1),this.slotZTop=new Float64Array(t),this.spec=[];for(let e=0;e<t;e++)this.spec.push(new rA);this.version=new Int32Array(t)}};function hA(e,t){return t%e.slots}function gA(e){return 3+e*21}function _A(e){return e*3}function vA(e){return e*2}function yA(e){return e*2}function bA(e){return 1+e*2}function xA(e,t,n,r,i,a,o){e.min.x=t,e.min.y=n,e.min.z=r,e.max.x=i,e.max.y=a,e.max.z=o}function SA(e){xA(e,0,fA,0,0,fA,0)}function CA(e,t,n,i,a,o){return new r(new f(e,t,n),new f(i,a,o))}function wA(e,t,n){let r=hA(e,t),i=e.world,a=e.spec[r];e.cfg===null?sA(e.seed,t,a,e.difficulty):sA(e.seed,t,a,e.difficulty,e.cfg);let o=e.scratch;dA(a,n,t>0,o),e.slotRow[r]=t,e.slotZTop[r]=n;let s=gA(r);for(let e=0;e<21;e++){let t=i.solids[s+e];if(o.solidUsed[e]===1){let n=e*6;xA(t,o.solid[n],o.solid[n+1],o.solid[n+2],o.solid[n+3],o.solid[n+4],o.solid[n+5])}else SA(t);i.style[s+e]=o.style[e]}let c=_A(r);for(let e=0;e<3;e++){let t=i.pads[c+e];if(o.padUsed[e]===1){let n=e*6;xA(t,o.pad[n],o.pad[n+1],o.pad[n+2],o.pad[n+3],o.pad[n+4],o.pad[n+5])}else SA(t)}let l=vA(r);for(let e=0;e<2;e++){let t=i.anchors[l+e];o.anchorUsed[e]===1?(t.px=o.anchor[e*3],t.py=o.anchor[e*3+1],t.pz=o.anchor[e*3+2]):(t.px=0,t.py=fA,t.pz=0)}let u=bA(r),d=i.roofs[r],f=i.ramps[u],p=i.ramps[u+1];if(o.roofUsed===1){let e=o.roof[0],t=o.roof[1],n=o.roof[2],r=o.roof[3],i=o.roof[4],a=o.roof[5],s=(e+r)*.5;xA(d.aabb,e,t,n,r,i,a),xA(f.aabb,e,t,n,s,i,a),xA(p.aabb,s,t,n,r,i,a),f.rise=i-t,p.rise=i-t}else SA(d.aabb),SA(f.aabb),SA(p.aabb),f.rise=0,p.rise=0;e.version[r]++,e.epoch++}function TA(e,t){let n=e.world.route;n.length=0;let r=t+1;r<1&&(r=1);for(let t=r;t<=e.newest;t++)t<e.oldest||n.push(yA(hA(e,t)))}function EA(e){let t=hA(e,e.newest),n=cA(e.slotZTop[t],e.spec[t]);e.oldest++,e.newest++,wA(e,e.newest,n)}function DA(e,t){let n=Math.max(5,Math.floor(t.chase.slots)),r=new ws,i=new mA(r,n);i.seed=e|0,i.cfg=t.chase,i.difficulty=oA(t.chase.v0,t),r.spawn=new f(0,0,0),r.spawnYaw=3.14159,r.killPlaneY=-1e9;let a=nA(pA);Ds(r,CA(-34,a,pA,34,a,26),2,nA(26)-a);let o=nA(0)-40;Es(r,CA(-34,o,26,34,80,28)),Es(r,CA(-36,o,eA,-34,80,28)),Es(r,CA(34,o,eA,36,80,28));for(let e=0;e<3;e++)r.style.push(5);for(let e=0;e<n;e++){for(let e=0;e<21;e++)Es(r,CA(0,fA,0,0,fA,0)),r.style.push(1);for(let e=0;e<3;e++)r.pads.push(CA(0,fA,0,0,fA,0));for(let e=0;e<2;e++)ks(r,0,fA,0);Os(r,CA(0,fA,0,0,fA,0),1)}let s=eA;for(let e=0;e<n;e++)wA(i,e,s),s=cA(s,i.spec[hA(i,e)]);return i.oldest=0,i.newest=n-1,TA(i,0),i}function OA(e,t){let n=t-(e.oldest<1?1:e.oldest)+1;return n<0?0:n}function kA(e,t){let n=hA(e,e.oldest),r=e.slotZTop[n]-eA,i=Gk*r,a=e.world;t.solids.length=0,t.ramps.length=0,t.roofs.length=0,t.anchors.length=0,t.pads.length=0,t.route.length=0,t.style.length=0,t.killPlaneY=-1e9;for(let n=e.oldest;n<=e.newest;n++){let o=hA(e,n),s=gA(o);for(let e=0;e<21;e++){let n=a.solids[s+e],o=a.style[s+e];n.min.y<=-9999||o===5||(t.solids.push(CA(n.min.x,n.min.y-i,n.min.z-r,n.max.x,n.max.y-i,n.max.z-r)),t.style.push(o))}let c=_A(o);for(let e=0;e<3;e++){let n=a.pads[c+e];n.min.y<=-9999||t.pads.push(CA(n.min.x,n.min.y-i,n.min.z-r,n.max.x,n.max.y-i,n.max.z-r))}let l=a.roofs[o];if(l.aabb.min.y>-9999){let e=l.aabb;Os(t,CA(e.min.x,e.min.y-i,e.min.z-r,e.max.x,e.max.y-i,e.max.z-r),1)}let u=vA(o);for(let e=0;e<2;e++){let n=a.anchors[u+e];if(n.py<=-9999)continue;let o=ks(t,n.px,n.py-i,n.pz-r);e===0&&t.route.push(o)}}return r}var AA=class{z=0;gap=0;t=0;v=0;caught=0};function jA(e,t){let n=new AA;return n.z=e+t.chase.startGap,n.gap=t.chase.startGap,n.v=t.chase.v0,n}function MA(e,t,n){let r=n.chase,i=Math.min(r.vMax,r.v0+r.accel*e);return t>r.gapMax?i+r.rubberK*(t-r.gapMax):i}function NA(e,t,n){let r=1/n.fixedHz;e.t+=r,e.v=MA(e.t,e.gap,n),e.z-=e.v*r,e.gap=e.z-t,e.caught=+(e.gap<=n.chase.catchGap)}function PA(e){let t=e<0?0:e>1?1:e;return t*t*(3-2*t)}function FA(e,t){let n=t.chase.catchGap,r=t.chase.fogGap;return PA((r-e)/(r-n))}var IA=.25,LA=80,RA=class{rw;dragon;spawnZ=0;heroRow=0;lastHopRow=0;hops=0;cleans=0;perfects=0;maxProgress=0;prevVy=0;ticks=0;constructor(e,t){this.rw=e,this.dragon=t}};function zA(e,t,n){let r=new RA(DA(e,n),jA(t,n));return r.spawnZ=t,r}function BA(e,t){let n=t.chase;return Math.floor(e.maxProgress)+n.scoreHop*e.hops+n.scoreClean*e.cleans+n.scorePerfect*e.perfects}function VA(e,t,n,r,i){for(let a=e.oldest;a<=e.newest;a++){let o=_A(hA(e,a));for(let e=0;e<3;e++){let a=t.pads[o+e];if(!(a.max.y<-9999)&&n>=a.min.x&&n<=a.max.x&&i>=a.min.z&&i<=a.max.z&&Math.abs(r-a.max.y)<=IA)return!0}}return!1}function HA(e,t){let n=e.oldest;for(let r=e.oldest;r<=e.newest&&!(e.slotZTop[hA(e,r)]<t-.5);r++)n=r;return n}function UA(e,t){e.dead=1,e.mode=2,e.deadCause=t,e.eventBits|=32,e.vx=0,e.vy=0,e.vz=0,e.grounded=0,e.perfect=0,b(e.hook)}function WA(e,t,n,r){let i=e.rw;e.ticks++;let a=t.eventBits;t.dead===0&&t.py<nA(t.pz)-LA&&UA(t,1);let o=HA(i,t.pz);for(i.difficulty=i.forceDifficulty>=0?i.forceDifficulty:oA(e.dragon.v,r);o>=i.oldest+2;)EA(i),o=HA(i,t.pz);if(e.heroRow=o,TA(i,o),a&1){let n=t.hook.anchorId;if(n>=0&&n%2==0){let t=n/2|0,r=i.slotRow[t];r>e.lastHopRow&&(e.hops++,e.lastHopRow=r)}}a&4&&t.dead===0&&-e.prevVy<r.landing.vyClean&&VA(i,n,t.px,t.py,t.pz)&&e.cleans++,a&64&&e.perfects++;let s=e.spawnZ-t.pz;s>e.maxProgress&&(e.maxProgress=s),e.prevVy=t.vy,NA(e.dragon,t.pz,r),e.dragon.caught===1&&t.dead===0&&UA(t,7)}function GA(e){e.traverse(e=>{e.isInstancedMesh===!0&&e.dispose();let t=e;if(t.isMesh!==!0)return;t.geometry.dispose();let n=t.material;for(let e of Array.isArray(n)?n:[n])e.dispose()})}var KA=class{onRebuilt;root=new nm;level=null;lastEpoch=-1;mini=new ws;lastRebuildMs=0;rebuilds=0;constructor(e){this.onRebuilt=e,this.root.name=`chase_rows`}sync(e){if(e.epoch===this.lastEpoch)return!1;this.lastEpoch=e.epoch;let t=performance.now();this.level!==null&&(this.root.remove(this.level),GA(this.level));let n=kA(e,this.mini),r=cO(this.mini,{scenery:!1});return this.level=r,this.root.add(r),this.root.position.set(0,Gk*n,n),this.root.updateMatrixWorld(!0),this.onRebuilt(),this.lastRebuildMs=performance.now()-t,this.rebuilds++,!0}invalidate(){this.lastEpoch=-1}update(e,t){this.level!==null&&uO(this.level,e,t)}dispose(){this.level!==null&&(this.root.remove(this.level),GA(this.level),this.level=null)}},qA=306/915,JA=.29,YA=.96,XA=.92,ZA=.36,QA=.8,$A=.78,ej=-.24,tj=.36;function nj(e,t){return e*qA*t/JA}function rj(e){let t=Math.min(1,Math.max(0,e));return t*t*(3-2*t)}function ij(e,t,n){let r=Math.max(.2,e),i=Math.min(YA,nj(XA,r)),a=r<1?.06:0,o=0,s=0,c;r>=1.2?(c=Math.min($A,nj(tj,r)),o=ej):(c=Math.min(ZA,nj(QA,r)),s=.47-c/2);let l=rj(t);return n.cx=o*l,n.cy=a+(s-a)*l,n.h=i+(c-i)*l,n}function aj(e){let t=Math.min(1,Math.max(0,e))-1;return 1+2.4*t*t*t+1.4*t*t}function oj(e){return 1.2-.74*rj(e)}var sj=1.3,cj=20,lj=48,uj=sj*cj*JA,dj=sj*cj*qA,fj=7,pj=14,mj=2,hj=9,gj=57,_j=.4,vj=.62,yj=3.2,bj=3,xj=.8,Sj=2.2,Cj=1.1,wj=Math.PI*2/30,Tj=1.7,Ej=256,Dj=.6,Oj=999,kj=.9,Aj=.45,jj={low:{rings:30,radial:10,clouds:34,spines:12,mane:16,seg:10},medium:{rings:44,radial:14,clouds:64,spines:18,mane:24,seg:14},high:{rings:60,radial:18,clouds:96,spines:24,mane:32,seg:18}},Mj=new Y(`#d89b34`),Nj=new Y(`#9c5f1a`),Pj=new Y(`#f2dcaa`),Fj=new Y(`#f1e3bd`),Ij=new Y(`#e2c588`),Lj=new Y(`#3e0c08`),Rj=new Y(`#a3302a`),zj=new Y(`#f0a43a`),Bj=new Y(`#ffb02e`),Vj=new Y(`#2a0800`),Hj=new Y(`#f6efe2`),Uj=new Y(`#e4a85a`),Wj=new K(0,1,0),Gj=new op().setFromAxisAngle(Wj,Math.PI);function Kj(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function qj(e){return e<0?0:e>1?1:e}function Jj(e){let t=qj(e);return t*t*(3-2*t)}function Yj(e,t){let n=sj*cj*Math.max(.05,.85-.55*Math.max(0,e));return t.w=n,t.h=n*.62,t}var Xj=new J,Zj=new op,Qj=new K,$j=new K;function eM(e,t,n,r,i,a,o,s,c,l=0){let u=new p_(1,t,Math.max(6,Math.round(t*.7)));Zj.setFromAxisAngle(Qj.set(0,0,1),l),Xj.compose(Qj.set(r,i,a),Zj,$j.set(o,s,c)),u.applyMatrix4(Xj),e.push({geo:u,color:n})}function tM(e,t,n,r,i,a,o){let s=new K().subVectors(i,r),c=s.length(),l=new Ng(o,a,c,Math.max(5,Math.round(t*.5)),1);l.translate(0,c/2,0),Zj.setFromUnitVectors(Wj,s.normalize()),Xj.compose(r,Zj,$j.set(1,1,1)),l.applyMatrix4(Xj),e.push({geo:l,color:n})}function nM(e,t,n,r,i,a,o){let s=new Pg(o,a,Math.max(5,Math.round(t*.5)));s.translate(0,a/2,0),Zj.setFromUnitVectors(Wj,Qj.copy(i).normalize()),Xj.compose(r,Zj,$j.set(1,1,1)),s.applyMatrix4(Xj),e.push({geo:s,color:n})}function rM(e){let t=[],n=0;for(let r of e){let e=r.geo.index===null?r.geo:r.geo.toNonIndexed();t.push(e),n+=e.getAttribute(`position`).count}let r=new Float32Array(n*3),i=new Float32Array(n*3),a=new Float32Array(n*3),o=0;for(let n=0;n<t.length;n++){let s=t[n].getAttribute(`position`),c=t[n].getAttribute(`normal`),l=e[n].color;for(let e=0;e<s.count;e++)r[o*3]=s.getX(e),r[o*3+1]=s.getY(e),r[o*3+2]=s.getZ(e),i[o*3]=c.getX(e),i[o*3+1]=c.getY(e),i[o*3+2]=c.getZ(e),a[o*3]=l.r,a[o*3+1]=l.g,a[o*3+2]=l.b,o++;t[n]!==e[n].geo&&t[n].dispose(),e[n].geo.dispose()}let s=new ih;return s.setAttribute(`position`,new Wm(r,3)),s.setAttribute(`normal`,new Wm(i,3)),s.setAttribute(`color`,new Wm(a,3)),s.computeBoundingSphere(),s}function iM(e,t,n){return new K(e,t,n)}function aM(e){let t=[];for(let n=0;n<2;n++){let r=n===0?-1:1,i=iM(r*1.2,2,1.3),a=iM(r*2.5,3.3,2.3),o=iM(r*3.75,4.4,3.6);tM(t,e,Ij,i,a,.42,.32),tM(t,e,Ij,a,o,.32,.1),tM(t,e,Ij,a,iM(r*2,4.25,1.7),.22,.07),tM(t,e,Ij,iM(r*3.12,3.85,2.95),iM(r*3.7,3.3,2),.18,.06),eM(t,e,Ij,a.x,a.y,a.z,.34,.34,.34)}eM(t,e,Mj,0,.7,.9,2.5,2.1,2.6);for(let n=0;n<2;n++){let r=n===0?-1:1;eM(t,e,Mj,r*1.85,-.35,-.3,1,1.1,1.35),eM(t,e,Nj,r*1.3,1.6,-1.2,1.05,.42,1.1,r*.32)}eM(t,e,Lj,0,-1,-2.2,1.15,.8,2.3),eM(t,e,Mj,0,.05,-2.6,1.45,.85,2.5),eM(t,e,Pj,0,.55,-4.75,1.15,.55,.65);let n=iM(0,-1,-.15);for(let r=0;r<2;r++){let i=r===0?-1:1;eM(t,e,Lj,i*.5,.62,-5.3,.22,.16,.12),nM(t,e,Fj,iM(i*.95,-.55,-4.3),n,1.1,.22),nM(t,e,Fj,iM(i*1.15,-.5,-3.4),n,.55,.15);let a=new Gg([iM(i*1.2,.1,-4.4),iM(i*2.6,-.6,-4.2),iM(i*3.6,-1.6,-2.8),iM(i*3.9,-2.8,-.8)]);t.push({geo:new m_(a,Math.max(8,e),.12,4,!1),color:Pj})}return rM(t)}function oM(e){let t=[];eM(t,e,Mj,0,-.45,-2.9,1.25,.45,2.4),eM(t,e,Pj,0,-.6,-4.9,.8,.4,.5),eM(t,e,Rj,0,-.05,-2.8,.65,.18,1.7);let n=iM(0,1,-.1),r=iM(0,-1,.35);for(let i=0;i<2;i++){let a=i===0?-1:1;nM(t,e,Fj,iM(a*.85,-.1,-4.6),n,.8,.18),nM(t,e,zj,iM(a*.6,-.75,-3.9),r,2.6,.35)}return nM(t,e,zj,iM(0,-.8,-4.2),r,3,.42),rM(t)}function sM(e){let t=[];for(let n=0;n<2;n++){let r=n===0?-1:1;eM(t,e,Bj,r*1.5,1.05,-1.6,.45,.4,.4),eM(t,e,Vj,r*1.62,1.05,-1.95,.07,.3,.08)}return rM(t)}var cM=class{group=new nm;tier;built=null;catching=!1;bodyMat=new E_({vertexColors:!0,emissive:`#3a2408`});cloudMat=new E_({color:`#ffffff`,emissive:`#4a3a26`});flameMat=new E_({color:zj,emissive:`#a8480a`});headMat=new E_({vertexColors:!0,emissive:`#3a2410`,fog:!1});maneMat=new E_({color:zj,emissive:`#b8520c`,fog:!1});eyeMat=new gh({vertexColors:!0,fog:!1,toneMapped:!1});headMats=[this.headMat,this.maneMat,this.eyeMat];bodyMats=[this.bodyMat,this.cloudMat,this.flameMat];cloudGeo=new l_(1,1);coneGeo=new Pg(1,1,5).translate(0,.5,0);head=new nm;jawPivot=new nm;trX=new Float32Array(Ej);trY=new Float32Array(Ej);trZ=new Float32Array(Ej);trCount=0;trNewest=0;ringS=new Float32Array;ringU=new Float32Array;ringRx=new Float32Array;ringRy=new Float32Array;ds=1;cx=new Float32Array;cy=new Float32Array;cz=new Float32Array;tx=new Float32Array;ty=new Float32Array;tz=new Float32Array;sx=new Float32Array;sy=new Float32Array;sz=new Float32Array;ux=new Float32Array;uy=new Float32Array;uz=new Float32Array;cosA=new Float32Array;sinA=new Float32Array;cloudData=new Float32Array;spineData=new Float32Array;tuftData=new Float32Array;maneData=new Float32Array;catchPoseScratch={cx:0,cy:0,h:0};m4=new J;q=new op;qCam=new op;p=new K;s=new K;fC=new K;fT=new K;fS=new K;fU=new K;ax=new K;ay=new K;az=new K;pTop=new K;pBot=new K;target=new K;env={w:0,h:0};constructor(e){this.tier=e,this.group.name=`chase_dragon`,this.head.name=`dragon_head`,this.jawPivot.position.set(0,-.6,.6),this.head.add(this.jawPivot),this.group.add(this.head),this.build(),this.update(0,0,0,0,30,0,!1)}setTier(e){e!==this.tier&&(this.tier=e,this.build())}get ringCount(){return this.ringS.length}spinePoint(e,t){return t.set(this.cx[e],this.cy[e],this.cz[e])}clearBuilt(){this.endCatch();let e=this.built;e!==null&&(this.group.remove(e.body,e.clouds,e.flames),this.head.remove(e.skull,e.eyes,e.mane),this.jawPivot.remove(e.jaw),e.body.geometry.dispose(),e.skull.geometry.dispose(),e.jaw.geometry.dispose(),e.eyes.geometry.dispose(),e.clouds.dispose(),e.flames.dispose(),e.mane.dispose(),this.built=null)}build(){this.clearBuilt();let e=jj[this.tier],t=Kj(883296),n=e.rings,r=e.radial;this.ringS=new Float32Array(n),this.ringU=new Float32Array(n),this.ringRx=new Float32Array(n),this.ringRy=new Float32Array(n),this.ds=gj/(n-1),this.cx=new Float32Array(n),this.cy=new Float32Array(n),this.cz=new Float32Array(n),this.tx=new Float32Array(n),this.ty=new Float32Array(n),this.tz=new Float32Array(n),this.sx=new Float32Array(n),this.sy=new Float32Array(n),this.sz=new Float32Array(n),this.ux=new Float32Array(n),this.uy=new Float32Array(n),this.uz=new Float32Array(n);for(let e=0;e<n;e++){let t=e*this.ds,n=t/lj;Yj(n,this.env);let r=.62+.38*Jj(t/10),i=t<=lj?1:Math.max(0,1-(t-lj)/hj)**.7,a=1+.05*Math.cos(t/yj*Math.PI*2);this.ringS[e]=mj+t,this.ringU[e]=n,this.ringRx[e]=.5*_j*this.env.w*r*i*a,this.ringRy[e]=.5*vj*this.env.h*r*i*a}this.cosA=new Float32Array(r),this.sinA=new Float32Array(r);for(let e=0;e<r;e++)this.cosA[e]=Math.cos(e/r*Math.PI*2),this.sinA[e]=Math.sin(e/r*Math.PI*2);let i=new Float32Array(n*r*3),a=new Float32Array(n*r*3),o=new Float32Array(n*r*3),s=[],c=new Y;for(let e=0;e<n;e++){let t=Math.floor(e*this.ds/yj)%2==0?1:.9;for(let i=0;i<r;i++){let a=this.sinA[i];a<-.4?c.copy(Pj).multiplyScalar(t):c.copy(Mj).lerp(Nj,qj((a+.4)/1.4));let l=(e*r+i)*3;if(o[l]=c.r,o[l+1]=c.g,o[l+2]=c.b,e<n-1){let t=e*r+i,n=e*r+(i+1)%r,a=(e+1)*r+i,o=(e+1)*r+(i+1)%r;s.push(t,n,a,n,o,a)}}}let l=new ih;l.setAttribute(`position`,new Wm(i,3)),l.setAttribute(`normal`,new Wm(a,3)),l.setAttribute(`color`,new Wm(o,3)),l.setIndex(s);let u=new Z(l,this.bodyMat);u.name=`dragon_body`,u.frustumCulled=!1;let d=e.clouds;this.cloudData=new Float32Array(d*5);let f=new $h(this.cloudGeo,this.cloudMat,d);f.name=`dragon_clouds`;for(let e=0;e<d;e++){let n=Math.min(1,Math.max(.02,(e+.5+(t()-.5)*.8)/d));Yj(n,this.env);let r=Math.min(this.env.w,this.env.h)*(.2+t()*.12),i=t(),a=t()<.5?-1:1,o;o=i<.62?(a>0?0:Math.PI)+(t()-.5)*.9:i<.9?-Math.PI/2+(t()-.5)*1.6:(a>0?.55:Math.PI-.55)+(t()-.5)*.4;let s=e*5;this.cloudData[s]=mj+n*lj,this.cloudData[s+1]=Math.cos(o)*(this.env.w/2-r),this.cloudData[s+2]=Math.sin(o)*(this.env.h/2-r),this.cloudData[s+3]=r,this.cloudData[s+4]=t()*Math.PI*2,c.copy(Uj).lerp(Hj,qj(.5+Math.sin(o)*.7)),c.multiplyScalar(.95+t()*.08),f.setColorAt(e,c)}f.frustumCulled=!1;let p=e.spines;this.spineData=new Float32Array(p*3);for(let e=0;e<p;e++){let t=(e+.7)/(p+.4);Yj(t,this.env);let n=6+t*44,r=this.ringRyAt(n),i=Math.max(.6,(this.env.h/2-r)*1.1);this.spineData[e*3]=n,this.spineData[e*3+1]=i,this.spineData[e*3+2]=i*.3}this.tuftData=new Float32Array(28);for(let e=0;e<7;e++){let t=(e-3)/3*1.1;this.tuftData[e*4]=Math.sin(t)*.9,this.tuftData[e*4+1]=.25*Math.cos(t*2),this.tuftData[e*4+2]=5.5-Math.abs(t)*1.6,this.tuftData[e*4+3]=.85-Math.abs(t)*.2}let m=new $h(this.coneGeo,this.flameMat,p+7);m.name=`dragon_flames`,m.frustumCulled=!1;let h=new Z(aM(e.seg),this.headMat);h.name=`dragon_skull`;let g=new Z(oM(e.seg),this.headMat);g.name=`dragon_jaw`;let _=new Z(sM(e.seg),this.eyeMat);_.name=`dragon_eyes`;let v=e.mane;this.maneData=new Float32Array(v*10);let y=new K;for(let e=0;e<v;e++){let n=-Math.PI/2+Math.PI/6+(e+.5)/v*(Math.PI*2-Math.PI/3),r=e%2,i=2.2+r*.25;y.set(Math.cos(n),Math.sin(n)*.9+.2,.9+r*.4).normalize(),this.q.setFromUnitVectors(Wj,y);let a=e*10;this.maneData[a]=Math.cos(n)*i,this.maneData[a+1]=.7+Math.sin(n)*i*.9,this.maneData[a+2]=1.4+r,this.maneData[a+3]=this.q.x,this.maneData[a+4]=this.q.y,this.maneData[a+5]=this.q.z,this.maneData[a+6]=this.q.w,this.maneData[a+7]=2.4+t()*1.5-(Math.sin(n)<-.5?.8:0),this.maneData[a+8]=.5+t()*.25,this.maneData[a+9]=t()*Math.PI*2}let b=new $h(this.coneGeo,this.maneMat,v);b.name=`dragon_mane`,b.frustumCulled=!1,this.group.add(u,f,m),this.head.add(h,_,b),this.jawPivot.add(g),this.built={spec:e,body:u,bodyPos:i,bodyNor:a,clouds:f,flames:m,skull:h,jaw:g,eyes:_,mane:b},this.trCount=0}ringRyAt(e){let t=Math.min(this.ringS.length-1,Math.max(0,(e-mj)/this.ds)),n=Math.min(this.ringS.length-2,Math.floor(t)),r=t-n;return this.ringRy[n]+(this.ringRy[n+1]-this.ringRy[n])*r}update(e,t,n,r,i,a,o){let s=this.built;if(s===null)return;let c=qj((22-i)/19.5),l=o?Math.min(e,a-pj):e,u=nA(o?a:l),d=r*.4+Math.sin(t*xj)*bj+Math.sin(t*.37+1)*.8,f=u+fj-c*3+Math.sin(t*.9)*1.2-n*7,p=f-nA(l);this.feedTrail(d,p,l),this.solveSpine(d,p,l,t),this.writeBody(s,t),this.writeClouds(s,t),this.writeFlames(s,t),this.poseHead(s,d,f,l,t,c,n)}resetTrail(e,t,n){let r=Math.min(Ej,Math.ceil(67/Dj)+2);for(let i=0;i<r;i++)this.trX[i]=e,this.trY[i]=t,this.trZ[i]=n+(r-i)*Dj;this.trNewest=r-1,this.trCount=r}feedTrail(e,t,n){if(this.trCount===0){this.resetTrail(e,t,n);return}let r=this.trNewest,i=e-this.trX[r],a=t-this.trY[r],o=n-this.trZ[r];if(i*i+a*a+o*o>1600)this.resetTrail(e,t,n);else{for(;this.trCount>1&&this.trZ[this.trNewest]<=n+.01;)this.trNewest=(this.trNewest-1+Ej)%Ej,this.trCount--;this.trZ[this.trNewest]<=n+.01?this.resetTrail(e,t,n):(r=this.trNewest,i=e-this.trX[r],a=t-this.trY[r],o=n-this.trZ[r],i*i+a*a+o*o>=Dj*Dj&&(this.trNewest=(this.trNewest+1)%Ej,this.trX[this.trNewest]=e,this.trY[this.trNewest]=t,this.trZ[this.trNewest]=n,this.trCount=Math.min(Ej,this.trCount+1)))}}solveSpine(e,t,n,r){let i=this.ringS.length,a=e,o=t,s=n,c=0,l=0,u=a,d=o,f=s+1e3;this.trCount>0&&(u=this.trX[this.trNewest],d=this.trY[this.trNewest],f=this.trZ[this.trNewest]);let p=Math.hypot(u-a,d-o,f-s);for(let e=0;e<i;e++){let t=this.ringS[e];for(;c+p<t&&l<this.trCount;){if(c+=p,a=u,o=d,s=f,l++,l<this.trCount){let e=(this.trNewest-l+Ej)%Ej;u=this.trX[e],d=this.trY[e],f=this.trZ[e]}else u=a,d=o,f=s+1e3;p=Math.hypot(u-a,d-o,f-s)}let n=p>1e-6?qj((t-c)/p):0,r=s+(f-s)*n;this.cx[e]=a+(u-a)*n,this.cy[e]=o+(d-o)*n+nA(r),this.cz[e]=r}this.frames();for(let e=0;e<i;e++){let t=this.ringU[e],n=this.ringS[e],i=Jj(t/.3),a=wj*n-Tj*r,o=Sj*i*(.6+.4*Math.min(1,t))*Math.sin(a),s=Cj*i*Math.sin(a*.8+1.3);this.cx[e]+=this.sx[e]*o+this.ux[e]*s,this.cy[e]+=this.sy[e]*o+this.uy[e]*s+2*Math.sin(Math.min(1,t)*Math.PI*.5),this.cz[e]+=this.sz[e]*o+this.uz[e]*s,Yj(t,this.env);let c=nA(this.cz[e])+this.env.h*.45;this.cy[e]<c&&(this.cy[e]=c)}this.frames()}frames(){let e=this.ringS.length;for(let t=0;t<e;t++){let n=t>0?t-1:0,r=t<e-1?t+1:e-1;this.az.set(this.cx[r]-this.cx[n],this.cy[r]-this.cy[n],this.cz[r]-this.cz[n]),this.az.lengthSq()<1e-9&&this.az.set(0,0,1),this.az.normalize(),this.ax.crossVectors(Wj,this.az),this.ax.lengthSq()<1e-9&&this.ax.set(1,0,0),this.ax.normalize(),this.ay.crossVectors(this.az,this.ax),this.tx[t]=this.az.x,this.ty[t]=this.az.y,this.tz[t]=this.az.z,this.sx[t]=this.ax.x,this.sy[t]=this.ax.y,this.sz[t]=this.ax.z,this.ux[t]=this.ay.x,this.uy[t]=this.ay.y,this.uz[t]=this.ay.z}}frameAt(e){let t=this.ringS.length,n=Math.min(t-1,Math.max(0,(e-mj)/this.ds)),r=Math.min(t-2,Math.floor(n)),i=r+1,a=n-r;this.fC.set(this.cx[r]+(this.cx[i]-this.cx[r])*a,this.cy[r]+(this.cy[i]-this.cy[r])*a,this.cz[r]+(this.cz[i]-this.cz[r])*a),this.fT.set(this.tx[r]+(this.tx[i]-this.tx[r])*a,this.ty[r]+(this.ty[i]-this.ty[r])*a,this.tz[r]+(this.tz[i]-this.tz[r])*a).normalize(),this.fS.set(this.sx[r]+(this.sx[i]-this.sx[r])*a,this.sy[r]+(this.sy[i]-this.sy[r])*a,this.sz[r]+(this.sz[i]-this.sz[r])*a).normalize(),this.fU.set(this.ux[r]+(this.ux[i]-this.ux[r])*a,this.uy[r]+(this.uy[i]-this.uy[r])*a,this.uz[r]+(this.uz[i]-this.uz[r])*a).normalize()}writeBody(e,t){let n=this.ringS.length,r=this.cosA.length,i=e.bodyPos,a=e.bodyNor,o=1+.02*Math.sin(t*1.6);for(let e=0;e<n;e++){let t=this.ringRx[e]*o,n=this.ringRy[e]*o,s=Math.max(.05,t),c=Math.max(.05,n);for(let o=0;o<r;o++){let l=this.cosA[o],u=this.sinA[o],d=(e*r+o)*3;i[d]=this.cx[e]+this.sx[e]*t*l+this.ux[e]*n*u,i[d+1]=this.cy[e]+this.sy[e]*t*l+this.uy[e]*n*u,i[d+2]=this.cz[e]+this.sz[e]*t*l+this.uz[e]*n*u;let f=l/s,p=u/c,m=this.sx[e]*f+this.ux[e]*p,h=this.sy[e]*f+this.uy[e]*p,g=this.sz[e]*f+this.uz[e]*p,_=Math.hypot(m,h,g)||1;m/=_,h/=_,g/=_,a[d]=m,a[d+1]=h,a[d+2]=g}}let s=e.body.geometry;s.getAttribute(`position`).needsUpdate=!0,s.getAttribute(`normal`).needsUpdate=!0}writeClouds(e,t){let n=this.cloudData,r=n.length/5;for(let i=0;i<r;i++){let r=i*5,a=n[r+4];this.frameAt(n[r]);let o=n[r+1]*(1+.04*Math.sin(t*1.3+a)),s=n[r+2]+.25*Math.sin(t*.9+a*1.7);this.p.copy(this.fC).addScaledVector(this.fS,o).addScaledVector(this.fU,s),this.s.setScalar(n[r+3]*(1+.05*Math.sin(t*1.2+a))),this.m4.compose(this.p,this.q.identity(),this.s),e.clouds.setMatrixAt(i,this.m4)}e.clouds.instanceMatrix.needsUpdate=!0}writeFlames(e,t){let n=this.spineData,r=n.length/3;for(let i=0;i<r;i++){let r=n[i*3];this.frameAt(r);let a=this.ringRyAt(r);this.p.copy(this.fC).addScaledVector(this.fU,a*.8),this.ax.copy(this.fU).addScaledVector(this.fT,.55).normalize(),this.q.setFromUnitVectors(Wj,this.ax);let o=1+.08*Math.sin(t*6+i*1.9);this.s.set(n[i*3+2],n[i*3+1]*o,n[i*3+2]),this.m4.compose(this.p,this.q,this.s),e.flames.setMatrixAt(i,this.m4)}let i=this.tuftData,a=i.length/4;this.frameAt(56.5);for(let n=0;n<a;n++){this.ax.copy(this.fT).addScaledVector(this.fS,i[n*4]).addScaledVector(this.fU,i[n*4+1]).normalize(),this.q.setFromUnitVectors(Wj,this.ax);let a=1+.1*Math.sin(t*5+n*2.3);this.s.set(i[n*4+3],i[n*4+2]*a,i[n*4+3]),this.m4.compose(this.fC,this.q,this.s),e.flames.setMatrixAt(r+n,this.m4)}e.flames.instanceMatrix.needsUpdate=!0}poseHead(e,t,n,r,i,a,o){let s=this.head;s.position.set(t,n,r);let c=Math.min(2,this.ringS.length-1);this.az.set(t-this.cx[c],n-this.cy[c],r-this.cz[c]),this.az.lengthSq()<1e-6&&this.az.set(0,0,-1),this.az.normalize(),this.az.y=Math.max(-.6,this.az.y-.22-.3*o),this.az.normalize().negate(),this.ax.crossVectors(Wj,this.az).normalize(),this.ay.crossVectors(this.az,this.ax),this.m4.makeBasis(this.ax,this.ay,this.az),s.quaternion.setFromRotationMatrix(this.m4),s.scale.setScalar(1+a*.6+o*.25),this.jawPivot.rotation.x=-(.3+.08*Math.sin(i*1.7)+.25*o);let l=this.maneData,u=l.length/10;for(let t=0;t<u;t++){let n=t*10;this.p.set(l[n],l[n+1],l[n+2]),this.q.set(l[n+3],l[n+4],l[n+5],l[n+6]);let r=l[n+8];this.s.set(r,l[n+7]*(1+.1*Math.sin(i*5+l[n+9])),r),this.m4.compose(this.p,this.q,this.s),e.mane.setMatrixAt(t,this.m4)}e.mane.instanceMatrix.needsUpdate=!0}setHeadOrder(e,t){e.skull.renderOrder=t,e.jaw.renderOrder=t,e.eyes.renderOrder=t,e.mane.renderOrder=t}beginCatch(){this.catching=!0;for(let e of this.headMats)e.transparent=!0,e.needsUpdate=!0;for(let e of this.bodyMats)e.transparent=!0,e.needsUpdate=!0;this.built!==null&&this.setHeadOrder(this.built,Oj)}endCatch(){if(!this.catching)return;this.catching=!1;for(let e of this.headMats)e.transparent=!1,e.needsUpdate=!0;for(let e of this.bodyMats)e.transparent=!1,e.opacity=1,e.needsUpdate=!0;let e=this.built;e!==null&&(this.setHeadOrder(e,0),e.body.visible=!0,e.clouds.visible=!0,e.flames.visible=!0)}get inCatch(){return this.catching}setCatch(e,t,n,r){let i=this.built;if(i===null)return;if(t<=0){this.endCatch();return}this.catching||this.beginCatch(),e.updateMatrixWorld();let a=ij(e.aspect,n,this.catchPoseScratch),o=a.cy;n>0&&(o+=Math.sin(r*1.6)*.01),this.ndcOnPlane(e,2*a.cx,2*o,this.target),this.ndcOnPlane(e,2*a.cx,2*o+a.h,this.pTop),this.ndcOnPlane(e,2*a.cx,2*o-a.h,this.pBot);let s=this.pTop.distanceTo(this.pBot);this.ndcOnPlane(e,0,1,this.pTop),this.ndcOnPlane(e,0,-1,this.pBot);let c=this.pTop.distanceTo(this.pBot),l=JA*s/qA,u=Math.min(l/uj,kj*c/dj),d=aj(t),f=Math.min(1,d),p=this.head;p.position.lerp(this.target,d),e.getWorldQuaternion(this.qCam).multiply(Gj),p.quaternion.slerp(this.qCam,f);let m=p.scale.x,h=m+(u-m)*d;p.scale.set(h,h,h*(1-Aj*f));let g=qj(1-t/.4);for(let e of this.bodyMats)e.opacity=g;let _=g>.01;i.body.visible=_,i.clouds.visible=_,i.flames.visible=_}ndcOnPlane(e,t,n,r){r.set(t,n,.5).applyMatrix4(e.projectionMatrixInverse),r.multiplyScalar(9/-r.z).applyMatrix4(e.matrixWorld)}headScreen(e,t){this.pTop.copy(this.head.position).project(e),t.x=.5+this.pTop.x/2,t.y=.5-this.pTop.y/2}dispose(){this.clearBuilt();for(let e of this.headMats)e.dispose();for(let e of this.bodyMats)e.dispose();this.cloudGeo.dispose(),this.coneGeo.dispose()}},lM=150,uM=6,dM=`#678a3c`,fM=`#7c8c42`,pM=`#857a50`,mM=`#43763a`,hM=`#3f5a33`,gM=`#3a5c35`;function _M(e,t){return(Math.imul((e+1)*7919,(t+3)*104729+17)>>>0)/4294967296}function vM(e,t){let n=Math.abs(e);if(n<=34)return 0;let r=n-34,i=.6+.4*Math.sin(t*2*Math.PI/108+(e>0?.7:2.1));return r*.22*i+r*r*.004}function yM(e,t,n,r,i){let a=Math.abs(e),o=n-nA(t),s=(Math.floor(t/9)%3+3)%3;r.set(dM),s===1&&r.lerp(new Y(fM),.7),a<14&&r.lerp(new Y(pM),.18*i);let c=Math.min(1,Math.max(0,(a-36)/40));r.lerp(new Y(mM),c*(.5+.5*i));let l=Math.min(1,Math.max(0,(o-18)/50));r.lerp(new Y(hM),l);let u=Math.min(1,Math.max(0,(o-55)/70));r.lerp(new Y(gM),u),r.multiplyScalar(.92+.14*i)}function bM(){let e=[];for(let t=-150;t<=150.000001;t+=t<-60||t>60?15:6)e.push(t);e.indexOf(-34)<0&&e.push(-34,34),e.sort((e,t)=>e-t);let t=[];for(let e=lM;e>=-300.000001;e-=uM)t.push(e);let n=e.length,r=t.length,i=[],a=[],o=[],s=new Y;for(let o=0;o<r;o++)for(let r=0;r<n;r++){let n=e[r],c=t[o],l=Math.round(108/uM),u=_M((o%l+l)%l,r),d=nA(c)+vM(n,c);i.push(n,d,c),yM(n,c,d,s,u),a.push(s.r,s.g,s.b)}for(let e=0;e+1<r;e++)for(let t=0;t+1<n;t++){let r=e*n+t,i=r+1,a=r+n,s=a+1;o.push(r,i,a,i,s,a)}let c=new ih;c.setAttribute(`position`,new X(i,3)),c.setAttribute(`color`,new X(a,3)),c.setIndex(o),c.computeVertexNormals();let l=new Z(c,new E_({vertexColors:!0}));return l.name=`decor_ground`,l}function xM(e){let t=new Pg(1.6,6,6);t.translate(0,3,0);let n=new $h(t,new E_({color:`#ffffff`}),e*6),r=new J,i=new op,a=new K,o=new K,s=new Y,c=0;for(let t=0;t<6;t++)for(let l=0;l<e;l++){let e=(l%2==0?-1:1)*(38+_M(l,11)*90),u=lM-t*108-_M(l,29)*108,d=.8+_M(l,41)*1.1;a.set(e,nA(u)+vM(e,u)-.3,u),o.set(d,d*(.9+_M(l,53)*.5),d),r.compose(a,i,o),n.setMatrixAt(c,r),s.set(_M(l,61)<.5?gM:hM).multiplyScalar(.85+_M(l,67)*.3),n.setColorAt(c,s),c++}return n.count=c,n.instanceMatrix.needsUpdate=!0,n.instanceColor!==null&&(n.instanceColor.needsUpdate=!0),n.frustumCulled=!1,n.name=`chase_trees`,n}var SM=class{group=new nm;strip;trees;k=0;constructor(e){this.group.name=`chase_endlessGround`,this.strip=bM(),this.trees=xM(e),this.group.add(this.strip,this.trees),this.snap(0,!0)}snap(e,t=!1){let n=Math.round(e/108);if(n===this.k&&!t)return;this.k=n;let r=n*108;this.group.position.set(0,Gk*r,r)}dispose(){this.strip.geometry.dispose(),this.strip.material.dispose(),this.trees.geometry.dispose(),this.trees.material.dispose(),this.trees.dispose()}};function CM(e,t=.55){if(!(e<t))return 0;let n=(t-Math.max(0,e))/t;return Math.min(1,n*n*.4+n*.6)}function wM(e,t,n,r=``){let i=document.createElement(t);return i.id=n,i.className=(`chase `+r).trim(),e.appendChild(i),i}var TM=class{cloud;vignette;iris;score;scoreText;distText;gap;over;overBody;scoreV=-1;distV=-1;gapPct=-1;danger=!1;cloudV=-1;vigV=-1;catching=!1;irisX=-1;irisY=-1;irisR=-1;irisO=-1;constructor(e,t){document.body.classList.add(`mode-chase`),this.cloud=wM(e,`div`,`chase-cloud`),this.vignette=wM(e,`div`,`chase-danger`),this.iris=wM(e,`div`,`chase-iris`),this.score=wM(e,`div`,`chase-score`),this.score.innerHTML=`<span class="score">0</span><span class="dist">0 m</span>`,this.scoreText=this.score.querySelector(`.score`),this.distText=this.score.querySelector(`.dist`),this.gap=wM(e,`div`,`chase-gap`),this.gap.innerHTML=`<i class="fill"></i><span class="lbl">DRAGON</span>`,this.over=wM(e,`div`,`chase-over`,`off`),this.over.innerHTML=`<h1>Swallowed by the cloud</h1><div class="big">0</div><p class="detail"></p><p class="best"></p><div class="row"><button type="button" class="retry">RETRY</button><button type="button" class="alt menu">MENU</button></div>`,this.overBody=this.over,this.over.querySelector(`.retry`).addEventListener(`click`,t),this.over.querySelector(`.menu`).addEventListener(`click`,()=>{window.dispatchEvent(new CustomEvent(`zt-menu`))})}setScore(e,t){let n=Math.floor(e);n!==this.scoreV&&(this.scoreV=n,this.scoreText.textContent=String(n));let r=Math.floor(t);r!==this.distV&&(this.distV=r,this.distText.textContent=r+` m`)}setGap(e){let t=Math.min(1,Math.max(0,e)),n=Math.round(t*100);n!==this.gapPct&&(this.gapPct=n,this.gap.style.setProperty(`--gap`,String(n/100)));let r=Math.round(CM(t)*50)/50;r!==this.vigV&&(this.vigV=r,this.vignette.style.opacity=String(r),this.vignette.classList.toggle(`pulse`,r>.6));let i=t<.3;i!==this.danger&&(this.danger=i,this.gap.classList.toggle(`danger`,i))}setCloud(e){if(this.catching)return;let t=Math.round(Math.min(1,Math.max(0,e))*100)/100;t!==this.cloudV&&(this.cloudV=t,this.cloud.style.opacity=String(t*.6))}setCatch(e,t,n,r){if(e<=0){if(!this.catching)return;this.catching=!1,document.body.classList.remove(`chase-catching`),this.iris.style.opacity=`0`,this.irisO=-1,this.cloudV=-1;return}this.catching||(this.catching=!0,document.body.classList.add(`chase-catching`),this.cloud.style.opacity=`0`);let i=this.iris.style,a=Math.round(n*1e3)/10,o=Math.round(r*1e3)/10,s=Math.round(oj(e)*1e3)/10,c=Math.round((1-Math.min(1,Math.max(0,t)))*100)/100;a!==this.irisX&&(this.irisX=a,i.setProperty(`--iris-x`,a+`%`)),o!==this.irisY&&(this.irisY=o,i.setProperty(`--iris-y`,o+`%`)),s!==this.irisR&&(this.irisR=s,i.setProperty(`--iris-r`,s+`vmin`)),c!==this.irisO&&(this.irisO=c,i.opacity=String(c))}showOver(e,t,n,r,i,a){this.overBody.querySelector(`h1`).textContent=a,this.overBody.querySelector(`.big`).textContent=String(Math.floor(e)),this.overBody.querySelector(`.detail`).textContent=Math.floor(t)+` m, `+n+` hops`,this.overBody.querySelector(`.best`).textContent=i?`New best!`:`Best `+Math.floor(r),this.over.classList.remove(`off`),document.body.classList.add(`chase-card`)}hideOver(){this.over.classList.add(`off`),document.body.classList.remove(`chase-card`)}get overVisible(){return!this.over.classList.contains(`off`)}destroy(){document.body.classList.remove(`mode-chase`,`chase-card`,`chase-catching`),this.cloud.remove(),this.vignette.remove(),this.iris.remove(),this.score.remove(),this.gap.remove(),this.over.remove()}},EM=24,DM=6,OM=.04,kM=12,AM=.045,jM=8,MM=.7,NM=.8,PM=`#3a2a22`,FM=`#ffc83a`,IM=.9,LM=20,RM=.04,zM=.012,BM=.12,VM=.35,HM=6,UM=11,WM=5e-4,GM=Math.PI*2,KM=.065,qM=`#3a2a22`,JM=[],YM=[];for(let e=0;e<=DM;e++){let t=e/DM*Math.PI*2;JM.push(Math.cos(t)),YM.push(Math.sin(t))}var XM=new Y;function ZM(e){for(let t=0;t<38;t++){let n=t>EM,r=n?t-EM-1:t,i=n?0:r/EM,a=i>NM?(i-NM)/.19999999999999996:0;for(let n=0;n<=DM;n++){Xw(r,n,a,XM);let i=(t*7+n)*3;e[i]=XM.r,e[i+1]=XM.g,e[i+2]=XM.b}}}var QM=class{group=new nm;line;tube;handle;halo;wheel;sagCur=RM;vibAmp=0;vibT=0;center;trailCenter;eye=new K;tubePos;tubeNrm;linePos;tubePosAttr;tubeNrmAttr;constructor(){this.center=new Float32Array(75),this.trailCenter=new Float32Array(39);let e=new ih;this.linePos=new Wm(this.center,3),e.setAttribute(`position`,this.linePos),this.line=new mg(e,new og({color:PM})),this.line.frustumCulled=!1,this.tubePos=new Float32Array(798),this.tubeNrm=new Float32Array(798);let t=new Float32Array(798);ZM(t);let n=new Uint16Array(1296),r=0;for(let e=0;e<36;e++){let t=e<EM?e:e+1;for(let e=0;e<DM;e++){let i=t*7+e,a=(t+1)*7+e,o=a+1,s=i+1;n[r++]=i,n[r++]=s,n[r++]=o,n[r++]=i,n[r++]=o,n[r++]=a}}let i=new ih;this.tubePosAttr=new Wm(this.tubePos,3),this.tubeNrmAttr=new Wm(this.tubeNrm,3),i.setAttribute(`position`,this.tubePosAttr),i.setAttribute(`normal`,this.tubeNrmAttr),i.setAttribute(`color`,new Wm(t,3)),i.setIndex(new Wm(n,1)),this.tube=new Z(i,new E_({vertexColors:!0})),this.tube.frustumCulled=!1,this.tube.onBeforeRender=(e,t,n)=>{this.eye.copy(n.position)},this.handle=new Z(new Ag(.28,.1,.1),new gh({color:FM})),this.wheel=new Z(new Ng(KM,KM,.035,6).rotateZ(Math.PI/2),new E_({color:qM,flatShading:!0})),this.wheel.position.set(0,.08,0),this.handle.add(this.wheel);let a=new Mg(IM,LM),o=a.getAttribute(`position`),s=new Float32Array(o.count*4);for(let e=0;e<o.count;e++){let t=e*4;s[t]=1,s[t+1]=1,s[t+2]=1;let n=o.getX(e),r=o.getY(e);s[t+3]=n*n+r*r<1e-6?.9:0}a.setAttribute(`color`,new Wm(s,4)),this.halo=new Z(a,new gh({color:Pw,vertexColors:!0,transparent:!0,blending:2,depthWrite:!1,fog:!1})),this.halo.frustumCulled=!1,this.halo.onBeforeRender=(e,t,n)=>{this.halo.quaternion.copy(n.quaternion),this.halo.updateMatrixWorld(!0)},this.group.add(this.line,this.tube,this.handle,this.halo),this.group.visible=!1}pulse(e){e>this.vibAmp&&(this.vibAmp=e),this.vibT=0}update(e,t,n,r,i,a){if(e.state===0){this.group.visible=!1,this.sagCur=RM,this.vibAmp=0,Kw.live=!1;return}this.group.visible=!0;let o=e.state===2;Kw.live=o&&Kw.set&&e.anchorId===Kw.anchorId;let s=e.ax,c=e.ay,l=e.az,u=zM;if(e.state===1){let a=e.len/i,o=a>0?Math.min(1,Math.max(0,1-e.flyT/a)):1;s=t+(e.ax-t)*o,c=n+(e.ay-n)*o,l=r+(e.az-r)*o,u=RM}this.sagCur+=(u-this.sagCur)*(1-Math.exp(-a/BM));let d=this.sagCur,f=s-t,p=c-n,m=l-r,h=Math.sqrt(f*f+p*p+m*m)*d;for(let e=0;e<=EM;e++){let i=e/EM,a=-4*h*i*(1-i);this.center[e*3]=t+f*i,this.center[e*3+1]=n+p*i+a,this.center[e*3+2]=r+m*i}if(o&&this.vibAmp>0){this.vibT+=a;let e=this.vibAmp*Math.exp(-this.vibT/VM);if(e<WM)this.vibAmp=0;else for(let t=1;t<EM;t++){let n=t/EM;this.center[t*3+1]+=e*(Math.sin(GM*HM*this.vibT)*Math.sin(Math.PI*n)+.4*Math.sin(GM*UM*this.vibT)*Math.sin(GM*n))}}else o||(this.vibAmp=0);let g=0;if(o){g=AM;let i=e.ox-e.dirX*jM,a=e.oy-e.dirY*jM,o=e.oz-e.dirZ*jM;Kw.live&&(Kw.x-e.ox)*e.dirX+(Kw.y-e.oy)*e.dirY+(Kw.z-e.oz)*e.dirZ<-1&&(i=Kw.x,a=Kw.y,o=Kw.z);let s=i-t,c=a-n,l=o-r,u=Math.sqrt(s*s+c*c+l*l)*zM;for(let e=0;e<=kM;e++){let i=e/kM;this.trailCenter[e*3]=t+s*i,this.trailCenter[e*3+1]=n+c*i-4*u*i*(1-i),this.trailCenter[e*3+2]=r+l*i}}else for(let e=0;e<=kM;e++)this.trailCenter[e*3]=t,this.trailCenter[e*3+1]=n,this.trailCenter[e*3+2]=r;(this.eye.x!==0||this.eye.y!==0||this.eye.z!==0)&&(this.pushFromEye(this.center,EM),o&&this.pushFromEye(this.trailCenter,kM)),this.linePos.needsUpdate=!0,this.writeRings(this.center,EM,0,OM),this.writeRings(this.trailCenter,kM,25,g),this.tubePosAttr.needsUpdate=!0,this.tubeNrmAttr.needsUpdate=!0,this.halo.position.set(s,c,l),this.handle.position.set(t,n+.05,r),this.handle.lookAt(s,c,l),this.wheel.rotation.x=-e.s/KM}pushFromEye(e,t){let n=this.eye.x,r=this.eye.y,i=this.eye.z;for(let a=0;a<=t;a++){let t=e[a*3]-n,o=e[a*3+1]-r,s=e[a*3+2]-i,c=Math.sqrt(t*t+o*o+s*s);if(c>=MM)continue;if(c<1e-6){e[a*3]=n+MM;continue}let l=MM/c;e[a*3]=n+t*l,e[a*3+1]=r+o*l,e[a*3+2]=i+s*l}}writeRings(e,t,n,r){for(let i=0;i<=t;i++){let a=i>0?i-1:0,o=i<t?i+1:t,s=e[o*3]-e[a*3],c=e[o*3+1]-e[a*3+1],l=e[o*3+2]-e[a*3+2],u=Math.sqrt(s*s+c*c+l*l);u<1e-6&&(s=0,c=-1,l=0,u=1),s/=u,c/=u,l/=u;let d=+(Math.abs(c)>.95),f=1-d,p=-l*f,m=l*d,h=s*f-c*d,g=Math.sqrt(p*p+m*m+h*h);g<1e-6&&(p=1,m=0,h=0,g=1),p/=g,m/=g,h/=g;let _=c*h-l*m,v=l*p-s*h,y=s*m-c*p,b=e[i*3],x=e[i*3+1],S=e[i*3+2],C=(n+i)*7;for(let e=0;e<=DM;e++){let t=JM[e],n=YM[e],i=t*p+n*_,a=t*m+n*v,o=t*h+n*y,s=(C+e)*3;this.tubePos[s]=b+i*r,this.tubePos[s+1]=x+a*r,this.tubePos[s+2]=S+o*r,this.tubeNrm[s]=i,this.tubeNrm[s+1]=a,this.tubeNrm[s+2]=o}}}dispose(){this.line.geometry.dispose(),this.tube.geometry.dispose(),this.handle.geometry.dispose(),this.wheel.geometry.dispose(),this.wheel.material.dispose(),this.halo.geometry.dispose()}};function $M(e){let t=(e-2)/9;return t<0?0:t>1?1:t}var eN=.1,tN=.35,nN=.2,rN=.11,iN=.002,aN=3,oN=5,sN=-2,cN=-4,lN=8,uN=4,dN=12,fN=.1,pN=.15,mN=.035,hN=.15,gN=23,_N=31,vN=1.3,yN=Math.PI*2;function bN(e,t,n){return e<t?t:e>n?n:e}var xN=class{offX=0;offY=0;fovAdd=0;kick=0;accS=0;prevSpeed=0;speedReady=0;amp=0;shakeT=0;update(e,t,n,r,i){let a=e<0?0:e>eN?eN:e;if(a===0)return;t&16&&(this.kick+=aN),t&4&&(this.kick+=oN),t&1&&(this.kick+=sN*$M(n)),this.kick=bN(this.kick,cN,lN),t&1&&$M(n)>=pN&&this.triggerShake(fN*$M(n)),t&16&&this.triggerShake(mN),t&64&&(i===2||i===3)&&this.triggerShake(hN),this.speedReady===0?(this.speedReady=1,this.prevSpeed=r,this.accS=0):(this.accS+=((r-this.prevSpeed)/a-this.accS)*(1-Math.exp(-a/nN)),this.prevSpeed=r);let o=bN(.5*this.accS,0,uN);this.fovAdd=bN(this.kick+o,cN,dN),this.kick*=Math.exp(-a/tN),this.shakeT+=a,this.amp*=Math.exp(-a/rN),this.offY=this.amp*Math.sin(yN*gN*this.shakeT),this.offX=.5*this.amp*Math.sin(yN*_N*this.shakeT+vN),this.amp<iN&&(this.amp=0,this.offX=0,this.offY=0,this.shakeT=0)}reset(){this.offX=0,this.offY=0,this.fovAdd=0,this.kick=0,this.accS=0,this.prevSpeed=0,this.speedReady=0,this.amp=0,this.shakeT=0}triggerShake(e){e>this.amp&&(this.amp=e),this.shakeT=0}},SN=.4,CN=2.2,wN=.55,TN=.03,EN=new f_(.25,.42,12,1);EN.rotateX(-Math.PI/2);var DN=class{mesh;material;age=SN;amount=0;baseY=0;constructor(){this.material=new gh({color:`#c9a27e`,transparent:!0,depthWrite:!1,opacity:0}),this.mesh=new Z(EN,this.material),this.mesh.visible=!1,this.mesh.frustumCulled=!1}trigger(e,t,n,r){this.age=0,this.amount=r<0?0:r>1?1:r,this.baseY=t,this.mesh.position.set(e,t+TN,n),this.mesh.scale.setScalar(1),this.material.opacity=wN*(.5+.5*this.amount),this.mesh.visible=!0}update(e){if(!this.mesh.visible)return;let t=e<0?0:e;this.age+=t;let n=this.age/SN;if(n>=1){this.hide();return}let r=1-n;this.mesh.scale.setScalar(1+CN*(1-r*r*r)),this.material.opacity=wN*(.5+.5*this.amount)*r*r,this.mesh.position.y=this.baseY+TN}hide(){this.age=SN,this.mesh.visible=!1,this.material.opacity=0,this.mesh.scale.setScalar(1)}},ON=class{acc=0;stepDt;maxSteps;constructor(e,t=5){if(!(e>0))throw RangeError(`stepDt must be > 0`);if(!(t>=1))throw RangeError(`maxSteps must be >= 1`);this.stepDt=e,this.maxSteps=t}get fixedStep(){return this.stepDt}feed(e){let t=Number.isFinite(e)&&e>0?e:0;this.acc+=t;let n=0;for(;this.acc>=this.stepDt&&n<this.maxSteps;)this.acc-=this.stepDt,n++;return this.acc>=this.stepDt&&(this.acc%=this.stepDt),n}get alpha(){return this.acc/this.stepDt}reset(){this.acc=0}},kN=class{accumulator;fixedHz;onStep;onRender;rafId=null;last=0;running=!1;paused=!1;constructor(e){if(!(e.fixedHz>0))throw RangeError(`fixedHz must be > 0`);this.fixedHz=e.fixedHz,this.onStep=e.onStep,this.onRender=e.onRender,this.accumulator=new ON(1/e.fixedHz,e.maxSteps)}start(){this.running||(this.running=!0,this.last=performance.now(),document.addEventListener(`visibilitychange`,this.handleVisibility),this.rafId=requestAnimationFrame(this.tick))}stop(){this.running&&(this.running=!1,this.paused=!1,this.cancelFrame(),document.removeEventListener(`visibilitychange`,this.handleVisibility))}pause(){this.running&&!this.paused&&(this.paused=!0,this.cancelFrame(),this.accumulator.reset())}resume(){this.running&&this.paused&&(this.paused=!1,this.last=performance.now(),this.rafId=requestAnimationFrame(this.tick))}cancelFrame(){this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null)}tick=e=>{if(!this.running||this.paused)return;let t=(e-this.last)/1e3;this.last=e;let n=this.accumulator.feed(t);for(let e=0;e<n;e++)this.onStep();this.onRender(this.accumulator.alpha,Number.isFinite(t)&&t>0?t:0),this.rafId=requestAnimationFrame(this.tick)};handleVisibility=()=>{document.hidden?(this.cancelFrame(),this.accumulator.reset()):this.running&&!this.paused&&(this.cancelFrame(),this.last=performance.now(),this.rafId=requestAnimationFrame(this.tick))}},AN=-.14,jN=Math.PI/180;function MN(e,t,n){return e+(t-e)*n}function NN(e){let t=Math.min(1,Math.max(0,(1-e)/.4));return t*t*(3-2*t)}function PN(e,t){if(e.aspect>=1)return{camera:t,lensShiftY:0};let n=NN(e.aspect),r=Math.max(.2,e.aspect),i=Math.min(88,Math.max(60,2*Math.atan(Math.tan(26*jN)/r)/jN)),a=MN(t.fov,Math.max(t.fov,i),n),o=Math.min(98,a+10);return{camera:{...t,fov:a,fovMax:MN(t.fovMax,o,n),dist:MN(t.dist,5.6,n),distSlide:MN(t.distSlide,8,n),height:MN(t.height,2.2,n),shoulder:MN(t.shoulder,0,n),downhillBias:MN(t.downhillBias,12,n)},lensShiftY:AN*n}}var FN=[`classic`,`chase`,`strategy`,`village`],IN=`zt.mode`,LN=`Aim at a glowing anchor and hook`,RN={classic:{label:`Classic`,hint:LN,hopChip:!0},chase:{label:`Dragon Chase`,hint:LN,hopChip:!0},strategy:{label:`Nagarkot Run`,hint:`Stand on a gold pad and press Hook`,hopChip:!1},village:{label:`Cloud Village`,hint:LN,hopChip:!0}},zN={classic:`bhagdori.best.l1`,chase:`bhagdori.best.chase`,strategy:`bhagdori.best.strategy`,village:`bhagdori.best.village`};function BN(){try{return typeof localStorage>`u`?void 0:localStorage}catch{return}}function VN(e){return e===`classic`||e===`chase`||e===`strategy`||e===`village`?e:null}function HN(e=BN(),t){let n=VN(t);if(n!==null)return n;try{return VN(e?.getItem(`zt.mode`))??`classic`}catch{return`classic`}}function UN(e,t=BN()){try{t?.setItem(IN,e)}catch{}}function WN(e,t=BN()){try{let n=t?.getItem(zN[e]);if(n==null)return 0;let r=Number(n);return Number.isFinite(r)&&r>0?r:0}catch{return 0}}function GN(e,t,n=BN()){try{n?.setItem(zN[e],String(t))}catch{}}function KN(e){let t=Math.max(0,e),n=Math.floor(t/60),r=t-n*60;return n+`:`+(r<10?`0`:``)+r.toFixed(1)}function qN(e,t){return e===`chase`?t>0?`Best score `+Math.floor(t):`No best score yet`:t>0?`Best time `+KN(t):`No best time yet`}function JN(e,t,n){let r=e/(t>0?t:1);return{w:e,h:t,aspect:r,orientation:r>=1?`landscape`:`portrait`,coarse:n}}function YN(){return JN(window.innerWidth,window.innerHeight,window.matchMedia(`(pointer: coarse)`).matches)}function XN(e){let t=YN(),n=0,r=0,i=()=>{n=0;let r=YN(),i=r.orientation!==t.orientation;t=r,e(r,i)},a=()=>{n===0&&(n=requestAnimationFrame(i))},o=()=>{a(),window.clearTimeout(r),r=window.setTimeout(a,250)};return window.addEventListener(`resize`,a),window.addEventListener(`orientationchange`,o),window.visualViewport?.addEventListener(`resize`,a),()=>{window.removeEventListener(`resize`,a),window.removeEventListener(`orientationchange`,o),window.visualViewport?.removeEventListener(`resize`,a),n!==0&&cancelAnimationFrame(n),window.clearTimeout(r)}}var ZN=.3,QN=.8,$N=2.5,eP=3.2,tP=1.1,nP=new Y(`#cdd0da`),rP=.9,iP={1:`Missed the roofs`,2:`Too low: hit the wall too fast. Hold BRAKE to slow down`,3:`Too hard a landing`,4:`Hit a hazard`,7:`The dragon caught you`};function aP(e){let t=e<0?0:e>1?1:e;return t*t*(3-2*t)}var oP=Math.PI/180;function sP(e){return Math.PI-e}function cP(){let t=e,r={...n};for(let e of Object.keys(r)){let n=r[e];typeof n==`object`&&n&&(r[e]={...n,...t[e]})}let i=e.fixedHz,a=r;return typeof i==`number`&&(a.fixedHz=i),a}function lP(e,t){e.pos.x=t.pos.x,e.pos.y=t.pos.y,e.pos.z=t.pos.z,e.lookAt.x=t.lookAt.x,e.lookAt.y=t.lookAt.y,e.lookAt.z=t.lookAt.z,e.focus.x=t.focus.x,e.focus.y=t.focus.y,e.focus.z=t.focus.z,e.arm=t.arm,e.yaw=t.yaw,e.pitch=t.pitch,e.fov=t.fov,e.initialized=t.initialized}function uP(e,n,r=`classic`,i){let o=cP(),s=o.camera,c=new URLSearchParams(location.search),l=Number(c.get(`tilt`)),u=c.has(`tilt`)&&Number.isFinite(l)?l:r===`village`?20:0,d=Math.min(Math.max(u,0),45)*oP,p=r===`chase`,m=r===`strategy`,h=r===`village`;if(h&&i===void 0)throw Error(`village assets not loaded`);let g=c.get(`seed`),_=g!==null&&Number.isFinite(Number(g)),v=_?Number(g)|0:Math.random()*2147483647|0,y=Number(c.get(`dragonGap`));p&&c.has(`dragonGap`)&&Number.isFinite(y)&&y>0&&(o.chase.startGap=y);let b=p?zA(v,0,o):null,x=b===null?m?Hs(Zl(_?Number(g)|0:Ac)):Vs(i!==void 0&&h?i.villageText:t):b.rw.world,S=hk(e),w=b===null?S.buildWorld(x,{houseDress:!0,floorY:i!==void 0&&h?i.VILLAGE_CLOUD_TOP_Y:void 0}):null;b!==null&&S.setBlobWorld(x);let T=p?new KA(()=>S.refreshFlags()):null,E=e=>e===`low`?8:e===`medium`?16:26,D=S.getTier(),O=p?new SM(E(D)):null,k=p?new cM(D):null;if(i!==void 0&&h){S.scene.add(i.buildCloudSea(D));let e=i.buildCloudBanks(x.solids,x.style);e!==null&&S.scene.add(e)}T!==null&&S.scene.add(T.root),O!==null&&S.scene.add(O.group),k!==null&&S.scene.add(k.group);let A=null;S.scene.traverse(e=>{A===null&&e instanceof vv&&(A=e)});let j={near:0,far:0,color:``},te=0,P=``,ne=0,re=!1,ie=0,ae=!1,ce=0,le={x:.5,y:.5},ue=new jw;S.scene.add(ue.group);let fe=new zk;S.scene.add(fe.group);let pe=Bk(),me=new K,ge=new QM;S.scene.add(ge.group);let _e=new Ik;S.scene.add(_e.group);let ve=new xN,ye=new DN;S.scene.add(ye.mesh);let be=new Gu,xe=0,Se=0,Ce=new URLSearchParams(location.search).has(`debug`),F=Ce&&new URLSearchParams(location.search).has(`catchHold`),I=Ce?new _k:null,we=oe(),L=oe(),R=de(),Te=window.matchMedia(`(pointer: coarse)`).matches,z=Te?new fu(n):new nu(e),B=new Ju,Ee=new Ju,De=new f(0,0,0),Oe=1/o.fixedHz,ke=new C,Ae=new it,je=1/o.aim.previewHz,Me=-1,Ne=-1,Pe=0,V=`pan`,Fe=0,Ie=!1,Le=0,Re=0,ze=0,Be=!1,Ve=!1,He=YN(),Ue=0,We=0,Ge=0,Ke=-1,qe=0,Je=-1,Ye=0,Xe=0,Ze=-1,Qe=0,$e=0,et=WN(r);function nt(){se(L,oe()),L.px=x.spawn.x,L.py=x.spawn.y,L.pz=x.spawn.z,L.yaw=x.spawnYaw,L.camYaw=x.spawnYaw,L.camPitch=o.camera.frontPitchDeg*oP,Ge=0,We=0,Ke=-1,qe=0,Je=-1,at.setHintActive(!1),L.grounded=1,L.mode=1,se(we,L)}function rt(){De.x=L.px,De.y=L.py,De.z=L.pz;let e=Math.sqrt(L.vx*L.vx+L.vz*L.vz);if(p){let t=o.chase.frontPov>=.5;$u(B,De,ad(L.camYaw,o.chase.frontPov),L.camPitch+(t?.14:0),e,x.solids,s);return}let t=sP(L.camYaw),n=L.vx*Math.cos(t)+L.vz*Math.sin(t),r=L.vx*Math.sin(t)-L.vz*Math.cos(t);Ge=nd(Ge,td(L.mode===3&&L.dead===0,n,r,s),s),We=id(We,L.mode===3||L.dead!==0?0:rd(n,s),s),$u(B,De,t+Ge+We,L.camPitch-d,e,x.solids,s)}let at=new Ck(n,Ce,()=>ct(),{hint:RN[r].hint,hopChip:RN[r].hopChip,onHint:m?null:st});d>0&&document.getElementById(`hud-reticle`)?.style.setProperty(`display`,`none`);let ot=p?new TM(n,()=>ct()):null;function st(){if(V!==`play`||x.lineOnly===1)return;let e=Ek(x,o,L.px,L.py,L.pz,ze,Te?o.aim.magnetDegTouch:o.aim.magnetDegDesktop);e===-1?at.toast(`No zipline in reach`):(Ke=e,qe=o.aim.hintSec,Je=e,at.setHintActive(!0))}function ct(){b!==null&&(_||(v=Math.random()*2147483647|0),b=zA(v,0,o),x=b.rw.world,S.setBlobWorld(x),T?.invalidate(),O?.snap(0,!0),re=!1,ae=!1,ne=0,ot?.hideOver()),nt(),V=`play`,Le=0,Re=0,ze=0,Be=!1,xe=0,Se=0,Me=-1,Ne=-1,at.setAimReason(``),ve.reset(),at.hideToast(),at.hideWin(),at.objectiveIn(),z instanceof fu&&z.reset(),B.initialized=0,rt(),lP(Ee,B)}function lt(){let e=Ce?performance.now():0;ut(),Ce&&($e+=performance.now()-e)}function ut(){if(se(we,L),z.sample(R),R.moveX=-R.moveX,V===`pan`)Fe+=Oe,(Ie||Fe>=(b===null?$N:eP))&&(V=`play`,Be=!1,at.objectiveIn());else if(V===`dead`){if(Le+=Oe,b!==null){if(!ae&&!F&&Le>=(L.deadCause===7?tP:.4)&&dt(),ae&&R.pressed&16){ct();return}}else{let e=Be||!!(R.pressed&16);if(Le>=QN||Le>=ZN&&e){ct();return}}}else if(V===`play`){if(z instanceof fu){let e=`jump`;L.mode===3?e=`brake`:L.mode===4&&L.hasLedge===1?e=`climb`:x.lineOnly===1&&L.grounded===1&&N(x,o,L.px,L.py,L.pz)>=0&&(e=`hook`),z.actionMode=e,at.setActionDim(L.mode===3),at.setActionLabel(e.toUpperCase())}Ke!==-1&&(qe-=Oe,(qe<=0||L.mode===3)&&(Ke=-1,at.setHintActive(!1))),mt(),ht(),Ze!==-1&&L.mode!==3&&(R.hasAim=1,R.aimYaw=he(Ye),R.aimPitch=he(Xe)),tt(L,R,x,o),(L.eventBits&1||L.mode===3)&&(Je=-1),b!==null&&WA(b,L,x,o),Re+=Oe;let e=L.eventBits;if(e&4&&(xe|=1,-we.vy>Se&&(Se=-we.vy)),e&2&&(xe|=4),e&1&&(xe|=8),e&64&&(xe|=128,at.pulseTimer()),e&16&&(xe|=32),e&32&&(xe|=64),we.mode!==3&&L.mode===3&&(xe|=16),we.grounded===1&&L.grounded===0&&L.mode===1&&L.vy>2&&!(e&2)&&(xe|=2),L.eventBits&1&&at.fadeHint(),b!==null)ze=OA(b.rw,b.heroRow);else if(L.mode===3){let e=x.route.indexOf(L.hook.anchorId);e>=0&&e+1>ze&&(ze=e+1,at.pulseTimer())}L.eventBits&32?(V=`dead`,Le=0,Be=!1,b===null&&at.toast(iP[L.deadCause]??`You fell`)):b===null&&L.dead===0&&x.goal.max.y>x.goal.min.y&&a(x.goal,L.px,L.py,L.pz)&&(V=`won`,(et===0||Re<et)&&(et=Re,GN(r,et)),at.showWin(Re,et),at.pulseTimer()),gt(),_t()}else Me=-1;lP(Ee,B),rt()}function dt(){if(b===null||ot===null)return;ae=!0,ce=Le;let e=BA(b,o),t=e>et;t&&(et=e,GN(`chase`,e)),ot.showOver(e,b.maxProgress,b.hops,et,t,iP[L.deadCause]??`You fell`)}function ft(e){let t=S.scene.fog;if(!(t instanceof um))return;let n=S.getTier();n!==P&&(P=n,j.near=t.near,j.far=t.far,j.color=`#`+t.color.getHexString(),te=A===null?0:A.intensity),t.near=j.near*(1-.92*e),t.far=j.far*(1-.85*e)+40*e,t.color.set(j.color).lerp(nP,e),A!==null&&(A.intensity=te*(1-.55*e)),ot?.setCloud(e)}function pt(){return x.lineOnly===1}function mt(){if(!(z instanceof fu)||!z.tapPending||(z.tapPending=!1,pt())||L.mode===3)return;let e=Xx(S.camera,x.anchors,z.tapNdcX,z.tapNdcY,S.camera.aspect,o.aim.tapRadiusNdc,L.px,L.py,L.pz,o.rope.maxLen*1.5);Je=e<0?-1:e}function ht(){if(pt()){Ze=-1,Ye=L.camYaw,Xe=L.camPitch;return}let e=Je;if(e===-1){let t=x.route[ze];e=t===void 0?-1:t}if(Ze=e,Ye=L.camYaw,Xe=L.camPitch,e===-1)return;let t=x.anchors[e];if(t===void 0){Ze=-1;return}let n=t.px-L.px,r=t.py-(L.py+o.hero.height*rP),i=t.pz-L.pz;Ye=Math.atan2(n,i),Xe=Math.atan2(r,Math.sqrt(n*n+i*i))}function gt(){if(Me=-1,V!==`play`||pt()||L.mode===3||L.hook.state!==0){at.setReticle(0),at.setAimReason(``);return}ht();let e=Math.cos(Xe);M(x,o,L.px,L.py+o.rope.handToFeet,L.pz,L.px,L.py+o.hero.height*rP,L.pz,Math.sin(Ye)*e,Math.sin(Xe),Math.cos(Ye)*e,o.rope.maxLen,Te?o.aim.magnetDegTouch:o.aim.magnetDegDesktop,ke),ke.anchorId===-1?at.setAimReason(Dk(ee(x,o,L.px,L.py+o.rope.handToFeet,L.pz,L.px,L.py+o.hero.height*rP,L.pz,Math.sin(Ye)*e,Math.sin(Xe),Math.cos(Ye)*e,o.rope.maxLen,Te?o.aim.magnetDegTouch:o.aim.magnetDegDesktop))):at.setAimReason(``),at.setReticle(ke.anchorId===-1?1:2),Me=ke.anchorId}function _t(){Me===-1||L.hookCd>0||L.dead===1?Ne=-1:(Pe+=Oe,(Me!==Ne||Pe>=je)&&(Pe=0,Ne=Me,Et(L,Ne,x,o,Ae)))}let vt=new f(46,18,-44),yt=new f(0,24,o.chase.startGap+34),bt=(x.goal.min.x+x.goal.max.x)/2,xt=(x.goal.min.y+x.goal.max.y)/2,St=(x.goal.min.z+x.goal.max.z)/2,Ct=x.goal.max.y>x.goal.min.y,wt=Ct?new f(bt+14,xt+16,St-16):new f(x.spawn.x+14,x.spawn.y+16,x.spawn.z-30);function Tt(e,t,n){let r=bt,i=xt,a=St,o=Ct,s=b===null?ze:0;if(Ke!==-1){let e=x.anchors[Ke];e!==void 0&&(r=e.px,i=e.py,a=e.pz,o=!0)}else if(s<x.route.length){let e=x.anchors[x.route[s]];e!==void 0&&(r=e.px,i=e.py,a=e.pz,o=!0)}let c=r-e,l=i-t,u=a-n,d=Math.sqrt(c*c+l*l+u*u),f=o&&V===`play`&&d>=3;if(fe.update(f,r,i,a,Uk(x.solids,r,i,a),performance.now()/1e3),!f){at.setWaypoint(!1,0,0,!1,0,``,!1);return}let p=S.camera;p.updateMatrixWorld(),me.set(r,i+2.2,a).applyMatrix4(p.matrixWorldInverse);let m=window.innerWidth,h=window.innerHeight,g=Wk(m,h,He.orientation===`portrait`);Vk(pe,me.x,me.y,me.z,Math.tan(p.fov*Math.PI/360),p.near,m,h,g,28,Ue),at.setWaypoint(!0,pe.x,pe.y,pe.edge,pe.angle,Hk(d),pe.x>m/2)}function Dt(e,t){let n=b;if(n===null||T===null||O===null||k===null)return;S.getTier()!==D&&(D=S.getTier(),k.setTier(D),S.scene.remove(O.group),O.dispose(),O=new SM(E(D)),S.scene.add(O.group),T.invalidate()),T.sync(n.rw),T.update(e,OA(n.rw,n.heroRow)),O.snap(ue.group.position.z);let r=n.dragon;k.update(r.z,e,+(V===`dead`&&L.deadCause===7),L.px,r.gap,S.camera.position.z,!1);let i=V===`pan`?0:FA(r.gap,o);ne=i,ft(ne);let a=ue.group.position.z;S.backdropRoot.position.set(0,Gk*a,a),!re&&r.gap<o.chase.fogGap&&V===`play`&&(re=!0,be.roar()),ie-=t,ie<=0&&V===`play`&&(ie=.35,be.wind(i));let s=BA(n,o);ot?.setScore(s,n.maxProgress),ot?.setGap((r.gap-o.chase.catchGap)/(o.chase.startGap-o.chase.catchGap))}function Ot(e,t){let n=Ce?performance.now():0,r=ue.input;r.brake=L.mode===3&&!!(R.buttons&8),r.rolling=L.rollT>0,r.events=xe,r.ropeLen=L.hook.len,r.impact=Se,r.win=+(V===`won`),r.hookFlying=+(L.hook.state===1),ue.update(we,L,e,t);let i=ue.group.position,a=i.x,s=i.y+o.rope.handToFeet,c=i.z,l=L.hook;if(l.state!==0){let e=l.ax-a,t=l.ay-s,n=l.az-c,i=Math.sqrt(e*e+t*t+n*n);i>1e-4&&(r.ropeDirX=e/i,r.ropeDirY=t/i,r.ropeDirZ=n/i)}else r.ropeDirX=0,r.ropeDirY=1,r.ropeDirZ=0;xe&1&&(Se>=3||L.rollT>0)&&ye.trigger(i.x,i.y,i.z,$M(Se)),xe&2&&ye.trigger(i.x,i.y,i.z,.2),xe&8&&be.fire(),xe&16&&be.attach(),xe&1&&be.land($M(Se)),xe&64&&be.die(),xe&64&&L.deadCause===3&&ye.trigger(i.x,i.y,i.z,1),ye.update(t),xe&16&&ge.pulse(.12*Math.min(1,Math.max(.4,L.hook.v/10))),r.brake&&!Ve&&ge.pulse(.05),Ve=r.brake,ge.update(l,a,s,c,o.rope.hookSpeed,t),ve.update(t,xe,Se,Math.sqrt(L.vx*L.vx+L.vz*L.vz),L.deadCause);let u=Ne!==-1&&V===`play`?x.anchors[Ne]:void 0;u!==void 0&&Ae.outcome!==0?_e.update(Ae.outcome,a,s,c,u.px,u.py,u.pz,Ae.x,Ae.y,Ae.z):_e.hide();let d=performance.now()/1e3;b!==null&&T!==null&&O!==null&&k!==null?Dt(d,t):w!==null&&(uO(w,d,ze,Ke),at.setTime(Re),at.setHop(ze,x.route.length),at.setAltitude(bk(L.py,x.spawn.y,Ct?xt:x.spawn.y))),V===`pan`&&(at.setReticle(0),at.setAimReason(``));let f=Ee.pos.x+(B.pos.x-Ee.pos.x)*e,p=Ee.pos.y+(B.pos.y-Ee.pos.y)*e,m=Ee.pos.z+(B.pos.z-Ee.pos.z)*e,h=Ee.lookAt.x+(B.lookAt.x-Ee.lookAt.x)*e,g=Ee.lookAt.y+(B.lookAt.y-Ee.lookAt.y)*e,_=Ee.lookAt.z+(B.lookAt.z-Ee.lookAt.z)*e,v=Ee.fov+(B.fov-Ee.fov)*e;if(V===`pan`){let t=aP((Fe+e*Oe)/(b===null?$N:eP)),n=b===null?wt:vt,r=b===null?x.spawn:yt;f=n.x+(f-n.x)*t,p=n.y+(p-n.y)*t,m=n.z+(m-n.z)*t,h=r.x+(h-r.x)*t,g=r.y+(g-r.y)*t,_=r.z+(_-r.z)*t}else if(b!==null&&V===`dead`&&L.deadCause===7){let t=aP((Le+e*Oe)/tP),n=b.dragon.z;f+=(L.px+7-f)*t,p+=(L.py+5-p)*t,m+=(L.pz-11-m)*t,h+=(0-h)*t,g+=(nA(n)+14-g)*t,_+=(n+6-_)*t}let y=v;if(V!==`pan`&&(f+=ve.offX,p+=ve.offY,g+=.5*ve.offY,y+=ve.fovAdd),S.camera.position.set(f,p,m),S.camera.lookAt(h,g,_),Math.abs(S.camera.fov-y)>.001&&y>0&&(S.camera.fov=y,S.camera.updateProjectionMatrix()),Tt(a,s-o.rope.handToFeet,c),z instanceof fu&&z.render(),Ce&&(Qe+=($e+(performance.now()-n)-Qe)*.1,$e=0),k!==null){if(V===`dead`&&L.deadCause===7){let t=Le+e*Oe,n=Math.min(1,Math.max(0,t/tP)),r=ae?Math.min(1,Math.max(0,(t-ce)/.35)):0;k.setCatch(S.camera,n,r,d),S.setBloomScale(n>0?0:1),k.headScreen(S.camera,le),ot?.setCatch(n,r,le.x,le.y)}else k.setCatch(S.camera,0,0,d),S.setBloomScale(1),ot?.setCatch(0,0,.5,.5)}if(S.render(),Ce){let e=b!==null&&T!==null?{rows:T.rebuilds,rebuildMs:T.lastRebuildMs,dragonGap:b.dragon.gap,heroRow:b.heroRow,newest:b.rw.newest,score:BA(b,o),cloud:ne}:{};window.__ztStats={...S.frameStats(),jsMs:Qe,...e}}let C=S.renderer.info.render;I?.update(L,C.calls,C.triangles),xe=0,Se=0}let kt=()=>{be.unlock(),Be=!0,V===`pan`&&(Ie=!0)},At=e=>{e.code===`KeyH`&&!e.repeat&&!m&&st()};window.addEventListener(`keydown`,At),window.addEventListener(`keydown`,kt,!0),window.addEventListener(`pointerdown`,kt,!0);let jt=()=>{be.unlock()};window.addEventListener(`pointerup`,jt,!0),nt(),rt(),lP(Ee,B);let Mt=new kN({fixedHz:o.fixedHz,onStep:lt,onRender:Ot});Mt.start();let Nt=(e,t)=>{He=e,S.resize();let n=PN(e,o.camera);s=n.camera,S.setLensShift(n.lensShiftY),Ue=-n.lensShiftY*e.h,document.documentElement.style.setProperty(`--lens-shift`,String(n.lensShiftY)),t&&z instanceof fu&&z.reset()};Nt(He,!1);let Pt=XN(Nt);return{mode:r,pause(){Mt.pause(),z instanceof fu&&z.reset()},resume(){Mt.resume()},restart:ct,destroy(){Mt.stop(),Pt(),window.removeEventListener(`keydown`,At),window.removeEventListener(`keydown`,kt,!0),window.removeEventListener(`pointerdown`,kt,!0),window.removeEventListener(`pointerup`,jt,!0),z.dispose(),at.destroy(),ot?.destroy(),T!==null&&(S.scene.remove(T.root),T.dispose()),O!==null&&(S.scene.remove(O.group),O.dispose()),k!==null&&(S.scene.remove(k.group),k.dispose(),S.setBloomScale(1)),ge.dispose(),_e.dispose(),be.dispose(),fe.dispose(),S.scene.remove(fe.group),S.scene.remove(ue.group),S.scene.remove(ge.group),S.scene.remove(_e.group),S.scene.remove(ye.mesh),S.dispose()}}}var dP=`<svg id="lobby-art" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
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
</svg>`;function fP(e,t){let n=document.createElement(`div`);n.id=`lobby`,n.innerHTML=dP+`<div class="head"><h1>Bhaaag</h1><p class="tag">Slide the Kathmandu rooftops at sunset</p></div><div class="mid"><div id="lobby-mode" role="radiogroup" aria-label="Game mode">`+FN.map(e=>`<button type="button" role="radio" data-mode="${e}">${RN[e].label}</button>`).join(``)+`</div><button id="lobby-play" type="button">PLAY</button><p id="lobby-best"></p><div id="lobby-gfx" role="radiogroup" aria-label="Graphics quality"><span class="lbl">Graphics</span>`+XO.map(e=>`<button type="button" role="radio" data-tier="${e}" title="${$O[e].desc}">${$O[e].label}</button>`).join(``)+`</div><p id="lobby-gfx-desc"></p></div><div class="how"><div class="desk"><b>Move</b> <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></div><div class="desk"><b>Hook</b> <kbd>E</kbd> or click</div><div class="desk"><b>Brake</b> hold <kbd>R</kbd></div><div class="desk"><b>Climb</b> hold <kbd>F</kbd> at a ledge</div><div class="desk"><b>Jump</b> <kbd>Space</kbd></div><div class="desk"><b>Menu</b> <kbd>Esc</kbd></div><div class="touch-only"><b>Move</b> left thumb</div><div class="touch-only"><b>Aim</b> tap an anchor</div><div class="touch-only"><b>JUMP</b> big button, double tap = Hook</div><div class="touch-only"><b>BRAKE / CLIMB</b> hold the button</div><div class="hint">Portrait or landscape, both work</div></div>`,e.appendChild(n);let r=n.querySelector(`#lobby-play`),i=n.querySelector(`#lobby-best`);if(r===null||i===null)throw Error(`lobby markup`);let a=r,o=i,s=n.querySelector(`#lobby-gfx-desc`),c=n.querySelectorAll(`#lobby-gfx button`);function l(e){for(let t of c)t.setAttribute(`aria-checked`,String(t.dataset.tier===e));s!==null&&(s.textContent=$O[e].desc)}for(let e of c)e.addEventListener(`click`,()=>{let t=XO.find(t=>t===e.dataset.tier);t!==void 0&&(sk(t),l(t))});l(ak());let u=n.querySelectorAll(`#lobby-mode button`),d=HN(void 0,new URLSearchParams(location.search).get(`mode`));function f(){for(let e of u)e.setAttribute(`aria-checked`,String(e.dataset.mode===d));o.textContent=t.getBestLabel(d)}for(let e of u)e.addEventListener(`click`,()=>{let t=FN.find(t=>t===e.dataset.mode);t!==void 0&&(d=t,UN(t),f())});let p=document.createElement(`button`);p.id=`menu-btn`,p.type=`button`,p.className=`off`,p.textContent=`MENU`,p.setAttribute(`aria-label`,`Back to lobby`),e.appendChild(p);let m=!0,h=!1;function g(){m=!0,f(),a.textContent=h?`RESUME`:`PLAY`,n.classList.remove(`off`),p.classList.add(`off`),a.focus({preventScroll:!0})}function _(){m=!1,h=!0,n.classList.add(`off`),p.classList.remove(`off`)}return a.addEventListener(`click`,()=>{t.onPlay(d)}),p.addEventListener(`click`,()=>{t.onMenu()}),window.addEventListener(`keydown`,e=>{e.key===`Escape`&&!m&&t.onMenu()}),f(),g(),{show:g,hide:_,visible:()=>m}}var pP=document.getElementById(`game`);if(!(pP instanceof HTMLCanvasElement))throw Error(`canvas#game not found`);function mP(){if(window.matchMedia(`(pointer: coarse)`).matches)try{document.documentElement.requestFullscreen?.().catch(()=>void 0)}catch{}}var hP=null,gP=!1,_P=fP(document.body,{getBestLabel:e=>qN(e,WN(e)),onPlay:e=>{_P.hide(),mP(),hP!==null&&hP.mode!==e&&(hP.destroy(),hP=null),hP===null?e===`village`?gP||(gP=!0,gO(async()=>{let{village:e}=await import(`./villageAssets-mm4NJU6R.js`);return{village:e}},[]).then(({village:t})=>{hP===null&&(hP=uP(pP,document.body,e,t))}).finally(()=>{gP=!1})):hP=uP(pP,document.body,e):hP.resume()},onMenu:()=>{hP?.pause(),_P.show()}});window.addEventListener(`zt-menu`,()=>{hP?.pause(),_P.show()});export{C_ as C,G as D,b_ as E,K as O,Nf as S,Cv as T,E_ as _,Wm as a,op as b,pp as c,nm as d,Cd as f,gh as g,Z as h,RT as i,Ep as k,If as l,J as m,kO as n,ih as o,$h as p,xT as r,Y as s,SO as t,X as u,gv as v,p_ as w,w_ as x,d_ as y};