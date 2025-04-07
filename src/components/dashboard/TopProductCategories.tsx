'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import Button from '@/components/ui/Button';

interface Category {
  name: string;
  subCategoryName: string | null;
  sold: number;
  amount: number;
}

const mockCategories: Category[] = [
  {
    name: 'Invitation Card',
    subCategoryName: 'Christmas Card',
    sold: 5000,
    amount: 350
  },
  {
    name: 'Business Card',
    subCategoryName: null,
    sold: 4500,
    amount: 350
  },
  {
    name: 'Photo Grid',
    subCategoryName: null,
    sold: 3000,
    amount: 350
  },
  {
    name: 'Office Supplies',
    subCategoryName: 'Envelopes',
    sold: 2000,
    amount: 350
  },
  {
    name: 'Photo Grid',
    subCategoryName: null,
    sold: 1000,
    amount: 350
  },
  {
    name: 'Photo Grid',
    subCategoryName: null,
    sold: 500,
    amount: 350
  }
];

const TopProductCategories: React.FC = () => {
  return (
    <div className="bg-white rounded-md border border-[#E4E7EB] overflow-hidden mb-6">
      <div className="flex justify-between items-center p-4 border-b border-[#E4E7EB]">
        <h2 className="text-[#2B4F60] text-lg font-semibold">Top Product Categories</h2>
        
        <div className="relative">
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
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F8F9FA] border-b border-[#E4E7EB]">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Category Name</th>
              <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Sub Category Name</th>
              <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Sold</th>
              <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Amount</th>
            </tr>
          </thead>
          <tbody>
            {mockCategories.map((category, index) => (
              <tr key={index} className="border-b border-[#E4E7EB] hover:bg-[#F8F9FA]">
                <td className="px-4 py-3 text-sm text-[#49617E]">{category.name}</td>
                <td className="px-4 py-3 text-sm text-[#49617E]">{category.subCategoryName || 'None'}</td>
                <td className="px-4 py-3 text-sm text-[#49617E]">{category.sold}</td>
                <td className="px-4 py-3 text-sm text-[#49617E]">${category.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center p-4 border-t border-[#E4E7EB]">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#49617E]">10</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#6F8591" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
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

export default TopProductCategories;