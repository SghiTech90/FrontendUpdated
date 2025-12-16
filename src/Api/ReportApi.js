import {baseURL} from './apiUtility';

export async function MASTERHEADWISEREPOSTAnnuityApi(credentials) {
  try {
    const response = await fetch(
      baseURL + 'master/MASTERHEADWISEREPOSTAnnuity',
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
    console.error('MASTERHEADWISEREPOSTAnnuityApi Fetch Error:', error.message);
    return null;
  }
}

export async function MASTERHEADWISEREPOSTBuildingApi(credentials) {
  try {
    const response = await fetch(
      baseURL + 'master/MASTERHEADWISEREPOSTBuilding',
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
    console.error(
      'MASTERHEADWISEREPOSTBuildingApi Fetch Error:',
      error.message,
    );
    return null;
  }
}

export async function MASTERHEADWISEREPOSTRoadApi(credentials) {
  try {
    const response = await fetch(baseURL + 'master/MASTERHEADWISEREPOSTRoad', {
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
    console.error('MASTERHEADWISEREPOSTRoadApi Fetch Error:', error.message);
    return null;
  }
}

export async function MASTERHEADWISEREPOST2515Api(credentials) {
  try {
    const response = await fetch(baseURL + 'master/MASTERHEADWISEREPOST2515', {
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
    console.error('MASTERHEADWISEREPOST2515Api Fetch Error:', error.message);
    return null;
  }
}

export async function MASTERHEADWISEREPOSTDepositeFundApi(credentials) {
  try {
    const response = await fetch(
      baseURL + 'master/MASTERHEADWISEREPOSTDepositeFund',
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
    console.error(
      'MASTERHEADWISEREPOSTDepositeFundApi Fetch Error:',
      error.message,
    );
    return null;
  }
}

export async function MASTERHEADWISEREPOSTDPDCApi(credentials) {
  try {
    const response = await fetch(baseURL + 'master/MASTERHEADWISEREPOSTDPDC', {
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
    console.error('MASTERHEADWISEREPOSTDPDCApi Fetch Error:', error.message);
    return null;
  }
}

export async function MASTERHEADWISEREPOSTGatAApi(credentials) {
  try {
    const response = await fetch(baseURL + 'master/MASTERHEADWISEREPOSTGatA', {
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
    console.error('MASTERHEADWISEREPOSTGatAApi Fetch Error:', error.message);
    return null;
  }
}

export async function MASTERHEADWISEREPOSTGatDApi(credentials) {
  try {
    const response = await fetch(baseURL + 'master/MASTERHEADWISEREPOSTGatD', {
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
    console.error('MASTERHEADWISEREPOSTGatDApi Fetch Error:', error.message);
    return null;
  }
}

export async function MASTERHEADWISEREPOSTGatFBCApi(credentials) {
  try {
    const response = await fetch(
      baseURL + 'master/MASTERHEADWISEREPOSTGatFBC',
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
    console.error('MASTERHEADWISEREPOSTGatFBCApi Fetch Error:', error.message);
    return null;
  }
}

export async function MASTERHEADWISEREPOSTMLAApi(credentials) {
  try {
    const response = await fetch(baseURL + 'master/MASTERHEADWISEREPOSTMLA', {
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
    console.error('MASTERHEADWISEREPOSTMLAApi Fetch Error:', error.message);
    return null;
  }
}

export async function MASTERHEADWISEREPOSTMPApi(credentials) {
  try {
    const response = await fetch(baseURL + 'master/MASTERHEADWISEREPOSTMP', {
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
    console.error('MASTERHEADWISEREPOSTMPApi Fetch Error:', error.message);
    return null;
  }
}

export async function MASTERHEADWISEREPOSTNRBApi(credentials) {
  try {
    const response = await fetch(baseURL + 'master/MASTERHEADWISEREPOSTNRB', {
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
    console.error('MASTERHEADWISEREPOSTNRBApi Fetch Error:', error.message);
    return null;
  }
}

export async function MASTERHEADWISEREPOSTRBApi(credentials) {
  try {
    const response = await fetch(baseURL + 'master/MASTERHEADWISEREPOSTRB', {
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
    console.error('MASTERHEADWISEREPOSTRBApi Fetch Error:', error.message);
    return null;
  }
}

export async function MASTERHEADWISEREPOSTNabardApi(credentials) {
  try {
    const response = await fetch(
      baseURL + 'master/MASTERHEADWISEREPOSTNabard',
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
    console.error('MASTERHEADWISEREPOSTNabardApi Fetch Error:', error.message);
    return null;
  }
}

export async function MASTERHEADWISEREPOSTCRFApi(credentials) {
  try {
    const response = await fetch(baseURL + 'master/CRFHEADWISEREPORT', {
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
    console.error('MASTERHEADWISEREPOSTCRFApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContractorBuildingReportApi(credentials) {
  try {
    const response = await fetch(
      baseURL + 'budget/ContractorBuildingReportApi',
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
    console.error('ContractorBuildingReportApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContractorCRFReportApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContractorCRFReportApi', {
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
    console.error('ContractorCRFReportApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContractorNabardReportApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContractorNabardReportApi', {
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
    console.error('ContractorNabardReportApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContractorRoadReportApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContractorRoadReportApi', {
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
    console.error('ContractorRoadReportApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContractorAunnityReportApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContractorDPDCReportApi', {
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
    console.error('ContractorAunnityReportApi Fetch Error:', error.message);
    return null;
  }
}













