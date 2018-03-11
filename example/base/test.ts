declare let Vue, $;

@Vue.Component({
    id: "vue-comp-test",
    html: "<div>message = {{ message }} et pop = {{ pop }} <input v-model='message'></div>",
    computed: (test: Test) => {
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

$("#app").append(new Vue({
    el: $("<div is='vue-comp-test'></div>")[0]
}).$el);