const router = require('express').Router();

const Resena = require('../models/Resena');
const Destino = require('../models/Destino');
const User = require('../models/User');

const{isAuthenticated} = require('../helpers/auth');

router.get('/resenas/add', isAuthenticated, async (req, res) => {
    try {
        const destinos = await Destino.find().lean();
        const usuarios = await User.find().lean();
        res.render('resenas/new-resena', { destinos, usuarios });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/resenas/new-resena', isAuthenticated, async (req, res) => {
    const {review, rating, destinos, usuarios} = req.body;
    const errors = [];
    if (!review || review.length <= 0) {
        errors.push({text: 'Por favor inserte un comentario.'});
    }
    if (!rating || rating.length <= 0) {
        errors.push({text: 'Por favor inserte un rating.'});
    }
    if (errors.length > 0) {
        const aDestinos = await Destino.find().lean();
        const aUsuarios = await User.find().lean();
        res.render('resenas/new-resena', {errors, review, rating, destinos: aDestinos, usuarios: aUsuarios});
    } else {
        const newReview = new Resena({review, rating, destinos, usuarios});
        await newReview.save();
        req.flash('success_msg', 'Itinerario agregado correctamente.');
        res.redirect('/resenas');
    }
});
router.get('/resenas', isAuthenticated, async (req, res) => {
    try{
        const resenas = await Resena.find().populate('destinos.destino').lean().sort({date: 'desc'});
        res.render('resenas/all-resenas', {resenas});
    }catch (err){
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/resenas/edit/:id', isAuthenticated, async (req, res) => {
    try{
        const resena = await Resena.findById(req.params.id).lean();
        const destinos = await Destino.find().lean();
        res.render('resenas/edit-resenas', {resena, destinos});
    }catch (err){
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.put('/resenas/edit-resenas/:id', isAuthenticated, async (req, res) => {
    const {review, rating, destinos, usuarios} = req.body;
    const errors = [];
    if (!review || review.length <= 0) {
        errors.push({text: 'Por favor inserte un comentario.'});
    }
    if (!rating || rating.length <= 0) {
        errors.push({text: 'Por favor inserte un rating.'});
    }
    if (errors.length > 0) {
        const destino = await Destino.findById(req.params.id).lean();
        res.render('resenas/edit-resenas', {errors, review, rating, destinos: destino, usuarios: usuario});
    } else {
        await Resena.findByIdAndUpdate(req.params.id, {review, rating, destinos, usuarios});
        req.flash('success_msg', 'Itinerario actualizado correctamente.');
        res.redirect('/resenas');
    }
});


router.delete('/resenas/delete/:id', isAuthenticated, async (req, res) => {
    await Resena.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Itinerario eliminado correctamente.');
    res.redirect('/resenas');
});

module.exports = router;
