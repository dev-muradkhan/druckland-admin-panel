'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { FileImage, Upload } from 'lucide-react';
import { toast } from 'react-toastify';

interface LogoUploaderProps {
  currentLogo?: string;
  onUpload: (file: File) => void;
  size: 'small' | 'large';
}

export default function LogoUploader({ currentLogo, onUpload, size }: LogoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Image dimensions based on size
  const dimensions = size === 'small' 
    ? { width: 64, height: 64 } 
    : { width: 180, height: 50 };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    validateAndUpload(file);
  };

  // Validate file type and size
  const validateAndUpload = (file: File) => {
    // Check file type
    const validTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];
    if (size === 'small') {
      validTypes.push('image/x-icon'); // Allow ICO for favicon
    }
    
    if (!validTypes.includes(file.type)) {
      toast.error(`Invalid file type. Please upload ${validTypes.map(t => t.split('/')[1].toUpperCase()).join(', ')}`);
      return;
    }
    
    // Check file size (2MB max for logos, 1MB for favicon)
    const maxSize = size === 'small' ? 1 * 1024 * 1024 : 2 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(`File is too large. Maximum size is ${maxSize / (1024 * 1024)}MB`);
      return;
    }
    
    // Call the onUpload callback
    onUpload(file);
  };

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    validateAndUpload(file);
  };

  // Handle click to open file dialog
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="logo-uploader">
      <div className="flex items-center gap-8">
        {/* Logo Preview */}
        <div className={`logo-uploader__preview bg-white rounded-md border border-[#E4E7EB] ${
          size === 'small' ? 'w-16 h-16' : 'w-[360px] h-[100px]'
        }`}>
          {currentLogo ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image 
                src={currentLogo} 
                alt="Logo Preview" 
                width={dimensions.width} 
                height={dimensions.height} 
                className="object-contain" 
              />
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-[#B5C0C7] font-medium">
              No image
            </div>
          )}
        </div>

        {/* Upload Button */}
        <div 
          className={`logo-uploader__input-container ${
            size === 'small' ? 'w-64' : 'w-72'
          }`}
        >
          <div 
            className={`logo-uploader__dropzone ${
              isDragging ? 'border-[#007BF9] bg-[#F0F7FF]' : 'border-[#E4E7EB]'
            } border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            <FileImage className="mx-auto text-[#6F8591]" size={24} />
            <p className="text-sm font-medium text-[#384047] mt-2">Drag & drop or click to upload</p>
            <p className="text-xs text-[#6F8591] mt-1">
              {size === 'small' 
                ? 'PNG or ICO, 32×32px recommended' 
                : 'PNG, JPG or SVG, 180×50px recommended'
              }
            </p>
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept={size === 'small' ? '.png,.ico' : '.png,.jpg,.jpeg,.svg'} 
            className="hidden" 
          />
          
          <button
            type="button"
            onClick={handleClick}
            className="bg-[#B8E2F2] hover:bg-[#9dd3e9] text-[#10243E] mt-2 px-4 py-2 rounded-md text-sm w-full flex items-center justify-center transition-colors"
          >
            <Upload size={16} className="mr-2" />
            Add Image
          </button>
        </div>
      </div>
    </div>
  );
}