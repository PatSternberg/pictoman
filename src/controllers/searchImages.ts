import axios from 'axios';

// Function to get the first image url from a Google Images search
export async function searchImages(query: string) {
  try {
    // Make a request to the Google Images API
    const apiKey = 'AIzaSyCthbs1l2gtMuUSc1v5xKMekjuMTjwotLk'; // Replace 'YOUR_API_KEY' with your actual API key
    const cx = 'f3749c6cc599040b4'; // Replace 'YOUR_CUSTOM_SEARCH_ENGINE_ID' with your actual custom search engine ID
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
