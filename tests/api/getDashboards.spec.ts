import { test, expect } from '@playwright/test';
import { DashboardAPI } from 'core/api/dashboardApi';
import type { DashboardResponse } from 'core/api/models/dashboard.dto';
import { getAuthToken } from 'core/api/auth';

test.describe('Dashboards API - GET', () => {
    let dashboardApi: DashboardAPI;
    const project = 'default_personal'; 

  test.beforeAll(async () => {
    const token = await getAuthToken(); 
    dashboardApi = new DashboardAPI(token); 
  });

  test('GET all dashboards - Positive', async () => {
    const res = await dashboardApi.getAllDashboards(project);
    
    expect(res.status()).toBe(200);

    const body: DashboardResponse = await res.json();
    
    expect(Array.isArray(body.content)).toBe(true);
    expect(body.content.length).toBeGreaterThan(0);

    const first = body.content[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('owner');
    expect(first).toHaveProperty('widgets');
  });

  test('GET non-existent dashboard - Negative', async () => {
    const nonExistentDashboardId = '123321'; 

    const res = await dashboardApi.getDashboardById(project, nonExistentDashboardId);

    expect(res.status()).toBe(404);

    const body = await res.json();
    expect(body).toHaveProperty('message');
    expect(body.message).toContain(`Dashboard with ID '${nonExistentDashboardId}' not found on project '${project}'. Did you use correct Dashboard ID?`);
  });
});
