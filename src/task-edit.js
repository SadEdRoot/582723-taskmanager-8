import flatpickr from 'flatpickr';
import Component from './component.js';

class TaskEdit extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._title = data.title;
    this._tags = data.tags;
    this._picture = data.picture;
    this._dueDate = data.dueDate;
    this._repeatingDays = data.repeatingDays;
    this._color = data.color;

    this._state.isDate = false;
    this._state.isRepeat = false;

    this._onSubmit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
    this._onDelete = null;
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
  }

  _isRepeat() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _isDeadline() {
    return Object.values(this._dueDate).some((it) => it === true);
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);
    typeof this._onSubmit === `function` && this._onSubmit(newData);

    this.update(newData);
  }

  _onDeleteButtonClick(evt) {
    evt.preventDefault();
    typeof this._onDelete === `function` && this._onDelete(this);
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      dueDate: new Date(),
      tags: new Set(),
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
      color: ``,
    };

    const taskMapper = TaskEdit.createMapper(entry);
    for (let pair of formData) {
      const [key, value] = pair;
      taskMapper[key] && taskMapper[key](value);
    }
    return entry;
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onChangeTitle() {}

  _onChangeColor() {}

  _onChangeRepeated() {
    this._state.isRepeat = !this._state.isRepeat;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _partialUpdate() {
    this.element.innerHTML = this.template;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  get template() {
    return `
    <article class="card card--edit card--${this._color} ${this._isRepeat() ? `card--repeat` : ``}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">edit</button>
            <button type="button" class="card__btn card__btn--archive">archive</button>
            <button type="button" class="card__btn card__btn--favorites card__btn--disabled">favorites</button>
          </div>
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${this._title}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${this._state.isDate ? `yes` : `no` }</span>
                </button>

                <fieldset class="card__date-deadline" ${!this._state.isDate ? `disabled` : `` }>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="23 September"
                      name="date"
                    />
                  </label>
                  <label class="card__input-deadline-wrap">

                  <label class="card__input-deadline-wrap">
                    <input class="card__time" type="text" placeholder="11:15 PM" name="time" />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${this._state.isRepeat ? `yes` : `no` }</span>
                </button>

                <fieldset class="card__repeat-days" ${!this._state.isRepeat ? `disabled` : ``}>
                  <div class="card__repeat-days-inner">
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-mo-4"
                      name="repeat"
                      value="mo"
                      ${this._repeatingDays.mo ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-mo-4"
                      >mo</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-tu-4"
                      name="repeat"
                      value="tu"
                      ${this._repeatingDays.tu ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-tu-4"
                      >tu</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-we-4"
                      name="repeat"
                      value="we"
                      ${this._repeatingDays.we ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-we-4"
                      >we</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-th-4"
                      name="repeat"
                      value="th"
                      ${this._repeatingDays.th ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-th-4"
                      >th</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-fr-4"
                      name="repeat"
                      value="fr"
                      ${this._repeatingDays.fr ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-fr-4"
                      >fr</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      name="repeat"
                      value="sa"
                      id="repeat-sa-4"
                      ${this._repeatingDays.sa ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-sa-4"
                      >sa</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-su-4"
                      name="repeat"
                      value="su"
                      ${this._repeatingDays.su ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-su-4"
                      >su</label
                    >
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  <span class="card__hashtag-inner">
                    <input
                      type="hidden"
                      name="hashtag"
                      value="repeat"
                      class="card__hashtag-hidden-input"
                    />
                    <p class="card__hashtag-name">
                      #repeat
                    </p>
                    <button type="button" class="card__hashtag-delete">
                      delete
                    </button>
                  </span>

                  <span class="card__hashtag-inner">
                    <input
                      type="hidden"
                      name="hashtag"
                      value="repeat"
                      class="card__hashtag-hidden-input"
                    />
                    <p class="card__hashtag-name">
                      #cinema
                    </p>
                    <button type="button" class="card__hashtag-delete">
                      delete
                    </button>
                  </span>

                  <span class="card__hashtag-inner">
                    <input
                      type="hidden"
                      name="hashtag"
                      value="repeat"
                      class="card__hashtag-hidden-input"
                    />
                    <p class="card__hashtag-name">
                      #entertaiment
                    </p>
                    <button type="button" class="card__hashtag-delete">
                      delete
                    </button>
                  </span>
                </div>

                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                <input
                  type="radio"
                  id="color-black-4"
                  class="card__color-input card__color-input--black visually-hidden"
                  name="color"
                  value="black"
                  ${this._color === `black` ? `checked` : ``}
                />
                <label
                  for="color-black-4"
                  class="card__color card__color--black"
                  >black</label
                >
                <input
                  type="radio"
                  id="color-yellow-4"
                  class="card__color-input card__color-input--yellow visually-hidden"
                  name="color"
                  value="yellow"
                  ${this._color === `yellow` ? `checked` : ``}
                />
                <label
                  for="color-yellow-4"
                  class="card__color card__color--yellow"
                  >yellow</label
                >
                <input
                  type="radio"
                  id="color-blue-4"
                  class="card__color-input card__color-input--blue visually-hidden"
                  name="color"
                  value="blue"
                  ${this._color === `blue` ? `checked` : ``}
                />
                <label
                  for="color-blue-4"
                  class="card__color card__color--blue"
                  >blue</label
                >
                <input
                  type="radio"
                  id="color-green-4"
                  class="card__color-input card__color-input--green visually-hidden"
                  name="color"
                  value="green"
                  ${this._color === `green` ? `checked` : ``}
                />
                <label
                  for="color-green-4"
                  class="card__color card__color--green"
                  >green</label
                >
                <input
                  type="radio"
                  id="color-pink-4"
                  class="card__color-input card__color-input--pink visually-hidden"
                  name="color"
                  value="pink"
                  ${this._color === `pink` ? `checked` : ``}
                />
                <label
                  for="color-pink-4"
                  class="card__color card__color--pink"
                  >pink</label
                >
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>
    `.trim();
  }

  bind() {
    this._element.querySelector(`.card__form`).addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-day-input`).addEventListener(`click`, this._onChangeColor);
    this._element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, this._onChangeRepeated);
    this._element.querySelector(`.card__delete`).addEventListener(`click`, this._onDeleteButtonClick);
    if (this._state.isDate) {
      flatpickr(`.card__date`, {
        altInput: true,
        altFormat: `j F`,
        dateFormat: `j F`
      });
      flatpickr(`.card__time`, {
        enableTime: true,
        noCalendar: true,
        altInput: true,
        altFormat: `h:i K`,
        dateFormat: `h:i K`
      });
    }
  }

  unbind() {
    this._element.querySelector(`.card__form`).removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline`).removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-day-input`).removeEventListener(`click`, this._onChangeColor);
    this._element.querySelector(`.card__repeat-toggle`).removeEventListener(`click`, this._onChangeRepeated);
    this._element.querySelector(`.card__delete`).addEventListener(`click`, this._onDeleteButtonClick);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._picture = data.picture;
    this._dueDate = data.dueDate;
    this._repeatingDays = data.repeatingDays;
    this._color = data.color;
  }

  static createMapper(target) {
    return {
      hashtag: (value) => target.tags.add(value),
      text: (value) => (target.title = value),
      color: (value) => (target.color = value),
      repeat: (value) => (target.repeatingDays[value] = true),
      date: (value) => (target.dueDate = value),
    };
  }
}

export default TaskEdit;
