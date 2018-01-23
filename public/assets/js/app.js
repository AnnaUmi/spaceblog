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

$(function () { 
    $('.menu__link').each(function () {
        var location = window.location.href;
        var link = this.href; 
        if(location == link) {
            $(this).addClass('menu__link--active');
        }
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgc2xpZGVyID0gKGZ1bmN0aW9uKCl7XG5cdHJldHVybiB7XG5cdFx0aW5pdDogZnVuY3Rpb24oKXtcblx0XHRcdGxldCBfdGhpcyA9IHRoaXM7XG5cdFx0XHQkKCcuc2xpZGVyX19hcnJvdycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vINC+0LHQvdCw0YDRg9C20LDQtdC8INGB0LvQsNC50LTQtdGAINC60L7RgiDQvdGD0LbQvdC+INGB0LTQstC40L3Rg9GC0Yxcblx0XHRcdFx0bGV0ICR0aGlzID0gJCh0aGlzKTsgLy/RgdC+0YXRgNCw0L3Rj9C10Lwg0LXQs9C+INCyICR0aGlzXG5cdFx0XHRcdGxldCBzbGlkZXMgPSAkdGhpcy5jbG9zZXN0KCcuc2xpZGVyJykuZmluZCgnLnNsaWRlcl9faXRlbScpOy8v0YHQvtGF0YDQsNC90Y/QtdC8INCy0YHQtSDRgdC70LDQudC00Ytcblx0XHRcdFx0bGV0IGFjdGl2ZVNsaWRlID0gc2xpZGVzLmZpbHRlcignLnNsaWRlcl9faXRlbS0tYWN0aXZlJyk7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coYWN0aXZlU2xpZGUpXG5cdFx0XHRcdGxldCBuZXh0U2xpZGUgPSBhY3RpdmVTbGlkZS5uZXh0KCk7XG5cdFx0XHRcdGxldCBwcmV2U2xpZGUgPSBhY3RpdmVTbGlkZS5wcmV2KCk7XG5cdFx0XHRcdGxldCBmaXJzdFNsaWRlID0gc2xpZGVzLmZpcnN0KCk7XG5cdFx0XHRcdGxldCBsYXN0U2xpZGUgPSBzbGlkZXMubGFzdCgpO1xuXG5cdFx0XHRcdGlmKCR0aGlzLmhhc0NsYXNzKCdzbGlkZXJfX2Fycm93LS1yaWdodCcpKSB7XG5cdFx0XHRcdFx0aWYobmV4dFNsaWRlLmxlbmd0aCl7XG5cdFx0XHRcdFx0XHRfdGhpcy5tb3ZlU2xpZGVyKG5leHRTbGlkZSwgJ2ZvcndhcmQnKTsgLy/QtdGB0LvQuCDQtdGB0YLRjCDQv9C10YDQstGL0Lkg0YHQu9Cw0LnQtCDQtNCy0LjQs9Cw0LXQvCDQutCw0Log0L7QsdGL0YfQvdC+XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdF90aGlzLm1vdmVTbGlkZXIoZmlyc3RTbGlkZSwgJ2ZvcndhcmQnKTsgLy8g0LXRgdC70YIg0L3QtdGMINGC0L4g0LTQstC40LPQsNC10Lwg0L/QtdGA0LLRi9C5INC30LAg0L/QvtGB0LvQtdC00L3QuNC8XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmKHByZXZTbGlkZS5sZW5ndGgpe1xuXHRcdFx0XHRcdFx0X3RoaXMubW92ZVNsaWRlcihwcmV2U2xpZGUsICdiYWNrd2FyZCcpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRfdGhpcy5tb3ZlU2xpZGVyKGxhc3RTbGlkZSwgJ2JhY2t3YXJkJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXG5cdFx0fSxcblx0XHRtb3ZlU2xpZGVyOiBmdW5jdGlvbihzbGlkZSwgZGlyZWN0aW9uKXtcblx0XHRcdGxldCBjb250YWluZXIgPSBzbGlkZS5jbG9zZXN0KCcuc2xpZGVyJyk7XG5cdFx0XHRsZXQgc2xpZGVzID0gY29udGFpbmVyLmZpbmQoJy5zbGlkZXJfX2l0ZW0nKTtcblx0XHRcdGxldCBhY3RpdmVTbGlkZSA9IHNsaWRlcy5maWx0ZXIoJy5zbGlkZXJfX2l0ZW0tLWFjdGl2ZScpO1xuXHRcdFx0bGV0IHNsaWRlV2lkdGggPSBzbGlkZXMud2lkdGgoKTsgLy8g0LfQvdCw0YfQtdC90LjQtSDRiNC40YDQuNC90Ysg0L/QtdGA0LLQvtCz0L4g0YHQu9Cw0LnQtNCwXG5cdFx0XHRsZXQgZHVyYXRpb24gPSAxMDAwO1xuXHRcdFx0bGV0IGNzc1Bvc2l0aW9uID0gMDsgLy8g0L/QvtC30LjRhtC40Y8g0LIg0LrQvtGCINC/0LXRgNC10LTQstC40LPQsNC10Lwg0YHQu9Cw0LnQtCDQutC+0YIg0L3Rg9C20L3QviDRgdC00LLQuNC90YPRgtGMXG5cdFx0XHRsZXQgc2xpZGVNb3ZlID0gMDsgLy8g0L3QtdC+0LHRhdC+0LTQuNC80L7QtSDRgdC80LXRidC10L3QuNC1INC/0LjQutGB0LXQu9C10LlcblxuXHRcdFx0aWYoZGlyZWN0aW9uID09PSAnZm9yd2FyZCcpeyAvLyDQtdGB0LvQuCDQu9C40YHRgtCw0LXQvCDQstC/0LXRgNC10LRcblx0XHRcdFx0Y3NzUG9zaXRpb24gPSBzbGlkZVdpZHRoOyAvLyDRgdC00LjQs9Cw0LXQvCDQvdCwINGI0LjRgNC40L3RgyDRgdC70LDQudC00LAg0LzQtdC90Y/QtdC8IGxlZnQgMFxuXHRcdFx0XHRzbGlkZU1vdmUgPSAtc2xpZGVXaWR0aFxuXHRcdFx0fSBlbHNlIGlmKGRpcmVjdGlvbiA9PT0gJ2JhY2t3YXJkJyl7IC8vINC10YHQu9C4INC70LjRgdGC0LDQtdC8INCy0L/QtdGA0LXQtCDQstGB0LUg0L3QsNC+0LHQvtGA0L7RglxuXHRcdFx0XHRjc3NQb3NpdGlvbiA9IC1zbGlkZVdpZHRoO1xuXHRcdFx0XHRzbGlkZU1vdmUgPSBzbGlkZVdpZHRoXG5cdFx0XHR9XG4gICAgICAvLyDQv9C10YDQtdC00LDQvdC90YvQuSDRgdC70LDQudC0INCyINGEINGB0LzQtdGB0YLQuNC8INC90LAg0L3Rg9C20L3Rg9GOINC/0L7Qt9C40YbQuNGOXG5cdFx0XHRzbGlkZS5jc3MoJ2xlZnQnLCBjc3NQb3NpdGlvbikuYWRkQ2xhc3MoJ3NsaWRlcl9faXRlbS0taW5zbGlkZScpO1xuXG4gICAgICAvLyDQtNCy0LjQs9Cw0Y4g0L3Rg9C20L3Ri9C5INC60LvQsNGB0YFcblx0XHRcdGxldCBzbGlkZUluTW92ZSA9IHNsaWRlcy5maWx0ZXIoJy5zbGlkZXJfX2l0ZW0tLWluc2xpZGUnKTtcblx0XHRcdGFjdGl2ZVNsaWRlLmFuaW1hdGUoe2xlZnQ6IHNsaWRlTW92ZX0sIGR1cmF0aW9uKTtcblx0XHRcdHNsaWRlSW5Nb3ZlLmFuaW1hdGUoe2xlZnQ6IDB9LCBkdXJhdGlvbiwgZnVuY3Rpb24oKXtcblx0XHRcdFx0bGV0ICR0aGlzID0gJCh0aGlzKTtcblx0XHRcdFx0c2xpZGVzLmNzcygnbGVmdCcsICcwJykucmVtb3ZlQ2xhc3MoJ3NsaWRlcl9faXRlbS0tYWN0aXZlJyk7XG5cdFx0XHRcdCR0aGlzLnRvZ2dsZUNsYXNzKCdzbGlkZXJfX2l0ZW0tLWluc2xpZGUgc2xpZGVyX19pdGVtLS1hY3RpdmUnKTsvL9GB0LvQsNC50LQg0LrQvtGCINC/0YDQuNC10YXQsNC7XG5cdFx0XHR9KVxuXHRcdH1cblx0fVxuXG59KCkpO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXHRpZigkKCcuc2xpZGVyJykubGVuZ3RoKXtcblx0XHRzbGlkZXIuaW5pdCgpO1xuXHR9XG59KTtcblxuLyptb2JpbCBuYXYqL1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiQoJy5oZWFkZXJfX21vYmlsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ29uJyk7XG4gICAgICAgICAkKCcjbW9iaWwtbmF2JykudG9nZ2xlQ2xhc3MoJ21vYmlsLW5hdi0tbm9kaXNwbGF5JylcbiAgICAgIH0pXG4kKCcubW9iaWwtbmF2X19saXN0Jykub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpe1xuICAgJCgnI21vYmlsLW5hdi10b2dnbGUnKS50b2dnbGVDbGFzcygnb24nKTtcbiAgICQoJyNtb2JpbC1uYXYnKS50b2dnbGVDbGFzcygnbW9iaWwtbmF2LS1ub2Rpc3BsYXknKTtcbn0pXG59KTtcbi8qZW5kIG1vYmlsIG5hdiovXG5cbi8qc3RpY2t5IG5hdiovXG4kKGZ1bmN0aW9uKCl7XG4gICAgbGV0IHN0aWNreU5hdl9vZmZzZXQgPSAkKCcuaGVhZGVyX19tZW51Jykub2Zmc2V0KCkudG9wO1xuICAgIGxldCBzdGlja3lOYXYgPSBmdW5jdGlvbigpe1xuICAgIFx0bGV0IHNjcm9sbF90b3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgXHRpZihzY3JvbGxfdG9wID4gc3RpY2t5TmF2X29mZnNldCl7XG4gICAgXHRcdCQoJy5oZWFkZXJfX21lbnUnKS5hZGRDbGFzcygnZml4ZWQnKTtcbiAgICBcdH1lbHNle1xuICAgIFx0XHQkKCcuaGVhZGVyX19tZW51JykucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XG4gICAgXHR9XG4gICAgfTtcbiAgICBzdGlja3lOYXYoKTtcblxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXtcbiAgICBcdHN0aWNreU5hdigpO1xuICAgfSlcbn0pO1xuLyplbmQgc3RpY2t5IG5hdiovXG5cbi8qY3V0IGJvZHkgdGV4dCovXG5sZXQgdGV4dFBvc3RJbkJsb2dQYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvc3RwaWNfX3RleHQnKTtcbiAgICBpZih0ZXh0UG9zdEluQmxvZ1BhZ2Upe1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRleHRQb3N0SW5CbG9nUGFnZS5sZW5ndGg7IGkrKyl7XG4gICAgICBsZXQgdGV4dCA9IHRleHRQb3N0SW5CbG9nUGFnZVtpXVxuICAgICAgdGV4dC5pbm5lckhUTUwgPSB0ZXh0LmlubmVySFRNTC5zbGljZSgwLDI1MCkgKyAnLi4uJ1xufVxufVxuXG5sZXQgdGV4dFBvc3RJbkluZGV4UGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hcnRpY2xlc19fZGVzY3InKTtcbiAgICBpZiggdGV4dFBvc3RJbkluZGV4UGFnZSl7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgIHRleHRQb3N0SW5JbmRleFBhZ2UubGVuZ3RoOyBpKyspe1xuICAgICAgbGV0IHRleHQgPSB0ZXh0UG9zdEluSW5kZXhQYWdlW2ldXG4gICAgICB0ZXh0LmlubmVySFRNTCA9IHRleHQuaW5uZXJIVE1MLnNsaWNlKDAsODApICsgJy4uLidcbn1cbn1cbi8qZW5kIGN1dCBib2R5IHRleHQqL1xuXG4vKiB1cGxvYWQgYmxvZyAqL1xuXG4oZnVuY3Rpb24oKSB7XG5cbmNvbnN0IGZvcm1VcGxvYWRCbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VwbG9hZGJsb2cnKTtcbmNvbnN0IGZvcm1VcGxvYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXBsb2FkJyk7XG5cbi8vZmlsZVVwbG9hZCDQvtCx0YDQsNCx0LDRgtGL0LLQsNC10YIg0YHRgtCw0YLRg9GBXG5mdW5jdGlvbiBmaWxlVXBsb2FkKHVybCwgZGF0YSwgY2IpIHsgLy8g0L/RgNC40L3QuNC80LDQtdGCIHVybCwg0LrQsNC60LjQtSDRgtC+INC30L3QsNGH0LXQvdC40Y8g0Lgg0LLRi9C30YvQstCw0LXRgiBjYWxsYmFja1xuICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHhoci5vcGVuKCdQT1NUJywgdXJsLCB0cnVlKTsgLy8gUE9TVCDQvtGC0L/RgNCw0LLQu9GP0LXQvCDQvdCwINGB0LXRgNCy0LXRgFxuXG5cdHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuXHRcdGxldCByZXN1bHQgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpOyAvLyB4aHIucmVzcG9uc2VUZXh0ID0ge1wic3RhdHVzXCI6XCLQmtCw0YDRgtC40L3QutCwINGD0YHQv9C10YjQvdC+INC30LDQs9GA0YPQttC10L3QsFwifVxuXHRcdGNiKHJlc3VsdC5zdGF0dXMpOyAvLyBzdGF0dXMg0LLRi9C30YvQstCw0LXQvCDQuCDQstC+0LfQstGA0LDRidCw0LXQvCDQvtCx0YDQsNGC0L3QvlxuICB9O1xuICBcbiAgeGhyLnNlbmQoZGF0YSk7IC8vIGRhdGEg0L7RgtC/0YDQsNCy0LvRj9C10Lwg0L3QsCDRgdC10YDQstC10YBcbn1cblxuLyp1cGxvYWQgcGljdHVyZXMgKyBibG9nIHBvc3QqL1xuZnVuY3Rpb24gcHJlcGFyZVNlbmRCbG9ncGljKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBsZXQgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgbGV0IGZpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmlsZS1zZWxlY3QnKS5maWxlc1swXTsgLy8g0L/QvtC70YPRh9Cw0LXQvCDRgdCw0Lwg0YTQsNC50LtcbiAgbGV0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmlsZS1kZXNjJykudmFsdWU7IC8vINC40LzRjyDRhNCw0LnQu9CwICjQvtC/0LjRgdCw0L3QuNC1KVxuICBsZXQgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmlsZS10aXRsZScpLnZhbHVlO1xuICBsZXQgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLWRhdGUnKS52YWx1ZTtcblxuICBmb3JtRGF0YS5hcHBlbmQoJ3Bob3RvJywgZmlsZSwgZmlsZS5uYW1lKTsgLy8g0LLRgdGC0LDQstC+0Y/QtdC8INGE0LDQudC7XG4gIGZvcm1EYXRhLmFwcGVuZCgnbmFtZScsIG5hbWUpOyAvLyDQstGB0YLQsNCy0LvRj9C10Lwg0L7Qv9C40YHQsNC90LjQtVxuICBmb3JtRGF0YS5hcHBlbmQoJ2RhdGUnLCBkYXRlKTtcbiAgZm9ybURhdGEuYXBwZW5kKCd0aXRsZScsIHRpdGxlKTtcblxuICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJ9CX0LDQs9GA0YPQt9C60LAuLi4nO1xuICBcbiAgZmlsZVVwbG9hZCgnL2FkZHBvc3Qtc2lkZWJhcicsIGZvcm1EYXRhLCBmdW5jdGlvbihkYXRhKSB7IC8vIGRhdGEgLSDRgNC10LfRg9C70YzRgtCw0YIgQUpBWCDQt9Cw0L/RgNC+0YHQsCwg0LrQvtGCINC/0LXRgNC10LTQsNC8INCyIGNiXG4gICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XG4gICAgfSk7XG4gIH07XG5cbmlmKGZvcm1VcGxvYWRCbG9nKSB7XG4gIGZvcm1VcGxvYWRCbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kQmxvZ3BpYyk7XG59O1xuXG4vKnVwbG9hZCBwaWN0dXJlcyovXG5mdW5jdGlvbiBwcmVwYXJlU2VuZEZpbGUoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGxldCByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICBsZXQgZmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLXNlbGVjdCcpLmZpbGVzWzBdO1xuICBsZXQgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLWRlc2MnKS52YWx1ZTtcblxuICBmb3JtRGF0YS5hcHBlbmQoJ3Bob3RvJywgZmlsZSwgZmlsZS5uYW1lKTtcbiAgZm9ybURhdGEuYXBwZW5kKCduYW1lJywgbmFtZSk7XG5cbiAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICfQl9Cw0LPRgNGD0LfQutCwLi4uJztcbiAgZmlsZVVwbG9hZCgnL3VwbG9hZCcsIGZvcm1EYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xuICB9KTtcbn1cblxuaWYoZm9ybVVwbG9hZCkge1xuICBmb3JtVXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kRmlsZSk7XG59XG5cbn0oKSk7XG5cblxuLyogY29udGFjdCBmb3JtIHNlbmQgbWFpbCBkYXRhKi9cbihmdW5jdGlvbigpIHtcblxuY29uc3QgZm9ybU1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbCcpO1xuXG5pZiAoZm9ybU1haWwpIHtcbiAgZm9ybU1haWwuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZVNlbmRNYWlsKTtcbn1cblxuZnVuY3Rpb24gcHJlcGFyZVNlbmRNYWlsKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBsZXQgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICBsZXQgZGF0YSA9IHtcbiAgICBzdWJqZWN0OiBmb3JtTWFpbC5zdWJqZWN0LnZhbHVlLFxuICAgIGVtYWlsOiBmb3JtTWFpbC5lbWFpbC52YWx1ZSxcbiAgICB0ZXh0OiBmb3JtTWFpbC50ZXh0LnZhbHVlXG4gIH07XG4gIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAn0J7RgtC/0YDQsNCy0LrQsC4uLic7XG4gIHNlbmRBamF4SnNvbignL2NvbnRhY3QnLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2VuZEFqYXhKc29uKHVybCwgZGF0YSwgY2IpIHtcbiAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICB4aHIub3BlbignUE9TVCcsIHVybCwgdHJ1ZSk7XG4gIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICB4aHIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcbiAgICBsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICBjYihyZXN1bHQuc3RhdHVzKTtcbiAgfTtcbiAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xufVxuXG59KCkpO1xuLyogZW5kIGNvbnRhY3QgZm9ybSBzZW5kIG1haWwgZGF0YSovXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cbiAgbGV0IGRlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tZGVsJyk7XG4gIGlmKGRlbEJ0bil7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGRlbEJ0bi5sZW5ndGg7IGkrKyl7XG4gICAgICBkZWxCdG5baV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2hlJylcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgY29uc3QgaWQgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XG4gICAgY29uc29sZS5sb2coaWQpXG4gICAgJC5hamF4KHtcbiAgICAgIHR5cGU6ICdERUxFVEUnLFxuICAgICAgdXJsOiAnL2Jsb2ctc2lkZWJhci8nK2lkLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICBhbGVydCgn0JLRiyDRg9C00LDQu9GP0LXRgtC1INGB0YLQsNGC0YzRjicpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZj0nL2Jsb2ctc2lkZWJhcic7XG4gICAgICB9LFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycil7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgIH1cbiAgICB9KTtcbiAgfSlcbiAgICB9XG4gICAgXG4gIH1cbiAgXG59KTtcblxuJChmdW5jdGlvbiAoKSB7IFxuICAgICQoJy5tZW51X19saW5rJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICB2YXIgbGluayA9IHRoaXMuaHJlZjsgXG4gICAgICAgIGlmKGxvY2F0aW9uID09IGxpbmspIHtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ21lbnVfX2xpbmstLWFjdGl2ZScpO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcbiJdfQ==
