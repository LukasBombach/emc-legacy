export default class Collection {

    constructor(descriptor) {
        this.descriptor = descriptor;
    }

    onItemChange() {
        return []; // rxjs, oder besser mobx (esp. zum rumprobieren)
    }
}