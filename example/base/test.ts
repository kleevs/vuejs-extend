import { Component, config, start } from 'dist/vue.extend';
declare let $;

@Component<Test>({
    name: "vue-comp-test",
    html: "<div>message = {{ message }} et pop = {{ pop }} <input v-model='message'></div>",
    computed: (test) => {
        return {
            pop: () => test.pop2()
        };
    }
})
class Test {
    constructor() {
        this.message = 'Yo !';
    }

    private message: string;
   
    pop2() { return "coco " + this.message; }
}

start("#app", Test);