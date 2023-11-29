'use strict';

import { onEvent, select, selectAll, create, print } from "./utils.js";

import { Subscriber } from "./Subscriber.js";

// let groupsArr = [
//     'Ninja Penguin',
//     'Sloth Fanatics', 
//     'Crazy Hat Club', 
//     'Toast Lovers'
// ];

// let pagesArr = [
//     'Haiku Helpline',
//     'Galactic Foodies',
//     'Punderful Puppies',
//     'Zen Garden of Memes'
// ];

// const newSubscriber = new Subscriber(
//     '3458fff', 'Bernard Oyewole', 'bernard123', 'bernard@gmail.com',
//     groupsArr, pagesArr, true
// );

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



