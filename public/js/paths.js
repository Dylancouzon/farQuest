/*/////////////////////////////////
////////////Path Example//////////
//////////////////////////////////
Create a path with an unique ID (Need to add the corresponding call on game.js
    Make the function async if using Jinn or chest
    Switch case 1, 2, 3 For Corresponding buttons. Delete if not needed
    Default path is Game over. (The user should never reach this)
    Buttons appears automatically back on each path if they have been hidden
    
    explored[pathid].path Is to keep track and changes the outcome if a certain route has already been visited
    Ex : if(explored[13].a){
        $("#game_message").html("You explored route 13");
        $("#game_button2").hide();
    }else{
        $("#game_message").html("You did not explore route 13 yet");
        $("#game_message").html("Go there");
    }

    character.score += 10; == Add the score for the endgame
    Convention: +10 for uncommon path, +50 to win a fight + 100 almost impossible paths

    Fights :
        Make the path async !
        $("#game_message").html(``);
        generateFight(5, "A giant monster attacks you from behind!<br><br>", 6)
        generateFight(ennemyID, "Text ", Path to follow if winning)
        The winning path has to be a path with no switch case inside

    Chests:
    Make the path async !
    chest = await openChest();
    $("#game_message").html(chest);
    chest will return the chest response, the effects are applied automatically.

    Redirect :
    Just write game(pathId, button);
    ex : game(14, 1);

Ex :
path14 = (button) => {
    switch (button) {
        case 1:
            character.score += 10;
            explored[14].a = true;
            let jinn = await getJinn();
            $("#game_message").html(jinn);
            $("#game_button1").html(`Oh no!`);
            $("#game_button2").hide();
            $("#game_button3").hide();

            $("#path_id").val('15');
            break;
        case 2:
            explored[14].b = true;
            game(15, 1);
            break;
        case 3:
            $("#game_message").html(``);
            generateFight(5, "A giant monster attacks you from behind!<br><br>", 6)
            break;
        default:
            gameOver("How did you get here ? Well, it Doesn't matter, You died!");
    };
};
*/

//Include the fight music
$("body").append(`<audio loop id="Fight-music" src="../sounds/boss.ogg" type="audio/ogg"></audio>`);
$("body").append(`<audio loop id="soundtrack" src="../sounds/main-theme.ogg" type="audio/ogg"></audio>`);
$("body").append(`<audio loop id="jinn-chest" src="../sounds/jinn-chest.ogg" type="audio/ogg"></audio>`);
$("body").append(`<audio loop id="death-music" src="../sounds/game-over.ogg" type="audio/ogg"></audio>`);
var character;
let chest;
var typeSpeed = 75;

//Typwritter plugIn
var message = document.getElementById('game_message');
var typewriter = new Typewriter(message, {
    delay: typeSpeed,
});
// Creates an object of object to know all the visited paths
var explored = {};
for (let i = 1; i < 35; i++) {
    explored[i] = {};
}
//Show all buttons
show = () => {
    $("#game_button1").show();
    $("#game_button2").show();
    $("#game_button3").show();
    $("#enemy-char-box").hide();
    $("#enemy-sprite-box").hide();
};

path0 = async (char_id) => {
    show();
    $('#death-music').get(0).pause();
    let getStats = await generateChar(char_id);
    character = new CharacterObj(getStats);
    $("#char-name").html(character.name);
    $("#char-box").hide();


    // $("#char-sprite").attr("src", "/sprites/" + character.class_id + ".gif");
    if (character.is_NPC === 1) {
        return gameOver("What do you think you're doing ?");
    }
    //Message
    // $("#game_message").html(`
    // Welcome to our game ${character.name} !<br><br>
    // NAME is a turn based RPG, You will pursue an incredible adventure seeking for Farley, the lost cat! <br><br>
    //  Enjoy !
    // `);

    typewriter
        .typeString('Welcome to FarQuest Adventurer!<br>')
        .pauseFor(300)
        .typeString(`FarQuest is a turn based RPG.`)
        .typeString(`You will pursue an incredible adventure seeking for Farley, the lost cat!`)
        .start();

    //Buttons 
    $("#game_button1").html(`Continue`)
    $("#game_button2").hide()
    $("#game_button3").hide()

    // Next path ID
    $("#path_id").val('1');

};

