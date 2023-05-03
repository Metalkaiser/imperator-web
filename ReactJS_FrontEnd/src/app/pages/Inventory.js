import Pagination from "../components/Pagination";
import * as Testdata from '../components/testdata/Testdata';
import InvenRow from "../components/InvenRow";
import Swal from "sweetalert2";

export default function Inventory() {

  let rows = [];
  Testdata.products.forEach(product => {
    let model_sizes = [];
    if (product.type === 'ring') {
      model_sizes = ['7','8','9','10','11','12','13'];
    } else if (product.type === 'collarchain') {
      model_sizes = ['60cm'];
    } else {
      model_sizes = ['Único'];
    }
    rows.push(<InvenRow
      key={product.id}
      product={product}
      models={Testdata.modelsMap.get(product.id)}
      type={product.type}
      sizes={model_sizes}
    />);
  });

  function addProduct() {
    Swal.fire({
      icon:'question',
      text:'¿Desea añadir un nuevo producto al inventario?',
      confirmButtonText:'Sí',
      showCancelButton: true,
      cancelButtonText:'Cancelar',
    }).then(res => {
      if (res.isConfirmed) {
        let nproduct;
        let ntype;
        let nprice;
        let npic;
        let nmodels;
        Swal.fire({
          confirmButtonText:'Siguiente',
          showCancelButton: true,
          cancelButtonText:'Cancelar',
          title:'Producto nuevo',
          html:"<div class='input-group mb-3'>"
          + "<span class='input-group-text'>Nombre</span>"
          + "<input id='product' type='text' class='form-control' placeholder='Nombre del producto'"
          + "aria-label='Nombre del producto' aria-describedby='inputGroup-sizing-sm'>"
          + "</div>"
          + "<select id='type' class='form-select' aria-label='Tipo de producto'>"
          + "<option value='' selected disabled>Tipo de producto</option>"
          + "<option value='ring'>Anillo</option>"
          + "<option value='collarchain'>Collar</option>"
          + "<option value='bracelet'>Brazalete</option>"
          + "<option value='other'>Otro</option>"
          + "</select>"
          + "<div class='input-group my-3'>"
          + "<span class='input-group-text'>Precio</span>"
          + "<input id='price' type='number' class='form-control' placeholder='Precio del producto'"
          + "aria-label='Precio del producto' aria-describedby='inputGroup-sizing-sm'>"
          + "</div>"
          + "<div class='input-group mb-3'>"
          + "<span class='input-group-text'>Modelos</span>"
          + "<input id='models' type='number' class='form-control' placeholder='Cantidad de modelos del producto'"
          + "aria-label='Cantidad de modelos del producto' aria-describedby='inputGroup-sizing-sm'>"
          + "</div>"
          + "<div class='input-group my-3'>"
          + "<span class='input-group-text'>Foto del producto</span>"
          + "<input id='pic' type='file' class='form-control' placeholder='Foto del producto'"
          + "aria-label='Precio del producto' aria-describedby='inputGroup-sizing-sm'>"
          + "</div>",
          preConfirm: () => {
            nproduct = document.getElementById('product').value;
            ntype = document.getElementById('type').value;
            nprice = parseFloat(document.getElementById('price').value);
            npic = document.getElementById('pic').value;
            nmodels = document.getElementById('models').value;

            if (nproduct === '' || ntype === '' || npic === '') {
              Swal.showValidationMessage('Llene todos los campos solicitados');
            }
            else if (isNaN(nprice)) {
              Swal.showValidationMessage('Solo valores numéricos en el campo Precio');
            }
            else if (nmodels === '') {
              Swal.showValidationMessage('Solo valores numéricos en el campo Modelos');
            }
          }
        }).then(nres => {
          if (nres.isConfirmed) {
            let models = [];
            let modelOpt = '';
            for (let i = 0; i < parseInt(nmodels); i++) {
              modelOpt += "<div class='input-group my-3'>"
              + "<span class='input-group-text'>Nombre modelo "
              + (i+1)
              + "</span>"
              + "<input id='model"
              + (i+1)
              + "' type='text' class='form-control' placeholder='Nombre modelo "
              + (i+1)
              + "' aria-label='Nombre modelo' aria-describedby='inputGroup-sizing-sm'>"
              + "</div>";
            }
            Swal.fire({
              title:'Indique el nombre para cada modelo del producto',
              html:modelOpt,
              confirmButtonText:'Siguiente',
              showCancelButton: true,
              cancelButtonText:'Cancelar',
              preConfirm: () => {
                for (let j = 0; j < parseInt(nmodels); j++) {
                  // eslint-disable-next-line
                  if (document.getElementById('model' + (j+1)).value == '') {
                    Swal.showValidationMessage('Llene todos los campos solicitados');
                  }
                  else {
                    models.push(document.getElementById('model' + (j+1)).value);
                  }
                }
              }
            }).then(prev => {
              if (prev.isConfirmed) {
                let typeTxt = '';
                let modelsTxt = models.toString();
                switch (ntype) {
                  case 'ring':
                    typeTxt = 'Anillo';
                    break;
                  case 'collarchain':
                    typeTxt = 'Collar';
                    break;
                  case 'bracelet':
                    typeTxt = 'Brazalete';
                    break;
                  default:
                    typeTxt = 'Otro';
                    break;
                }
                Swal.fire({
                  confirmButtonText:'Confirmar',
                  showCancelButton: true,
                  cancelButtonText:'Cancelar',
                  title:'¿Desea agregar el siguiente producto?',
                  html:"<div class='input-group mb-3'>"
                  + "<span class='input-group-text'>Nombre</span>"
                  + "<input type='text' class='form-control' disabled value='"
                  + nproduct
                  + "'></div>"
                  + "<div class='input-group mb-3'>"
                  + "<span class='input-group-text'>Tipo</span>"
                  + "<input type='text' class='form-control' disabled value='"
                  + typeTxt
                  + "'></div>"
                  + "<div class='input-group mb-3'>"
                  + "<span class='input-group-text'>Precio</span>"
                  + "<input type='text' class='form-control' disabled value='"
                  + nprice
                  + "'></div>"
                  + "<div class='input-group mb-3'>"
                  + "<span class='input-group-text'>Modelos</span>"
                  + "<input type='text' class='form-control' disabled value='"
                  + modelsTxt
                  + "'></div>"
                }).then(fin => {
                  if (fin.isConfirmed) {
                    let newProd = [nproduct,nprice,ntype,models];
                    console.log(newProd);
                  }
                })
              }
            })
          }
        })
      }
    })
  }

  return (
    <div className="d-flex w-100 h-100 flex-column justify-content-center">
      <div className="align-self-center mb-3">
        <button className="btn btn-info" onClick={addProduct}>Agregar producto nuevo</button>
      </div>
      <div className="d-flex">
        <div className="rounded shadow-sm card-md w-100 align-self-center">
          <table className="table table-striped table-hover align-middle text-center">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Producto</th>
                <th>Tipo</th>
                <th>Modelos</th>
                <th>Precio</th>
                <th>Detalles</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
          <Pagination />
        </div>
      </div>
    </div>
  );
}