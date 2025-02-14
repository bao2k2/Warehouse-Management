import React, { useState, useEffect } from "react";
import axios from "axios";

const MonthlyRevenue = () => {
  const [totalOutPrice, setTotalOutPrice] = useState(0);
  const [totalInPrice, setTotalInPrice] = useState(0);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      try {
        // Fetch total out price
        const outOrdersResponse = await axios.get(
          `http://localhost:9999/out/outorder/${year}/${month}`
        );
        const totalOut = outOrdersResponse.data.reduce(
          (acc, order) => acc + order.out_price * order.quantity_real,
          0
        );
        setTotalOutPrice(totalOut);

        // Fetch total in price
        const inOrdersResponse = await axios.get(
          `http://localhost:9999/in/inorder/${year}/${month}`
        );
        const totalIn = inOrdersResponse.data.reduce(
          (acc, order) => acc + order.in_price * order.quantity_real,
          0
        );
        setTotalInPrice(totalIn);
      } catch (error) {
        console.error("Error fetching monthly revenue:", error);
      }
    };

    // Fetch data only when year and month are provided
    if (year && month) {
      fetchMonthlyRevenue();
    }
  }, [year, month]);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <div>
      <b>Theo tháng:</b>
      <br></br>
      <br></br>
      <label htmlFor="year">Nhập năm: </label>{" "}
      <select value={year} onChange={handleYearChange}>
        <option value="">Chọn một năm</option>
        <option value="2010">2010</option>
        <option value="2011">2011</option>
        <option value="2012">2012</option>
        <option value="2013">2013</option>
        <option value="2014">2014</option>
        <option value="2015">2015</option>
        <option value="2016">2016</option>
        <option value="2017">2017</option>
        <option value="2018">2018</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
      </select>
      <br />
      <br />
      <label htmlFor="month">Nhập tháng: </label>{" "}
      <select value={month} onChange={handleMonthChange}>
        <option value="">Chọn một tháng</option>
        <option value="1">Tháng 1</option>
        <option value="2">Tháng 2</option>
        <option value="3">Tháng 3</option>
        <option value="4">Tháng 4</option>
        <option value="5">Tháng 5</option>
        <option value="6">Tháng 6</option>
        <option value="7">Tháng 7</option>
        <option value="8">Tháng 8</option>
        <option value="9">Tháng 9</option>
        <option value="10">Tháng 10</option>
        <option value="11">Tháng 11</option>
        <option value="12">Tháng 12</option>
      </select>
      <div style={{ paddingTop: "202px" }}>
        <hr></hr>
        <p>Tổng doanh thu: {totalOutPrice.toLocaleString()} VND</p>
        <p>Tổng tiền nhập hàng: {totalInPrice.toLocaleString()} VND</p>
        <p>
          Lợi nhuận tháng: {(totalOutPrice - totalInPrice).toLocaleString()} VND
        </p>
      </div>
    </div>
  );
};

export default MonthlyRevenue;
