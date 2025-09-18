import React from 'react'
import { Card, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../assets/default-avatar.png';


const MatchCard = ({match}) => {
  const navigate = useNavigate();
  const {profile, score} = match;

  return(
    <Card className='match-card shadow-sm text-center'>
      <Card.Img
      variant='top'
      src={profile.profile_photo_url || defaultAvatar}
      alt={profile.full_name}
      className='match-card-img'/>
      <Card.Body>
        <Card.Title>{profile.full_name}</Card.Title>
        <Card.Text>
          {profile.age} yrs, {profile.occupation || "N/A"} <br />
          {profile.location_city},{profile.location_country}
        </Card.Text>
        <button
        variant="warning"
        onClick={()=> navigate(`/match/${profile.id}`)}>View Profile</button>
        <p className='mt-2 text-muted small'>Match Score: {score}%</p>
      </Card.Body>
    </Card>
  )
}

export default MatchCard
