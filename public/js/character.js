var deathTimer;
var timeLeft = 20;
//Character creation function API call
character_create = async (character_class) => {

    const character_name = $("#character_name").val();
    //Farley Easter Egg :D.
    if (character_name == "Farley") {
        character_class = 10;
    }
    if (character_name && character_class) {
        const response = await fetch('/api/char/create', {
            method: 'POST',
            body: JSON.stringify({ character_name, character_class }),
            headers: { 'Content-Type': 'application/json' },
        });
        let res = await response.json();
        if (response.ok) {
            document.location.replace('/play/' + res.id);

        }
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
    */
    $("#enemy-sprite").attr("src", "/sprites/chest.gif");
    $("#enemy-sprite-box").show();
    let luck = (parseInt(character.luck) / 10) + 1;
    let roll = Math.round(Math.floor(Math.random() * 10) * luck);
    if (roll > 10) {
        roll = 10;
    }
    switch (roll) {
        case 1:
            character.stamina = Math.round(character.stamina / 2);
            return "<br><br>The chest was trapped and exploded ! You lost half your health points !";
        case 2:
            character.stamina -= 20;
            updateHealth();
            return "<br><br>You found some old cheese and ate it, you have lost 20hp, Why would you do that ?";
        case 3:
            return "<br><br>You found an old carrot cake recipe. Looks delicious.";
        case 4:
            return "<br><br>No luck ! The chest was empty!";
        case 5:
            character.score += 5;
            return "<br><br>You hear a faint voice that says 'Do not eat the bread' <br><br> Where coult it possibly come from ?";
        case 6:
            character.score += 10;
            let addItemCase5 = character.addInventory(1);
            updateInventory();
            if (addItemCase5) {
                return "<br><br>You found an Health potion ! It has been added to your inventory !";
            } else {
                return "<br><br>You found an Health potion ! Unfortunately, your inventory is full !";
            }
        case 7:
            character.score += 15;
            character.chance = 5;
            return "<br><br>You found a four-leaf clover, your chance increased greatly!";
        case 8:
            character.score += 20;
            character.addInventory(1);
            character.addInventory(1);
            updateInventory();
            return "<br><br>You found 2 health potions!";
        case 9:
            character.score += 25;
            character.maxHealth += 40;
            character.stamina += 40;
            return "<br><br>You found a mushroom. Your max Health has been increased by 40.";
        case 10:
            character.score += 30;
            if (character.attack_1 != "Master cut") {
                character.strength = parseInt(character.strength) * 1.5;
                character.attack_1 = "Master cut";
                character.attack_2 = "Final blow";
                return "<br><br>You found the MasterSword ! Your attacks are now Legendary !";
            } else {
                return "<br><br>You found another Master Sword. <br><br> Not very usefull but go buy a lottery ticket buddy !"
            }

        default:
            return gameOver("<br><br>A Ghoul came out of the chest and ate you alive, You died !");
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
            character.strength += 10;
            return "Jinn: You, knight, wished to have super strength and your wish has been granted.<br>You are now so strong that your attacks will cause you to hurt yourself.<br><br> The Jinn dissapears laughing maniacally.<br>";
        case 2:
            //Age the wizard
            character.jinn = 2;
            character.stamina = character.stamina * 2
            character.maxHealth = character.stamina;
            setTimeout(() => {
                setInterval(function () {
                    let parkinson = 1;
                    $("#main-box").effect("shake", { times: 8, distance: parkinson });
                    parkinson++;
                    $('body').animate({ opacity: gettingOlder });
                    gettingOlder -= 0.005;
                }, 1600)
            }, 5000);
            return " Jinn: You, wizard, wished for immortality and your wish has been granted.<br> You will have to endure the effects of aging for all the eternity!<br><br> The Jinn dissapears laughing maniacally.<br>";
        case 3:
            character.jinn = 3;
            character.speed = 10;
            return "Jinn: You, Huntress, wished for perfect aim.<br> You will never miss your target ever again but you will see no more.<br><br> The Jinn dissapears laughing maniacally.<br>";
        case 4:
            character.jinn = 4;
            character.strength = character.strength * 1.2;
            character.speed = 10;
            $('#death-timer').show();
            return "Jinn: You, Assassin, wished for super speed and your wish has been Granted.<br> However, do never slow down or you will die!<br><br> The Jinn dissapears laughing maniacally.<br>";
        case 10:
            character.score+=100;
            return"The Jinn looked at you in the eyes, then dissapeared. <br> He looked scared!";
    }
}

//Initiate the fighting variables and Generate the ennemy.
//Afterfight need to reset those values + show button3
// generateFight(10, "Bla bla bla wants to fight you", winning path)
let turn = 1;
var ennemy;
var afterFight;
generateFight = async (ennemy_id, message, afterPath) => {

    //Where to go once the fight is done
    afterFight = afterPath;
    // Generate the ennemy character
    getEnnemyStats = await generateChar(ennemy_id);
    ennemy = new CharacterObj(getEnnemyStats);
    $("#enemy-sprite").attr("src", "/sprites/" + ennemy.class_id + ".gif");
    $("#enemy-char-name").html(ennemy.name);
    $("#enemy-char-box").show();
    $("#enemy-sprite-box").show();
    updateHealthEnnemy();
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
                $("#game_message").append(`You used ${character.attack_1} on ${ennemy.name}.<br><br>`);
                $("#char-sprite").attr("src", "/sprites/" + character.class_id + "-attack-light.gif");
                setTimeout(() => { $("#char-sprite").attr("src", "/sprites/" + character.class_id + ".gif"); }, 1400)



            } else if (attack === 2) {
                charDmg = charDmg * 1.2
                charMiss = () => { return (Math.random() * 100 < missArr2[character.speed]); }
                ennemyDodge = () => { return (Math.random() * 100 < dodgeArr2[ennemy.speed]); }
                charCritical = () => { return (Math.random() * 100 < criticallArr[character.luck]); }
                $("#game_message").append(`You used ${character.attack_2} on ${ennemy.name}.<br><br>`);
                $("#char-sprite").attr("src", "/sprites/" + character.class_id + "-attack-heavy.gif");
                setTimeout(() => { $("#char-sprite").attr("src", "/sprites/" + character.class_id + ".gif"); }, 1400)

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
                $("#char-sprite").addClass("animate__animated animate__shakeX");
                setTimeout(() => { $("#char-sprite").removeClass("animate__animated animate__shakeX");}, 1000)
                if (character.attack_2 == "Fury" && attack === 2) {
                    character.strength = character.strength * 1.1;
                    $("#game_message").append(`You gain 10% Strength!<br><br>`);
                } else if (character.attack_2 == "Chant" && attack === 2) {
                    charDmg = charDmg * 0.8
                    $("#game_message").append(`You Self heal for 10hp<br><br>`);
                    character.stamina += 10;
                    if (character.stamina > character.maxHealth) {
                        character.stamina = character.maxHealth;
                    }
                    updateHealth();
                }
                charDmg = Math.round(charDmg * 100) / 100;
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
            game(afterFight, 1);
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
                $("#game_message").append(`${ennemy.name} used ${ennemy.attack_1}.<br><br>`);

            } else {
                ennemyDmg = ennemyDmg * 1.2
                ennemyMiss = () => { return (Math.random() * 100 < missArr2[ennemy.speed]); }
                charDodge = () => { return (Math.random() * 100 < dodgeArr2[character.speed]); }
                ennemyCritical = () => { return (Math.random() * 100 < criticallArr[ennemy.luck]); }
                $("#game_message").append(`${ennemy.name} used ${ennemy.attack_2}.<br><br>`);


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
                if (ennemy.attack_2 == "Berserk" && ennemyAttack < 0.5) {
                    ennemy.strength = ennemy.strength * 1.1;
                    $("#game_message").append(`The ennemy enrage and get stronger!<br><br>`);
                } else if (ennemy.attack_1 == "Confusion" && ennemyAttack >= 0.5) {
                    ennemy.stamina -= 30;
                    $("#game_message").append(`${ennemy.name} hurts himself in his confusion<br><br>`);
                    updateHealthEnnemy();
                }
                $("#enemy-sprite-box").addClass("animate__animated animate__shakeX");
                setTimeout(() => { $("#enemy-sprite-box").removeClass("animate__animated animate__shakeX");}, 1000)
                ennemyDmg = Math.round(ennemyDmg * 100) / 100;
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
            game(afterFight, 1);
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
    let health = character.stamina / character.maxHealth;
    if (health < 0 || character.stamina < 0) {
        character.stamina = 0;
        health = 0;
    }
    var hp = document.getElementById("health-bar");
    $("#char-health").html(`Health: ${Math.round(character.stamina)}/${character.maxHealth}`);
    RPGUI.set_value(hp, health);
}

updateHealthEnnemy = () => {
    let health = ennemy.stamina / ennemy.maxHealth;
    if (health < 0 || ennemy.stamina < 0) {
        ennemy.stamina = 0;
        health = 0;
    }
    var hp = document.getElementById("enemy-health-bar");
    $("#enemy-char-health").html(`Health: ${Math.round(ennemy.stamina)}/${ennemy.maxHealth}`);
    RPGUI.set_value(hp, health);
}

//Update the inventory.
updateInventory = async () => {
    $("#inventory").html(``);

    if (character.inventory.a == 1) {
        $("#inventory").append(`<div class="rpgui-icon potion-red">1</div>`);
    } else {
        $("#inventory").append(`<div class="rpgui-icon empty-slot" >1</div>`);
    }
    if (character.inventory.b == 1) {
        $("#inventory").append(`<div class="rpgui-icon potion-red">2</div>`);
    } else {
        $("#inventory").append(`<div class="rpgui-icon empty-slot">2</div>`);
    }
    if (character.inventory.c == 1) {
        $("#inventory").append(`<div class="rpgui-icon potion-red">3</div>`);
    } else {
        $("#inventory").append(`<div class="rpgui-icon empty-slot">3</div>`);
    }
    if (character.inventory.d == 1) {
        $("#inventory").append(`<div class="rpgui-icon potion-red">4</div>`);
    } else {
        $("#inventory").append(`<div class="rpgui-icon empty-slot">4</div>`);

    }


}

$(document).on("keydown", function (event) {

    if (event.keyCode === 49 || event.keyCode === 50 || event.keyCode === 51 || event.keyCode === 52) {
        if (character.inventory.a == 1 || character.inventory.b == 1 || character.inventory.c == 1 || character.inventory.d == 1) {
            useItem();
        }
    }

})
$("1").keypress(() => {

    let inventory = character.inventory;
    //check if the character has at least one item.



});

useItem = async () => {
    character.stamina += 30;

    if (character.stamina > character.maxHealth) {

        character.maxHealth = character.stamina;
    }
    character.removeInventory(1);
    updateInventory();
    updateHealth();
}

// Actions to be executed each time a path is generated.
// Actions is supposed to be async but we still need the Timeout for some reason
actions = async () => {
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
}

// Jinn spells.
// The wizard gets progressively more blind.
//The hunter becomes blind.
// The Assasin dies if he spend more than 20sec without doing anything
let gettingOlder = 1;
let gettingBlind = 0.1;
executeJinn = async () => {

    if (character.jinn == 3) {

        $('body').animate({ opacity: .1 });
        gettingBlind -= 0.01;
    }


}