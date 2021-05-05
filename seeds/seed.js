const sequelize = require('../config/connection');
const { User, Character, Class, Item } = require('../models');

const seedUsers = require('./userData.json');
const seedCharacters = require('./characterData.json');
const seedClass = require('./classData.json');
const seedItem = require('./itemData.json');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    const users = await User.bulkCreate(seedUsers, {
        individualHooks: true,
        returning: true,
    });
    console.log('\n----- USERS SEEDED -----\n');

    const characters = await Character.bulkCreate(seedCharacters);
    console.log('\n----- CHARACTERS SEEDED -----\n');

    const classes = await Class.bulkCreate(seedClass);
    console.log('\n----- CLASSES SEEDED -----\n');

    const items = await Item.bulkCreate(seedItem);
    console.log('\n----- ITEMS SEEDED -----\n');

    process.exit(0);
};

seedAll();