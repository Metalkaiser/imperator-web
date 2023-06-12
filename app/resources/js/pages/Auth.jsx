import logo from '../../images/LOGO_LOGIN.png';
import Swal from 'sweetalert2';
import '../../css/auth.css';

export default function Auth() {

  const loginAttemp = () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    if (email === 'tzirw@example.com' && password === '123456') {
      window.location.href = '/dashboard';
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Credenciales incorrectas',
        text: 'Revise sus credenciales e intente nuevamente.',
      });
    }
  }

  const lostPass = () => {
    Swal.fire({
      title: 'Ingresa tu correo electrónico',
      input: 'email',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        if (email === 'tzirw@example.com') {
          Swal.fire({
            icon: 'info',
            title: 'Correo enviado',
            text: 'Revise su correo electrónico para restablecer la contraseña.',
          })
        } else {
          Swal.showValidationMessage('El correo electrónico ingresado no es válido.');
        }
      }
    });
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 auth-content">
      <div className='mb-5'>
        <img style={{maxWidth:'150px'}} src={logo} alt={logo}/>
      </div>
      <div className='text-center'>
        <h5>Inicio de sesión</h5>
        <p>Indique sus credenciales de usuario</p>
      </div>
      <div className="form-fields">
        <form>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control opacity-50" id="email" placeholder="Correo electrónico" />
          </div>
          <div className="form-group mb-5">
            <label htmlFor="password">Contraseña</label>
            <input type="password" className="form-control opacity-50" id="password" placeholder="Contraseña" />
          </div>
          <div className='d-flex justify-content-lg-around mb-3'>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="remember" />
              <label className="form-check-label opacity-50" htmlFor="remember">Recordarme</label>
            </div>
            <div>
              <a href="#" onClick={lostPass} className="text-decoration-none opacity-50 text-white">Olvidé mi contraseña</a>
            </div>
          </div>
          <div className='text-center'>
            <button type="button" className="btn btn-primary p-3" onClick={loginAttemp}>Iniciar sesión</button>
          </div>
        </form>
      </div>
    </div>
  );
}