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
        if (!findClass) {
            res.status(400).json({ message: 'Class not found !' });
            return;
        }
        const classData = findClass.get({ plain: true });
        console.log(req.session.user_id);
        const characterData = await Character.create({
            name: req.body.character_name || 0,
            class_id: req.body.character_class|| 0,
            stamina: classData.stamina|| 0,
            strength: classData.strength|| 0,
            power: classData.power|| 0,
            speed: classData.speed|| 0,
            luck: classData.luck|| 0,
            attack_1: classData.attack_1|| 0,
            attack_2: classData.attack_2|| 0,
            user_id: req.session.user_id,
        });
        console.log(characterData);
        res.status(200).json(characterData);

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/generate', async (req, res) => {
    try {
        const characterData = await Character.findByPk(req.body.char_id);
        const character = characterData.get({ plain: true });
        res.status(200).json(character);
        //Can't get the .then to work.
        // .then(characterData => {
        //      console.log(characterData);
        //      res.status(200).json(characterData);
        //  })
        //  .catch(err => { console.log("\n\nHELLO\n"+err) });

        //Works to return this as an object, but not as a constructor ??
        // Need clarification Im confused

        // Here characterData is an instance in the console log but not in the json object
        // If I remove the await, it returns undefined ??
        // setTimeout( async()=>{

        //     console.log(`\n\nHELLO\n ${await characterData.getStats()}\n`);
        //     res.status(200).json(characterData);
        // },300);

    } catch (err) {
        res.status(400).json(err);
    }
});
module.exports = router;