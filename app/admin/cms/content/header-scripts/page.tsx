'use client';

import { useState, useEffect } from 'react';
import { getCMSState, updateCMSField } from '@/lib/store';
import ContentTextarea from '@/components/admin/ContentTextarea';

export default function HeaderScriptsPage() {
  const [value, setValue] = useState('');

  useEffect(() => {
    const state = getCMSState();
    setValue(state.headerScripts);
  }, []);

  const handleSave = (newValue: string) => {
    updateCMSField('headerScripts', newValue);
    setValue(newValue);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Header Scripts</h1>
      <p className="text-gray-600 mb-6">
        Custom CSS, Google Fonts, and meta tags. Injected into <code className="bg-gray-200 px-1">&lt;head&gt;</code> before closing tag.
      </p>

      <div className="bg-white rounded-lg shadow p-6">
        <ContentTextarea
          label="Header Scripts Content"
          description="Include <style> tags for CSS and <link> tags for external resources."
          value={value}
          onChange={handleSave}
          placeholder={`<style>
/* Custom CSS */
.btn-primary {
  background-color: #d4af37 !important;
  border-color: #d4af37 !important;
}
</style>

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">`}
        />
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Common Usage:</h3>
        <ul className="list-disc list-inside text-blue-800 text-sm space-y-1">
          <li>Custom theme colors with <code className="bg-blue-100 px-1">.btn-primary</code>, <code className="bg-blue-100 px-1">.btn-success</code>, etc.</li>
          <li>Google Fonts via <code className="bg-blue-100 px-1">&lt;link&gt;</code> tag</li>
          <li>Custom font styling for <code className="bg-blue-100 px-1">.galleryTitle</code>, <code className="bg-blue-100 px-1">.galleryPrice</code></li>
          <li>Hero/announcement styling with <code className="bg-blue-100 px-1">.hp-announce</code>, <code className="bg-blue-100 px-1">.header-splash</code></li>
        </ul>
      </div>
    </div>
  );
}
