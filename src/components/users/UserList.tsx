'use client';

import React, { useState, useEffect, useCallback } from 'react'; // Added useEffect, useCallback
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Download
} from 'lucide-react';
import { toast } from 'react-toastify';
import Button from '@/components/ui/Button';
import { User } from '@/types/users';

// Removed UserListProps interface as props are no longer needed

const UserList: React.FC = () => { // Removed props
  const [users, setUsers] = useState<User[]>([]); // Initialize as empty
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [total, setTotal] = useState(0); // Initialize as 0
  const [totalPages, setTotalPages] = useState(1); // Add state for total pages
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  // --- Data Fetching ---
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSelectedItems([]); // Clear selection on refetch

    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        search: searchQuery,
        status: statusFilter,
        role: roleFilter,
        sortField: sortField,
        sortOrder: sortOrder,
      });

      const response = await fetch(`/api/users?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data.users || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);

    } catch (err: any) {
      console.error('Failed to fetch users:', err);
      setError(`Failed to load users: ${err.message}`);
      setUsers([]);
      setTotal(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, searchQuery, statusFilter, roleFilter, sortField, sortOrder]); // Dependencies for useCallback

  // Initial fetch and refetch on dependency change
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // fetchUsers is stable due to useCallback

  // --- Event Handlers ---

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // Only select users currently visible on the page if needed, or all fetched users
      setSelectedItems(users.map(user => user.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) {
      toast.warning('No items selected');
      return;
    }

    const confirmed = window.confirm(`Are you sure you want to delete ${selectedItems.length} selected users?`);
    if (!confirmed) return;

    setIsLoading(true); // Indicate loading during delete
    try {
      const params = new URLSearchParams();
      selectedItems.forEach(id => params.append('id', id));
      
      const response = await fetch(`/api/users?${params.toString()}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      toast.success(result.message || `Successfully deleted ${selectedItems.length} users`);
      setSelectedItems([]); // Clear selection
      // Refetch data to update the list
      fetchUsers(); 
    } catch (error: any) {
      console.error('Failed to delete users:', error);
      toast.error(`Failed to delete users: ${error.message}`);
      setIsLoading(false); // Stop loading indicator on error
    } 
    // setIsLoading(false) will be called in fetchUsers' finally block
  };

  // Individual delete handler
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;

    setIsLoading(true); // Indicate loading during delete
    try {
      const params = new URLSearchParams({ id });
      const response = await fetch(`/api/users?${params.toString()}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      toast.success(result.message || 'User deleted successfully');
      // Refetch data to update the list
      fetchUsers(); 
    } catch (error: any) {
      console.error('Failed to delete user:', error);
      toast.error(`Failed to delete user: ${error.message}`);
      setIsLoading(false); // Stop loading indicator on error
    }
    // setIsLoading(false) will be called in fetchUsers' finally block
  };

  // Search handler - updates state, fetchUsers effect runs
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
    // The fetchUsers effect will pick up the new searchQuery
    fetchUsers(); // Trigger fetch immediately
  };

  // Sorting handler - updates state, fetchUsers effect runs
  const handleSort = (field: string) => {
    const newOrder = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
    setCurrentPage(1); // Reset to first page on sort change
    // The fetchUsers effect will pick up the new sort state
  };

  // Filter handlers - update state, fetchUsers effect runs
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to first page on filter change
    // The fetchUsers effect will pick up the new filter state
  };

  const handleRoleFilterChange = (role: string) => {
    setRoleFilter(role);
    setCurrentPage(1); // Reset to first page on filter change
    // The fetchUsers effect will pick up the new filter state
  };

  // Pagination handlers - update state, fetchUsers effect runs
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    // The fetchUsers effect will pick up the new page state
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
    // The fetchUsers effect will pick up the new itemsPerPage state
  };

  // --- UI Helpers ---
  const getSortIndicator = (field: string) => {
    if (field !== sortField) return null;
    return sortOrder === 'asc' 
      ? <ArrowUp size={14} className="ml-1 inline-block" /> 
      : <ArrowDown size={14} className="ml-1 inline-block" />;
  };

  // Handle export (remains mock for now)
  const handleExport = () => {
    toast.info('Export functionality not implemented in mock API.');
    // In a real application, this might call a dedicated export endpoint
  };

  // --- Render Logic ---
  if (error) {
    return <div className="text-red-600 bg-red-100 p-4 rounded-md">{error}</div>;
  }

  return (
    <div className="user-list relative"> 
      {/* Loading Overlay */}
      {isLoading && (
         <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
           <div className="animate-spin h-8 w-8 border-4 border-[#DCE8F8] border-t-[#007BF9] rounded-full"></div>
         </div>
      )}

      <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        {/* Header: Search and Actions */}
        <div className="user-list__header mb-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="user-list__search flex-1 max-w-md">
            <form onSubmit={handleSearchSubmit} className="flex">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F8591]" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Update search query state directly
                  placeholder="Search by name, email or role..."
                  className="w-full pl-10 pr-4 py-2 border border-[#E4E7EB] rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9] text-sm"
                />
              </div>
              <Button type="submit" size="md" className="rounded-l-none" disabled={isLoading}>
                Search
              </Button>
            </form>
          </div>
          
          <div className="user-list__actions flex gap-3">
            <Button 
              variant="outline" 
              leftIcon={<Download size={16} />}
              onClick={handleExport}
              disabled={isLoading}
            >
              Export
            </Button>
            
            <Link href="/admin/users/new">
              <Button leftIcon={<Plus size={16} />} disabled={isLoading}>
                Add User
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Filters and Bulk Actions */}
        <div className="user-list__filters mb-4 flex flex-wrap items-center gap-4">
          <div className="user-list__bulk-actions flex items-center gap-2">
            <select 
              className="bulk-action-select border border-[#E4E7EB] bg-white rounded-md px-3 py-2 text-sm text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#007BF9]"
              disabled={selectedItems.length === 0 || isLoading}
              defaultValue=""
              onChange={(e) => { if (e.target.value === 'delete') handleBulkDelete(); e.target.value = ""; }} // Trigger action directly
            >
              <option value="" disabled>Bulk Actions</option>
              <option value="delete">Delete Selected</option>
            </select>
            
            {/* Removed Apply button as action is triggered on select change */}
            
            {selectedItems.length > 0 && (
              <span className="text-sm text-[#49617E]">
                {selectedItems.length} item(s) selected
              </span>
            )}
          </div>
          
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#49617E]">Status:</span>
            <select 
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className="border border-[#E4E7EB] bg-white rounded-md px-3 py-2 text-sm text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#007BF9]"
              disabled={isLoading}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Banned">Banned</option>
            </select>
          </div>
          
          {/* Role Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#49617E]">Role:</span>
            <select 
              value={roleFilter}
              onChange={(e) => handleRoleFilterChange(e.target.value)}
              className="border border-[#E4E7EB] bg-white rounded-md px-3 py-2 text-sm text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#007BF9]"
              disabled={isLoading}
            >
              <option value="All">All</option>
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
              {/* Add other roles if needed */}
            </select>
          </div>
        </div>
        
        {/* User Table */}
        <div className="user-list__table bg-white rounded-md border border-[#E4E7EB] overflow-hidden mb-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8F9FA] border-b border-[#E4E7EB]">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === users.length && users.length > 0}
                        onChange={handleSelectAll}
                        className="mr-2 rounded border-[#E4E7EB]"
                        disabled={isLoading || users.length === 0}
                      />
                    </div>
                  </th>
                  {/* Table Headers with Sorting */}
                  {[
                    { label: 'User Name', field: 'username' },
                    { label: 'Email', field: 'email' },
                    { label: 'Role', field: 'role' },
                    { label: 'Status', field: 'status' },
                    { label: 'Created At', field: 'createdAt' },
                  ].map(({ label, field }) => (
                    <th 
                      key={field}
                      className="px-4 py-3 text-left font-semibold text-sm text-[#49617E] cursor-pointer"
                      onClick={() => !isLoading && handleSort(field)}
                    >
                      <div className="flex items-center">
                        {label} {getSortIndicator(field)}
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Table Body */}
                {!isLoading && users.map((user) => (
                  <tr key={user.id} className="border-b border-[#E4E7EB] hover:bg-[#F8F9FA]">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(user.id)}
                        onChange={() => handleSelectItem(user.id)}
                        className="rounded border-[#E4E7EB]"
                        disabled={isLoading}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[#E0E0E0] flex items-center justify-center mr-2 overflow-hidden">
                          {user.profilePicture ? (
                            <Image 
                              src={user.profilePicture} 
                              alt={user.username} 
                              width={32} 
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-[#6F8591] text-sm font-medium">
                              {user.username.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <Link 
                          href={`/admin/users/${user.id}`}
                          className="text-[#007BF9] hover:underline font-medium"
                        >
                          {user.username}
                        </Link>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#49617E]">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'Admin' 
                          ? 'bg-[#DCE8F8] text-[#007BF9]' 
                          : user.role === 'Customer'
                            ? 'bg-[#E6F6EE] text-[#30BF89]'
                            : 'bg-[#F5F5F5] text-[#6F8591]'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'Active' 
                          ? 'bg-[#E6F6EE] text-[#30BF89]' 
                          : user.status === 'Inactive'
                            ? 'bg-[#F5F5F5] text-[#6F8591]'
                            : 'bg-[#FFEFEF] text-[#F85464]'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#49617E]">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link 
                          href={`/admin/users/${user.id}`}
                          className="text-[#49617E] hover:text-[#007BF9] transition"
                          aria-label={`Edit user ${user.username}`}
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button
                          onClick={() => !isLoading && handleDelete(user.id)}
                          className="text-[#49617E] hover:text-[#F85464] transition"
                          disabled={isLoading}
                          aria-label={`Delete user ${user.username}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {/* Empty state */}
                {!isLoading && users.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-[#6F8591]">
                      No users found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Pagination Controls */}
        <div className="user-list__pagination flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="user-list__per-page flex items-center gap-2">
            <span className="text-sm text-[#49617E]">Show</span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border border-[#E4E7EB] rounded px-2 py-1 text-sm text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#007BF9]"
              disabled={isLoading}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-[#49617E]">entries</span>
          </div>
          
          {/* Page Navigation */}
          {totalPages > 1 && (
            <div className="user-list__page-nav flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </Button>
              
              {/* Simplified pagination display logic */}
              <span className="text-sm text-[#49617E] px-2">
                Page {currentPage} of {totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
