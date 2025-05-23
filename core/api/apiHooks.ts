import { test as base } from '@playwright/test';
import { createApiClient } from 'core/api/clientFactory';
import { DashboardAPI } from 'core/api/dashboardApi';

type Fixtures = {
  dashboardApi: DashboardAPI;
};

export const test = base.extend<Fixtures>({
  dashboardApi: async ({}, use) => {
    const client = await createApiClient();
    const api = new DashboardAPI(client);
    await use(api);
  },
});

export { expect } from '@playwright/test';
