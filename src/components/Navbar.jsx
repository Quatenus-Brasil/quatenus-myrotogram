import logo from "../assets/MyRotogram Logo Branca.png";

function Navbar() {
  return (
    <nav
      className="w-100 d-flex align-items-center px-4"
      role="navigation"
      aria-label="Main navigation"
      style={{ backgroundColor: "var(--primary)", height: "56px" }}
    >
      <img src={logo} alt="MyRotogram" className="navbar-brand-logo" />
    </nav>
  );
}

export default Navbar;
