// Ask to add <input type="hidden" id="path_id" name="path_id" value="">
// id="startgame" data-character_id="ID" Attributes to the Choose character buttons
// Import the models & auth function using path
var character;
path0 = async (char_id) => {
    
    character = await generateChar(char_id);
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

generateChar = async (char_id) =>{
        const response = await fetch('/api/char/generate', {
            method: 'POST',
            body: JSON.stringify({ char_id }),
            headers: { 'Content-Type': 'application/json' },
        });
        const res = await response.json();
        if (response.ok) {
            // console.log(res.getStats());
            return res;
        } else {
            // alert('test');
            $("#creation-error").html(res.message);

        }
}


game = (path, button, char_id) => {
    
    switch (path) {
        case 1:
            console.log(path);
            path1(button);
            break;
        case 2:
            path2(button);
            break;
        case 3:
            path3(button);
            break;
        case 4:
            path4(button);
            break;
        case 5:
            path5(button);
            break;
        case 6:
            path6(button);
            break;
        case 7:
            path7(button);
            break;
        case 8:
            path8(button);
            break;
        case 9:
            path9(button);
            break;
        case 10:
            path10(button);
            break;
        case 11:
            path11(button);
            break;
        case 12:
            path12(button);
            break;
        case 13:
            path13(button);
            break;
        case 14:
            path14(button);
            break;
        case 15:
            path15(button);
            break;
        case 16:
            path16(button);
            break;
        case 17:
            path17(button);
            break;
        case 18:
            path18(button);
            break;
        case 19:
            path19(button);
            break;
        case 20:
            path20(button);
            break;
        default:
            path0(char_id);


    }
}

$("#game_button1").click(function (event) {
    event.preventDefault();
    let path = $("#path_id").val();
    game(parseInt(path), 1)
});

$("#game_button2").click(function (event) {
    event.preventDefault();
    let path = $("#path_id").val();
    game(parseInt(path), 2)
});

$("#game_button3").click(function (event) {
    event.preventDefault();
    let path = $("#path_id").val();
    game(parseInt(path), 3)
});

game(0, 0, 1);
// $("#startgame").click(function (event) {
//     event.preventDefault();
//     const character_class = $("#startgame").data("character_class");
//     const character_name = $("#name").val();
//     game(0, 0, character_id, character_name);
// });
