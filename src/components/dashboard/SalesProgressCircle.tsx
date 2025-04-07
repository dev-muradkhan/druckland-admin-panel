'use client';

import React from 'react';
import { DollarSign } from 'lucide-react';

const SalesProgressCircle: React.FC = () => {
  // Circle progress calculation
  const completedPercentage = 80;
  const pendingPercentage = 20;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const completedOffset = circumference - (completedPercentage / 100) * circumference;
  const pendingOffset = circumference - (pendingPercentage / 100) * circumference;
  
  return (
    <div className="bg-white rounded-md border border-[#E4E7EB] p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[#2B4F60] text-lg font-semibold">Sales Progress</h2>
      </div>
      
      <div className="flex justify-center">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Background circle (20% pending) */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#F85464"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={pendingOffset}
              transform="rotate(-90 50 50)"
            />
            
            {/* Foreground circle (80% completed) */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#30BF89"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={completedOffset}
              transform="rotate(-90 50 50)"
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <DollarSign size={24} className="text-[#2B4F60] mb-1" />
            <div className="text-sm font-medium text-[#49617E]">Total Earning</div>
            <div className="text-lg font-semibold text-[#2B4F60]">$48,3920,022</div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#30BF89] mr-2"></div>
          <span className="text-sm text-[#49617E]">80% Completed</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#F85464] mr-2"></div>
          <span className="text-sm text-[#49617E]">20% Pending</span>
        </div>
      </div>
    </div>
  );
};

export default SalesProgressCircle;