import onChange from 'on-change';

const renderMessage = (state, elements) => {
  if (state.form.fields.name.valid) {
    elements.input.classList.remove('is-invalid');
  } else {
    elements.input.classList.add('is-invalid');
  }
  if (state.form.processState === 'sent') {
    elements.feedback.classList.add('text-success');
    elements.feedback.classList.remove('text-danger');
  } else {
    elements.feedback.classList.add('text-danger');
    elements.feedback.classList.remove('text-success');
  }
  // eslint-disable-next-line no-param-reassign
  elements.feedback.innerHTML = state.form.fields.name.message;
};

const renderStatusForm = (value, elements) => {
  const elInput = elements.input;
  const elButton = elements.button;
  switch (value) {
    case 'sent':
      elButton.removeAttribute('disabled');
      elInput.removeAttribute('disabled');
      elInput.value = '';
      elInput.focus();
      break;

    case 'failed':
      elButton.removeAttribute('disabled');
      elInput.removeAttribute('disabled');
      break;

    case 'loading':
      elButton.setAttribute('disabled', true);
      elInput.setAttribute('disabled', true);
      break;

    default:
      throw Error(`Unknown form status: ${value}`);
  }
};

const renderFids = (value, elements) => {
  const div = document.createElement('div');
  div.classList.add('card', 'border-0');
  elements.feeds.append(div);
  const divForH2 = document.createElement('div');
  divForH2.classList.add('card-body');
  div.append(divForH2);
  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.innerHTML = 'Фиды';
  divForH2.append(h2);
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0', 'list-group-flush');
  div.append(ul);
  value.forEach((obj) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    ul.append(li);
    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0', 'card-title');
    h3.innerHTML = obj.title;
    li.append(h3);
    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.innerHTML = obj.description;
    li.append(p);
  });
};

const renderPosts = (value, elements) => {
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
};

export default (state, elements) => {
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'form.fields.name':
        renderMessage(state, elements);
        break;

      case 'form.processState':
        renderStatusForm(value, elements);
        break;

      case 'fids':
        renderFids(value, elements);
        break;

      case 'posts':
        renderPosts(value, elements);
        break;

      default:
        break;
    }
  });

  return watchedState;
};
