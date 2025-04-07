import React from 'react';
import CacheSettingsPage from '@/components/settings/cache/CacheSettingsPage';

const CachePage = () => {
  // In a real app, you might fetch initial data here
  const initialData = {
    autoClear: false,
    lastCleared: '2025-03-19T09:30:00Z',
  };

  return <CacheSettingsPage initialData={initialData} />;
};

export default CachePage;

export const metadata = {
  title: 'Cache Management - Druckland Admin',
  description: 'Clear website cache and configure auto-clearing settings'
};