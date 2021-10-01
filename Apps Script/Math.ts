Object.defineProperty(Math, "RTD", {
  value(rad){
    return rad/(pi/180);
  },
  writable: false,
  configurable: false,
  enumerable: false
});
Object.defineProperty(Math, "DTR", {
  value(deg){
    return deg*(pi/180);
  },
  writable: false,
  configurable: false,
  enumerable: false
});
Object.defineProperty(Math, "int", {
  value(float){
    return float - (float % 1);
  },
  writable: false,
  configurable: false,
  enumerable: false
});
const e = Math.E; // Euler's constant
const ln10 = Math.LN10; // natural logarithm of 10
const ln2 = Math.LN2; // natural logarithm of 2
const log10e = Math.LOG10E;
const log2e = Math.LOG2E;
const pi = Math.PI; // pi; approximately 3.14159265358979
const sqrt1_2 = Math.SQRT1_2; // the square root of one half, or approximately 1/1.414
const sqrt2 = Math.SQRT2; // the square root of 2; approximately 1.414
const twopi = pi * 2; // two times pi, or approximately 6.28
const ag = 9.86;

const sin = Math.sin;
const cos = Math.cos;
const tan = Math.tan;
const sinh = Math.sinh;
const cosh = Math.cosh;
const tanh = Math.tanh;
const asin = Math.asin;
const acos = Math.acos;
const atan = Math.atan;
const atan2 = Math.atan2;
const asinh = Math.asinh;
const acosh = Math.acosh;
const atanh = Math.atanh;

const abs = Math.abs;
const cbrt = Math.cbrt;
const ceil = Math.ceil;
const clz32 = Math.clz32;
const exp = Math.exp;
const expm1 = Math.expm1;
const floor = Math.floor;
const fround = Math.fround;
const hypot = Math.hypot;
const imul = Math.imul;
const log = Math.log;
const log10 = Math.log10;
const log1p = Math.log1p;
const log2 = Math.log2;
const max = Math.max;
const min = Math.min;
const pow = Math.pow;
const round = Math.round;
const random = Math.random;
const sign = Math.sign;
const sqrt = Math.sqrt;
const trunc = Math.trunc;

const rand = (min, max) => {
	var rn = round(random() * max);
	rn = (rn < min) ? rn + min : rn;
	return rn;
};
const rtd = Math.RTD;
const dtr = Math.DTR;
const int = Math.int;
const square = n => n * n;

const pythagorean = {
	triples: function(a,b){
		if(b < a){
			var temp = b;
			b = a;
			a = temp;
			delete temp;
		}
		return {sides: [square(b) - square(a), 2*(b*a), hypot(a, b)], angles: [rtd(asin((square(b) - square(a))/(hypot(a, b)))), rtd(asin((2*(b * a)) / (hypot(a, b)))), 90]};
	},
	
	theorem: function(a, b){
		return hypot(a, b);
	}
};

const polar = function(cartesian){
	var x = cartesian[0], y = cartesian[1];
	var pcoords = [];
	pcoords[0] = pythagorean.theorem(x, y);
	pcoords[1] = round(rtd(asin(y / pcoords[1])));
	return pcoords;
}

const cartesian = function(polar){
	var theta = polar[1];
	var r = polar[0];
	var y = (sin(dtr(theta))) * r;
	var x = r * (cos(dtr(theta)));
	return[x, y];
}