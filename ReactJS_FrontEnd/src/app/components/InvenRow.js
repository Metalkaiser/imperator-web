import Swal from "sweetalert2";

export default function InvenRow(props) {

  console.log(props.sizes);
  let models = '';
  let sizes = '';

  for (let index = 0; index < props.models.models.length; index++) {
    if (index == props.models.models.length - 1) {
      models += props.models.models[index].name;
    }
    else {
      models += props.models.models[index].name + ', '
    }
    sizes += "<p>" + props.models.models[index].name + ": " + props.sizes[index].toString() + "<p>";
  }
  const details = () => {
    Swal.fire({
      title:props.product.product,
      html:"<div><img src='" + props.product.product + "' alt='" + props.product.product + "'></div>"
      + "<div><h5>Modelos:</h5><p>" + models + "</p></div>"
      + "<div><h5>Tallas:</h5></div>"
      + "<div>" + sizes + "</div>"
    });
  }

  return(
    <tr>
      <td>
        <img src="#" alt={props.product.product} />
      </td>
      <td>{props.product.product}</td>
      <td>{models }</td>
      <td>{props.product.price}</td>
      <td>
        <button type="button" className="btn btn-info" onClick={details}>Detalles</button>
      </td>
    </tr>
  );
}