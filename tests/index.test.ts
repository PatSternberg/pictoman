import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import os from 'os';
import { handleStartGame } from '../src/controllers/startGame';
import { handleGuessLetter } from '../src/controllers/guessLetter';
import { handleGuessWord } from '../src/controllers/guessWord';

// First, set up the testing environment
// Run the app server
const app = express();
const port = 3000;

// Declare middleware to parse JSON bodies
app.use(bodyParser.json());

// Access static files from ../public
app.use(express.static(path.join(__dirname, '../public')));

// Declare app endpoints to access in the test
app.post('/guess-letter', handleGuessLetter);
app.post('/start', handleStartGame);
app.post('/guess-word', handleGuessWord);

// Tests start here
describe('Test Pictoman server and endpoints', () => {
  it('should return 200 OK for the start endpoint', async () => {
    const response = await request(app).post('/start');
    expect(response.status).toBe(200);
  });

  it('should return 200 OK for the guess-letter endpoint when request is sent with appropriate letter message', async () => {
    const response = await request(app)
      .post('/guess-letter')
      // Ensure correct key and formatted message for the request
      .send({ message: 'A' });
    expect(response.status).toBe(200);
  });

  it('should return 200 OK for the guess-word endpoint when request is sent with appropriate word message', async () => {
    const response = await request(app)
      .post('/guess-word')
      // Ensure correct key and formatted message for the request
      .send({ message: 'example' });
    expect(response.status).toBe(200);
  });
});