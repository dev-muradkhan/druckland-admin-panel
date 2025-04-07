'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  Trash2,
  Download
} from 'lucide-react';
import { toast } from 'react-toastify';
import Button from '@/components/ui/Button';
import { Order, OrderFilter } from '@/types/orders';

interface OrderListProps {
  initialOrders: Order[];
  initialTotal: number;
  initialFilter: OrderFilter;
}

const OrderList: React.FC<OrderListProps> = ({ 
  initialOrders,
  initialTotal,
  initialFilter
}) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [filter, setFilter] = useState<OrderFilter>(initialFilter);
  const [searchQuery, setSearchQuery] = useState(initialFilter.search || '');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [total, setTotal] = useState(initialTotal);
  const [loading, setLoading] = useState(false);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newFilter = { ...filter, search: searchQuery, page: 1 };
    setFilter(newFilter);
    fetchOrders(newFilter);
  };

  // Handle status filter
  const handleStatusFilter = (status: string) => {
    const newFilter = { ...filter, orderStatus: status, page: 1 };
    setFilter(newFilter);
    fetchOrders(newFilter);
  };

  // Handle bulk action
  const handleBulkAction = (action: string) => {
    if (selectedItems.length === 0) {
      toast.warning('No items selected');
      return;
    }

    if (action === 'delete') {
      const confirmed = window.confirm(`Are you sure you want to delete ${selectedItems.length} selected orders?`);
      if (!confirmed) return;

      // In a real app, you would make an API call here
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const updatedOrders = orders.filter(order => !selectedItems.includes(order.id));
        setOrders(updatedOrders);
        setSelectedItems([]);
        toast.success(`Successfully deleted ${selectedItems.length} orders`);
        setLoading(false);
        setTotal(updatedOrders.length);
      }, 800);
    }
  };

  // Handle selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(orders.map(order => order.id));
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

  // Handle pagination
  const handlePageChange = (page: number) => {
    const newFilter = { ...filter, page };
    setFilter(newFilter);
    fetchOrders(newFilter);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const limit = Number(e.target.value);
    const newFilter = { ...filter, limit, page: 1 };
    setFilter(newFilter);
    fetchOrders(newFilter);
  };

  // Fetch orders based on filter
  const fetchOrders = (newFilter: OrderFilter) => {
    setLoading(true);
    
    // In a real app, you would make an API call here
    // For now, simulate filtering on client side
    setTimeout(() => {
      let filtered = [...initialOrders];
      
      // Apply search filter
      if (newFilter.search) {
        const search = newFilter.search.toLowerCase();
        filtered = filtered.filter(order => 
          order.orderId.toLowerCase().includes(search) || 
          order.user.name.toLowerCase().includes(search) ||
          order.user.email.toLowerCase().includes(search) ||
          order.amount.toString().includes(search)
        );
      }
      
      // Apply status filter
      if (newFilter.orderStatus && newFilter.orderStatus !== 'all') {
        filtered = filtered.filter(order => order.status.toLowerCase() === newFilter.orderStatus?.toLowerCase());
      }
      
      // Apply payment status filter
      if (newFilter.paymentStatus && newFilter.paymentStatus !== 'all') {
        filtered = filtered.filter(order => order.paymentStatus.toLowerCase() === newFilter.paymentStatus?.toLowerCase());
      }
      
      // Apply pagination
      const startIndex = (newFilter.page - 1) * newFilter.limit;
      const paginatedOrders = filtered.slice(startIndex, startIndex + newFilter.limit);
      
      setOrders(paginatedOrders);
      setTotal(filtered.length);
      setLoading(false);
    }, 500);
  };

  // Calculate pagination
  const totalPages = Math.ceil(total / filter.limit);

  // Render status badge
  const renderStatusBadge = (status: string) => {
    let bgColor = '';
    let textColor = '';
    
    switch (status.toLowerCase()) {
      case 'processing':
        bgColor = 'bg-[#FFF6E9]';
        textColor = 'text-[#E46A11]';
        break;
      case 'shipped':
        bgColor = 'bg-[#EDF8FF]';
        textColor = 'text-[#13B2E4]';
        break;
      case 'delivered':
        bgColor = 'bg-[#E6F6EE]';
        textColor = 'text-[#0D894F]';
        break;
      case 'cancelled':
        bgColor = 'bg-[#FFEAED]';
        textColor = 'text-[#F04438]';
        break;
      case 'pending':
        bgColor = 'bg-[#FFF6E9]';
        textColor = 'text-[#FFB02C]';
        break;
      default:
        bgColor = 'bg-[#EDF8FF]';
        textColor = 'text-[#5C59E8]';
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${bgColor} ${textColor} capitalize`}>
        {status}
      </span>
    );
  };

  // Render payment status badge
  const renderPaymentStatusBadge = (status: string) => {
    let bgColor = '';
    let textColor = '';
    
    switch (status.toLowerCase()) {
      case 'paid':
        bgColor = 'bg-[#E6F6EE]';
        textColor = 'text-[#0D894F]';
        break;
      case 'unpaid':
        bgColor = 'bg-[#FFEAED]';
        textColor = 'text-[#F04438]';
        break;
      case 'refunded':
        bgColor = 'bg-[#EDF8FF]';
        textColor = 'text-[#5C59E8]';
        break;
      case 'partially paid':
        bgColor = 'bg-[#FFF6E9]';
        textColor = 'text-[#FFB02C]';
        break;
      default:
        bgColor = 'bg-[#F5F5F5]';
        textColor = 'text-[#49617E]';
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${bgColor} ${textColor} capitalize`}>
        {status}
      </span>
    );
  };

  // Handle export
  const handleExport = () => {
    toast.success('Orders exported successfully');
    // In a real application, this would trigger a CSV/Excel export
  };

  // Handle import
  const handleImport = () => {
    toast.success('Import feature not implemented yet');
    // In a real application, this would open a modal for importing orders
  };

  return (
    <div className="order-list">
      {/* Search & Action Buttons */}
      <div className="order-list__header mb-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="order-list__search flex-1 max-w-md">
          <form onSubmit={handleSearch} className="flex">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F8591]" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Order ID, User, Email or Amount..."
                className="w-full pl-10 pr-4 py-2 border border-[#E4E7EB] rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9] text-sm"
              />
            </div>
            <Button type="submit" size="md" className="rounded-l-none">
              Search
            </Button>
          </form>
        </div>
        
        <div className="order-list__actions flex gap-3">
          <Button 
            variant="outline" 
            leftIcon={<Download size={16} />}
            onClick={handleExport}
          >
            Export
          </Button>
          
          <Button 
            onClick={handleImport}
          >
            Import
          </Button>
        </div>
      </div>
      
      {/* Status Filter Links */}
      <div className="order-list__status-filters flex border-b border-[#E4E7EB] mb-6 overflow-x-auto">
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            filter.orderStatus === 'all' || !filter.orderStatus
              ? 'border-[#007BF9] text-[#007BF9]'
              : 'border-transparent text-[#49617E] hover:text-[#007BF9]'
          }`}
          onClick={() => handleStatusFilter('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            filter.orderStatus === 'pending'
              ? 'border-[#007BF9] text-[#007BF9]'
              : 'border-transparent text-[#49617E] hover:text-[#007BF9]'
          }`}
          onClick={() => handleStatusFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            filter.orderStatus === 'processing'
              ? 'border-[#007BF9] text-[#007BF9]'
              : 'border-transparent text-[#49617E] hover:text-[#007BF9]'
          }`}
          onClick={() => handleStatusFilter('processing')}
        >
          Processing
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            filter.orderStatus === 'shipped'
              ? 'border-[#007BF9] text-[#007BF9]'
              : 'border-transparent text-[#49617E] hover:text-[#007BF9]'
          }`}
          onClick={() => handleStatusFilter('shipped')}
        >
          Shipped
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            filter.orderStatus === 'delivered'
              ? 'border-[#007BF9] text-[#007BF9]'
              : 'border-transparent text-[#49617E] hover:text-[#007BF9]'
          }`}
          onClick={() => handleStatusFilter('delivered')}
        >
          Delivered
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
            filter.orderStatus === 'cancelled'
              ? 'border-[#007BF9] text-[#007BF9]'
              : 'border-transparent text-[#49617E] hover:text-[#007BF9]'
          }`}
          onClick={() => handleStatusFilter('cancelled')}
        >
          Cancelled
        </button>
      </div>
      
      {/* Bulk Actions */}
      <div className="order-list__bulk-actions mb-4 flex items-center gap-4">
        <select 
          className="bulk-action-select border border-[#E4E7EB] bg-white rounded-md px-3 py-2 text-sm text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#007BF9]"
          disabled={selectedItems.length === 0 || loading}
          onChange={(e) => handleBulkAction(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>Bulk Actions</option>
          <option value="delete">Delete</option>
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
          disabled={selectedItems.length === 0 || loading}
        >
          Apply
        </Button>
        
        {selectedItems.length > 0 && (
          <span className="text-sm text-[#49617E]">
            {selectedItems.length} item(s) selected
          </span>
        )}
      </div>
      
      {/* Orders Table */}
      <div className="order-list__table bg-white rounded-md border border-[#E4E7EB] overflow-hidden mb-4">
        <div className="relative overflow-x-auto">
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
              <div className="animate-spin h-8 w-8 border-4 border-[#DCE8F8] border-t-[#007BF9] rounded-full"></div>
            </div>
          )}
          
          <table className="w-full">
            <thead className="bg-[#F8F9FA] border-b border-[#E4E7EB]">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === orders.length && orders.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-[#E4E7EB]"
                    disabled={orders.length === 0 || loading}
                  />
                </th>
                <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">ID</th>
                <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Order</th>
                <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Payment Method</th>
                <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Payment Status</th>
                <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">User</th>
                <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Amount</th>
                <th className="px-4 py-3 text-left font-semibold text-sm text-[#49617E]">Created At</th>
                <th className="px-4 py-3 text-center font-semibold text-sm text-[#49617E]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr 
                    key={order.id} 
                    className="border-b border-[#E4E7EB] hover:bg-[#F8F9FA]"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(order.id)}
                        onChange={() => handleSelectItem(order.id)}
                        className="rounded border-[#E4E7EB]"
                        disabled={loading}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-[#49617E]">#{order.id}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-sm text-[#007BF9] hover:underline font-medium"
                      >
                        {order.orderId}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      {renderStatusBadge(order.status)}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#49617E]">
                      {order.paymentMethod}
                    </td>
                    <td className="px-4 py-3">
                      {renderPaymentStatusBadge(order.paymentStatus)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">
                        <div className="font-medium text-[#2B4F60]">{order.user.name}</div>
                        <div className="text-[#49617E]">{order.user.email}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-[#2B4F60]">
                      ${order.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#49617E]">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <Link 
                          href={`/admin/orders/${order.id}`}
                          className="text-[#49617E] hover:text-[#007BF9] transition p-1 bg-[#F5F7FA] rounded"
                        >
                          <Eye size={16} />
                        </Link>
                        <button
                          onClick={() => {
                            const confirmed = window.confirm(`Are you sure you want to delete order #${order.orderId}?`);
                            if (confirmed) {
                              const updatedOrders = orders.filter(o => o.id !== order.id);
                              setOrders(updatedOrders);
                              toast.success(`Order #${order.orderId} deleted successfully`);
                            }
                          }}
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
                  <td colSpan={10} className="px-4 py-8 text-center text-[#6F8591]">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      <div className="order-list__pagination flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="order-list__per-page flex items-center gap-2">
          <span className="text-sm text-[#49617E]">Show</span>
          <select
            value={filter.limit}
            onChange={handleItemsPerPageChange}
            className="border border-[#E4E7EB] rounded px-2 py-1 text-sm text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#007BF9]"
            disabled={loading}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-sm text-[#49617E]">entries</span>
        </div>
        
        {totalPages > 1 && (
          <div className="order-list__page-nav flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(filter.page - 1)}
              disabled={filter.page === 1 || loading}
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
                    disabled={loading}
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
              disabled={filter.page === totalPages || loading}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;