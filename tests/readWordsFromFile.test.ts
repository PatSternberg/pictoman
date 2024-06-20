// file: pictoman/tests/readWordsFromFile.test.ts
// Import functionality to test
import { readWordsFromFile } from '../src/controllers/readWordsFromFile';
// Import fs library to read files
import fs from 'fs';

// Mock fs.readFileSync function with jest
jest.mock('fs');

// Set up test environment
describe('readWordsFromFile function', () => {
  // Example test case when file exists and contains words
  it('should read words from file and return as array', () => {
    const filePath = '/validpath/words.txt';
    const fileContent = 'cow\nhorse\ngoat\nchicken';

    // Mock fs.readFileSync to return fileContent when called with filePath
    // (jest includes fs object type utility to do this)
    (fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>).mockReturnValueOnce(fileContent);

    // Call the function
    const result = readWordsFromFile(filePath);

    // Expectations
    // Check if it returns the correct array of words formatted correctly
    expect(result).toEqual(['cow', 'horse', 'goat', 'chicken']);
    // Verify fs.readFileSync was called with the expected arguments
    expect(fs.readFileSync).toHaveBeenCalledWith(filePath, 'utf-8');
  });

  // Example test case when file does not exist or cannot be read
  it('should return an empty array when file reading fails', () => {
    const filePath = '/invalidpath/words.txt';

    // Mock fs.readFileSync to throw an error when called
    (fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>).mockImplementationOnce(() => {
      throw new Error('File not found');
    });

    // Mock console.error to track calls (mock implementation should do nothing)
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Call the function
    const result = readWordsFromFile(filePath);

    // Ensure it returns an empty array on failure
    expect(result).toEqual([]);
    // Verify fs.readFileSync was called with the expected arguments
    expect(fs.readFileSync).toHaveBeenCalledWith(filePath, 'utf-8');
    // Check that console.error was called
    expect(consoleErrorMock).toHaveBeenCalled();
    // Restore console.error to original implementation
    consoleErrorMock.mockRestore();
  });

  // Additional test case for handling empty lines and whitespace trimming
  it('should handle empty lines and trim whitespace', () => {
    const filePath = '/validpath/words.txt';
    const fileContent = 'cow  \n horse \ngoat\n\n chicken    ';

    // Mock fs.readFileSync to return fileContent when called with filePath
    (fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>).mockReturnValueOnce(fileContent);

    // Call the function
    const result = readWordsFromFile(filePath);

    // Check if it returns the expected array of words with whitespace trimmed correctly etc.
    expect(result).toEqual(['cow', 'horse', 'goat', 'chicken']);
  });
});

