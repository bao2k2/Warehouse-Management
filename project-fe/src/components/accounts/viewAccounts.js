import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Button, Table, Form, Container } from "react-bootstrap";
import { format } from "date-fns";
import "../style/accountList.css";

const ListAccount = () => {
  const [accounts, setAccounts] = useState([]);
  const [showPasswordId, setShowPasswordId] = useState(false);
  const togglePasswordVisibility = (id) => {
    setShowPasswordId(showPasswordId === id ? null : id);
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/accounts`);
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9999/accounts/${id}`);
      // Update the accounts state after deletion
      setAccounts((prevAccounts) =>
        prevAccounts.filter((account) => account._id !== id)
      );
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      const response = await axios.put(`/accounts/${id}`, updatedData);
      // Update the accounts state after editing
      setAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account._id === id ? response.data : account
        )
      );
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  return (
    <Container>
      <h3 className="text-center">Danh sách tài khoản</h3>
      <Col xs="12">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="text-center">Username</th>
              <th className="text-center">Email</th>
              <th className="text-center">Password</th>
              <th className="text-center">Ngày Sinh</th>
              <th className="text-center">Giới tính</th>
              <th className="text-center">Số điện thoại</th>
              <th className="text-center">Avatar</th>
              <th className="text-center">Role ID</th>
              <th className="text-center">Tháo tác</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account._id}>
                <td>{account.username}</td>
                <td>{account.email}</td>
                <td>
                  {showPasswordId === account._id
                    ? account.password
                    : "*******"}
                  <Button
                    variant="link"
                    onClick={() => togglePasswordVisibility(account._id)}
                  >
                    <FontAwesomeIcon
                      icon={showPasswordId === account._id ? faEyeSlash : faEye}
                    />
                  </Button>
                </td>
                <td>{format(new Date(account.dob), "dd-MM-yyyy")}</td>
                <td>{account.gender}</td>
                <td>{account.phoneNumber}</td>
                <td>{account.avatar}</td>
                <td>{account.role_id}</td>
                <td>
                  <Button>
                    <NavLink
                      to={`/accounts/edit/${account._id}`}
                      style={{ color: "white" }}
                    >
                      Sửa
                    </NavLink>
                  </Button>

                  <Button
                    style={{ backgroundColor: "#ce463c", color: "white" }}
                    className="delete-button"
                    onClick={() => handleDelete(account._id)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
          Role_Id: 1-admin, 2-nhân viên nhập hàng, 3-nhân viÊN xuất hàng
        </div>
        <Button>
          <NavLink to={`/accounts/add`} style={{ color: "white" }}>
            Thêm tài khoản
          </NavLink>
        </Button>
      </Col>
    </Container>
  );
};

export default ListAccount;
