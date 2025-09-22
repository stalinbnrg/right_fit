import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import defaultAvatar from "../assets/default-avatar.png";

const API_BASE = "http://localhost:5000/api"; // <-- backend URL

const MatchProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE}/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading Profile...</p>;
  if (!profile) return <p className="text-center mt-5">Profile not found</p>;

  return (
    <Container className="mt-4">
      <Button variant="secondary" onClick={() => navigate(-1)}>
        ← Back
      </Button>
      <Card className="p-4 mt-3 shadow-lg">
        <Row>
          <Col md={4} className="text-center">
            <img
              src={profile.profile_photo_url || defaultAvatar}
              alt={profile.full_name}
              className="img-fluid rounded-circle shadow-sm"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
          </Col>
          <Col md={8}>
            <h3>{profile.full_name}</h3>
            <p><b>Age:</b> {profile.age || "N/A"}</p>
            <p><b>Gender:</b> {profile.gender || "N/A"}</p>
            <p><b>Occupation:</b> {profile.occupation || "N/A"}</p>
            <p><b>Education:</b> {profile.education || "N/A"}</p>
            <p><b>Salary:</b> {profile.salary ? `$${profile.salary}` : "N/A"}</p>
            <p><b>Marital Status:</b> {profile.marital_status || "N/A"}</p>
            <p><b>Height:</b> {profile.height_cm ? `${profile.height_cm} cm` : "N/A"}</p>
            <p><b>Weight:</b> {profile.weight_kg ? `${profile.weight_kg} kg` : "N/A"}</p>
            <p><b>Hobbies:</b> {profile.hobbies || "N/A"}</p>
            <p><b>About:</b> {profile.about_me || "No description"}</p>
            <p>
              <b>Location:</b>{" "}
              {[
                profile.location_city,
                profile.location_state,
                profile.location_country,
              ]
                .filter(Boolean)
                .join(", ") || "N/A"}
            </p>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default MatchProfile;
