import * as $ from 'node_modules/jquery/dist/jquery';
import * as Vue from 'node_modules/vue/dist/vue';
export { Vue };

let load = (str) => new Promise<string>((resolve, reject) => {
    $("<div>").load(`/${str.replace(/^\//i, '')}`, (template, status) => { 
        status == "error" && (reject() || true) ||
        resolve(template) 
    });
});
let template = "loading...";
let create = <T>(type: Function & { prototype: T }): T => new (<any>type)();
let components: { component: any, name: string }[];
let getComponent = <T>(type: Function & { prototype: T }) => components.filter((c) => c.component instanceof type || c.component === type)[0];

export let config = (options: {
    load?: (src: string) => Promise<string>,
    loadingTemplate?: string
}) => {
    load = options.load || load;
    template = options.loadingTemplate || template;
}

export let Component = Vue.Component = <T>(options: {
    name?: string,
    template?: string,
    html?: string,
    computed?: (ctx: T) => {[s:string]: any}
}) => {
    var html = options.html && new Promise((resolve) => options.html && resolve(options.html)) || 
        options.template && load(options.template);
    var name = options.name || `vue-extend-name-${new Date().getTime()}-${Math.random()}`;

    return (Component: Function & { prototype: T }) => {
        components.push({
            component: Component,
            name: name
        });

        Vue.component(name, {
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
                html.then(template => data.template = template)
                return data; 
            }
        });
    }
}

export function start(element, name) {
    var isString = typeof (name) !== "string";
    name = (isString && getComponent(name) || { name: isString && name || '' }).name;
    $(element).append(new Vue({
        el: $(`<div is='${name}'></div>`)[0]
    }).$el);
}