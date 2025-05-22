export interface IApiResponse<T = any> {
    status: number;
    data: T;
  }
  
  export interface IApiClient {
    get<T = any>(endpoint: string, headers?: Record<string, string>): Promise<IApiResponse<T>>;
    post<T = any>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<IApiResponse<T>>;
    put<T = any>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<IApiResponse<T>>;
    delete<T = any>(endpoint: string, headers?: Record<string, string>): Promise<IApiResponse<T>>;
  }
  