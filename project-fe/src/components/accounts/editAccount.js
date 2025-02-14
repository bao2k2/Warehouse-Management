import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const EditAccount = () => {
  const { id } = useParams();
  const [account, setAccount] = useState({
    username: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    avatar: "",
    role_id: "",
  });

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/accounts/${id}`
        );
        setAccount(response.data);
      } catch (error) {
        console.error("Error fetching account:", error);
      }
    };

    fetchAccount();
  }, [id]);

  const handleChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9999/accounts/${id}`, account);
      // Redirect to account list page after successful update
      window.location.href = "/accounts";
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h2>Edit Account</h2>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4">
                <Form.Label>* Username:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={account.username}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4">
                <Form.Label>* Email:</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={account.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label>* Password:</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={account.password}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4">
                <Form.Label>* Date of Birth:</Form.Label>
                <Form.Control
                  required
                  type="date"
                  placeholder="Date of Birth"
                  name="dob"
                  value={account.dob}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label>* Gender:</Form.Label>
                <Form.Select
                  required
                  name="gender"
                  value={account.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4">
                <Form.Label>* Phone Number:</Form.Label>
                <Form.Control
                  required
                  type="tel"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={account.phoneNumber}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label>Avatar:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Avatar"
                  name="avatar"
                  value={account.avatar}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label>* Role ID:</Form.Label>
                <Form.Select
                  required
                  name="role_id"
                  value={account.role_id}
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  <option value="1">Admin</option>
                  <option value="2">In-Staff</option>
                  <option value="3">Out-Staff</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Button type="submit">Save</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditAccount;
