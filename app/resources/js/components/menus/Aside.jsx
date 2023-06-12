import { Link } from "react-router-dom";
import "../../../css/aside.css";
import logo_menu_light from "../../../images/menu/logo_menu_light.png";
import logo_menu_dark from "../../../images/menu/logo_menu_dark.png";
import tienda_light from "../../../images/menu/tienda_light.png";
import compras_light from "../../../images/menu/compras_light.png";
import ventas_light from "../../../images/menu/ventas_light.png";
import tienda_dark from "../../../images/menu/tienda_dark.png";
import compras_dark from "../../../images/menu/compras_dark.png";
import ventas_dark from "../../../images/menu/ventas_dark.png";
import $ from 'jquery';

export default function Aside(props) {

  function showSubmenu(e) {
    $('.submenu').each(function() {
      $(e.currentTarget.nextElementSibling).html() === $(this).html() ? 
        $(e.currentTarget.nextElementSibling).toggle(500) : $(this).hide();
    });
  }

  let tienda, compras, ventas, logo = "";
  if (props.theme === "light") {
    logo = logo_menu_light;
    tienda = tienda_light;
    compras = compras_light;
    ventas = ventas_light;
  }else {
    logo = logo_menu_dark;
    tienda = tienda_dark;
    compras = compras_dark;
    ventas = ventas_dark;
  }

  return (
    <aside className="d-flex flex-column align-items-center">
      <div className="d-flex flex-column justify-content-center text-center" id="logo">
        <Link to="dashboard">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div id="aside_menu_wrapper" className="text-center d-flex flex-column rounded mt-5">
        <ul>
          <li className="py-4">
            <span className="menu-link" onClick={showSubmenu}>
              <img src={tienda} alt="tienda" />
              <span>Tienda</span>
            </span>
            <div className="submenu my-1">
              <ul>
                <li>
                  <Link to="dashboard">
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="inventario">
                    <span>Inventario</span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="py-4">
            <span className="menu-link" onClick={showSubmenu}>
            <img src={ventas} alt="ventas" />
              <span>Ventas</span>
            </span>
            <div className="submenu my-1">
              <ul>
                <li>
                  <Link to="ventas">
                    <span>Lista de ventas</span>
                  </Link>
                </li>
                <li>
                  <Link to="ventas/nueva">
                    <span>Añadir venta</span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="py-4">
            <span className="menu-link" onClick={showSubmenu}>
            <img src={compras} alt="Otros" />
              <span>Otros</span>
            </span>
            <div className="submenu my-1">
              <ul>
                <li>
                  <Link to="movimientos">
                    <span>Movimientos</span>
                  </Link>
                </li>
                <li>
                  <Link to="add/nueva">
                    <span>Añadir al inventario</span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}