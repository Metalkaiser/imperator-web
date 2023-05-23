export default function SizeBuy(props) {

  /*
    Activates or deactivates the numeric input for an specific size value
  */
  const handleOnChange = (e) => {
    let input = "quantity" + e.target.id.substring(4);
    document.querySelector('[id^="' + input + '"]').disabled = !e.target.checked;
    document.getElementById('product_' + props.productn).checked = e.target.checked;
    document.getElementById('model_' + props.modeln.id).checked = e.target.checked;
  }

  /*
    size[p][m][s]
    p: index for product id
    m: index for model id
    s: index for size id
  */
  let indexes = '';
  indexes = "[" + (props.productn) + "][" + (props.modeln.id) + "][" + props.sizen + "]";

  return(
    <div className="col form-check">
      <label className="form-check-label" htmlFor={"size" + indexes}>
        {props.size}
      <input type="checkbox"
        className="form-check-input" 
        value={props.size}
        id={"size" + indexes}
        name={"size_" + props.modeln.id + "[]"}
        onChange={ handleOnChange } />
      </label>
      <div className="mt-2">
        <input type="number"
          className="form-control"
          id={"quantity" + indexes}
          name={"quantity_" + props.modeln.id + "[]"}
          min="1"
          disabled />
      </div>
    </div>
  );
}