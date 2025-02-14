import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/createCustomer.css";
const AddCustomer = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
    });
  };
  return (
    <div className="container">
      <h2>Thêm thông tin khách hàng</h2>
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
          Thêm mới
        </button>
      </form>
    </div>
  );
};
export default AddCustomer;
