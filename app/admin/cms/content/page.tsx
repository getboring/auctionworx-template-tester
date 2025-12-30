'use client';

import Link from 'next/link';

const contentAreas = [
  {
    name: 'Header Scripts',
    href: '/admin/cms/content/header-scripts',
    description: 'Custom CSS, Google Fonts, and meta tags. Injected before </head>.',
    icon: '🎨',
  },
  {
    name: 'Footer Scripts',
    href: '/admin/cms/content/footer-scripts',
    description: 'Custom JavaScript. Injected before </body>.',
    icon: '📜',
  },
  {
    name: 'Homepage Announcement',
    href: '/admin/cms/content/homepage-announcement',
    description: 'Hero section/banner displayed above listing grid on homepage.',
    icon: '📢',
  },
  {
    name: 'Sub-Navigation Links',
    href: '/admin/cms/content/sub-navigation',
    description: 'Additional navigation links. Expected format: <li><a href="...">Text</a></li>',
    icon: '🔗',
  },
  {
    name: 'Content Pages',
    href: '/admin/cms/content/pages',
    description: 'Create and manage custom content pages.',
    icon: '📄',
  },
];

export default function CMSContentPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">CMS &gt; Content</h1>
      <p className="text-gray-600 mb-6">
        Edit content areas that inject into the site. Changes save to localStorage and appear immediately in preview.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contentAreas.map((area) => (
          <Link
            key={area.href}
            href={area.href}
            className="block bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-500"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{area.icon}</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{area.name}</h3>
                <p className="text-gray-600 text-sm">{area.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Tips:</h3>
        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
          <li>Use Source mode in real AuctionWorx CMS to paste your code</li>
          <li>Always wrap CSS in <code className="bg-gray-200 px-1">&lt;style&gt;</code> tags</li>
          <li>Always wrap JavaScript in <code className="bg-gray-200 px-1">&lt;script&gt;</code> tags</li>
          <li>Use <code className="bg-gray-200 px-1">!important</code> to override Bootstrap 3 styles</li>
        </ul>
      </div>
    </div>
  );
}
