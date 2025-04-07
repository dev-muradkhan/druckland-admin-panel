'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { 
  Printer, 
  Download,
  ShoppingBag, 
  CreditCard, 
  Truck, 
  Clock,
  Calendar,
  DollarSign
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Order } from '@/types/orders';

interface OrderDetailProps {
  order: Order;
  onStatusUpdate: (orderId: string, status: string) => Promise<void>;
  onPaymentStatusUpdate: (orderId: string, status: string) => Promise<void>;
}

const OrderDetail: React.FC<OrderDetailProps> = ({
  order,
  onStatusUpdate,
  onPaymentStatusUpdate
}) => {
  const [currentOrder, setCurrentOrder] = useState<Order>(order);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isUpdatingPaymentStatus, setIsUpdatingPaymentStatus] = useState(false);

  // Handle order status change
  const handleOrderStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setIsUpdatingStatus(true);
    
    try {
      await onStatusUpdate(order.id, newStatus);
      setCurrentOrder({
        ...currentOrder,
        status: newStatus as any
      });
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update order status');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Handle payment status change
  const handlePaymentStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setIsUpdatingPaymentStatus(true);
    
    try {
      await onPaymentStatusUpdate(order.id, newStatus);
      setCurrentOrder({
        ...currentOrder,
        paymentStatus: newStatus as any
      });
      toast.success(`Payment status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update payment status');
    } finally {
      setIsUpdatingPaymentStatus(false);
    }
  };

  // Handle refund
  const handleRefund = () => {
    const confirmed = window.confirm('Are you sure you want to refund this order?');
    if (!confirmed) return;
    
    toast.success('Refund initiated successfully');
  };

  // Handle cancel order
  const handleCancelOrder = () => {
    const confirmed = window.confirm('Are you sure you want to cancel this order?');
    if (!confirmed) return;
    
    toast.success('Order cancelled successfully');
  };

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

  return (
    <div className="order-detail">
      {/* Order Header / Actions */}
      <div className="order-detail__header flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-white rounded-md border border-[#E4E7EB] p-4">
        <div className="order-detail__title mb-4 md:mb-0">
          <h2 className="text-[#2B4F60] text-xl font-semibold flex items-center">
            Order ID: #{currentOrder.orderId}
          </h2>
          <p className="text-[#49617E] text-sm">
            Placed on {new Date(currentOrder.createdAt).toLocaleString()}
          </p>
        </div>
        
        <div className="order-detail__actions flex flex-wrap gap-2">
          <Button variant="outline" leftIcon={<Printer size={16} />} onClick={() => window.print()}>
            Print Order
          </Button>
          <Button 
            variant="danger" 
            onClick={() => {
              const confirmed = window.confirm(`Are you sure you want to delete order #${currentOrder.orderId}?`);
              if (confirmed) {
                toast.success(`Order #${currentOrder.orderId} deleted`);
              }
            }}
          >
            Delete Order
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Details */}
          <div className="order-detail__customer bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
            <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
              <h3 className="text-[#2B4F60] font-semibold">Customer Details</h3>
            </div>
            
            <div className="p-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-[#6F8591]">Order Date</dt>
                  <dd className="text-[#2B4F60] font-medium">{new Date(currentOrder.createdAt).toLocaleDateString()}</dd>
                </div>
                <div>
                  <dt className="text-sm text-[#6F8591]">Order Time</dt>
                  <dd className="text-[#2B4F60] font-medium">{new Date(currentOrder.createdAt).toLocaleTimeString()}</dd>
                </div>
                <div>
                  <dt className="text-sm text-[#6F8591]">Customer Name</dt>
                  <dd className="text-[#2B4F60] font-medium">{currentOrder.user.name}</dd>
                </div>
                <div>
                  <dt className="text-sm text-[#6F8591]">Phone Number</dt>
                  <dd className="text-[#2B4F60] font-medium">{currentOrder.user.phoneNumber || 'Not provided'}</dd>
                </div>
                <div>
                  <dt className="text-sm text-[#6F8591]">Email</dt>
                  <dd className="text-[#2B4F60] font-medium">{currentOrder.user.email}</dd>
                </div>
                <div className="text-right">
                  <button className="text-[#007BF9] text-sm hover:underline">
                    Edit Details
                  </button>
                </div>
              </dl>
            </div>
          </div>
          
          {/* Payment & Shipping Information */}
          <div className="order-detail__payment-shipping grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="order-detail__payment bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
              <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
                <h3 className="text-[#2B4F60] font-semibold">Payment Method</h3>
              </div>
              
              <div className="p-6">
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-[#6F8591]">Payment Method</dt>
                    <dd className="text-[#2B4F60] font-medium mt-1 flex items-center">
                      <CreditCard size={16} className="mr-2 text-[#49617E]" />
                      {currentOrder.paymentMethod}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[#6F8591]">Transaction ID</dt>
                    <dd className="text-[#2B4F60] font-medium mt-1">
                      {currentOrder.transactionId || 'N/A'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[#6F8591]">Amount</dt>
                    <dd className="text-[#2B4F60] font-medium mt-1 flex items-center">
                      <DollarSign size={16} className="mr-1 text-[#49617E]" />
                      {currentOrder.total.toFixed(2)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            
            <div className="order-detail__shipping bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
              <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
                <h3 className="text-[#2B4F60] font-semibold">Shipping Method</h3>
              </div>
              
              <div className="p-6">
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-[#6F8591]">Shipping Method</dt>
                    <dd className="text-[#2B4F60] font-medium mt-1">
                      <div className="flex">
                        <select 
                          className="w-full px-3 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                          value={currentOrder.shippingMethod || 'Economy'}
                          onChange={(e) => {
                            setCurrentOrder({
                              ...currentOrder,
                              shippingMethod: e.target.value
                            });
                            toast.success('Shipping method updated');
                          }}
                        >
                          <option value="Economy">Economy</option>
                          <option value="Standard">Standard</option>
                          <option value="Express">Express</option>
                        </select>
                      </div>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[#6F8591]">Tracking Code</dt>
                    <dd className="text-[#2B4F60] font-medium mt-1">
                      <div className="flex">
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                          placeholder="Enter tracking code..."
                          value={currentOrder.trackingCode || ''}
                          onChange={(e) => {
                            setCurrentOrder({
                              ...currentOrder,
                              trackingCode: e.target.value
                            });
                          }}
                          onBlur={() => {
                            if (currentOrder.trackingCode) {
                              toast.success('Tracking code updated');
                            }
                          }}
                        />
                      </div>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[#6F8591]">Shipping Date</dt>
                    <dd className="text-[#2B4F60] font-medium mt-1 flex items-center">
                      <Calendar size={16} className="mr-2 text-[#49617E]" />
                      {currentOrder.shippingDate ? new Date(currentOrder.shippingDate).toLocaleDateString() : 'Not shipped yet'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          
          {/* Order Status & Payment Status Updates */}
          <div className="order-detail__statuses grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="order-detail__order-status bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
              <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
                <h3 className="text-[#2B4F60] font-semibold">Order Status</h3>
              </div>
              
              <div className="p-6">
                <div className="mb-2 flex items-center">
                  <span className="mr-2">Current Status:</span>
                  {renderStatusBadge(currentOrder.status)}
                </div>
                
                <select 
                  className="w-full px-3 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9] mt-2"
                  value={currentOrder.status}
                  onChange={handleOrderStatusChange}
                  disabled={isUpdatingStatus}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            
            <div className="order-detail__payment-status bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
              <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
                <h3 className="text-[#2B4F60] font-semibold">Payment Status</h3>
              </div>
              
              <div className="p-6">
                <div className="mb-2 flex items-center">
                  <span className="mr-2">Current Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    currentOrder.paymentStatus === 'Paid' ? 'bg-[#E6F6EE] text-[#0D894F]' :
                    currentOrder.paymentStatus === 'Unpaid' ? 'bg-[#FFEAED] text-[#F04438]' :
                    currentOrder.paymentStatus === 'Refunded' ? 'bg-[#EDF8FF] text-[#5C59E8]' :
                    'bg-[#FFF6E9] text-[#FFB02C]'
                  }`}>
                    {currentOrder.paymentStatus}
                  </span>
                </div>
                
                <select 
                  className="w-full px-3 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9] mt-2"
                  value={currentOrder.paymentStatus}
                  onChange={handlePaymentStatusChange}
                  disabled={isUpdatingPaymentStatus}
                >
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="Partially Paid">Partially Paid</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Address Information */}
          <div className="order-detail__addresses grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="order-detail__billing-address bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
              <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4 flex justify-between items-center">
                <h3 className="text-[#2B4F60] font-semibold">Billing Address</h3>
                <button className="text-[#007BF9] text-sm hover:underline">
                  Edit
                </button>
              </div>
              
              <div className="p-6">
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-[#6F8591]">Name</dt>
                    <dd className="text-[#2B4F60]">{currentOrder.billing.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[#6F8591]">Email</dt>
                    <dd className="text-[#2B4F60]">{currentOrder.billing.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[#6F8591]">Phone</dt>
                    <dd className="text-[#2B4F60]">{currentOrder.billing.phoneNumber}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[#6F8591]">Country</dt>
                    <dd className="text-[#2B4F60]">{currentOrder.billing.country}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[#6F8591]">Address</dt>
                    <dd className="text-[#2B4F60]">{currentOrder.billing.address}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[#6F8591]">City</dt>
                    <dd className="text-[#2B4F60]">{currentOrder.billing.city}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[#6F8591]">Zip Code</dt>
                    <dd className="text-[#2B4F60]">{currentOrder.billing.zipCode}</dd>
                  </div>
                </dl>
              </div>
            </div>
            
            <div className="order-detail__shipping-address bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
              <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4 flex justify-between items-center">
                <h3 className="text-[#2B4F60] font-semibold">Shipping Address</h3>
                <button className="text-[#007BF9] text-sm hover:underline">
                  Edit
                </button>
              </div>
              
              <div className="p-6">
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-[#6F8591]">Name</dt>
                    <dd className="text-[#2B4F60]">{currentOrder.shipping.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[#6F8591]">Email</dt>
                    <dd className="text-[#2B4F60]">{currentOrder.shipping.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[#6F8591]">Phone</dt>
                    <dd className="text-[#2B4F60]">{currentOrder.shipping.phoneNumber}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[#6F8591]">Country</dt>
                    <dd className="text-[#2B4F60]">{currentOrder.shipping.country}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[#6F8591]">Address</dt>
                    <dd className="text-[#2B4F60]">{currentOrder.shipping.address}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[#6F8591]">City</dt>
                    <dd className="text-[#2B4F60]">{currentOrder.shipping.city}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[#6F8591]">Zip Code</dt>
                    <dd className="text-[#2B4F60]">{currentOrder.shipping.zipCode}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          
          {/* Product Order Details */}
          <div className="order-detail__products bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
            <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
              <h3 className="text-[#2B4F60] font-semibold">Product Order Details</h3>
            </div>
            
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-[#F8F9FA] border-b border-[#E4E7EB]">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-[#49617E]">Product Image</th>
                      <th className="px-4 py-3 text-left font-medium text-[#49617E]">Product Name</th>
                      <th className="px-4 py-3 text-right font-medium text-[#49617E]">Price</th>
                      <th className="px-4 py-3 text-right font-medium text-[#49617E]">Quantity</th>
                      <th className="px-4 py-3 text-right font-medium text-[#49617E]">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrder.items.map((item) => (
                      <tr key={item.id} className="border-b border-[#E4E7EB]">
                        <td className="px-4 py-4">
                          <div className="w-16 h-16 relative">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="object-cover rounded"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-[#F5F7FA] flex items-center justify-center rounded">
                                <ShoppingBag size={24} className="text-[#6F8591]" />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <h4 className="text-[#2B4F60] font-medium">
                              <Link href="#" className="hover:text-[#007BF9]">
                                {item.name}
                              </Link>
                            </h4>
                            {item.variations && item.variations.length > 0 && (
                              <div className="mt-1">
                                {item.variations.map((variation, index) => (
                                  <div key={index} className="text-xs text-[#6F8591]">
                                    {variation.name}: <span className="text-[#49617E]">{variation.value}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right text-[#49617E]">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 text-right text-[#49617E]">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-4 text-right font-medium text-[#2B4F60]">
                          ${item.total.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex justify-end">
                <div className="w-full max-w-xs">
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-[#49617E]">Subtotal</dt>
                      <dd className="text-[#2B4F60] font-medium">${currentOrder.subtotal.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[#49617E]">Tax</dt>
                      <dd className="text-[#2B4F60] font-medium">${currentOrder.tax.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[#49617E]">Discount</dt>
                      <dd className="text-[#2B4F60] font-medium">${currentOrder.discount.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-[#E4E7EB]">
                      <dt className="text-[#2B4F60] font-semibold">Total</dt>
                      <dd className="text-[#2B4F60] font-bold">${currentOrder.total.toFixed(2)}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  leftIcon={<Download size={16} />}
                  onClick={() => toast.success('Invoice downloaded')}
                >
                  Download Invoice
                </Button>
                
                <Button 
                  variant="outline" 
                  leftIcon={<Download size={16} />}
                  onClick={() => toast.success('Design files downloaded')}
                >
                  Download Design
                </Button>
              </div>
            </div>
          </div>
          
          {/* Order History */}
          <div className="order-detail__history bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
            <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
              <h3 className="text-[#2B4F60] font-semibold">User History (Order Log)</h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {currentOrder.history.map((item) => (
                  <div key={item.id} className="flex">
                    <div className="mr-4">
                      <div className="w-8 h-8 rounded-full bg-[#DCE8F8] flex items-center justify-center text-[#007BF9]">
                        <Clock size={16} />
                      </div>
                      <div className="h-full w-px bg-[#E4E7EB] mx-auto mt-2"></div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-[#2B4F60] font-medium">{item.action}</h4>
                      <p className="text-sm text-[#49617E] mt-1">{item.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-[#6F8591]">
                          {new Date(item.date).toLocaleString()}
                        </span>
                        <span className="text-xs text-[#6F8591]">
                          By: {item.performedBy}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="secure-actions space-y-3">
            <Button 
              variant="danger" 
              fullWidth 
              onClick={handleCancelOrder}
              disabled={currentOrder.status === 'Cancelled'}
            >
              Order Cancel
            </Button>
            
            <Button 
              variant="primary" 
              fullWidth 
              onClick={handleRefund}
              disabled={currentOrder.paymentStatus === 'Unpaid' || currentOrder.paymentStatus === 'Refunded'}
            >
              Refund
            </Button>
          </div>
          
          {/* Order Notes */}
          <div className="order-detail__notes bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
            <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
              <h3 className="text-[#2B4F60] font-semibold">Admin Notes</h3>
            </div>
            
            <div className="p-6">
              <textarea
                className="w-full px-3 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9] min-h-32"
                placeholder="Add private notes for internal tracking..."
                onBlur={(e) => {
                  if (e.target.value.trim()) {
                    toast.success('Note saved');
                  }
                }}
              ></textarea>
              
              <button className="mt-3 text-[#007BF9] hover:underline text-sm">
                Save Note
              </button>
            </div>
          </div>
          
          {/* Related Orders */}
          <div className="order-detail__related bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
            <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
              <h3 className="text-[#2B4F60] font-semibold">Customer's Other Orders</h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-3">
                <div className="p-3 border border-[#E4E7EB] rounded-md hover:bg-[#F5F7FA] transition-colors">
                  <div className="flex justify-between items-center">
                    <Link href="#" className="text-[#007BF9] hover:underline font-medium">
                      Order #12345
                    </Link>
                    <span className="text-xs text-[#6F8591]">3 days ago</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[#49617E] text-sm">${(Math.random() * 100 + 50).toFixed(2)}</span>
                    {renderStatusBadge('Processing')}
                  </div>
                </div>
                
                <div className="p-3 border border-[#E4E7EB] rounded-md hover:bg-[#F5F7FA] transition-colors">
                  <div className="flex justify-between items-center">
                    <Link href="#" className="text-[#007BF9] hover:underline font-medium">
                      Order #12321
                    </Link>
                    <span className="text-xs text-[#6F8591]">1 week ago</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[#49617E] text-sm">${(Math.random() * 100 + 50).toFixed(2)}</span>
                    {renderStatusBadge('Delivered')}
                  </div>
                </div>
                
                <Link href="#" className="text-[#007BF9] hover:underline text-sm block mt-4">
                  View all orders from this customer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;