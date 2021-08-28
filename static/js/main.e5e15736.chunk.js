(this.webpackJsonptetris=this.webpackJsonptetris||[]).push([[0],{137:function(t,e,i){"use strict";i.r(e);var o=i(0),n=i(50),s=(i(56),i(5)),a=i(2);var r=function(t){var e=t.game,i=t.setGame,n=Object(o.useRef)(null);return Object(o.useEffect)((function(){var t,o=null===(t=n.current)||void 0===t?void 0:t.getContext("2d");o&&(e.boardContext=o,e.currentShape.context=o,i(e))}),[e]),Object(a.jsx)("canvas",{ref:n,width:e.width,height:e.height,className:"border-solid border-8 border-gray-300 bg-white rounded-md mb-6 mr-6","data-testid":"canvas-element"})};var h,c=function(t){var e=t.game,i=t.setGame,n=Object(o.useRef)(null);return Object(o.useEffect)((function(){var t,o=null===(t=n.current)||void 0===t?void 0:t.getContext("2d");o&&(e.nextShapeCanvas=o,e.nextShape.context=o,i(e))}),[e]),Object(a.jsx)("canvas",{ref:n,width:80,height:80,className:"border-solid border-8 border-gray-300 bg-white rounded-md p-2 w-20 h-20"})},l=i(1);!function(t){t[t.Up=0]="Up",t[t.Down=1]="Down",t[t.Left=2]="Left",t[t.Right=3]="Right"}(h||(h={}));var u=function t(){Object(l.a)(this,t)};u.leftKeys=["a","ArrowLeft"],u.rightKeys=["d","ArrowRight"],u.upKeys=["w","ArrowUp"],u.downKeys=["s","ArrowDown"],u.MoveDirection=h;var d=u,f=i(51),p=i(3),v=[{name:"I",color:"#ffadad",rotations:[[[1],[1],[1],[1]],[[1,1,1,1]]]},{name:"O",color:"#ffd6a5",rotations:[[[1,1],[1,1]]]},{name:"J",color:"#fdffb6",rotations:[[[0,1],[0,1],[1,1]],[[1,0,0],[1,1,1]],[[1,1],[1,0],[1,0]],[[1,1,1],[0,0,1]]]},{name:"L",color:"#caffbf",rotations:[[[1,0],[1,0],[1,1]],[[1,1,1],[1,0,0]],[[1,1],[0,1],[0,1]],[[0,0,1],[1,1,1]]]},{name:"Z",color:"#9bf6ff",rotations:[[[1,1,0],[0,1,1]],[[0,1],[1,1],[1,0]]]},{name:"S",color:"#a0c4ff",rotations:[[[0,1,1],[1,1,0]],[[1,0],[1,1],[0,1]]]},{name:"T",color:"#bdb2ff",rotations:[[[0,1,0],[1,1,1]],[[1,0],[1,1],[1,0]],[[1,1,1],[0,1,0]],[[0,1],[1,1],[0,1]]]}],b=function(){function t(){Object(l.a)(this,t)}return Object(p.a)(t,null,[{key:"getShape",value:function(t){return v[t]}},{key:"getRandomShape",value:function(){return this.getShape(Math.floor(Math.random()*Math.floor(v.length)))}}]),t}(),S=function(){function t(e,i,o,n){Object(l.a)(this,t),this.shapePosition=void 0,this.blockSize=void 0,this.relativeX=void 0,this.relativeY=void 0,this.shapePosition=e,this.blockSize=i,this.relativeX=o,this.relativeY=n}return Object(p.a)(t,[{key:"position",get:function(){return{x:this.shapePosition.x+this.blockSize*this.relativeX,y:this.shapePosition.y+this.blockSize*this.relativeY}}}]),t}(),m=function(){function t(e,i,o){Object(l.a)(this,t),this.context=void 0,this.blockSize=void 0,this.data=void 0,this.rotation=void 0,this.blocks=void 0,this.color=void 0,this._position=void 0,this.strokeSize=2,this.strokeColor="rgba(0, 0, 0, 0.3)",this.context=e,this.blockSize=o,this.data=b.getRandomShape(),this.rotation=0,this.blocks=this.createBlocks(),this.color=this.data.color,this._position=i,this.position=i}return Object(p.a)(t,[{key:"position",get:function(){return this._position},set:function(t){this.blocks.forEach((function(e){e.shapePosition=t})),this._position=t}},{key:"draw",value:function(){var t=this;this.context&&(this.context.fillStyle=this.color,this.blocks.forEach((function(e){t.context&&(t.context.beginPath(),t.context.rect(e.position.x,e.position.y,t.blockSize,t.blockSize),t.context.fill(),t.context.lineWidth=t.strokeSize,t.context.strokeStyle=t.strokeColor,t.context.stroke())})))}},{key:"createBlocks",value:function(){var t=this,e=this.data.rotations[this.rotation],i=[];return e.forEach((function(e,o){e.forEach((function(e,n){e&&i.push(new S(t.position,t.blockSize,n,o))}))})),i}},{key:"rotate",value:function(){this.rotation<this.data.rotations.length-1?this.rotation++:this.rotation=0,this.blocks=[],this.blocks=this.createBlocks()}}]),t}(),k=i(58),g=function(){function t(){Object(l.a)(this,t)}return Object(p.a)(t,null,[{key:"detectCollision",value:function(t,e,i,o){return!!(this.collidingWithPile(t,e)||this.collidingWithFloor(t,o)||this.collidingWithWalls(t,i))}},{key:"collidingWithPile",value:function(t,e){if(0===e.length)return!1;var i=!1;return e.forEach((function(e){e.blocks.forEach((function(e){t.blocks.some((function(t){return k(t.position,e.position)}))&&(i=!0)}))})),i}},{key:"collidingWithFloor",value:function(t,e){return!!t.blocks.some((function(t){return t.position.y>=e}))}},{key:"collidingWithWalls",value:function(t,e){return!!t.blocks.some((function(t){return t.position.x>=e||t.position.x<0}))}}]),t}(),y=function(){function t(){Object(l.a)(this,t)}return Object(p.a)(t,null,[{key:"setPlaying",value:function(t){}},{key:"setScore",value:function(t){}}]),t}(),x=[100,300,500,800],j=function(){function t(){Object(l.a)(this,t)}return Object(p.a)(t,null,[{key:"calculateScore",value:function(t){return x[t-1]}}]),t}(),w=i(112),O=function(){function t(e,i,o,n){Object(l.a)(this,t),this.boardContext=void 0,this.nextShapeCanvas=void 0,this.width=void 0,this.height=void 0,this.blockSize=void 0,this.currentShape=void 0,this.gameSpeed=void 0,this.nextShape=void 0,this.playing=void 0,this.oldTimeStamp=void 0,this.timePassed=void 0,this.lastTick=void 0,this.pile=void 0,this.currentShapeStartingPosition={x:80,y:-60},this.nextShapeStartingPosition={x:10,y:0},this.animationFrameId=void 0,this.score=void 0,this.gameSpeedChange=.02,this.boardContext=null,this.nextShapeCanvas=null,this.width=e,this.height=i,this.blockSize=o,this.currentShape=new m(this.boardContext,this.currentShapeStartingPosition,o),this.nextShape=new m(this.nextShapeCanvas,this.nextShapeStartingPosition,o),this.playing=n,this.oldTimeStamp=0,this.timePassed=0,this.gameSpeed=.5,this.lastTick=0,this.pile=[],this.animationFrameId=null,this.score=0}return Object(p.a)(t,[{key:"start",value:function(){var t=this;y.setPlaying(!0),this.playing=!0,this.animationFrameId=window.requestAnimationFrame((function(e){t.oldTimeStamp=e,t.gameLoop(e)}))}},{key:"stop",value:function(){y.setPlaying(!1),this.playing=!1,this.animationFrameId&&window.cancelAnimationFrame(this.animationFrameId),this.boardContext&&(this.boardContext.fillStyle="rgba(0, 0, 0, 0.3)",this.boardContext.fillRect(0,0,this.width,this.height))}},{key:"gameLoop",value:function(t){var e=this;if(this.playing){var i=Math.round(t-this.oldTimeStamp)/1e3;if(this.oldTimeStamp=t,this.timePassed+=i,this.timePassed>=this.lastTick){var o=w(this.currentShape);o.position={x:this.currentShape.position.x,y:this.currentShape.position.y+this.blockSize},g.detectCollision(o,this.pile,this.width,this.height)?this.gameOver()?this.stop():(this.pile.push(this.currentShape),this.checkRows(),this.swapNextShape()):this.updateBoard(o),this.lastTick=this.timePassed+this.gameSpeed}this.animationFrameId=window.requestAnimationFrame((function(t){e.gameLoop(t)}))}}},{key:"gameOver",value:function(){return!!this.currentShape.blocks.some((function(t){return t.position.y<=0}))}},{key:"checkRows",value:function(){var t=this,e=this.currentShape.blocks.map((function(t){return t.position.y})).filter((function(t,e,i){return i.indexOf(t)===e})),i=0;e.forEach((function(e){var o=0;t.pile.forEach((function(i){i.blocks.forEach((function(i){i.position.y===e&&(o+=t.blockSize)}))})),o===t.width&&(i++,t.clearRow(e))})),i>0&&(this.score+=j.calculateScore(i),y.setScore(this.score),this.gameSpeed-=this.gameSpeedChange)}},{key:"clearRow",value:function(t){this.pile.forEach((function(e){var i=e.blocks.filter((function(e){return e.position.y!==t}));i.forEach((function(e){e.position.y<t&&e.relativeY++})),e.blocks=i}))}},{key:"swapNextShape",value:function(){this.currentShape=this.nextShape,this.currentShape.context=this.boardContext,this.currentShape.position=this.currentShapeStartingPosition,this.nextShape=new m(this.nextShapeCanvas,this.nextShapeStartingPosition,this.blockSize)}},{key:"updateBoard",value:function(t){this.clearCanvas(),this.currentShape=t,this.drawShapes()}},{key:"clearCanvas",value:function(){var t,e;null===(t=this.boardContext)||void 0===t||t.clearRect(0,0,this.width,this.height),null===(e=this.nextShapeCanvas)||void 0===e||e.clearRect(0,0,this.width,this.height)}},{key:"drawShapes",value:function(){this.nextShape.draw(),this.currentShape.draw(),this.pile.forEach((function(t){t.draw()}))}},{key:"moveShape",value:function(t){if(this.playing){var e=Object(f.a)({},this.currentShape.position),i=w(this.currentShape);switch(t){case d.MoveDirection.Up:i.rotate();break;case d.MoveDirection.Down:e.y=e.y+this.blockSize;break;case d.MoveDirection.Left:e.x=e.x-this.blockSize;break;case d.MoveDirection.Right:e.x=e.x+this.blockSize}i.position=e,g.detectCollision(i,this.pile,this.width,this.height)||this.updateBoard(i)}}}]),t}();var C=function(){var t=Object(o.useState)(0),e=Object(s.a)(t,2),i=e[0],n=e[1],h=Object(o.useState)(!1),l=Object(s.a)(h,2),u=l[0],f=l[1],p=Object(o.useState)(10),v=Object(s.a)(p,2),b=v[0],S=(v[1],Object(o.useState)(200)),m=Object(s.a)(S,2),k=m[0],g=(m[1],Object(o.useState)(400)),x=Object(s.a)(g,2),j=x[0],w=(x[1],Object(o.useState)(k/b)),C=Object(s.a)(w,2),P=C[0],z=(C[1],Object(o.useState)(new O(k,j,P,u))),E=Object(s.a)(z,2),R=E[0],D=E[1],F=function(t){switch(t.key){case d.upKeys.find((function(e){return e===t.key})):R.moveShape(d.MoveDirection.Up);break;case d.downKeys.find((function(e){return e===t.key})):R.moveShape(d.MoveDirection.Down);break;case d.leftKeys.find((function(e){return e===t.key})):R.moveShape(d.MoveDirection.Left);break;case d.rightKeys.find((function(e){return e===t.key})):R.moveShape(d.MoveDirection.Right)}};return Object(o.useEffect)((function(){y.setPlaying=f,y.setScore=n}),[]),Object(a.jsxs)("div",{className:"container",children:[Object(a.jsx)("h1",{className:"pt-4",children:"Tetris"}),Object(a.jsxs)("p",{className:"py-2",children:["Score: ",i]}),Object(a.jsxs)("div",{className:"flex items-start",children:[Object(a.jsx)(r,{game:R,setGame:D}),Object(a.jsx)(c,{game:R,setGame:D})]}),!u&&Object(a.jsx)("button",{className:"btn",onClick:function(){n(0),D(new O(k,j,P,u)),R.start(),document.addEventListener("keydown",F)},children:"Play"})]})},P=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,138)).then((function(e){var i=e.getCLS,o=e.getFID,n=e.getFCP,s=e.getLCP,a=e.getTTFB;i(t),o(t),n(t),s(t),a(t)}))};n.render(Object(a.jsx)(o.StrictMode,{children:Object(a.jsx)(C,{})}),document.getElementById("root")),P()},56:function(t,e,i){}},[[137,1,2]]]);
//# sourceMappingURL=main.e5e15736.chunk.js.map