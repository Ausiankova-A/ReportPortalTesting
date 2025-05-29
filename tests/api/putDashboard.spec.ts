import { test, expect } from 'core/api/apiHooks';
import type { UpdateDashboardPayload, AddWidgetPayload } from 'core/api/models/dashboard.dto';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Dashboards API - PUT', () => {
    const project = process.env.DASHBOARD_NAME!;
    const dashboardName = `put-test-${Date.now()}`;
    let dashboardId: number;

  test.beforeAll(async ({ dashboardApi }) => {

    const testDashboard = await dashboardApi.createDashboard(project, {
        name: dashboardName,
        description: 'initial description'
      });
      const createBody = await testDashboard.data;
      dashboardId = createBody.id;
    });

  test('Positive: Successfully updates a dashboard', async ({ dashboardApi }) => {
    const updatePayload: UpdateDashboardPayload = {
      name: `update-test-${Date.now()}`,
      description: 'updated description'
    };

    const response = await dashboardApi.updateDashboard(project, dashboardId, updatePayload);

    expect(response.status).toBe(200);
    const body = await response.data;
    expect(body.message).toContain(`Dashboard with ID = '${dashboardId}' successfully updated`);
  });

test('Negative: Update non-existent dashboard ID', async ({ dashboardApi }) => {
    const nonExistentId = 999999;
    const payload: UpdateDashboardPayload = { 
        name: 'non-existent', 
        description: 'should fail' 
    };
  
    const response = await dashboardApi.updateDashboard(project, nonExistentId, payload);
  
    expect(response.status).toBe(404);
  
    const body = await response.data;
    expect(body.message).toContain(`Dashboard with ID '${nonExistentId}' not found on project '${project}'`);
  });

test('Negative: Add widget to non-existent dashboard', async ({ dashboardApi }) => {
    const nonExistentId = 987654;
    const widgetPayload: AddWidgetPayload = {
        widgetId: 234,
        name: 'TEST',
        description: '',
        widgetType: 'statisticTrend',
        contentParameters: {
          contentFields: ['statistics$defects$to_investigate$total'],
          widgetOptions: {
            viewMode: 'bar',
            zoom: true,
          },
        },
        filters: [
          { name: 'DEMO_FILTER', value: '6' },
        ],
        filterIds: ['6'],
      };
  
    const response = await dashboardApi.addWidgetToDashboard(project, nonExistentId, widgetPayload);
  
    expect(response.status).toBe(404);
  
    const body = await response.data;
    expect(body.message).toContain(`Dashboard with ID '${nonExistentId}' not found`);
  });
});
