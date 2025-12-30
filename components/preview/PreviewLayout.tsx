'use client';

import { useEffect, useState, ReactNode } from 'react';
import { getCMSState, CMSState } from '@/lib/store';
import Script from 'next/script';

interface PreviewLayoutProps {
  children: ReactNode;
}

export default function PreviewLayout({ children }: PreviewLayoutProps) {
  const [cms, setCms] = useState<CMSState | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCms(getCMSState());
    setMounted(true);
  }, []);

  // Don't render until client-side
  if (!mounted || !cms) {
    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Loading...</title>
        </head>
        <body>
          <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>AuctionWorx Template Preview</title>

        {/* Bootstrap 3 CSS */}
        <link href="/css/bootstrap.min.css" rel="stylesheet" />

        {/* AuctionWorx Base CSS */}
        <link href="/css/awe-base.css" rel="stylesheet" />

        {/* USER'S HEADER SCRIPTS (from CMS) */}
        <div dangerouslySetInnerHTML={{ __html: cms.headerScripts }} />
      </head>
      <body className="SignalRStatus-connected">
        {/* Navigation */}
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#main-nav"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand logo" href="/">
                <strong>AuctionWorx</strong> <small>Preview</small>
              </a>
            </div>

            <div className="collapse navbar-collapse" id="main-nav">
              <ul className="nav navbar-nav">
                <li><a href="/">Home</a></li>
                <li><a href="/Browse">Browse</a></li>
                <li><a href="/Events">Events</a></li>
                {/* Sub-Navigation Links injected here */}
                <span dangerouslySetInnerHTML={{ __html: cms.subNavigationLinks }} />
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><a href="/Account/LogOn">Sign In</a></li>
                <li><a href="/Account/Register">Register</a></li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Homepage Announcement */}
        <div className="hp-announce header-splash">
          <div dangerouslySetInnerHTML={{ __html: cms.homepageAnnouncement }} />
        </div>

        {/* Main Content */}
        <div className="container" style={{ marginTop: '20px', marginBottom: '40px' }}>
          {children}
        </div>

        {/* Footer */}
        <footer style={{ background: '#222', color: '#999', padding: '40px 0', marginTop: '40px' }}>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <p>&copy; {new Date().getFullYear()} AuctionWorx Template Preview</p>
                <p className="small">This is a template testing environment.</p>
              </div>
              <div className="col-md-6 text-right">
                <ul className="list-inline">
                  <li><a href="/Home/Terms" style={{ color: '#999' }}>Terms</a></li>
                  <li><a href="/Home/PrivacyPolicy" style={{ color: '#999' }}>Privacy</a></li>
                  <li><a href="/Home/Help" style={{ color: '#999' }}>Help</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>

        {/* SignalR Status Indicator */}
        <div id="SignalRStatus" className="connected"></div>

        {/* Server Time (hidden) */}
        <span id="Time" className="awe-hidden"></span>

        {/* Scripts in correct order */}
        <Script src="/js/jquery-2.2.4.min.js" strategy="beforeInteractive" />
        <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/js/signalr-mock.js" strategy="afterInteractive" />

        {/* USER'S FOOTER SCRIPTS (from CMS) */}
        <div dangerouslySetInnerHTML={{ __html: cms.footerScripts }} />
      </body>
    </html>
  );
}
