import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import os from 'os';
import { handleStartGame } from './controllers/startGame';
import { handleGuessLetter } from './controllers/guessLetter';
import { handleGuessWord } from './controllers/guessWord';

const app = express();
const port = 3000;

// OS FUNCTIONS
// Function to get the local external IP address
function getLocalExternalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    const ifaceArray = interfaces[name];
    if (ifaceArray) {
      for (const iface of ifaceArray) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
  }
  return 'localhost';
}

// APP CONFIG
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// APP ENDPOINTS
// Endpoint to handle user letter guesses
app.post('/guess-letter', handleGuessLetter);

// Endpoint for (re)starting the game
app.post('/start', handleStartGame);

// Endpoint to handle user word guesses
app.post('/guess-word', handleGuessWord);

// APP SERVER FUNCTIONS
// Start the server and log the actual hostname
app.listen(port, () => {
  const host = getLocalExternalIP();
  console.log(`Pictoman server is running at http://${host}:${port}`);
});
