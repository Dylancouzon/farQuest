character_create = async (character_class) => {

    const character_name = $("#character_name").val();

    if (character_name && character_class) {
        const response = await fetch('/api/char/create', {
            method: 'POST',
            body: JSON.stringify({ character_name, character_class }),
            headers: { 'Content-Type': 'application/json' },
        });
        let res = await response.json();
        if (response.ok) {
            //Need to figure out howt to fetch the character id 
            console.log(res);
            document.location.replace('/play/' + res.id);

        }
    } else {
        $("#character_error").html("Please enter a name.");
    }

}

generateChar = async (char_id) => {
    const response = await fetch('/api/char/generate', {
        method: 'POST',
        body: JSON.stringify({ char_id }),
        headers: { 'Content-Type': 'application/json' },
    });
    const res = await response.json();
    console.log(res);
    if (response.ok) {
        console.log(response);
        return res;
    } else {
        // alert('test');
        $("#creation-error").html(res.message);

    }
}

openChest = () => {
    let luck = (parseInt(character.luck) / 10) + 1;
    let roll = Math.round(Math.floor(Math.random() * 10) * luck);
    if (roll > 10) {
        roll = 10;
    }
    console.log(roll);
    switch (roll) {
        case 1:
            let staminaCase1 = Math.round(parseInt(character.stamina) / 2);
            character.changeStat(staminaCase1 - 20);
            return "The chest was trapped and exploded ! You lost half your health points !";
        case 2:
            let staminaCase2 = parseInt(character.stamina);
            character.changeStat(staminaCase2 - 20);
            return "You ate some old cheese, you have lost 20hp";
        case 3:
            return "You found an old carrot cake recipe. Looks delicious";
        case 4:
            return "No luck ! The chest was empty!";
        case 5:
            let addItemCase5 = character.addInventory(1);
            if (addItemCase5) {
                return "You found an Health potion ! It has been added to your inventory !";
            } else {
                return "You found an Health potion ! Unfortunately, your inventory is full !";
            }
        case 6:
            return "Not coded yet !";
        case 7:
            return "Not coded yet !";
        case 8:
            return "Not coded yet !";
        case 9:
            return "Not coded yet !";
        case 10:
            character.strength = parseInt(character.stamina) * 2;
            character.attack_1 = "Master cut";
            character.attack_1 = "Final blow";
            return "You found the MasterSword ! Your attacks are now Legendary !";
        default:
            return gameover();
    }
}

genJinn = () => {

    switch (parseInt(character.class_id)) {
        case 1:
            character.jinn = 1;
            return "You Are a Class 1 The Jinn did ...";
        case 2:
            character.jinn = 2;
            return "You Are a Class 2 The Jinn did ...";
        case 3:
            character.jinn = 3;
            return "You Are a Class 3 The Jinn did ...";
        case 4:
            character.jinn = 4;
            return "You Are a Class 4 The Jinn did ...";

    }
}

actions = async () => {
    if (character.jinn == 1) {
        console.log("The Jinn has casted his spell");
    }

}