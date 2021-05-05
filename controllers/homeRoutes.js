const router = require('express').Router();

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

module.exports = router;
