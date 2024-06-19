import { newRandomWord } from '../src/controllers/randomWord'; // Replace with the actual file name
import { readWordsFromFile } from '../src/controllers/readWordsFromFile'; // Adjust the import path as needed
import path from 'path';

// Mocking the readWordsFromFile function
jest.mock('../src/controllers/readWordsFromFile', () => ({
  readWordsFromFile: jest.fn(),
}));

describe('newRandomWord function', () => {
  // Example of mocking readWordsFromFile function to return predefined words
  const mockReadWordsFromFile = readWordsFromFile as jest.MockedFunction<typeof readWordsFromFile>;
  const mockWords = ['apple', 'banana', 'orange', 'grape'];
  mockReadWordsFromFile.mockReturnValue(mockWords);

  // Test case
  it('should return a different word than the current word', () => {
    const currentWord = 'banana'; // Example current word

    // Call the function
    const result = newRandomWord(currentWord);

    // Expectations
    expect(typeof result).toBe('string'); // Check if the result is a string
    expect(result).not.toBe(currentWord); // Ensure the returned word is different

    // Check that the returned word is one of the words from mockWords array
    expect(mockWords.map(word => word.toUpperCase())).toContain(result);
  });

  // Additional test case for edge case (currentWord being the only word in words array)
  it('should handle when current word is the only word in the file', () => {
    const currentWord = 'apple'; // Assuming 'apple' is the only word in mockWords

    // Call the function
    const result = newRandomWord(currentWord);

    // Expectations
    expect(result).not.toBe(currentWord); // Ensure a different word is returned
    expect(mockWords.map(word => word.toUpperCase())).toContain(result);
  });
});
