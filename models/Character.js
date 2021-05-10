const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Character extends Model {
    
};

Character.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        class_id: {
            type: DataTypes.STRING,
            allowNull: false,
            // reference in index.js (one:one)
        },
        stamina: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        strength: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        power: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        speed: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        luck: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        attack_1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        attack_2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_NPC: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            //reference in index.js (many:one | Character => User)
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'Character',
    },
);

module.exports = Character;