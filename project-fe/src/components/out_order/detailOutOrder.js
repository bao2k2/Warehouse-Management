import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Table } from "react-bootstrap";
import { format, formatDate } from 'date-fns';
import "../style/detailInOrder.css";
const OutOrderDetail = () => {
  const [outOrder, setOutOrder] = useState(null);
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
        const response = await fetch(`http://localhost:9999/out/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setOutOrder(result);
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
      <h2>
        {outOrder.product.name} - {outOrder.product.code}
      </h2>
      <Row>
        <Col md={12} sm={6} xs={12}>
       
  <img src={outOrder.product.images[0].url} alt={outOrder.product.images[0].caption} />


        </Col>
        
      </Row>
      <Row>
      <Table striped bordered hover>
  <tbody>
    <tr>
      <td>Tên Khách hàng:</td>
      <td>{outOrder.customer.name}</td>
      </tr>
    <tr>
      <td>Số điện thoại:</td>
      <td>{outOrder.customer.phone}</td>
    </tr>
    <tr>
      <td>Địa chỉ khách hàng:</td>
      <td>{outOrder.customer.address}</td>
    </tr>
    <tr>
      <td>Email:</td>
      <td>{outOrder.customer.email}</td>
    </tr>
    <tr>
      <td>Giá xuất đi:</td>
      <td>{outOrder.out_price} đồng</td>
    </tr>
    <tr>
      <td>Chứng từ:</td>
      <td>{outOrder.quantity_doc} cái</td>
    </tr>
    <tr>
      <td>Thực nhập:</td>
      <td>{outOrder.quantity_real} cái</td>
    </tr>
    <tr>
      <td>Người nhận:</td>
      <td>{outOrder.receiver}</td>
    </tr>
    <tr>
      <td>Số hóa đơn:</td>
      <td>{outOrder.invoice}</td>
    </tr>
    <tr>
      <td>Thời gian nhập đơn hàng:</td>
      <td>{formatDate(outOrder.createdAt)}</td>
    </tr>
  </tbody>
</Table>

      </Row>
      <br/>
      <p>Mô tả:</p>
      <p>{outOrder.product.description}</p>
      
      <button className="btn btn-primary"><Link to={`/out/edit/${outOrder._id}`} className="text-white font-weight-bold text-uppercase"style={{textDecoration: 'none'}}>Sửa phiếu xuất hàng</Link></button>
      <button class="btn btn-primary"><Link to={"/out/all"}  className="text-white font-weight-bold text-uppercase"style={{textDecoration: 'none'}}>Quay lại danh sách sản phẩm</Link></button>
    </Container>
  );
};

export default OutOrderDetail;