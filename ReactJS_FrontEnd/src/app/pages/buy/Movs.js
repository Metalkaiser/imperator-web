import Pagination from "../../components/Pagination";
import * as TestData from "../../components/testdata/Testdata";
import MovRow from "../../components/buy/MovRow";
import excelimg from "../../../assets/images/dropdown/excel.png"
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { useState } from "react";

export default function Movs() {

  let rowReactObjects = [];

  TestData.movs.forEach(mov => {
    rowReactObjects.push(<MovRow
      key={mov.id}
      mov={mov}
    />);
  });

  const [rows, setRows] = useState(rowReactObjects);

  const addMov = () => {
    let date, mov, type, amount, movimiento;
    Swal.fire({
      title:'Agregar nuevo movimiento',
      html:"<div class='text-center'>"
      + "<p>Recuerde: No es necesario registrar ventas en esta sección</p>"
      + "<div class='input-group my-3'>"
      + "<label for='date' class='form-label w-25'>Fecha</label>"
      + "<input type='date' id='date' class='form-control w-75'/>"
      + "</div>"
      + "<div class='input-group mb-3'>"
      + "<label for='name' class='form-label w-25'>Nombre</label>"
      + "<input type='text' id='name' class='form-control w-75' placeholder='Nombre del movimiento'/>"
      + "</div>"
      + "<div class='input-group mb-3'>"
      + "<label for='type' class='form-label w-25'>Tipo</label>"
      + "<select class='form-select w-75' id='type'>"
      + "<option value='' disabled selected>Elija el tipo de movimiento</option>"
      + "<option value='in'>Ingreso</option>"
      + "<option value='out'>Gasto</option>"
      + "</select>"
      + "</div>"
      + "<div class='input-group mb-3'>"
      + "<label for='amount' class='form-label w-25'>Monto</label>"
      + "<input type='number' id='amount' class='form-control w-75' placeholder='Monto'/>"
      + "</div>"
      + "</div>",
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        date = document.getElementById('date').value;
        date = `${date.slice(8)}-${date.slice(5,7)}-${date.slice(0,4)}`
        mov = document.getElementById('name').value;
        type = document.getElementById('type').value;
        amount = parseFloat(document.getElementById('amount').value);
        if (date === '' || mov === '' || type === '' || amount === '') {
          Swal.showValidationMessage('Llene todos los campos requeridos');
        }
      }
    }).then(res => {
      if (res.isConfirmed) {
        let tipo = type === 'in' ? 'Ingreso' : 'Gasto';
        Swal.fire({
          title:'Confirme los datos',
          html:"<div class='text-center'>"
          + `<p><b>Fecha:</b> ${date}</p>`
          + `<p><b>Nombre:</b> ${mov}</p>`
          + `<p><b>Tipo:</b> ${tipo}</p>`
          + `<p><b>Monto:</b> ${amount}</p>`
          + "<p>¿Está seguro de guardar los datos?</p>"
          + "</div>",
          showCancelButton: true,
          confirmButtonText: 'Confirmar datos',
          cancelButtonText: 'Cancelar',
        }).then(r => {
          if (r.isConfirmed) {
            movimiento = {
              date: date,
              mov: mov,
              type: type,
              amount: amount
            }
            try {
              console.log(movimiento);
              rowReactObjects = [...rows];
              rowReactObjects.push(<MovRow
                key={rows.length + 1}
                mov={movimiento}
              />);
              setRows(rowReactObjects);
              Swal.fire({
                icon:'success',
                title:'Datos guardados!',
                confirmButtonText:'Cerrar',
              });
            } catch (error) {
              Swal.fire({
                icon:'error',
                title:'Ocurrió un error en el servidor',
                confirmButtonText:'Cerrar',
              });
            }
          }
        });
      }
    })
  }
//2023-05-24
  return(
      <div className="d-flex flex-column w-100 h-100 overflow-scroll">
        <div className="d-flex flex-row justify-content-evenly mb-3">
          <div>
            <p>Nota: las ventas son añadidas automáticamente desde la sección de <Link to="../ventas/nueva">Añadir venta</Link></p>
            <p>No es necesario agregar ventas en esta sección</p>
          </div>
          <div className="dropdown">
            <button className="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Acciones
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" onClick={addMov}>Agregar movimiento</button></li>
              <li><button className="dropdown-item disabled"><img style={{maxWidth:'20px'}} src={excelimg} alt=""/> Exportar a Excel</button></li>
            </ul>
          </div>
        </div>
        <div className="rounded shadow-sm card-md w-100 align-self-center">
          <table className="table table-striped table-hover align-middle text-center">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Movimiento</th>
                <th>Tipo</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
          <Pagination />
        </div>
      </div>
  );
}