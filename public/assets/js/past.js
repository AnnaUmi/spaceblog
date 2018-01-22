/*blog*/
const init = (document => {
    
  function createElement(tagName, tagProps, ...children ){
    const element = document.createElement(tagName);
    Object.keys(tagProps).forEach(key => element[key] = tagProps[key]);// element.type = tagProps.type, element.className = tagProps.className;
    if(children.length > 0){
        children.forEach(child => {
            if(typeof child === 'string'){
                child = document.createTextNode(child)
            }
            element.appendChild(child);
        })
    }
    return element;
}
function createBlogItem(addInputTitleValue, blogImgValue, addInputTextTitleValue, addInputDateValue){
    const articleTitle = createElement('h1', { className: 'blog__title' });
    articleTitle.innerText = addInputTitleValue;

    const blogImg = createElement('img', { className: 'blog__img' } );
    var url = URL.createObjectURL(blogImgValue.files[0]);
    blogImg.src = url;

    const article = createElement('div', { className: 'blog__article' }, addInputTextTitleValue);
    const articleAutor = createElement('div', { className: 'blog__autor' }, addInputDateValue);
    const editInput = createElement('textarea', { className: 'blog__textfield', type: 'text' });

    const editButton = createElement('button', { className: 'blog__edit'}, 'Изменить');
    const deltButton = createElement('button', { className: 'blog__del'}, 'Удалить');
    let nId = Math.floor(Math.random() *1000)
    const blogMask = 'bl1_';
    const listItem = createElement('li', { className: 'blog__item' }, articleTitle, blogImg, article, editInput, articleAutor, editButton,deltButton);
   
    if (typeof(Storage) != "undefined") {
      const listItem = localStorage.getItem("email");
   
    }
    bindEvents(listItem);

    return listItem;
}

function bindEvents(blogItem){
    const editButton = blogItem.querySelector('button.blog__edit');
    const delButton = blogItem.querySelector('button.blog__del');

    editButton.addEventListener('click', editItem);
    delButton.addEventListener('click', delItem)
}

function addBlogItem(event){
    event.preventDefault();
    if(addInputText.value === '' || addInputText.value === '' ) {
        return  alert('Введите текст  полей поста');
    }
     const blogItem = createBlogItem(addInputTitle.value, blogImg, addInputText.value, addInputDate.value);
     blogList.appendChild(blogItem);
     addInputText.value = '';
     addInputTitle.value = '';
     addInputDate.value = '';

     var inputEmail= document.querySelector(".blog__article");
      
}

function editItem(){
    const blogItem = this.parentElement;
    const article = blogItem.querySelector('.blog__article');
    const editInput = blogItem.querySelector('.blog__textfield');
    const isEditing = blogItem.classList.contains('editing');
    if(isEditing){
        article.innerText = editInput.value;
        this.innerText = "Изменить"
    } else{
        editInput.value = article.innerText;
        this.innerText = "Сохранить";
    }
    blogItem.classList.toggle('editing')
}

function delItem(event){
    const blogItem = this.parentElement;
    blogList.removeChild(blogItem);
}

/*function load(){
    const data = JSON.parse(localStorage.getItem('blog'))
    return data
}

function save(data){
    const string = JSON.stringify(data);
    localStorage.setItem('blog', string)
}*/
// получили все переменные с сайта
const blogForm = document.getElementById('blog__form');
const addInputText = document.getElementById('blog__input');
const addInputTitle = document.getElementById('blog__title');
const addInputDate = document.getElementById('blog__date');
const blogImg = document.getElementById('blog__img');
const blogList = document.getElementById('blog__list')
const blogItems = document.querySelectorAll('.blog__item');

function init(){
    blogForm.addEventListener('submit', addBlogItem);
    blogItems.forEach(item => bindEvents(item));
}

return init;

})(document);
init();

