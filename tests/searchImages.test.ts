// file: pictoman/tests/searchImages.test.ts
// BDD example with Gherkin (doesn't work as well to retrofit it, and not really with unit tests)
// Feature: Get a relevant clue image from Google Images
// Scenario: A new game starts
//   Given a new game has started
//   When the app makes an HTTP request to Google Images with the hidden word as the search term
//   Then response includes a relevant image for the app to display

// Import searchImages function to test and axios library for making HTTP requests
import { searchImages } from '../src/controllers/searchImages';
import axios from 'axios';

// Mock axios with jest.mock - unit tests will not make real API calls to avoid being locked out due to too many requests
jest.mock('axios');
// jest includes a utility type for mocking axios to cover all of its functionality
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Set up test suite
describe('Test searchImages function - unit tests - no real API calls', () => {
  // Set up test environment
  // Set up values for mock environment variables
  const apiKey = 'test-api-key';
  const cx = 'test-cx-id';

  // Set up variable for mocking image url
  const imageUrl = 'https://test.com/image.jpg';

  // Mock the environment variables to use th test values above instead of the actual ones
  beforeAll(() => {
    process.env.GOOGLE_API_KEY = apiKey;
    process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID = cx;
  });

  // Mock conditional Axios response when the call is made to return the imageUrl for 'test' or 'noImages'
  // or when the call is rejected
  beforeEach(() => {
    mockedAxios.get.mockImplementation((url, config) => {
      if (config?.params?.q === 'test') {
        return Promise.resolve({
          data: {
            items: [
              { link: imageUrl }
            ]
          }
        });
      } else if (config?.params?.q === 'noImages') {
        return Promise.resolve({
          data: {
            items: []
          }
        });
      } else {
        return Promise.reject(new Error('API call failed'));
      }
    });
  });

  // Reset mocks after each test
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return an appropriate image URL when a valid query is supplied', async () => {
    // Use await to make asynchronous call with valid search params
    const result = await searchImages('test');

    // Expect successful result
    expect(result).toEqual(imageUrl);
  });

  it('should return an empty string if no images are found even with valid search params', async () => {
    // Use await to make asynchronous call
    const result = await searchImages('noImages');

    // Expect empty string to be returned when no images are found
    expect(result).toEqual('');
  });

  it('should return an empty string if there is an error in the API call', async () => {
    const result = await searchImages('error');

    // Expect empty string to be returned when an error is thrown
    expect(result).toEqual('');
  });
});