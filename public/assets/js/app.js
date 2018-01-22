let slider = (function(){
	return {
		init: function(){
			let _this = this;
			$('.slider__arrow').on('click', function(e){
				e.preventDefault();
        // обнаружаем слайдер кот нужно сдвинуть
				let $this = $(this); //сохраняем его в $this
				let slides = $this.closest('.slider').find('.slider__item');//сохраняем все слайды
				let activeSlide = slides.filter('.slider__item--active');
				//console.log(activeSlide)
				let nextSlide = activeSlide.next();
				let prevSlide = activeSlide.prev();
				let firstSlide = slides.first();
				let lastSlide = slides.last();

				if($this.hasClass('slider__arrow--right')) {
					if(nextSlide.length){
						_this.moveSlider(nextSlide, 'forward'); //если есть первый слайд двигаем как обычно
					} else {
						_this.moveSlider(firstSlide, 'forward'); // еслт неь то двигаем первый за последним
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
			let slideWidth = slides.width(); // значение ширины первого слайда
			let duration = 1000;
			let cssPosition = 0; // позиция в кот передвигаем слайд кот нужно сдвинуть
			let slideMove = 0; // необходимое смещение пикселей

			if(direction === 'forward'){ // если листаем вперед
				cssPosition = slideWidth; // сдигаем на ширину слайда меняем left 0
				slideMove = -slideWidth
			} else if(direction === 'backward'){ // если листаем вперед все наоборот
				cssPosition = -slideWidth;
				slideMove = slideWidth
			}
      // переданный слайд в ф сместим на нужную позицию
			slide.css('left', cssPosition).addClass('slider__item--inslide');

      // двигаю нужный класс
			let slideInMove = slides.filter('.slider__item--inslide');
			activeSlide.animate({left: slideMove}, duration);
			slideInMove.animate({left: 0}, duration, function(){
				let $this = $(this);
				slides.css('left', '0').removeClass('slider__item--active');
				$this.toggleClass('slider__item--inslide slider__item--active');//слайд кот приехал
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

/* upload blog */

(function() {

const formUploadBlog = document.querySelector('#uploadblog');
const formUpload = document.querySelector('#upload');

//fileUpload обрабатывает статус
function fileUpload(url, data, cb) { // принимает url, какие то значения и вызывает callback
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url, true); // POST отправляем на сервер

	xhr.onload = function (e) {
		let result = JSON.parse(xhr.responseText); // xhr.responseText = {"status":"Картинка успешно загружена"}
		cb(result.status); // status вызываем и возвращаем обратно
  };
  
  xhr.send(data); // data отправляем на сервер
}

/*upload pictures + blog post*/
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

  resultContainer.innerHTML = 'Загрузка...';
  
  fileUpload('/addpost-sidebar', formData, function(data) { // data - результат AJAX запроса, кот передам в cb
    resultContainer.innerHTML = data;
    });
  };

if(formUploadBlog) {
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

  resultContainer.innerHTML = 'Загрузка...';
  fileUpload('/upload', formData, function (data) {
    resultContainer.innerHTML = data;
  });
}

if(formUpload) {
  formUpload.addEventListener('submit', prepareSendFile);
}

}());


/* contact form send mail data*/
(function() {

const formMail = document.querySelector('#mail');

if (formMail) {
  formMail.addEventListener('submit', prepareSendMail);
}

function prepareSendMail(e) {
  e.preventDefault();
  let resultContainer = document.querySelector('.status');
  let data = {
    subject: formMail.subject.value,
    email: formMail.email.value,
    text: formMail.text.value
  };
  resultContainer.innerHTML = 'Отправка...';
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
/* end contact form send mail data*/

$(document).ready(function(){

  let delBtn = document.querySelectorAll('.btn-del');
  if(delBtn){
    for(let i = 0; i < delBtn.length; i++){
      delBtn[i].addEventListener('click', e => {
        console.log('he')
      e.preventDefault();
    let target = e.target;
    const id = target.getAttribute('data-id');
    console.log(id)
    $.ajax({
      type: 'DELETE',
      url: '/blog-sidebar/'+id,
      success: function(response){
        alert('Вы удаляете статью');
        window.location.href='/blog-sidebar';
      },
      error: function(err){
        console.log(err)
      }
    });
  })
    }
    
  }
  
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHNsaWRlciA9IChmdW5jdGlvbigpe1xuXHRyZXR1cm4ge1xuXHRcdGluaXQ6IGZ1bmN0aW9uKCl7XG5cdFx0XHRsZXQgX3RoaXMgPSB0aGlzO1xuXHRcdFx0JCgnLnNsaWRlcl9fYXJyb3cnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyDQvtCx0L3QsNGA0YPQttCw0LXQvCDRgdC70LDQudC00LXRgCDQutC+0YIg0L3Rg9C20L3QviDRgdC00LLQuNC90YPRgtGMXG5cdFx0XHRcdGxldCAkdGhpcyA9ICQodGhpcyk7IC8v0YHQvtGF0YDQsNC90Y/QtdC8INC10LPQviDQsiAkdGhpc1xuXHRcdFx0XHRsZXQgc2xpZGVzID0gJHRoaXMuY2xvc2VzdCgnLnNsaWRlcicpLmZpbmQoJy5zbGlkZXJfX2l0ZW0nKTsvL9GB0L7RhdGA0LDQvdGP0LXQvCDQstGB0LUg0YHQu9Cw0LnQtNGLXG5cdFx0XHRcdGxldCBhY3RpdmVTbGlkZSA9IHNsaWRlcy5maWx0ZXIoJy5zbGlkZXJfX2l0ZW0tLWFjdGl2ZScpO1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKGFjdGl2ZVNsaWRlKVxuXHRcdFx0XHRsZXQgbmV4dFNsaWRlID0gYWN0aXZlU2xpZGUubmV4dCgpO1xuXHRcdFx0XHRsZXQgcHJldlNsaWRlID0gYWN0aXZlU2xpZGUucHJldigpO1xuXHRcdFx0XHRsZXQgZmlyc3RTbGlkZSA9IHNsaWRlcy5maXJzdCgpO1xuXHRcdFx0XHRsZXQgbGFzdFNsaWRlID0gc2xpZGVzLmxhc3QoKTtcblxuXHRcdFx0XHRpZigkdGhpcy5oYXNDbGFzcygnc2xpZGVyX19hcnJvdy0tcmlnaHQnKSkge1xuXHRcdFx0XHRcdGlmKG5leHRTbGlkZS5sZW5ndGgpe1xuXHRcdFx0XHRcdFx0X3RoaXMubW92ZVNsaWRlcihuZXh0U2xpZGUsICdmb3J3YXJkJyk7IC8v0LXRgdC70Lgg0LXRgdGC0Ywg0L/QtdGA0LLRi9C5INGB0LvQsNC50LQg0LTQstC40LPQsNC10Lwg0LrQsNC6INC+0LHRi9GH0L3QvlxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRfdGhpcy5tb3ZlU2xpZGVyKGZpcnN0U2xpZGUsICdmb3J3YXJkJyk7IC8vINC10YHQu9GCINC90LXRjCDRgtC+INC00LLQuNCz0LDQtdC8INC/0LXRgNCy0YvQuSDQt9CwINC/0L7RgdC70LXQtNC90LjQvFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZihwcmV2U2xpZGUubGVuZ3RoKXtcblx0XHRcdFx0XHRcdF90aGlzLm1vdmVTbGlkZXIocHJldlNsaWRlLCAnYmFja3dhcmQnKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0X3RoaXMubW92ZVNsaWRlcihsYXN0U2xpZGUsICdiYWNrd2FyZCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0fSlcblxuXHRcdH0sXG5cdFx0bW92ZVNsaWRlcjogZnVuY3Rpb24oc2xpZGUsIGRpcmVjdGlvbil7XG5cdFx0XHRsZXQgY29udGFpbmVyID0gc2xpZGUuY2xvc2VzdCgnLnNsaWRlcicpO1xuXHRcdFx0bGV0IHNsaWRlcyA9IGNvbnRhaW5lci5maW5kKCcuc2xpZGVyX19pdGVtJyk7XG5cdFx0XHRsZXQgYWN0aXZlU2xpZGUgPSBzbGlkZXMuZmlsdGVyKCcuc2xpZGVyX19pdGVtLS1hY3RpdmUnKTtcblx0XHRcdGxldCBzbGlkZVdpZHRoID0gc2xpZGVzLndpZHRoKCk7IC8vINC30L3QsNGH0LXQvdC40LUg0YjQuNGA0LjQvdGLINC/0LXRgNCy0L7Qs9C+INGB0LvQsNC50LTQsFxuXHRcdFx0bGV0IGR1cmF0aW9uID0gMTAwMDtcblx0XHRcdGxldCBjc3NQb3NpdGlvbiA9IDA7IC8vINC/0L7Qt9C40YbQuNGPINCyINC60L7RgiDQv9C10YDQtdC00LLQuNCz0LDQtdC8INGB0LvQsNC50LQg0LrQvtGCINC90YPQttC90L4g0YHQtNCy0LjQvdGD0YLRjFxuXHRcdFx0bGV0IHNsaWRlTW92ZSA9IDA7IC8vINC90LXQvtCx0YXQvtC00LjQvNC+0LUg0YHQvNC10YnQtdC90LjQtSDQv9C40LrRgdC10LvQtdC5XG5cblx0XHRcdGlmKGRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnKXsgLy8g0LXRgdC70Lgg0LvQuNGB0YLQsNC10Lwg0LLQv9C10YDQtdC0XG5cdFx0XHRcdGNzc1Bvc2l0aW9uID0gc2xpZGVXaWR0aDsgLy8g0YHQtNC40LPQsNC10Lwg0L3QsCDRiNC40YDQuNC90YMg0YHQu9Cw0LnQtNCwINC80LXQvdGP0LXQvCBsZWZ0IDBcblx0XHRcdFx0c2xpZGVNb3ZlID0gLXNsaWRlV2lkdGhcblx0XHRcdH0gZWxzZSBpZihkaXJlY3Rpb24gPT09ICdiYWNrd2FyZCcpeyAvLyDQtdGB0LvQuCDQu9C40YHRgtCw0LXQvCDQstC/0LXRgNC10LQg0LLRgdC1INC90LDQvtCx0L7RgNC+0YJcblx0XHRcdFx0Y3NzUG9zaXRpb24gPSAtc2xpZGVXaWR0aDtcblx0XHRcdFx0c2xpZGVNb3ZlID0gc2xpZGVXaWR0aFxuXHRcdFx0fVxuICAgICAgLy8g0L/QtdGA0LXQtNCw0L3QvdGL0Lkg0YHQu9Cw0LnQtCDQsiDRhCDRgdC80LXRgdGC0LjQvCDQvdCwINC90YPQttC90YPRjiDQv9C+0LfQuNGG0LjRjlxuXHRcdFx0c2xpZGUuY3NzKCdsZWZ0JywgY3NzUG9zaXRpb24pLmFkZENsYXNzKCdzbGlkZXJfX2l0ZW0tLWluc2xpZGUnKTtcblxuICAgICAgLy8g0LTQstC40LPQsNGOINC90YPQttC90YvQuSDQutC70LDRgdGBXG5cdFx0XHRsZXQgc2xpZGVJbk1vdmUgPSBzbGlkZXMuZmlsdGVyKCcuc2xpZGVyX19pdGVtLS1pbnNsaWRlJyk7XG5cdFx0XHRhY3RpdmVTbGlkZS5hbmltYXRlKHtsZWZ0OiBzbGlkZU1vdmV9LCBkdXJhdGlvbik7XG5cdFx0XHRzbGlkZUluTW92ZS5hbmltYXRlKHtsZWZ0OiAwfSwgZHVyYXRpb24sIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGxldCAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHRcdHNsaWRlcy5jc3MoJ2xlZnQnLCAnMCcpLnJlbW92ZUNsYXNzKCdzbGlkZXJfX2l0ZW0tLWFjdGl2ZScpO1xuXHRcdFx0XHQkdGhpcy50b2dnbGVDbGFzcygnc2xpZGVyX19pdGVtLS1pbnNsaWRlIHNsaWRlcl9faXRlbS0tYWN0aXZlJyk7Ly/RgdC70LDQudC0INC60L7RgiDQv9GA0LjQtdGF0LDQu1xuXHRcdFx0fSlcblx0XHR9XG5cdH1cblxufSgpKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblx0aWYoJCgnLnNsaWRlcicpLmxlbmd0aCl7XG5cdFx0c2xpZGVyLmluaXQoKTtcblx0fVxufSk7XG5cbi8qbW9iaWwgbmF2Ki9cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4kKCcuaGVhZGVyX19tb2JpbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdvbicpO1xuICAgICAgICAgJCgnI21vYmlsLW5hdicpLnRvZ2dsZUNsYXNzKCdtb2JpbC1uYXYtLW5vZGlzcGxheScpXG4gICAgICB9KVxuJCgnLm1vYmlsLW5hdl9fbGlzdCcpLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKXtcbiAgICQoJyNtb2JpbC1uYXYtdG9nZ2xlJykudG9nZ2xlQ2xhc3MoJ29uJyk7XG4gICAkKCcjbW9iaWwtbmF2JykudG9nZ2xlQ2xhc3MoJ21vYmlsLW5hdi0tbm9kaXNwbGF5Jyk7XG59KVxufSk7XG4vKmVuZCBtb2JpbCBuYXYqL1xuXG4vKnN0aWNreSBuYXYqL1xuJChmdW5jdGlvbigpe1xuICAgIGxldCBzdGlja3lOYXZfb2Zmc2V0ID0gJCgnLmhlYWRlcl9fbWVudScpLm9mZnNldCgpLnRvcDtcbiAgICBsZXQgc3RpY2t5TmF2ID0gZnVuY3Rpb24oKXtcbiAgICBcdGxldCBzY3JvbGxfdG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgIFx0aWYoc2Nyb2xsX3RvcCA+IHN0aWNreU5hdl9vZmZzZXQpe1xuICAgIFx0XHQkKCcuaGVhZGVyX19tZW51JykuYWRkQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgXHR9ZWxzZXtcbiAgICBcdFx0JCgnLmhlYWRlcl9fbWVudScpLnJlbW92ZUNsYXNzKCdmaXhlZCcpO1xuICAgIFx0fVxuICAgIH07XG4gICAgc3RpY2t5TmF2KCk7XG5cbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7XG4gICAgXHRzdGlja3lOYXYoKTtcbiAgIH0pXG59KTtcbi8qZW5kIHN0aWNreSBuYXYqL1xuXG4vKmN1dCBib2R5IHRleHQqL1xubGV0IHRleHRQb3N0SW5CbG9nUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3N0cGljX190ZXh0Jyk7XG4gICAgaWYodGV4dFBvc3RJbkJsb2dQYWdlKXtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0ZXh0UG9zdEluQmxvZ1BhZ2UubGVuZ3RoOyBpKyspe1xuICAgICAgbGV0IHRleHQgPSB0ZXh0UG9zdEluQmxvZ1BhZ2VbaV1cbiAgICAgIHRleHQuaW5uZXJIVE1MID0gdGV4dC5pbm5lckhUTUwuc2xpY2UoMCwyNTApICsgJy4uLidcbn1cbn1cblxubGV0IHRleHRQb3N0SW5JbmRleFBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYXJ0aWNsZXNfX2Rlc2NyJyk7XG4gICAgaWYoIHRleHRQb3N0SW5JbmRleFBhZ2Upe1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8ICB0ZXh0UG9zdEluSW5kZXhQYWdlLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCB0ZXh0ID0gdGV4dFBvc3RJbkluZGV4UGFnZVtpXVxuICAgICAgdGV4dC5pbm5lckhUTUwgPSB0ZXh0LmlubmVySFRNTC5zbGljZSgwLDgwKSArICcuLi4nXG59XG59XG4vKmVuZCBjdXQgYm9keSB0ZXh0Ki9cblxuLyogdXBsb2FkIGJsb2cgKi9cblxuKGZ1bmN0aW9uKCkge1xuXG5jb25zdCBmb3JtVXBsb2FkQmxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1cGxvYWRibG9nJyk7XG5jb25zdCBmb3JtVXBsb2FkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VwbG9hZCcpO1xuXG4vL2ZpbGVVcGxvYWQg0L7QsdGA0LDQsdCw0YLRi9Cy0LDQtdGCINGB0YLQsNGC0YPRgVxuZnVuY3Rpb24gZmlsZVVwbG9hZCh1cmwsIGRhdGEsIGNiKSB7IC8vINC/0YDQuNC90LjQvNCw0LXRgiB1cmwsINC60LDQutC40LUg0YLQviDQt9C90LDRh9C10L3QuNGPINC4INCy0YvQt9GL0LLQsNC10YIgY2FsbGJhY2tcbiAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICB4aHIub3BlbignUE9TVCcsIHVybCwgdHJ1ZSk7IC8vIFBPU1Qg0L7RgtC/0YDQsNCy0LvRj9C10Lwg0L3QsCDRgdC10YDQstC10YBcblxuXHR4aHIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcblx0XHRsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTsgLy8geGhyLnJlc3BvbnNlVGV4dCA9IHtcInN0YXR1c1wiOlwi0JrQsNGA0YLQuNC90LrQsCDRg9GB0L/QtdGI0L3QviDQt9Cw0LPRgNGD0LbQtdC90LBcIn1cblx0XHRjYihyZXN1bHQuc3RhdHVzKTsgLy8gc3RhdHVzINCy0YvQt9GL0LLQsNC10Lwg0Lgg0LLQvtC30LLRgNCw0YnQsNC10Lwg0L7QsdGA0LDRgtC90L5cbiAgfTtcbiAgXG4gIHhoci5zZW5kKGRhdGEpOyAvLyBkYXRhINC+0YLQv9GA0LDQstC70Y/QtdC8INC90LAg0YHQtdGA0LLQtdGAXG59XG5cbi8qdXBsb2FkIHBpY3R1cmVzICsgYmxvZyBwb3N0Ki9cbmZ1bmN0aW9uIHByZXBhcmVTZW5kQmxvZ3BpYyhlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgbGV0IHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcbiAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gIGxldCBmaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbGUtc2VsZWN0JykuZmlsZXNbMF07IC8vINC/0L7Qu9GD0YfQsNC10Lwg0YHQsNC8INGE0LDQudC7XG4gIGxldCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbGUtZGVzYycpLnZhbHVlOyAvLyDQuNC80Y8g0YTQsNC50LvQsCAo0L7Qv9C40YHQsNC90LjQtSlcbiAgbGV0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbGUtdGl0bGUnKS52YWx1ZTtcbiAgbGV0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmlsZS1kYXRlJykudmFsdWU7XG5cbiAgZm9ybURhdGEuYXBwZW5kKCdwaG90bycsIGZpbGUsIGZpbGUubmFtZSk7IC8vINCy0YHRgtCw0LLQvtGP0LXQvCDRhNCw0LnQu1xuICBmb3JtRGF0YS5hcHBlbmQoJ25hbWUnLCBuYW1lKTsgLy8g0LLRgdGC0LDQstC70Y/QtdC8INC+0L/QuNGB0LDQvdC40LVcbiAgZm9ybURhdGEuYXBwZW5kKCdkYXRlJywgZGF0ZSk7XG4gIGZvcm1EYXRhLmFwcGVuZCgndGl0bGUnLCB0aXRsZSk7XG5cbiAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICfQl9Cw0LPRgNGD0LfQutCwLi4uJztcbiAgXG4gIGZpbGVVcGxvYWQoJy9hZGRwb3N0LXNpZGViYXInLCBmb3JtRGF0YSwgZnVuY3Rpb24oZGF0YSkgeyAvLyBkYXRhIC0g0YDQtdC30YPQu9GM0YLQsNGCIEFKQVgg0LfQsNC/0YDQvtGB0LAsINC60L7RgiDQv9C10YDQtdC00LDQvCDQsiBjYlxuICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xuICAgIH0pO1xuICB9O1xuXG5pZihmb3JtVXBsb2FkQmxvZykge1xuICBmb3JtVXBsb2FkQmxvZy5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZEJsb2dwaWMpO1xufTtcblxuLyp1cGxvYWQgcGljdHVyZXMqL1xuZnVuY3Rpb24gcHJlcGFyZVNlbmRGaWxlKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBsZXQgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgbGV0IGZpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmlsZS1zZWxlY3QnKS5maWxlc1swXTtcbiAgbGV0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmlsZS1kZXNjJykudmFsdWU7XG5cbiAgZm9ybURhdGEuYXBwZW5kKCdwaG90bycsIGZpbGUsIGZpbGUubmFtZSk7XG4gIGZvcm1EYXRhLmFwcGVuZCgnbmFtZScsIG5hbWUpO1xuXG4gIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAn0JfQsNCz0YDRg9C30LrQsC4uLic7XG4gIGZpbGVVcGxvYWQoJy91cGxvYWQnLCBmb3JtRGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcbiAgfSk7XG59XG5cbmlmKGZvcm1VcGxvYWQpIHtcbiAgZm9ybVVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBwcmVwYXJlU2VuZEZpbGUpO1xufVxuXG59KCkpO1xuXG5cbi8qIGNvbnRhY3QgZm9ybSBzZW5kIG1haWwgZGF0YSovXG4oZnVuY3Rpb24oKSB7XG5cbmNvbnN0IGZvcm1NYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haWwnKTtcblxuaWYgKGZvcm1NYWlsKSB7XG4gIGZvcm1NYWlsLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kTWFpbCk7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVTZW5kTWFpbChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgbGV0IHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcbiAgbGV0IGRhdGEgPSB7XG4gICAgc3ViamVjdDogZm9ybU1haWwuc3ViamVjdC52YWx1ZSxcbiAgICBlbWFpbDogZm9ybU1haWwuZW1haWwudmFsdWUsXG4gICAgdGV4dDogZm9ybU1haWwudGV4dC52YWx1ZVxuICB9O1xuICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJ9Ce0YLQv9GA0LDQstC60LAuLi4nO1xuICBzZW5kQWpheEpzb24oJy9jb250YWN0JywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNlbmRBamF4SnNvbih1cmwsIGRhdGEsIGNiKSB7XG4gIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgeGhyLm9wZW4oJ1BPU1QnLCB1cmwsIHRydWUpO1xuICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgY2IocmVzdWx0LnN0YXR1cyk7XG4gIH07XG4gIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbn1cblxufSgpKTtcbi8qIGVuZCBjb250YWN0IGZvcm0gc2VuZCBtYWlsIGRhdGEqL1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXG4gIGxldCBkZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLWRlbCcpO1xuICBpZihkZWxCdG4pe1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkZWxCdG4ubGVuZ3RoOyBpKyspe1xuICAgICAgZGVsQnRuW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoZScpXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgIGNvbnN0IGlkID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xuICAgIGNvbnNvbGUubG9nKGlkKVxuICAgICQuYWpheCh7XG4gICAgICB0eXBlOiAnREVMRVRFJyxcbiAgICAgIHVybDogJy9ibG9nLXNpZGViYXIvJytpZCxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgYWxlcnQoJ9CS0Ysg0YPQtNCw0LvRj9C10YLQtSDRgdGC0LDRgtGM0Y4nKTtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWY9Jy9ibG9nLXNpZGViYXInO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbihlcnIpe1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICB9XG4gICAgfSk7XG4gIH0pXG4gICAgfVxuICAgIFxuICB9XG4gIFxufSk7XG4iXX0=
