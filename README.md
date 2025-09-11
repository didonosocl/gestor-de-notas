# Gestor de Productos para el Hogar

![Logo del Proyecto](https://i.ibb.co/DHjkr6dv/Captura-de-pantalla-2025-02-19-024457.png)

Este proyecto es una aplicación web para gestionar y organizar productos necesarios para el hogar. Permite a los usuarios crear cuentas, iniciar sesión y administrar sus propias listas de compras. Cada usuario tiene acceso a sus propias "notas", donde puede seleccionar productos desde una lista predefinida y llevar un registro de los artículos que necesita comprar.

## Tecnologías utilizadas

- **Node.js**: Backend construido con Node.js, proporcionando una estructura eficiente y escalable para manejar las solicitudes del usuario y la lógica de la aplicación.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar de forma flexible los datos de los usuarios, notas y productos seleccionados.
- **Express.js**: Framework para Node.js, utilizado para gestionar las rutas y facilitar la creación del servidor.
- **HTML, CSS y JavaScript**: Tecnologías utilizadas para el frontend y la interfaz de usuario.
- **Bootstrap 5**: Framework CSS para el diseño y la creación de interfaces modernas, responsivas y adaptables a diferentes tamaños de pantalla. Se ha utilizado para mejorar la apariencia y la usabilidad de la aplicación sin depender de jQuery.
- **FontAwesome**: Librería de iconos que permite añadir iconos vectoriales escalables y personalizables a la aplicación web.

## Módulos de npm utilizados

El proyecto utiliza los siguientes módulos de npm para gestionar las funcionalidades de la aplicación:

- **express**: Framework web para Node.js que facilita la creación de aplicaciones y el manejo de rutas.
- **connect-flash**: Módulo para mostrar mensajes flash (mensajes temporales) a los usuarios, como notificaciones de éxito o error.
- **bcryptjs**: Biblioteca para encriptar contraseñas de forma segura.
- **express-handlebars**: Motor de plantillas para generar vistas HTML dinámicas en el frontend.
- **express-session**: Middleware para gestionar las sesiones de usuario, permitiendo que los usuarios inicien sesión y mantengan su sesión activa.
- **method-override**: Middleware que permite usar métodos HTTP como PUT o DELETE en formularios que solo soportan POST o GET.
- **mongoose**: Biblioteca de modelado de datos para MongoDB, que facilita la interacción con la base de datos y la definición de esquemas.
- **passport**: Middleware para la autenticación de usuarios, permitiendo diversas estrategias de autenticación.
- **passport-local**: Estrategia de autenticación local para usar nombre de usuario y contraseña en el inicio de sesión.
- **dotenv**: Módulo para cargar variables de entorno desde un archivo `.env`, permitiendo gestionar de forma segura claves y configuraciones sensibles en el proyecto.
- **nodemon**: Herramienta que reinicia automáticamente el servidor de desarrollo cuando se realizan cambios en los archivos del proyecto, facilitando el proceso de desarrollo.
- **npm-check-updates**: Herramienta que permite actualizar las dependencias del `package.json` a la última versión disponible de forma fácil, ayudando a mantener las dependencias del proyecto actualizadas.
- **morgan**: Middleware para el registro de logs HTTP. Se utiliza para generar información sobre las solicitudes que se hacen a la aplicación, incluyendo detalles como el método HTTP, la ruta solicitada, el código de estado y el tiempo de respuesta. Este módulo es útil principalmente en entornos de desarrollo para depurar y monitorear el tráfico de la aplicación.
 - **geoip-lite**: Biblioteca para obtener información geográfica a partir de direcciones IP. Permite determinar la ubicación aproximada de los usuarios que acceden a la aplicación, incluyendo país, región, ciudad y coordenadas geográficas, lo que puede utilizarse para personalizar la experiencia de usuario o para análisis de tráfico.
 - **axios**: Cliente HTTP basado en promesas para Node.js y el navegador. Se utiliza para realizar solicitudes HTTP externas, por ejemplo, para obtener información adicional sobre el proveedor de servicios de Internet (ISP) de una dirección IP mediante servicios como ipinfo.io.

## Características principales

- **Registro e ingreso de usuarios**: Los usuarios pueden crear una cuenta y acceder a su perfil personalizado para gestionar sus notas de compra.
- **Notas personalizadas**: Cada usuario puede crear y editar notas con productos seleccionados desde una lista categorizada de productos necesarios para el hogar (supermercado, limpieza, etc.).
- **Selección de productos**: Una lista de productos predefinidos permite seleccionar los artículos que el usuario desea agregar a sus notas.
- **Interfaz sencilla y amigable**: Fácil de usar, con una experiencia de usuario intuitiva para agregar, editar y revisar productos en las notas.
- **Seguridad**: Implementación de funcionalidades básicas de seguridad para proteger las cuentas de usuario, incluyendo el cifrado de contraseñas con **bcryptjs** y autenticación segura con **passport**.

## ¿Cómo funciona?

1. Los usuarios se registran con un nombre de usuario y una contraseña.
2. Una vez registrados, pueden iniciar sesión para acceder a sus notas personales.
3. Los usuarios pueden seleccionar productos de una lista y agregarlos a una nueva nota o lista de compras.
4. Cada cuenta mantiene un historial de sus notas y productos seleccionados, permitiendo organizar y revisar las compras de forma sencilla.

## Instrucciones de configuración

Antes de ejecutar el proyecto, es necesario configurar las variables de entorno. Para ello:

1. **Crea un archivo `.env`** en la raíz del proyecto.
2. Define las siguientes variables en el archivo `.env`:

   ```env
    # Configuración de la base de datos MongoDB
    MULTIGESTOR_MONGODB_HOST=127.0.0.1
    MULTIGESTOR_MONGODB_PORT=27017
    MULTIGESTOR_MONGODB_DATABASE=gestor-de-productos

    # Configuración de seguridad
    # Nota: En producción, usar una cadena segura y aleatoria para SESSION_SECRET
    SESSION_SECRET=XH4Wfg8BZpA9s2tLqR7Vn3Kd1xJm5TyE

    # Configuración de la aplicación
    PORT=4100
    NODE_ENV=development # Cambiar a 'production' en entorno de producción

    # Tiempo de expiración de sesiones (en milisegundos - 24 horas)
    SESSION_MAX_AGE=86400000

    # Configuración para logs
    LOG_LEVEL=info

## 🔒 Sistema de Auditoría y Seguridad

La aplicación cuenta con un robusto sistema de registro de actividad que monitorea los intentos de inicio de sesión, proporcionando una capa adicional de seguridad y facilitando la detección de posibles accesos no autorizados.

### 📋 Registro de Intentos de Inicio de Sesión

Cada intento de acceso al sistema se registra meticulosamente en el archivo `intentos-inicio-sesion.log` dentro del directorio `/logs`. Estos registros capturan información detallada en formato estructurado:

```
2025-05-15T04:48:33.997Z | IP: 127.0.0.1 | Correo: test@gmail.com | Método: POST | User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0 | País: Desconocido | Ciudad: Desconocido | ISP: Desconocido
```

### 📊 Información Registrada

- **Marca temporal**: Fecha y hora exacta del intento de inicio de sesión en formato ISO 8601
- **Dirección IP**: IP desde donde se origina la solicitud
- **Correo electrónico**: Dirección de correo utilizada en el intento
- **Método HTTP**: Método utilizado para la solicitud (generalmente POST)
- **User-Agent**: Información detallada sobre el navegador y sistema operativo del cliente
- **Geolocalización**: Datos sobre la ubicación geográfica (cuando están disponibles):
  - País
  - Ciudad
  - Proveedor de servicios de Internet (ISP)

### 🛡️ Beneficios de Seguridad

Este sistema de auditoría proporciona ventajas significativas:

- **Detección de patrones sospechosos**: Identificación de múltiples intentos fallidos desde la misma IP
- **Análisis forense**: Registro completo para investigación en caso de incidentes de seguridad
- **Cumplimiento normativo**: Apoyo para requisitos de cumplimiento en protección de datos
- **Monitoreo proactivo**: Capacidad para revisar y analizar la actividad de autenticación del sistema

Los administradores pueden utilizar estas bitácoras para implementar medidas adicionales de seguridad, como el bloqueo temporal de cuentas después de múltiples intentos fallidos o restricciones basadas en ubicación geográfica.

## Hecho por

**Diego Donoso Vera**
