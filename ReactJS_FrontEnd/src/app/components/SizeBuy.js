export default function SizeBuy(props) {

  /*
    Activates or deactivates the numeric input for an specific size value
  */
  const handleOnChange = (e) => {
    let input = "quantity" + e.target.id.substring(4);
    console.log(input);
    document.querySelector('[id^="' + input + '"]').disabled = !e.target.checked;
  }

  /*
    size[p][m][s]
    p: index for product id
    m: index for model id
    s: index for size id
  */
  let indexes = '';
  indexes = "[" + (props.productn) + "][" + (props.modeln) + "][" + props.sizen + "]";

  return(
    <div className="col form-check">
      <label className="form-check-label" htmlFor={"size" + indexes}>
        {props.size}
      <input className="form-check-input" id={"size" + indexes} name={"size" + indexes} type="checkbox"
          onChange={ handleOnChange } />
      </label>
      <div className="mt-2">
        <input type="number" className="form-control" id={"quantity" + indexes} name={"quantity" + indexes} disabled />
      </div>
    </div>
  );
}