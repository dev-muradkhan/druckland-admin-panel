'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Save } from 'lucide-react';
import Button from '@/components/ui/Button';
import { RoleFormData, PermissionGroup } from '@/types/role';

interface RoleFormProps {
  initialData?: RoleFormData;
  onSubmit: (data: RoleFormData) => Promise<void>;
}

// Mock permission data organized by categories
const permissionGroups: PermissionGroup[] = [
  {
    category: 'User Management',
    permissions: [
      { id: 'view_users', name: 'view_users', label: 'View Users' },
      { id: 'add_users', name: 'add_users', label: 'Add Users' },
      { id: 'edit_users', name: 'edit_users', label: 'Edit Users' },
      { id: 'delete_users', name: 'delete_users', label: 'Delete Users' },
      { id: 'manage_user_roles', name: 'manage_user_roles', label: 'Manage User Roles' }
    ]
  },
  {
    category: 'Admin Management',
    permissions: [
      { id: 'view_admins', name: 'view_admins', label: 'View Admins' },
      { id: 'add_admins', name: 'add_admins', label: 'Add Admins' },
      { id: 'edit_admins', name: 'edit_admins', label: 'Edit Admins' },
      { id: 'delete_admins', name: 'delete_admins', label: 'Delete Admins' },
      { id: 'manage_admin_roles', name: 'manage_admin_roles', label: 'Manage Admin Roles' }
    ]
  },
  {
    category: 'Order Management',
    permissions: [
      { id: 'view_orders', name: 'view_orders', label: 'View Orders' },
      { id: 'update_order_status', name: 'update_order_status', label: 'Update Order Status' },
      { id: 'cancel_orders', name: 'cancel_orders', label: 'Cancel Orders' },
      { id: 'process_refunds', name: 'process_refunds', label: 'Process Refunds' }
    ]
  },
  {
    category: 'Product Management',
    permissions: [
      { id: 'view_products', name: 'view_products', label: 'View Products' },
      { id: 'add_products', name: 'add_products', label: 'Add Products' },
      { id: 'edit_products', name: 'edit_products', label: 'Edit Products' },
      { id: 'delete_products', name: 'delete_products', label: 'Delete Products' }
    ]
  },
  {
    category: 'Category Management',
    permissions: [
      { id: 'view_categories', name: 'view_categories', label: 'View Categories' },
      { id: 'add_categories', name: 'add_categories', label: 'Add Categories' },
      { id: 'edit_categories', name: 'edit_categories', label: 'Edit Categories' },
      { id: 'delete_categories', name: 'delete_categories', label: 'Delete Categories' }
    ]
  },
  {
    category: 'Payment Management',
    permissions: [
      { id: 'view_payments', name: 'view_payments', label: 'View Payments' },
      { id: 'manage_payment_methods', name: 'manage_payment_methods', label: 'Manage Payment Methods' }
    ]
  },
  {
    category: 'Shipping & Delivery Management',
    permissions: [
      { id: 'view_shipping_rules', name: 'view_shipping_rules', label: 'View Shipping Rules' },
      { id: 'edit_shipping_settings', name: 'edit_shipping_settings', label: 'Edit Shipping Settings' }
    ]
  },
  {
    category: 'Settings & Configurations',
    permissions: [
      { id: 'access_general_settings', name: 'access_general_settings', label: 'Access General Settings' },
      { id: 'manage_site_configurations', name: 'manage_site_configurations', label: 'Manage Site Configurations' },
      { id: 'update_api_keys', name: 'update_api_keys', label: 'Update API Keys & Integrations' }
    ]
  }
];

// Get all permission IDs for "Select All" functionality
const allPermissionIds = permissionGroups.flatMap(group => 
  group.permissions.map(permission => permission.id)
);

