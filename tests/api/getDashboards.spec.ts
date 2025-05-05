import { test, expect } from 'core/api/apiHooks';
import type { DashboardResponse } from 'core/api/models/dashboard.dto';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Dashboards API - GET', () => {
    const project = process.env.DASHBOARD_NAME; 

  test('GET all dashboards - Positive', async ({ dashboardApi }) => {
    const response = await dashboardApi.getAllDashboards(project);
    
    expect(response.status).toBe(200);

    const body: DashboardResponse = await response.data;
    
    expect(Array.isArray(body.content)).toBe(true);
    expect(body.content.length).toBeGreaterThan(0);

    const first = body.content[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('owner');
    expect(first).toHaveProperty('widgets');
    
  });

  test('GET non-existent dashboard - Negative', async ({ dashboardApi }) => {
    const nonExistentDashboardId = '123321'; 

    const response = await dashboardApi.getDashboardById(project, nonExistentDashboardId);

    expect(response.status).toBe(404);

    const body = await response.data;
    expect(body).toHaveProperty('message');
    expect(body.message).toContain(`Dashboard with ID '${nonExistentDashboardId}' not found on project '${project}'. Did you use correct Dashboard ID?`);
  });
});
