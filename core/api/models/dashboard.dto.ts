
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

  export interface CreateDashboardPayload {
    name: string;
    description: string;
  }
  
  export interface UpdateDashboardPayload {
    name?: string;
    description?: string;
  }

  export interface AddWidgetPayload {
    widgetId: number;
    name: string;
    description: string;
    widgetType: string;
    contentParameters: {
      contentFields: string[];
      widgetOptions: {
        viewMode: string;
        zoom: boolean;
      };
    };
    filters: Array<{ name: string; value: string }>;
    filterIds: string[];
  }
  