const RoleForm: React.FC<RoleFormProps> = ({
  initialData,
  onSubmit
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<RoleFormData>(
    initialData || {
      name: '',
      guard: 'admin',
      permissions: []
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isEditMode = !!initialData;
  
  // Check if all permissions are selected
  const isAllSelected = formData.permissions.length === allPermissionIds.length;
  
  // Check if all permissions in a specific group are selected
  const isGroupSelected = (groupPermissions: string[]) => {
    return groupPermissions.every(permId => formData.permissions.includes(permId));
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle "Select All" checkbox
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setFormData({
        ...formData,
        permissions: [...allPermissionIds]
      });
    } else {
      setFormData({
        ...formData,
        permissions: []
      });
    }
  };

  // Handle selecting all permissions in a group
  const handleSelectGroup = (group: PermissionGroup, checked: boolean) => {
    const groupPermissionIds = group.permissions.map(p => p.id);
    
    if (checked) {
      // Add all permissions from this group (that aren't already selected)
      const newPermissions = [...formData.permissions];
      groupPermissionIds.forEach(id => {
        if (!newPermissions.includes(id)) {
          newPermissions.push(id);
        }
      });
      
      setFormData({
        ...formData,
        permissions: newPermissions
      });
    } else {
      // Remove all permissions from this group
      setFormData({
        ...formData,
        permissions: formData.permissions.filter(id => !groupPermissionIds.includes(id))
      });
    }
  };

  // Handle selecting individual permission
  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permissionId]
      });
    } else {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter(id => id !== permissionId)
      });
    }
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error('Role name is required');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      toast.success(`Role ${isEditMode ? 'updated' : 'created'} successfully`);
      router.push('/admin/roles');
    } catch (error) {
      console.error('Error saving role:', error);
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} role`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle exit without saving
  const handleCancel = () => {
    router.push('/admin/roles');
  };

  return (
    <form onSubmit={handleSubmit} className="role-form space-y-6">
      {/* Basic Role Information */}
      <div className="role-form__basic-info bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
        <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
          <h2 className="text-[#2B4F60] text-lg font-semibold">Basic Information</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="role-form__field">
              <label htmlFor="name" className="block text-sm font-medium text-[#49617E] mb-1">
                Role Name <span className="text-[#F85464]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter role name"
                className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                required
              />
            </div>
            
            <div className="role-form__field">
              <label htmlFor="guard" className="block text-sm font-medium text-[#49617E] mb-1">
                Guard
              </label>
              <input
                type="text"
                id="guard"
                name="guard"
                value={formData.guard}
                onChange={handleInputChange}
                placeholder="Enter guard name"
                className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
              />
              <p className="text-xs text-[#6F8591] mt-1">
                Default guard is "admin". Change only if you know what you are doing.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Permissions Section */}
      <div className="role-form__permissions bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
        <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
          <h2 className="text-[#2B4F60] text-lg font-semibold">Permissions</h2>
        </div>
        
        <div className="p-6">
          {/* Select All Checkbox */}
          <div className="role-form__select-all mb-6">
            <label className="flex items-center space-x-2 font-medium text-[#49617E]">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
                className="rounded border-[#E4E7EB] text-[#007BF9] focus:ring-[#007BF9]"
              />
              <span>Select All Permissions</span>
            </label>
          </div>
          
          {/* Permission Groups */}
          <div className="role-form__permission-groups space-y-6">
            {permissionGroups.map((group, groupIndex) => {
              // Get all permission IDs in this group
              const groupPermissionIds = group.permissions.map(p => p.id);
              
              // Check if this group is fully selected
              const isGroupFullySelected = isGroupSelected(groupPermissionIds);
              
              // Check if any permission in this group is selected (for indeterminate state)
              const isGroupPartiallySelected = !isGroupFullySelected && 
                groupPermissionIds.some(permId => formData.permissions.includes(permId));
              
              return (
                <div key={groupIndex} className="role-form__permission-group border border-[#E4E7EB] rounded-md overflow-hidden">
                  {/* Group Header */}
                  <div className="bg-[#F8F9FA] px-4 py-3 border-b border-[#E4E7EB]">
                    <label className="flex items-center space-x-2 font-medium text-[#2B4F60]">
                      <input
                        type="checkbox"
                        checked={isGroupFullySelected}
                        ref={el => {
                          if (el) {
                            el.indeterminate = isGroupPartiallySelected;
                          }
                        }}
                        onChange={(e) => handleSelectGroup(group, e.target.checked)}
                        className="rounded border-[#E4E7EB] text-[#007BF9] focus:ring-[#007BF9]"
                      />
                      <span>{group.category}</span>
                    </label>
                  </div>
                  
                  {/* Group Permissions */}
                  <div className="bg-white p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {group.permissions.map((permission, permIndex) => (
                        <label key={permIndex} className="flex items-center space-x-2 text-sm text-[#49617E]">
                          <input
                            type="checkbox"
                            checked={formData.permissions.includes(permission.id)}
                            onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                            className="rounded border-[#E4E7EB] text-[#007BF9] focus:ring-[#007BF9]"
                          />
                          <span>{permission.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Form Action Buttons */}
      <div className="role-form__actions flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        
        <Button
          type="submit"
          variant="primary"
          leftIcon={<Save size={16} />}
          isLoading={isSubmitting}
        >
          {isEditMode ? 'Update' : 'Save'} Role
        </Button>
      </div>
    </form>
  );
};

export default RoleForm;