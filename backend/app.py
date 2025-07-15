from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask import send_from_directory
import os
from routes.api import api_bp

app = Flask(__name__)
CORS(app)

# Config Mongo
app.config["MONGO_URI"] = os.environ.get("MONGO_URI", "mongodb://mongo:27017/recomendador")
mongo = PyMongo(app)

# Pasamos la conexión a los controladores
from controllers import grafo_controller
grafo_controller.configurar_mongo(mongo)

app.register_blueprint(api_bp)


@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory("uploads", filename)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
