'use strict';

const main = document.querySelector('#main');

if (main) {
  const nav = document.querySelector('.main-nav__list');
  const btnToggle = document.querySelector('.main-nav__toggle');
  const links = document.querySelectorAll('a[href^="#"]');
  const inputName = document.querySelector('#user-name');
  const inputPhone = document.querySelector('#user-phone');
  const pageHeader = document.querySelector('.page-header__wrap');

  btnToggle.classList.remove('main-nav__toggle--no-js');
  nav.classList.remove('main-nav__list--no-js');
  pageHeader.classList.remove('page-header__wrap--no-js');

  btnToggle.addEventListener('click', function () {
    btnToggle.classList.toggle('main-nav__toggle--active');
    nav.classList.toggle('main-nav__list--active');
  });


  for (let link of links) {
    link.addEventListener('click', function (evt) {
      evt.preventDefault();
      const id = link.getAttribute('href');

      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  };


  const getCorrectName = function () {
    let valueName = inputName.value;
    let re = /^[a-zA-Zа-яА-Я]*$/;

    for (let i = 0; i < valueName.length; i++) {
      if (!re.test(valueName[i])) {
        inputName.setCustomValidity('Имя должно содержать только буквы');
      } else {
        inputName.setCustomValidity('');
      }
    }
  };

  inputName.addEventListener('input', function () {
    getCorrectName();
  });

  const getCorrectPhone = function () {
    let valuePhone = inputPhone.value;
    let re = /^[0-9]*$/;

    for (let i = 0; i < valuePhone.length; i++) {
      if (!re.test(valuePhone[i])) {
        inputPhone.setCustomValidity('Номер телефона должен состоять из цифр');
      } else {
        inputPhone.setCustomValidity('');
      }
    }
  }

  inputPhone.addEventListener('input', function () {
    getCorrectPhone();
  });
}
