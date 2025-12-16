import {baseURL} from './apiUtility';

export async function notificationApi(credentials) {
  console.log("credentials",credentials)
  try {
    const response = await fetch(
      baseURL + 'notifications/upcoming-due-dates',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      },
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}: ${result.message || 'Unknown error'}`,
      );
    }
    return result;
  } catch (error) {
    console.error('notificationApi Fetch Error:', error.message);
    return null;
  }
}

export async function CircleNotificationTodayApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/CircleNotificationToday', {
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
    console.error('CircleNotificationTodayApi Fetch Error:', error.message);
    return null;
  }
}

export async function CircleNotificationWeekApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/CircleNotificationWeek', {
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
    console.error('CircleNotificationWeekApi Fetch Error:', error.message);
    return null;
  }
}

export async function CircleNotificationHalfMonthApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/CircleNotificationHalfMonth', {
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
    console.error('CircleNotificationHalfMonthApi Fetch Error:', error.message);
    return null;
  }
}

export async function CircleNotificationMonthApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/CircleNotificationMonth', {
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
    console.error('CircleNotificationMonthApi Fetch Error:', error.message);
    return null;
  }
}

export async function CircleNotificationBtnTodayApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/CircleNotificationBtnToday', {
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
    console.error('CircleNotificationBtnTodayApi Fetch Error:', error.message);
    return null;
  }
}

export async function CircleNotificationBtnWeekApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/CircleNotificationBtnWeek', {
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
    console.error('CircleNotificationBtnTodayApi Fetch Error:', error.message);
    return null;
  }
}

export async function CircleNotificationBtnHalfMonthApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/CircleNotificationBtnHalfMonth', {
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
    console.error('CircleNotificationBtnTodayApi Fetch Error:', error.message);
    return null;
  }
}

export async function CircleNotificationBtnMonthApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/CircleNotificationBtnMonth', {
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
    console.error('CircleNotificationBtnTodayApi Fetch Error:', error.message);
    return null;
  }
}

export async function CircleTotaNotificationCountApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/CircleTotalNotificationCount', {
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
    console.error('CircleTotaNotificationCountApi Fetch Error:', error.message);
    return null;
  }
}
