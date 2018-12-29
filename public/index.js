'use strict';

function handleLogIn () {
    logInListener();
};

function logInListener () {
    $('.login-submit-btn').click(function(event) {
        event.preventDefault();
        logIn();
    });
};

function logIn () {
    let username = $('.login-username').val();
    let password = $('.login-password').val();
    logInRequest(username, password);
};

function logInRequest (username, password) {
    let logInInfo = {
        username,
        password
    };
    $.ajax({
        url: '/api/auth/login',
        type: 'POST',
        data: JSON.stringify(logInInfo),
        contentType: 'application/json'
    })
    .done(token => {
        localStorage.setItem('authToken', token.authToken);
        localStorage.setItem('username', username);
        window.location.href = 'home.html';
    })
    .fail(function(err) {
        if (err.status === 401) {
            $('.login-error').html('Username or password was incorrect.');
        }
    })
};

$(handleLogIn());

