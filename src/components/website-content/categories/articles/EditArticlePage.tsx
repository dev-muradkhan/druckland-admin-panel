'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Edit2 } from 'lucide-react';
import { toast } from 'react-toastify';
import ArticleForm from '@/components/website-content/categories/articles/ArticleForm';
import { Article, ArticleFormData } from '@/types/article';

// Mock data for demonstration (would be fetched from API in real app)
const mockArticles: Record<string, Article> = {
  'article1': {
    id: 'article1',
    title: 'Top 10 Christmas Card 2025',
    description: 'Discover the best Christmas card designs for the upcoming holiday season.',
    status: 'published',
    author: {
      id: 'author1',
      name: 'Maxin Riley'
    },
    categories: ['subcat1', 'cat3'],
    featureImage: {
      url: '/api/placeholder/800/400',
      alt: 'Christmas cards collection',
      title: 'Top Christmas Cards 2025'
    },
    createdAt: '2025-02-18T16:33:00Z'
  },
  'article2': {
    id: 'article2',
    title: 'How to Choose the Perfect Wedding Invitation',
    description: 'A comprehensive guide to selecting wedding invitations that match your style.',
    status: 'published',
    author: {
      id: 'author2',
      name: 'Sophia Anderson'
    },
    categories: ['cat2', 'subcat5'],
    featureImage: {
      url: '/api/placeholder/800/400',
      alt: 'Wedding invitation samples',
      title: 'Wedding Invitation Guide'
    },
    createdAt: '2025-02-15T14:45:00Z'
  }
};

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

interface EditArticlePageProps {
  params: {
    id: string;
  };
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call with a delay
    const fetchArticle = async () => {
      try {
        // In a real app, you would fetch data from your API
        // const response = await fetch(`/api/articles/${params.id}`);
        // const data = await response.json();
        
        // For now, use mock data
        setTimeout(() => {
          const articleData = mockArticles[params.id];
          
          if (articleData) {
            setArticle(articleData);
          } else {
            // Article not found, redirect to article list
            toast.error('Article not found');
            router.push('/admin/content/categories/articles');
          }
          
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching article:', error);
        setIsLoading(false);
        toast.error('Failed to load article data');
      }
    };
    
    fetchArticle();
  }, [params.id, router]);
  
  const handleSubmit = async (data: ArticleFormData, exit: boolean = false) => {
    try {
      // In a real application, you would submit the data to your API
      // For example:
      // await fetch(`/api/articles/${params.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success('Article updated successfully');
      
      if (exit) {
        router.push('/admin/content/categories/articles');
      }
    } catch (error) {
      console.error('Error updating article:', error);
      toast.error('Failed to update article');
      throw error;
    }
  };
  
  const handleDelete = async () => {
    try {
      // In a real application, you would delete via your API
      // For example:
      // await fetch(`/api/articles/${params.id}`, {
      //   method: 'DELETE'
      // });
      
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('Article deleted successfully');
      router.push('/admin/content/categories/articles');
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('Failed to delete article');
      throw error;
    }
  };

  // Convert Article to ArticleFormData format for the form
  const articleToFormData = (article: Article): ArticleFormData => {
    return {
      id: article.id,
      title: article.title,
      description: article.description,
      status: article.status === 'trash' ? 'draft' : article.status,
      categories: article.categories,
      featureImage: article.featureImage
    };
  };

  if (isLoading) {
    return (
      <div className="edit-article-page">
        <div className="edit-article-page__loading bg-white p-8 rounded-md text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#DCE8F8] border-t-[#007BF9] rounded-full mx-auto mb-4"></div>
          <p className="text-[#49617E]">Loading article data...</p>
        </div>
      </div>
    );
  }
  
  if (!article) {
    return (
      <div className="edit-article-page">
        <div className="edit-article-page__not-found bg-white p-8 rounded-md text-center">
          <p className="text-[#F85464] mb-4">Article not found</p>
          <button
            onClick={() => router.push('/admin/content/categories/articles')}
            className="text-[#007BF9] hover:underline"
          >
            Return to Articles List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-article-page">
      <div className="edit-article-page__header mb-6">
        <h1 className="text-[#2B4F60] text-2xl font-semibold flex items-center">
          <Edit2 className="mr-2" size={24} />
          Edit Article: {article.title}
        </h1>
        <p className="text-[#49617E] mt-1">
          Update article content and settings
        </p>
      </div>
      
      <ArticleForm 
        initialData={articleToFormData(article)} 
        categories={mockCategories}
        onSubmit={handleSubmit} 
        onDelete={handleDelete}
      />
    </div>
  );
}