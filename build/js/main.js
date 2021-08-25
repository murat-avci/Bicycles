'use strict';

const nav = document.querySelector('.main-nav__list');
const btnToggle = document.querySelector('.main-nav__toggle');
const links = document.querySelectorAll('a[href^="#"]');
const inputName = document.querySelector('input[name="name"]');
const inputPhone = document.querySelector('input[name="phone"]');
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
    if (document.querySelector(id)) {
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}

const getCorrectName = function () {
  const valueName = inputName.value;
  const re = /^[a-zA-Zа-яА-Я]*$/;

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

window.addEventListener('DOMContentLoaded', function () {
  const inputs = document.querySelectorAll('input[type="tel"]');
  Array.prototype.forEach.call(inputs, function (input) {
    new InputMask({
      selector: input, // в качестве селектора может быть элемент, или, собственно css селектор('#input', '.input', 'input'). Если селектор - тег или класс - будет получен только первый элемент
      layout: input.dataset.mask
    })
  })

})

function InputMask(options) {
  this.el = this.getElement(options.selector);
  if (!this.el) return
  this.layout = options.layout || '+__ (___) ___-__-__';
  this.maskreg = this.getRegexp();

  this.setListeners();
}

InputMask.prototype.getRegexp = function () {
  const str = this.layout.replace(/_/g, '\\d');
  str = str.replace(/\(/g, '\\(');
  str = str.replace(/\)/g, '\\)');
  str = str.replace(/\+/g, '\\+');
  str = str.replace(/\s/g, '\\s');

  return str;
};

InputMask.prototype.mask = function (e) {
  const _this = e.target,
      matrix = this.layout,
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = _this.value.replace(/\D/g, "");

  if (def.length >= val.length) val = def;

  _this.value = matrix.replace(/./g, function(a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a
  });

  if (e.type == 'blur') {
    const regexp = new RegExp(this.maskreg);
    if (!regexp.test(_this.value)) _this.value = '';
  } else {
    this.setCursorPosition(_this.value.length, _this);
  }
};

InputMask.prototype.setCursorPosition = function (pos, elem) {
  elem.focus();
  if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
  else if (elem.createTextRange) {
    const range = elem.createTextRange();
    range.collapse(true);
    range.moveEnd("character", pos);
    range.moveStart("character", pos);
    range.select();
  }
};

InputMask.prototype.setListeners = function () {
  this.el.addEventListener("input", this.mask.bind(this), false);
  this.el.addEventListener("focus", this.mask.bind(this), false);
  this.el.addEventListener("blur", this.mask.bind(this), false);
}

InputMask.prototype.getElement = function (selector) {
  if (selector === undefined) return false;
  if (this.isElement(selector)) return selector;
  if (typeof selector === 'string') {
    const el = document.querySelector(selector);
    if (this.isElement(el)) return el;
  }
  return false;
};

InputMask.prototype.isElement = function (element) {
  return element instanceof Element || element instanceof HTMLDocument;
};
