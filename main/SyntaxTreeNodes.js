const BinaryOperator = {
    [TokenSubType.ADD]: (a, b) => a + b,
    [TokenSubType.SUBTRACT]: (a, b) => a - b,
    [TokenSubType.MULTIPLY]: (a, b) => a * b,
    [TokenSubType.DIVIDE]: (a, b) => a / b,
    [TokenSubType.EXPONENTIATE]: (a, b) => a ** b,
    [TokenSubType.ASSIGN]: (a, b, evaluationContext) => {
        evaluationContext.setVariable(a, b);
        return b;
    }
}

const UnaryOperator = {
    [TokenSubType.NEGATE]: a => -a,
    [TokenSubType.SINE]: a => Math.sin(a),
    [TokenSubType.COSINE]: a => Math.cos(a),
    [TokenSubType.TANGENT]: a => Math.tan(a),
}

class SyntaxTreeNode {
    evaluate(_evaluationContext) {
        throw Error("SyntaxTreeNode.evalulate() was not overridden");
    }
}

class ValueNode extends SyntaxTreeNode {
    constructor(value) {
        super();
        this.value = value;
    }

    evaluate(evaluationContext) {
        if (typeof (this.value) == 'number') return this.value;
        else if (evaluationContext.variableIsDefined(this.value)) return evaluationContext.getVariable(this.value);
        // else throw Error("ValueNode.value was not a variable or a number");
    }
}

class BinaryOperatorNode extends SyntaxTreeNode {
    constructor(left, right, operator) {
        super();
        this.left = left;
        this.right = right;
        this.operator = operator;
    }

    evaluate(evaluationContext) {
        console.log(evaluationContext);
        return BinaryOperator[this.operator](this.left.evaluate(evaluationContext), this.right.evaluate(evaluationContext), evaluationContext);
    }
}

class UnaryOperatorNode extends SyntaxTreeNode {
    constructor(left, operator) {
        super();
        this.left = left;
        this.operator = operator;
    }

    evaluate(evaluationContext) {
        return UnaryOperator[this.operator](this.left.evaluate(evaluationContext), evaluationContext);
    }
}

// can have operator
//  - as part of logic in base node
//  - in supernodes
//  - in external table of functions