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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgc2xpZGVyID0gKGZ1bmN0aW9uKCl7XG5cdHJldHVybiB7XG5cdFx0aW5pdDogZnVuY3Rpb24oKXtcblx0XHRcdGxldCBfdGhpcyA9IHRoaXM7XG5cdFx0XHQkKCcuc2xpZGVyX19hcnJvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGxldCAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHRcdGxldCBzbGlkZXMgPSAkdGhpcy5jbG9zZXN0KCcuc2xpZGVyJykuZmluZCgnLnNsaWRlcl9faXRlbScpO1xuXHRcdFx0XHRsZXQgYWN0aXZlU2xpZGUgPSBzbGlkZXMuZmlsdGVyKCcuc2xpZGVyX19pdGVtLS1hY3RpdmUnKTtcblx0XHRcdFx0Y29uc29sZS5sb2coYWN0aXZlU2xpZGUpXG5cdFx0XHRcdGxldCBuZXh0U2xpZGUgPSBhY3RpdmVTbGlkZS5uZXh0KCk7XG5cdFx0XHRcdGxldCBwcmV2U2xpZGUgPSBhY3RpdmVTbGlkZS5wcmV2KCk7XG5cdFx0XHRcdGxldCBmaXJzdFNsaWRlID0gc2xpZGVzLmZpcnN0KCk7XG5cdFx0XHRcdGxldCBsYXN0U2xpZGUgPSBzbGlkZXMubGFzdCgpO1xuXG5cdFx0XHRcdGlmKCR0aGlzLmhhc0NsYXNzKCdzbGlkZXJfX2Fycm93LS1yaWdodCcpKSB7XG5cdFx0XHRcdFx0aWYobmV4dFNsaWRlLmxlbmd0aCl7XG5cdFx0XHRcdFx0XHRfdGhpcy5tb3ZlU2xpZGVyKG5leHRTbGlkZSwgJ2ZvcndhcmQnKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0X3RoaXMubW92ZVNsaWRlcihmaXJzdFNsaWRlLCAnZm9yd2FyZCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZihwcmV2U2xpZGUubGVuZ3RoKXtcblx0XHRcdFx0XHRcdF90aGlzLm1vdmVTbGlkZXIocHJldlNsaWRlLCAnYmFja3dhcmQnKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0X3RoaXMubW92ZVNsaWRlcihsYXN0U2xpZGUsICdiYWNrd2FyZCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0fSlcblxuXHRcdH0sXG5cdFx0bW92ZVNsaWRlcjogZnVuY3Rpb24oc2xpZGUsIGRpcmVjdGlvbil7XG5cdFx0XHRsZXQgY29udGFpbmVyID0gc2xpZGUuY2xvc2VzdCgnLnNsaWRlcicpO1xuXHRcdFx0bGV0IHNsaWRlcyA9IGNvbnRhaW5lci5maW5kKCcuc2xpZGVyX19pdGVtJyk7XG5cdFx0XHRsZXQgYWN0aXZlU2xpZGUgPSBzbGlkZXMuZmlsdGVyKCcuc2xpZGVyX19pdGVtLS1hY3RpdmUnKTtcblx0XHRcdGxldCBzbGlkZVdpZHRoID0gc2xpZGVzLndpZHRoKCk7XG5cdFx0XHRsZXQgZHVyYXRpb24gPSAyMDA7XG5cdFx0XHRsZXQgY3NzUG9zaXRpb24gPSAwO1xuXHRcdFx0bGV0IHNsaWRlTW92ZSA9IDA7XG5cdFx0XHRpZihkaXJlY3Rpb24gPT09ICdmb3J3YXJkJyl7XG5cdFx0XHRcdGNzc1Bvc2l0aW9uID0gc2xpZGVXaWR0aDtcblx0XHRcdFx0c2xpZGVNb3ZlID0gLXNsaWRlV2lkdGhcblx0XHRcdH0gZWxzZSBpZihkaXJlY3Rpb24gPT09ICdiYWNrd2FyZCcpe1xuXHRcdFx0XHRjc3NQb3NpdGlvbiA9IC1zbGlkZVdpZHRoO1xuXHRcdFx0XHRzbGlkZU1vdmUgPSBzbGlkZVdpZHRoXG5cdFx0XHR9XG5cdFx0XHRzbGlkZS5jc3MoJ2xlZicsIGNzc1Bvc2l0aW9uKS5hZGRDbGFzcygnc2xpZGVyX19pdGVtLS1pbnNsaWRlJyk7XG5cblx0XHRcdGxldCBzbGlkZUluTW92ZSA9IHNsaWRlcy5maWx0ZXIoJy5zbGlkZXJfX2l0ZW0tLWluc2xpZGUnKTtcblx0XHRcdGFjdGl2ZVNsaWRlLmFuaW1hdGUoe2xlZnQ6IHNsaWRlTW92ZX0sIGR1cmF0aW9uKTtcblx0XHRcdHNsaWRlSW5Nb3ZlLmFuaW1hdGUoe2xlZnQ6IDB9LCBkdXJhdGlvbiwgZnVuY3Rpb24oKXtcblx0XHRcdFx0bGV0ICR0aGlzID0gJCh0aGlzKTtcblx0XHRcdFx0c2xpZGVzLmNzcygnbGVmdCcsICcwJykucmVtb3ZlQ2xhc3MoJ3NsaWRlcl9faXRlbS0tYWN0aXZlJyk7XG5cdFx0XHRcdCR0aGlzLnRvZ2dsZUNsYXNzKCdzbGlkZXJfX2l0ZW0tLWluc2xpZGUgc2xpZGVyX19pdGVtLS1hY3RpdmUnKTtcblx0XHRcdH0pXG5cdFx0fVxuXHR9XG5cbn0oKSk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cdGlmKCQoJy5zbGlkZXInKS5sZW5ndGgpe1xuXHRcdHNsaWRlci5pbml0KCk7XG5cdH1cbn0pO1xuXG4vKm1vYmlsIG5hdiovXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuJCgnLmhlYWRlcl9fbW9iaWwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnb24nKTtcbiAgICAgICAgICQoJyNtb2JpbC1uYXYnKS50b2dnbGVDbGFzcygnbW9iaWwtbmF2LS1ub2Rpc3BsYXknKVxuICAgICAgfSlcbiQoJy5tb2JpbC1uYXZfX2xpc3QnKS5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCl7XG4gICAkKCcjbW9iaWwtbmF2LXRvZ2dsZScpLnRvZ2dsZUNsYXNzKCdvbicpO1xuICAgJCgnI21vYmlsLW5hdicpLnRvZ2dsZUNsYXNzKCdtb2JpbC1uYXYtLW5vZGlzcGxheScpO1xufSlcbn0pO1xuLyplbmQgbW9iaWwgbmF2Ki9cblxuLypzdGlja3kgbmF2Ki9cbiQoZnVuY3Rpb24oKXtcbiAgICBsZXQgc3RpY2t5TmF2X29mZnNldCA9ICQoJy5oZWFkZXJfX21lbnUnKS5vZmZzZXQoKS50b3A7XG4gICAgbGV0IHN0aWNreU5hdiA9IGZ1bmN0aW9uKCl7XG4gICAgXHRsZXQgc2Nyb2xsX3RvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICBcdGlmKHNjcm9sbF90b3AgPiBzdGlja3lOYXZfb2Zmc2V0KXtcbiAgICBcdFx0JCgnLmhlYWRlcl9fbWVudScpLmFkZENsYXNzKCdmaXhlZCcpO1xuICAgIFx0fWVsc2V7XG4gICAgXHRcdCQoJy5oZWFkZXJfX21lbnUnKS5yZW1vdmVDbGFzcygnZml4ZWQnKTtcbiAgICBcdH1cbiAgICB9O1xuICAgIHN0aWNreU5hdigpO1xuXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpe1xuICAgIFx0c3RpY2t5TmF2KCk7XG4gICB9KVxufSk7XG4vKmVuZCBzdGlja3kgbmF2Ki9cblxuLypjdXQgYm9keSB0ZXh0Ki9cbmxldCB0ZXh0UG9zdEluQmxvZ1BhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9zdHBpY19fdGV4dCcpO1xuICAgIGlmKHRleHRQb3N0SW5CbG9nUGFnZSl7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGV4dFBvc3RJbkJsb2dQYWdlLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCB0ZXh0ID0gdGV4dFBvc3RJbkJsb2dQYWdlW2ldXG4gICAgICB0ZXh0LmlubmVySFRNTCA9IHRleHQuaW5uZXJIVE1MLnNsaWNlKDAsMjUwKSArICcuLi4nXG59XG59XG5cbmxldCB0ZXh0UG9zdEluSW5kZXhQYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFydGljbGVzX19kZXNjcicpO1xuICAgIGlmKCB0ZXh0UG9zdEluSW5kZXhQYWdlKXtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAgdGV4dFBvc3RJbkluZGV4UGFnZS5sZW5ndGg7IGkrKyl7XG4gICAgICBsZXQgdGV4dCA9IHRleHRQb3N0SW5JbmRleFBhZ2VbaV1cbiAgICAgIHRleHQuaW5uZXJIVE1MID0gdGV4dC5pbm5lckhUTUwuc2xpY2UoMCw4MCkgKyAnLi4uJ1xufVxufVxuLyplbmQgY3V0IGJvZHkgdGV4dCovXG5cbi8qdXBsb2FkIGJsb2cqL1xuXG4vKmdldCBzdGF0dXMqL1xuKGZ1bmN0aW9uKCkge1xuICBjb25zdCBmb3JtVXBsb2FkQmxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1cGxvYWRibG9nJyk7XG4gIGNvbnN0IGZvcm1VcGxvYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXBsb2FkJyk7XG4vL9C/0L7Qu9GD0YfQsNC10Lwg0YHRgtCw0YLRg9GBXG5cdGZ1bmN0aW9uIGZpbGVVcGxvYWQodXJsLCBkYXRhLCBjYikgeyAvLyDQv9GA0LjQvdC40LzQsNC10YIgdXJsLCDQutCw0LrQuNC1INGC0L4g0LfQvdCw0YfQtdC90LjRjyDQuCDQstGL0LfRi9Cy0LDQtdGCIGNhbGxiYWNrXG5cdGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0eGhyLm9wZW4oJ1BPU1QnLCB1cmwsIHRydWUpOyAvLyBQT1NUINC+0YLQv9GA0LDQstC70Y/QtdC8INC90LAg0YHQtdGA0LLQtdGAXG5cblx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0bGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7IC8vIHhoci5yZXNwb25zZVRleHQgPSB7XCJzdGF0dXNcIjpcItCa0LDRgNGC0LjQvdC60LAg0YPRgdC/0LXRiNC90L4g0LfQsNCz0YDRg9C20LXQvdCwXCJ9XG5cdFx0Y2IocmVzdWx0LnN0YXR1cyk7XG4gICAgY29uc29sZS5sb2coeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgY29uc29sZS5sb2cocmVzdWx0LnN0YXR1cylcbiAgfTtcbiAgXG4gIHhoci5zZW5kKGRhdGEpOyAvLyBkYXRhINC+0YLQv9GA0LDQstC70Y/QtdC8INC90LAg0YHQtdGA0LLQtdGAXG59XG5mdW5jdGlvbiBwcmVwYXJlU2VuZEJsb2dwaWMoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGxldCByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICBsZXQgZmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLXNlbGVjdCcpLmZpbGVzWzBdOyAvLyDQv9C+0LvRg9GH0LDQtdC8INGB0LDQvCDRhNCw0LnQu1xuICBsZXQgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLWRlc2MnKS52YWx1ZTsgLy8g0LjQvNGPINGE0LDQudC70LAgKNC+0L/QuNGB0LDQvdC40LUpXG4gIGxldCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLXRpdGxlJykudmFsdWU7XG4gIGxldCBkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbGUtZGF0ZScpLnZhbHVlO1xuXG4gIGZvcm1EYXRhLmFwcGVuZCgncGhvdG8nLCBmaWxlLCBmaWxlLm5hbWUpOyAvLyDQstGB0YLQsNCy0L7Rj9C10Lwg0YTQsNC50LtcbiAgZm9ybURhdGEuYXBwZW5kKCduYW1lJywgbmFtZSk7IC8vINCy0YHRgtCw0LLQu9GP0LXQvCDQvtC/0LjRgdCw0L3QuNC1XG4gIGZvcm1EYXRhLmFwcGVuZCgnZGF0ZScsIGRhdGUpO1xuICBmb3JtRGF0YS5hcHBlbmQoJ3RpdGxlJywgdGl0bGUpO1xuXG4gIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnVXBsb2FkaW5nLi4uJztcbiAgXG4gICAgZmlsZVVwbG9hZCgnL2FkZHBvc3Qtc2lkZWJhcicsIGZvcm1EYXRhLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XG4gIH0pO1xuICB9O1xuXG5pZiAoZm9ybVVwbG9hZEJsb2cpIHtcbiAgZm9ybVVwbG9hZEJsb2cuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZVNlbmRCbG9ncGljKTtcbn07XG5cbi8qdXBsb2FkIHBpY3R1cmVzKi9cbmZ1bmN0aW9uIHByZXBhcmVTZW5kRmlsZShlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgbGV0IHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcbiAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gIGxldCBmaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbGUtc2VsZWN0JykuZmlsZXNbMF07XG4gIGxldCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbGUtZGVzYycpLnZhbHVlO1xuXG4gIGZvcm1EYXRhLmFwcGVuZCgncGhvdG8nLCBmaWxlLCBmaWxlLm5hbWUpO1xuICBmb3JtRGF0YS5hcHBlbmQoJ25hbWUnLCBuYW1lKTtcblxuICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJ1VwbG9hZGluZy4uLic7XG4gIGZpbGVVcGxvYWQoJy91cGxvYWQnLCBmb3JtRGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcbiAgfSk7XG59XG5cbmlmIChmb3JtVXBsb2FkKSB7XG4gIGZvcm1VcGxvYWQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZVNlbmRGaWxlKTtcbn1cbn0oKSk7XG5cblxuLy8gY29udGFjdCBmb3JtIHNlbmQgbWFpbCBkYXRhXG4oZnVuY3Rpb24oKSB7XG4vLy0tLS0tLS0tLS0tLSBibG9jayBtYWlsXG5jb25zdCBmb3JtTWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWlsJyk7XG5cbmlmIChmb3JtTWFpbCkge1xuICBmb3JtTWFpbC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZE1haWwpO1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlU2VuZE1haWwoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGxldCByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gIGxldCBkYXRhID0ge1xuICAgIG5hbWU6IGZvcm1NYWlsLm5hbWUudmFsdWUsXG4gICAgZW1haWw6IGZvcm1NYWlsLmVtYWlsLnZhbHVlLFxuICAgIHRleHQ6IGZvcm1NYWlsLnRleHQudmFsdWVcbiAgfTtcbiAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdTZW5kaW5nLi4uJztcbiAgc2VuZEFqYXhKc29uKCcvY29udGFjdCcsIGRhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZW5kQWpheEpzb24odXJsLCBkYXRhLCBjYikge1xuICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHhoci5vcGVuKCdQT1NUJywgdXJsLCB0cnVlKTtcbiAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgIGNiKHJlc3VsdC5zdGF0dXMpO1xuICB9O1xuICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG59XG5cbi8vLS0tLSBibG9jayBCbG9nXG5cbmNvbnN0IGZvcm1CbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Jsb2cnKTtcblxuaWYgKGZvcm1CbG9nKSB7XG4gIGZvcm1CbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kUG9zdCk7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVTZW5kUG9zdChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgbGV0IHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcbiAgbGV0IGRhdGEgPSB7XG4gICAgdGl0bGU6IGZvcm1CbG9nLnRpdGxlLnZhbHVlLFxuICAgIGRhdGU6IGZvcm1CbG9nLmRhdGUudmFsdWUsXG4gICAgdGV4dDogZm9ybUJsb2cudGV4dC52YWx1ZVxuICB9O1xuICBjb25zb2xlLmxvZyh0ZXh0LmlubmVySFRNTClcbiAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdTZW5kaW5nLi4uJztcbiAgc2VuZEFqYXhKc29uKCcvYWRkcG9zdCcsIGRhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XG4gIH0pO1xufVxuXG59KCkpO1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblxuXG4gIGxldCBkZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLWRlbCcpO1xuICBpZihkZWxCdG4pe1xuICAgIGRlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgY29uc3QgaWQgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XG4gICAgY29uc29sZS5sb2coaWQpXG4gICAgJC5hamF4KHtcbiAgICAgIHR5cGU6ICdERUxFVEUnLFxuICAgICAgdXJsOiAnL2Jsb2ctc2lkZWJhci8nK2lkLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICBhbGVydCgnZGVsIGFydCcpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZj0nL2Jsb2ctc2lkZWJhcic7XG4gICAgICB9LFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycil7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgIH1cbiAgICB9KTtcbiAgfSlcbiAgfVxuICBcblxufSk7XG4iXX0=
