'use client';

import { useState, useEffect } from 'react';
import { getCMSState, updateCMSField } from '@/lib/store';
import ContentTextarea from '@/components/admin/ContentTextarea';

export default function SiteFooterPage() {
  const [value, setValue] = useState('');

  useEffect(() => {
    const state = getCMSState();
    setValue(state.siteFooter);
  }, []);

  const handleSave = (newValue: string) => {
    updateCMSField('siteFooter', newValue);
    setValue(newValue);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Site Footer</h1>
      <p className="text-gray-600 mb-6">
        Custom HTML content displayed in the footer area of every page.
      </p>

      <div className="bg-white rounded-lg shadow p-6">
        <ContentTextarea
          label="Site Footer Content"
          description="HTML content for the site footer. Use Bootstrap grid classes for layout."
          value={value}
          onChange={handleSave}
          historyEntry={{
            area: 'site-footer',
            label: 'Site Footer',
            href: '/admin/cms/content/site-footer'
          }}
          placeholder={`<div class="container">
  <div class="row">
    <div class="col-md-4">
      <h4>About Us</h4>
      <p>Your trusted auction platform.</p>
    </div>
    <div class="col-md-4">
      <h4>Quick Links</h4>
      <ul class="list-unstyled">
        <li><a href="/Home/Information/Terms">Terms of Service</a></li>
        <li><a href="/Home/Information/Privacy">Privacy Policy</a></li>
      </ul>
    </div>
    <div class="col-md-4">
      <h4>Contact</h4>
      <p>Email: contact@example.com</p>
      <p>Phone: (555) 123-4567</p>
    </div>
  </div>
</div>`}
        />
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Common Usage:</h3>
        <ul className="list-disc list-inside text-blue-800 text-sm space-y-1">
          <li>Company information and about section</li>
          <li>Quick navigation links</li>
          <li>Contact information</li>
          <li>Social media icons and links</li>
          <li>Newsletter signup form</li>
        </ul>
      </div>
    </div>
  );
}
