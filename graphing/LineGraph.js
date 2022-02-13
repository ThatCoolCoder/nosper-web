/**
 * Class using a HTML canvas element to display a line graph
 * @class
 */
class LineGraph {
    /**
     * 
     * @param {HTMLCanvasElement} elementOrId - element to construct the graph in
     * @param {spnr.Vector[]} initialData [o] - initial data to populate the graph with
     */
    constructor(elementOrId, initialData=[]) {
        this.element = typeof (elementOrId) == "string" ? spnr.dom.id(elementOrId) : elementOrId;
        this.data = initialData;

        // this.element = document.getElementById();
        if (this.data.length > 0) this.redraw();

        window.addEventListener('resize', () => {
            this.redraw();
        });

        this.padding = 20;
    }

    /**
     * Draw the graph.
     */
    redraw() {
        var canvasSize = spnr.v(this.element.clientWidth, this.element.clientHeight);

        var xCoords = this.data.map(v => v.x);
        var yCoords = this.data.map(v => v.y);
        var valueBounds = {
            min: {
                x: spnr.min(...xCoords),
                y: spnr.min(...yCoords)
            },
            max: {
                x: spnr.max(...xCoords),
                y: spnr.max(...yCoords)
            }
        };
        // Mapping fails if min == max so slightly nudge them to fix that
        if (valueBounds.min.x == valueBounds.max.x) {
            valueBounds.min.x -= 0.01;
            valueBounds.max.x += 0.01;
        }
        if (valueBounds.min.y == valueBounds.max.y) {
            valueBounds.min.y -= 0.01;
            valueBounds.max.y += 0.01;
        }

        var ctx = this.element.getContext("2d");

        ctx.clearRect(0, 0, this.element.width, this.element.height)
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 4;
        ctx.beginPath();
        for (var point of this.data) {
            ctx.lineTo(
                spnr.mapNum(point.x, valueBounds.min.x, valueBounds.max.x, this.padding, canvasSize.x - this.padding),
                spnr.mapNum(point.y, valueBounds.min.y, valueBounds.max.y, this.padding, canvasSize.y - this.padding),
            )
        }
        ctx.stroke();
        ctx.closePath();
    }
}