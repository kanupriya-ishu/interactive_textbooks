import "./register.css"
import { Link } from "react-router-dom"
import axios from "axios";
import { useState } from "react";
import Footer from '../../components/footer/Footer'

export default function Register() {
    const [userType, setUserType] = useState("0");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(false);
      try {
        const res = await axios.post("/auth/register", {
          userType,
          username,
          email,
          password,
        });
        res.data && window.location.replace("/login");
      } catch (err) {
        setError(true);
      }
    };

    return (
      <>
        <div className="register">
      
      <form className="registerForm" onSubmit={handleSubmit}>
      <span className="registerTitle">Register</span>
        <label>Type</label>
        <select className="registerInput" name="userType" onChange={(e) => setUserType(e.target.options.selectedIndex)}>
          <option value="creator">Creator</option>
          <option value="viewer">Viewer</option>
        </select>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton btn btn-warning" type="submit" >Register</button>
        <p className="yellow">OR</p>
        <Link className="link" to="/login">
        <button className="loginbtn btn btn-warning">
            Login
        </button>
        </Link>
        {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
      </form>
    </div>
    <Footer />
    </>
    )
}