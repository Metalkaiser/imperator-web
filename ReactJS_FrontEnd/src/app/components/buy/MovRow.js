export default function MovRow(props) {
  let type = props.mov.type === 'in' ? <span style={{color:"green"}}>Ingreso</span> : <span style={{color:"red"}}>Gasto</span>;
  return(
    <tr>
      <td>{props.mov.date}</td>
      <td>{props.mov.mov}</td>
      <td>{type}</td>
      <td>{props.mov.amount}</td>
    </tr>
  );
}