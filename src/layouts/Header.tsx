import { FaMessage, FaUser, FaUserGroup } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Header() {
  const location = useLocation();

  const [currPage, setCurrPage] = useState<string>(location.pathname);
  return (
    <header className="header">
      <div className="header_logo">
        <p>GhostTown</p>
      </div>

      <nav className="header-nav">
        <Link className="nav-link" to="/feed">
          <FaHome
            className={currPage === "/feed" ? "active-icon" : "icon"}
            onClick={() => {
              setCurrPage("/feed");
            }}
          />
        </Link>

        <Link className="nav-link" to="/chats">
          <FaMessage
            className={currPage === "/chats" ? "active-icon" : "icon"}
            onClick={() => {
              setCurrPage("/chats");
            }}
          />
        </Link>

        <Link className="nav-link" to="/groups">
          <FaUserGroup
            className={currPage === "/groups" ? "active-icon" : "icon"}
            onClick={() => {
              setCurrPage("/groups");
            }}
          />
        </Link>

        <Link className="nav-link" to="/me">
          <FaUser
            className={currPage === "/me" ? "active-icon" : "icon"}
            onClick={() => {
              setCurrPage("/me");
            }}
          />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
