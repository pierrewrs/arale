define("#calendar/0.8.0/model",["jquery","base","moment"],function(a,b,c){function j(a){a=(a||0).toString().toLowerCase();if(d.isNumeric(a))a=parseInt(a);else for(var b=0;b<i.length;b++)if(i[b].indexOf(a)===0){a=b;break}return a}function k(a,b){var c=[],d;for(f=0;f<h.length;f++)d=f==b,c.push({value:f,label:r(a,h[f]),current:d});d={value:b,label:r(a,h[b])};var e=[];for(var f=0;f<c.length/3;f++)e.push(c.slice(f*3,f*3+3));return{current:d,items:e}}function l(a){var b=[{value:a-10,label:". . .",role:"previous-10-year",current:!1}];for(var c=a-6;c<a+4;c++)b.push({value:c,label:c,role:"year",current:!1});b[7]={value:a,label:a,role:"year",current:!0},b.push({value:a+10,label:". . .",role:"next-10-year",current:!1});var d=[];for(c=0;c<b.length/3;c++)d.push(b.slice(c*3,c*3+3));return{current:a,items:d}}function n(a,b){b=j(b);var c=[];for(var d=b;d<7;d++)c.push({label:r(a,m[d]),value:d});for(d=0;d<b;d++)c.push({label:r(a,m[d]),value:d});return{startDay:b,items:c}}function o(a,b,c){var d=[],e,f,g;c=j(c);var h=function(a,c,e,f){d.push({year:a.year(),month:a.month(),date:a.date(),day:a.day(),previous:c,current:e,next:f,available:q(a,b)})},i=a.clone().date(1),k=i.clone().add("months",-1),l=i.clone().add("months",1);e=i.day()-c,e<0&&(e+=7);if(e!=0){g=k.daysInMonth();for(o=e-1;o>=0;o--)f=k.date(g-o),h(f,!0,!1,!1)}var m=a.format("YYYY-MM-DD");g=i.daysInMonth();for(o=1;o<=g;o++)f=i.date(o),f.format("YYYY-MM-DD")===m?h(f,!1,!0,!1):h(f,!1,!1,!1);e=35-d.length;if(e!=0){e<0&&(e+=7);for(o=1;o<=e;o++)f=l.date(o),h(f,!1,!1,!0)}var n=[];for(var o=0;o<d.length/7;o++)n.push(d.slice(o*7,o*7+7));var p={date:a.date(),day:a.day()};return{focus:p,items:n}}function p(a){var b=f(a);return{hour:b.hours(),minute:b.minutes()}}function q(a,b){if(b==null)return!0;if(d.isArray(b)){var c=b[0],e=b[1],g=!0;return c&&(g=g&&a>=f(c)),e&&(g=g&&a<=f(e)),g}return d.isFunction(b)?b(a):!0}function r(a,b){return a||(a={}),a[b]||b}var d=a("jquery"),e=a("base"),f=a("moment"),g=e.extend({attrs:{year:{setter:function(a){return l(a)}},month:{setter:function(a){return k(this._lang,a)}},day:{setter:function(a){return n(this._lang,a)}},date:{setter:function(a){return o(a,this.range,this._startDay)}},time:{setter:function(a){return p(a)}},mode:{setter:function(a){var b={date:!1,month:!1,year:!1};return b[a]=!0,b.time=this._showTime,b}},i18n:null},initialize:function(a){this._lang=a.lang,this._current=a.focus.clone(),this._startDay=a.startDay,this.range=a.range,this._showTime=a.showTime,a.i18n=a.i18n||{},a.i18n.today="Today";var b={};for(var c in a.i18n)b[c]={key:a.i18n[c]},b[c].value=r(a.lang,a.i18n[c]);this.set("i18n",b),this.set("mode","date"),this.renderData()},renderData:function(){this.set("year",this._current.year()),this.set("month",this._current.month()),this.set("day",this._startDay),this.set("date",this._current.clone()),this.set("time")},changeTime:function(a,b){this._current.add(a,b),this.renderData()},changeStartDay:function(a){this._startDay=a,this.renderData()},changeMode:function(a,b){b||(b={}),"month"in b&&this._current.month(b.month),b.year&&this._current.year(b.year),this.set("mode",a),this.renderData()},selectDate:function(a){return a||(a={}),a.year&&this._current.year(a.year),"month"in a&&this._current.month(a.month),"date"in a&&this._current.date(a.date),this.renderData(),this._current.clone()},isInRange:function(a){return q(a,this.range)},toJSON:function(){var a={},b=this.attrs;for(var c in b)a[c]=this.get(c);return a},range:null,_startDay:0,_current:null,_showTime:!1,_lang:null}),h=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],i=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],m=["Su","Mo","Tu","We","Th","Fr","Sa"];c.exports=g});