'use strict';

/**
 * @fileoverview Utilidad para manejar el registro de eventos en archivos de log
 * @module helpers/logger
 * @author Diego Donoso
 * @version 1.0.0
 */

const fs = require('fs').promises;
const path = require('path');

/**
 * Directorio donde se almacenan los archivos de log
 * @constant {string}
 */
const LOG_DIR = path.join(__dirname, '../logs');

/**
 * Registra un evento en un archivo de log específico
 * 
 * @async
 * @function logEvent
 * @param {string} filename - Nombre del archivo de log
 * @param {string} message - Mensaje a registrar
 * @returns {Promise<void>}
 */
const logEvent = async (filename, message) => {
    try {
        // Asegurar que el directorio de logs existe
        await fs.mkdir(LOG_DIR, { recursive: true });
        
        // Formatear el mensaje con timestamp
        const timestamp = new Date().toISOString();
        const formattedMessage = `[${timestamp}] ${message}\n`;
        
        // Ruta completa al archivo
        const logFilePath = path.join(LOG_DIR, filename);
        
        // Escribir en el archivo de log
        await fs.appendFile(logFilePath, formattedMessage);
    } catch (error) {
        console.error(`Error al escribir en el archivo de log ${filename}:`, error);
    }
};

/**
 * Registra actividad relacionada con las notas
 * 
 * @async
 * @function logNoteActivity
 * @param {string} message - Mensaje detallando la actividad con la nota
 * @returns {Promise<void>}
 */
const logNoteActivity = (message) => {
    return logEvent('notas-actividad.log', message);
};

/**
 * Registra eventos de sesión de usuario
 * 
 * @async
 * @function logUserSession
 * @param {string} message - Mensaje detallando el evento de sesión
 * @returns {Promise<void>}
 */
const logUserSession = (message) => {
    return logEvent('sesiones-usuarios.log', message);
};

/**
 * Registra intentos de inicio de sesión
 * 
 * @async
 * @function logLoginAttempt
 * @param {string} message - Mensaje detallando el intento de inicio de sesión
 * @returns {Promise<void>}
 */
const logLoginAttempt = (message) => {
    return logEvent('intentos-inicio-sesion.log', message);
};

/**
 * Registra errores del sistema
 * 
 * @async
 * @function logError
 * @param {string} source - Fuente o componente donde ocurrió el error
 * @param {Error|string} error - El error ocurrido
 * @returns {Promise<void>}
 */
const logError = (source, error) => {
    const errorMessage = error instanceof Error 
        ? `${error.message}\n${error.stack}`
        : error;
        
    return logEvent('errores.log', `[${source}] ${errorMessage}`);
};

module.exports = {
    logNoteActivity,
    logUserSession,
    logLoginAttempt,
    logError
};