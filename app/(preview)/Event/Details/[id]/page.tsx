'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCMSState, CMSState, getSettings } from '@/lib/store';
import { getMockEventById, MockEvent, getEventTimeLabel } from '@/lib/mock/events';
import { formatPrice, formatTimeRemaining } from '@/lib/format';
import Script from 'next/script';

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id);

  const [cms, setCms] = useState<CMSState | null>(null);
  const [event, setEvent] = useState<MockEvent | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCms(getCMSState());
    const found = getMockEventById(id);
    if (found) {
      setEvent(found);
    } else {
      setNotFound(true);
    }
    setMounted(true);
  }, [id]);

  const settings = getSettings();
  const aspectClass = `aspect-${settings.galleryAspectRatio}`;

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

  if (!cms) return null;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{event?.title || 'Event'} - AuctionWorx</title>
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
                <li className="active"><a href="/Events">Events</a></li>
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
            <div className="alert alert-warning">
              <h4>Event Not Found</h4>
              <p>The event #{id} does not exist in mock data.</p>
              <a href="/" className="btn btn-primary btn-sm">Back to Home</a>
            </div>
          ) : event ? (
            <div data-eventid={event.id}>
              {/* Event Header */}
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col-md-8">
                      <span className="awe-rt-eventbidstatuslabel label label-danger" style={{ marginRight: '10px' }}>
                        {event.phase === 'Preview' ? 'PREVIEW' : event.phase === 'BiddingStarted' ? 'LIVE' : event.phase === 'ClosingStarted' ? 'CLOSING' : 'ENDED'}
                      </span>
                      <h3 style={{ display: 'inline', color: '#fff' }}>{event.title}</h3>
                    </div>
                    <div className="col-md-4 text-right">
                      <span className="awe-rt-eventtimelabel" style={{ marginRight: '5px' }}>
                        {getEventTimeLabel(event.phase)}
                      </span>
                      <span
                        className="awe-rt-eventtimecountdown"
                        data-ending={event.firstCloseTime.toISOString()}
                        style={{ fontSize: '18px', fontWeight: 'bold' }}
                      >
                        {formatTimeRemaining(event.firstCloseTime)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-md-8">
                      <p>{event.description}</p>
                    </div>
                    <div className="col-md-4">
                      <ul className="list-unstyled">
                        <li><strong>Lots:</strong> {event.lotCount}</li>
                        <li><strong>Location:</strong> {event.location}</li>
                        <li><strong>Buyer&apos;s Premium:</strong> {event.buyersPremium}%</li>
                        <li><strong>Start:</strong> {event.startTime.toLocaleString()}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Phase Indicators */}
              <div style={{ marginBottom: '20px' }}>
                <div className="awe-hidden awe-rt-ShowOnBiddingStarted alert alert-success">
                  <strong>Bidding is now open!</strong> Place your bids on the lots below.
                </div>
                <div className="awe-hidden awe-rt-ShowOnClosingStarted alert alert-warning">
                  <strong>Lots are closing!</strong> Watch the countdown on each lot.
                </div>
                <div className="awe-hidden awe-rt-ShowOnBiddingEnded alert alert-info">
                  <strong>This auction has ended.</strong> Thank you for participating.
                </div>
              </div>

              {/* Controls */}
              <div className="well well-sm" style={{ marginBottom: '20px' }}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-inline">
                      <div className="form-group" style={{ marginRight: '10px' }}>
                        <label style={{ marginRight: '5px' }}>Sort:</label>
                        <select className="form-control input-sm">
                          <option>Lot Order</option>
                          <option>Ending Soon</option>
                          <option>Price: Low to High</option>
                          <option>Price: High to Low</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label style={{ marginRight: '5px' }}>Status:</label>
                        <select className="form-control input-sm">
                          <option>All Lots</option>
                          <option>Active Only</option>
                          <option>Completed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 text-right">
                    <span className="text-muted">Showing {event.listings.length} lots</span>
                  </div>
                </div>
              </div>

              {/* Lot Grid */}
              <div className="row">
                {event.listings.slice(0, 12).map((listing) => (
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
                              src={listing.imageUrl || 'https://via.placeholder.com/400x300/e0e0e0/666?text=Lot+' + listing.lotNumber}
                              alt={listing.title}
                              className="img-responsive"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                        </a>
                        <span className={`label ${listing.status === 'Active' ? 'label-success' : 'label-default'}`} style={{ position: 'absolute', top: '10px', left: '10px' }}>
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
                        <div className="galleryPrice">
                          <span className="awe-rt-CurrentPrice">{formatPrice(listing.currentPrice)}</span>
                        </div>
                        <div className="small text-muted">
                          <span className="awe-rt-AcceptedListingActionCount">{listing.bidCount || 0}</span> bids
                        </div>
                        <div
                          className="galleryTime galleryTime--active awe-rt-endingDTTM"
                          data-ending={listing.endTime.toISOString()}
                        >
                          {formatTimeRemaining(listing.endTime)}
                        </div>
                        <div style={{ marginTop: '10px' }}>
                          <button className="btn btn-primary btn-sm btn-block PlaceQuickBid">
                            Quick Bid <span className="awe-rt-MinimumBid">{formatPrice(listing.minimumBid)}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
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
