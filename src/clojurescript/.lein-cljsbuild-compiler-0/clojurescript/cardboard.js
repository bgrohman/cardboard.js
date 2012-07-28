goog.provide('cardboard');
goog.require('cljs.core');
cardboard.modules = cljs.core.atom.call(null,cljs.core.ObjMap.EMPTY);
cardboard.require = (function require(module_id){
return cljs.core.deref.call(null,cardboard.modules).call(null,module_id);
});
goog.exportSymbol('cardboard.require', cardboard.require);
cardboard.convert_dep = (function convert_dep(d){
if(cljs.core._EQ_.call(null,"require",d))
{return cardboard.require;
} else
{if(cljs.core._EQ_.call(null,"exports",d))
{return window.exports;
} else
{if("\uFDD0'else")
{return cardboard.require.call(null,d);
} else
{return null;
}
}
}
});
goog.exportSymbol('cardboard.convert_dep', cardboard.convert_dep);
cardboard.define_with_func = (function define_with_func(id,deps,func){
var dep_objs__6128 = cljs.core.into_array.call(null,cljs.core.map.call(null,cardboard.convert_dep,deps));
var ret__6129 = cljs.core.apply.call(null,func,dep_objs__6128);
var mod__6130 = (((ret__6129 == null))?window.exports:ret__6129);
return cljs.core.swap_BANG_.call(null,cardboard.modules,cljs.core.assoc,id,mod__6130);
});
goog.exportSymbol('cardboard.define_with_func', cardboard.define_with_func);
/**
* Defines a module.
* @param module-id
* @param dependencies optional array of module ids
* @param definition object or function that returns an object
* or uses the global export object to set properties.
*/
cardboard.define = (function() {
var define = null;
var define__2 = (function (module_id,definition){
return define.call(null,module_id,cljs.core.PersistentVector.fromArray(["require","exports"], true),definition);
});
var define__3 = (function (module_id,dependencies,definition){
window.exports = {};
if(!(cljs.core._EQ_.call(null,cljs.core.type.call(null,definition),Function)))
{return cljs.core.swap_BANG_.call(null,cardboard.modules,cljs.core.assoc,module_id,definition);
} else
{if("\uFDD0'else")
{return cardboard.define_with_func.call(null,module_id,dependencies,definition);
} else
{return null;
}
}
});
define = function(module_id,dependencies,definition){
switch(arguments.length){
case 2:
return define__2.call(this,module_id,dependencies);
case 3:
return define__3.call(this,module_id,dependencies,definition);
}
throw('Invalid arity: ' + arguments.length);
};
define.cljs$lang$arity$2 = define__2;
define.cljs$lang$arity$3 = define__3;
return define;
})()
;
goog.exportSymbol('cardboard.define', cardboard.define);
cardboard.debug = (function debug(){
console.log("cardboard.js debug:");
return console.log(cljs.core.deref.call(null,cardboard.modules));
});
goog.exportSymbol('cardboard.debug', cardboard.debug);
window.exports = {};
window.require = cardboard.require;
window.define = cardboard.define;
