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
    ARC_SINE: 8,
    COSINE: 9,
    ARC_COSINE: 10,
    TANGENT: 11,
    ARC_TANGENT: 12,

    // value
    LITERAL: 13,
    VARIABLE: 14,

    // paren
    L_PAREN: 15,
    R_PAREN: 16
}

// Higher precedence = evaluated first
const OperatorPrecedence = {
    [TokenSubType.ASSIGN]: 0,
    [TokenSubType.ADD]: 1,
    [TokenSubType.SUBTRACT]: 1,
    [TokenSubType.MULTIPLY]: 2,
    [TokenSubType.DIVIDE]: 2,
    [TokenSubType.EXPONENTIATE]: 3,

    [TokenSubType.SINE]: 4,
    [TokenSubType.ARC_SINE]: 4,
    [TokenSubType.COSINE]: 4,
    [TokenSubType.ARC_COSINE]: 4,
    [TokenSubType.TANGENT]: 4,
    [TokenSubType.ARC_TANGENT]: 4

}

class Token {
    constructor(type, subType, value) {
        this.type = type;
        this.subType = subType;
        this.value = value;
        this.extraPrecedence = 0;
    }
}