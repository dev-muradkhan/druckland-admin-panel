'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Save } from 'lucide-react';
import Button from '@/components/ui/Button';

interface AnalyticSettingsProps {
  initialData?: AnalyticSettings;
}

interface AnalyticSettings {
  googleAnalyticsId?: string;
  enableGoogleAnalytics: boolean;
  facebookPixelId?: string;
  enableFacebookPixel: boolean;
}

const AnalyticSettingsPage: React.FC<AnalyticSettingsProps> = ({ initialData }) => {
  const [formData, setFormData] = useState<AnalyticSettings>(
    initialData || {
      googleAnalyticsId: '',
      enableGoogleAnalytics: false,
      facebookPixelId: '',
      enableFacebookPixel: false,
    }
  );
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle toggle changes
  const handleToggleChange = (field: string) => {
    setFormData({
      ...formData,
      [field]: !formData[field as keyof AnalyticSettings],
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      // In a real application, you would make an API call here
      // await fetch('/api/settings/analytic', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success('Analytics settings updated successfully');
    } catch (error) {
      console.error('Error updating analytics settings:', error);
      toast.error('Failed to update analytics settings');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="analytic-settings">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-[#2B4F60] text-2xl font-semibold">Analytics</h1>
        <Button 
          type="button" 
          onClick={handleSubmit} 
          isLoading={isSubmitting}
          leftIcon={<Save size={16} />}
        >
          Save Changes
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Google Analytics */}
          <div className="analytic-settings__section">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="enableGoogleAnalytics"
                checked={formData.enableGoogleAnalytics}
                onChange={() => handleToggleChange('enableGoogleAnalytics')}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-[#E0E0E0] peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-[#007BF9] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#30BF89] mr-2"></div>
              <label htmlFor="enableGoogleAnalytics" className="text-sm font-medium text-[#49617E]">
                Enable Google Analytics
              </label>
            </div>
            
            <div className="mt-2">
              <label htmlFor="googleAnalyticsId" className="block text-sm font-medium text-[#49617E] mb-1">
                Google Analytics Id
              </label>
              <input
                type="text"
                id="googleAnalyticsId"
                name="googleAnalyticsId"
                value={formData.googleAnalyticsId || ''}
                onChange={handleInputChange}
                placeholder="Enter google analytics id"
                className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
              />
            </div>
          </div>
          
          {/* Facebook Pixel */}
          <div className="analytic-settings__section">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="enableFacebookPixel"
                checked={formData.enableFacebookPixel}
                onChange={() => handleToggleChange('enableFacebookPixel')}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-[#E0E0E0] peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-[#007BF9] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#30BF89] mr-2"></div>
              <label htmlFor="enableFacebookPixel" className="text-sm font-medium text-[#49617E]">
                Enable Facebook Pixel
              </label>
            </div>
            
            <div className="mt-2">
              <label htmlFor="facebookPixelId" className="block text-sm font-medium text-[#49617E] mb-1">
                Facebook Pixel Id
              </label>
              <input
                type="text"
                id="facebookPixelId"
                name="facebookPixelId"
                value={formData.facebookPixelId || ''}
                onChange={handleInputChange}
                placeholder="Enter facebook pixel id"
                className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AnalyticSettingsPage;