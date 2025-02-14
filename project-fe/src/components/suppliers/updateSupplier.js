import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/updateSupplier.css";
import { useParams } from "react-router-dom";
const UpdateSupplier = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    phone: "",
    address: "",
    email: "",
    website: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchSupplierDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/suppliers/${id}`
        );
        const supplier = response.data;
        setFormData({
          name: supplier.name,
          code: supplier.code,
          description: supplier.description,
          phone: supplier.phone,
          address: supplier.address,
          email: supplier.email,
          website: supplier.website,
        });
      } catch (error) {
        console.error("Error fetching supplier detail:", error);
      }
    };

    fetchSupplierDetail();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9999/suppliers/${id}`, formData);
      onSubmit(formData);
      alert("Cập nhật nhà cung cấp thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật nhà cung cấp:", error);
      alert("Cập nhật nhà cung cấp thành công!");
    }
  };

  return (
    <div className="container">
      <h2>Cập nhật thông tin nhà cung cấp</h2>
      <form onSubmit={handleSubmit} className="row mt-4">
        <div className="form-group">
          <label>Tên:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Code:</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Miêu tả:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group col-6">
          <label>SĐT:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group col-6">
          <label>Địa chỉ:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Website:</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button className="enter">Lưu</button>
      </form>
    </div>
  );
};

export default UpdateSupplier;
