"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = 3000;
// Store correct user guesses in array
let correctLetters = [];
// Get a random word for the user to guess
// Read words from the file
const wordsFilePath = path_1.default.join(__dirname, '../public/words.txt');
const words = readWordsFromFile(wordsFilePath);
// Get a random word from the file and make it all lower case
let randomNum = Math.floor(Math.random() * words.length);
let randomWord = words[randomNum].toLowerCase();
console.log(randomWord, typeof randomWord);
// Middleware to parse JSON bodies
app.use(body_parser_1.default.json());
// Serve static files from the "public" directory
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Function to read words from file and return as an array
function readWordsFromFile(filePath) {
    try {
        const data = fs_1.default.readFileSync(filePath, 'utf-8');
        return data.split('\n').map(word => word.trim()).filter(word => word.length > 0);
    }
    catch (error) {
        console.error('Error reading the file:', error);
        return [];
    }
}
// Endpoint to handle user letter guess
app.post('/guess-letter', (req, res) => {
    const userGuess = req.body.message.toLowerCase();
    let result = `No, that's not right`;
    if (!userGuess || userGuess.length !== 1) {
        result = `Guess a single letter`;
    }
    else {
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
    const userGuess = req.body.message.toLowerCase();
    console.log(userGuess);
    let result = `No, that's not the right word`;
    if (!userGuess) {
        result = `Guess a word`;
    }
    else {
        // Check if the user's guessed letter is in the word
        if (randomWord === userGuess) {
            result = `Well done! That's the correct word. A new word has been chosen.`;
            // Get a random word from the file and make it all lower case
            randomNum = Math.floor(Math.random() * words.length);
            let newRandomWord = words[randomNum].toLowerCase();
            // Check that the new word is different and reroll if not
            while (newRandomWord === randomWord) {
                console.log(`"New word is the same"`);
                console.log(newRandomWord, randomWord);
                randomNum = Math.floor(Math.random() * words.length);
                newRandomWord = words[randomNum].toLowerCase();
            }
            // Set the new word to the newly generated word
            randomWord = newRandomWord;
            console.log(randomWord, typeof randomWord);
        }
    }
    res.send({ response: result, correctLetters: [] });
});
app.listen(port, () => {
    console.log(`Pictoman server is running at http://localhost:${port}`);
});
