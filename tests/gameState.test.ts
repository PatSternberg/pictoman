// file: tests/gameState.test.ts
import { GameState } from '../src/controllers/gameState';
import { getRandomIntInclusive } from '../src/controllers/randomInclusiveNum';
import { searchImages } from '../src/controllers/searchImages';
import { newRandomWord } from '../src/controllers/randomWord';

// Mock the dependencies
jest.mock('../src/controllers/randomInclusiveNum');
jest.mock('../src/controllers/searchImages');
jest.mock('../src/controllers/randomWord');

// Silence console.log to reduce unwanted logs during tests
jest.spyOn(console, 'log').mockImplementation(() => {});

describe('Test gameState initialises and functions as expected', () => {
  let gameState: GameState;

  beforeEach(async () => {
    gameState = new GameState();
    (newRandomWord as jest.Mock).mockReturnValue('test');
    (searchImages as jest.Mock).mockResolvedValue('https://example.com/test_image.jpg');
    (getRandomIntInclusive as jest.Mock).mockReturnValue(50);
    
    await gameState['startNewGame']();  // Ensure startNewGame runs before each test
  });

  it('initialises with correct default values', async () => {
    const state = await gameState.getState();

    expect(state).toHaveProperty('correctLetters');
    expect(state).toHaveProperty('incorrectLetters');
    expect(state).toHaveProperty('guessNumber');
    expect(state).toHaveProperty('clipRadius');
    expect(state).toHaveProperty('clipX');
    expect(state).toHaveProperty('clipY');
    expect(state).toHaveProperty('imageURL');
  });

  it('startNewGame initialises the state correctly', async () => {
    await gameState['startNewGame']();
  
    const state = await gameState.getState();
  
    expect(state).toEqual({
      correctLetters: [],
      incorrectLetters: [],
      guessNumber: 10,
      clipRadius: 0,
      clipX: expect.any(Number),
      clipY: expect.any(Number),
      imageURL: 'https://example.com/test_image.jpg'
    });
  });

  it('handleLetterGuess handles input validation', async () => {
    let response = await gameState.handleLetterGuess('');
    expect(response.response).toBe('Guess a single letter');

    response = await gameState.handleLetterGuess('ab');
    expect(response.response).toBe('Guess a single letter');
  });

  it('handleLetterGuess handles correct guess', async () => {
    await gameState['startNewGame']();

    const response = await gameState.handleLetterGuess('t');
    expect(response.response).toBe('Well done! That\'s correct.');
    expect(gameState.getState().correctLetters).toContain('t');
  });

  it('handleLetterGuess handles incorrect guess', async () => {
    await gameState['startNewGame']();

    const response = await gameState.handleLetterGuess('x');
    expect(response.response).toBe('No, that\'s not correct.');
    expect(gameState.getState().incorrectLetters).toContain('x');
  });

  it('handleWordGuess handles correct guess', async () => {
    await gameState['startNewGame']();

    const response = await gameState.handleWordGuess('test');
    expect(response.response).toBe('Well done! That\'s the correct word. A new word has been chosen.');
  });

  it('start method initializes the game', async () => {
    const response = await gameState.start();
    expect(response.response).toBe('Time to get guessing!');
    expect(gameState.getState().imageURL).toBe('https://example.com/test_image.jpg');
  });

  it('getState returns the current state', async () => {
    const state = await gameState.getState();
    expect(state).toHaveProperty('correctLetters');
    expect(state).toHaveProperty('incorrectLetters');
    expect(state).toHaveProperty('guessNumber');
    expect(state).toHaveProperty('clipRadius');
    expect(state).toHaveProperty('clipX');
    expect(state).toHaveProperty('clipY');
    expect(state).toHaveProperty('imageURL');
  });
});
