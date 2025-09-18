import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "./Home.css"; // import custom CSS

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token"); // clear token
      navigate("/"); // redirect to login page
    }
  };

  return (
    <div className="home-page">
      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand
            onClick={() => navigate("/home")}
            style={{ cursor: "pointer", color: "#ff9800", fontWeight: "bold" }}
          >
            Matrimony App
          </Navbar.Brand>
          <Nav className="ms-auto d-flex align-items-center">
            <Button
              variant="warning"
              className="fw-bold me-2"
              onClick={() => navigate("/profile")}
            >
              Profile
            </Button>
            <Button
              variant="danger"
              className="fw-bold"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="mt-5 text-center text-white">
        <div className="content-box p-4 rounded shadow">
          <h4 className="fw-bold">
            Marriage doesn't end bachelor life, it just converts unlimited data
            into daily one GB pack. If you need more, complete the full profile
            form.
          </h4>

          <p className="lead">
            You are successfully registered. Explore profiles and connect!
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Home;
