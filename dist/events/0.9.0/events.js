define("#events/0.9.0/events",[],function(){function b(){}function c(a,b){return Object.prototype.hasOwnProperty.call(a,b)}var a=/\s+/;b.prototype.on=function(b,d,e){if(!d)return this;b=b.split(a);var f=this.__events||(this.__events={}),g,h,i,j;while(g=b.shift())h=c(f,g)?f[g]:null,i=h?h.tail:{},i.next=j={},i.context=e,i.callback=d,f[g]={tail:j,next:h?h.next:i};return this},b.prototype.off=function(b,c,e){var f,g,h,i,j,k;if(!(f=this.__events))return this;if(!(b||c||e))return delete this.__events,this;b=b?b.split(a):d(f);while(g=b.shift()){h=f[g],delete f[g];if(!h||!c&&!e)continue;i=h.tail;while((h=h.next)!==i)j=h.callback,k=h.context,(c&&j!==c||e&&k!==e)&&this.on(g,j,k)}return this},b.prototype.trigger=function(b){var c,d,e,f,g,h,i;if(!(c=this.__events))return this;b=b.split(a),h=Array.prototype.slice.call(arguments,1),g=c.all;while(d=b.shift()){if(e=c[d]){f=e.tail;while((e=e.next)!==f)e.callback.apply(e.context||this,h)}if(e=g){i=[d].concat(h),f=e.tail;while((e=e.next)!==f)e.callback.apply(e.context||this,i)}}return this};var d=Object.keys;if(!d){var e=!{toString:""}.propertyIsEnumerable("toString"),f=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"];d=function(a){var b=[],d,g=0;for(var h in a)c(a,h)&&b.push(h);if(e)while(d=f[g++])c(a,d)&&b.push(d);return b}}return b});