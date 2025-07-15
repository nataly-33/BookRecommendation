import { FaStar } from "react-icons/fa";
import "./LibroCard.css";

export default function LibroCard({ data }) {
  const { libro, puntuacion, imagen } = data;

  return (
    <div className="libro-card">
      <img
        src={imagen ? `http://localhost:5000/uploads/${imagen}` : "/img/libro-default.png"}
        alt={libro}
        className="libro-img"
      />
      <p className="libro-titulo"><strong>{libro}</strong></p>
      <div className="libro-estrellas">
        {[1, 2, 3, 4, 5].map((n) => (
          <FaStar
            key={n}
            color={n <= puntuacion ? "#fbc02d" : "#ccc"}
            size={18}
          />
        ))}
      </div>
    </div>
  );
}
