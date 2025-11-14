/**
 * @fileoverview Controlador para las rutas principales de la aplicación (índice, FAQ y Contacto).
 * Maneja la renderización de las páginas públicas principales y el sistema de contacto.
 * 
 * @module controllers/index
 * @author Diego Donoso
 * @version 1.3.0
 */

'use strict';

const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

// Objeto contenedor del controlador
const indexController = {};

/**
 * Renderiza la página principal (índice) con datos dinámicos.
 * 
 * @function renderIndex
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @param {Function} next - Función para pasar control al siguiente middleware.
 * @returns {void} Renderiza la vista 'index' con datos de la aplicación.
 * 
 * @example
 * // En routes/index.routes.js
 * router.get('/', indexController.renderIndex);
 */
indexController.renderIndex = (req, res, next) => {
    try {
        // Datos dinámicos para la página principal
        const viewData = {
            isAuthenticated: req.isAuthenticated(),
            user: req.user,
            currentYear: new Date().getFullYear(),
            appVersion: process.env.npm_package_version || '1.0.0'
        };
        
        res.render('index', viewData);
    } catch (error) {
        console.error('Error al renderizar la página principal:', error);
        next(error); // Pasar el error al manejador de errores
    }
};

/**
 * Renderiza la página de Preguntas Frecuentes (FAQ) con mejoras de seguridad.
 * Implementa verificación de encabezados para mitigar ataques CSRF.
 * 
 * @function renderFaq
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @param {Function} next - Función para pasar control al siguiente middleware.
 * @returns {void} Renderiza la vista 'faq' con datos contextuales.
 * 
 * @example
 * // En routes/index.routes.js
 * router.get('/faq', indexController.renderFaq);
 */
indexController.renderFaq = (req, res, next) => {
    try {
        // Implementación de seguridad: verificación del referrer
        const referer = req.get('Referer');
        const host = req.get('host');
        
        // Verificar referrer solo en entorno de producción
        if (process.env.NODE_ENV === 'production') {
            if (referer && !referer.startsWith(req.protocol + '://' + host)) {
                console.warn(`Acceso sospechoso a FAQ desde: ${referer}`);
                return res.status(403).render('errors/403', { 
                    message: 'Acceso no autorizado. Por favor, navega desde nuestra página principal.' 
                });
            }
        }
        
        // Datos para la vista
        const viewData = {
            isAuthenticated: req.isAuthenticated(),
            user: req.user,
            currentYear: new Date().getFullYear(),
            faqCategories: [
                'General',
                'Cuenta',
                'Notas',
                'Soporte'
            ]
        };
        
        res.render('faq', viewData);
    } catch (error) {
        console.error('Error al renderizar la página FAQ:', error);
        next(error);
    }
};

/**
 * Renderiza la página de contacto con protección anti-spam.
 * 
 * @function renderContact
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @param {Function} next - Función para pasar control al siguiente middleware.
 * @returns {void} Renderiza la vista de contacto con datos necesarios.
 */
indexController.renderContact = (req, res, next) => {
    try {
        // Datos para la vista de contacto
        const viewData = {
            isAuthenticated: req.isAuthenticated(),
            user: req.user,
            currentYear: new Date().getFullYear()
        };
        
        res.render('contact', viewData);
    } catch (error) {
        console.error('Error al renderizar página de contacto:', error);
        next(error);
    }
};

/**
 * Renderiza la página de política de privacidad.
 * 
 * @function renderPrivacy
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {void} Renderiza la vista de privacidad.
 */
indexController.renderPrivacy = (req, res) => {
    res.render('privacy', {
        isAuthenticated: req.isAuthenticated(),
        user: req.user
    });
};

/**
 * Renderiza la página de términos de servicio.
 * 
 * @function renderTerms
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {void} Renderiza la vista de términos.
 */
indexController.renderTerms = (req, res) => {
    res.render('terms', {
        isAuthenticated: req.isAuthenticated(),
        user: req.user
    });
};

/**
 * Procesa el formulario de contacto: guarda en BD y envía correo electrónico.
 * 
 * @function submitContact
 * @param {Object} req - Objeto de solicitud Express con los datos del formulario.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {void} Redirige con mensaje de éxito o error.
 */
