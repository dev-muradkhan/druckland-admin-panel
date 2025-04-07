'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { 
  Save, 
  Trash2, 
  X, 
  Plus,
  FileImage,
  Link as LinkIcon
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { BannerFormData, BannerButton } from '@/types/banners';

interface BannerFormProps {
  initialData?: BannerFormData;
  onSubmit: (data: BannerFormData, exit?: boolean) => Promise<void>;
  onDelete?: () => Promise<void>;
}

// Mock data for pages and categories
const mockPages = [
  { id: 'home', name: 'Home Page' },
  { id: 'about', name: 'About Us' },
  { id: 'contact', name: 'Contact Us' },
  { id: 'products', name: 'Products Page' },
  { id: 'blog', name: 'Blog Page' }
];

const mockCategories = [
  { id: 'invitation-card', name: 'Invitation card page' },
  { id: 'business-cards', name: 'Business Cards' },
  { id: 'flyers', name: 'Flyers' },
  { id: 'brochures', name: 'Brochures' },
  { id: 'posters', name: 'Posters' }
];

const BannerForm: React.FC<BannerFormProps> = ({
  initialData,
  onSubmit,
  onDelete
}) => {
  const router = useRouter();
  
  const [formData, setFormData] = useState<BannerFormData>(
    initialData || {
      name: '',
      assignmentType: 'page',
      assignedTo: '',
      status: 'active',
      buttons: [{ text: '', url: '', title: '' }]
    }
  );
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const isEditMode = !!initialData;

  // Handle input changes for basic fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        status: (e.target as HTMLInputElement).checked ? 'active' : 'inactive'
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle assignment type change
  const handleAssignmentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as 'page' | 'category';
    setFormData({
      ...formData,
      assignmentType: newType,
      assignedTo: '' // Reset selection when type changes
    });
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to your server or cloud storage
      // and get back a URL to store in your formData
      const imageUrl = URL.createObjectURL(file);
      
      setFormData({
        ...formData,
        image: {
          url: imageUrl,
          alt: formData.image?.alt || '',
          title: formData.image?.title || ''
        }
      });
    }
  };

  // Handle button field changes
  const handleButtonChange = (index: number, field: keyof BannerButton, value: string) => {
    const updatedButtons = [...(formData.buttons || [])];
    
    if (!updatedButtons[index]) {
      updatedButtons[index] = { text: '', url: '', title: '' };
    }
    
    updatedButtons[index] = {
      ...updatedButtons[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      buttons: updatedButtons
    });
  };

  // Add new button (maximum 3)
  const handleAddButton = () => {
    if (!formData.buttons) {
      setFormData({
        ...formData,
        buttons: [{ text: '', url: '', title: '' }]
      });
      return;
    }
    
    if (formData.buttons.length < 3) {
      setFormData({
        ...formData,
        buttons: [...formData.buttons, { text: '', url: '', title: '' }]
      });
    } else {
      toast.warning('Maximum 3 buttons allowed');
    }
  };

  // Remove button
  const handleRemoveButton = (index: number) => {
    if (formData.buttons && formData.buttons.length > 0) {
      const updatedButtons = formData.buttons.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        buttons: updatedButtons
      });
    }
  };

  // Handle image metadata changes
  const handleImageMetadataChange = (field: 'alt' | 'title', value: string) => {
    if (!formData.image) return;
    
    setFormData({
      ...formData,
      image: {
        ...formData.image,
        [field]: value
      }
    });
  };

  // Remove image
  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      image: undefined
    });
  };

  // Form validation
  const validateForm = (): boolean => {
    // Name is required
    if (!formData.name.trim()) {
      toast.error('Banner name is required');
      return false;
    }
    
    // Assignment is required
    if (!formData.assignedTo) {
      toast.error(`Please select a ${formData.assignmentType} to assign this banner to`);
      return false;
    }
    
    // Validate all buttons that are not empty
    const nonEmptyButtons = formData.buttons?.filter(btn => btn.text.trim() || btn.url.trim()) || [];
    
    for (const btn of nonEmptyButtons) {
      if (!btn.text.trim()) {
        toast.error('Button text is required for all buttons');
        return false;
      }
      
      if (!btn.url.trim()) {
        toast.error('Button URL is required for all buttons');
        return false;
      }
    }
    
    return true;
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent, exit: boolean = false) => {
    e.preventDefault();
    
    // Remove empty buttons
    const nonEmptyButtons = formData.buttons?.filter(btn => btn.text.trim() || btn.url.trim()) || [];
    const dataToSubmit = {
      ...formData,
      buttons: nonEmptyButtons.length > 0 ? nonEmptyButtons : undefined
    };
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(dataToSubmit, exit);
    } catch (error) {
      console.error('Error saving banner:', error);
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} banner`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!onDelete) return;
    
    const confirmed = window.confirm('Are you sure you want to delete this banner?');
    if (!confirmed) return;
    
    setIsDeleting(true);
    
    try {
      await onDelete();
    } catch (error) {
      console.error('Error deleting banner:', error);
      toast.error('Failed to delete banner');
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    router.push('/admin/content/banners');
  };

  return (
    <form className="banner-form">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Banner Content */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          {/* Banner Basic Information */}
          <div className="banner-form__basic-info bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
            <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
              <h2 className="text-[#2B4F60] text-lg font-semibold">Banner Information</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="banner-form__field">
                <label htmlFor="name" className="block text-sm font-medium text-[#49617E] mb-1">
                  Banner Name <span className="text-[#F85464]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter banner name"
                  className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="banner-form__field">
                  <label htmlFor="assignmentType" className="block text-sm font-medium text-[#49617E] mb-1">
                    Banner Type <span className="text-[#F85464]">*</span>
                  </label>
                  <select
                    id="assignmentType"
                    name="assignmentType"
                    value={formData.assignmentType}
                    onChange={handleAssignmentTypeChange}
                    className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                    required
                  >
                    <option value="page">Page</option>
                    <option value="category">Category</option>
                  </select>
                </div>
                
                <div className="banner-form__field">
                  <label htmlFor="assignedTo" className="block text-sm font-medium text-[#49617E] mb-1">
                    Assign To <span className="text-[#F85464]">*</span>
                  </label>
                  <select
                    id="assignedTo"
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                    required
                  >
                    <option value="">Select {formData.assignmentType}</option>
                    {formData.assignmentType === 'page' ? (
                      mockPages.map(page => (
                        <option key={page.id} value={page.name}>
                          {page.name}
                        </option>
                      ))
                    ) : (
                      mockCategories.map(category => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Banner Content */}
          <div className="banner-form__content bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
            <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
              <h2 className="text-[#2B4F60] text-lg font-semibold">Banner Content</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="banner-form__field">
                <label htmlFor="title" className="block text-sm font-medium text-[#49617E] mb-1">
                  Banner Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleInputChange}
                  placeholder="Enter banner title"
                  className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                />
              </div>
              
              <div className="banner-form__field">
                <label htmlFor="description" className="block text-sm font-medium text-[#49617E] mb-1">
                  Banner Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  placeholder="Enter banner description"
                  className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                  rows={4}
                />
              </div>
            </div>
          </div>
          
          {/* Banner Buttons */}
          <div className="banner-form__buttons bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
            <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4 flex justify-between">
              <h2 className="text-[#2B4F60] text-lg font-semibold">Banner Buttons</h2>
              
              {(!formData.buttons || formData.buttons.length < 3) && (
                <Button 
                  type="button" 
                  size="sm" 
                  variant="outline" 
                  leftIcon={<Plus size={14} />}
                  onClick={handleAddButton}
                >
                  Add Button
                </Button>
              )}
            </div>
            
            <div className="p-6">
              {(!formData.buttons || formData.buttons.length === 0) ? (
                <div className="text-center py-4 text-[#6F8591]">
                  <p>No buttons added yet. Click "Add Button" to add a button.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {formData.buttons.map((button, index) => (
                    <div key={index} className="banner-form__button-item bg-[#F8F9FA] border border-[#E4E7EB] rounded-md p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-[#2B4F60] font-medium">Button #{index + 1}</h4>
                        <button
                          type="button"
                          onClick={() => handleRemoveButton(index)}
                          className="text-[#49617E] hover:text-[#F85464] p-1"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="banner-form__field">
                          <label className="block text-xs font-medium text-[#49617E] mb-1">
                            Button Text <span className="text-[#F85464]">*</span>
                          </label>
                          <input
                            type="text"
                            value={button.text}
                            onChange={(e) => handleButtonChange(index, 'text', e.target.value)}
                            placeholder="e.g., Learn More"
                            className="w-full px-3 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                          />
                        </div>
                        
                        <div className="banner-form__field">
                          <label className="block text-xs font-medium text-[#49617E] mb-1">
                            Button URL <span className="text-[#F85464]">*</span>
                          </label>
                          <div className="relative">
                            <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F8591]" />
                            <input
                              type="text"
                              value={button.url}
                              onChange={(e) => handleButtonChange(index, 'url', e.target.value)}
                              placeholder="https://example.com"
                              className="w-full pl-9 pr-3 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                            />
                          </div>
                        </div>
                        
                        <div className="banner-form__field md:col-span-2">
                          <label className="block text-xs font-medium text-[#49617E] mb-1">
                            Button Title (optional)
                          </label>
                          <input
                            type="text"
                            value={button.title || ''}
                            onChange={(e) => handleButtonChange(index, 'title', e.target.value)}
                            placeholder="Tooltip text shown on hover"
                            className="w-full px-3 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Banner Image */}
          <div className="banner-form__image bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
            <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
              <h2 className="text-[#2B4F60] text-lg font-semibold">Banner Image</h2>
            </div>
            
            <div className="p-6 space-y-4">
              {formData.image ? (
                <div className="banner-form__image-preview">
                  <div className="relative">
                    <div className="w-full h-48 relative border border-[#E4E7EB] rounded-md overflow-hidden">
                      <Image
                        src={formData.image.url}
                        alt={formData.image.alt || 'Banner image'}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-[#FFEFEF] hover:text-[#F85464]"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="banner-form__field">
                      <label className="block text-sm font-medium text-[#49617E] mb-1">
                        Image Alt Text (for SEO)
                      </label>
                      <input
                        type="text"
                        value={formData.image.alt || ''}
                        onChange={(e) => handleImageMetadataChange('alt', e.target.value)}
                        placeholder="Descriptive text for the image"
                        className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                      />
                    </div>
                    
                    <div className="banner-form__field">
                      <label className="block text-sm font-medium text-[#49617E] mb-1">
                        Image Title (for SEO)
                      </label>
                      <input
                        type="text"
                        value={formData.image.title || ''}
                        onChange={(e) => handleImageMetadataChange('title', e.target.value)}
                        placeholder="Title attribute for the image"
                        className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="banner-form__image-upload">
                  <label className="flex flex-col items-center justify-center h-48 cursor-pointer border-2 border-dashed border-[#E4E7EB] rounded-md p-6 hover:border-[#007BF9] transition-colors">
                    <FileImage size={32} className="mb-3 text-[#6F8591]" />
                    <span className="text-sm font-medium text-[#49617E]">Upload Banner Image</span>
                    <span className="text-xs text-[#6F8591] mt-1">Drag & drop or click to select</span>
                    <span className="text-xs text-[#6F8591] mt-1">JPG, PNG, or GIF (max 2MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right Column - Banner Settings */}
        <div className="col-span-1 space-y-6">
          {/* Action Buttons */}
          <div className="banner-form__actions bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
            <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
              <h2 className="text-[#2B4F60] text-lg font-semibold">Actions</h2>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col gap-3">
                <Button
                  type="button"
                  onClick={(e) => handleSubmit(e, false)}
                  isLoading={isSubmitting}
                  fullWidth
                >
                  Save
                </Button>
                
                <Button
                  type="button"
                  variant="primary"
                  onClick={(e) => handleSubmit(e, true)}
                  isLoading={isSubmitting}
                  fullWidth
                >
                  Save & Exit
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  fullWidth
                >
                  Exit
                </Button>
                
                {isEditMode && onDelete && (
                  <Button
                    type="button"
                    variant="danger"
                    leftIcon={<Trash2 size={16} />}
                    onClick={handleDelete}
                    isLoading={isDeleting}
                    fullWidth
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          {/* Banner Status */}
          <div className="banner-form__status bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
            <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
              <h2 className="text-[#2B4F60] text-lg font-semibold">Status</h2>
            </div>
            
            <div className="p-6">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status === 'active'}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-[#E0E0E0] peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-[#007BF9] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#30BF89]"></div>
                <span className="ml-2 text-sm text-[#49617E]">
                  {formData.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BannerForm;