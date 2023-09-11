# Rider Creator

![Mockup preview](https://github.com/danilopgon/rider-creator/assets/113547781/10e2a8c3-1f55-4e91-9d81-d4a8786d8fe3)

Proyecto final de @michelcub, @RofinhoOo y @danilopgon para 4 Geeks.

Nuestro creador de riders es una poderosa herramienta diseñada para facilitar la comunicación y coordinación entre grupos musicales, promotores de conciertos y técnicos de sonido. Este proyecto tiene como objetivo simplificar la creación y gestión de riders de conciertos, lo que permite a todas las partes involucradas en un evento de música trabajar de manera más eficiente y efectiva.

### Características Clave

- **Generación de Riders Personalizados**: La aplicación permite a los grupos musicales crear riders de conciertos personalizados con facilidad, especificando sus necesidades técnicas y logísticas.

- **Diseño responsive**: Puedes editar los riders en tu móvil. ¡Arregla esos problemas de última hora!

- **Seguridad de Datos**: Utilizamos la autenticación JWT y una base de datos segura para garantizar la protección de la información confidencial.

### Tecnologías Utilizadas

- **Front-end**: Desarrollado en React, con una interfaz de usuario moderna.

- **Back-end**: Utilizamos Flask para crear un servidor robusto y escalable que gestiona las solicitudes de los usuarios.

- **Diseño de Interfaz**: Hemos empleado Tailwind CSS y DaisyUI para garantizar un diseño limpio y atractivo.


## Backend desde la raiz:

```
pipenv install
pipenv shell
pipenv run start
```

## Frontend desde app:

```
npm install
npm run dev
_________________

Antes de ejecutar en el server de APP.py:

npm run build

```
## Migrate db
```
pipenv run init  -> para iniciar la db (solo se hace una vez)
pipenv run migrate -> registrar los cambios de la db
pipenv run upgrade -> aplicar los cambios en la db
pipenv  run downgrade -> deshacer el ultimo cambio de la db
```
