import axios from "axios";
const API = "http://localhost:5000";

export const getUsuarios = () => axios.get(`${API}/grafo`);
export const getLibrosDeUsuario = (nombre) =>
  axios.get(`${API}/usuario/${nombre}/libros`);
export const getRecomendaciones = (usuario) =>
  axios.get(`${API}/recomendar/${usuario}`);
export const getCentralidad = () => axios.get(`${API}/centralidad`);

export const crearUsuario = (nombre) =>
  axios.post(`${API}/usuario`, { nombre });

export const crearLibro = async ({ usuario, titulo, puntuacion, imagen }) => {
  try {
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("usuario", usuario);
    formData.append("puntuacion", puntuacion);
    formData.append("imagen", imagen); // aquí va la imagen

    const response = await axios.post(`${API}/libro`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (err) {
    console.error(
      "Error enviando libro con imagen:",
      err.response?.data || err.message
    );
    throw err;
  }
};
