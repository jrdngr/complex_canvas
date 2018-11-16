function main() {
    const drawPlot = new Plot(0, 100, 0, 100);
    document.body.appendChild(drawPlot.canvas);

    const complexPlot = new Plot(0, 100, 0, 100);
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
            const x = event.clientX;
            const y = drawPlot.canvas.height - event.clientY;

            drawPlot.addPoint(x, y);

            const c1 = Complex.fromRectangular(x, y);
            const c2 = c1.add(c1);

            complexPlot.addPoint(c2.re, c2.im);
        }
    });
}


main();