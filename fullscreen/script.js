const mainInput = spnr.dom.id('mainInput');
const errorOutput = spnr.dom.id('errorOutput');
const degreesCheckbox = spnr.dom.id('degreesCheckbox');

const evaluator = new Evaluator();
const inputHistory = new InputHistory();
inputHistory.load(() => {
    inputHistory.pastEnd()
});

function calculate() {
    var expression = mainInput.value;
    if (expression == '') return;
    inputHistory.push(expression);
    inputHistory.toEnd();
    inputHistory.save();

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
    if (event.code == 'Enter') {
        calculate();
    }
    else if (event.code == 'ArrowUp') {
        event.preventDefault();
        inputHistory.previous();
        mainInput.value = inputHistory.crntCommand;
    }
    else if (event.code == 'ArrowDown') {
        event.preventDefault();
        if (mainInput.value != '') {
            inputHistory.next();
            mainInput.value = inputHistory.crntCommand;
        }
    }
})

function openHelp() {
    var newURL = chrome.runtime.getURL('documentation/index.html');
    chrome.tabs.create({ url: newURL });
}

spnr.dom.id('helpButton').addEventListener('click', openHelp);
spnr.dom.id('evaluateButton')?.addEventListener('click', calculate);