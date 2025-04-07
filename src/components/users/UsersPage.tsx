// Note: This component can potentially become a Server Component if no client-side
// specific logic (like state or effects directly within it) is needed in the future.
// For now, keeping it simple.

import { Users } from 'lucide-react';
import UserList from '@/components/users/UserList';

export default function UsersPage() {
  // Removed mock data and useEffect fetch simulation.
  // UserList will now handle its own data fetching and loading state.

  return (
    <div className="users-page">
      <div className="users-page__header mb-6">
        <h1 className="text-[#2B4F60] text-2xl font-semibold flex items-center">
          <Users className="mr-2" size={24} />
          Users
        </h1>
        <p className="text-[#49617E] mt-1">
          Manage your user accounts, roles, and permissions
        </p>
      </div>
      
      {/* UserList now fetches its own data and manages its loading state */}
      <UserList />
      
    </div>
  );
}
