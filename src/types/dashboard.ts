// types/dashboard.ts
export interface DashboardMetric {
    value: number;
    percentChange: number;
    trend: 'up' | 'down';
  }
  
  export interface ProductMetric extends DashboardMetric {
    count: number;
  }
  
  export interface CustomerMetric extends DashboardMetric {
    count: number;
  }
  
  export interface OrderMetric extends DashboardMetric {
    count: number;
  }
  
  export interface SalesMetric extends DashboardMetric {
    amount: number;
  }
  
  export interface SalesChartData {
    date: string;
    amount: number;
  }
  
  export interface SalesProgress {
    totalEarning: number;
    completedPercentage: number;
    pendingPercentage: number;
  }
  
  export interface OrderStatistic {
    title: string;
    count: number;
    percentChange: number;
    trend: 'up' | 'down';
    status: 'cancelled' | 'pending' | 'confirmed' | 'pickup' | 'on-the-way' | 'delivered';
  }
  
  export interface Order {
    id: string;
    customer: string;
    amount: number;
    paymentMethod: string;
    paymentStatus: 'Pending' | 'Completed';
    status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    createdAt: string;
  }
  
  export interface Product {
    id: string;
    name: string;
    sold: number;
    amount: number;
    quantity: number;
  }
  
  export interface Category {
    name: string;
    subCategoryName?: string;
    sold: number;
    amount: number;
  }