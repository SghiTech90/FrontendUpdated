import {baseURL} from './apiUtility';

export async function Cont2515Api(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/Cont2515', {
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
    console.error('Cont2515Api Fetch Error:', error.message);
    return null;
  }
}

export async function ContAnnuityApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContAnnuity', {
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
    console.error('ContAnnuityApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContBuildingApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContBuilding', {
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
    console.error('ContBuildingApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContNABARDApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContNABARD', {
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
    console.error('ContNABARDApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContSHDORApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContSHDOR', {
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
    console.error('ContSHDORApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContCRFApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContCRF', {
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
    console.error('ContCRFApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContMLAApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContMLA', {
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
    console.error('ContMLAApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContMPApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContMP', {
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
    console.error('ContMPApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContDPDCApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContDPDC', {
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
    console.error('ContDPDCApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContGAT_AApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContGAT_A', {
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
    console.error('ContGAT_AApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContDepositFundApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContDepositFund', {
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
    console.error('ContDepositFundApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContGAT_DApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContGAT_D', {
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
    console.error('ContGAT_DApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContGAT_FBCApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContGAT_FBC', {
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
    console.error('ContGAT_FBCApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContResidentialBuilding2216Api(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContResidentialBuilding2216', {
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
    console.error('ContResidentialBuilding2216Api Fetch Error:', error.message);
    return null;
  }
}

export async function ContNonResidentialBuilding2909Api(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContNonResidentialBuilding2909', {
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
    console.error(
      'ContNonResidentialBuilding2909Api Fetch Error:',
      error.message,
    );
    return null;
  }
}
