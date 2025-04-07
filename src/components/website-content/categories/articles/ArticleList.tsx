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
  ChevronRight,
  Calendar,
  Filter
} from 'lucide-react';
import { toast } from 'react-toastify';
import Button from '@/components/ui/Button';
import DateFilter from '@/components/ui/DateFilter';
import { Article, ArticleFilter } from '@/types/article';

interface ArticleListProps {
  initialArticles: Article[];
  initialTotal: number;
  initialFilter: ArticleFilter;
  authors: { id: string; name: string }[];
}

const ArticleList: React.FC<ArticleListProps> = ({ 
  initialArticles,
  initialTotal,
  initialFilter,
  authors
}) => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [filter, setFilter] = useState<ArticleFilter>(initialFilter);
  const [searchQuery, setSearchQuery] = useState(initialFilter.search || '');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [total, setTotal] = useState(initialTotal);
  const [isLoading, setIsLoading] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newFilter = { ...filter, search: searchQuery, page: 1 };
    setFilter(newFilter);
    fetchArticles(newFilter);
  };

  // Handle filter by author
  const handleAuthorFilter = (authorId: string) => {
    const newFilter = { ...filter, author: authorId, page: 1 };
    setFilter(newFilter);
    fetchArticles(newFilter);
  };

  // Handle status filter
  const handleStatusFilter = (status: 'all' | 'published' | 'draft' | 'trash') => {
    const newFilter = { ...filter, status, page: 1 };
    setFilter(newFilter);
    fetchArticles(newFilter);
  };

  // Handle date filter
  const handleDateFilter = (startDate: string, endDate: string) => {
    const newFilter = { ...filter, startDate, endDate, page: 1 };
    setFilter(newFilter);
    fetchArticles(newFilter);
    setShowDateFilter(false);
  };

  // Handle clear date filter
  const handleClearDateFilter = () => {
    const newFilter = { ...filter, startDate: undefined, endDate: undefined, page: 1 };
    setFilter(newFilter);
    fetchArticles(newFilter);
    setShowDateFilter(false);
  };

  // Handle bulk action
  const handleBulkAction = (action: string) => {
    if (selectedItems.length === 0) {
      toast.warning('No items selected');
      return;
    }

    let confirmMessage = '';
    let successMessage = '';

    switch (action) {
      case 'trash':
        confirmMessage = `Are you sure you want to move ${selectedItems.length} selected articles to trash?`;
        successMessage = `Successfully moved ${selectedItems.length} articles to trash`;
        break;
      case 'restore':
        confirmMessage = `Are you sure you want to restore ${selectedItems.length} selected articles?`;
        successMessage = `Successfully restored ${selectedItems.length} articles`;
        break;
      case 'delete':
        confirmMessage = `Are you sure you want to permanently delete ${selectedItems.length} selected articles? This action cannot be undone.`;
        successMessage = `Successfully deleted ${selectedItems.length} articles permanently`;
        break;
      default:
        toast.error('Invalid action');
        return;
    }

    const confirmed = window.confirm(confirmMessage);
    if (!confirmed) return;

    // In a real app, you would make an API call here
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (action === 'delete') {
        const updatedArticles = articles.filter(article => !selectedItems.includes(article.id));
        setArticles(updatedArticles);
        setTotal(prevTotal => prevTotal - selectedItems.length);
      } else if (action === 'trash') {
        const updatedArticles = articles.map(article => {
          if (selectedItems.includes(article.id)) {
            return { ...article, status: 'trash' as const };
          }
          return article;
        });
        setArticles(updatedArticles);
      } else if (action === 'restore') {
        const updatedArticles = articles.map(article => {
          if (selectedItems.includes(article.id)) {
            return { ...article, status: 'draft' as const };
          }
          return article;
        });
        setArticles(updatedArticles);
      }

      setSelectedItems([]);
      toast.success(successMessage);
      setIsLoading(false);
    }, 800);
  };

  // Handle selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(articles.map(article => article.id));
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

  // Handle individual action
  const handleItemAction = (id: string, action: string, title: string) => {
    let confirmMessage = '';
    let successMessage = '';

    switch (action) {
      case 'trash':
        confirmMessage = `Are you sure you want to move "${title}" to trash?`;
        successMessage = 'Article moved to trash successfully';
        break;
      case 'restore':
        confirmMessage = `Are you sure you want to restore "${title}"?`;
        successMessage = 'Article restored successfully';
        break;
      case 'delete':
        confirmMessage = `Are you sure you want to permanently delete "${title}"? This action cannot be undone.`;
        successMessage = 'Article deleted permanently';
        break;
      default:
        return;
    }

    const confirmed = window.confirm(confirmMessage);
    if (!confirmed) return;
    
    // In a real app, you would make an API call here
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (action === 'delete') {
        const updatedArticles = articles.filter(article => article.id !== id);
        setArticles(updatedArticles);
        setTotal(prevTotal => prevTotal - 1);
      } else if (action === 'trash') {
        const updatedArticles = articles.map(article => {
          if (article.id === id) {
            return { ...article, status: 'trash' as const };
          }
          return article;
        });
        setArticles(updatedArticles);
      } else if (action === 'restore') {
        const updatedArticles = articles.map(article => {
          if (article.id === id) {
            return { ...article, status: 'draft' as const };
          }
          return article;
        });
        setArticles(updatedArticles);
      }

      toast.success(successMessage);
      setIsLoading(false);
    }, 800);
  };

  // Handle export
  const handleExport = () => {
    toast.success('Articles exported successfully');
    // In a real application, this would trigger a CSV/Excel export
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    const newFilter = { ...filter, page };
    setFilter(newFilter);
    fetchArticles(newFilter);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const limit = Number(e.target.value);
    const newFilter = { ...filter, limit, page: 1 };
    setFilter(newFilter);
    fetchArticles(newFilter);
  };

  // Fetch articles based on filter
  const fetchArticles = (newFilter: ArticleFilter) => {
    setIsLoading(true);
    
    // In a real app, you would make an API call here
    // For now, simulate filtering on client side
    setTimeout(() => {
      let filtered = [...initialArticles];
      
      // Apply search filter
      if (newFilter.search) {
        const search = newFilter.search.toLowerCase();
        filtered = filtered.filter(article => 
          article.title.toLowerCase().includes(search) || 
          article.author.name.toLowerCase().includes(search) ||
          article.categories.some(category => category.toLowerCase().includes(search))
        );
      }
      
      // Apply status filter
      if (newFilter.status && newFilter.status !== 'all') {
        filtered = filtered.filter(article => article.status === newFilter.status);
      }
      
      // Apply author filter
      if (newFilter.author) {
        filtered = filtered.filter(article => article.author.id === newFilter.author);
      }
      
      // Apply date filter
      if (newFilter.startDate && newFilter.endDate) {
        const startDate = new Date(newFilter.startDate).getTime();
        const endDate = new Date(newFilter.endDate).getTime();
        filtered = filtered.filter(article => {
          const articleDate = new Date(article.createdAt).getTime();
          return articleDate >= startDate && articleDate <= endDate;
        });
      }
      
      // Apply pagination
      const startIndex = (newFilter.page - 1) * newFilter.limit;
      const paginatedArticles = filtered.slice(startIndex, startIndex + newFilter.limit);
      
      setArticles(paginatedArticles);
      setTotal(filtered.length);
      setIsLoading(false);
    }, 500);
  };

  // Calculate pagination
  const totalPages = Math.ceil(total / filter.limit);

  // Determine which bulk actions to show based on status filter
  const getBulkActionOptions = () => {
    if (filter.status === 'trash') {
      return (
        <>
          <option value="" disabled>Bulk Actions</option>
          <option value="restore">Restore</option>
          <option value="delete">Permanently Delete</option>
        </>
      );
    } else {
      return (
        <>
          <option value="" disabled>Bulk Actions</option>
          <option value="trash">Move to Trash</option>
        </>
      );
    }
  };

  return (
    <div className="article-list">
      {/* Search & Action Buttons */}
      <div className="article-list__header mb-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="article-list__search flex-1 max-w-md">
          <form onSubmit={handleSearch} className="flex">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F8591]" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, or category..."
                className="w-full pl-10 pr-4 py-2 border border-[#E4E7EB] rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9] text-sm"
              />
            </div>
            <Button type="submit" size="md" className="rounded-l-none">
              Search
            </Button>
          </form>
        </div>
        
        <div className="article-list__actions flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-[#E4E7EB] rounded-md bg-white text-[#49617E] hover:bg-[#F5F5F5] flex items-center gap-2"
          >
            <Filter size={16} />
            <span>Filters</span>
          </button>
          
          <button
            type="button"
            onClick={() => setShowDateFilter(!showDateFilter)}
            className="px-4 py-2 border border-[#E4E7EB] rounded-md bg-white text-[#49617E] hover:bg-[#F5F5F5] flex items-center gap-2"
          >
            <Calendar size={16} />
            <span>Date Filter</span>
          </button>
          
          <Button 
            variant="outline" 
            leftIcon={<Download size={16} />}
            onClick={handleExport}
          >
            Export
          </Button>
          
          <Link href="/admin/content/categories/articles/new">
            <Button leftIcon={<Plus size={16} />}>
              Add Article
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Date Filter */}
      {showDateFilter && (
        <div className="mb-4">
          <DateFilter 
            onApplyFilter={handleDateFilter}
            onClearFilter={handleClearDateFilter}
          />
        </div>
      )}

      {/* Additional Filters */}
      {showFilters && (
        <div className="article-list__advanced-filters bg-white rounded-md border border-[#E4E7EB] p-4 mb-4">
          <h3 className="text-[#2B4F60] font-semibold mb-3">Advanced Filters</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#49617E] mb-1">
                Filter by Author
              </label>
              <select
                value={filter.author || ''}
                onChange={(e) => handleAuthorFilter(e.target.value)}
                className="w-full px-3 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9] text-sm"
              >
                <option value="">All Authors</option>
                {authors.map(author => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
      
      {/* Status Tabs */}
      <div className="article-list__status-tabs flex border-b border-[#E4E7EB] mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            filter.status === 'all' || !filter.status
              ? 'border-[#007BF9] text-[#007BF9]'
              : 'border-transparent text-[#49617E] hover:text-[#007BF9]'
          }`}
          onClick={() => handleStatusFilter('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            filter.status === 'published'
              ? 'border-[#007BF9] text-[#007BF9]'
              : 'border-transparent text-[#49617E] hover:text-[#007BF9]'
          }`}
          onClick={() => handleStatusFilter('published')}
        >
          Published
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            filter.status === 'draft'
              ? 'border-[#007BF9] text-[#007BF9]'
              : 'border-transparent text-[#49617E] hover:text-[#007BF9]'
          }`}
          onClick={() => handleStatusFilter('draft')}
        >
          Draft
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            filter.status === 'trash'
              ? 'border-[#007BF9] text-[#007BF9]'
              : 'border-transparent text-[#49617E] hover:text-[#007BF9]'
          }`}
          onClick={() => handleStatusFilter('trash')}
        >
          Trash
        </button>
      </div>
      
      {/* Bulk Actions */}
      <div className="article-list__bulk-actions mb-4 flex items-center gap-4">
        <select 
          className="bulk-action-select border border-[#E4E7EB] bg-white rounded-md px-3 py-2 text-sm text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#007BF9]"
          disabled={selectedItems.length === 0 || isLoading}
          onChange={(e) => e.target.value && handleBulkAction(e.target.value)}
          defaultValue=""
        >
          {getBulkActionOptions()}
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
      
      {/* Articles Table */}
      <div className="article-list__table bg-white rounded-md border border-[#E4E7EB] overflow-hidden mb-4">
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
                    checked={selectedItems.length === articles.length && articles.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-[#E4E7EB]"
                    disabled={articles.length === 0 || isLoading}
                  />
                </th>
                <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Title</th>
                <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Author</th>
                <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Category</th>
                <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Created at</th>
                <th className="px-4 py-3 text-center font-semibold text-sm text-[#49617E]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.length > 0 ? (
                articles.map((article) => (
                  <tr 
                    key={article.id} 
                    className={`border-b border-[#E4E7EB] ${
                      selectedItems.includes(article.id) ? 'bg-[#F0F7FF]' : 'hover:bg-[#F8F9FA]'
                    }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(article.id)}
                        onChange={() => handleSelectItem(article.id)}
                        className="rounded border-[#E4E7EB]"
                        disabled={isLoading}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-[#49617E]">
                      <Link
                        href={`/admin/content/categories/articles/${article.id}`}
                        className="text-[#007BF9] hover:underline"
                      >
                        {article.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#49617E]">
                      {article.author.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#49617E]">
                      {article.categories.join(', ')}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#49617E]">
                      {new Date(article.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        {article.status !== 'trash' ? (
                          <>
                            <Link 
                              href={`/admin/content/categories/articles/${article.id}`}
                              className="text-[#49617E] hover:text-[#007BF9] transition p-1 bg-[#F5F7FA] rounded"
                            >
                              <Edit2 size={16} />
                            </Link>
                            <button
                              onClick={() => handleItemAction(article.id, 'trash', article.title)}
                              className="text-[#49617E] hover:text-[#F85464] transition p-1 bg-[#F5F7FA] rounded"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleItemAction(article.id, 'restore', article.title)}
                              className="text-[#49617E] hover:text-[#30BF89] transition p-1 bg-[#F5F7FA] rounded"
                              title="Restore"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 12h18M3 12l4-4M3 12l4 4"/>
                              </svg>
                            </button>
                            <button
                              onClick={() => handleItemAction(article.id, 'delete', article.title)}
                              className="text-[#49617E] hover:text-[#F85464] transition p-1 bg-[#F5F7FA] rounded"
                              title="Delete Permanently"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[#6F8591]">
                    No articles found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      <div className="article-list__pagination flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="article-list__per-page flex items-center gap-2">
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
          <div className="article-list__page-nav flex items-center gap-1">
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

export default ArticleList;