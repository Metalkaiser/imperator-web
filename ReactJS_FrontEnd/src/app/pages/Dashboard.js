import { mov_month } from '../components/testdata/Testdata';
import DashboardTable from '../components/dashboard/DashboardTable';
import DashboardTableRow from '../components/dashboard/DashboardTableRow';

export default function Dashboard() {

  let sells, spends, sellrows, spendrows;

  if (mov_month.sells.length === 0) {
    sells = <p>No hay ventas en los últimos 30 días</p>;
  } else {
    sellrows = [];
    mov_month.sells.forEach(sell => {
      sellrows.push(<DashboardTableRow key={sell.id} row={sell}/>);
    });
    sells = <DashboardTable rows={sellrows}/>;
  }

  if (mov_month.spends.length === 0) {
    spends = <p>No hay gastos en los últimos 30 días</p>;
  } else {
    spendrows = [];
    mov_month.spends.forEach(spend => {
      spendrows.push(<DashboardTableRow key={spend.id} row={spend}/>);
    });
    spends = <DashboardTable rows={spendrows}/>;
  }

  return (
    <div className="d-flex justify-content-between h-100">
      <div className="rounded shadow-sm card-md align-self-center">
        <div className="pt-4 text-center">
          <h4>Últimas ventas</h4>
        </div>
        <hr />
        <div className="p-4">
          {sells}
        </div>
      </div>
      <div className="rounded shadow-sm card-md align-self-center">
        <div className="pt-4 text-center">
          <h4>Últimos gastos</h4>
        </div>
        <hr />
        <div className="p-4">
          {spends}
        </div>
      </div>
    </div>
  );
}