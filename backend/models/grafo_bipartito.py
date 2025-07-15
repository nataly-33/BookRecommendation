class GrafoBipartito:
    def __init__(self):
        self.usuarios = set()
        self.libros = set()
        self.adyacencia = {}  # clave: nodo, valor: lista de (vecino, peso)

    def agregar_usuario(self, usuario):
        if usuario not in self.adyacencia:
            self.usuarios.add(usuario)
            self.adyacencia[usuario] = []

    def agregar_libro(self, libro):
        if libro not in self.adyacencia:
            self.libros.add(libro)
            self.adyacencia[libro] = []

    def agregar_interaccion(self, usuario, libro, puntuacion):
        self.agregar_usuario(usuario)
        self.agregar_libro(libro)

        # evitar duplicados
        self.eliminar_interaccion(usuario, libro)

        self.adyacencia[usuario].append((libro, puntuacion))
        self.adyacencia[libro].append((usuario, puntuacion))

    def eliminar_interaccion(self, usuario, libro):
        if usuario in self.adyacencia:
            self.adyacencia[usuario] = [
                (n, p) for (n, p) in self.adyacencia[usuario] if n != libro
            ]
        if libro in self.adyacencia:
            self.adyacencia[libro] = [
                (n, p) for (n, p) in self.adyacencia[libro] if n != usuario
            ]

    def obtener_grafo_completo(self):
        return {
            "usuarios": list(self.usuarios),
            "libros": list(self.libros),
            "adyacencias": self.adyacencia
        }

    def usuarios_similares(self, usuario):
        if usuario not in self.usuarios:
            return []

        libros_usuario = set([libro for (libro, _) in self.adyacencia[usuario]])
        similitudes = []

        for otro in self.usuarios:
            if otro == usuario:
                continue
            libros_otro = set([libro for (libro, _) in self.adyacencia[otro]])
            interseccion = libros_usuario.intersection(libros_otro)
            similitud = len(interseccion)
            if similitud > 0:
                similitudes.append((otro, similitud))

        # Ordenar por similitud descendente
        similitudes.sort(key=lambda x: x[1], reverse=True)
        return [u for (u, _) in similitudes]
    

    def recomendar_libros(self, usuario, top_n=5):
        similares = self.usuarios_similares(usuario)
        libros_usuario = set([libro for (libro, _) in self.adyacencia[usuario]])
        recomendados = {}

        for similar in similares:
            for (libro, puntuacion) in self.adyacencia[similar]:
                if libro not in libros_usuario:
                    if libro not in recomendados:
                        recomendados[libro] = 0
                    recomendados[libro] += puntuacion  # suma las puntuaciones como "fuerza"

        # Ordenar por mayor "fuerza" (puntuación acumulada)
        recomendaciones = sorted(recomendados.items(), key=lambda x: x[1], reverse=True)
        return [libro for (libro, _) in recomendaciones[:top_n]]

    def obtener_centralidad_grado(self, top_n=5):
        centralidad = {}

        for nodo in self.adyacencia:
            centralidad[nodo] = len(self.adyacencia[nodo])

        # Ordenamos por mayor grado
        ordenados = sorted(centralidad.items(), key=lambda x: x[1], reverse=True)

        top_usuarios = [
            {"usuario": nodo, "conexiones": grado}
            for (nodo, grado) in ordenados
            if nodo in self.usuarios
        ][:top_n]

        top_libros = [
            {"libro": nodo, "conexiones": grado}
            for (nodo, grado) in ordenados
            if nodo in self.libros
        ][:top_n]

        return {
            "usuarios_mas_conectados": top_usuarios,
            "libros_mas_populares": top_libros
        }
