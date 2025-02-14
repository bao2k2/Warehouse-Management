import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "../style/createProduct.css";
import { useParams, Link } from "react-router-dom";

const UpdateProduct = ({ onUpdate }) => {
  const [partners, setPartners] = useState([]);
  const [image, setImage] = useState({
    url: "data:image/png;base64,",
    caption: "",
  });
  let { id } = useParams();
  const [base64Data, setBase64Data] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64String = e.target.result.split(",")[1];
      setBase64Data(base64String);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    axios
      .get("http://localhost:9999/suppliers")
      .then((response) => setPartners(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    images: [],
    description: "",
    quantity: "",
    size: "",
    material: "",
    in_price: "",
    out_price: "",
  });
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9999/products/${id}`
        );
        const product = response.data;
        setFormData({
          code: product.code,
          name: product.name,
          images: product.images,
          description: product.description,
          quantity: product.quantity,
          size: product.size,
          material: product.material,
          in_price: product.in_price,
          out_price: product.out_price,
        });
      } catch (error) {
        console.error("Error fetching supplier detail:", error);
      }
    };

    fetchDetail();
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    image.url = image.url + base64Data;
    image.caption = formData.name;
    formData.images[0] = image;
    try {
      console.log(formData);
      const response = await axios.put(
        `http://localhost:9999/products/${id}`,
        formData
      );
      setFormData(response.data);
      setFormData({
        images: [],
        description: "",
        quantity: "",
        size: "",
        material: "",
        in_price: "",
        out_price: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Container>
      <h2>Thay đổi thông tin sản phẩm</h2>
      <h2>
        Code:{formData.code}-{formData.name}
      </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="image">
          <Form.Label>Ảnh:</Form.Label>
          <input
            type="file"
            className="file"
            onChange={handleFileInputChange}
          />
          {base64Data && (
            <div className="base">
              <p>Base64 Encoded Data:</p>
              <textarea value={base64Data} readOnly />
            </div>
          )}
        </Form.Group>
        <Form.Group controlId="supplier">
          <Form.Label>Nhà cung cấp:</Form.Label>

          <select
            id="supplier"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
          >
            {partners.map((supplier) => (
              <option key={supplier._id} value={supplier._id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group controlId="size">
              <Form.Label>Kích thước:</Form.Label>
              <Form.Control
                type="text"
                name="size"
                placeholder="Nhập kích thước của sản phẩm"
                value={formData.size}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="material">
              <Form.Label>Chất liệu:</Form.Label>
              <Form.Control
                type="text"
                name="material"
                placeholder="Nhập chất liệu sản phẩm"
                value={formData.material}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group controlId="quantity">
              <Form.Label>Số lượng:</Form.Label>
              <Form.Control
                type="text"
                name="quantity"
                placeholder="Nhập số lượng sản phẩm"
                value={formData.quantity}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="in_price">
              <Form.Label>Giá nhập:</Form.Label>
              <Form.Control
                type="text"
                name="in_price"
                placeholder="Nhập giá nhập của sản phẩm"
                value={formData.in_price}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="out_price">
              <Form.Label>Giá bán:</Form.Label>
              <Form.Control
                type="text"
                name="out_price"
                placeholder="Nhập giá bán của sản phẩm"
                value={formData.out_price}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="description">
          <Form.Label>Mô tả:</Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder="Thêm mô tả"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Lưu
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateProduct;
