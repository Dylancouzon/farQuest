character_create = async (character_class) => {

    const character_name = $("#character_name").val();

    if (character_name && character_class) {
        const response = await fetch('/api/char/create', {
            method: 'POST',
            body: JSON.stringify({ character_name, character_class }),
            headers: { 'Content-Type': 'application/json' },
        });
        let res = await response.json();
        if (response.ok) {
            //Need to figure out howt to fetch the character id 
            console.log(res);
            document.location.replace('/play/' + res.id);

        }
    } else {
        $("#character_error").html("Please enter a name.");
    }

}

generateChar = async (char_id) => {
    const response = await fetch('/api/char/generate', {
        method: 'POST',
        body: JSON.stringify({ char_id }),
        headers: { 'Content-Type': 'application/json' },
    });
    const res = await response.json();
    console.log(res);
    if (response.ok) {
        console.log(response);
        return res;
    } else {
        // alert('test');
        $("#creation-error").html(res.message);

    }
}

openChest = async () => {
    Math.floor(Math.random() * max);
}

jinn = () => {
    switch (character.class_id) {
        case 1:
            Character.jinn = 1;
            return "You Are a Class 1";
        case 2:
            Character.jinn = 1;
            return "You Are a Class 2";
        case 3:
            Character.jinn = 1;
            return "You Are a Class 2";

    }
}