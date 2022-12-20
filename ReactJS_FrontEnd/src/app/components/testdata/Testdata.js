import Products from '../../components/Products';

let suppliers = [
  {
    id:1,
    supplier:'Proveedor 1',
    products:[1,2]
  },
  {
    id:2,
    supplier:'Proveedor 2',
    products:[3,4]
  }
];
let products = [
  {
    id:1,
    product:'Producto 1',
    type:'ring'
  },
  {
    id:2,
    product:'Producto 2',
    type:'ring'
  },
  {
    id:3,
    product:'Producto 3',
    type:'ring'
  },
  {
    id:4,
    product:'Producto 4',
    type:'collarchain'
  }
];
let models = [
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
  },
  {
    id:4,
    models:[
      {
        id:7,
        name:'60cm'
      }
    ]
  }
];
let sizes = [
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
  },
  {
    id:7,
    p_sizes:[60]
  }
];

//Map object for searching values and loading components
function makeMap(mapeable) {
  var mapped = [];
  mapeable.forEach((item,index) => {
    mapped.push([item.id, item]);
  });
  return mapped;
}

let suppliersMap = new Map(makeMap(suppliers));
let productsMap = new Map(makeMap(products));
let modelsMap = new Map(makeMap(models));
let sizesMap = new Map(makeMap(sizes));

let productlist = [];

/*
  This function checks the selected supplier and loads the products from the supplier
*/
function selectSupplier(e,view){
  productlist = [];
  let sizes = [];
  suppliersMap.get(parseInt(e.target.value)).products.forEach((product_id,index) => {
    let product = productsMap.get(product_id);
    sizes = [];

    modelsMap.get(product_id).models.forEach(model => {
      sizes.push(sizesMap.get(model.id));
    });
    productlist.push(
      <Products
      key={product_id}
      view={view}
      product={product}
      productn={index}
      models={modelsMap.get(product_id)}
      sizes={sizes} />
    );
  });
  return productlist;
}

export {
  suppliers,
  suppliersMap,
  products,
  productsMap,
  models,
  modelsMap,
  sizes,
  sizesMap,
  makeMap,
  selectSupplier
}