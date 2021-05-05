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
            //Need to figure out the character id 
            console.log(res);
            document.location.replace('/play/1');

        }
    } else {
        $("#character_error").html("Please enter a name & Select a class");
    }

}
