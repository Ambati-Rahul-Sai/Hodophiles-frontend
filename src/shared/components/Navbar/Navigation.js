import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Navigation.css";
import Header from "./Header";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

function Navigation(props) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const openDrawer = () => {
    setDrawerIsOpen(true);
  };
  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };
  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawer} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
        <nav className="navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <Header>
        <button className="navigation__menu-btn" onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="navigation__title">
          <Link to="/">Hodophiles</Link>
        </h1>
        <nav className="navigation__header-nav">
          <NavLinks />
        </nav>
      </Header>
    </React.Fragment>
  );
}

export default Navigation;
