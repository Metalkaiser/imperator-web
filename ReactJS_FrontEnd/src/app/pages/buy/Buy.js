import Pagination from "../../components/Pagination";

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
            <tr>
              <td>
                08/11/2022
              </td>
              <td>Lista 1</td>
              <td>Tienda</td>
              <td>
                <button type="button" className="btn btn-info">Detalles</button>
              </td>
            </tr>
            <tr>
              <td>
                08/11/2022
              </td>
              <td>Lista 2</td>
              <td>Tienda</td>
              <td>
                <button type="button" className="btn btn-info">Detalles</button>
              </td>
            </tr>
            <tr>
              <td>
                08/11/2022
              </td>
              <td>Lista 3</td>
              <td>Tienda</td>
              <td>
                <button type="button" className="btn btn-info">Detalles</button>
              </td>
            </tr>
            <tr>
              <td>
                08/11/2022
              </td>
              <td>Lista 4</td>
              <td>Tienda</td>
              <td>
                <button type="button" className="btn btn-info">Detalles</button>
              </td>
            </tr>
            <tr>
              <td>
                08/11/2022
              </td>
              <td>Lista 5</td>
              <td>Tienda</td>
              <td>
                <button type="button" className="btn btn-info">Detalles</button>
              </td>
            </tr>
            <tr>
              <td>
                08/11/2022
              </td>
              <td>Lista 6</td>
              <td>Tienda</td>
              <td>
                <button type="button" className="btn btn-info">Detalles</button>
              </td>
            </tr>
            <tr>
              <td>
                08/11/2022
              </td>
              <td>Lista 7</td>
              <td>Tienda</td>
              <td>
                <button type="button" className="btn btn-info">Detalles</button>
              </td>
            </tr>
            <tr>
              <td>
                08/11/2022
              </td>
              <td>Lista 8</td>
              <td>Tienda</td>
              <td>
                <button type="button" className="btn btn-info">Detalles</button>
              </td>
            </tr>
            <tr>
              <td>
                08/11/2022
              </td>
              <td>Lista 9</td>
              <td>Tienda</td>
              <td>
                <button type="button" className="btn btn-info">Detalles</button>
              </td>
            </tr>
            <tr>
              <td>
                08/11/2022
              </td>
              <td>Lista 10</td>
              <td>Tienda</td>
              <td>
                <button type="button" className="btn btn-info">Detalles</button>
              </td>
            </tr>
            <tr>
              <td>
                08/11/2022
              </td>
              <td>Lista 11</td>
              <td>Tienda</td>
              <td>
                <button type="button" className="btn btn-info">Detalles</button>
              </td>
            </tr>
            <tr>
              <td>
                08/11/2022
              </td>
              <td>Lista 12</td>
              <td>Tienda</td>
              <td>
                <button type="button" className="btn btn-info">Detalles</button>
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination />
      </div>
    </div>
  );
}