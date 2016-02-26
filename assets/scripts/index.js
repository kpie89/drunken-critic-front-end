'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');

const myApp = {
  BASE_URL: 'http://localhost:3000',
};

$(document).ready(() => {
  console.log('here');
  $('#sign-up').on('submit', function(e) {
    e.preventDefault();
    console.log('here');
    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.BASE_URL + '/sign-up',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      $('#sign-up-modal').modal('hide');
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

  $('#sign-in').on('submit', function(e) {
    e.preventDefault();
    console.log('here');
    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.BASE_URL + '/sign-in',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      myApp.user = data.user;
      console.log(data);
      $('#sign-in-modal').modal('hide');
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

  $('#change-password').on('submit', function(e) {
    e.preventDefault();
    if (!myApp.user) {
      console.error('Wrong!');
      return;
    }


    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.BASE_URL + '/change-password/' + myApp.user.id,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      $('#change-password-modal').modal('hide');
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

  $('#sign-out-button').on('click', function(e) {
    e.preventDefault();
    if (!myApp.user) {
      console.error('Wrong!');
      return;
    }

    $.ajax({
      url: myApp.BASE_URL + '/sign-out/' + myApp.user.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
    }).done(function() {
     console.log('You have logged out');
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });
});
