export type ComplexFunction = (c: Complex) => Complex;

export class Complex {
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

    static zero() : Complex {
        return Complex.fromRectangular(0, 0);
    }

    static unit() : Complex {
        return Complex.fromRectangular(1, 0);
    }

    static fromRectangular(real: number, imaginary: number) : Complex {
        return new Complex(real, imaginary);
    }

    static fromPolar(magnitude: number, angle: number) : Complex {
        const real = magnitude * Math.cos(angle);
        const imaginary = magnitude * Math.sin(angle);
        return new Complex(real, imaginary);
    }

    static fromComplex(c: Complex) : Complex {
        return Complex.fromRectangular(c.re, c.im);
    }

    static add(c1: Complex, c2: Complex) : Complex {
        return Complex.fromRectangular(c1.re + c2.re, c1.im + c2.im);
    }

    static subtract(c1: Complex, c2: Complex) : Complex {
        return Complex.fromRectangular(c1.re - c2.re, c1.im - c2.im);
    }

    static multiply(c1: Complex, c2: Complex) : Complex {
        return Complex.fromPolar(c1.r * c2.r, c1.theta - c2.theta)    
    }

    static divide(c1: Complex, c2: Complex) : Complex {
        return Complex.fromPolar(c1.r / c2.r, c1.theta - c2.theta);
    }

    static exponent(c: Complex, exp: number) : Complex {
        const multiplier = c.r ** exp;
        const re = multiplier * Math.cos(exp * c.theta);
        const im = multiplier * Math.sin(exp * c.theta);
        return Complex.fromRectangular(re, im);
    }

    static root(c: Complex, root: number) : Complex {
        return Complex.exponent(c, 1/root);
    }

    public clone() : Complex {
        return Complex.fromComplex(this);
    }

    public add(c: Complex) : Complex {
        return Complex.add(this, c);
    }

    public subtract(c: Complex) : Complex {
        return Complex.subtract(this, c);
    }

    public multiply(c: Complex) : Complex {
        return Complex.multiply(this, c);
    }

    public divide(c: Complex) : Complex {
        return Complex.divide(this, c);
    }

    public exponent(exp: number) : Complex {
        return Complex.exponent(this, exp);
    }

    public root(root: number) : Complex {
        return Complex.root(this, root);
    }

    public toString(): string {
        return `${this.re} + ${this.im}i`;
    }
}