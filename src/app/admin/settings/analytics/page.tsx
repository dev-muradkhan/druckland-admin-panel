import React from 'react';
import AnalyticSettingsPage from '@/components/settings/analytics/AnalyticSettingsPage';

const AnalyticPage = () => {
  // In a real app, you might fetch initial data here
  const initialData = {
    googleAnalyticsId: 'GA-123456789',
    enableGoogleAnalytics: true,
    facebookPixelId: '987654321',
    enableFacebookPixel: false,
  };

  return <AnalyticSettingsPage initialData={initialData} />;
};

export default AnalyticPage;

export const metadata = {
  title: 'Analytics Settings - Druckland Admin',
  description: 'Configure Google Analytics and Facebook Pixel tracking'
};