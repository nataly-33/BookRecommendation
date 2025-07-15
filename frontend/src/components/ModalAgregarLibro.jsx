import { useState } from "react";
import { crearLibro } from "../api";
import { FaStar } from "react-icons/fa";
import "./Modal.css";

export default function ModalAgregarLibro({ show, onClose, usuarios }) {
  const [usuario, setUsuario] = useState("");
  const [titulo, setTitulo] = useState("");
  const [puntuacion, setPuntuacion] = useState(0);
  const [imagen, setImagen] = useState(null);

  const handleSubmit = async () => {
    if (!usuario || !titulo || puntuacion === 0 || !imagen) {
      alert("Completa todos los campos, incluyendo la imagen.");
      return;
    }

    try {
      await crearLibro({ usuario, titulo, puntuacion, imagen });
      onClose();
    } catch (error) {
      console.error("Error al crear libro con imagen:", error);
    }
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Agregar Libro</h3>

        <select value={usuario} onChange={(e) => setUsuario(e.target.value)}>
          <option disabled value="">
            Selecciona un usuario
          </option>
          {usuarios.map((u, i) => (
            <option key={i} value={u}>
              {u}
            </option>
          ))}
        </select>

        <input
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <p>Puntuación:</p>
        <div className="estrellas">
          {[1, 2, 3, 4, 5].map((n) => (
            <FaStar
              key={n}
              size={28}
              onClick={() => setPuntuacion(n)}
              className={`estrella ${n <= puntuacion ? "activa" : ""}`}
            />
          ))}
        </div>

        <p>Imagen del libro:</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files[0])}
        />

        <div className="modal-buttons">
          <button onClick={handleSubmit}>Guardar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
