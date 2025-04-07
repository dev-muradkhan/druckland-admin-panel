'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { 
  Trash2, 
  Plus,
  X,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Grip,
  HelpCircle
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { FAQFormData, Question, Category } from '@/types/faq';

interface FAQFormProps {
  initialData?: FAQFormData;
  categories: Category[];
  onSubmit: (data: FAQFormData, exit?: boolean) => Promise<void>;
  onDelete?: () => Promise<void>;
}

const FAQForm: React.FC<FAQFormProps> = ({
  initialData,
  categories,
  onSubmit,
  onDelete
}) => {
  const router = useRouter();
  
  const [formData, setFormData] = useState<FAQFormData>(
    initialData || {
      categoryId: '',
      status: 'active',
      questions: [{ id: crypto.randomUUID(), question: '', answer: '' }]
    }
  );
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const isEditMode = !!initialData;

  // Handle input changes for basic fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  // Handle question changes
  const handleQuestionChange = (index: number, field: keyof Question, value: string) => {
    const updatedQuestions = [...formData.questions];
    
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      questions: updatedQuestions
    });
  };

  // Add a new question
  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        { id: crypto.randomUUID(), question: '', answer: '' }
      ]
    });
  };

  // Remove a question
  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions.splice(index, 1);
    
    setFormData({
      ...formData,
      questions: updatedQuestions
    });
  };

  // Form validation
  const validateForm = (): boolean => {
    // Category is required
    if (!formData.categoryId) {
      toast.error('Please select a category');
      return false;
    }
    
    // At least one question is required
    if (formData.questions.length === 0) {
      toast.error('Please add at least one question');
      return false;
    }
    
    // All questions and answers must be filled
    for (let i = 0; i < formData.questions.length; i++) {
      if (!formData.questions[i].question.trim()) {
        toast.error(`Question #${i + 1} is required`);
        return false;
      }
      
      if (!formData.questions[i].answer.trim()) {
        toast.error(`Answer for question #${i + 1} is required`);
        return false;
      }
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
      console.error('Error saving FAQ:', error);
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} FAQ`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!onDelete) return;
    
    const confirmed = window.confirm('Are you sure you want to delete this FAQ?');
    if (!confirmed) return;
    
    setIsDeleting(true);
    
    try {
      await onDelete();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast.error('Failed to delete FAQ');
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    router.push('/admin/content/categories/faq');
  };

  // Get selected category name
  const getSelectedCategoryName = (): string => {
    if (!formData.categoryId) return '';
    
    // Search through categories and subcategories
    for (const category of categories) {
      if (category.id === formData.categoryId) {
        return category.name;
      }
      
      if (category.subcategories) {
        for (const subcategory of category.subcategories) {
          if (subcategory.id === formData.categoryId) {
            return `${category.name} / ${subcategory.name}`;
          }
        }
      }
    }
    
    return '';
  };

  // Render category options recursively
  const renderCategoryOptions = (categoryList: Category[], level = 0) => {
    return categoryList.flatMap(category => [
      <option 
        key={category.id} 
        value={category.id}
        style={{ paddingLeft: `${level * 10}px` }}
      >
        {level > 0 ? `└ ${category.name}` : category.name}
      </option>,
      ...(category.subcategories ? renderCategoryOptions(category.subcategories, level + 1) : [])
    ]);
  };

  return (
    <form className="faq-form" onSubmit={(e) => handleSubmit(e, false)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Right Column - FAQ Settings */}
        <div className="col-span-1 space-y-6 order-2 lg:order-1">
          {/* Action Buttons */}
          <div className="faq-form__actions bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
            <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
              <h2 className="text-[#2B4F60] text-lg font-semibold">Actions</h2>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
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
          
          {/* Category Selection */}
          <div className="faq-form__category bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
            <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
              <h2 className="text-[#2B4F60] text-lg font-semibold">Category</h2>
            </div>
            
            <div className="p-6">
              <div className="faq-form__field">
                <label htmlFor="categoryId" className="block text-sm font-medium text-[#49617E] mb-1">
                  Select Category <span className="text-[#F85464]">*</span>
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                  required
                >
                  <option value="">Select a category</option>
                  {renderCategoryOptions(categories)}
                </select>
                <p className="text-xs text-[#6F8591] mt-1">
                  FAQs will be displayed under the selected category
                </p>
              </div>
            </div>
          </div>
          
          {/* Status */}
          <div className="faq-form__status bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
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
              <p className="text-xs text-[#6F8591] mt-2">
                Active FAQs will be displayed on the website
              </p>
            </div>
          </div>
          
          {/* Help Section */}
          <div className="faq-form__help bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
            <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
              <h2 className="text-[#2B4F60] text-lg font-semibold">Help</h2>
            </div>
            
            <div className="p-6">
              <div className="flex items-start gap-3 text-sm text-[#49617E]">
                <HelpCircle size={18} className="text-[#007BF9] shrink-0 mt-0.5" />
                <div>
                  <p className="mb-2">
                    Create FAQ entries for your customers by adding questions and answers below. 
                  </p>
                  <p>
                    You can add multiple questions under the same category and reorder them as needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Left Column - FAQ Content */}
        <div className="col-span-1 lg:col-span-2 space-y-6 order-1 lg:order-2">
          {/* FAQ Information */}
          <div className="faq-form__info bg-white rounded-md border border-[#E4E7EB] overflow-hidden">
            <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-4">
              <h2 className="text-[#2B4F60] text-lg font-semibold">
                FAQ Information
                {formData.categoryId && (
                  <span className="ml-2 text-sm font-normal text-[#49617E]">
                    - {getSelectedCategoryName()}
                  </span>
                )}
              </h2>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-[#49617E] mb-4">
                Add questions and answers that will appear under this category. You can add multiple questions and reorder them as needed.
              </p>
            </div>
          </div>
          
          {/* Questions & Answers */}
          <div className="faq-form__questions space-y-4">
            {formData.questions.map((questionItem, index) => (
              <div 
                key={questionItem.id} 
                className="faq-form__question-item bg-white rounded-md border border-[#E4E7EB] overflow-hidden"
              >
                <div className="bg-[#F8F9FA] border-b border-[#E4E7EB] px-6 py-3 flex justify-between items-center">
                  <h3 className="text-[#2B4F60] font-medium flex items-center">
                    <Grip size={16} className="mr-2 text-[#6F8591]" />
                    Question #{index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(index)}
                    className="text-[#49617E] hover:text-[#F85464] p-1"
                    disabled={formData.questions.length === 1}
                    title={formData.questions.length === 1 ? "Can't remove the only question" : "Remove question"}
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="faq-form__field">
                    <label className="block text-sm font-medium text-[#49617E] mb-1">
                      Question <span className="text-[#F85464]">*</span>
                    </label>
                    <input
                      type="text"
                      value={questionItem.question}
                      onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                      placeholder="Enter question"
                      className="w-full px-4 py-2 border border-[#E4E7EB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9]"
                      required
                    />
                  </div>
                  
                  <div className="faq-form__field">
                    <label className="block text-sm font-medium text-[#49617E] mb-1">
                      Answer <span className="text-[#F85464]">*</span>
                    </label>
                    
                    <div className="faq-form__rich-text-toolbar flex flex-wrap items-center gap-2 border border-[#E4E7EB] border-b-0 rounded-t-md bg-[#F8F9FA] p-2">
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
                    </div>
                    
                    <textarea
                      value={questionItem.answer}
                      onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                      placeholder="Enter answer"
                      className="w-full px-4 py-2 border border-[#E4E7EB] rounded-b-md focus:outline-none focus:ring-1 focus:ring-[#007BF9] focus:border-[#007BF9] min-h-[150px]"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <div className="faq-form__add-question">
              <Button
                type="button"
                variant="outline"
                leftIcon={<Plus size={16} />}
                onClick={handleAddQuestion}
                fullWidth
              >
                Add Another Question
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FAQForm;