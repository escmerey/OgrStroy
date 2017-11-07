$(function() {
	
	$(document).on('click', '.popup__close, .overlay', function(event) {
		$('.popup, .overlay').removeClass('visible');
        $('.header__toggle').removeClass('close');
	});

	$(document).on('click', '.callPopup', function(event) {
		event.preventDefault();
		var popup = $(this).attr('data-popupBlock');
		if ($('.'+popup).hasClass('popup--notfixed')) {
			$('.'+popup).css('top', $(window).scrollTop() + $(window).height()/2);
		};
		$('.overlay').addClass('visible');
		setTimeout(function () {
			$('.'+popup).addClass('visible')
		},300);
		setTimeout(function () {
			$('.'+popup).find('input').eq(0).focus();
		},1000)
	});

});