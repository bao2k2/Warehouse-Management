import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  localStorage.removeItem("user");
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {};

    formData["username"] = username;
    formData["password"] = password;

    const requiredFields = ["username", "password"];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9999/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // if (response.ok) {
      const responseData = await response.data;
      console.log("Login successful:", responseData);
      const user = responseData.existUser;
      localStorage.setItem("user", JSON.stringify(user));
      if (user) {
        const roleId = user.role_id;
        console.log("roleId ne: ", roleId);
        if (roleId === "2") {
          window.location.href = "/in";
        } else {
          if (roleId === "3") {
            window.location.href = "/out";
          } else {
            navigate("/products");
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center h-100">
      <div className="login-container">
        <h2 className="mb-4">Đăng nhập</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Tên đăng nhập:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Mật khẩu:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Đăng nhập
          </Button>
        </Form>
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </div>
    </Container>
  );
}
export default Login;
