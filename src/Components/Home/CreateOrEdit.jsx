import React, { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";
import Dropzone from "./DropZone";
import Empty from "./Empty";
import "./style.css";

function Create({ type, link, data = null }) {
  const navigate = useNavigate();
  const [movieInfo, setMovieInfo] = useState({
    name: data ? data.name : "",
    publicationYear: data ? data.publicationYear : "",
  });
  const [poster, setPoster] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (e) => {
    setMovieInfo({
      ...movieInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onDrop = useCallback((files) => {
    setPoster(files[0]);
  }, []);

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("data", JSON.stringify(movieInfo));
    !data && formData.append("files.poster", poster, "file");

    if (link) {
      axios
        .put(
          `https://zm-movies-assignment.herokuapp.com/api/movies/${link}`,
          formData
        )
        .then((res) => {
          if (res.status === 200) setIsVisible(!isVisible);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post("https://zm-movies-assignment.herokuapp.com/api/movies", formData)
        .then((res) => {
          if (res.status === 200) setIsVisible(!isVisible);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Container className="create">
      {isVisible ? (
        <Empty
          title="Your movie has been added"
          click="Go to movies page"
          handler="/"
        />
      ) : (
        <div>
          <h1>{type === "create" ? "Create a new movie" : "Edit"}</h1>
          <Form onSubmit={handleSubmit}>
            <Row className="info">
              <Col sm={12} md={5} lg={5}>
                {data ? (
                  <img src={data.poster.data.attributes.url} alt={data.name} />
                ) : (
                  <Dropzone
                    onDrop={onDrop}
                    accept={"image/*"}
                    preview={poster}
                  />
                )}
              </Col>
              <Col sm={12} md={6} lg={6} className="movie">
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Title"
                    onChange={handleChange}
                    value={movieInfo.name}
                  />
                </Form.Group>
                <Form.Group className="mb-5">
                  <Form.Control
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    name="publicationYear"
                    placeholder="Publishing year"
                    onChange={handleChange}
                    value={movieInfo.publicationYear}
                  />
                </Form.Group>
                <Form.Group className="mb-5 bt-5">
                  <span>
                    <button type="button" onClick={handleCancel}>
                      Cancel
                    </button>
                    <button type="submit" onClick={handleSubmit}>
                      {type === "create" ? "Submit" : "Update"}
                    </button>
                  </span>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </div>
      )}
    </Container>
  );
}

export default Create;
