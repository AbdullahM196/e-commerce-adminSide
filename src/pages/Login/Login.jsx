import { useNavigate } from "react-router-dom";
import "./Login.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Spinner } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useLoginMutation } from "../../store/API/apiSlices/user";
import { useState } from "react";
export default function Login() {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async () => {
    try {
      await login({ email, password }).unwrap();
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: error.data,
      });
      console.log(error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div className="login-container">
        <div className="login-header">
          <div>Login</div>
        </div>
        <input
          type="email"
          className="login-input"
          placeholder="email"
          id="email"
          required
          value={email}
          onChange={(evt) => {
            setEmail(evt.target.value);
          }}
        />
        <span className="d-flex align-items-center">
          <input
            type={showPassword ? "text" : "password"}
            className="login-input"
            placeholder="Enter a secure password: 8+ characters, uppercase, lowercase, digit, special character."
            id="password"
            required
            value={password}
            onChange={(evt) => {
              setPassword(evt.target.value);
            }}
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </span>
        {isLoading ? (
          <Spinner />
        ) : (
          <button
            className="login-button"
            id="login-button"
            onClick={handleLogin}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
