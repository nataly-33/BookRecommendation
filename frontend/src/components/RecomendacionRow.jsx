import "./RecomendacionRow.css";

export default function RecomendacionRow({ libros }) {
  return (
    <div className="recomendacion-row">
      {libros.map((libro, i) => (
        <div className="libro-card" key={i}>
          <img
            src={libro.imagen ? `http://localhost:5000/uploads/${libro.imagen}` : "/img/libro-default.png"}
            alt={libro.libro}
            className="libro-img"
          />
          <p className="libro-titulo">{libro.libro}</p>
        </div>
      ))}
    </div>
  );
}
