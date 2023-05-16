import Swal from 'sweetalert2';

export default function SellRow(props) {

  let products = '';
  let status = '';

  if (props.sell.products.length > 1) {
    products = 'Varios';
  }else {
    products = props.data.productsMap.get(props.sell.products[0]).name;
  }

  switch (props.sell.sellstatus) {
    case 'delivered':
      status = 'Entregado';
      break;
    case 'sent':
      status = 'Enviado';
      break;
    case 'aborted':
      status = 'Abortado';
      break;
    default:
      status = 'Pendiente';
      break;
  }

  const details = () => {
    let productslist = '<tr><th>Producto</th><th>Modelo</th><th>Talla</th><th>Cantidad</th></tr>';
    props.sell.products.forEach((product,index) => {
      productslist += '<tr><td>' + props.data.productsMap.get(product).name + '</td><td>'
      + props.data.modelsMap.get(props.sell.models[index]).name
      + '</td><td>' + props.sell.sizes[index]
      + '</td><td>' + props.sell.quantities[index] + '</td></tr>'
    });
    Swal.fire({
      html:"<div class='text-center'><table class='table'>"
      + `<tr><th>Fecha</th><td>${props.sell.date}</th></tr>`
      + `<tr><th>Cliente</th><td>${props.sell.clientname} ${props.sell.clientlastname}</th></tr>`
      + `<tr><th>Teléfono</th><td>${props.sell.clientphone}</th></tr>`
      + `<tr><th>Correo electrónico</th><td>${props.sell.clientemail}</th></tr>`
      + `<tr><th>Estado de la venta</th><td>${status}</th></tr>`
      + "</table></div>"
      + "<div class='text-center mt-2'>"
      + "<h5>Productos vendidos</h5><table class='table'>"
      + productslist + "</table></div>",
      confirmButtonText:'Cerrar',
    });
  }

  return(
    <tr>
      <td>
        {props.sell.date}
      </td>
      <td>{products}</td>
      <td>{props.sell.clientname} {props.sell.clientlastname}</td>
      <td>{status}</td>
      <td>
        <button type="button" className="btn btn-info" onClick={details}>Detalles</button>
      </td>
    </tr>
  );
}