import React, { useRef, useState } from 'react';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface UploadBoxProps {
  label?: string;
  accept?: string;
  helperText?: string;
  error?: string;
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}

export const UploadBox: React.FC<UploadBoxProps> = ({
  label,
  accept,
  helperText,
  error,
  onFileSelect,
  selectedFile
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onFileSelect(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerInput = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <span className="text-xs font-semibold text-zinc-300 select-none">
          {label}
        </span>
      )}
      
      <div
        onClick={triggerInput}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "w-full cursor-pointer flex flex-col items-center justify-center border border-dashed rounded-lg p-5 transition-all duration-200 min-h-[120px] text-center",
          isDragActive 
            ? "border-blue-500 bg-blue-950/10" 
            : error 
              ? "border-red-500/80 bg-red-950/5 hover:border-red-500 hover:bg-red-950/10" 
              : "border-zinc-800 bg-zinc-950/50 hover:border-zinc-700 hover:bg-zinc-950",
          selectedFile && "border-solid border-zinc-800 bg-zinc-950/80"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
        />

        {selectedFile ? (
          <div className="w-full flex items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-sm font-medium text-zinc-200 truncate max-w-[200px] md:max-w-md">
                  {selectedFile.name}
                </span>
                <span className="text-xs text-zinc-500">
                  {formatFileSize(selectedFile.size)}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 rounded-md transition-colors"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="p-2.5 bg-zinc-900 border border-zinc-850 rounded-lg text-zinc-400">
              <Upload className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-300 font-medium">
                Click to upload or drag & drop
              </p>
              <p className="text-[10px] text-zinc-500 mt-1">
                {helperText || `Accepted formats: ${accept || 'Any'}`}
              </p>
            </div>
          </div>
        )}
      </div>

      {error ? (
        <div className="flex items-center gap-1 text-red-500 text-xs mt-0.5">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>{error}</span>
        </div>
      ) : null}
    </div>
  );
};
