
(function template(factory, root) {
        if (typeof module === "object" && typeof module.exports === "object") {
            var v = factory(require);
            if (v !== undefined)
                module.exports = v;
        }
        else if (typeof define === "function" && define.amd) {
            define(["require"], (require) => factory(require));
        }
        else {
            factory(null, root);
        }
    })(function anonymous(req
/**/) {
class Resolver {
        constructor(paths = {}) {
            this.paths = paths;
        }
        resolve(path, uri) {
            var paths = this.paths;
            path = (path ? [path] : []).concat([uri]).join("/");
            var array = (path || "").replace(/\\/gi, "/").split("/");
            var i;
            uri = uri.replace(/\\/gi, "/");
            for (i in paths) {
                if (uri.indexOf(`${i}/`) === 0) {
                    return uri.replace(i, paths[i]);
                }
            }
            for (i = 0; i < array.length; i++) {
                if (!array[i] && i > 0)
                    array.splice(i, 1) && i--;
                else if (array[i] === ".")
                    array.splice(i, 1) && i--;
                else if (array[i] === ".." && i > 0 && array[i - 1] !== ".." && array[i - 1])
                    array.splice(i - 1, 2) && (i -= 2);
            }
            return array.join("/");
        }
    }
var resolver = new Resolver({"node_modules":"node_modules"});
var names = ["node_modules/jquery/dist/jquery","node_modules/vue/dist/vue","src/index"]
var res = [{},{},{}];
var require = function(currentPath, name) { var n = resolver.resolve(currentPath, name); return names.indexOf(n) >= 0 && res[names.indexOf(n)] || req(name); }
res[0] = (function anonymous() {
return $;
})() || res[0];
res[1] = (function anonymous() {
return Vue;
})() || res[1];
return res[2] = (function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    const $ = require("node_modules/jquery/dist/jquery");
    const Vue = require("node_modules/vue/dist/vue");
    __export(require("node_modules/vue/dist/vue"));
    let registeredView = [];
    Vue.Component = (options) => {
        var html = new Promise((resolve, reject) => {
            options.html && resolve(options.html);
            !options.html && options.template && (() => {
                $("<div>").load(`/${options.template}`, (template, status) => {
                    status == "error" && (reject() || true) ||
                        resolve(template);
                });
            })();
        });
        return (Component) => {
            var computed = {};
            for (var key in options.computed) {
                ((key) => {
                    computed[key] = options.computed[key] instanceof Function ?
                        function () { return options.computed[key].apply(this._data, arguments); } :
                        (() => {
                            var descriptor = {};
                            descriptor.set = options.computed[key].set && function () { return options.computed[key].set.apply(this._data, arguments); };
                            descriptor.get = options.computed[key].get && function () { return options.computed[key].get.apply(this._data, arguments); };
                            return descriptor;
                        })();
                })(key);
            }
            registeredView.push({
                id: html.then(template => {
                    Vue.component(options.id, {
                        template: template,
                        data: () => new Component(),
                        computed: computed
                    });
                    return options.id;
                })
            });
        };
    };
})(require.bind(null, "src/"),res[2],res[0],res[1],res[1]) || res[2];
}, typeof window !== 'undefined' && window.Vue || (window.Vue = {}) || {})