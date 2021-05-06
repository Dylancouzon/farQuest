// Node modules
const router = require('express').Router();
const path = require('path');

//Defines the root directory
var appDir = path.dirname(require.main.filename);

// Import the models & auth function using path
const { User, Character } = require(path.join(appDir, 'models'));
const auth = require(path.join(appDir, 'public', 'js', 'auth')).authTest;

router.get('/', auth, async (req, res) => {
    try {
        if (req.session.logged_in) {
            const charactersData = await Character.findOne({ where: { user_id: req.session.user_id } });
            if (charactersData) {
                res.sendFile(path.join(appDir, 'public', 'profile.html'));
            } else {
                res.sendFile(path.join(appDir, 'public', 'create.html'));
            }
        } else {
            res.sendFile(path.join(appDir, 'public', 'login.html'));
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/create', auth, async (req, res) => {
    try {
        res.sendFile(path.join(appDir, 'public', 'create.html'));
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/play/:id', auth, async (req, res) => {
    try {
        res.sendFile(path.join(appDir, 'public', 'game.html'));
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
