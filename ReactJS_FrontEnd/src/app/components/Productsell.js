export default function Productsell(props) {
  return(
    <tr>
      <td>
        <input type='hidden' value={props.productsMap.get(parseInt(props.selectedProduct)).id} name='product[]'/>
        {props.productsMap.get(parseInt(props.selectedProduct)).product}
      </td>
      <td>
        <input type='hidden' value={props.productModelsMap.get(parseInt(props.selectedModel)).id} name='model[]'/>
        {props.productModelsMap.get(parseInt(props.selectedModel)).name}
      </td>
      <td>
        <input type='hidden' value={props.ssize} name='size[]'/>
        {props.ssize}
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