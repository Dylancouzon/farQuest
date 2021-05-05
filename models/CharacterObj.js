const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Character = require('./Character');

class CharacterObj {
    constructor(name, class_id) {
        const classData = await Character.findByPk(class_id);
        const classD = postData.get({ plain: true });

        this.name = name;
        this.class_id = class_id;
        this.stamina = classD.stamina;
        this.strength = classD.strength;
        this.power = classD.power;
        this.speed = classD.speed;
        this.luck = classD.luck;
        this.attack_1 = classD.attack_1;
        this.attack_2 = classD.attack_2;
        this.is_NPC = classD.is_NPC;
        this.user_id = classD.user_id;
        this.jinn = 0;
    }

    getName = () => {
        return this.name;
    };

    getStats = () => {
        return this.stamina, this.strength, this, 
    };

    attack = (target, value) {

    };

    changeStat = (stamina, strength, power, speed) {

    };

};
// getName() -- Return name
// getStats() -- return stamina, strength, power, speed
// attack(target, value) -- Assign the new health to the target
// changeStat(stamina, strength, power, speed) -- Add the updated values to the object
// addIventory(id) -- Add an item to the inventory
// removeInventory(id) -- Remove an item from the inventory

module.exports = CharacterObj;