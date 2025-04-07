'use client';

import React from 'react';

const SalesReportChart: React.FC = () => {
  // In a real application, this would use a charting library like recharts
  // For now, creating a custom visualization component
  
  // Mock data points for the line chart
  const dataPoints = [1000, 1200, 900, 1100, 2200, 1700, 1300, 1800, 1400];
  const maxValue = Math.max(...dataPoints);
  
  return (
    <div className="bg-white rounded-md border border-[#E4E7EB] p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[#2B4F60] text-lg font-semibold">Sales Reports</h2>
        <div className="text-[#49617E] text-sm">
          <span className="text-[#E46A11] font-medium">Earning Sales:</span> $73,721.40
        </div>
      </div>
      
      <div className="relative h-64 w-full">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-[#6F8591] py-2">
          <div>$2500</div>
          <div>$2000</div>
          <div>$1500</div>
          <div>$1000</div>
          <div>$500</div>
          <div>$0</div>
        </div>
        
        {/* Chart area */}
        <div className="absolute left-10 right-0 top-0 bottom-5 flex items-end">
          {/* Line chart */}
          <svg className="w-full h-full" viewBox={`0 0 ${dataPoints.length - 1} 100`} preserveAspectRatio="none">
            <path
              d={`M0,${100 - (dataPoints[0] / maxValue) * 100} ${dataPoints.slice(1).map((point, i) => `L${i + 1},${100 - (point / maxValue) * 100}`).join(' ')}`}
              fill="none"
              stroke="#E46A11"
              strokeWidth="2"
            />
            
            {/* Data points */}
            {dataPoints.map((point, i) => (
              <circle
                key={i}
                cx={i}
                cy={100 - (point / maxValue) * 100}
                r="3"
                fill="white"
                stroke="#E46A11"
                strokeWidth="2"
              />
            ))}
            
            {/* Highlight a specific point */}
            <circle
              cx="4"
              cy={100 - (dataPoints[4] / maxValue) * 100}
              r="5"
              fill="#E46A11"
              stroke="white"
              strokeWidth="2"
            />
            
            {/* Tooltip for the highlighted point */}
            <g transform={`translate(4, ${100 - (dataPoints[4] / maxValue) * 100 - 20})`}>
              <rect x="-40" y="-20" width="80" height="20" rx="2" fill="#E46A11" />
              <text x="0" y="-7" textAnchor="middle" fill="white" fontSize="7">
                1520 Sales
              </text>
              <text x="0" y="0" textAnchor="middle" fill="white" fontSize="6">
                May 22, 7:00PM
              </text>
            </g>
          </svg>
        </div>
        
        {/* X-axis labels */}
        <div className="absolute left-10 right-0 bottom-0 flex justify-between text-xs text-[#6F8591]">
          <div>16 Feb</div>
          <div>17 Feb</div>
          <div>18 Feb</div>
          <div>19 Feb</div>
          <div>20 Feb</div>
          <div>21 Feb</div>
          <div>22 Feb</div>
          <div>23 Feb</div>
          <div>24 Feb</div>
        </div>
      </div>
    </div>
  );
};

export default SalesReportChart;