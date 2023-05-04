const express = require('express');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//frontend routing
const homeRoute = require('./routing/home');
const loginRoute = require('./routing/login');
const checkoutFormRoute = require('./routing/checkoutForm');
const paymentRoute = require('./routing/payment');
const registrationRoute = require('./routing/registration');
//

const checkUsernameRoute = require('./routing/checkUsername');

// Import sequelize and User from models.js
const { sequelize, User } = require('./routing/models');

const sessionStore = new SequelizeStore({
    db: sequelize,
});

sequelize.sync();

const app = express();

//Allows API to accept requests from different origins (domains) our backend is hosted on different ports
app.use(cors());
//Parses JSON data
app.use(express.json());
//parcing URL (through forms)
app.use(express.urlencoded({ extended: true }));

// Initialize session middleware
app.use(session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
}));

// Initialize the authencation library
app.use(passport.initialize());
app.use(passport.session());

app.use('/', homeRoute);
app.use('/login', loginRoute);
app.use('/checkoutform', checkoutFormRoute);
app.use('/payment', paymentRoute);
app.use('/registration', registrationRoute);
app.use('/checkUsername', checkUsernameRoute);

// Registration route
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });

        req.login(newUser, err => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error during login after registration');
            }
            return res.status(201).send('User registered and logged in');
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error during registration');
    }
});

// Example of a protected route
app.get('/protected', passport.authenticate('local'), (req, res) => {
    res.send('This is a protected route');
});

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
