'use client';

import { useEffect, useState } from 'react';
import { getCMSState, getSettings, CMSState, MockSettings } from '@/lib/store';
import { getActiveMockListings, getFeaturedMockListings, MockListing } from '@/lib/mock/listings';
import { getMockEventById } from '@/lib/mock/events';
import { formatPrice, formatTimeRemaining, getStatusClass } from '@/lib/format';
import Script from 'next/script';
import PreviewFooter from '@/components/preview/PreviewFooter';

export default function HomePage() {
  const [cms, setCms] = useState<CMSState | null>(null);
  const [settings, setSettings] = useState<MockSettings | null>(null);
  const [listings, setListings] = useState<MockListing[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCms(getCMSState());
    const s = getSettings();
    setSettings(s);

    // Load listings based on homepage display setting
    if (s.homepageDisplay === 'featured') {
      setListings(getFeaturedMockListings(8));
    } else if (s.homepageDisplay === 'browse') {
      setListings(getActiveMockListings());
    } else if (s.homepageDisplay === 'event' && s.primaryEventId) {
      const event = getMockEventById(s.primaryEventId);
      if (event) {
        setListings(event.listings.slice(0, 12));
      }
    }
    // 'none' shows no listings

    setMounted(true);
  }, []);

  if (!mounted || !cms || !settings) {
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

  const aspectClass = `aspect-${settings.galleryAspectRatio}`;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>AuctionWorx Template Preview</title>
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
                <li className="active"><a href="/">Home</a></li>
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

        {/* Homepage Announcement */}
        <div className="hp-announce header-splash">
          <div dangerouslySetInnerHTML={{ __html: cms.homepageAnnouncement }} />
        </div>

        {/* Main Content */}
        <div className="container" style={{ marginTop: '20px', marginBottom: '40px' }}>
          {/* Listing Grid */}
          {listings.length > 0 && (
            <div>
              <div className="row" style={{ marginBottom: '20px' }}>
                <div className="col-xs-12">
                  <h2 className="section-title" style={{ borderBottom: '2px solid #337ab7', paddingBottom: '10px' }}>
                    {settings.homepageDisplay === 'featured' ? 'Featured Listings' : 'Current Listings'}
                  </h2>
                </div>
              </div>

              <div className="row">
                {listings.map((listing) => (
                  <div
                    key={listing.id}
                    className="galleryUnit col-xs-12 col-sm-6 col-md-4 col-lg-3"
                    data-listingid={listing.id}
                    data-listingstatus={listing.status}
                  >
                    <div className="panel panel-default" style={{ marginBottom: '20px' }}>
                      <div className="galleryImage" style={{ position: 'relative', overflow: 'hidden' }}>
                        <a href={`/Listing/Details/${listing.id}`}>
                          <div className={aspectClass}>
                            <img
                              src={listing.imageUrl || 'https://via.placeholder.com/400x300/e0e0e0/666?text=No+Image'}
                              alt={listing.title}
                              className="img-responsive"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                        </a>
                        <span className={`label ${getStatusClass(listing.status)}`} style={{ position: 'absolute', top: '10px', left: '10px' }}>
                          {listing.status}
                        </span>
                        <span style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '2px 8px', fontSize: '11px', borderRadius: '3px' }}>
                          Lot #{listing.lotNumber}
                        </span>
                      </div>
                      <div className="panel-body">
                        <h4 className="galleryTitle" style={{ margin: '0 0 10px', fontSize: '14px', lineHeight: '1.3' }}>
                          <a href={`/Listing/Details/${listing.id}`} style={{ color: '#333', textDecoration: 'none' }}>
                            {listing.title}
                          </a>
                        </h4>

                        {listing.listingType === 'Auction' && (
                          <>
                            <div className="galleryPrice">
                              <span className="awe-rt-CurrentPrice">{formatPrice(listing.currentPrice)}</span>
                            </div>
                            <div className="small text-muted">
                              <span className="awe-rt-AcceptedListingActionCount">{listing.bidCount || 0}</span> bids
                            </div>
                            <div className="galleryTime galleryTime--active awe-rt-endingDTTM" data-ending={listing.endTime.toISOString()}>
                              {formatTimeRemaining(listing.endTime)}
                            </div>
                          </>
                        )}

                        {listing.listingType === 'FixedPrice' && (
                          <>
                            <div className="galleryPrice">
                              <span className="awe-rt-BuyNowPrice">{formatPrice(listing.buyNowPrice)}</span>
                            </div>
                            <div className="small text-muted">Buy Now</div>
                          </>
                        )}

                        {listing.listingType === 'Classified' && (
                          <>
                            <div className="galleryPrice text-muted">Contact for Price</div>
                            <div className="small text-muted">Classified</div>
                          </>
                        )}

                        <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
                          {listing.listingType === 'Auction' && listing.status === 'Active' && (
                            <button className="btn btn-primary btn-sm btn-block PlaceQuickBid">
                              Quick Bid <span className="awe-rt-MinimumBid">{formatPrice(listing.minimumBid)}</span>
                            </button>
                          )}
                          {listing.listingType === 'FixedPrice' && listing.status === 'Active' && (
                            <button className="btn btn-success btn-sm btn-block">
                              Buy Now
                            </button>
                          )}
                          {listing.listingType === 'Classified' && (
                            <a href="#" className="btn btn-info btn-sm btn-block">Contact Seller</a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {settings.homepageDisplay === 'none' && (
            <div className="alert alert-info text-center">
              <p>No listings to display. Configure Homepage Display in <a href="/admin/settings">Mock Settings</a>.</p>
            </div>
          )}
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
