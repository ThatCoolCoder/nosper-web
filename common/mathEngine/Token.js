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

    // unary operator: trig
    NEGATE: 6,
    SINE: 7,
    ARC_SINE: 8,
    COSINE: 9,
    ARC_COSINE: 10,
    TANGENT: 11,
    ARC_TANGENT: 12,
    // unary operator: not trig
    SQUARE_ROOT: 13,
    CUBE_ROOT: 14,

    // value
    LITERAL: 15,
    VARIABLE: 16,

    // paren
    L_PAREN: 17,
    R_PAREN: 18
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
    [TokenSubType.ARC_TANGENT]: 4,
    [TokenSubType.SQUARE_ROOT]: 4,
    [TokenSubType.CUBE_ROOT]: 4

}

class Token {
    constructor(type, subType, value) {
        this.type = type;
        this.subType = subType;
        this.value = value;
        this.extraPrecedence = 0;
    }
}