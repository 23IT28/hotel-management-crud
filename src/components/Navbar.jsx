import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar">
            <Link to="/hotels" className="navbar-logo">
                StayComfo
            </Link>

            <div className="navbar-links">
                <Link
                    to="/hotels"
                    className={location.pathname === "/hotels" ? "active" : ""}
                >
                    Hotels
                </Link>

                <Link to="/hotels/add" className="add-hotel-btn">
                    + Add Hotel
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;