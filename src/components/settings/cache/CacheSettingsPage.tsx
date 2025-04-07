'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Trash2, RotateCw, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

interface CacheSettingsProps {
  initialData?: CacheSettings;
}

interface CacheSettings {
  autoClear: boolean;
  lastCleared?: string;
}

const CacheSettingsPage: React.FC<CacheSettingsProps> = ({ initialData }) => {
  const [settings, setSettings] = useState<CacheSettings>(
    initialData || {
      autoClear: false,
      lastCleared: undefined
    }
  );
  
  const [isClearing, setIsClearing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle auto clear toggle
  const handleAutoClearToggle = () => {
    const newSettings = {
      ...settings,
      autoClear: !settings.autoClear
    };
    
    setSettings(newSettings);
    saveSettings(newSettings);
  };
  
  // Save settings
  const saveSettings = async (newSettings: CacheSettings) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, you would make an API call here
      // await fetch('/api/settings/cache', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newSettings)
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('Cache settings updated successfully');
    } catch (error) {
      console.error('Error updating cache settings:', error);
      toast.error('Failed to update cache settings');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Clear cache
  const handleClearCache = async () => {
    // Show confirmation dialog
    const confirmed = window.confirm('Are you sure you want to clear the cache? This action cannot be undone.');
    if (!confirmed) return;
    
    setIsClearing(true);
    
    try {
      // In a real app, you would make an API call here
      // await fetch('/api/settings/cache/clear', {
      //   method: 'POST'
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newSettings = {
        ...settings,
        lastCleared: new Date().toISOString()
      };
      
      setSettings(newSettings);
      toast.success('Cache cleared successfully');
    } catch (error) {
      console.error('Error clearing cache:', error);
      toast.error('Failed to clear cache');
    } finally {
      setIsClearing(false);
    }
  };
  
  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="cache-settings">
      <div className="mb-6">
        <h1 className="text-[#2B4F60] text-2xl font-semibold">Clear Cache</h1>
      </div>
      
      <div className="bg-white rounded-md border border-[#E4E7EB] overflow-hidden mb-6">
        <div className="p-6">
          <div className="bg-[#DCE8F8] border border-[#B8E2F2] rounded-md p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle size={20} className="text-[#007BF9] mr-2 mt-0.5 shrink-0" />
              <p className="text-sm text-[#49617E]">
                <span className="font-semibold">Important:</span> We have used an advance caching system. If you change anything in the admin panel, please, make sure to clear the cache from here. If you change anything in the admin panel, please, make sure to clear the cache from here.
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <Button
              type="button"
              leftIcon={<Trash2 size={16} />}
              onClick={handleClearCache}
              isLoading={isClearing}
            >
              Clear Cache
            </Button>
            
            {settings.lastCleared && (
              <p className="text-sm text-[#6F8591] mt-2">
                Last cleared: {formatDate(settings.lastCleared)}
              </p>
            )}
          </div>
          
          <div className="flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoClear}
                onChange={handleAutoClearToggle}
                className="sr-only peer"
                disabled={isSubmitting}
              />
              <div className="relative w-11 h-6 bg-[#E0E0E0] peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-[#007BF9] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#30BF89] mr-2"></div>
              <span className="text-sm font-medium text-[#49617E]">
                Auto Clear Cache
              </span>
              {isSubmitting && (
                <RotateCw size={16} className="ml-2 animate-spin text-[#007BF9]" />
              )}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CacheSettingsPage;