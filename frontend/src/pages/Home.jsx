import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Image, ProgressBar } from "react-bootstrap";
import axios from "axios";
import "./Home.css"; // import custom CSS
import ProfilePic from "../assets/default-avatar.png";

const API = "http://localhost:5000/api";

const Home = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [completion, setCompletion] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${API}/user/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        const data = res.data || {};
        setProfile(data);

        // Calculate profile completion %
        const profileFields = [
          "full_name",
          "gender",
          "dob",
          "phone_number",
          "caste",
          "religion",
          "education",
          "occupation",
          "salary",
          "marital_status",
          "height_cm",
          "weight_kg",
          "hobbies",
          "about_me",
          "location_city",
          "location_state",
          "location_country",
        ];
        const expectationFields = [
          "preferred_education",
          "preferred_occupation",
          "preferred_caste",
          "preferred_religion",
          "preferred_salary_min",
          "preferred_salary_max",
          "preferred_age",
          "preferred_height",
          "preferred_location",
          "other_expectations",
        ];

        let filled = 0;
        profileFields.forEach((f) => data[f] && filled++);
        if (data.expectation) {
          expectationFields.forEach((f) => data.expectation[f] && filled++);
        }

        const totalFields = profileFields.length + expectationFields.length;
        setCompletion(Math.round((filled / totalFields) * 100));
      })
      .catch((err) => console.error(err));
  }, [token]);

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
          <div className="d-flex align-items-center">
            {/* Profile Photo */}
            <Image
              src={profile.profile_photo_url || ProfilePic}
              roundedCircle
              width={50}
              height={50}
              style={{ cursor: "pointer", objectFit: "cover" }}
              onClick={() => navigate("/profile")}
              className="me-3"
            />
            {/* Completion Bar */}
            <div style={{ width: 150 }}>
              <ProgressBar
                now={completion}
                label={`${completion}%`}
                variant="warning"
              />
            </div>
          </div>

          <Nav className="ms-auto d-flex align-items-center">
            <button className="btn btn-danger fw-bold" onClick={handleLogout}>
              Logout
            </button>
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
