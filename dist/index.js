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
// Endpoint to handle user input
app.post('/message', (req, res) => {
    const userMessage = req.body.message;
    if (!userMessage) {
        return res.status(400).send({ error: 'Message is required' });
    }
    // Read words from the file
    const wordsFilePath = path_1.default.join(__dirname, '../public/words.txt');
    const words = readWordsFromFile(wordsFilePath);
    // Check if user message matches any word
    const isMatch = words.includes(userMessage);
    res.send({ response: isMatch ? 'Match found!' : 'No match found.' });
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
