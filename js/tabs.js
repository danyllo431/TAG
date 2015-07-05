$(document).ready(function(){
	$('.selected:first').show();
	$('.lista-meio .meio-nav a').click(function(){
		$('.selected').hide();
		$('.lista-meio .meio-nav a.current').removeClass('current');
		$(this).addClass('current');
		var div = $(this).attr('href');
		$(div).show();
		return false;

	});

	$('.selecte:first').show();
	$('.tabs .tabs-nav a').click(function(){
		$('.selecte').hide();
		$('.tabs .tabs-nav a.currente').removeClass('currente');
		$(this).addClass('currente');
		var div = $(this).attr('href');
		$(div).show();
		return false;

	});
});