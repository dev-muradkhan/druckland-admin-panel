'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  Tag
} from 'lucide-react';
import { toast } from 'react-toastify';
import Button from '@/components/ui/Button';
import { PromotionalBanner, PromotionalBannerFilter } from '@/types/banners';

interface PromotionalBannerListProps {
  initialBanners: PromotionalBanner[];
  initialTotal: number;
  initialFilter: PromotionalBannerFilter;
}

const PromotionalBannerList: React.FC<PromotionalBannerListProps> = ({ 
  initialBanners,
  initialTotal,
  initialFilter
}) => {
  const [banners, setBanners] = useState<PromotionalBanner[]>(initialBanners);
  const [filter, setFilter] = useState<PromotionalBannerFilter>(initialFilter);
  const [searchQuery, setSearchQuery] = useState(initialFilter.search || '');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [total, setTotal] = useState(initialTotal);
  const [isLoading, setIsLoading] = useState(false);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newFilter = { ...filter, search: searchQuery, page: 1 };
    setFilter(newFilter);
    fetchBanners(newFilter);
  };

  // Handle filter by assignment type
  const handleAssignmentTypeFilter = (type: 'all' | 'page' | 'category') => {
    const newFilter = { ...filter, assignmentType: type, page: 1 };
    setFilter(newFilter);
    fetchBanners(newFilter);
  };

  // Handle bulk action
  const handleBulkAction = (action: string) => {
    if (selectedItems.length === 0) {
      toast.warning('No items selected');
      return;
    }

    if (action === 'delete') {
      const confirmed = window.confirm(`Are you sure you want to delete ${selectedItems.length} selected promotional banners?`);
      if (!confirmed) return;

      // In a real app, you would make an API call here
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const updatedBanners = banners.filter(banner => !selectedItems.includes(banner.id));
        setBanners(updatedBanners);
        setSelectedItems([]);
        toast.success(`Successfully deleted ${selectedItems.length} promotional banners`);
        setIsLoading(false);
        setTotal(prevTotal => prevTotal - selectedItems.length);
      }, 800);
    }
  };

  // Handle selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(banners.map(banner => banner.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Handle individual delete
  const handleDelete = (id: string, name: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete promotional banner: ${name}?`);
    if (!confirmed) return;
    
    // In a real app, you would make an API call here
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedBanners = banners.filter(banner => banner.id !== id);
      setBanners(updatedBanners);
      toast.success('Promotional banner deleted successfully');
      setIsLoading(false);
      setTotal(prevTotal => prevTotal - 1);
    }, 800);
  };

  // Handle export
  const handleExport = () => {
    toast.success('Promotional banners exported successfully');
    // In a real application, this would trigger a CSV/Excel export
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    const newFilter = { ...filter, page };
    setFilter(newFilter);
    fetchBanners(newFilter);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const limit = Number(e.target.value);
    const newFilter = { ...filter, limit, page: 1 };
    setFilter(newFilter);
    fetchBanners(newFilter);
  };

  // Fetch banners based on filter
  const fetchBanners = (newFilter: PromotionalBannerFilter) => {
    setIsLoading(true);
    
    // In a real app, you would make an API call here
    // For now, simulate filtering on client side
    setTimeout(() => {
      let filtered = [...initialBanners];
      
      // Apply search filter
      if (newFilter.search) {
        const search = newFilter.search.toLowerCase();
        filtered = filtered.filter(banner => 
          banner.name.toLowerCase().includes(search) || 
          banner.assignedTo.toLowerCase().includes(search) ||
          banner.status.toLowerCase().includes(search)
        );
      }
      
      // Apply assignment type filter
      if (newFilter.assignmentType && newFilter.assignmentType !== 'all') {
        filtered = filtered.filter(banner => banner.assignmentType === newFilter.assignmentType);
      }
      
      // Apply pagination
      const startIndex = (newFilter.page - 1) * newFilter.limit;
      const paginatedBanners = filtered.slice(startIndex, startIndex + newFilter.limit);
      
      setBanners(paginatedBanners);
      setTotal(filtered.length);
      setIsLoading(false);
    }, 500);
  };

  // Calculate pagination
  const totalPages = Math.ceil(total / filter.limit);

  return (
    <div className="promotional-banner-list">
      {/* Search & Action Buttons */}
      <div className="promotional-banner-list__header mb-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="promotional-banner-list__search flex-1 max-w-md">
          <form onSubmit={handleSearch} className="flex">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F8591]" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, assignment or status..."
                className="w-full pl-10 pr-4 py-2 border border-[#E4E7EB] rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9] text-sm"
              />
            </div>
            <Button type="submit" size="md" className="rounded-l-none">
              Search
            </Button>
          </form>
        </div>
        
        <div className="promotional-banner-list__actions flex flex-wrap gap-3">
          <Button 
            variant="outline" 
            leftIcon={<Download size={16} />}
            onClick={handleExport}
          >
            Export
          </Button>
          
          <Link href="/admin/content/promotional-banners/new">
            <Button leftIcon={<Plus size={16} />}>
              Add Promotional Banner
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Assignment Type Filter */}
      <div className="promotional-banner-list__type-filters flex border-b border-[#E4E7EB] mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            filter.assignmentType === 'all' || !filter.assignmentType
              ? 'border-[#007BF9] text-[#007BF9]'
              : 'border-transparent text-[#49617E] hover:text-[#007BF9]'
          }`}
          onClick={() => handleAssignmentTypeFilter('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            filter.assignmentType === 'page'
              ? 'border-[#007BF9] text-[#007BF9]'
              : 'border-transparent text-[#49617E] hover:text-[#007BF9]'
          }`}
          onClick={() => handleAssignmentTypeFilter('page')}
        >
          Pages
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            filter.assignmentType === 'category'
              ? 'border-[#007BF9] text-[#007BF9]'
              : 'border-transparent text-[#49617E] hover:text-[#007BF9]'
          }`}
          onClick={() => handleAssignmentTypeFilter('category')}
        >
          Categories
        </button>
      </div>
      
      {/* Bulk Actions */}
      <div className="promotional-banner-list__bulk-actions mb-4 flex items-center gap-4">
        <select 
          className="bulk-action-select border border-[#E4E7EB] bg-white rounded-md px-3 py-2 text-sm text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#007BF9]"
          disabled={selectedItems.length === 0 || isLoading}
          onChange={(e) => handleBulkAction(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>Bulk Actions</option>
          <option value="delete">Delete Selected</option>
        </select>
        
        <Button 
          variant="primary" 
          size="sm" 
          onClick={() => {
            const selectEl = document.querySelector('.bulk-action-select') as HTMLSelectElement;
            if (selectEl && selectEl.value) {
              handleBulkAction(selectEl.value);
            } else {
              toast.warning('Please select an action');
            }
          }}
          disabled={selectedItems.length === 0 || isLoading}
        >
          Apply
        </Button>
        
        {selectedItems.length > 0 && (
          <span className="text-sm text-[#49617E]">
            {selectedItems.length} item(s) selected
          </span>
        )}
      </div>
      
      {/* Banners Table */}
      <div className="promotional-banner-list__table bg-white rounded-md border border-[#E4E7EB] overflow-hidden mb-4">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
            <div className="animate-spin h-8 w-8 border-4 border-[#DCE8F8] border-t-[#007BF9] rounded-full"></div>
          </div>
        )}
        
        <div className="relative overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8F9FA] border-b border-[#E4E7EB]">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === banners.length && banners.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-[#E4E7EB]"
                    disabled={banners.length === 0 || isLoading}
                  />
                </th>
                <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Banner Name</th>
                <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Assigned to</th>
                <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Created at</th>
                <th className="px-4 py-3 text-center font-semibold text-sm text-[#49617E]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.length > 0 ? (
                banners.map((banner) => (
                  <tr 
                    key={banner.id} 
                    className={`border-b border-[#E4E7EB] ${
                      selectedItems.includes(banner.id) ? 'bg-[#F0F7FF]' : 'hover:bg-[#F8F9FA]'
                    }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(banner.id)}
                        onChange={() => handleSelectItem(banner.id)}
                        className="rounded border-[#E4E7EB]"
                        disabled={isLoading}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-[#49617E]">
                      <Link
                        href={`/admin/content/promotional-banners/${banner.id}`}
                        className="text-[#007BF9] hover:underline"
                      >
                        {banner.name}
                      </Link>
                      {banner.offerCode && (
                        <span className="ml-2 px-2 py-0.5 bg-[#FFF4EB] text-[#E46A11] rounded-full text-xs">
                          Offer
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#49617E]">
                      <span className="capitalize">{banner.assignmentType}: </span>
                      {banner.assignedTo}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        banner.status === 'active' 
                          ? 'bg-[#E6F6EE] text-[#0D894F]' 
                          : 'bg-[#FFEFEF] text-[#F04438]'
                      }`}>
                        {banner.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#49617E]">
                      {new Date(banner.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <Link 
                          href={`/admin/content/promotional-banners/${banner.id}`}
                          className="text-[#49617E] hover:text-[#007BF9] transition p-1 bg-[#F5F7FA] rounded"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(banner.id, banner.name)}
                          className="text-[#49617E] hover:text-[#F85464] transition p-1 bg-[#F5F7FA] rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[#6F8591]">
                    No promotional banners found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      <div className="promotional-banner-list__pagination flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="promotional-banner-list__per-page flex items-center gap-2">
          <span className="text-sm text-[#49617E]">Show</span>
          <select
            value={filter.limit}
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
        
        {totalPages > 1 && (
          <div className="promotional-banner-list__page-nav flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(filter.page - 1)}
              disabled={filter.page === 1 || isLoading}
            >
              <ChevronLeft size={16} />
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => (
                page === 1 || 
                page === totalPages || 
                (page >= filter.page - 1 && page <= filter.page + 1)
              ))
              .map((page, i, array) => (
                <React.Fragment key={page}>
                  {i > 0 && array[i - 1] !== page - 1 && (
                    <span className="text-[#6F8591] px-2">...</span>
                  )}
                  <Button
                    variant={filter.page === page ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    disabled={isLoading}
                  >
                    {page}
                  </Button>
                </React.Fragment>
              ))
            }
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(filter.page + 1)}
              disabled={filter.page === totalPages || isLoading}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromotionalBannerList;