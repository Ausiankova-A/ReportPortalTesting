import { APIRequestContext, request, APIResponse } from '@playwright/test';
import { logRequest, logResponse } from 'core/utils/loggerAPI';
import { IApiClient } from '@core/api/interfaces/IApiClient';

export class PlaywrightClient implements IApiClient {
  private request: Promise<APIRequestContext>;

  constructor(baseURL: string, token?: string) {
    this.request = request.newContext({
      baseURL,
      extraHTTPHeaders: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'Content-Type': 'application/json',
      },
      proxy: {
        server: 'http://127.0.0.1:8888', 
      },
    });
  }

  async get(endpoint: string, headers = {}) {
    logRequest('GET', endpoint, headers);
    const response: APIResponse = await (await this.request).get(endpoint, { headers });
    logResponse(response);
    return {
      status: response.status(),  
      data: await response.json(),
    };
  }

  async post(endpoint: string, data = {}, headers = {}) {
    logRequest('POST', endpoint, headers, data);
    const response: APIResponse = await (await this.request).post(endpoint, { data, headers });
    logResponse(response);
    return {
      status: response.status(), 
      data: await response.json(),
    };
  }

  async put(endpoint: string, data = {}, headers = {}) {
    logRequest('PUT', endpoint, headers, data);
    const response: APIResponse = await (await this.request).put(endpoint, { data, headers });
    logResponse(response);
    return {
      status: response.status(), 
      data: await response.json(),
    };
  }

  async delete(endpoint: string, headers = {}) {
    logRequest('DELETE', endpoint, headers);
    const response: APIResponse = await (await this.request).delete(endpoint, { headers });
    logResponse(response);
    return {
      status: response.status(),
      data: await response.json(),
    };
  }
}

