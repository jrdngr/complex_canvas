!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r=n(1),o=n(2),a=r.PlotBounds.fromBounds(-10,10,-10,10),i=500,s=t=>t.exponent(2);function c(){const t=new r.DrawPlot(a,i,i);document.body.appendChild(t.canvas);const e=function(t,e,n=100){const a=s(o.Complex.fromRectangular(e.xMin,e.yMin)),i=s(o.Complex.fromRectangular(e.xMax,e.yMax));let c=a.re,u=i.re,l=a.im,d=i.im;const h=e.xRange/n,m=e.yRange/n;for(let t=e.xMin;t<e.xMax;t+=h)for(let n=e.yMin;n<e.yMax;n+=m){const e=s(o.Complex.fromRectangular(t,n));c=Math.min(e.re,c),u=Math.max(e.re,u),l=Math.min(e.im,l),d=Math.max(e.im,d)}return r.PlotBounds.fromBounds(c,u,l,d)}(0,a),n=new r.DrawPlot(e,i,i);document.body.appendChild(n.canvas);let c=!1;t.canvas.addEventListener("pointerdown",function(e){c=!0;const[r,a]=u(e);t.beginPath(r,a);const i=s(o.Complex.fromRectangular(r,a));n.beginPath(i.re,i.im)}),t.canvas.addEventListener("pointerup",function(e){c=!1;const[r,a]=u(e);t.endPath(r,a);const i=s(o.Complex.fromRectangular(r,a));n.endPath(i.re,i.im)}),t.canvas.addEventListener("pointerleave",function(e){c=!1;const[r,a]=u(e);t.endPath(r,a);const i=s(o.Complex.fromRectangular(r,a));n.endPath(i.re,i.im)}),t.canvas.addEventListener("pointermove",function(e){if(c){const[r,a]=u(e);t.addPoint(r,a);const i=s(o.Complex.fromRectangular(r,a));n.addPoint(i.re,i.im)}})}function u(t){return[a.xMin+t.pageX/i*a.xRange,a.yMin+t.pageY/i*a.yRange]}e.main=c,c()},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});class r{constructor(t,e,n,r){this.xMin=t,this.xMax=e,this.yMin=n,this.yMax=r,this.xRange=e-t,this.yRange=r-n}static fromBounds(t,e,n,o){return new r(t,e,n,o)}static fromZero(t,e){return new r(0,t,0,e)}static symmetric(t,e){return new r(-t,t,-e,e)}transform(t){return t(this)}}e.PlotBounds=r;e.DrawPlot=class{constructor(t,e,n){this.bounds=t,this.canvas=document.createElement("canvas"),this.canvas.width=e,this.canvas.height=n,this.context=this.canvas.getContext("2d")}beginPath(t,e){const[n,r]=this.getCanvasCoordinates(t,e);this.context.beginPath(),this.context.moveTo(n,r)}endPath(t,e){const[n,r]=this.getCanvasCoordinates(t,e);this.context.closePath()}addPoint(t,e){const[n,r]=this.getCanvasCoordinates(t,e);this.context.lineTo(n,r),this.context.stroke()}getCanvasCoordinates(t,e){return[this.canvas.width*(t-this.bounds.xMin)/this.bounds.xRange,this.canvas.height*(e-this.bounds.yMin)/this.bounds.yRange]}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});class r{constructor(t,e){this.re=t,this.im=e,this.r=Math.sqrt(Math.pow(t,2)+Math.pow(e,2)),this.theta=Math.atan2(e,t)}static zero(){return r.fromRectangular(0,0)}static unit(){return r.fromRectangular(1,0)}static fromRectangular(t,e){return new r(t,e)}static fromPolar(t,e){const n=t*Math.cos(e),o=t*Math.sin(e);return new r(n,o)}static fromComplex(t){return r.fromRectangular(t.re,t.im)}static add(t,e){return r.fromRectangular(t.re+e.re,t.im+e.im)}static subtract(t,e){return r.fromRectangular(t.re-e.re,t.im-e.im)}static multiply(t,e){return r.fromPolar(t.r*e.r,t.theta-e.theta)}static divide(t,e){return r.fromPolar(t.r/e.r,t.theta-e.theta)}static exponent(t,e){const n=Math.pow(t.r,e),o=n*Math.cos(e*t.theta),a=n*Math.sin(e*t.theta);return r.fromRectangular(o,a)}static root(t,e){return r.exponent(t,1/e)}clone(){return r.fromComplex(this)}add(t){return r.add(this,t)}subtract(t){return r.subtract(this,t)}multiply(t){return r.multiply(this,t)}divide(t){return r.divide(this,t)}exponent(t){return r.exponent(this,t)}root(t){return r.root(this,t)}toString(){return`${this.re} + ${this.im}i`}}e.Complex=r}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Bsb3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBsZXgudHMiXSwibmFtZXMiOlsiaW5zdGFsbGVkTW9kdWxlcyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJpIiwibCIsIm1vZHVsZXMiLCJjYWxsIiwibSIsImMiLCJkIiwibmFtZSIsImdldHRlciIsIm8iLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJnZXQiLCJyIiwiU3ltYm9sIiwidG9TdHJpbmdUYWciLCJ2YWx1ZSIsInQiLCJtb2RlIiwiX19lc01vZHVsZSIsIm5zIiwiY3JlYXRlIiwia2V5IiwiYmluZCIsIm4iLCJvYmplY3QiLCJwcm9wZXJ0eSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwicCIsInMiLCJwbG90XzEiLCJjb21wbGV4XzEiLCJib3VuZHMiLCJQbG90Qm91bmRzIiwiZnJvbUJvdW5kcyIsImNhbnZhc1NpemUiLCJmIiwiZXhwb25lbnQiLCJtYWluIiwiZHJhd1Bsb3QiLCJEcmF3UGxvdCIsImRvY3VtZW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwiY2FudmFzIiwiY29tcGxleEJvdW5kcyIsImNvbXBsZXhGdW5jdGlvbiIsInBvaW50c1RvU2FtcGxlIiwibWluSW1hZ2UiLCJDb21wbGV4IiwiZnJvbVJlY3Rhbmd1bGFyIiwieE1pbiIsInlNaW4iLCJtYXhJbWFnZSIsInhNYXgiLCJ5TWF4IiwicmUiLCJpbSIsInhTdGVwIiwieFJhbmdlIiwieVN0ZXAiLCJ5UmFuZ2UiLCJ4IiwieSIsImltYWdlIiwiTWF0aCIsIm1pbiIsIm1heCIsImNhbGN1bGF0ZUNvbXBsZXhCb3VuZHMiLCJjb21wbGV4UGxvdCIsImRvd24iLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJnZXRDb29yZGluYXRlcyIsImJlZ2luUGF0aCIsImVuZFBhdGgiLCJhZGRQb2ludCIsInBhZ2VYIiwicGFnZVkiLCJbb2JqZWN0IE9iamVjdF0iLCJ0aGlzIiwidHJhbnNmb3JtRnVuY3Rpb24iLCJjYW52YXNXaWR0aCIsImNhbnZhc0hlaWdodCIsImNyZWF0ZUVsZW1lbnQiLCJ3aWR0aCIsImhlaWdodCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiY2FudmFzWCIsImNhbnZhc1kiLCJnZXRDYW52YXNDb29yZGluYXRlcyIsIm1vdmVUbyIsImNsb3NlUGF0aCIsImxpbmVUbyIsInN0cm9rZSIsInJlYWwiLCJpbWFnaW5hcnkiLCJzcXJ0IiwicG93IiwidGhldGEiLCJhdGFuMiIsIm1hZ25pdHVkZSIsImFuZ2xlIiwiY29zIiwic2luIiwiYzEiLCJjMiIsImZyb21Qb2xhciIsImV4cCIsIm11bHRpcGxpZXIiLCJyb290IiwiZnJvbUNvbXBsZXgiLCJhZGQiLCJzdWJ0cmFjdCIsIm11bHRpcGx5IiwiZGl2aWRlIl0sIm1hcHBpbmdzIjoiYUFDQSxJQUFBQSxFQUFBLEdBR0EsU0FBQUMsRUFBQUMsR0FHQSxHQUFBRixFQUFBRSxHQUNBLE9BQUFGLEVBQUFFLEdBQUFDLFFBR0EsSUFBQUMsRUFBQUosRUFBQUUsR0FBQSxDQUNBRyxFQUFBSCxFQUNBSSxHQUFBLEVBQ0FILFFBQUEsSUFVQSxPQU5BSSxFQUFBTCxHQUFBTSxLQUFBSixFQUFBRCxRQUFBQyxJQUFBRCxRQUFBRixHQUdBRyxFQUFBRSxHQUFBLEVBR0FGLEVBQUFELFFBS0FGLEVBQUFRLEVBQUFGLEVBR0FOLEVBQUFTLEVBQUFWLEVBR0FDLEVBQUFVLEVBQUEsU0FBQVIsRUFBQVMsRUFBQUMsR0FDQVosRUFBQWEsRUFBQVgsRUFBQVMsSUFDQUcsT0FBQUMsZUFBQWIsRUFBQVMsRUFBQSxDQUEwQ0ssWUFBQSxFQUFBQyxJQUFBTCxLQUsxQ1osRUFBQWtCLEVBQUEsU0FBQWhCLEdBQ0Esb0JBQUFpQixlQUFBQyxhQUNBTixPQUFBQyxlQUFB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LGdCQUFnQjJCLEVBQWFDLEdBQ3pCLE9BQU8xRCxFQUFRMkQsVUFBVUYsRUFBRzlGLEVBQUkrRixFQUFHL0YsRUFBRzhGLEVBQUdOLE1BQVFPLEVBQUdQLE9BR3hEckIsY0FBYzJCLEVBQWFDLEdBQ3ZCLE9BQU8xRCxFQUFRMkQsVUFBVUYsRUFBRzlGLEVBQUkrRixFQUFHL0YsRUFBRzhGLEVBQUdOLE1BQVFPLEVBQUdQLE9BR3hEckIsZ0JBQWdCNUUsRUFBWTBHLEdBQ3hCLE1BQU1DLEVBQWE3QyxLQUFBa0MsSUFBQWhHLEVBQUVTLEVBQUtpRyxHQUNwQnJELEVBQUtzRCxFQUFhN0MsS0FBS3VDLElBQUlLLEVBQU0xRyxFQUFFaUcsT0FDbkMzQyxFQUFLcUQsRUFBYTdDLEtBQUt3QyxJQUFJSSxFQUFNMUcsRUFBRWlHLE9BQ3pDLE9BQU9uRCxFQUFRQyxnQkFBZ0JNLEVBQUlDLEdBR3ZDc0IsWUFBWTVFLEVBQVk0RyxHQUNwQixPQUFPOUQsRUFBUVosU0FBU2xDLEVBQUcsRUFBRTRHLEdBRzFCaEMsUUFDSCxPQUFPOUIsRUFBUStELFlBQVloQyxNQUd4QkQsSUFBSTVFLEdBQ1AsT0FBTzhDLEVBQVFnRSxJQUFJakMsS0FBTTdFLEdBR3RCNEUsU0FBUzVFLEdBQ1osT0FBTzhDLEVBQVFpRSxTQUFTbEMsS0FBTTdFLEdBRzNCNEUsU0FBUzVFLEdBQ1osT0FBTzhDLEVBQVFrRSxTQUFTbkMsS0FBTTdFLEdBRzNCNEUsT0FBTzVFLEdBQ1YsT0FBTzhDLEVBQVFtRSxPQUFPcEMsS0FBTTdFLEdBR3pCNEUsU0FBUzhCLEdBQ1osT0FBTzVELEVBQVFaLFNBQVMyQyxLQUFNNkIsR0FHM0I5QixLQUFLZ0MsR0FDUixPQUFPOUQsRUFBUThELEtBQUsvQixLQUFNK0IsR0FHdkJoQyxXQUNILFNBQVVDLEtBQUt4QixRQUFRd0IsS0FBS3ZCLE9BM0ZwQzdELEVBQUFxRCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiaW1wb3J0IHsgRHJhd1Bsb3QsIFBsb3RCb3VuZHMgfSBmcm9tIFwiLi9wbG90XCI7XG5pbXBvcnQgeyBDb21wbGV4LCBDb21wbGV4RnVuY3Rpb24gfSBmcm9tIFwiLi9jb21wbGV4XCI7XG5cbmNvbnN0IGJvdW5kcyA9IFBsb3RCb3VuZHMuZnJvbUJvdW5kcygtMTAsIDEwLCAtMTAsIDEwKTtcbmNvbnN0IGNhbnZhc1NpemUgPSA1MDA7XG5cbmNvbnN0IGY6IENvbXBsZXhGdW5jdGlvbiA9IGMgPT4gYy5leHBvbmVudCgyKTtcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gICAgY29uc3QgZHJhd1Bsb3QgPSBuZXcgRHJhd1Bsb3QoYm91bmRzLCBjYW52YXNTaXplLCBjYW52YXNTaXplKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRyYXdQbG90LmNhbnZhcyk7XG5cbiAgICBjb25zdCBjb21wbGV4Qm91bmRzID0gY2FsY3VsYXRlQ29tcGxleEJvdW5kcyhmLCBib3VuZHMpO1xuXG4gICAgY29uc3QgY29tcGxleFBsb3QgPSBuZXcgRHJhd1Bsb3QoY29tcGxleEJvdW5kcywgY2FudmFzU2l6ZSwgY2FudmFzU2l6ZSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb21wbGV4UGxvdC5jYW52YXMpO1xuXG4gICAgbGV0IGRvd24gPSBmYWxzZTtcblxuICAgIGRyYXdQbG90LmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgZnVuY3Rpb24oZXZlbnQpIHsgXG4gICAgICAgIGRvd24gPSB0cnVlO1xuICAgICAgICBjb25zdCBbeCwgeV0gPSBnZXRDb29yZGluYXRlcyhldmVudCk7XG4gICAgICAgIGRyYXdQbG90LmJlZ2luUGF0aCh4LCB5KTtcblxuICAgICAgICBjb25zdCBjID0gZihDb21wbGV4LmZyb21SZWN0YW5ndWxhcih4LCB5KSk7XG4gICAgICAgIGNvbXBsZXhQbG90LmJlZ2luUGF0aChjLnJlLCBjLmltKTtcbiAgICB9KTtcbiAgICBcbiAgICBkcmF3UGxvdC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJ1cFwiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBkb3duID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IFt4LCB5XSA9IGdldENvb3JkaW5hdGVzKGV2ZW50KTtcbiAgICAgICAgZHJhd1Bsb3QuZW5kUGF0aCh4LCB5KTtcblxuICAgICAgICBjb25zdCBjID0gZihDb21wbGV4LmZyb21SZWN0YW5ndWxhcih4LCB5KSk7XG4gICAgICAgIGNvbXBsZXhQbG90LmVuZFBhdGgoYy5yZSwgYy5pbSk7XG4gICAgfSk7XG5cbiAgICBkcmF3UGxvdC5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJsZWF2ZVwiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBkb3duID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IFt4LCB5XSA9IGdldENvb3JkaW5hdGVzKGV2ZW50KTtcbiAgICAgICAgZHJhd1Bsb3QuZW5kUGF0aCh4LCB5KTtcblxuICAgICAgICBjb25zdCBjID0gZihDb21wbGV4LmZyb21SZWN0YW5ndWxhcih4LCB5KSk7XG4gICAgICAgIGNvbXBsZXhQbG90LmVuZFBhdGgoYy5yZSwgYy5pbSk7XG4gICAgfSk7XG4gIFxuICAgIGRyYXdQbG90LmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcm1vdmVcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGRvd24pIHtcbiAgICAgICAgICAgIGNvbnN0IFt4LCB5XSA9IGdldENvb3JkaW5hdGVzKGV2ZW50KTtcbiAgICAgICAgICAgIGRyYXdQbG90LmFkZFBvaW50KHgsIHkpO1xuXG4gICAgICAgICAgICBjb25zdCBjID0gZihDb21wbGV4LmZyb21SZWN0YW5ndWxhcih4LCB5KSk7XG4gICAgICAgICAgICBjb21wbGV4UGxvdC5hZGRQb2ludChjLnJlLCBjLmltKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRDb29yZGluYXRlcyhldmVudDogUG9pbnRlckV2ZW50KTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgY29uc3QgeCA9IGJvdW5kcy54TWluICsgKGV2ZW50LnBhZ2VYIC8gY2FudmFzU2l6ZSkgKiBib3VuZHMueFJhbmdlO1xuICAgIGNvbnN0IHkgPSBib3VuZHMueU1pbiArIChldmVudC5wYWdlWSAvIGNhbnZhc1NpemUpICogYm91bmRzLnlSYW5nZTtcblxuICAgIHJldHVybiBbeCwgeV07XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZUNvbXBsZXhCb3VuZHMoY29tcGxleEZ1bmN0aW9uOiBDb21wbGV4RnVuY3Rpb24sIGJvdW5kczogUGxvdEJvdW5kcywgcG9pbnRzVG9TYW1wbGU6IG51bWJlciA9IDEwMCk6IFBsb3RCb3VuZHMge1xuICAgIGNvbnN0IG1pbkltYWdlID0gZihDb21wbGV4LmZyb21SZWN0YW5ndWxhcihib3VuZHMueE1pbiwgYm91bmRzLnlNaW4pKTtcbiAgICBjb25zdCBtYXhJbWFnZSA9IGYoQ29tcGxleC5mcm9tUmVjdGFuZ3VsYXIoYm91bmRzLnhNYXgsIGJvdW5kcy55TWF4KSk7XG5cbiAgICBsZXQgeE1pbiA9IG1pbkltYWdlLnJlO1xuICAgIGxldCB4TWF4ID0gbWF4SW1hZ2UucmU7XG4gICAgbGV0IHlNaW4gPSBtaW5JbWFnZS5pbTtcbiAgICBsZXQgeU1heCA9IG1heEltYWdlLmltO1xuXG4gICAgY29uc3QgeFN0ZXAgPSBib3VuZHMueFJhbmdlIC8gcG9pbnRzVG9TYW1wbGU7XG4gICAgY29uc3QgeVN0ZXAgPSBib3VuZHMueVJhbmdlIC8gcG9pbnRzVG9TYW1wbGU7XG5cbiAgICBmb3IgKGxldCB4ID0gYm91bmRzLnhNaW47IHggPCBib3VuZHMueE1heDsgeCArPSB4U3RlcCkge1xuICAgICAgICBmb3IgKGxldCB5ID0gYm91bmRzLnlNaW47IHkgPCBib3VuZHMueU1heDsgeSArPSB5U3RlcCkge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBmKENvbXBsZXguZnJvbVJlY3Rhbmd1bGFyKHgsIHkpKTtcbiAgICAgICAgICAgIHhNaW4gPSBNYXRoLm1pbihpbWFnZS5yZSwgeE1pbik7XG4gICAgICAgICAgICB4TWF4ID0gTWF0aC5tYXgoaW1hZ2UucmUsIHhNYXgpO1xuICAgICAgICAgICAgeU1pbiA9IE1hdGgubWluKGltYWdlLmltLCB5TWluKTtcbiAgICAgICAgICAgIHlNYXggPSBNYXRoLm1heChpbWFnZS5pbSwgeU1heCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUGxvdEJvdW5kcy5mcm9tQm91bmRzKHhNaW4sIHhNYXgsIHlNaW4sIHlNYXgpO1xufVxuXG5tYWluKCk7IiwiZXhwb3J0IGNsYXNzIFBsb3RCb3VuZHMge1xuICAgIHJlYWRvbmx5IHhNaW46IG51bWJlcjtcbiAgICByZWFkb25seSB4TWF4OiBudW1iZXI7XG4gICAgcmVhZG9ubHkgeU1pbjogbnVtYmVyO1xuICAgIHJlYWRvbmx5IHlNYXg6IG51bWJlcjtcblxuICAgIHJlYWRvbmx5IHhSYW5nZTogbnVtYmVyO1xuICAgIHJlYWRvbmx5IHlSYW5nZTogbnVtYmVyO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHhNaW46IG51bWJlciwgeE1heDogbnVtYmVyLCB5TWluOiBudW1iZXIsIHlNYXg6IG51bWJlcikge1xuICAgICAgICB0aGlzLnhNaW4gPSB4TWluO1xuICAgICAgICB0aGlzLnhNYXggPSB4TWF4O1xuICAgICAgICB0aGlzLnlNaW4gPSB5TWluO1xuICAgICAgICB0aGlzLnlNYXggPSB5TWF4O1xuXG4gICAgICAgIHRoaXMueFJhbmdlID0geE1heCAtIHhNaW47XG4gICAgICAgIHRoaXMueVJhbmdlID0geU1heCAtIHlNaW47XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21Cb3VuZHMoeE1pbjogbnVtYmVyLCB4TWF4OiBudW1iZXIsIHlNaW46IG51bWJlciwgeU1heDogbnVtYmVyKTogUGxvdEJvdW5kcyB7XG4gICAgICAgIHJldHVybiBuZXcgUGxvdEJvdW5kcyh4TWluLCB4TWF4LCB5TWluLCB5TWF4KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbVplcm8oeE1heDogbnVtYmVyLCB5TWF4OiBudW1iZXIpOiBQbG90Qm91bmRzIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQbG90Qm91bmRzKDAsIHhNYXgsIDAsIHlNYXgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzeW1tZXRyaWMoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBQbG90Qm91bmRzIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQbG90Qm91bmRzKC14LCB4LCAteSwgeSk7XG4gICAgfVxuXG4gICAgcHVibGljIHRyYW5zZm9ybSh0cmFuc2Zvcm1GdW5jdGlvbjogKGJvdW5kc0lucHV0OiBQbG90Qm91bmRzKSA9PiBQbG90Qm91bmRzKTogUGxvdEJvdW5kcyB7XG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1GdW5jdGlvbih0aGlzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEcmF3UGxvdCB7XG4gICAgcHVibGljIHJlYWRvbmx5IGJvdW5kczogUGxvdEJvdW5kcztcbiAgICBwdWJsaWMgcmVhZG9ubHkgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcblxuICAgIGNvbnN0cnVjdG9yKGJvdW5kczogUGxvdEJvdW5kcywgY2FudmFzV2lkdGg6IG51bWJlciwgY2FudmFzSGVpZ2h0OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5ib3VuZHMgPSBib3VuZHM7XG5cbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IGNhbnZhc1dpZHRoO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBjYW52YXNIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpITtcblxuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgYmVnaW5QYXRoKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IFtjYW52YXNYLCBjYW52YXNZXSA9IHRoaXMuZ2V0Q2FudmFzQ29vcmRpbmF0ZXMoeCwgeSk7XG4gICAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhjYW52YXNYLCBjYW52YXNZKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZW5kUGF0aCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICBjb25zdCBbY2FudmFzWCwgY2FudmFzWV0gPSB0aGlzLmdldENhbnZhc0Nvb3JkaW5hdGVzKHgsIHkpO1xuICAgICAgICB0aGlzLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBhZGRQb2ludCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICBjb25zdCBbY2FudmFzWCwgY2FudmFzWV0gPSB0aGlzLmdldENhbnZhc0Nvb3JkaW5hdGVzKHgsIHkpO1xuICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKGNhbnZhc1gsIGNhbnZhc1kpO1xuICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDYW52YXNDb29yZGluYXRlcyh4OiBudW1iZXIsIHk6IG51bWJlcik6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgICAgICBjb25zdCBjYW52YXNYID0gdGhpcy5jYW52YXMud2lkdGggKiAoeCAtIHRoaXMuYm91bmRzLnhNaW4pIC8gdGhpcy5ib3VuZHMueFJhbmdlO1xuICAgICAgICBjb25zdCBjYW52YXNZID0gdGhpcy5jYW52YXMuaGVpZ2h0ICogKHkgLSB0aGlzLmJvdW5kcy55TWluKSAvIHRoaXMuYm91bmRzLnlSYW5nZTtcblxuICAgICAgICByZXR1cm4gW2NhbnZhc1gsIGNhbnZhc1ldO1xuICAgIH1cbn0iLCJleHBvcnQgdHlwZSBDb21wbGV4RnVuY3Rpb24gPSAoYzogQ29tcGxleCkgPT4gQ29tcGxleDtcblxuZXhwb3J0IGNsYXNzIENvbXBsZXgge1xuICAgIHJlYWRvbmx5IHJlOiBudW1iZXI7XG4gICAgcmVhZG9ubHkgaW06IG51bWJlcjtcbiAgICByZWFkb25seSByOiBudW1iZXI7XG4gICAgcmVhZG9ubHkgdGhldGE6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWw6IG51bWJlciwgaW1hZ2luYXJ5OiBudW1iZXIpIHsgXG4gICAgICAgIHRoaXMucmUgPSByZWFsO1xuICAgICAgICB0aGlzLmltID0gaW1hZ2luYXJ5O1xuICAgICAgICB0aGlzLnIgPSBNYXRoLnNxcnQocmVhbCAqKiAyICsgaW1hZ2luYXJ5ICoqIDIpO1xuICAgICAgICB0aGlzLnRoZXRhID0gTWF0aC5hdGFuMihpbWFnaW5hcnksIHJlYWwpO1xuICAgIH1cblxuICAgIHN0YXRpYyB6ZXJvKCkgOiBDb21wbGV4IHtcbiAgICAgICAgcmV0dXJuIENvbXBsZXguZnJvbVJlY3Rhbmd1bGFyKDAsIDApO1xuICAgIH1cblxuICAgIHN0YXRpYyB1bml0KCkgOiBDb21wbGV4IHtcbiAgICAgICAgcmV0dXJuIENvbXBsZXguZnJvbVJlY3Rhbmd1bGFyKDEsIDApO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tUmVjdGFuZ3VsYXIocmVhbDogbnVtYmVyLCBpbWFnaW5hcnk6IG51bWJlcikgOiBDb21wbGV4IHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb21wbGV4KHJlYWwsIGltYWdpbmFyeSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21Qb2xhcihtYWduaXR1ZGU6IG51bWJlciwgYW5nbGU6IG51bWJlcikgOiBDb21wbGV4IHtcbiAgICAgICAgY29uc3QgcmVhbCA9IG1hZ25pdHVkZSAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgY29uc3QgaW1hZ2luYXJ5ID0gbWFnbml0dWRlICogTWF0aC5zaW4oYW5nbGUpO1xuICAgICAgICByZXR1cm4gbmV3IENvbXBsZXgocmVhbCwgaW1hZ2luYXJ5KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbUNvbXBsZXgoYzogQ29tcGxleCkgOiBDb21wbGV4IHtcbiAgICAgICAgcmV0dXJuIENvbXBsZXguZnJvbVJlY3Rhbmd1bGFyKGMucmUsIGMuaW0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGQoYzE6IENvbXBsZXgsIGMyOiBDb21wbGV4KSA6IENvbXBsZXgge1xuICAgICAgICByZXR1cm4gQ29tcGxleC5mcm9tUmVjdGFuZ3VsYXIoYzEucmUgKyBjMi5yZSwgYzEuaW0gKyBjMi5pbSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHN1YnRyYWN0KGMxOiBDb21wbGV4LCBjMjogQ29tcGxleCkgOiBDb21wbGV4IHtcbiAgICAgICAgcmV0dXJuIENvbXBsZXguZnJvbVJlY3Rhbmd1bGFyKGMxLnJlIC0gYzIucmUsIGMxLmltIC0gYzIuaW0pO1xuICAgIH1cblxuICAgIHN0YXRpYyBtdWx0aXBseShjMTogQ29tcGxleCwgYzI6IENvbXBsZXgpIDogQ29tcGxleCB7XG4gICAgICAgIHJldHVybiBDb21wbGV4LmZyb21Qb2xhcihjMS5yICogYzIuciwgYzEudGhldGEgLSBjMi50aGV0YSkgICAgXG4gICAgfVxuXG4gICAgc3RhdGljIGRpdmlkZShjMTogQ29tcGxleCwgYzI6IENvbXBsZXgpIDogQ29tcGxleCB7XG4gICAgICAgIHJldHVybiBDb21wbGV4LmZyb21Qb2xhcihjMS5yIC8gYzIuciwgYzEudGhldGEgLSBjMi50aGV0YSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGV4cG9uZW50KGM6IENvbXBsZXgsIGV4cDogbnVtYmVyKSA6IENvbXBsZXgge1xuICAgICAgICBjb25zdCBtdWx0aXBsaWVyID0gYy5yICoqIGV4cDtcbiAgICAgICAgY29uc3QgcmUgPSBtdWx0aXBsaWVyICogTWF0aC5jb3MoZXhwICogYy50aGV0YSk7XG4gICAgICAgIGNvbnN0IGltID0gbXVsdGlwbGllciAqIE1hdGguc2luKGV4cCAqIGMudGhldGEpO1xuICAgICAgICByZXR1cm4gQ29tcGxleC5mcm9tUmVjdGFuZ3VsYXIocmUsIGltKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcm9vdChjOiBDb21wbGV4LCByb290OiBudW1iZXIpIDogQ29tcGxleCB7XG4gICAgICAgIHJldHVybiBDb21wbGV4LmV4cG9uZW50KGMsIDEvcm9vdCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsb25lKCkgOiBDb21wbGV4IHtcbiAgICAgICAgcmV0dXJuIENvbXBsZXguZnJvbUNvbXBsZXgodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZChjOiBDb21wbGV4KSA6IENvbXBsZXgge1xuICAgICAgICByZXR1cm4gQ29tcGxleC5hZGQodGhpcywgYyk7XG4gICAgfVxuXG4gICAgcHVibGljIHN1YnRyYWN0KGM6IENvbXBsZXgpIDogQ29tcGxleCB7XG4gICAgICAgIHJldHVybiBDb21wbGV4LnN1YnRyYWN0KHRoaXMsIGMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtdWx0aXBseShjOiBDb21wbGV4KSA6IENvbXBsZXgge1xuICAgICAgICByZXR1cm4gQ29tcGxleC5tdWx0aXBseSh0aGlzLCBjKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGl2aWRlKGM6IENvbXBsZXgpIDogQ29tcGxleCB7XG4gICAgICAgIHJldHVybiBDb21wbGV4LmRpdmlkZSh0aGlzLCBjKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXhwb25lbnQoZXhwOiBudW1iZXIpIDogQ29tcGxleCB7XG4gICAgICAgIHJldHVybiBDb21wbGV4LmV4cG9uZW50KHRoaXMsIGV4cCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJvb3Qocm9vdDogbnVtYmVyKSA6IENvbXBsZXgge1xuICAgICAgICByZXR1cm4gQ29tcGxleC5yb290KHRoaXMsIHJvb3QpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5yZX0gKyAke3RoaXMuaW19aWA7XG4gICAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=