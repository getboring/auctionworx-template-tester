'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getContentPage, saveContentPage, ContentPage } from '@/lib/store';
import Link from 'next/link';

export default function EditContentPagePage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaved, setIsSaved] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const page = getContentPage(slug);
    if (page) {
      setTitle(page.title);
      setContent(page.content);
    } else {
      setNotFound(true);
    }
  }, [slug]);

  const handleSave = useCallback(() => {
    saveContentPage(slug, { title, content });
    setIsSaved(true);
  }, [slug, title, content]);

  // Keyboard shortcut: Cmd/Ctrl + S
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

  if (notFound) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-4">The page &quot;{slug}&quot; does not exist.</p>
        <Link href="/admin/cms/content/pages" className="text-blue-600 hover:text-blue-800">
          Back to Content Pages
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Edit: {slug}</h1>
          <p className="text-gray-600">
            URL: <a href={`/Home/Information/${slug}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">/Home/Information/{slug}</a>
          </p>
        </div>
        <div className="flex items-center gap-3">
          {!isSaved && (
            <span className="text-yellow-600 text-sm">Unsaved changes</span>
          )}
          <span className="text-xs text-gray-400">Cmd/Ctrl + S</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Page Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setIsSaved(false);
            }}
            placeholder="Page Title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Page Content
          </label>
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setIsSaved(false);
            }}
            rows={20}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            spellCheck={false}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-4">
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
            <Link
              href="/admin/cms/content/pages"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Back to List
            </Link>
          </div>
          <a
            href={`/Home/Information/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            Preview Page
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
