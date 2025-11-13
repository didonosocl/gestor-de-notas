/**
 * @fileoverview Configuración principal del servidor Express para la aplicación Gestor de Notas.
 * @version 1.0.0
 */

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');

// Inicialización de Express
const app = express();
// Carga la configuración de estrategias de autenticación
require('./config/passport');

/**
 * Configuración de la aplicación Express
 */
// Configuración del puerto (usa variables de entorno o el puerto 4000 como fallback)
app.set('port', process.env.PORT || 4000);
// Define la ubicación de las vistas
app.set('views', path.join(__dirname, '/views'));

/**
 * Configuración del motor de plantillas Handlebars
 * @see https://www.npmjs.com/package/express-handlebars
 */
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    // Configuración para evitar problemas de acceso a propiedades
    // Resuelve advertencias de "Access has been denied to resolve property"
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('view engine', '.hbs');

// Configura express para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Middlewares globales de la aplicación
 */
// Habilita métodos HTTP como DELETE y PUT en formularios
app.use(methodOverride('_method'));

// Logging de solicitudes HTTP (solo en desarrollo)
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// Parseo de datos de formularios
app.use(express.urlencoded({ extended: false }));
// Parseo de datos JSON
app.use(express.json());
/**
 * Configuración de sesiones
 * @see https://www.npmjs.com/package/express-session
 */
app.use(session({
    secret: process.env.SESSION_SECRET || 'mysecret', // Mejor usar variable de entorno
    resave: false, // Optimizado: solo guarda la sesión si hay cambios
    saveUninitialized: false, // Optimizado: cumple mejor con las leyes de privacidad
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || `mongodb://${process.env.MULTIGESTOR_MONGODB_HOST}:${process.env.MULTIGESTOR_MONGODB_PORT}/${process.env.MULTIGESTOR_MONGODB_DATABASE}`,
        touchAfter: 24 * 3600 // lazy session update (en segundos)
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Cookies seguras en producción
        httpOnly: true, // Previene ataques XSS
        maxAge: 1000 * 60 * 60 * 24 // 24 horas
    }
}));

// Inicialización de sistema de autenticación
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/**
 * Middleware para variables globales en vistas
 * Hace accesibles los mensajes flash y datos de usuario en todas las vistas
 */
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    
    // Añade información de seguridad a los encabezados HTTP
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('X-Frame-Options', 'DENY');
    res.header('X-Content-Type-Options', 'nosniff');
    
    next();
});

/**
 * Configuración de rutas de la aplicación
 * Separa las rutas en módulos por funcionalidad
 */
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));

/**
 * Manejo de rutas no encontradas (404)
 */
app.use((req, res) => {
    res.status(404).render('404', { 
        title: 'Página no encontrada',
        message: 'La página que buscas no existe' 
    });
});

module.exports = app;