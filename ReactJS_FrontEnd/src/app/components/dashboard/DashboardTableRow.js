export default function DashboardTableRow(props) {
  return(
    <tr><td>{props.row.date}</td><td>{props.row.mov}</td><td>{props.row.amount}</td></tr>
  );
}