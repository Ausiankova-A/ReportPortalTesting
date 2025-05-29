import { test, expect } from 'core/api/apiHooks';
import type { CreateDashboardPayload } from 'core/api/models/dashboard.dto';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Dashboards API - POST', () => {
    const project = process.env.DASHBOARD_NAME!;
    const dashboardName = `post-test-${Date.now()}`;

  test('Create dashboard - Positive', async ({ dashboardApi }) => {
    const payload: CreateDashboardPayload = {
      name: dashboardName,
      description: 'post description',
    };

    const response = await dashboardApi.createDashboard(project, payload);

    expect(response.status).toBe(201);

    const body = await response.data;
    expect(body).toHaveProperty('id');
    expect(typeof body.id).toBe('number');
  });

  test('Create dashboard - Negative: missing name', async ({ dashboardApi }) => {
    const payload = {
      name:'',
      description: 'No name provided',
    };
  
    const response = await dashboardApi.createDashboard(project, payload);
  
    expect(response.status).toBe(400);
  
    const body = await response.data;
    expect(body).toHaveProperty('message');
    expect(body.message).toContain('Incorrect Request. [Field \'name\' should not be null.]');
  });

test('Create dashboard - Negative: duplicate name', async ({ dashboardApi }) => {
    const payload: CreateDashboardPayload = {
      name: 'DEMO DASHBOARD',
      description: 'Trying to create a dashboard with duplicate name',
    };
  
    const response = await dashboardApi.createDashboard(project, payload);
  
    expect(response.status).toBe(409);
  
    const body = await response.data;
    expect(body).toHaveProperty('message');
    expect(body.message).toContain('Resource \'DEMO DASHBOARD\' already exists. You couldn\'t create the duplicate.');
  });
});
