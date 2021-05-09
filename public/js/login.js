//Login API Call
login = async () => {

    const username = $("#username-input").val();
    const password = $("#password-input").val();
    if (username && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        const res = await response.json();
        if (response.ok) {
            document.location.replace('/');
            
        } else {
            $("#login-error").html(res.message);

        }
    } else {
        $("#login-error").html(res.message);
    }
}

//Sign Up API call
signup = async () => {

    const username = $("#username-input").val();
    const password = $("#password-input").val();

    if (username && password) {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        const res = await response.json();
        if (response.ok) {
            document.location.replace('/');
        } else {
            $("#login-error").html(res.message);

        }
    } else {
        $("#login-error").html("All fields required");
    }
}


$("#login-button").click(function (event) {
    event.preventDefault();
    login()
});

$("#signup-button").click(function (event) {
    event.preventDefault();
    signup()
});