const User = require('./User');
const Character = require('./Character');
const Item = require('./Item');
const Class = require('./Class');

User.hasMany(Character, {
    foreignKey: 'id'
});

module.exports = { User, Character, Item, Class };