class Complex {
    readonly re: number;
    readonly im: number;
    readonly r: number;
    readonly theta: number;

    constructor(real: number, imaginary: number) { 
        this.re = real;
        this.im = imaginary;
        this.r = Math.sqrt(real ** 2 + imaginary ** 2);
        this.theta = Math.atan2(imaginary, real);
    }

    static FromRectangular(real: number, imaginary: number) : Complex {
        return new Complex(real, imaginary);
    }

    static FromPolar(magnitude: number, angle: number) : Complex {
        const real = magnitude * Math.cos(angle);
        const imaginary = magnitude * Math.sin(angle);
        return new Complex(real, imaginary);
    }

    static Add(c1: Complex, c2: Complex) : Complex {
        return Complex.FromRectangular(c1.re + c2.re, c1.im + c2.im);
    }

    static Subtract(c1: Complex, c2: Complex) : Complex {
        return Complex.FromRectangular(c1.re - c2.re, c1.im - c2.im);
    }

    static Multiply(c1: Complex, c2: Complex) : Complex {
        return Complex.FromPolar(c1.r * c2.r, c1.theta - c2.theta)    
    }

    static Divide(c1: Complex, c2: Complex) : Complex {
        return Complex.FromPolar(c1.r / c2.r, c1.theta - c2.theta);
    }

    public Add(c: Complex): Complex {
        return Complex.Add(this, c);
    }

    public Subtract(c: Complex): Complex {
        return Complex.Subtract(this, c);
    }

    public Multiply(c: Complex): Complex {
        return Complex.Multiply(this, c);
    }

    public Divide(c: Complex): Complex {
        return Complex.Divide(this, c);
    }

    public toString(): string {
        return `${this.re} + ${this.im}i`;
    }
}