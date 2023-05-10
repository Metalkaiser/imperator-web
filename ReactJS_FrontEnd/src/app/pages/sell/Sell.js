import Pagination from "../../components/Pagination";
import * as Testdata from '../../components/testdata/Testdata';
import SellRow from '../../components/sell/SellRow';

export default function Sell() {

  let rows = [];

  Testdata.sells.forEach(sell => {
    rows.push(<SellRow
      key={sell.id}
      sell={sell}
      data={Testdata}
      />);
  });

  return(
    <div className="d-flex w-100 h-100 overflow-scroll">
      <div className="rounded shadow-sm card-md w-100 align-self-center">
        <table className="table table-striped table-hover align-middle text-center">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Productos</th>
              <th>Cliente</th>
              <th>Estado</th>
              <th>Detalles</th>
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