import Swal from "sweetalert2";

export default function InvenRow(props) {

  let imgpath = 'http://127.0.0.1:8000/storage/products/';
  let sizes = '';
  let sizeth, sizetd, sizetable, type;

  switch (props.product.type) {
    case 'ring':
      type = "Anillo";
      break;
    case 'collarchain':
      type = "Collar";
      break;
    case 'bracelet':
      type = "Brazalete";
      break;
    default:
      type = "Otro";
      break;
  }

  for (let index = 0; index < props.models[1].length; index++) {
    sizeth = '';
    sizetd = '';
    sizetable = '';
    sizes += "<p><b>" + props.models[1][index] + ":</b><p>";
    sizetable += "<table class='table mb-3'><tr>";
    props.sizes.forEach(size => {
      sizeth += "<th>" + size + "</th>";
      sizetd += "<td>" + 0 + "</td>";
    });
    sizes += sizetable + sizeth + "</tr><tr>" + sizetd + "</tr></table>";
  }
  const details = () => {
    Swal.fire({
      title:props.product.product,
      html:"<div><img src='" + imgpath
      + props.product.name + ".jpg' alt='" + props.product.name
      + "' style='max-width:150px'></div>"
      + "<div><h5>Tallas:</h5></div>"
      + "<div>" + sizes + "</div>"
    });
  }
  const edit = () => {
    let name, price, image;
    Swal.fire({
      showCancelButton:true,
      cancelButtonText:'Cancelar',
      confirmButtonText:'Siguiente',
      title:'Editar ' + props.product.name,
      imageUrl:props.product.name,
      imageAlt:props.product.name,
      html:"<div class='input-group mb-3'>"
      + "<span class='input-group-text'>Nombre</span>"
      + "<input id='name' type='text' class='form-control' placeholder='Nombre del producto'"
      + " value='" + props.product.name + "' "
      + "aria-label='Nombre del producto' aria-describedby='inputGroup-sizing-sm'>"
      + "</div>"
      + "<div class='input-group mb-3'>"
      + "<span class='input-group-text'>Precio</span>"
      + "<input id='price' type='number' class='form-control' placeholder='Precio del producto'"
      + " value='" + props.product.price + "' "
      + "aria-label='Nombre del producto' aria-describedby='inputGroup-sizing-sm'>"
      + "</div>"
      + "<div class='input-group mb-3'>"
      + "<span class='input-group-text'>Imagen</span>"
      + "<input id='pic' type='file' class='form-control' placeholder='Foto del producto'"
      + "aria-label='Foto del producto' aria-describedby='inputGroup-sizing-sm'>"
      + "</div>",
      preConfirm: () => {
        name = document.getElementById('name').value;
        price = document.getElementById('price').value;
        image = document.getElementById('pic').value;
        if (name === '') {
          Swal.showValidationMessage('Indique un nombre para el producto');
        } else if (price === ''|| isNaN(price)) {
          Swal.showValidationMessage('Indique un precio válido para el producto')
        }
      }
    }).then(res => {
      if (res.isConfirmed) {
        let imgchange = '';
        if (image !== '') {
          imgchange = "<h5>Incluye un cambio de foto</h5>"
        }
        Swal.fire({
          showCancelButton:true,
          cancelButtonText:'Cancelar',
          confirmButtonText:'Confirmar',
          icon:'question',
          title:'¿Desea cambiar los siguientes datos?',
          html:"<div class='text-center'>"
          + "<table class='table'><tr>"
          + "<td></td><th>Información anterior</th><th>Información nueva</th></tr><tr>"
          + "<th>Nombre</th><td>"
          + props.product.name + "</td>"
          + "<td>" + name + "</td></tr><tr>"
          + "<th>Precio</th><td>"
          + props.product.price + "</td>"
          + "<td>" + price + "</td></tr></table>" + imgchange + "</div>"
        }).then(fin => {
          if (fin.isConfirmed) {
            console.log("Guardado");
          }
        });
      }
    });
  }

  return(
    <tr>
      <td>
        <img src={imgpath + props.product.name + '.jpg'} alt={props.product.name} 
        style={{maxWidth:'80px'}} />
      </td>
      <td>{props.product.name}</td>
      <td>{type}</td>
      <td>{props.models[0]}</td>
      <td>{props.product.price}</td>
      <td>
        <button type="button" className="btn btn-info" onClick={details}>Detalles</button>
      </td>
      <td>
        <button type="button" className="btn btn-warning" onClick={edit}>Editar</button>
      </td>
    </tr>
  );
}