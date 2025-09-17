import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "./Home.css"; // import custom CSS

const Home = () => {
  const navigate = useNavigate();

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
          <Nav className="ms-auto">
            <Button
              variant="warning"
              className="fw-bold"
              onClick={() => navigate("/profile")}
            >
              Profile
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="mt-5 text-center text-white">
        <div className="content-box p-4 rounded shadow">
          <h4 className="fw-bold">Marriage doesn't end bachelor life, it just converts unlimited data into daily one GB pack.
                                  if you need more Profile complete the full form
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
