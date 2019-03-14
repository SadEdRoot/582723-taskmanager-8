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

const cards = [
  {
    id: `10`,
    color: `black`,
    edit: true,
    deadline: true,
    deadlineDate: `23 September`,
    deadlineTime: `11:15 PM`,
    repeat: false,
    text: `Базовый текст`,
    hashtag: [],
    img: ``,
    favorites: false
  },
  {
    id: `11`,
    color: `yellow`,
    edit: false,
    deadline: false,
    deadlineDate: ``,
    deadlineTime: ``,
    repeat: true,
    text: `Базовый текст`,
    hashtag: [],
    img: ``,
    favorites: false
  },
  {
    id: `12`,
    color: `green`,
    edit: true,
    deadline: false,
    deadlineDate: ``,
    deadlineTime: ``,
    repeat: false,
    text: ``,
    hashtag: [],
    img: ``,
    favorites: false
  }
];

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
  renderHTML(createCardString(cards), boardTasks);
});

/* для проверки */
/*
renderHTML(getFilterElement(filters[0]), mainFilter);
renderHTML(getCardElement(cards[0]), boardTasks);
renderHTML(createCardString(cards), boardTasks);
*/
