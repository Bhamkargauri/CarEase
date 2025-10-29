import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "./AuthContext";

const Home = () => {
  const [cars, setCars] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get("http://localhost:3001/cars");
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  return (
    <div className="bg-black min-vh-100">
      <div className="container py-5">
        {user && (
          <div className="text-center mb-5">
            <h2
              className="fw-bold"
              style={{
                color: "#40E0D0",
                textShadow: "0 0 10px rgba(64, 224, 208, 0.8)",
              }}
            >
              Welcome, {user.name}
            </h2>
            <p className="text-light fs-5">
              Find and book your dream car with{" "}
              <span style={{ color: "#40E0D0" }}>CarEase</span>.
            </p>
          </div>
        )}

        <div className="row">
          {cars.map((car) => (
            <div className="col-md-4 mb-4" key={car.id}>
              <div
                className="card border-0 h-100 text-white"
                style={{
                  background: "rgba(0,0,0,0.85)",
                  boxShadow: !car.availability
                    ? "0 0 30px rgba(255,0,0,0.5)"
                    : "0 0 30px rgba(64,224,208,0.5)",
                  borderRadius: "15px",
                }}
              >
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <img
                    src={car.image}
                    className="card-img-top"
                    alt={car.model}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                      opacity: !car.availability ? 0.6 : 1,
                    }}
                  />
                </div>

                <div className="card-body">
                  <h5
                    className="card-title fw-bold"
                    style={{ color: "#40E0D0" }}
                  >
                    {car.make} {car.model}
                  </h5>
                  <p className="mb-1 text-white">₹{car.pricePerDay}/day</p>

                  <p className="mb-2">
                    {!car.availability ? (
                      <span className="badge bg-danger px-3 py-2">Booked</span>
                    ) : (
                      <span className="badge bg-success px-3 py-2">
                        Available
                      </span>
                    )}
                  </p>

                  <Link
                    to={`/car/${car.id}`}
                    className={`btn btn-sm w-100 mt-2 fw-semibold ${
                      !car.availability
                        ? "btn-secondary disabled"
                        : "btn-outline-info"
                    }`}
                    style={{
                      opacity: !car.availability ? 0.6 : 1,
                    }}
                  >
                    {!car.availability ? "Already Booked" : "View Details"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
