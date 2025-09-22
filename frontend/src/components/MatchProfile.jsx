import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import defaultAvatar from "../assets/default-avatar.png"

const MatchProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };
    fetchProfile();
  }, [id]);
  if (!profile) return <p className="text-center mt-5">Loading Profile</p>;

  return (
    <Container className="mt-4">
      <button variant="secondary" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <Card className="p-4 mt-3 shadow-lg">
        <Row>
          <Col md={4} className="text-center">
            <img src={profile.profile_photo_url || defaultAvatar} alt={profile.full_name} className="img-fluid rounded-circle shadow-sm" style={{width: "200px", height:"200px", objectFit:"cover"}}/>
          </Col>
          <Col md={8}>
            <h3>{profile.full_name}</h3>
            <p><b>Age:</b> {profile.age}</p>
            <p><b>Gender:</b> {profile.gender}</p>
            <p><b>Occupation:</b> {profile.occupation || "N/A"}</p>
            <p><b>Education:</b> {profile.education || "N/A"}</p>
            <p><b>Location:</b> {profile.location_city}, {profile.location_country}</p>
            <p><b>About:</b> {profile.about_me || "No description"}</p>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default MatchProfile;
