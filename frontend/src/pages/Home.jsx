// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
            Matrimony App
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Button variant="outline-light" onClick={() => navigate("/profile")}>
              Profile
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="mt-5 text-center">
        <h1>Welcome to Home Page 🎉</h1>
        <p>You are successfully registered. Explore profiles and connect!</p>
      </Container>
    </div>
  );
};

export default Home;
