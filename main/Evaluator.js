class Evaluator {
    static MathSyntaxError = class extends Error {
        constructor() {
            super('Invalid syntax in expression');
            this.name = 'MathSyntaxError';
        }
    }

    // A purposefully incomplete table designed to make some lookups easier
    static StringToTokenSubType = {
        // Binary operator
        '+': TokenSubType.ADD,
        '-': TokenSubType.SUBTRACT,
        '*': TokenSubType.MULTIPLY,
        '/': TokenSubType.DIVIDE,
        '**': TokenSubType.EXPONENTIATE,
        '^': TokenSubType.EXPONENTIATE,
        '=': TokenSubType.ASSIGN,

        // Unary operator
        'sin': TokenSubType.SINE,
        'cos': TokenSubType.COSINE,
        'tan': TokenSubType.TANGENT,

        // Value
        // <none?

        // Paren
        '(': TokenSubType.L_PAREN,
        ')': TokenSubType.R_PAREN
    }

    constructor() {
        this.evaulationContext = new EvaluationContext();
    }

    evaluate(expression) {
        var tokens = this.tokeniseExpression(expression);

        console.log(tokens);

        var syntaxTree = this.buildSyntaxTree(tokens);
        console.log(syntaxTree);

        // var syntaxTree = this.buildSyntaxTree(tokens);
        // var result = syntaxTree.evaluate(this.evaluateOperator.bind(this));
        return syntaxTree.evaluate(this.evaulationContext);
    }

    tokeniseExpression(expression) {
        var tokens = [];

        for (var charIdx = 0; charIdx < expression.length;) {
            var crntChar = expression[charIdx];

            if (['+', '-', '/', '^', '='].includes(crntChar)) {
                tokens.push(new Token(TokenType.BINARY_OPERATOR, Evaluator.StringToTokenSubType[crntChar], crntChar));
                charIdx++;
            }
            else if (crntChar == '*') {
                // If these two chars == '**', then it's power and not mult
                if (expression[charIdx + 1] == '*') {
                    tokens.push(new Token(TokenType.BINARY_OPERATOR, TokenSubType.EXPONENTIATE, '**'));
                    charIdx += 2;
                }
                else {
                    tokens.push(new Token(TokenType.BINARY_OPERATOR, TokenSubType.MULTIPLY, '*'));
                    charIdx++;
                }
            }
            else if (['(', ')'].includes(crntChar)) {
                tokens.push(new Token(TokenType.PAREN, Evaluator.StringToTokenSubType[crntChar], crntChar));
                charIdx++;
            }
            else if (wrk.str.digits.includes(crntChar)) {
                // If it's a digit, continue reading a number until we reach the end
                var numberVal = '';
                while (wrk.str.digits.includes(crntChar) ||
                    crntChar == '.') {
                    numberVal += crntChar;
                    charIdx++;
                    crntChar = expression[charIdx];
                }
                tokens.push(new Token(TokenType.VALUE, TokenSubType.OTHER, Number(numberVal)));
            }
            else if (crntChar.toLowerCase() == 'e') {
                // Try to read number like 6 * e10
                var numberVal = '';
                charIdx++;
                crntChar = expression[charIdx];
                while (wrk.str.digits.includes(crntChar) ||
                    crntChar == '.') {
                    numberVal += crntChar;
                    charIdx++;
                    crntChar = expression[charIdx];
                }
                var value = 10 ** Number(numberVal);
                tokens.push(new Token(TokenType.VALUE, TokenSubType.OTHER, value));
            }
            else if (wrk.str.lowerAlphabet.includes(crntChar.toLowerCase())) {
                tokens.push(new Token(TokenType.VALUE, TokenSubType.OTHER, crntChar));
                charIdx++;
            }
            else {
                charIdx++;
            }
        }

        return tokens;
    }

    buildSyntaxTree(tokens, iterations = 0) {
        if (tokens.length == 1) return new ValueNode(tokens[0].value);
        var index = this.findLowestPrecedenceOperator(tokens);
        var left = tokens.slice(0, index);
        var right = tokens.slice(index + 1);
        if (iterations > 1000) return;
        return new BinaryOperatorNode(this.buildSyntaxTree(left, iterations + 1), this.buildSyntaxTree(right, iterations + 1), tokens[index].subType);
    }

    findLowestPrecedenceOperator(tokens) {
        var lowestPrecedence = Infinity;
        var lowestPrecedenceIndex = -1;
        var index = 0;
        for (var token of tokens) {
            if (token.subType in OperatorPrecedence) {
                if (OperatorPrecedence[token.subType] < lowestPrecedence) {
                    lowestPrecedence = OperatorPrecedence[token.subType];
                    lowestPrecedenceIndex = index;
                }
            }
            index++;
        }
        return lowestPrecedenceIndex;
    }
}