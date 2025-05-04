// import { test, expect } from '@playwright/test';
// import { DashboardAPI } from 'core/api/dashboardApi';
// import { getAuthToken } from 'core/api/auth';

// test.describe('Dashboards API - PATCH', () => {
//     let dashboardApi: DashboardAPI;
//     const project = 'default_personal';
//     let dashboardId: number;

//   test.beforeAll(async () => {
//     const token = await getAuthToken(); 
//     dashboardApi = new DashboardAPI(token); 

//     const createRes = await dashboardApi.createDashboard(project, {
//         name: 'initial test',
//         description: 'initial description'
//       });
//       const createBody = await createRes.json();
//       dashboardId = createBody.id;
//     });

//     test('Positive: Successfully updates a dashboard description', async () => {
//         const updatePayload = { description: 'Updated description' };
        
//         const res = await dashboardApi.updateDashboardPartial(project, dashboardId, updatePayload);
        
//         expect(res.status()).toBe(200);
//         const body = await res.json();
//         expect(body.message).toContain('Dashboard updated successfully');
//     });

// test('Negative: Attempt to update non-existent dashboard', async () => {
//     const nonExistentId = 99999;
//     const updatePayload = { description: 'New description' };
  
//     const res = await dashboardApi.updateDashboardPartial(project, nonExistentId, updatePayload);
  
//     expect(res.status()).toBe(404);
//     const body = await res.json();
//     expect(body.message).toContain(`Dashboard with ID '${nonExistentId}' not found`);
//   });
  
//   // Негативный тест 2 (некорректные данные)
//   test('Negative: Attempt to update dashboard with missing required field', async () => {
//     const dashboardId = 1; // существующий ID
//     const updatePayload = {};  // Пустой payload
  
//     const res = await dashboardApi.updateDashboardPartial(project, dashboardId, updatePayload);
  
//     expect(res.status()).toBe(400);
//     const body = await res.json();
//     expect(body.message).toContain('Missing required fields');
//   });
// });
