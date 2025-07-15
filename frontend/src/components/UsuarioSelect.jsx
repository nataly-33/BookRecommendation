import "./UsuarioSelect.css";

export default function UsuarioSelect({ usuarios, onSelect }) {
  return (
    <div style={{ marginTop: "1rem" }}>
      <label>Selecciona un usuario:</label>
      <select onChange={(e) => onSelect(e.target.value)} defaultValue="">
        <option value="" disabled>-- Selecciona --</option>
        {usuarios.map((u, i) => (
          <option key={i} value={u}>{u}</option>
        ))}
      </select>
    </div>
  );
}
