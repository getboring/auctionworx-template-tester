'use client';

import { useState, useEffect } from 'react';
import { getCMSState, updateCMSField } from '@/lib/store';
import ContentTextarea from '@/components/admin/ContentTextarea';

export default function SubNavigationPage() {
  const [value, setValue] = useState('');

  useEffect(() => {
    const state = getCMSState();
    setValue(state.subNavigationLinks);
  }, []);

  const handleSave = (newValue: string) => {
    updateCMSField('subNavigationLinks', newValue);
    setValue(newValue);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Sub-Navigation Links</h1>
      <p className="text-gray-600 mb-6">
        Additional navigation links injected into the navbar.
      </p>

      <div className="bg-white rounded-lg shadow p-6">
        <ContentTextarea
          label="Sub-Navigation Links"
          description="Expected format: <li><a href='/Home/Information/PageName'>Link Text</a></li>"
          value={value}
          onChange={handleSave}
          rows={10}
          placeholder={`<li><a href="/Home/Information/About">About Us</a></li>
<li><a href="/Home/Information/Contact">Contact</a></li>
<li><a href="/Home/Information/Consign">Sell With Us</a></li>
<li><a href="/Home/Information/FAQ">FAQ</a></li>`}
        />
      </div>

      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-900 mb-2">Important - URL Format:</h3>
        <p className="text-yellow-800 text-sm mb-2">
          Custom page URLs in AuctionWorx follow this pattern:
        </p>
        <code className="block bg-yellow-100 p-2 rounded text-sm">/Home/Information/PageName</code>
        <p className="text-yellow-800 text-sm mt-2">
          <strong>NOT</strong> clean URLs like <code className="bg-yellow-100 px-1">/about</code> or <code className="bg-yellow-100 px-1">/contact</code>.
        </p>
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Example Links:</h3>
        <pre className="bg-blue-100 p-2 rounded text-xs overflow-x-auto">{`<!-- Link to custom content page -->
<li><a href="/Home/Information/About">About Us</a></li>

<!-- Link to external site -->
<li><a href="https://facebook.com/yourpage" target="_blank">Facebook</a></li>

<!-- Dropdown (Bootstrap 3) -->
<li class="dropdown">
  <a href="#" class="dropdown-toggle" data-toggle="dropdown">
    Resources <span class="caret"></span>
  </a>
  <ul class="dropdown-menu">
    <li><a href="/Home/Information/Buying">Buying Guide</a></li>
    <li><a href="/Home/Information/Selling">Selling Guide</a></li>
  </ul>
</li>`}</pre>
      </div>
    </div>
  );
}
