import Products from '../../components/Products';

let products = [
  {
    id:1,
    name:'Anillo lobo Fenrir',
    price:18,
    type:'ring',
    models:[1,2]
  },
  {
    id:2,
    name:'Collar matillo de Thor',
    price:18,
    type:'collarchain',
    models:[3,4,5,6]
  },
  {
    id:3,
    name:'Anillo circulo de calaveras',
    price:16,
    type:'ring',
    models:[7,8]
  },
  {
    id:4,
    name:'Brazalete vikingo',
    price:20,
    type:'bracelet',
    models:[9]
  }
];
let models = [
  {
    id:1,
    name:'dorado'
  },
  {
    id:2,
    name:'plateado'
  },
  {
    id:3,
    name:'cuadrado'
  },
  {
    id:4,
    name:'plateado'
  },
  {
    id:5,
    name:'dorado',
  },
  {
    id:6,
    name:'mazo'
  },
  {
    id:7,
    name:'dorado'
  },
  {
    id:8,
    name:'plateado'
  },
  {
    id:9,
    name:'60mm'
  }
];
let sells = [
  {
    id:1,
    date:'25-08-2022',
    clientname:'Cliente 1',
    clientlastname:'Apellido 1',
    clientphone:'04269876432',
    clientemail:'cliente1@prueba.com',
    amount:20,
    products:[4],
    models:[9],
    sizes:['Único'],
    quantities:[1],
    sellstatus:'delivered'
  },
  {
    id:2,
    date:'04-09-2022',
    clientname:'Cliente 2',
    clientlastname:'Apellido 2',
    clientphone:'04121234567',
    clientemail:'cliente2@prueba.com',
    amount:36,
    products:[1,2],
    models:[1,5],
    sizes:[12,'Único'],
    quantities:[1,1],
    sellstatus:'delivered'
  },
  {
    id:3,
    date:'04-09-2022',
    clientname:'Cliente 3',
    clientlastname:'Apellido 3',
    clientphone:'04145551234',
    clientemail:'cliente3@prueba.com',
    amount:36,
    products:[1,2,4],
    models:[1,5,9],
    sizes:[11,'Único','Único'],
    quantities:[1,1,1],
    sellstatus:'delivered'
  },
];

//Map object for searching values and loading components
function makeMap(mapeable) {
  var mapped = [];
  mapeable.forEach((item,index) => {
    mapped.push([item.id, item]);
  });
  return mapped;
}

let sellsMap = new Map(makeMap(sells));
let productsMap = new Map(makeMap(products));
let modelsMap = new Map(makeMap(models));

let productlist = [];

/*
  This function checks the selected type and loads the products accordingly
*/
function selectProducts(e,view){
  productlist = [];
  productsMap.forEach((item,key) => {
    if (item.type === e.target.value) {
      productlist.push(
        <Products
         key={item.id}
         models={modelsMap.get(item.id)}
         productn={item.id}
         product={item}
         type={item.type}
        />
      );
    }
  });
  return productlist;
}

export {
  sells,
  sellsMap,
  products,
  productsMap,
  models,
  modelsMap,
  makeMap,
  selectProducts
}