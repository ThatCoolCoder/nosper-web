class Evaluator {
    // Entry class. Create one and use it to evaluate math equations

    static MathSyntaxError = class extends Error {
        constructor() {
            super('Invalid syntax in expression');
            this.name = 'MathSyntaxError';
        }
    }

    constructor() {
        this.context = new EvaluationContext();
        this.tokeniser = new Tokeniser();
    }

    evaluate(expression) {
        var tokens = this.tokeniser.tokeniseExpression(expression);
        var syntaxTree = this.buildSyntaxTree(tokens);
        return syntaxTree.evaluate(this.context);
    }


    buildSyntaxTree(tokens) {
        // If there is only 1 token left then 
        if (tokens.length == 1) {
            if (tokens[0].type == TokenType.VALUE) return new ValueNode(tokens[0].value);
            else if (tokens[0].type == TokenType.FUNCTION_CALL) return new FunctionCallNode(tokens[0].value, []);
        }

        // If there are brackets, eliminate the brackets.
        // So to get around brackets existing, what we do is apply extra precedence to the operators inside brackets,
        // proportional to the depth of the brackets.
        // Then we can remove the brackets and nobody will even notice
        if (this.containsBrackets(tokens)) {
            // Get start/end of most bracketed section
            var [startIdx, endIdx, nestingLevel] = this.getNestingInfo(tokens);
            var bracketedTokens = tokens.slice(startIdx + 1, endIdx - 1);
            var precedenceIncrement = spnr.obj.keys(OperatorPrecedence).length;
            for (var token of bracketedTokens) {
                token.extraPrecedence = nestingLevel * precedenceIncrement;
            }
            var left = tokens.slice(0, startIdx);
            var right = tokens.slice(endIdx);
            return this.buildSyntaxTree(left.concat(bracketedTokens).concat(right));
        }
        // Find lowest precedence operator, extract it into a node, repeat for lhs and rhs
        else {
            var index = this.findLowestPrecedenceOperator(tokens);
            var left = tokens.slice(0, index);
            var right = tokens.slice(index + 1);
            if (tokens[index].type == TokenType.BINARY_OPERATOR)
                return new BinaryOperatorNode(this.buildSyntaxTree(left), this.buildSyntaxTree(right), tokens[index].subType);
            else if (tokens[index].type == TokenType.UNARY_OPERATOR)
                return new UnaryOperatorNode(this.buildSyntaxTree(right), tokens[index].subType);
        }
    }

    containsBrackets(tokens) {
        for (var token of tokens) {
            if ([TokenSubType.L_PAREN, TokenSubType.R_PAREN].includes(token.subType)) return true;
        }
        return false;
    }

    getNestingInfo(tokens) {
        var crntNestingLevel = 0;
        var highestNestingLevel = 0;
        var highestNestStart = -1;
        var highestNestEnd = -1;
        var index = 0;
        for (var token of tokens) {
            if (token.subType == TokenSubType.L_PAREN) {
                crntNestingLevel++;
                if (crntNestingLevel >= highestNestingLevel) {
                    highestNestingLevel = crntNestingLevel;
                    highestNestStart = index;
                }
            }
            if (token.subType == TokenSubType.R_PAREN) {
                if (crntNestingLevel == highestNestingLevel) {
                    highestNestEnd = index + 1;
                }
                crntNestingLevel--;
            }
            index++;
        }
        return [highestNestStart, highestNestEnd, highestNestingLevel];
    }

    findLowestPrecedenceOperator(tokens) {
        var lowestPrecedence = Infinity;
        var lowestPrecedenceIndex = -1;
        var index = 0;
        for (var token of tokens) {
            if (token.subType in OperatorPrecedence) {
                if (OperatorPrecedence[token.subType] + token.extraPrecedence < lowestPrecedence) {
                    lowestPrecedence = OperatorPrecedence[token.subType] + token.extraPrecedence;
                    lowestPrecedenceIndex = index;
                }
            }
            index++;
        }
        return lowestPrecedenceIndex;
    }
}