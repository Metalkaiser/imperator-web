export default function Footer() {
  return(
    <footer className="d-flex flex-row p-3 align-items-center justify-content-between">
      <div></div>
      <div>Imperator @{new Date().getFullYear()}</div>
      <div className="d-flex flex-row justify-content-around" id="links">
        <a href="https://github.com/Metalkaiser/imperator-web" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.instagram.com/imperator.la/" target="_blank" rel="noreferrer">Instagram</a>
      </div>
    </footer>
  );
}