//Story. Let's go = continue story, No = Game Over.
path1 = (button) => {
    $("#char-box").show();
    $("#char-sprite").attr("src", "/sprites/" + character.class_id + ".gif");
    
    switch (button) {

        case 1:
            explored[1].a = true;
            $("#game_message").html(`
                YOU RECIEVE A LETTER FROM A KING IN A LAND FAR AWAY.<br>
                HE IS ASKING FOR YOUR HELP TO RETRIEVE HIS BELOVED CAT FARLEY WHO WAS TAKEN AWAY BY AN EVIL LORD NAMED THOMAS !<br>
                HE WILL OFFER GREAT COMPENSATION TO THE HERO THAT WILL BE ABLE TO BRING THE ROYAL ANIMAL BACK<br>
            `);
            $("#game_button1").html(`LET'S GO!`);
            $("#game_button2").html(`No.`);
            $("#game_button3").hide();

            $("#path_id").val('2');
            break;
        default:
            gameOver("How did you get here ? Well, it Doesn't matter, You died!");
    };
};

// You arrive in the kindgom. You can choose to explore the castle or the forest first.
path2 = (button) => {
    switch (button) {
        case 1:
            explored[2].a = true;
            if (!explored[4].a) {
                $("#game_message").html(`
                After a long journey, you finally arrive in the Kingdom. <br> 
                All clues point out that the thiefs used the forest to escape.<br><br>
                What do you want to do ? <br>
            `);
            } else {
                $("#game_message").html(`
                    Where do you want to go next ?
            `);
            }
            $("#game_button1").html(`Investigate the Castle`);
            $("#game_button2").html(`Investigate the Forest`);
            $("#game_button3").hide();

            $("#path_id").val('3');
            break;

        case 2:
            gameOver('Why did you even start the game then ?');
            break;

        default:
            gameOver("How did you get here ? Well.... It Doesn't matter, You died!");
    };
};

//1 = Castle, 2 = Forest
path3 = (button) => {
    character.score += 10;
    switch (button) {
        case 1:
            explored[3].a = true;



            if (explored[4].a && explored[4].c) {
                $("#game_message").html("Farley doesn't seem to be in Castle.");
                $("#game_button1").html(`Go back`);
                $("#game_button2").hide();
                $("#game_button3").hide();
                $("#path_id").val('2');
            } else {
                $("#game_message").html("You arrive in the Castle, where should you start searching ?");
                if (!explored[4].a) {
                    $("#game_button1").html(`Courtyard`);
                } else {
                    $("#game_button1").hide();
                }
                $("#game_button2").html(`Dungeon`);
                if (!explored[4].c) {
                    $("#game_button3").html(`Kings Quarters`);
                } else {
                    $("#game_button3").hide();
                }
                $("#path_id").val('4');
            }
            break;

        case 2:
            explored[3].b = true;
            game(11);
            break;

        default:
            gameOver("How did you get here ? Well... It Doesn't matter, You died!");
    };
};

