class Evaluator {
    static MathSyntaxError = class extends Error {
        constructor() {
            super('Invalid syntax in expression');
            this.name = 'MathSyntaxError';
        }
    }

    static tokenTypes = {
        nonOperator : {
            number : 'number',
            lParen : 'lParen',
            rParen : 'rParen',
            var : 'var', // as in a token representing a variable
        },
        operator : {
            plus : 'plus',
            minus : 'minus',
            mult : 'mult',
            div : 'div',
            power : 'power',
            assign : 'assign'
        }
    }
    
    static operatorPrecedence = {
        [this.tokenTypes.operator.assign] : 0,
        [this.tokenTypes.operator.plus] : 1,
        [this.tokenTypes.operator.minus] : 1,
        [this.tokenTypes.operator.mult] : 2,
        [this.tokenTypes.operator.div] : 2,
        [this.tokenTypes.operator.power] : 3
    };
    
    static MathToken = class {
        constructor(type, value='') {
            this.type = type;
            this.value = value;
        }
    }

    static SyntaxTreeNode = class {
        constructor(leftHandToken, operatorToken, rightHandToken) {
            this.leftHandToken = leftHandToken;
            this.operatorToken = operatorToken;
            this.rightHandToken = rightHandToken;
        }

        evaluateChild(child, evaluateFunc) {
            if (child instanceof Evaluator.SyntaxTreeNode) {
                return child.evaluate(evaluateFunc);
            }
            else {
                return child;
            }
        }

        evaluate(evaluateFunc) {
            // First substitute
            var leftHandToken = this.evaluateChild(this.leftHandToken, evaluateFunc);
            var rightHandToken = this.evaluateChild(this.rightHandToken, evaluateFunc);

            return evaluateFunc(leftHandToken, this.operatorToken, rightHandToken);
        }
    }

