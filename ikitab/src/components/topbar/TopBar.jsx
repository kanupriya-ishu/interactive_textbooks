import "./topbar.css"
import logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className='top'>
        <div className="topLeft">
            <img className="topImg" src={logo} alt="logo" />
        </div>
        <div className="topCenter">
            <ul className="topList">
                <li className="topListItem">
                    <Link className="link" to="/">
                        HOME
                    </Link>
                </li>
                <li className="topListItem">
                    <Link className="link" to="/write">
                        CREATE
                    </Link>
                </li>
                <li className="topListItem">
                    <Link className="link" to="/userTextbooks">
                        USER TEXTBOOKS
                    </Link>
                </li>
                <li className="topListItem" onClick={handleLogout}>
                    {user && "LOGOUT"}
                </li>
            </ul>
        </div>
        <div className="topRight">
            <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
            
            {user ? (
                <Link to="/settings">
                    <img className="topImg" src={PF+user.profilePic} alt="" />
                </Link>
                ) : (
                <ul className="topList">
                    <li className="topListItem">
                    <Link className="link" to="/login">
                        LOGIN
                    </Link>
                    </li>
                    <li className="topListItem">
                    <Link className="link" to="/register">
                        REGISTER
                    </Link>
                    </li>
                </ul>
        )}
        </div>
    </div>
  )
}
