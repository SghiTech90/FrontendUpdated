import { baseURL } from "./apiUtility";


export async function countApi(credentials) {
  try {  
    const response = await fetch(baseURL + "budget/count", {
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
    console.error("CountApi Fetch Error:", error.message);
    return null; 
  }
}


export async function perSubDivCountApi(credentials) {
  try {  
    const response = await fetch(baseURL + "budget/upvibhag-counts", {
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
    console.error("perSubDivCountApi API Fetch Error:", error.message);
    return null; 
  }
}