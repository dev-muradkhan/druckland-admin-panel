'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Edit2, Shield } from 'lucide-react';
import { toast } from 'react-toastify';
import RoleForm from '@/components/roles/RoleForm';
import { Role, RoleFormData } from '@/types/role';

// Mock data for demonstration (would be fetched from API in real app)
const mockRoles: Record<string, Role> = {
  '#493180': {
    id: '#493180',
    name: 'Super Admin',
    guard: 'admin',
    createdAt: '2025-02-18T16:33:00Z',
    updatedAt: '2025-02-18T16:33:00Z',
    permissions: ['all']
  },
  '#493181': {
    id: '#493181',
    name: 'Admin',
    guard: 'admin',
    createdAt: '2025-02-18T16:33:00Z',
    updatedAt: '2025-02-18T16:33:00Z',
    permissions: [
      'view_users', 'add_users', 'edit_users', 'delete_users', 'manage_user_roles',
      'view_admins', 'add_admins', 'edit_admins', 'delete_admins', 'manage_admin_roles',
      'view_products', 'add_products', 'edit_products', 'delete_products',
      'view_orders', 'update_order_status', 'cancel_orders', 'process_refunds'
    ]
  },
  '#493182': {
    id: '#493182',
    name: 'Manager',
    guard: 'admin',
    createdAt: '2025-02-18T16:33:00Z',
    updatedAt: '2025-02-18T16:33:00Z',
    permissions: [
      'view_users', 'add_users', 
      'view_products', 'add_products', 'edit_products',
      'view_orders', 'update_order_status',
      'view_categories', 'add_categories',
      'view_payments'
    ]
  },
  '#493183': {
    id: '#493183',
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
  '#493184': {
    id: '#493184',
    name: 'Editor',
    guard: 'admin',
    createdAt: '2025-02-18T16:33:00Z',
    updatedAt: '2025-02-18T16:33:00Z',
    permissions: [
      'view_products', 'add_products', 'edit_products',
      'view_categories', 'add_categories', 'edit_categories'
    ]
  }
};

interface EditRolePageProps {
  params: {
    id: string;
  };
}

export default function EditRolePage({ params }: EditRolePageProps) {
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call with a delay
    const fetchRole = async () => {
      try {
        // In a real app, you would fetch data from your API
        // const response = await fetch(`/api/roles/${params.id}`);
        // const data = await response.json();
        
        // For now, use mock data
        setTimeout(() => {
          const roleData = mockRoles[params.id];
          
          if (roleData) {
            setRole(roleData);
          } else {
            // Role not found, redirect to roles list
            toast.error('Role not found');
            router.push('/admin/roles');
          }
          
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching role:', error);
        setIsLoading(false);
        toast.error('Failed to load role data');
      }
    };
    
    fetchRole();
  }, [params.id, router]);
  
  const handleSubmit = async (data: RoleFormData) => {
    try {
      // In a real application, you would submit the data to your API
      // For example:
      // await fetch(`/api/roles/${params.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      // Check if trying to edit system roles
      if (['Super Admin', 'Admin'].includes(role?.name || '')) {
        // For demo, don't allow editing system roles
        if (data.name !== role?.name) {
          toast.error(`Cannot modify system role name: ${role?.name}`);
          return;
        }
      }
      
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navigate back to the roles list page
      router.push('/admin/roles');
    } catch (error) {
      console.error('Error updating role:', error);
      throw error; // Let the RoleForm component handle the error
    }
  };

  // Convert Role to RoleFormData format for the form
  const roleToFormData = (role: Role): RoleFormData => {
    return {
      id: role.id,
      name: role.name,
      guard: role.guard,
      permissions: role.permissions || []
    };
  };

  if (isLoading) {
    return (
      <div className="edit-role-page">
        <div className="edit-role-page__loading bg-white p-8 rounded-md text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#DCE8F8] border-t-[#007BF9] rounded-full mx-auto mb-4"></div>
          <p className="text-[#49617E]">Loading role data...</p>
        </div>
      </div>
    );
  }
  
  if (!role) {
    return (
      <div className="edit-role-page">
        <div className="edit-role-page__not-found bg-white p-8 rounded-md text-center">
          <p className="text-[#F85464] mb-4">Role not found</p>
          <button
            onClick={() => router.push('/admin/roles')}
            className="text-[#007BF9] hover:underline"
          >
            Return to Roles List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-role-page">
      <div className="edit-role-page__header mb-6">
        <h1 className="text-[#2B4F60] text-2xl font-semibold flex items-center">
          <Edit2 className="mr-2" size={24} />
          Edit Role: {role.name}
        </h1>
        <p className="text-[#49617E] mt-1">
          Modify role details and manage permissions to control user access
        </p>
      </div>
      
      <RoleForm 
        initialData={roleToFormData(role)} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
}