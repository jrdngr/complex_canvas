"use strict";
function main() {
    const plot = new Plot(0, 500, 0, 500);
    document.body.appendChild(plot.canvas);
    let down = false;
    plot.canvas.addEventListener("mousedown", function (event) {
        down = true;
    });
    plot.canvas.addEventListener("mouseup", function (event) {
        down = false;
    });
    plot.canvas.addEventListener("mousemove", function (event) {
        if (down) {
            plot.addPoint(event.clientX, plot.canvas.height - event.clientY);
        }
    });
}
main();
