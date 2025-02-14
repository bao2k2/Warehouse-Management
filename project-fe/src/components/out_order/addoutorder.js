import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "../style/addInOrder.css";
import { Link } from "react-router-dom";

const OutOrder = ({}) => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/customers")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:9999/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  const [formData, setFormData] = useState({
    product: "",
    customer: "",
    out_price: "",
    quantity_real: "",
    quantity_doc: "",
    staff: "",
    receiver: "",
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
    try {
      setSubmittedData((prevData) => [...prevData, formData]);
      console.log(formData);
      // formData.product = prod.id
      const response = await axios.post("http://localhost:9999/out", formData);

      const getProduct = await fetch(
        `http://localhost:9999/products/${formData.product}`
      );
      const product = await getProduct.json();
      product.quantity = +product.quantity - +formData.quantity_doc;
      console.log(product);
      const update = await axios.put(
        `http://localhost:9999/products/${formData.product}`,
        product
      );

      setFormData({
        product: "",
        customer: "",
        out_price: "",
        quantity_real: "",
        quantity_doc: "",
        staff: "",
        receiver: "",
        invoice: "",
      });
    } catch (error) {
      console.error("Error adding outorder:", error);
    }
  };
  const [confirmation, setConfirmation] = useState(false);

  const handleCheckboxChange = (e) => {
    setConfirmation(e.target.checked);
  };
  return (
    <Container>
    <div className=" input" id="input">
      <h2>XUẤT ĐƠN HÀNG</h2>
      <Form onSubmit={handleShow}>
        <div className="form-group">
          <label htmlFor="inputName">Họ và tên người nhận:</label>
          <input type="text" className="form-control" id="inputName" name="receiver" value={formData.receiver} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="inputCustomer">Chọn khách hàng:</label>
          <select
            id="customer"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
          >
            {customers.map((customer) => (
              <option key={customer._id} value={customer._id}>
                {customer.name}
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
          <input type="number" className="form-control" id="inputPrice" name="out_price" value={formData.out_price} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="inputInvoice">Số hóa đơn(*)"</label>
          <input type="text" className="form-control" id="inputInvoice" name="invoice" value={formData.invoice} onChange={handleChange}/>
        </div>
       
        <button type="submit" className="btn btn-primary">
          Hiện thị đơn hàng chuẩn bị xuất
        </button>
      </Form>
    </div>
    <div className="abc" style={{display:"none"}}>
      <h1>XUẤT ĐƠN HÀNG</h1>
      <p>Người nhập: </p>
      <div className="row">
        <div className="col-6">
          <p>
            Họ và tên người nhận: <span>{formData.customer}</span>
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
            <td>{formData.customer}</td>
            <td>{formData.product}</td>
            <td>Ống 10m</td>
            <td>{formData.quantity_doc}</td>
            <td>{formData.quantity_real}</td>
            <td>{formData.out_price}</td>
            <td>{formData.quantity_real * formData.out_price}</td>
          </tr>
        </tbody>
      </table>
      {/* <p>
        Thành tiền (bằng chữ): <b>Hai mươi triệu</b> đồng.
      </p> */}
        <input
          type="checkbox"
          name="confirmation"
          id="check"
          onChange={handleCheckboxChange}
        />
        Tôi xin xác nhận thông tin và chịu hoàn toàn trách nhiệm.
        <br />
        <Link to="/out/all">Trở về</Link>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={!confirmation}
        >
          Xuất
        </button>
      </div>
    </Container>
  );
};

export default OutOrder;