class EvaluationContext {
    constructor() {
        this.variables = {
            pi: spnr.PI,
            e: spnr.E
        };
        this.functions = {};
        this.useRadians = true;
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
    
    functionIsDefined(functionName) {
        return this.functions[functionName] != undefined;
    }

    getFunction(functionName) {
        return this.functions[functionName];
    }

    setFunction(functionName, value) {
        this.functions[functionName] = value;
    }
}