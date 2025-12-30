/**
 * Type definitions for the MockSignalR class
 * Provides real-time updates for auction listings via DOM manipulation
 */

interface MockSignalR {
  // Listing Updates
  updatePrice(listingId: number, newPrice: number): void;
  updateMinimumBid(listingId: number, minimumBid: number): void;
  updateBidCount(listingId: number, count: number): void;
  updateStatus(listingId: number, newStatus: ListingStatus): void;
  updateReserveMet(listingId: number, reserveMet: boolean): void;

  // Event Updates (Events Edition)
  updateEventPhase(eventId: number, phase: EventPhase): void;

  // Lifecycle
  handleListingStart(listingId: number): void;
  handleListingEnd(listingId: number): void;
  startCountdowns(): void;

  // Utilities
  formatCurrency(amount: number): string;
  formatTimeRemaining(ms: number): string;
}

type ListingStatus =
  | 'Preview'
  | 'Active'
  | 'Closing'
  | 'Successful'
  | 'Unsuccessful'
  | 'Scheduled'
  | 'Archived'
  | 'AwaitingPayment'
  | 'Paused'
  | 'Validated'
  | 'AwaitingValidation'
  | 'FailedValidation'
  | 'Draft';

type EventPhase =
  | 'Preview'
  | 'BiddingStarted'
  | 'ClosingStarted'
  | 'BiddingEnded';

declare global {
  interface Window {
    mockSignalR: MockSignalR;
  }
}

export { MockSignalR, ListingStatus, EventPhase };
