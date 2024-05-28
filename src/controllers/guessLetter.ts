import { Request, Response } from 'express';
import { GameState } from './gameState';

const gameState = new GameState();

export async function handleGuessLetter(req: Request, res: Response) {
  const userGuess: string = req.body.message.toUpperCase();
  const { response, state } = await gameState.handleLetterGuess(userGuess);
  res.send({
    response,
    ...state,
  });
}
