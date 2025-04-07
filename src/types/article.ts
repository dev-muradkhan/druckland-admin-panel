// Types for the Article module

export interface Article {
    id: string;
    title: string;
    description: string;
    status: 'draft' | 'published' | 'trash';
    author: {
      id: string;
      name: string;
    };
    categories: string[];
    featureImage?: {
      url: string;
      alt?: string;
      title?: string;
    };
    createdAt: string;
    updatedAt?: string;
  }
  
  export interface ArticleFormData {
    id?: string;
    title: string;
    description: string;
    status: 'draft' | 'published';
    categories: string[];
    featureImage?: {
      url: string;
      alt?: string;
      title?: string;
    };
  }
  
  export interface ArticleFilter {
    search?: string;
    author?: string;
    status?: 'all' | 'published' | 'draft' | 'trash';
    startDate?: string;
    endDate?: string;
    page: number;
    limit: number;
  }
  
  export interface ArticlesResponse {
    data: Article[];
    total: number;
  }
  
  export interface ArticleResponse {
    data: Article;
  }
  
  export interface Category {
    id: string;
    name: string;
    children?: Category[];
  }