    // A token of type <key in dict> must be followed by type <value of key>
    static validGrammar = {
        // Not operators
        [this.tokenTypes.nonOperator.number] : [
            this.tokenTypes.operator.plus, this.tokenTypes.operator.minus,
            this.tokenTypes.operator.mult, this.tokenTypes.operator.div,
            this.tokenTypes.operator.power, this.tokenTypes.nonOperator.rParen
        ],
        [this.tokenTypes.nonOperator.lParen] : [
            this.tokenTypes.nonOperator.number, this.tokenTypes.nonOperator.var
        ],
        [this.tokenTypes.nonOperator.rParen] : [
            this.tokenTypes.operator.plus, this.tokenTypes.operator.minus,
            this.tokenTypes.operator.mult, this.tokenTypes.operator.div,
            this.tokenTypes.operator.power
        ],
        [this.tokenTypes.nonOperator.var] : [
            this.tokenTypes.operator.plus, this.tokenTypes.operator.minus,
            this.tokenTypes.operator.mult, this.tokenTypes.operator.div,
            this.tokenTypes.operator.power, this.tokenTypes.operator.assign
        ],

        // Operators
        [this.tokenTypes.operator.plus] : [
            this.tokenTypes.nonOperator.number, this.tokenTypes.nonOperator.var,
            this.tokenTypes.nonOperator.lParen
        ],
        [this.tokenTypes.operator.minus] : [
            this.tokenTypes.nonOperator.number, this.tokenTypes.nonOperator.var,
            this.tokenTypes.nonOperator.lParen
        ],
        [this.tokenTypes.operator.mult] : [
            this.tokenTypes.nonOperator.number, this.tokenTypes.nonOperator.var,
            this.tokenTypes.nonOperator.lParen
        ],
        [this.tokenTypes.operator.div] : [
            this.tokenTypes.nonOperator.number, this.tokenTypes.nonOperator.var,
            this.tokenTypes.nonOperator.lParen
        ],
        [this.tokenTypes.operator.power] : [
            this.tokenTypes.nonOperator.number, this.tokenTypes.nonOperator.var,
            this.tokenTypes.nonOperator.lParen
        ],
        [this.tokenTypes.operator.assign] : [
            this.tokenTypes.nonOperator.number, this.tokenTypes.nonOperator.var,
            this.tokenTypes.nonOperator.lParen
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

        var syntaxTree = this.buildSyntaxTree(tokens);
        var result = syntaxTree.evaluate(this.evaluateOperator.bind(this));
        console.log(result);
        return this.tryReadVar(result);
    }
    
    tokeniseExpression(expression) {
        var tokens = [];
    
        for (var charIdx = 0; charIdx < expression.length;) {
            var crntChar = expression[charIdx];
    
            if (crntChar == '+') {
                tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.operator.plus));
                charIdx ++;
            }
            else if (crntChar == '-') {
                tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.operator.minus));
                charIdx ++;
            }
            else if (crntChar == '/') {
                tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.operator.div));
                charIdx ++;
            }
            else if (crntChar == '^') {
                tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.operator.power));
                charIdx ++;
            }
            else if (crntChar == '*') {
                // If these two chars == '**', then it's power and not mult
                if (expression[charIdx + 1] == '*') {
                    tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.operator.power));
                    charIdx += 2;
                }
                else {
                    tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.operator.mult));
                    charIdx ++;
                }
            }
            else if (crntChar == '(') {
                tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.nonOperator.lParen));
                charIdx ++;
            }
            else if (crntChar == ')') {
                tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.nonOperator.rParen));
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
                tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.nonOperator.number, Number(numberVal)));
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
                tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.nonOperator.number, value));
            }
            else if (crntChar == '=') {
                tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.assign));
                charIdx ++;
            }
            else if (wrk.str.lowerAlphabet.includes(crntChar.toLowerCase())) {
                tokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.nonOperator.var, crntChar));
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
            var crntTokenIsNumber = (tokens[i].type == Evaluator.tokenTypes.nonOperator.number ||
                tokens[i].type == Evaluator.tokenTypes.nonOperator.var);
            var nextTokenIsNumber = (tokens[i + 1].type == Evaluator.tokenTypes.nonOperator.number ||
                tokens[i + 1].type == Evaluator.tokenTypes.nonOperator.var);
            if (crntTokenIsNumber && nextTokenIsNumber)
                newTokens.push(new Evaluator.MathToken(Evaluator.tokenTypes.operator.mult));
        }
        // Add the last token, which was omitted in the loop
        newTokens.push(tokens[tokens.length - 1]);
        return newTokens;
    }

    syntaxValid(tokens) {
        // Check that each token in the tokens
        // Is followed by a valid other token

        if (tokens[0].type == Evaluator.tokenTypes.nonOperator.lParen) var nestingLevel = 1;
        else if (tokens[0].type == Evaluator.tokenTypes.nonOperator.rParen) return false;
        else var nestingLevel = 0;

        var valid = true;
        for (var i = 1; i < tokens.length; i ++) {
            var prevToken = tokens[i - 1];
            var crntToken = tokens[i];

            if (crntToken.type == Evaluator.tokenTypes.nonOperator.lParen) nestingLevel += 1;
            if (crntToken.type == Evaluator.tokenTypes.nonOperator.rParen) nestingLevel -= 1;

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

        if (token.type == Evaluator.tokenTypes.nonOperator.number) return token.value;
        else return this.memory[token.value] || 0;
    }

    buildSyntaxTree(tokens) {
        // This is a somewhat naive function that currently ignores brackets
        
        var lastOperatorPrecedence = 0;

        var tokenIdx = 0;
        var operatorTokenTypes = wrk.obj.values(Evaluator.tokenTypes.operator);

        function goToNextOperator() {
            do {
                tokenIdx ++;
                if (tokenIdx >= tokens.length - 1) break;
            } while (! operatorTokenTypes.includes(tokens[tokenIdx].type));
            return tokens[tokenIdx];
        }

        var lastOperator = goToNextOperator();
        while (tokenIdx < tokens.length) {
            var crntOperator = goToNextOperator();
            if (tokenIdx >= tokens.length - 1) break;
            
        }
    }

    evaluateOperator(token1, operatorToken, token2) {
        var newNumberVal = 0;
        if (operatorToken.type == Evaluator.tokenTypes.operator.plus) {
            newNumberVal = this.tryReadVar(token1) + this.tryReadVar(token2);
        }
        else if (operatorToken.type == Evaluator.tokenTypes.operator.minus) {
            newNumberVal = this.tryReadVar(token1) - this.tryReadVar(token2);
        }
        else if (operatorToken.type == Evaluator.tokenTypes.operator.mult) {
            newNumberVal = this.tryReadVar(token1) * this.tryReadVar(token2);
        }
        else if (operatorToken.type == Evaluator.tokenTypes.operator.div) {
            newNumberVal = this.tryReadVar(token1) / this.tryReadVar(token2);
        }
        else if (operatorToken.type == Evaluator.tokenTypes.operator.power) {
            newNumberVal = this.tryReadVar(token1) ** this.tryReadVar(token2);
        }
        else if (operatorToken.type == Evaluator.tokenTypes.operator.assign) {
            this.memory[token1.value] = token2.value;
            newNumberVal = token2.value;
        }
        return new Evaluator.MathToken(Evaluator.tokenTypes.nonOperator.number, newNumberVal);
    }

    removeEmptyParenthesis(tokens) {
        var newTokens = [];
        for (var i = 0; i < tokens.length; i ++) {
            if (tokens[i].type == Evaluator.tokenTypes.nonOperator.lParen &&
                tokens[i + 1].type == Evaluator.tokenTypes.nonOperator.rParen) {
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
            if (token.type == Evaluator.tokenTypes.nonOperator.lParen)  {
                crntIndentAmount ++;
            }
            else if (token.type == Evaluator.tokenTypes.nonOperator.rParen) {
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
                    if (tokens[i].type == Evaluator.tokenTypes.nonOperator.rParen) {
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