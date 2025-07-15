from flask import Blueprint, request, jsonify
from controllers import grafo_controller
from models.grafo_bipartito import GrafoBipartito

api_bp = Blueprint("api", __name__)
grafo = GrafoBipartito()

@api_bp.route("/usuario", methods=["POST"])
def crear_usuario():
    return grafo_controller.crear_usuario()

@api_bp.route("/libro", methods=["POST"])
def crear_libro():
    return grafo_controller.crear_libro()

@api_bp.route("/interaccion", methods=["POST"])
def crear_interaccion():
    data = request.json
    grafo.agregar_interaccion(data["usuario"], data["libro"], data["puntuacion"])
    return jsonify({"msg": "Interacción creada"}), 201

@api_bp.route("/interaccion", methods=["DELETE"])
def eliminar_interaccion():
    data = request.json
    grafo.eliminar_interaccion(data["usuario"], data["libro"])
    return jsonify({"msg": "Interacción eliminada"}), 200

@api_bp.route("/grafo", methods=["GET"])
def obtener_grafo():
    return jsonify(grafo.obtener_grafo_completo())

@api_bp.route("/recomendar/<nombre>", methods=["GET"])
def recomendar(nombre):
    return grafo_controller.recomendar_libros(nombre)

@api_bp.route("/usuario/<nombre>/libros", methods=["GET"])
def libros_favoritos(nombre):
    return grafo_controller.obtener_libros_de_usuario(nombre)


@api_bp.route("/centralidad", methods=["GET"])
def centralidad():
    return grafo_controller.obtener_centralidad_grado()
