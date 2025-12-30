/**
 * Mock Event Data (Events Edition)
 *
 * Events contain multiple lots that close in sequence.
 */

import { MockListing } from './listings';

export type EventStatus = 'Preview' | 'Active' | 'Closing' | 'Closed';
export type EventPhase = 'Preview' | 'BiddingStarted' | 'ClosingStarted' | 'BiddingEnded';

export interface MockEvent {
  id: number;
  title: string;
  description?: string;
  status: EventStatus;
  phase: EventPhase;
  lotCount: number;
  startTime: Date;
  endTime: Date;
  firstCloseTime: Date;
  buyersPremium: number; // percentage
  imageUrl?: string;
  location?: string;
  listings: MockListing[];
}

// Helper to create dates
const hoursFromNow = (hours: number) => new Date(Date.now() + hours * 3600000);
const daysFromNow = (days: number) => new Date(Date.now() + days * 86400000);

// Create event lots
const createEventLots = (eventId: number, count: number, baseTime: Date): MockListing[] => {
  const lots: MockListing[] = [];
  const items = [
    { title: 'Antique Dresser', price: 450 },
    { title: 'Vintage China Set', price: 320 },
    { title: 'Oak Dining Table', price: 800 },
    { title: 'Brass Chandelier', price: 550 },
    { title: 'Persian Rug 8x10', price: 1200 },
    { title: 'Crystal Glassware Set', price: 180 },
    { title: 'Grandfather Clock', price: 950 },
    { title: 'Leather Armchair', price: 425 },
    { title: 'Silver Tea Service', price: 675 },
    { title: 'Mahogany Bookcase', price: 600 },
  ];

  for (let i = 0; i < count; i++) {
    const item = items[i % items.length];
    const lotEndTime = new Date(baseTime.getTime() + i * 120000); // 2 min between lots

    lots.push({
      id: eventId * 1000 + i + 1,
      title: item.title,
      listingType: 'Auction',
      status: i < 3 ? 'Active' : 'Preview',
      startTime: new Date(baseTime.getTime() - 86400000),
      endTime: lotEndTime,
      imageUrl: '/images/placeholder.jpg',
      lotNumber: String(i + 1).padStart(3, '0'),
      currentPrice: item.price + Math.floor(Math.random() * 200),
      minimumBid: item.price + Math.floor(Math.random() * 200) + 25,
      bidCount: Math.floor(Math.random() * 15),
      startingBid: item.price,
    });
  }

  return lots;
};

// Default mock events
export const defaultMockEvents: MockEvent[] = [
  {
    id: 1,
    title: 'Estate Auction - Johnson Family Collection',
    description: 'Complete estate liquidation featuring antiques, furniture, and collectibles.',
    status: 'Active',
    phase: 'BiddingStarted',
    lotCount: 10,
    startTime: new Date(Date.now() - 86400000), // Started yesterday
    firstCloseTime: hoursFromNow(2),
    endTime: hoursFromNow(4),
    buyersPremium: 10,
    imageUrl: '/images/placeholder.jpg',
    location: 'Nashville, TN',
    listings: createEventLots(1, 10, hoursFromNow(2)),
  },
  {
    id: 2,
    title: 'Heavy Equipment Auction',
    description: 'Construction and farm equipment from multiple consignors.',
    status: 'Active',
    phase: 'ClosingStarted',
    lotCount: 15,
    startTime: new Date(Date.now() - 172800000), // Started 2 days ago
    firstCloseTime: hoursFromNow(0.5),
    endTime: hoursFromNow(2),
    buyersPremium: 5,
    imageUrl: '/images/placeholder.jpg',
    location: 'Memphis, TN',
    listings: createEventLots(2, 15, hoursFromNow(0.5)),
  },
  {
    id: 3,
    title: 'Fine Art & Jewelry Auction',
    description: 'Curated selection of fine art, jewelry, and watches.',
    status: 'Preview',
    phase: 'Preview',
    lotCount: 25,
    startTime: daysFromNow(3),
    firstCloseTime: daysFromNow(5),
    endTime: daysFromNow(5.5),
    buyersPremium: 15,
    imageUrl: '/images/placeholder.jpg',
    location: 'Online Only',
    listings: createEventLots(3, 25, daysFromNow(5)),
  },
  {
    id: 4,
    title: 'Restaurant Liquidation Sale',
    description: 'Complete contents of closed fine dining restaurant.',
    status: 'Closed',
    phase: 'BiddingEnded',
    lotCount: 50,
    startTime: new Date(Date.now() - 604800000), // Week ago
    firstCloseTime: new Date(Date.now() - 518400000),
    endTime: new Date(Date.now() - 432000000),
    buyersPremium: 10,
    imageUrl: '/images/placeholder.jpg',
    location: 'Knoxville, TN',
    listings: createEventLots(4, 50, new Date(Date.now() - 518400000)),
  },
];

// Get all events
export function getMockEvents(): MockEvent[] {
  return defaultMockEvents;
}

// Get event by ID
export function getMockEventById(id: number): MockEvent | undefined {
  return defaultMockEvents.find(e => e.id === id);
}

// Get events by status
export function getMockEventsByStatus(status: EventStatus): MockEvent[] {
  return defaultMockEvents.filter(e => e.status === status);
}

// Get active events
export function getActiveMockEvents(): MockEvent[] {
  return defaultMockEvents.filter(e =>
    e.status === 'Active' || e.status === 'Preview'
  );
}

// Get upcoming events
export function getUpcomingMockEvents(): MockEvent[] {
  return defaultMockEvents.filter(e => e.status === 'Preview');
}

// Get event phase label
export function getEventPhaseLabel(phase: EventPhase): string {
  const labels: Record<EventPhase, string> = {
    'Preview': 'Preview - Bidding Not Started',
    'BiddingStarted': 'Live - Bidding Open',
    'ClosingStarted': 'Closing - Lots Ending',
    'BiddingEnded': 'Ended',
  };
  return labels[phase];
}

// Get event time label based on phase
export function getEventTimeLabel(phase: EventPhase): string {
  const labels: Record<EventPhase, string> = {
    'Preview': 'Starts In:',
    'BiddingStarted': 'First Lot Closes:',
    'ClosingStarted': 'Current Lot Closes:',
    'BiddingEnded': 'Ended',
  };
  return labels[phase];
}
