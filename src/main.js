import getFilterElement from './make-filter.js';
import getTaskData from './get-task';
import Task from './task.js';
import TaskEdit from './task-edit.js';
import getFiltersData from './get-filters.js';

const mainContainer = document.querySelector(`.board`);

mainContainer.removeChild(document.querySelector(`.board__no-tasks`));

const mainFilter = document.querySelector(`.main__filter`);
const tasksContainer = document.querySelector(`.board__tasks`);

const initTasks = [];
/* иммитирует случайные данные с сервера */
for (let i = 0; i < (Math.floor(Math.random() * 10) + 1); i++) {
  initTasks.push(getTaskData());
}

const createNewTask = () => {
  /* add  empty task to data; */
  initTasks.push(getTaskData());
  inicializationTask(initTasks[initTasks.length - 1], initTasks.length - 1, tasksContainer);
};

document.querySelector(`#control__new-task`).addEventListener(`click`, createNewTask);

const deleteTask = (tasks, i) => {
  tasks.splice(i, 1);
  return tasks;
};

const inicializationTask = (task, i, container) => {
  const tasks = initTasks;
  const taskComponent = new Task(task);
  const editTaskComponent = new TaskEdit(task);

  taskComponent.onEdit = () => {
    editTaskComponent.render();
    container.replaceChild(editTaskComponent.element, taskComponent.element);
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

  editTaskComponent.onDelete = () => {
    deleteTask(tasks, i);
    container.removeChild(editTaskComponent.element);
    editTaskComponent.unrender();

  };

  tasksContainer.appendChild(taskComponent.render());
};

const renderTasks = (tasks, container) => {
  container.innerHTML = ``;
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    inicializationTask(task, i, container);
  }

};

renderTasks(initTasks, tasksContainer);

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

renderHTML(createHTMLString(getFiltersData, getFilterElement), mainFilter);

/* создает события для всех фильтров */
mainFilter.childNodes.forEach((element) => {
  element.addEventListener(`click`, () => {
    /** add react for change filter */
  });
});
