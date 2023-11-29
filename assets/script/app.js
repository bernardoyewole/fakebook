'use strict';

import { onEvent, select, selectAll, create, print } from "./utils.js";

import { Subscriber } from "./Subscriber.js";

let groupsArr = [
    'Ninja Penguin',
    'Sloth Fanatics', 
    'Crazy Hat Club', 
    'Toast Lovers'
];

let pagesArr = [
    'Haiku Helpline',
    'Galactic Foodies',
    'Punderful Puppies',
    'Zen Garden of Memes'
];

const newSubscriber = new Subscriber(
    '3458fff', 'Bernard Oyewole', 'bernard123', 'bernard@gmail.com',
    groupsArr, pagesArr, true
);

console.log(newSubscriber.getInfo())

// Modal
const dialog = select('.dialog');
const userInfo = select('.user-info');
const modalBg = select('.modal-bg');

userInfo.addEventListener('click', function() {
    dialog.classList.remove('is-hidden');
    dialog.classList.add('is-visible');
    modalBg.classList.add('modal-bg-dark')
});

window.addEventListener('click', (event) => {
    if (event.target == modalBg) {
        dialog.classList.remove('is-visible');
        dialog.classList.add('is-hidden');
        modalBg.classList.remove('modal-bg-dark');
    }
});

// Post
const post = select('.post');
const text = select('textarea');
const fileInput = select('#file-input');
const fakebook = select('.fakebook');

// print(fileInput.files)
// print(text.value)

function getText() {
    return text.value.trim();
}

function getImage() {
    let file = fileInput.files[0];
    if (file.type.startsWith('image/')) {
        let img = create('img');
        img.src = URL.createObjectURL(file);
        return img;
    }
}

function postHeaderContent() {
    let userIcon = create('img');
    userIcon.src = '../img/contacts-24.png';
    let name = create('p');
    name.innerText = newSubscriber.name;
    let date = create('p');
    date.innerText = new Date().toLocaleDateString()
    return [userIcon, name, date];
}

function createHeader() {
    let header = create('div');
    header.classList.add('flex');
    let content = postHeaderContent();
    console.log(content)
    content.forEach(arg => {
        header.appendChild(arg);
    })
    return header;
}

function createPost() {
    let header = createHeader();
    let postContainer = create('div');
    let post = create('p');
    let img = getImage();
    post.innerText = getText();
    postContainer.appendChild(header);
    postContainer.appendChild(post);
    postContainer.appendChild(img);
    fakebook.appendChild(postContainer);
}

onEvent('click', post, () => {
    createPost();
})


