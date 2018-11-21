export class PlotBounds {
    readonly xMin: number;
    readonly xMax: number;
    readonly yMin: number;
    readonly yMax: number;

    readonly xRange: number;
    readonly yRange: number;
    
    constructor(xMin: number, xMax: number, yMin: number, yMax: number) {
        this.xMin = xMin;
        this.xMax = xMax;
        this.yMin = yMin;
        this.yMax = yMax;

        this.xRange = xMax - xMin;
        this.yRange = yMax - yMin;
    }

    static fromBounds(xMin: number, xMax: number, yMin: number, yMax: number): PlotBounds {
        return new PlotBounds(xMin, xMax, yMin, yMax);
    }

    static fromZero(xMax: number, yMax: number): PlotBounds {
        return new PlotBounds(0, xMax, 0, yMax);
    }

    static symmetric(x: number, y: number): PlotBounds {
        return new PlotBounds(-x, x, -y, y);
    }

    public transform(transformFunction: (boundsInput: PlotBounds) => PlotBounds): PlotBounds {
        return transformFunction(this);
    }
}

export class DrawPlot {
    public readonly bounds: PlotBounds;
    public readonly canvas: HTMLCanvasElement;
    
    private readonly context: CanvasRenderingContext2D;

    constructor(bounds: PlotBounds, canvasWidth: number, canvasHeight: number) {
        this.bounds = bounds;

        this.canvas = document.createElement("canvas");
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;

        this.context = this.canvas.getContext("2d")!;

        const self = this;
    }

    public beginPath(x: number, y: number) {
        const [canvasX, canvasY] = this.getCanvasCoordinates(x, y);
        this.context.beginPath();
        this.context.moveTo(canvasX, canvasY);
    }

    public endPath(x: number, y: number) {
        const [canvasX, canvasY] = this.getCanvasCoordinates(x, y);
        this.context.closePath();
    }
    
    public addPoint(x: number, y: number) {
        const [canvasX, canvasY] = this.getCanvasCoordinates(x, y);
        this.context.lineTo(canvasX, canvasY);
        this.context.stroke();
    }

    private getCanvasCoordinates(x: number, y: number): [number, number] {
        const canvasX = this.canvas.width * (x - this.bounds.xMin) / this.bounds.xRange;
        const canvasY = this.canvas.height * (y - this.bounds.yMin) / this.bounds.yRange;

        return [canvasX, canvasY];
    }
}