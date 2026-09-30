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

## Construcción multi-etapa

Para la AA3 se modificó el `Dockerfile` de la API para utilizar una construcción multi-etapa.

La primera etapa utiliza `node:24-alpine` como etapa de construcción para instalar las dependencias. La segunda etapa parte de una imagen limpia y copia únicamente los elementos necesarios para ejecutar la aplicación.

La nueva imagen construida fue:


despliegue-docker-sena-api:1.1.0


con un tamaño aproximado de:


248 MB


También se creó la etiqueta:


despliegue-docker-sena-api:aa3


Esta etiqueta corresponde a la misma imagen que `despliegue-docker-sena-api:1.1.0`.

## Comparación entre construcción multi-etapa y una sola etapa

Para comprobar el efecto de la construcción multi-etapa se creó temporalmente una imagen equivalente utilizando un único `FROM`:


despliegue-docker-sena-api:single-stage


Los tamaños obtenidos fueron:

| Construcción   | Tamaño aproximado |
| -------------- | ----------------: |
| Una sola etapa |            255 MB |
| Multi-etapa    |            248 MB |
| Diferencia     |              7 MB |

La comparación muestra que la imagen construida mediante el patrón multi-etapa ocupa aproximadamente 7 MB menos que la imagen equivalente de una sola etapa.

La imagen `single-stage` fue creada únicamente para realizar esta comparación y no forma parte del despliegue final.

## Administración e inspección de la imagen

Se utilizó el siguiente comando para inspeccionar las capas de la imagen multi-etapa:

```bash
docker history despliegue-docker-sena-api:1.1.0
```

La inspección permitió comprobar las capas que forman parte de la imagen final, incluyendo las dependencias, el código fuente y la configuración necesaria para ejecutar la aplicación.

La aplicación se ejecuta además con el usuario no privilegiado:

```dockerfile
USER node
```

evitando que el proceso se ejecute como `root`.

También se midió el espacio utilizado por Docker mediante:

```bash
docker system df
```

En la comprobación realizada se obtuvo:


Images          14        6        1.75GB
Containers      7         4        176.1kB
Local Volumes   4         2        202.6MB
Build Cache     40        0        353.2MB


Esta información permite identificar el espacio ocupado por imágenes, contenedores, volúmenes y caché de construcción.

## Persistencia de PostgreSQL

El servicio PostgreSQL utiliza un volumen Docker denominado `postgres_data`, configurado en `compose.yaml`:

```yaml
volumes:
  - postgres_data:/var/lib/postgresql
```
Docker crea este volumen para el proyecto como

```text
despliegue-docker-sena_postgres_data


Para comprobar la persistencia se insertó un registro de prueba en la tabla mensajes:

```bash
    Prueba de persistencia AA3
```
Posteriormente se eliminó únicamente el contenedor PostgreSQL:

```bash
docker rm -f despliegue-postgres
```

El contenedor se volvió a crear mediante:

```bash
docker compose up -d postgres
```

Finalmente se consultó nuevamente la tabla:

```bash
docker exec -it despliegue-postgres psql -U app_user -d despliegue_db -c "SELECT * FROM mensajes;"
```

El registro Prueba de persistencia AA3 continuó disponible después de recrear el contenedor.

Esto demuestra que los datos de PostgreSQL se mantienen en el volumen Docker y sobreviven a la eliminación y recreación del contenedor.