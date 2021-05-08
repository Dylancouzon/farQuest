// Get the character id from the header.
const character_id = window.location.pathname.split("/").pop();

//Game paths
game = (path, button, char_id) => {
    show();
    switch (path) {
        case 1:
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
        case 21:
            path21(button);
            break;
        case 22:
            path22(button);
            break;
        case 23:
            path23(button);
            break;
        case 24:
            path24(button);
            break;
        case 25:
            path25(button);
            break;
        case 26:
            path26(button);
            break;
        case 27:
            path27(button);
            break;
        case 28:
            path28(button);
            break;
        case 29:
            path29(button);
            break;
        case 30:
            path30(button);
            break;
        case 31:
            path31(button);
            break;
        case 32:
            path32(button);
            break;
        case 33:
            path33(button);
            break;
        case 34:
            path34(button);
            break;
        case 35:
            path35(button);
            break;
        default:
            path0(char_id);


    }
}
//Eventlistener on each button.
//Calls the right path with the button id as a parameter
$("#game_button1").click(async (event) => {
    event.preventDefault();
    nextPath(1);
});

$("#game_button2").click(async (event) => {
    event.preventDefault();
    nextPath(2);
});

$("#game_button3").click(async (event) => {
    event.preventDefault();
    nextPath(3);

});

//Generate the next path
nextPath = async (button) => {
    // Need to move that timer thing
    let path = $("#path_id").val();
    if (path == "fight") {
        await fight(button);
    } else if (path == 0) {
        show();
        game(0, 0, character_id);
    } else {
        show();
        await game(parseInt(path), button);
    }

    // Have to put the character Jinn here because actions is causing delays.
    if (character.jinn == 4) {
        clearInterval(deathTimer);
        timeLeft = 15;
        deathTimer = setInterval(() => {
            if (timeLeft == 0) {
                $('#death-timer').hide();
                return gameOver("You slowed down !");
            }
            $('#death-timer').html(`${timeLeft}s before death.`);
            timeLeft--

        }, 1000)
    }

    actions();
}

// Launch the game when loading the page (path0)
game(0, 0, character_id);


var pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
var current = 0;

var keyHandler = function (event) {

    // If the key isn't in the pattern, or isn't the current key in the pattern, reset
    if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {
        current = 0;
        return;
    }

    // Update how much of the pattern is complete
    current++;

    // If complete, alert and reset
    if (pattern.length === current) {
        current = 0;
        $("#game_message").append(`You do speak the language of the Gods !`);
        $("#game_button1").html(`Sneak in`);
        $("#game_button1").show();
    }

};

