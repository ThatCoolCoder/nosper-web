class Evaluator {
    static MathSyntaxError = class extends Error {
        constructor() {
            super('Invalid syntax in expression');
            this.name = 'MathSyntaxError';
        }
    }

    constructor() {
        this.memory = {};
    }

    evaluate(expression) {
        var tokens = this.tokeniseExpression(expression);

        // Wrap whole thing in parenthesis to simplify
        //tokens.unshift(new MathToken(tokenTypes.lParen));
        //tokens.push(new MathToken(tokenTypes.rParen));

        tokens = this.insertImplicitMultSigns(tokens);

        if (! this.syntaxValid(tokens)) {
            throw Evaluator.MathSyntaxError();
        }

        // If there's one token then just skip it
        if (tokens.length == 1) {
            return this.tryReadVar(tokens[0]);
        }

        // While the expression is not fully resolved:
        while (tokens.length > 1) {
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
        }
    
        return tokens[0].value
    }
    
    tokeniseExpression(expression) {
        var tokens = [];
    
        for (var charIdx = 0; charIdx < expression.length;) {
            var crntChar = expression[charIdx];
    
            if (crntChar == '+') {
                tokens.push(new MathToken(tokenTypes.plus));
                charIdx ++;
            }
            else if (crntChar == '-') {
                tokens.push(new MathToken(tokenTypes.minus));
                charIdx ++;
            }
            else if (crntChar == '/') {
                tokens.push(new MathToken(tokenTypes.div));
                charIdx ++;
            }
            else if (crntChar == '^') {
                tokens.push(new MathToken(tokenTypes.power));
                charIdx ++;
            }
            else if (crntChar == '*') {
                // If these two chars == '**', then it's power and not mult
                if (expression[charIdx + 1] == '*') {
                    tokens.push(new MathToken(tokenTypes.power));
                    charIdx += 2;
                }
                else {
                    tokens.push(new MathToken(tokenTypes.mult));
                    charIdx ++;
                }
            }
            else if (crntChar == '(') {
                tokens.push(new MathToken(tokenTypes.lParen));
                charIdx ++;
            }
            else if (crntChar == ')') {
                tokens.push(new MathToken(tokenTypes.rParen));
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
                tokens.push(new MathToken(tokenTypes.number, Number(numberVal)));
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
                tokens.push(new MathToken(tokenTypes.number, value));
            }
            else if (crntChar == '=') {
                tokens.push(new MathToken(tokenTypes.assign));
                charIdx ++;
            }
            else if (wrk.str.lowerAlphabet.includes(crntChar.toLowerCase())) {
                tokens.push(new MathToken(tokenTypes.var, crntChar));
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
            if (tokens[i].type == tokenTypes.number &&
                tokens[i + 1].type == tokenTypes.number)
                newTokens.push(new MathToken(tokenTypes.mult));
        }
        // Add the last token, which was omitted in the loop
        newTokens.push(tokens[tokens.length - 1]);
        return newTokens;
    }

    syntaxValid(tokens) {
        // Current rudimentary syntax checker (or is it called a grammar checker?)
        // Check that the tokens follow a pattern:
        // <number> <operator or bracket> <number> <operator or bracket>
        // And check that the amount of open brackets is the amount of close brackets

        var lastTokenWasNumber = tokens[0].type == tokenTypes.number;
        var nestingLevel = 0;
        var valid = true;
        for (var i = 1; i < tokens.length; i ++) {
            var thisTokenIsNumber = tokens[i].type == tokenTypes.number;
            // Tokens must alternate between being number and not being number!
            if (lastTokenWasNumber == thisTokenIsNumber) {
                valid = false;
                break;
            }
            if (tokens[i].type == tokenTypes.lParen) nestingLevel += 1;
            if (tokens[i].type == tokenTypes.rParen) nestingLevel -= 1;
            lastTokenWasNumber = thisTokenIsNumber;
        }
        if (nestingLevel != 0) valid = false;

        return valid;
    }

    tryReadVar(token) {
        // If the token is a number, then return that
        // If the token is a var, return the val of that var

        if (token.type == tokenTypes.number) return token.value;
        else return this.memory[token.value] || 0;
    }

    evaluateOperator(operatorToken, token1, token2) {
        var newNumberVal = 0;
        if (operatorToken.type == tokenTypes.plus) {
            newNumberVal = this.tryReadVar(token1) + this.tryReadVar(token2);
        }
        else if (operatorToken.type == tokenTypes.minus) {
            newNumberVal = this.tryReadVar(token1) - this.tryReadVar(token2);
        }
        else if (operatorToken.type == tokenTypes.mult) {
            newNumberVal = this.tryReadVar(token1) * this.tryReadVar(token2);
        }
        else if (operatorToken.type == tokenTypes.div) {
            newNumberVal = this.tryReadVar(token1) / this.tryReadVar(token2);
        }
        else if (operatorToken.type == tokenTypes.power) {
            newNumberVal = this.tryReadVar(token1) ** this.tryReadVar(token2);
        }
        else if (operatorToken.type == tokenTypes.assign) {
            this.memory[token1.value] = token2.value;
            newNumberVal = token2.value;
        }
        return new MathToken(tokenTypes.number, newNumberVal);
    }

    findHighestIndent(tokens) {
        var highestIndentStart = 0;
        var highestIndentEnd = tokens.length;
        var highestIndentAmount = 0;
        var crntIndentAmount = 0;
        tokens.forEach((token, idx) => {
            if (token.type == tokenTypes.lParen)  {
                crntIndentAmount ++;
            }
            else if (token.type == tokenTypes.rParen) {
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
                    if (tokens[i].type == tokenTypes.rParen) {
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
            var thisTokenPrecedence = operatorPrecedence[token.type];
            if (thisTokenPrecedence != undefined &&
                thisTokenPrecedence > highestOperatorPrecedence) {
                highestOperatorPrecedence = thisTokenPrecedence;
                highestPrecedenceIdx = idx;
            }
        });
        return highestPrecedenceIdx + highestIndentData.start;
    }
}

const tokenTypes = {
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

const operatorPrecedence = {}
operatorPrecedence[tokenTypes.assign] = 0;
operatorPrecedence[tokenTypes.plus] = 1;
operatorPrecedence[tokenTypes.minus] = 1;
operatorPrecedence[tokenTypes.mult] = 2;
operatorPrecedence[tokenTypes.div] = 2;
operatorPrecedence[tokenTypes.power] = 3;

class MathToken {
    constructor(type, value='') {
        this.type = type;
        this.value = value;
    }
}