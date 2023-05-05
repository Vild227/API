const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const session = require('express-session');
const Sequelize = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const config = {
    dialect: 'mysql',
    host: '130.225.170.71',
    username: 'root1',
    password: 'root1Root1&',
    database: 'WebPage',
    port: 3306,
};

const sequelize = new Sequelize(config);

// Create a session store using your Sequelize instance
const sessionStore = new SequelizeStore({
    db: sequelize,
});

// Define your User model
const User = sequelize.define('User', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
});

// Sync your models to the database
sequelize.sync();

// Initialize Express app
const app = express();

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
}));
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!await bcrypt.compare(password, user.password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Your routes and API endpoints go here
module.exports = {
    passport: passport,
    User: User,
};


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(` is this being used? Server listening on port ${port}`);
});
