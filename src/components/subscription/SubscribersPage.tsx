'use client';

import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import SubscriberList from '@/components/subscription/SubscriberList';
import { Subscriber, SubscriberFilter } from '@/types/subscription';

// Mock data for demonstration
const mockSubscribers: Subscriber[] = [
  {
    id: '#23022523',
    email: 'maxkinsley@gmail.com',
    subscribedAt: '2025-02-18T16:33:00Z'
  },
  {
    id: '#23022523',
    email: 'maxkinsley@gmail.com',
    subscribedAt: '2025-02-17T14:45:00Z'
  },
  {
    id: '#23022523',
    email: 'maxkinsley@gmail.com',
    subscribedAt: '2025-02-16T09:20:00Z'
  },
  {
    id: '#23022523',
    email: 'maxkinsley@gmail.com',
    subscribedAt: '2025-02-15T11:30:00Z'
  },
  {
    id: '#23022523',
    email: 'maxkinsley@gmail.com',
    subscribedAt: '2025-02-14T16:15:00Z'
  },
  {
    id: '#23022523',
    email: 'maxkinsley@gmail.com',
    subscribedAt: '2025-02-13T10:45:00Z'
  },
  {
    id: '#23022523',
    email: 'maxkinsley@gmail.com',
    subscribedAt: '2025-02-12T13:20:00Z'
  },
  {
    id: '#23022523',
    email: 'maxkinsley@gmail.com',
    subscribedAt: '2025-02-11T09:10:00Z'
  }
];

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call with a delay
    const fetchData = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/subscribers');
        // const data = await response.json();
        
        // For now, use mock data
        setTimeout(() => {
          setSubscribers(mockSubscribers);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching subscribers:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Default filter
  const initialFilter: SubscriberFilter = {
    search: '',
    sortBy: 'newest',
    page: 1,
    limit: 10
  };

  return (
    <div className="subscribers-page">
      <div className="subscribers-page__header mb-6">
        <h1 className="text-[#2B4F60] text-2xl font-semibold flex items-center">
          <Bell className="mr-2" size={24} />
          All Subscriber
        </h1>
        <p className="text-[#49617E] mt-1">
          Manage subscribers who have signed up for your newsletters and updates
        </p>
      </div>
      
      {isLoading ? (
        <div className="subscribers-page__loading bg-white p-8 rounded-md text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#DCE8F8] border-t-[#007BF9] rounded-full mx-auto mb-4"></div>
          <p className="text-[#49617E]">Loading subscribers...</p>
        </div>
      ) : (
        <SubscriberList 
          initialSubscribers={subscribers} 
          initialTotal={subscribers.length} 
          initialFilter={initialFilter}
        />
      )}
    </div>
  );
}