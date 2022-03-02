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

        if (this.data.length > 0) this.redraw();

        window.addEventListener('resize', () => {
            this.redraw();
        });

        this.padding = 20;
        this.lineColor = 'red';
        this.lineWidth = 4;
        this.tickColor = 'blue';
        this.tickWidth = 1;
    }

    /**
     * Draw the graph.
     */
    redraw() {
        var canvasSize = spnr.v(this.element.clientWidth, this.element.clientHeight);
        this.element.width = canvasSize.x;
        this.element.height = canvasSize.y;
        var valueBounds = this.determineValueBounds();

        var ctx = this.element.getContext("2d");
        ctx.clearRect(0, 0, this.element.width, this.element.height);

        this.drawData(ctx, valueBounds, canvasSize);
        this.drawScale(ctx,
            spnr.v(this.padding, this.padding),
            spnr.v(this.padding + canvasSize.x, this.padding)); // x scale
        this.drawScale(ctx,
            spnr.v(this.padding, this.padding + canvasSize.y),
            spnr.v(this.padding, this.padding)); // y scale
    }

    determineValueBounds() {
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
        return valueBounds;
    }

    drawData(ctx, valueBounds, canvasSize) {
        ctx.strokeStyle = this.lineColor;
        ctx.lineWidth = this.lineWidth;
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

    drawScale(ctx, startPos, endPos, startValue, endValue) {
        var numTicks = 10;
        var tickLength = 10;
        var displacement = spnr.v.copySub(endPos, startPos);
        var increment = spnr.v.copyDiv(displacement, numTicks);
        console.log(startPos, endPos)
        var tickSize = spnr.v.copy(displacement);
        spnr.v.normalize(tickSize);
        spnr.v.mult(tickSize, tickLength);
        spnr.v.rotate(tickSize, -spnr.PI / 2);

        ctx.strokeStyle = this.tickColor;
        ctx.lineWidth = this.tickWidth;
        ctx.beginPath();
        spnr.doNTimes(numTicks + 1, n => {
            var tickStartPosition = spnr.v.copyAdd(startPos, spnr.v.copyMult(increment, n));
            var tickEndPosition = spnr.v.copyAdd(tickStartPosition, tickSize);
            console.log(tickStartPosition, tickEndPosition);

            ctx.moveTo(tickStartPosition.x, tickStartPosition.y);
            ctx.lineTo(tickEndPosition.x, tickEndPosition.y);
            ctx.stroke();
        })
        ctx.closePath();
    }
}