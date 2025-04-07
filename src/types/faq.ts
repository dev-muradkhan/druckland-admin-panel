// Types for the FAQ module

export interface FAQ {
    id: string;
    title: string;
    category: {
      id: string;
      name: string;
    };
    subcategory?: {
      id: string;
      name: string;
    };
    status: 'active' | 'inactive';
    questions: Question[];
    createdAt: string;
    updatedAt?: string;
  }
  
  export interface Question {
    id: string;
    question: string;
    answer: string;
  }
  
  export interface FAQFormData {
    id?: string;
    categoryId: string;
    status: 'active' | 'inactive';
    questions: Question[];
  }
  
  export interface FAQFilter {
    search?: string;
    category?: string;
    page: number;
    limit: number;
  }
  
  export interface FAQsResponse {
    data: FAQ[];
    total: number;
  }
  
  export interface FAQResponse {
    data: FAQ;
  }
  
  export interface Category {
    id: string;
    name: string;
    subcategories?: Category[];
  }