'use client';

import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { 
  Save, 
  Upload,
  FileImage
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { PaymentMethod, PaypalCredentials, StripeCredentials } from '@/types/orders';

interface PaymentMethodCardProps {
  method: PaymentMethod;
  onUpdate: (updatedMethod: PaymentMethod) => void;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  method,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PaymentMethod>(method);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested credential fields
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...(formData as any)[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to your server or cloud storage
      // For now, simulate with URL.createObjectURL
      const imageUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        logo: imageUrl
      });
    }
  };

  const handleSave = async () => {
    // Validate required fields based on payment method type
    if (!formData.name.trim()) {
      toast.error('Method name is required');
      return;
    }
    
    if (method.type === 'stripe') {
      const stripeCredentials = formData.credentials as StripeCredentials;
      if (!stripeCredentials?.publicKey?.trim()) {
        toast.error('Stripe Public Key is required');
        return;
      }
      if (!stripeCredentials?.privateKey?.trim()) {
        toast.error('Stripe Private Key is required');
        return;
      }
      if (!stripeCredentials?.webhookSecret?.trim()) {
        toast.error('Webhook Secret is required');
        return;
      }
    } else if (method.type === 'paypal') {
      const paypalCredentials = formData.credentials as PaypalCredentials;
      if (!paypalCredentials?.clientId?.trim()) {
        toast.error('PayPal Client ID is required');
        return;
      }
      if (!paypalCredentials?.clientSecret?.trim()) {
        toast.error('PayPal Client Secret is required');
        return;
      }
    }
    
    setIsSaving(true);
    
    try {
      // API call would go here
      // await fetch(`/api/payment-methods/${method.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      onUpdate(formData);
      toast.success(`${formData.name} settings updated successfully`);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating payment method:', error);
      toast.error('Failed to update payment method settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeactivate = async () => {
    setIsDeactivating(true);
    
    try {
      // API call would go here
      // await fetch(`/api/payment-methods/${method.id}/deactivate`, {
      //   method: 'POST'
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedMethod = { ...formData, isActive: false };
      onUpdate(updatedMethod);
      setFormData(updatedMethod);
      toast.success(`${formData.name} deactivated successfully`);
    } catch (error) {
      console.error('Error deactivating payment method:', error);
      toast.error('Failed to deactivate payment method');
    } finally {
      setIsDeactivating(false);
    }
  };

  // Render payment method card
  return (
    <div className="payment-method-card bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
      {/* Card Header - Always Visible */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6">
        <div className="flex items-center gap-4">
          {method.logo ? (
            <div className="w-32 h-12 relative">
              <Image
                src={method.logo}
                alt={method.name}
                width={128}
                height={48}
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-32 h-12 bg-[#F5F7FA] flex items-center justify-center rounded">
              <span className="text-[#6F8591]">{method.name}</span>
            </div>
          )}
          <div>
            <h3 className="text-[#2B4F60] font-medium">{method.name}</h3>
            <p className="text-sm text-[#49617E]">{method.description}</p>
          </div>
        </div>
        
        <button
          className="mt-3 sm:mt-0 text-[#007BF9] border border-[#007BF9] px-3 py-1 rounded hover:bg-[#F0F7FF] transition-colors"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>
      
      {/* Form Fields - Visible when Editing */}
      {isEditing && (
        <div className="p-6 border-t border-[#E4E7EB]">
          {/* Common Fields */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="form-group">
              <label htmlFor={`${method.id}-name`} className="block text-sm font-medium text-[#49617E] mb-1">
                Method Name <span className="text-[#F85464]">*</span>
              </label>
              <input
                type="text"
                id={`${method.id}-name`}
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor={`${method.id}-description`} className="block text-sm font-medium text-[#49617E] mb-1">
                Short Description
              </label>
              <textarea
                id={`${method.id}-description`}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                rows={2}
              />
            </div>
          </div>
          
          {/* Method Logo Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#49617E] mb-3">
              Method Logo
            </label>
            
            <div className="flex items-start gap-4">
              <div className="w-40 h-24 border border-[#E4E7EB] rounded-md overflow-hidden bg-[#F5F7FA] flex items-center justify-center">
                {formData.logo ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={formData.logo}
                      alt="Payment method logo"
                      width={160}
                      height={96}
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <FileImage size={24} className="text-[#6F8591]" />
                )}
              </div>
              
              <div className="flex-1">
                <p className="text-sm text-[#6F8591] mb-2">
                  Choose image or add URL
                </p>
                <div className="flex gap-2">
                  <label className="cursor-pointer">
                    <div className="px-4 py-2 bg-[#F0F7FF] text-[#007BF9] border border-[#007BF9] rounded-md hover:bg-[#DCE8F8] transition-colors text-sm flex items-center gap-1">
                      <Upload size={14} />
                      Add Image
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Enter URL here..."
                    className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9] text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment Method Specific Fields */}
          {method.type === 'stripe' && (
            <div className="mb-6 space-y-4">
              <h4 className="text-sm font-semibold text-[#2B4F60]">
                Please provide information for Stripe
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="stripe-public-key" className="block text-sm font-medium text-[#49617E] mb-1">
                    Stripe Public Key <span className="text-[#F85464]">*</span>
                  </label>
                  <input
                    type="text"
                    id="stripe-public-key"
                    name="credentials.publicKey"
                    value={(formData.credentials as StripeCredentials)?.publicKey || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                    required
                    placeholder="pk_test_..."
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="stripe-private-key" className="block text-sm font-medium text-[#49617E] mb-1">
                    Stripe Private Key <span className="text-[#F85464]">*</span>
                  </label>
                  <input
                    type="password"
                    id="stripe-private-key"
                    name="credentials.privateKey"
                    value={(formData.credentials as StripeCredentials)?.privateKey || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                    required
                    placeholder="sk_test_..."
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="payment-type" className="block text-sm font-medium text-[#49617E] mb-1">
                    Payment Type
                  </label>
                  <select
                    id="payment-type"
                    name="credentials.paymentType"
                    value={(formData.credentials as StripeCredentials)?.paymentType || 'one_time'}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                  >
                    <option value="one_time">One-time Payment</option>
                    <option value="subscription">Subscription</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="webhook-secret" className="block text-sm font-medium text-[#49617E] mb-1">
                    Webhook Secret <span className="text-[#F85464]">*</span>
                  </label>
                  <input
                    type="password"
                    id="webhook-secret"
                    name="credentials.webhookSecret"
                    value={(formData.credentials as StripeCredentials)?.webhookSecret || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                    required
                    placeholder="whsec_..."
                  />
                </div>
              </div>
            </div>
          )}
          
          {method.type === 'paypal' && (
            <div className="mb-6 space-y-4">
              <h4 className="text-sm font-semibold text-[#2B4F60]">
                Please provide information for PayPal
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="paypal-client-id" className="block text-sm font-medium text-[#49617E] mb-1">
                    Client ID <span className="text-[#F85464]">*</span>
                  </label>
                  <input
                    type="text"
                    id="paypal-client-id"
                    name="credentials.clientId"
                    value={(formData.credentials as PaypalCredentials)?.clientId || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="paypal-client-secret" className="block text-sm font-medium text-[#49617E] mb-1">
                    Client Secret <span className="text-[#F85464]">*</span>
                  </label>
                  <input
                    type="password"
                    id="paypal-client-secret"
                    name="credentials.clientSecret"
                    value={(formData.credentials as PaypalCredentials)?.clientSecret || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                    required
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              variant="danger"
              onClick={handleDeactivate}
              isLoading={isDeactivating}
              disabled={!formData.isActive}
            >
              Deactivate
            </Button>
            
            <Button
              variant="primary"
              leftIcon={<Save size={16} />}
              onClick={handleSave}
              isLoading={isSaving}
            >
              Update
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodCard;