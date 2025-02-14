import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const CustomerDetail = () => {
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let {id} = useParams();
  useEffect(() => {
    const fetchData = async() => {
    try {
      const response = await fetch(`http://localhost:9999/customer/${id}`);
    if(!response.ok){
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    setCustomer(result);
    } catch (error) {
      setError(error);
    }finally{
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
    <div className="container mt-4">
      <h2>{customer.name}</h2>
      <div className="row">
        <div className="col-8">
          <p>Số điện thoại: {customer.phone}</p>
          <p>Email: {customer.email}</p>
          <p>Địa chỉ: {customer.address}</p>
        </div>
      </div>
      <link to={`/customers/edit/${customer._id}`}>Sửa Thông Tin Khách Hàng</link>
      <Link to={`/customers`}>List Customer</Link>
    </div>
  );
};
export default CustomerDetail;
