import { test, expect } from '@playwright/test';
import { DashboardAPI } from 'core/api/dashboardApi';
import { getAuthToken } from 'core/api/auth';

test.describe('Dashboards API - PUT', () => {
    let dashboardApi: DashboardAPI;
    const project = 'default_personal';
    let dashboardId: number;

  test.beforeAll(async () => {
    const token = await getAuthToken(); 
    dashboardApi = new DashboardAPI(token); 

    const createRes = await dashboardApi.createDashboard(project, {
        name: 'put test',
        description: 'initial description'
      });
      const createBody = await createRes.json();
      dashboardId = createBody.id;
    });

  test('Positive: Successfully updates a dashboard', async () => {
    const updatePayload = {
      name: 'update-test',
      description: 'updated description'
    };

    const res = await dashboardApi.updateDashboard(project, dashboardId, updatePayload);

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.message).toContain(`Dashboard with ID = '${dashboardId}' successfully updated`);
  });

test('Negative: Update non-existent dashboard ID', async () => {
    const nonExistentId = 999999;
    const payload = { 
        name: 'non-existent', 
        description: 'should fail' 
    };
  
    const res = await dashboardApi.updateDashboard(project, nonExistentId, payload);
  
    expect(res.status()).toBe(404);
  
    const body = await res.json();
    expect(body.message).toContain(`Dashboard with ID '${nonExistentId}' not found on project '${project}'`);
  });

test('Negative: Add widget to non-existent dashboard', async () => {
    const nonExistentId = 987654;
    const widgetPayload = {
        addWidget: {
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
    }
      };
  
    const res = await dashboardApi.addWidgetToDashboard(project, nonExistentId, widgetPayload);
  
    expect(res.status()).toBe(404);
  
    const body = await res.json();
    expect(body.message).toContain(`Dashboard with ID '${nonExistentId}' not found`);
  });
});
