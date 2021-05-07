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
        generateFight(5, "<p>A giant monster attacks you from behind!<br><br></p>", 6)
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
            generateFight(5, "<p>A giant monster attacks you from behind!<br><br></p>", 6)
            break;
        default:
            gameOver("How did you get here ? Well, it Doesn't matter, You died!");
    };
};
*/
var character;
let chest;

// Creates an object of object to know all the visited paths
var explored = {};
for (let i = 1; i < 20; i++) {
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
    let getStats = await generateChar(char_id);
    character = new CharacterObj(getStats);
    $("#char-name").html(character.name);
    $("#char-sprite").attr("src", "/sprites/" + character.class_id + ".gif");
    if (character.is_NPC === 1) {
        return gameOver("What do you think you're doing ?");
    }
    //Message
    $("#game_message").html(`<p>
    Welcome to our game ${character.name} !<br><br>
    NAME is a turn based RPG, You will pursue an incredible adventure seeking for Farley, the lost cat! <br><br>
     Enjoy !
    </p>`);

    //Buttons 
    $("#game_button1").html(`Continue`);
    $("#game_button2").hide();
    $("#game_button3").hide();

    // Next path ID
    $("#path_id").val('1');

};

//Story. Let's go = continue story, No = Game Over.
path1 = (button) => {
    $("#char-sprite").attr("src", "/sprites/" + character.class_id + ".gif");
    switch (button) {

        case 1:
            explored[1].a = true;
            $("#game_message").html(`<p>
                YOU RECIEVE A LETTER FROM A KING IN A LAND FAR AWAY.<br>
                HE IS ASKING FOR YOUR HELP TO RETRIEVE HIS BELOVED CAT FARLEY WHO WAS TAKEN AWAY BY AN EVIL LORD NAMED THOMAS !<br>
                HE WILL OFFER GREAT RECOMPENSE TO THE HERO THAT WILL BE ABLE TO BRING THE ROYAL ANIMAL BACK<br>
            </p>`);

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
                $("#game_message").html(`<p>
                After a long journey, you finally arrive in the Kingdom. <br> 
                All clues point out that the thiefs used the forest to escape.<br><br>
                What do you want to do ? <br>
            </p>`);
            } else {
                $("#game_message").html(`<p>
                    Where do you want to go next ?
            </p>`);
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
            gameOver("How did you get here ? Well, it Doesn't matter, You died!");
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
                $("#game_button3").html(`Kings Quarters`);
                $("#path_id").val('4');
            }
            break;

        case 2:
            explored[3].b = true;
            game(11);
            break;

        default:
            gameOver("How did you get here ? Well, it Doesn't matter, You died!");
    };
};

//1 = 10% chances finding master sword, Farley is not there. 2= Health potion, Farley is not there. 3 = fight id 5
path4 = (button) => {
    switch (button) {
        case 1:
            character.score += 10;
            explored[4].a = true;
            $("#game_message").html(`<p>
            YOU GET TO THE COURTYARD<br> <br>
            You look thoroughly the massive gardens, the only things you find are some rusty coins and a health potion. 
            </p>`);
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
            $("#game_message").html(`<p>
            You enter the dungeon.<br>
            It is so dark in here, not a single spot of light can escape.<br><br>
                        </p>`);
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
                $("#game_message").html(`<p>
                        This is the Kings Quarters. <br><br>
                        Farley is not Here but you found the Master Sword!<br>
                        Your attack is now doubled!
                        </p>`);
            } else {
                $("#game_message").html(`
                        <p>This is the Kings Quarters.
                        <br><br> Farley is not here</p>
                    `);
            }

            $("#game_button1").html(`Go back`);
            $("#game_button2").hide();
            $("#game_button3").hide();

            $("#path_id").val('3');
            break;

        default:
            gameOver("How did you get here ? Well, it Doesn't matter, You died!");
    };
};

// If the player enters the dungeon, start the fights. If he go back, returns to the castle.
path5 = (button) => {
    explored[5].a = true;
    switch (button) {
        case 2:
            $("#game_message").html(``);
            generateFight(5, "<p>A giant monster attacks you from behind!<br><br></p>", 6)
            break;
        default:
            game(3, 1);
    };

    // Wining path (just in case). Returns to the castle.
    path6 = (button) => {
        explored[6].a = true;
        character.score += 100;
        $("#game_message").html(`<p>How ??<br> You were not supposed to survive.</p>`);
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
    $("#game_message").html(`<p>
    You enter the Forest, and a weird Magical aura can be sensed. <br><br>
    You see a lake in the distance, do you want to check it out?<br>
    </p>`);

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
            $("#game_message").html(`<p>
                Once you start to get closer, you can feel your body being dragged by mystical forces towards a mysterious object<br><br>
                You pick up the object, and it is engraved with mysterious characters.<br>
                As you look at it, the Seal on the object dissapear and a dense fog start to materialize.<br>
            </p>`);
            $("#game_button1").html(`Next`);
            $("#game_button2").hide();
            $("#game_button3").hide();
            $("#path_id").val('13');
            break;


        case 2:
            explored[12].b = true;
            $("#game_message").html(`<p>
            As you walk into the forest, a dense fog appears of nowhere. <br><br>
            It seems to get denser and colder for each step you take!<br>
            Go Back! You are taking Damage! <br>
            </p>`);
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
            gameOver("How did you get here ? Well, it Doesn't matter, You died!");
    };
};

