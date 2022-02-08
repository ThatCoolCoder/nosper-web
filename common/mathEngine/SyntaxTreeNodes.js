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
    [TokenSubType.ARC_SINE]: a => Math.asin(a),
    [TokenSubType.COSINE]: a => Math.cos(a),
    [TokenSubType.ARC_COSINE]: a => Math.acos(a),
    [TokenSubType.TANGENT]: a => Math.tan(a),
    [TokenSubType.ARC_TANGENT]: a => Math.atan(a),
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
        else return this.value;
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
        return BinaryOperator[this.operator](this.left.evaluate(evaluationContext), this.right.evaluate(evaluationContext), evaluationContext);
    }
}

class UnaryOperatorNode extends SyntaxTreeNode {
    constructor(right, operator) {
        super();
        this.right = right;
        this.operator = operator;
    }

    evaluate(evaluationContext) {
        return UnaryOperator[this.operator](this.right.evaluate(evaluationContext), evaluationContext);
    }
}

// can have operator
//  - as part of logic in base node
//  - in supernodes
//  - in external table of functions