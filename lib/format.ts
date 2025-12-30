/**
 * Shared formatting utilities for AuctionWorx Template Tester
 * These are used across multiple preview pages to ensure consistent formatting.
 */

/**
 * Format a number as USD currency
 */
export function formatPrice(price?: number): string {
  if (!price) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
}

/**
 * Format milliseconds remaining as a human-readable countdown
 * Includes seconds for precision
 */
export function formatTimeRemaining(endTime: Date): string {
  const ms = endTime.getTime() - Date.now();
  if (ms <= 0) return 'Ended';

  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);

  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  return `${m}m ${s}s`;
}

/**
 * Format time remaining without seconds (for less urgency display)
 */
export function formatTimeRemainingShort(endTime: Date): string {
  const ms = endTime.getTime() - Date.now();
  if (ms <= 0) return 'Ended';

  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);

  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

/**
 * Get Bootstrap 3 label class for a listing status
 */
export function getStatusClass(status: string): string {
  const map: Record<string, string> = {
    'Active': 'label-success',
    'Preview': 'label-info',
    'Scheduled': 'label-info',
    'Closing': 'label-warning',
    'Successful': 'label-success',
    'Unsuccessful': 'label-default',
    'Draft': 'label-default',
    'Pending': 'label-warning',
    'Paused': 'label-warning',
    'Archived': 'label-default',
    'AwaitingPayment': 'label-warning',
    'FailedValidation': 'label-danger',
    'Validated': 'label-success',
  };
  return map[status] || 'label-default';
}

/**
 * Get Bootstrap 3 label class for an event phase
 */
export function getEventPhaseClass(phase: string): string {
  const map: Record<string, string> = {
    'Preview': 'label-info',
    'BiddingStarted': 'label-danger',
    'ClosingStarted': 'label-warning',
    'BiddingEnded': 'label-default',
  };
  return map[phase] || 'label-default';
}

/**
 * Get display label for an event phase
 */
export function getEventPhaseLabel(phase: string): string {
  const map: Record<string, string> = {
    'Preview': 'PREVIEW',
    'BiddingStarted': 'LIVE',
    'ClosingStarted': 'CLOSING',
    'BiddingEnded': 'ENDED',
  };
  return map[phase] || phase;
}
