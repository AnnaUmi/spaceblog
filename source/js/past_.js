// получили все переменные с сайта
const blogForm = document.getElementById('blog__form');
const addInputText = document.getElementById('blog__input');
const addInputTitle = document.getElementById('blog__title');
const addInputDate = document.getElementById('blog__date');
const blogImg = document.getElementById('blog__img');
const blogList = document.getElementById('blog__list')
const blogItems = document.querySelectorAll('.blog__item');

function addBlogItem(event){
	if(addInputText.value === '' || addInputText.value === '' ) {
        return  alert('Введите текст  полей поста');
    }
}

blogForm.addEventListener('submit', addBlogItem);

function createBlogItem(title){
	const articleTitle = document.createElement('h1');
	articleTitle.textContent = title;
	articleTitle.className = 'blog__title';

	const blogImg = document.createElement('img');
	let url = URL.createObjectURL(blogImg.files[0]);
    blogImg.src = url;
}