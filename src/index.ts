import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 3000;

// Store correct user guesses in array
const correctLetters: string[] = [];

// Get a random word for the user to guess
// Read words from the file
const wordsFilePath = path.join(__dirname, '../public/words.txt');
const words = readWordsFromFile(wordsFilePath);

// Get a random word from the file and make it all lower case
const randomNum = Math.floor(Math.random() * words.length);
const randomWord: string = words[randomNum].toLowerCase();
console.log(randomWord, typeof randomWord);

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

// Endpoint to handle user input
app.post('/guess', (req, res) => {
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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
