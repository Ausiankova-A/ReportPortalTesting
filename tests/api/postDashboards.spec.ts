import { test, expect } from '@playwright/test';
import { DashboardAPI } from 'core/api/dashboardApi';
import { getAuthToken } from 'core/api/auth';

test.describe('Dashboards API - POST', () => {
    let dashboardApi: DashboardAPI;
    const project = 'default_personal';

  test.beforeAll(async () => {
    const token = await getAuthToken(); 
    dashboardApi = new DashboardAPI(token); 
  });

  test('Create dashboard - Positive', async () => {
    const payload = {
      name: 'post test',
      description: 'post description',
    };

    const res = await dashboardApi.createDashboard(project, payload);

    expect(res.status()).toBe(201);

    const body = await res.json();
    expect(body).toHaveProperty('id');
    expect(typeof body.id).toBe('number');
  });

  test('Create dashboard - Negative: missing name', async () => {
    const payload = {
      description: 'No name provided',
    };
  
    const res = await dashboardApi.createDashboard(project, payload);
  
    expect(res.status()).toBe(400);
  
    const body = await res.json();
    expect(body).toHaveProperty('message');
    expect(body.message).toContain('Incorrect Request. [Field \'name\' should not be null.]');
  });

test('Create dashboard - Negative: duplicate name', async () => {
    const payload = {
      name: 'DEMO DASHBOARD',
      description: 'Trying to create a dashboard with duplicate name',
    };
  
    const res = await dashboardApi.createDashboard(project, payload);
  
    expect(res.status()).toBe(409);
  
    const body = await res.json();
    expect(body).toHaveProperty('message');
    expect(body.message).toContain('Resource \'DEMO DASHBOARD\' already exists. You couldn\'t create the duplicate.');
  });
});
