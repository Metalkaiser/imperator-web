//import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import jQuery from 'jquery';
import React from 'react';
import Products from '../../components/Products';

export default class Newbuy extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      products : []
    }
  }
  
  suppliers = [
    {
      id:1,
      supplier:'Proveedor 1',
      products:[1,2]
    },
    {
      id:2,
      supplier:'Proveedor 2',
      products:[3]
    }
  ];
  products = [
    {
      id:1,
      product:'Producto 1'
    },
    {
      id:2,
      product:'Producto 2'
    },
    {
      id:3,
      product:'Producto 3'
    }
  ];
  models = [
    {
      id:1,
      models:[
        {
          id:1,
          name:'dorado'
        },
        {
          id:2,
          name:'plateado'
        }
      ]
    },
    {
      id:2,
      models:[
        {
          id:3,
          name:'claro'
        },
        {
          id:4,
          name:'oscuro'
        }
      ]
    },
    {
      id:3,
      models:[
        {
          id:5,
          name:'dorado'
        },
        {
          id:6,
          name:'plateado'
        }
      ]
    }
  ];
  sizes = [
    {
      id:1,
      p_sizes:[7,8,9,10,11,12]
    },
    {
      id:2,
      p_sizes:[7,8,9,10,11,12]
    },
    {
      id:3,
      p_sizes:[8,9,10,11,12,13]
    },
    {
      id:4,
      p_sizes:[8,9,10,11,12,13]
    },
    {
      id:5,
      p_sizes:[7,8,9,10,11,12,13]
    },
    {
      id:6,
      p_sizes:[7,8,9,10,11,12,13]
    }
  ];

  //Map object for searching values and loading components
  makeMap(mapeable) {
    var mapped = [];
    mapeable.forEach((item,index) => {
      mapped.push([item.id, item]);
    });
    return mapped;
  }

  suppliersMap = new Map(this.makeMap(this.suppliers));
  productsMap = new Map(this.makeMap(this.products));
  modelsMap = new Map(this.makeMap(this.models));
  sizesMap = new Map(this.makeMap(this.sizes));

  productlist = [];


  /*
    Loads the Products components and their childrens, according to the provider shop
    item: products ids
  */
  selectSupplier(e){
    jQuery('#models').hide();
    this.productlist = [];
    let sizes = [];
    this.suppliersMap.get(parseInt(e.target.value)).products.forEach((product_id,index) => {
      let product = this.productsMap.get(product_id);
      sizes = [];

      this.modelsMap.get(product_id).models.forEach(model => {
        sizes.push(this.sizesMap.get(model.id));
      });

      this.productlist.push(
        <Products
        key={product_id}
        product={product}
        productn={index}
        models={this.modelsMap.get(product_id)}
        sizes={sizes} />
      );
    });
    
    this.setState({products : this.productlist});

    jQuery('#product-list').show();
  }

  saveBuy(){
    console.log("Guardar");
    console.log(jQuery('form').serializeArray());
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
              <label htmlFor="shop" className="form-label">Proveedor</label>
              <select defaultValue="" className="form-select" id="shop" name="shop" onChange={(e) => this.selectSupplier(e)}>
                <option disabled value="">Seleccione un proveedor</option>
                {this.suppliers.map((item,index) =>
                <option value={item.id} key={item.supplier + item.id}>{item.supplier}</option>
                )}
              </select>
            </div>
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
              <button type="button" className="btn btn-save" onClick={ this.saveBuy }>Guardar compra</button>
              <Link to="../compras" className="btn btn-danger">Cancelar</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}