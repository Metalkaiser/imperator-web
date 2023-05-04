export default function BuyRow(props) {

  let products = '';
  let status = '';

  if (props.sell.products.length > 1) {
    products = 'Varios';
  }else {
    products = props.products.get(props.sell.products[0]).name;
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

  return(
    <tr>
      <td>
        {props.sell.date}
      </td>
      <td>{products}</td>
      <td>{props.sell.clientname}</td>
      <td>{status}</td>
      <td>
        <button type="button" className="btn btn-info">Detalles</button>
      </td>
    </tr>
  );
}