import getFilterElement from './make-filter.js';
import getCardElement from './make-card.js';
import getTaskData from './get-task';
import Task from './task.js';
import TaskEdit from './task-edit.js';

const mainFilter = document.querySelector(`.main__filter`);
const tasksContainer = document.querySelector(`.board__tasks`);

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
    renderHTML(createHTMLString(addCardToList(), getCardElement), tasksContainer);
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

const task = {
  title: [
    `Prepare for the pitch`,
    `find money for travel`,
    `eat something`,
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  tags: new Set([
    `cinema`,
    `entertainment`,
    `myself`,
    `cinema`,
  ]),
  picture: `//picsum.photos/100/100?r=${Math.random()}`,
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
};

const taskComponent = new Task(task);
const editTaskComponent = new TaskEdit(task);

tasksContainer.appendChild(taskComponent.render());

taskComponent.onEdit = () => {
  editTaskComponent.render();
  tasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
  taskComponent.unrender();
};

editTaskComponent.onSubmit = (newObject) => {
  task.title = newObject.title;
  task.color = newObject.color;
  task.repeatingDays = newObject.repeatingDays;
  task.tags = newObject.tags;

  taskComponent.update(task);
  taskComponent.render();
  tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
  editTaskComponent.unrender();
};

/* для проверки */
/*
renderHTML(getFilterElement(filters[0]), mainFilter);
renderHTML(getCardElement(cards[0]), boardTasks);
renderHTML(createHTMLString(cards, getCardElement), boardTasks);
*/
