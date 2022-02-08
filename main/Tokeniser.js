class Tokeniser {
    // Class to tokenise string

    // A purposefully incomplete table designed to make some lookups easier
    StringToTokenSubType = {
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
        'asin': TokenSubType.ARC_SINE,
        'cos': TokenSubType.COSINE,
        'acos': TokenSubType.ARC_COSINE,
        'tan': TokenSubType.TANGENT,
        'atan': TokenSubType.ARC_TANGENT,

        // Value
        // <none?

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
            if (['+', '-', '/', '^', '='].includes(this.crntChar)) {
                tokens.push(new Token(TokenType.BINARY_OPERATOR, this.StringToTokenSubType[this.crntChar], this.crntChar));
                this.next()
            }
            else if (this.crntChar == '*') {
                // If these two chars == '**', then it's power and not mult
                if (this.nextCharsEqualTo('**')) {
                    tokens.push(new Token(TokenType.BINARY_OPERATOR, TokenSubType.EXPONENTIATE, '**'));
                    this.next(2);
                }
                else {
                    tokens.push(new Token(TokenType.BINARY_OPERATOR, TokenSubType.MULTIPLY, '*'));
                    this.next()
                }
            }
            else if (['(', ')'].includes(this.crntChar)) {
                tokens.push(new Token(TokenType.PAREN, this.StringToTokenSubType[this.crntChar], this.crntChar));
                this.next()
            }
            else if (wrk.str.digits.includes(this.crntChar)) {
                // If it's a digit, continue reading a number until we reach the end
                tokens.push(new Token(TokenType.VALUE, TokenSubType.OTHER, Number(this.readNumber())));
            }
            else if (this.nextCharsEqualToAny(['sin', 'asin', 'cos', 'acos', 'tan', 'atan']) != null) {
                var text = this.nextCharsEqualToAny(['sin', 'asin', 'cos', 'acos', 'tan', 'atan']);
                tokens.push(new Token(TokenType.UNARY_OPERATOR, this.StringToTokenSubType[text], text));
                this.next(text.length);
            }
            else if (this.crntChar.toLowerCase() == 'e') {
                // Try to read number like 6 * e10 (minus the 6 bit)
                this.next();
                var value = 10 ** Number(this.readNumber());
                tokens.push(new Token(TokenType.VALUE, TokenSubType.OTHER, value));
            }
            else if (wrk.str.lowerAlphabet.includes(this.crntChar.toLowerCase())) {
                tokens.push(new Token(TokenType.VALUE, TokenSubType.OTHER, this.crntChar));
                this.next();
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

    previous(amount = 1) {
        this.charIdx -= amount;
        this.crntChar = this.expression[this.charIdx];
    }

    readNumber() {
        var numberVal = '';
        var periodCount = 0;
        while ((wrk.str.digits.includes(this.crntChar) || this.crntChar == '.') && periodCount < 2) {
            numberVal += this.crntChar;
            this.next();
        }
        return numberVal;
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