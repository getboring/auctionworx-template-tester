'use client';

import { useEffect, useState } from 'react';
import { getCMSState, CMSState } from '@/lib/store';
import { getMockEvents, MockEvent, getEventTimeLabel } from '@/lib/mock/events';
import { formatTimeRemaining } from '@/lib/format';
import Script from 'next/script';
import PreviewFooter from '@/components/preview/PreviewFooter';

export default function EventsPage() {
  const [cms, setCms] = useState<CMSState | null>(null);
  const [events, setEvents] = useState<MockEvent[]>([]);
  const [mounted, setMounted] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    setCms(getCMSState());
    setEvents(getMockEvents());
    setMounted(true);
  }, []);

  if (!mounted || !cms) {
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

  const filteredEvents = events.filter(event => {
    if (filterStatus === 'active') return event.status === 'Active' || event.status === 'Closing';
    if (filterStatus === 'preview') return event.status === 'Preview';
    if (filterStatus === 'closed') return event.status === 'Closed';
    return true;
  });

  const getPhaseClass = (phase: string) => {
    const map: Record<string, string> = {
      'Preview': 'label-info',
      'BiddingStarted': 'label-success',
      'ClosingStarted': 'label-warning',
      'BiddingEnded': 'label-default',
    };
    return map[phase] || 'label-default';
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Events - AuctionWorx</title>
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
          <div className="row">
            <div className="col-xs-12">
              <h1>Auction Events</h1>
              <hr />
            </div>
          </div>

          {/* Filters */}
          <div className="row" style={{ marginBottom: '20px' }}>
            <div className="col-md-6">
              <div className="btn-group">
                <button
                  className={`btn btn-sm ${filterStatus === 'all' ? 'btn-primary' : 'btn-default'}`}
                  onClick={() => setFilterStatus('all')}
                >
                  All
                </button>
                <button
                  className={`btn btn-sm ${filterStatus === 'active' ? 'btn-primary' : 'btn-default'}`}
                  onClick={() => setFilterStatus('active')}
                >
                  Live
                </button>
                <button
                  className={`btn btn-sm ${filterStatus === 'preview' ? 'btn-primary' : 'btn-default'}`}
                  onClick={() => setFilterStatus('preview')}
                >
                  Upcoming
                </button>
                <button
                  className={`btn btn-sm ${filterStatus === 'closed' ? 'btn-primary' : 'btn-default'}`}
                  onClick={() => setFilterStatus('closed')}
                >
                  Past
                </button>
              </div>
            </div>
            <div className="col-md-6 text-right">
              <span className="text-muted">{filteredEvents.length} events</span>
            </div>
          </div>

          {/* Events List */}
          {filteredEvents.map((event) => (
            <div key={event.id} className="panel panel-default" data-eventid={event.id} style={{ marginBottom: '20px' }}>
              <div className="panel-heading">
                <div className="row">
                  <div className="col-md-8">
                    <span className={`awe-rt-eventbidstatuslabel label ${getPhaseClass(event.phase)}`} style={{ marginRight: '10px' }}>
                      {event.phase === 'Preview' ? 'PREVIEW' : event.phase === 'BiddingStarted' ? 'LIVE' : event.phase === 'ClosingStarted' ? 'CLOSING' : 'ENDED'}
                    </span>
                    <h4 style={{ display: 'inline', marginTop: 0 }}>
                      <a href={`/Event/Details/${event.id}`} style={{ color: '#333' }}>{event.title}</a>
                    </h4>
                  </div>
                  <div className="col-md-4 text-right">
                    {event.phase !== 'BiddingEnded' && (
                      <>
                        <span className="awe-rt-eventtimelabel text-muted" style={{ marginRight: '5px' }}>
                          {getEventTimeLabel(event.phase)}
                        </span>
                        <span
                          className="awe-rt-eventtimecountdown"
                          data-ending={event.firstCloseTime.toISOString()}
                          style={{ fontWeight: 'bold' }}
                        >
                          {formatTimeRemaining(event.firstCloseTime)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-8">
                    <p>{event.description}</p>
                  </div>
                  <div className="col-md-4">
                    <ul className="list-unstyled small">
                      <li><strong>Lots:</strong> {event.lotCount}</li>
                      <li><strong>Location:</strong> {event.location}</li>
                      <li><strong>Buyer&apos;s Premium:</strong> {event.buyersPremium}%</li>
                      <li><strong>Start:</strong> {event.startTime.toLocaleDateString()}</li>
                    </ul>
                    <a href={`/Event/Details/${event.id}`} className="btn btn-primary btn-sm">
                      {event.phase === 'BiddingEnded' ? 'View Results' : 'View Lots'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="alert alert-info text-center">
              No events match your filter.
            </div>
          )}
        </div>

        <PreviewFooter siteFooter={cms.siteFooter} showDescription={false} />

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
