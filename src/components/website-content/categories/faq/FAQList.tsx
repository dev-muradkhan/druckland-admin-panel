'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Download, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { toast } from 'react-toastify';
import Button from '@/components/ui/Button';
import { FAQ, FAQFilter } from '@/types/faq';

interface FAQListProps {
  initialFAQs: FAQ[];
  initialTotal: number;
  initialFilter: FAQFilter;
}

const FAQList: React.FC<FAQListProps> = ({ 
  initialFAQs,
  initialTotal,
  initialFilter
}) => {
  const [faqs, setFAQs] = useState<FAQ[]>(initialFAQs);
  const [filter, setFilter] = useState<FAQFilter>(initialFilter);
  const [searchQuery, setSearchQuery] = useState(initialFilter.search || '');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [total, setTotal] = useState(initialTotal);
  const [isLoading, setIsLoading] = useState(false);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newFilter = { ...filter, search: searchQuery, page: 1 };
    setFilter(newFilter);
    fetchFAQs(newFilter);
  };

  // Handle filter by category
  const handleCategoryFilter = (categoryId: string) => {
    const newFilter = { ...filter, category: categoryId, page: 1 };
    setFilter(newFilter);
    fetchFAQs(newFilter);
  };

  // Handle bulk action
  const handleBulkAction = (action: string) => {
    if (selectedItems.length === 0) {
      toast.warning('No items selected');
      return;
    }

    if (action === 'delete') {
      const confirmed = window.confirm(`Are you sure you want to delete ${selectedItems.length} selected FAQs?`);
      if (!confirmed) return;

      // In a real app, you would make an API call here
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const updatedFAQs = faqs.filter(faq => !selectedItems.includes(faq.id));
        setFAQs(updatedFAQs);
        setSelectedItems([]);
        toast.success(`Successfully deleted ${selectedItems.length} FAQs`);
        setIsLoading(false);
        setTotal(prevTotal => prevTotal - selectedItems.length);
      }, 800);
    }
  };

  // Handle selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(faqs.map(faq => faq.id));
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
  const handleDelete = (id: string, title: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete FAQ: ${title}?`);
    if (!confirmed) return;
    
    // In a real app, you would make an API call here
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedFAQs = faqs.filter(faq => faq.id !== id);
      setFAQs(updatedFAQs);
      toast.success('FAQ deleted successfully');
      setIsLoading(false);
      setTotal(prevTotal => prevTotal - 1);
    }, 800);
  };

  // Handle export
  const handleExport = () => {
    toast.success('FAQs exported successfully');
    // In a real application, this would trigger a CSV/Excel export
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    const newFilter = { ...filter, page };
    setFilter(newFilter);
    fetchFAQs(newFilter);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const limit = Number(e.target.value);
    const newFilter = { ...filter, limit, page: 1 };
    setFilter(newFilter);
    fetchFAQs(newFilter);
  };

  // Fetch FAQs based on filter
  const fetchFAQs = (newFilter: FAQFilter) => {
    setIsLoading(true);
    
    // In a real app, you would make an API call here
    // For now, simulate filtering on client side
    setTimeout(() => {
      let filtered = [...initialFAQs];
      
      // Apply search filter
      if (newFilter.search) {
        const search = newFilter.search.toLowerCase();
        filtered = filtered.filter(faq => 
          faq.title.toLowerCase().includes(search) || 
          faq.category.name.toLowerCase().includes(search) ||
          (faq.subcategory && faq.subcategory.name.toLowerCase().includes(search)) ||
          faq.questions.some(q => 
            q.question.toLowerCase().includes(search) || 
            q.answer.toLowerCase().includes(search)
          )
        );
      }
      
      // Apply category filter
      if (newFilter.category) {
        filtered = filtered.filter(faq => faq.category.id === newFilter.category);
      }
      
      // Apply pagination
      const startIndex = (newFilter.page - 1) * newFilter.limit;
      const paginatedFAQs = filtered.slice(startIndex, startIndex + newFilter.limit);
      
      setFAQs(paginatedFAQs);
      setTotal(filtered.length);
      setIsLoading(false);
    }, 500);
  };

  // Calculate pagination
  const totalPages = Math.ceil(total / filter.limit);

  return (
    <div className="faq-list">
      {/* Search & Action Buttons */}
      <div className="faq-list__header mb-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="faq-list__search flex-1 max-w-md">
          <form onSubmit={handleSearch} className="flex">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F8591]" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by question, assigned category..."
                className="w-full pl-10 pr-4 py-2 border border-[#E4E7EB] rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9] text-sm"
              />
            </div>
            <Button type="submit" size="md" className="rounded-l-none">
              Search
            </Button>
          </form>
        </div>
        
        <div className="faq-list__actions flex flex-wrap gap-3">
          <Button 
            variant="outline" 
            leftIcon={<Download size={16} />}
            onClick={handleExport}
          >
            Export
          </Button>
          
          <Link href="/admin/content/categories/faq/new">
            <Button leftIcon={<Plus size={16} />}>
              Add FAQ
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Bulk Actions */}
      <div className="faq-list__bulk-actions mb-4 flex items-center gap-4">
        <select 
          className="bulk-action-select border border-[#E4E7EB] bg-white rounded-md px-3 py-2 text-sm text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#007BF9]"
          disabled={selectedItems.length === 0 || isLoading}
          onChange={(e) => e.target.value && handleBulkAction(e.target.value)}
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
      
      {/* FAQs Table */}
      <div className="faq-list__table bg-white rounded-md border border-[#E4E7EB] overflow-hidden mb-4">
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
                    checked={selectedItems.length === faqs.length && faqs.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-[#E4E7EB]"
                    disabled={faqs.length === 0 || isLoading}
                  />
                </th>
                <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">FAQ Title</th>
                <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Category</th>
                <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Created at</th>
                <th className="px-4 py-3 text-center font-semibold text-sm text-[#49617E]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs.length > 0 ? (
                faqs.map((faq) => (
                  <tr 
                    key={faq.id} 
                    className={`border-b border-[#E4E7EB] ${
                      selectedItems.includes(faq.id) ? 'bg-[#F0F7FF]' : 'hover:bg-[#F8F9FA]'
                    }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(faq.id)}
                        onChange={() => handleSelectItem(faq.id)}
                        className="rounded border-[#E4E7EB]"
                        disabled={isLoading}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-[#49617E]">
                      <Link
                        href={`/admin/content/categories/faq/${faq.id}`}
                        className="text-[#007BF9] hover:underline"
                      >
                        {faq.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#49617E]">
                      {faq.category.name}
                      {faq.subcategory && (
                        <span className="text-[#6F8591]"> / {faq.subcategory.name}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        faq.status === 'active' 
                          ? 'bg-[#E6F6EE] text-[#0D894F]' 
                          : 'bg-[#FFEFEF] text-[#F04438]'
                      }`}>
                        {faq.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#49617E]">
                      {new Date(faq.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <Link 
                          href={`/admin/content/categories/faq/${faq.id}`}
                          className="text-[#49617E] hover:text-[#007BF9] transition p-1 bg-[#F5F7FA] rounded"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(faq.id, faq.title)}
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
                    No FAQs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      <div className="faq-list__pagination flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="faq-list__per-page flex items-center gap-2">
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
          <div className="faq-list__page-nav flex items-center gap-1">
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

export default FAQList;