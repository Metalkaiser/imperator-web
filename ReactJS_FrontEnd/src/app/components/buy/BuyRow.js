export default function BuyRow(props) {
  return(
    <tr>
      <td>
        {props.date}
      </td>
      <td>{props.list}</td>
      <td>Tienda</td>
      <td>
        <button type="button" className="btn btn-info">Detalles</button>
      </td>
    </tr>
  );
}