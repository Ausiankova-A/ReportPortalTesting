import { test, expect } from '@playwright/test';
import { DashboardAPI } from 'core/api/dashboardApi';
import { getAuthToken } from 'core/api/auth';

test.describe('Dashboards API - DELETE', () => {
    let dashboardApi: DashboardAPI;
    const project = 'default_personal';
    let dashboardId: number;

  test.beforeAll(async () => {
    const token = await getAuthToken(); 
    dashboardApi = new DashboardAPI(token); 

    const createRes = await dashboardApi.createDashboard(project, {
        name: 'delete test',
        description: 'initial description'
      });
      const createBody = await createRes.json();
      dashboardId = createBody.id;
    });

    test('Positive: Successfully deletes a dashboard', async () => {
        const res = await dashboardApi.deleteDashboard(project, dashboardId);
      
        expect(res.status()).toBe(200);
        const body = await res.json();
        expect(body.message).toContain(`Dashboard with ID = '${dashboardId}' successfully deleted.`);
      });

    test('Negative: Try to delete a non-existent widget from an existing dashboard', async () => {
        const dashboardId = 19; 
        const nonExistentWidgetId = 999999; 
      
        const res = await dashboardApi.deleteWidgetFromDashboard(project, dashboardId, nonExistentWidgetId);
      
        expect(res.status()).toBe(404);
        const body = await res.json();
        expect(body.error).toContain('Not Found'); 
      });


});
