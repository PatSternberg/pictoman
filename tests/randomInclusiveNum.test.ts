// file: pictoman/tests/randomInclusiveNum.test.ts
// Import function to test
import { getRandomIntInclusive } from "../src/controllers/randomInclusiveNum";

// Set up test suite
describe('Test getRandomIntInclusive function', () => {
  // Test returns expected number
  it('should return a number between 40 and 60 when given appropriate min and max numbers', () => {
    // Use for loop to run the test 100 times
    for (let i = 0; i < 100; i++) {
      let test_num = getRandomIntInclusive(40, 60);
      expect(test_num).toBeGreaterThanOrEqual(40);
      expect(test_num).toBeLessThanOrEqual(60);
    };
  });

  // Test error handling
  it('should throw an error if min and max are the same', () => {
    expect(() => getRandomIntInclusive(50, 50)).toThrow("'min' and 'max' parameters must not be the same");
  });
});