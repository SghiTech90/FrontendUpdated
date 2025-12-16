import {baseURL} from './apiUtility';

export async function EEUpdPanelBuildingApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/EEUpdPanelBuilding', {
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
    console.error('EEUpdPanelBuildingApi Fetch Error:', error.message);
    return null;
  }
}

export async function EEUpdPanelCRFApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/EEUpdPanelCRF', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const raw = await response.text();
      if (__DEV__) {
        console.warn('Non-JSON response:', raw);
      }
      return null;
    }

    const result = await response.json();
    if (__DEV__) {
    }

    if (!response.ok) {
      throw new Error(result?.message || 'HTTP error');
    }

    return result;
  } catch (error) {
    console.error('EEUpdPanelCRFApi Fetch Error:', error?.message || error);
    return null;
  }
}

export async function EEUpdPanelAuntyApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/EEUpdPanelAunty', {
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
    console.error('EEupdatePanelAuntyApi  Fetch Error:', error.message);
    return null;
  }
}

export async function EEUpdPanelNABARDApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/EEUpdPanelNABARD', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const raw = await response.text();
      if (__DEV__) {
        console.warn('Non-JSON response:', raw);
      }
      return null;
    }
    const result = await response.json();
    if (__DEV__) {
      console.log('EEUpdPanelNABARD success:', result.success);
      console.log('Data length:', result.data?.length);
    }

    if (!response.ok) {
      throw new Error(result?.message || 'HTTP error');
    }

    return result;
  } catch (error) {
    console.error('EEUpdPanelNABARDApi Fetch Error:', error?.message || error);
    return null;
  }
}

export async function EEUpdPanelROADApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/EEUpdPanelROAD', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const raw = await response.text();
      if (__DEV__) {
        console.warn('Non-JSON response:', raw);
      }
      return null;
    }
    const result = await response.json();
    if (__DEV__) {
    }

    if (!response.ok) {
      throw new Error(result?.message || 'HTTP error');
    }

    return result;
  } catch (error) {
    console.error('EEUpdPanelROADApi Fetch Error:', error?.message || error);
    return null;
  }
}

export async function EEUpdPanel2515Api(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/EEUpdPanel2515', {
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
    console.error('EEUpdPanel2515Api Fetch Error:', error.message);
    return null;
  }
}

export async function EEUpdPanelDepositeFundApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/EEUpdPanelDepositeFund', {
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
    console.error('EEUpdPanelDepositeFundApi Fetch Error:', error.message);
    return null;
  }
}

export async function EEUpdPanelDPDCApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/EEUpdPanelDPDC', {
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
    console.error('EEUpdPanelDPDCApi Fetch Error:', error.message);
    return null;
  }
}

export async function EEUpdPanelGatAApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/EEUpdPanelGatA', {
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
    console.error('EEUpdPanelGatAApi Fetch Error:', error.message);
    return null;
  }
}

export async function EEUpdPanelGatDApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/EEUpdPanelGatD', {
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
    console.error('EEUpdPanelGatDApi Fetch Error:', error.message);
    return null;
  }
}

export async function EEUpdPanelGatFBCApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/EEUpdPanelGatFBC', {
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
    console.error('EEUpdPanelGatFBCApi Fetch Error:', error.message);
    return null;
  }
}

export async function EEUpdPanelMLAApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/EEUpdPanelMLA', {
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
    console.error('EEUpdPanelMLAApi Fetch Error:', error.message);
    return null;
  }
}

export async function EEUpdPanelMPApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/EEUpdPanelMP', {
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
    console.error('EEUpdPanelMPApi Fetch Error:', error.message);
    return null;
  }
}

export async function EEUpdPanelRBApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/EEUpdPanelRB', {
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
    console.error('EEUpdPanelRBApi Fetch Error:', error.message);
    return null;
  }
}

