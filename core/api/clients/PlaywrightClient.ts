import { APIRequestContext, request, APIResponse } from '@playwright/test';
import { logRequest, logResponse } from 'core/utils/loggerAPI';
import { IApiClient, IApiResponse } from '@core/api/interfaces/IApiClient';
import * as dotenv from 'dotenv';
dotenv.config();

const useProxy = process.env.USE_PROXY === 'true';
const proxyUrl = process.env.PROXY_URL;

export class PlaywrightClient implements IApiClient {
  private readonly requestContext: Promise<APIRequestContext>;

  constructor(baseURL: string, token?: string) {
    this.requestContext = request.newContext({
      baseURL,
      extraHTTPHeaders: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'Content-Type': 'application/json',
      },
      ...(useProxy && proxyUrl ? { proxy: { server: proxyUrl } } : {}),
    });
  }

  private async send<T = any>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    data: any = {},
    headers: Record<string, string> = {}
  ): Promise<IApiResponse<T>> {
    logRequest(method, endpoint, headers, data);

    const context = await this.requestContext;
    const options: any = { headers };

    if (method === 'POST' || method === 'PUT') {
      options.data = data;
    }
    // @ts-ignore
    const response: APIResponse = await context[method.toLowerCase() as keyof APIRequestContext](endpoint, options);

    logResponse(response);

    return {
      status: response.status(),
      data: await response.json(),
    };
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
}
