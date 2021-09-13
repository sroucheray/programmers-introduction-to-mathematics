import { interpolate } from './interpolate';

const EPSILON = 1e-9;

describe('interpolate', () => {
  test('empty', () => {
    expect(() => interpolate([])).toThrowError(
      new RangeError('Must provide at least one point.')
    );
  });

  test('repeated X values', () => {
    expect(() =>
      interpolate([
        [1, 2],
        [1, 3],
      ])
    ).toThrowError(new RangeError('Not all x values are distinct.'));
  });

  test('degree 0', () => {
    expect([...interpolate([[1, 2]])]).toEqual([2]);
  });

  test('degree 1', () => {
    expect([
      ...interpolate([
        [1, 2],
        [2, 3],
      ]),
    ]).toEqual([1, 1]);
  });

  it('degree 3', () => {
    const points: [number, number][] = [
      [1, 1],
      [2, 0],
      [-3, 2],
      [4, 4],
    ];
    const actualPolynomial = interpolate(points);
    const expectedEvaluations = points;

    const actualEvaluations: [number, number][] = [];
    for (const [x, y] of expectedEvaluations) {
      actualEvaluations.push([x, actualPolynomial.evaluateAt(x)]);
    }

    for (let index = 0; index < expectedEvaluations.length; index++) {
      const p1 = expectedEvaluations[index];
      const p2 = actualEvaluations[index];
      expect(p1[0]).toBeCloseTo(p2[0], EPSILON);
      expect(p1[1]).toBeCloseTo(p2[1], EPSILON);
    }
  });
});
