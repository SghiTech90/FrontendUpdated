import { baseURL } from "./apiUtility";


export async function contractorCountApi(credentials) {
  try {  
    const response = await fetch(baseURL + "budget/contractorGraph", {
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
    console.error("contractorCountApi Fetch Error:", error.message);
    return null; 
  }
}
