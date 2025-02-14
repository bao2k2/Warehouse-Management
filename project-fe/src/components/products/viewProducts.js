import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/viewProducts.css";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:9999/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:9999/products/${id}`)
      .then(() => {
        // Remove the deleted product from the list
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => console.error("Error deleting product:", error));
  };
  const filtered = products.filter((item) =>
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Container>
      <h2>Danh sách sản phẩm trong kho</h2>
      {/* Search input field */}
      <input
        type="text"
        placeholder="Tìm kiếm theo mã code"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Code</th>
            <th>Tên</th>
            <th>Nhà Cung Cấp</th>
            <th>Kích thước</th>
            <th>Chất liệu</th>
            <th>Số lượng</th>
            <th>Giá nhập</th>
            <th>Giá bán</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((product, index) => (
            <tr key={product.id}>
              <td>
                <Link to={`/products/${product._id}`}>{product.code}</Link>
              </td>
              <td>{product.name}</td>
              <td>{product.supplier.name}</td>
              <td>{product.size}</td>
              <td>{product.material}</td>
              <td>{product.quantity}</td>
              <td>{product.in_price}</td>
              <td>{product.out_price}</td>
              <td>
                <Button
                  className="bt"
                  variant="danger"
                  onClick={() => handleDelete(product._id)}
                >
                  Xóa
                </Button>
                <Button className="bt" variant="danger">
                  <Link
                    to={`/products/edit/${product._id}`}
                    style={{ color: "white" }}
                  >
                    Cập nhật
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button>
        <Link to={"/products/add"} style={{ color: "white" }}>
          Thêm sản phẩm mới
        </Link>
      </Button>
    </Container>
  );
};

export default ListProduct;
