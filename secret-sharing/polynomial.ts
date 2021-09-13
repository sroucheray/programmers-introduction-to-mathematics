export const strip = <T>(array: T[], value: T): T[] => {
  if (array.length === 0) {
    return array;
  }

  let i = array.length - 1;

  while (i >= 0 && array[i] === value) {
    i--;
  }

  return array.slice(0, i + 1);
};

/**
 * A class representing a polynomial as a list of coefficients with no
 * trailing zeros.
 *
 * A degree zero polynomial corresponds to the empty list of coefficients,
 * and is provided by this module as the variable ZERO.
 *
 * Contrary to Python implementation Polynomials in TS does not override the basic arithmetic operations,
 * the language does not have operator overloading @see https://github.com/tc39/proposal-operator-overloading
 */
export class Polynomial {
  private static INDETERMINATE = 'x';
  private coefficients: number[];
  /**
   * Create a new polynomial.
   *
   * The caller must provide a list of all coefficients of the
   * polynomial, even those that are zero. E.g.,
   * Polynomial([0, 1, 0, 2]) corresponds to f(x) = x + 2x^3.
   */
  constructor(coefficients: number[]) {
    this.coefficients = strip(coefficients, 0);
  }

  public add(other: Polynomial): Polynomial {
    const newCoefficients = [];
    const thisCoefficients = [...this];
    const otherCoefficients = [...other];
    const thisLength = thisCoefficients.length;
    const otherLength = otherCoefficients.length;

    const longest = Math.max(thisLength, otherLength);

    for (let index = 0; index < longest; index++) {
      const thisValue = index >= thisLength ? 0 : thisCoefficients[index];
      const otherValue = index >= otherLength ? 0 : otherCoefficients[index];
      otherCoefficients[index];
      newCoefficients.push(thisValue + otherValue);
    }
    return new Polynomial(newCoefficients);
  }

  public multiply(other: Polynomial): Polynomial {
    const thisCoefficients = [...this];
    const otherCoefficients = [...other];
    const expectedLength =
      thisCoefficients.length + otherCoefficients.length - 1;
    const newCoefficients = Array(expectedLength).fill(0, 0, expectedLength);

    thisCoefficients.forEach((a, i) => {
      otherCoefficients.forEach((b, j) => {
        newCoefficients[i + j] += a * b;
      });
    });

    return new Polynomial(newCoefficients);
  }

  public sub(other: Polynomial): Polynomial {
    return new Polynomial([...this.add(other.negate())]);
  }

  /**
   * Evaluate a polynomial at an input point.
   * Uses Horner's method, first discovered by Persian mathematician
   * Sharaf al-Dīn al-Ṭūsī, which evaluates a polynomial by minimizing
   * the number of multiplications.
   */
  public evaluateAt(x: number): number {
    let theSum = 0;
    [...this].reverse().forEach((c) => {
      theSum = theSum * x + c;
    });

    return theSum;
  }

  public negate(): Polynomial {
    return new Polynomial([...this].map((val) => -val));
  }

  public toString(): string {
    return (
      [...this]
        .map((value, index) => {
          if (value === 0) {
            return '';
          }

          return index === 0
            ? `${value}`
            : `${value}${Polynomial.INDETERMINATE}^${index}`;
        })
        .filter((value) => value !== '')
        .join(' + ') || '0'
    );
  }

  [Symbol.iterator]() {
    let index = -1;
    const coefficients = this.coefficients;

    return {
      next: () => ({
        value: coefficients[++index],
        done: !(index in coefficients),
      }),
    };
  }
}

export const ZERO = new Polynomial([]);
