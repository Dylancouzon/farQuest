const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Inventory extends Model {

};

Inventory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        character_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        item_1: {
            type: DataTypes.INTEGER,
            // reference in index.js (one:many | Inventory => Item)
        },
        item_2: {
            type: DataTypes.INTEGER,
        },
        item_3: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'Inventory',
    },
);


module.exports = Inventory;