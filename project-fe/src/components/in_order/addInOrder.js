import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "../style/addInOrder.css";
import { Link } from "react-router-dom";

const InOrder = ({}) => {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/suppliers")
      .then((response) => setSuppliers(response.data))
      .catch((error) => console.error("Error fetching suppliers:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:9999/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  const [formData, setFormData] = useState({
    product: "",
    supplier: "",
    in_price: "",
    quantity_real: "",
    quantity_doc: "",
    staff: "",
    deliver: "",
    invoice: "",
  });

  const handleShow = (e) => {
    e.preventDefault();
    console.log(formData);
    var elements = document.getElementsByClassName("abc");
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "block";
      document.getElementById("input").style.display = "none";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    formData.staff = user._id;
    // formData.staff = "65e6d769df85978c2f625033";
    try {
      setSubmittedData((prevData) => [...prevData, formData]);
      console.log(formData);
      // formData.product = prod.id
      const response = await axios.post("http://localhost:9999/in", formData);
      const getProduct = await fetch(
        `http://localhost:9999/products/${formData.product}`
      );
      const product = await getProduct.json();
      product.quantity = +product.quantity + +formData.quantity_doc;
      console.log(product);
      const update = await axios.put(
        `http://localhost:9999/products/${formData.product}`,
        product
      );
      setFormData({
        product: "",
        supplier: "",
        in_price: "",
        quantity_real: "",
        quantity_doc: "",
        staff: "",
        deliver: "",
        invoice: "",
      });
    } catch (error) {
      console.error("Error adding inorder:", error);
    }
  };
  const [confirmation, setConfirmation] = useState(false);

  const handleCheckboxChange = (e) => {
    setConfirmation(e.target.checked);
  };
  return (
    <Container>
      <div className=" input" id="input">
        <h2>NHẬP ĐƠN HÀNG</h2>
        <Form onSubmit={handleShow}>
          <div className="form-group">
            <label htmlFor="inputName">Họ và tên người giao:</label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              name="deliver"
              value={formData.deliver}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputSupplier">Chọn nhà cung cấp:</label>
            <select
              id="supplier"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
            >
              {suppliers.map((supplier) => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="inputProductId">Chọn mã sản phẩm:</label>
            <select
              id="product"
              name="product"
              value={formData.product}
              onChange={handleChange}
            >
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.code}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="inputQuantity">Nhập số lượng:</label>
            <div className="row">
              <div className="col-3">
                <p>Theo chứng từ(*):</p>
                <input
                  type="number"
                  className="form-control"
                  id="inputQuantityDoc"
                  name="quantity_doc"
                  value={formData.quantity_doc}
                  onChange={handleChange}
                />
              </div>
              <div className="col-3">
                <p>Thực nhập(*):</p>
                <input
                  type="number"
                  className="form-control"
                  id="inputQuantityReal"
                  name="quantity_real"
                  value={formData.quantity_real}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPrice">Đơn giá</label>
            <input
              type="number"
              className="form-control"
              id="inputPrice"
              name="in_price"
              value={formData.in_price}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputInvoice">Số hóa đơn(*)"</label>
            <input
              type="text"
              className="form-control"
              id="inputInvoice"
              name="invoice"
              value={formData.invoice}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Hiện thị đơn hàng đã nhập
          </button>
        </Form>
      </div>
      <div className="abc" style={{ display: "none" }}>
        <h1>Phiếu Nhập Hàng</h1>
        <p>Người nhập: </p>
        <div className="row">
          <div className="col-6">
            <p>
              Họ và tên người giao: <span>{formData.deliver}</span>
            </p>
            <p>
              Theo hóa đơn số: <span>{formData.invoice}</span>
            </p>
          </div>
          <div className="col-6">
            <p>
              Địa chỉ kho: <span>...............</span>
            </p>
          </div>
        </div>
        <table>
          <thead className="thead">
            <tr>
              <th>Mã đơn</th>
              <th>Mã số, tên nhà cung cấp</th>
              <th>Mã số, tên sản phẩm</th>
              <th>Đơn vị tính</th>
              <th>Chứng từ</th>
              <th>Thực nhập</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{formData.supplier}</td>
              <td>{formData.product}</td>
              <td>Ống 10m</td>
              <td>{formData.quantity_doc}</td>
              <td>{formData.quantity_real}</td>
              <td>{formData.in_price}</td>
              <td>{formData.quantity_real * formData.in_price}</td>
            </tr>
          </tbody>
        </table>
        {/* <p>
        Thành tiền (bằng chữ): <b>Hai mươi triệu</b> đồng.
      </p> */}
      <input type="checkbox" name="confirmation" id="check" onChange={handleCheckboxChange}/>
      Tôi xin xác nhận thông tin và chịu hoàn toàn trách nhiệm.
      <br />
      <Link to="/in/all">
        Trở về
      </Link>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit} disabled={!confirmation}>
        Nhập
      </button>
    </div>
    </Container>
  );
};

export default InOrder;
