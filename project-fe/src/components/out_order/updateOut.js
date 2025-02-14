import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import { useParams } from "react-router-dom";
const UpdateOutOrder = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    out_price: "",
    quantity_real: "",
    quantity_doc: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchOutDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/out/${id}`);
        const outorder = response.data;
        setFormData({
            out_price: outorder.out_price,
            quantity_real: outorder.quantity_real,
            quantity_doc: outorder.quantity_doc,

        });
      } catch (error) {
        console.error("Error fetching supplier detail:", error);
      }
    };

    fetchOutDetail();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9999/out/${id}`, formData);
      onSubmit(formData);
      alert("Cập nhật xuất đơn hàng thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật xuất đơn hàng:", error);
      alert("Cập nhật đơn hàng thành công!");
    }
  };

  return (
    <div className="container">
      <h2>Cập nhật thông tin đơn hàng</h2>
      <form onSubmit={handleSubmit} className="row mt-4">
        <div className="form-group">
          <label>Đơn giá mới:" </label>
          <input
            type="number"
            name="out_price"
            value={formData.out_price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Chứng từ</label>
          <input
            type="number"
            name="quantity_doc"
            value={formData.quantity_doc}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Thực tế</label>
          <input
            type="number"
            name="quantity_real"
            value={formData.quantity_real}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button className="enter">Lưu</button>
      </form>
    </div>
  );
};

export default UpdateOutOrder;