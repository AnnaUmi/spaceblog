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
