'use strict';

function handlePage () {
    handleCreateNewButton();
    submitLogListener();
    // getLogResults();
};

// LANDING PAGE

// function getLogResults () {
//     let token = localStorage.getItem('token');
//     $.ajax({
//         url: '/api/service/posts',
//         type: 'GET',
//         headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') },
//         contentType: 'application/json'  
//     })
//     displayResults();
// };

// function displayResults (info) {
//     $.each(info, function(index, value) {
//         let html = `
//             <h3>${value.miles}</h3>
//         `
//         $('.record-log').append(html);
//     })
// };

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
        date: $('#log-date').val(),
        description: $('#log-description').val(),
        miles: $('#log-miles').val(),
        cost: $('#log-cost').val()
    }
    console.log(logInfo);
    $.ajax({
        url: 'api/service/posts',
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

$(handlePage());

