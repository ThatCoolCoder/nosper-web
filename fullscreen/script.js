const errorOutput = spnr.dom.id('errorOutput');
const degreesCheckbox = spnr.dom.id('degreesCheckbox');

const evaluator = new Evaluator();
const storer = new AutoStorer();
const inputHistory = new InputHistory(storer);
inputHistory.load(() => {
    inputHistory.pastEnd()
});
const expressionInput = new ExpressionInput('mainInput', calculate, inputHistory);

function calculate() {
    var expression = expressionInput.value;
    if (expression == '') return;

    evaluator.context.useRadians = ! degreesCheckbox.checked;

    var error = '';
    try {
        var result = evaluator.evaluate(expression);
        mainInput.value = result;
    }
    catch (err) {
        console.log(err);
        if (err instanceof Evaluator.MathSyntaxError) {
            error = 'Syntax error in expression';
        }
        else {
            error = 'Error evaluating expression';
        }
    }
    errorOutput.innerText = error;
}

function openHelp() {
    if (window.chrome?.runtime?.getURL != undefined) {
        var newURL = chrome.runtime.getURL('documentation/index.html');
        chrome.tabs.create({ url: newURL });
    }
    else {
        window.open('../documentation/index.html', '_blank');
    }
}

spnr.dom.id('helpButton').addEventListener('click', openHelp);
spnr.dom.id('evaluateButton')?.addEventListener('click', calculate);