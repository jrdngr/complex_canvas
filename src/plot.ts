export interface CanvasUpdater {
    update(canvas: HTMLCanvasElement): void;
}

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

    private isMouseDown: boolean = false;
    private updateSubscriptions: CanvasUpdater[] = [];
    
    constructor(bounds: PlotBounds, canvasWidth: number, canvasHeight: number) {
        this.bounds = bounds;

        this.canvas = document.createElement("canvas");
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;

        this.context = this.canvas.getContext("2d")!;

        const self = this;

        this.canvas.addEventListener("mousedown", function(event) { 
            self.onMouseDown(event.pageX, event.pageY);
        });
          
        this.canvas.addEventListener("mouseup", function(event) {
            self.onMouseUp(event.pageX, event.pageY);
        });
    
        this.canvas.addEventListener("mousemove", function(event) {
            self.onMouseMove(event.pageX, event.pageY);
        });

        this.canvas.addEventListener("mouseleave", function(event) {
            self.onMouseUp(event.pageX, event.pageY);
        });
    }

    public subscribe(updater: CanvasUpdater) {
        this.updateSubscriptions.push(updater);
    }

    private onMouseDown(x: number, y: number) {
        this.isMouseDown = true;
        this.context.beginPath();
        this.context.moveTo(x, y);
    }

    private onMouseUp(x: number, y: number) {
        this.onMouseMove(x, y);
        this.context.closePath();
        this.isMouseDown = false;
    }
    
    private onMouseMove(x: number, y: number) {
        if (this.isMouseDown) {
            this.context.lineTo(x, y);
            this.context.stroke();
            this.updateSubscriptions.forEach(sub => {
                sub.update(this.canvas);
            });
        }
    }
}

export class ShaderPlot implements CanvasUpdater {
    public readonly bounds: PlotBounds;

    public readonly canvas: HTMLCanvasElement;
    public readonly gl: WebGLRenderingContext;

    constructor(bounds: PlotBounds, canvasWidth: number, canvasHeight: number) {
        this.bounds = bounds;

        this.canvas = document.createElement("canvas");
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        
        this.gl = this.canvas.getContext("webgl", { antialias: false, preserveDrawingBuffer: true })!;
        this.configureGl();
    }

    private configureGl() {
        const vertexShader = this.createShader(vertexShaderText, this.gl.VERTEX_SHADER);
        const fragmentShader = this.createShader(fragmentShaderText, this.gl.FRAGMENT_SHADER);

        const program = this.gl.createProgram()!;
        
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        
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

    public update(canvas: HTMLCanvasElement) {
        let texture = this.gl.createTexture();

        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, canvas);

        var fb = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fb);
     
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, texture, 0);
    }
}

const vertexShaderText = `
attribute vec2 a_position;
uniform vec2 u_resolution;

void main() {
    gl_Position = vec4(a_position, 0, 1);
}`;

const fragmentShaderText = `
precision mediump float;
uniform vec4 u_color;

void main() {
  gl_FragColor = u_color;
}`;