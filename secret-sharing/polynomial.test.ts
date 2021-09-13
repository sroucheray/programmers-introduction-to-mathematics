import { Polynomial, strip } from './polynomial';

describe('strip', () => {
  it('should return empty array from empty array', () => {
    expect(strip([], 1)).toEqual([]);
  });

  it('should remove a single element', () => {
    expect(strip([1, 2, 3, 1], 1)).toEqual([1, 2, 3]);
  });

  it('should remove a many elements', () => {
    expect(strip([1, 2, 3, 1, 1, 1, 1], 1)).toEqual([1, 2, 3]);
  });
});

describe('Polynomial', () => {
  test('zero', () => {
    const f = new Polynomial([0]);
    expect(Array.from(f)).toEqual([]);
  });

  describe('#toString', () => {
    it('should return a string representation of the polynomial', () => {
      const f = new Polynomial([1, 2, 3]);
      expect(f.toString()).toEqual('1 + 2x^1 + 3x^2');
    });

    it('should strip zeros from the string representation of the polynomial', () => {
      const f = new Polynomial([1, 0, 3]);
      expect(f.toString()).toEqual('1 + 3x^2');
    });
  });

  test('#add', () => {
    const f = new Polynomial([1, 2, 3]);
    const g = new Polynomial([4, 5, 6]);
    expect(Array.from(f.add(g))).toEqual([5, 7, 9]);
  });

  test('#add', () => {
    const f = new Polynomial([1, 2, 3, 8]);
    const g = new Polynomial([4, 5, 6]);
    expect(Array.from(f.add(g))).toEqual([5, 7, 9, 8]);
  });

  test('#add', () => {
    const f = new Polynomial([1, 2, 3]);
    const g = new Polynomial([4, 5, 6, 8]);
    expect(Array.from(f.add(g))).toEqual([5, 7, 9, 8]);
  });

  test('#sub', () => {
    const f = new Polynomial([1, 2, 3]);
    const g = new Polynomial([4, 5, 6]);
    expect(Array.from(f.sub(g))).toEqual([-3, -3, -3]);
  });

  test('#add(zero)', () => {
    const f = new Polynomial([1, 2, 3]);
    const g = new Polynomial([0]);
    expect(Array.from(f.sub(g))).toEqual([1, 2, 3]);
  });

  test('#negate', () => {
    const f = new Polynomial([1, 2, 3]);
    expect(Array.from(f.negate())).toEqual([-1, -2, -3]);
  });

  test('#multiply', () => {
    const f = new Polynomial([1, 2, 3]);
    const g = new Polynomial([4, 5, 6]);
    expect(Array.from(f.multiply(g))).toEqual([4, 13, 28, 27, 18]);
  });

  test('#evaluateAt', () => {
    const f = new Polynomial([1, 2, 3]);
    expect(f.evaluateAt(2)).toEqual(1 + 4 + 12);
  });
});
