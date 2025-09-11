/**
 * @fileoverview Punto de entrada principal de la aplicación Gestor de Productos
 * Inicia el servidor y establece la conexión a la base de datos
 * @version 1.0.0
 */

// Carga las variables de entorno desde el archivo .env
require('dotenv').config();

// Importa la configuración del servidor Express
const app = require('./server');

// Establece la conexión con la base de datos MongoDB
require('./database');

/**
 * Inicia el servidor HTTP en el puerto configurado
 * Captura errores para evitar caídas inesperadas
 */
app.listen(app.get('port'), () => {
    console.log(`✅ Servidor iniciado en el puerto: ${app.get('port')}`);
    console.log(`🌐 Entorno: ${process.env.NODE_ENV || 'desarrollo'}`);
    console.log(`🕒 ${new Date().toLocaleString()}`);
});