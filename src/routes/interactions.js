const router = require('express').Router();

const{isAuthenticated} = require('../helpers/auth');


router.get('/destinos/add', (req, res) => {
    res.render('destinos/new-destino');
});

router.get('/gestion-itinerario', isAuthenticated, (req, res) => {
    res.render('gestion-itinerario');
});

router.get('/mapa-interactivo', (req, res) => {
    res.render('mapa-interactivo');
});
router.get('/pagos', isAuthenticated,(req, res) => {
    res.render('pagos');
});
router.get('/pagosDestinos', (req, res) => {
    res.render('pagosDestinos');
});
router.get('/pagosHoteles', (req, res) => {
    res.render('pagosHoteles');
});
router.get('/pagosVuelos', (req, res) => {
    res.render('pagosVuelos');
});
router.get('/reservaciones', (req, res) => {
    res.render('reservaciones');
});
router.get('/reservaDestinos', (req, res) => {
    res.render('reservaDestinos');
});
router.get('/reservahotel', (req, res) => {
    res.render('reservahotel');
});
router.get('/reservaVuelos', (req, res) => {
    res.render('reservaVuelos');
});


module.exports = router;