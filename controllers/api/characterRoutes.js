const router = require('express').Router();
const path = require('path');

//Defines the root directory
var appDir = path.dirname(require.main.filename);

// Import the models & auth function using path
const { User, Character, Class } = require(path.join(appDir, 'models'));
const auth = require(path.join(appDir, 'public', 'js', 'auth')).authTest;


// Create character Route
router.post('/create', async (req, res) => {
    try {
        const findClass = await Class.findByPk(req.body.character_class);
        if (findClass) {
            res.status(400).json({ message: 'Class not found !' });
            return;
        }
        const classData = findClass.get({ plain: true });

        const characterData = await Character.create({
            name: req.body.character_name,
            class_id: req.body.character_class,
            strength: classData.strength,
            health: classData.health,
            power: classData.stamina,
            speed: classData.speed,
            attack_1: classData.attack_1,
            attack_2: classData.attack_2,
        });

            res.status(200).json(characterData);

    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;