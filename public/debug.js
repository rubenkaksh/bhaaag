// ?debug shows uncaught errors on screen (phone testing without devtools).
if (location.search.indexOf('debug') >= 0) {
  var dbg = function (m) {
    var d = document.createElement('pre');
    d.style.cssText =
      'position:fixed;left:0;right:0;top:0;z-index:999;margin:0;padding:6px;background:#900;color:#fff;font:11px monospace;white-space:pre-wrap;max-height:60%;overflow:auto';
    d.textContent = m;
    (document.body || document.documentElement).appendChild(d);
  };
  window.addEventListener('error', function (e) {
    dbg('ERR ' + e.message + ' @' + (e.filename || '').split('/').pop() + ':' + e.lineno);
  });
  window.addEventListener('unhandledrejection', function (e) {
    dbg('REJ ' + ((e.reason && e.reason.stack) || e.reason));
  });
}
