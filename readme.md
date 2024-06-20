## What is Pictoman?

Pictoman is a multiplayer word guessing game which combines hangman and pictionary.

Pictoman is built with Typescript and HTML. It has no backend and the library of words is stored in `/pictoman/public/words.txt`. You can create Pictoman for differnt langauges by updating this file with new words.

## How to play Pictoman

Pictoman is a two player game.

On their turn players can guess a letter or guess the word. If a player guesses a correct letter, both players see the result. If a player guesses an incorrect letter, the other player gets to choose a section of the clue image to reveal, and then takes their turn.

## Running Pictoman

To play Pictoman, `cd` to `/pictoman` and run `npm start`.

## Running Pictoman in a development environment

You will need NPM installed globally to ensure you have the latest dependencies. Once you have this, `cd` to `/pictoman` and run `npm install`.

To start Typescript compiler watching for changes, `cd` to `/pictoman` and run `npx tsc -w`.

To run Pictoman in a development environment where changes will update in real time, `cd` to `/pictoman` and run `npm run dev`.

## Building Pictoman

To rebuild Pictoman, `cd` to `/pictoman` and run `npm run build`.

## Testing Pictoman

To run tests, `cd` to `/pictoman` and run `npm run test`.