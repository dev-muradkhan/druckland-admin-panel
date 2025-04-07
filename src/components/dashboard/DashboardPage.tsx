'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';
import EnhancedDateFilter from '@/components/dashboard/EnhancedDateFilter';
import DashboardMetricBoxes from '@/components/dashboard/DashboardMetricBoxes';
import SalesReportChart from '@/components/dashboard/SalesReportChart';
import SalesProgressCircle from '@/components/dashboard/SalesProgressCircle';
import OrderStatistics from '@/components/dashboard/OrderStatistics';
import RecentOrdersList from '@/components/dashboard/RecentOrdersList';
import TopSellingProducts from '@/components/dashboard/TopSellingProducts';
import TopProductCategories from '@/components/dashboard/TopProductCategories';

const DashboardPage: React.FC = () => {
  // Handler for date filter application
  const handleApplyDateFilter = (startDate: string, endDate: string) => {
    console.log('Filter applied:', startDate, endDate);
    // Implement actual filtering logic
  };

  // Handler for clearing date filter
  const handleClearDateFilter = () => {
    console.log('Filter cleared');
    // Implement clearing logic
  };

  return (
    <div className="dashboard-page">
      {/* Header with breadcrumb and date filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[#2B4F60] text-2xl font-semibold flex items-center">
            <LayoutDashboard className="mr-2" size={24} />
            Dashboard
          </h1>
          <div className="breadcrumbs text-sm text-[#49617E] mt-1">
            <Link href="/admin" className="text-[#007BF9] hover:underline">
              Menu
            </Link>
            <span className="mx-2">/</span>
            <span>Dashboard</span>
          </div>
        </div>

        <EnhancedDateFilter 
          onApplyFilter={handleApplyDateFilter} 
          onClearFilter={handleClearDateFilter} 
        />
      </div>

      {/* Dashboard Metric Boxes */}
      <DashboardMetricBoxes />

      {/* Sales Reports and Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesReportChart />
        </div>
        <div className="lg:col-span-1">
          <SalesProgressCircle />
        </div>
      </div>

      {/* Order Statistics */}
      <OrderStatistics />

      {/* Recent Orders */}
      <RecentOrdersList />

      {/* Top Selling Products and Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopSellingProducts />
        <TopProductCategories />
      </div>
    </div>
  );
};

export default DashboardPage;