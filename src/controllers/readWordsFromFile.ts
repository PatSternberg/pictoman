// file: pictoman/src/controllers/readWordsFromFile.ts
import fs from 'fs';

// Function to read words from file and return as an array
export function readWordsFromFile(filePath: string): string[] {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data.split('\n').map(word => word.trim()).filter(word => word.length > 0);
  } catch (error) {
    console.error('Error reading the file:', error);
    return [];
  }
}
