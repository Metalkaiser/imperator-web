import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import jQuery from 'jquery';
import * as Testdata from '../../components/testdata/Testdata';
import Productsell from '../../components/Productsell';

export default class Newsell extends React.Component {
  constructor() {
    super();
    this.state = {
      productList:[]
    }
    this.addProduct = this.addProduct.bind(this);
    this.sizes = this.sizes.bind(this);
    this.modalDelete = this.modalDelete.bind(this);
    this.saveBuy = this.saveSell.bind(this);
  }

  /*
    This function calls a series of SweetAlert2 modals asking for the details of the sold product
    including modelm sizes and quantity by size.
  */
  addProduct(){
    let [productOptions,modelOptions,sizesOptions] = ['','',''];  //Some variablesfor loading the options
    let [selectedProduct,selectedModel] = [null,null];  //A couple of variables for storing the selections
    //For each product in existence
    Testdata.products.forEach(product =>{
      productOptions += "<option value='" + product.id + "'>" + product.name + "</option>";
    });
    Swal.fire({
      title:'Seleccione un producto',
      html:"<select class='form-select' id='selectproduct'>"
      + "<option value='' selected>Seleccione un producto</option>"
      + productOptions
      + "</select>",
      showCancelButton:true,
      confirmButtonText:'Seleccionar',
      cancelButtonText:'Cancelar',
      preConfirm: () => {
        selectedProduct = document.getElementById('selectproduct').value;
        if (selectedProduct === '') {
          Swal.showValidationMessage('Debe seleccionar algún producto');  //if no product was selected
        }
      }
    }).then((res) => {
      if(res.isConfirmed) {
        Testdata.modelsMap.get(parseInt(selectedProduct)).models.forEach(model => {
          modelOptions += "<option value='" + model.id + "'>" + model.name + "</option>";
        });
        Swal.fire({
          title:'Seleccione un modelo del producto seleccionado',
          html:"<select class='form-select' id='selectmodel'>"
          + "<option value='' selected>Seleccione un modelo</option>"
          + modelOptions
          + "</select>",
          showCancelButton:true,
          confirmButtonText:'Seleccionar',
          cancelButtonText:'Cancelar',
          preConfirm: () => {
            selectedModel = document.getElementById('selectmodel').value;
            if (selectedModel === '') {
              Swal.showValidationMessage('Debe seleccionar algún modelo del producto'); //if no model was selected
            }
          }
        }).then(resp => {
          if(resp.isConfirmed) {
            this.sizes(selectedProduct,selectedModel,sizesOptions);
          }
        });
      }
    });
  }

  /*
    This function create the size options for the selected model
  */
  sizes(selectedProduct,selectedModel,sizesOptions) {
    let checked = false;
    let selectedSizes = {sizes:[],quantities:[]}
    let model_sizes = [];
    if (Testdata.productsMap.get(parseInt(selectedProduct)).type === 'ring') {
      model_sizes = ['7','8','9','10','11','12','13'];
    } else if (Testdata.productsMap.get(parseInt(selectedProduct)).type === 'collarchain') {
      model_sizes = ['60cm'];
    } else {
      model_sizes = ['Único'];
    }
    model_sizes.forEach(size => {
      sizesOptions += "<div class='col form-check'><label class='form-check-label' htmlFor='"
      + size
      + "'>"
      + size
      + "<input class='form-check-input' value='"
      + size
      + "' id='"
      + size
      + "' type='checkbox'></label><div class='mt-2'><input type='number' class='form-control' id='"
      + size
      + "_quantity' min='1'></div></div>";
      Swal.fire({
        title:'Seleccione las tallas vendidas y las cantidades',
        html:"<div class='row'>"
        + sizesOptions
        + "</div>",
        width:'60em',
        heightAuto: false,
        showCancelButton:true,
        confirmButtonText:'Seleccionar',
        cancelButtonText:'Cancelar',
        preConfirm: () => {
          selectedSizes = {sizes:[],quantities:[]}
          document.querySelectorAll('.form-check-input').forEach(checkbox => {
            if (checkbox.checked) {
              checked = true;
              if(document.getElementById(checkbox.id + '_quantity').value === '') {
                Swal.showValidationMessage('Llene todos los campos seleccionados'); //if no quantity was specified
              }
              else {
                selectedSizes.sizes.push(parseInt(checkbox.id));
                selectedSizes.quantities.push(document.getElementById(checkbox.id + '_quantity').value);
              }
            }
          });
          if(!checked) {
            Swal.showValidationMessage('Seleccione al menos una talla');  //if no size was selected
          }
        }
      }).then(res => {
        if (res.isConfirmed) {
          let rows = this.state.productList;    //A variable for storing the rows generated by the SweetAlert2 modal
          let productModels = Testdata.modelsMap.get(parseInt(selectedProduct)).models;
          let productModelsMap = new Map(Testdata.makeMap(productModels));
          let rowsln = jQuery('tbody tr').length;
          selectedSizes.sizes.forEach((ssize,index) => {
            rows.push(<Productsell
              key={'product' + selectedProduct + '_' + selectedModel + '_' + ssize + '_' + index + '_' + rowsln}
              index={index}
              productsMap={Testdata.productsMap}
              selectedProduct={selectedProduct}
              productModelsMap={productModelsMap}
              selectedModel={selectedModel}
              ssize={ssize}
              selectedSizes={selectedSizes}
              modalDelete={this.modalDelete}
            />);
            rowsln++
          });
          this.setState({productList:[...rows]})   //Add the rows to the form table
        }
      });
    });
  }

