(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "node_modules/jquery/dist/jquery", "node_modules/vue/dist/vue"], factory);
    }
})(function (require, exports) {
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
});
//# sourceMappingURL=index.js.map