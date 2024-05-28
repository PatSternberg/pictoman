import { getRandomIntInclusive } from './randomInclusiveNum';
import { searchImages } from './searchImages';
import { newRandomWord } from './randomWord';

export class GameState {
  private randomWord: string = '';
  private guessNumber: number = 10;
  private correctLetters: string[] = [];
  private incorrectLetters: string[] = [];
  private clipRadius: number = 0;
  private imageURL: string = '';

  constructor() {
    this.resetState();
  }

  private async resetState() {
    this.correctLetters = [];
    this.incorrectLetters = [];
    this.guessNumber = 10;
    this.clipRadius = 0;
    this.randomWord = newRandomWord('');
    console.log(`Word to guess is: ${this.randomWord}`);
    this.imageURL = await searchImages(this.randomWord);
  }

  public async handleLetterGuess(userGuess: string): Promise<{ response: string, state: any }> {
    let result = `No, that's not right`;
    
    if (!userGuess || userGuess.length !== 1) {
      result = `Guess a single letter`;
    } else if (this.guessNumber < 1) {
      result = `You're out of guesses - resetting with a new word`;
      await this.resetState();
    } else {
      if ( this.correctLetters.includes(userGuess) || this.incorrectLetters.includes(userGuess) ) {
        result = `Already guessed this letter`;
      } else if (this.randomWord.includes(userGuess)) {
        this.correctLetters.push(userGuess);
        this.guessNumber--;
        this.clipRadius += 2.5;
        result = `Well done! That's correct.`;
      } else if (!this.randomWord.includes(userGuess)) {
        this.incorrectLetters.push(userGuess);
        this.guessNumber--;
        this.clipRadius += 2.5;
        result = `No, that's not correct.`;
      }
    }

    return {
      response: result,
      state: this.getState()
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
