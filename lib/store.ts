/**
 * localStorage State Management for AuctionWorx Template Tester
 *
 * Persists CMS content and mock settings to localStorage.
 * No backend required - fully client-side.
 */

// CMS Content Areas - matches real AuctionWorx CMS
export interface CMSState {
  headerScripts: string;
  footerScripts: string;
  homepageAnnouncement: string;
  subNavigationLinks: string; // Expected format: <li><a href="/Home/Information/PageName">Link Text</a></li>
  siteHeader: string; // Custom HTML for site header area
  siteFooter: string; // Custom HTML for site footer area
  contentPages: Record<string, ContentPage>;
}

export interface ContentPage {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// Mock data settings
export interface MockSettings {
  homepageDisplay: 'featured' | 'browse' | 'none' | 'event';
  galleryAspectRatio: '4x3' | '1x1' | '3x4';
  primaryEventId?: number;
}

// Complete app state
export interface AppState {
  cms: CMSState;
  settings: MockSettings;
}

// Edit history for "Recently Edited" feature
export interface EditHistoryEntry {
  area: string;
  label: string;
  href: string;
  timestamp: string;
}

// Storage keys
const CMS_STORAGE_KEY = 'auctionworx-template-cms';
const SETTINGS_STORAGE_KEY = 'auctionworx-template-settings';
const EDIT_HISTORY_KEY = 'auctionworx-template-edit-history';

// Default CMS state
const defaultCMSState: CMSState = {
  headerScripts: `<!-- Custom CSS goes here -->
<style>
/* Example: Override primary button color */
/*
.btn-primary {
  background-color: #d4af37 !important;
  border-color: #d4af37 !important;
}
*/
</style>`,
  footerScripts: `<!-- Custom JavaScript goes here -->
<script>
$(document).ready(function() {
  console.log('AuctionWorx Template Tester loaded');
});
</script>`,
  homepageAnnouncement: `<div class="container">
  <div class="row">
    <div class="col-xs-12 text-center">
      <h2>Welcome to Our Auction</h2>
      <p>Browse thousands of items up for bid!</p>
      <a href="/Browse" class="btn btn-primary btn-lg">Start Browsing</a>
    </div>
  </div>
</div>`,
  subNavigationLinks: `<li><a href="/Home/Information/About">About Us</a></li>
<li><a href="/Home/Information/Contact">Contact</a></li>`,
  siteHeader: `<!-- Site Header Content -->
<div class="site-header-content">
  <!-- Add custom header content here -->
</div>`,
  siteFooter: `<!-- Site Footer Content -->
<div class="container">
  <div class="row">
    <div class="col-md-4">
      <h4>About Us</h4>
      <p>Your trusted auction platform.</p>
    </div>
    <div class="col-md-4">
      <h4>Quick Links</h4>
      <ul class="list-unstyled">
        <li><a href="/Home/Information/Terms">Terms of Service</a></li>
        <li><a href="/Home/Information/Privacy">Privacy Policy</a></li>
      </ul>
    </div>
    <div class="col-md-4">
      <h4>Contact</h4>
      <p>Email: contact@example.com</p>
    </div>
  </div>
</div>`,
  contentPages: {
    'About': {
      title: 'About Us',
      content: '<h1>About Our Auction House</h1>\n<p>Welcome to our auction platform. We specialize in connecting buyers with quality items.</p>',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    'Contact': {
      title: 'Contact Us',
      content: '<h1>Contact Us</h1>\n<p>Have questions? Reach out to us at contact@example.com</p>',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
};

// Default settings
const defaultSettings: MockSettings = {
  homepageDisplay: 'featured',
  galleryAspectRatio: '4x3',
  primaryEventId: undefined,
};

// Check if we're in browser
const isBrowser = typeof window !== 'undefined';

// Get CMS state from localStorage
export function getCMSState(): CMSState {
  if (!isBrowser) return defaultCMSState;

  try {
    const stored = localStorage.getItem(CMS_STORAGE_KEY);
    if (stored) {
      return { ...defaultCMSState, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Error reading CMS state:', e);
  }
  return defaultCMSState;
}

// Save CMS state to localStorage
export function saveCMSState(state: CMSState): void {
  if (!isBrowser) return;

  try {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving CMS state:', e);
  }
}

// Update a single CMS field
export function updateCMSField<K extends keyof CMSState>(
  field: K,
  value: CMSState[K]
): CMSState {
  const state = getCMSState();
  state[field] = value;
  saveCMSState(state);
  return state;
}

// Get mock settings from localStorage
export function getSettings(): MockSettings {
  if (!isBrowser) return defaultSettings;

  try {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Error reading settings:', e);
  }
  return defaultSettings;
}

// Save mock settings to localStorage
export function saveSettings(settings: MockSettings): void {
  if (!isBrowser) return;

  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving settings:', e);
  }
}

// Update a single setting
export function updateSetting<K extends keyof MockSettings>(
  key: K,
  value: MockSettings[K]
): MockSettings {
  const settings = getSettings();
  settings[key] = value;
  saveSettings(settings);
  return settings;
}

// Content page helpers
export function getContentPage(slug: string): ContentPage | undefined {
  const state = getCMSState();
  return state.contentPages[slug];
}

export function saveContentPage(slug: string, page: Omit<ContentPage, 'createdAt' | 'updatedAt'>): CMSState {
  const state = getCMSState();
  const existing = state.contentPages[slug];
  const now = new Date().toISOString();

  state.contentPages[slug] = {
    ...page,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };

  saveCMSState(state);
  return state;
}

export function deleteContentPage(slug: string): CMSState {
  const state = getCMSState();
  delete state.contentPages[slug];
  saveCMSState(state);
  return state;
}

export function listContentPages(): Array<{ slug: string; page: ContentPage }> {
  const state = getCMSState();
  return Object.entries(state.contentPages).map(([slug, page]) => ({
    slug,
    page,
  }));
}

// Validate page slug (alphanumeric, dashes, underscores only)
export function isValidPageSlug(slug: string): boolean {
  return /^[a-zA-Z0-9_-]+$/.test(slug);
}

// Reset to defaults
export function resetCMSState(): CMSState {
  saveCMSState(defaultCMSState);
  return defaultCMSState;
}

export function resetSettings(): MockSettings {
  saveSettings(defaultSettings);
  return defaultSettings;
}

export function resetAll(): void {
  resetCMSState();
  resetSettings();
}

// Edit history functions
export function getEditHistory(): EditHistoryEntry[] {
  if (!isBrowser) return [];
  try {
    const stored = localStorage.getItem(EDIT_HISTORY_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading edit history:', e);
  }
  return [];
}

export function addEditHistory(entry: Omit<EditHistoryEntry, 'timestamp'>): void {
  if (!isBrowser) return;
  try {
    const history = getEditHistory();
    // Remove existing entry for same area if exists
    const filtered = history.filter(h => h.area !== entry.area);
    // Add new entry at the beginning
    const newEntry: EditHistoryEntry = {
      ...entry,
      timestamp: new Date().toISOString(),
    };
    filtered.unshift(newEntry);
    // Keep only last 10 entries
    const trimmed = filtered.slice(0, 10);
    localStorage.setItem(EDIT_HISTORY_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.error('Error saving edit history:', e);
  }
}

// Export defaults for reference
export { defaultCMSState, defaultSettings };
