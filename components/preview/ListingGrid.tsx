'use client';

import { MockListing } from '@/lib/mock/listings';
import ListingCard from './ListingCard';

interface ListingGridProps {
  listings: MockListing[];
  title?: string;
  showControls?: boolean;
}

export default function ListingGrid({ listings, title, showControls = true }: ListingGridProps) {
  return (
    <div>
      {title && (
        <div className="row" style={{ marginBottom: '20px' }}>
          <div className="col-xs-12">
            <h2 className="section-title" style={{ borderBottom: '2px solid #337ab7', paddingBottom: '10px' }}>
              {title}
            </h2>
          </div>
        </div>
      )}

      {showControls && (
        <div className="row" style={{ marginBottom: '20px' }}>
          <div className="col-xs-12">
            <div className="well well-sm" style={{ background: '#f8f8f8' }}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-inline">
                    <div className="form-group" style={{ marginRight: '10px' }}>
                      <label style={{ marginRight: '5px' }}>Sort:</label>
                      <select className="form-control input-sm">
                        <option>Ending Soon</option>
                        <option>Newly Listed</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Most Bids</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label style={{ marginRight: '5px' }}>Show:</label>
                      <select className="form-control input-sm">
                        <option>All Types</option>
                        <option>Auctions Only</option>
                        <option>Buy Now Only</option>
                        <option>Classifieds Only</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 text-right">
                  <span className="text-muted">
                    Showing {listings.length} listings
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        {listings.length === 0 ? (
          <div className="col-xs-12">
            <div className="alert alert-info">
              No listings to display.
            </div>
          </div>
        ) : (
          listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))
        )}
      </div>
    </div>
  );
}
