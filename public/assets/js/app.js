let slider = (function(){
	return {
		init: function(){
			let _this = this;
			$('.slider__arrow').on('click', function(e){
				e.preventDefault();
				let $this = $(this);
				let slides = $this.closest('.slider').find('.slider__item');
				let activeSlide = slides.filter('.slider__item--active');
				console.log(activeSlide)
				let nextSlide = activeSlide.next();
				let prevSlide = activeSlide.prev();
				let firstSlide = slides.first();
				let lastSlide = slides.last();

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
			let container = slide.closest('.slider');
			let slides = container.find('.slider__item');
			let activeSlide = slides.filter('.slider__item--active');
			let slideWidth = slides.width();
			let duration = 200;
			let cssPosition = 0;
			let slideMove = 0;
			if(direction === 'forward'){
				cssPosition = slideWidth;
				slideMove = -slideWidth
			} else if(direction === 'backward'){
				cssPosition = -slideWidth;
				slideMove = slideWidth
			}
			slide.css('lef', cssPosition).addClass('slider__item--inslide');

			let slideInMove = slides.filter('.slider__item--inslide');
			activeSlide.animate({left: slideMove}, duration);
			slideInMove.animate({left: 0}, duration, function(){
				let $this = $(this);
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
/*end mobil nav*/

/*sticky nav*/
$(function(){
    let stickyNav_offset = $('.header__menu').offset().top;
    let stickyNav = function(){
    	let scroll_top = $(window).scrollTop();
    	if(scroll_top > stickyNav_offset){
    		$('.header__menu').addClass('fixed');
    	}else{
    		$('.header__menu').removeClass('fixed');
    	}
    };
    stickyNav();

    $(window).scroll(function(){
    	stickyNav();
   })
});
/*end sticky nav*/

/*cut body text*/
let textPostInBlogPage = document.querySelectorAll('.postpic__text');
    if(textPostInBlogPage){
      for(let i = 0; i < textPostInBlogPage.length; i++){
      let text = textPostInBlogPage[i]
      text.innerHTML = text.innerHTML.slice(0,250) + '...'
}
}

let textPostInIndexPage = document.querySelectorAll('.articles__descr');
    if( textPostInIndexPage){
      for(let i = 0; i <  textPostInIndexPage.length; i++){
      let text = textPostInIndexPage[i]
      text.innerHTML = text.innerHTML.slice(0,80) + '...'
}
}
/*end cut body text*/

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


}());
$(document).ready(function(){


  let delBtn = document.querySelector('.btn-del');
  if(delBtn){
    delBtn.addEventListener('click', e => {
    e.preventDefault();
    let target = e.target;
    const id = target.getAttribute('data-id');
    console.log(id)
    $.ajax({
      type: 'DELETE',
      url: '/blog-sidebar/'+id,
      success: function(response){
        alert('del art');
        window.location.href='/blog-sidebar';
      },
      error: function(err){
        console.log(err)
      }
    });
  })
  }
  

});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHNsaWRlciA9IChmdW5jdGlvbigpe1xuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGZ1bmN0aW9uKCl7XG5cdFx0XHRsZXQgX3RoaXMgPSB0aGlzO1xuXHRcdFx0JCgnLnNsaWRlcl9fYXJyb3cnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRsZXQgJHRoaXMgPSAkKHRoaXMpO1xuXHRcdFx0XHRsZXQgc2xpZGVzID0gJHRoaXMuY2xvc2VzdCgnLnNsaWRlcicpLmZpbmQoJy5zbGlkZXJfX2l0ZW0nKTtcblx0XHRcdFx0bGV0IGFjdGl2ZVNsaWRlID0gc2xpZGVzLmZpbHRlcignLnNsaWRlcl9faXRlbS0tYWN0aXZlJyk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGFjdGl2ZVNsaWRlKVxuXHRcdFx0XHRsZXQgbmV4dFNsaWRlID0gYWN0aXZlU2xpZGUubmV4dCgpO1xuXHRcdFx0XHRsZXQgcHJldlNsaWRlID0gYWN0aXZlU2xpZGUucHJldigpO1xuXHRcdFx0XHRsZXQgZmlyc3RTbGlkZSA9IHNsaWRlcy5maXJzdCgpO1xuXHRcdFx0XHRsZXQgbGFzdFNsaWRlID0gc2xpZGVzLmxhc3QoKTtcblxuXHRcdFx0XHRpZigkdGhpcy5oYXNDbGFzcygnc2xpZGVyX19hcnJvdy0tcmlnaHQnKSkge1xuXHRcdFx0XHRcdGlmKG5leHRTbGlkZS5sZW5ndGgpe1xuXHRcdFx0XHRcdFx0X3RoaXMubW92ZVNsaWRlcihuZXh0U2xpZGUsICdmb3J3YXJkJyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdF90aGlzLm1vdmVTbGlkZXIoZmlyc3RTbGlkZSwgJ2ZvcndhcmQnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYocHJldlNsaWRlLmxlbmd0aCl7XG5cdFx0XHRcdFx0XHRfdGhpcy5tb3ZlU2xpZGVyKHByZXZTbGlkZSwgJ2JhY2t3YXJkJyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdF90aGlzLm1vdmVTbGlkZXIobGFzdFNsaWRlLCAnYmFja3dhcmQnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cblx0XHR9LFxuXHRcdG1vdmVTbGlkZXI6IGZ1bmN0aW9uKHNsaWRlLCBkaXJlY3Rpb24pe1xuXHRcdFx0bGV0IGNvbnRhaW5lciA9IHNsaWRlLmNsb3Nlc3QoJy5zbGlkZXInKTtcblx0XHRcdGxldCBzbGlkZXMgPSBjb250YWluZXIuZmluZCgnLnNsaWRlcl9faXRlbScpO1xuXHRcdFx0bGV0IGFjdGl2ZVNsaWRlID0gc2xpZGVzLmZpbHRlcignLnNsaWRlcl9faXRlbS0tYWN0aXZlJyk7XG5cdFx0XHRsZXQgc2xpZGVXaWR0aCA9IHNsaWRlcy53aWR0aCgpO1xuXHRcdFx0bGV0IGR1cmF0aW9uID0gMjAwO1xuXHRcdFx0bGV0IGNzc1Bvc2l0aW9uID0gMDtcblx0XHRcdGxldCBzbGlkZU1vdmUgPSAwO1xuXHRcdFx0aWYoZGlyZWN0aW9uID09PSAnZm9yd2FyZCcpe1xuXHRcdFx0XHRjc3NQb3NpdGlvbiA9IHNsaWRlV2lkdGg7XG5cdFx0XHRcdHNsaWRlTW92ZSA9IC1zbGlkZVdpZHRoXG5cdFx0XHR9IGVsc2UgaWYoZGlyZWN0aW9uID09PSAnYmFja3dhcmQnKXtcblx0XHRcdFx0Y3NzUG9zaXRpb24gPSAtc2xpZGVXaWR0aDtcblx0XHRcdFx0c2xpZGVNb3ZlID0gc2xpZGVXaWR0aFxuXHRcdFx0fVxuXHRcdFx0c2xpZGUuY3NzKCdsZWYnLCBjc3NQb3NpdGlvbikuYWRkQ2xhc3MoJ3NsaWRlcl9faXRlbS0taW5zbGlkZScpO1xuXG5cdFx0XHRsZXQgc2xpZGVJbk1vdmUgPSBzbGlkZXMuZmlsdGVyKCcuc2xpZGVyX19pdGVtLS1pbnNsaWRlJyk7XG5cdFx0XHRhY3RpdmVTbGlkZS5hbmltYXRlKHtsZWZ0OiBzbGlkZU1vdmV9LCBkdXJhdGlvbik7XG5cdFx0XHRzbGlkZUluTW92ZS5hbmltYXRlKHtsZWZ0OiAwfSwgZHVyYXRpb24sIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGxldCAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHRcdHNsaWRlcy5jc3MoJ2xlZnQnLCAnMCcpLnJlbW92ZUNsYXNzKCdzbGlkZXJfX2l0ZW0tLWFjdGl2ZScpO1xuXHRcdFx0XHQkdGhpcy50b2dnbGVDbGFzcygnc2xpZGVyX19pdGVtLS1pbnNsaWRlIHNsaWRlcl9faXRlbS0tYWN0aXZlJyk7XG5cdFx0XHR9KVxuXHRcdH1cblx0fVxuXG59KCkpO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXHRpZigkKCcuc2xpZGVyJykubGVuZ3RoKXtcblx0XHRzbGlkZXIuaW5pdCgpO1xuXHR9XG59KTtcblxuLyptb2JpbCBuYXYqL1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiQoJy5oZWFkZXJfX21vYmlsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ29uJyk7XG4gICAgICAgICAkKCcjbW9iaWwtbmF2JykudG9nZ2xlQ2xhc3MoJ21vYmlsLW5hdi0tbm9kaXNwbGF5JylcbiAgICAgIH0pXG4kKCcubW9iaWwtbmF2X19saXN0Jykub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpe1xuICAgJCgnI21vYmlsLW5hdi10b2dnbGUnKS50b2dnbGVDbGFzcygnb24nKTtcbiAgICQoJyNtb2JpbC1uYXYnKS50b2dnbGVDbGFzcygnbW9iaWwtbmF2LS1ub2Rpc3BsYXknKTtcbn0pXG59KTtcbi8qZW5kIG1vYmlsIG5hdiovXG5cbi8qc3RpY2t5IG5hdiovXG4kKGZ1bmN0aW9uKCl7XG4gICAgbGV0IHN0aWNreU5hdl9vZmZzZXQgPSAkKCcuaGVhZGVyX19tZW51Jykub2Zmc2V0KCkudG9wO1xuICAgIGxldCBzdGlja3lOYXYgPSBmdW5jdGlvbigpe1xuICAgIFx0bGV0IHNjcm9sbF90b3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgXHRpZihzY3JvbGxfdG9wID4gc3RpY2t5TmF2X29mZnNldCl7XG4gICAgXHRcdCQoJy5oZWFkZXJfX21lbnUnKS5hZGRDbGFzcygnZml4ZWQnKTtcbiAgICBcdH1lbHNle1xuICAgIFx0XHQkKCcuaGVhZGVyX19tZW51JykucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgXHR9XG4gICAgfTtcbiAgICBzdGlja3lOYXYoKTtcblxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXtcbiAgICBcdHN0aWNreU5hdigpO1xuICAgfSlcbn0pO1xuLyplbmQgc3RpY2t5IG5hdiovXG5cbi8qY3V0IGJvZHkgdGV4dCovXG5sZXQgdGV4dFBvc3RJbkJsb2dQYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvc3RwaWNfX3RleHQnKTtcbiAgICBpZih0ZXh0UG9zdEluQmxvZ1BhZ2Upe1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRleHRQb3N0SW5CbG9nUGFnZS5sZW5ndGg7IGkrKyl7XG4gICAgICBsZXQgdGV4dCA9IHRleHRQb3N0SW5CbG9nUGFnZVtpXVxuICAgICAgdGV4dC5pbm5lckhUTUwgPSB0ZXh0LmlubmVySFRNTC5zbGljZSgwLDI1MCkgKyAnLi4uJ1xufVxufVxuXG5sZXQgdGV4dFBvc3RJbkluZGV4UGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hcnRpY2xlc19fZGVzY3InKTtcbiAgICBpZiggdGV4dFBvc3RJbkluZGV4UGFnZSl7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgIHRleHRQb3N0SW5JbmRleFBhZ2UubGVuZ3RoOyBpKyspe1xuICAgICAgbGV0IHRleHQgPSB0ZXh0UG9zdEluSW5kZXhQYWdlW2ldXG4gICAgICB0ZXh0LmlubmVySFRNTCA9IHRleHQuaW5uZXJIVE1MLnNsaWNlKDAsODApICsgJy4uLidcbn1cbn1cbi8qZW5kIGN1dCBib2R5IHRleHQqL1xuXG4vKnVwbG9hZCBibG9nKi9cblxuLypnZXQgc3RhdHVzKi9cbihmdW5jdGlvbigpIHtcbiAgY29uc3QgZm9ybVVwbG9hZEJsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXBsb2FkYmxvZycpO1xuICBjb25zdCBmb3JtVXBsb2FkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VwbG9hZCcpO1xuLy/Qv9C+0LvRg9GH0LDQtdC8INGB0YLQsNGC0YPRgVxuXHRmdW5jdGlvbiBmaWxlVXBsb2FkKHVybCwgZGF0YSwgY2IpIHsgLy8g0L/RgNC40L3QuNC80LDQtdGCIHVybCwg0LrQsNC60LjQtSDRgtC+INC30L3QsNGH0LXQvdC40Y8g0Lgg0LLRi9C30YvQstCw0LXRgiBjYWxsYmFja1xuXHRsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdHhoci5vcGVuKCdQT1NUJywgdXJsLCB0cnVlKTsgLy8gUE9TVCDQvtGC0L/RgNCw0LLQu9GP0LXQvCDQvdCwINGB0LXRgNCy0LXRgFxuXG5cdHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuXHRcdGxldCByZXN1bHQgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpOyAvLyB4aHIucmVzcG9uc2VUZXh0ID0ge1wic3RhdHVzXCI6XCLQmtCw0YDRgtC40L3QutCwINGD0YHQv9C10YjQvdC+INC30LDQs9GA0YPQttC10L3QsFwifVxuXHRcdGNiKHJlc3VsdC5zdGF0dXMpO1xuICAgIGNvbnNvbGUubG9nKHhoci5yZXNwb25zZVRleHQpO1xuICAgIGNvbnNvbGUubG9nKHJlc3VsdC5zdGF0dXMpXG4gIH07XG4gIFxuICB4aHIuc2VuZChkYXRhKTsgLy8gZGF0YSDQvtGC0L/RgNCw0LLQu9GP0LXQvCDQvdCwINGB0LXRgNCy0LXRgFxufVxuZnVuY3Rpb24gcHJlcGFyZVNlbmRCbG9ncGljKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBsZXQgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgbGV0IGZpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmlsZS1zZWxlY3QnKS5maWxlc1swXTsgLy8g0L/QvtC70YPRh9Cw0LXQvCDRgdCw0Lwg0YTQsNC50LtcbiAgbGV0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmlsZS1kZXNjJykudmFsdWU7IC8vINC40LzRjyDRhNCw0LnQu9CwICjQvtC/0LjRgdCw0L3QuNC1KVxuICBsZXQgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmlsZS10aXRsZScpLnZhbHVlO1xuICBsZXQgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLWRhdGUnKS52YWx1ZTtcblxuICBmb3JtRGF0YS5hcHBlbmQoJ3Bob3RvJywgZmlsZSwgZmlsZS5uYW1lKTsgLy8g0LLRgdGC0LDQstC+0Y/QtdC8INGE0LDQudC7XG4gIGZvcm1EYXRhLmFwcGVuZCgnbmFtZScsIG5hbWUpOyAvLyDQstGB0YLQsNCy0LvRj9C10Lwg0L7Qv9C40YHQsNC90LjQtVxuICBmb3JtRGF0YS5hcHBlbmQoJ2RhdGUnLCBkYXRlKTtcbiAgZm9ybURhdGEuYXBwZW5kKCd0aXRsZScsIHRpdGxlKTtcblxuICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJ1VwbG9hZGluZy4uLic7XG4gIFxuICAgIGZpbGVVcGxvYWQoJy9hZGRwb3N0LXNpZGViYXInLCBmb3JtRGF0YSwgZnVuY3Rpb24oZGF0YSkge1xuICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xuICB9KTtcbiAgfTtcblxuaWYgKGZvcm1VcGxvYWRCbG9nKSB7XG4gIGZvcm1VcGxvYWRCbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kQmxvZ3BpYyk7XG59O1xuXG4vKnVwbG9hZCBwaWN0dXJlcyovXG5mdW5jdGlvbiBwcmVwYXJlU2VuZEZpbGUoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGxldCByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICBsZXQgZmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLXNlbGVjdCcpLmZpbGVzWzBdO1xuICBsZXQgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLWRlc2MnKS52YWx1ZTtcblxuICBmb3JtRGF0YS5hcHBlbmQoJ3Bob3RvJywgZmlsZSwgZmlsZS5uYW1lKTtcbiAgZm9ybURhdGEuYXBwZW5kKCduYW1lJywgbmFtZSk7XG5cbiAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdVcGxvYWRpbmcuLi4nO1xuICBmaWxlVXBsb2FkKCcvdXBsb2FkJywgZm9ybURhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XG4gIH0pO1xufVxuXG5pZiAoZm9ybVVwbG9hZCkge1xuICBmb3JtVXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kRmlsZSk7XG59XG59KCkpO1xuXG5cbi8vIGNvbnRhY3QgZm9ybSBzZW5kIG1haWwgZGF0YVxuKGZ1bmN0aW9uKCkge1xuLy8tLS0tLS0tLS0tLS0gYmxvY2sgbWFpbFxuY29uc3QgZm9ybU1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbCcpO1xuXG5pZiAoZm9ybU1haWwpIHtcbiAgZm9ybU1haWwuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZVNlbmRNYWlsKTtcbn1cblxuZnVuY3Rpb24gcHJlcGFyZVNlbmRNYWlsKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBsZXQgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICBsZXQgZGF0YSA9IHtcbiAgICBuYW1lOiBmb3JtTWFpbC5uYW1lLnZhbHVlLFxuICAgIGVtYWlsOiBmb3JtTWFpbC5lbWFpbC52YWx1ZSxcbiAgICB0ZXh0OiBmb3JtTWFpbC50ZXh0LnZhbHVlXG4gIH07XG4gIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnU2VuZGluZy4uLic7XG4gIHNlbmRBamF4SnNvbignL2NvbnRhY3QnLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2VuZEFqYXhKc29uKHVybCwgZGF0YSwgY2IpIHtcbiAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICB4aHIub3BlbignUE9TVCcsIHVybCwgdHJ1ZSk7XG4gIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICB4aHIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcbiAgICBsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICBjYihyZXN1bHQuc3RhdHVzKTtcbiAgfTtcbiAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xufVxuXG5cbn0oKSk7XG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXG5cbiAgbGV0IGRlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tZGVsJyk7XG4gIGlmKGRlbEJ0bil7XG4gICAgZGVsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBjb25zdCBpZCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcbiAgICBjb25zb2xlLmxvZyhpZClcbiAgICAkLmFqYXgoe1xuICAgICAgdHlwZTogJ0RFTEVURScsXG4gICAgICB1cmw6ICcvYmxvZy1zaWRlYmFyLycraWQsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgIGFsZXJ0KCdkZWwgYXJ0Jyk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmPScvYmxvZy1zaWRlYmFyJztcbiAgICAgIH0sXG4gICAgICBlcnJvcjogZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgfVxuICAgIH0pO1xuICB9KVxuICB9XG4gIFxuXG59KTtcbiJdfQ==
