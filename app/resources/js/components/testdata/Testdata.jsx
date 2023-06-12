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
    name:'claro'
  },
  {
    id:8,
    name:'oscuro'
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
let movs = [
  {
    id:1,
    date:'25-08-2022',
    mov:'venta brazalete vikingo',
    type:'in',
    amount:20
  },
  {
    id:2,
    date:'14-05-2022',
    mov:'compra mercancía',
    type:'out',
    amount:246
  },
  {
    id:3,
    date:'04-06-2022',
    mov:'compra embalaje',
    type:'out',
    amount:60
  },
  {
    id:4,
    date:'09-06-2020',
    mov:'pasaje',
    type:'out',
    amount:15
  },
  {
    id:5,
    date:'04-09-2022',
    mov:'venta anillo y collar',
    type:'in',
    amount:36
  },
  {
    id:6,
    date:'04-09-2022',
    mov:'venta anillo, brazalete y collar',
    type:'in',
    amount:52
  },
  {
    id:7,
    date:'04-12-2022',
    mov:'publicidad botón',
    type:'out',
    amount:20
  },
  {
    id:8,
    date:'15-04-2023',
    mov:'compra mercancia',
    type:'out',
    amount:400
  },
  {
    id:9,
    date:'28-04-2023',
    mov:'Pago envío',
    type:'out',
    amount:30
  },
  {
    id:10,
    date:'28-04-2023',
    mov:'Venta anillo, collar, anillo',
    type:'in',
    amount:60
  }
];
let mov_month = {
  sells:[
    {
      id:10,
      date:'28-04-2023',
      mov:'Venta anillo, collar, anillo',
      type:'in',
      amount:60
    }
  ],
  spends:[
    {
      id:8,
      date:'18-04-2023',
      mov:'compra mercancia',
      type:'out',
      amount:400
    },
    {
      id:9,
      date:'28-04-2023',
      mov:'Pago envío',
      type:'out',
      amount:30
    }
  ]
  };

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
let modelArr = [];

/*
  This function checks the selected type and loads the products accordingly
*/
function selectProducts(e,view){
  productlist = [];
  productsMap.forEach((item,key) => {
    if (item.type === e.target.value) {
      modelArr = [];
      item.models.forEach(model => {
        modelArr.push(modelsMap.get(model));
      });
      productlist.push(
        <Products
         key={item.id}
         models={modelArr}
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
  movs,
  mov_month,
  sells,
  sellsMap,
  products,
  productsMap,
  models,
  modelsMap,
  makeMap,
  selectProducts
}