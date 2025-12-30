'use client';

import { useState, useEffect } from 'react';
import { getCMSState, updateCMSField } from '@/lib/store';
import ContentTextarea from '@/components/admin/ContentTextarea';

export default function SiteHeaderPage() {
  const [value, setValue] = useState('');

  useEffect(() => {
    const state = getCMSState();
    setValue(state.siteHeader);
  }, []);

  const handleSave = (newValue: string) => {
    updateCMSField('siteHeader', newValue);
    setValue(newValue);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Site Header</h1>
      <p className="text-gray-600 mb-6">
        Custom HTML content displayed at the top of every page, above the navigation bar.
      </p>

      <div className="bg-white rounded-lg shadow p-6">
        <ContentTextarea
          label="Site Header Content"
          description="HTML content for the site header area. Appears above the main navigation."
          value={value}
          onChange={handleSave}
          historyEntry={{
            area: 'site-header',
            label: 'Site Header',
            href: '/admin/cms/content/site-header'
          }}
          placeholder={`<div class="site-header-content bg-dark text-white py-2">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 text-center">
        <small>Free shipping on orders over $100!</small>
      </div>
    </div>
  </div>
</div>`}
        />
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Common Usage:</h3>
        <ul className="list-disc list-inside text-blue-800 text-sm space-y-1">
          <li>Promotional banners and announcements</li>
          <li>Contact information or phone number</li>
          <li>Social media links</li>
          <li>Login/Register links above main nav</li>
        </ul>
      </div>
    </div>
  );
}
