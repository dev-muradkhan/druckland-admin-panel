'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ClipboardList, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import OrderDetail from '@/components/orders/OrderDetail';
import Button from '@/components/ui/Button';
import { Order } from '@/types/orders';

// Mock data - in a real app, this would be fetched from an API
const mockOrder: Order = {
  id: '1',
  orderId: '43982',
  user: {
    name: 'Maxim Riley',
    email: 'maxinriley@gmail.com',
    phoneNumber: '+880 456765782'
  },
  amount: 105000,
  paymentMethod: 'Credit Card',
  paymentStatus: 'Paid',
  status: 'Processing',
  createdAt: '2025-02-18T16:33:00Z',
  updatedAt: '2025-02-18T16:33:00Z',
  transactionId: 'trx3042091DKhq',
  trackingCode: '#dhka41Fhg',
  shippingMethod: 'Economy',
  shippingDate: '2025-02-20T00:00:00Z',
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
      total: 10,
      variations: [
        { name: 'Orientation', value: 'Landscape' },
        { name: 'Sides', value: 'Front only' },
        { name: 'Material', value: 'Standard Mpt' },
        { name: 'Finishing', value: 'Matte' }
      ]
    },
    {
      id: '2',
      name: 'Christmas gift stickers',
      price: 45,
      quantity: 10,
      total: 10,
      variations: [
        { name: 'Orientation', value: 'Landscape' },
        { name: 'Sides', value: 'Front only' },
        { name: 'Material', value: 'Standard Mpt' },
        { name: 'Finishing', value: 'Matte' }
      ]
    },
    {
      id: '3',
      name: 'Christmas gift stickers',
      price: 45,
      quantity: 10,
      total: 10,
      variations: [
        { name: 'Orientation', value: 'Landscape' },
        { name: 'Sides', value: 'Front only' },
        { name: 'Material', value: 'Standard Mpt' },
        { name: 'Finishing', value: 'Matte' }
      ]
    }
  ],
  subtotal: 75000,
  tax: 7000,
  discount: 10,
  total: 71000,
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
};

interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, you would fetch the order data from your API
    const fetchOrder = async () => {
      try {
        // const response = await fetch(`/api/orders/${params.id}`);
        // const data = await response.json();
        
        // Simulate API call with mock data
        setTimeout(() => {
          // Here we're using mockOrder, but in a real app you'd use data from API
          setOrder(mockOrder);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching order:', error);
        setIsLoading(false);
      }
    };
    
    fetchOrder();
  }, [params.id]);
  
  // Handle order status update
  const handleOrderStatusUpdate = async (orderId: string, status: string) => {
    // In a real app, you would make an API call to update the order status
    // For now, simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Success case
        resolve();
      }, 800);
    });
  };
  
  // Handle payment status update
  const handlePaymentStatusUpdate = async (orderId: string, status: string) => {
    // In a real app, you would make an API call to update the payment status
    // For now, simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Success case
        resolve();
      }, 800);
    });
  };

  if (isLoading) {
    return (
      <div className="order-detail-page">
        <div className="order-detail-page__loading bg-white p-8 rounded-md text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#DCE8F8] border-t-[#007BF9] rounded-full mx-auto mb-4"></div>
          <p className="text-[#49617E]">Loading order details...</p>
        </div>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="order-detail-page">
        <div className="order-detail-page__not-found bg-white p-8 rounded-md text-center">
          <p className="text-[#F85464] mb-4">Order not found</p>
          <Button
            onClick={() => router.push('/admin/orders')}
          >
            Return to Orders List
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-detail-page">
      <div className="flex items-center mb-6">
        <Link 
          href="/admin/orders" 
          className="mr-4 text-[#49617E] hover:text-[#007BF9] transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-[#2B4F60] text-2xl font-semibold flex items-center">
            <ClipboardList className="mr-2" size={24} />
            View Order
          </h1>
          <p className="text-[#49617E] mt-1">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      <OrderDetail 
        order={order} 
        onStatusUpdate={handleOrderStatusUpdate}
        onPaymentStatusUpdate={handlePaymentStatusUpdate}
      />
    </div>
  );
}