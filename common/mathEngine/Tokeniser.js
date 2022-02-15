// Requires:
// - Token.js

class Tokeniser {
    // Class to tokenise string

    alphabet = spnr.str.lowerAlphabet.concat(spnr.str.upperAlphabet);

    // A purposefully incomplete table designed to make some lookups easier
    StringToTokenSubType = {
        // Binary operator
        '+': TokenSubType.ADD,
        '-': TokenSubType.SUBTRACT,
        '*': TokenSubType.MULTIPLY,
        '/': TokenSubType.DIVIDE,
        '%': TokenSubType.MODULO,
        '**': TokenSubType.EXPONENTIATE,
        '^': TokenSubType.EXPONENTIATE,
        // Binary operator: assign
        '=': TokenSubType.ASSIGN,
        '=>': TokenSubType.FUNCTION_ASSIGN,

        // Unary operator: trigonometry
        'sin': TokenSubType.SINE,
        'asin': TokenSubType.ARC_SINE,
        'cos': TokenSubType.COSINE,
        'acos': TokenSubType.ARC_COSINE,
        'tan': TokenSubType.TANGENT,
        'atan': TokenSubType.ARC_TANGENT,
        'log': TokenSubType.LOGARITHM,
        'ln': TokenSubType.NATURAL_LOGARITHM,
        'round': TokenSubType.ROUND,
        'floor': TokenSubType.FLOOR,
        'ceil': TokenSubType.CEILING,

        // Unary operator: not trigonometry
        'sqrt': TokenSubType.SQUARE_ROOT,
        'q': TokenSubType.SQUARE_ROOT,
        'cbrt': TokenSubType.CUBE_ROOT,
        'c': TokenSubType.CUBE_ROOT,

        // Value
        // <none>

        // Paren
        '(': TokenSubType.L_PAREN,
        ')': TokenSubType.R_PAREN
    }

    tokeniseExpression(expression) {
        this.charIdx = 0;
        this.crntChar = expression[0]
        this.expression = expression;
        var tokens = [];

        while (this.charIdx < expression.length) {
            if (this.nextCharsEqualToAny(['+', '-', '/', '%', '^', '=>', '=']) != null) {
                var text = this.nextCharsEqualToAny(['+', '-', '/', '%', '^', '=>', '=']);
                tokens.push(new Token(TokenType.BINARY_OPERATOR,
                    this.StringToTokenSubType[text], text));
                this.next(text.length);
            }
            else if (this.crntChar == '*') {
                if (this.nextCharsEqualTo('**')) {
                    tokens.push(new Token(TokenType.BINARY_OPERATOR, TokenSubType.EXPONENTIATE, '**'));
                    this.next(2);
                }
                else {
                    tokens.push(new Token(TokenType.BINARY_OPERATOR, TokenSubType.MULTIPLY, '*'));
                    this.next();
                }
            }
            else if (['(', ')'].includes(this.crntChar)) {
                tokens.push(new Token(TokenType.PAREN, this.StringToTokenSubType[this.crntChar], this.crntChar));
                this.next();
            }
            else if (this.crntChar == ',') {
                tokens.push(new Token(TokenType.SEPARATOR, TokenSubType.ARGUMENT_SEPARATOR, this.crntChar));
                this.next();
            }
            else if (spnr.str.digits.includes(this.crntChar)) {
                tokens.push(new Token(TokenType.VALUE, TokenSubType.LITERAL, Number(this.readNumber())));
                
                // Convert a subtraction operation into a negation operation in some cases
                if (tokens.length >= 2) {
                    var secondPrevious = tokens[tokens.length - 3];
                    var secondPreviousIsOperator = false;
                    if (secondPrevious == undefined) secondPreviousIsOperator = true;
                    else {
                        secondPreviousIsOperator = (secondPrevious.type == TokenType.UNARY_OPERATOR ||
                            secondPrevious.type == TokenType.BINARY_OPERATOR);
                    }
                    var previous = tokens[tokens.length - 2];
                    if (secondPreviousIsOperator && previous.subType == TokenSubType.SUBTRACT) {
                        previous.type = TokenType.UNARY_OPERATOR;
                        previous.subType = TokenSubType.NEGATE;
                    }
                }
            }
            else if (this.nextCharsEqualToAny(['sin', 'asin', 'cos', 'acos', 'tan', 'atan', 'round', 'floor', 'ceil', 'sqrt', 'q', 'cbrt', 'c', 'abs', 'log', 'ln', ]) != null) {
                var text = this.nextCharsEqualToAny(['sin', 'asin', 'cos', 'acos', 'tan', 'atan', 'round', 'floor', 'ceil', 'sqrt', 'q', 'cbrt', 'c', 'abs', 'log', 'ln']);
                tokens.push(new Token(TokenType.UNARY_OPERATOR, this.StringToTokenSubType[text], text));
                this.next(text.length);
            }
            else if (this.crntChar == '$') {
                this.next();
                tokens.push(new Token(TokenType.VALUE, TokenSubType.VARIABLE, this.readString()));
            }
            else if (this.crntChar == '&') {
                this.next();
                tokens.push(new Token(TokenType.FUNCTION_CALL, TokenSubType.OTHER, this.readString()));
            }
            else if (this.crntChar.toLowerCase() == 'e' && spnr.str.digits.includes(this.peekNext())) {
                // Try to read number like  E6  (10^6)
                this.next();
                var value = 10 ** Number(this.readNumber());
                tokens.push(new Token(TokenType.VALUE, TokenSubType.LITERAL, value));
            }
            else {
                this.next();
            }
        }

        return tokens;
    }

    next(amount = 1) {
        this.charIdx += amount;
        this.crntChar = this.expression[this.charIdx];
    }

    peekNext(amount = 1) {
        return this.expression[this.charIdx + amount];
    }

    previous(amount = 1) {
        this.charIdx -= amount;
        this.crntChar = this.expression[this.charIdx];
    }

    peekPrevious(amount = 1) {
        return this.expression[this.charIdx + amount];
    }

    readNumber() {
        var numberVal = '';
        var periodCount = 0;
        while ((spnr.str.digits.includes(this.crntChar) || this.crntChar == '.') && periodCount < 2) {
            numberVal += this.crntChar;
            this.next();
        }
        return numberVal;
    }

    readString() {
        var stringVal = '';
        while (this.alphabet.includes(this.crntChar)) {
            stringVal += this.crntChar;
            this.next();
        }
        return stringVal;
    }

    nextCharsEqualTo(targetValue) {
        return this.expression.slice(this.charIdx, this.charIdx + targetValue.length) == targetValue;
    }

    nextCharsEqualToAny(targetValues) {
        for (var value of targetValues) {
            if (this.nextCharsEqualTo(value)) return value;
        }
        return null;
    }
}