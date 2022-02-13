const TokenType = {
    BINARY_OPERATOR: 0,
    UNARY_OPERATOR: 1,
    VALUE: 2,
    PAREN: 3,
    FUNCTION_CALL: 4,
    SEPARATOR: 5
}

const TokenSubType = {
    OTHER: -1,

    // binary operator
    ADD: 0,
    SUBTRACT: 1,
    MULTIPLY: 2,
    DIVIDE: 3,
    MODULO: 4,
    EXPONENTIATE: 5,
    ASSIGN: 6,
    FUNCTION_ASSIGN: 7,

    // unary operator: trig
    NEGATE: 8,
    SINE: 9,
    ARC_SINE: 10,
    COSINE: 11,
    ARC_COSINE: 12,
    TANGENT: 13,
    ARC_TANGENT: 14,
    // unary operator: not trig
    SQUARE_ROOT: 15,
    CUBE_ROOT: 16,
    ABSOLUTE_VALUE: 17,
    LOGARITHM: 18,
    NATURAL_LOGARITHM: 19,
    ROUND: 20,
    FLOOR: 21,
    CEILING: 22,

    // value
    LITERAL: 23,
    VARIABLE: 24,

    // paren
    L_PAREN: 25,
    R_PAREN: 26,

    // (function call has no subtypes)

    // separator
    ARGUMENT_SEPARATOR: 24
}

// Higher precedence = evaluated first
const OperatorPrecedence = {
    [TokenSubType.ASSIGN]: 0,
    [TokenSubType.FUNCTION_ASSIGN]: 0,
    [TokenSubType.ADD]: 1,
    [TokenSubType.SUBTRACT]: 1,
    [TokenSubType.MULTIPLY]: 2,
    [TokenSubType.DIVIDE]: 2,
    [TokenSubType.MODULO]: 2,
    [TokenSubType.EXPONENTIATE]: 3,

    [TokenSubType.SINE]: 4,
    [TokenSubType.ARC_SINE]: 4,
    [TokenSubType.COSINE]: 4,
    [TokenSubType.ARC_COSINE]: 4,
    [TokenSubType.TANGENT]: 4,
    [TokenSubType.ARC_TANGENT]: 4,
    [TokenSubType.SQUARE_ROOT]: 4,
    [TokenSubType.CUBE_ROOT]: 4,
    [TokenSubType.ABSOLUTE_VALUE]: 4,
    [TokenSubType.LOGARITHM]: 4,
    [TokenSubType.NATURAL_LOGARITHM]: 4,
    [TokenSubType.ROUND]: 4,
    [TokenSubType.FLOOR]: 4,
    [TokenSubType.CEILING]: 4,

}

class Token {
    constructor(type, subType, value) {
        this.type = type;
        this.subType = subType;
        this.value = value;
        this.extraPrecedence = 0;
    }
}