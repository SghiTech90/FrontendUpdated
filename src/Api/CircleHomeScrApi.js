import {baseURL} from './apiUtility';

export async function CircleWiseBarChartApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/CircleChartCount', {
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
    console.error('CircleChartCountApi Fetch Error:', error.message);
    return null;
  }
}

export async function CirclePieChartCountApi(credentials) {
    try {
    const response = await fetch(baseURL + 'budget/CirclePieChartCount', {
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
    console.error('CirclePieChartCountApi Fetch Error:', error.message);
    return null;
  }
}
