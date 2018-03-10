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
});
//# sourceMappingURL=index.js.map