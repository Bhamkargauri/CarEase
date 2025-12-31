import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
import CarDetailsExtras from "./CarDetailsExtras";

function CarDetails() {
  const { user } = useContext(AuthContext);
  const [car, setCar] = useState(null);
  const [userName, setUserName] = useState("");
  const [checkIn, setCheckIn] = useState(
    new Date().toISOString().split("T")[0]
  ); // format yyyy-mm-dd
  const [checkOut, setCheckOut] = useState("");
  const [totalDays, setTotalDays] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageClick = (index) => {
    setActiveIndex(index);
    setShowModal(true);
  };

  const { id } = useParams();
  // console.log("carID =", id);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/cars/${id}`);
        // console.log("response = ", response);
        setCar(response.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };
    fetchCar();
  }, [id]);

  useEffect(() => {
    if (user) {
      setUserName(user.name);
    } else {
      setUserName("");
    }
  }, [user]);

  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalDays(diffDays);
    }
  }, [checkIn, checkOut]);

  if (!car) {
    return (
      <div className="text-center text-white py-5">
        <h3>Loading car details...</h3>
      </div>
    );
  }

  const handleBooking = async () => {
    if (!user) {
      toast.warn("Please login to book a car", { theme: "dark" });
      navigate("/login");
      return;
    }

    if (!userName || !checkIn || !checkOut || totalDays <= 0) {
      toast.warn("Please fill all fields correctly.", { theme: "dark" });
      return;
    }

    if (!car.availability) {
      toast.error("This car is already booked.", { theme: "dark" });
      return;
    }

    const booking = {
      id: Date.now().toString(),
      userId: user.id,
      user: userName,
      carId: car.id,
      carName: `${car.make} ${car.model}`,
      image: car.image,
      startDate: checkIn,
      endDate: checkOut,
      duration: totalDays,
      totalCost: car.pricePerDay * totalDays,
    };

    try {
      const updatedCarData = {
        ...car,
        availability: false,
      };

      await axios.put(`http://localhost:3001/cars/${car.id}`, updatedCarData);

      await axios.post("http://localhost:3001/bookings", booking);

      setCar(updatedCarData);

      toast.success(`Booking confirmed for ${userName}!`, { theme: "dark" });
      navigate("/myBookings");
    } catch (error) {
      console.error("Error during booking:", error);
      toast.error("Failed to complete booking. Try again.", { theme: "dark" });
    }
  };

  const images = [car.leftImage, car.rightImage, car.image, car.carBack];

  return (
    <div className="min-vh-100 py-5 bg-dark">
      <div className="container position-relative">
        <div
          className="card shadow-lg border-0 p-4 mb-5"
          style={{
            background: "rgba(0,0,0,0.8)",
            borderRadius: "15px",
          }}
        >
          <div className="row g-4 align-items-center">
            <div className="col-md-6">
              <div className="row mb-4">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <img
                    src={car.leftImage}
                    alt={`${car.make} ${car.model}`}
                    className="img-fluid equal-image"
                    onClick={() => handleImageClick(0)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div className="col-sm-6">
                  <img
                    src={car.rightImage}
                    alt={`${car.make} ${car.model}`}
                    className="img-fluid equal-image"
                    onClick={() => handleImageClick(1)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <img
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                    className="img-fluid equal-image"
                    onClick={() => handleImageClick(2)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div className="col-sm-6">
                  <img
                    src={car.carBack}
                    alt={`${car.make} ${car.model}`}
                    className="img-fluid equal-image"
                    onClick={() => handleImageClick(3)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <h2
                style={{
                  color: "#40E0D0",
                  textShadow: "0 0 10px rgba(64,224,208,0.8)",
                }}
              >
                {car.make} {car.model}
              </h2>
              <p className="text-white">
                <strong>Year:</strong> {car.year}
              </p>
              <p className="text-white">
                <strong>Transmission:</strong> {car.transmission}
              </p>
              <p className="text-white">
                <strong>Fuel Type:</strong> {car.fuel}
              </p>
              <p className="text-white">
                <strong>Seats:</strong> {car.seats}
              </p>

              {/* Stars */}
              <div className="position-relative d-inline-block fs-5 mb-1">
                <div className="text-secondary">★★★★★</div>
                <div
                  className="position-absolute top-0 start-0 overflow-hidden text-success"
                  style={{ width: `${(car.rating / 5) * 100}%` }}
                >
                  ★★★★
                </div>
              </div>
              {/* Rating badge */}
              <div className="px-2 py-1 rounded text-white fs-6 fw-bold badge bg-success me-4 ms-2">
                {car.rating} | Very Good
              </div>

              {/* <p className="text-white">
                <strong>Rating:</strong> {car.rating}
              </p> */}

              {!car.availability ? (
                <span className="badge bg-danger">Booked</span>
              ) : (
                <span className="badge bg-success">Available</span>
              )}
              <h4 className="text-success mt-4">₹{car.pricePerDay} / day</h4>

              <div className="mt-4 d-flex gap-3">
                <button
                  className="btn btn-outline-info"
                  data-bs-toggle="modal"
                  data-bs-target="#bookingModal"
                  disabled={!car.availability}
                >
                  {!car.availability ? "Unavailable" : "Book Now"}
                </button>

                <Link
                  to="/"
                  className="btn btn-outline-secondary"
                  style={{ color: "#40E0D0", borderColor: "#40E0D0" }}
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* image Modal */}
        {showModal && (
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div
                className="modal-content"
                style={{
                  background: "rgba(40, 200, 200, 0.32)",
                  borderRadius: "20px",
                }}
              >
                <div className="modal-header">
                  <button
                    className="btn-close btn-close-white"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div
                    id="carCarousel"
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      {images.map((img, index) => (
                        <div
                          key={index}
                          className={`carousel-item ${
                            index === activeIndex ? "active" : ""
                          }`}
                        >
                          <img
                            src={img}
                            className="d-block mx-auto"
                            style={{
                              height: "400px",
                              width: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carCarousel"
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon" />
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carCarousel"
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Modal */}
        <div
          className="modal fade"
          id="bookingModal"
          tabIndex="-1"
          aria-labelledby="bookingModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content"
              style={{
                background: "rgba(0,0,0,0.9)",
                color: "white",
                borderRadius: "12px",
              }}
            >
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="bookingModalLabel"
                  style={{ color: "#40E0D0" }}
                >
                  Book {car.make} {car.model}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label fw-bold">Your Name</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white"
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Check-In Date</label>
                  <input
                    type="date"
                    className="form-control bg-dark text-white"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Check-Out Date</label>
                  <input
                    type="date"
                    className="form-control bg-dark text-white"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>

                {totalDays > 0 && (
                  <p className="fw-bold" style={{ color: "#40E0D0" }}>
                    Duration: {totalDays} day(s) | Total: ₹
                    {car.pricePerDay * totalDays}
                  </p>
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn"
                  style={{ backgroundColor: "#40E0D0", color: "black" }}
                  data-bs-dismiss="modal"
                  onClick={handleBooking}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CarDetailsExtras car={CarDetails} />
    </div>
  );
}

export default CarDetails;
