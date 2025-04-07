'use client';

import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';

interface DateFilterProps {
  onApplyFilter?: (startDate: string, endDate: string) => void;
  onClearFilter?: () => void;
  className?: string;
}

const EnhancedDateFilter: React.FC<DateFilterProps> = ({
  onApplyFilter,
  onClearFilter,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterType, setFilterType] = useState<'today' | 'this-week' | 'last-7-days' | 'last-30-days' | 'this-month' | 'this-year' | 'custom'>('this-month');
  const [selectedMonths, setSelectedMonths] = useState<{ year: number, month: number }[]>([
    { year: 2025, month: 0 }, // January 2025
    { year: 2025, month: 1 }, // February 2025
  ]);
  const [dateRange, setDateRange] = useState<{ start: string, end: string }>({
    start: '02-01-2025',
    end: '18-02-2025',
  });

  // Toggle filter dropdown
  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  // Apply the filter
  const handleApplyFilter = () => {
    if (onApplyFilter) {
      onApplyFilter(dateRange.start, dateRange.end);
    }
    setIsOpen(false);
  };

  // Clear the filter
  const handleClearFilter = () => {
    if (onClearFilter) {
      onClearFilter();
    }
    setIsOpen(false);
  };

  // Get days in a month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for the first day of the month
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar for a month
  const generateCalendar = (year: number, month: number) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const days = [];

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Day names
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className={`date-filter relative ${className}`}>
      <Button
        type="button"
        variant="outline"
        size="md"
        leftIcon={<Calendar size={16} />}
        onClick={toggleFilter}
        className="w-full md:w-auto"
      >
        Select Dates
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-md border border-[#E4E7EB] shadow-lg z-50 w-full md:w-auto">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Filter options */}
            <div className="w-full md:w-48 border-r border-[#E4E7EB]">
              <div className="p-2">
                <div className="space-y-1">
                  <button 
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${filterType === 'today' ? 'bg-[#007BF9] text-white' : 'hover:bg-[#F5F5F5] text-[#49617E]'}`}
                    onClick={() => setFilterType('today')}
                  >
                    Today
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${filterType === 'this-week' ? 'bg-[#007BF9] text-white' : 'hover:bg-[#F5F5F5] text-[#49617E]'}`}
                    onClick={() => setFilterType('this-week')}
                  >
                    This week
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${filterType === 'last-7-days' ? 'bg-[#007BF9] text-white' : 'hover:bg-[#F5F5F5] text-[#49617E]'}`}
                    onClick={() => setFilterType('last-7-days')}
                  >
                    Last 7 days
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${filterType === 'last-30-days' ? 'bg-[#007BF9] text-white' : 'hover:bg-[#F5F5F5] text-[#49617E]'}`}
                    onClick={() => setFilterType('last-30-days')}
                  >
                    Last 30 days
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${filterType === 'this-month' ? 'bg-[#F85464] text-white' : 'hover:bg-[#F5F5F5] text-[#49617E]'}`}
                    onClick={() => setFilterType('this-month')}
                  >
                    This Month
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${filterType === 'this-year' ? 'bg-[#007BF9] text-white' : 'hover:bg-[#F5F5F5] text-[#49617E]'}`}
                    onClick={() => setFilterType('this-year')}
                  >
                    This Year
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${filterType === 'custom' ? 'bg-[#007BF9] text-white' : 'hover:bg-[#F5F5F5] text-[#49617E]'}`}
                    onClick={() => setFilterType('custom')}
                  >
                    Custom Range
                  </button>
                </div>
              </div>
            </div>

            {/* Right side - Calendar */}
            <div className="w-full md:min-w-[600px] p-4">
              <div className="flex justify-between">
                {selectedMonths.map((monthData, index) => (
                  <div key={index} className="w-1/2 px-2">
                    <div className="flex justify-between items-center mb-4">
                      <button 
                        className="p-1 rounded-full hover:bg-[#F5F5F5]"
                        onClick={() => {/* Previous month logic */}}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <h3 className="text-[#2B4F60] font-medium">
                        {monthNames[monthData.month]} {monthData.year}
                      </h3>
                      <button 
                        className="p-1 rounded-full hover:bg-[#F5F5F5]"
                        onClick={() => {/* Next month logic */}}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {/* Day names */}
                      {dayNames.map((day, i) => (
                        <div 
                          key={i} 
                          className="text-xs text-center py-1 text-[#6F8591]"
                        >
                          {day}
                        </div>
                      ))}
                      
                      {/* Calendar days */}
                      {generateCalendar(monthData.year, monthData.month).map((day, i) => (
                        <div 
                          key={i} 
                          className={`
                            text-xs text-center py-2 
                            ${day ? 'cursor-pointer hover:bg-[#F5F5F5] rounded-full' : ''}
                            ${day === 2 && monthData.month === 0 ? 'bg-[#F85464] text-white rounded-full' : ''}
                            ${day === 18 && monthData.month === 1 ? 'bg-[#F85464] text-white rounded-full' : ''}
                          `}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center text-sm text-[#49617E]">
                {dateRange.start} - {dateRange.end}
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleClearFilter}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleApplyFilter}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedDateFilter;