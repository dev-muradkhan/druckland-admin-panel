// app/admin/users/[id]/page.tsx
import EditUserPage from '@/components/users/EditUserPage';
import { User } from '@/types/users';
import { notFound } from 'next/navigation'; // Import notFound

// Function to fetch user data (can be moved to a lib/ folder later)
async function getUser(id: string): Promise<User | null> {
  try {
    // Need absolute URL for server-side fetch if running locally during dev
    // In production, relative might work depending on deployment
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; 
    const response = await fetch(`${baseUrl}/api/users/${id}`, {
      cache: 'no-store', // Don't cache user data on the server for edits
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null; // User not found
      }
      // Log other errors but might still return null or throw
      console.error(`API Error fetching user ${id}: ${response.statusText}`);
      return null; 
    }
    return await response.json();
  } catch (error) {
    console.error(`Network Error fetching user ${id}:`, error);
    return null; // Handle network errors
  }
}

// This is now an async Server Component
export default async function AdminEditUserPage({ params }: { params: { id: string } }) {
  const userId = params.id;
  const user = await getUser(userId);

  // If user not found, trigger Next.js 404 page
  if (!user) {
    notFound();
  }

  // Pass the fetched user and the id as props to the client component
  return <EditUserPage initialUser={user} userId={userId} />;
}
