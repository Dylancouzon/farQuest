var deathTimer;
var timeLeft = 20;
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
generateChar = async (char_id, npc) => {
    const response = await fetch('/api/char/generate', {
        method: 'POST',
        body: JSON.stringify({ char_id, npc }),
        headers: { 'Content-Type': 'application/json' },
    });
    const res = await response.json();
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
     chest = await openChest();
    chest will return the chest response, the effects are applied automatically.
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
            if (character.attack_1 != "Master cut") {
                character.strength = parseInt(character.strength) * 1.5;
                character.attack_1 = "Master cut";
                character.attack_2 = "Final blow";
                return "You found the MasterSword ! Your attacks are now Legendary !";
            } else {
                return "You found another Master Sword. <br><br> Not very usefull but go buy a lottery ticket buddy !"
            }

        default:
            return gameOver("A Ghoul came out of the chest and ate you alive, You died !");
    }
}

/*
Jinn
How to use :
Make the path jinn !
let jinn = await getJinn();
jin will return the response, the effects will take place starting from next path.
*/
let jinnFirst = 0;
getJinn = () => {
    jinnFirst = 1;
    switch (parseInt(character.class_id)) {
        case 1:
            character.jinn = 1;
            return "<p>Jinn: You, knight, wished to have super strength and your wish has been granted.<br>You are now so strong that your attacks will cause you to hurt yourself.<br><br> The Jinn dissapears laughing maniacally.<br></p>";
        case 2:
            //Give  to the wizard.
            character.jinn = 2;
            setTimeout(() => {
                setInterval(function () {
                    let parkinson = 1;
                    $("#main-box").effect("shake", { times: 8, distance: parkinson });
                    parkinson++;
                }, 1600)
            }, 5000);
            return "<p> Jinn: You, wizard, wished for immortality and your wish has been granted.<br> You will have to endure the effects of aging for all the eternity!<br><br> The Jinn dissapears laughing maniacally.<br></p>";
        case 3:
            character.jinn = 3;
            return "<p>Jinn: You, Huntress, wished for perfect aim.<br> You will never miss your target ever again but you will see no more.<br><br> The Jinn dissapears laughing maniacally.<br></p>";
        case 4:
            character.jinn = 4;
            character.strength = character.strength * 1.2;
            return "<p>Jinn: You, Assassin, wished for super speed and your wish has been Granted.<br> However, do never slow down or you will die!<br><br> The Jinn dissapears laughing maniacally.<br></p>";

    }
}

