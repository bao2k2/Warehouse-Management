import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9999/products/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setProduct(result);
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
        {product.code} - {product.name}
      </h2>
      <Row>
        <Col md={4} sm={6} xs={12}>
          <img
            src={product.images[0].url}
            alt={product.images[0].caption}
            style={{ width: "400px" }}
          />
        </Col>
        <Col md={8} sm={6} xs={12}>
          <p>
            Nhà cung cấp: {product.supplier.code} - {product.supplier.name}
          </p>
          <p>Số lượng: {product.quantity}</p>
          <p>Kích thước: {product.size}</p>
          <h5>Giá:</h5>
          <Row>
            <Col md={6}>
              <p>Giá nhập: {product.in_price}</p>
            </Col>
            <Col md={6}>
              <p>Giá bán: {product.out_price}</p>
            </Col>
          </Row>
        </Col>
      </Row>
      <p>Mô tả:</p>
      <p>{product.description}</p>
      <Link to={`/products/edit/${product._id}`}>Sửa sản phẩm</Link>
      <br></br>
      <Link to="/products">Quay lại danh sách sản phẩm</Link>
    </Container>
  );
};

export default ProductDetail;
