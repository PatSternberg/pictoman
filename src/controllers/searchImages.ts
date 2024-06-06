import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

// Function to get the first image url from a Google Images search
export async function searchImages(query: string) {
  try {
    // Make a request to the Google Images API
    // Get API key and custom search engine from environment variables
    const apiKey = process.env.GOOGLE_API_KEY;
    const cx = process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID;

    const response = await axios.get('https://www.googleapis.com/customsearch/v1', 
      {
        params: {
          key: apiKey,
          cx: cx,
          q: query,
          searchType: 'image',
          num: 1 // Limit the number of results to 1
        },
      },
    );

    // Extract the first image URL from the response
    console.log('First image URL:', response.data.items[0].link);
    return response.data.items[0].link;
  } catch (error) {
    console.log('Error occurred during image search:', error);
    return ''; // Return an empty string if there's an error
  }
}
