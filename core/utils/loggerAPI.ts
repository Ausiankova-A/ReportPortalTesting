export function logRequest(method: string, endpoint: string, headers: any, body?: any) {
    console.log(`[REQUEST] ${method} ${endpoint}`);
    console.log('Headers:', headers);
    if (body) console.log('Body:', body);
  }
  export async function logResponse(response: any) {
    // Playwright
    if (typeof response.status === 'function' && typeof response.url === 'function') {
      console.log(`[RESPONSE] ${response.status()} ${response.url()}`);
      
      const contentType = response.headers()['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const body = await response.body(); 
        try {
          const jsonBody = JSON.parse(body.toString());
          console.log('Body:', jsonBody);  
        } catch (error) {
          console.log('Error parsing JSON:', error);
          console.log('Raw Body:', body.toString()); 
        }
      } else {
        console.log('Body: Not a JSON response');
      }
    } 
    // Axios
    else if (response.status) {
      console.log(`[RESPONSE] ${response.status} ${response.request.res.responseUrl}`);
  
      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        if (response.data) {
          console.log('Body:', response.data); 
        } else {
          console.log('No JSON body');
        }
      } else {
        console.log('Body: Not a JSON response');
      }
    }
  }