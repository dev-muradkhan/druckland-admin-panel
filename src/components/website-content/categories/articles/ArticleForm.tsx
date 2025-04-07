'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { 
  Trash2, 
  FileImage,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Code,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Undo,
  Redo
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { ArticleFormData, Category } from '@/types/article';

interface ArticleFormProps {
  initialData?: ArticleFormData;
  categories: Category[];
  onSubmit: (data: ArticleFormData, exit?: boolean) => Promise<void>;
  onDelete?: () => Promise<void>;
}

const ArticleForm: React.FC<ArticleFormProps> = ({
  initialData,
  categories,
  onSubmit,
  onDelete
}) => {
  const router = useRouter();
  
  const [formData, setFormData] = useState<ArticleFormData>(
    initialData || {
      title: '',
      description: '',
      status: 'draft',
      categories: []
    }
  );
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchCategory, setSearchCategory] = useState('');
  
  const isEditMode = !!initialData;

  // Handle input changes for basic fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle rich text changes
  const handleRichTextChange = (value: string) => {
    setFormData({
      ...formData,
      description: value
    });
  };

  // Handle category selection
  const handleCategoryToggle = (categoryId: string) => {
    const updatedCategories = [...formData.categories];
    
    if (updatedCategories.includes(categoryId)) {
      const index = updatedCategories.indexOf(categoryId);
      updatedCategories.splice(index, 1);
    } else {
      updatedCategories.push(categoryId);
    }
    
    setFormData({
      ...formData,
      categories: updatedCategories
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
        featureImage: {
          url: imageUrl,
          alt: formData.featureImage?.alt || '',
          title: formData.featureImage?.title || ''
        }
      });
    }
  };

  // Handle image metadata changes
  const handleImageMetadataChange = (field: 'alt' | 'title', value: string) => {
    if (!formData.featureImage) return;
    
    setFormData({
      ...formData,
      featureImage: {
        ...formData.featureImage,
        [field]: value
      }
    });
  };

  // Remove image
  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      featureImage: undefined
    });
  };

  // Form validation
  const validateForm = (): boolean => {
    // Title is required
    if (!formData.title.trim()) {
      toast.error('Article title is required');
      return false;
    }
    
    // Description is required
    if (!formData.description.trim()) {
      toast.error('Article description is required');
      return false;
    }
    
    return true;
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent, exit: boolean = false) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData, exit);
    } catch (error) {
      console.error('Error saving article:', error);
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} article`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!onDelete) return;
    
    const confirmed = window.confirm('Are you sure you want to delete this article?');
    if (!confirmed) return;
    
    setIsDeleting(true);
    
    try {
      await onDelete();
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('Failed to delete article');
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    router.push('/admin/content/categories/articles');
  };

  // Filter categories based on search
  const filteredCategories = searchCategory.trim() === '' 
    ? categories 
    : categories.filter(category => 
        category.name.toLowerCase().includes(searchCategory.toLowerCase())
      );

  // Recursive function to render category tree
  const renderCategories = (categoryList: Category[], level = 0) => {
    return categoryList.map(category => (
      <div key={category.id} style={{ marginLeft: `${level * 20}px` }}>
        <div className="flex items-center py-1">
          <input
            type="checkbox"
            id={`category-${category.id}`}
            checked={formData.categories.includes(category.id)}
            onChange={() => handleCategoryToggle(category.id)}
            className="rounded border-[#E4E7EB] mr-2"
          />
          <label htmlFor={`category-${category.id}`} className="text-sm text-[#49617E]">
            {category.name}
          </label>
        </div>
        {category.children && category.children.length > 0 && (
          <div>
            {renderCategories(category.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <form className="article-form">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Article Content */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          {/* Article Basic Information */}
          <div className="article-form__basic-info bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
            <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
              <h2 className="text-[#2B4F60] text-lg font-semibold">Article Information</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="article-form__field">
                <label htmlFor="title" className="block text-sm font-medium text-[#49617E] mb-1">
                  Article Title <span className="text-[#F85464]">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter article title"
                  className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Article Content */}
          <div className="article-form__content bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
            <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4 flex justify-between items-center">
              <h2 className="text-[#2B4F60] text-lg font-semibold">Article Description</h2>
              <button
                type="button"
                className="text-xs text-[#007BF9] hover:underline"
                onClick={() => window.open('https://www.markdownguide.org/basic-syntax/', '_blank')}
              >
                Rich Text Editor
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="article-form__rich-text-toolbar flex flex-wrap items-center gap-2 border-b border-[#E4E7EB] pb-2">
                <button type="button" className="p-1 text-[#49617E] hover:text-[#007BF9] hover:bg-[#F5F5F5] rounded">
                  <Undo size={16} />
                </button>
                <button type="button" className="p-1 text-[#49617E] hover:text-[#007BF9] hover:bg-[#F5F5F5] rounded">
                  <Redo size={16} />
                </button>
                <span className="border-r border-[#E4E7EB] h-6 mx-1"></span>
                <button type="button" className="p-1 text-[#49617E] hover:text-[#007BF9] hover:bg-[#F5F5F5] rounded">
                  <Bold size={16} />
                </button>
                <button type="button" className="p-1 text-[#49617E] hover:text-[#007BF9] hover:bg-[#F5F5F5] rounded">
                  <Italic size={16} />
                </button>
                <span className="border-r border-[#E4E7EB] h-6 mx-1"></span>
                <button type="button" className="p-1 text-[#49617E] hover:text-[#007BF9] hover:bg-[#F5F5F5] rounded">
                  <List size={16} />
                </button>
                <button type="button" className="p-1 text-[#49617E] hover:text-[#007BF9] hover:bg-[#F5F5F5] rounded">
                  <ListOrdered size={16} />
                </button>
                <span className="border-r border-[#E4E7EB] h-6 mx-1"></span>
                <button type="button" className="p-1 text-[#49617E] hover:text-[#007BF9] hover:bg-[#F5F5F5] rounded">
                  <LinkIcon size={16} />
                </button>
                <button type="button" className="p-1 text-[#49617E] hover:text-[#007BF9] hover:bg-[#F5F5F5] rounded">
                  <Code size={16} />
                </button>
                <button type="button" className="p-1 text-[#49617E] hover:text-[#007BF9] hover:bg-[#F5F5F5] rounded">
                  <ImageIcon size={16} />
                </button>
                <span className="border-r border-[#E4E7EB] h-6 mx-1"></span>
                <button type="button" className="p-1 text-[#49617E] hover:text-[#007BF9] hover:bg-[#F5F5F5] rounded">
                  <AlignLeft size={16} />
                </button>
                <button type="button" className="p-1 text-[#49617E] hover:text-[#007BF9] hover:bg-[#F5F5F5] rounded">
                  <AlignCenter size={16} />
                </button>
                <button type="button" className="p-1 text-[#49617E] hover:text-[#007BF9] hover:bg-[#F5F5F5] rounded">
                  <AlignRight size={16} />
                </button>
                <span className="border-r border-[#E4E7EB] h-6 mx-1"></span>
                <button type="button" className="p-1 text-[#49617E] hover:text-[#007BF9] hover:bg-[#F5F5F5] rounded">
                  <Quote size={16} />
                </button>
              </div>
              
              <div className="article-form__field">
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter article content..."
                  className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9] min-h-[300px]"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Feature Image */}
          <div className="article-form__image bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
            <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
              <h2 className="text-[#2B4F60] text-lg font-semibold">Feature Image</h2>
            </div>
            
            <div className="p-6 space-y-4">
              {formData.featureImage ? (
                <div className="article-form__image-preview">
                  <div className="relative">
                    <div className="w-full h-48 relative border border-[#E4E7EB] rounded-md overflow-hidden">
                      <Image
                        src={formData.featureImage.url}
                        alt={formData.featureImage.alt || 'Feature image'}
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
                    <div className="article-form__field">
                      <label className="block text-sm font-medium text-[#49617E] mb-1">
                        Image Alt Text (for SEO)
                      </label>
                      <input
                        type="text"
                        value={formData.featureImage.alt || ''}
                        onChange={(e) => handleImageMetadataChange('alt', e.target.value)}
                        placeholder="Descriptive text for the image"
                        className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                      />
                    </div>
                    
                    <div className="article-form__field">
                      <label className="block text-sm font-medium text-[#49617E] mb-1">
                        Image Title (for SEO)
                      </label>
                      <input
                        type="text"
                        value={formData.featureImage.title || ''}
                        onChange={(e) => handleImageMetadataChange('title', e.target.value)}
                        placeholder="Title attribute for the image"
                        className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="article-form__image-upload">
                  <label className="flex flex-col items-center justify-center h-48 cursor-pointer border-2 border-dashed border-[#E4E7EB] rounded-md p-6 hover:border-[#007BF9] transition-colors">
                    <FileImage size={32} className="mb-3 text-[#6F8591]" />
                    <span className="text-sm font-medium text-[#49617E]">Upload Feature Image</span>
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
        
        {/* Right Column - Article Settings */}
        <div className="col-span-1 space-y-6">
          {/* Action Buttons */}
          <div className="article-form__actions bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
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
          
          {/* Article Status */}
          <div className="article-form__status bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
            <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
              <h2 className="text-[#2B4F60] text-lg font-semibold">Status</h2>
            </div>
            
            <div className="p-6">
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
          
          {/* Categories */}
          <div className="article-form__categories bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
            <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
              <h2 className="text-[#2B4F60] text-lg font-semibold">Categories</h2>
            </div>
            
            <div className="p-6">
              <div className="article-form__field mb-4">
                <input
                  type="text"
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  placeholder="Search categories..."
                  className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9] text-sm"
                />
              </div>
              
              <div className="article-form__categories-list max-h-64 overflow-y-auto border border-[#E4E7EB] rounded-md p-2">
                {filteredCategories.length > 0 ? (
                  renderCategories(filteredCategories)
                ) : (
                  <p className="text-sm text-[#6F8591] p-2">No categories found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ArticleForm;