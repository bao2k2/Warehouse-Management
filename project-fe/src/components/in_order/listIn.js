
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/viewProducts.css";
import { format, formatDate } from 'date-fns';

const ListInOrder = () => {
  const [inOrders, setInOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  

  useEffect(() => {
    axios
      .get("http://localhost:9999/in")
      .then((response) => setInOrder(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:9999/in/${id}`)
      .then(() => {
        // Remove the deleted product from the list
        setInOrder(inOrders.filter((product) => product.id !== id));
      })
      .catch((error) => console.error("Error deleting product:", error));
  };
  const filteredResults = inOrders.filter(item =>
    (item.product && item.product.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (item.supplier && item.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()))||
    (item.createdAt.includes(searchTerm))
);
const formatDate = (dateString) => {
  // Kiểm tra xem dateString có tồn tại và không phải là null hoặc undefined
  if (dateString) {
    // Tạo đối tượng Date từ chuỗi ngày tháng
    const dateObject = new Date(dateString);
    // Kiểm tra xem dateObject có hợp lệ không
    if (!isNaN(dateObject.getTime())) {
      // Trả về chuỗi đã định dạng
      return format(dateObject, 'dd-MM-yyyy');
    }
  }
  // Trả về chuỗi rỗng nếu không thể định dạng
  return '';
};


  return (
    <Container>
      <h2>Danh sách sản phẩm trong kho</h2>
      <input
        type="text"
        placeholder="Tìm kiếm theo tên sản phẩm, nhà cung cấp..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Nhà Cung Cấp</th>
            <th>Giá nhập</th>
            <th>Chứng từ</th>
            <th>Thực nhập</th>
            <th>Hóa đơn</th>
            <th>Ngày nhập</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.map((product, index) => (
            <tr key={product.id}>

              
              <td><Link to={`/in/${product._id}`}>{product.product.name}</Link></td>

              <td>{product.supplier.name}</td>
              <td>{product.in_price}</td>
              <td>{product.quantity_real}</td>
              <td>{product.quantity_doc}</td>
              <td>{product.invoice}</td>
              <td>{formatDate(product.createdAt)}</td>  
              <td>
                <Button
                   style={{ backgroundColor: "#ce463c", color: "white" }}
                   className="delete-button"
                  onClick={() => handleDelete(product._id)}
                >
                  Xóa
                </Button>
                <Button className="bt">
                  <Link
                    to={`/in/edit/${product._id}`}
                    style={{ color: "white" }}
                  >
                    Sửa
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button>
        <Link to={"/in"} style={{ color: "white" }}>
          Thêm đơn nhập hàng mới
        </Link>
      </Button>
    </Container>
  );
};

export default ListInOrder;
