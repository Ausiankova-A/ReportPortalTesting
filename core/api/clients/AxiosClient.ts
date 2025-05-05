import axios, { AxiosInstance, AxiosError } from 'axios';
import { IApiClient, IApiResponse } from '@core/api/interfaces/IApiClient';
import { logRequest, logResponse } from 'core/utils/loggerAPI';

export class AxiosClient implements IApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string, token?: string) {
    this.client = axios.create({
      baseURL,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  async get<T = any>(endpoint: string, headers: Record<string, string> = {}): Promise<IApiResponse<T>> {
    logRequest('GET', endpoint, headers);
    try {
      const response = await this.client.get<T>(endpoint, { headers });
      logResponse(response);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async post<T = any>(endpoint: string, data = {}, headers: Record<string, string> = {}): Promise<IApiResponse<T>> {
    logRequest('POST', endpoint, headers, data);
    try {
      const response = await this.client.post<T>(endpoint, data, { headers });
      logResponse(response);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async put<T = any>(endpoint: string, data = {}, headers: Record<string, string> = {}): Promise<IApiResponse<T>> {
    logRequest('PUT', endpoint, headers, data);
    try {
      const response = await this.client.put<T>(endpoint, data, { headers });
      logResponse(response);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async delete<T = any>(endpoint: string, headers: Record<string, string> = {}): Promise<IApiResponse<T>> {
    logRequest('DELETE', endpoint, headers);
    try {
      const response = await this.client.delete<T>(endpoint, { headers });
      logResponse(response);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return this.handleError(error);
    }
  }



  private handleError(error: AxiosError): IApiResponse<any> {
    if (error.isAxiosError && error.response) {
      logResponse(error.response);
      return { status: error.response.status, data: error.response.data };
    }

    logResponse({ status: 0, data: { message: `Request failed: ${error.message}` } });
    return { status: 0, data: { message: `Request failed: ${error.message}` } };
  }
}


