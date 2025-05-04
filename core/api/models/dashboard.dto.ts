
export interface Dashboard {
    id: number;
    name: string;
    description?: string;
    owner: string;
    widgets: any[]; 
  }
  
  export interface DashboardResponse {
    content: Dashboard[];
    page: {
      number: number;
      size: number;
      totalElements: number;
      totalPages: number;
    };
  }
  