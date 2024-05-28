import { Request, Response } from 'express';
import { GameState } from './gameState';

const gameState = new GameState();

export async function handleStartGame(req: Request, res: Response) {
  const { response, state } = await gameState.start();
  res.send({
    response,
    ...state,
  });
}
