'use client';

import { useRouter } from 'next/navigation';
import { Plus, Shield } from 'lucide-react';
import RoleForm from '@/components/roles/RoleForm';
import { RoleFormData } from '@/types/role';

export default function NewRolePage() {
  const router = useRouter();
  
  const handleSubmit = async (data: RoleFormData) => {
    try {
      // In a real application, you would submit the data to your API
      // For example:
      // await fetch('/api/roles', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navigate back to the roles list page
      router.push('/admin/roles');
    } catch (error) {
      console.error('Error creating role:', error);
      throw error; // Let the RoleForm component handle the error
    }
  };

  return (
    <div className="new-role-page">
      <div className="new-role-page__header mb-6">
        <h1 className="text-[#2B4F60] text-2xl font-semibold flex items-center">
          <Plus className="mr-2" size={24} />
          Add New Role
        </h1>
        <p className="text-[#49617E] mt-1">
          Create a new role with specific permissions to control user access
        </p>
      </div>
      
      <RoleForm onSubmit={handleSubmit} />
    </div>
  );
}