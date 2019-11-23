import getFilterElement from './make-filter.js';
import getCardElement from './make-card.js';
import getTaskData from './get-task';

const mainFilter = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);


const filters = [
  {
    title: `all`,
    taskNumber: 15,
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
    taskNumber: 2
  },
  {
    title: `tags`,
    taskNumber: 6
  },
  {
    title: `archive`,
    taskNumber: 115
  }];
/*
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
*/
/* складывает шаблоны по списку */
const createHTMLString = (elementList, template) => {
  let string = ``;
  elementList.forEach((element) => {
    string += template(element);
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

renderHTML(createHTMLString(filters, getFilterElement), mainFilter);

/* создает события для всех фильтров */
mainFilter.childNodes.forEach((element) => {
  element.addEventListener(`click`, () => {
    renderHTML(createHTMLString(addCardToList(), getCardElement), boardTasks);
  });
});


/* создает список карточек */


const addCardToList = () => {
  const cardList = [];
  for (let i = 0; i < (Math.floor(Math.random() * 10) + 1); i++) {
    cardList.push(getTaskData());
  }
  return cardList;
};

/* для проверки */
/*
renderHTML(getFilterElement(filters[0]), mainFilter);
renderHTML(getCardElement(cards[0]), boardTasks);
renderHTML(createHTMLString(cards, getCardElement), boardTasks);
*/
