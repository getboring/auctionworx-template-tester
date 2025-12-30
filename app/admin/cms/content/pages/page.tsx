'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { listContentPages, deleteContentPage, ContentPage } from '@/lib/store';

export default function ContentPagesListPage() {
  const [pages, setPages] = useState<Array<{ slug: string; page: ContentPage }>>([]);

  useEffect(() => {
    setPages(listContentPages());
  }, []);

  const handleDelete = (slug: string) => {
    if (confirm(`Delete page "${slug}"? This cannot be undone.`)) {
      deleteContentPage(slug);
      setPages(listContentPages());
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Pages</h1>
          <p className="text-gray-600">
            Create and manage custom content pages. URLs: <code className="bg-gray-200 px-1">/Home/Information/PageName</code>
          </p>
        </div>
        <Link
          href="/admin/cms/content/pages/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + New Page
        </Link>
      </div>

      {pages.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 mb-4">No content pages yet.</p>
          <Link
            href="/admin/cms/content/pages/new"
            className="text-blue-600 hover:text-blue-800"
          >
            Create your first page
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Page Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pages.map(({ slug, page }) => (
                <tr key={slug} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {slug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {page.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={`/Home/Information/${slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      /Home/Information/{slug}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                    {new Date(page.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <Link
                      href={`/admin/cms/content/pages/${slug}`}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(slug)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-900 mb-2">Page Name Rules:</h3>
        <ul className="list-disc list-inside text-yellow-800 text-sm space-y-1">
          <li>Alphanumeric characters only (a-z, A-Z, 0-9)</li>
          <li>Dashes (<code className="bg-yellow-100 px-1">-</code>) and underscores (<code className="bg-yellow-100 px-1">_</code>) allowed</li>
          <li>No spaces or special characters</li>
          <li>Examples: <code className="bg-yellow-100 px-1">About</code>, <code className="bg-yellow-100 px-1">Contact-Us</code>, <code className="bg-yellow-100 px-1">buyer_guide</code></li>
        </ul>
      </div>
    </div>
  );
}
