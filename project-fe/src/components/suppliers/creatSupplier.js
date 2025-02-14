import React, { useState } from "react";
import axios from "axios";
import "../style/createSupplier.css";

const CreateSupplier = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    logo: [],
    description: "",
    phone: "",
    address: "",
    email: "",
    website: "",
  });
  const [image, setImage] = useState({
    url: "data:image/png;base64,",
    caption: "",
  });

  const [base64Data, setBase64Data] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64String = e.target.result.split(",")[1];
      setBase64Data(base64String);
    };

    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    image.url = image.url + base64Data;
    image.caption = formData.name;
    formData.logo[0] = image;
    try {
      await axios.post("http://localhost:9999/suppliers", formData);
      alert("Supplier created successfully!");
      // Clear form data
      setFormData({
        code: "",
        name: "",
        logo: [],
        description: "",
        phone: "",
        address: "",
        email: "",
        website: "",
      });
      onAdd(); // Trigger parent component to update
    } catch (error) {
      console.error("Error creating supplier:", error);
      alert("Error creating supplier. Please try again!");
    }
  };

  return (
    <div className="container">
      <h2>Create Supplier</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="code">Code:</label>
          <input
            type="text"
            className="form-control"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="logo">Logo:</label>
          <input
            type="file"
            className="form-control"
            id="logo"
            name="logo"
            onChange={handleFileInputChange}
            required
          />
          {base64Data && (
            <div className="base">
              <p>Base64 Encoded Data:</p>
              <textarea value={base64Data} readOnly />
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="website">Website:</label>
          <input
            type="text"
            className="form-control"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateSupplier;
