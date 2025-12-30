/**
 * Mock Listing Data
 *
 * Includes all three listing types: Auction, FixedPrice, Classified
 */

export type ListingType = 'Auction' | 'FixedPrice' | 'Classified';
export type ListingStatus =
  | 'Preview'
  | 'Active'
  | 'Closing'
  | 'Successful'
  | 'Unsuccessful'
  | 'Draft'
  | 'Pending'
  | 'Scheduled'
  | 'Archived'
  | 'AwaitingPayment'
  | 'Paused'
  | 'FailedValidation'
  | 'Validated';

export interface MockListing {
  id: number;
  title: string;
  listingType: ListingType;
  status: ListingStatus;
  endTime: Date;
  startTime?: Date;
  imageUrl: string;
  lotNumber: string;
  description?: string;

  // Auction-specific
  currentPrice?: number;
  minimumBid?: number;
  bidCount?: number;
  reservePrice?: number;
  reserveMet?: boolean;
  startingBid?: number;

  // FixedPrice-specific
  buyNowPrice?: number;
  quantity?: number;

  // Classified-specific (no price, contact-based)
  contactEmail?: string;
  contactPhone?: string;
}

// Helper to create dates relative to now
const hoursFromNow = (hours: number) => new Date(Date.now() + hours * 3600000);
const daysFromNow = (days: number) => new Date(Date.now() + days * 86400000);

