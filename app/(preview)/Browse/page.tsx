'use client';

import { useEffect, useState } from 'react';
import { getCMSState, getSettings, CMSState, MockSettings } from '@/lib/store';
import { getMockListings, MockListing } from '@/lib/mock/listings';
import { formatPrice, formatTimeRemaining, getStatusClass } from '@/lib/format';
import Script from 'next/script';
import PreviewFooter from '@/components/preview/PreviewFooter';

export default function BrowsePage() {
  const [cms, setCms] = useState<CMSState | null>(null);
  const [settings, setSettings] = useState<MockSettings | null>(null);
  const [listings, setListings] = useState<MockListing[]>([]);
  const [mounted, setMounted] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('active');

  useEffect(() => {
    setCms(getCMSState());
    setSettings(getSettings());
    setListings(getMockListings());
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

  const filteredListings = listings.filter(listing => {
    if (filterType !== 'all' && listing.listingType !== filterType) return false;
    if (filterStatus === 'active' && !['Active', 'Closing', 'Preview'].includes(listing.status)) return false;
    if (filterStatus === 'ended' && !['Successful', 'Unsuccessful'].includes(listing.status)) return false;
    return true;
  });

  const aspectClass = `aspect-${settings.galleryAspectRatio}`;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Browse Listings - AuctionWorx</title>
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
                <li className="active"><a href="/Browse">Browse</a></li>
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
          <div className="row">
            <div className="col-xs-12">
              <h1>Browse Listings</h1>
              <hr />
            </div>
          </div>

          {/* Filters */}
          <div className="row" style={{ marginBottom: '20px' }}>
            <div className="col-md-6">
              <div className="form-inline">
                <div className="form-group" style={{ marginRight: '15px' }}>
                  <label style={{ marginRight: '5px' }}>Type:</label>
                  <select
                    className="form-control input-sm"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="Auction">Auctions</option>
                    <option value="FixedPrice">Fixed Price</option>
                    <option value="Classified">Classifieds</option>
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ marginRight: '5px' }}>Status:</label>
                  <select
                    className="form-control input-sm"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="active">Active</option>
                    <option value="ended">Ended</option>
                    <option value="all">All</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6 text-right">
              <span className="text-muted">{filteredListings.length} listings found</span>
            </div>
          </div>

          {/* Listing Grid */}
          <div className="row">
            {filteredListings.map((listing) => (
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
                        {listing.status === 'Active' || listing.status === 'Closing' ? (
                          <div className="galleryTime galleryTime--active awe-rt-endingDTTM" data-ending={listing.endTime.toISOString()}>
                            {formatTimeRemaining(listing.endTime)}
                          </div>
                        ) : (
                          <div className="small text-muted">Ended</div>
                        )}
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
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="alert alert-info text-center">
              No listings match your filters.
            </div>
          )}
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
