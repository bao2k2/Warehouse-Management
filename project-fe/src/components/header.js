// Sidebar.js

import React, { useState } from "react";
import "./style/header.css"; // Import the CSS file

const Sidebar = () => {
  return (
    <div>
      <div id="mySidebar" className="sidebar" style={{ width: `200px` }}>
        <img
          src="https://png.pngtree.com/png-vector/20191017/ourlarge/pngtree-warehouse-inventory-line-icon-vector-png-image_1820365.jpg"
          style={{ width: `200px` }}
        ></img>
        <a href="http://localhost:3000/in">Nhập Kho</a>
        <a href="http://localhost:3000/in/all">Quản lý đơn nhập</a>
        <a href="http://localhost:3000/out">Xuất Kho</a>
        <a href="http://localhost:3000/out/all">Quản lý đơn xuất</a>
        <a href="http://localhost:3000/products">Quản lý sản phẩm</a>
        <a href="http://localhost:3000/suppliers">Quản lý nhà cung cấp</a>
        <a href="http://localhost:3000/customers">Quản lý khách hàng</a>
        <a href="http://localhost:3000/accounts">Quản lý tài khoản </a>
        <a href="http://localhost:3000/revenue">Quản lý doanh thu </a>
        <a href="http://localhost:3000/">Đăng xuất </a>
      </div>

      <div id="main" style={{ marginLeft: `${200}px` }}>
        <div className="Kql"> &#9776; KHO QUẢN LÝ HÀNG HÓA</div>
      </div>
    </div>
  );
};

export default Sidebar;
