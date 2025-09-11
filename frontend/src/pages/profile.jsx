// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { Tabs, Tab, Form, Button, Container, Row, Col } from "react-bootstrap";
import ProfilePic from "../assets/default-avatar.png"; // default image

const Profile = () => {
  // Data from Register (freezed)
  const [profile, setProfile] = useState({
    full_name: localStorage.getItem("full_name") || "",
    gender: localStorage.getItem("gender") || "Male",
    dob: localStorage.getItem("dob") || "",
    phone_number: localStorage.getItem("phone_number") || "",
    email: localStorage.getItem("email") || "",
    caste: "",
    religion: "",
    education: "",
    occupation: "",
    salary: "",
    marital_status: "",
    height_cm: "",
    weight_kg: "",
    hobbies: "",
    about_me: "",
    location_city: "",
    location_state: "",
    location_country: "",
    profile_photo_url: "",
  });

  const [expectation, setExpectation] = useState({
    occupation: "",
    education: "",
    salary_min: "",
    salary_max: "",
    preferred_age_min: "",
    preferred_age_max: "",
    preferred_height_min: "",
    preferred_height_max: "",
    preferred_caste: "",
    preferred_religion: "",
    preferred_location: "",
    other_expectations: "",
  });

  // Handle Changes
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleExpectationChange = (e) => {
    setExpectation({ ...expectation, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    console.log("Profile Saved:", profile);
    alert("Profile Details Updated!");
  };

  const handleSaveExpectation = () => {
    console.log("Expectation Saved:", expectation);
    alert("Expectation Details Updated!");
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center text-center">
        <Col md={6}>
          {/* Profile Photo */}
          <div className="d-flex flex-column align-items-center">
            <img
              src={profile.profile_photo_url || ProfilePic}
              alt="Profile"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #333",
              }}
            />
            <div className="mt-2">
              <Button variant="secondary" size="sm" className="me-2">
                📸 Camera
              </Button>
              <Button variant="secondary" size="sm">
                🖼️ Gallery
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultActiveKey="profile" className="mt-4">
            {/* Profile Details */}
            <Tab eventKey="profile" title="Profile Details">
              <Form className="mt-3">
                {/* Freezed Inputs */}
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" value={profile.full_name} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control type="text" value={profile.gender} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control type="date" value={profile.dob} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" value={profile.phone_number} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={profile.email} disabled />
                </Form.Group>

                {/* Editable Inputs */}
                <Form.Group className="mb-3">
                  <Form.Label>Caste</Form.Label>
                  <Form.Control
                    type="text"
                    name="caste"
                    value={profile.caste}
                    onChange={handleProfileChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Religion</Form.Label>
                  <Form.Control
                    type="text"
                    name="religion"
                    value={profile.religion}
                    onChange={handleProfileChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Education</Form.Label>
                  <Form.Control
                    type="text"
                    name="education"
                    value={profile.education}
                    onChange={handleProfileChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Occupation</Form.Label>
                  <Form.Control
                    type="text"
                    name="occupation"
                    value={profile.occupation}
                    onChange={handleProfileChange}
                  />
                </Form.Group>

                <Button variant="primary" onClick={handleSaveProfile}>
                  Save Profile
                </Button>
              </Form>
            </Tab>

            {/* Expectation */}
            <Tab eventKey="expectation" title="Expectation">
              <Form className="mt-3">
                <Form.Group className="mb-3">
                  <Form.Label>Expected Education</Form.Label>
                  <Form.Control
                    type="text"
                    name="education"
                    value={expectation.education}
                    onChange={handleExpectationChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Expected Occupation</Form.Label>
                  <Form.Control
                    type="text"
                    name="occupation"
                    value={expectation.occupation}
                    onChange={handleExpectationChange}
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Salary Min</Form.Label>
                      <Form.Control
                        type="number"
                        name="salary_min"
                        value={expectation.salary_min}
                        onChange={handleExpectationChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Salary Max</Form.Label>
                      <Form.Control
                        type="number"
                        name="salary_max"
                        value={expectation.salary_max}
                        onChange={handleExpectationChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="success" onClick={handleSaveExpectation}>
                  Save Expectations
                </Button>
              </Form>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
