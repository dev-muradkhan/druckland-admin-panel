'use client';

import { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
import BannerList from '@/components/website-content/banners/BannerList';
import { Banner, BannerFilter } from '@/types/banners';

// Mock data for demonstration
const mockBanners: Banner[] = [
  {
    id: 'banner1',
    name: 'Invitation Card Banner',
    assignmentType: 'category',
    assignedTo: 'Category / Invitation card page',
    status: 'active',
    title: 'Special Summer Collection',
    description: 'Check out our new summer collection with special discounts',
    buttons: [
      { text: 'Shop Now', url: '/shop', title: 'Browse our collection' }
    ],
    image: {
      url: '/api/placeholder/800/300',
      alt: 'Summer collection banner',
      title: 'Summer Sale 2025'
    },
    createdAt: '2025-02-18T16:33:00Z'
  },
  {
    id: 'banner2',
    name: 'Invitation Card Banner',
    assignmentType: 'category',
    assignedTo: 'Category / Invitation card page',
    status: 'inactive',
    title: 'Winter Special Offers',
    description: 'Exclusive winter deals with up to 50% off',
    buttons: [
      { text: 'View Offers', url: '/offers', title: 'See all winter offers' },
      { text: 'Gift Cards', url: '/gift-cards', title: 'Purchase gift cards' }
    ],
    image: {
      url: '/api/placeholder/800/300',
      alt: 'Winter offers banner',
      title: 'Winter Sale 2025'
    },
    createdAt: '2025-02-17T14:45:00Z'
  },
  {
    id: 'banner3',
    name: 'Invitation Card Banner',
    assignmentType: 'category',
    assignedTo: 'Category / Invitation card page',
    status: 'active',
    title: 'New Arrival Products',
    description: 'Be the first to shop our latest products',
    buttons: [
      { text: 'Explore', url: '/new-arrivals', title: 'View new products' }
    ],
    image: {
      url: '/api/placeholder/800/300',
      alt: 'New arrivals banner',
      title: 'New Products 2025'
    },
    createdAt: '2025-02-16T10:20:00Z'
  },
  {
    id: 'banner4',
    name: 'Invitation Card Banner',
    assignmentType: 'category',
    assignedTo: 'Category / Invitation card page',
    status: 'inactive',
    title: 'Holiday Special',
    description: 'Get ready for the holidays with our special collection',
    buttons: [
      { text: 'Shop Holiday', url: '/holiday', title: 'Browse holiday collection' },
      { text: 'Gift Guide', url: '/gift-guide', title: 'View our gift guide' }
    ],
    image: {
      url: '/api/placeholder/800/300',
      alt: 'Holiday special banner',
      title: 'Holiday Collection 2025'
    },
    createdAt: '2025-02-15T09:30:00Z'
  },
  {
    id: 'banner5',
    name: 'Invitation Card Banner',
    assignmentType: 'category',
    assignedTo: 'Category / Invitation card page',
    status: 'active',
    title: 'Flash Sale',
    description: '24-hour flash sale with incredible discounts',
    buttons: [
      { text: 'Shop Now', url: '/flash-sale', title: 'View flash sale items' },
      { text: 'Set Reminder', url: '/reminder', title: 'Get notified about upcoming sales' }
    ],
    image: {
      url: '/api/placeholder/800/300',
      alt: 'Flash sale banner',
      title: 'Flash Sale 2025'
    },
    createdAt: '2025-02-14T16:15:00Z'
  },
  {
    id: 'banner6',
    name: 'Invitation Card Banner',
    assignmentType: 'category',
    assignedTo: 'Category / Invitation card page',
    status: 'inactive',
    title: 'Membership Benefits',
    description: 'Join our membership program for exclusive benefits',
    buttons: [
      { text: 'Join Now', url: '/membership', title: 'Become a member' }
    ],
    image: {
      url: '/api/placeholder/800/300',
      alt: 'Membership banner',
      title: 'Membership Program'
    },
    createdAt: '2025-02-13T11:40:00Z'
  },
  {
    id: 'banner7',
    name: 'Invitation Card Banner',
    assignmentType: 'category',
    assignedTo: 'Category / Invitation card page',
    status: 'active',
    title: 'Free Shipping',
    description: 'Free shipping on all orders over $50',
    buttons: [
      { text: 'Learn More', url: '/shipping', title: 'Shipping details' }
    ],
    image: {
      url: '/api/placeholder/800/300',
      alt: 'Free shipping banner',
      title: 'Free Shipping Promotion'
    },
    createdAt: '2025-02-12T13:20:00Z'
  },
  {
    id: 'banner8',
    name: 'Invitation Card Banner',
    assignmentType: 'category',
    assignedTo: 'Category / Invitation card page',
    status: 'inactive',
    title: 'Referral Program',
    description: 'Refer a friend and both get $10 off your next purchase',
    buttons: [
      { text: 'Refer Now', url: '/referral', title: 'Send referrals' },
      { text: 'Terms', url: '/referral-terms', title: 'View program terms' }
    ],
    image: {
      url: '/api/placeholder/800/300',
      alt: 'Referral program banner',
      title: 'Referral Program'
    },
    createdAt: '2025-02-11T09:10:00Z'
  }
];

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call with a delay
    const fetchData = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/banners');
        // const data = await response.json();
        
        // For now, use mock data
        setTimeout(() => {
          setBanners(mockBanners);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching banners:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Default filter
  const initialFilter: BannerFilter = {
    search: '',
    assignmentType: 'all',
    page: 1,
    limit: 10
  };

  return (
    <div className="banners-page">
      <div className="banners-page__header mb-6">
        <h1 className="text-[#2B4F60] text-2xl font-semibold flex items-center">
          <FileText className="mr-2" size={24} />
          All Banners
        </h1>
        <p className="text-[#49617E] mt-1">
          Manage website banners that display on various pages and categories
        </p>
      </div>
      
      {isLoading ? (
        <div className="banners-page__loading bg-white p-8 rounded-md text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#DCE8F8] border-t-[#007BF9] rounded-full mx-auto mb-4"></div>
          <p className="text-[#49617E]">Loading banners...</p>
        </div>
      ) : (
        <BannerList 
          initialBanners={banners} 
          initialTotal={banners.length} 
          initialFilter={initialFilter}
        />
      )}
    </div>
  );
}