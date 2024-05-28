import { Request, Response } from 'express';
import { GameState } from './gameState';

const gameState = new GameState();

export async function handleGuessWord(req: Request, res: Response) {
  const userGuess: string = req.body.message.toLowerCase();
  const { response, state } = await gameState.handleWordGuess(userGuess);
  res.send({
    response,
    ...state,
  });
}
