import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../style/createCustomer.css";
import { useParams, Link } from "react-router-dom";

const EditCustomer = ({ onUpdate }) => {
  const [partners, setPartners] = useState([]);
  let id = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:9999/customers")
      .then((response) => setPartners(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.put(
        `http://localhost:9999/customers/${id}`,
        formData
      );
      setFormData(response.data);
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
      });
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };
  return (
    <div className="container">
      <h2>Thay đổi thông tin khách hàng</h2>
      <form onSubmit={handleSubmit} className="row mt-4">
        <div className="form-group">
          <label>Tên khách hàng</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Số điện thoại khách hàng</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="phone"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Địa chỉ khách hàng</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button className="enter" type="submit">
          Lưu
        </button>
      </form>
    </div>
  );
};
export default EditCustomer;
