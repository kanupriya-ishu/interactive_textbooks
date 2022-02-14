import "./topbar.css"
import logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom";

export default function TopBar() {
  const user = true;
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
                <li className="topListItem">USER TEXTBOOK</li>
                {user && <li className="topListItem">LOGOUT</li>}
            </ul>
        </div>
        <div className="topRight">
            <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
            
            {user ? (
                <Link className="link" to="/settings">
                    <i className="topIcon fa-solid fa-user"></i>
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
