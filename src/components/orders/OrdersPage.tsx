'use client';

import { useEffect, useState } from 'react';
import { ClipboardList } from 'lucide-react';
import OrderList from '@/components/orders/OrderList';
import DateFilter from '@/components/ui/DateFilter';
import { Order, OrderFilter } from '@/types/orders';

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: '1',
    orderId: '12302',
    user: {
      name: 'Maxim Riley',
      email: 'maxinriley@gmail.com',
      phoneNumber: '+880 456765782'
    },
    amount: 1902,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    status: 'Processing',
    createdAt: '2025-02-18T16:33:00Z',
    updatedAt: '2025-02-18T16:33:00Z',
    billing: {
      name: 'Arif Raihan Abir',
      email: 'arifraihanr@gmail.com',
      phoneNumber: '01884537023',
      country: 'America',
      address: '293/C New york',
      city: 'New york',
      zipCode: '3041'
    },
    shipping: {
      name: 'Arif Raihan Abir',
      email: 'arifraihanr@gmail.com',
      phoneNumber: '01884537023',
      country: 'America',
      address: '293/C New york',
      city: 'New york',
      zipCode: '3041'
    },
    items: [
      {
        id: '1',
        name: 'Christmas gift stickers',
        price: 45,
        quantity: 10,
        total: 450,
        variations: [
          { name: 'Orientation', value: 'Landscape' },
          { name: 'Sides', value: 'Front only' },
          { name: 'Material', value: 'Standard Mpt' },
          { name: 'Finishing', value: 'Matte' }
        ]
      }
    ],
    subtotal: 75.00,
    tax: 7.00,
    discount: 10,
    total: 72.00,
    history: [
      {
        id: '1',
        action: 'Changed status of shipping to:',
        description: 'Updated by: System',
        performedBy: 'System',
        date: '2025-01-19T03:53:55Z'
      },
      {
        id: '2',
        action: 'Payment was confirmed',
        description: '(amount $80.20) by System',
        performedBy: 'System',
        date: '2025-01-19T03:53:55Z'
      },
      {
        id: '3',
        action: 'Order was verified',
        description: 'by System',
        performedBy: 'System',
        date: '2025-01-19T01:02:25Z'
      },
      {
        id: '4',
        action: 'Order is created',
        description: 'from the checkout page',
        performedBy: 'System',
        date: '2025-01-19T01:01:55Z'
      }
    ]
  },
  {
    id: '2',
    orderId: '12302',
    user: {
      name: 'Maxim Riley',
      email: 'maxinriley@gmail.com',
      phoneNumber: '+880 456765782'
    },
    amount: 1902,
    paymentMethod: 'PayPal',
    paymentStatus: 'Paid',
    status: 'Shipped',
    createdAt: '2025-02-18T16:33:00Z',
    updatedAt: '2025-02-18T16:33:00Z',
    billing: {
      name: 'Arif Raihan Abir',
      email: 'arifraihanr@gmail.com',
      phoneNumber: '01884537023',
      country: 'America',
      address: '293/C New york',
      city: 'New york',
      zipCode: '3041'
    },
    shipping: {
      name: 'Arif Raihan Abir',
      email: 'arifraihanr@gmail.com',
      phoneNumber: '01884537023',
      country: 'America',
      address: '293/C New york',
      city: 'New york',
      zipCode: '3041'
    },
    items: [
      {
        id: '1',
        name: 'Christmas gift stickers',
        price: 45,
        quantity: 10,
        total: 450,
        variations: [
          { name: 'Orientation', value: 'Landscape' },
          { name: 'Sides', value: 'Front only' },
          { name: 'Material', value: 'Standard Mpt' },
          { name: 'Finishing', value: 'Matte' }
        ]
      }
    ],
    subtotal: 75.00,
    tax: 7.00,
    discount: 10,
    total: 72.00,
    history: []
  },
  {
    id: '3',
    orderId: '12302',
    user: {
      name: 'Maxim Riley',
      email: 'maxinriley@gmail.com',
      phoneNumber: '+880 456765782'
    },
    amount: 1902,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    status: 'Delivered',
    createdAt: '2025-02-18T16:33:00Z',
    updatedAt: '2025-02-18T16:33:00Z',
    billing: {
      name: 'Arif Raihan Abir',
      email: 'arifraihanr@gmail.com',
      phoneNumber: '01884537023',
      country: 'America',
      address: '293/C New york',
      city: 'New york',
      zipCode: '3041'
    },
    shipping: {
      name: 'Arif Raihan Abir',
      email: 'arifraihanr@gmail.com',
      phoneNumber: '01884537023',
      country: 'America',
      address: '293/C New york',
      city: 'New york',
      zipCode: '3041'
    },
    items: [
      {
        id: '1',
        name: 'Christmas gift stickers',
        price: 45,
        quantity: 10,
        total: 450,
        variations: [
          { name: 'Orientation', value: 'Landscape' },
          { name: 'Sides', value: 'Front only' },
          { name: 'Material', value: 'Standard Mpt' },
          { name: 'Finishing', value: 'Matte' }
        ]
      }
    ],
    subtotal: 75.00,
    tax: 7.00,
    discount: 10,
    total: 72.00,
    history: []
  },
  {
    id: '4',
    orderId: '12302',
    user: {
      name: 'Maxim Riley',
      email: 'maxinriley@gmail.com',
      phoneNumber: '+880 456765782'
    },
    amount: 1902,
    paymentMethod: 'PayPal',
    paymentStatus: 'Unpaid',
    status: 'Cancelled',
    createdAt: '2025-02-18T16:33:00Z',
    updatedAt: '2025-02-18T16:33:00Z',
    billing: {
      name: 'Arif Raihan Abir',
      email: 'arifraihanr@gmail.com',
      phoneNumber: '01884537023',
      country: 'America',
      address: '293/C New york',
      city: 'New york',
      zipCode: '3041'
    },
    shipping: {
      name: 'Arif Raihan Abir',
      email: 'arifraihanr@gmail.com',
      phoneNumber: '01884537023',
      country: 'America',
      address: '293/C New york',
      city: 'New york',
      zipCode: '3041'
    },
    items: [
      {
        id: '1',
        name: 'Christmas gift stickers',
        price: 45,
        quantity: 10,
        total: 450,
        variations: [
          { name: 'Orientation', value: 'Landscape' },
          { name: 'Sides', value: 'Front only' },
          { name: 'Material', value: 'Standard Mpt' },
          { name: 'Finishing', value: 'Matte' }
        ]
      }
    ],
    subtotal: 75.00,
    tax: 7.00,
    discount: 10,
    total: 72.00,
    history: []
  },
  {
    id: '5',
    orderId: '12302',
    user: {
      name: 'Maxim Riley',
      email: 'maxinriley@gmail.com',
      phoneNumber: '+880 456765782'
    },
    amount: 1902,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    status: 'Pending',
    createdAt: '2025-02-18T16:33:00Z',
    updatedAt: '2025-02-18T16:33:00Z',
    billing: {
      name: 'Arif Raihan Abir',
      email: 'arifraihanr@gmail.com',
      phoneNumber: '01884537023',
      country: 'America',
      address: '293/C New york',
      city: 'New york',
      zipCode: '3041'
    },
    shipping: {
      name: 'Arif Raihan Abir',
      email: 'arifraihanr@gmail.com',
      phoneNumber: '01884537023',
      country: 'America',
      address: '293/C New york',
      city: 'New york',
      zipCode: '3041'
    },
    items: [
      {
        id: '1',
        name: 'Christmas gift stickers',
        price: 45,
        quantity: 10,
        total: 450,
        variations: [
          { name: 'Orientation', value: 'Landscape' },
          { name: 'Sides', value: 'Front only' },
          { name: 'Material', value: 'Standard Mpt' },
          { name: 'Finishing', value: 'Matte' }
        ]
      }
    ],
    subtotal: 75.00,
    tax: 7.00,
    discount: 10,
    total: 72.00,
    history: []
  },
  {
    id: '6',
    orderId: '12302',
    user: {
      name: 'Maxim Riley',
      email: 'maxinriley@gmail.com',
      phoneNumber: '+880 456765782'
    },
    amount: 1902,
    paymentMethod: 'PayPal',
    paymentStatus: 'Refunded',
    status: 'Refunded',
    createdAt: '2025-02-18T16:33:00Z',
    updatedAt: '2025-02-18T16:33:00Z',
    billing: {
      name: 'Arif Raihan Abir',
      email: 'arifraihanr@gmail.com',
      phoneNumber: '01884537023',
      country: 'America',
      address: '293/C New york',
      city: 'New york',
      zipCode: '3041'
    },
    shipping: {
      name: 'Arif Raihan Abir',
      email: 'arifraihanr@gmail.com',
      phoneNumber: '01884537023',
      country: 'America',
      address: '293/C New york',
      city: 'New york',
      zipCode: '3041'
    },
    items: [
      {
        id: '1',
        name: 'Christmas gift stickers',
        price: 45,
        quantity: 10,
        total: 450,
        variations: [
          { name: 'Orientation', value: 'Landscape' },
          { name: 'Sides', value: 'Front only' },
          { name: 'Material', value: 'Standard Mpt' },
          { name: 'Finishing', value: 'Matte' }
        ]
      }
    ],
    subtotal: 75.00,
    tax: 7.00,
    discount: 10,
    total: 72.00,
    history: []
  },
  {
    id: '7',
    orderId: '12302',
    user: {
      name: 'Maxim Riley',
      email: 'maxinriley@gmail.com',
      phoneNumber: '+880 456765782'
    },
    amount: 1902,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    status: 'Delivered',
    createdAt: '2025-02-18T16:33:00Z',
    updatedAt: '2025-02-18T16:33:00Z',
    billing: {
      name: 'Arif Raihan Abir',
      email: 'arifraihanr@gmail.com',
      phoneNumber: '01884537023',
      country: 'America',
      address: '293/C New york',
      city: 'New york',
      zipCode: '3041'
    },
    shipping: {
      name: 'Arif Raihan Abir',
      email: 'arifraihanr@gmail.com',
      phoneNumber: '01884537023',
      country: 'America',
      address: '293/C New york',
      city: 'New york',
      zipCode: '3041'
    },
    items: [
      {
        id: '1',
        name: 'Christmas gift stickers',
        price: 45,
        quantity: 10,
        total: 450,
        variations: [
          { name: 'Orientation', value: 'Landscape' },
          { name: 'Sides', value: 'Front only' },
          { name: 'Material', value: 'Standard Mpt' },
          { name: 'Finishing', value: 'Matte' }
        ]
      }
    ],
    subtotal: 75.00,
    tax: 7.00,
    discount: 10,
    total: 72.00,
    history: []
  },
  {
    id: '8',
    orderId: '12302',
    user: {
      name: 'Maxim Riley',
      email: 'maxinriley@gmail.com',
      phoneNumber: '+880 456765782'
    },
    amount: 1902,
    paymentMethod: 'PayPal',
    paymentStatus: 'Unpaid',
    status: 'Cancelled',
    createdAt: '2025-02-18T16:33:00Z',
    updatedAt: '2025-02-18T16:33:00Z',
    billing: {
      name: 'Arif Raihan Abir',
      email: 'arifraihanr@gmail.com',
      phoneNumber: '01884537023',
      country: 'America',
      address: '293/C New york',
      city: 'New york',
      zipCode: '3041'
    },
    shipping: {
      name: 'Arif Raihan Abir',
      email: 'arifraihanr@gmail.com',
      phoneNumber: '01884537023',
      country: 'America',
      address: '293/C New york',
      city: 'New york',
      zipCode: '3041'
    },
    items: [
      {
        id: '1',
        name: 'Christmas gift stickers',
        price: 45,
        quantity: 10,
        total: 450,
        variations: [
          { name: 'Orientation', value: 'Landscape' },
          { name: 'Sides', value: 'Front only' },
          { name: 'Material', value: 'Standard Mpt' },
          { name: 'Finishing', value: 'Matte' }
        ]
      }
    ],
    subtotal: 75.00,
    tax: 7.00,
    discount: 10,
    total: 72.00,
    history: []
  }
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call with a delay
    const fetchData = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/orders');
        // const data = await response.json();
        
        // For now, use mock data
        setTimeout(() => {
          setOrders(mockOrders);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Default filter
  const initialFilter: OrderFilter = {
    search: '',
    orderStatus: 'all',
    page: 1,
    limit: 10
  };

  // Handle date filter
  const handleDateFilter = (startDate: string, endDate: string) => {
    // In a real app, you would fetch filtered data from your API
    // For now, simulate filtering on the client
    setIsLoading(true);
    
    setTimeout(() => {
      const filtered = mockOrders.filter(order => {
        const orderDate = new Date(order.createdAt);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        
        if (start && end) {
          return orderDate >= start && orderDate <= end;
        } else if (start) {
          return orderDate >= start;
        } else if (end) {
          return orderDate <= end;
        }
        
        return true;
      });
      
      setOrders(filtered);
      setIsLoading(false);
    }, 500);
  };
  
  // Clear date filter
  const handleClearDateFilter = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setOrders(mockOrders);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="orders-page">
      <div className="orders-page__header mb-6">
        <h1 className="text-[#2B4F60] text-2xl font-semibold flex items-center">
          <ClipboardList className="mr-2" size={24} />
          Orders
        </h1>
        <p className="text-[#49617E] mt-1">
          Manage your orders, view order details, and update order status.
        </p>
      </div>
      
      <DateFilter 
        onApplyFilter={handleDateFilter}
        onClearFilter={handleClearDateFilter}
        className="mb-6"
      />
      
      {isLoading ? (
        <div className="orders-page__loading bg-white p-8 rounded-md text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#DCE8F8] border-t-[#007BF9] rounded-full mx-auto mb-4"></div>
          <p className="text-[#49617E]">Loading orders...</p>
        </div>
      ) : (
        <OrderList 
          initialOrders={orders} 
          initialTotal={orders.length} 
          initialFilter={initialFilter}
        />
      )}
    </div>
  );
}