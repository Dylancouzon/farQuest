const User = require('./User');
const Character = require('./Character');
const Item = require('./Item');
// const Inventory = require('./Inventory');
const Class = require('./Class');

// Who belongs to who???
User.hasMany(Character, {
    foreignKey: 'user_id'
});

Character.belongsTo(User, {
    foreignKey: 'id'
});

// Inventory is no longer needed
// Class has no relationship and will only be called upon to gather default stats when creating a Character
// Item has no relationship and will only be called upon to render an object

module.exports = { User, Character, Item, Class };