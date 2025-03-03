const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        // Match Email's User
        const user = await User.findOne({ email: email }).exec();
        if (!user) {
            return done(null, false, { message: 'No User found.' });
        } else {
            // Match Password's User
            const match = await user.matchPassword(password);
            if (match) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect Password.' });
            }
        }
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id).exec();
        done(null, user);
    } catch (err) {
        done(err);
    }
});
