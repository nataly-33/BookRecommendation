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
    <div style={{ padding: "1rem" }}>
      <h2>📘 Libros más populares</h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {data.libros_mas_populares.map((libro, i) => (
          <LibroCard key={i} data={{ libro: libro.libro, puntuacion: libro.conexiones }} />
        ))}
      </div>

      <h2 style={{ marginTop: "2rem" }}>👤 Usuarios más conectados</h2>
      <ul>
        {data.usuarios_mas_conectados.map((u, i) => (
          <li key={i}>👤 {u.usuario} — {u.conexiones} libros</li>
        ))}
      </ul>
    </div>
  );
}
