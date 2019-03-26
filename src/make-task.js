export default (task) => `
<article class="card ${ task.isEdit ? `card--edit` : ``} card--${task.color} ${ task.repeat ? `card--repeat` : ``} ${ task.deadline ? `card--deadline` : ``}">
  <form class="card__form" method="get">
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
        <svg width="100%" height="10">
          <use xlink:href="#wave"></use>
        </svg>
      </div>

      <div class="card__textarea-wrap">
        <label>
          <textarea
            class="card__text"
            placeholder="Start typing your text here..."
            name="text"
          >
            ${task.title}
          </textarea>
        </label>
      </div>

      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <button class="card__date-deadline-toggle" type="button">
              date: <span class="card__date-status">${task.deadline ? `yes` : `no`}</span>
            </button>

            <fieldset class="card__date-deadline" ${task.deadline ? `yes` : `no`}disabled>
              <label class="card__input-deadline-wrap">
                <input
                  class="card__date"
                  type="text"
                  placeholder="23 September"
                  name="date"
                />
              </label>
              <label class="card__input-deadline-wrap">
                <input
                  class="card__time"
                  type="text"
                  placeholder="11:15 PM"
                  name="time"
                />
              </label>
            </fieldset>

            <button class="card__repeat-toggle" type="button">
              repeat:<span class="card__repeat-status">${task.repeat ? `yes` : `no`}</span>
            </button>

            <fieldset class="card__repeat-days" disabled>
              <div class="card__repeat-days-inner">
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-mo-${task.id}"
                  name="repeat"
                  value="mo"
                />
                <label class="card__repeat-day" for="repeat-mo-${task.id}"
                  >mo</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-tu-${task.id}"
                  name="repeat"
                  value="tu"
                  checked
                />
                <label class="card__repeat-day" for="repeat-tu-${task.id}"
                  >tu</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-we-${task.id}"
                  name="repeat"
                  value="we"
                />
                <label class="card__repeat-day" for="repeat-we-${task.id}"
                  >we</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-th-${task.id}"
                  name="repeat"
                  value="th"
                />
                <label class="card__repeat-day" for="repeat-th-${task.id}"
                  >th</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-fr-${task.id}"
                  name="repeat"
                  value="fr"
                  checked
                />
                <label class="card__repeat-day" for="repeat-fr-${task.id}"
                  >fr</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  name="repeat"
                  value="sa"
                  id="repeat-sa-${task.id}"
                />
                <label class="card__repeat-day" for="repeat-sa-${task.id}"
                  >sa</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-su-${task.id}"
                  name="repeat"
                  value="su"
                  checked
                />
                <label class="card__repeat-day" for="repeat-su-${task.id}"
                  >su</label
                >
              </div>
            </fieldset>
          </div>

          <div class="card__hashtag">
            <div class="card__hashtag-list"></div>

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

        <label class="card__img-wrap card__img-wrap--empty">
          <input
            type="file"
            class="card__img-input visually-hidden"
            name="img"
          />
          <img
            src="${task.img ? task.img : `img/add-photo.svg` }"
            alt="task picture"
            class="card__img"
          />
        </label>

        <div class="card__colors-inner">
          <h3 class="card__colors-title">Color</h3>
          <div class="card__colors-wrap">
            <input
              type="radio"
              id="color-black-${task.id}"
              class="card__color-input card__color-input--black visually-hidden"
              name="color"
              value="black"
              ${ (task.repeat === `black`) ? `checked` : ``}
            />
            <label
              for="color-black-${task.id}"
              class="card__color card__color--black"
              >black</label
            >
            <input
              type="radio"
              id="color-yellow-${task.id}"
              class="card__color-input card__color-input--yellow visually-hidden"
              name="color"
              value="yellow"
              ${ (task.repeat === `yellow`) ? `checked` : ``}
            />
            <label
              for="color-yellow-${task.id}"
              class="card__color card__color--yellow"
              >yellow</label
            >
            <input
              type="radio"
              id="color-blue-${task.id}"
              class="card__color-input card__color-input--blue visually-hidden"
              name="color"
              value="blue"
              ${ (task.repeat === `blue`) ? `checked` : ``}
            />
            <label
              for="color-blue-${task.id}"
              class="card__color card__color--blue"
              >blue</label
            >
            <input
              type="radio"
              id="color-green-${task.id}"
              class="card__color-input card__color-input--green visually-hidden"
              name="color"
              value="green"
              ${ (task.repeat === `green`) ? `checked` : ``}
            />
            <label
              for="color-green-${task.id}"
              class="card__color card__color--green"
              >green</label
            >
            <input
              type="radio"
              id="color-pink-${task.id}"
              class="card__color-input card__color-input--pink visually-hidden"
              name="color"
              value="pink"
              ${ (task.repeat === `pink`) ? `checked` : ``}
            />
            <label
              for="color-pink-${task.id}"
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
`;
