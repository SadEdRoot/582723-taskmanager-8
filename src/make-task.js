export default (cardObj) => `
<article class="card ${ cardObj.isEdit ? `card--edit` : ``} card--${cardObj.color} ${ cardObj.repeat ? `card--repeat` : ``} ${ cardObj.deadline ? `card--deadline` : ``}">
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
            ${cardObj.title}
          </textarea>
        </label>
      </div>

      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <button class="card__date-deadline-toggle" type="button">
              date: <span class="card__date-status">${cardObj.deadline ? `yes` : `no`}</span>
            </button>

            <fieldset class="card__date-deadline" ${cardObj.deadline ? `yes` : `no`}disabled>
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
              repeat:<span class="card__repeat-status">${cardObj.repeat ? `yes` : `no`}</span>
            </button>

            <fieldset class="card__repeat-days" disabled>
              <div class="card__repeat-days-inner">
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-mo-${cardObj.id}"
                  name="repeat"
                  value="mo"
                />
                <label class="card__repeat-day" for="repeat-mo-${cardObj.id}"
                  >mo</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-tu-${cardObj.id}"
                  name="repeat"
                  value="tu"
                  checked
                />
                <label class="card__repeat-day" for="repeat-tu-${cardObj.id}"
                  >tu</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-we-${cardObj.id}"
                  name="repeat"
                  value="we"
                />
                <label class="card__repeat-day" for="repeat-we-${cardObj.id}"
                  >we</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-th-${cardObj.id}"
                  name="repeat"
                  value="th"
                />
                <label class="card__repeat-day" for="repeat-th-${cardObj.id}"
                  >th</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-fr-${cardObj.id}"
                  name="repeat"
                  value="fr"
                  checked
                />
                <label class="card__repeat-day" for="repeat-fr-${cardObj.id}"
                  >fr</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  name="repeat"
                  value="sa"
                  id="repeat-sa-${cardObj.id}"
                />
                <label class="card__repeat-day" for="repeat-sa-${cardObj.id}"
                  >sa</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-su-${cardObj.id}"
                  name="repeat"
                  value="su"
                  checked
                />
                <label class="card__repeat-day" for="repeat-su-${cardObj.id}"
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
            src="${cardObj.img ? cardObj.img : `img/add-photo.svg` }"
            alt="task picture"
            class="card__img"
          />
        </label>

        <div class="card__colors-inner">
          <h3 class="card__colors-title">Color</h3>
          <div class="card__colors-wrap">
            <input
              type="radio"
              id="color-black-${cardObj.id}"
              class="card__color-input card__color-input--black visually-hidden"
              name="color"
              value="black"
              ${ (cardObj.repeat === `black`) ? `checked` : ``}
            />
            <label
              for="color-black-${cardObj.id}"
              class="card__color card__color--black"
              >black</label
            >
            <input
              type="radio"
              id="color-yellow-${cardObj.id}"
              class="card__color-input card__color-input--yellow visually-hidden"
              name="color"
              value="yellow"
              ${ (cardObj.repeat === `yellow`) ? `checked` : ``}
            />
            <label
              for="color-yellow-${cardObj.id}"
              class="card__color card__color--yellow"
              >yellow</label
            >
            <input
              type="radio"
              id="color-blue-${cardObj.id}"
              class="card__color-input card__color-input--blue visually-hidden"
              name="color"
              value="blue"
              ${ (cardObj.repeat === `blue`) ? `checked` : ``}
            />
            <label
              for="color-blue-${cardObj.id}"
              class="card__color card__color--blue"
              >blue</label
            >
            <input
              type="radio"
              id="color-green-${cardObj.id}"
              class="card__color-input card__color-input--green visually-hidden"
              name="color"
              value="green"
              ${ (cardObj.repeat === `green`) ? `checked` : ``}
            />
            <label
              for="color-green-${cardObj.id}"
              class="card__color card__color--green"
              >green</label
            >
            <input
              type="radio"
              id="color-pink-${cardObj.id}"
              class="card__color-input card__color-input--pink visually-hidden"
              name="color"
              value="pink"
              ${ (cardObj.repeat === `pink`) ? `checked` : ``}
            />
            <label
              for="color-pink-${cardObj.id}"
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
