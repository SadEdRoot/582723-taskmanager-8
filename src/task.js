import Component from './component.js';
import moment from 'moment';

class Task extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._title = data.title;
    this._tags = data.tags;
    this._repeatingDays = data.repeatingDays;
    this._picture = data.picture;
    this._dueDate = data.dueDate;
    this._color = data.color;

    this._state.isDate = Object.values(this._dueDate).some((it) => it === true);
    this._state.isRepeat = Object.values(this._repeatingDays).some((it) => it === true);

    this._onEditButtonClick = this._onEditButtonClick.bind(this);

  }
  _isRepeat() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _isDeadline() {
    return Object.values(this._dueDate).some((it) => it === true);
  }

  _onEditButtonClick() {
    typeof this._onEdit === `function` && this._onEdit();
  }


  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `
    <article class="card card--${this._color} ${this._isRepeat() ? `card--repeat` : ``}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites card__btn--disabled"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${this._title}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${moment(this._dueDate).format(`DD MMMM`)}</span>
                    <span class="card__time">${moment(this._dueDate).format(`hh:mm A`)}</span>
                  </p>
                </div>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                ${Array.from(this._tags).map((tag) => (`
                  <span class="card__hashtag-inner">
                    <span class="card__hashtag-name">
                      ${tag}
                    </span>
                  </span>`.trim())).join(``)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`.trim();
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`).addEventListener(`click`, this._onEditButtonClick);
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`).removeEventListener(`click`, this._onEditButtonClick);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._picture = data.picture;
    this._dueDate = data.dueDate;
    this._repeatingDays = data.repeatingDays;
    this._color = data.color;
    this._isRepeat();
    this._isDeadline();
  }

}

export default Task;
