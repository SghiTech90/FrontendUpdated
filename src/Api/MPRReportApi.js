import { baseURL } from "./apiUtility";

export async function buildingAllHEADApi(credentials) {
  try {  
    const response = await fetch(baseURL + "allHead/buildingAllHEAD", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${result.message || "Unknown error"}`);
    }

    return result;
  } catch (error) {
    console.error("buildingAllHEADApi Fetch Error:", error.message);
    return null; 
  }
}

export async function CrfMPRreportAllHEADApi(credentials) {
  try {  
    const response = await fetch(baseURL + "allHead/CrfMPRreportAllHEAD", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${result.message || "Unknown error"}`);
    }

    return result;
  } catch (error) {
    console.error("CrfMPRreportAllHEADApi Fetch Error:", error.message);
    return null; 
  }
}

export async function ROADAllHEADApi(credentials) {
  try {  
    const response = await fetch(baseURL + "allHead/ROADAllHEAD", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${result.message || "Unknown error"}`);
    }

    return result;
  } catch (error) {
    console.error("ROADAllHEADApi Fetch Error:", error.message);
    return null; 
  }
}

export async function NABARDAllHEADApi(credentials) {
  try {  
    const response = await fetch(baseURL + "allHead/NABARDAllHEAD", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${result.message || "Unknown error"}`);
    }

    return result;
  } catch (error) {
    console.error("NABARDAllHEADApi Fetch Error:", error.message);
    return null; 
  }
}


export async function AunnityAllHEADApi(credentials) {
try {  
  const response = await fetch(baseURL + "allHead/AunnityAllHEAD", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json" 
    },
    body: JSON.stringify(credentials),
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${result.message || "Unknown error"}`);
  }

  return result;
} catch (error) {
  console.error("AunnityAllHEADApi Fetch Error:", error.message);
  return null; 
}
}

