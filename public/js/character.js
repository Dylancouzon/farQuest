//Character creation function API call
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
            document.location.replace('/play/' + res.id);

        } $("#character_error").html("Please try again.");
    } else {
        $("#character_error").html("Please enter a name.");
    }

}

// Pulling the Character Data from the DB then creating the character
generateChar = async (char_id) => {
    const response = await fetch('/api/char/generate', {
        method: 'POST',
        body: JSON.stringify({ char_id }),
        headers: { 'Content-Type': 'application/json' },
    });
    const res = await response.json();
    console.log(res);
    if (response.ok) {
        return res;
    } else {
        $("#creation-error").html(res.message);

    }
}

// Random chest function.
openChest = () => {
    /*
    Generate a number between 0 and 10 then increase it depending on the luck Stat.
    If the number becomes bigger than 10, round it back down to 10.
    How to use :
    Make the path async !
    let chest(enteryourpathnumber) = await openChest();
    chestx will return the chest response, the effects are applied automatically.
    It is very important to make a unique variable id !
    */
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

/*
Jinn
How to use :
Make the path jinn !
let jinn = await getJinn();
jin will return the chest response, the effects will take place starting from next path.
*/
getJinn = () => {

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

// Path20 will be reserved for fights !
// Fighting function
//Function will return true if the user won, false if they did not.
fight = async (ennemy_id) => {
    $("#game_button3").hide();
    let turn = 0;
    // Generate the ennemy character
    const ennemy = await generateChar(ennemy_id);
    // The user starts first unless the ennemy speed is greater.
    if (ennemy.speed > character.speed) {
        turn = 1;
    }

    // Check if both characters are alive
    if (parseInt(character.stamina) > 0 && parseInt(ennemy.stamina) > 0) {
        if (turn === 0) {
            //Players turn
            $("#game_message").html(`${ennemy.name} wants to Fight you !`);
            $("#game_button1").html(character.attack_1);
            $("#game_button2").html(character.attack_1);
            turn = 1;
        } else {
            //ennemies turn

            turn = 0;
        }
    } else {
        $("#game_button3").show();
        return true;
    }

}

// Actions to be executed each time a path is generated.
// Timeout should not be necessary anymore because of the await in the call on game.js
actions = async () => {
    // setTimeout(() => {

    // Jinn actions for Class 1
    if (character.jinn == 1) {
        console.log("The Jinn has casted his spell");
    }

    //Check if the character is still alive
    if (character.stamina < 1) {
        gameOver();
    }

    // }, 300)

}