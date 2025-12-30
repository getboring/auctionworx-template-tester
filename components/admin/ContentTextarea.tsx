'use client';

import { useState, useEffect, useCallback } from 'react';

interface ContentTextareaProps {
  label: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export default function ContentTextarea({
  label,
  description,
  value,
  onChange,
  placeholder,
  rows = 20,
}: ContentTextareaProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalValue(e.target.value);
    setIsSaved(false);
  };

  const handleSave = useCallback(() => {
    onChange(localValue);
    setIsSaved(true);
  }, [localValue, onChange]);

  // Keyboard shortcut: Cmd/Ctrl + S to save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSave]);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="flex items-center gap-3">
          {!isSaved && (
            <span className="text-sm text-yellow-600">Unsaved changes</span>
          )}
          <span className="text-xs text-gray-400">Cmd/Ctrl + S to save</span>
        </div>
      </div>

      {description && (
        <p className="text-sm text-gray-500 mb-3">{description}</p>
      )}

      <textarea
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
        spellCheck={false}
      />

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handleSave}
          disabled={isSaved}
          className={`px-4 py-2 rounded font-medium ${
            isSaved
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isSaved ? 'Saved' : 'Save Changes'}
        </button>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          Preview Site
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
