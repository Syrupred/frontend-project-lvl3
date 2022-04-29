const renderFids = (feeds, elements, i18nextInstance) => {
  // eslint-disable-next-line no-param-reassign
  elements.feeds.textContent = '';
  const div = document.createElement('div');
  div.classList.add('card', 'border-0');
  elements.feeds.append(div);
  const divForH2 = document.createElement('div');
  divForH2.classList.add('card-body');
  div.append(divForH2);
  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = i18nextInstance.t('feeds');
  divForH2.append(h2);
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0', 'list-group-flush');
  div.append(ul);
  feeds.forEach((feed) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    ul.append(li);
    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0', 'card-title');
    h3.textContent = feed.title;
    li.append(h3);
    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = feed.description;
    li.append(p);
  });
};

export default renderFids;
