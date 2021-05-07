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
};

path0 = async (char_id) => {
    show();
    let getStats = await generateChar(char_id);
    character = new CharacterObj(getStats);
    $("h3").html(character.name);
    $("#char-sprite").attr("src", "/sprites/"+character.class_id+".gif");
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
    show();
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
    show();
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
    show();
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
                $("#game_button1").html(`Courtyard`);
                $("#game_button2").html(`Dungeon`);
                $("#game_button3").html(`Kings Quarters`);
                $("#path_id").val('4');
            }
            break;

        case 2:
            explored[3].b = true;
            $("#game_message").html("Forest path to do");

            $("#game_button1").html(``);
            $("#game_button2").html(``);
            $("#game_button3").html(``);

            $("#path_id").val('');
            break;

        default:
            gameOver("How did you get here ? Well, it Doesn't matter, You died!");
    };
};

//1 = 10% chances finding master sword, Farley is not there. 2= Health potion, Farley is not there. 3 = fight id 5
path4 = (button) => {
    show();
    switch (button) {
        case 1:
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
            break;

        case 2:
            explored[4].b = true;
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
            let master = getMaster();
            if (master === true) {
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
    show();
    explored[5].a
    switch (button) {
        case 2:
            $("#game_message").html(``);
            generateFight(5, "<p>A giant monster attacks you from behind!<br><br></p>", 6)
        default:
            game(3, 1);
    };

    // Wining path (just in case). Returns to the castle.
    path6 = (button) => {
        show();
        $("#game_message").html(`How ??`);
        $("game_button1").html(`I'm the boss!`);

        $("#path_id").val('3');
    };
};

path7 = (button) => {
    switch (button) {
        case 1:
            $("#game_message").html(`This is path 7 <br> You selected Action A`);
            $("game_button1").html(`Action A`);
            $("game_button2").html(`Action B`);
            $("game_button3").html(`Action C`);

            $("#path_id").val('8');
            break;
        case 2:
            $("#game_message").html(`This is path 7 <br> You selected Action B`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('8');

        case 3:
            $("#game_message").html(`This is path 7 <br> You selected Action C`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('8');
            break;
        default:
            pathCheater();
    };
};

path8 = (button) => {
    switch (button) {
        case 1:
            $("#game_message").html(`This is path 8 <br> You selected Action A`);
            $("game_button1").html(`Action A`);
            $("game_button2").html(`Action B`);
            $("game_button3").html(`Action C`);

            $("#path_id").val('9');
            break;
        case 2:
            $("#game_message").html(`This is path 8 <br> You selected Action B`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('9');

        case 3:
            $("#game_message").html(`This is path 8 <br> You selected Action C`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('9');
            break;
        default:
            pathCheater();
    };
};

path9 = (button) => {
    switch (button) {
        case 1:
            $("#game_message").html(`This is path 9 <br> You selected Action A`);
            $("game_button1").html(`Action A`);
            $("game_button2").html(`Action B`);
            $("game_button3").html(`Action C`);

            $("#path_id").val('10');
            break;
        case 2:
            $("#game_message").html(`This is path 9 <br> You selected Action B`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('10');

        case 3:
            $("#game_message").html(`This is path 9 <br> You selected Action C`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('10');
            break;
        default:
            pathCheater();
    };
};

path10 = (button) => {
    switch (button) {
        case 1:
            $("#game_message").html(`This is path 10 <br> You selected Action A`);
            $("game_button1").html(`Action A`);
            $("game_button2").html(`Action B`);
            $("game_button3").html(`Action C`);

            $("#path_id").val('11');
            break;
        case 2:
            $("#game_message").html(`This is path 10 <br> You selected Action B`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('11');

        case 3:
            $("#game_message").html(`This is path 10 <br> You selected Action C`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('11');
            break;
        default:
            pathCheater();
    };
};

path11 = (button) => {
    switch (button) {
        case 1:
            $("#game_message").html(`This is path 11 <br> You selected Action A`);
            $("game_button1").html(`Action A`);
            $("game_button2").html(`Action B`);
            $("game_button3").html(`Action C`);

            $("#path_id").val('12');
            break;
        case 2:
            $("#game_message").html(`This is path 11 <br> You selected Action B`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('12');

        case 3:
            $("#game_message").html(`This is path 11 <br> You selected Action C`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('12');
            break;
        default:
            pathCheater();
    };
};

path12 = (button) => {
    switch (button) {
        case 1:
            $("#game_message").html(`This is path 12 <br> You selected Action A`);
            $("game_button1").html(`Action A`);
            $("game_button2").html(`Action B`);
            $("game_button3").html(`Action C`);

            $("#path_id").val('13');
            break;
        case 2:
            $("#game_message").html(`This is path 12 <br> You selected Action B`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('13');

        case 3:
            $("#game_message").html(`This is path 12 <br> You selected Action C`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('13');
            break;
        default:
            pathCheater();
    };
};

path13 = (button) => {
    switch (button) {
        case 1:
            $("#game_message").html(`This is path 13 <br> You selected Action A`);
            $("game_button1").html(`Action A`);
            $("game_button2").html(`Action B`);
            $("game_button3").html(`Action C`);

            $("#path_id").val('14');
            break;
        case 2:
            $("#game_message").html(`This is path 13 <br> You selected Action B`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('14');

        case 3:
            $("#game_message").html(`This is path 13 <br> You selected Action C`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('14');
            break;
        default:
            pathCheater();
    };
};

path14 = (button) => {
    switch (button) {
        case 1:
            $("#game_message").html(`This is path 14 <br> You selected Action A`);
            $("game_button1").html(`Action A`);
            $("game_button2").html(`Action B`);
            $("game_button3").html(`Action C`);

            $("#path_id").val('15');
            break;
        case 2:
            $("#game_message").html(`This is path 14 <br> You selected Action B`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('15');

        case 3:
            $("#game_message").html(`This is path 14 <br> You selected Action C`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('15');
            break;
        default:
            pathCheater();
    };
};

path15 = (button) => {
    switch (button) {
        case 1:
            $("#game_message").html(`This is path 15 <br> You selected Action A`);
            $("game_button1").html(`Action A`);
            $("game_button2").html(`Action B`);
            $("game_button3").html(`Action C`);

            $("#path_id").val('16');
            break;
        case 2:
            $("#game_message").html(`This is path 15 <br> You selected Action B`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('16');

        case 3:
            $("#game_message").html(`This is path 15 <br> You selected Action C`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('16');
            break;
        default:
            pathCheater();
    };
};

path16 = (button) => {
    switch (button) {
        case 1:
            $("#game_message").html(`This is path 16 <br> You selected Action A`);
            $("game_button1").html(`Action A`);
            $("game_button2").html(`Action B`);
            $("game_button3").html(`Action C`);

            $("#path_id").val('17');
            break;
        case 2:
            $("#game_message").html(`This is path 16 <br> You selected Action B`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('17');

        case 3:
            $("#game_message").html(`This is path 16 <br> You selected Action C`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('17');
            break;
        default:
            pathCheater();
    };
};

path17 = (button) => {
    switch (button) {
        case 1:
            $("#game_message").html(`This is path 17 <br> You selected Action A`);
            $("game_button1").html(`Action A`);
            $("game_button2").html(`Action B`);
            $("game_button3").html(`Action C`);

            $("#path_id").val('18');
            break;
        case 2:
            $("#game_message").html(`This is path 17 <br> You selected Action B`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('18');

        case 3:
            $("#game_message").html(`This is path 17 <br> You selected Action C`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('18');
            break;
        default:
            pathCheater();
    };
};

path18 = (button) => {
    switch (button) {
        case 1:
            $("#game_message").html(`This is path 18 <br> You selected Action A`);
            $("game_button1").html(`Action A`);
            $("game_button2").html(`Action B`);
            $("game_button3").html(`Action C`);

            $("#path_id").val('19');
            break;
        case 2:
            $("#game_message").html(`This is path 18 <br> You selected Action B`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('19');

        case 3:
            $("#game_message").html(`This is path 18 <br> You selected Action C`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('19');
            break;
        default:
            pathCheater();
    };
};

path19 = (button) => {
    switch (button) {
        case 1:
            $("#game_message").html(`This is path 19 <br> You selected Action A`);
            $("game_button1").html(`Action A`);
            $("game_button2").html(`Action B`);
            $("game_button3").html(`Action C`);

            $("#path_id").val('20');
            break;
        case 2:
            $("#game_message").html(`This is path 19 <br> You selected Action B`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('20');

        case 3:
            $("#game_message").html(`This is path 19 <br> You selected Action C`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('20');
            break;
        default:
            pathCheater();
    };
};

path20 = (button) => {

    switch (button) {
        case 1:
            $("#game_message").html(`This is path 20 <br> This is the end of the game!!!`);
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
    $("#game_message").html(message);
    $("#game_button1").html(`Play again`);
    $("#game_button2").hide();
    $("#game_button3").hide();
    $("#path_id").val('0');
};
endGame = () => {

};

