class CharacterObj {
    constructor(classD) {
        this.name = classD.name;
        this.class_id = classD.class_id;
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
        this.inventory = { a: 0, b: 0, c: 0 };
    };

    getName = () => {
        return this.name;
    };

    getStats = () => {
        var charStats = [this.stamina, this.strength, this.power, this.speed]
        return charStats;
    };

    attack = (target, value) => {
        target.stamina -= value;
    };

    changeStat = (stamina, strength, power, speed, luck, attack_1, attack_2, jinn) => {
        if (stamina) this.stamina = stamina;
        if (strength) this.strength = strength;
        if (power) this.power = power;
        if (speed) this.speed = speed;
        if (luck) this.luck = luck;
        if (attack_1) this.attack_1 = attack_1;
        if (attack_2) this.attack_2 = attack_2;
        if (jinn) this.jinn = jinn;
    };

    addInventory = (item) => {
        return !this.inventory.a ? this.inventory.a = item
            : !this.inventory.b ? this.inventory.b = item
                : !this.inventory.c ? this.inventory.c = item
                    : false;
    };

    removeInventory = (item) => {
        return this.inventory.a === item ? this.inventory.a = 0
            : this.inventory.b === item ? this.inventory.b = 0
                : this.inventory.c === item ? this.inventory.c = 0
                    : false;
    };
};