//1 = 10% chances finding master sword, Farley is not there. 2= Health potion, Farley is not there. 3 = fight id 5
path4 = (button) => {
    switch (button) {
        case 1:
            character.score += 10;
            explored[4].a = true;
            $("#game_message").html(`
            YOU GET TO THE COURTYARD<br> <br>
            You look thoroughly the massive gardens, the only things you find are some rusty coins and a health potion. 
            `);
            $("#game_button1").html(`Go back`);
            $("#game_button2").hide();
            $("#game_button3").hide();
            $("#path_id").val('3');
            character.addInventory(1);
            updateInventory();
            break;

        case 2:
            explored[4].b = true;
            character.score += 10;
            $("#game_message").html(`
            You enter the dungeon.<br>
            It is so dark in here, not a single spot of light can escape.<br><br>
                        `);
            $("#game_button1").html(`Go back`);
            $("#game_button2").html(`Keep going.`);
            $("#game_button3").hide();
            $("#path_id").val('5');
            break;

        case 3:
            explored[4].c = true;
            character.score += 10;
            let master = getMaster();
            if (master === true) {
                character.score += 30;
                $("#game_message").html(`
                        This is the Kings Quarters. <br><br>
                        Farley is not Here but you found the Master Sword!<br>
                        Your attack is now doubled!
                        `);
            } else {
                $("#game_message").html(`
                        This is the Kings Quarters.
                        <br><br> Farley is not here
                    `);
            }

            $("#game_button1").html(`Go back`);
            $("#game_button2").hide();
            $("#game_button3").hide();

            $("#path_id").val('3');
            break;

        default:
            gameOver("How did you get here ? Well... It Doesn't matter, You died!");
    };
};

// If the player enters the dungeon, start the fights. If he go back, returns to the castle.
path5 = (button) => {
    explored[5].a = true;
    switch (button) {
        case 2:
            $('#soundtrack').get(0).pause();
            $('#Fight-music').get(0).play();
            $("#game_message").html(``);
            generateFight(5, "A giant monster attacks you from behind!<br><br>", 6)
            break;
        default:
            game(3, 1);
    };

    // Wining path (just in case). Returns to the castle.
    path6 = (button) => {
        explored[6].a = true;
        character.score += 100;
        $('#soundtrack').get(0).play();
        $('#Fight-music').get(0).pause();
        $("#game_message").html(`How ??<br> You were not supposed to survive.`);
        $("#game_button1").html(`I'm the boss!`);
        $("#game_button2").hide();
        $("#game_button3").hide();

        $("#path_id").val('3');
    };
};

path7 = (button) => {
    // Empty for now
};

path8 = (button) => {
    // Empty for now
};

path9 = (button) => {
    // Empty for now
};

path10 = (button) => {
    // Empty for now
};

// Check the lake or keep going (Has to go to the lake).
var intervalDmg;
path11 = (button) => {
    clearInterval(intervalDmg);

    explored[11].a = true;
    $("#game_message").html(`
    You enter the Forest, and a weird Magical aura can be sensed. <br><br>
    You see a lake in the distance, do you want to check it out?<br>
    `);

    $("#game_button1").html(`Yes!`);
    $("#game_button2").html(`No, keep going!`);
    $("#game_button3").hide();

    $("#path_id").val('12');
};

// 1 Jinn route, 2 No go.
path12 = (button) => {

    switch (button) {

        case 1:
            explored[12].a = true;
            $("#game_message").html(`
                Once you start to get closer, you can feel your body being dragged by mystical forces towards a mysterious object<br><br>
                You pick up the object, and it is engraved with mysterious characters.<br>
                As you look at it, the Seal on the object vanishes and a dense fog start to materialize.<br>
            `);
            $("#game_button1").html(`Next`);
            $("#game_button2").hide();
            $("#game_button3").hide();
            $("#path_id").val('13');
            break;


        case 2:
            character.score += 10;
            explored[12].b = true;
            $("#game_message").html(`
            As you walk into the forest, a dense fog appears of nowhere. <br><br>
            It seems to get denser and colder for each step you take!<br>
            Go Back! You are taking Damage! <br>
            `);
            $("#game_button1").html(`Go back!`);
            $("#game_button2").hide();
            $("#game_button3").hide();
            intervalDmg = setInterval(function () {
                character.stamina -= 2;
                updateHealth();
            }, 1000);

            $("#path_id").val('11');
            break;

        default:
            gameOver("How did you get here ? Well... It Doesn't matter, You died!");
    };
};

