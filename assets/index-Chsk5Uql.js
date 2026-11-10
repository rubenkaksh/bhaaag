const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/EffectComposer-tmyrUQPc.js","assets/CopyShader-CHGAmNbz.js","assets/Pass-DevnmWLu.js","assets/RenderPass-CDiqGRyp.js","assets/UnrealBloomPass-BLwA-vgU.js","assets/OutputPass-BmzZxOPl.js"])))=>i.map(i=>d[i]);
(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={physics:{g:9.81,airDrag:.05,killPlaneBelowMin:5},rope:{gravityFactor:1,drag:.05,terminal:20,launchSpeed:3,minLen:4,maxLen:35,minSlopeDeg:10,maxSlopeDeg:55,trolleyStop:.6,handToFeet:2,hookSpeed:320,brakeDecel:10},aim:{magnetDegDesktop:4,magnetDegTouch:6,routeAssistDeg:16,routeAssistLateDeg:10,routeAssistEarlyHops:2,snapRadius:1.2,previewHz:15,previewMaxSec:8,previewReleaseSamples:12},release:{inputBufferMs:100,coyoteMs:120,jumpUp:5,jumpFwd:2,carry:1,hookCooldownSec:.15,hookIntentSec:.5,perfectLo:.7,perfectHi:1,perfectBoost:2,perfectUp:2},landing:{vyClean:7,vyRoll:13,skidDecel:7,vhStumble:16,pad:.5,carryCap:12,rollSec:.35,chainWindowMs:400,edgeGrabH:.6,edgeGrabBelowMin:.2,edgeGrabBelowMax:1.4,edgeGrabVyMax:9},wall:{vCling:7.5},roof:{slipDeg:15,mu:.2,control:.3,uphillRun:.4},hero:{walk:3.5,run:6,radius:.35,stepUp:.4,jump:4.5,height:1.8,accel:40,friction:30},camera:{dist:4.5,distSlide:6.5,fov:60,fovMax:75,shoulder:.6,pitchMin:-60,pitchMax:50,height:1.6,probeRadius:.25,smooth:.25,armRelease:.05,downhillBias:8,fovSpeed:20},validator:{minReleaseWindowTicks:12,minAimBand:.4,aimSamples:6,releaseStride:3},assist:{slowmoScale:.35,slowmoSec:.4},fixedHz:60,chase:{startGap:36,v0:4.4,accel:.045,vMax:13.5,gapMax:45,rubberK:.4,catchGap:2.5,fogGap:22,slots:6,scoreHop:25,scoreClean:10,scorePerfect:10}},t=`{
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
`,n={physics:{g:9.81,airDrag:.05,killPlaneBelowMin:5},rope:{gravityFactor:1,drag:.05,terminal:20,launchSpeed:3,minLen:4,maxLen:35,minSlopeDeg:10,maxSlopeDeg:55,trolleyStop:.6,handToFeet:2,hookSpeed:320,brakeDecel:10},aim:{magnetDegDesktop:4,magnetDegTouch:6,routeAssistDeg:16,routeAssistLateDeg:10,routeAssistEarlyHops:2,snapRadius:1.2,previewHz:15,previewMaxSec:8,previewReleaseSamples:12},release:{inputBufferMs:100,coyoteMs:120,jumpUp:5,jumpFwd:2,carry:1,hookCooldownSec:.15,hookIntentSec:.5,perfectLo:.7,perfectHi:1,perfectBoost:2,perfectUp:2},landing:{vyClean:7,vyRoll:13,skidDecel:7,vhStumble:16,pad:.5,carryCap:12,rollSec:.35,chainWindowMs:400,edgeGrabH:.6,edgeGrabBelowMin:.2,edgeGrabBelowMax:1.4,edgeGrabVyMax:9},wall:{vCling:7.5},roof:{slipDeg:15,mu:.2,control:.3,uphillRun:.4},hero:{walk:3.5,run:6,radius:.35,stepUp:.4,jump:4.5,height:1.8,accel:40,friction:30},camera:{dist:4.5,distSlide:6.5,fov:60,fovMax:75,shoulder:.6,pitchMin:-60,pitchMax:50,height:1.6,probeRadius:.25,smooth:.25,armRelease:.05,downhillBias:8,fovSpeed:20},validator:{minReleaseWindowTicks:12,minAimBand:.4,aimSamples:6,releaseStride:3},assist:{slowmoScale:.35,slowmoSec:.4},fixedHz:60,chase:{startGap:36,v0:4.4,accel:.045,vMax:13.5,gapMax:45,rubberK:.4,catchGap:2.5,fogGap:22,slots:6,scoreHop:25,scoreClean:10,scorePerfect:10}},r=class{min;max;constructor(e,t){this.min=e,this.max=t}},i=class{hit;t;nx;ny;nz;constructor(){this.hit=!1,this.t=0,this.nx=0,this.ny=0,this.nz=0}};function a(e,t,n,r){return t>=e.min.x&&t<=e.max.x&&n>=e.min.y&&n<=e.max.y&&r>=e.min.z&&r<=e.max.z}function o(e,t,n){return e<t?t:e>n?n:e}function s(e,t,n,r){let i=t-o(t,e.min.x,e.max.x),a=n-o(n,e.min.z,e.max.z);return i*i+a*a<=r*r}function c(e){e.hit=!1,e.t=1,e.nx=0,e.ny=0,e.nz=0}function l(e,t,n,r,i,a,o,s,l,u,d,f,p,m){let h=-1/0,g=1/0,_=-1,v=0;for(let y=0;y<3;y++){let b=e,x=r,S=o,C=u;if(y===1?(b=t,x=i,S=s,C=d):y===2&&(b=n,x=a,S=l,C=f),Math.abs(x)<1e-9){if(p?b<=S||b>=C:b<S||b>C){c(m);return}}else{let e=(S-b)/x,t=(C-b)/x,n=-1;if(e>t){let r=e;e=t,t=r,n=1}e>h&&(h=e,_=y,v=n),t<g&&(g=t)}}(p?h>=g||g<=0:h>g||g<0)||h>1||_<0?c(m):(m.hit=!0,m.t=h<=0?0:h,m.nx=_===0?v:0,m.ny=_===1?v:0,m.nz=_===2?v:0)}function u(e,t,n,r){a(n,e.x,e.y,e.z)?(r.hit=!0,r.t=0,r.nx=0,r.ny=0,r.nz=0):l(e.x,e.y,e.z,t.x-e.x,t.y-e.y,t.z-e.z,n.min.x,n.min.y,n.min.z,n.max.x,n.max.y,n.max.z,!1,r)}function d(e,t,n,r,i,a){let o=i.min.x-n,s=i.max.x+n,c=i.min.y-t,u=i.max.y,d=i.min.z-n,f=i.max.z+n,p=e.x,m=e.y,h=e.z;if(p>o&&p<s&&m>c&&m<u&&h>d&&h<f){let e=p-o,t=-1,n=0,r=0,i=s-p;i<e&&(e=i,t=1),i=m-c,i<e&&(e=i,t=0,n=-1),i=u-m,i<e&&(e=i,t=0,n=1),i=h-d,i<e&&(e=i,t=0,n=0,r=-1),i=f-h,i<e&&(t=0,n=0,r=1),a.hit=!0,a.t=0,a.nx=t,a.ny=n,a.nz=r}else l(p,m,h,r.x,r.y,r.z,o,c,d,s,u,f,!0,a)}var f=class{x;y;z;constructor(e,t,n){this.x=e,this.y=t,this.z=n}};function p(e,t,n,r){e.x=t,e.y=n,e.z=r}var m=Math.PI/180,h=180/Math.PI,g=1e-4,_=.05,v=class{state=0;anchorId=-1;ax=0;ay=0;az=0;ox=0;oy=0;oz=0;dirX=0;dirY=0;dirZ=0;slopeSin=0;len=0;s=0;v=0;flyT=0;handToFeet=0};function y(){return new v}function b(e){e.state=0,e.anchorId=-1,e.ax=0,e.ay=0,e.az=0,e.ox=0,e.oy=0,e.oz=0,e.dirX=0,e.dirY=0,e.dirZ=0,e.slopeSin=0,e.len=0,e.s=0,e.v=0,e.flyT=0,e.handToFeet=0}function x(e,t){e.state=t.state,e.anchorId=t.anchorId,e.ax=t.ax,e.ay=t.ay,e.az=t.az,e.ox=t.ox,e.oy=t.oy,e.oz=t.oz,e.dirX=t.dirX,e.dirY=t.dirY,e.dirZ=t.dirZ,e.slopeSin=t.slopeSin,e.len=t.len,e.s=t.s,e.v=t.v,e.flyT=t.flyT,e.handToFeet=t.handToFeet}function S(e,t,n,r){let i=e.ax-t,a=e.ay-n,o=e.az-r,s=Math.sqrt(i*i+a*a+o*o);if(s<=g)return;let c=1/s;e.ox=t,e.oy=n,e.oz=r,e.dirX=i*c,e.dirY=a*c,e.dirZ=o*c,e.slopeSin=-e.dirY,e.len=s,e.s=0}var C=class{anchorId=-1;dist=0;angleDeg=0},w=new f(0,0,0),T=new f(0,0,0),E=new i,D=[],O=[],k=new C;function A(e,t,n,r,i,a,o,s,c,l,d){let f=_<s*.25?_:s*.25;if(s-f*2<=0)return!1;p(w,t+c*f,n+l*f,r+d*f),p(T,i-c*f,a-l*f,o-d*f);let m=e.solids;for(let e=0;e<m.length;e++)if(u(w,T,m[e],E),E.hit)return!0;return!1}function j(e,t,n,r,i,a,o,s,c,l,u,d,f,p,_=null){p.anchorId=-1,p.dist=0,p.angleDeg=0;let v=Math.sqrt(c*c+l*l+u*u);if(v<=g)return;let y=1/v,b=c*y,x=l*y,S=u*y,C=t.rope,w=Math.sin(C.minSlopeDeg*m),T=Math.sin(C.maxSlopeDeg*m),E=Math.cos(f*m),D=e.anchors,O=-1,k=E,j=0,M=_===null?D.length:_.length;for(let t=0;t<M;t++){let c=_===null?D[t]:D[_[t]];if(c===void 0)continue;let l=c.px-a,u=c.py-o,f=c.pz-s,p=Math.sqrt(l*l+u*u+f*f);if(p<=g)continue;let m=1/p,h=(l*b+u*x+f*S)*m;if(!(h>k))continue;let v=c.px-n,y=c.py-r,E=c.pz-i,M=Math.sqrt(v*v+y*y+E*E);if(M<C.minLen||M>d)continue;let N=-y/M;N<w||N>T||A(e,n,r,i,c.px,c.py,c.pz,M,v/M,y/M,E/M)||(k=h,O=c.id,j=M)}O!==-1&&(p.anchorId=O,p.dist=j,p.angleDeg=Math.acos(k>1?1:k)*h)}function M(e,t,n,r,i,a,o,s,c,l,u,d,f,p){let m=t.aim,h=e.route;D.length=0,O.length=0;for(let e=0;e<h.length;e++)e<m.routeAssistEarlyHops?D.push(h[e]):O.push(h[e]);let g=!1;m.routeAssistDeg>f&&(j(e,t,n,r,i,a,o,s,c,l,u,d,m.routeAssistDeg,p,D),g=p.anchorId!==-1),m.routeAssistLateDeg>f&&(j(e,t,n,r,i,a,o,s,c,l,u,d,m.routeAssistLateDeg,k,O),k.anchorId!==-1&&((!g||k.angleDeg<p.angleDeg)&&(p.anchorId=k.anchorId,p.dist=k.dist,p.angleDeg=k.angleDeg),g=!0)),g||j(e,t,n,r,i,a,o,s,c,l,u,d,f,p)}function N(e,t,n,r,i,a,o,s,c,l,u,d,f){let p=Math.sqrt(c*c+l*l+u*u);if(p<=g)return 1;let h=1/p,_=c*h,v=l*h,y=u*h,b=t.rope,x=Math.sin(b.minSlopeDeg*m),S=Math.sin(b.maxSlopeDeg*m),C=Math.cos(f*m),w=t.aim.routeAssistDeg>f?Math.cos(t.aim.routeAssistDeg*m):C,T=t.aim.routeAssistLateDeg>f?Math.cos(t.aim.routeAssistLateDeg*m):C,E=t.aim.routeAssistEarlyHops,D=e.route,O=e.anchors,k=null,j=0;for(let e=0;e<O.length;e++){let t=O[e];if(t===void 0)continue;let n=-1;for(let e=0;e<D.length;e++)if(D[e]===t.id){n=e;break}let r=C;n>=0&&(r=n<E?w:T);let i=t.px-a,c=t.py-o,l=t.pz-s,u=Math.sqrt(i*i+c*c+l*l);if(u<=g)continue;let d=1/u,f=(i*_+c*v+l*y)*d;f>r&&(k===null||f>j)&&(k=t,j=f)}if(k===null)return 1;let M=k.px-n,N=k.py-r,ee=k.pz-i,te=Math.sqrt(M*M+N*N+ee*ee);if(te<b.minLen)return 2;if(te>d)return 3;let P=-N/te;return P<=0?4:P<x?5:P>S?6:A(e,n,r,i,k.px,k.py,k.pz,te,M/te,N/te,ee/te)?7:0}function ee(e,t,n,r,i,a,o,s){if(b(e),t<0||t>=a.anchors.length)return!1;let c=a.anchors[t],l=c.px-n,u=c.py-r,d=c.pz-i,f=Math.sqrt(l*l+u*u+d*d);if(f<=g)return!1;let p=1/f;e.anchorId=c.id,e.ax=c.px,e.ay=c.py,e.az=c.pz,e.ox=n,e.oy=r,e.oz=i,e.dirX=l*p,e.dirY=u*p,e.dirZ=d*p,e.slopeSin=-e.dirY,e.len=f,e.handToFeet=o.rope.handToFeet;let m=o.rope.launchSpeed>s?o.rope.launchSpeed:s;return m>o.rope.terminal&&(m=o.rope.terminal),m<0&&(m=0),e.v=m,e.flyT=f/o.rope.hookSpeed,e.state=1,!0}function te(e,t,n,r,i){if(e.state===1)return e.flyT-=t,e.flyT<=0&&(e.flyT=0,e.state=2),e.state;if(e.state!==2)return e.state;let a=r.rope,o=r.physics.g*a.gravityFactor*e.slopeSin-a.drag*e.v;i&&(o-=a.brakeDecel);let s=e.v+o*t;s>a.terminal&&(s=a.terminal),s<0&&(s=0),e.v=s,e.s+=s*t;let c=e.len-a.trolleyStop;return e.s>=c&&(e.s=c,e.state=3),e.state}function P(e,t){e.state===0?p(t,0,0,0):(t.x=e.ox+e.dirX*e.s,t.y=e.oy+e.dirY*e.s-e.handToFeet,t.z=e.oz+e.dirZ*e.s)}function ne(e,t){let n=e.state===2||e.state===3,r=n?e.dirX*e.v:0,i=n?e.dirY*e.v:0,a=n?e.dirZ*e.v:0;b(e),t.x=r,t.y=i,t.z=a}var re=class{px=0;py=0;pz=0;vx=0;vy=0;vz=0;yaw=0;camYaw=0;camPitch=0;grounded=0;dead=0;mode=1;hook=y();rollT=0;landLockT=0;chainT=0;deadCause=0;eventBits=0;hookCd=0;hookIntentT=0;runOut=0;launchY=0;perfect=0};function ie(){return new re}function ae(e,t){e.px=t.px,e.py=t.py,e.pz=t.pz,e.vx=t.vx,e.vy=t.vy,e.vz=t.vz,e.yaw=t.yaw,e.camYaw=t.camYaw,e.camPitch=t.camPitch,e.grounded=t.grounded,e.dead=t.dead,e.mode=t.mode,x(e.hook,t.hook),e.rollT=t.rollT,e.landLockT=t.landLockT,e.chainT=t.chainT,e.deadCause=t.deadCause,e.eventBits=t.eventBits,e.hookCd=t.hookCd,e.hookIntentT=t.hookIntentT,e.runOut=t.runOut,e.launchY=t.launchY,e.perfect=t.perfect}var oe=32767,se=4096,ce=class{moveX=0;moveY=0;lookYaw=0;lookPitch=0;aimYaw=0;aimPitch=0;hasAim=0;buttons=0;pressed=0};function le(){return new ce}function ue(e){e.moveX=0,e.moveY=0,e.lookYaw=0,e.lookPitch=0,e.aimYaw=0,e.aimPitch=0,e.hasAim=0,e.buttons=0,e.pressed=0}function F(e){let t=e;return t>1&&(t=1),t<-1&&(t=-1),Math.round(t*oe)}function de(e){return e/oe}function fe(e){return Math.round(e*se/(Math.PI*2))}function pe(e){return e*Math.PI*2/se}function me(e,t){return(e.buttons&t)!==0}function I(e,t){return(e.pressed&t)!==0}var he=1e-4,ge=Math.PI/180,_e=.1,ve=-1e30,ye=new f(0,0,0),be=new f(0,0,0),L=new i,R=new C,xe=new f(0,0,0),Se=new f(0,0,0),Ce=.9,z=2*he,we=.1,B=.05,V=-1,Te=0,Ee=0,De=0,Oe=1,ke=0;function Ae(e,t,n,r,i,a,o,s){ye.x=t,ye.y=n,ye.z=r,be.x=o===0?s:0,be.y=o===1?s:0,be.z=o===2?s:0;let c=1,l=!1,u=0,f=0,p=0;for(let t=0;t<e.solids.length;t++)if(d(ye,i,a,be,e.solids[t],L),L.hit){if(L.t===0){let e=L.nx===0&&L.ny===0&&L.nz===0,t=L.nx*be.x+L.ny*be.y+L.nz*be.z>=0;if(e||t)continue}L.t<c&&(c=L.t,l=!0,u=L.nx,f=L.ny,p=L.nz)}if(L.hit=l,L.nx=u,L.ny=f,L.nz=p,!l)return s;let m=c*Math.abs(s)-he;return m<=0?0:s<0?-m:m}function je(e,t,n,r,i,a,o,s,c){ye.x=t,ye.y=n,ye.z=r,be.x=o,be.y=s,be.z=c;let l=1,u=!1,f=0,p=0,m=0;for(let t=0;t<e.solids.length;t++)if(d(ye,i,a,be,e.solids[t],L),L.hit){if(L.t===0){let e=L.nx===0&&L.ny===0&&L.nz===0,t=L.nx*o+L.ny*s+L.nz*c>=0;if(e||t)continue}L.t<l&&(l=L.t,u=!0,f=L.nx,p=L.ny,m=L.nz)}if(L.hit=u,L.nx=f,L.ny=p,L.nz=m,!u)return 1;let h=Math.sqrt(o*o+s*s+c*c),g=l*h-he;return g<=0?0:g/h}function Me(e,t,n,r){let i=e.ramps[t],a=i.aabb;if(n<a.min.x||n>a.max.x||r<a.min.z||r>a.max.z)return ve;let o;return o=i.slopeAxis===0?(n-a.min.x)/(a.max.x-a.min.x):i.slopeAxis===1?(a.max.x-n)/(a.max.x-a.min.x):i.slopeAxis===2?(r-a.min.z)/(a.max.z-a.min.z):(a.max.z-r)/(a.max.z-a.min.z),a.min.y+i.rise*o}function Ne(e,t){let n=e.ramps[t],r=n.aabb;Te=0,Ee=0;let i;n.slopeAxis===0?(Te=1,i=r.max.x-r.min.x):n.slopeAxis===1?(Te=-1,i=r.max.x-r.min.x):n.slopeAxis===2?(Ee=1,i=r.max.z-r.min.z):(Ee=-1,i=r.max.z-r.min.z),De=i>0?n.rise/i:0,Oe=1/Math.sqrt(1+De*De),ke=De*Oe}function Pe(e,t,n){Fe(e,t.px,t.pz,n.hero.radius,t.py+z);let r=V;return r<0||e.ramps[r].slip!==1||(Ne(e,r),De<=Math.tan(n.roof.slipDeg*ge))?-1:r}function Fe(e,t,n,r,i){let a=ve;V=-1;for(let o=0;o<e.solids.length;o++){let c=e.solids[o];if(!s(c,t,n,r))continue;let l=c.max.y;l<=i&&l>a&&(a=l)}for(let c=0;c<e.ramps.length;c++){let l=e.ramps[c].aabb;if(!s(l,t,n,r))continue;let u=Me(e,c,o(t,l.min.x,l.max.x),o(n,l.min.z,l.max.z));u<=ve||u>i||(u>a||u===a&&e.ramps[c].slip===1)&&(a=u,V=c)}return a}function Ie(e,t,n,r){let i=ve;for(let a=0;a<e.ramps.length;a++){let c=e.ramps[a].aabb;if(!s(c,t,n,r))continue;let l=Me(e,a,o(t,c.min.x,c.max.x),o(n,c.min.z,c.max.z));l>ve&&l>i&&(i=l)}return i}function Le(e,t){e.dead=1,e.mode=2,e.deadCause=t,e.eventBits|=32,e.vx=0,e.vy=0,e.vz=0,e.grounded=0,e.perfect=0,b(e.hook)}function Re(e,t,n){let r=0,i=1,a=0;V>=0&&(Ne(t,V),r=-Te*ke,i=Oe,a=-Ee*ke);let o=e.vx*r+e.vy*i+e.vz*a,s=-o;if(s>n.landing.vyRoll){Le(e,3);return}s>n.landing.vyClean&&(e.rollT=n.landing.rollSec,e.eventBits|=8),o<0&&(e.vx-=o*r,e.vz-=o*a);let c=Math.sqrt(e.vx*e.vx+e.vz*e.vz),l=n.landing.carryCap+(e.perfect===1?n.release.perfectBoost:0);if(e.perfect=0,c>l){let t=l/c;e.vx*=t,e.vz*=t}e.vy=0,e.grounded=1,e.mode=0,e.runOut=0,e.chainT=n.landing.chainWindowMs/1e3,e.eventBits|=4,(e.hook.state===2||e.hook.state===3)&&b(e.hook)}function ze(e,t,n){e.hook.state===2||e.hook.state===3?ne(e.hook,xe):(xe.x=0,xe.y=0,xe.z=0),e.vx=xe.x,e.vy=xe.y,e.vz=xe.z,n&&(e.vx+=Math.sin(e.yaw)*t.release.jumpFwd,e.vz+=Math.cos(e.yaw)*t.release.jumpFwd,e.vy+=t.release.jumpUp),e.grounded=0,e.runOut=0,e.mode=1,e.hookCd=t.release.hookCooldownSec,e.eventBits|=2}function Be(e,t,n,r){if(I(t,2)&&(e.hookIntentT=r.release.hookIntentSec),e.hookIntentT<=0||e.hookCd>0||e.hook.state!==0)return;let i=e.camYaw,a=e.camPitch;t.hasAim===1&&(i=pe(t.aimYaw),a=pe(t.aimPitch));let o=Math.cos(a),s=e.py+r.hero.height*Ce,c=e.py+r.rope.handToFeet,l=me(t,64)?r.aim.magnetDegTouch:r.aim.magnetDegDesktop;if(M(n,r,e.px,c,e.pz,e.px,s,e.pz,Math.sin(i)*o,Math.sin(a),Math.cos(i)*o,r.rope.maxLen,l,R),R.anchorId===-1)return;e.hookIntentT=0;let u=0;if(e.grounded===1||e.chainT>0){let t=n.anchors[R.anchorId],r=t.px-e.px,i=t.py-c,a=t.pz-e.pz,o=Math.sqrt(r*r+i*i+a*a);o>0&&(u=(e.vx*r+e.vy*i+e.vz*a)/o)}ee(e.hook,R.anchorId,e.px,c,e.pz,n,r,u)&&(e.eventBits|=1,e.perfect=0)}function Ve(e,t,n,r,i){let a=e.hook;if(I(t,1)){let t=a.len-r.rope.trolleyStop,n=t>0?a.s/t:0,i=Math.sqrt(a.dirX*a.dirX+a.dirZ*a.dirZ),o=i>1e-6?a.dirX/i:0,s=i>1e-6?a.dirZ/i:0,c=a.state===2&&i>1e-6&&n>=r.release.perfectLo&&n<=r.release.perfectHi;ze(e,r,!0),c&&(e.vx+=o*r.release.perfectBoost,e.vz+=s*r.release.perfectBoost,e.vy+=r.release.perfectUp-r.release.jumpUp,e.perfect=1,e.eventBits|=64);return}if(I(t,4)){ze(e,r,!1);return}let o=te(a,i,n,r,me(t,8));P(a,Se);let s=r.hero.radius;e.vx=a.dirX*a.v,e.vy=a.dirY*a.v,e.vz=a.dirZ*a.v,a.v>.1&&(e.yaw=Math.atan2(a.dirX,a.dirZ));let c=Se.y,l=e.runOut===1;if(l){let t=Fe(n,Se.x,Se.z,s,e.launchY+r.hero.stepUp);t>ve&&t>=e.launchY-B?c<t&&(c=t):e.runOut=0}let u=l?r.hero.stepUp:0,d=e.py,f=Se.x-e.px,p=c-e.py,m=Se.z-e.pz,h=je(n,e.px,e.py+u,e.pz,r.hero.height-u,s,f,p,m),g=L.hit,_=!1;if(g&&p<0&&L.ny>.5&&Math.abs(e.py-e.launchY)<B?(h=je(n,e.px,e.py+u,e.pz,r.hero.height-u,s,f,0,m),g=L.hit,e.px+=f*h,e.pz+=m*h,_=!0):(e.px+=f*h,e.py+=p*h,e.pz+=m*h),e.runOut===0&&!_){let t=Fe(n,e.px,e.pz,s,d+r.hero.stepUp);if(t>ve&&t>=e.py-z){e.py=t,Re(e,n,r);return}}if(g)He(e,r);else if(o===3){let t=r.rope.trolleyStop+we,i=je(n,e.px,e.py,e.pz,r.hero.height,s,a.dirX*t,a.dirY*t,a.dirZ*t);if(L.hit){e.px+=a.dirX*t*i,e.py+=a.dirY*t*i,e.pz+=a.dirZ*t*i,He(e,r);return}e.mode=4,e.vx=0,e.vy=0,e.vz=0,b(a)}}function He(e,t){let n=e.hook;n.v*Math.max(0,-(n.dirX*L.nx+n.dirY*L.ny+n.dirZ*L.nz))>t.wall.vCling?Le(e,2):(e.mode=4,e.vx=0,e.vy=0,e.vz=0,e.eventBits|=16,b(n))}function Ue(e,t,n){e.vx=0,e.vy=0,e.vz=0,I(t,1)?ze(e,n,!0):I(t,4)&&ze(e,n,!1)}function We(e,t,n,r){if(e.eventBits=0,e.dead===1)return;let i=1/r.fixedHz;e.chainT>0&&(e.chainT=e.chainT>i?e.chainT-i:0),e.rollT>0&&(e.rollT=e.rollT>i?e.rollT-i:0),e.hookCd>0&&(e.hookCd=e.hookCd>i?e.hookCd-i:0),e.hookIntentT>0&&(e.hookIntentT=e.hookIntentT>i?e.hookIntentT-i:0),e.camYaw+=pe(t.lookYaw),e.camPitch+=pe(t.lookPitch);let a=r.camera.pitchMin*ge,o=r.camera.pitchMax*ge;e.camPitch<a&&(e.camPitch=a),e.camPitch>o&&(e.camPitch=o),e.mode!==3&&(Be(e,t,n,r),e.hook.state===1&&te(e.hook,i,n,r,!1)===2&&(S(e.hook,e.px,e.py+r.rope.handToFeet,e.pz),e.runOut=+(e.grounded===1),e.launchY=e.py,e.grounded=0,e.mode=3)),e.mode===3?Ve(e,t,n,r,i):e.mode===4?Ue(e,t,r):Ke(e,t,n,r,i),e.dead===0&&e.py<n.killPlaneY&&Le(e,1)}function Ge(e,t,n,r,i,a){if(i>0){let i=n,o=r,s=i*Te+o*Ee;if(s>0){let e=s*(1-t.roof.uphillRun);i-=Te*e,o-=Ee*e}let c=i-e.vx,l=o-e.vz,u=Math.sqrt(c*c+l*l),d=t.hero.accel*t.roof.control*a;u<=d?(e.vx=i,e.vz=o):(e.vx+=c/u*d,e.vz+=l/u*d)}let o=t.physics.g,s=o*ke*Oe;e.vx-=Te*s*a,e.vz-=Ee*s*a;let c=Math.sqrt(e.vx*e.vx+e.vz*e.vz),l=t.roof.mu*o*Oe*a;if(c<=l)e.vx=0,e.vz=0;else{let t=(c-l)/c;e.vx*=t,e.vz*=t}}function Ke(e,t,n,r,i){let a=de(t.moveX),o=de(t.moveY),s=Math.sqrt(a*a+o*o);s>1&&(a/=s,o/=s);let c=Math.sin(e.camYaw),l=Math.cos(e.camYaw),u=(o*c+a*l)*r.hero.run,d=(o*l-a*c)*r.hero.run;e.grounded===1&&(I(t,1)?(e.vy=r.hero.jump,e.grounded=0):e.vy=0);let f=e.grounded===1?Pe(n,e,r):-1;if(f>=0)Ge(e,r,u,d,s,i);else if(e.grounded===1){if(s>0){let t=u-e.vx,n=d-e.vz,a=Math.sqrt(t*t+n*n),o=u*u+d*d,s=(e.chainT>0&&e.vx*e.vx+e.vz*e.vz>o&&e.vx*u+e.vz*d>0?r.landing.skidDecel:r.hero.accel)*i;a<=s?(e.vx=u,e.vz=d):(e.vx+=t/a*s,e.vz+=n/a*s)}else{let t=Math.sqrt(e.vx*e.vx+e.vz*e.vz),n=(e.chainT>0?r.landing.skidDecel:r.hero.friction)*i;if(t<=n)e.vx=0,e.vz=0;else{let r=(t-n)/t;e.vx*=r,e.vz*=r}}}else{let t=1-r.physics.airDrag*i;e.vx*=t,e.vz*=t}let p=e.py,m=r.hero.height;e.grounded===1&&(p=e.py+r.hero.stepUp,m=r.hero.height-r.hero.stepUp);let h=r.hero.radius,g=e.px,_=Ae(n,e.px,p,e.pz,m,h,0,e.vx*i);L.hit&&(e.vx=0),e.px+=_,Ie(n,e.px,e.pz,h)>e.py+r.hero.stepUp&&(e.px=g,e.vx=0);let v=e.pz,y=Ae(n,e.px,p,e.pz,m,h,2,e.vz*i);if(L.hit&&(e.vz=0),e.pz+=y,Ie(n,e.px,e.pz,h)>e.py+r.hero.stepUp&&(e.pz=v,e.vz=0),e.vx*e.vx+e.vz*e.vz>_e*_e&&(e.yaw=Math.atan2(e.vx,e.vz)),e.grounded===1){let t=Fe(n,e.px,e.pz,h,e.py+r.hero.stepUp);t>ve&&t>=e.py-r.hero.stepUp?(e.py=t,e.vy=0):(e.grounded=0,f>=0&&(e.vy=(e.vx*Te+e.vz*Ee)*De))}if(e.grounded===0){let t=e.py,a=e.vy*i-.5*r.physics.g*i*i,o;if(a>0?(o=Ae(n,e.px,e.py,e.pz,r.hero.height,h,1,a),L.hit?e.vy=0:e.vy-=r.physics.g*i):(e.vy-=r.physics.g*i,o=Ae(n,e.px,e.py,e.pz,r.hero.height,h,1,a)),e.py=t+o,a<=0){let i=Fe(n,e.px,e.pz,h,t+r.hero.stepUp);i>ve&&i>=e.py-z&&(e.py=i,Re(e,n,r))}}e.dead===0&&(e.mode=e.grounded===1?0:1)}var qe=class{outcome=0;x=0;y=0;z=0;releaseTick=-1;releaseFrac=-1},Je=0,Ye=1,Xe=2,Ze=3,Qe=4,$e=.001,et=new re,tt=new re,nt=new ce,rt=new ce,it=new ce;rt.hasAim=0,it.pressed=1,it.buttons=1;var at=0,ot=0,st=0,ct=-1,lt=-1;function ut(e,t){return t.goal.max.y>t.goal.min.y&&a(t.goal,e.px,e.py,e.pz)}function dt(e,t){at=e.px,ot=e.py,st=e.pz,lt=t}function ft(e,t,n){if(ae(tt,et),ct=-1,lt=-1,We(tt,nt,e,t),tt.hook.state===0||tt.hook.anchorId!==pt)return Je;let r=Math.ceil(t.aim.previewMaxSec*t.fixedHz),i=!1,a=0;for(;;){if(tt.eventBits&16&&(i=!0),tt.mode===3&&ct<0&&(ct=a),ct>=0&&lt<0&&tt.mode!==3&&dt(tt,a),tt.dead===1)return lt<0&&dt(tt,a),Ye;if(ut(tt,e))return lt<0&&dt(tt,a),Xe;if(lt>=0){if(tt.mode===4)return i?Qe:Ze;if(tt.grounded===1&&tt.mode===0&&tt.vx*tt.vx+tt.vz*tt.vz<$e*$e)return Xe}if(a>=r)return lt<0&&dt(tt,a),Ye;a++,We(tt,a===n&&tt.mode===3?it:rt,e,t)}}var pt=-1;function mt(e,t,n,r,i){i.outcome=0,i.x=0,i.y=0,i.z=0,i.releaseTick=-1,i.releaseFrac=-1;let a=n.anchors[t];if(a===void 0||e.dead===1)return;ae(et,e),pt=t;let o=a.px-et.px,s=a.py-(et.py+r.hero.height*Ce),c=a.pz-et.pz;nt.hasAim=1,nt.aimYaw=fe(Math.atan2(o,c)),nt.aimPitch=fe(Math.atan2(s,Math.sqrt(o*o+c*c))),nt.pressed=2,nt.buttons=2;let l=ft(n,r,0);if(l===Je)return;if(i.x=at,i.y=ot,i.z=st,l===Xe||l===Ze){i.outcome=1;return}if(l===Qe){i.outcome=2;return}let u=ct,d=lt-ct,f=r.aim.previewReleaseSamples;if(i.outcome=3,u<0||d<=0)return;let p=-1;for(let e=1;e<=f;e++){let t=u+Math.round(e*d/(f+1));if(t<=0||t===p)continue;p=t;let a=ft(n,r,t);if(a===Xe||a===Ze||a===Qe){i.outcome=2,i.releaseTick=t,i.releaseFrac=(t-u)/d;return}}}function ht(e){let t=Object.values(e).filter(e=>typeof e==`number`);return Object.entries(e).filter(([e,n])=>t.indexOf(+e)===-1).map(([e,t])=>t)}function gt(e,t=`|`){return e.map(e=>Vt(e)).join(t)}function _t(e,t){return typeof t==`bigint`?t.toString():t}var vt=class{constructor(e){this._getter=e,this._value=void 0}get value(){let e=this._getter;return e!==void 0&&(this._value=e(),this._getter=void 0),this._value}};function yt(e){return new vt(e)}function bt(e){return e==null}function xt(e){let t=+!!e.startsWith(`^`),n=e.endsWith(`$`)?e.length-1:e.length;return e.slice(t,n)}function St(e,t){let n=e/t,r=Math.round(n),i=4*2**-52*Math.max(Math.abs(n),1);return Math.abs(n-r)<i?0:n-r}function Ct(e,t,n){Object.defineProperty(e,t,{value:n,writable:!0,enumerable:!0,configurable:!0})}function wt(e){let t=Object.getOwnPropertyDescriptor(e,`shape`);return t?.get?t.get.raw:t?.value}function Tt(e){return wt(e._zod.def)??e._zod.def.shape}function Et(e,t,n){Object.defineProperty(e,t,{get(){let e=n();return Ct(this,t,e),e},enumerable:!0,configurable:!0})}function Dt(e,t,n){t in e?Ct(e,t,n):e[t]=n}function Ot(e,t,n,r){let i=Tt(t);for(let a of n){let n=Object.getOwnPropertyDescriptor(i,a);n.enumerable&&(n.get?Et(e,a,()=>{let e=t._zod.def.shape[a];return r?r(e,a):e}):Dt(e,a,r?r(n.value,a):n.value))}}function kt(e,t){for(let n of Reflect.ownKeys(t)){let r=Object.getOwnPropertyDescriptor(t,n);r.enumerable&&(r.get?Et(e,n,()=>t[n]):Dt(e,n,r.value))}}function At(...e){let t={};for(let n of e){let e=Object.getOwnPropertyDescriptors(n);Object.assign(t,e)}return Object.defineProperties({},t)}function jt(e){return JSON.stringify(e)}var Mt=`captureStackTrace`in Error?Error.captureStackTrace:(...e)=>{};function Nt(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}var Pt=yt(()=>{if(Mn.jitless||typeof navigator<`u`&&navigator?.userAgent?.includes(`Cloudflare`))return!1;try{return Function(``),!0}catch{return!1}});function Ft(e){if(Nt(e)===!1)return!1;let t=e.constructor;if(t===void 0||typeof t!=`function`)return!0;let n=t.prototype;return Nt(n)!==!1&&Object.prototype.hasOwnProperty.call(n,`isPrototypeOf`)!==!1}function It(e){return Ft(e)?{...e}:Array.isArray(e)?[...e]:e instanceof Map?new Map(e):e instanceof Set?new Set(e):e}var Lt=new Set([`string`,`number`,`symbol`]);function Rt(e){return e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)}function zt(e,t,n){let r=new e._zod.constr(t??e._zod.def);return(!t||n?.parent)&&(r._zod.parent=e),r}function Bt(e){let t=e;if(!t)return{};if(typeof t==`string`)return{error:()=>t};if(t?.message!==void 0){if(t?.error!==void 0)throw Error("Cannot specify both `message` and `error` params");t.error=t.message}return delete t.message,typeof t.error==`string`?{...t,error:()=>t.error}:t}function Vt(e){return typeof e==`bigint`?e.toString()+`n`:typeof e==`string`?`"${e}"`:`${e}`}function Ht(e){return Object.keys(e).filter(t=>e[t]._zod.optin!==void 0&&e[t]._zod.optout===`optional`)}var Ut={safeint:[-(2**53-1),2**53-1],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-34028234663852886e22,34028234663852886e22],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]},Wt={int64:[BigInt(`-9223372036854775808`),BigInt(`9223372036854775807`)],uint64:[BigInt(0),BigInt(`18446744073709551615`)]};function Gt(e,t){let n=e._zod.def,r=n.checks;if(r&&r.length>0)throw Error(`.pick() cannot be used on object schemas containing refinements`);let i={};return Ot(i,e,Kt(e,t)),zt(e,At(n,{shape:i,checks:[]}))}function Kt(e,t){let n=Tt(e),r=[];for(let e of Reflect.ownKeys(t)){if(!Object.getOwnPropertyDescriptor(n,e)?.enumerable)throw Error(`Unrecognized key: "${String(e)}"`);t[e]&&r.push(e)}return r}function qt(e,t){let n=e._zod.def,r=n.checks;if(r&&r.length>0)throw Error(`.omit() cannot be used on object schemas containing refinements`);let i=new Set(Kt(e,t)),a={};return Ot(a,e,Reflect.ownKeys(Tt(e)).filter(e=>!i.has(e))),zt(e,At(n,{shape:a,checks:[]}))}function Jt(e,t){if(!Ft(t))throw Error(`Invalid input to extend: expected a plain object`);let n=e._zod.def.checks;if(n&&n.length>0){let n=Tt(e);for(let e of Reflect.ownKeys(t))if(Object.getOwnPropertyDescriptor(n,e)!==void 0)throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.")}return zt(e,At(e._zod.def,{shape:Yt(e,t)}))}function Yt(e,t){let n={};return Ot(n,e,Reflect.ownKeys(Tt(e))),kt(n,t),n}function Xt(e,t){if(!Ft(t))throw Error(`Invalid input to safeExtend: expected a plain object`);return zt(e,At(e._zod.def,{shape:Yt(e,t)}))}function Zt(e,t){if(!t?._zod?.def)throw Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");if(e._zod.def.checks?.length)throw Error(`.merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.`);let n={};return Ot(n,e,Reflect.ownKeys(Tt(e))),Ot(n,t,Reflect.ownKeys(Tt(t))),zt(e,At(e._zod.def,{shape:n,get catchall(){return t._zod.def.catchall},checks:t._zod.def.checks??[]}))}function Qt(e,t,n,r=`partial`){let i=t._zod.def.checks;if(i&&i.length>0)throw Error(`.${r}() cannot be used on object schemas containing refinements`);let a=n?new Set(Kt(t,n)):void 0,o={};return Ot(o,t,Reflect.ownKeys(Tt(t)),e&&((t,n)=>a&&!a.has(n)?t:new e({type:`optional`,innerType:t}))),zt(t,At(t._zod.def,{shape:o,checks:[]}))}function $t(e,t,n){let r=n?new Set(Kt(t,n)):void 0,i={};return Ot(i,t,Reflect.ownKeys(Tt(t)),(t,n)=>r&&!r.has(n)?t:new e({type:`nonoptional`,innerType:t})),zt(t,At(t._zod.def,{shape:i}))}function en(e,t=0){if(e.aborted===!0)return!0;for(let n=t;n<e.issues.length;n++)if(e.issues[n]?.continue!==!0)return!0;return!1}function tn(e,t=0){if(e.aborted===!0)return!0;for(let n=t;n<e.issues.length;n++)if(e.issues[n]?.continue===!1)return!0;return!1}function nn(e,t){return t.map(t=>{var n;return(n=t).path??(n.path=[]),t.path.unshift(e),t})}function rn(e){return typeof e==`string`?e:e?.message}function an(e){let t=[];for(let n of e??[]){let e=n._zod.def;if(!/_(length|size)$|_equals$/.test(e.check))break;let r=e.maximum??e.length??e.size;r>=0&&t.push([r,n])}return t}function on(e,t,n){var r;for(let i=t;i<e.length;i++)(r=e[i]).schema??(r.schema=n)}function sn(e,t,n){var r;let i=e.inst?._zod?.traits;i?.has(`$ZodType`)&&(i.has(`$ZodCheck`)?(r=e).schema??(r.schema=e.inst):e.schema=e.inst);let a=e.schema===e.inst?void 0:e.schema?._zod.def?.error,o=e.message?e.message:rn(e.inst?._zod.def?.error?.(e))??rn(a?.(e))??rn(t?.error?.(e))??rn(n.customError?.(e))??rn(n.localeError?.(e))??`Invalid input`,s={};for(let t of Object.keys(e))t!==`inst`&&t!==`schema`&&t!==`continue`&&t!==`input`&&t!==`__proto__`&&(s[t]=e[t]);return s.path??=[],s.message=o,t?.reportInput&&(s.input=e.input),s}var cn=/[\uD800-\uDBFF]/;function ln(e){let t=e.length;if(!cn.test(e))return t;let n=t;for(let r=0;r<t-1;r++)(e.charCodeAt(r)&64512)==55296&&(e.charCodeAt(r+1)&64512)==56320&&(n--,r++);return n}function un(e){return Array.isArray(e)?`array`:typeof e==`string`?`string`:`unknown`}function dn(e){let t=typeof e;switch(t){case`number`:return Number.isNaN(e)?`nan`:`number`;case`object`:{if(e===null)return`null`;if(Array.isArray(e))return`array`;let t=e;if(t&&Object.getPrototypeOf(t)!==Object.prototype&&`constructor`in t&&t.constructor)return t.constructor.name}}return t}function fn(...e){let[t,n,r]=e;return typeof t==`string`?{message:t,code:`custom`,input:n,inst:r}:{...t}}function pn(e,t){for(let n in t){let r=Object.getOwnPropertyDescriptor(t,n);r.get?Object.defineProperty(e,n,{...r,enumerable:!1}):_n(e,n,r.value)}}function mn(e,t,n,r=!0){return Object.defineProperty(e,t,{configurable:!0,writable:!0,enumerable:r,value:n}),n}function hn(e,t,n){return mn(e,t,n,!1)}function gn(e,t){for(let n in e){let r=e[n];Object.defineProperty(t,n,{configurable:!0,enumerable:!0,get(){return mn(this,n,r(this))},set(e){mn(this,n,e)}})}return t}function _n(e,t,n){Object.defineProperty(e,t,{configurable:!0,get(){return this==null?n:mn(this,t,n.bind(this))},set(e){mn(this,t,e)}})}function vn(e,t){let n=Object.getPrototypeOf(e);return t in n?void 0:n}var yn,bn=!1,xn={configurable:!0,get(){bn=!0}};function Sn(e,t,n){let r=Object.getPrototypeOf(e._zod);t in r&&yn!==e._zod?yn=void 0:(yn=e._zod,Object.defineProperty(r,t,{configurable:!0,get(){Object.defineProperty(this,t,xn);let e=bn;bn=!1;try{let r=n(this);return bn?delete this[t]:Object.defineProperty(this,t,{configurable:!0,writable:!0,value:r}),bn||=e,r}catch(n){throw delete this[t],bn||=e,n}},set(e){Object.defineProperty(this,t,{configurable:!0,writable:!0,value:e})}}))}function Cn(e,t,n,r){let i=vn(e,t);i&&Object.defineProperty(i,t,{configurable:!0,get(){let e={configurable:!0,writable:!0,enumerable:r,value:void 0};return Object.defineProperty(this,t,e),e.value=n(this),Object.defineProperty(this,t,e),e.value},set(e){Object.defineProperty(this,t,{configurable:!0,writable:!0,enumerable:r,value:e})}})}var wn=`~constantCatch`;function Tn(e){let t=()=>e;return t[wn]=!0,t}var En,Dn={value:void 0,enumerable:!1},On=`captureStackTrace`in Error?Error:null;function kn(e){let t=On;if(t){let n=t.stackTraceLimit;if(typeof n==`number`){try{t.stackTraceLimit=0}catch{return On=null,new e}try{return new e}finally{t.stackTraceLimit=n}}}return new e}function H(e,t,n,r){let i={};function a(e){this.def=e,this.constr=d,this.traits=new Set}a.prototype=i;let o=n,s=o&&new WeakSet;function c(n,r){if(!n._zod){Dn.value=new a(r);try{Object.defineProperty(n,"_zod",Dn)}finally{Dn.value=void 0}}else if(n._zod.traits.has(e))return;if(n._zod.traits.add(e),t(n,r),s){let e=Object.getPrototypeOf(n),t=n._zod.constr.prototype,r=e;for(;r&&r!==t;)r=Object.getPrototypeOf(r);let i=r??e;s.has(i)||(s.add(i),pn(i,o))}let i=d.prototype;for(let e in i)Object.prototype.hasOwnProperty.call(i,e)&&(e in n||(n[e]=i[e].bind(n)))}let l=r?.Parent??Object;class u extends l{}Object.defineProperty(u,"name",{value:e});function d(e){let t=r?.Parent?kn(u):this;c(t,e);let n=t._zod.deferred;if(n){for(let e of n)e();t._zod.deferred=void 0}let i=globalThis.__zod_globalConfig?.postProcessor;return i&&i(t),t}return Object.defineProperty(d,"init",{value:c}),Object.defineProperty(d,Symbol.hasInstance,{value:t=>r?.Parent&&t instanceof r.Parent?!0:t?._zod?.traits?.has(e)}),Object.defineProperty(d,"name",{value:e}),d}var An=class extends Error{constructor(){super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`)}},jn=class extends Error{constructor(e){super(`Encountered unidirectional transform during encode: ${e}`),this.name=`ZodEncodeError`}};(En=globalThis).__zod_globalConfig??(En.__zod_globalConfig={});var Mn=globalThis.__zod_globalConfig;function Nn(e){return e&&Object.assign(Mn,e),Mn}function Pn(){let e=this._zod;return e.message??=JSON.stringify(e.def,_t,2),e.message}function Fn(e){this._zod.message=e}var In={get:Pn,set:Fn,enumerable:!0,configurable:!0},Ln={value:void 0,enumerable:!1},Rn=new WeakSet([Object.prototype,Error.prototype]),zn=H(`$ZodError`,(e,t)=>{e.name=`$ZodError`,Ln.value=t,Object.defineProperty(e,"issues",Ln),Ln.value=void 0,Object.defineProperty(e,"message",In);let n=Object.getPrototypeOf(e);Rn.has(n)||(Rn.add(n),Object.defineProperty(n,"toString",{configurable:!0,enumerable:!1,get(){let e=()=>this.message;return Object.defineProperty(this,"toString",{value:e,configurable:!0,writable:!0}),e},set(e){Object.defineProperty(this,"toString",{value:e,configurable:!0,writable:!0})}}))});function Bn(e,t,n){return Object.prototype.hasOwnProperty.call(e,t)||(t===`__proto__`?Object.defineProperty(e,t,{value:n(),writable:!0,enumerable:!0,configurable:!0}):e[t]=n()),e[t]}function Vn(e,t=e=>e.message){let n={},r=[];for(let i of e.issues)i.path.length>0?Bn(n,i.path[0],()=>[]).push(t(i)):r.push(t(i));return{formErrors:r,fieldErrors:n}}function Hn(e,t=e=>e.message){let n={_errors:[]},r=(e,i=[])=>{for(let a of e.issues)if(a.code===`invalid_union`&&a.errors.length)a.errors.map(e=>r({issues:e},[...i,...a.path]));else if(a.code===`invalid_key`)r({issues:a.issues},[...i,...a.path]);else if(a.code===`invalid_element`)r({issues:a.issues},[...i,...a.path]);else{let e=[...i,...a.path];if(e.length===0)n._errors.push(t(a));else{let r=n,i=0;for(;i<e.length;){let n=e[i],o=i===e.length-1;if(n===`_errors`){o&&r._errors.push(t(a)),i++;continue}Object.prototype.hasOwnProperty.call(r,n)||Object.defineProperty(r,n,{value:{_errors:[]},enumerable:!0,writable:!0,configurable:!0});let s=r[n];o&&s._errors.push(t(a)),r=s,i++}}}};return r(e),n}function Un(e,t){return{callee:t?.callee??e,Err:t?.Err}}var Wn=e=>{let t=(n,r,i,a)=>{let o=i?{...i,async:!1}:{async:!1},s=n._zod.run({value:r,issues:[]},o);if(s instanceof Promise)throw new An;if(s.issues.length){let n=new((a?.Err)??e)(s.issues.map(e=>sn(e,o,Nn())));throw Mt(n,a?.callee??t),n}return s.value};return t},Gn=e=>{let t=async(n,r,i,a)=>{let o=i?{...i,async:!0}:{async:!0},s=n._zod.run({value:r,issues:[]},o);if(s instanceof Promise&&(s=await s),s.issues.length){let n=new((a?.Err)??e)(s.issues.map(e=>sn(e,o,Nn())));throw Mt(n,a?.callee??t),n}return s.value};return t},Kn=e=>(t,n,r)=>{let i=r?{...r,async:!1}:{async:!1},a=t._zod.run({value:n,issues:[]},i);if(a instanceof Promise)throw new An;return a.issues.length?qn(e,a.issues,i):{success:!0,data:a.value}};function qn(e,t,n){let r;return{success:!1,get error(){return r||(r=new e(t.map(e=>sn(e,n,Nn()))),t=void 0,n=void 0),r},set error(e){r=e,t=void 0,n=void 0}}}var Jn=e=>async(t,n,r)=>{let i=r?{...r,async:!0}:{async:!0},a=t._zod.run({value:n,issues:[]},i);return a instanceof Promise&&(a=await a),a.issues.length?qn(e,a.issues,i):{success:!0,data:a.value}},Yn=Symbol.for(`zod.compile.invalid`),Xn=Symbol.for(`zod.compile.fallback`),Zn=((e,t,n)=>{let r=e._zod.bag.validator;if(r!==void 0){if(r(t)!==Yn)return!0;if(r.definite===!0&&n===void 0)return!1}return Qn(e,t,n)});function Qn(e,t,n){let r=n?{...n,async:!1,abortEarly:!0}:{async:!1,abortEarly:!0},i=e._zod.bag.fallbackRun,a;if(i?(r[Xn]=!0,a=i({value:t,issues:[]},r)):a=e._zod.run({value:t,issues:[]},r),a instanceof Promise)throw new An;return a.issues.length===0}var $n=async(e,t,n)=>{let r=n?{...n,async:!0,abortEarly:!0}:{async:!0,abortEarly:!0},i=e._zod.run({value:t,issues:[]},r);return i instanceof Promise&&(i=await i),i.issues.length===0},er=e=>{let t=Wn(e),n=(e,r,i,a)=>{let o=i?{...i,direction:`backward`}:{direction:`backward`};return t(e,r,o,Un(n,a))};return n},tr=e=>{let t=Wn(e),n=(e,r,i,a)=>t(e,r,i,Un(n,a));return n},nr=e=>{let t=Gn(e),n=async(e,r,i,a)=>{let o=i?{...i,direction:`backward`}:{direction:`backward`};return await t(e,r,o,Un(n,a))};return n},rr=e=>{let t=Gn(e),n=async(e,r,i,a)=>await t(e,r,i,Un(n,a));return n},ir=e=>(t,n,r)=>{let i=r?{...r,direction:`backward`}:{direction:`backward`};return Kn(e)(t,n,i)},ar=e=>(t,n,r)=>Kn(e)(t,n,r),or=e=>async(t,n,r)=>{let i=r?{...r,direction:`backward`}:{direction:`backward`};return Jn(e)(t,n,i)},sr=e=>async(t,n,r)=>Jn(e)(t,n,r),cr=/^-?\d+(?:\.\d+)?$/,lr=H(`$ZodCheck`,(e,t)=>{var n;e._zod??={},e._zod.def=t,(n=e._zod).onattach??(n.onattach=[])}),ur=e=>{let t=e.value;return!bt(t)&&t.length!==void 0},dr={number:`number`,bigint:`bigint`,object:`date`},fr=H(`$ZodCheckLessThan`,(e,t)=>{lr.init(e,t);let n=dr[typeof t.value];e._zod.check=r=>{(t.inclusive?r.value<=t.value:r.value<t.value)||r.issues.push({origin:dr[typeof r.value]??n,code:`too_big`,maximum:typeof t.value==`object`?t.value.getTime():t.value,input:r.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),pr=H(`$ZodCheckGreaterThan`,(e,t)=>{lr.init(e,t);let n=dr[typeof t.value];e._zod.check=r=>{(t.inclusive?r.value>=t.value:r.value>t.value)||r.issues.push({origin:dr[typeof r.value]??n,code:`too_small`,minimum:typeof t.value==`object`?t.value.getTime():t.value,input:r.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),mr=H(`$ZodCheckMultipleOf`,(e,t)=>{lr.init(e,t),e._zod.check=n=>{if(typeof n.value!=typeof t.value)throw Error(`Cannot mix number and bigint in multiple_of check.`);(typeof n.value==`bigint`?t.value!==BigInt(0)&&n.value%t.value===BigInt(0):St(n.value,t.value)===0)||n.issues.push({origin:typeof n.value,code:`not_multiple_of`,divisor:t.value,input:n.value,inst:e,continue:!t.abort})}}),hr=H(`$ZodCheckNumberFormat`,(e,t)=>{lr.init(e,t),t.format=t.format||`float64`;let n=t.format?.includes(`int`),r=n?`int`:`number`,[i,a]=Ut[t.format];e._zod.check=o=>{let s=o.value;if(n){if(!Number.isInteger(s)){o.issues.push({expected:r,format:t.format,code:`invalid_type`,continue:!1,input:s,inst:e});return}if(!Number.isSafeInteger(s)){s>0?o.issues.push({input:s,code:`too_big`,maximum:2**53-1,note:`Integers must be within the safe integer range.`,inst:e,origin:r,inclusive:!0,continue:!t.abort}):o.issues.push({input:s,code:`too_small`,minimum:-(2**53-1),note:`Integers must be within the safe integer range.`,inst:e,origin:r,inclusive:!0,continue:!t.abort});return}}s<i&&o.issues.push({origin:`number`,input:s,code:`too_small`,minimum:i,inclusive:!0,inst:e,continue:!t.abort}),s>a&&o.issues.push({origin:`number`,input:s,code:`too_big`,maximum:a,inclusive:!0,inst:e,continue:!t.abort})}}),gr=H(`$ZodCheckMaxLength`,(e,t)=>{var n;lr.init(e,t),(n=e._zod.def).when??(n.when=ur),e._zod.check=n=>{let r=n.value,i=r.length;if((typeof r==`string`&&i>t.maximum?ln(r):i)<=t.maximum)return;let a=un(r);n.issues.push({origin:a,code:`too_big`,maximum:t.maximum,inclusive:!0,input:r,inst:e,continue:!t.abort})}}),_r=H(`$ZodCheckMinLength`,(e,t)=>{var n;lr.init(e,t),(n=e._zod.def).when??(n.when=ur),e._zod.check=n=>{let r=n.value,i=r.length;if((typeof r==`string`&&i>=t.minimum&&i<t.minimum*2?ln(r):i)>=t.minimum)return;let a=un(r);n.issues.push({origin:a,code:`too_small`,minimum:t.minimum,inclusive:!0,input:r,inst:e,continue:!t.abort})}}),vr=H(`$ZodCheckLengthEquals`,(e,t)=>{var n;lr.init(e,t),(n=e._zod.def).when??(n.when=ur),e._zod.check=n=>{let r=n.value,i=r.length,a=typeof r==`string`&&i>=t.length&&i<=t.length*2?ln(r):i;if(a===t.length)return;let o=un(r),s=a>t.length;n.issues.push({origin:o,...s?{code:`too_big`,maximum:t.length}:{code:`too_small`,minimum:t.length},inclusive:!0,exact:!0,input:n.value,inst:e,continue:!t.abort})}}),yr=H(`$ZodCheckOverwrite`,(e,t)=>{lr.init(e,t),e._zod.check=e=>{e.value=t.tx(e.value)}}),br=class{constructor(e=[],t={}){this.content=[],this.indent=0,this.args=e,this.closed=t}indented(e){this.indent+=1;try{e(this)}finally{--this.indent}}write(e){if(typeof e==`function`){e(this,{execution:`sync`}),e(this,{execution:`async`});return}let t=e.split(`
`).filter(e=>e),n=Math.min(...t.map(e=>e.length-e.trimStart().length)),r=t.map(e=>e.slice(n)).map(e=>` `.repeat(this.indent*2)+e);for(let e of r)this.content.push(e)}compile(){let e=Function,t=this?.content??[``];return new e(...Object.keys(this.closed),`return function (${this.args.join(`, `)}) {\n${t.join(`
`)}\n};`)(...Object.values(this.closed))}},xr={major:4,minor:6,patch:7},Sr=H(`$ZodType`,(e,t)=>{var n;e??={},e._zod.def=t,e._zod.bag=e._zod.bag||{},e._zod.version=xr;let r=e._zod.def.checks,i=e._zod.traits.has(`$ZodCheck`)?[e,...r??[]]:r?.length?[...r]:[];for(let t of i)for(let n of t._zod.onattach)n(e);if(i.length===0)(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let t=(t,n,r)=>{if(t.memo)return t;let i=en(t),a;for(let o of n){if(o._zod.def.when){if(tn(t)||!o._zod.def.when(t))continue}else if(i)continue;let n=t.issues.length,s=o._zod.check(t);if(s instanceof Promise&&r?.async===!1)throw new An;if(a||s instanceof Promise)a=(a??Promise.resolve()).then(async()=>{await s,t.issues.length!==n&&(on(t.issues,n,e),i||=en(t,n))});else{if(t.issues.length===n)continue;on(t.issues,n,e),i||=en(t,n)}}return a?a.then(()=>t):t},n=(n,r,a)=>{if(en(n))return n.aborted=!0,n;let o=t(r,i,a);if(o instanceof Promise){if(a.async===!1)throw new An;return o.then(t=>e._zod.parse(t,a))}return e._zod.parse(o,a)};e._zod.run=(r,a)=>{if(a.skipChecks)return e._zod.parse(r,a);if(a.direction===`backward`){let t=e._zod.parse({value:r.value,issues:[]},{...a,skipChecks:!0});return t instanceof Promise?t.then(e=>n(e,r,a)):n(t,r,a)}let o=e._zod.parse(r,a);if(o instanceof Promise){if(a.async===!1)throw new An;return o.then(e=>t(e,i,a))}return t(o,i,a)}}},{get"~standard"(){return hn(this,`~standard`,Tr(this))},set"~standard"(e){mn(this,`~standard`,e)}}),Cr=(e,t)=>e.issues.length?{issues:e.issues.map(e=>sn(e,t,Nn()))}:{value:e.value};async function wr(e,t){let n={async:!0};return Cr(await e._zod.run({value:t,issues:[]},n),n)}function Tr(e){return{validate:t=>{let n={async:!1};try{let r=e._zod.run({value:t,issues:[]},n);if(!(r instanceof Promise))return Cr(r,n)}catch{}return wr(e,t)},vendor:`zod`,version:1}}var Er=H(`$ZodNumber`,(e,t)=>{Sr.init(e,t),e._zod.pattern=cr,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=Number(n.value)}catch{}let i=n.value;if(typeof i==`number`&&!Number.isNaN(i)&&Number.isFinite(i))return n;let a=typeof i==`number`?Number.isNaN(i)?`NaN`:Number.isFinite(i)?void 0:String(i):void 0;return n.issues.push({expected:`number`,code:`invalid_type`,input:i,inst:e,...a?{received:a}:{}}),n}}),Dr=H(`$ZodNumberFormat`,(e,t)=>{hr.init(e,t),Er.init(e,t)}),Or=H(`$ZodUnknown`,(e,t)=>{Sr.init(e,t),e._zod.parse=e=>e}),kr=H(`$ZodNever`,(e,t)=>{Sr.init(e,t),e._zod.parse=(t,n)=>(t.issues.push({expected:`never`,code:`invalid_type`,input:t.value,inst:e}),t)});function Ar(e,t){let n=an(e._zod.def.checks);if(!n.length)return;let r=Math.min(...n.map(e=>e[0])),i=e._zod.parse;e._zod.parse=(n,a)=>{let o=t(n.value);if(o>r&&!a?.skipChecks&&a?.direction!==`backward`){for(let[t,r]of an(e._zod.def.checks))if(o>t&&r._zod.def.when(n)){let t=n.issues.length;return r._zod.check(n),n.issues[t].continue=!1,on(n.issues,t,e),n}}return i(n,a)}}var jr=e=>Array.isArray(e)?e.length:-1;function Mr(e,t,n){e.issues.length&&t.issues.push(...nn(n,e.issues)),t.value[n]=e.value}var Nr=H(`$ZodArray`,(e,t)=>{Sr.init(e,t);let n=Mn.memoizer;n?.attach(e),e._zod.parse=(r,i)=>{let a=r.value;if(!Array.isArray(a))return r.issues.push({expected:`array`,code:`invalid_type`,input:a,inst:e}),r;r.value=n?n.alloc(e,r,Array(a.length),i):Array(a.length);let o=[],s=i?.abortEarly;for(let e=0;e<a.length;e++){let n=a[e],c=t.element._zod.run({value:n,issues:[]},i);if(c instanceof Promise)o.push(c.then(t=>Mr(t,r,e)));else if(Mr(c,r,e),s&&c.issues.length!==0&&en(c))break}return o.length?Promise.all(o).then(()=>r):r},Ar(e,jr)});function Pr(e,t,n,r,i,a){let o=n in r,s=a===`optional`;if(o||!s||i!==`optional`){if(e.issues.length){if(i!==void 0&&s&&!o)return;t.issues.push(...nn(n,e.issues))}!o&&i===void 0?e.issues.length||t.issues.push({code:`invalid_type`,expected:`nonoptional`,input:void 0,path:[n]}):e.value===void 0?(o||i===`defaulted`&&!s)&&(t.value[n]=void 0):t.value[n]=e.value}}var Fr=[];function Ir(e){let t=Object.keys(e.shape),n=Object.getOwnPropertySymbols(e.shape),r=n.length?n:Fr,i=r.length?[...t,...r]:t;for(let t of i)if(!e.shape?.[t]?._zod?.traits?.has(`$ZodType`))throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);let a=Ht(e.shape);return{...e,allKeys:i,symbolKeys:r,keySet:new Set(t),numKeys:t.length,optionalKeys:new Set(a)}}function Lr(e,t,n,r,i,a,o){let s=[],c=i.keySet,l=i.catchall._zod,u=l.def.type,d=l.optin,f=l.optout,p=0;for(let i in t){if(o&&n.issues.length!==p){if(en(n,p))break;p=n.issues.length}if(c.has(i))continue;if(i===`__proto__`){u===`never`&&s.push(i);continue}if(u===`never`){s.push(i);continue}let a=l.run({value:t[i],issues:[]},r);a instanceof Promise?e.push(a.then(e=>Pr(e,n,i,t,d,f))):Pr(a,n,i,t,d,f)}return s.length&&n.issues.push({code:`unrecognized_keys`,keys:s,input:t,inst:a,continue:!0}),e.length?Promise.all(e).then(()=>n):n}var Rr=H(`$ZodObject`,(e,t)=>{Sr.init(e,t);let n=Object.getOwnPropertyDescriptor(t,`shape`),r=n?.get?n.get.raw:t.shape??{};if(r){let e=()=>{let n={...r};return Object.defineProperty(t,"shape",{value:n}),e.raw=n,n};e.raw=r,Object.defineProperty(t,"shape",{get:e})}let i=yt(()=>Ir(t));Sn(e,`propValues`,e=>{let t=e.def.shape,n={};for(let e in t){let r=t[e]._zod;if(r.values){Object.prototype.hasOwnProperty.call(n,e)||Ct(n,e,new Set);for(let t of r.values)n[e].add(t);r.optin!==void 0&&n[e].add(void 0)}}return n});let a=Nt,o=t.catchall,s,c=Mn.memoizer;c?.attach(e),e._zod.parse=(t,n)=>{s??=i.value;let r=t.value;if(!a(r))return t.issues.push({expected:`object`,code:`invalid_type`,input:r,inst:e}),t;t.value=c?c.alloc(e,t,{},n):{};let l=[],u=s.shape,d=n?.abortEarly,f=t.issues.length;for(let e of s.allKeys){if(d&&t.issues.length!==f){if(en(t,f))break;f=t.issues.length}if(e===`__proto__`)continue;let i=u[e],a=i._zod.optin,o=i._zod.optout,s=i._zod.run({value:r[e],issues:[]},n);s instanceof Promise?l.push(s.then(n=>Pr(n,t,e,r,a,o))):Pr(s,t,e,r,a,o)}return o?Lr(l,r,t,n,i.value,e,d===!0):l.length?Promise.all(l).then(()=>t):t}}),zr=H(`$ZodObjectJIT`,(e,t)=>{Rr.init(e,t);let n=e._zod.parse,r=yt(()=>Ir(t)),i=Mn.memoizer,a=t=>{let n=r.value,a=n.symbolKeys,o=new br([`payload`,`ctx`],{shape:t,inst:e,memo:i,syms:a}),s=e=>`shape[${e}]._zod.run({ value: input[${e}], issues: [] }, ctx)`,c=(e,t)=>`
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
          }`;o.write(`const input = payload.value;`);let l=Object.create(null),u=0;for(let e of n.allKeys)l[e]=`key_${u++}`;o.write(i?`const newResult = memo.alloc(inst, payload, {}, ctx);`:`const newResult = {};`);for(let e of n.allKeys){if(e===`__proto__`)continue;let n=l[e],r=typeof e==`symbol`?`syms[${a.indexOf(e)}]`:jt(e),i=`${r} in input`,u=t[e],d=u?._zod?.optin,f=d!==void 0,p=u?._zod?.optout===`optional`;if(o.write(`const ${n} = ${s(r)};`),f&&p){let e=d===`optional`?`${n}_present`:`${n}.value !== undefined || ${n}_present`;o.write(`
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

      `)}return o.write(`payload.value = newResult;`),o.write(`return payload;`),o.compile()},o,s=Nt,c=!Mn.jitless,l=c&&Pt.value,u=t.catchall,d;e._zod.parse=(i,f)=>{d??=r.value;let p=i.value;return s(p)?c&&l&&f?.async===!1&&f.jitless!==!0?(o||=a(t.shape),i=o(i,f),u?Lr([],p,i,f,d,e,f?.abortEarly===!0):i):n(i,f):(i.issues.push({expected:`object`,code:`invalid_type`,input:p,inst:e}),i)}});function Br(e,t,n,r){for(let n of e)if(n.issues.length===0)return t.value=n.value,t;let i=e.filter(e=>!en(e));return i.length===1?(t.value=i[0].value,i[0]):(t.issues.push({code:`invalid_union`,input:t.value,inst:n,errors:e.map(e=>e.issues.map(e=>sn(e,r,Nn())))}),t)}var Vr=H(`$ZodUnion`,(e,t)=>{Sr.init(e,t),Sn(e,`optin`,e=>e.def.options.some(e=>e._zod.optin===`defaulted`)?`defaulted`:e.def.options.some(e=>e._zod.optin!==void 0)?`optional`:void 0),Sn(e,`optout`,e=>e.def.options.some(e=>e._zod.optout===`optional`)?`optional`:void 0),Sn(e,`values`,e=>{if(e.def.options.every(e=>e._zod.values))return new Set(e.def.options.flatMap(e=>Array.from(e._zod.values)))}),Sn(e,`pattern`,e=>{if(e.def.options.every(e=>e._zod.pattern)){let t=e.def.options.map(e=>e._zod.pattern);return RegExp(`^(${t.map(e=>xt(e.source)).join(`|`)})$`)}});let n=t.options.length===1?t.options[0]._zod.run:null;e._zod.parse=(r,i)=>{if(n)return n(r,i);let a=!1,o=[];for(let e of t.options){let t=e._zod.run({value:r.value,issues:[]},i);if(t instanceof Promise)o.push(t),a=!0;else{if(t.issues.length===0)return t;o.push(t)}}return a?Promise.all(o).then(t=>Br(t,r,e,i)):Br(o,r,e,i)}}),Hr=H(`$ZodIntersection`,(e,t)=>{Sr.init(e,t),e._zod.parse=(e,n)=>{let r=e.value,i=t.left._zod.run({value:r,issues:[]},n),a=t.right._zod.run({value:r,issues:[]},n);return i instanceof Promise||a instanceof Promise?Promise.all([i,a]).then(([t,n])=>Wr(e,t,n)):Wr(e,i,a)}});function Ur(e,t){if(e===t||e instanceof Date&&t instanceof Date&&+e==+t)return{valid:!0,data:e};if(Ft(e)&&Ft(t)){let n=Object.keys(t),r=Object.keys(e).filter(e=>n.indexOf(e)!==-1),i={...e,...t};Object.prototype.hasOwnProperty.call(i,`__proto__`)&&delete i.__proto__;for(let n of r){if(n===`__proto__`)continue;let r=Ur(e[n],t[n]);if(!r.valid)return{valid:!1,mergeErrorPath:[n,...r.mergeErrorPath]};i[n]=r.data}return{valid:!0,data:i}}if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return{valid:!1,mergeErrorPath:[]};let n=[];for(let r=0;r<e.length;r++){let i=e[r],a=t[r],o=Ur(i,a);if(!o.valid)return{valid:!1,mergeErrorPath:[r,...o.mergeErrorPath]};n.push(o.data)}return{valid:!0,data:n}}return{valid:!1,mergeErrorPath:[]}}function Wr(e,t,n){let r=new Map,i,a=new Map,o=(e,t)=>{let n;if(e.code===`unrecognized_keys`&&!e.path?.length)i??=e,n=e.keys;else if(e.code===`invalid_key`&&e.origin===`record`&&e.path?.length===1){let t=String(e.path[0]);a.has(t)||a.set(t,e),n=[t]}else return!1;for(let e of n)r.has(e)||r.set(e,{}),r.get(e)[t]=!0;return!0};for(let n of t.issues)o(n,`l`)||e.issues.push(n);for(let t of n.issues)o(t,`r`)||e.issues.push(t);let s=[...r].filter(([,e])=>e.l&&e.r).map(([e])=>e);if(s.length){let t=i?s.filter(e=>i.keys.includes(e)):[];t.length&&e.issues.push({...i,keys:t});for(let n of s)!t.includes(n)&&a.has(n)&&e.issues.push(a.get(n))}let c=Ur(t.value,n.value);if(!c.valid){if(en(e))return e;throw Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`)}return e.value=c.data,e}var Gr=H(`$ZodTuple`,(e,t)=>{Sr.init(e,t);let n=t.items,r=Mn.memoizer;r?.attach(e),e._zod.parse=(i,a)=>{let o=i.value;if(!Array.isArray(o))return i.issues.push({input:o,inst:e,expected:`tuple`,code:`invalid_type`}),i;i.value=r?r.alloc(e,i,[],a):[];let s=[],c=Kr(n,`optin`),l=Kr(n,`optout`);if(!t.rest){if(o.length<c)return i.issues.push({code:`too_small`,minimum:c,inclusive:!0,input:o,inst:e,origin:`array`}),i;o.length>n.length&&i.issues.push({code:`too_big`,maximum:n.length,inclusive:!0,input:o,inst:e,origin:`array`})}let u=Array(n.length),d=t.rest?a?.abortEarly:void 0,f=!1;for(let e=0;e<n.length;e++){let t=n[e]._zod.run({value:o[e],issues:[]},a);t instanceof Promise?s.push(t.then(t=>{u[e]=t})):(u[e]=t,d&&!f&&t.issues.length&&(f=en(t)))}if(t.rest&&!f){let e=n.length-1,r=o.slice(n.length),c=i.issues.length;for(let n of r){if(d&&i.issues.length!==c){if(en(i,c))break;c=i.issues.length}e++;let r=t.rest._zod.run({value:n,issues:[]},a);r instanceof Promise?s.push(r.then(t=>qr(t,i,e))):qr(r,i,e)}}return s.length?Promise.all(s).then(()=>Jr(u,i,n,o,l)):Jr(u,i,n,o,l)}});function Kr(e,t){for(let n=e.length-1;n>=0;n--)if(!(t===`optin`?e[n]._zod.optin!==void 0:e[n]._zod.optout===`optional`))return n+1;return 0}function qr(e,t,n){e.issues.length&&t.issues.push(...nn(n,e.issues)),t.value[n]=e.value}function Jr(e,t,n,r,i){for(let a=0;a<n.length;a++){let o=e[a],s=a<r.length;if(!s&&a>=i&&n[a]._zod.optin===`optional`){t.value.length=a;break}if(o.issues.length){if(!s&&a>=i){t.value.length=a;break}t.issues.push(...nn(a,o.issues))}t.value[a]=o.value}for(let e=t.value.length-1;e>=r.length&&n[e]._zod.optout===`optional`&&t.value[e]===void 0;e--)t.value.length=e;return t}var Yr=H(`$ZodEnum`,(e,t)=>{Sr.init(e,t);let n=ht(t.entries),r=new Set(n);e._zod.values=r,Sn(e,`pattern`,e=>{let t=ht(e.def.entries).filter(e=>Lt.has(typeof e));return RegExp(t.length?`^(${t.map(e=>Rt(e.toString())).join(`|`)})$`:`^[^\\s\\S]$`)}),e._zod.parse=(t,i)=>{let a=t.value;return r.has(a)||t.issues.push({code:`invalid_value`,values:n,input:a,inst:e}),t}}),Xr=H(`$ZodLiteral`,(e,t)=>{Sr.init(e,t);let n=new Set(t.values);e._zod.values=n,Sn(e,`pattern`,e=>{let t=e.def.values;return RegExp(t.length?`^(${t.map(e=>typeof e==`string`?Rt(e):e?Rt(e.toString()):String(e)).join(`|`)})$`:`^[^\\s\\S]$`)}),e._zod.parse=(r,i)=>{let a=r.value;return n.has(a)||r.issues.push({code:`invalid_value`,values:t.values,input:a,inst:e}),r}}),Zr=H(`$ZodTransform`,(e,t)=>{Sr.init(e,t),e._zod.optin=`optional`,Mn.memoizer?.guard(e),e._zod.parse=(n,r)=>{if(r.direction===`backward`)throw new jn(e.constructor.name);let i=t.transform(n.value,n);if(r.async)return(i instanceof Promise?i:Promise.resolve(i)).then(e=>(n.value=e,n));if(i instanceof Promise)throw new An;return n.value=i,n}});function Qr(e,t){return e.value=t.issues.length?void 0:t.value,e}var $r=H(`$ZodOptional`,(e,t)=>{Sr.init(e,t),Sn(e,`optin`,e=>e.def.innerType._zod.optin===`defaulted`?`defaulted`:`optional`),e._zod.optout=`optional`,Sn(e,`values`,e=>{let t=e.def.innerType._zod.values;return t?new Set([...t,void 0]):void 0}),Sn(e,`pattern`,e=>{let t=e.def.innerType._zod.pattern;return t?RegExp(`^(${xt(t.source)})?$`):void 0}),e._zod.parse=(e,n)=>{if(e.value===void 0){if(t.innerType._zod.optin!==`defaulted`)return e;let r=t.innerType._zod.run({value:e.value,issues:[]},n);return r instanceof Promise?r.then(t=>Qr(e,t)):Qr(e,r)}return t.innerType._zod.run(e,n)}}),ei=H(`$ZodExactOptional`,(e,t)=>{$r.init(e,t),Sn(e,`values`,e=>e.def.innerType._zod.values),Sn(e,`pattern`,e=>e.def.innerType._zod.pattern),e._zod.parse=(e,n)=>t.innerType._zod.run(e,n)}),ti=H(`$ZodNullable`,(e,t)=>{Sr.init(e,t),Sn(e,`optin`,e=>e.def.innerType._zod.optin),Sn(e,`optout`,e=>e.def.innerType._zod.optout),Sn(e,`pattern`,e=>{let t=e.def.innerType._zod.pattern;return t?RegExp(`^(${xt(t.source)}|null)$`):void 0}),Sn(e,`values`,e=>e.def.innerType._zod.values?new Set([...e.def.innerType._zod.values,null]):void 0),e._zod.parse=(e,n)=>e.value===null?e:t.innerType._zod.run(e,n)}),ni=H(`$ZodDefault`,(e,t)=>{Sr.init(e,t),e._zod.optin=`defaulted`,Sn(e,`values`,e=>e.def.innerType._zod.values),e._zod.parse=(e,n)=>{if(n.direction===`backward`)return t.innerType._zod.run(e,n);if(e.value===void 0)return e.value=t.defaultValue,e;let r=t.innerType._zod.run(e,n);return r instanceof Promise?r.then(e=>ri(e,t)):ri(r,t)}});function ri(e,t){return e.value===void 0&&(e.value=t.defaultValue),e}var ii=H(`$ZodPrefault`,(e,t)=>{Sr.init(e,t),e._zod.optin=`defaulted`,Sn(e,`values`,e=>e.def.innerType._zod.values),e._zod.parse=(e,n)=>(n.direction===`backward`||e.value===void 0&&(e.value=t.defaultValue),t.innerType._zod.run(e,n))}),ai=H(`$ZodNonOptional`,(e,t)=>{Sr.init(e,t),Sn(e,`values`,e=>{let t=e.def.innerType._zod.values;return t?new Set([...t].filter(e=>e!==void 0)):void 0}),e._zod.parse=(n,r)=>{let i=t.innerType._zod.run(n,r);return i instanceof Promise?i.then(t=>oi(t,e)):oi(i,e)}});function oi(e,t){return!e.issues.length&&e.value===void 0&&e.issues.push({code:`invalid_type`,expected:`nonoptional`,input:e.value,inst:t}),e}function si(e,t,n,r){return t.issues.length?(e.value=n.catchValue({...t,value:e.value,error:{issues:t.issues.map(e=>sn(e,r,Nn()))},input:e.value}),e):(e.value=t.value,t.memo&&(e.memo=!0),e)}var ci=H(`$ZodCatch`,(e,t)=>{Sr.init(e,t),Sn(e,`optin`,e=>e.def.innerType._zod.optin===`defaulted`?`defaulted`:`optional`),Sn(e,`optout`,e=>e.def.innerType._zod.optout),Sn(e,`values`,e=>e.def.innerType._zod.values),e._zod.parse=(e,n)=>{if(n.direction===`backward`)return t.innerType._zod.run(e,n);let r=t.innerType._zod.run({value:e.value,issues:[]},n);return r instanceof Promise?r.then(r=>si(e,r,t,n)):si(e,r,t,n)}}),li=H(`$ZodPipe`,(e,t)=>{Sr.init(e,t),Sn(e,`values`,e=>e.def.in._zod.values),Sn(e,`optin`,e=>e.def.in._zod.optin),Sn(e,`optout`,e=>e.def.out._zod.optout),Sn(e,`propValues`,e=>e.def.in._zod.propValues),e._zod.parse=(e,n)=>{if(n.direction===`backward`){let r=t.out._zod.run(e,n);return r instanceof Promise?r.then(e=>ui(e,t.in,n)):ui(r,t.in,n)}let r=t.in._zod.run(e,n);return r instanceof Promise?r.then(e=>ui(e,t.out,n)):ui(r,t.out,n)}});function ui(e,t,n){return e.issues.some(e=>e.code!==`unrecognized_keys`)?(e.aborted=!0,e):t._zod.run({value:e.value,issues:e.issues},n)}var di=H(`$ZodReadonly`,(e,t)=>{Sr.init(e,t),Sn(e,`propValues`,e=>e.def.innerType._zod.propValues),Sn(e,`values`,e=>e.def.innerType._zod.values),Sn(e,`optin`,e=>e.def.innerType?._zod?.optin),Sn(e,`optout`,e=>e.def.innerType?._zod?.optout),e._zod.parse=(e,n)=>{if(n.direction===`backward`)return t.innerType._zod.run(e,n);let r=t.innerType._zod.run(e,n);return r instanceof Promise?r.then(fi):fi(r)}});function fi(e){return e.memo||(e.value=Object.freeze(e.value)),e}var pi=H(`$ZodCustom`,(e,t)=>{lr.init(e,t),Sr.init(e,t),e._zod.parse=(e,t)=>e,e._zod.check=n=>{let r=n.value,i=t.fn(r);if(i instanceof Promise)return i.then(t=>mi(t,n,r,e));mi(i,n,r,e)}});function mi(e,t,n,r){if(!e){let e={code:`custom`,input:n,inst:r,path:[...r._zod.def.path??[]],continue:!r._zod.def.abort};r._zod.def.params&&(e.params=r._zod.def.params),t.issues.push(fn(e))}}var hi=class extends Error{constructor(){super(`Cannot parse a reference cycle that closes through a transform`),this.name=`ZodCyclicError`}},gi=`~memo`,_i=[];function vi(e){return typeof e==`object`&&!!e}function yi(e){return e.map(e=>e.path?{...e,path:e.path.slice()}:{...e})}var bi=new WeakMap,xi=0,Si=1,Ci=2;function wi(e,t,n){let r=bi.get(e);if(r!==void 0)return r?Ci:xi;if(t.has(e))return Ci;t.add(e);let i=xi,a=e=>{if(i!==Ci&&e?._zod){let r=wi(e,t,n);r>i&&(i=r)}},o=(e,r)=>{let i=xi;for(let a of Reflect.ownKeys(e)){let o=Object.getOwnPropertyDescriptor(e,a);if(r&&!o.enumerable)continue;let s=o.get?Si:o.value?._zod?wi(o.value,t,n):xi;s>i&&(i=s)}return i},s=e=>{e>i&&(i=e)},c=e._zod.def;switch(c.type){case`object`:{let e=wt(c);s(e?o(e,!0):Si),a(c.catchall);break}case`array`:a(c.element);break;case`tuple`:for(let e of c.items)a(e);a(c.rest);break;case`record`:case`map`:a(c.keyType),a(c.valueType);break;case`set`:a(c.valueType);break;case`union`:for(let e of c.options)a(e);break;case`intersection`:a(c.left),a(c.right);break;case`optional`:case`nullable`:case`default`:case`prefault`:case`catch`:case`readonly`:case`nonoptional`:case`promise`:case`success`:a(c.innerType);break;case`pipe`:a(c.in),a(c.out);break;case`function`:a(c.input),a(c.output);break;case`lazy`:{let r=c._cachedInner??(n?e._zod.innerType:void 0);s(r?wi(r,t,!1):Si);break}case`template_literal`:case`string`:case`number`:case`int`:case`boolean`:case`bigint`:case`symbol`:case`undefined`:case`null`:case`void`:case`never`:case`any`:case`unknown`:case`date`:case`nan`:case`enum`:case`literal`:case`file`:case`transform`:case`custom`:break;default:for(let e in c){let t=Object.getOwnPropertyDescriptor(c,e);if(!t||t.get)continue;let n=t.value;if(n&&typeof n==`object`){if(n._zod)a(n);else if(Array.isArray(n))for(let e of n)a(e)}}}return t.delete(e),Ti(e,i)}function Ti(e,t){return t!==Si&&bi.set(e,t===Ci),t}function Ei(e,t){let n=e.buckets.get(t);return n||(n=new WeakMap,e.buckets.set(t,n)),n}var Di,Oi=[],ki={alloc(e,t,n){let r=Di;if(!r)return n;Di=void 0;let i={value:n,issues:null};return r.set(t.value,i),Oi.push(i),n},guard(e){var t;(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred.push(()=>{let t=e._zod.parse,n=(e,n)=>{if(n.direction!==`backward`&&ji(n,e.value))throw new hi;return t(e,n)};e._zod.parse=n,e._zod.run===t&&(e._zod.run=n)})},attach(e){var t;let n,r=!1,i,a;(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred.push(()=>{let t=e._zod.parse,o=(s,c)=>{if(n===void 0){let i=wi(e,new Set,!1);if(i===xi)return e._zod.parse=t,e._zod.run===o&&(e._zod.run=t),t(s,c);i===Ci||r?n=!0:r=!0}let l=s.value;if(!vi(l))return t(s,c);let u=c[gi];u||(u={buckets:new WeakMap,backEdges:void 0},c[gi]=u);let d;i===c?d=a:(d=Ei(u,e),i=c,a=d);let f=d.get(l);if(f)return s.value=f.value,f.issues?f.issues.length&&s.issues.push(...yi(f.issues)):(s.memo=!0,u.backEdges??(u.backEdges=new WeakSet),u.backEdges.add(f.value)),s;Di=d;let p=Oi.length,m=t(s,c);Di=void 0;let h=Oi.length>p?Oi.pop():void 0;return m instanceof Promise?m.then(e=>(h&&(h.issues=e.issues.length?yi(e.issues):_i),e)):(h&&(h.issues=m.issues.length?yi(m.issues):_i),m)};e._zod.parse=o,e._zod.run===t&&(e._zod.run=o)})}};function Ai(){return ki}function ji(e,t){let n=e[gi]?.backEdges;return n!==void 0&&vi(t)&&n.has(t)}var Mi=()=>{let e={string:{unit:`characters`,verb:`to have`},file:{unit:`bytes`,verb:`to have`},array:{unit:`items`,verb:`to have`},set:{unit:`items`,verb:`to have`},map:{unit:`entries`,verb:`to have`}};function t(t){return e[t]??null}let n={regex:`input`,email:`email address`,url:`URL`,emoji:`emoji`,uuid:`UUID`,uuidv4:`UUIDv4`,uuidv6:`UUIDv6`,nanoid:`nanoid`,guid:`GUID`,cuid:`cuid`,cuid2:`cuid2`,ulid:`ULID`,xid:`XID`,ksuid:`KSUID`,datetime:`ISO datetime`,date:`ISO date`,time:`ISO time`,duration:`ISO duration`,ipv4:`IPv4 address`,ipv6:`IPv6 address`,mac:`MAC address`,cidrv4:`IPv4 range`,cidrv6:`IPv6 range`,base64:`base64-encoded string`,base64url:`base64url-encoded string`,json_string:`JSON string`,e164:`E.164 number`,currency_code:`currency code`,credit_card:`credit card number`,iban:`IBAN`,jwt:`JWT`,template_literal:`input`},r={nan:`NaN`};function i(e,t){return e===`number`&&typeof t==`number`&&!Number.isFinite(t)?String(t):r[e]??e}return e=>{switch(e.code){case`invalid_type`:return`Invalid input: expected ${i(e.expected)}, received ${i(dn(e.input),e.input)}`;case`invalid_value`:return e.values.length===1?`Invalid input: expected ${Vt(e.values[0])}`:`Invalid option: expected one of ${gt(e.values,`|`)}`;case`too_big`:{let n=e.exact?`exactly `:e.inclusive?`<=`:`<`,r=t(e.origin);return r?`Too big: expected ${e.origin??`value`} to have ${n}${e.maximum.toString()} ${r.unit??`elements`}`:`Too big: expected ${e.origin??`value`} to be ${n}${e.maximum.toString()}`}case`too_small`:{let n=e.exact?`exactly `:e.inclusive?`>=`:`>`,r=t(e.origin);return r?`Too small: expected ${e.origin} to have ${n}${e.minimum.toString()} ${r.unit}`:`Too small: expected ${e.origin} to be ${n}${e.minimum.toString()}`}case`invalid_format`:{let t=e;return t.format===`starts_with`?`Invalid string: must start with "${t.prefix}"`:t.format===`ends_with`?`Invalid string: must end with "${t.suffix}"`:t.format===`includes`?`Invalid string: must include "${t.includes}"`:t.format===`regex`?`Invalid string: must match pattern ${t.pattern}`:`Invalid ${n[t.format]??e.format}`}case`not_multiple_of`:return`Invalid number: must be a multiple of ${e.divisor}`;case`unrecognized_keys`:return`Unrecognized key${e.keys.length>1?`s`:``}: ${gt(e.keys,`, `)}`;case`invalid_key`:return`Invalid key in ${e.origin}`;case`invalid_union`:return e.options&&Array.isArray(e.options)&&e.options.length>0?`Invalid discriminator value. Expected ${e.options.map(e=>`'${e}'`).join(` | `)}`:e.inclusive===!1?`Invalid input: more than one option matched`:`Invalid input`;case`invalid_element`:return`Invalid value in ${e.origin}`;default:return`Invalid input`}}};function Ni(){return{localeError:Mi()}}var Pi,Fi=class{constructor(){this._map=new WeakMap,this._idmap=new Map}add(e,...t){let n=t[0];return this._map.set(e,n),n&&typeof n==`object`&&`id`in n&&this._idmap.set(n.id,e),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(e){let t=this._map.get(e);return t&&typeof t==`object`&&`id`in t&&this._idmap.delete(t.id),this._map.delete(e),this}get(e){let t=e._zod.parent;if(t){let n={...this.get(t)??{}};delete n.id;let r={...n,...this._map.get(e)};return Object.keys(r).length?r:void 0}return this._map.get(e)}has(e){return this._map.has(e)}};function Ii(){return new Fi}(Pi=globalThis).__zod_globalRegistry??(Pi.__zod_globalRegistry=Ii());var Li=globalThis.__zod_globalRegistry;function Ri(e){return e.checks&&=[...e.checks],e}function zi(e,t){return new e(Ri({type:`number`,checks:[],...Bt(t)}))}function Bi(e,t){return new e({type:`number`,check:`number_format`,abort:!1,format:`safeint`,...Bt(t)})}function Vi(e){return new e({type:`unknown`})}function Hi(e,t){return new e({type:`never`,...Bt(t)})}function Ui(e,t){return new fr({check:`less_than`,...Bt(t),value:e,inclusive:!1})}function Wi(e,t){return new fr({check:`less_than`,...Bt(t),value:e,inclusive:!0})}function Gi(e,t){return new pr({check:`greater_than`,...Bt(t),value:e,inclusive:!1})}function Ki(e,t){return new pr({check:`greater_than`,...Bt(t),value:e,inclusive:!0})}function qi(e,t){return new mr({check:`multiple_of`,...Bt(t),value:e})}function Ji(e,t){return new gr({check:`max_length`,...Bt(t),maximum:e})}function Yi(e,t){return new _r({check:`min_length`,...Bt(t),minimum:e})}function Xi(e,t){return new vr({check:`length_equals`,...Bt(t),length:e})}function Zi(e){return new yr({check:`overwrite`,tx:e})}function Qi(e,t,n){return new e({type:`array`,element:t,...Bt(n)})}function $i(e,t,n){return new e({type:`custom`,check:`custom`,fn:t,...Bt(n)})}function ea(e,t){let n=ta(t=>(t.addIssue=e=>{if(typeof e==`string`)t.issues.push(fn(e,t.value,n._zod.def));else{let r=e;r.fatal&&(r.continue=!1),r.code??=`custom`,`input`in r||(r.input=t.value),r.inst??=n,r.continue??=!n._zod.def.abort,t.issues.push(fn(r))}},e(t.value,t)),t);return n}function ta(e,t){let n=new lr({check:`custom`,...Bt(t)});return n._zod.check=e,n}function na(e,...t){for(let n of t)for(let t of Reflect.ownKeys(n))Object.prototype.propertyIsEnumerable.call(n,t)&&Ct(e,t,n[t]);return e}function ra(e){let t=e?.target??`draft-2020-12`;return t===`draft-4`&&(t=`draft-04`),t===`draft-7`&&(t=`draft-07`),{processors:e.processors??{},metadataRegistry:e?.metadata??Li,target:t,unrepresentable:e?.unrepresentable??`throw`,override:e?.override??(()=>{}),io:e?.io??`output`,counter:0,seen:new Map,sharedDefsExtractedFor:void 0,sharedEmitDoneFor:void 0,cycles:e?.cycles??`ref`,reused:e?.reused??`inline`,intersections:[],deferred:[],external:e?.external??void 0}}function ia(e,t,n,r,i){let a=typeof t.unrepresentable==`function`?t.unrepresentable({zodSchema:e,path:r.path,message:i}):t.unrepresentable;if(a===`any`)return!1;if(a===void 0||a===`throw`)throw Error(i);return Object.assign(n,a),!0}function aa(e,t,n={path:[],schemaPath:[]}){var r;let i=e._zod.def,a=t.seen.get(e);if(a)return a.count++,n.schemaPath.includes(e)&&(a.cycle=n.path),a.schema;let o={schema:{},count:1,cycle:void 0,path:n.path};t.seen.set(e,o),t.sharedDefsExtractedFor=void 0,t.sharedEmitDoneFor=void 0;let s=e._zod.toJSONSchema?.();if(s)o.schema=s;else{let r={...n,schemaPath:[...n.schemaPath,e],path:n.path};if(e._zod.processJSONSchema)e._zod.processJSONSchema(t,o.schema,r);else{let n=o.schema,a=t.processors[i.type];if(!a)throw Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);a(e,t,n,r)}let a=e._zod.parent;a&&(o.ref||=a,aa(a,t,r),t.seen.get(a).isParent=!0)}let c=t.metadataRegistry.get(e);return c&&na(o.schema,c),t.io===`input`&&ha(e)&&(delete o.schema.examples,delete o.schema.default),t.io===`input`&&`_prefault`in o.schema&&((r=o.schema).default??(r.default=o.schema._prefault)),delete o.schema._prefault,t.seen.get(e).schema}function oa(e){return e.replace(/~/g,`~0`).replace(/\//g,`~1`)}function sa(e,t){let n=e.seen.get(t);if(!n)throw Error(`Unprocessed schema. This is a bug in Zod.`);if(e.external&&e.sharedDefsExtractedFor===e.external)return;let r=new Map;for(let t of e.seen.entries()){let n=e.metadataRegistry.get(t[0])?.id;if(n){let e=r.get(n);if(e&&e!==t[0])throw Error(`Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);r.set(n,t[0])}}let i=t=>{let r=e.target===`draft-2020-12`?`$defs`:`definitions`;if(e.external){let n=e.external.registry.get(t[0])?.id,i=e.external.uri??(e=>e);if(n)return{ref:i(n)};let a=t[1].defId??t[1].schema.id??`schema${e.counter++}`;return t[1].defId=a,{defId:a,ref:`${i(`__shared`)}#/${r}/${oa(a)}`}}let i=`#/${r}/`;if(t[1]===n&&!t[1].schema.id)return{ref:`#`};let a=t[1].schema.id??`__schema${e.counter++}`;return{defId:a,ref:i+oa(a)}},a=e=>{if(e[1].schema.$ref)return;let t=e[1],{ref:n,defId:r}=i(e);t.def={...t.schema},r&&(t.defId=r);let a=t.schema;for(let e in a)delete a[e];a.$ref=n};if(e.cycles===`throw`)for(let t of e.seen.entries()){let e=t[1];if(e.cycle)throw Error(`Cycle detected: #/${e.cycle?.join(`/`)}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`)}for(let n of e.seen.entries()){let r=n[1];if(t===n[0])a(n);else{if(e.external){let r=e.external.registry.get(n[0])?.id;if(t!==n[0]&&r){a(n);continue}}(e.metadataRegistry.get(n[0])?.id||r.cycle||r.count>1&&e.reused===`ref`)&&a(n)}}e.external&&(e.sharedDefsExtractedFor=e.external)}function ca(e){let t=e.anyOf;if(!Array.isArray(t)||t.length===0||e.type!==void 0)return;let n=[];for(let e of t){if(!e||typeof e!=`object`)return;ca(e);let t=Object.keys(e);if(t.length!==1||t[0]!==`type`)return;let r=e.type;for(let e of Array.isArray(r)?r:[r]){if(typeof e!=`string`)return;n.includes(e)||n.push(e)}}delete e.anyOf,e.type=n.length===1?n[0]:n}var la=new Set([`type`,`properties`,`required`,`additionalProperties`]),ua=[`oneOf`,`anyOf`];function da(e){let t=e.additionalProperties;return t===void 0||t===!1||typeof t!=`object`||!t?null:Object.keys(t).length?t:null}function fa(e){let t=[];for(let n of e){if(typeof n!=`object`||n.type!==`object`)return null;for(let e in n)if(!la.has(e))return null;t.push(n)}let n={},r=new Set;for(let e of t){for(let r in e.properties){if(Object.prototype.hasOwnProperty.call(n,r))continue;let e=[];for(let n of t){let t=n.properties?.[r]??da(n);t!=null&&(e.some(e=>JSON.stringify(e)===JSON.stringify(t))||e.push(t))}Ct(n,r,e.length===1?e[0]:fa(e)??{allOf:e})}for(let t of e.required??[])r.add(t)}let i={type:`object`,properties:n};if(r.size&&(i.required=[...r]),t.every(e=>e.additionalProperties===!1))i.additionalProperties=!1;else{let e=[];for(let n of t){let t=da(n);t&&!e.some(e=>JSON.stringify(e)===JSON.stringify(t))&&e.push(t)}e.length===1?i.additionalProperties=e[0]:e.length>1&&(i.additionalProperties={allOf:e})}return i}function pa(e){let t=e.allOf;if(!Array.isArray(t)||t.length<2)return;for(let t of la)if(t in e)return;let n=t.filter(e=>ua.some(t=>Array.isArray(e[t]))),r=null;if(!n.length)r=fa(t);else{let e=n[0],i=ua.find(t=>Array.isArray(e[t]));if(Object.keys(e).length!==1)return;let a=t.filter(t=>t!==e),o=e[i].map(e=>fa([...a,e]));if(o.some(e=>!e))return;r={[i]:o}}r&&(delete e.allOf,na(e,r))}function ma(e,t){let n=e.seen.get(t);if(!n)throw Error(`Unprocessed schema. This is a bug in Zod.`);let r=t=>{let n=e.seen.get(t);if(n.ref===null)return;let i=n.def??n.schema,a={...i},o=n.ref;if(n.ref=null,o){r(o);let n=e.seen.get(o),s=n.schema;if(s.$ref&&(e.target===`draft-07`||e.target===`draft-04`||e.target===`openapi-3.0`)?(i.allOf=i.allOf??[],i.allOf.push(s)):na(i,s),na(i,a),t._zod.parent===o)for(let e in i)e!==`$ref`&&e!==`allOf`&&(e in a||delete i[e]);if(s.$ref&&n.def)for(let e in i)e!==`$ref`&&e!==`allOf`&&e in n.def&&JSON.stringify(i[e])===JSON.stringify(n.def[e])&&delete i[e]}let s=t._zod.parent;if(s&&s!==o){r(s);let t=e.seen.get(s);if(t?.schema.$ref&&(i.$ref=t.schema.$ref,t.def))for(let e in i)e!==`$ref`&&e!==`allOf`&&e in t.def&&JSON.stringify(i[e])===JSON.stringify(t.def[e])&&delete i[e]}e.override({zodSchema:t,jsonSchema:i,path:n.path??[]})};if(!e.external||e.sharedEmitDoneFor!==e.external){for(let t of[...e.seen.entries()].reverse())r(t[0]);if(e.target!==`openapi-3.0`)for(let t of e.seen.entries())ca(t[1].def??t[1].schema);for(let t of e.deferred)t();if(e.intersections.length){let t=new Map;for(let n of e.seen.values())for(let e of[n.schema,n.def]){let n=e?.allOf;if(!Array.isArray(n))continue;let r=t.get(n);r?r.push(e):t.set(n,[e])}for(let n of e.intersections)for(let e of t.get(n)??[])pa(e)}}let i={};if(e.target===`draft-2020-12`?i.$schema=`https://json-schema.org/draft/2020-12/schema`:e.target===`draft-07`?i.$schema=`http://json-schema.org/draft-07/schema#`:e.target===`draft-04`?i.$schema=`http://json-schema.org/draft-04/schema#`:e.target,e.external?.uri){let n=e.external.registry.get(t)?.id;if(!n)throw Error("Schema is missing an `id` property");i.$id=e.external.uri(n)}na(i,n.defId?n.schema:n.def??n.schema);let a=e.metadataRegistry.get(t)?.id;a!==void 0&&i.id===a&&delete i.id;let o=e.external?.defs??{};if(!e.external||e.sharedEmitDoneFor!==e.external)for(let t of e.seen.entries()){let e=t[1];e.def&&e.defId&&(e.def.id===e.defId&&delete e.def.id,Ct(o,e.defId,e.def))}e.external&&(e.sharedEmitDoneFor=e.external),e.external||Object.keys(o).length>0&&(e.target===`draft-2020-12`?i.$defs=o:i.definitions=o);try{let n=JSON.parse(JSON.stringify(i));return Object.defineProperty(n,"~standard",{value:{...t[`~standard`],jsonSchema:{input:_a(t,`input`,e.processors),output:_a(t,`output`,e.processors)}},enumerable:!1,writable:!1}),n}catch{throw Error(`Error converting schema to JSON.`)}}function ha(e,t){let n=t??{seen:new Set};if(n.seen.has(e))return!1;n.seen.add(e);let r=e._zod.def;if(r.type===`transform`)return!0;if(r.type===`array`)return ha(r.element,n);if(r.type===`set`)return ha(r.valueType,n);if(r.type===`lazy`)return ha(r.getter(),n);if(r.type===`promise`||r.type===`optional`||r.type===`nonoptional`||r.type===`nullable`||r.type===`readonly`||r.type==="default"||r.type===`prefault`||r.type===`catch`)return ha(r.innerType,n);if(r.type===`intersection`)return ha(r.left,n)||ha(r.right,n);if(r.type===`record`||r.type===`map`)return ha(r.keyType,n)||ha(r.valueType,n);if(r.type===`pipe`)return e._zod.traits.has(`$ZodCodec`)?!0:ha(r.in,n)||ha(r.out,n);if(r.type===`object`){for(let e in r.shape)if(ha(r.shape[e],n))return!0;return!1}if(r.type===`union`){for(let e of r.options)if(ha(e,n))return!0;return!1}if(r.type===`tuple`){for(let e of r.items)if(ha(e,n))return!0;return!!(r.rest&&ha(r.rest,n))}return!1}var ga=(e,t={})=>n=>{let r=ra({...n,processors:t});return aa(e,r),sa(r,e),ma(r,e)},_a=(e,t,n={})=>r=>{let{libraryOptions:i,target:a}=r??{},o=ra({...i??{},target:a,io:t,processors:n});return aa(e,o),sa(o,e),ma(o,e)},va=(e,t,n)=>{(e[t]===void 0||n>e[t])&&(e[t]=n)},ya=(e,t,n)=>{(e[t]===void 0||n<e[t])&&(e[t]=n)},ba=(e,t)=>{va(e,`minimum`,t),ya(e,`maximum`,t)},xa=(e,t)=>{e.multipleOf??=[],e.multipleOf.includes(t)||e.multipleOf.push(t)},Sa=(e,t)=>{e.patterns??=new Set,e.patterns.add(t)},Ca=(e,t)=>{e.mime=e.mime?e.mime.filter(e=>t.includes(e)):[...t]},wa=(e,t)=>{e.format=t,t.includes(`int`)&&(e.isInt=!0)},Ta=(e,t)=>va(e,`minimum`,t.minimum),Ea=(e,t)=>ya(e,`maximum`,t.maximum),Da=e=>(t,n)=>{wa(t,n.format);let[r,i]=e[n.format];va(t,`minimum`,r),ya(t,`maximum`,i)},Oa={greater_than:(e,t)=>va(e,t.inclusive?`minimum`:`exclusiveMinimum`,t.value),less_than:(e,t)=>ya(e,t.inclusive?`maximum`:`exclusiveMaximum`,t.value),multiple_of:(e,t)=>xa(e,t.value),number_format:Da(Ut),bigint_format:Da(Wt),min_length:Ta,max_length:Ea,length_equals:(e,t)=>ba(e,t.length),min_size:Ta,max_size:Ea,size_equals:(e,t)=>ba(e,t.size),string_format:(e,t)=>{wa(e,t.format),t.pattern&&Sa(e,t.pattern),(t.format===`base64`||t.format===`base64url`)&&(e.contentEncoding=t.format),(t.local||t.precision===-1)&&(e.laxFormat=!0)},mime_type:(e,t)=>Ca(e,t.mime)};function ka(e){let t={},n=e._zod.def,r=e._zod.traits.has(`$ZodCheck`)?[e,...n.checks??[]]:n.checks??[];for(let e of r)Oa[e._zod.def.check]?.(t,e._zod.def);let i=e._zod.bag;i.minimum!==void 0&&va(t,`minimum`,i.minimum),i.exclusiveMinimum!==void 0&&va(t,`exclusiveMinimum`,i.exclusiveMinimum),i.maximum!==void 0&&ya(t,`maximum`,i.maximum),i.exclusiveMaximum!==void 0&&ya(t,`exclusiveMaximum`,i.exclusiveMaximum),i.multipleOf!==void 0&&xa(t,i.multipleOf),i.format!==void 0&&(t.format??=i.format,i.format.includes(`int`)&&(t.isInt=!0)),i.mime&&Ca(t,i.mime);for(let e of i.patterns??[])Sa(t,e);return t}var Aa=(e,t,n,r)=>{let i=n,{minimum:a,maximum:o,multipleOf:s,exclusiveMaximum:c,exclusiveMinimum:l,isInt:u}=ka(e);i.type=u?`integer`:`number`;let d=typeof l==`number`&&l>=(a??-1/0),f=typeof c==`number`&&c<=(o??1/0),p=t.target===`draft-04`||t.target===`openapi-3.0`;if(d?p?(i.minimum=l,i.exclusiveMinimum=!0):i.exclusiveMinimum=l:typeof a==`number`&&(i.minimum=a),f?p?(i.maximum=c,i.exclusiveMaximum=!0):i.exclusiveMaximum=c:typeof o==`number`&&(i.maximum=o),s){let n=new Set;for(let a of s)Number.isFinite(a)&&a!==0?n.add(Math.abs(a)):ia(e,t,i,r,`A multipleOf divisor of ${a} cannot be represented in JSON Schema`);let[a,...o]=n;a!==void 0&&(i.multipleOf=a),o.length&&(i.allOf=[...i.allOf??[],...o.map(e=>({multipleOf:e}))])}},ja=(e,t,n,r)=>{n.not={}},Ma=(e,t,n,r)=>{let i=e._zod.def,a=ht(i.entries);a.length===0?n.not={}:(a.every(e=>typeof e==`number`)&&(n.type=`number`),a.every(e=>typeof e==`string`)&&(n.type=`string`),n.enum=a)},Na=(e,t,n,r)=>{let i=e._zod.def;if(i.values.length===0){n.not={};return}let a=[];for(let o of i.values)if(o===void 0){if(ia(e,t,n,r,"Literal `undefined` cannot be represented in JSON Schema"))return}else if(typeof o==`bigint`){if(ia(e,t,n,r,`BigInt literals cannot be represented in JSON Schema`))return;a.push(Number(o))}else a.push(o);if(a.length!==0){if(a.length===1){let e=a[0];n.type=e===null?`null`:typeof e,t.target===`draft-04`||t.target===`openapi-3.0`?n.enum=[e]:n.const=e}else a.every(e=>typeof e==`number`)&&(n.type=`number`),a.every(e=>typeof e==`string`)&&(n.type=`string`),a.every(e=>typeof e==`boolean`)&&(n.type=`boolean`),a.every(e=>e===null)&&(n.type=`null`),n.enum=a}},Pa=(e,t,n,r)=>{ia(e,t,n,r,`Custom types cannot be represented in JSON Schema`)},Fa=(e,t,n,r)=>{ia(e,t,n,r,`Transforms cannot be represented in JSON Schema`)},Ia=(e,t,n,r)=>{let i=n,a=e._zod.def,{minimum:o,maximum:s}=ka(e);typeof o==`number`&&(i.minItems=o),typeof s==`number`&&(i.maxItems=s),i.type=`array`,i.items=aa(a.element,t,{...r,path:[...r.path,`items`]})};function La(e){let t=e._zod.def;return t.type===`pipe`&&t.in._zod.traits.has(`$ZodTransform`)?La(t.out):t.type===`catch`?La(t.innerType):e._zod.optin}var Ra=(e,t,n,r)=>{let i=n,a=e._zod.def,o=a.shape;if(Object.getOwnPropertySymbols(o).length&&ia(e,t,i,r,`Symbol keys cannot be represented in JSON Schema`))return;i.type=`object`,i.properties={};for(let e in o)Ct(i.properties,e,aa(o[e],t,{...r,path:[...r.path,`properties`,e]}));let s=[];for(let e of Object.keys(o)){let n=a.shape[e];(t.io===`input`?La(n)===void 0:n._zod.optout===void 0)&&s.push(e)}s.length>0&&(i.required=s),a.catchall?._zod.def.type===`never`?i.additionalProperties=!1:a.catchall?a.catchall&&(i.additionalProperties=aa(a.catchall,t,{...r,path:[...r.path,`additionalProperties`]})):t.io===`output`&&(i.additionalProperties=!1)},za=(e,t,n,r)=>{let i=e._zod.def,a=i.inclusive===!1,o=i.options.map((e,n)=>aa(e,t,{...r,path:[...r.path,a?`oneOf`:`anyOf`,n]}));a?n.oneOf=o:n.anyOf=o},Ba=(e,t,n,r)=>{let i=e._zod.def,a=aa(i.left,t,{...r,path:[...r.path,`allOf`,0]}),o=aa(i.right,t,{...r,path:[...r.path,`allOf`,1]}),s=e=>`allOf`in e&&Object.keys(e).length===1,c=[...s(a)?a.allOf:[a],...s(o)?o.allOf:[o]];n.allOf=c,t.intersections.push(c)},Va=(e,t,n,r)=>{let i=n,a=e._zod.def;i.type=`array`;let o=t.target===`draft-2020-12`?`prefixItems`:`items`,s=t.target===`draft-2020-12`||t.target===`openapi-3.0`?`items`:`additionalItems`,c=a.items.map((e,n)=>aa(e,t,{...r,path:[...r.path,o,n]})),l=a.rest?aa(a.rest,t,{...r,path:[...r.path,s,...t.target===`openapi-3.0`?[a.items.length]:[]]}):null,u=a.items.length;for(;u>0;){let e=a.items[u-1];if(!(t.io===`input`?La(e)!==void 0:e._zod.optout===`optional`))break;u--}let d=a.items.length,f=!a.rest;t.target===`draft-2020-12`?(i.prefixItems=c,f?i.items=!1:l&&(i.items=l),u>0&&(i.minItems=u),f&&(i.maxItems=d)):t.target===`openapi-3.0`?(i.items={anyOf:c},l&&i.items.anyOf.push(l),u>0&&(i.minItems=u),f&&(i.maxItems=d)):(i.items=c,f?i.additionalItems=!1:l&&(i.additionalItems=l),u>0&&(i.minItems=u),f&&(i.maxItems=d));let{minimum:p,maximum:m}=ka(e);typeof p==`number`&&(i.minItems=p),typeof m==`number`&&(i.maxItems=m)},Ha=(e,t,n,r)=>{let i=e._zod.def,a=aa(i.innerType,t,r),o=t.seen.get(e);t.target===`openapi-3.0`?(o.ref=i.innerType,n.nullable=!0):n.anyOf=[a,{type:`null`}]},Ua=(e,t,n,r)=>{let i=e._zod.def;aa(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType},Wa=Symbol();function Ga(e,t,n,r,i){let a=!1,o=JSON.stringify(e,(e,t)=>typeof t==`bigint`?(a=!0,null):t);return a?(ia(t,n,r,i,`BigInt defaults cannot be represented in JSON Schema`),Wa):JSON.parse(o)}var Ka=(e,t,n,r)=>{let i=e._zod.def;aa(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType;let o=Ga(i.defaultValue,e,t,n,r);o!==Wa&&(n.default=o)},qa=(e,t,n,r)=>{let i=e._zod.def;aa(i.innerType,t,r);let a=t.seen.get(e);if(a.ref=i.innerType,t.io!==`input`)return;let o=Ga(i.defaultValue,e,t,n,r);o!==Wa&&(n._prefault=o)},Ja=(e,t,n,r)=>{let i=e._zod.def;aa(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType;let o;try{o=i.catchValue(void 0)}catch{ia(e,t,n,r,`Dynamic catch values are not supported in JSON Schema`);return}n.default=o},Ya=(e,t,n,r)=>{let i=e._zod.def,a=i.in._zod.traits.has(`$ZodTransform`),o=t.io===`input`?a?i.out:i.in:i.out;aa(o,t,r);let s=t.seen.get(e);s.ref=o},Xa=(e,t,n,r)=>{let i=e._zod.def;aa(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType,n.readOnly=!0},Za=(e,t,n,r)=>{let i=e._zod.def;aa(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType},Qa=new WeakSet([Object.prototype,Error.prototype]);function $a(e,t,n){Object.defineProperty(e,t,{configurable:!0,enumerable:!1,get(){let e=n(this);return Object.defineProperty(this,t,{value:e,configurable:!0,writable:!0}),e},set(e){Object.defineProperty(this,t,{value:e,configurable:!0,writable:!0})}})}var eo=H(`ZodError`,(e,t)=>{zn.init(e,t),e.name=`ZodError`;let n=Object.getPrototypeOf(e);Qa.has(n)||(Qa.add(n),$a(n,`format`,e=>t=>Hn(e,t)),$a(n,`flatten`,e=>t=>Vn(e,t)),$a(n,`addIssue`,e=>t=>{e.issues.push(t),e.message=JSON.stringify(e.issues,_t,2)}),$a(n,`addIssues`,e=>t=>{e.issues.push(...t),e.message=JSON.stringify(e.issues,_t,2)}),Object.defineProperty(n,"isEmpty",{configurable:!0,enumerable:!1,get(){return this.issues.length===0}}))},void 0,{Parent:Error}),to=Wn(eo),no=Gn(eo),ro=Kn(eo),io=Jn(eo),ao=er(eo),oo=tr(eo),so=nr(eo),co=rr(eo),lo=ir(eo),uo=ar(eo),fo=or(eo),po=sr(eo);function mo(){Mn.localeError||Nn(Ni())}function ho(){Mn.memoizer||Nn({memoizer:Ai()})}var go=H(`ZodType`,(e,t)=>(mo(),Sr.init(e,t),e.def=t,e.type=t.type,e),{check(...e){let t=this.def;return this.clone(At(t,{checks:[...t.checks??[],...e.map(e=>typeof e==`function`?{_zod:{check:e,def:{check:`custom`},onattach:[]}}:e)]}),{parent:!0})},with(...e){return this.check(...e)},clone(e,t){return zt(this,e,t)},brand(){return this},register(e,t){return e.add(this,t),this},refine(e,t){return this.check(os(e,t))},superRefine(e,t){return this.check(ss(e,t))},overwrite(e){return this.check(Zi(e))},optional(){return Ho(this)},exactOptional(){return Wo(this)},nullable(){return Ko(this)},nullish(){return Ho(Ko(this))},nonoptional(e){return Qo(this,e)},array(){return Eo(this)},or(e){return Ao([this,e])},and(e){return Mo(this,e)},transform(e){return ns(this,Bo(e))},default(e){return Jo(this,e)},prefault(e){return Xo(this,e)},catch(e){return es(this,e)},pipe(e){return ns(this,e)},readonly(){return is(this)},describe(e){let t=this.clone();return Li.add(t,{description:e}),t},meta(...e){if(e.length===0)return Li.get(this);let t=this.clone();return Li.add(t,e[0]),t},isOptional(){return this.safeParse(void 0).success},isNullable(){return this.safeParse(null).success},apply(e,...t){return t.length===0?e(this):e(this,...t)},get"~standard"(){return hn(this,`~standard`,{...Tr(this),jsonSchema:{input:_a(this,`input`),output:_a(this,`output`)}})},set"~standard"(e){mn(this,`~standard`,e)},parse:function e(t,n){return to(this,t,n,{callee:e})},parseAsync:async function e(t,n){return await no(this,t,n,{callee:e})},safeParse(e,t){return ro(this,e,t)},async safeParseAsync(e,t){return io(this,e,t)},get spa(){return this?.safeParseAsync},set spa(e){mn(this,`spa`,e)},validate(e,t){return Zn(this,e,t)},validateAsync(e,t){return $n(this,e,t)},encode:function e(t,n){return ao(this,t,n,{callee:e})},decode:function e(t,n){return oo(this,t,n,{callee:e})},encodeAsync:async function e(t,n){return await so(this,t,n,{callee:e})},decodeAsync:async function e(t,n){return await co(this,t,n,{callee:e})},safeEncode(e,t){return lo(this,e,t)},safeDecode(e,t){return uo(this,e,t)},async safeEncodeAsync(e,t){return fo(this,e,t)},async safeDecodeAsync(e,t){return po(this,e,t)},toJSONSchema(e){return ga(this,{})(e)},get description(){return Li.get(this)?.description},get _def(){return this._zod.def}}),_o=H(`ZodNumber`,(e,t)=>{Er.init(e,t),go.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Aa(e,t,n,r),e.isFinite=!0},gn({minValue:e=>{let{minimum:t,exclusiveMinimum:n}=ka(e);return Math.max(t??-1/0,n??-1/0)},maxValue:e=>{let{maximum:t,exclusiveMaximum:n}=ka(e);return Math.min(t??1/0,n??1/0)},isInt:e=>{let{isInt:t,multipleOf:n}=ka(e);return!!t||!!n?.some(Number.isSafeInteger)},format:e=>ka(e).format??null},{gt(e,t){return this.check(Gi(e,t))},gte(e,t){return this.check(Ki(e,t))},min(e,t){return this.check(Ki(e,t))},lt(e,t){return this.check(Ui(e,t))},lte(e,t){return this.check(Wi(e,t))},max(e,t){return this.check(Wi(e,t))},int(e){return this.check(bo(e))},safe(e){return this.check(bo(e))},positive(e){return this.check(Gi(0,e))},nonnegative(e){return this.check(Ki(0,e))},negative(e){return this.check(Ui(0,e))},nonpositive(e){return this.check(Wi(0,e))},multipleOf(e,t){return this.check(qi(e,t))},step(e,t){return this.check(qi(e,t))},finite(){return this}}));function vo(e){return zi(_o,e)}var yo=H(`ZodNumberFormat`,(e,t)=>{Dr.init(e,t),_o.init(e,t)});function bo(e){return Bi(yo,e)}var xo=H(`ZodUnknown`,(e,t)=>{Or.init(e,t),go.init(e,t),e._zod.processJSONSchema=(e,t,n)=>void 0});function So(){return Vi(xo)}var Co=H(`ZodNever`,(e,t)=>{kr.init(e,t),go.init(e,t),e._zod.processJSONSchema=(t,n,r)=>ja(e,t,n,r)});function wo(e){return Hi(Co,e)}var To=H(`ZodArray`,(e,t)=>{ho(),Nr.init(e,t),go.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Ia(e,t,n,r),e.element=t.element},{min(e,t){return this.check(Yi(e,t))},nonempty(e){return this.check(Yi(1,e))},max(e,t){return this.check(Ji(e,t))},length(e,t){return this.check(Xi(e,t))},unwrap(){return this.element}});function Eo(e,t){return Qi(To,e,t)}var Do=H(`ZodObject`,(e,t)=>{ho(),zr.init(e,t),go.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Ra(e,t,n,r),Cn(e,`shape`,e=>e._zod.def.shape,!1)},{keyof(){return Io(Object.keys(this._zod.def.shape))},catchall(e){return this.clone(At(this._zod.def,{catchall:e}))},passthrough(){return this.clone(At(this._zod.def,{catchall:So()}))},loose(){return this.clone(At(this._zod.def,{catchall:So()}))},strict(){return this.clone(At(this._zod.def,{catchall:wo()}))},strip(){return this.clone(At(this._zod.def,{catchall:void 0}))},extend(e){return Jt(this,e)},safeExtend(e){return Xt(this,e)},merge(e){return Zt(this,e)},pick(e){return Gt(this,e)},omit(e){return qt(this,e)},partial(...e){return Qt(Vo,this,e[0])},exactPartial(...e){return Qt(Uo,this,e[0],`exactPartial`)},required(...e){return $t(Zo,this,e[0])}});function Oo(e,t){return new Do({type:`object`,shape:e??{},...Bt(t)})}var ko=H(`ZodUnion`,(e,t)=>{Vr.init(e,t),go.init(e,t),e._zod.processJSONSchema=(t,n,r)=>za(e,t,n,r),e.options=t.options});function Ao(e,t){return new ko({type:`union`,options:e,...Bt(t)})}var jo=H(`ZodIntersection`,(e,t)=>{Hr.init(e,t),go.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Ba(e,t,n,r)});function Mo(e,t){return new jo({type:`intersection`,left:e,right:t})}var No=H(`ZodTuple`,(e,t)=>{ho(),Gr.init(e,t),go.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Va(e,t,n,r)},{rest(e){return this.clone({...this._zod.def,rest:e})},partial(){let e=this._zod.def;if(e.checks?.length)throw Error(`.partial() cannot be used on tuple schemas containing refinements`);return this.clone({...e,items:e.items.map(e=>new Vo({type:`optional`,innerType:e}))})}});function Po(e,t,n){let r=t instanceof Sr;return new No({type:`tuple`,items:e,rest:r?t:null,...Bt(r?n:t)})}var Fo=H(`ZodEnum`,(e,t)=>{Yr.init(e,t),go.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Ma(e,t,n,r),e.enum=t.entries,e.options=[...e._zod.values];let n=new Set(Object.keys(t.entries));e.extract=(e,r)=>{let i={};for(let r of e)if(n.has(r))i[r]=t.entries[r];else throw Error(`Key ${r} not found in enum`);return new Fo({...t,checks:[],...Bt(r),entries:i})},e.exclude=(e,r)=>{let i={...t.entries};for(let t of e)if(n.has(t))delete i[t];else throw Error(`Key ${t} not found in enum`);return new Fo({...t,checks:[],...Bt(r),entries:i})}});function Io(e,t){return new Fo({type:`enum`,entries:Array.isArray(e)?Object.fromEntries(e.map(e=>[e,e])):e,...Bt(t)})}var Lo=H(`ZodLiteral`,(e,t)=>{Xr.init(e,t),go.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Na(e,t,n,r),e.values=new Set(t.values),Object.defineProperty(e,"value",{get(){if(t.values.length>1)throw Error("This schema contains multiple valid literal values. Use `.values` instead.");return t.values[0]}})});function Ro(e,t){return new Lo({type:`literal`,values:Array.isArray(e)?e:[e],...Bt(t)})}var zo=H(`ZodTransform`,(e,t)=>{ho(),Zr.init(e,t),go.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Fa(e,t,n,r),e._zod.parse=(n,r)=>{if(r.direction===`backward`)throw new jn(e.constructor.name);n.addIssue=r=>{if(typeof r==`string`)n.issues.push(fn(r,n.value,t));else{let t=r;t.fatal&&(t.continue=!1),t.code??=`custom`,`input`in t||(t.input=n.value),t.inst??=e,n.issues.push(fn(t))}};let i=t.transform(n.value,n);return i instanceof Promise?i.then(e=>(n.value=e,n)):(n.value=i,n)}});function Bo(e){return new zo({type:`transform`,transform:e})}var Vo=H(`ZodOptional`,(e,t)=>{$r.init(e,t),go.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Za(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function Ho(e){return new Vo({type:`optional`,innerType:e})}var Uo=H(`ZodExactOptional`,(e,t)=>{ei.init(e,t),go.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Za(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function Wo(e){return new Uo({type:`optional`,innerType:e})}var Go=H(`ZodNullable`,(e,t)=>{ti.init(e,t),go.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Ha(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function Ko(e){return new Go({type:`nullable`,innerType:e})}var qo=H(`ZodDefault`,(e,t)=>{ni.init(e,t),go.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Ka(e,t,n,r),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});function Jo(e,t){return new qo({type:`default`,innerType:e,get defaultValue(){return typeof t==`function`?t():It(t)}})}var Yo=H(`ZodPrefault`,(e,t)=>{ii.init(e,t),go.init(e,t),e._zod.processJSONSchema=(t,n,r)=>qa(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function Xo(e,t){return new Yo({type:`prefault`,innerType:e,get defaultValue(){return typeof t==`function`?t():It(t)}})}var Zo=H(`ZodNonOptional`,(e,t)=>{ai.init(e,t),go.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Ua(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function Qo(e,t){return new Zo({type:`nonoptional`,innerType:e,...Bt(t)})}var $o=H(`ZodCatch`,(e,t)=>{ci.init(e,t),go.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Ja(e,t,n,r),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});function es(e,t){return new $o({type:`catch`,innerType:e,catchValue:typeof t==`function`?t:Tn(t)})}var ts=H(`ZodPipe`,(e,t)=>{li.init(e,t),go.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Ya(e,t,n,r),e.in=t.in,e.out=t.out});function ns(e,t){return new ts({type:`pipe`,in:e,out:t})}var rs=H(`ZodReadonly`,(e,t)=>{di.init(e,t),go.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Xa(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function is(e){return new rs({type:`readonly`,innerType:e})}var as=H(`ZodCustom`,(e,t)=>{pi.init(e,t),go.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Pa(e,t,n,r)});function os(e,t={}){return $i(as,e,t)}function ss(e,t){return ea(e,t)}var cs=class{aabb;slopeAxis;rise;slip;roofId;constructor(e,t,n,r,i){this.aabb=e,this.slopeAxis=t,this.rise=n,this.slip=r,this.roofId=i}},ls=class{aabb;ridgeAxis;rampA;rampB;constructor(e,t,n,r){this.aabb=e,this.ridgeAxis=t,this.rampA=n,this.rampB=r}},us=class{id;px;py;pz;constructor(e,t,n,r){this.id=e,this.px=t,this.py=n,this.pz=r}},ds=class{solids;ramps;roofs;anchors;spawn;spawnYaw;killPlaneY;goal;pads;route;style;constructor(){this.solids=[],this.ramps=[],this.roofs=[],this.anchors=[],this.spawn=new f(0,0,0),this.spawnYaw=0,this.killPlaneY=0,this.goal=new r(new f(0,0,0),new f(0,0,0)),this.pads=[],this.route=[],this.style=[]}};function fs(e,t){return e.solids.push(t),e.solids.length-1}function ps(e,t,n,r){return e.ramps.push(new cs(t,n,r,0,-1)),e.ramps.length-1}function ms(e,t,n){let i=e.roofs.length,a=t.max.y-t.min.y,o=t.min,s=t.max,c,l,u,d;if(n===1){let e=(o.x+s.x)*.5;c=new r(new f(o.x,o.y,o.z),new f(e,s.y,s.z)),l=new r(new f(e,o.y,o.z),new f(s.x,s.y,s.z)),u=0,d=1}else{let e=(o.z+s.z)*.5;c=new r(new f(o.x,o.y,o.z),new f(s.x,s.y,e)),l=new r(new f(o.x,o.y,e),new f(s.x,s.y,s.z)),u=2,d=3}e.ramps.push(new cs(c,u,a,1,i));let p=e.ramps.length-1;e.ramps.push(new cs(l,d,a,1,i));let m=e.ramps.length-1;return e.roofs.push(new ls(t,n,p,m)),i}function hs(e,t,n,r){let i=e.anchors.length;return e.anchors.push(new us(i,t,n,r)),i}var gs=Po([vo(),vo(),vo()]);function _s(e){return e.min[0]<=e.max[0]&&e.min[1]<=e.max[1]&&e.min[2]<=e.max[2]}var vs=Oo({min:gs,max:gs}).refine(_s,{message:`min must be <= max on every axis`}),ys=Oo({min:gs,max:gs,slopeAxis:vo().int().min(0).max(3),rise:vo()}).refine(_s,{message:`min must be <= max on every axis`}).refine(e=>e.rise>0,{message:`rise must be > 0`}),bs=Oo({min:gs,max:gs,ridge:vo().int().min(0).max(1)}).refine(_s,{message:`min must be <= max on every axis`}).refine(e=>e.max[1]>e.min[1],{message:`ridge must be above the eave`}).refine(e=>e.max[0]>e.min[0]&&e.max[2]>e.min[2],{message:`footprint must have area`}),xs=Oo({pos:gs}),Ss=Oo({version:Ro(1),spawn:gs,spawnYaw:vo(),killPlaneY:vo(),solids:Eo(vs),ramps:Eo(ys),roofs:Eo(bs).optional(),anchors:Eo(xs),goal:vs.optional(),pads:Eo(vs).optional(),route:Eo(vo().int()).optional(),style:Eo(vo().int()).optional()});function Cs(e){let t=[];for(let n of e.issues){let e=`(root)`;n.path.length>0&&(e=n.path.join(`.`)),t.push(e+`: `+n.message)}return`invalid test world: `+t.join(`; `)}function ws(e){return new f(e[0],e[1],e[2])}function Ts(e){let t;try{t=JSON.parse(e)}catch(e){let t=e instanceof Error?e.message:String(e);throw Error(`invalid JSON: `+t,{cause:e})}return Es(t)}function Es(e){let t=Ss.safeParse(e);if(!t.success)throw Error(Cs(t.error));let n=t.data,i=new ds;i.spawn=ws(n.spawn),i.spawnYaw=n.spawnYaw,i.killPlaneY=n.killPlaneY;for(let e=0;e<n.solids.length;e++){let t=n.solids[e];fs(i,new r(ws(t.min),ws(t.max)))}for(let e=0;e<n.ramps.length;e++){let t=n.ramps[e];ps(i,new r(ws(t.min),ws(t.max)),t.slopeAxis,t.rise)}if(n.roofs!==void 0)for(let e=0;e<n.roofs.length;e++){let t=n.roofs[e];ms(i,new r(ws(t.min),ws(t.max)),t.ridge)}for(let e=0;e<n.anchors.length;e++){let t=n.anchors[e];hs(i,t.pos[0],t.pos[1],t.pos[2])}if(n.goal!==void 0&&(i.goal=new r(ws(n.goal.min),ws(n.goal.max))),n.pads!==void 0)for(let e=0;e<n.pads.length;e++){let t=n.pads[e];i.pads.push(new r(ws(t.min),ws(t.max)))}if(n.route!==void 0)for(let e=0;e<n.route.length;e++)i.route.push(n.route[e]);if(n.style!==void 0)for(let e=0;e<n.style.length;e++)i.style.push(n.style[e]);return i}var Ds=.0025,Os={Space:1,ShiftLeft:4,ShiftRight:4,ControlLeft:4,ControlRight:4,KeyE:2,KeyQ:4,KeyR:8},ks={KeyD:1,ArrowRight:1,KeyA:-1,ArrowLeft:-1},As={KeyW:1,ArrowUp:1,KeyS:-1,ArrowDown:-1};function js(e){if(!(e instanceof HTMLElement))return!1;let t=e.tagName;return t===`INPUT`||t===`TEXTAREA`||t===`SELECT`||e.isContentEditable}var Ms=class{target;heldKeys=new Set;mouseHeld=0;locked=!1;dragFallback=!1;accYaw=0;accPitch=0;pressedPending=0;constructor(e){this.target=e,typeof e.requestPointerLock!=`function`&&(this.dragFallback=!0),e.addEventListener(`pointerdown`,this.onPointerDown),e.addEventListener(`pointermove`,this.onPointerMove),e.addEventListener(`pointerup`,this.onPointerUp),e.addEventListener(`pointercancel`,this.onPointerUp),e.addEventListener(`click`,this.onClick),e.addEventListener(`contextmenu`,this.onContextMenu),window.addEventListener(`pointerup`,this.onPointerUp),window.addEventListener(`pointercancel`,this.onPointerUp),window.addEventListener(`keydown`,this.onKeyDown),window.addEventListener(`keyup`,this.onKeyUp),window.addEventListener(`blur`,this.onBlur),document.addEventListener(`pointerlockchange`,this.onLockChange),document.addEventListener(`pointerlockerror`,this.onLockError)}sample(e){ue(e);let t=0,n=0,r=0;for(let e of this.heldKeys){let i=ks[e];i!==void 0&&(t+=i);let a=As[e];a!==void 0&&(n+=a);let o=Os[e];o!==void 0&&(r|=o)}e.moveX=F(t),e.moveY=F(n);let i=fe(this.accYaw),a=fe(this.accPitch);this.accYaw-=pe(i),this.accPitch-=pe(a),e.lookYaw=i,e.lookPitch=a,e.buttons=r|this.mouseBits(),e.pressed=this.pressedPending,this.pressedPending=0}dispose(){this.target.removeEventListener(`pointerdown`,this.onPointerDown),this.target.removeEventListener(`pointermove`,this.onPointerMove),this.target.removeEventListener(`pointerup`,this.onPointerUp),this.target.removeEventListener(`pointercancel`,this.onPointerUp),this.target.removeEventListener(`click`,this.onClick),this.target.removeEventListener(`contextmenu`,this.onContextMenu),window.removeEventListener(`pointerup`,this.onPointerUp),window.removeEventListener(`pointercancel`,this.onPointerUp),window.removeEventListener(`keydown`,this.onKeyDown),window.removeEventListener(`keyup`,this.onKeyUp),window.removeEventListener(`blur`,this.onBlur),document.removeEventListener(`pointerlockchange`,this.onLockChange),document.removeEventListener(`pointerlockerror`,this.onLockError)}mouseBits(){let e=0,t=!!(this.mouseHeld&1),n=!!(this.mouseHeld&4);return t&&(e|=2),n&&(e|=40),e}onPointerDown=e=>{let t=this.mouseBits();this.mouseHeld|=1<<e.button;try{this.target.setPointerCapture(e.pointerId)}catch{}this.pressedPending|=this.mouseBits()&~t};onPointerMove=e=>{(this.locked||this.dragFallback&&this.mouseHeld!==0)&&(this.accYaw+=e.movementX*Ds,this.accPitch+=-e.movementY*Ds)};onPointerUp=e=>{this.mouseHeld&=~(1<<e.button)};onClick=()=>{if(!(this.locked||this.dragFallback)){if(typeof this.target.requestPointerLock!=`function`)this.dragFallback=!0;else try{let e=this.target.requestPointerLock();typeof e==`object`&&e&&`catch`in e&&e.catch(()=>{this.dragFallback=!0})}catch{this.dragFallback=!0}}};onContextMenu=e=>{e.preventDefault()};onLockChange=()=>{this.locked=document.pointerLockElement===this.target};onLockError=()=>{this.locked=!1,this.dragFallback=!0};onKeyDown=e=>{if(js(e.target))return;let t=e.code,n=t===`ControlLeft`||t===`ControlRight`;if(e.ctrlKey&&!n||e.metaKey||e.altKey)return;let r=Os[t],i=ks[t],a=As[t];(r!==void 0||i!==void 0||a!==void 0)&&(e.preventDefault(),e.repeat||this.heldKeys.has(t)||(this.heldKeys.add(t),r!==void 0&&(this.pressedPending|=r)))};onKeyUp=e=>{this.heldKeys.delete(e.code)};onBlur=()=>{this.heldKeys.clear(),this.mouseHeld=0}},Ns=.004,Ps=64,Fs=250,Is=10,Ls=80,Rs=300,zs=1,Bs=2,Vs=3,Hs=4,Us=class{stickActive=!1;stickOriginX=0;stickOriginY=0;stickX=0;stickY=0;tapPending=!1;tapNdcX=0;tapNdcY=0;stickId=-1;lookId=-1;actionId=-1;jumpId=-1;roles=new Map;lookLastX=0;lookLastY=0;lookStartX=0;lookStartY=0;lookStartTime=0;lookMaxDevPx=0;accYaw=0;accPitch=0;pressedPending=0;root;stickZone;lookZone;btnAction;btnJump;stickBase=null;stickKnob=null;constructor(e){if(this.root=e,this.stickZone=e.querySelector(`#stick-zone`),this.lookZone=e.querySelector(`#look-zone`),this.btnAction=e.querySelector(`#btn-action`),this.btnJump=e.querySelector(`#btn-jump`),this.stickZone!==null){this.stickBase=document.createElement(`div`),this.stickBase.id=`stick-base`,this.stickKnob=document.createElement(`div`),this.stickKnob.id=`stick-knob`;for(let e of[`up`,`right`,`down`,`left`]){let t=document.createElement(`i`);t.className=`chev `+e,t.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 14l4-4 4 4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,this.stickBase.appendChild(t)}this.stickZone.appendChild(this.stickBase),this.stickZone.appendChild(this.stickKnob),this.stickZone.addEventListener(`pointerdown`,this.onStickDown),this.stickZone.addEventListener(`pointermove`,this.onStickMove),this.stickZone.addEventListener(`pointerup`,this.onStickUp),this.stickZone.addEventListener(`pointercancel`,this.onStickCancel)}this.lookZone!==null&&(this.lookZone.addEventListener(`pointerdown`,this.onLookDown),this.lookZone.addEventListener(`pointermove`,this.onLookMove),this.lookZone.addEventListener(`pointerup`,this.onLookUp),this.lookZone.addEventListener(`pointercancel`,this.onLookCancel)),this.btnAction!==null&&(this.btnAction.addEventListener(`pointerdown`,this.onActionDown),this.btnAction.addEventListener(`pointerup`,this.onActionUp),this.btnAction.addEventListener(`pointercancel`,this.onActionCancel)),this.btnJump!==null&&(this.btnJump.addEventListener(`pointerdown`,this.onJumpDown),this.btnJump.addEventListener(`pointerup`,this.onJumpUp),this.btnJump.addEventListener(`pointercancel`,this.onJumpCancel)),window.addEventListener(`blur`,this.onBlur),e.addEventListener(`contextmenu`,this.onContextMenu)}sample(e){ue(e),e.moveX=F(this.stickX),e.moveY=F(this.stickY);let t=fe(this.accYaw),n=fe(this.accPitch);this.accYaw-=pe(t),this.accPitch-=pe(n),e.lookYaw=t,e.lookPitch=n;let r=0;this.actionId!==-1&&(r|=64),this.jumpId!==-1&&(r|=1),e.buttons=r,e.pressed=this.pressedPending,this.pressedPending=0}reset(){for(let e of this.roles.keys())this.releaseCapture(e);this.roles.clear(),this.stickId=-1,this.lookId=-1,this.actionId=-1,this.jumpId=-1,this.releaseStick(),this.accYaw=0,this.accPitch=0,this.pressedPending=0,this.tapPending=!1,this.lookMaxDevPx=0,this.render()}render(){if(this.stickBase===null||this.stickKnob===null)return;if(!this.stickActive){this.stickBase.classList.add(`ghost`),this.stickKnob.classList.add(`ghost`),this.stickBase.style.display=`block`,this.stickKnob.style.display=`block`,this.stickBase.style.left=``,this.stickBase.style.top=``,this.stickKnob.style.left=``,this.stickKnob.style.top=``;return}this.stickBase.classList.remove(`ghost`),this.stickKnob.classList.remove(`ghost`);let e=this.stickOriginX,t=this.stickOriginY;this.stickBase.style.display=`block`,this.stickBase.style.left=e+`px`,this.stickBase.style.top=t+`px`,this.stickKnob.style.display=`block`,this.stickKnob.style.left=e+this.stickX*Ps+`px`,this.stickKnob.style.top=t-this.stickY*Ps+`px`}dispose(){this.stickZone!==null&&(this.stickZone.removeEventListener(`pointerdown`,this.onStickDown),this.stickZone.removeEventListener(`pointermove`,this.onStickMove),this.stickZone.removeEventListener(`pointerup`,this.onStickUp),this.stickZone.removeEventListener(`pointercancel`,this.onStickCancel)),this.lookZone!==null&&(this.lookZone.removeEventListener(`pointerdown`,this.onLookDown),this.lookZone.removeEventListener(`pointermove`,this.onLookMove),this.lookZone.removeEventListener(`pointerup`,this.onLookUp),this.lookZone.removeEventListener(`pointercancel`,this.onLookCancel)),this.btnAction!==null&&(this.btnAction.removeEventListener(`pointerdown`,this.onActionDown),this.btnAction.removeEventListener(`pointerup`,this.onActionUp),this.btnAction.removeEventListener(`pointercancel`,this.onActionCancel)),this.btnJump!==null&&(this.btnJump.removeEventListener(`pointerdown`,this.onJumpDown),this.btnJump.removeEventListener(`pointerup`,this.onJumpUp),this.btnJump.removeEventListener(`pointercancel`,this.onJumpCancel)),window.removeEventListener(`blur`,this.onBlur),this.root.removeEventListener(`contextmenu`,this.onContextMenu),this.stickBase?.remove(),this.stickKnob?.remove(),this.roles.clear(),this.releaseStick(),this.lookId=-1,this.actionId=-1,this.jumpId=-1}capture(e,t){try{e.setPointerCapture(t.pointerId)}catch{}}releaseCapture(e){for(let t of[this.stickZone,this.lookZone,this.btnAction,this.btnJump])try{t!==null&&t.hasPointerCapture(e)&&t.releasePointerCapture(e)}catch{}}releaseStick(){this.stickActive=!1,this.stickX=0,this.stickY=0}onStickDown=e=>{this.stickId===-1&&this.stickZone!==null&&(e.preventDefault(),this.stickId=e.pointerId,this.roles.set(e.pointerId,zs),this.capture(this.stickZone,e),this.stickActive=!0,this.stickOriginX=e.clientX,this.stickOriginY=e.clientY,this.stickX=0,this.stickY=0)};onStickMove=e=>{if(e.pointerId!==this.stickId)return;let t=e.clientX-this.stickOriginX,n=e.clientY-this.stickOriginY,r=t/Ps,i=-n/Ps,a=Math.sqrt(r*r+i*i);a>1&&(r/=a,i/=a),this.stickX=r,this.stickY=i};onStickUp=e=>{e.pointerId===this.stickId&&(this.roles.delete(e.pointerId),this.stickId=-1,this.releaseStick())};onStickCancel=e=>{e.pointerId===this.stickId&&(this.roles.delete(e.pointerId),this.stickId=-1,this.releaseStick())};onLookDown=e=>{this.lookId===-1&&this.lookZone!==null&&(e.preventDefault(),this.lookId=e.pointerId,this.roles.set(e.pointerId,Bs),this.capture(this.lookZone,e),this.lookLastX=e.clientX,this.lookLastY=e.clientY,this.lookStartX=e.clientX,this.lookStartY=e.clientY,this.lookStartTime=e.timeStamp,this.lookMaxDevPx=0)};onLookMove=e=>{if(e.pointerId!==this.lookId)return;let t=e.clientX-this.lookLastX,n=e.clientY-this.lookLastY;this.lookLastX=e.clientX,this.lookLastY=e.clientY,this.accYaw+=t*Ns,this.accPitch+=-n*Ns;let r=e.clientX-this.lookStartX,i=e.clientY-this.lookStartY,a=Math.sqrt(r*r+i*i);a>this.lookMaxDevPx&&(this.lookMaxDevPx=a)};onLookUp=e=>{if(e.pointerId!==this.lookId)return;this.roles.delete(e.pointerId),this.lookId=-1;let t=e.timeStamp-this.lookStartTime,n=e.clientY-this.lookStartY,r=Math.max(this.lookMaxDevPx,Math.abs(n));if(n>Ls&&t<=Rs)this.pressedPending|=4;else if(t<Fs&&r<Is&&this.lookZone!==null){let t=this.lookZone.getBoundingClientRect(),n=t.width>0?t.width:1,r=t.height>0?t.height:1;this.tapNdcX=(e.clientX-t.left)/n*2-1,this.tapNdcY=1-(e.clientY-t.top)/r*2,this.tapPending=!0}};onLookCancel=e=>{e.pointerId===this.lookId&&(this.roles.delete(e.pointerId),this.lookId=-1)};onActionDown=e=>{this.actionId===-1&&this.btnAction!==null&&(e.preventDefault(),this.actionId=e.pointerId,this.roles.set(e.pointerId,Vs),this.capture(this.btnAction,e),this.pressedPending|=64)};onActionUp=e=>{e.pointerId===this.actionId&&(this.roles.delete(e.pointerId),this.actionId=-1)};onActionCancel=e=>{e.pointerId===this.actionId&&(this.roles.delete(e.pointerId),this.actionId=-1)};onJumpDown=e=>{this.jumpId===-1&&this.btnJump!==null&&(e.preventDefault(),this.jumpId=e.pointerId,this.roles.set(e.pointerId,Hs),this.capture(this.btnJump,e),this.pressedPending|=1)};onJumpUp=e=>{e.pointerId===this.jumpId&&(this.roles.delete(e.pointerId),this.jumpId=-1)};onJumpCancel=e=>{e.pointerId===this.jumpId&&(this.roles.delete(e.pointerId),this.jumpId=-1)};onContextMenu=e=>{e.preventDefault()};onBlur=()=>{this.reset()}},Ws=.8,Gs=.25,Ks=.02,qs=1e-4,Js=.09,Ys=900,Xs=300,Zs=.25,Qs=.02,$s=.12,ec=.12,tc=180,nc=90,rc=1200,ic=.35,ac=.03,oc=.2,sc=.12,cc=.14,lc=.2,uc=.5,dc=110,fc=45,pc=.35,mc=220,hc=50,gc=800,_c=.4;function vc(e,t){let n=Math.max(1,Math.floor(e.sampleRate*t)),r=e.createBuffer(1,n,e.sampleRate),i=r.getChannelData(0);for(let e=0;e<i.length;e++)i[e]=Math.random()*2-1;return r}function yc(e,t,n,r){e.gain.setValueAtTime(t,n),e.gain.exponentialRampToValueAtTime(qs,n+r)}function bc(e,t,n,r,i,a,o,s,c){let l=e.createOscillator();l.type=n,l.frequency.setValueAtTime(r,a),l.frequency.exponentialRampToValueAtTime(i,a+o);let u=l;if(c!==null){let t=e.createBiquadFilter();t.type=`lowpass`,t.frequency.value=c,l.connect(t),u=t}let d=e.createGain();yc(d,s,a,o),u.connect(d),d.connect(t),l.start(a),l.stop(a+o+Ks)}function xc(e,t,n,r,i,a){let o=e.createBufferSource();o.buffer=n;let s=e.createGain();yc(s,a,r,i),o.connect(s),s.connect(t),o.start(r),o.stop(r+i+Ks)}var Sc=class{ctx=null;master=null;noise=null;unlock(){if(this.ctx!==null)this.ctx.resume().catch(()=>void 0);else try{let e=window.AudioContext;if(typeof e!=`function`)return;let t=new e,n=t.createGain();n.gain.value=Ws,n.connect(t.destination);let r=vc(t,Gs);this.ctx=t,this.master=n,this.noise=r,t.resume().catch(()=>void 0)}catch{this.ctx=null,this.master=null,this.noise=null}}fire(){let e=this.noise;this.run((t,n,r)=>{bc(t,n,`sine`,Ys,Xs,r,Js,Zs,null),e!==null&&xc(t,n,e,r,Qs,$s)})}attach(){let e=this.noise;this.run((t,n,r)=>{bc(t,n,`square`,tc,nc,r,ec,ic,rc),e!==null&&xc(t,n,e,r,ac,oc)})}land(e){let t=Math.min(1,Math.max(0,Number.isFinite(e)?e:0)),n=sc+cc*t,r=lc+uc*t;this.run((e,t,i)=>{bc(e,t,`sine`,dc,fc,i,n,r,null)})}die(){this.run((e,t,n)=>{bc(e,t,`sawtooth`,mc,hc,n,pc,_c,gc)})}wind(e){let t=this.noise,n=Math.min(1,Math.max(0,Number.isFinite(e)?e:0));t===null||n<=.02||this.run((e,r,i)=>{xc(e,r,t,i,.2,.05+.25*n)})}roar(){this.run((e,t,n)=>{bc(e,t,`sawtooth`,120,38,n,.9,.45,500),bc(e,t,`square`,70,30,n,1.1,.25,300)})}dispose(){let e=this.ctx;if(this.ctx=null,this.master=null,this.noise=null,e!==null)try{e.close().catch(()=>void 0)}catch{}}run(e){let t=this.ctx,n=this.master;if(t!==null&&n!==null&&t.state!==`closed`)try{e(t,n,t.currentTime)}catch{}}},Cc=Math.PI/180,wc=2,Tc=class{pos=new f(0,0,0);lookAt=new f(0,0,0);focus=new f(0,0,0);arm=0;yaw=0;pitch=0;fov=0;initialized=0},Ec=new i,Dc=new f(0,0,0),Oc=new f(0,0,0);function kc(e,t,n){return e<t?t:e>n?n:e}function Ac(e,t,n,r,i,a,o,s){let c=s===void 0?Ec:s,l=kc(i/o.fovSpeed,0,1),u=r-o.downhillBias*Cc*l;u=kc(u,o.pitchMin*Cc,o.pitchMax*Cc);let f=o.fov+(o.fovMax-o.fov)*l;if(e.initialized===0)e.initialized=1,e.focus.x=t.x,e.focus.y=t.y,e.focus.z=t.z,e.fov=f,e.arm=o.dist;else{let n=o.smooth;e.focus.x+=(t.x-e.focus.x)*n,e.focus.y+=(t.y-e.focus.y)*n,e.focus.z+=(t.z-e.focus.z)*n,e.fov+=(f-e.fov)*n}e.yaw=n,e.pitch=u;let p=Math.sin(e.yaw),m=Math.cos(e.yaw),h=Math.sin(e.pitch),g=Math.cos(e.pitch),_=e.focus.x,v=e.focus.y+o.height,y=e.focus.z,b=_-p*g*o.dist+m*o.shoulder,x=v-h*o.dist,S=y+m*g*o.dist+p*o.shoulder,C=b-_,w=x-v,T=S-y,E=Math.sqrt(C*C+w*w+T*T),D=E;if(E>0){Dc.x=_,Dc.y=v-o.probeRadius,Dc.z=y,Oc.x=C,Oc.y=w,Oc.z=T;let e=1;for(let t=0;t<a.length;t++)d(Dc,wc*o.probeRadius,o.probeRadius,Oc,a[t],c),c.hit&&(c.t===0&&c.nx*C+c.ny*w+c.nz*T>=0||c.t<e&&(e=c.t));D=E*e}D<e.arm?e.arm=D:e.arm+=(D-e.arm)*o.armRelease,e.arm>E&&(e.arm=E);let O=E>0?e.arm/E:0;e.pos.x=_+C*O,e.pos.y=v+w*O,e.pos.z=y+T*O,e.lookAt.x=_,e.lookAt.y=v,e.lookAt.z=y}var jc=`attached`,Mc=1e3,Nc=1001,Pc=1002,Fc=1003,Ic=1004,Lc=1005,Rc=1006,zc=1007,Bc=1008,Vc=1009,Hc=1010,Uc=1011,Wc=1012,Gc=1013,Kc=1014,qc=1015,Jc=1016,Yc=1017,Xc=1018,Zc=1020,Qc=35902,$c=35899,el=1021,tl=1022,nl=1023,rl=1026,il=1027,al=1028,ol=1029,sl=1030,cl=1031,ll=1033,ul=33776,dl=33777,fl=33778,pl=33779,ml=35840,hl=35841,gl=35842,_l=35843,vl=36196,yl=37492,bl=37496,xl=37488,Sl=37489,Cl=37490,wl=37491,Tl=37808,El=37809,Dl=37810,Ol=37811,kl=37812,Al=37813,jl=37814,Ml=37815,Nl=37816,Pl=37817,Fl=37818,Il=37819,Ll=37820,Rl=37821,zl=36492,Bl=36494,Vl=36495,Hl=36283,Ul=36284,Wl=36285,Gl=36286,Kl=2300,ql=2301,Jl=2302,Yl=2303,Xl=2400,Zl=2401,Ql=2402,$l=3200,eu=`srgb`,tu=`srgb-linear`,nu=`linear`,ru=`srgb`,iu=7680,au=35044,ou=35048,su=2e3;function cu(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function lu(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function uu(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function du(){let e=uu(`canvas`);return e.style.display=`block`,e}var fu={};function pu(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function mu(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function U(...e){e=mu(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function W(...e){e=mu(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function hu(...e){let t=e.join(` `);t in fu||(fu[t]=!0,U(...e))}function gu(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var _u={0:0,2:6,4:4,3:5,1:1,6:2,7:7,5:3},vu=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},yu=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),bu=Math.PI/180,xu=180/Math.PI;function Su(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(yu[e&255]+yu[e>>8&255]+yu[e>>16&255]+yu[e>>24&255]+`-`+yu[t&255]+yu[t>>8&255]+`-`+yu[t>>16&15|64]+yu[t>>24&255]+`-`+yu[n&63|128]+yu[n>>8&255]+`-`+yu[n>>16&255]+yu[n>>24&255]+yu[r&255]+yu[r>>8&255]+yu[r>>16&255]+yu[r>>24&255]).toLowerCase()}function Cu(e,t,n){return Math.max(t,Math.min(n,e))}function wu(e,t){return(e%t+t)%t}function Tu(e,t,n){return(1-n)*e+n*t}function Eu(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Du(e){switch(e.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Ou(e,t){if(t.constructor===Float32Array)return e;let n=Du(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.max(e/n,-1)}function ku(e,t){if(t.constructor===Float32Array)return e;let n=Du(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.round(e*n)}var G=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Cu(this.x,e.x,t.x),this.y=Cu(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Cu(this.x,e,t),this.y=Cu(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Cu(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Cu(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Au=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:U(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Cu(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},K=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Mu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Mu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Cu(this.x,e.x,t.x),this.y=Cu(this.y,e.y,t.y),this.z=Cu(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Cu(this.x,e,t),this.y=Cu(this.y,e,t),this.z=Cu(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Cu(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ju.copy(this).projectOnVector(e),this.sub(ju)}reflect(e){return this.sub(ju.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Cu(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ju=new K,Mu=new Au,q=class{static{this.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return hu(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Nu.makeScale(e,t)),this}rotate(e){return hu(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Nu.makeRotation(-e)),this}translate(e,t){return hu(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Nu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Nu=new q,Pu=new q().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fu=new q().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Iu(){let e={enabled:!0,workingColorSpace:tu,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=Ru(e.r),e.g=Ru(e.g),e.b=Ru(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=zu(e.r),e.g=zu(e.g),e.b=zu(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?nu:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[n].fromXYZ).multiply(this.spaces[t].toXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[tu]:{primaries:t,whitePoint:r,transfer:nu,toXYZ:Pu,fromXYZ:Fu,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:eu},outputColorSpaceConfig:{drawingBufferColorSpace:eu}},[eu]:{primaries:t,whitePoint:r,transfer:ru,toXYZ:Pu,fromXYZ:Fu,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:eu}}}),e}var Lu=Iu();function Ru(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function zu(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Bu,Vu=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Bu===void 0&&(Bu=uu(`canvas`)),Bu.width=e.width,Bu.height=e.height;let t=Bu.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Bu}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=uu(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Ru(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Ru(t[e]/255)*255):t[e]=Ru(t[e]);return{data:t,width:e.width,height:e.height}}return U(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Hu=0,Uu=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Hu++}),this.uuid=Su(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width||0,t.height||0,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Wu(r[t].image)):e.push(Wu(r[t]))}else e=Wu(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Wu(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Vu.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(U(`Texture: Unable to serialize Texture.`),{})}var Gu=0,Ku=new K,qu=class e extends vu{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=Nc,i=Nc,a=Rc,o=Bc,s=nl,c=Vc,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gu++}),this.uuid=Su(),this.name=``,this.source=new Uu(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new G(0,0),this.repeat=new G(1,1),this.center=new G(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new q,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Ku).x}get height(){return this.source.getSize(Ku).y}get depth(){return this.source.getSize(Ku).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){U(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?U(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Mc:e.x-=Math.floor(e.x);break;case Nc:e.x=e.x<0?0:1;break;case Pc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Mc:e.y-=Math.floor(e.y);break;case Nc:e.y=e.y<0?0:1;break;case Pc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};qu.DEFAULT_IMAGE=null,qu.DEFAULT_MAPPING=300,qu.DEFAULT_ANISOTROPY=1;var Ju=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Cu(this.x,e.x,t.x),this.y=Cu(this.y,e.y,t.y),this.z=Cu(this.z,e.z,t.z),this.w=Cu(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Cu(this.x,e,t),this.y=Cu(this.y,e,t),this.z=Cu(this.z,e,t),this.w=Cu(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Cu(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Yu=class extends vu{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rc,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ju(0,0,e,t),this.scissorTest=!1,this.viewport=new Ju(0,0,e,t),this.textures=[];let r=n.count;for(let i=0;i<r;i++)this.textures[i]=new qu({width:e,height:t,depth:n.depth}),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Rc,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Uu(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Xu=class extends Yu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Zu=class extends qu{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Fc,this.minFilter=Fc,this.wrapR=Nc,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Qu=class extends qu{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Fc,this.minFilter=Fc,this.wrapR=Nc,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},J=class e{static{this.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/$u.setFromMatrixColumn(e,0).length(),i=1/$u.setFromMatrixColumn(e,1).length(),a=1/$u.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(td,e,nd)}lookAt(e,t,n){let r=this.elements;return ad.subVectors(e,t),ad.lengthSq()===0&&(ad.z=1),ad.normalize(),rd.crossVectors(n,ad),rd.lengthSq()===0&&(Math.abs(n.z)===1?ad.x+=1e-4:ad.z+=1e-4,ad.normalize(),rd.crossVectors(n,ad)),rd.normalize(),id.crossVectors(ad,rd),r[0]=rd.x,r[4]=id.x,r[8]=ad.x,r[1]=rd.y,r[5]=id.y,r[9]=ad.y,r[2]=rd.z,r[6]=id.z,r[10]=ad.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],ee=r[7],te=r[11],P=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*ee,i[8]=a*C+o*D+s*j+c*te,i[12]=a*w+o*O+s*M+c*P,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*ee,i[9]=l*C+u*D+d*j+f*te,i[13]=l*w+u*O+d*M+f*P,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*ee,i[10]=p*C+m*D+h*j+g*te,i[14]=p*w+m*O+h*M+g*P,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*ee,i[11]=_*C+v*D+y*j+b*te,i[15]=_*w+v*O+y*M+b*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=$u.set(r[0],r[1],r[2]).length(),o=$u.set(r[4],r[5],r[6]).length(),s=$u.set(r[8],r[9],r[10]).length();i<0&&(a=-a),ed.copy(this);let c=1/a,l=1/o,u=1/s;return ed.elements[0]*=c,ed.elements[1]*=c,ed.elements[2]*=c,ed.elements[4]*=l,ed.elements[5]*=l,ed.elements[6]*=l,ed.elements[8]*=u,ed.elements[9]*=u,ed.elements[10]*=u,t.setFromRotationMatrix(ed),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=su,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=su,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},$u=new K,ed=new J,td=new K(0,0,0),nd=new K(1,1,1),rd=new K,id=new K,ad=new K,od=new J,sd=new Au,cd=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(Cu(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-Cu(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(Cu(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-Cu(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(Cu(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-Cu(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:U(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return od.makeRotationFromQuaternion(e),this.setFromRotationMatrix(od,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return sd.setFromEuler(this),this.setFromQuaternion(sd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};cd.DEFAULT_ORDER=`XYZ`;var ld=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},ud=0,dd=new K,fd=new Au,pd=new J,md=new K,hd=new K,gd=new K,_d=new Au,vd=new K(1,0,0),yd=new K(0,1,0),bd=new K(0,0,1),xd={type:`added`},Sd={type:`removed`},Cd={type:`childadded`,child:null},wd={type:`childremoved`,child:null},Td=class e extends vu{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ud++}),this.uuid=Su(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new K,n=new cd,r=new Au,i=new K(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new J},normalMatrix:{value:new q}}),this.matrix=new J,this.matrixWorld=new J,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ld,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fd.setFromAxisAngle(e,t),this.quaternion.multiply(fd),this}rotateOnWorldAxis(e,t){return fd.setFromAxisAngle(e,t),this.quaternion.premultiply(fd),this}rotateX(e){return this.rotateOnAxis(vd,e)}rotateY(e){return this.rotateOnAxis(yd,e)}rotateZ(e){return this.rotateOnAxis(bd,e)}translateOnAxis(e,t){return dd.copy(e).applyQuaternion(this.quaternion),this.position.add(dd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(vd,e)}translateY(e){return this.translateOnAxis(yd,e)}translateZ(e){return this.translateOnAxis(bd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pd.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?md.copy(e):md.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),hd.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pd.lookAt(hd,md,this.up):pd.lookAt(md,hd,this.up),this.quaternion.setFromRotationMatrix(pd),r&&(pd.extractRotation(r.matrixWorld),fd.setFromRotationMatrix(pd),this.quaternion.premultiply(fd.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(W(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(xd),Cd.child=e,this.dispatchEvent(Cd),Cd.child=null):W(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Sd),wd.child=e,this.dispatchEvent(wd),wd.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pd.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pd.multiply(e.parent.matrixWorld)),e.applyMatrix4(pd),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(xd),Cd.child=e,this.dispatchEvent(Cd),Cd.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hd,e,gd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hd,_d,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Td.DEFAULT_UP=new K(0,1,0),Td.DEFAULT_MATRIX_AUTO_UPDATE=!0,Td.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ed=class extends Td{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Dd={type:`move`},Od=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ed,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ed,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ed,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.quaternion,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.quaternion,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Dd)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ed;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},kd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ad={h:0,s:0,l:0},jd={h:0,s:0,l:0};function Md(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Y=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=eu){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Lu.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Lu.workingColorSpace){return this.r=e,this.g=t,this.b=n,Lu.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Lu.workingColorSpace){if(e=wu(e,1),t=Cu(t,0,1),n=Cu(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Md(i,r,e+1/3),this.g=Md(i,r,e),this.b=Md(i,r,e-1/3)}return Lu.colorSpaceToWorking(this,r),this}setStyle(e,t=eu){function n(t){t!==void 0&&parseFloat(t)<1&&U(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseFloat(i[1]))/100,Math.min(100,parseFloat(i[2]))/100,Math.min(100,parseFloat(i[3]))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:U(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);U(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=eu){let n=kd[e.toLowerCase()];return n===void 0?U(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ru(e.r),this.g=Ru(e.g),this.b=Ru(e.b),this}copyLinearToSRGB(e){return this.r=zu(e.r),this.g=zu(e.g),this.b=zu(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=eu){return Lu.workingToColorSpace(Nd.copy(this),e),Math.round(Cu(Nd.r*255,0,255))*65536+Math.round(Cu(Nd.g*255,0,255))*256+Math.round(Cu(Nd.b*255,0,255))}getHexString(e=eu){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Lu.workingColorSpace){Lu.workingToColorSpace(Nd.copy(this),t);let n=Nd.r,r=Nd.g,i=Nd.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Lu.workingColorSpace){return Lu.workingToColorSpace(Nd.copy(this),t),e.r=Nd.r,e.g=Nd.g,e.b=Nd.b,e}getStyle(e=eu){Lu.workingToColorSpace(Nd.copy(this),e);let t=Nd.r,n=Nd.g,r=Nd.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Ad),this.setHSL(Ad.h+e,Ad.s+t,Ad.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ad),e.getHSL(jd);let n=Tu(Ad.h,jd.h,t),r=Tu(Ad.s,jd.s,t),i=Tu(Ad.l,jd.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Nd=new Y;Y.NAMES=kd;var Pd=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new Y(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Fd=class extends Td{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new cd,this.environmentIntensity=1,this.environmentRotation=new cd,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background===null?null:e.background.clone(),this.environment=e.environment===null?null:e.environment.clone(),this.fog=e.fog===null?null:e.fog.clone(),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial===null?null:e.overrideMaterial.clone(),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Id=new K,Ld=new K,Rd=new K,zd=new K,Bd=new K,Vd=new K,Hd=new K,Ud=new K,Wd=new K,Gd=new K,Kd=new Ju,qd=new Ju,Jd=new Ju,Yd=class e{constructor(e=new K,t=new K,n=new K){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Id.subVectors(e,t),r.cross(Id);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Id.subVectors(r,t),Ld.subVectors(n,t),Rd.subVectors(e,t);let a=Id.dot(Id),o=Id.dot(Ld),s=Id.dot(Rd),c=Ld.dot(Ld),l=Ld.dot(Rd),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,zd)!==null&&zd.x>=0&&zd.y>=0&&zd.x+zd.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,zd)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,zd.x),s.addScaledVector(a,zd.y),s.addScaledVector(o,zd.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Kd.setScalar(0),qd.setScalar(0),Jd.setScalar(0),Kd.fromBufferAttribute(e,t),qd.fromBufferAttribute(e,n),Jd.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Kd,i.x),a.addScaledVector(qd,i.y),a.addScaledVector(Jd,i.z),a}static isFrontFacing(e,t,n,r){return Id.subVectors(n,t),Ld.subVectors(e,t),Id.cross(Ld).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Id.subVectors(this.c,this.b),Ld.subVectors(this.a,this.b),Id.cross(Ld).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Bd.subVectors(r,n),Vd.subVectors(i,n),Ud.subVectors(e,n);let s=Bd.dot(Ud),c=Vd.dot(Ud);if(s<=0&&c<=0)return t.copy(n);Wd.subVectors(e,r);let l=Bd.dot(Wd),u=Vd.dot(Wd);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0&&s-l>0)return a=s/(s-l),t.copy(n).addScaledVector(Bd,a);Gd.subVectors(e,i);let f=Bd.dot(Gd),p=Vd.dot(Gd);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Vd,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Hd.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Hd,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Bd,a).addScaledVector(Vd,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Xd=class{constructor(e=new K(1/0,1/0,1/0),t=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Qd.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Qd.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Qd.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Qd):Qd.fromBufferAttribute(r,t),Qd.applyMatrix4(e.matrixWorld),this.expandByPoint(Qd);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),$d.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),$d.copy(e.boundingBox)),$d.applyMatrix4(e.matrixWorld),this.union($d)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Qd),Qd.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(sf),cf.subVectors(this.max,sf),ef.subVectors(e.a,sf),tf.subVectors(e.b,sf),nf.subVectors(e.c,sf),rf.subVectors(tf,ef),af.subVectors(nf,tf),of.subVectors(ef,nf);let t=[0,-rf.z,rf.y,0,-af.z,af.y,0,-of.z,of.y,rf.z,0,-rf.x,af.z,0,-af.x,of.z,0,-of.x,-rf.y,rf.x,0,-af.y,af.x,0,-of.y,of.x,0];return!df(t,ef,tf,nf,cf)||(t=[1,0,0,0,1,0,0,0,1],!df(t,ef,tf,nf,cf))?!1:(lf.crossVectors(rf,af),t=[lf.x,lf.y,lf.z],df(t,ef,tf,nf,cf))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qd).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qd).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Zd[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Zd[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Zd[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Zd[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Zd[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Zd[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Zd[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Zd[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Zd)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Zd=[new K,new K,new K,new K,new K,new K,new K,new K],Qd=new K,$d=new Xd,ef=new K,tf=new K,nf=new K,rf=new K,af=new K,of=new K,sf=new K,cf=new K,lf=new K,uf=new K;function df(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){uf.fromArray(e,a);let o=i.x*Math.abs(uf.x)+i.y*Math.abs(uf.y)+i.z*Math.abs(uf.z),s=t.dot(uf),c=n.dot(uf),l=r.dot(uf);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var ff=new K,pf=new G,mf=0,hf=class extends vu{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:mf++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=au,this.updateRanges=[],this.gpuType=qc,this.version=0,this._normalizationScale=e===void 0?void 0:Du(e)}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)pf.fromBufferAttribute(this,t),pf.applyMatrix3(e),this.setXY(t,pf.x,pf.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ff.fromBufferAttribute(this,t),ff.applyMatrix3(e),this.setXYZ(t,ff.x,ff.y,ff.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ff.fromBufferAttribute(this,t),ff.applyMatrix4(e),this.setXYZ(t,ff.x,ff.y,ff.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ff.fromBufferAttribute(this,t),ff.applyNormalMatrix(e),this.setXYZ(t,ff.x,ff.y,ff.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ff.fromBufferAttribute(this,t),ff.transformDirection(e),this.setXYZ(t,ff.x,ff.y,ff.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}_denormalize(e){let t=this._normalizationScale;return t===void 0?Ou(e,this.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?ku(e,this.array):Math.round(e*t)}},gf=class extends hf{constructor(e,t,n){super(new Uint16Array(e),t,n)}},_f=class extends hf{constructor(e,t,n){super(new Uint32Array(e),t,n)}},X=class extends hf{constructor(e,t,n){super(new Float32Array(e),t,n)}},vf=new Xd,yf=new K,bf=new K,xf=class{constructor(e=new K,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?vf.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;yf.subVectors(e,this.center);let t=yf.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(yf,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(bf.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(yf.copy(e.center).add(bf)),this.expandByPoint(yf.copy(e.center).sub(bf))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Sf=0,Cf=new J,wf=new Td,Tf=new K,Ef=new Xd,Df=new Xd,Of=new K,kf=class e extends vu{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=Su(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(cu(e)?_f:gf)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new q().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Cf.makeRotationFromQuaternion(e),this.applyMatrix4(Cf),this}rotateX(e){return Cf.makeRotationX(e),this.applyMatrix4(Cf),this}rotateY(e){return Cf.makeRotationY(e),this.applyMatrix4(Cf),this}rotateZ(e){return Cf.makeRotationZ(e),this.applyMatrix4(Cf),this}translate(e,t,n){return Cf.makeTranslation(e,t,n),this.applyMatrix4(Cf),this}scale(e,t,n){return Cf.makeScale(e,t,n),this.applyMatrix4(Cf),this}lookAt(e){return wf.lookAt(e),wf.updateMatrix(),this.applyMatrix4(wf.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Tf).negate(),this.translate(Tf.x,Tf.y,Tf.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new X(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&U(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xd);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)W(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Ef.setFromBufferAttribute(n),this.morphTargetsRelative?(Of.addVectors(this.boundingBox.min,Ef.min),this.boundingBox.expandByPoint(Of),Of.addVectors(this.boundingBox.max,Ef.max),this.boundingBox.expandByPoint(Of)):(this.boundingBox.expandByPoint(Ef.min),this.boundingBox.expandByPoint(Ef.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&W(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xf);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)W(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new K,1/0);else if(e){let n=this.boundingSphere.center;if(Ef.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Df.setFromBufferAttribute(n),this.morphTargetsRelative?(Of.addVectors(Ef.min,Df.min),Ef.expandByPoint(Of),Of.addVectors(Ef.max,Df.max),Ef.expandByPoint(Of)):(Ef.expandByPoint(Df.min),Ef.expandByPoint(Df.max))}Ef.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Of.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Of));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Of.fromBufferAttribute(a,t),o&&(Tf.fromBufferAttribute(e,t),Of.add(Tf)),r=Math.max(r,n.distanceToSquared(Of))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&W(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){W(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new hf(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[],c=new Uint8Array(n.count);for(let e=0;e<n.count;e++)o[e]=new K,s[e]=new K;let l=new K,u=new K,d=new K,f=new G,p=new G,m=new G,h=new K,g=new K;function _(e,t,r){c[e]=c[t]=c[r]=1,l.fromBufferAttribute(n,e),u.fromBufferAttribute(n,t),d.fromBufferAttribute(n,r),f.fromBufferAttribute(i,e),p.fromBufferAttribute(i,t),m.fromBufferAttribute(i,r),u.sub(l),d.sub(l),p.sub(f),m.sub(f);let a=1/(p.x*m.y-m.x*p.y);isFinite(a)&&(h.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(a),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(a),o[e].add(h),o[t].add(h),o[r].add(h),s[e].add(g),s[t].add(g),s[r].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let t=0,n=v.length;t<n;++t){let n=v[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)_(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let y=new K,b=new K,x=new K,S=new K;function C(e){x.fromBufferAttribute(r,e),S.copy(x);let t=o[e];y.copy(t),y.sub(x.multiplyScalar(x.dot(t))).normalize(),b.crossVectors(S,t);let n=b.dot(s[e])<0?-1:1;a.setXYZW(e,y.x,y.y,y.z,n)}for(let e=0,t=n.count;e<t;++e)c[e]&&C(e);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new hf(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new K,i=new K,a=new K,o=new K,s=new K,c=new K,l=new K,u=new K;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Of.fromBufferAttribute(e,t),Of.normalize(),e.setXYZ(t,Of.x,Of.y,Of.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new hf(a,r,i)}if(this.index===null)return U(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Af=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=au,this.updateRanges=[],this.version=0,this.uuid=Su()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=jf(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),r=new this.constructor(n,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=jf(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function jf(e){return e.buffer._uuid===void 0&&(e.buffer._uuid=Su()),e.byteOffset===0&&e.byteLength===e.buffer.byteLength?e.buffer._uuid:e.buffer._uuid+`:`+e.byteOffset+`:`+e.byteLength}var Mf=new K,Nf=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r,this._normalizationScale=e===void 0?void 0:Du(e.array)}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Mf.fromBufferAttribute(this,t),Mf.applyMatrix4(e),this.setXYZ(t,Mf.x,Mf.y,Mf.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Mf.fromBufferAttribute(this,t),Mf.applyNormalMatrix(e),this.setXYZ(t,Mf.x,Mf.y,Mf.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Mf.fromBufferAttribute(this,t),Mf.transformDirection(e),this.setXYZ(t,Mf.x,Mf.y,Mf.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){pu(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new hf(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){pu(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t===void 0?Ou(e,this.data.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?ku(e,this.data.array):Math.round(e*t)}},Pf=new K,Ff=new K,If=new q,Lf=class{constructor(e=new K(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Pf.subVectors(n,t).cross(Ff.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Pf),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||If.getNormalMatrix(e),r=this.coplanarPoint(Pf).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Rf=0,zf=class extends vu{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rf++}),this.uuid=Su(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Y(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=iu,this.stencilZFail=iu,this.stencilZPass=iu,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){U(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?U(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Y().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Lf().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new G().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new G().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Bf=class extends zf{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new Y(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Vf,Hf=new K,Uf=new K,Wf=new K,Gf=new G,Kf=new G,qf=new J,Jf=new K,Yf=new K,Xf=new K,Zf=new G,Qf=new G,$f=new G,ep=class extends Td{constructor(e=new Bf){if(super(),this.isSprite=!0,this.type=`Sprite`,Vf===void 0){Vf=new kf;let e=new Af(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);Vf.setIndex([0,1,2,0,2,3]),Vf.setAttribute(`position`,new Nf(e,3,0,!1)),Vf.setAttribute(`uv`,new Nf(e,2,3,!1))}this.geometry=Vf,this.material=e,this.center=new G(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&W(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),Uf.setFromMatrixScale(this.matrixWorld),qf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Wf.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Uf.multiplyScalar(-Wf.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;tp(Jf.set(-.5,-.5,0),Wf,a,Uf,r,i),tp(Yf.set(.5,-.5,0),Wf,a,Uf,r,i),tp(Xf.set(.5,.5,0),Wf,a,Uf,r,i),Zf.set(0,0),Qf.set(1,0),$f.set(1,1);let o=e.ray.intersectTriangle(Jf,Yf,Xf,!1,Hf);if(o===null&&(tp(Yf.set(-.5,.5,0),Wf,a,Uf,r,i),Qf.set(0,1),o=e.ray.intersectTriangle(Jf,Xf,Yf,!1,Hf),o===null))return;let s=e.ray.origin.distanceTo(Hf);s<e.near||s>e.far||t.push({distance:s,point:Hf.clone(),uv:Yd.getInterpolation(Hf,Jf,Yf,Xf,Zf,Qf,$f,new G),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){let t=super.toJSON(e);return t.object.center=this.center.toArray(),t}};function tp(e,t,n,r,i,a){Gf.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?Kf.copy(Gf):(Kf.x=a*Gf.x-i*Gf.y,Kf.y=i*Gf.x+a*Gf.y),e.copy(t),e.x+=Kf.x,e.y+=Kf.y,e.applyMatrix4(qf)}var np=new K,rp=new K,ip=new K,ap=new K,op=class{constructor(e=new K,t=new K(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,np)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=np.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(np.copy(this.origin).addScaledVector(this.direction,t),np.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){rp.copy(e).add(t).multiplyScalar(.5),ip.copy(t).sub(e).normalize(),ap.copy(this.origin).sub(rp);let i=e.distanceTo(t)*.5,a=-this.direction.dot(ip),o=ap.dot(this.direction),s=-ap.dot(ip),c=ap.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(rp).addScaledVector(ip,d),f}intersectSphere(e,t){if(e.radius<0)return null;np.subVectors(e.center,this.origin);let n=np.dot(this.direction),r=np.dot(np)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,np)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let ee=S/w,te=C/w,P=1/w,ne=T-ee*D,re=E-te*D,ie=O-ee*A,ae=k-te*A,oe=j-ee*N,se=M-te*N,ce=oe*ae-se*ie,le=ne*se-re*oe,ue=ie*re-ae*ne;if(r){if(ce<0||le<0||ue<0)return null}else if((ce<0||le<0||ue<0)&&(ce>0||le>0||ue>0))return null;let F=ce+le+ue;if(F===0)return null;let de=P*(ce*D+le*A+ue*N);return(F>0?de<0:de>0)?null:this.at(de/F,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},sp=class extends zf{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new Y(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cd,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},cp=new J,lp=new op,up=new xf,dp=new K,fp=new K,pp=new K,mp=new K,hp=new K,gp=new K,_p=new K,vp=new K,Z=class extends Td{constructor(e=new kf,t=new sp){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){gp.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(hp.fromBufferAttribute(s,e),a?gp.addScaledVector(hp,r):gp.addScaledVector(hp.sub(t),r))}t.add(gp)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),up.copy(n.boundingSphere),up.applyMatrix4(i),lp.copy(e.ray).recast(e.near),up.containsPoint(lp.origin)===!1&&(lp.intersectSphere(up,dp)===null||lp.origin.distanceToSquared(dp)>(e.far-e.near)**2)||(cp.copy(i).invert(),lp.copy(e.ray).applyMatrix4(cp),(n.boundingBox===null||lp.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,lp)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=bp(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=bp(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=bp(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=bp(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function yp(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;vp.copy(s),vp.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(vp);return l<n.near||l>n.far?null:{distance:l,point:vp.clone(),object:e}}function bp(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,fp),e.getVertexPosition(c,pp),e.getVertexPosition(l,mp);let u=yp(e,t,n,r,fp,pp,mp,_p);if(u){let e=new K;Yd.getBarycoord(_p,fp,pp,mp,e),i&&(u.uv=Yd.getInterpolatedAttribute(i,s,c,l,e,new G)),a&&(u.uv1=Yd.getInterpolatedAttribute(a,s,c,l,e,new G)),o&&(u.normal=Yd.getInterpolatedAttribute(o,s,c,l,e,new K),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new K,materialIndex:0};Yd.getNormal(fp,pp,mp,t.normal),u.face=t,u.barycoord=e}return u}var xp=new Ju,Sp=new Ju,Cp=new Ju,wp=new Ju,Tp=new J,Ep=new K,Dp=new xf,Op=new J,kp=new op,Ap=class extends Z{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type=`SkinnedMesh`,this.bindMode=jc,this.bindMatrix=new J,this.bindMatrixInverse=new J,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Xd),this.boundingBox.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,Ep),this.boundingBox.expandByPoint(Ep)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new xf),this.boundingSphere.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,Ep),this.boundingSphere.expandByPoint(Ep)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this.boundingBox=e.boundingBox===null?null:e.boundingBox.clone(),this.boundingSphere=e.boundingSphere===null?null:e.boundingSphere.clone(),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Dp.copy(this.boundingSphere),Dp.applyMatrix4(r),e.ray.intersectsSphere(Dp)!==!1&&(Op.copy(r).invert(),kp.copy(e.ray).applyMatrix4(Op),(this.boundingBox===null||kp.intersectsBox(this.boundingBox)!==!1)&&this._computeIntersections(e,t,kp)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Ju,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r===1/0?e.set(1,0,0,0):e.multiplyScalar(r),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===`attached`?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===`detached`?this.bindMatrixInverse.copy(this.bindMatrix).invert():U(`SkinnedMesh: Unrecognized bindMode: `+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;Sp.fromBufferAttribute(r.attributes.skinIndex,e),Cp.fromBufferAttribute(r.attributes.skinWeight,e),t.isVector4?(xp.copy(t),t.set(0,0,0,0)):(xp.set(t.x,t.y,t.z,1),t.set(0,0,0)),xp.applyMatrix4(this.bindMatrix);for(let e=0;e<4;e++){let r=Cp.getComponent(e);if(r!==0){let i=Sp.getComponent(e);Tp.multiplyMatrices(n.bones[i].matrixWorld,n.boneInverses[i]),t.addScaledVector(wp.copy(xp).applyMatrix4(Tp),r)}}return t.isVector4&&(t.w=xp.w),t.applyMatrix4(this.bindMatrixInverse)}},jp=class extends Td{constructor(){super(),this.isBone=!0,this.type=`Bone`}},Mp=class extends qu{constructor(e=null,t=1,n=1,r,i,a,o,s,c=Fc,l=Fc,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Np=new J,Pp=new J,Fp=class e{constructor(e=[],t=[]){this.uuid=Su(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.previousBoneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){U(`Skeleton: Number of inverse bone matrices does not match amount of bones.`),this.boneInverses=[];for(let e=0,t=this.bones.length;e<t;e++)this.boneInverses.push(new J)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let t=new J;this.bones[e]&&t.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(t)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&t.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&(t.parent&&t.parent.isBone?(t.matrix.copy(t.parent.matrixWorld).invert(),t.matrix.multiply(t.matrixWorld)):t.matrix.copy(t.matrixWorld),t.matrix.decompose(t.position,t.quaternion,t.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let r=0,i=e.length;r<i;r++){let i=e[r]?e[r].matrixWorld:Pp;Np.multiplyMatrices(i,t[r]),Np.toArray(n,r*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new e(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Mp(t,e,e,nl,qc);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null),this.previousBoneTexture!==null&&(this.previousBoneTexture.dispose(),this.previousBoneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let r=e.bones[n],i=t[r];i===void 0&&(U(`Skeleton: No bone found with UUID:`,r),i=new jp),this.bones.push(i),this.boneInverses.push(new J().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:`Skeleton`,generator:`Skeleton.toJSON`},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,i=t.length;r<i;r++){let i=t[r];e.bones.push(i.uuid);let a=n[r];e.boneInverses.push(a.toArray())}return e}},Ip=class extends hf{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Lp=new J,Rp=new J,zp=[],Bp=new Xd,Vp=new J,Hp=new Z,Up=new xf,Wp=class extends Z{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ip(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Vp)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Xd),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Lp),Bp.copy(e.boundingBox).applyMatrix4(Lp),this.boundingBox.union(Bp)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new xf),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Lp),Up.copy(e.boundingSphere).applyMatrix4(Lp),this.boundingSphere.union(Up)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture===null?null:e.morphTexture.clone(),this.instanceColor=e.instanceColor===null?null:e.instanceColor.clone(),this.count=e.count,this.boundingBox=e.boundingBox===null?null:e.boundingBox.clone(),this.boundingSphere=e.boundingSphere===null?null:e.boundingSphere.clone(),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Hp.geometry=this.geometry,Hp.material=this.material,Hp.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Up.copy(this.boundingSphere),Up.applyMatrix4(n),e.ray.intersectsSphere(Up)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Lp),Rp.multiplyMatrices(n,Lp),Hp.matrixWorld=Rp,Hp.raycast(e,zp);for(let e=0,n=zp.length;e<n;e++){let n=zp[e];n.instanceId=i,n.object=this,t.push(n)}zp.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ip(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Mp(new Float32Array(r*this.count),r,this.count,al,qc));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Gp=new xf,Kp=new G(.5,.5),qp=new K,Jp=class{constructor(e=new Lf,t=new Lf,n=new Lf,r=new Lf,i=new Lf,a=new Lf){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=su,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Gp.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Gp.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Gp)}intersectsSprite(e){return Gp.center.set(0,0,0),Gp.radius=.7071067811865476+Kp.distanceTo(e.center),Gp.applyMatrix4(e.matrixWorld),this.intersectsSphere(Gp)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(qp.x=r.normal.x>0?e.max.x:e.min.x,qp.y=r.normal.y>0?e.max.y:e.min.y,qp.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(qp)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Yp=new J,Xp=class e{constructor(){this.coordinateSystem=su,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let e=0;e<t.length;e++){let r=t[e];Yp.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[e]===void 0&&(n[e]=new Jp),n[e].setFromProjectionMatrix(Yp,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new Jp),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new e().copy(this)}},Zp=class extends zf{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new Y(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Qp=new K,$p=new K,em=new J,tm=new op,nm=new xf,rm=new K,im=new K,am=class extends Td{constructor(e=new kf,t=new Zp){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)Qp.fromBufferAttribute(t,e-1),$p.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=Qp.distanceTo($p);e.setAttribute(`lineDistance`,new X(n,1))}else U(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),nm.copy(n.boundingSphere),nm.applyMatrix4(r),nm.radius+=i,e.ray.intersectsSphere(nm)===!1)return;em.copy(r).invert(),tm.copy(e.ray).applyMatrix4(em);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=om(this,e,tm,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=om(this,e,tm,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=om(this,e,tm,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=om(this,e,tm,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function om(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(Qp.fromBufferAttribute(s,i),$p.fromBufferAttribute(s,a),n.distanceSqToSegment(Qp,$p,rm,im)>r)return;rm.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(rm);if(!(c<t.near||c>t.far))return{distance:c,point:im.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var sm=new K,cm=new K,lm=class extends am{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)sm.fromBufferAttribute(t,e),cm.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+sm.distanceTo(cm);e.setAttribute(`lineDistance`,new X(n,1))}else U(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},um=class extends zf{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new Y(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},dm=new J,fm=new op,pm=new xf,mm=new K,hm=class extends Td{constructor(e=new kf,t=new um){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pm.copy(n.boundingSphere),pm.applyMatrix4(r),pm.radius+=i,e.ray.intersectsSphere(pm)===!1)return;dm.copy(r).invert(),fm.copy(e.ray).applyMatrix4(dm);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);mm.fromBufferAttribute(l,n),gm(mm,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)mm.fromBufferAttribute(l,a),gm(mm,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function gm(e,t,n,r,i,a,o){let s=fm.distanceSqToPoint(e);if(s<n){let n=new K;fm.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var _m=class extends qu{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},vm=class extends qu{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},ym=class extends qu{constructor(e,t,n=Kc,r,i,a,o=Fc,s=Fc,c,l=rl,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Uu(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},bm=class extends ym{constructor(e,t=Kc,n=301,r,i,a=Fc,o=Fc,s,c=rl){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},xm=class extends qu{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Sm=class e extends kf{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new X(c,3)),this.setAttribute(`normal`,new X(l,3)),this.setAttribute(`uv`,new X(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new K;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Cm=class e extends kf{constructor(e=1,t=1,n=4,r=8,i=1){super(),this.type=`CapsuleGeometry`,this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:i},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),i=Math.max(1,Math.floor(i));let a=[],o=[],s=[],c=[],l=t/2,u=Math.PI/2*e,d=t,f=2*u+d,p=n*2+i,m=r+1,h=new K,g=new K;for(let _=0;_<=p;_++){let v=0,y=0,b=0,x=0;if(_<=n){let t=_/n,r=t*Math.PI/2;y=-l-e*Math.cos(r),b=e*Math.sin(r),x=-e*Math.cos(r),v=t*u}else if(_<=n+i){let r=(_-n)/i;y=-l+r*t,b=e,x=0,v=u+r*d}else{let t=(_-n-i)/n,r=t*Math.PI/2;y=l+e*Math.sin(r),b=e*Math.cos(r),x=e*Math.sin(r),v=u+d+t*u}let S=Math.max(0,Math.min(1,v/f)),C=0;_===0?C=.5/r:_===p&&(C=-.5/r);for(let e=0;e<=r;e++){let t=e/r,n=t*Math.PI*2,i=Math.sin(n),a=Math.cos(n);g.x=-b*a,g.y=y,g.z=b*i,o.push(g.x,g.y,g.z),h.set(-b*a,x,b*i),h.normalize(),s.push(h.x,h.y,h.z),c.push(t+C,S)}if(_>0){let e=(_-1)*m;for(let t=0;t<r;t++){let n=e+t,r=e+t+1,i=_*m+t,o=_*m+t+1;a.push(n,r,i),a.push(r,o,i)}}}this.setIndex(a),this.setAttribute(`position`,new X(o,3)),this.setAttribute(`normal`,new X(s,3)),this.setAttribute(`uv`,new X(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},wm=class e extends kf{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new K,l=new G;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new X(a,3)),this.setAttribute(`normal`,new X(o,3)),this.setAttribute(`uv`,new X(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Tm=class e extends kf{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new X(u,3)),this.setAttribute(`normal`,new X(d,3)),this.setAttribute(`uv`,new X(f,2));function _(){let a=new K,_=new K,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new G,m=new K,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Em=class e extends Tm{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Dm=class e extends kf{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new X(i,3)),this.setAttribute(`normal`,new X(i.slice(),3)),this.setAttribute(`uv`,new X(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new K,r=new K,i=new K;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new K;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new K;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new K,t=new K,n=new K,r=new K,o=new G,s=new G,c=new G;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Om=class e extends Dm{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},km=class e extends kf{constructor(e=[new G(0,-.5),new G(.5,0),new G(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=Cu(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new K,d=new G,f=new K,p=new K,m=new K,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:m.normalize(),s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new X(a,3)),this.setAttribute(`uv`,new X(o,2)),this.setAttribute(`normal`,new X(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},Am=class e extends kf{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new X(p,3)),this.setAttribute(`normal`,new X(m,3)),this.setAttribute(`uv`,new X(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},jm=class e extends kf{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new K,p=new G;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new X(s,3)),this.setAttribute(`normal`,new X(c,3)),this.setAttribute(`uv`,new X(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Mm=class e extends kf{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new K,d=new K,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new X(p,3)),this.setAttribute(`normal`,new X(m,3)),this.setAttribute(`uv`,new X(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function Nm(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Fm(i))i.isRenderTargetTexture?(U(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Fm(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Pm(e){let t={};for(let n=0;n<e.length;n++){let r=Nm(e[n]);for(let e in r)t[e]=r[e]}return t}function Fm(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Im(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Lm(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Lu.workingColorSpace}var Rm={clone:Nm,merge:Pm},zm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Bm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Vm=class extends zf{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zm,this.fragmentShader=Bm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Nm(e.uniforms),this.uniformsGroups=Im(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new Y().setHex(r.value);break;case`v2`:this.uniforms[n].value=new G().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new K().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Ju().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new q().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new J().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Hm=class extends Vm{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Um=class extends zf{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new Y(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new G(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cd,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Wm=class extends zf{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new Y(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new G(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cd,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Gm=class extends zf{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=$l,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Km=class extends zf{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function qm(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Jm(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var Ym=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Xm=class extends Ym{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Xl,endingEnd:Xl}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Zl:i=e,o=2*t-n;break;case Ql:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Zl:a=e,s=2*n-t;break;case Ql:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Zm=class extends Ym{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Qm=class extends Ym{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},$m=class extends Ym{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=nh(n,t,g,y,r);i[p]=eh(x,o,_,b,m)}return i}};function eh(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function th(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function nh(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=eh(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=th(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var rh=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=qm(t,this.TimeBufferType),this.values=qm(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:qm(e.times,Array),values:qm(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Jm(e.settings)&&(n.settings={inTangents:qm(e.settings.inTangents,Array),outTangents:qm(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Qm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Zm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Xm(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new $m(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Kl:t=this.InterpolantFactoryMethodDiscrete;break;case ql:t=this.InterpolantFactoryMethodLinear;break;case Jl:t=this.InterpolantFactoryMethodSmooth;break;case Yl:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return U(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Kl;case this.InterpolantFactoryMethodLinear:return ql;case this.InterpolantFactoryMethodSmooth:return Jl;case this.InterpolantFactoryMethodBezier:return Yl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e;Jm(this.settings)&&(ih(this.settings.inTangents,e),ih(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Jm(this.settings)&&(ah(this.settings.inTangents,e),ah(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(W(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(W(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){W(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){W(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&lu(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){W(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Jl,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Jm(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function ih(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]+=t}function ah(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}rh.prototype.ValueTypeName=``,rh.prototype.TimeBufferType=Float32Array,rh.prototype.ValueBufferType=Float32Array,rh.prototype.DefaultInterpolation=ql;var oh=class extends rh{constructor(e,t,n){super(e,t,n)}};oh.prototype.ValueTypeName=`bool`,oh.prototype.ValueBufferType=Array,oh.prototype.DefaultInterpolation=Kl,oh.prototype.InterpolantFactoryMethodLinear=void 0,oh.prototype.InterpolantFactoryMethodSmooth=void 0;var sh=class extends rh{constructor(e,t,n,r){super(e,t,n,r)}};sh.prototype.ValueTypeName=`color`;var ch=class extends rh{constructor(e,t,n,r){super(e,t,n,r)}};ch.prototype.ValueTypeName=`number`;var lh=class extends Ym{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Au.slerpFlat(i,0,a,c-o,a,c,s);return i}},uh=class extends rh{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new lh(this.times,this.values,this.getValueSize(),e)}};uh.prototype.ValueTypeName=`quaternion`,uh.prototype.InterpolantFactoryMethodSmooth=void 0;var dh=class extends rh{constructor(e,t,n){super(e,t,n)}};dh.prototype.ValueTypeName=`string`,dh.prototype.ValueBufferType=Array,dh.prototype.DefaultInterpolation=Kl,dh.prototype.InterpolantFactoryMethodLinear=void 0,dh.prototype.InterpolantFactoryMethodSmooth=void 0;var fh=class extends rh{constructor(e,t,n,r){super(e,t,n,r)}};fh.prototype.ValueTypeName=`vector`;var ph={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(mh(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!mh(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function mh(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var hh=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},gh=class{constructor(e){this.manager=e===void 0?hh:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},this.priority=`auto`,this.cache=`default`,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};gh.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var _h=new WeakMap,vh=class extends gh{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=ph.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=_h.get(a);e===void 0&&(e=[],_h.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=uu(`img`);function s(){l(),t&&t(this);let n=_h.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}_h.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),ph.remove(`image:${e}`);let n=_h.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}_h.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),ph.add(`image:${e}`,o),i.manager.itemStart(e),o.fetchPriority=this.priority,o.src=e,o}},yh=class extends gh{constructor(e){super(e)}load(e,t,n,r){let i=new qu,a=new vh(this.manager);return a.setPriority(this.priority),a.setCache(this.cache),a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},bh=class extends Td{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new Y(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},xh=class extends bh{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Td.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Y(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Sh=new J,Ch=new K,wh=new K,Th=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new G(512,512),this.mapType=Vc,this.map=null,this.mapPass=null,this.matrix=new J,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Jp,this._frameExtents=new G(1,1),this._viewportCount=1,this._viewports=[new Ju(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Ch.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ch),wh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(wh),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Sh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Sh,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Sh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Eh=new K,Dh=new Au,Oh=new K,kh=class extends Td{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new J,this.projectionMatrix=new J,this.projectionMatrixInverse=new J,this.coordinateSystem=su,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Eh,Dh,Oh),Oh.x===1&&Oh.y===1&&Oh.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Eh,Dh,Oh.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Eh,Dh,Oh),Oh.x===1&&Oh.y===1&&Oh.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Eh,Dh,Oh.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ah=new K,jh=new G,Mh=new G,Nh=class extends kh{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=xu*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(bu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return xu*2*Math.atan(Math.tan(bu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ah.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ah.x,Ah.y).multiplyScalar(-e/Ah.z),Ah.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ah.x,Ah.y).multiplyScalar(-e/Ah.z)}getViewSize(e,t){return this.getViewBounds(e,jh,Mh),t.subVectors(Mh,jh)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(bu*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ph=class extends kh{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Fh=class extends Th{constructor(){super(new Ph(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ih=class extends bh{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Td.DEFAULT_UP),this.updateMatrix(),this.target=new Td,this.shadow=new Fh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Lh=-90,Rh=1,zh=class extends Td{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Nh(Lh,Rh,e,t);r.layers=this.layers,this.add(r);let i=new Nh(Lh,Rh,e,t);i.layers=this.layers,this.add(i);let a=new Nh(Lh,Rh,e,t);a.layers=this.layers,this.add(a);let o=new Nh(Lh,Rh,e,t);o.layers=this.layers,this.add(o);let s=new Nh(Lh,Rh,e,t);s.layers=this.layers,this.add(s);let c=new Nh(Lh,Rh,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Bh=class extends Nh{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},Vh=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Hh.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Hh(){this._document.hidden===!1&&this.reset()}var Uh=`\\[\\]\\.:\\/`,Wh=RegExp(`[\\[\\]\\.:\\/]`,`g`),Gh=`[^\\[\\]\\.:\\/]`,Kh=`[^`+Uh.replace(`\\.`,``)+`]`,qh=`((?:WC+[\\/:])*)`.replace(`WC`,Gh),Jh=`(WCOD+)?`.replace(`WCOD`,Kh),Yh=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Gh),Xh=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Gh),Zh=RegExp(`^`+qh+Jh+Yh+Xh+`$`),Qh=[`material`,`materials`,`bones`,`map`],$h=class{constructor(e,t,n){let r=n||eg.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},eg=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Wh,``)}static parseTrackName(e){let t=Zh.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Qh.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){U(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){W(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){W(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){W(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){W(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){W(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){W(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){W(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;W(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){W(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){W(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};eg.Composite=$h,eg.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},eg.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},eg.prototype.GetterByBindingType=[eg.prototype._getValue_direct,eg.prototype._getValue_array,eg.prototype._getValue_arrayElement,eg.prototype._getValue_toArray],eg.prototype.SetterByBindingTypeAndVersioning=[[eg.prototype._setValue_direct,eg.prototype._setValue_direct_setNeedsUpdate,eg.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[eg.prototype._setValue_array,eg.prototype._setValue_array_setNeedsUpdate,eg.prototype._setValue_array_setMatrixWorldNeedsUpdate],[eg.prototype._setValue_arrayElement,eg.prototype._setValue_arrayElement_setNeedsUpdate,eg.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[eg.prototype._setValue_fromArray,eg.prototype._setValue_fromArray_setNeedsUpdate,eg.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],class{static{this.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}};function tg(e,t,n,r){let i=ng(r);switch(n){case el:return e*t;case al:return e*t/i.components*i.byteLength;case ol:return e*t/i.components*i.byteLength;case sl:return e*t*2/i.components*i.byteLength;case cl:return e*t*2/i.components*i.byteLength;case tl:return e*t*3/i.components*i.byteLength;case nl:return e*t*4/i.components*i.byteLength;case ll:return e*t*4/i.components*i.byteLength;case ul:case dl:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case fl:case pl:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case hl:case _l:return Math.max(e,16)*Math.max(t,8)/4;case ml:case gl:return Math.max(e,8)*Math.max(t,8)/2;case vl:case yl:case xl:case Sl:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case bl:case Cl:case wl:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Tl:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case El:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Dl:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Ol:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case kl:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Al:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case jl:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Ml:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Nl:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Pl:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Fl:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Il:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Ll:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Rl:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case zl:case Bl:case Vl:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Hl:case Ul:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Wl:case Gl:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function ng(e){switch(e){case Vc:case Hc:return{byteLength:1,components:1};case Wc:case Uc:case Jc:return{byteLength:2,components:1};case Yc:case Xc:return{byteLength:2,components:4};case Kc:case Gc:case qc:return{byteLength:4,components:1};case Qc:case $c:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`187`}})),typeof window<`u`&&(window.__THREE__?U(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`187`);function rg(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function ig(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Q={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},$={common:{diffuse:{value:new Y(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new q},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new q}},envmap:{envMap:{value:null},envMapRotation:{value:new q},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new q}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new q}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new q},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new q},normalScale:{value:new G(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new q},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new q}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new q}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new q}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Y(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Y(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0},uvTransform:{value:new q}},sprite:{diffuse:{value:new Y(16777215)},opacity:{value:1},center:{value:new G(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new q},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0}}},ag={basic:{uniforms:Pm([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.fog]),vertexShader:Q.meshbasic_vert,fragmentShader:Q.meshbasic_frag},lambert:{uniforms:Pm([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new Y(0)},envMapIntensity:{value:1}}]),vertexShader:Q.meshlambert_vert,fragmentShader:Q.meshlambert_frag},phong:{uniforms:Pm([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new Y(0)},specular:{value:new Y(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Q.meshphong_vert,fragmentShader:Q.meshphong_frag},standard:{uniforms:Pm([$.common,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.roughnessmap,$.metalnessmap,$.fog,$.lights,{emissive:{value:new Y(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Q.meshphysical_vert,fragmentShader:Q.meshphysical_frag},toon:{uniforms:Pm([$.common,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.gradientmap,$.fog,$.lights,{emissive:{value:new Y(0)}}]),vertexShader:Q.meshtoon_vert,fragmentShader:Q.meshtoon_frag},matcap:{uniforms:Pm([$.common,$.bumpmap,$.normalmap,$.displacementmap,$.fog,{matcap:{value:null}}]),vertexShader:Q.meshmatcap_vert,fragmentShader:Q.meshmatcap_frag},points:{uniforms:Pm([$.points,$.fog]),vertexShader:Q.points_vert,fragmentShader:Q.points_frag},dashed:{uniforms:Pm([$.common,$.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Q.linedashed_vert,fragmentShader:Q.linedashed_frag},depth:{uniforms:Pm([$.common,$.displacementmap]),vertexShader:Q.depth_vert,fragmentShader:Q.depth_frag},normal:{uniforms:Pm([$.common,$.bumpmap,$.normalmap,$.displacementmap,{opacity:{value:1}}]),vertexShader:Q.meshnormal_vert,fragmentShader:Q.meshnormal_frag},sprite:{uniforms:Pm([$.sprite,$.fog]),vertexShader:Q.sprite_vert,fragmentShader:Q.sprite_frag},background:{uniforms:{uvTransform:{value:new q},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Q.background_vert,fragmentShader:Q.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new q}},vertexShader:Q.backgroundCube_vert,fragmentShader:Q.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Q.cube_vert,fragmentShader:Q.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Q.equirect_vert,fragmentShader:Q.equirect_frag},distance:{uniforms:Pm([$.common,$.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Q.distance_vert,fragmentShader:Q.distance_frag},shadow:{uniforms:Pm([$.lights,$.fog,{color:{value:new Y(0)},opacity:{value:1}}]),vertexShader:Q.shadow_vert,fragmentShader:Q.shadow_frag}};ag.physical={uniforms:Pm([ag.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new q},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new q},clearcoatNormalScale:{value:new G(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new q},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new q},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new q},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new q},sheen:{value:0},sheenColor:{value:new Y(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new q},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new q},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new q},transmissionSamplerSize:{value:new G},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new q},attenuationDistance:{value:0},attenuationColor:{value:new Y(0)},specularColor:{value:new Y(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new q},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new q},anisotropyVector:{value:new G},anisotropyMap:{value:null},anisotropyMapTransform:{value:new q}}]),vertexShader:Q.meshphysical_vert,fragmentShader:Q.meshphysical_frag};var og={r:0,b:0,g:0},sg=new J,cg=new q;cg.set(-1,0,0,0,1,0,0,0,1);function lg(e,t,n,r,i,a){let o=new Y(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&i.isCubeTexture?(l===void 0&&(l=new Z(new Sm(1,1,1),new Vm({name:`BackgroundCubeMaterial`,uniforms:Nm(ag.backgroundCube.uniforms),vertexShader:ag.backgroundCube.vertexShader,fragmentShader:ag.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(sg.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(cg),l.material.toneMapped=Lu.getTransfer(i.colorSpace)!==ru,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Z(new Am(2,2),new Vm({name:`BackgroundMaterial`,uniforms:Nm(ag.background.uniforms),vertexShader:ag.background.vertexShader,fragmentShader:ag.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Lu.getTransfer(i.colorSpace)!==ru,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(og,Lm(e)),n.buffers.color.setClear(og.r,og.g,og.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function ug(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function dg(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function fg(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(U(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),f=n.logarithmicDepthBuffer===!0&&d===!1;n.reversedDepthBuffer===!0&&d===!1&&U(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&d===!0&&U(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function pg(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Lf,s=new q,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var mg=class extends Xu{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new _m(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Sm(5,5,5),i=new Vm({name:`CubemapFromEquirect`,uniforms:Nm(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Z(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=Rc),new zh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},hg=256,gg=3,_g=20,vg=256,yg=16,bg=3,xg=new K,Sg=new Y,Cg=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new zh(1,10,null),this._boxMesh=new Z(new Sm(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=xg}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(Sg));let h=new zh(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ag(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(hg,Eu(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?hg:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=wg(e,!1,!1),n=Math.log2(e)-gg;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=wg(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ag()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=kg()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Eg(),this._integrationMaterial=Dg());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/yg);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-bg)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(vg*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=Og());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function wg(e,t,n){return new mg(e,{minFilter:Bc,generateMipmaps:t,type:Jc,colorSpace:tu,depthBuffer:n})}function Tg(e,t,n){return new Vm({name:e,uniforms:t,vertexShader:Q.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function Eg(){return Tg(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${vg}u

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
	`)}function Dg(){return Tg(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:yg}},`

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
	`)}function Og(){return Tg(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${_g}
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
	`)}function kg(){return Tg(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

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
	`)}function Ag(){return Tg(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function jg(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new mg(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Cg(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Cg(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Mg(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&hu(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Ng(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?_f:gf)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function Pg(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Fg(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:W(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Ig(e,t,n){let r=new WeakMap,i=new Ju;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Zu(h,p,m,u);g.type=qc,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new G(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Lg(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Rg={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function zg(e,t,n,r,i,a){let o=new Xu(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=null,u=new kf;u.setAttribute(`position`,new X([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute(`uv`,new X([0,2,0,0,2,0],2));let d=new Hm({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new Z(u,d),p=new Ph(-1,1,1,-1,0,1),m=null,h=null,g=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new Xu(t,n,{type:Jc,depthBuffer:!1,stencilBuffer:!1}),c=new Xu(t,n,{type:Jc,depthBuffer:!1,stencilBuffer:!1}));let r=i===!0&&y.some(e=>e.needsDepthTexture===!0);r!==(o.depthTexture!==null)&&(r===!0&&l===null&&(l=new ym(t,n),a===!0&&(l.format=il,l.type=Zc)),o.dispose(),o.depthTexture=r?l:null,o.resolveDepthBuffer=r,o.storeMultisampledDepthBuffer=r);for(let e=0;e<y.length;e++){let i=y[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(l)}},this.begin=function(e,t){if(g||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,g=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(m!==e.outputColorSpace||h!==e.toneMapping){m=e.outputColorSpace,h=e.toneMapping,d.defines={},Lu.getTransfer(m)===`srgb`&&(d.defines.SRGB_TRANSFER=``);let t=Rg[h];t&&(d.defines[t]=``),d.needsUpdate=!0}d.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(f,p),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}var Bg=new qu,Vg=new ym(1,1),Hg=new bm(1),Ug=new Zu,Wg=new Qu,Gg=new _m,Kg=[],qg=[],Jg=new Float32Array(16),Yg=new Float32Array(9),Xg=new Float32Array(4);function Zg(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Kg[i];if(a===void 0&&(a=new Float32Array(i),Kg[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Qg(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function $g(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function e_(e,t){let n=qg[t];n===void 0&&(n=new Int32Array(t),qg[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function t_(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function n_(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Qg(n,t))return;e.uniform2fv(this.addr,t),$g(n,t)}}function r_(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Qg(n,t))return;e.uniform3fv(this.addr,t),$g(n,t)}}function i_(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Qg(n,t))return;e.uniform4fv(this.addr,t),$g(n,t)}}function a_(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Qg(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),$g(n,t)}else{if(Qg(n,r))return;Xg.set(r),e.uniformMatrix2fv(this.addr,!1,Xg),$g(n,r)}}function o_(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Qg(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),$g(n,t)}else{if(Qg(n,r))return;Yg.set(r),e.uniformMatrix3fv(this.addr,!1,Yg),$g(n,r)}}function s_(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Qg(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),$g(n,t)}else{if(Qg(n,r))return;Jg.set(r),e.uniformMatrix4fv(this.addr,!1,Jg),$g(n,r)}}function c_(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function l_(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Qg(n,t))return;e.uniform2iv(this.addr,t),$g(n,t)}}function u_(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Qg(n,t))return;e.uniform3iv(this.addr,t),$g(n,t)}}function d_(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Qg(n,t))return;e.uniform4iv(this.addr,t),$g(n,t)}}function f_(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function p_(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Qg(n,t))return;e.uniform2uiv(this.addr,t),$g(n,t)}}function m_(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Qg(n,t))return;e.uniform3uiv(this.addr,t),$g(n,t)}}function h_(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Qg(n,t))return;e.uniform4uiv(this.addr,t),$g(n,t)}}function g_(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function __(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?g_(Vg):Bg,n.setTexture2D(t||a,i)}function v_(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Wg,i)}function y_(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?g_(Hg):Gg,n.setTextureCube(t||a,i)}function b_(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Ug,i)}function x_(e){switch(e){case 5126:return t_;case 35664:return n_;case 35665:return r_;case 35666:return i_;case 35674:return a_;case 35675:return o_;case 35676:return s_;case 5124:case 35670:return c_;case 35667:case 35671:return l_;case 35668:case 35672:return u_;case 35669:case 35673:return d_;case 5125:return f_;case 36294:return p_;case 36295:return m_;case 36296:return h_;case 35678:case 36198:case 36298:case 36306:case 35682:return __;case 35679:case 36299:case 36307:return v_;case 35680:case 36300:case 36308:case 36293:return y_;case 36289:case 36303:case 36311:case 36292:return b_}}function S_(e,t){e.uniform1fv(this.addr,t)}function C_(e,t){let n=Zg(t,this.size,2);e.uniform2fv(this.addr,n)}function w_(e,t){let n=Zg(t,this.size,3);e.uniform3fv(this.addr,n)}function T_(e,t){let n=Zg(t,this.size,4);e.uniform4fv(this.addr,n)}function E_(e,t){let n=Zg(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function D_(e,t){let n=Zg(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function O_(e,t){let n=Zg(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function k_(e,t){e.uniform1iv(this.addr,t)}function A_(e,t){e.uniform2iv(this.addr,t)}function j_(e,t){e.uniform3iv(this.addr,t)}function M_(e,t){e.uniform4iv(this.addr,t)}function N_(e,t){e.uniform1uiv(this.addr,t)}function P_(e,t){e.uniform2uiv(this.addr,t)}function F_(e,t){e.uniform3uiv(this.addr,t)}function I_(e,t){e.uniform4uiv(this.addr,t)}function L_(e,t,n){let r=this.cache,i=t.length,a=e_(n,i);Qg(r,a)||(e.uniform1iv(this.addr,a),$g(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?g_(Vg):Bg;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function R_(e,t,n){let r=this.cache,i=t.length,a=e_(n,i);Qg(r,a)||(e.uniform1iv(this.addr,a),$g(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Wg,a[e])}function z_(e,t,n){let r=this.cache,i=t.length,a=e_(n,i);Qg(r,a)||(e.uniform1iv(this.addr,a),$g(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?g_(Hg):Gg;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function B_(e,t,n){let r=this.cache,i=t.length,a=e_(n,i);Qg(r,a)||(e.uniform1iv(this.addr,a),$g(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Ug,a[e])}function V_(e){switch(e){case 5126:return S_;case 35664:return C_;case 35665:return w_;case 35666:return T_;case 35674:return E_;case 35675:return D_;case 35676:return O_;case 5124:case 35670:return k_;case 35667:case 35671:return A_;case 35668:case 35672:return j_;case 35669:case 35673:return M_;case 5125:return N_;case 36294:return P_;case 36295:return F_;case 36296:return I_;case 35678:case 36198:case 36298:case 36306:case 35682:return L_;case 35679:case 36299:case 36307:return R_;case 35680:case 36300:case 36308:case 36293:return z_;case 36289:case 36303:case 36311:case 36292:return B_}}var H_=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=x_(t.type)}},U_=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=V_(t.type)}},W_=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},G_=/(\w+)(\])?(\[|\.)?/g;function K_(e,t){e.seq.push(t),e.map[t.id]=t}function q_(e,t,n){let r=e.name,i=r.length;for(G_.lastIndex=0;;){let a=G_.exec(r),o=G_.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){K_(n,l===void 0?new H_(s,e,t):new U_(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new W_(s),K_(n,e)),n=e}}}var J_=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);q_(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Y_(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var X_=37297,Z_=0;function Q_(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var $_=new q;function ev(e){Lu._getMatrix($_,Lu.workingColorSpace,e);let t=`mat3( ${$_.elements.map(e=>e.toFixed(4))} )`;switch(Lu.getTransfer(e)){case nu:return[t,`LinearTransferOETF`];case ru:return[t,`sRGBTransferOETF`];default:return U(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function tv(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Q_(e.getShaderSource(t),r)}return i}function nv(e,t){let n=ev(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var rv={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function iv(e,t){let n=rv[t];return n===void 0?(U(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var av=new K;function ov(){return Lu.getLuminanceCoefficients(av),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${av.x.toFixed(4)}, ${av.y.toFixed(4)}, ${av.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function sv(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(uv).join(`
`)}function cv(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function lv(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function uv(e){return e!==``}function dv(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function fv(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var pv=/^[ \t]*#include +<([\w\d./]+)>/gm;function mv(e){return e.replace(pv,hv)}function hv(e,t){let n=Q[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return mv(n)}var gv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _v(e){return e.replace(gv,vv)}function vv(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function yv(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}var bv={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function xv(e){return bv[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Sv={302:`ENVMAP_MODE_REFRACTION`};function Cv(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Sv[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var wv={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Tv(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:wv[e.combine]||`ENVMAP_BLENDING_NONE`}function Ev(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=xv(n),l=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,u=Cv(n),d=Tv(n),f=sv(n),p=cv(a),m=i.createProgram(),h,g,_=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(h=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(uv).join(`
`),h.length>0&&(h+=`
`),g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(uv).join(`
`),g.length>0&&(g+=`
`)):(h=[yv(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(uv).join(`
`),g=[yv(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Q.tonemapping_pars_fragment,n.toneMapping===0?``:iv(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Q.colorspace_pars_fragment,nv(`linearToOutputTexel`,n.outputColorSpace),ov(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(uv).join(`
`)),o=mv(o),o=dv(o,n),o=fv(o,n),s=mv(s),s=dv(s,n),s=fv(s,n),o=_v(o),s=_v(s),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,h=[f,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+h,g=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+g);let v=_+h+o,y=_+g+s,b=Y_(i,i.VERTEX_SHADER,v),x=Y_(i,i.FRAGMENT_SHADER,y);i.attachShader(m,b),i.attachShader(m,x),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,`position`):i.bindAttribLocation(m,0,n.index0AttributeName),i.linkProgram(m);function S(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(m)||``,r=i.getShaderInfoLog(b)||``,a=i.getShaderInfoLog(x)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,m,b,x);else{let e=tv(i,b,`vertex`),n=tv(i,x,`fragment`);W(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):U(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:h},fragmentShader:{log:c,prefix:g}})}i.deleteShader(b),i.deleteShader(x),C=new J_(i,m),w=lv(i,m)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(m,X_)),T},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Z_++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=x,this}var Dv=0,Ov=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new kv(e),t.set(e,n)),n}},kv=class{constructor(e){this.id=Dv++,this.code=e,this.usedTimes=0}};function Av(e){return e===1030||e===37490||e===36285}function jv(e,t,n,r,i,a){let o=new ld,s=new Ov,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function p(e){return c.add(e),e===0?`uv`:`uv${e}`}function m(i,o,l,u,m,h){let g=u.fog,_=m.geometry,v=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,b=t.get(i.envMap||v,y),x=f[i.type],S=r.precision;i.precision!==null&&(S=r.getMaxPrecision(i.precision),S!==i.precision&&U(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,S,`instead.`));let C=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,w=C===void 0?0:C.length,T=0;_.morphAttributes.position!==void 0&&(T=1),_.morphAttributes.normal!==void 0&&(T=2),_.morphAttributes.color!==void 0&&(T=3);let E,D,O,k;if(x){let e=ag[x];E=e.vertexShader,D=e.fragmentShader}else{E=i.vertexShader,D=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),O=e.id,k=t.id}let A=e.getRenderTarget(),j=e.state.buffers.depth.getReversed(),M=m.isInstancedMesh===!0,N=m.isBatchedMesh===!0,ee=!!i.map,te=!!i.matcap,P=!!b,ne=P&&b.isPMREMTexture===!0,re=!!i.aoMap,ie=!!i.lightMap,ae=!!i.bumpMap&&i.wireframe===!1,oe=!!i.normalMap,se=!!i.displacementMap,ce=!!i.emissiveMap,le=!!i.metalnessMap,ue=!!i.roughnessMap,F=i.anisotropy>0,de=i.clearcoat>0,fe=i.diffuseRoughness>0,pe=i.dispersion>0,me=i.retroreflectivity>0,I=i.iridescence>0,he=i.sheen>0,ge=i.transmission>0,_e=F&&!!i.anisotropyMap,ve=de&&!!i.clearcoatMap,ye=de&&!!i.clearcoatNormalMap,be=de&&!!i.clearcoatRoughnessMap,L=fe&&!!i.diffuseRoughnessMap,R=I&&!!i.iridescenceMap,xe=I&&!!i.iridescenceThicknessMap,Se=he&&!!i.sheenColorMap,Ce=he&&!!i.sheenRoughnessMap,z=!!i.specularMap,we=!!i.specularColorMap,B=!!i.specularIntensityMap,V=ge&&!!i.transmissionMap,Te=ge&&!!i.thicknessMap,Ee=!!i.gradientMap,De=!!i.alphaMap,Oe=i.alphaTest>0,ke=!!i.alphaHash,Ae=!!i.extensions,je=0;i.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(je=e.toneMapping);let Me=ne?b.isCompressedCubeTexture?b.image[0].mipmaps:b.mipmaps:null,Ne={shaderID:x,shaderType:i.type,shaderName:i.name,vertexShader:E,fragmentShader:D,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:S,batching:N,batchingColor:N&&m._colorsTexture!==null,instancing:M,instancingColor:M&&m.instanceColor!==null,instancingMorph:M&&m.morphTexture!==null,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Lu.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ee,matcap:te,envMap:P,envMapMode:P&&b.mapping,envMapPMREM:ne,envMapMaxLod:ne?Me.length-1:null,envMapSize:ne?Me[0].width:null,aoMap:re,lightMap:ie,bumpMap:ae,normalMap:oe,displacementMap:se,emissiveMap:ce,normalMapObjectSpace:oe&&i.normalMapType===1,normalMapTangentSpace:oe&&i.normalMapType===0,packedNormalMap:oe&&i.normalMapType===0&&Av(i.normalMap.format),metalnessMap:le,roughnessMap:ue,anisotropy:F,anisotropyMap:_e,clearcoat:de,clearcoatMap:ve,clearcoatNormalMap:ye,clearcoatRoughnessMap:be,diffuseRoughness:fe,diffuseRoughnessMap:L,dispersion:pe,retroreflection:me,iridescence:I,iridescenceMap:R,iridescenceThicknessMap:xe,sheen:he,sheenColorMap:Se,sheenRoughnessMap:Ce,specularMap:z,specularColorMap:we,specularIntensityMap:B,transmission:ge,transmissionMap:V,thicknessMap:Te,gradientMap:Ee,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:De,alphaTest:Oe,alphaHash:ke,combine:i.combine,mapUv:ee&&p(i.map.channel),aoMapUv:re&&p(i.aoMap.channel),lightMapUv:ie&&p(i.lightMap.channel),bumpMapUv:ae&&p(i.bumpMap.channel),normalMapUv:oe&&p(i.normalMap.channel),displacementMapUv:se&&p(i.displacementMap.channel),emissiveMapUv:ce&&p(i.emissiveMap.channel),metalnessMapUv:le&&p(i.metalnessMap.channel),roughnessMapUv:ue&&p(i.roughnessMap.channel),anisotropyMapUv:_e&&p(i.anisotropyMap.channel),clearcoatMapUv:ve&&p(i.clearcoatMap.channel),clearcoatNormalMapUv:ye&&p(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&p(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:L&&p(i.diffuseRoughnessMap.channel),iridescenceMapUv:R&&p(i.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&p(i.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&p(i.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&p(i.sheenRoughnessMap.channel),specularMapUv:z&&p(i.specularMap.channel),specularColorMapUv:we&&p(i.specularColorMap.channel),specularIntensityMapUv:B&&p(i.specularIntensityMap.channel),transmissionMapUv:V&&p(i.transmissionMap.channel),thicknessMapUv:Te&&p(i.thicknessMap.channel),alphaMapUv:De&&p(i.alphaMap.channel),vertexTangents:!!_.attributes.tangent&&(oe||F),vertexNormals:!!_.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!_.attributes.color&&_.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!_.attributes.uv&&(ee||De),fog:!!g,useFog:i.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||_.attributes.normal===void 0&&oe===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:j,skinning:m.isSkinnedMesh===!0,hasPositionAttribute:_.attributes.position!==void 0,morphTargets:_.morphAttributes.position!==void 0,morphNormals:_.morphAttributes.normal!==void 0,morphColors:_.morphAttributes.color!==void 0,morphTargetsCount:w,morphTextureStride:T,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:h.filter(e=>e.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:je,decodeVideoTexture:ee&&i.map.isVideoTexture===!0&&Lu.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ce&&i.emissiveMap.isVideoTexture===!0&&Lu.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Ae&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ae&&i.extensions.multiDraw===!0||N)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ne.vertexUv1s=c.has(1),Ne.vertexUv2s=c.has(2),Ne.vertexUv3s=c.has(3),c.clear(),Ne}function h(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(g(n,t),_(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function g(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function _(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.diffuseRoughness&&o.enable(25),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function v(e){let t=f[e.type],n;if(t){let e=ag[t];n=Rm.clone(e.uniforms)}else n=e.uniforms;return n}function y(t,n){let r=u.get(n);return r===void 0?(r=new Ev(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function b(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function x(e){s.remove(e)}function S(){s.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:v,acquireProgram:y,releaseProgram:b,releaseShaderCache:x,programs:l,dispose:S}}function Mv(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Nv(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Pv(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Fv(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Nv),r.length>1&&r.sort(t||Pv),i.length>1&&i.sort(t||Pv)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Iv(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Fv,e.set(t,[i])):n>=r.length?(i=new Fv,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Lv(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new K,color:new Y};break;case`SpotLight`:n={position:new K,direction:new K,color:new Y,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new K,color:new Y,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new K,skyColor:new Y,groundColor:new Y};break;case`RectAreaLight`:n={color:new Y,position:new K,halfWidth:new K,halfHeight:new K}}return e[t.id]=n,n}}}function Rv(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var zv=0;function Bv(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Vv(e){let t=new Lv,n=Rv(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new K);let i=new K,a=new J,o=new J;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Bv);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=$.LTC_FLOAT_1,r.rectAreaLTC2=$.LTC_FLOAT_2):(r.rectAreaLTC1=$.LTC_HALF_1,r.rectAreaLTC2=$.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=zv++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Hv(e){let t=new Vv(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function Uv(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Hv(e),t.set(n,[a])):r>=i.length?(a=new Hv(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Wv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Gv=`uniform sampler2D shadow_pass;
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
}`,Kv=[new K(1,0,0),new K(-1,0,0),new K(0,1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1)],qv=[new K(0,-1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1),new K(0,-1,0),new K(0,-1,0)],Jv=new J,Yv=new K,Xv=new K;function Zv(e,t,n){let r=new Jp,i=new G,a=new G,o=new Ju,s=new Gm,c=new Km,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new Vm({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new G},radius:{value:4}},vertexShader:Wv,fragmentShader:Gv}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new kf;m.setAttribute(`position`,new hf(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new Z(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(U(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){U(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){U(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Xu(i.x,i.y,{format:sl,type:Jc,minFilter:Rc,magFilter:Rc,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new ym(i.x,i.y,qc),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=rl,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Fc,d.map.depthTexture.magFilter=Fc}else l.isPointLight?(d.map=new mg(i.x),d.map.depthTexture=new bm(i.x,Kc)):(d.map=new Xu(i.x,i.y),d.map.depthTexture=new ym(i.x,i.y,Kc)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=rl,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=Rc,d.map.depthTexture.magFilter=Rc):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Fc,d.map.depthTexture.magFilter=Fc);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);let _=d.camera.layers.mask&4294967294?d.camera.layers:s.layers;for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Yv.setFromMatrixPosition(l.matrixWorld),e.position.copy(Yv),Xv.copy(e.position),Xv.add(Kv[t]),e.up.copy(qv[t]),e.lookAt(Xv),e.updateMatrixWorld(),n.makeTranslation(-Yv.x,-Yv.y,-Yv.z),Jv.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Jv,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,_,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new Xu(i.x,i.y,{format:sl,type:Jc}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),s=n.material;if(Array.isArray(s)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,c);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(s.visible){let t=y(n,s,o,c);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)b(l[e],i,a,o,s,c)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Qv(e,t){function n(){let t=!1,n=new Ju,r=null,i=new Ju(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?le(e.DEPTH_TEST):ue(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=_u[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?le(e.STENCIL_TEST):ue(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Y(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,ee=0,te=e.getParameter(e.VERSION);te.indexOf(`WebGL`)===-1?te.indexOf(`OpenGL ES`)!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),N=ee>=2):(ee=parseFloat(/^WebGL (\d)/.exec(te)[1]),N=ee>=1);let P=null,ne={},re=e.getParameter(e.SCISSOR_BOX),ie=e.getParameter(e.VIEWPORT),ae=new Ju().fromArray(re),oe=new Ju().fromArray(ie);function se(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ce={};ce[e.TEXTURE_2D]=se(e.TEXTURE_2D,e.TEXTURE_2D,1),ce[e.TEXTURE_CUBE_MAP]=se(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[e.TEXTURE_2D_ARRAY]=se(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ce[e.TEXTURE_3D]=se(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),le(e.DEPTH_TEST),o.setFunc(3),ge(!1),_e(1),le(e.CULL_FACE),I(0);function le(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ue(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function F(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function de(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function fe(t){return h!==t&&(e.useProgram(t),h=t,!0)}let pe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};pe[103]=e.MIN,pe[104]=e.MAX;let me={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function I(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(ue(e.BLEND),g=!1);else if(g===!1&&(le(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:W(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:W(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:W(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:W(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(pe[n],pe[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(me[r],me[i],me[o],me[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function he(t,n){t.side===2?ue(e.CULL_FACE):le(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ge(r),t.blending===1&&t.transparent===!1?I(0):I(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ye(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?le(e.SAMPLE_ALPHA_TO_COVERAGE):ue(e.SAMPLE_ALPHA_TO_COVERAGE)}function ge(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function _e(t){t===0?ue(e.CULL_FACE):(le(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function ve(t){t!==k&&(N&&e.lineWidth(t),k=t)}function ye(t,n,r){t?(le(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):ue(e.POLYGON_OFFSET_FILL)}function be(t){t?le(e.SCISSOR_TEST):ue(e.SCISSOR_TEST)}function L(t){t===void 0&&(t=e.TEXTURE0+M-1),P!==t&&(e.activeTexture(t),P=t)}function R(t,n,r){r===void 0&&(r=P===null?e.TEXTURE0+M-1:P);let i=ne[r];i===void 0&&(i={type:void 0,texture:void 0},ne[r]=i),(i.type!==t||i.texture!==n)&&(P!==r&&(e.activeTexture(r),P=r),e.bindTexture(t,n||ce[t]),i.type=t,i.texture=n)}function xe(){let t=ne[P];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Se(){try{e.compressedTexImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Ce(){try{e.compressedTexImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function z(){try{e.texSubImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function we(){try{e.texSubImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function B(){try{e.compressedTexSubImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function V(){try{e.compressedTexSubImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Te(){try{e.texStorage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Ee(){try{e.texStorage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function De(){try{e.texImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Oe(){try{e.texImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function ke(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ae(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function je(t){ae.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ae.copy(t))}function Me(t){oe.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),oe.copy(t))}function Ne(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function Pe(t,n,r){let i=l.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function Fe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},P=null,ne={},f={},c={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Y(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ae.set(0,0,e.canvas.width,e.canvas.height),oe.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:le,disable:ue,bindFramebuffer:F,drawBuffers:de,useProgram:fe,setBlending:I,setMaterial:he,setFlipSided:ge,setCullFace:_e,setLineWidth:ve,setPolygonOffset:ye,setScissorTest:be,activeTexture:L,bindTexture:R,unbindTexture:xe,compressedTexImage2D:Se,compressedTexImage3D:Ce,texImage2D:De,texImage3D:Oe,pixelStorei:Ae,getParameter:ke,updateUBOMapping:Ne,uniformBlockBinding:Pe,texStorage2D:Te,texStorage3D:Ee,texSubImage2D:z,texSubImage3D:we,compressedTexSubImage2D:B,compressedTexSubImage3D:V,scissor:je,viewport:Me,reset:Fe}}function $v(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new G,u=new WeakMap,d=new Set,f,p=new WeakMap,m=new Set,h=new FinalizationRegistry(e=>m.delete(e)),g=!1;try{g=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function _(e,t){return g?new OffscreenCanvas(e,t):uu(`canvas`)}function v(e,t,n){let r=1,i=Te(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=_(n,a));let o=t?_(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),U(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&U(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function y(e){return e.generateMipmaps}function b(t){e.generateMipmap(t)}function x(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function S(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];U(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||U(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?nu:Lu.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function C(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,U(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function w(e,t){return y(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function T(e){let t=new WeakRef(e);r.get(e).__ref=t,m.add(t),h.register(e,t,t)}function E(e){let t=r.get(e).__ref;t!==void 0&&(m.delete(t),h.unregister(t))}function D(e){k(e.target)}function O(e){A(e.target)}function k(e){e.removeEventListener(`dispose`,D),E(e),M(e),e.isVideoTexture&&u.delete(e),e.isHTMLTexture&&d.delete(e)}function A(e){e.removeEventListener(`dispose`,O),E(e),ee(e)}function j(){for(let e of m){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?A(t):k(t))}m.clear(),d.clear()}function M(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&N(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function N(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function ee(t){let n=r.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let i=t.depthTexture;if(i&&i.renderTarget===t&&k(i),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,n=a.length;t<n;t++){let n=r.get(a[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(a[t])}r.remove(t)}let te=0;function P(){te=0}function ne(){return te}function re(e){te=e}function ie(){let e=te;return e>=i.maxTextures&&U(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),te+=1,e}function ae(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function oe(t,i){let a=r.get(t);if(t.isVideoTexture&&B(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)U(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)U(`WebGLRenderer: Texture marked for update but image is incomplete`);else{he(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function se(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?he(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function ce(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?he(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function le(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?ge(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ue={[Mc]:e.REPEAT,[Nc]:e.CLAMP_TO_EDGE,[Pc]:e.MIRRORED_REPEAT},F={[Fc]:e.NEAREST,[Ic]:e.NEAREST_MIPMAP_NEAREST,[Lc]:e.NEAREST_MIPMAP_LINEAR,[Rc]:e.LINEAR,[zc]:e.LINEAR_MIPMAP_NEAREST,[Bc]:e.LINEAR_MIPMAP_LINEAR},de={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function fe(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&U(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ue[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ue[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ue[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,F[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,F[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,de[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function pe(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,D),T(n));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=ae(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&N(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function me(e,t,n){return Math.floor(Math.floor(e/n)/t)}function I(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=me(n.start,r.width,4),c=me(t.start,r.width,4);n.start<=i+1&&a===c&&me(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function he(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=pe(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Lu.getPrimaries(Lu.workingColorSpace),r=o.colorSpace===``?null:Lu.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=v(o.image,!1,i.maxTextureSize);t=V(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=S(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);fe(c,o);let h,g=o.mipmaps,_=o.isVideoTexture!==!0,x=f.__version===void 0||l===!0,T=u.dataReady,E=w(o,t);if(o.isDepthTexture)m=C(o.format===il,o.type),x&&(_?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(g.length>0){_&&x&&n.texStorage2D(e.TEXTURE_2D,E,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else _?(x&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&I(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){_&&x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,g[0].width,g[0].height,t.depth);for(let i=0,a=g.length;i<a;i++)if(h=g[i],o.format!==1023){if(r!==null){if(_){if(T){if(o.layerUpdates.size>0){let t=tg(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else U(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else _?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{_&&x&&n.texStorage2D(e.TEXTURE_2D,E,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],o.format===1023?_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?U(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):_?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(_){if(x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=tg(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)_?(x&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(x){if(_)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(g.length>0){if(_&&x){let t=Te(g[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=g.length;t<i;t++)h=g[t],_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(_){if(x){let r=Te(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);y(o)&&o.mipmapsAutoUpdate===!0&&b(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ge(t,o,s){if(o.image.length!==6)return;let c=pe(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Lu.getPrimaries(Lu.workingColorSpace),r=o.colorSpace===``?null:Lu.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=v(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=V(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),_=a.convert(o.type),x=S(o.internalFormat,g,_,o.normalized,o.colorSpace),T=o.isVideoTexture!==!0,E=u.__version===void 0||c===!0,D=l.dataReady,O=w(o,h);fe(e.TEXTURE_CUBE_MAP,o);let k;if(o.isDepthTexture){if(x=C(o.format===il,o.type),E){if(T)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,x,h.width,h.height);else for(let t=0;t<6;t++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,h.width,h.height,0,g,_,null)}}else if(f){T&&E&&n.texStorage2D(e.TEXTURE_CUBE_MAP,O,x,h.width,h.height);for(let t=0;t<6;t++){k=m[t].mipmaps;for(let r=0;r<k.length;r++){let i=k[r];o.format===1023?T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,g,_,i.data):g===null?U(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):T?D&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,i.data)}}}else{if(k=o.mipmaps,T&&E){k.length>0&&O++;let t=Te(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,O,x,t.width,t.height)}for(let t=0;t<6;t++)if(p){T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,m[t].width,m[t].height,0,g,_,m[t].data);for(let r=0;r<k.length;r++){let i=k[r].image[t].image;T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,i.width,i.height,0,g,_,i.data)}}else{T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,g,_,m[t]);for(let r=0;r<k.length;r++){let i=k[r];T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,g,_,i.image[t])}}}y(o)&&o.mipmapsAutoUpdate===!0&&b(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function _e(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=S(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),we(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,z(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function ve(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=C(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;we(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,z(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,z(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=S(o.internalFormat,c,l,o.normalized,o.colorSpace);we(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,z(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,z(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function ye(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let c=r.get(i.depthTexture);c.__renderTarget=i;let l=o?i.depthTexture.image[0]:i.depthTexture.image;c.__webglTexture&&l.width===i.width&&l.height===i.height||(l.width=i.width,l.height=i.height,i.depthTexture.needsUpdate=!0),o?le(i.depthTexture,0):oe(i.depthTexture,0);let u=c.__webglTexture,d=z(i),f=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)we(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)we(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function be(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)ye(i.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?ye(i.__webglFramebuffer[0],t,0):ye(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),ve(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),ve(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function L(t,n,i){let a=r.get(t);n!==void 0&&_e(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&be(t)}function R(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,O),T(t);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&we(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=S(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=z(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),ve(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),fe(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)_e(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else _e(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);y(i)?b(e.TEXTURE_CUBE_MAP):i.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),fe(c,a),_e(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),y(a)&&b(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),fe(r,i),i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)_e(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else _e(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);y(i)?b(r):i.mipmaps.length>0&&e.texParameteri(r,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}t.depthBuffer&&be(t)}function xe(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(y(a)&&a.mipmapsAutoUpdate===!0){let t=x(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),b(t),n.unbindTexture()}}}let Se=[];function Ce(t){if(t.samples>0){if(we(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Se.length=0,Se.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&Se.push(l),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Se))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function z(e){return Math.min(i.maxSamples,e.samples)}function we(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function B(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function V(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Lu.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&U(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):W(`WebGLTextures: Unsupported texture color space:`,n)),t}function Te(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=ie,this.resetTextureUnits=P,this.getTextureUnits=ne,this.setTextureUnits=re,this.setTexture2D=oe,this.setTexture2DArray=se,this.setTexture3D=ce,this.setTextureCube=le,this.rebindTextures=L,this.setupRenderTarget=R,this.updateRenderTargetMipmap=xe,this.updateMultisampleRenderTarget=Ce,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=we,this.dispose=j}function ey(e,t){function n(n,r=``){let i,a=Lu.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var ty=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ny=`
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

}`,ry=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new xm(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Vm({vertexShader:ty,fragmentShader:ny,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Z(new Am(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},iy=class extends vu{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new ry,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new G,C=null,w=null,T=new Nh;T.viewport=new Ju;let E=new Nh;E.viewport=new Ju;let D=[T,E],O=new Bh,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Od,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Od,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Od,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function M(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,M),r.removeEventListener(`inputsourceschange`,N);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,re.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&U(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&U(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,M),r.addEventListener(`inputsourceschange`,N),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?il:rl,a=_.stencil?Zc:Kc);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Xu(d.textureWidth,d.textureHeight,{format:nl,type:Vc,depthTexture:new ym(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Xu(f.framebufferWidth,f.framebufferHeight,{format:nl,type:Vc,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),re.setContext(r),re.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function N(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}function ee(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;ee(O,i);for(let e=0;e<a.length;e++)ee(a[e],i);O.projectionMatrix.copy(T.projectionMatrix),O.projectionMatrixInverse.copy(T.projectionMatrixInverse),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),te(e,O,i)};function te(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=xu*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let P=null;function ne(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new Nh,o.layers.enable(n),o.viewport=new Ju,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new xm,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}P&&P(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let re=new rg;re.setAnimationLoop(ne),this.setAnimationLoop=function(e){P=e},this.dispose=function(){}}},ay=new J,oy=new q;oy.set(-1,0,0,0,1,0,0,0,1);function sy(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Lm(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(ay.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(oy),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function cy(e,t,n,r){let i={},a={};function o(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function s(e,n){let o=i[e.id];o===void 0&&(m(e),o=c(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let u=t.render.frame;a[e.id]!==u&&(l(e),a[e.id]=u)}function c(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function l(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)u(t[n],e,n,a);else u(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(t,n,r,i){if(f(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=h(i,!0);d(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else d(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function d(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function f(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)p(i[n],e,n)===!0&&(t=!0);return t}return p(i,r,a)}function p(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=h(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?U(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):U(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function g(t){let n=t.target;n.removeEventListener(`dispose`,g),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);i={},a={}}return{bind:o,update:s,dispose:_}}var ly=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),uy=null;function dy(){return uy===null&&(uy=new Mp(ly,16,16,sl,Jc),uy.name=`DFG_LUT`,uy.minFilter=Rc,uy.magFilter=Rc,uy.wrapS=Nc,uy.wrapT=Nc,uy.generateMipmaps=!1,uy.needsUpdate=!0),uy}var fy=class{constructor(e={}){let{canvas:t=du(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Vc}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([ll,cl,ol]),g=new Set([Vc,Kc,Wc,Zc,Yc,Xc]),_=new Uint32Array(4),v=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=eu;let j=0,M=0,N=null,ee=-1,te=null,P=new Ju,ne=new Ju,re=null,ie=new Y(0),ae=0,oe=t.width,se=t.height,ce=1,le=null,ue=null,F=new Ju(0,0,oe,se),de=new Ju(0,0,oe,se),fe=!1,pe=new Jp,me=new Xp,I=!1,he=!1,ge=new J,_e=new K,ve=new Ju,ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},be=!1;function L(){return N===null?ce:1}let R=n;function xe(e,n){return t.getContext(e,n)}let Se,Ce,z,we,B,V,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,We,!1),t.addEventListener(`webglcontextrestored`,Ge,!1),t.addEventListener(`webglcontextcreationerror`,Ke,!1),R===null){let t=`webgl2`;if(R=xe(t,e),R===null)throw xe(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}He()}catch(e){throw t.removeEventListener(`webglcontextlost`,We,!1),t.removeEventListener(`webglcontextrestored`,Ge,!1),t.removeEventListener(`webglcontextcreationerror`,Ke,!1),W(`WebGLRenderer: `+e.message),e}function He(){Se=new Mg(R),Se.init(),ze=new ey(R,Se),Ce=new fg(R,Se,e,ze),z=new Qv(R,Se),Ce.reversedDepthBuffer&&d&&z.buffers.depth.setReversed(!0),O=R.createFramebuffer(),k=R.createFramebuffer(),A=R.createFramebuffer(),we=new Fg(R),B=new Mv,V=new $v(R,Se,z,B,Ce,ze,we),Te=new jg(T),Ee=new ig(R),Be=new ug(R,Ee),De=new Ng(R,Ee,we,Be),Oe=new Lg(R,De,Ee,Be,we),Ie=new Ig(R,Ce,V),Ne=new pg(B),ke=new jv(T,Te,Se,Ce,Be,Ne),Ae=new sy(T,B),je=new Iv,Me=new Uv(Se),Fe=new lg(T,Te,z,Oe,p,s),Pe=new Zv(T,Oe,Ce),Ve=new cy(R,we,Ce,z),Le=new dg(R,Se,we),Re=new Pg(R,Se,we),we.programs=ke.programs,T.capabilities=Ce,T.extensions=Se,T.properties=B,T.renderLists=je,T.shadowMap=Pe,T.state=z,T.info=we}m!==1009&&(w=new zg(m,t.width,t.height,o,r,i));let Ue=new iy(T,R);this.xr=Ue,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let e=Se.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Se.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ce},this.setPixelRatio=function(e){e!==void 0&&(ce=e,this.setSize(oe,se,!1))},this.getSize=function(e){return e.set(oe,se)},this.setSize=function(e,n,r=!0){Ue.isPresenting?U(`WebGLRenderer: Can't change size while VR device is presenting.`):(oe=e,se=n,t.width=Math.floor(e*ce),t.height=Math.floor(n*ce),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(oe*ce,se*ce).floor()},this.setDrawingBufferSize=function(e,n,r){oe=e,se=n,ce=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)W(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){U(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(P)},this.getViewport=function(e){return e.copy(F)},this.setViewport=function(e,t,n,r){e.isVector4?F.set(e.x,e.y,e.z,e.w):F.set(e,t,n,r),z.viewport(P.copy(F).multiplyScalar(L()).round())},this.getScissor=function(e){return e.copy(de)},this.setScissor=function(e,t,n,r){e.isVector4?de.set(e.x,e.y,e.z,e.w):de.set(e,t,n,r),z.scissor(ne.copy(de).multiplyScalar(L()).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(e){z.setScissorTest(fe=e)},this.setOpaqueSort=function(e){le=e},this.setTransparentSort=function(e){ue=e},this.getClearColor=function(e){return e.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(N!==null){let t=N.texture.format;e=h.has(t)}if(e){let e=N.texture.type,t=g.has(e),n=Fe.getClearColor(),r=Fe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,R.clearBufferuiv(R.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,R.clearBufferiv(R.COLOR,0,v))}else r|=R.COLOR_BUFFER_BIT}t&&(r|=R.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&R.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,We,!1),t.removeEventListener(`webglcontextrestored`,Ge,!1),t.removeEventListener(`webglcontextcreationerror`,Ke,!1),Fe.dispose(),je.dispose(),Me.dispose(),V.dispose(),B.dispose(),Te.dispose(),Oe.dispose(),De.dispose(),Be.dispose(),Ve.dispose(),ke.dispose(),Ue.dispose(),Ue.removeEventListener(`sessionstart`,$e),Ue.removeEventListener(`sessionend`,et),tt.stop()};function We(e){e.preventDefault(),pu(`WebGLRenderer: Context Lost.`),E=!0}function Ge(){pu(`WebGLRenderer: Context Restored.`),E=!1;let e=we.autoReset,t=Pe.enabled,n=Pe.autoUpdate,r=Pe.needsUpdate,i=Pe.type;He(),we.autoReset=e,Pe.enabled=t,Pe.autoUpdate=n,Pe.needsUpdate=r,Pe.type=i}function Ke(e){W(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function qe(e){let t=e.target;t.removeEventListener(`dispose`,qe),Je(t)}function Je(e){Ye(e),B.remove(e)}function Ye(e){let t=B.get(e).programs;t!==void 0&&(t.forEach(function(e){ke.releaseProgram(e)}),e.isShaderMaterial&&ke.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=ye);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=ft(e,t,n,r,i);z.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=De.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Be.setup(i,r,s,n,c);let h,g=Le;if(c!==null&&(h=Ee.get(c),g=Re,g.setIndex(h)),i.isMesh)r.wireframe===!0?(z.setLineWidth(r.wireframeLinewidth*L()),g.setMode(R.LINES)):g.setMode(R.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),z.setLineWidth(e*L()),i.isLineSegments?g.setMode(R.LINES):i.isLineLoop?g.setMode(R.LINE_LOOP):g.setMode(R.LINE_STRIP)}else i.isPoints?g.setMode(R.POINTS):i.isSprite&&g.setMode(R.TRIANGLES);if(i.isBatchedMesh){if(Se.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ee.get(c).bytesPerElement:1,o=B.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(R,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function Xe(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),I===!0&&Ne.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,ct(e,t,r),e.side=0,e.needsUpdate=!0,ct(e,t,r),e.side=2):ct(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=Me.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),he=this.localClippingEnabled,I=Ne.init(this.clippingPlanes,he),I===!0&&Ne.setGlobalState(this.clippingPlanes,t),D!==null&&Pe.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];Xe(o,n,t,e),r.add(o)}else Xe(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=B.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Se.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let Ze=null;function Qe(e){Ze&&Ze(e)}function $e(){tt.stop()}function et(){tt.start()}let tt=new rg;tt.setAnimationLoop(Qe),typeof self<`u`&&tt.setContext(self),this.setAnimationLoop=function(e){Ze=e,Ue.setAnimationLoop(e),e===null?tt.stop():tt.start()},Ue.addEventListener(`sessionstart`,$e),Ue.addEventListener(`sessionend`,et),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){W(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Ue.enabled===!0&&Ue.isPresenting===!0,r=w!==null&&(N===null||n)&&w.begin(T,N);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Ue.enabled===!0&&Ue.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ue.cameraAutoUpdate===!0&&Ue.updateCamera(t),t=Ue.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,N),x=Me.get(e,C.length),x.init(t),x.state.textureUnits=V.getTextureUnits(),C.push(x),ge.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?me.setFromArrayCamera(t):pe.setFromProjectionMatrix(ge,su,t.reversedDepth),he=this.localClippingEnabled,I=Ne.init(this.clippingPlanes,he),b=je.get(e,S.length),b.init(),S.push(b),this.info.render.frame++,Ue.enabled===!0&&Ue.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&nt(e,t,-1/0,T.sortObjects)}nt(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(le,ue),be=Ue.enabled===!1||Ue.isPresenting===!1||Ue.hasDepthSensing()===!1,be&&Fe.addToRenderList(b,e),this.info.autoReset===!0&&this.info.reset(),I===!0&&Ne.beginShadows();let i=x.state.shadowsArray;if(Pe.render(i,e,t),I===!0&&Ne.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];it(n,r,e,a)}be&&Fe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];rt(b,e,n,n.viewport)}}else r.length>0&&it(n,r,e,t),be&&Fe.render(e),rt(b,e,t)}N!==null&&M===0&&(V.updateMultisampleRenderTarget(N),V.updateRenderTargetMipmap(N)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Be.resetDefaultState(),ee=-1,te=null,C.pop(),C.length>0?(x=C[C.length-1],V.setTextureUnits(x.state.textureUnits),I===!0&&Ne.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function nt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?me:pe;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&ve.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ge);let i=Oe.update(e),a=e.material;a.visible&&b.push(e,i,a,n,ve.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?me:pe;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=Oe.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),ve.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),ve.copy(e.boundingSphere.center)),ve.applyMatrix4(e.matrixWorld).applyMatrix4(ge)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,ve.z,s,t)}}else a.visible&&b.push(e,i,a,n,ve.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)nt(i[e],t,n,r)}function rt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),I===!0&&Ne.setGlobalState(T.clippingPlanes,n),r&&z.viewport(P.copy(r)),i.length>0&&at(i,t,n),a.length>0&&at(a,t,n),o.length>0&&at(o,t,n),z.buffers.depth.setTest(!0),z.buffers.depth.setMask(!0),z.buffers.color.setMask(!0),z.setPolygonOffset(!1)}function it(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=Se.has(`EXT_color_buffer_half_float`)||Se.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Xu(1,1,{generateMipmaps:!0,type:e?Jc:Vc,minFilter:Bc,samples:Math.max(4,Ce.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Lu.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||P;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(ie),ae=T.getClearAlpha(),ae<1&&T.setClearColor(16777215,.5),T.clear(),be&&Fe.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),I===!0&&Ne.setGlobalState(T.clippingPlanes,r),at(e,n,r),V.updateMultisampleRenderTarget(a),V.updateRenderTargetMipmap(a),Se.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,ot(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(V.updateMultisampleRenderTarget(a),V.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(ie,ae),d!==void 0&&(r.viewport=d),T.toneMapping=u}function at(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&ot(o,t,n,s,l,c)}}function ot(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function st(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function ct(e,t,n){t.isScene!==!0&&(t=ye);let r=B.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=ke.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=ke.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Te.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,qe),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return dt(e,s),d}else s.uniforms=ke.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=ke.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ne.uniform),dt(e,s),r.needsLights=mt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=st(x.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function lt(e,t,n,r,i){let a=B.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=ct(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function ut(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=J_.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function dt(e,t){let n=B.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function ft(e,t,n,r,i){t.isScene!==!0&&(t=ye),V.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=N===null?T.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Lu.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Te.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=B.get(r),b=x.state.lights;if(I===!0&&(he===!0||e!==te)){let t=e===te&&r.id===ee;Ne.setState(r,e,t)}let S=!1,C=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==b.state.version||i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?S=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ne.numPlanes||v.numIntersection!==Ne.numIntersection)?S=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.morphTargetsCount===_&&v.numLightProbeGrids===st(x.state.lightProbeGridArray)?(v.outputColorSpace!==s||v.toneMapping!==h)&&(C=!0):S=!0:S=!0:(S=!0,v.__version=r.version);let w=v.currentProgram;(S===!0||C===!0)&&(w=C===!0?lt(r,t,i,s,h):ct(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,w,v));let E=!1,O=!1,k=!1,A=w.getUniforms(),j=v.uniforms;if(z.useProgram(w.program)&&(E=!0,O=!0,k=!0),r.id!==ee&&(ee=r.id,O=!0),E||te!==e){z.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),A.setValue(R,`projectionMatrix`,e.projectionMatrix),A.setValue(R,`viewMatrix`,e.matrixWorldInverse);let t=A.map.cameraPosition;t!==void 0&&t.setValue(R,_e.setFromMatrixPosition(e.matrixWorld)),Ce.logarithmicDepthBuffer&&A.setValue(R,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&A.setValue(R,`isOrthographic`,e.isOrthographicCamera===!0),te!==e&&(te=e,O=!0,k=!0)}if(v.needsLights&&(b.state.sunShadowMap.length>0&&A.setValue(R,`sunShadowMap`,b.state.sunShadowMap,V),b.state.directionalShadowMap.length>0&&A.setValue(R,`directionalShadowMap`,b.state.directionalShadowMap,V),b.state.spotShadowMap.length>0&&A.setValue(R,`spotShadowMap`,b.state.spotShadowMap,V),b.state.pointShadowMap.length>0&&A.setValue(R,`pointShadowMap`,b.state.pointShadowMap,V)),i.isSkinnedMesh){A.setOptional(R,i,`bindMatrix`),A.setOptional(R,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),A.setValue(R,`boneTexture`,e.boneTexture,V))}i.isBatchedMesh&&(A.setOptional(R,i,`batchingTexture`),A.setValue(R,`batchingTexture`,i._matricesTexture,V),A.setOptional(R,i,`batchingIdTexture`),A.setValue(R,`batchingIdTexture`,i._indirectTexture,V),A.setOptional(R,i,`batchingColorTexture`),i._colorsTexture!==null&&A.setValue(R,`batchingColorTexture`,i._colorsTexture,V));let M=n.morphAttributes;if((M.position!==void 0||M.normal!==void 0||M.color!==void 0)&&Ie.update(i,n,w),(O||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,A.setValue(R,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(j.envMapIntensity.value=t.environmentIntensity),j.dfgLUT!==void 0&&(j.dfgLUT.value=dy()),O){if(A.setValue(R,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&pt(j,k),a&&r.fog===!0&&Ae.refreshFogUniforms(j,a),Ae.refreshMaterialUniforms(j,r,ce,se,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.numLightProbeGrids>0){let e=y,t=0;for(let n of x.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;j.probesSH.value=e.textures,j.probesMin.value=e.min,j.probesMax.value=e.max,j.probesResolution.value=e.resolution}J_.upload(R,ut(v),j,V)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(J_.upload(R,ut(v),j,V),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&A.setValue(R,`center`,i.center),A.setValue(R,`modelViewMatrix`,i.modelViewMatrix),A.setValue(R,`normalMatrix`,i.normalMatrix),A.setValue(R,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Ve.update(n,w),Ve.bind(n,w)}}return w}function pt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function mt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(e,t,n){let r=B.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),B.get(e.texture).__webglTexture=t,B.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=B.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){N=e,j=t,M=n;let r=null,i=!1,a=!1;if(e){let o=B.get(e);if(o.__useDefaultFramebuffer!==void 0){z.bindFramebuffer(R.FRAMEBUFFER,o.__webglFramebuffer),P.copy(e.viewport),ne.copy(e.scissor),re=e.scissorTest,z.viewport(P),z.scissor(ne),z.setScissorTest(re),ee=-1;return}if(o.__webglFramebuffer===void 0)V.setupRenderTarget(e);else if(o.__hasExternalTextures)V.rebindTextures(e,B.get(e.texture).__webglTexture,B.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&B.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);V.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=B.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&V.useMultisampledRTT(e)===!1?B.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,P.copy(e.viewport),ne.copy(e.scissor),re=e.scissorTest}else P.copy(F).multiplyScalar(ce).floor(),ne.copy(de).multiplyScalar(ce).floor(),re=fe;if(n!==0&&(r=O),z.bindFramebuffer(R.FRAMEBUFFER,r)&&z.drawBuffers(e,r),z.viewport(P),z.scissor(ne),z.setScissorTest(re),i){let r=B.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=B.get(e.textures[t]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=B.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,t.__webglTexture,n)}ee=-1};function ht(e){let t=B.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ce.textureFormatReadable(e.format),t.__typeReadable=Ce.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){W(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){z.bindFramebuffer(R.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s);let u=ht(o);if(u.__formatReadable===!1){W(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){W(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&R.readPixels(t,n,r,i,ze.convert(c),ze.convert(l),a)}finally{let e=N===null?null:B.get(N).__webglFramebuffer;z.bindFramebuffer(R.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){z.bindFramebuffer(R.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s);let d=ht(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,f),R.bufferData(R.PIXEL_PACK_BUFFER,a.byteLength,R.STREAM_READ),R.readPixels(t,n,r,i,ze.convert(l),ze.convert(u),0),R.bindBuffer(R.PIXEL_PACK_BUFFER,null);let p=N===null?null:B.get(N).__webglFramebuffer;z.bindFramebuffer(R.FRAMEBUFFER,p);let m=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await gu(R,m,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,f),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,a),R.bindBuffer(R.PIXEL_PACK_BUFFER,null),R.deleteBuffer(f),R.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;V.setTexture2D(e,0),R.copyTexSubImage2D(R.TEXTURE_2D,n,0,0,o,s,i,a),z.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=ze.convert(t.format),_=ze.convert(t.type),v;t.isData3DTexture?(V.setTexture3D(t,0),v=R.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(V.setTexture2DArray(t,0),v=R.TEXTURE_2D_ARRAY):(V.setTexture2D(t,0),v=R.TEXTURE_2D),z.activeTexture(R.TEXTURE0),z.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,t.flipY),z.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),z.pixelStorei(R.UNPACK_ALIGNMENT,t.unpackAlignment);let y=z.getParameter(R.UNPACK_ROW_LENGTH),b=z.getParameter(R.UNPACK_IMAGE_HEIGHT),x=z.getParameter(R.UNPACK_SKIP_PIXELS),S=z.getParameter(R.UNPACK_SKIP_ROWS),C=z.getParameter(R.UNPACK_SKIP_IMAGES);z.pixelStorei(R.UNPACK_ROW_LENGTH,h.width),z.pixelStorei(R.UNPACK_IMAGE_HEIGHT,h.height),z.pixelStorei(R.UNPACK_SKIP_PIXELS,l),z.pixelStorei(R.UNPACK_SKIP_ROWS,u),z.pixelStorei(R.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=B.get(e),r=B.get(t),h=B.get(n.__renderTarget),g=B.get(r.__renderTarget);z.bindFramebuffer(R.READ_FRAMEBUFFER,h.__webglFramebuffer),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,B.get(e).__webglTexture,i,d+n),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,B.get(t).__webglTexture,a,m+n)),R.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,R.DEPTH_BUFFER_BIT,R.NEAREST);z.bindFramebuffer(R.READ_FRAMEBUFFER,null),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||B.has(e)){let n=B.get(e),r=B.get(t);z.bindFramebuffer(R.READ_FRAMEBUFFER,k),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,n.__webglTexture,i),T?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,r.__webglTexture,a),i===0?T?R.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):R.copyTexSubImage2D(v,a,f,p,l,u,o,s):R.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,R.COLOR_BUFFER_BIT,R.NEAREST);z.bindFramebuffer(R.READ_FRAMEBUFFER,null),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?R.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h);z.pixelStorei(R.UNPACK_ROW_LENGTH,y),z.pixelStorei(R.UNPACK_IMAGE_HEIGHT,b),z.pixelStorei(R.UNPACK_SKIP_PIXELS,x),z.pixelStorei(R.UNPACK_SKIP_ROWS,S),z.pixelStorei(R.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&R.generateMipmap(v),z.unbindTexture()},this.initRenderTarget=function(e){B.get(e).__webglFramebuffer===void 0&&V.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?V.setTextureCube(e,0):e.isData3DTexture?V.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?V.setTexture2DArray(e,0):V.setTexture2D(e,0),z.unbindTexture()},this.resetState=function(){j=0,M=0,N=null,z.reset(),Be.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return su}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Lu._getDrawingBufferColorSpace(e),t.unpackColorSpace=Lu._getUnpackColorSpace()}};function py(){return{state:0,speed:0,vy:0,brake:!1,rolling:!1,ropeDirX:0,ropeDirY:1,ropeDirZ:0,dt:0,events:0,ropeLen:My,impact:0,deadCause:0,win:0,hookFlying:0}}var my=.965,hy=.08,gy=.2,_y=.5,vy=.29,yy=.28,by=[.12,.1,.08,.08,.07,.04,.2,.15,.06],xy=.5,Sy=.3,Cy=.4,wy=.1,Ty=1/120,Ey=4.5,Dy=.3,Oy=.035,ky=.012,Ay=.45,jy=1.2,My=20,Ny=.6,Py=1.6,Fy=.7,Iy=.08,Ly=.15,Ry=Math.PI*2,zy=.08,By=.75,Vy=10,Hy=.9,Uy=.14,Wy=.12,Gy=.6,Ky=.35,qy=.12,Jy=9.81,Yy=14,Xy=.35,Zy=.05,Qy=.1,$y=.28,eb=1,tb=2,nb=4,rb=16,ib=32,ab=64;function ob(e){let t=new Float64Array(25);for(let n=0;n<e.length;n++)t[e[n][0]]=e[n][1];return t}var sb=ob([[4,.04],[6,-.04],[8,.12],[11,.12],[7,.08],[10,-.04],[9,.3],[12,.22],[14,.06],[17,.06],[13,.08],[15,.14],[18,.06]]),cb=ob([[0,-.04],[4,.2],[6,-.15],[7,-.5],[10,1],[8,.5],[11,.35],[9,.5],[12,.7],[13,1.1],[15,1.3],[16,-.25],[18,.7]]),lb=ob([[0,-.06],[4,.08],[6,.25],[7,.35],[10,.2],[8,1.15],[11,1.05],[9,.45],[12,.35],[13,.7],[15,1],[16,.2],[18,.55],[14,.1],[17,.1]]),ub=ob([[0,-.075],[2,-.1],[4,-.04],[6,-.12],[7,2.95],[10,2.95],[9,.15],[12,.15],[13,.4],[14,.06],[15,1.15],[16,.3],[17,.06],[18,1]]),db=ob([[1,.05],[2,-.25],[4,-.3],[5,.2],[6,.2],[7,3],[8,.1],[9,.15],[10,-.45],[11,.95],[12,.5],[13,1.15],[15,1.25],[16,.85],[18,1.5]]),fb=ob([[0,-.45],[4,.9],[6,.6],[7,.9],[10,.9],[8,.1],[11,.1],[9,1.6],[12,1.6],[13,2],[16,2],[15,2.2],[18,2.2]]),pb=ob([[0,-.8],[1,-.1],[2,-1.45],[3,.22],[4,.15],[5,.3],[6,.45],[7,.35],[8,1.35],[9,.35],[10,-.2],[11,.55],[12,1],[13,.65],[14,.2],[15,1.25],[16,-.05],[17,.12],[18,.15]]),mb=ob([[4,-.12],[6,-.25],[7,2.6],[10,2.6],[8,.5],[11,.5],[9,.25],[12,.25],[14,.12],[17,.12],[15,.05],[18,.05]]),hb=ob([[0,-.075],[2,.15],[4,-.05],[6,-.3],[7,2.95],[10,2.95],[9,.2],[12,.2],[13,.75],[16,.6],[15,.95],[18,.8]]),gb=ob([[0,-.55],[2,1.2],[3,.35],[4,.35],[5,-.25],[6,-.3],[7,1.6],[8,.4],[9,1.9],[10,.9],[11,.9],[12,1.2],[13,1.5],[15,2.1],[16,.6],[18,.9]]),_b=new Float64Array([0,0,.05,-.07,.12,.02,.24,0]),vb=new Float64Array([0,0,.05,.6,.12,-.15,.24,0]),yb=new Float64Array([0,0,.05,.45,.12,-.1,.24,0]),bb=new Float64Array([0,0,.05,-.5,.12,1.1,.24,0]),xb=new Float64Array([0,0,.05,.15,.12,-.05,.24,0]),Sb=new Float64Array([0,0,.05,.1,.12,-.08,.24,0]),Cb=.24,wb=new Float64Array([0,0,.25,.14,.6,-.03,1,0]),Tb=new Float64Array([0,0,.3,-.22,1,0]),Eb=new Float64Array([0,0,.3,.9,1,0]),Db=new Float64Array([0,0,.3,.7,1,0]),Ob=new Float64Array([0,0,.3,.35,1,0]),kb=new Float64Array([0,0,.3,.3,1,0]),Ab=new Float64Array([0,0,.05,-.06,.15,0]),jb=new Float64Array([0,0,.05,-.15,.2,0]),Mb=new Float64Array([0,0,.06,-.05,.25,0]),Nb=.25,Pb=new Float64Array([0,1.6,.35,0]),Fb=new Float64Array([0,0,.12,.5,.35,0]),Ib=new Float64Array([0,-.25,.3,0]),Lb=new Float64Array([0,-.2,.3,0]),Rb=.35,zb=new Float64Array([0,0,.05,.06,.18,0]),Bb=new Float64Array([0,0,.05,.2,.25,0]),Vb=.25,Hb=new Float64Array([0,0,.06,-.6,.3,0]),Ub=new Float64Array([0,0,.08,.8,.4,0]),Wb=.4,Gb=new Float64Array([0,0,.06,.18,.2,0]),Kb=new Float64Array([0,0,.08,-.25,.3,0]),qb=.3,Jb=1.2,Yb=new Float64Array([0,0,.1,.08,.25,-.06,.4,0]),Xb=new Float64Array([0,0,.25,.05,.4,0]),Zb=.4;function Qb(e,t){let n=e.length;if(t<e[0]||t>e[n-2])return 0;for(let r=2;r<n;r+=2)if(t<=e[r]){let n=e[r-2],i=e[r]-n,a=i>0?(t-n)/i:1,o=a*a*(3-2*a);return e[r-1]+(e[r+1]-e[r-1])*o}return e[n-1]}var $b=class{weights=new Float64Array(9);channels=new Float64Array(25);rows=new Float64Array(225);active=0;phase=0;time=0;rollT=0;prevState=-1;prevSpeed=0;accel=0;swing=0;swingVel=0;scarf=.3;prevYaw=0;yawRate=0;initialized=0;reach=0;hemP=0;hemPV=0;hemR=0;hemRV=0;tJump=-1;tLand=-1;tAttach=-1;tRelease=-1;tCling=-1;tDie=-1;tWin=-1;landA=0;landRoll=0;attachS=1;dieCause=0};function ex(e){return e>0?Math.min(2.4,e/(1.6+.3*e)):0}function tx(e,t){if(t.state===2)return 6;if(t.win===1)return 7;if(t.state===3)return t.brake?4:3;if(t.state===4)return 8;if(t.rolling)return 5;if(t.state===1)return 2;let n=e.active===1;return t.speed>xy||n&&t.speed>Sy?1:0}function nx(e,t,n){return e<t?t:e>n?n:e}function rx(e,t,n){let r=t*25;for(let t=0;t<25;t++)e.rows[r+t]=n[t];return r}function ix(e,t){let n=e.rows,r=sx(1);for(let e=0;e<25;e++)n[r+e]=0;let i=nx(t/6,.3,1),a=e.phase*Ry,o=Math.sin(a),s=Math.cos(a),c=.12+.22*i;n[r+0]=-.05*i+.04*i*Math.cos(2*a),n[r+4]=c,n[r+5]=.18*i*o,n[r+6]=-.6*c,n[r+13]=.2+.85*i*o,n[r+16]=.2-.85*i*o,n[r+15]=.25+1.15*i*(.5+.5*s),n[r+18]=.25+1.15*i*(.5-.5*s),n[r+7]=-.9*i*o,n[r+10]=.9*i*o,n[r+8]=.15,n[r+11]=.15,n[r+9]=1.2+.25*i,n[r+12]=1.2+.25*i}function ax(e,t){let n=e.rows,r=e.time,i=Math.sin(Ry*$y*r);n[t+4]-=.025*i,n[t+6]+=.015*i,n[t+8]+=.02*i,n[t+11]+=.02*i,n[t+0]+=.004*i,n[t+3]+=.02*Math.sin(Ry*.11*r)}function ox(e){let t=rx(e,7,mb),n=Math.sin(Ry*1.2*e.time);e.rows[t+7]+=.2*n,e.rows[t+10]-=.2*n}function sx(e){return e*25}function cx(e,t){let n=e.rows,r=sx(2),i=.5+.5*nx(t/5,-1,1);for(let e=0;e<25;e++)n[r+e]=lb[e]+(cb[e]-lb[e])*i;let a=.17*(1-i)*Math.sin(e.time*1.5*Ry);n[r+13]+=a,n[r+16]-=a}function lx(e,t,n,r,i){let a=rx(e,t,n),o=r.ropeDirX,s=r.ropeDirY,c=r.ropeDirZ;s>.2||(o=0,s=1,c=0);let l=Math.cos(i),u=Math.sin(i),d=o*l-c*u,f=o*u+c*l,p=nx(Math.atan2(f,s),-.7,Fy),m=nx(Math.atan2(-d,s),-.7,Fy);e.rows[a+19]=p+e.swing,e.rows[a+20]=m}function ux(e,t){let n=e[t+2],r=n+e[t+4],i=my+e[t+0]+hy*Math.cos(n)+_y*Math.cos(r),a=e[t+1]+hy*Math.sin(n)+_y*Math.sin(r),o=2-i,s=-a,c=Math.cos(r),l=Math.sin(r),u=o*c+s*l,d=-o*l+s*c,f=Math.sqrt(u*u+d*d),p=Math.atan2(d,-u),m=0,h=Math.PI,g=0;for(let e=0;e<2;e++){let e=Math.cos(m),t=vy*e,n=yy*e,r=nx(f,Math.abs(t-n)+.001,t+n-1e-4),i=Math.acos(nx((t*t+n*n-r*r)/(2*t*n),-1,1)),a=Math.acos(nx((t*t+r*r-n*n)/(2*t*r),-1,1));g=Math.PI-i,h=p-a;let o=vy+yy*Math.cos(g);m=Math.asin(nx(-.13/o,-1,1))}e[t+7]=h,e[t+10]=h,e[t+8]=m,e[t+11]=m,e[t+9]=g,e[t+12]=g}function dx(e,t,n,r){lx(e,3,ub,t,n);let i=e.rows,a=sx(3),o=nx(r/Vy,0,1),s=e.time,c=Math.sin(Ry*By*s);i[a+19]+=zy*(.3+.7*o)*c,i[a+4]+=.03*o*Math.sin(Ry*By*s-.8);let l=Math.atan(r*e.yawRate/Jy)*Gy;i[a+20]-=nx(l,-.35,Ky);let u=nx(Wy*e.swingVel,-.25,.25),d=Uy*(.35+.65*o),f=Ry*Hy*s;i[a+13]+=u+d*Math.sin(f),i[a+16]+=u+d*Math.sin(f+1.1),i[a+15]+=.6*d*Math.sin(f-.7),i[a+18]+=.6*d*Math.sin(f+.4),i[a+15]+=.12*o*Math.sin(Ry*Hy*s+Math.PI/2),i[a+18]+=.12*o*Math.sin(Ry*Hy*s-Math.PI/2),ux(i,a)}function fx(e){let t=rx(e,5,fb),n=Ry*Math.min(1,e.rollT/Cy);n>Math.PI&&(n-=Ry),e.rows[t+2]=n}function px(e,t,n,r){for(let n=0;n<9;n++)e.weights[n]=+(n===t);e.phase=0,e.rollT=0,e.prevSpeed=n,e.prevYaw=r,e.yawRate=0,e.accel=0,e.swing=0,e.swingVel=0,e.reach=0,e.hemP=0,e.hemPV=0,e.hemR=0,e.hemRV=0,e.tJump=-1,e.tLand=-1,e.tAttach=-1,e.tRelease=-1,e.tCling=-1,e.tDie=-1,e.tWin=-1,e.initialized=1}function mx(e,t,n){let r=t.state===3?nx(Oy*e.accel+ky*t.speed,-.45,Ay):0,i=Math.ceil(n/Ty);i>12&&(i=12);let a=i>0?n/i:0,o=Ey*Ey,s=2*Dy*Ey;for(let t=0;t<i;t++)e.swingVel+=(o*(r-e.swing)-s*e.swingVel)*a,e.swing+=e.swingVel*a}function hx(e,t){let n=t.events|0;if(n!==0){if((n&tb)!==0&&(e.tJump=0),(n&eb)!==0){let n=(t.impact-2)/9;e.landA=n<0?0:n>1?1:n,e.landRoll=+!!t.rolling,e.tLand=0}(n&rb)!==0&&(e.attachS=nx(t.speed/10,.3,1),e.tAttach=0),(n&nb)!==0&&(e.tRelease=0),(n&ib)!==0&&(e.tCling=0),(n&ab)!==0&&(e.dieCause=t.deadCause,e.tDie=0)}}function gx(e,t){let n=e.channels;if(e.tJump>=0){let r=e.tJump;n[0]+=Qb(_b,r);let i=Qb(vb,r);n[15]+=i,n[18]+=i;let a=Qb(yb,r);n[13]+=a,n[16]+=a;let o=Qb(bb,r);n[7]+=o,n[10]+=o,n[4]+=Qb(xb,r),n[24]+=Qb(Sb,r),e.tJump=r+t>Cb?-1:r+t}if(e.tLand>=0){let r=e.landA,i=.12+.18*r,a=e.tLand/i;if(e.landRoll===1)n[24]+=.5*r*Qb(wb,a);else{n[24]+=r*Qb(wb,a),n[0]+=r*Qb(Tb,a);let e=r*Qb(Eb,a);n[15]+=e,n[18]+=e;let t=r*Qb(Db,a);n[13]+=t,n[16]+=t,n[4]+=r*Qb(Ob,a);let i=r*Qb(kb,a);n[8]+=i,n[11]+=i}e.tLand=e.tLand+t>i?-1:e.tLand+t}if(e.tAttach>=0){let r=e.tAttach,i=e.attachS;n[24]+=i*Qb(Ab,r);let a=Qb(jb,r);n[9]+=a,n[12]+=a,n[0]+=i*Qb(Mb,r),e.tAttach=r+t>Nb?-1:r+t}if(e.tRelease>=0){let r=e.tRelease,i=Qb(Pb,r);n[7]+=i,n[10]+=i;let a=Qb(Fb,r);n[13]+=a,n[16]+=a,n[4]+=Qb(Ib,r),n[6]+=Qb(Lb,r),e.tRelease=r+t>Rb?-1:r+t}if(e.tCling>=0){let r=e.tCling;n[24]+=Qb(zb,r),n[4]+=Qb(Bb,r),e.tCling=r+t>Vb?-1:r+t}if(e.tDie>=0){let r=e.tDie,i=Jb;if(e.dieCause===2){n[6]+=Qb(Hb,r);let e=Qb(Ub,r);n[8]+=e,n[11]+=e,i=Wb}else if(e.dieCause===3)n[24]+=Qb(Gb,r),n[0]+=Qb(Kb,r),i=qb;else if(r<=Jb){let e=Math.exp(-r/.6),t=.4*e*Math.sin(Ry*3*r),i=.3*e*Math.sin(Ry*2.5*r);n[8]+=t,n[11]-=t,n[13]+=i,n[16]-=i}e.tDie=r+t>i?-1:r+t}if(e.tWin>=0){let r=e.tWin;n[24]+=Qb(Yb,r),n[0]+=Qb(Xb,r),e.tWin=r+t>Zb?-1:r+t}}function _x(e,t,n,r,i){let a=e.active,o=0,s=0;a===3||a===4?o=-.5*e.swing:a!==6&&(o=-nx(.012*r+.02*Math.max(0,-t.vy),0,.3)-.2*nx(e.accel/10,-1,1)+.05*i*Math.sin(2*Ry*e.phase+Math.PI/2),s=.06*i*Math.sin(Ry*e.phase+Math.PI/2)-.15*nx(e.yawRate/3,-1,1));let c=Math.ceil(n/Ty);c>12&&(c=12);let l=c>0?n/c:0,u=2*Xy*Yy;for(let t=0;t<c;t++)e.hemPV+=(196*(o-e.hemP)-u*e.hemPV)*l,e.hemP+=e.hemPV*l,e.hemRV+=(196*(s-e.hemR)-u*e.hemRV)*l,e.hemR+=e.hemRV*l;e.channels[22]=nx(e.hemP,-.35,.2),e.channels[23]=nx(e.hemR,-.18,.18)}function vx(e,t,n){let r=t.dt>0?Math.min(t.dt,wy):0,i=t.speed>0?t.speed:0,a=tx(e,t);(e.initialized===0||e.prevState===2&&t.state!==2)&&px(e,a,i,n);let o=e.active;if(e.prevState=t.state,e.active=a,a===7&&o!==7&&(e.tWin=0),e.time+=r,e.phase+=ex(i)*r,e.phase-=Math.floor(e.phase),e.rollT=t.rolling?e.rollT+r:0,r>0){let t=(i-e.prevSpeed)/r;e.accel+=(t-e.accel)*(1-Math.exp(-r/Iy));let a=(n-e.prevYaw)%Ry;a>Math.PI&&(a-=Ry),a<-Math.PI&&(a+=Ry),e.yawRate+=(a/r-e.yawRate)*(1-Math.exp(-r/qy))}if(e.prevYaw=n,e.prevSpeed=i,mx(e,t,r),hx(e,t),(t.events&rb)!==0){let n=nx(t.ropeLen/My,Ny,Py);e.swingVel+=jy*n*e.attachS}let s=1-Math.exp(-r/by[a]),c=0;for(let t=0;t<9;t++){let n=+(t===a);e.weights[t]+=(n-e.weights[t])*s,c+=e.weights[t]}ax(e,rx(e,0,sb)),ix(e,i),cx(e,t.vy),dx(e,t,n,i),lx(e,4,db,t,n),fx(e),rx(e,6,t.deadCause===3?gb:pb),ox(e),ax(e,rx(e,8,hb));let l=c>0?1/c:0;for(let t=0;t<25;t++){let n=0;for(let r=0;r<9;r++)n+=e.weights[r]*e.rows[r*25+t];e.channels[t]=n*l}if(gx(e,r),r>0){let n=+(t.hookFlying===1),i=n===1?Zy:Qy;e.reach+=(n-e.reach)*(1-Math.exp(-r/i))}let u=e.reach;if(u>0){let n=e.channels,r=t.ropeDirY<-1?-1:t.ropeDirY>1?1:t.ropeDirY,i=nx(Math.PI/2+Math.asin(r),.6,3);n[10]+=(i-n[10])*u,n[12]+=(.1-n[12])*u,n[5]-=.15*u}let d=e.active===1?nx(i/6,.3,1):0;_x(e,t,r,i,d);let f=t.state===2,p=f?.05:nx(.2+.12*i+.06*Math.abs(t.vy),.15,1.35);e.scarf+=(p-e.scarf)*(1-Math.exp(-r/Ly));let m=f?0:.08*Math.min(1,i/8)*Math.sin(e.time*17);f||(i<.5&&(m+=.05*Math.sin(Ry*.35*e.time)),m+=.1*d*Math.sin(2*Ry*e.phase+2.2)),e.channels[21]=e.scarf+m;let h=e.channels[24];e.channels[24]=h<-.12?-.12:h>.18?.18:h}function yx(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new kf;c.morphTargetsRelative=s;let l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0,p=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let t in d.morphAttributes){if(!i.has(t))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;if(d.morphAttributes[t].length!==e[0].morphAttributes[t].length)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have the same number of morph targets for the "`+t+`" morph attribute.`),null;o[t]===void 0&&(o[t]=[]),o[t].push(d.morphAttributes[t]),p++}if(p!==i.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of morph attributes.`),null;if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=bx(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=bx(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function bx(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new hf(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}function xx(e,t=1e-4){t=Math.max(t,2**-52);let n={},r=e.getIndex(),i=e.getAttribute(`position`),a=r?r.count:i.count,o=0,s=Object.keys(e.attributes),c=[],l=new Map,u=[],d=[`getX`,`getY`,`getZ`,`getW`],f=t*.5,p=10**Math.log10(1/t),m=f*p;for(let t=0;t<a;t++){let i=r?r.getX(t):t,a=``;for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.getAttribute(n),o=r.itemSize;for(let e=0;e<o;e++)a+=`${Math.trunc(r[d[e]](i)*p+m)},`}a in n?u.push(n[a]):(c.push(i),n[a]=o,u.push(o),o++)}let h=e.clone();for(let t in e.attributes)h.setAttribute(t,Sx(e.attributes[t],c,l));for(let t in e.morphAttributes)h.morphAttributes[t]=e.morphAttributes[t].map(e=>Sx(e,c,l));return h.setIndex(u),h}function Sx(e,t,n=new Map){let r=e.isInterleavedBufferAttribute,i=r?e.data:e,a=r?i.stride:e.itemSize,o=r?n.get(i):void 0;if(o===void 0){let s=new i.array.constructor(t.length*a);for(let e=0;e<t.length;e++)for(let n=0;n<a;n++)s[e*a+n]=i.array[t[e]*a+n];o=r?new i.constructor(s,a,i.meshPerAttribute):new e.constructor(s,e.itemSize,e.normalized,e.meshPerAttribute),o.setUsage(i.usage),r&&n.set(i,o)}let s=r?new e.constructor(o,e.itemSize,e.offset,e.normalized):o;return s.name=e.name,r||(s.gpuType=e.gpuType),s}var Cx={tunic:`#36444c`,trousers:`#2a2f3b`,crimson:`#dc2b34`,skin:`#a5674a`,hair:`#1f1a17`,leather:`#4a3426`},wx=.1,Tx=.7,Ex=.6,Dx=new Au,Ox=new cd,kx=new K(1,1,1);function Ax(e,t,n,r,i=0,a=0,o=0){let s=e.clone();return Dx.setFromEuler(Ox.set(i,a,o)),s.applyMatrix4(new J().compose(new K(t,n,r),Dx,kx)),s}function jx(e){let t=yx(e);for(let t of e)t.dispose();return t}function Mx(e,t,n){let r=e.attributes.position;for(let e=0;e<n;e++){let i=e%(n-1),a=t+e,o=i%3==0?1.06:1;r.setXYZ(a,r.getX(a)*o,r.getY(a)+(i%2==0?-.025:.01),r.getZ(a)*o)}r.needsUpdate=!0,e.computeVertexNormals()}function Nx(e,t){let n=new km(e,t),r=e.length,i=n.attributes.position;for(let e=0;e<=t;e++){let n=e*r+(r-1),a=e%t,o=a%3==0?1.06:1;i.setXYZ(n,i.getX(n)*o,i.getY(n)+(a%2==0?-.025:.01),i.getZ(n)*o)}return i.needsUpdate=!0,n.computeVertexNormals(),n}function Px(e,t,n){let r=e.getAttribute(`position`),i=1/0,a=-1/0;for(let e=0;e<r.count;e++){let t=r.getY(e);t<i&&(i=t),t>a&&(a=t)}for(let e=0;e<r.count;e++){let o=n+(t-n)*((r.getY(e)-i)/(a-i));r.setX(e,r.getX(e)*o),r.setZ(e,r.getZ(e)*o)}r.needsUpdate=!0,e.deleteAttribute(`uv`),e.deleteAttribute(`normal`);let o=xx(e,1e-5);return o.computeVertexNormals(),o}function Fx(e,t,n,r){let i=new Tm(e,t,n,r,1,!0);return Mx(i,r+1,r+1),i}function Ix(e){return jx([Ax(new Tm(.05,.058,.06,7,1,!0),0,.05,0),Ax(new Sm(.075,.085,.045),0,-.005,0),Ax(new Sm(.08,.04,.05),0,-.055,.03,.5),Ax(new Sm(.025,.05,.025),.045*e,-.02,.025)])}var Lx=null;function Rx(){if(Lx===null){let e=(e,t=.18,n=0)=>new Um({color:e,roughness:.85,metalness:0,emissive:e,emissiveIntensity:t,side:n});Lx={tunic:e(Cx.tunic,.1,2),trousers:e(Cx.trousers),crimson:e(Cx.crimson,.35),skin:e(Cx.skin,.12),hair:e(Cx.hair),leather:e(Cx.leather)}}return Lx}function zx(e,t,n,r,i,a){let o=new Z(t,n);return o.position.set(r,i,a),e.add(o),o}function Bx(e,t,n,r){let i=new Ed;return i.position.set(t,n,r),e.add(i),i}var Vx=class{root;pose=new $b;yaw=0;swing;body;yoke;pelvis;spine;head;scarfTail;scarfTip;sashTail;shoulderL;elbowL;handL;shoulderR;elbowR;handR;hipL;kneeL;hipR;kneeR;constructor(){let e=Rx(),t=new Sm(.27,.17,.19),n=new Tm(.195,.19,.085,10),r=new Sm(.09,.3,.022),i=Nx([new G(.16,.06),new G(.19,-.04),new G(.215,-.16)],10),a=new km([new G(0,-.06),new G(.17,-.05),new G(.168,.1),new G(.172,.3),new G(.158,.44),new G(.095,.53),new G(0,.55)],10),o=new Sm(.045,.52,.02),s=jx([Ax(o,0,.23,.15,.06,0,.55),Ax(o,0,.23,-.15,-.06,0,.55)]),c=new Tm(.1,.13,.1,8),l=jx([Ax(new Sm(.11,.44,.025),0,-.21,0,0,.5,0),Ax(new Sm(.08,.3,.02),.05,-.14,-.01,0,-.6,-.25)]),u=new Sm(.06,.16,.2),d=new Mm(.14,8,6),f=new Mm(.153,8,4,0,Math.PI*2,0,Math.PI*.6),p=Px(new Cm(.07,.17,1,6),1.15,.82),m=new Tm(.065,.1,.22,8,1,!0),h=Ix(-1),g=Ix(1),_=Px(new Cm(.085,.31,1,6),1.2,.8),v=Fx(.115,.135,.26,8),y=Px(new Cm(.07,.3,1,6),1.12,.72),b=new Cm(.06,.13,1,6);this.root=new Ed,this.root.name=`heroRig`,this.swing=Bx(this.root,0,2,0),this.body=Bx(this.swing,0,-2,0),this.pelvis=Bx(this.body,0,my,0),zx(this.pelvis,t,e.trousers,0,-.01,0),zx(this.pelvis,n,e.crimson,0,.07,0).scale.set(1,1,.82),this.yoke=Bx(this.pelvis,0,0,0),zx(this.yoke,i,e.tunic,0,0,0).scale.set(1,1,.85),zx(this.pelvis,u,e.leather,.25,-.05,-.03),this.sashTail=Bx(this.pelvis,.15,.06,-.12),zx(this.sashTail,r,e.crimson,0,-.14,0).rotation.z=.12,this.spine=Bx(this.pelvis,0,hy,0),zx(this.spine,a,e.tunic,0,0,0).scale.set(1.1,1,.82),zx(this.spine,s,e.leather,0,0,0),zx(this.spine,c,e.crimson,0,.55,0).scale.set(1,1,.85),this.scarfTail=Bx(this.spine,0,.56,-.12),zx(this.scarfTail,l,e.crimson,0,0,0),this.scarfTip=Bx(this.scarfTail,0,-.42,0),zx(this.scarfTip,new Sm(.09,.2,.018),e.crimson,0,-.1,0),this.head=Bx(this.spine,0,.6,0),zx(this.head,d,e.skin,0,.14,.008).scale.set(.95,1.03,.96),zx(this.head,f,e.hair,0,.156,-.012).rotation.x=-.6,zx(this.head,new Mm(.06,6,4),e.hair,0,.3,-.03),zx(this.head,new Sm(.2,.04,.05),e.hair,0,.215,.115).rotation.x=.35,this.shoulderL=Bx(this.spine,gy,_y,0),this.shoulderR=Bx(this.spine,-gy,_y,0),this.elbowL=Bx(this.shoulderL,0,-vy,0),this.elbowR=Bx(this.shoulderR,0,-vy,0),this.handL=Bx(this.elbowL,0,-yy,0),this.handR=Bx(this.elbowR,0,-yy,0);for(let t=0;t<2;t++){let n=t===0?this.shoulderL:this.shoulderR,r=t===0?this.elbowL:this.elbowR,i=t===0?this.handL:this.handR;zx(n,p,e.tunic,0,-.16,0),zx(r,m,e.tunic,0,-.13,0),zx(i,t===0?h:g,e.leather,0,0,0)}this.hipL=Bx(this.pelvis,wx,-.05,0),this.hipR=Bx(this.pelvis,-.1,-.05,0),this.kneeL=Bx(this.hipL,0,-.43,0),this.kneeR=Bx(this.hipR,0,-.43,0);for(let t=0;t<2;t++){let n=t===0?this.hipL:this.hipR,r=t===0?this.kneeL:this.kneeR;zx(n,_,e.trousers,0,-.235,0),zx(n,v,e.tunic,0,-.13,0),zx(r,y,e.trousers,0,-.2,0);let i=zx(r,b,e.leather,0,-.44,.04);i.rotation.x=Math.PI/2,i.scale.set(1,1,.75)}Hx(this.root)}};function Hx(e){e.updateMatrixWorld(!0);let t=[];e.traverse(n=>{n!==e&&n instanceof Ed&&t.push(n)});let n=new Map;e.traverse(e=>{if(!(e instanceof Z))return;let r=e.material,i=n.get(r);i===void 0&&(i={geos:[],meshes:[]},n.set(r,i));let a=e.geometry.clone();a.deleteAttribute(`uv`),a.applyMatrix4(e.matrixWorld);let o=a.getAttribute(`position`).count,s=t.indexOf(e.parent),c=new Uint16Array(o*4),l=new Float32Array(o*4);for(let e=0;e<o;e++)c[e*4]=s,l[e*4]=1;a.setAttribute(`skinIndex`,new gf(c,4)),a.setAttribute(`skinWeight`,new X(l,4)),i.geos.push(a),i.meshes.push(e)});let r=new Fp(t);for(let[t,i]of n){for(let e of i.meshes)e.parent?.remove(e),e.geometry.dispose();let n=new Ap(jx(i.geos),t);n.name=`heroSkin`,n.frustumCulled=!1;let a=t.color.getHexString();n.userData.cast=a!==Cx.skin.slice(1)&&a!==Cx.hair.slice(1),e.add(n),n.bind(r,new J)}}function Ux(e,t){e.swing.rotation.set(t[19],0,t[20]),e.pelvis.position.set(0,my+t[0],t[1]),e.pelvis.rotation.set(t[2],0,t[3]),e.spine.rotation.set(t[4],t[5],0),e.head.rotation.x=t[6],e.scarfTail.rotation.x=t[21],e.scarfTip.rotation.x=t[21]*Tx,e.sashTail.rotation.x=t[21]*Ex,e.shoulderL.rotation.set(-t[7],0,t[8]),e.shoulderR.rotation.set(-t[10],0,-t[11]),e.elbowL.rotation.x=-t[9],e.elbowR.rotation.x=-t[12],e.hipL.rotation.set(-t[13],0,t[14]),e.hipR.rotation.set(-t[16],0,-t[17]),e.kneeL.rotation.x=t[15],e.kneeR.rotation.x=t[18];let n=t[24],r=n<-.12?-.12:n>.18?.18:n;e.body.scale.set(1+.5*r,1-r,1+.5*r),e.yoke.rotation.set(t[22],0,t[23])}function Wx(e,t){vx(e.pose,t,e.yaw),Ux(e,e.pose.channels)}var Gx=Math.PI*2,Kx=.1,qx=class{group;rig;input;lastMs=-1;constructor(){this.group=new Ed,this.rig=new Vx,this.group.add(this.rig.root),this.input=py()}update(e,t,n,r){this.group.position.set(e.px+(t.px-e.px)*n,e.py+(t.py-e.py)*n,e.pz+(t.pz-e.pz)*n);let i=(t.yaw-e.yaw)%Gx;i>Math.PI&&(i-=Gx),i<-Math.PI&&(i+=Gx);let a=e.yaw+i*n;this.group.rotation.y=a;let o=this.input;o.state=t.dead===1?2:t.mode,o.speed=Math.sqrt(t.vx*t.vx+t.vz*t.vz),o.vy=t.vy,o.deadCause=t.deadCause,o.dt=r===void 0?this.clockDt():r,this.rig.yaw=a,Wx(this.rig,o)}clockDt(){let e=performance.now(),t=this.lastMs<0?0:(e-this.lastMs)/1e3;return this.lastMs=e,t<0?0:t>Kx?Kx:t}},Jx=7230002,Yx=11569232,Xx=16762938,Zx=7029798,Qx=4860956,$x=9063224,eS=.9,tS=.18,nS=.72,rS=40,iS=8,aS=.06,oS=.012,sS=.8,cS={x:0,y:0,z:0,anchorId:-1,set:!1,live:!1},lS=new Y,uS=new Y,dS=new Y;lS.setHex(Jx),uS.setHex(Yx),dS.setHex(Xx);function fS(e,t,n,r){return r.copy((e+t)%3==0?lS:uS).lerp(dS,n)}function pS(e,t,n=null){let r=e.getAttribute(`position`),i=new Float32Array(r.count*3),a=new Y().setHex(t);for(let e=0;e<r.count;e++){let t=1;if(n!==null){let i=(r.getY(e)-n)/eS;i-Math.floor(i)<tS&&(t=nS)}i[e*3]=a.r*t,i[e*3+1]=a.g*t,i[e*3+2]=a.b*t}e.setAttribute(`color`,new hf(i,3))}function mS(e,t,n,r,i,a,o,s=1,c=null){let l=hS(new Sm(r-e,i-t,a-n,1,s,1));return l.translate((e+r)/2,(t+i)/2,(n+a)/2),pS(l,o,c),l}function hS(e){return e.deleteAttribute(`uv`),e}function gS(e,t,n,r,i,a){let o=new Float32Array(1107),s=new Float32Array(1107),c=new Float32Array(1107),l=Math.hypot(r-e,i-t,a-n)*oS,u=[],d=[],f=[];for(let o=0;o<=rS;o++){let s=o/rS;u.push(e+(r-e)*s),d.push(t+(i-t)*s-4*l*s*(1-s)),f.push(n+(a-n)*s)}let p=new Y;for(let e=0;e<=rS;e++){let t=Math.max(0,e-1),n=Math.min(rS,e+1),r=u[n]-u[t],i=d[n]-d[t],a=f[n]-f[t],l=Math.hypot(r,i,a)||1;r/=l,i/=l,a/=l;let m=-a,h=r,g=Math.hypot(m,0,h);g<1e-6?(m=1,h=0):(m/=g,h/=g);let _=i*h-a*0,v=a*m-r*h,y=r*0-i*m,b=e/rS,x=b>sS?(b-sS)/.19999999999999996:0;for(let t=0;t<=iS;t++){let n=t/iS*Math.PI*2,r=Math.cos(n),i=Math.sin(n),a=r*m+i*_,l=r*0+i*v,g=r*h+i*y,b=(e*9+t)*3;o[b]=u[e]+a*aS,o[b+1]=d[e]+l*aS,o[b+2]=f[e]+g*aS,s[b]=a,s[b+1]=l,s[b+2]=g,fS(e,t,x,p),c[b]=p.r,c[b+1]=p.g,c[b+2]=p.b}}let m=[];for(let e=0;e<rS;e++)for(let t=0;t<iS;t++){let n=e*9+t,r=(e+1)*9+t;m.push(n,n+1,r+1,n,r+1,r)}let h=new kf;return h.setAttribute(`position`,new hf(o,3)),h.setAttribute(`normal`,new hf(s,3)),h.setAttribute(`color`,new hf(c,3)),h.setIndex(m),h}function _S(e){let t=new Ed;cS.set=!1,cS.live=!1,cS.anchorId=-1;let n=e.spawn,r=-1;for(let t=0;t<e.solids.length;t++){let i=e.solids[t];if(e.style[t]===2&&n.x>=i.min.x-1e-6&&n.x<=i.max.x+1e-6&&n.z>=i.min.z-1e-6&&n.z<=i.max.z+1e-6&&n.y>=i.min.y-1e-6&&n.y<=i.max.y+3){r=t;break}}if(r<0||e.route.length===0)return t;let i=e.solids[r],a=e.anchors[e.route[0]];if(!a)return t;let o=i.max.y,s=i.min.x-2.6,c=i.max.z-1.2,l=o-6,u=o+2.4,d=[],f=.17;d.push(mS(s-f,l,c-f,s+f,u,c+f,Zx,6,l));for(let e of[.4,1.2,1.9])d.push(mS(s-.2,o+e-.04,c-.2,s+.2,o+e+.04,c+.2,Qx));d.push(mS(s-.23,u,c-.23,s+.23,u+.16,c+.23,Qx));let p=hS(new Em(.34,.32,4));p.rotateY(Math.PI/4),p.translate(s,u+.16+.16,c),pS(p,Qx),d.push(p);for(let e of[2,2.15,2.3]){let t=hS(new Tm(.25,.25,.08,8,1,!0));t.translate(s,o+e,c),pS(t,Jx),d.push(t)}for(let e of[o-3.6,o-5.6])d.push(mS(s+f,e-.09,c-.11,i.min.x,e+.09,c+.11,Qx));d.push(mS(s-.3,l-.4,c-.3,i.min.x,l,c+.3,$x));let m=s+.2,h=o+2.2;cS.x=m,cS.y=h,cS.z=c,cS.anchorId=e.route[0],cS.set=!0;let g=yx(d,!1);for(let e of d)e.dispose();let _=g.getIndex()?.count??0,v=gS(m,h,c,a.px,a.py,a.pz),y=yx([g,v],!1);g.dispose(),v.dispose();let b=new Z(y,new Wm({vertexColors:!0}));return b.name=`ropePost`,b.frustumCulled=!1,b.userData.postIndexCount=_,b.onBeforeRender=()=>{y.setDrawRange(0,cS.live?_:1/0)},t.add(b),t}var vS=Math.PI*2,yS=.05,bS=1.4,xS=4,SS=.035,CS=.02,wS=.35,TS=.27;function ES(e){let t=e.geometry.getAttribute(`position`);if(t===void 0||t.itemSize!==3)return null;let n=t,r=n.array;return n.setUsage(ou),{attr:n,arr:r,base:new Float32Array(r),n:n.count}}function DS(e,t){let n=1/0,r=-1/0;for(let i=0;i<t;i++){let t=e[i*3+1];t<n&&(n=t),t>r&&(r=t)}return{yMin:n,yMax:r}}function OS(e){let t=ES(e);if(t===null)return;let{attr:n,arr:r,base:i,n:a}=t,{yMin:o}=DS(i,a);e.onBeforeRender=()=>{let e=performance.now()/1e3,t=vS*bS*e;for(let e=0;e<a;e++){let n=e*3;i[n+1]>o||(r[n+2]=i[n+2]+yS*Math.sin(t+xS*i[n]))}n.needsUpdate=!0}}function kS(e){let t=ES(e);if(t===null)return;let{attr:n,arr:r,base:i,n:a}=t,{yMin:o,yMax:s}=DS(i,a),c=Math.max(1e-6,s-o);e.onBeforeRender=()=>{let e=performance.now()/1e3,t=SS*Math.sin(vS*wS*e),s=CS*Math.sin(vS*TS*e+1);for(let e=0;e<a;e++){let n=e*3,a=(i[n+1]-o)/c;r[n]=i[n]+t*a,r[n+2]=i[n+2]+s*a}n.needsUpdate=!0}}function AS(e){e.traverse(e=>{let t=e;t.isMesh===!0&&(t.name===`decor_flag`?OS(t):t.name===`decor_canopy`&&kS(t))})}var jS=5,MS=2.4,NS=.5,PS=Math.PI*2;function FS(){let e=new Float32Array(60),t=[];for(let e=0;e<jS;e++){let n=e*4;t.push(n,n+2,n+3,n+1,n+3,n+2)}let n=new kf,r=new hf(e,3);r.setUsage(ou),n.setAttribute(`position`,r),n.setIndex(t);let i=new Z(n,new sp({color:`#2b1d1a`,side:2,fog:!1}));return i.name=`decor_birds`,i.frustumCulled=!1,i.onBeforeRender=(t,n,a)=>{let o=performance.now()/1e3;for(let t=0;t<jS;t++){let n=.12*o+PS*t/jS,r=18+3*t,i=Math.cos(n),a=Math.sin(n),s=3*Math.sin(.7*o+t),c=Math.sin(.25*o+t)>-.3?.45*Math.sin(PS*2.2*o+t):.15,l=i*r,u=a*r,d=MS/2,f=NS/2,p=t*12;e[p]=l+i*d,e[p+1]=s+c,e[p+2]=u+a*d,e[p+3]=l-i*d,e[p+4]=s+c,e[p+5]=u-a*d,e[p+6]=l-a*f,e[p+7]=s,e[p+8]=u+i*f,e[p+9]=l+a*f,e[p+10]=s,e[p+11]=u-i*f}r.needsUpdate=!0,i.position.set(a.position.x+60,a.position.y+22,a.position.z-115),i.updateMatrixWorld()},i}var IS=Math.tan(20*Math.PI/180),LS=-360,RS=-150,zS=5,BS=-260,VS=34,HS=52;function US(e,t,n){let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)}function WS(e){return IS*e+-8}function GS(e,t){return .55*Math.sin(e*.045+1.7)*Math.cos(t*.038+.4)+.3*Math.sin(e*.11+t*.07+2.1)+.15*Math.sin(e*.27-t*.21)}function KS(e,t){let n=WS(t);if(t<RS){let e=RS-t;if(n=WS(RS)-zS*(1-Math.exp(-e/40)),t<BS){let e=BS-t;n+=6e-4*e*e}}else if(t>40){let e=t-40;n+=9e-4*e*e}let r=Math.abs(e),i=US(VS,HS,r);if(i<=0)return n;let a=r-VS,o=.0014*a*a+.05*a;return n+i*(o+3.2*GS(e,t)*US(VS,94,r))}var qS=`#678a3c`,JS=`#7c8c42`,YS=`#857a50`,XS=`#43763a`,ZS=`#3f5a33`,QS=`#2f4a2f`,$S=`#6f6a5c`;function eC(e,t,n,r,i,a,o){let s=new Set(o);for(let e=r;e<=i+1e-6;e+=n)s.add(Math.round(e*100)/100);let c=n;for(let e=i;e<t;)c*=a,e+=c,s.add(Math.min(t,Math.round(e*100)/100));c=n;for(let t=r;t>e;)c*=a,t-=c,s.add(Math.max(e,Math.round(t*100)/100));return s.add(e),s.add(t),Array.from(s).sort((e,t)=>e-t)}function tC(e,t){return(Math.imul((e+1)*7919,(t+3)*104729+17)>>>0)/4294967296}function nC(e,t,n,r,i){let a=Math.abs(e),o=n-WS(t),s=Math.floor((t+400)/9)%3;r.set(qS),s===1&&r.lerp(new Y(JS),.7),a<14&&r.lerp(new Y(YS),.18*i);let c=Math.min(1,Math.max(0,(a-36)/40));r.lerp(new Y(XS),c*(.5+.5*i));let l=Math.min(1,Math.max(0,(o-18)/50));r.lerp(new Y(ZS),l);let u=Math.min(1,Math.max(0,(o-55)/70));r.lerp(new Y(QS),u);let d=Math.min(1,Math.max(0,(o-110)/60));return r.lerp(new Y($S),d*.6),r.multiplyScalar(.92+.14*i)}function rC(){let e=eC(-320,320,3,-42,42,1.22,[-34,34,0]),t=eC(LS,200,3,-156,46,1.22,[40,-150,-104,26]),n=e.length,r=t.length,i=[],a=[],o=[],s=new Y;for(let o=0;o<r;o++){let c=t[r-1-o];for(let t=0;t<n;t++){let n=e[t],r=KS(n,c);i.push(n,r,c),nC(n,c,r,s,tC(o,t)),a.push(s.r,s.g,s.b)}}for(let e=0;e+1<r;e++)for(let t=0;t+1<n;t++){let r=e*n+t,i=r+1,a=r+n,s=a+1;o.push(r,i,a,i,s,a)}let c=new kf;c.setAttribute(`position`,new X(i,3)),c.setAttribute(`color`,new X(a,3)),c.setIndex(o),c.computeVertexNormals();let l=new Z(c,new Wm({vertexColors:!0}));return l.name=`decor_ground`,l}var iC=`/bhaaag/assets/textures/`,aC=new Map;function oC(e){if(typeof document>`u`)return null;let t=aC.get(e);return t||(t=new yh().load(iC+e+`.jpg`),t.wrapS=Mc,t.wrapT=Mc,t.colorSpace=eu,t.anisotropy=4,aC.set(e,t)),t}function sC(e){if(typeof document>`u`)return null;let t=e+`_n`,n=aC.get(t);return n||(n=new yh().load(iC+t+`.jpg`),n.wrapS=Mc,n.wrapT=Mc,n.colorSpace=tu,n.anisotropy=4,aC.set(t,n)),n}var cC=[`body`,`cornice`,`window`,`roof`,`rail`,`deck`,`tank`,`parapet`,`canopy`,`trunk`,`flag`,`shutter`,`pot`,`wallBrick`,`wallPlaster`,`bracket`,`planter`,`conifer`,`trim`],lC={body:150,cornice:50,window:250,roof:20,rail:170,deck:28,tank:50,parapet:60,canopy:640,trunk:640,flag:260,shutter:60,pot:110,wallBrick:30,wallPlaster:20,bracket:155,planter:20,conifer:700,trim:700},uC=.74*Math.SQRT2,dC=2.18,fC=2.4,pC=.9,mC=1.05;function hC(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function gC(e,t){let n=e.getAttribute(`position`),r=[];for(let e=0;e<n.count;e++){let i=t(n.getY(e));r.push(i[0],i[1],i[2])}e.setAttribute(`color`,new X(r,3))}function _C(e,t){gC(e,()=>[t,t,t])}function vC(e,t){let n=new Y(t);gC(e,()=>[n.r,n.g,n.b])}function yC(e,t,n){let r=Math.max(1e-6,n-t);gC(e,e=>{let n=.6+.4*Math.min(1,Math.max(0,(e-t)/r))**.75;return[n,n,n]})}function bC(e,t,n,r,i,a,o=[]){let s=new Sm(e,t,n);if(s.translate(r,i,a),s.deleteAttribute(`uv`),o.length>0){let e=s.index,t=[];for(let n=0;n<6;n++)if(!(o.indexOf(n)>=0))for(let r=0;r<6;r++)t.push(e.getX(n*6+r));s.setIndex(t)}return s}function xC(e){let t=yx(e,!1);for(let t=0;t<e.length;t++)e[t].dispose();return t}function SC(){let e=new Sm(1,1,1);return e.translate(0,.5,0),e.deleteAttribute(`uv`),yC(e,0,1),e}function CC(e){let t=new Sm(1,1,1);return t.translate(0,.5,0),yC(t,0,1),wC(t,e,e),t}function wC(e,t,n){let r=e.getAttribute(`uv`);for(let e=0;e<r.count;e++)r.setXY(e,r.getX(e)*t,r.getY(e)*n)}function TC(e){return e.deleteAttribute(`uv`),_C(e,1),e}function EC(){let e=[],t=(t,n)=>{n===null?yC(t,0,mC):_C(t,n),e.push(t)};t(bC(fC,.06,.06,0,.87,0),null),t(bC(fC,.06,.06,0,.25,0),null);for(let e=0;e<6;e++)t(bC(.05,pC,.05,-1+e*.4,pC/2,0,[2,3]),null);return t(bC(.12,mC,.12,-1.14,mC/2,0),null),t(bC(.12,mC,.12,1.14,mC/2,0),null),t(bC(fC,.18,.03,0,.71,0),.7),xC(e)}function DC(){let e=bC(1,1,1,0,.5,0,[5]);yC(e,0,1);let t=new Am(.76,.8);t.translate(0,.5,.75),t.deleteAttribute(`uv`),_C(t,.4);let n=bC(1.2,.08,1.6,0,-.04,.3,[5]);_C(n,.72);let r=bC(1.3,.1,1.5,0,1.06,.25,[5]);_C(r,.85);let i=bC(1,.08,1.3,0,1.15,.2,[5]);_C(i,1);let a=[e,t,n,r,i];for(let e=0;e<2;e++){let t=new Am(.05,.8);t.translate(-.13+e*.26,.5,.76),t.deleteAttribute(`uv`),_C(t,.15),a.push(t);let n=new Am(.76,.05);n.translate(0,.37+e*.26,.76),n.deleteAttribute(`uv`),_C(n,.15),a.push(n)}return xC(a)}function OC(){let e=[0,.04,.1,.28,.49],t=[.5,.78,1,.88,1],n=new km([new G(.56,0),new G(.74,.04),new G(.58,.1),new G(.34,.28),new G(0,.49)],4,Math.PI/4);return wC(n,12,2),gC(n,n=>{let r=0;for(let t=1;t<e.length;t++)Math.abs(e[t]-n)<Math.abs(e[r]-n)&&(r=t);let i=t[r];return[i,i,i]}),n}function kC(){let e=[];for(let t=-1;t<=1;t+=2)for(let n=-1;n<=1;n+=2){let r=bC(.08,1,.08,t*.42,.5,n*.42,[2,3]);_C(r,.55),e.push(r)}for(let t=-1;t<=1;t+=2){let n=new Sm(.04,1.1,.04);n.rotateZ(.7),n.translate(0,.5,t*.42),n.deleteAttribute(`uv`),_C(n,.5),e.push(n)}let t=bC(.04,1.9,.04,.5,.95,.2,[2,3]),n=bC(.04,1.9,.04,.5,.95,-.2,[2,3]);_C(t,.5),_C(n,.5),e.push(t,n);for(let t=0;t<5;t++){let n=bC(.04,.04,.4,.5,.25+t*.35,0,[2,3]);_C(n,.5),e.push(n)}let r=bC(1,.08,1,0,1.04,0);_C(r,.55),e.push(r);let i=new Tm(.5,.5,1.1,8);return i.translate(0,1.08+.55,0),e.push(TC(i)),xC(e)}function AC(){let e=new Om(1,1),t=e.getAttribute(`position`);for(let e=0;e<t.count;e++){let n=t.getX(e),r=t.getY(e),i=t.getZ(e),a=1+(hC((Math.imul(Math.round(n*1e3),73856093)^Math.imul(Math.round(r*1e3),19349663)^Math.imul(Math.round(i*1e3),83492791))>>>0)()*2-1)*.06;t.setXYZ(e,n*a,r*a,i*a)}return TC(e)}function jC(){let e=bC(.45,1.3,.04,-.705,.65,.02,[5]),t=bC(.45,1.3,.04,.705,.65,.02,[5]);return _C(e,.8),_C(t,.8),xC([e,t])}function MC(){let e=new Tm(.16,.12,.28,6,1,!0);e.translate(0,.14,0),e.deleteAttribute(`uv`);let t=e.toNonIndexed();e.dispose(),vC(t,`#9a4a2e`);let n=new Om(.24,0);return n.translate(0,.42,0),n.deleteAttribute(`uv`),vC(n,`#5d7a3a`),xC([t,n])}function NC(){let e=bC(.1,.5,.1,0,.25,.05),t=bC(.1,.07,.5,0,.465,.25),n=new Sm(.07,.07,.5);return n.rotateX(-.75),n.translate(0,.25,.22),n.deleteAttribute(`uv`),_C(e,.9),_C(t,1),_C(n,.8),xC([e,t,n])}function PC(){let e=bC(1.2,.35,.4,0,.175,0);_C(e,.55);let t=[e.toNonIndexed()];e.dispose();for(let e=0;e<2;e++){let n=new Om(.3,0);n.translate(-.3+e*.6,.5,0),n.deleteAttribute(`uv`),vC(n,e===0?`#5d7a3a`:`#6f8a3f`),t.push(n)}return xC(t)}function FC(){let e=[];for(let t=0;t<2;t++){let n=new Em(t===0?1:.64,t===0?.62:.55,6,1,!0);n.translate(0,t===0?.31:.725,0),n.deleteAttribute(`uv`);let r=n.toNonIndexed();n.dispose(),yC(r,0,1),e.push(r)}return xC(e)}function IC(){let e=new Tm(.15,.2,1,5,1,!0);e.translate(0,.5,0);let t=new Am(.35,.25);return{body:SC(),cornice:SC(),window:DC(),roof:OC(),rail:EC(),deck:SC(),tank:kC(),parapet:SC(),canopy:AC(),trunk:TC(e),flag:TC(t),shutter:jC(),pot:MC(),wallBrick:CC(2),wallPlaster:CC(1.5),bracket:NC(),planter:PC(),conifer:FC(),trim:SC()}}function LC(e){return e.index?e.index.count/3:e.getAttribute(`position`).count/3}var RC=new J,zC=new Au,BC=new K,VC=new K,HC=new K(0,1,0),UC=class{meshes;used;dropped;constructor(){let e=IC(),t=new Wm({color:`#ffffff`,vertexColors:!0,flatShading:!0}),n=new Wm({color:`#ffffff`,vertexColors:!0,flatShading:!0,side:2}),r=e=>new Wm({color:`#ffffff`,vertexColors:!0,flatShading:!0,map:oC(e),normalMap:sC(e)}),i=r(`wall_brick`),a=r(`wall_plaster`),o=r(`roof_tile`),s={},c={},l={};for(let r=0;r<cC.length;r++){let u=cC[r],d=new Wp(e[u],u===`flag`||u===`pot`||u===`shutter`?n:u===`wallBrick`?i:u===`wallPlaster`?a:u===`roof`?o:t,lC[u]);d.name=`decor_`+u,d.count=0,d.frustumCulled=!1,d.userData.cast=u===`wallBrick`||u===`wallPlaster`||u===`roof`,s[u]=d,c[u]=0,l[u]=0}this.meshes=s,this.used=c,this.dropped=l}add(e,t,n,r,i,a,o,s,c){let l=this.used[e];if(l>=lC[e])return this.dropped[e]++,!1;BC.set(t,n,r),zC.setFromAxisAngle(HC,s),VC.set(i,a,o),RC.compose(BC,zC,VC);let u=this.meshes[e];return u.setMatrixAt(l,RC),u.setColorAt(l,c),this.used[e]=l+1,!0}triangles(){let e=0;for(let t=0;t<cC.length;t++){let n=cC[t];e+=this.used[n]*LC(this.meshes[n].geometry)}return e}finish(){let e=new Ed;for(let t=0;t<cC.length;t++){let n=cC[t],r=this.meshes[n];r.count=this.used[n],r.instanceMatrix.needsUpdate=!0,r.instanceColor&&(r.instanceColor.needsUpdate=!0),r.count>0&&e.add(r)}return e}},WC=2.8,GC=.5,KC=[`#9c5640`,`#8c4a38`,`#a8634a`],qC=[`#4a2c1c`,`#5a3622`],JC=`#a99a88`,YC=[`#26282c`,`#2e6b47`],XC=[`#4a2c1c`,`#5a3622`,`#7c3e2e`,`#2e6b47`],ZC=`#8e8574`,QC=[`#d9c6aa`,`#cfb99a`,`#e0cfb4`,`#e6d9c0`,`#d8b98e`,`#c9a27a`,`#e3c9b0`,`#b9c4a0`,`#d4a89a`,`#c8c0a8`],$C=[`#46683a`,`#587a3a`,`#3f5e34`,`#6a8a3e`],ew=[`#2f4a2f`,`#35553a`,`#2a4430`,`#3b5a36`],tw=`#4a3424`,nw=.118,rw=[`#6b8fb5`,`#8fae8a`,`#a98fb8`,`#7aa3a0`],iw=[`#2f62b8`,`#f2efe4`,`#c8322f`,`#2f8a4f`,`#d0a12e`],aw=`#3a2a20`;function ow(e,t,n){return KS(t,n)}function sw(e){let t=e.spawn.z;for(let n=0;n<e.solids.length;n++)(n<e.style.length?e.style[n]:1)===2&&e.solids[n].max.z>t&&(t=e.solids[n].max.z);return{zMin:e.goal.min.z-8,zMax:t+8}}function cw(e,t){let n=GC;for(let r=0;r<e.solids.length;r++){let i=e.solids[r];if(!(t.max[0]<=i.min.x-n||t.min[0]>=i.max.x+n)&&!(t.max[2]<=i.min.z-n||t.min[2]>=i.max.z+n)&&!(t.min[1]>=i.max.y-.001)&&!(t.max[1]<=i.min.y-n||t.min[1]>=i.max.y+n))return!0}for(let r=0;r<e.roofs.length;r++){let i=e.roofs[r].aabb;if(!(t.max[0]<=i.min.x-n||t.min[0]>=i.max.x+n)&&!(t.max[2]<=i.min.z-n||t.min[2]>=i.max.z+n)&&!(t.max[1]<=i.min.y-n||t.min[1]>=i.max.y+n))return!0}return!1}function lw(e,t){let n=sw(e);if(t.max[2]<=n.zMin||t.min[2]>=n.zMax||t.min[0]>=4.5||t.max[0]<=-4.5)return!1;if(t.kind!==`tree`)return!0;let r=(t.min[0]+t.max[0])/2,i=(t.min[2]+t.max[2])/2;return t.max[1]>ow(e,r,i)+6+1e-6}var uw=class{world;rng;kit=new UC;boxes=[];strings=[];tmp=new Y;fx=hC(31249);onHouse=!1;constructor(e,t){this.world=e,this.rng=t}room(e,t){return this.kit.used[e]+t<=.9*lC[e]}U(e,t){return e+(t-e)*this.rng()}pick(e){return e[Math.min(e.length-1,Math.floor(this.rng()*e.length))]}col(e){return this.tmp.set(e).multiplyScalar(1+this.U(-.05,.05))}colRaw(e){return this.tmp.set(e)}rec(e,t,n){let r={kind:e,min:[t[0],t[1],t[2]],max:[n[0],n[1],n[2]]};this.onHouse&&(r.house=!0),this.boxes.push(r)}box(e,t,n,r,i,a,o,s,c){let l=this.kit.add(e,(n+a)/2,r,(i+s)/2,a-n,o-r,s-i,0,c);return l&&this.rec(t,[n,r,i],[a,o,s]),l}roof(e,t,n,r,i,a,o,s){this.kit.add(`roof`,t,n,r,i/uC,o/.49,a/uC,0,s)&&this.rec(e,[t-i/2,n,r-a/2],[t+i/2,n+o,r+a/2])}tank(e,t,n,r,i,a){this.kit.add(`tank`,e,t,n,2*r,i/2.18,2*r,0,a)&&this.rec(`tank`,[e-r,t,n-r],[e+r,t+i,n+r])}conifer(e,t,n,r,i,a,o){this.kit.add(`conifer`,t,n,r,i,a,i,0,o)&&this.rec(e,[t-i,n,r-i],[t+i,n+a,r+i])}canopy(e,t,n,r,i,a){this.kit.add(`canopy`,t,n,r,i,i,i,0,a)&&this.rec(e,[t-i,n-i,r-i],[t+i,n+i,r+i])}trunk(e,t,n,r,i,a){this.kit.add(`trunk`,t,n,r,1,i,1,0,a)&&this.rec(e,[t-.2,n,r-.2],[t+.2,n+i,r+.2])}rail(e,t,n,r,i,a){if(!this.kit.add(`rail`,e,t,n,r/2.4,1,1,i?Math.PI/2:0,a))return;let o=i?.04:r/2,s=i?r/2:.04;this.rec(`rail`,[e-o,t,n-s],[e+o,t+mC,n+s])}flag(e,t,n,r,i=Math.PI/2){if(!this.kit.add(`flag`,e,t,n,1,1,1,i,r))return;let a=Math.abs(Math.cos(i))*.175+Math.abs(Math.sin(i))*.02,o=Math.abs(Math.sin(i))*.175+Math.abs(Math.cos(i))*.02;this.rec(`flag`,[e-a,t-.125,n-o],[e+a,t+.125,n+o])}planter(e,t,n){this.kit.add(`planter`,e,t,n,1,1,1,Math.PI/2,this.tmp.setScalar(this.U(.9,1)))&&this.rec(`pot`,[e-.3,t,n-.65],[e+.3,t+.85,n+.65])}pot(e,t,n){this.kit.add(`pot`,e,t,n,1,1,1,0,this.tmp.setScalar(this.U(.88,1)))&&this.rec(`pot`,[e-.24,t,n-.24],[e+.24,t+.66,n+.24])}facing(e,t,n,r,i,a,o,s,c,l){let u=e===`window`,d=u?.5*c:0,f=e===`bracket`,p=u?.6*o:f?.06:.93,m=u?1.6*c:f?.5:.04,h=u?i-.08*s:i,g=u?i+s:f?i+.5:i+1.3,_=0,v=r,y=a;n===`x-`?(_=-Math.PI/2,v=r-d):n===`x+`?(_=Math.PI/2,v=r+d):n===`z+`?y=a+d:(_=Math.PI,y=a-d),this.kit.add(e,v,i,y,o,s,c,_,l)&&(n===`x-`?this.rec(t,[r-m,h,a-p],[r,g,a+p]):n===`x+`?this.rec(t,[r,h,a-p],[r+m,g,a+p]):n===`z+`?this.rec(t,[r-p,h,a],[r+p,g,a+m]):this.rec(t,[r-p,h,a-m],[r+p,g,a]))}allowed(e,t,n){let r={kind:e,min:[t[0],t[1],t[2]],max:[n[0],n[1],n[2]]};return!lw(this.world,r)&&!cw(this.world,r)}};function dw(e,t){let n=(t.max.x-t.min.x)*(t.max.z-t.min.z);for(let r=0;r<e.solids.length;r++){if((r<e.style.length?e.style[r]:1)!==1)continue;let i=e.solids[r];if(Math.abs(i.max.y-t.min.y)>.1)continue;let a=Math.min(t.max.x,i.max.x)-Math.max(t.min.x,i.min.x),o=Math.min(t.max.z,i.max.z)-Math.max(t.min.z,i.min.z);if(a>0&&o>0&&a*o>=.5*n)return i}return null}function fw(e){let t=[];for(let n=1;n<e.solids.length;n++){let r=n<e.style.length?e.style[n]:1,i=e.solids[n];if(r===2&&i.max.x-i.min.x>=6){let n=dw(e,i);if(n===null)continue;t.push({x0:i.min.x,x1:i.max.x,z0:i.min.z,z1:i.max.z,yBase:n.min.y,yE:i.min.y,top:i.max.y,decoy:!1})}else r===3&&i.max.y-i.min.y>5&&t.push({x0:i.min.x,x1:i.max.x,z0:i.min.z,z1:i.max.z,yBase:i.min.y,yE:i.max.y,top:i.max.y,decoy:!0})}return t.sort((e,t)=>t.z1-e.z1),t}var pw=KS;function mw(e,t,n){let r=pw(t,n);for(let i=0;i<e.length;i++){let a=e[i];t>a.x0&&t<a.x1&&n>a.z0&&n<a.z1&&a.top>r&&(r=a.top)}return r}function hw(e,t,n,r){let i=Math.sqrt((n[0]-t[0])**2+(n[2]-t[2])**2),a=(r?.05:.08)*i,o=r?rw:iw,s=Math.atan2(-(n[2]-t[2]),n[0]-t[0]),c=t[0],l=t[1],u=t[2];for(let r=1;r<=12;r++){let i=r/12,o=t[0]+(n[0]-t[0])*i,s=t[1]+(n[1]-t[1])*i-a*4*i*(1-i),d=t[2]+(n[2]-t[2])*i;e.strings.push(c,l,u,o,s,d),c=o,l=s,u=d}let d=e.world;for(let r=0;r<12;r++){let i=(r+.5)/12,c=t[0]+(n[0]-t[0])*i,l=t[1]+(n[1]-t[1])*i-a*4*i*(1-i)-.2,u=t[2]+(n[2]-t[2])*i,f=!1;for(let e=0;e<d.anchors.length;e++){let t=d.anchors[e],n=t.px-c,r=t.py-l,i=t.pz-u;n*n+r*r+i*i<9&&(f=!0)}f||e.flag(c,l,u,e.colRaw(o[r%o.length]),s+r%2*Math.PI)}}var gw=1.5;function _w(e,t){let n=e.world;e.onHouse=!0;let r=[`x-`,`x+`,`z+`,`z-`],i={"x-":[-1,0],"x+":[1,0],"z+":[0,1],"z-":[0,-1]};for(let a=0;a<t.length;a++){let o=t[a],{x0:s,x1:c,z0:l,z1:u,yBase:d,yE:f}=o,p=(s+c)/2,m=(l+u)/2,h=t.some(e=>e!==o&&Math.abs(e.z1-l)<.05&&e.x0<c&&e.x1>s),g=h?l:l-.05;if(!o.decoy){let t=Math.min(1.5,f-d-4);e.box(`wallBrick`,`base`,s-.08,d,h?l:l-.08,c+.08,d+t,u+.08,e.col(KC[a%3])),e.box(`wallPlaster`,`plaster`,s-.05,d+t,g,c+.05,f-.35,u+.05,e.col(QC[(a*3+1)%QC.length])),e.box(`cornice`,`cornice`,s-.12,d+t-.05,h?l:l-.12,c+.12,d+t+.2,u+.12,e.colRaw(qC[1])),e.box(`cornice`,`cornice`,s-.25,f-.35,h?l:l-.25,c+.25,f,u+.25,e.colRaw(qC[0]))}for(let n=0;n<4;n++){let a=r[n],[m,h]=i[a],g=a===`z+`||a===`z-`,_=g?c-s:u-l,v=Math.floor(_/2.8),y=e=>[a===`x-`?s:a===`x+`?c:s+e,a===`z+`?u:a===`z-`?l:l+e];for(let n=0;n<3;n++){let r=d+n*WC+1;if(!(r+1.3>f-.45))for(let n=0;n<v;n++){let[i,s]=y(_*(n+.5)/v),c=-1/0;for(let e=-1;e<=1;e++){let n=i+m*.35+(g?e*.5:0),r=s+h*.35+(g?0:e*.5);c=Math.max(c,mw(t,n,r))}if(!(r<c+.3)){if(e.facing(`window`,`window`,a,i,r,s,.9,1.3,nw,e.colRaw(e.pick(qC))),!o.decoy&&e.room(`trim`,2)){let t=g?.62:.1,n=g?.1:.62,a=e.colRaw(qC[1]),o=m*.14,c=h*.14;e.box(`trim`,`trim`,i-t+o,r+1.3,s-n+c,i+t+o,r+1.46,s+n+c,a),e.box(`trim`,`trim`,i-t+o,r-.16,s-n+c,i+t+o,r-.04,s+n+c,a)}!o.decoy&&e.fx()<.35&&e.facing(`shutter`,`shutter`,a,i,r,s,1,1,1,e.colRaw(e.pick(XC)))}}}if(a===`z-`&&mw(t,p,l-.35)<=d+.2){if(e.box(`body`,`door`,p-.55,d,l-.1,p+.55,d+2.1,l,e.colRaw(qC[0])),e.box(`body`,`step`,p-.9,d,l-.45,p+.9,d+.16,l-.1,e.colRaw(ZC)),!o.decoy&&e.room(`trim`,3)){let t=e.colRaw(qC[1]);e.box(`trim`,`trim`,p-.7,d,l-.2,p-.55,d+2.3,l,t),e.box(`trim`,`trim`,p+.55,d,l-.2,p+.7,d+2.3,l,t),e.box(`trim`,`trim`,p-.7,d+2.1,l-.2,p+.7,d+2.3,l,t)}!o.decoy&&e.room(`pot`,2)&&(e.pot(p-1.5,pw(p-1.5,l-.5),l-.5),e.pot(p+1.5,pw(p+1.5,l-.5),l-.5))}if(!o.decoy){let n=Math.max(2,Math.floor(_/2.6));if(e.room(`bracket`,n))for(let r=0;r<n;r++){let[o,s]=y(_*(r+.5)/n);mw(t,o+i[a][0]*.3,s+i[a][1]*.3)>f-1||e.facing(`bracket`,`bracket`,a,o,f-.55,s,1,1,1,e.colRaw(qC[1]))}}}if(o.decoy)continue;for(let t=1;t<n.solids.length;t++){if((t<n.style.length?n.style[t]:1)!==1)continue;let r=n.solids[t];if(r.max.y-r.min.y>.5||r.max.y>o.top-1||r.max.y<f-6||r.min.z<l-.001||r.max.z>u+.001)continue;let i=Math.abs(r.min.x-c)<.001?1:Math.abs(r.max.x-s)<.001?-1:0;if(i===0)continue;let a=r.max.y,d=i>0?r.max.x-.08:r.min.x+.08,p=r.max.z-r.min.z,h=Math.ceil(p/fC);if(e.room(`rail`,h+2)){for(let t=0;t<h;t++)e.rail(d,a,r.min.z+p/h*(t+.5),p/h,!0,e.colRaw(qC[0]));e.rail((r.min.x+r.max.x)/2,a,r.min.z+.05,r.max.x-r.min.x,!1,e.colRaw(qC[0])),e.rail((r.min.x+r.max.x)/2,a,r.max.z-.05,r.max.x-r.min.x,!1,e.colRaw(qC[0]))}e.pot((r.min.x+r.max.x)/2,a,m-1.2),e.pot((r.min.x+r.max.x)/2,a,m+1.2);for(let t=0;t<3;t++)e.facing(`bracket`,`bracket`,i>0?`x+`:`x-`,i>0?c:s,a-.8,r.min.z+p*(t+.5)/3,1,1,1,e.colRaw(qC[1]))}let _=o.top;e.box(`parapet`,`parapet`,s,_,u-.2,c,_+.2,u,e.colRaw(JC));let v=s+1.1,y=m-.8,b=_;if(e.room(`rail`,40))for(let t=0;t<n.solids.length;t++){let r=n.solids[t];if((t<n.style.length?n.style[t]:1)===4&&!(Math.abs(r.min.y-_)>.001)&&!(r.min.x<s-.001||r.max.x>c+.001||r.min.z<l-.001||r.max.z>u+.001)){if(r.max.y-r.min.y>.5)v=(r.min.x+r.max.x)/2,y=(r.min.z+r.max.z)/2,b=r.max.y;else if(r.max.z-r.min.z>r.max.x-r.min.x){let t=(r.min.x+r.max.x)/2,n=Math.max(1,Math.ceil((r.max.z-r.min.z)/fC));for(let i=0;i<n;i++)e.rail(t,_+.4,r.min.z+(r.max.z-r.min.z)*(i+.5)/n,(r.max.z-r.min.z)/n,!0,e.colRaw(qC[0]))}}}e.tank(v,b,y,.5,dC*.8,e.colRaw(e.pick(YC))),e.room(`planter`,1)&&e.planter(v,_,m+1.6),e.pot(v,_,u-.8)}e.onHouse=!1}function vw(e,t){let n=t.filter(e=>!e.decoy);e.onHouse=!0;let r=new Map,i=(t,n,i,a)=>{let o=`${a}:${n}:${i.toFixed(2)}`,s=r.get(o);if(s!==void 0)return s;let c=n*((t.x1-t.x0)/2-.15)+(t.x0+t.x1)/2;e.trunk(`mast`,c,t.top+.4,i,gw,e.colRaw(qC[0]));let l=[c,t.top+.4+gw,i];return r.set(o,l),l};for(let t=0;t+1<n.length;t++){let r=n[t],a=n[t+1],o=Math.abs(a.z1-r.z0)<.05,s=t%2==0?1:-1;if(!e.room(`flag`,12))break;hw(e,i(r,s,(r.z0+r.z1)/2,`h`+t),i(a,s,(a.z0+a.z1)/2,`h`+(t+1)),!1),o||hw(e,i(r,-s,(r.z0+r.z1)/2,`h`+t),i(a,-s,(a.z0+a.z1)/2,`h`+(t+1)),!1)}for(let t=1;t<n.length;t+=2){let r=n[t];if(!e.room(`flag`,12))break;let a=t%4==1?-1:1;hw(e,i(r,a,r.z0+1,`l`+t),i(r,a,r.z1-1,`l`+t),!0)}e.onHouse=!1}function yw(e,t,n,r){for(let i=0;i<e.length;i++){let a=e[i];if(t>a.x0-r&&t<a.x1+r&&n>a.z0-r&&n<a.z1+r)return!0}return!1}function bw(e,t,n,r,i,a,o){let s=KS(t,n),c=2+.4*r,l=s+c+r*.6;return!e.room(`canopy`,1)||!e.room(`trunk`,1)||!e.allowed(i,[t-r,s,n-r],[t+r,l+r,n+r])?!1:(e.trunk(i,t,s-.3,n,c+.3,e.colRaw(tw)),e.canopy(i,t,l,n,r,e.col($C[o]).multiplyScalar(a)),!0)}function xw(e,t,n,r,i,a,o){let s=KS(t,n),c=r*3.4;return!e.room(`conifer`,1)||!e.allowed(i,[t-r,s,n-r],[t+r,s+c,n+r])?!1:(e.conifer(i,t,s-.4,n,r,c,e.col(ew[o]).multiplyScalar(a)),!0)}function Sw(e,t,n){let r=hC(n^32485);for(let n=-1;n<=1;n+=2)for(let i=24;i>-104;i-=11)for(let a=7;a<31;a+=11){let o=n*(a+(r()-.5)*6),s=i+(r()-.5)*7,c=1.3+.9*r(),l=Math.floor(r()*$C.length),u=.95+.1*r(),d=r();if(!(d<.35)&&!yw(t,o,s,3.5+c)&&!(Math.abs(o)>31.5-c)){if(d<.55)xw(e,o,s,c*.9,`tree`,u,l);else if(d<.9)bw(e,o,s,c,`tree`,u,l);else{let t=.6+.4*r(),n=KS(o,s);e.allowed(`tree`,[o-t,n,s-t],[o+t,n+t*1.6,s+t])&&e.room(`canopy`,1)&&e.canopy(`tree`,o,n+t*.7,s,t,e.col($C[l]))}}}}function Cw(e,t){let n=hC(t^22441);for(let t=-1;t<=1;t+=2)for(let r=80;r>-300;r-=17){let i=40+26*n(),a=6+8*n();if(n()<.35)continue;if(!e.room(`body`,1))return;let o=t>0?i:-i-a,s=o+a,c=1/0,l=-1/0;for(let e=0;e<=4;e++){let t=KS(o+a*e/4,r);c=Math.min(c,t),l=Math.max(l,t)}e.allowed(`terrace`,[o,c-.3,r-.3],[s,l+.9,r+.3])&&e.box(`body`,`terrace`,o,c-.3,r-.3,s,l+.8,r+.3,e.col(ZC))}}function ww(e,t,n){let r=hC(n^986711),i=[];for(let e=-1;e<=1;e+=2)for(let t=194;t>LS+6;t-=9)for(let n=37;n<314;){let a=n<110?9:n<190?13:20,o=e*(n+(r()-.5)*a*.8),s=t+(r()-.5)*7,c=r(),l=r(),u=r(),d=r();n+=a;let f=Math.abs(o),p=.78-.5*Math.min(1,(f-37)/280);if(s<-140&&f<90&&l<.55||l>p)continue;let m=KS(o,s)-WS(s),h=f>110?1.45:1,g=m>50||m>22&&d<(m-22)/28;i.push({x:o,z:s,r:(g?1.7+.8*c:2.3+1.1*c)*h,con:g,tint:.94+.12*u,pick:Math.floor(d*4)%4})}for(let e=0;e<60;e++){let n=(e%2==0?1:-1)*(8+26*r()),a=r()<.5?30+80*r():-112-120*r();yw(t,n,a,4)||i.push({x:n,z:a,r:1.6+1.2*r(),con:r()<.4,tint:.95+.1*r(),pick:Math.floor(r()*4)})}for(let e=i.length-1;e>0;e--){let t=Math.floor(r()*(e+1)),n=i[e];i[e]=i[t],i[t]=n}let a={canopy:e.kit.used.canopy,trunk:e.kit.used.trunk,conifer:e.kit.used.conifer};for(let t=0;t<i.length;t++){let n=i[t];n.con?xw(e,n.x,n.z,n.r,`tree`,n.tint,n.pick):bw(e,n.x,n.z,n.r,`tree`,n.tint,n.pick)}return[a.canopy,a.trunk,a.conifer]}function Tw(e,t=1729,n={}){let r=n.scenery!==!1,i=new uw(e,hC(t)),a=new Ed;a.name=`decor`;let o=fw(e),s;pw=r?KS:(e,t)=>WS(t);try{_w(i,o),vw(i,o),r?(Sw(i,o,t),Cw(i,t),s=ww(i,o,t)):s=[i.kit.used.canopy,i.kit.used.trunk,i.kit.used.conifer]}finally{pw=KS}a.add(i.kit.finish());let c=r?rC():null;if(c!==null&&a.add(c),i.strings.length>0){let e=new kf;e.setAttribute(`position`,new X(i.strings,3));let t=new lm(e,new Zp({color:new Y(aw)}));t.name=`decor_strings`,t.frustumCulled=!1,a.add(t)}r&&a.add(FS());let l=Object.values(i.kit.meshes).filter(e=>e.count>0).length,u=c!==null&&c.geometry.index!==null?c.geometry.index.count/3:0,d={triangles:i.kit.triangles()+u+10,instancedMeshes:l,drawCalls:l+1+ +(i.strings.length>0)+1,dropped:cC.reduce((e,t)=>e+i.kit.dropped[t],0)},f={canopy:i.kit.used.canopy,trunk:i.kit.used.trunk,conifer:i.kit.used.conifer},p=[`canopy`,`trunk`,`conifer`];return a.userData.setForestDensity=e=>{for(let t=0;t<p.length;t++){let n=p[t];i.kit.meshes[n].count=s[t]+Math.floor((f[n]-s[t])*Math.min(1,Math.max(0,e)))}},a.userData.boxes=i.boxes,a.userData.stats=d,AS(a),a}var Ew=[`#8e7a66`,`#d9c6aa`,`#b9a68c`,`#c4472a`,`#a99a88`],Dw=3,Ow=5,kw=[`stone_warm`,``,`terracotta_a`,``,``],Aw=`#9c5640`,jw=`#4a2c1c`,Mw=`#f1e9d2`,Nw=`#efe2b4`,Pw=`#ffc83a`,Fw=`#b5523a`,Iw=.5,Lw=.72,Rw=.92,zw=16,Bw=new Float64Array(64),Vw=new Float64Array(64);for(let e=0;e<zw;e++){let t=e/zw*Math.PI*2,n=(e+1)/zw*Math.PI*2,r=[t,t,n,n],i=[Lw,Rw,Rw,Lw];for(let t=0;t<4;t++)Bw[e*4+t]=Math.cos(r[t])*i[t],Vw[e*4+t]=Math.sin(r[t])*i[t]}var Hw=`#6b4a30`,Uw=.03,Ww=4;function Gw(e,t,n,r){let i=[r.min.x,r.min.y,r.min.z],a=[r.max.x,r.max.y,r.max.z];for(let r=0;r<3;r++){let o=r===0?2:0,s=r===1?2:1;for(let c=0;c<2;c++){let l=c===0?i[r]:a[r],u=e.length/3;for(let t=0;t<4;t++){let c=[0,0,0];c[r]=l,c[o]=t===0||t===3?i[o]:a[o],c[s]=t<2?i[s]:a[s],e.push(c[0],c[1],c[2]),n.push(c[o]/Ww,c[s]/Ww)}+(r===2?c===0:c===1)==0?t.push(u,u+1,u+2,u,u+2,u+3):t.push(u,u+2,u+1,u,u+3,u+2)}}}function Kw(e,t,n=0,r=``){let i=[],a=[],o=[];for(let t=0;t<e.length;t++)Gw(i,a,o,e[t]);let s=new kf;s.setAttribute(`position`,new X(i,3)),s.setAttribute(`uv`,new X(o,2)),s.setIndex(a),s.computeVertexNormals();let c=r?oC(r):null,l=new Y(t);c&&l.lerp(new Y(`#ffffff`),.55);let u=new Wm({color:l,flatShading:!0,map:c,normalMap:c?sC(r):null});n>0&&(u.emissive=new Y(t).multiplyScalar(n));let d=new Z(s,u);return d.userData.cast=!0,d}function qw(e,t,n,r,i){let a=i===1,o=a?r.min.z:r.min.x,s=a?r.max.z:r.max.x,c=a?r.min.x:r.min.z,l=a?r.max.x:r.max.z,u=(c+l)/2,d=r.min.y,f=r.max.y,p=Math.hypot(u-c,f-d),m=(t,r,i,o,s)=>{a?e.push(r,i,t):e.push(t,i,r),n.push(o/Ww,s/Ww)};for(let n=0;n<2;n++){let r=n===0?c:l,i=e.length/3;m(o,r,d,o,0),m(s,r,d,s,0),m(s,u,f,s,p),m(o,u,f,o,p),n===0===a?t.push(i,i+1,i+2,i,i+2,i+3):t.push(i,i+2,i+1,i,i+3,i+2)}for(let n=0;n<2;n++){let r=n===0?o:s,i=e.length/3;m(r,c,d,c,d),m(r,l,d,l,d),m(r,u,f,u,f),n===0===a?t.push(i,i+2,i+1):t.push(i,i+1,i+2)}}function Jw(e){let t=[],n=[],r=[];for(let i=0;i<e.roofs.length;i++)qw(t,n,r,e.roofs[i].aabb,e.roofs[i].ridgeAxis);let i=new kf;i.setAttribute(`position`,new X(t,3)),i.setAttribute(`uv`,new X(r,2)),i.setIndex(n),i.computeVertexNormals();let a=oC(`roof_tile`),o=new Y(Fw);a&&o.lerp(new Y(`#ffffff`),.55);let s=new Z(i,new Wm({color:o,flatShading:!0,map:a,normalMap:sC(`roof_tile`)}));return s.name=`pitchedRoofs`,s.userData.cast=!0,s}var Yw=(e,t,n,i,a,o)=>new r(new f(e,t,n),new f(i,a,o));function Xw(e){let t=[],n=[],r=.1,i=[],a=e.goal;if(a.max.y>a.min.y){let i=Math.min(ow(e,a.min.x,a.min.z+1),ow(e,a.max.x,a.min.z+1),ow(e,(a.min.x+a.max.x)/2,a.min.z+1));i<a.min.y&&(t.push(Yw(a.min.x,i-.3,a.min.z,a.max.x,a.min.y,a.max.z-1)),n.push(Yw(a.min.x-r,a.min.y-.4,a.min.z-r,a.max.x+r,a.min.y-.1,a.max.z-1+r)))}return t.length>0&&i.push(Kw(t,Aw,0,`brick_a`)),n.length>0&&i.push(Kw(n,jw)),i}function Zw(e,t={}){let n=t.scenery!==!1,i=new Ed;i.name=`level`,i.userData.route=e.route.slice();for(let t=0;t<Ew.length;t++){let n=[];for(let r=0;r<e.solids.length;r++){let i=r<e.style.length?e.style[r]:1;i===t&&i!==Ow&&e.solids[r].max.y>e.killPlaneY&&n.push(e.solids[r])}n.length>0&&i.add(Kw(n,Ew[t],t===Dw?.2:0,kw[t]))}if(e.pads.length>0){let t=(e,t,n)=>new r(new f(e.min.x+t,e.max.y,e.min.z+t),new f(e.max.x-t,e.max.y+n,e.max.z-t)),n=Kw(e.pads.map(e=>t(e,0,Uw)),Hw),a=Kw(e.pads.map(e=>t(e,.18,.04)),Mw);n.name=`padEdge`;for(let e of[n,a])e.userData.cast=!1,i.add(e)}e.goal.max.y>e.goal.min.y&&i.add(Kw([e.goal],Nw)),e.roofs.length>0&&i.add(Jw(e));let a=Xw(e);for(let e=0;e<a.length;e++)i.add(a[e]);i.add(Tw(e,void 0,{scenery:n})),n&&i.add(_S(e));let o=new Mm(Iw,12,8);for(let t=0;t<e.anchors.length;t++){let n=e.anchors[t],r=new Z(o,new sp({color:new Y(Pw),fog:!1}));r.position.set(n.px,n.py,n.pz),r.name=`anchor`+t,r.userData.anchorId=t,i.add(r)}return e.anchors.length>0&&i.add(Qw(e)),i}function Qw(e){let t=e.anchors.length,n=new Float32Array(t*64*3),r=[];for(let e=0;e<t*zw;e++){let t=e*4;r.push(t,t+1,t+2,t,t+2,t+3)}let i=new kf,a=new X(n,3);a.setUsage(ou),i.setAttribute(`position`,a),i.setIndex(r);let o=new Z(i,new sp({color:new Y(Pw),fog:!1,side:2}));o.name=`anchorRings`,o.frustumCulled=!1,o.userData.target=-1;let s=new K,c=new K;return o.onBeforeRender=(r,i,l)=>{let u=l.matrixWorld.elements;s.set(u[0],u[1],u[2]),c.set(u[4],u[5],u[6]);let d=o.userData.target;for(let r=0;r<t;r++){let t=e.anchors[r],i=r===d?1.25:1,a=r*64*3;for(let e=0;e<zw;e++)for(let r=0;r<4;r++){let o=Bw[e*4+r]*i,l=Vw[e*4+r]*i;n[a++]=t.px+s.x*o+c.x*l,n[a++]=t.py+s.y*o+c.y*l,n[a++]=t.pz+s.z*o+c.z*l}}a.needsUpdate=!0},o}function $w(e,t,n){let r=e.userData.route,i=r&&n>=0&&n<r.length?r[n]:-1;for(let n=0;n<e.children.length;n++){let r=e.children[n];if(r.name===`anchorRings`&&(r.userData.target=i),r.userData.anchorId===void 0)continue;let a=r.userData.anchorId===i?1+.35*Math.sin(t*6):1;r.scale.setScalar(a)}}var eT=`modulepreload`,tT=function(e){return`/bhaaag/`+e},nT={},rT=function(e){return e.pathname.endsWith(`.css`)},iT=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},aT=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=tT(t,n);let r=s(t),i=rT(r);return iT(nT,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:eT,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};async function oT(e,t,n,r){if(r.bloom===null)return null;let[{EffectComposer:i},{RenderPass:a},{UnrealBloomPass:o},{OutputPass:s}]=await Promise.all([aT(()=>import(`./EffectComposer-tmyrUQPc.js`),__vite__mapDeps([0,1,2])),aT(()=>import(`./RenderPass-CDiqGRyp.js`),__vite__mapDeps([3,2])),aT(()=>import(`./UnrealBloomPass-BLwA-vgU.js`),__vite__mapDeps([4,2,1])),aT(()=>import(`./OutputPass-BmzZxOPl.js`),__vite__mapDeps([5,2]))]),c=e.getSize(new G),l=e.getPixelRatio(),u=new i(e,new Xu(c.x*l,c.y*l,{type:Jc,samples:r.composerSamples}));return u.addPass(new a(t,n)),u.addPass(new o(new G(c.x,c.y),r.bloom.strength,r.bloom.radius,r.bloom.threshold)),u.addPass(new s),u}var sT=.7;function cT(e,t,n,r){let i=KS(t,r);for(let a=0;a<e.solids.length;a++){let o=e.solids[a],s=o.max.y;s>n+.3||s<=i||t<o.min.x||t>o.max.x||r<o.min.z||r>o.max.z||(i=s)}return i}function lT(){let e=new wm(sT,16);e.rotateX(-Math.PI/2);let t=new Z(e,new sp({color:`#1b1410`,transparent:!0,opacity:.38,depthWrite:!1,fog:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));return t.name=`heroBlob`,t.frustumCulled=!1,t.visible=!1,t}function uT(e,t,n,r,i){let a=cT(t,n,r,i),o=r-a;if(o>7||o<-1){e.visible=!1;return}e.visible=!0,e.position.set(n,a+.05,i);let s=1-.55*Math.min(1,Math.max(0,o)/7);e.scale.setScalar(s),e.material.opacity=.38*s}var dT=`#eaa978`,fT=500,pT=7,mT=Math.PI/180,hT=new K(0,0,1),gT=8*mT,_T=32*mT,vT=new K(Math.sin(_T)*Math.cos(gT),Math.sin(gT),-Math.cos(_T)*Math.cos(gT)),yT={x:Math.sin(_T),z:-Math.cos(_T)},bT=470,xT=440,ST=7,CT=new Y(`#e6a77a`),wT=new Y(`#ffd890`),TT=[[0,new Y(dT)],[.1,new Y(`#f2a050`)],[.3,new Y(`#d77a45`)],[.6,new Y(`#9c5a4c`)]];function ET(e,t){if(e<0)return t.copy(CT);let n=TT[0][0],r=TT[0][1];for(let i=1;i<TT.length;i++){let[a,o]=TT[i];if(e<=a)return t.copy(r).lerp(o,(e-n)/(a-n));n=a,r=o}return t.copy(r)}function DT(e,t){let n=Math.max(0,e.dot(vT));return t.lerp(wT,.5*n*n*n*n)}function OT(){let e=new Mm(fT,32,16),t=e.attributes.position,n=[],r=new K,i=new Y;for(let e=0;e<t.count;e++)r.fromBufferAttribute(t,e).normalize(),ET(r.y,i),DT(r,i),n.push(i.r,i.g,i.b);e.setAttribute(`color`,new X(n,3));let a=new Z(e,new sp({vertexColors:!0,side:1,depthWrite:!1,fog:!1}));return a.name=`skyDome`,a.renderOrder=-2,a}function kT(){let e=new Ed,t=new wm(170,32),n=new Y(`#ffc070`),r=[];for(let e=0;e<t.attributes.position.count;e++)r.push(n.r,n.g,n.b,e===0?.65:0);t.setAttribute(`color`,new X(r,4));let i=new Z(t,new sp({vertexColors:!0,transparent:!0,blending:2,depthWrite:!1,fog:!1}));i.name=`sunGlow`;let a=new Z(new wm(9,24),new sp({color:`#fff1c4`,depthWrite:!1,fog:!1}));a.name=`sunCore`,a.renderOrder=-1;let o=vT.clone().negate();for(let t of[i,a])t.position.copy(vT).multiplyScalar(bT),t.quaternion.setFromUnitVectors(hT,o),e.add(t);return e}function AT(){let e=[],t=[],n=[],r=new Y(`#ffcf8a`),i=[-.5,-.25,0,.3,.55];for(let a=0;a<i.length;a++){let o=i[a],s=260+a%2*40,c=14+a%3*4,l=e.length/3;e.push(-c*.3,0,0,c*.3,0,0,-c,s,0,c,s,0),t.push(r.r,r.g,r.b,0,r.r,r.g,r.b,0,r.r,r.g,r.b,0,r.r,r.g,r.b,0);let u=e.length/3;e.push(0,0,0,0,s*.55,0),t.push(r.r,r.g,r.b,.16,r.r,r.g,r.b,.07),n.push(l,l+1,u,l,u,l+2,l+1,l+3,u+1,l+2,l+3,u+1,u,u+1,l,u,u+1,l+1);let d=Math.cos(o),f=Math.sin(o);for(let t=l;t<e.length/3;t++){let n=e[t*3],r=e[t*3+1];e[t*3]=n*d-r*f,e[t*3+1]=n*f+r*d}}let a=new kf;a.setAttribute(`position`,new X(e,3)),a.setAttribute(`color`,new X(t,4)),a.setIndex(n);let o=new Z(a,new sp({vertexColors:!0,transparent:!0,depthWrite:!1,fog:!1,side:2}));return o.name=`godRays`,o.position.copy(vT).multiplyScalar(466),o.quaternion.setFromUnitVectors(hT,vT.clone().negate()),o.renderOrder=1,o}function jT(e,t={azLo:-40,azHi:60,count:ST,elLo:4,elHi:14,wLo:60,wHi:140,opacity:.85,name:`clouds`}){let n=[],r=new Y(`#f7b98a`),i=new Y(`#ffd9a0`),a=new K,o=new Au,s=(e,t,n)=>e+(t-e)*n;for(let c=0;c<t.count;c++){let c=s(t.azLo,t.azHi,e())*mT,l=s(t.elLo,t.elHi,e())*mT,u=s(t.wLo,t.wHi,e()),d=s(8,14,e());a.set(Math.sin(c)*Math.cos(l),Math.sin(l),-Math.cos(c)*Math.cos(l));let f=new wm(1,16);f.deleteAttribute(`normal`),f.deleteAttribute(`uv`),f.scale(u,d,1);let p=[],m=f.attributes.position;for(let e=0;e<m.count;e++){let t=m.getY(e)>0?r:i;p.push(t.r,t.g,t.b)}f.setAttribute(`color`,new X(p,3)),o.setFromUnitVectors(hT,a.clone().negate()),f.applyQuaternion(o),f.translate(a.x*xT,a.y*xT,a.z*xT),n.push(f)}let c=yx(n,!1);for(let e of n)e.dispose();if(c===null)throw Error(`cloud merge failed: attribute mismatch`);let l=new Z(c,new sp({vertexColors:!0,transparent:!0,opacity:t.opacity,side:2,depthWrite:!1,fog:!1}));return l.name=t.name,l}function MT(){let e=new Tm(240,240,42,48,2,!0),t=e.attributes.position,n=new Y(`#ffb070`),r=[];for(let e=0;e<t.count;e++){let i=t.getX(e),a=t.getZ(e),o=Math.hypot(i,a)||1,s=Math.max(0,i/o*yT.x+a/o*yT.z),c=Math.abs(t.getY(e))<10?.35:0;r.push(n.r,n.g,n.b,c*(.4+.6*s*s))}e.setAttribute(`color`,new X(r,4));let i=new Z(e,new sp({vertexColors:!0,transparent:!0,blending:2,depthWrite:!1,depthTest:!0,fog:!1,side:1}));return i.name=`horizonHaze`,i.position.y=9,i}function NT(){let e=new Ed;return e.add(OT()),e.add(kT()),e.add(MT()),e.add(AT()),e.add(jT(hC(pT))),e.add(jT(hC(14),{azLo:-60,azHi:80,count:9,elLo:16,elHi:34,wLo:90,wHi:200,opacity:.55,name:`cloudsHigh`})),e}var PT=[36,14,36];function FT(){let e=new kf;e.setAttribute(`position`,new X(new Float32Array(270),3));let t=new hm(e,new um({color:`#d8c9b4`,size:.09,transparent:!0,opacity:.4,depthWrite:!1,blending:2,fog:!1}));return t.name=`dust`,t.frustumCulled=!1,t}var IT=new Float32Array(270);for(let e=0;e<90;e++)for(let t=0;t<3;t++){let n=Math.sin(e*[12.9898,78.233,39.425][t])*[43758.5453,12345.6789,24681.357][t];IT[e*3+t]=n-Math.floor(n)}var LT=(e,t)=>e-t*Math.floor(e/t);function RT(e,t,n,r,i){let a=e.geometry.getAttribute(`position`);for(let e=0;e<90;e++){let o=IT[e*3],s=IT[e*3+1],c=IT[e*3+2],l=LT(o*PT[0]+i*.25*(.5+s),PT[0])-PT[0]/2,u=LT(s*PT[1]-i*.12*(.5+c),PT[1])-PT[1]/2,d=LT(c*PT[2]+i*.18*(.5+o),PT[2])-PT[2]/2;a.setXYZ(e,t+l,n+u,r+d)}a.needsUpdate=!0}var zT=[`low`,`medium`,`high`],BT=`zt.graphicsTier`,VT=`zt-graphics-tier`,HT={low:{label:`Low`,desc:`Flat sunset colours, blob shadow. Fastest.`},medium:{label:`Medium`,desc:`Soft lane shadows, filmic colour. Phone default.`},high:{label:`High`,desc:`Sharper shadows, extra detail. Sun glow on PCs.`}};function UT(e){return e===`low`||e===`medium`||e===`high`?e:null}function WT(e){return e.cores>0&&e.cores<=4||e.memoryGb>0&&e.memoryGb<=4?`low`:`medium`}function GT(){let e={coarsePointer:!1,userAgent:``,cores:0,memoryGb:0};try{if(typeof navigator<`u`){e.userAgent=navigator.userAgent??``,e.cores=navigator.hardwareConcurrency??0;let t=navigator.deviceMemory;e.memoryGb=typeof t==`number`?t:0}typeof window<`u`&&typeof window.matchMedia==`function`&&(e.coarsePointer=window.matchMedia(`(pointer: coarse)`).matches)}catch{}return e}function KT(){try{return typeof localStorage>`u`?null:localStorage}catch{return null}}function qT(){try{return typeof location>`u`?null:UT(new URLSearchParams(location.search).get(`gfx`))}catch{return null}}function JT(e=KT(),t=GT(),n=qT()){if(n!==null)return n;if(e!==null)try{let t=UT(e.getItem(BT));if(t!==null)return t}catch{}return WT(t)}function YT(e=KT(),t=qT()){if(t!==null)return!1;if(e===null)return!0;try{return UT(e.getItem(BT))===null}catch{return!0}}function XT(e,t=KT()){if(t!==null)try{t.setItem(BT,e)}catch{}typeof window<`u`&&typeof CustomEvent==`function`&&window.dispatchEvent(new CustomEvent(VT,{detail:e}))}var ZT={low:[1,1.5],medium:[1.25,2],high:[1.5,2]},QT=[`decor_rail`,`decor_canopy`,`decor_bracket`,`decor_pot`,`decor_planter`,`decor_shutter`,`decor_flag`,`decor_trim`,`decor_strings`,`decor_birds`],$T=`#eaa978`;function eE(e,t){let n=ZT[e][+!t],r={normalMaps:e===`high`,atmosphere:e!==`low`&&!t,forestDensity:e===`low`?.2:e===`medium`?.7:1,casterReach:12,hideDecor:e===`low`?QT:[],governorMs:20};return e===`low`?{tier:e,maxPixelRatio:n,toneMapping:`aces`,exposure:1.1,sun:{color:`#ffb469`,intensity:3,dir:[70,38,-15]},hemi:{sky:`#ffc99c`,ground:`#5b4656`,intensity:1},fog:{color:$T,near:70,far:480},shadow:null,bloom:null,composerSamples:0,...r}:{tier:e,maxPixelRatio:n,toneMapping:`aces`,exposure:1.2,sun:{color:`#ffa65c`,intensity:4.2,dir:[70,25,-15]},hemi:{sky:`#ffc99c`,ground:`#5e4a5c`,intensity:.85},fog:{color:$T,near:65,far:480},shadow:{mapSize:e===`high`?2048:1024,halfExtent:e===`high`?t?40:48:t?24:30,distance:80,far:180,bias:-4e-4,normalBias:.04,radius:e===`high`?2:3},bloom:e===`high`&&!t?{strength:.22,radius:.35,threshold:.85}:null,composerSamples:e===`high`&&!t?4:0,...r}}function tE(){return typeof window<`u`&&window.matchMedia(`(pointer: coarse)`).matches}var nE=10;function rE(e){let t=e.material,n=Array.isArray(t)?t[0]:t;return n!==void 0&&!(n instanceof sp)&&!n.transparent}function iE(e){let t=new fy({canvas:e,antialias:!0});t.info.autoReset=!1;let n=tE(),r=eE(JT(),n),i=new Fd;i.fog=new Pd(r.fog.color,r.fog.near,r.fog.far);let a=NT();i.add(a);let o=FT();i.add(o);let s=new Ed;s.name=`backdropRoot`;let c=r.tier;aT(()=>import(`./backdrop-BLMSQxsR.js`).then(e=>{f||s.add(e.buildBackdrop(c))}),[]),i.add(s);let l=new Ih(r.sun.color,r.sun.intensity);i.add(l),i.add(l.target);let u=new xh(r.hemi.sky,r.hemi.ground,r.hemi.intensity);i.add(u);let d=new Nh(60,1,.1,3e3),f=!1,p=null,m=null,h=lT();i.add(h);let g=null,_=0,v=new K,y=null,b=!0,x=!1,S=1,C=0,w=new K,T=new K,E=new K,D=new K,O=new K,k=new K,A=new K(0,1,0),j=new G;function M(){if(y!==null){for(let e of y.passes)e.dispose();y.dispose(),y=null}}let N=0;function ee(){M();let e=++N;r.bloom!==null&&oT(t,i,d,r).then(t=>{if(t!==null){if(f||e!==N){for(let e of t.passes)e.dispose();t.dispose()}else y=t,de()}})}function te(){t.setPixelRatio(Math.min(window.devicePixelRatio,r.maxPixelRatio)),t.toneMapping=r.toneMapping===`aces`?4:0,t.toneMappingExposure=r.exposure,t.shadowMap.enabled=r.shadow!==null,t.shadowMap.type=1,l.color.set(r.sun.color),l.intensity=r.sun.intensity,l.position.set(r.sun.dir[0],r.sun.dir[1],r.sun.dir[2]),l.target.position.set(0,0,0),w.copy(l.position).normalize(),u.color.set(r.hemi.sky),u.groundColor.set(r.hemi.ground),u.intensity=r.hemi.intensity,i.fog instanceof Pd&&(i.fog.color.set(r.fog.color),i.fog.near=r.fog.near,i.fog.far=r.fog.far);let e=r.shadow;if(l.castShadow=e!==null,e!==null){l.shadow.mapSize.x!==e.mapSize&&l.shadow.map!==null&&(l.shadow.map.dispose(),l.shadow.map=null),l.shadow.mapSize.set(e.mapSize,e.mapSize);let t=l.shadow.camera;t.left=-e.halfExtent,t.right=e.halfExtent,t.top=e.halfExtent,t.bottom=-e.halfExtent,t.near=1,t.far=e.far,t.updateProjectionMatrix(),l.shadow.bias=e.bias,l.shadow.normalBias=e.normalBias,l.shadow.radius=e.radius}let n=r.atmosphere;for(let e of[`cloudsHigh`,`godRays`]){let t=a.getObjectByName(e);t!==void 0&&(t.visible=n)}o.visible=n,ae(),re(),b=!0,x=!0,de(),ee()}function P(e,t){if(e.name!==`decor_wallBrick`&&e.name!==`decor_wallPlaster`&&e.name!==`decor_roof`)return;let n=e.userData;n.lambert===void 0&&e.material instanceof Wm&&(n.lambert=e.material);let i=n.lambert;i!==void 0&&(n.normalMap===void 0&&(n.normalMap=i.normalMap),i.normalMap=r.normalMaps?n.normalMap:null,i.needsUpdate=!0,t?(n.standard===void 0&&(n.standard=new Um({color:i.color,vertexColors:i.vertexColors,flatShading:i.flatShading,map:i.map,normalMap:i.normalMap,roughness:.92,metalness:0})),e.material=n.standard):e.material=i)}function ne(e,t){if(e!==a&&e!==s){if(e instanceof Z){e.name.startsWith(`decor_`)&&(e.visible=!r.hideDecor.includes(e.name));let i=t&&rE(e);if(e.receiveShadow=i,e.castShadow=i&&e.userData.cast===!0,x){P(e,r.normalMaps&&!n);let t=e.material;if(Array.isArray(t))for(let e of t)e.needsUpdate=!0;else t.needsUpdate=!0}}for(let n of e.children)ne(n,t)}}function re(){if(p===null)return;let e=r.forestDensity;p.traverse(t=>{let n=t.userData.setForestDensity;n!==void 0&&n(e)})}let ie=new Map;function ae(){for(let e of[`clouds`,`cloudsHigh`]){let t=a.getObjectByName(e);t!==void 0&&t.traverse(e=>{let t=e.material;if(t!==void 0)for(let e of Array.isArray(t)?t:[t]){let t=ie.get(e);t===void 0&&(t=e.opacity,ie.set(e,t)),e.opacity=t*S}})}}function oe(e){S=Math.min(1,Math.max(0,e)),ae()}function se(e){C=e,de()}function ce(){b=!0,x=!0}function le(){let e=t.info,n=0;return r.shadow!==null&&i.traverse(e=>{e.isMesh===!0&&e.castShadow&&e.visible&&n++}),t.getSize(j),{calls:e.render.calls,triangles:e.render.triangles,shadowCasters:n,pixelRatio:t.getPixelRatio(),width:j.x,height:j.y,textures:e.memory.textures,geometries:e.memory.geometries,programs:e.programs?.length??0}}function ue(e){e!==r.tier&&(r=eE(e,n),te())}let F=e=>{let t=UT(e.detail);t!==null&&ue(t)};window.addEventListener(VT,F);function de(){let e=window.innerWidth,n=window.innerHeight;t.setSize(e,n,!1),y?.setPixelRatio(t.getPixelRatio()),y?.setSize(e,n),d.aspect=e/n,C===0?d.clearViewOffset():d.setViewOffset(e,n,0,C*n,e,n),d.updateProjectionMatrix()}function fe(e){m=e}function pe(e){return p!==null&&i.remove(p),m=e,p=Zw(e),i.add(p),re(),b=!0,x=!0,p}function me(e,t,n){d.getWorldDirection(E),T.copy(d.position).addScaledVector(E,nE),k.copy(w).negate(),D.crossVectors(k,A).normalize(),O.crossVectors(D,k);let r=2*e/t,i=Math.round(T.dot(D)/r)*r,a=Math.round(T.dot(O)/r)*r,o=T.dot(k);T.set(0,0,0).addScaledVector(D,i).addScaledVector(O,a).addScaledVector(k,o),l.target.position.copy(T),l.position.copy(T).addScaledVector(w,n)}let I=(YT()||n&&r.tier===`medium`)&&r.tier!==`low`,he=0,ge=0,_e=0;function ve(){let e=performance.now(),t=he===0?0:e-he;he=e,t===0||t>250||(ge++,ge<=30||(_e+=t,ge<150||(I=!1,_e/(ge-30)>r.governorMs&&window.dispatchEvent(new CustomEvent(VT,{detail:`low`})))))}function ye(){I&&ve(),a.position.copy(d.position),o.visible&&RT(o,d.position.x,d.position.y,d.position.z,performance.now()/1e3),b&&(ne(i,r.shadow!==null),b=!1,x=!1);let e=r.shadow;e!==null&&me(e.halfExtent,e.mapSize,e.distance),m!==null&&(g===null&&_++%30==0&&(g=i.getObjectByName(`heroRig`)??null),g!==null&&(g.getWorldPosition(v),uT(h,m,v.x,v.y,v.z))),t.info.reset(),y===null?t.render(i,d):y.render()}function be(){f=!0,N++,i.traverse(e=>{let t=e.userData;t.lambert?.dispose(),t.standard?.dispose()}),window.removeEventListener(VT,F),M(),l.shadow.map?.dispose(),t.dispose()}return te(),typeof location<`u`&&new URLSearchParams(location.search).has(`debug`)&&(window.__ztScene=i),{scene:i,camera:d,renderer:t,backdropRoot:s,getTier:()=>r.tier,setTier:ue,resize:de,buildWorld:pe,setBlobWorld:fe,render:ye,dispose:be,setCloudCover:oe,setLensShift:se,refreshFlags:ce,frameStats:le}}var aE=.5,oE=class{el;frames=0;elapsed=0;fps=0;last=performance.now();constructor(e=document.body){this.el=document.createElement(`div`),this.el.style.cssText=`position:fixed;top:4px;left:4px;z-index:50;pointer-events:none;font:11px/1.3 monospace;color:#fff;background:rgba(0,0,0,0.45);padding:4px 6px;border-radius:4px;white-space:pre;`,e.appendChild(this.el)}update(e,t,n){let r=performance.now();this.elapsed+=(r-this.last)/1e3,this.last=r,this.frames++,this.elapsed>=aE&&(this.fps=this.frames/this.elapsed,this.frames=0,this.elapsed=0);let i=Math.sqrt(e.vx*e.vx+e.vz*e.vz);this.el.textContent=`fps `+this.fps.toFixed(0)+`
calls `+t+`  tris `+n+`
pos `+e.px.toFixed(1)+` `+e.py.toFixed(1)+` `+e.pz.toFixed(1)+`
speed `+i.toFixed(1)+`  grounded `+e.grounded}};function sE(e,t){return!(t>0)||e<0?0:e>t?t:e}function cE(e,t){return`HOP `+sE(e,t)+`/`+Math.max(0,t)}function lE(e,t,n){let r=t-n;if(!(r>0))return 0;let i=(t-e)/r;return i<0?0:i>1?1:i}function uE(e,t,n,r=``){let i=document.createElement(t);return i.id=n,i.className=(`hud `+r).trim(),e.appendChild(i),i}function dE(e){let t=Math.max(0,e),n=Math.floor(t/60),r=t-n*60;return n+`:`+(r<10?`0`:``)+r.toFixed(1)}var fE=class{timer;timerText_;objective;pause;hint;reticle;reason;toastEl;win;winTime;winBest;action;timerText=``;actionText=``;reticleState=-1;reasonText=``;wp;wpLabel;wpArrow;wpShown=!1;wpEdge=!1;wpFlip=!1;wpX=-1e6;wpY=-1e6;wpAngle=1e6;wpText=``;hop;hopText=``;alt;altFill;altPct=-1;constructor(e,t,n){this.objective=uE(e,`div`,`hud-objective`),this.objective.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5 22.5 12 12 22.5 1.5 12Z" fill="#ffc83a" stroke="#2a1a0e" stroke-width="1.5"/><path d="M12 6.5 17.5 12 12 17.5 6.5 12Z" fill="none" stroke="#2a1a0e" stroke-width="1.5"/></svg><span>Reach the Target</span>`,this.hop=uE(e,`div`,`hud-hop`),this.alt=uE(e,`div`,`hud-alt`),this.alt.innerHTML=`<i class="alt-fill"></i><i class="alt-dot"></i>`,this.altFill=this.alt.querySelector(`.alt-fill`),this.timer=uE(e,`div`,`hud-timer`,t?`debug`:``),this.timer.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="13.5" r="8"/><path d="M12 13.5V9.5M10 2.5h4M12 2.5v3M18.5 6.5 20 5"/></g></svg><span></span>`,this.timerText_=this.timer.querySelector(`span`),this.pause=uE(e,`button`,`hud-pause`),this.pause.type=`button`,this.pause.setAttribute(`aria-label`,`Pause`),this.pause.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></g></svg>`,this.pause.addEventListener(`click`,()=>{window.dispatchEvent(new CustomEvent(`zt-menu`))}),this.wp=uE(e,`div`,`hud-waypoint`,`off`),this.wp.innerHTML=`<i class="wp-stem"></i><span class="wp-arrow"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 14l4-4 4 4" fill="none" stroke="#ffc83a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span><svg class="wp-dia" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5 22.5 12 12 22.5 1.5 12Z" fill="#ffc83a" stroke="#2a1a0e" stroke-width="1.5"/><path d="M12 6.5 17.5 12 12 17.5 6.5 12Z" fill="none" stroke="#2a1a0e" stroke-width="1.5"/></svg><span class="wp-label"></span>`,this.wpLabel=this.wp.querySelector(`.wp-label`),this.wpArrow=this.wp.querySelector(`.wp-arrow`),this.hint=uE(e,`div`,`hud-hint`),this.hint.textContent=`Aim at a glowing anchor and hook`,this.reticle=uE(e,`div`,`hud-reticle`),this.reason=uE(e,`div`,`hud-reason`,`off`),this.toastEl=uE(e,`div`,`hud-toast`,`off`),this.win=uE(e,`div`,`hud-win`,`off`);let r=document.createElement(`h1`);r.textContent=`You made it!`,this.winTime=document.createElement(`p`),this.winBest=document.createElement(`p`);let i=document.createElement(`button`);i.type=`button`,i.textContent=`PLAY AGAIN`,i.addEventListener(`click`,n),this.win.append(r,this.winTime,this.winBest,i),this.action=e.querySelector(`#btn-action`),this.setTime(0)}setTime(e){let t=dE(e);t!==this.timerText&&(this.timerText=t,this.timerText_.textContent=t)}setHop(e,t){let n=cE(e,t);n!==this.hopText&&(this.hopText=n,this.hop.textContent=n)}setAltitude(e){let t=Math.round(e*200)/2;t!==this.altPct&&(this.altPct=t,this.alt.style.setProperty(`--alt`,t+`%`))}objectiveIn(){let e=this.objective.classList.contains(`in-a`);this.objective.classList.toggle(`in-a`,!e),this.objective.classList.toggle(`in-b`,e)}pulseTimer(){let e=this.timerText_.classList.contains(`pulse-a`);this.timerText_.classList.toggle(`pulse-a`,!e),this.timerText_.classList.toggle(`pulse-b`,e)}fadeHint(){this.hint.classList.add(`gone`)}showHint(){this.hint.classList.remove(`gone`)}setReticle(e){e!==this.reticleState&&(this.reticleState=e,this.reticle.classList.toggle(`off`,e===0),this.reticle.classList.toggle(`lock`,e===2))}setAimReason(e){e!==this.reasonText&&(this.reasonText=e,this.reason.textContent=e,this.reason.classList.toggle(`off`,e===``))}setWaypoint(e,t,n,r,i,a,o){e!==this.wpShown&&(this.wpShown=e,this.wp.classList.toggle(`off`,!e),!e)||e&&(r!==this.wpEdge&&(this.wpEdge=r,this.wp.classList.toggle(`edge`,r)),o!==this.wpFlip&&(this.wpFlip=o,this.wp.classList.toggle(`flip`,o)),a!==this.wpText&&(this.wpText=a,this.wpLabel.textContent=a),(Math.abs(t-this.wpX)>=.5||Math.abs(n-this.wpY)>=.5)&&(this.wpX=t,this.wpY=n,this.wp.style.transform=`translate3d(`+t.toFixed(1)+`px,`+n.toFixed(1)+`px,0)`),r&&Math.abs(i-this.wpAngle)>=.01&&(this.wpAngle=i,this.wpArrow.style.transform=`rotate(`+(i+Math.PI/2).toFixed(3)+`rad)`))}toast(e){this.toastEl.textContent=e,this.toastEl.classList.remove(`off`)}hideToast(){this.toastEl.classList.add(`off`)}showWin(e,t){this.winTime.textContent=`Time `+dE(e),this.winBest.textContent=`Best `+dE(t),this.win.classList.remove(`off`)}hideWin(){this.win.classList.add(`off`)}setActionLabel(e){if(this.action===null||e===this.actionText)return;this.actionText=e;let t=e===`BRAKE`;this.action.dataset.mode=t?`brake`:`hook`,this.action.setAttribute(`aria-label`,e.charAt(0)+e.slice(1).toLowerCase())}destroy(){this.objective.remove(),this.hop.remove(),this.alt.remove(),this.pause.remove(),this.timer.remove(),this.hint.remove(),this.reticle.remove(),this.reason.remove(),this.wp.remove(),this.toastEl.remove(),this.win.remove()}};function pE(e){switch(e){case 2:return`Too close`;case 3:return`Out of range`;case 4:return`Can't zip uphill`;case 5:return`Too flat`;case 6:return`Too steep`;case 7:return`Line blocked`;default:return``}}var mE=15985366,hE=12863274,gE=.1,_E=.55,vE=.85,yE=.06,bE=.001;function xE(e){return e===1?mE:e===2?Xx:hE}var SE=class{group=new Ed;lineGeo=new Sm(1,1,1);ringGeo=new jm(_E,vE,24);lineMat=new sp({color:mE,transparent:!0,opacity:.85,fog:!1});ringMat=new sp({color:mE,transparent:!0,opacity:.9,fog:!1});line=new Z(this.lineGeo,this.lineMat);ring=new Z(this.ringGeo,this.ringMat);aim=new K;lastOutcome=-1;constructor(){this.ring.rotation.x=-Math.PI/2,this.group.add(this.line,this.ring),this.group.visible=!1}update(e,t,n,r,i,a,o,s,c,l){let u=i-t,d=a-n,f=o-r,p=Math.sqrt(u*u+d*d+f*f);if(e===0||p<bE)this.group.visible=!1;else{if(this.group.visible=!0,e!==this.lastOutcome){this.lastOutcome=e;let t=xE(e);this.lineMat.color.setHex(t),this.ringMat.color.setHex(t)}this.line.position.set(t+u/2,n+d/2,r+f/2),this.line.scale.set(gE,gE,p),this.aim.set(i,a,o),this.line.lookAt(this.aim),this.ring.position.set(s,c+yE,l)}}hide(){this.group.visible=!1}dispose(){this.lineGeo.dispose(),this.ringGeo.dispose(),this.lineMat.dispose(),this.ringMat.dispose()}},CE=40,wE=16765786,TE=class{group=new Ed;beamGeo=new Tm(.2,.45,CE,8,1,!0);ringGeo=new jm(.5,.75,24);beamMat=new sp({color:16777215,vertexColors:!0,transparent:!0,blending:2,depthWrite:!1,fog:!1,side:2});ringMat=new sp({color:wE,transparent:!0,opacity:.8,blending:2,depthWrite:!1,fog:!1,side:2});ring;constructor(){this.beamGeo.translate(0,CE/2,0);let e=this.beamGeo.getAttribute(`position`),t=new Float32Array(e.count*4);for(let n=0;n<e.count;n++){let r=.7*(1-e.getY(n)/CE);t[n*4]=1*r,t[n*4+1]=.8274509803921568*r,t[n*4+2]=.35294117647058826*r,t[n*4+3]=r}this.beamGeo.setAttribute(`color`,new X(t,4));let n=new Z(this.beamGeo,this.beamMat);n.frustumCulled=!1,this.ringGeo.rotateX(-Math.PI/2),this.ring=new Z(this.ringGeo,this.ringMat),this.ring.position.y=.05,this.group.add(n,this.ring),this.group.visible=!1}update(e,t,n,r,i,a){this.group.visible=e,e&&(this.group.position.set(t,n,r),this.ring.position.y=i-n+.05,this.ring.scale.setScalar(1+.25*Math.sin(6*a)))}dispose(){this.beamGeo.dispose(),this.ringGeo.dispose(),this.beamMat.dispose(),this.ringMat.dispose()}};function EE(){return{x:0,y:0,edge:!1,angle:0}}function DE(e,t,n,r,i,a,o,s,c,l,u=0){let d=r>-a,f,p;if(d)f=o/2-t*o,p=s/2+n*o;else{let e=-r,a=t/e/(o/s*i),c=n/e/i;f=(a*.5+.5)*o,p=(.5-c*.5)*s+u}let m=!d&&f>=l&&f<=o-l&&p>=c&&p<=s-l;if(e.edge=!m,m)return e.x=f,e.y=p,e.angle=0,e;let h=f-o/2,g=p-s/2;h===0&&g===0&&(g=1);let _=Math.abs(h),v=Math.abs(g),y=_>0?(o/2-l)/_:1/0,b=v>0?(s/2-l)/v:1/0,x=Math.min(y,b);return e.x=o/2+h*x,e.y=Math.max(c,s/2+g*x),e.angle=Math.atan2(g,h),e}function OE(e){return Math.round(e)+` m`}function kE(e,t,n,r){let i=n,a=!1;for(let o=0;o<e.length;o++){let s=e[o];s.max.y>n||t<s.min.x||t>s.max.x||r<s.min.z||r>s.max.z||(!a||s.max.y>i)&&(i=s.max.y,a=!0)}return i}function AE(e,t,n){if(!n)return Math.max(10,t*.028)+Math.max(32,t*.054)+8;let r=Math.max(10,e*.03),i=Math.min(48,Math.max(34,e*.1)),a=Math.min(30,Math.max(24,e*.07));return r+i+4+a+8}var jE=Math.tan(20*Math.PI/180),ME=2.6,NE=.6,PE=3.5;2*PE;var FE=1.8,IE=1.6,LE=.4,RE=.25,zE=.8,BE=PE,VE=.2;function HE(e){return jE*e+-8}var UE=class{n=2;gap=13;cx=0;decoy=0;pitched=0;drift=0};function WE(e,t,n){let r=(e^Math.imul(t+1,2654435761)^Math.imul(n+1,2246822507))>>>0;r=r+1831565813>>>0;let i=Math.imul(r^r>>>15,1|r);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296}function GE(e,t){let n=0;for(let r=5;r<=t;r++){let t=(Math.floor(WE(e,r,3)*7)-3)*2;n+=t,n>8&&(n=8),n<-8&&(n=-8)}return n}function KE(e,t,n){if(t<4){n.n=2,n.gap=13,n.cx=0,n.decoy=t===1?-1:+(t===3),n.pitched=+(t===1),n.drift=0;return}let r=Math.min(1,t/40),i=WE(e,t,1);n.n=i<.2?1:i<.7?2:3,n.gap=11+WE(e,t,2)*(2+4*r),n.cx=GE(e,t);let a=GE(e,t+1);n.drift=a>n.cx?1:a<n.cx?-1:0,n.decoy=0,WE(e,t,4)<.2+.3*r&&(n.decoy=WE(e,t,5)<.5?-1:1),n.pitched=+(n.decoy!==0&&WE(e,t,6)<.5)}function qE(e,t){return e-7*t.n-t.gap}var JE=class{solid=new Float64Array(126);solidUsed=new Uint8Array(21);style=new Uint8Array(21);pad=new Float64Array(18);padUsed=new Uint8Array(3);anchor=new Float64Array(6);anchorUsed=new Uint8Array(2);roof=new Float64Array(6);roofUsed=0;top=new Float64Array(3);centreZ=new Float64Array(3)};function YE(e,t,n,r,i,a,o,s){let c=t*6;e[c]=n,e[c+1]=r,e[c+2]=i,e[c+3]=a,e[c+4]=o,e[c+5]=s}function XE(e,t,n,r){r.solidUsed.fill(0),r.padUsed.fill(0),r.anchorUsed.fill(0),r.roofUsed=0;let i=0,a=0;for(let n=0;n<e.n;n++){let o=t-PE-7*n,s=HE(o)+8-(n===0?0:ME),c=e.cx-4,l=e.cx+4,u=o-PE,d=o+PE;r.top[n]=s,r.centreZ[n]=o,n===0&&(i=s,a=o);let f=n*6;YE(r.solid,f,c,s-NE,u,l,s,d),r.style[f]=2,YE(r.solid,f+1,c,HE(u),u,l,s-NE,d),r.style[f+1]=1;let p=n%2==0?1:-1,m=e.cx+p*4,h=Math.min(m,m+p*FE),g=Math.max(m,m+p*FE);YE(r.solid,f+2,h,s-3-.3,u+1,g,s-3,d-1),r.style[f+2]=1,YE(r.solid,f+3,c,s,u,c+RE,s+LE,d),r.style[f+3]=4,YE(r.solid,f+4,l-RE,s,u,l,s+LE,d),r.style[f+4]=4;let _=(e.drift===0?n%2==0:e.drift>0)?c+1.1:l-1.1;YE(r.solid,f+5,_-.8,s,o-1.6,_+.8,s+zE,o),r.style[f+5]=4;for(let e=0;e<6;e++)r.solidUsed[f+e]=1;YE(r.pad,n,c+1,s,u+1,l-1,s,d-1),r.padUsed[n]=1}if(n&&(r.anchor[0]=e.cx,r.anchor[1]=i+IE,r.anchor[2]=a+1,r.anchorUsed[0]=1),e.decoy!==0){let t=e.cx+e.decoy*12,n=a-PE,o=a+PE;YE(r.solid,18,t-3.5,HE(n),n,t+3.5,i-.6,o),r.style[18]=3,r.solidUsed[18]=1,e.pitched!==0&&(YE(r.roof,0,t-3.5,i-.6,n,t+3.5,i-.6+2,o),r.roofUsed=1),r.anchor[3]=t,r.anchor[4]=i+IE,r.anchor[5]=a+1,r.anchorUsed[1]=1}let o=t+VE,s=qE(t,e)-VE,c=HE(s)-20,l=HE(o)+60;YE(r.solid,19,-36,c,s,-34,l,o),YE(r.solid,20,34,c,s,36,l,o),r.style[19]=5,r.style[20]=5,r.solidUsed[19]=1,r.solidUsed[20]=1}var ZE=-1e4,QE=-6e4,$E=class{world;seed=0;slots=6;slotRow;slotZTop;spec;version;epoch=0;oldest=0;newest=0;scratch=new JE;constructor(e,t){this.world=e,this.slots=t,this.slotRow=new Int32Array(t).fill(-1),this.slotZTop=new Float64Array(t),this.spec=[];for(let e=0;e<t;e++)this.spec.push(new UE);this.version=new Int32Array(t)}};function eD(e,t){return t%e.slots}function tD(e){return 3+e*21}function nD(e){return e*3}function rD(e){return e*2}function iD(e){return e*2}function aD(e){return 1+e*2}function oD(e,t,n,r,i,a,o){e.min.x=t,e.min.y=n,e.min.z=r,e.max.x=i,e.max.y=a,e.max.z=o}function sD(e){oD(e,0,ZE,0,0,ZE,0)}function cD(e,t,n,i,a,o){return new r(new f(e,t,n),new f(i,a,o))}function lD(e,t,n){let r=eD(e,t),i=e.world,a=e.spec[r];KE(e.seed,t,a);let o=e.scratch;XE(a,n,t>0,o),e.slotRow[r]=t,e.slotZTop[r]=n;let s=tD(r);for(let e=0;e<21;e++){let t=i.solids[s+e];if(o.solidUsed[e]===1){let n=e*6;oD(t,o.solid[n],o.solid[n+1],o.solid[n+2],o.solid[n+3],o.solid[n+4],o.solid[n+5])}else sD(t);i.style[s+e]=o.style[e]}let c=nD(r);for(let e=0;e<3;e++){let t=i.pads[c+e];if(o.padUsed[e]===1){let n=e*6;oD(t,o.pad[n],o.pad[n+1],o.pad[n+2],o.pad[n+3],o.pad[n+4],o.pad[n+5])}else sD(t)}let l=rD(r);for(let e=0;e<2;e++){let t=i.anchors[l+e];o.anchorUsed[e]===1?(t.px=o.anchor[e*3],t.py=o.anchor[e*3+1],t.pz=o.anchor[e*3+2]):(t.px=0,t.py=ZE,t.pz=0)}let u=aD(r),d=i.roofs[r],f=i.ramps[u],p=i.ramps[u+1];if(o.roofUsed===1){let e=o.roof[0],t=o.roof[1],n=o.roof[2],r=o.roof[3],i=o.roof[4],a=o.roof[5],s=(e+r)*.5;oD(d.aabb,e,t,n,r,i,a),oD(f.aabb,e,t,n,s,i,a),oD(p.aabb,s,t,n,r,i,a),f.rise=i-t,p.rise=i-t}else sD(d.aabb),sD(f.aabb),sD(p.aabb),f.rise=0,p.rise=0;e.version[r]++,e.epoch++}function uD(e,t){let n=e.world.route;n.length=0;let r=t+1;r<1&&(r=1);for(let t=r;t<=e.newest;t++)t<e.oldest||n.push(iD(eD(e,t)))}function dD(e){let t=eD(e,e.newest),n=qE(e.slotZTop[t],e.spec[t]);e.oldest++,e.newest++,lD(e,e.newest,n)}function fD(e,t){let n=Math.max(5,Math.floor(t.chase.slots)),r=new ds,i=new $E(r,n);i.seed=e|0,r.spawn=new f(0,0,0),r.spawnYaw=3.14159,r.killPlaneY=-1e9;let a=HE(QE);ps(r,cD(-34,a,QE,34,a,26),2,HE(26)-a);let o=HE(0)-40;fs(r,cD(-34,o,26,34,80,28)),fs(r,cD(-36,o,BE,-34,80,28)),fs(r,cD(34,o,BE,36,80,28));for(let e=0;e<3;e++)r.style.push(5);for(let e=0;e<n;e++){for(let e=0;e<21;e++)fs(r,cD(0,ZE,0,0,ZE,0)),r.style.push(1);for(let e=0;e<3;e++)r.pads.push(cD(0,ZE,0,0,ZE,0));for(let e=0;e<2;e++)hs(r,0,ZE,0);ms(r,cD(0,ZE,0,0,ZE,0),1)}let s=BE;for(let e=0;e<n;e++)lD(i,e,s),s=qE(s,i.spec[eD(i,e)]);return i.oldest=0,i.newest=n-1,uD(i,0),i}function pD(e,t){let n=t-(e.oldest<1?1:e.oldest)+1;return n<0?0:n}function mD(e,t){let n=eD(e,e.oldest),r=e.slotZTop[n]-BE,i=jE*r,a=e.world;t.solids.length=0,t.ramps.length=0,t.roofs.length=0,t.anchors.length=0,t.pads.length=0,t.route.length=0,t.style.length=0,t.killPlaneY=-1e9;for(let n=e.oldest;n<=e.newest;n++){let o=eD(e,n),s=tD(o);for(let e=0;e<21;e++){let n=a.solids[s+e],o=a.style[s+e];n.min.y<=-9999||o===5||(t.solids.push(cD(n.min.x,n.min.y-i,n.min.z-r,n.max.x,n.max.y-i,n.max.z-r)),t.style.push(o))}let c=nD(o);for(let e=0;e<3;e++){let n=a.pads[c+e];n.min.y<=-9999||t.pads.push(cD(n.min.x,n.min.y-i,n.min.z-r,n.max.x,n.max.y-i,n.max.z-r))}let l=a.roofs[o];if(l.aabb.min.y>-9999){let e=l.aabb;ms(t,cD(e.min.x,e.min.y-i,e.min.z-r,e.max.x,e.max.y-i,e.max.z-r),1)}let u=rD(o);for(let e=0;e<2;e++){let n=a.anchors[u+e];if(n.py<=-9999)continue;let o=hs(t,n.px,n.py-i,n.pz-r);e===0&&t.route.push(o)}}return r}var hD=class{z=0;gap=0;t=0;v=0;caught=0};function gD(e,t){let n=new hD;return n.z=e+t.chase.startGap,n.gap=t.chase.startGap,n.v=t.chase.v0,n}function _D(e,t,n){let r=n.chase,i=Math.min(r.vMax,r.v0+r.accel*e);return t>r.gapMax?i+r.rubberK*(t-r.gapMax):i}function vD(e,t,n){let r=1/n.fixedHz;e.t+=r,e.v=_D(e.t,e.gap,n),e.z-=e.v*r,e.gap=e.z-t,e.caught=+(e.gap<=n.chase.catchGap)}function yD(e){let t=e<0?0:e>1?1:e;return t*t*(3-2*t)}function bD(e,t){let n=t.chase.catchGap,r=t.chase.fogGap;return yD((r-e)/(r-n))}var xD=.25,SD=80,CD=class{rw;dragon;spawnZ=0;heroRow=0;lastHopRow=0;hops=0;cleans=0;perfects=0;maxProgress=0;prevVy=0;ticks=0;constructor(e,t){this.rw=e,this.dragon=t}};function wD(e,t,n){let r=new CD(fD(e,n),gD(t,n));return r.spawnZ=t,r}function TD(e,t){let n=t.chase;return Math.floor(e.maxProgress)+n.scoreHop*e.hops+n.scoreClean*e.cleans+n.scorePerfect*e.perfects}function ED(e,t,n,r,i){for(let a=e.oldest;a<=e.newest;a++){let o=nD(eD(e,a));for(let e=0;e<3;e++){let a=t.pads[o+e];if(!(a.max.y<-9999)&&n>=a.min.x&&n<=a.max.x&&i>=a.min.z&&i<=a.max.z&&Math.abs(r-a.max.y)<=xD)return!0}}return!1}function DD(e,t){let n=e.oldest;for(let r=e.oldest;r<=e.newest&&!(e.slotZTop[eD(e,r)]<t-.5);r++)n=r;return n}function OD(e,t){e.dead=1,e.mode=2,e.deadCause=t,e.eventBits|=32,e.vx=0,e.vy=0,e.vz=0,e.grounded=0,e.perfect=0,b(e.hook)}function kD(e,t,n,r){let i=e.rw;e.ticks++;let a=t.eventBits;t.dead===0&&t.py<HE(t.pz)-SD&&OD(t,1);let o=DD(i,t.pz);for(;o>=i.oldest+2;)dD(i),o=DD(i,t.pz);if(e.heroRow=o,uD(i,o),a&1){let n=t.hook.anchorId;if(n>=0&&n%2==0){let t=n/2|0,r=i.slotRow[t];r>e.lastHopRow&&(e.hops++,e.lastHopRow=r)}}a&4&&t.dead===0&&-e.prevVy<r.landing.vyClean&&ED(i,n,t.px,t.py,t.pz)&&e.cleans++,a&64&&e.perfects++;let s=e.spawnZ-t.pz;s>e.maxProgress&&(e.maxProgress=s),e.prevVy=t.vy,vD(e.dragon,t.pz,r),e.dragon.caught===1&&t.dead===0&&OD(t,7)}function AD(e){e.traverse(e=>{e.isInstancedMesh===!0&&e.dispose();let t=e;if(t.isMesh!==!0)return;t.geometry.dispose();let n=t.material;for(let e of Array.isArray(n)?n:[n])e.dispose()})}var jD=class{onRebuilt;root=new Ed;level=null;lastEpoch=-1;mini=new ds;lastRebuildMs=0;rebuilds=0;constructor(e){this.onRebuilt=e,this.root.name=`chase_rows`}sync(e){if(e.epoch===this.lastEpoch)return!1;this.lastEpoch=e.epoch;let t=performance.now();this.level!==null&&(this.root.remove(this.level),AD(this.level));let n=mD(e,this.mini),r=Zw(this.mini,{scenery:!1});return this.level=r,this.root.add(r),this.root.position.set(0,jE*n,n),this.root.updateMatrixWorld(!0),this.onRebuilt(),this.lastRebuildMs=performance.now()-t,this.rebuilds++,!0}invalidate(){this.lastEpoch=-1}update(e,t){this.level!==null&&$w(this.level,e,t)}dispose(){this.level!==null&&(this.root.remove(this.level),AD(this.level),this.level=null)}},MD=24,ND=74,PD=1.3,FD=15,ID=6,LD={low:48,medium:110,high:160},RD={low:48,medium:90,high:120},zD=new Y(`#fffaf0`),BD=new Y(`#e4e4ea`),VD=new Y(`#b4bbcc`),HD=`#ff7a14`;function UD(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function WD(e){let t=1+5.6*(1-e)**1.35,n=e<.08?4.2-e*12:0;return Math.max(t,n)}function GD(e,t,n,r){let i=Math.min(1,Math.max(0,.5+e/(2*t+2)));i>.55?r.copy(BD).lerp(zD,(i-.55)/.45):r.copy(VD).lerp(BD,i/.55),r.multiplyScalar(.94+n()*.12)}function KD(){let e=document.createElement(`canvas`);e.width=64,e.height=64;let t=e.getContext(`2d`);if(t!==null){let e=t.createRadialGradient(32,32,0,32,32,32);e.addColorStop(0,`rgba(255,170,60,1)`),e.addColorStop(.35,`rgba(255,120,20,0.55)`),e.addColorStop(1,`rgba(255,90,0,0)`),t.fillStyle=e,t.fillRect(0,0,64,64)}return new vm(e)}var qD=class{group=new Ed;tier;puffGeo=new Om(1,1);puffMat=new Wm({color:`#ffffff`,emissive:`#6d7080`});body=null;puffs=[];wings=[];membraneMat=new Wm({color:`#d8d6de`,emissive:`#5a5e70`,side:2,flatShading:!0});eyeMat=new sp({color:HD,fog:!1});eyeGeo=new Om(.9,1);glowTex=KD();glowMat=new Bf({map:this.glowTex,blending:2,transparent:!0,depthWrite:!1,fog:!1});eyes=[];glows=[];nodes=[];m4=new J;q=new Au;p=new K;s=new K;constructor(e){this.tier=e,this.group.name=`chase_dragon`,this.group.scale.setScalar(PD);for(let e=0;e<MD;e++)this.nodes.push(new K);let t=new Z(this.eyeGeo,this.eyeMat);this.eyes.push(t),this.group.add(t);let n=new ep(this.glowMat);this.glows.push(n),this.group.add(n),this.build(),this.update(0,0,0,0)}setTier(e){e!==this.tier&&(this.tier=e,this.build())}clearBuilt(){this.body!==null&&(this.group.remove(this.body),this.body.dispose(),this.body=null);for(let e of this.wings)this.group.remove(e.group),e.puffs.dispose(),e.membrane.geometry.dispose();this.wings=[]}build(){this.clearBuilt();let e=UD(883296),t=LD[this.tier],n=Math.round(t*.2),r=[],i=[[0,0,0,4.6],[0,-.4,-4.2,3.4],[0,-1.2,-7.6,2.6],[0,-2.6,-4.5,2.4],[1.6,3.2,1.5,1.6],[-1.6,3.2,1.5,1.6],[2.6,4.2,3.8,1.1],[-2.6,4.2,3.8,1.1],[0,-3.2,-8.5,1.5],[0,1.5,-9.2,1.4]];for(let t=0;t<n;t++){let n=i[t%i.length],a=t<i.length?0:.8;r.push({node:0,ox:n[0]+(e()-.5)*a*2,oy:n[1]+(e()-.5)*a*2,oz:n[2]+(e()-.5)*a*2,r:n[3]*(t<i.length?1:.7)})}let a=t-n;for(let t=0;t<a;t++){let n=(t+.5)/a,i=Math.min(23,Math.max(1,Math.floor(n**.8*23)+1)),o=WD(i/23),s=e()*Math.PI*2,c=o*(.2+e()*.4);r.push({node:i,ox:Math.cos(s)*c,oy:Math.sin(s)*c*.9,oz:(e()-.5)*3,r:Math.max(1.6,o*(.95+e()*.35))})}this.puffs=r;let o=new Wp(this.puffGeo,this.puffMat,r.length),s=new Y;for(let t=0;t<r.length;t++)GD(r[t].oy,r[t].r,e,s),o.setColorAt(t,s);o.frustumCulled=!1,o.name=`dragon_body`,this.body=o,this.group.add(o),this.wings.push(this.buildWing(1,e))}buildWing(e,t){let n=new Ed,r=e>0;n.scale.set(e*(r?1:.7),r?1:.7,r?1:.7);let i=new K(0,0,0),a=new K(13,13,4),o=new K(26,22,6),s=new K(54,33,12),c=new K(52,12,26),l=new K(38,-1,36),u=new K(20,-5,30),d=new K(2,-4,26),f=[[i,a,4.2,3.4],[a,o,3.4,2.8],[o,s,2.4,1.1],[o,c,2.4,1.1],[o,l,2.2,1.1],[o,u,2.1,1.1]],p=RD[this.tier],m=0;for(let[e,t]of f)m+=e.distanceTo(t);let h=f.map(([e,t])=>Math.max(2,Math.round(p*e.distanceTo(t)/m))),g=new Wp(this.puffGeo,this.puffMat,h.reduce((e,t)=>e+t,0)),_=new Y,v=0;for(let e=0;e<f.length;e++){let[n,r,i,a]=f[e],o=h[e];for(let e=0;e<o;e++){let s=(e+.5)/o;this.p.lerpVectors(n,r,s);let c=i+(a-i)*s;this.s.setScalar(c),this.m4.compose(this.p,this.q.identity(),this.s),g.setMatrixAt(v,this.m4),GD(.4*c,c,t,_),g.setColorAt(v,_),v++}}g.frustumCulled=!1,n.add(g);let y=[o,s,c,l,u,d,i],b=[];for(let e=1;e+1<y.length;e++)b.push(y[0].x,y[0].y,y[0].z,y[e].x,y[e].y,y[e].z,y[e+1].x,y[e+1].y,y[e+1].z);let x=new kf;x.setAttribute(`position`,new X(b,3)),x.computeVertexNormals();let S=new Z(x,this.membraneMat);return S.frustumCulled=!1,n.add(S),this.group.add(n),{group:n,puffs:g,membrane:S}}update(e,t,n,r){let i=Math.sin(t*.7)*1.5;this.group.position.set(i,HE(e)+FD+Math.sin(t*.9)*1.2-n*7,e);for(let e=0;e<MD;e++){let n=e/23,r=n*n;this.nodes[e].set(Math.sin(n*5.2-t*1.1)*8*r,Math.sin(n*3.4-t*1.3+.8)*4.5*r+6*Math.sin(n*Math.PI)*.5,n*ND)}let a=this.body;if(a!==null){let e=1+.025*Math.sin(t*1.6);for(let t=0;t<this.puffs.length;t++){let n=this.puffs[t],r=this.nodes[n.node];this.p.set(r.x+n.ox,r.y+n.oy,r.z+n.oz),this.s.setScalar(n.r*e),this.m4.compose(this.p,this.q.identity(),this.s),a.setMatrixAt(t,this.m4)}a.instanceMatrix.needsUpdate=!0}let o=.18+.28*Math.sin(t*1.25),s=this.nodes[ID];for(let e=0;e<this.wings.length;e++){let t=this.wings[e];t.group.position.set(s.x+3,s.y+4,s.z),t.group.rotation.set(0,-.12,1*o)}for(let e=0;e<this.eyes.length;e++){let n=1+.12*Math.sin(t*3+e);this.eyes[e].position.set(this.nodes[0].x+4,1.4,-3.6),this.eyes[e].scale.setScalar(n),this.glows[e].position.copy(this.eyes[e].position),this.glows[e].scale.setScalar(6.5*n)}}dispose(){this.clearBuilt(),this.puffGeo.dispose(),this.puffMat.dispose(),this.membraneMat.dispose(),this.eyeMat.dispose(),this.eyeGeo.dispose(),this.glowMat.dispose(),this.glowTex.dispose()}},JD=150,YD=6,XD=`#678a3c`,ZD=`#7c8c42`,QD=`#857a50`,$D=`#43763a`,eO=`#3f5a33`,tO=`#3a5c35`;function nO(e,t){return(Math.imul((e+1)*7919,(t+3)*104729+17)>>>0)/4294967296}function rO(e,t){let n=Math.abs(e);if(n<=34)return 0;let r=n-34,i=.6+.4*Math.sin(t*2*Math.PI/108+(e>0?.7:2.1));return r*.22*i+r*r*.004}function iO(e,t,n,r,i){let a=Math.abs(e),o=n-HE(t),s=(Math.floor(t/9)%3+3)%3;r.set(XD),s===1&&r.lerp(new Y(ZD),.7),a<14&&r.lerp(new Y(QD),.18*i);let c=Math.min(1,Math.max(0,(a-36)/40));r.lerp(new Y($D),c*(.5+.5*i));let l=Math.min(1,Math.max(0,(o-18)/50));r.lerp(new Y(eO),l);let u=Math.min(1,Math.max(0,(o-55)/70));r.lerp(new Y(tO),u),r.multiplyScalar(.92+.14*i)}function aO(){let e=[];for(let t=-150;t<=150.000001;t+=t<-60||t>60?15:6)e.push(t);e.indexOf(-34)<0&&e.push(-34,34),e.sort((e,t)=>e-t);let t=[];for(let e=JD;e>=-300.000001;e-=YD)t.push(e);let n=e.length,r=t.length,i=[],a=[],o=[],s=new Y;for(let o=0;o<r;o++)for(let r=0;r<n;r++){let n=e[r],c=t[o],l=Math.round(108/YD),u=nO((o%l+l)%l,r),d=HE(c)+rO(n,c);i.push(n,d,c),iO(n,c,d,s,u),a.push(s.r,s.g,s.b)}for(let e=0;e+1<r;e++)for(let t=0;t+1<n;t++){let r=e*n+t,i=r+1,a=r+n,s=a+1;o.push(r,i,a,i,s,a)}let c=new kf;c.setAttribute(`position`,new X(i,3)),c.setAttribute(`color`,new X(a,3)),c.setIndex(o),c.computeVertexNormals();let l=new Z(c,new Wm({vertexColors:!0}));return l.name=`decor_ground`,l}function oO(e){let t=new Em(1.6,6,6);t.translate(0,3,0);let n=new Wp(t,new Wm({color:`#ffffff`}),e*6),r=new J,i=new Au,a=new K,o=new K,s=new Y,c=0;for(let t=0;t<6;t++)for(let l=0;l<e;l++){let e=(l%2==0?-1:1)*(38+nO(l,11)*90),u=JD-t*108-nO(l,29)*108,d=.8+nO(l,41)*1.1;a.set(e,HE(u)+rO(e,u)-.3,u),o.set(d,d*(.9+nO(l,53)*.5),d),r.compose(a,i,o),n.setMatrixAt(c,r),s.set(nO(l,61)<.5?tO:eO).multiplyScalar(.85+nO(l,67)*.3),n.setColorAt(c,s),c++}return n.count=c,n.instanceMatrix.needsUpdate=!0,n.instanceColor!==null&&(n.instanceColor.needsUpdate=!0),n.frustumCulled=!1,n.name=`chase_trees`,n}var sO=class{group=new Ed;strip;trees;k=0;constructor(e){this.group.name=`chase_endlessGround`,this.strip=aO(),this.trees=oO(e),this.group.add(this.strip,this.trees),this.snap(0,!0)}snap(e,t=!1){let n=Math.round(e/108);if(n===this.k&&!t)return;this.k=n;let r=n*108;this.group.position.set(0,jE*r,r)}dispose(){this.strip.geometry.dispose(),this.strip.material.dispose(),this.trees.geometry.dispose(),this.trees.material.dispose(),this.trees.dispose()}};function cO(e,t,n,r=``){let i=document.createElement(t);return i.id=n,i.className=(`chase `+r).trim(),e.appendChild(i),i}var lO=class{cloud;score;scoreText;distText;gap;over;overBody;scoreV=-1;distV=-1;gapPct=-1;danger=!1;cloudV=-1;constructor(e,t){document.body.classList.add(`mode-chase`),this.cloud=cO(e,`div`,`chase-cloud`),this.score=cO(e,`div`,`chase-score`),this.score.innerHTML=`<span class="score">0</span><span class="dist">0 m</span>`,this.scoreText=this.score.querySelector(`.score`),this.distText=this.score.querySelector(`.dist`),this.gap=cO(e,`div`,`chase-gap`),this.gap.innerHTML=`<i class="fill"></i><span class="lbl">DRAGON</span>`,this.over=cO(e,`div`,`chase-over`,`off`),this.over.innerHTML=`<h1>Swallowed by the cloud</h1><div class="big">0</div><p class="detail"></p><p class="best"></p><div class="row"><button type="button" class="retry">RETRY</button><button type="button" class="alt menu">MENU</button></div>`,this.overBody=this.over,this.over.querySelector(`.retry`).addEventListener(`click`,t),this.over.querySelector(`.menu`).addEventListener(`click`,()=>{window.dispatchEvent(new CustomEvent(`zt-menu`))})}setScore(e,t){let n=Math.floor(e);n!==this.scoreV&&(this.scoreV=n,this.scoreText.textContent=String(n));let r=Math.floor(t);r!==this.distV&&(this.distV=r,this.distText.textContent=r+` m`)}setGap(e){let t=Math.min(1,Math.max(0,e)),n=Math.round(t*100);n!==this.gapPct&&(this.gapPct=n,this.gap.style.setProperty(`--gap`,String(n/100)));let r=t<.3;r!==this.danger&&(this.danger=r,this.gap.classList.toggle(`danger`,r))}setCloud(e){let t=Math.round(Math.min(1,Math.max(0,e))*100)/100;t!==this.cloudV&&(this.cloudV=t,this.cloud.style.opacity=String(t*.9))}showOver(e,t,n,r,i,a){this.overBody.querySelector(`h1`).textContent=a,this.overBody.querySelector(`.big`).textContent=String(Math.floor(e)),this.overBody.querySelector(`.detail`).textContent=Math.floor(t)+` m, `+n+` hops`,this.overBody.querySelector(`.best`).textContent=i?`New best!`:`Best `+Math.floor(r),this.over.classList.remove(`off`)}hideOver(){this.over.classList.add(`off`)}get overVisible(){return!this.over.classList.contains(`off`)}destroy(){document.body.classList.remove(`mode-chase`),this.cloud.remove(),this.score.remove(),this.gap.remove(),this.over.remove()}},uO=24,dO=6,fO=.04,pO=12,mO=.045,hO=8,gO=.7,_O=.8,vO=`#3a2a22`,yO=`#ffc83a`,bO=.9,xO=20,SO=.04,CO=.012,wO=.12,TO=.35,EO=6,DO=11,OO=5e-4,kO=Math.PI*2,AO=.065,jO=`#3a2a22`,MO=[],NO=[];for(let e=0;e<=dO;e++){let t=e/dO*Math.PI*2;MO.push(Math.cos(t)),NO.push(Math.sin(t))}var PO=new Y;function FO(e){for(let t=0;t<38;t++){let n=t>uO,r=n?t-uO-1:t,i=n?0:r/uO,a=i>_O?(i-_O)/.19999999999999996:0;for(let n=0;n<=dO;n++){fS(r,n,a,PO);let i=(t*7+n)*3;e[i]=PO.r,e[i+1]=PO.g,e[i+2]=PO.b}}}var IO=class{group=new Ed;line;tube;handle;halo;wheel;sagCur=SO;vibAmp=0;vibT=0;center;trailCenter;eye=new K;tubePos;tubeNrm;linePos;tubePosAttr;tubeNrmAttr;constructor(){this.center=new Float32Array(75),this.trailCenter=new Float32Array(39);let e=new kf;this.linePos=new hf(this.center,3),e.setAttribute(`position`,this.linePos),this.line=new am(e,new Zp({color:vO})),this.line.frustumCulled=!1,this.tubePos=new Float32Array(798),this.tubeNrm=new Float32Array(798);let t=new Float32Array(798);FO(t);let n=new Uint16Array(1296),r=0;for(let e=0;e<36;e++){let t=e<uO?e:e+1;for(let e=0;e<dO;e++){let i=t*7+e,a=(t+1)*7+e,o=a+1,s=i+1;n[r++]=i,n[r++]=s,n[r++]=o,n[r++]=i,n[r++]=o,n[r++]=a}}let i=new kf;this.tubePosAttr=new hf(this.tubePos,3),this.tubeNrmAttr=new hf(this.tubeNrm,3),i.setAttribute(`position`,this.tubePosAttr),i.setAttribute(`normal`,this.tubeNrmAttr),i.setAttribute(`color`,new hf(t,3)),i.setIndex(new hf(n,1)),this.tube=new Z(i,new Wm({vertexColors:!0})),this.tube.frustumCulled=!1,this.tube.onBeforeRender=(e,t,n)=>{this.eye.copy(n.position)},this.handle=new Z(new Sm(.28,.1,.1),new sp({color:yO})),this.wheel=new Z(new Tm(AO,AO,.035,6).rotateZ(Math.PI/2),new Wm({color:jO,flatShading:!0})),this.wheel.position.set(0,.08,0),this.handle.add(this.wheel);let a=new wm(bO,xO),o=a.getAttribute(`position`),s=new Float32Array(o.count*4);for(let e=0;e<o.count;e++){let t=e*4;s[t]=1,s[t+1]=1,s[t+2]=1;let n=o.getX(e),r=o.getY(e);s[t+3]=n*n+r*r<1e-6?.9:0}a.setAttribute(`color`,new hf(s,4)),this.halo=new Z(a,new sp({color:Xx,vertexColors:!0,transparent:!0,blending:2,depthWrite:!1,fog:!1})),this.halo.frustumCulled=!1,this.halo.onBeforeRender=(e,t,n)=>{this.halo.quaternion.copy(n.quaternion),this.halo.updateMatrixWorld(!0)},this.group.add(this.line,this.tube,this.handle,this.halo),this.group.visible=!1}pulse(e){e>this.vibAmp&&(this.vibAmp=e),this.vibT=0}update(e,t,n,r,i,a){if(e.state===0){this.group.visible=!1,this.sagCur=SO,this.vibAmp=0,cS.live=!1;return}this.group.visible=!0;let o=e.state===2;cS.live=o&&cS.set&&e.anchorId===cS.anchorId;let s=e.ax,c=e.ay,l=e.az,u=CO;if(e.state===1){let a=e.len/i,o=a>0?Math.min(1,Math.max(0,1-e.flyT/a)):1;s=t+(e.ax-t)*o,c=n+(e.ay-n)*o,l=r+(e.az-r)*o,u=SO}this.sagCur+=(u-this.sagCur)*(1-Math.exp(-a/wO));let d=this.sagCur,f=s-t,p=c-n,m=l-r,h=Math.sqrt(f*f+p*p+m*m)*d;for(let e=0;e<=uO;e++){let i=e/uO,a=-4*h*i*(1-i);this.center[e*3]=t+f*i,this.center[e*3+1]=n+p*i+a,this.center[e*3+2]=r+m*i}if(o&&this.vibAmp>0){this.vibT+=a;let e=this.vibAmp*Math.exp(-this.vibT/TO);if(e<OO)this.vibAmp=0;else for(let t=1;t<uO;t++){let n=t/uO;this.center[t*3+1]+=e*(Math.sin(kO*EO*this.vibT)*Math.sin(Math.PI*n)+.4*Math.sin(kO*DO*this.vibT)*Math.sin(kO*n))}}else o||(this.vibAmp=0);let g=0;if(o){g=mO;let i=e.ox-e.dirX*hO,a=e.oy-e.dirY*hO,o=e.oz-e.dirZ*hO;cS.live&&(cS.x-e.ox)*e.dirX+(cS.y-e.oy)*e.dirY+(cS.z-e.oz)*e.dirZ<-1&&(i=cS.x,a=cS.y,o=cS.z);let s=i-t,c=a-n,l=o-r,u=Math.sqrt(s*s+c*c+l*l)*CO;for(let e=0;e<=pO;e++){let i=e/pO;this.trailCenter[e*3]=t+s*i,this.trailCenter[e*3+1]=n+c*i-4*u*i*(1-i),this.trailCenter[e*3+2]=r+l*i}}else for(let e=0;e<=pO;e++)this.trailCenter[e*3]=t,this.trailCenter[e*3+1]=n,this.trailCenter[e*3+2]=r;(this.eye.x!==0||this.eye.y!==0||this.eye.z!==0)&&(this.pushFromEye(this.center,uO),o&&this.pushFromEye(this.trailCenter,pO)),this.linePos.needsUpdate=!0,this.writeRings(this.center,uO,0,fO),this.writeRings(this.trailCenter,pO,25,g),this.tubePosAttr.needsUpdate=!0,this.tubeNrmAttr.needsUpdate=!0,this.halo.position.set(s,c,l),this.handle.position.set(t,n+.05,r),this.handle.lookAt(s,c,l),this.wheel.rotation.x=-e.s/AO}pushFromEye(e,t){let n=this.eye.x,r=this.eye.y,i=this.eye.z;for(let a=0;a<=t;a++){let t=e[a*3]-n,o=e[a*3+1]-r,s=e[a*3+2]-i,c=Math.sqrt(t*t+o*o+s*s);if(c>=gO)continue;if(c<1e-6){e[a*3]=n+gO;continue}let l=gO/c;e[a*3]=n+t*l,e[a*3+1]=r+o*l,e[a*3+2]=i+s*l}}writeRings(e,t,n,r){for(let i=0;i<=t;i++){let a=i>0?i-1:0,o=i<t?i+1:t,s=e[o*3]-e[a*3],c=e[o*3+1]-e[a*3+1],l=e[o*3+2]-e[a*3+2],u=Math.sqrt(s*s+c*c+l*l);u<1e-6&&(s=0,c=-1,l=0,u=1),s/=u,c/=u,l/=u;let d=+(Math.abs(c)>.95),f=1-d,p=-l*f,m=l*d,h=s*f-c*d,g=Math.sqrt(p*p+m*m+h*h);g<1e-6&&(p=1,m=0,h=0,g=1),p/=g,m/=g,h/=g;let _=c*h-l*m,v=l*p-s*h,y=s*m-c*p,b=e[i*3],x=e[i*3+1],S=e[i*3+2],C=(n+i)*7;for(let e=0;e<=dO;e++){let t=MO[e],n=NO[e],i=t*p+n*_,a=t*m+n*v,o=t*h+n*y,s=(C+e)*3;this.tubePos[s]=b+i*r,this.tubePos[s+1]=x+a*r,this.tubePos[s+2]=S+o*r,this.tubeNrm[s]=i,this.tubeNrm[s+1]=a,this.tubeNrm[s+2]=o}}}dispose(){this.line.geometry.dispose(),this.tube.geometry.dispose(),this.handle.geometry.dispose(),this.wheel.geometry.dispose(),this.wheel.material.dispose(),this.halo.geometry.dispose()}};function LO(e){let t=(e-2)/9;return t<0?0:t>1?1:t}var RO=.1,zO=.35,BO=.2,VO=.11,HO=.002,UO=3,WO=5,GO=-2,KO=-4,qO=8,JO=4,YO=12,XO=.1,ZO=.15,QO=.035,$O=.15,ek=23,tk=31,nk=1.3,rk=Math.PI*2;function ik(e,t,n){return e<t?t:e>n?n:e}var ak=class{offX=0;offY=0;fovAdd=0;kick=0;accS=0;prevSpeed=0;speedReady=0;amp=0;shakeT=0;update(e,t,n,r,i){let a=e<0?0:e>RO?RO:e;if(a===0)return;t&16&&(this.kick+=UO),t&4&&(this.kick+=WO),t&1&&(this.kick+=GO*LO(n)),this.kick=ik(this.kick,KO,qO),t&1&&LO(n)>=ZO&&this.triggerShake(XO*LO(n)),t&16&&this.triggerShake(QO),t&64&&(i===2||i===3)&&this.triggerShake($O),this.speedReady===0?(this.speedReady=1,this.prevSpeed=r,this.accS=0):(this.accS+=((r-this.prevSpeed)/a-this.accS)*(1-Math.exp(-a/BO)),this.prevSpeed=r);let o=ik(.5*this.accS,0,JO);this.fovAdd=ik(this.kick+o,KO,YO),this.kick*=Math.exp(-a/zO),this.shakeT+=a,this.amp*=Math.exp(-a/VO),this.offY=this.amp*Math.sin(rk*ek*this.shakeT),this.offX=.5*this.amp*Math.sin(rk*tk*this.shakeT+nk),this.amp<HO&&(this.amp=0,this.offX=0,this.offY=0,this.shakeT=0)}reset(){this.offX=0,this.offY=0,this.fovAdd=0,this.kick=0,this.accS=0,this.prevSpeed=0,this.speedReady=0,this.amp=0,this.shakeT=0}triggerShake(e){e>this.amp&&(this.amp=e),this.shakeT=0}},ok=.4,sk=2.2,ck=.55,lk=.03,uk=new jm(.25,.42,12,1);uk.rotateX(-Math.PI/2);var dk=class{mesh;material;age=ok;amount=0;baseY=0;constructor(){this.material=new sp({color:`#c9a27e`,transparent:!0,depthWrite:!1,opacity:0}),this.mesh=new Z(uk,this.material),this.mesh.visible=!1,this.mesh.frustumCulled=!1}trigger(e,t,n,r){this.age=0,this.amount=r<0?0:r>1?1:r,this.baseY=t,this.mesh.position.set(e,t+lk,n),this.mesh.scale.setScalar(1),this.material.opacity=ck*(.5+.5*this.amount),this.mesh.visible=!0}update(e){if(!this.mesh.visible)return;let t=e<0?0:e;this.age+=t;let n=this.age/ok;if(n>=1){this.hide();return}let r=1-n;this.mesh.scale.setScalar(1+sk*(1-r*r*r)),this.material.opacity=ck*(.5+.5*this.amount)*r*r,this.mesh.position.y=this.baseY+lk}hide(){this.age=ok,this.mesh.visible=!1,this.material.opacity=0,this.mesh.scale.setScalar(1)}},fk=class{acc=0;stepDt;maxSteps;constructor(e,t=5){if(!(e>0))throw RangeError(`stepDt must be > 0`);if(!(t>=1))throw RangeError(`maxSteps must be >= 1`);this.stepDt=e,this.maxSteps=t}get fixedStep(){return this.stepDt}feed(e){let t=Number.isFinite(e)&&e>0?e:0;this.acc+=t;let n=0;for(;this.acc>=this.stepDt&&n<this.maxSteps;)this.acc-=this.stepDt,n++;return this.acc>=this.stepDt&&(this.acc%=this.stepDt),n}get alpha(){return this.acc/this.stepDt}reset(){this.acc=0}},pk=class{accumulator;fixedHz;onStep;onRender;rafId=null;last=0;running=!1;paused=!1;constructor(e){if(!(e.fixedHz>0))throw RangeError(`fixedHz must be > 0`);this.fixedHz=e.fixedHz,this.onStep=e.onStep,this.onRender=e.onRender,this.accumulator=new fk(1/e.fixedHz,e.maxSteps)}start(){this.running||(this.running=!0,this.last=performance.now(),document.addEventListener(`visibilitychange`,this.handleVisibility),this.rafId=requestAnimationFrame(this.tick))}stop(){this.running&&(this.running=!1,this.paused=!1,this.cancelFrame(),document.removeEventListener(`visibilitychange`,this.handleVisibility))}pause(){this.running&&!this.paused&&(this.paused=!0,this.cancelFrame(),this.accumulator.reset())}resume(){this.running&&this.paused&&(this.paused=!1,this.last=performance.now(),this.rafId=requestAnimationFrame(this.tick))}cancelFrame(){this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null)}tick=e=>{if(!this.running||this.paused)return;let t=(e-this.last)/1e3;this.last=e;let n=this.accumulator.feed(t);for(let e=0;e<n;e++)this.onStep();this.onRender(this.accumulator.alpha,Number.isFinite(t)&&t>0?t:0),this.rafId=requestAnimationFrame(this.tick)};handleVisibility=()=>{document.hidden?(this.cancelFrame(),this.accumulator.reset()):this.running&&!this.paused&&(this.cancelFrame(),this.last=performance.now(),this.rafId=requestAnimationFrame(this.tick))}},mk=-.14,hk=Math.PI/180;function gk(e,t,n){return e+(t-e)*n}function _k(e){let t=Math.min(1,Math.max(0,(1-e)/.4));return t*t*(3-2*t)}function vk(e,t){if(e.aspect>=1)return{camera:t,lensShiftY:0};let n=_k(e.aspect),r=Math.max(.2,e.aspect),i=Math.min(88,Math.max(60,2*Math.atan(Math.tan(26*hk)/r)/hk)),a=gk(t.fov,Math.max(t.fov,i),n),o=Math.min(98,a+10);return{camera:{...t,fov:a,fovMax:gk(t.fovMax,o,n),dist:gk(t.dist,5.6,n),distSlide:gk(t.distSlide,8,n),height:gk(t.height,2.2,n),shoulder:gk(t.shoulder,0,n),downhillBias:gk(t.downhillBias,12,n)},lensShiftY:mk*n}}var yk=[`classic`,`chase`],bk=`zt.mode`,xk={classic:{label:`Classic`},chase:{label:`Dragon Chase`}},Sk={classic:`bhagdori.best.l1`,chase:`bhagdori.best.chase`};function Ck(){try{return typeof localStorage>`u`?void 0:localStorage}catch{return}}function wk(e){return e===`classic`||e===`chase`?e:null}function Tk(e=Ck(),t){let n=wk(t);if(n!==null)return n;try{return wk(e?.getItem(`zt.mode`))??`classic`}catch{return`classic`}}function Ek(e,t=Ck()){try{t?.setItem(bk,e)}catch{}}function Dk(e,t=Ck()){try{let n=t?.getItem(Sk[e]);if(n==null)return 0;let r=Number(n);return Number.isFinite(r)&&r>0?r:0}catch{return 0}}function Ok(e,t,n=Ck()){try{n?.setItem(Sk[e],String(t))}catch{}}function kk(e){let t=Math.max(0,e),n=Math.floor(t/60),r=t-n*60;return n+`:`+(r<10?`0`:``)+r.toFixed(1)}function Ak(e,t){return e===`classic`?t>0?`Best time `+kk(t):`No best time yet`:t>0?`Best score `+Math.floor(t):`No best score yet`}function jk(e,t,n){let r=e/(t>0?t:1);return{w:e,h:t,aspect:r,orientation:r>=1?`landscape`:`portrait`,coarse:n}}function Mk(){return jk(window.innerWidth,window.innerHeight,window.matchMedia(`(pointer: coarse)`).matches)}function Nk(e){let t=Mk(),n=0,r=0,i=()=>{n=0;let r=Mk(),i=r.orientation!==t.orientation;t=r,e(r,i)},a=()=>{n===0&&(n=requestAnimationFrame(i))},o=()=>{a(),window.clearTimeout(r),r=window.setTimeout(a,250)};return window.addEventListener(`resize`,a),window.addEventListener(`orientationchange`,o),window.visualViewport?.addEventListener(`resize`,a),()=>{window.removeEventListener(`resize`,a),window.removeEventListener(`orientationchange`,o),window.visualViewport?.removeEventListener(`resize`,a),n!==0&&cancelAnimationFrame(n),window.clearTimeout(r)}}var Pk=.3,Fk=.8,Ik=2.5,Lk=3.2,Rk=.9,zk=new Y(`#cdd0da`),Bk=.9,Vk={1:`Missed the roofs`,2:`Too low: hit the wall too fast. Hold BRAKE to slow down`,3:`Too hard a landing`,4:`Hit a hazard`,7:`The dragon caught you`};function Hk(e){let t=e<0?0:e>1?1:e;return t*t*(3-2*t)}function Uk(e){return Math.PI-e}function Wk(){let t=e,r={...n};for(let e of Object.keys(r)){let n=r[e];typeof n==`object`&&n&&(r[e]={...n,...t[e]})}let i=e.fixedHz,a=r;return typeof i==`number`&&(a.fixedHz=i),a}function Gk(e,t){e.pos.x=t.pos.x,e.pos.y=t.pos.y,e.pos.z=t.pos.z,e.lookAt.x=t.lookAt.x,e.lookAt.y=t.lookAt.y,e.lookAt.z=t.lookAt.z,e.focus.x=t.focus.x,e.focus.y=t.focus.y,e.focus.z=t.focus.z,e.arm=t.arm,e.yaw=t.yaw,e.pitch=t.pitch,e.fov=t.fov,e.initialized=t.initialized}function Kk(e,n,r=`classic`){let i=Wk(),o=i.camera,s=new URLSearchParams(location.search),c=r===`chase`,l=s.get(`seed`),u=l!==null&&Number.isFinite(Number(l)),d=u?Number(l)|0:Math.random()*2147483647|0,p=Number(s.get(`dragonGap`));c&&s.has(`dragonGap`)&&Number.isFinite(p)&&p>0&&(i.chase.startGap=p);let m=c?wD(d,0,i):null,h=m===null?Ts(t):m.rw.world,g=iE(e),_=m===null?g.buildWorld(h):null;m!==null&&g.setBlobWorld(h);let v=c?new jD(()=>g.refreshFlags()):null,y=e=>e===`low`?8:e===`medium`?16:26,b=g.getTier(),x=c?new sO(y(b)):null,S=c?new qD(b):null;v!==null&&g.scene.add(v.root),x!==null&&g.scene.add(x.group),S!==null&&g.scene.add(S.group);let w=null;g.scene.traverse(e=>{w===null&&e instanceof Ih&&(w=e)});let T={near:0,far:0,color:``},E=0,D=``,O=0,k=!1,A=0,j=!1,ee=new qx;g.scene.add(ee.group);let te=new TE;g.scene.add(te.group);let P=EE(),ne=new K,re=new IO;g.scene.add(re.group);let oe=new SE;g.scene.add(oe.group);let se=new ak,ce=new dk;g.scene.add(ce.mesh);let ue=new Sc,F=0,de=0,fe=new URLSearchParams(location.search).has(`debug`),pe=fe?new oE:null,me=ie(),I=ie(),he=le(),ge=window.matchMedia(`(pointer: coarse)`).matches,_e=ge?new Us(n):new Ms(e),ve=new Tc,ye=new Tc,be=new f(0,0,0),L=1/i.fixedHz,R=new C,xe=new qe,Se=1/i.aim.previewHz,Ce=-1,z=-1,we=0,B=`pan`,V=0,Te=!1,Ee=0,De=0,Oe=0,ke=!1,Ae=!1,je=!1,Me=Mk(),Ne=0,Pe=0,Fe=0,Ie=Dk(r);function Le(){ae(I,ie()),I.px=h.spawn.x,I.py=h.spawn.y,I.pz=h.spawn.z,I.yaw=h.spawnYaw,I.camYaw=h.spawnYaw,I.camPitch=0;let e=h.anchors[h.route[0]];if(e!==void 0){let t=e.px-I.px,n=e.py-(I.py+i.hero.height*Bk),r=e.pz-I.pz;I.camYaw=Math.atan2(t,r),I.camPitch=Math.atan2(n,Math.sqrt(t*t+r*r))}I.grounded=1,I.mode=1,ae(me,I)}function Re(){be.x=I.px,be.y=I.py,be.z=I.pz;let e=Math.sqrt(I.vx*I.vx+I.vz*I.vz);Ac(ve,be,Uk(I.camYaw),I.camPitch,e,h.solids,o)}let ze=new fE(n,fe,()=>Ve()),Be=c?new lO(n,()=>Ve()):null;function Ve(){m!==null&&(u||(d=Math.random()*2147483647|0),m=wD(d,0,i),h=m.rw.world,g.setBlobWorld(h),v?.invalidate(),x?.snap(0,!0),k=!1,j=!1,O=0,Be?.hideOver()),Le(),B=`play`,Ee=0,De=0,Oe=0,ke=!1,Ae=!1,F=0,de=0,Ce=-1,z=-1,ze.setAimReason(``),se.reset(),ze.hideToast(),ze.hideWin(),ze.objectiveIn(),_e instanceof Us&&_e.reset(),ve.initialized=0,Re(),Gk(ye,ve)}function He(){let e=fe?performance.now():0;Ue(),fe&&(Fe+=performance.now()-e)}function Ue(){if(ae(me,I),_e.sample(he),he.moveX=-he.moveX,he.lookYaw=-he.lookYaw,B===`pan`)V+=L,(Te||V>=(m===null?Ik:Lk))&&(B=`play`,ke=!1,ze.objectiveIn());else if(B===`dead`){if(Ee+=L,m!==null){if(!j&&Ee>=(I.deadCause===7?Rk:.4)&&Ge(),j&&he.pressed&16){Ve();return}}else{let e=ke||!!(he.pressed&16);if(Ee>=Fk||Ee>=Pk&&e){Ve();return}}}else if(B===`play`){if(_e instanceof Us){let e=!!(he.buttons&64);I.mode===3?(e||(Ae=!1),e&&!Ae&&(he.buttons|=8)):(Ae=e,he.pressed&64&&(he.pressed|=2,he.buttons|=2)),ze.setActionLabel(I.mode===3?`BRAKE`:`HOOK`)}We(I,he,h,i),m!==null&&kD(m,I,h,i),De+=L;let e=I.eventBits;if(e&4&&(F|=1,-me.vy>de&&(de=-me.vy)),e&2&&(F|=4),e&1&&(F|=8),e&64&&(F|=128,ze.pulseTimer()),e&16&&(F|=32),e&32&&(F|=64),me.mode!==3&&I.mode===3&&(F|=16),me.grounded===1&&I.grounded===0&&I.mode===1&&I.vy>2&&!(e&2)&&(F|=2),I.eventBits&1&&ze.fadeHint(),m!==null)Oe=pD(m.rw,m.heroRow);else if(I.mode===3){let e=h.route.indexOf(I.hook.anchorId);e>=0&&e+1>Oe&&(Oe=e+1,ze.pulseTimer())}I.eventBits&32?(B=`dead`,Ee=0,ke=!1,m===null?ze.toast(Vk[I.deadCause]??`You fell`):document.pointerLockElement&&document.exitPointerLock()):m===null&&I.dead===0&&h.goal.max.y>h.goal.min.y&&a(h.goal,I.px,I.py,I.pz)&&(B=`won`,(Ie===0||De<Ie)&&(Ie=De,Ok(`classic`,Ie)),ze.showWin(De,Ie),ze.pulseTimer(),document.pointerLockElement&&document.exitPointerLock()),Je(),Ye()}else Ce=-1;Gk(ye,ve),Re()}function Ge(){if(m===null||Be===null)return;j=!0;let e=TD(m,i),t=e>Ie;t&&(Ie=e,Ok(`chase`,e)),Be.showOver(e,m.maxProgress,m.hops,Ie,t,Vk[I.deadCause]??`You fell`)}function Ke(e){let t=g.scene.fog;if(!(t instanceof Pd))return;let n=g.getTier();n!==D&&(D=n,T.near=t.near,T.far=t.far,T.color=`#`+t.color.getHexString(),E=w===null?0:w.intensity),t.near=T.near*(1-.92*e),t.far=T.far*(1-.85*e)+40*e,t.color.set(T.color).lerp(zk,e),w!==null&&(w.intensity=E*(1-.55*e)),Be?.setCloud(e)}function Je(){if(Ce=-1,B!==`play`||I.mode===3||I.hook.state!==0){ze.setReticle(0),ze.setAimReason(``);return}let e=Math.cos(I.camPitch);M(h,i,I.px,I.py+i.rope.handToFeet,I.pz,I.px,I.py+i.hero.height*Bk,I.pz,Math.sin(I.camYaw)*e,Math.sin(I.camPitch),Math.cos(I.camYaw)*e,i.rope.maxLen,ge?i.aim.magnetDegTouch:i.aim.magnetDegDesktop,R),R.anchorId===-1?ze.setAimReason(pE(N(h,i,I.px,I.py+i.rope.handToFeet,I.pz,I.px,I.py+i.hero.height*Bk,I.pz,Math.sin(I.camYaw)*e,Math.sin(I.camPitch),Math.cos(I.camYaw)*e,i.rope.maxLen,ge?i.aim.magnetDegTouch:i.aim.magnetDegDesktop))):ze.setAimReason(``),ze.setReticle(R.anchorId===-1?1:2),Ce=R.anchorId}function Ye(){Ce===-1||I.hookCd>0||I.dead===1?z=-1:(we+=L,(Ce!==z||we>=Se)&&(we=0,z=Ce,mt(I,z,h,i,xe)))}let Xe=new f(46,18,-44),Ze=new f(0,24,i.chase.startGap+34),Qe=(h.goal.min.x+h.goal.max.x)/2,$e=(h.goal.min.y+h.goal.max.y)/2,et=(h.goal.min.z+h.goal.max.z)/2,tt=h.goal.max.y>h.goal.min.y,nt=tt?new f(Qe+14,$e+16,et-16):new f(h.spawn.x+14,h.spawn.y+16,h.spawn.z-30);function rt(e,t,n){let r=Qe,i=$e,a=et,o=tt,s=m===null?Oe:0;if(s<h.route.length){let e=h.anchors[h.route[s]];e!==void 0&&(r=e.px,i=e.py,a=e.pz,o=!0)}let c=r-e,l=i-t,u=a-n,d=Math.sqrt(c*c+l*l+u*u),f=o&&B===`play`&&d>=3;if(te.update(f,r,i,a,kE(h.solids,r,i,a),performance.now()/1e3),!f){ze.setWaypoint(!1,0,0,!1,0,``,!1);return}let p=g.camera;p.updateMatrixWorld(),ne.set(r,i+2.2,a).applyMatrix4(p.matrixWorldInverse);let _=window.innerWidth,v=window.innerHeight,y=AE(_,v,Me.orientation===`portrait`);DE(P,ne.x,ne.y,ne.z,Math.tan(p.fov*Math.PI/360),p.near,_,v,y,28,Ne),ze.setWaypoint(!0,P.x,P.y,P.edge,P.angle,OE(d),P.x>_/2)}function it(e,t){let n=m;if(n===null||v===null||x===null||S===null)return;g.getTier()!==b&&(b=g.getTier(),S.setTier(b),g.scene.remove(x.group),x.dispose(),x=new sO(y(b)),g.scene.add(x.group),v.invalidate()),v.sync(n.rw),v.update(e,pD(n.rw,n.heroRow)),x.snap(ee.group.position.z);let r=n.dragon;S.update(r.z,e,+(B===`dead`&&I.deadCause===7),I.px);let a=B===`pan`?0:bD(r.gap,i);O=a,Ke(O);let o=ee.group.position.z;g.backdropRoot.position.set(0,jE*o,o),!k&&r.gap<i.chase.fogGap&&B===`play`&&(k=!0,ue.roar()),A-=t,A<=0&&B===`play`&&(A=.35,ue.wind(a));let s=TD(n,i);Be?.setScore(s,n.maxProgress),Be?.setGap((r.gap-i.chase.catchGap)/(i.chase.startGap-i.chase.catchGap))}function at(e,t){let n=fe?performance.now():0,r=ee.input;r.brake=I.mode===3&&!!(he.buttons&8),r.rolling=I.rollT>0,r.events=F,r.ropeLen=I.hook.len,r.impact=de,r.win=+(B===`won`),r.hookFlying=+(I.hook.state===1),ee.update(me,I,e,t);let a=ee.group.position,o=a.x,s=a.y+i.rope.handToFeet,c=a.z,l=I.hook;if(l.state!==0){let e=l.ax-o,t=l.ay-s,n=l.az-c,i=Math.sqrt(e*e+t*t+n*n);i>1e-4&&(r.ropeDirX=e/i,r.ropeDirY=t/i,r.ropeDirZ=n/i)}else r.ropeDirX=0,r.ropeDirY=1,r.ropeDirZ=0;F&1&&(de>=3||I.rollT>0)&&ce.trigger(a.x,a.y,a.z,LO(de)),F&2&&ce.trigger(a.x,a.y,a.z,.2),F&8&&ue.fire(),F&16&&ue.attach(),F&1&&ue.land(LO(de)),F&64&&ue.die(),F&64&&I.deadCause===3&&ce.trigger(a.x,a.y,a.z,1),ce.update(t),F&16&&re.pulse(.12*Math.min(1,Math.max(.4,I.hook.v/10))),r.brake&&!je&&re.pulse(.05),je=r.brake,re.update(l,o,s,c,i.rope.hookSpeed,t),se.update(t,F,de,Math.sqrt(I.vx*I.vx+I.vz*I.vz),I.deadCause);let u=z!==-1&&B===`play`?h.anchors[z]:void 0;u!==void 0&&xe.outcome!==0?oe.update(xe.outcome,o,s,c,u.px,u.py,u.pz,xe.x,xe.y,xe.z):oe.hide();let d=performance.now()/1e3;m!==null&&v!==null&&x!==null&&S!==null?it(d,t):_!==null&&($w(_,d,Oe),ze.setTime(De),ze.setHop(Oe,h.route.length),ze.setAltitude(lE(I.py,h.spawn.y,tt?$e:h.spawn.y))),B===`pan`&&(ze.setReticle(0),ze.setAimReason(``));let f=ye.pos.x+(ve.pos.x-ye.pos.x)*e,p=ye.pos.y+(ve.pos.y-ye.pos.y)*e,y=ye.pos.z+(ve.pos.z-ye.pos.z)*e,b=ye.lookAt.x+(ve.lookAt.x-ye.lookAt.x)*e,C=ye.lookAt.y+(ve.lookAt.y-ye.lookAt.y)*e,w=ye.lookAt.z+(ve.lookAt.z-ye.lookAt.z)*e,T=ye.fov+(ve.fov-ye.fov)*e;if(B===`pan`){let t=Hk((V+e*L)/(m===null?Ik:Lk)),n=m===null?nt:Xe,r=m===null?h.spawn:Ze;f=n.x+(f-n.x)*t,p=n.y+(p-n.y)*t,y=n.z+(y-n.z)*t,b=r.x+(b-r.x)*t,C=r.y+(C-r.y)*t,w=r.z+(w-r.z)*t}else if(m!==null&&B===`dead`&&I.deadCause===7){let t=Hk((Ee+e*L)/Rk),n=m.dragon.z;f+=(I.px+7-f)*t,p+=(I.py+5-p)*t,y+=(I.pz-11-y)*t,b+=(0-b)*t,C+=(HE(n)+14-C)*t,w+=(n+6-w)*t}let E=T;if(B!==`pan`&&(f+=se.offX,p+=se.offY,C+=.5*se.offY,E+=se.fovAdd),g.camera.position.set(f,p,y),g.camera.lookAt(b,C,w),Math.abs(g.camera.fov-E)>.001&&E>0&&(g.camera.fov=E,g.camera.updateProjectionMatrix()),rt(o,s-i.rope.handToFeet,c),_e instanceof Us&&_e.render(),fe&&(Pe+=(Fe+(performance.now()-n)-Pe)*.1,Fe=0),g.render(),fe){let e=m!==null&&v!==null?{rows:v.rebuilds,rebuildMs:v.lastRebuildMs,dragonGap:m.dragon.gap,heroRow:m.heroRow,newest:m.rw.newest,score:TD(m,i),cloud:O}:{};window.__ztStats={...g.frameStats(),jsMs:Pe,...e}}let D=g.renderer.info.render;pe?.update(I,D.calls,D.triangles),F=0,de=0}let ot=()=>{ue.unlock(),ke=!0,B===`pan`&&(Te=!0)};window.addEventListener(`keydown`,ot,!0),window.addEventListener(`pointerdown`,ot,!0);let st=()=>{ue.unlock()};window.addEventListener(`pointerup`,st,!0),Le(),Re(),Gk(ye,ve);let ct=new pk({fixedHz:i.fixedHz,onStep:He,onRender:at});ct.start();let lt=(e,t)=>{Me=e,g.resize();let n=vk(e,i.camera);o=n.camera,g.setLensShift(n.lensShiftY),Ne=-n.lensShiftY*e.h,document.documentElement.style.setProperty(`--lens-shift`,String(n.lensShiftY)),t&&_e instanceof Us&&_e.reset()};lt(Me,!1);let ut=Nk(lt);return{mode:r,pause(){ct.pause(),_e instanceof Us&&_e.reset()},resume(){ct.resume()},restart:Ve,destroy(){ct.stop(),ut(),window.removeEventListener(`keydown`,ot,!0),window.removeEventListener(`pointerdown`,ot,!0),window.removeEventListener(`pointerup`,st,!0),_e.dispose(),ze.destroy(),Be?.destroy(),v!==null&&(g.scene.remove(v.root),v.dispose()),x!==null&&(g.scene.remove(x.group),x.dispose()),S!==null&&(g.scene.remove(S.group),S.dispose()),re.dispose(),oe.dispose(),ue.dispose(),te.dispose(),g.scene.remove(te.group),g.scene.remove(ee.group),g.scene.remove(re.group),g.scene.remove(oe.group),g.scene.remove(ce.mesh),g.dispose()}}}var qk=`<svg id="lobby-art" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
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
</svg>`;function Jk(e,t){let n=document.createElement(`div`);n.id=`lobby`,n.innerHTML=qk+`<div class="head"><h1>Bhaaag</h1><p class="tag">Slide the Kathmandu rooftops at sunset</p></div><div class="mid"><div id="lobby-mode" role="radiogroup" aria-label="Game mode">`+yk.map(e=>`<button type="button" role="radio" data-mode="${e}">${xk[e].label}</button>`).join(``)+`</div><button id="lobby-play" type="button">PLAY</button><p id="lobby-best"></p><div id="lobby-gfx" role="radiogroup" aria-label="Graphics quality"><span class="lbl">Graphics</span>`+zT.map(e=>`<button type="button" role="radio" data-tier="${e}" title="${HT[e].desc}">${HT[e].label}</button>`).join(``)+`</div><p id="lobby-gfx-desc"></p></div><div class="how"><div class="desk"><b>Move</b> <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></div><div class="desk"><b>Look</b> mouse</div><div class="desk"><b>Hook</b> <kbd>E</kbd> or click</div><div class="desk"><b>Brake</b> hold <kbd>R</kbd></div><div class="desk"><b>Jump</b> <kbd>Space</kbd></div><div class="desk"><b>Menu</b> <kbd>Esc</kbd></div><div class="touch-only"><b>Move</b> left thumb</div><div class="touch-only"><b>Aim</b> drag right side</div><div class="touch-only"><b>HOOK / BRAKE</b> big button</div><div class="touch-only"><b>JUMP</b> button</div><div class="hint">Portrait or landscape, both work</div></div>`,e.appendChild(n);let r=n.querySelector(`#lobby-play`),i=n.querySelector(`#lobby-best`);if(r===null||i===null)throw Error(`lobby markup`);let a=r,o=i,s=n.querySelector(`#lobby-gfx-desc`),c=n.querySelectorAll(`#lobby-gfx button`);function l(e){for(let t of c)t.setAttribute(`aria-checked`,String(t.dataset.tier===e));s!==null&&(s.textContent=HT[e].desc)}for(let e of c)e.addEventListener(`click`,()=>{let t=zT.find(t=>t===e.dataset.tier);t!==void 0&&(XT(t),l(t))});l(JT());let u=n.querySelectorAll(`#lobby-mode button`),d=Tk(void 0,new URLSearchParams(location.search).get(`mode`));function f(){for(let e of u)e.setAttribute(`aria-checked`,String(e.dataset.mode===d));o.textContent=t.getBestLabel(d)}for(let e of u)e.addEventListener(`click`,()=>{let t=yk.find(t=>t===e.dataset.mode);t!==void 0&&(d=t,Ek(t),f())});let p=document.createElement(`button`);p.id=`menu-btn`,p.type=`button`,p.className=`off`,p.textContent=`MENU`,p.setAttribute(`aria-label`,`Back to lobby`),e.appendChild(p);let m=!0,h=!1;function g(){m=!0,document.pointerLockElement&&document.exitPointerLock(),f(),a.textContent=h?`RESUME`:`PLAY`,n.classList.remove(`off`),p.classList.add(`off`),a.focus({preventScroll:!0})}function _(){m=!1,h=!0,n.classList.add(`off`),p.classList.remove(`off`)}return a.addEventListener(`click`,()=>{t.onPlay(d)}),p.addEventListener(`click`,()=>{t.onMenu()}),window.addEventListener(`keydown`,e=>{e.key===`Escape`&&!m&&t.onMenu()}),f(),g(),{show:g,hide:_,visible:()=>m}}var Yk=document.getElementById(`game`);if(!(Yk instanceof HTMLCanvasElement))throw Error(`canvas#game not found`);function Xk(){if(window.matchMedia(`(pointer: coarse)`).matches)try{document.documentElement.requestFullscreen?.().catch(()=>void 0)}catch{}}var Zk=null,Qk=Jk(document.body,{getBestLabel:e=>Ak(e,Dk(e)),onPlay:e=>{Qk.hide(),Xk(),Zk!==null&&Zk.mode!==e&&(Zk.destroy(),Zk=null),Zk===null?Zk=Kk(Yk,document.body,e):Zk.resume()},onMenu:()=>{Zk?.pause(),Qk.show()}});window.addEventListener(`zt-menu`,()=>{Zk?.pause(),Qk.show()});export{Xu as S,Vm as _,hf as a,G as b,Lu as c,Jc as d,Z as f,ru as g,Hm as h,KS as i,X as l,Ph as m,vT as n,kf as o,sp as p,LS as r,Y as s,dT as t,Ed as u,Vh as v,K as x,Rm as y};