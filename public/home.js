'use strict';

function handlePage () {
    handleCreateNewButton();
    submitLogListener();
    getLogResults();
    deleteLogListener();
    updateBtnListener();
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
                <li>Date: ${value.date}</li>
                <li>Description: ${value.description}</li>
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

// SUBMIT NEW RECORD

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
        headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') },
        contentType: 'application/json'
    })
    .done(() => {
        window.location.href = 'home.html';
    })
    .fail( err => {
        console.log('error: ', err.message);
    })
};

// DELETE RECORD

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
        headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') },
        contentType: 'application/json'          
    })
    .done(() => {
        window.location.href = 'home.html'; 
    })
    .fail( err => {
        console.log('error: ', err.message);
    })
};

// UPDATE RECORD

function createUpdateTemplate (record) {
    return `
        <form id="service-form">
            <label for="date">Date of Service</label>
            <input id="log-date" type="date" value="${record.date}">
            <label for="description">Describe Service</label>
            <input id="log-description" type="text" value="${record.description}">
            <label for="miles">Mileage</label>
            <input id="log-miles" type="text" value="${record.miles}">
            <label for="cost">Cost</label>
            <input id="log-cost" type="text" value="${record.cost}">
            <button class="submit-update-btn">Submit</button>
        </form>
    `
};

function updateBtnListener () {
    $(document).on('click','.record-log-update-btn', function(event) {
        let id = $(this).attr('data');
        getLog(id);
        // $('.record-log').html(createUpdateTemplate);
        // updateLog(id);
    });
};

function getLog (id) {
    $.ajax({
        url: '/api/service/post/' + id,
        type: 'GET',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') },
        contentType: 'application/json'  
    })
    .done(() => {
        $('.record-log').html(createUpdateTemplate);    
    })
    .fail( err => {
        console.log('error: ', err.message);
    })
};


function udpateLog (id) {
    let logInfo = {
        username: localStorage.getItem('username'), 
        date: $('#log-date').val(),
        description: $('#log-description').val(),
        miles: $('#log-miles').val(),
        cost: $('#log-cost').val()
    }

    $.ajax({
        url: 'api/service/posts/'+ id,
        type: 'PUT',
        data: JSON.stringify(logInfo),
        headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') },
        contentType: 'application/json'          
    })
    .done(() => {
        
    })
    .fail( err => {
        console.log('error: ', err.message);
    })
};

$(handlePage());

