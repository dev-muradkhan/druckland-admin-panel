'use client';

import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import BannerForm from '@/components/website-content/banners/BannerForm';
import { BannerFormData } from '@/types/banners';

export default function NewBannerPage() {
  const router = useRouter();
  
  const handleSubmit = async (data: BannerFormData, exit: boolean = false) => {
    try {
      // In a real application, you would submit the data to your API
      // For example:
      // await fetch('/api/banners', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success('Banner created successfully');
      
      if (exit) {
        router.push('/admin/content/banners');
      }
    } catch (error) {
      console.error('Error creating banner:', error);
      toast.error('Failed to create banner');
      throw error;
    }
  };

  return (
    <div className="new-banner-page">
      <div className="new-banner-page__header mb-6">
        <h1 className="text-[#2B4F60] text-2xl font-semibold flex items-center">
          <Plus className="mr-2" size={24} />
          Create New Banner
        </h1>
        <p className="text-[#49617E] mt-1">
          Create a new banner for display on your website's pages or categories
        </p>
      </div>
      
      <BannerForm onSubmit={handleSubmit} />
    </div>
  );
}