// Require the APIS
// Import the constructor Objects here 
// Generate the character

module.exports = {
    path0() {
        $("#message").html(`Welcome adventurer !<br>`);

        $("#button1").html(`Action A`);
        $("#button2").html(`Action B`);
        $("#button3").html(`Action C`);


        $("#pathId").val('1');
    },

    path1(button) {
        switch (button) {
            case 1:
                $("#message").html(`This is path 1 <br> You selected Action A`);
                $("#button1").html(`Action A`);
                $("#button2").html(`Action B`);
                $("#button3").html(`Action C`);


                $("#pathId").val('2');
                break;
            case 2:
                $("#message").html(`This is path 1 <br> You selected Action B`);
                $("#button1").html(`Action A`);
                $("#button2").html(`Action B`);
                $("#button3").html(`Action C`);


                $("#pathId").val('2');
                break;
            case 3:
                $("#message").html(`This is path 1 <br> You selected Action C`);
                $("#button1").html(`Action A`);
                $("#button2").html(`Action B`);
                $("#button3").html(`Action C`);


                $("#pathId").val('2');
                break;
            default:
                pathCheater();
        };
    },

    path2(button) {
        $("#message").html(`You have reached path 2!`);
        $("#pathId").val('3');
    },

    path3(button) {

    },

    path4(button) {

    },

    path5(button) {

    },

    path6(button) {

    },

    path7(button) {

    },

    path8(button) {

    },

    path9(button) {

    },

    path10(button) {

    },

    path11(button) {

    },

    path12(button) {

    },

    path13(button) {

    },

    path14(button) {

    },

    path15(button) {

    },

    path16(button) {

    },

    path17(button) {

    },

    path18(button) {

    },

    path19(button) {

    },

    path20(button) {

    }
}