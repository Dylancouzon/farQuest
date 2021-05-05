const router = require('express').Router();
const path = require('path');

//Defines the root directory
var appDir = path.dirname(require.main.filename);

// Import the models & auth function using path
const { User, Character, Class } = require(path.join(appDir, 'models'));
const auth = require(path.join(appDir, 'public', 'js', 'auth')).authTest;
const CharacterObj = require('../../models/CharacterObj');

// Create character Route
router.post('/create', async (req, res) => {
    try {
        const findClass = await Class.findByPk(req.body.character_class);
        if (!findClass) {
            res.status(400).json({ message: 'Class not found !' });
            return;
        }
        const classData = findClass.get({ plain: true });
        const characterData = await Character.create({
            name: req.body.character_name,
            class_id: req.body.character_class,
            strength: classData.strength,
            stamina: classData.stamina,
            power: classData.stamina,
            speed: classData.speed,
            luck: classData.luck,
            attack_1: classData.attack_1,
            attack_2: classData.attack_2,
            user_id: req.session.user_id,
        });
        res.status(200).json(characterData);

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/generate', async (req, res) => {
    try {
        //Can't get the .then to work. The timeout will do for now.
        const characterData = new CharacterObj(req.body.char_id);


        // .then(characterData => {
        //      console.log(characterData);
        //      res.status(200).json(characterData);
        //  })
        //  .catch(err => { console.log("\n\nHELLO\n"+err) });

        //Works to return this as an object, but not as a constructor ??
        // Need clarification Im confused
        setTimeout( ()=>{
            res.status(200).json(characterData);
        },300);

        // Here characterData.getStats() = Derired result
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