'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu,
  Bell,
  MessageSquare,
  ShoppingBag,
  Trash2,
  User,
  LogOut,
  ExternalLink,
  Menu as MenuIcon,
  Check,
  Eye
} from 'lucide-react';
import { toast } from 'react-toastify';

interface AdminHeaderProps {
  toggleSidebar: () => void;
}

// Mock data for notifications
const notifications = [
  {
    id: 1,
    title: 'New order received',
    date: new Date(),
    read: false,
    image: '/api/placeholder/40/40'
  },
  {
    id: 2,
    title: 'Your profile was updated',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // yesterday
    read: true,
    image: '/api/placeholder/40/40'
  },
  {
    id: 3,
    title: 'New feature available',
    date: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
    read: false,
    image: '/api/placeholder/40/40'
  }
];

// Mock data for messages
const messages = [
  {
    id: 1,
    sender: 'Martin Riley',
    message: 'Just started a new project',
    date: new Date(),
    read: false,
    image: '/api/placeholder/40/40',
    orderId: '#4850'
  },
  {
    id: 2,
    sender: 'Ariful Jilani',
    message: 'Just started a order',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // yesterday
    read: true,
    image: '/api/placeholder/40/40',
    orderId: '#6890'
  },
  {
    id: 3,
    sender: 'Alex Carey',
    message: 'Just created a invitation card',
    date: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
    read: false,
    image: '/api/placeholder/40/40',
    orderId: '#4590'
  },
  {
    id: 4,
    sender: 'Alex Carey',
    message: 'Just started a project',
    date: new Date(Date.now() - 72 * 60 * 60 * 1000), // 3 days ago
    read: true,
    image: '/api/placeholder/40/40',
    orderId: '#4450'
  },
  {
    id: 5,
    sender: 'Alex Carey',
    message: 'Just started a invitation card',
    date: new Date(Date.now() - 96 * 60 * 60 * 1000), // 4 days ago
    read: false,
    image: '/api/placeholder/40/40',
    orderId: '#4590'
  }
];

// Mock data for orders
const orders = [
  {
    id: 1,
    customer: 'Martin Riley',
    product: 'Business Card',
    orderId: '#4850',
    date: new Date(),
    image: '/api/placeholder/40/40'
  },
  {
    id: 2,
    customer: 'Ariful Jilani',
    product: 'Christmas Card',
    orderId: '#6890',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // yesterday
    image: '/api/placeholder/40/40'
  },
  {
    id: 3,
    customer: 'Alex Carey',
    product: 'Invitation Card',
    orderId: '#4590',
    date: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
    image: '/api/placeholder/40/40'
  }
];

