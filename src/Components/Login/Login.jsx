import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Alert } from "react-bootstrap";
import axios from "axios";
import "./style.css";

function Login() {

  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  // Making the warning message disappear after 10 seconds
  useEffect(() => {
    const timeId = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => {
      clearTimeout(timeId)
    }
  }, [isVisible]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://zm-movies-assignment.herokuapp.com/api/auth/local",
        formData
      )
      .then((res) => {
        if(res.status === 200) {
          console.log(res);
          sessionStorage.setItem('user', res.data.user);
          sessionStorage.setItem('token', res.data.jwt);
          navigate("/");
        };
      })
      .catch((err) => {
        setTimeout(() => {
          setIsVisible(true);
        }, 3000);
        console.log(err);
      });
  };

  return (
    <Container className="login">
      <h1 className="pb-4">Sign in</h1>
      {
        isVisible ? <Alert variant="danger">Incorrect username or password</Alert> : ""
      }
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Control
            type="email"
            name="identifier"
            placeholder="Email"
            onChange={handleChange}
            value={formData.identifier}
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember Me" />
        </Form.Group>
        <button type="submit">Log in</button>
      </Form>
    </Container>
  );
}

export default Login;
