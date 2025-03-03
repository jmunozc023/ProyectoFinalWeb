const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//Initializations
const app = express();
require('./db');
require('./config/passport');


//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: {
        formatDate: function (date) {
            return new Date(date).toLocaleDateString();
        },
        ifChecked: function (destinoId, destinos) {
            return destinos.some(destino => destino.destino.toString() === destinoId.toString()) ? 'checked' : '';
        },
        getVisitDate: function (destinoId, destinos) {
            const destino = destinos.find(destino => destino.destino.toString() === destinoId.toString());
            return destino ? new Date(destino.visitDate).toISOString().split('T')[0] : '';
        }
    }
}));
app.set('view engine', '.hbs');
//Middlewares
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(session({
    secret:'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/interactions'));
app.use(require('./routes/destinos'));
app.use(require('./routes/itinerarios'));
app.use(require('./routes/resenas'));


//Static Files
app.use(express.static(path.join(__dirname, 'public')));



//Server is listening

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});