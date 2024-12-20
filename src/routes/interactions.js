const router = require('express').Router();

router.get('/destinos', (req, res) => {
    res.render('destinos');
});

router.get('/gestion-itinerario', (req, res) => {
    res.render('gestion-itinerario');
});

router.get('/mapa-interactivo', (req, res) => {
    res.render('mapa-interactivo');
});
router.get('/pagos', (req, res) => {
    res.render('pagos');
});

module.exports = router;