'use client';

import React from 'react';
import { TrendingUp, TrendingDown, X, Clock, CheckCircle, Package, Truck, ShoppingBag } from 'lucide-react';

interface OrderStatItemProps {
  title: string;
  status: string;
  count: number;
  percentChange: number;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
}

const OrderStatItem: React.FC<OrderStatItemProps> = ({
  title,
  count,
  percentChange,
  icon,
  iconBgColor,
}) => {
  const isPositiveTrend = percentChange >= 0;
  
  return (
    <div className="bg-white rounded-md border border-[#E4E7EB] p-4">
      <div className="flex items-start">
        <div className={`${iconBgColor} p-2 rounded-full mr-3`}>
          {icon}
        </div>
        <div>
          <div className="text-xs text-[#49617E]">{title}</div>
          <div className="text-[#2B4F60] text-xl font-semibold">{count}</div>
          <div className={`text-xs flex items-center mt-1 ${isPositiveTrend ? 'text-[#30BF89]' : 'text-[#F85464]'}`}>
            {isPositiveTrend ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
            {isPositiveTrend ? '+' : ''}{percentChange}% in the last 1 month
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderStatistics: React.FC = () => {
  return (
    <div className="mb-6">
      <h2 className="text-[#2B4F60] text-xl font-semibold mb-4">Order Statistics</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <OrderStatItem
          title="Order Cancelled"
          status="cancelled"
          count={80}
          percentChange={5}
          icon={<X size={20} className="text-white" />}
          iconBgColor="bg-[#F85464]"
          iconColor="text-white"
        />
        
        <OrderStatItem
          title="Pending Orders"
          status="pending"
          count={100}
          percentChange={-2}
          icon={<Clock size={20} className="text-white" />}
          iconBgColor="bg-[#FFB02C]"
          iconColor="text-white"
        />
        
        <OrderStatItem
          title="Confirmed Orders"
          status="confirmed"
          count={1580}
          percentChange={5}
          icon={<CheckCircle size={20} className="text-white" />}
          iconBgColor="bg-[#30BF89]"
          iconColor="text-white"
        />
        
        <OrderStatItem
          title="Package Pickup"
          status="pickup"
          count={280}
          percentChange={-3}
          icon={<Package size={20} className="text-white" />}
          iconBgColor="bg-[#007BF9]"
          iconColor="text-white"
        />
        
        <OrderStatItem
          title="On the way"
          status="on-the-way"
          count={340}
          percentChange={5}
          icon={<Truck size={20} className="text-white" />}
          iconBgColor="bg-[#5C59E8]"
          iconColor="text-white"
        />
        
        <OrderStatItem
          title="Order Delivered"
          status="delivered"
          count={5000}
          percentChange={-3}
          icon={<ShoppingBag size={20} className="text-white" />}
          iconBgColor="bg-[#E46A11]"
          iconColor="text-white"
        />
      </div>
    </div>
  );
};

export default OrderStatistics;