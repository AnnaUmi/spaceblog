var slider = (function(){
	return {
		init: function(){
			var _this = this;
			$('.slider__arrow').on('click', function(e){
				e.preventDefault();
				var $this = $(this);
				var slides = $this.closest('.slider').find('.slider__item');
				var activeSlide = slides.filter('.slider__item--active');
				console.log(activeSlide)
				var nextSlide = activeSlide.next();
				var prevSlide = activeSlide.prev();
				var firstSlide = slides.first();
				var lastSlide = slides.last();

				if($this.hasClass('slider__arrow--right')) {
					if(nextSlide.length){
						_this.moveSlider(nextSlide, 'forward');
					} else {
						_this.moveSlider(firstSlide, 'forward');
					}
					
				} else {
					if(prevSlide.length){
						_this.moveSlider(prevSlide, 'backward');
					} else {
						_this.moveSlider(lastSlide, 'backward');
					}
					
				}
			})

		},
		moveSlider: function(slide, direction){
			var container = slide.closest('.slider');
			var slides = container.find('.slider__item');
			var activeSlide = slides.filter('.slider__item--active');
			var slideWidth = slides.width();
			var duration = 200;
			var cssPosition = 0;
			var slideMove = 0;
			if(direction === 'forward'){
				cssPosition = slideWidth;
				slideMove = -slideWidth
			} else if(direction === 'backward'){
				cssPosition = -slideWidth;
				slideMove = slideWidth
			}
			slide.css('lef', cssPosition).addClass('slider__item--inslide');

			var slideInMove = slides.filter('.slider__item--inslide');
			activeSlide.animate({left: slideMove}, duration);
			slideInMove.animate({left: 0}, duration, function(){
				var $this = $(this);
				slides.css('left', '0').removeClass('slider__item--active');
				$this.toggleClass('slider__item--inslide slider__item--active');
			})
		}
	}

}());
$(document).ready(function(){
	if($('.slider').length){
		slider.init();
	}
});

/*mobil nav*/
$(document).ready(function(){
$('.header__mobil').on('click', function(){
         $(this).toggleClass('on');
         $('#mobil-nav').toggleClass('mobil-nav--nodisplay')
      })
$('.mobil-nav__list').on('mouseleave', function(){
   $('#mobil-nav-toggle').toggleClass('on');
   $('#mobil-nav').toggleClass('mobil-nav--nodisplay');
})
});

$(function(){
    var sticky_nav_offset = $('.header__menu').offset().top;
    var sticky_nav = function(){
    	var scroll_top = $(window).scrollTop();
    	if(scroll_top > sticky_nav_offset){
    		$('.header__menu').addClass('fixed');
    	}else{
    		$('.header__menu').removeClass('fixed');
    	}
    };
    sticky_nav();

    $(window).scroll(function(){
    	sticky_nav();
   })
});

// Create a lightbox
(function() {
  var $lightbox = $("<div class='lightbox'></div>");
  var $img = $("<img>");
  var $caption = $("<p class='caption'></p>");

  // Add image and caption to lightbox

  $lightbox
    .append($img)
    .append($caption);

  // Add lighbox to document

  $('body').append($lightbox);

  $('.gallery img').click(function(e) {
    e.preventDefault();

    // Get image link and description
    var src = $(this).attr("src");
    var cap = $(this).attr("alt");

    // Add data to lighbox

    $img.attr('src', src);
    $caption.text(cap);

    // Show lightbox

    $lightbox.fadeIn('fast');

    $lightbox.click(function() {
      $lightbox.fadeOut('fast');
    });
  });

}());

// Create upload
(function() {
	const formUpload = document.querySelector('#upload');

	function fileUpload(url, data, cb) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);

	xhr.onload = function (e) {
		let result = JSON.parse(xhr.responseText);
		cb(result.status);
  };
  
  xhr.send(data);
}