const AdminHeader: React.FC<AdminHeaderProps> = ({ toggleSidebar }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  
  // Handle clear cache
  const handleClearCache = () => {
    // API call to clear cache would go here
    toast.success('Cache cleared successfully!');
  };

  // Format date for notification display
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffDays} days ago`;
    }
  };
  
  // Group notifications by date
  const groupNotificationsByDate = (items: any[]) => {
    return items.reduce((groups, item) => {
      const dateGroup = formatDate(item.date);
      if (!groups[dateGroup]) {
        groups[dateGroup] = [];
      }
      groups[dateGroup].push(item);
      return groups;
    }, {} as Record<string, any[]>);
  };
  
  // Handle clicks outside of dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (messageRef.current && !messageRef.current.contains(event.target as Node)) {
        setShowMessages(false);
      }
      if (orderRef.current && !orderRef.current.contains(event.target as Node)) {
        setShowOrders(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    // API call would go here
    toast.success('All notifications marked as read');
  };

  // Count unread notifications/messages/orders
  const unreadNotifications = notifications.filter(n => !n.read).length;
  const unreadMessages = messages.filter(m => !m.read).length;
  const unreadOrders = orders.filter(o => !o.read).length;
  
  // Group items by date
  const groupedNotifications = groupNotificationsByDate(notifications);
  const groupedMessages = groupNotificationsByDate(messages);
  const groupedOrders = groupNotificationsByDate(orders);

  return (
    <header className="header">
      <div className="header__container bg-white border-b border-[#E4E7EB] shadow-sm">
        <div className="header__top flex justify-between items-center px-4 py-2">
          <div className="header__left flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="header__toggle-btn text-[#384047] hover:text-[#007BF9] transition"
              aria-label="Toggle sidebar"
            >
              <MenuIcon size={24} />
            </button>
            
            <div className="header__logo">
              <Link href="/admin">
                <span className="text-[#2B4F60] font-bold text-2xl">Druckland</span>
              </Link>
            </div>
            
            <a 
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="header__view-website flex items-center gap-1 text-[#49617E] hover:text-[#007BF9] transition text-sm"
            >
              <ExternalLink size={16} />
              <span>View Website</span>
            </a>
          </div>
          
          <div className="header__right flex items-center gap-3">
            <div className="header__notifications flex items-center gap-3">
              {/* General Notifications */}
              <div className="header__notification-wrapper relative" ref={notificationRef}>
                <button 
                  className="header__notification-btn relative text-[#384047] hover:text-[#007BF9] transition"
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowMessages(false);
                    setShowOrders(false);
                    setShowUserDropdown(false);
                  }}
                >
                  <Bell size={20} />
                  {unreadNotifications > 0 && (
                    <span className="header__notification-badge absolute -top-1 -right-1 bg-[#F85464] text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="header__notification-dropdown absolute right-0 top-full mt-2 bg-white rounded-md border border-[#E4E7EB] shadow-lg z-50 w-80">
                    <div className="px-4 py-2 border-b border-[#E4E7EB] flex justify-between items-center">
                      <h3 className="text-sm font-medium text-[#2B4F60]">Notifications</h3>
                      <button 
                        className="text-xs text-[#007BF9] hover:underline"
                        onClick={markAllAsRead}
                      >
                        Mark All as Read
                      </button>
                    </div>
                    
                    <div className="max-h-80 overflow-y-auto">
                      {Object.keys(groupedNotifications).length > 0 ? (
                        Object.entries(groupedNotifications).map(([date, items]) => (
                          <div key={date}>
                            <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#E4E7EB]">
                              <span className="text-xs font-medium text-[#6F8591]">{date}</span>
                            </div>
                            {items.map((notification) => (
                              <div 
                                key={notification.id} 
                                className={`px-4 py-3 border-b border-[#E4E7EB] hover:bg-[#F5F5F5] ${notification.read ? '' : 'bg-[#F0F7FF]'}`}
                              >
                                <div className="flex items-start">
                                  <div className="mr-3 flex-shrink-0">
                                    <Image 
                                      src={notification.image} 
                                      alt="Notification" 
                                      width={40} 
                                      height={40} 
                                      className="rounded-full"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm text-[#2B4F60] line-clamp-2">{notification.title}</p>
                                    <p className="text-xs text-[#6F8591] mt-1">
                                      {notification.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                  </div>
                                  {!notification.read && (
                                    <div className="ml-2 w-2 h-2 bg-[#007BF9] rounded-full flex-shrink-0"></div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-6 text-center text-[#6F8591]">
                          <p className="text-sm">No notifications yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Message Notifications */}
              <div className="header__message-wrapper relative" ref={messageRef}>
                <button 
                  className="header__notification-btn relative text-[#384047] hover:text-[#007BF9] transition"
                  onClick={() => {
                    setShowMessages(!showMessages);
                    setShowNotifications(false);
                    setShowOrders(false);
                    setShowUserDropdown(false);
                  }}
                >
                  <MessageSquare size={20} />
                  {unreadMessages > 0 && (
                    <span className="header__notification-badge absolute -top-1 -right-1 bg-[#FFB02C] text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
                      {unreadMessages}
                    </span>
                  )}
                </button>
                
                {showMessages && (
                  <div className="header__message-dropdown absolute right-0 top-full mt-2 bg-white rounded-md border border-[#E4E7EB] shadow-lg z-50 w-80">
                    <div className="px-4 py-2 border-b border-[#E4E7EB] flex justify-between items-center">
                      <h3 className="text-sm font-medium text-[#2B4F60]">You Have {unreadMessages} New Messages</h3>
                      <Link 
                        href="/admin/contact"
                        className="text-xs text-[#007BF9] hover:underline"
                      >
                        View All
                      </Link>
                    </div>
                    
                    <div className="max-h-80 overflow-y-auto">
                      {Object.keys(groupedMessages).length > 0 ? (
                        Object.entries(groupedMessages).map(([date, items]) => (
                          <div key={date}>
                            <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#E4E7EB]">
                              <span className="text-xs font-medium text-[#6F8591]">{date}</span>
                            </div>
                            {items.map((message) => (
                              <div 
                                key={message.id} 
                                className={`px-4 py-3 border-b border-[#E4E7EB] hover:bg-[#F5F5F5] ${message.read ? '' : 'bg-[#F0F7FF]'}`}
                              >
                                <div className="flex items-start">
                                  <div className="mr-3 flex-shrink-0">
                                    <Image 
                                      src={message.image} 
                                      alt={message.sender} 
                                      width={40} 
                                      height={40} 
                                      className="rounded-full"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-[#2B4F60]">{message.sender} <span className="font-normal">just</span> {message.message}</p>
                                    <p className="text-xs text-[#6F8591] mt-1">order no: {message.orderId}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-6 text-center text-[#6F8591]">
                          <p className="text-sm">No messages yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Order Notifications */}
              <div className="header__order-wrapper relative" ref={orderRef}>
                <button 
                  className="header__notification-btn relative text-[#384047] hover:text-[#007BF9] transition"
                  onClick={() => {
                    setShowOrders(!showOrders);
                    setShowNotifications(false);
                    setShowMessages(false);
                    setShowUserDropdown(false);
                  }}
                >
                  <ShoppingBag size={20} />
                  {unreadOrders > 0 && (
                    <span className="header__notification-badge absolute -top-1 -right-1 bg-[#30BF89] text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
                      {unreadOrders}
                    </span>
                  )}
                </button>
                
                {showOrders && (
                  <div className="header__order-dropdown absolute right-0 top-full mt-2 bg-white rounded-md border border-[#E4E7EB] shadow-lg z-50 w-80">
                    <div className="px-4 py-2 border-b border-[#E4E7EB] flex justify-between items-center">
                      <h3 className="text-sm font-medium text-[#2B4F60]">You Have {unreadOrders} New Orders</h3>
                      <Link 
                        href="/admin/orders"
                        className="text-xs text-[#007BF9] hover:underline"
                      >
                        View All
                      </Link>
                    </div>
                    
                    <div className="max-h-80 overflow-y-auto">
                      {Object.keys(groupedOrders).length > 0 ? (
                        Object.entries(groupedOrders).map(([date, items]) => (
                          <div key={date}>
                            <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#E4E7EB]">
                              <span className="text-xs font-medium text-[#6F8591]">{date}</span>
                            </div>
                            {items.map((order) => (
                              <div 
                                key={order.id} 
                                className="px-4 py-3 border-b border-[#E4E7EB] hover:bg-[#F5F5F5]"
                              >
                                <div className="flex items-start">
                                  <div className="mr-3 flex-shrink-0">
                                    <Image 
                                      src={order.image} 
                                      alt={order.customer} 
                                      width={40} 
                                      height={40} 
                                      className="rounded-full"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-[#2B4F60]">{order.customer}</p>
                                    <p className="text-xs text-[#6F8591]">{order.product}</p>
                                    <p className="text-xs text-[#6F8591] mt-1">order no: {order.orderId}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-6 text-center text-[#6F8591]">
                          <p className="text-sm">No new orders</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <button 
              onClick={handleClearCache}
              className="header__clear-cache-btn bg-[#DCE8F8] hover:bg-[#B8E2F2] text-[#10243E] px-3 py-1 rounded-md text-sm transition-colors"
            >
              <Trash2 size={16} className="inline mr-1" />
              Clear Cache
            </button>
            
            <div className="header__user relative" ref={userRef}>
              <button 
                className="header__user-btn flex items-center gap-2"
                onClick={() => {
                  setShowUserDropdown(!showUserDropdown);
                  setShowNotifications(false);
                  setShowMessages(false);
                  setShowOrders(false);
                }}
              >
                <div className="header__user-avatar bg-[#B8E2F2] text-[#2B4F60] w-8 h-8 rounded-full flex items-center justify-center">
                  <User size={18} />
                </div>
                <div className="header__user-info hidden sm:block text-left">
                  <div className="header__user-name text-[#2B4F60] text-sm font-semibold">Admin User</div>
                  <div className="header__user-email text-[#49617E] text-xs">admin@druckland.com</div>
                </div>
              </button>
              
              {showUserDropdown && (
                <div className="header__user-dropdown absolute right-0 top-full mt-1 bg-white shadow-lg rounded-md border border-[#E4E7EB] w-48 z-50">
                  <Link 
                    href="/admin/profile"
                    className="header__dropdown-item flex items-center gap-2 px-4 py-2 hover:bg-[#F5F5F5] text-[#49617E]"
                  >
                    <User size={16} />
                    <span>Profile</span>
                  </Link>
                  <Link 
                    href="/auth/logout"
                    className="header__dropdown-item flex items-center gap-2 px-4 py-2 hover:bg-[#F5F5F5] text-[#49617E]"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;