var supportsOnbeforeunload = (function () {

  var frame = document.createElement("iframe"), support;

  // trigger on(before)unload event/s in test iframe
  function navigate(f) { f.src = "test.html"; }

  // test iframe loaded, load it again
  function loaded() {
    var f = this;
    f.onload = reloaded;
    navigate(f);
  }

  // test iframe loaded again, clean up
  function reloaded() {
    var f = this;
    f.onload = null;
    f.parentNode.removeChild(f);
  }

  // prepare invisible test page iframe
  frame.width = frame.height = 0;
  frame.style.display = "none";
  frame.onload = loaded;

  // lazy evaluation, callback invoked with result
  function check(cb) {
    // if we already know, just invoke callback
    if ("boolean" == typeof support) { return void cb(support); }
    // not sure yet, kick in iframe
    document.body.appendChild(frame);
    navigate(frame);
    // iframe can register support only once
    check.register = function (flag) {
      check.register = function () {};
      cb(support = flag);
    };
  }

  return check;

}());
