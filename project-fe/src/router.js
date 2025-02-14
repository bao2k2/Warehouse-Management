import Login from "./components/Login";
import InOrder from "./components/in_order/addInOrder";
import ListOutOrder from "./components/out_order/listOut";
import OutOrder from "./components/out_order/addoutorder";
import ListInOrder from "./components/in_order/listIn";
import AddProduct from "./components/products/createProducts";
import UpdateProduct from "./components/products/updateProducts";
import ProductDetail from "./components/products/viewProductDetail";
import ListProduct from "./components/products/viewProducts";
import ListCustomer from "./components/customers/customerlist";
import EditCustomer from "./components/customers/updateCustomer";
import CustomerDetail from "./components/customers/customerDetail";
import ListAccount from "./components/accounts/viewAccounts";
import AddAccount from "./components/accounts/createAccounts";
import EditAccount from "./components/accounts/editAccount";
import AddCustomer from "./components/customers/createCustomer";
import SupplierDetail from "./components/suppliers/supplierDetail";
import UpdateSupplier from "./components/suppliers/updateSupplier";
import SupplierInfo from "./components/suppliers/ViewSuppliers";
import CreateSupplier from "./components/suppliers/creatSupplier";
import EditOutOrder from "./components/out_order/updateOut";
import NotFound from "./components/notfound";
import UpdateInOrder from "./components/in_order/updateIn";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import DailyRevenue from "./components/revenue/revenue1day";
import InDetail from "./components/in_order/detailInOrder";
import OutDetail from "./components/out_order/detailOutOrder";
function router() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const roleId = user.role_id;
    console.log(user);
    if (roleId === "1") {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/in" element={<InOrder />} />
            <Route path="/in/:id" element={<InDetail />} />
            <Route path="/in/all" element={<ListInOrder />} />
            <Route path="/in/edit/:id" element={<UpdateInOrder />} />
            <Route path="/out" element={<OutOrder />} />
            <Route path="/out/all" element={<ListOutOrder />} />
            <Route path="/out/edit/:id" element={<EditOutOrder />} />
            <Route path="/out/:id" element={<OutDetail />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products" element={<ListProduct />} />
            <Route path="/products/edit/:id" element={<UpdateProduct />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/accounts" element={<ListAccount />} />
            <Route path="/accounts/add" element={<AddAccount />} />
            <Route path="/accounts/edit/:id" element={<EditAccount />} />
            <Route path="/customers/add" element={<AddCustomer />} />
            <Route path="/customers" element={<ListCustomer />} />
            <Route path="/customers/edit/:id" element={<EditCustomer />} />
            <Route path="/customers/:id" element={<CustomerDetail />} />
            <Route path="/suppliers/add" element={<CreateSupplier />} />
            <Route path="/suppliers" element={<SupplierInfo />} />
            <Route path="/suppliers/edit/:id" element={<UpdateSupplier />} />
            <Route path="/suppliers/:id" element={<SupplierDetail />} />
            <Route path="/revenue" element={<DailyRevenue />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      );
    } else {
      if (roleId === "3") {
        return (
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />

              <Route path="/out" element={<OutOrder />} />
              <Route path="/out/all" element={<ListOutOrder />} />

              <Route path="/products" element={<ListProduct />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/customers" element={<ListCustomer />} />
              <Route path="/customers/:id" element={<CustomerDetail />} />
              <Route path="/suppliers" element={<SupplierInfo />} />
              <Route path="/suppliers/:id" element={<SupplierDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        );
      } else {
        if (roleId === "2") {
          return (
            <Router>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/in" element={<InOrder />} />
                <Route path="/in/all" element={<ListInOrder />} />
                <Route path="/products" element={<ListProduct />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/customers" element={<ListCustomer />} />
                <Route path="/customers/:id" element={<CustomerDetail />} />
                <Route path="/suppliers" element={<SupplierInfo />} />
                <Route path="/suppliers/:id" element={<SupplierDetail />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          );
        }
      }
    }
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  }
}
export default router;
