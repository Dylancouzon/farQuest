// Get all the characters for this user
leaderBoardAPI = async () => {
    let anti_fail = "Whatever2"
    const response = await fetch('/api/user/leaderBoard', {
        method: 'POST',
        body: JSON.stringify({ anti_fail }),
        headers: { 'Content-Type': 'application/json' },
    });
    
    const res = await response.json();
    if (response.ok) {
        
        leaderBoard(res);
    } else {
        $("#error").html(res.message);
    }
}


leaderBoard = (res) => {
    res.forEach((users) => {
        const content = `
            <li> ${users.username} -- ${users.highscore}</li>
    `
        $("#high-score-list").append(content);
    })
}

leaderBoardAPI();