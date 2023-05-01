import { Link } from 'react-router-dom';
import jQuery from 'jquery';
import React from 'react';
import * as Testdata from '../../components/testdata/Testdata';
import Swal from 'sweetalert2';

export default class Newbuy extends React.Component {
  constructor(props){
    super(props);
    let types = [];
    // eslint-disable-next-line
    Testdata.products.map((item) => {
      if (!types.includes(item.type)) {
        types.push(item.type); 
      }
    });
    let TypesOpts = [];
    types.forEach((type) => {
      switch (type) {
        case 'ring':
          TypesOpts.push(<option value={type} key={type}>Anillos</option>);
          break;
        case 'collarchain':
          TypesOpts.push(<option value={type} key={type}>Collares</option>);
          break;
        case 'bracelet':
          TypesOpts.push(<option value={type} key={type}>Brazaletes</option>);
          break;
        default:
          break;
      }
    });
    this.state = {
      products : [],
      types : TypesOpts
    }
  }
  
  productlist = []; //an empty array for storing the products components
  
  /*
    Loads the Products components and their childrens, according to type
    item: products ids
  */
  selectType(e){
    jQuery('#models').hide('slow');
    jQuery('#product-list').hide('slow');

    let productPromise = new Promise((resolve, reject) => {   //fetch data from DB
      this.productlist = Testdata.selectProducts(e,'buy');
      if (this.productlist !== []) {
        resolve(this.productlist);
      }
      else {
        reject('Error');
      }
    });

    productPromise.then(
      (resolve) => {
        this.setState({
          products : resolve,
          types : this.state.types
        });
        jQuery('#product-list').show('slow');
      },
      (reject) => {
        Swal.fire({
          title:reject,
          icon:'error',
          text:'Ocurrió un error al intentar leer la base de datos'
        });
      }
    );
  }

  /*
    This function is called when the user is trying to load the data of the new stock buying
  */
  saveBuy(){
    let inputs = jQuery('form').serializeArray(); //getting all input fields
    let checkboxes = Object.values(jQuery('input[type=checkbox]'));
    let empty = false;      //boolean variable for checking if there is any empty input field
    let checked = false;    //boolean variable for checking if there is any checked checkbox
    inputs.forEach(input => {
      //if there is an empty input field....
      if (input.value === '') {
        empty = true;
      }
    });
    //....or there is no checked checkbox....
    checkboxes.forEach(checkbox => {
      if (checkbox.type === 'checkbox') {
        if (checkbox.checked) {
          checked = true;
        }
      }
    });
    //....this SweetAlert2 error modal will be displayed...
    if (empty || !checked) {
      Swal.fire({
        title: 'Llene todos los campos requeridos',
        icon: 'error'
      })
    }
    //....if not, proceed to save buying data
    else {
      Swal.fire({
        title: 'Compra guardada!',
        icon: 'success'
      }).finally(() => {
        console.log(inputs);
        jQuery('form').find('input').val('');
        jQuery('form').find('select').val('');
        jQuery('#product-list').hide();
      })
    }
  }

  render(){
    return(
      <div className="w-100">
        <div className="rounded shadow-sm card-md w-100 align-self-center p-4">
          <h4>Ingrese los datos de la mercancía nueva</h4>
        </div>
        <hr />
        <div className="rounded shadow-sm card-md w-100 align-self-center p-4">
          <form>
            <div className="mb-3">
              <label htmlFor="shop" className="form-label">Tipo de productos</label>
              <select defaultValue="" className="form-select" id="shop" name="shop" onChange={(e) => this.selectType(e)}>
                <option disabled value="">Seleccione un tipo de producto</option>
                {this.state.types}
              </select>
            </div>
            {this.state.newSupplier}
            <div style={{display:'none'}} id="product-list">
              <hr className='my-5' />
              <div className="products-list">
                <h4>Lista de productos</h4>
                {this.state.products}
              </div>
            </div>
            <hr className='my-5' />
            <div>
              <h4>Detalles de pago</h4>
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
              <button type="button" className="btn btn-save" onClick={ this.saveBuy }>Guardar en inventario</button>
              <Link to="../compras" className="btn btn-danger">Cancelar</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}