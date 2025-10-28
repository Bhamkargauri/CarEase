import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className="navbar navbar-expand-lg bg-black sticky-top py-3"
      style={{
        background: "rgba(0, 0, 0, 0.9)",
      }}
    >
      <div className="container">
        <Link
          className="navbar-brand fs-3 fw-bold"
          to="/"
          style={{
            color: "#40E0D0",
            letterSpacing: "4px",
            textShadow: "0 0 8px rgba(64, 224, 208, 0.8)",
          }}
        >
          CarEase
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center gap-3">
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-white fw-semibold"
                to="/mybookings"
              >
                My Bookings
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item d-flex align-items-center text-white fw-semibold">
                  <i
                    className="bi bi-person-circle me-2 fs-5"
                    style={{ color: "#40E0D0" }}
                  ></i>
                  Hello,
                  <span
                    className="ms-1"
                    style={{ color: "#40E0D0", fontWeight: "600" }}
                  >
                    {user.name}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-sm px-3 rounded-pill text-black fw-semibold"
                    style={{
                      backgroundColor: "#40E0D0",
                      border: "none",
                      boxShadow: "0 0 10px rgba(64, 224, 208, 0.6)",
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-sm px-3 rounded-pill text-black fw-semibold"
                  style={{
                    backgroundColor: "#40E0D0",
                    border: "none",
                    boxShadow: "0 0 10px rgba(64, 224, 208, 0.6)",
                  }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
