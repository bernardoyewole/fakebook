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

function setUserData() {
    let userData = newSubscriber.getInfo();
    let data = userData.split(', ');
    const [name, username, email, pages, groups, monetize] = data;
    let newPages = pages.split(',').join(', ');
    let newGroups = groups.split(',').join(', ');
    const newMonetize = monetize ? 'Eligible' : 'Not eligible';
    return {
        Name: name,
        Username: username,
        Email: email,
        Pages: newPages,
        Groups: newGroups,
        Monetization: newMonetize
    }
}

function populateModal() {
    let obj = setUserData();
    let heading = create('h1');
    heading.innerText = `Profile`;
    dialog.appendChild(heading);

    for (const prop in obj) {
        let box = create('div');
        let parag = create('p');
        let span = create('span');
        span.innerText = prop;
        parag.innerText = `${obj[prop]}`;
        [span, parag].forEach(ele => box.appendChild(ele));
        dialog.appendChild(box);
    }
}

populateModal();

userInfo.addEventListener('click', function() {
    dialog.classList.remove('is-hidden');
    dialog.classList.add('is-visible');
    modalBg.classList.add('modal-bg-dark');
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

function postHeaderContent() {
    let userIcon = create('i');
    let date = create('p');
    let name = create('p');

    userIcon.classList.add('fa-solid');
    userIcon.classList.add('fa-user');
    name.innerText = newSubscriber.name;
    date.innerText = new Date().toDateString();

    return [userIcon, name, date];
}

function createHeader() {
    let header = create('div');
    let content = postHeaderContent();
    header.classList.add('flex');

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

function isValid() {
    if (text.value !== "" || fileInput.files.length !== 0) {
        return true;
    }
}

function createPost() {
    if (isValid ()) {
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
}

onEvent('click', post, () => {
    createPost();
    fileInput.value = null;
    fileName.innerText = '';
    text.value = '';
});