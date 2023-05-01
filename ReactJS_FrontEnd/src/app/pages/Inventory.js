import Pagination from "../components/Pagination";
import * as Testdata from '../components/testdata/Testdata';
import InvenRow from "../components/InvenRow";

export default function Inventory() {

  let rows = [];
  Testdata.products.forEach(product => {
    let model_sizes = [];
    Testdata.modelsMap.get(product.id).models.forEach(model => {
      model_sizes.push(Testdata.sizesMap.get(model.id).p_sizes);
    })
    rows.push(<InvenRow
      key={product.id}
      product={product}
      models={Testdata.modelsMap.get(product.id)}
      sizes={model_sizes}
    />);
  });

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
            {rows}
          </tbody>
        </table>
        <Pagination />
      </div>
    </div>
  );
}