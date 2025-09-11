/**
 * @fileoverview Configuración de rutas para la autenticación y gestión de usuarios
 * Maneja el registro, inicio y cierre de sesión de usuarios
 * @module routes/users
 * @version 1.0.0
 */

const { Router } = require('express');
const router = Router();
const { isAuthenticated } = require('../helpers/auth');

// Importa los controladores de usuario
const { 
    renderSignupForm, 
    renderSigninForm, 
    signup, 
    signin, 
    logout 
} = require('../controllers/users.controller');

/**
 * @route GET /usuarios/registro
 * @access Public
 * @description Muestra el formulario de registro para nuevos usuarios
 * @returns {View} - Formulario de registro
 */
router.get('/usuarios/registro', renderSignupForm);

/**
 * @route POST /users/signup
 * @access Public
 * @description Procesa el registro de usuario y creación de cuenta
 * @body {string} name - Nombre completo del usuario
 * @body {string} email - Correo electrónico (único en el sistema)
 * @body {string} password - Contraseña (mínimo 6 caracteres)
 * @body {string} confirm_password - Confirmación de contraseña
 * @returns {Redirect} - Redirige a la pantalla de inicio de sesión tras registro exitoso
 * @security Realiza validaciones del lado del servidor para todos los campos
 */
router.post('/users/signup', signup);

/**
 * @route GET /usuarios/ingreso
 * @access Public
 * @description Muestra el formulario de inicio de sesión
 * @returns {View} - Formulario de inicio de sesión
 */
router.get('/usuarios/ingreso', renderSigninForm);

/**
 * @route POST /users/signin
 * @access Public
 * @description Procesa la autenticación del usuario
 * @body {string} email - Correo electrónico del usuario
 * @body {string} password - Contraseña
 * @returns {Redirect} - Redirige a la página de notas si la autenticación es exitosa
 * @security Implementa protecciones contra ataques de fuerza bruta y registra intentos de inicio de sesión
 */
router.post('/users/signin', signin);

/**
 * @route GET /usuarios/salir
 * @access Private - Solo usuarios autenticados
 * @description Cierra la sesión del usuario actual y elimina la cookie de sesión
 * @returns {Redirect} - Redirige a la página de inicio de sesión
 */
router.get('/usuarios/salir', isAuthenticated, logout);

/**
 * @route GET /usuarios/perfil
 * @access Private - Solo usuarios autenticados
 * @description Ruta reservada para futuro uso - Perfil de usuario
 * @returns {String} - Mensaje indicando funcionalidad en desarrollo
 */
// router.get('/usuarios/perfil', isAuthenticated, (req, res) => {
//   res.send('Perfil de usuario - Funcionalidad en desarrollo');
// });

// Exporta el router para ser utilizado en otras partes de la aplicación
module.exports = router;