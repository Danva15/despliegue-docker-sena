# Despliegue automatizado

## Publicación mediante GitHub Actions

La publicación de la imagen del proyecto fue automatizada mediante GitHub Actions.

El flujo se ejecuta automáticamente cuando se realiza un cambio en la rama `main`.

La cadena de publicación es:

```text
Cambio en main
      ↓
GitHub Actions
      ↓
Construcción de la imagen Docker
      ↓
Autenticación mediante GITHUB_TOKEN
      ↓
Publicación en GitHub Container Registry (GHCR)
      ↓
Despliegue en el servidor de producción
```

## Corrida verificada

La ejecución del workflow Publicar imagen finalizó correctamente con estado Success.

Enlace de la corrida:

https://github.com/Danva15/despliegue-docker-sena/actions/runs/36815222698

## Imagen publicada

La imagen fue publicada en GitHub Container Registry (GHCR).

La etiqueta latest corresponde a la publicación automática de la rama main:

ghcr.io/danva15/despliegue-docker-sena:latest

El workflow también genera una etiqueta sha- asociada al commit que originó la imagen.


## Continuación hacia producción

En un entorno de producción, después de publicar la imagen, un segundo trabajo de GitHub Actions podría conectarse al servidor y actualizar los contenedores.

El servidor utilizaría la imagen publicada en GHCR en lugar de construirla localmente.

La secuencia sería:

```
Integrar cambio en main
        ↓
Construir imagen
        ↓
Publicar imagen en GHCR
        ↓
Servidor descarga la imagen
        ↓
Docker Compose actualiza los contenedores
        ↓
Healthcheck verifica el servicio
```

En este proyecto no se ejecuta el despliegue contra un servidor de producción del aula, ya que la guía indica que este paso se estudia y documenta.

## Secretos necesarios

Para realizar un despliegue real mediante SSH, los siguientes valores se almacenarían como secretos de GitHub Actions:

SERVIDOR_SSH_KEY: clave privada SSH utilizada para conectarse al servidor.
SERVIDOR_HOST: dirección o nombre del servidor.
SERVIDOR_USUARIO: usuario utilizado para la conexión SSH.

Estos datos no deben escribirse dentro del repositorio ni incluirse directamente en el workflow.

La publicación de la imagen utiliza GITHUB_TOKEN, proporcionado automáticamente por GitHub Actions, con permisos para publicar paquetes en GHCR.

## Reversión de un despliegue fallido

Las imágenes publicadas mediante etiquetas sha- permiten identificar exactamente el commit asociado a cada versión.

Si un despliegue presentara problemas, se podría seleccionar la etiqueta correspondiente a una versión anterior que haya funcionado y actualizar el archivo compose.yaml del servidor para utilizar esa imagen.

Después se ejecutarían nuevamente los contenedores con:

```bash
docker compose pull
docker compose up -d
```

De esta forma, el servidor volvería a utilizar una imagen anterior sin necesidad de reconstruirla desde cero.

La etiqueta latest no se utilizaría para identificar una versión específica de producción, ya que una etiqueta basada en el commit permite conocer exactamente qué versión está desplegada.
