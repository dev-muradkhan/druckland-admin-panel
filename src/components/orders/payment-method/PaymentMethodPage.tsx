'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Save, CreditCard } from 'lucide-react';
import Button from '@/components/ui/Button';
import PaymentMethodCard from '@/components/orders/payment-method/PaymentMethodCard';
import { PaymentMethod } from '@/types/orders';

// Mock data for demonstration
const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Customer can buy product and pay directly using Visa, Credit card via Stripe',
    logo: '/api/placeholder/120/50',
    isActive: true,
    isDefault: false,
    type: 'stripe',
    credentials: {
      publicKey: 'pk_test_123456789',
      privateKey: 'sk_test_123456789',
      paymentType: 'one_time',
      webhookSecret: 'whsec_123456789'
    }
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Customer can buy product and pay directly via PayPal',
    logo: '/api/placeholder/120/50',
    isActive: true,
    isDefault: false,
    type: 'paypal',
    credentials: {
      clientId: 'client_id_123456789',
      clientSecret: 'client_secret_123456789'
    }
  },
  {
    id: 'cod',
    name: 'Cash on Delivery (COD)',
    description: 'Pay with cash upon delivery',
    isActive: true,
    isDefault: true,
    type: 'cod',
    credentials: null
  }
];

export default function PaymentMethodPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [defaultMethod, setDefaultMethod] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Simulate API call with a delay
    const fetchData = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/payment-methods');
        // const data = await response.json();
        
        // For now, use mock data
        setTimeout(() => {
          setPaymentMethods(mockPaymentMethods);
          // Find default method
          const defaultMethod = mockPaymentMethods.find(m => m.isDefault);
          if (defaultMethod) {
            setDefaultMethod(defaultMethod.id);
          }
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching payment methods:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleDefaultMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDefaultMethod(e.target.value);
  };

  const handleSaveDefaultMethod = async () => {
    if (!defaultMethod) {
      toast.error('Please select a default payment method');
      return;
    }

    setIsSaving(true);
    
    try {
      // API call would go here
      // await fetch('/api/payment-methods/default', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ defaultMethodId: defaultMethod })
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update payment methods state
      const updatedMethods = paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === defaultMethod
      }));
      
      setPaymentMethods(updatedMethods);
      toast.success('Default payment method updated successfully');
    } catch (error) {
      console.error('Error updating default payment method:', error);
      toast.error('Failed to update default payment method');
    } finally {
      setIsSaving(false);
    }
  };

  const updatePaymentMethod = (updatedMethod: PaymentMethod) => {
    const updatedMethods = paymentMethods.map(method => 
      method.id === updatedMethod.id ? updatedMethod : method
    );
    setPaymentMethods(updatedMethods);
  };

  return (
    <div className="payment-method-page">
      <div className="payment-method-page__header mb-6">
        <h1 className="text-[#2B4F60] text-2xl font-semibold flex items-center">
          <CreditCard className="mr-2" size={24} />
          Payment Methods
        </h1>
        <p className="text-[#49617E] mt-1">
          Setup payment methods for the website.
        </p>
      </div>
      
      {isLoading ? (
        <div className="payment-method-page__loading bg-white p-8 rounded-md text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#DCE8F8] border-t-[#007BF9] rounded-full mx-auto mb-4"></div>
          <p className="text-[#49617E]">Loading payment methods...</p>
        </div>
      ) : (
        <>
          {/* Default Payment Method Selection */}
          <div className="payment-method-page__default bg-white rounded-md border border-[#E4E7EB] overflow-hidden mb-6">
            <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
              <h3 className="text-[#2B4F60] font-semibold">Default Payment Method</h3>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="w-full sm:w-80">
                  <select
                    value={defaultMethod}
                    onChange={handleDefaultMethodChange}
                    className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                  >
                    <option value="">Select a default payment method</option>
                    {paymentMethods.filter(method => method.isActive).map((method) => (
                      <option key={method.id} value={method.id}>
                        {method.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <Button
                  variant="primary"
                  leftIcon={<Save size={16} />}
                  onClick={handleSaveDefaultMethod}
                  isLoading={isSaving}
                >
                  Save Settings
                </Button>
              </div>
            </div>
          </div>
          
          {/* Payment Method Cards */}
          <div className="payment-method-page__methods space-y-6">
            {paymentMethods.map((method) => (
              <PaymentMethodCard 
                key={method.id} 
                method={method} 
                onUpdate={updatePaymentMethod} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}