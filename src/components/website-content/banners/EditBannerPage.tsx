'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Edit2 } from 'lucide-react';
import { toast } from 'react-toastify';
import BannerForm from '@/components/website-content/banners/BannerForm';
import { Banner, BannerFormData } from '@/types/banners';

// Mock data for demonstration (would be fetched from API in real app)
const mockBanners: Record<string, Banner> = {
  'banner1': {
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
  'banner2': {
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
  }
};

interface EditBannerPageProps {
  params: {
    id: string;
  };
}

export default function EditBannerPage({ params }: EditBannerPageProps) {
  const router = useRouter();
  const [banner, setBanner] = useState<Banner | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call with a delay
    const fetchBanner = async () => {
      try {
        // In a real app, you would fetch data from your API
        // const response = await fetch(`/api/banners/${params.id}`);
        // const data = await response.json();
        
        // For now, use mock data
        setTimeout(() => {
          const bannerData = mockBanners[params.id];
          
          if (bannerData) {
            setBanner(bannerData);
          } else {
            // Banner not found, redirect to banners list
            toast.error('Banner not found');
            router.push('/admin/content/banners');
          }
          
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching banner:', error);
        setIsLoading(false);
        toast.error('Failed to load banner data');
      }
    };
    
    fetchBanner();
  }, [params.id, router]);
  
  const handleSubmit = async (data: BannerFormData, exit: boolean = false) => {
    try {
      // In a real application, you would submit the data to your API
      // For example:
      // await fetch(`/api/banners/${params.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success('Banner updated successfully');
      
      if (exit) {
        router.push('/admin/content/banners');
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      toast.error('Failed to update banner');
      throw error;
    }
  };
  
  const handleDelete = async () => {
    try {
      // In a real application, you would delete via your API
      // For example:
      // await fetch(`/api/banners/${params.id}`, {
      //   method: 'DELETE'
      // });
      
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('Banner deleted successfully');
      router.push('/admin/content/banners');
    } catch (error) {
      console.error('Error deleting banner:', error);
      toast.error('Failed to delete banner');
      throw error;
    }
  };

  // Convert Banner to BannerFormData format for the form
  const bannerToFormData = (banner: Banner): BannerFormData => {
    return {
      id: banner.id,
      name: banner.name,
      assignmentType: banner.assignmentType,
      assignedTo: banner.assignedTo,
      status: banner.status,
      title: banner.title,
      description: banner.description,
      buttons: banner.buttons,
      image: banner.image
    };
  };

  if (isLoading) {
    return (
      <div className="edit-banner-page">
        <div className="edit-banner-page__loading bg-white p-8 rounded-md text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#DCE8F8] border-t-[#007BF9] rounded-full mx-auto mb-4"></div>
          <p className="text-[#49617E]">Loading banner data...</p>
        </div>
      </div>
    );
  }
  
  if (!banner) {
    return (
      <div className="edit-banner-page">
        <div className="edit-banner-page__not-found bg-white p-8 rounded-md text-center">
          <p className="text-[#F85464] mb-4">Banner not found</p>
          <button
            onClick={() => router.push('/admin/content/banners')}
            className="text-[#007BF9] hover:underline"
          >
            Return to Banners List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-banner-page">
      <div className="edit-banner-page__header mb-6">
        <h1 className="text-[#2B4F60] text-2xl font-semibold flex items-center">
          <Edit2 className="mr-2" size={24} />
          Edit Banner: {banner.name}
        </h1>
        <p className="text-[#49617E] mt-1">
          Update banner details, content, and settings
        </p>
      </div>
      
      <BannerForm 
        initialData={bannerToFormData(banner)} 
        onSubmit={handleSubmit} 
        onDelete={handleDelete}
      />
    </div>
  );
}