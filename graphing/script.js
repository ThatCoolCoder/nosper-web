const errorOutput = spnr.dom.id('errorOutput');
const degreesCheckbox = spnr.dom.id('degreesCheckbox');

const evaluator = new Evaluator();
const storer = window.chrome?.sync == undefined ? new LocalStorageStorer() : new ChromeStorageStorer();
const inputHistory = new InputHistory(storer, 'graphing');
inputHistory.load(() => {
    inputHistory.pastEnd();
});
const expressionInput = new ExpressionInput('mainInput', calculate, inputHistory);
const graph = new LineGraph('graph');

function calculate() {
    var expression = expressionInput.value;
    
    var min = -10;
    var max = 10;
    var step = 0.1;
    var currentX = min;
    var results = [];
    
    evaluator.context.useRadians = ! degreesCheckbox.checked;
    while (currentX < max) {
        evaluator.context.variables.set('x', currentX);
        results.push(spnr.v(currentX, evaluator.evaluate(expression)));
        currentX += step;
    }
    graph.data = results;
    graph.redraw();
}

spnr.dom.id('evaluateButton').addEventListener('click', calculate);

function openHelp() {
    var newURL = chrome.runtime.getURL('documentation/index.html');
    chrome.tabs.create({ url: newURL });
}

spnr.dom.id('helpButton').addEventListener('click', openHelp);