import React from "react";
import { Link } from "react-router-dom";

type NavLinkPropsType = {
  Icon: any;
  currPage: string;
  setCurrPage: (e: string) => void;
  pathname: string;
};

function NavLink({ Icon, currPage, setCurrPage, pathname }: NavLinkPropsType) {
  return (
    <Link className="nav-link" to={pathname}>
      <Icon
        className={currPage === pathname ? "active-icon" : "icon"}
        onClick={() => {
          setCurrPage(pathname);
        }}
      />
    </Link>
  );
}

export default NavLink;
