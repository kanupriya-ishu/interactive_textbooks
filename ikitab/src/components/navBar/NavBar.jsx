import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../../assets/images/logo.png"
import { useContext } from "react";
import { Context } from "../../context/Context";
import "./navBar.css"

export default function NavBar() {
    const [click, setClick] = React.useState(false);
  
    const handleClick = () => setClick(!click);
    const Close = () => setClick(false);

    const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:5000/images/"

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
      };
    
    return (
      <div className='sticky'>
       <div className={click ? "main-container" : ""}  onClick={()=>Close()} />
        <nav className="navbar" onClick={e => e.stopPropagation()}>
          <div className="nav-container">
            <NavLink exact to="/" className="nav-logo">
                <img className="topImg" src={logo} alt="logo" /> i-Kitab
            </NavLink>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/"
                  activeClassName="active"
                  className="nav-links"
                  onClick={click ? handleClick : null}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/userTextbooks"
                  activeClassName="active"
                  className="nav-links"
                  onClick={click ? handleClick : null}
                >
                  Textbooks
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact to = "/login"
                  className="nav-links"
                  onClick={handleLogout}
                >
                  {user && "Logout"}
                </NavLink>
              </li>
                
                {
                    user?
                    (
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/settings"
                                activeClassName="active"
                                className="nav-links"
                                onClick={click ? handleClick : null}
                            >
                                <img className="topImg" src={PF+user.profilePic} alt="" />
                            </NavLink>
                        </li>
                    ):
                    (
                        <>
                            <li className="nav-item">
                                <NavLink
                                    exact
                                    to="/login"
                                    activeClassName="active"
                                    className="nav-links"
                                    onClick={click ? handleClick : null}
                                >
                                    Login
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    exact
                                    to="/register"
                                    activeClassName="active"
                                    className="nav-links"
                                    onClick={click ? handleClick : null}
                                    >
                                    Register
                                </NavLink>
                            </li>
                            
                        </>
                    )
                }
            </ul>
            <div className="nav-icon" onClick={handleClick}>
              <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
            </div>
          </div>
        </nav>
      </ div>
    );
  }
