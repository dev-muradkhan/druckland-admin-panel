'use client';

import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import UserForm from '@/components/users/UserForm';
import { UserFormData } from '@/types/users';

export default function NewUserPage() {
  const router = useRouter();
  
  const handleSubmit = async (data: UserFormData, exit: boolean = false) => {
    try {
      // Submit data to the mock API endpoint
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const createdUser = await response.json();
      toast.success(`User "${createdUser.username}" created successfully`);
      
      if (exit) {
        router.push('/admin/users'); // Redirect to user list on successful save & exit
      } else {
        // Optionally, redirect to the edit page of the newly created user
        // router.push(`/admin/users/${createdUser.id}`);
        // Or just stay on the form (current behavior if exit is false)
      }
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast.error(`Failed to create user: ${error.message}`);
      // Re-throw the error so the form knows submission failed
      throw error; 
    }
  };

  return (
    <div className="new-user-page">
      <div className="new-user-page__header mb-6">
        <h1 className="text-[#2B4F60] text-2xl font-semibold flex items-center">
          <Plus className="mr-2" size={24} />
          Add New User
        </h1>
        <p className="text-[#49617E] mt-1">
          Create a new user account with details and permissions
        </p>
      </div>
      
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
}
