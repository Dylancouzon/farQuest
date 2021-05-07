// Get all the characters for this user
generateCharAPI = async () => {
    let anti_fail = "Whatever"
    const response = await fetch('/api/char/profile', {
        method: 'POST',
        body: JSON.stringify({ anti_fail }),
        headers: { 'Content-Type': 'application/json' },
    });
    const res = await response.json();
    if (response.ok) {
        generateChar(res);
    } else {
        $("#creation-error").html(res.message);
    }
}


generateChar = (res) => {
    res.forEach((character) => {
        const content = `
            <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                <a href="#" onclick="startGame(${character.id});">
                    <div class="card-flyer">
                        <div class="text-box">
                            <div class="image-box">
                                <img src="/images/${character.class_id}.jpeg"
                                    alt="${character.name}" />
                            </div>
                            <div class="text-container">
                                <h6>${character.name}</h6>
                                <p></p>
                            </div>
                        </div>
                        <button class="button" id="delete-button" onclick="character_destroy(${character.id});">DELETE</button>
                    </div>
                </a>
            </div>
    `
        $("#profileContent").append(content);
    })
 if(res.length > 3){
    $("#new-char-button").hide();
 }
}

//Says event is depricated but works anyway so ¯\_(ツ)_/¯.
startGame = (char_id) => {
    event.stopPropagation();
    document.location.replace('/play/' + char_id);
}

//Says event is depricated but works anyway so ¯\_(ツ)_/¯.
character_destroy = async (character_id) => {
    event.stopPropagation();
    if (character_id) {
        const response = await fetch('/api/char/destroy', {
            // Delete works but stop the execution of the script after it for some reason...
            method: 'POST',
            body: JSON.stringify({ character_id }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/');
            
        } $("#character_error").html("Please try again.");
    } else {
        $("#error").html("Wtf ?");
    }

}

generateCharAPI();