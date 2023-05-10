import Pagination from "../../components/Pagination";
//import * as Testdata from '../../components/testdata/Testdata';

export default function Buy() {
  return(
    <div className="d-flex w-100 h-100 overflow-scroll">
      <div className="rounded shadow-sm card-md w-100 align-self-center">
        <table className="table table-striped table-hover align-middle text-center">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Productos</th>
              <th>Tienda</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
        <Pagination />
      </div>
    </div>
  );
}