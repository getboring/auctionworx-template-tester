'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveContentPage, isValidPageSlug, getContentPage } from '@/lib/store';

export default function NewContentPagePage() {
  const router = useRouter();
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate slug
    if (!slug.trim()) {
      setError('Page name is required');
      return;
    }

    if (!isValidPageSlug(slug)) {
      setError('Page name can only contain letters, numbers, dashes, and underscores');
      return;
    }

    // Check if page already exists
    if (getContentPage(slug)) {
      setError('A page with this name already exists');
      return;
    }

    // Save page
    saveContentPage(slug, {
      title: title || slug,
      content,
    });

    // Redirect to edit page
    router.push(`/admin/cms/content/pages/${slug}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">New Content Page</h1>
      <p className="text-gray-600 mb-6">
        Create a new custom content page. URL will be: <code className="bg-gray-200 px-1">/Home/Information/{slug || 'PageName'}</code>
      </p>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-2xl">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Page Name (URL slug) *
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="About-Us"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Letters, numbers, dashes, and underscores only. No spaces.
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Page Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="About Us"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Page Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="<h1>About Us</h1>&#10;<p>Welcome to our auction house...</p>"
            rows={15}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create Page
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
