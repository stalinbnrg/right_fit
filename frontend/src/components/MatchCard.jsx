import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/default-avatar.png";

const MatchCard = ({ match }) => {
  const navigate = useNavigate();
  const { profile, score } = match;

  return (
    <Card className="match-card shadow-sm text-center m-2" style={{ width: "220px", borderRadius: "15px", overflow: "hidden" }}>
      <div style={{ height: "180px", overflow: "hidden" }}>
        <Card.Img
          variant="top"
          src={profile.profile_photo_url || defaultAvatar}
          alt={profile.full_name}
          className="img-fluid"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>
      <Card.Body>
        <Card.Title className="fw-bold" style={{ fontSize: "1rem" }}>{profile.full_name}</Card.Title>
        <Card.Text style={{ fontSize: "0.85rem", marginBottom: "0.5rem" }}>
          {profile.age} yrs, {profile.occupation || "N/A"} <br />
          {profile.location_city}, {profile.location_country}
        </Card.Text>
        <Button
          variant="outline-warning"
          size="sm"
          onClick={() => navigate(`/match/${profile.id}`)}
        >
          View Profile
        </Button>
        <p className="mt-2 text-muted small" style={{ fontSize: "0.75rem" }}>Match Score: {score}%</p>
      </Card.Body>
    </Card>
  );
};

export default MatchCard;
