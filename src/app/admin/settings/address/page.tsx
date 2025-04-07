import React from 'react';
import AddressSettingsPage from '@/components/settings/address/AddressSettingsPage';

const AddressPage = () => {
  // In a real app, you might fetch initial data here
  const initialData = {
    email: 'info@druckland.com',
    phone: '(123) 456-7890',
    addressLine1: '123 Main Street',
    addressLine2: 'Suite 100',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'us',
  };

  return <AddressSettingsPage initialData={initialData} />;
};

export default AddressPage;

export const metadata = {
  title: 'Address Settings - Druckland Admin',
  description: 'Update business address and contact information'
};