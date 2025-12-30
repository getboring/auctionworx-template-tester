'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Welcome to AuctionWorx Template Tester</h2>
        <p className="text-gray-600 mb-4">
          This tool lets you test AuctionWorx templates without a live installation.
          CSS and HTML you create here can be copied directly into your real AuctionWorx CMS.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <h3 className="font-semibold text-blue-900 mb-2">How it works:</h3>
          <ol className="list-decimal list-inside text-blue-800 space-y-1 text-sm">
            <li>Edit content in the CMS section (Header Scripts, Footer Scripts, etc.)</li>
            <li>Preview your changes by clicking &quot;Preview Site&quot;</li>
            <li>When satisfied, copy your code to your real AuctionWorx CMS</li>
          </ol>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Links */}
        <Link
          href="/admin/cms/content/header-scripts"
          className="block bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="text-3xl mb-3">🎨</div>
          <h3 className="text-lg font-semibold mb-2">Header Scripts</h3>
          <p className="text-gray-600 text-sm">
            Add custom CSS and Google Fonts
          </p>
        </Link>

        <Link
          href="/admin/cms/content/footer-scripts"
          className="block bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="text-3xl mb-3">📜</div>
          <h3 className="text-lg font-semibold mb-2">Footer Scripts</h3>
          <p className="text-gray-600 text-sm">
            Add custom JavaScript
          </p>
        </Link>

        <Link
          href="/admin/cms/content/homepage-announcement"
          className="block bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="text-3xl mb-3">📢</div>
          <h3 className="text-lg font-semibold mb-2">Homepage Announcement</h3>
          <p className="text-gray-600 text-sm">
            Hero section above listings
          </p>
        </Link>

        <Link
          href="/admin/cms/content/sub-navigation"
          className="block bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="text-3xl mb-3">🔗</div>
          <h3 className="text-lg font-semibold mb-2">Sub-Navigation</h3>
          <p className="text-gray-600 text-sm">
            Add links to navigation
          </p>
        </Link>

        <Link
          href="/admin/cms/content/pages"
          className="block bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="text-3xl mb-3">📄</div>
          <h3 className="text-lg font-semibold mb-2">Content Pages</h3>
          <p className="text-gray-600 text-sm">
            Create custom pages
          </p>
        </Link>

        <Link
          href="/admin/settings"
          className="block bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="text-3xl mb-3">⚙️</div>
          <h3 className="text-lg font-semibold mb-2">Mock Settings</h3>
          <p className="text-gray-600 text-sm">
            Configure homepage display
          </p>
        </Link>
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-900 mb-2">Important Notes:</h3>
        <ul className="list-disc list-inside text-yellow-800 text-sm space-y-1">
          <li>This is Bootstrap 3 - use <code className="bg-yellow-100 px-1">.col-xs-*</code>, <code className="bg-yellow-100 px-1">.col-md-*</code> grid classes</li>
          <li>Use <code className="bg-yellow-100 px-1">!important</code> to override Bootstrap styles</li>
          <li>Don&apos;t remove <code className="bg-yellow-100 px-1">.awe-rt-*</code> classes - they&apos;re used by SignalR</li>
          <li>Custom page URLs are <code className="bg-yellow-100 px-1">/Home/Information/PageName</code></li>
        </ul>
      </div>
    </div>
  );
}
