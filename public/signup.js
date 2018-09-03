'use strict';

// SIGNUP

function signupListener () {
    $('#signup-submit-btn').click(function(event) {
        event.preventDefault();
        signup();
    });
};

function signup() {
    let signupInfo = {
        username = $('#signup-username').val(),
        password = $('#signup-password').val(),
        year = $('#signup-year').val(),
        make = $('#signup-make').val(),
        model = $('#signup-model').val()
    }
    $.ajax({
        url: '/api/users',
        type: 'POST',
        data: JSON.stringify(signupInfo),
        contentType: 'application/json'
    })
};
