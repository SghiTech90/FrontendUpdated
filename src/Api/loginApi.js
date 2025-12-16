import { baseURL } from "./apiUtility";

export async function loginApi(credentials) {
  console.log('loginApi credentials',credentials);
  try {  
    const response = await fetch(baseURL + "user/login", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(credentials),
    });

    const responseText = await response.text(); 

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${responseText || "Unknown error"}`);
    }

    return JSON.parse(responseText); 
  } catch (error) {
    console.error("Login API Fetch Error:", error.message);
    return null; 
  }
}
  

  export async function verificationOtpSendApi(params) {
  try {  
    const response = await fetch(baseURL + "user/verify-otp", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(params),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${result.message || "Unknown error"}`);
    }

    return result;
  } catch (error) {
    console.error("verificationOtpSendApi API Fetch Error:", error.message);
    return null; 
  }
}

export async function resendOtpApi(params) {
  try {  
    const response = await fetch(baseURL + "user/resend-otp", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(params),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${result.message || "Unknown error"}`);
    }

    return result;
  } catch (error) {
    console.error("verificationOtpSendApi API Fetch Error:", error.message);
    return null; 
  }
}

