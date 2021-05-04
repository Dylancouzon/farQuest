// Require Modules
const path = require('path');

// Initialize Express
const express = require('express');
const session = require('express-session');
const app = express();

// Initialize Sequelize
const sequelize = require('./config/connection');
const PORT = process.env.PORT || 3001;

// Initialize Routes
const routes = require('./controllers');
app.use(routes);

// Initialize Sessions
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'IdontevenknowwhatIdontknow',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};


// Express instructions
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
