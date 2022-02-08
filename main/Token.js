const TokenType = {
    BINARY_OPERATOR: 0,
    UNARY_OPERATOR: 1,
    VALUE: 2,
    PAREN: 3,
}

const TokenSubType = {
    OTHER: -1,

    // binary operator
    ADD: 0,
    SUBTRACT: 1,
    MULTIPLY: 2,
    DIVIDE: 3,
    EXPONENTIATE: 4,
    ASSIGN: 5,

    // unary operator
    NEGATE: 6,
    SINE: 7,
    COSINE: 8,
    TANGENT: 9,

    // value
    // there are no subtypes for value because it's impossible to determine until runtime if a value is a valid variable until runtime

    // paren
    L_PAREN: 12,
    R_PAREN: 13
}

// Higher precedence = evaluated first
const OperatorPrecedence = {
    [TokenSubType.ASSIGN]: -1,
    [TokenSubType.ADD]: 0,
    [TokenSubType.SUBTRACT]: 0,
    [TokenSubType.MULTIPLY]: 1,
    [TokenSubType.DIVIDE]: 1,
    [TokenSubType.EXPONENTIATE]: 2,

    [TokenSubType.SINE]: 3,
    [TokenSubType.COSINE]: 3,
    [TokenSubType.TANGENT]: 3

}

class Token {
    constructor(type, subType, value) {
        this.type = type;
        this.subType = subType;
        this.value = value;
        this.extraPrecedence = 0;
    }
}