
import { APIRequestContext, APIResponse } from '@playwright/test';

interface Dashboard {
  name: string;
  description?: string;
  share?: boolean;
}

export class DashboardApiClient {
  private request: APIRequestContext;
  private token: string;

  constructor(request: APIRequestContext, token: string) {
    this.request = request;
    this.token = token;
  }

  async createDashboard(dashboard: Dashboard): Promise<APIResponse> {
    return await this.request.post('/dashboard', {
      headers: this.getAuthHeaders(),
      data: dashboard,
    });
  }

  private getAuthHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }
}
