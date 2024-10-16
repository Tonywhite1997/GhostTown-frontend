import { FaMessage, FaUser, FaUserGroup } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const location = useLocation();

  const [currPage, setCurrPage] = useState<string>(location.pathname);

  const page = location.pathname;

  const regex = /^\/[^/]+/;

  const match = page.match(regex);

  useEffect(() => {
    if (match) {
      setCurrPage(match[0]);
    }
  }, [page]);

  return (
    <header className="header">
      <div className="header_logo">
        <p>GhostTown</p>
      </div>

      <nav className="header-nav">
        <Link className="nav-link" to="/feed">
          <FaHome className={currPage === "/feed" ? "active-icon" : "icon"} />
        </Link>

        <Link className="nav-link" to="/chats">
          <FaMessage
            className={currPage === "/chats" ? "active-icon" : "icon"}
          />
        </Link>

        <Link className="nav-link" to="/groups">
          <FaUserGroup
            className={currPage === "/groups" ? "active-icon" : "icon"}
          />
        </Link>

        <Link className="nav-link" to="/me">
          <FaUser className={currPage === "/me" ? "active-icon" : "icon"} />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
