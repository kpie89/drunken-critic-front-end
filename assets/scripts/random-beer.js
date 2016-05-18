// 'use strict';
//
// // user require with a reference to bundle the file and use it in this file
// // var example = require('./example');
//
// // use require without a reference to ensure a file is bundled
// require('./example');
//
// const myApp = {
//   BASE_URL: 'http://localhost:3000',
// };
//
// $(document).ready(() => {
//   let displayBeer = function(response) {
//     let beer = response.beer;
//     console.log('here');
//     let beerListing = require('./beer_listing.handlebars');
//     console.log(beer);
//       $('.content').append(beerListing({
//          beer
//        }));
//   };
//
//   let randomBeer = function(){
//     $.ajax({
//       url: myApp.BASE_URL + '/beer/random',
//       method: 'GET',
//       dataType: 'json'
//     }).done(function(beer){
//       console.log(beer);
//       displayBeer(beer);
//     });
//   };
//   $('.random').on('click', randomBeer());
//   $('.rate-beer').modal('hide');
// });
