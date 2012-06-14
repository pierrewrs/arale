define("#validator/0.8.0/parser",["$","./rule"],function(require,exports,module){function unique(){return"__anonymous__"+u_count++}function parseRule(str){var match=str.match(/([^{}:\s]*)(\{[^\{\}]*\})?/);return{name:match[1],param:parseJSON(match[2])}}function parseJSON(str){function getValue(str){return str[0]=='"'&&str[str.length-1]=='"'||str[0]=="'"&&str[str.length-1]=="'"?eval(str):str}if(!str)return null;var NOTICE='Invalid option object "'+str+'".';str=str.slice(1,-1);var result={},arr=str.split(",");return $.each(arr,function(i,v){arr[i]=$.trim(v);if(!arr[i])throw new Error(NOTICE);var arr2=arr[i].split(":"),key=$.trim(arr2[0]),value=$.trim(arr2[1]);if(!key||!value)throw new Error(NOTICE);result[getValue(key)]=$.trim(getValue(value))}),result}function parseRules(str){return str?str.match(/[a-zA-Z0-9\-\_]+(\{.*\})?/g):null}function parseDom(field){var field=$(field),result={},arr=[],required=field.attr("required");required&&(arr.push("required"),result.required=!0);var type=field.attr("type");if(type&&type!="submit"&&type!="cancel"&&type!="checkbox"&&type!="radio"&&type!="select"&&type!="select-one"){if(!Rule.getRule(type))throw new Error('Form field with type "'+type+'" not supported!');arr.push(type)}var min=field.attr("min");min&&arr.push('min{"min":"'+min+'"}');var max=field.attr("max");max&&arr.push("max{max:"+max+"}");var minlength=field.attr("minlength");minlength&&arr.push("minlength{min:"+minlength+"}");var maxlength=field.attr("maxlength");maxlength&&arr.push("maxlength{max:"+maxlength+"}");var pattern=field.attr("pattern");if(pattern){var regexp=new RegExp(pattern),name=unique();Rule.addRule(name,regexp),arr.push(name)}var rules=field.attr("data-rule");return rules=rules&&parseRules(rules),rules&&(arr=arr.concat(rules)),result.rule=arr.length==0?null:arr.join(" "),result}var $=require("$"),Rule=require("./rule"),u_count=0;module.exports={parseRule:parseRule,parseRules:parseRules,parseDom:parseDom}});