//Jinn yes or no
path13 = (button) => {
    explored[13].a = true;
    $("#game_message").html(`<p>
    A Jinn appears before your eyes!<br>
    He thanks you for liberating him and he offers you to grant your biggest desire!<br>
    </p>`);
    $("#game_button1").html(`Yes!`);
    $("#game_button2").html(`No thanks.`);
    $("#game_button3").hide();

    $("#path_id").val('14');
};

// Jinn or back to the forest
path14 = async (button) => {
    switch (button) {
        case 1:
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
    switch (button) {
        case 1:
        case 2:
        case 3:
            explored[15].a = true;
            $("#game_message").html(`<p>
            You are back at the begging of the forest.<br>
            The mystical presence seems to have dissipated.<br>
            </p>`);
            $("#game_button1").html(`Go back to the lake`);
            $("#game_button2").html(`Keep going into the forest.`);
            $("#game_button3").hide();
            $("#path_id").val('16');
            break;
        default:
            gameOver("How did you get here ? Well, it Doesn't matter, You died!");
    };
};


path16 = (button) => {
    switch (button) {
        case 1:
        case 3:
            explored[16].b = true;
            $("#game_message").html(`<p>
            There is nothing here<br>
            </p>`);
            $("#game_button1").html(`Go back!`);
            $("#game_button2").hide();
            $("#game_button3").hide();
            $("#path_id").val('15');
            break;
        case 2:
            game(17, 1);
            break;
        default:
            gameOver("How did you get here ? Well, it Doesn't matter, You died!");
    };
};

path17 = (button) => {
    switch (button) {
        case 1:
            explored[17].a = true;
            $("#game_message").html(`<p>
            You are a a Fork in the road<br><br>
            On the left you can see animal Footprints<br>
            On the right, you can see wagon prints.<br>
            </p>`);
            $("#game_button1").html(`Go Left`);
            $("#game_button2").html(`Go right`);
            $("#game_button3").hide();

            $("#path_id").val('18');
            break;
        default:
            gameOver("How did you get here ? Well, it Doesn't matter, You died!");
    };
};

path18 = (button) => {

    switch (button) {
        case 1:
            explored[17].a = true;
            $("#game_message").html(``);
            generateFight(6, "<p>This is not Farley!<br><br> It's a monster!</p>", 19)
            break;
        case 2:
            explored[18].a = true;
            $("#game_message").html(`Follow the Wagon`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('20');
            break;
        default:
            gameOver("How did you get here ? Well, it Doesn't matter, You died!");
    };
};

path19 = async (button) => {
    $("#game_message").html(`<p>
            You defeated the monster and found a chest ! Yay<br>
            </p>`);
    chest = await openChest();
    $("#game_message").append(chest);
    $("#game_button1").html(`Follow the other path`);
    $("#game_button2").hide();
    $("#game_button3").hide();

    $("#path_id").val('20');
};

path20 = (button) => {

    switch (button) {
        case 1:
            $("#game_message").html(`Wagon path`);
            $("#game_button1").html(`Return to profile`);
            $("#game_button2").html(`Play, again!`);
            $("#game_button3").hide();
            break;
        case 2:
            $("#game_message").html(`This is path 20 <br> This is the end of the game!!!`);
            $("#game_button1").html(`Return to profile`);
            $("#game_button2").html(`Play, again!`);
            $("#game_button3").hide();
            break;

        case 3:
            $("#game_message").html(`This is path 20 <br> This is the end of the game!!!`);
            $("#game_button1").html(`Return to profile`);
            $("#game_button2").html(`Play, again!`);
            $("#game_button3").hide();
            break;
        default:
        // end of game function needs to go here
        // endGame();
    };
};

gameOver = (message) => {
    character.inventory = { a: 0, b: 0, c: 0, c: 0 };
    updateInventory()
    $("#char-sprite").attr("src", "/sprites/" + character.class_id + "-dead.gif");
    setTimeout(() => { $("#char-sprite").attr("src", "/sprites/" + character.class_id + "-dead-static.png"); }, 1500)
    $("#game_message").html(message);
    $("#game_button1").html(`Play again`);
    $("#game_button2").hide();
    $("#game_button3").hide();
    $("#path_id").val('0');
};
endGame = () => {

};

