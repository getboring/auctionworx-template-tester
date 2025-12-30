'use client';

import { useState, useEffect } from 'react';
import { getCMSState, updateCMSField } from '@/lib/store';
import ContentTextarea from '@/components/admin/ContentTextarea';

export default function HomepageAnnouncementPage() {
  const [value, setValue] = useState('');

  useEffect(() => {
    const state = getCMSState();
    setValue(state.homepageAnnouncement);
  }, []);

  const handleSave = (newValue: string) => {
    updateCMSField('homepageAnnouncement', newValue);
    setValue(newValue);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Homepage Announcement</h1>
      <p className="text-gray-600 mb-6">
        Hero section/banner displayed above the listing grid on the homepage.
        Wrapped in <code className="bg-gray-200 px-1">&lt;div class=&quot;hp-announce header-splash&quot;&gt;</code>.
      </p>

      <div className="bg-white rounded-lg shadow p-6">
        <ContentTextarea
          label="Homepage Announcement Content"
          description="HTML content for the homepage hero area. Use Bootstrap 3 grid classes."
          value={value}
          onChange={handleSave}
          placeholder={`<div class="container">
  <div class="row">
    <div class="col-xs-12 text-center">
      <h2>Welcome to Our Auction</h2>
      <p>Browse thousands of items up for bid!</p>
      <a href="/Browse" class="btn btn-primary btn-lg">Start Browsing</a>
    </div>
  </div>
</div>`}
        />
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Example Layouts:</h3>
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-medium text-blue-900">Simple Centered Hero:</h4>
            <pre className="bg-blue-100 p-2 rounded text-xs overflow-x-auto">{`<div class="container">
  <div class="row">
    <div class="col-xs-12 text-center">
      <h1>Auction Title</h1>
      <p>Subtitle text here</p>
    </div>
  </div>
</div>`}</pre>
          </div>
          <div>
            <h4 className="font-medium text-blue-900">Two Column:</h4>
            <pre className="bg-blue-100 p-2 rounded text-xs overflow-x-auto">{`<div class="container">
  <div class="row">
    <div class="col-md-6">
      <h1>Left Content</h1>
    </div>
    <div class="col-md-6">
      <img src="..." class="img-responsive">
    </div>
  </div>
</div>`}</pre>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Style in Header Scripts:</h3>
        <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{`<style>
.hp-announce.header-splash {
  background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
              url('/images/hero-bg.jpg') center/cover;
  padding: 80px 0;
}
.hp-announce h1, .hp-announce h2 {
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}
</style>`}</pre>
      </div>
    </div>
  );
}
