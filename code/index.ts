import * as $ from 'node_modules/jquery/dist/jquery';
import * as Vue from 'node_modules/vue/dist/vue';
export * from 'node_modules/vue/dist/vue';

let registeredView: any[] = [];

Vue.Component = <T>(options: {
    id: string,
    template?: string,
    html?: string,
    computed?: {[s:string]: any}
}) => {
    var html = new Promise((resolve, reject) => {
        options.html && resolve(options.html);
        !options.html && options.template && (() => {
            $("<div>").load(`/${options.template}`, (template, status) => { 
                status == "error" && (reject() || true) ||
                resolve(template) 
            });
        })();
    });

    return (Component: () => T) => {
        var computed = {};
        for (var key in options.computed) {
            ((key) => {
                computed[key] = options.computed[key] instanceof Function ? 
                    function() { return options.computed[key].apply(this._data, arguments); } :
                    (() => {
                        var descriptor: {set?, get? } = {};
                        descriptor.set = options.computed[key].set && function() { return options.computed[key].set.apply(this._data, arguments); };
                        descriptor.get = options.computed[key].get && function() { return options.computed[key].get.apply(this._data, arguments); };
                        return descriptor;
                    })()
            })(key); 
        }

        registeredView.push({
            id: html.then(template => { 
                Vue.component(options.id, {
                    template: template,
                    data: () => new (<any>Component)(),
                    computed: computed
                });
                
                return options.id;
            })
        });
    }
}