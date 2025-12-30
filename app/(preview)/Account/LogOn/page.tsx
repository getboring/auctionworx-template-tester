'use client';

import { useEffect, useState } from 'react';
import { getCMSState, CMSState } from '@/lib/store';
import Script from 'next/script';
import PreviewFooter from '@/components/preview/PreviewFooter';

export default function LogOnPage() {
  const [cms, setCms] = useState<CMSState | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCms(getCMSState());
    setMounted(true);
  }, []);

  if (!mounted || !cms) {
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

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Sign In - AuctionWorx</title>
        <link href="/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/css/awe-base.css" rel="stylesheet" />
        <div dangerouslySetInnerHTML={{ __html: cms.headerScripts }} />
      </head>
      <body className="SignalRStatus-connected">
        {/* Site Header */}
        {cms.siteHeader && (
          <div className="site-header" dangerouslySetInnerHTML={{ __html: cms.siteHeader }} />
        )}

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
                <li className="active"><a href="/Account/LogOn">Sign In</a></li>
                <li><a href="/Account/Register">Register</a></li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container" style={{ marginTop: '30px', marginBottom: '40px' }}>
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Sign In to Your Account</h3>
                </div>
                <div className="panel-body">
                  <div className="alert alert-info">
                    <strong>Template Preview</strong><br />
                    This is a preview environment. Sign-in functionality is simulated.
                  </div>

                  <form>
                    <div className="form-group">
                      <label htmlFor="username">Username or Email</label>
                      <input type="text" className="form-control" id="username" placeholder="Enter username or email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control" id="password" placeholder="Enter password" />
                    </div>
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" /> Remember me
                      </label>
                    </div>
                    <button type="button" className="btn btn-primary btn-block" onClick={() => alert('This is a preview. Sign-in is simulated.')}>
                      Sign In
                    </button>
                  </form>

                  <hr />

                  <div className="text-center">
                    <p><a href="#">Forgot your password?</a></p>
                    <p>Don&apos;t have an account? <a href="/Account/Register">Register now</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <PreviewFooter siteFooter={cms.siteFooter} showDescription={false} />

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
