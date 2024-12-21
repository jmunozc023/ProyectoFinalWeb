const router = require('express').Router();

const Destino = require('../models/Destino');

const{isAuthenticated} = require('../helpers/auth');

router.get('/destinos/add', isAuthenticated, async (req, res) => {
    res.render('destinos/new-destino');
});

router.post('/destinos/new-destino', isAuthenticated, async (req, res) => {
    const {title, description, price, location} = req.body;
    const errors = [];
    if (!title || title.length <= 0) {
        errors.push({text: 'Por favor inserte un nombre.'});
    }
    if (!description || description.length <= 0) {
        errors.push({text: 'Por favor inserte una descripción.'});
    }
    if (!price || price.length <= 0) {
        errors.push({text: 'Por favor inserte un precio.'});
    }
    if (!location || location.length <= 0) {
        errors.push({text: 'Por favor inserte una ubicación.'});
    }
    if (errors.length > 0) {
        res.render('destinos/new-destino', {errors, title, description, price, location});
    } else {
        const newDestino = new Destino({title, description, price, location});
        await newDestino.save();
        req.flash('success_msg', 'Destino agregado correctamente.');
        res.redirect('/destinos');
    }
});
router.get('/destinos', async (req, res) => {
    try{
        const destinos = await Destino.find().lean().sort({date: 'desc'});
        res.render('destinos/all-destino', {destinos});
    }catch (err){
        console.error(err);
        res.status(500).send('Server Error');
    }
});
router.get('/destinos/edit/:id', isAuthenticated, async (req, res) => {
    try{
        const destino = await Destino.findById(req.params.id).lean();
        res.render('destinos/edit-destino', {destino});
    }catch (err){ 
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.put('/destinos/edit-destino/:id', isAuthenticated, async (req, res) => {
    const {title, description, price, location} = req.body;
    await Destino.findByIdAndUpdate(req.params.id, {title, description, price, location});
    req.flash('success_msg', 'Destino actualizado correctamente.');
    res.redirect('/destinos');
});
router.delete('/destinos/delete-destino/:id', isAuthenticated, async (req, res) => {
    await Destino.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Destino eliminado correctamente.');
    res.redirect('/destinos');
});

module.exports = router;

