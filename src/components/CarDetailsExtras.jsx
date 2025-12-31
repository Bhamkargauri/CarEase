const CarDetailsExtras = ({ car }) => {
  return (
    <>
      <div
        className="p-5 m-5 rounded-4"
        style={{ background: "#090808ff", color: "#fff" }}
      >
    
        {/*  inclusion/exclusion section */}
        <h5 className="fw-bold mb-3">Inclusion/Exclusions</h5>
        <div className="d-flex align-items-start mb-3">
          <span
            className="me-3 d-flex align-items-center justify-content-center"
            style={{
              width: "22px",
              height: "22px",
              border: "2px solid green",
              borderRadius: "50%",
              color: "green",
              fontWeight: "bold",
            }}
          >
            ✓
          </span>
          <p className="mb-0 text-light">
            Comprehensive insurance is included during the trip period.
          </p>
        </div>
        <div className="d-flex align-items-start mb-3">
          <span
            className="me-3 d-flex align-items-center justify-content-center"
            style={{
              width: "22px",
              height: "22px",
              border: "2px solid green",
              borderRadius: "50%",
              color: "green",
              fontWeight: "bold",
            }}
          >
            ✓
          </span>
          <p className="mb-0 text-light">
            24×7 roadside assistance available in case of emergency.
          </p>
        </div>
        <div className="d-flex align-items-start mb-3">
          <span
            className="me-3 d-flex align-items-center justify-content-center"
            style={{
              width: "22px",
              height: "22px",
              border: "2px solid green",
              borderRadius: "50%",
              color: "green",
              fontWeight: "bold",
            }}
          >
            ✓
          </span>
          <p className="mb-0 text-light">
            Free cancellation up to 24 hours before the trip start time.
          </p>
        </div>
        <div className="d-flex align-items-start mb-3">
          <span
            className="me-3 d-flex align-items-center justify-content-center"
            style={{
              width: "22px",
              height: "22px",
              border: "2px solid red",
              borderRadius: "50%",
              color: "red",
              fontWeight: "bold",
            }}
          >
            ✕
          </span>
          <p className="mb-0 text-light">
            Fuel not included. Guest should return the car with the same fuel
            level as at start.
          </p>
        </div>
        <div className="d-flex align-items-start mb-3">
          <span
            className="me-3 d-flex align-items-center justify-content-center"
            style={{
              width: "22px",
              height: "22px",
              border: "2px solid red",
              borderRadius: "50%",
              color: "red",
              fontWeight: "bold",
            }}
          >
            ✕
          </span>
          <p className="mb-0 text-light">
            Toll/Fastag charges not included. Check with host for Fastag
            recharge.
          </p>
        </div>
        <div className="d-flex align-items-start">
          <span
            className="me-3 d-flex align-items-center justify-content-center"
            style={{
              width: "22px",
              height: "22px",
              border: "2px solid red",
              borderRadius: "50%",
              color: "red",
              fontWeight: "bold",
            }}
          >
            ✕
          </span>
          <p className="mb-0 text-light">
            Trip Protection excludes: Off-road use, driving under influence,
            over-speeding, illegal use, restricted zones.
          </p>
        </div>
        {/* FAQs accordion section  */}
        <div className="accordion accordion-flush mt-5" id="faqAccordion">
          <h5 className="fw-bold mb-3">FAQs</h5>
          <div
            className="accordion-item border-secondary"
            style={{ background: "#090808ff", color: "#fff" }}
          >
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed text-white"
                type="button"
                style={{ background: "#090808ff", color: "#fff" }}
                data-bs-toggle="collapse"
                data-bs-target="#faq1"
              >
                Who pays for the Fuel and FASTag?
              </button>
            </h2>
            <div
              id="faq1"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div
                className="accordion-body text-secondary"
                style={{ background: "#090808ff", color: "#fff" }}
              >
                On CarEase, fuel and FASTag charges are paid by the customer.
                The car should be returned with the same fuel level as at the
                start of the trip. Any FASTag or toll charges used during the
                trip will be charged separately.
              </div>
            </div>
          </div>

          <div
            className="accordion-item border-secondary"
            style={{ background: "#090808ff", color: "#fff" }}
          >
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed text-white"
                type="button"
                style={{ background: "#090808ff", color: "#fff" }}
                data-bs-toggle="collapse"
                data-bs-target="#faq2"
              >
                Can I extend my trip after booking creation?
              </button>
            </h2>
            <div
              id="faq2"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div
                className="accordion-body text-secondary"
                style={{ background: "#090808ff", color: "#fff" }}
              >
                Yes, you can extend your trip on CarEase if the car is
                available. Just go to My Bookings and request an extension
                before your trip ends. Additional charges will apply for the
                extra duration.
              </div>
            </div>
          </div>

          <div
            className="accordion-item border-secondary"
            style={{ background: "#090808ff", color: "#fff" }}
          >
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed text-white"
                style={{ background: "#090808ff", color: "#fff" }}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq3"
              >
                How can I cancel my booking?
              </button>
            </h2>
            <div
              id="faq3"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div
                className="accordion-body text-secondary"
                style={{ background: "#090808ff", color: "#fff" }}
              >
                You can cancel your booking easily from the My Bookings section
                on CarEase. Free cancellation is available if you cancel within
                the allowed time period. Refunds (if applicable) will be
                processed as per CarEase cancellation policy.
              </div>
            </div>
          </div>
          <div
            className="accordion-item border-secondary"
            style={{ background: "#090808ff", color: "#fff" }}
          >
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed text-white"
                type="button"
                style={{ background: "#090808ff", color: "#fff" }}
                data-bs-toggle="collapse"
                data-bs-target="#faq4"
              >
                What is a refundable security deposit and why do I pay it?
              </button>
            </h2>
            <div
              id="faq4"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div
                className="accordion-body text-secondary"
                style={{ background: "#090808ff", color: "#fff" }}
              >
                A refundable security deposit is a safety amount collected by
                CarEase to cover any damages, fines, or violations during the
                trip. If the car is returned in good condition and no issues are
                found, the full deposit is refunded after the trip.
              </div>
            </div>
          </div>
          <div
            className="accordion-item border-secondary"
            style={{ background: "#090808ff", color: "#fff" }}
          >
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed text-white"
                style={{ background: "#090808ff", color: "#fff" }}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq5"
              >
                What is the policy about limited kms in subscription?
              </button>
            </h2>
            <div
              id="faq5"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div
                className="accordion-body text-secondary"
                style={{ background: "#090808ff", color: "#fff" }}
              >
                In a limited kms subscription on CarEase, you get a fixed number
                of kilometers per day or per trip. If you exceed the allowed
                kilometers, extra charges will be applied for each additional km
                driven.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarDetailsExtras;
