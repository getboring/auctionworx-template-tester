interface PreviewFooterProps {
  siteFooter?: string;
  showHelp?: boolean;
  showDescription?: boolean;
}

export default function PreviewFooter({
  siteFooter,
  showHelp = true,
  showDescription = true
}: PreviewFooterProps) {
  return (
    <footer style={{ background: '#222', color: '#999', padding: '40px 0', marginTop: '40px' }}>
      {siteFooter ? (
        <div dangerouslySetInnerHTML={{ __html: siteFooter }} />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p>&copy; {new Date().getFullYear()} AuctionWorx Template Preview</p>
              {showDescription && (
                <p className="small">This is a template testing environment. <a href="/admin" style={{ color: '#5bc0de' }}>Open Admin Panel</a></p>
              )}
              {!showDescription && (
                <p className="small"><a href="/admin" style={{ color: '#5bc0de' }}>Open Admin Panel</a></p>
              )}
            </div>
            <div className="col-md-6 text-right">
              <ul className="list-inline">
                <li><a href="/Home/Information/Terms" style={{ color: '#999' }}>Terms</a></li>
                <li><a href="/Home/Information/PrivacyPolicy" style={{ color: '#999' }}>Privacy</a></li>
                {showHelp && (
                  <li><a href="/Home/Information/Help" style={{ color: '#999' }}>Help</a></li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
