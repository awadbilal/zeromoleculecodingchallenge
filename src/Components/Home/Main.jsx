import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";

function Main({ movies }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create-movie");
  };
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Container className="main pt-5 pb-5 main">
      <Row className="mt-5 mb-5 align-items-center align-content-center justify-content-between">
        <Col auto className="pl-2 text-start">
          <h1>
            My Movies
            <button onClick={handleClick} className="add">
              <IoIosAddCircleOutline size="2rem" />
            </button>
          </h1>
        </Col>
        <Col auto className="pr-2 text-end">
          <span style={{ cursor: "pointer" }}>
            <b>
              Logout
              <button onClick={handleLogout} className="add">
                <FiLogOut size="1.5rem" />
              </button>
            </b>
          </span>
        </Col>
      </Row>
      <Row sm={12} md={12} lg={12} className="row-eq-height">
        {movies &&
          movies.map((item) => {
            return <MovieCard info={item} />;
          })}
      </Row>
    </Container>
  );
}

export default Main;
