import getFilterElement from './make-filter.js';
import getCardElement from './make-task.js';

const mainFilter = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);


const filters = [
  {
    title: `all`,
    taskNumber: 25,
    isChecked: true
  },
  {
    title: `overdue`,
    taskNumber: 0,
    isDisabled: true
  },
  {
    title: `today`,
    taskNumber: 0,
    isDisabled: true
  },
  {
    title: `favorites`,
    taskNumber: 8
  },
  {
    title: `repeating`,
    taskNumber: 4
  },
  {
    title: `tags`,
    taskNumber: 6
  },
  {
    title: `archive`,
    taskNumber: 115
  }];

let cards = [];

const getCard = () => ({
  title: [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000 - 604800000,
  tags: new Set([
    `cinema`,
    `entertainment`,
    `myself`,
    `cinema`,
  ]),
  picture: `//picsum.photos/100/100?r=${Math.random()}`,
  color: [`black`, `yellow`, `blue`, `green`, `pink`][Math.floor(Math.random() * 5)],
  repeatingDays: {
    'mo': true,
    'tu': false,
    'we': true,
    'th': false,
    'fr': false,
    'sa': true,
    'su': false,
  },
  isDone: false,
  isFavorites: false,
  isEdit: false
});

const getCards = (taskNumber) => {
  cards = [];
  for (let i = 0; i < taskNumber; i++) {
    cards.push(getCard());
  }
};


/* возращает строку со всеми фильтрами */
const createFilterString = (elementList) => {
  let string = ``;
  elementList.forEach((element) => {
    string += getFilterElement(element);
  });
  return string;
};

/* возращает строку со всеми карточками */
const createCardString = (elementList) => {
  let string = ``;
  elementList.forEach((element) => {
    string += getCardElement(element);
  });
  return string;
};


/* отрисовывает HTML в контейнере */
const renderHTML = (html, container) => {
  const filtersListFragment = document.createDocumentFragment();
  const parser = new DOMParser();
  const elements = parser.parseFromString(html, `text/html`);
  const cardChildren = elements.body.childNodes;
  cardChildren.forEach((element) => {
    filtersListFragment.appendChild(element);
  });
  container.innerHTML = ``;
  container.appendChild(filtersListFragment);
};

renderHTML(createFilterString(filters), mainFilter);

mainFilter.addEventListener(`click`, function () {
  const target = event.target;
  if (target.tagName === `input`) {
    return;
  }
  getCards(Math.floor(Math.random() * 10 + 1));
  renderHTML(createCardString(cards), boardTasks);
});

