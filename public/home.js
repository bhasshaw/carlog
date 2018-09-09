'use strict';

function handlePage () {
    handleCreateNewButton();
    handleSubmitLog();
};

// CREATE NEW RECORD

function handleCreateNewButton () {
    createNewBtnListener();
};

function createNewBtnTemplate () {
    return `
        <form id="service-form">
            <label for="date">Date of Service</label>
            <input id="log-date" type="text">
            <label for="miles">Milage</label>
            <input id="log-miles" type="text">
            <label for="cost">Cost</label>
            <input id="log-cost" type="text">
            <label for="description">Desribe Service</label>
            <input id="log-description" type="text">
            <button id="service-form-btn">Submit</button>
        </form>
    `
};

function createNewBtnListener () {
    $('#create-new-btn').click(function(event) {
        event.preventDefault();
        $('.record-log').html(createNewBtnTemplate);
    });
};

// SUBMIT LOG

function handleSubmitLog () {
    submitLogListener();
};

function submitLogListener () {
    $('#service-form-btn').click(function(event) {
        event.preventDefault();
        submitLog();
    });
};

function submitLog () {
    let logInfo = {
        date: $('#log-date').val(),
        miles: $('#log-miles').val(),
        cost: $('#log-cost').val(),
        descripton: $('#log-description').val()
    }
    $.ajax({
        url: '/api/service/posts',
        type: 'POST',
        data: JSON.stringify(logInfo),
        contentType: 'application/json'
        // STILL NOT WORKING
    })
};

$(handlePage());

