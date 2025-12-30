'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin' },
  {
    label: 'CMS',
    href: '/admin/cms',
    children: [
      { label: 'Content', href: '/admin/cms/content' },
    ],
  },
  { label: 'Mock Settings', href: '/admin/settings' },
];

const contentItems: NavItem[] = [
  { label: 'Header Scripts', href: '/admin/cms/content/header-scripts' },
  { label: 'Footer Scripts', href: '/admin/cms/content/footer-scripts' },
  { label: 'Homepage Announcement', href: '/admin/cms/content/homepage-announcement' },
  { label: 'Sub-Navigation Links', href: '/admin/cms/content/sub-navigation' },
  { label: 'Site Header', href: '/admin/cms/content/site-header' },
  { label: 'Site Footer', href: '/admin/cms/content/site-footer' },
  { label: 'Content Pages', href: '/admin/cms/content/pages' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  const isContentSection = pathname.startsWith('/admin/cms/content');

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex-shrink-0">
      <div className="p-4 border-b border-gray-700">
        <Link href="/admin" className="text-xl font-bold text-white hover:text-gray-200">
          AuctionWorx Admin
        </Link>
        <p className="text-xs text-gray-400 mt-1">Template Tester</p>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-3 py-2 rounded transition-colors ${
                  isActive(item.href)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.label}
              </Link>

              {/* Show CMS children when in CMS section */}
              {item.label === 'CMS' && isActive('/admin/cms') && item.children && (
                <ul className="ml-4 mt-2 space-y-1">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className={`block px-3 py-1.5 rounded text-sm ${
                          isActive(child.href)
                            ? 'bg-gray-700 text-white'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Content sub-nav when in content section */}
        {isContentSection && (
          <div className="mt-6 pt-4 border-t border-gray-700">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Content Areas
            </h3>
            <ul className="space-y-1">
              {contentItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 rounded text-sm ${
                      pathname === item.href || pathname.startsWith(item.href + '/')
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Preview Site Link */}
      <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-gray-700 bg-gray-900">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Preview Site
        </Link>
      </div>
    </aside>
  );
}
