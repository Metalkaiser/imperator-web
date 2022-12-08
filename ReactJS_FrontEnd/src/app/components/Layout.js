import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import Aside from "./Aside";
import Header from "./Header";
import Footer from "./Footer";
import Subheader from "./Subheader";

const LightTheme = React.lazy(() => import('./themes/Light'));
const DarkTheme = React.lazy(() => import('./themes/Dark'));

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


export default function Layout(){
  const location = useLocation();
  let currentRoute = location.pathname;

  const routeTitles = new Map([
    ['/tienda/dashboard','Dashboard'],
    ['/tienda/inventario','Inventario'],
    ['/tienda/balances','Balances'],
    ['/tienda/compras','Compras'],
    ['/tienda/compras/nueva','Añadir compra'],
    ['/tienda/ventas','Ventas'],
    ['/tienda/ventas/nueva','Añadir venta'],
  ]);

  let title = routeTitles.get(currentRoute);

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
              <Outlet />
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
//ibb.co/tZcvFBk