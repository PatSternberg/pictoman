import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 3000;

// Define the allowed origins
const allowedOrigins = ['https://localhost:3000', 'http://localhost:3000', 'https://pictoman.onrender.com', 'http://pictoman.onrender.com'];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is in the allowedOrigins array
    if (allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Use the CORS middleware with the options
app.use(cors(corsOptions));

// Store correct user guesses in array
let correctLetters: string[] = [];

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

// Endpoint to handle user letter guess
app.post('/guess-letter', (req, res) => {
  const userGuess: string = req.body.message.toLowerCase();
  let result = `No, that's not right`;
  if (!userGuess || userGuess.length !== 1) {
    result = `Guess a single letter`;
  } else {
    // Check if the user's guessed letter is in the word
    if (randomWord.includes(userGuess)) {
      correctLetters.push(userGuess.toUpperCase());
      result = `Well done! That's correct.`;
    }
  }
  res.send({ response: result, correctLetters: correctLetters });
});

// Endpoint to handle user letter guess
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
  res.send({ response: result, correctLetters: correctLetters });
});

app.listen(port, () => {
  console.log(`Pictoman server is running at http://localhost:${port}`);
});
