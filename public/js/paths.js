var character;
let chest;
//Show all buttons
show = ()=> {
    $("#game_button1").show();
    $("#game_button2").show();
    $("#game_button3").show();
};

path0 = async (char_id) => {
    show();
    let getStats = await generateChar(char_id);
    character = new CharacterObj(getStats);
    console.log(character);
    $("#game_message").html(`Welcome ${character.name} !<br>`);
    $("h3").html(character.name);
    $("#game_button1").html(`Fight !`);
    $("#game_button2").html(`Chest route`);
    //This button will take you to the Jinn
    $("#game_button3").html(`Jinn route`);

    // Next path ID
    $("#path_id").val('1');

};

//This is the first Path. The third route will take you to
path1 = (button) => {
    
    switch (button) {
        //Button A
        case 1:
            generateFight(21, "Get ready for a Fight!", 5)
                break;
        //Button B
        case 2:
            character.stamina -= 20;
            $("#game_message").html(`
            You stumble on something, fell on a rock and lose 20hp.<br><br>
            You look more closely to the object and it is a Chest ! <br>
            Should you open it ?
            `);
            
            $("#game_button1").html(`Yes`);
            $("#game_button2").html(`No`);
            $("#game_button3").hide();

            $("#path_id").val('3');
            break;
        //Button C
        case 3:
            $("#game_message").html(`You found a Jinn in a bottle, it will grant you one wish ! <br> What do you wish for ?`);
            $("#game_button1").html(`My Biggest dream`);
            $("#game_button2").html(`Nothing`);
            $("#game_button3").hide();

            $("#path_id").val('2');
            break;
        default:
            pathCheater();
    };
};

path2 = async (button) => {
    switch (button) {
        case 1:
            var jinn = await getJinn();
            $("#game_message").html(`You wished for Eternal glory<br><br> ${jinn}`);
            $("#game_button1").html(`Ohh nooo`);
            $("#game_button2").hide();
            $("#game_button3").hide();

            $("#path_id").val('4');
            break;

        case 2:
            path4(1);
            break;

        default:
            pathCheater();
    };
};

path3 = async (button) => {
    switch (button) {
        case 1:
            chest = await openChest();
            $("#game_message").html(chest);
            $("#game_button1").html(`Continue`);
            $("#game_button2").hide();
            $("#game_button3").hide();

            $("#path_id").val('4');
            break;

        case 2:
            path4(1);
            break;
       
        default:
            pathCheater();
    };
};

path4 = (button) => {
    switch (button) {
        case 1:
            $("#game_message").html(`This is path 4 <br> You selected Action A`);
            $("game_button1").html(`Action A`);
            $("game_button2").html(`Action B`);
            $("game_button3").html(`Action C`);

            $("#path_id").val('5');
            break;
        case 2:
            $("#game_message").html(`This is path 4 <br> You selected Action B`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('5');

        case 3:
            $("#game_message").html(`This is path 4 <br> You selected Action C`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('5');
            break;
        default:
            pathCheater();
    };
};

path5 = (button) => {
    
            $("#game_message").html(`You won the fight !`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);
};

path6 = (button) => {
    switch (button) {
        case 1:
            $("#game_message").html(`This is path 6 <br> You selected Action A`);
            $("game_button1").html(`Action A`);
            $("game_button2").html(`Action B`);
            $("game_button3").html(`Action C`);

            $("#path_id").val('7');
            break;
        case 2:
            $("#game_message").html(`This is path 6 <br> You selected Action B`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('7');

        case 3:
            $("#game_message").html(`This is path 6 <br> You selected Action C`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('7');
            break;
        default:
            pathCheater();
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
};

pathCheater = () => {
    $("#game_message").html(`How did you get here ?<br> Anyway, doesn't matter.<br> You Died !`);
    $("#game_button1").hide();
    $("#game_button2").hide();
    $("#game_button3").hide();
};

endGame = () => {

};

