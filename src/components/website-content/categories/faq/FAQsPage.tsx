'use client';

import { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
import FAQList from '@/components/website-content/categories/faq/FAQList';
import { FAQ, FAQFilter } from '@/types/faq';

// Mock data for demonstration
const mockFAQs: FAQ[] = [
  {
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
  {
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
  },
  {
    id: 'faq3',
    title: 'Wedding Invitations FAQs',
    category: {
      id: 'cat2',
      name: 'Wedding Invitations'
    },
    status: 'active',
    questions: [
      {
        id: 'q5',
        question: 'How far in advance should I order wedding invitations?',
        answer: 'We recommend ordering wedding invitations 4-6 months before your wedding date. This allows time for design, printing, addressing, and mailing. Invitations should typically be sent to guests 6-8 weeks before the wedding.'
      },
      {
        id: 'q6',
        question: 'Do you offer envelope addressing services?',
        answer: 'Yes, we offer both digital and calligraphy addressing services for your envelopes. Digital addressing is included free with orders of 100+ invitations. Calligraphy addressing is available for an additional fee.'
      }
    ],
    createdAt: '2025-02-12T09:20:00Z'
  },
  {
    id: 'faq4',
    title: 'Shipping & Delivery FAQs',
    category: {
      id: 'cat9',
      name: 'Others'
    },
    status: 'inactive',
    questions: [
      {
        id: 'q7',
        question: 'What shipping methods do you offer?',
        answer: 'We offer standard shipping (3-5 business days), express shipping (1-2 business days), and overnight shipping. Shipping costs are calculated based on weight and destination.'
      },
      {
        id: 'q8',
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days depending on the destination. Additional customs fees may apply.'
      }
    ],
    createdAt: '2025-02-10T14:15:00Z'
  },
  {
    id: 'faq5',
    title: 'Printing Specifications FAQs',
    category: {
      id: 'cat9',
      name: 'Others'
    },
    status: 'active',
    questions: [
      {
        id: 'q9',
        question: 'What paper types do you offer?',
        answer: 'We offer a variety of paper types including matte, glossy, recycled, textured, and premium options. Each paper type has different properties that can enhance your design. Samples are available upon request.'
      }
    ],
    createdAt: '2025-02-05T11:30:00Z'
  }
];

export default function FAQsPage() {
  const [faqs, setFAQs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call with a delay
    const fetchData = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/faqs');
        // const data = await response.json();
        
        // For now, use mock data
        setTimeout(() => {
          setFAQs(mockFAQs);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Default filter
  const initialFilter: FAQFilter = {
    search: '',
    page: 1,
    limit: 10
  };

  return (
    <div className="faqs-page">
      <div className="faqs-page__header mb-6">
        <h1 className="text-[#2B4F60] text-2xl font-semibold flex items-center">
          <FileText className="mr-2" size={24} />
          Product FAQs Management
        </h1>
        <p className="text-[#49617E] mt-1">
          Manage product-related frequently asked questions
        </p>
      </div>
      
      {isLoading ? (
        <div className="faqs-page__loading bg-white p-8 rounded-md text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#DCE8F8] border-t-[#007BF9] rounded-full mx-auto mb-4"></div>
          <p className="text-[#49617E]">Loading FAQs...</p>
        </div>
      ) : (
        <FAQList 
          initialFAQs={faqs} 
          initialTotal={faqs.length} 
          initialFilter={initialFilter}
        />
      )}
    </div>
  );
}