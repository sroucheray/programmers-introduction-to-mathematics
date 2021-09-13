import { Polynomial, ZERO } from './polynomial';
/**
 * Return one term of an interpolated polynomial.
 * This method computes one term of the sum from the proof of Theorem 2.2.
 * In particular, it computes:
 *
 *   y_i \product_{j=0}^n (x - xi) / (xi - xj)
 *
 * The encapsulating `interpolate` function sums these terms to construct
 * the final interpolated polynomial.
 *
 * @param points: a list of (float, float)
 * @param  i: an integer indexing a specific point
 *
 * @returns
 *   A Polynomial instance containing the desired product.
 */
export const singleTerm = (
  points: [number, number][],
  i: number
): Polynomial => {
  let theTerm = new Polynomial([1]);
  const [xi, yi] = points[i];

  for (let j = 0; j < points.length; j++) {
    const p = points[j];
    if (j === i) {
      continue;
    }

    const xj = p[0];

    // The inlined Polynomial instance below is how we represent
    //
    //          (x - xj) / (xi - xj)
    //
    //  using our Polynomial data type (where t replaces x as the variable, and
    //
    //  xi, xj are two x-values of data points):
    //
    //    (x - xj) / (xi - xj) = (-xj / (xi - xj)) * t^0
    //                         +   (1 / (xi - xj)) * t^1

    theTerm = theTerm.multiply(
      new Polynomial([-xj / (xi - xj), 1 / (xi - xj)])
    );

    // Polynomial([yi]) is a constant polynomial, i.e., we're scaling theTerm
    // by a constant.
  }
  return theTerm.multiply(new Polynomial([yi]));
};

/**
 * Return the unique polynomial of degree at most n passing through the given n+1 points
 */
export const interpolate = (points: [number, number][]): Polynomial => {
  if (points.length === 0) {
    throw new RangeError('Must provide at least one point.');
  }

  const xValues = points.map(([x]) => x);
  const xSet = new Set(xValues);

  if (xSet.size < xValues.length) {
    throw new RangeError('Not all x values are distinct.');
  }

  return Array.from({ length: points.length }, (_, index) =>
    singleTerm(points, index)
  ).reduce((result, term) => {
    return result.add(term);
  }, ZERO);
};
