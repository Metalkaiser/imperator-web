import Pagination from "../components/Pagination";

export default function Inventory() {
  return (
    <div className="d-flex w-100 h-100">
      <div className="rounded shadow-sm card-md w-100 align-self-center">
        <table className="table table-striped table-hover align-middle text-center">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Modelos</th>
              <th>Precio</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src="#" alt="imagen" />
              </td>
              <td>Producto 1</td>
              <td>Dorado, plateado</td>
              <td>16</td>
              <td>
                <button type="button" className="btn btn-info">Detalles</button>
              </td>
            </tr>
            <tr>
              <td>
                <img src="#" alt="imagen" />
              </td>
              <td>Producto 2</td>
              <td>Dorado, plateado</td>
              <td>16</td>
              <td>
                <button type="button" className="btn btn-info">Detalles</button>
              </td>
            </tr>
            <tr>
              <td>
                <img src="#" alt="imagen" />
              </td>
              <td>Producto 3</td>
              <td>Dorado, plateado</td>
              <td>16</td>
              <td>
                <button type="button" className="btn btn-info">Detalles</button>
              </td>
            </tr>
            <tr>
              <td>
                <img src="#" alt="imagen" />
              </td>
              <td>Producto 4</td>
              <td>Dorado, plateado</td>
              <td>16</td>
              <td>
                <button type="button" className="btn btn-info">Detalles</button>
              </td>
            </tr>
            <tr>
              <td>
                <img src="#" alt="imagen" />
              </td>
              <td>Producto 5</td>
              <td>Dorado, plateado</td>
              <td>16</td>
              <td>
                <button type="button" className="btn btn-info">Detalles</button>
              </td>
            </tr>
            <tr>
              <td>
                <img src="#" alt="imagen" />
              </td>
              <td>Producto 6</td>
              <td>Dorado, plateado</td>
              <td>16</td>
              <td>
                <button type="button" className="btn btn-info">Detalles</button>
              </td>
            </tr>
            <tr>
              <td>
                <img src="#" alt="imagen" />
              </td>
              <td>Producto 7</td>
              <td>Dorado, plateado</td>
              <td>16</td>
              <td>
                <button type="button" className="btn btn-info">Detalles</button>
              </td>
            </tr>
            <tr>
              <td>
                <img src="#" alt="imagen" />
              </td>
              <td>Producto 8</td>
              <td>Dorado, plateado</td>
              <td>16</td>
              <td>
                <button type="button" className="btn btn-info">Detalles</button>
              </td>
            </tr>
            <tr>
              <td>
                <img src="#" alt="imagen" />
              </td>
              <td>Producto 9</td>
              <td>Dorado, plateado</td>
              <td>16</td>
              <td>
                <button type="button" className="btn btn-info">Detalles</button>
              </td>
            </tr>
            <tr>
              <td>
                <img src="#" alt="imagen" />
              </td>
              <td>Producto 10</td>
              <td>Dorado, plateado</td>
              <td>16</td>
              <td>
                <button type="button" className="btn btn-info">Detalles</button>
              </td>
            </tr>
            <tr>
              <td>
                <img src="#" alt="imagen" />
              </td>
              <td>Producto 11</td>
              <td>Dorado, plateado</td>
              <td>16</td>
              <td>
                <button type="button" className="btn btn-info">Detalles</button>
              </td>
            </tr>
            <tr>
              <td>
                <img src="#" alt="imagen" />
              </td>
              <td>Producto 12</td>
              <td>Dorado, plateado</td>
              <td>16</td>
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