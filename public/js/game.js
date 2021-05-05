const Paths = require("./paths");
// Ask to add <input type="hidden" id="path_id" name="path_id" value="">
// <script src="js/paths.js"></script>
// id="startgame" data-character_id="ID" Attributes to the Choose character buttons


game = (path, button, char_id) => {
    switch (path) {
        case 1:
            Paths.path1(button);
            break;
        case 2:
            Paths.path2(button);
            break;
        case 3:
            Paths.path3(button);
            break;
        case 4:
            Paths.path4(button);
            break;
        case 5:
            Paths.path5(button);
            break;
        case 6:
            Paths.path6(button);
            break;
        case 7:
            Paths.path7(button);
            break;
        case 8:
            Paths.path8(button);
            break;
        case 9:
            Paths.path9(button);
            break;
        case 10:
            Paths.path10(button);
            break;
        case 11:
            Paths.path11(button);
            break;
        case 12:
            Paths.path12(button);
            break;
        case 13:
            Paths.path13(button);
            break;
        case 14:
            Paths.path14(button);
            break;
        case 15:
            Paths.path15(button);
            break;
        case 16:
            Paths.path16(button);
            break;
        case 17:
            Paths.path17(button);
            break;
        case 18:
            Paths.path18(button);
            break;
        case 19:
            Paths.path19(button);
            break;
        case 20:
            Paths.path20(button);
            break;
        default:
            Paths.path0(button, char_id);


    }
}

$("#button1").click(function (event) {
    event.preventDefault();
    const id = $("#path_id").val();
    game(id, 1)
});

$("#button2").click(function (event) {
    event.preventDefault();
    const id = $("#path_id").val();
    game(id, 2)
});

$("#button3").click(function (event) {
    event.preventDefault();
    const id = $("#path_id").val();
    game(id, 3)
});


$("#startgame").click(function (event) {
    event.preventDefault();
    const character_id = $("#startgame").data("character_id");
    game(0, 0, character_id);
});
