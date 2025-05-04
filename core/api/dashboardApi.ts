import { APIClient } from './apiClient';
import dotenv from 'dotenv';

dotenv.config();


export class DashboardAPI {
  client: APIClient;
  private token: string;
  
  constructor(token: any) {
    if (!process.env.REPORT_PORTAL_URL) {
        throw new Error('Environment variable REPORT_PORTAL_URL is not set');
    }

    if (typeof token !== 'string') {
        throw new Error(`Expected token to be a string, got ${typeof token}`);
      }
    this.token = token;
    this.client = new APIClient(process.env.REPORT_PORTAL_URL, {
        Authorization: `Bearer ${this.token}`,
      });
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
  async updateDashboardPartial(project: string, dashboardId: number, data: { name?: string; description?: string }) {
    return this.client.patch(`/api/v1/${project}/dashboard/${dashboardId}`, data);
  }
async deleteDashboard(project: string, dashboardId: number) {
    return this.client.delete(`/api/v1/${project}/dashboard/${dashboardId}`);
}
async deleteWidgetFromDashboard(project: string, dashboardId: number, widgetId: number) {
    return this.client.delete(`/api/v1/${project}/dashboard/${dashboardId}/widget/${widgetId}`);
  }
}
