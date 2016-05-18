// 'use strict';
//
// const rating = require('./display-random-beer.js');
//
// const myApp = {
//   BASE_URL: 'https://drunkencritic.herokuapp.com/',
// };
//
// // sign-in
//   let signIn = function(e) {
//     e.preventDefault();
//     console.log('here');
//     let formData = new FormData(e.target);
//     $.ajax({
//       url: myApp.BASE_URL + '/sign-in',
//       method: 'POST',
//       contentType: false,
//       processData: false,
//       data: formData,
//     }).done(function(data) {
//       myApp.user = data.user;
//       console.log(data);
//       $('#sign-in-modal').modal('hide');
//       $('.sign-up').hide();
//       $('.random').show();
//       $('.home-page').hide();
//       $('.account').show();
//       rating.rating();
//
//     }).fail(function(jqxhr) {
//       console.error(jqxhr);
//     });
//   };
//
//   $('#sign-in').on('submit', function(e) {
//     e.preventDefault();
//     signIn(e);
//   });
//
//   module.exports = {
//     signIn
//   };
