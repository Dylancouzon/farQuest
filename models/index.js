const User = require('./User');
const Character = require('./Character');
const Item = require('./Item');
const Inventory = require('./Inventory');
const Class = require('./Class');

// Who belongs to who???
User.hasMany(Character, {
    foreignKey: 'user_id'
});

Class.belongsTo(Character, {
    foreignKey: 'class_id'
});

Inventory.belongsTo(Character, {
    foreignKey: 'character_id'
});

Inventory.belongsToMany(Item, {
    through: 'InventoryItem'
});

Item.belongsToMany(Inventory, {
    through: 'InventoryItem'
});

module.exports = { User, Character, Item, Inventory, Class };