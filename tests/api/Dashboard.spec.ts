import { request, expect } from '@playwright/test';
import { DashboardApiClient } from '@core/api/dashboardApiClient';
import { buildDashboardPayload } from '@core/utils/requestBuilder'; 

import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.REPORT_PORTAL_URL;
const LOGIN = process.env.LOGIN;
const PASSWORD = process.env.PASSWORD;
const TOKEN = process.env.REPORT_PORTAL_TOKEN;

describe('Dashboards API Tests', () => {
  let apiContext: any;
  let dashboardApiClient: DashboardApiClient;
  let createdDashboardId: string;

  before(async () => {
    apiContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Authorization: `bearer ${TOKEN}`, 
      },
    });
    dashboardApiClient = new DashboardApiClient(apiContext, TOKEN);
  });

  after(async () => {
    await apiContext.dispose();
  });

  it('should create a dashboard', async () => {
    const dashboard = buildDashboardPayload(
      `Test Dashboard ${Date.now()}`,
      'Created via API',
    );

    const response = await dashboardApiClient.createDashboard(dashboard);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    createdDashboardId = responseBody.id;
    console.log('Created Dashboard ID:', createdDashboardId);
  });
});
