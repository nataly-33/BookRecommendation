import { FaStar } from "react-icons/fa";
import "./LibroCard.css";

export default function LibroCard({ data }) {
  const { libro, puntuacion, imagen } = data;

  const rutaImagen = imagen
    ? `http://localhost:5000/uploads/${imagen}`
    : "/img/libro-default.jpg";

  return (
    <div className="libro-card">
      <img src={rutaImagen} alt={libro} className="libro-img" />
      <p className="libro-titulo">
        <strong>{libro}</strong>
      </p>
      <div className="libro-estrellas">
        {[1, 2, 3, 4, 5].map((n) => (
          <FaStar
            key={n}
            size={20}
            color={n <= puntuacion ? "#ffc107" : "#ccc"}
          />
        ))}
      </div>
    </div>
  );
}
