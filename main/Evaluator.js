class Evaluator {
    static MathSyntaxError = class extends Error {
        constructor() {
            super('Invalid syntax in expression');
            this.name = 'MathSyntaxError';
        }
    }

    static tokenTypes = {
        // Non-operators
        number : 'number',
        lParen : 'lParen',
        rParen : 'rParen',
        var : 'var', // as in a token representing a variable
    
        // Operators
        plus : 'plus',
        minus : 'minus',
        mult : 'mult',
        div : 'div',
        power : 'power',
        assign : 'assign'
    }
    
    static operatorPrecedence = {
        [this.tokenTypes.assign] : 0,
        [this.tokenTypes.plus] : 1,
        [this.tokenTypes.minus] : 1,
        [this.tokenTypes.mult] : 2,
        [this.tokenTypes.div] : 2,
        [this.tokenTypes.power] : 3
    };
    
    static MathToken = class {
        constructor(type, value='') {
            this.type = type;
            this.value = value;
        }
    }

    // A token of type <key in dict> must be followed by type <value of key>
    static validGrammar = {
        // Not operators
        [this.tokenTypes.number] : [
            this.tokenTypes.plus, this.tokenTypes.minus,
            this.tokenTypes.mult, this.tokenTypes.div,
            this.tokenTypes.power, this.tokenTypes.rParen
        ],
        [this.tokenTypes.lParen] : [
            this.tokenTypes.number, this.tokenTypes.var
        ],
        [this.tokenTypes.rParen] : [
            this.tokenTypes.plus, this.tokenTypes.minus,
            this.tokenTypes.mult, this.tokenTypes.div,
            this.tokenTypes.power
        ],
        [this.tokenTypes.var] : [
            this.tokenTypes.plus, this.tokenTypes.minus,
            this.tokenTypes.mult, this.tokenTypes.div,
            this.tokenTypes.power, this.tokenTypes.assign
        ],

        // Operators

        [this.tokenTypes.plus] : [
            this.tokenTypes.number, this.tokenTypes.var,
            this.tokenTypes.lParen
        ],
        [this.tokenTypes.minus] : [
            this.tokenTypes.number, this.tokenTypes.var,
            this.tokenTypes.lParen
        ],
        [this.tokenTypes.mult] : [
            this.tokenTypes.number, this.tokenTypes.var,
            this.tokenTypes.lParen
        ],
        [this.tokenTypes.div] : [
            this.tokenTypes.number, this.tokenTypes.var,
            this.tokenTypes.lParen
        ],
        [this.tokenTypes.power] : [
            this.tokenTypes.number, this.tokenTypes.var,
            this.tokenTypes.lParen
        ],
        [this.tokenTypes.assign] : [
            this.tokenTypes.number, this.tokenTypes.var,
            this.tokenTypes.lParen
        ]
    }

    constructor() {
        this.memory = {};
    }

    evaluate(expression) {
        var tokens = this.tokeniseExpression(expression);

        tokens = this.insertImplicitMultSigns(tokens);

        console.log(tokens);

        if (! this.syntaxValid(tokens)) {
            throw new Evaluator.MathSyntaxError();
        }

        // Wrap whole thing in parenthesis to simplify
        tokens.unshift(new Evaluator.MathToken(Evaluator.tokenTypes.lParen));
        tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.rParen));

        var maxIterations = 5;
        var safetyCounter = 0;

        // While the expression is not fully resolved:
        while (tokens.length > 3 && safetyCounter < maxIterations) {

            // Find which bit to work out first
            var targetOperationIdx = 
                this.findHighestPrecedenceOperationIdx(tokens);
            
            // Work that out
            var operatorToken = tokens[targetOperationIdx];
            var token1 = tokens[targetOperationIdx - 1];
            var token2 = tokens[targetOperationIdx + 1];
            var result = this.evaluateOperator(operatorToken, token1, token2);
            
            // Put the result in the tokens
            tokens.splice(targetOperationIdx - 1, 3, result);
            safetyCounter += 1;
        }
    
        return this.tryReadVar(tokens[1]);
    }
    
    tokeniseExpression(expression) {
        var tokens = [];
    
        for (var charIdx = 0; charIdx < expression.length;) {
            var crntChar = expression[charIdx];
    
            if (crntChar == '+') {
                tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.plus));
                charIdx ++;
            }
            else if (crntChar == '-') {
                tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.minus));
                charIdx ++;
            }
            else if (crntChar == '/') {
                tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.div));
                charIdx ++;
            }
            else if (crntChar == '^') {
                tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.power));
                charIdx ++;
            }
            else if (crntChar == '*') {
                // If these two chars == '**', then it's power and not mult
                if (expression[charIdx + 1] == '*') {
                    tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.power));
                    charIdx += 2;
                }
                else {
                    tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.mult));
                    charIdx ++;
                }
            }
            else if (crntChar == '(') {
                tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.lParen));
                charIdx ++;
            }
            else if (crntChar == ')') {
                tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.rParen));
                charIdx ++;
            }
            else if (wrk.str.digits.includes(crntChar)) {
                // If it's a digit, continue reading a number until we reach the end
                var numberVal = '';
                while (wrk.str.digits.includes(crntChar) ||
                    crntChar == '.') {
                    numberVal += crntChar;
                    charIdx ++;
                    crntChar = expression[charIdx];
                }
                tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.number, Number(numberVal)));
            }
            else if (crntChar.toLowerCase() == 'e') {
                // Try to read number like 6 * e10
                var numberVal = '';
                while (wrk.str.digits.includes(crntChar) ||
                    crntChar == '.') {
                    numberVal += crntChar;
                    charIdx ++;
                    crntChar = expression[charIdx];
                }
                var value = 10 ** Number(numberVal).
                tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.number, value));
            }
            else if (crntChar == '=') {
                tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.assign));
                charIdx ++;
            }
            else if (wrk.str.lowerAlphabet.includes(crntChar.toLowerCase())) {
                tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.var, crntChar));
                charIdx ++;
            }
            else {
                charIdx ++;
            }
        }
    
        return tokens;
    }

    insertImplicitMultSigns(tokens) {
        var newTokens = [];
        // Loop through all tokens but the last one,
        // and if this token is number and the next token is number
        // then add a multiplication sign
        for (var i = 0; i < tokens.length - 1; i ++) {
            newTokens.push(tokens[i]);
            var crntTokenIsNumber = (tokens[i].type == Evaluator.tokenTypes.number ||
                tokens[i].type == Evaluator.tokenTypes.var);
            var nextTokenIsNumber = (tokens[i + 1].type == Evaluator.tokenTypes.number ||
                tokens[i + 1].type == Evaluator.tokenTypes.var);
            if (crntTokenIsNumber && nextTokenIsNumber)
                newTokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.mult));
        }
        // Add the last token, which was omitted in the loop
        newTokens.push(tokens[tokens.length - 1]);
        return newTokens;
    }

    syntaxValid(tokens) {
        // Check that each token in the tokens
        // Is followed by a valid other token

        if (tokens[0].type == 'lParen') var nestingLevel = 1;
        else if (tokens[0].type == 'rParen') return false;
        else var nestingLevel = 0;

        var valid = true;
        for (var i = 1; i < tokens.length; i ++) {
            var prevToken = tokens[i - 1];
            var crntToken = tokens[i];

            if (crntToken.type == Evaluator.tokenTypes.lParen) nestingLevel += 1;
            if (crntToken.type == Evaluator.tokenTypes.rParen) nestingLevel -= 1;

            var validTokens = Evaluator.validGrammar[prevToken.type];
            if (! validTokens.includes(crntToken.type)) {
                valid = false;
                break;
            }
        }
        if (nestingLevel != 0) valid = false;

        return valid;
    }

    tryReadVar(token) {
        // If the token is a number, then return that
        // If the token is a var, return the val of that var

        if (token.type == Evaluator.tokenTypes.number) return token.value;
        else return this.memory[token.value] || 0;
    }

    evaluateOperator(operatorToken, token1, token2) {
        var newNumberVal = 0;
        if (operatorToken.type == Evaluator.tokenTypes.plus) {
            newNumberVal = this.tryReadVar(token1) + this.tryReadVar(token2);
        }
        else if (operatorToken.type == Evaluator.tokenTypes.minus) {
            newNumberVal = this.tryReadVar(token1) - this.tryReadVar(token2);
        }
        else if (operatorToken.type == Evaluator.tokenTypes.mult) {
            newNumberVal = this.tryReadVar(token1) * this.tryReadVar(token2);
        }
        else if (operatorToken.type == Evaluator.tokenTypes.div) {
            newNumberVal = this.tryReadVar(token1) / this.tryReadVar(token2);
        }
        else if (operatorToken.type == Evaluator.tokenTypes.power) {
            newNumberVal = this.tryReadVar(token1) ** this.tryReadVar(token2);
        }
        else if (operatorToken.type == Evaluator.tokenTypes.assign) {
            this.memory[token1.value] = token2.value;
            newNumberVal = token2.value;
        }
        return new Evaluator.MathToken(Evaluator.tokenTypes.number, newNumberVal);
    }

    removeEmptyParenthesis(tokens) {
        var newTokens = [];
        for (var i = 0; i < tokens.length; i ++) {
            if (tokens[i].type == Evaluator.tokenTypes.lParen &&
                tokens[i + 1].type == Evaluator.tokenTypes.rParen) {
                i ++; // If iyt's the start of empty paren, do nothing and skip next token
            }
            else {
                newTokens.push(tokens[i]);
            }
        }
        return newTokens;
    }

    findHighestIndent(tokens) {
        var highestIndentStart = 0;
        var highestIndentEnd = tokens.length;
        var highestIndentAmount = 0;
        var crntIndentAmount = 0;
        tokens.forEach((token, idx) => {
            if (token.type == Evaluator.tokenTypes.lParen)  {
                crntIndentAmount ++;
            }
            else if (token.type == Evaluator.tokenTypes.rParen) {
                crntIndentAmount --;
            }

            // If this is the highest, indent:
            if (crntIndentAmount > highestIndentAmount) {
                // Save the start and amount
                highestIndentAmount = crntIndentAmount;
                highestIndentStart = idx;
                // And find where the next close bracket is
                // This part will be off for the less-indented sections,
                // But will be correct for the highest-indented, and that's what matters
                highestIndentEnd = highestIndentStart + 1;
                for (var i = highestIndentStart; i < tokens.length; i ++) {
                    if (tokens[i].type == Evaluator.tokenTypes.rParen) {
                        highestIndentEnd = i;
                        break;
                    }
                }
            }
        });
        return {start : highestIndentStart, end : highestIndentEnd}
    }

    findHighestPrecedenceOperationIdx(tokens) {
        var highestIndentData = this.findHighestIndent(tokens);
        var highestIndentSection = tokens.slice(highestIndentData.start,
            highestIndentData.end);
        
        var highestOperatorPrecedence = -1;
        var highestPrecedenceIdx = null;
        highestIndentSection.forEach((token, idx) => {
            var thisTokenPrecedence = Evaluator.operatorPrecedence[token.type];
            if (thisTokenPrecedence != undefined &&
                thisTokenPrecedence > highestOperatorPrecedence) {
                highestOperatorPrecedence = thisTokenPrecedence;
                highestPrecedenceIdx = idx;
            }
        });
        return highestPrecedenceIdx + highestIndentData.start;
    }
}