//Jinn yes or no
path13 = (button) => {
    explored[13].a = true;
    $('#soundtrack').get(0).pause();
    $('#jinn-chest').get(0).play();
    $("#game_message").html(`
    A Jinn appears before your eyes!<br>
    He thanks you for liberating him and offers to grant you your biggest desire!<br>
    `);
    $("#game_button1").html(`Yes!`);
    $("#game_button2").html(`No thanks.`);
    $("#game_button3").hide();

    $("#path_id").val('14');
};

// Jinn or back to the forest
path14 = async (button) => {
    switch (button) {
        case 1:
            character.score += 100;
            explored[14].a = true;
            let jinn = await getJinn();
            $("#game_message").html(jinn);
            $("#game_button1").html(`Oh no!`);
            $("#game_button2").hide();
            $("#game_button3").hide();

            $("#path_id").val('15');
            break;
        case 2:
            explored[14].b = true;
            game(15, 1);
            break;
        default:
            gameOver("How did you get here ? Well, it Doesn't matter, You died!");
    };
};

// Now can follow the forest path
path15 = (button) => {
    $('#soundtrack').get(0).play();
    $('#jinn-chest').get(0).pause();
    switch (button) {
        case 1:
        case 2:
        case 3:
            explored[15].a = true;
            $("#game_message").html(`
            You are back at the beginning of the forest.<br>
            The mystical presence seems to have dissipated.<br>
            `);
            $("#game_button1").html(`Go back to the lake`);
            $("#game_button2").html(`Keep going into the forest.`);
            $("#game_button3").hide();
            $("#path_id").val('16');
            break;
        default:
            gameOver("How did you get here ? Well... It Doesn't matter, You died!");
    };
};


path16 = (button) => {
    switch (button) {
        case 1:
        case 3:
            character.score += 5;
            explored[16].b = true;
            $("#game_message").html(`
            There is nothing here<br>
            `);
            $("#game_button1").html(`Go back!`);
            $("#game_button2").hide();
            $("#game_button3").hide();
            $("#path_id").val('15');
            break;
        case 2:
            game(17, 1);
            break;
        default:
            gameOver("How did you get here ? Well... It Doesn't matter, You died!");
    };
};

path17 = (button) => {
    switch (button) {
        case 1:
            explored[17].a = true;
            $("#game_message").html(`
            You are at a Fork in the road<br><br>
            On the left you can see animal footprints<br>
            On the right, you can see wagon prints.<br>
            `);
            $("#game_button1").html(`Go Left`);
            $("#game_button2").html(`Go right`);
            $("#game_button3").hide();

            $("#path_id").val('18');
            break;
        default:
            gameOver("How did you get here ? Well... It Doesn't matter, You died!");
    };
};

path18 = (button) => {

    switch (button) {
        case 1:
            explored[18].a = true;
            $("#game_message").html(``);
            $('#soundtrack').get(0).pause();
            $('#Fight-music').get(0).play();
            generateFight(6, "This is not Farley!<br><br> It's a monster!", 19)
            break;
        case 2:
            explored[18].a = true;
            game(20, 1);
            break;
        default:
            gameOver("How did you get here ? Well... It Doesn't matter, You died!");
    };
};

path19 = async (button) => {
    $('#Fight-music').get(0).pause();
    $('#jinn-chest').get(0).play();
    explored[19].a = true;
    character.score += 50;
    $("#game_message").html(`
            You defeated the monster and found a chest ! Yay<br>
            `);

    chest = await openChest();
    $("#game_message").append(chest);
    $("#game_button1").html(`Follow the other path`);
    $("#game_button2").hide();
    $("#game_button3").hide();

    $("#path_id").val('20');
};

