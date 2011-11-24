/**
 * CommonJS Module Implementation
 *
 * Creates a CommonJS module definition implementation for use in browser 
 * environments.
 *
 * @author  Bryan Grohman
 * @see https://github.com/bgrohman/cardboard.js for details.
 */
(function(globals) {

    var modules = {};
    globals.exports = {};

    /**
     * Returns the module associated with the given module id.
     * @param moduleId
     * @throws exception when the module is missing
     */
    function require(moduleId) {
        if (typeof modules[moduleId] === 'undefined') {
            throw "Missing module '" + moduleId + "'";
        }

        return modules[moduleId];
    }

    /**
     * Defines a module.
     * @param moduleId
     * @param dependencies  optional array of module ids
     * @param definition    object, or function that returns an object
     * or uses the global export object to set properties.
     */
    function define(/*moduleId, dependencies, definition*/) {
        var moduleId = arguments[0],
            dependencies,
            definition,
            module,
            definitionReturn,
            dependencyObjects = [],
            len,
            i;

        if (arguments.length < 2 || arguments.length > 3) {
            throw "Wrong number of arguments";
        } else if (arguments.length === 2) {
            dependencies = [];
            definition = arguments[1];
        } else {
            dependencies = arguments[1];
            definition = arguments[2];
        }

        if (!(dependencies instanceof Array)) {
            throw "Expected array of dependencies";
        }

        globals.exports = {};

        if (typeof definition === 'function') {
            for (i = 0, len = dependencies.length; i < len; i++) {
                if (dependencies[i] === 'require') {
                    dependencyObjects.push(require);
                } else if (dependencies[i] === 'exports') {
                    dependencyObjects.push(globals.exports);
                } else {
                    dependencyObjects.push(require(dependencies[i]));
                }
            }

            if (dependencyObjects.length === 0) {
                dependencyObjects = [require, globals.exports];
            }

            definitionReturn = definition.apply(null, dependencyObjects);
            module = definitionReturn || globals.exports;
        } else {
            module = definition;
        }

        if (module) {
            modules[moduleId] = module;
        }
    }

    globals.require = require;
    globals.define = define;
    globals.cardboard = {
        require: require,
        define: define,
        debug: function() {
            console.log('cardboard.js debug:');
            console.log(modules);
        }
    };

})(window);
