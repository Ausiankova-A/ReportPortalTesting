import { IApiClient } from '@core/api/interfaces/IApiClient';

export class DashboardAPI {
  client: IApiClient;
  
  constructor(client: IApiClient) {
    this.client = client;
  }

  async getAllDashboards(project: string) {
    return this.client.get(`/api/v1/${project}/dashboard`);
  }
  async getDashboardById(project: string, dashboardId: string) {
    return this.client.get(`/api/v1/${project}/dashboard/${dashboardId}`);
  }
  async createDashboard(project: string, payload: { name: string; description: string }) {
    return this.client.post(`/api/v1/${project}/dashboard`, payload);
  }
  async updateDashboard(project: string, id: number, data: { name: string; description?: string }) {
    return this.client.put(`/api/v1/${project}/dashboard/${id}`, data);
  }
  async addWidgetToDashboard(project: string, dashboardId: number, widgetData: any) {
    return this.client.put(`/api/v1/${project}/dashboard/${dashboardId}/add`, widgetData);
  }
async deleteDashboard(project: string, dashboardId: number) {
    return this.client.delete(`/api/v1/${project}/dashboard/${dashboardId}`);
}
async deleteWidgetFromDashboard(project: string, dashboardId: number, widgetId: number) {
    return this.client.delete(`/api/v1/${project}/dashboard/${dashboardId}/widget/${widgetId}`);
  }
}
