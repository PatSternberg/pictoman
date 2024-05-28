import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { getRandomIntInclusive } from './controllers/randomInclusiveNum';
import { searchImages } from './controllers/searchImages';
import { newRandomWord } from './controllers/randomWord';
import { handleGuessLetter } from './controllers/guessLetter';

const app = express();
const port = 3000;

// Create a var to store the randomly chosen word
let randomWord: string = '';

// Store correct user guesses in array
let correctLetters: string[] = [];

// Store number of remaining user guess as a number
let guessNumber: number = 10;

// Store values relating to the clue image
let clipRadius: number = 0;

// Store the image URL
let imageURL: string = '';

let result: string = 'Time to get guessing!';

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Endpoint to handle user letter guesses
app.post('/guess-letter', handleGuessLetter);

// Endpoint for getting the landing page
app.post('/start', async (req, res) => {
  // Generate a new word to guess to the newly generated word
  const currentWord = '';
  randomWord = newRandomWord(currentWord);
  console.log(`Word to guess is`);
  console.log(randomWord);

  // Search for images for the new word
  imageURL = await searchImages(randomWord);

  res.send({
    response: result,
    correctLetters: correctLetters,
    guessNumber: guessNumber,
    clipRadius: clipRadius,
    clipX: getRandomIntInclusive(10, 90),
    clipY: getRandomIntInclusive(10, 90),
    imageURL: imageURL, // Include the image URL in the response
  });
});

// Endpoint to handle user word guesses
app.post('/guess-word', async (req, res) => {
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

      // Generate a new word to guess to the newly generated word
      const currentWord = '';
      randomWord = newRandomWord(currentWord);
      console.log(`Word to guess is`);
      console.log(randomWord);

      // Search for images for the new word
      imageURL = await searchImages(randomWord);

      // Reset the radius of the revealed clue area
      clipRadius = 0;
    }
  }

  res.send({
    response: result,
    correctLetters: correctLetters,
    guessNumber: guessNumber,
    clipRadius: clipRadius,
    clipX: getRandomIntInclusive(10, 90),
    clipY: getRandomIntInclusive(10, 90),
    imageURL: imageURL, // Include the image URL in the response
  });
});

app.listen(port, () => {
  console.log(`Pictoman server is running at http://localhost:${port}`);
});
