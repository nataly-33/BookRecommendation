import os
from werkzeug.utils import secure_filename
from flask import request, jsonify
from models.grafo_bipartito import GrafoBipartito

grafo = GrafoBipartito()
mongo = None

def configurar_mongo(db):
    global mongo
    mongo = db
    cargar_datos_en_grafo()

def cargar_datos_en_grafo():
    usuarios = mongo.db.usuarios.find()
    libros = mongo.db.libros.find()
    interacciones = mongo.db.interacciones.find()

    for u in usuarios:
        grafo.agregar_usuario(u["nombre"])

    for l in libros:
        grafo.agregar_libro(l["titulo"])

    for i in interacciones:
        grafo.agregar_interaccion(i["usuario"], i["libro"], i["puntuacion"])

def crear_usuario():
    data = request.json
    nombre = data["nombre"]
    mongo.db.usuarios.insert_one({"nombre": nombre})
    grafo.agregar_usuario(nombre)
    return jsonify({"msg": "Usuario creado"}), 201

def crear_libro():
    titulo = request.form.get("titulo")
    usuario = request.form.get("usuario")
    puntuacion = int(request.form.get("puntuacion"))

    imagen = request.files["imagen"]
    filename = secure_filename(imagen.filename)
    ruta = os.path.join("uploads", filename)
    imagen.save(ruta)

    mongo.db.libros.insert_one({"titulo": titulo, "imagen": filename})
    mongo.db.interacciones.insert_one({
        "usuario": usuario,
        "libro": titulo,
        "puntuacion": puntuacion
    })

    grafo.agregar_libro(titulo)
    grafo.agregar_interaccion(usuario, titulo, puntuacion)

    return jsonify({"msg": "Libro creado con imagen"}), 201

def obtener_libros_de_usuario(nombre):
    if nombre not in grafo.usuarios:
        return jsonify({"error": "Usuario no encontrado"}), 404

    favoritos = []
    for (libro, puntuacion) in grafo.adyacencia.get(nombre, []):
        libro_doc = mongo.db.libros.find_one({"titulo": libro})
        imagen = libro_doc["imagen"] if libro_doc and "imagen" in libro_doc else None
        favoritos.append({
            "libro": libro,
            "puntuacion": puntuacion,
            "imagen": imagen
        })

    return jsonify({"usuario": nombre, "favoritos": favoritos})


def recomendar_libros(nombre):
    if nombre not in grafo.usuarios:
        return jsonify({"error": "Usuario no encontrado"}), 404

    libros_recomendados = grafo.recomendar_libros(nombre)
    libros = []

    for titulo in libros_recomendados:
        libro_doc = mongo.db.libros.find_one({"titulo": titulo})
        imagen = libro_doc["imagen"] if libro_doc and "imagen" in libro_doc else None
        libros.append({
            "libro": titulo,
            "imagen": imagen
        })

    return jsonify({"recomendaciones": libros})


def obtener_centralidad_grado():
    resultado = grafo.obtener_centralidad_grado()

    top_libros = []
    for libro in resultado["libros_mas_populares"]:
        titulo = libro["libro"]
        conexiones = libro["conexiones"]
        libro_doc = mongo.db.libros.find_one({"titulo": titulo})
        imagen = libro_doc["imagen"] if libro_doc and "imagen" in libro_doc else None

        top_libros.append({
            "libro": titulo,
            "conexiones": conexiones,
            "imagen": imagen
        })

    return jsonify({
        "usuarios_mas_conectados": resultado["usuarios_mas_conectados"],
        "libros_mas_populares": top_libros
    })