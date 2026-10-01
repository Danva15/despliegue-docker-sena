# Manual técnico

## 1. Descripción general

El proyecto consiste en una solución desplegada mediante Docker Compose, compuesta por una API desarrollada con Node.js y Express, una base de datos PostgreSQL y un servidor Nginx utilizado como proxy inverso.

La solución permite ejecutar los servicios de forma aislada y comunicarlos mediante una red interna de Docker.

## 2. Arquitectura

La solución está compuesta por tres servicios:

- **PostgreSQL:** almacena la información de la aplicación.
- **API:** aplicación desarrollada con Node.js y Express.
- **Nginx:** proxy inverso que recibe las peticiones externas y las redirige hacia la API.

El flujo de comunicación es:

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
Los servicios se comunican mediante la red interna de Docker denominada interna.

## 3. Servicios y puertos

### PostgreSQL
- **Imagen:** `postgres:18-alpine`
- **Puerto interno:**  `5432`
- No se publica directamente hacia el equipo host.
- Utiliza el volumen postgres_data para conservar los datos.

### API
- Imagen construida mediante el Dockerfile ubicado en api/.
- **Puerto interno:** `3000`
- No se publica directamente hacia el equipo host.
- Se comunica con PostgreSQL mediante el nombre de servicio postgres.

### Nginx
- **Imagen:** `nginx:1.30-alpine`
- **Puerto interno:** `80`
- Puerto publicado en el `host: 8080`
- Redirige las peticiones hacia `api:3000`.

## 4. Red interna

Docker Compose crea una red denominada interna.

Los servicios postgres, api y nginx están conectados a esta red.

La comunicación entre servicios utiliza los nombres definidos en Docker Compose, por ejemplo:

`api:3000
postgres:5432`

Esto permite que los servicios se comuniquen sin necesidad de publicar sus puertos internos hacia el host.

## 5. Volúmenes

PostgreSQL utiliza el volumen:

postgres_data

Este volumen permite conservar los datos de la base de datos aunque los contenedores sean detenidos o recreados.

## 6. Variables de entorno

Las credenciales y parámetros de conexión se administran mediante variables de entorno.

El archivo .env contiene los valores utilizados localmente y no se incluye en el repositorio.

Se proporciona .env.example como plantilla:

DB_HOST=postgres
DB_PORT=5432
DB_NAME=despliegue_db
DB_USER=app_user
DB_PASSWORD=example_password

Para utilizar el proyecto localmente se debe crear un archivo .env a partir de esta plantilla y establecer los valores correspondientes.

## 7. Healthcheck

El servicio PostgreSQL utiliza un healthcheck basado en pg_isready:

`pg_isready -U ${DB_USER} -d ${DB_NAME}`

La API depende de que PostgreSQL se encuentre en estado saludable antes de iniciar.

La API dispone además del endpoint:

`GET /health`

Una respuesta correcta es:

```bash
{"estado":"ok","base_datos":"ok"}
```

## 8. Despliegue local

Para levantar la solución se requiere Docker Engine y Docker Compose.

El proyecto se inicia mediante:

```bash
docker compose up -d --build
```

Para comprobar el estado de los servicios:

docker compose ps

Para detener la solución:

```bash
docker compose down
```
## 9. Verificación

El acceso externo se realiza mediante Nginx:

```bash
curl http://localhost:8080/health
```

La respuesta esperada es:
```bash
{"estado":"ok","base_datos":"ok"}
```
La API no publica directamente el puerto 3000 hacia el host.

## 10. Publicación de la imagen

La imagen de la API se publica en GitHub Container Registry (GHCR).

La imagen publicada es:

`ghcr.io/danva15/despliegue-docker-sena`

La publicación automática se realiza mediante GitHub Actions cuando se integra un cambio en la rama main.

El workflow genera etiquetas como:

**latest**
**sha-<commit>**

Las etiquetas sha- permiten identificar el commit asociado a cada imagen.

La imagen puede descargarse mediante:

```bash
docker pull ghcr.io/danva15/despliegue-docker-sena:latest
```

## 11. Seguridad y buenas prácticas

Las credenciales de la base de datos no se almacenan directamente en compose.yaml.

El archivo .env está excluido mediante .gitignore para evitar publicar credenciales.

El archivo .env.example contiene únicamente valores de ejemplo.

La base de datos no publica el puerto 5432 hacia el host.

La API tampoco publica directamente el puerto 3000. El acceso externo se realiza mediante Nginx.

Para la publicación automática en GHCR se utiliza GITHUB_TOKEN, proporcionado por GitHub Actions y autorizado mediante:

```yaml
permissions:
  contents: read
  packages: write
```
## 12. Procedimiento de actualización

Cuando se realiza un cambio en la rama main, GitHub Actions ejecuta automáticamente el workflow de publicación.

El proceso es:

```text
Cambio en main
      ↓
GitHub Actions
      ↓
Construcción de la imagen
      ↓
Publicación en GHCR
      ↓
Nueva etiqueta sha-
```

El despliegue automático sobre un servidor de producción se encuentra documentado en:

`docs/despliegue-automatizado.md`
