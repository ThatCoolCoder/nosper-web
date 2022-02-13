// Requires:
// None

class EvaluationContext {
    constructor() {
        this.variables = new ValueGroup({
            pi: spnr.PI,
            e: spnr.E
        });
        this.functions = new ValueGroup();
        this.useRadians = true;
        this.argumentStack = [];
    }
}

class ValueGroup {
    // Abstraction of a dictionary for storing (potentially scoped) information such as functions and variables

    constructor(initialData={}) {
        this.data = initialData;
    }

    isDefined(valueName) {
        return this.data[valueName] != undefined;
    }

    get(valueName) {
        return this.data[valueName];
    }

    set(valueName, value) {
        this.data[valueName] = value;
    }
}