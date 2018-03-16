
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
    Object.defineProperty(exports, "__esModule", { value: true });
    const $ = require("node_modules/jquery/dist/jquery");
    const Vue = require("node_modules/vue/dist/vue");
    exports.Vue = Vue;
    let load = (str) => new Promise((resolve, reject) => {
        $("<div>").load(`/${str.replace(/^\//i, '')}`, (template, status) => {
            status == "error" && (reject() || true) ||
                resolve(template);
        });
    });
    let template = "loading...";
    let create = (type) => new type();
    let components;
    let getComponent = (type) => components.filter((c) => c.component instanceof type || c.component === type)[0];
    exports.config = (options) => {
        load = options.load || load;
        template = options.loadingTemplate || template;
    };
    exports.Component = Vue.Component = (options) => {
        var html = options.html && new Promise((resolve) => options.html && resolve(options.html)) ||
            options.template && load(options.template);
        return (Component) => {
            components.push({
                component: Component,
                name: options.name
            });
            Vue.component(options.name, {
                template: `<div v-template='{ template: template, data: data }'>${template}</div>`,
                directives: {
                    "template": (el, binding, vnode) => {
                        if (binding.value && binding.value !== binding.oldValue && binding.oldValue && binding.value.template !== binding.oldValue.template) {
                            var view = new Vue({
                                el: $(binding.value.template)[0],
                                data: binding.value.data.data,
                                computed: binding.value.data.computed
                            });
                            $(el).html("");
                            $(el).append(view.$el);
                        }
                    }
                },
                data: () => {
                    var instance = create(Component);
                    var data = {
                        template: undefined,
                        data: {
                            data: instance,
                            computed: options.computed(instance)
                        }
                    };
                    html.then(template => data.template = template);
                    return data;
                }
            });
        };
    };
    function start(element, name) {
        var isString = typeof (name) !== "string";
        name = (isString && getComponent(name) || { name: isString && name || '' }).name;
        $(element).append(new Vue({
            el: $(`<div is='${name}'></div>`)[0]
        }).$el);
    }
    exports.start = start;
})(require.bind(null, "src/"),res[2],res[0],res[1]) || res[2];
}, typeof window !== 'undefined' && window.Vue || (window.Vue = {}) || {})