import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import Footer from '../../components/footer/Footer'
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  
  return (
    <>
    <div className="login">
      <form className="loginForm" onSubmit={handleSubmit}>
        <span className="loginTitle">Login</span>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton btn btn-warning" type="submit" disabled={isFetching}>
          Login
        </button>
        <p className="yellow">OR</p>
        <Link className="link" to="/register">
        <button className="registerbtn btn btn-warning">
            Register
        </button>
        </Link>
      </form>
    </div>
    <Footer />
    </>
  );
}