export async function EEUpdPanelNRBApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/EEUpdPanelNRB', {
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
    console.error('EEUpdPanelNRBApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPanelBuildingApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPanelBuilding', {
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
    console.error('ContUpdPanelBuildingApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPanelAuntyApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPanelAunty', {
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
    console.error('ContUpdPanelAuntyApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPanelROADApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPanelROAD', {
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
    console.error('ContUpdPanelROADApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPanelNABARDApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPanelNABARD', {
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
    console.error('ContUpdPanelNABARDApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPanelCrfApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPanelCrf', {
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
    console.error('ContUpdPanelCrfApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPanel2515Api(credentials) {
  console.log('ContUpdPanel2515Api',credentials)
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPanel2515', {
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
    console.error('ContUpdPanel2515Api Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPanelDeposite_fundApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPanelDeposite_fund', {
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
    console.error('ContUpdPanelDeposite_fundApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPanelDPDCApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPanelDPDC', {
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
    console.error('ContUpdPanelDPDCApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPanelGAT_AApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPanelGAT_A', {
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
    console.error('ContUpdPanelGAT_AApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPanelGAT_DApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPanelGAT_D', {
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
    console.error('ContUpdPanelGAT_DApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPanelGAT_FBCApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPanelGAT_FBC', {
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
    console.error('ContUpdPanelGAT_FBCApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPanelMLAApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPanelMLA', {
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
    console.error('ContUpdPanelMLAApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPanelMPApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPanelMP', {
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
    console.error('ContUpdPanelMPApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPanelResBuiApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPanelResBui', {
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
    console.error('ContUpdPanelResBuiApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPanelNonResBuiApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPanelNonResBui', {
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
    console.error('ContUpdPanelNonResBuiApi Fetch Error:', error.message);
    return null;
  }
}

export async function UpdateStatusBilidingApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/UpdateStatusBuilding', {
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
    console.error('UpdateStatusBuildingApi Fetch Error:', error.message);
    return null;
  }
}

export async function UpdateStatusRoadApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/UpdateStatusRoad', {
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
    console.error('UpdateStatusRoadApi Fetch Error:', error.message);
    return null;
  }
}

export async function UpdateStatusCrfApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/UpdateStatusCrf', {
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
    console.error('UpdateStatusCrfApi Fetch Error:', error.message);
    return null;
  }
}

export async function UpdateStatusAnnuityApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/UpdateStatusAunty', {
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
    console.error('UpdateStatusAnnuityApi Fetch Error:', error.message);
    return null;
  }
}

export async function UpdateStatusNabardApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/UpdateStatusNabard', {
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
    console.error('UpdateStatusNabardApi Fetch Error:', error.message);
    return null;
  }
}

export async function UpdateStatus2515Api(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/UpdateStatus2515', {
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
    console.error('UpdateStatus2515Api Fetch Error:', error.message);
    return null;
  }
}

export async function UpdateStatusDepositeFundApi(credentials) {
  try {
    const response = await fetch(
      baseURL + 'budget/UpdateStatusDepositeFund',
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
    console.error('UpdateStatusDepositeFundApi Fetch Error:', error.message);
    return null;
  }
}

export async function UpdateStatusDPDCApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/UpdateStatusDPDC', {
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
    console.error('UpdateStatusDPDCApi Fetch Error:', error.message);
    return null;
  }
}

export async function UpdateStatusGatAApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/UpdateStatusGatA', {
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
    console.error('UpdateStatusGatAApi Fetch Error:', error.message);
    return null;
  }
}

export async function UpdateStatusGatBApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/UpdateStatusGatB', {
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
    console.error('UpdateStatusGatBApi Fetch Error:', error.message);
    return null;
  }
}

export async function UpdateStatusGatFBCApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/UpdateStatusGatFBC', {
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
    console.error('UpdateStatusGatFBCApi Fetch Error:', error.message);
    return null;
  }
}

export async function UpdateStatusMLAApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/UpdateStatusMLA', {
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
    console.error('UpdateStatusMLAApi Fetch Error:', error.message);
    return null;
  }
}

export async function UpdateStatusMPApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/UpdateStatusMP', {
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
    console.error('UpdateStatusMPApi Fetch Error:', error.message);
    return null;
  }
}

export async function UpdateStatusNRBApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/UpdateStatusNRB', {
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
    console.error('UpdateStatusNRBApi Fetch Error:', error.message);
    return null;
  }
}

export async function UpdateStatusRBApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/UpdateStatusRB', {
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
    console.error('UpdateStatusRBApi Fetch Error:', error.message);
    return null;
  }
}

export async function CirclegetBuildingApi(credentials) {
  console.log('CirclegetBuildingApi credentials',credentials);
  try {
    const response = await fetch(baseURL + 'budget/CirclegetBuilding', {
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
    console.error('CirclegetBuildingApi Fetch Error:', error.message);
    return null;
  }
}

export async function CirclegetCRFApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/CirclegetCRF', {
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
    console.error('CirclegetCRFApi Fetch Error:', error.message);
    return null;
  }
}

export async function CirclegetAuntyApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/CirclegetAunty', {
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
    console.error('CirclegetAuntyApi Fetch Error:', error.message);
    return null;
  }
}

