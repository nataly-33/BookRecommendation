import { useEffect, useState } from "react";
import { getCentralidad } from "../api";
import LibroCard from "../components/LibroCard";
import "./Populares.css";

export default function Populares() {
  const [data, setData] = useState({ libros_mas_populares: [], usuarios_mas_conectados: [] });

  useEffect(() => {
    getCentralidad().then(res => setData(res.data));
  }, []);

  return (
    <div className="populares-container">
      <h2>Libros más populares</h2>
      <div className="populares-libros">
        {data.libros_mas_populares.map((libro, i) => (
          <LibroCard
            key={i}
            data={{
              libro: libro.libro,
              puntuacion: libro.conexiones,
              imagen: libro.imagen,
            }}
          />
        ))}
      </div>

      <h2 className="usuarios-title">Usuarios más conectados</h2>
      <ul className="usuarios-lista">
        {data.usuarios_mas_conectados.map((u, i) => (
          <li key={i}>
            {u.usuario} — {u.conexiones} libros conectados
          </li>
        ))}
      </ul>
    </div>
  );
}
