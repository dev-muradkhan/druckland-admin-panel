'use client';

import { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
import ArticleList from '@/components/website-content/categories/articles/ArticleList';
import { Article, ArticleFilter } from '@/types/article';

// Mock data for demonstration
const mockArticles: Article[] = [
  {
    id: 'article1',
    title: 'Top 10 Christmas Card 2025',
    description: 'Discover the best Christmas card designs for the upcoming holiday season.',
    status: 'published',
    author: {
      id: 'author1',
      name: 'Maxin Riley'
    },
    categories: ['Invitation Card', 'Christmas Gift Card'],
    featureImage: {
      url: '/api/placeholder/800/400',
      alt: 'Christmas cards collection',
      title: 'Top Christmas Cards 2025'
    },
    createdAt: '2025-02-18T16:33:00Z'
  },
  {
    id: 'article2',
    title: 'How to Choose the Perfect Wedding Invitation',
    description: 'A comprehensive guide to selecting wedding invitations that match your style.',
    status: 'published',
    author: {
      id: 'author2',
      name: 'Sophia Anderson'
    },
    categories: ['Wedding Invitations', 'Wedding Extras'],
    featureImage: {
      url: '/api/placeholder/800/400',
      alt: 'Wedding invitation samples',
      title: 'Wedding Invitation Guide'
    },
    createdAt: '2025-02-15T14:45:00Z'
  },
  {
    id: 'article3',
    title: 'Business Card Design Trends for 2025',
    description: 'Explore the latest trends in business card design to make a lasting impression.',
    status: 'draft',
    author: {
      id: 'author1',
      name: 'Maxin Riley'
    },
    categories: ['Business Cards', 'Design Trends'],
    featureImage: {
      url: '/api/placeholder/800/400',
      alt: 'Modern business card designs',
      title: 'Business Card Trends 2025'
    },
    createdAt: '2025-02-12T10:20:00Z'
  },
  {
    id: 'article4',
    title: 'Guide to Eco-Friendly Printing Options',
    description: 'Learn about sustainable printing choices for your business materials.',
    status: 'published',
    author: {
      id: 'author3',
      name: 'James Wilson'
    },
    categories: ['Eco-Friendly', 'Printing Solutions'],
    featureImage: {
      url: '/api/placeholder/800/400',
      alt: 'Eco-friendly paper samples',
      title: 'Sustainable Printing Guide'
    },
    createdAt: '2025-02-10T09:30:00Z'
  },
  {
    id: 'article5',
    title: 'Creative Birthday Invitation Ideas for Children',
    description: 'Unique and fun birthday invitation ideas to delight your little ones.',
    status: 'published',
    author: {
      id: 'author4',
      name: 'Eliza Martinez'
    },
    categories: ["Children's Birthday Invitations", 'Birth Cards'],
    featureImage: {
      url: '/api/placeholder/800/400',
      alt: 'Colorful birthday invitations',
      title: 'Kids Birthday Invitations'
    },
    createdAt: '2025-02-08T16:15:00Z'
  },
  {
    id: 'article6',
    title: 'The Art of Greeting Card Design',
    description: 'Explore the principles behind effective and appealing greeting card designs.',
    status: 'draft',
    author: {
      id: 'author2',
      name: 'Sophia Anderson'
    },
    categories: ['Invitation cards', 'Design Principles'],
    featureImage: {
      url: '/api/placeholder/800/400',
      alt: 'Greeting card design samples',
      title: 'Greeting Card Design Guide'
    },
    createdAt: '2025-02-05T11:40:00Z'
  },
  {
    id: 'article7',
    title: 'Personalized Baptism Cards: A Complete Guide',
    description: 'Everything you need to know about creating meaningful baptism cards.',
    status: 'trash',
    author: {
      id: 'author3',
      name: 'James Wilson'
    },
    categories: ['Baptism Cards', 'Religious Celebrations'],
    featureImage: {
      url: '/api/placeholder/800/400',
      alt: 'Baptism card samples',
      title: 'Baptism Cards Guide'
    },
    createdAt: '2025-02-03T13:20:00Z'
  },
  {
    id: 'article8',
    title: 'Digital vs. Print: Choosing the Right Medium',
    description: 'A comparison of digital and print media to help you make informed decisions.',
    status: 'published',
    author: {
      id: 'author1',
      name: 'Maxin Riley'
    },
    categories: ['Digital Media', 'Print Media', 'Marketing Strategy'],
    featureImage: {
      url: '/api/placeholder/800/400',
      alt: 'Digital and print media comparison',
      title: 'Digital vs Print Media'
    },
    createdAt: '2025-02-01T09:10:00Z'
  }
];

// Mock authors for demonstration
const mockAuthors = [
  { id: 'author1', name: 'Maxin Riley' },
  { id: 'author2', name: 'Sophia Anderson' },
  { id: 'author3', name: 'James Wilson' },
  { id: 'author4', name: 'Eliza Martinez' }
];

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call with a delay
    const fetchData = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/articles');
        // const data = await response.json();
        
        // For now, use mock data
        setTimeout(() => {
          setArticles(mockArticles);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Default filter
  const initialFilter: ArticleFilter = {
    search: '',
    status: 'all',
    page: 1,
    limit: 10
  };

  return (
    <div className="articles-page">
      <div className="articles-page__header mb-6">
        <h1 className="text-[#2B4F60] text-2xl font-semibold flex items-center">
          <FileText className="mr-2" size={24} />
          All Articles
        </h1>
        <p className="text-[#49617E] mt-1">
          Manage website content articles for various categories
        </p>
      </div>
      
      {isLoading ? (
        <div className="articles-page__loading bg-white p-8 rounded-md text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#DCE8F8] border-t-[#007BF9] rounded-full mx-auto mb-4"></div>
          <p className="text-[#49617E]">Loading articles...</p>
        </div>
      ) : (
        <ArticleList 
          initialArticles={articles} 
          initialTotal={articles.length} 
          initialFilter={initialFilter}
          authors={mockAuthors}
        />
      )}
    </div>
  );
}