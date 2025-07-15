import { Link } from "react-router-dom";
import "./Header.css"
export default function Header() {
  return (
    <header style={{ padding: "1rem", background: "#222", color: "#fff" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>📚 BIBLIOGRAPH</h1>
      <nav>
        <Link to="/" style={{ marginRight: "1rem", color: "lightblue" }}>Home</Link>
        <Link to="/populares" style={{ color: "lightblue" }}>Populares</Link>
      </nav>
    </header>
  );
}
