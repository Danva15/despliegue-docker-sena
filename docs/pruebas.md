# Pruebas de validación del despliegue

## AA5 – Validación, publicación automatizada y documentación

Fecha: 30 de septiembre de 2026

### 1. Levantamiento de la solución

La plataforma se levantó correctamente mediante Docker Compose utilizando:

```bash
docker compose up -d --build
```

Se verificó el estado de los servicios con:

docker compose ps

Resultado:

despliegue-api: servicio activo.
despliegue-nginx: servicio activo y publicado en el puerto 8080.
despliegue-postgres: servicio activo y en estado healthy.

La solución está compuesta por tres servicios: PostgreSQL, API Node.js/Express y Nginx como reverse proxy.

##2. Funcionamiento de la red interna

Se comprobó desde el contenedor de la API que el nombre del servicio postgres puede resolverse dentro de la red interna de Docker:

```bash
docker compose exec api sh
getent hosts postgres
```

Resultado obtenido:

172.20.0.2 postgres postgres

Esto confirma que la API puede localizar el servicio PostgreSQL mediante el nombre postgres, sin utilizar una dirección IP fija.

También se verificó la comunicación de la API con PostgreSQL mediante:

```bash
wget -qO- http://localhost:3000/health
```

Resultado:

```bash
{"estado":"ok","base_datos":"ok"}
```

##3. Persistencia de los datos

Se comprobó anteriormente la persistencia de PostgreSQL utilizando el volumen:

despliegue-docker-sena_postgres_data

Después de eliminar y volver a levantar el contenedor de PostgreSQL, los datos almacenados en la tabla mensajes permanecieron disponibles.

Entre los registros conservados se encontraba:

Prueba de persistencia AA3

Esto demuestra que los datos no dependen del ciclo de vida del contenedor y permanecen almacenados en el volumen de Docker.

##4. Aislamiento de los servicios

El diseño de compose.yaml no publica los puertos de PostgreSQL ni de la API directamente hacia el equipo host.

La configuración muestra:

PostgreSQL: 5432/tcp únicamente dentro de Docker.
API: 3000/tcp únicamente dentro de Docker.
Nginx: único servicio publicado, mediante 8080:80.

La configuración se verificó mediante:

```bash
docker compose ps
```
Resultado relevante:

despliegue-api       ...   3000/tcp
despliegue-nginx     ...   0.0.0.0:8080->80/tcp
despliegue-postgres  ...   5432/tcp

Por lo tanto, el acceso externo se realiza a través de Nginx y los servicios internos permanecen aislados dentro de la red de Docker.

##5. Funcionamiento completo mediante Nginx

Finalmente, se verificó el acceso desde el equipo host mediante el reverse proxy:

```bash
curl -i http://localhost:8080/health
```

Resultado:

HTTP/1.1 200 OK

Respuesta:
```
{"estado":"ok","base_datos":"ok"}
```

Esto confirma el funcionamiento de la cadena:

Cliente
   ↓
Nginx :8080
   ↓
API Node.js :3000
   ↓
PostgreSQL :5432
Conclusión

Las pruebas realizadas confirman que la solución puede ejecutarse mediante Docker Compose, que los servicios se comunican correctamente a través de la red interna, que los datos de PostgreSQL persisten mediante un volumen y que la base de datos y la API no están expuestas directamente al equipo host. Nginx funciona como único punto de entrada externo de la aplicación.
