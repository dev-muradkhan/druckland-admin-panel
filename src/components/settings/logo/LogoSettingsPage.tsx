'use client';

import { useState } from 'react';
import { FileImage, Info } from 'lucide-react';
import { toast } from 'react-toastify';
import LogoUploader from './LogoUploader';
import { LogoSettings } from '@/types/settings';

export default function LogoSettingsPage() {
  // Mock initial data - in a real app, this would come from API
  const [logoSettings, setLogoSettings] = useState<LogoSettings>({
    headerLogo: '/images/druckland-logo.svg',
    footerLogo: '/images/druckland-logo.svg',
    favicon: '/images/druckland-favicon.svg'
  });
  
  const [isUpdating, setIsUpdating] = useState({
    header: false,
    footer: false,
    favicon: false
  });

  // Handle logo update
  const handleSaveChanges = async (type: 'header' | 'footer' | 'favicon') => {
    try {
      setIsUpdating({ ...isUpdating, [type]: true });
      
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, you would make an API call here to save the logo
      // const response = await fetch('/api/settings/logo', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ type, logoUrl: logoSettings[`${type}Logo`] })
      // });
      
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} logo updated successfully!`);
    } catch (error) {
      console.error(`Error updating ${type} logo:`, error);
      toast.error(`Failed to update ${type} logo. Please try again.`);
    } finally {
      setIsUpdating({ ...isUpdating, [type]: false });
    }
  };

  // Handle logo upload
  const handleLogoUpload = (type: 'header' | 'footer' | 'favicon', file: File) => {
    // In a real app, you would upload the file to your server or cloud storage
    // and get back a URL to store
    
    // For demo purposes, create a temporary URL
    const imageUrl = URL.createObjectURL(file);
    
    setLogoSettings({
      ...logoSettings,
      [`${type}Logo`]: imageUrl
    });
    
    toast.info(`${type.charAt(0).toUpperCase() + type.slice(1)} logo staged for update. Click "Save Changes" to apply.`);
  };

  return (
    <div className="logo-settings-page">
      <div className="logo-settings-page__header mb-6">
        <h1 className="text-[#2B4F60] text-2xl font-semibold">Website Logo</h1>
        <p className="text-[#49617E] mt-1">
          Update your website logos and favicon
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Header Logo Section */}
        <div className="logo-section bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
          <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
            <h2 className="text-[#2B4F60] text-lg font-semibold">Header Logo</h2>
          </div>
          
          <div className="p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div className="flex-1">
              <LogoUploader
                currentLogo={logoSettings.headerLogo}
                onUpload={(file) => handleLogoUpload('header', file)}
                size="large"
              />
              
              <div className="mt-4 flex items-start space-x-2">
                <Info size={18} className="text-[#007BF9] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#49617E]">
                  Recommended size: 180x50 pixels. Max file size: 2MB. Supported formats: PNG, JPG, SVG.
                </p>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <button
                type="button"
                onClick={() => handleSaveChanges('header')}
                disabled={isUpdating.header}
                className="bg-[#E9486B] hover:bg-[#d43d5f] text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center min-w-[160px]"
              >
                {isUpdating.header ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer Logo Section */}
        <div className="logo-section bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
          <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
            <h2 className="text-[#2B4F60] text-lg font-semibold">Footer Logo</h2>
          </div>
          
          <div className="p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div className="flex-1">
              <LogoUploader
                currentLogo={logoSettings.footerLogo}
                onUpload={(file) => handleLogoUpload('footer', file)}
                size="large"
              />
              
              <div className="mt-4 flex items-start space-x-2">
                <Info size={18} className="text-[#007BF9] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#49617E]">
                  Recommended size: 180x50 pixels. Max file size: 2MB. Supported formats: PNG, JPG, SVG.
                </p>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <button
                type="button"
                onClick={() => handleSaveChanges('footer')}
                disabled={isUpdating.footer}
                className="bg-[#E9486B] hover:bg-[#d43d5f] text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center min-w-[160px]"
              >
                {isUpdating.footer ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Favicon Section */}
        <div className="logo-section bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
          <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
            <h2 className="text-[#2B4F60] text-lg font-semibold">Favicon</h2>
          </div>
          
          <div className="p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div className="flex-1">
              <LogoUploader
                currentLogo={logoSettings.favicon}
                onUpload={(file) => handleLogoUpload('favicon', file)}
                size="small"
              />
              
              <div className="mt-4 flex items-start space-x-2">
                <Info size={18} className="text-[#007BF9] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#49617E]">
                  Recommended size: 32x32 pixels. Max file size: 1MB. Supported formats: PNG, ICO. This image will appear in browser tabs.
                </p>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <button
                type="button"
                onClick={() => handleSaveChanges('favicon')}
                disabled={isUpdating.favicon}
                className="bg-[#E9486B] hover:bg-[#d43d5f] text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center min-w-[160px]"
              >
                {isUpdating.favicon ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}