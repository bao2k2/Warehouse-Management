import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/customerlist.css";
import { Link } from "react-router-dom";

const ListCustomer = () => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:9999/customers")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:9999/customers/${id}")
      .then(() => {
        setCustomers(customers.filter((customer) => customer.id !== id));
      })
      .catch((error) => console.error("Error deleting customer:", error));
  };
  return (
    <div className="container">
      <h2>Danh sách khách hàng</h2>
      <table className="table">
        <thead className="thead">
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Tên Khách Hàng</th>
            <th scope="col">SDT</th>
            <th scope="col">Email</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer._id}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/customers/${customer._id}`}>{customer.name}</Link>
              </td>
              <td>{customer.phone}</td>
              <td>{customer.email}</td>
              <td>{customer.address}</td>
              <td>
                {/* <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(customer._id)}
                >
                  Xóa
                </button> */}
                <button className="btn btn-update">
                  <Link
                    to={`/customers/edit/${customer._id}`}
                    style={{ color: "white" }}
                  >
                    Chỉnh Sửa
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-success">
        <Link to={"/customers/add"} style={{ color: "white" }}>
          Thêm Khách hàng mới
        </Link>
      </button>
    </div>
  );
};
export default ListCustomer;
