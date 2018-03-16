import * as Vue from 'node_modules/vue/dist/vue';
export { Vue };
export declare let config: (options: {
    load?: (src: string) => Promise<string>;
    loadingTemplate?: string;
}) => void;
export declare let Component: <T>(options: {
    name: string;
    template?: string;
    html?: string;
    computed?: (ctx: T) => {
        [s: string]: any;
    };
}) => (Component: Function & {
    prototype: T;
}) => void;
export declare function start(element: any, name: any): void;
