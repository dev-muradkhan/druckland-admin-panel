'use client';

import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import FAQForm from '@/components/website-content/categories/faq/FAQForm';
import { FAQFormData } from '@/types/faq';

// Mock categories for demonstration
const mockCategories = [
  {
    id: 'cat1',
    name: 'Invitation Cards',
    subcategories: [
      { id: 'subcat1', name: 'Christmas Cards' },
      { id: 'subcat2', name: 'Birthday Invitations (Adults)' },
      { id: 'subcat3', name: "Children's Birthday Invitations" },
      { id: 'subcat4', name: 'Birth Cards' }
    ]
  },
  {
    id: 'cat2',
    name: 'Wedding Invitations',
    subcategories: [
      { id: 'subcat5', name: 'Wedding Extras' },
      { id: 'subcat6', name: 'Wedding Decoration' },
      { id: 'subcat7', name: 'Wedding Table' }
    ]
  },
  {
    id: 'cat3',
    name: 'Condolence Cards'
  },
  {
    id: 'cat4',
    name: 'Baptism Cards'
  },
  {
    id: 'cat5',
    name: 'Confirmation Cards'
  },
  {
    id: 'cat6',
    name: 'School Enrollment Cards'
  },
  {
    id: 'cat7',
    name: 'Communion Cards'
  },
  {
    id: 'cat8',
    name: "Mother's day and Father's Day"
  },
  {
    id: 'cat9',
    name: 'Others'
  }
];

export default function NewFAQPage() {
  const router = useRouter();
  
  const handleSubmit = async (data: FAQFormData, exit: boolean = false) => {
    try {
      // In a real application, you would submit the data to your API
      // For example:
      // await fetch('/api/faqs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success('FAQ created successfully');
      
      if (exit) {
        router.push('/admin/content/categories/faq');
      }
    } catch (error) {
      console.error('Error creating FAQ:', error);
      toast.error('Failed to create FAQ');
      throw error;
    }
  };

  return (
    <div className="new-faq-page">
      <div className="new-faq-page__header mb-6">
        <h1 className="text-[#2B4F60] text-2xl font-semibold flex items-center">
          <Plus className="mr-2" size={24} />
          Create New FAQs
        </h1>
        <p className="text-[#49617E] mt-1">
          Add frequently asked questions for your products
        </p>
      </div>
      
      <FAQForm 
        onSubmit={handleSubmit} 
        categories={mockCategories}
      />
    </div>
  );
}