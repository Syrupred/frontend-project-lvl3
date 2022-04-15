const renderPosts = (value, elements) => {
  if (value.length > 0) {
    // eslint-disable-next-line no-param-reassign
    elements.posts.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card', 'border-0');
    elements.posts.append(div);
    const divForH2 = document.createElement('div');
    divForH2.classList.add('card-body');
    div.append(divForH2);
    const h2 = document.createElement('h2');
    h2.classList.add('card-title', 'h4');
    h2.innerHTML = 'Посты';
    divForH2.append(h2);
    const ul = document.createElement('ul');
    ul.classList.add('list-group', 'border-0', 'rounded-0', 'list-group-flush');
    div.append(ul);
    value.forEach((obj) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      ul.append(li);
      const a = document.createElement('a');
      a.innerHTML = obj.title;
      a.setAttribute('href', obj.link);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
      a.classList.add('fs-5');
      li.append(a);
      const button = document.createElement('button');
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      button.setAttribute('type', 'submit');
      button.innerHTML = 'Просмотр';
      li.append(button);
    });
  }
};

export default renderPosts;
