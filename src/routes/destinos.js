const router = require('express').Router();

const Destino = require('../models/Destino');
const Review = require('../models/Resena');

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
router.delete('/destinos/delete/:id', isAuthenticated, async (req, res) => {
    await Destino.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Destino eliminado correctamente.');
    res.redirect('/destinos');
});
router.post('/destinos/:id/resena', isAuthenticated, async (req, res) => {
    const { rating, comment } = req.body;
    const errors = [];
    if (!rating || rating <= 0) {
        errors.push({ text: 'Por favor inserte una calificación.' });
    }
    if (!comment || comment.length <= 0) {
        errors.push({ text: 'Por favor inserte un comentario.' });
    }
    if (errors.length > 0) {
        const destino = await Destino.findById(req.params.id).lean();
        res.render('destinos/edit-destino', { errors, destino });
    } else {
        const newReview = new Review({ destino: req.params.id, rating, comment, user: req.user.id });
        await newReview.save();
        req.flash('success_msg', 'Reseña agregada correctamente.');
        res.redirect(`/destinos/${req.params.id}`);
    }
});

router.get('/destinos/:id/resena', async (req, res) => {
    try {
        const reviews = await Review.find({ destino: req.params.id }).lean().sort({ date: 'desc' });
        res.render('destinos/resena', { reviews });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

