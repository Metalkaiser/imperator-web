export default function Productsell(props) {
  return(
    <tr>
      <td>
        <input type='hidden' value={props.product[0]} name='product[]'/>
        {props.product[1]}
      </td>
      <td>
        <input type='hidden' value={props.model[0]} name='model[]'/>
        {props.model[1]}
      </td>
      <td>
        <input type='hidden' value={props.selectedSizes.sizes[props.index]} name='size[]'/>
        {props.selectedSizes.sizes[props.index]}
      </td>
      <td>
        <input type='hidden' value={props.selectedSizes.quantities[props.index]} name='quantity[]'/>
        {props.selectedSizes.quantities[props.index]}
      </td>
      <td>
        <button type="button" className='btn btn-danger product-delete' onClick={ props.modalDelete }>Eliminar</button>
      </td>
    </tr>
  );
}