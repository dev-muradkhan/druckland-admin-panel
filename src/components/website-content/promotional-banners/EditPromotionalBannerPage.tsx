'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Edit2 } from 'lucide-react';
import { toast } from 'react-toastify';
import PromotionalBannerForm from '@/components/website-content/promotional-banners/PromotionalBannerForm';
import { PromotionalBanner, PromotionalBannerFormData } from '@/types/banners';

// Mock data for demonstration (would be fetched from API in real app)
const mockPromotionalBanners: Record<string, PromotionalBanner> = {
  'promo1': {
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
  'promo2': {
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
  }
};

interface EditPromotionalBannerPageProps {
  params: {
    id: string;
  };
}

export default function EditPromotionalBannerPage({ params }: EditPromotionalBannerPageProps) {
  const router = useRouter();
  const [banner, setBanner] = useState<PromotionalBanner | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call with a delay
    const fetchBanner = async () => {
      try {
        // In a real app, you would fetch data from your API
        // const response = await fetch(`/api/promotional-banners/${params.id}`);
        // const data = await response.json();
        
        // For now, use mock data
        setTimeout(() => {
          const bannerData = mockPromotionalBanners[params.id];
          
          if (bannerData) {
            setBanner(bannerData);
          } else {
            // Banner not found, redirect to banners list
            toast.error('Promotional banner not found');
            router.push('/admin/content/promotional-banners');
          }
          
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching promotional banner:', error);
        setIsLoading(false);
        toast.error('Failed to load promotional banner data');
      }
    };
    
    fetchBanner();
  }, [params.id, router]);
  
  const handleSubmit = async (data: PromotionalBannerFormData, exit: boolean = false) => {
    try {
      // In a real application, you would submit the data to your API
      // For example:
      // await fetch(`/api/promotional-banners/${params.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success('Promotional banner updated successfully');
      
      if (exit) {
        router.push('/admin/content/promotional-banners');
      }
    } catch (error) {
      console.error('Error updating promotional banner:', error);
      toast.error('Failed to update promotional banner');
      throw error;
    }
  };
  
  const handleDelete = async () => {
    try {
      // In a real application, you would delete via your API
      // For example:
      // await fetch(`/api/promotional-banners/${params.id}`, {
      //   method: 'DELETE'
      // });
      
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('Promotional banner deleted successfully');
      router.push('/admin/content/promotional-banners');
    } catch (error) {
      console.error('Error deleting promotional banner:', error);
      toast.error('Failed to delete promotional banner');
      throw error;
    }
  };

  // Convert PromotionalBanner to PromotionalBannerFormData format for the form
  const bannerToFormData = (banner: PromotionalBanner): PromotionalBannerFormData => {
    return {
      id: banner.id,
      name: banner.name,
      assignmentType: banner.assignmentType,
      assignedTo: banner.assignedTo,
      status: banner.status,
      title: banner.title,
      description: banner.description,
      offerCode: banner.offerCode,
      offerEndTime: banner.offerEndTime,
      instructionText: banner.instructionText,
      buttons: banner.buttons,
      image: banner.image
    };
  };

  if (isLoading) {
    return (
      <div className="edit-promotional-banner-page">
        <div className="edit-promotional-banner-page__loading bg-white p-8 rounded-md text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#DCE8F8] border-t-[#007BF9] rounded-full mx-auto mb-4"></div>
          <p className="text-[#49617E]">Loading promotional banner data...</p>
        </div>
      </div>
    );
  }
  
  if (!banner) {
    return (
      <div className="edit-promotional-banner-page">
        <div className="edit-promotional-banner-page__not-found bg-white p-8 rounded-md text-center">
          <p className="text-[#F85464] mb-4">Promotional banner not found</p>
          <button
            onClick={() => router.push('/admin/content/promotional-banners')}
            className="text-[#007BF9] hover:underline"
          >
            Return to Promotional Banners List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-promotional-banner-page">
      <div className="edit-promotional-banner-page__header mb-6">
        <h1 className="text-[#2B4F60] text-2xl font-semibold flex items-center">
          <Edit2 className="mr-2" size={24} />
          Edit Promotional Banner: {banner.name}
        </h1>
        <p className="text-[#49617E] mt-1">
          Update promotional banner details, offers, and content
        </p>
      </div>
      
      <PromotionalBannerForm 
        initialData={bannerToFormData(banner)} 
        onSubmit={handleSubmit} 
        onDelete={handleDelete}
      />
    </div>
  );
}