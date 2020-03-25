import Filter from './filter.js';
import getTaskData from './get-task';
import Task from './task.js';
import TaskEdit from './task-edit.js';
import getFiltersData from './get-filters.js';
import moment from 'moment';

const mainContainer = document.querySelector(`.board`);

mainContainer.removeChild(document.querySelector(`.board__no-tasks`));

const filterContainer = document.querySelector(`.main__filter`);
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
    task.dueDate = newObject.dueDate;

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

  container.appendChild(taskComponent.render());
};

const renderTasks = (tasks, container) => {
  container.innerHTML = ``;
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    task.id = i;
    inicializationTask(task, i, container);
  }

};

renderTasks(initTasks, tasksContainer);

const filterTasks = (initialTasks, filterName) => {
  switch (filterName) {
    case `filter__all`:
      return initialTasks;

    case `filter__overdue`:
      return initialTasks.filter((it) => it.dueDate < Date.now());

    case `filter__today`:
      return initialTasks.filter((it) => moment(it.dueDate).date() === moment().date()); // добавить диапозон в текущий день

    case `filter__repeating`:
      return initialTasks.filter((it) => Object.entries(it.repeatingDays).some((rec) => rec[1]));
  }
};

const renderFilters = (filters, container) => {
  container.innerHTML = ``;
  for (let i = 0; i < filters.length; i++) {
    const filter = filters[i];
    const filterComponent = new Filter(filter);

    container.appendChild(filterComponent.render());
  }
};

renderFilters(getFiltersData, filterContainer);

filterContainer.onchange = (evt) => {
  const filterName = evt.target.id;
  const filterTask = filterTasks(initTasks, filterName);
  renderTasks(filterTask, tasksContainer);
};
