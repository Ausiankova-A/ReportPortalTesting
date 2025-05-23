import { test, expect } from 'core/api/apiHooks';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Dashboards API - DELETE', () => {
    const project = process.env.DASHBOARD_NAME!;
    let dashboardId: number;
    const dashboardName = `delete-test-${Date.now()}`;

  test.beforeAll(async ({ dashboardApi }) => {
    const testDashboard = await dashboardApi.createDashboard(project, {
        name: dashboardName,
        description: 'initial description'
      });
      const createBody = await testDashboard.data;
      dashboardId = createBody.id;
    });

    test('Positive: Successfully delete a dashboard', async ({ dashboardApi }) => {
        const response = await dashboardApi.deleteDashboard(project, dashboardId);
      
        expect(response.status).toBe(200);
        const body = await response.data;
        expect(body.message).toContain(`Dashboard with ID = '${dashboardId}' successfully deleted.`);
      });

    test('Negative: Try to delete a non-existent widget from an existing dashboard', async ({ dashboardApi }) => {
        const dashboardId = 19; 
        const nonExistentWidgetId = 999999; 
      
        const response = await dashboardApi.deleteWidgetFromDashboard(project, dashboardId, nonExistentWidgetId);
      
        expect(response.status).toBe(404);
        const body = await response.data;
        expect(body.error).toContain('Not Found'); 
      });
});
