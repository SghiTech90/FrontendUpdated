import {baseURL, baseURL2, baseURL3} from './apiUtility';

export async function BudgetMaster2515Api(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/BudgetMaster2515', {
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
    console.error('BudgetMaster2515 Fetch Error:', error.message);
    return null;
  }
}

export async function BudgetMasterNABARDApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/BudgetMasterNABARD', {
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
    console.error('BudgetMasterNABARDApi Fetch Error:', error.message);
    return null;
  }
}

export async function BudgetMasterRoadApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/BudgetMasterRoad', {
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
    console.error('BudgetMasterRoadApi Fetch Error:', error.message);
    return null;
  }
}

export async function BudgetMasterMPApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/BudgetMasterMP', {
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
    console.error('BudgetMasterMPApi Fetch Error:', error.message);
    return null;
  }
}

export async function BudgetMasterMLAApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/BudgetMasterMLA', {
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
    console.error('BudgetMasterMPApi Fetch Error:', error.message);
    return null;
  }
}

export async function BudgetMasterGAT_FBCApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/BudgetMasterGAT_FBC', {
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
    console.error('BudgetMasterMPApi Fetch Error:', error.message);
    return null;
  }
}

export async function BudgetMasterGAT_DApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/BudgetMasterGAT_D', {
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
    console.error('BudgetMasterMPApi Fetch Error:', error.message);
    return null;
  }
}

export async function BudgetMasterGAT_AApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/BudgetMasterGAT_A', {
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
    console.error('BudgetMasterMPApi Fetch Error:', error.message);
    return null;
  }
}

export async function BudgetMasterDPDCApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/BudgetMasterDPDC', {
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
    console.error('BudgetMasterMPApi Fetch Error:', error.message);
    return null;
  }
}

export async function BudgetMasterDepositFundApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/BudgetMasterDepositFund', {
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
    console.error('BudgetMasterMPApi Fetch Error:', error.message);
    return null;
  }
}

export async function BudgetMasterCRFApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/BudgetMasterCRF', {
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
    console.error('BudgetMasterMPApi Fetch Error:', error.message);
    return null;
  }
}

export async function BudgetMasterBuildingApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/BudgetMasterBuilding', {
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
    console.error('BudgetMasterMPApi Fetch Error:', error.message);
    return null;
  }
}

export async function BudgetMasterAuntyApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/BudgetMasterAunty', {
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
    console.error('BudgetMasterMPApi Fetch Error:', error.message);
    return null;
  }
}

export async function BudgetMasterAggregateApi(credentials) { 
  try {
    const response = await fetch(baseURL3 + 'aggregate',
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
    console.error('BudgetMasterAggregateApi Fetch Error:', error.message);
    return null;
  }
}
