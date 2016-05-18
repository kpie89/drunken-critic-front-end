// 'use strict';
//
// // user require with a reference to bundle the file and use it in this file
// // var example = require('./example');
//
// // use require without a reference to ensure a file is bundled
// require('./example');
//
// const myApp = {
//   BASE_URL: 'https://drunkencritic.herokuapp.com/',
// };
//
// $('.rating').on('submit', function(e) {
//   e.preventDefault();
//   console.log('here');
//   var formData = new FormData(e.target);
//   $.ajax({
//     url: myApp.BASE_URL + '/ratings',
//     method: 'POST',
//     contentType: false,
//     processData: false,
//     data: formData,
//   }).done(function(data) {
//     myApp.user = data.user;
//     console.log(data);
//     $('#sign-in-modal').modal('hide');
//   }).fail(function(jqxhr) {
//     console.error(jqxhr);
//   });
// });
