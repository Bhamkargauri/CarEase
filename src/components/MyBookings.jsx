import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";

const MyBookings = () => {
  const [bookedCar, setBookedCar] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: session } = await axios.get(
          "http://localhost:3001/session"
        );

        if (session.length > 0) {
          setCurrentUser(session[0]);
        } else {
          toast.info("Please log in first!", { theme: "dark" });
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };
    fetchSession();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!currentUser) return;

      try {
        const response = await axios.get(
          `http://localhost:3001/bookings?userId=${currentUser.id}`
        );
        // console.log("response=", response);
        setBookedCar(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load bookings.", { theme: "dark" });
      }
    };
    fetchBookings();
  }, [currentUser]);

  const handleCancel = async (bookingId, carId) => {
    if (window.confirm("Are you sure to cancel booking?")) {
      try {
        const carResponse = await axios.get(
          `http://localhost:3001/cars/${carId}`
        );
        const currentCarData = carResponse.data;

        const updatedCarData = { ...currentCarData, availability: true };

        await axios.put(`http://localhost:3001/cars/${carId}`, updatedCarData);
        await axios.delete(`http://localhost:3001/bookings/${bookingId}`);
        setBookedCar((prev) => prev.filter((b) => b.id !== bookingId));
        toast.success("Booking cancelled successfully!", { theme: "dark" });
      } catch (error) {
        console.error("Error cancelling booking:", error);
        toast.error("Failed to cancel booking.", { theme: "dark" });
      }
    }
  };

  if (bookedCar.length === 0) {
    return (
      <div
        className="min-vh-100 d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundColor: "#111",
          color: "white",
        }}
      >
        <h3 style={{ color: "#40E0D0", textShadow: "0 0 8px #40E0D0" }}>
          No bookings yet!
        </h3>
        <Link
          to="/"
          className="btn mt-3"
          style={{
            backgroundColor: "#40E0D0",
            color: "black",
            borderRadius: "8px",
          }}
        >
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-vh-100 py-5 bg-dark">
      <div
        style={{
          background: "rgba(0,0,0,0.85)",
        }}
      ></div>

      <div className="container">
        <h2
          className="mb-4 text-center"
          style={{ color: "#40E0D0", textShadow: "0 0 10px #40E0D0" }}
        >
          My Bookings
        </h2>

        <div className="row">
          {bookedCar.map((b) => (
            <div className="col-md-6 mb-4" key={b.carId}>
              <div
                className="card shadow-lg border-0"
                style={{
                  background: "rgba(0,0,0,0.85)",
                  borderRadius: "15px",
                  overflow: "hidden",
                }}
              >
                <div className="row g-0">
                  <div className="col-md-5">
                    <img
                      src={b.image}
                      alt={b.carName}
                      className="img-fluid"
                      style={{
                        objectFit: "cover",
                        height: "180px",
                        width: "100%",
                        borderRadius: "15px 0 0 15px",
                        boxShadow: "0 0 10px rgba(64,224,208,0.5)",
                      }}
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body">
                      <h5 style={{ color: "#40E0D0" }}>{b.carName}</h5>
                      <p className="m-0 text-white">
                        <strong>User:</strong> {b.user}
                      </p>
                      <p className="m-0 text-white">
                        <strong>Check-In:</strong> {b.startDate}
                      </p>
                      <p className="m-0 text-white">
                        <strong>Check-Out:</strong> {b.endDate}
                      </p>
                      <p className="m-0 text-white">
                        <strong>Duration:</strong> {b.duration} day(s)
                      </p>
                      <p className="m-0" style={{ color: "#40E0D0" }}>
                        <strong>Total:</strong> ₹{b.totalCost}
                      </p>

                      <button
                        className="btn btn-sm btn-danger mt-2"
                        onClick={() => handleCancel(b.id, b.carId)}
                      >
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <Link
            to="/"
            className="btn"
            style={{
              backgroundColor: "#40E0D0",
              color: "black",
              borderRadius: "8px",
              padding: "8px 20px",
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
