const router = require('express').Router();

router.get('/destinos', (req, res) => {
    res.render('destinos');
});

router.get('/gestion-itinerario', (req, res) => {
    res.render('gestion-itinerario');
});


module.exports = router;