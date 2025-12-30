'use client';

import { useEffect, useState } from 'react';
import { getCMSState, CMSState } from '@/lib/store';
import Script from 'next/script';

export default function RegisterPage() {
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
        <title>Register - AuctionWorx</title>
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
                <li><a href="/Account/LogOn">Sign In</a></li>
                <li className="active"><a href="/Account/Register">Register</a></li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container" style={{ marginTop: '30px', marginBottom: '40px' }}>
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Create an Account</h3>
                </div>
                <div className="panel-body">
                  <div className="alert alert-info">
                    <strong>Template Preview</strong><br />
                    This is a preview environment. Registration functionality is simulated.
                  </div>

                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="firstName">First Name</label>
                          <input type="text" className="form-control" id="firstName" placeholder="First name" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="lastName">Last Name</label>
                          <input type="text" className="form-control" id="lastName" placeholder="Last name" />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" className="form-control" id="email" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input type="text" className="form-control" id="username" placeholder="Choose a username" />
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <input type="password" className="form-control" id="password" placeholder="Choose a password" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="confirmPassword">Confirm Password</label>
                          <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password" />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input type="tel" className="form-control" id="phone" placeholder="Phone number" />
                    </div>

                    <div className="checkbox">
                      <label>
                        <input type="checkbox" /> I agree to the <a href="/Home/Information/Terms">Terms of Service</a> and <a href="/Home/Information/PrivacyPolicy">Privacy Policy</a>
                      </label>
                    </div>

                    <div className="checkbox">
                      <label>
                        <input type="checkbox" /> Subscribe to email notifications
                      </label>
                    </div>

                    <button type="button" className="btn btn-success btn-block btn-lg" onClick={() => alert('This is a preview. Registration is simulated.')}>
                      Create Account
                    </button>
                  </form>

                  <hr />

                  <div className="text-center">
                    <p>Already have an account? <a href="/Account/LogOn">Sign in</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ background: '#222', color: '#999', padding: '40px 0', marginTop: '40px' }}>
          {cms.siteFooter ? (
            <div dangerouslySetInnerHTML={{ __html: cms.siteFooter }} />
          ) : (
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <p>&copy; {new Date().getFullYear()} AuctionWorx Template Preview</p>
                  <p className="small"><a href="/admin" style={{ color: '#5bc0de' }}>Open Admin Panel</a></p>
                </div>
                <div className="col-md-6 text-right">
                  <ul className="list-inline">
                    <li><a href="/Home/Information/Terms" style={{ color: '#999' }}>Terms</a></li>
                    <li><a href="/Home/Information/PrivacyPolicy" style={{ color: '#999' }}>Privacy</a></li>
                    <li><a href="/Home/Information/Help" style={{ color: '#999' }}>Help</a></li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </footer>

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
