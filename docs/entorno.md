# Ficha del entorno Docker

## Sistema operativo

* **Sistema operativo:** Ubuntu 24.04 LTS
* **Arquitectura:** x86_64
* **Kernel:** 7.0.0-29-generic

## Recursos del equipo

* **Memoria RAM total:** 7,7 GiB
* **Memoria disponible durante la comprobación:** 3,8 GiB
* **Espacio disponible en la partición raíz:** 29 GB

## Docker Engine

* **Versión:** Docker 29.6.2
* **Build:** dfc4efb

La instalación de Docker Engine fue comprobada mediante la ejecución del contenedor de prueba `hello-world`.

El resultado confirmó que el cliente Docker pudo comunicarse con el daemon, descargar la imagen desde Docker Hub, crear el contenedor y ejecutarlo correctamente.

## Docker Compose

* **Versión:** Docker Compose v5.3.1

Docker Compose está disponible mediante el comando:

```bash
docker compose
```

## Comprobación realizada

Se ejecutó el siguiente comando:

```bash
docker run hello-world
```

El resultado fue:

```text
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

Con esta prueba se verificó que Docker Engine puede descargar imágenes, crear contenedores y ejecutarlos correctamente.

## Pruebas de imágenes Docker

Se verificó el funcionamiento de las imágenes base requeridas para la solución:

### Nginx

Imagen utilizada:

```text
nginx:1.30-alpine
```

Se creó un contenedor temporal y se publicó el puerto interno `80` mediante el puerto `8080` del host.

La prueba con:

```bash
curl http://localhost:8080
```

devolvió correctamente la página predeterminada de Nginx, confirmando que el servidor web estaba funcionando.

### PostgreSQL

Imagen utilizada:

```text
postgres:18-alpine
```

Se creó un contenedor temporal sin publicar el puerto `5432` al host.

Los registros del contenedor confirmaron:

```text
database system is ready to accept connections
```

La prueba se realizó sin interferir con el contenedor PostgreSQL del proyecto anterior.

### Node.js

Imagen utilizada:

```text
node:24-alpine
```

Se verificó la ejecución de Node.js mediante:

```bash
docker run --rm node:24-alpine node --version
```

Resultado obtenido:

```text
v24.21.0
```

Con estas pruebas se verificó que las imágenes base requeridas están disponibles y pueden ejecutarse correctamente mediante Docker.
