// Require Modules
const path = require('path');

// Initialize Express
const app = express();
const express = require('express');
const session = require('express-session');

// Initialize Sequelize
const sequelize = require('./config/connection');
const PORT = process.env.PORT || 3001;

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

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