//Initiate the fighting variables and Generate the ennemy.
//Afterfight need to reset those values + show button3
// generateFight(10, "Bla bla bla wants to fight you", winning path)
let turn = 1;
var ennemy;
var afterFight;
generateFight = async (ennemy_id, message, afterPath) => {
    $("#enemy-char-box").show();
    //Where to go once the fight is done
    afterFight = afterPath;
    // Generate the ennemy character
    getEnnemyStats = await generateChar(ennemy_id, 1);
    ennemy = new CharacterObj(getEnnemyStats);
    $("#enemy-sprite").attr("src", "/sprites/" + ennemy.class_id + ".gif");
    $("#enemy-char-name").html(ennemy.name);
    updateHealthEnnemy();
    console.log(ennemy);
    // The user starts first unless the ennemy speed is greater.
    // if (character.speed >= ennemy.speed) {
    //     turn = 1;

    // }
    //Start the fight
    fight(1, message);
}
var missArr1 = [25, 22.5, 20, 17.5, 15, 12.5, 10, 7.5, 5, 2.5, 10, 12.5];
var missArr2 = [50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0, 0];
var dodgeArr1 = [0, 2.25, 5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25, 27.5]
var dodgeArr2 = [0, 1.25, 2.5, 3.75, 5, 6.25, 7.50, 8.75, 9, 10.25, 11.50, 12.75];
var criticallArr = [5, 10, 15, 20, 25, 30, 35];
// Fighting function
//Function will return true if the user won, false if they did not.
fight = async (attack, message) => {
    $("#game_button3").hide();
    if (message) {
        $("#game_message").append(message + "<br>");
    } else {
        $("#game_message").html("");
    }


    if (turn === 0) {
        if (character.stamina > 0 && ennemy.stamina > 0) {
            let charPower = (character.power / 40) + 1;
            let charDmg = character.strength * charPower
            if (attack === 1) {
                charMiss = () => { return (Math.random() * 100 < missArr1[character.speed]); }
                ennemyDodge = () => { return (Math.random() * 100 < dodgeArr1[ennemy.speed]); }
                charCritical = () => { return (Math.random() * 100 < criticallArr[character.luck]); }
                console.log(`charMiss: ${charMiss()}\n `);
                console.log(`ennemyDodge: ${ennemyDodge()}\n`);
                console.log(`charCritical: ${charCritical()}\n`);
                $("#game_message").append(`You used ${character.attack_1} on ${ennemy.name}.`);
                $("#char-sprite").attr("src", "/sprites/" + character.class_id + "-attack-light.gif");
                setTimeout(()=>{$("#char-sprite").attr("src", "/sprites/" + character.class_id + ".gif");},1500)



            } else if (attack === 2) {
                charDmg = charDmg * 1.2
                charMiss = () => { return (Math.random() * 100 < missArr2[character.speed]); }
                ennemyDodge = () => { return (Math.random() * 100 < dodgeArr2[ennemy.speed]); }
                charCritical = () => { return (Math.random() * 100 < criticallArr[character.luck]); }
                console.log(`charMiss: ${charMiss()}\n `);
                console.log(`ennemyDodge: ${ennemyDodge()}\n`);
                console.log(`charCritical: ${charCritical()}\n`);
                $("#game_message").append(`You used ${character.attack_2} on ${ennemy.name}.`);
                $("#char-sprite").attr("src", "/sprites/" + character.class_id + "-attack-heavy.gif");
                setTimeout(()=>{$("#char-sprite").attr("src", "/sprites/" + character.class_id + ".gif");},1500)

            }
            if (charMiss()) {
                $("#game_message").append(`You missed your shot!<br><br>`);
            } else {
                if (ennemyDodge()) {
                    $("#game_message").append(`The ennemy Dodged your attack!<br><br>`);
                }
                if (charCritical()) {
                    charDmg = charDmg * 1.5
                    $("#game_message").append(`Critical Shot!<br><br>`);
                }
                console.log(`charDmg: ${charDmg}\n`);
                ennemy.stamina -= charDmg;
                $("#game_message").append(`${ennemy.name} takes ${charDmg} damage<br><br>`);
                updateHealthEnnemy();


                // Jinn malediction for Knight
                if (attack && character.jinn == 1) {
                    character.stamina -= 10;
                    updateHealth();
                    $("#game_message").append("You hurt yourself in the process !<br>");
                }
                turn = 1;

            }
            $("#game_button1").html("Ennemy's turn");
            $("#game_button2").hide();
            $("#game_button3").hide();
            $("#path_id").val("fight");
            turn = 1;
        } else if (character.stamina <= 0) {
            //Losing path
            gameOver(`You have been killed by ${ennemy.name}.`)
        } else if (ennemy.stamina <= 0) {
            //Winning path
            $("#enemy-sprite-box").hide();
            game(afterFight);
        }


    } else {
        $("#game_message").append("Ennemy's turn<br><br>");
        if (ennemy.stamina > 0 && ennemy.stamina > 0) {
            let ennemyPower = (ennemy.power / 40) + 1;
            let ennemyDmg = ennemy.strength * ennemyPower
            var ennemyAttack = Math.random();
            if (ennemyAttack < 0.5) {

                ennemyMiss = () => { return (Math.random() * 100 < missArr1[ennemy.speed]); }
                charDodge = () => { return (Math.random() * 100 < dodgeArr1[character.speed]); }
                ennemyCritical = () => { return (Math.random() * 100 < criticallArr[ennemy.luck]); }
                console.log(`ennemyMiss: ${ennemyMiss()}\n `);
                console.log(`charDodge: ${charDodge()}\n`);
                console.log(`ennemyCritical: ${ennemyCritical()}\n`);
                $("#game_message").append(`${ennemy.name} used ${ennemy.attack_1}.`);

            } else {
                ennemyDmg = ennemyDmg * 1.2
                ennemyMiss = () => { return (Math.random() * 100 < missArr2[ennemy.speed]); }
                charDodge = () => { return (Math.random() * 100 < dodgeArr2[character.speed]); }
                ennemyCritical = () => { return (Math.random() * 100 < criticallArr[ennemy.luck]); }
                console.log(`ennemyMiss: ${ennemyMiss()}\n `);
                console.log(`charDodge: ${charDodge()}\n`);
                console.log(`ennemyCritical: ${ennemyCritical()}\n`);
                $("#game_message").append(`${ennemy.name} used ${ennemy.attack_2}.`);

            }
            if (ennemyMiss()) {
                $("#game_message").append(`They missed!<br><br>`);
            } else {
                if (charDodge()) {
                    $("#game_message").append(`You dodged the attack!<br><br>`);
                }
                if (ennemyCritical()) {
                    ennemyDmg = ennemyDmg * 1.5
                    $("#game_message").append(`Critical Shot!<br><br>`);
                }
                console.log(`ennemyDmg: ${ennemyDmg}\n`);
                character.stamina -= ennemyDmg;
                $("#game_message").append(`You take ${ennemyDmg} dmg.<br>`);
                updateHealth();

            }
            $("#game_message").append(`Your turn<br><br>`);
            $("#game_button1").html(character.attack_1);
            $("#game_button2").html(character.attack_2).show();
            $("#game_button3").hide();
            $("#path_id").val("fight");
            turn = 0;
        } else if (character.stamina <= 0) {
            //Losing path
            gameOver(`You have been killed by ${ennemy.name}.`)
        } else if (ennemy.stamina <= 0) {
            //Winning path
            $("#enemy-sprite-box").hide();
            game(afterFight);
        }
        turn = 0;
    }
}
//Chances to get the MasterSword in the kings Quarters
getMaster = () => {
    let luck = (parseInt(character.luck) / 10) + 1;
    let roll = Math.round(Math.floor(Math.random() * 10) * luck);
    if (roll >= 10) {
        character.strength = parseInt(character.strength) * 1.2;
        character.attack_1 = "Master cut";
        character.attack_2 = "Final blow";
        return true;
    }
}
//Health bar
updateHealth = () => {
    let health = Math.round(character.stamina / character.maxHealth);
    if (health < 0) {
        health = 0;
    }
    var hp = document.getElementById("health-bar");
    $("#char-health").html(`Health: ${Math.round(character.stamina)}/${character.maxHealth}`);
    RPGUI.set_value(hp, health);
}

