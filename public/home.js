'use strict';

function handlePage () {
    handleCreateNewButton();
    submitLogListener();
    getLogResults();
    deleteLogListener();
};

// LANDING PAGE

function getLogResults (username) {
    $.ajax({
        url: '/api/service/posts/' + localStorage.getItem('username'),
        type: 'GET',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') },
        contentType: 'application/json'  
    })
    .done(response => {
        displayResults(response)
    })
};

function displayResults (info) {
    $.each(info, function(index, value) {
        let html = `
            <ul class="record-log-list">
                <li>Description: ${value.description}</li>
                <li>Date: ${value.date}</li>
                <li>Miles: ${value.miles}</li>
                <li>Cost: $${value.cost}</li>
                <button data="${value.id}" class="record-log-update-btn">Update</button><button data="${value.id}" class="record-log-delete-btn">Delete</button>
            </ul>
        `
        $('.record-log').append(html);
    })
};

// CREATE NEW RECORD

function handleCreateNewButton () {
    createNewBtnListener();
};

function createNewBtnTemplate () {
    return `
        <form id="service-form">
            <label for="date">Date of Service</label>
            <input id="log-date" type="date">
            <label for="description">Describe Service</label>
            <input id="log-description" type="text">
            <label for="miles">Mileage</label>
            <input id="log-miles" type="text">
            <label for="cost">Cost</label>
            <input id="log-cost" type="text">
            <button id="service-form-btn" type="submit">Submit</button>
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

function submitLogListener () {
    $(document).on('submit','#service-form', function(event) {
        event.preventDefault();
        submitLog();
    });
};

function submitLog () {
    let logInfo = {
        username: localStorage.getItem('username'), 
        date: $('#log-date').val(),
        description: $('#log-description').val(),
        miles: $('#log-miles').val(),
        cost: $('#log-cost').val()
    }
    console.log(logInfo);
    $.ajax({
        url: 'api/service/posts/',
        type: 'POST',
        data: JSON.stringify(logInfo),
        contentType: 'application/json'
    })
    .done(() => {
        window.location.href = 'home.html';
    })
    .fail( err => {
        console.log('error: ', err.message);
    })
};

function deleteLogListener () {
    $(document).on('click','.record-log-delete-btn', function(event) {
        let id = $(this).attr('data');
        deleteLog(id);
    });
};

function deleteLog (id) {
    $.ajax({
        url: 'api/service/posts/' + id,
        type: 'DELETE',
        contentType: 'application/json'          
    })
    .done(() => {
        window.location.href = 'home.html'; 
    })
    .fail( err => {
        console.log('error: ', err.message);
    })
};

$(handlePage());

