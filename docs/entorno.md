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
