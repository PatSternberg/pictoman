import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 3000;

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
app.post('/message', (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).send({ error: 'Message is required' });
  }

  // Read words from the file
  const wordsFilePath = path.join(__dirname, '../public/words.txt');
  const words = readWordsFromFile(wordsFilePath);

  // Check if user message matches any word
  const isMatch = words.includes(userMessage);

  res.send({ response: isMatch ? 'Match found!' : 'No match found.' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
