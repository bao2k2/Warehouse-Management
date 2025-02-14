import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../style/supplierDetail.css";

const SupplierDetail = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    const fetchSupplierDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/suppliers/${id}`);
        setSupplier(response.data);
      } catch (error) {
        console.error('Error fetching supplier detail:', error);
      }
    };

    fetchSupplierDetail();
  }, [id]);

  if (!supplier) {
    return <div>Loading...</div>;
  }

  return (
    <div className="supplier-detail">
      <img src={supplier.logo[0].url} alt="Logo" className="logo" />
      <div className="supplier-info">
        <h2>Thông tin chi tiết nhà cung cấp</h2>
        <p><strong>Mã code:</strong> {supplier.code}</p>
        <p><strong>Tên công ty:</strong> {supplier.name}</p>
        <p><strong>Địa chỉ:</strong> {supplier.address}</p>
        <p><strong>Số điện thoại:</strong> {supplier.phone}</p>
        <p><strong>Email:</strong> {supplier.email}</p>
        <p><strong>Website:</strong> <a href={supplier.website} target="_blank" rel="noopener noreferrer">{supplier.website}</a></p>
        <p><strong>Mô tả:</strong> {supplier.description}</p>
      </div>
    </div>
  );
};

export default SupplierDetail;