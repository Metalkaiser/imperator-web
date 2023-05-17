export default function DashboardTable(props) {
  return(
    <table className='table'>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Concepto</th>
          <th>Monto</th>
        </tr>
      </thead>
      <tbody>
      {props.rows}
      </tbody>
    </table>
  );
}