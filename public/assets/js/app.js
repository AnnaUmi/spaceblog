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


// contact form send mail data
(function() {
//------------ block mail
const formMail = document.querySelector('#mail');

if (formMail) {
  formMail.addEventListener('submit', prepareSendMail);
}

function prepareSendMail(e) {
  e.preventDefault();
  let resultContainer = document.querySelector('.status');
  let data = {
    name: formMail.name.value,
    email: formMail.email.value,
    text: formMail.text.value
  };
  resultContainer.innerHTML = 'Sending...';
  sendAjaxJson('/contact', data, function (data) {
    resultContainer.innerHTML = data;
  });
}

function sendAjaxJson(url, data, cb) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function (e) {
    let result = JSON.parse(xhr.responseText);
    cb(result.status);
  };
  xhr.send(JSON.stringify(data));
}

//---- block Blog

const formBlog = document.querySelector('#blog');

if (formBlog) {
  formBlog.addEventListener('submit', prepareSendPost);
}

function prepareSendPost(e) {
  e.preventDefault();
  let resultContainer = document.querySelector('.status');
  let data = {
    title: formBlog.title.value,
    date: formBlog.date.value,
    text: formBlog.text.value
  };
  resultContainer.innerHTML = 'Sending...';
  sendAjaxJson('/addpost', data, function (data) {
    resultContainer.innerHTML = data;
  });
}

}());


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBzbGlkZXIgPSAoZnVuY3Rpb24oKXtcblx0cmV0dXJuIHtcblx0XHRpbml0OiBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIF90aGlzID0gdGhpcztcblx0XHRcdCQoJy5zbGlkZXJfX2Fycm93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcblx0XHRcdFx0dmFyIHNsaWRlcyA9ICR0aGlzLmNsb3Nlc3QoJy5zbGlkZXInKS5maW5kKCcuc2xpZGVyX19pdGVtJyk7XG5cdFx0XHRcdHZhciBhY3RpdmVTbGlkZSA9IHNsaWRlcy5maWx0ZXIoJy5zbGlkZXJfX2l0ZW0tLWFjdGl2ZScpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhhY3RpdmVTbGlkZSlcblx0XHRcdFx0dmFyIG5leHRTbGlkZSA9IGFjdGl2ZVNsaWRlLm5leHQoKTtcblx0XHRcdFx0dmFyIHByZXZTbGlkZSA9IGFjdGl2ZVNsaWRlLnByZXYoKTtcblx0XHRcdFx0dmFyIGZpcnN0U2xpZGUgPSBzbGlkZXMuZmlyc3QoKTtcblx0XHRcdFx0dmFyIGxhc3RTbGlkZSA9IHNsaWRlcy5sYXN0KCk7XG5cblx0XHRcdFx0aWYoJHRoaXMuaGFzQ2xhc3MoJ3NsaWRlcl9fYXJyb3ctLXJpZ2h0JykpIHtcblx0XHRcdFx0XHRpZihuZXh0U2xpZGUubGVuZ3RoKXtcblx0XHRcdFx0XHRcdF90aGlzLm1vdmVTbGlkZXIobmV4dFNsaWRlLCAnZm9yd2FyZCcpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRfdGhpcy5tb3ZlU2xpZGVyKGZpcnN0U2xpZGUsICdmb3J3YXJkJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmKHByZXZTbGlkZS5sZW5ndGgpe1xuXHRcdFx0XHRcdFx0X3RoaXMubW92ZVNsaWRlcihwcmV2U2xpZGUsICdiYWNrd2FyZCcpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRfdGhpcy5tb3ZlU2xpZGVyKGxhc3RTbGlkZSwgJ2JhY2t3YXJkJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXG5cdFx0fSxcblx0XHRtb3ZlU2xpZGVyOiBmdW5jdGlvbihzbGlkZSwgZGlyZWN0aW9uKXtcblx0XHRcdHZhciBjb250YWluZXIgPSBzbGlkZS5jbG9zZXN0KCcuc2xpZGVyJyk7XG5cdFx0XHR2YXIgc2xpZGVzID0gY29udGFpbmVyLmZpbmQoJy5zbGlkZXJfX2l0ZW0nKTtcblx0XHRcdHZhciBhY3RpdmVTbGlkZSA9IHNsaWRlcy5maWx0ZXIoJy5zbGlkZXJfX2l0ZW0tLWFjdGl2ZScpO1xuXHRcdFx0dmFyIHNsaWRlV2lkdGggPSBzbGlkZXMud2lkdGgoKTtcblx0XHRcdHZhciBkdXJhdGlvbiA9IDIwMDtcblx0XHRcdHZhciBjc3NQb3NpdGlvbiA9IDA7XG5cdFx0XHR2YXIgc2xpZGVNb3ZlID0gMDtcblx0XHRcdGlmKGRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnKXtcblx0XHRcdFx0Y3NzUG9zaXRpb24gPSBzbGlkZVdpZHRoO1xuXHRcdFx0XHRzbGlkZU1vdmUgPSAtc2xpZGVXaWR0aFxuXHRcdFx0fSBlbHNlIGlmKGRpcmVjdGlvbiA9PT0gJ2JhY2t3YXJkJyl7XG5cdFx0XHRcdGNzc1Bvc2l0aW9uID0gLXNsaWRlV2lkdGg7XG5cdFx0XHRcdHNsaWRlTW92ZSA9IHNsaWRlV2lkdGhcblx0XHRcdH1cblx0XHRcdHNsaWRlLmNzcygnbGVmJywgY3NzUG9zaXRpb24pLmFkZENsYXNzKCdzbGlkZXJfX2l0ZW0tLWluc2xpZGUnKTtcblxuXHRcdFx0dmFyIHNsaWRlSW5Nb3ZlID0gc2xpZGVzLmZpbHRlcignLnNsaWRlcl9faXRlbS0taW5zbGlkZScpO1xuXHRcdFx0YWN0aXZlU2xpZGUuYW5pbWF0ZSh7bGVmdDogc2xpZGVNb3ZlfSwgZHVyYXRpb24pO1xuXHRcdFx0c2xpZGVJbk1vdmUuYW5pbWF0ZSh7bGVmdDogMH0sIGR1cmF0aW9uLCBmdW5jdGlvbigpe1xuXHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXHRcdFx0XHRzbGlkZXMuY3NzKCdsZWZ0JywgJzAnKS5yZW1vdmVDbGFzcygnc2xpZGVyX19pdGVtLS1hY3RpdmUnKTtcblx0XHRcdFx0JHRoaXMudG9nZ2xlQ2xhc3MoJ3NsaWRlcl9faXRlbS0taW5zbGlkZSBzbGlkZXJfX2l0ZW0tLWFjdGl2ZScpO1xuXHRcdFx0fSlcblx0XHR9XG5cdH1cblxufSgpKTtcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cdGlmKCQoJy5zbGlkZXInKS5sZW5ndGgpe1xuXHRcdHNsaWRlci5pbml0KCk7XG5cdH1cbn0pO1xuXG4vKm1vYmlsIG5hdiovXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuJCgnLmhlYWRlcl9fbW9iaWwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnb24nKTtcbiAgICAgICAgICQoJyNtb2JpbC1uYXYnKS50b2dnbGVDbGFzcygnbW9iaWwtbmF2LS1ub2Rpc3BsYXknKVxuICAgICAgfSlcbiQoJy5tb2JpbC1uYXZfX2xpc3QnKS5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCl7XG4gICAkKCcjbW9iaWwtbmF2LXRvZ2dsZScpLnRvZ2dsZUNsYXNzKCdvbicpO1xuICAgJCgnI21vYmlsLW5hdicpLnRvZ2dsZUNsYXNzKCdtb2JpbC1uYXYtLW5vZGlzcGxheScpO1xufSlcbn0pO1xuXG4kKGZ1bmN0aW9uKCl7XG4gICAgdmFyIHN0aWNreV9uYXZfb2Zmc2V0ID0gJCgnLmhlYWRlcl9fbWVudScpLm9mZnNldCgpLnRvcDtcbiAgICB2YXIgc3RpY2t5X25hdiA9IGZ1bmN0aW9uKCl7XG4gICAgXHR2YXIgc2Nyb2xsX3RvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICBcdGlmKHNjcm9sbF90b3AgPiBzdGlja3lfbmF2X29mZnNldCl7XG4gICAgXHRcdCQoJy5oZWFkZXJfX21lbnUnKS5hZGRDbGFzcygnZml4ZWQnKTtcbiAgICBcdH1lbHNle1xuICAgIFx0XHQkKCcuaGVhZGVyX19tZW51JykucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgXHR9XG4gICAgfTtcbiAgICBzdGlja3lfbmF2KCk7XG5cbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7XG4gICAgXHRzdGlja3lfbmF2KCk7XG4gICB9KVxufSk7XG5cbi8vIENyZWF0ZSBhIGxpZ2h0Ym94XG4oZnVuY3Rpb24oKSB7XG4gIHZhciAkbGlnaHRib3ggPSAkKFwiPGRpdiBjbGFzcz0nbGlnaHRib3gnPjwvZGl2PlwiKTtcbiAgdmFyICRpbWcgPSAkKFwiPGltZz5cIik7XG4gIHZhciAkY2FwdGlvbiA9ICQoXCI8cCBjbGFzcz0nY2FwdGlvbic+PC9wPlwiKTtcblxuICAvLyBBZGQgaW1hZ2UgYW5kIGNhcHRpb24gdG8gbGlnaHRib3hcblxuICAkbGlnaHRib3hcbiAgICAuYXBwZW5kKCRpbWcpXG4gICAgLmFwcGVuZCgkY2FwdGlvbik7XG5cbiAgLy8gQWRkIGxpZ2hib3ggdG8gZG9jdW1lbnRcblxuICAkKCdib2R5JykuYXBwZW5kKCRsaWdodGJveCk7XG5cbiAgJCgnLmdhbGxlcnkgaW1nJykuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIC8vIEdldCBpbWFnZSBsaW5rIGFuZCBkZXNjcmlwdGlvblxuICAgIHZhciBzcmMgPSAkKHRoaXMpLmF0dHIoXCJzcmNcIik7XG4gICAgdmFyIGNhcCA9ICQodGhpcykuYXR0cihcImFsdFwiKTtcblxuICAgIC8vIEFkZCBkYXRhIHRvIGxpZ2hib3hcblxuICAgICRpbWcuYXR0cignc3JjJywgc3JjKTtcbiAgICAkY2FwdGlvbi50ZXh0KGNhcCk7XG5cbiAgICAvLyBTaG93IGxpZ2h0Ym94XG5cbiAgICAkbGlnaHRib3guZmFkZUluKCdmYXN0Jyk7XG5cbiAgICAkbGlnaHRib3guY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAkbGlnaHRib3guZmFkZU91dCgnZmFzdCcpO1xuICAgIH0pO1xuICB9KTtcblxufSgpKTtcblxuLy8gQ3JlYXRlIHVwbG9hZFxuKGZ1bmN0aW9uKCkge1xuXHRjb25zdCBmb3JtVXBsb2FkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VwbG9hZCcpO1xuXG5cdGZ1bmN0aW9uIGZpbGVVcGxvYWQodXJsLCBkYXRhLCBjYikge1xuXHRsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdHhoci5vcGVuKCdQT1NUJywgdXJsLCB0cnVlKTtcblxuXHR4aHIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcblx0XHRsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRjYihyZXN1bHQuc3RhdHVzKTtcbiAgfTtcbiAgXG4gIHhoci5zZW5kKGRhdGEpO1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlU2VuZEZpbGUoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGxldCByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICBsZXQgZmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLXNlbGVjdCcpLmZpbGVzWzBdO1xuICBsZXQgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLWRlc2MnKS52YWx1ZTtcblxuICBmb3JtRGF0YS5hcHBlbmQoJ3Bob3RvJywgZmlsZSwgZmlsZS5uYW1lKTtcbiAgZm9ybURhdGEuYXBwZW5kKCduYW1lJywgbmFtZSk7XG5cbiAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdVcGxvYWRpbmcuLi4nO1xuICBmaWxlVXBsb2FkKCcvdXBsb2FkJywgZm9ybURhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XG4gIH0pO1xufVxuXG5pZiAoZm9ybVVwbG9hZCkge1xuICBmb3JtVXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kRmlsZSk7XG59XG5cbn0oKSk7XG5cblxuLy8gY29udGFjdCBmb3JtIHNlbmQgbWFpbCBkYXRhXG4oZnVuY3Rpb24oKSB7XG4vLy0tLS0tLS0tLS0tLSBibG9jayBtYWlsXG5jb25zdCBmb3JtTWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWlsJyk7XG5cbmlmIChmb3JtTWFpbCkge1xuICBmb3JtTWFpbC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZE1haWwpO1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlU2VuZE1haWwoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGxldCByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gIGxldCBkYXRhID0ge1xuICAgIG5hbWU6IGZvcm1NYWlsLm5hbWUudmFsdWUsXG4gICAgZW1haWw6IGZvcm1NYWlsLmVtYWlsLnZhbHVlLFxuICAgIHRleHQ6IGZvcm1NYWlsLnRleHQudmFsdWVcbiAgfTtcbiAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdTZW5kaW5nLi4uJztcbiAgc2VuZEFqYXhKc29uKCcvY29udGFjdCcsIGRhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZW5kQWpheEpzb24odXJsLCBkYXRhLCBjYikge1xuICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHhoci5vcGVuKCdQT1NUJywgdXJsLCB0cnVlKTtcbiAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgIGNiKHJlc3VsdC5zdGF0dXMpO1xuICB9O1xuICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG59XG5cbi8vLS0tLSBibG9jayBCbG9nXG5cbmNvbnN0IGZvcm1CbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jsb2cnKTtcblxuaWYgKGZvcm1CbG9nKSB7XG4gIGZvcm1CbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kUG9zdCk7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVTZW5kUG9zdChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgbGV0IHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcbiAgbGV0IGRhdGEgPSB7XG4gICAgdGl0bGU6IGZvcm1CbG9nLnRpdGxlLnZhbHVlLFxuICAgIGRhdGU6IGZvcm1CbG9nLmRhdGUudmFsdWUsXG4gICAgdGV4dDogZm9ybUJsb2cudGV4dC52YWx1ZVxuICB9O1xuICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJ1NlbmRpbmcuLi4nO1xuICBzZW5kQWpheEpzb24oJy9hZGRwb3N0JywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcbiAgfSk7XG59XG5cbn0oKSk7XG5cbiJdfQ==
