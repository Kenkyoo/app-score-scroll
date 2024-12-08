# App Score Scroll

**App Score Scroll** es una aplicación web que muestra la tabla de posiciones, los fixtures y otros detalles de la liga de fútbol argentino (o cualquier otra liga compatible) en tiempo real. Utiliza la API de [API-Sports](https://www.api-football.com/) para obtener la información de los partidos, la clasificación y otros detalles de la liga.

## Características

- **Posiciones:** Muestra la tabla de posiciones con estadísticas de cada equipo, como victorias, empates, derrotas y puntos.
- **Fixture:** Muestra los próximos partidos de la liga, incluyendo fecha, equipos enfrentados, estadio y árbitro.
- **Table:** Visualiza la tabla detallada con estadísticas completas de los equipos.

## Tecnologías

- **HTML5** para la estructura base.
- **CSS** y **Bulma** para el diseño responsivo y moderno.
- **JavaScript** con **jQuery** para la manipulación del DOM y la interacción con la API.
- **Axios** para hacer las solicitudes HTTP a la API.
- **ScrollReveal** para efectos visuales en los resultados.

## Enlace

Puedes acceder a la aplicación en el siguiente enlace:

[App Score Scroll en Vercel](https://app-score-scroll.vercel.app/)

## Instalación

### Requisitos

Asegúrate de tener **Node.js** y **npm** instalados en tu máquina. Puedes descargarlos desde [nodejs.org](https://nodejs.org/).

### Clonación del repositorio

Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/Kenkyoo/app-score-scroll.git
cd app-score-scroll

Instalación de dependencias

Instala las dependencias necesarias para la aplicación:

npm install

Ejecutar la aplicación

Para iniciar el servidor de desarrollo y visualizar la aplicación en tu navegador:

npm start

Esto ejecutará la aplicación localmente en http://localhost:1234.
API

La aplicación utiliza la API de API-Sports, por lo que es necesario contar con una clave de API para acceder a los datos de las ligas y los fixtures. Si aún no tienes una clave, regístrate en su plataforma y obtén la tuya.

Nota: La clave de API ya está configurada en el código, pero si deseas personalizarla, puedes hacerlo en el archivo app.js.
Contribuciones

Si tienes alguna mejora o corrección, siéntete libre de hacer un fork del repositorio y abrir un pull request con tus cambios. Asegúrate de seguir las mejores prácticas y mantener el código lo más limpio posible.
Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

