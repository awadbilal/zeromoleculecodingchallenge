import React from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./style.css";

function Empty({ title, click, handler }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(handler);
  };

  return (
    <Container className="empty">
      <h1 className="pb-4">{title}</h1>
      <button onClick={handleClick}>{click}</button>
    </Container>
  );
}

export default Empty;
