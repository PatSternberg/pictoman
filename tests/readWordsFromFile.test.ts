import { readWordsFromFile } from '../src/controllers/readWordsFromFile';
import fs from 'fs';

// Mocking fs.readFileSync function
jest.mock('fs');

describe('readWordsFromFile function', () => {
  // Example test case when file exists and contains words
  it('should read words from file and return as array', () => {
    const filePath = '/path/to/words.txt';
    const fileContent = 'apple\nbanana\norange\ngrape';

    // Mock fs.readFileSync to return fileContent when called with filePath
    (fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>).mockReturnValueOnce(fileContent);

    // Call the function
    const result = readWordsFromFile(filePath);

    // Expectations
    expect(result).toEqual(['apple', 'banana', 'orange', 'grape']); // Check if it returns the correct array of words
    expect(fs.readFileSync).toBeCalledWith(filePath, 'utf-8'); // Verify fs.readFileSync was called with the correct arguments
  });

  // Example test case when file does not exist or cannot be read
  it('should return an empty array when file reading fails', () => {
    const filePath = '/path/to/nonexistent-file.txt';

    // Mock fs.readFileSync to throw an error when called
    (fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>).mockImplementationOnce(() => {
      throw new Error('File not found');
    });

    // Mock console.error to track calls
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock implementation to do nothing

    // Call the function
    const result = readWordsFromFile(filePath);

    // Expectations
    expect(result).toEqual([]); // Ensure it returns an empty array on failure
    expect(fs.readFileSync).toBeCalledWith(filePath, 'utf-8'); // Verify fs.readFileSync was called with the correct arguments
    expect(consoleErrorMock).toBeCalled(); // Check if console.error was called
    consoleErrorMock.mockRestore(); // Restore console.error to original implementation
  });

  // Additional test case for handling empty lines and whitespace trimming
  it('should handle empty lines and trim whitespace', () => {
    const filePath = '/path/to/words.txt';
    const fileContent = '  apple  \nbanana\n  \norange  \n grape  ';

    // Mock fs.readFileSync to return fileContent when called with filePath
    (fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>).mockReturnValueOnce(fileContent);

    // Call the function
    const result = readWordsFromFile(filePath);

    // Expectations
    expect(result).toEqual(['apple', 'banana', 'orange', 'grape']); // Check if it returns the correct array of words
  });
});

