var character;

path0 = async (char_id) => {

    let getStats = await generateChar(char_id);
    character = new CharacterObj(getStats);
        console.log(character);
        $("#game_message").html(`Welcome ${character.name} !<br>`);

        $("#game_button1").html(`Action A`);
        $("#game_button2").html(`Action B`);
        //This button will take you to the Jinn
        $("#game_button3").html(`Jinn route`);


        $("#path_id").val('1');

};

//This is the first Path. The third route will take you to
path1 = (button) => {
    switch (button) {
        case 1:
            $("#game_message").html(`This is path 1 <br> You selected Action A`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);

            $("#path_id").val('3');
            break;
        case 2:
            $("#game_message").html(`This is path 1 <br> You selected Action B`);
            $("#game_button1").html(`Lol`);
            $("#game_button2").html(`That worked`);
            $("#game_button3").html(`Never believed in you`);


            $("#path_id").val('3');
            break;
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

path2 = (button) => {
    switch (button) {
        case 1:
            $("#game_message").html(`asdsd`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);


            $("#path_id").val('2');
            break;
        case 2:
            $("#game_button3").show();
            path3(1);

            break;
        default:
            pathCheater();
    };
};

path3 = (button) => {
    switch (button) {
        case 1:
            $("#game_message").html(`This is path 3 <br> You selected Action A`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);


            $("#path_id").val('4');
            break;
        case 2:
            $("#game_message").html(`This is path 3 <br> You selected Action B`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);


            $("#path_id").val('4');
            break;
        case 3:
            $("#game_message").html(`This is path 3 <br> You selected Action C`);
            $("#game_button1").html(`Action A`);
            $("#game_button2").html(`Action B`);
            $("#game_button3").html(`Action C`);


            $("#path_id").val('4');
            break;
        default:
            pathCheater();
    };
};

path4 = (button) => {
    $("#game_message").html(`This is path 4`);
};

path5 = (button) => {

};

path6 = (button) => {

};

path7 = (button) => {

};

path8 = (button) => {

};

path9 = (button) => {

};

path10 = (button) => {

};

path11 = (button) => {

};

path12 = (button) => {

};

path13 = (button) => {

};

path14 = (button) => {

};

path15 = (button) => {

};

path16 = (button) => {

};

path17 = (button) => {

};

path18 = (button) => {

};

path19 = (button) => {

};

path20 = (button) => {

};
pathCheater = () => {
    $("#game_message").html(`How did you get here ?<br> Anyway, doesn't matter.<br> You Died !`);
};