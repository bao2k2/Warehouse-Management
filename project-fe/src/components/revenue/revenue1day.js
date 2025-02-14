import React, { useState, useEffect } from "react";
import axios from "axios";
import CalendarComponent from "./calender";
import { Row, Col } from "react-bootstrap";
import Month from "./revenue1month";
const DailyRevenue = () => {
  const [totalOutPrice, setTotalOutPrice] = useState(0);
  const [totalInPrice, setTotalInPrice] = useState(0);
  const [dailyProfit, setDailyProfit] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchDailyOrders = async () => {
      try {
        // Get the timezone offset in minutes
        const timezoneOffset = selectedDate.getTimezoneOffset();

        // Adjust the selected date by subtracting the timezone offset
        const adjustedDate = new Date(
          selectedDate.getTime() - timezoneOffset * 60000
        );

        // Convert the adjusted date to ISO string in local time zone
        const formattedDate = adjustedDate.toISOString().split("T")[0];

        // Make API requests using the formatted date
        const [outOrdersResponse, inOrdersResponse] = await Promise.all([
          axios.get(`http://localhost:9999/out/outorder/${formattedDate}`),
          axios.get(`http://localhost:9999/in/inorder/${formattedDate}`),
        ]);

        const totalOut = outOrdersResponse.data.reduce(
          (acc, order) => acc + order.out_price * order.quantity_real,
          0
        );
        setTotalOutPrice(totalOut);

        const totalIn = inOrdersResponse.data.reduce(
          (acc, order) => acc + order.in_price * order.quantity_real,
          0
        );
        setTotalInPrice(totalIn);

        setDailyProfit(totalOut - totalIn);
      } catch (error) {
        console.error("Error fetching daily orders:", error);
      }
    };

    fetchDailyOrders();
  }, [selectedDate]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="container">
      <h1>Doanh thu</h1>
      <Row>
        <div className="col-5">
          <b>Theo ngày:</b>
          <CalendarComponent onDateSelect={handleDateSelect} />
          <br></br>
          <hr></hr>
          <p>Tổng doanh thu: {totalOutPrice.toLocaleString()} VND</p>
          <p>Tổng tiền nhập hàng: {totalInPrice.toLocaleString()} VND</p>
          <p>Lợi nhuận: {dailyProfit.toLocaleString()} VND</p>
        </div>
        <Col>
          <Month />
        </Col>
      </Row>
    </div>
  );
};

export default DailyRevenue;
