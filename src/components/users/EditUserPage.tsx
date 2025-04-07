'use client';

import { useState, useEffect } from 'react'; // Keep useEffect for potential future client-side needs, but remove initial fetch
import { useRouter } from 'next/navigation'; // Remove useParams
import { Edit2 } from 'lucide-react';
import { toast } from 'react-toastify';
import UserForm from '@/components/users/UserForm';
import { User, UserFormData } from '@/types/users';

interface EditUserPageProps {
  initialUser: User; // Receive initial user data as prop
  userId: string;     // Receive user ID as prop

}

export default function EditUserPage({ initialUser, userId }: EditUserPageProps) { 
  const router = useRouter();
  // Use the initialUser prop to set the state directly
  const [user, setUser] = useState<User>(initialUser); 
  // No need for isLoading or error state for initial load, as data is pre-fetched
  // const [isLoading, setIsLoading] = useState(false); // Can keep for submission state if needed
  // const [error, setError] = useState<string | null>(null); 

  // Remove the useEffect hook for initial data fetching

  // Handle form submission (Update) - uses userId prop
  const handleSubmit = async (data: UserFormData, exit: boolean = false) => {
    // Remove password if it's empty (don't update if blank)
    const updatePayload = { ...data };
    if (!updatePayload.password) {
      delete updatePayload.password;
    }
    
    // Add loading state specifically for submission if desired
    // setIsLoading(true); 

    try {
      const response = await fetch(`/api/users/${userId}`, { // Use userId prop
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatePayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const updatedUser = await response.json();
      toast.success(`User "${updatedUser.username}" updated successfully`);
      setUser(updatedUser); // Update local state with the response from API
      
      if (exit) {
        router.push('/admin/users'); // Redirect to user list on successful save & exit
      }
      // If not exiting, stay on the page with updated data shown in the form
      
    } catch (error: any) {
      console.error('Error updating user:', error);
      toast.error(`Failed to update user: ${error.message}`);
      // Re-throw the error so the form knows submission failed
      throw error; 
    } finally {
      // setIsLoading(false); // Stop submission loading state
    }
  };

  // Remove initial loading/error/null checks as data is guaranteed by the server component
  
  // Render the form with the pre-fetched user data
  return (
    <div className="edit-user-page">
      <div className="edit-user-page__header mb-6">
        <h1 className="text-[#2B4F60] text-2xl font-semibold flex items-center">
          <Edit2 className="mr-2" size={24} />
          Edit User - {user.username}
        </h1>
        <p className="text-[#49617E] mt-1">
          Update user details, status, and permissions
        </p>
      </div>
      
      <UserForm 
        initialData={user} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
}
