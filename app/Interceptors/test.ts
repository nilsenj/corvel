import { Service } from 'typedi';
let interceptor  = require('express-interceptor');
let cheerio     = require('cheerio');

export  const TestInterceptor = interceptor(
function(req, res) {
  return {
    // Only HTML responses will be intercepted 
    isInterceptable: function(){
      return /text\/html/.test(res.get('Content-Type'));
    },
    // Appends a paragraph at the end of the response body 
    intercept: function(body, send) {
      var $document = cheerio.load(body);
      $document('body').append('<p>From Test interceptor!</p>');
 
      send($document.html());
    }
  };
})
