// Types for the Banner module

export interface Banner {
    id: string;
    name: string;
    assignmentType: 'page' | 'category';
    assignedTo: string;
    status: 'active' | 'inactive';
    title?: string;
    description?: string;
    buttons?: BannerButton[];
    image?: {
      url: string;
      alt?: string;
      title?: string;
    };
    createdAt: string;
    updatedAt?: string;
  }
  
  export interface BannerButton {
    text: string;
    url: string;
    title?: string;
  }
  
  export interface BannerFormData {
    id?: string;
    name: string;
    assignmentType: 'page' | 'category';
    assignedTo: string;
    status: 'active' | 'inactive';
    title?: string;
    description?: string;
    buttons?: BannerButton[];
    image?: {
      url: string;
      alt?: string;
      title?: string;
    };
  }
  
  export interface BannerFilter {
    search?: string;
    assignmentType?: 'page' | 'category' | 'all';
    startDate?: string;
    endDate?: string;
    page: number;
    limit: number;
  }
  
  export interface BannersResponse {
    data: Banner[];
    total: number;
  }
  
  export interface BannerResponse {
    data: Banner;
  }





  // Add these types to your existing banners.ts file

export interface PromotionalBanner {
    id: string;
    name: string;
    assignmentType: 'page' | 'category';
    assignedTo: string;
    status: 'active' | 'inactive';
    title?: string;
    description?: string;
    offerCode?: string;
    offerEndTime?: string;
    instructionText?: string;
    buttons?: BannerButton[]; // Reusing the BannerButton type
    image?: {
      url: string;
      alt?: string;
      title?: string;
    };
    createdAt: string;
    updatedAt?: string;
  }
  
  export interface PromotionalBannerFormData {
    id?: string;
    name: string;
    assignmentType: 'page' | 'category';
    assignedTo: string;
    status: 'active' | 'inactive';
    title?: string;
    description?: string;
    offerCode?: string;
    offerEndTime?: string;
    instructionText?: string;
    buttons?: BannerButton[];
    image?: {
      url: string;
      alt?: string;
      title?: string;
    };
  }
  
  export interface PromotionalBannerFilter {
    search?: string;
    assignmentType?: 'page' | 'category' | 'all';
    page: number;
    limit: number;
  }
  
  export interface PromotionalBannersResponse {
    data: PromotionalBanner[];
    total: number;
  }
  
  export interface PromotionalBannerResponse {
    data: PromotionalBanner;
  }