path20 = (button) => {
    $('#soundtrack').get(0).play();
    $('#jinn-chest').get(0).pause();
    switch (button) {
        case 1:
        case 2:
        case 3:
            explored[20].a = true;
            $("#game_message").html(`You stumble upon a campire that has been recently put out.`);
            if (!explored[21].a) {
                $("#game_button1").html(`Inspect the campsite`);
            } else {
                $("#game_button1").hide();
            }
            $("#game_button2").html(`Look at shiny object on the ground`);
            $("#game_button3").html(`Continue foward`);

            $("#path_id").val('21');
            break;
        default:
            gameOver("How did you get here ? Well... It Doesn't matter, You died!");
    };
};

path21 = (button) => {
    switch (button) {
        case 1:
            character.score += 10;
            explored[21].a = true;
            character.addInventory(1);
            updateInventory();
            $("#game_message").html(`
            You did not find any clues but you found an Health potion ! 
            `);
            $("#game_button1").html(`Go back`);
            $("#game_button2").hide();
            $("#game_button3").hide();

            $("#path_id").val('20');
            break;
        case 2:
            character.score += 10;
            explored[21].b = true;
            $("#game_message").html(`
            This is Farley's Ruby Collar <br><br> Hurry up ! They must be close!
            `);
            $("#game_button1").html(`Let's go!`);
            $("#game_button2").hide();
            $("#game_button3").hide();

            $("#path_id").val('22');
            break;

        case 3:
            explored[21].c = true;
            game(22, 1);
            break;
        default:
            gameOver("How did you get here ? Well... It Doesn't matter, You died!");
    };
};

path22 = (button) => {
    switch (button) {
        case 1:
        case 2:
        case 3:
            explored[22].a = true;
            $("#game_message").html(`The vilain's Kingdom is close!<br><br>You arrive at a bridge.`);
            $("#game_button1").html(`Inspect under the bridge`);
            $("#game_button2").html(`Inspect object on the ground`);
            $("#game_button3").html(`Continue foward`);
            $("#path_id").val('23');
            break;
        default:
            gameOver("How did you get here ? Well... It Doesn't matter, You died!");
    };
};

path23 = (button) => {
    switch (button) {
        case 1:
            explored[23].a = true;
            character.score += 60;
            $("#game_message").html(``);
            $('#soundtrack').get(0).pause();
            $('#Fight-music').get(0).play();
            generateFight(7, "A Troll lives here!<br><br>", 24);
            break;
        case 2:
            explored[23].b = true;
            $("#game_message").html(`Ewwww, that is Poop !<br><br> What are you doing ?<br>Drop This!`);
            $("#game_button1").html(`Ewwww`);
            $("#game_button2").hide();
            $("#game_button3").hide();
            $("#path_id").val('24');
            break;

        case 3:
            explored[23].c = true;
            game(24, 1);
            break;
        default:
            gameOver("How did you get here ? Well... It Doesn't matter, You died!");
    };
};

path24 = (button) => {
    $('#soundtrack').get(0).play();
    $('#Fight-music').get(0).pause();
    switch (button) {
        case 1:
        case 2:
        case 3:
            explored[24].a = true;
            $("#game_message").html(`As you walk down the bridge<br> A charming old woman approches you.`);
            $("#game_button1").html(`Ask how old she is`);
            $("#game_button2").html(`Ask about Farley`);
            $("#game_button3").html(`Continue foward`);
            $("#path_id").val('25');
            break;
        default:
            gameOver("How did you get here ? Well... It Doesn't matter, You died!");
    };
};

