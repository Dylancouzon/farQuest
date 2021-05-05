const User = require('./User');
const Character = require('./Character');
const Item = require('./Item');
const Class = require('./Class');

//  I commented this out because:
//Needs to have a belongsTo otherwise User.create won't work
// User.hasMany(Character, {
//     foreignKey: 'id'
// });

module.exports = { User, Character, Item, Class };