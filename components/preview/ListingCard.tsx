'use client';

import { MockListing } from '@/lib/mock/listings';
import { getSettings } from '@/lib/store';
import { formatPrice, formatTimeRemaining, getStatusClass } from '@/lib/format';

interface ListingCardProps {
  listing: MockListing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const settings = getSettings();
  const aspectClass = `aspect-${settings.galleryAspectRatio}`;

  // Render based on listing type
  const renderAuctionContent = () => (
    <>
      <div className="galleryPrice">
        <span className="awe-rt-CurrentPrice">{formatPrice(listing.currentPrice)}</span>
      </div>
      <div className="small text-muted">
        <span className="awe-rt-AcceptedListingActionCount">{listing.bidCount || 0}</span> bids
        {listing.reserveMet === false && (
          <span className="text-warning"> (Reserve not met)</span>
        )}
      </div>
      <div
        className="galleryTime galleryTime--active awe-rt-endingDTTM"
        data-ending={listing.endTime.toISOString()}
      >
        {formatTimeRemaining(listing.endTime)}
      </div>
    </>
  );

  const renderFixedPriceContent = () => (
    <>
      <div className="galleryPrice">
        <span className="awe-rt-BuyNowPrice">{formatPrice(listing.buyNowPrice)}</span>
      </div>
      <div className="small text-muted">
        <span className="awe-rt-Quantity">{listing.quantity || 1}</span> available
      </div>
      <div className="galleryTime">
        Ends: {listing.endTime.toLocaleDateString()}
      </div>
    </>
  );

  const renderClassifiedContent = () => (
    <>
      <div className="galleryPrice text-muted">
        Contact for Price
      </div>
      <div className="small text-muted">
        {listing.contactPhone || listing.contactEmail}
      </div>
      <div className="galleryTime">
        Listed until: {listing.endTime.toLocaleDateString()}
      </div>
    </>
  );

  return (
    <div
      className="galleryUnit col-xs-12 col-sm-6 col-md-4 col-lg-3"
      data-listingid={listing.id}
      data-listingstatus={listing.status}
    >
      <div className="panel panel-default" style={{ marginBottom: '20px' }}>
        {/* Image Container */}
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

          {/* Status Badge */}
          <span
            className={`label ${getStatusClass(listing.status)} awe-rt-ShowStatus${listing.status}`}
            style={{ position: 'absolute', top: '10px', left: '10px' }}
          >
            {listing.status}
          </span>

          {/* Lot Number */}
          <span
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              background: 'rgba(0,0,0,0.7)',
              color: '#fff',
              padding: '2px 8px',
              fontSize: '11px',
              borderRadius: '3px',
            }}
          >
            Lot #{listing.lotNumber}
          </span>

          {/* Status-based elements (hidden by default, shown by SignalR) */}
          <div className="awe-hidden awe-rt-ShowStatusSuccessful" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(92,184,92,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="text-white" style={{ fontSize: '24px', fontWeight: 'bold' }}>SOLD</span>
          </div>
          <div className="awe-hidden awe-rt-ShowStatusUnsuccessful" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(119,119,119,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="text-white" style={{ fontSize: '24px', fontWeight: 'bold' }}>NO SALE</span>
          </div>
        </div>

        {/* Body */}
        <div className="panel-body">
          <h4 className="galleryTitle" style={{ margin: '0 0 10px', fontSize: '14px', lineHeight: '1.3' }}>
            <a href={`/Listing/Details/${listing.id}`} style={{ color: '#333', textDecoration: 'none' }}>
              {listing.title}
            </a>
          </h4>

          {/* Type-specific content */}
          {listing.listingType === 'Auction' && renderAuctionContent()}
          {listing.listingType === 'FixedPrice' && renderFixedPriceContent()}
          {listing.listingType === 'Classified' && renderClassifiedContent()}

          {/* Actions */}
          <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
            {listing.listingType === 'Auction' && listing.status === 'Active' && (
              <button className="btn btn-primary btn-sm btn-block PlaceQuickBid">
                Quick Bid {formatPrice(listing.minimumBid)}
              </button>
            )}
            {listing.listingType === 'FixedPrice' && listing.status === 'Active' && (
              <button className="btn btn-success btn-sm btn-block">
                Buy Now {formatPrice(listing.buyNowPrice)}
              </button>
            )}
            {listing.listingType === 'Classified' && (
              <a href={`mailto:${listing.contactEmail}`} className="btn btn-info btn-sm btn-block">
                Contact Seller
              </a>
            )}
            {(listing.status === 'Successful' || listing.status === 'Unsuccessful') && (
              <a href={`/Listing/Details/${listing.id}`} className="btn btn-default btn-sm btn-block">
                View Details
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
