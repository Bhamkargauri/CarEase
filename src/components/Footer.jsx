import loginImg from "../assets/form1.jpg";

const Footer = () => {
  return (
    <footer
      className="text-white bg-black pt-5 pb-3"
      style={{
        background: "rgba(0, 0, 0, 0.5)",
        opacity: 0.85,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-4">
            <h4
              className="fw-bold mb-3"
              style={{
                color: "#40E0D0",
                textShadow: "0 0 8px rgba(64, 224, 208, 0.8)",
              }}
            >
              CarEase
            </h4>
            <p className="text-light opacity-75">
              Book your dream car effortlessly with <strong>CarEase</strong>.
              Browse, book, and drive your favorite car anywhere in India with
              ease and comfort.
            </p>
          </div>

          {/* Contact Info */}
          <div className="col-md-6 mb-4">
            <h5
              className="fw-bold mb-3"
              style={{
                color: "#40E0D0",
                textShadow: "0 0 8px rgba(64, 224, 208, 0.8)",
              }}
            >
              Contact
            </h5>
            <p className="mb-1">
              <i className="bi bi-envelope me-2 text-turquoise"></i>
              support@carease.com
            </p>
            <p className="mb-3">
              <i className="bi bi-telephone me-2 text-turquoise"></i>
              +91 98765 43210
            </p>

            <div className="d-flex gap-3">
              <a
                href="#"
                className="text-white fs-5"
                style={{ transition: "0.3s" }}
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="#"
                className="text-white fs-5"
                style={{ transition: "0.3s" }}
              >
                <i className="bi bi-twitter"></i>
              </a>
              <a
                href="#"
                className="text-white fs-5"
                style={{ transition: "0.3s" }}
              >
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <hr
          className="mt-4 mb-3"
          style={{ borderColor: "rgba(64, 224, 208, 0.4)" }}
        />

        <p
          className="text-center mb-0"
          style={{ color: "rgba(255, 255, 255, 0.8)" }}
        >
          &copy; {new Date().getFullYear()}{" "}
          <span style={{ color: "#40E0D0" }}>CarEase</span>. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
