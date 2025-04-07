'use client';

import React from 'react';
import { ShoppingCart, Users, ClipboardList, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricBoxProps {
  title: string;
  value: string | number;
  percentChange: number;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
}

const MetricBox: React.FC<MetricBoxProps> = ({ 
  title, 
  value, 
  percentChange, 
  icon, 
  iconBgColor, 
}) => {
  const isPositiveTrend = percentChange >= 0;
  
  return (
    <div className="bg-white rounded-md border border-[#E4E7EB] p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-[#49617E] text-sm font-medium mb-2">{title}</h3>
          <div className="text-[#2B4F60] text-2xl font-semibold">{value}</div>
          <div className={`text-xs flex items-center mt-1 ${isPositiveTrend ? 'text-[#30BF89]' : 'text-[#F85464]'}`}>
            {isPositiveTrend ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
            {isPositiveTrend ? '+' : ''}{percentChange}% from last month
          </div>
        </div>
        <div className={`${iconBgColor} p-2 rounded-md`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const DashboardMetricBoxes: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricBox
        title="Total Product"
        value="5640"
        percentChange={2.5}
        icon={<ShoppingCart size={24} className="text-[#F85464]" />}
        iconBgColor="bg-[#FFEFEF]"
        iconColor="text-[#F85464]"
      />
      
      <MetricBox
        title="Total Customer"
        value="10,264"
        percentChange={7.5}
        icon={<Users size={24} className="text-[#5C59E8]" />}
        iconBgColor="bg-[#DCE8F8]"
        iconColor="text-[#5C59E8]"
      />
      
      <MetricBox
        title="Total Orders"
        value="575"
        percentChange={2.5}
        icon={<ClipboardList size={24} className="text-[#30BF89]" />}
        iconBgColor="bg-[#E6F6EE]"
        iconColor="text-[#30BF89]"
      />
      
      <MetricBox
        title="Total Sales"
        value="1,003,432"
        percentChange={-2.5}
        icon={<DollarSign size={24} className="text-[#E46A11]" />}
        iconBgColor="bg-[#FFF4EB]"
        iconColor="text-[#E46A11]"
      />
    </div>
  );
};

export default DashboardMetricBoxes;