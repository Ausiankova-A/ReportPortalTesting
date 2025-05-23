import axios, { AxiosInstance, AxiosError, Method } from 'axios';
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

  private async send<T = any>(
    method: Method,
    endpoint: string,
    data: any = {},
    headers: Record<string, string> = {}
  ): Promise<IApiResponse<T>> {
    logRequest(method, endpoint, headers, data);
    try {
      const config = { method, url: endpoint, headers, data };
      const response = await this.client.request<T>(config);
      logResponse(response);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  async get<T = any>(endpoint: string, headers = {}): Promise<IApiResponse<T>> {
    return this.send('GET', endpoint, {}, headers);
  }

  async post<T = any>(endpoint: string, data = {}, headers = {}): Promise<IApiResponse<T>> {
    return this.send('POST', endpoint, data, headers);
  }

  async put<T = any>(endpoint: string, data = {}, headers = {}): Promise<IApiResponse<T>> {
    return this.send('PUT', endpoint, data, headers);
  }

  async delete<T = any>(endpoint: string, headers = {}): Promise<IApiResponse<T>> {
    return this.send('DELETE', endpoint, {}, headers);
  }

  private handleError(error: AxiosError): IApiResponse<any> {
    if (error.response) {
      logResponse(error.response);
      return { status: error.response.status, data: error.response.data };
    }
    logResponse({ status: 0, data: { message: `Request failed: ${error.message}` } });
    return { status: 0, data: { message: `Request failed: ${error.message}` } };
  }
}
