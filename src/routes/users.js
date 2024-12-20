const router = require('express').Router();

router.get('/login' , (req, res) => {
    res.render('login');
});

router.get('/register' , (req, res) => {
    res.render('register');
});

router.get('/forgotpswd' , (req, res) => {
    res.render('forgotpswd');
});

module.exports = router;