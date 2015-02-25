'use strict';

var fb = new Firebase('https://sirchatsalot.firebaseio.com/');

$('form').submit(function (e) {
  var $form = $(e.target),
      $nameInput = $form.find('input[name="name"]'),
      $textInput = $form.find('input[name="text"]'),
      name   = $nameInput.val(),
      text   = $textInput.val();

  $textInput.val('');

  fb.push({name: name, text: text});
  e.preventDefault();
});

fb.on('child_added', function (snap) {
  // fires onload once for every object in the collection,
  // and again for additional children being added
  var message = snap.val();

  addChatMessage(message.name, message.text);
});

function addChatMessage(name, text) {
  $('<div></div>')
    .text(text)
    .prepend(
      $('<strong></strong>').text(name + ': ')
    )
    .appendTo($('.output'));
}
