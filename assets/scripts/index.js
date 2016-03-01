'use strict';

// user require with a reference to bundle the file and use it in this file
// let example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');
// const beerButton = require('./display-random-beer.js');
// const signIn = require('./sign-in.js');
// const signUp = require('./sign-up.js');
// const changePassword = require('./change-password.js');
// const signOut = require('./sign-out.js');
// const rateBeer = require('./create-rating.js');
// const showBeer = require('./display-rating.js');
// const editBeer = require('./update-rating.js');
// const beerSearch = require('./search-beer.js');

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
  $('.account').hide();

//   beerButton.displayRandomBeer();
//   signUp.signUp();
//   signIn.signIn();
//   changePassword.changePassword();
//   signOut.signOut();
//   rateBeer.createRating();
//   showBeer.displayRatings();
//   editBeer.updateRating();
//   beerSearch.searchBeer();
// });




// Display random beer
  let displayRandomBeer = function(response) {
    let beer = response.beer;
    let abv = response.abv;
    let style = response.style;
    let brewery = response.brewery;
    console.log('here');
    let beerListing = require('./beer_listing.handlebars');
    console.log(beer);
    beerData.beer = response.beer;
    console.log(beerData.beer);
    console.log(beer.id);

      $('.random-beer').prepend(beerListing({
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
      displayRandomBeer(beer);
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
      $('.account').show();
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
     $('.account').hide();
     $('.home-page').show();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

  //create rating
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
      // $('.rating-listing').empty();
      rating();
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
    // $('.rating-listing').empty();
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
// $('.rating').on('submit', function(e){
//   e.preventDefault();
//   rating();
//  });

// update rating
  $('.rating-listing').on('click', '.edit-rating', function(e) {
  myApp.id = $(e.target).attr("data-edit-id");
  console.log(myApp.id);

  $('#update-rating-modal').on('submit', function(e) {
  e.preventDefault(e);
  if (!myApp.user) {
    console.error('Wrong!');
    return;
  }

  let formData = new FormData(e.target);
  $.ajax({
    url: myApp.BASE_URL + '/ratings/' + myApp.id,
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
    $('.rating-listing').empty();
    rating();
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
});
});

// delete rating
$('.rating-listing').on('click', '.delete', function(e) {
  e.preventDefault();
  myApp.id = $(e.target).attr("data-id");
  console.log(myApp.id);
  if (!myApp.user) {
    console.error('Wrong!');
    return;
  }

  $.ajax({
    url: myApp.BASE_URL + '/ratings/' + myApp.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
  }).done(function() {
   console.log('deleted post');
  //  $('#delete-button').off('click', '**');
     e.preventDefault();
     console.log(myApp.rating.id);
   $('.rating-listing').empty('');
   rating();
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
});




// search beers
let searchResults = function (response){
  let beer = response.beer;
  let abv = response.abv;
  let style = response.style;
  let brewery = response.brewery;
  console.log('here');
  let beerListing = require('./beer_listing.handlebars');
  console.log(beer);
  beerData.beer = response.beer;
  console.log(beerData.beer);
  console.log(beer.id);

    $('.search-results').append(beerListing({
       beer,
       abv,
       style,
       brewery

     }));
};


  let searchBeer = function(){$.ajax({
    url: myApp.BASE_URL + '/beer?search_key=' + $('#search-bar').val().toLowerCase().replace(' ',''),
    method: 'GET',
    dataType: 'json'
  }).done(function(beer){
    console.log(beer);
    $('.search').empty();
    searchResults(beer);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};
$('.search-it').on('click', function(e) {
e.preventDefault();
searchBeer();
$('.rate-beer-search').on('click', function(e){
  e.preventDefault();
  $('.rating').show();
  $('.search-results').html('');
});
$('.try-again-search').on('click', function(e) {
  e.preventDefault();
  $('.search-results').html('');
});

  });
});
