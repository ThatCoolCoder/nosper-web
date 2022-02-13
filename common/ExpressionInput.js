/**
 * Input for math expressions with features like input history and evaluate on enter press.
 * @class
 */
class ExpressionInput {
    /**
     * 
     * @param {string|HTMLInputElement} elementOrId - id of element or an element. Element must have a `.value`. 
     * @param {CallableFunction} onExpressionEntered [o] - callback run with expression as 1st parameter when enter is pressed
     * @param {InputHistory} inputHistory [o] - object to link this to history
     */
    constructor(elementOrId, onExpressionEntered=null, inputHistory=null) {
        this.element = typeof (elementOrId) == "string" ? spnr.dom.id(elementOrId) : elementOrId;
        this.onExpressionEntered = onExpressionEntered;
        this.inputHistory = inputHistory;

        this.element.addEventListener('keydown', event => {
            if (event.code == 'Enter' && this.onExpressionEntered != null) {
                this.onExpressionEntered(this.element.value);
            }
            if (this.inputHistory != null) {
                if (event.code == 'ArrowUp') {
                    event.preventDefault();
                    inputHistory.previous();
                    this.element.value = inputHistory.crntCommand;
                }
                else if (event.code == 'ArrowDown') {
                    event.preventDefault();
                    if (this.element.value != '') {
                        inputHistory.next();
                        this.element.value = inputHistory.crntCommand;
                    }
                }
            }
        })
    }
    
    get value() {
        return this.element.value;
    }
}