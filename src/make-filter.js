export default (filterObj) => `
<input
  type="radio"
  id="filter__${filterObj.title}"
  class="filter__input visually-hidden"
  name="filter"
  ${filterObj.isChecked ? `checked` : ``}
  ${filterObj.isDisabled ? `disabled` : ``}
  />
  <label for="filter__${filterObj.title}" class="filter__label">
    ${filterObj.title} <span class="filter__${filterObj.title}-count">${filterObj.taskNumber}</span></label
  >
  `;
