import { PlaywrightClient } from '@core/api/clients/PlaywrightClient';
import { AxiosClient } from '@core/api/clients/AxiosClient'; 
import { IApiClient } from '@core/api/interfaces/IApiClient';
import { getAuthToken } from 'core/api/auth';
import dotenv from 'dotenv';
dotenv.config();

export async function createApiClient(): Promise<IApiClient> {
  const token = await getAuthToken();
  const baseURL = process.env.REPORT_PORTAL_URL!;

  switch (process.env.API_CLIENT) {
    case 'axios':
      return new AxiosClient(baseURL, token);
    case 'playwright':
    default:
      return new PlaywrightClient(baseURL, token);
  }
}
