import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Button, Row, Col, Image, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MatchCard from "../components/MatchCard";
import "./Home.css";
import ProfilePic from "../assets/default-avatar.png";

const API = "http://localhost:5000/api";

const Home = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [profile, setProfile] = useState({});
  const [completion, setCompletion] = useState(0);

  // Fetch user profile for completion %
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data || {};
        setProfile(data);

        // Calculate profile completion
        const profileFields = [
          "full_name", "gender", "dob", "phone_number", "caste", "religion",
          "education", "occupation", "salary", "marital_status", "height_cm",
          "weight_kg", "hobbies", "about_me", "location_city", "location_state",
          "location_country",
        ];
        const expectationFields = [
          "preferred_education", "preferred_occupation", "preferred_age_min",
          "preferred_age_max", "preferred_height_min", "preferred_height_max",
          "preferred_salary_min", "preferred_salary_max",
          "preferred_location_city", "preferred_location_state", "preferred_location_country",
          "other_expectations",
        ];

        let filled = 0;
        profileFields.forEach(f => data[f] && filled++);
        if (data.expectation) {
          expectationFields.forEach(f => data.expectation[f] && filled++);
        }

        const totalFields = profileFields.length + expectationFields.length;
        setCompletion(Math.round((filled / totalFields) * 100));

      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  // Fetch matches
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API}/match`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMatches(res.data.matches || []);
      } catch (err) {
        console.error("Error fetching matches:", err);
      }
    };
    fetchMatches();
  }, []);

  return (
    <div className="home-page">
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <div className="d-flex align-items-center">
            <Image
              src={profile.profile_photo_url || ProfilePic}
              roundedCircle
              width={50}
              height={50}
              style={{ cursor: "pointer", objectFit: "cover" }}
              onClick={() => navigate("/profile")}
              className="me-3"
            />
            <div style={{ width: 150 }}>
              <ProgressBar
                now={completion}
                label={`${completion}%`}
                variant="warning"
              />
            </div>
          </div>

          <Nav className="ms-auto">
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
              onClick={() => {
                if (window.confirm("Are you sure you want to logout?")) {
                  localStorage.removeItem("token");
                  navigate("/");
                }
              }}
            >
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Matches Section */}
      <Container className="mt-5 text-white">
        <h4 className="fw-bold text-center">Your Best Matches</h4>
        <Row className="mt-4">
          {matches.length > 0 ? (
            matches.map((m) => (
              <Col md={4} key={m.profile.id} className="mb-4">
                <MatchCard match={m} />
              </Col>
            ))
          ) : (
            <p className="text-center mt-4">
              No matches found. Update your expectations!
            </p>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
