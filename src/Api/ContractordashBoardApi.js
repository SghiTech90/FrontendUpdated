import {baseURL} from './apiUtility';

export async function contractorCountApi(credentials) {
  if (
    !credentials ||
    !credentials.office ||
    credentials.office === 'null' ||
    credentials.office === 'undefined'
  ) {
    console.warn('contractorCountApi called without a valid office value');
    return null;
  }
  try {
    const response = await fetch(baseURL + 'budget/contractorGraph', {
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
    console.error('contractorCountApi Fetch Error:', error.message);
    return null;
  }
}

export async function DeputyCountApi(credentials) {
  if (
    !credentials ||
    !credentials.office ||
    credentials.office === 'null' ||
    credentials.office === 'undefined'
  ) {
    console.warn('DeputyCountApi called without a valid office value');
    return null;
  }
  try {
    const response = await fetch(baseURL + 'budget/deputyGraph', {
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
    console.error('deputyCountApi Fetch Error:', error.message);
    return null;
  }
}
