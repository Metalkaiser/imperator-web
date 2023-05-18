import jQuery from 'jquery';

export default function Header() {

  const toggleUser = () => {
    jQuery('#kt_quick_user').toggle(300);
  }
  return (
    <div className="d-flex flex-row justify-content-end top-header">
      <div className="d-flex align-items-center">
        <div className="pr-3">Hola, Juan</div>
        <div id="userinit"  onClick={toggleUser} className="d-flex flex-column justify-content-center text-center rounded m-4">
          <span>J</span>
        </div>
      </div>
    </div>
  );
}