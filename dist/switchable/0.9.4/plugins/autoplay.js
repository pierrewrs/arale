define("#switchable/0.9.4/plugins/autoplay",["jquery"],function(require,exports,module){function throttle(fn,ms){function f(){f.stop(),throttleTimer=setTimeout(fn,ms)}ms=ms||200;var throttleTimer;return f.stop=function(){throttleTimer&&(clearTimeout(throttleTimer),throttleTimer=0)},f}function isInViewport(element){var scrollTop=win.scrollTop(),scrollBottom=scrollTop+win.height(),elementTop=element.offset().top,elementBottom=elementTop+element.height();return elementTop<scrollBottom&&elementBottom>scrollTop}var $=require("jquery");module.exports={attrs:{autoplay:!0,interval:5e3,pauseOnScroll:!0,pauseOnHover:!0},isNeeded:function(){return this.get("autoplay")},install:function(){function start(){stop(),that.paused=!1,timer=setInterval(function(){if(that.paused)return;that.next()},interval)}function stop(){timer&&(clearInterval(timer),timer=null),that.paused=!0}var element=this.element,EVENT_NS="."+this.cid,timer,interval=this.get("interval"),that=this;start(),this.stop=stop,this.start=start,this.get("pauseOnScroll")&&(this._scrollDetect=throttle(function(){that[isInViewport(element)?"start":"stop"]()}),win.on("scroll"+EVENT_NS,this._scrollDetect)),this.get("pauseOnHover")&&this.element.hover(stop,start)},destroy:function(){var EVENT_NS="."+this.cid;this.stop(),this._scrollDetect&&(this._scrollDetect.stop(),win.off("scroll"+EVENT_NS))}};var win=$(window)});