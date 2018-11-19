import { Plot, PlotBounds } from "./plot";
import { Complex, ComplexFunction } from "./complex";

const bounds = PlotBounds.fromBounds(-10, 10, -10, 10);
const canvasSize = 500;

const f: ComplexFunction = c => c.exponent(2);

export function main() {
    const drawPlot = new Plot(bounds, canvasSize, canvasSize);
    document.body.appendChild(drawPlot.canvas);

    const complexBounds = calculateComplexBounds(f, bounds);

    const complexPlot = new Plot(complexBounds, canvasSize, canvasSize);
    document.body.appendChild(complexPlot.canvas);

    let down = false;

    drawPlot.canvas.addEventListener("mousedown", function(event) { 
      down = true;
    });
    
    drawPlot.canvas.addEventListener("mouseup", function(event) {
        down = false;
    });

    drawPlot.canvas.addEventListener("mousemove", function(event) {
        if (down) {
            const canvasX = event.pageX;
            const canvasY = drawPlot.canvas.height - event.pageY;

            const x = bounds.xMin + (canvasX / drawPlot.canvas.width) * bounds.xRange;
            const y = bounds.yMin + (canvasY / drawPlot.canvas.height) * bounds.yRange;

            drawPlot.addPoint(x, y);

            const c = f(Complex.fromRectangular(x, y));

            complexPlot.addPoint(c.re, c.im);
        }
    });
}

function calculateComplexBounds(complexFunction: ComplexFunction, bounds: PlotBounds, pointsToSample: number = 100): PlotBounds {
    const minImage = f(Complex.fromRectangular(bounds.xMin, bounds.yMin));
    const maxImage = f(Complex.fromRectangular(bounds.xMax, bounds.yMax));

    let xMin = minImage.re;
    let xMax = maxImage.re;
    let yMin = minImage.im;
    let yMax = maxImage.im;

    const xStep = bounds.xRange / pointsToSample;
    const yStep = bounds.yRange / pointsToSample;

    for (let x = bounds.xMin; x < bounds.xMax; x += xStep) {
        for (let y = bounds.yMin; y < bounds.yMax; y += yStep) {
            const image = f(Complex.fromRectangular(x, y));
            xMin = Math.min(image.re, xMin);
            xMax = Math.max(image.re, xMax);
            yMin = Math.min(image.im, yMin);
            yMax = Math.max(image.im, yMax);
        }
    }

    console.log(PlotBounds.fromBounds(xMin, xMax, yMin, yMax));
    
    return PlotBounds.fromBounds(xMin, xMax, yMin, yMax);
}

main();