import { AxiosClient } from '@core/api/clients/AxiosClient';
import dotenv from 'dotenv';
import { IApiClient } from '@core/api/interfaces/IApiClient';
import { PlaywrightClient } from '@core/api/clients/PlaywrightClient';

dotenv.config();

export async function getAuthToken(): Promise<string> {
  const baseURL = process.env.REPORT_PORTAL_URL || '';
  const username = process.env.LOGIN || '';
  const password = process.env.PASSWORD || '';

  if (!baseURL || !username || !password) {
    throw new Error('One of required .env values (REPORT_PORTAL_URL, LOGIN, PASSWORD) is missing');
  }

  const clientType = process.env.API_CLIENT || 'playwright';
  let client: IApiClient;

  switch (clientType) {
    case 'axios':
      client = new AxiosClient(baseURL);
      break;
    case 'playwright':
    default:
      client = new PlaywrightClient(baseURL);
      break;
  }

  const body = new URLSearchParams();
  body.append('grant_type', 'password');
  body.append('username', username);
  body.append('password', password);

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic dWk6dWltYW4=', 
  };

  try {
    const response = await client.post('/uat/sso/oauth/token', body.toString(), headers);

    let statusCode: number;

  if (typeof response.status === 'function') {
    // Playwright
    // @ts-ignore
    statusCode = response.status();
  } else {
    // Axios
    statusCode = response.status;
  }

  if (statusCode !== 200) {
    throw new Error(`Login failed: ${statusCode}`);
  }
// @ts-ignore
    const responseBody = typeof response.json === 'function' 
    // @ts-ignore
      ? await response.json() 
      : response.data; 

    if (!responseBody.access_token) {
      throw new Error('No access_token received in login response');
    }

    return responseBody.access_token;
  } catch (error) {
    console.error('Error during token request:', error);
    throw new Error('Authentication failed');
  }
}