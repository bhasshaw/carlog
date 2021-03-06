'use strict';

function handlePage () {
    handleCreateNewButton();
    homeBtnListener();
    submitLogListener();
    getLogResults();
    getCarResults();
    deleteLogListener();
    updateBtnListener();
    updateLogListener();
};

// LANDING PAGE

function getCarResults () {
    $.ajax({
        url: '/api/users/' + localStorage.getItem('username'),
        type: 'GET',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') },
        contentType: 'application/json'  
    })
    .done(response => {
        displayCarInfo(response)
    })
};

function displayCarInfo (car) {
    $('#year').text(car[0].year);
    $('#make').text(car[0].make);
    $('#model').text(car[0].model);
}

function getLogResults () {
    $.ajax({
        url: '/api/service/posts/' + localStorage.getItem('username'),
        type: 'GET',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') },
        contentType: 'application/json'  
    })
    .done(response => {
        displayResults(response)
    })
    .fail( err => {
        console.log('Error: ', err.message);
    })
};

function displayResults (info) {
    let total = 0;
    $.each(info, function(index, value) {
        total += value.cost;
        let html = `
            <div class="record-log-list">
                <div>
                    <h3>Description</h3>
                    <p>${value.description}</p>
                    <h3>Date</h3>
                    <p>${value.date}</p>
                    <h3>Mileage</h3>
                    <p>${value.miles}</p>                        
                    <h3>Cost</h3>
                    <p>$${value.cost}</p>
                </div>
                <button data="${value.id}" class="record-log-update-btn">Update</button>
                <button data="${value.id}" class="record-log-delete-btn">Delete</button>
            <div>
        `
        $('.record-log').append(html);
    })
    $('#service-total').html(total);
};

// CREATE NEW RECORD

function handleCreateNewButton () {
    createNewBtnListener();
};

function createNewBtnTemplate () {
    return `
        <form role="form" class="service-form">
            <label for="date">Date of Service</label>
            <input class="log-date" type="date">
            <label for="description">Describe Service</label>
            <input class="log-description" type="text">
            <label for="miles">Mileage</label>
            <input class="log-miles" type="text">
            <label for="cost">Cost</label>
            <input class="log-cost" type="text">
            <button class="service-form-btn" type="submit">Submit</button>
        </form>
    `
};

function createNewBtnListener () {
    $('.create-new-btn').click(function(event) {
        event.preventDefault();
        $('.record-log').html(createNewBtnTemplate);
    });
};

// HOME BUTTON

function homeBtnListener () {
    $('.home-btn').click(function(event) {
        window.location.href = 'home.html';
    });
};

// SUBMIT NEW RECORD

function submitLogListener () {
    $(document).on('submit','.service-form', function(event) {
        event.preventDefault();
        submitLog();
    });
};

function submitLog () {
    let logInfo = {
        username: localStorage.getItem('username'), 
        date: $('.log-date').val(),
        description: $('.log-description').val(),
        miles: $('.log-miles').val(),
        cost: $('.log-cost').val()
    }
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
        console.log('Error: ', err.message);
    })
};

// DELETE RECORD

function deleteLogListener () {
    $(document).on('click', '.record-log-delete-btn', function() {
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
        console.log('Error: ', err.message);
    })
};

// UPDATE RECORD

function createUpdateTemplate (value) {
    return `
        <form role="form" class="update-form">
            <label for="date">Date of Service</label>
            <input class="log-date" type="text" value="${value.date}">
            <label for="description">Describe Service</label>
            <input class="log-description" type="text" value="${value.description}">
            <label for="miles">Mileage</label>
            <input class="log-miles" type="text" value="${value.miles}">
            <label for="cost">Cost</label>
            <input class="log-cost" type="text" value="${value.cost}">
            <button data="${value.id}" class="submit-update-btn" type="submit">Submit</button>
        </form>
    `
};

function updateBtnListener () {
    $(document).on('click','.record-log-update-btn', function() {
        let id = $(this).attr('data');
        getLog(id);
    });
};

function getLog (id) {
    $.ajax({
        url: '/api/service/post/' + id,
        type: 'GET',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') },
        contentType: 'application/json'  
    })
    .done( value => {
        $('.record-log').html(createUpdateTemplate(value));
    })
    .fail( err => {
        console.log('Error: ', err.message);
    })
};

function updateLogListener () {
    $(document).on('submit','.update-form', function(event) {
        event.preventDefault();
        let id = $('.submit-update-btn').attr('data');
        updateLog(id);
    });
};


function updateLog (id) {
    let logInfo = {
        username: localStorage.getItem('username'), 
        date: $('.log-date').val(),
        description: $('.log-description').val(),
        miles: $('.log-miles').val(),
        cost: $('.log-cost').val()
    }
    $.ajax({
        url: 'api/service/posts/' + id,
        type: 'PUT',
        data: JSON.stringify(logInfo),
        headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') },
        contentType: 'application/json'          
    })
    .done(() => {
        window.location.href = 'home.html';
    })
    .fail( err => {
        console.log('Error: ', err.message);
    })
};

$(handlePage());

