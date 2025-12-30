'use client';

import { useState, useEffect } from 'react';
import { getCMSState, updateCMSField } from '@/lib/store';
import ContentTextarea from '@/components/admin/ContentTextarea';

export default function FooterScriptsPage() {
  const [value, setValue] = useState('');

  useEffect(() => {
    const state = getCMSState();
    setValue(state.footerScripts);
  }, []);

  const handleSave = (newValue: string) => {
    updateCMSField('footerScripts', newValue);
    setValue(newValue);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Footer Scripts</h1>
      <p className="text-gray-600 mb-6">
        Custom JavaScript. Injected before <code className="bg-gray-200 px-1">&lt;/body&gt;</code> closing tag.
      </p>

      <div className="bg-white rounded-lg shadow p-6">
        <ContentTextarea
          label="Footer Scripts Content"
          description="Include <script> tags. jQuery is available globally."
          value={value}
          onChange={handleSave}
          historyEntry={{
            area: 'footer-scripts',
            label: 'Footer Scripts',
            href: '/admin/cms/content/footer-scripts'
          }}
          placeholder={`<script>
$(document).ready(function() {
  // Your custom JavaScript here
  console.log('Custom scripts loaded');

  // Example: Add click handler
  $('.my-button').on('click', function() {
    alert('Button clicked!');
  });
});
</script>

<!-- Google Analytics -->
<script>
  // Analytics code here
</script>`}
        />
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Available Globally:</h3>
        <ul className="list-disc list-inside text-blue-800 text-sm space-y-1">
          <li><code className="bg-blue-100 px-1">jQuery</code> (2.2.4) - <code className="bg-blue-100 px-1">$</code> and <code className="bg-blue-100 px-1">jQuery</code></li>
          <li><code className="bg-blue-100 px-1">Bootstrap 3 JS</code> - modals, dropdowns, collapse, tabs</li>
          <li><code className="bg-blue-100 px-1">window.mockSignalR</code> - for testing SignalR events</li>
        </ul>
      </div>

      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-900 mb-2">Warning:</h3>
        <p className="text-yellow-800 text-sm">
          Do NOT modify SignalR behavior. The <code className="bg-yellow-100 px-1">.awe-rt-*</code> classes are updated by SignalR for real-time bidding.
          Changing them will break live auction functionality.
        </p>
      </div>
    </div>
  );
}
