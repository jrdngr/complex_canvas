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

export class Plot {
    public readonly bounds: PlotBounds;

    public readonly canvas: HTMLCanvasElement;
    public readonly gl: WebGLRenderingContext;

    constructor(bounds: PlotBounds, canvasWidth: number, canvasHeight: number) {
        this.bounds = bounds;

        this.canvas = document.createElement("canvas");
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.canvas.id = "canvas";
        
        this.gl = this.canvas.getContext("webgl", { antialias: false, preserveDrawingBuffer: true })!;
        this.configureGl();
    }

    public addPoint(x: number, y: number) {
        if (this.isPointOnPlot(x, y)) {
            const canvasNormalizedX = (x - this.bounds.xMin) / this.bounds.xRange;
            const canvasNormalizedY = (y - this.bounds.yMin) / this.bounds.yRange;

            const canvasX = canvasNormalizedX * this.canvas.width;
            const canvasY = canvasNormalizedY * this.canvas.height;

            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([canvasX, canvasY]), this.gl.STATIC_DRAW);
            this.gl.drawArrays(this.gl.POINTS, 0, 1);
        }
    }

    public isPointOnPlot(x: number, y: number) : boolean {
        return x >= this.bounds.xMin && x <= this.bounds.xMax && y >= this.bounds.yMin && y <= this.bounds.yMax;
    }

    private configureGl() {
        const vertexShader = this.createShader(vertexShaderText, this.gl.VERTEX_SHADER);
        const fragmetShader = this.createShader(fragmentShaderText, this.gl.FRAGMENT_SHADER);

        const program = this.gl.createProgram()!;
        
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmetShader);
        
        this.gl.linkProgram(program);
        this.gl.useProgram(program);

        const colorLocation = this.gl.getUniformLocation(program, "u_color");
        const positionLocation = this.gl.getAttribLocation(program, "a_position");
        const resolutionLocation = this.gl.getUniformLocation(program, "u_resolution");
        
        this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);

        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.uniform4f(colorLocation, 0, 0, 0, 1);

        this.gl.clearColor(1, 1, 1, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
    
    private createShader(shaderText: string, shaderType: number) {
        const shader = this.gl.createShader(shaderType)!;
        this.gl.shaderSource(shader, shaderText);
        this.gl.compileShader(shader);
        return shader;
    }
}

const vertexShaderText = `
attribute vec2 a_position;
uniform vec2 u_resolution;

void main() {
  // convert the rectangle from pixels to 0.0 to 1.0
    vec2 zeroToOne = a_position / u_resolution;

    // convert from 0 -> 1 to 0 -> 2
    vec2 zeroToTwo = zeroToOne * 2.0;

    // convert from 0 -> 2 to -1 -> +1 (clipspace)
    vec2 clipSpace = zeroToTwo - 1.0;

    gl_PointSize = 1.0;
    gl_Position = vec4(clipSpace * vec2(1, 1), 0, 1);
}`;

const fragmentShaderText = `
precision mediump float;
uniform vec4 u_color;

void main() {
  gl_FragColor = u_color;
}`;