export async function CirclegetNABARDApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/CirclegetNABARD', {
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
    console.error('CirclegetNABARDApi Fetch Error:', error.message);
    return null;
  }
}

export async function CirclegetRoadApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/CirclegetRoad', {
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
    console.error('CirclegetRoadApi Fetch Error:', error.message);
    return null;
  }
}

export async function CirclegetDepositFundApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/CirclegetDepositFund', {
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
    console.error('CirclegetDepositFundApi Fetch Error:', error.message);
    return null;
  }
}

export async function CirclegetDPDCApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/CirclegetDPDC', {
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
    console.error('CirclegetDPDCApi Fetch Error:', error.message);
    return null;
  }
}

export async function CirclegetGATAApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/CirclegetGATA', {
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
    console.error('CirclegetGATAApi Fetch Error:', error.message);
    return null;
  }
}

export async function CirclegetGATFBCApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/CirclegetGATFBC', {
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
    console.error('CirclegetGATFBCApi Fetch Error:', error.message);
    return null;
  }
}

export async function CirclegetGATDApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/CirclegetGATD', {
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
    console.error('CirclegetGATDApi Fetch Error:', error.message);
    return null;
  }
}

export async function CirclegetMLAApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/CirclegetMLA', {
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
    console.error('CirclegetMLAApi Fetch Error:', error.message);
    return null;
  }
}

export async function Circleget2515Api(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/Circleget2515', {
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
    console.error('Circleget2515Api Fetch Error:', error.message);
    return null;
  }
}

export async function CirclegetResidentialBuildingApi(credentials) {
  try {
    const response = await fetch(
      baseURL + 'budget/CirclegetResidentialBuilding',
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
      'CirclegetResidentialBuildingApi Fetch Error:',
      error.message,
    );
    return null;
  }
}

export async function CirclegetNonResidentialBuildingApi(credentials) {
  try {
    const response = await fetch(
      baseURL + 'budget/CirclegetNonResidentialBuilding',
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
      'CirclegetNonResidentialBuildingApi Fetch Error:',
      error.message,
    );
    return null;
  }
}

// Contract Image
export async function ConUploadImageApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/uploadImage', {
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
    console.error('ConUploadImageApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPhotoBuildingApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPhotoBuilding', {
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
    console.error('ContUpdPhotoBuildingApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPhotoCrfApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPhotoCrf', {
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
    console.error('ContUpdPhotoCrfApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPhotoAuntyApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPhotoAunty', {
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
    console.error('ContUpdPhotoAuntyApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPhotoNabardApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPhotoNabard', {
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
    console.error('ContUpdPhotoNabardApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPhotoRoadApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPhotoRoad', {
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
    console.error('ContUpdPhotoRoadApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPhoto2515Api(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPhoto2515', {
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
    console.error('ContUpdPhoto2515Api Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPhotoDeposite_fundApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPhotoDeposite_fund', {
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
    console.error('ContUpdPhotoDeposite_fundApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPhotoDPDCApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPhotoDPDC', {
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
    console.error('ContUpdPhotoDPDCApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPhotoGAT_AApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPhotoGAT_A', {
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
    console.error('ContUpdPhotoGAT_AApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPhotoGAT_DApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPhotoGAT_D', {
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
    console.error('ContUpdPhotoGAT_DApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPhotoGAT_FBCApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPhotoGAT_FBC', {
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
    console.error('ContUpdPhotoGAT_FBCApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPhotoMLAApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPhotoMLA', {
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
    console.error('ContUpdPhotoMLAApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPhotoMPApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPhotoMP', {
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
    console.error('ContUpdPhotoMPApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPhotoNonResBuiApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPhotoNonResBui', {
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
    console.error('ContUpdPhotoNonResBuiApi Fetch Error:', error.message);
    return null;
  }
}

export async function ContUpdPhotoResBuiApi(credentials) {
  try {
    const response = await fetch(baseURL + 'budget/ContUpdPhotoResBui', {
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
    console.error('ContUpdPhotoResBuiApi Fetch Error:', error.message);
    return null;
  }
}