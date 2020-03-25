/* возращает один фильтр*/
import Component from './component.js';

class Filter extends Component {
  constructor(data) {
    super();
    this.title = data.title;
    this.taskNumber = data.taskNumber;
    this.isDisabled = data.isDisabled;
    this.isChecked = data.isChecked;
  }

  updateTaskNumber(number) {
    this.taskNumber = number;
  }

  get template() {
    return `
    <span>
    <input
      type="radio"
      id="filter__${this.title}"
      class="filter__input visually-hidden"
      name="filter"
      ${this.isChecked ? `checked` : ``}
      ${this.isDisabled ? `disabled` : ``}
      />
      <label for="filter__${this.title}" class="filter__label">
        ${this.title} <span class="filter__${this.title}-count">${this.taskNumber}</span></label
      >
      </span>
    `.trim();
  }

}

export default Filter;
