const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Class extends Model {

};

Class.init(
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
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        attack_2: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'Class',
    },
);


module.exports = Class;