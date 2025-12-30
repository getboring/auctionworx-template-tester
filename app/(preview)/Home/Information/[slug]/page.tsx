'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCMSState, getContentPage, CMSState, ContentPage } from '@/lib/store';
import Script from 'next/script';
import PreviewFooter from '@/components/preview/PreviewFooter';

export default function ContentPageRoute() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [cms, setCms] = useState<CMSState | null>(null);
  const [page, setPage] = useState<ContentPage | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCms(getCMSState());
    const contentPage = getContentPage(slug);
    if (contentPage) {
      setPage(contentPage);
    } else {
      setNotFound(true);
    }
    setMounted(true);
  }, [slug]);

  if (!mounted) {
    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Loading...</title>
        </head>
        <body>
          <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>
        </body>
      </html>
    );
  }

  if (!cms) {
    return null;
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{page?.title || slug} - AuctionWorx</title>
        <link href="/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/css/awe-base.css" rel="stylesheet" />
        <div dangerouslySetInnerHTML={{ __html: cms.headerScripts }} />
      </head>
      <body className="SignalRStatus-connected">
        {/* Navigation */}
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-nav">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand logo" href="/">
                <strong>AuctionWorx</strong> <small style={{ color: '#999' }}>Preview</small>
              </a>
            </div>
            <div className="collapse navbar-collapse" id="main-nav">
              <ul className="nav navbar-nav">
                <li><a href="/">Home</a></li>
                <li><a href="/Browse">Browse</a></li>
                <li><a href="/Events">Events</a></li>
                <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: cms.subNavigationLinks }} />
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><a href="/Account/LogOn">Sign In</a></li>
                <li><a href="/Account/Register">Register</a></li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container" style={{ marginTop: '30px', marginBottom: '40px' }}>
          {notFound ? (
            <div className="row">
              <div className="col-xs-12">
                <div className="alert alert-warning">
                  <h4>Page Not Found</h4>
                  <p>The page &quot;{slug}&quot; does not exist.</p>
                  <p>
                    <a href="/admin/cms/content/pages" className="btn btn-primary btn-sm">
                      Create this page in Admin
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ) : page ? (
            <div className="row">
              <div className="col-xs-12">
                <div dangerouslySetInnerHTML={{ __html: page.content }} />
              </div>
            </div>
          ) : null}
        </div>

        <PreviewFooter siteFooter={cms.siteFooter} />

        <div id="SignalRStatus" className="connected"></div>
        <span id="Time" className="awe-hidden"></span>

        <Script src="/js/jquery-2.2.4.min.js" strategy="beforeInteractive" />
        <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/js/signalr-mock.js" strategy="afterInteractive" />

        <div dangerouslySetInnerHTML={{ __html: cms.footerScripts }} />
      </body>
    </html>
  );
}
