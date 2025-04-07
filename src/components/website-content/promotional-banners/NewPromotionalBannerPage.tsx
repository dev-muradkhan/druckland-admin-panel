'use client';

import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import PromotionalBannerForm from '@/components/website-content/promotional-banners/PromotionalBannerForm';
import { PromotionalBannerFormData } from '@/types/banners';

export default function NewPromotionalBannerPage() {
  const router = useRouter();
  
  const handleSubmit = async (data: PromotionalBannerFormData, exit: boolean = false) => {
    try {
      // In a real application, you would submit the data to your API
      // For example:
      // await fetch('/api/promotional-banners', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success('Promotional banner created successfully');
      
      if (exit) {
        router.push('/admin/content/promotional-banners');
      }
    } catch (error) {
      console.error('Error creating promotional banner:', error);
      toast.error('Failed to create promotional banner');
      throw error;
    }
  };

  return (
    <div className="new-promotional-banner-page">
      <div className="new-promotional-banner-page__header mb-6">
        <h1 className="text-[#2B4F60] text-2xl font-semibold flex items-center">
          <Plus className="mr-2" size={24} />
          Create New Promotional Banner
        </h1>
        <p className="text-[#49617E] mt-1">
          Create a new promotional banner with offers, timers, and targeted content
        </p>
      </div>
      
      <PromotionalBannerForm onSubmit={handleSubmit} />
    </div>
  );
}