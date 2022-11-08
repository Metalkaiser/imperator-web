export default function Dashboard() {
  return (
    <div className="d-flex justify-content-between h-100">
      <div className="rounded shadow-sm card-md align-self-center">
        <div className="pt-4 text-center">
          <h4>Últimas ventas</h4>
        </div>
        <hr />
        <div className="p-4">
          <p>No hay ventas en los últimos 30 días</p>
        </div>
      </div>
      <div className="rounded shadow-sm card-md align-self-center">
        <div className="pt-4 text-center">
          <h4>Últimos gastos</h4>
        </div>
        <hr />
        <div className="p-4">
          <p>No hay gastos en los últimos 30 días</p>
        </div>
      </div>
    </div>
  );
}