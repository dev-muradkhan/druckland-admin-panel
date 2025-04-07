'use client';

import { useEffect, useState } from 'react';
import { Tag } from 'lucide-react';
import PromotionalBannerList from '@/components/website-content/promotional-banners/PromotionalBannerList';
import { PromotionalBanner, PromotionalBannerFilter } from '@/types/banners';

// Mock data for demonstration
const mockPromotionalBanners: PromotionalBanner[] = [
  {
    id: 'promo1',
    name: 'Summer Sale 2025',
    assignmentType: 'page',
    assignedTo: 'Home Page',
    status: 'active',
    title: 'Summer Special Offers',
    description: 'Get up to 50% off on all summer products',
    offerCode: 'SUMMER25',
    offerEndTime: '2025-07-31T23:59:59Z',
    instructionText: 'Use code at checkout',
    buttons: [
      { text: 'Shop Now', url: '/shop', title: 'Browse our summer collection' }
    ],
    image: {
      url: '/api/placeholder/800/300',
      alt: 'Summer sale promotional banner',
      title: 'Summer Sale 2025'
    },
    createdAt: '2025-03-15T10:30:00Z'
  },
  {
    id: 'promo2',
    name: 'First Order Discount',
    assignmentType: 'category',
    assignedTo: 'Business Cards',
    status: 'active',
    title: 'First Time Order?',
    description: 'Get 15% off your first order',
    offerCode: 'WELCOME15',
    instructionText: 'Enter code at checkout',
    buttons: [
      { text: 'Shop Now', url: '/business-cards', title: 'Browse business cards' },
      { text: 'Learn More', url: '/offers', title: 'See all offers' }
    ],
    image: {
      url: '/api/placeholder/800/300',
      alt: 'First order discount banner',
      title: 'First Order Discount'
    },
    createdAt: '2025-03-10T14:45:00Z'
  },
  {
    id: 'promo3',
    name: 'Holiday Season Deals',
    assignmentType: 'page',
    assignedTo: 'Products Page',
    status: 'inactive',
    title: 'Holiday Special',
    description: 'Special holiday discounts on all products',
    offerEndTime: '2025-12-25T23:59:59Z',
    buttons: [
      { text: 'Explore Deals', url: '/holiday-deals', title: 'See holiday offers' }
    ],
    image: {
      url: '/api/placeholder/800/300',
      alt: 'Holiday season deals banner',
      title: 'Holiday Season Deals'
    },
    createdAt: '2025-03-05T09:20:00Z'
  },
  {
    id: 'promo4',
    name: 'Flash Sale Friday',
    assignmentType: 'category',
    assignedTo: 'Flyers',
    status: 'active',
    title: '24 Hour Flash Sale',
    description: 'One day only! 30% off all flyers',
    offerCode: 'FLASH30',
    offerEndTime: '2025-04-01T23:59:59Z',
    instructionText: 'Limited time offer',
    buttons: [
      { text: 'Shop Now', url: '/flyers', title: 'Browse flyers' }
    ],
    image: {
      url: '/api/placeholder/800/300',
      alt: 'Flash sale promotional banner',
      title: 'Flash Sale Friday'
    },
    createdAt: '2025-02-28T16:15:00Z'
  },
  {
    id: 'promo5',
    name: 'New Customer Offer',
    assignmentType: 'page',
    assignedTo: 'Contact Us',
    status: 'active',
    title: 'New to Druckland?',
    description: 'Sign up and get 10% off your first order',
    offerCode: 'NEWBIE10',
    buttons: [
      { text: 'Sign Up', url: '/register', title: 'Create an account' },
      { text: 'Learn More', url: '/new-customer', title: 'New customer benefits' }
    ],
    image: {
      url: '/api/placeholder/800/300',
      alt: 'New customer offer banner',
      title: 'New Customer Offer'
    },
    createdAt: '2025-02-25T11:30:00Z'
  },
  {
    id: 'promo6',
    name: 'Bundle Deal',
    assignmentType: 'category',
    assignedTo: 'Brochures',
    status: 'inactive',
    title: 'Bundle & Save',
    description: 'Buy 3 different products and save 20%',
    offerCode: 'BUNDLE20',
    instructionText: 'Automatically applied at checkout',
    buttons: [
      { text: 'Create Bundle', url: '/bundles', title: 'Create your custom bundle' }
    ],
    image: {
      url: '/api/placeholder/800/300',
      alt: 'Bundle deal promotional banner',
      title: 'Bundle Deal Offer'
    },
    createdAt: '2025-02-20T13:45:00Z'
  },
  {
    id: 'promo7',
    name: 'Referral Program',
    assignmentType: 'page',
    assignedTo: 'Home Page',
    status: 'active',
    title: 'Refer & Earn',
    description: 'Refer a friend and both get $10 off',
    instructionText: 'Share your unique link',
    buttons: [
      { text: 'Start Referring', url: '/referral', title: 'Join our referral program' }
    ],
    image: {
      url: '/api/placeholder/800/300',
      alt: 'Referral program promotional banner',
      title: 'Referral Program'
    },
    createdAt: '2025-02-15T09:10:00Z'
  },
  {
    id: 'promo8',
    name: 'Free Shipping Promo',
    assignmentType: 'category',
    assignedTo: 'Posters',
    status: 'active',
    title: 'Free Shipping on Posters',
    description: 'Order any poster and get free shipping',
    offerCode: 'SHIPFREE',
    offerEndTime: '2025-05-15T23:59:59Z',
    instructionText: 'Enter code at checkout',
    buttons: [
      { text: 'Shop Posters', url: '/posters', title: 'Browse our poster collection' }
    ],
    image: {
      url: '/api/placeholder/800/300',
      alt: 'Free shipping promotional banner',
      title: 'Free Shipping Promotion'
    },
    createdAt: '2025-02-10T15:20:00Z'
  }
];

export default function PromotionalBannersPage() {
  const [promotionalBanners, setPromotionalBanners] = useState<PromotionalBanner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call with a delay
    const fetchData = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/promotional-banners');
        // const data = await response.json();
        
        // For now, use mock data
        setTimeout(() => {
          setPromotionalBanners(mockPromotionalBanners);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching promotional banners:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Default filter
  const initialFilter: PromotionalBannerFilter = {
    search: '',
    assignmentType: 'all',
    page: 1,
    limit: 10
  };

  return (
    <div className="promotional-banners-page">
      <div className="promotional-banners-page__header mb-6">
        <h1 className="text-[#2B4F60] text-2xl font-semibold flex items-center">
          <Tag className="mr-2" size={24} />
          Promotional Banners
        </h1>
        <p className="text-[#49617E] mt-1">
          Manage promotional banners with offers, coupons, and timers
        </p>
      </div>
      
      {isLoading ? (
        <div className="promotional-banners-page__loading bg-white p-8 rounded-md text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#DCE8F8] border-t-[#007BF9] rounded-full mx-auto mb-4"></div>
          <p className="text-[#49617E]">Loading promotional banners...</p>
        </div>
      ) : (
        <PromotionalBannerList 
          initialBanners={promotionalBanners} 
          initialTotal={promotionalBanners.length} 
          initialFilter={initialFilter}
        />
      )}
    </div>
  );
}