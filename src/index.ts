import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 3000;

// Store correct user guesses in array
let correctLetters: string[] = [];

// Store number of remaining user guess as a number
let guessNumber: number = 10;

// Store values relating to the clue image
let clipRadius: number = 0;
let clipX: number = 0;
let clipY: number = 5;

// Get a random word for the user to guess
// Read words from the file
const wordsFilePath = path.join(__dirname, '../public/words.txt');
const words = readWordsFromFile(wordsFilePath);

// Get a random word from the file and make it all lower case
let randomNum = Math.floor(Math.random() * words.length);
let randomWord: string = words[randomNum].toLowerCase();
console.log(`Word to guess is`);
console.log(randomWord);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Function to read words from file and return as an array
function readWordsFromFile(filePath: string): string[] {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data.split('\n').map(word => word.trim()).filter(word => word.length > 0);
  } catch (error) {
    console.error('Error reading the file:', error);
    return [];
  }
}

// Function to get a random integer between two values (inclusive)
function getRandomIntInclusive(min: number, max: number): number {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

// Endpoint to handle user letter guesses
app.post('/guess-letter', (req, res) => {
  const userGuess: string = req.body.message.toLowerCase();
  let result = `No, that's not right`;
  if (!userGuess || userGuess.length !== 1) {
    result = `Guess a single letter`;
  // Check if user has any guesses left
  } else if (guessNumber < 1) {
    // Reset everything if not
    result = `You're out of guesses - resetting with a new word`
    correctLetters = [];
    guessNumber = 10;

    // Get a random word from the file and make it all lower case
    randomNum = Math.floor(Math.random() * words.length);
    let newRandomWord: string = words[randomNum].toLowerCase();

    // Check that the new word is different and reroll if not
    while (newRandomWord === randomWord) {
      console.log(`"New word is the same:"`);
      console.log(newRandomWord, randomWord);
      randomNum = Math.floor(Math.random() * words.length);
      newRandomWord = words[randomNum].toLowerCase();
    }

    // Set the new word to the newly generated word
    randomWord = newRandomWord;
    console.log(`Word to guess is`);
    console.log(randomWord);

    // Reset the radius of the revealed clue area
    clipRadius = -2.5;
    
  } else {
    // Check if the user's guessed letter is in the word
    if (randomWord.includes(userGuess)) {
      correctLetters.push(userGuess.toUpperCase());
      result = `Well done! That's correct.`;
    }
  }
  // Reduce number of remaining user guesses
  guessNumber--;

  // Increase the radius of the revealed clue area
  clipRadius += 2.5;
  console.log(clipRadius);
  console.log(clipX);
  console.log(clipY);

  res.send({
    response: result,
    correctLetters: correctLetters,
    guessNumber: guessNumber,
    clipRadius: clipRadius,
    clipX: getRandomIntInclusive(10, 90),
    clipY: getRandomIntInclusive(10, 90),
  });
});

// Endpoint to handle user word guesses
app.post('/guess-word', (req, res) => {
  const userGuess: string = req.body.message.toLowerCase();
  console.log(userGuess);
  let result = `No, that's not the right word`;
  if (!userGuess) {
    result = `Guess a word`;
  } else {
    // Check if the user's guessed letter is in the word
    if (randomWord === userGuess) {
      result = `Well done! That's the correct word. A new word has been chosen.`;
      correctLetters = [];

      // Get a random word from the file and make it all lower case
      randomNum = Math.floor(Math.random() * words.length);
      let newRandomWord: string = words[randomNum].toLowerCase();
      // Check that the new word is different and reroll if not
      while (newRandomWord === randomWord) {
        console.log(`"New word is the same:"`);
        console.log(newRandomWord, randomWord);
        randomNum = Math.floor(Math.random() * words.length);
        newRandomWord = words[randomNum].toLowerCase();
      }
      // Set the new word to the newly generated word
      randomWord = newRandomWord;
      console.log(`Word to guess is`);
      console.log(randomWord);
    }
  }

  // Reset the radius of the revealed clue area
  clipRadius = 0;

  res.send({
    response: result,
    correctLetters: correctLetters,
    guessNumber: guessNumber,
    clipRadius: clipRadius,
    clipX: getRandomIntInclusive(10, 90),
    clipY: getRandomIntInclusive(10, 90),
  });
});

app.listen(port, () => {
  console.log(`Pictoman server is running at http://localhost:${port}`);
});
