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
                this.inputHistory?.push(this.element.value);
                this.inputHistory?.toEnd();
                this.inputHistory?.save();

                this.onExpressionEntered(this.element.value);
            }
            if (event.code == 'ArrowUp' && this.inputHistory != null) {
                event.preventDefault();
                this.inputHistory?.previous();
                this.element.value = this.inputHistory.crntCommand;
            }
            else if (event.code == 'ArrowDown' && this.inputHistory != null) {
                event.preventDefault();
                if (this.element.value != '') {
                    this.inputHistory.next();
                    this.element.value = this.inputHistory.crntCommand;
                }
            }
            else if (this.inputHistory != null) {
                this.inputHistory.pastEnd();
            }
        })
    }
    
    get value() {
        return this.element.value;
    }
}