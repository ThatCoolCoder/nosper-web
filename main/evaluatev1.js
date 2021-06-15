var operations = {
    '+' : (a, b) => {return a + b},
    '-' : (a, b) => {return a - b},
    '*' : (a, b) => {return a * b},
    '/' : (a, b) => {return a / b},
    '^' : (a, b) => {return a ** b},
    'sin' : (a, b) => {return wrk.sin(b)},
    'cos' : (a, b) => {return wrk.cos(b)},
    'tan' : (a, b) => {return wrk.tan(b)}
}

// Higher == more precedence
var operationPrecedences = {
    '+' : 1,
    '-' : 1,
    '*' : 2,
    '/' : 2,
    '^' : 3,
    'sin' : 4,
    'cos' : 4,
    'tan' : 4
}

function removeFromString(string, startIndex, endIndex) {
    return string.substr(0, startIndex) + string.substr(endIndex);
}

/**
* @author Vitim.us https://gist.github.com/victornpb/7736865
* @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
* @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
*/
function occurrences(string, subString, allowOverlapping) {
    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

function insertIntoString(string, insertStr, idx) {
    // Insert insertStr so that the first char is at idx

    var part1 = string.substr(0, idx);
    var part2 = string.substr(idx);
    return part1 + insertStr + part2;
}

function insertIntoArray(arr, insertItem, idx) {
    // Insert insertItem so that it is at idx
    // modify arr

    arr.splice(idx, 0, insertItem);
}

function evaluate(expression) {
    if (containsBrackets(expression)) {
        var bracketedSectionIndicies = indiciesOfDeepestBrackets(expression);
        var [startIndex, endIndex] = bracketedSectionIndicies;
        var length = endIndex - startIndex;
        
        // Remove brackets from around it
        var bracketContents = expression.substr(startIndex + 1, length - 2);
        
        var evaledBracketedSection = String(evaluate(bracketContents));

        // Replace the bracketed section from the equation with its result and...
        // ...continue the recursive solving
        var expressionMinusBracketedSection = removeFromString(expression, startIndex, endIndex);
        return evaluate(insertIntoString(expressionMinusBracketedSection, evaledBracketedSection, startIndex));

    }

    else if (numOperationsInExpression(expression) == 1) {
        // If there is just one operation, then do it

        var operation = null
        // Try and find an operation and split at it
        for (crntOperation of Object.keys(operations)) {
            if (expression.includes(crntOperation)) {
                operation = crntOperation;
                break;
            }
        };

        // Don't bother about checking if operation is null as there is certainly an operation in there
        var sections = expression.split(operation);
        console.log(operation, sections)
        return operations[operation](Number(sections[0]), Number(sections[1]));
    }

    else if (numOperationsInExpression(expression) > 1) {
        // put brackets around the highest precedence operation
        // and then evaluate the expression

        var highestPrecedenceOperation = findHighestPrecedenceOperation(expression);

        var sections = splitAtOperations2(expression);

        console.log(sections)
        var index = sections.indexOf(highestPrecedenceOperation);
        // Insert a closing bracket first so we don't mess up indexes
        insertIntoArray(sections, ')', index + 2);
        insertIntoArray(sections, '(', index - 1);

        console.log(sections)

        var bracketedExpression = sections.join('');

        // return the evaled expression
        return evaluate(bracketedExpression);
    }

    else {
        // If there are no operations, then we are done!

        return expression;
    }
}

function containsBrackets(expression) {
    return expression.includes('(') && expression.includes(')');
}

function containsOperation(expression) {
    var operationFound = false;
    for (crntOperation of wrk.obj.keys(operations)) {
        if (expression.includes(crntOperation)) {
            operationFound = true;
            break;
        }
    };
    return operationFound;
}

function numOperationsInExpression(expression) {
    var count = 0;
    for (crntOperation of wrk.obj.keys(operations)) {
        count += occurrences(expression, crntOperation);
    };
    return count;
}

function findHighestPrecedenceOperation(expression) {
    var highestPrecedence = 0;
    var highestPrecedenceOperation = null;
    wrk.obj.keys(operations).forEach(operation => {
        if (expression.includes(operation) &&
            operationPrecedences[operation] > highestPrecedence) {
            highestPrecedence = operationPrecedences[operation];
            highestPrecedenceOperation = operation;
        }
    });
    return highestPrecedenceOperation;
}

function splitAtOperations(expression) {
    // What we do here is:
    // 1. replace all operations with a special splitter char
    // 2. split at the splitter char

    var splitterChar = '|'; // who is honestly going to use pipe in an expression?

    wrk.obj.keys(operations).forEach(operation => {
        expression = wrk.str.replaceAll(expression, operation, splitterChar);
    });

    return expression.split(splitterChar);
}

function splitAtOperations2(expression) {
    // This works, but only for single-char operations

    var crntSection = '';
    var sections = [];
    var operationList = wrk.obj.keys(operations);

    for (var i = 0; i < expression.length; i ++) {
        var crntChar = expression[i];
        console.log('crntchar=' + crntChar)
        if (operationList.includes(crntChar)) {
            if (crntSection.length > 0) {
                sections.push(crntSection);
            }
            sections.push(crntChar);
            crntSection = '';
        }
        else {
            crntSection += crntChar;
        }
    }
    if (crntSection.length > 0) {
        sections.push(crntSection);
    }

    return sections;
}

function splitAtOperations3(expression) {

}

function indiciesOfDeepestBrackets(expression) {
    // https://stackoverflow.com/a/54555898/12650706

    var startIndex;
    var endIndex;
    
    var max = 0;
    var count = 0;
    var last = null;
    
    [...expression].forEach((c, i) => {
        if (c === '(') {
            last = i;
            count++;
            return;
        }
        if (c === ')') {
            if (count > max) {
                startIndex = last;
                endIndex = i + 1;
                max = count;
            }
            count--;
        }
    });

    return [startIndex, endIndex];
}