function prepareSendFile(e) {
  e.preventDefault();
  let resultContainer = document.querySelector('.status');
  let formData = new FormData();
  let file = document.querySelector('#file-select').files[0];
  let name = document.querySelector('#file-desc').value;

  formData.append('photo', file, file.name);
  formData.append('name', name);

  resultContainer.innerHTML = 'Uploading...';
  fileUpload('/upload', formData, function (data) {
    resultContainer.innerHTML = data;
  });
}

if (formUpload) {
  formUpload.addEventListener('submit', prepareSendFile);
}

}());
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgc2xpZGVyID0gKGZ1bmN0aW9uKCl7XG5cdHJldHVybiB7XG5cdFx0aW5pdDogZnVuY3Rpb24oKXtcblx0XHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cdFx0XHQkKCcuc2xpZGVyX19hcnJvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHRcdHZhciBzbGlkZXMgPSAkdGhpcy5jbG9zZXN0KCcuc2xpZGVyJykuZmluZCgnLnNsaWRlcl9faXRlbScpO1xuXHRcdFx0XHR2YXIgYWN0aXZlU2xpZGUgPSBzbGlkZXMuZmlsdGVyKCcuc2xpZGVyX19pdGVtLS1hY3RpdmUnKTtcblx0XHRcdFx0Y29uc29sZS5sb2coYWN0aXZlU2xpZGUpXG5cdFx0XHRcdHZhciBuZXh0U2xpZGUgPSBhY3RpdmVTbGlkZS5uZXh0KCk7XG5cdFx0XHRcdHZhciBwcmV2U2xpZGUgPSBhY3RpdmVTbGlkZS5wcmV2KCk7XG5cdFx0XHRcdHZhciBmaXJzdFNsaWRlID0gc2xpZGVzLmZpcnN0KCk7XG5cdFx0XHRcdHZhciBsYXN0U2xpZGUgPSBzbGlkZXMubGFzdCgpO1xuXG5cdFx0XHRcdGlmKCR0aGlzLmhhc0NsYXNzKCdzbGlkZXJfX2Fycm93LS1yaWdodCcpKSB7XG5cdFx0XHRcdFx0aWYobmV4dFNsaWRlLmxlbmd0aCl7XG5cdFx0XHRcdFx0XHRfdGhpcy5tb3ZlU2xpZGVyKG5leHRTbGlkZSwgJ2ZvcndhcmQnKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0X3RoaXMubW92ZVNsaWRlcihmaXJzdFNsaWRlLCAnZm9yd2FyZCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZihwcmV2U2xpZGUubGVuZ3RoKXtcblx0XHRcdFx0XHRcdF90aGlzLm1vdmVTbGlkZXIocHJldlNsaWRlLCAnYmFja3dhcmQnKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0X3RoaXMubW92ZVNsaWRlcihsYXN0U2xpZGUsICdiYWNrd2FyZCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0fSlcblxuXHRcdH0sXG5cdFx0bW92ZVNsaWRlcjogZnVuY3Rpb24oc2xpZGUsIGRpcmVjdGlvbil7XG5cdFx0XHR2YXIgY29udGFpbmVyID0gc2xpZGUuY2xvc2VzdCgnLnNsaWRlcicpO1xuXHRcdFx0dmFyIHNsaWRlcyA9IGNvbnRhaW5lci5maW5kKCcuc2xpZGVyX19pdGVtJyk7XG5cdFx0XHR2YXIgYWN0aXZlU2xpZGUgPSBzbGlkZXMuZmlsdGVyKCcuc2xpZGVyX19pdGVtLS1hY3RpdmUnKTtcblx0XHRcdHZhciBzbGlkZVdpZHRoID0gc2xpZGVzLndpZHRoKCk7XG5cdFx0XHR2YXIgZHVyYXRpb24gPSAyMDA7XG5cdFx0XHR2YXIgY3NzUG9zaXRpb24gPSAwO1xuXHRcdFx0dmFyIHNsaWRlTW92ZSA9IDA7XG5cdFx0XHRpZihkaXJlY3Rpb24gPT09ICdmb3J3YXJkJyl7XG5cdFx0XHRcdGNzc1Bvc2l0aW9uID0gc2xpZGVXaWR0aDtcblx0XHRcdFx0c2xpZGVNb3ZlID0gLXNsaWRlV2lkdGhcblx0XHRcdH0gZWxzZSBpZihkaXJlY3Rpb24gPT09ICdiYWNrd2FyZCcpe1xuXHRcdFx0XHRjc3NQb3NpdGlvbiA9IC1zbGlkZVdpZHRoO1xuXHRcdFx0XHRzbGlkZU1vdmUgPSBzbGlkZVdpZHRoXG5cdFx0XHR9XG5cdFx0XHRzbGlkZS5jc3MoJ2xlZicsIGNzc1Bvc2l0aW9uKS5hZGRDbGFzcygnc2xpZGVyX19pdGVtLS1pbnNsaWRlJyk7XG5cblx0XHRcdHZhciBzbGlkZUluTW92ZSA9IHNsaWRlcy5maWx0ZXIoJy5zbGlkZXJfX2l0ZW0tLWluc2xpZGUnKTtcblx0XHRcdGFjdGl2ZVNsaWRlLmFuaW1hdGUoe2xlZnQ6IHNsaWRlTW92ZX0sIGR1cmF0aW9uKTtcblx0XHRcdHNsaWRlSW5Nb3ZlLmFuaW1hdGUoe2xlZnQ6IDB9LCBkdXJhdGlvbiwgZnVuY3Rpb24oKXtcblx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcblx0XHRcdFx0c2xpZGVzLmNzcygnbGVmdCcsICcwJykucmVtb3ZlQ2xhc3MoJ3NsaWRlcl9faXRlbS0tYWN0aXZlJyk7XG5cdFx0XHRcdCR0aGlzLnRvZ2dsZUNsYXNzKCdzbGlkZXJfX2l0ZW0tLWluc2xpZGUgc2xpZGVyX19pdGVtLS1hY3RpdmUnKTtcblx0XHRcdH0pXG5cdFx0fVxuXHR9XG5cbn0oKSk7XG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXHRpZigkKCcuc2xpZGVyJykubGVuZ3RoKXtcblx0XHRzbGlkZXIuaW5pdCgpO1xuXHR9XG59KTtcblxuLyptb2JpbCBuYXYqL1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiQoJy5oZWFkZXJfX21vYmlsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ29uJyk7XG4gICAgICAgICAkKCcjbW9iaWwtbmF2JykudG9nZ2xlQ2xhc3MoJ21vYmlsLW5hdi0tbm9kaXNwbGF5JylcbiAgICAgIH0pXG4kKCcubW9iaWwtbmF2X19saXN0Jykub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpe1xuICAgJCgnI21vYmlsLW5hdi10b2dnbGUnKS50b2dnbGVDbGFzcygnb24nKTtcbiAgICQoJyNtb2JpbC1uYXYnKS50b2dnbGVDbGFzcygnbW9iaWwtbmF2LS1ub2Rpc3BsYXknKTtcbn0pXG59KTtcblxuJChmdW5jdGlvbigpe1xuICAgIHZhciBzdGlja3lfbmF2X29mZnNldCA9ICQoJy5oZWFkZXJfX21lbnUnKS5vZmZzZXQoKS50b3A7XG4gICAgdmFyIHN0aWNreV9uYXYgPSBmdW5jdGlvbigpe1xuICAgIFx0dmFyIHNjcm9sbF90b3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgXHRpZihzY3JvbGxfdG9wID4gc3RpY2t5X25hdl9vZmZzZXQpe1xuICAgIFx0XHQkKCcuaGVhZGVyX19tZW51JykuYWRkQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgXHR9ZWxzZXtcbiAgICBcdFx0JCgnLmhlYWRlcl9fbWVudScpLnJlbW92ZUNsYXNzKCdmaXhlZCcpO1xuICAgIFx0fVxuICAgIH07XG4gICAgc3RpY2t5X25hdigpO1xuXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpe1xuICAgIFx0c3RpY2t5X25hdigpO1xuICAgfSlcbn0pO1xuXG4vLyBDcmVhdGUgYSBsaWdodGJveFxuKGZ1bmN0aW9uKCkge1xuICB2YXIgJGxpZ2h0Ym94ID0gJChcIjxkaXYgY2xhc3M9J2xpZ2h0Ym94Jz48L2Rpdj5cIik7XG4gIHZhciAkaW1nID0gJChcIjxpbWc+XCIpO1xuICB2YXIgJGNhcHRpb24gPSAkKFwiPHAgY2xhc3M9J2NhcHRpb24nPjwvcD5cIik7XG5cbiAgLy8gQWRkIGltYWdlIGFuZCBjYXB0aW9uIHRvIGxpZ2h0Ym94XG5cbiAgJGxpZ2h0Ym94XG4gICAgLmFwcGVuZCgkaW1nKVxuICAgIC5hcHBlbmQoJGNhcHRpb24pO1xuXG4gIC8vIEFkZCBsaWdoYm94IHRvIGRvY3VtZW50XG5cbiAgJCgnYm9keScpLmFwcGVuZCgkbGlnaHRib3gpO1xuXG4gICQoJy5nYWxsZXJ5IGltZycpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvLyBHZXQgaW1hZ2UgbGluayBhbmQgZGVzY3JpcHRpb25cbiAgICB2YXIgc3JjID0gJCh0aGlzKS5hdHRyKFwic3JjXCIpO1xuICAgIHZhciBjYXAgPSAkKHRoaXMpLmF0dHIoXCJhbHRcIik7XG5cbiAgICAvLyBBZGQgZGF0YSB0byBsaWdoYm94XG5cbiAgICAkaW1nLmF0dHIoJ3NyYycsIHNyYyk7XG4gICAgJGNhcHRpb24udGV4dChjYXApO1xuXG4gICAgLy8gU2hvdyBsaWdodGJveFxuXG4gICAgJGxpZ2h0Ym94LmZhZGVJbignZmFzdCcpO1xuXG4gICAgJGxpZ2h0Ym94LmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgJGxpZ2h0Ym94LmZhZGVPdXQoJ2Zhc3QnKTtcbiAgICB9KTtcbiAgfSk7XG5cbn0oKSk7XG5cbi8vIENyZWF0ZSB1cGxvYWRcbihmdW5jdGlvbigpIHtcblx0Y29uc3QgZm9ybVVwbG9hZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1cGxvYWQnKTtcblxuXHRmdW5jdGlvbiBmaWxlVXBsb2FkKHVybCwgZGF0YSwgY2IpIHtcblx0bGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHR4aHIub3BlbignUE9TVCcsIHVybCwgdHJ1ZSk7XG5cblx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0bGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0Y2IocmVzdWx0LnN0YXR1cyk7XG4gIH07XG4gIFxuICB4aHIuc2VuZChkYXRhKTtcbn1cblxuZnVuY3Rpb24gcHJlcGFyZVNlbmRGaWxlKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBsZXQgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgbGV0IGZpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmlsZS1zZWxlY3QnKS5maWxlc1swXTtcbiAgbGV0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmlsZS1kZXNjJykudmFsdWU7XG5cbiAgZm9ybURhdGEuYXBwZW5kKCdwaG90bycsIGZpbGUsIGZpbGUubmFtZSk7XG4gIGZvcm1EYXRhLmFwcGVuZCgnbmFtZScsIG5hbWUpO1xuXG4gIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnVXBsb2FkaW5nLi4uJztcbiAgZmlsZVVwbG9hZCgnL3VwbG9hZCcsIGZvcm1EYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xuICB9KTtcbn1cblxuaWYgKGZvcm1VcGxvYWQpIHtcbiAgZm9ybVVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZEZpbGUpO1xufVxuXG59KCkpOyJdfQ==
