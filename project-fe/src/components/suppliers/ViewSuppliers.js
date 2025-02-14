import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../style/viewSupplier.css";
import { Link } from "react-router-dom";

const SupplierInfo = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9999/suppliers");
        setSuppliers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter suppliers based on search term
  const filteredSuppliers = suppliers.filter((item) =>
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Thông tin các nhà cung cấp</h2>

      {/* Search input field */}
      <input
        type="text"
        placeholder="Tìm kiếm theo mã code"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table">
        <thead className="thead">
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Mã code</th>
            <th scope="col">Tên </th>
            <th scope="col">SDT</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Email</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredSuppliers.map((item, index) => (
            <tr className="tr" key={item._id}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/suppliers/${item._id}`}>{item.code}</Link>
              </td>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.address}</td>
              <td>{item.email}</td>
              <td>
                <button className="btn btn-update">
                  <Link
                    to={`/suppliers/edit/${item._id}`}
                    style={{ color: "white" }}
                  >
                    Sửa
                  </Link>
                </button>
                {/* <button className="btn btn-delete">Xóa</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/suppliers/add">
        <button className="btn btn-success ">Thêm nhà cung cấp</button>
      </Link>
    </div>
  );
};

export default SupplierInfo;
