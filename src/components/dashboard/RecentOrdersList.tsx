'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import Button from '@/components/ui/Button';

interface Order {
  id: string;
  customer: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Completed';
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

const mockOrders: Order[] = Array(10).fill(null).map((_, index) => ({
  id: `#19532`,
  customer: 'Afaq Karim',
  amount: 400.00,
  paymentMethod: 'Cash on delivery',
  paymentStatus: index % 3 === 0 ? 'Pending' : 'Completed',
  status: index % 4 === 0 ? 'Processing' : 
          index % 4 === 1 ? 'Shipped' : 
          index % 4 === 2 ? 'Delivered' : 'Cancelled',
  createdAt: '17 Feb 2025',
}));

const RecentOrdersList: React.FC = () => {
  return (
    <div className="bg-white rounded-md border border-[#E4E7EB] overflow-hidden mb-6">
      <div className="flex justify-between items-center p-4 border-b border-[#E4E7EB]">
        <div className="flex items-center">
          <h2 className="text-[#2B4F60] text-lg font-semibold">Recent Orders</h2>
          <span className="ml-2 px-2 py-1 bg-[#E6F6EE] text-[#30BF89] text-xs rounded-full">+2 Orders</span>
        </div>
        
        <div className="flex items-center">
          <div className="relative mr-2">
            <input
              type="text"
              placeholder="Search anything"
              className="pl-3 pr-8 py-2 border border-[#E4E7EB] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#007BF9]"
            />
            <Search 
              size={16} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6F8591]" 
            />
          </div>
          
          <Link href="/admin/orders">
            <Button variant="primary" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F8F9FA] border-b border-[#E4E7EB]">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Order ID</th>
              <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Customer</th>
              <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Amount</th>
              <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Payment Method</th>
              <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Payment Status</th>
              <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Created at</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order, index) => (
              <tr key={index} className="border-b border-[#E4E7EB] hover:bg-[#F8F9FA]">
                <td className="px-4 py-3 text-sm text-[#007BF9]">
                  <Link href={`/admin/orders/${order.id}`}>
                    {order.id}
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm text-[#49617E]">{order.customer}</td>
                <td className="px-4 py-3 text-sm text-[#49617E]">${order.amount.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm text-[#49617E]">{order.paymentMethod}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.paymentStatus === 'Completed' 
                      ? 'bg-[#E6F6EE] text-[#30BF89]' 
                      : 'bg-[#FFEFEF] text-[#F85464]'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'Processing' ? 'bg-[#FFF4EB] text-[#E46A11]' :
                    order.status === 'Shipped' ? 'bg-[#DCE8F8] text-[#007BF9]' :
                    order.status === 'Delivered' ? 'bg-[#E6F6EE] text-[#30BF89]' :
                    'bg-[#FFEFEF] text-[#F85464]'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-[#49617E]">{order.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center p-4 border-t border-[#E4E7EB]">
        <div className="text-sm text-[#49617E]">
          Showing 1-10 from 100
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            disabled
          >
            <ChevronLeft size={16} />
          </Button>
          
          <Button
            variant="primary"
            size="sm"
          >
            1
          </Button>
          
          <Button
            variant="outline"
            size="sm"
          >
            2
          </Button>
          
          <Button
            variant="outline"
            size="sm"
          >
            3
          </Button>
          
          <Button
            variant="outline"
            size="sm"
          >
            4
          </Button>
          
          <Button
            variant="outline"
            size="sm"
          >
            5
          </Button>
          
          <Button
            variant="outline"
            size="sm"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecentOrdersList;