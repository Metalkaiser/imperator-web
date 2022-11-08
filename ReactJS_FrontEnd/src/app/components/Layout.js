import React from 'react';
import { Outlet } from "react-router-dom";
import Aside from "./Aside";
import Header from "./Header";
import Footer from "./Footer";

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
  return (
    <ThemeSelector>
    <div id="kt_header_mobile"></div>
    <section className="d-flex flex-column">
      <article className="d-flex flex-row w-100 min-vh-100">
        <AsideSelector />
        <div className="d-flex flex-column flex-grow-1">
          <Header title="Título" />
          <div className='flex-grow-1'>
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