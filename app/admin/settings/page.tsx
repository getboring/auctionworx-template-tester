'use client';

import { useState, useEffect } from 'react';
import { getSettings, saveSettings, MockSettings, resetAll } from '@/lib/store';

export default function MockSettingsPage() {
  const [settings, setSettings] = useState<MockSettings>({
    homepageDisplay: 'featured',
    galleryAspectRatio: '4x3',
  });

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const handleChange = (key: keyof MockSettings, value: MockSettings[keyof MockSettings]) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleReset = () => {
    if (confirm('Reset all data? This will clear all CMS content and settings.')) {
      resetAll();
      window.location.reload();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Mock Settings</h1>
      <p className="text-gray-600 mb-6">
        Configure how the preview site displays mock data.
      </p>

      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Homepage Display Mode
          </label>
          <select
            value={settings.homepageDisplay}
            onChange={(e) => handleChange('homepageDisplay', e.target.value as MockSettings['homepageDisplay'])}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="featured">Featured Listings (default)</option>
            <option value="browse">Browse All Listings</option>
            <option value="event">Event Homepage</option>
            <option value="none">No Listings (Announcement Only)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Controls what listings appear on the homepage below the announcement.
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gallery Aspect Ratio
          </label>
          <div className="flex gap-4">
            {(['4x3', '1x1', '3x4'] as const).map((ratio) => (
              <label key={ratio} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="aspectRatio"
                  value={ratio}
                  checked={settings.galleryAspectRatio === ratio}
                  onChange={(e) => handleChange('galleryAspectRatio', e.target.value as MockSettings['galleryAspectRatio'])}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">{ratio}</span>
              </label>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Aspect ratio for listing images in the grid.
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Event ID (for Event Homepage mode)
          </label>
          <input
            type="number"
            value={settings.primaryEventId || ''}
            onChange={(e) => handleChange('primaryEventId', e.target.value ? parseInt(e.target.value) : undefined)}
            placeholder="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Event ID to display when Homepage Display is set to &quot;Event Homepage&quot;.
          </p>
        </div>

        <div className="pt-4 border-t">
          <h3 className="font-medium text-gray-900 mb-4">Data Management</h3>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reset All Data
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Clears all CMS content and settings from localStorage.
          </p>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl">
        <h3 className="font-semibold text-blue-900 mb-2">About Mock Data:</h3>
        <p className="text-blue-800 text-sm">
          The preview site uses mock listing and event data to simulate a real AuctionWorx site.
          This allows you to test how your CSS and HTML will look with actual auction content.
        </p>
      </div>
    </div>
  );
}
