import { readWordsFromFile } from './readWordsFromFile';
import path from 'path';

// Gets and returns a random word from the file and make it all lower case
export function newRandomWord(currentWord: string): string {
  // Read words from the file
  const wordsFilePath = path.join(__dirname, '../../public/words.txt');
  const words = readWordsFromFile(wordsFilePath);

  // Get a random number to choose a word from the file
  let randomNum = Math.floor(Math.random() * words.length);
  let newRandomWord: string = words[randomNum].toUpperCase();

  // Check that the new word is different and reroll if not
  while (newRandomWord === currentWord) {
    randomNum = Math.floor(Math.random() * words.length);
    newRandomWord = words[randomNum].toUpperCase();
    console.log(`"New word is the same:"`);
    console.log(newRandomWord, currentWord);
  }

  return newRandomWord;
}
