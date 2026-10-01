# Despliegue Docker SENA


Proyecto de despliegue de una aplicación mediante Docker Compose, compuesto por una API desarrollada con Node.js y Express, una base de datos PostgreSQL y un proxy inverso Nginx.

La solución utiliza una red interna de Docker para la comunicación entre servicios y publica únicamente el puerto de Nginx hacia el equipo host.

**Elaborado por:** Danna Valentina Gomez Gonzalez
## Arquitectura

La solución está compuesta por:

- **API:** Node.js + Express.
- **PostgreSQL:** base de datos de la aplicación.
- **Nginx:** proxy inverso para recibir las peticiones externas.

Flujo de comunicación:

```text
Cliente
   |
   | localhost:8080
   v
Nginx
   |
   | api:3000
   v
API Node.js
   |
   | postgres:5432
   v
PostgreSQL
```
Los servicios se comunican mediante la red interna `interna`.

## Requisitos

Antes de ejecutar el proyecto se necesita:

- Docker Engine.
- Docker Compose.
- Git.
- Conexión a Internet para descargar las imágenes necesarias.

La instalación y verificación del entorno Docker se encuentra documentada en:

docs/entorno.md

## Instalación de Docker

El procedimiento de instalación y las verificaciones realizadas para los diferentes sistemas operativos se encuentran documentados en docs/entorno.md.

La documentación contempla los procedimientos correspondientes para:

- Ubuntu/Linux.
- Windows.
- macOS.

En Ubuntu con Docker Engine instalado, se puede comprobar el entorno mediante:

**docker --version**

**docker compose version**

## Configuración

El proyecto utiliza variables de entorno para configurar la conexión con PostgreSQL.

Se proporciona el archivo .env.example como plantilla.

Crear el archivo .env:

__*cp .env.example .env*__

Después se deben revisar los valores de las variables:

**DB_HOST=postgres**
**DB_PORT=5432**
**DB_NAME=despliegue_db**
**DB_USER=app_user**
**DB_PASSWORD=example_password**

El archivo .env está excluido del repositorio mediante .gitignore.

## Ejecución

Para construir las imágenes y levantar todos los servicios:

```bash
docker compose up -d --build
```

Comprobar el estado:

docker compose ps

La salida debe mostrar los tres servicios en ejecución:

```yaml
despliegue-api
despliegue-nginx
despliegue-postgres
```
PostgreSQL debe aparecer en estado healthy.

## Verificación

La aplicación se consulta mediante Nginx en el puerto 8080.

Ejecutar:

```bash
curl http://localhost:8080/health
```

Respuesta esperada:

```bash
{"estado":"ok","base_datos":"ok"}
```
La API utiliza internamente el puerto 3000, pero este puerto no se publica directamente hacia el host.

PostgreSQL utiliza internamente el puerto 5432 y tampoco se publica hacia el host.

## Detener la aplicación

Para detener los contenedores:

```bash
docker compose down
```

Para volver a levantarlos:

```bash
docker compose up -d
```
Los datos de PostgreSQL se conservan mediante el volumen postgres_data.

## Documentación técnica

La información detallada de la arquitectura, puertos, red, volumen, variables de entorno, healthcheck y procedimiento de despliegue se encuentra en:

```yaml
docs/manual-tecnico.md
```
Las pruebas de validación se encuentran en:
```yaml
docs/pruebas.md
```
La documentación sobre publicación y despliegue automatizado se encuentra en:
```yaml
docs/despliegue-automatizado.md
```
## Publicación de la imagen

La imagen de la API se publica en GitHub Container Registry (GHCR):

`ghcr.io/danva15/despliegue-docker-sena`

La publicación manual inicial se realizó con la etiqueta:

1.0.0

Posteriormente, la publicación se automatizó mediante GitHub Actions.

## Publicación automática

El workflow:

_**.github/workflows/publicar-imagen.yml**_

se ejecuta automáticamente cuando un cambio llega a la rama main.

El proceso realiza:

```text
Cambio en main
      ↓
GitHub Actions
      ↓
Construcción de la imagen
      ↓
Autenticación en GHCR
      ↓
Publicación de la imagen
      ↓
Etiquetas latest y sha-<commit>
```
La imagen publicada puede descargarse mediante:
```bash
docker pull ghcr.io/danva15/despliegue-docker-sena:latest
```
Las etiquetas sha-<commit> permiten identificar el commit asociado a una imagen concreta.

## Despliegue en producción

El despliegue automático sobre un servidor de producción no se ejecuta en el servidor compartido del aula. La guía establece que este escenario debe estudiarse y documentarse.

La explicación de la cadena de despliegue, los secretos necesarios y el procedimiento de reversión se encuentra en:

`docs/despliegue-automatizado.md`

## Repositorio

El código fuente y la documentación del proyecto se encuentran en GitHub:

https://github.com/Danva15/despliegue-docker-sena
