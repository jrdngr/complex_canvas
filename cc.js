"use strict";
class Complex {
    constructor(real, imaginary) {
        this.re = real;
        this.im = imaginary;
        this.r = Math.sqrt(Math.pow(real, 2) + Math.pow(imaginary, 2));
        this.theta = Math.atan2(imaginary, real);
    }
    static FromRectangular(real, imaginary) {
        return new Complex(real, imaginary);
    }
    static FromPolar(magnitude, angle) {
        const real = magnitude * Math.cos(angle);
        const imaginary = magnitude * Math.sin(angle);
        return new Complex(real, imaginary);
    }
    static Add(c1, c2) {
        return Complex.FromRectangular(c1.re + c2.re, c1.im + c2.im);
    }
    static Subtract(c1, c2) {
        return Complex.FromRectangular(c1.re - c2.re, c1.im - c2.im);
    }
    static Multiply(c1, c2) {
        return Complex.FromPolar(c1.r * c2.r, c1.theta - c2.theta);
    }
    static Divide(c1, c2) {
        return Complex.FromPolar(c1.r / c2.r, c1.theta - c2.theta);
    }
    Add(c) {
        return Complex.Add(this, c);
    }
    Subtract(c) {
        return Complex.Subtract(this, c);
    }
    Multiply(c) {
        return Complex.Multiply(this, c);
    }
    Divide(c) {
        return Complex.Divide(this, c);
    }
    toString() {
        return `${this.re} + ${this.im}i`;
    }
}
let a = Complex.FromRectangular(1, 2);
let b = Complex.FromPolar(2, Math.PI);
console.log(a);
console.log(b);
console.log(a.Add(b));
console.log(a.Subtract(b));
console.log(a.Multiply(b));
console.log(a.Divide(b));
