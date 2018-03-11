(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "node_modules/jquery/dist/jquery", "node_modules/vue/dist/vue", "node_modules/vue/dist/vue"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    const $ = require("node_modules/jquery/dist/jquery");
    const Vue = require("node_modules/vue/dist/vue");
    __export(require("node_modules/vue/dist/vue"));
    Vue.Component = (options) => {
        var html = new Promise((resolve, reject) => {
            options.html && setTimeout(() => resolve(options.html), 1000);
            !options.html && options.template && (() => {
                $("<div>").load(`/${options.template}`, (template, status) => {
                    status == "error" && (reject() || true) ||
                        resolve(template);
                });
            })();
        });
        return (Component) => {
            Vue.component(options.id, {
                template: "<div v-template='{ template: template, data: data }'>loading...</div>",
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
                    var instance = new Component();
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
});
//# sourceMappingURL=index.js.map