// Node modules
const router = require('express').Router();
const path = require('path');

//Defines the root directory
var appDir = path.dirname(require.main.filename);

// Import the models & auth function using path
const { User, Character } = require(path.join(appDir, 'models'));
const auth = require(path.join(appDir, 'public', 'js', 'auth')).authTest;

//Profile route
router.get('/profile', auth, async (req, res) => {
    try {
        const charactersData = await Character.findByPk(req.session.user_id);
        if (charactersData) {
            res.sendFile(path.join(appDir, 'public', 'profile.html'));
        } else {
            res.sendFile(path.join(appDir, 'public', 'creation.html'));
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.sendFile(path.join(appDir, 'public', 'profile.html'));
        } else {
            res.sendFile(path.join(appDir, 'public', 'login.html'));
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/play', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.sendFile(path.join(appDir, 'public', 'profile.html'));
        } else {
            res.sendFile(path.join(appDir, 'public', 'login.html'));
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
