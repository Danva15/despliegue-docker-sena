# Registro de imágenes Docker

## Imágenes utilizadas en el proyecto

Durante la preparación y despliegue del proyecto se utilizaron las siguientes imágenes Docker:

| Imagen                              | Tamaño aproximado | Propósito                                                              |
| ----------------------------------- | ----------------: | ---------------------------------------------------------------------- |
| `node:24-alpine`                    |            242 MB | Imagen base utilizada para ejecutar y construir la aplicación Node.js. |
| `postgres:18-alpine`                |            433 MB | Motor de base de datos PostgreSQL utilizado por la aplicación.         |
| `nginx:1.30-alpine`                 |           93.6 MB | Servidor web utilizado como proxy para exponer la aplicación.          |
| `despliegue-docker-sena-api:latest` |            255 MB | Imagen de la API del proyecto construida mediante Docker.              |
| `despliegue-docker-sena-api:1.0.0`  |            253 MB | Versión etiquetada de la imagen de la API para el proyecto.            |

## Verificación

Las imágenes fueron comprobadas mediante:

```bash
docker images
```

Las imágenes `postgres:16`, `grafana/k6` y otras imágenes presentes en el equipo corresponden a proyectos o prácticas anteriores y no forman parte del despliegue actual.

La imagen `hello-world:latest` fue utilizada únicamente para verificar el funcionamiento inicial de Docker y no forma parte de los servicios de la aplicación.

## Servicios actuales

El proyecto utiliza Docker Compose para ejecutar los principales servicios:

* `despliegue-api`: API de la aplicación.
* `despliegue-postgres`: base de datos PostgreSQL.
* `despliegue-nginx`: servidor web Nginx.

Las imágenes y contenedores del proyecto se mantienen separados de los utilizados en proyectos anteriores.
