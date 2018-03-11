var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let Test = class Test {
    constructor() {
        this.message = 'Yo !';
    }
    pop2() { return "coco " + this.message; }
};
Test = __decorate([
    Vue.Component({
        id: "vue-comp-test",
        html: "<div>message = {{ message }} et pop = {{ pop }} <input v-model='message'></div>",
        computed: (test) => {
            return {
                pop: () => test.pop2()
            };
        }
    }),
    __metadata("design:paramtypes", [])
], Test);
$("#app").append(new Vue({
    el: $("<div is='vue-comp-test'></div>")[0]
}).$el);
//# sourceMappingURL=test.js.map