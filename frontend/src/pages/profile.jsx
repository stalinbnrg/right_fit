// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { Tabs, Tab, Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../assets/default-avatar.png";
import "./Profile.css";

const API = "http://localhost:5000/api";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [expectation, setExpectation] = useState({});
  const [photoFile, setPhotoFile] = useState(null);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    axios
      .get(`${API}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const userData = res.data || {};
        setProfile(userData);
        setExpectation(userData.expectation || {});
        setUserId(userData.id);

        // Calculate age
        if (userData.dob) {
          const age = Math.floor(
            (new Date() - new Date(userData.dob)) / (365.25 * 24 * 60 * 60 * 1000)
          );
          setProfile((prev) => ({ ...prev, age }));
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setMessage("Failed to fetch profile data.");
        setTimeout(() => setMessage(""), 6000);
      });
  }, [token]);

  // Profile form change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));

    if (name === "dob" && value) {
      const age = Math.floor(
        (new Date() - new Date(value)) / (365.25 * 24 * 60 * 60 * 1000)
      );
      setProfile((prev) => ({ ...prev, age }));
    }
  };

  // Expectation form change
  const handleExpectationChange = (e) => {
    const { name, value } = e.target;
    setExpectation((prev) => ({ ...prev, [name]: value }));
  };

  // Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profile_photo_url: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save profile
  const handleSaveProfile = () => {
    if (!userId) {
      setMessage("User ID not found!");
      return;
    }

    const saveProfile = (payload) => {
      axios
        .put(`${API}/user/${userId}`, payload, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        })
        .then((res) => {
          setMessage("It would be great if you filled out the form completely, but if you didn't, it might be difficult to find a suitable partner for you.");
          setProfile(res.data.user || profile);
          setTimeout(() => setMessage(""), 6000);
        })
        .catch((err) => {
          console.error("Save error:", err.response || err);
          const msg = err.response?.data?.message || "Failed to save profile. Try again!";
          setMessage(msg);
          setTimeout(() => setMessage(""), 6000);
        });
    };

    if (photoFile) {
      const reader = new FileReader();
      reader.onloadend = () => saveProfile({ ...profile, profile_photo_url: reader.result });
      reader.readAsDataURL(photoFile);
    } else {
      saveProfile(profile);
    }
  };

  // Save expectation
  const handleSaveExpectation = () => {
    if (!userId) {
      setMessage("User ID not found!");
      return;
    }

    const payload = {
      user_id: userId,
      preferred_education: expectation.preferred_education || "",
      preferred_occupation: expectation.preferred_occupation || "",
      preferred_caste: expectation.preferred_caste || "",
      preferred_religion: expectation.preferred_religion || "",
      other_expectations: expectation.other_expectations || "",
      preferred_salary_min: Number(expectation.preferred_salary_min) || 0,
      preferred_salary_max: Number(expectation.preferred_salary_max) || 0,
      preferred_age_min: expectation.preferred_age_min || null,
      preferred_age_max: expectation.preferred_age_max || null,
      preferred_height_min: expectation.preferred_height_min || null,
      preferred_height_max: expectation.preferred_height_max || null,
      preferred_location_city: expectation.preferred_location_city || "",
      preferred_location_state: expectation.preferred_location_state || "",
      preferred_location_country: expectation.preferred_location_country || "",
    };

    // Remove empty/null keys
    Object.keys(payload).forEach(
      (key) => (payload[key] === null || payload[key] === "") && delete payload[key]
    );

    axios
      .post(`${API}/expectation`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setMessage("It would be great if you filled out the form completely, but if you didn't, it might be difficult to find a suitable partner for you.");
        setTimeout(() => setMessage(""), 6000);
      })
      .catch((err) => {
        console.error("Expectation save error:", err.response || err);
        const msg =
          err.response?.data?.message ||
          (err.response?.data?.errors
            ? err.response.data.errors.map((e) => e.msg).join(", ")
            : "Failed to save expectation. Try again!");
        setMessage(msg);
        setTimeout(() => setMessage(""), 6000);
      });
  };

  return (
    <div className="profile-page">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="w-100 justify-content-center">
          <Col lg={10} className="profile-card p-4 rounded shadow">
            {/* Back Button */}
            <div className="d-flex align-items-center mb-3">
              <Button
                variant="warning"
                size="sm"
                className="me-2"
                onClick={() => navigate("/home")}
              >
                ← Back
              </Button>
            </div>

            {message && (
              <div className="text-center mb-3 alert alert-info">{message}</div>
            )}

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

            <Tabs defaultActiveKey="profile" className="mt-4" fill>
              {/* Profile Tab */}
              <Tab eventKey="profile" title="Profile Details">
                <Form className="mt-3 text-start">
                  {/* Full Name, Gender */}
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

                  {/* DOB & Age */}
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
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                          type="number"
                          name="age"
                          value={profile.age || ""}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Phone & Email */}
                  <Row>
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
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={profile.email || ""}
                          onChange={handleProfileChange}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Caste, Religion, Education */}
                  <Row>
                    <Col md={4}>
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
                    <Col md={4}>
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
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Education</Form.Label>
                        <Form.Control
                          type="text"
                          name="education"
                          value={profile.education || ""}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Occupation & Salary */}
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Occupation</Form.Label>
                        <Form.Control
                          type="text"
                          name="occupation"
                          value={profile.occupation || ""}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
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
                  </Row>

                  {/* Marital Status */}
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Marital Status</Form.Label>
                        <Form.Select
                          name="marital_status"
                          value={profile.marital_status || ""}
                          onChange={handleProfileChange}
                        >
                          <option value="">Select</option>
                          <option>Single</option>
                          <option>Married</option>
                          <option>Divorced</option>
                          <option>Widowed</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

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
                  </Row>

                  {/* Weight */}
                  <Row>
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
                    <Col md={6}></Col>
                  </Row>

                  {/* Hobbies & About */}
                  <Form.Group className="mb-3">
                    <Form.Label>Hobbies</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="hobbies"
                      value={profile.hobbies || ""}
                      onChange={handleProfileChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>About Me</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="about_me"
                      value={profile.about_me || ""}
                      onChange={handleProfileChange}
                    />
                  </Form.Group>

                  {/* Location */}
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

              {/* Expectation Tab */}
              {/* Expectation Tab */}
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
          <Form.Label>Preferred Salary Min</Form.Label>
          <Form.Control
            type="number"
            name="preferred_salary_min"
            value={expectation.preferred_salary_min || ""}
            onChange={handleExpectationChange}
          />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label>Preferred Salary Max</Form.Label>
          <Form.Control
            type="number"
            name="preferred_salary_max"
            value={expectation.preferred_salary_max || ""}
            onChange={handleExpectationChange}
          />
        </Form.Group>
      </Col>
    </Row>

    <Row>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label>Preferred Age Min</Form.Label>
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
          <Form.Label>Preferred Age Max</Form.Label>
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
          <Form.Label>Preferred Height Min (cm)</Form.Label>
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
          <Form.Label>Preferred Height Max (cm)</Form.Label>
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

    <Row>
      <Col md={4}>
        <Form.Group className="mb-3">
          <Form.Label>Preferred Location City</Form.Label>
          <Form.Control
            type="text"
            name="preferred_location_city"
            value={expectation.preferred_location_city || ""}
            onChange={handleExpectationChange}
          />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group className="mb-3">
          <Form.Label>Preferred Location State</Form.Label>
          <Form.Control
            type="text"
            name="preferred_location_state"
            value={expectation.preferred_location_state || ""}
            onChange={handleExpectationChange}
          />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group className="mb-3">
          <Form.Label>Preferred Location Country</Form.Label>
          <Form.Control
            type="text"
            name="preferred_location_country"
            value={expectation.preferred_location_country || ""}
            onChange={handleExpectationChange}
          />
        </Form.Group>
      </Col>
    </Row>

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
