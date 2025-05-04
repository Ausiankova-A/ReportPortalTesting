export interface DashboardPayload {
    name: string;
    description: string;
  }
  
  export function buildDashboardPayload(
    name: string,
    description: string
  ): DashboardPayload {
    return {
      name,
      description,
    };
  }
  