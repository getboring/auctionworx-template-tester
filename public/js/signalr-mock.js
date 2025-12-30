/**
 * Mock SignalR for AuctionWorx Template Testing
 *
 * This script simulates SignalR real-time updates by manipulating the DOM
 * exactly as the real AuctionWorx SignalR would.
 *
 * Handles both standard listings AND Events Edition classes.
 */

(function() {
  'use strict';

  var MockSignalR = function() {
    this.isConnected = true;
    this.countdownInterval = null;
    this.init();
  };

  MockSignalR.prototype = {
    init: function() {
      this.updateConnectionStatus('connected');
      this.startCountdowns();
      this.initializeStatusDisplay();
      console.log('[MockSignalR] Initialized');
    },

    // ========================================
    // Connection Status
    // ========================================
    updateConnectionStatus: function(status) {
      var statusEl = document.getElementById('SignalRStatus');
      if (statusEl) {
        statusEl.className = '';
        statusEl.classList.add(status);
      }
      document.body.classList.remove('SignalRStatus-connected', 'SignalRStatus-reconnect', 'SignalRStatus-stopped');
      document.body.classList.add('SignalRStatus-' + status);
      this.isConnected = (status === 'connected');
    },

    // ========================================
    // Listing Updates
    // ========================================
    updatePrice: function(listingId, newPrice) {
      var container = document.querySelector('[data-listingid="' + listingId + '"]');
      if (!container) return;

      var priceEls = container.querySelectorAll('.awe-rt-CurrentPrice, .awe-rt-MinimumBid');
      var self = this;
      priceEls.forEach(function(el) {
        el.textContent = self.formatCurrency(newPrice);
        self.pulse(el);
      });
    },

    updateBidCount: function(listingId, count) {
      var container = document.querySelector('[data-listingid="' + listingId + '"]');
      if (!container) return;

      var countEl = container.querySelector('.awe-rt-AcceptedListingActionCount');
      if (countEl) {
        countEl.textContent = count;
        this.pulse(countEl);
      }
    },

    updateQuantity: function(listingId, quantity) {
      var container = document.querySelector('[data-listingid="' + listingId + '"]');
      if (!container) return;

      var qtyEl = container.querySelector('.awe-rt-Quantity');
      if (qtyEl) {
        qtyEl.textContent = quantity;
      }
    },

    updateMinimumBid: function(listingId, minimumBid) {
      var container = document.querySelector('[data-listingid="' + listingId + '"]');
      if (!container) return;

      var minBidEls = container.querySelectorAll('.awe-rt-MinimumBid');
      var self = this;
      minBidEls.forEach(function(el) {
        el.textContent = self.formatCurrency(minimumBid);
        self.pulse(el);
      });
    },

    updateReserveMet: function(listingId, reserveMet) {
      var container = document.querySelector('[data-listingid="' + listingId + '"]');
      if (!container) return;

      // Show/hide reserve met indicators
      container.querySelectorAll('.awe-rt-ShowReserveMet').forEach(function(el) {
        el.classList.toggle('awe-hidden', !reserveMet);
      });
      container.querySelectorAll('.awe-rt-HideReserveMet').forEach(function(el) {
        el.classList.toggle('awe-hidden', reserveMet);
      });
      container.querySelectorAll('.awe-rt-ShowReserveNotMet').forEach(function(el) {
        el.classList.toggle('awe-hidden', reserveMet);
      });
      container.querySelectorAll('.awe-rt-HideReserveNotMet').forEach(function(el) {
        el.classList.toggle('awe-hidden', !reserveMet);
      });
    },

    updateBuyNowPrice: function(listingId, price) {
      var container = document.querySelector('[data-listingid="' + listingId + '"]');
      if (!container) return;

      var priceEl = container.querySelector('.awe-rt-BuyNowPrice');
      if (priceEl) {
        priceEl.textContent = this.formatCurrency(price);
        this.pulse(priceEl);
      }
    },

    updateStatus: function(listingId, newStatus) {
      var container = document.querySelector('[data-listingid="' + listingId + '"]');
      if (!container) return;

      // Hide all status elements
      var statusClasses = [
        'Active', 'Preview', 'Scheduled', 'Closing', 'Archived',
        'Successful', 'Unsuccessful', 'Draft', 'Pending',
        'AwaitingPayment', 'FailedValidation', 'Validated', 'Paused'
      ];

      var self = this;
      statusClasses.forEach(function(status) {
        var showEl = container.querySelector('.awe-rt-ShowStatus' + status);
        var hideEl = container.querySelector('.awe-rt-HideStatus' + status);
        if (showEl) showEl.classList.add('awe-hidden');
        if (hideEl) hideEl.classList.remove('awe-hidden');
      });

      // Show new status
      var showNew = container.querySelector('.awe-rt-ShowStatus' + newStatus);
      var hideNew = container.querySelector('.awe-rt-HideStatus' + newStatus);
      if (showNew) showNew.classList.remove('awe-hidden');
      if (hideNew) hideNew.classList.add('awe-hidden');

      // Handle ShowOnEnd/HideOnEnd for ended statuses
      if (newStatus === 'Successful' || newStatus === 'Unsuccessful') {
        container.querySelectorAll('.awe-rt-ShowOnEnd').forEach(function(el) {
          el.classList.remove('awe-hidden');
        });
        container.querySelectorAll('.awe-rt-HideOnEnd').forEach(function(el) {
          el.classList.add('awe-hidden');
        });
      }

      // Update status element text
      var statusEl = container.querySelector('.awe-rt-Status');
      if (statusEl) statusEl.textContent = newStatus;

      var coloredStatus = container.querySelector('.awe-rt-ColoredStatus');
      if (coloredStatus) {
        coloredStatus.textContent = newStatus;
        coloredStatus.className = 'awe-rt-ColoredStatus label label-' + this.getStatusLabelClass(newStatus);
      }

      // Update data attribute
      container.setAttribute('data-listingstatus', newStatus);
    },

    getStatusLabelClass: function(status) {
      var map = {
        'Active': 'success',
        'Preview': 'info',
        'Scheduled': 'info',
        'Closing': 'warning',
        'Successful': 'success',
        'Unsuccessful': 'default',
        'Draft': 'default',
        'Pending': 'warning',
        'Paused': 'warning'
      };
      return map[status] || 'default';
    },

    // ========================================
    // Event Updates (Events Edition)
    // ========================================
    updateEventPhase: function(eventId, phase) {
      // phase: 'Preview' | 'BiddingStarted' | 'ClosingStarted' | 'BiddingEnded'
      var container = document.querySelector('[data-eventid="' + eventId + '"]');
      if (!container) {
        // Try global if no specific container
        container = document.body;
      }

      var phases = ['BiddingStarted', 'ClosingStarted', 'BiddingEnded'];

      // Reset all phases
      phases.forEach(function(p) {
        container.querySelectorAll('.awe-rt-ShowOn' + p).forEach(function(el) {
          el.classList.add('awe-hidden');
        });
        container.querySelectorAll('.awe-rt-HideOn' + p).forEach(function(el) {
          el.classList.remove('awe-hidden');
        });
      });

      // Show elements for current phase and all previous phases
      if (phase !== 'Preview') {
        var phaseIndex = phases.indexOf(phase);
        for (var i = 0; i <= phaseIndex; i++) {
          var p = phases[i];
          container.querySelectorAll('.awe-rt-ShowOn' + p).forEach(function(el) {
            el.classList.remove('awe-hidden');
          });
          container.querySelectorAll('.awe-rt-HideOn' + p).forEach(function(el) {
            el.classList.add('awe-hidden');
          });
        }
      }

      // Update event time label
      var labelEl = container.querySelector('.awe-rt-eventtimelabel');
      if (labelEl) {
        var labelMap = {
          'Preview': 'Starts In:',
          'BiddingStarted': 'Bidding Ends In:',
          'ClosingStarted': 'Lot Closes In:',
          'BiddingEnded': 'Auction Ended'
        };
        labelEl.textContent = labelMap[phase] || '';
      }

      // Update bid status label
      var bidStatusEl = container.querySelector('.awe-rt-eventbidstatuslabel');
      if (bidStatusEl) {
        var statusMap = {
          'Preview': 'PREVIEW',
          'BiddingStarted': 'LIVE',
          'ClosingStarted': 'CLOSING',
          'BiddingEnded': 'ENDED'
        };
        bidStatusEl.textContent = statusMap[phase] || '';
        bidStatusEl.className = 'awe-rt-eventbidstatuslabel label label-' + this.getEventLabelClass(phase);
      }
    },

    getEventLabelClass: function(phase) {
      var map = {
        'Preview': 'info',
        'BiddingStarted': 'danger',
        'ClosingStarted': 'warning',
        'BiddingEnded': 'default'
      };
      return map[phase] || 'default';
    },

    updateEventTimeLabel: function(eventId, label) {
      var container = document.querySelector('[data-eventid="' + eventId + '"]') || document.body;
      var el = container.querySelector('.awe-rt-eventtimelabel');
      if (el) el.textContent = label;
    },

    // ========================================
    // Countdowns
    // ========================================
    startCountdowns: function() {
      var self = this;

      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }

      this.countdownInterval = setInterval(function() {
        // Listing countdowns
        document.querySelectorAll('.awe-rt-endingDTTM[data-ending]').forEach(function(el) {
          var ending = new Date(el.getAttribute('data-ending'));
          var remaining = ending - new Date();
          el.textContent = self.formatTimeRemaining(remaining);

          // Add urgent styling if under 1 hour
          if (remaining > 0 && remaining < 3600000) {
            el.classList.add('text-danger');
          }
        });

        // Starting countdowns
        document.querySelectorAll('.awe-rt-startingDTTM[data-starting]').forEach(function(el) {
          var starting = new Date(el.getAttribute('data-starting'));
          var remaining = starting - new Date();
          el.textContent = self.formatTimeRemaining(remaining);
        });

        // Event countdowns
        document.querySelectorAll('.awe-rt-eventtimecountdown[data-ending]').forEach(function(el) {
          var ending = new Date(el.getAttribute('data-ending'));
          var remaining = ending - new Date();
          el.textContent = self.formatTimeRemaining(remaining);
        });

        // Update server time display
        var timeEl = document.getElementById('Time');
        if (timeEl) {
          timeEl.textContent = new Date().toLocaleString();
        }
      }, 1000);
    },

    stopCountdowns: function() {
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
        this.countdownInterval = null;
      }
    },

    // ========================================
    // Initial Status Display
    // ========================================
    initializeStatusDisplay: function() {
      var self = this;

      // Initialize status display for all listings based on data attributes
      document.querySelectorAll('[data-listingid][data-listingstatus]').forEach(function(container) {
        var status = container.getAttribute('data-listingstatus');
        if (status) {
          var showEl = container.querySelector('.awe-rt-ShowStatus' + status);
          if (showEl) showEl.classList.remove('awe-hidden');

          // Handle ShowOnStart/HideOnStart for active listings
          if (status === 'Active' || status === 'Closing') {
            self.handleListingStart(container);
          }
        }
      });
    },

    handleListingStart: function(container) {
      // Show elements that should appear when listing starts
      container.querySelectorAll('.awe-rt-ShowOnStart').forEach(function(el) {
        el.classList.remove('awe-hidden');
      });
      container.querySelectorAll('.awe-rt-HideOnStart').forEach(function(el) {
        el.classList.add('awe-hidden');
      });
    },

    handleListingEnd: function(container) {
      // Show elements that should appear when listing ends
      container.querySelectorAll('.awe-rt-ShowOnEnd').forEach(function(el) {
        el.classList.remove('awe-hidden');
      });
      container.querySelectorAll('.awe-rt-HideOnEnd').forEach(function(el) {
        el.classList.add('awe-hidden');
      });
    },

    // ========================================
    // System Messages
    // ========================================
    showSystemMessage: function(message, type) {
      type = type || 'info';
      var existing = document.querySelector('.awe-rt-SystemMessage');
      if (existing) existing.remove();

      var el = document.createElement('div');
      el.className = 'awe-rt-SystemMessage alert alert-' + type;
      el.textContent = message;

      var container = document.querySelector('.container') || document.body;
      container.insertBefore(el, container.firstChild);

      setTimeout(function() {
        el.remove();
      }, 5000);
    },

    showListingActionMessage: function(listingId, message) {
      var container = document.querySelector('[data-listingid="' + listingId + '"]');
      if (!container) return;

      var el = document.createElement('div');
      el.className = 'awe-rt-ListingActionMessage';
      el.textContent = message;
      container.insertBefore(el, container.firstChild);

      setTimeout(function() {
        el.remove();
      }, 3000);
    },

    showListingClosedMessage: function(listingId, message) {
      var container = document.querySelector('[data-listingid="' + listingId + '"]');
      if (!container) return;

      var el = document.createElement('div');
      el.className = 'awe-rt-ListingClosedMessage';
      el.textContent = message || 'This listing has ended';
      container.insertBefore(el, container.firstChild);
    },

    showRefreshAlert: function(message) {
      var existing = document.querySelector('.awe-rt-RefreshAlert');
      if (existing) existing.remove();

      var el = document.createElement('div');
      el.className = 'awe-rt-RefreshAlert awe-refresh-alert';
      el.innerHTML = message + ' <a href="#" onclick="location.reload(); return false;">Refresh Now</a>';
      document.body.insertBefore(el, document.body.firstChild);
    },

    // ========================================
    // Helpers
    // ========================================
    formatCurrency: function(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    },

    formatTimeRemaining: function(ms) {
      if (ms <= 0) return 'Ended';

      var d = Math.floor(ms / 86400000);
      var h = Math.floor((ms % 86400000) / 3600000);
      var m = Math.floor((ms % 3600000) / 60000);
      var s = Math.floor((ms % 60000) / 1000);

      if (d > 0) return d + 'd ' + h + 'h ' + m + 'm';
      if (h > 0) return h + 'h ' + m + 'm ' + s + 's';
      if (m > 0) return m + 'm ' + s + 's';
      return s + 's';
    },

    pulse: function(el) {
      if (!el) return;
      el.classList.remove('signalr-pulse');
      // Force reflow
      void el.offsetWidth;
      el.classList.add('signalr-pulse');
    },

    // ========================================
    // Simulate Events (for testing)
    // ========================================
    simulateBid: function(listingId, newPrice, bidCount) {
      this.updatePrice(listingId, newPrice);
      this.updateBidCount(listingId, bidCount);
      this.showListingActionMessage(listingId, 'New bid: ' + this.formatCurrency(newPrice));
    },

    simulateAuctionEnd: function(listingId, successful) {
      var status = successful ? 'Successful' : 'Unsuccessful';
      this.updateStatus(listingId, status);
      this.showListingClosedMessage(listingId, successful ? 'Sold!' : 'No sale - reserve not met');
    },

    simulateEventPhaseChange: function(eventId, phase) {
      this.updateEventPhase(eventId, phase);
      var messages = {
        'BiddingStarted': 'Bidding has begun!',
        'ClosingStarted': 'Lots are now closing!',
        'BiddingEnded': 'Auction has ended'
      };
      if (messages[phase]) {
        this.showSystemMessage(messages[phase], phase === 'BiddingEnded' ? 'warning' : 'success');
      }
    }
  };

  // Initialize and expose globally
  window.MockSignalR = MockSignalR;

  // Auto-init when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      window.mockSignalR = new MockSignalR();
    });
  } else {
    window.mockSignalR = new MockSignalR();
  }

})();
