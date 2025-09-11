/**
 * @fileoverview Configuración de rutas principales de la aplicación
 * Maneja las rutas para la página de inicio y páginas informativas generales
 * @module routes/index
 * @version 1.0.0
 */

const { Router } = require('express');
const router = Router();

// Importamos controladores y middleware de autenticación
const { renderIndex, renderFaq } = require('../controllers/index.controller');
const { isAuthenticated } = require('../helpers/auth');

/**
 * Ruta principal del sitio web
 * @route GET /
 * @access Public - No requiere autenticación
 * @description Renderiza la página principal/landing page del gestor de productos
 */
router.get('/', renderIndex);

/**
 * Ruta de Preguntas Frecuentes (FAQ)
 * @route GET /faq
 * @access Private - Requiere autenticación
 * @description Renderiza la página de preguntas frecuentes para usuarios autenticados
 * @middleware isAuthenticated - Verifica que el usuario haya iniciado sesión
 */
router.get('/faq', isAuthenticated, renderFaq);

// Exportamos el router para que pueda ser usado en otros archivos
module.exports = router;
