import { DrawPlot, PlotBounds } from "./plot";
import { Complex, ComplexFunction } from "./complex";

const bounds = PlotBounds.fromBounds(-10, 10, -10, 10);
const canvasSize = 500;

const f: ComplexFunction = c => c.exponent(2);

export function main() {
    const drawPlot = new DrawPlot(bounds, canvasSize, canvasSize);
    document.body.appendChild(drawPlot.canvas);

    const complexBounds = calculateComplexBounds(f, bounds);

    const complexPlot = new DrawPlot(complexBounds, canvasSize, canvasSize);
    document.body.appendChild(complexPlot.canvas);

    let down = false;

    drawPlot.canvas.addEventListener("pointerdown", function(event) { 
        down = true;
        const [x, y] = getCoordinates(event);
        drawPlot.beginPath(x, y);

        const c = f(Complex.fromRectangular(x, y));
        complexPlot.beginPath(c.re, c.im);
    });
    
    drawPlot.canvas.addEventListener("pointerup", function(event) {
        down = false;
        const [x, y] = getCoordinates(event);
        drawPlot.endPath(x, y);

        const c = f(Complex.fromRectangular(x, y));
        complexPlot.endPath(c.re, c.im);
    });

    drawPlot.canvas.addEventListener("pointerleave", function(event) {
        down = false;
        const [x, y] = getCoordinates(event);
        drawPlot.endPath(x, y);

        const c = f(Complex.fromRectangular(x, y));
        complexPlot.endPath(c.re, c.im);
    });
  
    drawPlot.canvas.addEventListener("pointermove", function(event) {
        if (down) {
            const [x, y] = getCoordinates(event);
            drawPlot.addPoint(x, y);

            const c = f(Complex.fromRectangular(x, y));
            complexPlot.addPoint(c.re, c.im);
        }
    });
}

function getCoordinates(event: PointerEvent): [number, number] {
    const x = bounds.xMin + (event.pageX / canvasSize) * bounds.xRange;
    const y = bounds.yMin + (event.pageY / canvasSize) * bounds.yRange;

    return [x, y];
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

    return PlotBounds.fromBounds(xMin, xMax, yMin, yMax);
}

main();