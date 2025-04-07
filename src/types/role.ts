// Types for the Roles & Permissions module

export interface Role {
    id: string;
    name: string;
    guard: string;
    createdAt: string;
    updatedAt?: string;
    permissions?: string[];
  }
  
  export interface Permission {
    id: string;
    name: string;
    category: PermissionCategory;
  }
  
  export type PermissionCategory = 
    | 'user_management'
    | 'admin_management'
    | 'order_management'
    | 'product_management'
    | 'category_management'
    | 'payment_management'
    | 'shipping_management'
    | 'settings';
  
  export interface RoleFormData {
    id?: string;
    name: string;
    guard?: string;
    permissions: string[]; // Permission IDs
  }
  
  export interface RoleFilter {
    search?: string;
    page: number;
    limit: number;
  }
  
  export interface RolesResponse {
    data: Role[];
    total: number;
  }
  
  export interface RoleResponse {
    data: Role;
  }
  
  // Grouped permissions by category
  export interface PermissionGroup {
    category: string;
    permissions: PermissionItem[];
  }
  
  export interface PermissionItem {
    id: string;
    name: string;
    label: string;
  }