import { spnr } from "../common/spnr.mjs";
import { Evaluator } from "../common/nosper-engine/src/Evaluator.mjs";
import { AutoStorer } from "../common/Storer.mjs";
import { ExpressionInput } from "../common/ExpressionInput.mjs";
import { InputHistory } from "../common/InputHistory.mjs";

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