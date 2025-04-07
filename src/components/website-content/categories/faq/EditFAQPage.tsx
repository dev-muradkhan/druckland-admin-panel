'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Edit2 } from 'lucide-react';
import { toast } from 'react-toastify';
import FAQForm from '@/components/website-content/categories/faq/FAQForm';
import { FAQ, FAQFormData } from '@/types/faq';

// Mock data for demonstration (would be fetched from API in real app)
const mockFAQs: Record<string, FAQ> = {
  'faq1': {
    id: 'faq1',
    title: 'Invitation Cards FAQs',
    category: {
      id: 'cat1',
      name: 'Invitation Cards'
    },
    status: 'active',
    questions: [
      {
        id: 'q1',
        question: 'How we delivered our product?',
        answer: 'We offer standard shipping which takes 3-5 business days, and express shipping which takes 1-2 business days. You can select your preferred shipping method during checkout.'
      },
      {
        id: 'q2',
        question: 'Can you assist with design and file preparation?',
        answer: 'Yes, we offer design assistance for all our invitations. Our professional designers can help with layout, typography, and graphics to ensure your invitations look perfect. We can also convert your files to the correct format for printing.'
      }
    ],
    createdAt: '2025-02-18T14:33:00Z'
  },
  'faq2': {
    id: 'faq2',
    title: 'Christmas Cards FAQs',
    category: {
      id: 'cat1',
      name: 'Invitation Cards'
    },
    subcategory: {
      id: 'subcat1',
      name: 'Christmas Cards'
    },
    status: 'active',
    questions: [
      {
        id: 'q3',
        question: 'What are the order deadlines for Christmas delivery?',
        answer: 'For guaranteed Christmas delivery, please place your order by December 10th for standard shipping and December 18th for express shipping. Orders placed after these dates may not arrive before Christmas.'
      },
      {
        id: 'q4',
        question: 'Do you offer bulk discounts for Christmas cards?',
        answer: 'Yes, we offer tiered pricing based on quantity. Orders of 50+ cards receive 10% off, 100+ cards receive 15% off, and 200+ cards receive 20% off. Discounts are automatically applied at checkout.'
      }
    ],
    createdAt: '2025-02-15T10:45:00Z'
  }
};

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

interface EditFAQPageProps {
  params: {
    id: string;
  };
}

export default function EditFAQPage({ params }: EditFAQPageProps) {
  const router = useRouter();
  const [faq, setFAQ] = useState<FAQ | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call with a delay
    const fetchFAQ = async () => {
      try {
        // In a real app, you would fetch data from your API
        // const response = await fetch(`/api/faqs/${params.id}`);
        // const data = await response.json();
        
        // For now, use mock data
        setTimeout(() => {
          const faqData = mockFAQs[params.id];
          
          if (faqData) {
            setFAQ(faqData);
          } else {
            // FAQ not found, redirect to FAQs list
            toast.error('FAQ not found');
            router.push('/admin/content/categories/faq');
          }
          
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching FAQ:', error);
        setIsLoading(false);
        toast.error('Failed to load FAQ data');
      }
    };
    
    fetchFAQ();
  }, [params.id, router]);
  
  const handleSubmit = async (data: FAQFormData, exit: boolean = false) => {
    try {
      // In a real application, you would submit the data to your API
      // For example:
      // await fetch(`/api/faqs/${params.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success('FAQ updated successfully');
      
      if (exit) {
        router.push('/admin/content/categories/faq');
      }
    } catch (error) {
      console.error('Error updating FAQ:', error);
      toast.error('Failed to update FAQ');
      throw error;
    }
  };
  
  const handleDelete = async () => {
    try {
      // In a real application, you would delete via your API
      // For example:
      // await fetch(`/api/faqs/${params.id}`, {
      //   method: 'DELETE'
      // });
      
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('FAQ deleted successfully');
      router.push('/admin/content/categories/faq');
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast.error('Failed to delete FAQ');
      throw error;
    }
  };

  // Convert FAQ to FAQFormData format for the form
  const faqToFormData = (faq: FAQ): FAQFormData => {
    return {
      id: faq.id,
      categoryId: faq.subcategory ? faq.subcategory.id : faq.category.id,
      status: faq.status,
      questions: faq.questions
    };
  };

  if (isLoading) {
    return (
      <div className="edit-faq-page">
        <div className="edit-faq-page__loading bg-white p-8 rounded-md text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#DCE8F8] border-t-[#007BF9] rounded-full mx-auto mb-4"></div>
          <p className="text-[#49617E]">Loading FAQ data...</p>
        </div>
      </div>
    );
  }
  
  if (!faq) {
    return (
      <div className="edit-faq-page">
        <div className="edit-faq-page__not-found bg-white p-8 rounded-md text-center">
          <p className="text-[#F85464] mb-4">FAQ not found</p>
          <button
            onClick={() => router.push('/admin/content/categories/faq')}
            className="text-[#007BF9] hover:underline"
          >
            Return to FAQs List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-faq-page">
      <div className="edit-faq-page__header mb-6">
        <h1 className="text-[#2B4F60] text-2xl font-semibold flex items-center">
          <Edit2 className="mr-2" size={24} />
          Edit FAQs - {faq.title}
        </h1>
        <p className="text-[#49617E] mt-1">
          Update FAQ questions and answers for your products
        </p>
      </div>
      
      <FAQForm 
        initialData={faqToFormData(faq)} 
        categories={mockCategories}
        onSubmit={handleSubmit} 
        onDelete={handleDelete}
      />
    </div>
  );
}