// Default mock listings with variety
export const defaultMockListings: MockListing[] = [
  // Active Auctions
  {
    id: 101,
    title: '50 Acre Farm Property - Excellent Soil',
    listingType: 'Auction',
    status: 'Active',
    startTime: new Date(Date.now() - 86400000), // Started yesterday
    endTime: daysFromNow(1),
    imageUrl: '/images/placeholder.jpg',
    lotNumber: '001',
    description: 'Beautiful 50-acre farm property with fertile soil, barn, and farmhouse.',
    currentPrice: 125000,
    minimumBid: 127500,
    bidCount: 7,
    startingBid: 100000,
    reservePrice: 120000,
    reserveMet: true,
  },
  {
    id: 102,
    title: 'Antique Tractor - John Deere 1965',
    listingType: 'Auction',
    status: 'Closing',
    startTime: new Date(Date.now() - 172800000), // Started 2 days ago
    endTime: hoursFromNow(1),
    imageUrl: '/images/placeholder.jpg',
    lotNumber: '002',
    description: 'Vintage John Deere tractor in working condition. Collectors item.',
    currentPrice: 8500,
    minimumBid: 8750,
    bidCount: 12,
    startingBid: 5000,
    reservePrice: 7500,
    reserveMet: true,
  },
  {
    id: 103,
    title: '2019 Ford F-150 XLT Pickup',
    listingType: 'Auction',
    status: 'Active',
    endTime: daysFromNow(3),
    imageUrl: '/images/placeholder.jpg',
    lotNumber: '003',
    description: 'Low mileage F-150 with towing package. One owner.',
    currentPrice: 28500,
    minimumBid: 29000,
    bidCount: 4,
    startingBid: 25000,
    reservePrice: 27000,
    reserveMet: true,
  },
  {
    id: 104,
    title: 'Restaurant Equipment Lot - Complete Kitchen',
    listingType: 'Auction',
    status: 'Active',
    endTime: daysFromNow(5),
    imageUrl: '/images/placeholder.jpg',
    lotNumber: '004',
    description: 'Complete commercial kitchen equipment from closed restaurant.',
    currentPrice: 12000,
    minimumBid: 12500,
    bidCount: 2,
    startingBid: 10000,
    reservePrice: 15000,
    reserveMet: false,
  },
  {
    id: 105,
    title: 'Preview Lot - Vintage Wine Collection',
    listingType: 'Auction',
    status: 'Preview',
    startTime: daysFromNow(2),
    endTime: daysFromNow(7),
    imageUrl: '/images/placeholder.jpg',
    lotNumber: '005',
    description: 'Rare vintage wine collection from private cellar. 50+ bottles.',
    currentPrice: 0,
    minimumBid: 5000,
    bidCount: 0,
    startingBid: 5000,
    reservePrice: 8000,
    reserveMet: false,
  },

  // Fixed Price Listings
  {
    id: 201,
    title: 'Estate Cleanout - Furniture Set',
    listingType: 'FixedPrice',
    status: 'Active',
    endTime: daysFromNow(7),
    imageUrl: '/images/placeholder.jpg',
    lotNumber: '006',
    description: 'Complete living room set: sofa, loveseat, coffee table, end tables.',
    buyNowPrice: 1200,
    quantity: 1,
  },
  {
    id: 202,
    title: 'Industrial Shelving Units (Set of 10)',
    listingType: 'FixedPrice',
    status: 'Active',
    endTime: daysFromNow(14),
    imageUrl: '/images/placeholder.jpg',
    lotNumber: '007',
    description: 'Heavy-duty industrial shelving. 6ft tall, 4ft wide.',
    buyNowPrice: 500,
    quantity: 10,
  },
  {
    id: 203,
    title: 'Office Desk and Chair Combo',
    listingType: 'FixedPrice',
    status: 'Active',
    endTime: daysFromNow(10),
    imageUrl: '/images/placeholder.jpg',
    lotNumber: '008',
    description: 'Executive desk with ergonomic chair. Excellent condition.',
    buyNowPrice: 350,
    quantity: 5,
  },

  // Classified Listings
  {
    id: 301,
    title: 'Commercial Building for Lease',
    listingType: 'Classified',
    status: 'Active',
    endTime: daysFromNow(30),
    imageUrl: '/images/placeholder.jpg',
    lotNumber: '009',
    description: '5,000 sq ft commercial space in downtown area. Great visibility.',
    contactEmail: 'leasing@example.com',
    contactPhone: '(555) 123-4567',
  },
  {
    id: 302,
    title: 'Farm Equipment Wanted',
    listingType: 'Classified',
    status: 'Active',
    endTime: daysFromNow(60),
    imageUrl: '/images/placeholder.jpg',
    lotNumber: '010',
    description: 'Looking to purchase used farm equipment. Tractors, implements.',
    contactEmail: 'buyer@farmexample.com',
    contactPhone: '(555) 987-6543',
  },

  // Ended listings
  {
    id: 401,
    title: 'Sold - Vintage Car Collection',
    listingType: 'Auction',
    status: 'Successful',
    endTime: new Date(Date.now() - 86400000), // Ended yesterday
    imageUrl: '/images/placeholder.jpg',
    lotNumber: '011',
    description: 'Collection of 5 vintage automobiles.',
    currentPrice: 185000,
    bidCount: 23,
    reserveMet: true,
  },
  {
    id: 402,
    title: 'No Sale - Abstract Art Piece',
    listingType: 'Auction',
    status: 'Unsuccessful',
    endTime: new Date(Date.now() - 172800000), // Ended 2 days ago
    imageUrl: '/images/placeholder.jpg',
    lotNumber: '012',
    description: 'Original abstract painting by local artist.',
    currentPrice: 2500,
    bidCount: 3,
    reservePrice: 5000,
    reserveMet: false,
  },

  // Additional statuses for testing
  {
    id: 501,
    title: 'Scheduled - Estate Auction Next Week',
    listingType: 'Auction',
    status: 'Scheduled',
    startTime: daysFromNow(7),
    endTime: daysFromNow(14),
    imageUrl: '/images/placeholder.jpg',
    lotNumber: '013',
    description: 'Complete estate auction scheduled for next week.',
    currentPrice: 0,
    minimumBid: 1000,
    bidCount: 0,
    startingBid: 1000,
  },
  {
    id: 502,
    title: 'Archived - Old Equipment Lot',
    listingType: 'Auction',
    status: 'Archived',
    endTime: new Date(Date.now() - 30 * 86400000), // Ended 30 days ago
    imageUrl: '/images/placeholder.jpg',
    lotNumber: '014',
    description: 'Archived auction - no longer available.',
    currentPrice: 15000,
    bidCount: 8,
    reserveMet: true,
  },
  {
    id: 503,
    title: 'Awaiting Payment - Heavy Machinery',
    listingType: 'Auction',
    status: 'AwaitingPayment',
    endTime: new Date(Date.now() - 3 * 86400000), // Ended 3 days ago
    imageUrl: '/images/placeholder.jpg',
    lotNumber: '015',
    description: 'Auction ended, awaiting buyer payment.',
    currentPrice: 45000,
    bidCount: 15,
    reserveMet: true,
  },
  {
    id: 504,
    title: 'Paused - Consignment Items',
    listingType: 'Auction',
    status: 'Paused',
    endTime: daysFromNow(5),
    imageUrl: '/images/placeholder.jpg',
    lotNumber: '016',
    description: 'Auction temporarily paused by seller.',
    currentPrice: 3500,
    minimumBid: 3750,
    bidCount: 5,
    startingBid: 2000,
    reserveMet: true,
  },
  {
    id: 505,
    title: 'Failed Validation - Incomplete Submission',
    listingType: 'Auction',
    status: 'FailedValidation',
    endTime: daysFromNow(10),
    imageUrl: '/images/placeholder.jpg',
    lotNumber: '017',
    description: 'Listing failed validation - missing required information.',
    currentPrice: 0,
    minimumBid: 500,
    bidCount: 0,
    startingBid: 500,
  },
  {
    id: 506,
    title: 'Validated - Ready to Publish',
    listingType: 'FixedPrice',
    status: 'Validated',
    endTime: daysFromNow(30),
    imageUrl: '/images/placeholder.jpg',
    lotNumber: '018',
    description: 'Listing validated and ready for publishing.',
    buyNowPrice: 2500,
    quantity: 3,
  },
];

// Get all listings
export function getMockListings(): MockListing[] {
  return defaultMockListings;
}

// Get listing by ID
export function getMockListingById(id: number): MockListing | undefined {
  return defaultMockListings.find(l => l.id === id);
}

// Get listings by type
export function getMockListingsByType(type: ListingType): MockListing[] {
  return defaultMockListings.filter(l => l.listingType === type);
}

// Get listings by status
export function getMockListingsByStatus(status: ListingStatus): MockListing[] {
  return defaultMockListings.filter(l => l.status === status);
}

// Get active listings (for homepage)
export function getActiveMockListings(): MockListing[] {
  return defaultMockListings.filter(l =>
    l.status === 'Active' || l.status === 'Closing' || l.status === 'Preview'
  );
}

// Get featured listings (subset of active)
export function getFeaturedMockListings(limit = 6): MockListing[] {
  return getActiveMockListings().slice(0, limit);
}
