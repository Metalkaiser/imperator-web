import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Movs from "./pages/buy/Movs";
import Newbuy from "./pages/buy/Newbuy";
import Sell from "./pages/sell/Sell";
import Newsell from "./pages/sell/Newsell";
import Auth from "./pages/Auth";
import Aside from "./components/menus/Aside";
import Header from "./components/menus/Header";
import Footer from "./components/menus/Footer";
import Subheader from "./components/menus/Subheader";
import FloatingUser from "./components/menus/FloatingUser";
import React from "react";
import axios from "axios";
import './App.css';

const LightTheme = React.lazy(() => import('./components/themes/Light'));
const DarkTheme = React.lazy(() => import('./components/themes/Dark'));

const ThemeSelector = ({ children }) => {
  const CHOSEN_THEME = localStorage.getItem('TYPE_OF_THEME') || "light";
  return (
    <>
      <React.Suspense fallback={<></>}>
        {(CHOSEN_THEME === "light") && <LightTheme />}
        {(CHOSEN_THEME === "dark") && <DarkTheme />}
      </React.Suspense>
      {children}
    </>
  )
}

const AsideSelector = ({ children }) => {
  const CHOSEN_THEME = localStorage.getItem('TYPE_OF_THEME') || "light";
  return (
    <>
      <React.Suspense fallback={<></>}>
        {(CHOSEN_THEME === "light") && <Aside theme="light" />}
        {(CHOSEN_THEME === "dark") && <Aside theme="dark" />}
      </React.Suspense>
      {children}
    </>
  )
}

let loggedIn = false;

function checkAuth(currentRoute) {
  /*axios.defaults.withCredentials = true;
  axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie").then(response => {
    let data = {
      email:"margelys.gelves@gmail.com",
      password:"password"
    };
    axios.post("http://127.0.0.1:8000/api/login",data,{headers: { 'Accept': 'application/json' }}).then(
      res => {
        console.log(res.data.status);
        console.log(res.data.user);
      }
    ).catch(err => {
      if (err.response.status == 401) {
        console.log("Credenciales inválidas");
      }
      //console.error(err.response);
      //console.error(err.response.data.status);
      //console.error(err.response.data.message);
    });
  })*/

  loggedIn = false;
  if (currentRoute === "/login" && loggedIn) {
    window.location.href = "/";
  }
}

function App() {

  const location = useLocation();
  let currentRoute = location.pathname;

  const routeTitles = new Map([
    ['/login','Iniciar sesión'],
    ['/dashboard','Dashboard'],
    ['/inventario','Inventario'],
    ['/balances','Balances'],
    ['/movimientos','Movimientos'],
    ['/add/nueva','Añadir al inventario'],
    ['/ventas','Ventas'],
    ['/ventas/nueva','Añadir venta'],
  ]);

  let title = routeTitles.get(currentRoute);

  checkAuth(currentRoute);

  if (loggedIn) {
    return (
      <ThemeSelector>
        <div id="kt_header_mobile"></div>
        <section className="d-flex flex-column">
          <article className="d-flex flex-row w-100 min-vh-100">
            <AsideSelector />
            <div className="d-flex flex-column flex-grow-1">
              <Header />
              <div className='flex-grow-1'>
                <FloatingUser user='Juan.jpg' />
                <Subheader title={title} />
                <div className='p-4 h-100'>
                  <Routes>
                    <Route path="/" element={<Navigate replace to="dashboard" />}/>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="inventario" element={<Inventory />} />
                    <Route path="movimientos" element={<Movs />} />
                    <Route path="add/nueva" element={<Newbuy />} />
                    <Route path="ventas" element={<Sell />} />
                    <Route path="ventas/nueva" element={<Newsell />} />
                  </Routes>
                </div>
              </div>
              <Footer />
            </div>
          </article>
        </section>
      </ThemeSelector>
    ); 
  }
  else {
    return (
      <>
        <Routes>
          <Route path="*" element={<Navigate replace to="login" />}/>
          <Route path="login" element={<Auth />} />
        </Routes>
      </>
    );
  }
}

export default App;
