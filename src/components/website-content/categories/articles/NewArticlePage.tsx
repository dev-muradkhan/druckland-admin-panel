'use client';

import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import ArticleForm from '@/components/website-content/categories/articles/ArticleForm';
import { ArticleFormData } from '@/types/article';

// Mock categories for demonstration
const mockCategories = [
  {
    id: 'cat1',
    name: 'Invitation cards',
    children: [
      { id: 'subcat1', name: 'Christmas Cards' },
      { id: 'subcat2', name: 'Birthday Invitations(Adults)' },
      { id: 'subcat3', name: "Children's Birthday Invitations" },
      { id: 'subcat4', name: 'Birth Cards' }
    ]
  },
  {
    id: 'cat2',
    name: 'Wedding Invitations',
    children: [
      { id: 'subcat5', name: 'Wedding Extras' },
      { id: 'subcat6', name: 'Wedding Decoration' },
      { id: 'subcat7', name: 'Wedding Table' }
    ]
  },
  {
    id: 'cat3',
    name: 'Condolence Cards',
    children: []
  },
  {
    id: 'cat4',
    name: 'Baptism Cards',
    children: []
  },
  {
    id: 'cat5',
    name: 'Confirmation Cards',
    children: []
  },
  {
    id: 'cat6',
    name: 'School Enrollment Cards',
    children: []
  },
  {
    id: 'cat7',
    name: 'Communion Cards',
    children: []
  },
  {
    id: 'cat8',
    name: "Mother's day and Father's Day",
    children: []
  },
  {
    id: 'cat9',
    name: 'Others',
    children: []
  }
];

export default function NewArticlePage() {
  const router = useRouter();
  
  const handleSubmit = async (data: ArticleFormData, exit: boolean = false) => {
    try {
      // In a real application, you would submit the data to your API
      // For example:
      // await fetch('/api/articles', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success('Article created successfully');
      
      if (exit) {
        router.push('/admin/content/categories/articles');
      }
    } catch (error) {
      console.error('Error creating article:', error);
      toast.error('Failed to create article');
      throw error;
    }
  };

  return (
    <div className="new-article-page">
      <div className="new-article-page__header mb-6">
        <h1 className="text-[#2B4F60] text-2xl font-semibold flex items-center">
          <Plus className="mr-2" size={24} />
          Add New Article
        </h1>
        <p className="text-[#49617E] mt-1">
          Create a new article for your website content
        </p>
      </div>
      
      <ArticleForm 
        onSubmit={handleSubmit} 
        categories={mockCategories}
      />
    </div>
  );
}