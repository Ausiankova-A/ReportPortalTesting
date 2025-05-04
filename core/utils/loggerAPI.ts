export function logRequest(method: string, endpoint: string, headers: any, body?: any) {
    console.log(`[REQUEST] ${method} ${endpoint}`);
    console.log('Headers:', headers);
    if (body) console.log('Body:', body);
  }
  
  export async function logResponse(response: any) {
    console.log(`[RESPONSE] ${response.status()} ${response.url()}`);
    const contentType = response.headers()['content-type'];
    if (contentType && contentType.includes('application/json')) {
      console.log('Body:', await response.json());
    } else {
      console.log('Body:', await response.text());
    }
  }
  