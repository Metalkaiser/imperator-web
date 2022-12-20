import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Buy from "./pages/buy/Buy";
import Newbuy from "./pages/buy/Newbuy";
import Sell from "./pages/sell/Sell";
import Newsell from "./pages/sell/Newsell";
import Auth from "./pages/Auth";
import Aside from "./components/menus/Aside";
import Header from "./components/menus/Header";
import Footer from "./components/menus/Footer";
import Subheader from "./components/menus/Subheader";
import React from "react";
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

function App() {

  const location = useLocation();
  let currentRoute = location.pathname;

  const routeTitles = new Map([
    ['/dashboard','Dashboard'],
    ['/inventario','Inventario'],
    ['/balances','Balances'],
    ['/compras','Compras'],
    ['/compras/nueva','Añadir compra'],
    ['/ventas','Ventas'],
    ['/ventas/nueva','Añadir venta'],
  ]);

  let title = routeTitles.get(currentRoute);

  let loggedIn = true;

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
                <Subheader title={title} />
                <div className='p-4 h-100'>
                  <Routes>
                    <Route path="/" element={<Navigate replace to="dashboard" />}/>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="inventario" element={<Inventory />} />
                    <Route path="compras" element={<Buy />} />
                    <Route path="compras/nueva" element={<Newbuy />} />
                    <Route path="ventas" element={<Sell />} />
                    <Route path="ventas/nueva" element={<Newsell />} />
                  </Routes>
                </div>
              </div>
              <Footer />
            </div>
          </article>
        </section>
        <div id="kt_quick_user"></div>
      </ThemeSelector>
    ); 
  }
  else {
    return (
      <>
        <Routes>
          <Route path="/" element={<Navigate replace to="login" />}/>
          <Route path="login" element={<Auth />} />
        </Routes>
      </>
    );
  }
}

export default App;
