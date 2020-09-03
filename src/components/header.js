import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./blog.css";
import "./fonts.css";
import logo from "../images/logo_postKeeper.png";

class Header extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <header className="blog-header py-3">
          <div className="row flex-nowrap justify-content-between align-items-center">
            <div className="col-4 pt-1"></div>
            <div className="col-4 text-center">
              <span className="blog-header-logo text-dark">
                <img src={logo} alt="logo" />
              </span>
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center"></div>
          </div>
        </header>

        <div className="py-1 mb-2">
          <div className="nav-bar row">
            <div className="col-sm-2">
              <nav className="nav justify-content-between">
                <NavLink
                  activeClassName="navbar__link--active"
                  className="navbar__link"
                  to="/newpost"
                >
                  Create
                </NavLink>
                <NavLink
                  activeClassName="navbar__link--active"
                  className="navbar__link"
                  to="/posts"
                >
                  View Posts
                </NavLink>
              </nav>
            </div>
            <div className="col-sm-10"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
