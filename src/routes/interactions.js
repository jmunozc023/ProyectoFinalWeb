const router = require('express').Router();

const{isAuthenticated} = require('../helpers/auth');

/*router.get('/destinos', (req, res) => {
    res.render('destinos');
});*/

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

module.exports = router;