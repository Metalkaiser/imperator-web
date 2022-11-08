import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
