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

// console.log(newSubscriber.getInfo())

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
const fileName = select('.file-name');
const fakebook = select('.fakebook');

onEvent('change', fileInput, () => {
    let file = fileInput.files[0];
    if (file.type.startsWith('image/')) {
        fileName.innerText = `${fileInput.files[0].name}`;
    } else {
        fileName.innerText = `Choose a picture to post`;
    }
});

function getText() {
    return text.value.trim();
}

function getImage() {
    if (fileInput.files.length !== 0) {
        let file = fileInput.files[0];
        if (file.type.startsWith('image/')) {
            let img = create('img');
            img.src = URL.createObjectURL(file);
            return img;
        }
    }
}

// console.log(fileInput.files.length)
function postHeaderContent() {
    let userIcon = create('i');
    userIcon.classList.add('fa-solid');
    userIcon.classList.add('fa-user');
    let name = create('p');
    name.innerText = newSubscriber.name;
    let date = create('p');
    date.innerText = new Date().toDateString()
    return [userIcon, name, date];
}

function createHeader() {
    let header = create('div');
    header.classList.add('flex');
    let content = postHeaderContent();
    content.forEach(arg => {
        header.appendChild(arg);
    })
    return header;
}

function appendPost(container) {
    if (fakebook.children.length > 1) {
        fakebook.insertBefore(container, fakebook.children[1]);
    } else {
        fakebook.append(container);
    }
}

function createPost() {
    let header = createHeader();
    let postContainer = create('div');
    let post = create('p');
    let img = getImage();
    post.innerText = getText();
    postContainer.appendChild(header);
    postContainer.appendChild(post);
    if (getImage()) { postContainer.appendChild(img); }
    appendPost(postContainer);
}

onEvent('click', post, () => {
    createPost();
    fileInput.value = null;
    fileName.innerText = '';
    text.value = '';
});