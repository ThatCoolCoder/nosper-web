const BinaryOperator = {
    [TokenSubType.ADD]: (a, b, ctx) => a.evaluate(ctx) + b.evaluate(ctx),
    [TokenSubType.SUBTRACT]: (a, b, ctx) => a.evaluate(ctx) - b.evaluate(ctx),
    [TokenSubType.MULTIPLY]: (a, b, ctx) => a.evaluate(ctx) * b.evaluate(ctx),
    [TokenSubType.DIVIDE]: (a, b, ctx) => a.evaluate(ctx) / b.evaluate(ctx),
    [TokenSubType.EXPONENTIATE]: (a, b, ctx) => a.evaluate(ctx) ** b.evaluate(ctx),
    [TokenSubType.ASSIGN]: (a, b, ctx) => {
        var bValue = b.evaluate(ctx);
        ctx.setVariable(a.value, bValue);
        return bValue;
    },
    [TokenSubType.FUNCTION_ASSIGN]: (a, b, ctx) => {
        ctx.setFunction('hello', b);
        return 0;
    }
}

const UnaryOperator = {
    // Trig:
    [TokenSubType.NEGATE]: a => -a,
    [TokenSubType.SINE]: (a, ctx) => Math.sin(convertToRadians(a.evaluate(ctx), ctx.useRadians)),
    [TokenSubType.ARC_SINE]: (a, ctx) => Math.asin(convertToRadians(a.evaluate(ctx), ctx.useRadians)),
    [TokenSubType.COSINE]: (a, ctx) => Math.cos(convertToRadians(a.evaluate(ctx), ctx.useRadians)),
    [TokenSubType.ARC_COSINE]: (a, ctx) => Math.acos(convertToRadians(a.evaluate(ctx), ctx.useRadians)),
    [TokenSubType.TANGENT]: (a, ctx) => Math.tan(convertToRadians(a.evaluate(ctx), ctx.useRadians)),
    [TokenSubType.ARC_TANGENT]: (a, ctx) => Math.atan(convertToRadians(a.evaluate(ctx), ctx.useRadians)),

    // Not trig
    [TokenSubType.SQUARE_ROOT]: a => Math.sqrt(a.evaluate(ctx)),
    [TokenSubType.CUBE_ROOT]: a => Math.cbrt(a.evaluate(ctx)),
}

function convertToRadians(angle, isRadians) {
    // convert an angle to radians, regardless of whether it's radians or degrees
    if (isRadians) return angle;
    else return spnr.radians(angle)
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
        return BinaryOperator[this.operator](this.left, this.right, evaluationContext);
    }
}

class UnaryOperatorNode extends SyntaxTreeNode {
    constructor(right, operator) {
        super();
        this.right = right;
        this.operator = operator;
    }

    evaluate(evaluationContext) {
        return UnaryOperator[this.operator](this.right, evaluationContext);
    }
}

class FunctionCallNode extends SyntaxTreeNode {
    constructor(name) {
        super();
        this.name = name;
    }

    evaluate(evaluationContext) {
        return evaluationContext.getFunction(this.name).evaluate(evaluationContext);
    }
}