import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import loginImg from "../assets/form1.jpg";
import { AuthContext } from "./AuthContext";

const Auth = () => {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data: users } = await axios.get("http://localhost:3001/users");
      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        toast.error("Email already registered!", { theme: "dark" });
        return;
      }
      const newUser = { id: Date.now(), name, email, password };
      await axios.post("http://localhost:3001/users", newUser);
      toast.success("Registered successfully!", { theme: "dark" });
      setIsLogin(true);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while registering", { theme: "dark" });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data: users } = await axios.get("http://localhost:3001/users");
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) {
        toast.error("Invalid email or password", { theme: "dark" });
        return;
      }
      const { data: currentSession } = await axios.get(
        "http://localhost:3001/session"
      );
      if (currentSession.length > 0) {
        await axios.delete(
          `http://localhost:3001/session/${currentSession[0].id}`
        );
      }
      await axios.post("http://localhost:3001/session", user);
      login(user);
      toast.success(`Welcome, ${user.name}!`, { theme: "dark" });
      navigate("/");
    } catch (error) {
      toast.error("Error during login", { theme: "dark" });
      console.error(error);
    }
  };

  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center"
      style={{
        background: "linear-gradient(180deg, #000, #111 100%)",
        color: "#40E0D0",
      }}
    >
      <div className="row w-100">
        <div className="col-lg-6 d-flex justify-content-center align-items-center">
          <div
            style={{
              maxWidth: "400px",
              width: "100%",
              padding: "2rem",
              background: "rgba(0,0,0,0.85)",
              borderRadius: "15px",
              boxShadow: "0 0 20px rgba(64,224,208,0.5)",
            }}
          >
            <h2
              className="text-center mb-4 fw-bold"
              style={{ textShadow: "0 0 10px rgba(64,224,208,0.8)" }}
            >
              {isLogin ? "Sign In" : "Register"}
            </h2>
            <form onSubmit={isLogin ? handleLogin : handleRegister}>
              {!isLogin && (
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-0"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{
                      boxShadow: "0 0 5px rgba(64,224,208,0.5)",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control bg-dark text-white border-0"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    boxShadow: "0 0 5px rgba(64,224,208,0.5)",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control bg-dark text-white border-0"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    boxShadow: "0 0 5px rgba(64,224,208,0.5)",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn w-100 fw-semibold"
                style={{
                  backgroundColor: "#40E0D0",
                  color: "#000",
                  boxShadow: "0 0 10px rgba(64,224,208,0.7)",
                }}
              >
                {isLogin ? "Sign In" : "Register"}
              </button>
            </form>
            <p className="mt-3 text-center">
              {isLogin ? (
                <>
                  Don’t have an account?{" "}
                  <button
                    className="btn btn-link p-0 text-info"
                    onClick={() => setIsLogin(false)}
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    className="btn btn-link p-0 text-info"
                    onClick={() => setIsLogin(true)}
                  >
                    Sign In
                  </button>
                </>
              )}
            </p>
          </div>
        </div>

        <div
          className="col-lg-6 d-none d-lg-block position-relative"
          style={{ height: "100%" }}
        >
          <img
            src={loginImg}
            alt="Login Illustration"
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              opacity: 0.85,
              borderRadius: "0 15px 15px 0",
            }}
          />

          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center"
            style={{
              color: "white",
              textAlign: "center",
              padding: "2rem",
              background: "rgba(0,0,0,0.35)",
              borderRadius: "0 15px 15px 0",
            }}
          >
            <h2 style={{ textShadow: "0 0 10px rgba(0,0,0,0.7)" }}>
              Welcome back!
            </h2>
            <p>
              We are thrilled to see you again. Login to explore your dream cars
              with <span style={{ color: "#40E0D0" }}>CarEase</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
