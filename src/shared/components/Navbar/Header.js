import React from "react";

import "./Header.css";

function Header(props) {
  return <header className="main-header">{props.children}</header>;
}

export default Header;
