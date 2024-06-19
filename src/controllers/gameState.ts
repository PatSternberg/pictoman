// file: pictoman/src/controllers/gameState.ts
import { getRandomIntInclusive } from './randomInclusiveNum';
import { searchImages } from './searchImages';
import { newRandomWord } from './randomWord';

export class GameState {
  private randomWord: string = '';
  private guessNumber: number = 10;
  private correctLetters: string[] = [];
  private incorrectLetters: string[] = [];
  private clipRadius: number = 0;
  private clipX: number = 50;
  private clipY: number = 50;
  private imageURL: string = '';

  constructor() {
    this.startNewGame();
  }

  private async startNewGame() {
    this.randomWord = newRandomWord('');
    console.log(`Word to guess is: ${this.randomWord}`);
    this.guessNumber = 10;
    this.correctLetters = [];
    this.incorrectLetters = [];
    this.clipRadius = 0;
    this.clipX = getRandomIntInclusive(10, 90);
    this.clipY = getRandomIntInclusive(10, 90);
    this.imageURL = await searchImages(this.randomWord);
  }

  public async handleLetterGuess(userGuess: string): Promise<{ response: string, state: any }> {
    let result = `No, that's not right`;
    
    if (!userGuess || userGuess.length !== 1) {
      result = `Guess a single letter`;
    } else if (this.guessNumber < 1) {
      result = `You're out of guesses - resetting with a new word`;
      await this.startNewGame();
    } else {
      if ( this.correctLetters.includes(userGuess) || this.incorrectLetters.includes(userGuess) ) {
        result = `Already guessed this letter`;
      } else if (this.randomWord.includes(userGuess)) {
        this.correctLetters.push(userGuess);
        this.guessNumber--;
        this.clipRadius += 3;
        result = `Well done! That's correct.`;
      } else if (!this.randomWord.includes(userGuess)) {
        this.incorrectLetters.push(userGuess);
        this.guessNumber--;
        this.clipRadius += 3;
        result = `No, that's not correct.`;
      }
    }

    return {
      response: result,
      state: this.getState()
    };
  }

  public async handleWordGuess(userGuess: string): Promise<{ response: string, state: any }> {
    let result = "No, that's not the right word";

    if (!userGuess) {
      result = `Guess a word`;
    } else if (this.randomWord === userGuess) {
      result = `Well done! That's the correct word. A new word has been chosen.`;
      await this.startNewGame();
    }

    return {
      response: result,
      state: this.getState(),
    };
  }

  public async start(): Promise<{ response: string, state: any }> {
    await this.startNewGame();
    return {
      response: 'Time to get guessing!',
      state: this.getState(),
    };
  }

  public getState() {
    return {
      correctLetters: this.correctLetters,
      incorrectLetters: this.incorrectLetters,
      guessNumber: this.guessNumber,
      clipRadius: this.clipRadius,
      clipX: getRandomIntInclusive(10, 90),
      clipY: getRandomIntInclusive(10, 90),
      imageURL: this.imageURL,
    };
  }
}
