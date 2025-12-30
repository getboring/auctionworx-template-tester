'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCMSState, CMSState } from '@/lib/store';
import { getMockListingById, MockListing } from '@/lib/mock/listings';
import { formatPrice, formatTimeRemaining } from '@/lib/format';
import Script from 'next/script';

export default function ListingDetailPage() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id);

  const [cms, setCms] = useState<CMSState | null>(null);
  const [listing, setListing] = useState<MockListing | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCms(getCMSState());
    const found = getMockListingById(id);
    if (found) {
      setListing(found);
    } else {
      setNotFound(true);
    }
    setMounted(true);
  }, [id]);

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
        <title>{listing?.title || 'Listing'} - AuctionWorx</title>
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
                <li><a href="/Account/Register">Register</a></li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container" style={{ marginTop: '30px', marginBottom: '40px' }}>
          {notFound ? (
            <div className="alert alert-warning">
              <h4>Listing Not Found</h4>
              <p>The listing #{id} does not exist in mock data.</p>
              <a href="/" className="btn btn-primary btn-sm">Back to Home</a>
            </div>
          ) : listing ? (
            <div data-listingid={listing.id} data-listingstatus={listing.status}>
              {/* Breadcrumb */}
              <ol className="breadcrumb">
                <li><a href="/">Home</a></li>
                <li><a href="/Browse">Browse</a></li>
                <li className="active">Lot #{listing.lotNumber}</li>
              </ol>

              <div className="row">
                {/* Image Column */}
                <div className="col-md-7">
                  <div className="detail__imageContainer panel panel-default">
                    <div className="panel-body" style={{ padding: 0 }}>
                      <img
                        src={listing.imageUrl || 'https://via.placeholder.com/800x600/e0e0e0/666?text=No+Image'}
                        alt={listing.title}
                        className="img-responsive"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="panel panel-default" style={{ marginTop: '20px' }}>
                    <div className="panel-heading">
                      <h3 className="panel-title">Description</h3>
                    </div>
                    <div className="panel-body">
                      <p>{listing.description || 'No description available.'}</p>
                    </div>
                  </div>
                </div>

                {/* Bidding Column */}
                <div className="col-md-5">
                  <div className="panel panel-primary">
                    <div className="panel-heading">
                      <span className="label label-default" style={{ marginRight: '10px' }}>Lot #{listing.lotNumber}</span>
                      <span className={`label awe-rt-ColoredStatus ${listing.status === 'Active' ? 'label-success' : listing.status === 'Closing' ? 'label-warning' : 'label-default'}`}>
                        {listing.status}
                      </span>
                    </div>
                    <div className="panel-body">
                      <h3 style={{ marginTop: 0 }}>{listing.title}</h3>

                      {/* Auction Type */}
                      {listing.listingType === 'Auction' && (
                        <div className="awe-rt-BuyBox">
                          <div className="row">
                            <div className="col-xs-6">
                              <label className="text-muted small">Current Bid</label>
                              <div className="Bidding_Local_Price awe-rt-CurrentPrice" style={{ fontSize: '28px' }}>
                                {formatPrice(listing.currentPrice)}
                              </div>
                            </div>
                            <div className="col-xs-6 text-right">
                              <label className="text-muted small">Bids</label>
                              <div style={{ fontSize: '28px' }}>
                                <span className="awe-rt-AcceptedListingActionCount">{listing.bidCount || 0}</span>
                              </div>
                            </div>
                          </div>

                          <hr />

                          <div className="row">
                            <div className="col-xs-6">
                              <label className="text-muted small">Time Remaining</label>
                              <div
                                className="galleryTime--active awe-rt-endingDTTM"
                                data-ending={listing.endTime.toISOString()}
                                style={{ fontSize: '18px', fontWeight: 'bold' }}
                              >
                                {formatTimeRemaining(listing.endTime)}
                              </div>
                            </div>
                            <div className="col-xs-6">
                              <label className="text-muted small">Next Bid</label>
                              <div className="Bidding_Listing_MinPrice awe-rt-MinimumBid" style={{ fontSize: '18px' }}>
                                {formatPrice(listing.minimumBid)}
                              </div>
                            </div>
                          </div>

                          <div className="awe-rt-HideOnEnd" style={{ marginTop: '20px' }}>
                            <div className="input-group">
                              <span className="input-group-addon">$</span>
                              <input type="text" className="form-control" placeholder={listing.minimumBid?.toString()} />
                              <span className="input-group-btn">
                                <button className="btn btn-success PlaceQuickBid">Place Bid</button>
                              </span>
                            </div>
                          </div>

                          {/* Reserve indicator */}
                          {listing.reserveMet === false && (
                            <div className="alert alert-warning" style={{ marginTop: '15px', marginBottom: 0 }}>
                              <small>Reserve not yet met</small>
                            </div>
                          )}
                          {listing.reserveMet === true && (
                            <div className="alert alert-success" style={{ marginTop: '15px', marginBottom: 0 }}>
                              <small>Reserve met!</small>
                            </div>
                          )}

                          {/* Show on end */}
                          <div className="awe-hidden awe-rt-ShowOnEnd" style={{ marginTop: '15px' }}>
                            <div className="alert alert-info">
                              This auction has ended.
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Fixed Price Type */}
                      {listing.listingType === 'FixedPrice' && (
                        <div className="awe-rt-BuyBox">
                          <label className="text-muted small">Price</label>
                          <div className="awe-rt-BuyNowPrice" style={{ fontSize: '28px', color: '#5cb85c', fontWeight: 'bold' }}>
                            {formatPrice(listing.buyNowPrice)}
                          </div>
                          <div className="small text-muted" style={{ marginBottom: '20px' }}>
                            <span className="awe-rt-Quantity">{listing.quantity || 1}</span> available
                          </div>
                          <button className="btn btn-success btn-lg btn-block">Buy Now</button>
                        </div>
                      )}

                      {/* Classified Type */}
                      {listing.listingType === 'Classified' && (
                        <div className="awe-rt-BuyBox">
                          <label className="text-muted small">Contact Seller</label>
                          <div style={{ marginTop: '10px' }}>
                            {listing.contactPhone && (
                              <p><strong>Phone:</strong> {listing.contactPhone}</p>
                            )}
                            {listing.contactEmail && (
                              <p><strong>Email:</strong> <a href={`mailto:${listing.contactEmail}`}>{listing.contactEmail}</a></p>
                            )}
                          </div>
                          <a href={`mailto:${listing.contactEmail}`} className="btn btn-info btn-lg btn-block">
                            Contact Seller
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Listing Details */}
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4 className="panel-title">Listing Details</h4>
                    </div>
                    <ul className="list-group">
                      <li className="list-group-item">
                        <strong>Listing ID:</strong> {listing.id}
                      </li>
                      <li className="list-group-item">
                        <strong>Type:</strong> {listing.listingType}
                      </li>
                      <li className="list-group-item">
                        <strong>Status:</strong> <span className="awe-rt-Status">{listing.status}</span>
                      </li>
                      <li className="list-group-item">
                        <strong>Ends:</strong> {listing.endTime.toLocaleString()}
                      </li>
                    </ul>
                  </div>
                </div>
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
