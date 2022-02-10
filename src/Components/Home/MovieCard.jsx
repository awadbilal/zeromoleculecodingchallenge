import React from "react";
import { Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.css";

function MovieCard({ info }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(
      `/${info.attributes.name.toLowerCase().replace(/ /g, "-")}${info.id}`
    );
  };

  return (
    <Col sm={12} md={4} lg={3} className="movie mb-5">
      <Card
        style={{ width: "18rem" }}
        onClick={handleClick}
        className="movieCard"
      >
        <Card.Img
          variant="top"
          src={info.attributes.poster.data.attributes.url}
        />
        <Card.Body>
          <Card.Title>{info.attributes.name}</Card.Title>
          <Card.Text>{info.attributes.publicationYear}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default MovieCard;
