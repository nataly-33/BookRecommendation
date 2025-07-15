import { useState } from "react";
import { crearUsuario } from "../api";
import "./Modal.css"

export default function ModalAgregarUsuario({ show, onClose }) {
  const [nombre, setNombre] = useState("");

  const handleSubmit = async () => {
    await crearUsuario(nombre);
    onClose();
  };

  if (!show) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Agregar Usuario</h3>
        <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        <button onClick={handleSubmit}>Guardar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
