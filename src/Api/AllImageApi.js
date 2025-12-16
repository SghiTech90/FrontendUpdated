import { baseURL } from "./apiUtility";


export async function HomeAllimageapi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/allImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}: ${result.message || 'Unknown error'}`,
      );
    }
    return result;
  } catch (error) {
    console.error('HomeAllimageapi Fetch Error:', error.message);
    return null;
  }
}

export async function RollwiseImageApi(credentials) {
  console.log('RollwiseImageApi', credentials);
  try {
    const response = await fetch(baseURL + 'budget/ShowImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();
    console.log(result);
    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}: ${result.message || 'Unknown error'}`,
      );
    }
    return result;
  } catch (error) {
    console.error('RollwiseImageApi Fetch Error:', error.message);
    return null;
  }
}