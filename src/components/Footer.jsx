import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>StayComfo</h2>
          <p>Find your perfect stay.</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="/hotels">Hotels</a>
          <a href="/hotels/add">Add Hotel</a>
        </div>

        <div className="footer-info">
          <h3>About StayComfo</h3>
          <p>
            Discover comfortable stays and
            explore hotels at your convenience.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 StayComfo. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
