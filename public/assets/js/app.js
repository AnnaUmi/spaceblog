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
/*upload blog*/

/*get status*/
(function() {
  const formUploadBlog = document.querySelector('#uploadblog');
  const formUpload = document.querySelector('#upload');
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
};

/*upload pictures*/
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
  console.log(text.innerHTML)
  resultContainer.innerHTML = 'Sending...';
  sendAjaxJson('/addpost', data, function (data) {
    resultContainer.innerHTML = data;
  });
}

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHNsaWRlciA9IChmdW5jdGlvbigpe1xuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdFx0JCgnLnNsaWRlcl9fYXJyb3cnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXHRcdFx0XHR2YXIgc2xpZGVzID0gJHRoaXMuY2xvc2VzdCgnLnNsaWRlcicpLmZpbmQoJy5zbGlkZXJfX2l0ZW0nKTtcblx0XHRcdFx0dmFyIGFjdGl2ZVNsaWRlID0gc2xpZGVzLmZpbHRlcignLnNsaWRlcl9faXRlbS0tYWN0aXZlJyk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGFjdGl2ZVNsaWRlKVxuXHRcdFx0XHR2YXIgbmV4dFNsaWRlID0gYWN0aXZlU2xpZGUubmV4dCgpO1xuXHRcdFx0XHR2YXIgcHJldlNsaWRlID0gYWN0aXZlU2xpZGUucHJldigpO1xuXHRcdFx0XHR2YXIgZmlyc3RTbGlkZSA9IHNsaWRlcy5maXJzdCgpO1xuXHRcdFx0XHR2YXIgbGFzdFNsaWRlID0gc2xpZGVzLmxhc3QoKTtcblxuXHRcdFx0XHRpZigkdGhpcy5oYXNDbGFzcygnc2xpZGVyX19hcnJvdy0tcmlnaHQnKSkge1xuXHRcdFx0XHRcdGlmKG5leHRTbGlkZS5sZW5ndGgpe1xuXHRcdFx0XHRcdFx0X3RoaXMubW92ZVNsaWRlcihuZXh0U2xpZGUsICdmb3J3YXJkJyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdF90aGlzLm1vdmVTbGlkZXIoZmlyc3RTbGlkZSwgJ2ZvcndhcmQnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYocHJldlNsaWRlLmxlbmd0aCl7XG5cdFx0XHRcdFx0XHRfdGhpcy5tb3ZlU2xpZGVyKHByZXZTbGlkZSwgJ2JhY2t3YXJkJyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdF90aGlzLm1vdmVTbGlkZXIobGFzdFNsaWRlLCAnYmFja3dhcmQnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cblx0XHR9LFxuXHRcdG1vdmVTbGlkZXI6IGZ1bmN0aW9uKHNsaWRlLCBkaXJlY3Rpb24pe1xuXHRcdFx0dmFyIGNvbnRhaW5lciA9IHNsaWRlLmNsb3Nlc3QoJy5zbGlkZXInKTtcblx0XHRcdHZhciBzbGlkZXMgPSBjb250YWluZXIuZmluZCgnLnNsaWRlcl9faXRlbScpO1xuXHRcdFx0dmFyIGFjdGl2ZVNsaWRlID0gc2xpZGVzLmZpbHRlcignLnNsaWRlcl9faXRlbS0tYWN0aXZlJyk7XG5cdFx0XHR2YXIgc2xpZGVXaWR0aCA9IHNsaWRlcy53aWR0aCgpO1xuXHRcdFx0dmFyIGR1cmF0aW9uID0gMjAwO1xuXHRcdFx0dmFyIGNzc1Bvc2l0aW9uID0gMDtcblx0XHRcdHZhciBzbGlkZU1vdmUgPSAwO1xuXHRcdFx0aWYoZGlyZWN0aW9uID09PSAnZm9yd2FyZCcpe1xuXHRcdFx0XHRjc3NQb3NpdGlvbiA9IHNsaWRlV2lkdGg7XG5cdFx0XHRcdHNsaWRlTW92ZSA9IC1zbGlkZVdpZHRoXG5cdFx0XHR9IGVsc2UgaWYoZGlyZWN0aW9uID09PSAnYmFja3dhcmQnKXtcblx0XHRcdFx0Y3NzUG9zaXRpb24gPSAtc2xpZGVXaWR0aDtcblx0XHRcdFx0c2xpZGVNb3ZlID0gc2xpZGVXaWR0aFxuXHRcdFx0fVxuXHRcdFx0c2xpZGUuY3NzKCdsZWYnLCBjc3NQb3NpdGlvbikuYWRkQ2xhc3MoJ3NsaWRlcl9faXRlbS0taW5zbGlkZScpO1xuXG5cdFx0XHR2YXIgc2xpZGVJbk1vdmUgPSBzbGlkZXMuZmlsdGVyKCcuc2xpZGVyX19pdGVtLS1pbnNsaWRlJyk7XG5cdFx0XHRhY3RpdmVTbGlkZS5hbmltYXRlKHtsZWZ0OiBzbGlkZU1vdmV9LCBkdXJhdGlvbik7XG5cdFx0XHRzbGlkZUluTW92ZS5hbmltYXRlKHtsZWZ0OiAwfSwgZHVyYXRpb24sIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHRcdHNsaWRlcy5jc3MoJ2xlZnQnLCAnMCcpLnJlbW92ZUNsYXNzKCdzbGlkZXJfX2l0ZW0tLWFjdGl2ZScpO1xuXHRcdFx0XHQkdGhpcy50b2dnbGVDbGFzcygnc2xpZGVyX19pdGVtLS1pbnNsaWRlIHNsaWRlcl9faXRlbS0tYWN0aXZlJyk7XG5cdFx0XHR9KVxuXHRcdH1cblx0fVxuXG59KCkpO1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblx0aWYoJCgnLnNsaWRlcicpLmxlbmd0aCl7XG5cdFx0c2xpZGVyLmluaXQoKTtcblx0fVxufSk7XG5cbi8qbW9iaWwgbmF2Ki9cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4kKCcuaGVhZGVyX19tb2JpbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdvbicpO1xuICAgICAgICAgJCgnI21vYmlsLW5hdicpLnRvZ2dsZUNsYXNzKCdtb2JpbC1uYXYtLW5vZGlzcGxheScpXG4gICAgICB9KVxuJCgnLm1vYmlsLW5hdl9fbGlzdCcpLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKXtcbiAgICQoJyNtb2JpbC1uYXYtdG9nZ2xlJykudG9nZ2xlQ2xhc3MoJ29uJyk7XG4gICAkKCcjbW9iaWwtbmF2JykudG9nZ2xlQ2xhc3MoJ21vYmlsLW5hdi0tbm9kaXNwbGF5Jyk7XG59KVxufSk7XG5cbiQoZnVuY3Rpb24oKXtcbiAgICB2YXIgc3RpY2t5X25hdl9vZmZzZXQgPSAkKCcuaGVhZGVyX19tZW51Jykub2Zmc2V0KCkudG9wO1xuICAgIHZhciBzdGlja3lfbmF2ID0gZnVuY3Rpb24oKXtcbiAgICBcdHZhciBzY3JvbGxfdG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgIFx0aWYoc2Nyb2xsX3RvcCA+IHN0aWNreV9uYXZfb2Zmc2V0KXtcbiAgICBcdFx0JCgnLmhlYWRlcl9fbWVudScpLmFkZENsYXNzKCdmaXhlZCcpO1xuICAgIFx0fWVsc2V7XG4gICAgXHRcdCQoJy5oZWFkZXJfX21lbnUnKS5yZW1vdmVDbGFzcygnZml4ZWQnKTtcbiAgICBcdH1cbiAgICB9O1xuICAgIHN0aWNreV9uYXYoKTtcblxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXtcbiAgICBcdHN0aWNreV9uYXYoKTtcbiAgIH0pXG59KTtcbi8qdXBsb2FkIGJsb2cqL1xuXG4vKmdldCBzdGF0dXMqL1xuKGZ1bmN0aW9uKCkge1xuICBjb25zdCBmb3JtVXBsb2FkQmxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1cGxvYWRibG9nJyk7XG4gIGNvbnN0IGZvcm1VcGxvYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXBsb2FkJyk7XG4vL9C/0L7Qu9GD0YfQsNC10Lwg0YHRgtCw0YLRg9GBXG5cdGZ1bmN0aW9uIGZpbGVVcGxvYWQodXJsLCBkYXRhLCBjYikgeyAvLyDQv9GA0LjQvdC40LzQsNC10YIgdXJsLCDQutCw0LrQuNC1INGC0L4g0LfQvdCw0YfQtdC90LjRjyDQuCDQstGL0LfRi9Cy0LDQtdGCIGNhbGxiYWNrXG5cdGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0eGhyLm9wZW4oJ1BPU1QnLCB1cmwsIHRydWUpOyAvLyBQT1NUINC+0YLQv9GA0LDQstC70Y/QtdC8INC90LAg0YHQtdGA0LLQtdGAXG5cblx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0bGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7IC8vIHhoci5yZXNwb25zZVRleHQgPSB7XCJzdGF0dXNcIjpcItCa0LDRgNGC0LjQvdC60LAg0YPRgdC/0LXRiNC90L4g0LfQsNCz0YDRg9C20LXQvdCwXCJ9XG5cdFx0Y2IocmVzdWx0LnN0YXR1cyk7XG4gICAgY29uc29sZS5sb2coeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgY29uc29sZS5sb2cocmVzdWx0LnN0YXR1cylcbiAgfTtcbiAgXG4gIHhoci5zZW5kKGRhdGEpOyAvLyBkYXRhINC+0YLQv9GA0LDQstC70Y/QtdC8INC90LAg0YHQtdGA0LLQtdGAXG59XG5mdW5jdGlvbiBwcmVwYXJlU2VuZEJsb2dwaWMoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGxldCByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICBsZXQgZmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLXNlbGVjdCcpLmZpbGVzWzBdOyAvLyDQv9C+0LvRg9GH0LDQtdC8INGB0LDQvCDRhNCw0LnQu1xuICBsZXQgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLWRlc2MnKS52YWx1ZTsgLy8g0LjQvNGPINGE0LDQudC70LAgKNC+0L/QuNGB0LDQvdC40LUpXG4gIGxldCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLXRpdGxlJykudmFsdWU7XG4gIGxldCBkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbGUtZGF0ZScpLnZhbHVlO1xuXG4gIGZvcm1EYXRhLmFwcGVuZCgncGhvdG8nLCBmaWxlLCBmaWxlLm5hbWUpOyAvLyDQstGB0YLQsNCy0L7Rj9C10Lwg0YTQsNC50LtcbiAgZm9ybURhdGEuYXBwZW5kKCduYW1lJywgbmFtZSk7IC8vINCy0YHRgtCw0LLQu9GP0LXQvCDQvtC/0LjRgdCw0L3QuNC1XG4gIGZvcm1EYXRhLmFwcGVuZCgnZGF0ZScsIGRhdGUpO1xuICBmb3JtRGF0YS5hcHBlbmQoJ3RpdGxlJywgdGl0bGUpO1xuXG4gIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnVXBsb2FkaW5nLi4uJztcbiAgXG4gICAgZmlsZVVwbG9hZCgnL2FkZHBvc3Qtc2lkZWJhcicsIGZvcm1EYXRhLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XG4gIH0pO1xuICB9O1xuXG5pZiAoZm9ybVVwbG9hZEJsb2cpIHtcbiAgZm9ybVVwbG9hZEJsb2cuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZVNlbmRCbG9ncGljKTtcbn07XG5cbi8qdXBsb2FkIHBpY3R1cmVzKi9cbmZ1bmN0aW9uIHByZXBhcmVTZW5kRmlsZShlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgbGV0IHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcbiAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gIGxldCBmaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbGUtc2VsZWN0JykuZmlsZXNbMF07XG4gIGxldCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbGUtZGVzYycpLnZhbHVlO1xuXG4gIGZvcm1EYXRhLmFwcGVuZCgncGhvdG8nLCBmaWxlLCBmaWxlLm5hbWUpO1xuICBmb3JtRGF0YS5hcHBlbmQoJ25hbWUnLCBuYW1lKTtcblxuICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJ1VwbG9hZGluZy4uLic7XG4gIGZpbGVVcGxvYWQoJy91cGxvYWQnLCBmb3JtRGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcbiAgfSk7XG59XG5cbmlmIChmb3JtVXBsb2FkKSB7XG4gIGZvcm1VcGxvYWQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZVNlbmRGaWxlKTtcbn1cbn0oKSk7XG5cblxuLy8gY29udGFjdCBmb3JtIHNlbmQgbWFpbCBkYXRhXG4oZnVuY3Rpb24oKSB7XG4vLy0tLS0tLS0tLS0tLSBibG9jayBtYWlsXG5jb25zdCBmb3JtTWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWlsJyk7XG5cbmlmIChmb3JtTWFpbCkge1xuICBmb3JtTWFpbC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZE1haWwpO1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlU2VuZE1haWwoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGxldCByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gIGxldCBkYXRhID0ge1xuICAgIG5hbWU6IGZvcm1NYWlsLm5hbWUudmFsdWUsXG4gICAgZW1haWw6IGZvcm1NYWlsLmVtYWlsLnZhbHVlLFxuICAgIHRleHQ6IGZvcm1NYWlsLnRleHQudmFsdWVcbiAgfTtcbiAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdTZW5kaW5nLi4uJztcbiAgc2VuZEFqYXhKc29uKCcvY29udGFjdCcsIGRhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZW5kQWpheEpzb24odXJsLCBkYXRhLCBjYikge1xuICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHhoci5vcGVuKCdQT1NUJywgdXJsLCB0cnVlKTtcbiAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgIGNiKHJlc3VsdC5zdGF0dXMpO1xuICB9O1xuICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG59XG5cbi8vLS0tLSBibG9jayBCbG9nXG5cbmNvbnN0IGZvcm1CbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jsb2cnKTtcblxuaWYgKGZvcm1CbG9nKSB7XG4gIGZvcm1CbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kUG9zdCk7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVTZW5kUG9zdChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgbGV0IHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcbiAgbGV0IGRhdGEgPSB7XG4gICAgdGl0bGU6IGZvcm1CbG9nLnRpdGxlLnZhbHVlLFxuICAgIGRhdGU6IGZvcm1CbG9nLmRhdGUudmFsdWUsXG4gICAgdGV4dDogZm9ybUJsb2cudGV4dC52YWx1ZVxuICB9O1xuICBjb25zb2xlLmxvZyh0ZXh0LmlubmVySFRNTClcbiAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdTZW5kaW5nLi4uJztcbiAgc2VuZEFqYXhKc29uKCcvYWRkcG9zdCcsIGRhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XG4gIH0pO1xufVxuXG59KCkpO1xuIl19
