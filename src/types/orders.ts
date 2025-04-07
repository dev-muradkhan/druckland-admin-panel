// types/orders.ts

export interface Order {
    id: string;
    orderId: string;
    user: {
      name: string;
      email: string;
      phoneNumber?: string;
    };
    amount: number;
    paymentMethod: 'Credit Card' | 'PayPal' | 'Bank Transfer' | 'Cash on Delivery';
    paymentStatus: 'Paid' | 'Unpaid' | 'Partially Paid' | 'Refunded';
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    createdAt: string;
    updatedAt: string;
    transactionId?: string;
    trackingCode?: string;
    shippingMethod?: string;
    shippingDate?: string;
    billing: Address;
    shipping: Address;
    items: OrderItem[];
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
    history: OrderHistoryItem[];
  }
  
  export interface Address {
    name: string;
    email: string;
    phoneNumber: string;
    country: string;
    address: string;
    city: string;
    zipCode: string;
  }
  
  export interface OrderItem {
    id: string;
    name: string;
    image?: string;
    price: number;
    quantity: number;
    total: number;
    variations?: {
      name: string;
      value: string;
    }[];
  }
  
  export interface OrderHistoryItem {
    id: string;
    action: string;
    description: string;
    performedBy: string;
    date: string;
  }
  
  export interface OrderFilter {
    search?: string;
    orderStatus?: string;
    paymentStatus?: string;
    dateFrom?: string;
    dateTo?: string;
    page: number;
    limit: number;
  }
  
  export interface OrdersResponse {
    data: Order[];
    total: number;
    page: number;
    limit: number;
  }
  
  export interface OrderResponse {
    data: Order;
  }