  /*
    This function deletes a row/product from the selling table
  */
  modalDelete(event){
    let rows = this.state.productList;
    let row = jQuery(event.target).parents().eq(1).children();
    Swal.fire({
      title:'¿Desear eliminar este producto de la lista?',
      text:row.eq(0).text() + ', modelo ' + row.eq(1).text() + '. Talla ' + row.eq(2).text() + ', cantidad: ' + row.eq(3).text(),
      icon:'question',
      showCancelButton:true,
      confirmButtonText:'Eliminar',
      confirmButtonColor:'#dc3545',
      cancelButtonText:'Cancelar',
    }).then(res => {
      if (res.isConfirmed) {
        jQuery('.product-delete').each((index, element) =>{
          if (event.target === element) {
            rows.splice(index,1)
          }
        });
        this.setState({productList:[...rows]});
      }
    });
  }

  saveSell(){
    let inputs = jQuery('form').serializeArray(); //getting all input fields
    let emptyinputs = [];
    if (inputs.length === 4) {    //if no product has been added
      Swal.fire({
        title:'No ha ingresado ningún artículo a la venta',
        icon:'error',
        confirmButtonText:'Entendido',
      })
    }
    else {
      inputs.forEach(input => {
        if (input.value === '') {   //if there is any empty input field
          emptyinputs.push(input);
        }
        else {
          jQuery("input[name*='" + input.name + "']").css('border', '1px solid #ced4da');
        }
      });
      if (emptyinputs.length > 0) {   //if there was any empty input field found
        emptyinputs.forEach(emptyinput => {
          Swal.fire({
            title:'Llene los campos faltantes',
            icon:'error'
          }).finally(jQuery("input[name*='" + emptyinput.name + "']").css('border', '3px solid red'));
        });
      }
      else {
        Swal.fire({
          title:'¡Venta guardada exitosamente!',
          icon:'success',
          timer:3000
        }).finally(() => {
          jQuery('form').find('input').val('');
          jQuery('tbody').html('');
        })
      }
    }
  }

  render(){
    return(
      <div className="w-100">
        <div className="rounded shadow-sm card-md w-100 align-self-center p-4">
          <h4>Ingrese los datos de la venta</h4>
        </div>
        <hr />
        <div className="rounded shadow-sm card-md w-100 align-self-center p-4">
          <form>
            <table className='table table-striped table-hover' id='product-list'>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Modelo</th>
                  <th>Talla</th>
                  <th>Cantidad</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>{this.state.productList}</tbody>
            </table>
            <div className="d-flex flex-row justify-content-around mt-4">
              <button type="button" className="btn btn-info" onClick={ this.addProduct }>Agregar producto</button>
            </div>
            <hr className='my-5' />
            <div>
              <h4>Detalles de pago</h4>
              <div className="d-flex flex-row justify-content-evenly">
                <div className="mb-3">
                  <label htmlFor="client" className="form-label">Nombre del cliente</label>
                  <input type="text" className="form-control" id="client" name="client" placeholder="Nombre del cliente" />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Teléfono del cliente</label>
                  <input type="text" className="form-control" id="phone" name="phone" placeholder="Teléfono del cliente" />
                </div>
              </div>
              <div className="d-flex flex-row justify-content-evenly">
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Monto pagado</label>
                  <input type="number" className="form-control" id="amount" name="amount" placeholder="Monto pagado" />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Fecha de la compra</label>
                  <input type="date" className="form-control" id="date" name="date" />
                </div>
              </div>
            </div>
            <hr />
            <div className="d-flex flex-row justify-content-around">
              <button type="button" className="btn btn-save" onClick={ this.saveSell }>Guardar compra</button>
              <Link to="../ventas" className="btn btn-danger">Cancelar</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}