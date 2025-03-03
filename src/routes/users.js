const express = require('express');
const router = require('express').Router();

const User = require('../models/User');
const passport = require('passport');

router.get('/login' , (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/register' , (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const {name, email, password, birthday} = req.body;
    const errors = [];
    if (name.length <= 0) {
        errors.push({text: 'Por favor inserte su nombre.'});
    }
    if (!email || email.length <= 0) {
        errors.push({text: 'Por favor inserte su correo.'});
    }
    if (password.length <= 0) {
        errors.push({text: 'Por favor inserte su contraseña.'});
    }
    if (birthday.length <= 0) {
        errors.push({text: 'Por favor inserte su fecha de nacimiento.'});
    }
    if (errors.length > 0) {
        res.render('register', {errors, name, email, password, birthday});
    } else {
        const emailUser = await User.findOne({email: email});
        if (emailUser) {
            req.flash('error_msg', 'The Email is already in use.');
            res.redirect('/register');
        }
        const newUser = new User({name, email, password, birthday});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You are registered.');
        res.redirect('/login');
    }
});

router.get('/forgotpswd' , (req, res) => {
    res.render('forgotpswd');
});

router.post('/forgotpswd', async (req, res) => {
    const { email } = req.body;
    const errors = [];
    if (email.length <= 0) {
        errors.push({ text: 'Por favor inserte su correo.' });
    }
    if (errors.length > 0) {
        res.render('forgotpswd', { errors, email });
    } else {
        const user = await User.findOne({ email: email });
        if (!user) {
            req.flash('error_msg', 'No existe una cuenta con ese correo.');
            res.redirect('/forgotpswd');
        } else {
            // Aquí puedes agregar la lógica para enviar el correo de recuperación de contraseña
            req.flash('success_msg', 'Se ha enviado un correo para restablecer su contraseña.');
            res.redirect('/login');
        }
    }
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            {return next(err);}
        }
        res.redirect('/');
    });
});

module.exports = router;