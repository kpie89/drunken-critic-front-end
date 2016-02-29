'use strict';

// user require with a reference to bundle the file and use it in this file
// let example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');

const myApp = {
  BASE_URL: 'http://localhost:3000',
};

const beerData = {
  BASE_URL: 'http://localhost:3000',
};

$(document).ready(() => {

  $('.rating').hide();
  $('.random').hide();
  $('.rating-listing').html('');

// Display random beer
  let displayBeer = function(response) {
    let beer = response.beer;
    let abv = response.abv;
    let style = response.style;
    let brewery = response.brewery;
    console.log('here');
    let beerListing = require('./beer_listing.handlebars');
    console.log(beer);
    beerData.beer = response.key;
    console.log(beerData.beer);
    console.log(beer.id);

      $('.random-beer').append(beerListing({
         beer,
         abv,
         style,
         brewery

       }));
  };

  let randomBeer = function(){
    $.ajax({
      url: myApp.BASE_URL + '/beer/rand',
      method: 'GET',
      dataType: 'json'
    }).done(function(beer){
      console.log(beer);
      displayBeer(beer);
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  };
  $('.random').on('click', function(e){
    e.preventDefault();
    randomBeer();
  });
  $('.rate-beer').on('click', function(e){
    e.preventDefault();
    $('.rating').show();
    $('.random-beer').html('');
  });
  $('.try-again').on('click', function(e) {
    e.preventDefault();
    $('.random-beer').html('');
  });

// sign-up
  $('#sign-up').on('submit', function(e) {
    e.preventDefault();
    console.log('here');
    let formData = new FormData(e.target);
    $.ajax({
      url: myApp.BASE_URL + '/sign-up',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      $('#sign-up-modal').modal('hide');
      $('.sign-up').hide();
      $('.sign-in').hide();
      $('.random').show();
      $('.home-page').hide();
      signIn(e);
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });


// sign-in
  let signIn = function(e) {
    e.preventDefault();
    console.log('here');
    let formData = new FormData(e.target);
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
      $('.sign-up').hide();
      $('.random').show();
      $('.home-page').hide();
      rating();

    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  };

  $('#sign-in').on('submit', function(e) {
    e.preventDefault();
    signIn(e);
  });

// change-password
  $('#change-password').on('submit', function(e) {
    e.preventDefault();
    if (!myApp.user) {
      console.error('Wrong!');
      return;
    }

    let formData = new FormData(e.target);
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

// sign-out
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
     $('.rating').hide();
     $('.random').hide();
     $('.sign-up').show();
     $('.sign-in').show();

    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

  // create rating
  $('.rating').on('submit', function(e) {
    e.preventDefault();
    console.log('here');
    let formData = new FormData(e.target);

    formData.append('rating[beer_id]', beerData.beer);

    $.ajax({
      url: myApp.BASE_URL + '/ratings',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      myApp.rating = data.rating;
      console.log(data);
      console.log(myApp.rating.id);
      console.log(beerData.beer);
      $('.rating').hide();

    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

// display rating
let displayRatings = function(response) {
  let rating = response.ratings;
  console.log('here');
  let ratingListing = require('./rating-listing.handlebars');
  console.log(rating);
  console.log();
    $('.rating-listing').append(ratingListing({
       rating
     }));
};

let rating = function(){
  $.ajax({
    url: myApp.BASE_URL + '/ratings',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    dataType: 'json'
  }).done(function(rating){
    console.log(rating);
    console.log(myApp.user);
    displayRatings(rating);
  });
};
$('.rating').on('submit', function(e){
  e.preventDefault();
  rating();
 });

// update rating
$('#update-rating').on('submit', function(e) {
  e.preventDefault();
  if (!myApp.user) {
    console.error('Wrong!');
    return;
  }

  let formData = new FormData(e.target);
  $.ajax({
    url: myApp.BASE_URL + '/ratings/' + myApp.rating.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(data) {
    console.log(data);
    $('#update-rating-modal').modal('hide');
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
});

// delete rating
$('#delete-button').on('click', function(e) {
  e.preventDefault();
  if (!myApp.user) {
    console.error('Wrong!');
    return;
  }

  $.ajax({
    url: myApp.BASE_URL + '/ratings/' + myApp.rating.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
  }).done(function() {
   console.log(myApp.rating);
   console.log('deleted post');
   rating();
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
});
});