path25 = (button) => {
    switch (button) {
        case 1:
            character.score -= 23;
            character.stamina -= 30;
            updateHealth();
            explored[25].a = true;
            $("#game_message").html(`She hits you with her Bag<br><br> You lose 30hp<br><br> Was this bag full of stones ???`);
            $("#game_button1").html(`You deserved it.`);
            $("#game_button2").hide();
            $("#game_button3").hide();
            $("#path_id").val('26');
            break;
        case 2:
            explored[25].b = true;
            character.score += 20;
            $("#game_message").html(`She starts to mumble some nonsense<br><br> The only thing you picked up is: The bread is a lie.`);
            $("#game_button1").html(`That was weird`);
            $("#game_button2").hide();
            $("#game_button3").hide();
            $("#path_id").val('26');
            break;

        case 3:
            explored[25].c = true;
            game(26, 1);
            break;
        default:
            gameOver("How did you get here ? Well... It Doesn't matter, You died!");
    };
};

path26 = (button) => {
    switch (button) {
        case 1:
        case 2:
        case 3:
            explored[26].a = true;
            $("#game_message").html(`You reached the moat`);
            $("#game_button1").html(`Try and swim Across?`);
            $("#game_button2").html(`Yell at the guards to let you in?`);
            $("#game_button3").html(`Try to sneak in?`);
            $("#path_id").val('27');
            break;
        default:
            gameOver("How did you get here? Well... It doesn't matter, your dead!");
    };
};

path27 = (button) => {
    switch (button) {
        case 1:
            explored[27].a = true;
            gameOver("A beast ate you! <br><br> You died.");
            break;
        case 2:
            explored[27].b = true;
            character.score += 50;
            $("#game_message").html(``);
            $('#soundtrack').get(0).pause();
            $('#Fight-music').get(0).play();
            generateFight(8, "They're attacking!<br><br>", 28);
            break;

        case 3:
            explored[27].c = true;
            if (character.luck > 2) {
                $("#game_message").html(`You sneaked in!`);
                $("#game_button1").html(`Next`);
                $("#game_button2").hide();
                $("#game_button3").hide();
                $("#path_id").val('28');
            } else {
                character.score += 40;
                $('#soundtrack').get(0).pause();
                $('#Fight-music').get(0).play();
                $("#game_message").html(``);
                generateFight(8, "A guard caught you!<br><br>", 28);
            }
            break;
        default:
            gameOver("How did you get here? Well... It doesn't matter, your dead!");
    };
};

path28 = (button) => {
    switch (button) {
        case 1:
        case 2:
        case 3:
            $('#soundtrack').get(0).play();
            $('#Fight-music').get(0).pause();
            $('#jinn-chest').get(0).pause();
            explored[28].a = true;
            $("#game_message").html(`You have entered the enemy Kingdom<br><br> Where do you want to go?`);
            $("#game_button1").html(`Tavern`);
            $("#game_button2").html(`Castle`);
            if (!explored[29].c) {
                $("#game_button3").html(`Stables`);
            } else {
                $("#game_button3").hide();
            }
            $("#path_id").val('29');
            break;
        default:
            gameOver("How did you get here? Well... It doesn't matter, your dead!");
    };
};

path29 = async (button) => {
    switch (button) {
        case 1:
            explored[29].a = true;
            $("#game_message").html(`You entered the Tavern<br><br> The only thing here is an old wizard and a piece of bread on the counter<br>`);
            $("#game_button1").html(`Talk to the wizard`);
            $("#game_button2").html(`Pick up the bread`);
            $("#game_button3").html(`Go back`);
            $("#path_id").val('30');
            break;

        case 2:
            explored[29].b = true;
            $("#game_message").html(`Guards: <br><br> Step back or die!`);
            $("#game_button1").html(`Go back`);
            $("#game_button2").hide();
            $("#game_button3").hide();
            $("#path_id").val('28');
            break;

        case 3:
            explored[29].c = true;
            character.score += 10;
            $("#enemy-sprite").attr("src", "/sprites/chest.gif");
            $("#enemy-sprite").show();
            chest = await openChest();
            $('#soundtrack').get(0).pause();
            $('#jinn-chest').get(0).play();
            $("#game_message").html(`You found a chest!<br><br> ${chest}`);
            $("#game_button1").html(`Go back`);
            $("#game_button2").hide();
            $("#game_button3").hide();
            $("#path_id").val('28');
            break;
        default:
            gameOver("How did you get here? Well... It doesn't matter, your dead!");
    };
};

