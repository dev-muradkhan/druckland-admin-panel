// Types for the Settings module

export interface LogoSettings {
    headerLogo?: string;
    footerLogo?: string;
    favicon?: string;
  }
  
  export interface AddressSettings {
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }
  
  export interface AnalyticSettings {
    googleTagManagerCode?: string;
    metaPixelCode?: string;
    customTrackingScripts?: string;
  }
  
  export interface CacheSettings {
    autoClear: boolean;
    lastCleared?: string;
  }
  
  // Response types for API calls
  export interface SettingsUpdateResponse {
    success: boolean;
    message: string;
    data?: any;
  }


//   ------------------------------------------------


