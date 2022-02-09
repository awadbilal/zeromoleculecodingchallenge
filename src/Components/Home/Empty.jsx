import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './style.css';

function Empty() {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/create-movie");
  }

  return (
    <Container className="empty">
      <h1 className='pb-4'>Your movie list is empty</h1>
      <button onClick={handleClick}>Add a new movie</button>
    </Container>
  );
}

export default Empty;
