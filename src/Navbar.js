import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Mixed Alphabet Cipher</h1>
      <div className="links">
        <Link to="/">Encipher</Link>
        <Link to="/Solution" >Decipher</Link>

      </div>
      <div className="title">
        Final Presentation
      </div>

    </nav>
  );
}
 
export default Navbar;