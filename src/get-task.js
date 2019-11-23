const ONEWEEK = 1000 * 60 * 60 * 24 * 7;
const tagsList = [`homework`, `theory`, `practice`, `intensive`, `keks`, `sport`, `buy`];

const getTags = (array) => {
  const tagSet = [];
  for (let i = 0; i <= Math.floor(Math.random() * 3); i++) {
    let number = Math.floor(Math.random() * array.length);
    tagSet.push(array[number]);
    array.splice(number, 1);
  }
  return tagSet;
};

const task = () => ({
  title: [`Lean JS`, `Finishing course`, `Get 100 points for Exam`][Math.floor(Math.random() * 3)],
  dueDate: Date.now() - ONEWEEK + Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000,
  tags: new Set(getTags(tagsList)),
  picture: `//picsum.photos/100/100?r=${Math.random()}`,
  repeatingDays: {
    'mo': true,
    'tu': false,
    'we': true,
    'th': false,
    'fr': false,
    'sa': true,
    'su': false,
  },
  isFavorite: false,
  isDone: false,
  color: [`black`, `yellow`, `blue`, `green`, `pink`][Math.floor(Math.random() * 7)],
  isEdit: [true, false][Math.floor(Math.random() * 2)],
});

export default task;
