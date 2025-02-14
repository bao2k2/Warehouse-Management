import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Table } from "react-bootstrap";
import { format, formatDate } from 'date-fns';
import "../style/detailInOrder.css";
const InOrderDetail = () => {
  const [inOrder, setInOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
  let { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9999/in/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setInOrder(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <Container>
     <h1 style={{textAlign: 'center'}}>Thông tin đơn hàng</h1><br></br>

     <Table>
  <tbody>
    <tr>
      <td colSpan={2} className="border-cell">
        <Row>
          <Col md={5} sm={6} xs={12}>
            <h2>{inOrder.product.name} - {inOrder.product.code}</h2>
            <img src={inOrder.product.images[0].url} alt={inOrder.product.images[0].caption} />
          </Col>
          <Col md={7} sm={6} xs={12}>
            <h2>Nhà cung cấp: {inOrder.supplier.code} - {inOrder.supplier.name}</h2>
            <img src={inOrder.supplier.logo[0].url} alt={inOrder.supplier.logo[0].caption}/>
          </Col>
        </Row>
      </td>
    </tr>
    <tr>
      <td colSpan={2}>
        <Table striped bordered hover>
          <tbody>
          <tr>
              <td>Địa chỉ nhà cung cấp:</td>
              <td>{inOrder.supplier.address}</td>
            </tr>
            <tr>
              <td>Số điện thoại:</td>
              <td>{inOrder.supplier.phone}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{inOrder.supplier.email}</td>
            </tr>
            <tr>
              <td>Link website:</td>
              <td><a href={inOrder.supplier.website} target="_blank" rel="noopener noreferrer">{inOrder.supplier.website}</a></td>
            </tr>
            <tr>
              <td>Giá nhập vào:</td>
              <td>{inOrder.in_price} đồng</td>
            </tr>
            <tr>
              <td>Chứng từ:</td>
              <td>{inOrder.quantity_doc} cái</td>
            </tr>
            <tr>
              <td>Thực nhập:</td>
              <td>{inOrder.quantity_real} cái</td>
            </tr>
            <tr>
              <td>Người giao:</td>
              <td>{inOrder.deliver}</td>
            </tr>
            <tr>
              <td>Số hóa đơn:</td>
              <td>{inOrder.invoice}</td>
            </tr>
            <tr>
              <td>Thời gian nhập đơn hàng:</td>
              <td>{formatDate(inOrder.createdAt)}</td>
            </tr>
          </tbody>
        </Table>
      </td>
    </tr>
  </tbody>
</Table>

      <br/>
      <p>Mô tả:</p>
      <p>{inOrder.product.description}</p>
      <p>{inOrder.supplier.description}</p>
      <button className="btn btn-primary">
  <Link to={`/in/edit/${inOrder._id}`} className="text-white font-weight-bold text-uppercase">Sửa phiếu nhập hàng</Link>
</button>
<button className="btn btn-primary">
  <Link to="/in/all" className="text-white font-weight-bold text-uppercase">Quay lại danh sách sản phẩm</Link>
</button>


    </Container>
  );
};

export default InOrderDetail;