import { APIClient } from './apiClient';
import dotenv from 'dotenv';

dotenv.config();

export async function getAuthToken(): Promise<string> {
  const baseURL = process.env.REPORT_PORTAL_URL || '';
  const username = process.env.LOGIN || '';
  const password = process.env.PASSWORD || '';

  if (!baseURL || !username || !password) {
    throw new Error('One of required .env values (REPORT_PORTAL_URL, LOGIN, PASSWORD) is missing');
  }

  const client = new APIClient(baseURL);

  const body = new URLSearchParams();
  body.append('grant_type', 'password');
  body.append('username', username);
  body.append('password', password);


  const response = await client.post('/uat/sso/oauth/token', body.toString(), {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic dWk6dWltYW4=',
  });

  if (!response.ok()) {
    throw new Error(`Login failed: ${response.status()}`);
  }

  const responseBody = await response.json();

  if (!responseBody.access_token) {
    throw new Error('No access_token received in login response');
  }

  return responseBody.access_token;
}
