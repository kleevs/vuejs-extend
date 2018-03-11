import * as $ from 'node_modules/jquery/dist/jquery';
import * as Vue from 'node_modules/vue/dist/vue';
export * from 'node_modules/vue/dist/vue';

Vue.Component = <T>(options: {
    id: string,
    template?: string,
    html?: string,
    computed?: (ctx: T) => {[s:string]: any}
}) => {
    var html = new Promise((resolve, reject) => {
        options.html && setTimeout(() => resolve(options.html), 1000);
        !options.html && options.template && (() => {
            $("<div>").load(`/${options.template}`, (template, status) => { 
                status == "error" && (reject() || true) ||
                resolve(template) 
            });
        })();
    });

    return (Component: () => T) => {
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
                var instance = new (<any>Component)();
                var data = { 
                    template: undefined,
                    data: { 
                        data: instance,
                        computed: options.computed(instance)
                    }
                };
                html.then(template => data.template = template)
                return data; 
            }
        });
    }
}