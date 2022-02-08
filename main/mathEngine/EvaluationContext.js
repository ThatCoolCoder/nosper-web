class EvaluationContext {
    constructor() {
        this.variables = {};
    }

    variableIsDefined(variableName) {
        return this.variables[variableName] != undefined;
    }

    getVariable(variableName) {
        return this.variables[variableName];
    }

    setVariable(variableName, value) {
        this.variables[variableName] = value;
    }
}