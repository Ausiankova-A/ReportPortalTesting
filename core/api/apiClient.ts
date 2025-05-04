import { APIRequestContext, request } from '@playwright/test';
import { logRequest, logResponse } from 'core/utils/loggerAPI';

export class APIClient {
  request: Promise<APIRequestContext>;

  constructor(baseURL: string, extraHeaders: Record<string, string> = {}) {
    this.request = request.newContext({
      baseURL,
      extraHTTPHeaders: {
        ...extraHeaders,
      },
    //   proxy: {
    //     server: 'http://127.0.0.1:8888', // если не нужен — можно убрать
    //   },
    });
  }

  async get(endpoint: string, headers = {}) {
    logRequest('GET', endpoint, headers);
    const response = await (await this.request).get(endpoint, { headers });
    logResponse(response);
    return response;
  }

  async post(endpoint: string, data = {}, headers = {}) {
    logRequest('POST', endpoint, headers, data);
    const response = await (await this.request).post(endpoint, {
      data,
      headers,
    });
    logResponse(response);
    return response;
  }

  async put(endpoint: string, data = {}, headers = {}) {
    logRequest('PUT', endpoint, headers, data);
    const response = await (await this.request).put(endpoint, {
      data,
      headers,
    });
    logResponse(response);
    return response;
  }
  
  async patch(endpoint: string, data = {}, headers = {}) {
    logRequest('PATCH', endpoint, headers, data);
    const response = await (await this.request).patch(endpoint, {
      data,
      headers,
    });
    logResponse(response);
    return response;
  }

  async delete(endpoint: string, headers = {}) {
    logRequest('DELETE', endpoint, headers);
    const response = await (await this.request).delete(endpoint, { headers });
    logResponse(response);
    return response;
  }
}
