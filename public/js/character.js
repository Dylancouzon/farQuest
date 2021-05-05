character_create = () => {
    const character_name = $("#character_name").val();
    const character_class = $("#character_create").data("character_class");
    if (character_name && character_class) {
        const response = await fetch('/api/char/create', {
            method: 'POST',
            body: JSON.stringify({ character_name, character_class }),
            headers: { 'Content-Type': 'application/json' },
        });
        let res = await response.json();
        if (response.ok) {
            document.location.replace('/comment/' + res.post_id);

        }
    } else {
        $("#character_error").html("Please enter a name & Select a class");
    }

}

$("#character_create").click(function (event) {
    event.preventDefault();
    character_create()
});
