// Types for the Subscription module

export interface Subscriber {
    id: string;
    email: string;
    subscribedAt: string;
  }
  
  export interface SubscriberFilter {
    search?: string;
    sortBy?: 'newest' | 'oldest';
    page: number;
    limit: number;
  }
  
  export interface SubscribersResponse {
    data: Subscriber[];
    total: number;
  }
  
  export interface BulkActionRequest {
    ids: string[];
    action: 'delete';
  }
  
  export interface ExportSubscribersRequest {
    format: 'csv' | 'excel';
    filter?: {
      search?: string;
      sortBy?: 'newest' | 'oldest';
    };
  }