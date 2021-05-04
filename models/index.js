
/* Models needed : 
User

Character:
    {
        id
        name
        class
        stamina
        strength
        power
        speed
        is_npc
        user_id
    }
    getName() -- Return name
    getStats() -- return stamina, strength, power, speed
    attack(target, value) -- Assign the new health to the target
    changeStat(stamina, strength, power, speed) -- Add the updated values to the object
    addIventory(id) -- Add an item to the inventory
    removeInventory(id) -- Remove an item from the inventory

Item


Intentory


Class


*/
=======
const User = require('./User');
const Character = require('./Character');



module.exports = { User, Character };