updateHealthEnnemy = () => {
    let health = Math.round(ennemy.stamina / ennemy.maxHealth);
    if (health < 0) {
    }
    var hp = document.getElementById("enemy-char-health");
    $("#enemy-char-health").html(`Health: ${Math.round(ennemy.stamina)}/${ennemy.maxHealth}`);
    RPGUI.set_value(hp, health);
}


// Actions to be executed each time a path is generated.
// Actions is supposed to be async but we still need the Timeout for some reason
actions = async () => {
    console.log(character.stamina);
    setTimeout(() => {

        //Check if the character is still alive
        if (character.stamina < 1) {
            gameOver("You died!");
        }

        //If the jinn just casted his spell. Give the user 5sec to read the message
        if (jinnFirst == 1) {
            setTimeout(() => {
                executeJinn();
            }, 5000)
        } else {
            executeJinn();
        }

        updateHealth();

    }, 100)
    console.log(character);
}

// Jinn spells.
// The wizard gets progressively more blind.
//The hunter becomes blind.
// The Assasin dies if he spend more than 20sec without doing anything
let gettingOlder = 1;
let gettingBlind = 0.1;
executeJinn = async () => {

    if (character.jinn == 2) {
        $('body').animate({ opacity: gettingOlder });
        gettingOlder -= 0.08;

    }

    if (character.jinn == 3) {

        $('body').animate({ opacity: .1 });
        gettingBlind -= 0.01;
    }

    if (character.jinn == 4) {
        $('#death-timer').show();
        timeLeft = 20;
        deathTimer = setInterval(() => {
            if (timeLeft == 0) {
                $('#death-timer').hide();
                return gameOver("You slowed down !");
            }
            $('#death-timer').html(`${timeLeft}s before death.`);
            timeLeft--

        }, 1000)
    }
}