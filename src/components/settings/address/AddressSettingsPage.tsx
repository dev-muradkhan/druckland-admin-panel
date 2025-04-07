'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Save } from 'lucide-react';
import Button from '@/components/ui/Button';

interface AddressSettingsProps {
  initialData?: AddressSettings;
}

interface AddressSettings {
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Mock country list
const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
  { value: 'in', label: 'India' },
  { value: 'br', label: 'Brazil' },
];

const AddressSettingsPage: React.FC<AddressSettingsProps> = ({ initialData }) => {
  const [formData, setFormData] = useState<AddressSettings>(
    initialData || {
      email: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    }
  );
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]*$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Address Line 1 is required
    if (!formData.addressLine1) {
      newErrors.addressLine1 = 'Address is required';
    }
    
    // City is required
    if (!formData.city) {
      newErrors.city = 'City is required';
    }
    
    // State is required
    if (!formData.state) {
      newErrors.state = 'State is required';
    }
    
    // Zip Code is required
    if (!formData.zipCode) {
      newErrors.zipCode = 'Zip Code is required';
    }
    
    // Country is required
    if (!formData.country) {
      newErrors.country = 'Country is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real application, you would make an API call here
      // await fetch('/api/settings/address', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success('Address settings updated successfully');
    } catch (error) {
      console.error('Error updating address settings:', error);
      toast.error('Failed to update address settings');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="address-settings">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-[#2B4F60] text-2xl font-semibold">Address</h1>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="address-settings__field">
              <label htmlFor="email" className="block text-sm font-medium text-[#49617E] mb-1">
                Email Address <span className="text-[#F85464]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className={`w-full px-4 py-2 border ${
                  errors.email ? 'border-[#F85464]' : 'border-[#E4E7EB]'
                } rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-[#F85464]">{errors.email}</p>
              )}
            </div>
            
            {/* Phone */}
            <div className="address-settings__field">
              <label htmlFor="phone" className="block text-sm font-medium text-[#49617E] mb-1">
                Phone Number <span className="text-[#F85464]">*</span>
              </label>
              <div className="flex">
                <div className="flex-shrink-0">
                  <select
                    className="h-full rounded-l-md border border-r-0 border-[#E4E7EB] bg-white py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                  >
                    <option>US</option>
                  </select>
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(201)555-0123"
                  className={`w-full rounded-r-md border ${
                    errors.phone ? 'border-[#F85464]' : 'border-[#E4E7EB]'
                  } px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs text-[#F85464]">{errors.phone}</p>
              )}
            </div>
            
            {/* Address Line 1 */}
            <div className="address-settings__field">
              <label htmlFor="addressLine1" className="block text-sm font-medium text-[#49617E] mb-1">
                Address 1 <span className="text-[#F85464]">*</span>
              </label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleInputChange}
                placeholder="Enter your address"
                className={`w-full px-4 py-2 border ${
                  errors.addressLine1 ? 'border-[#F85464]' : 'border-[#E4E7EB]'
                } rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]`}
              />
              {errors.addressLine1 && (
                <p className="mt-1 text-xs text-[#F85464]">{errors.addressLine1}</p>
              )}
            </div>
            
            {/* Address Line 2 */}
            <div className="address-settings__field">
              <label htmlFor="addressLine2" className="block text-sm font-medium text-[#49617E] mb-1">
                Address 2 
              </label>
              <input
                type="text"
                id="addressLine2"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleInputChange}
                placeholder="Enter your address"
                className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
              />
            </div>
            
            {/* City */}
            <div className="address-settings__field">
              <label htmlFor="city" className="block text-sm font-medium text-[#49617E] mb-1">
                City <span className="text-[#F85464]">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter your address"
                className={`w-full px-4 py-2 border ${
                  errors.city ? 'border-[#F85464]' : 'border-[#E4E7EB]'
                } rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]`}
              />
              {errors.city && (
                <p className="mt-1 text-xs text-[#F85464]">{errors.city}</p>
              )}
            </div>
            
            {/* State */}
            <div className="address-settings__field">
              <label htmlFor="state" className="block text-sm font-medium text-[#49617E] mb-1">
                State <span className="text-[#F85464]">*</span>
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="Enter your state"
                className={`w-full px-4 py-2 border ${
                  errors.state ? 'border-[#F85464]' : 'border-[#E4E7EB]'
                } rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]`}
              />
              {errors.state && (
                <p className="mt-1 text-xs text-[#F85464]">{errors.state}</p>
              )}
            </div>
            
            {/* Zipcode */}
            <div className="address-settings__field">
              <label htmlFor="zipCode" className="block text-sm font-medium text-[#49617E] mb-1">
                Zipcode <span className="text-[#F85464]">*</span>
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="Enter your zipcode"
                className={`w-full px-4 py-2 border ${
                  errors.zipCode ? 'border-[#F85464]' : 'border-[#E4E7EB]'
                } rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]`}
              />
              {errors.zipCode && (
                <p className="mt-1 text-xs text-[#F85464]">{errors.zipCode}</p>
              )}
            </div>
            
            {/* Country */}
            <div className="address-settings__field">
              <label htmlFor="country" className="block text-sm font-medium text-[#49617E] mb-1">
                Country <span className="text-[#F85464]">*</span>
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors.country ? 'border-[#F85464]' : 'border-[#E4E7EB]'
                } rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]`}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="mt-1 text-xs text-[#F85464]">{errors.country}</p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddressSettingsPage;