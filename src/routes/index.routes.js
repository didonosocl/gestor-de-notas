/**
 * @fileoverview Configuración de rutas principales de la aplicación
 * Maneja las rutas para la página de inicio y páginas informativas generales
 * @module routes/index
 * @version 1.0.0
 */

const { Router } = require('express');
const router = Router();

// Importamos controladores y middleware de autenticación
const { 
    renderIndex, 
    renderFaq, 
    renderContact, 
    submitContact,
    renderPrivacy,
    renderTerms
} = require('../controllers/index.controller');
const { isAuthenticated } = require('../helpers/auth');

/**
 * Ruta principal del sitio web
 * @route GET /
 * @access Public - No requiere autenticación
 * @description Renderiza la página principal/landing page del gestor de notas
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

/**
 * Ruta para mostrar el formulario de contacto
 * @route GET /contacto
 * @access Private - Requiere autenticación
 * @description Renderiza la página de contacto con el formulario
 * @middleware isAuthenticated - Verifica que el usuario haya iniciado sesión
 */
router.get('/contacto', isAuthenticated, renderContact);

/**
 * Ruta para procesar el formulario de contacto
 * @route POST /contacto
 * @access Private - Requiere autenticación
 * @description Procesa el envío del formulario, guarda en BD y envía correo
 * @middleware isAuthenticated - Verifica que el usuario haya iniciado sesión
 */
router.post('/contacto', isAuthenticated, submitContact);

/**
 * Ruta de Política de Privacidad
 * @route GET /privacidad
 * @access Public - No requiere autenticación
 * @description Renderiza la página de política de privacidad
 */
router.get('/privacidad', renderPrivacy);

/**
 * Ruta de Términos de Servicio
 * @route GET /terminos
 * @access Public - No requiere autenticación
 * @description Renderiza la página de términos de servicio
 */
router.get('/terminos', renderTerms);

// Exportamos el router para que pueda ser usado en otros archivos
module.exports = router;
