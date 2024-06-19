// file: pictoman/tests/searchImages.test.ts
import { searchImages } from '../src/controllers/searchImages';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Test searchImages function - unit tests - no real API calls', () => {
  const apiKey = 'test-api-key';
  const cx = 'test-cx-id';

  // Get the API key and search engine from .env before the tests run
  beforeAll(() => {
    process.env.GOOGLE_API_KEY = apiKey;
    process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID = cx;
  });

  it('should return an appropriate image URL when a valid query is supplied', async () => {
    const imageUrl = 'https://test.com/image.jpg';
    
    // Mock Axios response when the call is made to return the test imageUrl
    mockedAxios.get.mockResolvedValue({
      data: {
        items: [
          { link: imageUrl }
        ]
      }
    });

    // Use await to make asynchronous call with valid search params
    const result = await searchImages('test');

    // Expect successful result
    expect(result).toEqual(imageUrl);
  });

  it('should return an empty string if no images are found even with valid search params', async () => {

    // Mock Axios response when the call is made to return an empty array
    mockedAxios.get.mockResolvedValue({
      data: {
        items: []
      }
    });

    // Use await to make asynchronous call
    const result = await searchImages('test');

    // Expect empty string to be returned when no images are found
    expect(result).toEqual('');
  });

  it('should return an empty string if there is an error in the API call', async () => {

    // Mock Axios response to throw an error when the call is rejected
    mockedAxios.get.mockRejectedValue(new Error('API call failed'));

    const result = await searchImages('test');
    // Expect empty string to be returned when an error is thrown
    expect(result).toEqual('');
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});