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
  const formUploadBlog = document.querySelector('#uploadblog'); 

//получаем статус
	function fileUpload(url, data, cb) { // принимает url, какие то значения и вызывает callback
	let xhr = new XMLHttpRequest();
	xhr.open('POST', url, true); // POST отправляем на сервер

	xhr.onload = function (e) {
		let result = JSON.parse(xhr.responseText); // xhr.responseText = {"status":"Картинка успешно загружена"}
		cb(result.status);
    console.log(xhr.responseText);
    console.log(result.status)
  };
  
  xhr.send(data); // data отправляем на сервер
}
function prepareSendBlogpic(e) {
  e.preventDefault();
  let resultContainer = document.querySelector('.status');
  let formData = new FormData();
  let file = document.querySelector('#file-select').files[0]; // получаем сам файл
  let name = document.querySelector('#file-desc').value; // имя файла (описание)
  let title = document.querySelector('#file-title').value;
  let date = document.querySelector('#file-date').value;

  formData.append('photo', file, file.name); // вставояем файл
  formData.append('name', name); // вставляем описание
  formData.append('date', date);
  formData.append('title', title);

  resultContainer.innerHTML = 'Uploading...';
  
    fileUpload('/addpost-sidebar', formData, function(data) {
    resultContainer.innerHTML = data;
  });
  };

