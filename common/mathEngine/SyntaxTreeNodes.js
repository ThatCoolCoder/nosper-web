const BinaryOperator = {
    [TokenSubType.ADD]: (a, b) => a + b,
    [TokenSubType.SUBTRACT]: (a, b) => a - b,
    [TokenSubType.MULTIPLY]: (a, b) => a * b,
    [TokenSubType.DIVIDE]: (a, b) => a / b,
    [TokenSubType.EXPONENTIATE]: (a, b) => a ** b,
    [TokenSubType.ASSIGN]: (a, b, ctx) => {
        void(0); // assigning needs special access so we put it in a bodge in binary operator
    }
}

const UnaryOperator = {
    // Trig:
    [TokenSubType.NEGATE]: a => -a,
    [TokenSubType.SINE]: (a, ctx) => Math.sin(convertToRadians(a, ctx.useRadians)),
    [TokenSubType.ARC_SINE]: (a, ctx) => Math.asin(convertToRadians(a, ctx.useRadians)),
    [TokenSubType.COSINE]: (a, ctx) => Math.cos(convertToRadians(a, ctx.useRadians)),
    [TokenSubType.ARC_COSINE]: (a, ctx) => Math.acos(convertToRadians(a, ctx.useRadians)),
    [TokenSubType.TANGENT]: (a, ctx) => Math.tan(convertToRadians(a, ctx.useRadians)),
    [TokenSubType.ARC_TANGENT]: (a, ctx) => Math.atan(convertToRadians(a, ctx.useRadians)),

    // Not trig
    [TokenSubType.SQUARE_ROOT]: a => Math.sqrt(a),
    [TokenSubType.CUBE_ROOT]: a => Math.cbrt(a),
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
        // Hack to make assignment work because we need name of variable not content.
        if (this.operator == TokenSubType.ASSIGN) {
            var rightValue = this.right.evaluate(evaluationContext);
            evaluationContext.setVariable(this.left.value, rightValue);
            return rightValue;
        }
        else return BinaryOperator[this.operator](this.left.evaluate(evaluationContext),
                this.right.evaluate(evaluationContext), evaluationContext);
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