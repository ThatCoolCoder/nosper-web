const mainInput = spnr.dom.id('mainInput');
const errorOutput = spnr.dom.id('errorOutput');
const degreesCheckbox = spnr.dom.id('degreesCheckbox');

const evaluator = new Evaluator();

function calculate() {
    var expression = mainInput.value;
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

mainInput.addEventListener('keydown', event => {
    if (event.keyCode == 13) {
        calculate();
    }
})

function openHelp() {
    var newURL = chrome.runtime.getURL('documentation/index.html');
    chrome.tabs.create({ url: newURL });
}

spnr.dom.id('helpButton').addEventListener('click', openHelp);
spnr.dom.id('evaluateButton')?.addEventListener('click', calculate);