indexController.submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Validación básica
        if (!name || !email || !subject || !message) {
            req.flash('error_msg', 'Por favor completa todos los campos del formulario.');
            return res.redirect('/contacto');
        }
        
        // Obtener IP del cliente (para seguridad y prevención de spam)
        const ipAddress = req.headers['x-forwarded-for'] || 
                         req.connection.remoteAddress || 
                         req.socket.remoteAddress || 
                         null;
        
        // 1. Guardar en la base de datos
        const contactData = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            subject: subject.trim(),
            message: message.trim(),
            userId: req.user ? req.user.id : null,
            ipAddress: ipAddress
        };
        
        const newContact = new Contact(contactData);
        await newContact.save();
        
        // 2. Configurar y enviar correo electrónico
        try {
            // Configurar el transportador de correo
            // NOTA: Para producción, usa variables de entorno para las credenciales
            const transporter = nodemailer.createTransport({
                service: 'gmail', // Puedes usar otros servicios: outlook, yahoo, etc.
                auth: {
                    user: process.env.EMAIL_USER || 'tu-email@gmail.com', // Cambiar por tu email
                    pass: process.env.EMAIL_PASS || 'tu-contraseña-de-aplicación' // Usar contraseña de aplicación
                }
            });
            
            // Contenido del correo
            const mailOptions = {
                from: `"Gestor de Notas - Contacto" <${process.env.EMAIL_USER || 'noreply@gestornotas.com'}>`,
                to: 'diegoignaciodonosovera@gmail.com',
                subject: `📧 Nuevo mensaje de contacto: ${subject}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
                        <div style="background-color: #4e73df; color: white; padding: 20px; border-radius: 10px 10px 0 0;">
                            <h2 style="margin: 0;">📬 Nuevo Mensaje de Contacto</h2>
                        </div>
                        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <h3 style="color: #4e73df; border-bottom: 2px solid #4e73df; padding-bottom: 10px;">
                                ${subject}
                            </h3>
                            
                            <div style="margin: 20px 0;">
                                <p style="margin: 10px 0;"><strong>👤 Nombre:</strong> ${name}</p>
                                <p style="margin: 10px 0;"><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
                                <p style="margin: 10px 0;"><strong>📅 Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
                                ${req.user ? `<p style="margin: 10px 0;"><strong>👥 Usuario registrado:</strong> Sí</p>` : ''}
                            </div>
                            
                            <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #4e73df; margin: 20px 0;">
                                <h4 style="margin-top: 0; color: #5a5c69;">💬 Mensaje:</h4>
                                <p style="white-space: pre-wrap; line-height: 1.6; color: #5a5c69;">${message}</p>
                            </div>
                            
                            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e3e6f0; text-align: center; color: #858796; font-size: 12px;">
                                <p>Este mensaje fue enviado desde el formulario de contacto de Gestor de Notas</p>
                                <p>IP: ${ipAddress || 'No disponible'} | ID: ${newContact._id}</p>
                            </div>
                        </div>
                    </div>
                `,
                // Versión texto plano (fallback)
                text: `
Nuevo mensaje de contacto

Asunto: ${subject}
Nombre: ${name}
Email: ${email}
Fecha: ${new Date().toLocaleString('es-ES')}

Mensaje:
${message}

---
IP: ${ipAddress || 'No disponible'}
ID: ${newContact._id}
                `
            };
            
            // Enviar el correo
            await transporter.sendMail(mailOptions);
            
            // Éxito: guardado en BD y correo enviado
            req.flash('success_msg', '¡Mensaje enviado con éxito! Te responderemos pronto a tu correo.');
            
        } catch (emailError) {
            // Error al enviar correo, pero guardado en BD
            console.error('Error al enviar correo:', emailError);
            req.flash('success_msg', 'Tu mensaje ha sido guardado. Lamentablemente hubo un problema al enviar la notificación por correo, pero nos pondremos en contacto contigo pronto.');
        }
        
        res.redirect('/contacto');
        
    } catch (error) {
        console.error('Error al procesar formulario de contacto:', error);
        
        // Mensaje de error específico si es un error de validación de Mongoose
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            req.flash('error_msg', `Error de validación: ${errors.join(', ')}`);
        } else {
            req.flash('error_msg', 'Hubo un error al enviar tu mensaje. Por favor intenta nuevamente.');
        }
        
        res.redirect('/contacto');
    }
};

/**
 * Maneja la salud del sistema y muestra información básica del estado.
 * Útil para monitoreo y verificaciones de estado del servidor.
 * 
 * @function healthCheck
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {Object} JSON con información del estado del sistema.
 */
indexController.healthCheck = (req, res) => {
    const healthData = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: process.env.npm_package_version || '1.0.0'
    };
    
    res.json(healthData);
};

// Exportamos el controlador para su uso en otras partes de la aplicación
module.exports = indexController;