if (formUploadBlog) {
  formUploadBlog.addEventListener('submit', prepareSendBlogpic);
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
  console.log(text.innerHTML)
  resultContainer.innerHTML = 'Sending...';
  sendAjaxJson('/addpost', data, function (data) {
    resultContainer.innerHTML = data;
  });
}

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHNsaWRlciA9IChmdW5jdGlvbigpe1xuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdFx0JCgnLnNsaWRlcl9fYXJyb3cnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXHRcdFx0XHR2YXIgc2xpZGVzID0gJHRoaXMuY2xvc2VzdCgnLnNsaWRlcicpLmZpbmQoJy5zbGlkZXJfX2l0ZW0nKTtcblx0XHRcdFx0dmFyIGFjdGl2ZVNsaWRlID0gc2xpZGVzLmZpbHRlcignLnNsaWRlcl9faXRlbS0tYWN0aXZlJyk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGFjdGl2ZVNsaWRlKVxuXHRcdFx0XHR2YXIgbmV4dFNsaWRlID0gYWN0aXZlU2xpZGUubmV4dCgpO1xuXHRcdFx0XHR2YXIgcHJldlNsaWRlID0gYWN0aXZlU2xpZGUucHJldigpO1xuXHRcdFx0XHR2YXIgZmlyc3RTbGlkZSA9IHNsaWRlcy5maXJzdCgpO1xuXHRcdFx0XHR2YXIgbGFzdFNsaWRlID0gc2xpZGVzLmxhc3QoKTtcblxuXHRcdFx0XHRpZigkdGhpcy5oYXNDbGFzcygnc2xpZGVyX19hcnJvdy0tcmlnaHQnKSkge1xuXHRcdFx0XHRcdGlmKG5leHRTbGlkZS5sZW5ndGgpe1xuXHRcdFx0XHRcdFx0X3RoaXMubW92ZVNsaWRlcihuZXh0U2xpZGUsICdmb3J3YXJkJyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdF90aGlzLm1vdmVTbGlkZXIoZmlyc3RTbGlkZSwgJ2ZvcndhcmQnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYocHJldlNsaWRlLmxlbmd0aCl7XG5cdFx0XHRcdFx0XHRfdGhpcy5tb3ZlU2xpZGVyKHByZXZTbGlkZSwgJ2JhY2t3YXJkJyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdF90aGlzLm1vdmVTbGlkZXIobGFzdFNsaWRlLCAnYmFja3dhcmQnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cblx0XHR9LFxuXHRcdG1vdmVTbGlkZXI6IGZ1bmN0aW9uKHNsaWRlLCBkaXJlY3Rpb24pe1xuXHRcdFx0dmFyIGNvbnRhaW5lciA9IHNsaWRlLmNsb3Nlc3QoJy5zbGlkZXInKTtcblx0XHRcdHZhciBzbGlkZXMgPSBjb250YWluZXIuZmluZCgnLnNsaWRlcl9faXRlbScpO1xuXHRcdFx0dmFyIGFjdGl2ZVNsaWRlID0gc2xpZGVzLmZpbHRlcignLnNsaWRlcl9faXRlbS0tYWN0aXZlJyk7XG5cdFx0XHR2YXIgc2xpZGVXaWR0aCA9IHNsaWRlcy53aWR0aCgpO1xuXHRcdFx0dmFyIGR1cmF0aW9uID0gMjAwO1xuXHRcdFx0dmFyIGNzc1Bvc2l0aW9uID0gMDtcblx0XHRcdHZhciBzbGlkZU1vdmUgPSAwO1xuXHRcdFx0aWYoZGlyZWN0aW9uID09PSAnZm9yd2FyZCcpe1xuXHRcdFx0XHRjc3NQb3NpdGlvbiA9IHNsaWRlV2lkdGg7XG5cdFx0XHRcdHNsaWRlTW92ZSA9IC1zbGlkZVdpZHRoXG5cdFx0XHR9IGVsc2UgaWYoZGlyZWN0aW9uID09PSAnYmFja3dhcmQnKXtcblx0XHRcdFx0Y3NzUG9zaXRpb24gPSAtc2xpZGVXaWR0aDtcblx0XHRcdFx0c2xpZGVNb3ZlID0gc2xpZGVXaWR0aFxuXHRcdFx0fVxuXHRcdFx0c2xpZGUuY3NzKCdsZWYnLCBjc3NQb3NpdGlvbikuYWRkQ2xhc3MoJ3NsaWRlcl9faXRlbS0taW5zbGlkZScpO1xuXG5cdFx0XHR2YXIgc2xpZGVJbk1vdmUgPSBzbGlkZXMuZmlsdGVyKCcuc2xpZGVyX19pdGVtLS1pbnNsaWRlJyk7XG5cdFx0XHRhY3RpdmVTbGlkZS5hbmltYXRlKHtsZWZ0OiBzbGlkZU1vdmV9LCBkdXJhdGlvbik7XG5cdFx0XHRzbGlkZUluTW92ZS5hbmltYXRlKHtsZWZ0OiAwfSwgZHVyYXRpb24sIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHRcdHNsaWRlcy5jc3MoJ2xlZnQnLCAnMCcpLnJlbW92ZUNsYXNzKCdzbGlkZXJfX2l0ZW0tLWFjdGl2ZScpO1xuXHRcdFx0XHQkdGhpcy50b2dnbGVDbGFzcygnc2xpZGVyX19pdGVtLS1pbnNsaWRlIHNsaWRlcl9faXRlbS0tYWN0aXZlJyk7XG5cdFx0XHR9KVxuXHRcdH1cblx0fVxuXG59KCkpO1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblx0aWYoJCgnLnNsaWRlcicpLmxlbmd0aCl7XG5cdFx0c2xpZGVyLmluaXQoKTtcblx0fVxufSk7XG5cbi8qbW9iaWwgbmF2Ki9cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4kKCcuaGVhZGVyX19tb2JpbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdvbicpO1xuICAgICAgICAgJCgnI21vYmlsLW5hdicpLnRvZ2dsZUNsYXNzKCdtb2JpbC1uYXYtLW5vZGlzcGxheScpXG4gICAgICB9KVxuJCgnLm1vYmlsLW5hdl9fbGlzdCcpLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKXtcbiAgICQoJyNtb2JpbC1uYXYtdG9nZ2xlJykudG9nZ2xlQ2xhc3MoJ29uJyk7XG4gICAkKCcjbW9iaWwtbmF2JykudG9nZ2xlQ2xhc3MoJ21vYmlsLW5hdi0tbm9kaXNwbGF5Jyk7XG59KVxufSk7XG5cbiQoZnVuY3Rpb24oKXtcbiAgICB2YXIgc3RpY2t5X25hdl9vZmZzZXQgPSAkKCcuaGVhZGVyX19tZW51Jykub2Zmc2V0KCkudG9wO1xuICAgIHZhciBzdGlja3lfbmF2ID0gZnVuY3Rpb24oKXtcbiAgICBcdHZhciBzY3JvbGxfdG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgIFx0aWYoc2Nyb2xsX3RvcCA+IHN0aWNreV9uYXZfb2Zmc2V0KXtcbiAgICBcdFx0JCgnLmhlYWRlcl9fbWVudScpLmFkZENsYXNzKCdmaXhlZCcpO1xuICAgIFx0fWVsc2V7XG4gICAgXHRcdCQoJy5oZWFkZXJfX21lbnUnKS5yZW1vdmVDbGFzcygnZml4ZWQnKTtcbiAgICBcdH1cbiAgICB9O1xuICAgIHN0aWNreV9uYXYoKTtcblxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXtcbiAgICBcdHN0aWNreV9uYXYoKTtcbiAgIH0pXG59KTtcblxuLy8gQ3JlYXRlIGEgbGlnaHRib3hcbihmdW5jdGlvbigpIHtcbiAgdmFyICRsaWdodGJveCA9ICQoXCI8ZGl2IGNsYXNzPSdsaWdodGJveCc+PC9kaXY+XCIpO1xuICB2YXIgJGltZyA9ICQoXCI8aW1nPlwiKTtcbiAgdmFyICRjYXB0aW9uID0gJChcIjxwIGNsYXNzPSdjYXB0aW9uJz48L3A+XCIpO1xuXG4gIC8vIEFkZCBpbWFnZSBhbmQgY2FwdGlvbiB0byBsaWdodGJveFxuXG4gICRsaWdodGJveFxuICAgIC5hcHBlbmQoJGltZylcbiAgICAuYXBwZW5kKCRjYXB0aW9uKTtcblxuICAvLyBBZGQgbGlnaGJveCB0byBkb2N1bWVudFxuXG4gICQoJ2JvZHknKS5hcHBlbmQoJGxpZ2h0Ym94KTtcblxuICAkKCcuZ2FsbGVyeSBpbWcnKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy8gR2V0IGltYWdlIGxpbmsgYW5kIGRlc2NyaXB0aW9uXG4gICAgdmFyIHNyYyA9ICQodGhpcykuYXR0cihcInNyY1wiKTtcbiAgICB2YXIgY2FwID0gJCh0aGlzKS5hdHRyKFwiYWx0XCIpO1xuXG4gICAgLy8gQWRkIGRhdGEgdG8gbGlnaGJveFxuXG4gICAgJGltZy5hdHRyKCdzcmMnLCBzcmMpO1xuICAgICRjYXB0aW9uLnRleHQoY2FwKTtcblxuICAgIC8vIFNob3cgbGlnaHRib3hcblxuICAgICRsaWdodGJveC5mYWRlSW4oJ2Zhc3QnKTtcblxuICAgICRsaWdodGJveC5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICRsaWdodGJveC5mYWRlT3V0KCdmYXN0Jyk7XG4gICAgfSk7XG4gIH0pO1xuXG59KCkpO1xuXG4vLyBDcmVhdGUgdXBsb2FkXG4oZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGZvcm1VcGxvYWRCbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VwbG9hZGJsb2cnKTsgXG5cbi8v0L/QvtC70YPRh9Cw0LXQvCDRgdGC0LDRgtGD0YFcblx0ZnVuY3Rpb24gZmlsZVVwbG9hZCh1cmwsIGRhdGEsIGNiKSB7IC8vINC/0YDQuNC90LjQvNCw0LXRgiB1cmwsINC60LDQutC40LUg0YLQviDQt9C90LDRh9C10L3QuNGPINC4INCy0YvQt9GL0LLQsNC10YIgY2FsbGJhY2tcblx0bGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHR4aHIub3BlbignUE9TVCcsIHVybCwgdHJ1ZSk7IC8vIFBPU1Qg0L7RgtC/0YDQsNCy0LvRj9C10Lwg0L3QsCDRgdC10YDQstC10YBcblxuXHR4aHIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcblx0XHRsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTsgLy8geGhyLnJlc3BvbnNlVGV4dCA9IHtcInN0YXR1c1wiOlwi0JrQsNGA0YLQuNC90LrQsCDRg9GB0L/QtdGI0L3QviDQt9Cw0LPRgNGD0LbQtdC90LBcIn1cblx0XHRjYihyZXN1bHQuc3RhdHVzKTtcbiAgICBjb25zb2xlLmxvZyh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICBjb25zb2xlLmxvZyhyZXN1bHQuc3RhdHVzKVxuICB9O1xuICBcbiAgeGhyLnNlbmQoZGF0YSk7IC8vIGRhdGEg0L7RgtC/0YDQsNCy0LvRj9C10Lwg0L3QsCDRgdC10YDQstC10YBcbn1cbmZ1bmN0aW9uIHByZXBhcmVTZW5kQmxvZ3BpYyhlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgbGV0IHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcbiAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gIGxldCBmaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbGUtc2VsZWN0JykuZmlsZXNbMF07IC8vINC/0L7Qu9GD0YfQsNC10Lwg0YHQsNC8INGE0LDQudC7XG4gIGxldCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbGUtZGVzYycpLnZhbHVlOyAvLyDQuNC80Y8g0YTQsNC50LvQsCAo0L7Qv9C40YHQsNC90LjQtSlcbiAgbGV0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbGUtdGl0bGUnKS52YWx1ZTtcbiAgbGV0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmlsZS1kYXRlJykudmFsdWU7XG5cbiAgZm9ybURhdGEuYXBwZW5kKCdwaG90bycsIGZpbGUsIGZpbGUubmFtZSk7IC8vINCy0YHRgtCw0LLQvtGP0LXQvCDRhNCw0LnQu1xuICBmb3JtRGF0YS5hcHBlbmQoJ25hbWUnLCBuYW1lKTsgLy8g0LLRgdGC0LDQstC70Y/QtdC8INC+0L/QuNGB0LDQvdC40LVcbiAgZm9ybURhdGEuYXBwZW5kKCdkYXRlJywgZGF0ZSk7XG4gIGZvcm1EYXRhLmFwcGVuZCgndGl0bGUnLCB0aXRsZSk7XG5cbiAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdVcGxvYWRpbmcuLi4nO1xuICBcbiAgICBmaWxlVXBsb2FkKCcvYWRkcG9zdC1zaWRlYmFyJywgZm9ybURhdGEsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcbiAgfSk7XG4gIH07XG5cbmlmIChmb3JtVXBsb2FkQmxvZykge1xuICBmb3JtVXBsb2FkQmxvZy5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZEJsb2dwaWMpO1xufVxuXG59KCkpO1xuXG5cbi8vIGNvbnRhY3QgZm9ybSBzZW5kIG1haWwgZGF0YVxuKGZ1bmN0aW9uKCkge1xuLy8tLS0tLS0tLS0tLS0gYmxvY2sgbWFpbFxuY29uc3QgZm9ybU1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbCcpO1xuXG5pZiAoZm9ybU1haWwpIHtcbiAgZm9ybU1haWwuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZVNlbmRNYWlsKTtcbn1cblxuZnVuY3Rpb24gcHJlcGFyZVNlbmRNYWlsKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBsZXQgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICBsZXQgZGF0YSA9IHtcbiAgICBuYW1lOiBmb3JtTWFpbC5uYW1lLnZhbHVlLFxuICAgIGVtYWlsOiBmb3JtTWFpbC5lbWFpbC52YWx1ZSxcbiAgICB0ZXh0OiBmb3JtTWFpbC50ZXh0LnZhbHVlXG4gIH07XG4gIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnU2VuZGluZy4uLic7XG4gIHNlbmRBamF4SnNvbignL2NvbnRhY3QnLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2VuZEFqYXhKc29uKHVybCwgZGF0YSwgY2IpIHtcbiAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICB4aHIub3BlbignUE9TVCcsIHVybCwgdHJ1ZSk7XG4gIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICB4aHIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcbiAgICBsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICBjYihyZXN1bHQuc3RhdHVzKTtcbiAgfTtcbiAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xufVxuXG4vLy0tLS0gYmxvY2sgQmxvZ1xuXG5jb25zdCBmb3JtQmxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNibG9nJyk7XG5cbmlmIChmb3JtQmxvZykge1xuICBmb3JtQmxvZy5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZFBvc3QpO1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlU2VuZFBvc3QoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGxldCByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gIGxldCBkYXRhID0ge1xuICAgIHRpdGxlOiBmb3JtQmxvZy50aXRsZS52YWx1ZSxcbiAgICBkYXRlOiBmb3JtQmxvZy5kYXRlLnZhbHVlLFxuICAgIHRleHQ6IGZvcm1CbG9nLnRleHQudmFsdWVcbiAgfTtcbiAgY29uc29sZS5sb2codGV4dC5pbm5lckhUTUwpXG4gIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnU2VuZGluZy4uLic7XG4gIHNlbmRBamF4SnNvbignL2FkZHBvc3QnLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xuICB9KTtcbn1cblxufSgpKTtcbiJdfQ==
