const mainInput = spnr.dom.id('mainInput');
const errorOutput = spnr.dom.id('errorOutput');

const evaluator = new Evaluator();

function calculate() {
    var expression = mainInput.value;
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