var count = 1;
var id;
var socket = io();
socket.on('emitted event', function(msg) {
  if (/x-20/.test(msg)) id = 1;
  if (/x-50/.test(msg)) id = 2;
  if (/imp/.test(msg)) id = 3;
  $('#qr-code-img-'+id).hide();
  $('#text-op-'+id).show();
});

$(document).ready(function() {
  $('button#qr-button').click(function() {
    $('button#qr-button').hide();
    $('#qr-code-img-'+count).show();
    count++;
    if (count > 3) count = 1;
  });

  $('button.ok-button').click(function() {
    $('#text-op-'+id).hide();
    $('button#qr-button').show();
  });
});
