"use strict";
class Complex {
    constructor(real, imaginary) {
        this.re = real;
        this.im = imaginary;
        this.r = Math.sqrt(Math.pow(real, 2) + Math.pow(imaginary, 2));
        this.theta = Math.atan2(imaginary, real);
    }
    static zero() {
        return Complex.fromRectangular(0, 0);
    }
    static unit() {
        return Complex.fromRectangular(1, 0);
    }
    static fromRectangular(real, imaginary) {
        return new Complex(real, imaginary);
    }
    static fromPolar(magnitude, angle) {
        const real = magnitude * Math.cos(angle);
        const imaginary = magnitude * Math.sin(angle);
        return new Complex(real, imaginary);
    }
    static fromComplex(c) {
        return Complex.fromRectangular(c.re, c.im);
    }
    static add(c1, c2) {
        return Complex.fromRectangular(c1.re + c2.re, c1.im + c2.im);
    }
    static subtract(c1, c2) {
        return Complex.fromRectangular(c1.re - c2.re, c1.im - c2.im);
    }
    static multiply(c1, c2) {
        return Complex.fromPolar(c1.r * c2.r, c1.theta - c2.theta);
    }
    static divide(c1, c2) {
        return Complex.fromPolar(c1.r / c2.r, c1.theta - c2.theta);
    }
    static exponent(c, exp) {
        const multiplier = Math.pow(c.r, exp);
        const re = multiplier * Math.cos(exp * c.theta);
        const im = multiplier * Math.sin(exp * c.theta);
        return Complex.fromRectangular(re, im);
    }
    static root(c, root) {
        return Complex.exponent(c, 1 / root);
    }
    clone() {
        return Complex.fromComplex(this);
    }
    add(c) {
        return Complex.add(this, c);
    }
    subtract(c) {
        return Complex.subtract(this, c);
    }
    multiply(c) {
        return Complex.multiply(this, c);
    }
    divide(c) {
        return Complex.divide(this, c);
    }
    exponent(exp) {
        return Complex.exponent(this, exp);
    }
    root(root) {
        return Complex.root(this, root);
    }
    toString() {
        return `${this.re} + ${this.im}i`;
    }
}
