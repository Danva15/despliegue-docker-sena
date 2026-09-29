# Ficha del entorno Docker

## Sistema operativo

* **Sistema operativo:** Ubuntu 24.04 LTS
* **Arquitectura:** x86_64
* **Kernel:** 7.0.0-29-generic

## Ruta de instalación

* **Ruta seleccionada:** 2A — Ubuntu nativo con Docker Engine.

Docker Engine se utiliza directamente como servicio del sistema operativo, sin Docker Desktop.

## Recursos del equipo

* **Memoria RAM total:** 7,7 GiB
* **Memoria disponible durante la comprobación:** 1,6 GiB
* **Espacio disponible en la partición raíz:** 28 GB

## Docker Engine

* **Versión:** Docker 29.6.2
* **Build:** dfc4efb

Salida de `docker --version`:

Docker version 29.6.2, build dfc4efb


El servicio Docker se encuentra habilitado y ejecutándose mediante systemd.

Estado comprobado:


Loaded: loaded (...); enabled
Active: active (running)


## Docker Compose

* **Versión:** Docker Compose v5.3.1

Salida de `docker compose version`:


Docker Compose version v5.3.1


Docker Compose está disponible mediante el comando:


docker compose


## Información del motor

La información básica del motor se verificó mediante:


docker info | head -20


La comprobación confirmó:


Client: Docker Engine - Community
Version: 29.6.2
Context: default

Server:
Server Version: 29.6.2
Storage Driver: overlayfs


## Comprobación de funcionamiento

Se ejecutó:


docker run --rm hello-world


El resultado comenzó con:


Hello from Docker!

This message shows that your installation appears to be working correctly.


Esta prueba confirmó que el cliente Docker puede comunicarse con el daemon, descargar imágenes desde Docker Hub, crear contenedores y ejecutarlos correctamente.

## Pruebas de imágenes Docker

Se verificó el funcionamiento de las imágenes base requeridas para la solución.

### Nginx

Imagen utilizada:


nginx:1.30-alpine


Se creó un contenedor temporal y se publicó el puerto interno `80` mediante el puerto `8080` del host.

La prueba mediante:

```bash
curl http://localhost:8080
```

devolvió correctamente la página predeterminada de Nginx, confirmando que el servidor web estaba funcionando.

### PostgreSQL

Imagen utilizada:


postgres:18-alpine


Se creó un contenedor temporal sin publicar el puerto `5432` al host.

Los registros del contenedor confirmaron:


database system is ready to accept connections


La prueba se realizó sin interferir con el contenedor PostgreSQL del proyecto anterior.

### Node.js

Imagen utilizada:


node:24-alpine


Se verificó la ejecución de Node.js mediante:

```bash
docker run --rm node:24-alpine node --version
```

Resultado obtenido:


v24.21.0


Con estas pruebas se verificó que las imágenes base requeridas están disponibles y pueden ejecutarse correctamente mediante Docker.

## Inconvenientes y observaciones

El entorno Docker Engine ya se encontraba instalado y operativo al momento de realizar la actividad, por lo que no fue necesario realizar una reinstalación.

La instalación existente fue verificada mediante `docker --version`, `docker compose version`, la comprobación del servicio Docker, `docker info` y la ejecución del contenedor `hello-world`.

No se utilizó Docker Desktop, de acuerdo con la ruta de instalación establecida para Ubuntu nativo.
