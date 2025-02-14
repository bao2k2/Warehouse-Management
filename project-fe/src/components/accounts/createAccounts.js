import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Col, Container } from "react-bootstrap";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    avatar: "",
    role_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/accounts", formData);
      console.log("New account created:", response.data);
      // Optionally, you can redirect to another page or perform additional actions after successful account creation
    } catch (error) {
      console.error("Error creating account:", error.response.data.message);
    }
  };

  return (
    <Container>
      <h2>Create Account</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Col} controlId="formGridUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridDOB">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            {/* Add other gender options as needed */}
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridAvatar">
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridRoleID">
          <Form.Label>Role ID</Form.Label>
          <Form.Control
            as="select"
            name="role_id"
            value={formData.role_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="1">Admin</option>
            <option value="2">In-Staff</option>
            <option value="3">Out-Staff</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
    </Container>
  );
};

export default CreateAccount;
