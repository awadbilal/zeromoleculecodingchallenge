import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Dropzone from './DropZone';
import './style.css';

function Create( { type, link } ) {

  const navigate = useNavigate();
  const [movieInfo, setMovieInfo] = useState({
    name: "",
    publicationYear: "",
  });
  const [poster, setPoster] = useState(null);

  const handleChange = (e) => {
    setMovieInfo({
      ...movieInfo, 
      [e.target.name]: e.target.value
    });
  }

  const onDrop = useCallback(files => {
    setPoster(files[0]);
  }, []);

  const handleCancel = () => {
    navigate("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("data", movieInfo);
    formData.append("files.poster", poster, "file");
    console.log(formData.data);
    if(link) {
      axios.put("https://zm-movies-assignment.herokuapp.com/api/movies/9", formData)
      .then ((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else{
      console.log(formData);
      axios("https://zm-movies-assignment.herokuapp.com/api/movies", formData)
      .then ((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  return (
    <Container className="create">
      <h1>Create a new movie</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="info">
          <Col sm={12} md={5} lg={5}>
            <Dropzone onDrop={onDrop} accept={"image/*"} preview={poster} />
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
                <button type="button" onClick={handleCancel}>Cancel</button>
                <button type="submit" onClick={handleSubmit}>{type === "create" ? "Submit" : "Update"}</button>
              </span>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Create;
