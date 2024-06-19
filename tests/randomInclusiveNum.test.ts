// file: pictoman/tests/randomInclusiveNum.test.ts
import { getRandomIntInclusive } from "../src/controllers/randomInclusiveNum";

// Tests start here
describe('Test getRandomIntInclusive function', () => {
  it('should return a number between 10 and 90 when given appropriate min and max numbers', async () => {
    let test_num = getRandomIntInclusive(10, 90);
    expect(test_num).toBeGreaterThanOrEqual(10);
    expect(test_num).toBeLessThanOrEqual(90);
  });

  // Test error handling
  it('should throw an error if min and max are the same', () => {
    expect(() => getRandomIntInclusive(50, 50)).toThrow("'min' and 'max' parameters must not be the same");
  });
});