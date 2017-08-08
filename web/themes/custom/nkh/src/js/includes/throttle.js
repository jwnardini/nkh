// A lightweight throttle Function
// https://remysharp.com/2010/07/21/throttling-function-calls

// // Resize using throttle
//  $(window).on('resize', throttle(function () {
//   console.log('resized');
// }));

module.exports = function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 100);
  var last,
    deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
      args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    }
    else {
      last = now;
      fn.apply(context, args);
    }
  };
}