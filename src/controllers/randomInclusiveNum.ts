// file: pictoman/src/controllers/randomInclusiveNum.ts
// Function to get a random integer between two values (inclusive)
export function getRandomIntInclusive(min: number, max: number): number {
  try {
    // Check if min and max are the same
    if (min === max) {
      throw new Error("'min' and 'max' parameters must not be the same");
    }

    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);

    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);

  // Handle errors
  } catch (error) {
    // Check if error is defined
    if (error instanceof Error) {
      // Log error in console then rethrow it
      console.error(error.message);
      throw error;
    } else {
      // Log generic error in console then rethrow it
      console.error("An unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}