path30 = (button) => {
    switch (button) {
        case 1:
            document.addEventListener('keydown', keyHandler, false);
            explored[30].a = true;
            $("#game_message").html(`The wizard says: "Show me that you are a member of the Konami clan".`);
            $("#game_button1").html(`Go back!`);
            $("#game_button2").hide();
            $("#game_button3").hide()
            $("#path_id").val('31');
            break;
        case 2:
            explored[30].b = true;
            gameOver("The bread was poisoned.<br><br> You died!")
            break;
        case 3:
            explored[30].c = true;
            game(28, 1);
            break;
        default:
            gameOver("How did you get here? Well... It doesn't matter, your dead!");
    };
};

path31 = (button) => {
    switch (button) {
        case 1:
            game(29, 1);
            break;
        case 2:
        case 3:
            character.score += 30;
            explored[31].a = true;
            $("#game_message").html(`The wizard helped you sneak into the castle. <br><br> You arrive at a stairway. Which direction do you want to go?`);
            $("#game_button1").html(`Up`);
            if (!explored[32].b) {
                $("#game_button2").html(`Down`);
            } else {
                $("#game_button2").hide();
            }
            $("#game_button3").hide()
            $("#path_id").val('32');
            break;

        default:
            gameOver("How did you get here? Well... It doesn't matter, your dead!");
    };
};


path32 = (button) => {
    switch (button) {
        case 1:
        case 3:
            explored[32].a = true;
            character.score += 100;
            $("#game_message").html(``);
            $('#soundtrack').get(0).pause();
            $('#Fight-music').get(0).play();
            generateFight(9, "Farley, it's you!<br><br> Oh, no. The evil Thomas wants to fight you!", 33);
            break;

        case 2:
            character.score += 30;
            explored[32].b = true;
            character.addInventory(1);
            updateInventory();
            $("#game_message").html(`You found a potion`);
            $("#game_button2").html(`Go back`);
            $("#game_button1").hide();
            $("#game_button3").hide()
            $("#path_id").val('31');
            break;
        default:
            gameOver("How did you get here? Well... Itt doesn't matter, your dead!");
    };
};

path33 = async (button) => {
    switch (button) {
        case 1:
        case 2:
        case 3:
            const highscore = character.score;
            $('#soundtrack').get(0).play();
            $('#Fight-music').get(0).pause();
            const response = await fetch('/api/user/highscore', {
                method: 'PUT',
                body: JSON.stringify({ highscore }),
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(response);
            explored[33].a = true;
            $("#game_message").html(`You Won !!!<br><br> Final Score: ${highscore}`);
            $("#game_button1").hide()
            $("#game_button2").hide()
            $("#game_button3").hide()
            $("#path_id").val('34');


            break;

        default:
            gameOver("How did you get here? Well... It doesn't matter, your dead!");
    };
};






gameOver = (message) => {
    $('#soundtrack').get(0).pause();
    $('#Fight-music').get(0).pause();

    $('#death-music').get(0).play();
    character.inventory = { a: 0, b: 0, c: 0, c: 0 };
    updateInventory()
    for (let i = 1; i < 35; i++) {
        explored[i] = {};
    }
    $("#char-sprite").attr("src", "/sprites/" + character.class_id + "-dead.gif");
    setTimeout(() => { $("#char-sprite").attr("src", "/sprites/" + character.class_id + "-dead-static.png"); }, 1900)
    $("#game_message").html(message);
    $("#game_message").append(`<br><br> Your Score: ${character.score}`);
    $("#game_button1").html(`Play again`);
    $("#game_button2").hide();
    $("#game_button3").hide();
    $("#path_id").val('GO');
};
endGame = () => {

};

