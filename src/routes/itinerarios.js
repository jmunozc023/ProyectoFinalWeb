const router = require('express').Router();
const Itinerario = require('../models/Itinerario');
const Destino = require('../models/Destino');
const { isAuthenticated } = require('../helpers/auth');

// Ruta para mostrar el formulario de creación de itinerario
router.get('/itinerarios/add', isAuthenticated, async (req, res) => {
    try {
        const destinos = await Destino.find().lean();
        res.render('itinerarios/new-itinerario', { destinos });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Ruta para crear un nuevo itinerario
router.post('/itinerarios/new-itinerario', isAuthenticated, async (req, res) => {
    const { title, description, destinos } = req.body;
    const errors = [];
    if (!title || title.length <= 0) {
        errors.push({ text: 'Por favor inserte un nombre.' });
    }
    if (!description || description.length <= 0) {
        errors.push({ text: 'Por favor inserte una descripción.' });
    }
    if (errors.length > 0) {
        const allDestinos = await Destino.find().lean();
        res.render('itinerarios/new-itinerario', { errors, title, description, destinos: allDestinos });
    } else {
        // Filtrar destinos para incluir solo aquellos con una fecha de visita
        const filteredDestinos = destinos ? destinos.filter(d => d.visitDate) : [];
        const newItinerario = new Itinerario({ title, description, destinos: filteredDestinos });
        await newItinerario.save();
        req.flash('success_msg', 'Itinerario agregado correctamente.');
        res.redirect('/itinerarios');
    }
});

// Ruta para mostrar todos los itinerarios
router.get('/itinerarios', isAuthenticated, async (req, res) => {
    try {
        const itinerarios = await Itinerario.find().populate('destinos.destino').lean().sort({ date: 'desc' });
        res.render('itinerarios/all-itinerario', { itinerarios });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Ruta para mostrar el formulario de edición de itinerario
router.get('/itinerarios/edit/:id', isAuthenticated, async (req, res) => {
    try {
        const itinerario = await Itinerario.findById(req.params.id).lean();
        const destinos = await Destino.find().lean();
        res.render('itinerarios/edit-itinerario', { itinerario, destinos });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Ruta para actualizar un itinerario
router.put('/itinerarios/edit-itinerario/:id', isAuthenticated, async (req, res) => {
    const { title, description, destinos } = req.body;
    const errors = [];
    if (!title || title.length <= 0) {
        errors.push({ text: 'Por favor inserte un nombre.' });
    }
    if (!description || description.length <= 0) {
        errors.push({ text: 'Por favor inserte una descripción.' });
    }
    if (errors.length > 0) {
        const allDestinos = await Destino.find().lean();
        res.render('itinerarios/edit-itinerario', { errors, title, description, destinos: allDestinos });
    } else {
        // Filtrar destinos para incluir solo aquellos con una fecha de visita
        const filteredDestinos = destinos ? destinos.filter(d => d.visitDate) : [];
        await Itinerario.findByIdAndUpdate(req.params.id, { title, description, destinos: filteredDestinos });
        req.flash('success_msg', 'Itinerario actualizado correctamente.');
        res.redirect('/itinerarios');
    }
});

// Ruta para eliminar un itinerario
router.delete('/itinerarios/delete/:id', isAuthenticated, async (req, res) => {
    await Itinerario.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Itinerario eliminado correctamente.');
    res.redirect('/itinerarios');
});

module.exports = router;