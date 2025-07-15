import "./RecomendacionRow.css";

export default function RecomendacionRow({ libros }) {
  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      {libros.map((titulo, i) => (
        <div key={i} style={{ border: "1px dashed #aaa", padding: "1rem", width: "150px", textAlign: "center" }}>
          <img src="/img/libro-default.png" alt={titulo} style={{ width: "100%", height: "auto" }} />
          <p>{titulo}</p>
        </div>
      ))}
    </div>
  );
}
