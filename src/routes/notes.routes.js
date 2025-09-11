/**
 * @fileoverview Configuración de rutas para la gestión de notas/productos
 * Maneja todas las operaciones CRUD para las notas de los usuarios
 * @module routes/notes
 * @version 1.0.0
 */

const { Router } = require('express');
const router = Router();

// Importamos las funciones del controlador de notas
const { 
    renderNoteForm, 
    createNewNote, 
    renderNotes, 
    renderEditForm, 
    updateNote, 
    deleteNote 
} = require('../controllers/notes.controller');

// Middleware de autenticación
const { isAuthenticated } = require('../helpers/auth');

/**
 * Middleware para aplicar a todas las rutas de notas
 * Verifica que las rutas sean accesibles solo para usuarios autenticados
 */
router.use('/notas', isAuthenticated);

/**
 * Grupo de rutas para la gestión de notas
 * Todas las rutas utilizan middleware isAuthenticated aplicado con router.use
 */

/**
 * Ruta para renderizar el formulario de agregar una nueva nota
 * @route GET /notas/agregar
 * @access Private
 * @description Renderiza un formulario para agregar una nueva nota o producto
 */
router.get('/notas/agregar', renderNoteForm);

/**
 * Ruta para crear una nota nueva
 * @route POST /notas/nota-nueva
 * @access Private
 * @description Procesa y crea una nota nueva con los datos enviados desde el formulario
 * @returns {Redirect} - Redirige a la lista de notas en caso de éxito
 */
router.post('/notas/nota-nueva', createNewNote);

/**
 * Ruta para listar todas las notas
 * @route GET /notas
 * @access Private
 * @description Renderiza una lista de todas las notas existentes del usuario actual
 * @returns {View} - Vista con todas las notas del usuario autenticado
 */
router.get('/notas', renderNotes);

/**
 * Ruta para renderizar el formulario de edición de una nota existente
 * @route GET /notas/editar/:id
 * @access Private
 * @param {string} id - ID de la nota a editar (MongoDB ObjectId)
 * @description Renderiza el formulario de edición de la nota con el ID especificado
 * @security Verifica que la nota pertenezca al usuario actual
 */
router.get('/notas/editar/:id', renderEditForm);

/**
 * Ruta para actualizar una nota existente
 * @route PUT /notas/editar/:id
 * @access Private
 * @param {string} id - ID de la nota a actualizar (MongoDB ObjectId)
 * @description Actualiza la nota con el ID especificado usando los datos del formulario
 * @security Verifica que la nota pertenezca al usuario actual
 * @returns {Redirect} - Redirige a la lista de notas en caso de éxito
 */
router.put('/notas/editar/:id', updateNote);

/**
 * Ruta para eliminar una nota existente
 * @route DELETE /notas/borrar/:id
 * @access Private
 * @param {string} id - ID de la nota a eliminar (MongoDB ObjectId)
 * @description Elimina la nota con el ID especificado permanentemente
 * @security Verifica que la nota pertenezca al usuario actual
 * @returns {Redirect} - Redirige a la lista de notas en caso de éxito
 */
router.delete('/notas/borrar/:id', deleteNote);

// Exportamos el router para que pueda ser utilizado en otros archivos
module.exports = router;
