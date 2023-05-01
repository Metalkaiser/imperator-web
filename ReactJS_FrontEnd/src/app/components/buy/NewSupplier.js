export default function NewSupplier(props) {
  return(
    <div>
      <hr className='my-5' />
      <h4>Detalles del proveedor nuevo</h4>
      <div className="mb-3 w-50">
        <label htmlFor="newsupplier" className="form-label">Nombre del proveedor</label>
        <input type="text" className="form-control" id="newsupplier" name="newsupplier" defaultValue={props.newsup} placeholder="Nombre del proveedor" />
      </div>
    </div>
  );
}