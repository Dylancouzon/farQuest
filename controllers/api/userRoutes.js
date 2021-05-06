// Node modules
const router = require('express').Router();
const path = require('path');

//Defines the root directory
var appDir = path.dirname(require.main.filename);

// Import the models & auth function using path
const { User, Character } = require(path.join(appDir, 'models'));
const auth = require(path.join(appDir, 'public', 'js', 'auth')).authTest;


// Login Route
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
        if (!userData) {
            res.status(400).json({ message: 'Username not found!' });
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;

            res.status(200).json({ user: userData });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

//Sign Up route
router.post('/signup', async (req, res) => {
    try {
        const findUser = await User.findOne({ where: { username: req.body.username } });
        if (findUser) {
            //Tag id= login-error
            res.status(400).json({ message: 'Username already Existing' });
            return;
        }
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Logout Route
router.post('/logout', auth, (req, res) => {
    
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
        res.sendFile(path.join(appDir, 'public', 'login.html'));
    };
});

module.exports = router;