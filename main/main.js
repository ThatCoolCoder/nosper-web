const mainInput = wrk.dom.id('mainInput');

const evaluator = new Evaluator();

function calculate() {
    var expression = mainInput.value;
    try {
        var result = evaluator.evaluate(expression);
    }
    catch (err) {
        console.log(err);
        if (err instanceof Evaluator.MathSyntaxError) {
            var result = 'Syntax error in equation';
        }
        else {
            var result = 'Unknown error computing equation';
        }
    }
    mainInput.value = result;
}

mainInput.addEventListener('keydown', event => {
    if (event.keyCode == 13) {
        calculate();
    }
})