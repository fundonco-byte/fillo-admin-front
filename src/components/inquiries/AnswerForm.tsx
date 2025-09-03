"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Upload, X, ImageIcon } from "lucide-react";

interface AnswerFormProps {
  onSubmit: (content: string, images: File[]) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

interface FormState {
  content: string;
  images: File[];
  error: string | null;
  isSubmitting: boolean;
}

// Custom hook for answer form state management
const useAnswerForm = () => {
  const [state, setState] = useState<FormState>({
    content: "",
    images: [],
    error: null,
    isSubmitting: false,
  });

  const updateContent = (content: string) => {
    setState((prev) => ({ ...prev, content, error: null }));
  };

  const addImages = (newImages: File[]) => {
    setState((prev) => {
      const totalImages = prev.images.length + newImages.length;
      if (totalImages > 5) {
        return {
          ...prev,
          error: "최대 5개의 이미지만 업로드할 수 있습니다.",
        };
      }
      return {
        ...prev,
        images: [...prev.images, ...newImages],
        error: null,
      };
    });
  };

  const removeImage = (index: number) => {
    setState((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      error: null,
    }));
  };

  const setSubmitting = (isSubmitting: boolean) => {
    setState((prev) => ({ ...prev, isSubmitting }));
  };

  const setError = (error: string) => {
    setState((prev) => ({ ...prev, error, isSubmitting: false }));
  };

  const reset = () => {
    setState({
      content: "",
      images: [],
      error: null,
      isSubmitting: false,
    });
  };

  return {
    state,
    updateContent,
    addImages,
    removeImage,
    setSubmitting,
    setError,
    reset,
  };
};

// Image preview component
const ImagePreview: React.FC<{
  file: File;
  onRemove: () => void;
}> = ({ file, onRemove }) => {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div className="relative group">
      <img
        src={preview}
        alt={`미리보기 ${file.name}`}
        className="w-full h-32 object-cover rounded-md border border-gray-200"
      />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
        aria-label="이미지 제거"
      >
        <X className="w-3 h-3" />
      </button>
      <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
        {file.name}
      </div>
    </div>
  );
};

// File input component
const FileUpload: React.FC<{
  onFilesSelect: (files: File[]) => void;
  disabled?: boolean;
}> = ({ onFilesSelect, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      // 이미지 파일만 필터링
      const imageFiles = files.filter((file) => file.type.startsWith("image/"));
      if (imageFiles.length !== files.length) {
        alert("이미지 파일만 업로드할 수 있습니다.");
      }
      onFilesSelect(imageFiles);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length !== files.length) {
      alert("이미지 파일만 업로드할 수 있습니다.");
    }
    onFilesSelect(imageFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className={`border-2 border-dashed border-gray-300 rounded-md p-4 text-center transition-colors ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:border-gray-400 cursor-pointer"
      }`}
      onClick={() => !disabled && fileInputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
      <div className="flex flex-col items-center gap-2 text-gray-500">
        <Upload className="w-8 h-8" />
        <div>
          <span className="font-medium">클릭하여 이미지를 선택</span>하거나
          <br />
          이미지를 드래그하여 업로드하세요
        </div>
        <div className="text-sm text-gray-400">JPG, PNG, GIF 등 (최대 5개)</div>
      </div>
    </div>
  );
};

// Submit button with loading state
const SubmitButton: React.FC<{
  isSubmitting: boolean;
  disabled: boolean;
  onClick: () => void;
}> = ({ isSubmitting, disabled, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isSubmitting}
      className={`bg-blue-600 text-white px-6 py-2 rounded-md transition-colors flex items-center gap-2 ${
        disabled || isSubmitting
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-blue-700"
      }`}
    >
      {isSubmitting ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          답변 등록 중...
        </>
      ) : (
        <>
          <Send className="w-4 h-4" />
          답변 등록
        </>
      )}
    </button>
  );
};

// Main answer form component
const AnswerForm: React.FC<AnswerFormProps> = ({
  onSubmit,
  onCancel,
  isSubmitting: externalSubmitting = false,
}) => {
  const {
    state,
    updateContent,
    addImages,
    removeImage,
    setSubmitting,
    setError,
    reset,
  } = useAnswerForm();

  const handleSubmit = async () => {
    // Validation
    if (!state.content.trim()) {
      setError("답변 내용을 입력해주세요.");
      return;
    }

    if (state.content.length < 10) {
      setError("답변은 최소 10글자 이상 입력해주세요.");
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit(state.content, state.images);
      reset();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "답변 등록에 실패했습니다."
      );
    }
  };

  const isSubmitting = state.isSubmitting || externalSubmitting;
  const isFormValid = state.content.trim().length >= 10;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="font-medium text-gray-900 mb-4">답변 작성</h3>

      {/* Error Display */}
      {state.error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <div className="text-red-800 text-sm">{state.error}</div>
        </div>
      )}

      {/* Content Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          답변 내용 *
        </label>
        <textarea
          value={state.content}
          onChange={(e) => updateContent(e.target.value)}
          placeholder="고객의 문의에 대한 친절하고 정확한 답변을 작성해주세요."
          rows={6}
          disabled={isSubmitting}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors ${
            isSubmitting ? "bg-gray-50 cursor-not-allowed" : ""
          }`}
        />
        <div className="text-sm text-gray-500 mt-1">
          {state.content.length}글자 (최소 10글자)
        </div>
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          이미지 첨부 (선택사항)
        </label>

        {state.images.length < 5 && (
          <FileUpload onFilesSelect={addImages} disabled={isSubmitting} />
        )}

        {/* Image Previews */}
        {state.images.length > 0 && (
          <div className="mt-4">
            <div className="text-sm font-medium text-gray-700 mb-2">
              선택된 이미지 ({state.images.length}/5)
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {state.images.map((file, index) => (
                <ImagePreview
                  key={`${file.name}-${index}`}
                  file={file}
                  onRemove={() => removeImage(index)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <SubmitButton
          isSubmitting={isSubmitting}
          disabled={!isFormValid}
          onClick={handleSubmit}
        />
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className={`bg-gray-300 text-gray-700 px-6 py-2 rounded-md transition-colors ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"
          }`}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default AnswerForm;
