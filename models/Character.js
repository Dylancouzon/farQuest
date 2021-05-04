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
        class: {
            type: DataTypes.STRING,
            allowNull: false,
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
        is_NPC: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            //reference in index.js
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'Character',
    }
);

module.exports = Character;