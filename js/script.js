var setFrameUrl = function(url) {
  if (!url || url == 'undefined') return;
  if (!url.match('^https?://')) {
    url = 'http://' + url;
  }
  $('#url').val(url);
  $('#frame').attr('src',url);
};

var rotate = function() {
  $('#ipad').toggleClass('landscape').toggleClass('portrait');
  $('#iphone').toggleClass('landscape').toggleClass('portrait');
  $('#iphone5').toggleClass('landscape').toggleClass('portrait');
}

$(function(){

setFrameUrl($.url.param('url'));
if ($.url.param('portrait')) rotate();

$('#rotate').click(rotate);

$('#to_ipad').click(function(){
  $('#iphone').attr('id','ipad');
  $('#iphone5').attr('id','ipad');
});

$('#to_iphone').click(function(){
  $('#ipad').attr('id','iphone');
  $('#iphone5').attr('id','iphone');
});

$('#to_iphone5').click(function(){
  $('#ipad').attr('id','iphone5');
  $('#iphone').attr('id','iphone5');
});

$('#url').focus(function(){
  $('#kbd').show();
});

$('#url').blur(function(){
  $('#kbd').hide();
});

$('#url').keyup(function(evt){
  if (evt.keyCode != 13) return;
  $('#url').blur();
  setFrameUrl($(this).val());
});

});
