import { useEffect, useState } from "react";
import { getUsuarios, getLibrosDeUsuario, getRecomendaciones } from "../api";
import UsuarioSelect from "../components/UsuarioSelect";
import LibroCard from "../components/LibroCard";
import RecomendacionRow from "../components/RecomendacionRow";
import ModalAgregarUsuario from "../components/ModalAgregarUsuario";
import ModalAgregarLibro from "../components/ModalAgregarLibro";
import "./Home.css";

export default function Home() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [recomendados, setRecomendados] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);

  useEffect(() => {
    getUsuarios().then(res => setUsuarios(res.data.usuarios));
  }, []);

  useEffect(() => {
    if (usuarioSeleccionado) {
      getLibrosDeUsuario(usuarioSeleccionado).then(res => setFavoritos(res.data.favoritos));
      getRecomendaciones(usuarioSeleccionado).then(res => setRecomendados(res.data.recomendaciones));
    }
  }, [usuarioSeleccionado]);

  return (
    <div style={{ padding: "1rem" }}>
      <button onClick={() => setShowUserModal(true)}>➕ Agregar Usuario</button>
      <button onClick={() => setShowBookModal(true)}>📖 Agregar Libro</button>

      <UsuarioSelect usuarios={usuarios} onSelect={setUsuarioSeleccionado} />

      {usuarioSeleccionado && (
        <>
          <h2>Favoritos de {usuarioSeleccionado}</h2>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {favoritos.map((libro, i) => <LibroCard key={i} data={libro} />)}
          </div>

          <h3 style={{ marginTop: "2rem" }}>🔮 Recomendaciones</h3>
          <RecomendacionRow libros={recomendados} />
        </>
      )}

      <ModalAgregarUsuario show={showUserModal} onClose={() => setShowUserModal(false)} />
      <ModalAgregarLibro show={showBookModal} onClose={() => setShowBookModal(false)} usuarios={usuarios} />
    </div>
  );
}
