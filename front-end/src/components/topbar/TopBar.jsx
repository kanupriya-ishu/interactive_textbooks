import "./topbar.css"
import logo from "../../assets/images/logo.png"

export default function TopBar() {
  return (
    <div className='top'>
        <div className="topLeft">
            <img className="topImg" src={logo} alt="logo" />
        </div>
        <div className="topCenter">
            <ul className="topList">
                <li className="topListItem">HOME</li>
                <li className="topListItem">CREATE</li>
                <li className="topListItem">USER TEXTBOOK</li>
                <li className="topListItem">LOGOUT</li>
            </ul>
        </div>
        <div className="topRight">
            <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
            <i className="topIcon fa-solid fa-user"></i>
        </div>
    </div>
  )
}
