import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Buy from "./pages/buy/Buy";
import Newbuy from "./pages/buy/Newbuy";
import Sell from "./pages/sell/Sell";
import Auth from "./pages/Auth";

import './App.css';

function App() {

  let loggedIn = true;

  return (
    <>
      <Routes>
        <Route path="/" element={
            loggedIn ? (
              <Navigate replace to="tienda/dashboard" />
            ) : (
              <Navigate replace to="login" />
            )
        }/>
        <Route path="login" element={<Auth />} />
        <Route path="tienda" element={
          loggedIn ? (
            <Layout />
            ) : (
              <Navigate replace to="../login" />
            )
        }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventario" element={<Inventory />} />
          <Route path="compras" element={<Buy />} />
          <Route path="compras/nueva" element={<Newbuy />} />
          <Route path="ventas" element={<Sell />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
