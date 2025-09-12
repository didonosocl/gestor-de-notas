# Gestor de Productos para el Hogar

![Logo del Proyecto](https://i.ibb.co/Qv6FMhZ5/Captura-de-pantalla-2025-09-11-210320.png)

Este proyecto es una aplicación web robusta y optimizada para gestionar y organizar productos necesarios para el hogar. Permite a los usuarios crear cuentas seguras, iniciar sesión con autenticación avanzada y administrar sus propias listas de compras. Cada usuario tiene acceso a sus propias "notas", donde puede seleccionar productos desde una lista predefinida y llevar un registro de los artículos que necesita comprar. La aplicación cuenta con un sistema completo de registro de actividades, validación avanzada y medidas de seguridad implementadas siguiendo las mejores prácticas del desarrollo web moderno.

## Tecnologías utilizadas

- **Node.js**: Backend construido con Node.js, proporcionando una estructura eficiente y escalable para manejar las solicitudes del usuario y la lógica de la aplicación.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar de forma flexible los datos de los usuarios, notas y productos seleccionados.
- **Mongoose**: ODM avanzado para MongoDB con validación, middleware y hooks para optimizar las operaciones de la base de datos.
- **Express.js**: Framework para Node.js, utilizado para gestionar las rutas y facilitar la creación del servidor.
- **HTML, CSS y JavaScript**: Tecnologías utilizadas para el frontend y la interfaz de usuario.
- **Bootstrap 5**: Framework CSS para el diseño y la creación de interfaces modernas, responsivas y adaptables a diferentes tamaños de pantalla. Se ha utilizado para mejorar la apariencia y la usabilidad de la aplicación sin depender de jQuery.
- **FontAwesome**: Librería de iconos que permite añadir iconos vectoriales escalables y personalizables a la aplicación web.
- **Handlebars (HBS)**: Motor de plantillas utilizado para generar vistas dinámicas y mantener un código frontend modular y mantenible.
- **MVC Pattern**: Arquitectura Modelo-Vista-Controlador implementada para separar claramente las responsabilidades del código.

## Módulos de npm utilizados

El proyecto utiliza los siguientes módulos de npm para gestionar las funcionalidades de la aplicación:

### Core y Framework
- **express**: Framework web para Node.js que facilita la creación de aplicaciones y el manejo de rutas.
- **express-handlebars**: Motor de plantillas para generar vistas HTML dinámicas en el frontend.
- **express-session**: Middleware para gestionar las sesiones de usuario, permitiendo que los usuarios inicien sesión y mantengan su sesión activa.
- **method-override**: Middleware que permite usar métodos HTTP como PUT o DELETE en formularios que solo soportan POST o GET.
- **dotenv**: Módulo para cargar variables de entorno desde un archivo `.env`, permitiendo gestionar de forma segura claves y configuraciones sensibles.

### Base de datos y ORM
- **mongoose**: Biblioteca de modelado de datos para MongoDB, con características avanzadas como middleware, validación, virtual properties y más.

### Autenticación y Seguridad
- **bcryptjs**: Biblioteca para encriptar contraseñas de forma segura, implementando comparación en tiempo constante.
- **passport**: Middleware para la autenticación de usuarios, permitiendo diversas estrategias de autenticación.
- **passport-local**: Estrategia de autenticación local para usar nombre de usuario y contraseña en el inicio de sesión.
- **connect-flash**: Módulo para mostrar mensajes flash (mensajes temporales) a los usuarios, como notificaciones de éxito o error.
- **crypto**: Módulo nativo de Node.js utilizado para generación de tokens criptográficamente seguros.

### Logging y Monitoreo
- **morgan**: Middleware para el registro de logs HTTP. Se utiliza para generar información sobre las solicitudes que se hacen a la aplicación.
- **fs.promises**: API de sistema de archivos basada en promesas para operaciones de registro y lectura de logs.

### Geolocalización y Seguridad
- **geoip-lite**: Biblioteca para obtener información geográfica a partir de direcciones IP. Permite determinar la ubicación aproximada de los usuarios.
- **axios**: Cliente HTTP basado en promesas utilizado para enriquecer datos de geolocalización con información de ISP desde servicios como ipinfo.io.

### Validación
- **express-validator**: Conjunto de middlewares para validación y sanitización de datos de entrada.

### Herramientas de Desarrollo
- **nodemon**: Herramienta que reinicia automáticamente el servidor de desarrollo cuando se realizan cambios en los archivos.
- **npm-check-updates**: Herramienta que permite actualizar las dependencias del `package.json` a la última versión disponible.

## Características principales

### Usuario y Autenticación
- **Registro e ingreso de usuarios**: Sistema robusto con validación avanzada de contraseñas, verificación de correo electrónico y protección contra ataques de fuerza bruta.
- **Gestión de sesiones seguras**: Manejo optimizado de sesiones con configuración de cookies seguras y tiempos de expiración configurables.
- **Sistema de roles**: Estructura preparada para diferentes niveles de acceso (usuario, admin) para futuras expansiones.

### Funcionalidad de Notas
- **Notas personalizadas**: Cada usuario puede crear y editar notas con productos seleccionados desde una lista categorizada de productos necesarios para el hogar.
- **Selección de productos**: Una lista de productos predefinidos permite seleccionar los artículos que el usuario desea agregar a sus notas.
- **Búsqueda y filtrado**: Capacidad para buscar y filtrar notas por título, fecha o estado.
- **Ordenamiento inteligente**: Las notas pueden organizarse cronológicamente o por prioridad.
- **Paginación**: Sistema de paginación eficiente para manejar grandes cantidades de notas.

### Interfaz y Experiencia de Usuario
- **Interfaz adaptativa**: Diseño completamente responsive que se adapta a dispositivos móviles, tablets y desktops.
- **Notificaciones y alertas**: Sistema de mensajes flash mejorado para proporcionar feedback inmediato al usuario.
- **Navegación intuitiva**: Estructura de menús clara y accesible desde cualquier sección.
- **Temas visuales**: Soporte para modo claro/oscuro y personalización visual.

### Seguridad y Protección de Datos
- **Encriptación avanzada**: Contraseñas protegidas con bcryptjs usando factores de coste óptimos.
- **Protección contra ataques comunes**: Implementaciones para prevenir XSS, CSRF, inyección y otros vectores de ataque.
- **Validación exhaustiva**: Sanitización y validación de todas las entradas de usuario.
- **Sistema anti-bot**: Preparado para integración con reCAPTCHA para prevenir registros automatizados.

### Registro y Auditoría
- **Sistema completo de logging**: Registros detallados de actividades críticas como inicios de sesión, creación de notas y cambios importantes.
- **Monitoreo de seguridad**: Detección de actividades sospechosas basada en patrones geográficos y comportamentales.
- **Trazabilidad completa**: Cada acción queda registrada con timestamps y datos contextuales para auditoría.

## ¿Cómo funciona?

### Flujo de Usuario Mejorado

1. **Registro Seguro**: 
   - Los usuarios se registran proporcionando nombre, correo electrónico y contraseña
   - El sistema valida la complejidad de la contraseña (mínimo 8 caracteres, mayúsculas, minúsculas y números)
   - Verificación opcional de correo electrónico con token seguro
   - Protección contra registros automatizados mediante reCAPTCHA (configurable)

2. **Autenticación Robusta**:
   - Inicio de sesión seguro con límite de intentos
   - Protección contra ataques de fuerza bruta
   - Registro detallado de todos los intentos de inicio de sesión con información geográfica
   - Manejo seguro de sesiones con tiempo de expiración configurable

3. **Gestión de Notas**:
   - Interfaz intuitiva para crear, editar y eliminar notas
   - Validación completa de datos de entrada
   - Búsqueda y filtrado avanzado de notas por múltiples criterios
   - Sistema de paginación para manejar eficientemente grandes colecciones

4. **Seguridad Integral**:
   - Almacenamiento seguro de datos sensibles
   - Protección contra inyecciones y ataques comunes
   - Sistema de auditoría completo con registros detallados
   - Sanitización de todas las entradas de usuario

5. **Experiencia de Usuario Optimizada**:
   - Interfaz responsive que se adapta a dispositivos móviles y escritorio
   - Feedback inmediato mediante sistema de notificaciones
   - Navegación clara y accesible desde cualquier sección
   - Diseño limpio y moderno que prioriza la usabilidad

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

## 🔒 Sistema de Auditoría y Seguridad Avanzado

La aplicación cuenta con un sistema completo y estructurado de registro de actividades que monitorea múltiples aspectos de la interacción del usuario, proporcionando una robusta capa de seguridad y facilitando tanto la detección de posibles accesos no autorizados como el seguimiento de acciones importantes en el sistema.

### 📋 Sistema de Logs Multifuncional

El sistema de registro ahora está organizado en múltiples archivos especializados dentro del directorio `/logs`:

#### 1️⃣ Intentos de Inicio de Sesión (`intentos-inicio-sesion.log`)
Registra cada intento de acceso al sistema con información detallada:

```
[2025-05-15T04:48:33.997Z] IP: 127.0.0.1 | Correo: test@gmail.com | Método: POST | User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0 | País: Desconocido | Ciudad: Desconocido | ISP: Desconocido
```

#### 2️⃣ Sesiones de Usuario (`sesiones-usuarios.log`)
Registra eventos relacionados con las sesiones de usuario:
- Registro de nuevos usuarios
- Inicios de sesión exitosos
- Cierre de sesiones
- Cambios en datos de cuenta

```
[2025-09-10T14:32:45.123Z] Nuevo usuario registrado: usuario@ejemplo.com (65fe8a7b2c9a1d3e4f5b6c7d)
[2025-09-10T15:10:22.546Z] Usuario usuario@ejemplo.com (65fe8a7b2c9a1d3e4f5b6c7d) cerró sesión
```

#### 3️⃣ Actividad de Notas (`notas-actividad.log`)
Seguimiento detallado de todas las operaciones relacionadas con notas:
- Creación de nuevas notas
- Edición de notas existentes
- Eliminación de notas
- Consultas importantes

```
[2025-09-10T16:05:12.789Z] Nueva nota creada - ID: 65fe8c9d2e3f4a5b6c7d8e9f, Usuario: 65fe8a7b2c9a1d3e4f5b6c7d, Título: "Lista de compras semanal"
```

#### 4️⃣ Registro de Errores (`errores.log`)
Captura detallada de excepciones y errores en el sistema:

```
[2025-09-10T17:22:33.456Z] [users.controller.signup] Error: Fallo en la conexión a la base de datos
Error: MongoServerError: Connection timeout
    at /src/controllers/users.controller.js:142:23
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
```

### 📊 Información Registrada y Mejoras

El sistema ahora captura y estructura la información de manera consistente en todos los logs:

- **Marca temporal estandarizada**: Formato ISO 8601 con precisión de milisegundos
- **Datos contextuales**: Información específica para cada tipo de evento
- **Trazabilidad completa**: Identificadores únicos para usuarios, notas y sesiones
- **Detalles de error**: Para errores, se registra tanto el mensaje como el stack trace completo
- **Estructura consistente**: Formato uniforme para facilitar análisis y procesamiento automatizado

### 🛡️ Beneficios del Sistema Mejorado

Esta arquitectura de registro avanzada proporciona ventajas significativas:

- **Diagnóstico rápido**: Facilita la identificación y resolución de problemas
- **Análisis segmentado**: Permite revisar actividades específicas sin tener que procesar todos los logs
- **Monitoreo granular**: Capacidad para establecer alertas basadas en patrones específicos en cada tipo de log
- **Administración simplificada**: Rotación y retención de logs más eficiente al estar segmentados por funcionalidad
- **Escalabilidad**: Diseñado para mantener el rendimiento incluso con alto volumen de actividad
- **Cumplimiento normativo**: Facilita el cumplimiento de requisitos regulatorios sobre registro y auditoría de actividades

Los administradores pueden utilizar esta información para implementar medidas adicionales de seguridad, análisis de comportamiento de usuarios, detección de anomalías y mejora continua de la experiencia del usuario.

## Mejoras Técnicas Implementadas

### 🧠 Optimizaciones en Modelos (MongoDB/Mongoose)
- **Virtual Properties**: Implementación de campos virtuales para cálculos dinámicos sin almacenamiento.
- **Índices Optimizados**: Configuración de índices estratégicos para mejorar el rendimiento de consultas frecuentes.
- **Validación Avanzada**: Reglas de validación robustas a nivel de esquema para garantizar la integridad de datos.
- **Middleware Pre/Post**: Utilización de hooks de Mongoose para ejecutar lógica antes y después de operaciones cruciales.
- **Optimización de Consultas**: Uso de `lean()` y selección específica de campos para reducir el overhead en operaciones de lectura.
- **Soft Delete Pattern**: Implementación de borrado lógico para mantener historial completo de datos.

### 🔐 Mejoras de Seguridad
- **Hashing Mejorado**: Optimización de los factores de coste de bcrypt para equilibrar seguridad y rendimiento.
- **Sanitización de Entradas**: Limpieza exhaustiva de todas las entradas de usuario.
- **Protección de Sesiones**: Configuración robusta de cookies con flags secure, httpOnly y sameSite.
- **Validación en Capas**: Implementación de validación tanto en cliente como en servidor.
- **Timeouts de Seguridad**: Implementación de delays de seguridad para prevenir timing attacks.
- **Auditoría Completa**: Sistema de logs segmentados para monitoreo y análisis de seguridad.

### 🚀 Mejoras de Rendimiento
- **Carga Optimizada**: Minimización de dependencias y optimización de carga de módulos.
- **Caching Estratégico**: Implementación de caché para datos frecuentemente accedidos.
- **Conexiones Persistentes**: Optimización de conexiones a MongoDB para evitar sobrecarga.
- **Manejo Asíncrono**: Uso consistente de async/await para operaciones no bloqueantes.
- **Streaming de Datos**: Implementación de streams para manejo eficiente de grandes volúmenes de datos.
- **Análisis de N+1**: Resolución de problemas de consultas en cascada para mejorar la eficiencia.

### 📝 Sistema de Documentación
- **JSDoc Completo**: Documentación exhaustiva de código con JSDoc para todos los componentes clave.
- **Tipado y Estructura**: Definición clara de tipos de parámetros y valores de retorno.
- **Ejemplos de Uso**: Documentación con ejemplos prácticos para facilitar el mantenimiento.
- **Separación de Responsabilidades**: Estructura de código clara siguiendo principios SOLID.
- **Comentarios Estratégicos**: Explicaciones detalladas en secciones complejas o críticas.
- **Guías de Contribución**: Documentación para desarrolladores que deseen contribuir al proyecto.

### 📊 Interfaz y UX
- **Diseño Responsive**: Interfaz completamente adaptativa a todos los tamaños de dispositivos.
- **Accesibilidad**: Implementación de prácticas WCAG para mejorar la accesibilidad.
- **Feedback Visual**: Sistema mejorado de notificaciones y estados visuales.
- **Navegación Intuitiva**: Estructura de menús optimizada para una experiencia fluida.
- **Consistencia Visual**: Sistema de diseño coherente en toda la aplicación.
- **Modo Oscuro**: Soporte para preferencias de tema claro/oscuro.

## Hecho por

**Diego Donoso Vera**

---

![Dashboard](https://i.ibb.co/PZKwLZK0/Captura-de-pantalla-2025-09-11-210412.png)
*Vista de Dashboard con listado de notas y estadísticas de usuario*

![Modo Móvil](https://i.ibb.co/CsKH05Jc/Captura-de-pantalla-2025-09-11-210512.png)
*Interfaz adaptativa para dispositivos móviles*
