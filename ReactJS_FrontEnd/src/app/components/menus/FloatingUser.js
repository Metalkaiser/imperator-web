import camara from "../../../assets/images/menu/camara.png";
import jQuery from 'jquery';
import Swal from 'sweetalert2';

export default function FloatingUser(props) {

  let imgpath = 'http://127.0.0.1:8000/storage/profile-pics/';

  const toggleUser = () => {
    jQuery('#kt_quick_user').toggle(300);
  }

  const config = () => {
    Swal.fire({
      title:'Configuraciones de la cuenta',
      input:'select',
      inputAttributes:{
        'aria-label':'Select a state',
      },
      inputOptions:{
        pass: 'Cambiar contraseña',
        theme: 'Cambiar tema de la aplicación'
      },
      confirmButtonText:'Seleccionar',
      showCancelButton:true,
      cancelButtonText:'Cancelar'
    }).then(res => {
      if (res.isConfirmed) {
        console.log('Envío de consulta...');
      }
    })
  }

  const logout = () => {
    Swal.fire({
      icon:'warning',
      title:'¿Desea cerrar sesión?',
      showCancelButton:true,
      confirmButtonText:'Cerrar sesión',
      cancelButtonText:'Cancelar'
    }).then(res => {
      if(res.isConfirmed){
        //window.location.href = '/login';
        console.log('Cerrando sesión...');
      }
    });
  }

  //jQuery('#profilepicarea').on('mouseenter',() => jQuery('#cameraicon').attr());

  return(
    <div id="kt_quick_user" className="shadow p-4 rounded" style={{position:'absolute',zIndex:'1001',width:'375px'}}>
      <div className='d-flex flex-row-reverse mb-2'>
        <button type="button" className="btn btn-outline-secondary rounded" aria-label="Close" onClick={toggleUser}>
          <span aria-hidden="true">x</span>
        </button>
      </div>
      <div className="d-flex justify-content-between">
        <div>
          <a href='#' style={{position:'relative'}} id="profilepicarea">
            <img alt="select" id="cameraicon" src={camara} style={{position:'absolute', backgroundColor:'lightgray', opacity:'0.7',display:'none'}} />
            <img alt="user-pic" src={imgpath + props.user} className="rounded" style={{width:'130px', height:'130px'}} />
          </a>
        </div>
        <div className="d-flex flex-column justify-content-between">
          <span className="text-right">
            <h5>Juan Polanco</h5>
          </span>
          <button className="btn btn-info" onClick={config}>Configuraciones</button>
          <button className="btn btn-danger" onClick={logout}>Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
}