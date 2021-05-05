const character_id = window.location.pathname.split("/").pop();

game = (path, button, char_id) => {
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

game(0, 0, character_id);
// $("#startgame").click(function (event) {
//     event.preventDefault();
//     const character_class = $("#startgame").data("character_class");
//     const character_name = $("#name").val();
//     game(0, 0, character_id, character_name);
// });
