const express = require('express');
const cors = require('cors');
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

const sessionStore = new SequelizeStore({
    db: sequelize,
});

const User = sequelize.define('User', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
});

sequelize.sync();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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



app.use(session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('local'));

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

module.exports = {
    passport: passport,
    User: User,
};

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
