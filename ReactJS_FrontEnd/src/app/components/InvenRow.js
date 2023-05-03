import Swal from "sweetalert2";

export default function InvenRow(props) {

  let models = '';
  let sizes = '';
  let sizeth, sizetd, sizetable;

  for (let index = 0; index < props.models.models.length; index++) {
    sizeth = '';
    sizetd = '';
    sizetable = '';
    // eslint-disable-next-line
    if (index == props.models.models.length - 1) {
      models += props.models.models[index].name;
    }
    else {
      models += props.models.models[index].name + ', '
    }
    sizes += "<p><b>" + props.models.models[index].name + ":</b><p>";
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
      html:"<div><img src='" + props.product.product + "' alt='" + props.product.product + "'></div>"
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
      title:'Editar ' + props.product.product,
      imageUrl:props.product.product,
      imageAlt:props.product.product,
      html:"<div class='input-group mb-3'>"
      + "<span class='input-group-text'>Nombre</span>"
      + "<input id='name' type='text' class='form-control' placeholder='Nombre del producto'"
      + " value='" + props.product.product + "' "
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
          + props.product.product + "</td>"
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
        <img src="#" alt={props.product.product} />
      </td>
      <td>{props.product.product}</td>
      <td></td>
      <td>{models}</td>
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