'use client';

import { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';
import RoleList from '@/components/roles/RoleList';
import { Role, RoleFilter } from '@/types/role';

// Mock data for demonstration
const mockRoles: Role[] = [
  {
    id: '493180',
    name: 'Super Admin',
    guard: 'admin',
    createdAt: '2025-02-18T16:33:00Z',
    updatedAt: '2025-02-18T16:33:00Z',
    permissions: ['all']
  },
  {
    id: '493181',
    name: 'Admin',
    guard: 'admin',
    createdAt: '2025-02-18T16:33:00Z',
    updatedAt: '2025-02-18T16:33:00Z',
    permissions: [
      'view_users', 'add_users', 'edit_users', 'delete_users',
      'view_products', 'add_products', 'edit_products',
      'view_orders', 'update_order_status'
    ]
  },
  {
    id: '493182',
    name: 'Manager',
    guard: 'admin',
    createdAt: '2025-02-18T16:33:00Z',
    updatedAt: '2025-02-18T16:33:00Z',
    permissions: [
      'view_users', 'add_users', 
      'view_products', 'add_products', 'edit_products',
      'view_orders', 'update_order_status'
    ]
  },
  {
    id: '493183',
    name: 'Support',
    guard: 'admin',
    createdAt: '2025-02-18T16:33:00Z',
    updatedAt: '2025-02-18T16:33:00Z',
    permissions: [
      'view_users',
      'view_products',
      'view_orders', 'update_order_status'
    ]
  },
  {
    id: '493184',
    name: 'Editor',
    guard: 'admin',
    createdAt: '2025-02-18T16:33:00Z',
    updatedAt: '2025-02-18T16:33:00Z',
    permissions: [
      'view_products', 'add_products', 'edit_products',
      'view_categories', 'add_categories', 'edit_categories'
    ]
  },
  {
    id: '493185',
    name: 'Content Manager',
    guard: 'admin',
    createdAt: '2025-02-18T16:33:00Z',
    updatedAt: '2025-02-18T16:33:00Z',
    permissions: [
      'view_products',
      'view_categories', 'add_categories', 'edit_categories',
      'access_general_settings'
    ]
  },
  {
    id: '493186',
    name: 'Order Manager',
    guard: 'admin',
    createdAt: '2025-02-18T16:33:00Z',
    updatedAt: '2025-02-18T16:33:00Z',
    permissions: [
      'view_orders', 'update_order_status', 'cancel_orders',
      'view_shipping_rules', 'edit_shipping_settings'
    ]
  },
  {
    id: '493187',
    name: 'Customer Support',
    guard: 'admin',
    createdAt: '2025-02-18T16:33:00Z',
    updatedAt: '2025-02-18T16:33:00Z',
    permissions: [
      'view_users',
      'view_orders'
    ]
  }
];

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call with a delay
    const fetchData = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/roles');
        // const data = await response.json();
        
        // For now, use mock data
        setTimeout(() => {
          setRoles(mockRoles);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching roles:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Default filter
  const initialFilter: RoleFilter = {
    search: '',
    page: 1,
    limit: 10
  };

  return (
    <div className="roles-page">
      <div className="roles-page__header mb-6">
        <h1 className="text-[#2B4F60] text-2xl font-semibold flex items-center">
          <Shield className="mr-2" size={24} />
          All Roles & Permissions
        </h1>
        <p className="text-[#49617E] mt-1">
          Manage system roles and their permissions to control user access effectively
        </p>
      </div>
      
      {isLoading ? (
        <div className="roles-page__loading bg-white p-8 rounded-md text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#DCE8F8] border-t-[#007BF9] rounded-full mx-auto mb-4"></div>
          <p className="text-[#49617E]">Loading roles and permissions...</p>
        </div>
      ) : (
        <RoleList 
          initialRoles={roles} 
          initialTotal={roles.length} 
          initialFilter={initialFilter}
        />
      )}
    </div>
  );
}