// Requires:
// - Token.js

const BinaryOperator = {
    [TokenSubType.ADD]: (a, b, ctx) => a.evaluate(ctx) + b.evaluate(ctx),
    [TokenSubType.SUBTRACT]: (a, b, ctx) => a.evaluate(ctx) - b.evaluate(ctx),
    [TokenSubType.MULTIPLY]: (a, b, ctx) => a.evaluate(ctx) * b.evaluate(ctx),
    [TokenSubType.DIVIDE]: (a, b, ctx) => a.evaluate(ctx) / b.evaluate(ctx),
    [TokenSubType.MODULO]: (a, b, ctx) => a.evaluate(ctx) % b.evaluate(ctx),
    [TokenSubType.EXPONENTIATE]: (a, b, ctx) => a.evaluate(ctx) ** b.evaluate(ctx),
    [TokenSubType.ASSIGN]: (a, b, ctx) => {
        var bValue = b.evaluate(ctx);
        ctx.variables.set(a.value, bValue);
        return bValue;
    },
    [TokenSubType.FUNCTION_ASSIGN]: (a, b, ctx) => {
        ctx.functions.set(a.value, b);
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
    [TokenSubType.SQUARE_ROOT]: (a, ctx) => Math.sqrt(a.evaluate(ctx)),
    [TokenSubType.CUBE_ROOT]: (a, ctx) => Math.cbrt(a.evaluate(ctx)),
    [TokenSubType.ABSOLUTE_VALUE]: (a, ctx) => Math.abs(a.evaluate(ctx)),
    [TokenSubType.LOGARITHM]: (a, ctx) => Math.log10(a.evaluate(ctx)),
    [TokenSubType.NATURAL_LOGARITHM]: (a, ctx) => Math.log(a.evaluate(ctx)),
    [TokenSubType.ROUND]: (a, ctx) => Math.round(a.evaluate(ctx)),
    [TokenSubType.FLOOR]: (a, ctx) => Math.floor(a.evaluate(ctx)),
    [TokenSubType.CEILING]: (a, ctx) => Math.ceil(a.evaluate(ctx)),
}

function convertToRadians(angle, isRadians) {
    // convert an angle to radians, regardless of whether it's radians or degrees
    if (isRadians) return angle;
    else return spnr.radians(angle)
}

class SyntaxTreeNode {
    evaluate(_context) {
        throw Error("SyntaxTreeNode.evalulate() was not overridden");
    }
}

class ValueNode extends SyntaxTreeNode {
    constructor(value) {
        super();
        this.value = value;
    }

    evaluate(context) {
        if (typeof (this.value) == 'number') return this.value;
        else if (context.variables.isDefined(this.value)) return context.variables.get(this.value);
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

    evaluate(context) {
        return BinaryOperator[this.operator](this.left, this.right, context);
    }
}

class UnaryOperatorNode extends SyntaxTreeNode {
    constructor(right, operator) {
        super();
        this.right = right;
        this.operator = operator;
    }

    evaluate(context) {
        return UnaryOperator[this.operator](this.right, context);
    }
}

class FunctionCallNode extends SyntaxTreeNode {
    constructor(name, args) {
        super();
        this.name = name;
        this.args = args;
    }

    evaluate(context) {
        context.argumentStack.push(this.args.map(arg => {
            arg.evaluate(context);
        }));
        var result = context.functions.get(this.name).evaluate(context);
        console.log(result);
        context.argumentStack.pop();
        return result;
    }
}