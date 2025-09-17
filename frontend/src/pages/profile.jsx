// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Form,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import ProfilePic from "../assets/default-avatar.png";
import "./Profile.css";

const API = "http://localhost:5000/api";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [expectation, setExpectation] = useState({});
  const [photoFile, setPhotoFile] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch profile + expectation data
  useEffect(() => {
    axios
      .get(`${API}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data || {});
        setExpectation(res.data.expectation || {});
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [token]);

  // Profile input change
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Expectation input change
  const handleExpectationChange = (e) => {
    setExpectation({ ...expectation, [e.target.name]: e.target.value });
  };

  // Save Profile
  const handleSaveProfile = () => {
    const formData = new FormData();
    Object.keys(profile).forEach((key) => {
      formData.append(key, profile[key]);
    });
    if (photoFile) {
      formData.append("profile_photo", photoFile);
    }

    axios
      .put(`${API}/user/me`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => alert("Profile saved to DB!"))
      .catch((err) => console.error("Save error:", err));
  };

  // Save Expectation
  const handleSaveExpectation = () => {
    axios
      .post(`${API}/expectation`, expectation, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => alert("Expectation saved to DB!"))
      .catch((err) => console.error("Save error:", err));
  };

  // Profile photo upload preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profile_photo_url: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-page">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="w-100 justify-content-center">
          <Col lg={10} className="profile-card p-4 rounded shadow">
            {/* Profile Photo */}
            <div className="d-flex flex-column align-items-center">
              <img
                src={profile.profile_photo_url || ProfilePic}
                alt="Profile"
                className="profile-pic"
              />
              <div className="mt-2">
                <Form.Group controlId="uploadPhoto" className="d-inline-block">
                  <Form.Label className="btn btn-warning btn-sm me-2 mb-0">
                    📸 Upload
                  </Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </Form.Group>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultActiveKey="profile" className="mt-4" fill>
              {/* Profile Details */}
              <Tab eventKey="profile" title="Profile Details">
                <Form className="mt-3 text-start">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="full_name"
                          value={profile.full_name || ""}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select
                          name="gender"
                          value={profile.gender || ""}
                          onChange={handleProfileChange}
                        >
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                          type="date"
                          name="dob"
                          value={profile.dob || ""}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="phone_number"
                          value={profile.phone_number || ""}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={profile.email || ""}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Caste</Form.Label>
                        <Form.Control
                          type="text"
                          name="caste"
                          value={profile.caste || ""}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Religion</Form.Label>
                        <Form.Control
                          type="text"
                          name="religion"
                          value={profile.religion || ""}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Education Qualification</Form.Label>
                        <Form.Control
                          type="text"
                          name="education"
                          value={profile.education || ""}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Occupation</Form.Label>
                    <Form.Control
                      type="text"
                      name="occupation"
                      value={profile.occupation || ""}
                      onChange={handleProfileChange}
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Annual Salary</Form.Label>
                        <Form.Control
                          type="number"
                          name="salary"
                          value={profile.salary || ""}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Marital Status</Form.Label>
                        <Form.Select
                          name="marital_status"
                          value={profile.marital_status || ""}
                          onChange={handleProfileChange}
                        >
                          <option>Single</option>
                          <option>Married</option>
                          <option>Divorced</option>
                          <option>Widowed</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Height (cm)</Form.Label>
                        <Form.Control
                          type="number"
                          name="height_cm"
                          value={profile.height_cm || ""}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Weight (kg)</Form.Label>
                        <Form.Control
                          type="number"
                          name="weight_kg"
                          value={profile.weight_kg || ""}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Hobbies</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="hobbies"
                      rows={2}
                      value={profile.hobbies || ""}
                      onChange={handleProfileChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>About Me</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="about_me"
                      rows={3}
                      value={profile.about_me || ""}
                      onChange={handleProfileChange}
                    />
                  </Form.Group>

                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          name="location_city"
                          value={profile.location_city || ""}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type="text"
                          name="location_state"
                          value={profile.location_state || ""}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          type="text"
                          name="location_country"
                          value={profile.location_country || ""}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    variant="primary"
                    className="mt-3 w-100"
                    onClick={handleSaveProfile}
                  >
                    Save Profile
                  </Button>
                </Form>
              </Tab>

              {/* Expectation Details */}
              <Tab eventKey="expectation" title="Expectation">
                <Form className="mt-3 text-start">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Preferred Education</Form.Label>
                        <Form.Control
                          type="text"
                          name="preferred_education"
                          value={expectation.preferred_education || ""}
                          onChange={handleExpectationChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Preferred Occupation</Form.Label>
                        <Form.Control
                          type="text"
                          name="preferred_occupation"
                          value={expectation.preferred_occupation || ""}
                          onChange={handleExpectationChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Preferred Salary (Min)</Form.Label>
                        <Form.Control
                          type="number"
                          name="salary_min"
                          value={expectation.salary_min || ""}
                          onChange={handleExpectationChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Preferred Salary (Max)</Form.Label>
                        <Form.Control
                          type="number"
                          name="salary_max"
                          value={expectation.salary_max || ""}
                          onChange={handleExpectationChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Preferred Age (Min)</Form.Label>
                        <Form.Control
                          type="number"
                          name="preferred_age_min"
                          value={expectation.preferred_age_min || ""}
                          onChange={handleExpectationChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Preferred Age (Max)</Form.Label>
                        <Form.Control
                          type="number"
                          name="preferred_age_max"
                          value={expectation.preferred_age_max || ""}
                          onChange={handleExpectationChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Preferred Height (Min)</Form.Label>
                        <Form.Control
                          type="number"
                          name="preferred_height_min"
                          value={expectation.preferred_height_min || ""}
                          onChange={handleExpectationChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Preferred Height (Max)</Form.Label>
                        <Form.Control
                          type="number"
                          name="preferred_height_max"
                          value={expectation.preferred_height_max || ""}
                          onChange={handleExpectationChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Preferred Caste</Form.Label>
                        <Form.Control
                          type="text"
                          name="preferred_caste"
                          value={expectation.preferred_caste || ""}
                          onChange={handleExpectationChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Preferred Religion</Form.Label>
                        <Form.Control
                          type="text"
                          name="preferred_religion"
                          value={expectation.preferred_religion || ""}
                          onChange={handleExpectationChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Preferred Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="preferred_location"
                      value={expectation.preferred_location || ""}
                      onChange={handleExpectationChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Other Expectations</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="other_expectations"
                      value={expectation.other_expectations || ""}
                      onChange={handleExpectationChange}
                    />
                  </Form.Group>

                  <Button
                    variant="success"
                    className="mt-3 w-100"
                    onClick={handleSaveExpectation}
                  >
                    Save Expectation
                  </Button>
                </Form>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
